import type { Metadata } from "next";
import StickyBackLink from "@/components/sticky-back-link";
import { SquigglyText } from "@/components/ui/squiggly-text";

export const metadata: Metadata = { title: "Bintin" };

export default async function BintinCaseStudy() {
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
              <img src="/logos/bintin.svg" alt="Bintin logo" width={34} height={34} className="rounded-[6px] shrink-0" />
              <h1 className="text-3xl sm:text-4xl text-neutral-950 tracking-tight font-medium">
                <SquigglyText className="text-neutral-950" scale={[4, 6]} stepDuration={320}>
                  Bintin
                </SquigglyText>
              </h1>
              <h1 className="text-neutral-950 dark:text-neutral-50 w-full lg:w-[75%]" style={{ fontFamily: "KaliceTrial", fontWeight: 500, fontSize: "28px" }}>
                From friction to flow: Redesigning Bintin&apos;s mobile app to inspire trust and improve trade completion rate.
              </h1>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                2023 / MOBILE / UI
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
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Turnaround</p>
                    <p className="text-sm tracking-wide text-neutral-400">4 Weeks</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Industry</p>
                    <p className="text-sm tracking-wide text-neutral-400">Web3</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">My Role</p>
                    <p className="text-sm tracking-wide text-neutral-400">UI Designer</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Client</p>
                    <p className="text-sm tracking-wide text-neutral-400">BitLedger Solutions</p>
                  </div>
                </div>

                {/* Overview text */}
                <div className="w-full lg:w-1/2 lg:pr-10">
                  <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Overview</p>
                  <p className="text-sm leading-relaxed mb-4">
                    Bintin has a customer base largely dominated by users within the 18-30 years age range but are easily shaken by the swinging uncertainties in the crypto space. Trust is hard won and the existing interface doesn&apos;t inspire it. To them, Bintin is just another crypto platform that might likely fold up or run with their money.
                  </p>
                  <p className="text-sm leading-relaxed">
                    From abandoning trades to cancelling transactions midway, there are a lot of challenges faced by the existing users as well as loose ends already posed by the dysfunctional user experience of the existing product version. I was contracted to redesign the Bintin mobile app to improve the existing user experience while incorporating new feature offerings. The goal is to leverage crypto&apos;s general outlook in the Nigerian market and build on the first version of the product to make the interface intuitive, easy to use, and boost trade completion rate.
                  </p>
                </div>

              </div>
            </section>

            {/* Cover image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bintin/coverbintin.jpg" alt="Bintin cover" className="w-full h-auto rounded-[12px] mb-4" />

            {/* Shots */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bintin/shotcover01Bintin.jpg" alt="Bintin shot 1" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bintin/shotcover02Bintin-1.jpg" alt="Bintin shot 2" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bintin/shotcover02Bintin.jpg" alt="Bintin shot 3" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bintin/shotcover03Bintin.jpg" alt="Bintin shot 4" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bintin/shotcover04Bintin.jpg" alt="Bintin shot 5" className="w-full h-auto rounded-[12px] mb-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bintin/shotcover05Bintin.jpg" alt="Bintin shot 6" className="w-full h-auto rounded-[12px] mb-16" />


          </div>
        </div>
      </div>
    </div>
  );
}
