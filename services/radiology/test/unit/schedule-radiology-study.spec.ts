import { ScheduleRadiologyStudyUseCase } from '../../src/application/use-cases/schedule-radiology-study.use-case';
import { RadiologyStudy } from '../../src/domain/entities/radiology-study.entity';
import { ValidationError } from '../../src/domain/errors/radiology.errors';

describe('ScheduleRadiologyStudyUseCase', () => {
  const organizationId = '22222222-2222-4222-8222-222222222222' as const;
  const actor = { sub: '11111111-1111-4111-8111-111111111111', orgId: organizationId, roles: ['DOCTOR'], permissions: [] };

  const makeEntity = () => {
    const now = new Date().toISOString();
    return RadiologyStudy.register({
      id: '44444444-4444-4444-8444-444444444444' as never,
      organizationId: organizationId as never,
      now: now as never,
      ...(Object.fromEntries(
        ["patientId","modality","bodyPart","scheduledAt","status","findings","reportedBy"].map((key) => {
          if (key.includes('status')) return [key, 'ACTIVE'];
          if (key.includes('At') || key === 'dateOfBirth') return [key, now];
          if (key.includes('Cents') || key.includes('Minutes')) return [key, 1];
          if (key.includes('Id')) return [key, organizationId];
          return [key, 'sample'];
        }),
      ) as Record<string, unknown>),
    } as Parameters<typeof RadiologyStudy.register>[0]);
  };

  it('executes happy path', async () => {
    const entity = makeEntity();
    const repository = {
      findById: jest.fn().mockResolvedValue(entity),
      save: jest.fn().mockResolvedValue(undefined),
      list: jest.fn(),
    };
    const eventPublisher = { publishUpdated: jest.fn(), publishCreated: jest.fn(), publishStatusChanged: jest.fn() };
    const cache = { invalidate: jest.fn(), getList: jest.fn(), setList: jest.fn() };
    const useCase = new ScheduleRadiologyStudyUseCase(repository as never, eventPublisher as never, cache as never);
    const result = await useCase.execute({
      organizationId: organizationId as never,
      actorId: actor.sub as never,
      actor,
      correlationId: 'corr',
      id: entity.id,
      payload: {},
    } as never);
    expect(result).toBeDefined();
    expect(repository.save).toHaveBeenCalled();
  });

  it('fails when entity not found', async () => {
    const repository = { findById: jest.fn().mockResolvedValue(null), save: jest.fn(), list: jest.fn() };
    const eventPublisher = { publishUpdated: jest.fn(), publishCreated: jest.fn(), publishStatusChanged: jest.fn() };
    const cache = { invalidate: jest.fn(), getList: jest.fn(), setList: jest.fn() };
    const useCase = new ScheduleRadiologyStudyUseCase(repository as never, eventPublisher as never, cache as never);
    await expect(
      useCase.execute({
        organizationId: organizationId as never,
        actorId: actor.sub as never,
        actor,
        correlationId: 'corr',
        id: '99999999-9999-4999-8999-999999999999' as never,
      } as never),
    ).rejects.toThrow();
  });
});
