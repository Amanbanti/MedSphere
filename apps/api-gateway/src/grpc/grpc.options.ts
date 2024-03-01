import { join } from 'path';
import type { GatewayConfig } from '../config/gateway.config';
import type { ServiceName } from '../proxy/service-registry';

export interface GrpcServiceEndpoint {
  package: string;
  protoPath: string;
  url: string;
  deadlineMs: number;
}

export interface GrpcClientOptionsMap {
  enabled: boolean;
  defaultDeadlineMs: number;
  services: Record<ServiceName, GrpcServiceEndpoint | undefined>;
}

const PROTO_ROOT = join(process.cwd(), '..', '..', 'packages', 'sdk', 'protos');

export function buildGrpcClientOptions(
  config: GatewayConfig,
): GrpcClientOptionsMap {
  const host = process.env.GRPC_UPSTREAM_HOST ?? '127.0.0.1';

  const serviceEndpoint = (
    serviceName: ServiceName,
    portOffset: number,
    pkg: string,
    protoFile: string,
  ): GrpcServiceEndpoint => ({
    package: pkg,
    protoPath: join(PROTO_ROOT, protoFile),
    url: `${host}:${4100 + portOffset}`,
    deadlineMs: config.grpc.defaultDeadlineMs,
  });

  return {
    enabled: config.grpc.enabled,
    defaultDeadlineMs: config.grpc.defaultDeadlineMs,
    services: {
      auth: serviceEndpoint('auth', 0, 'medsphere.auth.v1', 'auth/v1/auth.proto'),
      patient: serviceEndpoint('patient', 1, 'medsphere.patient.v1', 'patient/v1/patient.proto'),
      doctor: serviceEndpoint('doctor', 2, 'medsphere.doctor.v1', 'doctor/v1/doctor.proto'),
      appointment: serviceEndpoint(
        'appointment',
        3,
        'medsphere.appointment.v1',
        'appointment/v1/appointment.proto',
      ),
      'medical-record': serviceEndpoint(
        'medical-record',
        4,
        'medsphere.medical_record.v1',
        'medical-record/v1/medical_record.proto',
      ),
      pharmacy: serviceEndpoint(
        'pharmacy',
        5,
        'medsphere.pharmacy.v1',
        'pharmacy/v1/pharmacy.proto',
      ),
      laboratory: serviceEndpoint(
        'laboratory',
        6,
        'medsphere.laboratory.v1',
        'laboratory/v1/laboratory.proto',
      ),
      radiology: serviceEndpoint(
        'radiology',
        7,
        'medsphere.radiology.v1',
        'radiology/v1/radiology.proto',
      ),
      billing: serviceEndpoint('billing', 8, 'medsphere.billing.v1', 'billing/v1/billing.proto'),
      insurance: serviceEndpoint(
        'insurance',
        9,
        'medsphere.insurance.v1',
        'insurance/v1/insurance.proto',
      ),
      notification: serviceEndpoint(
        'notification',
        10,
        'medsphere.notification.v1',
        'notification/v1/notification.proto',
      ),
      search: serviceEndpoint('search', 11, 'medsphere.search.v1', 'search/v1/search.proto'),
      analytics: serviceEndpoint(
        'analytics',
        12,
        'medsphere.analytics.v1',
        'analytics/v1/analytics.proto',
      ),
      'video-consultation': serviceEndpoint(
        'video-consultation',
        13,
        'medsphere.telemedicine.v1',
        'telemedicine/v1/session.proto',
      ),
      'diagnosis-ai': {
        package: 'medsphere.diagnosis_ai.v1',
        protoPath: join(PROTO_ROOT, 'diagnosis-ai/v1/diagnosis.proto'),
        url: `${host}:4200`,
        deadlineMs: config.grpc.defaultDeadlineMs,
      },
    },
  };
}

export function createNestGrpcClientOptions(
  config: GatewayConfig,
  serviceName: ServiceName,
): {
  transport: number;
  options: {
    package: string;
    protoPath: string;
    url: string;
    loader: {
      keepCase: boolean;
      longs: StringConstructor;
      enums: StringConstructor;
      defaults: boolean;
      oneofs: boolean;
    };
    channelOptions: Record<string, number>;
  };
} | null {
  const map = buildGrpcClientOptions(config);
  const endpoint = map.services[serviceName];
  if (!map.enabled || !endpoint) {
    return null;
  }

  return {
    transport: 4,
    options: {
      package: endpoint.package,
      protoPath: endpoint.protoPath,
      url: endpoint.url,
      loader: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
      channelOptions: {
        'grpc.max_receive_message_length': 10 * 1024 * 1024,
        'grpc.max_send_message_length': 10 * 1024 * 1024,
        'grpc.keepalive_time_ms': 30_000,
        'grpc.keepalive_timeout_ms': 10_000,
      },
    },
  };
}

export const GRPC_TRANSPORT = {
  TCP: 0,
  REDIS: 1,
  NATS: 2,
  MQTT: 3,
  GRPC: 4,
  RMQ: 5,
} as const;
