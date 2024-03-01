import {
  LayoutDashboard,
  Mail,
  Send,
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
    
  },
  {
    label: 'Templates',
    href: '/templates',
    icon: <Mail />,
    
  },
  {
    label: 'Delivery Log',
    href: '/delivery-log',
    icon: <Send />,
    badge: 3,
  },
];
