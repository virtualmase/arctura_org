# Contributing to ARCTURA

ARCTURA accepts specific corrections and carefully bounded improvements through
the public GitHub repository. Opening an issue or pull request does not create
an instructor, reviewer, employment, partnership, or governance relationship.

## Report a content problem

Open an issue with:

- the exact public URL;
- the statement, interaction, or accessibility barrier involved;
- what you believe should change and why;
- a primary source when the change concerns a material fact;
- enough environment detail to reproduce a technical defect.

Do not include personal, confidential, regulated, or security-sensitive data.
Send sensitive corrections and security issues to `signal@arctura.org`, as
listed in `.well-known/security.txt`, rather than opening a public issue. Send
accessibility barriers or alternative-format requests to `learn@arctura.org`.

## Propose a content change

Keep changes narrow. Preserve the educational boundary, ecosystem separation,
ARCTURA-first public voice, footer-only institutional signature, descriptive
image text, and correction links. A technical source may support a statement
without endorsing ARCTURA or establishing learner outcomes.

Run before requesting review:

```bash
python3 scripts/validate_content.py
python3 scripts/validate_shell.py
python3 scripts/validate_launch.py
node --check tools/signal-brief.js
node --check tools/claim-record.js
node scripts/test_claim_record.js
git diff --check
```

## Licensing boundary

The repository currently has no license file. Public visibility does not grant
permission to copy, redistribute, or create derivative works. A contribution
does not change those terms unless the repository owner publishes an explicit
license or written agreement.
