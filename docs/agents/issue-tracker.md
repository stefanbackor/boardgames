# Issue tracker: GitHub

Issues and specs live in GitHub Issues for `stefanbackor/boardgames`.
Use the `gh` CLI inside this clone; it infers the repo from the remote.

## Conventions

- Create: `gh issue create --title "..." --body-file <file>`.
- Read: `gh issue view <number> --comments`; include labels when needed.
- List: `gh issue list --state open --json number,title,body,labels,comments`.
  Apply label and state filters appropriate to the task.
- Comment: `gh issue comment <number> --body-file <file>`.
- Label: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`.
- Close: `gh issue close <number> --comment "..."`.

Write multiline bodies to a temporary file and pass `--body-file`.

When a skill says "publish to the issue tracker", create a GitHub issue.
When it says "fetch the relevant ticket", read the issue with comments.

## Pull requests as a triage surface

**PRs as a request surface: no.**

If enabled later, triage external PRs using the same labels and states as
issues, with `gh pr` commands. Include PR descriptions, comments, and diffs.
External authors have author associations `CONTRIBUTOR`,
`FIRST_TIME_CONTRIBUTOR`, or `NONE`.

GitHub issues and PRs share a number space. Resolve ambiguous references
with `gh pr view <number>`, falling back to `gh issue view <number>`.

## Wayfinding operations

For `/wayfinder`, use one issue labelled `wayfinder:map` as the map,
with Notes, Decisions-so-far, and Fog in its body.

Link child tickets as GitHub sub-issues. If unavailable, use a task list
in the map and put `Part of #<map>` in each child. Label children
`wayfinder:<type>`: research, prototype, grilling, or task.

Use native GitHub issue dependencies for blockers. If unavailable,
record `Blocked by: #<number>` references in the child body.
A ticket is unblocked when every blocker is closed.

Select the first open, unassigned, unblocked child in map order.
Claim it with `gh issue edit <number> --add-assignee @me`.
Resolve it by commenting with the answer, closing it, and appending
a concise finding and link to the map's Decisions-so-far.
