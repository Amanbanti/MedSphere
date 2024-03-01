import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { VerifyInsuranceCoverageUseCase } from '../../application/use-cases/verify-insurance-coverage.use-case';
import { SubmitInsuranceClaimUseCase } from '../../application/use-cases/submit-insurance-claim.use-case';
import { UpdateInsurancePolicyUseCase } from '../../application/use-cases/update-insurance-policy.use-case';
import { GetInsuranceEligibilityUseCase } from '../../application/use-cases/get-insurance-eligibility.use-case';
import { ListInsurancePoliciesUseCase } from '../../application/use-cases/list-insurance-policies.use-case';

@Controller('insurance-policys')
export class InsurancePolicyController {
  constructor(
    private readonly verifyInsuranceCoverageUseCase: VerifyInsuranceCoverageUseCase,
    private readonly submitInsuranceClaimUseCase: SubmitInsuranceClaimUseCase,
    private readonly updateInsurancePolicyUseCase: UpdateInsurancePolicyUseCase,
    private readonly getInsuranceEligibilityUseCase: GetInsuranceEligibilityUseCase,
    private readonly listInsurancePoliciesUseCase: ListInsurancePoliciesUseCase,
  ) {}

  @Post('/verify')
  async verifyInsuranceCoverage(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.verifyInsuranceCoverageUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/claims')
  async submitInsuranceClaim(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.submitInsuranceClaimUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Patch('/policies/:id')
  async updateInsurancePolicy(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.updateInsurancePolicyUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('/eligibility/:patientId')
  async getInsuranceEligibility(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('patientId') patientId: string,
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.getInsuranceEligibilityUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      patientId: patientId as UUID,
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('/policies')
  async listInsurancePolicies(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.listInsurancePoliciesUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }
}
