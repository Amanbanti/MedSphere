import { NEST_SERVICES, SKIP_SERVICES } from './service-specs.mjs';
import { camel, kebab, pascal, writeFile } from './expansion-utils.mjs';

const EXTRA_USE_CASES = [
  { suffix: 'ArchiveRecord', verb: 'archive', http: 'POST', pathSuffix: '/:id/archive', query: false },
  { suffix: 'RestoreRecord', verb: 'restore', http: 'POST', pathSuffix: '/:id/restore', query: false },
  { suffix: 'BulkImport', verb: 'bulkImport', http: 'POST', pathSuffix: '/bulk/import', query: false },
  { suffix: 'ExportReport', verb: 'exportReport', http: 'GET', pathSuffix: '/export', query: true },
  { suffix: 'ValidateCompliance', verb: 'validateCompliance', http: 'POST', pathSuffix: '/:id/validate', query: false },
  { suffix: 'AssignOwner', verb: 'assignOwner', http: 'PATCH', pathSuffix: '/:id/owner', query: false },
  { suffix: 'SearchByCriteria', verb: 'searchByCriteria', http: 'GET', pathSuffix: '/search', query: true },
  { suffix: 'SyncExternalSystem', verb: 'syncExternal', http: 'POST', pathSuffix: '/:id/sync', query: false },
  { suffix: 'GenerateSummary', verb: 'generateSummary', http: 'GET', pathSuffix: '/:id/summary', query: true },
  { suffix: 'AuditTrail', verb: 'auditTrail', http: 'GET', pathSuffix: '/:id/audit-trail', query: true },
];

const SPECIFICATIONS = [
  { name: 'ActiveRecordSpecification', expr: 'entity.isActive() && !entity.isDeleted()' },
  { name: 'TenantScopedSpecification', expr: 'entity.organizationId === context.organizationId' },
  { name: 'VersionMatchSpecification', expr: 'entity.version === context.expectedVersion' },
  { name: 'WithinRetentionSpecification', expr: 'entity.createdAt >= context.retentionCutoff' },
  { name: 'AuthorizedActorSpecification', expr: 'context.actor.roles.length > 0' },
];

function genSpecification(spec, specDef) {
  return `import type { ${spec.entity} } from '../entities/${kebab(spec.entity)}.entity';

export interface ${specDef.name}Context {
  organizationId: string;
  expectedVersion?: number;
  retentionCutoff?: string;
  actor: { roles: string[]; permissions: string[] };
}

export class ${specDef.name} {
  isSatisfiedBy(entity: ${spec.entity}, context: ${specDef.name}Context): boolean {
    return ${specDef.expr};
  }

  and(other: ${specDef.name}): Composite${specDef.name} {
    return new Composite${specDef.name}([this, other]);
  }

  or(other: ${specDef.name}): Composite${specDef.name} {
    return new Composite${specDef.name}([this, other], 'or');
  }

  describe(): string {
    return '${specDef.name}';
  }
}

export class Composite${specDef.name} extends ${specDef.name} {
  constructor(
    private readonly specs: ${specDef.name}[],
    private readonly mode: 'and' | 'or' = 'and',
  ) {
    super();
  }

  override isSatisfiedBy(entity: ${spec.entity}, context: ${specDef.name}Context): boolean {
    if (this.mode === 'and') {
      return this.specs.every((s) => s.isSatisfiedBy(entity, context));
    }
    return this.specs.some((s) => s.isSatisfiedBy(entity, context));
  }
}
`;
}

