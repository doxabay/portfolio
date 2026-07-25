"use client";

import { PointerHighlight } from "@/components/ui/pointer-highlight";

const responses = [
  {
    id: 1,
    quote:
      "A Home to all my creations and also a place where I can access all needed stats as a review to performance of my creations.",
    author: "Jola A.",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    id: 2,
    quote:
      "I expect the dashboard to inform me of the performance of my assets listed on blocasset across different durations at the very least.",
    author: "Sandra O.",
    bg: "bg-lime-50",
    border: "border-lime-100",
  },
  {
    id: 3,
    quote:
      "I want to easily customize and see what I need as a creator. People using it, earnings, transactions and everything in between.",
    author: "Ademola F.",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    id: 4,
    quote:
      "Just to have a decentralised dashboard I upload my assets and be so sure no one is plagiarising them. And also the assurance that I might get people who would ask for or buy my assets.",
    author: "Becky A.",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
];

export default function DashboardExpectations() {
  return (
    <div className="flex flex-col gap-12 rounded-2xl mb-16">
      {/* Left: question */}
      <div className="w-full flex flex-col items-start justify-start">
        <div className="flex items-center gap-3 mb-3 w-full">
          <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Feedbacks</p>
          <span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <h1
          className="text-neutral-950 dark:text-neutral-50 w-full"
          style={{ fontWeight: 500, fontSize: "24px", lineHeight: "32px", letterSpacing: "-0.47px" }}
        >
          What&apos;s your{" "}
          <PointerHighlight
            rectangleClassName="border-neutral-400"
            pointerClassName="text-neutral-400"
            containerClassName="inline-block"
          >
            <span className="text-neutral-900 dark:text-neutral-100">expectation</span>
          </PointerHighlight>{" "}
          of your creator dashboard as a Blocasset User?
        </h1>
      </div>

      {/* Right: 2x2 grid */}
      <div className="w-full columns-2 gap-2">
        {responses.map((r, i) => (
          <div
            key={r.id}
            className="flex flex-col bg-neutral-50 dark:bg-neutral-800 break-inside-avoid mb-2"
            style={{
              padding: 28,
              borderRadius: 4,
            }}
          >
            <p className="text-sm leading-relaxed text-neutral-900 dark:text-neutral-100">{r.quote}</p>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-auto pt-4">{r.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
