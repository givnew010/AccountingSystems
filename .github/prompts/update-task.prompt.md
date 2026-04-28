---
description: "Update an existing task: produce scope diff, updated execution plan, impacted files, risks, and a new estimate."
name: "Update Task"
argument-hint: "Provide Task reference, Current status, Requested change, Reason for change, Impacted files/modules, New deadline"
agent: "agent"
tools: [search]
---

Use the message you provide (or the selected text) as the input. Parse the following fields when present:

- Task reference:
- Current status:
- Requested change:
- Reason for change:
- Impacted files/modules:
- New deadline (if changed):
- Additional context:

Produce an update that includes the following sections (Markdown):

1. Summary of Change Request — one-line summary
2. Scope Diff — separate bullets for Added, Removed, and Updated items
3. Updated Task Plan — ordered subtasks with which steps changed and any new tasks
4. Impacted Files/Modules — list workspace-relative paths. If the user has not provided impacted files, ask them to explicitly list the files/modules (do not perform an automatic workspace search). If only a high-level name is provided, you may suggest likely matches but require the user to confirm or explicitly list the exact paths.
5. Re-estimated Effort — updated time or story points and confidence
6. Risks and Mitigations — list of top risks introduced by the change and suggested mitigations
7. Updated Verification Plan & Acceptance Criteria — what to test and how to confirm the update is complete
8. Suggested Task/PR Comment — a short message you can paste into the task tracker or PR to explain the change

Also output a concise changelog block suitable for adding to the task description:

```
Changelog:
- Changed: <short description>
- Reason: <short reason>
- Impact: <files/modules>
```

If the input omits critical context (e.g., task reference, what must be preserved, or `Impacted files/modules`), ask one targeted clarifying question. If `Impacted files/modules` is missing, explicitly prompt the user to list the workspace-relative file paths (do not auto-search). Keep responses action-oriented and suitable for direct pasting into a task tracker or PR.

Example output:

Summary of Change Request: Change CSV import to reject duplicate vendors instead of merging.

Scope Diff:

- Added: duplicate-vendor validation step
- Removed: automatic merge-on-conflict
- Updated: import error reporting UI

Updated Task Plan:

1. Add duplicate check in `services/suppliers/import.ts` (0.25d)
2. Update UI mapping to surface duplicate rows (0.5d)
3. Adjust tests and e2e scenarios (0.25d)

Impacted Files/Modules:

- services/suppliers/import.ts
- components/ImportPreview.vue

Re-estimated Effort: 1.0 day (high confidence)

Risks and Mitigations:

- Risk: Backwards-incompatible behavior for existing imports → Mitigation: Add toggle flag and migration notes

Suggested Task Comment:
"Changed CSV import behavior to validate (not merge) duplicates. See scope diff above. Requires QA on sample CSVs."
