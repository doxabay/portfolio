---
name: blocasset-case-study
description: Visual and component details for the Blocasset case study at app/work/[slug]/page.tsx — impact cards, messaging cards, feedback avatars
metadata:
  type: project
---

# Blocasset Case Study — Component Details

File: `app/work/[slug]/page.tsx` (catch-all route, only renders Blocasset for now)

## Messaging cards (UX research section — "A new messaging")
Four items: "Visibility & wealth creation", "Career advancement", "Passive earning", "International payments"
- Background: `bg-orange-50`, border: `border-[0.5px] border-orange-200`
- Each card: `flex items-center` with an icon (`/wealth.svg`, `/career.svg`, `/passive.svg`, `/intl.svg`) and 8px gap before the label text
- Icons are SVGs in `/public/` (user-supplied)

## Impact cards (`#result` section)
Five stats: 500+, 16, 2, 100+, 1,000+
- No hover state (removed `hover:bg-white hover:border-neutral-300 hover:shadow-sm`)
- Stat number font: `fontFamily: "KaliceTrial", fontWeight: 500`
- Icon above each stat number (`/acqui.svg`, `/influ.svg`, `/partners.svg`, `/assets.svg`, `/download.svg`) — `w-5 h-5 mb-3`
- Icons are SVGs in `/public/` (user-supplied, may not be added yet)
- Background stays `bg-neutral-50 border border-neutral-100`

**Why:** User feedback requested these specific visual changes — font/icon treatment and removal of hover.

## Feedback section (`#feedback`)
Three testimonials: Valentine, Designade, Vicko
- Converted from static JSX to a `.map()` over a data array
- Each entry has: `name`, `gradient` (CSS gradient string), `quote`
- Avatar: `w-8 h-8 rounded-full shrink-0` div with inline `background: gradient` — no image, pure CSS gradient
- Avatar + name in `flex items-center gap-3 mb-2` row, quote below
- Gradient values (lightened to 200–300 range):
  - Valentine: `linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)` (orange-200→300)
  - Designade: `linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)` (purple-200→300)
  - Vicko: `linear-gradient(135deg, #bae6fd 0%, #7dd3fc 100%)` (sky-200→300)

**Why:** User wanted gradient avatars (not images), then asked to lighten them — shifted from saturated 500-range to pastel 200–300 range.
