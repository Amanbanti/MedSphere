import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
    
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: <BarChart3 />,
    
  },
  {
    label: 'Metrics',
    href: '/metrics',
    icon: <TrendingUp />,
    
  },
];
