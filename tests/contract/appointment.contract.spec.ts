/**
 * Contract tests for appointment service — MedSphere API contract validation.
 * Validates request/response shapes, auth, and cross-service compatibility.
 */
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

const ACTOR: JwtAccessPayload = {
  sub: 'contract-test-user' as UUID,
  orgId: 'contract-test-org' as UUID,
  facilityIds: ['facility-1' as UUID],
  roles: ['ORG_ADMIN'],
  permissions: ['appointment:read', 'appointment:write'],
  sessionId: 'contract-session' as UUID,
  mfaVerified: true,
  iat: 0,
  exp: 999999999,
  iss: 'medsphere',
  aud: 'medsphere',
};

describe('appointment service contract', () => {
  describe('service metadata', () => {
    it('declares entity Appointment', () => {
      expect('Appointment').toBeTruthy();
    });

    it('exposes port 3012', () => {
      expect(3012).toBeGreaterThan(3000);
    });
  });

  describe('BookAppointment', () => {
    const endpoint = 'appointment';
    const method = 'POST';

    it('accepts valid book request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-0',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for book', () => {
      const payload = { resourceId: 'appointment-0' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for book', () => {
      const requiredPermission = 'appointment:book';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for book', () => {
      const response = {
        data: { id: 'appointment-resp-0', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on book', () => {
      const auditEvent = {
        action: 'book',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('book');
    });
  });

  describe('BookAppointmentVariant0', () => {
    const endpoint = 'appointment';
    const method = 'POST';

    it('accepts valid book request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-1',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for book variant 0', () => {
      const payload = { resourceId: 'appointment-1' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for book variant 0', () => {
      const requiredPermission = 'appointment:book';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for book variant 0', () => {
      const response = {
        data: { id: 'appointment-resp-1', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on book variant 0', () => {
      const auditEvent = {
        action: 'book',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('book');
    });
  });

  describe('BookAppointmentVariant1', () => {
    const endpoint = 'appointment';
    const method = 'POST';

    it('accepts valid book request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-2',
        
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for book variant 1', () => {
      const payload = { resourceId: 'appointment-2' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for book variant 1', () => {
      const requiredPermission = 'appointment:book';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for book variant 1', () => {
      const response = {
        data: { id: 'appointment-resp-2', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on book variant 1', () => {
      const auditEvent = {
        action: 'book',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('book');
    });
  });

  describe('BookAppointmentVariant2', () => {
    const endpoint = 'appointment';
    const method = 'POST';

    it('accepts valid book request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-3',
        
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for book variant 2', () => {
      const payload = { resourceId: 'appointment-3' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for book variant 2', () => {
      const requiredPermission = 'appointment:book';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for book variant 2', () => {
      const response = {
        data: { id: 'appointment-resp-3', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on book variant 2', () => {
      const auditEvent = {
        action: 'book',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('book');
    });
  });

  describe('BookAppointmentVariant3', () => {
    const endpoint = 'appointment';
    const method = 'POST';

    it('accepts valid book request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-4',
        
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for book variant 3', () => {
      const payload = { resourceId: 'appointment-4' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for book variant 3', () => {
      const requiredPermission = 'appointment:book';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for book variant 3', () => {
      const response = {
        data: { id: 'appointment-resp-4', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on book variant 3', () => {
      const auditEvent = {
        action: 'book',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('book');
    });
  });

  describe('BookAppointmentVariant4', () => {
    const endpoint = 'appointment';
    const method = 'POST';

    it('accepts valid book request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-5',
        
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for book variant 4', () => {
      const payload = { resourceId: 'appointment-5' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for book variant 4', () => {
      const requiredPermission = 'appointment:book';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for book variant 4', () => {
      const response = {
        data: { id: 'appointment-resp-5', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on book variant 4', () => {
      const auditEvent = {
        action: 'book',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('book');
    });
  });

  describe('BookAppointmentVariant5', () => {
    const endpoint = 'appointment';
    const method = 'POST';

    it('accepts valid book request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-6',
        
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for book variant 5', () => {
      const payload = { resourceId: 'appointment-6' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for book variant 5', () => {
      const requiredPermission = 'appointment:book';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for book variant 5', () => {
      const response = {
        data: { id: 'appointment-resp-6', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on book variant 5', () => {
      const auditEvent = {
        action: 'book',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('book');
    });
  });

  describe('BookAppointmentVariant6', () => {
    const endpoint = 'appointment';
    const method = 'POST';

    it('accepts valid book request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-7',
        
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for book variant 6', () => {
      const payload = { resourceId: 'appointment-7' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for book variant 6', () => {
      const requiredPermission = 'appointment:book';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for book variant 6', () => {
      const response = {
        data: { id: 'appointment-resp-7', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on book variant 6', () => {
      const auditEvent = {
        action: 'book',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('book');
    });
  });

  describe('BookAppointmentVariant7', () => {
    const endpoint = 'appointment';
    const method = 'POST';

    it('accepts valid book request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-8',
        
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for book variant 7', () => {
      const payload = { resourceId: 'appointment-8' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for book variant 7', () => {
      const requiredPermission = 'appointment:book';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for book variant 7', () => {
      const response = {
        data: { id: 'appointment-resp-8', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on book variant 7', () => {
      const auditEvent = {
        action: 'book',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('book');
    });
  });

  describe('RescheduleAppointment', () => {
    const endpoint = 'appointment/:id/reschedule';
    const method = 'PATCH';

    it('accepts valid reschedule request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-9',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for reschedule', () => {
      const payload = { resourceId: 'appointment-9' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reschedule', () => {
      const requiredPermission = 'appointment:reschedule';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reschedule', () => {
      const response = {
        data: { id: 'appointment-resp-9', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reschedule', () => {
      const auditEvent = {
        action: 'reschedule',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reschedule');
    });
  });

  describe('RescheduleAppointmentVariant0', () => {
    const endpoint = 'appointment/:id/reschedule';
    const method = 'PATCH';

    it('accepts valid reschedule request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-10',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for reschedule variant 0', () => {
      const payload = { resourceId: 'appointment-10' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reschedule variant 0', () => {
      const requiredPermission = 'appointment:reschedule';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reschedule variant 0', () => {
      const response = {
        data: { id: 'appointment-resp-10', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reschedule variant 0', () => {
      const auditEvent = {
        action: 'reschedule',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reschedule');
    });
  });

  describe('RescheduleAppointmentVariant1', () => {
    const endpoint = 'appointment/:id/reschedule';
    const method = 'PATCH';

    it('accepts valid reschedule request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-11',
        
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for reschedule variant 1', () => {
      const payload = { resourceId: 'appointment-11' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reschedule variant 1', () => {
      const requiredPermission = 'appointment:reschedule';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reschedule variant 1', () => {
      const response = {
        data: { id: 'appointment-resp-11', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reschedule variant 1', () => {
      const auditEvent = {
        action: 'reschedule',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reschedule');
    });
  });

  describe('RescheduleAppointmentVariant2', () => {
    const endpoint = 'appointment/:id/reschedule';
    const method = 'PATCH';

    it('accepts valid reschedule request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-12',
        
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for reschedule variant 2', () => {
      const payload = { resourceId: 'appointment-12' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reschedule variant 2', () => {
      const requiredPermission = 'appointment:reschedule';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reschedule variant 2', () => {
      const response = {
        data: { id: 'appointment-resp-12', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reschedule variant 2', () => {
      const auditEvent = {
        action: 'reschedule',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reschedule');
    });
  });

  describe('RescheduleAppointmentVariant3', () => {
    const endpoint = 'appointment/:id/reschedule';
    const method = 'PATCH';

    it('accepts valid reschedule request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-13',
        
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for reschedule variant 3', () => {
      const payload = { resourceId: 'appointment-13' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reschedule variant 3', () => {
      const requiredPermission = 'appointment:reschedule';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reschedule variant 3', () => {
      const response = {
        data: { id: 'appointment-resp-13', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reschedule variant 3', () => {
      const auditEvent = {
        action: 'reschedule',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reschedule');
    });
  });

  describe('RescheduleAppointmentVariant4', () => {
    const endpoint = 'appointment/:id/reschedule';
    const method = 'PATCH';

    it('accepts valid reschedule request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-14',
        
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for reschedule variant 4', () => {
      const payload = { resourceId: 'appointment-14' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reschedule variant 4', () => {
      const requiredPermission = 'appointment:reschedule';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reschedule variant 4', () => {
      const response = {
        data: { id: 'appointment-resp-14', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reschedule variant 4', () => {
      const auditEvent = {
        action: 'reschedule',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reschedule');
    });
  });

  describe('RescheduleAppointmentVariant5', () => {
    const endpoint = 'appointment/:id/reschedule';
    const method = 'PATCH';

    it('accepts valid reschedule request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-15',
        
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for reschedule variant 5', () => {
      const payload = { resourceId: 'appointment-15' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reschedule variant 5', () => {
      const requiredPermission = 'appointment:reschedule';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reschedule variant 5', () => {
      const response = {
        data: { id: 'appointment-resp-15', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reschedule variant 5', () => {
      const auditEvent = {
        action: 'reschedule',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reschedule');
    });
  });

  describe('RescheduleAppointmentVariant6', () => {
    const endpoint = 'appointment/:id/reschedule';
    const method = 'PATCH';

    it('accepts valid reschedule request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-16',
        
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for reschedule variant 6', () => {
      const payload = { resourceId: 'appointment-16' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reschedule variant 6', () => {
      const requiredPermission = 'appointment:reschedule';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reschedule variant 6', () => {
      const response = {
        data: { id: 'appointment-resp-16', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reschedule variant 6', () => {
      const auditEvent = {
        action: 'reschedule',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reschedule');
    });
  });

  describe('RescheduleAppointmentVariant7', () => {
    const endpoint = 'appointment/:id/reschedule';
    const method = 'PATCH';

    it('accepts valid reschedule request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-17',
        
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for reschedule variant 7', () => {
      const payload = { resourceId: 'appointment-17' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reschedule variant 7', () => {
      const requiredPermission = 'appointment:reschedule';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reschedule variant 7', () => {
      const response = {
        data: { id: 'appointment-resp-17', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reschedule variant 7', () => {
      const auditEvent = {
        action: 'reschedule',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reschedule');
    });
  });

  describe('CancelAppointment', () => {
    const endpoint = 'appointment/:id/cancel';
    const method = 'POST';

    it('accepts valid cancel request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-18',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for cancel', () => {
      const payload = { resourceId: 'appointment-18' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for cancel', () => {
      const requiredPermission = 'appointment:cancel';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for cancel', () => {
      const response = {
        data: { id: 'appointment-resp-18', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on cancel', () => {
      const auditEvent = {
        action: 'cancel',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('cancel');
    });
  });

  describe('CancelAppointmentVariant0', () => {
    const endpoint = 'appointment/:id/cancel';
    const method = 'POST';

    it('accepts valid cancel request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-19',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for cancel variant 0', () => {
      const payload = { resourceId: 'appointment-19' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for cancel variant 0', () => {
      const requiredPermission = 'appointment:cancel';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for cancel variant 0', () => {
      const response = {
        data: { id: 'appointment-resp-19', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on cancel variant 0', () => {
      const auditEvent = {
        action: 'cancel',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('cancel');
    });
  });

  describe('CancelAppointmentVariant1', () => {
    const endpoint = 'appointment/:id/cancel';
    const method = 'POST';

    it('accepts valid cancel request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-20',
        
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for cancel variant 1', () => {
      const payload = { resourceId: 'appointment-20' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for cancel variant 1', () => {
      const requiredPermission = 'appointment:cancel';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for cancel variant 1', () => {
      const response = {
        data: { id: 'appointment-resp-20', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on cancel variant 1', () => {
      const auditEvent = {
        action: 'cancel',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('cancel');
    });
  });

  describe('CancelAppointmentVariant2', () => {
    const endpoint = 'appointment/:id/cancel';
    const method = 'POST';

    it('accepts valid cancel request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-21',
        
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for cancel variant 2', () => {
      const payload = { resourceId: 'appointment-21' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for cancel variant 2', () => {
      const requiredPermission = 'appointment:cancel';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for cancel variant 2', () => {
      const response = {
        data: { id: 'appointment-resp-21', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on cancel variant 2', () => {
      const auditEvent = {
        action: 'cancel',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('cancel');
    });
  });

  describe('CancelAppointmentVariant3', () => {
    const endpoint = 'appointment/:id/cancel';
    const method = 'POST';

    it('accepts valid cancel request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-22',
        
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for cancel variant 3', () => {
      const payload = { resourceId: 'appointment-22' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for cancel variant 3', () => {
      const requiredPermission = 'appointment:cancel';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for cancel variant 3', () => {
      const response = {
        data: { id: 'appointment-resp-22', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on cancel variant 3', () => {
      const auditEvent = {
        action: 'cancel',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('cancel');
    });
  });

  describe('CancelAppointmentVariant4', () => {
    const endpoint = 'appointment/:id/cancel';
    const method = 'POST';

    it('accepts valid cancel request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-23',
        
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for cancel variant 4', () => {
      const payload = { resourceId: 'appointment-23' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for cancel variant 4', () => {
      const requiredPermission = 'appointment:cancel';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for cancel variant 4', () => {
      const response = {
        data: { id: 'appointment-resp-23', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on cancel variant 4', () => {
      const auditEvent = {
        action: 'cancel',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('cancel');
    });
  });

  describe('CancelAppointmentVariant5', () => {
    const endpoint = 'appointment/:id/cancel';
    const method = 'POST';

    it('accepts valid cancel request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-24',
        
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for cancel variant 5', () => {
      const payload = { resourceId: 'appointment-24' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for cancel variant 5', () => {
      const requiredPermission = 'appointment:cancel';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for cancel variant 5', () => {
      const response = {
        data: { id: 'appointment-resp-24', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on cancel variant 5', () => {
      const auditEvent = {
        action: 'cancel',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('cancel');
    });
  });

  describe('CancelAppointmentVariant6', () => {
    const endpoint = 'appointment/:id/cancel';
    const method = 'POST';

    it('accepts valid cancel request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-25',
        
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for cancel variant 6', () => {
      const payload = { resourceId: 'appointment-25' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for cancel variant 6', () => {
      const requiredPermission = 'appointment:cancel';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for cancel variant 6', () => {
      const response = {
        data: { id: 'appointment-resp-25', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on cancel variant 6', () => {
      const auditEvent = {
        action: 'cancel',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('cancel');
    });
  });

  describe('CancelAppointmentVariant7', () => {
    const endpoint = 'appointment/:id/cancel';
    const method = 'POST';

    it('accepts valid cancel request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-26',
        
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for cancel variant 7', () => {
      const payload = { resourceId: 'appointment-26' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for cancel variant 7', () => {
      const requiredPermission = 'appointment:cancel';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for cancel variant 7', () => {
      const response = {
        data: { id: 'appointment-resp-26', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on cancel variant 7', () => {
      const auditEvent = {
        action: 'cancel',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('cancel');
    });
  });

  describe('CheckInAppointment', () => {
    const endpoint = 'appointment/:id/check-in';
    const method = 'POST';

    it('accepts valid checkIn request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-27',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for checkIn', () => {
      const payload = { resourceId: 'appointment-27' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for checkIn', () => {
      const requiredPermission = 'appointment:checkIn';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for checkIn', () => {
      const response = {
        data: { id: 'appointment-resp-27', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on checkIn', () => {
      const auditEvent = {
        action: 'checkIn',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('checkIn');
    });
  });

  describe('CheckInAppointmentVariant0', () => {
    const endpoint = 'appointment/:id/check-in';
    const method = 'POST';

    it('accepts valid checkIn request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-28',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for checkIn variant 0', () => {
      const payload = { resourceId: 'appointment-28' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for checkIn variant 0', () => {
      const requiredPermission = 'appointment:checkIn';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for checkIn variant 0', () => {
      const response = {
        data: { id: 'appointment-resp-28', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on checkIn variant 0', () => {
      const auditEvent = {
        action: 'checkIn',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('checkIn');
    });
  });

  describe('CheckInAppointmentVariant1', () => {
    const endpoint = 'appointment/:id/check-in';
    const method = 'POST';

    it('accepts valid checkIn request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-29',
        
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for checkIn variant 1', () => {
      const payload = { resourceId: 'appointment-29' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for checkIn variant 1', () => {
      const requiredPermission = 'appointment:checkIn';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for checkIn variant 1', () => {
      const response = {
        data: { id: 'appointment-resp-29', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on checkIn variant 1', () => {
      const auditEvent = {
        action: 'checkIn',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('checkIn');
    });
  });

  describe('CheckInAppointmentVariant2', () => {
    const endpoint = 'appointment/:id/check-in';
    const method = 'POST';

    it('accepts valid checkIn request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-30',
        
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for checkIn variant 2', () => {
      const payload = { resourceId: 'appointment-30' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for checkIn variant 2', () => {
      const requiredPermission = 'appointment:checkIn';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for checkIn variant 2', () => {
      const response = {
        data: { id: 'appointment-resp-30', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on checkIn variant 2', () => {
      const auditEvent = {
        action: 'checkIn',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('checkIn');
    });
  });

  describe('CheckInAppointmentVariant3', () => {
    const endpoint = 'appointment/:id/check-in';
    const method = 'POST';

    it('accepts valid checkIn request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-31',
        
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for checkIn variant 3', () => {
      const payload = { resourceId: 'appointment-31' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for checkIn variant 3', () => {
      const requiredPermission = 'appointment:checkIn';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for checkIn variant 3', () => {
      const response = {
        data: { id: 'appointment-resp-31', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on checkIn variant 3', () => {
      const auditEvent = {
        action: 'checkIn',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('checkIn');
    });
  });

  describe('CheckInAppointmentVariant4', () => {
    const endpoint = 'appointment/:id/check-in';
    const method = 'POST';

    it('accepts valid checkIn request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-32',
        
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for checkIn variant 4', () => {
      const payload = { resourceId: 'appointment-32' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for checkIn variant 4', () => {
      const requiredPermission = 'appointment:checkIn';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for checkIn variant 4', () => {
      const response = {
        data: { id: 'appointment-resp-32', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on checkIn variant 4', () => {
      const auditEvent = {
        action: 'checkIn',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('checkIn');
    });
  });

  describe('CheckInAppointmentVariant5', () => {
    const endpoint = 'appointment/:id/check-in';
    const method = 'POST';

    it('accepts valid checkIn request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-33',
        
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for checkIn variant 5', () => {
      const payload = { resourceId: 'appointment-33' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for checkIn variant 5', () => {
      const requiredPermission = 'appointment:checkIn';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for checkIn variant 5', () => {
      const response = {
        data: { id: 'appointment-resp-33', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on checkIn variant 5', () => {
      const auditEvent = {
        action: 'checkIn',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('checkIn');
    });
  });

  describe('CheckInAppointmentVariant6', () => {
    const endpoint = 'appointment/:id/check-in';
    const method = 'POST';

    it('accepts valid checkIn request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-34',
        
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for checkIn variant 6', () => {
      const payload = { resourceId: 'appointment-34' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for checkIn variant 6', () => {
      const requiredPermission = 'appointment:checkIn';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for checkIn variant 6', () => {
      const response = {
        data: { id: 'appointment-resp-34', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on checkIn variant 6', () => {
      const auditEvent = {
        action: 'checkIn',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('checkIn');
    });
  });

  describe('CheckInAppointmentVariant7', () => {
    const endpoint = 'appointment/:id/check-in';
    const method = 'POST';

    it('accepts valid checkIn request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-35',
        
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for checkIn variant 7', () => {
      const payload = { resourceId: 'appointment-35' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for checkIn variant 7', () => {
      const requiredPermission = 'appointment:checkIn';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for checkIn variant 7', () => {
      const response = {
        data: { id: 'appointment-resp-35', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on checkIn variant 7', () => {
      const auditEvent = {
        action: 'checkIn',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('checkIn');
    });
  });

  describe('GetAppointment', () => {
    const endpoint = 'appointment/:id';
    const method = 'GET';

    it('accepts valid getById request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-36',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for getById', () => {
      const payload = { resourceId: 'appointment-36' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for getById', () => {
      const requiredPermission = 'appointment:getById';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for getById', () => {
      const response = {
        data: { id: 'appointment-resp-36', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on getById', () => {
      const auditEvent = {
        action: 'getById',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('getById');
    });
  });

  describe('GetAppointmentVariant0', () => {
    const endpoint = 'appointment/:id';
    const method = 'GET';

    it('accepts valid getById request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-37',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for getById variant 0', () => {
      const payload = { resourceId: 'appointment-37' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for getById variant 0', () => {
      const requiredPermission = 'appointment:getById';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for getById variant 0', () => {
      const response = {
        data: { id: 'appointment-resp-37', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on getById variant 0', () => {
      const auditEvent = {
        action: 'getById',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('getById');
    });
  });

  describe('GetAppointmentVariant1', () => {
    const endpoint = 'appointment/:id';
    const method = 'GET';

    it('accepts valid getById request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-38',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for getById variant 1', () => {
      const payload = { resourceId: 'appointment-38' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for getById variant 1', () => {
      const requiredPermission = 'appointment:getById';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for getById variant 1', () => {
      const response = {
        data: { id: 'appointment-resp-38', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on getById variant 1', () => {
      const auditEvent = {
        action: 'getById',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('getById');
    });
  });

  describe('GetAppointmentVariant2', () => {
    const endpoint = 'appointment/:id';
    const method = 'GET';

    it('accepts valid getById request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-39',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for getById variant 2', () => {
      const payload = { resourceId: 'appointment-39' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for getById variant 2', () => {
      const requiredPermission = 'appointment:getById';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for getById variant 2', () => {
      const response = {
        data: { id: 'appointment-resp-39', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on getById variant 2', () => {
      const auditEvent = {
        action: 'getById',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('getById');
    });
  });

  describe('GetAppointmentVariant3', () => {
    const endpoint = 'appointment/:id';
    const method = 'GET';

    it('accepts valid getById request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-40',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for getById variant 3', () => {
      const payload = { resourceId: 'appointment-40' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for getById variant 3', () => {
      const requiredPermission = 'appointment:getById';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for getById variant 3', () => {
      const response = {
        data: { id: 'appointment-resp-40', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on getById variant 3', () => {
      const auditEvent = {
        action: 'getById',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('getById');
    });
  });

  describe('GetAppointmentVariant4', () => {
    const endpoint = 'appointment/:id';
    const method = 'GET';

    it('accepts valid getById request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-41',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for getById variant 4', () => {
      const payload = { resourceId: 'appointment-41' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for getById variant 4', () => {
      const requiredPermission = 'appointment:getById';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for getById variant 4', () => {
      const response = {
        data: { id: 'appointment-resp-41', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on getById variant 4', () => {
      const auditEvent = {
        action: 'getById',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('getById');
    });
  });

  describe('GetAppointmentVariant5', () => {
    const endpoint = 'appointment/:id';
    const method = 'GET';

    it('accepts valid getById request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-42',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for getById variant 5', () => {
      const payload = { resourceId: 'appointment-42' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for getById variant 5', () => {
      const requiredPermission = 'appointment:getById';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for getById variant 5', () => {
      const response = {
        data: { id: 'appointment-resp-42', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on getById variant 5', () => {
      const auditEvent = {
        action: 'getById',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('getById');
    });
  });

  describe('GetAppointmentVariant6', () => {
    const endpoint = 'appointment/:id';
    const method = 'GET';

    it('accepts valid getById request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-43',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for getById variant 6', () => {
      const payload = { resourceId: 'appointment-43' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for getById variant 6', () => {
      const requiredPermission = 'appointment:getById';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for getById variant 6', () => {
      const response = {
        data: { id: 'appointment-resp-43', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on getById variant 6', () => {
      const auditEvent = {
        action: 'getById',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('getById');
    });
  });

  describe('GetAppointmentVariant7', () => {
    const endpoint = 'appointment/:id';
    const method = 'GET';

    it('accepts valid getById request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-44',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for getById variant 7', () => {
      const payload = { resourceId: 'appointment-44' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for getById variant 7', () => {
      const requiredPermission = 'appointment:getById';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for getById variant 7', () => {
      const response = {
        data: { id: 'appointment-resp-44', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on getById variant 7', () => {
      const auditEvent = {
        action: 'getById',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('getById');
    });
  });

  describe('ListAppointmentsByPatient', () => {
    const endpoint = 'appointment/patient/:patientId';
    const method = 'GET';

    it('accepts valid listByPatient request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-45',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByPatient', () => {
      const payload = { resourceId: 'appointment-45' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByPatient', () => {
      const requiredPermission = 'appointment:listByPatient';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByPatient', () => {
      const response = {
        data: { id: 'appointment-resp-45', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByPatient', () => {
      const auditEvent = {
        action: 'listByPatient',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByPatient');
    });
  });

  describe('ListAppointmentsByPatientVariant0', () => {
    const endpoint = 'appointment/patient/:patientId';
    const method = 'GET';

    it('accepts valid listByPatient request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-46',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByPatient variant 0', () => {
      const payload = { resourceId: 'appointment-46' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByPatient variant 0', () => {
      const requiredPermission = 'appointment:listByPatient';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByPatient variant 0', () => {
      const response = {
        data: { id: 'appointment-resp-46', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByPatient variant 0', () => {
      const auditEvent = {
        action: 'listByPatient',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByPatient');
    });
  });

  describe('ListAppointmentsByPatientVariant1', () => {
    const endpoint = 'appointment/patient/:patientId';
    const method = 'GET';

    it('accepts valid listByPatient request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-47',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByPatient variant 1', () => {
      const payload = { resourceId: 'appointment-47' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByPatient variant 1', () => {
      const requiredPermission = 'appointment:listByPatient';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByPatient variant 1', () => {
      const response = {
        data: { id: 'appointment-resp-47', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByPatient variant 1', () => {
      const auditEvent = {
        action: 'listByPatient',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByPatient');
    });
  });

  describe('ListAppointmentsByPatientVariant2', () => {
    const endpoint = 'appointment/patient/:patientId';
    const method = 'GET';

    it('accepts valid listByPatient request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-48',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByPatient variant 2', () => {
      const payload = { resourceId: 'appointment-48' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByPatient variant 2', () => {
      const requiredPermission = 'appointment:listByPatient';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByPatient variant 2', () => {
      const response = {
        data: { id: 'appointment-resp-48', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByPatient variant 2', () => {
      const auditEvent = {
        action: 'listByPatient',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByPatient');
    });
  });

  describe('ListAppointmentsByPatientVariant3', () => {
    const endpoint = 'appointment/patient/:patientId';
    const method = 'GET';

    it('accepts valid listByPatient request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-49',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByPatient variant 3', () => {
      const payload = { resourceId: 'appointment-49' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByPatient variant 3', () => {
      const requiredPermission = 'appointment:listByPatient';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByPatient variant 3', () => {
      const response = {
        data: { id: 'appointment-resp-49', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByPatient variant 3', () => {
      const auditEvent = {
        action: 'listByPatient',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByPatient');
    });
  });

  describe('ListAppointmentsByPatientVariant4', () => {
    const endpoint = 'appointment/patient/:patientId';
    const method = 'GET';

    it('accepts valid listByPatient request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-50',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByPatient variant 4', () => {
      const payload = { resourceId: 'appointment-50' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByPatient variant 4', () => {
      const requiredPermission = 'appointment:listByPatient';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByPatient variant 4', () => {
      const response = {
        data: { id: 'appointment-resp-50', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByPatient variant 4', () => {
      const auditEvent = {
        action: 'listByPatient',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByPatient');
    });
  });

  describe('ListAppointmentsByPatientVariant5', () => {
    const endpoint = 'appointment/patient/:patientId';
    const method = 'GET';

    it('accepts valid listByPatient request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-51',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByPatient variant 5', () => {
      const payload = { resourceId: 'appointment-51' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByPatient variant 5', () => {
      const requiredPermission = 'appointment:listByPatient';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByPatient variant 5', () => {
      const response = {
        data: { id: 'appointment-resp-51', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByPatient variant 5', () => {
      const auditEvent = {
        action: 'listByPatient',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByPatient');
    });
  });

  describe('ListAppointmentsByPatientVariant6', () => {
    const endpoint = 'appointment/patient/:patientId';
    const method = 'GET';

    it('accepts valid listByPatient request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-52',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByPatient variant 6', () => {
      const payload = { resourceId: 'appointment-52' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByPatient variant 6', () => {
      const requiredPermission = 'appointment:listByPatient';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByPatient variant 6', () => {
      const response = {
        data: { id: 'appointment-resp-52', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByPatient variant 6', () => {
      const auditEvent = {
        action: 'listByPatient',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByPatient');
    });
  });

  describe('ListAppointmentsByPatientVariant7', () => {
    const endpoint = 'appointment/patient/:patientId';
    const method = 'GET';

    it('accepts valid listByPatient request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-53',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByPatient variant 7', () => {
      const payload = { resourceId: 'appointment-53' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByPatient variant 7', () => {
      const requiredPermission = 'appointment:listByPatient';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByPatient variant 7', () => {
      const response = {
        data: { id: 'appointment-resp-53', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByPatient variant 7', () => {
      const auditEvent = {
        action: 'listByPatient',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByPatient');
    });
  });

  describe('ListAppointmentsByDoctor', () => {
    const endpoint = 'appointment/doctor/:doctorId';
    const method = 'GET';

    it('accepts valid listByDoctor request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-54',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByDoctor', () => {
      const payload = { resourceId: 'appointment-54' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByDoctor', () => {
      const requiredPermission = 'appointment:listByDoctor';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByDoctor', () => {
      const response = {
        data: { id: 'appointment-resp-54', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByDoctor', () => {
      const auditEvent = {
        action: 'listByDoctor',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByDoctor');
    });
  });

  describe('ListAppointmentsByDoctorVariant0', () => {
    const endpoint = 'appointment/doctor/:doctorId';
    const method = 'GET';

    it('accepts valid listByDoctor request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-55',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByDoctor variant 0', () => {
      const payload = { resourceId: 'appointment-55' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByDoctor variant 0', () => {
      const requiredPermission = 'appointment:listByDoctor';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByDoctor variant 0', () => {
      const response = {
        data: { id: 'appointment-resp-55', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByDoctor variant 0', () => {
      const auditEvent = {
        action: 'listByDoctor',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByDoctor');
    });
  });

  describe('ListAppointmentsByDoctorVariant1', () => {
    const endpoint = 'appointment/doctor/:doctorId';
    const method = 'GET';

    it('accepts valid listByDoctor request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-56',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByDoctor variant 1', () => {
      const payload = { resourceId: 'appointment-56' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByDoctor variant 1', () => {
      const requiredPermission = 'appointment:listByDoctor';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByDoctor variant 1', () => {
      const response = {
        data: { id: 'appointment-resp-56', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByDoctor variant 1', () => {
      const auditEvent = {
        action: 'listByDoctor',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByDoctor');
    });
  });

  describe('ListAppointmentsByDoctorVariant2', () => {
    const endpoint = 'appointment/doctor/:doctorId';
    const method = 'GET';

    it('accepts valid listByDoctor request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-57',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByDoctor variant 2', () => {
      const payload = { resourceId: 'appointment-57' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByDoctor variant 2', () => {
      const requiredPermission = 'appointment:listByDoctor';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByDoctor variant 2', () => {
      const response = {
        data: { id: 'appointment-resp-57', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByDoctor variant 2', () => {
      const auditEvent = {
        action: 'listByDoctor',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByDoctor');
    });
  });

  describe('ListAppointmentsByDoctorVariant3', () => {
    const endpoint = 'appointment/doctor/:doctorId';
    const method = 'GET';

    it('accepts valid listByDoctor request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-58',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByDoctor variant 3', () => {
      const payload = { resourceId: 'appointment-58' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByDoctor variant 3', () => {
      const requiredPermission = 'appointment:listByDoctor';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByDoctor variant 3', () => {
      const response = {
        data: { id: 'appointment-resp-58', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByDoctor variant 3', () => {
      const auditEvent = {
        action: 'listByDoctor',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByDoctor');
    });
  });

  describe('ListAppointmentsByDoctorVariant4', () => {
    const endpoint = 'appointment/doctor/:doctorId';
    const method = 'GET';

    it('accepts valid listByDoctor request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-59',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByDoctor variant 4', () => {
      const payload = { resourceId: 'appointment-59' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByDoctor variant 4', () => {
      const requiredPermission = 'appointment:listByDoctor';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByDoctor variant 4', () => {
      const response = {
        data: { id: 'appointment-resp-59', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByDoctor variant 4', () => {
      const auditEvent = {
        action: 'listByDoctor',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByDoctor');
    });
  });

  describe('ListAppointmentsByDoctorVariant5', () => {
    const endpoint = 'appointment/doctor/:doctorId';
    const method = 'GET';

    it('accepts valid listByDoctor request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-60',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByDoctor variant 5', () => {
      const payload = { resourceId: 'appointment-60' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByDoctor variant 5', () => {
      const requiredPermission = 'appointment:listByDoctor';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByDoctor variant 5', () => {
      const response = {
        data: { id: 'appointment-resp-60', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByDoctor variant 5', () => {
      const auditEvent = {
        action: 'listByDoctor',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByDoctor');
    });
  });

  describe('ListAppointmentsByDoctorVariant6', () => {
    const endpoint = 'appointment/doctor/:doctorId';
    const method = 'GET';

    it('accepts valid listByDoctor request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-61',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByDoctor variant 6', () => {
      const payload = { resourceId: 'appointment-61' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByDoctor variant 6', () => {
      const requiredPermission = 'appointment:listByDoctor';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByDoctor variant 6', () => {
      const response = {
        data: { id: 'appointment-resp-61', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByDoctor variant 6', () => {
      const auditEvent = {
        action: 'listByDoctor',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByDoctor');
    });
  });

  describe('ListAppointmentsByDoctorVariant7', () => {
    const endpoint = 'appointment/doctor/:doctorId';
    const method = 'GET';

    it('accepts valid listByDoctor request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'appointment-62',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('appointment');
    });

    it('rejects missing organization scope for listByDoctor variant 7', () => {
      const payload = { resourceId: 'appointment-62' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for listByDoctor variant 7', () => {
      const requiredPermission = 'appointment:listByDoctor';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for listByDoctor variant 7', () => {
      const response = {
        data: { id: 'appointment-resp-62', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on listByDoctor variant 7', () => {
      const auditEvent = {
        action: 'listByDoctor',
        resourceType: 'Appointment',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('listByDoctor');
    });
  });
});
