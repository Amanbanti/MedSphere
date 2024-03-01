/**
 * MedSphere synthetic reference set for development and testing.
 * Not affiliated with or derived from proprietary code system releases
 * (ICD-10-CM, CPT, LOINC, RxNorm, SNOMED CT, CVX).
 */

export interface LoincEntry {
  code: string;
  component: string;
  property: string;
  timing: string;
  system: string;
  scale: string;
  method: string;
  longName: string;
  unit: string;
  referenceRangeHint: string;
}

export { LOINC_PART_001 } from './loinc-part-001';
export { LOINC_PART_002 } from './loinc-part-002';
export { LOINC_PART_003 } from './loinc-part-003';
export { LOINC_PART_004 } from './loinc-part-004';
export { LOINC_PART_005 } from './loinc-part-005';
export { LOINC_PART_006 } from './loinc-part-006';
export { LOINC_PART_007 } from './loinc-part-007';
export { LOINC_PART_008 } from './loinc-part-008';
export { LOINC_PART_009 } from './loinc-part-009';
export { LOINC_PART_010 } from './loinc-part-010';
export { LOINC_PART_011 } from './loinc-part-011';
export { LOINC_PART_012 } from './loinc-part-012';
export { LOINC_PART_013 } from './loinc-part-013';
export { LOINC_PART_014 } from './loinc-part-014';
export { LOINC_PART_015 } from './loinc-part-015';
export { LOINC_PART_016 } from './loinc-part-016';
export { LOINC_PART_017 } from './loinc-part-017';
export { LOINC_PART_018 } from './loinc-part-018';
export { LOINC_PART_019 } from './loinc-part-019';
export { LOINC_PART_020 } from './loinc-part-020';
export { LOINC_PART_021 } from './loinc-part-021';
export { LOINC_PART_022 } from './loinc-part-022';
export { LOINC_PART_023 } from './loinc-part-023';
export { LOINC_PART_024 } from './loinc-part-024';
export { LOINC_PART_025 } from './loinc-part-025';
export { LOINC_PART_026 } from './loinc-part-026';
export { LOINC_PART_027 } from './loinc-part-027';
export { LOINC_PART_028 } from './loinc-part-028';
export { LOINC_PART_029 } from './loinc-part-029';
export { LOINC_PART_030 } from './loinc-part-030';
export { LOINC_PART_031 } from './loinc-part-031';
export { LOINC_PART_032 } from './loinc-part-032';
export { LOINC_PART_033 } from './loinc-part-033';
export { LOINC_PART_034 } from './loinc-part-034';
export { LOINC_PART_035 } from './loinc-part-035';
export { LOINC_PART_036 } from './loinc-part-036';
export { LOINC_PART_037 } from './loinc-part-037';
export { LOINC_PART_038 } from './loinc-part-038';
export { LOINC_PART_039 } from './loinc-part-039';

import { LOINC_PART_001 } from './loinc-part-001';
import { LOINC_PART_002 } from './loinc-part-002';
import { LOINC_PART_003 } from './loinc-part-003';
import { LOINC_PART_004 } from './loinc-part-004';
import { LOINC_PART_005 } from './loinc-part-005';
import { LOINC_PART_006 } from './loinc-part-006';
import { LOINC_PART_007 } from './loinc-part-007';
import { LOINC_PART_008 } from './loinc-part-008';
import { LOINC_PART_009 } from './loinc-part-009';
import { LOINC_PART_010 } from './loinc-part-010';
import { LOINC_PART_011 } from './loinc-part-011';
import { LOINC_PART_012 } from './loinc-part-012';
import { LOINC_PART_013 } from './loinc-part-013';
import { LOINC_PART_014 } from './loinc-part-014';
import { LOINC_PART_015 } from './loinc-part-015';
import { LOINC_PART_016 } from './loinc-part-016';
import { LOINC_PART_017 } from './loinc-part-017';
import { LOINC_PART_018 } from './loinc-part-018';
import { LOINC_PART_019 } from './loinc-part-019';
import { LOINC_PART_020 } from './loinc-part-020';
import { LOINC_PART_021 } from './loinc-part-021';
import { LOINC_PART_022 } from './loinc-part-022';
import { LOINC_PART_023 } from './loinc-part-023';
import { LOINC_PART_024 } from './loinc-part-024';
import { LOINC_PART_025 } from './loinc-part-025';
import { LOINC_PART_026 } from './loinc-part-026';
import { LOINC_PART_027 } from './loinc-part-027';
import { LOINC_PART_028 } from './loinc-part-028';
import { LOINC_PART_029 } from './loinc-part-029';
import { LOINC_PART_030 } from './loinc-part-030';
import { LOINC_PART_031 } from './loinc-part-031';
import { LOINC_PART_032 } from './loinc-part-032';
import { LOINC_PART_033 } from './loinc-part-033';
import { LOINC_PART_034 } from './loinc-part-034';
import { LOINC_PART_035 } from './loinc-part-035';
import { LOINC_PART_036 } from './loinc-part-036';
import { LOINC_PART_037 } from './loinc-part-037';
import { LOINC_PART_038 } from './loinc-part-038';
import { LOINC_PART_039 } from './loinc-part-039';

export const loincCatalog: LoincEntry[] = [
  ...LOINC_PART_001,
  ...LOINC_PART_002,
  ...LOINC_PART_003,
  ...LOINC_PART_004,
  ...LOINC_PART_005,
  ...LOINC_PART_006,
  ...LOINC_PART_007,
  ...LOINC_PART_008,
  ...LOINC_PART_009,
  ...LOINC_PART_010,
  ...LOINC_PART_011,
  ...LOINC_PART_012,
  ...LOINC_PART_013,
  ...LOINC_PART_014,
  ...LOINC_PART_015,
  ...LOINC_PART_016,
  ...LOINC_PART_017,
  ...LOINC_PART_018,
  ...LOINC_PART_019,
  ...LOINC_PART_020,
  ...LOINC_PART_021,
  ...LOINC_PART_022,
  ...LOINC_PART_023,
  ...LOINC_PART_024,
  ...LOINC_PART_025,
  ...LOINC_PART_026,
  ...LOINC_PART_027,
  ...LOINC_PART_028,
  ...LOINC_PART_029,
  ...LOINC_PART_030,
  ...LOINC_PART_031,
  ...LOINC_PART_032,
  ...LOINC_PART_033,
  ...LOINC_PART_034,
  ...LOINC_PART_035,
  ...LOINC_PART_036,
  ...LOINC_PART_037,
  ...LOINC_PART_038,
  ...LOINC_PART_039,
];

export function findLoincByCode(code: string): LoincEntry | undefined {
  return loincCatalog.find((e) => e.code === code);
}

export function searchLoinc(query: string, limit = 50): LoincEntry[] {
  const q = query.toLowerCase();
  const results: LoincEntry[] = [];
  for (const entry of loincCatalog) {
    if (entry.code.toLowerCase().includes(q) || entry.description.toLowerCase().includes(q)) {
      results.push(entry);
      if (results.length >= limit) break;
    }
  }
  return results;
}
