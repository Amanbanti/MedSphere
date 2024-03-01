import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "DL-8821",
    "name": "Reminder — Anderson, K.",
    "status": "completed",
    "statusLabel": "Delivered",
    "time": "09:00"
  },
  {
    "id": "DL-8820",
    "name": "Critical Lab Alert — Hayes",
    "status": "completed",
    "statusLabel": "Delivered",
    "time": "09:22"
  }
];

export default function DeliveryLogListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Delivery Log"
        description="Sent messages with delivery status and audit trail."
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            New
          </Button>
        }
      />

      <DataTable
        columns={[
          { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs text-muted-foreground">{row.id}</span> },
          { key: 'name', header: 'Name', cell: (row) => (
            <Link href={`/delivery-log/${row.id}`} className="font-medium text-primary hover:underline">
              {row.name}
            </Link>
          ), sortable: true },
          { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status}>{row.statusLabel}</StatusPill> },
          { key: 'time', header: 'Details', cell: (row) => <span className="text-muted-foreground">{row.time}</span> },
        ]}
        data={items}
        keyExtractor={(row) => row.id}
        searchFilter={(row, q) => row.name.toLowerCase().includes(q.toLowerCase()) || row.id.toLowerCase().includes(q.toLowerCase())}
      />
    </div>
  );
}
