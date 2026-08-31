# ARCTURA

Arctura's primary repository for open building documentation, historical urban surveys, and spatial analysis tools. Designed to make built-environment data freely accessible to residents, researchers, and urban planners on a public, open-source basis.

This repository publishes [arctura.org](https://arctura.org/), a public
education platform for engineering judgment, semantic ontology, and systems
stewardship.

The Arctura Observatory is a Foundation-sponsored applied-learning project.
Its selected `.org` routes are transitional; the intended permanent home is
`arctura.space`. [Arctura Network](https://arctura.network/) is a separate
repository and operating surface.

## Public architecture

| Route | Reader task | State |
|---|---|---|
| `/` | Understand ARCTURA and choose a learning domain | Public entry |
| `/learning/` | Compare the three learning paths | Active catalog |
| `/learning/start/` | Complete a first 30-minute practice cycle | Active orientation |
| `/learning/method/` | Inspect the learning cycle and review rubric | Public method |
| `/learning/engineering-judgment/decision-record/` | Build a decision record | Guided practice |
| `/learning/semantic-ontology/domain-model/` | Build a small domain model | Guided practice |
| `/learning/systems-stewardship/review-cycle/` | Design a stewardship review cycle | Guided practice |
| `/foundation/` | Inspect mission, status, and ecosystem boundaries | Public record |
| `/observatory/` | Understand the sponsored project and migration | Transitional project |
| `/tools/` | Create a local Signal Brief or Claim Record | Working Observatory tool |
| `/case-studies/` | Inspect bounded evidence records | Working Observatory record |
| `/legal/` | Inspect educational, institutional, privacy, and security boundaries | Public record |
| `/editorial/` | Inspect sourcing, review, and correction practice | Public standard |
| `/accessibility/` | Inspect accessibility target, implementation, and limits | Public commitment |

Legacy Academy operator tiers, mythology archives, agent control-plane pages,
and payment-bridge concepts were removed from the working tree. Git history
preserves them. `vercel.json` redirects their former public routes to the most
relevant current surface.

## Content model

`content/curriculum.json` is the machine-readable catalog. It validates
against `content/schema/curriculum.schema.json`. Each path names a reader
question, outcome, artifact, modules, and honest publication state.

The publication standard is in `OPERATING.md`; the current information
architecture is in `docs/content-architecture.md`.

## Local development

No build step is required:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

## Validation

The Python validators require `beautifulsoup4` and `jsonschema`:

```bash
python3 scripts/validate_content.py
python3 scripts/validate_shell.py
python3 scripts/validate_launch.py
node --check tools/signal-brief.js
node --check tools/claim-record.js
node scripts/test_claim_record.js
git diff --check
```

`validate_launch.py` checks indexable-route coverage, sitemap images, launch
content depth, curriculum state, crawler controls, and the custom 404. Perform
responsive, keyboard, assistive-technology, and browser-console review in a
preview before a production merge.

## Public contact

- `learn@arctura.org` — learning resources, accessibility barriers, and
  alternative-format requests.
- `signal@arctura.org` — corrections, public-record coordination, and
  responsible security disclosure.

## Status boundaries

ARCTURA does not currently claim accreditation, degree authority,
recognized certification, active cohorts, guaranteed learning outcomes,
incorporated nonprofit status, or active grantmaking. Update public language
only when a dated, inspectable record supports the change.

No license file is currently included. Treat repository content as proprietary
unless the owner publishes an explicit license or grants specific permission.
