'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Activity } from 'lucide-react';
import { Sidebar, Topbar } from '@medsphere/ui';
import { navItems } from '@/features/navigation/nav-items';

interface PortalShellProps {
  children: React.ReactNode;
  user?: { name: string; role: string };
}

export function PortalShell({ children, user }: PortalShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  const items = navItems.map((item) => ({
    ...item,
    active: pathname === item.href || pathname.startsWith(item.href + '/'),
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        title="Radiology"
        subtitle="Imaging Services"
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
          user={user ?? { name: 'Demo User', role: 'Radiologist' }}
          notificationCount={7}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
