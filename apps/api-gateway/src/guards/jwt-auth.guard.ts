/**
 * Gateway JWT authentication guard — delegates to @medsphere/auth-sdk.
 *
 * The auth-sdk JwtAuthGuard validates bearer tokens, respects @Public(),
 * and attaches the decoded JwtAccessPayload to request.user.
 */
export {
  JwtAuthGuard,
  type AuthenticatedRequest,
} from '@medsphere/auth-sdk';
