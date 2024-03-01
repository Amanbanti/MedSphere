/**
 * MedSphere synthetic reference set for development and testing.
 * Not affiliated with or derived from proprietary code system releases
 * (ICD-10-CM, CPT, LOINC, RxNorm, SNOMED CT, CVX).
 */

export interface DrugInteractionEntry {
  drugA: string;
  drugB: string;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  mechanism: string;
  clinicalEffect: string;
  management: string;
  evidenceLevel: string;
}

export { DRUG_INTERACTIONS_PART_001 } from './drug-interactions-part-001';
export { DRUG_INTERACTIONS_PART_002 } from './drug-interactions-part-002';
export { DRUG_INTERACTIONS_PART_003 } from './drug-interactions-part-003';
export { DRUG_INTERACTIONS_PART_004 } from './drug-interactions-part-004';
export { DRUG_INTERACTIONS_PART_005 } from './drug-interactions-part-005';
export { DRUG_INTERACTIONS_PART_006 } from './drug-interactions-part-006';
export { DRUG_INTERACTIONS_PART_007 } from './drug-interactions-part-007';
export { DRUG_INTERACTIONS_PART_008 } from './drug-interactions-part-008';
export { DRUG_INTERACTIONS_PART_009 } from './drug-interactions-part-009';
export { DRUG_INTERACTIONS_PART_010 } from './drug-interactions-part-010';
export { DRUG_INTERACTIONS_PART_011 } from './drug-interactions-part-011';
export { DRUG_INTERACTIONS_PART_012 } from './drug-interactions-part-012';
export { DRUG_INTERACTIONS_PART_013 } from './drug-interactions-part-013';
export { DRUG_INTERACTIONS_PART_014 } from './drug-interactions-part-014';
export { DRUG_INTERACTIONS_PART_015 } from './drug-interactions-part-015';
export { DRUG_INTERACTIONS_PART_016 } from './drug-interactions-part-016';
export { DRUG_INTERACTIONS_PART_017 } from './drug-interactions-part-017';
export { DRUG_INTERACTIONS_PART_018 } from './drug-interactions-part-018';
export { DRUG_INTERACTIONS_PART_019 } from './drug-interactions-part-019';
export { DRUG_INTERACTIONS_PART_020 } from './drug-interactions-part-020';
export { DRUG_INTERACTIONS_PART_021 } from './drug-interactions-part-021';
export { DRUG_INTERACTIONS_PART_022 } from './drug-interactions-part-022';
export { DRUG_INTERACTIONS_PART_023 } from './drug-interactions-part-023';
export { DRUG_INTERACTIONS_PART_024 } from './drug-interactions-part-024';
export { DRUG_INTERACTIONS_PART_025 } from './drug-interactions-part-025';
export { DRUG_INTERACTIONS_PART_026 } from './drug-interactions-part-026';
export { DRUG_INTERACTIONS_PART_027 } from './drug-interactions-part-027';
export { DRUG_INTERACTIONS_PART_028 } from './drug-interactions-part-028';
export { DRUG_INTERACTIONS_PART_029 } from './drug-interactions-part-029';
export { DRUG_INTERACTIONS_PART_030 } from './drug-interactions-part-030';
export { DRUG_INTERACTIONS_PART_031 } from './drug-interactions-part-031';
export { DRUG_INTERACTIONS_PART_032 } from './drug-interactions-part-032';
export { DRUG_INTERACTIONS_PART_033 } from './drug-interactions-part-033';
export { DRUG_INTERACTIONS_PART_034 } from './drug-interactions-part-034';
export { DRUG_INTERACTIONS_PART_035 } from './drug-interactions-part-035';
export { DRUG_INTERACTIONS_PART_036 } from './drug-interactions-part-036';
export { DRUG_INTERACTIONS_PART_037 } from './drug-interactions-part-037';
export { DRUG_INTERACTIONS_PART_038 } from './drug-interactions-part-038';
export { DRUG_INTERACTIONS_PART_039 } from './drug-interactions-part-039';
export { DRUG_INTERACTIONS_PART_040 } from './drug-interactions-part-040';
export { DRUG_INTERACTIONS_PART_041 } from './drug-interactions-part-041';
export { DRUG_INTERACTIONS_PART_042 } from './drug-interactions-part-042';
export { DRUG_INTERACTIONS_PART_043 } from './drug-interactions-part-043';
export { DRUG_INTERACTIONS_PART_044 } from './drug-interactions-part-044';
export { DRUG_INTERACTIONS_PART_045 } from './drug-interactions-part-045';
export { DRUG_INTERACTIONS_PART_046 } from './drug-interactions-part-046';
export { DRUG_INTERACTIONS_PART_047 } from './drug-interactions-part-047';

