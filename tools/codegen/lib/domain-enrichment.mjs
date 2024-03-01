import { kebab, pascal, camel, repoToken } from './nest-templates.mjs';

export function genEntityDomainMethods(spec) {
  const methods = spec.useCases
    .filter((uc) => !uc.query && uc.verb !== 'list' && !uc.name.startsWith('List') && !uc.name.includes('Query') && !uc.name.includes('Search') && !uc.name.includes('Aggregate') && !uc.name.includes('GetQueue') && !uc.name.includes('GetWorker'))
    .map((uc) => {
      const methodName = uc.verb;
      if (methodName === 'register' || methodName === 'create' || methodName === 'book' || methodName === 'orderTest' || methodName === 'schedule' || methodName === 'store' || methodName === 'send' || methodName === 'recordEvent' || methodName === 'append' || methodName === 'index' || methodName === 'start' || methodName === 'enqueue' || methodName === 'process' || methodName === 'addInventory') {
        return null;
      }
      if (methodName === 'cancel' || methodName === 'deactivate' || methodName === 'suspend' || methodName === 'deleteFromIndex') {
        return `  ${methodName}(now: ISODateString, reason?: string): void {
    this.assertActive();
    this.softDelete(now);
  }`;
      }
      return `  ${methodName}(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ${JSON.stringify(spec.fields.map((f) => f.name))}) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }`;
    })
    .filter(Boolean);

  return methods.length ? '\n\n' + methods.join('\n\n') : '';
}

export function genAccessPolicy(spec) {
  return `import type { JwtAccessPayload, Permission, SystemRole } from '@medsphere/shared';
import { ForbiddenError } from '../errors/${spec.slug}.errors';

const READ_ROLES: SystemRole[] = ['DOCTOR', 'NURSE', 'RECEPTIONIST', 'ORG_ADMIN', 'SUPER_ADMIN'];
const WRITE_ROLES: SystemRole[] = ['DOCTOR', 'NURSE', 'ORG_ADMIN'];

export class ${pascal(spec.slug)}AccessPolicy {
  static assertCanRead(actor: JwtAccessPayload): void {
    if (!actor.roles.some((role) => READ_ROLES.includes(role))) {
      throw new ForbiddenError('Insufficient role to read ${spec.entity} resources');
    }
  }

  static assertCanWrite(actor: JwtAccessPayload): void {
    if (!actor.roles.some((role) => WRITE_ROLES.includes(role))) {
      throw new ForbiddenError('Insufficient role to modify ${spec.entity} resources');
    }
  }

  static assertTenantScope(actor: JwtAccessPayload, organizationId: string): void {
    if (actor.orgId !== organizationId) {
      throw new ForbiddenError('Cross-tenant access denied');
    }
  }

  static hasPermission(actor: JwtAccessPayload, permission: Permission): boolean {
    return actor.permissions.includes(permission);
  }
}
`;
}

export function genDomainRules(spec) {
  const rules = spec.fields
    .map((f) => {
      if (f.type === 'number') {
        return `  validate${pascal(f.name)}(value: number): void {
    if (!Number.isFinite(value)) {
      throw new ValidationError('${f.name} must be a finite number');
    }
  }`;
      }
      if (f.type === 'string') {
        return `  validate${pascal(f.name)}(value: string): void {
    if (!value?.trim()) {
      throw new ValidationError('${f.name} is required');
    }
  }`;
      }
      return null;
    })
    .filter(Boolean);

  return `import { ValidationError } from '../errors/${spec.slug}.errors';

export class ${pascal(spec.slug)}DomainRules {
${rules.join('\n\n')}

  validateOrganizationScope(organizationId: string, resourceOrganizationId: string): void {
    if (organizationId !== resourceOrganizationId) {
      throw new ValidationError('Organization scope mismatch');
    }
  }

  validateVersion(expected: number, actual: number): void {
    if (expected !== actual) {
      throw new ValidationError(\`Optimistic lock failure: expected version \${expected}, got \${actual}\`);
    }
  }

  sanitizePayload(payload: Record<string, unknown>): Record<string, unknown> {
    const allowed = new Set(${JSON.stringify(spec.fields.map((f) => f.name))});
    return Object.fromEntries(
      Object.entries(payload).filter(([key]) => allowed.has(key)),
    );
  }
}
`;
}

