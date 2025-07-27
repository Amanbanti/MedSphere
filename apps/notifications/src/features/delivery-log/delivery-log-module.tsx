'use client';

import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, Button, Input, Select, DataTable, StatusPill,
} from '@medsphere/ui';

const deliveries = [
  { id: 'DEL-001', channel: 'EMAIL', recipient: 'patient@example.com', status: 'DELIVERED', attempts: 1, sentAt: '2026-07-27 09:15' },
  { id: 'DEL-002', channel: 'SMS', recipient: '+15551234567', status: 'FAILED', attempts: 3, sentAt: '2026-07-27 08:42' },
  { id: 'DEL-003', channel: 'PUSH', recipient: 'device-token-abc', status: 'SENT', attempts: 1, sentAt: '2026-07-27 10:01' },
];

export default function DeliveryLogModulePage() {
  const [channelFilter, setChannelFilter] = useState('all');

  const filtered = channelFilter === 'all'
    ? deliveries
    : deliveries.filter((d) => d.channel === channelFilter);

  return (
    <div className="space-y-6">
      <PageHeader title="Delivery Log" description="Multi-channel notification delivery attempts and outcomes." />

      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Recent Deliveries</CardTitle>
          <Select
            value={channelFilter}
            onValueChange={setChannelFilter}
            options={[
              { value: 'all', label: 'All channels' },
              { value: 'EMAIL', label: 'Email' },
              { value: 'SMS', label: 'SMS' },
              { value: 'PUSH', label: 'Push' },
            ]}
          />
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'ID', cell: (r) => <span className="font-mono text-xs">{r.id}</span> },
              { key: 'channel', header: 'Channel', cell: (r) => r.channel },
              { key: 'recipient', header: 'Recipient', cell: (r) => r.recipient },
              { key: 'status', header: 'Status', cell: (r) => <StatusPill status={r.status.toLowerCase()}>{r.status}</StatusPill> },
              { key: 'attempts', header: 'Attempts', cell: (r) => r.attempts },
              { key: 'sent', header: 'Sent', cell: (r) => r.sentAt },
            ]}
            data={filtered}
            keyExtractor={(r) => r.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
