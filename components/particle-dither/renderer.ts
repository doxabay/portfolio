import type { ParticleBuffers, RenderConfig } from "./types";

const TAU = Math.PI * 2;

// Pure render function — called every animation frame after stepPhysics.
// Batches all white/full-opacity particles into a single path for one GPU draw call.
// Variable-opacity and colored particles are rendered in separate grouped passes.
export function drawFrame(
  ctx: CanvasRenderingContext2D,
  buf: ParticleBuffers,
  cfg: RenderConfig,
): void {
  const { dpr, cssW, cssH, particleScale, glow } = cfg;
  const { x, y, r, opacity, colors, count } = buf;
  const bg = cfg.backgroundColor ?? "#000000";

  // DPR-aware transform — particle coords are CSS pixels, canvas pixels = CSS * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, cssW, cssH);

  if (glow) {
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(255,255,255,0.45)";
  }

  // ── Fast path: full-opacity white particles in one path+fill ─────────────
  ctx.fillStyle = "#ffffff";
  ctx.globalAlpha = 1;
  ctx.beginPath();
  for (let i = 0; i < count; i++) {
    if (opacity[i] > 0.95 && colors[i] === null) {
      const pr = r[i] * particleScale;
      ctx.moveTo(x[i] + pr, y[i]);        // moveTo prevents subpath joining
      ctx.arc(x[i], y[i], pr, 0, TAU);
    }
  }
  ctx.fill();

  if (glow) ctx.shadowBlur = 0;

  // ── Variable-opacity white particles (batched by 0.1-wide buckets) ───────
  for (let bucket = 0; bucket < 10; bucket++) {
    const lo  = bucket * 0.1;
    const hi  = lo + 0.1;
    const mid = (lo + hi) * 0.5;
    let   any = false;

    for (let i = 0; i < count; i++) {
      const op = opacity[i];
      if (colors[i] !== null || op > 0.95) continue;
      if (op >= lo && op < hi) {
        if (!any) {
          ctx.globalAlpha = mid;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          any = true;
        }
        const pr = r[i] * particleScale;
        ctx.moveTo(x[i] + pr, y[i]);
        ctx.arc(x[i], y[i], pr, 0, TAU);
      }
    }
    if (any) ctx.fill();
  }

  // ── Colored particles (one draw call per unique color) ────────────────────
  const colorGroups = new Map<string, number[]>();
  for (let i = 0; i < count; i++) {
    const c = colors[i];
    if (c !== null) {
      if (!colorGroups.has(c)) colorGroups.set(c, []);
      colorGroups.get(c)!.push(i);
    }
  }
  for (const [color, indices] of colorGroups) {
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (const i of indices) {
      ctx.globalAlpha = opacity[i];
      const pr = r[i] * particleScale;
      ctx.moveTo(x[i] + pr, y[i]);
      ctx.arc(x[i], y[i], pr, 0, TAU);
    }
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}
