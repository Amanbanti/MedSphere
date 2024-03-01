# ADR-001: Monorepo with Turborepo and pnpm

## Status

Accepted

## Context

MedSphere has 14 Next.js portals, 20+ NestJS microservices, and 5+ shared packages requiring coordinated releases.

## Decision

Use a pnpm workspace monorepo orchestrated by Turborepo for all apps, services, and shared packages.

## Consequences

Pros: shared types, atomic changes, unified CI. Cons: larger clone size, requires disciplined package boundaries.
