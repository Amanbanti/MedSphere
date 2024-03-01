import {
  LayoutDashboard,
  ClipboardList,
  HeartPulse,
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
    
  },
  {
    label: 'Assignments',
    href: '/assignments',
    icon: <ClipboardList />,
    badge: 6,
  },
  {
    label: 'Vitals',
    href: '/vitals',
    icon: <HeartPulse />,
    
  },
];
