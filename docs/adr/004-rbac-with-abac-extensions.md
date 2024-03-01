# ADR-004: RBAC with ABAC Extensions

## Status

Accepted

## Context

HIPAA requires minimum necessary access with emergency override capability.

## Decision

Role-based permissions with attribute-based tenant/facility scoping and break-glass override.

## Consequences

Pros: fine-grained control, compliance. Cons: permission matrix complexity, policy testing burden.
