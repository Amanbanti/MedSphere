import { Settings, FileText, Search, FolderOpen } from 'lucide-react';

export const expansionNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/policies', label: 'Policies', icon: FolderOpen },
  { href: '/authorizations', label: 'Authorizations', icon: FolderOpen },
  { href: '/claims', label: 'Claims', icon: FolderOpen },
  { href: '/eligibility', label: 'Eligibility', icon: FolderOpen },
];
