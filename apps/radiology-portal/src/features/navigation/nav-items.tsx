import {
  LayoutDashboard,
  Scan,
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
    label: 'Imaging Studies',
    href: '/studies',
    icon: <Scan />,
    badge: 18,
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: <FileText />,
    
  },
];
