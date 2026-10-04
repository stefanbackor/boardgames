# Domain docs

This repo uses a multi-context layout.

## Before exploring

Read the root `CONTEXT-MAP.md`, then the `CONTEXT.md` files it identifies
as relevant to the topic.

Read relevant system-wide ADRs in root `docs/adr/` and context-specific
ADRs in the mapped app or package's `docs/adr/`.

If these files are absent, proceed silently. Domain modeling creates
them lazily as terms and decisions are resolved.

## Layout

- `CONTEXT-MAP.md`: maps domain contexts to their documentation.
- `docs/adr/`: system-wide decisions.
- `apps/<app>/CONTEXT.md` or `packages/<package>/CONTEXT.md`:
  vocabulary for a context rooted in that app or package.
- `apps/<app>/docs/adr/` or `packages/<package>/docs/adr/`:
  context-specific decisions.

Contexts follow domain boundaries; not every workspace needs its own.
The map records the actual locations.

## Vocabulary and decisions

Use glossary terms in issue titles, proposals, hypotheses, and tests.
If a needed concept is absent, reconsider the terminology or note
the gap for domain modeling.

Explicitly flag proposals that contradict an existing ADR,
identify the ADR, and explain why reopening the decision is warranted.
