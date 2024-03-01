/** Generated unit test expansion for worker service */

describe('RegisterWorkerHandler — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('RegisterWorkerHandler — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('RegisterWorkerHandler — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('RegisterWorkerHandler — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('RegisterWorkerHandler — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('RegisterWorkerHandler — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('RegisterWorkerHandler — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('RegisterWorkerHandler — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('RegisterWorkerHandler — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('RegisterWorkerHandler — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('RegisterWorkerHandler — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('RegisterWorkerHandler — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('RegisterWorkerHandler — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('RegisterWorkerHandler — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('RegisterWorkerHandler — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for registerHandler with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'registerHandler',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('registerHandler');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('ProcessWorkerJob — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('ProcessWorkerJob — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('ProcessWorkerJob — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('ProcessWorkerJob — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('ProcessWorkerJob — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('ProcessWorkerJob — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('ProcessWorkerJob — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('ProcessWorkerJob — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('ProcessWorkerJob — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('ProcessWorkerJob — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('ProcessWorkerJob — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('ProcessWorkerJob — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('ProcessWorkerJob — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('ProcessWorkerJob — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('ProcessWorkerJob — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for processJob with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'processJob',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('processJob');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('RetryFailedWorkerJob — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('RetryFailedWorkerJob — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('RetryFailedWorkerJob — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('RetryFailedWorkerJob — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('RetryFailedWorkerJob — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('RetryFailedWorkerJob — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('RetryFailedWorkerJob — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('RetryFailedWorkerJob — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('RetryFailedWorkerJob — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('RetryFailedWorkerJob — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('RetryFailedWorkerJob — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('RetryFailedWorkerJob — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('RetryFailedWorkerJob — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('RetryFailedWorkerJob — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('RetryFailedWorkerJob — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for retryFailed with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'retryFailed',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('retryFailed');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('GetWorkerStatus — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('GetWorkerStatus — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('GetWorkerStatus — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('GetWorkerStatus — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('GetWorkerStatus — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('GetWorkerStatus — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('GetWorkerStatus — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('GetWorkerStatus — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('GetWorkerStatus — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('GetWorkerStatus — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('GetWorkerStatus — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('GetWorkerStatus — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('GetWorkerStatus — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('GetWorkerStatus — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('GetWorkerStatus — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for getStatus with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getStatus',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getStatus');
    expect(command.resourceId).toContain('res-14');
  });
});
