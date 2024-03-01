import {
  LayoutDashboard,
  Shield,
  ClipboardCheck,
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
    
  },
  {
    label: 'Policies',
    href: '/policies',
    icon: <Shield />,
    
  },
  {
    label: 'Prior Auth',
    href: '/authorizations',
    icon: <ClipboardCheck />,
    badge: 9,
  },
];
