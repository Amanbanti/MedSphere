'use client';

import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, DataTable, StatusPill, Button, Input, Select,
} from '@medsphere/ui';

const payments = [
  { id: 'PAY-1001', invoiceId: 'INV-2001', patient: 'Jane Doe', amount: 250, status: 'CAPTURED', method: 'CARD' },
  { id: 'PAY-1002', invoiceId: 'INV-2002', patient: 'John Smith', amount: 75, status: 'AUTHORIZED', method: 'ACH' },
  { id: 'PAY-1003', invoiceId: 'INV-2003', patient: 'Alex Lee', amount: 1200, status: 'PENDING', method: 'INSURANCE' },
];

export default function PaymentsModulePage() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('CARD');
  const [idempotencyKey, setIdempotencyKey] = useState('');

  return (
    <div className="space-y-6">
      <PageHeader title="Payment Console" description="Capture, authorize, and refund payments with idempotency protection." />

      <Card>
        <CardHeader>
          <CardTitle>Process Payment</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Invoice ID</label>
            <Input placeholder="INV-2001" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Amount ($)</label>
            <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Method</label>
            <Select
              value={method}
              onValueChange={setMethod}
              options={[
                { value: 'CARD', label: 'Card' },
                { value: 'ACH', label: 'ACH' },
                { value: 'CASH', label: 'Cash' },
                { value: 'INSURANCE', label: 'Insurance' },
              ]}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Idempotency Key</label>
            <Input value={idempotencyKey} onChange={(e) => setIdempotencyKey(e.target.value)} placeholder="pay-req-uuid" />
          </div>
          <div className="md:col-span-2 flex gap-2">
            <Button>Authorize</Button>
            <Button variant="outline">Capture</Button>
            <Button variant="outline">Refund</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'Payment', cell: (r) => <span className="font-mono text-xs">{r.id}</span> },
              { key: 'invoice', header: 'Invoice', cell: (r) => r.invoiceId },
              { key: 'patient', header: 'Patient', cell: (r) => r.patient },
              { key: 'amount', header: 'Amount', cell: (r) => `$${r.amount.toFixed(2)}` },
              { key: 'method', header: 'Method', cell: (r) => r.method },
              { key: 'status', header: 'Status', cell: (r) => <StatusPill status={r.status.toLowerCase()}>{r.status}</StatusPill> },
            ]}
            data={payments}
            keyExtractor={(r) => r.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
