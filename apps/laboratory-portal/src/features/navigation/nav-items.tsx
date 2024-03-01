import {
  LayoutDashboard,
  FlaskConical,
  FileCheck,
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
    
  },
  {
    label: 'Lab Orders',
    href: '/orders',
    icon: <FlaskConical />,
    badge: 31,
  },
  {
    label: 'Results',
    href: '/results',
    icon: <FileCheck />,
    
  },
];
