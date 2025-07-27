'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Textarea,
  Select,
  DataTable,
  StatusPill,
  Badge,
  Alert,
} from '@medsphere/ui';
import { useInventoryManagement, useInventoryManagementMutation } from './hooks/inventory-management.hooks';
import { inventorymanagementSchema, type InventoryManagementFormValues } from './schemas/inventory-management.schema';

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25 },
};

export default function InventoryManagementModule() {
  const { data, isLoading, error } = useInventoryManagement({ page: 1, pageSize: 20 });
  const mutation = useInventoryManagementMutation();

  const form = useForm<InventoryManagementFormValues>({
    resolver: zodResolver(inventorymanagementSchema),
    defaultValues: { status: 'ACTIVE' },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
    form.reset({ status: 'ACTIVE' });
  });

  const items = (data?.data?.items ?? []) as Array<{ id: string; name?: string; status: string; updatedAt?: string }>;

  return (
    <motion.div className="space-y-6" {...fadeIn}>
      <PageHeader
        title="Inventory Management"
        description="Lot tracking, reorder alerts, stock counts"
        badge={<Badge variant="info">Pharmacy Portal</Badge>}
      />

      {error && (
        <Alert variant="destructive">Unable to load inventory management. Please retry.</Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4" aria-label="Inventory Management form">
              <div>
                <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                <Textarea id="notes" {...form.register('notes')} rows={3} />
              </div>
              <div>
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <Select
                  id="status"
                  options={[
                    { value: 'ACTIVE', label: 'Active' },
                    { value: 'PENDING', label: 'Pending' },
                    { value: 'COMPLETED', label: 'Completed' },
                  ]}
                  {...form.register('status')}
                />
              </div>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving…' : 'Save'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Records</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id.slice(0, 8)}</span> },
                { key: 'name', header: 'Name', cell: (row) => row.name ?? '—' },
                { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status}>{row.status}</StatusPill> },
                { key: 'updatedAt', header: 'Updated', cell: (row) => row.updatedAt ?? '—' },
              ]}
              data={items}
              keyExtractor={(row) => row.id}
              isLoading={isLoading}
              emptyMessage="No records yet"
            />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
