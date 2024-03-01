import { ListNotificationInboxUseCase } from '../../src/application/use-cases/list-notification-inbox.use-case';
import { Notification } from '../../src/domain/entities/notification.entity';

describe('ListNotificationInboxUseCase (list/query)', () => {
  const organizationId = '22222222-2222-4222-8222-222222222222' as const;

  it('returns paginated items', async () => {
    const now = new Date().toISOString();
    const entity = Notification.register({
      id: '44444444-4444-4444-8444-444444444444' as never,
      organizationId: organizationId as never,
      now: now as never,
      ...(Object.fromEntries(
        ["recipientId","channel","subject","body","status","sentAt","readAt"].map((key) => {
          if (key.includes('status')) return [key, 'ACTIVE'];
          if (key.includes('At') || key === 'dateOfBirth' || key === 'dueDate' || key === 'effectiveFrom') return [key, now];
          if (key.includes('Cents') || key.includes('Minutes') || key.includes('Days') || key.includes('Count') || key === 'attempts' || key === 'dayOfWeek') return [key, 1];
          if (key === 'payload' || key === 'metadata' || key === 'tags') return [key, key === 'tags' ? [] : {}];
          if (key.includes('Id')) return [key, organizationId];
          return [key, 'sample-value'];
        }),
      ) as Record<string, unknown>),
    } as Parameters<typeof Notification.register>[0]);

    const repository = {
      list: jest.fn().mockResolvedValue({
        items: [entity],
        meta: { page: 1, pageSize: 20, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      }),
    };

    const useCase = new ListNotificationInboxUseCase(repository as never);
    const result = await useCase.execute({
      organizationId: organizationId as never,
      actorId: '11111111-1111-4111-8111-111111111111' as never,
      correlationId: 'corr',
      query: { page: 1, pageSize: 20 },
    } as never);

    expect(result.items).toHaveLength(1);
    expect(repository.list).toHaveBeenCalled();
  });
});
