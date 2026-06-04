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
    <div className="flex flex-row gap-12 py-14 px-10 rounded-2xl mb-16">
      {/* Left: question */}
      <div className="w-[35%] flex flex-col items-start justify-start">
        <p className="text-xs uppercase tracking-widest text-orange-500 mb-5 font-medium">
          FEEDBACKS
        </p>
        <p
          className="leading-[1.25] text-zinc-800"
          style={{ fontFamily: "KaliceTrial", fontSize: "clamp(1.4rem, 2vw, 1.85rem)" }}
        >
          <span className="italic">What&apos;s your </span>
          <PointerHighlight
            rectangleClassName="border-orange-500"
            pointerClassName="text-orange-500"
            containerClassName="inline-block"
          >
            <span className="text-orange-500">expectation</span>
          </PointerHighlight>
          <span> </span>
          <span className="text-zinc-400">of your </span>
          <span className="italic">creator dashboard </span>
          <span className="text-zinc-400">as a </span>
          <span className="italic font-medium">Blocasset User?</span>
        </p>
      </div>

      {/* Right: 2x2 grid */}
      <div className="flex-1 grid grid-cols-2 gap-3 items-start">
        {responses.map((r, i) => (
          <div
            key={r.id}
            className={`flex flex-col border rounded-[12px] ${r.bg} ${r.border}`}
            style={{
              padding: 28,
            }}
          >
            <p className="text-base leading-relaxed text-neutral-600">{r.quote}</p>
            <p className="text-sm font-medium text-zinc-800 mt-auto pt-4">{r.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
