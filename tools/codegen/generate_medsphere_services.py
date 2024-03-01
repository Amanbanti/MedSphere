#!/usr/bin/env python3
"""
MedSphere microservice scaffold generator (Python launcher).

Python 3 is optional — this script delegates to the Node.js implementation:
  node tools/codegen/generate_medsphere_services.mjs

Run from repository root:
  python tools/codegen/generate_medsphere_services.py
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
MJS = REPO_ROOT / "tools" / "codegen" / "generate_medsphere_services.mjs"


def main() -> None:
    if not MJS.exists():
        raise SystemExit(f"Generator not found: {MJS}")
    result = subprocess.run(
        ["node", str(MJS)],
        cwd=REPO_ROOT,
        check=False,
    )
    raise SystemExit(result.returncode)


if __name__ == "__main__":
    main()
