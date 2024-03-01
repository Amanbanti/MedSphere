import {
  LayoutDashboard,
  Users,
  Calendar,
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
    
  },
  {
    label: 'Patients',
    href: '/patients',
    icon: <Users />,
    badge: 14,
  },
  {
    label: 'Schedule',
    href: '/schedule',
    icon: <Calendar />,
    
  },
];
