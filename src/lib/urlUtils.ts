/**
 * Client-side URL generation utilities
 * Use these functions to generate product URLs consistently
 */

/**
 * Get the product URL with optional encryption
 * Note: Encryption is controlled by NEXT_PUBLIC_ENABLE_URL_ENCRYPTION environment variable
 */
export function getProductUrl(slug: string | undefined): string {
  if (!slug) return '/products';
  
  // For now, encryption is disabled by default
  // To enable, set NEXT_PUBLIC_ENABLE_URL_ENCRYPTION=true in your environment
  const encryptionEnabled = process.env.NEXT_PUBLIC_ENABLE_URL_ENCRYPTION === 'true';
  
  if (!encryptionEnabled) {
    return `/products/${slug}`;
  }
  
  // Only encode on client side to avoid hydration mismatch
  if (typeof window !== 'undefined') {
    const encoded = encodeSlug(slug);
    return `/products/${encoded}`;
  }
  
  // Server-side: use plain slug
  return `/products/${slug}`;
}

/**
 * Client-side slug encoding (same as server-side but for browser)
 */
function encodeSlug(slug: string): string {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(slug);
    const base64 = btoa(String.fromCharCode(...data));
    
    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  } catch (error) {
    console.error('Error encoding slug:', error);
    return slug;
  }
}

/**
 * Get absolute URL for sharing
 */
export function getAbsoluteProductUrl(slug: string | undefined): string {
  const relativePath = getProductUrl(slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                  (typeof window !== 'undefined' ? window.location.origin : '');
  return `${baseUrl}${relativePath}`;
}

/**
 * Get absolute image URL for sharing
 */
export function getAbsoluteImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return '';
  
  // Already absolute
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Make relative URLs absolute
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                  (typeof window !== 'undefined' ? window.location.origin : '');
  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
}
