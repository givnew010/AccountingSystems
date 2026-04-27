---
name: pr-review-checklist-skill
description: Reviews pull requests using a consistent checklist for correctness, architecture, UI consistency, performance, and testing. Use during PR review and pre-merge validation.
---

# PR Review Checklist Skill

## Review Order

1. Correctness and regression risk
2. Architecture boundary compliance
3. UI consistency with shared `@ui`
4. Error handling and edge cases
5. Test adequacy and verification quality

## Must-Check Items

- No forbidden layer imports.
- API errors handled and user feedback present.
- New UI uses shared components and consistent states.
- Risky changes include test or clear manual test plan.
- Naming and file organization remain understandable.

## Feedback Style

- Lead with high-severity findings.
- Provide concrete fix directions.
- Keep non-blocking suggestions separate from blockers.
