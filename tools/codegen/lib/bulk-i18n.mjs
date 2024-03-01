import { createRng, pick } from './bulk-seed.mjs';
import { writeFile } from './expansion-utils.mjs';

const I18N_CATEGORIES = [
  'common', 'navigation', 'patient', 'clinical', 'laboratory', 'radiology',
  'pharmacy', 'billing', 'insurance', 'admin', 'telemedicine', 'analytics',
  'notifications', 'errors', 'validation', 'appointments', 'medications',
  'allergies', 'vitals', 'documents', 'reports', 'settings', 'auth',
];

const UI_TERMS_EN = [
  'Save', 'Cancel', 'Submit', 'Delete', 'Edit', 'View', 'Search', 'Filter',
  'Export', 'Import', 'Print', 'Refresh', 'Back', 'Next', 'Previous', 'Close',
  'Confirm', 'Approve', 'Reject', 'Sign', 'Cosign', 'Acknowledge', 'Override',
  'Patient', 'Provider', 'Encounter', 'Order', 'Result', 'Prescription', 'Claim',
  'Invoice', 'Appointment', 'Allergy', 'Medication', 'Diagnosis', 'Procedure',
  'Vital Signs', 'Lab Order', 'Imaging Study', 'Critical Value', 'Prior Authorization',
  'Active', 'Inactive', 'Pending', 'Completed', 'Cancelled', 'Draft', 'Final',
  'Blood Pressure', 'Heart Rate', 'Temperature', 'Respiratory Rate', 'Oxygen Saturation',
  'Hemoglobin', 'Glucose', 'Creatinine', 'Sodium', 'Potassium', 'White Blood Cell Count',
  'Emergency', 'Urgent', 'Routine', 'Stat', 'Inpatient', 'Outpatient', 'Observation',
  'Admission', 'Discharge', 'Transfer', 'Consultation', 'Follow-up', 'New Patient',
  'Medication Administration Record', 'Order Entry', 'Results Review', 'Care Plan',
  'Problem List', 'Clinical Notes', 'Discharge Summary', 'Operative Report',
  'Radiology Report', 'Pathology Report', 'Microbiology Culture', 'Blood Bank',
  'Formulary', 'Drug Interaction', 'Dosage', 'Route', 'Frequency', 'Refills',
  'Copay', 'Deductible', 'Coinsurance', 'Eligibility', 'Benefits', 'Payer',
  'Claim Status', 'Denial Reason', 'Appeal', 'Remittance', 'Payment Posting',
  'User Management', 'Role Assignment', 'Audit Log', 'System Configuration',
  'Two-Factor Authentication', 'Session Timeout', 'Password Policy', 'Break-Glass Access',
  'Video Visit', 'Waiting Room', 'Screen Share', 'Chat Message', 'Recording Consent',
  'Quality Measure', 'Benchmark', 'Dashboard', 'KPI', 'Cohort Analysis', 'Report Schedule',
  'Email Notification', 'SMS Alert', 'Push Notification', 'Delivery Status', 'Template',
  'Required field', 'Invalid format', 'Access denied', 'Session expired', 'Network error',
  'Successfully saved', 'Changes discarded', 'Operation completed', 'Please try again',
];

const TRANSLATIONS = {
  es: {
    Save: 'Guardar', Cancel: 'Cancelar', Submit: 'Enviar', Delete: 'Eliminar', Edit: 'Editar',
    View: 'Ver', Search: 'Buscar', Filter: 'Filtrar', Export: 'Exportar', Patient: 'Paciente',
    Provider: 'Proveedor', Active: 'Activo', Pending: 'Pendiente', Completed: 'Completado',
    Emergency: 'Emergencia', Urgent: 'Urgente', Routine: 'Rutina', Appointment: 'Cita',
    Medication: 'Medicamento', Allergy: 'Alergia', Diagnosis: 'Diagnóstico', Order: 'Orden',
    Result: 'Resultado', Prescription: 'Receta', Claim: 'Reclamación', Invoice: 'Factura',
  },
  fr: {
    Save: 'Enregistrer', Cancel: 'Annuler', Submit: 'Soumettre', Delete: 'Supprimer', Edit: 'Modifier',
    View: 'Voir', Search: 'Rechercher', Filter: 'Filtrer', Export: 'Exporter', Patient: 'Patient',
    Provider: 'Prestataire', Active: 'Actif', Pending: 'En attente', Completed: 'Terminé',
    Emergency: 'Urgence', Urgent: 'Urgent', Routine: 'Routine', Appointment: 'Rendez-vous',
    Medication: 'Médicament', Allergy: 'Allergie', Diagnosis: 'Diagnostic', Order: 'Commande',
    Result: 'Résultat', Prescription: 'Ordonnance', Claim: 'Réclamation', Invoice: 'Facture',
  },
  ar: {
    Save: 'حفظ', Cancel: 'إلغاء', Submit: 'إرسال', Delete: 'حذف', Edit: 'تعديل',
    View: 'عرض', Search: 'بحث', Filter: 'تصفية', Export: 'تصدير', Patient: 'مريض',
    Provider: 'مقدم الرعاية', Active: 'نشط', Pending: 'قيد الانتظار', Completed: 'مكتمل',
    Emergency: 'طوارئ', Urgent: 'عاجل', Routine: 'روتيني', Appointment: 'موعد',
    Medication: 'دواء', Allergy: 'حساسية', Diagnosis: 'تشخيص', Order: 'طلب',
    Result: 'نتيجة', Prescription: 'وصفة', Claim: 'مطالبة', Invoice: 'فاتورة',
  },
  de: {
    Save: 'Speichern', Cancel: 'Abbrechen', Submit: 'Absenden', Delete: 'Löschen', Edit: 'Bearbeiten',
    View: 'Anzeigen', Search: 'Suchen', Filter: 'Filtern', Export: 'Exportieren', Patient: 'Patient',
    Provider: 'Leistungserbringer', Active: 'Aktiv', Pending: 'Ausstehend', Completed: 'Abgeschlossen',
    Emergency: 'Notfall', Urgent: 'Dringend', Routine: 'Routine', Appointment: 'Termin',
    Medication: 'Medikament', Allergy: 'Allergie', Diagnosis: 'Diagnose', Order: 'Auftrag',
    Result: 'Ergebnis', Prescription: 'Rezept', Claim: 'Anspruch', Invoice: 'Rechnung',
  },
};

