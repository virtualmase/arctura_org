#!/usr/bin/env python3
"""Validate ARCTURA launch coverage beyond individual page structure."""
from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
SITEMAP_NS = {
    "site": "http://www.sitemaps.org/schemas/sitemap/0.9",
    "image": "http://www.google.com/schemas/sitemap-image/1.1",
}
errors: list[str] = []

pages = sorted(page for page in ROOT.rglob("*.html") if ".git" not in page.parts)
indexable: dict[str, Path] = {}
for page in pages:
    soup = BeautifulSoup(page.read_text(encoding="utf-8"), "html.parser")
    relative = page.relative_to(ROOT)
    robots = soup.select_one('meta[name="robots"]')
    robots_value = robots.get("content", "").lower() if robots else ""
    canonical = soup.select_one('link[rel="canonical"]')
    canonical_url = canonical.get("href", "").strip() if canonical else ""
    main = soup.select_one("main")
    word_count = len(main.get_text(" ", strip=True).split()) if main else 0
    if "noindex" not in robots_value:
        indexable[canonical_url] = page
        if word_count < 150:
            errors.append(f"{relative}: indexable page has only {word_count} main-content words")
    if not soup.select_one('script[type="application/ld+json"]'):
        errors.append(f"{relative}: missing structured data")

depth_targets = {
    "learning/start/index.html": 450,
    "learning/method/index.html": 500,
    "learning/engineering-judgment/decision-record/index.html": 700,
    "learning/semantic-ontology/domain-model/index.html": 700,
    "learning/systems-stewardship/review-cycle/index.html": 700,
    "editorial/index.html": 450,
    "accessibility/index.html": 350,
}
for relative, minimum in depth_targets.items():
    page = ROOT / relative
    if not page.exists():
        errors.append(f"missing launch content: {relative}")
        continue
    soup = BeautifulSoup(page.read_text(encoding="utf-8"), "html.parser")
    words = len(soup.select_one("main").get_text(" ", strip=True).split())
    if words < minimum:
        errors.append(f"{relative}: {words} words, launch target is {minimum}")

not_found = ROOT / "404.html"
if not not_found.exists():
    errors.append("missing custom 404.html")
else:
    soup = BeautifulSoup(not_found.read_text(encoding="utf-8"), "html.parser")
    if "noindex" not in (soup.select_one('meta[name="robots"]') or {}).get("content", "").lower():
        errors.append("404.html must be noindex")

sitemap_root = ET.parse(ROOT / "sitemap.xml").getroot()
sitemap_urls: set[str] = set()
for entry in sitemap_root.findall("site:url", SITEMAP_NS):
    location = entry.findtext("site:loc", namespaces=SITEMAP_NS) or ""
    sitemap_urls.add(location)
    images = entry.findall("image:image", SITEMAP_NS)
    if len(images) != 1:
        errors.append(f"{location}: expected one sitemap image, found {len(images)}")
        continue
    image_url = images[0].findtext("image:loc", namespaces=SITEMAP_NS) or ""
    image_path = ROOT / urlparse(image_url).path.lstrip("/")
    if not image_path.exists():
        errors.append(f"{location}: missing sitemap image {image_url}")

expected_urls = set(indexable)
if sitemap_urls != expected_urls:
    for missing in sorted(expected_urls - sitemap_urls):
        errors.append(f"sitemap missing indexable canonical {missing}")
    for extra in sorted(sitemap_urls - expected_urls):
        errors.append(f"sitemap contains non-indexable or unknown URL {extra}")

catalog = json.loads((ROOT / "content/curriculum.json").read_text(encoding="utf-8"))
if catalog["organization"]["status"] != "operating":
    errors.append("curriculum organization status must be operating for launch")
for path in catalog["paths"]:
    if path["status"] != "active":
        errors.append(f"curriculum path {path['id']} is not active")
    practice_path = ROOT / urlparse(path["firstPractice"]).path.lstrip("/") / "index.html"
    if not practice_path.exists():
        errors.append(f"curriculum path {path['id']} firstPractice does not exist")

vercel = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))
global_headers = next((item["headers"] for item in vercel["headers"] if item["source"] == "/(.*)"), [])
if any(header["key"].lower() == "x-robots-tag" for header in global_headers):
    errors.append("global X-Robots-Tag would override page-level noindex controls")

robots_text = (ROOT / "robots.txt").read_text(encoding="utf-8")
if "Sitemap: https://arctura.org/sitemap.xml" not in robots_text:
    errors.append("robots.txt missing canonical sitemap declaration")

if errors:
    print("Launch readiness validation failed:")
    print("\n".join(f"- {error}" for error in errors))
    raise SystemExit(1)

print(
    f"Launch readiness validation passed: {len(indexable)} indexable pages, "
    f"{len(depth_targets)} substantive launch resources, custom 404, and complete sitemap coverage."
)
