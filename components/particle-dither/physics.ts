import type { ParticleBuffers, PhysicsConfig } from "./types";

// Pure step function — no allocations, all arithmetic on typed-array views.
export function stepPhysics(
  buf: ParticleBuffers,
  cursorX: number,
  cursorY: number,
  config: PhysicsConfig,
): void {
  const { x, y, ox, oy, vx, vy } = buf;
  const n = buf.count;

  const R  = config.interactionRadius;
  const R2 = R * R;
  const F  = config.forceStrength;
  const { damping, returnSpeed, velocityCap, restThreshold, cursorFalloff } = config;
  const cap2 = velocityCap * velocityCap;

  for (let i = 0; i < n; i++) {
    // ── Cursor repulsion ────────────────────────────────────────────────────
    const dx = x[i] - cursorX;
    const dy = y[i] - cursorY;
    const d2 = dx * dx + dy * dy;

    if (d2 < R2 && d2 > 0.001) {
      const d   = Math.sqrt(d2);
      const t   = 1 - d / R;
      // Configurable falloff exponent — 1=linear, 3=cubic (default), 5=sharp centre focus
      const mag = F * Math.pow(t, cursorFalloff);
      const inv = mag / d;
      vx[i] += dx * inv;
      vy[i] += dy * inv;
    }

    // ── Spring toward origin ────────────────────────────────────────────────
    vx[i] += (ox[i] - x[i]) * returnSpeed;
    vy[i] += (oy[i] - y[i]) * returnSpeed;

    // ── Damping ─────────────────────────────────────────────────────────────
    vx[i] *= damping;
    vy[i] *= damping;

    // ── Velocity cap — prevents overshoot and oscillation ───────────────────
    const spd2 = vx[i] * vx[i] + vy[i] * vy[i];
    if (spd2 > cap2) {
      const s = velocityCap / Math.sqrt(spd2);
      vx[i] *= s;
      vy[i] *= s;
    }

    // ── Rest snap — zeroes near-still particles to kill micro-oscillation ───
    if (Math.abs(vx[i]) + Math.abs(vy[i]) < restThreshold) {
      vx[i] = 0;
      vy[i] = 0;
    }

    // ── Integrate ───────────────────────────────────────────────────────────
    x[i] += vx[i];
    y[i] += vy[i];
  }
}
