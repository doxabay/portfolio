import type { Metadata } from "next";
import Image from "next/image";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { StaggerHeader, CaseStudyCanvas } from "@/components/case-study-animations";

export const metadata: Metadata = { title: "Follow Flash" };

export default async function FollowFlashCaseStudy() {
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
              <img loading="lazy" decoding="async" src="/logos/followflash.svg" alt="Follow Flash logo" width={34} height={34} className="rounded-full shrink-0" />
              <h1 className="text-3xl sm:text-4xl text-neutral-950 dark:text-neutral-50 tracking-tight font-medium" style={{ fontFamily: "KaliceTrial" }}>
                <SquigglyText className="text-neutral-950 dark:text-neutral-50" scale={[4, 6]} stepDuration={320}>
                  Follow Flash
                </SquigglyText>
              </h1>
              <h1 className="text-neutral-950 dark:text-neutral-50 w-full" style={{ fontWeight: 500, fontSize: "24px", lineHeight: "32px", letterSpacing: "-0.47px" }}>
                Designing an AI powered system for social media management and automation for creators
              </h1>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                2025-2026 / AI / SAAS
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
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    Creators are often overwhelmed with the manual audience interactions across platforms. Follow Flash solved this with an AI-powered SaaS that lets creators automate replies and workflows, making it easier for creators to focus on what they love doing.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    As the solo designer, I owned the end-to-end product experience. I partnered with the product team on key strategic decisions: how to make powerful automation feel intuitive for non-technical creators, and how to localize the experience for German users (beyond translation). That meant intentional UX choices around discoverability, mental models, and interface language.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    The outcome: top creators in the German fitness ecosystem adopted Follow Flash as their core tool, proving the design effectively democratized automation for this audience.
                  </p>
                </div>

                {/* Metadata list */}
                <div className="w-full flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Type</p>
                    <p className="text-sm text-neutral-400 text-right">Contract</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">My role</p>
                    <p className="text-sm text-neutral-400 text-right">UI/UX Designer</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Industry</p>
                    <p className="text-sm text-neutral-400 text-right">AI / SAAS / Creator Tools</p>
                  </div>
                  <div className="flex items-center justify-between gap-6 py-3">
                    <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Client</p>
                    <p className="text-sm text-neutral-400 text-right">Rubio Verde</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Cover image */}
            <Image src="/follow-flash/coverfollowflash.jpg" alt="Follow Flash cover" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />

            {/* Shots */}
            <Image src="/follow-flash/covershot01followflash.jpg" alt="Follow Flash shot 1" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/follow-flash/covershot02followflash.jpg" alt="Follow Flash shot 2" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/follow-flash/covershot03followflash.jpg" alt="Follow Flash shot 3" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/follow-flash/covershot04followflash.jpg" alt="Follow Flash shot 4" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/follow-flash/covershot05followflash.jpg" alt="Follow Flash shot 5" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/follow-flash/covershot06followflash.jpg" alt="Follow Flash shot 6" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/follow-flash/covershot07followflash.jpg" alt="Follow Flash shot 7" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/follow-flash/covershot8followflash.jpg" alt="Follow Flash shot 8" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/follow-flash/covershot09followflash.jpg" alt="Follow Flash shot 9" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-4" />
            <Image src="/follow-flash/covershot10followflash.jpg" alt="Follow Flash shot 10" width={2000} height={1109} sizes="(max-width: 600px) 100vw, 560px" className="w-full h-auto rounded-[4px] mb-16" />

          </CaseStudyCanvas>
        </div>
      </div>
    </div>
  );
}
