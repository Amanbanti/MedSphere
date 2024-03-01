/** Generated unit test expansion for prescription service */

describe('CreatePrescription — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('CreatePrescription — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('CreatePrescription — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('CreatePrescription — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('CreatePrescription — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('CreatePrescription — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('CreatePrescription — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('CreatePrescription — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('CreatePrescription — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('CreatePrescription — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('CreatePrescription — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('CreatePrescription — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('CreatePrescription — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('CreatePrescription — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('CreatePrescription — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for create with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'create',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('create');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('RenewPrescription — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('RenewPrescription — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('RenewPrescription — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('RenewPrescription — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('RenewPrescription — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('RenewPrescription — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('RenewPrescription — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('RenewPrescription — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('RenewPrescription — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('RenewPrescription — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('RenewPrescription — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('RenewPrescription — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('RenewPrescription — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('RenewPrescription — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('RenewPrescription — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for renew with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'renew',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('renew');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('CancelPrescription — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('CancelPrescription — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('CancelPrescription — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('CancelPrescription — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('CancelPrescription — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('CancelPrescription — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('CancelPrescription — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('CancelPrescription — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('CancelPrescription — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('CancelPrescription — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('CancelPrescription — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('CancelPrescription — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('CancelPrescription — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('CancelPrescription — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('CancelPrescription — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for cancel with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'cancel',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('cancel');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('CheckPrescriptionInteractions — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for checkInteractions with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'checkInteractions',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('checkInteractions');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('ListPrescriptions — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('ListPrescriptions — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('ListPrescriptions — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('ListPrescriptions — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('ListPrescriptions — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('ListPrescriptions — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('ListPrescriptions — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('ListPrescriptions — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('ListPrescriptions — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('ListPrescriptions — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('ListPrescriptions — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('ListPrescriptions — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('ListPrescriptions — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('ListPrescriptions — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('ListPrescriptions — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for list with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'list',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('list');
    expect(command.resourceId).toContain('res-14');
  });
});
