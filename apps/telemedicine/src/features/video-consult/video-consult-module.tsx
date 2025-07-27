'use client';

import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, Button, Badge, StatusPill,
} from '@medsphere/ui';
import { useVideoSession } from './hooks/use-video-session';

interface VideoConsultModuleProps {
  sessionId?: string;
}

export default function VideoConsultModule({ sessionId = 'demo-session' }: VideoConsultModuleProps) {
  const { session, loading } = useVideoSession(sessionId);
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="In-Call Consultation"
        description="WebRTC video layout with signaling API — media placeholders until peer connection established."
        badge={<Badge variant="info">{session?.status ?? 'CONNECTING'}</Badge>}
        actions={
          <>
            <Button variant="outline" onClick={() => setMicMuted(!micMuted)}>
              {micMuted ? 'Unmute' : 'Mute'}
            </Button>
            <Button variant="outline" onClick={() => setCamOff(!camOff)}>
              {camOff ? 'Camera On' : 'Camera Off'}
            </Button>
            <Button variant="destructive">End Call</Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Remote Participant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex aspect-video items-center justify-center rounded-lg bg-muted text-muted-foreground">
              {loading ? 'Connecting…' : 'WebRTC remote video placeholder'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Self View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex aspect-video items-center justify-center rounded-lg bg-muted/60 text-sm text-muted-foreground">
              Local preview {camOff ? '(camera off)' : '(camera on)'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm md:grid-cols-3">
          <div><span className="text-muted-foreground">Room:</span> {session?.roomId ?? sessionId}</div>
          <div><span className="text-muted-foreground">Status:</span> <StatusPill status={session?.status?.toLowerCase() ?? 'pending'}>{session?.status ?? '—'}</StatusPill></div>
          <div><span className="text-muted-foreground">Signaling:</span> {session?.signalingToken ? 'Token ready' : 'Awaiting token'}</div>
        </CardContent>
      </Card>
    </div>
  );
}
