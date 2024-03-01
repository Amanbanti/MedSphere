import {
  createRng, pick, ICD_CHAPTERS, generateIcdCode, generateIcdDescription,
  CPT_CATEGORIES, CPT_BODY_REGIONS, CPT_PROCEDURE_VERBS, LOINC_COMPONENTS, LOINC_UNITS,
  DRUG_STEMS, DRUG_SUFFIXES, DRUG_FORMS, DRUG_ROUTES, DRUG_STRENGTHS,
  SNOMED_FINDING_TYPES, ANATOMY_TERMS, DISEASE_NOUNS, ALLERGEN_CATEGORIES, ALLERGEN_NAMES,
  CVX_VACCINES, INTERACTION_SEVERITIES, LAB_ANALYTES, AGE_GROUPS, SEXES, escapeTs,
} from './bulk-seed.mjs';
import { writeFile } from './expansion-utils.mjs';

const SYNTHETIC_NOTICE = `/**
 * MedSphere synthetic reference set for development and testing.
 * Not affiliated with or derived from proprietary code system releases
 * (ICD-10-CM, CPT, LOINC, RxNorm, SNOMED CT, CVX).
 */\n`;

function splitIntoParts(items, linesPerItem, targetLinesPerFile) {
  const itemsPerFile = Math.max(1, Math.floor(targetLinesPerFile / linesPerItem));
  const parts = [];
  for (let i = 0; i < items.length; i += itemsPerFile) {
    parts.push(items.slice(i, i + itemsPerFile));
  }
  return parts;
}

async function writeSplitDataset(root, stats, dir, typeName, interfaceDef, items, itemRenderer, linesPerItem = 6) {
  const parts = splitIntoParts(items, linesPerItem, 600);
  const partExports = [];

  for (let p = 0; p < parts.length; p++) {
    const partNum = String(p + 1).padStart(3, '0');
    const fileName = `${dir.split('/').pop()}-part-${partNum}.ts`;
    const constName = `${dir.split('/').pop().replace(/-/g, '_').toUpperCase()}_PART_${partNum}`;
    const body = parts[p].map((item, idx) => itemRenderer(item, p * parts[0].length + idx)).join('\n');
    const content = `${SYNTHETIC_NOTICE}
${interfaceDef}

export const ${constName}: ${typeName}[] = [
${body}
];
`;
    const relPath = `${dir}/${fileName}`;
    await writeFile(root, relPath, content, stats);
    partExports.push(`export { ${constName} } from './${fileName.replace('.ts', '')}';`);
  }

  const indexContent = `${SYNTHETIC_NOTICE}
${interfaceDef}

${partExports.join('\n')}

${parts.map((_, p) => {
    const partNum = String(p + 1).padStart(3, '0');
    const constName = `${dir.split('/').pop().replace(/-/g, '_').toUpperCase()}_PART_${partNum}`;
    return `import { ${constName} } from './${dir.split('/').pop()}-part-${partNum}';`;
  }).join('\n')}

export const ${dir.split('/').pop().replace(/-/g, '_')}Catalog: ${typeName}[] = [
${parts.map((_, p) => {
    const partNum = String(p + 1).padStart(3, '0');
    const constName = `${dir.split('/').pop().replace(/-/g, '_').toUpperCase()}_PART_${partNum}`;
    return `  ...${constName},`;
  }).join('\n')}
];

export function find${typeName.replace('Entry', '').replace('Record', '')}ByCode(code: string): ${typeName} | undefined {
  return ${dir.split('/').pop().replace(/-/g, '_')}Catalog.find((e) => e.code === code);
}

export function search${typeName.replace('Entry', '').replace('Record', '')}(query: string, limit = 50): ${typeName}[] {
  const q = query.toLowerCase();
  const results: ${typeName}[] = [];
  for (const entry of ${dir.split('/').pop().replace(/-/g, '_')}Catalog) {
    if (entry.code.toLowerCase().includes(q) || entry.description.toLowerCase().includes(q)) {
      results.push(entry);
      if (results.length >= limit) break;
    }
  }
  return results;
}
`;
  await writeFile(root, `${dir}/index.ts`, indexContent, stats);
}

