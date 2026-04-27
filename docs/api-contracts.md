# API Contracts

## Purpose

Define conventions for API requests, responses, and error behavior to reduce integration surprises.

## Request Conventions

- Use typed request payloads where possible.
- Keep optional fields explicit and documented.
- Send stable date/time format across modules.
- Avoid leaking UI-only fields into API payloads.

## Response Conventions

- Normalize API responses before exposing them to UI.
- Keep DTO (server shape) separate from view-model (UI shape).
- Use predictable defaults for missing nullable fields.

## Error Contract

- Every failed request should map to a normalized app error object.
- Validation errors should expose field-level details when available.
- Unknown server errors map to a generic user message and include technical logging context.

## Retries and Timeouts

- Retry only idempotent operations when safe.
- Use bounded timeout values to avoid hanging requests.
- Surface retry actions in UI where user recovery is possible.

## Versioning Notes

- Prefer non-breaking API changes.
- If payload shape changes, update mapper functions first.
- Keep backward compatibility layer during rollout windows.