function translateTerm(lang, term, rng) {
  const map = TRANSLATIONS[lang];
  if (map && map[term]) return map[term];
  if (lang === 'en') return term;
  return `[${lang}] ${term}`;
}

function generateLocale(lang) {
  const rng = createRng(lang.charCodeAt(0) * 1000);
  const catalog = {
    _meta: {
      locale: lang,
      description: 'MedSphere medical UI string catalog (synthetic development artifact)',
      version: '1.0.0',
    },
  };

  for (const category of I18N_CATEGORIES) {
    catalog[category] = {};
    for (let i = 0; i < 200; i++) {
      const baseTerm = pick(rng, UI_TERMS_EN);
      const key = `${category}.${baseTerm.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${i}`;
      const suffix = i > 0 ? ` (${category} ${i})` : '';
      catalog[category][key.split('.')[1]] = translateTerm(lang, baseTerm, rng) + (lang === 'en' ? suffix : '');
    }

    catalog[category].title = translateTerm(lang, category.charAt(0).toUpperCase() + category.slice(1), rng);
    catalog[category].description = translateTerm(lang, `${category} module strings`, rng);
  }

  for (let m = 0; m < 500; m++) {
    const cat = pick(rng, I18N_CATEGORIES);
    const term1 = pick(rng, UI_TERMS_EN);
    const term2 = pick(rng, UI_TERMS_EN);
    const key = `message_${m}`;
    catalog[cat][key] = lang === 'en'
      ? `${term1}: ${term2} — message ${m + 1}`
      : translateTerm(lang, `${term1}: ${term2}`, rng);
  }

  return JSON.stringify(catalog, null, 2);
}

function generateI18nIndex() {
  return `/** MedSphere i18n utilities */
export type SupportedLocale = 'en' | 'es' | 'fr' | 'ar' | 'de';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'es', 'fr', 'ar', 'de'];

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
  de: 'Deutsch',
};

export async function loadCatalog(locale: SupportedLocale): Promise<Record<string, unknown>> {
  switch (locale) {
    case 'en': return (await import('./en.json')).default;
    case 'es': return (await import('./es.json')).default;
    case 'fr': return (await import('./fr.json')).default;
    case 'ar': return (await import('./ar.json')).default;
    case 'de': return (await import('./de.json')).default;
    default: return (await import('./en.json')).default;
  }
}

export function translateKey(catalog: Record<string, Record<string, string>>, category: string, key: string): string {
  return catalog[category]?.[key] ?? key;
}
`;
}

export async function generateI18n(root, stats) {
  const locales = ['en', 'es', 'fr', 'ar', 'de'];
  for (const lang of locales) {
    await writeFile(root, `packages/shared/src/i18n/${lang}.json`, generateLocale(lang), stats);
  }
  await writeFile(root, 'packages/shared/src/i18n/index.ts', generateI18nIndex(), stats);
}

export async function wireSharedI18nExport(root, stats) {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const exportLine = "export * from './i18n';";
  const fullPath = path.join(root, 'packages/shared/src/index.ts');
  let existing = await fs.readFile(fullPath, 'utf8');
  if (!existing.includes(exportLine)) {
    await fs.writeFile(fullPath, existing.trimEnd() + '\n' + exportLine + '\n', 'utf8');
    stats.record('packages/shared/src/index.ts (i18n export)', exportLine + '\n');
  }
}
