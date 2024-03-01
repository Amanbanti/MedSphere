/**
 * MedSphere synthetic reference set for development and testing.
 * Not affiliated with or derived from proprietary code system releases
 * (ICD-10-CM, CPT, LOINC, RxNorm, SNOMED CT, CVX).
 */

export interface LabReferenceRangeEntry {
  analyte: string;
  loincHint: string;
  sex: 'male' | 'female' | 'unknown';
  ageGroup: string;
  ageMinDays: number;
  ageMaxDays: number;
  unit: string;
  low: number;
  high: number;
  criticalLow: number | null;
  criticalHigh: number | null;
  specimen: string;
}

export { LAB_REFERENCE_RANGES_PART_001 } from './lab-reference-ranges-part-001';
export { LAB_REFERENCE_RANGES_PART_002 } from './lab-reference-ranges-part-002';
export { LAB_REFERENCE_RANGES_PART_003 } from './lab-reference-ranges-part-003';
export { LAB_REFERENCE_RANGES_PART_004 } from './lab-reference-ranges-part-004';
export { LAB_REFERENCE_RANGES_PART_005 } from './lab-reference-ranges-part-005';
export { LAB_REFERENCE_RANGES_PART_006 } from './lab-reference-ranges-part-006';
export { LAB_REFERENCE_RANGES_PART_007 } from './lab-reference-ranges-part-007';
export { LAB_REFERENCE_RANGES_PART_008 } from './lab-reference-ranges-part-008';
export { LAB_REFERENCE_RANGES_PART_009 } from './lab-reference-ranges-part-009';
export { LAB_REFERENCE_RANGES_PART_010 } from './lab-reference-ranges-part-010';
export { LAB_REFERENCE_RANGES_PART_011 } from './lab-reference-ranges-part-011';
export { LAB_REFERENCE_RANGES_PART_012 } from './lab-reference-ranges-part-012';
export { LAB_REFERENCE_RANGES_PART_013 } from './lab-reference-ranges-part-013';
export { LAB_REFERENCE_RANGES_PART_014 } from './lab-reference-ranges-part-014';
export { LAB_REFERENCE_RANGES_PART_015 } from './lab-reference-ranges-part-015';
export { LAB_REFERENCE_RANGES_PART_016 } from './lab-reference-ranges-part-016';
export { LAB_REFERENCE_RANGES_PART_017 } from './lab-reference-ranges-part-017';
export { LAB_REFERENCE_RANGES_PART_018 } from './lab-reference-ranges-part-018';
export { LAB_REFERENCE_RANGES_PART_019 } from './lab-reference-ranges-part-019';
export { LAB_REFERENCE_RANGES_PART_020 } from './lab-reference-ranges-part-020';
export { LAB_REFERENCE_RANGES_PART_021 } from './lab-reference-ranges-part-021';
export { LAB_REFERENCE_RANGES_PART_022 } from './lab-reference-ranges-part-022';
export { LAB_REFERENCE_RANGES_PART_023 } from './lab-reference-ranges-part-023';
export { LAB_REFERENCE_RANGES_PART_024 } from './lab-reference-ranges-part-024';
export { LAB_REFERENCE_RANGES_PART_025 } from './lab-reference-ranges-part-025';
export { LAB_REFERENCE_RANGES_PART_026 } from './lab-reference-ranges-part-026';
export { LAB_REFERENCE_RANGES_PART_027 } from './lab-reference-ranges-part-027';
export { LAB_REFERENCE_RANGES_PART_028 } from './lab-reference-ranges-part-028';
export { LAB_REFERENCE_RANGES_PART_029 } from './lab-reference-ranges-part-029';
export { LAB_REFERENCE_RANGES_PART_030 } from './lab-reference-ranges-part-030';

