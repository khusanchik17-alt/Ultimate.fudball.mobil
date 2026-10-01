#!/usr/bin/env python3
"""
Static sanity check for the Android shell sources.

The sandbox that develops this game has no JDK compiler, so this script acts as
a lightweight API lint: it reads the Android SDK's `android.jar` (or a
pre-generated member index) and verifies every android.* import and every
`Class.member` reference used by the Java sources actually exists.

    python3 tools/check_android_api.py --build-index /path/to/android.jar
    python3 tools/check_android_api.py            # uses tools/android-api-index.json
"""
from __future__ import annotations

import argparse
import json
import os
import re
import struct
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JAVA_DIR = os.path.join(ROOT, "android", "app", "src", "main", "java")
INDEX_PATH = os.path.join(ROOT, "tools", "android-api-index.json")

IMPORT_RE = re.compile(r"^\s*import\s+(static\s+)?(android\.[\w.]+)\s*;", re.M)
CLASS_USE_RE = re.compile(r"\b([A-Z][A-Za-z0-9_]*)\.([a-zA-Z_][A-Za-z0-9_]*)\s*\(")
STATIC_FIELD_RE = re.compile(r"\b([A-Z][A-Za-z0-9_]*)\.([A-Z][A-Z0-9_]+)\b")
NEW_RE = re.compile(r"\bnew\s+([A-Z][A-Za-z0-9_]*)\s*\(")
EXTENDS_RE = re.compile(r"\bextends\s+([A-Z][A-Za-z0-9_]*)")
CLASS_DECL_RE = re.compile(r"\b(?:class|interface|enum)\s+([A-Z][A-Za-z0-9_]*)(?:\s+extends\s+([A-Z][A-Za-z0-9_]*))?")
OVERRIDE_RE = re.compile(r"@Override\s*(?:@[A-Za-z0-9_]+(?:\([^)]*\))?\s*)*(?:public|protected|private|static|final|synchronized|native|abstract|strictfp|\s)*[\w<>\[\],.\s]+?\s(\w+)\s*\(")

# one pass over the source that understands comments, strings and braces so that
# nested classes can be mapped to the methods they declare
TOKEN_RE = re.compile(
    r'(?P<comment>//[^\n]*|/\*.*?\*/)'
    r'|(?P<string>"(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\')'
    r'|(?P<cls>\b(?:class|interface|enum)\s+(?P<cname>[A-Z][A-Za-z0-9_]*)(?:\s+extends\s+(?P<cparent>[A-Z][A-Za-z0-9_]*))?)'
    r'|(?P<anon>\bnew\s+(?P<atype>[A-Z][A-Za-z0-9_]*)(?:<[^>()]*>)?\s*\(\s*\))'
    r'|(?P<ovr>@Override)'
    r'|(?P<open>\{)|(?P<close>\})',
    re.S)


def scan_classes(source):
    """Returns (class_parents, overrides) using real brace nesting.

    class_parents: {class name: parent simple name or None}
    overrides:     [(line, owning class, method name)]
    """
    parents = {}
    overrides = []
    stack = []
    depth = 0
    pending = None
    anon_counter = 0
    for match in TOKEN_RE.finditer(source):
        if match.lastgroup in ("comment", "string"):
            continue
        if match.group("cls") is not None:
            pending = (match.group("cname"), match.group("cparent"))
            continue
        if match.group("anon") is not None:
            # anonymous class: `new Foo() { ... }` inherits from Foo
            pending = (f"$anon{anon_counter}", match.group("atype"))
            anon_counter += 1
            continue
        if match.group("open") is not None:
            depth += 1
            if pending:
                parents[pending[0]] = pending[1]
                stack.append({"name": pending[0], "depth": depth})
                pending = None
            continue
        if match.group("close") is not None:
            if stack and stack[-1]["depth"] == depth:
                stack.pop()
            depth -= 1
            continue
        if match.group("ovr") is not None:
            owner = stack[-1]["name"] if stack else None
            tail = source[match.end():match.end() + 400]
            name_match = re.search(r"([A-Za-z_][A-Za-z0-9_]*)\s*\(", tail)
            method = name_match.group(1) if name_match else "?"
            line = source[:match.start()].count("\n") + 1
            overrides.append((line, owner, method))
    return parents, overrides


