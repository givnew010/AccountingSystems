# Safe Refactor Command

Use this guardrail checklist before and during refactors.

## Before Refactor

- Define behavior that must not change.
- Identify critical paths and dependencies.
- Add/confirm baseline tests or manual checkpoints.

## During Refactor

- Keep changes incremental and reviewable.
- Preserve public interfaces unless intentionally changed.
- Move code without changing logic first, then optimize.

## After Refactor

- Re-run tests and key user flows.
- Verify error handling and loading states still work.
- Document any intentional behavior changes.
