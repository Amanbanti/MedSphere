# Runbook: Auth Service Down

## Alert

`MedSphereAuthDown` — Auth service health check failing for > 2 minutes.

## Impact

- Users cannot log in or refresh tokens
- All authenticated API calls fail at the gateway
- Portal sessions expire without renewal

## Severity

**P1** — Immediate response required

## Investigation

1. Check auth pod status:
   ```bash
   kubectl get pods -n medsphere -l app.kubernetes.io/name=auth
   kubectl logs -n medsphere deploy/auth --tail=100
   ```
2. Verify database connectivity:
   ```bash
   kubectl exec -n medsphere deploy/auth -- wget -qO- http://127.0.0.1:3001/api/v1/health/ready
   ```
3. Check Redis session store (if enabled) and JWT secret rotation events.
4. Review Grafana **Auth Service** dashboard and recent deployments.

## Mitigation

1. Roll back auth deployment if correlated with a recent release:
   ```bash
   kubectl rollout undo deployment/auth -n medsphere
   ```
2. Scale auth replicas if CPU/memory saturated:
   ```bash
   kubectl scale deployment/auth -n medsphere --replicas=4
   ```
3. Verify `DATABASE_URL` and `JWT_SECRET` secrets are mounted correctly.

## Escalation

- Page platform on-call if not resolved in 15 minutes
- Notify security team if suspected credential compromise

## Post-incident

- Document root cause in incident tracker
- Update `docs/deployment/runbooks/auth-down.md` if new failure mode discovered
