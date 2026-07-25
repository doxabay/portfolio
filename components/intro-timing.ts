// Shared timing for the page's load-in cascade, so the hero and the rest of the
// page (Work heading + case-study cards) form one progressive, top-down sequence.

export const REVEAL_EASE = [0.2, 0, 0, 1] as const;

// Every element shares one duration and appears at a constant (linear) delay after
// the previous one: delay(i) = BASE + i * STEP. This keeps the cadence even across
// the whole cascade — no faster/slower gaps between any two consecutive elements.
export const BASE = 0.15; // delay of the first element (line 1)
export const STEP = 0.12; // constant gap between consecutive elements
export const DUR = 0.6; // per-element reveal duration
export const at = (i: number) => BASE + i * STEP;

// Cascade order by index: 0 line 1, 1 line 2, 2 lede, then one per role,
// then the Work heading, then one per case-study card.
export const heroCount = (roleCount: number) => 3 + roleCount; // elements before Work

// Intro choreography (ms), sequenced AFTER the load cascade settles. Each stage
// starts once the previous one has visibly finished:
//   1) page cascade  →  2) inspect overlay auto-draws on line 2
//   →  3) Spectrum gradient sweeps line 1  →  4) typewriter/wireframe cursor action.
export const INSPECT_AUTO_DELAY = 2000; // hero has settled → auto-open the overlay
export const INSPECT_AUTO_HOLD = 1800; // draw-in (~0.8s) + hold before it auto-closes
export const INSPECT_EXIT = 200; // overlay fade-out
export const PAUSE_BEFORE_GRADIENT = 500; // deliberate beat between line 2 and line 1

// When the inspect overlay has fully closed (line 2 done).
export const INSPECT_DONE = INSPECT_AUTO_DELAY + INSPECT_AUTO_HOLD + INSPECT_EXIT; // ms

export const SHIMMER_DURATION = 0.45;
export const SHIMMER_LOOPS = 3;
// Gradient fires after the ~5s pause following the inspect overlay, then replays on hover.
export const SHIMMER_DELAY = (INSPECT_DONE + PAUSE_BEFORE_GRADIENT) / 1000; // s

// The typewriter's cursor action begins after the gradient sweep completes.
export const TYPEWRITER_DELAY =
  INSPECT_DONE + PAUSE_BEFORE_GRADIENT + SHIMMER_DURATION * SHIMMER_LOOPS * 1000 + 250; // ms
