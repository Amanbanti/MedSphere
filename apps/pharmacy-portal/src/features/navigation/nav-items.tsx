import {
  LayoutDashboard,
  Pill,
  Package,
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
    
  },
  {
    label: 'Prescriptions',
    href: '/prescriptions',
    icon: <Pill />,
    badge: 23,
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: <Package />,
    
  },
];