export async function generateIcd10(root, stats) {
  const rng = createRng(1001);
  const count = 5200;
  const icdInterface = `export interface Icd10Entry {
  code: string;
  description: string;
  chapter: string;
  chapterCode: string;
  billable: boolean;
  effectiveYear: number;
  lateralityRequired: boolean;
  manifestationFlag: boolean;
}`;
  const items = Array.from({ length: count }, (_, i) => {
    const chapter = ICD_CHAPTERS[i % ICD_CHAPTERS.length];
    return {
      code: generateIcdCode(rng, chapter, i),
      description: generateIcdDescription(rng, chapter),
      chapter: chapter.label,
      chapterCode: chapter.code,
      billable: i % 7 !== 0,
      effectiveYear: 2020 + (i % 6),
      lateralityRequired: i % 11 === 0,
      manifestationFlag: i % 13 === 0,
    };
  });
  await writeSplitDataset(root, stats, 'packages/shared/src/reference/icd10', 'Icd10Entry', icdInterface, items, (e) =>
    `  {
    code: '${escapeTs(e.code)}',
    description: '${escapeTs(e.description)}',
    chapter: '${escapeTs(e.chapter)}',
    chapterCode: '${e.chapterCode}',
    billable: ${e.billable},
    effectiveYear: ${e.effectiveYear},
    lateralityRequired: ${e.lateralityRequired},
    manifestationFlag: ${e.manifestationFlag},
  },`, 9);
}

export async function generateCpt(root, stats) {
  const rng = createRng(2002);
  const count = 2100;
  const iface = `export interface CptEntry {
  code: string;
  description: string;
  category: string;
  bodyRegion: string;
  rvuWork: number;
  rvuFacility: number;
  rvuNonFacility: number;
  modifierAllowed: boolean;
}`;
  const items = Array.from({ length: count }, (_, i) => {
    const cat = pick(rng, CPT_CATEGORIES);
    const region = pick(rng, CPT_BODY_REGIONS);
    const verb = pick(rng, CPT_PROCEDURE_VERBS);
    const code = String(10000 + (i * 17) % 90000).padStart(5, '0');
    return {
      code,
      description: `${verb} of ${region}, ${pick(rng, ['initial', 'subsequent', 'comprehensive', 'limited'])} service`,
      category: cat,
      bodyRegion: region,
      rvuWork: +(rng() * 15 + 0.5).toFixed(2),
      rvuFacility: +(rng() * 8).toFixed(2),
      rvuNonFacility: +(rng() * 12).toFixed(2),
      modifierAllowed: i % 3 !== 0,
    };
  });
  await writeSplitDataset(root, stats, 'packages/shared/src/reference/cpt', 'CptEntry', iface, items, (e) =>
    `  {
    code: '${e.code}',
    description: '${escapeTs(e.description)}',
    category: '${escapeTs(e.category)}',
    bodyRegion: '${escapeTs(e.bodyRegion)}',
    rvuWork: ${e.rvuWork},
    rvuFacility: ${e.rvuFacility},
    rvuNonFacility: ${e.rvuNonFacility},
    modifierAllowed: ${e.modifierAllowed},
  },`, 9);
}

export async function generateLoinc(root, stats) {
  const rng = createRng(3003);
  const count = 2100;
  const iface = `export interface LoincEntry {
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
}`;
  const properties = ['MCnc', 'SCnc', 'MRat', 'SRat', 'NFr', 'PrThr', 'Arb'];
  const timings = ['Pt', '24H', '1H', '8H', 'R'];
  const systems = ['Ser/Plas', 'Bld', 'Urine', 'CSF', 'Body fld', 'Stool'];
  const scales = ['Qn', 'Ord', 'Nom', 'Doc'];
  const methods = ['', 'Electrophoresis', 'Immunoassay', 'Calculated', 'Automated count'];
  const items = Array.from({ length: count }, (_, i) => {
    const component = LOINC_COMPONENTS[i % LOINC_COMPONENTS.length];
    const suffix = i >= LOINC_COMPONENTS.length ? ` variant ${Math.floor(i / LOINC_COMPONENTS.length)}` : '';
    const code = `${10000 + (i * 13) % 89999}-${(i % 9) + 1}`;
    return {
      code,
      component: `${component}${suffix}`,
      property: pick(rng, properties),
      timing: pick(rng, timings),
      system: pick(rng, systems),
      scale: pick(rng, scales),
      method: pick(rng, methods),
      longName: `${component}${suffix} [${pick(rng, systems)}]`,
      unit: pick(rng, LOINC_UNITS),
      referenceRangeHint: `${(rng() * 100).toFixed(1)}-${(rng() * 100 + 100).toFixed(1)}`,
    };
  });
  await writeSplitDataset(root, stats, 'packages/shared/src/reference/loinc', 'LoincEntry', iface, items, (e) =>
    `  {
    code: '${e.code}',
    component: '${escapeTs(e.component)}',
    property: '${e.property}',
    timing: '${e.timing}',
    system: '${escapeTs(e.system)}',
    scale: '${e.scale}',
    method: '${escapeTs(e.method)}',
    longName: '${escapeTs(e.longName)}',
    unit: '${escapeTs(e.unit)}',
    referenceRangeHint: '${e.referenceRangeHint}',
  },`, 11);
}

