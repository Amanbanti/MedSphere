import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "APT-441",
    "name": "Annual Physical — Dr. Chen",
    "status": "scheduled",
    "statusLabel": "Mar 12",
    "time": "10:30 AM"
  },
  {
    "id": "APT-438",
    "name": "Lab Follow-up — Metro Lab",
    "status": "pending",
    "statusLabel": "Pending",
    "time": "Mar 18"
  }
];

export default function AppointmentsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        description="Upcoming visits and telehealth sessions."
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
            <Link href={`/appointments/${row.id}`} className="font-medium text-primary hover:underline">
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
