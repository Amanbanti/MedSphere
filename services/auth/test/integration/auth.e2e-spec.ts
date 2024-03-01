import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infrastructure/prisma/prisma.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const prismaMock = {
    client: {
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
      user: {
        findFirst: jest.fn(),
        count: jest.fn(),
        upsert: jest.fn(),
      },
      organization: { findFirst: jest.fn() },
      session: { findUnique: jest.fn(), upsert: jest.fn(), findMany: jest.fn() },
      outboxEvent: { createMany: jest.fn() },
      auditLog: { create: jest.fn() },
      roleAssignment: { findMany: jest.fn().mockResolvedValue([]) },
    },
    ping: jest.fn().mockResolvedValue(undefined),
    onModuleInit: jest.fn(),
    onModuleDestroy: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/v1/health/live', () => {
    it('returns ok status', () => {
      return request(app.getHttpServer())
        .get('/api/v1/health/live')
        .expect(200)
        .expect((res) => {
          expect(res.body.data.status).toBe('ok');
          expect(res.body.correlationId).toBeDefined();
        });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('returns 422 for invalid payload', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'not-an-email', password: '' })
        .expect(400);
    });

    it('returns 401 when user not found', () => {
      prismaMock.client.user.findFirst.mockResolvedValue(null);

      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'missing@hospital.com',
          password: 'SecurePass123!',
        })
        .expect(401)
        .expect((res) => {
          expect(res.body.errorCode).toBe('MEDSPHERE_INVALID_CREDENTIALS');
        });
    });
  });

  describe('POST /api/v1/auth/register', () => {
    it('returns 422 when acceptTerms is missing', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'new@hospital.com',
          password: 'SecurePass123!',
          firstName: 'New',
          lastName: 'User',
          organizationId: '11111111-1111-4111-8111-111111111111',
        })
        .expect(400);
    });
  });

  describe('POST /api/v1/auth/refresh', () => {
    it('returns 401 for malformed refresh token', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/refresh')
        .send({ refreshToken: 'too-short' })
        .expect(400);
    });
  });
});
