import { mkdir, writeFile, stat, readdir } from 'node:fs/promises';
import path from 'node:path';
import {
  genAccessPolicy,
  genCorrelationInterceptor,
  genDomainRules,
  genEntityDomainMethods,
  genEventPublisher,
  genExceptionFilter,
  genInMemoryChildRepos,
  genIntegrationTest,
  genListUseCaseTest,
  genOrchestrator,
  genRequestDtos,
  genServiceReadme,
} from './domain-enrichment.mjs';

const SHARED_ENUMS = new Set([
  'Gender',
  'AppointmentStatus',
  'AuditOutcome',
  'BloodType',
  'MaritalStatus',
  'EncounterStatus',
  'ClinicalNoteType',
  'UserStatus',
]);

export function pascal(s) {
  return s.replace(/(^\w|-\w)/g, (m) => m.replace('-', '').toUpperCase());
}

export function camel(s) {
  const p = pascal(s);
  return p.charAt(0).toLowerCase() + p.slice(1);
}

export function kebab(s) {
  return s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function snake(s) {
  return kebab(s).replace(/-/g, '_');
}

export async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

export async function writeGenerated(root, relPath, content, stats) {
  const full = path.join(root, relPath);
  await ensureDir(path.dirname(full));
  await writeFile(full, content, 'utf8');
  const lines = content.split('\n').length;
  stats.files += 1;
  stats.lines += lines;
  stats.paths.push(relPath);
}

export function servicePackageName(slug) {
  return `@medsphere/service-${slug}`;
}

export function repoToken(entity) {
  return `${snake(entity).toUpperCase()}_REPOSITORY`;
}

export function entityPropsInterface(entity, fields) {
  const base = [
    '  id: UUID;',
    '  organizationId: UUID;',
    ...fields.map((f) => `  ${f.name}: ${f.type};`),
    '  createdAt: ISODateString;',
    '  updatedAt: ISODateString;',
    '  deletedAt: ISODateString | null;',
    '  version: number;',
  ];
  return base.join('\n');
}

export function entityDefaults(fields) {
  return fields
    .map((f) => {
      if (f.type.includes('null')) return `      ${f.name}: input.${f.name} ?? null,`;
      if (f.type === 'number') return `      ${f.name}: input.${f.name},`;
      if (f.type === 'string[]') return `      ${f.name}: input.${f.name} ?? [],`;
      if (f.type.startsWith('Record')) return `      ${f.name}: input.${f.name} ?? {},`;
      if (f.enum) return `      ${f.name}: input.${f.name},`;
      return `      ${f.name}: input.${f.name},`;
    })
    .join('\n');
}

export function genLocalEnums(spec) {
  const enums = spec.fields.filter((f) => f.enum && !SHARED_ENUMS.has(f.type));
  if (!enums.length) return null;
  const body = enums
    .map(
      (f) => `export enum ${f.type} {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}`,
    )
    .join('\n\n');
  return body;
}

export function genEntity(spec) {
  const { entity, fields } = spec;
  const sharedEnums = [...new Set(fields.filter((f) => f.enum && SHARED_ENUMS.has(f.type)).map((f) => f.type))];
  const localEnums = [...new Set(fields.filter((f) => f.enum && !SHARED_ENUMS.has(f.type)).map((f) => f.type))];
  const sharedImport = sharedEnums.length ? `, ${sharedEnums.join(', ')}` : '';
  const localImport = localEnums.length
    ? `\nimport { ${localEnums.join(', ')} } from '../enums/${spec.slug}.enums';`
    : '';
  const domainMethods = genEntityDomainMethods(spec);
  return `import type { ISODateString, UUID${sharedImport} } from '@medsphere/shared';${localImport}
import { ConflictError, InvalidStateError } from '../errors/${spec.slug}.errors';

export interface ${entity}Props {
${entityPropsInterface(entity, fields)}
}

export class ${entity} {
  private readonly props: ${entity}Props;

  private constructor(props: ${entity}Props) {
    this.props = { ...props };
  }

  static create(props: ${entity}Props): ${entity} {
    return new ${entity}(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
${fields.map((f) => `    ${f.name}: ${f.type};`).join('\n')}
  }): ${entity} {
    return new ${entity}({
      id: input.id,
      organizationId: input.organizationId,
${entityDefaults(fields)}
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

${fields.map((f) => `  get ${f.name}(): ${f.type} {
    return this.props.${f.name};
  }`).join('\n\n')}

  get id(): UUID {
    return this.props.id;
  }

  get organizationId(): UUID {
    return this.props.organizationId;
  }

  get createdAt(): ISODateString {
    return this.props.createdAt;
  }

  get updatedAt(): ISODateString {
    return this.props.updatedAt;
  }

  get deletedAt(): ISODateString | null {
    return this.props.deletedAt;
  }

  get version(): number {
    return this.props.version;
  }

  isDeleted(): boolean {
    return this.props.deletedAt !== null;
  }

  assertActive(): void {
    if (this.isDeleted()) {
      throw new InvalidStateError('${entity} has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('${entity} is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): ${entity}Props {
    return { ...this.props };
  }${domainMethods}
}
`;
}

export function genChildEntity(spec, child) {
  return `import type { ISODateString, UUID } from '@medsphere/shared';

export interface ${child.name}Props {
  id: UUID;
  organizationId: UUID;
${child.fields.map((f) => `  ${f.name}: ${f.type};`).join('\n')}
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export class ${child.name} {
  private readonly props: ${child.name}Props;

  private constructor(props: ${child.name}Props) {
    this.props = { ...props };
  }

  static create(props: ${child.name}Props): ${child.name} {
    return new ${child.name}(props);
  }

  static record(input: Omit<${child.name}Props, 'createdAt' | 'updatedAt'> & { now: ISODateString }): ${child.name} {
    return new ${child.name}({
      ...input,
      createdAt: input.now,
      updatedAt: input.now,
    });
  }

${child.fields.map((f) => `  get ${f.name}(): ${f.type} {
    return this.props.${f.name};
  }`).join('\n\n')}

  get id(): UUID {
    return this.props.id;
  }

  get organizationId(): UUID {
    return this.props.organizationId;
  }

  toProps(): ${child.name}Props {
    return { ...this.props };
  }
}
`;
}

export function genErrors(spec) {
  return `export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends DomainError {}
export class ConflictError extends DomainError {}
export class ValidationError extends DomainError {}
export class InvalidStateError extends DomainError {}
export class ForbiddenError extends DomainError {}

export class ${pascal(spec.slug)}NotFoundError extends NotFoundError {
  constructor(id: string) {
    super(\`${spec.entity} not found: \${id}\`);
  }
}

export class ${pascal(spec.slug)}ConflictError extends ConflictError {
  constructor(reason: string) {
    super(reason);
  }
}
`;
}

export function genRepositoryPort(spec) {
  const token = repoToken(spec.entity);
  const childRepos = (spec.childEntities ?? []).map((c) => {
    const childToken = repoToken(c.name);
    return `
export const ${childToken} = Symbol('${childToken}');

export interface ${c.name}Repository {
  save(record: import('../entities/${kebab(c.name)}.entity').${c.name}): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<import('../entities/${kebab(c.name)}.entity').${c.name} | null>;
  listByParent(organizationId: UUID, parentId: UUID): Promise<import('../entities/${kebab(c.name)}.entity').${c.name}[]>;
}
`;
  });

  return `import type { UUID } from '@medsphere/shared';
import type { ${spec.entity} } from '../entities/${kebab(spec.entity)}.entity';
import type { ListQuery, PaginatedResult } from '@medsphere/shared';

export const ${token} = Symbol('${token}');

export interface ${spec.entity}Repository {
  save(entity: ${spec.entity}): Promise<void>;
  findById(organizationId: UUID, id: UUID): Promise<${spec.entity} | null>;
  list(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<${spec.entity}>>;
  existsByBusinessKey?(organizationId: UUID, key: string): Promise<boolean>;
}
${childRepos.join('\n')}
`;
}

export function genDomainEvents(spec) {
  return `export const ${snake(spec.slug).toUpperCase()}_EVENT_TYPES = {
  CREATED: '${spec.slug.toUpperCase()}.CREATED',
  UPDATED: '${spec.slug.toUpperCase()}.UPDATED',
  DELETED: '${spec.slug.toUpperCase()}.DELETED',
} as const;

export type ${pascal(spec.slug)}EventType =
  (typeof ${snake(spec.slug).toUpperCase()}_EVENT_TYPES)[keyof typeof ${snake(spec.slug).toUpperCase()}_EVENT_TYPES];
`;
}

export function genCommand(uc, spec) {
  const cmd = kebab(uc.name.replace(/UseCase$/, '').replace(spec.entity, '')).replace(/^-/, '') || kebab(uc.name);
  return `import type { UUID, ISODateString, ListQuery } from '@medsphere/shared';

export interface ${uc.name.replace(/UseCase$/, '')}Command {
  organizationId: UUID;
  actorId: UUID;
  correlationId: string;
${uc.query ? '  query?: ListQuery;' : ''}
${uc.path?.includes(':id') ? '  id?: UUID;' : ''}
${uc.path?.includes(':patientId') ? '  patientId?: UUID;' : ''}
${uc.path?.includes(':doctorId') ? '  doctorId?: UUID;' : ''}
${uc.path?.includes(':recipientId') ? '  recipientId?: UUID;' : ''}
${uc.path?.includes(':ndcCode') ? '  ndcCode?: string;' : ''}
  payload?: Record<string, unknown>;
  now?: ISODateString;
}
`;
}

export function genUseCase(uc, spec) {
  const cmdName = `${uc.name.replace(/UseCase$/, '')}Command`;
  const token = repoToken(spec.entity);
  const className = uc.name.endsWith('UseCase') ? uc.name : `${uc.name}UseCase`;
  const isList = uc.verb === 'list' || uc.name.startsWith('List') || uc.name.includes('Query') || uc.name.includes('Search') || uc.name.includes('Aggregate') || uc.name.includes('GetQueue') || uc.name.includes('GetWorker') || uc.name.includes('GetInsurance') || uc.name.includes('CheckPharmacy') || uc.name.includes('Retrieve');

  const logic = isList
    ? `    const query = command.query ?? {};
    const result = await this.repository.list(command.organizationId, query);
    return {
      items: result.items.map((item) => ${spec.entity}Mapper.toDto(item)),
      meta: result.meta,
    };`
    : uc.verb === 'getById' || uc.verb === 'getProfile' || uc.verb === 'getOrder' || uc.verb === 'retrieve' || uc.verb === 'getById'
      ? `    if (!command.id) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) {
      throw new ${pascal(spec.slug)}NotFoundError(command.id);
    }
    return ${spec.entity}Mapper.toDto(entity);`
      : uc.verb === 'register' || uc.verb === 'create' || uc.verb === 'book' || uc.verb === 'orderTest' || uc.verb === 'schedule' || uc.verb === 'store' || uc.verb === 'send' || uc.verb === 'recordEvent' || uc.verb === 'append' || uc.verb === 'index' || uc.verb === 'start' || uc.verb === 'enqueue' || uc.verb === 'process' || uc.verb === 'addInventory'
        ? `    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = ${spec.entity}.register({
      id,
      organizationId: command.organizationId,
      now,
      ...(command.payload as Record<string, never>),
    } as Parameters<typeof ${spec.entity}.register>[0]);
    await this.repository.save(entity);
    return ${spec.entity}Mapper.toDto(entity);`
        : uc.verb === 'cancel' || uc.verb === 'deactivate' || uc.verb === 'suspend' || uc.verb === 'deleteFromIndex'
          ? `    if (!command.id) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) {
      throw new ${pascal(spec.slug)}NotFoundError(command.id);
    }
    const now = command.now ?? nowIso();
    entity.softDelete(now);
    await this.repository.save(entity);
    return { success: true, id: entity.id };`
          : `    if (!command.id && !command.payload) {
      throw new ValidationError('id or payload is required');
    }
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (!targetId) {
      throw new ValidationError('id is required');
    }
    const entity = await this.repository.findById(command.organizationId, targetId);
    if (!entity) {
      throw new ${pascal(spec.slug)}NotFoundError(targetId);
    }
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    return ${spec.entity}Mapper.toDto(entity);`;

  return `import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ${cmdName} } from '../commands/${kebab(uc.name.replace(/UseCase$/, ''))}.command';
import { ${token}, type ${spec.entity}Repository } from '../../domain/repositories/${kebab(spec.entity)}.repository';
import { ${spec.entity} } from '../../domain/entities/${kebab(spec.entity)}.entity';
import {
  ${pascal(spec.slug)}NotFoundError,
  ValidationError,
} from '../../domain/errors/${spec.slug}.errors';
import { ${spec.entity}Mapper } from '../mappers/${kebab(spec.entity)}.mapper';

@Injectable()
export class ${className} {
  constructor(
    @Inject(${token}) private readonly repository: ${spec.entity}Repository,
  ) {}

  async execute(command: ${cmdName}) {
${logic}
  }
}
`;
}

export function genMapper(spec) {
  const { entity, fields } = spec;
  return `import type { ${entity} } from '../../domain/entities/${kebab(entity)}.entity';

export interface ${entity}Dto {
  id: string;
  organizationId: string;
${fields.map((f) => `  ${f.name}: ${f.type.replace('UUID', 'string').replace('ISODateString', 'string')};`).join('\n')}
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class ${entity}Mapper {
  static toDto(entity: ${entity}): ${entity}Dto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
${fields.map((f) => `      ${f.name}: entity.${f.name},`).join('\n')}
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}
`;
}

export function genInMemoryRepo(spec) {
  const token = repoToken(spec.entity);
  return `import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { ${spec.entity} } from '../../domain/entities/${kebab(spec.entity)}.entity';
import type { ${spec.entity}Repository } from '../../domain/repositories/${kebab(spec.entity)}.repository';

@Injectable()
export class InMemory${spec.entity}Repository implements ${spec.entity}Repository {
  private readonly store = new Map<string, ${spec.entity}>();

  private key(organizationId: UUID, id: UUID): string {
    return \`\${organizationId}:\${id}\`;
  }

  async save(entity: ${spec.entity}): Promise<void> {
    this.store.set(this.key(entity.organizationId, entity.id), entity);
  }

  async findById(organizationId: UUID, id: UUID): Promise<${spec.entity} | null> {
    return this.store.get(this.key(organizationId, id)) ?? null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<${spec.entity}>> {
    const normalized = normalizeListQuery(query);
    const items = [...this.store.values()].filter(
      (e) => e.organizationId === organizationId && !e.isDeleted(),
    );
    const totalItems = items.length;
    const start = (normalized.page - 1) * normalized.pageSize;
    const slice = items.slice(start, start + normalized.pageSize);
    return {
      items: slice,
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}
`;
}

export function genPrismaRepo(spec) {
  return `import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { ${spec.entity} } from '../../domain/entities/${kebab(spec.entity)}.entity';
import type { ${spec.entity}Repository } from '../../domain/repositories/${kebab(spec.entity)}.repository';
import { PrismaService } from '../prisma/prisma.service';
import { InMemory${spec.entity}Repository } from './in-memory-${kebab(spec.entity)}.repository';

@Injectable()
export class Prisma${spec.entity}Repository implements ${spec.entity}Repository {
  private readonly fallback = new InMemory${spec.entity}Repository();

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: ${spec.entity}): Promise<void> {
    const client = this.prisma.client as Record<string, { upsert?: Function } | undefined>;
    const model = client.${camel(spec.prismaModel)};
    if (!model?.upsert) {
      return this.fallback.save(entity);
    }
    const props = entity.toProps();
    await model.upsert({
      where: { id: props.id },
      create: props,
      update: props,
    });
  }

  async findById(organizationId: UUID, id: UUID): Promise<${spec.entity} | null> {
    const client = this.prisma.client as Record<string, { findFirst?: Function } | undefined>;
    const model = client.${camel(spec.prismaModel)};
    if (!model?.findFirst) {
      return this.fallback.findById(organizationId, id);
    }
    const row = await model.findFirst({ where: { id, organizationId, deletedAt: null } });
    return row ? ${spec.entity}.create(row as Parameters<typeof ${spec.entity}.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<${spec.entity}>> {
    const client = this.prisma.client as Record<string, { findMany?: Function; count?: Function } | undefined>;
    const model = client.${camel(spec.prismaModel)};
    if (!model?.findMany || !model?.count) {
      return this.fallback.list(organizationId, query);
    }
    const normalized = normalizeListQuery(query);
    const where = { organizationId, deletedAt: null };
    const [rows, totalItems] = await Promise.all([
      model.findMany({
        where,
        skip: (normalized.page - 1) * normalized.pageSize,
        take: normalized.pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      model.count({ where }),
    ]);
    return {
      items: rows.map((row: Parameters<typeof ${spec.entity}.create>[0]) => ${spec.entity}.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }
}
`;
}

export function genPrismaService() {
  return `import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createPrismaClient } from '@medsphere/database';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  readonly client = createPrismaClient();

  async onModuleInit(): Promise<void> {
    await this.client.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect();
  }

  async ping(): Promise<boolean> {
    try {
      await this.client.$queryRaw\`SELECT 1\`;
      return true;
    } catch {
      return false;
    }
  }
}
`;
}

export function genConfig(spec) {
  return `import { registerAs } from '@nestjs/config';

export interface ${pascal(spec.slug)}Config {
  port: number;
  serviceName: string;
}

export const ${camel(spec.slug)}ConfigFactory = registerAs('${spec.slug}', (): ${pascal(spec.slug)}Config => ({
  port: parseInt(process.env.PORT ?? '${spec.port}', 10),
  serviceName: process.env.SERVICE_NAME ?? '${spec.slug}-service',
}));
`;
}

export function genController(spec) {
  const routes = spec.useCases
    .map((uc) => {
      const method = uc.http.toLowerCase();
      const handler = camel(uc.name.replace(/UseCase$/, ''));
      const path = uc.path ?? '';
      const decorator =
        method === 'get'
          ? '@Get'
          : method === 'post'
            ? '@Post'
            : method === 'patch'
              ? '@Patch'
              : method === 'put'
                ? '@Put'
                : '@Delete';
      const paramExtract = [];
      if (path.includes(':id')) paramExtract.push("@Param('id') id: string");
      if (path.includes(':patientId')) paramExtract.push("@Param('patientId') patientId: string");
      if (path.includes(':doctorId')) paramExtract.push("@Param('doctorId') doctorId: string");
      if (path.includes(':recipientId')) paramExtract.push("@Param('recipientId') recipientId: string");
      if (path.includes(':ndcCode')) paramExtract.push("@Param('ndcCode') ndcCode: string");
      const bodyParam = method === 'get' ? '' : '@Body() body: Record<string, unknown>,';
      const queryParam = uc.query || method === 'get' ? '@Query() query: Record<string, unknown>,' : '';
      return `  ${decorator}('${path}')
  async ${handler}(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    ${paramExtract.join(',\n    ')}${paramExtract.length ? ',' : ''}
    ${bodyParam}
    ${queryParam}
  ) {
    const result = await this.${camel(uc.name)}UseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      ${path.includes(':id') ? 'id: id as UUID,' : ''}
      ${path.includes(':patientId') ? 'patientId: patientId as UUID,' : ''}
      ${path.includes(':doctorId') ? 'doctorId: doctorId as UUID,' : ''}
      ${path.includes(':recipientId') ? 'recipientId: recipientId as UUID,' : ''}
      ${path.includes(':ndcCode') ? 'ndcCode,' : ''}
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }`;
    })
    .join('\n\n');

  const imports = spec.useCases
    .map((uc) => `import { ${uc.name}UseCase } from '../../application/use-cases/${kebab(uc.name)}.use-case';`)
    .join('\n');

  const ctorParams = spec.useCases
    .map((uc) => `private readonly ${camel(uc.name)}UseCase: ${uc.name}UseCase`)
    .join(',\n    ');

  return `import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
${imports}

@Controller('${kebab(spec.entity)}s')
export class ${spec.entity}Controller {
  constructor(
    ${ctorParams},
  ) {}

${routes}
}
`;
}

export function genHealthController(spec) {
  return `import { Controller, Get } from '@nestjs/common';
import { Public, CorrelationId } from '@medsphere/auth-sdk';
import { HealthRegistry, createPostgresHealthIndicator } from '@medsphere/monitoring-sdk';
import { successBody } from '@medsphere/shared';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Controller('health')
export class HealthController {
  private readonly registry: HealthRegistry;

  constructor(private readonly prisma: PrismaService) {
    this.registry = new HealthRegistry(
      process.env.SERVICE_NAME ?? '${spec.slug}-service',
      process.env.npm_package_version ?? '0.1.0',
    );
    this.registry.register(
      'postgres',
      createPostgresHealthIndicator(() => this.prisma.ping()),
    );
  }

  @Public()
  @Get()
  async check(@CorrelationId() correlationId: string) {
    const data = await this.registry.check();
    return successBody(data, correlationId);
  }

  @Public()
  @Get('live')
  live(@CorrelationId() correlationId: string) {
    return successBody({ status: 'ok' }, correlationId);
  }

  @Public()
  @Get('ready')
  async ready(@CorrelationId() correlationId: string) {
    const data = await this.registry.check();
    return successBody(data, correlationId);
  }
}
`;
}

export function genModule(spec) {
  const token = repoToken(spec.entity);
  const useCaseProviders = spec.useCases.map((uc) => `${uc.name}UseCase`).join(',\n    ');
  const childImports = (spec.childEntities ?? [])
    .map(
      (c) =>
        `import { InMemory${c.name}Repository } from '../infrastructure/persistence/in-memory-${kebab(c.name)}.repository';`,
    )
    .join('\n');
  const childProviders = (spec.childEntities ?? []).map((c) => {
    const childToken = repoToken(c.name);
    return `{ provide: ${childToken}, useClass: InMemory${c.name}Repository }`;
  });
  const childBlock = childProviders.length ? `\n    ${childProviders.join(',\n    ')},` : '';
  return `import { Module } from '@nestjs/common';
import { ${spec.entity}Controller } from '../presentation/http/${kebab(spec.entity)}.controller';
import { ${token} } from '../domain/repositories/${kebab(spec.entity)}.repository';
import { InMemory${spec.entity}Repository } from '../infrastructure/persistence/in-memory-${kebab(spec.entity)}.repository';
import { Prisma${spec.entity}Repository } from '../infrastructure/persistence/prisma-${kebab(spec.entity)}.repository';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { ${pascal(spec.slug)}Orchestrator } from '../application/services/${spec.slug}-orchestrator.service';
import { ${pascal(spec.slug)}EventPublisher } from '../infrastructure/messaging/${spec.slug}-event.publisher';
${childImports}
import {
  ${useCaseProviders},
} from '../application/use-cases';

@Module({
  controllers: [${spec.entity}Controller],
  providers: [
    PrismaService,
    InMemory${spec.entity}Repository,
    ${pascal(spec.slug)}Orchestrator,
    ${pascal(spec.slug)}EventPublisher,${childBlock}
    {
      provide: ${token},
      useClass: process.env.USE_IN_MEMORY_REPO === 'true'
        ? InMemory${spec.entity}Repository
        : Prisma${spec.entity}Repository,
    },
    ${useCaseProviders},
  ],
  exports: [${token}, ${pascal(spec.slug)}Orchestrator],
})
export class ${pascal(spec.slug)}Module {}
`;
}

export function genUseCasesBarrel(spec) {
  return spec.useCases
    .map((uc) => `export * from './${kebab(uc.name)}.use-case';`)
    .join('\n');
}

export function genAppModule(spec) {
  return `import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ${pascal(spec.slug)}Module } from './modules/${spec.slug}.module';
import { HealthModule } from './modules/health.module';
import { ${camel(spec.slug)}ConfigFactory } from './infrastructure/config/${spec.slug}.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [${camel(spec.slug)}ConfigFactory],
    }),
    ${pascal(spec.slug)}Module,
    HealthModule,
  ],
})
export class AppModule {}
`;
}

export function genMain(spec) {
  return `import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { createLogger, NestMedSphereLogger } from '@medsphere/logger';
import { AppModule } from './app.module';
import type { ${pascal(spec.slug)}Config } from './infrastructure/config/${spec.slug}.config';
import { DomainExceptionFilter } from './presentation/http/filters/domain-exception.filter';
import { CorrelationIdInterceptor } from './presentation/interceptors/correlation-id.interceptor';

async function bootstrap(): Promise<void> {
  const logger = new NestMedSphereLogger(
    createLogger({ service: process.env.SERVICE_NAME ?? '${spec.slug}-service' }),
  );

  const app = await NestFactory.create(AppModule, { logger });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new DomainExceptionFilter());
  app.useGlobalInterceptors(new CorrelationIdInterceptor());
  app.enableShutdownHooks();

  const config = app.get(ConfigService).get<${pascal(spec.slug)}Config>('${spec.slug}')!;
  await app.listen(config.port);
  logger.log(\`${spec.description} listening on port \${config.port}\`);
}

bootstrap().catch((error) => {
  console.error('Failed to start ${spec.slug} service', error);
  process.exit(1);
});
`;
}

export function genHealthModule() {
  return `import { Module } from '@nestjs/common';
import { HealthController } from '../presentation/http/health.controller';
import { PrismaService } from '../infrastructure/prisma/prisma.service';

@Module({
  controllers: [HealthController],
  providers: [PrismaService],
})
export class HealthModule {}
`;
}

export function genUnitTest(uc, spec) {
  const className = `${uc.name}UseCase`;
  const cmdName = `${uc.name.replace(/UseCase$/, '')}Command`;
  return `import { ${className} } from '../../src/application/use-cases/${kebab(uc.name)}.use-case';
import { ${spec.entity} } from '../../src/domain/entities/${kebab(spec.entity)}.entity';
import { ${pascal(spec.slug)}NotFoundError } from '../../src/domain/errors/${spec.slug}.errors';

describe('${className}', () => {
  const organizationId = '22222222-2222-4222-8222-222222222222' as const;
  const actorId = '11111111-1111-4111-8111-111111111111' as const;
  const correlationId = '33333333-3333-4333-8333-333333333333';

  const repository = {
    save: jest.fn(),
    findById: jest.fn(),
    list: jest.fn().mockResolvedValue({ items: [], meta: { page: 1, pageSize: 20, totalItems: 0, totalPages: 1, hasNext: false, hasPrevious: false } }),
  };

  let useCase: ${className};

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new ${className}(repository as never);
  });

  it('creates or updates domain records', async () => {
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

    repository.findById.mockResolvedValue(entity);
    repository.save.mockResolvedValue(undefined);

    const result = await useCase.execute({
      organizationId: organizationId as never,
      actorId: actorId as never,
      correlationId,
      id: entity.id,
      payload: {},
    } as import('../../src/application/commands/${kebab(uc.name.replace(/UseCase$/, ''))}.command').${cmdName});

    expect(repository.save).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it('throws when entity is missing', async () => {
    repository.findById.mockResolvedValue(null);
    await expect(
      useCase.execute({
        organizationId: organizationId as never,
        actorId: actorId as never,
        correlationId,
        id: '99999999-9999-4999-8999-999999999999' as never,
      } as never),
    ).rejects.toBeInstanceOf(${pascal(spec.slug)}NotFoundError);
  });
});
`;
}

export function genPackageJson(spec) {
  return JSON.stringify(
    {
      name: servicePackageName(spec.slug),
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'nest start --watch',
        build: 'nest build',
        start: 'node dist/main.js',
        'start:prod': 'node dist/main.js',
        lint: 'eslint "{src,test}/**/*.ts"',
        typecheck: 'tsc --noEmit',
        test: 'jest',
        'test:watch': 'jest --watch',
        'test:cov': 'jest --coverage',
        clean: 'rimraf dist coverage',
      },
      dependencies: {
        '@medsphere/auth-sdk': 'workspace:*',
        '@medsphere/database': 'workspace:*',
        '@medsphere/logger': 'workspace:*',
        '@medsphere/monitoring-sdk': 'workspace:*',
        '@medsphere/shared': 'workspace:*',
        '@nestjs/common': '^10.4.15',
        '@nestjs/config': '^3.3.0',
        '@nestjs/core': '^10.4.15',
        '@nestjs/platform-express': '^10.4.15',
        '@prisma/client': '^6.1.0',
        'class-transformer': '^0.5.1',
        'class-validator': '^0.14.1',
        'reflect-metadata': '^0.2.2',
        rxjs: '^7.8.1',
        uuid: '^11.0.3',
      },
      devDependencies: {
        '@nestjs/cli': '^10.4.9',
        '@nestjs/testing': '^10.4.15',
        '@types/express': '^5.0.0',
        '@types/jest': '^29.5.14',
        '@types/node': '^22.10.2',
        '@types/uuid': '^10.0.0',
        jest: '^29.7.0',
        'ts-jest': '^29.2.5',
        typescript: '^5.7.2',
      },
    },
    null,
    2,
  );
}

