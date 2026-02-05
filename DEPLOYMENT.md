# 🚀 Deployment Guide - Elite Drug E-commerce

## 📋 Pre-Deployment Checklist

### 1. Security (CRITICAL)
- [ ] Generate new JWT secret (64+ characters)
- [ ] Rotate Supabase keys (create new project or regenerate)
- [ ] Create new Cloudinary credentials
- [ ] Get new Perplexity API key
- [ ] Review SECURITY.md for best practices
- [ ] Verify .env.local is gitignored

### 2. Code Quality
- [ ] All tests passing (if applicable)
- [ ] No console.log statements in production code
- [ ] All linting errors resolved
- [ ] Dependencies audited (npm audit)

### 3. Database
- [ ] Supabase production database created
- [ ] Database migrations applied
- [ ] Row Level Security (RLS) policies configured
- [ ] Admin tables properly secured

---

## 📦 GitHub Commands

### Initial Setup (First Time)

```powershell
# Pull latest changes
git pull origin main

# View current changes
git status

# Add all modified files
git add .

# Commit with descriptive message
git commit -m "Security fixes and feature updates

- Fixed authentication with bcrypt password hashing
- Added JWT_SECRET environment variable requirement
- Increased AI token limits (3500→6000)
- Added form re-rendering for AI-populated fields
- Implemented slug uniqueness checking
- Removed obsolete categories (Liver Care, Kidney Care, Derma Care)
- Resolved all npm vulnerabilities (0 vulnerabilities)
- Added SECURITY.md documentation"

# Push to GitHub
git push origin main

# Verify push
git status
```

### Regular Updates (After Initial Setup)

```powershell
# Check what changed
git status

# Review changes
git diff

# Stage specific files
git add src/components/CategorySection.tsx
git add src/app/api/admin/login/route.ts
# ... add other files as needed

# Or stage all changes
git add .

# Commit
git commit -m "Brief description of changes"

# Push
git push origin main
```

### Useful Git Commands

```powershell
# View commit history
git log --oneline -10

# Undo uncommitted changes
git restore <file>

# Create feature branch
git checkout -b feature/new-feature

# Switch back to main
git checkout main

# View remote repository
git remote -v

# Check for sensitive data before committing
git diff --cached | Select-String -Pattern "API_KEY|SECRET|PASSWORD"
```

---

## 🌐 Deployment Steps (Vercel - Recommended)

### Step 1: Prepare Production Environment

```powershell
# Generate new JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Save this output** - you'll need it for environment variables.

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Grant Vercel access to your repository

### Step 3: Import Project

1. Click "Add New Project"
2. Select your GitHub repository: `Elite`
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Step 4: Configure Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# JWT Authentication
JWT_SECRET=<paste-generated-secret-from-step-1>

# Supabase (Production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Cloudinary (Production)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-api-secret

# Perplexity AI
PERPLEXITY_API_KEY=pplx-your-production-key

# Application URL (will be your Vercel domain)
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

**Important:** 
- Add all variables to **Production** environment
- Also add to **Preview** and **Development** if needed
- Never use localhost URLs in production

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Vercel will provide a URL: `https://your-app.vercel.app`

### Step 6: Verify Deployment

```powershell
# Test production API
curl https://your-app.vercel.app/api/products

# Test admin login (should return 401 with wrong credentials)
curl -X POST https://your-app.vercel.app/api/admin/login `
  -H "Content-Type: application/json" `
  -d '{"email":"test@test.com","password":"wrong"}'

# Open in browser
Start-Process https://your-app.vercel.app
```

### Step 7: Custom Domain (Optional)

1. Vercel Dashboard → Settings → Domains
2. Add your custom domain: `www.elitedrug.com`
3. Configure DNS records (Vercel provides instructions)
4. Update `NEXT_PUBLIC_BASE_URL` to your custom domain

---

## 🔧 Alternative Deployment Platforms

