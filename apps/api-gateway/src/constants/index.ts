export const GATEWAY_SERVICE = 'api-gateway';

export const METRIC_HTTP_REQUESTS_TOTAL = 'medsphere_gateway_http_requests_total';
export const METRIC_HTTP_REQUEST_DURATION = 'medsphere_gateway_http_request_duration_ms';
export const METRIC_PROXY_ERRORS_TOTAL = 'medsphere_gateway_proxy_errors_total';
export const METRIC_RATE_LIMITED_TOTAL = 'medsphere_gateway_rate_limited_total';
export const METRIC_UPSTREAM_HEALTH = 'medsphere_gateway_upstream_health';

export const WS_EVENTS = {
  CONNECT: 'connection',
  DISCONNECT: 'disconnect',
  SUBSCRIBE: 'notifications:subscribe',
  UNSUBSCRIBE: 'notifications:unsubscribe',
  MESSAGE: 'notifications:message',
  ERROR: 'notifications:error',
  PING: 'notifications:ping',
  PONG: 'notifications:pong',
} as const;

export const PROXY_STRIP_HEADERS = [
  'content-length',
  'accept-encoding',
] as const;
