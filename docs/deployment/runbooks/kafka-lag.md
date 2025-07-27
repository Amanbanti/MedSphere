# Runbook: Kafka Consumer Lag

## Alert

`MedSphereKafkaLagHigh` — Consumer group lag > 1000 messages for 10 minutes.

## Impact

- Delayed notifications (lab results, appointment reminders)
- Stale search indexes
- Outbox event processing backlog

## Severity

**P2** — Respond within 30 minutes

## Investigation

1. Identify lagging consumer groups:
   ```bash
   kafka-consumer-groups.sh --bootstrap-server $KAFKA_BROKERS \
     --describe --all-groups | grep -v '^$'
   ```
2. Check worker and notification pod logs:
   ```bash
   kubectl logs -n medsphere deploy/worker --tail=200
   kubectl logs -n medsphere deploy/notification --tail=200
   ```
3. Review broker disk usage and under-replicated partitions.
4. Check for poison messages causing repeated failures.

## Mitigation

1. Scale worker replicas:
   ```bash
   kubectl scale deployment/worker -n medsphere --replicas=4
   ```
2. Pause non-critical consumers temporarily to drain critical topics first.
3. Increase partition count for hot topics (requires planning window).
4. Skip or DLQ poison messages after manual review.

## Recovery validation

- Consumer lag trending down on Grafana **Kafka Consumer Lag** panel
- Notification delivery latency back within SLO
- Search index freshness checks passing

## Escalation

- Platform on-call if brokers unhealthy
- Data engineering if schema/registry mismatch suspected
