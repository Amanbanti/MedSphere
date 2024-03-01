import { Settings, FileText, Search, FolderOpen } from 'lucide-react';

export const expansionNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/orders', label: 'Orders', icon: FolderOpen },
  { href: '/results', label: 'Results', icon: FolderOpen },
  { href: '/specimens', label: 'Specimens', icon: FolderOpen },
  { href: '/qc', label: 'QC', icon: FolderOpen },
];
