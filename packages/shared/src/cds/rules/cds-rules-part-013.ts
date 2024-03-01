/**
 * MedSphere synthetic CDS rules — part 13 (development artifact).
 */
import type { CdsRule } from '../types';

export const cdsRulesPart13: CdsRule[] = [
  {
    id: 'CDS-001801',
    name: 'duplicate therapy rule 1801',
    category: 'duplicate-therapy',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentapine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for gentapine when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 17 and lab marker Albumin.',
      citations: ['MS-REF-2800'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.0',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001802',
    name: 'preventive care rule 1802',
    category: 'preventive-care',
    action: 'alert',
    priority: 2,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for ciprotidine when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 06 and lab marker Insulin.',
      citations: ['MS-REF-2801'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.1',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001803',
    name: 'drug drug rule 1803',
    category: 'drug-drug',
    action: 'documentation-required',
    priority: 3,
    enabled: false,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cipropine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CO2"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for cipropine when CO2 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 05 and lab marker CO2.',
      citations: ['MS-REF-2802'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.2',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001804',
    name: 'order set rule 1804',
    category: 'order-set',
    action: 'alert',
    priority: 4,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphtidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for morphtidine when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 07 and lab marker ALP.',
      citations: ['MS-REF-2803'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.3',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001805',
    name: 'quality measure rule 1805',
    category: 'quality-measure',
    action: 'order-set',
    priority: 5,
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalosartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for escitalosartan when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 03 and lab marker PT.',
      citations: ['MS-REF-2804'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.4',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001806',
    name: 'contraindication rule 1806',
    category: 'contraindication',
    action: 'documentation-required',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxyzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BNP"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for doxyzepam when BNP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 18 and lab marker BNP.',
      citations: ['MS-REF-2805'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.5',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001807',
    name: 'preventive care rule 1807',
    category: 'preventive-care',
    action: 'alert',
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinophylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for lisinophylline when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 13 and lab marker TSH.',
      citations: ['MS-REF-2806'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.6',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001808',
    name: 'age based rule 1808',
    category: 'age-based',
    action: 'alert',
    priority: 8,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindaazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Folate"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for clindaazole when Folate is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 04 and lab marker Folate.',
      citations: ['MS-REF-2807'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.7',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001809',
    name: 'quality measure rule 1809',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 9,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "vancomsartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for vancomsartan when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 21 and lab marker Vitamin B12.',
      citations: ['MS-REF-2808'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.8',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001810',
    name: 'drug disease rule 1810',
    category: 'drug-disease',
    action: 'order-set',
    priority: 10,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancomprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for vancomprazole when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 07 and lab marker ALP.',
      citations: ['MS-REF-2809'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.9',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001811',
    name: 'contraindication rule 1811',
    category: 'contraindication',
    action: 'hard-stop',
    priority: 11,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbuttidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for salbuttidine when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 13 and lab marker Free T4.',
      citations: ['MS-REF-2810'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.10',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001812',
    name: 'quality measure rule 1812',
    category: 'quality-measure',
    action: 'documentation-required',
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for albutzepam when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 11 and lab marker Basophils.',
      citations: ['MS-REF-2811'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.11',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001813',
    name: 'renal dosing rule 1813',
    category: 'renal-dosing',
    action: 'alert',
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfarmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for warfarmycin when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 16 and lab marker Iron.',
      citations: ['MS-REF-2812'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.12',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001814',
    name: 'quality measure rule 1814',
    category: 'quality-measure',
    action: 'hard-stop',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for amoxphylline when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 18 and lab marker ALT.',
      citations: ['MS-REF-2813'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.13',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001815',
    name: 'duplicate therapy rule 1815',
    category: 'duplicate-therapy',
    action: 'suggestion',
    priority: 15,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibuproolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for ibuproolol when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 16 and lab marker Eosinophils.',
      citations: ['MS-REF-2814'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.14',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001816',
    name: 'quality measure rule 1816',
    category: 'quality-measure',
    action: 'alert',
    priority: 16,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikatidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for amikatidine when Creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 21 and lab marker Creatinine.',
      citations: ['MS-REF-2815'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.15',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001817',
    name: 'duplicate therapy rule 1817',
    category: 'duplicate-therapy',
    action: 'alert',
    priority: 17,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxyolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for doxyolol when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 11 and lab marker Basophils.',
      citations: ['MS-REF-2816'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.16',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001818',
    name: 'drug allergy rule 1818',
    category: 'drug-allergy',
    action: 'suggestion',
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfartidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for warfartidine when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 11 and lab marker Insulin.',
      citations: ['MS-REF-2817'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.17',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001819',
    name: 'duplicate therapy rule 1819',
    category: 'duplicate-therapy',
    action: 'suggestion',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabadine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for pregabadine when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 18 and lab marker MCH.',
      citations: ['MS-REF-2818'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.18',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001820',
    name: 'contraindication rule 1820',
    category: 'contraindication',
    action: 'alert',
    priority: 20,
    enabled: false,
    evidenceLevel: 'A',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapenolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for gabapenolol when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 01 and lab marker Troponin I.',
      citations: ['MS-REF-2819'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.19',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001821',
    name: 'drug drug rule 1821',
    category: 'drug-drug',
    action: 'hard-stop',
    priority: 21,
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furopril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for furopril when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 10 and lab marker Vitamin D.',
      citations: ['MS-REF-2820'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.20',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001822',
    name: 'age based rule 1822',
    category: 'age-based',
    action: 'alert',
    priority: 22,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodpam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "D-dimer"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for hydrocodpam when D-dimer is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 14 and lab marker D-dimer.',
      citations: ['MS-REF-2821'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.21',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001823',
    name: 'quality measure rule 1823',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 23,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxeprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "C-peptide"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for fluoxeprazole when C-peptide is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 15 and lab marker C-peptide.',
      citations: ['MS-REF-2822'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.22',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001824',
    name: 'contraindication rule 1824',
    category: 'contraindication',
    action: 'order-set',
    priority: 24,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metromycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BUN"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for metromycin when BUN is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 11 and lab marker BUN.',
      citations: ['MS-REF-2823'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.23',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001825',
    name: 'quality measure rule 1825',
    category: 'quality-measure',
    action: 'suggestion',
    priority: 25,
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibuproolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCV"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for ibuproolol when MCV is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 21 and lab marker MCV.',
      citations: ['MS-REF-2824'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.24',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001826',
    name: 'pregnancy rule 1826',
    category: 'pregnancy',
    action: 'alert',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omepraolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for omepraolol when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 02 and lab marker PSA.',
      citations: ['MS-REF-2825'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.25',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001827',
    name: 'diagnosis suggestion rule 1827',
    category: 'diagnosis-suggestion',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxypam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for doxypam when RBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 02 and lab marker RBC.',
      citations: ['MS-REF-2826'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.26',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001828',
    name: 'diagnosis suggestion rule 1828',
    category: 'diagnosis-suggestion',
    action: 'alert',
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for fluticacillin when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 03 and lab marker pH.',
      citations: ['MS-REF-2827'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.27',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001829',
    name: 'diagnosis suggestion rule 1829',
    category: 'diagnosis-suggestion',
    action: 'order-set',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AFP"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for clindacillin when AFP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 17 and lab marker AFP.',
      citations: ['MS-REF-2828'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.28',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001830',
    name: 'diagnosis suggestion rule 1830',
    category: 'diagnosis-suggestion',
    action: 'hard-stop',
    priority: 30,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephaolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for cephaolol when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 18 and lab marker Chloride.',
      citations: ['MS-REF-2829'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.29',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001831',
    name: 'order set rule 1831',
    category: 'order-set',
    action: 'hard-stop',
    priority: 31,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapenphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for gabapenphylline when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 20 and lab marker ALT.',
      citations: ['MS-REF-2830'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.30',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001832',
    name: 'diagnosis suggestion rule 1832',
    category: 'diagnosis-suggestion',
    action: 'suggestion',
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for amoxazole when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 14 and lab marker ALP.',
      citations: ['MS-REF-2831'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.31',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001833',
    name: 'drug allergy rule 1833',
    category: 'drug-allergy',
    action: 'documentation-required',
    priority: 33,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "hydrocodtidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for hydrocodtidine when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 13 and lab marker Fibrinogen.',
      citations: ['MS-REF-2832'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.32',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001834',
    name: 'diagnosis suggestion rule 1834',
    category: 'diagnosis-suggestion',
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for insulinazole when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 14 and lab marker ALT.',
      citations: ['MS-REF-2833'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.33',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001835',
    name: 'duplicate therapy rule 1835',
    category: 'duplicate-therapy',
    action: 'hard-stop',
    priority: 35,
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for naproxolol when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 19 and lab marker RDW.',
      citations: ['MS-REF-2834'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.34',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001836',
    name: 'preventive care rule 1836',
    category: 'preventive-care',
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphpam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for morphpam when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 11 and lab marker Bilirubin.',
      citations: ['MS-REF-2835'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.35',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001837',
    name: 'diagnosis suggestion rule 1837',
    category: 'diagnosis-suggestion',
    action: 'alert',
    priority: 37,
    enabled: false,
    evidenceLevel: 'B',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for oxycodstatin when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 01 and lab marker Phosphorus.',
      citations: ['MS-REF-2836'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.36',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001838',
    name: 'diagnosis suggestion rule 1838',
    category: 'diagnosis-suggestion',
    action: 'hard-stop',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metrosetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Lymphocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for metrosetron when Lymphocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 04 and lab marker Lymphocytes.',
      citations: ['MS-REF-2837'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.37',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001839',
    name: 'dosing rule 1839',
    category: 'dosing',
    action: 'suggestion',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxapazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for enoxapazole when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 19 and lab marker PT.',
      citations: ['MS-REF-2838'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.38',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001840',
    name: 'quality measure rule 1840',
    category: 'quality-measure',
    action: 'order-set',
    priority: 40,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "dexaazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for dexaazole when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 04 and lab marker Chloride.',
      citations: ['MS-REF-2839'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.39',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001841',
    name: 'pregnancy rule 1841',
    category: 'pregnancy',
    action: 'hard-stop',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothysetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for levothysetron when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 21 and lab marker ALT.',
      citations: ['MS-REF-2840'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.40',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001842',
    name: 'preventive care rule 1842',
    category: 'preventive-care',
    action: 'order-set',
    priority: 42,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancomazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "WBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for vancomazole when WBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 02 and lab marker WBC.',
      citations: ['MS-REF-2841'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.41',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001843',
    name: 'age based rule 1843',
    category: 'age-based',
    action: 'alert',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabaphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for pregabaphylline when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 18 and lab marker Albumin.',
      citations: ['MS-REF-2842'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.42',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001844',
    name: 'diagnosis suggestion rule 1844',
    category: 'diagnosis-suggestion',
    action: 'suggestion',
    priority: 44,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "prednicillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "WBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for prednicillin when WBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 17 and lab marker WBC.',
      citations: ['MS-REF-2843'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.43',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001845',
    name: 'duplicate therapy rule 1845',
    category: 'duplicate-therapy',
    action: 'documentation-required',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for albutolol when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 15 and lab marker Specific gravity.',
      citations: ['MS-REF-2844'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.44',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001846',
    name: 'duplicate therapy rule 1846',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 46,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "HbA1c"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for escitalostatin when HbA1c is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 20 and lab marker HbA1c.',
      citations: ['MS-REF-2845'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.45',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001847',
    name: 'age based rule 1847',
    category: 'age-based',
    action: 'documentation-required',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancomtidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for vancomtidine when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 19 and lab marker ALT.',
      citations: ['MS-REF-2846'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.46',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001848',
    name: 'order set rule 1848',
    category: 'order-set',
    action: 'documentation-required',
    priority: 48,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for pantoprabarbital when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 01 and lab marker Phosphorus.',
      citations: ['MS-REF-2847'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.47',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001849',
    name: 'renal dosing rule 1849',
    category: 'renal-dosing',
    action: 'alert',
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for prednidine when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 11 and lab marker TSH.',
      citations: ['MS-REF-2848'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.48',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001850',
    name: 'duplicate therapy rule 1850',
    category: 'duplicate-therapy',
    action: 'hard-stop',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for albutcillin when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 04 and lab marker Hematocrit.',
      citations: ['MS-REF-2849'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.49',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001851',
    name: 'preventive care rule 1851',
    category: 'preventive-care',
    action: 'suggestion',
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephamycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for cephamycin when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 09 and lab marker RDW.',
      citations: ['MS-REF-2850'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.50',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001852',
    name: 'order set rule 1852',
    category: 'order-set',
    action: 'documentation-required',
    priority: 52,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithrostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for azithrostatin when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 09 and lab marker Transferrin.',
      citations: ['MS-REF-2851'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.51',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001853',
    name: 'contraindication rule 1853',
    category: 'contraindication',
    action: 'hard-stop',
    priority: 53,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metrobarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for metrobarbital when Urine creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 08 and lab marker Urine creatinine.',
      citations: ['MS-REF-2852'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.52',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001854',
    name: 'drug disease rule 1854',
    category: 'drug-disease',
    action: 'hard-stop',
    priority: 54,
    enabled: false,
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
                      "value": "sertracycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for sertracycline when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 11 and lab marker Phosphorus.',
      citations: ['MS-REF-2853'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.53',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001855',
    name: 'lab critical rule 1855',
    category: 'lab-critical',
    action: 'documentation-required',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvapril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Lymphocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for atorvapril when Lymphocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 04 and lab marker Lymphocytes.',
      citations: ['MS-REF-2854'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.54',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001856',
    name: 'order set rule 1856',
    category: 'order-set',
    action: 'alert',
    priority: 56,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertrapine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for sertrapine when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 01 and lab marker GGT.',
      citations: ['MS-REF-2855'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.55',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001857',
    name: 'pregnancy rule 1857',
    category: 'pregnancy',
    action: 'hard-stop',
    priority: 57,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikaazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CRP"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for amikaazole when CRP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 10 and lab marker CRP.',
      citations: ['MS-REF-2856'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.56',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001858',
    name: 'drug disease rule 1858',
    category: 'drug-disease',
    action: 'order-set',
    priority: 58,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "spironocycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for spironocycline when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 03 and lab marker Free T4.',
      citations: ['MS-REF-2857'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.57',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001859',
    name: 'contraindication rule 1859',
    category: 'contraindication',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for heparzepam when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 21 and lab marker Sodium.',
      citations: ['MS-REF-2858'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.58',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001860',
    name: 'diagnosis suggestion rule 1860',
    category: 'diagnosis-suggestion',
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for prednidine when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 14 and lab marker Albumin.',
      citations: ['MS-REF-2859'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.59',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001861',
    name: 'duplicate therapy rule 1861',
    category: 'duplicate-therapy',
    action: 'suggestion',
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for insulinprazole when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 10 and lab marker Free T4.',
      citations: ['MS-REF-2860'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.60',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001862',
    name: 'preventive care rule 1862',
    category: 'preventive-care',
    action: 'order-set',
    priority: 62,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancomolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for vancomolol when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 02 and lab marker ALT.',
      citations: ['MS-REF-2861'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.61',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001863',
    name: 'drug disease rule 1863',
    category: 'drug-disease',
    action: 'alert',
    priority: 63,
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindaphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for clindaphylline when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 03 and lab marker PT.',
      citations: ['MS-REF-2862'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.62',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001864',
    name: 'drug disease rule 1864',
    category: 'drug-disease',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfarcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Neutrophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for warfarcillin when Neutrophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 18 and lab marker Neutrophils.',
      citations: ['MS-REF-2863'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.63',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001865',
    name: 'pregnancy rule 1865',
    category: 'pregnancy',
    action: 'suggestion',
    priority: 65,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omepraolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCV"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for omepraolol when MCV is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 12 and lab marker MCV.',
      citations: ['MS-REF-2864'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.64',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001866',
    name: 'duplicate therapy rule 1866',
    category: 'duplicate-therapy',
    action: 'hard-stop',
    priority: 66,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticapine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for fluticapine when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 14 and lab marker ALP.',
      citations: ['MS-REF-2865'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.65',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001867',
    name: 'drug drug rule 1867',
    category: 'drug-drug',
    action: 'hard-stop',
    priority: 67,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for morphpine when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 12 and lab marker Vitamin D.',
      citations: ['MS-REF-2866'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.66',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001868',
    name: 'lab critical rule 1868',
    category: 'lab-critical',
    action: 'alert',
    priority: 68,
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for amlodmycin when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 01 and lab marker CEA.',
      citations: ['MS-REF-2867'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.67',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001869',
    name: 'drug allergy rule 1869',
    category: 'drug-allergy',
    action: 'alert',
    priority: 69,
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochloroolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for hydrochloroolol when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 03 and lab marker GGT.',
      citations: ['MS-REF-2868'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.68',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001870',
    name: 'order set rule 1870',
    category: 'order-set',
    action: 'suggestion',
    priority: 70,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "escitalozepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for escitalozepam when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 19 and lab marker RDW.',
      citations: ['MS-REF-2869'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.69',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001871',
    name: 'preventive care rule 1871',
    category: 'preventive-care',
    action: 'suggestion',
    priority: 71,
    enabled: false,
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
                      "value": "spironocillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for spironocillin when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 08 and lab marker ALP.',
      citations: ['MS-REF-2870'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.70',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001872',
    name: 'diagnosis suggestion rule 1872',
    category: 'diagnosis-suggestion',
    action: 'alert',
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for hydrocodpril when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 10 and lab marker Troponin I.',
      citations: ['MS-REF-2871'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.71',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001873',
    name: 'drug disease rule 1873',
    category: 'drug-disease',
    action: 'hard-stop',
    priority: 73,
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
                      "value": "gabapenazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "LDH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for gabapenazole when LDH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 05 and lab marker LDH.',
      citations: ['MS-REF-2872'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.72',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001874',
    name: 'pregnancy rule 1874',
    category: 'pregnancy',
    action: 'hard-stop',
    priority: 74,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxapphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BNP"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for enoxapphylline when BNP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 08 and lab marker BNP.',
      citations: ['MS-REF-2873'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.73',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001875',
    name: 'pregnancy rule 1875',
    category: 'pregnancy',
    action: 'documentation-required',
    priority: 75,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "sertradine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TIBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for sertradine when TIBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 15 and lab marker TIBC.',
      citations: ['MS-REF-2874'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.74',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001876',
    name: 'pregnancy rule 1876',
    category: 'pregnancy',
    action: 'hard-stop',
    priority: 76,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprocillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for ciprocillin when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 21 and lab marker Free T4.',
      citations: ['MS-REF-2875'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.75',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001877',
    name: 'renal dosing rule 1877',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 77,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxymycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AST"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for doxymycin when AST is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 04 and lab marker AST.',
      citations: ['MS-REF-2876'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.76',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001878',
    name: 'age based rule 1878',
    category: 'age-based',
    action: 'suggestion',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalosartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for escitalosartan when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 20 and lab marker Glucose.',
      citations: ['MS-REF-2877'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.77',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001879',
    name: 'order set rule 1879',
    category: 'order-set',
    action: 'hard-stop',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancomolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for vancomolol when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 02 and lab marker GGT.',
      citations: ['MS-REF-2878'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.78',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001880',
    name: 'duplicate therapy rule 1880',
    category: 'duplicate-therapy',
    action: 'alert',
    priority: 80,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprozepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Microalbumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for ciprozepam when Microalbumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 12 and lab marker Microalbumin.',
      citations: ['MS-REF-2879'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.79',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001881',
    name: 'dosing rule 1881',
    category: 'dosing',
    action: 'suggestion',
    priority: 81,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for naproxcillin when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 05 and lab marker Ferritin.',
      citations: ['MS-REF-2880'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.80',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001882',
    name: 'duplicate therapy rule 1882',
    category: 'duplicate-therapy',
    action: 'hard-stop',
    priority: 82,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "sertrapine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for sertrapine when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 07 and lab marker Vitamin B12.',
      citations: ['MS-REF-2881'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.81',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001883',
    name: 'quality measure rule 1883',
    category: 'quality-measure',
    action: 'hard-stop',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxystatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for doxystatin when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 19 and lab marker Iron.',
      citations: ['MS-REF-2882'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.82',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001884',
    name: 'duplicate therapy rule 1884',
    category: 'duplicate-therapy',
    action: 'documentation-required',
    priority: 84,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticacycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for fluticacycline when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 02 and lab marker Basophils.',
      citations: ['MS-REF-2883'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.83',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001885',
    name: 'diagnosis suggestion rule 1885',
    category: 'diagnosis-suggestion',
    action: 'suggestion',
    priority: 85,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxapdine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "aPTT"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for enoxapdine when aPTT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 04 and lab marker aPTT.',
      citations: ['MS-REF-2884'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.84',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001886',
    name: 'duplicate therapy rule 1886',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 86,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for hydrocodpril when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 07 and lab marker INR.',
      citations: ['MS-REF-2885'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.85',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001887',
    name: 'drug allergy rule 1887',
    category: 'drug-allergy',
    action: 'alert',
    priority: 87,
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodtidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for hydrocodtidine when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 10 and lab marker Sodium.',
      citations: ['MS-REF-2886'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.86',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001888',
    name: 'duplicate therapy rule 1888',
    category: 'duplicate-therapy',
    action: 'hard-stop',
    priority: 88,
    enabled: false,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednistatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for prednistatin when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 14 and lab marker Free T4.',
      citations: ['MS-REF-2887'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.87',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001889',
    name: 'dosing rule 1889',
    category: 'dosing',
    action: 'documentation-required',
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
                      "value": "salbutcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for salbutcycline when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 18 and lab marker Basophils.',
      citations: ['MS-REF-2888'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.88',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001890',
    name: 'contraindication rule 1890',
    category: 'contraindication',
    action: 'hard-stop',
    priority: 90,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertrabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for sertrabarbital when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 02 and lab marker Bilirubin.',
      citations: ['MS-REF-2889'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.89',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001891',
    name: 'drug drug rule 1891',
    category: 'drug-drug',
    action: 'suggestion',
    priority: 91,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephapril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for cephapril when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 06 and lab marker Glucose.',
      citations: ['MS-REF-2890'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.90',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001892',
    name: 'duplicate therapy rule 1892',
    category: 'duplicate-therapy',
    action: 'documentation-required',
    priority: 92,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednipam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for prednipam when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 04 and lab marker Chloride.',
      citations: ['MS-REF-2891'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.91',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001893',
    name: 'lab critical rule 1893',
    category: 'lab-critical',
    action: 'documentation-required',
    priority: 93,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutdine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for albutdine when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 04 and lab marker Insulin.',
      citations: ['MS-REF-2892'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.92',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001894',
    name: 'preventive care rule 1894',
    category: 'preventive-care',
    action: 'suggestion',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfarzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hemoglobin"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for warfarzepam when Hemoglobin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 19 and lab marker Hemoglobin.',
      citations: ['MS-REF-2893'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.93',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001895',
    name: 'renal dosing rule 1895',
    category: 'renal-dosing',
    action: 'order-set',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochloromycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for hydrochloromycin when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 18 and lab marker ESR.',
      citations: ['MS-REF-2894'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.94',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001896',
    name: 'contraindication rule 1896',
    category: 'contraindication',
    action: 'suggestion',
    priority: 96,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertracycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for sertracycline when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 07 and lab marker Albumin.',
      citations: ['MS-REF-2895'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.95',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001897',
    name: 'drug allergy rule 1897',
    category: 'drug-allergy',
    action: 'alert',
    priority: 97,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothystatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for levothystatin when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 19 and lab marker Fibrinogen.',
      citations: ['MS-REF-2896'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.96',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001898',
    name: 'diagnosis suggestion rule 1898',
    category: 'diagnosis-suggestion',
    action: 'documentation-required',
    priority: 98,
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
                      "value": "naproxphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for naproxphylline when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 19 and lab marker Ferritin.',
      citations: ['MS-REF-2897'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.97',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001899',
    name: 'drug allergy rule 1899',
    category: 'drug-allergy',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancompril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for vancompril when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 02 and lab marker MCH.',
      citations: ['MS-REF-2898'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.98',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001900',
    name: 'contraindication rule 1900',
    category: 'contraindication',
    action: 'suggestion',
    priority: 100,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hepardine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for hepardine when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 03 and lab marker Troponin I.',
      citations: ['MS-REF-2899'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.99',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001901',
    name: 'age based rule 1901',
    category: 'age-based',
    action: 'alert',
    priority: 1,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for hydrocodcillin when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 08 and lab marker TSH.',
      citations: ['MS-REF-2900'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.0',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001902',
    name: 'age based rule 1902',
    category: 'age-based',
    action: 'documentation-required',
    priority: 2,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetaminsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for acetaminsetron when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 06 and lab marker Albumin.',
      citations: ['MS-REF-2901'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.1',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001903',
    name: 'preventive care rule 1903',
    category: 'preventive-care',
    action: 'order-set',
    priority: 3,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "fluticapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for fluticapam when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 07 and lab marker Vitamin B12.',
      citations: ['MS-REF-2902'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.2',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001904',
    name: 'drug allergy rule 1904',
    category: 'drug-allergy',
    action: 'documentation-required',
    priority: 4,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinobarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for lisinobarbital when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 16 and lab marker Ferritin.',
      citations: ['MS-REF-2903'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.3',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001905',
    name: 'drug disease rule 1905',
    category: 'drug-disease',
    action: 'alert',
    priority: 5,
    enabled: false,
    evidenceLevel: 'D',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednicillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CRP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for prednicillin when CRP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 01 and lab marker CRP.',
      citations: ['MS-REF-2904'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.4',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001906',
    name: 'contraindication rule 1906',
    category: 'contraindication',
    action: 'suggestion',
    priority: 6,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochlorophylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for hydrochlorophylline when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 06 and lab marker Magnesium.',
      citations: ['MS-REF-2905'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.5',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001907',
    name: 'drug drug rule 1907',
    category: 'drug-drug',
    action: 'hard-stop',
    priority: 7,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "azithropam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for azithropam when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 16 and lab marker pH.',
      citations: ['MS-REF-2906'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.6',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001908',
    name: 'order set rule 1908',
    category: 'order-set',
    action: 'suggestion',
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
                      "value": "warfarbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for warfarbarbital when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 19 and lab marker Bilirubin.',
      citations: ['MS-REF-2907'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.7',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001909',
    name: 'drug allergy rule 1909',
    category: 'drug-allergy',
    action: 'alert',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfardine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for warfardine when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 15 and lab marker PSA.',
      citations: ['MS-REF-2908'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.8',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001910',
    name: 'duplicate therapy rule 1910',
    category: 'duplicate-therapy',
    action: 'order-set',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticatidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for fluticatidine when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 15 and lab marker Glucose.',
      citations: ['MS-REF-2909'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.9',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001911',
    name: 'preventive care rule 1911',
    category: 'preventive-care',
    action: 'suggestion',
    priority: 11,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for spironostatin when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 06 and lab marker GGT.',
      citations: ['MS-REF-2910'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.10',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001912',
    name: 'contraindication rule 1912',
    category: 'contraindication',
    action: 'suggestion',
    priority: 12,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironodine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for spironodine when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 09 and lab marker Fibrinogen.',
      citations: ['MS-REF-2911'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.11',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001913',
    name: 'drug allergy rule 1913',
    category: 'drug-allergy',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednicycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for prednicycline when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 17 and lab marker Sodium.',
      citations: ['MS-REF-2912'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.12',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001914',
    name: 'quality measure rule 1914',
    category: 'quality-measure',
    action: 'suggestion',
    priority: 14,
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindaolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for clindaolol when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 01 and lab marker Chloride.',
      citations: ['MS-REF-2913'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.13',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001915',
    name: 'lab critical rule 1915',
    category: 'lab-critical',
    action: 'hard-stop',
    priority: 15,
    enabled: true,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopracycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AFP"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for pantopracycline when AFP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 05 and lab marker AFP.',
      citations: ['MS-REF-2914'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.14',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001916',
    name: 'drug allergy rule 1916',
    category: 'drug-allergy',
    action: 'order-set',
    priority: 16,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalopine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for escitalopine when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 15 and lab marker ALP.',
      citations: ['MS-REF-2915'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.15',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001917',
    name: 'preventive care rule 1917',
    category: 'preventive-care',
    action: 'documentation-required',
    priority: 17,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "lisinopam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for lisinopam when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 14 and lab marker Vitamin B12.',
      citations: ['MS-REF-2916'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.16',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001918',
    name: 'lab critical rule 1918',
    category: 'lab-critical',
    action: 'documentation-required',
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxysetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Folate"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for doxysetron when Folate is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 05 and lab marker Folate.',
      citations: ['MS-REF-2917'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.17',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001919',
    name: 'renal dosing rule 1919',
    category: 'renal-dosing',
    action: 'suggestion',
    priority: 19,
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
                      "value": "R"
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
      summary: 'Review renal-dosing for morphstatin when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 18 and lab marker PT.',
      citations: ['MS-REF-2918'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.18',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001920',
    name: 'renal dosing rule 1920',
    category: 'renal-dosing',
    action: 'order-set',
    priority: 20,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopramycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for pantopramycin when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 19 and lab marker Phosphorus.',
      citations: ['MS-REF-2919'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.19',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001921',
    name: 'lab critical rule 1921',
    category: 'lab-critical',
    action: 'suggestion',
    priority: 21,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CO2"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for lisinotidine when CO2 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 02 and lab marker CO2.',
      citations: ['MS-REF-2920'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.20',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001922',
    name: 'order set rule 1922',
    category: 'order-set',
    action: 'suggestion',
    priority: 22,
    enabled: false,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikasartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for amikasartan when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 08 and lab marker Albumin.',
      citations: ['MS-REF-2921'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.21',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001923',
    name: 'drug disease rule 1923',
    category: 'drug-disease',
    action: 'suggestion',
    priority: 23,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "sertratidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for sertratidine when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 08 and lab marker pH.',
      citations: ['MS-REF-2922'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.22',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001924',
    name: 'renal dosing rule 1924',
    category: 'renal-dosing',
    action: 'suggestion',
    priority: 24,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetaminprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for acetaminprazole when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 11 and lab marker CEA.',
      citations: ['MS-REF-2923'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.23',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001925',
    name: 'order set rule 1925',
    category: 'order-set',
    action: 'documentation-required',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxapsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CO2"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for enoxapsetron when CO2 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 02 and lab marker CO2.',
      citations: ['MS-REF-2924'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.24',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001926',
    name: 'duplicate therapy rule 1926',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 26,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfardine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for warfardine when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 20 and lab marker Albumin.',
      citations: ['MS-REF-2925'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.25',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001927',
    name: 'quality measure rule 1927',
    category: 'quality-measure',
    action: 'suggestion',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for albutbarbital when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 15 and lab marker pH.',
      citations: ['MS-REF-2926'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.26',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001928',
    name: 'diagnosis suggestion rule 1928',
    category: 'diagnosis-suggestion',
    action: 'hard-stop',
    priority: 28,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithromycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for azithromycin when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 09 and lab marker Free T4.',
      citations: ['MS-REF-2927'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.27',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001929',
    name: 'dosing rule 1929',
    category: 'dosing',
    action: 'hard-stop',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for gentastatin when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 04 and lab marker MCH.',
      citations: ['MS-REF-2928'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.28',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001930',
    name: 'contraindication rule 1930',
    category: 'contraindication',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for atorvacillin when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 08 and lab marker PT.',
      citations: ['MS-REF-2929'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.29',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001931',
    name: 'dosing rule 1931',
    category: 'dosing',
    action: 'suggestion',
    priority: 31,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxebarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for fluoxebarbital when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 06 and lab marker Ferritin.',
      citations: ['MS-REF-2930'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.30',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001932',
    name: 'drug allergy rule 1932',
    category: 'drug-allergy',
    action: 'order-set',
    priority: 32,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikapine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for amikapine when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 08 and lab marker Transferrin.',
      citations: ['MS-REF-2931'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.31',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001933',
    name: 'quality measure rule 1933',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 33,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for hydrocodmycin when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 20 and lab marker Chloride.',
      citations: ['MS-REF-2932'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.32',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001934',
    name: 'age based rule 1934',
    category: 'age-based',
    action: 'order-set',
    priority: 34,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for amoxolol when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 14 and lab marker PSA.',
      citations: ['MS-REF-2933'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.33',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001935',
    name: 'diagnosis suggestion rule 1935',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 35,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for salbutstatin when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 14 and lab marker ESR.',
      citations: ['MS-REF-2934'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.34',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001936',
    name: 'diagnosis suggestion rule 1936',
    category: 'diagnosis-suggestion',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikaprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for amikaprazole when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 15 and lab marker Fibrinogen.',
      citations: ['MS-REF-2935'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.35',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001937',
    name: 'drug disease rule 1937',
    category: 'drug-disease',
    action: 'alert',
    priority: 37,
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
                      "value": "naproxtidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CRP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for naproxtidine when CRP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 11 and lab marker CRP.',
      citations: ['MS-REF-2936'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.36',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001938',
    name: 'drug drug rule 1938',
    category: 'drug-drug',
    action: 'documentation-required',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalopril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for escitalopril when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 20 and lab marker pH.',
      citations: ['MS-REF-2937'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.37',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001939',
    name: 'drug drug rule 1939',
    category: 'drug-drug',
    action: 'alert',
    priority: 39,
    enabled: false,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephapine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Potassium"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for cephapine when Potassium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 18 and lab marker Potassium.',
      citations: ['MS-REF-2938'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.38',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001940',
    name: 'age based rule 1940',
    category: 'age-based',
    action: 'suggestion',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for metformphylline when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 02 and lab marker Chloride.',
      citations: ['MS-REF-2939'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.39',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001941',
    name: 'drug disease rule 1941',
    category: 'drug-disease',
    action: 'alert',
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindasetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AST"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for clindasetron when AST is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 10 and lab marker AST.',
      citations: ['MS-REF-2940'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.40',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001942',
    name: 'preventive care rule 1942',
    category: 'preventive-care',
    action: 'alert',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Platelet count"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for naproxpril when Platelet count is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 21 and lab marker Platelet count.',
      citations: ['MS-REF-2941'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.41',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001943',
    name: 'order set rule 1943',
    category: 'order-set',
    action: 'suggestion',
    priority: 43,
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
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for omeprabarbital when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 08 and lab marker Phosphorus.',
      citations: ['MS-REF-2942'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.42',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001944',
    name: 'pregnancy rule 1944',
    category: 'pregnancy',
    action: 'alert',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Platelet count"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for lisinotidine when Platelet count is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 04 and lab marker Platelet count.',
      citations: ['MS-REF-2943'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.43',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001945',
    name: 'drug drug rule 1945',
    category: 'drug-drug',
    action: 'suggestion',
    priority: 45,
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
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for tramaprazole when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 18 and lab marker GGT.',
      citations: ['MS-REF-2944'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.44',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001946',
    name: 'quality measure rule 1946',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 46,
    enabled: true,
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "dexapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for dexapam when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 19 and lab marker PT.',
      citations: ['MS-REF-2945'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.45',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001947',
    name: 'lab critical rule 1947',
    category: 'lab-critical',
    action: 'suggestion',
    priority: 47,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformpam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for metformpam when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 08 and lab marker RDW.',
      citations: ['MS-REF-2946'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.46',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001948',
    name: 'quality measure rule 1948',
    category: 'quality-measure',
    action: 'order-set',
    priority: 48,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for salbutolol when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 04 and lab marker Ferritin.',
      citations: ['MS-REF-2947'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.47',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001949',
    name: 'renal dosing rule 1949',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 49,
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
                      "value": "amoxstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCHC"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for amoxstatin when MCHC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 19 and lab marker MCHC.',
      citations: ['MS-REF-2948'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.48',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-001950',
    name: 'preventive care rule 1950',
    category: 'preventive-care',
    action: 'alert',
    priority: 50,
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
                      "value": "pantopraolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for pantopraolol when Urine creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 10 and lab marker Urine creatinine.',
      citations: ['MS-REF-2949'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.49',
      lastReviewed: '2025-06-01',
    },
  }
];
