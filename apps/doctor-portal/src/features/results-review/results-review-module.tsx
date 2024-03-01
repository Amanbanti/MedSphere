import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, DataTable, StatusPill,
  Button, Input, Select, Badge, Tabs, TabsList, TabsTrigger, TabsContent,
} from '@medsphere/ui';

const resultsreviewData = [
  { id: 'RESULTSREVIEW-1000', resultId: 'resultId 1', patient: 'patient 1', test: 'test 1', value: 628.77, flag: 'flag 1' },
  { id: 'RESULTSREVIEW-1001', resultId: 'resultId 2', patient: 'patient 2', test: 'test 2', value: 466.07, flag: 'flag 2' },
  { id: 'RESULTSREVIEW-1002', resultId: 'resultId 3', patient: 'patient 3', test: 'test 3', value: 633.71, flag: 'flag 3' },
  { id: 'RESULTSREVIEW-1003', resultId: 'resultId 4', patient: 'patient 4', test: 'test 4', value: 810.83, flag: 'flag 4' },
  { id: 'RESULTSREVIEW-1004', resultId: 'resultId 5', patient: 'patient 5', test: 'test 5', value: 58.83, flag: 'flag 5' },
  { id: 'RESULTSREVIEW-1005', resultId: 'resultId 6', patient: 'patient 6', test: 'test 6', value: 378.82, flag: 'flag 6' },
  { id: 'RESULTSREVIEW-1006', resultId: 'resultId 7', patient: 'patient 7', test: 'test 7', value: 299.98, flag: 'flag 7' },
  { id: 'RESULTSREVIEW-1007', resultId: 'resultId 8', patient: 'patient 8', test: 'test 8', value: 256.18, flag: 'flag 8' },
  { id: 'RESULTSREVIEW-1008', resultId: 'resultId 9', patient: 'patient 9', test: 'test 9', value: 804.15, flag: 'flag 9' },
  { id: 'RESULTSREVIEW-1009', resultId: 'resultId 10', patient: 'patient 10', test: 'test 10', value: 824.77, flag: 'flag 10' },
  { id: 'RESULTSREVIEW-1010', resultId: 'resultId 11', patient: 'patient 11', test: 'test 11', value: 118.07, flag: 'flag 11' },
  { id: 'RESULTSREVIEW-1011', resultId: 'resultId 12', patient: 'patient 12', test: 'test 12', value: 899.69, flag: 'flag 12' },
];

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

export default function ResultsReviewModule() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = filter === 'all'
    ? resultsreviewData
    : resultsreviewData.filter((row) => row.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Results Review"
        description="Doctor portal — results review clinical workflow module."
        badge={<Badge variant="info">Doctor</Badge>}
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>New Results Review</Button>
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
              <CardTitle>Results Review Worklist</CardTitle>
              <Select
                value={filter}
                onValueChange={setFilter}
                options={statusFilters}
              />
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { key: 'resultId', header: 'ResultId', cell: (row) => row.resultId },
                  { key: 'patient', header: 'Patient', cell: (row) => row.patient },
                  { key: 'test', header: 'Test', cell: (row) => row.test },
                  { key: 'value', header: 'Value', cell: (row) => row.value },
                  { key: 'flag', header: 'Flag', cell: (row) => row.flag },
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
              <CardTitle>New Results Review Entry</CardTitle>
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
