# Arctura Foundation

This repository publishes [arctura.org](https://arctura.org/), the developing
Arctura Foundation education site. Its learning model focuses on engineering
judgment, semantic ontology, and systems stewardship.

The Arctura Observatory is a Foundation-sponsored applied-learning project.
Its selected `.org` routes are transitional; the intended permanent home is
`arctura.space`. [Arctura Network](https://arctura.network/) is a separate
repository and operating surface.

## Public architecture

| Route | Reader task | State |
|---|---|---|
| `/` | Understand the Foundation and choose a learning domain | Developing institution |
| `/learning/` | Compare the three learning paths | Curriculum catalog |
| `/learning/engineering-judgment/` | Learn defensible decisions under constraint | Curriculum outline |
| `/learning/semantic-ontology/` | Learn shared meaning and knowledge models | Curriculum outline |
| `/learning/systems-stewardship/` | Learn accountable coordination and improvement | Curriculum outline |
| `/foundation/` | Inspect mission, status, and ecosystem boundaries | Public record |
| `/observatory/` | Understand the sponsored project and migration | Transitional project |
| `/tools/` | Create a local Signal Brief or Claim Record | Working Observatory tool |
| `/case-studies/` | Inspect bounded evidence records | Working Observatory record |
| `/legal/` | Inspect educational, institutional, privacy, and security boundaries | Public record |

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
node --check tools/signal-brief.js
node --check tools/claim-record.js
node scripts/test_claim_record.js
git diff --check
```

Also parse `sitemap.xml`, `schema.json`, and `vercel.json`, inspect all internal
links, and perform responsive, keyboard, and browser-console review before a
production merge.

## Status boundaries

The Foundation does not currently claim accreditation, degree authority,
recognized certification, active cohorts, guaranteed learning outcomes,
incorporated nonprofit status, or active grantmaking. Update public language
only when a dated, inspectable record supports the change.

No license file is currently included. Treat repository content as proprietary
unless the owner publishes an explicit license or grants specific permission.
