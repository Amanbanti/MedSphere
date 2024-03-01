'use client';

import * as React from 'react';
import { Bell, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { Avatar, AvatarFallback } from './avatar';
import { Button } from './button';
import { Input } from './input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  breadcrumb?: React.ReactNode;
  user?: {
    name: string;
    role?: string;
    initials?: string;
  };
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
  notificationCount?: number;
}

export function Topbar({
  title,
  breadcrumb,
  user,
  searchPlaceholder = 'Search patients, orders, records…',
  onSearch,
  actions,
  notificationCount = 0,
  className,
  ...props
}: TopbarProps) {
  const [query, setQuery] = React.useState('');

  return (
    <header
      className={cn(
        'flex h-14 shrink-0 items-center gap-4 border-b border-topbar-border bg-topbar px-4 text-topbar-foreground',
        className,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {breadcrumb}
        {title && !breadcrumb && (
          <h1 className="truncate text-base font-semibold tracking-tight">{title}</h1>
        )}
      </div>

      <div className="relative hidden w-72 md:block">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch?.(e.target.value);
          }}
          placeholder={searchPlaceholder}
          className="h-8 pl-8 text-sm"
        />
      </div>

      {actions}

      <Button variant="ghost" size="icon" className="relative h-8 w-8" aria-label="Notifications">
        <Bell className="h-4 w-4" />
        {notificationCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            {notificationCount > 9 ? '9+' : notificationCount}
          </span>
        )}
      </Button>

      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-surface-muted">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-[10px]">
                  {user.initials ?? user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left lg:block">
                <p className="text-xs font-medium leading-none">{user.name}</p>
                {user.role && (
                  <p className="text-[10px] text-muted-foreground">{user.role}</p>
                )}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div>{user.name}</div>
              {user.role && (
                <div className="text-xs font-normal text-muted-foreground">{user.role}</div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
