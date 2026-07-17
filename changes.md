# Certus Snap - Changes & Feature Registry

This document provides a complete registry of all files, features, architecture decisions, and implementation details for the Certus Snap codebase. It serves as a context reference for any model or developer working on this repository.

---

## Architecture Overview

```
Certus Snap
  Framework:      Next.js 16 (App Router, React Server Components)
  Authentication:  Clerk (@clerk/nextjs)
  Database:        Supabase (PostgreSQL 16) with localStorage fallback
  3D Engine:       React Three Fiber + Three.js
  Motion:          Framer Motion (cubic-bezier(0.16, 1, 0.3, 1), 0.6s)
  Styling:         Vanilla CSS with CSS custom properties
  Fonts:           Inter (UI), JetBrains Mono (terminal/code)
  Design System:   Strict monochromatic - #111111, #FFFFFF, #F5F5F5, #E5E5E5, #666666
```

---

## File Registry

### Core Configuration

| File | Purpose | Status |
|:---|:---|:---|
| `package.json` | Project dependencies and scripts | Active |
| `tsconfig.json` | TypeScript configuration with bundler resolution | Active |
| `.env.example` | Environment variable template (Clerk + Supabase) | Active |
| `.env.local` | Local environment with placeholder credentials | Active |
| `src/middleware.ts` | Clerk authentication middleware for route protection | Active |

### Design System

| File | Purpose | Key Details |
|:---|:---|:---|
| `src/styles/tokens.css` | CSS custom properties defining the design system | Monochromatic palette, Inter/JetBrains Mono fonts, 4px spacing scale, cubic-bezier easing |
| `src/app/globals.css` | Global stylesheet with CSS reset and base typography | Imports tokens.css, Google Fonts, scrollbar styling, utility classes |
| `src/app/layout.tsx` | Root layout with ClerkProvider and InterceptProvider | SEO metadata, font loading via next/font/google |

### SVG Icon System

| File | Exports | Stroke Weight |
|:---|:---|:---|
| `src/components/icons/index.tsx` | ShieldIcon, LinkIcon, ScanIcon, ClockIcon, TerminalIcon, ArrowIcon, CheckIcon, LockIcon, PulseIcon, GridIcon, ChevronDown | 1.5px |

All icons are pure SVG with no emoji. Each accepts `size` and `className` props.

### 3D Wireframe Engine

| File | Purpose |
|:---|:---|
| `src/components/WireframeScene.tsx` | R3F Canvas with IcosahedronGeometry (primary, 2.4 radius) and OctahedronGeometry (secondary, 1.2 radius) wireframes. Scroll-linked rotation via Framer Motion useScroll/useSpring/useTransform. Includes FloatingParticles (60 points). |
| `src/components/WireframeLoader.tsx` | Dynamic import wrapper (ssr: false) with Suspense boundary. Prevents Three.js SSR crashes. |

Scroll physics: useSpring with stiffness 50, damping 30. Rotation mapped [0, 1] to [0, 2 PI].

### Intercept Framework

| File | Purpose |
|:---|:---|
| `src/hooks/useIntercept.tsx` | React Context + hook providing `triggerIntercept(source)` and `closeIntercept()`. Logs events to localStorage and POSTs to /api/telemetry. |
| `src/components/InterceptOverlay.tsx` | Full-screen terminal overlay with animated boot sequence (7 system log lines), email capture form, and success state. Uses Framer Motion staggerChildren for line-by-line reveal. |
| `src/components/InterceptOverlay.module.css` | Terminal aesthetic: scanline effect (repeating-linear-gradient), grid background, corner bracket decorations, blinking status dot, monospaced typography. |

Intercept triggers:
- Hero CTA click: `hero_cta`
- Pricing Standard button: `pricing_standard`
- Pricing Velocity button: `pricing_velocity`
- Sign-in page mount: `sign_in_page`
- Sign-up page mount: `sign_up_page`
- Dashboard page mount: `dashboard`
- Workspace page mount: `workspace_link_generator`
- Vault page mount: `document_vault`

### Telemetry Data Layer

| File | Purpose |
|:---|:---|
| `src/lib/supabase.ts` | Supabase client factory with graceful null return when credentials are not configured. |
| `src/lib/telemetry.ts` | `logTelemetryEvent()` writes to Supabase telemetry_events table, falls back to localStorage. `getLocalTelemetry()` reads stored events. |
| `src/app/api/telemetry/route.ts` | POST endpoint receiving telemetry events. Validates payload, writes via telemetry service, returns event ID. |

Event schema:
```typescript
{
  type: 'intercept_triggered' | 'email_captured' | 'page_view' | 'click';
  source?: string;
  email?: string;
  timestamp: string;
  viewport?: string;
  userAgent?: string;
  metadata?: Record<string, string>;
}
```

### Landing Page

| File | Purpose |
|:---|:---|
| `src/app/page.tsx` | Client component with 5 sections: Hero, Problem Statement, How It Works, Price Matrix, Network Telemetry, Footer. Uses scroll-linked animations, animated counters (AnimatedCounter component), and intercept triggers on CTAs. |
| `src/app/page.module.css` | Section-specific styles with responsive breakpoints at 640px and 1024px. |

Landing page sections:

