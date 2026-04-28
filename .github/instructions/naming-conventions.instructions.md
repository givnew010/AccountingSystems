---
name: "naming-conventions"
description: "Enforce naming conventions for files, symbols, and domain terms"
applyTo: "**"
---

# Naming Conventions

Keep naming predictable across the project:

- Vue components: `PascalCase` (example: `UiInvoiceCard.vue`).
- Composables: `useXxx` (example: `useInvoiceFilters.ts`).
- Utilities: `camelCase` function names with verb-first style.
- Constants: `UPPER_SNAKE_CASE` for module-level immutable constants.

## File naming

- Components: `PascalCase.vue`.
- Composables and TS modules: `kebab-case.ts` or project-preferred standard.
- Avoid ambiguous names like `helper`, `util2`, `temp`.

## Domain naming

- Use one canonical term per concept (invoice, voucher, ledger, account).
- Avoid mixed synonyms for the same field across modules.
- Keep API DTO names distinct from UI view-model names.
