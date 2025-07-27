'use client';

import { useMemo, useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, Button, Input, StatMetric,
} from '@medsphere/ui';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

function lineTotal(item: LineItem): number {
  return Math.round(item.quantity * item.unitPrice * 100) / 100;
}

export default function InvoicesModulePage() {
  const [patientMrn, setPatientMrn] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: 'Office visit — Level 3', quantity: 1, unitPrice: 150 },
    { id: '2', description: 'Lab panel — CBC', quantity: 1, unitPrice: 45 },
  ]);

  const totals = useMemo(() => {
    const subtotal = lineItems.reduce((s, li) => s + lineTotal(li), 0);
    return { subtotal, tax: 0, total: subtotal };
  }, [lineItems]);

  const addLine = () => {
    setLineItems((prev) => [
      ...prev,
      { id: String(Date.now()), description: '', quantity: 1, unitPrice: 0 },
    ]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoice Builder"
        description="Create and finalize patient invoices with line-item charge capture."
        actions={<Button>Finalize Invoice</Button>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatMetric label="Subtotal" value={`$${totals.subtotal.toFixed(2)}`} />
        <StatMetric label="Tax" value={`$${totals.tax.toFixed(2)}`} />
        <StatMetric label="Total" value={`$${totals.total.toFixed(2)}`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient & Header</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Patient MRN</label>
            <Input value={patientMrn} onChange={(e) => setPatientMrn(e.target.value)} placeholder="MRN-12345" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Due Date</label>
            <Input type="date" defaultValue={new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Line Items</CardTitle>
          <Button variant="outline" onClick={addLine}>Add Line</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {lineItems.map((li, idx) => (
            <div key={li.id} className="grid gap-2 md:grid-cols-4 items-end border-b pb-3">
              <Input
                value={li.description}
                placeholder="Description"
                onChange={(e) => {
                  const next = [...lineItems];
                  next[idx] = { ...li, description: e.target.value };
                  setLineItems(next);
                }}
              />
              <Input
                type="number"
                value={li.quantity}
                onChange={(e) => {
                  const next = [...lineItems];
                  next[idx] = { ...li, quantity: Number(e.target.value) };
                  setLineItems(next);
                }}
              />
              <Input
                type="number"
                step="0.01"
                value={li.unitPrice}
                onChange={(e) => {
                  const next = [...lineItems];
                  next[idx] = { ...li, unitPrice: Number(e.target.value) };
                  setLineItems(next);
                }}
              />
              <div className="text-sm font-medium">${lineTotal(li).toFixed(2)}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
