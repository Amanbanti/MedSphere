import Link from 'next/link';
import { Button } from '@medsphere/ui';
import { Activity, ArrowRight, Shield, Layers, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Full-bleed atmospheric background */}
      <div
        className="pointer-events-none absolute inset-0 clinical-grid opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[80vh] w-[80vw] rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[60vh] w-[70vw] rounded-full bg-accent/6 blur-3xl"
        aria-hidden
      />

      {/* Navigation */}
      <header className="relative z-10 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-semibold tracking-tight">MedSphere</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/platform" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Platform
            </Link>
            <Link href="/solutions" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Solutions
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/solutions">
                Request Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — brand-first, no cards, no stat strips */}
      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pt-32">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              Enterprise Hospital Information System
            </p>
            <h1 className="font-serif text-5xl font-bold leading-[1.08] tracking-tight text-balance md:text-6xl lg:text-7xl">
              MedSphere
            </h1>
            <p className="mt-2 font-serif text-2xl font-normal text-muted-foreground md:text-3xl">
              Clinical intelligence for health systems at scale.
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Unify EMR, revenue cycle, diagnostics, and virtual care on one platform
              built for the workflows clinicians actually use — from Epic-scale hospitals
              to regional networks.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/solutions">
                  Schedule a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/platform">Explore Platform</Link>
              </Button>
            </div>
          </div>

          {/* Capability highlights below fold of first viewport on mobile */}
          <div className="mt-24 grid gap-8 border-t border-border pt-16 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-muted">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-serif text-lg font-semibold">Unified Clinical Record</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Single source of truth across inpatient, ambulatory, and virtual encounters
                with real-time interoperability.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-muted">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-serif text-lg font-semibold">Enterprise Security</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                HIPAA-aligned architecture with ABAC, audit trails, and zero-trust
                access controls across every portal.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-muted">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-serif text-lg font-semibold">Operational Velocity</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Revenue cycle, lab, pharmacy, and radiology modules that share data —
                eliminating swivel-chair workflows.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border bg-surface-muted/30 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MedSphere Health Systems. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/platform" className="text-sm text-muted-foreground hover:text-foreground">
              Platform
            </Link>
            <Link href="/solutions" className="text-sm text-muted-foreground hover:text-foreground">
              Solutions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