import { DRUG_INTERACTIONS_PART_001 } from './drug-interactions-part-001';
import { DRUG_INTERACTIONS_PART_002 } from './drug-interactions-part-002';
import { DRUG_INTERACTIONS_PART_003 } from './drug-interactions-part-003';
import { DRUG_INTERACTIONS_PART_004 } from './drug-interactions-part-004';
import { DRUG_INTERACTIONS_PART_005 } from './drug-interactions-part-005';
import { DRUG_INTERACTIONS_PART_006 } from './drug-interactions-part-006';
import { DRUG_INTERACTIONS_PART_007 } from './drug-interactions-part-007';
import { DRUG_INTERACTIONS_PART_008 } from './drug-interactions-part-008';
import { DRUG_INTERACTIONS_PART_009 } from './drug-interactions-part-009';
import { DRUG_INTERACTIONS_PART_010 } from './drug-interactions-part-010';
import { DRUG_INTERACTIONS_PART_011 } from './drug-interactions-part-011';
import { DRUG_INTERACTIONS_PART_012 } from './drug-interactions-part-012';
import { DRUG_INTERACTIONS_PART_013 } from './drug-interactions-part-013';
import { DRUG_INTERACTIONS_PART_014 } from './drug-interactions-part-014';
import { DRUG_INTERACTIONS_PART_015 } from './drug-interactions-part-015';
import { DRUG_INTERACTIONS_PART_016 } from './drug-interactions-part-016';
import { DRUG_INTERACTIONS_PART_017 } from './drug-interactions-part-017';
import { DRUG_INTERACTIONS_PART_018 } from './drug-interactions-part-018';
import { DRUG_INTERACTIONS_PART_019 } from './drug-interactions-part-019';
import { DRUG_INTERACTIONS_PART_020 } from './drug-interactions-part-020';
import { DRUG_INTERACTIONS_PART_021 } from './drug-interactions-part-021';
import { DRUG_INTERACTIONS_PART_022 } from './drug-interactions-part-022';
import { DRUG_INTERACTIONS_PART_023 } from './drug-interactions-part-023';
import { DRUG_INTERACTIONS_PART_024 } from './drug-interactions-part-024';
import { DRUG_INTERACTIONS_PART_025 } from './drug-interactions-part-025';
import { DRUG_INTERACTIONS_PART_026 } from './drug-interactions-part-026';
import { DRUG_INTERACTIONS_PART_027 } from './drug-interactions-part-027';
import { DRUG_INTERACTIONS_PART_028 } from './drug-interactions-part-028';
import { DRUG_INTERACTIONS_PART_029 } from './drug-interactions-part-029';
import { DRUG_INTERACTIONS_PART_030 } from './drug-interactions-part-030';
import { DRUG_INTERACTIONS_PART_031 } from './drug-interactions-part-031';
import { DRUG_INTERACTIONS_PART_032 } from './drug-interactions-part-032';
import { DRUG_INTERACTIONS_PART_033 } from './drug-interactions-part-033';
import { DRUG_INTERACTIONS_PART_034 } from './drug-interactions-part-034';
import { DRUG_INTERACTIONS_PART_035 } from './drug-interactions-part-035';
import { DRUG_INTERACTIONS_PART_036 } from './drug-interactions-part-036';
import { DRUG_INTERACTIONS_PART_037 } from './drug-interactions-part-037';
import { DRUG_INTERACTIONS_PART_038 } from './drug-interactions-part-038';
import { DRUG_INTERACTIONS_PART_039 } from './drug-interactions-part-039';
import { DRUG_INTERACTIONS_PART_040 } from './drug-interactions-part-040';
import { DRUG_INTERACTIONS_PART_041 } from './drug-interactions-part-041';
import { DRUG_INTERACTIONS_PART_042 } from './drug-interactions-part-042';
import { DRUG_INTERACTIONS_PART_043 } from './drug-interactions-part-043';
import { DRUG_INTERACTIONS_PART_044 } from './drug-interactions-part-044';
import { DRUG_INTERACTIONS_PART_045 } from './drug-interactions-part-045';
import { DRUG_INTERACTIONS_PART_046 } from './drug-interactions-part-046';
import { DRUG_INTERACTIONS_PART_047 } from './drug-interactions-part-047';

