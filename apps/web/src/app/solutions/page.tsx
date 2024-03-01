import Link from 'next/link';
import { Button, Input, Label, Badge } from '@medsphere/ui';
import { Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

const benefits = [
  'Dedicated implementation team with go-live playbooks',
  'FHIR R4 interoperability out of the box',
  'Role-based portals for every care team member',
  '24/7 clinical support with guaranteed response SLAs',
];

export default function SolutionsPage() {
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
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Badge variant="info" className="mb-4">
              Solutions
            </Badge>
            <h1 className="font-serif text-4xl font-bold tracking-tight">
              Built for health systems that cannot compromise on clinical quality.
            </h1>
            <p className="mt-4 text-muted-foreground">
              From 50-bed community hospitals to multi-state IDNs, MedSphere scales
              with your organization — without the customization tax of legacy vendors.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <h2 className="font-serif text-xl font-semibold">Request a Demo</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Our clinical solutions team will reach out within one business day.
            </p>
            <form className="mt-6 space-y-4" action="#" method="post">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" name="organization" required />
              </div>
              <Button type="submit" className="w-full">
                Submit Request
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
