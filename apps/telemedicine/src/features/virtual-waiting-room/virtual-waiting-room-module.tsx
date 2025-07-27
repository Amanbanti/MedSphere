'use client';

import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, DataTable, StatusPill, Button, Badge,
} from '@medsphere/ui';
import { useWaitingRoom } from '../video-consult/hooks/use-video-session';

export default function VirtualWaitingRoomModule() {
  const { entries, loading, admit } = useWaitingRoom('demo-session');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Virtual Waiting Room"
        description="Provider queue for telehealth sessions — admit patients when ready."
        badge={<Badge variant="info">{entries.length} waiting</Badge>}
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Patient Queue</CardTitle>
          <Button variant="outline" disabled={loading}>Refresh</Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'position', header: '#', cell: (row) => row.queuePosition },
              { key: 'patient', header: 'Patient', cell: (row) => row.patientName },
              { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status.toLowerCase()}>{row.status}</StatusPill> },
              { key: 'joined', header: 'Joined', cell: (row) => new Date(row.joinedAt).toLocaleTimeString() },
              {
                key: 'actions',
                header: '',
                cell: (row) => (
                  row.status === 'QUEUED' ? (
                    <Button size="sm" onClick={() => admit(row.id)}>Admit</Button>
                  ) : null
                ),
              },
            ]}
            data={entries}
            keyExtractor={(row) => row.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
