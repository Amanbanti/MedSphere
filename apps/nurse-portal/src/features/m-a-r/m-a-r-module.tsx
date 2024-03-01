import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, DataTable, StatusPill,
  Button, Input, Select, Badge, Tabs, TabsList, TabsTrigger, TabsContent,
} from '@medsphere/ui';

const marData = [
  { id: 'MAR-1000', medication: 'medication 1', dose: 'dose 1', route: 'route 1', scheduledTime: '8:00', status: ['active', 'pending', 'completed', 'critical'][0 % 4] },
  { id: 'MAR-1001', medication: 'medication 2', dose: 'dose 2', route: 'route 2', scheduledTime: '9:05', status: ['active', 'pending', 'completed', 'critical'][1 % 4] },
  { id: 'MAR-1002', medication: 'medication 3', dose: 'dose 3', route: 'route 3', scheduledTime: '10:10', status: ['active', 'pending', 'completed', 'critical'][2 % 4] },
  { id: 'MAR-1003', medication: 'medication 4', dose: 'dose 4', route: 'route 4', scheduledTime: '11:15', status: ['active', 'pending', 'completed', 'critical'][3 % 4] },
  { id: 'MAR-1004', medication: 'medication 5', dose: 'dose 5', route: 'route 5', scheduledTime: '12:20', status: ['active', 'pending', 'completed', 'critical'][4 % 4] },
  { id: 'MAR-1005', medication: 'medication 6', dose: 'dose 6', route: 'route 6', scheduledTime: '13:25', status: ['active', 'pending', 'completed', 'critical'][5 % 4] },
  { id: 'MAR-1006', medication: 'medication 7', dose: 'dose 7', route: 'route 7', scheduledTime: '14:30', status: ['active', 'pending', 'completed', 'critical'][6 % 4] },
  { id: 'MAR-1007', medication: 'medication 8', dose: 'dose 8', route: 'route 8', scheduledTime: '15:35', status: ['active', 'pending', 'completed', 'critical'][7 % 4] },
  { id: 'MAR-1008', medication: 'medication 9', dose: 'dose 9', route: 'route 9', scheduledTime: '16:40', status: ['active', 'pending', 'completed', 'critical'][8 % 4] },
  { id: 'MAR-1009', medication: 'medication 10', dose: 'dose 10', route: 'route 10', scheduledTime: '17:45', status: ['active', 'pending', 'completed', 'critical'][9 % 4] },
  { id: 'MAR-1010', medication: 'medication 11', dose: 'dose 11', route: 'route 11', scheduledTime: '18:50', status: ['active', 'pending', 'completed', 'critical'][10 % 4] },
  { id: 'MAR-1011', medication: 'medication 12', dose: 'dose 12', route: 'route 12', scheduledTime: '19:55', status: ['active', 'pending', 'completed', 'critical'][11 % 4] },
];

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

export default function MARModule() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = filter === 'all'
    ? marData
    : marData.filter((row) => row.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="M A R"
        description="Nurse portal — m a r clinical workflow module."
        badge={<Badge variant="info">Nurse</Badge>}
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>New M A R</Button>
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
              <CardTitle>M A R Worklist</CardTitle>
              <Select
                value={filter}
                onValueChange={setFilter}
                options={statusFilters}
              />
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { key: 'medication', header: 'Medication', cell: (row) => row.medication },
                  { key: 'dose', header: 'Dose', cell: (row) => row.dose },
                  { key: 'route', header: 'Route', cell: (row) => row.route },
                  { key: 'scheduledTime', header: 'ScheduledTime', cell: (row) => row.scheduledTime },
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
              <CardTitle>New M A R Entry</CardTitle>
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
