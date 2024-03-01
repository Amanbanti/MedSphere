import {
  LayoutDashboard,
  Video,
  Users,
} from 'lucide-react';
import type { SidebarNavItem } from '@medsphere/ui';

export const navItems: SidebarNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard />,
    
  },
  {
    label: 'Sessions',
    href: '/sessions',
    icon: <Video />,
    badge: 5,
  },
  {
    label: 'Waiting Room',
    href: '/waiting-room',
    icon: <Users />,
    
  },
];