### Option 1: Netlify

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Configure environment variables in Netlify Dashboard
```

### Option 2: Railway

1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically

### Option 3: DigitalOcean App Platform

1. Create new app from GitHub
2. Select repository
3. Configure environment variables
4. Choose plan ($5/month minimum)
5. Deploy

### Option 4: Self-Hosted (VPS)

```powershell
# Build application
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "elite-drug" -- start
pm2 save
pm2 startup
```

**Requirements:**
- Node.js 18+ installed
- Nginx or Apache as reverse proxy
- SSL certificate (Let's Encrypt)
- Process manager (PM2, systemd)

---

## 🗄️ Database Setup (Supabase Production)

### Step 1: Create Production Database

1. Go to [supabase.com](https://supabase.com)
2. Create new project: `elite-drug-production`
3. Choose region closest to users
4. Set strong database password

### Step 2: Run Migrations

```sql
-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  image TEXT NOT NULL,
  images TEXT[],
  composition TEXT,
  about TEXT,
  usage TEXT,
  benefits TEXT,
  side_effects TEXT,
  precautions TEXT,
  storage TEXT,
  manufacturer TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create announcements table
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Public can read active announcements"
  ON announcements FOR SELECT
  USING (is_active = true);

-- Admin write access (service role only)
-- Products table: service_role has full access by default
-- Announcements table: service_role has full access by default

-- Create indexes for performance
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_announcements_active ON announcements(is_active);
```

### Step 3: Migrate Existing Data (If Applicable)

```powershell
# Export from development database
# (Use Supabase Dashboard → Table Editor → Export)

# Import to production database
# (Use Supabase Dashboard → SQL Editor → Bulk Import)
```

### Step 4: Configure Storage (Cloudinary)

Cloudinary is already configured via environment variables. No additional setup needed.

---

## 📊 Post-Deployment Monitoring

### 1. Vercel Analytics

- Enable in Vercel Dashboard → Analytics
- Monitor page views, performance, errors

### 2. Supabase Monitoring

- Dashboard → Database → Performance
- Monitor query performance
- Set up database backups (automatic on paid plans)

### 3. Error Tracking (Optional)

```powershell
# Install Sentry
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard -i nextjs
```

### 4. Uptime Monitoring

- [UptimeRobot](https://uptimerobot.com) - Free, checks every 5 minutes
- [Pingdom](https://pingdom.com) - More detailed monitoring
- [StatusCake](https://statuscake.com) - Free tier available

---

## 🔄 Continuous Deployment

### Automatic Deployments (Vercel)

Once connected to GitHub, Vercel auto-deploys on:
- **Push to main** → Production deployment
- **Pull request** → Preview deployment

### Manual Deployment Control

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs <deployment-url>
```

---

## 🚨 Rollback Procedure

### If Deployment Fails:

1. **Vercel Dashboard** → Deployments
2. Find last working deployment
3. Click "Promote to Production"

### If Issues Found After Deployment:

```powershell
# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>

# Force push (use with caution)
git push origin main --force
```

---

## ✅ Production Checklist

### Before Going Live:
- [ ] All environment variables set correctly
- [ ] Database migrations applied
- [ ] SSL certificate active (automatic on Vercel)
- [ ] Custom domain configured (if applicable)
- [ ] Test admin login works
- [ ] Test product pages load
- [ ] Test AI features work
- [ ] Test image uploads work
- [ ] Admin dashboard accessible
- [ ] Mobile responsive design verified
- [ ] SEO meta tags configured
- [ ] Analytics/monitoring set up
- [ ] Backup strategy in place

### After Launch:
- [ ] Monitor error logs (first 24 hours)
- [ ] Check analytics/traffic
- [ ] Test all critical user flows
- [ ] Verify email notifications (if applicable)
- [ ] Monitor database performance
- [ ] Check API rate limits
- [ ] Update README with production URL

---

## 📞 Support & Troubleshooting

### Common Issues:

**Build fails with "Module not found"**
```powershell
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Environment variables not loading**
- Check variable names match exactly (case-sensitive)
- Verify in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding new variables

**Database connection errors**
- Verify Supabase URL and keys
- Check database is running
- Confirm RLS policies allow access

**Images not loading**
- Check Cloudinary credentials
- Verify upload preset is unsigned or has correct signature
- Check CORS settings in Cloudinary dashboard

### Get Help:
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Best Practices](https://supabase.com/docs/guides/platform/going-into-prod)
- [Cloudinary Production](https://cloudinary.com/documentation/how_to_integrate_cloudinary)

---

**Last Updated:** February 6, 2026  
**Platform:** Vercel (Recommended)  
**Status:** Ready for deployment ✅
