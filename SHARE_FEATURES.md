# Share Functionality & URL Encryption

## Overview

This document explains the enhanced share functionality and optional URL encryption features for product pages.

## Features

### 1. Absolute Image URLs for Social Sharing

**What it does:**
- Ensures all shared images use complete URLs (with domain)
- Enables proper image embedding in WhatsApp, Facebook, Twitter, LinkedIn previews
- Improves social media sharing experience with rich previews

**How it works:**
- Images from Cloudinary (already absolute) are used as-is
- Relative images are converted to absolute URLs using `NEXT_PUBLIC_BASE_URL`
- Open Graph and Twitter Card metadata use absolute image URLs
- ShareButtons component automatically handles URL conversion

**Configuration:**
Set your production URL in Vercel environment variables:
```
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### 2. URL Encryption/Obfuscation (Optional)

**What it does:**
- Optionally obfuscates product URLs using Base64 encoding
- Makes URLs less human-readable for security/privacy
- Example: `/products/paracetamol-500mg` → `/products/cGFyYWNldGFtb2wtNTAwbWc`

**How to enable:**
Add this environment variable in Vercel:
```
NEXT_PUBLIC_ENABLE_URL_ENCRYPTION=true
```

**How it works:**
1. Product slugs are encoded using URL-safe Base64
2. Server-side decoding happens in `src/app/products/[slug]/page.tsx`
3. Client-side encoding happens when generating links
4. Fully reversible - no data loss

**Technical Details:**
- Uses `Buffer.from()` on server, `TextEncoder` on client
- Base64 with URL-safe character substitution (`+` → `-`, `/` → `_`)
- Removes padding (`=`) for cleaner URLs
- Gracefully falls back to original slug on encoding errors

### 3. Enhanced ShareButtons Component

**Supported Platforms:**
- WhatsApp - shares with image URL and product link
- Facebook - uses Open Graph metadata for rich preview
- Twitter - uses Twitter Card metadata for image preview
- LinkedIn - uses Open Graph metadata
- Email - includes image URL in email body
- Copy Link - copies URL to clipboard

**Features:**
- Animated share icons with gradient effects
- "Link copied" confirmation
- Hover states with color transitions
- Dark mode support
- Mobile responsive

## File Structure

```
src/
├── lib/
│   ├── urlEncryption.ts    # Server-side encoding/decoding
│   └── urlUtils.ts         # Client-side URL utilities
├── components/
│   └── ShareButtons.tsx    # Enhanced share component
└── app/
    └── products/
        └── [slug]/
            ├── page.tsx            # Server component with slug decoding
            └── ProductPageClient.tsx # Client component with share
```

## API Reference

### `src/lib/urlEncryption.ts`

**Server-side utilities (Node.js Buffer API):**

```typescript
encodeSlug(slug: string): string
// Encodes a slug to Base64 URL-safe format

decodeSlug(encoded: string): string
// Decodes an encoded slug back to original

isEncryptionEnabled(): boolean
// Checks if URL encryption is enabled

getUrlSlug(originalSlug: string): string
// Returns encrypted slug if enabled, original otherwise

getOriginalSlug(urlSlug: string): string
// Returns decoded slug if encryption enabled, original otherwise
```

### `src/lib/urlUtils.ts`

**Client-side utilities (Browser APIs):**

```typescript
getProductUrl(slug?: string): string
// Generates relative product URL (/products/...)
// Uses encrypted slug if NEXT_PUBLIC_ENABLE_URL_ENCRYPTION=true

getAbsoluteProductUrl(slug?: string): string
// Generates absolute product URL (https://domain.com/products/...)
// Uses NEXT_PUBLIC_BASE_URL or window.location.origin

