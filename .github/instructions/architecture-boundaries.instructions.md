---
name: 'architecture-boundaries'
description: 'Enforce architecture boundaries between UI, composables, services, and api layers'
applyTo: '**'
---

# Architecture Boundaries

Follow strict boundaries to keep the codebase maintainable:

- `pages` and `components` can use `composables` and `services`.
- `composables` can use `services` and pure utilities.
- `services` can call `api` clients and mappers only.
- `api` layer should not import UI, page, or component code.

## Allowed flow

`UI -> composables -> services -> api`

## Disallowed examples

- Importing page/component files inside `services` or `api`.
- Calling HTTP directly in `components` when a service exists.
- Business logic embedded inside presentational UI components.

## Required behavior

- Move shared business logic into `composables` or `services`.
- Keep UI components focused on rendering and interaction.
- Use adapter/mapping functions in `services` for API payload normalization.
