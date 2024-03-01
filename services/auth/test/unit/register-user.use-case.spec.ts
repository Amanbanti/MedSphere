import { RegisterUserUseCase } from '../../src/application/use-cases/register-user.use-case';
import { Organization } from '../../src/domain/entities/organization.entity';
import { ConflictError, NotFoundError } from '../../src/domain/errors/auth.errors';
import { OrganizationType, UserStatus } from '@medsphere/shared';

describe('RegisterUserUseCase', () => {
  const organizationId = '11111111-1111-4111-8111-111111111111';
  const correlationId = '22222222-2222-4222-8222-222222222222';

  const userRepo = {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findByEmailGlobal: jest.fn(),
    save: jest.fn(),
    existsByEmail: jest.fn(),
  };

  const orgRepo = {
    findById: jest.fn(),
    findBySlug: jest.fn(),
  };

  const outboxRepo = {
    append: jest.fn(),
    findPending: jest.fn(),
    markPublished: jest.fn(),
  };

  const auditRepo = {
    append: jest.fn(),
  };

  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new RegisterUserUseCase(
      userRepo as never,
      orgRepo as never,
      outboxRepo as never,
      auditRepo as never,
    );
  });

  it('registers a new user successfully', async () => {
    orgRepo.findById.mockResolvedValue(
      Organization.create({
        id: organizationId,
        name: 'Test Hospital',
        slug: 'test-hospital',
        type: OrganizationType.HOSPITAL,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        version: 1,
      }),
    );
    userRepo.existsByEmail.mockResolvedValue(false);
    userRepo.save.mockResolvedValue(undefined);
    outboxRepo.append.mockResolvedValue(undefined);
    auditRepo.append.mockResolvedValue(undefined);

    const result = await useCase.execute({
      email: 'doctor@hospital.com',
      password: 'SecurePass123!',
      firstName: 'Jane',
      lastName: 'Doe',
      organizationId,
      correlationId,
    });

    expect(result.email).toBe('doctor@hospital.com');
    expect(result.firstName).toBe('Jane');
    expect(result.status).toBe(UserStatus.PENDING_VERIFICATION);
    expect(userRepo.save).toHaveBeenCalledTimes(1);
    expect(outboxRepo.append).toHaveBeenCalledTimes(1);
    expect(auditRepo.append).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'USER_REGISTER', outcome: 'SUCCESS' }),
    );
  });

  it('throws when organization is not found', async () => {
    orgRepo.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({
        email: 'doctor@hospital.com',
        password: 'SecurePass123!',
        firstName: 'Jane',
        lastName: 'Doe',
        organizationId,
        correlationId,
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('throws when email already exists', async () => {
    orgRepo.findById.mockResolvedValue(
      Organization.create({
        id: organizationId,
        name: 'Test Hospital',
        slug: 'test-hospital',
        type: OrganizationType.HOSPITAL,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        version: 1,
      }),
    );
    userRepo.existsByEmail.mockResolvedValue(true);

    await expect(
      useCase.execute({
        email: 'existing@hospital.com',
        password: 'SecurePass123!',
        firstName: 'Jane',
        lastName: 'Doe',
        organizationId,
        correlationId,
      }),
    ).rejects.toBeInstanceOf(ConflictError);
  });
});