export async function generateRxnorm(root, stats) {
  const rng = createRng(4004);
  const count = 3100;
  const iface = `export interface RxNormEntry {
  rxcui: string;
  name: string;
  strength: string;
  doseForm: string;
  route: string;
  ingredient: string;
  brandName: string | null;
  schedule: string;
  ndcPattern: string;
}`;
  const schedules = ['OTC', 'CII', 'CIII', 'CIV', 'CV', 'Non-controlled'];
  const items = Array.from({ length: count }, (_, i) => {
    const stem = pick(rng, DRUG_STEMS);
    const suffix = pick(rng, DRUG_SUFFIXES);
    const name = `${stem}${suffix}`;
    const strength = pick(rng, DRUG_STRENGTHS);
    const form = pick(rng, DRUG_FORMS);
    const route = pick(rng, DRUG_ROUTES);
    return {
      rxcui: String(100000 + i * 7),
      name: `${name} ${strength} ${form}`,
      strength,
      doseForm: form,
      route,
      ingredient: name,
      brandName: i % 4 === 0 ? `${name.charAt(0).toUpperCase()}${name.slice(1)}-XR` : null,
      schedule: pick(rng, schedules),
      ndcPattern: `${String(10000 + (i % 90000)).padStart(5, '0')}-${String(i % 1000).padStart(3, '0')}-${String(i % 100).padStart(2, '0')}`,
    };
  });
  await writeSplitDataset(root, stats, 'packages/shared/src/reference/rxnorm', 'RxNormEntry', iface, items, (e) =>
    `  {
    rxcui: '${e.rxcui}',
    name: '${escapeTs(e.name)}',
    strength: '${escapeTs(e.strength)}',
    doseForm: '${e.doseForm}',
    route: '${e.route}',
    ingredient: '${escapeTs(e.ingredient)}',
    brandName: ${e.brandName ? `'${escapeTs(e.brandName)}'` : 'null'},
    schedule: '${e.schedule}',
    ndcPattern: '${e.ndcPattern}',
  },`, 10);
}

export async function generateSnomed(root, stats) {
  const rng = createRng(5005);
  const count = 2100;
  const iface = `export interface SnomedEntry {
  conceptId: string;
  preferredTerm: string;
  semanticTag: string;
  active: boolean;
  definitionStatus: string;
  moduleId: string;
}`;
  const items = Array.from({ length: count }, (_, i) => {
    const anatomy = pick(rng, ANATOMY_TERMS);
    const disease = pick(rng, DISEASE_NOUNS);
    const tag = pick(rng, SNOMED_FINDING_TYPES);
    return {
      conceptId: String(100000000 + i * 11),
      preferredTerm: `${anatomy} ${disease} (${tag})`,
      semanticTag: tag,
      active: i % 17 !== 0,
      definitionStatus: i % 5 === 0 ? 'fully defined' : 'primitive',
      moduleId: '900000000000207008',
    };
  });
  await writeSplitDataset(root, stats, 'packages/shared/src/reference/snomed', 'SnomedEntry', iface, items, (e) =>
    `  {
    conceptId: '${e.conceptId}',
    preferredTerm: '${escapeTs(e.preferredTerm)}',
    semanticTag: '${escapeTs(e.semanticTag)}',
    active: ${e.active},
    definitionStatus: '${e.definitionStatus}',
    moduleId: '${e.moduleId}',
  },`, 7);
}

