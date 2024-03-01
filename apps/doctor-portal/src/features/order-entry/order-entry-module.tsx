import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, DataTable, StatusPill,
  Button, Input, Select, Badge, Tabs, TabsList, TabsTrigger, TabsContent,
} from '@medsphere/ui';

const orderentryData = [
  { id: 'ORDERENTRY-1000', orderId: 'orderId 1', patient: 'patient 1', test: 'test 1', priority: 'priority 1', status: ['active', 'pending', 'completed', 'critical'][0 % 4] },
  { id: 'ORDERENTRY-1001', orderId: 'orderId 2', patient: 'patient 2', test: 'test 2', priority: 'priority 2', status: ['active', 'pending', 'completed', 'critical'][1 % 4] },
  { id: 'ORDERENTRY-1002', orderId: 'orderId 3', patient: 'patient 3', test: 'test 3', priority: 'priority 3', status: ['active', 'pending', 'completed', 'critical'][2 % 4] },
  { id: 'ORDERENTRY-1003', orderId: 'orderId 4', patient: 'patient 4', test: 'test 4', priority: 'priority 4', status: ['active', 'pending', 'completed', 'critical'][3 % 4] },
  { id: 'ORDERENTRY-1004', orderId: 'orderId 5', patient: 'patient 5', test: 'test 5', priority: 'priority 5', status: ['active', 'pending', 'completed', 'critical'][4 % 4] },
  { id: 'ORDERENTRY-1005', orderId: 'orderId 6', patient: 'patient 6', test: 'test 6', priority: 'priority 6', status: ['active', 'pending', 'completed', 'critical'][5 % 4] },
  { id: 'ORDERENTRY-1006', orderId: 'orderId 7', patient: 'patient 7', test: 'test 7', priority: 'priority 7', status: ['active', 'pending', 'completed', 'critical'][6 % 4] },
  { id: 'ORDERENTRY-1007', orderId: 'orderId 8', patient: 'patient 8', test: 'test 8', priority: 'priority 8', status: ['active', 'pending', 'completed', 'critical'][7 % 4] },
  { id: 'ORDERENTRY-1008', orderId: 'orderId 9', patient: 'patient 9', test: 'test 9', priority: 'priority 9', status: ['active', 'pending', 'completed', 'critical'][8 % 4] },
  { id: 'ORDERENTRY-1009', orderId: 'orderId 10', patient: 'patient 10', test: 'test 10', priority: 'priority 10', status: ['active', 'pending', 'completed', 'critical'][9 % 4] },
  { id: 'ORDERENTRY-1010', orderId: 'orderId 11', patient: 'patient 11', test: 'test 11', priority: 'priority 11', status: ['active', 'pending', 'completed', 'critical'][10 % 4] },
  { id: 'ORDERENTRY-1011', orderId: 'orderId 12', patient: 'patient 12', test: 'test 12', priority: 'priority 12', status: ['active', 'pending', 'completed', 'critical'][11 % 4] },
];

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

export default function OrderEntryModule() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = filter === 'all'
    ? orderentryData
    : orderentryData.filter((row) => row.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Order Entry"
        description="Doctor portal — order entry clinical workflow module."
        badge={<Badge variant="info">Doctor</Badge>}
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>New Order Entry</Button>
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
              <CardTitle>Order Entry Worklist</CardTitle>
              <Select
                value={filter}
                onValueChange={setFilter}
                options={statusFilters}
              />
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { key: 'orderId', header: 'OrderId', cell: (row) => row.orderId },
                  { key: 'patient', header: 'Patient', cell: (row) => row.patient },
                  { key: 'test', header: 'Test', cell: (row) => row.test },
                  { key: 'priority', header: 'Priority', cell: (row) => row.priority },
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
              <CardTitle>New Order Entry Entry</CardTitle>
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
