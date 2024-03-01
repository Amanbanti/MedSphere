import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "ORG-001",
    "name": "Metro General Hospital",
    "status": "active",
    "statusLabel": "Active",
    "time": "Live",
    "beds": "412"
  },
  {
    "id": "ORG-002",
    "name": "Northside Clinic Network",
    "status": "active",
    "statusLabel": "Active",
    "time": "Live",
    "beds": "86"
  },
  {
    "id": "ORG-003",
    "name": "Valley Regional Medical",
    "status": "scheduled",
    "statusLabel": "Onboarding",
    "time": "Mar 15",
    "beds": "220"
  }
];

export default function OrganizationsListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organizations"
        description="Hospital networks, clinics, and affiliated facilities."
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
            <Link href={`/organizations/${row.id}`} className="font-medium text-primary hover:underline">
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
