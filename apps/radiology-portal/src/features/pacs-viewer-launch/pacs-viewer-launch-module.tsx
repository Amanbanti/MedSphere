import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, DataTable, StatusPill,
  Button, Input, Select, Badge, Tabs, TabsList, TabsTrigger, TabsContent,
} from '@medsphere/ui';

const pacsviewerlaunchData = [
  { id: 'PACSVIEWERLAUNCH-1000', id: 'id 1', name: 'name 1', status: ['active', 'pending', 'completed', 'critical'][0 % 4], updatedAt: '8:00' },
  { id: 'PACSVIEWERLAUNCH-1001', id: 'id 2', name: 'name 2', status: ['active', 'pending', 'completed', 'critical'][1 % 4], updatedAt: '9:05' },
  { id: 'PACSVIEWERLAUNCH-1002', id: 'id 3', name: 'name 3', status: ['active', 'pending', 'completed', 'critical'][2 % 4], updatedAt: '10:10' },
  { id: 'PACSVIEWERLAUNCH-1003', id: 'id 4', name: 'name 4', status: ['active', 'pending', 'completed', 'critical'][3 % 4], updatedAt: '11:15' },
  { id: 'PACSVIEWERLAUNCH-1004', id: 'id 5', name: 'name 5', status: ['active', 'pending', 'completed', 'critical'][4 % 4], updatedAt: '12:20' },
  { id: 'PACSVIEWERLAUNCH-1005', id: 'id 6', name: 'name 6', status: ['active', 'pending', 'completed', 'critical'][5 % 4], updatedAt: '13:25' },
  { id: 'PACSVIEWERLAUNCH-1006', id: 'id 7', name: 'name 7', status: ['active', 'pending', 'completed', 'critical'][6 % 4], updatedAt: '14:30' },
  { id: 'PACSVIEWERLAUNCH-1007', id: 'id 8', name: 'name 8', status: ['active', 'pending', 'completed', 'critical'][7 % 4], updatedAt: '15:35' },
  { id: 'PACSVIEWERLAUNCH-1008', id: 'id 9', name: 'name 9', status: ['active', 'pending', 'completed', 'critical'][8 % 4], updatedAt: '16:40' },
  { id: 'PACSVIEWERLAUNCH-1009', id: 'id 10', name: 'name 10', status: ['active', 'pending', 'completed', 'critical'][9 % 4], updatedAt: '17:45' },
  { id: 'PACSVIEWERLAUNCH-1010', id: 'id 11', name: 'name 11', status: ['active', 'pending', 'completed', 'critical'][10 % 4], updatedAt: '18:50' },
  { id: 'PACSVIEWERLAUNCH-1011', id: 'id 12', name: 'name 12', status: ['active', 'pending', 'completed', 'critical'][11 % 4], updatedAt: '19:55' },
];

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

export default function PacsViewerLaunchModule() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = filter === 'all'
    ? pacsviewerlaunchData
    : pacsviewerlaunchData.filter((row) => row.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pacs Viewer Launch"
        description="Radiology portal — pacs viewer launch clinical workflow module."
        badge={<Badge variant="info">Radiology</Badge>}
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>New Pacs Viewer Launch</Button>
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
              <CardTitle>Pacs Viewer Launch Worklist</CardTitle>
              <Select
                value={filter}
                onValueChange={setFilter}
                options={statusFilters}
              />
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { key: 'id', header: 'Id', cell: (row) => row.id },
                  { key: 'name', header: 'Name', cell: (row) => row.name },
                  { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status}>{row.status}</StatusPill> },
                  { key: 'updatedAt', header: 'UpdatedAt', cell: (row) => row.updatedAt },
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
              <CardTitle>New Pacs Viewer Launch Entry</CardTitle>
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
