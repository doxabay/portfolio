import type { DotJSON, ParticleBuffers } from "./types";

export function createBuffers(count: number): ParticleBuffers {
  return {
    x: new Float32Array(count),
    y: new Float32Array(count),
    ox: new Float32Array(count),
    oy: new Float32Array(count),
    vx: new Float32Array(count),
    vy: new Float32Array(count),
    r: new Float32Array(count),
    opacity: new Float32Array(count),
    colors: new Array(count).fill(null),
    count,
  };
}

// Parse raw JSON (flexible field names) → validated DotJSON[]
export function parseJSON(raw: unknown): DotJSON[] {
  if (!Array.isArray(raw)) throw new Error("JSON must be an array");
  return raw.map((d: Record<string, unknown>, i) => {
    if (typeof d !== "object" || d === null) throw new Error(`Item ${i} is not an object`);
    const x = Number(d.x);
    const y = Number(d.y);
    if (!isFinite(x) || !isFinite(y)) throw new Error(`Item ${i} missing valid x/y`);
    return {
      x,
      y,
      r: Number(d.r ?? d.radius ?? 1) || 1,
      opacity: Number(d.opacity ?? d.alpha ?? 1),
      color: typeof d.color === "string" ? d.color : undefined,
    };
  });
}

// Fit-scale dots to canvas, initialize all buffers
export function initBuffers(
  dots: DotJSON[],
  cssW: number,
  cssH: number,
): ParticleBuffers {
  const n = dots.length;
  const buf = createBuffers(n);

  if (n === 0) return buf;

  // Compute bounding box
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const d of dots) {
    if (d.x < minX) minX = d.x;
    if (d.x > maxX) maxX = d.x;
    if (d.y < minY) minY = d.y;
    if (d.y > maxY) maxY = d.y;
  }

  const srcW = maxX - minX || 1;
  const srcH = maxY - minY || 1;
  const pad = Math.min(cssW, cssH) * 0.08;
  const availW = cssW - pad * 2;
  const availH = cssH - pad * 2;
  const fit = Math.min(availW / srcW, availH / srcH);

  // Center the composition
  const offX = pad + (availW - srcW * fit) / 2 - minX * fit;
  const offY = pad + (availH - srcH * fit) / 2 - minY * fit;

  for (let i = 0; i < n; i++) {
    const d = dots[i];
    const sx = d.x * fit + offX;
    const sy = d.y * fit + offY;
    buf.x[i] = buf.ox[i] = sx;
    buf.y[i] = buf.oy[i] = sy;
    buf.vx[i] = 0;
    buf.vy[i] = 0;
    // Scale radius proportionally, clamp to crisp range
    buf.r[i] = Math.max(0.4, Math.min(6, (d.r ?? 1) * fit * 0.6));
    buf.opacity[i] = Math.max(0, Math.min(1, d.opacity ?? 1));
    buf.colors[i] = d.color ?? null;
  }

  return buf;
}
