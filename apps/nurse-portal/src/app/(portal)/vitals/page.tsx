import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "VIT-501",
    "name": "Linda Park — Q4H Vitals",
    "status": "pending",
    "statusLabel": "Due Now",
    "time": "Room 312"
  },
  {
    "id": "VIT-502",
    "name": "George Miller — Q2H Neuro",
    "status": "scheduled",
    "statusLabel": "11:00",
    "time": "Room 314"
  }
];

export default function VitalsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Vitals Monitoring"
        description="Scheduled vitals and I&O documentation."
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
            <Link href={`/vitals/${row.id}`} className="font-medium text-primary hover:underline">
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