export function genOrchestrator(spec) {
  const token = repoToken(spec.entity);
  return `import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import { ${token}, type ${spec.entity}Repository } from '../../domain/repositories/${kebab(spec.entity)}.repository';
import { ${pascal(spec.slug)}DomainRules } from '../../domain/services/${spec.slug}-rules.service';
import { ${spec.entity} } from '../../domain/entities/${kebab(spec.entity)}.entity';
import { ${pascal(spec.slug)}NotFoundError } from '../../domain/errors/${spec.slug}.errors';

@Injectable()
export class ${pascal(spec.slug)}Orchestrator {
  private readonly rules = new ${pascal(spec.slug)}DomainRules();

  constructor(
    @Inject(${token}) private readonly repository: ${spec.entity}Repository,
  ) {}

  async getOrThrow(organizationId: UUID, id: UUID): Promise<${spec.entity}> {
    const entity = await this.repository.findById(organizationId, id);
    if (!entity) {
      throw new ${pascal(spec.slug)}NotFoundError(id);
    }
    entity.assertActive();
    return entity;
  }

  async list(organizationId: UUID, query: ListQuery) {
    return this.repository.list(organizationId, query);
  }

  async persist(entity: ${spec.entity}): Promise<void> {
    await this.repository.save(entity);
  }

  async applyMutation(
    organizationId: UUID,
    id: UUID,
    verb: string,
    payload: Record<string, unknown> = {},
  ): Promise<${spec.entity}> {
    const entity = await this.getOrThrow(organizationId, id);
    const now = nowIso();
    const sanitized = this.rules.sanitizePayload(payload);
    const handler = (entity as unknown as Record<string, (now: typeof now, payload?: Record<string, unknown>) => void>)[verb];
    if (typeof handler === 'function') {
      handler.call(entity, now, sanitized);
    } else {
      entity.touch(now);
    }
    await this.persist(entity);
    return entity;
  }
}
`;
}

export function genRequestDtos(spec) {
  const dtoClasses = spec.useCases
    .filter((uc) => uc.http !== 'GET')
    .map((uc) => {
      const className = `${uc.name}RequestDto`;
      return `export class ${className} {
${spec.fields.slice(0, 4).map((f) => `  ${f.name}${f.type.includes('null') ? '?' : ''}: ${f.type.includes('number') ? 'number' : 'string'};`).join('\n')}
  metadata?: Record<string, unknown>;
}`;
    })
    .join('\n\n');

  return `import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

${dtoClasses}
`;
}

export function genExceptionFilter(spec) {
  return `import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  ConflictError,
  DomainError,
  ForbiddenError,
  InvalidStateError,
  NotFoundError,
  ValidationError,
} from '../../domain/errors/${spec.slug}.errors';
import { errorBody } from '@medsphere/shared';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ correlationId?: string }>();

    const status = this.resolveStatus(exception);
    response.status(status).json(
      errorBody(
        {
          code: exception.name,
          message: exception.message,
        },
        request.correlationId,
      ),
    );
  }

  private resolveStatus(error: DomainError): number {
    if (error instanceof NotFoundError) return HttpStatus.NOT_FOUND;
    if (error instanceof ValidationError) return HttpStatus.UNPROCESSABLE_ENTITY;
    if (error instanceof ConflictError) return HttpStatus.CONFLICT;
    if (error instanceof ForbiddenError) return HttpStatus.FORBIDDEN;
    if (error instanceof InvalidStateError) return HttpStatus.BAD_REQUEST;
    return HttpStatus.BAD_REQUEST;
  }
}
`;
}

