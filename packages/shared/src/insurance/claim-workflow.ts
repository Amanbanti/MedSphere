export enum ClaimStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
  PAID = 'PAID',
  DENIED = 'DENIED',
  APPEALED = 'APPEALED',
  CLOSED = 'CLOSED',
}

const CLAIM_TRANSITIONS: Record<ClaimStatus, ClaimStatus[]> = {
  [ClaimStatus.DRAFT]: [ClaimStatus.SUBMITTED],
  [ClaimStatus.SUBMITTED]: [ClaimStatus.ACCEPTED, ClaimStatus.REJECTED, ClaimStatus.PENDING],
  [ClaimStatus.ACCEPTED]: [ClaimStatus.PENDING, ClaimStatus.PAID, ClaimStatus.DENIED],
  [ClaimStatus.REJECTED]: [ClaimStatus.DRAFT, ClaimStatus.APPEALED],
  [ClaimStatus.PENDING]: [ClaimStatus.PAID, ClaimStatus.DENIED],
  [ClaimStatus.PAID]: [ClaimStatus.CLOSED],
  [ClaimStatus.DENIED]: [ClaimStatus.APPEALED, ClaimStatus.CLOSED],
  [ClaimStatus.APPEALED]: [ClaimStatus.PAID, ClaimStatus.DENIED, ClaimStatus.CLOSED],
  [ClaimStatus.CLOSED]: [],
};

export class ClaimWorkflowService {
  static canTransition(from: ClaimStatus, to: ClaimStatus): boolean {
    return CLAIM_TRANSITIONS[from]?.includes(to) ?? false;
  }

  static transition(from: ClaimStatus, to: ClaimStatus): ClaimStatus {
    if (!ClaimWorkflowService.canTransition(from, to)) {
      throw new Error(`Invalid claim transition: ${from} → ${to}`);
    }
    return to;
  }

  static submit(from: ClaimStatus): ClaimStatus {
    return ClaimWorkflowService.transition(from, ClaimStatus.SUBMITTED);
  }
}
