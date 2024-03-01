import {
  LayoutDashboard,
  Calendar,
  FileText,
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
    
  },
  {
    label: 'Appointments',
    href: '/appointments',
    icon: <Calendar />,
    badge: 1,
  },
  {
    label: 'Health Records',
    href: '/records',
    icon: <FileText />,
    
  },
];
