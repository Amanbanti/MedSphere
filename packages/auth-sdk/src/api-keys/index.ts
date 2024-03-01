/**
 * API key generation and verification utilities.
 */

import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import { API_KEY_PREFIX } from '@medsphere/shared';

export interface GeneratedApiKey {
  rawKey: string;
  keyPrefix: string;
  keyHash: string;
}

export function generateApiKey(): GeneratedApiKey {
  const secret = randomBytes(32).toString('base64url');
  const rawKey = `${API_KEY_PREFIX}${secret}`;
  const keyPrefix = rawKey.slice(0, 12);
  const keyHash = hashApiKey(rawKey);
  return { rawKey, keyPrefix, keyHash };
}

export function hashApiKey(rawKey: string): string {
  return createHash('sha256').update(rawKey).digest('hex');
}

export function verifyApiKey(rawKey: string, keyHash: string): boolean {
  const computed = Buffer.from(hashApiKey(rawKey), 'hex');
  const expected = Buffer.from(keyHash, 'hex');
  if (computed.length !== expected.length) {
    return false;
  }
  return timingSafeEqual(computed, expected);
}

export function looksLikeApiKey(value: string): boolean {
  return value.startsWith(API_KEY_PREFIX) && value.length > 20;
}
