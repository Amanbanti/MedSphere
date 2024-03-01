/**
 * MedSphere synthetic CDS rules — part 5 (development artifact).
 */
import type { CdsRule } from '../types';

export const cdsRulesPart5: CdsRule[] = [
  {
    id: 'CDS-000601',
    name: 'age based rule 601',
    category: 'age-based',
    action: 'alert',
    priority: 1,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for amlodcillin when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 21 and lab marker Transferrin.',
      citations: ['MS-REF-1600'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.0',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000602',
    name: 'renal dosing rule 602',
    category: 'renal-dosing',
    action: 'alert',
    priority: 2,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Lymphocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for metformstatin when Lymphocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 19 and lab marker Lymphocytes.',
      citations: ['MS-REF-1601'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.1',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000603',
    name: 'quality measure rule 603',
    category: 'quality-measure',
    action: 'alert',
    priority: 3,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetamincycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for acetamincycline when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 15 and lab marker Chloride.',
      citations: ['MS-REF-1602'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.2',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000604',
    name: 'age based rule 604',
    category: 'age-based',
    action: 'documentation-required',
    priority: 4,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramamycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for tramamycin when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 07 and lab marker Ferritin.',
      citations: ['MS-REF-1603'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.3',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000605',
    name: 'drug allergy rule 605',
    category: 'drug-allergy',
    action: 'order-set',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothypam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for levothypam when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 01 and lab marker Magnesium.',
      citations: ['MS-REF-1604'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.4',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000606',
    name: 'drug allergy rule 606',
    category: 'drug-allergy',
    action: 'suggestion',
    priority: 6,
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvapril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TIBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for atorvapril when TIBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 10 and lab marker TIBC.',
      citations: ['MS-REF-1605'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.5',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000607',
    name: 'preventive care rule 607',
    category: 'preventive-care',
    action: 'suggestion',
    priority: 7,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothymycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for levothymycin when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 10 and lab marker Urine protein.',
      citations: ['MS-REF-1606'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.6',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000608',
    name: 'order set rule 608',
    category: 'order-set',
    action: 'hard-stop',
    priority: 8,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapencillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Potassium"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for gabapencillin when Potassium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 13 and lab marker Potassium.',
      citations: ['MS-REF-1607'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.7',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000609',
    name: 'contraindication rule 609',
    category: 'contraindication',
    action: 'suggestion',
    priority: 9,
    enabled: true,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothypam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for levothypam when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 07 and lab marker Albumin.',
      citations: ['MS-REF-1608'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.8',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000610',
    name: 'quality measure rule 610',
    category: 'quality-measure',
    action: 'order-set',
    priority: 10,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for albutpine when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 19 and lab marker Albumin.',
      citations: ['MS-REF-1609'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.9',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000611',
    name: 'order set rule 611',
    category: 'order-set',
    action: 'alert',
    priority: 11,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for amlodsetron when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 20 and lab marker CEA.',
      citations: ['MS-REF-1610'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.10',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000612',
    name: 'diagnosis suggestion rule 612',
    category: 'diagnosis-suggestion',
    action: 'alert',
    priority: 12,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancomcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for vancomcillin when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 16 and lab marker PT.',
      citations: ['MS-REF-1611'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.11',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000613',
    name: 'renal dosing rule 613',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 13,
    enabled: false,
    evidenceLevel: 'A',
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
                      "value": "enoxapazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for enoxapazole when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 04 and lab marker Urine protein.',
      citations: ['MS-REF-1612'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.12',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000614',
    name: 'duplicate therapy rule 614',
    category: 'duplicate-therapy',
    action: 'documentation-required',
    priority: 14,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinopril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for lisinopril when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 12 and lab marker Chloride.',
      citations: ['MS-REF-1613'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.13',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000615',
    name: 'lab critical rule 615',
    category: 'lab-critical',
    action: 'hard-stop',
    priority: 15,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metroazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for metroazole when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 19 and lab marker Glucose.',
      citations: ['MS-REF-1614'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.14',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000616',
    name: 'drug disease rule 616',
    category: 'drug-disease',
    action: 'order-set',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metrobarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for metrobarbital when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 15 and lab marker Specific gravity.',
      citations: ['MS-REF-1615'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.15',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000617',
    name: 'drug disease rule 617',
    category: 'drug-disease',
    action: 'documentation-required',
    priority: 17,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omepramycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TIBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for omepramycin when TIBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 08 and lab marker TIBC.',
      citations: ['MS-REF-1616'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.16',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000618',
    name: 'preventive care rule 618',
    category: 'preventive-care',
    action: 'alert',
    priority: 18,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopraazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "C-peptide"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for pantopraazole when C-peptide is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 12 and lab marker C-peptide.',
      citations: ['MS-REF-1617'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.17',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000619',
    name: 'quality measure rule 619',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 19,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for metformcycline when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 06 and lab marker INR.',
      citations: ['MS-REF-1618'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.18',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000620',
    name: 'pregnancy rule 620',
    category: 'pregnancy',
    action: 'alert',
    priority: 20,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BUN"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for amoxmycin when BUN is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 19 and lab marker BUN.',
      citations: ['MS-REF-1619'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.19',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000621',
    name: 'contraindication rule 621',
    category: 'contraindication',
    action: 'alert',
    priority: 21,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "sertrastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for sertrastatin when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 15 and lab marker Vitamin D.',
      citations: ['MS-REF-1620'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.20',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000622',
    name: 'lab critical rule 622',
    category: 'lab-critical',
    action: 'documentation-required',
    priority: 22,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironopam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for spironopam when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 17 and lab marker Chloride.',
      citations: ['MS-REF-1621'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.21',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000623',
    name: 'contraindication rule 623',
    category: 'contraindication',
    action: 'suggestion',
    priority: 23,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironopam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for spironopam when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 09 and lab marker Albumin.',
      citations: ['MS-REF-1622'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.22',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000624',
    name: 'age based rule 624',
    category: 'age-based',
    action: 'documentation-required',
    priority: 24,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalobarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Potassium"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for escitalobarbital when Potassium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 19 and lab marker Potassium.',
      citations: ['MS-REF-1623'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.23',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000625',
    name: 'dosing rule 625',
    category: 'dosing',
    action: 'documentation-required',
    priority: 25,
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for metformolol when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 19 and lab marker Eosinophils.',
      citations: ['MS-REF-1624'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.24',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000626',
    name: 'quality measure rule 626',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 26,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramamycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for tramamycin when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 05 and lab marker pH.',
      citations: ['MS-REF-1625'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.25',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000627',
    name: 'pregnancy rule 627',
    category: 'pregnancy',
    action: 'documentation-required',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentaphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for gentaphylline when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 21 and lab marker Vitamin B12.',
      citations: ['MS-REF-1626'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.26',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000628',
    name: 'pregnancy rule 628',
    category: 'pregnancy',
    action: 'documentation-required',
    priority: 28,
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramapril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for tramapril when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 03 and lab marker Vitamin D.',
      citations: ['MS-REF-1627'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.27',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000629',
    name: 'preventive care rule 629',
    category: 'preventive-care',
    action: 'alert',
    priority: 29,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfarpam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TIBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for warfarpam when TIBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 19 and lab marker TIBC.',
      citations: ['MS-REF-1628'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.28',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000630',
    name: 'diagnosis suggestion rule 630',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 30,
    enabled: false,
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Potassium"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for gentastatin when Potassium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 13 and lab marker Potassium.',
      citations: ['MS-REF-1629'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.29',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000631',
    name: 'contraindication rule 631',
    category: 'contraindication',
    action: 'suggestion',
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphsartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Potassium"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for morphsartan when Potassium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 12 and lab marker Potassium.',
      citations: ['MS-REF-1630'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.30',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000632',
    name: 'order set rule 632',
    category: 'order-set',
    action: 'documentation-required',
    priority: 32,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephadine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for cephadine when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 20 and lab marker pH.',
      citations: ['MS-REF-1631'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.31',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000633',
    name: 'order set rule 633',
    category: 'order-set',
    action: 'suggestion',
    priority: 33,
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironophylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for spironophylline when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 13 and lab marker ESR.',
      citations: ['MS-REF-1632'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.32',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000634',
    name: 'pregnancy rule 634',
    category: 'pregnancy',
    action: 'suggestion',
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cipropam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for cipropam when Creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 06 and lab marker Creatinine.',
      citations: ['MS-REF-1633'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.33',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000635',
    name: 'diagnosis suggestion rule 635',
    category: 'diagnosis-suggestion',
    action: 'documentation-required',
    priority: 35,
    enabled: true,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednizepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BNP"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for prednizepam when BNP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 20 and lab marker BNP.',
      citations: ['MS-REF-1634'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.34',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000636',
    name: 'drug allergy rule 636',
    category: 'drug-allergy',
    action: 'documentation-required',
    priority: 36,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephacycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for cephacycline when Creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 05 and lab marker Creatinine.',
      citations: ['MS-REF-1635'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.35',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000637',
    name: 'drug drug rule 637',
    category: 'drug-drug',
    action: 'suggestion',
    priority: 37,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for insulinbarbital when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 20 and lab marker GGT.',
      citations: ['MS-REF-1636'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.36',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000638',
    name: 'preventive care rule 638',
    category: 'preventive-care',
    action: 'suggestion',
    priority: 38,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for atorvastatin when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 08 and lab marker Vitamin D.',
      citations: ['MS-REF-1637'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.37',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000639',
    name: 'diagnosis suggestion rule 639',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 39,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancompam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Platelet count"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for vancompam when Platelet count is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 10 and lab marker Platelet count.',
      citations: ['MS-REF-1638'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.38',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000640',
    name: 'renal dosing rule 640',
    category: 'renal-dosing',
    action: 'order-set',
    priority: 40,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for naproxolol when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 14 and lab marker Insulin.',
      citations: ['MS-REF-1639'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.39',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000641',
    name: 'preventive care rule 641',
    category: 'preventive-care',
    action: 'documentation-required',
    priority: 41,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for heparpril when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 01 and lab marker Transferrin.',
      citations: ['MS-REF-1640'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.40',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000642',
    name: 'drug allergy rule 642',
    category: 'drug-allergy',
    action: 'documentation-required',
    priority: 42,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for salbutolol when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 18 and lab marker Free T4.',
      citations: ['MS-REF-1641'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.41',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000643',
    name: 'order set rule 643',
    category: 'order-set',
    action: 'documentation-required',
    priority: 43,
    enabled: true,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithrotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for azithrotidine when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 12 and lab marker Insulin.',
      citations: ['MS-REF-1642'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.42',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000644',
    name: 'drug drug rule 644',
    category: 'drug-drug',
    action: 'hard-stop',
    priority: 44,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCV"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for amlodpine when MCV is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 20 and lab marker MCV.',
      citations: ['MS-REF-1643'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.43',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000645',
    name: 'lab critical rule 645',
    category: 'lab-critical',
    action: 'suggestion',
    priority: 45,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephasetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for cephasetron when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 15 and lab marker Sodium.',
      citations: ['MS-REF-1644'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.44',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000646',
    name: 'preventive care rule 646',
    category: 'preventive-care',
    action: 'order-set',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvaazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for atorvaazole when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 07 and lab marker Monocytes.',
      citations: ['MS-REF-1645'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.45',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000647',
    name: 'age based rule 647',
    category: 'age-based',
    action: 'order-set',
    priority: 47,
    enabled: false,
    evidenceLevel: 'A',
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvapine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for atorvapine when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 10 and lab marker MCH.',
      citations: ['MS-REF-1646'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.46',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000648',
    name: 'order set rule 648',
    category: 'order-set',
    action: 'suggestion',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Total protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for morphcycline when Total protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 18 and lab marker Total protein.',
      citations: ['MS-REF-1647'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.47',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000649',
    name: 'lab critical rule 649',
    category: 'lab-critical',
    action: 'order-set',
    priority: 49,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Total protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for furostatin when Total protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 09 and lab marker Total protein.',
      citations: ['MS-REF-1648'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.48',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000650',
    name: 'contraindication rule 650',
    category: 'contraindication',
    action: 'suggestion',
    priority: 50,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cipromycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T3"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for cipromycin when Free T3 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 17 and lab marker Free T3.',
      citations: ['MS-REF-1649'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.49',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000651',
    name: 'quality measure rule 651',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 51,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for hydrocodpine when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 07 and lab marker ALT.',
      citations: ['MS-REF-1650'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.50',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000652',
    name: 'dosing rule 652',
    category: 'dosing',
    action: 'order-set',
    priority: 52,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCV"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for clindabarbital when MCV is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 18 and lab marker MCV.',
      citations: ['MS-REF-1651'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.51',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000653',
    name: 'duplicate therapy rule 653',
    category: 'duplicate-therapy',
    action: 'suggestion',
    priority: 53,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindatidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for clindatidine when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 10 and lab marker Phosphorus.',
      citations: ['MS-REF-1652'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.52',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000654',
    name: 'pregnancy rule 654',
    category: 'pregnancy',
    action: 'order-set',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for atorvapam when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 21 and lab marker MCH.',
      citations: ['MS-REF-1653'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.53',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000655',
    name: 'order set rule 655',
    category: 'order-set',
    action: 'order-set',
    priority: 55,
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
                      "value": "ibuproazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BUN"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for ibuproazole when BUN is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 01 and lab marker BUN.',
      citations: ['MS-REF-1654'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.54',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000656',
    name: 'quality measure rule 656',
    category: 'quality-measure',
    action: 'suggestion',
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalopine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for escitalopine when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 13 and lab marker Eosinophils.',
      citations: ['MS-REF-1655'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.55',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000657',
    name: 'pregnancy rule 657',
    category: 'pregnancy',
    action: 'alert',
    priority: 57,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furosetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for furosetron when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 08 and lab marker PSA.',
      citations: ['MS-REF-1656'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.56',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000658',
    name: 'contraindication rule 658',
    category: 'contraindication',
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciproolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Platelet count"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for ciproolol when Platelet count is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 03 and lab marker Platelet count.',
      citations: ['MS-REF-1657'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.57',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000659',
    name: 'renal dosing rule 659',
    category: 'renal-dosing',
    action: 'suggestion',
    priority: 59,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for atorvacillin when Creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 11 and lab marker Creatinine.',
      citations: ['MS-REF-1658'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.58',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000660',
    name: 'dosing rule 660',
    category: 'dosing',
    action: 'alert',
    priority: 60,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omepramycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "LDH"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for omepramycin when LDH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 14 and lab marker LDH.',
      citations: ['MS-REF-1659'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.59',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000661',
    name: 'age based rule 661',
    category: 'age-based',
    action: 'order-set',
    priority: 61,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amloddine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Calcium"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for amloddine when Calcium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 02 and lab marker Calcium.',
      citations: ['MS-REF-1660'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.60',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000662',
    name: 'diagnosis suggestion rule 662',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 62,
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for tramabarbital when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 03 and lab marker Insulin.',
      citations: ['MS-REF-1661'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.61',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000663',
    name: 'diagnosis suggestion rule 663',
    category: 'diagnosis-suggestion',
    action: 'alert',
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochlorotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for hydrochlorotidine when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 05 and lab marker Vitamin D.',
      citations: ['MS-REF-1662'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.62',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000664',
    name: 'age based rule 664',
    category: 'age-based',
    action: 'suggestion',
    priority: 64,
    enabled: false,
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
                      "value": "azithroolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Neutrophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for azithroolol when Neutrophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 21 and lab marker Neutrophils.',
      citations: ['MS-REF-1663'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.63',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000665',
    name: 'quality measure rule 665',
    category: 'quality-measure',
    action: 'order-set',
    priority: 65,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omeprapril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for omeprapril when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 04 and lab marker ALP.',
      citations: ['MS-REF-1664'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.64',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000666',
    name: 'contraindication rule 666',
    category: 'contraindication',
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for pantoprastatin when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 09 and lab marker PT.',
      citations: ['MS-REF-1665'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.65',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000667',
    name: 'contraindication rule 667',
    category: 'contraindication',
    action: 'suggestion',
    priority: 67,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentaphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for gentaphylline when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 08 and lab marker GGT.',
      citations: ['MS-REF-1666'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.66',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000668',
    name: 'drug disease rule 668',
    category: 'drug-disease',
    action: 'alert',
    priority: 68,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapenpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "HbA1c"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for gabapenpril when HbA1c is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 13 and lab marker HbA1c.',
      citations: ['MS-REF-1667'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.67',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000669',
    name: 'order set rule 669',
    category: 'order-set',
    action: 'suggestion',
    priority: 69,
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithrodine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for azithrodine when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 17 and lab marker ESR.',
      citations: ['MS-REF-1668'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.68',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000670',
    name: 'drug allergy rule 670',
    category: 'drug-allergy',
    action: 'documentation-required',
    priority: 70,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfardine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for warfardine when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 02 and lab marker ALT.',
      citations: ['MS-REF-1669'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.69',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000671',
    name: 'duplicate therapy rule 671',
    category: 'duplicate-therapy',
    action: 'alert',
    priority: 71,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "insulinpam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Folate"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for insulinpam when Folate is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 15 and lab marker Folate.',
      citations: ['MS-REF-1670'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.70',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000672',
    name: 'age based rule 672',
    category: 'age-based',
    action: 'documentation-required',
    priority: 72,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibupropine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for ibupropine when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 19 and lab marker INR.',
      citations: ['MS-REF-1671'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.71',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000673',
    name: 'age based rule 673',
    category: 'age-based',
    action: 'alert',
    priority: 73,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "WBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for amoxprazole when WBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 14 and lab marker WBC.',
      citations: ['MS-REF-1672'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.72',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000674',
    name: 'drug allergy rule 674',
    category: 'drug-allergy',
    action: 'order-set',
    priority: 74,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprodine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for ciprodine when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 02 and lab marker MCH.',
      citations: ['MS-REF-1673'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.73',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000675',
    name: 'age based rule 675',
    category: 'age-based',
    action: 'suggestion',
    priority: 75,
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticamycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Lymphocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for fluticamycin when Lymphocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 19 and lab marker Lymphocytes.',
      citations: ['MS-REF-1674'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.74',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000676',
    name: 'age based rule 676',
    category: 'age-based',
    action: 'alert',
    priority: 76,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "hydrochlorosartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for hydrochlorosartan when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 11 and lab marker Insulin.',
      citations: ['MS-REF-1675'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.75',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000677',
    name: 'diagnosis suggestion rule 677',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 77,
    enabled: true,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephatidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Neutrophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for cephatidine when Neutrophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 08 and lab marker Neutrophils.',
      citations: ['MS-REF-1676'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.76',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000678',
    name: 'renal dosing rule 678',
    category: 'renal-dosing',
    action: 'order-set',
    priority: 78,
    enabled: true,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCV"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for tramapam when MCV is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 12 and lab marker MCV.',
      citations: ['MS-REF-1677'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.77',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000679',
    name: 'contraindication rule 679',
    category: 'contraindication',
    action: 'order-set',
    priority: 79,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for insulinsetron when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 12 and lab marker RDW.',
      citations: ['MS-REF-1678'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.78',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000680',
    name: 'contraindication rule 680',
    category: 'contraindication',
    action: 'alert',
    priority: 80,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertrazepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Lymphocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for sertrazepam when Lymphocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 09 and lab marker Lymphocytes.',
      citations: ['MS-REF-1679'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.79',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000681',
    name: 'quality measure rule 681',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 81,
    enabled: false,
    evidenceLevel: 'expert-consensus',
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramazepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TIBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for tramazepam when TIBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 03 and lab marker TIBC.',
      citations: ['MS-REF-1680'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.80',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000682',
    name: 'drug disease rule 682',
    category: 'drug-disease',
    action: 'documentation-required',
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for amoxbarbital when Creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 10 and lab marker Creatinine.',
      citations: ['MS-REF-1681'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.81',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000683',
    name: 'preventive care rule 683',
    category: 'preventive-care',
    action: 'suggestion',
    priority: 83,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for cephacillin when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 13 and lab marker RDW.',
      citations: ['MS-REF-1682'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.82',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000684',
    name: 'drug disease rule 684',
    category: 'drug-disease',
    action: 'alert',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxecillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for fluoxecillin when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 17 and lab marker Fibrinogen.',
      citations: ['MS-REF-1683'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.83',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000685',
    name: 'duplicate therapy rule 685',
    category: 'duplicate-therapy',
    action: 'documentation-required',
    priority: 85,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramasartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for tramasartan when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 06 and lab marker Basophils.',
      citations: ['MS-REF-1684'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.84',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000686',
    name: 'drug drug rule 686',
    category: 'drug-drug',
    action: 'documentation-required',
    priority: 86,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertraprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for sertraprazole when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 06 and lab marker Basophils.',
      citations: ['MS-REF-1685'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.85',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000687',
    name: 'preventive care rule 687',
    category: 'preventive-care',
    action: 'hard-stop',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxtidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TIBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for amoxtidine when TIBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 08 and lab marker TIBC.',
      citations: ['MS-REF-1686'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.86',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000688',
    name: 'contraindication rule 688',
    category: 'contraindication',
    action: 'suggestion',
    priority: 88,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironomycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for spironomycin when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 08 and lab marker TSH.',
      citations: ['MS-REF-1687'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.87',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000689',
    name: 'age based rule 689',
    category: 'age-based',
    action: 'hard-stop',
    priority: 89,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertracycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for sertracycline when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 18 and lab marker Hematocrit.',
      citations: ['MS-REF-1688'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.88',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000690',
    name: 'drug drug rule 690',
    category: 'drug-drug',
    action: 'documentation-required',
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for albutolol when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 09 and lab marker INR.',
      citations: ['MS-REF-1689'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.89',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000691',
    name: 'order set rule 691',
    category: 'order-set',
    action: 'documentation-required',
    priority: 91,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentaphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "HbA1c"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for gentaphylline when HbA1c is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 02 and lab marker HbA1c.',
      citations: ['MS-REF-1690'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.90',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000692',
    name: 'pregnancy rule 692',
    category: 'pregnancy',
    action: 'hard-stop',
    priority: 92,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hepartidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for hepartidine when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 01 and lab marker PSA.',
      citations: ['MS-REF-1691'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.91',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000693',
    name: 'drug disease rule 693',
    category: 'drug-disease',
    action: 'alert',
    priority: 93,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "albutpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "C-peptide"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for albutpine when C-peptide is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 15 and lab marker C-peptide.',
      citations: ['MS-REF-1692'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.92',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000694',
    name: 'age based rule 694',
    category: 'age-based',
    action: 'documentation-required',
    priority: 94,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfarcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for warfarcillin when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 09 and lab marker RDW.',
      citations: ['MS-REF-1693'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.93',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000695',
    name: 'age based rule 695',
    category: 'age-based',
    action: 'documentation-required',
    priority: 95,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprosartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for ciprosartan when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 01 and lab marker Sodium.',
      citations: ['MS-REF-1694'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.94',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000696',
    name: 'pregnancy rule 696',
    category: 'pregnancy',
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibupropine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for ibupropine when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 03 and lab marker MCH.',
      citations: ['MS-REF-1695'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.95',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000697',
    name: 'age based rule 697',
    category: 'age-based',
    action: 'alert',
    priority: 97,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AFP"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for morphpine when AFP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 02 and lab marker AFP.',
      citations: ['MS-REF-1696'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.96',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000698',
    name: 'drug allergy rule 698',
    category: 'drug-allergy',
    action: 'order-set',
    priority: 98,
    enabled: false,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformdine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for metformdine when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 05 and lab marker Hematocrit.',
      citations: ['MS-REF-1697'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.97',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000699',
    name: 'contraindication rule 699',
    category: 'contraindication',
    action: 'documentation-required',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithropine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for azithropine when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 19 and lab marker Magnesium.',
      citations: ['MS-REF-1698'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.98',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000700',
    name: 'quality measure rule 700',
    category: 'quality-measure',
    action: 'order-set',
    priority: 100,
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Folate"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for salbutpril when Folate is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 13 and lab marker Folate.',
      citations: ['MS-REF-1699'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.99',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000701',
    name: 'pregnancy rule 701',
    category: 'pregnancy',
    action: 'documentation-required',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentaazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for gentaazole when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 21 and lab marker Magnesium.',
      citations: ['MS-REF-1700'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.0',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000702',
    name: 'renal dosing rule 702',
    category: 'renal-dosing',
    action: 'order-set',
    priority: 2,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprasartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Folate"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for pantoprasartan when Folate is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 01 and lab marker Folate.',
      citations: ['MS-REF-1701'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.1',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000703',
    name: 'diagnosis suggestion rule 703',
    category: 'diagnosis-suggestion',
    action: 'hard-stop',
    priority: 3,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentadine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CO2"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for gentadine when CO2 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 21 and lab marker CO2.',
      citations: ['MS-REF-1702'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.2',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000704',
    name: 'preventive care rule 704',
    category: 'preventive-care',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregababarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Calcium"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for pregababarbital when Calcium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 17 and lab marker Calcium.',
      citations: ['MS-REF-1703'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.3',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000705',
    name: 'order set rule 705',
    category: 'order-set',
    action: 'suggestion',
    priority: 5,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for hydrocodcycline when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 04 and lab marker Free T4.',
      citations: ['MS-REF-1704'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.4',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000706',
    name: 'quality measure rule 706',
    category: 'quality-measure',
    action: 'suggestion',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothyprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T3"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for levothyprazole when Free T3 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 18 and lab marker Free T3.',
      citations: ['MS-REF-1705'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.5',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000707',
    name: 'order set rule 707',
    category: 'order-set',
    action: 'documentation-required',
    priority: 7,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopracycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for pantopracycline when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 08 and lab marker CEA.',
      citations: ['MS-REF-1706'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.6',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000708',
    name: 'drug allergy rule 708',
    category: 'drug-allergy',
    action: 'alert',
    priority: 8,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancomsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for vancomsetron when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 19 and lab marker PSA.',
      citations: ['MS-REF-1707'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.7',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000709',
    name: 'age based rule 709',
    category: 'age-based',
    action: 'suggestion',
    priority: 9,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapensartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for gabapensartan when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 19 and lab marker Troponin I.',
      citations: ['MS-REF-1708'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.8',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000710',
    name: 'renal dosing rule 710',
    category: 'renal-dosing',
    action: 'documentation-required',
    priority: 10,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for tramapam when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 02 and lab marker ALP.',
      citations: ['MS-REF-1709'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.9',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000711',
    name: 'drug disease rule 711',
    category: 'drug-disease',
    action: 'suggestion',
    priority: 11,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxybarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for doxybarbital when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 05 and lab marker Magnesium.',
      citations: ['MS-REF-1710'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.10',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000712',
    name: 'preventive care rule 712',
    category: 'preventive-care',
    action: 'order-set',
    priority: 12,
    enabled: true,
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BUN"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for metformsetron when BUN is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 19 and lab marker BUN.',
      citations: ['MS-REF-1711'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.11',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000713',
    name: 'age based rule 713',
    category: 'age-based',
    action: 'alert',
    priority: 13,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omeprabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for omeprabarbital when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 08 and lab marker Eosinophils.',
      citations: ['MS-REF-1712'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.12',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000714',
    name: 'order set rule 714',
    category: 'order-set',
    action: 'order-set',
    priority: 14,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprasetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for pantoprasetron when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 08 and lab marker Iron.',
      citations: ['MS-REF-1713'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.13',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000715',
    name: 'age based rule 715',
    category: 'age-based',
    action: 'order-set',
    priority: 15,
    enabled: false,
    evidenceLevel: 'A',
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxestatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for fluoxestatin when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 13 and lab marker Urine protein.',
      citations: ['MS-REF-1714'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.14',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000716',
    name: 'preventive care rule 716',
    category: 'preventive-care',
    action: 'suggestion',
    priority: 16,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for naproxmycin when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 18 and lab marker Specific gravity.',
      citations: ['MS-REF-1715'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.15',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000717',
    name: 'diagnosis suggestion rule 717',
    category: 'diagnosis-suggestion',
    action: 'alert',
    priority: 17,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapenphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for gabapenphylline when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 18 and lab marker Eosinophils.',
      citations: ['MS-REF-1716'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.16',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000718',
    name: 'lab critical rule 718',
    category: 'lab-critical',
    action: 'suggestion',
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metrocycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Lymphocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for metrocycline when Lymphocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 09 and lab marker Lymphocytes.',
      citations: ['MS-REF-1717'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.17',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000719',
    name: 'preventive care rule 719',
    category: 'preventive-care',
    action: 'alert',
    priority: 19,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinopril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for lisinopril when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 15 and lab marker Magnesium.',
      citations: ['MS-REF-1718'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.18',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000720',
    name: 'duplicate therapy rule 720',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 20,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for oxycodsetron when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 21 and lab marker Transferrin.',
      citations: ['MS-REF-1719'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.19',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000721',
    name: 'contraindication rule 721',
    category: 'contraindication',
    action: 'order-set',
    priority: 21,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithrozepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for azithrozepam when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 16 and lab marker CEA.',
      citations: ['MS-REF-1720'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.20',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000722',
    name: 'pregnancy rule 722',
    category: 'pregnancy',
    action: 'suggestion',
    priority: 22,
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for clindastatin when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 01 and lab marker Sodium.',
      citations: ['MS-REF-1721'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.21',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000723',
    name: 'duplicate therapy rule 723',
    category: 'duplicate-therapy',
    action: 'suggestion',
    priority: 23,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikaprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "WBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for amikaprazole when WBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 08 and lab marker WBC.',
      citations: ['MS-REF-1722'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.22',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000724',
    name: 'lab critical rule 724',
    category: 'lab-critical',
    action: 'suggestion',
    priority: 24,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikamycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for amikamycin when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 09 and lab marker Eosinophils.',
      citations: ['MS-REF-1723'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.23',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000725',
    name: 'renal dosing rule 725',
    category: 'renal-dosing',
    action: 'alert',
    priority: 25,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabapine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for pregabapine when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 11 and lab marker Bilirubin.',
      citations: ['MS-REF-1724'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.24',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000726',
    name: 'drug drug rule 726',
    category: 'drug-drug',
    action: 'hard-stop',
    priority: 26,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metrotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Microalbumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for metrotidine when Microalbumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 09 and lab marker Microalbumin.',
      citations: ['MS-REF-1725'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.25',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000727',
    name: 'dosing rule 727',
    category: 'dosing',
    action: 'hard-stop',
    priority: 27,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertraolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BUN"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for sertraolol when BUN is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 08 and lab marker BUN.',
      citations: ['MS-REF-1726'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.26',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000728',
    name: 'lab critical rule 728',
    category: 'lab-critical',
    action: 'alert',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinopam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for lisinopam when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 18 and lab marker Insulin.',
      citations: ['MS-REF-1727'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.27',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000729',
    name: 'contraindication rule 729',
    category: 'contraindication',
    action: 'order-set',
    priority: 29,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furopril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for furopril when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 21 and lab marker Hematocrit.',
      citations: ['MS-REF-1728'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.28',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000730',
    name: 'quality measure rule 730',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 30,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironomycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Lymphocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for spironomycin when Lymphocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 21 and lab marker Lymphocytes.',
      citations: ['MS-REF-1729'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.29',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000731',
    name: 'quality measure rule 731',
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertracillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Total protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for sertracillin when Total protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 05 and lab marker Total protein.',
      citations: ['MS-REF-1730'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.30',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000732',
    name: 'age based rule 732',
    category: 'age-based',
    action: 'hard-stop',
    priority: 32,
    enabled: false,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitaloolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for escitaloolol when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 15 and lab marker Monocytes.',
      citations: ['MS-REF-1731'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.31',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000733',
    name: 'age based rule 733',
    category: 'age-based',
    action: 'order-set',
    priority: 33,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxypril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CRP"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for doxypril when CRP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 05 and lab marker CRP.',
      citations: ['MS-REF-1732'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.32',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000734',
    name: 'contraindication rule 734',
    category: 'contraindication',
    action: 'order-set',
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "HbA1c"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for amlodphylline when HbA1c is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 16 and lab marker HbA1c.',
      citations: ['MS-REF-1733'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.33',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000735',
    name: 'drug allergy rule 735',
    category: 'drug-allergy',
    action: 'order-set',
    priority: 35,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for atorvastatin when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 13 and lab marker Vitamin B12.',
      citations: ['MS-REF-1734'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.34',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000736',
    name: 'order set rule 736',
    category: 'order-set',
    action: 'hard-stop',
    priority: 36,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothycillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Platelet count"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for levothycillin when Platelet count is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 20 and lab marker Platelet count.',
      citations: ['MS-REF-1735'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.35',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000737',
    name: 'age based rule 737',
    category: 'age-based',
    action: 'suggestion',
    priority: 37,
    enabled: true,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramaprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for tramaprazole when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 15 and lab marker PSA.',
      citations: ['MS-REF-1736'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.36',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000738',
    name: 'duplicate therapy rule 738',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 38,
    enabled: true,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephadine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T3"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for cephadine when Free T3 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 04 and lab marker Free T3.',
      citations: ['MS-REF-1737'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.37',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000739',
    name: 'renal dosing rule 739',
    category: 'renal-dosing',
    action: 'alert',
    priority: 39,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for insulinpril when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 12 and lab marker CEA.',
      citations: ['MS-REF-1738'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.38',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000740',
    name: 'dosing rule 740',
    category: 'dosing',
    action: 'suggestion',
    priority: 40,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabaprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for pregabaprazole when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 08 and lab marker ALP.',
      citations: ['MS-REF-1739'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.39',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000741',
    name: 'drug allergy rule 741',
    category: 'drug-allergy',
    action: 'suggestion',
    priority: 41,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapenpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for gabapenpine when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 14 and lab marker PSA.',
      citations: ['MS-REF-1740'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.40',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000742',
    name: 'drug drug rule 742',
    category: 'drug-drug',
    action: 'documentation-required',
    priority: 42,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfarsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for warfarsetron when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 09 and lab marker ALT.',
      citations: ['MS-REF-1741'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.41',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000743',
    name: 'renal dosing rule 743',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 43,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironocillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "C-peptide"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for spironocillin when C-peptide is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 13 and lab marker C-peptide.',
      citations: ['MS-REF-1742'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.42',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000744',
    name: 'duplicate therapy rule 744',
    category: 'duplicate-therapy',
    action: 'order-set',
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxezepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for fluoxezepam when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 06 and lab marker Magnesium.',
      citations: ['MS-REF-1743'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.43',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000745',
    name: 'dosing rule 745',
    category: 'dosing',
    action: 'order-set',
    priority: 45,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxysartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for doxysartan when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 06 and lab marker Transferrin.',
      citations: ['MS-REF-1744'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.44',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000746',
    name: 'renal dosing rule 746',
    category: 'renal-dosing',
    action: 'order-set',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramaprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCHC"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for tramaprazole when MCHC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 18 and lab marker MCHC.',
      citations: ['MS-REF-1745'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.45',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000747',
    name: 'duplicate therapy rule 747',
    category: 'duplicate-therapy',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciproprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BUN"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for ciproprazole when BUN is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 15 and lab marker BUN.',
      citations: ['MS-REF-1746'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.46',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000748',
    name: 'drug allergy rule 748',
    category: 'drug-allergy',
    action: 'documentation-required',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for metformpine when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 08 and lab marker PSA.',
      citations: ['MS-REF-1747'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.47',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000749',
    name: 'preventive care rule 749',
    category: 'preventive-care',
    action: 'hard-stop',
    priority: 49,
    enabled: false,
    evidenceLevel: 'A',
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for cephacillin when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 05 and lab marker Monocytes.',
      citations: ['MS-REF-1748'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.48',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000750',
    name: 'age based rule 750',
    category: 'age-based',
    action: 'documentation-required',
    priority: 50,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothystatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "D-dimer"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for levothystatin when D-dimer is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 06 and lab marker D-dimer.',
      citations: ['MS-REF-1749'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.49',
      lastReviewed: '2025-06-01',
    },
  }
];
