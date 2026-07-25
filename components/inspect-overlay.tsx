"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

const EASE = [0.2, 0, 0, 1] as const;
const SELECT = "var(--spectrum-1)"; // Figma-blue selection = our first Spectrum stop

export type InspectBox = {
  x: number;
  y: number;
  w: number;
  h: number;
  fs: number;
  // Real measured type metrics (relative to the wrap), so the guides sit exactly
  // on the rendered text rather than on font-agnostic ratio guesses.
  baseline: number;
  xHeightLine: number;
  dark: boolean;
};

export default function InspectOverlay({
  box,
  reduce,
}: {
  box: InspectBox;
  reduce: boolean;
}) {
  const { x, y, w, h, baseline, xHeightLine, dark } = box;

  // Real measured dimensions, counted up
  const wMV = useMotionValue(reduce ? Math.round(w) : 0);
  const hMV = useMotionValue(reduce ? Math.round(h) : 0);
  const wText = useTransform(wMV, (v) => Math.round(v).toString());
  const hText = useTransform(hMV, (v) => Math.round(v).toString());

  useEffect(() => {
    if (reduce) return;
    const a1 = animate(wMV, w, { duration: 0.5, ease: EASE, delay: 0.18 });
    const a2 = animate(hMV, h, { duration: 0.5, ease: EASE, delay: 0.18 });
    return () => {
      a1.stop();
      a2.stop();
    };
  }, [w, h, reduce, wMV, hMV]);

  const corners = [
    { left: x, top: y },
    { left: x + w, top: y },
    { left: x, top: y + h },
    { left: x + w, top: y + h },
  ];

  // Report line 2's actual text color: text-neutral-900 in light, dark:text-neutral-100 in dark.
  const oklch = dark ? "oklch(0.97 0 0)" : "oklch(0.205 0 0)";

  const draw = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { clipPath: "inset(0 100% 0 0)" },
        animate: { clipPath: "inset(0 0% 0 0)" },
      };

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
      transition={{ duration: 0.15 }}
    >
      {/* Selection box */}
      <motion.div
        className="absolute"
        style={{
          left: x,
          top: y,
          width: w,
          height: h,
          border: `1px solid ${SELECT}`,
        }}
        initial={draw.initial}
        animate={draw.animate}
        transition={{ duration: 0.45, ease: EASE }}
      />

      {/* Corner handles */}
      {corners.map((c, i) => (
        <motion.span
          key={i}
          className="absolute h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-[1px] bg-white"
          style={{ left: c.left, top: c.top, border: `1px solid ${SELECT}` }}
          initial={reduce ? { opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: EASE, delay: reduce ? 0 : 0.4 }}
        />
      ))}

      {/* baseline + x-height guides — lines extend into the left margin, labeled there */}
      {[
        { top: xHeightLine, label: "x-height", labelTop: xHeightLine - 12 },
        { top: baseline, label: "baseline", labelTop: baseline + 3 },
      ].flatMap((g) => [
        <motion.div
          key={`${g.label}-line`}
          className="absolute origin-left"
          style={{
            left: -52,
            top: g.top,
            width: w + 52,
            height: 1,
            background: SELECT,
          }}
          initial={reduce ? { opacity: 0.45 } : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.45 }}
          transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : 0.32 }}
        />,
        <motion.span
          key={`${g.label}-label`}
          className="absolute text-[9px] leading-none"
          style={{ left: -52, top: g.labelTop, color: SELECT }}
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: EASE, delay: reduce ? 0 : 0.5 }}
        >
          {g.label}
        </motion.span>,
      ])}

      {/* Floating inspector chips to the right of the selection */}
      <motion.div
        className="absolute flex flex-col gap-1.5"
        style={{ left: x + w + 16, top: y - 2 }}
        initial={reduce ? { opacity: 1 } : { opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: EASE, delay: reduce ? 0 : 0.35 }}
      >
        {/* dimension chip */}
        <span
          className="inline-flex w-fit items-center rounded-[5px] px-1.5 py-0.5 text-[11px] leading-none text-white"
          style={{ background: SELECT }}
        >
          <motion.span>{wText}</motion.span>
          <span className="mx-0.5 opacity-70">×</span>
          <motion.span>{hText}</motion.span>
        </span>

        {/* color chip */}
        <span className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-neutral-200 bg-white px-1.5 py-0.5 text-[11px] leading-none text-neutral-600 dark:border-white/15 dark:bg-neutral-800 dark:text-neutral-300">
          <span
            className="h-2.5 w-2.5 rounded-[3px] border border-black/10 dark:border-white/20"
            style={{ background: oklch }}
          />
          {oklch}
        </span>
      </motion.div>
    </motion.div>
  );
}
