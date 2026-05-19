import type { AlgorithmId, BayerSize, DitherSettings } from "./types";

// ── Error-diffusion kernels: [dx, dy, weight] ───────────────────────────────
type K = [number, number, number];

const KERNELS: Record<Exclude<AlgorithmId, "bayer">, K[]> = {
  "floyd-steinberg": [
    [1, 0, 7 / 16],
    [-1, 1, 3 / 16], [0, 1, 5 / 16], [1, 1, 1 / 16],
  ],
  "atkinson": [
    [1, 0, 1 / 8], [2, 0, 1 / 8],
    [-1, 1, 1 / 8], [0, 1, 1 / 8], [1, 1, 1 / 8],
    [0, 2, 1 / 8],
    // 6/8 of error is distributed; 2/8 is intentionally lost (Atkinson characteristic)
  ],
  "jarvis": [
    [1, 0, 7 / 48], [2, 0, 5 / 48],
    [-2, 1, 3 / 48], [-1, 1, 5 / 48], [0, 1, 7 / 48], [1, 1, 5 / 48], [2, 1, 3 / 48],
    [-2, 2, 1 / 48], [-1, 2, 3 / 48], [0, 2, 5 / 48], [1, 2, 3 / 48], [2, 2, 1 / 48],
  ],
  "stucki": [
    [1, 0, 8 / 42], [2, 0, 4 / 42],
    [-2, 1, 2 / 42], [-1, 1, 4 / 42], [0, 1, 8 / 42], [1, 1, 4 / 42], [2, 1, 2 / 42],
    [-2, 2, 1 / 42], [-1, 2, 2 / 42], [0, 2, 4 / 42], [1, 2, 2 / 42], [2, 2, 1 / 42],
  ],
  "sierra": [
    [1, 0, 5 / 32], [2, 0, 3 / 32],
    [-2, 1, 2 / 32], [-1, 1, 4 / 32], [0, 1, 5 / 32], [1, 1, 4 / 32], [2, 1, 2 / 32],
    [-1, 2, 2 / 32], [0, 2, 3 / 32], [1, 2, 2 / 32],
  ],
  "burkes": [
    [1, 0, 8 / 32], [2, 0, 4 / 32],
    [-2, 1, 2 / 32], [-1, 1, 4 / 32], [0, 1, 8 / 32], [1, 1, 4 / 32], [2, 1, 2 / 32],
  ],
};

// ── Bayer threshold matrices ─────────────────────────────────────────────────
const BAYER: Record<BayerSize, readonly (readonly number[])[]> = {
  2: [[0, 2], [3, 1]],
  4: [
    [0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5],
  ],
  8: [
    [0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],  [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21],
  ],
};

// ── Error diffusion engine ───────────────────────────────────────────────────
export function errorDiffuse(
  gray: Float32Array,
  width: number,
  height: number,
  threshold: number,
  strength: number,
  serpentine: boolean,
  algorithm: Exclude<AlgorithmId, "bayer">,
): Uint8Array {
  const buf = new Float32Array(gray);
  const out = new Uint8Array(width * height);
  const kernel = KERNELS[algorithm];

  for (let y = 0; y < height; y++) {
    const rtl = serpentine && y % 2 === 1;
    for (let xi = 0; xi < width; xi++) {
      const x = rtl ? width - 1 - xi : xi;
      const idx = y * width + x;
      const old = Math.max(0, Math.min(255, buf[idx]));
      const result = old >= threshold ? 255 : 0;
      out[idx] = result;
      const err = (old - result) * strength;
      if (err === 0) continue;
      for (const [kdx, kdy, w] of kernel) {
        const nx = x + (rtl ? -kdx : kdx);
        const ny = y + kdy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          buf[ny * width + nx] += err * w;
        }
      }
    }
  }
  return out;
}

// ── Ordered Bayer dithering ──────────────────────────────────────────────────
export function bayerDither(
  gray: Float32Array,
  width: number,
  height: number,
  threshold: number,
  size: BayerSize,
): Uint8Array {
  const matrix = BAYER[size];
  const n = size * size;
  const out = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      // Bayer noise maps to [-127.5, 127.5]
      const noise = ((matrix[y % size][x % size] + 0.5) / n - 0.5) * 255;
      out[idx] = gray[idx] + noise >= threshold ? 255 : 0;
    }
  }
  return out;
}

// ── Dispatcher ───────────────────────────────────────────────────────────────
export function applyDithering(
  gray: Float32Array,
  width: number,
  height: number,
  s: Pick<DitherSettings, "algorithm" | "threshold" | "errorStrength" | "serpentine" | "bayerSize">,
): Uint8Array {
  if (s.algorithm === "bayer") {
    return bayerDither(gray, width, height, s.threshold, s.bayerSize);
  }
  return errorDiffuse(gray, width, height, s.threshold, s.errorStrength, s.serpentine, s.algorithm);
}
