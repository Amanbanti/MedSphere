/** MedSphere i18n utilities */
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