export async function generateAllergens(root, stats) {
  const rng = createRng(6006);
  const count = 800;
  const iface = `export interface AllergenEntry {
  code: string;
  display: string;
  category: string;
  snomedHint: string;
  crossReactiveWith: string[];
  commonReactions: string[];
}`;
  const reactions = ['urticaria', 'angioedema', 'anaphylaxis', 'rash', 'bronchospasm', 'nausea', 'rhinitis'];
  const items = Array.from({ length: count }, (_, i) => {
    const base = ALLERGEN_NAMES[i % ALLERGEN_NAMES.length];
    const variant = i >= ALLERGEN_NAMES.length ? ` (${Math.floor(i / ALLERGEN_NAMES.length)})` : '';
    return {
      code: `ALG-${String(i + 1).padStart(5, '0')}`,
      display: `${base}${variant}`,
      category: pick(rng, ALLERGEN_CATEGORIES),
      snomedHint: String(900000000 + i),
      crossReactiveWith: [pick(rng, ALLERGEN_NAMES), pick(rng, ALLERGEN_NAMES)],
      commonReactions: [pick(rng, reactions), pick(rng, reactions)],
    };
  });
  const body = items.map((e) => `  {
    code: '${e.code}',
    display: '${escapeTs(e.display)}',
    category: '${e.category}',
    snomedHint: '${e.snomedHint}',
    crossReactiveWith: [${e.crossReactiveWith.map((c) => `'${escapeTs(c)}'`).join(', ')}],
    commonReactions: [${e.commonReactions.map((c) => `'${c}'`).join(', ')}],
  },`).join('\n');
  const content = `${SYNTHETIC_NOTICE}
${iface}

export const allergenCatalog: AllergenEntry[] = [
${body}
];

export function findAllergenByCode(code: string): AllergenEntry | undefined {
  return allergenCatalog.find((e) => e.code === code);
}
`;
  await writeFile(root, 'packages/shared/src/reference/allergens/index.ts', content, stats);
}

export async function generateVaccineCvx(root, stats) {
  const rng = createRng(7007);
  const items = [];
  for (let i = 0; i < CVX_VACCINES.length; i++) {
    const v = CVX_VACCINES[i];
    items.push({ code: v.code, name: v.name, status: 'Active', nonVaccine: false });
  }
  for (let i = CVX_VACCINES.length; i < 350; i++) {
    items.push({
      code: String(200 + i),
      name: `Synthetic vaccine concept ${i} for development`,
      status: pick(rng, ['Active', 'Inactive', 'Non-US']),
      nonVaccine: i % 20 === 0,
    });
  }
  const iface = `export interface VaccineCvxEntry {
  code: string;
  name: string;
  status: string;
  nonVaccine: boolean;
}`;
  const body = items.map((e) => `  { code: '${e.code}', name: '${escapeTs(e.name)}', status: '${e.status}', nonVaccine: ${e.nonVaccine} },`).join('\n');
  await writeFile(root, 'packages/shared/src/reference/vaccine-cvx/index.ts', `${SYNTHETIC_NOTICE}\n${iface}\n\nexport const vaccineCvxCatalog: VaccineCvxEntry[] = [\n${body}\n];\n`, stats);
}

export async function generateDrugInteractions(root, stats) {
  const rng = createRng(8008);
  const count = 3500;
  const iface = `export interface DrugInteractionEntry {
  drugA: string;
  drugB: string;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  mechanism: string;
  clinicalEffect: string;
  management: string;
  evidenceLevel: string;
}`;
  const mechanisms = [
    'CYP3A4 inhibition', 'CYP2D6 inhibition', 'QT prolongation additive', 'serotonin syndrome risk',
    'nephrotoxicity additive', 'hypotension additive', 'bleeding risk increased', 'CNS depression additive',
  ];
  const effects = [
    'Increased plasma concentration of drug B', 'Reduced efficacy of drug A', 'Elevated bleeding risk',
    'Severe hypotension possible', 'Arrhythmia risk', 'Hyperkalemia', 'Lactic acidosis risk',
  ];
  const management = [
    'Monitor closely; adjust dose if needed', 'Avoid combination if alternatives exist',
    'Separate administration by 2 hours', 'Contraindicated — select alternative therapy',
    'Reduce dose of drug B by 50%', 'Obtain baseline renal function and monitor',
  ];
  const items = Array.from({ length: count }, (_, i) => {
    const a = `${pick(rng, DRUG_STEMS)}${pick(rng, DRUG_SUFFIXES)}`;
    let b = `${pick(rng, DRUG_STEMS)}${pick(rng, DRUG_SUFFIXES)}`;
    while (b === a) b = `${pick(rng, DRUG_STEMS)}${pick(rng, DRUG_SUFFIXES)}`;
    return {
      drugA: a,
      drugB: b,
      severity: pick(rng, INTERACTION_SEVERITIES),
      mechanism: pick(rng, mechanisms),
      clinicalEffect: pick(rng, effects),
      management: pick(rng, management),
      evidenceLevel: pick(rng, ['A', 'B', 'C', 'D']),
    };
  });
  await writeSplitDataset(root, stats, 'packages/shared/src/reference/drug-interactions', 'DrugInteractionEntry', iface, items, (e) =>
    `  {
    drugA: '${escapeTs(e.drugA)}',
    drugB: '${escapeTs(e.drugB)}',
    severity: '${e.severity}',
    mechanism: '${escapeTs(e.mechanism)}',
    clinicalEffect: '${escapeTs(e.clinicalEffect)}',
    management: '${escapeTs(e.management)}',
    evidenceLevel: '${e.evidenceLevel}',
  },`, 8);
}

