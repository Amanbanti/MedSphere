import Link from 'next/link';
import { Button, Badge } from '@medsphere/ui';
import {
  Activity,
  ArrowRight,
  Stethoscope,
  FlaskConical,
  Receipt,
  Video,
  BarChart3,
} from 'lucide-react';

const modules = [
  {
    title: 'Clinical Workbench',
    description: 'Physician, nursing, and patient-facing portals with unified EMR access.',
    icon: Stethoscope,
    href: '#',
    tag: 'Core',
  },
  {
    title: 'Diagnostics Hub',
    description: 'Laboratory and radiology workflows with integrated result routing.',
    icon: FlaskConical,
    href: '#',
    tag: 'Diagnostics',
  },
  {
    title: 'Revenue Cycle',
    description: 'Billing, claims, and payer management with real-time eligibility.',
    icon: Receipt,
    href: '#',
    tag: 'Financial',
  },
  {
    title: 'Virtual Care',
    description: 'Telemedicine sessions, waiting rooms, and remote patient monitoring.',
    icon: Video,
    href: '#',
    tag: 'Virtual',
  },
  {
    title: 'Population Analytics',
    description: 'Quality measures, operational KPIs, and predictive insights.',
    icon: BarChart3,
    href: '#',
    tag: 'Analytics',
  },
];

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-semibold">MedSphere</span>
          </Link>
          <Button size="sm" asChild>
            <Link href="/solutions">
              Request Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <Badge variant="info" className="mb-4">
          Platform Overview
        </Badge>
        <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
          One platform. Every care setting.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          MedSphere modules share a common data layer, identity fabric, and clinical
          terminology service — so information flows without interface engines or
          batch reconciliation.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {modules.map((mod) => (
            <article
              key={mod.title}
              className="group rounded-lg border border-border bg-surface p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-muted">
                  <mod.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary">{mod.tag}</Badge>
              </div>
              <h2 className="mt-4 font-serif text-xl font-semibold">{mod.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {mod.description}
              </p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
