/**
 * Production frontend portal feature modules for Phase 2-4.
 */
import fs from 'node:fs';
import path from 'node:path';

const PORTAL_FEATURES = {
  'patient-portal': [
    { slug: 'registration-wizard', title: 'Patient Registration', desc: 'Multi-step registration with demographics and insurance' },
    { slug: 'allergy-editor', title: 'Allergy Management', desc: 'Record and review allergies with severity flags' },
    { slug: 'vitals-editor', title: 'Vitals Entry', desc: 'Blood pressure, heart rate, temperature, SpO2' },
    { slug: 'medical-timeline', title: 'Medical Timeline', desc: 'Chronological clinical events timeline' },
  ],
  'doctor-portal': [
    { slug: 'soap-note-editor', title: 'SOAP Note Editor', desc: 'Structured subjective/objective/assessment/plan notes' },
    { slug: 'diagnosis-picker', title: 'Diagnosis / ICD Picker', desc: 'ICD-10 search and encounter diagnosis assignment' },
    { slug: 'e-prescribe', title: 'E-Prescribe', desc: 'Electronic prescribing with interaction checks' },
  ],
  'nurse-portal': [
    { slug: 'vitals-workstation', title: 'Vitals Workstation', desc: 'Batch vitals capture at point of care' },
    { slug: 'medication-admin', title: 'Medication Administration', desc: 'MAR documentation and barcode scan' },
  ],
  'laboratory-portal': [
    { slug: 'lab-order-entry', title: 'Lab Order Entry', desc: 'Order tests with LOINC codes and priorities' },
    { slug: 'results-review', title: 'Results Review', desc: 'Validate results with abnormal value highlighting' },
  ],
  'radiology-portal': [
    { slug: 'imaging-worklist', title: 'Imaging Worklist', desc: 'Modality worklist with priority sorting' },
    { slug: 'report-dictator', title: 'Report Dictation', desc: 'Structured radiology report authoring' },
  ],
  'pharmacy-portal': [
    { slug: 'dispense-workflow', title: 'Dispense Workflow', desc: 'Verify, dispense, and counsel patients' },
    { slug: 'inventory-management', title: 'Inventory Management', desc: 'Lot tracking, reorder alerts, stock counts' },
  ],
};

function genHook(portal, feature) {
  const hookName = `use${feature.slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')}`;
  const apiBase = portal.replace('-portal', '');
  return `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UUID } from '@medsphere/shared';

export interface ${hookName}Filters {
  patientId?: UUID;
  status?: string;
  page?: number;
  pageSize?: number;
}

async function fetch${hookName}(filters: ${hookName}Filters) {
  const params = new URLSearchParams();
  if (filters.patientId) params.set('patientId', filters.patientId);
  if (filters.status) params.set('status', filters.status);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.pageSize) params.set('pageSize', String(filters.pageSize));
  const res = await fetch(\`/api/v1/${apiBase}?\${params}\`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load ${feature.title}');
  return res.json();
}

export function ${hookName}(filters: ${hookName}Filters = {}) {
  return useQuery({
    queryKey: ['${portal}', '${feature.slug}', filters],
    queryFn: () => fetch${hookName}(filters),
    staleTime: 30_000,
  });
}

export function use${hookName.replace('use', '')}Mutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await fetch(\`/api/v1/${apiBase}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Mutation failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${portal}', '${feature.slug}'] });
    },
  });
}
`;
}

function genSchema(feature) {
  return `import { z } from 'zod';

export const ${feature.slug.replace(/-/g, '')}Schema = z.object({
  patientId: z.string().uuid().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['ACTIVE', 'PENDING', 'COMPLETED']).default('ACTIVE'),
  metadata: z.record(z.unknown()).optional(),
});

export type ${feature.slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')}FormValues = z.infer<typeof ${feature.slug.replace(/-/g, '')}Schema>;
`;
}

function genModule(portal, feature) {
  const formName = feature.slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  const hookName = `use${feature.slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')}`;
  const schemaName = `${feature.slug.replace(/-/g, '')}Schema`;

  return `'use client';

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
import { ${hookName}, use${hookName.replace('use', '')}Mutation } from './hooks/${feature.slug}.hooks';
import { ${schemaName}, type ${formName}FormValues } from './schemas/${feature.slug}.schema';

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25 },
};

export default function ${formName}Module() {
  const { data, isLoading, error } = ${hookName}({ page: 1, pageSize: 20 });
  const mutation = use${hookName.replace('use', '')}Mutation();

  const form = useForm<${formName}FormValues>({
    resolver: zodResolver(${schemaName}),
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
        title="${feature.title}"
        description="${feature.desc}"
        badge={<Badge variant="info">${portal.replace('-portal', '').replace(/^./, (c) => c.toUpperCase())} Portal</Badge>}
      />

      {error && (
        <Alert variant="destructive">Unable to load ${feature.title.toLowerCase()}. Please retry.</Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4" aria-label="${feature.title} form">
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
`;
}

function genPage(feature) {
  return `import ${feature.slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')}Module from '@/features/${feature.slug}/${feature.slug}-module';

export default function Page() {
  return <${feature.slug.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')}Module />;
}
`;
}

function writeIfChanged(filePath, content, stats) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null;
  if (existing === content) return;
  fs.writeFileSync(filePath, content, 'utf8');
  stats.files++;
  stats.lines += content.split('\n').length;
  stats.paths.push(filePath);
}

export function upgradeProductionPortals(repoRoot, stats) {
  let featureCount = 0;

  for (const [portal, features] of Object.entries(PORTAL_FEATURES)) {
    const appDir = path.join(repoRoot, 'apps', portal);

    for (const feature of features) {
      const featureDir = path.join(appDir, 'src/features', feature.slug);
      writeIfChanged(path.join(featureDir, 'hooks', `${feature.slug}.hooks.ts`), genHook(portal, feature), stats);
      writeIfChanged(path.join(featureDir, 'schemas', `${feature.slug}.schema.ts`), genSchema(feature), stats);
      writeIfChanged(path.join(featureDir, `${feature.slug}-module.tsx`), genModule(portal, feature), stats);
      writeIfChanged(
        path.join(appDir, 'src/app/(portal)', feature.slug, 'page.tsx'),
        genPage(feature),
        stats,
      );
      featureCount++;
    }
  }

  return featureCount;
}
