import { Injectable } from '@nestjs/common';
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

@Injectable()
export class TotpService {
  generateSecret(): string {
    const buffer = randomBytes(20);
    return this.base32Encode(buffer);
  }

  buildOtpAuthUrl(secret: string, email: string, issuer = 'MedSphere'): string {
    const label = encodeURIComponent(`${issuer}:${email}`);
    const iss = encodeURIComponent(issuer);
    return `otpauth://totp/${label}?secret=${secret}&issuer=${iss}&algorithm=SHA1&digits=6&period=30`;
  }

  verify(token: string, secret: string, window = 1): boolean {
    const counter = Math.floor(Date.now() / 1000 / 30);
    for (let offset = -window; offset <= window; offset += 1) {
      const expected = this.generateTotp(secret, counter + offset);
      if (this.safeCompare(token, expected)) {
        return true;
      }
    }
    return false;
  }

  private generateTotp(secret: string, counter: number): string {
    const key = this.base32Decode(secret);
    const buffer = Buffer.alloc(8);
    buffer.writeBigInt64BE(BigInt(counter));

    const hmac = createHmac('sha1', key).update(buffer).digest();
    const offset = hmac[hmac.length - 1]! & 0x0f;
    const binary =
      ((hmac[offset]! & 0x7f) << 24) |
      ((hmac[offset + 1]! & 0xff) << 16) |
      ((hmac[offset + 2]! & 0xff) << 8) |
      (hmac[offset + 3]! & 0xff);
    const otp = (binary % 1_000_000).toString().padStart(6, '0');
    return otp;
  }

  private base32Encode(buffer: Buffer): string {
    let bits = 0;
    let value = 0;
    let output = '';

    for (let i = 0; i < buffer.length; i += 1) {
      value = (value << 8) | buffer[i]!;
      bits += 8;
      while (bits >= 5) {
        output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }

    if (bits > 0) {
      output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
    }

    return output;
  }

  private base32Decode(input: string): Buffer {
    const cleaned = input.replace(/=+$/, '').toUpperCase();
    let bits = 0;
    let value = 0;
    const output: number[] = [];

    for (const char of cleaned) {
      const idx = BASE32_ALPHABET.indexOf(char);
      if (idx === -1) {
        continue;
      }
      value = (value << 5) | idx;
      bits += 5;
      if (bits >= 8) {
        output.push((value >>> (bits - 8)) & 0xff);
        bits -= 8;
      }
    }

    return Buffer.from(output);
  }

  private safeCompare(a: string, b: string): boolean {
    const aBuf = Buffer.from(a);
    const bBuf = Buffer.from(b);
    if (aBuf.length !== bBuf.length) {
      return false;
    }
    return timingSafeEqual(aBuf, bBuf);
  }
}
