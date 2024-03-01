import { Settings, FileText, Search, FolderOpen } from 'lucide-react';

export const expansionNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/vitals', label: 'Vitals', icon: FolderOpen },
  { href: '/medications', label: 'Medications', icon: FolderOpen },
  { href: '/tasks', label: 'Tasks', icon: FolderOpen },
  { href: '/handoffs', label: 'Handoffs', icon: FolderOpen },
];
