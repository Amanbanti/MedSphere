import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { AssignOwnerCommand } from '../commands/assign-owner.command';
import { PAYMENTTRANSACTION_REPOSITORY, type PaymentTransactionRepository } from '../../domain/repositories/payment-transaction.repository';
import { PaymentOrchestrator } from '../services/payment-orchestrator.service';
import { PaymentAccessPolicy } from '../../domain/policies/payment-access.policy';
import { PaymentTransactionMapper } from '../mappers/payment-transaction.mapper';

@Injectable()
export class AssignOwnerUseCase {
  constructor(
    @Inject(PAYMENTTRANSACTION_REPOSITORY) private readonly repository: PaymentTransactionRepository,
    private readonly orchestrator: PaymentOrchestrator,
  ) {}

  async execute(command: AssignOwnerCommand) {
    PaymentAccessPolicy.assertCanWrite(command.actor);
    PaymentAccessPolicy.assertTenantScope(command.actor, command.organizationId);

    return this.handleCommand(command);
  }

  private async handleCommand(command: AssignOwnerCommand) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.paymentTransactionId);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['assignOwner'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return PaymentTransactionMapper.toDto(entity);
  }

  private async handleQuery(command: AssignOwnerCommand) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => PaymentTransactionMapper.toListItem(e)),
      meta: result.meta,
    };
  }
}
