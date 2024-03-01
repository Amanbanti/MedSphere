import { Settings, FileText, Search, FolderOpen } from 'lucide-react';

export const expansionNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/kpis', label: 'KPIs', icon: FolderOpen },
  { href: '/cohorts', label: 'Cohorts', icon: FolderOpen },
  { href: '/benchmarks', label: 'Benchmarks', icon: FolderOpen },
  { href: '/exports', label: 'Exports', icon: FolderOpen },
];