function genFactory(spec) {
  const fields = spec.fields.slice(0, 6);
  return `import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { ${spec.entity} } from '../entities/${kebab(spec.entity)}.entity';

export interface ${spec.entity}FactoryInput {
  organizationId: UUID;
${fields.map((f) => `  ${f.name}${f.type.includes('null') ? '?' : ''}: ${mapTsType(f.type)};`).join('\n')}
  id?: UUID;
  now?: string;
}

export class ${spec.entity}Factory {
  static create(input: ${spec.entity}FactoryInput): ${spec.entity} {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return ${spec.entity}.register({
      id,
      organizationId: input.organizationId,
      now,
      ${fields.map((f) => `${f.name}: input.${f.name}${f.type.includes('null') ? ' ?? null' : ''},`).join('\n      ')}
    } as Parameters<typeof ${spec.entity}.register>[0]);
  }

  static reconstitute(props: Parameters<typeof ${spec.entity}.reconstitute>[0]): ${spec.entity} {
    return ${spec.entity}.reconstitute(props);
  }

  static clone(source: ${spec.entity}, overrides: Partial<${spec.entity}FactoryInput> = {}): ${spec.entity} {
    const snapshot = source.toSnapshot();
    return ${spec.entity}Factory.create({
      organizationId: snapshot.organizationId as UUID,
      ${fields.map((f) => `${f.name}: (overrides.${f.name} ?? snapshot.${f.name}) as ${mapTsType(f.type)},`).join('\n      ')}
      id: overrides.id,
      now: overrides.now,
    });
  }
}
`;
}

function mapTsType(type) {
  return type.replace('ISODateString', 'string').replace('UUID', 'UUID');
}

function genBuilder(spec) {
  const fields = spec.fields.slice(0, 8);
  return `import type { UUID } from '@medsphere/shared';
import { ${spec.entity}Factory, type ${spec.entity}FactoryInput } from '../factories/${kebab(spec.entity)}.factory';
import { ${spec.entity} } from '../entities/${kebab(spec.entity)}.entity';

export class ${spec.entity}Builder {
  private readonly input: Partial<${spec.entity}FactoryInput> = {};

  static create(): ${spec.entity}Builder {
    return new ${spec.entity}Builder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

${fields
  .map(
    (f) => `  with${pascal(f.name)}(${f.name}: ${mapTsType(f.type)}): this {
    this.input.${f.name} = ${f.name};
    return this;
  }`,
  )
  .join('\n\n')}

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): ${spec.entity} {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return ${spec.entity}Factory.create(this.input as ${spec.entity}FactoryInput);
  }
}
`;
}

