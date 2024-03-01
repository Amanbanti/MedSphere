import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, DataTable, StatusPill,
  Button, Input, Select, Badge, Tabs, TabsList, TabsTrigger, TabsContent,
} from '@medsphere/ui';

const claimeditorData = [
  { id: 'CLAIMEDITOR-1000', claimId: 'claimId 1', patient: 'patient 1', payer: 'payer 1', amount: 354.09, status: ['active', 'pending', 'completed', 'critical'][0 % 4] },
  { id: 'CLAIMEDITOR-1001', claimId: 'claimId 2', patient: 'patient 2', payer: 'payer 2', amount: 562.22, status: ['active', 'pending', 'completed', 'critical'][1 % 4] },
  { id: 'CLAIMEDITOR-1002', claimId: 'claimId 3', patient: 'patient 3', payer: 'payer 3', amount: 844.73, status: ['active', 'pending', 'completed', 'critical'][2 % 4] },
  { id: 'CLAIMEDITOR-1003', claimId: 'claimId 4', patient: 'patient 4', payer: 'payer 4', amount: 74.54, status: ['active', 'pending', 'completed', 'critical'][3 % 4] },
  { id: 'CLAIMEDITOR-1004', claimId: 'claimId 5', patient: 'patient 5', payer: 'payer 5', amount: 851.22, status: ['active', 'pending', 'completed', 'critical'][4 % 4] },
  { id: 'CLAIMEDITOR-1005', claimId: 'claimId 6', patient: 'patient 6', payer: 'payer 6', amount: 453.58, status: ['active', 'pending', 'completed', 'critical'][5 % 4] },
  { id: 'CLAIMEDITOR-1006', claimId: 'claimId 7', patient: 'patient 7', payer: 'payer 7', amount: 82.67, status: ['active', 'pending', 'completed', 'critical'][6 % 4] },
  { id: 'CLAIMEDITOR-1007', claimId: 'claimId 8', patient: 'patient 8', payer: 'payer 8', amount: 989.67, status: ['active', 'pending', 'completed', 'critical'][7 % 4] },
  { id: 'CLAIMEDITOR-1008', claimId: 'claimId 9', patient: 'patient 9', payer: 'payer 9', amount: 97.57, status: ['active', 'pending', 'completed', 'critical'][8 % 4] },
  { id: 'CLAIMEDITOR-1009', claimId: 'claimId 10', patient: 'patient 10', payer: 'payer 10', amount: 211.55, status: ['active', 'pending', 'completed', 'critical'][9 % 4] },
  { id: 'CLAIMEDITOR-1010', claimId: 'claimId 11', patient: 'patient 11', payer: 'payer 11', amount: 173.04, status: ['active', 'pending', 'completed', 'critical'][10 % 4] },
  { id: 'CLAIMEDITOR-1011', claimId: 'claimId 12', patient: 'patient 12', payer: 'payer 12', amount: 849.81, status: ['active', 'pending', 'completed', 'critical'][11 % 4] },
];

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

export default function ClaimEditorModule() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = filter === 'all'
    ? claimeditorData
    : claimeditorData.filter((row) => row.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Claim Editor"
        description="Billing portal — claim editor clinical workflow module."
        badge={<Badge variant="info">Billing</Badge>}
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>New Claim Editor</Button>
          </>
        }
      />

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="detail">Detail View</TabsTrigger>
          <TabsTrigger value="entry">Data Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Claim Editor Worklist</CardTitle>
              <Select
                value={filter}
                onValueChange={setFilter}
                options={statusFilters}
              />
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { key: 'claimId', header: 'ClaimId', cell: (row) => row.claimId },
                  { key: 'patient', header: 'Patient', cell: (row) => row.patient },
                  { key: 'payer', header: 'Payer', cell: (row) => row.payer },
                  { key: 'amount', header: 'Amount', cell: (row) => row.amount },
                  { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status}>{row.status}</StatusPill> },
                ]}
                data={filtered}
                keyExtractor={(row) => row.id}
                onRowClick={(row) => setSelectedId(row.id)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detail">
          <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex justify-between border-b border-border pb-2 text-sm">
                <span className="text-muted-foreground">Overview field {n}</span>
                <span className="font-medium">Sample value {n + 0}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clinical Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex justify-between border-b border-border pb-2 text-sm">
                <span className="text-muted-foreground">Clinical Details field {n}</span>
                <span className="font-medium">Sample value {n + 1}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex justify-between border-b border-border pb-2 text-sm">
                <span className="text-muted-foreground">History field {n}</span>
                <span className="font-medium">Sample value {n + 2}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex justify-between border-b border-border pb-2 text-sm">
                <span className="text-muted-foreground">Alerts field {n}</span>
                <span className="font-medium">Sample value {n + 3}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex justify-between border-b border-border pb-2 text-sm">
                <span className="text-muted-foreground">Documentation field {n}</span>
                <span className="font-medium">Sample value {n + 4}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex justify-between border-b border-border pb-2 text-sm">
                <span className="text-muted-foreground">Orders field {n}</span>
                <span className="font-medium">Sample value {n + 5}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex justify-between border-b border-border pb-2 text-sm">
                <span className="text-muted-foreground">Results field {n}</span>
                <span className="font-medium">Sample value {n + 6}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex justify-between border-b border-border pb-2 text-sm">
                <span className="text-muted-foreground">Billing field {n}</span>
                <span className="font-medium">Sample value {n + 7}</span>
              </div>
            ))}
          </CardContent>
        </Card>
          </div>
        </TabsContent>

        <TabsContent value="entry">
          <Card>
            <CardHeader>
              <CardTitle>New Claim Editor Entry</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Patient MRN</label>
              <Input defaultValue="" placeholder="Enter patient mrn" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Ordering Provider</label>
              <Input defaultValue="" placeholder="Enter ordering provider" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Priority</label>
              <Input defaultValue="" placeholder="Enter priority" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Clinical Indication</label>
              <Input defaultValue="" placeholder="Enter clinical indication" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Notes</label>
              <Input defaultValue="" placeholder="Enter notes" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input defaultValue="" placeholder="Enter start date" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">End Date</label>
              <Input defaultValue="" placeholder="Enter end date" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Location</label>
              <Input defaultValue="" placeholder="Enter location" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Department</label>
              <Input defaultValue="" placeholder="Enter department" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Attending</label>
              <Input defaultValue="" placeholder="Enter attending" />
            </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button variant="outline">Save Draft</Button>
                <Button>Submit</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedId && (
        <p className="text-sm text-muted-foreground">Selected record: {selectedId}</p>
      )}
    </div>
  );
}
