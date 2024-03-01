/**
 * MedSphere synthetic reference set for development and testing.
 * Not affiliated with or derived from proprietary code system releases
 * (ICD-10-CM, CPT, LOINC, RxNorm, SNOMED CT, CVX).
 */

export interface SnomedEntry {
  conceptId: string;
  preferredTerm: string;
  semanticTag: string;
  active: boolean;
  definitionStatus: string;
  moduleId: string;
}

export { SNOMED_PART_001 } from './snomed-part-001';
export { SNOMED_PART_002 } from './snomed-part-002';
export { SNOMED_PART_003 } from './snomed-part-003';
export { SNOMED_PART_004 } from './snomed-part-004';
export { SNOMED_PART_005 } from './snomed-part-005';
export { SNOMED_PART_006 } from './snomed-part-006';
export { SNOMED_PART_007 } from './snomed-part-007';
export { SNOMED_PART_008 } from './snomed-part-008';
export { SNOMED_PART_009 } from './snomed-part-009';
export { SNOMED_PART_010 } from './snomed-part-010';
export { SNOMED_PART_011 } from './snomed-part-011';
export { SNOMED_PART_012 } from './snomed-part-012';
export { SNOMED_PART_013 } from './snomed-part-013';
export { SNOMED_PART_014 } from './snomed-part-014';
export { SNOMED_PART_015 } from './snomed-part-015';
export { SNOMED_PART_016 } from './snomed-part-016';
export { SNOMED_PART_017 } from './snomed-part-017';
export { SNOMED_PART_018 } from './snomed-part-018';
export { SNOMED_PART_019 } from './snomed-part-019';
export { SNOMED_PART_020 } from './snomed-part-020';
export { SNOMED_PART_021 } from './snomed-part-021';
export { SNOMED_PART_022 } from './snomed-part-022';
export { SNOMED_PART_023 } from './snomed-part-023';
export { SNOMED_PART_024 } from './snomed-part-024';
export { SNOMED_PART_025 } from './snomed-part-025';

import { SNOMED_PART_001 } from './snomed-part-001';
import { SNOMED_PART_002 } from './snomed-part-002';
import { SNOMED_PART_003 } from './snomed-part-003';
import { SNOMED_PART_004 } from './snomed-part-004';
import { SNOMED_PART_005 } from './snomed-part-005';
import { SNOMED_PART_006 } from './snomed-part-006';
import { SNOMED_PART_007 } from './snomed-part-007';
import { SNOMED_PART_008 } from './snomed-part-008';
import { SNOMED_PART_009 } from './snomed-part-009';
import { SNOMED_PART_010 } from './snomed-part-010';
import { SNOMED_PART_011 } from './snomed-part-011';
import { SNOMED_PART_012 } from './snomed-part-012';
import { SNOMED_PART_013 } from './snomed-part-013';
import { SNOMED_PART_014 } from './snomed-part-014';
import { SNOMED_PART_015 } from './snomed-part-015';
import { SNOMED_PART_016 } from './snomed-part-016';
import { SNOMED_PART_017 } from './snomed-part-017';
import { SNOMED_PART_018 } from './snomed-part-018';
import { SNOMED_PART_019 } from './snomed-part-019';
import { SNOMED_PART_020 } from './snomed-part-020';
import { SNOMED_PART_021 } from './snomed-part-021';
import { SNOMED_PART_022 } from './snomed-part-022';
import { SNOMED_PART_023 } from './snomed-part-023';
import { SNOMED_PART_024 } from './snomed-part-024';
import { SNOMED_PART_025 } from './snomed-part-025';

export const snomedCatalog: SnomedEntry[] = [
  ...SNOMED_PART_001,
  ...SNOMED_PART_002,
  ...SNOMED_PART_003,
  ...SNOMED_PART_004,
  ...SNOMED_PART_005,
  ...SNOMED_PART_006,
  ...SNOMED_PART_007,
  ...SNOMED_PART_008,
  ...SNOMED_PART_009,
  ...SNOMED_PART_010,
  ...SNOMED_PART_011,
  ...SNOMED_PART_012,
  ...SNOMED_PART_013,
  ...SNOMED_PART_014,
  ...SNOMED_PART_015,
  ...SNOMED_PART_016,
  ...SNOMED_PART_017,
  ...SNOMED_PART_018,
  ...SNOMED_PART_019,
  ...SNOMED_PART_020,
  ...SNOMED_PART_021,
  ...SNOMED_PART_022,
  ...SNOMED_PART_023,
  ...SNOMED_PART_024,
  ...SNOMED_PART_025,
];

export function findSnomedByCode(code: string): SnomedEntry | undefined {
  return snomedCatalog.find((e) => e.code === code);
}

export function searchSnomed(query: string, limit = 50): SnomedEntry[] {
  const q = query.toLowerCase();
  const results: SnomedEntry[] = [];
  for (const entry of snomedCatalog) {
    if (entry.code.toLowerCase().includes(q) || entry.description.toLowerCase().includes(q)) {
      results.push(entry);
      if (results.length >= limit) break;
    }
  }
  return results;
}
