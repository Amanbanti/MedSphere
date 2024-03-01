import { Settings, FileText, Search, FolderOpen } from 'lucide-react';

export const expansionNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/appointments', label: 'Appointments', icon: FolderOpen },
  { href: '/records', label: 'Records', icon: FolderOpen },
  { href: '/messages', label: 'Messages', icon: FolderOpen },
  { href: '/billing', label: 'Billing', icon: FolderOpen },
];
