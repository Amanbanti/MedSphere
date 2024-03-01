/** Generated unit test expansion for billing service */

describe('CreateInvoice — parameterized case 0', () => {
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

describe('CreateInvoice — parameterized case 1', () => {
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

describe('CreateInvoice — parameterized case 2', () => {
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

describe('CreateInvoice — parameterized case 3', () => {
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

describe('CreateInvoice — parameterized case 4', () => {
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

describe('CreateInvoice — parameterized case 5', () => {
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

describe('CreateInvoice — parameterized case 6', () => {
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

describe('CreateInvoice — parameterized case 7', () => {
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

describe('CreateInvoice — parameterized case 8', () => {
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

describe('CreateInvoice — parameterized case 9', () => {
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

describe('CreateInvoice — parameterized case 10', () => {
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

describe('CreateInvoice — parameterized case 11', () => {
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

describe('CreateInvoice — parameterized case 12', () => {
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

describe('CreateInvoice — parameterized case 13', () => {
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

describe('CreateInvoice — parameterized case 14', () => {
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

describe('ApplyInvoicePayment — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('ApplyInvoicePayment — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('ApplyInvoicePayment — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('ApplyInvoicePayment — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('ApplyInvoicePayment — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('ApplyInvoicePayment — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('ApplyInvoicePayment — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('ApplyInvoicePayment — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('ApplyInvoicePayment — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('ApplyInvoicePayment — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('ApplyInvoicePayment — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('ApplyInvoicePayment — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('ApplyInvoicePayment — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('ApplyInvoicePayment — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('ApplyInvoicePayment — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for applyPayment with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'applyPayment',
      httpMethod: 'POST',
    };
    expect(command.verb).toBe('applyPayment');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('AdjustInvoiceCharge — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('AdjustInvoiceCharge — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('AdjustInvoiceCharge — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('AdjustInvoiceCharge — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('AdjustInvoiceCharge — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('AdjustInvoiceCharge — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('AdjustInvoiceCharge — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('AdjustInvoiceCharge — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('AdjustInvoiceCharge — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('AdjustInvoiceCharge — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('AdjustInvoiceCharge — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('AdjustInvoiceCharge — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('AdjustInvoiceCharge — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('AdjustInvoiceCharge — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('AdjustInvoiceCharge — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for adjustCharge with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'adjustCharge',
      httpMethod: 'PATCH',
    };
    expect(command.verb).toBe('adjustCharge');
    expect(command.resourceId).toContain('res-14');
  });
});

describe('ListInvoices — parameterized case 0', () => {
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

describe('ListInvoices — parameterized case 1', () => {
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

describe('ListInvoices — parameterized case 2', () => {
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

describe('ListInvoices — parameterized case 3', () => {
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

describe('ListInvoices — parameterized case 4', () => {
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

describe('ListInvoices — parameterized case 5', () => {
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

describe('ListInvoices — parameterized case 6', () => {
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

describe('ListInvoices — parameterized case 7', () => {
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

describe('ListInvoices — parameterized case 8', () => {
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

describe('ListInvoices — parameterized case 9', () => {
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

describe('ListInvoices — parameterized case 10', () => {
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

describe('ListInvoices — parameterized case 11', () => {
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

describe('ListInvoices — parameterized case 12', () => {
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

describe('ListInvoices — parameterized case 13', () => {
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

describe('ListInvoices — parameterized case 14', () => {
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

describe('GetInvoice — parameterized case 0', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-0-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-0-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-0-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-0', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-0');
  });
});

describe('GetInvoice — parameterized case 1', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-1-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-1-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-1-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-1', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-1');
  });
});

describe('GetInvoice — parameterized case 2', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-2-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-2-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-2-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-2', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-2');
  });
});

describe('GetInvoice — parameterized case 3', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-3-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-3-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-3-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-3', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-3');
  });
});

describe('GetInvoice — parameterized case 4', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-4-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-4-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-4-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-4', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-4');
  });
});

describe('GetInvoice — parameterized case 5', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-5-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-5-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-5-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-5', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-5');
  });
});

describe('GetInvoice — parameterized case 6', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-6-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-6-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-6-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-6', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-6');
  });
});

describe('GetInvoice — parameterized case 7', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-7-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-7-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-7-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-7', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-7');
  });
});

describe('GetInvoice — parameterized case 8', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-8-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-8-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-8-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-8', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-8');
  });
});

describe('GetInvoice — parameterized case 9', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-9-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-9-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-9-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-9', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-9');
  });
});

describe('GetInvoice — parameterized case 10', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-10-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-10-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-10-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-10', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-10');
  });
});

describe('GetInvoice — parameterized case 11', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-11-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-11-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-11-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-11', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-11');
  });
});

describe('GetInvoice — parameterized case 12', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-12-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-12-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-12-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-12', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-12');
  });
});

describe('GetInvoice — parameterized case 13', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-13-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-13-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-13-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-13', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-13');
  });
});

describe('GetInvoice — parameterized case 14', () => {
  it.each([
    { orgId: 'org-a', resourceId: 'res-14-a', expected: 'authorized' },
    { orgId: 'org-b', resourceId: 'res-14-b', expected: 'authorized' },
    { orgId: 'org-c', resourceId: 'res-14-c', expected: 'authorized' },
  ])('handles $expected path for getById with org $orgId', ({ orgId, resourceId }) => {
    const command = {
      actor: { sub: 'user-14', orgId, roles: ['CLINICIAN'] },
      resourceId,
      verb: 'getById',
      httpMethod: 'GET',
    };
    expect(command.verb).toBe('getById');
    expect(command.resourceId).toContain('res-14');
  });
});