# ---------------------------------------------------------------------------
# class-file parsing (constant pool -> member names)
# ---------------------------------------------------------------------------
def parse_full(data: bytes):
    """Complete, correct parse: returns (class_name, super, interfaces, fields, methods)."""
    count = struct.unpack_from(">H", data, 8)[0]
    offset = 10
    utf8 = {}
    class_refs = {}
    name_and_type = {}
    i = 1
    while i < count:
        tag = data[offset]
        offset += 1
        if tag == 1:
            length = struct.unpack_from(">H", data, offset)[0]
            offset += 2
            utf8[i] = data[offset:offset + length].decode("utf-8", "replace")
            offset += length
        elif tag in (7, 8, 16, 19, 20):
            class_refs[i] = struct.unpack_from(">H", data, offset)[0]
            offset += 2
        elif tag == 15:
            offset += 3
        elif tag in (3, 4, 9, 10, 11, 12, 17, 18):
            if tag == 12:
                name_and_type[i] = struct.unpack_from(">HH", data, offset)
            offset += 4
        elif tag in (5, 6):
            offset += 8
            i += 1
        else:
            raise ValueError(f"unknown constant pool tag {tag}")
        i += 1

    _access, this_class, super_class = struct.unpack_from(">HHH", data, offset)
    offset += 6
    class_name = utf8.get(class_refs.get(this_class, 0), "")
    super_name = utf8.get(class_refs.get(super_class, 0), "")

    interface_count = struct.unpack_from(">H", data, offset)[0]
    offset += 2
    interfaces = []
    for _ in range(interface_count):
        idx = struct.unpack_from(">H", data, offset)[0]
        offset += 2
        interfaces.append(utf8.get(class_refs.get(idx, 0), ""))

    def read_members(offset):
        names = []
        member_count = struct.unpack_from(">H", data, offset)[0]
        offset += 2
        for _ in range(member_count):
            _flags, name_idx, _desc_idx = struct.unpack_from(">HHH", data, offset)
            offset += 6
            names.append(utf8.get(name_idx, ""))
            attr_count = struct.unpack_from(">H", data, offset)[0]
            offset += 2
            for _ in range(attr_count):
                length = struct.unpack_from(">I", data, offset + 2)[0]
                offset += 6 + length
        return names, offset

    fields, offset = read_members(offset)
    methods, offset = read_members(offset)
    return class_name, super_name, interfaces, fields, methods


def build_index(jar_path: str, wanted_prefixes=("android.",)):
    index = {}
    with zipfile.ZipFile(jar_path) as jar:
        for entry in jar.namelist():
            if not entry.endswith(".class"):
                continue
            name = entry[:-6].replace("/", ".")
            if not name.startswith(wanted_prefixes):
                continue
            try:
                class_name, super_name, interfaces, fields, methods = parse_full(jar.read(entry))
            except Exception:
                continue
            class_name = (class_name or name).replace("/", ".")
            index[class_name] = {
                "fields": fields,
                "methods": methods,
                "super": (super_name or "").replace("/", ".") or None,
                "interfaces": [i.replace("/", ".") for i in interfaces if i],
            }
    return index


def write_index(index):
    with open(INDEX_PATH, "w", encoding="utf-8") as handle:
        json.dump(index, handle, separators=(",", ":"), sort_keys=True)


def load_index():
    if not os.path.exists(INDEX_PATH):
        return None
    with open(INDEX_PATH, encoding="utf-8") as handle:
        return json.load(handle)


# ---------------------------------------------------------------------------
# validation
# ---------------------------------------------------------------------------
def java_sources():
    files = []
    for base, _dirs, names in os.walk(JAVA_DIR):
        for name in names:
            if name.endswith(".java"):
                files.append(os.path.join(base, name))
    return sorted(files)


