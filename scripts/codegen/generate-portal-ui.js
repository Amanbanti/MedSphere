const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../..');

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

const layoutTsx = (portal) => `import type { Metadata } from 'next';
import { IBM_Plex_Sans, Source_Serif_4 } from 'next/font/google';
import './globals.css';

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const display = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '${portal.title} | MedSphere',
    template: '%s | ${portal.title}',
  },
  description: '${portal.subtitle} — MedSphere Enterprise Health Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={\`\${body.variable} \${display.variable} font-sans antialiased\`}>
        {children}
      </body>
    </html>
  );
}
`;

const portalShellTsx = (portal) => `'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Activity } from 'lucide-react';
import { Sidebar, Topbar } from '@medsphere/ui';
import { ${portal.navImport} } from '@/features/navigation/nav-items';

interface PortalShellProps {
  children: React.ReactNode;
  user?: { name: string; role: string };
}

export function PortalShell({ children, user }: PortalShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  const items = ${portal.navVar}.map((item) => ({
    ...item,
    active: pathname === item.href || pathname.startsWith(item.href + '/'),
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        title="${portal.title}"
        subtitle="${portal.subtitle}"
        logo={
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-accent/20">
            <Activity className="h-4 w-4 text-sidebar-accent" />
          </div>
        }
        items={items}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          user={user ?? { name: 'Demo User', role: '${portal.role}' }}
          notificationCount={${portal.notifications}}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
`;

const authenticatedLayout = `'use client';

import { PortalShell } from '@/components/portal-shell';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
`;

const navItemsTemplate = (items) => `import {
  ${items.icons.join(',\n  ')},
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
${items.routes
  .map(
    (r) => `  {
    label: '${r.label}',
    href: '${r.href}',
    icon: <${r.icon} />,
    ${r.badge !== undefined ? `badge: ${r.badge},` : ''}
  },`,
  )
  .join('\n')}
];
`;

const dashboardPage = (portal, stats, table) => `import {
  PageHeader,
  StatMetric,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DataTable,
  StatusPill,
  ClinicalTimeline,
  Badge,
} from '@medsphere/ui';
import { ${stats.icons.join(', ')} } from 'lucide-react';

const metrics = ${JSON.stringify(stats.data, null, 2)};

const recentItems = ${JSON.stringify(table.data, null, 2)};

const timelineEvents = ${JSON.stringify(portal.timeline || [], null, 2)};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="${portal.dashboardDesc}"
        badge={<Badge variant="info">${portal.shift || 'Live'}</Badge>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatMetric
            key={metric.label}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            change={metric.change}
            changeLabel={metric.changeLabel}
            icon={
              metric.icon === 'Activity' ? <Activity className="h-4 w-4" /> :
              metric.icon === 'Users' ? <Users className="h-4 w-4" /> :
              metric.icon === 'Clock' ? <Clock className="h-4 w-4" /> :
              metric.icon === 'AlertCircle' ? <AlertCircle className="h-4 w-4" /> :
              undefined
            }
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>${table.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs">{row.id}</span> },
                { key: 'name', header: '${table.nameHeader}', cell: (row) => row.name, sortable: true },
                { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status}>{row.statusLabel}</StatusPill> },
                { key: 'time', header: 'Time', cell: (row) => <span className="text-muted-foreground">{row.time}</span> },
              ]}
              data={recentItems}
              keyExtractor={(row) => row.id}
              searchFilter={(row, q) => row.name.toLowerCase().includes(q.toLowerCase())}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ClinicalTimeline events={timelineEvents} compact />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
`;

