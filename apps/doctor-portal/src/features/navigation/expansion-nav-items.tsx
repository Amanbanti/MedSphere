import { Settings, FileText, Search, FolderOpen } from 'lucide-react';

export const expansionNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/patients', label: 'Patients', icon: FolderOpen },
  { href: '/schedule', label: 'Schedule', icon: FolderOpen },
  { href: '/orders', label: 'Orders', icon: FolderOpen },
  { href: '/notes', label: 'Notes', icon: FolderOpen },
];
