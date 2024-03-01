/**
 * MedSphere synthetic CDS rules — part 6 (development artifact).
 */
import type { CdsRule } from '../types';

export const cdsRulesPart6: CdsRule[] = [
  {
    id: 'CDS-000751',
    name: 'quality measure rule 751',
    category: 'quality-measure',
    action: 'order-set',
    priority: 51,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithroolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for azithroolol when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 18 and lab marker Albumin.',
      citations: ['MS-REF-1750'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.50',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000752',
    name: 'quality measure rule 752',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 52,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutsartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Neutrophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for albutsartan when Neutrophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 06 and lab marker Neutrophils.',
      citations: ['MS-REF-1751'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.51',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000753',
    name: 'dosing rule 753',
    category: 'dosing',
    action: 'suggestion',
    priority: 53,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for heparstatin when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 04 and lab marker Ferritin.',
      citations: ['MS-REF-1752'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.52',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000754',
    name: 'pregnancy rule 754',
    category: 'pregnancy',
    action: 'documentation-required',
    priority: 54,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for heparolol when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 17 and lab marker Bilirubin.',
      citations: ['MS-REF-1753'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.53',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000755',
    name: 'pregnancy rule 755',
    category: 'pregnancy',
    action: 'alert',
    priority: 55,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furoazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for furoazole when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 09 and lab marker Troponin I.',
      citations: ['MS-REF-1754'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.54',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000756',
    name: 'quality measure rule 756',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 56,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalosetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for escitalosetron when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 14 and lab marker GGT.',
      citations: ['MS-REF-1755'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.55',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000757',
    name: 'pregnancy rule 757',
    category: 'pregnancy',
    action: 'suggestion',
    priority: 57,
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
                      "value": "BNP"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for vancomsartan when BNP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 21 and lab marker BNP.',
      citations: ['MS-REF-1756'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.56',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000758',
    name: 'pregnancy rule 758',
    category: 'pregnancy',
    action: 'documentation-required',
    priority: 58,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "heparbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCHC"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for heparbarbital when MCHC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 17 and lab marker MCHC.',
      citations: ['MS-REF-1757'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.57',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000759',
    name: 'duplicate therapy rule 759',
    category: 'duplicate-therapy',
    action: 'hard-stop',
    priority: 59,
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironosartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for spironosartan when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 13 and lab marker Vitamin D.',
      citations: ['MS-REF-1758'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.58',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000760',
    name: 'renal dosing rule 760',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 60,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for albutphylline when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 05 and lab marker Hematocrit.',
      citations: ['MS-REF-1759'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.59',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000761',
    name: 'order set rule 761',
    category: 'order-set',
    action: 'alert',
    priority: 61,
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalopril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for escitalopril when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 01 and lab marker Fibrinogen.',
      citations: ['MS-REF-1760'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.60',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000762',
    name: 'lab critical rule 762',
    category: 'lab-critical',
    action: 'alert',
    priority: 62,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikadine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hemoglobin"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for amikadine when Hemoglobin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 11 and lab marker Hemoglobin.',
      citations: ['MS-REF-1761'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.61',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000763',
    name: 'preventive care rule 763',
    category: 'preventive-care',
    action: 'order-set',
    priority: 63,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothytidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for levothytidine when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 20 and lab marker CEA.',
      citations: ['MS-REF-1762'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.62',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000764',
    name: 'pregnancy rule 764',
    category: 'pregnancy',
    action: 'documentation-required',
    priority: 64,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omeprastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "HbA1c"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for omeprastatin when HbA1c is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 15 and lab marker HbA1c.',
      citations: ['MS-REF-1763'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.63',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000765',
    name: 'drug drug rule 765',
    category: 'drug-drug',
    action: 'alert',
    priority: 65,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "dexazepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for dexazepam when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 06 and lab marker PT.',
      citations: ['MS-REF-1764'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.64',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000766',
    name: 'pregnancy rule 766',
    category: 'pregnancy',
    action: 'hard-stop',
    priority: 66,
    enabled: false,
    evidenceLevel: 'D',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for amoxpril when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 21 and lab marker Chloride.',
      citations: ['MS-REF-1765'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.65',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000767',
    name: 'order set rule 767',
    category: 'order-set',
    action: 'order-set',
    priority: 67,
    enabled: true,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancommycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for vancommycin when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 08 and lab marker Fibrinogen.',
      citations: ['MS-REF-1766'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.66',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000768',
    name: 'diagnosis suggestion rule 768',
    category: 'diagnosis-suggestion',
    action: 'hard-stop',
    priority: 68,
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibupromycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for ibupromycin when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 01 and lab marker Troponin I.',
      citations: ['MS-REF-1767'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.67',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000769',
    name: 'contraindication rule 769',
    category: 'contraindication',
    action: 'order-set',
    priority: 69,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutsartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for albutsartan when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 02 and lab marker Phosphorus.',
      citations: ['MS-REF-1768'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.68',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000770',
    name: 'duplicate therapy rule 770',
    category: 'duplicate-therapy',
    action: 'documentation-required',
    priority: 70,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metropine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "HbA1c"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for metropine when HbA1c is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 05 and lab marker HbA1c.',
      citations: ['MS-REF-1769'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.69',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000771',
    name: 'lab critical rule 771',
    category: 'lab-critical',
    action: 'alert',
    priority: 71,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxappine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for enoxappine when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 07 and lab marker Troponin I.',
      citations: ['MS-REF-1770'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.70',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000772',
    name: 'preventive care rule 772',
    category: 'preventive-care',
    action: 'hard-stop',
    priority: 72,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprapine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for pantoprapine when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 01 and lab marker ALP.',
      citations: ['MS-REF-1771'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.71',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000773',
    name: 'drug disease rule 773',
    category: 'drug-disease',
    action: 'alert',
    priority: 73,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibuprocillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for ibuprocillin when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 14 and lab marker PSA.',
      citations: ['MS-REF-1772'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.72',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000774',
    name: 'renal dosing rule 774',
    category: 'renal-dosing',
    action: 'alert',
    priority: 74,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "WBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for morphprazole when WBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 18 and lab marker WBC.',
      citations: ['MS-REF-1773'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.73',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000775',
    name: 'quality measure rule 775',
    category: 'quality-measure',
    action: 'order-set',
    priority: 75,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednipam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for prednipam when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 17 and lab marker Glucose.',
      citations: ['MS-REF-1774'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.74',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000776',
    name: 'preventive care rule 776',
    category: 'preventive-care',
    action: 'hard-stop',
    priority: 76,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfarmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for warfarmycin when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 05 and lab marker Sodium.',
      citations: ['MS-REF-1775'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.75',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000777',
    name: 'duplicate therapy rule 777',
    category: 'duplicate-therapy',
    action: 'suggestion',
    priority: 77,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapencycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for gabapencycline when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 09 and lab marker Iron.',
      citations: ['MS-REF-1776'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.76',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000778',
    name: 'dosing rule 778',
    category: 'dosing',
    action: 'documentation-required',
    priority: 78,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfarzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for warfarzepam when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 14 and lab marker Iron.',
      citations: ['MS-REF-1777'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.77',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000779',
    name: 'drug disease rule 779',
    category: 'drug-disease',
    action: 'hard-stop',
    priority: 79,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentaazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for gentaazole when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 02 and lab marker Fibrinogen.',
      citations: ['MS-REF-1778'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.78',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000780',
    name: 'duplicate therapy rule 780',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 80,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cipropril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CO2"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for cipropril when CO2 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 02 and lab marker CO2.',
      citations: ['MS-REF-1779'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.79',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000781',
    name: 'drug disease rule 781',
    category: 'drug-disease',
    action: 'hard-stop',
    priority: 81,
    enabled: true,
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TIBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for oxycodcillin when TIBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 10 and lab marker TIBC.',
      citations: ['MS-REF-1780'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.80',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000782',
    name: 'quality measure rule 782',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 82,
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
                      "value": "tramabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "aPTT"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for tramabarbital when aPTT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 01 and lab marker aPTT.',
      citations: ['MS-REF-1781'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.81',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000783',
    name: 'order set rule 783',
    category: 'order-set',
    action: 'alert',
    priority: 83,
    enabled: false,
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
                      "value": "dexasetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AST"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for dexasetron when AST is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 04 and lab marker AST.',
      citations: ['MS-REF-1782'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.82',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000784',
    name: 'duplicate therapy rule 784',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 84,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticaolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "LDH"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for fluticaolol when LDH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 05 and lab marker LDH.',
      citations: ['MS-REF-1783'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.83',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000785',
    name: 'duplicate therapy rule 785',
    category: 'duplicate-therapy',
    action: 'documentation-required',
    priority: 85,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertrastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for sertrastatin when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 06 and lab marker Troponin I.',
      citations: ['MS-REF-1784'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.84',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000786',
    name: 'age based rule 786',
    category: 'age-based',
    action: 'alert',
    priority: 86,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "furopam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for furopam when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 11 and lab marker TSH.',
      citations: ['MS-REF-1785'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.85',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000787',
    name: 'dosing rule 787',
    category: 'dosing',
    action: 'order-set',
    priority: 87,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibuprodine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for ibuprodine when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 11 and lab marker Hematocrit.',
      citations: ['MS-REF-1786'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.86',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000788',
    name: 'contraindication rule 788',
    category: 'contraindication',
    action: 'hard-stop',
    priority: 88,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetaminsartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Microalbumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for acetaminsartan when Microalbumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 12 and lab marker Microalbumin.',
      citations: ['MS-REF-1787'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.87',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000789',
    name: 'duplicate therapy rule 789',
    category: 'duplicate-therapy',
    action: 'suggestion',
    priority: 89,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for insulinpril when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 04 and lab marker Hematocrit.',
      citations: ['MS-REF-1788'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.88',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000790',
    name: 'lab critical rule 790',
    category: 'lab-critical',
    action: 'alert',
    priority: 90,
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for oxycodcycline when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 19 and lab marker Bilirubin.',
      citations: ['MS-REF-1789'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.89',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000791',
    name: 'drug allergy rule 791',
    category: 'drug-allergy',
    action: 'order-set',
    priority: 91,
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancombarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "LDH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for vancombarbital when LDH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 03 and lab marker LDH.',
      citations: ['MS-REF-1790'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.90',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000792',
    name: 'diagnosis suggestion rule 792',
    category: 'diagnosis-suggestion',
    action: 'suggestion',
    priority: 92,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "amoxsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for amoxsetron when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 19 and lab marker TSH.',
      citations: ['MS-REF-1791'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.91',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000793',
    name: 'pregnancy rule 793',
    category: 'pregnancy',
    action: 'hard-stop',
    priority: 93,
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
                      "value": "amlodzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "LDH"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for amlodzepam when LDH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 16 and lab marker LDH.',
      citations: ['MS-REF-1792'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.92',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000794',
    name: 'quality measure rule 794',
    category: 'quality-measure',
    action: 'alert',
    priority: 94,
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindaazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for clindaazole when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 21 and lab marker pH.',
      citations: ['MS-REF-1793'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.93',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000795',
    name: 'diagnosis suggestion rule 795',
    category: 'diagnosis-suggestion',
    action: 'alert',
    priority: 95,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabaazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "WBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for pregabaazole when WBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 04 and lab marker WBC.',
      citations: ['MS-REF-1794'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.94',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000796',
    name: 'drug disease rule 796',
    category: 'drug-disease',
    action: 'hard-stop',
    priority: 96,
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Total protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for salbutphylline when Total protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 17 and lab marker Total protein.',
      citations: ['MS-REF-1795'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.95',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000797',
    name: 'drug drug rule 797',
    category: 'drug-drug',
    action: 'order-set',
    priority: 97,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metropine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for metropine when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 02 and lab marker Monocytes.',
      citations: ['MS-REF-1796'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.96',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000798',
    name: 'diagnosis suggestion rule 798',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 98,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Platelet count"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for heparazole when Platelet count is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 15 and lab marker Platelet count.',
      citations: ['MS-REF-1797'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.97',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000799',
    name: 'age based rule 799',
    category: 'age-based',
    action: 'suggestion',
    priority: 99,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentaprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for gentaprazole when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 14 and lab marker Ferritin.',
      citations: ['MS-REF-1798'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.98',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000800',
    name: 'diagnosis suggestion rule 800',
    category: 'diagnosis-suggestion',
    action: 'documentation-required',
    priority: 100,
    enabled: false,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for albutzepam when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 16 and lab marker Phosphorus.',
      citations: ['MS-REF-1799'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.99',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000801',
    name: 'pregnancy rule 801',
    category: 'pregnancy',
    action: 'documentation-required',
    priority: 1,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furopam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for furopam when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 05 and lab marker Magnesium.',
      citations: ['MS-REF-1800'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.0',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000802',
    name: 'dosing rule 802',
    category: 'dosing',
    action: 'documentation-required',
    priority: 2,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothymycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for levothymycin when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 20 and lab marker Chloride.',
      citations: ['MS-REF-1801'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.1',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000803',
    name: 'preventive care rule 803',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutsartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for salbutsartan when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 17 and lab marker PSA.',
      citations: ['MS-REF-1802'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.2',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000804',
    name: 'order set rule 804',
    category: 'order-set',
    action: 'documentation-required',
    priority: 4,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for atorvastatin when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 16 and lab marker ALP.',
      citations: ['MS-REF-1803'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.3',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000805',
    name: 'drug disease rule 805',
    category: 'drug-disease',
    action: 'order-set',
    priority: 5,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for albutcillin when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 11 and lab marker Basophils.',
      citations: ['MS-REF-1804'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.4',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000806',
    name: 'diagnosis suggestion rule 806',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 6,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochlorocillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for hydrochlorocillin when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 06 and lab marker MCH.',
      citations: ['MS-REF-1805'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.5',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000807',
    name: 'order set rule 807',
    category: 'order-set',
    action: 'documentation-required',
    priority: 7,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "dexaphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for dexaphylline when Urine creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 01 and lab marker Urine creatinine.',
      citations: ['MS-REF-1806'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.6',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000808',
    name: 'drug drug rule 808',
    category: 'drug-drug',
    action: 'suggestion',
    priority: 8,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfarsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for warfarsetron when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 19 and lab marker ALP.',
      citations: ['MS-REF-1807'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.7',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000809',
    name: 'diagnosis suggestion rule 809',
    category: 'diagnosis-suggestion',
    action: 'alert',
    priority: 9,
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
                      "value": "ciprozepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for ciprozepam when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 16 and lab marker INR.',
      citations: ['MS-REF-1808'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.8',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000810',
    name: 'renal dosing rule 810',
    category: 'renal-dosing',
    action: 'suggestion',
    priority: 10,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for naproxpine when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 20 and lab marker Basophils.',
      citations: ['MS-REF-1809'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.9',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000811',
    name: 'drug disease rule 811',
    category: 'drug-disease',
    action: 'order-set',
    priority: 11,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "insulinpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "LDH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for insulinpril when LDH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 12 and lab marker LDH.',
      citations: ['MS-REF-1810'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.10',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000812',
    name: 'age based rule 812',
    category: 'age-based',
    action: 'hard-stop',
    priority: 12,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednibarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for prednibarbital when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 02 and lab marker Urine protein.',
      citations: ['MS-REF-1811'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.11',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000813',
    name: 'order set rule 813',
    category: 'order-set',
    action: 'alert',
    priority: 13,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for insulinprazole when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 18 and lab marker pH.',
      citations: ['MS-REF-1812'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.12',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000814',
    name: 'diagnosis suggestion rule 814',
    category: 'diagnosis-suggestion',
    action: 'alert',
    priority: 14,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "albutprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for albutprazole when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 19 and lab marker ESR.',
      citations: ['MS-REF-1813'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.13',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000815',
    name: 'drug disease rule 815',
    category: 'drug-disease',
    action: 'alert',
    priority: 15,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabaprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for pregabaprazole when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 09 and lab marker ESR.',
      citations: ['MS-REF-1814'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.14',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000816',
    name: 'lab critical rule 816',
    category: 'lab-critical',
    action: 'documentation-required',
    priority: 16,
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalomycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "C-peptide"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for escitalomycin when C-peptide is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 17 and lab marker C-peptide.',
      citations: ['MS-REF-1815'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.15',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000817',
    name: 'dosing rule 817',
    category: 'dosing',
    action: 'documentation-required',
    priority: 17,
    enabled: false,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for morphcycline when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 02 and lab marker RDW.',
      citations: ['MS-REF-1816'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.16',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000818',
    name: 'lab critical rule 818',
    category: 'lab-critical',
    action: 'alert',
    priority: 18,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikazepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for amikazepam when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 20 and lab marker pH.',
      citations: ['MS-REF-1817'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.17',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000819',
    name: 'quality measure rule 819',
    category: 'quality-measure',
    action: 'suggestion',
    priority: 19,
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Calcium"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for insulinazole when Calcium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 01 and lab marker Calcium.',
      citations: ['MS-REF-1818'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.18',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000820',
    name: 'age based rule 820',
    category: 'age-based',
    action: 'alert',
    priority: 20,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednimycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for prednimycin when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 14 and lab marker Sodium.',
      citations: ['MS-REF-1819'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.19',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000821',
    name: 'drug disease rule 821',
    category: 'drug-disease',
    action: 'alert',
    priority: 21,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxpam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for naproxpam when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 18 and lab marker GGT.',
      citations: ['MS-REF-1820'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.20',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000822',
    name: 'dosing rule 822',
    category: 'dosing',
    action: 'alert',
    priority: 22,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithrotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CO2"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for azithrotidine when CO2 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 16 and lab marker CO2.',
      citations: ['MS-REF-1821'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.21',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000823',
    name: 'renal dosing rule 823',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 23,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodsartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for hydrocodsartan when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 07 and lab marker Transferrin.',
      citations: ['MS-REF-1822'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.22',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000824',
    name: 'drug allergy rule 824',
    category: 'drug-allergy',
    action: 'suggestion',
    priority: 24,
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omeprapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for omeprapam when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 03 and lab marker Vitamin B12.',
      citations: ['MS-REF-1823'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.23',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000825',
    name: 'drug allergy rule 825',
    category: 'drug-allergy',
    action: 'suggestion',
    priority: 25,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CRP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for heparphylline when CRP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 02 and lab marker CRP.',
      citations: ['MS-REF-1824'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.24',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000826',
    name: 'drug allergy rule 826',
    category: 'drug-allergy',
    action: 'alert',
    priority: 26,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AFP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for pantoprabarbital when AFP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 04 and lab marker AFP.',
      citations: ['MS-REF-1825'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.25',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000827',
    name: 'contraindication rule 827',
    category: 'contraindication',
    action: 'documentation-required',
    priority: 27,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCV"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for insulinmycin when MCV is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 02 and lab marker MCV.',
      citations: ['MS-REF-1826'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.26',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000828',
    name: 'contraindication rule 828',
    category: 'contraindication',
    action: 'order-set',
    priority: 28,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for albutphylline when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 09 and lab marker TSH.',
      citations: ['MS-REF-1827'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.27',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000829',
    name: 'pregnancy rule 829',
    category: 'pregnancy',
    action: 'documentation-required',
    priority: 29,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochloroprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "HbA1c"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for hydrochloroprazole when HbA1c is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 15 and lab marker HbA1c.',
      citations: ['MS-REF-1828'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.28',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000830',
    name: 'order set rule 830',
    category: 'order-set',
    action: 'suggestion',
    priority: 30,
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxapsartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for enoxapsartan when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 01 and lab marker PT.',
      citations: ['MS-REF-1829'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.29',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000831',
    name: 'drug disease rule 831',
    category: 'drug-disease',
    action: 'suggestion',
    priority: 31,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapenbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for gabapenbarbital when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 07 and lab marker Insulin.',
      citations: ['MS-REF-1830'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.30',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000832',
    name: 'quality measure rule 832',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 32,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furomycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for furomycin when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 20 and lab marker Sodium.',
      citations: ['MS-REF-1831'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.31',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000833',
    name: 'drug drug rule 833',
    category: 'drug-drug',
    action: 'order-set',
    priority: 33,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omeprabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T3"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for omeprabarbital when Free T3 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 15 and lab marker Free T3.',
      citations: ['MS-REF-1832'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.32',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000834',
    name: 'pregnancy rule 834',
    category: 'pregnancy',
    action: 'alert',
    priority: 34,
    enabled: false,
    evidenceLevel: 'A',
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for heparbarbital when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 09 and lab marker Glucose.',
      citations: ['MS-REF-1833'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.33',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000835',
    name: 'order set rule 835',
    category: 'order-set',
    action: 'hard-stop',
    priority: 35,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hepartidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for hepartidine when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 09 and lab marker Magnesium.',
      citations: ['MS-REF-1834'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.34',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000836',
    name: 'drug drug rule 836',
    category: 'drug-drug',
    action: 'suggestion',
    priority: 36,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for morphpril when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 06 and lab marker Magnesium.',
      citations: ['MS-REF-1835'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.35',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000837',
    name: 'drug allergy rule 837',
    category: 'drug-allergy',
    action: 'alert',
    priority: 37,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprasartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for pantoprasartan when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 12 and lab marker Urine protein.',
      citations: ['MS-REF-1836'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.36',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000838',
    name: 'diagnosis suggestion rule 838',
    category: 'diagnosis-suggestion',
    action: 'alert',
    priority: 38,
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
                      "value": "naproxphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Potassium"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for naproxphylline when Potassium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 08 and lab marker Potassium.',
      citations: ['MS-REF-1837'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.37',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000839',
    name: 'diagnosis suggestion rule 839',
    category: 'diagnosis-suggestion',
    action: 'suggestion',
    priority: 39,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikacycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for amikacycline when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 08 and lab marker Iron.',
      citations: ['MS-REF-1838'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.38',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000840',
    name: 'contraindication rule 840',
    category: 'contraindication',
    action: 'alert',
    priority: 40,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothystatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for levothystatin when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 02 and lab marker RDW.',
      citations: ['MS-REF-1839'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.39',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000841',
    name: 'diagnosis suggestion rule 841',
    category: 'diagnosis-suggestion',
    action: 'suggestion',
    priority: 41,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibuprophylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Platelet count"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for ibuprophylline when Platelet count is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 14 and lab marker Platelet count.',
      citations: ['MS-REF-1840'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.40',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000842',
    name: 'preventive care rule 842',
    category: 'preventive-care',
    action: 'alert',
    priority: 42,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "vancomstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for vancomstatin when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 09 and lab marker Monocytes.',
      citations: ['MS-REF-1841'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.41',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000843',
    name: 'renal dosing rule 843',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 43,
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Folate"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for naproxmycin when Folate is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 17 and lab marker Folate.',
      citations: ['MS-REF-1842'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.42',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000844',
    name: 'renal dosing rule 844',
    category: 'renal-dosing',
    action: 'suggestion',
    priority: 44,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprasartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AST"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for pantoprasartan when AST is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 15 and lab marker AST.',
      citations: ['MS-REF-1843'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.43',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000845',
    name: 'drug allergy rule 845',
    category: 'drug-allergy',
    action: 'alert',
    priority: 45,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for metformmycin when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 16 and lab marker Chloride.',
      citations: ['MS-REF-1844'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.44',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000846',
    name: 'renal dosing rule 846',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 46,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "predniolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for predniolol when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 10 and lab marker Glucose.',
      citations: ['MS-REF-1845'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.45',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000847',
    name: 'preventive care rule 847',
    category: 'preventive-care',
    action: 'order-set',
    priority: 47,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednisetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for prednisetron when RBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 02 and lab marker RBC.',
      citations: ['MS-REF-1846'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.46',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000848',
    name: 'drug allergy rule 848',
    category: 'drug-allergy',
    action: 'hard-stop',
    priority: 48,
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
                      "value": "naproxphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for naproxphylline when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 04 and lab marker Specific gravity.',
      citations: ['MS-REF-1847'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.47',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000849',
    name: 'pregnancy rule 849',
    category: 'pregnancy',
    action: 'order-set',
    priority: 49,
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Neutrophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for ciprostatin when Neutrophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 10 and lab marker Neutrophils.',
      citations: ['MS-REF-1848'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.48',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000850',
    name: 'contraindication rule 850',
    category: 'contraindication',
    action: 'alert',
    priority: 50,
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironocycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T3"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for spironocycline when Free T3 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 17 and lab marker Free T3.',
      citations: ['MS-REF-1849'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.49',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000851',
    name: 'drug allergy rule 851',
    category: 'drug-allergy',
    action: 'order-set',
    priority: 51,
    enabled: false,
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "warfarpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCV"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for warfarpril when MCV is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 19 and lab marker MCV.',
      citations: ['MS-REF-1850'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.50',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000852',
    name: 'duplicate therapy rule 852',
    category: 'duplicate-therapy',
    action: 'documentation-required',
    priority: 52,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "dexacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BNP"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for dexacillin when BNP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 09 and lab marker BNP.',
      citations: ['MS-REF-1851'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.51',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000853',
    name: 'drug allergy rule 853',
    category: 'drug-allergy',
    action: 'suggestion',
    priority: 53,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinopril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CO2"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for lisinopril when CO2 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 06 and lab marker CO2.',
      citations: ['MS-REF-1852'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.52',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000854',
    name: 'preventive care rule 854',
    category: 'preventive-care',
    action: 'order-set',
    priority: 54,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinoolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "C-peptide"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for lisinoolol when C-peptide is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 02 and lab marker C-peptide.',
      citations: ['MS-REF-1853'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.53',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000855',
    name: 'quality measure rule 855',
    category: 'quality-measure',
    action: 'order-set',
    priority: 55,
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
                      "value": "hydrocodphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCHC"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for hydrocodphylline when MCHC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 14 and lab marker MCHC.',
      citations: ['MS-REF-1854'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.54',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000856',
    name: 'age based rule 856',
    category: 'age-based',
    action: 'documentation-required',
    priority: 56,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for atorvacillin when RBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 16 and lab marker RBC.',
      citations: ['MS-REF-1855'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.55',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000857',
    name: 'pregnancy rule 857',
    category: 'pregnancy',
    action: 'documentation-required',
    priority: 57,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprodine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for ciprodine when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 06 and lab marker pH.',
      citations: ['MS-REF-1856'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.56',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000858',
    name: 'age based rule 858',
    category: 'age-based',
    action: 'suggestion',
    priority: 58,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "hydrocodprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for hydrocodprazole when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 03 and lab marker Vitamin B12.',
      citations: ['MS-REF-1857'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.57',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000859',
    name: 'drug allergy rule 859',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephaazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "aPTT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for cephaazole when aPTT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 08 and lab marker aPTT.',
      citations: ['MS-REF-1858'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.58',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000860',
    name: 'drug disease rule 860',
    category: 'drug-disease',
    action: 'alert',
    priority: 60,
    enabled: true,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxysetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for doxysetron when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 09 and lab marker PSA.',
      citations: ['MS-REF-1859'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.59',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000861',
    name: 'duplicate therapy rule 861',
    category: 'duplicate-therapy',
    action: 'hard-stop',
    priority: 61,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxypril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for doxypril when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 07 and lab marker TSH.',
      citations: ['MS-REF-1860'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.60',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000862',
    name: 'duplicate therapy rule 862',
    category: 'duplicate-therapy',
    action: 'documentation-required',
    priority: 62,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "cephaphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for cephaphylline when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 09 and lab marker INR.',
      citations: ['MS-REF-1861'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.61',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000863',
    name: 'lab critical rule 863',
    category: 'lab-critical',
    action: 'suggestion',
    priority: 63,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikasetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for amikasetron when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 15 and lab marker ALP.',
      citations: ['MS-REF-1862'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.62',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000864',
    name: 'lab critical rule 864',
    category: 'lab-critical',
    action: 'hard-stop',
    priority: 64,
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertratidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for sertratidine when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 10 and lab marker Fibrinogen.',
      citations: ['MS-REF-1863'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.63',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000865',
    name: 'pregnancy rule 865',
    category: 'pregnancy',
    action: 'hard-stop',
    priority: 65,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for heparstatin when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 04 and lab marker Monocytes.',
      citations: ['MS-REF-1864'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.64',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000866',
    name: 'preventive care rule 866',
    category: 'preventive-care',
    action: 'documentation-required',
    priority: 66,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for pregabapam when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 11 and lab marker Urine protein.',
      citations: ['MS-REF-1865'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.65',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000867',
    name: 'age based rule 867',
    category: 'age-based',
    action: 'suggestion',
    priority: 67,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodtidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Microalbumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for hydrocodtidine when Microalbumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 18 and lab marker Microalbumin.',
      citations: ['MS-REF-1866'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.66',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000868',
    name: 'drug allergy rule 868',
    category: 'drug-allergy',
    action: 'documentation-required',
    priority: 68,
    enabled: false,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancomdine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for vancomdine when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 05 and lab marker Phosphorus.',
      citations: ['MS-REF-1867'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.67',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000869',
    name: 'age based rule 869',
    category: 'age-based',
    action: 'alert',
    priority: 69,
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
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for cephasetron when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 15 and lab marker Glucose.',
      citations: ['MS-REF-1868'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.68',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000870',
    name: 'drug allergy rule 870',
    category: 'drug-allergy',
    action: 'order-set',
    priority: 70,
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
                      "value": "MCV"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for morphpam when MCV is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 11 and lab marker MCV.',
      citations: ['MS-REF-1869'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.69',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000871',
    name: 'quality measure rule 871',
    category: 'quality-measure',
    action: 'alert',
    priority: 71,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "escitalobarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for escitalobarbital when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 02 and lab marker RDW.',
      citations: ['MS-REF-1870'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.70',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000872',
    name: 'contraindication rule 872',
    category: 'contraindication',
    action: 'documentation-required',
    priority: 72,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvatidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for atorvatidine when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 02 and lab marker Monocytes.',
      citations: ['MS-REF-1871'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.71',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000873',
    name: 'duplicate therapy rule 873',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 73,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "dexasetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for dexasetron when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 18 and lab marker Transferrin.',
      citations: ['MS-REF-1872'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.72',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000874',
    name: 'age based rule 874',
    category: 'age-based',
    action: 'order-set',
    priority: 74,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BNP"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for amlodphylline when BNP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 04 and lab marker BNP.',
      citations: ['MS-REF-1873'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.73',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000875',
    name: 'drug allergy rule 875',
    category: 'drug-allergy',
    action: 'suggestion',
    priority: 75,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "predniphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for predniphylline when ALT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 06 and lab marker ALT.',
      citations: ['MS-REF-1874'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.74',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000876',
    name: 'drug drug rule 876',
    category: 'drug-drug',
    action: 'alert',
    priority: 76,
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
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for amlodcycline when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 15 and lab marker CEA.',
      citations: ['MS-REF-1875'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.75',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000877',
    name: 'quality measure rule 877',
    category: 'quality-measure',
    action: 'alert',
    priority: 77,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "enoxappine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for enoxappine when RBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 15 and lab marker RBC.',
      citations: ['MS-REF-1876'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.76',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000878',
    name: 'order set rule 878',
    category: 'order-set',
    action: 'alert',
    priority: 78,
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentaprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for gentaprazole when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 10 and lab marker Sodium.',
      citations: ['MS-REF-1877'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.77',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000879',
    name: 'quality measure rule 879',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 79,
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
                      "value": "morphpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for morphpine when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 19 and lab marker Glucose.',
      citations: ['MS-REF-1878'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.78',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000880',
    name: 'preventive care rule 880',
    category: 'preventive-care',
    action: 'order-set',
    priority: 80,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikatidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for amikatidine when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 11 and lab marker Vitamin D.',
      citations: ['MS-REF-1879'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.79',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000881',
    name: 'dosing rule 881',
    category: 'dosing',
    action: 'documentation-required',
    priority: 81,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochlorocillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for hydrochlorocillin when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 04 and lab marker Magnesium.',
      citations: ['MS-REF-1880'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.80',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000882',
    name: 'drug allergy rule 882',
    category: 'drug-allergy',
    action: 'documentation-required',
    priority: 82,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "spironobarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for spironobarbital when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 16 and lab marker Hematocrit.',
      citations: ['MS-REF-1881'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.81',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000883',
    name: 'lab critical rule 883',
    category: 'lab-critical',
    action: 'order-set',
    priority: 83,
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for naproxcycline when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 03 and lab marker pH.',
      citations: ['MS-REF-1882'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.82',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000884',
    name: 'dosing rule 884',
    category: 'dosing',
    action: 'documentation-required',
    priority: 84,
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for salbutprazole when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 01 and lab marker Glucose.',
      citations: ['MS-REF-1883'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.83',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000885',
    name: 'renal dosing rule 885',
    category: 'renal-dosing',
    action: 'order-set',
    priority: 85,
    enabled: false,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Neutrophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for naproxphylline when Neutrophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 12 and lab marker Neutrophils.',
      citations: ['MS-REF-1884'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.84',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000886',
    name: 'drug allergy rule 886',
    category: 'drug-allergy',
    action: 'documentation-required',
    priority: 86,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for naproxzepam when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 09 and lab marker TSH.',
      citations: ['MS-REF-1885'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.85',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000887',
    name: 'order set rule 887',
    category: 'order-set',
    action: 'documentation-required',
    priority: 87,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "ciprostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for ciprostatin when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 12 and lab marker Chloride.',
      citations: ['MS-REF-1886'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.86',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000888',
    name: 'age based rule 888',
    category: 'age-based',
    action: 'hard-stop',
    priority: 88,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "dexatidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for dexatidine when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 02 and lab marker Urine protein.',
      citations: ['MS-REF-1887'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.87',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000889',
    name: 'lab critical rule 889',
    category: 'lab-critical',
    action: 'hard-stop',
    priority: 89,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentatidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for gentatidine when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 02 and lab marker Fibrinogen.',
      citations: ['MS-REF-1888'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.88',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000890',
    name: 'order set rule 890',
    category: 'order-set',
    action: 'alert',
    priority: 90,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformdine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "aPTT"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for metformdine when aPTT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 11 and lab marker aPTT.',
      citations: ['MS-REF-1889'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.89',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000891',
    name: 'contraindication rule 891',
    category: 'contraindication',
    action: 'order-set',
    priority: 91,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "naproxprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for naproxprazole when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 12 and lab marker Basophils.',
      citations: ['MS-REF-1890'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.90',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000892',
    name: 'drug allergy rule 892',
    category: 'drug-allergy',
    action: 'documentation-required',
    priority: 92,
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
                      "value": "prednipril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for prednipril when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 18 and lab marker pH.',
      citations: ['MS-REF-1891'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.91',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000893',
    name: 'dosing rule 893',
    category: 'dosing',
    action: 'documentation-required',
    priority: 93,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furomycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for furomycin when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 06 and lab marker Vitamin B12.',
      citations: ['MS-REF-1892'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.92',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000894',
    name: 'quality measure rule 894',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 94,
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
                      "value": "hepartidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for hepartidine when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 08 and lab marker Vitamin B12.',
      citations: ['MS-REF-1893'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.93',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000895',
    name: 'pregnancy rule 895',
    category: 'pregnancy',
    action: 'suggestion',
    priority: 95,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindacillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "GGT"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for clindacillin when GGT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 14 and lab marker GGT.',
      citations: ['MS-REF-1894'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.94',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000896',
    name: 'renal dosing rule 896',
    category: 'renal-dosing',
    action: 'documentation-required',
    priority: 96,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furopam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for furopam when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 06 and lab marker Troponin I.',
      citations: ['MS-REF-1895'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.95',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000897',
    name: 'renal dosing rule 897',
    category: 'renal-dosing',
    action: 'suggestion',
    priority: 97,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for hydrocodpine when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 02 and lab marker Glucose.',
      citations: ['MS-REF-1896'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.96',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000898',
    name: 'pregnancy rule 898',
    category: 'pregnancy',
    action: 'documentation-required',
    priority: 98,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalomycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for escitalomycin when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 04 and lab marker Magnesium.',
      citations: ['MS-REF-1897'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.97',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000899',
    name: 'drug allergy rule 899',
    category: 'drug-allergy',
    action: 'alert',
    priority: 99,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for atorvapam when RBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 20 and lab marker RBC.',
      citations: ['MS-REF-1898'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.98',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-000900',
    name: 'dosing rule 900',
    category: 'dosing',
    action: 'suggestion',
    priority: 100,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for albutmycin when Urine creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 20 and lab marker Urine creatinine.',
      citations: ['MS-REF-1899'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.99',
      lastReviewed: '2025-06-01',
    },
  }
];
