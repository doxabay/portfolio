import type { Metadata } from "next";
import Image from "next/image";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { StaggerHeader, CaseStudyCanvas } from "@/components/case-study-animations";

export const metadata: Metadata = { title: "Safewalletapp" };

export default async function SafewalletappCaseStudy() {
  return (
    <div className="flex flex-col">
      <div className="relative min-h-screen">
        {/* Decorative strip — hidden */}
        <div className="hidden" />

        {/* Content area */}
        <div className="flex flex-col pt-6 lg:pt-[100px] pb-12 px-4 sm:px-6 lg:pl-[268px] lg:pr-8 2xl:px-8 min-w-0">
          {/* Page header */}
          <div id="case-study-header" className="w-full max-w-[560px] mx-auto mb-8 lg:mb-[60px]">
            <StaggerHeader className="flex flex-col gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src="/logos/safewallet.svg" alt="Safewalletapp logo" width={34} height={34} className="rounded-full shrink-0" />
              <h1 className="text-3xl sm:text-4xl text-neutral-950 dark:text-neutral-50 tracking-tight font-medium" style={{ fontFamily: "KaliceTrial" }}>
                <SquigglyText className="text-neutral-950 dark:text-neutral-50" scale={[4, 6]} stepDuration={320}>
                  Safewalletapp
                </SquigglyText>
              </h1>
              <h1 className="text-neutral-950 dark:text-neutral-50 w-full" style={{ fontWeight: 500, fontSize: "24px", lineHeight: "32px", letterSpacing: "-0.47px" }}>
                Designing a secure self-custody wallet experience for crypto degens
              </h1>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                2024 / UI / MOBILE
              </p>
            </StaggerHeader>
          </div>

          {/* Canvas */}
          <CaseStudyCanvas className="w-full max-w-[560px] mx-auto py-8 lg:py-[60px] text-neutral-800 dark:text-neutral-200 [&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-600 dark:[&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-400">

            {/* Overview */}
            <section id="overview" className="mb-16">
              <div className="flex flex-col gap-10 max-w-[560px] mx-auto">

                {/* Overview text */}
                <div className="w-full">
                  <div className="flex items-center gap-3 mb-3"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Overview</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Crypto in Africa is held back not by interest, but by complexity. Safewalletapp was built to change that — a new product from the same founder behind Bintin, which I designed specifically to simplify the crypto experience for African users.
                    <br /><br />
                    Having already established trust through Bintin, I was brought back by founder Moyo to lead the UI design for this next product in their suite. I built the component library from scratch and designed a full interface that balances simplicity, aesthetics, and functionality without dumbing down the experience.
                    <br /><br />
                    The result: a modern crypto app that feels at home in the African market, where clarity and trust aren&apos;t just nice-to-haves.
                  </p>
                </div>

                {/* Metadata list */}
                <div className="w-full flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Turnaround</p>
                    <p className="text-sm text-neutral-400 text-right">3 Weeks</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">My role</p>
                    <p className="text-sm text-neutral-400 text-right">UI Designer</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Industry</p>
                    <p className="text-sm text-neutral-400 text-right">Web3 / Crypto</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Client</p>
                    <p className="text-sm text-neutral-400 text-right">Bitledger Solutions</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Cover images */}
            <Image src="/safewallet/coversafewallet.jpg" alt="Safewalletapp cover" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto mb-4" />
            <Image src="/safewallet/coversafewallet01.jpg" alt="Safewalletapp cover 01" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto mb-4" />
            <Image src="/safewallet/coversafewallet02.jpg" alt="Safewalletapp cover 02" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto mb-16" />

          </CaseStudyCanvas>
        </div>
      </div>
    </div>
  );
}
