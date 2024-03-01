/**
 * MedSphere synthetic reference set for development and testing.
 * Not affiliated with or derived from proprietary code system releases
 * (ICD-10-CM, CPT, LOINC, RxNorm, SNOMED CT, CVX).
 */

export interface CptEntry {
  code: string;
  description: string;
  category: string;
  bodyRegion: string;
  rvuWork: number;
  rvuFacility: number;
  rvuNonFacility: number;
  modifierAllowed: boolean;
}

export { CPT_PART_001 } from './cpt-part-001';
export { CPT_PART_002 } from './cpt-part-002';
export { CPT_PART_003 } from './cpt-part-003';
export { CPT_PART_004 } from './cpt-part-004';
export { CPT_PART_005 } from './cpt-part-005';
export { CPT_PART_006 } from './cpt-part-006';
export { CPT_PART_007 } from './cpt-part-007';
export { CPT_PART_008 } from './cpt-part-008';
export { CPT_PART_009 } from './cpt-part-009';
export { CPT_PART_010 } from './cpt-part-010';
export { CPT_PART_011 } from './cpt-part-011';
export { CPT_PART_012 } from './cpt-part-012';
export { CPT_PART_013 } from './cpt-part-013';
export { CPT_PART_014 } from './cpt-part-014';
export { CPT_PART_015 } from './cpt-part-015';
export { CPT_PART_016 } from './cpt-part-016';
export { CPT_PART_017 } from './cpt-part-017';
export { CPT_PART_018 } from './cpt-part-018';
export { CPT_PART_019 } from './cpt-part-019';
export { CPT_PART_020 } from './cpt-part-020';
export { CPT_PART_021 } from './cpt-part-021';
export { CPT_PART_022 } from './cpt-part-022';
export { CPT_PART_023 } from './cpt-part-023';
export { CPT_PART_024 } from './cpt-part-024';
export { CPT_PART_025 } from './cpt-part-025';
export { CPT_PART_026 } from './cpt-part-026';
export { CPT_PART_027 } from './cpt-part-027';
export { CPT_PART_028 } from './cpt-part-028';
export { CPT_PART_029 } from './cpt-part-029';
export { CPT_PART_030 } from './cpt-part-030';
export { CPT_PART_031 } from './cpt-part-031';
export { CPT_PART_032 } from './cpt-part-032';

import { CPT_PART_001 } from './cpt-part-001';
import { CPT_PART_002 } from './cpt-part-002';
import { CPT_PART_003 } from './cpt-part-003';
import { CPT_PART_004 } from './cpt-part-004';
import { CPT_PART_005 } from './cpt-part-005';
import { CPT_PART_006 } from './cpt-part-006';
import { CPT_PART_007 } from './cpt-part-007';
import { CPT_PART_008 } from './cpt-part-008';
import { CPT_PART_009 } from './cpt-part-009';
import { CPT_PART_010 } from './cpt-part-010';
import { CPT_PART_011 } from './cpt-part-011';
import { CPT_PART_012 } from './cpt-part-012';
import { CPT_PART_013 } from './cpt-part-013';
import { CPT_PART_014 } from './cpt-part-014';
import { CPT_PART_015 } from './cpt-part-015';
import { CPT_PART_016 } from './cpt-part-016';
import { CPT_PART_017 } from './cpt-part-017';
import { CPT_PART_018 } from './cpt-part-018';
import { CPT_PART_019 } from './cpt-part-019';
import { CPT_PART_020 } from './cpt-part-020';
import { CPT_PART_021 } from './cpt-part-021';
import { CPT_PART_022 } from './cpt-part-022';
import { CPT_PART_023 } from './cpt-part-023';
import { CPT_PART_024 } from './cpt-part-024';
import { CPT_PART_025 } from './cpt-part-025';
import { CPT_PART_026 } from './cpt-part-026';
import { CPT_PART_027 } from './cpt-part-027';
import { CPT_PART_028 } from './cpt-part-028';
import { CPT_PART_029 } from './cpt-part-029';
import { CPT_PART_030 } from './cpt-part-030';
import { CPT_PART_031 } from './cpt-part-031';
import { CPT_PART_032 } from './cpt-part-032';

export const cptCatalog: CptEntry[] = [
  ...CPT_PART_001,
  ...CPT_PART_002,
  ...CPT_PART_003,
  ...CPT_PART_004,
  ...CPT_PART_005,
  ...CPT_PART_006,
  ...CPT_PART_007,
  ...CPT_PART_008,
  ...CPT_PART_009,
  ...CPT_PART_010,
  ...CPT_PART_011,
  ...CPT_PART_012,
  ...CPT_PART_013,
  ...CPT_PART_014,
  ...CPT_PART_015,
  ...CPT_PART_016,
  ...CPT_PART_017,
  ...CPT_PART_018,
  ...CPT_PART_019,
  ...CPT_PART_020,
  ...CPT_PART_021,
  ...CPT_PART_022,
  ...CPT_PART_023,
  ...CPT_PART_024,
  ...CPT_PART_025,
  ...CPT_PART_026,
  ...CPT_PART_027,
  ...CPT_PART_028,
  ...CPT_PART_029,
  ...CPT_PART_030,
  ...CPT_PART_031,
  ...CPT_PART_032,
];

export function findCptByCode(code: string): CptEntry | undefined {
  return cptCatalog.find((e) => e.code === code);
}

export function searchCpt(query: string, limit = 50): CptEntry[] {
  const q = query.toLowerCase();
  const results: CptEntry[] = [];
  for (const entry of cptCatalog) {
    if (entry.code.toLowerCase().includes(q) || entry.description.toLowerCase().includes(q)) {
      results.push(entry);
      if (results.length >= limit) break;
    }
  }
  return results;
}
