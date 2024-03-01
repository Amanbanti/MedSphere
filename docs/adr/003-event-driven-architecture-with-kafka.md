# ADR-003: Event-Driven Architecture with Kafka

## Status

Accepted

## Context

Clinical workflows span multiple bounded contexts (order → result → notification → billing).

## Decision

Domain events published to Kafka for cross-service communication; synchronous REST for query/command API.

## Consequences

Pros: decoupling, scalability, audit trail. Cons: eventual consistency, operational complexity.
