#!/usr/bin/env python3
"""Validate the Arctura Foundation curriculum catalog."""
from __future__ import annotations

import json
from pathlib import Path

from jsonschema import Draft202012Validator, FormatChecker

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATH = ROOT / "content" / "schema" / "curriculum.schema.json"
CONTENT_PATH = ROOT / "content" / "curriculum.json"


def load_json(path: Path) -> object:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def main() -> int:
    schema = load_json(SCHEMA_PATH)
    content = load_json(CONTENT_PATH)
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    errors = sorted(validator.iter_errors(content), key=lambda error: list(error.path))
    if errors:
        for error in errors:
            location = "/".join(str(part) for part in error.path) or "<root>"
            print(f"INVALID {location}: {error.message}")
        return 1
    print("VALID content/curriculum.json conforms to content/schema/curriculum.schema.json")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
