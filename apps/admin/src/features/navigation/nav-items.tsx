import {
  LayoutDashboard,
  Users,
  Building2,
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
    
  },
  {
    label: 'Users',
    href: '/users',
    icon: <Users />,
    badge: 12,
  },
  {
    label: 'Organizations',
    href: '/organizations',
    icon: <Building2 />,
    
  },
];
