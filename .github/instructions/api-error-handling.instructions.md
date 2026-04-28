---
name: "api-error-handling"
description: "Enforce consistent API error handling and feedback behavior"
applyTo: "**"
---

# API Error Handling

Use a uniform strategy for API failures:

- Catch API errors in `services` or feature composables, not in generic UI atoms.
- Convert raw API errors into normalized app errors.
- Map known status codes to clear user-facing messages.
- Log unexpected errors with diagnostic context.

## Error classes

- Validation errors: show field-level messages where possible.
- Permission/auth errors: show access/session message and recovery action.
- Network/timeout errors: show retry-friendly message.
- Unknown errors: generic message + diagnostics logging.

## Must avoid

- Swallowing errors silently.
- Rendering raw backend error strings directly to users.
- Duplicated ad-hoc error messages for the same scenario.
