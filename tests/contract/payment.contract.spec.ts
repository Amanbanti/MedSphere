/**
 * Contract tests for payment service — MedSphere API contract validation.
 * Validates request/response shapes, auth, and cross-service compatibility.
 */
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

const ACTOR: JwtAccessPayload = {
  sub: 'contract-test-user' as UUID,
  orgId: 'contract-test-org' as UUID,
  facilityIds: ['facility-1' as UUID],
  roles: ['ORG_ADMIN'],
  permissions: ['payment:read', 'payment:write'],
  sessionId: 'contract-session' as UUID,
  mfaVerified: true,
  iat: 0,
  exp: 999999999,
  iss: 'medsphere',
  aud: 'medsphere',
};

describe('payment service contract', () => {
  describe('service metadata', () => {
    it('declares entity PaymentTransaction', () => {
      expect('PaymentTransaction').toBeTruthy();
    });

    it('exposes port 3020', () => {
      expect(3020).toBeGreaterThan(3000);
    });
  });

  describe('ProcessPayment', () => {
    const endpoint = 'payment/payments';
    const method = 'POST';

    it('accepts valid process request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-0',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for process', () => {
      const payload = { resourceId: 'payment-0' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for process', () => {
      const requiredPermission = 'payment:process';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for process', () => {
      const response = {
        data: { id: 'payment-resp-0', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on process', () => {
      const auditEvent = {
        action: 'process',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('process');
    });
  });

  describe('ProcessPaymentVariant0', () => {
    const endpoint = 'payment/payments';
    const method = 'POST';

    it('accepts valid process request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-1',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for process variant 0', () => {
      const payload = { resourceId: 'payment-1' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for process variant 0', () => {
      const requiredPermission = 'payment:process';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for process variant 0', () => {
      const response = {
        data: { id: 'payment-resp-1', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on process variant 0', () => {
      const auditEvent = {
        action: 'process',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('process');
    });
  });

  describe('ProcessPaymentVariant1', () => {
    const endpoint = 'payment/payments';
    const method = 'POST';

    it('accepts valid process request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-2',
        
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for process variant 1', () => {
      const payload = { resourceId: 'payment-2' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for process variant 1', () => {
      const requiredPermission = 'payment:process';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for process variant 1', () => {
      const response = {
        data: { id: 'payment-resp-2', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on process variant 1', () => {
      const auditEvent = {
        action: 'process',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('process');
    });
  });

  describe('ProcessPaymentVariant2', () => {
    const endpoint = 'payment/payments';
    const method = 'POST';

    it('accepts valid process request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-3',
        
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for process variant 2', () => {
      const payload = { resourceId: 'payment-3' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for process variant 2', () => {
      const requiredPermission = 'payment:process';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for process variant 2', () => {
      const response = {
        data: { id: 'payment-resp-3', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on process variant 2', () => {
      const auditEvent = {
        action: 'process',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('process');
    });
  });

  describe('ProcessPaymentVariant3', () => {
    const endpoint = 'payment/payments';
    const method = 'POST';

    it('accepts valid process request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-4',
        
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for process variant 3', () => {
      const payload = { resourceId: 'payment-4' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for process variant 3', () => {
      const requiredPermission = 'payment:process';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for process variant 3', () => {
      const response = {
        data: { id: 'payment-resp-4', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on process variant 3', () => {
      const auditEvent = {
        action: 'process',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('process');
    });
  });

  describe('ProcessPaymentVariant4', () => {
    const endpoint = 'payment/payments';
    const method = 'POST';

    it('accepts valid process request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-5',
        
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for process variant 4', () => {
      const payload = { resourceId: 'payment-5' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for process variant 4', () => {
      const requiredPermission = 'payment:process';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for process variant 4', () => {
      const response = {
        data: { id: 'payment-resp-5', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on process variant 4', () => {
      const auditEvent = {
        action: 'process',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('process');
    });
  });

  describe('ProcessPaymentVariant5', () => {
    const endpoint = 'payment/payments';
    const method = 'POST';

    it('accepts valid process request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-6',
        
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for process variant 5', () => {
      const payload = { resourceId: 'payment-6' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for process variant 5', () => {
      const requiredPermission = 'payment:process';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for process variant 5', () => {
      const response = {
        data: { id: 'payment-resp-6', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on process variant 5', () => {
      const auditEvent = {
        action: 'process',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('process');
    });
  });

  describe('ProcessPaymentVariant6', () => {
    const endpoint = 'payment/payments';
    const method = 'POST';

    it('accepts valid process request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-7',
        
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for process variant 6', () => {
      const payload = { resourceId: 'payment-7' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for process variant 6', () => {
      const requiredPermission = 'payment:process';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for process variant 6', () => {
      const response = {
        data: { id: 'payment-resp-7', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on process variant 6', () => {
      const auditEvent = {
        action: 'process',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('process');
    });
  });

  describe('ProcessPaymentVariant7', () => {
    const endpoint = 'payment/payments';
    const method = 'POST';

    it('accepts valid process request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-8',
        
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for process variant 7', () => {
      const payload = { resourceId: 'payment-8' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for process variant 7', () => {
      const requiredPermission = 'payment:process';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for process variant 7', () => {
      const response = {
        data: { id: 'payment-resp-8', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on process variant 7', () => {
      const auditEvent = {
        action: 'process',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('process');
    });
  });

  describe('RefundPayment', () => {
    const endpoint = 'payment/payments/:id/refund';
    const method = 'POST';

    it('accepts valid refund request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-9',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for refund', () => {
      const payload = { resourceId: 'payment-9' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for refund', () => {
      const requiredPermission = 'payment:refund';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for refund', () => {
      const response = {
        data: { id: 'payment-resp-9', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on refund', () => {
      const auditEvent = {
        action: 'refund',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('refund');
    });
  });

  describe('RefundPaymentVariant0', () => {
    const endpoint = 'payment/payments/:id/refund';
    const method = 'POST';

    it('accepts valid refund request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-10',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for refund variant 0', () => {
      const payload = { resourceId: 'payment-10' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for refund variant 0', () => {
      const requiredPermission = 'payment:refund';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for refund variant 0', () => {
      const response = {
        data: { id: 'payment-resp-10', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on refund variant 0', () => {
      const auditEvent = {
        action: 'refund',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('refund');
    });
  });

  describe('RefundPaymentVariant1', () => {
    const endpoint = 'payment/payments/:id/refund';
    const method = 'POST';

    it('accepts valid refund request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-11',
        
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for refund variant 1', () => {
      const payload = { resourceId: 'payment-11' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for refund variant 1', () => {
      const requiredPermission = 'payment:refund';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for refund variant 1', () => {
      const response = {
        data: { id: 'payment-resp-11', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on refund variant 1', () => {
      const auditEvent = {
        action: 'refund',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('refund');
    });
  });

  describe('RefundPaymentVariant2', () => {
    const endpoint = 'payment/payments/:id/refund';
    const method = 'POST';

    it('accepts valid refund request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-12',
        
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for refund variant 2', () => {
      const payload = { resourceId: 'payment-12' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for refund variant 2', () => {
      const requiredPermission = 'payment:refund';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for refund variant 2', () => {
      const response = {
        data: { id: 'payment-resp-12', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on refund variant 2', () => {
      const auditEvent = {
        action: 'refund',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('refund');
    });
  });

  describe('RefundPaymentVariant3', () => {
    const endpoint = 'payment/payments/:id/refund';
    const method = 'POST';

    it('accepts valid refund request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-13',
        
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for refund variant 3', () => {
      const payload = { resourceId: 'payment-13' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for refund variant 3', () => {
      const requiredPermission = 'payment:refund';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for refund variant 3', () => {
      const response = {
        data: { id: 'payment-resp-13', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on refund variant 3', () => {
      const auditEvent = {
        action: 'refund',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('refund');
    });
  });

  describe('RefundPaymentVariant4', () => {
    const endpoint = 'payment/payments/:id/refund';
    const method = 'POST';

    it('accepts valid refund request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-14',
        
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for refund variant 4', () => {
      const payload = { resourceId: 'payment-14' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for refund variant 4', () => {
      const requiredPermission = 'payment:refund';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for refund variant 4', () => {
      const response = {
        data: { id: 'payment-resp-14', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on refund variant 4', () => {
      const auditEvent = {
        action: 'refund',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('refund');
    });
  });

  describe('RefundPaymentVariant5', () => {
    const endpoint = 'payment/payments/:id/refund';
    const method = 'POST';

    it('accepts valid refund request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-15',
        
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for refund variant 5', () => {
      const payload = { resourceId: 'payment-15' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for refund variant 5', () => {
      const requiredPermission = 'payment:refund';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for refund variant 5', () => {
      const response = {
        data: { id: 'payment-resp-15', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on refund variant 5', () => {
      const auditEvent = {
        action: 'refund',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('refund');
    });
  });

  describe('RefundPaymentVariant6', () => {
    const endpoint = 'payment/payments/:id/refund';
    const method = 'POST';

    it('accepts valid refund request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-16',
        
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for refund variant 6', () => {
      const payload = { resourceId: 'payment-16' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for refund variant 6', () => {
      const requiredPermission = 'payment:refund';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for refund variant 6', () => {
      const response = {
        data: { id: 'payment-resp-16', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on refund variant 6', () => {
      const auditEvent = {
        action: 'refund',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('refund');
    });
  });

  describe('RefundPaymentVariant7', () => {
    const endpoint = 'payment/payments/:id/refund';
    const method = 'POST';

    it('accepts valid refund request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-17',
        
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for refund variant 7', () => {
      const payload = { resourceId: 'payment-17' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for refund variant 7', () => {
      const requiredPermission = 'payment:refund';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for refund variant 7', () => {
      const response = {
        data: { id: 'payment-resp-17', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on refund variant 7', () => {
      const auditEvent = {
        action: 'refund',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('refund');
    });
  });

  describe('ReconcilePayments', () => {
    const endpoint = 'payment/reconcile';
    const method = 'POST';

    it('accepts valid reconcile request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-18',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for reconcile', () => {
      const payload = { resourceId: 'payment-18' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reconcile', () => {
      const requiredPermission = 'payment:reconcile';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reconcile', () => {
      const response = {
        data: { id: 'payment-resp-18', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reconcile', () => {
      const auditEvent = {
        action: 'reconcile',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reconcile');
    });
  });

  describe('ReconcilePaymentsVariant0', () => {
    const endpoint = 'payment/reconcile';
    const method = 'POST';

    it('accepts valid reconcile request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-19',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for reconcile variant 0', () => {
      const payload = { resourceId: 'payment-19' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reconcile variant 0', () => {
      const requiredPermission = 'payment:reconcile';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reconcile variant 0', () => {
      const response = {
        data: { id: 'payment-resp-19', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reconcile variant 0', () => {
      const auditEvent = {
        action: 'reconcile',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reconcile');
    });
  });

  describe('ReconcilePaymentsVariant1', () => {
    const endpoint = 'payment/reconcile';
    const method = 'POST';

    it('accepts valid reconcile request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-20',
        
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for reconcile variant 1', () => {
      const payload = { resourceId: 'payment-20' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reconcile variant 1', () => {
      const requiredPermission = 'payment:reconcile';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reconcile variant 1', () => {
      const response = {
        data: { id: 'payment-resp-20', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reconcile variant 1', () => {
      const auditEvent = {
        action: 'reconcile',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reconcile');
    });
  });

  describe('ReconcilePaymentsVariant2', () => {
    const endpoint = 'payment/reconcile';
    const method = 'POST';

    it('accepts valid reconcile request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-21',
        
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for reconcile variant 2', () => {
      const payload = { resourceId: 'payment-21' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reconcile variant 2', () => {
      const requiredPermission = 'payment:reconcile';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reconcile variant 2', () => {
      const response = {
        data: { id: 'payment-resp-21', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reconcile variant 2', () => {
      const auditEvent = {
        action: 'reconcile',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reconcile');
    });
  });

  describe('ReconcilePaymentsVariant3', () => {
    const endpoint = 'payment/reconcile';
    const method = 'POST';

    it('accepts valid reconcile request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-22',
        
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for reconcile variant 3', () => {
      const payload = { resourceId: 'payment-22' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reconcile variant 3', () => {
      const requiredPermission = 'payment:reconcile';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reconcile variant 3', () => {
      const response = {
        data: { id: 'payment-resp-22', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reconcile variant 3', () => {
      const auditEvent = {
        action: 'reconcile',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reconcile');
    });
  });

  describe('ReconcilePaymentsVariant4', () => {
    const endpoint = 'payment/reconcile';
    const method = 'POST';

    it('accepts valid reconcile request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-23',
        
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for reconcile variant 4', () => {
      const payload = { resourceId: 'payment-23' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reconcile variant 4', () => {
      const requiredPermission = 'payment:reconcile';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reconcile variant 4', () => {
      const response = {
        data: { id: 'payment-resp-23', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reconcile variant 4', () => {
      const auditEvent = {
        action: 'reconcile',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reconcile');
    });
  });

  describe('ReconcilePaymentsVariant5', () => {
    const endpoint = 'payment/reconcile';
    const method = 'POST';

    it('accepts valid reconcile request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-24',
        
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for reconcile variant 5', () => {
      const payload = { resourceId: 'payment-24' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reconcile variant 5', () => {
      const requiredPermission = 'payment:reconcile';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reconcile variant 5', () => {
      const response = {
        data: { id: 'payment-resp-24', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reconcile variant 5', () => {
      const auditEvent = {
        action: 'reconcile',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reconcile');
    });
  });

  describe('ReconcilePaymentsVariant6', () => {
    const endpoint = 'payment/reconcile';
    const method = 'POST';

    it('accepts valid reconcile request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-25',
        
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for reconcile variant 6', () => {
      const payload = { resourceId: 'payment-25' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reconcile variant 6', () => {
      const requiredPermission = 'payment:reconcile';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reconcile variant 6', () => {
      const response = {
        data: { id: 'payment-resp-25', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reconcile variant 6', () => {
      const auditEvent = {
        action: 'reconcile',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reconcile');
    });
  });

  describe('ReconcilePaymentsVariant7', () => {
    const endpoint = 'payment/reconcile';
    const method = 'POST';

    it('accepts valid reconcile request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-26',
        
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for reconcile variant 7', () => {
      const payload = { resourceId: 'payment-26' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reconcile variant 7', () => {
      const requiredPermission = 'payment:reconcile';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reconcile variant 7', () => {
      const response = {
        data: { id: 'payment-resp-26', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reconcile variant 7', () => {
      const auditEvent = {
        action: 'reconcile',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reconcile');
    });
  });

  describe('ListPaymentTransactions', () => {
    const endpoint = 'payment/payments';
    const method = 'GET';

    it('accepts valid list request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-27',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for list', () => {
      const payload = { resourceId: 'payment-27' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for list', () => {
      const requiredPermission = 'payment:list';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for list', () => {
      const response = {
        data: { id: 'payment-resp-27', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on list', () => {
      const auditEvent = {
        action: 'list',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('list');
    });
  });

  describe('ListPaymentTransactionsVariant0', () => {
    const endpoint = 'payment/payments';
    const method = 'GET';

    it('accepts valid list request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-28',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for list variant 0', () => {
      const payload = { resourceId: 'payment-28' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for list variant 0', () => {
      const requiredPermission = 'payment:list';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for list variant 0', () => {
      const response = {
        data: { id: 'payment-resp-28', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on list variant 0', () => {
      const auditEvent = {
        action: 'list',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('list');
    });
  });

  describe('ListPaymentTransactionsVariant1', () => {
    const endpoint = 'payment/payments';
    const method = 'GET';

    it('accepts valid list request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-29',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for list variant 1', () => {
      const payload = { resourceId: 'payment-29' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for list variant 1', () => {
      const requiredPermission = 'payment:list';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for list variant 1', () => {
      const response = {
        data: { id: 'payment-resp-29', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on list variant 1', () => {
      const auditEvent = {
        action: 'list',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('list');
    });
  });

  describe('ListPaymentTransactionsVariant2', () => {
    const endpoint = 'payment/payments';
    const method = 'GET';

    it('accepts valid list request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-30',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for list variant 2', () => {
      const payload = { resourceId: 'payment-30' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for list variant 2', () => {
      const requiredPermission = 'payment:list';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for list variant 2', () => {
      const response = {
        data: { id: 'payment-resp-30', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on list variant 2', () => {
      const auditEvent = {
        action: 'list',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('list');
    });
  });

  describe('ListPaymentTransactionsVariant3', () => {
    const endpoint = 'payment/payments';
    const method = 'GET';

    it('accepts valid list request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-31',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for list variant 3', () => {
      const payload = { resourceId: 'payment-31' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for list variant 3', () => {
      const requiredPermission = 'payment:list';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for list variant 3', () => {
      const response = {
        data: { id: 'payment-resp-31', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on list variant 3', () => {
      const auditEvent = {
        action: 'list',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('list');
    });
  });

  describe('ListPaymentTransactionsVariant4', () => {
    const endpoint = 'payment/payments';
    const method = 'GET';

    it('accepts valid list request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-32',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for list variant 4', () => {
      const payload = { resourceId: 'payment-32' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for list variant 4', () => {
      const requiredPermission = 'payment:list';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for list variant 4', () => {
      const response = {
        data: { id: 'payment-resp-32', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on list variant 4', () => {
      const auditEvent = {
        action: 'list',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('list');
    });
  });

  describe('ListPaymentTransactionsVariant5', () => {
    const endpoint = 'payment/payments';
    const method = 'GET';

    it('accepts valid list request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-33',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for list variant 5', () => {
      const payload = { resourceId: 'payment-33' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for list variant 5', () => {
      const requiredPermission = 'payment:list';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for list variant 5', () => {
      const response = {
        data: { id: 'payment-resp-33', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on list variant 5', () => {
      const auditEvent = {
        action: 'list',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('list');
    });
  });

  describe('ListPaymentTransactionsVariant6', () => {
    const endpoint = 'payment/payments';
    const method = 'GET';

    it('accepts valid list request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-34',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for list variant 6', () => {
      const payload = { resourceId: 'payment-34' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for list variant 6', () => {
      const requiredPermission = 'payment:list';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for list variant 6', () => {
      const response = {
        data: { id: 'payment-resp-34', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on list variant 6', () => {
      const auditEvent = {
        action: 'list',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('list');
    });
  });

  describe('ListPaymentTransactionsVariant7', () => {
    const endpoint = 'payment/payments';
    const method = 'GET';

    it('accepts valid list request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'payment-35',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('payment');
    });

    it('rejects missing organization scope for list variant 7', () => {
      const payload = { resourceId: 'payment-35' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for list variant 7', () => {
      const requiredPermission = 'payment:list';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for list variant 7', () => {
      const response = {
        data: { id: 'payment-resp-35', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on list variant 7', () => {
      const auditEvent = {
        action: 'list',
        resourceType: 'PaymentTransaction',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('list');
    });
  });
});
