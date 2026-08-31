#!/usr/bin/env python3
"""Validate the stable shared navigation shell across Arctura public HTML pages."""
from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import unquote, urlparse
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
PAGES = sorted(
    page for page in ROOT.rglob("*.html")
    if ".git" not in page.parts
)

errors: list[str] = []
titles: dict[str, Path] = {}
descriptions: dict[str, Path] = {}
canonicals: dict[str, Path] = {}
social_images: dict[str, Path] = {}
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

    title = soup.title.get_text(strip=True) if soup.title else ""
    if not title:
        errors.append(f"{relative}: missing document title")
    elif title in titles:
        errors.append(f"{relative}: duplicate title also used by {titles[title].relative_to(ROOT)}")
    else:
        titles[title] = page

    description_elements = soup.select('meta[name="description"]')
    if len(description_elements) != 1:
        errors.append(f"{relative}: expected one meta description, found {len(description_elements)}")
    else:
        description = description_elements[0].get("content", "").strip()
        if not description:
            errors.append(f"{relative}: empty meta description")
        elif description in descriptions:
            errors.append(f"{relative}: duplicate description also used by {descriptions[description].relative_to(ROOT)}")
        else:
            descriptions[description] = page

    canonical_elements = soup.select('link[rel="canonical"]')
    if len(canonical_elements) != 1:
        errors.append(f"{relative}: expected one canonical link, found {len(canonical_elements)}")
    else:
        canonical_url = canonical_elements[0].get("href", "").strip()
        if not canonical_url.startswith("https://arctura.org/"):
            errors.append(f"{relative}: non-arctura.org canonical URL")
        elif canonical_url in canonicals:
            errors.append(f"{relative}: duplicate canonical also used by {canonicals[canonical_url].relative_to(ROOT)}")
        else:
            canonicals[canonical_url] = page

    if len(soup.select("h1")) != 1:
        errors.append(f"{relative}: expected one h1, found {len(soup.select('h1'))}")

    og_images = soup.select('meta[property="og:image"]')
    og_image_alts = soup.select('meta[property="og:image:alt"]')
    if len(og_images) != 1 or len(og_image_alts) != 1:
        errors.append(f"{relative}: expected one og:image and one og:image:alt")
    else:
        social_image = og_images[0].get("content", "").strip()
        social_alt = og_image_alts[0].get("content", "").strip()
        if not social_image.startswith("https://arctura.org/") or not social_image.endswith(".webp"):
            errors.append(f"{relative}: og:image must be an absolute arctura.org WebP URL")
        elif social_image in social_images:
            errors.append(f"{relative}: duplicate og:image also used by {social_images[social_image].relative_to(ROOT)}")
        else:
            social_images[social_image] = page
            social_path = ROOT / urlparse(social_image).path.lstrip("/")
            if not social_path.exists():
                errors.append(f"{relative}: missing og:image asset {social_image}")
        if not social_alt:
            errors.append(f"{relative}: empty og:image:alt")

    pictures = soup.select("picture")
    if not pictures:
        errors.append(f"{relative}: expected at least one responsive picture")
    for picture in pictures:
        image = picture.select_one("img")
        source = picture.select_one('source[srcset$=".webp"]')
        if not image or not source:
            errors.append(f"{relative}: picture requires an img and WebP source")
            continue
        image_src = image.get("src", "").strip()
        if not image_src.endswith(".webp"):
            errors.append(f"{relative}: picture img must use WebP")
        if not image.get("alt", "").strip():
            errors.append(f"{relative}: content image requires descriptive alt text")
        if not image.get("width") or not image.get("height"):
            errors.append(f"{relative}: content image requires intrinsic width and height")
        for asset_url in (image_src, source.get("srcset", "").strip()):
            asset_path = ROOT / urlparse(asset_url).path.lstrip("/")
            if not asset_path.exists():
                errors.append(f"{relative}: missing picture asset {asset_url}")

    for block in soup.select('script[type="application/ld+json"]'):
        try:
            json.loads(block.string or block.get_text())
        except json.JSONDecodeError as error:
            errors.append(f"{relative}: invalid JSON-LD ({error.msg})")

    ids = {element.get("id") for element in soup.select("[id]")}
    for anchor in soup.select("a[href]"):
        href = anchor.get("href", "").strip()
        parsed = urlparse(href)
        if not href or parsed.scheme in {"http", "https", "mailto", "tel"} or href.startswith("//"):
            continue
        if href.startswith("#"):
            if href != "#" and unquote(href[1:]) not in ids:
                errors.append(f"{relative}: missing local fragment target {href}")
            continue
        target_path = unquote(parsed.path)
        if target_path.startswith("/"):
            candidate = ROOT / target_path.lstrip("/")
        else:
            candidate = page.parent / target_path
        if target_path.endswith("/") or not candidate.suffix:
            candidate = candidate / "index.html"
        if not candidate.exists():
            errors.append(f"{relative}: broken internal link {href}")

if errors:
    print("Static shell validation failed:")
    print("\n".join(f"- {error}" for error in errors))
    raise SystemExit(1)

print(f"Static shell validation passed for {len(PAGES)} public HTML pages.")
