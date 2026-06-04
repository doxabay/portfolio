import type { Metadata } from "next";
import StickyBackLink from "@/components/sticky-back-link";
import { SquigglyText } from "@/components/ui/squiggly-text";

export const metadata: Metadata = { title: "Follow Flash" };

export default async function FollowFlashCaseStudy() {
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
            <div className="flex flex-col gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/followflash.svg" alt="Follow Flash logo" width={34} height={34} className="rounded-[6px] shrink-0" />
              <h1 className="text-3xl sm:text-4xl text-neutral-950 tracking-tight font-medium">
                <SquigglyText className="text-neutral-950" scale={[4, 6]} stepDuration={320}>
                  Follow Flash
                </SquigglyText>
              </h1>
              <h1 className="text-neutral-950 dark:text-neutral-50 w-full lg:w-[75%]" style={{ fontFamily: "KaliceTrial", fontWeight: 500, fontSize: "28px" }}>
                Designing an AI powered system for social media management and automation for creators
              </h1>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                2025-2026 / AI / SAAS
              </p>
            </div>
          </div>

          {/* Canvas */}
          <div className="w-full py-8 lg:py-[60px] text-zinc-800 [&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-600">

            {/* Overview */}
            <section id="overview" className="mb-16">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">

                {/* Metadata grid */}
                <div className="w-full lg:w-1/2 lg:shrink-0 grid grid-cols-2 gap-x-6 gap-y-8 lg:pr-[100px] content-start">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Type</p>
                    <p className="text-sm tracking-wide text-neutral-400">Contract</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Industry</p>
                    <p className="text-sm tracking-wide text-neutral-400">AI / SAAS / Creator Tools</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">My Role</p>
                    <p className="text-sm tracking-wide text-neutral-400">UI/UX Designer</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Client</p>
                    <p className="text-sm tracking-wide text-neutral-400">Rubio Verde</p>
                  </div>
                </div>

                {/* Overview text */}
                <div className="w-full lg:w-1/2 lg:pr-10">
                  <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Overview</p>
                  <p className="text-sm leading-relaxed mb-4">
                    Creators are often overwhelmed with the manual audience interactions across platforms. Follow Flash solved this with an AI-powered SaaS that lets creators automate replies and workflows, making it easier for creators to focus on what they love doing.
                  </p>
                  <p className="text-sm leading-relaxed mb-4">
                    As the solo designer, I owned the end-to-end product experience. I partnered with the product team on key strategic decisions: how to make powerful automation feel intuitive for non-technical creators, and how to localize the experience for German users (beyond translation). That meant intentional UX choices around discoverability, mental models, and interface language.
                  </p>
                  <p className="text-sm leading-relaxed">
                    The outcome: top creators in the German fitness ecosystem adopted Follow Flash as their core tool, proving the design effectively democratized automation for this audience.
                  </p>
                </div>

              </div>
            </section>

            {/* Cover image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/follow-flash/coverfollowflash.jpg" alt="Follow Flash cover" className="w-full h-auto rounded-[12px] mb-4" />

            {/* Shots */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/follow-flash/covershot01followflash.jpg" alt="Follow Flash shot 1" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/follow-flash/covershot02followflash.jpg" alt="Follow Flash shot 2" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/follow-flash/covershot03followflash.jpg" alt="Follow Flash shot 3" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/follow-flash/covershot04followflash.jpg" alt="Follow Flash shot 4" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/follow-flash/covershot05followflash.jpg" alt="Follow Flash shot 5" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/follow-flash/covershot06followflash.jpg" alt="Follow Flash shot 6" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/follow-flash/covershot07followflash.jpg" alt="Follow Flash shot 7" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/follow-flash/covershot8followflash.jpg" alt="Follow Flash shot 8" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/follow-flash/covershot09followflash.jpg" alt="Follow Flash shot 9" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/follow-flash/covershot10followflash.jpg" alt="Follow Flash shot 10" className="w-full h-auto rounded-[12px] mb-16" />

          </div>
        </div>
      </div>
    </div>
  );
}
