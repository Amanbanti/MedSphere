export type CdsRuleAction = 'alert' | 'hard-stop' | 'suggestion' | 'order-set' | 'documentation-required';

export interface CdsCondition {
  field: string;
  operator: string;
  value: unknown;
}

export interface CdsRule {
  id: string;
  name: string;
  category: string;
  action: CdsRuleAction;
  priority: number;
  enabled: boolean;
  evidenceLevel: string;
  conditions: {
    all: CdsCondition[];
    any: CdsCondition[];
  };
  recommendation: {
    summary: string;
    detail: string;
    citations: string[];
  };
  metadata: {
    author: string;
    version: string;
    lastReviewed: string;
  };
}

export function evaluateRule(rule: CdsRule, context: Record<string, unknown>): boolean {
  if (!rule.enabled) return false;
  const evalCondition = (c: CdsCondition) => {
    const val = context[c.field];
    switch (c.operator) {
      case 'gte': return typeof val === 'number' && val >= (c.value as number);
      case 'eq': return val === c.value;
      case 'contains': return typeof val === 'string' && typeof c.value === 'string' && val.includes(c.value);
      case 'startsWith': return typeof val === 'string' && typeof c.value === 'string' && val.startsWith(c.value);
      case 'in': return Array.isArray(c.value) && c.value.includes(val);
      default: return false;
    }
  };
  const allMatch = rule.conditions.all.every(evalCondition);
  const anyMatch = rule.conditions.any.length === 0 || rule.conditions.any.some(evalCondition);
  return allMatch && anyMatch;
}
