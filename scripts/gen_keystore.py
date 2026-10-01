#!/usr/bin/env python3
"""Generates the demo release signing key (PKCS#12) used by the Gradle build.

NOTE: this is a DEMO key committed for convenience. Before publishing to
Google Play, create your own upload key and keep it safe.
"""
import datetime
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.serialization import pkcs12
from cryptography.hazmat.primitives.asymmetric import rsa

KEY_PASSWORD = b"ufm2026"

key = rsa.generate_private_key(public_exponent=65537, key_size=2048)

name = x509.Name([
    x509.NameAttribute(NameOID.COMMON_NAME, "Ultimate Football Mobile"),
    x509.NameAttribute(NameOID.ORGANIZATION_NAME, "UFM Studio"),
    x509.NameAttribute(NameOID.COUNTRY_NAME, "UZ"),
])

cert = (
    x509.CertificateBuilder()
    .subject_name(name)
    .issuer_name(name)
    .public_key(key.public_key())
    .serial_number(x509.random_serial_number())
    .not_valid_before(datetime.datetime.utcnow())
    .not_valid_after(datetime.datetime.utcnow() + datetime.timedelta(days=365 * 25))
    .sign(key, hashes.SHA256())
)

p12 = pkcs12.serialize_key_and_certificates(
    b"ufm", key, cert, None, serialization.BestAvailableEncryption(KEY_PASSWORD)
)

out = "android/release.keystore.p12"
with open(out, "wb") as f:
    f.write(p12)
print(f"wrote {out} ({len(p12)} bytes), alias=ufm password=ufm2026")
