# Arctura Observatory

[Arctura](https://arctura.org/) is a static public observatory for an independent Arctura entity. It combines a product-led public entry, source-aware records, practical browser tools, the **Guardian of the Bear** source note, and clearly bounded archive material.

> **Working posture:** artifact → test → boundary. The site distinguishes lore, concepts, implementation records, and live public surfaces so that narrative does not outrun its evidence.

## What is in this repository

The project is intentionally lightweight. It is a static HTML, CSS, JavaScript, and JSON site deployed without a build step. Pages are organized as folders containing `index.html`; shared Observatory pages use `family.css` and `family.js`; structured registry data lives in `content/`.

| Surface | Route | Purpose |
| --- | --- | --- |
| Observatory | [`/`](https://arctura.org/) | The primary public entry: records, practical tools, evidence, boundaries, and a clear next action. |
| Field Index | [`/field/`](https://arctura.org/field/) | The stable directory of the current public surfaces, their roles, and their boundaries. |
| Guardian of the Bear | [`/guardian/`](https://arctura.org/guardian/) | A dedicated source note connecting the Arcturus/Boötes narrative to an accountable operating posture. |
| Arcturians | [`/arcturians/`](https://arctura.org/arcturians/) | A public identity note that distinguishes the Arcturian posture from Arctura’s independent entity, authority, and operating record. |
| Tools | [`/tools/`](https://arctura.org/tools/) | Local-first browser utilities: the Signal Brief Builder and Claim Record Builder. |
| Products | [`/products/`](https://arctura.org/products/) | Public portfolio and product records. |
| Evidence | [`/case-studies/`](https://arctura.org/case-studies/) | Evidence and case-study surfaces. |
| Retired Collective route | [`/collective/`](https://arctura.org/collective/) | Permanently redirects to the Field Index; it is not a current public surface. |
| Protocol | [`/protocol/`](https://arctura.org/protocol/) | Protocol-facing documentation. |
| ARMS | [`/autonomous-resource-management/`](https://arctura.org/autonomous-resource-management/) | Autonomous resource-management surface. |
| Arcturian Council | [`/arcturian-council/`](https://arctura.org/arcturian-council/) | A disclosed decision-support concept with stated limitations. |
| Academy | [`/academy/`](https://arctura.org/academy/) | Retained learning reference material; review individual pages for their scope and date. |
| Signal Archives | [`/signal-archives/`](https://arctura.org/signal-archives/) | Preserved long-form archive material with an explicit current-record boundary. |

## Routing and the Field Index

The root route (`/`) is the product-led public entry. It directs new visitors to the Field Index, the local-first tools, the evidence surface, and the public support invitation. The dedicated [`/field/`](https://arctura.org/field/) route is the stable **site directory** for visitors who need a clear map of the public architecture.

Directory routes use canonical trailing-slash URLs in navigation and the sitemap. [`vercel.json`](vercel.json) also defines clean aliases without trailing slashes—for example, both `/guardian/` and `/guardian` resolve to the Guardian page. Keep both the canonical route and its clean alias in mind whenever you add a new directory-based page.

## The Guardian of the Bear

The Guardian is a **first-class route**, not merely a theme in the homepage. Its versioned source material is held in [`content/lore/bootes-guardian.md`](content/lore/bootes-guardian.md), and the public page is implemented at [`guardian/index.html`](guardian/index.html).

The page makes the distinction between canon and operational claims explicit. It uses the Guardian story to frame an operating posture—orientation, continuity, and evidence boundaries—without presenting lore as professional advice, supernatural authority, or proof of a production capability.

## Tools

The [`tools/`](tools/) directory is a small, dependency-free tool surface. Tool pages should state their inputs, outputs, assumptions, privacy posture, and boundaries directly in the interface.

### Signal Brief Builder

The **Signal Brief Builder** at [`/tools/`](https://arctura.org/tools/) converts a decision question, desired outcome, evidence plan, boundary, accountable owner, and review date into a portable Markdown brief.

### Claim Record Builder

The **Claim Record Builder** converts a stated claim, category, evidence status, cited sources, boundary, accountable owner, and review date into a portable Markdown claim record. It makes the status of a claim visible without asserting that the tool has verified the underlying sources.

| Property | Behavior |
| --- | --- |
| Runtime | Browser-only JavaScript; no framework or build process. |
| Data handling | Form input remains in the browser. The page does not send entered data to Arctura. |
| Output | A downloadable `.md` brief or claim record suitable for a repository, text editor, or review workflow. |
| Boundary | The tools format information supplied by the user. They do not research, verify evidence, make decisions, or provide professional advice. |

New tools should use the shared design system where possible, avoid introducing dependencies without a demonstrated need, and document their data boundary in the user interface.

## Repository structure

```text
arctura_org/
├── index.html                         # Product-led public entry
├── home.css                            # Homepage-specific Observatory styles
├── family.css                          # Shared styles for Observatory-family routes
├── family.js                           # Shared registry renderer
├── site-navigation.css                 # Stable static navigation shell
├── site-navigation.js                  # Lightweight Browse-menu behavior
├── field/
│   └── index.html                     # Stable site directory and route index
├── guardian/
│   └── index.html                     # Guardian of the Bear route
├── tools/
│   ├── index.html                     # Tool directory with two browser-local builders
│   ├── signal-brief.js                # Signal Brief Markdown generation and download
│   └── claim-record.js                # Claim Record Markdown generation and download
├── content/
│   ├── arctura.json                   # Structured artifacts, guardians, signals, and graph data
│   ├── family.json                    # Registry data used by family pages
│   ├── lore/bootes-guardian.md        # Versioned Guardian source note
│   └── schema/                        # JSON schemas for structured content
├── scripts/
│   ├── validate_content.py            # Content-schema validator
│   ├── install_static_shell.py        # Stable-shell migration and maintenance helper
│   └── validate_shell.py              # Shared-shell regression validator
├── academy/                           # Academy landing page and topic pages
├── case-studies/                      # Evidence surface
├── products/                          # Product surface
├── protocol/                          # Protocol surface
├── sitemap.xml                        # Public URL index
├── robots.txt                         # Crawler guidance
├── schema.json                        # Site-level structured-data record
├── OPERATING.md                       # Publication and release rules
└── vercel.json                        # Static deployment routing configuration
```

## Local development

No package installation or build step is required for routine static-site work. Start a local server from the repository root:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/` in a browser. Test directory routes with their trailing slashes, for example:

```text
http://localhost:4173/guardian/
http://localhost:4173/tools/
http://localhost:4173/arcturian-council/
```

## Validation

Run the structured-content validator after changing `content/arctura.json` or its schema:

```bash
python3 scripts/validate_content.py
```

Before creating a pull request, also perform the following checks:

```bash
# JavaScript syntax for both browser tools
node --check tools/signal-brief.js
node --check tools/claim-record.js
node scripts/test_claim_record.js

# Stable static shell across public HTML pages
python3 scripts/validate_shell.py

# Whitespace errors in tracked changes
git diff --check

# Sitemap XML well-formedness
python3 -c "import xml.etree.ElementTree as ET; ET.parse('sitemap.xml'); print('sitemap XML is valid')"
```

The full release checklist is maintained in [`OPERATING.md`](OPERATING.md). In particular, review internal links, source labels, image paths, responsive behavior, interactive-control accessibility, browser-console errors, the preview deployment, and the exact commit represented by that deployment.

## Content model

The public constellation is driven by [`content/arctura.json`](content/arctura.json). It records four related object types:

| Object | Meaning | Required posture |
| --- | --- | --- |
| Artifact | A public object such as a website, protocol, token record, or provenance item. | Link to a durable source and describe what the record does **not** prove. |
| Guardian | A disclosed functional agent/archetype in the operating model. | Do not present as a human authority or an autonomous decision-maker. |
| Signal | A principle, lore statement, or operating claim. | State whether it is conceptual, verified, operational, or live. |
| Relationship | A graph edge connecting artifacts, guardians, and signals. | Make the relationship legible without implying unverified production status. |

Content objects must use one of these states: `conceptual`, `building`, `tested`, `verified`, `live`, or `archived`. Lore can be published as a signal, but it must not be represented as operational proof without a source and appropriate verification state.

## Contributing and release discipline

Changes should begin on a named preview branch. Keep `main` for reviewed pull requests or explicitly authorized releases. A useful change set is small, source-aware, responsive, accessible, and clear about what remains conceptual.

When adding a page or tool, update the relevant navigation surface, sitemap, and this README when the addition changes the repository’s public architecture. When adding or changing structured content, update its source record and run the validator.

Do not post publicly, change deployment domains, make paid-promotion changes, or take other irreversible external actions without explicit authorization.

## Key project documents

| Document | Use |
| --- | --- |
| [`OPERATING.md`](OPERATING.md) | Release, source, content-state, and publication rules. |
| [`TEAM.md`](TEAM.md) | Team and operating-model context. |
| [`content/schema/arctura-content.schema.json`](content/schema/arctura-content.schema.json) | Canonical schema for the Arctura content registry. |
| [`sitemap.xml`](sitemap.xml) | Public route index. |
| [`vercel.json`](vercel.json) | Static routing configuration. |

## License and usage

No license file is currently included in this repository. Treat the project’s code, text, images, and associated records as proprietary unless the repository owner adds an explicit license or grants permission for a specific use.
