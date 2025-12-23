# MediCare Solutions - Next.js Medical SaaS Platform

A professional medical products landing page built with Next.js 14, React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm installed

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── products/
│       └── [slug]/        # Dynamic product pages
│           ├── page.tsx
│           └── not-found.tsx
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSlideshow.tsx
│   ├── AboutSection.tsx
│   ├── ProductsSection.tsx
│   ├── ProductSlideshow.tsx
│   └── ProductTabs.tsx
├── data/                  # Product data
│   └── products.ts
└── types/                 # TypeScript types
    └── index.ts
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: SVG (inline)

## ✨ Features

- ✅ Server-side rendering (SSR) and Static Site Generation (SSG)
- ✅ Dynamic routing for product pages
- ✅ TypeScript for type safety
- ✅ Responsive design (mobile-first)
- ✅ Smooth animations with Framer Motion
- ✅ SEO optimized with metadata
- ✅ Product slideshow with auto-rotation
- ✅ Tabbed product information
- ✅ Prescription drug indicators
- ✅ Scalable architecture

## 📦 Building for Production

```bash
npm run build
npm run start
```

## 🌐 Deployment

Deploy easily on [Vercel](https://vercel.com):

```bash
vercel
```

Or use any hosting platform that supports Next.js.

## 📝 Adding New Products

Edit `src/data/products.ts` and add new product objects following the `Product` interface defined in `src/types/index.ts`.

## 🎨 Customization

- Colors: Edit Tailwind config in `tailwind.config.js`
- Fonts: Add to `src/app/layout.tsx`
- Components: Modify files in `src/components/`

## 📄 License

Private project - All rights reserved.
# elite_drug
