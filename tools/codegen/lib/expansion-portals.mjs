import { writeFile } from './expansion-utils.mjs';

const PORTALS = [
  { slug: 'admin', title: 'Admin', features: ['Users', 'Organizations', 'Roles', 'Audit Logs'] },
  { slug: 'analytics', title: 'Analytics', features: ['KPIs', 'Cohorts', 'Benchmarks', 'Exports'] },
  { slug: 'billing', title: 'Billing', features: ['Invoices', 'Claims', 'Payments', 'Adjustments'] },
  { slug: 'doctor-portal', title: 'Doctor', features: ['Patients', 'Schedule', 'Orders', 'Notes'] },
  { slug: 'insurance', title: 'Insurance', features: ['Policies', 'Authorizations', 'Claims', 'Eligibility'] },
  { slug: 'laboratory-portal', title: 'Laboratory', features: ['Orders', 'Results', 'Specimens', 'QC'] },
  { slug: 'notifications', title: 'Notifications', features: ['Templates', 'Delivery Log', 'Channels', 'Campaigns'] },
  { slug: 'nurse-portal', title: 'Nurse', features: ['Vitals', 'Medications', 'Tasks', 'Handoffs'] },
  { slug: 'patient-portal', title: 'Patient', features: ['Appointments', 'Records', 'Messages', 'Billing'] },
  { slug: 'pharmacy-portal', title: 'Pharmacy', features: ['Prescriptions', 'Inventory', 'Dispense', 'Interactions'] },
  { slug: 'radiology-portal', title: 'Radiology', features: ['Worklist', 'Studies', 'Reports', 'PACS'] },
  { slug: 'telemedicine', title: 'Telemedicine', features: ['Sessions', 'Waiting Room', 'Recordings', 'Chat'] },
  { slug: 'web', title: 'Web', features: ['Landing', 'Providers', 'Locations', 'Contact'] },
];

function settingsPage(portal) {
  return `import {
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Select,
  Switch,
  Badge,
} from '@medsphere/ui';

const profileSections = [
  { id: 'general', label: 'General', description: 'Display name, timezone, and locale preferences' },
  { id: 'notifications', label: 'Notifications', description: 'Email, SMS, and in-app alert preferences' },
  { id: 'security', label: 'Security', description: 'Password, MFA, and active sessions' },
  { id: 'integrations', label: 'Integrations', description: 'Connected systems and API keys' },
];

const orgSettings = [
  { key: 'default_facility', label: 'Default Facility', value: 'Main Campus' },
  { key: 'session_timeout', label: 'Session Timeout (minutes)', value: '30' },
  { key: 'audit_retention', label: 'Audit Retention (days)', value: '2555' },
  { key: 'break_glass_enabled', label: 'Break-Glass Access', value: 'Enabled' },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your ${portal.title} portal preferences, security, and organization configuration."
        badge={<Badge variant="info">${portal.title} Portal</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Settings Sections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {profileSections.map((section) => (
              <button
                key={section.id}
                type="button"
                className="w-full rounded-lg border border-border px-4 py-3 text-left hover:bg-muted/50"
              >
                <div className="font-medium">{section.label}</div>
                <div className="text-sm text-muted-foreground">{section.description}</div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Organization Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orgSettings.map((setting) => (
              <div key={setting.key} className="grid gap-2 sm:grid-cols-2 sm:items-center">
                <label className="text-sm font-medium">{setting.label}</label>
                <Input defaultValue={setting.value} />
              </div>
            ))}
            <div className="grid gap-2 sm:grid-cols-2 sm:items-center">
              <label className="text-sm font-medium">Language</label>
              <Select defaultValue="en-US" options={[
                { value: 'en-US', label: 'English (US)' },
                { value: 'es-ES', label: 'Español' },
                { value: 'fr-FR', label: 'Français' },
              ]} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">Require MFA for privileged actions</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">Reset</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
`;
}

function reportsPage(portal) {
  const reports = portal.features.map((f, i) => ({
    id: `RPT-${1000 + i}`,
    name: `${f} Summary Report`,
    frequency: ['Daily', 'Weekly', 'Monthly'][i % 3],
    lastRun: ['Today 08:00', 'Yesterday 18:30', 'Mon 06:00'][i % 3],
    status: ['ready', 'running', 'ready', 'failed'][i % 4],
  }));

  return `import {
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DataTable,
  StatusPill,
  Button,
  Badge,
  StatMetric,
} from '@medsphere/ui';
import { FileText, Download, Calendar, BarChart3 } from 'lucide-react';

const reports = ${JSON.stringify(reports, null, 2)};

const metrics = [
  { label: 'Scheduled Reports', value: '${reports.length}', icon: 'FileText' },
  { label: 'Generated Today', value: '${Math.max(1, reports.length - 1)}', icon: 'BarChart3' },
  { label: 'Export Queue', value: '2', icon: 'Download' },
  { label: 'Next Run', value: '08:00', icon: 'Calendar' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate, schedule, and export ${portal.title.toLowerCase()} operational and compliance reports."
        actions={
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Report
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatMetric
            key={metric.label}
            label={metric.label}
            value={metric.value}
            icon={
              metric.icon === 'FileText' ? <FileText className="h-4 w-4" /> :
              metric.icon === 'BarChart3' ? <BarChart3 className="h-4 w-4" /> :
              metric.icon === 'Download' ? <Download className="h-4 w-4" /> :
              metric.icon === 'Calendar' ? <Calendar className="h-4 w-4" /> :
              undefined
            }
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
              { key: 'name', header: 'Report', cell: (row) => row.name, sortable: true },
              { key: 'frequency', header: 'Schedule', cell: (row) => row.frequency },
              { key: 'lastRun', header: 'Last Run', cell: (row) => row.lastRun },
              {
                key: 'status',
                header: 'Status',
                cell: (row) => <StatusPill status={row.status}>{row.status}</StatusPill>,
              },
              {
                key: 'actions',
                header: '',
                cell: () => (
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                ),
              },
            ]}
            data={reports}
            keyExtractor={(row) => row.id}
            searchFilter={(row, q) => row.name.toLowerCase().includes(q.toLowerCase())}
          />
        </CardContent>
      </Card>
    </div>
  );
}
`;
}

