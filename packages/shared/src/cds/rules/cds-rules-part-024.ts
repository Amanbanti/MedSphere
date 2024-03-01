/**
 * MedSphere synthetic CDS rules — part 24 (development artifact).
 */
import type { CdsRule } from '../types';

export const cdsRulesPart24: CdsRule[] = [
  {
    id: 'CDS-003451',
    name: 'lab critical rule 3451',
    category: 'lab-critical',
    action: 'hard-stop',
    priority: 51,
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furoolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for furoolol when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 17 and lab marker ESR.',
      citations: ['MS-REF-4450'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.50',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003452',
    name: 'quality measure rule 3452',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 52,
    enabled: false,
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AFP"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for amikapam when AFP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 21 and lab marker AFP.',
      citations: ['MS-REF-4451'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.51',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003453',
    name: 'preventive care rule 3453',
    category: 'preventive-care',
    action: 'suggestion',
    priority: 53,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapencycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for gabapencycline when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 18 and lab marker Chloride.',
      citations: ['MS-REF-4452'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.52',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003454',
    name: 'preventive care rule 3454',
    category: 'preventive-care',
    action: 'order-set',
    priority: 54,
    enabled: true,
    evidenceLevel: 'A',
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
                      "value": "warfarstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for warfarstatin when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 09 and lab marker Ferritin.',
      citations: ['MS-REF-4453'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.53',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003455',
    name: 'pregnancy rule 3455',
    category: 'pregnancy',
    action: 'alert',
    priority: 55,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "prednistatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for prednistatin when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 09 and lab marker TSH.',
      citations: ['MS-REF-4454'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.54',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003456',
    name: 'renal dosing rule 3456',
    category: 'renal-dosing',
    action: 'suggestion',
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
                      "value": "metformmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hemoglobin"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for metformmycin when Hemoglobin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 14 and lab marker Hemoglobin.',
      citations: ['MS-REF-4455'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.55',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003457',
    name: 'dosing rule 3457',
    category: 'dosing',
    action: 'alert',
    priority: 57,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithrobarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for azithrobarbital when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 11 and lab marker Transferrin.',
      citations: ['MS-REF-4456'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.56',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003458',
    name: 'drug drug rule 3458',
    category: 'drug-drug',
    action: 'suggestion',
    priority: 58,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for albutpril when Creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 15 and lab marker Creatinine.',
      citations: ['MS-REF-4457'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.57',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003459',
    name: 'dosing rule 3459',
    category: 'dosing',
    action: 'hard-stop',
    priority: 59,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morpholol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Total protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for morpholol when Total protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 20 and lab marker Total protein.',
      citations: ['MS-REF-4458'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.58',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003460',
    name: 'order set rule 3460',
    category: 'order-set',
    action: 'documentation-required',
    priority: 60,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BUN"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for oxycodpril when BUN is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 09 and lab marker BUN.',
      citations: ['MS-REF-4459'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.59',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003461',
    name: 'diagnosis suggestion rule 3461',
    category: 'diagnosis-suggestion',
    action: 'suggestion',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibupromycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "LDH"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for ibupromycin when LDH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 21 and lab marker LDH.',
      citations: ['MS-REF-4460'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.60',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003462',
    name: 'preventive care rule 3462',
    category: 'preventive-care',
    action: 'alert',
    priority: 62,
    enabled: true,
    evidenceLevel: 'C',
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodtidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for oxycodtidine when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 03 and lab marker Fibrinogen.',
      citations: ['MS-REF-4461'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.61',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003463',
    name: 'pregnancy rule 3463',
    category: 'pregnancy',
    action: 'hard-stop',
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metrostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "D-dimer"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for metrostatin when D-dimer is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 19 and lab marker D-dimer.',
      citations: ['MS-REF-4462'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.62',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003464',
    name: 'quality measure rule 3464',
    category: 'quality-measure',
    action: 'hard-stop',
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for gentabarbital when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 16 and lab marker Fibrinogen.',
      citations: ['MS-REF-4463'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.63',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003465',
    name: 'drug drug rule 3465',
    category: 'drug-drug',
    action: 'hard-stop',
    priority: 65,
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetaminsartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for acetaminsartan when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 13 and lab marker Specific gravity.',
      citations: ['MS-REF-4464'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.64',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003466',
    name: 'pregnancy rule 3466',
    category: 'pregnancy',
    action: 'suggestion',
    priority: 66,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprasartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "HbA1c"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for pantoprasartan when HbA1c is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 08 and lab marker HbA1c.',
      citations: ['MS-REF-4465'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.65',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003467',
    name: 'lab critical rule 3467',
    category: 'lab-critical',
    action: 'hard-stop',
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cipromycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for cipromycin when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 05 and lab marker MCH.',
      citations: ['MS-REF-4466'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.66',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003468',
    name: 'drug disease rule 3468',
    category: 'drug-disease',
    action: 'documentation-required',
    priority: 68,
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
                      "value": "morphbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "LDH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for morphbarbital when LDH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 11 and lab marker LDH.',
      citations: ['MS-REF-4467'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.67',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003469',
    name: 'drug drug rule 3469',
    category: 'drug-drug',
    action: 'alert',
    priority: 69,
    enabled: false,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for pregabapam when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 06 and lab marker Free T4.',
      citations: ['MS-REF-4468'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.68',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003470',
    name: 'drug allergy rule 3470',
    category: 'drug-allergy',
    action: 'documentation-required',
    priority: 70,
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "heparolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Total protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for heparolol when Total protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 13 and lab marker Total protein.',
      citations: ['MS-REF-4469'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.69',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003471',
    name: 'age based rule 3471',
    category: 'age-based',
    action: 'suggestion',
    priority: 71,
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for albutazole when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 19 and lab marker Vitamin D.',
      citations: ['MS-REF-4470'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.70',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003472',
    name: 'lab critical rule 3472',
    category: 'lab-critical',
    action: 'suggestion',
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabadine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AFP"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for pregabadine when AFP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 14 and lab marker AFP.',
      citations: ['MS-REF-4471'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.71',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003473',
    name: 'drug allergy rule 3473',
    category: 'drug-allergy',
    action: 'alert',
    priority: 73,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetamindine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Total protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for acetamindine when Total protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 14 and lab marker Total protein.',
      citations: ['MS-REF-4472'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.72',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003474',
    name: 'diagnosis suggestion rule 3474',
    category: 'diagnosis-suggestion',
    action: 'documentation-required',
    priority: 74,
    enabled: true,
    evidenceLevel: 'expert-consensus',
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvaolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Chloride"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for atorvaolol when Chloride is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 16 and lab marker Chloride.',
      citations: ['MS-REF-4473'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.73',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003475',
    name: 'dosing rule 3475',
    category: 'dosing',
    action: 'order-set',
    priority: 75,
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "prednitidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for prednitidine when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 21 and lab marker pH.',
      citations: ['MS-REF-4474'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.74',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003476',
    name: 'duplicate therapy rule 3476',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 76,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetaminsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for acetaminsetron when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 16 and lab marker Fibrinogen.',
      citations: ['MS-REF-4475'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.75',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003477',
    name: 'diagnosis suggestion rule 3477',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 77,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxystatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for doxystatin when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 20 and lab marker Magnesium.',
      citations: ['MS-REF-4476'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.76',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003478',
    name: 'preventive care rule 3478',
    category: 'preventive-care',
    action: 'hard-stop',
    priority: 78,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "pH"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for amlodphylline when pH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 18 and lab marker pH.',
      citations: ['MS-REF-4477'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.77',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003479',
    name: 'quality measure rule 3479',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 79,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochloropam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TIBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for hydrochloropam when TIBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 11 and lab marker TIBC.',
      citations: ['MS-REF-4478'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.78',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003480',
    name: 'age based rule 3480',
    category: 'age-based',
    action: 'documentation-required',
    priority: 80,
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprasetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for pantoprasetron when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 13 and lab marker RDW.',
      citations: ['MS-REF-4479'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.79',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003481',
    name: 'lab critical rule 3481',
    category: 'lab-critical',
    action: 'alert',
    priority: 81,
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxesetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Potassium"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for fluoxesetron when Potassium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 17 and lab marker Potassium.',
      citations: ['MS-REF-4480'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.80',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003482',
    name: 'contraindication rule 3482',
    category: 'contraindication',
    action: 'suggestion',
    priority: 82,
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
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for metrostatin when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 13 and lab marker Vitamin B12.',
      citations: ['MS-REF-4481'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.81',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003483',
    name: 'contraindication rule 3483',
    category: 'contraindication',
    action: 'order-set',
    priority: 83,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetaminpam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BUN"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for acetaminpam when BUN is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 15 and lab marker BUN.',
      citations: ['MS-REF-4482'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.82',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003484',
    name: 'drug allergy rule 3484',
    category: 'drug-allergy',
    action: 'alert',
    priority: 84,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxapmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BNP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for enoxapmycin when BNP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 12 and lab marker BNP.',
      citations: ['MS-REF-4483'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.83',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003485',
    name: 'lab critical rule 3485',
    category: 'lab-critical',
    action: 'order-set',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxypam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for doxypam when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 21 and lab marker Sodium.',
      citations: ['MS-REF-4484'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.84',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003486',
    name: 'quality measure rule 3486',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 86,
    enabled: false,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertraolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for sertraolol when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 18 and lab marker Glucose.',
      citations: ['MS-REF-4485'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.85',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003487',
    name: 'renal dosing rule 3487',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 87,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hemoglobin"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for oxycodpine when Hemoglobin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 04 and lab marker Hemoglobin.',
      citations: ['MS-REF-4486'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.86',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003488',
    name: 'drug drug rule 3488',
    category: 'drug-drug',
    action: 'suggestion',
    priority: 88,
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinomycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "aPTT"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for lisinomycin when aPTT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 19 and lab marker aPTT.',
      citations: ['MS-REF-4487'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.87',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003489',
    name: 'quality measure rule 3489',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 89,
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopraprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for pantopraprazole when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 21 and lab marker CEA.',
      citations: ['MS-REF-4488'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.88',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003490',
    name: 'duplicate therapy rule 3490',
    category: 'duplicate-therapy',
    action: 'order-set',
    priority: 90,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Calcium"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for fluoxepam when Calcium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 04 and lab marker Calcium.',
      citations: ['MS-REF-4489'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.89',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003491',
    name: 'lab critical rule 3491',
    category: 'lab-critical',
    action: 'hard-stop',
    priority: 91,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "lisinodine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for lisinodine when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 06 and lab marker Bilirubin.',
      citations: ['MS-REF-4490'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.90',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003492',
    name: 'drug allergy rule 3492',
    category: 'drug-allergy',
    action: 'order-set',
    priority: 92,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulincycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for insulincycline when Urine creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 14 and lab marker Urine creatinine.',
      citations: ['MS-REF-4491'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.91',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003493',
    name: 'preventive care rule 3493',
    category: 'preventive-care',
    action: 'alert',
    priority: 93,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for metformcycline when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 04 and lab marker Eosinophils.',
      citations: ['MS-REF-4492'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.92',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003494',
    name: 'drug disease rule 3494',
    category: 'drug-disease',
    action: 'documentation-required',
    priority: 94,
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
                      "value": "morphmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for morphmycin when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 12 and lab marker Vitamin D.',
      citations: ['MS-REF-4493'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.93',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003495',
    name: 'drug disease rule 3495',
    category: 'drug-disease',
    action: 'order-set',
    priority: 95,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gabapenpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for gabapenpine when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 11 and lab marker Specific gravity.',
      citations: ['MS-REF-4494'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.94',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003496',
    name: 'contraindication rule 3496',
    category: 'contraindication',
    action: 'hard-stop',
    priority: 96,
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothypam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for levothypam when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 17 and lab marker Hematocrit.',
      citations: ['MS-REF-4495'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.95',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003497',
    name: 'pregnancy rule 3497',
    category: 'pregnancy',
    action: 'order-set',
    priority: 97,
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amlodpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AST"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for amlodpril when AST is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 21 and lab marker AST.',
      citations: ['MS-REF-4496'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.96',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003498',
    name: 'quality measure rule 3498',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 98,
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
                      "value": "S"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxymycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for doxymycin when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 19 and lab marker PT.',
      citations: ['MS-REF-4497'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.97',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003499',
    name: 'lab critical rule 3499',
    category: 'lab-critical',
    action: 'order-set',
    priority: 99,
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
                      "value": "gabapenmycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for gabapenmycin when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 18 and lab marker PT.',
      citations: ['MS-REF-4498'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.98',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003500',
    name: 'preventive care rule 3500',
    category: 'preventive-care',
    action: 'suggestion',
    priority: 100,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprocycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Ferritin"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for ciprocycline when Ferritin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 14 and lab marker Ferritin.',
      citations: ['MS-REF-4499'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.99',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003501',
    name: 'diagnosis suggestion rule 3501',
    category: 'diagnosis-suggestion',
    action: 'documentation-required',
    priority: 1,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochlorotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for hydrochlorotidine when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 07 and lab marker CEA.',
      citations: ['MS-REF-4500'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.0',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003502',
    name: 'drug drug rule 3502',
    category: 'drug-drug',
    action: 'alert',
    priority: 2,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "oxycodolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BNP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for oxycodolol when BNP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 11 and lab marker BNP.',
      citations: ['MS-REF-4501'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.1',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003503',
    name: 'contraindication rule 3503',
    category: 'contraindication',
    action: 'suggestion',
    priority: 3,
    enabled: false,
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
                      "value": "omeprasetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AST"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for omeprasetron when AST is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 09 and lab marker AST.',
      citations: ['MS-REF-4502'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.2',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003504',
    name: 'age based rule 3504',
    category: 'age-based',
    action: 'alert',
    priority: 4,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pregabaphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for pregabaphylline when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 12 and lab marker Bilirubin.',
      citations: ['MS-REF-4503'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.3',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003505',
    name: 'age based rule 3505',
    category: 'age-based',
    action: 'hard-stop',
    priority: 5,
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertraprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for sertraprazole when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 17 and lab marker INR.',
      citations: ['MS-REF-4504'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.4',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003506',
    name: 'renal dosing rule 3506',
    category: 'renal-dosing',
    action: 'suggestion',
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalozepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for escitalozepam when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 12 and lab marker CEA.',
      citations: ['MS-REF-4505'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.5',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003507',
    name: 'quality measure rule 3507',
    category: 'quality-measure',
    action: 'suggestion',
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancomprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for vancomprazole when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 13 and lab marker RDW.',
      citations: ['MS-REF-4506'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.6',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003508',
    name: 'pregnancy rule 3508',
    category: 'pregnancy',
    action: 'alert',
    priority: 8,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramapril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Insulin"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for tramapril when Insulin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 04 and lab marker Insulin.',
      citations: ['MS-REF-4507'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.7',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003509',
    name: 'diagnosis suggestion rule 3509',
    category: 'diagnosis-suggestion',
    action: 'suggestion',
    priority: 9,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cipropril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for cipropril when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 07 and lab marker Basophils.',
      citations: ['MS-REF-4508'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.8',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003510',
    name: 'drug allergy rule 3510',
    category: 'drug-allergy',
    action: 'hard-stop',
    priority: 10,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for hydrocodstatin when Urine creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 06 and lab marker Urine creatinine.',
      citations: ['MS-REF-4509'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.9',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003511',
    name: 'pregnancy rule 3511',
    category: 'pregnancy',
    action: 'hard-stop',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "albutsartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for albutsartan when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 21 and lab marker Basophils.',
      citations: ['MS-REF-4510'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.10',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003512',
    name: 'preventive care rule 3512',
    category: 'preventive-care',
    action: 'documentation-required',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxepril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for fluoxepril when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 21 and lab marker Fibrinogen.',
      citations: ['MS-REF-4511'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.11',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003513',
    name: 'dosing rule 3513',
    category: 'dosing',
    action: 'hard-stop',
    priority: 13,
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
                      "value": "predniazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Microalbumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for predniazole when Microalbumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 15 and lab marker Microalbumin.',
      citations: ['MS-REF-4512'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.12',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003514',
    name: 'drug drug rule 3514',
    category: 'drug-drug',
    action: 'hard-stop',
    priority: 14,
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
                      "value": "hydrochloroolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for hydrochloroolol when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 19 and lab marker ESR.',
      citations: ['MS-REF-4513'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.13',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003515',
    name: 'order set rule 3515',
    category: 'order-set',
    action: 'order-set',
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
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for cephaphylline when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 08 and lab marker PT.',
      citations: ['MS-REF-4514'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.14',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003516',
    name: 'order set rule 3516',
    category: 'order-set',
    action: 'suggestion',
    priority: 16,
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticacycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Transferrin"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for fluticacycline when Transferrin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 21 and lab marker Transferrin.',
      citations: ['MS-REF-4515'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.15',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003517',
    name: 'lab critical rule 3517',
    category: 'lab-critical',
    action: 'order-set',
    priority: 17,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochloropam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for hydrochloropam when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 11 and lab marker ALP.',
      citations: ['MS-REF-4516'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.16',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003518',
    name: 'order set rule 3518',
    category: 'order-set',
    action: 'documentation-required',
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxapzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for enoxapzepam when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 18 and lab marker PSA.',
      citations: ['MS-REF-4517'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.17',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003519',
    name: 'order set rule 3519',
    category: 'order-set',
    action: 'hard-stop',
    priority: 19,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxpam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CEA"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for amoxpam when CEA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 14 and lab marker CEA.',
      citations: ['MS-REF-4518'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.18',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003520',
    name: 'drug allergy rule 3520',
    category: 'drug-allergy',
    action: 'hard-stop',
    priority: 20,
    enabled: false,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCHC"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for naproxphylline when MCHC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 16 and lab marker MCHC.',
      citations: ['MS-REF-4519'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.19',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003521',
    name: 'quality measure rule 3521',
    category: 'quality-measure',
    action: 'order-set',
    priority: 21,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrochloropine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Free T4"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for hydrochloropine when Free T4 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 12 and lab marker Free T4.',
      citations: ['MS-REF-4520'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.20',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003522',
    name: 'contraindication rule 3522',
    category: 'contraindication',
    action: 'hard-stop',
    priority: 22,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for naproxazole when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 16 and lab marker Monocytes.',
      citations: ['MS-REF-4521'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.21',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003523',
    name: 'preventive care rule 3523',
    category: 'preventive-care',
    action: 'hard-stop',
    priority: 23,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopramycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PSA"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for pantopramycin when PSA is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 15 and lab marker PSA.',
      citations: ['MS-REF-4522'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.22',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003524',
    name: 'age based rule 3524',
    category: 'age-based',
    action: 'order-set',
    priority: 24,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancombarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Bilirubin"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for vancombarbital when Bilirubin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 15 and lab marker Bilirubin.',
      citations: ['MS-REF-4523'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.23',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003525',
    name: 'age based rule 3525',
    category: 'age-based',
    action: 'hard-stop',
    priority: 25,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancombarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review age-based for vancombarbital when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate age-based context with ICD chapter 18 and lab marker Phosphorus.',
      citations: ['MS-REF-4524'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.24',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003526',
    name: 'diagnosis suggestion rule 3526',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 26,
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
                      "value": "aPTT"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for spironophylline when aPTT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 13 and lab marker aPTT.',
      citations: ['MS-REF-4525'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.25',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003527',
    name: 'preventive care rule 3527',
    category: 'preventive-care',
    action: 'alert',
    priority: 27,
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
                      "value": "G"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxapzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Neutrophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for enoxapzepam when Neutrophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 06 and lab marker Neutrophils.',
      citations: ['MS-REF-4526'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.26',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003528',
    name: 'drug allergy rule 3528',
    category: 'drug-allergy',
    action: 'suggestion',
    priority: 28,
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
                      "value": "pantoprasartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for pantoprasartan when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 19 and lab marker Glucose.',
      citations: ['MS-REF-4527'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.27',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003529',
    name: 'diagnosis suggestion rule 3529',
    category: 'diagnosis-suggestion',
    action: 'hard-stop',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "clindabarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for clindabarbital when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 04 and lab marker Eosinophils.',
      citations: ['MS-REF-4528'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.28',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003530',
    name: 'drug disease rule 3530',
    category: 'drug-disease',
    action: 'documentation-required',
    priority: 30,
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
                      "value": "R"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "sertracillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for sertracillin when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 18 and lab marker INR.',
      citations: ['MS-REF-4529'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.29',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003531',
    name: 'dosing rule 3531',
    category: 'dosing',
    action: 'alert',
    priority: 31,
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Phosphorus"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for morphzepam when Phosphorus is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 13 and lab marker Phosphorus.',
      citations: ['MS-REF-4530'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.30',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003532',
    name: 'dosing rule 3532',
    category: 'dosing',
    action: 'order-set',
    priority: 32,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentamycin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "WBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for gentamycin when WBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 12 and lab marker WBC.',
      citations: ['MS-REF-4531'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.31',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003533',
    name: 'lab critical rule 3533',
    category: 'lab-critical',
    action: 'hard-stop',
    priority: 33,
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
                      "value": "dexaolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for dexaolol when Urine creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 08 and lab marker Urine creatinine.',
      citations: ['MS-REF-4532'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.32',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003534',
    name: 'order set rule 3534',
    category: 'order-set',
    action: 'hard-stop',
    priority: 34,
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
                      "value": "amoxpril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BNP"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for amoxpril when BNP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 12 and lab marker BNP.',
      citations: ['MS-REF-4533'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.33',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003535',
    name: 'dosing rule 3535',
    category: 'dosing',
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "WBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for furotidine when WBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 07 and lab marker WBC.',
      citations: ['MS-REF-4534'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.34',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003536',
    name: 'order set rule 3536',
    category: 'order-set',
    action: 'alert',
    priority: 36,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikaprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for amikaprazole when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 14 and lab marker Urine protein.',
      citations: ['MS-REF-4535'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.35',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003537',
    name: 'preventive care rule 3537',
    category: 'preventive-care',
    action: 'suggestion',
    priority: 37,
    enabled: false,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithrobarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for azithrobarbital when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 15 and lab marker Vitamin B12.',
      citations: ['MS-REF-4536'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.36',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003538',
    name: 'drug allergy rule 3538',
    category: 'drug-allergy',
    action: 'suggestion',
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
                      "value": "sertraphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CRP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for sertraphylline when CRP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 08 and lab marker CRP.',
      citations: ['MS-REF-4537'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.37',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003539',
    name: 'quality measure rule 3539',
    category: 'quality-measure',
    action: 'suggestion',
    priority: 39,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metroazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Lymphocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for metroazole when Lymphocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 14 and lab marker Lymphocytes.',
      citations: ['MS-REF-4538'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.38',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003540',
    name: 'pregnancy rule 3540',
    category: 'pregnancy',
    action: 'documentation-required',
    priority: 40,
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramapine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Microalbumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for tramapine when Microalbumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 21 and lab marker Microalbumin.',
      citations: ['MS-REF-4539'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.39',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003541',
    name: 'quality measure rule 3541',
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
                      "value": "sertraolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AFP"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for sertraolol when AFP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 16 and lab marker AFP.',
      citations: ['MS-REF-4540'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.40',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003542',
    name: 'preventive care rule 3542',
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for gentapam when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 15 and lab marker Glucose.',
      citations: ['MS-REF-4541'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.41',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003543',
    name: 'drug disease rule 3543',
    category: 'drug-disease',
    action: 'suggestion',
    priority: 43,
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
                      "value": "azithroolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Calcium"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for azithroolol when Calcium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 04 and lab marker Calcium.',
      citations: ['MS-REF-4542'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.42',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003544',
    name: 'contraindication rule 3544',
    category: 'contraindication',
    action: 'hard-stop',
    priority: 44,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for insulinsetron when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 11 and lab marker Iron.',
      citations: ['MS-REF-4543'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.43',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003545',
    name: 'dosing rule 3545',
    category: 'dosing',
    action: 'hard-stop',
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "azithrotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for azithrotidine when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 03 and lab marker Specific gravity.',
      citations: ['MS-REF-4544'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.44',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003546',
    name: 'contraindication rule 3546',
    category: 'contraindication',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutcycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for salbutcycline when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 04 and lab marker PT.',
      citations: ['MS-REF-4545'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.45',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003547',
    name: 'preventive care rule 3547',
    category: 'preventive-care',
    action: 'alert',
    priority: 47,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantoprazepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for pantoprazepam when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 20 and lab marker Specific gravity.',
      citations: ['MS-REF-4546'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.46',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003548',
    name: 'dosing rule 3548',
    category: 'dosing',
    action: 'documentation-required',
    priority: 48,
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibupropine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Glucose"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for ibupropine when Glucose is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 13 and lab marker Glucose.',
      citations: ['MS-REF-4547'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.47',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003549',
    name: 'renal dosing rule 3549',
    category: 'renal-dosing',
    action: 'documentation-required',
    priority: 49,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalophylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BNP"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for escitalophylline when BNP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 09 and lab marker BNP.',
      citations: ['MS-REF-4548'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.48',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003550',
    name: 'drug drug rule 3550',
    category: 'drug-drug',
    action: 'alert',
    priority: 50,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omeprastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Neutrophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for omeprastatin when Neutrophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 16 and lab marker Neutrophils.',
      citations: ['MS-REF-4549'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.49',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003551',
    name: 'pregnancy rule 3551',
    category: 'pregnancy',
    action: 'suggestion',
    priority: 51,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "levothydine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "WBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for levothydine when WBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 12 and lab marker WBC.',
      citations: ['MS-REF-4550'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.50',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003552',
    name: 'contraindication rule 3552',
    category: 'contraindication',
    action: 'alert',
    priority: 52,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "gentapril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for gentapril when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 15 and lab marker RDW.',
      citations: ['MS-REF-4551'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.51',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003553',
    name: 'contraindication rule 3553',
    category: 'contraindication',
    action: 'documentation-required',
    priority: 53,
    enabled: true,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluoxephylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "WBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for fluoxephylline when WBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 15 and lab marker WBC.',
      citations: ['MS-REF-4552'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.52',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003554',
    name: 'lab critical rule 3554',
    category: 'lab-critical',
    action: 'suggestion',
    priority: 54,
    enabled: false,
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopratidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for pantopratidine when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 12 and lab marker Specific gravity.',
      citations: ['MS-REF-4553'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.53',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003555',
    name: 'pregnancy rule 3555',
    category: 'pregnancy',
    action: 'suggestion',
    priority: 55,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprocillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Specific gravity"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for ciprocillin when Specific gravity is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 05 and lab marker Specific gravity.',
      citations: ['MS-REF-4554'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.54',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003556',
    name: 'contraindication rule 3556',
    category: 'contraindication',
    action: 'suggestion',
    priority: 56,
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metrotidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine creatinine"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for metrotidine when Urine creatinine is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 13 and lab marker Urine creatinine.',
      citations: ['MS-REF-4555'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.55',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003557',
    name: 'quality measure rule 3557',
    category: 'quality-measure',
    action: 'hard-stop',
    priority: 57,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "pantoprapril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "CRP"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for pantoprapril when CRP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 15 and lab marker CRP.',
      citations: ['MS-REF-4556'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.56',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003558',
    name: 'drug drug rule 3558',
    category: 'drug-drug',
    action: 'hard-stop',
    priority: 58,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxapolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TSH"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for enoxapolol when TSH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 14 and lab marker TSH.',
      citations: ['MS-REF-4557'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.57',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003559',
    name: 'renal dosing rule 3559',
    category: 'renal-dosing',
    action: 'order-set',
    priority: 59,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "atorvasartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hemoglobin"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for atorvasartan when Hemoglobin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 14 and lab marker Hemoglobin.',
      citations: ['MS-REF-4558'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.58',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003560',
    name: 'contraindication rule 3560',
    category: 'contraindication',
    action: 'order-set',
    priority: 60,
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Sodium"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for metformcillin when Sodium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 01 and lab marker Sodium.',
      citations: ['MS-REF-4559'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.59',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003561',
    name: 'order set rule 3561',
    category: 'order-set',
    action: 'suggestion',
    priority: 61,
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
                      "value": "amlodsetron"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Basophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for amlodsetron when Basophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 15 and lab marker Basophils.',
      citations: ['MS-REF-4560'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.60',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003562',
    name: 'dosing rule 3562',
    category: 'dosing',
    action: 'suggestion',
    priority: 62,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformtidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "PT"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for metformtidine when PT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 08 and lab marker PT.',
      citations: ['MS-REF-4561'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.61',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003563',
    name: 'pregnancy rule 3563',
    category: 'pregnancy',
    action: 'suggestion',
    priority: 63,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for insulinprazole when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 04 and lab marker INR.',
      citations: ['MS-REF-4562'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.62',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003564',
    name: 'preventive care rule 3564',
    category: 'preventive-care',
    action: 'order-set',
    priority: 64,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "hydrocodprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for hydrocodprazole when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 11 and lab marker Hematocrit.',
      citations: ['MS-REF-4563'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.63',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003565',
    name: 'renal dosing rule 3565',
    category: 'renal-dosing',
    action: 'suggestion',
    priority: 65,
    enabled: true,
    evidenceLevel: 'D',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metropam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCH"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for metropam when MCH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 17 and lab marker MCH.',
      citations: ['MS-REF-4564'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.64',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003566',
    name: 'order set rule 3566',
    category: 'order-set',
    action: 'documentation-required',
    priority: 66,
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformcillin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Microalbumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review order-set for metformcillin when Microalbumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate order-set context with ICD chapter 10 and lab marker Microalbumin.',
      citations: ['MS-REF-4565'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.65',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003567',
    name: 'lab critical rule 3567',
    category: 'lab-critical',
    action: 'alert',
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibupropine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Platelet count"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for ibupropine when Platelet count is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 17 and lab marker Platelet count.',
      citations: ['MS-REF-4566'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.66',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003568',
    name: 'quality measure rule 3568',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 68,
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "vancomolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for vancomolol when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 17 and lab marker Monocytes.',
      citations: ['MS-REF-4567'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.67',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003569',
    name: 'quality measure rule 3569',
    category: 'quality-measure',
    action: 'documentation-required',
    priority: 69,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "escitalophylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "C-peptide"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for escitalophylline when C-peptide is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 20 and lab marker C-peptide.',
      citations: ['MS-REF-4568'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.68',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003570',
    name: 'diagnosis suggestion rule 3570',
    category: 'diagnosis-suggestion',
    action: 'suggestion',
    priority: 70,
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
                      "value": "P"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbutpine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Fibrinogen"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for salbutpine when Fibrinogen is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 16 and lab marker Fibrinogen.',
      citations: ['MS-REF-4569'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.69',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003571',
    name: 'drug drug rule 3571',
    category: 'drug-drug',
    action: 'alert',
    priority: 71,
    enabled: false,
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
                      "value": "J"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ibuprostatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for ibuprostatin when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 10 and lab marker ALP.',
      citations: ['MS-REF-4570'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.70',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003572',
    name: 'lab critical rule 3572',
    category: 'lab-critical',
    action: 'suggestion',
    priority: 72,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "WBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for morphbarbital when WBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 20 and lab marker WBC.',
      citations: ['MS-REF-4571'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.71',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003573',
    name: 'lab critical rule 3573',
    category: 'lab-critical',
    action: 'order-set',
    priority: 73,
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
                      "value": "V"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metformphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Lymphocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for metformphylline when Lymphocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 20 and lab marker Lymphocytes.',
      citations: ['MS-REF-4572'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.72',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003574',
    name: 'contraindication rule 3574',
    category: 'contraindication',
    action: 'alert',
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
                      "value": "L"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "salbuttidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Urine protein"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for salbuttidine when Urine protein is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 12 and lab marker Urine protein.',
      citations: ['MS-REF-4573'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.73',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003575',
    name: 'drug disease rule 3575',
    category: 'drug-disease',
    action: 'order-set',
    priority: 75,
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
                      "value": "insulintidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Albumin"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for insulintidine when Albumin is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 19 and lab marker Albumin.',
      citations: ['MS-REF-4574'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.74',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003576',
    name: 'contraindication rule 3576',
    category: 'contraindication',
    action: 'documentation-required',
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxtidine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "D-dimer"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for amoxtidine when D-dimer is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 05 and lab marker D-dimer.',
      citations: ['MS-REF-4575'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.75',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003577',
    name: 'quality measure rule 3577',
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "cephaprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for cephaprazole when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 11 and lab marker INR.',
      citations: ['MS-REF-4576'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.76',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003578',
    name: 'diagnosis suggestion rule 3578',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 78,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "ciprocycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Hematocrit"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for ciprocycline when Hematocrit is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 05 and lab marker Hematocrit.',
      citations: ['MS-REF-4577'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.77',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003579',
    name: 'duplicate therapy rule 3579',
    category: 'duplicate-therapy',
    action: 'hard-stop',
    priority: 79,
    enabled: true,
    evidenceLevel: 'B',
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxapzepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for enoxapzepam when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 04 and lab marker Monocytes.',
      citations: ['MS-REF-4578'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.78',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003580',
    name: 'drug drug rule 3580',
    category: 'drug-drug',
    action: 'hard-stop',
    priority: 80,
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "acetaminprazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "TIBC"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for acetaminprazole when TIBC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 03 and lab marker TIBC.',
      citations: ['MS-REF-4579'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.79',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003581',
    name: 'contraindication rule 3581',
    category: 'contraindication',
    action: 'order-set',
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
                      "value": "Z"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "morphazole"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "C-peptide"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for morphazole when C-peptide is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 21 and lab marker C-peptide.',
      citations: ['MS-REF-4580'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.80',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003582',
    name: 'renal dosing rule 3582',
    category: 'renal-dosing',
    action: 'documentation-required',
    priority: 82,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "enoxapsartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin B12"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for enoxapsartan when Vitamin B12 is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 07 and lab marker Vitamin B12.',
      citations: ['MS-REF-4581'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.81',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003583',
    name: 'pregnancy rule 3583',
    category: 'pregnancy',
    action: 'order-set',
    priority: 83,
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furopine"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for furopine when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 01 and lab marker INR.',
      citations: ['MS-REF-4582'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.82',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003584',
    name: 'renal dosing rule 3584',
    category: 'renal-dosing',
    action: 'hard-stop',
    priority: 84,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "naproxstatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for naproxstatin when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 07 and lab marker Vitamin D.',
      citations: ['MS-REF-4583'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.83',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003585',
    name: 'lab critical rule 3585',
    category: 'lab-critical',
    action: 'alert',
    priority: 85,
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
                      "value": "N"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "fluticastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Troponin I"
                }
          ]
    },
    recommendation: {
      summary: 'Review lab-critical for fluticastatin when Troponin I is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate lab-critical context with ICD chapter 14 and lab marker Troponin I.',
      citations: ['MS-REF-4584'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.84',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003586',
    name: 'drug disease rule 3586',
    category: 'drug-disease',
    action: 'order-set',
    priority: 86,
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
                      "value": "I"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopracycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Magnesium"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for pantopracycline when Magnesium is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 09 and lab marker Magnesium.',
      citations: ['MS-REF-4585'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.85',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003587',
    name: 'quality measure rule 3587',
    category: 'quality-measure',
    action: 'order-set',
    priority: 87,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "metroolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Eosinophils"
                }
          ]
    },
    recommendation: {
      summary: 'Review quality-measure for metroolol when Eosinophils is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate quality-measure context with ICD chapter 02 and lab marker Eosinophils.',
      citations: ['MS-REF-4586'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.86',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003588',
    name: 'renal dosing rule 3588',
    category: 'renal-dosing',
    action: 'alert',
    priority: 88,
    enabled: false,
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
                      "value": "H"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramastatin"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "aPTT"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for tramastatin when aPTT is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 08 and lab marker aPTT.',
      citations: ['MS-REF-4587'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.87',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003589',
    name: 'preventive care rule 3589',
    category: 'preventive-care',
    action: 'documentation-required',
    priority: 89,
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
                      "value": "E"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amoxbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Vitamin D"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for amoxbarbital when Vitamin D is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 04 and lab marker Vitamin D.',
      citations: ['MS-REF-4588'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.88',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003590',
    name: 'drug disease rule 3590',
    category: 'drug-disease',
    action: 'hard-stop',
    priority: 90,
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
                      "value": "Q"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "atorvaolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ESR"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for atorvaolol when ESR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 17 and lab marker ESR.',
      citations: ['MS-REF-4589'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.89',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003591',
    name: 'drug allergy rule 3591',
    category: 'drug-allergy',
    action: 'suggestion',
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
                      "value": "D"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikazepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-allergy for amikazepam when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-allergy context with ICD chapter 03 and lab marker ALP.',
      citations: ['MS-REF-4590'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.0.90',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003592',
    name: 'dosing rule 3592',
    category: 'dosing',
    action: 'hard-stop',
    priority: 92,
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
                      "value": "M"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "insulinbarbital"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "AST"
                }
          ]
    },
    recommendation: {
      summary: 'Review dosing for insulinbarbital when AST is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate dosing context with ICD chapter 13 and lab marker AST.',
      citations: ['MS-REF-4591'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.1.91',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003593',
    name: 'pregnancy rule 3593',
    category: 'pregnancy',
    action: 'suggestion',
    priority: 93,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikapam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "BUN"
                }
          ]
    },
    recommendation: {
      summary: 'Review pregnancy for amikapam when BUN is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate pregnancy context with ICD chapter 11 and lab marker BUN.',
      citations: ['MS-REF-4592'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.2.92',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003594',
    name: 'duplicate therapy rule 3594',
    category: 'duplicate-therapy',
    action: 'hard-stop',
    priority: 94,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "pantopraolol"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Iron"
                }
          ]
    },
    recommendation: {
      summary: 'Review duplicate-therapy for pantopraolol when Iron is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate duplicate-therapy context with ICD chapter 02 and lab marker Iron.',
      citations: ['MS-REF-4593'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.3.93',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003595',
    name: 'drug disease rule 3595',
    category: 'drug-disease',
    action: 'alert',
    priority: 95,
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
                      "value": "C"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "doxysartan"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "MCHC"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-disease for doxysartan when MCHC is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-disease context with ICD chapter 02 and lab marker MCHC.',
      citations: ['MS-REF-4594'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.4.94',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003596',
    name: 'preventive care rule 3596',
    category: 'preventive-care',
    action: 'suggestion',
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
                      "value": "RDW"
                }
          ]
    },
    recommendation: {
      summary: 'Review preventive-care for clindastatin when RDW is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate preventive-care context with ICD chapter 01 and lab marker RDW.',
      citations: ['MS-REF-4595'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.5.95',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003597',
    name: 'drug drug rule 3597',
    category: 'drug-drug',
    action: 'hard-stop',
    priority: 97,
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
                      "value": "A"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "omeprazepam"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "INR"
                }
          ]
    },
    recommendation: {
      summary: 'Review drug-drug for omeprazepam when INR is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate drug-drug context with ICD chapter 01 and lab marker INR.',
      citations: ['MS-REF-4596'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.6.96',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003598',
    name: 'diagnosis suggestion rule 3598',
    category: 'diagnosis-suggestion',
    action: 'order-set',
    priority: 98,
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
                      "value": "F"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "furopril"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "ALP"
                }
          ]
    },
    recommendation: {
      summary: 'Review diagnosis-suggestion for furopril when ALP is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate diagnosis-suggestion context with ICD chapter 05 and lab marker ALP.',
      citations: ['MS-REF-4597'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.7.97',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003599',
    name: 'contraindication rule 3599',
    category: 'contraindication',
    action: 'order-set',
    priority: 99,
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
                      "value": "K"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "amikacycline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "Monocytes"
                }
          ]
    },
    recommendation: {
      summary: 'Review contraindication for amikacycline when Monocytes is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate contraindication context with ICD chapter 11 and lab marker Monocytes.',
      citations: ['MS-REF-4598'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.8.98',
      lastReviewed: '2025-06-01',
    },
  },
  {
    id: 'CDS-003600',
    name: 'renal dosing rule 3600',
    category: 'renal-dosing',
    action: 'order-set',
    priority: 100,
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
                      "value": "O"
                },
                {
                      "field": "medication.name",
                      "operator": "contains",
                      "value": "tramaphylline"
                },
                {
                      "field": "lab.result.component",
                      "operator": "eq",
                      "value": "LDH"
                }
          ]
    },
    recommendation: {
      summary: 'Review renal-dosing for tramaphylline when LDH is abnormal',
      detail: 'MedSphere synthetic CDS rule: evaluate renal-dosing context with ICD chapter 15 and lab marker LDH.',
      citations: ['MS-REF-4599'],
    },
    metadata: {
      author: 'MedSphere Clinical Informatics',
      version: '1.9.99',
      lastReviewed: '2025-06-01',
    },
  }
];
