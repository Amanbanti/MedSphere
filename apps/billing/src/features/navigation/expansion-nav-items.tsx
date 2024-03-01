import { Settings, FileText, Search, FolderOpen } from 'lucide-react';

export const expansionNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/invoices', label: 'Invoices', icon: FolderOpen },
  { href: '/claims', label: 'Claims', icon: FolderOpen },
  { href: '/payments', label: 'Payments', icon: FolderOpen },
  { href: '/adjustments', label: 'Adjustments', icon: FolderOpen },
];
