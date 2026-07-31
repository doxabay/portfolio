"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const MIN_WIDTH = 560; // the original reading-column width — also the hard floor
const MAX_WIDTH = 800; // widest the column may grow to
const GRIP_OFFSET = 16; // px gap between the column's edge and the grip/line
const KEY_STEP = 48; // px change per arrow keypress

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Wraps the case-study reading column and lets desktop visitors drag its right
 * edge to widen the whole column (text + media grow together). The width is
 * published as the `--cs-w` CSS variable, which every `max-w-[var(--cs-w,560px)]`
 * column inside reads. 560px is the minimum; the maximum is the available
 * content-area width. Double-click (or Home) snaps back to the original width.
 */
export default function ResizableContent({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(MIN_WIDTH);
  const rafRef = useRef<number | null>(null);

  const [width, setWidthState] = useState(MIN_WIDTH);
  const [maxWidth, setMaxWidth] = useState(MIN_WIDTH);
  const [enabled, setEnabled] = useState(false); // large screens only
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);

  const setWidth = useCallback((value: number) => {
    widthRef.current = value;
    setWidthState(value);
  }, []);

  // Smoothly tween to a target width (used for reset + keyboard steps). Dragging
  // sets the width directly for a 1:1 feel, so it never routes through here.
  const animateTo = useCallback(
    (target: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const start = widthRef.current;
      const t0 = performance.now();
      const duration = 260;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        setWidth(start + (target - start) * ease(p));
        if (p < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [setWidth],
  );

  // Track the lg breakpoint and the available width; clamp down on shrink.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      const isLg = mql.matches;
      setEnabled(isLg);
      const avail = Math.round(rootRef.current?.clientWidth ?? MIN_WIDTH);
      const max = Math.max(MIN_WIDTH, Math.min(avail, MAX_WIDTH));
      setMaxWidth(max);
      setWidth(clamp(widthRef.current, MIN_WIDTH, isLg ? max : MIN_WIDTH));
    };
    measure();
    mql.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      mql.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [setWidth]);

  // Lock text selection + force the resize cursor while dragging.
  useEffect(() => {
    if (!dragging) return;
    const { body } = document;
    const prevSelect = body.style.userSelect;
    const prevCursor = body.style.cursor;
    body.style.userSelect = "none";
    body.style.cursor = "col-resize";
    return () => {
      body.style.userSelect = prevSelect;
      body.style.cursor = prevCursor;
    };
  }, [dragging]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!enabled) return;
    e.preventDefault();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    // Column is centre-anchored, and the grip sits GRIP_OFFSET px beyond its
    // edge — so half the width trails the pointer by that offset.
    const half = e.clientX - centerX - GRIP_OFFSET;
    setWidth(clamp(half * 2, MIN_WIDTH, maxWidth));
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragging) return;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      animateTo(clamp(widthRef.current + KEY_STEP, MIN_WIDTH, maxWidth));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      animateTo(clamp(widthRef.current - KEY_STEP, MIN_WIDTH, maxWidth));
    } else if (e.key === "Home" || e.key === "Escape") {
      e.preventDefault();
      animateTo(MIN_WIDTH);
    }
  };

  const roundedWidth = Math.round(width);
  const active = dragging || hovered;

  return (
    <div
      ref={rootRef}
      className="relative w-full"
      style={{ ["--cs-w" as string]: `${enabled ? width : MIN_WIDTH}px` }}
    >
      {children}

      {enabled && (
        <div
          className="pointer-events-none absolute inset-y-0 z-20"
          style={{ left: `calc(50% + var(--cs-w) / 2 + ${GRIP_OFFSET}px)` }}
        >
          {/* Full-height guide line — only shows while interacting. Matches the
              section-title border colour. */}
          <div
            className={`absolute inset-y-0 left-0 w-px -translate-x-1/2 bg-neutral-200 transition-opacity duration-200 dark:bg-neutral-800 ${
              active ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Controls stay vertically centred in the viewport as you scroll */}
          <div className="sticky top-[50vh] h-0">
            {/* Live width readout — outer side of the line, updates while dragging */}
            <span
              className={`pointer-events-none absolute left-0 top-0 whitespace-nowrap tabular-nums text-neutral-500 transition-opacity duration-150 dark:text-neutral-400 ${
                active ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: "translate(8px, -50%)",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "11px",
                fontWeight: 400,
              }}
            >
              {roundedWidth}px
            </span>

            {/* Grip — the hint only surfaces after a short rest on the grip */}
            <Tooltip delayDuration={1500}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  role="separator"
                  aria-orientation="vertical"
                  aria-label={`Drag to widen the content. Double-click to reset. Current width ${roundedWidth} pixels.`}
                  aria-valuemin={MIN_WIDTH}
                  aria-valuemax={maxWidth}
                  aria-valuenow={roundedWidth}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  onDoubleClick={() => animateTo(MIN_WIDTH)}
                  onPointerEnter={() => setHovered(true)}
                  onPointerLeave={() => setHovered(false)}
                  onKeyDown={onKeyDown}
                  className="pointer-events-auto absolute left-0 top-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-col-resize touch-none items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/60 dark:focus-visible:ring-neutral-500/60"
                >
                  <span
                    className={`w-1 rounded-full transition-all duration-200 ease-out ${
                      active
                        ? "h-[38px] bg-neutral-400 dark:bg-neutral-400"
                        : "h-8 bg-neutral-300/80 dark:bg-neutral-600"
                    }`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={36}>
                Drag to widen · Double-click to reset
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}
