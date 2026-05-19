# New Case Study — Template

Use this skill whenever the user sends an HTML file for a new case study (Paycrest, Witan, etc.).  
Follow the Blocasset case study at `app/work/[slug]/page.tsx` as the canonical reference.

---

## Step 1 — Parse the HTML

Read the HTML file the user provides. Extract in order:
- **Project name** (becomes the `<SquigglyText>` H1 and the folder slug)
- **Subtitle / one-liner** (H3 under the title)
- **Metadata**: Year, Industry, My Role, Credits (avatars)
- **All sections** in document order: label (e.g. "Backstory"), heading, body copy, any images or videos
- **TOC structure**: derive parent items + children from the section headings

---

## Step 2 — Create the page file

**Path:** `app/work/[slug]/page.tsx`  
Replace `[slug]` with the kebab-case project name (e.g. `paycrest-onboarding`, `witan`).  
The file is a **server component** (`async function`, no `"use client"`).

### Required imports

```tsx
import Image from "next/image";
import TocNav from "@/components/toc-nav";
import DashboardExpectations from "@/components/dashboard-expectations";
import StickyBackLink from "@/components/sticky-back-link";
import { SquigglyText } from "@/components/ui/squiggly-text";
import AvatarCredits from "@/components/avatar-credits";
import ViewportVideo from "@/components/viewport-video";
```

Only import what the page actually uses. Remove unused imports.

---

## Step 3 — TOC array

Build the `toc` array from the extracted section headings.  
Each top-level section is a parent; sub-headings within it become `children`.

```ts
const toc = [
  {
    id: "overview", label: "Overview",
    children: [{ id: "section-sub", label: "Sub heading" }],
  },
  { id: "backstory", label: "Backstory" },
  // … one entry per major section
];
```

Rules:
- `id` = kebab-case of the heading text, matches the `id` on the `<section>` or `<h2>` in the markup
- Top-level labels match the orange label text (e.g. "Backstory", "Challenge", "Research")
- Children match the H2 headings inside each section

---

## Step 4 — Page skeleton

```tsx
export default async function CaseStudyPage() {
  return (
    <div className="flex flex-col">

      {/* ── Banner ── */}
      <div className="w-full px-4 sm:px-6">
        <div className="relative h-[40vh] sm:h-[55vh] lg:h-[70vh]">
          <Image
            src="/[project]-cover.jpg"
            alt="[Project] cover"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="flex min-h-screen">

        {/* ── Sidebar (desktop only) ── */}
        <aside className="hidden lg:flex w-52 shrink-0 pt-[108px] pb-10 pl-11 pr-4 flex-col">
          <div className="sticky top-6">
            <StickyBackLink />
            <TocNav items={toc} />
          </div>
        </aside>

        {/* ── Decorative strip (desktop only) ── */}
        <div
          className="hidden lg:block w-5 shrink-0 self-stretch ml-[104px] border-l border-r border-neutral-100 sticky top-0 h-screen"
          style={{
            backgroundImage: `repeating-linear-gradient(
              315deg,
              transparent, transparent 7px,
              #e5e5e5 7px, #e5e5e5 8px
            )`,
          }}
        />

        {/* ── Content area ── */}
        <div className="flex-1 flex flex-col pt-6 lg:pt-[100px] pb-12 px-4 sm:px-6 lg:pl-[80px] lg:pr-6 min-w-0">

          {/* Back link — mobile only */}
          <div className="lg:hidden mb-6">
            <StickyBackLink />
          </div>

          {/* ── Page header ── */}
          <div id="case-study-header" className="w-full mb-8 lg:mb-[60px]" style={{ maxWidth: "min(75vw, 100%)" }}>
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl sm:text-4xl text-orange-500 tracking-tight font-medium">
                <SquigglyText className="text-orange-500" scale={[4, 6]} stepDuration={320}>
                  [Project Name]
                </SquigglyText>
              </h1>
              <h3 className="text-base text-zinc-500 dark:text-zinc-400 w-full lg:w-[75%]">
                [Subtitle from HTML]
              </h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                [YEAR] / [INDUSTRY TAG] / [ROLE TAG]
              </p>
            </div>
          </div>

          {/* ── Canvas ── */}
          <div className="w-full py-8 lg:py-[60px] text-zinc-800 [&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-600">

            {/* SECTIONS GO HERE — see Step 5 */}

          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Step 5 — Section patterns

### Overview (always first)

```tsx
<section id="overview" className="mb-16">
  <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">

    {/* Metadata grid */}
    <div className="w-full lg:w-1/2 lg:shrink-0 grid grid-cols-2 gap-x-6 gap-y-8 lg:pr-[100px] content-start">
      <div>
        <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Year</p>
        <p className="text-sm uppercase tracking-wide text-neutral-400">[YEAR]</p>
      </div>
      <div>
        <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Industry</p>
        <p className="text-sm tracking-wide text-neutral-400">[Industry]</p>
      </div>
      <div>
        <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">My Role</p>
        <p className="text-sm tracking-wide text-neutral-400">[Role description]</p>
      </div>
      <div>
        <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Credits</p>
        <AvatarCredits />
      </div>
    </div>

    {/* Overview text */}
    <div className="w-full lg:w-1/2 lg:pr-10">
      <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Overview</p>
      <h2 id="[sub-heading-id]" className="text-xl mb-4">[Sub heading]</h2>
      <p className="text-sm leading-relaxed mb-4">[Body copy paragraph 1]</p>
      <p className="text-sm leading-relaxed">[Body copy paragraph 2]</p>
    </div>

  </div>
