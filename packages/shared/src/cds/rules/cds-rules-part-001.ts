/**
 * MedSphere synthetic CDS rules — part 1 (development artifact).
 */
import type { CdsRule } from '../types';

export const cdsRulesPart1: CdsRule[] = [
  {
    id: 'CDS-000001',
    name: 'diagnosis suggestion rule 1',
    category: 'diagnosis-suggestion',
    action: 'documentation-required',
    priority: 1,
    enabled: false,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 18
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hepardine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCHC"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for hepardine when MCHC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 12 and lab marker MCHC.',
      citations: ['MS-REF-1000'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.0',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000002',
    name: 'drug allergy rule 2',
    category: 'drug-allergy',
    action: 'suggestion',
    priority: 2,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 19
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for metformbarbital when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 09 and lab marker CEA.',
      citations: ['MS-REF-1001'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.1',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000003',
    name: 'duplicate therapy rule 3',
    category: 'duplicate-therapy',
    action: 'suggestion',
    priority: 3,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 20
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramaphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Platelet count"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for tramaphylline when Platelet count is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 04 and lab marker Platelet count.',
      citations: ['MS-REF-1002'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.2',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000004',
    name: 'preventive care rule 4',
    category: 'preventive-care',
    action: 'alert',
    priority: 4,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 21
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramaazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "HbA1c"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for tramaazole when HbA1c is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 01 and lab marker HbA1c.',
      citations: ['MS-REF-1003'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.3',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000005',
    name: 'lab critical rule 5',
    category: 'lab-critical',
    action: 'hard-stop',
    priority: 5,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 22
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for amlodcycline when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 15 and lab marker Ferritin.',
      citations: ['MS-REF-1004'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.4',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000006',
    name: 'drug drug rule 6',
    category: 'drug-drug',
    action: 'order-set',
    priority: 6,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 23
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "LDH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for morphstatin when LDH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 05 and lab marker LDH.',
      citations: ['MS-REF-1005'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.5',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000007',
    name: 'drug disease rule 7',
    category: 'drug-disease',
    action: 'order-set',
    priority: 7,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 24
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramasetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for tramasetron when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 05 and lab marker Bilirubin.',
      citations: ['MS-REF-1006'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.6',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000008',
    name: 'drug disease rule 8',
    category: 'drug-disease',
    action: 'suggestion',
    priority: 8,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 25
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for heparpine when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 18 and lab marker ALT.',
      citations: ['MS-REF-1007'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.7',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000009',
    name: 'contraindication rule 9',
    category: 'contraindication',
    action: 'documentation-required',
    priority: 9,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 26
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetaminpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for acetaminpine when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 07 and lab marker Specific gravity.',
      citations: ['MS-REF-1008'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.8',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000010',
    name: 'age based rule 10',
    category: 'age-based',
    action: 'order-set',
    priority: 10,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 27
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for fluticacillin when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 15 and lab marker ALP.',
      citations: ['MS-REF-1009'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.9',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000011',
    name: 'duplicate therapy rule 11',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 11,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 28
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindapril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Neutrophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for clindapril when Neutrophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 07 and lab marker Neutrophils.',
      citations: ['MS-REF-1010'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.10',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000012',
    name: 'drug disease rule 12',
    category: 'drug-disease',
    action: 'alert',
    priority: 12,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 29
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "dexastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hemoglobin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for dexastatin when Hemoglobin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 05 and lab marker Hemoglobin.',
      citations: ['MS-REF-1011'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.11',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000013',
    name: 'renal dosing rule 13',
    category: 'renal-dosing',
    action: 'order-set',
    priority: 13,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 30
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for tramacillin when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 13 and lab marker Magnesium.',
      citations: ['MS-REF-1012'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.12',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000014',
    name: 'dosing rule 14',
    category: 'dosing',
    action: 'order-set',
    priority: 14,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 31
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for naproxstatin when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 20 and lab marker Eosinophils.',
      citations: ['MS-REF-1013'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.13',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000015',
    name: 'preventive care rule 15',
    category: 'preventive-care',
    action: 'hard-stop',
    priority: 15,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 32
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "dexasetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for dexasetron when Urine creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 15 and lab marker Urine creatinine.',
      citations: ['MS-REF-1014'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.14',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000016',
    name: 'drug drug rule 16',
    category: 'drug-drug',
    action: 'alert',
    priority: 16,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 33
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertramycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for sertramycin when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 05 and lab marker INR.',
      citations: ['MS-REF-1015'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.15',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000017',
    name: 'order set rule 17',
    category: 'order-set',
    action: 'hard-stop',
    priority: 17,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 34
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxyphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for doxyphylline when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 11 and lab marker Vitamin B12.',
      citations: ['MS-REF-1016'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.16',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000018',
    name: 'preventive care rule 18',
    category: 'preventive-care',
    action: 'hard-stop',
    priority: 18,
    enabled: false,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 35
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "D-dimer"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for heparphylline when D-dimer is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 16 and lab marker D-dimer.',
      citations: ['MS-REF-1017'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.17',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000019',
    name: 'drug drug rule 19',
    category: 'drug-drug',
    action: 'documentation-required',
    priority: 19,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 36
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfarprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for warfarprazole when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 19 and lab marker Glucose.',
      citations: ['MS-REF-1018'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.18',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000020',
    name: 'pregnancy rule 20',
    category: 'pregnancy',
    action: 'documentation-required',
    priority: 20,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 37
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednisartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AST"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for prednisartan when AST is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 12 and lab marker AST.',
      citations: ['MS-REF-1019'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.19',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000021',
    name: 'renal dosing rule 21',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 21,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 38
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for insulinstatin when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 05 and lab marker Vitamin D.',
      citations: ['MS-REF-1020'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.20',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000022',
    name: 'dosing rule 22',
    category: 'dosing',
    action: 'alert',
    priority: 22,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 39
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothyazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for levothyazole when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 04 and lab marker GGT.',
      citations: ['MS-REF-1021'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.21',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000023',
    name: 'lab critical rule 23',
    category: 'lab-critical',
    action: 'suggestion',
    priority: 23,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 40
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvaprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for atorvaprazole when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 11 and lab marker Free T4.',
      citations: ['MS-REF-1022'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.22',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000024',
    name: 'lab critical rule 24',
    category: 'lab-critical',
    action: 'hard-stop',
    priority: 24,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 41
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticatidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCV"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for fluticatidine when MCV is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 17 and lab marker MCV.',
      citations: ['MS-REF-1023'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.23',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000025',
    name: 'preventive care rule 25',
    category: 'preventive-care',
    action: 'alert',
    priority: 25,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 42
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for hydrocodpril when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 08 and lab marker Iron.',
      citations: ['MS-REF-1024'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.24',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000026',
    name: 'renal dosing rule 26',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 26,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 43
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentapril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for gentapril when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 18 and lab marker Albumin.',
      citations: ['MS-REF-1025'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.25',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000027',
    name: 'drug drug rule 27',
    category: 'drug-drug',
    action: 'suggestion',
    priority: 27,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 44
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothyprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for levothyprazole when Urine creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 20 and lab marker Urine creatinine.',
      citations: ['MS-REF-1026'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.26',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000028',
    name: 'duplicate therapy rule 28',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 28,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 45
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibuprostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AFP"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for ibuprostatin when AFP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 12 and lab marker AFP.',
      citations: ['MS-REF-1027'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.27',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000029',
    name: 'lab critical rule 29',
    category: 'lab-critical',
    action: 'order-set',
    priority: 29,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 46
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for morphpril when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 01 and lab marker Ferritin.',
      citations: ['MS-REF-1028'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.28',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000030',
    name: 'quality measure rule 30',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 30,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 47
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for morphstatin when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 10 and lab marker PT.',
      citations: ['MS-REF-1029'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.29',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000031',
    name: 'diagnosis suggestion rule 31',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 31,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 48
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetaminmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCV"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for acetaminmycin when MCV is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 05 and lab marker MCV.',
      citations: ['MS-REF-1030'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.30',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000032',
    name: 'drug disease rule 32',
    category: 'drug-disease',
    action: 'alert',
    priority: 32,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 49
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for amlodbarbital when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 13 and lab marker Vitamin B12.',
      citations: ['MS-REF-1031'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.31',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000033',
    name: 'preventive care rule 33',
    category: 'preventive-care',
    action: 'hard-stop',
    priority: 33,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 50
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibuprocillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hemoglobin"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for ibuprocillin when Hemoglobin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 19 and lab marker Hemoglobin.',
      citations: ['MS-REF-1032'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.32',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000034',
    name: 'order set rule 34',
    category: 'order-set',
    action: 'alert',
    priority: 34,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 51
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for salbutazole when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 16 and lab marker pH.',
      citations: ['MS-REF-1033'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.33',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000035',
    name: 'drug drug rule 35',
    category: 'drug-drug',
    action: 'suggestion',
    priority: 35,
    enabled: false,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 52
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironobarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for spironobarbital when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 04 and lab marker ESR.',
      citations: ['MS-REF-1034'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.34',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000036',
    name: 'pregnancy rule 36',
    category: 'pregnancy',
    action: 'suggestion',
    priority: 36,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 53
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furozepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for furozepam when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 14 and lab marker Glucose.',
      citations: ['MS-REF-1035'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.35',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000037',
    name: 'quality measure rule 37',
    category: 'quality-measure',
    action: 'suggestion',
    priority: 37,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 54
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinophylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AST"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for lisinophylline when AST is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 15 and lab marker AST.',
      citations: ['MS-REF-1036'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.36',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000038',
    name: 'drug allergy rule 38',
    category: 'drug-allergy',
    action: 'alert',
    priority: 38,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 55
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxdine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for amoxdine when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 19 and lab marker ALP.',
      citations: ['MS-REF-1037'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.37',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000039',
    name: 'age based rule 39',
    category: 'age-based',
    action: 'suggestion',
    priority: 39,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 56
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metroazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for metroazole when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 06 and lab marker Iron.',
      citations: ['MS-REF-1038'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.38',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000040',
    name: 'preventive care rule 40',
    category: 'preventive-care',
    action: 'documentation-required',
    priority: 40,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 57
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetaminpam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for acetaminpam when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 17 and lab marker Basophils.',
      citations: ['MS-REF-1039'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.39',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000041',
    name: 'quality measure rule 41',
    category: 'quality-measure',
    action: 'alert',
    priority: 41,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 58
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikamycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for amikamycin when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 17 and lab marker Specific gravity.',
      citations: ['MS-REF-1040'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.40',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000042',
    name: 'age based rule 42',
    category: 'age-based',
    action: 'suggestion',
    priority: 42,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 59
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabadine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Platelet count"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for pregabadine when Platelet count is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 20 and lab marker Platelet count.',
      citations: ['MS-REF-1041'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.41',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000043',
    name: 'drug allergy rule 43',
    category: 'drug-allergy',
    action: 'suggestion',
    priority: 43,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 60
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BUN"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for amoxcycline when BUN is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 15 and lab marker BUN.',
      citations: ['MS-REF-1042'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.42',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000044',
    name: 'duplicate therapy rule 44',
    category: 'duplicate-therapy',
    action: 'alert',
    priority: 44,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 61
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertramycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "LDH"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for sertramycin when LDH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 11 and lab marker LDH.',
      citations: ['MS-REF-1043'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.43',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000045',
    name: 'drug disease rule 45',
    category: 'drug-disease',
    action: 'order-set',
    priority: 45,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 62
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithroazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for azithroazole when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 03 and lab marker Glucose.',
      citations: ['MS-REF-1044'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.44',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000046',
    name: 'drug allergy rule 46',
    category: 'drug-allergy',
    action: 'hard-stop',
    priority: 46,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 63
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednicillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for prednicillin when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 18 and lab marker Eosinophils.',
      citations: ['MS-REF-1045'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.45',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000047',
    name: 'duplicate therapy rule 47',
    category: 'duplicate-therapy',
    action: 'suggestion',
    priority: 47,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 64
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morpholol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for morpholol when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 16 and lab marker Glucose.',
      citations: ['MS-REF-1046'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.46',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000048',
    name: 'drug disease rule 48',
    category: 'drug-disease',
    action: 'documentation-required',
    priority: 48,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 65
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochloroprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for hydrochloroprazole when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 06 and lab marker Transferrin.',
      citations: ['MS-REF-1047'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.47',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000049',
    name: 'lab critical rule 49',
    category: 'lab-critical',
    action: 'order-set',
    priority: 49,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 66
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furopine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for furopine when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 16 and lab marker ESR.',
      citations: ['MS-REF-1048'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.48',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000050',
    name: 'preventive care rule 50',
    category: 'preventive-care',
    action: 'suggestion',
    priority: 50,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 67
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabazepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for pregabazepam when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 08 and lab marker Troponin I.',
      citations: ['MS-REF-1049'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.49',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000051',
    name: 'quality measure rule 51',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 51,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 68
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephaazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for cephaazole when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 12 and lab marker Glucose.',
      citations: ['MS-REF-1050'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.50',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000052',
    name: 'pregnancy rule 52',
    category: 'pregnancy',
    action: 'alert',
    priority: 52,
    enabled: false,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 69
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephaphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for cephaphylline when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 08 and lab marker ALP.',
      citations: ['MS-REF-1051'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.51',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000053',
    name: 'pregnancy rule 53',
    category: 'pregnancy',
    action: 'alert',
    priority: 53,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 70
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapencillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for gabapencillin when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 18 and lab marker ALP.',
      citations: ['MS-REF-1052'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.52',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000054',
    name: 'diagnosis suggestion rule 54',
    category: 'diagnosis-suggestion',
    action: 'documentation-required',
    priority: 54,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 71
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for salbutzepam when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 12 and lab marker Hematocrit.',
      citations: ['MS-REF-1053'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.53',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000055',
    name: 'contraindication rule 55',
    category: 'contraindication',
    action: 'hard-stop',
    priority: 55,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 72
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AST"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for cephapam when AST is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 15 and lab marker AST.',
      citations: ['MS-REF-1054'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.54',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000056',
    name: 'contraindication rule 56',
    category: 'contraindication',
    action: 'alert',
    priority: 56,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 73
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for ciprostatin when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 12 and lab marker Insulin.',
      citations: ['MS-REF-1055'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.55',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000057',
    name: 'drug disease rule 57',
    category: 'drug-disease',
    action: 'order-set',
    priority: 57,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 74
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibuprosartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for ibuprosartan when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 14 and lab marker Insulin.',
      citations: ['MS-REF-1056'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.56',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000058',
    name: 'preventive care rule 58',
    category: 'preventive-care',
    action: 'documentation-required',
    priority: 58,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 75
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for spironostatin when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 19 and lab marker Phosphorus.',
      citations: ['MS-REF-1057'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.57',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000059',
    name: 'drug allergy rule 59',
    category: 'drug-allergy',
    action: 'order-set',
    priority: 59,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 76
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for amlodcillin when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 17 and lab marker Troponin I.',
      citations: ['MS-REF-1058'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.58',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000060',
    name: 'drug disease rule 60',
    category: 'drug-disease',
    action: 'documentation-required',
    priority: 60,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 77
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "dexapril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for dexapril when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 01 and lab marker Chloride.',
      citations: ['MS-REF-1059'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.59',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000061',
    name: 'order set rule 61',
    category: 'order-set',
    action: 'hard-stop',
    priority: 61,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 18
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitaloprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for escitaloprazole when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 20 and lab marker Insulin.',
      citations: ['MS-REF-1060'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.60',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000062',
    name: 'drug drug rule 62',
    category: 'drug-drug',
    action: 'alert',
    priority: 62,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 19
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for oxycodsetron when RBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 07 and lab marker RBC.',
      citations: ['MS-REF-1061'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.61',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000063',
    name: 'quality measure rule 63',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 63,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 20
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for oxycodolol when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 01 and lab marker Free T4.',
      citations: ['MS-REF-1062'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.62',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000064',
    name: 'drug drug rule 64',
    category: 'drug-drug',
    action: 'hard-stop',
    priority: 64,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 21
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprazepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hemoglobin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for pantoprazepam when Hemoglobin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 21 and lab marker Hemoglobin.',
      citations: ['MS-REF-1063'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.63',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000065',
    name: 'renal dosing rule 65',
    category: 'renal-dosing',
    action: 'order-set',
    priority: 65,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 22
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCV"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for amoxzepam when MCV is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 16 and lab marker MCV.',
      citations: ['MS-REF-1064'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.64',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000066',
    name: 'quality measure rule 66',
    category: 'quality-measure',
    action: 'order-set',
    priority: 66,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 23
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticacycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for fluticacycline when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 04 and lab marker TSH.',
      citations: ['MS-REF-1065'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.65',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000067',
    name: 'lab critical rule 67',
    category: 'lab-critical',
    action: 'documentation-required',
    priority: 67,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 24
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for amlodzepam when RBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 21 and lab marker RBC.',
      citations: ['MS-REF-1066'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.66',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000068',
    name: 'order set rule 68',
    category: 'order-set',
    action: 'order-set',
    priority: 68,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 25
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopracillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for pantopracillin when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 16 and lab marker Magnesium.',
      citations: ['MS-REF-1067'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.67',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000069',
    name: 'renal dosing rule 69',
    category: 'renal-dosing',
    action: 'suggestion',
    priority: 69,
    enabled: false,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 26
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprocillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for ciprocillin when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 15 and lab marker MCH.',
      citations: ['MS-REF-1068'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.68',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000070',
    name: 'renal dosing rule 70',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 70,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 27
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cipromycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for cipromycin when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 13 and lab marker Urine protein.',
      citations: ['MS-REF-1069'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.69',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000071',
    name: 'dosing rule 71',
    category: 'dosing',
    action: 'documentation-required',
    priority: 71,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 28
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for oxycodcycline when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 15 and lab marker Urine protein.',
      citations: ['MS-REF-1070'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.70',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000072',
    name: 'quality measure rule 72',
    category: 'quality-measure',
    action: 'suggestion',
    priority: 72,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 29
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for hydrocodphylline when Creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 06 and lab marker Creatinine.',
      citations: ['MS-REF-1071'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.71',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000073',
    name: 'drug disease rule 73',
    category: 'drug-disease',
    action: 'hard-stop',
    priority: 73,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 30
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulincillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for insulincillin when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 04 and lab marker Urine protein.',
      citations: ['MS-REF-1072'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.72',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000074',
    name: 'duplicate therapy rule 74',
    category: 'duplicate-therapy',
    action: 'documentation-required',
    priority: 74,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 31
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omeprapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for omeprapam when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 12 and lab marker Albumin.',
      citations: ['MS-REF-1073'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.73',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000075',
    name: 'order set rule 75',
    category: 'order-set',
    action: 'order-set',
    priority: 75,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 32
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for fluticastatin when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 09 and lab marker Vitamin B12.',
      citations: ['MS-REF-1074'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.74',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000076',
    name: 'drug disease rule 76',
    category: 'drug-disease',
    action: 'alert',
    priority: 76,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 33
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticasartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for fluticasartan when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 14 and lab marker Insulin.',
      citations: ['MS-REF-1075'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.75',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000077',
    name: 'dosing rule 77',
    category: 'dosing',
    action: 'alert',
    priority: 77,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 34
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furopine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Microalbumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for furopine when Microalbumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 15 and lab marker Microalbumin.',
      citations: ['MS-REF-1076'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.76',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000078',
    name: 'preventive care rule 78',
    category: 'preventive-care',
    action: 'alert',
    priority: 78,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 35
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibuprodine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for ibuprodine when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 03 and lab marker INR.',
      citations: ['MS-REF-1077'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.77',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000079',
    name: 'pregnancy rule 79',
    category: 'pregnancy',
    action: 'order-set',
    priority: 79,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 36
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephatidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for cephatidine when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 18 and lab marker Iron.',
      citations: ['MS-REF-1078'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.78',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000080',
    name: 'diagnosis suggestion rule 80',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 80,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 37
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopracycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Folate"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for pantopracycline when Folate is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 04 and lab marker Folate.',
      citations: ['MS-REF-1079'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.79',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000081',
    name: 'renal dosing rule 81',
    category: 'renal-dosing',
    action: 'documentation-required',
    priority: 81,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 38
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for tramacillin when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 02 and lab marker CEA.',
      citations: ['MS-REF-1080'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.80',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000082',
    name: 'diagnosis suggestion rule 82',
    category: 'diagnosis-suggestion',
    action: 'suggestion',
    priority: 82,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 39
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodpam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for oxycodpam when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 07 and lab marker Chloride.',
      citations: ['MS-REF-1081'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.81',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000083',
    name: 'contraindication rule 83',
    category: 'contraindication',
    action: 'suggestion',
    priority: 83,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 40
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentasartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TIBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for gentasartan when TIBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 02 and lab marker TIBC.',
      citations: ['MS-REF-1082'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.82',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000084',
    name: 'contraindication rule 84',
    category: 'contraindication',
    action: 'order-set',
    priority: 84,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 41
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metrostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "C-peptide"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for metrostatin when C-peptide is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 13 and lab marker C-peptide.',
      citations: ['MS-REF-1083'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.83',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000085',
    name: 'diagnosis suggestion rule 85',
    category: 'diagnosis-suggestion',
    action: 'hard-stop',
    priority: 85,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 42
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Neutrophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for albutstatin when Neutrophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 09 and lab marker Neutrophils.',
      citations: ['MS-REF-1084'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.84',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000086',
    name: 'preventive care rule 86',
    category: 'preventive-care',
    action: 'documentation-required',
    priority: 86,
    enabled: false,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 43
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for clindabarbital when RBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 09 and lab marker RBC.',
      citations: ['MS-REF-1085'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.85',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000087',
    name: 'age based rule 87',
    category: 'age-based',
    action: 'order-set',
    priority: 87,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 44
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopradine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Calcium"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for pantopradine when Calcium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 03 and lab marker Calcium.',
      citations: ['MS-REF-1086'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.86',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000088',
    name: 'drug allergy rule 88',
    category: 'drug-allergy',
    action: 'hard-stop',
    priority: 88,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 45
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitaloazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for escitaloazole when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 17 and lab marker Iron.',
      citations: ['MS-REF-1087'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.87',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000089',
    name: 'quality measure rule 89',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 89,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 46
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for pantoprabarbital when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 10 and lab marker Basophils.',
      citations: ['MS-REF-1088'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.88',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000090',
    name: 'diagnosis suggestion rule 90',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 90,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 47
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochlorostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for hydrochlorostatin when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 12 and lab marker MCH.',
      citations: ['MS-REF-1089'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.89',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000091',
    name: 'drug drug rule 91',
    category: 'drug-drug',
    action: 'documentation-required',
    priority: 91,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 48
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxezepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CO2"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for fluoxezepam when CO2 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 09 and lab marker CO2.',
      citations: ['MS-REF-1090'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.90',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000092',
    name: 'drug allergy rule 92',
    category: 'drug-allergy',
    action: 'hard-stop',
    priority: 92,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 49
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CRP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for amoxpine when CRP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 05 and lab marker CRP.',
      citations: ['MS-REF-1091'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.91',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000093',
    name: 'contraindication rule 93',
    category: 'contraindication',
    action: 'documentation-required',
    priority: 93,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 50
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironoazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for spironoazole when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 15 and lab marker Sodium.',
      citations: ['MS-REF-1092'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.92',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000094',
    name: 'age based rule 94',
    category: 'age-based',
    action: 'documentation-required',
    priority: 94,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 51
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothybarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Microalbumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for levothybarbital when Microalbumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 09 and lab marker Microalbumin.',
      citations: ['MS-REF-1093'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.93',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000095',
    name: 'contraindication rule 95',
    category: 'contraindication',
    action: 'hard-stop',
    priority: 95,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 52
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopraazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Lymphocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for pantopraazole when Lymphocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 02 and lab marker Lymphocytes.',
      citations: ['MS-REF-1094'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.94',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000096',
    name: 'order set rule 96',
    category: 'order-set',
    action: 'alert',
    priority: 96,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 53
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironocillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for spironocillin when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 20 and lab marker Vitamin D.',
      citations: ['MS-REF-1095'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.95',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000097',
    name: 'duplicate therapy rule 97',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 97,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 54
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochlorotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for hydrochlorotidine when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 09 and lab marker Hematocrit.',
      citations: ['MS-REF-1096'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.96',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000098',
    name: 'pregnancy rule 98',
    category: 'pregnancy',
    action: 'alert',
    priority: 98,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 55
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metrozepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for metrozepam when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 17 and lab marker Vitamin B12.',
      citations: ['MS-REF-1097'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.97',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000099',
    name: 'pregnancy rule 99',
    category: 'pregnancy',
    action: 'suggestion',
    priority: 99,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 56
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentaolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for gentaolol when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 18 and lab marker Bilirubin.',
      citations: ['MS-REF-1098'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.98',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000100',
    name: 'pregnancy rule 100',
    category: 'pregnancy',
    action: 'alert',
    priority: 100,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 57
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetaminprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for acetaminprazole when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 02 and lab marker pH.',
      citations: ['MS-REF-1099'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.99',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000101',
    name: 'contraindication rule 101',
    category: 'contraindication',
    action: 'alert',
    priority: 1,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 58
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for clindabarbital when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 07 and lab marker Ferritin.',
      citations: ['MS-REF-1100'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.0',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000102',
    name: 'drug disease rule 102',
    category: 'drug-disease',
    action: 'alert',
    priority: 2,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 59
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithrocycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for azithrocycline when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 20 and lab marker ALP.',
      citations: ['MS-REF-1101'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.1',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000103',
    name: 'drug drug rule 103',
    category: 'drug-drug',
    action: 'documentation-required',
    priority: 3,
    enabled: false,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 60
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramaolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Calcium"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for tramaolol when Calcium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 08 and lab marker Calcium.',
      citations: ['MS-REF-1102'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.2',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000104',
    name: 'quality measure rule 104',
    category: 'quality-measure',
    action: 'order-set',
    priority: 4,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 61
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for gentacillin when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 18 and lab marker Bilirubin.',
      citations: ['MS-REF-1103'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.3',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000105',
    name: 'duplicate therapy rule 105',
    category: 'duplicate-therapy',
    action: 'suggestion',
    priority: 5,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 62
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furoprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for furoprazole when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 17 and lab marker MCH.',
      citations: ['MS-REF-1104'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.4',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000106',
    name: 'dosing rule 106',
    category: 'dosing',
    action: 'order-set',
    priority: 6,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 63
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochlorozepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for hydrochlorozepam when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 17 and lab marker Fibrinogen.',
      citations: ['MS-REF-1105'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.5',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000107',
    name: 'drug disease rule 107',
    category: 'drug-disease',
    action: 'alert',
    priority: 7,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 64
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for heparolol when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 12 and lab marker Insulin.',
      citations: ['MS-REF-1106'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.6',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000108',
    name: 'order set rule 108',
    category: 'order-set',
    action: 'suggestion',
    priority: 8,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 65
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxepine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for fluoxepine when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 11 and lab marker Phosphorus.',
      citations: ['MS-REF-1107'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.7',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000109',
    name: 'contraindication rule 109',
    category: 'contraindication',
    action: 'documentation-required',
    priority: 9,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 66
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furodine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hemoglobin"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for furodine when Hemoglobin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 10 and lab marker Hemoglobin.',
      citations: ['MS-REF-1108'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.8',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000110',
    name: 'order set rule 110',
    category: 'order-set',
    action: 'suggestion',
    priority: 10,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 67
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikaolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for amikaolol when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 14 and lab marker PSA.',
      citations: ['MS-REF-1109'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.9',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000111',
    name: 'age based rule 111',
    category: 'age-based',
    action: 'documentation-required',
    priority: 11,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 68
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CRP"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for hydrocodbarbital when CRP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 09 and lab marker CRP.',
      citations: ['MS-REF-1110'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.10',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000112',
    name: 'contraindication rule 112',
    category: 'contraindication',
    action: 'alert',
    priority: 12,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 69
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for pregabacillin when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 07 and lab marker CEA.',
      citations: ['MS-REF-1111'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.11',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000113',
    name: 'duplicate therapy rule 113',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 13,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 70
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinophylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CO2"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for lisinophylline when CO2 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 18 and lab marker CO2.',
      citations: ['MS-REF-1112'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.12',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000114',
    name: 'preventive care rule 114',
    category: 'preventive-care',
    action: 'hard-stop',
    priority: 14,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 71
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothysartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for levothysartan when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 11 and lab marker Magnesium.',
      citations: ['MS-REF-1113'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.13',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000115',
    name: 'drug allergy rule 115',
    category: 'drug-allergy',
    action: 'documentation-required',
    priority: 15,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 72
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutdine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for salbutdine when RBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 01 and lab marker RBC.',
      citations: ['MS-REF-1114'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.14',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000116',
    name: 'diagnosis suggestion rule 116',
    category: 'diagnosis-suggestion',
    action: 'alert',
    priority: 16,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 73
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omeprabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for omeprabarbital when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 12 and lab marker Monocytes.',
      citations: ['MS-REF-1115'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.15',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000117',
    name: 'preventive care rule 117',
    category: 'preventive-care',
    action: 'documentation-required',
    priority: 17,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 74
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxytidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for doxytidine when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 14 and lab marker Hematocrit.',
      citations: ['MS-REF-1116'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.16',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000118',
    name: 'pregnancy rule 118',
    category: 'pregnancy',
    action: 'alert',
    priority: 18,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 75
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibupromycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for ibupromycin when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 08 and lab marker ALP.',
      citations: ['MS-REF-1117'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.17',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000119',
    name: 'age based rule 119',
    category: 'age-based',
    action: 'hard-stop',
    priority: 19,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 76
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furosetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for furosetron when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 17 and lab marker Eosinophils.',
      citations: ['MS-REF-1118'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.18',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000120',
    name: 'contraindication rule 120',
    category: 'contraindication',
    action: 'alert',
    priority: 20,
    enabled: false,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 77
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Calcium"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for hydrocodolol when Calcium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 02 and lab marker Calcium.',
      citations: ['MS-REF-1119'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.19',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000121',
    name: 'order set rule 121',
    category: 'order-set',
    action: 'documentation-required',
    priority: 21,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 18
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for naproxprazole when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 03 and lab marker Urine protein.',
      citations: ['MS-REF-1120'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.20',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000122',
    name: 'dosing rule 122',
    category: 'dosing',
    action: 'order-set',
    priority: 22,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 19
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopratidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for pantopratidine when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 09 and lab marker GGT.',
      citations: ['MS-REF-1121'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.21',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000123',
    name: 'order set rule 123',
    category: 'order-set',
    action: 'suggestion',
    priority: 23,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 20
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochloropril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for hydrochloropril when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 01 and lab marker Sodium.',
      citations: ['MS-REF-1122'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.22',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000124',
    name: 'dosing rule 124',
    category: 'dosing',
    action: 'hard-stop',
    priority: 24,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 21
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothypam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for levothypam when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 06 and lab marker PSA.',
      citations: ['MS-REF-1123'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.23',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000125',
    name: 'drug disease rule 125',
    category: 'drug-disease',
    action: 'order-set',
    priority: 25,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 22
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednisetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CRP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for prednisetron when CRP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 07 and lab marker CRP.',
      citations: ['MS-REF-1124'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.24',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000126',
    name: 'age based rule 126',
    category: 'age-based',
    action: 'order-set',
    priority: 26,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 23
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for metformzepam when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 11 and lab marker Troponin I.',
      citations: ['MS-REF-1125'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.25',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000127',
    name: 'diagnosis suggestion rule 127',
    category: 'diagnosis-suggestion',
    action: 'suggestion',
    priority: 27,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 24
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metroolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for metroolol when Urine creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 17 and lab marker Urine creatinine.',
      citations: ['MS-REF-1126'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.26',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000128',
    name: 'quality measure rule 128',
    category: 'quality-measure',
    action: 'suggestion',
    priority: 28,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 25
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxestatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Potassium"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for fluoxestatin when Potassium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 11 and lab marker Potassium.',
      citations: ['MS-REF-1127'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.27',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000129',
    name: 'drug disease rule 129',
    category: 'drug-disease',
    action: 'documentation-required',
    priority: 29,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 26
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for amlodzepam when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 20 and lab marker Vitamin B12.',
      citations: ['MS-REF-1128'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.28',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000130',
    name: 'drug drug rule 130',
    category: 'drug-drug',
    action: 'alert',
    priority: 30,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 27
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochlorotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Platelet count"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for hydrochlorotidine when Platelet count is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 13 and lab marker Platelet count.',
      citations: ['MS-REF-1129'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.29',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000131',
    name: 'quality measure rule 131',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 31,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 28
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironoazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CO2"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for spironoazole when CO2 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 08 and lab marker CO2.',
      citations: ['MS-REF-1130'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.30',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000132',
    name: 'age based rule 132',
    category: 'age-based',
    action: 'order-set',
    priority: 32,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 29
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for salbutphylline when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 03 and lab marker Vitamin D.',
      citations: ['MS-REF-1131'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.31',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000133',
    name: 'renal dosing rule 133',
    category: 'renal-dosing',
    action: 'order-set',
    priority: 33,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 30
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithroazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for azithroazole when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 16 and lab marker ALT.',
      citations: ['MS-REF-1132'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.32',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000134',
    name: 'dosing rule 134',
    category: 'dosing',
    action: 'alert',
    priority: 34,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 31
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertratidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for sertratidine when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 21 and lab marker Transferrin.',
      citations: ['MS-REF-1133'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.33',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000135',
    name: 'duplicate therapy rule 135',
    category: 'duplicate-therapy',
    action: 'alert',
    priority: 35,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 32
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephazepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for cephazepam when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 03 and lab marker PT.',
      citations: ['MS-REF-1134'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.34',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000136',
    name: 'age based rule 136',
    category: 'age-based',
    action: 'documentation-required',
    priority: 36,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 33
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for pregabacillin when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 11 and lab marker MCH.',
      citations: ['MS-REF-1135'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.35',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000137',
    name: 'contraindication rule 137',
    category: 'contraindication',
    action: 'suggestion',
    priority: 37,
    enabled: false,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 34
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentamycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCHC"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for gentamycin when MCHC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 09 and lab marker MCHC.',
      citations: ['MS-REF-1136'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.36',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000138',
    name: 'renal dosing rule 138',
    category: 'renal-dosing',
    action: 'suggestion',
    priority: 38,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 35
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furopam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCHC"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for furopam when MCHC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 07 and lab marker MCHC.',
      citations: ['MS-REF-1137'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.37',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000139',
    name: 'lab critical rule 139',
    category: 'lab-critical',
    action: 'suggestion',
    priority: 39,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 36
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for heparmycin when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 20 and lab marker Iron.',
      citations: ['MS-REF-1138'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.38',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000140',
    name: 'age based rule 140',
    category: 'age-based',
    action: 'alert',
    priority: 40,
    enabled: true,
    evidenceLevel: 'B',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 37
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibuproolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for ibuproolol when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 06 and lab marker Iron.',
      citations: ['MS-REF-1139'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.39',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000141',
    name: 'order set rule 141',
    category: 'order-set',
    action: 'suggestion',
    priority: 41,
    enabled: true,
    evidenceLevel: 'D',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 38
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalosartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for escitalosartan when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 15 and lab marker INR.',
      citations: ['MS-REF-1140'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.40',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000142',
    name: 'diagnosis suggestion rule 142',
    category: 'diagnosis-suggestion',
    action: 'documentation-required',
    priority: 42,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 39
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for salbutcillin when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 10 and lab marker ESR.',
      citations: ['MS-REF-1141'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.41',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000143',
    name: 'contraindication rule 143',
    category: 'contraindication',
    action: 'order-set',
    priority: 43,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 40
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for naproxzepam when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 12 and lab marker Chloride.',
      citations: ['MS-REF-1142'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.42',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000144',
    name: 'contraindication rule 144',
    category: 'contraindication',
    action: 'suggestion',
    priority: 44,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 41
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "C-peptide"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for lisinotidine when C-peptide is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 01 and lab marker C-peptide.',
      citations: ['MS-REF-1143'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.43',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000145',
    name: 'drug allergy rule 145',
    category: 'drug-allergy',
    action: 'order-set',
    priority: 45,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 42
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothysetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for levothysetron when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 09 and lab marker Vitamin B12.',
      citations: ['MS-REF-1144'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.44',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000146',
    name: 'age based rule 146',
    category: 'age-based',
    action: 'documentation-required',
    priority: 46,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 43
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramadine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for tramadine when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 13 and lab marker PSA.',
      citations: ['MS-REF-1145'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.45',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000147',
    name: 'contraindication rule 147',
    category: 'contraindication',
    action: 'order-set',
    priority: 47,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 44
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "C-peptide"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for insulinpril when C-peptide is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 08 and lab marker C-peptide.',
      citations: ['MS-REF-1146'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.46',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000148',
    name: 'pregnancy rule 148',
    category: 'pregnancy',
    action: 'order-set',
    priority: 48,
    enabled: true,
    evidenceLevel: 'A',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 45
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furocillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Folate"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for furocillin when Folate is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 10 and lab marker Folate.',
      citations: ['MS-REF-1147'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.47',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000149',
    name: 'dosing rule 149',
    category: 'dosing',
    action: 'suggestion',
    priority: 49,
    enabled: true,
    evidenceLevel: 'expert-consensus',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 46
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednicillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for prednicillin when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 16 and lab marker Albumin.',
      citations: ['MS-REF-1148'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.48',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000150',
    name: 'duplicate therapy rule 150',
    category: 'duplicate-therapy',
    action: 'suggestion',
    priority: 50,
    enabled: true,
    evidenceLevel: 'C',
    conditions: {
          "all": [
                {
                      "field": "patient.ageYears",
                      "operator": "gte",
                      "value": 47
                },
                {
                      "field": "encounter.type",
                      "operator": "in",
                      "value": [
                            "inpatient",
                            "outpatient",
                            "emergency"
                      ]
                }
          ],
          "any": [
                {
                      "field": "diagnosis.code",
                      "operator": "startsWith",
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for amlodolol when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 14 and lab marker Ferritin.',
      citations: ['MS-REF-1149'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.49',
      lastReviewed: '2025-06-01',
    },
  }
];
