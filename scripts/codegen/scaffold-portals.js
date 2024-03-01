const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../..');

const portals = [
  { dir: 'web', pkg: '@medsphere/web', port: 3000, auth: false, title: 'MedSphere', subtitle: 'Enterprise Health Platform' },
  { dir: 'admin', pkg: '@medsphere/admin', port: 3001, auth: true, title: 'Admin Console', subtitle: 'System Administration' },
  { dir: 'patient-portal', pkg: '@medsphere/patient-portal', port: 3002, auth: true, title: 'Patient Portal', subtitle: 'My Health' },
  { dir: 'doctor-portal', pkg: '@medsphere/doctor-portal', port: 3003, auth: true, title: 'Physician Workbench', subtitle: 'Clinical Care' },
  { dir: 'nurse-portal', pkg: '@medsphere/nurse-portal', port: 3004, auth: true, title: 'Nursing Station', subtitle: 'Care Coordination' },
  { dir: 'pharmacy-portal', pkg: '@medsphere/pharmacy-portal', port: 3005, auth: true, title: 'Pharmacy', subtitle: 'Medication Management' },
  { dir: 'laboratory-portal', pkg: '@medsphere/laboratory-portal', port: 3006, auth: true, title: 'Laboratory', subtitle: 'Diagnostics' },
  { dir: 'radiology-portal', pkg: '@medsphere/radiology-portal', port: 3007, auth: true, title: 'Radiology', subtitle: 'Imaging Services' },
  { dir: 'billing', pkg: '@medsphere/billing', port: 3008, auth: true, title: 'Revenue Cycle', subtitle: 'Billing & Claims' },
  { dir: 'insurance', pkg: '@medsphere/insurance', port: 3009, auth: true, title: 'Payer Hub', subtitle: 'Coverage & Auth' },
  { dir: 'telemedicine', pkg: '@medsphere/telemedicine', port: 3010, auth: true, title: 'Telemedicine', subtitle: 'Virtual Care' },
  { dir: 'analytics', pkg: '@medsphere/analytics', port: 3011, auth: true, title: 'Analytics', subtitle: 'Population Health' },
  { dir: 'notifications', pkg: '@medsphere/notifications', port: 3012, auth: true, title: 'Notifications', subtitle: 'Communications' },
];

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

const pkgJson = (p) =>
  JSON.stringify(
    {
      name: p.pkg,
      version: '0.1.0',
      private: true,
      scripts: {
        dev: `next dev -p ${p.port}`,
        build: 'next build',
        start: `next start -p ${p.port}`,
        lint: 'next lint',
        typecheck: 'tsc --noEmit',
        test: 'vitest run',
        'test:cov': 'vitest run --coverage',
        clean: 'rimraf .next dist coverage',
      },
      dependencies: {
        '@medsphere/sdk': 'workspace:*',
        '@medsphere/ui': 'workspace:*',
        next: '^15.1.3',
        react: '^19.0.0',
        'react-dom': '^19.0.0',
        'lucide-react': '^0.469.0',
      },
      devDependencies: {
        '@types/node': '^22.10.2',
        '@types/react': '^18.3.18',
        '@types/react-dom': '^18.3.5',
        autoprefixer: '^10.4.20',
        postcss: '^8.4.49',
        tailwindcss: '^3.4.17',
        typescript: '^5.7.2',
      },
    },
    null,
    2,
  );

