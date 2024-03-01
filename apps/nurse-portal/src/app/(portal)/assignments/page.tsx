import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "ASN-301",
    "name": "Linda Park — Room 312",
    "status": "active",
    "statusLabel": "Acuity 2",
    "time": "Due: 10:00"
  },
  {
    "id": "ASN-302",
    "name": "George Miller — Room 314",
    "status": "pending",
    "statusLabel": "Acuity 3",
    "time": "Due: 10:30"
  }
];

export default function AssignmentsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Assignments"
        description="Your assigned patients and acuity levels."
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
            <Link href={`/assignments/${row.id}`} className="font-medium text-primary hover:underline">
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
