#!/usr/bin/env python3
"""Validate the stable shared navigation shell across Arctura public HTML pages."""
from __future__ import annotations

from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
PAGES = sorted(
    page for page in ROOT.rglob("*.html")
    if ".git" not in page.parts
)

errors: list[str] = []
for page in PAGES:
    soup = BeautifulSoup(page.read_text(encoding="utf-8"), "html.parser")
    relative = page.relative_to(ROOT)
    shell_count = len(soup.select("header.site-shell"))
    if shell_count != 1:
        errors.append(f"{relative}: expected one .site-shell header, found {shell_count}")
    if not soup.select_one(".site-shell [data-shell-toggle]"):
        errors.append(f"{relative}: missing Browse toggle")
    if not soup.select_one(".site-shell [data-shell-menu]"):
        errors.append(f"{relative}: missing Browse menu")
    if len(soup.select('a.skip[href="#main"]')) != 1:
        errors.append(f"{relative}: expected one skip link")
    if not soup.select_one("#main"):
        errors.append(f"{relative}: missing #main target")
    if soup.select_one(".guided-header, .guided-menu, .journey-context, .journey-next"):
        errors.append(f"{relative}: leftover injected-navigation markup")
    if soup.select("a a"):
        errors.append(f"{relative}: nested anchor detected")

if errors:
    print("Static shell validation failed:")
    print("\n".join(f"- {error}" for error in errors))
    raise SystemExit(1)

print(f"Static shell validation passed for {len(PAGES)} public HTML pages.")