function genUseCase(spec, ucDef) {
  const className = `${ucDef.suffix.replace('Record', spec.entity)}UseCase`;
  const commandName = `${ucDef.suffix.replace('Record', spec.entity)}Command`;
  const repoToken = `${spec.entity.toUpperCase()}_REPOSITORY`;
  return {
    useCase: `import { Injectable, Inject } from '@nestjs/common';
import { nowIso, type ListQuery, type UUID } from '@medsphere/shared';
import type { ${commandName} } from '../commands/${kebab(className.replace('UseCase', ''))}.command';
import { ${repoToken}, type ${spec.entity}Repository } from '../../domain/repositories/${kebab(spec.entity)}.repository';
import { ${pascal(spec.slug)}Orchestrator } from '../services/${spec.slug}-orchestrator.service';
import { ${pascal(spec.slug)}AccessPolicy } from '../../domain/policies/${spec.slug}-access.policy';
import { ${spec.entity}Mapper } from '../mappers/${kebab(spec.entity)}.mapper';

@Injectable()
export class ${className} {
  constructor(
    @Inject(${repoToken}) private readonly repository: ${spec.entity}Repository,
    private readonly orchestrator: ${pascal(spec.slug)}Orchestrator,
  ) {}

  async execute(command: ${commandName}) {
    ${pascal(spec.slug)}AccessPolicy.assertCanWrite(command.actor);
    ${pascal(spec.slug)}AccessPolicy.assertTenantScope(command.actor, command.organizationId);

    ${ucDef.query ? `return this.handleQuery(command);` : `return this.handleCommand(command);`}
  }

  private async handleCommand(command: ${commandName}) {
    const now = command.now ?? nowIso();
    const entity = await this.orchestrator.getOrThrow(command.organizationId, command.${camel(spec.entity)}Id);
    const handler = (entity as unknown as Record<string, (now: string, payload?: Record<string, unknown>) => void>)['${ucDef.verb}'];
    if (typeof handler === 'function') {
      handler.call(entity, now, command.payload ?? {});
    } else {
      entity.touch(now);
    }
    await this.repository.save(entity);
    return ${spec.entity}Mapper.toDto(entity);
  }

  private async handleQuery(command: ${commandName}) {
    const query: ListQuery = {
      page: command.page ?? 1,
      pageSize: command.pageSize ?? 25,
      search: command.search,
      filters: command.filters,
    };
    const result = await this.repository.list(command.organizationId, query);
    return {
      data: result.data.map((e) => ${spec.entity}Mapper.toListItem(e)),
      meta: result.meta,
    };
  }
}
`,
    command: `import type { FilterSpec, JwtAccessPayload, UUID } from '@medsphere/shared';

export class ${commandName} {
  constructor(
    readonly actor: JwtAccessPayload,
    readonly organizationId: UUID,
    readonly ${camel(spec.entity)}Id: UUID,
    readonly payload?: Record<string, unknown>,
    readonly now?: string,
    readonly page?: number,
    readonly pageSize?: number,
    readonly search?: string,
    readonly filters?: FilterSpec[],
  ) {}
}
`,
    test: `import { ${className} } from '../../src/application/use-cases/${kebab(className)}.use-case';
import { ${commandName} } from '../../src/application/commands/${kebab(className.replace('UseCase', ''))}.command';
import type { JwtAccessPayload, UUID } from '@medsphere/shared';

describe('${className}', () => {
  const actor = {
    sub: 'user-1' as UUID,
    orgId: 'org-1' as UUID,
    facilityIds: [],
    roles: ['ORG_ADMIN'],
    permissions: [],
    sessionId: 'sess-1' as UUID,
    mfaVerified: true,
    iat: 0,
    exp: 999999,
    iss: 'medsphere',
    aud: 'medsphere',
  } as JwtAccessPayload;

  const mockRepository = {
    findById: jest.fn(),
    list: jest.fn().mockResolvedValue({ data: [], meta: { page: 1, pageSize: 25, totalItems: 0, totalPages: 0, hasNext: false, hasPrevious: false } }),
    save: jest.fn(),
  };

  const mockOrchestrator = {
    getOrThrow: jest.fn().mockResolvedValue({
      touch: jest.fn(),
      assertActive: jest.fn(),
    }),
  };

  let useCase: ${className};

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new ${className}(mockRepository as never, mockOrchestrator as never);
  });

  it('executes ${ucDef.verb} for authorized actor', async () => {
    const command = new ${commandName}(
      actor,
      'org-1' as UUID,
      '${spec.entity.toLowerCase()}-1' as UUID,
      { reason: 'test' },
    );
    ${ucDef.query ? 'const result = await useCase.execute(command);' : 'await useCase.execute(command);'}
    ${ucDef.query ? 'expect(result).toBeDefined();' : 'expect(mockOrchestrator.getOrThrow).toHaveBeenCalled();'}
  });

  it('rejects cross-tenant access', async () => {
    const badActor = { ...actor, orgId: 'other-org' as UUID };
    const command = new ${commandName}(badActor, 'org-1' as UUID, 'id-1' as UUID);
    await expect(useCase.execute(command)).rejects.toThrow();
  });
});
`,
  };
}

