---
name: ui-audit-skill
description: Audits pages and components for design consistency with shared @ui components. Use when reviewing UI quality, design-system compliance, layout consistency, and reusable component usage.
---

# UI Audit Skill

## Goal

Find and report UI inconsistencies quickly, then propose practical fixes aligned with `@ui`.

## Audit Workflow

1. Identify changed or target UI files.
2. Check whether existing `@ui` components were reused.
3. Detect visual/interaction inconsistencies (spacing, typography, button styles, states).
4. Flag accessibility issues (labels, keyboard flow, focus visibility).
5. Produce prioritized findings with specific fix suggestions.

## Output Format

- Critical issues (must fix)
- High-impact consistency issues
- Minor polish items
- Suggested refactor path to shared components

## Review Heuristics

- Prefer one pattern per interaction type across pages.
- Avoid raw HTML controls when `@ui` equivalent exists.
- Keep error, loading, and disabled states consistent.