</section>
```

### Every other body section (Backstory, Challenge, Goal, Insights, Research, Design, Impact, Feedback…)

```tsx
<section id="[section-id]" className="mb-16">
  <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
    <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">[Section Label]</p>
    <h2 id="[heading-id]" className="text-xl mb-4">[Heading]</h2>
    <p className="text-sm leading-relaxed mb-4">[Paragraph]</p>
    {/* repeat <p> blocks as needed */}
  </div>
</section>
```

Continued sections without an orange label (sub-sections inside the same topic):

```tsx
<section className="mb-16">
  <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
    <h2 id="[heading-id]" className="text-xl mb-4">[Heading]</h2>
    <p className="text-sm leading-relaxed mb-4">[Paragraph]</p>
  </div>
</section>
```

### Full-width image between sections

```tsx
<div className="mb-16">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img src="[url-or-path]" alt="[description]" className="w-full h-auto" />
</div>
```

For local images use `<Image>` from next/image with `width={1920} height={1080}`.

### Viewport-aware video (Mixpanel-style — loops seconds 3–8)

```tsx
<div className="mb-16">
  <div
    className="w-full flex items-end justify-center pt-16 pb-0"
    style={{ backgroundImage: "url('/shot-imageBG.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
  >
    <ViewportVideo src="/[video].mp4" className="w-[85%] h-auto rounded-tl-[10px] rounded-tr-[10px]" />
  </div>
</div>
```

### Plain autoplay loop video (no viewport observer)

```tsx
<div className="mb-16">
  <ViewportVideo src="/[video].mp4" plain playbackRate={1.2} className="w-full h-auto" />
</div>
```

### Impact stats grid

```tsx
<div className="grid grid-cols-2 gap-3">
  {[
    { stat: "500+", label: "Label", desc: "Description" },
  ].map(({ stat, label, desc }) => (
    <div key={stat} className="bg-neutral-50 border border-neutral-100 rounded-lg p-4 transition-all duration-200 hover:bg-white hover:border-neutral-300 hover:shadow-sm">
      <p className="text-2xl font-semibold text-zinc-900 mb-1">{stat}</p>
      <p className="text-sm font-medium text-zinc-700 mb-1">{label}</p>
      <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  ))}
</div>
```

### User feedback section

```tsx
<section id="feedback">
  <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
    <p className="text-sm uppercase tracking-widest text-orange-500 mb-6 font-medium">User Feedback</p>
    <div className="space-y-8">
      {[{ name: "Name", quote: "Quote text" }].map(({ name, quote }) => (
        <div key={name}>
          <p className="text-sm font-medium text-zinc-900 mb-2">{name}</p>
          <p className="text-sm leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Step 6 — AvatarCredits

`AvatarCredits` is hardcoded in `components/avatar-credits.tsx` with 8 pravatar.cc avatars.  
If the new project has different team members, update that file **or** create a project-specific credits component and import it instead.

---

## Step 7 — Responsive rules (never break these)

| Element | Mobile | Desktop |
|---|---|---|
| Sidebar + decorative strip | `hidden` | `lg:flex` / `lg:block` |
| Back link | shown (`lg:hidden`) | hidden (in sidebar) |
| Banner height | `h-[40vh]` | `lg:h-[70vh]` |
| Body section div | `w-full` | `lg:w-1/2 lg:ml-auto` |
| Overview metadata | `w-full`, stacked | `lg:w-1/2 lg:shrink-0` |
| Content padding | `px-4 sm:px-6` | `lg:pl-[80px] lg:pr-6` |
| Canvas padding | `py-8` | `lg:py-[60px]` |

---

## Step 8 — Checklist before finishing

- [ ] Slug in file path matches the project name
- [ ] All `id` attributes on sections/headings match the `toc` array
- [ ] Banner image exists in `/public/`
- [ ] No unused imports
- [ ] `AvatarCredits` updated if team differs
- [ ] Videos use the correct `ViewportVideo` variant (`plain` vs default)
- [ ] `DashboardExpectations` only included if the project has that component equivalent