// Portal definitions
const portals = [
  {
    dir: 'admin',
    title: 'Admin Console',
    subtitle: 'System Administration',
    role: 'System Administrator',
    notifications: 3,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Organization-wide system health, user activity, and configuration status.',
    shift: 'All Systems Operational',
    nav: {
      icons: ['LayoutDashboard', 'Users', 'Building2'],
      routes: [
        { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
        { label: 'Users', href: '/users', icon: 'Users', badge: 12 },
        { label: 'Organizations', href: '/organizations', icon: 'Building2' },
      ],
    },
    features: [
      {
        slug: 'users',
        title: 'User Management',
        desc: 'Manage platform users, roles, and access permissions.',
        list: [
          { id: 'USR-1042', name: 'Dr. Sarah Chen', status: 'active', statusLabel: 'Active', time: '2 min ago', role: 'Physician' },
          { id: 'USR-1038', name: 'James Wilson', status: 'pending', statusLabel: 'Pending MFA', time: '15 min ago', role: 'Nurse' },
          { id: 'USR-1031', name: 'Maria Santos', status: 'active', statusLabel: 'Active', time: '1 hr ago', role: 'Admin' },
        ],
        detailName: 'Dr. Sarah Chen',
      },
      {
        slug: 'organizations',
        title: 'Organizations',
        desc: 'Hospital networks, clinics, and affiliated facilities.',
        list: [
          { id: 'ORG-001', name: 'Metro General Hospital', status: 'active', statusLabel: 'Active', time: 'Live', beds: '412' },
          { id: 'ORG-002', name: 'Northside Clinic Network', status: 'active', statusLabel: 'Active', time: 'Live', beds: '86' },
          { id: 'ORG-003', name: 'Valley Regional Medical', status: 'scheduled', statusLabel: 'Onboarding', time: 'Mar 15', beds: '220' },
        ],
        detailName: 'Metro General Hospital',
      },
    ],
    stats: {
      icons: ['Activity', 'Users', 'Clock', 'AlertCircle'],
      data: [
        { label: 'Active Users', value: '2,847', change: 4.2, changeLabel: 'vs last week', icon: 'Users' },
        { label: 'Organizations', value: '34', change: 2.1, changeLabel: 'vs last month', icon: 'Activity' },
        { label: 'Uptime', value: '99.97', unit: '%', change: 0.1, changeLabel: '30-day', icon: 'Clock' },
        { label: 'Open Issues', value: '7', change: -12, changeLabel: 'vs yesterday', icon: 'AlertCircle' },
      ],
    },
    table: { title: 'Recent User Activity', nameHeader: 'User', data: [
      { id: 'LOG-8921', name: 'Dr. Sarah Chen', status: 'active', statusLabel: 'Login', time: '09:42 AM' },
      { id: 'LOG-8920', name: 'System', status: 'completed', statusLabel: 'Backup', time: '09:30 AM' },
      { id: 'LOG-8919', name: 'Maria Santos', status: 'active', statusLabel: 'Config Change', time: '09:15 AM' },
    ]},
    timeline: [
      { id: '1', timestamp: '09:42', title: 'User login', description: 'Dr. Sarah Chen authenticated via SSO', category: 'note', status: 'completed', actor: 'Auth Service' },
      { id: '2', timestamp: '09:30', title: 'Database backup completed', category: 'procedure', status: 'completed', actor: 'System' },
      { id: '3', timestamp: '09:15', title: 'Role permissions updated', description: 'Nursing role — added vitals override', category: 'note', status: 'active', actor: 'Maria Santos' },
    ],
  },
  {
    dir: 'patient-portal',
    title: 'Patient Portal',
    subtitle: 'My Health',
    role: 'Patient',
    notifications: 2,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Your appointments, test results, and care team at a glance.',
    shift: 'Welcome back',
    nav: {
      icons: ['LayoutDashboard', 'Calendar', 'FileText'],
      routes: [
        { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
        { label: 'Appointments', href: '/appointments', icon: 'Calendar', badge: 1 },
        { label: 'Health Records', href: '/records', icon: 'FileText' },
      ],
    },
    features: [
      { slug: 'appointments', title: 'Appointments', desc: 'Upcoming visits and telehealth sessions.', list: [
        { id: 'APT-441', name: 'Annual Physical — Dr. Chen', status: 'scheduled', statusLabel: 'Mar 12', time: '10:30 AM' },
        { id: 'APT-438', name: 'Lab Follow-up — Metro Lab', status: 'pending', statusLabel: 'Pending', time: 'Mar 18' },
      ], detailName: 'Annual Physical' },
      { slug: 'records', title: 'Health Records', desc: 'Visit summaries, lab results, and immunizations.', list: [
        { id: 'REC-882', name: 'CBC Panel — Feb 2026', status: 'completed', statusLabel: 'Final', time: 'Feb 14' },
        { id: 'REC-871', name: 'Visit Summary — Cardiology', status: 'completed', statusLabel: 'Signed', time: 'Jan 28' },
      ], detailName: 'CBC Panel' },
    ],
    stats: { icons: ['Activity', 'Users', 'Clock', 'AlertCircle'], data: [
      { label: 'Upcoming Visits', value: '2', icon: 'Clock' },
      { label: 'Unread Results', value: '1', change: 0, icon: 'Activity' },
      { label: 'Messages', value: '3', icon: 'Users' },
      { label: 'Action Items', value: '1', icon: 'AlertCircle' },
    ]},
    table: { title: 'Recent Results', nameHeader: 'Record', data: [
      { id: 'RES-221', name: 'Lipid Panel', status: 'completed', statusLabel: 'Normal', time: 'Feb 14' },
      { id: 'RES-218', name: 'HbA1c', status: 'completed', statusLabel: 'Review', time: 'Jan 30' },
    ]},
    timeline: [
      { id: '1', timestamp: 'Feb 14', title: 'Lab results available', description: 'CBC Panel — all values within range', category: 'lab', status: 'completed' },
      { id: '2', timestamp: 'Jan 28', title: 'Cardiology visit', description: 'Follow-up ECG — stable', category: 'procedure', status: 'completed', actor: 'Dr. Chen' },
    ],
  },
  {
    dir: 'doctor-portal',
    title: 'Physician Workbench',
    subtitle: 'Clinical Care',
    role: 'Attending Physician',
    notifications: 8,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Today\'s schedule, active patients, and pending clinical tasks.',
    shift: 'Day Shift',
    nav: { icons: ['LayoutDashboard', 'Users', 'Calendar'], routes: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Patients', href: '/patients', icon: 'Users', badge: 14 },
      { label: 'Schedule', href: '/schedule', icon: 'Calendar' },
    ]},
    features: [
      { slug: 'patients', title: 'Patient Panel', desc: 'Active inpatients and clinic encounters.', list: [
        { id: 'PT-8821', name: 'Robert Hayes — CHF Exacerbation', status: 'critical', statusLabel: 'Critical', time: 'ICU-4B' },
        { id: 'PT-8819', name: 'Linda Park — Post-op Day 2', status: 'active', statusLabel: 'Stable', time: 'Med-Surg 312' },
      ], detailName: 'Robert Hayes' },
      { slug: 'schedule', title: 'Schedule', desc: 'Clinic appointments and procedure blocks.', list: [
        { id: 'SCH-101', name: 'Clinic — 8 patients', status: 'active', statusLabel: 'In Progress', time: '08:00–12:00' },
        { id: 'SCH-102', name: 'Cardiac Cath Lab', status: 'scheduled', statusLabel: '14:00', time: 'Procedure' },
      ], detailName: 'Morning Clinic' },
    ],
    stats: { icons: ['Activity', 'Users', 'Clock', 'AlertCircle'], data: [
      { label: 'Patients Today', value: '18', icon: 'Users' },
      { label: 'Pending Orders', value: '6', change: -8, changeLabel: 'vs yesterday', icon: 'Activity' },
      { label: 'Avg Wait', value: '12', unit: 'min', icon: 'Clock' },
      { label: 'Critical Alerts', value: '2', icon: 'AlertCircle' },
    ]},
    table: { title: 'Priority Patients', nameHeader: 'Patient', data: [
      { id: 'PT-8821', name: 'Robert Hayes', status: 'critical', statusLabel: 'Critical', time: 'ICU-4B' },
      { id: 'PT-8815', name: 'Eleanor Wright', status: 'pending', statusLabel: 'Pending Labs', time: 'ED-2' },
    ]},
    timeline: [
      { id: '1', timestamp: '09:15', title: 'Critical lab — K+ 6.2', category: 'lab', status: 'critical', actor: 'Lab Interface' },
      { id: '2', timestamp: '08:45', title: 'Medication administered', description: 'Furosemide 40mg IV', category: 'medication', status: 'completed', actor: 'N. Johnson, RN' },
    ],
  },
  {
    dir: 'nurse-portal',
    title: 'Nursing Station',
    subtitle: 'Care Coordination',
    role: 'Registered Nurse',
    notifications: 5,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Unit census, assigned patients, and pending nursing tasks.',
    shift: 'Med-Surg Unit 3',
    nav: { icons: ['LayoutDashboard', 'ClipboardList', 'HeartPulse'], routes: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Assignments', href: '/assignments', icon: 'ClipboardList', badge: 6 },
      { label: 'Vitals', href: '/vitals', icon: 'HeartPulse' },
    ]},
    features: [
      { slug: 'assignments', title: 'Patient Assignments', desc: 'Your assigned patients and acuity levels.', list: [
        { id: 'ASN-301', name: 'Linda Park — Room 312', status: 'active', statusLabel: 'Acuity 2', time: 'Due: 10:00' },
        { id: 'ASN-302', name: 'George Miller — Room 314', status: 'pending', statusLabel: 'Acuity 3', time: 'Due: 10:30' },
      ], detailName: 'Linda Park' },
      { slug: 'vitals', title: 'Vitals Monitoring', desc: 'Scheduled vitals and I&O documentation.', list: [
        { id: 'VIT-501', name: 'Linda Park — Q4H Vitals', status: 'pending', statusLabel: 'Due Now', time: 'Room 312' },
        { id: 'VIT-502', name: 'George Miller — Q2H Neuro', status: 'scheduled', statusLabel: '11:00', time: 'Room 314' },
      ], detailName: 'Vitals — Linda Park' },
    ],
    stats: { icons: ['Activity', 'Users', 'Clock', 'AlertCircle'], data: [
      { label: 'Assigned Patients', value: '6', icon: 'Users' },
      { label: 'Tasks Due', value: '4', icon: 'Clock' },
      { label: 'Overdue', value: '1', icon: 'AlertCircle' },
      { label: 'Unit Census', value: '28', icon: 'Activity' },
    ]},
    table: { title: 'Due Tasks', nameHeader: 'Task', data: [
      { id: 'TSK-01', name: 'Vitals — Linda Park', status: 'pending', statusLabel: 'Due Now', time: 'Room 312' },
      { id: 'TSK-02', name: 'Med Admin — George Miller', status: 'scheduled', statusLabel: '10:45', time: 'Room 314' },
    ]},
    timeline: [
      { id: '1', timestamp: '09:30', title: 'Vitals documented', description: 'BP 128/82, HR 78, SpO2 97%', category: 'vitals', status: 'completed', actor: 'You' },
      { id: '2', timestamp: '09:00', title: 'Shift handoff received', category: 'note', status: 'completed', actor: 'Night Charge' },
    ],
  },
  {
    dir: 'pharmacy-portal',
    title: 'Pharmacy',
    subtitle: 'Medication Management',
    role: 'Clinical Pharmacist',
    notifications: 4,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Prescription queue, verification workflow, and inventory alerts.',
    shift: 'Central Pharmacy',
    nav: { icons: ['LayoutDashboard', 'Pill', 'Package'], routes: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Prescriptions', href: '/prescriptions', icon: 'Pill', badge: 23 },
      { label: 'Inventory', href: '/inventory', icon: 'Package' },
    ]},
    features: [
      { slug: 'prescriptions', title: 'Prescription Queue', desc: 'Orders awaiting verification and dispensing.', list: [
        { id: 'RX-4421', name: 'Metformin 500mg — Hayes, R.', status: 'pending', statusLabel: 'Verify', time: '09:38' },
        { id: 'RX-4420', name: 'Lisinopril 10mg — Park, L.', status: 'active', statusLabel: 'Dispensing', time: '09:35' },
      ], detailName: 'RX-4421' },
      { slug: 'inventory', title: 'Inventory', desc: 'Stock levels, par alerts, and formulary status.', list: [
        { id: 'INV-101', name: 'Insulin Glargine 100u/mL', status: 'critical', statusLabel: 'Low Stock', time: '12 units' },
        { id: 'INV-102', name: 'Heparin 5000u/mL', status: 'active', statusLabel: 'Adequate', time: '240 units' },
      ], detailName: 'Insulin Glargine' },
    ],
    stats: { icons: ['Activity', 'Users', 'Clock', 'AlertCircle'], data: [
      { label: 'Queue Depth', value: '23', icon: 'Activity' },
      { label: 'Verified Today', value: '187', change: 6, changeLabel: 'vs avg', icon: 'Users' },
      { label: 'Avg Turnaround', value: '8', unit: 'min', icon: 'Clock' },
      { label: 'Low Stock Items', value: '5', icon: 'AlertCircle' },
    ]},
    table: { title: 'Verification Queue', nameHeader: 'Prescription', data: [
      { id: 'RX-4421', name: 'Metformin 500mg', status: 'pending', statusLabel: 'Stat', time: '09:38' },
      { id: 'RX-4419', name: 'Amoxicillin 500mg', status: 'pending', statusLabel: 'Routine', time: '09:32' },
    ]},
    timeline: [
      { id: '1', timestamp: '09:38', title: 'New order — Metformin', category: 'medication', status: 'pending', actor: 'Dr. Chen' },
      { id: '2', timestamp: '09:35', title: 'Dispensed — Lisinopril', category: 'medication', status: 'completed', actor: 'Pharm Tech' },
    ],
  },
  {
    dir: 'laboratory-portal',
    title: 'Laboratory',
    subtitle: 'Diagnostics',
    role: 'Lab Technician',
    notifications: 6,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Specimen processing, pending results, and critical value alerts.',
    shift: 'Core Lab',
    nav: { icons: ['LayoutDashboard', 'FlaskConical', 'FileCheck'], routes: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Lab Orders', href: '/orders', icon: 'FlaskConical', badge: 31 },
      { label: 'Results', href: '/results', icon: 'FileCheck' },
    ]},
    features: [
      { slug: 'orders', title: 'Lab Orders', desc: 'Pending collection and in-process specimens.', list: [
        { id: 'LAB-8821', name: 'CBC + BMP — Hayes, R.', status: 'critical', statusLabel: 'STAT', time: 'Collected 09:20' },
        { id: 'LAB-8819', name: 'Urinalysis — Park, L.', status: 'active', statusLabel: 'Processing', time: 'Collected 09:05' },
      ], detailName: 'LAB-8821' },
      { slug: 'results', title: 'Results Review', desc: 'Completed results awaiting pathologist sign-off.', list: [
        { id: 'RES-331', name: 'Lipid Panel — Wright, E.', status: 'pending', statusLabel: 'Review', time: 'Completed 09:10' },
        { id: 'RES-329', name: 'TSH — Miller, G.', status: 'completed', statusLabel: 'Released', time: 'Completed 08:45' },
      ], detailName: 'Lipid Panel' },
    ],
    stats: { icons: ['Activity', 'Users', 'Clock', 'AlertCircle'], data: [
      { label: 'Pending Orders', value: '31', icon: 'Activity' },
      { label: 'STAT Orders', value: '4', icon: 'AlertCircle' },
      { label: 'Avg TAT', value: '42', unit: 'min', icon: 'Clock' },
      { label: 'Processed Today', value: '412', change: 3, changeLabel: 'vs avg', icon: 'Users' },
    ]},
    table: { title: 'STAT Queue', nameHeader: 'Order', data: [
      { id: 'LAB-8821', name: 'CBC + BMP — Hayes', status: 'critical', statusLabel: 'STAT', time: '09:20' },
      { id: 'LAB-8818', name: 'Troponin — ED Patient', status: 'critical', statusLabel: 'STAT', time: '09:15' },
    ]},
    timeline: [
      { id: '1', timestamp: '09:22', title: 'Critical value — K+ 6.2', category: 'lab', status: 'critical', actor: 'Auto-alert' },
      { id: '2', timestamp: '09:10', title: 'Specimen received — CBC', category: 'lab', status: 'active', actor: 'Accessioning' },
    ],
  },
  {
    dir: 'radiology-portal',
    title: 'Radiology',
    subtitle: 'Imaging Services',
    role: 'Radiologist',
    notifications: 7,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Reading queue, modality workload, and report turnaround.',
    shift: 'Reading Room A',
    nav: { icons: ['LayoutDashboard', 'Scan', 'FileText'], routes: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Imaging Studies', href: '/studies', icon: 'Scan', badge: 18 },
      { label: 'Reports', href: '/reports', icon: 'FileText' },
    ]},
    features: [
      { slug: 'studies', title: 'Imaging Studies', desc: 'Studies awaiting interpretation and priors.', list: [
        { id: 'IMG-5521', name: 'CT Chest w/ Contrast — Hayes, R.', status: 'critical', statusLabel: 'STAT', time: '09:25' },
        { id: 'IMG-5519', name: 'XR Knee — Park, L.', status: 'pending', statusLabel: 'Routine', time: '09:10' },
      ], detailName: 'CT Chest — Hayes' },
      { slug: 'reports', title: 'Reports', desc: 'Draft and finalized radiology reports.', list: [
        { id: 'RPT-221', name: 'MRI Brain — Preliminary', status: 'pending', statusLabel: 'Draft', time: 'Dr. Alvarez' },
        { id: 'RPT-219', name: 'US Abdomen — Final', status: 'completed', statusLabel: 'Signed', time: 'Dr. Kim' },
      ], detailName: 'MRI Brain Report' },
    ],
    stats: { icons: ['Activity', 'Users', 'Clock', 'AlertCircle'], data: [
      { label: 'Reading Queue', value: '18', icon: 'Activity' },
      { label: 'STAT Studies', value: '3', icon: 'AlertCircle' },
      { label: 'Avg Report TAT', value: '28', unit: 'min', icon: 'Clock' },
      { label: 'Signed Today', value: '47', icon: 'Users' },
    ]},
    table: { title: 'Reading Queue', nameHeader: 'Study', data: [
      { id: 'IMG-5521', name: 'CT Chest — Hayes', status: 'critical', statusLabel: 'STAT', time: '09:25' },
      { id: 'IMG-5518', name: 'CT Head — ED', status: 'critical', statusLabel: 'STAT', time: '09:18' },
    ]},
    timeline: [
      { id: '1', timestamp: '09:25', title: 'STAT CT uploaded', category: 'imaging', status: 'critical', actor: 'PACS' },
      { id: '2', timestamp: '09:00', title: 'Report signed — US Abdomen', category: 'imaging', status: 'completed', actor: 'Dr. Kim' },
    ],
  },
  {
    dir: 'billing',
    title: 'Revenue Cycle',
    subtitle: 'Billing & Claims',
    role: 'Billing Specialist',
    notifications: 2,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Claims pipeline, denial management, and revenue metrics.',
    shift: 'RCM Operations',
    nav: { icons: ['LayoutDashboard', 'Receipt', 'FileSpreadsheet'], routes: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Claims', href: '/claims', icon: 'Receipt', badge: 156 },
      { label: 'Invoices', href: '/invoices', icon: 'FileSpreadsheet' },
    ]},
    features: [
      { slug: 'claims', title: 'Claims Management', desc: 'Submitted, pending, and denied insurance claims.', list: [
        { id: 'CLM-8821', name: 'Hayes, R. — Inpatient', status: 'pending', statusLabel: 'Payer Review', time: '$48,220' },
        { id: 'CLM-8819', name: 'Park, L. — Outpatient', status: 'active', statusLabel: 'Submitted', time: '$2,840' },
      ], detailName: 'Claim CLM-8821' },
      { slug: 'invoices', title: 'Patient Invoices', desc: 'Self-pay balances and payment plans.', list: [
        { id: 'INV-4421', name: 'Miller, G. — Statement', status: 'pending', statusLabel: 'Due', time: '$1,240' },
        { id: 'INV-4419', name: 'Wright, E. — Payment Plan', status: 'active', statusLabel: 'Active', time: '$320/mo' },
      ], detailName: 'Invoice INV-4421' },
    ],
    stats: { icons: ['Activity', 'Users', 'Clock', 'AlertCircle'], data: [
      { label: 'Pending Claims', value: '156', icon: 'Activity' },
      { label: 'Denial Rate', value: '4.2', unit: '%', change: -0.8, changeLabel: 'vs last month', icon: 'AlertCircle' },
      { label: 'Days in A/R', value: '38', icon: 'Clock' },
      { label: 'Collected MTD', value: '$2.4M', icon: 'Users' },
    ]},
    table: { title: 'Recent Claims', nameHeader: 'Claim', data: [
      { id: 'CLM-8821', name: 'Hayes — Inpatient', status: 'pending', statusLabel: 'Review', time: '$48,220' },
      { id: 'CLM-8818', name: 'ED Visit — Wright', status: 'critical', statusLabel: 'Denied', time: '$8,420' },
    ]},
    timeline: [
      { id: '1', timestamp: '09:00', title: 'Claim submitted — BCBS', category: 'note', status: 'pending' },
      { id: '2', timestamp: '08:30', title: 'Denial overturned — CLM-8802', category: 'note', status: 'completed' },
    ],
  },
  {
    dir: 'insurance',
    title: 'Payer Hub',
    subtitle: 'Coverage & Auth',
    role: 'Utilization Review',
    notifications: 3,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Prior authorizations, eligibility verification, and payer contracts.',
    shift: 'Utilization Management',
    nav: { icons: ['LayoutDashboard', 'Shield', 'ClipboardCheck'], routes: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Policies', href: '/policies', icon: 'Shield' },
      { label: 'Prior Auth', href: '/authorizations', icon: 'ClipboardCheck', badge: 9 },
    ]},
    features: [
      { slug: 'policies', title: 'Coverage Policies', desc: 'Active payer contracts and benefit structures.', list: [
        { id: 'POL-101', name: 'BlueCross PPO — Metro General', status: 'active', statusLabel: 'Active', time: 'Renewal: Dec 2026' },
        { id: 'POL-102', name: 'Medicare Part A/B', status: 'active', statusLabel: 'Active', time: 'Federal' },
      ], detailName: 'BlueCross PPO' },
      { slug: 'authorizations', title: 'Prior Authorizations', desc: 'Pending and approved authorization requests.', list: [
        { id: 'AUTH-442', name: 'MRI Brain — Wright, E.', status: 'pending', statusLabel: 'Pending', time: 'Submitted 03/10' },
        { id: 'AUTH-441', name: 'Cardiac Cath — Hayes, R.', status: 'active', statusLabel: 'Approved', time: 'Valid 30 days' },
      ], detailName: 'AUTH-442' },
    ],
    stats: { icons: ['Activity', 'Users', 'Clock', 'AlertCircle'], data: [
      { label: 'Pending Auth', value: '9', icon: 'Activity' },
      { label: 'Approval Rate', value: '87', unit: '%', icon: 'Users' },
      { label: 'Avg Decision', value: '1.2', unit: 'days', icon: 'Clock' },
      { label: 'Expiring Soon', value: '4', icon: 'AlertCircle' },
    ]},
    table: { title: 'Auth Queue', nameHeader: 'Request', data: [
      { id: 'AUTH-442', name: 'MRI Brain — Wright', status: 'pending', statusLabel: 'Pending', time: '03/10' },
      { id: 'AUTH-440', name: 'PT — Miller', status: 'pending', statusLabel: 'Info Requested', time: '03/09' },
    ]},
    timeline: [
      { id: '1', timestamp: '09:00', title: 'Auth approved — Cardiac Cath', category: 'note', status: 'completed' },
      { id: '2', timestamp: '08:45', title: 'Eligibility verified — BCBS', category: 'note', status: 'active' },
    ],
  },
  {
    dir: 'telemedicine',
    title: 'Telemedicine',
    subtitle: 'Virtual Care',
    role: 'Telehealth Provider',
    notifications: 4,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Virtual visit queue, session management, and remote monitoring.',
    shift: 'Virtual Clinic',
    nav: { icons: ['LayoutDashboard', 'Video', 'Users'], routes: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Sessions', href: '/sessions', icon: 'Video', badge: 5 },
      { label: 'Waiting Room', href: '/waiting-room', icon: 'Users' },
    ]},
    features: [
      { slug: 'sessions', title: 'Active Sessions', desc: 'In-progress and scheduled virtual visits.', list: [
        { id: 'SES-221', name: 'Follow-up — Anderson, K.', status: 'active', statusLabel: 'In Session', time: 'Started 09:30' },
        { id: 'SES-220', name: 'New Patient — Brooks, T.', status: 'scheduled', statusLabel: '09:45', time: 'Scheduled' },
      ], detailName: 'Session SES-221' },
      { slug: 'waiting-room', title: 'Waiting Room', desc: 'Patients checked in and awaiting provider.', list: [
        { id: 'WR-101', name: 'Brooks, T.', status: 'pending', statusLabel: 'Waiting', time: '5 min' },
        { id: 'WR-102', name: 'Chen, M.', status: 'pending', statusLabel: 'Waiting', time: '2 min' },
      ], detailName: 'Brooks, T.' },
    ],
    stats: { icons: ['Activity', 'Users', 'Clock', 'AlertCircle'], data: [
      { label: 'Sessions Today', value: '24', icon: 'Activity' },
      { label: 'In Waiting Room', value: '3', icon: 'Users' },
      { label: 'Avg Wait', value: '4', unit: 'min', icon: 'Clock' },
      { label: 'No-shows', value: '2', icon: 'AlertCircle' },
    ]},
    table: { title: 'Today\'s Schedule', nameHeader: 'Visit', data: [
      { id: 'SES-221', name: 'Anderson — Follow-up', status: 'active', statusLabel: 'Live', time: '09:30' },
      { id: 'SES-220', name: 'Brooks — New Patient', status: 'scheduled', statusLabel: '09:45', time: 'Upcoming' },
    ]},
    timeline: [
      { id: '1', timestamp: '09:30', title: 'Session started — Anderson', category: 'procedure', status: 'active' },
      { id: '2', timestamp: '09:25', title: 'Patient checked in — Brooks', category: 'note', status: 'pending' },
    ],
  },
  {
    dir: 'analytics',
    title: 'Analytics',
    subtitle: 'Population Health',
    role: 'Data Analyst',
    notifications: 1,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Clinical quality metrics, operational KPIs, and population trends.',
    shift: 'Real-time Analytics',
    nav: { icons: ['LayoutDashboard', 'BarChart3', 'TrendingUp'], routes: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Reports', href: '/reports', icon: 'BarChart3' },
      { label: 'Metrics', href: '/metrics', icon: 'TrendingUp' },
    ]},
    features: [
      { slug: 'reports', title: 'Reports Library', desc: 'Scheduled and on-demand analytical reports.', list: [
        { id: 'RPT-101', name: 'HCAHPS Scorecard — Q1 2026', status: 'completed', statusLabel: 'Published', time: 'Mar 01' },
        { id: 'RPT-102', name: 'Sepsis Bundle Compliance', status: 'active', statusLabel: 'Draft', time: 'Updated today' },
      ], detailName: 'HCAHPS Scorecard' },
      { slug: 'metrics', title: 'Quality Metrics', desc: 'CMS core measures and internal benchmarks.', list: [
        { id: 'MET-01', name: '30-Day Readmission Rate', status: 'active', statusLabel: '8.2%', time: 'Target: <10%' },
        { id: 'MET-02', name: 'Door-to-Balloon Time', status: 'completed', statusLabel: '62 min', time: 'Target: <90 min' },
      ], detailName: 'Readmission Rate' },
    ],
    stats: { icons: ['Activity', 'Users', 'Clock', 'AlertCircle'], data: [
      { label: 'ED Volume', value: '142', change: 5, changeLabel: 'vs yesterday', icon: 'Activity' },
      { label: 'Bed Occupancy', value: '87', unit: '%', icon: 'Users' },
      { label: 'Avg LOS', value: '4.2', unit: 'days', icon: 'Clock' },
      { label: 'Quality Alerts', value: '3', icon: 'AlertCircle' },
    ]},
    table: { title: 'Key Indicators', nameHeader: 'Metric', data: [
      { id: 'KPI-01', name: 'Patient Satisfaction', status: 'completed', statusLabel: '4.6/5', time: 'HCAHPS' },
      { id: 'KPI-02', name: 'CLABSI Rate', status: 'active', statusLabel: '0.8', time: 'Per 1000' },
    ]},
    timeline: [
      { id: '1', timestamp: '08:00', title: 'Daily census report generated', category: 'note', status: 'completed' },
      { id: '2', timestamp: '07:30', title: 'Quality measure refresh', category: 'note', status: 'completed' },
    ],
  },
  {
    dir: 'notifications',
    title: 'Notifications',
    subtitle: 'Communications',
    role: 'Communications Admin',
    notifications: 0,
    navImport: 'navItems',
    navVar: 'navItems',
    dashboardDesc: 'Message templates, delivery channels, and communication audit trail.',
    shift: 'Messaging Center',
    nav: { icons: ['LayoutDashboard', 'Mail', 'Send'], routes: [
      { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Templates', href: '/templates', icon: 'Mail' },
      { label: 'Delivery Log', href: '/delivery-log', icon: 'Send', badge: 3 },
    ]},
    features: [
      { slug: 'templates', title: 'Message Templates', desc: 'SMS, email, and in-app notification templates.', list: [
        { id: 'TPL-101', name: 'Appointment Reminder — 24hr', status: 'active', statusLabel: 'Active', time: 'SMS + Email' },
        { id: 'TPL-102', name: 'Lab Results Available', status: 'active', statusLabel: 'Active', time: 'In-app + Email' },
      ], detailName: 'Appointment Reminder' },
      { slug: 'delivery-log', title: 'Delivery Log', desc: 'Sent messages with delivery status and audit trail.', list: [
        { id: 'DL-8821', name: 'Reminder — Anderson, K.', status: 'completed', statusLabel: 'Delivered', time: '09:00' },
        { id: 'DL-8820', name: 'Critical Lab Alert — Hayes', status: 'completed', statusLabel: 'Delivered', time: '09:22' },
      ], detailName: 'DL-8821' },
    ],
    stats: { icons: ['Activity', 'Users', 'Clock', 'AlertCircle'], data: [
      { label: 'Sent Today', value: '1,842', icon: 'Activity' },
      { label: 'Delivery Rate', value: '99.2', unit: '%', icon: 'Users' },
      { label: 'Avg Latency', value: '1.4', unit: 'sec', icon: 'Clock' },
      { label: 'Failed', value: '3', icon: 'AlertCircle' },
    ]},
    table: { title: 'Recent Deliveries', nameHeader: 'Message', data: [
      { id: 'DL-8821', name: 'Appt Reminder — Anderson', status: 'completed', statusLabel: 'Delivered', time: '09:00' },
      { id: 'DL-8820', name: 'Critical Lab — Hayes', status: 'completed', statusLabel: 'Delivered', time: '09:22' },
    ]},
    timeline: [
      { id: '1', timestamp: '09:22', title: 'Critical alert delivered', description: 'K+ 6.2 — Dr. Chen, Nursing', category: 'note', status: 'completed' },
      { id: '2', timestamp: '09:00', title: 'Batch reminders sent', description: '47 appointment reminders', category: 'note', status: 'completed' },
    ],
  },
];