export function genCorrelationInterceptor() {
  return `import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import { CORRELATION_ID_HEADER } from '@medsphere/shared';
import { randomUUID } from 'crypto';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<
      Request & { correlationId?: string }
    >();

    const incoming = request.headers[CORRELATION_ID_HEADER];
    const correlationId =
      (typeof incoming === 'string' ? incoming : incoming?.[0]) ??
      randomUUID();

    request.correlationId = correlationId;
    request.headers[CORRELATION_ID_HEADER] = correlationId;

    return next.handle();
  }
}
`;
}

export function genEventPublisher(spec) {
  return `import { Injectable } from '@nestjs/common';
import { createDomainEvent, nowIso, type UUID } from '@medsphere/shared';
import { v4 as uuidv4 } from 'uuid';
import { ${snake(spec.slug).toUpperCase()}_EVENT_TYPES } from '../../domain/events/${spec.slug}.domain-events';

export interface PublishedEvent {
  eventType: string;
  aggregateId: UUID;
  payload: Record<string, unknown>;
}

@Injectable()
export class ${pascal(spec.slug)}EventPublisher {
  private readonly buffer: PublishedEvent[] = [];

  recordCreated(organizationId: UUID, aggregateId: UUID, actorId: UUID, payload: Record<string, unknown>): PublishedEvent {
    const envelope = createDomainEvent({
      eventId: uuidv4() as UUID,
      eventType: ${snake(spec.slug).toUpperCase()}_EVENT_TYPES.CREATED,
      occurredAt: nowIso(),
      organizationId,
      actorId,
      payload: { aggregateId, ...payload },
    });
    const event: PublishedEvent = {
      eventType: envelope.eventType,
      aggregateId,
      payload: envelope.payload as Record<string, unknown>,
    };
    this.buffer.push(event);
    return event;
  }

  recordUpdated(organizationId: UUID, aggregateId: UUID, actorId: UUID, payload: Record<string, unknown>): PublishedEvent {
    const envelope = createDomainEvent({
      eventId: uuidv4() as UUID,
      eventType: ${snake(spec.slug).toUpperCase()}_EVENT_TYPES.UPDATED,
      occurredAt: nowIso(),
      organizationId,
      actorId,
      payload: { aggregateId, ...payload },
    });
    const event: PublishedEvent = {
      eventType: envelope.eventType,
      aggregateId,
      payload: envelope.payload as Record<string, unknown>,
    };
    this.buffer.push(event);
    return event;
  }

  drain(): PublishedEvent[] {
    const events = [...this.buffer];
    this.buffer.length = 0;
    return events;
  }
}
`;
}

function snake(s) {
  return kebab(s).replace(/-/g, '_');
}

export function genListUseCaseTest(spec) {
  const listUc = spec.useCases.find((uc) => uc.query || uc.verb === 'list' || uc.name.startsWith('List'));
  if (!listUc) return null;
  const className = `${listUc.name}UseCase`;
  return `import { ${className} } from '../../src/application/use-cases/${kebab(listUc.name)}.use-case';
import { ${spec.entity} } from '../../src/domain/entities/${kebab(spec.entity)}.entity';

describe('${className} (list/query)', () => {
  const organizationId = '22222222-2222-4222-8222-222222222222' as const;

  it('returns paginated items', async () => {
    const now = new Date().toISOString();
    const entity = ${spec.entity}.register({
      id: '44444444-4444-4444-8444-444444444444' as never,
      organizationId: organizationId as never,
      now: now as never,
      ...(Object.fromEntries(
        ${JSON.stringify(spec.fields.map((f) => f.name))}.map((key) => {
          if (key.includes('status')) return [key, 'ACTIVE'];
          if (key.includes('At') || key === 'dateOfBirth' || key === 'dueDate' || key === 'effectiveFrom') return [key, now];
          if (key.includes('Cents') || key.includes('Minutes') || key.includes('Days') || key.includes('Count') || key === 'attempts' || key === 'dayOfWeek') return [key, 1];
          if (key === 'payload' || key === 'metadata' || key === 'tags') return [key, key === 'tags' ? [] : {}];
          if (key.includes('Id')) return [key, organizationId];
          return [key, 'sample-value'];
        }),
      ) as Record<string, unknown>),
    } as Parameters<typeof ${spec.entity}.register>[0]);

    const repository = {
      list: jest.fn().mockResolvedValue({
        items: [entity],
        meta: { page: 1, pageSize: 20, totalItems: 1, totalPages: 1, hasNext: false, hasPrevious: false },
      }),
    };

    const useCase = new ${className}(repository as never);
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
`;
}

