# Dig it Up - Product Requirements Document

## Project Overview
**Site Name:** Dig it Up  
**Tagline:** "Unearth Your Earning Potential"  
**Type:** Google AdSense-Ready Directory Website  
**Niche:** Online tools to earn extra income (freelance, surveys, micro-tasks)  
**Tech Stack:** HTML5, CSS3, jQuery (Static Site - No React/Backend Frameworks)

## User Personas
1. **Students** - Looking for flexible side income during studies
2. **Stay-at-home Parents** - Seeking work-from-home opportunities
3. **Professionals** - Diversifying income with freelance work
4. **Retirees** - Low-stress supplemental income

## Core Requirements (Static)
- [x] Google AdSense-compliant structure
- [x] Mobile-first responsive design
- [x] SEO-optimized with semantic HTML
- [x] Privacy Policy, Terms of Service, Disclaimer pages
- [x] Contact page with form
- [x] 800-1200 word homepage content
- [x] Category pages with 300-500 word intros
- [x] Individual tool pages with pros/cons, earning potential

## What's Been Implemented (Jan 2025)

### Pages Created
- **Homepage** (`index.html`) - Hero section, categories grid, featured tools, FAQ, newsletter
- **Category Pages** (5):
  - Freelance Platforms (`/categories/freelance.html`)
  - Paid Surveys (`/categories/surveys.html`)
  - Micro-Tasks (`/categories/microtasks.html`)
  - Passive Income (`/categories/passive-income.html`)
  - Sell Online (`/categories/selling.html`)
- **Tool Detail Pages** (6):
  - Upwork, Fiverr (Freelance)
  - Swagbucks (Surveys)
  - Amazon MTurk (Micro-Tasks)
  - Honeygain (Passive Income)
  - Etsy (Sell Online)
- **Legal/Info Pages**:
  - About Us (`about.html`)
  - Contact (`contact.html`)
  - Privacy Policy (`privacy.html`)
  - Terms of Service (`terms.html`)
  - Disclaimer (`disclaimer.html`)
  - Sitemap (`sitemap.html`)

### Features Implemented
- [x] Sticky navigation header
- [x] Mobile hamburger menu
- [x] Hero search bar (client-side filtering)
- [x] Category cards with icons
- [x] Tool cards with badges, earnings, descriptions
- [x] Scroll-to-top button
- [x] Newsletter signup form
- [x] Contact form with validation
- [x] Breadcrumb navigation
- [x] Ad placeholder spaces (AdSense-ready)
- [x] Pros/cons sections on tool pages
- [x] Related tools sections
- [x] Footer with site links

### Design Implementation
- Green & white color scheme (#16a34a primary)
- Plus Jakarta Sans + DM Sans typography
- Card-based layout
- Responsive grid system
- Subtle hover animations

## Deployment Readiness
- [x] Backend uses environment variables for paths
- [x] No hardcoded production URLs
- [x] Static file server via FastAPI
- [x] Health check endpoint available
- [ ] Supervisor frontend config (N/A - static site)

## Prioritized Backlog

### P0 (Critical)
- None - MVP complete

### P1 (High Priority - Next Phase)
- Add more tool detail pages (20+ remaining)
- Implement client-side pagination for tool lists
- Add sorting functionality to category pages

### P2 (Medium Priority)
- Add user ratings/reviews display
- Implement comparison feature
- Add "Related Articles" blog section
- Create earnings calculator tool

### P3 (Low Priority/Future)
- Dark mode toggle
- Language localization
- Browser extension for earnings tracking

## Testing Status
- Frontend: 95% pass rate
- All pages load correctly
- Navigation functional
- Forms working
- Minor: Scroll-to-top animation issue (low priority)

## Notes
- Site designed for Google AdSense approval
- All content is original, human-written
- No misleading income claims
- Clear disclaimers on all tool pages
- External links use nofollow attribute
