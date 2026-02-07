# Domain Configuration Guide for Vercel

## Current Status
Your domains `elitedrug.org` and `www.elitedrug.org` are showing as "Invalid Configuration" on Vercel.

## Steps to Fix Domain Configuration

### 1. Verify DNS Settings at Your Domain Registrar

Go to your domain registrar (where you bought elitedrug.org) and add these DNS records:

#### For root domain (elitedrug.org):
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
```

#### For www subdomain (www.elitedrug.org):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**OR** use Vercel nameservers (recommended):
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### 2. Update Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **elite-drug**
3. Go to **Settings** → **Domains**
4. Make sure both domains are added:
   - `elitedrug.org`
   - `www.elitedrug.org`
5. Wait for DNS propagation (can take 24-48 hours, but usually 5-15 minutes)

### 3. Update Environment Variables on Vercel

1. Go to **Settings** → **Environment Variables**
2. Find `NEXT_PUBLIC_BASE_URL`
3. Update value to: `https://elitedrug.org`
4. Apply to: **Production**, **Preview**, and **Development**
5. Click **Save**

### 4. Redeploy Your Application

After updating environment variables:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click the **⋯** menu → **Redeploy**
4. Or push a new commit to trigger automatic deployment

### 5. Verify SSL Certificate

After DNS is configured, Vercel will automatically provision SSL certificates for both domains. This usually takes a few minutes.

## Environment Variables Updated

The following files have been updated with the new domain:
- ✅ `.env.production` → `NEXT_PUBLIC_BASE_URL=https://elitedrug.org`
- ✅ `vercel-env-variables.txt` → Updated for Vercel dashboard
- ✅ `src/app/products/[slug]/page.tsx` → Updated fallback URL

## Important Notes

1. **DNS Propagation**: Can take up to 48 hours, but usually 5-15 minutes
2. **SSL Certificate**: Automatically provisioned by Vercel once DNS is verified
3. **Redirection**: Set `www.elitedrug.org` to redirect to `elitedrug.org` (or vice versa) in Vercel settings
4. **Environment Variables**: Must be updated on Vercel dashboard, not just in code

## Troubleshooting

### If domains still show "Invalid Configuration":

1. **Check DNS propagation**: Use [WhatsMyDNS.net](https://www.whatsmydns.net/)
2. **Verify A Record**: Should point to `76.76.21.21` (Vercel's IP)
3. **Check CNAME**: `www` should point to `cname.vercel-dns.com`
4. **Remove and Re-add**: Try removing the domain from Vercel and adding it again
5. **Contact Support**: Reach out to Vercel support if issues persist

## Current Domain Status

- [x] Code updated to use `elitedrug.org`
- [ ] DNS records configured at registrar
- [ ] Domains verified on Vercel
- [ ] Environment variables updated on Vercel dashboard
- [ ] SSL certificate provisioned
- [ ] Application redeployed

## Next Steps

1. Configure DNS records at your domain registrar
2. Wait for DNS propagation
3. Update `NEXT_PUBLIC_BASE_URL` environment variable on Vercel dashboard
4. Redeploy the application
5. Verify both `elitedrug.org` and `www.elitedrug.org` are working

---

**Need Help?** Check [Vercel's Domain Documentation](https://vercel.com/docs/concepts/projects/domains)
