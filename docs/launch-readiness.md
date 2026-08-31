# Public Launch Readiness

Status: candidate  
Updated: 2026-08-30

This record defines what “public ready” means for `arctura.org`. Passing an
automated check proves the listed implementation, not educational outcomes,
legal status, accessibility conformance, security assurance, or adoption.

## Content

- [x] Clear education-first purpose and three distinct learning domains.
- [x] Start Here orientation and shared learning/review method.
- [x] One complete guided practice module per domain.
- [x] Copyable artifact, review questions, sources, and limits in each module.
- [x] Observatory, Network, and future `.space` responsibilities separated.
- [x] Editorial, correction, accessibility, legal, privacy, and security routes.
- [x] Useful custom 404 and legacy-route redirects.

## Discovery and platform

- [x] Unique titles, descriptions, canonical URLs, headings, and structured data.
- [x] Responsive WebP images, intrinsic dimensions, alt text, and image sitemap.
- [x] Sitemap coverage matches every indexable canonical route.
- [x] `robots.txt`, `llms.txt`, curriculum catalog, schema graph, and HTML agree.
- [x] Page-level `noindex` can operate without a contradictory global header.
- [x] Security, HSTS, framing, content-type, referrer, and permissions headers.
- [x] Browser-local tools require no account and transmit no entered content.

## Accessibility and quality

- [x] Skip links, landmarks, one primary heading, keyboard navigation, focus,
      reduced motion, responsive layouts, and descriptive content images.
- [x] Automated checks cover shared HTML, links, metadata, JSON-LD, and assets.
- [ ] Independent WCAG 2.2 AA conformance evaluation.
- [ ] Documented screen-reader, magnification, voice-input, and high-contrast matrix.
- [ ] External educational review of all three guided modules.
- [ ] Learner testing or outcome evidence.

## Institutional and operational boundaries

- [x] Accreditation, certification, nonprofit, grantmaking, and outcome limits stated.
- [x] Public correction and contribution route.
- [x] Domain-level MX and SPF records observed for `arctura.org`.
- [x] Publish `learn@arctura.org` for learning/accessibility and
      `signal@arctura.org` for corrections, public-record, and security
      coordination.
- [ ] Confirm both published mailboxes by sending and receiving controlled test
      messages.
- [ ] Publish named accountable leadership, authorship, or editorial review when
      the owner is ready to make those identities and roles public.
- [ ] Choose and publish a repository/content license if reuse is intended.

## Required release evidence

1. `validate_content.py`, `validate_shell.py`, and `validate_launch.py` pass.
2. JavaScript syntax, tool behavior, JSON/XML parsing, and `git diff --check` pass.
3. Preview routes and assets return expected status and content types.
4. Unknown route returns 404 and is not indexable.
5. Legacy routes redirect to current relevant surfaces.
6. Production repeats the route, asset, header, and crawler checks after merge.
