# Arctura Foundation Publication Standard

## Purpose

This repository publishes the Arctura Foundation education site and, during
migration, selected routes for the Foundation-sponsored Arctura Observatory.
Arctura Network is maintained separately.

## Release boundary

Changes begin on a named preview branch. Production `main` changes through a
reviewed pull request or an explicitly authorized release. Domain redirects
are migration actions: do not redirect an Observatory route to arctura.space
until the equivalent destination exists and has been checked.

## Learning states

Use one of: `concept`, `curriculum-outline`, `pilot`, `active`, or `archived`.
Do not describe an outline as a course delivery, a practice artifact as an
assessment, or a completion record as a credential unless the public program
and authority behind that claim exist.

## Required learning-page contract

Every active lesson or path states its reader question, objective,
prerequisites, sequence, practice artifact, review method, current state,
learning boundary, source shelf, correction route, and next/previous path.
Machine-readable metadata must match visible claims.

## Evidence policy

Separate observed facts, interpretations, proposals, and unknowns. Material
facts should link to stable sources. A format validator proves format only. A
self-audit is not independent assurance. Claims about learner outcomes,
accreditation, security, accessibility, discovery, adoption, or institutional
status require specific evidence and accountable review.

## Technical discovery

When a route is published, update internal links, `sitemap.xml`, `llms.txt`,
structured data, the curriculum catalog when applicable, and redirects. Each
page needs one canonical URL, a unique title and description, one main heading,
and crawlable links that do not depend on JavaScript.

## Required release checks

- validate curriculum JSON against its schema;
- validate shared navigation and HTML invariants;
- check JavaScript syntax and tool tests;
- check internal links and redirect destinations;
- parse sitemap and JSON discovery files;
- inspect responsive layout, keyboard navigation, focus behavior, and contrast;
- inspect browser-console errors in a preview;
- record the exact commit, checks, known limits, and correction route.
