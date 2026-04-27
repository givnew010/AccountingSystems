---
name: commit-message-skill
description: Generates high-quality commit messages based on code changes and intent. Use when preparing commits, reviewing diffs, or standardizing commit style across the project.
---

# Commit Message Skill

## Objective

Write clear commit messages that capture the reason for change, not only file edits.

## Preferred Format

`type(scope): short summary`

Body:
- Why the change was needed
- Key behavior impact
- Risk or migration notes (if relevant)

## Types

- `feat`: new capability
- `fix`: bug resolution
- `refactor`: internal improvement without behavior change
- `docs`: documentation only
- `test`: tests added/updated
- `chore`: maintenance/config changes

## Quality Rules

- Keep title concise and action-oriented.
- Avoid vague titles like "update files".
- Mention domain context (invoice, ledger, report) when useful.
