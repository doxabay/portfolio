---
name: Portfolio project state
description: Full summary of design/layout/component decisions — fonts, colours, page structure, components, conventions
type: project
---

# Portfolio — Project State

## Stack
- Next.js 16 (app router, async params), React 19, Tailwind v4, TypeScript
- shadcn (Radix preset, initialized), `motion` package for PointerHighlight
- Key deps added: `class-variance-authority`, `clsx`, `tailwind-merge`, `radix-ui`, `tw-animate-css`, `lucide-react`, `motion`

## Fonts
- Body/UI: **SuisseIntlTrial-Regular** — registered via `@font-face` in `globals.css`
- Headings (h1–h6): **KaliceTrial** (Regular + Medium weight 500) — registered in `globals.css`
- `h2` globally: `font-weight: 500` (KaliceTrial-Medium)
- `text-wrap: balance` on all headings; Goal section h2s use `text-pretty w-full` override

## Primary Colour
**Orange 500** is the site-wide primary. Used for:
- TOC active state (`text-orange-500 border-orange-500`)
- Canvas section labels (OVERVIEW, BACKSTORY, etc.)
- PointerHighlight accent on "expectation"
- "FEEDBACKS" label in DashboardExpectations

## Global CSS conventions (`app/globals.css`)
- Body paragraphs: `color: var(--color-neutral-800)` in `@layer base`
- Canvas body text override: `[&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-600`
- **Borders: always neutral-100** (neutral-200 was replaced everywhere this session)
- Noise texture SVG on body bg

## Nav (`components/nav.tsx`)
- Not sticky, backdrop-blur
- Logo left, links right (About / Playground / Blog — uppercase text-xs)

## Homepage (`app/page.tsx`)
- Hero: 75vh, gradient `from-[#f7f5f0] to-white`, KaliceTrial tagline, TypewriterHello
- 4 case studies: Blocasset (with `/Blocasset-1.jpg` image), Paycrest, Witan, Parkly
- `<SectionDivider>` between cards — `repeating-linear-gradient(315deg, transparent 7px, #e5e5e5 7px–8px)`

## Case Study Page (`app/work/[slug]/page.tsx`)

### Overall layout
```
<div class="flex flex-col">
  Banner (full-width 70vh /blocasset-cover-new.jpg)
  <div class="flex min-h-screen">
    <aside> (TOC sidebar)
    <div> (decorative strip)
    <div class="flex-1"> (content area)
  </div>
</div>
```

### Sidebar (`<aside>`)
- `w-52 shrink-0 sticky top-0 h-screen pt-[100px] pb-10 pl-11 pr-4`
- Contains `<StickyBackLink>` + `<TocNav>`

### Decorative strip (between sidebar and content)
- `w-5` (20px), `ml-[104px]`, `border-l border-r border-neutral-100`
- Same `repeating-linear-gradient(315deg)` diagonal hatch as SectionDivider

### Content area
- `flex-1 flex-col pt-[100px] pb-12 pr-6 pl-[80px]` — no border-l, no background

### Header block (`#case-study-header`)
- `w-full min-w-[980px] maxWidth: 75vw mb-[60px]`
- h1: `text-4xl font-medium text-zinc-900`
- h3 subtitle: `text-base text-zinc-500 w-[75%]`
- meta: `text-xs text-zinc-400 tabular-nums` ("2024 / PRODUCT / UX")

### Canvas
- `w-full py-[60px] min-h-[80vh] text-zinc-800` — **no bg, no shadow, no border**
- Text sections: `w-1/2 ml-auto pr-10` (right-aligned in canvas)
- Section labels: `text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium` (or mb-6)
- All h2s have unique `id` attributes for TOC deep-linking
- Images: `<Image>` for local files; `<img>` (with eslint-disable) for Framer CDN URLs

### Canvas images
- After Overview: `/Blocasset-1.jpg`
- Before Goal: `/blocasset-2.jpg` (lowercase)
- All others: Framer CDN `<img>` tags

### TOC array (`toc` const)
10 top-level sections, each with `children` arrays of h2 sub-headings:
Overview → [Beta to v1] | Backstory | Challenge → [Need for Much Better than Beta] | Goal → [Simplify onboarding, Redesign experience] | My Role | Insights → [First/Second/Third stop] | Research → [Hotjar, UX-Research, New messaging] | Design → [Introducing V1, Unified platform, Onboarding easy, Search, Payments, Creator base, Asset Upload, Maze] | Impact | Feedback

## Components

### `components/toc-nav.tsx`
- Client component, scroll-based active detection (flattens all IDs including children)
- `TocItem`: `{ id, label, children?: { id, label }[] }`
- Active parent: `text-orange-500 border-orange-500`
- Children rendered as indented sub-items with `border-l border-neutral-100`

### `components/sticky-back-link.tsx`
- Client component — hidden (`opacity-0 translateY(-6px)`) until `#case-study-header` leaves viewport
- Uses `IntersectionObserver` (no scroll listener)
- Fades + slides in on scroll past header

### `components/case-study-card.tsx`
- Supports optional `image` field → renders `<Image fill object-cover>`
- Border: `border-t-[0.7px] border-neutral-100`

### `components/dashboard-expectations.tsx`
- Inserted after Research/"A new messaging" section, before Design section
- Two-column: left 35% (question) | right flex-1 (2×2 grid)
- **Left column**: `justify-start items-start`; "FEEDBACKS" label (orange-500); KaliceTrial question text with `<PointerHighlight containerClassName="inline-block">` on "expectation"
- **Right column**: 4 cards in `grid-cols-2 gap-3 items-start`
  - Card 1: `bg-orange-50 border-orange-100` rotate(2deg)
  - Card 2: `bg-lime-50 border-lime-100` rotate(-2deg)
  - Card 3: `bg-sky-50 border-sky-100` rotate(2deg)
  - Card 4: `bg-teal-50 border-teal-100` rotate(-2deg)
  - All: `padding: 28px`, quote `text-base text-neutral-600`, author bottom `mt-auto pt-4 text-sm font-medium text-zinc-800`
- Outer wrapper: `bg-neutral-50 rounded-2xl py-14 px-10 mb-16`

### `components/ui/pointer-highlight.tsx` (shadcn/aceternity)
- Animated rectangle border + pointer cursor using `motion/react` (whileInView)
- Border: `border-neutral-800 dark:border-neutral-100`

### `components/section-divider.tsx`
- `w-full h-[12px]` with `repeating-linear-gradient(315deg, transparent 7px, #e5e5e5 7px–8px)`
- Used on homepage between case study rows

### `lib/utils.ts` + `components/ui/button.tsx`
- Created by shadcn init; `cn()` utility available

## Key decisions / conventions
- Orange 500 = primary colour going forward
- neutral-100 for all borders (not neutral-200)
- Canvas has no visual container (no bg/shadow/border) — content is "open"
- Text sections in canvas are always right-half (`w-1/2 ml-auto`), images always full-width
- SectionDivider hatch pattern reused as vertical strip in case study layout
</content>
</invoke>