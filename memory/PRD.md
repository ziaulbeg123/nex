# Nexvora Labs — PRD

## Original Problem Statement
Update the Nexvora Labs web app (React + FastAPI + MongoDB): fully REMOVE the About page (component, navbar links desktop+mobile, footer links, routes, internal links) and ADD a new Pricing page at `/pricing` matching provided screenshots — promo banner ("Get up to 20% off your first WebMan plan..."), 5 fixed per-project pricing cards (Launch ₹10,499 / Grow ₹28,499 / Pro ₹48,499 / Plus ₹61,499 MOST POPULAR / Enterprise "Let's talk") with savings + maintenance offers, a "Compare all plans & features" matrix (sticky header desktop, accordion mobile), all CTAs reusing the existing Contact form modal with plan pre-fill, leads saved to MongoDB with `interested_plan`, visible in admin panel. No payment integration — display-only pricing, leads via form.

Note: the environment contained only the blank starter template (no pre-existing Nexvora site), so the full site was built from scratch — About page simply never included anywhere.

## User Choices (confirmed)
- Contact form plan pre-fill: YES (plan name auto pre-fills)
- Compare table mobile view: Accordion-style (tier-wise collapse)

## Architecture
- Frontend: React 19 + Tailwind + shadcn/ui, framer-motion (masked hero reveal, scroll reveals, micro-interactions), lenis smooth scrolling. Dark obsidian `#070709` + molten gold `#EAB308` theme, Outfit / Cormorant Garamond / JetBrains Mono type. Design spec: `/app/design_guidelines.json`.
- Backend: FastAPI, `/api` prefix. Endpoints: `POST /api/leads` (public), `GET /api/leads` (admin JWT), `POST /api/auth/login`, `GET /api/auth/me`. bcrypt password hashing, PyJWT (12h access token, Bearer + httpOnly cookie), idempotent admin seed on startup.
- Database: MongoDB via MONGO_URL/DB_NAME. Collections: `leads` (full_name, email, phone, interested_plan, message, created_at), `users` (admin).

## User Personas
- Prospective client: browses pricing, compares tiers, submits enquiry with interested plan.
- Admin (Nexvora team): logs into `/admin`, reviews/filters/exports leads.

## Core Requirements (static)
1. No About page or links anywhere. Pricing link in navbar (desktop + mobile) + footer.
2. `/pricing`: promo banner, 5 cards (Plus highlighted + MOST POPULAR), compare matrix.
3. Shared contact modal opened from all CTAs, `interested_plan` pre-filled.
4. Leads persist to MongoDB; admin table shows `interested_plan` column.

## Implemented (2026-09-06)
- Full Nexvora Labs site: Home (kinetic masked hero, gold orb parallax, editorial marquee, services bento, manifesto, stats), Pricing, Admin. No About page/route/link anywhere.
- Pricing page: promo banner, 5 tier cards with savings/maintenance offers, MOST POPULAR Plus treatment, compare matrix (sticky header desktop, accordion mobile), final CTA.
- Contact modal: plan pre-fill, Sonner toast, saves to MongoDB.
- Admin panel `/admin`: JWT login, leads table (name/email/phone/plan/message/date), plan filter, search, CSV export, logout.
- About page `/about` restored (2026-09-06): lab intro + stats, 4 selected previous projects (Aurelia Jewels/Plus, FitForge/Grow, Kaveri Textiles/Pro, UrbanMoto/Enterprise) with photography + result chips, values strip, CTA. About link added to navbar (desktop + mobile) and footer.
- Backend: leads + auth endpoints, admin seeding, 401 protection verified.
- Verified end-to-end: curl (health, login, me, lead create, admin list, 401) + browser (home, pricing CTA → modal pre-fill → submit → admin shows lead; mobile accordion + mobile menu).

## Backlog / Next Tasks
- P1: Lead status management (new/contacted/won) + delete in admin
- P1: Email notification to team on new lead (Resend)
- P2: WhatsApp CTA on pricing cards
- P2: Case studies / portfolio section on home
- P2: Rate limiting / brute-force lockout on admin login
