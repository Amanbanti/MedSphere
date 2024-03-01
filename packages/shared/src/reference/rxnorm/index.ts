/**
 * MedSphere synthetic reference set for development and testing.
 * Not affiliated with or derived from proprietary code system releases
 * (ICD-10-CM, CPT, LOINC, RxNorm, SNOMED CT, CVX).
 */

export interface RxNormEntry {
  rxcui: string;
  name: string;
  strength: string;
  doseForm: string;
  route: string;
  ingredient: string;
  brandName: string | null;
  schedule: string;
  ndcPattern: string;
}

export { RXNORM_PART_001 } from './rxnorm-part-001';
export { RXNORM_PART_002 } from './rxnorm-part-002';
export { RXNORM_PART_003 } from './rxnorm-part-003';
export { RXNORM_PART_004 } from './rxnorm-part-004';
export { RXNORM_PART_005 } from './rxnorm-part-005';
export { RXNORM_PART_006 } from './rxnorm-part-006';
export { RXNORM_PART_007 } from './rxnorm-part-007';
export { RXNORM_PART_008 } from './rxnorm-part-008';
export { RXNORM_PART_009 } from './rxnorm-part-009';
export { RXNORM_PART_010 } from './rxnorm-part-010';
export { RXNORM_PART_011 } from './rxnorm-part-011';
export { RXNORM_PART_012 } from './rxnorm-part-012';
export { RXNORM_PART_013 } from './rxnorm-part-013';
export { RXNORM_PART_014 } from './rxnorm-part-014';
export { RXNORM_PART_015 } from './rxnorm-part-015';
export { RXNORM_PART_016 } from './rxnorm-part-016';
export { RXNORM_PART_017 } from './rxnorm-part-017';
export { RXNORM_PART_018 } from './rxnorm-part-018';
export { RXNORM_PART_019 } from './rxnorm-part-019';
export { RXNORM_PART_020 } from './rxnorm-part-020';
export { RXNORM_PART_021 } from './rxnorm-part-021';
export { RXNORM_PART_022 } from './rxnorm-part-022';
export { RXNORM_PART_023 } from './rxnorm-part-023';
export { RXNORM_PART_024 } from './rxnorm-part-024';
export { RXNORM_PART_025 } from './rxnorm-part-025';
export { RXNORM_PART_026 } from './rxnorm-part-026';
export { RXNORM_PART_027 } from './rxnorm-part-027';
export { RXNORM_PART_028 } from './rxnorm-part-028';
export { RXNORM_PART_029 } from './rxnorm-part-029';
export { RXNORM_PART_030 } from './rxnorm-part-030';
export { RXNORM_PART_031 } from './rxnorm-part-031';
export { RXNORM_PART_032 } from './rxnorm-part-032';
export { RXNORM_PART_033 } from './rxnorm-part-033';
export { RXNORM_PART_034 } from './rxnorm-part-034';
export { RXNORM_PART_035 } from './rxnorm-part-035';
export { RXNORM_PART_036 } from './rxnorm-part-036';
export { RXNORM_PART_037 } from './rxnorm-part-037';
export { RXNORM_PART_038 } from './rxnorm-part-038';
export { RXNORM_PART_039 } from './rxnorm-part-039';
export { RXNORM_PART_040 } from './rxnorm-part-040';
export { RXNORM_PART_041 } from './rxnorm-part-041';
export { RXNORM_PART_042 } from './rxnorm-part-042';
export { RXNORM_PART_043 } from './rxnorm-part-043';
export { RXNORM_PART_044 } from './rxnorm-part-044';
export { RXNORM_PART_045 } from './rxnorm-part-045';
export { RXNORM_PART_046 } from './rxnorm-part-046';
export { RXNORM_PART_047 } from './rxnorm-part-047';
export { RXNORM_PART_048 } from './rxnorm-part-048';
export { RXNORM_PART_049 } from './rxnorm-part-049';
export { RXNORM_PART_050 } from './rxnorm-part-050';
export { RXNORM_PART_051 } from './rxnorm-part-051';
export { RXNORM_PART_052 } from './rxnorm-part-052';

