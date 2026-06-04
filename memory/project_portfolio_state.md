---
name: Portfolio project state
description: Full summary of design/layout/component decisions — fonts, colours, page structure, components, conventions
type: project
---

# Portfolio — Project State

## Stack
- Next.js 16 (app router, async params), React 19, Tailwind v4, TypeScript
- shadcn (Radix preset, initialized), `motion` package for PointerHighlight
- Key deps: `class-variance-authority`, `clsx`, `tailwind-merge`, `radix-ui`, `tw-animate-css`, `lucide-react`, `motion`

## Fonts
- Body/UI: **SuisseIntlTrial-Regular** — registered via `@font-face` in `globals.css`
- Headings: **KaliceTrial** (Regular + Medium weight 500) — registered in `globals.css`
- `text-wrap: balance` on all headings

## Primary Colour
**Orange 500** — used for TOC active state, canvas section labels, DashboardExpectations "FEEDBACKS" label.

## Global CSS conventions (`app/globals.css`)
- Canvas body text override: `[&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-600`
- Borders: always `neutral-100`

## Nav (`components/nav.tsx`)
- Not sticky, backdrop-blur. Logo left, links right (About / Playground / Blog — uppercase text-xs)

---

## Homepage (`app/page.tsx`)

- Hero section: 45vh, `HeroParticleRender` (width=156, height=186) left + KaliceTrial tagline right, TypewriterHello
- "Selected work" heading: `text-base font-semibold uppercase`, `fontFamily: "SuisseIntlTrial"`
- Case study cards rendered via `<CaseStudyCard>` from `caseStudies` array

### Case study card metadata (source of truth = individual case study pages)
| Product | Title (card) | Niche | Year |
|---|---|---|---|
| Blocasset | "From beta to v1: Designing an onchain platform for powering creator's success" | Product / Web | 2022–2024 |
| Paycrest | "Building a real-time collaboration layer" | Architecture | 2024-2025 |
| Witan | "A ticketing platform where people can create and book events — built for flexible ticketing, audience insights, and payments beyond fiat." | Events / Web3 | 2022–2023 |
| Follow Flash | "Designing an AI powered system for social media management and automation for creators" | AI / SAAS | 2025-2026 |
| Safewalletapp | "Designing a secure self-custody wallet experience for crypto degens" | UI / Mobile | 2024 |
| Noblocks | "Simplifying cross-border payments through a seamless stablecoin offramp" | Product / UX | 2024 |
| Synthetix | "Designing the trading interface for a decentralised derivatives protocol" | Product / UX | 2024 |
| Bintin | "From friction to flow: Redesigning Bintin's mobile app to inspire trust and improve trade completion rate." | Mobile / UI | 2023 |
| Plutofi | "Designing a DeFi wealth management dashboard for non-technical users" | Mobile / UI | 2024 |

---

## Case Study Pages — Two Distinct Structures

### Structure A: Full case study (Blocasset, Witan, Noblocks, Paycrest)
- Sidebar with `<StickyBackLink>` + `<TocNav>`
- Decorative diagonal-hatch strip (`w-5 ml-[104px]`) visible
- Content: Overview section → cover image → sections (backstory, challenge, goal, role, research, design, impact, feedback)

### Structure B: Simplified (Safewalletapp, Bintin, PlutoFi, Synthetix, Follow Flash)
Adopted after this session. No TocNav, no AvatarCredits, no decorative strip, no backstory→feedback sections.

```
imports: StickyBackLink, SquigglyText only
No toc const
Sidebar: StickyBackLink only
Decorative strip: <div className="hidden" />
Overview section: 2-col flex
  Left: grid-cols-2 metadata (Turnaround | Industry / My Role | Client)
  Right: "Overview" label + plain paragraph(s), no h2 heading
Cover image(s) below overview
Additional shot images stacked with mb-4, last one mb-16
```

---

## Individual Case Study Pages

### `/work/blocasset` → `app/work/[slug]/page.tsx` (Structure A)
- Tag: `2022–2024 / PRODUCT / WEB`
- Overview p2: "Blocasset Beta wasn't cutting it. As the creator economy evolved..."
- Overview p3: "As part of the design team, I contributed end-to-end: from research and UX strategy through to high-fidelity UI and developer handoff."

