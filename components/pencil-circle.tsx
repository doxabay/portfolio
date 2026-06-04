"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export function PencilCircle({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="relative inline-block mb-2">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 148 30"
        preserveAspectRatio="none"
        fill="none"
        className="absolute pointer-events-none"
        style={{ top: "-5px", left: "-10px", width: "calc(100% + 20px)", height: "calc(100% + 10px)" }}
      >
        <motion.path
          d="M7,15 C9,5 32,1 74,2 C116,3 141,6 143,14 C145,22 120,28 76,28 C32,28 5,24 4,18 C2,12 6,24 7,15Z"
          stroke="#f97316"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={inView ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.5s" }}
        />
      </svg>
    </div>
  );
}