import { RXNORM_PART_001 } from './rxnorm-part-001';
import { RXNORM_PART_002 } from './rxnorm-part-002';
import { RXNORM_PART_003 } from './rxnorm-part-003';
import { RXNORM_PART_004 } from './rxnorm-part-004';
import { RXNORM_PART_005 } from './rxnorm-part-005';
import { RXNORM_PART_006 } from './rxnorm-part-006';
import { RXNORM_PART_007 } from './rxnorm-part-007';
import { RXNORM_PART_008 } from './rxnorm-part-008';
import { RXNORM_PART_009 } from './rxnorm-part-009';
import { RXNORM_PART_010 } from './rxnorm-part-010';
import { RXNORM_PART_011 } from './rxnorm-part-011';
import { RXNORM_PART_012 } from './rxnorm-part-012';
import { RXNORM_PART_013 } from './rxnorm-part-013';
import { RXNORM_PART_014 } from './rxnorm-part-014';
import { RXNORM_PART_015 } from './rxnorm-part-015';
import { RXNORM_PART_016 } from './rxnorm-part-016';
import { RXNORM_PART_017 } from './rxnorm-part-017';
import { RXNORM_PART_018 } from './rxnorm-part-018';
import { RXNORM_PART_019 } from './rxnorm-part-019';
import { RXNORM_PART_020 } from './rxnorm-part-020';
import { RXNORM_PART_021 } from './rxnorm-part-021';
import { RXNORM_PART_022 } from './rxnorm-part-022';
import { RXNORM_PART_023 } from './rxnorm-part-023';
import { RXNORM_PART_024 } from './rxnorm-part-024';
import { RXNORM_PART_025 } from './rxnorm-part-025';
import { RXNORM_PART_026 } from './rxnorm-part-026';
import { RXNORM_PART_027 } from './rxnorm-part-027';
import { RXNORM_PART_028 } from './rxnorm-part-028';
import { RXNORM_PART_029 } from './rxnorm-part-029';
import { RXNORM_PART_030 } from './rxnorm-part-030';
import { RXNORM_PART_031 } from './rxnorm-part-031';
import { RXNORM_PART_032 } from './rxnorm-part-032';
import { RXNORM_PART_033 } from './rxnorm-part-033';
import { RXNORM_PART_034 } from './rxnorm-part-034';
import { RXNORM_PART_035 } from './rxnorm-part-035';
import { RXNORM_PART_036 } from './rxnorm-part-036';
import { RXNORM_PART_037 } from './rxnorm-part-037';
import { RXNORM_PART_038 } from './rxnorm-part-038';
import { RXNORM_PART_039 } from './rxnorm-part-039';
import { RXNORM_PART_040 } from './rxnorm-part-040';
import { RXNORM_PART_041 } from './rxnorm-part-041';
import { RXNORM_PART_042 } from './rxnorm-part-042';
import { RXNORM_PART_043 } from './rxnorm-part-043';
import { RXNORM_PART_044 } from './rxnorm-part-044';
import { RXNORM_PART_045 } from './rxnorm-part-045';
import { RXNORM_PART_046 } from './rxnorm-part-046';
import { RXNORM_PART_047 } from './rxnorm-part-047';
import { RXNORM_PART_048 } from './rxnorm-part-048';
import { RXNORM_PART_049 } from './rxnorm-part-049';
import { RXNORM_PART_050 } from './rxnorm-part-050';
import { RXNORM_PART_051 } from './rxnorm-part-051';
import { RXNORM_PART_052 } from './rxnorm-part-052';

export const rxnormCatalog: RxNormEntry[] = [
  ...RXNORM_PART_001,
  ...RXNORM_PART_002,
  ...RXNORM_PART_003,
  ...RXNORM_PART_004,
  ...RXNORM_PART_005,
  ...RXNORM_PART_006,
  ...RXNORM_PART_007,
  ...RXNORM_PART_008,
  ...RXNORM_PART_009,
  ...RXNORM_PART_010,
  ...RXNORM_PART_011,
  ...RXNORM_PART_012,
  ...RXNORM_PART_013,
  ...RXNORM_PART_014,
  ...RXNORM_PART_015,
  ...RXNORM_PART_016,
  ...RXNORM_PART_017,
  ...RXNORM_PART_018,
  ...RXNORM_PART_019,
  ...RXNORM_PART_020,
  ...RXNORM_PART_021,
  ...RXNORM_PART_022,
  ...RXNORM_PART_023,
  ...RXNORM_PART_024,
  ...RXNORM_PART_025,
  ...RXNORM_PART_026,
  ...RXNORM_PART_027,
  ...RXNORM_PART_028,
  ...RXNORM_PART_029,
  ...RXNORM_PART_030,
  ...RXNORM_PART_031,
  ...RXNORM_PART_032,
  ...RXNORM_PART_033,
  ...RXNORM_PART_034,
  ...RXNORM_PART_035,
  ...RXNORM_PART_036,
  ...RXNORM_PART_037,
  ...RXNORM_PART_038,
  ...RXNORM_PART_039,
  ...RXNORM_PART_040,
  ...RXNORM_PART_041,
  ...RXNORM_PART_042,
  ...RXNORM_PART_043,
  ...RXNORM_PART_044,
  ...RXNORM_PART_045,
  ...RXNORM_PART_046,
  ...RXNORM_PART_047,
  ...RXNORM_PART_048,
  ...RXNORM_PART_049,
  ...RXNORM_PART_050,
  ...RXNORM_PART_051,
  ...RXNORM_PART_052,
];

export function findRxNormByCode(code: string): RxNormEntry | undefined {
  return rxnormCatalog.find((e) => e.code === code);
}

export function searchRxNorm(query: string, limit = 50): RxNormEntry[] {
  const q = query.toLowerCase();
  const results: RxNormEntry[] = [];
  for (const entry of rxnormCatalog) {
    if (entry.code.toLowerCase().includes(q) || entry.description.toLowerCase().includes(q)) {
      results.push(entry);
      if (results.length >= limit) break;
    }
  }
  return results;
}
