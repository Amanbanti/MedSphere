/**
 * CQRS query bus for worker service.
 */
import type { JwtAccessPayload, ListQuery } from '@medsphere/shared';

export interface WorkerQuery {
  readonly actor: JwtAccessPayload;
  readonly organizationId: string;
  readonly listQuery?: ListQuery;
}

export interface QueryHandler<TQuery extends WorkerQuery, TResult = unknown> {
  execute(query: TQuery): Promise<TResult>;
}

export interface QueryBus {
  ask<TQuery extends WorkerQuery, TResult = unknown>(query: TQuery): Promise<TResult>;
}

export class InMemoryQueryBus implements QueryBus {
  private readonly handlers = new Map<string, QueryHandler<WorkerQuery>>();

  register<TQuery extends WorkerQuery>(
    queryName: string,
    handler: QueryHandler<TQuery>,
  ): void {
    this.handlers.set(queryName, handler as QueryHandler<WorkerQuery>);
  }

  async ask<TQuery extends WorkerQuery, TResult = unknown>(
    query: TQuery,
  ): Promise<TResult> {
    const name = query.constructor.name;
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(`No handler registered for query: ${name}`);
    }
    return handler.execute(query) as Promise<TResult>;
  }
}