function searchPage(portal) {
  const categories = portal.features.map((f) => ({
    id: f.toLowerCase().replace(/\s+/g, '-'),
    label: f,
    count: Math.floor(Math.random() * 500) + 50,
  }));

  return `'use client';

import { useState } from 'react';
import {
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
  Badge,
  StatusPill,
} from '@medsphere/ui';
import { Search, Filter, X } from 'lucide-react';

const categories = ${JSON.stringify(categories, null, 2)};

const sampleResults = [
${portal.features
  .map(
    (f, i) => `  {
    id: '${portal.slug}-result-${i + 1}',
    title: '${f} record match',
    subtitle: 'Updated ${['2 hours ago', 'Yesterday', '3 days ago'][i % 3]}',
    category: '${f}',
    status: '${['active', 'completed', 'pending'][i % 3]}',
    relevance: ${(95 - i * 3).toFixed(1)},
  },`,
  )
  .join('\n')}
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = sampleResults.filter((result) => {
    const matchesQuery =
      !query ||
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !activeCategory || result.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Search"
        description="Full-text search across ${portal.title.toLowerCase()} records, documents, and workflows."
      />

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search patients, orders, reports..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                className="inline-flex items-center gap-2"
              >
                <Badge variant={activeCategory === cat.label ? 'default' : 'outline'}>
                  {cat.label} ({cat.count})
                </Badge>
              </button>
            ))}
            {activeCategory && (
              <button type="button" onClick={() => setActiveCategory(null)} className="text-sm text-muted-foreground">
                <X className="mr-1 inline h-3 w-3" />
                Clear filter
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Results {query && <span className="text-muted-foreground">for &quot;{query}&quot;</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground">No results found. Try adjusting your search or filters.</p>
          ) : (
            filtered.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/30"
              >
                <div>
                  <div className="font-medium">{result.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {result.category} · {result.subtitle}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{result.relevance}% match</span>
                  <StatusPill status={result.status}>{result.status}</StatusPill>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
`;
}

function featureModule(portal, feature) {
  const slug = feature.toLowerCase().replace(/\s+/g, '-');
  return `import { Card, CardHeader, CardTitle, CardContent, PageHeader, DataTable, StatusPill } from '@medsphere/ui';

const items = Array.from({ length: 8 }, (_, i) => ({
  id: '${slug.toUpperCase()}-\${1000 + i}',
  name: '${feature} item \${i + 1}',
  status: ['active', 'pending', 'completed'][i % 3],
  updatedAt: ['Today', 'Yesterday', '2 days ago'][i % 3],
}));

export default function ${feature.replace(/\s+/g, '')}ModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="${feature}" description="${portal.title} portal — ${feature.toLowerCase()} management module." />
      <Card>
        <CardHeader>
          <CardTitle>${feature} Records</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
              { key: 'name', header: 'Name', cell: (row) => row.name },
              { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status}>{row.status}</StatusPill> },
              { key: 'updatedAt', header: 'Updated', cell: (row) => row.updatedAt },
            ]}
            data={items}
            keyExtractor={(row) => row.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
`;
}

export async function generatePortalExpansion(root, stats) {
  for (const portal of PORTALS) {
    const base = `apps/${portal.slug}/src/app/(portal)`;
    await writeFile(root, `${base}/settings/page.tsx`, settingsPage(portal), stats);
    await writeFile(root, `${base}/reports/page.tsx`, reportsPage(portal), stats);
    await writeFile(root, `${base}/search/page.tsx`, searchPage(portal), stats);

    for (const feature of portal.features) {
      const slug = feature.toLowerCase().replace(/\s+/g, '-');
      await writeFile(
        root,
        `apps/${portal.slug}/src/features/${slug}/${slug}-module.tsx`,
        featureModule(portal, feature),
        stats,
      );
    }

    const navItems = `import { Settings, FileText, Search, FolderOpen } from 'lucide-react';

export const expansionNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/search', label: 'Search', icon: Search },
${portal.features.map((f) => `  { href: '/${f.toLowerCase().replace(/\s+/g, '-')}', label: '${f}', icon: FolderOpen },`).join('\n')}
];
`;
    await writeFile(root, `apps/${portal.slug}/src/features/navigation/expansion-nav-items.tsx`, navItems, stats);
  }
}
