import Image from "next/image";
import Link from "next/link";
import TypewriterHello from "@/components/typewriter-hello";
import { HeroParticleRender } from "@/components/hero-particle-render";

const caseStudies = [
  {
    product: "Blocasset",
    title: "From beta to v1: Designing an onchain platform for powering creator's success",
    description: "Cut drop-off by 40% with a three-screen progressive disclosure pattern.",
    niche: "Product / UX",
    href: "/work/blocasset",
    year: "2024",
    image: "/Blocasset-1.jpg",
  },
  {
    product: "Paycrest",
    title: "Building a real-time collaboration layer",
    description: "WebSocket presence system powering live cursors for 50k+ users.",
    niche: "Architecture",
    href: "#",
    year: "2024",
    image: "/Paycrest-01.jpg",
  },
  {
    product: "Witan",
    title: "Design system from scratch",
    description: "60+ components and token docs that unified three product teams.",
    niche: "Design Systems",
    href: "/work/witan",
    year: "2023",
    image: "/Witan-cover.jpg",
  },
  {
    product: "Follow Flash",
    title: "Designing a simplified system for social media management and automation for creators",
    description: "Incremental migration of a legacy Rails app — zero downtime, 2× faster loads.",
    niche: "Engineering",
    href: "/work/follow-flash",
    year: "2023",
    image: "/follow-flash/coverfollowflash.jpg",
  },
];

export default function HomeV2() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="flex items-center justify-center h-[60vh] border-b" style={{ backgroundColor: "color-mix(in srgb, #f7f5f0 90%, transparent)", borderColor: "#eae7de", boxShadow: "0 1.5px 0 0 #fff" }}>
        <div className="flex items-center gap-[60px] w-full max-w-[1580px] mx-auto px-5">
          <HeroParticleRender height={280} width={233} />
          <div className="flex flex-col">
            <TypewriterHello className="text-xs font-medium text-zinc-900 w-[520px] block mb-2 text-left" />
            <p className="text-neutral-950 w-[1040px] text-left" style={{ fontFamily: "KaliceTrial", fontWeight: 500, fontSize: 48, lineHeight: "60px", letterSpacing: 0 }}>
              Product Designer at Follow Flash. Designing memorable experiences through empathy-driven user obsession and design craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-white">
        <div className="max-w-[1580px] mx-auto px-5 pt-[100px] pb-5">
          <h2 className="text-neutral-950 mb-[60px] text-center" style={{ fontWeight: 500, fontSize: 24 }}>
            Selected Work
          </h2>
          <div className="flex flex-col gap-5">
            {caseStudies.map((study) => {
              const inner = (
                <>
                  <div className="relative flex-1 rounded-[24px] overflow-hidden mb-5">
                    {study.image ? (
                      <Image src={study.image} alt={study.product} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 tabular-nums mb-1">
                    {study.year} / {study.niche.toUpperCase()}
                  </p>
                  <h3 className="text-xl font-medium text-neutral-950 leading-snug">{study.product}</h3>
                  <h4 className="text-sm text-neutral-600 mt-1 leading-snug">{study.title}</h4>
                </>
              );
              const cls = `flex flex-col rounded-[40px] overflow-hidden p-5 aspect-[1.8/1] bg-neutral-50`;
              return study.href !== "#" ? (
                <Link key={study.title} href={study.href} className={cls}>{inner}</Link>
              ) : (
                <div key={study.title} className={cls}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-white border-t border-neutral-100">
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>© {new Date().getFullYear()} Bayo Faleke</span>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}