const listPage = (feature, portalTitle) => `import Link from 'next/link';
import { PageHeader, DataTable, StatusPill, Button, Badge } from '@medsphere/ui';
import { Plus } from 'lucide-react';

const items = ${JSON.stringify(feature.list, null, 2)};

export default function ${toPascal(feature.slug)}ListPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="${feature.title}"
        description="${feature.desc}"
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            New
          </Button>
        }
      />

      <DataTable
        columns={[
          { key: 'id', header: 'ID', cell: (row) => <span className="font-mono text-xs text-muted-foreground">{row.id}</span> },
          { key: 'name', header: 'Name', cell: (row) => (
            <Link href={\`/${feature.slug}/\${row.id}\`} className="font-medium text-primary hover:underline">
              {row.name}
            </Link>
          ), sortable: true },
          { key: 'status', header: 'Status', cell: (row) => <StatusPill status={row.status}>{row.statusLabel}</StatusPill> },
          { key: 'time', header: 'Details', cell: (row) => <span className="text-muted-foreground">{row.time}</span> },
        ]}
        data={items}
        keyExtractor={(row) => row.id}
        searchFilter={(row, q) => row.name.toLowerCase().includes(q.toLowerCase()) || row.id.toLowerCase().includes(q.toLowerCase())}
      />
    </div>
  );
}
`;

