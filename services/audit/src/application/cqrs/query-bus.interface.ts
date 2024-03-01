/**
 * CQRS query bus for audit service.
 */
import type { JwtAccessPayload, ListQuery } from '@medsphere/shared';

export interface AuditQuery {
  readonly actor: JwtAccessPayload;
  readonly organizationId: string;
  readonly listQuery?: ListQuery;
}

export interface QueryHandler<TQuery extends AuditQuery, TResult = unknown> {
  execute(query: TQuery): Promise<TResult>;
}

export interface QueryBus {
  ask<TQuery extends AuditQuery, TResult = unknown>(query: TQuery): Promise<TResult>;
}

export class InMemoryQueryBus implements QueryBus {
  private readonly handlers = new Map<string, QueryHandler<AuditQuery>>();

  register<TQuery extends AuditQuery>(
    queryName: string,
    handler: QueryHandler<TQuery>,
  ): void {
    this.handlers.set(queryName, handler as QueryHandler<AuditQuery>);
  }

  async ask<TQuery extends AuditQuery, TResult = unknown>(
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
