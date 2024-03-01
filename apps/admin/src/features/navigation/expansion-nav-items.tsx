import { Settings, FileText, Search, FolderOpen } from 'lucide-react';

export const expansionNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/users', label: 'Users', icon: FolderOpen },
  { href: '/organizations', label: 'Organizations', icon: FolderOpen },
  { href: '/roles', label: 'Roles', icon: FolderOpen },
  { href: '/audit-logs', label: 'Audit Logs', icon: FolderOpen },
];
