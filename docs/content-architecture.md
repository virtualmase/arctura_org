# ARCTURA — Learning Architecture

Status: `active`
Updated: 2026-08-30

This document is the current source of truth for `arctura.org`. It supersedes
both the ARM operator-tier Academy model and Revision 2's proposal to make the
site an agent authorization/payment/decision-support stack.

## Institutional model

`arctura.org` is the public home of **ARCTURA**, a developing
education organization for people working with complex technical systems.

The **Arctura Observatory** is a Foundation-sponsored applied-learning and
public-record project. It is not the Foundation itself. Its tools, case
records, and source notes provide practice material for Foundation learning.
Its intended permanent home is `arctura.space`. During migration,
`arctura.org/observatory/` and selected legacy project routes remain available
so links do not break before the destination is ready.

`arctura.network` is the separate Arctura Network. Its current work-order,
review, agreement, and record model provides a real context in which the
Foundation's learning domains can be applied. The Foundation site must not
claim to operate the Network or duplicate its implementation documentation.

## Educational purpose

Arctura Foundation develops the ability to reason and act responsibly across
complex systems. Its programs combine concepts, cases, inspectable artifacts,
and review. They do not substitute branding or credentials for demonstrated
understanding.

### Core learning domains

1. **Engineering judgment** — framing decisions; recognizing constraints,
   tradeoffs, uncertainty, failure modes, and evidence limits; recording a
   defensible decision and conditions for review.
2. **Semantic ontology** — identifying entities, concepts, relationships,
   states, and vocabularies; building shared models that people and software
   can interpret and challenge.
3. **Systems stewardship** — specifying useful work, coordinating human and
   software contributors, reviewing results, preserving records, governing
   change, and improving a shared system over time.

Quantum topics are not a core pillar. They may be developed later only if the
Foundation has qualified instruction, a mathematically sound curriculum, and
clear evidence of learner need.

## Learning pattern

Every learning unit should move through four stages:

| Stage | Learner action | Inspectable output |
|---|---|---|
| Concept | Learn terms, models, history, and boundaries | Vocabulary or model note |
| Case | Examine evidence and competing interpretations | Annotated case analysis |
| Artifact | Apply the model to a bounded problem | Decision record, ontology, or stewardship plan |
| Review | Explain, challenge, and revise the work | Review note and revision history |

## Public route map

### Foundation

| Route | Purpose |
|---|---|
| `/` | Foundation entry and the three-domain learning model |
| `/foundation/` | Mission, status, institutional commitments, and boundaries |
| `/learning/` | Learning catalog and shared learning pattern |
| `/learning/start/` | 30-minute orientation and first practice cycle |
| `/learning/method/` | Concept, case, artifact, review, and shared rubric |
| `/learning/engineering-judgment/` | Engineering judgment pathway |
| `/learning/engineering-judgment/decision-record/` | Guided decision-record practice |
| `/learning/semantic-ontology/` | Semantic ontology pathway |
| `/learning/semantic-ontology/domain-model/` | Guided domain-model practice |
| `/learning/systems-stewardship/` | Systems stewardship pathway |
| `/learning/systems-stewardship/review-cycle/` | Guided stewardship review-cycle practice |
| `/editorial/` | Claims, sourcing, authorship, review, and corrections standard |
| `/accessibility/` | Accessibility target, current support, known limits, and feedback |
| `/legal/` | Legal, educational, privacy, and security boundaries |

### Foundation-sponsored project

| Route | Purpose |
|---|---|
| `/observatory/` | Transitional Observatory entry; future canonical home is `arctura.space` |
| `/tools/` | Browser-local learning tools |
| `/case-studies/` | Worked claim and evidence records |
| `/field/` | Observatory surface directory during migration |

## Content to retire or reframe

- Retire the Node / Hub / Sovereign operator-tier framework, revenue-sharing
  language, unverified cohort schedules, prices, enrollment promises, and
  on-chain credential claims.
- Retire Protocol payment-bridge, ARMS control-plane, and named AI Council
  pages from the active Foundation architecture. Preserve history in Git;
  public routes should point to the current learning model.
- Remove Signal Archives, starseed/lineage claims, and Guardian mythology from
  active navigation. They are not part of the Foundation curriculum or
  institutional identity.
- Reuse genuinely educational material only after it is rewritten with clear
  outcomes, prerequisites, sources, exercises, and evidence boundaries.
- Do not claim accreditation, degrees, certifications, active cohorts,
  nonprofit status, grants, partnerships, or instructors until a public record
  supports each claim.

## Publication standard

A learning page is ready for active navigation only when it states:

1. what the learner will be able to do;
2. what prerequisite knowledge is expected;
3. the sequence of concepts and practice;
4. the artifact the learner will produce;
5. how the artifact can be reviewed;
6. the limits of the material and its current development state.

The sitemap, `llms.txt`, `schema.json`, README, and routing configuration must
describe this architecture and must not preserve superseded positioning.

### Image publication standard

Every indexable page has one page-specific editorial image that supports its
learning purpose without embedding claims or essential text. Publish a 1600 ×
900 WebP and a 960 × 540 WebP variant with a descriptive, topic-specific
filename. The HTML must use a responsive `picture`, intrinsic dimensions, and
concise alt text that describes the visible scene rather than repeating the
page title. Each page must also expose an absolute `og:image`, a matching
`og:image:alt`, and one image entry in `sitemap.xml`.

Keep meaningful text in HTML. Generated diagrams may suggest structure through
shape and material, but must not contain pseudo-labels, logos, watermarks, or
claims that cannot be inspected in the page content.

## Domain migration rule

- `arctura.org` speaks for the Foundation and its education programs.
- `arctura.network` speaks for Network participation, implementation, and
  operating records.
- `arctura.space` will speak for the Observatory and host its tools, evidence,
  and public-record surfaces.
- Do not redirect a working `.org` Observatory route until the equivalent
  `.space` route exists and has been checked. When migration begins, use
  permanent redirects route by route and update canonicals, sitemap entries,
  and inbound Foundation links in the same release.
