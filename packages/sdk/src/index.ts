export { createHttpClient, HttpClient } from './clients/http.client';
export { createAuthClient, AuthClient, type AuthClientConfig } from './clients/auth.client';

export type {
  ApiError,
  ApiErrorCode,
  ApiResponse,
  PaginatedResponse,
  LoginRequest,
  LoginResponse,
  UserProfile,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SessionInfo,
  HttpClientConfig,
  RequestOptions,
} from './types/api';

export { ApiClientError } from './types/api';
