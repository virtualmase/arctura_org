# Arctura — Content Architecture (Revision 2)

Status: `active`
Supersedes: Revision 1 of this document (the "semantic-ontology education
pivot" plan). That plan was never implemented as written — the live site at
arcturaorg.vercel.app / arctura.org took a different, more concrete direction.
This revision describes what is actually live and what it implies for
`arctura.network`.

## What changed since Revision 1

Revision 1 proposed an Ontology-education silo (knowledge graphs, controlled
vocabularies, structured data) with Protocol publishing the site's own JSON-LD
schema as a worked example. That did not ship. Instead, three concrete
systems were built:

| System | What it does | Current state |
|---|---|---|
| **ARMS** (`/autonomous-resource-management/`) | Agent authorization control plane — identity, mandate, permission, approval gate, execution receipt, audit/revocation | Conceptual, well-specified. Recommended first build: in-browser mandate editor / policy simulator |
| **Protocol** (`/protocol/`) | Lightning-to-EVM payment verification bridge — lets downstream systems confirm a Lightning payment cleared without running their own node | Early-stage / building. One verified test transaction. Contract (`Arctura.sol`) targeting Base mainnet. SDK + MCP server in development |
| **Council** (`/arcturian-council/`) | Disclosed AI decision-support service — structured intake, sourced briefs, named functional roles (Pauli/Planck/Lorentz) explicitly marked as AI functions, not personnel | Building. Explicitly not professional advice; requires human approver on consequential decisions |

This is a real shift in what Arctura *is*: not an education publisher, but an
accountable infrastructure stack for agents that need to act, pay, and decide
against real-world constraints — published transparently, with every surface
stating its own limits before its capabilities.

## The relationship between ARMS, Protocol, and Council

These are not three independent products. They are three layers of one
operating stack, and the site does not currently say this anywhere:

```
   COUNCIL          decides what should happen
  (decision support, sourced brief, human approver required)
        │
        ▼
    ARMS             authorizes what may happen
  (mandate → permission → approval gate)
        │
        ▼
   PROTOCOL          verifies what did happen
  (payment proof → on-chain check → receipt)
```

A consequential action, end to end, should be able to walk this chain:
Council frames the decision and names a required human approver → ARMS
issues a bounded mandate and produces an approval-gated execution receipt →
Protocol verifies any payment leg against that mandate and emits its own
receipt. Right now each page describes its own receipt/record concept in
isolation (Council's "decision record," ARMS's "execution receipt,"
Protocol's "verification event") without stating that these are meant to
compose into one audit trail. That composition *is* the ecosystem story —
it's what should differentiate Arctura from a payments SDK or a generic
agent framework.

**This is the natural role for `arctura.network`:** not a duplicate of the
documentation on `.org`, but the live instance of this composed stack —
where mandates actually get issued, payments actually get verified, and
decisions actually get recorded, with `.org` remaining the public record /
evidence / documentation layer that explains and audits what `.network`
does. State this split explicitly once it's true; don't state it before
`.network` actually carries that role.

## Silo map (current, as deployed)

### Observatory (entry / institutional layer)
| Route | State | Note |
|---|---|---|
| `/` | live | "Make the work legible." Working model: Record → Boundary → Tool → Review |
| `/field/` | live | Directory of all public surfaces; the canonical site map |
| `/guardian/` | live | Source-note framing, kept as accountable operating posture, not lineage claim |
| `/arcturians/` | live | Identity/orientation note; explicitly "not membership, authority, or affiliation" |

### Authorization, Verification, Decision-Support (the real ecosystem core)
| Route | State | Note |
|---|---|---|
| `/autonomous-resource-management/` (ARMS) | conceptual, well-specified | Build order stated on-page: policy simulator before real connections |
| `/protocol/` | building | Highest-risk surface — see Open Items below |
| `/arcturian-council/` | building | Broken link: "Read Collective mandates" → `/collective/` resolves to Field Index, not a real page |

### Evidence / Portfolio
| Route | State | Note |
|---|---|---|
| `/case-studies/` | live | Evidence-oriented records for claims and outcomes |
| `/products/` | live | Public portfolio |

### Tools
| Route | State | Note |
|---|---|---|
| `/tools/` | live | Local-first, dependency-free browser utilities |

### Archive (bounded, out of active build path)
| Route | State | Note |
|---|---|---|
| `/academy/` | archived reference | Nav still lists it in the primary footer alongside live surfaces — inconsistent with its own "archived, review date/scope before relying on it" framing |
| `/signal-archives/` | archived reference | Long-form legacy material; explicit "does not replace current record" boundary already present |

## Open items (blocking, in priority order)

1. **Protocol needs its threat model published before any more feature
   surface ships.** The page itself states this requirement (security path:
   "write the threat model first," before fees/escrow/high-value usage).
   An unaudited contract targeting mainnet is real exposure — treat this as
   a hard gate, not a roadmap item, on SDK/MCP work.
2. **Fix or remove the `/collective/` link** on the Arcturian Council page.
3. **Decide and state the `.org` / `.network` split explicitly**, once
   `.network` is actually carrying the "live instance" role described above.
   Don't imply the split before it's real.
4. **Resolve the Academy nav inconsistency** — either drop it from the
   primary footer nav (leaving it reachable only via Field Index's archive
   section) or keep it in primary nav and drop the "archived" framing. The
   current combination undercuts the site's own "state your boundary before
   the language outruns the evidence" principle.
5. **Retire or update `docs/content-architecture.md` Revision 1** (the
   ontology-education plan) — this document replaces it. Anyone reading the
   old version will build toward a direction that was superseded.

## Sitemap / llms.txt / schema.json policy (unchanged from Rev. 1)

`sitemap.xml` is only updated once a route resolves to a real, reviewed page
in a `live` state. `llms.txt` and `schema.json` should be checked against
this revision — the Rev. 1 patch rewrote them around the ontology-education
framing, which is now itself stale and needs a second pass describing ARMS /
Protocol / Council instead.
