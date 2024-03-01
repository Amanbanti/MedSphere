import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "SCH-101",
    "name": "Clinic — 8 patients",
    "status": "active",
    "statusLabel": "In Progress",
    "time": "08:00–12:00"
  },
  {
    "id": "SCH-102",
    "name": "Cardiac Cath Lab",
    "status": "scheduled",
    "statusLabel": "14:00",
    "time": "Procedure"
  }
];

export default function ScheduleListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule"
        description="Clinic appointments and procedure blocks."
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
            <Link href={`/schedule/${row.id}`} className="font-medium text-primary hover:underline">
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
