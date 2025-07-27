# Telemedicine API

Base path: `/api/v1/video` (via API gateway → `video-consultation` service)

## Sessions

| Method | Path | Description |
|--------|------|-------------|
| GET | `/sessions` | Paginated session list |
| POST | `/sessions` | Schedule session |
| GET | `/sessions/:id` | Session detail + signaling token |
| POST | `/sessions/:id/start` | WAITING → LIVE |
| POST | `/sessions/:id/end` | LIVE → ENDED |
| DELETE | `/sessions/:id` | Cancel scheduled session |

### Session statuses

`SCHEDULED → WAITING → LIVE → ENDED` (also `CANCELLED`, `FAILED`)

## Waiting Room

| Method | Path | Description |
|--------|------|-------------|
| GET | `/sessions/:id/waiting-room` | Queue entries |
| POST | `/sessions/:id/waiting-room/join` | Patient joins queue |
| POST | `/sessions/:id/waiting-room/:entryId/admit` | Provider admits patient |

## Signaling (WebRTC metadata)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/sessions/:id/signaling/ice` | Store ICE candidate |
| GET | `/sessions/:id/signaling/ice` | Poll ICE candidates |

ICE candidates expire per `expiresAt` (TTL enforced server-side).

## In-Session

| Method | Path | Description |
|--------|------|-------------|
| GET | `/sessions/:id/participants` | Active participants |
| POST | `/sessions/:id/chat` | Send chat message |
| POST | `/sessions/:id/files` | Share file metadata |
| POST | `/sessions/:id/notes` | Consultation note |

## Recordings

| Method | Path | Description |
|--------|------|-------------|
| GET | `/sessions/:id/recording` | Recording metadata |
| POST | `/sessions/:id/recording/start` | Begin recording |
| POST | `/sessions/:id/recording/stop` | End recording |

Recording media stored in object storage; API returns metadata only.

## Frontend Integration

```typescript
import { videoSignalingClient } from '@/lib/video-signaling-client';

const session = await videoSignalingClient.getSession(sessionId);
await videoSignalingClient.joinWaitingRoom(sessionId, patientId);
```

## Events (Kafka)

| Topic | Payload |
|-------|---------|
| `telemedicine.session.started` | `{ sessionId, organizationId }` |
| `telemedicine.session.ended` | `{ sessionId, durationSeconds }` |
| `telemedicine.waiting-room.admitted` | `{ sessionId, entryId }` |

## Headers

| Header | Required |
|--------|----------|
| `Authorization` | Yes |
| `X-Organization-Id` | Yes |
