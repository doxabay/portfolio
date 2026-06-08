import type { Metadata } from "next";
import TocNav from "@/components/toc-nav";
import StickyBackLink from "@/components/sticky-back-link";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { StaggerHeader, CaseStudyCanvas } from "@/components/case-study-animations";
import NoblocksAvatarCredits from "@/components/noblocks-avatar-credits";

export const metadata: Metadata = { title: "Noblocks" };

const toc = [
  { id: "overview", label: "Overview" },
];

export default async function NoblocksCaseStudy() {
  return (
    <div className="flex flex-col">
      <div className="flex min-h-screen">

        {/* Sidebar — desktop only */}
        <aside className="hidden lg:flex w-52 shrink-0 pt-[108px] pb-10 pl-11 pr-4 flex-col">
          <div className="sticky top-6">
            <StickyBackLink />
            <TocNav items={toc} />
          </div>
        </aside>

        {/* Content area */}
        <div className="flex-1 flex flex-col pt-6 lg:pt-[100px] pb-12 px-4 sm:px-6 lg:pl-[80px] lg:pr-6 min-w-0">

          {/* Back link — mobile only */}
          <div className="lg:hidden mb-6">
            <StickyBackLink />
          </div>

          {/* Page header */}
          <div id="case-study-header" className="w-full mb-8 lg:mb-[60px]" style={{ maxWidth: "min(75vw, 100%)" }}>
            <StaggerHeader className="flex flex-col gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/noblocks.svg" alt="Noblocks logo" width={34} height={34} className="rounded-[6px] shrink-0" />
              <h1 className="text-3xl sm:text-4xl text-neutral-950 dark:text-neutral-50 tracking-tight font-medium">
                <SquigglyText className="text-neutral-950 dark:text-neutral-50" scale={[4, 6]} stepDuration={320}>
                  Noblocks
                </SquigglyText>
              </h1>
              <h1 className="text-neutral-950 dark:text-neutral-50 w-full lg:w-[75%]" style={{ fontFamily: "KaliceTrial", fontWeight: 500, fontSize: "28px" }}>
                Designing a fiat-stablecoin experience for everyday use from $0 to $1M+ TPV
              </h1>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                2024 / PRODUCT / UX
              </p>
            </StaggerHeader>
          </div>

          {/* Canvas */}
          <CaseStudyCanvas className="w-full py-8 lg:py-[60px] text-zinc-800 dark:text-zinc-200 [&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-600 dark:[&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-400">

            {/* Overview */}
            <section id="overview" className="mb-16">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">

                {/* Metadata grid */}
                <div className="w-full lg:w-1/2 lg:shrink-0 grid grid-cols-2 gap-x-6 gap-y-8 lg:pr-[100px] content-start">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Year</p>
                    <p className="text-sm tracking-wide text-neutral-400">2024-2025</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Industry</p>
                    <p className="text-sm tracking-wide text-neutral-400">Web3 / Stablecoins</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">My Role</p>
                    <p className="text-sm tracking-wide text-neutral-400">Product Designer</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Credits</p>
                    <NoblocksAvatarCredits />
                  </div>
                </div>

                {/* Overview text */}
                <div className="w-full lg:w-1/2 lg:pr-10">
                  <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Overview</p>
                  <p className="text-sm leading-relaxed">
                    The case for Noblock is not unique but the need to build a seamless experience in a market where several other products fail is. Stablecoins are powerful but hard to use in real life. The biggest obstacle stablecoin faces is not adoption but trust, and trust is built from things you understand and work consistently. When trust is solidified, the rewards of adoption are certain to follow. The challenge for us then becomes stripping down the complexities surrounding stablecoin in a way that does not take out its identity but understandable enough for everyday users to accept its efficacies.
                    <br /><br />
                    I spent the next 19 months designing from this perspective and from the humble beginnings of Zap (Noblock&apos;s v1 / hackathon version) to a stable Noblocks used across 5 African countries.
                  </p>
                </div>

              </div>
            </section>

            {/* Cover image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Noblocks-01.jpg" alt="Noblocks cover" className="w-full h-auto rounded-[12px] mb-16" />

          </CaseStudyCanvas>
        </div>
      </div>
    </div>
  );
}
