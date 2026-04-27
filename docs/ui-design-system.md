# UI Design System Guide

## Objective

Ensure all new interfaces follow a single visual and interaction language using shared `@ui` components.

## Core Rule

Always use existing `@ui` components before creating custom UI markup/classes.

## Preferred Components

- Actions: `UiButton`, `UiToggleButton`, `UiToggleButton2`
- Inputs: `UiCheckbox`, `UiSelect`
- Feedback: `UiBadge`, `UiToolTip`
- Layout/interaction: `UiModal`, `UiScroll`, `UiIcon`

## Styling Consistency

- Keep spacing scale consistent across screens.
- Reuse existing typography hierarchy.
- Keep color usage aligned with semantic intent (primary, success, warning, danger).
- Preserve border-radius and focus styles from system components.

## Interaction Consistency

- Disable actionable buttons during async actions.
- Use consistent loading indicators and disabled states.
- Maintain predictable hover/focus/active behavior.
- Keep modal interactions consistent (open, close, confirm patterns).

## When Variant Is Missing

1. Check if an existing `@ui` component supports extension via props/slots.
2. Add a controlled variant to that component.
3. Avoid introducing one-off custom controls that duplicate existing behavior.

## Anti-patterns

- Raw HTML button/input styles for common controls.
- Inline hardcoded colors that bypass design tokens.
- New interaction pattern for an existing solved use-case.
