# ADR-002: Clean Architecture in Microservices

## Status

Accepted

## Context

Healthcare domain complexity requires testable business logic isolated from frameworks.

## Decision

Each NestJS service follows domain/application/infrastructure/presentation layers with dependency inversion.

## Consequences

Pros: testability, swappable infra. Cons: boilerplate, learning curve for new developers.
