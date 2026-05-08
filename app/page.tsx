import CaseStudyCard from "@/components/case-study-card";
import SectionDivider from "@/components/section-divider";
import TypewriterHello from "@/components/typewriter-hello";

const caseStudies = [
  {
    product: "Blocasset",
    title: "Redesigning the onboarding flow",
    description: "Cut drop-off by 40% with a three-screen progressive disclosure pattern.",
    niche: "Product / UX",
    href: "/work/blocasset-onboarding",
    year: "2024",
    bg: "bg-zinc-100 dark:bg-zinc-800",
  },
  {
    product: "Paycrest",
    title: "Building a real-time collaboration layer",
    description: "WebSocket presence system powering live cursors for 50k+ users.",
    niche: "Architecture",
    href: "#",
    year: "2024",
    bg: "bg-zinc-200 dark:bg-zinc-700",
  },
  {
    product: "Witan",
    title: "Design system from scratch",
    description: "60+ components and token docs that unified three product teams.",
    niche: "Design Systems",
    href: "#",
    year: "2023",
    bg: "bg-red-50 dark:bg-red-950",
  },
  {
    product: "Parkly",
    title: "Migrating a monolith to Next.js",
    description: "Incremental migration of a legacy Rails app — zero downtime, 2× faster loads.",
    niche: "Engineering",
    href: "#",
    year: "2023",
    bg: "bg-zinc-900 dark:bg-zinc-100",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 flex flex-col items-center justify-center h-[75vh]">
        <TypewriterHello className="text-xs font-medium text-zinc-900 dark:text-zinc-100 w-[480px] block mb-2" />
        <p className="text-2xl text-zinc-600 dark:text-zinc-400 w-[480px] leading-[30px] tracking-[0.36px]" style={{ fontFamily: "var(--font-roboto-flex)" }}>
          Designing memorable experiences through empathy-driven user obsession and core design craftmanship
        </p>
      </section>

      {/* Case Studies */}
      <section className="px-6 pb-20">
        <h2 className="text-xs font-semibold uppercase text-neutral-500 mb-8 text-center flex items-center justify-center gap-2">
          <span className="inline-block w-[6px] h-[10px] bg-neutral-500" />
          Selected work
        </h2>
        <div className="flex flex-col">
          {caseStudies.map((study, i) => (
            <div key={study.title}>
              {i !== 0 && <SectionDivider />}
              <CaseStudyCard study={study} />
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-16">
        <h2 className="text-xs font-semibold uppercase text-zinc-400 dark:text-zinc-500 mb-8 text-center">
          About
        </h2>
        <div className="grid gap-8 sm:grid-cols-[1fr_auto]">
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
            <p>
              I'm a software engineer with a background that spans engineering,
              design, and product thinking. I care most about the intersection
              of those three — where good systems meet good taste.
            </p>
            <p>
              Currently building in public and open to new opportunities. When
              I'm not writing code I'm probably reading, lifting, or arguing
              about typography.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm shrink-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-red-500 dark:hover:text-red-500 transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-red-500 dark:hover:text-red-500 transition-colors"
            >
              Twitter ↗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 dark:text-zinc-100 hover:text-red-500 dark:hover:text-red-500 transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8">
        <div className="flex items-center justify-between text-sm text-zinc-400 dark:text-zinc-500">
          <span>© {new Date().getFullYear()} Bayo Faleke</span>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </>
  );
}
