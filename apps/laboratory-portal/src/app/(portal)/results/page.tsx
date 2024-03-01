import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "RES-331",
    "name": "Lipid Panel — Wright, E.",
    "status": "pending",
    "statusLabel": "Review",
    "time": "Completed 09:10"
  },
  {
    "id": "RES-329",
    "name": "TSH — Miller, G.",
    "status": "completed",
    "statusLabel": "Released",
    "time": "Completed 08:45"
  }
];

export default function ResultsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Results Review"
        description="Completed results awaiting pathologist sign-off."
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
            <Link href={`/results/${row.id}`} className="font-medium text-primary hover:underline">
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
