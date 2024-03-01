import {
  LayoutDashboard,
  Receipt,
  FileSpreadsheet,
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
    
  },
  {
    label: 'Claims',
    href: '/claims',
    icon: <Receipt />,
    badge: 156,
  },
  {
    label: 'Invoices',
    href: '/invoices',
    icon: <FileSpreadsheet />,
    
  },
];
