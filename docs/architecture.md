# System Architecture

## Goal

This document defines the project architecture for predictable growth, safer refactors, and faster onboarding.

## Layers

1. UI Layer (`pages`, `components`)
   - Handles rendering and user interaction.
   - Delegates business logic to composables/services.

2. Composables Layer
   - Encapsulates feature workflows, local state orchestration, and view-model preparation.
   - Calls services for data operations.

3. Services Layer
   - Owns business rules, transformations, and use-case-level operations.
   - Calls API clients and maps responses to app-friendly shapes.

4. API Layer
   - Low-level HTTP requests and endpoint bindings.
   - No UI imports or feature-specific rendering logic.

## Dependency Direction

Only this direction is allowed:

`UI -> composables -> services -> api`

Avoid reverse imports to prevent tight coupling.

## Design Principles

- Keep side effects in composables/services, not in basic UI atoms.
- Prefer explicit input/output contracts between layers.
- Centralize repeated logic instead of duplicating in pages.
- Keep UI components reusable and focused on presentation.

## Typical Feature Flow

1. Page calls feature composable.
2. Composable validates state and triggers service operation.
3. Service calls API and normalizes response.
4. Composable updates UI-facing state and exposes actions.
5. UI renders state with shared `@ui` components.

## Refactor Safety Rules

- Move duplicated API calls to service functions.
- Move duplicated state orchestration to composables.
- Add regression tests before risky architecture changes.
