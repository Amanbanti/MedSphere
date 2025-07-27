# MedSphere Admin Guide

Guide for hospital administrators and platform operators managing MedSphere.

## Access

- **URL:** `https://admin.medsphere.health`
- **Required role:** `HOSPITAL_ADMIN` or `SYSTEM_ADMIN`
- MFA enrollment required for production access

## Organization Setup

1. Navigate to **Facility Configuration** to define hospital sites and departments
2. Use **Department Setup** to map clinical units to service locations
3. Configure timezone, locale, and billing identifiers per facility

## User Provisioning

1. Open **User Provisioning**
2. Create users with appropriate roles (clinician, nurse, billing clerk, etc.)
3. Assign organization and facility scope
4. Review the **Role Matrix** to verify permission assignments

### Role Reference

| Role | Key Permissions |
|------|-----------------|
| SYSTEM_ADMIN | Full platform access |
| HOSPITAL_ADMIN | Organization management, feature flags |
| CLINICIAN | Patient chart, orders, appointments |
| BILLING_CLERK | Invoices, claims, payments |
| LAB_TECH | Lab orders and results |

## Feature Flag Management

Feature flags control rollout of platform capabilities per organization.

### Admin UI

Navigate to **Feature Flags** in the admin portal (when enabled).

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/auth/api/v1/feature-flags` | List all flags |
| GET | `/auth/api/v1/feature-flags/evaluate` | Evaluate all flags for current user |
| GET | `/auth/api/v1/feature-flags/evaluate/:key` | Evaluate single flag |
| PUT | `/auth/api/v1/feature-flags` | Create or update flag |

### Rollout Strategies

**Percentage rollout** — gradual enablement:

```json
{
  "key": "feature.ai_diagnosis",
  "enabled": true,
  "rules": { "percentage": 25 }
}
```

**Organization targeting** — enable for specific hospitals:

```json
{
  "key": "feature.telemedicine",
  "enabled": true,
  "rules": { "organizationIds": ["<org-uuid>"] }
}
```

### Built-in Flags

| Key | Description |
|-----|-------------|
| `feature.telemedicine` | Video consultation |
| `feature.ai_diagnosis` | AI-assisted diagnosis |
| `feature.dicom_viewer` | DICOM imaging viewer |
| `feature.break_glass` | Emergency PHI access |
| `feature.advanced_analytics` | Analytics dashboards |

## Compliance Dashboard

Monitor HIPAA-relevant metrics:
- Audit log volume and break-glass events
- Failed login attempts
- MFA enrollment rate
- Session timeout compliance

## Integration Monitor

Track HL7/FHIR interfaces, lab instrument feeds, and payer connectivity.
Review error rates and last successful sync timestamps.

## System Health

View real-time service health from the gateway upstream probes:
- Green: all dependencies healthy
- Yellow: degraded (non-critical upstream down)
- Red: critical service unavailable

Run external health check: `node scripts/ops/health-check-all.mjs`

## Provider Onboarding

1. Verify NPI and credentials
2. Assign specialties and scheduling templates
3. Enable portal access and MFA enrollment
4. Link to department and facility

## Incident Response

Refer to runbooks in `docs/deployment/runbooks/`:
- Auth service down
- Database latency
- Kafka consumer lag
- Payment failures

## Support Escalation

| Severity | Response Time | Contact |
|----------|---------------|---------|
| P1 (clinical outage) | 15 min | Platform on-call |
| P2 (degraded) | 30 min | DevOps team |
| P3 (non-urgent) | Next business day | support@medsphere.health |
