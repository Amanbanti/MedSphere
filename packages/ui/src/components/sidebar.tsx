'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './button';

export interface SidebarNavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  items: SidebarNavItem[];
  footer?: React.ReactNode;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({
  logo,
  title = 'MedSphere',
  subtitle,
  items,
  footer,
  collapsed = false,
  onCollapsedChange,
  className,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200',
        collapsed ? 'w-[68px]' : 'w-60',
        className,
      )}
      {...props}
    >
      <div className="flex h-14 items-center gap-3 border-b border-sidebar-border px-4">
        {logo}
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">{title}</p>
            {subtitle && (
              <p className="truncate text-xs text-sidebar-foreground/60">{subtitle}</p>
            )}
          </div>
        )}
        {onCollapsedChange && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 text-sidebar-foreground/70 hover:bg-sidebar-muted hover:text-sidebar-foreground"
            onClick={() => onCollapsedChange(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  item.active
                    ? 'bg-sidebar-accent/20 text-sidebar-accent'
                    : 'text-sidebar-foreground/75 hover:bg-sidebar-muted hover:text-sidebar-foreground',
                  collapsed && 'justify-center px-2',
                )}
                title={collapsed ? item.label : undefined}
              >
                {item.icon && <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4">{item.icon}</span>}
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="rounded-full bg-sidebar-muted px-1.5 py-0.5 text-[10px] font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {footer && (
        <div className={cn('border-t border-sidebar-border p-3', collapsed && 'px-2')}>
          {footer}
        </div>
      )}
    </aside>
  );
}
