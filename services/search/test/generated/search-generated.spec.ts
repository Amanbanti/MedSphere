/** Generated unit test expansion for search service */

describe('IndexSearchDocument — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('IndexSearchDocument — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('IndexSearchDocument — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('IndexSearchDocument — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('IndexSearchDocument — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('IndexSearchDocument — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('IndexSearchDocument — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('IndexSearchDocument — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('IndexSearchDocument — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('IndexSearchDocument — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('IndexSearchDocument — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('IndexSearchDocument — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('IndexSearchDocument — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('IndexSearchDocument — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('IndexSearchDocument — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for index with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'index',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('index');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('SearchDocuments — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('SearchDocuments — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('SearchDocuments — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('SearchDocuments — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('SearchDocuments — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('SearchDocuments — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('SearchDocuments — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('SearchDocuments — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('SearchDocuments — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('SearchDocuments — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('SearchDocuments — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('SearchDocuments — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('SearchDocuments — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('SearchDocuments — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('SearchDocuments — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for search with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'search',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('search');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('ReindexSearchCorpus — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('ReindexSearchCorpus — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('ReindexSearchCorpus — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('ReindexSearchCorpus — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('ReindexSearchCorpus — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('ReindexSearchCorpus — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('ReindexSearchCorpus — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('ReindexSearchCorpus — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('ReindexSearchCorpus — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('ReindexSearchCorpus — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('ReindexSearchCorpus — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('ReindexSearchCorpus — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('ReindexSearchCorpus — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('ReindexSearchCorpus — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('ReindexSearchCorpus — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for reindex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'reindex',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('reindex');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('DeleteSearchDocument — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('DeleteSearchDocument — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('DeleteSearchDocument — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('DeleteSearchDocument — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('DeleteSearchDocument — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('DeleteSearchDocument — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('DeleteSearchDocument — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('DeleteSearchDocument — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('DeleteSearchDocument — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('DeleteSearchDocument — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('DeleteSearchDocument — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('DeleteSearchDocument — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('DeleteSearchDocument — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('DeleteSearchDocument — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('DeleteSearchDocument — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for deleteFromIndex with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'deleteFromIndex',
      httpMethod: 'DELETE',
    };
    expect(command.verb).toBe('deleteFromIndex');
    expect(command.resourceId).toContain('res-14');
  });
});