getAbsoluteImageUrl(imageUrl?: string): string
// Converts relative image URLs to absolute
// Passes through Cloudinary URLs unchanged
```

### `src/components/ShareButtons.tsx`

**Props:**
```typescript
interface ShareButtonsProps {
  url: string;          // Absolute product URL
  title: string;        // Product name
  description?: string; // Product description
  imageUrl?: string;    // Absolute image URL
}
```

## Usage Examples

### Basic Product Link
```tsx
import { getProductUrl } from '@/lib/urlUtils';

<Link href={getProductUrl(product.slug)}>
  {product.name}
</Link>
```

### Share Buttons
```tsx
import ShareButtons from '@/components/ShareButtons';
import { getAbsoluteProductUrl, getAbsoluteImageUrl } from '@/lib/urlUtils';

<ShareButtons 
  url={getAbsoluteProductUrl(product.slug)}
  title={product.name}
  description={product.shortDescription}
  imageUrl={getAbsoluteImageUrl(product.images.main)}
/>
```

### Open Graph Metadata
```tsx
const absoluteImageUrl = productImage.startsWith('http') 
  ? productImage 
  : `${baseUrl}${productImage}`;

return {
  openGraph: {
    images: [{ url: absoluteImageUrl, width: 1200, height: 630 }]
  }
}
```

## Environment Variables

Required for full functionality:

```bash
# Production domain (REQUIRED for proper social sharing)
NEXT_PUBLIC_BASE_URL=https://elite-drug.vercel.app

# Optional: Enable URL encryption
NEXT_PUBLIC_ENABLE_URL_ENCRYPTION=true

# Supabase (existing)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SERVICE_ROLE_KEY=...

# Cloudinary (existing)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...

# Admin & Auth (existing)
ADMIN_EMAIL=...
ADMIN_PASSWORD_HASH=...
JWT_SECRET=...
```

## Testing

### Test Absolute Image URLs
1. Deploy to Vercel with `NEXT_PUBLIC_BASE_URL` set
2. Share a product on WhatsApp/Facebook
3. Verify rich preview appears with product image

### Test URL Encryption
1. Set `NEXT_PUBLIC_ENABLE_URL_ENCRYPTION=true` in Vercel
2. Deploy and visit any product page
3. Observe encoded slug in address bar
4. Click product links - should navigate correctly
5. Share product - recipients should be able to open link

### Test Social Sharing
1. Open any product page
2. Click each share button (WhatsApp, Facebook, Twitter, etc.)
3. Verify:
   - Product name appears correctly
   - Product description is included
   - Image preview loads (on platforms that support it)
   - Link works when clicked

## Troubleshooting

### Images not appearing in shares
- Check `NEXT_PUBLIC_BASE_URL` is set correctly
- Verify images are accessible publicly (not behind auth)
- Test Open Graph tags with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- Check browser console for CORS errors

### Encrypted URLs not working
- Ensure `NEXT_PUBLIC_ENABLE_URL_ENCRYPTION=true` (exact spelling)
- Check server logs for decoding errors
- Verify both encoding and decoding use same algorithm
- Test with simple slugs first (no special characters)

### "Link copied" not working
- Check browser supports `navigator.clipboard` API
- Ensure site is served over HTTPS (required for clipboard API)
- Test in different browsers

## Performance Impact

- **URL Encryption:** Negligible (simple Base64 encoding/decoding)
- **Absolute URLs:** No performance impact (just string concatenation)
- **ShareButtons:** Minimal (only loads when product page is viewed)

## Security Considerations

- URL encryption provides **obfuscation only**, not cryptographic security
- Product data is still publicly accessible via API
- Don't rely on URL encryption for access control
- Use proper authentication for sensitive products
- All images should be served over HTTPS

## Future Enhancements

Potential improvements:
- Add more social platforms (Pinterest, Reddit, Telegram)
- Implement cryptographic URL signing (HMAC)
- Add share analytics tracking
- Support dynamic Open Graph images (generate custom preview images)
- Add QR code generation for product sharing
- Native Web Share API for mobile devices
