import { createAuthClient, createHttpClient } from '@medsphere/sdk';
import { ACCESS_TOKEN_COOKIE } from './auth';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export const httpClient = createHttpClient({
  baseUrl: API_BASE,
  getAccessToken: () => readCookie(ACCESS_TOKEN_COOKIE),
  onUnauthorized: () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/login?reason=session_expired';
    }
  },
});

export const authClient = createAuthClient({
  baseUrl: API_BASE,
  getAccessToken: () => readCookie(ACCESS_TOKEN_COOKIE),
  onUnauthorized: () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/login?reason=session_expired';
    }
  },
});
