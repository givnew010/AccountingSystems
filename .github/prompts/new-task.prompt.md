---
description: "Create a new project task from short inputs. Produces an actionable plan, touched files, test checklist, acceptance criteria, and an estimate."
name: "Create New Task"
argument-hint: "Provide Task title, Business goal, Requested by, Priority, Due date, Related module/page, Dependencies"
agent: "agent"
tools: [search]
---

Use the message you provide (or the selected text) as the input. Parse the following fields when present:

- Task title:
- Business goal:
- Requested by:
- Priority: (High/Medium/Low)
- Due date:
- Related module/page:
- Dependencies:
- Additional context:

Generate a clear, actionable task specification with these sections (Markdown):

1. Summary — one-line summary of the task
2. Acceptance Criteria — concise, testable bullets
3. Implementation Plan — ordered subtasks with a short description for each
4. Files to Change — list workspace-relative paths. If the user has not provided files, ask them to explicitly list the files to change (do not perform an automatic workspace search). If the user only supplies a high-level `Related module/page`, you may suggest likely files but always request the user to confirm or explicitly list the exact paths.
5. Test / Verification Checklist — steps to verify the feature is done
6. Definition of Ready — quick checklist (scope, dependencies, infra, approvals)
7. Estimate — time estimate or story-point suggestion and confidence level
8. Suggested PR title and labels

If any required field is missing from the input, ask one concise follow-up question that collects only the missing information. If `Files to Change` is missing, explicitly prompt the user to list the workspace-relative file paths to change (do not auto-search the repository). Keep output focused and avoid multi-step digressions.

Example output:

Summary: Add CSV import for suppliers to speed bulk onboarding.

Acceptance Criteria:

- Upload CSV and map columns to supplier fields.
- Validate required rows and show error rows with reasons.
- Persist valid records and show success summary.

Implementation Plan:

1. Add `UiFileUpload` component and validation (1 day)
2. Create service `services/suppliers/import.ts` to parse and validate (0.5 day)
3. Wire API endpoint and store mapping (0.5 day)
4. Add unit tests and e2e verification steps (0.5 day)

Files to Change:

- stores/suppliers.ts
- pages/suppliers.vue
- components/UiFileUpload.vue

Test / Verification Checklist:

- Upload well-formed CSV → suppliers created
- Upload CSV with invalid rows → errors shown, valid rows saved

Definition of Ready:

- UX mock approved
- CSV format spec attached
- Backend endpoint available or ticket created

Estimate: 2.5 days (medium confidence)