### `/work/witan` → `app/work/witan/page.tsx` (Structure A)
- Tag: `2022–2023 / EVENTS / WEB3`
- Subtitle: "A ticketing platform where people can create and book events — built for flexible ticketing, audience insights, and payments beyond fiat."

### `/work/safewalletapp` → `app/work/safewalletapp/page.tsx` (Structure B)
- Tag: `2024 / UI / MOBILE`
- Client: Bitledger Solutions | Turnaround: 3 Weeks | Industry: Web3 / Crypto | Role: Product Designer
- Overview: no h2 heading, single paragraph about redesigning for simplicity
- Cover images: coversafewallet.jpg, coversafewallet01.jpg, coversafewallet02.jpg (mb-4 each, last mb-16)

### `/work/bintin` → `app/work/bintin/page.tsx` (Structure B)
- Tag: `2023 / MOBILE / UI`
- Client: BitLedger Solutions | Turnaround: 4 Weeks | Industry: Web3 | Role: UI Designer
- Subtitle: "From friction to flow: Redesigning Bintin's mobile app to inspire trust and improve trade completion rate."
- Overview p1: about 18–30 age range users, trust issues
- Overview p2: about redesign brief, trade completion rate goal
- Shots: coverbintin.jpg + shotcover01–05Bintin.jpg (including shotcover02Bintin-1.jpg)

### `/work/plutofi` → `app/work/plutofi/page.tsx` (Structure B)
- Tag: `2024 / MOBILE / UI`
- Client: Agoge Limited | Turnaround: 3 Weeks | Industry: Ecommerce | Role: UI Designer
- Overview: placeholder "Overview paragraph."
- Shots: coverplutofi.jpg + shot1–6plutofi.jpg

### `/work/synthetix` → `app/work/synthetix/page.tsx` (Structure B)
- Tag: `2024 / PRODUCT / UX`
- Client: Synthetix | Turnaround: 4 Weeks | Industry: DeFi / Web3 | Role: Product Designer
- Overview: "Synthetix is a leading defi platform for derivatives trading. Collaborating on the team at Crevatal, we created a research plan which integrates secondary insights from existing data and other derivative trading platforms like dydy and Kwenta to build a clean, easy-to-use trading platform that integrates with the SUI wallet and Synthetix product ecosystem."
- Cover: coversynthetix.jpg

### `/work/follow-flash` → `app/work/follow-flash/page.tsx` (Structure B)
- Tag: `2025-2026 / AI / SAAS`
- Client: Rubio Verde | Type: Contract | Industry: AI / SAAS / Creator Tools | Role: UI/UX Designer
- Overview: 3 paragraphs — creator overwhelm problem → solo designer end-to-end → German fitness ecosystem outcome
- Shots: coverfollowflash.jpg + covershot01–10followflash.jpg (note: covershot8followflash.jpg has no leading zero)

---

## Components

### `components/toc-nav.tsx`
- Client component, scroll-based active detection
- Active parent: `text-orange-500 border-orange-500`

### `components/sticky-back-link.tsx`
- Hidden until `#case-study-header` leaves viewport (IntersectionObserver)

### `components/case-study-card.tsx`
- Supports optional `image` field → `<Image fill object-cover>`
- Border: `border-t-[0.7px] border-neutral-100`

### `components/hero-particle-render.tsx`
- Wraps `ParticleDitherEmbed` in a `shrink-0 overflow-hidden rounded-[8px]` div
- Default size: width=280, height=336; homepage uses width=156, height=186
- Inner div: `scale-[1.3] origin-center`

### `components/dashboard-expectations.tsx`
- Used in Blocasset case study after Research section
- Two-column layout with feedback cards (orange/lime/sky/teal)

### `components/particle-dither/`
- Full dither + particle animation system
- `ParticleDitherEmbed` is the composable embed version used in hero

---

## Key conventions
- Orange 500 = primary colour
- neutral-100 for all borders
- Case study images: always `w-full h-auto rounded-[12px]`, stacked `mb-4` with `mb-16` on the last
- No `eslint-disable-next-line @next/next/no-img-element` needed for `<Image>` from next/image; plain `<img>` tags need it
- Structure B pages have no TocNav, no toc const, no AvatarCredits import
