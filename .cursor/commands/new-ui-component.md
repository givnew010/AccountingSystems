# New UI Component Command

Use this workflow when creating a new UI component.

## Steps

1. Confirm no existing component in `components/ui` solves the use-case.
2. Choose a clear `PascalCase` component name.
3. Reuse existing design tokens and patterns from `@ui`.
4. Support common states (`default`, `disabled`, `loading`, `error` if relevant).
5. Expose minimal, explicit props.
6. Add usage snippet to page/test playground if available.

## Must Validate

- Visual consistency with existing `@ui` controls.
- Keyboard accessibility for interactive elements.
- No duplicated behavior already provided by another UI component.
