import type { DotJSON } from "./types";

// Deterministic LCG — same seed = same dot cloud every time
class LCG {
  private s: number;
  constructor(seed: number) { this.s = seed >>> 0; }
  next(): number {
    this.s = (Math.imul(this.s, 1664525) + 1013904223) >>> 0;
    return this.s / 0x100000000;
  }
}

// Generate a visually interesting dither cloud: dense nucleus + soft rim halo.
// Coordinates in [0, W] × [0, H] — initBuffers will fit-scale to canvas.
export function generateSample(count = 5000): DotJSON[] {
  const rng = new LCG(2025);
  const W = 900, H = 700;
  const cx = W / 2, cy = H / 2;
  const dots: DotJSON[] = [];
  const maxAttempts = count * 25;
  let attempts = 0;

  while (dots.length < count && attempts < maxAttempts) {
    const x = rng.next() * W;
    const y = rng.next() * H;
    attempts++;

    // Elliptical normalised distance (portrait aspect)
    const dx = (x - cx) / (W * 0.36);
    const dy = (y - cy) / (H * 0.40);
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Soft nucleus with faint rim halo
    const nucleus = Math.exp(-dist * dist * 5.5);
    const rim     = Math.exp(-(dist - 0.72) * (dist - 0.72) * 28) * 0.22;
    const density = nucleus + rim;

    if (rng.next() < density) {
      // Dots taper slightly toward edges — characteristic of dithered photography
      const edgeFactor = 1 - Math.min(dist, 1) * 0.28;
      dots.push({
        x,
        y,
        r: Math.max(0.5, (0.7 + rng.next() * 0.9) * edgeFactor),
        opacity: 0.78 + rng.next() * 0.22,
      });
    }
  }

  return dots;
}