const tsconfig = JSON.stringify(
  {
    compilerOptions: {
      target: 'ES2022',
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      plugins: [{ name: 'next' }],
      paths: { '@/*': ['./src/*'] },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  },
  null,
  2,
);

const nextConfig = [
  "import type { NextConfig } from 'next';",
  '',
  'const nextConfig: NextConfig = {',
  "  transpilePackages: ['@medsphere/ui', '@medsphere/sdk'],",
  '  reactStrictMode: true,',
  '};',
  '',
  'export default nextConfig;',
  '',
].join('\n');

const postcss = [
  'module.exports = {',
  '  plugins: {',
  '    tailwindcss: {},',
  '    autoprefixer: {},',
  '  },',
  '};',
  '',
].join('\n');

const tailwind = [
  "import type { Config } from 'tailwindcss';",
  "import { medsphereTailwindTheme } from '../../../packages/config/src/tailwind/preset';",
  '',
  'const config: Config = {',
  '  ...medsphereTailwindTheme,',
  '  content: [',
  "    './src/**/*.{js,ts,jsx,tsx,mdx}',",
  "    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',",
  '  ],',
  '};',
  '',
  'export default config;',
  '',
].join('\n');

const globalsCss = [
  "@import '@medsphere/ui/globals.css';",
  '',
  '@tailwind base;',
  '@tailwind components;',
  '@tailwind utilities;',
  '',
].join('\n');

const authTs = [
  "export const ACCESS_TOKEN_COOKIE = 'ms_access_token';",
  "export const REFRESH_TOKEN_COOKIE = 'ms_refresh_token';",
  "export const SESSION_COOKIE = 'ms_session';",
  '',
  'export interface AuthSession {',
  '  userId: string;',
  '  email: string;',
  '  name: string;',
  '  role: string;',
  '  organizationId?: string;',
  '}',
  '',
  'export function parseSessionCookie(value: string | undefined): AuthSession | null {',
  '  if (!value) return null;',
  '  try {',
  '    return JSON.parse(decodeURIComponent(value)) as AuthSession;',
  '  } catch {',
  '    return null;',
  '  }',
  '}',
  '',
  'export function getRoleLabel(role: string): string {',
  '  return role',
  "    .split('_')",
  '    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())',
  "    .join(' ');",
  '}',
  '',
].join('\n');

const apiClientTs = [
  "import { createAuthClient, createHttpClient } from '@medsphere/sdk';",
  "import { ACCESS_TOKEN_COOKIE } from './auth';",
  '',
  "const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';",
  '',
  'function readCookie(name: string): string | null {',
  "  if (typeof document === 'undefined') return null;",
  "  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));",
  '  return match ? decodeURIComponent(match[1]) : null;',
  '}',
  '',
  'export const httpClient = createHttpClient({',
  '  baseUrl: API_BASE,',
  '  getAccessToken: () => readCookie(ACCESS_TOKEN_COOKIE),',
  '  onUnauthorized: () => {',
  "    if (typeof window !== 'undefined') {",
  "      window.location.href = '/login?reason=session_expired';",
  '    }',
  '  },',
  '});',
  '',
  'export const authClient = createAuthClient({',
  '  baseUrl: API_BASE,',
  '  getAccessToken: () => readCookie(ACCESS_TOKEN_COOKIE),',
  '  onUnauthorized: () => {',
  "    if (typeof window !== 'undefined') {",
  "      window.location.href = '/login?reason=session_expired';",
  '    }',
  '  },',
  '});',
  '',
].join('\n');

const middlewareTs = [
  "import { NextResponse } from 'next/server';",
  "import type { NextRequest } from 'next/server';",
  "import { ACCESS_TOKEN_COOKIE } from './lib/auth';",
  '',
  "const PUBLIC_PATHS = ['/login', '/health', '/api/health'];",
  '',
  'export function middleware(request: NextRequest) {',
  '  const { pathname } = request.nextUrl;',
  '',
  '  if (PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path + \'/\'))) {',
  '    return NextResponse.next();',
  '  }',
  '',
  '  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;',
  '  if (!token) {',
  '    const loginUrl = new URL(\'/login\', request.url);',
  '    loginUrl.searchParams.set(\'redirect\', pathname);',
  '    return NextResponse.redirect(loginUrl);',
  '  }',
  '',
  '  return NextResponse.next();',
  '}',
  '',
  'export const config = {',
  "  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],",
  '};',
  '',
].join('\n');

for (const p of portals) {
  const base = path.join(root, 'apps', p.dir);
  write(path.join(base, 'package.json'), pkgJson(p));
  write(path.join(base, 'tsconfig.json'), tsconfig);
  write(path.join(base, 'next.config.ts'), nextConfig);
  write(path.join(base, 'postcss.config.js'), postcss);
  write(path.join(base, 'tailwind.config.ts'), tailwind);
  write(path.join(base, 'src/app/globals.css'), globalsCss);
  write(path.join(base, 'src/lib/auth.ts'), authTs);
  write(path.join(base, 'src/lib/api-client.ts'), apiClientTs);
  if (p.auth) {
    write(path.join(base, 'src/middleware.ts'), middlewareTs);
  }
}

console.log('Scaffolded', portals.length, 'portals');