export async function generateLabReferenceRanges(root, stats) {
  const rng = createRng(9009);
  const iface = `export interface LabReferenceRangeEntry {
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
}`;
  const specimens = ['Serum', 'Plasma', 'Whole blood', 'Urine', 'CSF'];
  const items = [];
  for (const analyte of LAB_ANALYTES) {
    for (const age of AGE_GROUPS) {
      for (const sex of SEXES) {
        const base = rng() * 50 + 10;
        items.push({
          analyte,
          loincHint: `${10000 + items.length}-${items.length % 9}`,
          sex,
          ageGroup: age.key,
          ageMinDays: age.minDays,
          ageMaxDays: age.maxDays,
          unit: pick(rng, LOINC_UNITS),
          low: +(base * 0.8).toFixed(2),
          high: +(base * 1.4).toFixed(2),
          criticalLow: items.length % 4 === 0 ? +(base * 0.3).toFixed(2) : null,
          criticalHigh: items.length % 5 === 0 ? +(base * 2.5).toFixed(2) : null,
          specimen: pick(rng, specimens),
        });
      }
    }
  }
  for (let extra = 0; extra < 1200; extra++) {
    const analyte = `${pick(rng, LAB_ANALYTES)} panel marker ${extra}`;
    const age = pick(rng, AGE_GROUPS);
    const base = rng() * 80 + 5;
    items.push({
      analyte,
      loincHint: `${20000 + extra}-${extra % 7}`,
      sex: pick(rng, SEXES),
      ageGroup: age.key,
      ageMinDays: age.minDays,
      ageMaxDays: age.maxDays,
      unit: pick(rng, LOINC_UNITS),
      low: +(base * 0.75).toFixed(2),
      high: +(base * 1.5).toFixed(2),
      criticalLow: +(base * 0.2).toFixed(2),
      criticalHigh: +(base * 3).toFixed(2),
      specimen: pick(rng, specimens),
    });
  }
  await writeSplitDataset(root, stats, 'packages/shared/src/reference/lab-reference-ranges', 'LabReferenceRangeEntry', iface, items, (e) =>
    `  {
    analyte: '${escapeTs(e.analyte)}',
    loincHint: '${e.loincHint}',
    sex: '${e.sex}',
    ageGroup: '${e.ageGroup}',
    ageMinDays: ${e.ageMinDays},
    ageMaxDays: ${e.ageMaxDays},
    unit: '${escapeTs(e.unit)}',
    low: ${e.low},
    high: ${e.high},
    criticalLow: ${e.criticalLow ?? 'null'},
    criticalHigh: ${e.criticalHigh ?? 'null'},
    specimen: '${e.specimen}',
  },`, 12);
}

export async function generateReferenceIndex(root, stats) {
  const content = `${SYNTHETIC_NOTICE}
export * from './icd10';
export * from './cpt';
export * from './loinc';
export * from './rxnorm';
export * from './snomed';
export * from './allergens';
export * from './vaccine-cvx';
export * from './drug-interactions';
export * from './lab-reference-ranges';
`;
  await writeFile(root, 'packages/shared/src/reference/index.ts', content, stats);
}

export async function wireSharedIndex(root, stats) {
  const sharedIndexPath = 'packages/shared/src/index.ts';
  const exportLine = "export * from './reference';";
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const fullPath = path.join(root, sharedIndexPath);
  let existing = '';
  try {
    existing = await fs.readFile(fullPath, 'utf8');
  } catch {
    existing = '';
  }
  if (!existing.includes(exportLine)) {
    const merged = existing.trimEnd() + '\n' + exportLine + '\n';
    await fs.writeFile(fullPath, merged, 'utf8');
    stats.record(sharedIndexPath + ' (reference export)', exportLine + '\n');
  }
}

export async function generateReferenceDatasets(root, stats) {
  await generateIcd10(root, stats);
  await generateCpt(root, stats);
  await generateLoinc(root, stats);
  await generateRxnorm(root, stats);
  await generateSnomed(root, stats);
  await generateAllergens(root, stats);
  await generateVaccineCvx(root, stats);
  await generateDrugInteractions(root, stats);
  await generateLabReferenceRanges(root, stats);
  await generateReferenceIndex(root, stats);
  await wireSharedIndex(root, stats);
}
