/**
 * Input sanitization utilities for MedSphere API handlers.
 * Strips dangerous HTML/script content and normalizes user input.
 */

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
};

const CONTROL_CHAR_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const SCRIPT_TAG_REGEX = /<\s*\/?\s*script\b[^>]*>/gi;
const EVENT_HANDLER_REGEX = /\bon\w+\s*=/gi;
const JAVASCRIPT_URL_REGEX = /javascript\s*:/gi;

export interface SanitizeOptions {
  /** Maximum string length after sanitization */
  maxLength?: number;
  /** Allow basic markdown-style formatting */
  allowBasicFormatting?: boolean;
  /** Trim whitespace */
  trim?: boolean;
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"'`/]/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

export function stripControlCharacters(value: string): string {
  return value.replace(CONTROL_CHAR_REGEX, '');
}

export function stripDangerousHtml(value: string): string {
  return value
    .replace(SCRIPT_TAG_REGEX, '')
    .replace(EVENT_HANDLER_REGEX, '')
    .replace(JAVASCRIPT_URL_REGEX, '');
}

export function sanitizeString(
  value: unknown,
  options: SanitizeOptions = {},
): string {
  if (value === null || value === undefined) {
    return '';
  }

  let result = String(value);
  result = stripControlCharacters(result);
  result = stripDangerousHtml(result);

  if (!options.allowBasicFormatting) {
    result = escapeHtml(result);
  }

  if (options.trim !== false) {
    result = result.trim();
  }

  if (options.maxLength !== undefined && result.length > options.maxLength) {
    result = result.slice(0, options.maxLength);
  }

  return result;
}

export function sanitizeEmail(value: unknown): string {
  const sanitized = sanitizeString(value, { maxLength: 320 }).toLowerCase();
  return sanitized.replace(/[^\w.@+-]/g, '');
}

export function sanitizePhone(value: unknown): string {
  return sanitizeString(value, { maxLength: 32 }).replace(/[^\d+\-().\s]/g, '');
}

export function sanitizeUuid(value: unknown): string {
  return sanitizeString(value, { maxLength: 36 }).replace(/[^0-9a-f-]/gi, '');
}

export function sanitizeObject<T extends Record<string, unknown>>(
  input: T,
  fieldRules: Partial<Record<keyof T, SanitizeOptions>>,
): T {
  const result = { ...input };
  for (const [key, rules] of Object.entries(fieldRules)) {
    const raw = result[key as keyof T];
    if (typeof raw === 'string') {
      (result as Record<string, unknown>)[key] = sanitizeString(raw, rules);
    }
  }
  return result;
}

export function sanitizeSearchQuery(value: unknown, maxLength = 200): string {
  return sanitizeString(value, { maxLength })
    .replace(/[%_\\]/g, '')
    .replace(/\s+/g, ' ');
}
