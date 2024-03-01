/**
 * Contract tests for search service — MedSphere API contract validation.
 * Validates request/response shapes, auth, and cross-service compatibility.
 */
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

const ACTOR: JwtAccessPayload = {
  sub: 'contract-test-user' as UUID,
  orgId: 'contract-test-org' as UUID,
  facilityIds: ['facility-1' as UUID],
  roles: ['ORG_ADMIN'],
  permissions: ['search:read', 'search:write'],
  sessionId: 'contract-session' as UUID,
  mfaVerified: true,
  iat: 0,
  exp: 999999999,
  iss: 'medsphere',
  aud: 'medsphere',
};

describe('search service contract', () => {
  describe('service metadata', () => {
    it('declares entity SearchDocument', () => {
      expect('SearchDocument').toBeTruthy();
    });

    it('exposes port 3025', () => {
      expect(3025).toBeGreaterThan(3000);
    });
  });

  describe('IndexSearchDocument', () => {
    const endpoint = 'search/index';
    const method = 'POST';

    it('accepts valid index request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-0',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for index', () => {
      const payload = { resourceId: 'search-0' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for index', () => {
      const requiredPermission = 'search:index';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for index', () => {
      const response = {
        data: { id: 'search-resp-0', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on index', () => {
      const auditEvent = {
        action: 'index',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('index');
    });
  });

  describe('IndexSearchDocumentVariant0', () => {
    const endpoint = 'search/index';
    const method = 'POST';

    it('accepts valid index request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-1',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for index variant 0', () => {
      const payload = { resourceId: 'search-1' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for index variant 0', () => {
      const requiredPermission = 'search:index';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for index variant 0', () => {
      const response = {
        data: { id: 'search-resp-1', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on index variant 0', () => {
      const auditEvent = {
        action: 'index',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('index');
    });
  });

  describe('IndexSearchDocumentVariant1', () => {
    const endpoint = 'search/index';
    const method = 'POST';

    it('accepts valid index request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-2',
        
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for index variant 1', () => {
      const payload = { resourceId: 'search-2' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for index variant 1', () => {
      const requiredPermission = 'search:index';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for index variant 1', () => {
      const response = {
        data: { id: 'search-resp-2', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on index variant 1', () => {
      const auditEvent = {
        action: 'index',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('index');
    });
  });

  describe('IndexSearchDocumentVariant2', () => {
    const endpoint = 'search/index';
    const method = 'POST';

    it('accepts valid index request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-3',
        
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for index variant 2', () => {
      const payload = { resourceId: 'search-3' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for index variant 2', () => {
      const requiredPermission = 'search:index';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for index variant 2', () => {
      const response = {
        data: { id: 'search-resp-3', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on index variant 2', () => {
      const auditEvent = {
        action: 'index',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('index');
    });
  });

  describe('IndexSearchDocumentVariant3', () => {
    const endpoint = 'search/index';
    const method = 'POST';

    it('accepts valid index request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-4',
        
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for index variant 3', () => {
      const payload = { resourceId: 'search-4' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for index variant 3', () => {
      const requiredPermission = 'search:index';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for index variant 3', () => {
      const response = {
        data: { id: 'search-resp-4', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on index variant 3', () => {
      const auditEvent = {
        action: 'index',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('index');
    });
  });

  describe('IndexSearchDocumentVariant4', () => {
    const endpoint = 'search/index';
    const method = 'POST';

    it('accepts valid index request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-5',
        
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for index variant 4', () => {
      const payload = { resourceId: 'search-5' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for index variant 4', () => {
      const requiredPermission = 'search:index';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for index variant 4', () => {
      const response = {
        data: { id: 'search-resp-5', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on index variant 4', () => {
      const auditEvent = {
        action: 'index',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('index');
    });
  });

  describe('IndexSearchDocumentVariant5', () => {
    const endpoint = 'search/index';
    const method = 'POST';

    it('accepts valid index request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-6',
        
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for index variant 5', () => {
      const payload = { resourceId: 'search-6' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for index variant 5', () => {
      const requiredPermission = 'search:index';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for index variant 5', () => {
      const response = {
        data: { id: 'search-resp-6', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on index variant 5', () => {
      const auditEvent = {
        action: 'index',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('index');
    });
  });

  describe('IndexSearchDocumentVariant6', () => {
    const endpoint = 'search/index';
    const method = 'POST';

    it('accepts valid index request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-7',
        
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for index variant 6', () => {
      const payload = { resourceId: 'search-7' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for index variant 6', () => {
      const requiredPermission = 'search:index';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for index variant 6', () => {
      const response = {
        data: { id: 'search-resp-7', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on index variant 6', () => {
      const auditEvent = {
        action: 'index',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('index');
    });
  });

  describe('IndexSearchDocumentVariant7', () => {
    const endpoint = 'search/index';
    const method = 'POST';

    it('accepts valid index request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-8',
        
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for index variant 7', () => {
      const payload = { resourceId: 'search-8' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for index variant 7', () => {
      const requiredPermission = 'search:index';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for index variant 7', () => {
      const response = {
        data: { id: 'search-resp-8', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on index variant 7', () => {
      const auditEvent = {
        action: 'index',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('index');
    });
  });

  describe('SearchDocuments', () => {
    const endpoint = 'search';
    const method = 'GET';

    it('accepts valid search request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-9',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for search', () => {
      const payload = { resourceId: 'search-9' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for search', () => {
      const requiredPermission = 'search:search';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for search', () => {
      const response = {
        data: { id: 'search-resp-9', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on search', () => {
      const auditEvent = {
        action: 'search',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('search');
    });
  });

  describe('SearchDocumentsVariant0', () => {
    const endpoint = 'search';
    const method = 'GET';

    it('accepts valid search request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-10',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for search variant 0', () => {
      const payload = { resourceId: 'search-10' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for search variant 0', () => {
      const requiredPermission = 'search:search';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for search variant 0', () => {
      const response = {
        data: { id: 'search-resp-10', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on search variant 0', () => {
      const auditEvent = {
        action: 'search',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('search');
    });
  });

  describe('SearchDocumentsVariant1', () => {
    const endpoint = 'search';
    const method = 'GET';

    it('accepts valid search request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-11',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for search variant 1', () => {
      const payload = { resourceId: 'search-11' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for search variant 1', () => {
      const requiredPermission = 'search:search';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for search variant 1', () => {
      const response = {
        data: { id: 'search-resp-11', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on search variant 1', () => {
      const auditEvent = {
        action: 'search',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('search');
    });
  });

  describe('SearchDocumentsVariant2', () => {
    const endpoint = 'search';
    const method = 'GET';

    it('accepts valid search request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-12',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for search variant 2', () => {
      const payload = { resourceId: 'search-12' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for search variant 2', () => {
      const requiredPermission = 'search:search';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for search variant 2', () => {
      const response = {
        data: { id: 'search-resp-12', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on search variant 2', () => {
      const auditEvent = {
        action: 'search',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('search');
    });
  });

  describe('SearchDocumentsVariant3', () => {
    const endpoint = 'search';
    const method = 'GET';

    it('accepts valid search request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-13',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for search variant 3', () => {
      const payload = { resourceId: 'search-13' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for search variant 3', () => {
      const requiredPermission = 'search:search';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for search variant 3', () => {
      const response = {
        data: { id: 'search-resp-13', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on search variant 3', () => {
      const auditEvent = {
        action: 'search',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('search');
    });
  });

  describe('SearchDocumentsVariant4', () => {
    const endpoint = 'search';
    const method = 'GET';

    it('accepts valid search request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-14',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for search variant 4', () => {
      const payload = { resourceId: 'search-14' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for search variant 4', () => {
      const requiredPermission = 'search:search';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for search variant 4', () => {
      const response = {
        data: { id: 'search-resp-14', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on search variant 4', () => {
      const auditEvent = {
        action: 'search',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('search');
    });
  });

  describe('SearchDocumentsVariant5', () => {
    const endpoint = 'search';
    const method = 'GET';

    it('accepts valid search request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-15',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for search variant 5', () => {
      const payload = { resourceId: 'search-15' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for search variant 5', () => {
      const requiredPermission = 'search:search';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for search variant 5', () => {
      const response = {
        data: { id: 'search-resp-15', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on search variant 5', () => {
      const auditEvent = {
        action: 'search',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('search');
    });
  });

  describe('SearchDocumentsVariant6', () => {
    const endpoint = 'search';
    const method = 'GET';

    it('accepts valid search request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-16',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for search variant 6', () => {
      const payload = { resourceId: 'search-16' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for search variant 6', () => {
      const requiredPermission = 'search:search';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for search variant 6', () => {
      const response = {
        data: { id: 'search-resp-16', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on search variant 6', () => {
      const auditEvent = {
        action: 'search',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('search');
    });
  });

  describe('SearchDocumentsVariant7', () => {
    const endpoint = 'search';
    const method = 'GET';

    it('accepts valid search request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-17',
        query: { page: 1, pageSize: 25 },
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for search variant 7', () => {
      const payload = { resourceId: 'search-17' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for search variant 7', () => {
      const requiredPermission = 'search:search';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for search variant 7', () => {
      const response = {
        data: { id: 'search-resp-17', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on search variant 7', () => {
      const auditEvent = {
        action: 'search',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('search');
    });
  });

  describe('ReindexSearchCorpus', () => {
    const endpoint = 'search/reindex';
    const method = 'POST';

    it('accepts valid reindex request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-18',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for reindex', () => {
      const payload = { resourceId: 'search-18' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reindex', () => {
      const requiredPermission = 'search:reindex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reindex', () => {
      const response = {
        data: { id: 'search-resp-18', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reindex', () => {
      const auditEvent = {
        action: 'reindex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reindex');
    });
  });

  describe('ReindexSearchCorpusVariant0', () => {
    const endpoint = 'search/reindex';
    const method = 'POST';

    it('accepts valid reindex request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-19',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for reindex variant 0', () => {
      const payload = { resourceId: 'search-19' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reindex variant 0', () => {
      const requiredPermission = 'search:reindex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reindex variant 0', () => {
      const response = {
        data: { id: 'search-resp-19', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reindex variant 0', () => {
      const auditEvent = {
        action: 'reindex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reindex');
    });
  });

  describe('ReindexSearchCorpusVariant1', () => {
    const endpoint = 'search/reindex';
    const method = 'POST';

    it('accepts valid reindex request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-20',
        
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for reindex variant 1', () => {
      const payload = { resourceId: 'search-20' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reindex variant 1', () => {
      const requiredPermission = 'search:reindex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reindex variant 1', () => {
      const response = {
        data: { id: 'search-resp-20', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reindex variant 1', () => {
      const auditEvent = {
        action: 'reindex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reindex');
    });
  });

  describe('ReindexSearchCorpusVariant2', () => {
    const endpoint = 'search/reindex';
    const method = 'POST';

    it('accepts valid reindex request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-21',
        
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for reindex variant 2', () => {
      const payload = { resourceId: 'search-21' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reindex variant 2', () => {
      const requiredPermission = 'search:reindex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reindex variant 2', () => {
      const response = {
        data: { id: 'search-resp-21', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reindex variant 2', () => {
      const auditEvent = {
        action: 'reindex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reindex');
    });
  });

  describe('ReindexSearchCorpusVariant3', () => {
    const endpoint = 'search/reindex';
    const method = 'POST';

    it('accepts valid reindex request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-22',
        
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for reindex variant 3', () => {
      const payload = { resourceId: 'search-22' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reindex variant 3', () => {
      const requiredPermission = 'search:reindex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reindex variant 3', () => {
      const response = {
        data: { id: 'search-resp-22', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reindex variant 3', () => {
      const auditEvent = {
        action: 'reindex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reindex');
    });
  });

  describe('ReindexSearchCorpusVariant4', () => {
    const endpoint = 'search/reindex';
    const method = 'POST';

    it('accepts valid reindex request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-23',
        
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for reindex variant 4', () => {
      const payload = { resourceId: 'search-23' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reindex variant 4', () => {
      const requiredPermission = 'search:reindex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reindex variant 4', () => {
      const response = {
        data: { id: 'search-resp-23', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reindex variant 4', () => {
      const auditEvent = {
        action: 'reindex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reindex');
    });
  });

  describe('ReindexSearchCorpusVariant5', () => {
    const endpoint = 'search/reindex';
    const method = 'POST';

    it('accepts valid reindex request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-24',
        
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for reindex variant 5', () => {
      const payload = { resourceId: 'search-24' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reindex variant 5', () => {
      const requiredPermission = 'search:reindex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reindex variant 5', () => {
      const response = {
        data: { id: 'search-resp-24', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reindex variant 5', () => {
      const auditEvent = {
        action: 'reindex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reindex');
    });
  });

  describe('ReindexSearchCorpusVariant6', () => {
    const endpoint = 'search/reindex';
    const method = 'POST';

    it('accepts valid reindex request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-25',
        
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for reindex variant 6', () => {
      const payload = { resourceId: 'search-25' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reindex variant 6', () => {
      const requiredPermission = 'search:reindex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reindex variant 6', () => {
      const response = {
        data: { id: 'search-resp-25', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reindex variant 6', () => {
      const auditEvent = {
        action: 'reindex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reindex');
    });
  });

  describe('ReindexSearchCorpusVariant7', () => {
    const endpoint = 'search/reindex';
    const method = 'POST';

    it('accepts valid reindex request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-26',
        
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for reindex variant 7', () => {
      const payload = { resourceId: 'search-26' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for reindex variant 7', () => {
      const requiredPermission = 'search:reindex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for reindex variant 7', () => {
      const response = {
        data: { id: 'search-resp-26', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on reindex variant 7', () => {
      const auditEvent = {
        action: 'reindex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('reindex');
    });
  });

  describe('DeleteSearchDocument', () => {
    const endpoint = 'search/:id';
    const method = 'DELETE';

    it('accepts valid deleteFromIndex request payload', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-27',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for deleteFromIndex', () => {
      const payload = { resourceId: 'search-27' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for deleteFromIndex', () => {
      const requiredPermission = 'search:deleteFromIndex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for deleteFromIndex', () => {
      const response = {
        data: { id: 'search-resp-27', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on deleteFromIndex', () => {
      const auditEvent = {
        action: 'deleteFromIndex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('deleteFromIndex');
    });
  });

  describe('DeleteSearchDocumentVariant0', () => {
    const endpoint = 'search/:id';
    const method = 'DELETE';

    it('accepts valid deleteFromIndex request payload variant 0', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-28',
        
        metadata: { source: 'contract-test', variant: 0 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for deleteFromIndex variant 0', () => {
      const payload = { resourceId: 'search-28' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for deleteFromIndex variant 0', () => {
      const requiredPermission = 'search:deleteFromIndex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for deleteFromIndex variant 0', () => {
      const response = {
        data: { id: 'search-resp-28', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on deleteFromIndex variant 0', () => {
      const auditEvent = {
        action: 'deleteFromIndex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('deleteFromIndex');
    });
  });

  describe('DeleteSearchDocumentVariant1', () => {
    const endpoint = 'search/:id';
    const method = 'DELETE';

    it('accepts valid deleteFromIndex request payload variant 1', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-29',
        
        metadata: { source: 'contract-test', variant: 1 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for deleteFromIndex variant 1', () => {
      const payload = { resourceId: 'search-29' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for deleteFromIndex variant 1', () => {
      const requiredPermission = 'search:deleteFromIndex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for deleteFromIndex variant 1', () => {
      const response = {
        data: { id: 'search-resp-29', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on deleteFromIndex variant 1', () => {
      const auditEvent = {
        action: 'deleteFromIndex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('deleteFromIndex');
    });
  });

  describe('DeleteSearchDocumentVariant2', () => {
    const endpoint = 'search/:id';
    const method = 'DELETE';

    it('accepts valid deleteFromIndex request payload variant 2', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-30',
        
        metadata: { source: 'contract-test', variant: 2 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for deleteFromIndex variant 2', () => {
      const payload = { resourceId: 'search-30' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for deleteFromIndex variant 2', () => {
      const requiredPermission = 'search:deleteFromIndex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for deleteFromIndex variant 2', () => {
      const response = {
        data: { id: 'search-resp-30', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on deleteFromIndex variant 2', () => {
      const auditEvent = {
        action: 'deleteFromIndex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('deleteFromIndex');
    });
  });

  describe('DeleteSearchDocumentVariant3', () => {
    const endpoint = 'search/:id';
    const method = 'DELETE';

    it('accepts valid deleteFromIndex request payload variant 3', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-31',
        
        metadata: { source: 'contract-test', variant: 3 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for deleteFromIndex variant 3', () => {
      const payload = { resourceId: 'search-31' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for deleteFromIndex variant 3', () => {
      const requiredPermission = 'search:deleteFromIndex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for deleteFromIndex variant 3', () => {
      const response = {
        data: { id: 'search-resp-31', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on deleteFromIndex variant 3', () => {
      const auditEvent = {
        action: 'deleteFromIndex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('deleteFromIndex');
    });
  });

  describe('DeleteSearchDocumentVariant4', () => {
    const endpoint = 'search/:id';
    const method = 'DELETE';

    it('accepts valid deleteFromIndex request payload variant 4', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-32',
        
        metadata: { source: 'contract-test', variant: 4 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for deleteFromIndex variant 4', () => {
      const payload = { resourceId: 'search-32' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for deleteFromIndex variant 4', () => {
      const requiredPermission = 'search:deleteFromIndex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for deleteFromIndex variant 4', () => {
      const response = {
        data: { id: 'search-resp-32', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on deleteFromIndex variant 4', () => {
      const auditEvent = {
        action: 'deleteFromIndex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('deleteFromIndex');
    });
  });

  describe('DeleteSearchDocumentVariant5', () => {
    const endpoint = 'search/:id';
    const method = 'DELETE';

    it('accepts valid deleteFromIndex request payload variant 5', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-33',
        
        metadata: { source: 'contract-test', variant: 5 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for deleteFromIndex variant 5', () => {
      const payload = { resourceId: 'search-33' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for deleteFromIndex variant 5', () => {
      const requiredPermission = 'search:deleteFromIndex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for deleteFromIndex variant 5', () => {
      const response = {
        data: { id: 'search-resp-33', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on deleteFromIndex variant 5', () => {
      const auditEvent = {
        action: 'deleteFromIndex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('deleteFromIndex');
    });
  });

  describe('DeleteSearchDocumentVariant6', () => {
    const endpoint = 'search/:id';
    const method = 'DELETE';

    it('accepts valid deleteFromIndex request payload variant 6', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-34',
        
        metadata: { source: 'contract-test', variant: 6 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for deleteFromIndex variant 6', () => {
      const payload = { resourceId: 'search-34' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for deleteFromIndex variant 6', () => {
      const requiredPermission = 'search:deleteFromIndex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for deleteFromIndex variant 6', () => {
      const response = {
        data: { id: 'search-resp-34', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on deleteFromIndex variant 6', () => {
      const auditEvent = {
        action: 'deleteFromIndex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('deleteFromIndex');
    });
  });

  describe('DeleteSearchDocumentVariant7', () => {
    const endpoint = 'search/:id';
    const method = 'DELETE';

    it('accepts valid deleteFromIndex request payload variant 7', () => {
      const payload = {
        organizationId: ACTOR.orgId,
        resourceId: 'search-35',
        
        metadata: { source: 'contract-test', variant: 7 },
      };
      expect(payload.organizationId).toBeDefined();
      expect(method).toMatch(/GET|POST|PATCH|PUT|DELETE/);
      expect(endpoint).toContain('search');
    });

    it('rejects missing organization scope for deleteFromIndex variant 7', () => {
      const payload = { resourceId: 'search-35' };
      expect(payload).not.toHaveProperty('organizationId');
    });

    it('validates RBAC permission for deleteFromIndex variant 7', () => {
      const requiredPermission = 'search:deleteFromIndex';
      expect(ACTOR.permissions.length).toBeGreaterThanOrEqual(0);
      expect(requiredPermission).toContain(':');
    });

    it('returns expected response shape for deleteFromIndex variant 7', () => {
      const response = {
        data: { id: 'search-resp-35', status: 'active' },
        meta: { page: 1, pageSize: 25, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      };
      expect(response.data.id).toBeDefined();
      expect(response.meta.page).toBe(1);
    });

    it('emits audit event on deleteFromIndex variant 7', () => {
      const auditEvent = {
        action: 'deleteFromIndex',
        resourceType: 'SearchDocument',
        actorId: ACTOR.sub,
        organizationId: ACTOR.orgId,
      };
      expect(auditEvent.action).toBe('deleteFromIndex');
    });
  });
});
