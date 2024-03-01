#!/usr/bin/env python3
"""
Merge MedSphere Prisma schema fragments into a single generated schema file.

Reads:
  - packages/database/prisma/schema.prisma  (Phase 1 header + foundation models)
  - packages/database/prisma/models/*.prisma  (clinical domain fragments)

Writes:
  - packages/database/prisma/schema.generated.prisma

Also regenerates:
  - packages/database/src/schema-catalog.ts

Usage (from repository root):
  python tools/codegen/generate_clinical_fragments.py   # optional: regenerate fragments
  python tools/codegen/merge_prisma_schema.py
"""

from __future__ import annotations

import re
import sys
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
PRISMA_DIR = REPO_ROOT / "packages" / "database" / "prisma"
SCHEMA_SOURCE = PRISMA_DIR / "schema.prisma"
MODELS_DIR = PRISMA_DIR / "models"
OUTPUT_SCHEMA = PRISMA_DIR / "schema.generated.prisma"
CATALOG_OUTPUT = REPO_ROOT / "packages" / "database" / "src" / "schema-catalog.ts"

HEADER_END_MARKERS = ("enum ", "model ")


def extract_header(source: str) -> str:
    """Return generator + datasource block from schema.prisma (everything before first enum/model)."""
    lines = source.splitlines()
    header_lines: list[str] = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith(HEADER_END_MARKERS):
            break
        header_lines.append(line)
    return "\n".join(header_lines).rstrip() + "\n"


def extract_foundation_models(source: str) -> str:
    """Return Phase 1 enums and models from schema.prisma."""
    lines = source.splitlines()
    body_lines: list[str] = []
    started = False
    for line in lines:
        stripped = line.strip()
        if not started and stripped.startswith(HEADER_END_MARKERS):
            started = True
        if started:
            body_lines.append(line)
    return "\n".join(body_lines).strip()


def read_fragments() -> list[tuple[str, str]]:
    if not MODELS_DIR.exists():
        return []
    files = sorted(MODELS_DIR.glob("*.prisma"))
    return [(f.name, f.read_text(encoding="utf-8").strip()) for f in files]


def parse_models_and_tables(content: str) -> tuple[list[str], list[str]]:
    models = re.findall(r"^model\s+(\w+)\s*\{", content, re.MULTILINE)
    tables = re.findall(r'@@map\("([^"]+)"\)', content)
    return models, tables


def generate_catalog(all_models: list[str], all_tables: list[str]) -> str:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    model_entries = ",\n  ".join(f'"{m}"' for m in sorted(set(all_models)))
    table_entries = ",\n  ".join(f'"{t}"' for t in sorted(set(all_tables)))
    return f"""/**
 * Auto-generated schema catalog — DO NOT EDIT BY HAND.
 * Regenerate: python tools/codegen/merge_prisma_schema.py
 * Generated at: {ts}
 */

export const SCHEMA_MODELS = [
  {model_entries},
] as const;

export type SchemaModel = (typeof SCHEMA_MODELS)[number];

export const SCHEMA_TABLES = [
  {table_entries},
] as const;

export type SchemaTable = (typeof SCHEMA_TABLES)[number];

export const SCHEMA_STATS = {{
  modelCount: {len(set(all_models))},
  tableCount: {len(set(all_tables))},
  fragmentCount: {len(list(MODELS_DIR.glob('*.prisma')) if MODELS_DIR.exists() else [])},
}} as const;
"""


def merge() -> dict[str, int | list[str]]:
    if not SCHEMA_SOURCE.exists():
        print(f"ERROR: Missing source schema: {SCHEMA_SOURCE}", file=sys.stderr)
        sys.exit(1)

    source = SCHEMA_SOURCE.read_text(encoding="utf-8")
    header = extract_header(source)
    foundation = extract_foundation_models(source)
    fragments = read_fragments()

    parts = [
        "// =============================================================================",
        "// AUTO-GENERATED — DO NOT EDIT DIRECTLY",
        "// Merge source: schema.prisma + prisma/models/*.prisma",
        "// Regenerate: python tools/codegen/merge_prisma_schema.py",
        "// =============================================================================",
        "",
        header.rstrip(),
        "",
        "// --- Phase 1 foundation (from schema.prisma) ---",
        "",
        foundation,
        "",
    ]

    if fragments:
        parts.append("// --- Phase 2+ clinical domains (from prisma/models/) ---")
        parts.append("")
        for filename, content in fragments:
            parts.append(f"// >>> fragment: {filename}")
            parts.append(content)
            parts.append("")

    merged = "\n".join(parts).rstrip() + "\n"
    OUTPUT_SCHEMA.write_text(merged, encoding="utf-8")

    all_models, all_tables = parse_models_and_tables(merged)
    CATALOG_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    CATALOG_OUTPUT.write_text(generate_catalog(all_models, all_tables), encoding="utf-8")

    fragment_names = [name for name, _ in fragments]
    return {
        "model_count": len(all_models),
        "table_count": len(all_tables),
        "fragment_count": len(fragments),
        "fragments": fragment_names,
        "output_schema": str(OUTPUT_SCHEMA.relative_to(REPO_ROOT)),
        "output_catalog": str(CATALOG_OUTPUT.relative_to(REPO_ROOT)),
    }


def main() -> None:
    stats = merge()
    print("MedSphere Prisma schema merge complete.")
    print(f"  Models:    {stats['model_count']}")
    print(f"  Tables:    {stats['table_count']}")
    print(f"  Fragments: {stats['fragment_count']}")
    print(f"  Output:    {stats['output_schema']}")
    print(f"  Catalog:   {stats['output_catalog']}")
    if stats["fragments"]:
        print("  Fragment files:")
        for name in stats["fragments"]:
            print(f"    - {name}")


if __name__ == "__main__":
    main()