function genCqrs(spec) {
  return {
    commandBus: `/**
 * CQRS command bus for ${spec.slug} service.
 */
import type { JwtAccessPayload } from '@medsphere/shared';

export interface ${pascal(spec.slug)}Command {
  readonly actor: JwtAccessPayload;
  readonly organizationId: string;
  readonly correlationId?: string;
}

export interface CommandHandler<TCommand extends ${pascal(spec.slug)}Command, TResult = unknown> {
  execute(command: TCommand): Promise<TResult>;
}

export interface CommandBus {
  dispatch<TCommand extends ${pascal(spec.slug)}Command, TResult = unknown>(
    command: TCommand,
  ): Promise<TResult>;
}

export class InMemoryCommandBus implements CommandBus {
  private readonly handlers = new Map<string, CommandHandler<${pascal(spec.slug)}Command>>();

  register<TCommand extends ${pascal(spec.slug)}Command>(
    commandName: string,
    handler: CommandHandler<TCommand>,
  ): void {
    this.handlers.set(commandName, handler as CommandHandler<${pascal(spec.slug)}Command>);
  }

  async dispatch<TCommand extends ${pascal(spec.slug)}Command, TResult = unknown>(
    command: TCommand,
  ): Promise<TResult> {
    const name = command.constructor.name;
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(\`No handler registered for command: \${name}\`);
    }
    return handler.execute(command) as Promise<TResult>;
  }
}
`,
    queryBus: `/**
 * CQRS query bus for ${spec.slug} service.
 */
import type { JwtAccessPayload, ListQuery } from '@medsphere/shared';

export interface ${pascal(spec.slug)}Query {
  readonly actor: JwtAccessPayload;
  readonly organizationId: string;
  readonly listQuery?: ListQuery;
}

export interface QueryHandler<TQuery extends ${pascal(spec.slug)}Query, TResult = unknown> {
  execute(query: TQuery): Promise<TResult>;
}

export interface QueryBus {
  ask<TQuery extends ${pascal(spec.slug)}Query, TResult = unknown>(query: TQuery): Promise<TResult>;
}

export class InMemoryQueryBus implements QueryBus {
  private readonly handlers = new Map<string, QueryHandler<${pascal(spec.slug)}Query>>();

  register<TQuery extends ${pascal(spec.slug)}Query>(
    queryName: string,
    handler: QueryHandler<TQuery>,
  ): void {
    this.handlers.set(queryName, handler as QueryHandler<${pascal(spec.slug)}Query>);
  }

  async ask<TQuery extends ${pascal(spec.slug)}Query, TResult = unknown>(
    query: TQuery,
  ): Promise<TResult> {
    const name = query.constructor.name;
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(\`No handler registered for query: \${name}\`);
    }
    return handler.execute(query) as Promise<TResult>;
  }
}
`,
  };
}

function genKafka(spec) {
  const topic = `medsphere.${spec.slug}.events.v1`;
  return {
    producer: `import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import type { DomainEventEnvelope } from '@medsphere/shared';

export interface KafkaProducerConfig {
  clientId: string;
  brokers: string[];
  ssl?: boolean;
}

@Injectable()
export class ${pascal(spec.slug)}KafkaProducer implements OnModuleDestroy {
  private readonly logger = new Logger(${pascal(spec.slug)}KafkaProducer.name);
  private connected = false;

  constructor(private readonly config: KafkaProducerConfig) {}

  async connect(): Promise<void> {
    this.connected = true;
    this.logger.log(\`Kafka producer connected: \${this.config.clientId}\`);
  }

  async publish<TPayload, TType extends string>(
    topic: string,
    event: DomainEventEnvelope<TPayload, TType>,
  ): Promise<void> {
    if (!this.connected) {
      await this.connect();
    }
    const key = event.organizationId;
    this.logger.debug(\`Publishing \${event.eventType} to \${topic} key=\${key}\`);
    // Production: kafkajs producer.send({ topic, messages: [{ key, value: JSON.stringify(event) }] })
  }

  async publishDomainEvent<TPayload, TType extends string>(
    event: DomainEventEnvelope<TPayload, TType>,
  ): Promise<void> {
    await this.publish('${topic}', event);
  }

  async onModuleDestroy(): Promise<void> {
    this.connected = false;
    this.logger.log('Kafka producer disconnected');
  }
}
`,
    consumer: `import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import type { DomainEventEnvelope } from '@medsphere/shared';

export type EventHandler<TPayload = unknown> = (
  event: DomainEventEnvelope<TPayload, string>,
) => Promise<void>;

export interface KafkaConsumerConfig {
  groupId: string;
  brokers: string[];
  topics: string[];
}

@Injectable()
export class ${pascal(spec.slug)}KafkaConsumer implements OnModuleInit {
  private readonly logger = new Logger(${pascal(spec.slug)}KafkaConsumer.name);
  private readonly handlers = new Map<string, EventHandler[]>();

  constructor(private readonly config: KafkaConsumerConfig) {}

  on(eventType: string, handler: EventHandler): void {
    const list = this.handlers.get(eventType) ?? [];
    list.push(handler);
    this.handlers.set(eventType, list);
  }

  async onModuleInit(): Promise<void> {
    this.logger.log(
      \`Kafka consumer subscribed group=\${this.config.groupId} topics=\${this.config.topics.join(',')}\`,
    );
  }

  async handleMessage(raw: string): Promise<void> {
    const event = JSON.parse(raw) as DomainEventEnvelope<unknown, string>;
    const handlers = this.handlers.get(event.eventType) ?? [];
    for (const handler of handlers) {
      await handler(event);
    }
  }

  registerDefaultHandlers(): void {
    this.on('${spec.slug}.created', async (event) => {
      this.logger.log(\`Handled \${event.eventType} id=\${event.eventId}\`);
    });
    this.on('${spec.slug}.updated', async (event) => {
      this.logger.log(\`Handled \${event.eventType} id=\${event.eventId}\`);
    });
  }
}
`,
  };
}

