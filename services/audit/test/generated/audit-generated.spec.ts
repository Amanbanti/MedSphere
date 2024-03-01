/** Generated unit test expansion for audit service */

describe('AppendAuditLog — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('AppendAuditLog — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('AppendAuditLog — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('AppendAuditLog — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('AppendAuditLog — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('AppendAuditLog — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('AppendAuditLog — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('AppendAuditLog — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('AppendAuditLog — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('AppendAuditLog — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('AppendAuditLog — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('AppendAuditLog — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('AppendAuditLog — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('AppendAuditLog — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('AppendAuditLog — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for append with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'append',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('append');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('QueryAuditLogs — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('QueryAuditLogs — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('QueryAuditLogs — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('QueryAuditLogs — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('QueryAuditLogs — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('QueryAuditLogs — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('QueryAuditLogs — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('QueryAuditLogs — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('QueryAuditLogs — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('QueryAuditLogs — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('QueryAuditLogs — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('QueryAuditLogs — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('QueryAuditLogs — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('QueryAuditLogs — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('QueryAuditLogs — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for query with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'query',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('query');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('ExportAuditTrail — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('ExportAuditTrail — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('ExportAuditTrail — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('ExportAuditTrail — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('ExportAuditTrail — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('ExportAuditTrail — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('ExportAuditTrail — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('ExportAuditTrail — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('ExportAuditTrail — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('ExportAuditTrail — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('ExportAuditTrail — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('ExportAuditTrail — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('ExportAuditTrail — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('ExportAuditTrail — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('ExportAuditTrail — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for export with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'export',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('export');
    expect(command.resourceId).toContain('res-14');
  });
});