const detailPage = (feature) => `import Link from 'next/link';
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

const record = ${JSON.stringify(feature.list[0], null, 2)};

const timeline = [
  { id: '1', timestamp: '09:00', title: 'Record created', category: 'note', status: 'completed' },
  { id: '2', timestamp: '09:15', title: 'Status updated', description: 'Current status: ${feature.list[0].statusLabel}', category: 'note', status: '${feature.list[0].status}' },
  { id: '3', timestamp: '09:30', title: 'Review completed', category: 'procedure', status: 'completed', actor: 'System' },
];

export default async function ${toPascal(feature.slug)}DetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        title="${feature.detailName}"
        description={\`Record \${id} — ${feature.title}\`}
        badge={<StatusPill status={record.status}>{record.statusLabel}</StatusPill>}
        actions={
          <Button variant="outline" asChild>
            <Link href="/${feature.slug}">
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
`;

function toPascal(str) {
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

for (const portal of portals) {
  const base = path.join(root, 'apps', portal.dir);

  write(path.join(base, 'src/app/layout.tsx'), layoutTsx(portal));
  write(path.join(base, 'src/components/portal-shell.tsx'), portalShellTsx(portal));
  write(path.join(base, 'src/features/navigation/nav-items.tsx'), navItemsTemplate(portal.nav));

  // Authenticated layout group
  write(path.join(base, 'src/app/(portal)/layout.tsx'), authenticatedLayout);
  write(path.join(base, 'src/app/(portal)/dashboard/page.tsx'), dashboardPage(portal, portal.stats, portal.table));

  for (const feature of portal.features) {
    write(path.join(base, `src/app/(portal)/${feature.slug}/page.tsx`), listPage(feature, portal.title));
    write(path.join(base, `src/app/(portal)/${feature.slug}/[id]/page.tsx`), detailPage(feature));
  }

  // Root redirect page
  write(
    path.join(base, 'src/app/page.tsx'),
    `import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/dashboard');
}
`,
  );

  // Login page for auth portals
  write(
    path.join(base, 'src/app/login/page.tsx'),
    `'use client';

import { useState } from 'react';
import { Button, Input, Label, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@medsphere/ui';
import { Activity } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.cookie = 'ms_access_token=demo-token; path=/; max-age=86400';
    window.location.href = '/dashboard';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background clinical-grid p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-muted">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>${portal.title}</CardTitle>
          <CardDescription>Sign in to ${portal.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@hospital.org" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
`,
  );
}

console.log('Generated UI for', portals.length, 'clinical portals');
