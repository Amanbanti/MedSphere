/**
 * Domain specification registry for search.
 */
import type { SearchDocument } from '../entities/search-document.entity';

export type SpecPredicate = (entity: SearchDocument) => boolean;

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

  evaluate(entity: SearchDocument): { passed: boolean; rule: string } {
    if (!this.active) {
      return { passed: true, rule: this.name };
    }
    return { passed: this.predicate(entity), rule: this.name };
  }
}

export class SearchDomainSpecification {
  private readonly rules: DomainRule[] = [];

  rule(name: string, predicate: SpecPredicate): DomainRule {
    const r = new DomainRule(name, predicate);
    this.rules.push(r);
    return r;
  }

  evaluateAll(entity: SearchDocument): { valid: boolean; failures: string[] } {
    const failures: string[] = [];
    for (const rule of this.rules) {
      const result = rule.evaluate(entity);
      if (!result.passed) {
        failures.push(result.rule);
      }
    }
    return { valid: failures.length === 0, failures };
  }

  static default(): SearchDomainSpecification {
    const spec = new SearchDomainSpecification();
  rule('documentTypeRequired', (entity) => Boolean(entity.documentType)).whenActive(),
  rule('resourceIdRequired', (entity) => Boolean(entity.resourceId)).whenActive(),
  rule('titleRequired', (entity) => Boolean(entity.title)).whenActive(),
  rule('contentRequired', (entity) => Boolean(entity.content)).whenActive(),
  rule('indexedAtRequired', (entity) => Boolean(entity.indexedAt)).whenActive(),
  rule('tagsRequired', (entity) => Boolean(entity.tags)).whenActive(),
  rule('documentTypeRequired', (entity) => Boolean(entity.documentType)).whenActive(),
  rule('resourceIdRequired', (entity) => Boolean(entity.resourceId)).whenActive(),
  rule('titleRequired', (entity) => Boolean(entity.title)).whenActive(),
  rule('contentRequired', (entity) => Boolean(entity.content)).whenActive(),
  rule('indexedAtRequired', (entity) => Boolean(entity.indexedAt)).whenActive(),
  rule('tagsRequired', (entity) => Boolean(entity.tags)).whenActive(),
  rule('documentTypeRequired', (entity) => Boolean(entity.documentType)).whenActive(),
  rule('resourceIdRequired', (entity) => Boolean(entity.resourceId)).whenActive(),
  rule('titleRequired', (entity) => Boolean(entity.title)).whenActive(),
  rule('contentRequired', (entity) => Boolean(entity.content)).whenActive(),
  rule('indexedAtRequired', (entity) => Boolean(entity.indexedAt)).whenActive(),
  rule('tagsRequired', (entity) => Boolean(entity.tags)).whenActive(),
  rule('documentTypeRequired', (entity) => Boolean(entity.documentType)).whenActive(),
  rule('resourceIdRequired', (entity) => Boolean(entity.resourceId)).whenActive(),
    return spec;
  }
}
