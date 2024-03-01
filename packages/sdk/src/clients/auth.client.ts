import { createHttpClient, HttpClient } from './http.client';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  PaginatedResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SessionInfo,
  UserProfile,
} from '../types/api';

export interface AuthClientConfig {
  baseUrl: string;
  getAccessToken?: () => string | null | Promise<string | null>;
  onUnauthorized?: () => void;
}

export class AuthClient {
  private readonly http: HttpClient;

  constructor(config: AuthClientConfig) {
    this.http = createHttpClient({
      baseUrl: config.baseUrl,
      getAccessToken: config.getAccessToken,
      onUnauthorized: config.onUnauthorized,
    });
  }

  login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.http
      .post<ApiResponse<LoginResponse>>('/auth/login', credentials)
      .then((r) => r.data);
  }

  logout(): Promise<void> {
    return this.http.post<ApiResponse<{ success: boolean }>>('/auth/logout').then(() => undefined);
  }

  refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return this.http
      .post<ApiResponse<RefreshTokenResponse>>('/auth/refresh', request)
      .then((r) => r.data);
  }

  getProfile(): Promise<UserProfile> {
    return this.http.get<ApiResponse<UserProfile>>('/auth/me').then((r) => r.data);
  }

  listSessions(): Promise<SessionInfo[]> {
    return this.http.get<ApiResponse<SessionInfo[]>>('/auth/sessions').then((r) => r.data);
  }

  revokeSession(sessionId: string): Promise<void> {
    return this.http
      .delete<ApiResponse<{ success: boolean }>>(`/auth/sessions/${sessionId}`)
      .then(() => undefined);
  }

  requestPasswordReset(email: string): Promise<void> {
    return this.http
      .post<ApiResponse<{ success: boolean }>>('/auth/password-reset/request', { email })
      .then(() => undefined);
  }

  confirmPasswordReset(token: string, password: string): Promise<void> {
    return this.http
      .post<ApiResponse<{ success: boolean }>>('/auth/password-reset/confirm', { token, password })
      .then(() => undefined);
  }
}

export function createAuthClient(config: AuthClientConfig): AuthClient {
  return new AuthClient(config);
}
