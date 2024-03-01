/** Deterministic seeded PRNG and medical vocabulary for bulk codegen. */

export function createRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

export function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

export function pickN(rng, arr, n) {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    const idx = Math.floor(rng() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

export const ICD_CHAPTERS = [
  { code: '01', label: 'Certain infectious and parasitic diseases', prefix: 'A' },
  { code: '02', label: 'Neoplasms', prefix: 'C' },
  { code: '03', label: 'Diseases of the blood and blood-forming organs', prefix: 'D' },
  { code: '04', label: 'Endocrine, nutritional and metabolic diseases', prefix: 'E' },
  { code: '05', label: 'Mental, behavioral and neurodevelopmental disorders', prefix: 'F' },
  { code: '06', label: 'Diseases of the nervous system', prefix: 'G' },
  { code: '07', label: 'Diseases of the eye and adnexa', prefix: 'H' },
  { code: '08', label: 'Diseases of the ear and mastoid process', prefix: 'H' },
  { code: '09', label: 'Diseases of the circulatory system', prefix: 'I' },
  { code: '10', label: 'Diseases of the respiratory system', prefix: 'J' },
  { code: '11', label: 'Diseases of the digestive system', prefix: 'K' },
  { code: '12', label: 'Diseases of the skin and subcutaneous tissue', prefix: 'L' },
  { code: '13', label: 'Diseases of the musculoskeletal system', prefix: 'M' },
  { code: '14', label: 'Diseases of the genitourinary system', prefix: 'N' },
  { code: '15', label: 'Pregnancy, childbirth and the puerperium', prefix: 'O' },
  { code: '16', label: 'Certain conditions originating in the perinatal period', prefix: 'P' },
  { code: '17', label: 'Congenital malformations and chromosomal abnormalities', prefix: 'Q' },
  { code: '18', label: 'Symptoms, signs and abnormal clinical findings', prefix: 'R' },
  { code: '19', label: 'Injury, poisoning and external causes', prefix: 'S' },
  { code: '20', label: 'External causes of morbidity', prefix: 'V' },
  { code: '21', label: 'Factors influencing health status', prefix: 'Z' },
];

export const CONDITION_QUALIFIERS = [
  'acute', 'chronic', 'recurrent', 'bilateral', 'unilateral', 'primary', 'secondary',
  'unspecified', 'complicated', 'uncomplicated', 'mild', 'moderate', 'severe',
  'with obstruction', 'without obstruction', 'with hemorrhage', 'without hemorrhage',
  'with sepsis', 'drug-induced', 'postprocedural', 'postoperative', 'congenital',
  'idiopathic', 'hereditary', 'acquired', 'intractable', 'with status epilepticus',
];

export const ANATOMY_TERMS = [
  'cerebral', 'pulmonary', 'hepatic', 'renal', 'cardiac', 'gastric', 'intestinal',
  'pancreatic', 'thyroid', 'adrenal', 'ovarian', 'prostatic', 'cervical', 'lumbar',
  'thoracic', 'facial', 'orbital', 'nasal', 'pharyngeal', 'laryngeal', 'bronchial',
  'alveolar', 'splenic', 'biliary', 'colonic', 'rectal', 'bladder', 'ureteral',
  'femoral', 'tibial', 'radial', 'ulnar', 'humeral', 'patellar', 'meniscal',
];

export const DISEASE_NOUNS = [
  'infection', 'inflammation', 'disorder', 'syndrome', 'disease', 'deficiency',
  'degeneration', 'neoplasm', 'carcinoma', 'adenoma', 'stenosis', 'insufficiency',
  'failure', 'hypertension', 'hypotension', 'arrhythmia', 'embolism', 'thrombosis',
  'hemorrhage', 'effusion', 'edema', 'fibrosis', 'cyst', 'ulcer', 'fracture',
  'contusion', 'laceration', 'abscess', 'cellulitis', 'osteoporosis', 'arthritis',
];

export const CPT_CATEGORIES = [
  'Evaluation and Management', 'Anesthesia', 'Surgery', 'Radiology', 'Pathology',
  'Medicine', 'Category II', 'Category III', 'Proprietary Laboratory Analyses',
];

export const CPT_BODY_REGIONS = [
  'head and neck', 'chest', 'abdomen', 'pelvis', 'upper extremity', 'lower extremity',
  'spine', 'cardiovascular', 'digestive', 'urinary', 'nervous', 'musculoskeletal',
];

export const CPT_PROCEDURE_VERBS = [
  'repair', 'excision', 'biopsy', 'resection', 'debridement', 'reduction', 'fusion',
  'arthroscopy', 'endoscopy', 'catheterization', 'intubation', 'drainage', 'aspiration',
  'injection', 'transplant', 'graft', 'reconstruction', 'amputation', 'dilation',
  'ablation', 'stent placement', 'bypass', 'mapping', 'monitoring', 'imaging',
];

export const LOINC_COMPONENTS = [
  'Glucose', 'Sodium', 'Potassium', 'Chloride', 'CO2', 'BUN', 'Creatinine', 'Calcium',
  'Magnesium', 'Phosphorus', 'Albumin', 'Total protein', 'Bilirubin', 'ALT', 'AST',
  'ALP', 'GGT', 'LDH', 'Troponin I', 'BNP', 'CRP', 'ESR', 'WBC', 'RBC', 'Hemoglobin',
  'Hematocrit', 'Platelet count', 'MCV', 'MCH', 'MCHC', 'RDW', 'Neutrophils', 'Lymphocytes',
  'Monocytes', 'Eosinophils', 'Basophils', 'PT', 'INR', 'aPTT', 'Fibrinogen', 'D-dimer',
  'TSH', 'Free T4', 'Free T3', 'HbA1c', 'Insulin', 'C-peptide', 'PSA', 'CEA', 'AFP',
  'Vitamin D', 'Vitamin B12', 'Folate', 'Ferritin', 'Iron', 'TIBC', 'Transferrin',
  'Urine protein', 'Urine creatinine', 'Microalbumin', 'pH', 'Specific gravity',
];

export const LOINC_UNITS = [
  'mg/dL', 'mmol/L', 'mEq/L', 'g/dL', 'U/L', 'ng/mL', 'pg/mL', 'IU/mL', 'mIU/L',
  '%', '10*3/uL', '10*6/uL', 'fL', 'pg', 'sec', 'ratio', 'mg/L', 'ug/dL', 'nmol/L',
];

export const DRUG_STEMS = [
  'amox', 'cipro', 'metro', 'doxy', 'azithro', 'lisino', 'amlod', 'atorva', 'omepra',
  'pantopra', 'levothy', 'metform', 'insulin', 'warfar', 'hepar', 'enoxap', 'furo',
  'hydrochloro', 'spirono', 'predni', 'dexa', 'albut', 'flutica', 'salbut', 'gabapen',
  'pregaba', 'sertra', 'fluoxe', 'escitalo', 'trama', 'morph', 'hydrocod', 'oxycod',
  'acetamin', 'ibupro', 'naprox', 'cepha', 'clinda', 'vancom', 'genta', 'amika',
];

export const DRUG_SUFFIXES = [
  'pril', 'sartan', 'olol', 'pine', 'statin', 'azole', 'cillin', 'mycin', 'cycline',
  'prazole', 'tidine', 'setron', 'pam', 'zepam', 'barbital', 'phylline', 'dine',
];

export const DRUG_FORMS = ['tablet', 'capsule', 'solution', 'suspension', 'injection', 'cream', 'ointment', 'patch', 'inhaler', 'suppository'];
export const DRUG_ROUTES = ['oral', 'intravenous', 'intramuscular', 'subcutaneous', 'topical', 'inhalation', 'rectal', 'ophthalmic', 'otic', 'transdermal'];
export const DRUG_STRENGTHS = ['5 mg', '10 mg', '20 mg', '25 mg', '50 mg', '100 mg', '250 mg', '500 mg', '1 g', '0.5 mg/mL', '10 mg/mL', '40 mg/mL'];

export const SNOMED_FINDING_TYPES = [
  'finding', 'disorder', 'procedure', 'situation', 'observable entity', 'body structure',
  'clinical finding', 'morphologic abnormality', 'cell structure', 'substance',
];

export const ALLERGEN_CATEGORIES = [
  'Food', 'Drug', 'Environmental', 'Contact', 'Biologic', 'Latex', 'Insect venom', 'Occupational',
];

export const ALLERGEN_NAMES = [
  'Penicillin', 'Sulfa drugs', 'Aspirin', 'NSAIDs', 'Codeine', 'Morphine', 'Latex',
  'Peanuts', 'Tree nuts', 'Shellfish', 'Fish', 'Eggs', 'Milk', 'Soy', 'Wheat', 'Sesame',
  'Pollen', 'Dust mites', 'Mold', 'Cat dander', 'Dog dander', 'Bee venom', 'Wasp venom',
  'Nickel', 'Fragrance', 'Formaldehyde', 'Iodine contrast', 'Chlorhexidine', 'Adhesive tape',
];

export const CVX_VACCINES = [
  { code: '08', name: 'Hepatitis B, pediatric' },
  { code: '20', name: 'DTaP' },
  { code: '21', name: 'Varicella' },
  { code: '03', name: 'MMR' },
  { code: '115', name: 'Tdap' },
  { code: '133', name: 'PCV13' },
  { code: '141', name: 'Influenza, seasonal, injectable' },
  { code: '187', name: 'COVID-19, mRNA, bivalent' },
  { code: '208', name: 'COVID-19, mRNA, original' },
  { code: '62', name: 'HPV, quadrivalent' },
  { code: '114', name: 'Meningococcal MCV4P' },
  { code: '83', name: 'Hepatitis A, pediatric' },
  { code: '52', name: 'Hepatitis A, adult' },
  { code: '116', name: 'Rotavirus, pentavalent' },
  { code: '10', name: 'IPV' },
];

export const INTERACTION_SEVERITIES = ['minor', 'moderate', 'major', 'contraindicated'];

export const LAB_ANALYTES = [
  'Sodium', 'Potassium', 'Chloride', 'Glucose', 'Creatinine', 'BUN', 'Calcium',
  'Hemoglobin', 'WBC', 'Platelets', 'TSH', 'ALT', 'AST', 'INR', 'Troponin',
];

export const AGE_GROUPS = [
  { key: 'neonate', minDays: 0, maxDays: 28 },
  { key: 'infant', minDays: 29, maxDays: 365 },
  { key: 'child', minDays: 366, maxDays: 4380 },
  { key: 'adolescent', minDays: 4381, maxDays: 6570 },
  { key: 'adult', minDays: 6571, maxDays: 23725 },
  { key: 'elderly', minDays: 23726, maxDays: 36500 },
];

export const SEXES = ['male', 'female', 'unknown'];

export function generateIcdDescription(rng, chapter) {
  const q = pick(rng, CONDITION_QUALIFIERS);
  const a = pick(rng, ANATOMY_TERMS);
  const d = pick(rng, DISEASE_NOUNS);
  const variants = [
    `${q} ${a} ${d}`,
    `${a} ${d}, ${q}`,
    `${d} of ${a} region, ${q}`,
    `${q} ${d} affecting ${a} structures`,
    `${chapter.label.toLowerCase()} — ${q} ${d}`,
  ];
  return pick(rng, variants).replace(/\s+/g, ' ').trim();
}

export function generateIcdCode(rng, chapter, index) {
  const base = chapter.prefix.charCodeAt(0) - 65;
  const cat = (index % 90) + 10;
  const sub = index % 10;
  const ext = index % 3 === 0 ? `.${sub}` : index % 3 === 1 ? `.${sub}${index % 9}` : '';
  const letter = String.fromCharCode(65 + (base % 26));
  return `${letter}${String(cat).padStart(2, '0')}${ext}`;
}

export function escapeTs(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

export function escapeYaml(str) {
  return str.replace(/"/g, '\\"');
}
