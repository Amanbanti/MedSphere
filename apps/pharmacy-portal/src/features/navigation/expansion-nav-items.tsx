import { Settings, FileText, Search, FolderOpen } from 'lucide-react';

export const expansionNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/prescriptions', label: 'Prescriptions', icon: FolderOpen },
  { href: '/inventory', label: 'Inventory', icon: FolderOpen },
  { href: '/dispense', label: 'Dispense', icon: FolderOpen },
  { href: '/interactions', label: 'Interactions', icon: FolderOpen },
];
