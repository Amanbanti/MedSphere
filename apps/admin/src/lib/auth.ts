export const ACCESS_TOKEN_COOKIE = 'ms_access_token';
export const REFRESH_TOKEN_COOKIE = 'ms_refresh_token';
export const SESSION_COOKIE = 'ms_session';

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: string;
  organizationId?: string;
}

export function parseSessionCookie(value: string | undefined): AuthSession | null {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value)) as AuthSession;
  } catch {
    return null;
  }
}

export function getRoleLabel(role: string): string {
  return role
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}
