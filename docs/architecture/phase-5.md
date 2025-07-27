# Phase 5 — Billing, Insurance, Payments & Notifications

## Scope

Production revenue-cycle and payer workflows:

| Domain | Prisma fragment | Services | Apps |
|--------|-----------------|----------|------|
| Billing | `08-billing.prisma` | `billing`, `payment` | `billing` |
| Insurance | `09-insurance.prisma` | `insurance` | `insurance` |
| Notifications | `11-notifications.prisma` | `notification`, `worker` | `notifications` |

## Data Model

Phase 5 replaces auto-generated stubs with field-complete models:

- **Billing:** Invoice, InvoiceLineItem, Payment, Refund, Receipt, PaymentMethod, ChargeCapture, RevenueCycleEpisode, BillingCode, Adjustment, WriteOff, Statement, Subscription, FinancialReportSnapshot
- **Insurance:** Payer, Coverage, EligibilityCheck, PriorAuthorization, Claim, ClaimLine, ClaimStatusHistory, ClaimAttachment, RemittanceAdvice, Denial, Appeal
- **Notifications:** NotificationTemplate, NotificationPreference, NotificationOutbox, DeliveryAttempt, EmailMessage, SmsMessage, PushDevice, WhatsAppMessage, AppointmentReminderJob

All models include `organizationId`, soft deletes (`deletedAt`), optimistic `version`, Decimal money fields, and tenant indexes.

Regenerate merged schema:

```bash
node tools/codegen/merge_prisma_schema.mjs
```

## Domain Logic

### Invoice lifecycle

`InvoiceLifecycleService` enforces:

- **Finalize:** DRAFT → ISSUED (computes subtotal/tax/discount/total)
- **Void:** DRAFT | ISSUED | PARTIALLY_PAID → VOID (requires reason)
- **Payment:** ISSUED | PARTIALLY_PAID → PARTIALLY_PAID | PAID

### Payment state machine

`PaymentStateMachine` transitions:

`PENDING → AUTHORIZED → CAPTURED → REFUNDED` with failure/void branches.

Idempotency keys are stored per `(organizationId, key)` on Payment and Refund.

### Claim workflow

`ClaimWorkflowService` drives submission/adjudication:

`DRAFT → SUBMITTED → ACCEPTED|PENDING → PAID|DENIED → APPEALED → CLOSED`

### Eligibility (X12-like)

`EligibilityX12Service.buildSyntheticResponse()` produces trace numbers, benefit rows, and ISA/BHT/EB segment payloads compatible with 270/271 patterns.

### Notification dispatcher

`NotificationDispatcherService` handles multi-channel fan-out, exponential backoff (`15 × 2^attempt`), and template variable rendering.

## Events & Workers

Kafka producers/consumers exist in each NestJS service (`kafka-producer.adapter.ts`, `kafka-consumer.adapter.ts`).

Worker handlers (complete implementations):

- `ClaimSubmissionJob` — uses `ClaimWorkflowService.submit`
- `NotificationFanoutJob` — retry/backoff delivery simulation
- `InsuranceEligibilityRefreshJob` — eligibility refresh batch

## API Surface

See `docs/api/billing.md` and `docs/api/insurance.md`.

## Testing

Unit tests cover money math, invoice finalize/void, payment transitions, claim status transitions, and notification backoff.