1. **Hero** - Full viewport with 3D wireframe background. "Certus Snap" headline, description, "Generate Verification Link" CTA (triggers intercept). Scroll indicator at bottom.
2. **Problem Statement** - "The Compliance Gap" - four cards: Institutional Friction, Privacy Resistance, Regulatory Exposure, Data Retention Risk. Gray background.
3. **How It Works** - Three-step vertical flow with numbered indicators and connecting lines: Generate Link, Buyer Uploads, Broker Receives.
4. **Price Matrix** - Black background. Two tier cards: Standard ($29/tx) and Velocity ($79/tx). Feature lists with check icons. Both buttons trigger intercept.
5. **Network Telemetry** - Animated counters: 1,247 Sessions, 89 Active Verifications, 99% Uptime, 342 Records Purged. Pulsing status indicators.
6. **Footer** - Minimal. Brand name, copyright, "All systems operational" status.

### Authentication Pages

| File | Intercept Source | Skeleton |
|:---|:---|:---|
| `src/app/sign-in/[[...sign-in]]/page.tsx` | `sign_in_page` | Blurred login form (2 inputs + button) |
| `src/app/sign-up/[[...sign-up]]/page.tsx` | `sign_up_page` | Blurred registration form (3 inputs + button) |

### Gated Pages

| File | Intercept Source | Skeleton Layout |
|:---|:---|:---|
| `src/app/dashboard/page.tsx` | `dashboard` | Header + 3 metric cards + data table |
| `src/app/dashboard/page.module.css` | - | Shared skeleton styles for all gated pages |
| `src/app/workspace/page.tsx` | `workspace_link_generator` | Form inputs + generated links table |
| `src/app/vault/page.tsx` | `document_vault` | Upload dropzone + file cards |

All gated pages auto-trigger the intercept overlay on mount and display a blurred, low-opacity skeleton behind it.

---

## Design Rules Enforcement

| Rule | Implementation |
|:---|:---|
| No emoji | All visual indicators use SVG icons from `src/components/icons/` with 1.5px stroke |
| No em-dashes | All text uses colons, hyphens, or periods as separators |
| Monochromatic only | CSS tokens enforce `#111111`, `#FFFFFF`, `#F5F5F5`, `#E5E5E5`, `#666666` exclusively |
| No AI style signifiers | Custom layouts, unique typography hierarchy, no generic templates |
| Intercept mandate | Every auth action, workspace entry, and interactive CTA routes through `useIntercept` |

---

## Animation Specifications

- **Easing curve:** `cubic-bezier(0.16, 1, 0.3, 1)` (stored as `--ease-certus`)
- **Base duration:** `0.6s` (stored as `--duration-base`)
- **Scroll spring:** stiffness 50, damping 30, restDelta 0.001
- **Stagger interval:** 0.08s between sibling elements
- **Counter animation:** 2000ms over 60 steps with floor rounding
- **Status pulse:** 2s ease-in-out infinite opacity cycle

---

## Database Schema Reference

```sql
CREATE TYPE compliance_status_type AS ENUM (
  'initiated', 'payload_received', 'ocr_verified', 'transmitted', 'purged'
);

CREATE TYPE tier_type AS ENUM ('tier_standard', 'tier_velocity');

CREATE TABLE public.agent_profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  full_name TEXT NOT NULL,
  brokerage_team TEXT,
  system_tier tier_type DEFAULT 'tier_standard' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

CREATE TABLE public.transaction_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agent_profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL,
  property_address TEXT NOT NULL,
  secure_token TEXT NOT NULL UNIQUE,
  current_status compliance_status_type DEFAULT 'initiated' NOT NULL,
  encrypted_buyer_metadata JSONB DEFAULT NULL,
  document_vault_url TEXT DEFAULT NULL,
  payload_purged_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX idx_sessions_token ON public.transaction_sessions(secure_token);
ALTER TABLE public.transaction_sessions ENABLE ROW LEVEL SECURITY;
```

---

## Environment Variables

| Variable | Required | Purpose |
|:---|:---|:---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk frontend authentication |
| `CLERK_SECRET_KEY` | Yes | Clerk server-side authentication |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Yes | Custom sign-in route (`/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Yes | Custom sign-up route (`/sign-up`) |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL (localStorage fallback if empty) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key (localStorage fallback if empty) |

---

## Module Status Matrix

| Module | Route | Operational State |
|:---|:---|:---|
| Landing Experience | `/` | Active - Publicly Accessible |
| Sign In | `/sign-in` | Active Intercept Gate |
| Sign Up | `/sign-up` | Active Intercept Gate |
| Dashboard | `/dashboard` | Under Construction - Active Gate |
| Workspace (Link Generator) | `/workspace` | Under Construction - Active Gate |
| Document Vault | `/vault` | Under Construction - Active Gate |
| Telemetry API | `/api/telemetry` | Active Analytical Layer |
| 3D Wireframe Engine | Component | Active - Landing Page |
| Intercept Framework | Overlay | Active - System-wide |

---

## Build Commands

```bash
npm run dev        # Development server (localhost:3000)
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint validation
```

---

## Dependency List

| Package | Version | Purpose |
|:---|:---|:---|
| `next` | 15.x | Framework |
| `react` / `react-dom` | 19.x | UI library |
| `@clerk/nextjs` | latest | Authentication |
| `@supabase/supabase-js` | latest | Database client |
| `framer-motion` | latest | Animation engine |
| `three` | latest | 3D rendering |
| `@react-three/fiber` | latest | React Three.js bridge |
| `@react-three/drei` | latest | R3F helper components |
| `typescript` | 5.x | Type system |
