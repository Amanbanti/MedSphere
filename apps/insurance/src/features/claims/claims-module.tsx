'use client';

import { useMemo, useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, Button, Input, Select, DataTable, StatusPill,
} from '@medsphere/ui';

interface ClaimLine {
  procedureCode: string;
  quantity: number;
  billedAmount: number;
}

export default function ClaimsModulePage() {
  const [claimNumber, setClaimNumber] = useState('CLM-2026-001');
  const [payer, setPayer] = useState('');
  const [lines, setLines] = useState<ClaimLine[]>([
    { procedureCode: '99213', quantity: 1, billedAmount: 150 },
    { procedureCode: '80053', quantity: 1, billedAmount: 85 },
  ]);

  const totalBilled = useMemo(
    () => lines.reduce((s, l) => s + l.billedAmount * l.quantity, 0),
    [lines],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Claim Editor"
        description="Build, validate, and submit professional claims."
        actions={<><Button variant="outline">Save Draft</Button><Button>Submit Claim</Button></>}
      />

      <Card>
        <CardHeader><CardTitle>Claim Header</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Input value={claimNumber} onChange={(e) => setClaimNumber(e.target.value)} placeholder="Claim number" />
          <Input placeholder="Patient MRN" />
          <Select value={payer} onValueChange={setPayer} options={[
            { value: 'payer1', label: 'Acme Health' },
            { value: 'payer2', label: 'Blue Shield' },
          ]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Service Lines</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setLines([...lines, { procedureCode: '', quantity: 1, billedAmount: 0 }])}>Add Line</Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'code', header: 'CPT', cell: (r) => r.procedureCode },
              { key: 'qty', header: 'Qty', cell: (r) => r.quantity },
              { key: 'amt', header: 'Billed', cell: (r) => `$${(r.billedAmount * r.quantity).toFixed(2)}` },
            ]}
            data={lines.map((l, i) => ({ ...l, id: String(i) }))}
            keyExtractor={(r) => r.id}
          />
          <p className="mt-4 text-right font-medium">Total Billed: ${totalBilled.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Status</CardTitle></CardHeader>
        <CardContent><StatusPill status="draft">DRAFT</StatusPill></CardContent>
      </Card>
    </div>
  );
}
