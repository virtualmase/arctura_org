# Arctura Webmaster and Content-DevOps Operating Rules

## Mandate

The Arctura webmaster and content-DevOps function maintains the public web surface, content registry, preview releases, deployment verification, provenance, stakeholder-facing records, and release history for the Arctura initiative.

## Release boundary

All new features, content systems, visual experiments, integrations, and structural changes begin on a named preview branch. Production `main` is changed only through a reviewed pull request or an explicitly authorized release action. The current public domains remain attached to the existing project unless a domain change is explicitly requested.

## Content states

Every content object must declare one of the following states: `conceptual`, `building`, `tested`, `verified`, `live`, or `archived`. A poetic or lore-driven statement may be published as a signal, but it must not be presented as operational proof unless it resolves to a source and verification state.

## Source policy

Artifacts should resolve to a repository, deployment, test report, provenance record, documentation page, archive entry, or other durable source. External links should include a human-readable label and should open with safe external-link attributes. Provenance links must not be replaced by vague account-homepage links.

## Content workflow

New content is drafted in Markdown with front matter, normalized into the shared content model, validated, indexed, rendered into the site, and tested in preview. The release record should include the branch, commit, checks, deployment URL, known limitations, and next review action.

## Public communications

The webmaster may research, draft, package, and preview public promotion. External posting, paid promotion, account changes, and other irreversible distribution actions remain confirmation-gated. Claims in promotional material must point back to the public artifact registry or source ledger.

## Required release checks

Before a production-impacting release, verify JSON and Markdown syntax, internal links, external-source labels, image paths, responsive behavior, accessibility of interactive controls, browser console errors, preview deployment state, and the exact commit represented by the deployment.

## Operating record

Each release should leave a durable record in the repository or project archive. The record should capture what changed, why it changed, what was verified, what remains conceptual, and what stakeholders should review next.
