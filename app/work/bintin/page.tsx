import type { Metadata } from "next";
import Image from "next/image";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { StaggerHeader, CaseStudyCanvas } from "@/components/case-study-animations";
import ResizableContent from "@/components/resizable-content";

export const metadata: Metadata = { title: "Bintin" };

export default async function BintinCaseStudy() {
  return (
    <div className="flex flex-col">
      <div className="relative min-h-screen">
        {/* Decorative strip — hidden */}
        <div className="hidden" />

        {/* Content area */}
        <div className="flex flex-col pt-6 lg:pt-[100px] pb-12 px-4 sm:px-6 lg:pl-[268px] lg:pr-8 2xl:px-8 min-w-0">
          <ResizableContent>
          {/* Page header */}
          <div id="case-study-header" className="w-full max-w-[var(--cs-w,560px)] mx-auto mb-8 lg:mb-[60px]">
            <StaggerHeader className="flex flex-col gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src="/logos/bintin.svg" alt="Bintin logo" width={34} height={34} className="rounded-full shrink-0" />
              <h1 className="text-3xl sm:text-4xl text-neutral-950 dark:text-neutral-50 tracking-tight font-medium" style={{ fontFamily: "KaliceTrial" }}>
                <SquigglyText className="text-neutral-950 dark:text-neutral-50" scale={[4, 6]} stepDuration={320}>
                  Bintin
                </SquigglyText>
              </h1>
              <h1 className="text-neutral-950 dark:text-neutral-50 w-full" style={{ fontWeight: 500, fontSize: "24px", lineHeight: "32px", letterSpacing: "-0.47px" }}>
                From friction to flow: Redesigning Bintin&apos;s mobile app to inspire trust and improve trade completion rate.
              </h1>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                2023 / MOBILE / UI
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
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    Bintin has a customer base largely dominated by users within the 18-30 years age range but are easily shaken by the swinging uncertainties in the crypto space. Trust is hard won and the existing interface doesn&apos;t inspire it. To them, Bintin is just another crypto platform that might likely fold up or run with their money.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    From abandoning trades to cancelling transactions midway, there are a lot of challenges faced by the existing users as well as loose ends already posed by the dysfunctional user experience of the existing product version. I was contracted to redesign the Bintin mobile app to improve the existing user experience while incorporating new feature offerings. The goal is to leverage crypto&apos;s general outlook in the Nigerian market and build on the first version of the product to make the interface intuitive, easy to use, and boost trade completion rate.
                  </p>
                </div>

                {/* Metadata list */}
                <div className="w-full flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Turnaround</p>
                    <p className="text-sm text-neutral-400 text-right">4 Weeks</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">My role</p>
                    <p className="text-sm text-neutral-400 text-right">UI Designer</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Industry</p>
                    <p className="text-sm text-neutral-400 text-right">Web3</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Client</p>
                    <p className="text-sm text-neutral-400 text-right">BitLedger Solutions</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Cover image */}
            <Image src="/bintin/coverbintin.jpg" alt="Bintin cover" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />

            {/* Shots */}
            <Image src="/bintin/shotcover01Bintin.jpg" alt="Bintin shot 1" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/bintin/shotcover02Bintin-1.jpg" alt="Bintin shot 2" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/bintin/shotcover02Bintin.jpg" alt="Bintin shot 3" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/bintin/shotcover03Bintin.jpg" alt="Bintin shot 4" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/bintin/shotcover04Bintin.jpg" alt="Bintin shot 5" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/bintin/shotcover05Bintin.jpg" alt="Bintin shot 6" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-16" />


          </CaseStudyCanvas>
          </ResizableContent>
        </div>
      </div>
    </div>
  );
}
