# Domain Configuration Guide for Vercel with Cloudflare

## Current Status
Your domain `elitedrug.org` is using **Cloudflare** DNS/proxy, which is causing a connection issue with Vercel.

**Error**: "Cloudflare protects this website. But, something went wrong trying to reach it"

## Quick Fix Options

### Option 1: Configure Cloudflare to Work with Vercel (Recommended)

#### Step 1: Update DNS Records in Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your domain: **elitedrug.org**
3. Go to **DNS** → **Records**
4. Update/Add these records:

**For root domain (elitedrug.org):**
```
Type: A
Name: @ (or elitedrug.org)
IPv4 Address: 76.76.21.21
Proxy status: DNS only (click the orange cloud to turn it gray)
TTL: Auto
```

**For www subdomain:**
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (gray cloud, NOT proxied)
TTL: Auto
```

⚠️ **IMPORTANT**: Set proxy status to **DNS only** (gray cloud icon), not **Proxied** (orange cloud). Cloudflare proxy interferes with Vercel's SSL and routing.

#### Step 2: Configure SSL/TLS Settings in Cloudflare

1. Go to **SSL/TLS** tab in Cloudflare
2. Set encryption mode to: **Full** or **Full (strict)**
3. Go to **Edge Certificates**
4. Enable **Always Use HTTPS**

#### Step 3: Add Domain on Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select project: **elite-drug**
3. Go to **Settings** → **Domains**
4. Add both domains:
   - `elitedrug.org`
   - `www.elitedrug.org`
5. Wait for verification (usually 5-10 minutes)

### Option 2: Remove Cloudflare (Use Vercel DNS Only)

If you don't need Cloudflare's features:

1. Go to Cloudflare Dashboard
2. Select **elitedrug.org**
3. Go to **DNS** → **Records**
4. Delete all existing records
5. OR change nameservers back to your domain registrar
6. Then follow Vercel's standard DNS setup (see below)

### Option 3: Use Vercel Nameservers (Simplest)

1. Go to Vercel Dashboard → elite-drug project → Settings → Domains
2. Add `elitedrug.org`
3. Vercel will provide nameservers like:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. Go to your domain registrar (NOT Cloudflare)
5. Update nameservers to Vercel's nameservers
6. Remove domain from Cloudflare completely

## Recommended Solution

**Use Option 1** - Keep Cloudflare but configure it properly:
- Benefits: DDoS protection, CDN, analytics
- Change Cloudflare DNS records to point to Vercel
- Set proxy to **DNS only** (gray cloud)
- This allows Cloudflare DNS management while Vercel handles the hosting

## Current Configuration Issues

❌ **Problem**: Cloudflare is proxying traffic (orange cloud enabled)
❌ **Issue**: Cloudflare can't reach Vercel's origin server properly
❌ **Result**: "Something went wrong" error from Cloudflare

✅ **Solution**: Set Cloudflare to **DNS only** mode for Vercel domains

## Step-by-Step Fix (Cloudflare + Vercel)

### 1. Cloudflare Dashboard Changes

```
Login to Cloudflare → Select elitedrug.org → DNS → Records

DELETE all existing A/CNAME records for @ and www
Then ADD:

Record 1:
Type: A
Name: @
Content: 76.76.21.21
Proxy: OFF (gray cloud) ← CRITICAL
TTL: Auto

