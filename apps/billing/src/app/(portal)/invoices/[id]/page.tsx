import Link from 'next/link';
import {
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  StatusPill,
  ClinicalTimeline,
  Badge,
  Button,
} from '@medsphere/ui';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

const record = {
  "id": "INV-4421",
  "name": "Miller, G. — Statement",
  "status": "pending",
  "statusLabel": "Due",
  "time": "$1,240"
};

const timeline = [
  { id: '1', timestamp: '09:00', title: 'Record created', category: 'note', status: 'completed' },
  { id: '2', timestamp: '09:15', title: 'Status updated', description: 'Current status: Due', category: 'note', status: 'pending' },
  { id: '3', timestamp: '09:30', title: 'Review completed', category: 'procedure', status: 'completed', actor: 'System' },
];

export default async function InvoicesDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoice INV-4421"
        description={`Record ${id} — Patient Invoices`}
        badge={<StatusPill status={record.status}>{record.statusLabel}</StatusPill>}
        actions={
          <Button variant="outline" asChild>
            <Link href="/invoices">
              <ArrowLeft className="h-4 w-4" />
              Back to list
            </Link>
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Identifier</dt>
                <dd className="mt-1 font-mono text-sm">{id}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Name</dt>
                <dd className="mt-1 text-sm font-medium">{record.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</dt>
                <dd className="mt-1"><StatusPill status={record.status}>{record.statusLabel}</StatusPill></dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Last Updated</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{record.time}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ClinicalTimeline events={timeline} compact />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
