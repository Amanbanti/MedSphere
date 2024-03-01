import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = [
  {
    "id": "USR-1042",
    "name": "Dr. Sarah Chen",
    "status": "active",
    "statusLabel": "Active",
    "time": "2 min ago",
    "role": "Physician"
  },
  {
    "id": "USR-1038",
    "name": "James Wilson",
    "status": "pending",
    "statusLabel": "Pending MFA",
    "time": "15 min ago",
    "role": "Nurse"
  },
  {
    "id": "USR-1031",
    "name": "Maria Santos",
    "status": "active",
    "statusLabel": "Active",
    "time": "1 hr ago",
    "role": "Admin"
  }
];

export default function UsersListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage platform users, roles, and access permissions."
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
            <Link href={`/users/${row.id}`} className="font-medium text-primary hover:underline">
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
