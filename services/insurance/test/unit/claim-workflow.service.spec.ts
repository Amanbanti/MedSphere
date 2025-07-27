import { describe, expect, it } from 'vitest';
import {
  ClaimWorkflowService,
  ClaimStatus,
  EligibilityX12Service,
} from '../../src/domain/services/claim-workflow.service';

describe('ClaimWorkflowService', () => {
  it('submits draft claim', () => {
    expect(ClaimWorkflowService.submit(ClaimStatus.DRAFT)).toBe(ClaimStatus.SUBMITTED);
  });

  it('adjudicates to paid', () => {
    expect(ClaimWorkflowService.adjudicate(ClaimStatus.PENDING, 'PAID')).toBe(ClaimStatus.PAID);
  });

  it('rejects invalid transition', () => {
    expect(() => ClaimWorkflowService.transition(ClaimStatus.CLOSED, ClaimStatus.DRAFT)).toThrow();
  });

  it('appeals denied claim', () => {
    expect(ClaimWorkflowService.appeal(ClaimStatus.DENIED)).toBe(ClaimStatus.APPEALED);
  });
});

describe('EligibilityX12Service', () => {
  it('builds synthetic X12-like eligibility response', () => {
    const svc = new EligibilityX12Service();
    const resp = svc.buildSyntheticResponse({
      payerName: 'Acme Health',
      memberId: 'MBR123',
      serviceTypeCodes: ['30', '98'],
    });
    expect(resp.eligibilityStatus).toBe('ACTIVE');
    expect(resp.benefits).toHaveLength(2);
    expect(resp.rawSegments.some((s) => s.startsWith('ISA*'))).toBe(true);
    expect(resp.traceNumber).toMatch(/^ELG-/);
  });
});
