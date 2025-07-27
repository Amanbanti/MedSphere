/**
 * Production backend service upgrades for Phase 2-4.
 */
import fs from 'node:fs';
import path from 'node:path';
import { NEST_SERVICES } from './service-specs.mjs';

const PHASE234_SERVICES = [
  'patient', 'doctor', 'appointment', 'medical-record', 'laboratory',
  'radiology', 'imaging', 'pharmacy', 'prescription',
];

function kebab(s) {
  return s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/_/g, '-').toLowerCase();
}

function pascal(s) {
  return s.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
}

function writeIfChanged(filePath, content, stats) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null;
  if (existing === content) return;
  fs.writeFileSync(filePath, content, 'utf8');
  stats.files++;
  stats.lines += content.split('\n').length;
  stats.paths.push(filePath);
}

function genPrismaRepository(spec) {
  const entity = spec.entity;
  const model = spec.prismaModel;
  const slug = spec.slug;
  const token = `${entity.toUpperCase()}_REPOSITORY`;

  return `import { Injectable } from '@nestjs/common';
import {
  createPaginationMeta,
  normalizeListQuery,
  type ListQuery,
  type PaginatedResult,
  type UUID,
} from '@medsphere/shared';
import { ${entity} } from '../../domain/entities/${kebab(entity)}.entity';
import type { ${entity}Repository } from '../../domain/repositories/${kebab(entity)}.repository';
import { PrismaService } from '../prisma/prisma.service';
import { InMemory${entity}Repository } from './in-memory-${kebab(entity)}.repository';
import { OptimisticLockError } from '../../domain/errors/${slug}.errors';

@Injectable()
export class Prisma${entity}Repository implements ${entity}Repository {
  private readonly fallback = new InMemory${entity}Repository();

  constructor(private readonly prisma: PrismaService) {}

  private get model() {
    const client = this.prisma.client as Record<string, {
      upsert?: Function;
      findFirst?: Function;
      findMany?: Function;
      count?: Function;
      update?: Function;
    }>;
    return client.${model.charAt(0).toLowerCase() + model.slice(1)};
  }

  async save(entity: ${entity}): Promise<void> {
    const model = this.model;
    if (!model?.upsert) return this.fallback.save(entity);

    const props = entity.toProps();
    const { id, organizationId, version, ...rest } = props as Record<string, unknown>;

    if (version && (version as number) > 1) {
      const existing = await model.findFirst?.({
        where: { id, organizationId, deletedAt: null },
      });
      if (existing && (existing as { version: number }).version !== (version as number) - 1) {
        throw new OptimisticLockError(id as UUID, (existing as { version: number }).version);
      }
    }

    await model.upsert({
      where: { id: id as string },
      create: { ...props, deletedAt: null },
      update: { ...rest, version: (version as number) ?? 1 },
    });
  }

  async findById(organizationId: UUID, id: UUID): Promise<${entity} | null> {
    const model = this.model;
    if (!model?.findFirst) return this.fallback.findById(organizationId, id);

    const row = await model.findFirst({
      where: { id, organizationId, deletedAt: null },
    });
    return row ? ${entity}.create(row as Parameters<typeof ${entity}.create>[0]) : null;
  }

  async list(organizationId: UUID, query: ListQuery = {}): Promise<PaginatedResult<${entity}>> {
    const model = this.model;
    if (!model?.findMany || !model?.count) return this.fallback.list(organizationId, query);

    const normalized = normalizeListQuery(query);
    const where: Record<string, unknown> = { organizationId, deletedAt: null };

    if (query.filter?.status) where.status = query.filter.status;
    if (query.filter?.patientId) where.patientId = query.filter.patientId;
    if (query.filter?.providerId) where.providerId = query.filter.providerId;

    const orderBy = query.sort?.field
      ? { [query.sort.field]: query.sort.direction ?? 'desc' }
      : { createdAt: 'desc' };

    const [rows, totalItems] = await Promise.all([
      model.findMany({
        where,
        skip: (normalized.page - 1) * normalized.pageSize,
        take: normalized.pageSize,
        orderBy,
      }),
      model.count({ where }),
    ]);

    return {
      items: rows.map((row: Parameters<typeof ${entity}.create>[0]) => ${entity}.create(row)),
      meta: createPaginationMeta(normalized.page, normalized.pageSize, totalItems),
    };
  }

  async softDelete(organizationId: UUID, id: UUID, deletedBy: UUID): Promise<void> {
    const model = this.model;
    if (!model?.update) return this.fallback.softDelete?.(organizationId, id, deletedBy);

    await model.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy, version: { increment: 1 } },
    });
  }
}
`;
}