Record 2:
Type: CNAME
Name: www
Content: cname.vercel-dns.com
Proxy: OFF (gray cloud) ← CRITICAL
TTL: Auto
```

### 2. Cloudflare SSL/TLS Settings

```
SSL/TLS Tab:
- Overview → Encryption mode: Full (strict)
- Edge Certificates → Always Use HTTPS: ON
- Edge Certificates → Minimum TLS Version: 1.2
```

### 3. Vercel Dashboard

```
Project Settings → Domains:
- Add: elitedrug.org
- Add: www.elitedrug.org
- Wait for verification
```

### 4. Update Environment Variable

```
Vercel → Settings → Environment Variables:
- Variable: NEXT_PUBLIC_BASE_URL
- Value: https://elitedrug.org
- Apply to: Production, Preview, Development
- Save & Redeploy
```

### 5. Verify

### 5. Verify

Wait 5-10 minutes, then test:
- Visit https://elitedrug.org
- Visit https://www.elitedrug.org
- Both should work without Cloudflare errors

## Why This Happens

**Cloudflare Proxy (Orange Cloud)**:
- Routes traffic through Cloudflare's network first
- Cloudflare needs to know where to send traffic (origin server)
- If misconfigured, Cloudflare can't reach Vercel = error page

**DNS Only (Gray Cloud)**:
- Acts as simple DNS resolver
- Points domain directly to Vercel's IP
- Vercel handles all requests, SSL, and routing
- Recommended for Vercel deployments

## Troubleshooting

### Still Getting Cloudflare Error?

1. **Check Cloudflare DNS**:
   - Verify A record points to `76.76.21.21`
   - Verify CNAME points to `cname.vercel-dns.com`
   - Verify proxy is **OFF** (gray cloud)

2. **Clear Cloudflare Cache**:
   - Go to Caching → Configuration
   - Click "Purge Everything"

3. **Check Cloudflare SSL Mode**:
   - Must be "Full" or "Full (strict)"
   - NOT "Flexible" (causes redirect loops)

4. **Wait for DNS Propagation**:
   - Use [WhatsMyDNS.net](https://www.whatsmydns.net/)
   - Check if elitedrug.org resolves to 76.76.21.21

5. **Verify on Vercel**:
   - Domains should show green checkmark
   - SSL certificate should be "Valid"

### If Nothing Works

1. **Temporarily Disable Cloudflare**:
   - Cloudflare → DNS → Pause Cloudflare on Site
   - Test if site works without Cloudflare
   - If yes, issue is Cloudflare configuration

2. **Contact Support**:
   - Cloudflare Support (if DNS/proxy issue)
   - Vercel Support (if domain verification fails)

## Environment Variables Updated

The following files have been updated with the new domain:
- ✅ `.env.production` → `NEXT_PUBLIC_BASE_URL=https://elitedrug.org`
- ✅ `vercel-env-variables.txt` → Updated for Vercel dashboard
- ✅ `src/app/products/[slug]/page.tsx` → Updated fallback URL

## Important Notes

1. **Cloudflare Proxy**: MUST be disabled (gray cloud) for Vercel
2. **DNS Propagation**: Usually 5-10 minutes with Cloudflare
3. **SSL**: Cloudflare SSL mode must be "Full" or "Full (strict)"
4. **Vercel Environment Variables**: Update on dashboard, then redeploy

## Current Domain Status

- [x] Code updated to use `elitedrug.org`
- [ ] Cloudflare DNS records configured (A + CNAME)
- [ ] Cloudflare proxy disabled (gray cloud)
- [ ] Cloudflare SSL mode set to "Full (strict)"
- [ ] Domains added and verified on Vercel
- [ ] Environment variables updated on Vercel dashboard
- [ ] SSL certificate provisioned by Vercel
- [ ] Application redeployed

## Next Steps (URGENT)

1. **Go to Cloudflare Dashboard** → DNS → Records
2. **Set proxy to DNS only** (gray cloud) for both @ and www records
3. **Update A record**: @ → 76.76.21.21 (DNS only)
4. **Update CNAME**: www → cname.vercel-dns.com (DNS only)
5. **Cloudflare SSL/TLS** → Set to "Full (strict)"
6. **Go to Vercel Dashboard** → Add domains
7. **Update NEXT_PUBLIC_BASE_URL** on Vercel
8. **Redeploy** application
9. **Test** both URLs after 5-10 minutes

---

**Need Help?**
- [Vercel + Cloudflare Guide](https://vercel.com/docs/concepts/projects/domains/cloudflare)
- [Vercel Domain Docs](https://vercel.com/docs/concepts/projects/domains)
- [Cloudflare DNS Docs](https://developers.cloudflare.com/dns/)

