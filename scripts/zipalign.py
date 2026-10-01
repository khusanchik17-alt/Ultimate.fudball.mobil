#!/usr/bin/env python3
"""Pure-python zipalign (4-byte alignment of stored entries), equivalent to
Android SDK zipalign for our purposes. Usage: zipalign.py in.apk out.apk"""
import sys
import zipfile
import shutil

ALIGN = 4


def zipalign(src, dst):
    zin = zipfile.ZipFile(src, 'r')
    with open(dst, 'wb') as fout:
        zout = zipfile.ZipFile(fout, 'w', allowZip64=False)
        for info in zin.infolist():
            data = zin.read(info.filename)
            ni = zipfile.ZipInfo(info.filename, date_time=info.date_time)
            ni.comment = info.comment
            ni.internal_attr = info.internal_attr
            ni.external_attr = info.external_attr
            if info.compress_type == zipfile.ZIP_STORED:
                # pad local header via extra field so data starts on ALIGN boundary
                off = fout.tell()
                header = 30 + len(ni.filename.encode('utf-8'))
                pad = (ALIGN - ((off + header) % ALIGN)) % ALIGN
                ni.extra = b'\x00' * pad
                ni.compress_type = zipfile.ZIP_STORED
                ni.file_size = len(data)
                import zlib
                ni.CRC = zlib.crc32(data)
                zout.writestr(ni, data)
            else:
                ni.compress_type = zipfile.ZIP_DEFLATED
                zout.writestr(ni, data)
        zout.close()
    zin.close()


if __name__ == '__main__':
    zipalign(sys.argv[1], sys.argv[2])
    print(f'zipaligned {sys.argv[1]} -> {sys.argv[2]}')