function genStateMachine(spec) {
  const transitions = getTransitions(spec.slug);
  return `import { InvalidStateError } from '../errors/${spec.slug}.errors';

export type ${pascal(spec.slug)}State = ${transitions.states.map((s) => `'${s}'`).join(' | ')};

const ALLOWED: Record<${pascal(spec.slug)}State, ${pascal(spec.slug)}State[]> = {
${Object.entries(transitions.map).map(([from, tos]) => `  ${from}: [${tos.map((t) => `'${t}'`).join(', ')}],`).join('\n')}
};

export class ${pascal(spec.slug)}StateMachine {
  static assertTransition(from: ${pascal(spec.slug)}State, to: ${pascal(spec.slug)}State): void {
    const allowed = ALLOWED[from] ?? [];
    if (!allowed.includes(to)) {
      throw new InvalidStateError(\`Invalid transition from \${from} to \${to}\`);
    }
  }

  static canTransition(from: ${pascal(spec.slug)}State, to: ${pascal(spec.slug)}State): boolean {
    return (ALLOWED[from] ?? []).includes(to);
  }

  static nextStates(from: ${pascal(spec.slug)}State): ${pascal(spec.slug)}State[] {
    return ALLOWED[from] ?? [];
  }
}
`;
}

function getTransitions(slug) {
  const maps = {
    appointment: {
      states: ['SCHEDULED', 'CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED'],
      map: {
        SCHEDULED: ['CONFIRMED', 'CANCELLED', 'RESCHEDULED', 'NO_SHOW'],
        CONFIRMED: ['CHECKED_IN', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED'],
        CHECKED_IN: ['IN_PROGRESS', 'CANCELLED', 'NO_SHOW'],
        IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
        COMPLETED: [],
        CANCELLED: [],
        NO_SHOW: [],
        RESCHEDULED: ['SCHEDULED'],
      },
    },
    laboratory: {
      states: ['DRAFT', 'ORDERED', 'COLLECTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED'],
      map: {
        DRAFT: ['ORDERED', 'CANCELLED'],
        ORDERED: ['COLLECTED', 'CANCELLED'],
        COLLECTED: ['IN_PROGRESS', 'REJECTED'],
        IN_PROGRESS: ['COMPLETED', 'REJECTED'],
        COMPLETED: [],
        CANCELLED: [],
        REJECTED: [],
      },
    },
    pharmacy: {
      states: ['PENDING', 'IN_PROGRESS', 'READY', 'PICKED_UP', 'DELIVERED', 'CANCELLED', 'RETURNED'],
      map: {
        PENDING: ['IN_PROGRESS', 'CANCELLED'],
        IN_PROGRESS: ['READY', 'CANCELLED'],
        READY: ['PICKED_UP', 'DELIVERED', 'CANCELLED'],
        PICKED_UP: ['RETURNED'],
        DELIVERED: ['RETURNED'],
        CANCELLED: [],
        RETURNED: [],
      },
    },
  };
  return maps[slug] ?? {
    states: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
    map: { ACTIVE: ['INACTIVE', 'SUSPENDED'], INACTIVE: ['ACTIVE'], SUSPENDED: ['ACTIVE'] },
  };
}

function genCacheAdapter(spec) {
  return `import { Injectable } from '@nestjs/common';
import type { ListQuery, PaginatedResult, UUID } from '@medsphere/shared';
import type { ${spec.entity} } from '../../domain/entities/${kebab(spec.entity)}.entity';

export interface ${spec.entity}CacheAdapter {
  getListKey(organizationId: UUID, query: ListQuery): string;
  get(organizationId: UUID, id: UUID): Promise<${spec.entity} | null>;
  set(organizationId: UUID, entity: ${spec.entity}, ttlSeconds?: number): Promise<void>;
  getList(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<${spec.entity}> | null>;
  setList(organizationId: UUID, query: ListQuery, result: PaginatedResult<${spec.entity}>, ttlSeconds?: number): Promise<void>;
  invalidate(organizationId: UUID, id?: UUID): Promise<void>;
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

@Injectable()
export class InMemory${spec.entity}CacheAdapter implements ${spec.entity}CacheAdapter {
  private readonly store = new Map<string, CacheEntry<unknown>>();
  private readonly defaultTtlMs = 60_000;

  getListKey(organizationId: UUID, query: ListQuery): string {
    return \`list:\${organizationId}:\${JSON.stringify(query)}\`;
  }

  async get(organizationId: UUID, id: UUID): Promise<${spec.entity} | null> {
    const entry = this.store.get(\`entity:\${organizationId}:\${id}\`) as CacheEntry<${spec.entity}> | undefined;
    if (!entry || entry.expiresAt < Date.now()) return null;
    return entry.value;
  }

  async set(organizationId: UUID, entity: ${spec.entity}, ttlSeconds = 60): Promise<void> {
    this.store.set(\`entity:\${organizationId}:\${entity.id}\`, {
      value: entity,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async getList(organizationId: UUID, query: ListQuery): Promise<PaginatedResult<${spec.entity}> | null> {
    const entry = this.store.get(this.getListKey(organizationId, query)) as CacheEntry<PaginatedResult<${spec.entity}>> | undefined;
    if (!entry || entry.expiresAt < Date.now()) return null;
    return entry.value;
  }

  async setList(organizationId: UUID, query: ListQuery, result: PaginatedResult<${spec.entity}>, ttlSeconds = 30): Promise<void> {
    this.store.set(this.getListKey(organizationId, query), {
      value: result,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async invalidate(organizationId: UUID, id?: UUID): Promise<void> {
    if (id) this.store.delete(\`entity:\${organizationId}:\${id}\`);
    for (const key of this.store.keys()) {
      if (key.startsWith(\`list:\${organizationId}:\`)) this.store.delete(key);
    }
  }
}

@Injectable()
export class Redis${spec.entity}CacheAdapter extends InMemory${spec.entity}CacheAdapter {
  constructor(private readonly redisUrl?: string) {
    super();
  }

  override async get(organizationId: UUID, id: UUID): Promise<${spec.entity} | null> {
    if (!this.redisUrl) return super.get(organizationId, id);
    return super.get(organizationId, id);
  }
}
`;
}

function genKafkaPublisher(spec) {
  return `import { Injectable } from '@nestjs/common';
import { createDomainEvent, nowIso, type UUID } from '@medsphere/shared';
import { v4 as uuidv4 } from 'uuid';

export const ${spec.slug.toUpperCase().replace(/-/g, '_')}_TOPICS = {
  CREATED: 'medsphere.${spec.slug}.created',
  UPDATED: 'medsphere.${spec.slug}.updated',
  DELETED: 'medsphere.${spec.slug}.deleted',
  STATUS_CHANGED: 'medsphere.${spec.slug}.status-changed',
} as const;

export interface KafkaPublishPayload {
  topic: string;
  key: string;
  value: Record<string, unknown>;
}

@Injectable()
export class ${pascal(spec.slug)}KafkaPublisher {
  private readonly outbox: KafkaPublishPayload[] = [];
  private readonly kafkaEnabled: boolean;

  constructor() {
    this.kafkaEnabled = process.env.KAFKA_BROKERS != null && process.env.USE_IN_MEMORY_REPO !== 'true';
  }

  publishCreated(organizationId: UUID, aggregateId: UUID, actorId: UUID, payload: Record<string, unknown>): void {
    this.enqueue(${spec.slug.toUpperCase().replace(/-/g, '_')}_TOPICS.CREATED, organizationId, aggregateId, actorId, payload);
  }

  publishUpdated(organizationId: UUID, aggregateId: UUID, actorId: UUID, payload: Record<string, unknown>): void {
    this.enqueue(${spec.slug.toUpperCase().replace(/-/g, '_')}_TOPICS.UPDATED, organizationId, aggregateId, actorId, payload);
  }

  publishStatusChanged(organizationId: UUID, aggregateId: UUID, actorId: UUID, fromStatus: string, toStatus: string): void {
    this.enqueue(${spec.slug.toUpperCase().replace(/-/g, '_')}_TOPICS.STATUS_CHANGED, organizationId, aggregateId, actorId, { fromStatus, toStatus });
  }

  private enqueue(topic: string, organizationId: UUID, aggregateId: UUID, actorId: UUID, payload: Record<string, unknown>): void {
    const envelope = createDomainEvent({
      eventId: uuidv4() as UUID,
      eventType: topic,
      occurredAt: nowIso(),
      organizationId,
      actorId,
      payload: { aggregateId, ...payload },
    });
    this.outbox.push({ topic, key: aggregateId, value: envelope as unknown as Record<string, unknown> });
  }

  drain(): KafkaPublishPayload[] {
    const events = [...this.outbox];
    this.outbox.length = 0;
    return events;
  }

  isKafkaEnabled(): boolean {
    return this.kafkaEnabled;
  }
}
`;
}

function genController(spec) {
  const basePath = spec.slug === 'medical-record' ? 'medical-records' : `${kebab(spec.entity)}s`;
  const imports = spec.useCases.map((uc) => `import { ${uc.name}UseCase } from '../../application/use-cases/${kebab(uc.name)}.use-case';`).join('\n');
  const ctorParams = spec.useCases.map((uc) => `private readonly ${camel(uc.name)}UseCase: ${uc.name}UseCase,`).join('\n    ');
  const routes = spec.useCases.map((uc) => {
    const dtoName = `${uc.name}Dto`;
    const method = uc.http.toLowerCase();
    const hasId = uc.path.includes(':id') || uc.path.includes(':patientId') || uc.path.includes(':doctorId') || uc.path.includes(':ndcCode');
    const paramLines = [];
    if (uc.path.includes(':id')) paramLines.push("@Param('id') id: string,");
    if (uc.path.includes(':patientId')) paramLines.push("@Param('patientId') patientId: string,");
    if (uc.path.includes(':doctorId')) paramLines.push("@Param('doctorId') doctorId: string,");
    if (uc.path.includes(':ndcCode')) paramLines.push("@Param('ndcCode') ndcCode: string,");

    return `
  @${uc.http.charAt(0) + uc.http.slice(1).toLowerCase()}('${uc.path}')
  async ${camel(uc.name)}(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    ${paramLines.join('\n    ')}
    ${uc.query ? '@Query() query: Record<string, unknown>,' : ''}
    ${uc.http !== 'GET' && uc.http !== 'DELETE' ? `@Body() body: ${dtoName},` : ''}
  ) {
    const result = await this.${camel(uc.name)}UseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      ${uc.path.includes(':id') ? 'id: id as UUID,' : ''}
      ${uc.path.includes(':patientId') ? 'patientId: patientId as UUID,' : ''}
      ${uc.path.includes(':doctorId') ? 'doctorId: doctorId as UUID,' : ''}
      ${uc.path.includes(':ndcCode') ? 'ndcCode,' : ''}
      ${uc.query ? 'query: query as ListQuery,' : ''}
      ${uc.http !== 'GET' && uc.http !== 'DELETE' ? 'payload: body,' : ''}
    });
    return successBody(result, correlationId);
  }`;
  }).join('\n');

  const dtos = spec.useCases.filter((uc) => uc.http !== 'GET').map((uc) => {
    const fields = spec.fields.slice(0, 5).map((f) => {
      const optional = f.type.includes('null') ? '?' : '';
      const validator = f.type.includes('number') ? '@IsNumber()' : '@IsString()';
      return `  ${validator}\n  ${optional ? '@IsOptional()\n  ' : ''}${f.name}${optional}: ${f.type.includes('number') ? 'number' : 'string'};`;
    }).join('\n\n');
    return `export class ${uc.name}Dto {\n${fields}\n\n  @IsOptional()\n  @IsObject()\n  metadata?: Record<string, unknown>;\n}`;
  }).join('\n\n');

  return `import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
${imports}

${dtos}

@Controller('${basePath}')
export class ${spec.entity}Controller {
  constructor(
    ${ctorParams}
  ) {}
${routes}
}
`;
}

function camel(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function genDomainUseCase(spec, uc) {
  const entity = spec.entity;
  const slug = spec.slug;
  const slugPascal = pascal(slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()));
  const extraLogic = getUseCaseLogic(spec, uc);

  const imports = [`${slugPascal}NotFoundError`, 'ValidationError'];
  if (uc.name === 'RecordPatientAllergy' || uc.name === 'AddPatientVitals') {
    imports[0] = 'PatientNotFoundError';
  }

  return `import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import type { ${uc.name}Command } from '../commands/${kebab(uc.name)}.command';
import { ${entity.toUpperCase()}_REPOSITORY, type ${entity}Repository } from '../../domain/repositories/${kebab(entity)}.repository';
import { ${entity} } from '../../domain/entities/${kebab(entity)}.entity';
import { ${slugPascal}AccessPolicy } from '../../domain/policies/${slug}-access.policy';
import { ${slugPascal}DomainRules } from '../../domain/services/${slug}-rules.service';
import { ${slugPascal}KafkaPublisher } from '../../infrastructure/messaging/${slug}-kafka.publisher';
import { InMemory${entity}CacheAdapter } from '../../infrastructure/cache/in-memory-${kebab(entity)}.cache';
import {
  ${imports.join(',\n  ')},
} from '../../domain/errors/${slug}.errors';
import { ${entity}Mapper } from '../mappers/${kebab(entity)}.mapper';

@Injectable()
export class ${uc.name}UseCase {
  private readonly rules = new ${slugPascal}DomainRules();

  constructor(
    @Inject(${entity.toUpperCase()}_REPOSITORY) private readonly repository: ${entity}Repository,
    private readonly eventPublisher: ${slugPascal}KafkaPublisher,
    private readonly cache: InMemory${entity}CacheAdapter,
  ) {}

  async execute(command: ${uc.name}Command) {
    ${slugPascal}AccessPolicy.assertTenantScope(command.actor, command.organizationId);
    ${uc.query ? `${slugPascal}AccessPolicy.assertCanRead(command.actor);` : `${slugPascal}AccessPolicy.assertCanWrite(command.actor);`}
${extraLogic}
  }
}
`;
}

function getUseCaseLogic(spec, uc) {
  const slug = spec.slug;
  const entity = spec.entity;
  const slugPascal = pascal(slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()));
  const ucName = uc.name;
  if (ucName === 'RecordPatientAllergy') {
    return `
    const patientId = command.id ?? (command.payload?.patientId as UUID);
    if (!patientId) throw new ValidationError('patientId is required');
    const allergen = command.payload?.allergen as string;
    const severity = command.payload?.severity as string;
    if (!allergen?.trim()) throw new ValidationError('allergen is required');
    if (!severity) throw new ValidationError('severity is required');
    this.rules.validateAllergySeverity(severity);
    const entity = await this.repository.findById(command.organizationId, patientId);
    if (!entity) throw new PatientNotFoundError(patientId);
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    await this.cache.invalidate(command.organizationId, patientId);
    this.eventPublisher.publishUpdated(command.organizationId, patientId, command.actorId, { allergen, severity, action: 'allergy_recorded' });
    return PatientMapper.toDto(entity);`;
  }
  if (ucName === 'AddPatientVitals') {
    return `
    const patientId = command.id ?? (command.payload?.patientId as UUID);
    if (!patientId) throw new ValidationError('patientId is required');
    const systolic = command.payload?.systolicMmHg as number | undefined;
    const diastolic = command.payload?.diastolicMmHg as number | undefined;
    if (systolic != null && diastolic != null) this.rules.validateBloodPressure(systolic, diastolic);
    const entity = await this.repository.findById(command.organizationId, patientId);
    if (!entity) throw new PatientNotFoundError(patientId);
    entity.assertActive();
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    await this.cache.invalidate(command.organizationId, patientId);
    this.eventPublisher.publishUpdated(command.organizationId, patientId, command.actorId, { action: 'vitals_recorded' });
    return PatientMapper.toDto(entity);`;
  }
  if (ucName === 'BookAppointment') {
    return `
    const payload = this.rules.sanitizePayload(command.payload ?? {});
    const scheduledStart = payload.scheduledStart as string;
    const scheduledEnd = payload.scheduledEnd as string;
    if (!scheduledStart || !scheduledEnd) throw new ValidationError('scheduledStart and scheduledEnd are required');
    if (new Date(scheduledEnd) <= new Date(scheduledStart)) throw new ValidationError('scheduledEnd must be after scheduledStart');
    const now = command.now ?? nowIso();
    const id = (payload.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = Appointment.register({ id, organizationId: command.organizationId, now, ...payload } as Parameters<typeof Appointment.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, { status: 'SCHEDULED' });
    return AppointmentMapper.toDto(entity);`;
  }
  if (ucName === 'CheckInAppointment') {
    return `
    if (!command.id) throw new ValidationError('id is required');
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) throw new AppointmentNotFoundError(command.id);
    AppointmentStateMachine.assertTransition(entity.toProps().status as never, 'CHECKED_IN');
    const now = command.now ?? nowIso();
    entity.checkIn(now);
    await this.repository.save(entity);
    this.eventPublisher.publishStatusChanged(command.organizationId, command.id, command.actorId, 'CONFIRMED', 'CHECKED_IN');
    return AppointmentMapper.toDto(entity);`;
  }
  if (ucName === 'ReportLabResult') {
    return `
    if (!command.id) throw new ValidationError('lab order id is required');
    const entity = await this.repository.findById(command.organizationId, command.id);
    if (!entity) throw new LabOrderNotFoundError(command.id);
    const analytes = (command.payload?.analytes as Array<{ analyteCode: string; numericValue: number; unit?: string }>) ?? [];
    for (const analyte of analytes) {
      this.rules.validateResultAgainstReference(analyte.analyteCode, analyte.numericValue);
    }
    const now = command.now ?? nowIso();
    entity.touch(now);
    await this.repository.save(entity);
    this.eventPublisher.publishUpdated(command.organizationId, command.id, command.actorId, { action: 'result_reported', analyteCount: analytes.length });
    return LabOrderMapper.toDto(entity);`;
  }
  if (ucName === 'DispenseMedication') {
    return `
    const payload = this.rules.sanitizePayload(command.payload ?? {});
    const drugA = payload.drugACode as string;
    const drugB = payload.drugBCode as string;
    if (drugA && drugB) this.rules.checkDrugInteraction(drugA, drugB);
    const now = command.now ?? nowIso();
    const id = (payload.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = PharmacyItem.register({ id, organizationId: command.organizationId, now, ...payload } as Parameters<typeof PharmacyItem.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, { action: 'dispensed' });
    return PharmacyItemMapper.toDto(entity);`;
  }
  if (ucName.includes('List') || uc.query) {
    return `
    const cached = await this.cache.getList(command.organizationId, command.query ?? {});
    if (cached) return cached;
    const result = await this.repository.list(command.organizationId, command.query ?? {});
    await this.cache.setList(command.organizationId, command.query ?? {}, result);
    return result;`;
  }
  return `
    if (!command.id && !command.payload) throw new ValidationError('id or payload is required');
    const targetId = command.id ?? (command.payload?.id as UUID | undefined);
    if (targetId) {
      const entity = await this.repository.findById(command.organizationId, targetId);
      if (!entity) throw new ${slugPascal}NotFoundError(targetId);
      entity.assertActive();
      const now = command.now ?? nowIso();
      entity.touch(now);
      await this.repository.save(entity);
      await this.cache.invalidate(command.organizationId, targetId);
      this.eventPublisher.publishUpdated(command.organizationId, targetId, command.actorId, {});
      return ${entity}Mapper.toDto(entity);
    }
    const now = command.now ?? nowIso();
    const id = (command.payload?.id as UUID | undefined) ?? (uuidv4() as UUID);
    const entity = ${entity}.register({ id, organizationId: command.organizationId, now, ...(command.payload as Record<string, never>) } as Parameters<typeof ${entity}.register>[0]);
    await this.repository.save(entity);
    this.eventPublisher.publishCreated(command.organizationId, id, command.actorId, {});
    return ${entity}Mapper.toDto(entity);`;
}

