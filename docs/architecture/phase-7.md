# Phase 7 — Telemedicine & Video Consultation

## Scope

| Layer | Path |
|-------|------|
| Prisma | `10-telemedicine.prisma` |
| Backend | `services/video-consultation` |
| Frontend | `apps/telemedicine` |
| Worker | `TelehealthSessionRecordingJob` |

## Data Model

Production models:

- **VideoSession** — scheduled → waiting → live → ended lifecycle
- **SessionParticipant** — roles (PATIENT, PROVIDER, NURSE, …)
- **WaitingRoomEntry** — queue position, admit flow
- **SessionChatMessage**, **SharedFile**, **ScreenShareEvent**
- **ConsultationNote**, **RecordingMetadata**
- **SignalingIceCandidate** — WebRTC ICE metadata (no media storage)

## Session Lifecycle

`SessionLifecycleService` state machine:

```
SCHEDULED → WAITING → LIVE → ENDED
         ↘ CANCELLED / FAILED
```

Duration computed on END from `startedAt` / `endedAt`.

## Signaling API

REST endpoints (via `video-consultation` service):

| Method | Path | Action |
|--------|------|--------|
| GET | `/sessions/:id` | Session details + signaling token |
| POST | `/sessions/:id/waiting-room/join` | Patient enters queue |
| POST | `/sessions/:id/waiting-room/:entryId/admit` | Provider admits |
| POST | `/sessions/:id/start` | Transition to LIVE |
| POST | `/sessions/:id/end` | End session |
| POST | `/sessions/:id/signaling/ice` | Store ICE candidate |

Frontend client: `apps/telemedicine/src/lib/video-signaling-client.ts`

## UI

- **Virtual Waiting Room** — provider queue with admit actions (`useWaitingRoom`)
- **In-Call Layout** — WebRTC placeholders, mute/camera/end controls (`useVideoSession`)

WebRTC peer connection wiring is UI-only; signaling tokens and ICE candidates persist via API.

## Events

Kafka topics:

- `telemedicine.session.started`
- `telemedicine.session.ended`
- `telemedicine.recording.available`

## Testing

`services/video-consultation/test/unit/session-lifecycle.service.spec.ts` validates full lifecycle and invalid transitions.

See also `docs/api/telemedicine.md`.