import { LAB_REFERENCE_RANGES_PART_001 } from './lab-reference-ranges-part-001';
import { LAB_REFERENCE_RANGES_PART_002 } from './lab-reference-ranges-part-002';
import { LAB_REFERENCE_RANGES_PART_003 } from './lab-reference-ranges-part-003';
import { LAB_REFERENCE_RANGES_PART_004 } from './lab-reference-ranges-part-004';
import { LAB_REFERENCE_RANGES_PART_005 } from './lab-reference-ranges-part-005';
import { LAB_REFERENCE_RANGES_PART_006 } from './lab-reference-ranges-part-006';
import { LAB_REFERENCE_RANGES_PART_007 } from './lab-reference-ranges-part-007';
import { LAB_REFERENCE_RANGES_PART_008 } from './lab-reference-ranges-part-008';
import { LAB_REFERENCE_RANGES_PART_009 } from './lab-reference-ranges-part-009';
import { LAB_REFERENCE_RANGES_PART_010 } from './lab-reference-ranges-part-010';
import { LAB_REFERENCE_RANGES_PART_011 } from './lab-reference-ranges-part-011';
import { LAB_REFERENCE_RANGES_PART_012 } from './lab-reference-ranges-part-012';
import { LAB_REFERENCE_RANGES_PART_013 } from './lab-reference-ranges-part-013';
import { LAB_REFERENCE_RANGES_PART_014 } from './lab-reference-ranges-part-014';
import { LAB_REFERENCE_RANGES_PART_015 } from './lab-reference-ranges-part-015';
import { LAB_REFERENCE_RANGES_PART_016 } from './lab-reference-ranges-part-016';
import { LAB_REFERENCE_RANGES_PART_017 } from './lab-reference-ranges-part-017';
import { LAB_REFERENCE_RANGES_PART_018 } from './lab-reference-ranges-part-018';
import { LAB_REFERENCE_RANGES_PART_019 } from './lab-reference-ranges-part-019';
import { LAB_REFERENCE_RANGES_PART_020 } from './lab-reference-ranges-part-020';
import { LAB_REFERENCE_RANGES_PART_021 } from './lab-reference-ranges-part-021';
import { LAB_REFERENCE_RANGES_PART_022 } from './lab-reference-ranges-part-022';
import { LAB_REFERENCE_RANGES_PART_023 } from './lab-reference-ranges-part-023';
import { LAB_REFERENCE_RANGES_PART_024 } from './lab-reference-ranges-part-024';
import { LAB_REFERENCE_RANGES_PART_025 } from './lab-reference-ranges-part-025';
import { LAB_REFERENCE_RANGES_PART_026 } from './lab-reference-ranges-part-026';
import { LAB_REFERENCE_RANGES_PART_027 } from './lab-reference-ranges-part-027';
import { LAB_REFERENCE_RANGES_PART_028 } from './lab-reference-ranges-part-028';
import { LAB_REFERENCE_RANGES_PART_029 } from './lab-reference-ranges-part-029';
import { LAB_REFERENCE_RANGES_PART_030 } from './lab-reference-ranges-part-030';

export const lab_reference_rangesCatalog: LabReferenceRangeEntry[] = [
  ...LAB_REFERENCE_RANGES_PART_001,
  ...LAB_REFERENCE_RANGES_PART_002,
  ...LAB_REFERENCE_RANGES_PART_003,
  ...LAB_REFERENCE_RANGES_PART_004,
  ...LAB_REFERENCE_RANGES_PART_005,
  ...LAB_REFERENCE_RANGES_PART_006,
  ...LAB_REFERENCE_RANGES_PART_007,
  ...LAB_REFERENCE_RANGES_PART_008,
  ...LAB_REFERENCE_RANGES_PART_009,
  ...LAB_REFERENCE_RANGES_PART_010,
  ...LAB_REFERENCE_RANGES_PART_011,
  ...LAB_REFERENCE_RANGES_PART_012,
  ...LAB_REFERENCE_RANGES_PART_013,
  ...LAB_REFERENCE_RANGES_PART_014,
  ...LAB_REFERENCE_RANGES_PART_015,
  ...LAB_REFERENCE_RANGES_PART_016,
  ...LAB_REFERENCE_RANGES_PART_017,
  ...LAB_REFERENCE_RANGES_PART_018,
  ...LAB_REFERENCE_RANGES_PART_019,
  ...LAB_REFERENCE_RANGES_PART_020,
  ...LAB_REFERENCE_RANGES_PART_021,
  ...LAB_REFERENCE_RANGES_PART_022,
  ...LAB_REFERENCE_RANGES_PART_023,
  ...LAB_REFERENCE_RANGES_PART_024,
  ...LAB_REFERENCE_RANGES_PART_025,
  ...LAB_REFERENCE_RANGES_PART_026,
  ...LAB_REFERENCE_RANGES_PART_027,
  ...LAB_REFERENCE_RANGES_PART_028,
  ...LAB_REFERENCE_RANGES_PART_029,
  ...LAB_REFERENCE_RANGES_PART_030,
];

export function findLabReferenceRangeByCode(code: string): LabReferenceRangeEntry | undefined {
  return lab_reference_rangesCatalog.find((e) => e.code === code);
}

export function searchLabReferenceRange(query: string, limit = 50): LabReferenceRangeEntry[] {
  const q = query.toLowerCase();
  const results: LabReferenceRangeEntry[] = [];
  for (const entry of lab_reference_rangesCatalog) {
    if (entry.code.toLowerCase().includes(q) || entry.description.toLowerCase().includes(q)) {
      results.push(entry);
      if (results.length >= limit) break;
    }
  }
  return results;
}