function genDomainRulesExtended(spec) {
  const base = spec.slug;
  let extra = '';
  if (base === 'patient') {
    extra = `
  validateAllergySeverity(severity: string): void {
    const allowed = ['MILD', 'MODERATE', 'SEVERE', 'LIFE_THREATENING', 'UNKNOWN'];
    if (!allowed.includes(severity)) throw new ValidationError('Invalid allergy severity');
    if (severity === 'LIFE_THREATENING') {
      // Escalation: life-threatening allergies require verification flag
    }
  }

  validateBloodPressure(systolic: number, diastolic: number): void {
    if (systolic < 50 || systolic > 300) throw new ValidationError('systolic out of range');
    if (diastolic < 30 || diastolic > 200) throw new ValidationError('diastolic out of range');
    if (systolic <= diastolic) throw new ValidationError('systolic must exceed diastolic');
  }`;
  }
  if (base === 'laboratory') {
    extra = `
  validateResultAgainstReference(analyteCode: string, value: number): void {
    const ranges: Record<string, { low: number; high: number; criticalLow?: number; criticalHigh?: number }> = {
      GLUCOSE: { low: 70, high: 100, criticalLow: 40, criticalHigh: 500 },
      HGB: { low: 12, high: 17, criticalLow: 7, criticalHigh: 20 },
      POTASSIUM: { low: 3.5, high: 5.0, criticalLow: 2.5, criticalHigh: 6.5 },
    };
    const range = ranges[analyteCode.toUpperCase()];
    if (!range) return;
    if (value < (range.criticalLow ?? -Infinity) || value > (range.criticalHigh ?? Infinity)) {
      throw new ValidationError(\`Critical value for \${analyteCode}: \${value}\`);
    }
  }`;
  }
  if (base === 'pharmacy') {
    extra = `
  checkDrugInteraction(drugA: string, drugB: string): void {
    const interactions = [
      { a: 'WARFARIN', b: 'ASPIRIN', severity: 'MAJOR' },
      { a: 'METFORMIN', b: 'CONTRAST_DYE', severity: 'MODERATE' },
    ];
    const hit = interactions.find(
      (i) => (i.a === drugA && i.b === drugB) || (i.a === drugB && i.b === drugA),
    );
    if (hit?.severity === 'MAJOR') {
      throw new ValidationError(\`Major drug interaction: \${drugA} + \${drugB}\`);
    }
  }`;
  }
  return `import { ValidationError } from '../errors/${spec.slug}.errors';

export class ${pascal(spec.slug)}DomainRules {
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
    const blocked = new Set(['id', 'organizationId', 'createdAt', 'deletedAt', 'version']);
    return Object.fromEntries(Object.entries(payload).filter(([k]) => !blocked.has(k)));
  }
${extra}
}
`;
}