export function genInMemoryChildRepos(spec) {
  return (spec.childEntities ?? []).map((child) => {
    const token = repoToken(child.name);
    return {
      path: `src/infrastructure/persistence/in-memory-${kebab(child.name)}.repository.ts`,
      content: `import { Injectable } from '@nestjs/common';
import type { UUID } from '@medsphere/shared';
import { ${child.name} } from '../../domain/entities/${kebab(child.name)}.entity';
import type { ${child.name}Repository } from '../../domain/repositories/${kebab(spec.entity)}.repository';

@Injectable()
export class InMemory${child.name}Repository implements ${child.name}Repository {
  private readonly store = new Map<string, ${child.name}>();

  private key(organizationId: UUID, id: UUID): string {
    return \`\${organizationId}:\${id}\`;
  }

  async save(record: ${child.name}): Promise<void> {
    this.store.set(this.key(record.organizationId, record.id), record);
  }

  async findById(organizationId: UUID, id: UUID): Promise<${child.name} | null> {
    return this.store.get(this.key(organizationId, id)) ?? null;
  }

  async listByParent(organizationId: UUID, parentId: UUID): Promise<${child.name}[]> {
    const fk = '${child.fields[0]?.name ?? 'patientId'}';
    return [...this.store.values()].filter(
      (item) => item.organizationId === organizationId && (item as unknown as Record<string, UUID>)[fk] === parentId,
    );
  }
}
`,
      token,
    };
  });
}

export function genIntegrationTest(spec) {
  return `import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { ${repoToken(spec.entity)} } from '../../src/domain/repositories/${kebab(spec.entity)}.repository';
import { InMemory${spec.entity}Repository } from '../../src/infrastructure/persistence/in-memory-${kebab(spec.entity)}.repository';

describe('${pascal(spec.slug)} integration', () => {
  let app: INestApplication;
  const organizationId = '22222222-2222-4222-8222-222222222222';
  const actorId = '11111111-1111-4111-8111-111111111111';

  beforeAll(async () => {
    process.env.USE_IN_MEMORY_REPO = 'true';
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(${repoToken(spec.entity)})
      .useClass(InMemory${spec.entity}Repository)
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
    const repo = app.get(${repoToken(spec.entity)});
    expect(repo).toBeInstanceOf(InMemory${spec.entity}Repository);
  });

  it('supports tenant-scoped persistence contract', async () => {
    const repo = app.get(${repoToken(spec.entity)}) as InMemory${spec.entity}Repository;
    const result = await repo.list(organizationId as never, { page: 1, pageSize: 10 });
    expect(result.meta.page).toBe(1);
    expect(Array.isArray(result.items)).toBe(true);
  });
});
`;
}

export function genServiceReadme(spec) {
  return `# ${pascal(spec.slug)} Service

${spec.description}

## Endpoints

Base path: \`/api/v1/${kebab(spec.entity)}s\`

${spec.useCases.map((uc) => `- \`${uc.http} ${uc.path || '/'}\` — ${uc.name}`).join('\n')}

## Development

\`\`\`bash
pnpm --filter ${servicePackageName(spec.slug)} dev
\`\`\`

## Testing

\`\`\`bash
pnpm --filter ${servicePackageName(spec.slug)} test
\`\`\`

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| \`PORT\` | ${spec.port} | HTTP port |
| \`USE_IN_MEMORY_REPO\` | false | Use in-memory persistence |
| \`SERVICE_NAME\` | ${spec.slug}-service | Logger service name |
`;
}

function servicePackageName(slug) {
  return `@medsphere/service-${slug}`;
}

export const enrichmentExports = true;
