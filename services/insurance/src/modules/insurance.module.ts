import { Module } from '@nestjs/common';
import { InsurancePolicyController } from '../presentation/http/insurance-policy.controller';
import { INSURANCE_POLICY_REPOSITORY } from '../domain/repositories/insurance-policy.repository';
import { InMemoryInsurancePolicyRepository } from '../infrastructure/persistence/in-memory-insurance-policy.repository';
import { PrismaInsurancePolicyRepository } from '../infrastructure/persistence/prisma-insurance-policy.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { InsuranceOrchestrator } from '../application/services/insurance-orchestrator.service';
import { InsuranceEventPublisher } from '../infrastructure/messaging/insurance-event.publisher';

import {
  VerifyInsuranceCoverageUseCase,
    SubmitInsuranceClaimUseCase,
    UpdateInsurancePolicyUseCase,
    GetInsuranceEligibilityUseCase,
    ListInsurancePoliciesUseCase,
} from '../application/use-cases';

@Module({
  controllers: [InsurancePolicyController],
  providers: [
    PrismaService,
    InMemoryInsurancePolicyRepository,
    InsuranceOrchestrator,
    InsuranceEventPublisher,
    {
      provide: INSURANCE_POLICY_REPOSITORY,
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemoryInsurancePolicyRepository
        : PrismaInsurancePolicyRepository,
    },
    VerifyInsuranceCoverageUseCase,
    SubmitInsuranceClaimUseCase,
    UpdateInsurancePolicyUseCase,
    GetInsuranceEligibilityUseCase,
    ListInsurancePoliciesUseCase,
  ],
  exports: [INSURANCE_POLICY_REPOSITORY, InsuranceOrchestrator],
})
export class InsuranceModule {}
