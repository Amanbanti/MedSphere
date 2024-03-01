import { createRng, pick, escapeTs, ICD_CHAPTERS, DRUG_STEMS, DRUG_SUFFIXES, LOINC_COMPONENTS } from './bulk-seed.mjs';
import { writeFile } from './expansion-utils.mjs';

const RULE_CATEGORIES = [
  'drug-allergy', 'drug-drug', 'drug-disease', 'lab-critical', 'preventive-care',
  'quality-measure', 'order-set', 'diagnosis-suggestion', 'contraindication',
  'dosing', 'duplicate-therapy', 'age-based', 'pregnancy', 'renal-dosing',
];

const RULE_ACTIONS = ['alert', 'hard-stop', 'suggestion', 'order-set', 'documentation-required'];
const EVIDENCE_LEVELS = ['A', 'B', 'C', 'D', 'expert-consensus'];

function generateCdsRule(index, rng) {
  const category = pick(rng, RULE_CATEGORIES);
  const action = pick(rng, RULE_ACTIONS);
  const id = `CDS-${String(index + 1).padStart(6, '0')}`;
  const chapter = pick(rng, ICD_CHAPTERS);
  const drug = `${pick(rng, DRUG_STEMS)}${pick(rng, DRUG_SUFFIXES)}`;
  const lab = pick(rng, LOINC_COMPONENTS);

  return {
    id,
    name: `${category.replace(/-/g, ' ')} rule ${index + 1}`,
    category,
    action,
    priority: (index % 100) + 1,
    enabled: index % 17 !== 0,
    evidenceLevel: pick(rng, EVIDENCE_LEVELS),
    conditions: {
      all: [
        { field: 'patient.ageYears', operator: 'gte', value: 18 + (index % 60) },
        { field: 'encounter.type', operator: 'in', value: ['inpatient', 'outpatient', 'emergency'] },
      ],
      any: [
        { field: 'diagnosis.code', operator: 'startsWith', value: chapter.prefix },
        { field: 'medication.name', operator: 'contains', value: drug },
        { field: 'lab.result.component', operator: 'eq', value: lab },
      ],
    },
    recommendation: {
      summary: `Review ${category} for ${drug} when ${lab} is abnormal`,
      detail: `MedSphere synthetic CDS rule: evaluate ${category} context with ICD chapter ${chapter.code} and lab marker ${lab}.`,
      citations: [`MS-REF-${1000 + (index % 9000)}`],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: `1.${index % 10}.${index % 100}`,
      lastReviewed: '2025-06-01',
    },
  };
}

function ruleToTs(rule) {
  return `  {
    id: '${rule.id}',
    name: '${escapeTs(rule.name)}',
    category: '${rule.category}',
    action: '${rule.action}',
    priority: ${rule.priority},
    enabled: ${rule.enabled},
    evidenceLevel: '${rule.evidenceLevel}',
    conditions: ${JSON.stringify(rule.conditions, null, 6).replace(/^/gm, '    ').trim()},
    recommendation: {
      summary: '${escapeTs(rule.recommendation.summary)}',
      detail: '${escapeTs(rule.recommendation.detail)}',
      citations: [${rule.recommendation.citations.map((c) => `'${c}'`).join(', ')}],
    },
    metadata: {
      author: '${rule.metadata.author}',
      version: '${rule.metadata.version}',
      lastReviewed: '${rule.metadata.lastReviewed}',
    },
  }`;
}

function generateRulePart(rules, partNum) {
  return `/**
 * MedSphere synthetic CDS rules — part ${partNum} (development artifact).
 */
import type { CdsRule } from '../types';

export const cdsRulesPart${partNum}: CdsRule[] = [
${rules.map(ruleToTs).join(',\n')}
];
`;
}

function generateCdsTypes() {
  return `export type CdsRuleAction = 'alert' | 'hard-stop' | 'suggestion' | 'order-set' | 'documentation-required';

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
`;
}

export async function generateCdsRules(root, stats) {
  const rng = createRng(42000);
  const totalRules = 4500;
  const rulesPerPart = 150;
  const parts = [];

  await writeFile(root, 'packages/shared/src/cds/types.ts', generateCdsTypes(), stats);

  for (let p = 0; p < totalRules / rulesPerPart; p++) {
    const partRules = Array.from({ length: rulesPerPart }, (_, i) =>
      generateCdsRule(p * rulesPerPart + i, rng),
    );
    parts.push(p + 1);
    await writeFile(root, `packages/shared/src/cds/rules/cds-rules-part-${String(p + 1).padStart(3, '0')}.ts`, generateRulePart(partRules, p + 1), stats);
  }

  const indexContent = `/** MedSphere CDS rules catalog */
import type { CdsRule } from '../types';
${parts.map((p) => `import { cdsRulesPart${p} } from './cds-rules-part-${String(p).padStart(3, '0')}';`).join('\n')}

export const cdsRulesCatalog: CdsRule[] = [
${parts.map((p) => `  ...cdsRulesPart${p},`).join('\n')}
];

export function findCdsRuleById(id: string): CdsRule | undefined {
  return cdsRulesCatalog.find((r) => r.id === id);
}

export function findCdsRulesByCategory(category: string): CdsRule[] {
  return cdsRulesCatalog.filter((r) => r.category === category);
}
`;
  await writeFile(root, 'packages/shared/src/cds/rules/index.ts', indexContent, stats);
  await writeFile(root, 'packages/shared/src/cds/index.ts', `export * from './types';\nexport * from './rules';\n`, stats);

  for (let p = 0; p < parts.length; p++) {
    const partRules = Array.from({ length: rulesPerPart }, (_, i) =>
      generateCdsRule(50000 + p * rulesPerPart + i, createRng(50000 + p)),
    );
    await writeFile(root, `services/diagnosis-ai/src/rules/cds-rules-part-${String(p + 1).padStart(3, '0')}.json`, JSON.stringify(partRules, null, 2), stats);
  }

  await writeFile(root, 'services/diagnosis-ai/src/rules/index.json', JSON.stringify({
    description: 'MedSphere synthetic CDS rules for diagnosis-ai service',
    totalParts: parts.length,
    rulesPerPart,
    categories: RULE_CATEGORIES,
  }, null, 2), stats);
}

export async function wireSharedCdsExport(root, stats) {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const exportLine = "export * from './cds';";
  const fullPath = path.join(root, 'packages/shared/src/index.ts');
  let existing = await fs.readFile(fullPath, 'utf8');
  if (!existing.includes(exportLine)) {
    await fs.writeFile(fullPath, existing.trimEnd() + '\n' + exportLine + '\n', 'utf8');
    stats.record('packages/shared/src/index.ts (cds export)', exportLine + '\n');
  }
}
