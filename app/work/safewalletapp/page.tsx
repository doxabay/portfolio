import type { Metadata } from "next";
import StickyBackLink from "@/components/sticky-back-link";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { StaggerHeader, CaseStudyCanvas } from "@/components/case-study-animations";

export const metadata: Metadata = { title: "Safewalletapp" };

export default async function SafewalletappCaseStudy() {
  return (
    <div className="flex flex-col">
      <div className="flex min-h-screen">

        {/* Sidebar — desktop only */}
        <aside className="hidden lg:flex w-52 shrink-0 pt-[108px] pb-10 pl-11 pr-4 flex-col">
          <div className="sticky top-6">
            <StickyBackLink />
          </div>
        </aside>

        {/* Decorative strip — hidden */}
        <div className="hidden" />

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
              <img src="/logos/safewallet.svg" alt="Safewalletapp logo" width={34} height={34} className="rounded-[6px] shrink-0" />
              <h1 className="text-3xl sm:text-4xl text-neutral-950 dark:text-neutral-50 tracking-tight font-medium">
                <SquigglyText className="text-neutral-950 dark:text-neutral-50" scale={[4, 6]} stepDuration={320}>
                  Safewalletapp
                </SquigglyText>
              </h1>
              <h1 className="text-neutral-950 dark:text-neutral-50 w-full lg:w-[75%]" style={{ fontFamily: "KaliceTrial", fontWeight: 500, fontSize: "28px" }}>
                Designing a secure self-custody wallet experience for crypto degens
              </h1>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                2024 / UI / MOBILE
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
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">TURNAROUND</p>
                    <p className="text-sm tracking-wide text-neutral-400">3 Weeks</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Industry</p>
                    <p className="text-sm tracking-wide text-neutral-400">Web3 / Crypto</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">My Role</p>
                    <p className="text-sm tracking-wide text-neutral-400">UI Designer</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Client</p>
                    <p className="text-sm tracking-wide text-neutral-400">Bitledger Solutions</p>
                  </div>
                </div>

                {/* Overview text */}
                <div className="w-full lg:w-1/2 lg:pr-10">
                  <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Overview</p>
                  <p className="text-sm leading-relaxed">
                    Crypto in Africa is held back not by interest, but by complexity. Safewalletapp was built to change that — a new product from the same founder behind Bintin, which I designed specifically to simplify the crypto experience for African users.
                    <br /><br />
                    Having already established trust through Bintin, I was brought back by founder Moyo to lead the UI design for this next product in their suite. I built the component library from scratch and designed a full interface that balances simplicity, aesthetics, and functionality without dumbing down the experience.
                    <br /><br />
                    The result: a modern crypto app that feels at home in the African market, where clarity and trust aren&apos;t just nice-to-haves.
                  </p>
                </div>

              </div>
            </section>

            {/* Cover images */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/safewallet/coversafewallet.jpg" alt="Safewalletapp cover" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/safewallet/coversafewallet01.jpg" alt="Safewalletapp cover 01" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/safewallet/coversafewallet02.jpg" alt="Safewalletapp cover 02" className="w-full h-auto rounded-[12px] mb-16" />

          </CaseStudyCanvas>
        </div>
      </div>
    </div>
  );
}