export const drug_interactionsCatalog: DrugInteractionEntry[] = [
  ...DRUG_INTERACTIONS_PART_001,
  ...DRUG_INTERACTIONS_PART_002,
  ...DRUG_INTERACTIONS_PART_003,
  ...DRUG_INTERACTIONS_PART_004,
  ...DRUG_INTERACTIONS_PART_005,
  ...DRUG_INTERACTIONS_PART_006,
  ...DRUG_INTERACTIONS_PART_007,
  ...DRUG_INTERACTIONS_PART_008,
  ...DRUG_INTERACTIONS_PART_009,
  ...DRUG_INTERACTIONS_PART_010,
  ...DRUG_INTERACTIONS_PART_011,
  ...DRUG_INTERACTIONS_PART_012,
  ...DRUG_INTERACTIONS_PART_013,
  ...DRUG_INTERACTIONS_PART_014,
  ...DRUG_INTERACTIONS_PART_015,
  ...DRUG_INTERACTIONS_PART_016,
  ...DRUG_INTERACTIONS_PART_017,
  ...DRUG_INTERACTIONS_PART_018,
  ...DRUG_INTERACTIONS_PART_019,
  ...DRUG_INTERACTIONS_PART_020,
  ...DRUG_INTERACTIONS_PART_021,
  ...DRUG_INTERACTIONS_PART_022,
  ...DRUG_INTERACTIONS_PART_023,
  ...DRUG_INTERACTIONS_PART_024,
  ...DRUG_INTERACTIONS_PART_025,
  ...DRUG_INTERACTIONS_PART_026,
  ...DRUG_INTERACTIONS_PART_027,
  ...DRUG_INTERACTIONS_PART_028,
  ...DRUG_INTERACTIONS_PART_029,
  ...DRUG_INTERACTIONS_PART_030,
  ...DRUG_INTERACTIONS_PART_031,
  ...DRUG_INTERACTIONS_PART_032,
  ...DRUG_INTERACTIONS_PART_033,
  ...DRUG_INTERACTIONS_PART_034,
  ...DRUG_INTERACTIONS_PART_035,
  ...DRUG_INTERACTIONS_PART_036,
  ...DRUG_INTERACTIONS_PART_037,
  ...DRUG_INTERACTIONS_PART_038,
  ...DRUG_INTERACTIONS_PART_039,
  ...DRUG_INTERACTIONS_PART_040,
  ...DRUG_INTERACTIONS_PART_041,
  ...DRUG_INTERACTIONS_PART_042,
  ...DRUG_INTERACTIONS_PART_043,
  ...DRUG_INTERACTIONS_PART_044,
  ...DRUG_INTERACTIONS_PART_045,
  ...DRUG_INTERACTIONS_PART_046,
  ...DRUG_INTERACTIONS_PART_047,
];

export function findDrugInteractionByCode(code: string): DrugInteractionEntry | undefined {
  return drug_interactionsCatalog.find((e) => e.code === code);
}

export function searchDrugInteraction(query: string, limit = 50): DrugInteractionEntry[] {
  const q = query.toLowerCase();
  const results: DrugInteractionEntry[] = [];
  for (const entry of drug_interactionsCatalog) {
    if (entry.code.toLowerCase().includes(q) || entry.description.toLowerCase().includes(q)) {
      results.push(entry);
      if (results.length >= limit) break;
    }
  }
  return results;
}