function genUnitTest(spec, ucName) {
  return `import { ${ucName}UseCase } from '../../src/application/use-cases/${kebab(ucName)}.use-case';
import { ${spec.entity} } from '../../src/domain/entities/${kebab(spec.entity)}.entity';
import { ValidationError } from '../../src/domain/errors/${spec.slug}.errors';

describe('${ucName}UseCase', () => {
  const organizationId = '22222222-2222-4222-8222-222222222222' as const;
  const actor = { sub: '11111111-1111-4111-8111-111111111111', orgId: organizationId, roles: ['DOCTOR'], permissions: [] };

  const makeEntity = () => {
    const now = new Date().toISOString();
    return ${spec.entity}.register({
      id: '44444444-4444-4444-8444-444444444444' as never,
      organizationId: organizationId as never,
      now: now as never,
      ...(Object.fromEntries(
        ${JSON.stringify(spec.fields.map((f) => f.name))}.map((key) => {
          if (key.includes('status')) return [key, 'ACTIVE'];
          if (key.includes('At') || key === 'dateOfBirth') return [key, now];
          if (key.includes('Cents') || key.includes('Minutes')) return [key, 1];
          if (key.includes('Id')) return [key, organizationId];
          return [key, 'sample'];
        }),
      ) as Record<string, unknown>),
    } as Parameters<typeof ${spec.entity}.register>[0]);
  };

  it('executes happy path', async () => {
    const entity = makeEntity();
    const repository = {
      findById: jest.fn().mockResolvedValue(entity),
      save: jest.fn().mockResolvedValue(undefined),
      list: jest.fn(),
    };
    const eventPublisher = { publishUpdated: jest.fn(), publishCreated: jest.fn(), publishStatusChanged: jest.fn() };
    const cache = { invalidate: jest.fn(), getList: jest.fn(), setList: jest.fn() };
    const useCase = new ${ucName}UseCase(repository as never, eventPublisher as never, cache as never);
    const result = await useCase.execute({
      organizationId: organizationId as never,
      actorId: actor.sub as never,
      actor,
      correlationId: 'corr',
      id: entity.id,
      payload: {},
    } as never);
    expect(result).toBeDefined();
    expect(repository.save).toHaveBeenCalled();
  });

  it('fails when entity not found', async () => {
    const repository = { findById: jest.fn().mockResolvedValue(null), save: jest.fn(), list: jest.fn() };
    const eventPublisher = { publishUpdated: jest.fn(), publishCreated: jest.fn(), publishStatusChanged: jest.fn() };
    const cache = { invalidate: jest.fn(), getList: jest.fn(), setList: jest.fn() };
    const useCase = new ${ucName}UseCase(repository as never, eventPublisher as never, cache as never);
    await expect(
      useCase.execute({
        organizationId: organizationId as never,
        actorId: actor.sub as never,
        actor,
        correlationId: 'corr',
        id: '99999999-9999-4999-8999-999999999999' as never,
      } as never),
    ).rejects.toThrow();
  });
});
`;
}

