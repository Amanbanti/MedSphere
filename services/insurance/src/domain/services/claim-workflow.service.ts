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

  static transition(from: ClaimStatus, to: ClaimStatus, reason?: string): {
    status: ClaimStatus;
    reason?: string;
  } {
    if (!ClaimWorkflowService.canTransition(from, to)) {
      throw new Error(`Invalid claim transition: ${from} → ${to}`);
    }
    return { status: to, reason };
  }

  static submit(from: ClaimStatus): ClaimStatus {
    return ClaimWorkflowService.transition(from, ClaimStatus.SUBMITTED).status;
  }

  static adjudicate(
    from: ClaimStatus,
    outcome: 'PAID' | 'DENIED' | 'PARTIAL',
  ): ClaimStatus {
    if (outcome === 'PAID') {
      return ClaimWorkflowService.transition(from, ClaimStatus.PAID).status;
    }
    if (outcome === 'DENIED') {
      return ClaimWorkflowService.transition(from, ClaimStatus.DENIED).status;
    }
    return ClaimWorkflowService.transition(from, ClaimStatus.PENDING).status;
  }

  static appeal(from: ClaimStatus): ClaimStatus {
    return ClaimWorkflowService.transition(from, ClaimStatus.APPEALED).status;
  }

  static close(from: ClaimStatus): ClaimStatus {
    return ClaimWorkflowService.transition(from, ClaimStatus.CLOSED).status;
  }
}

export interface X12EligibilityBenefit {
  serviceTypeCode: string;
  coverageLevel: string;
  benefitAmount?: number;
  benefitPercent?: number;
  inNetwork: boolean;
  authorizationRequired: boolean;
}

export interface X12EligibilityResponse {
  traceNumber: string;
  eligibilityStatus: 'ACTIVE' | 'INACTIVE' | 'UNKNOWN';
  payerName: string;
  memberId: string;
  planName?: string;
  effectiveDate: string;
  terminationDate?: string;
  benefits: X12EligibilityBenefit[];
  rawSegments: string[];
}

export class EligibilityX12Service {
  buildSyntheticResponse(input: {
    payerName: string;
    memberId: string;
    serviceTypeCodes: string[];
  }): X12EligibilityResponse {
    const trace = `ELG-${Date.now().toString(36).toUpperCase()}`;
    const benefits: X12EligibilityBenefit[] = input.serviceTypeCodes.map((code) => ({
      serviceTypeCode: code,
      coverageLevel: 'IND',
      benefitAmount: code === '30' ? 25 : undefined,
      benefitPercent: code === '98' ? 80 : undefined,
      inNetwork: true,
      authorizationRequired: code === '98',
    }));

    return {
      traceNumber: trace,
      eligibilityStatus: 'ACTIVE',
      payerName: input.payerName,
      memberId: input.memberId,
      planName: 'Standard PPO',
      effectiveDate: new Date().toISOString().slice(0, 10),
      benefits,
      rawSegments: [
        `ISA*00*          *00*          *ZZ*SUBMITTER      *ZZ*${input.payerName.slice(0, 15).padEnd(15)}*${new Date().toISOString().slice(2, 10).replace(/-/g, '')}*0800*^*00501*${trace}*0*P*:~`,
        `ST*270*${trace}~`,
        `BHT*0022*13*${trace}*${new Date().toISOString().slice(0, 10).replace(/-/g, '')}*0800~`,
        `HL*1**20*1~`,
        `NM1*PR*2*${input.payerName}*****PI*PAYER01~`,
        `HL*2*1*22*0~`,
        `NM1*IL*1*MEMBER*****MI*${input.memberId}~`,
        `EB*1**30*HM*IND*25****Y~`,
        `SE*8*${trace}~`,
        `GE*1*1~`,
        `IEA*1*${trace}~`,
      ],
    };
  }
}
