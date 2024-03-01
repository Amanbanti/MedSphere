import type { GatewayConfig } from '../config/gateway.config';
import type { RouteMatch, ServiceNameRef } from '../types/request.types';

export type ServiceName = ServiceNameRef;

export interface ServiceRouteDefinition {
  /** Public gateway path segment after /api/v1 (e.g. "patients") */
  gatewayPrefix: string;
  /** Upstream path prefix appended to service base (defaults to /api/v1/{gatewayPrefix}) */
  upstreamPrefix?: string;
  requiresAuth?: boolean;
  description: string;
  methods?: readonly string[];
}

export interface ServiceDefinition {
  name: ServiceName;
  routes: ServiceRouteDefinition[];
  timeoutMs?: number;
}

const API_V1 = '/api/v1';

export const SERVICE_DEFINITIONS: ServiceDefinition[] = [
  {
    name: 'auth',
    routes: [
      {
        gatewayPrefix: 'auth',
        upstreamPrefix: `${API_V1}/auth`,
        requiresAuth: false,
        description: 'Authentication, sessions, MFA, and API keys',
      },
    ],
  },
  {
    name: 'patient',
    routes: [
      {
        gatewayPrefix: 'patients',
        description: 'Patient demographics, registration, and portal access',
      },
      {
        gatewayPrefix: 'patient-portal',
        description: 'Patient self-service portal endpoints',
      },
    ],
  },
  {
    name: 'doctor',
    routes: [
      {
        gatewayPrefix: 'doctors',
        description: 'Physician profiles, schedules, and credentials',
      },
      {
        gatewayPrefix: 'physicians',
        upstreamPrefix: `${API_V1}/doctors`,
        description: 'Alias routes for physician resources',
      },
    ],
  },
  {
    name: 'appointment',
    routes: [
      {
        gatewayPrefix: 'appointments',
        description: 'Scheduling, check-in, and appointment lifecycle',
      },
      {
        gatewayPrefix: 'schedules',
        upstreamPrefix: `${API_V1}/appointments/schedules`,
        description: 'Provider schedule management',
      },
    ],
  },
  {
    name: 'medical-record',
    routes: [
      {
        gatewayPrefix: 'medical-records',
        description: 'EMR/EHR clinical documentation and encounters',
      },
      {
        gatewayPrefix: 'encounters',
        upstreamPrefix: `${API_V1}/medical-records/encounters`,
        description: 'Clinical encounter management',
      },
      {
        gatewayPrefix: 'clinical-notes',
        upstreamPrefix: `${API_V1}/medical-records/notes`,
        description: 'Structured clinical notes',
      },
    ],
  },
  {
    name: 'pharmacy',
    routes: [
      {
        gatewayPrefix: 'pharmacy',
        description: 'Prescriptions, dispensing, and formulary',
      },
      {
        gatewayPrefix: 'prescriptions',
        upstreamPrefix: `${API_V1}/pharmacy/prescriptions`,
        description: 'Prescription orders and fulfillment',
      },
    ],
  },
  {
    name: 'laboratory',
    routes: [
      {
        gatewayPrefix: 'laboratory',
        description: 'Lab orders, specimens, and results',
      },
      {
        gatewayPrefix: 'lab-orders',
        upstreamPrefix: `${API_V1}/laboratory/orders`,
        description: 'Laboratory order management',
      },
      {
        gatewayPrefix: 'lab-results',
        upstreamPrefix: `${API_V1}/laboratory/results`,
        description: 'Laboratory result delivery',
      },
    ],
  },
  {
    name: 'radiology',
    routes: [
      {
        gatewayPrefix: 'radiology',
        description: 'Imaging orders, studies, and DICOM metadata',
      },
      {
        gatewayPrefix: 'imaging',
        upstreamPrefix: `${API_V1}/radiology/imaging`,
        description: 'Radiology imaging workflows',
      },
    ],
  },
  {
    name: 'billing',
    routes: [
      {
        gatewayPrefix: 'billing',
        description: 'Invoices, payments, and revenue cycle',
      },
      {
        gatewayPrefix: 'invoices',
        upstreamPrefix: `${API_V1}/billing/invoices`,
        description: 'Invoice generation and retrieval',
      },
      {
        gatewayPrefix: 'payments',
        upstreamPrefix: `${API_V1}/billing/payments`,
        description: 'Payment capture and reconciliation',
      },
    ],
  },
  {
    name: 'insurance',
    routes: [
      {
        gatewayPrefix: 'insurance',
        description: 'Coverage verification and claims processing',
      },
      {
        gatewayPrefix: 'claims',
        upstreamPrefix: `${API_V1}/insurance/claims`,
        description: 'Insurance claim submission and status',
      },
    ],
  },
  {
    name: 'notification',
    routes: [
      {
        gatewayPrefix: 'notifications',
        requiresAuth: true,
        description: 'Multi-channel notification dispatch and preferences',
      },
    ],
  },
  {
    name: 'search',
    routes: [
      {
        gatewayPrefix: 'search',
        description: 'Full-text and faceted search across clinical entities',
      },
    ],
  },
  {
    name: 'analytics',
    routes: [
      {
        gatewayPrefix: 'analytics',
        description: 'Operational and clinical analytics dashboards',
      },
      {
        gatewayPrefix: 'reports',
        upstreamPrefix: `${API_V1}/analytics/reports`,
        description: 'Scheduled and ad-hoc reporting',
      },
    ],
  },
  {
    name: 'video-consultation',
    routes: [
      {
        gatewayPrefix: 'telemedicine',
        upstreamPrefix: `${API_V1}/video-consultation`,
        description: 'Telemedicine session lifecycle',
      },
      {
        gatewayPrefix: 'video-consultation',
        description: 'Video consultation rooms and tokens',
      },
    ],
  },
  {
    name: 'diagnosis-ai',
    routes: [
      {
        gatewayPrefix: 'diagnosis-ai',
        description: 'AI-assisted diagnostic suggestions and triage',
      },
      {
        gatewayPrefix: 'ai-triage',
        upstreamPrefix: `${API_V1}/diagnosis-ai/triage`,
        description: 'Automated patient triage assistance',
      },
    ],
  },
];

