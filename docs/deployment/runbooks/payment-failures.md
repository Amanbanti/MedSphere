# Runbook: Payment Failures

## Alert

`MedSpherePaymentFailureRate` — Payment completion rate < 95% over 15 minutes.

## Impact

- Patient billing and copay collection blocked
- Insurance claim submission delays
- Revenue cycle KPI degradation

## Severity

**P1** during business hours, **P2** otherwise

## Investigation

1. Check payment service health:
   ```bash
   kubectl get pods -n medsphere -l app.kubernetes.io/name=payment
   curl -s https://api.medsphere.health/payment/api/v1/health/ready
   ```
2. Review payment gateway provider status page (Stripe/simulator).
3. Inspect failed transaction logs — filter by `errorCode` and `correlationId`.
4. Verify webhook endpoint reachability and TLS certificate validity.

## Mitigation

1. Enable maintenance mode banner on billing portal if provider outage confirmed.
2. Retry failed webhooks from provider dashboard after connectivity restored.
3. Roll back payment service if regression introduced in latest deploy.
4. Switch to backup payment processor if configured (`PAYMENT_FALLBACK_PROVIDER`).

## Communication

- Notify billing operations team of outage window
- Do not expose PCI data in incident channels

## Post-incident

- Reconcile failed transactions against provider settlement reports
- File PCI-relevant incident report if cardholder data exposure suspected

## Escalation

- Finance ops lead for revenue impact assessment
- Security team for suspected fraud patterns
