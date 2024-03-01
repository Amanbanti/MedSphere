import { Settings, FileText, Search, FolderOpen } from 'lucide-react';

export const expansionNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/sessions', label: 'Sessions', icon: FolderOpen },
  { href: '/waiting-room', label: 'Waiting Room', icon: FolderOpen },
  { href: '/recordings', label: 'Recordings', icon: FolderOpen },
  { href: '/chat', label: 'Chat', icon: FolderOpen },
];
