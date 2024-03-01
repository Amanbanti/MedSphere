import { Card, CardHeader, CardTitle, CardContent, PageHeader, DataTable, StatusPill } from '@medsphere/ui';

const items = Array.from({ length: 8 }, (_, i) => ({
  id: 'INTERACTIONS-${1000 + i}',
  name: 'Interactions item ${i + 1}',
  status: ['active', 'pending', 'completed'][i % 3],
  updatedAt: ['Today', 'Yesterday', '2 days ago'][i % 3],
}));

export default function InteractionsModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Interactions" description="Pharmacy portal — interactions management module." />
      <Card>
        <CardHeader>
          <CardTitle>Interactions Records</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
              { key: 'name', header: 'Name', cell: (row) => row.name },
              { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status}>{row.status}</StatusPill> },
              { key: 'updatedAt', header: 'Updated', cell: (row) => row.updatedAt },
            ]}
            data={items}
            keyExtractor={(row) => row.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