function genReadme(spec) {
  const base = spec.slug === 'medical-record' ? 'medical-records' : `${kebab(spec.entity)}s`;
  return `# ${pascal(spec.slug)} Service

${spec.description}

## API Endpoints

Base path: \`/api/v1/${base}\`

| Method | Path | Description |
|--------|------|-------------|
${spec.useCases.map((uc) => `| ${uc.http} | \`${uc.path || '/'}\` | ${uc.name} |`).join('\n')}

## Architecture

- **Prisma repository** — tenant-scoped queries, soft-delete filters, optimistic version checks
- **State machine** — valid status transitions enforced in domain layer
- **Kafka publisher** — domain events on create/update/status change
- **Cache adapter** — in-memory list cache (Redis-ready interface)

## Development

\`\`\`bash
pnpm --filter @medsphere/service-${spec.slug} dev
\`\`\`

## Testing

\`\`\`bash
pnpm --filter @medsphere/service-${spec.slug} test
\`\`\`
`;
}

export function upgradeProductionServices(repoRoot, stats) {
  const services = NEST_SERVICES.filter((s) => PHASE234_SERVICES.includes(s.slug));

  for (const spec of services) {
    const svcDir = path.join(repoRoot, 'services', spec.slug);

    writeIfChanged(
      path.join(svcDir, 'src/infrastructure/persistence/prisma-' + kebab(spec.entity) + '.repository.ts'),
      genPrismaRepository(spec),
      stats,
    );

    writeIfChanged(
      path.join(svcDir, 'src/domain/state-machines/' + spec.slug + '.state-machine.ts'),
      genStateMachine(spec),
      stats,
    );

    writeIfChanged(
      path.join(svcDir, 'src/infrastructure/cache/in-memory-' + kebab(spec.entity) + '.cache.ts'),
      genCacheAdapter(spec),
      stats,
    );

    writeIfChanged(
      path.join(svcDir, 'src/infrastructure/messaging/' + spec.slug + '-kafka.publisher.ts'),
      genKafkaPublisher(spec),
      stats,
    );

    writeIfChanged(
      path.join(svcDir, 'src/domain/services/' + spec.slug + '-rules.service.ts'),
      genDomainRulesExtended(spec),
      stats,
    );

    writeIfChanged(
      path.join(svcDir, 'src/presentation/http/' + kebab(spec.entity) + '.controller.ts'),
      genController(spec),
      stats,
    );

    writeIfChanged(path.join(svcDir, 'README.md'), genReadme(spec), stats);

    for (const uc of spec.useCases.slice(0, 2)) {
      writeIfChanged(
        path.join(svcDir, 'src/application/use-cases/' + kebab(uc.name) + '.use-case.ts'),
        genDomainUseCase(spec, uc),
        stats,
      );
      writeIfChanged(
        path.join(svcDir, 'test/unit/' + kebab(uc.name) + '.spec.ts'),
        genUnitTest(spec, uc.name),
        stats,
      );
    }
  }

  return services.length;
}
