"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import InspectOverlay, { type InspectBox } from "./inspect-overlay";
import HeroTypewriter from "./hero-typewriter";
import {
  REVEAL_EASE,
  at,
  DUR,
  SHIMMER_DELAY,
  SHIMMER_DURATION,
  SHIMMER_LOOPS,
  INSPECT_AUTO_DELAY,
  INSPECT_AUTO_HOLD,
} from "./intro-timing";

type Role = { label: string; text: ReactNode };

const SHIMMER_MASK = "linear-gradient(100deg, transparent 26%, #000 50%, transparent 74%)";

export default function HeroIntro({ lede, roles }: { lede: ReactNode; roles: Role[] }) {
  const reduce = useReducedMotion();

  const revealProps = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12, filter: "blur(8px)" },
    animate: reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: DUR, ease: REVEAL_EASE, delay },
  });

  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const canHover = useRef(false);
  const hovering = useRef(false); // user is actively hovering line 2 (vs. the auto-play)
  const [box, setBox] = useState<InspectBox | null>(null);
  const [inspecting, setInspecting] = useState(false);
  // Each increment restarts the "Designing:" Spectrum sweep (keyed remount below).
  const [sweep, setSweep] = useState(0);
  const replaySweep = () => setSweep((s) => s + 1);

  useEffect(() => {
    canHover.current =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;
    const wr = wrap.getBoundingClientRect();
    const tr = text.getBoundingClientRect();
    const cs = getComputedStyle(text);
    const fs = parseFloat(cs.fontSize);

    // Exact baseline: a zero-size inline-block's bottom edge aligns to the text
    // baseline, so its top gives the baseline y precisely — no metric guessing.
    const probe = document.createElement("span");
    probe.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline";
    text.appendChild(probe);
    const baseline = probe.getBoundingClientRect().top - wr.top;
    text.removeChild(probe);

    // Exact x-height from the font itself: the top of a lowercase 'x' above the
    // baseline. Falls back to a ratio if TextMetrics isn't available.
    let xHeight = fs * 0.52;
    const ctx = document.createElement("canvas").getContext("2d");
    if (ctx) {
      ctx.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
      const m = ctx.measureText("x");
      if (m.actualBoundingBoxAscent) xHeight = m.actualBoundingBoxAscent;
    }

    setBox({
      x: tr.left - wr.left,
      y: tr.top - wr.top,
      w: tr.width,
      h: tr.height,
      fs,
      baseline,
      xHeightLine: baseline - xHeight,
      dark: document.documentElement.classList.contains("dark"),
    });
  }, []);

  const startInspect = () => {
    if (!canHover.current) return;
    hovering.current = true;
    measure();
    setInspecting(true);
  };
  const endInspect = () => {
    hovering.current = false;
    setInspecting(false);
  };

  useEffect(() => {
    if (!inspecting) return;
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [inspecting, measure]);

  // One-time intro choreography: after the load cascade settles, auto-draw the
  // inspect overlay on line 2, close it, then fire the Spectrum gradient on line 1
  // (the typewriter picks up after that — see TYPEWRITER_DELAY). Hovering line 2 or
  // "Designing:" still replays each effect on its own; a live hover wins over the
  // auto-play so it never closes under the user's cursor.
  useEffect(() => {
    if (reduce) return;
    const timers = [
      setTimeout(() => {
        if (hovering.current) return; // already opened by hover
        measure();
        setInspecting(true);
      }, INSPECT_AUTO_DELAY),
      setTimeout(() => {
        if (!hovering.current) setInspecting(false);
      }, INSPECT_AUTO_DELAY + INSPECT_AUTO_HOLD),
      setTimeout(replaySweep, SHIMMER_DELAY * 1000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduce, measure]);

  return (
    <>
      {/* Line 1 — "Designing:" rises + sharpens (unclipped), letter-spacing settles;
          a Spectrum band shimmers across it a few times, then leaves. Gradient caret blinks. */}
      <div className="flex">
        <h1 className="text-[34px] leading-[42px] font-semibold tracking-[-0.66px] text-neutral-900 dark:text-neutral-100 text-left">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(8px)", letterSpacing: "0.1em" }}
            animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "-0.66px" }}
            transition={{ duration: DUR, ease: REVEAL_EASE, delay: at(0) }}
          >
            <span
              className="relative inline-block"
              onMouseEnter={reduce ? undefined : replaySweep}
            >
              Designing:
              {!reduce && sweep > 0 && (
                <span
                  key={sweep}
                  aria-hidden
                  className="text-spectrum pointer-events-none absolute inset-0 select-none"
                  style={{
                    WebkitMaskImage: SHIMMER_MASK,
                    maskImage: SHIMMER_MASK,
                    WebkitMaskSize: "260% 100%",
                    maskSize: "260% 100%",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    animation: `spectrum-shimmer ${SHIMMER_DURATION}s ease-in-out 0s ${SHIMMER_LOOPS} both`,
                  }}
                >
                  Designing:
                </span>
              )}
            </span>
          </motion.span>
          <motion.span
            className="inline"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: at(0) + 0.35 }}
          >
            <HeroTypewriter reduce={!!reduce} />
          </motion.span>
        </h1>
      </div>

      {/* Line 2 — rises + sharpens (unclipped), neutral throughout.
          On hover it becomes an inspectable "design file" (Act 2). */}
      <div
        ref={wrapRef}
        className="relative flex w-fit"
        onMouseEnter={startInspect}
        onMouseLeave={endInspect}
      >
        <h2 className="text-[34px] leading-[42px] font-semibold tracking-[-0.66px] text-neutral-900 dark:text-neutral-100 text-left">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: DUR, ease: REVEAL_EASE, delay: at(1) }}
            >
              <span ref={textRef} className="inline-block">
                <span className="mr-1.5 align-baseline text-[11px] font-medium uppercase tracking-tight text-neutral-400 dark:text-neutral-500 font-[family-name:var(--font-ibm-plex-mono)]">
                  With
                </span>
                Curiosity, Empathy x Craft
              </span>
            </motion.span>
        </h2>

        <AnimatePresence>
          {inspecting && box && <InspectOverlay box={box} reduce={!!reduce} />}
        </AnimatePresence>
      </div>

      {/* Body — a tightened lede + a scannable, timeline-style role list */}
      <div className="mt-6 text-left">
        <motion.p className="text-neutral-600 dark:text-neutral-400" {...revealProps(at(2))}>
          {lede}
        </motion.p>

        <dl className="mt-6 space-y-3">
          {roles.map((r, i) => (
            <motion.div
              key={r.label}
              className="flex gap-4"
              {...revealProps(at(3 + i))}
            >
              <dt className="w-14 shrink-0 pt-[3px] font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                {r.label}
              </dt>
              <dd className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {r.text}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </>
  );
}
