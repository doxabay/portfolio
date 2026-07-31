import type { Metadata } from "next";
import Image from "next/image";
import TocNav from "@/components/toc-nav";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { StaggerHeader, CaseStudyCanvas } from "@/components/case-study-animations";
import ResizableContent from "@/components/resizable-content";
import NoblocksAvatarCredits from "@/components/noblocks-avatar-credits";

export const metadata: Metadata = { title: "Noblocks" };

const toc = [
  { id: "overview", label: "Overview" },
];

export default async function NoblocksCaseStudy() {
  return (
    <div className="flex flex-col">
      <div className="relative min-h-screen">

        {/* Sidebar — desktop only */}
        <aside className="hidden lg:flex fixed top-0 left-0 z-10 w-52 pt-[160px] pb-10 pl-11 pr-4 flex-col">
          <div>
            <TocNav items={toc} />
          </div>
        </aside>

        {/* Content area */}
        <div className="flex flex-col pt-6 lg:pt-[100px] pb-12 px-4 sm:px-6 lg:pl-[268px] lg:pr-8 2xl:px-8 min-w-0">
          <ResizableContent>
          {/* Page header */}
          <div id="case-study-header" className="w-full max-w-[var(--cs-w,560px)] mx-auto mb-8 lg:mb-[60px]">
            <StaggerHeader className="flex flex-col gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src="/logos/noblocks.svg" alt="Noblocks logo" width={34} height={34} className="rounded-full shrink-0" />
              <h1 className="text-3xl sm:text-4xl text-neutral-950 dark:text-neutral-50 tracking-tight font-medium" style={{ fontFamily: "KaliceTrial" }}>
                <SquigglyText className="text-neutral-950 dark:text-neutral-50" scale={[4, 6]} stepDuration={320}>
                  Noblocks
                </SquigglyText>
              </h1>
              <h1 className="text-neutral-950 dark:text-neutral-50 w-full" style={{ fontWeight: 500, fontSize: "24px", lineHeight: "32px", letterSpacing: "-0.47px" }}>
                Designing a fiat-stablecoin experience for everyday use from $0 to $1M+ TPV
              </h1>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                2024 / PRODUCT / UX
              </p>
            </StaggerHeader>
          </div>

          {/* Canvas */}
          <CaseStudyCanvas className="w-full max-w-[var(--cs-w,560px)] mx-auto py-8 lg:py-[60px] text-neutral-800 dark:text-neutral-200 [&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-600 dark:[&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-400">

            {/* Overview */}
            <section id="overview" className="mb-16">
              <div className="flex flex-col gap-10 max-w-[var(--cs-w,560px)] mx-auto">

                {/* Overview text */}
                <div className="w-full">
                  <div className="flex items-center gap-3 mb-3"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Overview</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    The case for Noblock is not unique but the need to build a seamless experience in a market where several other products fail is. Stablecoins are powerful but hard to use in real life. The biggest obstacle stablecoin faces is not adoption but trust, and trust is built from things you understand and work consistently. When trust is solidified, the rewards of adoption are certain to follow. The challenge for us then becomes stripping down the complexities surrounding stablecoin in a way that does not take out its identity but understandable enough for everyday users to accept its efficacies.
                    <br /><br />
                    I spent the next 19 months designing from this perspective and from the humble beginnings of Zap (Noblock&apos;s v1 / hackathon version) to a stable Noblocks used across 5 African countries.
                  </p>
                </div>

                {/* Metadata list */}
                <div className="w-full flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Year</p>
                    <p className="text-sm text-neutral-400 text-right">2024-2025</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">My role</p>
                    <p className="text-sm text-neutral-400 text-right">Product Designer</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Industry</p>
                    <p className="text-sm text-neutral-400 text-right">Web3 / Stablecoins</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Credits</p>
                    <NoblocksAvatarCredits />
                  </div>
                </div>

              </div>
            </section>

            {/* Cover image */}
            <Image src="/Noblocks-01.jpg" alt="Noblocks cover" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-16" />

          </CaseStudyCanvas>
          </ResizableContent>
        </div>
      </div>
    </div>
  );
}
