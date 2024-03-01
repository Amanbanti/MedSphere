import type { Config } from 'tailwindcss';

const medsphereColors = {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  surface: {
    DEFAULT: 'hsl(var(--surface))',
    elevated: 'hsl(var(--surface-elevated))',
    muted: 'hsl(var(--surface-muted))',
  },
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
    hover: 'hsl(var(--primary-hover))',
    muted: 'hsl(var(--primary-muted))',
  },
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))',
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
  border: 'hsl(var(--border))',
  'border-strong': 'hsl(var(--border-strong))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  destructive: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))',
  },
  warning: {
    DEFAULT: 'hsl(var(--warning))',
    foreground: 'hsl(var(--warning-foreground))',
  },
  success: {
    DEFAULT: 'hsl(var(--success))',
    foreground: 'hsl(var(--success-foreground))',
  },
  info: {
    DEFAULT: 'hsl(var(--info))',
    foreground: 'hsl(var(--info-foreground))',
  },
  sidebar: {
    DEFAULT: 'hsl(var(--sidebar))',
    foreground: 'hsl(var(--sidebar-foreground))',
    muted: 'hsl(var(--sidebar-muted))',
    accent: 'hsl(var(--sidebar-accent))',
    border: 'hsl(var(--sidebar-border))',
  },
  topbar: {
    DEFAULT: 'hsl(var(--topbar))',
    foreground: 'hsl(var(--topbar-foreground))',
    border: 'hsl(var(--topbar-border))',
  },
  chart: {
    1: 'hsl(var(--chart-1))',
    2: 'hsl(var(--chart-2))',
    3: 'hsl(var(--chart-3))',
    4: 'hsl(var(--chart-4))',
    5: 'hsl(var(--chart-5))',
  },
};

export const medsphereTailwindTheme: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: medsphereColors,
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius)',
        sm: 'calc(var(--radius) - 2px)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        serif: ['var(--font-display)', 'Source Serif 4', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
};

export default medsphereTailwindTheme;
