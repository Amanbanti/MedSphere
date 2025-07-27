# Insurance API

Base path: `/api/v1/insurance` (via API gateway → `insurance` service)

## Payers & Coverage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/payers` | List payers |
| POST | `/payers` | Register payer |
| GET | `/coverages` | Patient coverage list |
| POST | `/coverages` | Add coverage record |

## Eligibility

| Method | Path | Description |
|--------|------|-------------|
| POST | `/eligibility/check` | Run eligibility verification |

### Request

```json
{
  "patientId": "uuid",
  "payerId": "uuid",
  "memberId": "MBR123",
  "serviceTypeCodes": ["30", "98"]
}
```

### Response (X12-like)

```json
{
  "traceNumber": "ELG-ABC123",
  "eligibilityStatus": "ACTIVE",
  "planName": "Standard PPO",
  "benefits": [
    { "serviceTypeCode": "30", "coverageLevel": "IND", "benefitAmount": 25, "inNetwork": true }
  ],
  "rawSegments": ["ISA*...", "EB*..."]
}
```

## Prior Authorization

| Method | Path | Description |
|--------|------|-------------|
| GET | `/prior-auth` | List authorizations |
| POST | `/prior-auth` | Submit prior auth request |
| PATCH | `/prior-auth/:id` | Update status |

## Claims

| Method | Path | Description |
|--------|------|-------------|
| GET | `/claims` | Paginated claims |
| POST | `/claims` | Create draft claim |
| GET | `/claims/:id` | Claim with lines & history |
| PUT | `/claims/:id` | Update draft claim |
| POST | `/claims/:id/submit` | DRAFT → SUBMITTED |
| POST | `/claims/:id/adjudicate` | Simulate payer adjudication |

### Claim status workflow

```
DRAFT → SUBMITTED → ACCEPTED|PENDING → PAID|DENIED → APPEALED → CLOSED
```

## Denials & Appeals

| Method | Path | Description |
|--------|------|-------------|
| GET | `/claims/:id/denials` | List denials |
| POST | `/claims/:id/appeals` | File appeal |

## Remittance

| Method | Path | Description |
|--------|------|-------------|
| GET | `/remittance` | ERA list |
| POST | `/remittance/import` | Import 835 ERA payload |

## Events (Kafka)

| Topic | Trigger |
|-------|---------|
| `insurance.claim.submitted` | Claim submission |
| `insurance.claim.adjudicated` | Payer response |
| `insurance.eligibility.checked` | Eligibility run |

## Headers

Same as billing: `Authorization`, `X-Organization-Id`, optional `X-Correlation-Id`.
