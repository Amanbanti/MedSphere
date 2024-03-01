import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PATIENT_REPOSITORY } from '../../src/domain/repositories/patient.repository';
import { InMemoryPatientRepository } from '../../src/infrastructure/persistence/in-memory-patient.repository';

describe('Patient integration', () => {
  let app: INestApplication;
  const organizationId = '22222222-2222-4222-8222-222222222222';
  const actorId = '11111111-1111-4111-8111-111111111111';

  beforeAll(async () => {
    process.env.USE_IN_MEMORY_REPO = 'true';
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PATIENT_REPOSITORY)
      .useClass(InMemoryPatientRepository)
      .compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('bootstraps application module', () => {
    expect(app).toBeDefined();
  });

  it('wires repository token', () => {
    const repo = app.get(PATIENT_REPOSITORY);
    expect(repo).toBeInstanceOf(InMemoryPatientRepository);
  });

  it('supports tenant-scoped persistence contract', async () => {
    const repo = app.get(PATIENT_REPOSITORY) as InMemoryPatientRepository;
    const result = await repo.list(organizationId as never, { page: 1, pageSize: 10 });
    expect(result.meta.page).toBe(1);
    expect(Array.isArray(result.items)).toBe(true);
  });
});
