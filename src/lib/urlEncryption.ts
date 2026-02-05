/**
 * URL Encryption/Obfuscation utilities
 * Uses Base64 encoding with custom character substitution for URL safety
 */

/**
 * Encode a slug to an obfuscated format
 * @param slug - The original slug
 * @returns Encoded slug string
 */
export function encodeSlug(slug: string): string {
  try {
    // Convert to base64
    const base64 = Buffer.from(slug).toString('base64');
    
    // Make URL-safe by replacing characters
    const urlSafe = base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    return urlSafe;
  } catch (error) {
    console.error('Error encoding slug:', error);
    return slug;
  }
}

/**
 * Decode an obfuscated slug back to original format
 * @param encoded - The encoded slug
 * @returns Decoded slug string
 */
export function decodeSlug(encoded: string): string {
  try {
    // Restore base64 format
    let base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // Decode from base64
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    return decoded;
  } catch (error) {
    console.error('Error decoding slug:', error);
    return encoded;
  }
}

/**
 * Check if URL encryption is enabled (can be toggled via environment variable)
 */
export function isEncryptionEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_URL_ENCRYPTION === 'true';
}

/**
 * Get the slug to use in URLs (encrypted or plain based on settings)
 */
export function getUrlSlug(originalSlug: string): string {
  return isEncryptionEnabled() ? encodeSlug(originalSlug) : originalSlug;
}

/**
 * Get the original slug from a URL slug (decode if encrypted)
 */
export function getOriginalSlug(urlSlug: string): string {
  return isEncryptionEnabled() ? decodeSlug(urlSlug) : urlSlug;
}