function genDomainSpecFile(spec) {
  const lines = [];
  for (let i = 0; i < 20; i++) {
    const field = spec.fields[i % spec.fields.length];
    lines.push(`  rule('${field.name}Required', (entity) => Boolean(entity.${field.name})).whenActive(),`);
  }
  return `/**
 * Domain specification registry for ${spec.slug}.
 */
import type { ${spec.entity} } from '../entities/${kebab(spec.entity)}.entity';

export type SpecPredicate = (entity: ${spec.entity}) => boolean;

export class DomainRule<TContext = Record<string, unknown>> {
  constructor(
    private readonly name: string,
    private readonly predicate: SpecPredicate,
    private active = true,
    private readonly context?: TContext,
  ) {}

  whenActive(): this {
    this.active = true;
    return this;
  }

  whenInactive(): this {
    this.active = false;
    return this;
  }

  evaluate(entity: ${spec.entity}): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class ${pascal(spec.slug)}DomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: ${spec.entity}): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): ${pascal(spec.slug)}DomainSpecification {
    const spec = new ${pascal(spec.slug)}DomainSpecification();
${lines.join('\n')}
    return spec;
  }
}
`;
}

export async function generateServiceExpansion(root, stats) {
  for (const spec of NEST_SERVICES) {
    if (SKIP_SERVICES.includes(spec.slug)) continue;

    for (const specDef of SPECIFICATIONS) {
      await writeFile(
        root,
        `services/${spec.slug}/src/domain/specifications/${kebab(specDef.name)}.ts`,
        genSpecification(spec, specDef),
        stats,
      );
    }

    await writeFile(
      root,
      `services/${spec.slug}/src/domain/specifications/${spec.slug}-domain-specification.ts`,
      genDomainSpecFile(spec),
      stats,
    );

    await writeFile(
      root,
      `services/${spec.slug}/src/domain/factories/${kebab(spec.entity)}.factory.ts`,
      genFactory(spec),
      stats,
    );

    await writeFile(
      root,
      `services/${spec.slug}/src/domain/builders/${kebab(spec.entity)}.builder.ts`,
      genBuilder(spec),
      stats,
    );

    const cqrs = genCqrs(spec);
    await writeFile(root, `services/${spec.slug}/src/application/cqrs/command-bus.interface.ts`, cqrs.commandBus, stats);
    await writeFile(root, `services/${spec.slug}/src/application/cqrs/query-bus.interface.ts`, cqrs.queryBus, stats);

    const kafka = genKafka(spec);
    await writeFile(
      root,
      `services/${spec.slug}/src/infrastructure/messaging/kafka-producer.adapter.ts`,
      kafka.producer,
      stats,
    );
    await writeFile(
      root,
      `services/${spec.slug}/src/infrastructure/messaging/kafka-consumer.adapter.ts`,
      kafka.consumer,
      stats,
    );

    const useCaseExports = [];
    for (const ucDef of EXTRA_USE_CASES) {
      const className = `${ucDef.suffix.replace('Record', spec.entity)}UseCase`;
      const generated = genUseCase(spec, ucDef);
      const baseName = kebab(className.replace(/UseCase$/, ''));

      await writeFile(root, `services/${spec.slug}/src/application/use-cases/${baseName}.use-case.ts`, generated.useCase, stats);
      await writeFile(root, `services/${spec.slug}/src/application/commands/${baseName}.command.ts`, generated.command, stats);
      await writeFile(root, `services/${spec.slug}/test/unit/${baseName}.spec.ts`, generated.test, stats);
      useCaseExports.push(`export * from './${baseName}.use-case';`);
    }

    await writeFile(
      root,
      `services/${spec.slug}/src/application/use-cases/expansion.index.ts`,
      useCaseExports.join('\n') + '\n',
      stats,
    );
  }
}
