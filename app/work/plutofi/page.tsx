import type { Metadata } from "next";
import Image from "next/image";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { StaggerHeader, CaseStudyCanvas } from "@/components/case-study-animations";

export const metadata: Metadata = { title: "Plutofi" };

export default async function PlutofiCaseStudy() {
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
              <h1 className="text-3xl sm:text-4xl text-neutral-950 dark:text-neutral-50 tracking-tight font-medium" style={{ fontFamily: "KaliceTrial" }}>
                <SquigglyText className="text-neutral-950 dark:text-neutral-50" scale={[4, 6]} stepDuration={320}>
                  Plutofi
                </SquigglyText>
              </h1>
              <h1 className="text-neutral-950 dark:text-neutral-50 w-full" style={{ fontWeight: 500, fontSize: "24px", lineHeight: "32px", letterSpacing: "-0.47px" }}>
                Designing a DeFi wealth management dashboard for non-technical users
              </h1>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                2024 / MOBILE / UI
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
                    Overview paragraph.
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
                    <p className="text-sm text-neutral-400 text-right">Ecommerce</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Client</p>
                    <p className="text-sm text-neutral-400 text-right">Agoge Limited</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Cover image */}
            <Image src="/plutofi/coverplutofi.jpg" alt="Plutofi cover" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto mb-4" />

            {/* Shots */}
            <Image src="/plutofi/shot1plutofi.jpg" alt="Plutofi shot 1" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto mb-4" />
            <Image src="/plutofi/shot2plutofi.jpg" alt="Plutofi shot 2" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto mb-4" />
            <Image src="/plutofi/shot3plutofi.jpg" alt="Plutofi shot 3" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto mb-4" />
            <Image src="/plutofi/shot4plutofi.jpg" alt="Plutofi shot 4" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto mb-4" />
            <Image src="/plutofi/shot5plutofi.jpg" alt="Plutofi shot 5" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto mb-4" />
            <Image src="/plutofi/shot6plutofi.jpg" alt="Plutofi shot 6" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto mb-16" />

          </CaseStudyCanvas>
        </div>
      </div>
    </div>
  );
}
