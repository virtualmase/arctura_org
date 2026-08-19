#!/usr/bin/env python3
"""Install the stable static Arctura navigation shell across public HTML pages."""
from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    ROOT / "index.html",
    ROOT / "field/index.html",
    ROOT / "guardian/index.html",
    ROOT / "arcturians/index.html",
    ROOT / "tools/index.html",
    ROOT / "support/index.html",
    ROOT / "products/index.html",
    ROOT / "case-studies/index.html",
    ROOT / "protocol/index.html",
    ROOT / "autonomous-resource-management/index.html",
    ROOT / "arcturian-council/index.html",
    ROOT / "collective/index.html",
    ROOT / "signal-archives/index.html",
    ROOT / "academy/index.html",
    ROOT / "academy/ai-agent-design.html",
    ROOT / "academy/base-network-ops.html",
    ROOT / "academy/decentralized-identity.html",
    ROOT / "academy/signal-ops.html",
    ROOT / "academy/treasury-governance.html",
    ROOT / "academy/arm-framework/index.html",
]

MENU_LINKS = (
    ('/field/', 'Field Index'),
    ('/tools/', 'Tools'),
    ('/case-studies/', 'Evidence'),
    ('/arcturians/', 'Arcturians'),
    ('/guardian/', 'Guardian record'),
    ('/signal-archives/', 'Archive'),
)

TOP_LINKS = (
    ('/', 'Home', 'home'),
    ('/field/', 'Index', 'field'),
    ('/tools/', 'Tools', 'tools'),
    ('/support/', 'Support', 'support'),
)


def route_for(page: Path) -> str:
    relative = page.relative_to(ROOT).as_posix()
    if relative == 'index.html':
        return 'home'
    return relative.removesuffix('/index.html').removesuffix('.html').split('/')[0]


def shell(route: str) -> str:
    links = []
    for href, label, key in TOP_LINKS:
        current = ' aria-current="page"' if route == key else ''
        support = ' site-shell__link--support' if key == 'support' else ''
        links.append(f'<a class="site-shell__link{support}" href="{href}"{current}>{label}</a>')
    menu_links = []
    for href, label in MENU_LINKS:
        active = ' aria-current="page"' if href.strip('/') == route else ''
        menu_links.append(f'<a href="{href}"{active}>{label}</a>')
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="site-shell">
  <div class="site-shell__inner">
    <a class="site-shell__brand" href="/" aria-label="Arctura Observatory home"><span class="site-shell__brand-mark" aria-hidden="true"></span><strong>Arctura</strong><em>Observatory</em></a>
    <nav class="site-shell__nav" aria-label="Primary navigation">
      {''.join(links[:3])}
      <div class="site-shell__menu-wrap">
        <button class="site-shell__toggle" type="button" data-shell-toggle aria-expanded="false" aria-controls="site-menu">Browse</button>
        <div class="site-shell__menu" id="site-menu" data-shell-menu hidden>
          <p class="site-shell__menu-title">Explore the public work</p>
          <div class="site-shell__menu-grid">{''.join(menu_links)}</div>
        </div>
      </div>
      {links[3]}
    </nav>
  </div>
</header>'''


def replace_top_header(html: str, route: str, path: Path) -> str:
    if 'class="site-shell"' in html:
        return html

    replacement = shell(route)
    relative = path.relative_to(ROOT).as_posix()
    if relative == 'index.html':
        pattern = r'<header>(?:(?!</header>).)*</header>'
        updated, count = re.subn(pattern, replacement, html, count=1)
    elif relative == 'signal-archives/index.html':
        pattern = r'<header\s+class="masthead">[\s\S]*?</header>'
        updated, count = re.subn(pattern, replacement, html, count=1)
    elif relative == 'academy/index.html':
        html, first_count = re.subn(r'<nav\s+class="site-nav">[\s\S]*?</nav>', replacement, html, count=1)
        updated, second_count = re.subn(r'<nav>(?![\s\S]*?site-shell)[\s\S]*?</nav>', '', html, count=1)
        count = first_count + second_count
    elif relative.startswith('academy/'):
        pattern = r'<nav>[\s\S]*?</nav>'
        updated, count = re.subn(pattern, replacement, html, count=1)
    else:
        pattern = r'<header\s+class="site-header">[\s\S]*?</header>'
        updated, count = re.subn(pattern, replacement, html, count=1)
    if count < 1:
        raise RuntimeError(f'Expected a top navigation element in {relative}, found none.')
    return updated


def add_main_id(html: str, path: Path) -> str:
    if re.search(r'\bid="main"', html, flags=re.I):
        return html

    match = re.search(r'<main(?P<attrs>[^>]*)>', html, flags=re.I)
    if match:
        attrs = match.group('attrs')
        if not re.search(r'\bid\s*=', attrs, flags=re.I):
            replacement = f'<main id="main"{attrs}>'
            return html[:match.start()] + replacement + html[match.end():]
        return html[:match.start()] + '<div id="main" tabindex="-1"></div>' + html[match.start():]

    section = re.search(r'<section(?P<attrs>[^>]*)>', html, flags=re.I)
    if section:
        attrs = section.group('attrs')
        if not re.search(r'\bid\s*=', attrs, flags=re.I):
            replacement = f'<section id="main"{attrs}>'
            return html[:section.start()] + replacement + html[section.end():]
        return html[:section.start()] + '<div id="main" tabindex="-1"></div>' + html[section.start():]
    raise RuntimeError(f'No main or top-level section found in {path.relative_to(ROOT)}.')


def move_archive_shell_outside_grid(html: str, path: Path) -> str:
    if path.relative_to(ROOT).as_posix() != 'signal-archives/index.html':
        return html
    grid_index = html.find('<div class="page-grid">')
    shell_match = re.search(r'<a\s+class="skip"\s+href="#main">Skip to content</a>\s*<header class="site-shell">[\s\S]*?</header>', html)
    if grid_index == -1 or not shell_match or shell_match.start() < grid_index:
        return html
    shell_block = shell_match.group(0)
    html = html[:shell_match.start()] + html[shell_match.end():]
    return html.replace('<body>', '<body>\n' + shell_block, 1)


def dedupe_skip_links(html: str) -> str:
    pattern = r'<a\s+class="skip"\s+href="#main">Skip to content</a>'
    matches = list(re.finditer(pattern, html))
    if len(matches) <= 1:
        return html
    first = matches[0]
    html = html[:first.start()] + html[first.end():]
    return html


def main() -> None:
    for page in PAGES:
        text = page.read_text(encoding='utf-8')
        route = route_for(page)
        text = replace_top_header(text, route, page)
        text = add_main_id(text, page)
        text = move_archive_shell_outside_grid(text, page)
        text = dedupe_skip_links(text)
        text = "\n".join(line.rstrip() for line in text.splitlines()) + "\n"
        page.write_text(text, encoding='utf-8')
        print(f'updated {page.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