def check(clean_index_for_classes):
    problems = []
    files = java_sources()
    if not files:
        return ["no Java sources found"]
    for path in files:
        rel = os.path.relpath(path, ROOT)
        with open(path, encoding="utf-8") as handle:
            source = handle.read()

        imports = {}
        for _static, fqcn in IMPORT_RE.findall(source):
            simple = fqcn.split(".")[-1]
            imports[simple] = fqcn
            if fqcn not in clean_index_for_classes:
                problems.append(f"{rel}: unknown android import {fqcn}")
                continue
            entry = clean_index_for_classes[fqcn]
            if "class" not in entry:
                pass

        # methods called on imported android classes
        for simple, member in CLASS_USE_RE.findall(source):
            fqcn = imports.get(simple)
            if not fqcn:
                continue
            entry = clean_index_for_classes.get(fqcn)
            if not entry:
                continue
            methods = set(entry["methods"])
            fields = set(entry["fields"])
            if member not in methods and member not in fields:
                # nested classes: Build.VERSION is really android.os.Build$VERSION
                if f"{fqcn}${member}" not in clean_index_for_classes:
                    problems.append(f"{rel}: {fqcn}.{member} does not exist")

        # static constants like WebSettings.LOAD_DEFAULT
        for simple, constant in STATIC_FIELD_RE.findall(source):
            fqcn = imports.get(simple)
            if not fqcn:
                continue
            entry = clean_index_for_classes.get(fqcn)
            if not entry:
                continue
            if constant not in set(entry["fields"]) and constant not in set(entry["methods"]):
                if f"{fqcn}${constant}" not in clean_index_for_classes:
                    problems.append(f"{rel}: {fqcn}.{constant} does not exist")

        # `new X(` must resolve to an android class when imported, otherwise it is ours
        for simple in NEW_RE.findall(source):
            fqcn = imports.get(simple)
            if fqcn and fqcn not in clean_index_for_classes:
                problems.append(f"{rel}: cannot construct {fqcn}")

        # classes we extend must exist (android or our own package)
        local_classes, overrides = scan_classes(source)
        for simple in EXTENDS_RE.findall(source):
            if simple in local_classes:
                continue
            fqcn = imports.get(simple)
            if fqcn and fqcn not in clean_index_for_classes:
                problems.append(f"{rel}: extends unknown class {fqcn}")

        # every @Override must exist somewhere up the inheritance chain
        for line, owner, method in overrides:
            if owner is None:
                problems.append(f"{rel}:{line}: @Override {method}() outside a class")
                continue
            chain = []
            current = owner
            guard = 0
            while current and guard < 12:
                guard += 1
                if current in local_classes:
                    chain.append(current)
                    current = local_classes[current]
                    continue
                fqcn = current if "." in current else imports.get(current)
                if not fqcn:
                    break
                entry = clean_index_for_classes.get(fqcn)
                if not entry:
                    break
                chain.append(fqcn)
                current = entry.get("super") or None
            found = False
            resolved_ancestors = 0
            for link in chain:
                fqcn = link if "." in link else imports.get(link)
                entry = clean_index_for_classes.get(fqcn) if fqcn else None
                if entry:
                    resolved_ancestors += 1
                    if method in set(entry["methods"]):
                        found = True
                        break
            if not found and resolved_ancestors > 0:
                problems.append(f"{rel}:{line}: @Override {method}() not found in {owner}'s parent chain")
    return problems


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--build-index", metavar="ANDROID_JAR",
                        help="re-generate tools/android-api-index.json from an android.jar")
    args = parser.parse_args()

    if args.build_index:
        index = build_index(args.build_index)
        write_index(index)
        classes = len(index)
        members = sum(len(v["methods"]) + len(v["fields"]) for v in index.values())
        print(f"index written: {classes} classes / {members} members -> {os.path.relpath(INDEX_PATH, ROOT)}")
        return 0

    index = load_index()
    if index is None:
        print("no android-api-index.json yet - generating a minimal one is required once:")
        print("  python3 tools/check_android_api.py --build-index /path/to/android.jar")
        return 0

    problems = check(index)
    if problems:
        print(f"Android API check FAILED ({len(problems)} problem(s)):")
        for line in problems:
            print(f"  - {line}")
        return 1
    print(f"Android API check passed ({len(java_sources())} source file(s), {len(index)} SDK classes indexed).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