export interface CompiledRoute {
  serviceName: ServiceName;
  gatewayPrefix: string;
  prefixLength: number;
  upstreamPrefix: string;
  requiresAuth: boolean;
  description: string;
  methods?: readonly string[];
}

export class ServiceRegistry {
  private readonly routes: CompiledRoute[];
  private readonly upstreams: GatewayConfig['upstreams'];

  constructor(config: GatewayConfig) {
    this.upstreams = config.upstreams;
    this.routes = this.compileRoutes(config);
  }

  getServiceNames(): ServiceName[] {
    return Object.keys(this.upstreams) as ServiceName[];
  }

  getUpstreamBaseUrl(serviceName: ServiceName): string {
    const upstream = this.upstreams[serviceName];
    if (!upstream) {
      throw new Error(`Unknown upstream service: ${serviceName}`);
    }
    return upstream.baseUrl.replace(/\/$/, '');
  }

  getUpstreamConfig(serviceName: ServiceName) {
    const upstream = this.upstreams[serviceName];
    if (!upstream) {
      throw new Error(`Unknown upstream service: ${serviceName}`);
    }
    return upstream;
  }

  getTimeoutMs(serviceName: ServiceName): number {
    const definition = SERVICE_DEFINITIONS.find((s) => s.name === serviceName);
    const upstream = this.getUpstreamConfig(serviceName);
    return definition?.timeoutMs ?? upstream.timeoutMs;
  }

  resolveRoute(apiPath: string): RouteMatch | null {
    const normalized = normalizeApiPath(apiPath);
    if (!normalized) {
      return null;
    }

    for (const route of this.routes) {
      if (
        normalized === route.gatewayPrefix ||
        normalized.startsWith(`${route.gatewayPrefix}/`)
      ) {
        const remainder = normalized.slice(route.gatewayPrefix.length);
        const upstreamPath = joinPaths(route.upstreamPrefix, remainder);
        return {
          serviceName: route.serviceName,
          upstreamPath,
          requiresAuth: route.requiresAuth,
          isAuthRoute: route.serviceName === 'auth',
        };
      }
    }

    return null;
  }

  resolveAuthRoute(subPath: string): RouteMatch {
    const normalized = subPath.replace(/^\/+/, '');
    const upstreamPath = joinPaths(`${API_V1}/auth`, normalized);
    return {
      serviceName: 'auth',
      upstreamPath,
      requiresAuth: false,
      isAuthRoute: true,
    };
  }

  listRoutes(): CompiledRoute[] {
    return [...this.routes];
  }

  private compileRoutes(config: GatewayConfig): CompiledRoute[] {
    const compiled: CompiledRoute[] = [];

    for (const definition of SERVICE_DEFINITIONS) {
      const upstream = config.upstreams[definition.name];
      if (!upstream) {
        continue;
      }

      for (const route of definition.routes) {
        const upstreamPrefix =
          route.upstreamPrefix ?? `${API_V1}/${route.gatewayPrefix}`;
        const requiresAuth =
          route.requiresAuth ?? upstream.requiresAuth ?? true;

        compiled.push({
          serviceName: definition.name,
          gatewayPrefix: route.gatewayPrefix,
          prefixLength: route.gatewayPrefix.length,
          upstreamPrefix: upstreamPrefix.replace(/\/$/, ''),
          requiresAuth,
          description: route.description,
          methods: route.methods,
        });
      }
    }

    return compiled.sort((a, b) => b.prefixLength - a.prefixLength);
  }
}

export function normalizeApiPath(path: string): string {
  return path.replace(/^\/+/, '').replace(/\/+$/, '');
}

export function joinPaths(base: string, suffix: string): string {
  const cleanBase = base.replace(/\/+$/, '');
  const cleanSuffix = suffix.replace(/^\/+/, '');
  if (!cleanSuffix) {
    return cleanBase || '/';
  }
  return `${cleanBase}/${cleanSuffix}`;
}

export function buildUpstreamUrl(baseUrl: string, upstreamPath: string): string {
  const base = baseUrl.replace(/\/$/, '');
  const path = upstreamPath.startsWith('/') ? upstreamPath : `/${upstreamPath}`;
  return `${base}${path}`;
}

export function extractApiV1RelativePath(fullPath: string): string {
  const match = fullPath.match(/^\/?api\/v1\/?(.*)$/i);
  return match?.[1] ? normalizeApiPath(match[1]) : '';
}

export function createServiceRegistry(config: GatewayConfig): ServiceRegistry {
  return new ServiceRegistry(config);
}
