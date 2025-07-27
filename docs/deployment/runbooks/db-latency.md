# Runbook: Database Latency

## Alert

`MedSphereDatabaseHighLatency` — PostgreSQL p95 query latency > 500ms for 5 minutes.

## Impact

- Slow clinical workflows (charting, lab results, appointments)
- Elevated API gateway timeouts
- Kafka outbox backlog growth

## Severity

**P2** — Respond within 30 minutes

## Investigation

1. Check active connections and slow queries:
   ```sql
   SELECT pid, now() - query_start AS duration, query, state
   FROM pg_stat_activity
   WHERE state != 'idle'
   ORDER BY duration DESC
   LIMIT 20;
   ```
2. Review RDS/Cloud SQL metrics: CPU, IOPS, storage autoscaling.
3. Check for lock contention:
   ```sql
   SELECT * FROM pg_locks WHERE NOT granted;
   ```
4. Correlate with deployment or migration activity.

## Mitigation

1. Kill long-running rogue queries (after confirming with DBA):
   ```sql
   SELECT pg_terminate_backend(<pid>);
   ```
2. Scale database instance vertically if sustained CPU > 80%.
3. Enable read replicas for analytics queries if primary is overloaded.
4. Pause non-critical worker jobs consuming DB connections.

## Prevention

- Ensure Prisma connection pool limits are configured per service
- Run `EXPLAIN ANALYZE` on top slow queries monthly
- Maintain index hygiene via scheduled `VACUUM ANALYZE`

## Escalation

- DBA on-call if latency persists > 30 minutes
- Clinical ops if patient-facing SLAs breached
