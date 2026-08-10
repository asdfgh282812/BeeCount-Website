#!/usr/bin/env python3
"""上传截图到 Lsky Pro 图床,输出可直接贴进 docs 的 Markdown 语法。

用法:
    LSKY_PRO_TOKEN=xxx python scripts/upload_manual_image.py path/to/shot.png "说明文字"

也可以把 LSKY_PRO_TOKEN / LSKY_PRO_BASE_URL 写进 scripts/.env(不进 git)。
"""

from __future__ import annotations

import json
import os
import subprocess
import sys


def _load_dotenv(path: str) -> None:
    if not os.path.exists(path):
        return
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip())


def upload(base_url: str, token: str, file_path: str) -> dict:
    # 用系统 curl(走 macOS 系统信任库)而不是 urllib,避免 python.org 发行版
    # 缺 CA bundle 导致的 SSLCertVerificationError。
    result = subprocess.run(
        [
            "curl",
            "-s",
            "-m",
            "30",
            f"{base_url.rstrip('/')}/api/v1/upload",
            "-H",
            f"Authorization: Bearer {token}",
            "-H",
            "Accept: application/json",
            "-F",
            f"file=@{file_path}",
        ],
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(result.stdout)


def main() -> None:
    _load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    file_path = sys.argv[1]
    alt_text = sys.argv[2] if len(sys.argv) > 2 else os.path.splitext(os.path.basename(file_path))[0]

    token = os.environ.get("LSKY_PRO_TOKEN")
    base_url = os.environ.get("LSKY_PRO_BASE_URL", "https://photo.pnsgzomf.synology.me")
    if not token:
        print("缺少 LSKY_PRO_TOKEN(环境变量或 scripts/.env)", file=sys.stderr)
        sys.exit(1)

    result = upload(base_url, token, file_path)
    if not result.get("status"):
        print(f"上传失败: {result}", file=sys.stderr)
        sys.exit(1)

    url = result["data"]["links"]["url"]
    print(f"![{alt_text}]({url})")


if __name__ == "__main__":
    main()