export function genTsConfig() {
  return JSON.stringify(
    {
      compilerOptions: {
        module: 'commonjs',
        declaration: true,
        removeComments: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        allowSyntheticDefaultImports: true,
        target: 'ES2022',
        sourceMap: true,
        outDir: './dist',
        baseUrl: './',
        incremental: true,
        skipLibCheck: true,
        strict: true,
        noImplicitAny: true,
        strictNullChecks: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        forceConsistentCasingInFileNames: true,
        esModuleInterop: true,
        resolveJsonModule: true,
        paths: { '@/*': ['src/*'] },
      },
      include: ['src/**/*', 'test/**/*'],
      exclude: ['node_modules', 'dist'],
    },
    null,
    2,
  );
}

export function genNestCli() {
  return JSON.stringify(
    {
      $schema: 'https://json.schemastore.org/nest-cli',
      collection: '@nestjs/schematics',
      sourceRoot: 'src',
      compilerOptions: {
        deleteOutDir: true,
        webpack: false,
        tsConfigPath: 'tsconfig.json',
      },
    },
    null,
    2,
  );
}

export function genJestConfig() {
  return `/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: 'test/unit/.*\\\\.spec\\\\.ts$',
  transform: {
    '^.+\\\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
`;
}

export async function generateNestService(repoRoot, spec, stats) {
  const base = `services/${spec.slug}`;
  const writes = [];

  writes.push([`${base}/package.json`, genPackageJson(spec)]);
  writes.push([`${base}/tsconfig.json`, genTsConfig()]);
  writes.push([`${base}/nest-cli.json`, genNestCli()]);
  writes.push([`${base}/jest.config.js`, genJestConfig()]);
  writes.push([`${base}/src/main.ts`, genMain(spec)]);
  writes.push([`${base}/src/app.module.ts`, genAppModule(spec)]);
  writes.push([`${base}/src/domain/entities/${kebab(spec.entity)}.entity.ts`, genEntity(spec)]);
  const localEnums = genLocalEnums(spec);
  if (localEnums) {
    writes.push([`${base}/src/domain/enums/${spec.slug}.enums.ts`, localEnums + '\n']);
  }
  writes.push([`${base}/src/domain/policies/${spec.slug}-access.policy.ts`, genAccessPolicy(spec)]);
  writes.push([`${base}/src/domain/services/${spec.slug}-rules.service.ts`, genDomainRules(spec)]);
  writes.push([
    `${base}/src/application/services/${spec.slug}-orchestrator.service.ts`,
    genOrchestrator(spec),
  ]);
  writes.push([
    `${base}/src/presentation/http/dto/${spec.slug}-requests.dto.ts`,
    genRequestDtos(spec),
  ]);
  writes.push([
    `${base}/src/presentation/http/filters/domain-exception.filter.ts`,
    genExceptionFilter(spec),
  ]);
  writes.push([
    `${base}/src/presentation/interceptors/correlation-id.interceptor.ts`,
    genCorrelationInterceptor(),
  ]);
  writes.push([
    `${base}/src/infrastructure/messaging/${spec.slug}-event.publisher.ts`,
    genEventPublisher(spec),
  ]);
  writes.push([`${base}/src/domain/errors/${spec.slug}.errors.ts`, genErrors(spec)]);
  writes.push([
    `${base}/src/domain/repositories/${kebab(spec.entity)}.repository.ts`,
    genRepositoryPort(spec),
  ]);
  writes.push([
    `${base}/src/domain/events/${spec.slug}.domain-events.ts`,
    genDomainEvents(spec),
  ]);
  writes.push([`${base}/src/application/mappers/${kebab(spec.entity)}.mapper.ts`, genMapper(spec)]);
  writes.push([`${base}/src/application/dto/index.ts`, `export * from '../mappers/${kebab(spec.entity)}.mapper';\n`]);
  writes.push([
    `${base}/src/infrastructure/config/${spec.slug}.config.ts`,
    genConfig(spec),
  ]);
  writes.push([`${base}/src/infrastructure/prisma/prisma.service.ts`, genPrismaService()]);
  writes.push([
    `${base}/src/infrastructure/persistence/in-memory-${kebab(spec.entity)}.repository.ts`,
    genInMemoryRepo(spec),
  ]);
  writes.push([
    `${base}/src/infrastructure/persistence/prisma-${kebab(spec.entity)}.repository.ts`,
    genPrismaRepo(spec),
  ]);
  writes.push([`${base}/src/presentation/http/health.controller.ts`, genHealthController(spec)]);
  writes.push([`${base}/src/presentation/http/${kebab(spec.entity)}.controller.ts`, genController(spec)]);
  writes.push([`${base}/src/modules/${spec.slug}.module.ts`, genModule(spec)]);
  writes.push([`${base}/src/modules/health.module.ts`, genHealthModule()]);

  for (const child of spec.childEntities ?? []) {
    writes.push([
      `${base}/src/domain/entities/${kebab(child.name)}.entity.ts`,
      genChildEntity(spec, child),
    ]);
  }

  for (const uc of spec.useCases) {
    writes.push([
      `${base}/src/application/commands/${kebab(uc.name.replace(/UseCase$/, ''))}.command.ts`,
      genCommand(uc, spec),
    ]);
    writes.push([
      `${base}/src/application/use-cases/${kebab(uc.name)}.use-case.ts`,
      genUseCase(uc, spec),
    ]);
  }

  writes.push([`${base}/src/application/use-cases/index.ts`, genUseCasesBarrel(spec)]);

  for (const ucName of spec.testUseCases) {
    const uc = spec.useCases.find((u) => u.name === ucName);
    if (uc) {
      writes.push([
        `${base}/test/unit/${kebab(uc.name)}.spec.ts`,
        genUnitTest(uc, spec),
      ]);
    }
  }

  const listTest = genListUseCaseTest(spec);
  if (listTest) {
    writes.push([`${base}/test/unit/list-${spec.slug}.spec.ts`, listTest]);
  }

  writes.push([`${base}/README.md`, genServiceReadme(spec)]);
  writes.push([`${base}/test/integration/${spec.slug}.integration.spec.ts`, genIntegrationTest(spec)]);

  for (const childRepo of genInMemoryChildRepos(spec)) {
    writes.push([`${base}/${childRepo.path}`, childRepo.content]);
  }

  for (const [rel, content] of writes) {
    await writeGenerated(repoRoot, rel, content.endsWith('\n') ? content : content + '\n', stats);
  }
}

export async function authIsFullyImplemented(repoRoot) {
  const dir = path.join(repoRoot, 'services/auth/src/application/use-cases');
  try {
    const files = await readdir(dir);
    return files.filter((f) => f.endsWith('.use-case.ts')).length >= 10;
  } catch {
    return false;
  }
}

export async function countExistingLines(repoRoot, relPaths) {
  let total = 0;
  for (const rel of relPaths) {
    try {
      const content = await readFileSafe(path.join(repoRoot, rel));
      total += content.split('\n').length;
    } catch {
      /* ignore */
    }
  }
  return total;
}

async function readFileSafe(p) {
  const { readFile } = await import('node:fs/promises');
  return readFile(p, 'utf8');
}
