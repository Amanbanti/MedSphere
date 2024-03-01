/** MedSphere CDS rules catalog */
import type { CdsRule } from '../types';
import { cdsRulesPart1 } from './cds-rules-part-001';
import { cdsRulesPart2 } from './cds-rules-part-002';
import { cdsRulesPart3 } from './cds-rules-part-003';
import { cdsRulesPart4 } from './cds-rules-part-004';
import { cdsRulesPart5 } from './cds-rules-part-005';
import { cdsRulesPart6 } from './cds-rules-part-006';
import { cdsRulesPart7 } from './cds-rules-part-007';
import { cdsRulesPart8 } from './cds-rules-part-008';
import { cdsRulesPart9 } from './cds-rules-part-009';
import { cdsRulesPart10 } from './cds-rules-part-010';
import { cdsRulesPart11 } from './cds-rules-part-011';
import { cdsRulesPart12 } from './cds-rules-part-012';
import { cdsRulesPart13 } from './cds-rules-part-013';
import { cdsRulesPart14 } from './cds-rules-part-014';
import { cdsRulesPart15 } from './cds-rules-part-015';
import { cdsRulesPart16 } from './cds-rules-part-016';
import { cdsRulesPart17 } from './cds-rules-part-017';
import { cdsRulesPart18 } from './cds-rules-part-018';
import { cdsRulesPart19 } from './cds-rules-part-019';
import { cdsRulesPart20 } from './cds-rules-part-020';
import { cdsRulesPart21 } from './cds-rules-part-021';
import { cdsRulesPart22 } from './cds-rules-part-022';
import { cdsRulesPart23 } from './cds-rules-part-023';
import { cdsRulesPart24 } from './cds-rules-part-024';
import { cdsRulesPart25 } from './cds-rules-part-025';
import { cdsRulesPart26 } from './cds-rules-part-026';
import { cdsRulesPart27 } from './cds-rules-part-027';
import { cdsRulesPart28 } from './cds-rules-part-028';
import { cdsRulesPart29 } from './cds-rules-part-029';
import { cdsRulesPart30 } from './cds-rules-part-030';

export const cdsRulesCatalog: CdsRule[] = [
  ...cdsRulesPart1,
  ...cdsRulesPart2,
  ...cdsRulesPart3,
  ...cdsRulesPart4,
  ...cdsRulesPart5,
  ...cdsRulesPart6,
  ...cdsRulesPart7,
  ...cdsRulesPart8,
  ...cdsRulesPart9,
  ...cdsRulesPart10,
  ...cdsRulesPart11,
  ...cdsRulesPart12,
  ...cdsRulesPart13,
  ...cdsRulesPart14,
  ...cdsRulesPart15,
  ...cdsRulesPart16,
  ...cdsRulesPart17,
  ...cdsRulesPart18,
  ...cdsRulesPart19,
  ...cdsRulesPart20,
  ...cdsRulesPart21,
  ...cdsRulesPart22,
  ...cdsRulesPart23,
  ...cdsRulesPart24,
  ...cdsRulesPart25,
  ...cdsRulesPart26,
  ...cdsRulesPart27,
  ...cdsRulesPart28,
  ...cdsRulesPart29,
  ...cdsRulesPart30,
];

export function findCdsRuleById(id: string): CdsRule | undefined {
  return cdsRulesCatalog.find((r) => r.id === id);
}

export function findCdsRulesByCategory(category: string): CdsRule[] {
  return cdsRulesCatalog.filter((r) => r.category === category);
}
