"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { TYPEWRITER_DELAY } from "./intro-timing";

// Decelerating ease shared by the two caret sweeps (wireframe reveal + cleanup wipe)
// so the reveal reads as the exact reverse of the clean-up.
const SWEEP_EASE = [0.22, 1, 0.36, 1] as const;

// Timeline (ms). START_DELAY lands after the intro choreography (inspect overlay →
// gradient) so the cursor action is the last thing to play — see intro-timing.ts.
const START_DELAY = TYPEWRITER_DELAY;
const TYPE_MS = 40; // per character while typing
const REVEAL_MS = 380; // caret drags right, unclipping the wireframe into view
const SWEEP_MS = 400; // caret drags left, wiping the whole row (label + wireframe) away
const PAUSE_BEFORE_WIRE = 900; // hold on the typed label before the wireframe reveals
const HOLD = 3000; // time the wireframe stays revealed
const PAUSE_AFTER_WIRE = 300;
const GAP = 3600; // idle caret before the next element
const WIRE_GAP = 7; // px between the label and the wireframe once revealed

type Element = { label: string; wireframe: ReactNode };

// Each wireframe keeps its own aspect ratio: up to 40px wide, capped at 32px tall
// so nothing grows the heading's line box (no layout shift).
const wire = (src: string, w: number, h: number) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt="" width={w} height={h} className="block h-auto w-auto max-h-[32px] max-w-[40px] shrink-0" />
);

// The loop cycles through these design elements; add more here.
const ELEMENTS: Element[] = [
  { label: "BUTTONS", wireframe: wire("/wireframes/button.svg", 50, 29) },
  { label: "IMAGES", wireframe: wire("/wireframes/image.svg", 50, 40) },
  { label: "FORMS", wireframe: wire("/wireframes/form.svg", 50, 50) },
  { label: "TOGGLES", wireframe: wire("/wireframes/toggle.svg", 41, 28) },
];

export default function HeroTypewriter({ reduce }: { reduce: boolean }) {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [showWire, setShowWire] = useState(false);
  const [active, setActive] = useState(false); // caret solid while typing/sweeping
  const rowRef = useRef<HTMLSpanElement>(null); // wraps label + wireframe — the wipe target
  const wireRef = useRef<HTMLSpanElement>(null); // the wireframe's own reveal clip

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        timers.push(setTimeout(res, ms));
      });
    // Wait for the browser to lay out a just-mounted node before measuring/animating it.
    const nextFrame = () =>
      new Promise<void>((res) => requestAnimationFrame(() => requestAnimationFrame(() => res())));

    (async () => {
      await sleep(START_DELAY);
      let i = 0;
      while (!cancelled) {
        const el = ELEMENTS[i];
        setIndex(i);
        setActive(true);

        // Type the label out
        for (let c = 1; c <= el.label.length; c++) {
          if (cancelled) return;
          setTyped(el.label.slice(0, c));
          await sleep(TYPE_MS);
        }

        // Reveal the wireframe as a smooth caret sweep: it mounts clipped to width 0
        // and its width (plus the leading gap) expands to natural size, so the caret —
        // laid out just after the row — rides the reveal front rightward. This mirrors
        // the clean-up wipe below instead of popping in.
        await sleep(PAUSE_BEFORE_WIRE);
        setShowWire(true);
        await nextFrame();
        if (cancelled) return;
        const wnode = wireRef.current;
        if (wnode) {
          const target = wnode.scrollWidth; // natural width while clipped to 0
          await animate(
            wnode,
            { width: [0, target], marginLeft: [0, WIRE_GAP] },
            { duration: REVEAL_MS / 1000, ease: SWEEP_EASE }
          ).finished;
        }
        if (cancelled) return;

        setActive(false); // caret idles while the wireframe holds
        await sleep(HOLD);

        // Clean it up in one motion: collapse the whole row (label + wireframe) to width
        // 0 so the caret rides the wipe front leftward back to its pre-typing origin.
        await sleep(PAUSE_AFTER_WIRE);
        setActive(true);
        const rnode = rowRef.current;
        if (rnode) {
          const w = rnode.offsetWidth;
          // Collapse the left margin (ml-[8px]) together with the width so the caret
          // lands exactly at its origin — otherwise the margin lingers and the caret
          // snaps 8px left when the row unmounts (the backspace-like blip).
          await animate(
            rnode,
            { width: [w, 0], marginLeft: [8, 0] },
            { duration: SWEEP_MS / 1000, ease: SWEEP_EASE }
          ).finished;
        }
        if (cancelled) return;
        // Clear the row while it's still collapsed to width 0 — unmounting it here avoids
        // a one-frame flash of the full content that resetting the width would cause.
        // The next element remounts a fresh row/wireframe (no stale inline width).
        setTyped("");
        setShowWire(false);

        setActive(false);
        await sleep(GAP);
        i = (i + 1) % ELEMENTS.length;
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  const element = ELEMENTS[index];

  return (
    <span aria-hidden>
      {typed && (
        <span
          ref={rowRef}
          className="ml-[8px] inline-flex items-baseline overflow-hidden whitespace-nowrap align-baseline"
        >
          <span className="inline-block text-[11px] leading-none font-medium uppercase tracking-tight text-neutral-400 dark:text-neutral-500 font-[family-name:var(--font-ibm-plex-mono)]">
            {typed}
          </span>

          {showWire && (
            <span
              ref={wireRef}
              className="inline-flex overflow-hidden align-baseline text-[0px] leading-none text-neutral-400 dark:text-neutral-500"
              style={{ width: 0 }}
            >
              {element.wireframe}
            </span>
          )}
        </span>
      )}

      <span
        className={`ml-[6px] inline-block h-[0.82em] w-[3px] translate-y-[0.08em] rounded-full align-baseline ${
          active ? "" : "animate-pulse [animation-duration:0.9s]"
        }`}
        style={{ backgroundImage: "var(--gradient-spectrum)" }}
      />
    </span>
  );
}
