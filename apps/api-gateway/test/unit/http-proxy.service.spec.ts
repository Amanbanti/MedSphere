import {
  CORRELATION_ID_HEADER,
  FACILITY_ID_HEADER,
  ORGANIZATION_ID_HEADER,
  REQUEST_ID_HEADER,
} from '@medsphere/shared';
import { HttpProxyService } from '../../src/proxy/http-proxy.service';
import type { GatewayConfig } from '../../src/config/gateway.config';

describe('HttpProxyService', () => {
  const gatewayConfig: GatewayConfig = {
    port: 4000,
    host: '0.0.0.0',
    serviceName: 'api-gateway',
    version: '0.1.0',
    jwtSecret: 'test-secret-key-with-at-least-32-characters',
    requestTimeoutMs: 5_000,
    proxyMaxBodyBytes: 1_048_576,
    cors: {
      enabled: true,
      origins: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Authorization'],
      exposedHeaders: [],
      credentials: true,
      maxAgeSeconds: 3600,
    },
    rateLimit: {
      windowMs: 60_000,
      maxRequests: 120,
      authMaxRequests: 20,
      cleanupIntervalMs: 60_000,
    },
    upstreams: {
      auth: {
        baseUrl: 'http://127.0.0.1:4100',
        timeoutMs: 5_000,
        requiresAuth: false,
        healthPath: '/api/v1/health/live',
      },
      patient: {
        baseUrl: 'http://127.0.0.1:4101',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      doctor: {
        baseUrl: 'http://127.0.0.1:4102',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      appointment: {
        baseUrl: 'http://127.0.0.1:4103',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      'medical-record': {
        baseUrl: 'http://127.0.0.1:4104',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      pharmacy: {
        baseUrl: 'http://127.0.0.1:4105',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      laboratory: {
        baseUrl: 'http://127.0.0.1:4106',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      radiology: {
        baseUrl: 'http://127.0.0.1:4107',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      billing: {
        baseUrl: 'http://127.0.0.1:4108',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      insurance: {
        baseUrl: 'http://127.0.0.1:4109',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      notification: {
        baseUrl: 'http://127.0.0.1:4110',
        timeoutMs: 5_000,
        requiresAuth: false,
        healthPath: '/health/live',
      },
      search: {
        baseUrl: 'http://127.0.0.1:4111',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      analytics: {
        baseUrl: 'http://127.0.0.1:4112',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      'video-consultation': {
        baseUrl: 'http://127.0.0.1:4113',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
      'diagnosis-ai': {
        baseUrl: 'http://127.0.0.1:4200',
        timeoutMs: 5_000,
        requiresAuth: true,
        healthPath: '/health/live',
      },
    },
    websocket: {
      path: '/ws/notifications',
      corsOrigins: ['http://localhost:3000'],
    },
    graphql: {
      path: '/graphql',
      playground: false,
    },
    grpc: {
      enabled: false,
      defaultDeadlineMs: 10_000,
    },
  };

  const configService = {
    get: jest.fn().mockReturnValue(gatewayConfig),
  };

  let service: HttpProxyService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    service = new HttpProxyService(configService as never);
    (service as unknown as { fetchImpl: typeof fetch }).fetchImpl = fetchMock;
  });

  describe('buildForwardHeaders', () => {
    it('forwards correlation, auth, org, and facility headers', () => {
      const headers = service.buildForwardHeaders(
        {
          'content-type': 'application/json',
          'accept-encoding': 'gzip',
          host: 'localhost:4000',
        },
        {
          correlationId: 'corr-123',
          requestId: 'req-456',
          authorization: 'Bearer access-token',
          organizationId: 'org-789',
          facilityId: 'facility-001',
          userId: 'user-abc',
          clientIp: '203.0.113.10',
        },
      );

      expect(headers[CORRELATION_ID_HEADER]).toBe('corr-123');
      expect(headers[REQUEST_ID_HEADER]).toBe('req-456');
      expect(headers.authorization).toBe('Bearer access-token');
      expect(headers[ORGANIZATION_ID_HEADER]).toBe('org-789');
      expect(headers[FACILITY_ID_HEADER]).toBe('facility-001');
      expect(headers['x-user-id']).toBe('user-abc');
      expect(headers['x-forwarded-for']).toBe('203.0.113.10');
      expect(headers.host).toBeUndefined();
      expect(headers['accept-encoding']).toBeUndefined();
      expect(headers['content-type']).toBe('application/json');
    });

    it('inherits org and facility from incoming request headers when context omits them', () => {
      const headers = service.buildForwardHeaders(
        {
          [ORGANIZATION_ID_HEADER]: 'incoming-org',
          [FACILITY_ID_HEADER]: 'incoming-facility',
          authorization: 'Bearer inherited-token',
        },
        {
          correlationId: 'corr-inherit',
          requestId: 'req-inherit',
        },
      );

      expect(headers[ORGANIZATION_ID_HEADER]).toBe('incoming-org');
      expect(headers[FACILITY_ID_HEADER]).toBe('incoming-facility');
      expect(headers.authorization).toBe('Bearer inherited-token');
    });
  });

  describe('forward', () => {
    it('proxies request to upstream and returns response payload', async () => {
      fetchMock.mockResolvedValue({
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        arrayBuffer: async () =>
          Buffer.from(JSON.stringify({ ok: true }), 'utf8'),
      });

      const result = await service.forward({
        serviceName: 'patient',
        upstreamPath: '/api/v1/patients/123',
        method: 'GET',
        headers: {},
        correlationId: 'corr-proxy',
        requestId: 'req-proxy',
        organizationId: 'org-proxy',
        facilityId: 'fac-proxy',
      });

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toBe('http://127.0.0.1:4101/api/v1/patients/123');
      expect(init.method).toBe('GET');
      expect(init.headers).toMatchObject({
        [CORRELATION_ID_HEADER]: 'corr-proxy',
        [REQUEST_ID_HEADER]: 'req-proxy',
        [ORGANIZATION_ID_HEADER]: 'org-proxy',
        [FACILITY_ID_HEADER]: 'fac-proxy',
      });
      expect(result.statusCode).toBe(200);
      expect(result.serviceName).toBe('patient');
      expect(JSON.parse(String(result.body))).toEqual({ ok: true });
    });

    it('throws service unavailable when upstream fetch fails', async () => {
      fetchMock.mockRejectedValue(new Error('connection refused'));

      await expect(
        service.forward({
          serviceName: 'auth',
          upstreamPath: '/api/v1/auth/login',
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email: 'a@b.com', password: 'secret' }),
          correlationId: 'corr-fail',
          requestId: 'req-fail',
        }),
      ).rejects.toMatchObject({
        name: 'ServiceUnavailableException',
      });
    });
  });

  describe('getRegistry', () => {
    it('resolves patient routes to the patient upstream', () => {
      const match = service.getRegistry().resolveRoute('patients/123/encounters');
      expect(match).not.toBeNull();
      expect(match?.serviceName).toBe('patient');
      expect(match?.upstreamPath).toBe('/api/v1/patients/123/encounters');
      expect(match?.requiresAuth).toBe(true);
    });

    it('resolves auth routes separately via resolveAuthRoute', () => {
      const match = service.getRegistry().resolveAuthRoute('login');
      expect(match.serviceName).toBe('auth');
      expect(match.upstreamPath).toBe('/api/v1/auth/login');
      expect(match.requiresAuth).toBe(false);
    });
  });
});
