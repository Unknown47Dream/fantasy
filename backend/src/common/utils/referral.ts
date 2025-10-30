import { randomBytes } from 'crypto';

/**
 * Generates a random referral code
 * Uses uppercase letters and numbers (excluding similar-looking characters: 0, O, I, 1)
 * Length: 6 characters
 */
export function generateReferralCode(): string {
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const bytes = randomBytes(6);
  let code = '';

  for (let i = 0; i < 6; i++) {
    code += alphabet[bytes[i] % alphabet.length];
  }

  return code;
}
