import type { ParticleBuffers } from "./types";

export interface Wave {
  x: number;
  y: number;
  t: number;        // frames since birth
  amplitude: number;
}

export interface WaveConfig {
  speed: number;        // wavefront travel speed (px/frame)
  sigma: number;        // Gaussian envelope half-width (px)
  spatialFreq: number;  // spatial oscillation frequency (rad/px)
  amplitude: number;    // peak force magnitude
  maxRadius: number;    // wavefront radius at which wave expires
  edgeFalloff: number;  // pow exponent for edge attenuation (0 = off)
}

export const DEFAULT_WAVE_CONFIG: WaveConfig = {
  speed: 5.5,
  sigma: 75,
  spatialFreq: 0.02,
  amplitude: 1,
  maxRadius: 900,
  edgeFalloff: 1,
};

// Traveling wavefront with sinusoidal displacement profile.
//
// For a particle at distance d from the wave origin, relD = d - wavefrontRadius:
//   relD > 0  → particle is AHEAD of the front → sin > 0 → pushed outward (compression)
//   relD < 0  → particle is BEHIND the front   → sin < 0 → pulled inward  (rarefaction)
//
// The Gaussian envelope localises force near the wavefront. globalFade dissipates
// energy quadratically as the front expands, keeping the effect cinematic rather
// than explosive on large canvases.
export function stepWaves(
  buf: ParticleBuffers,
  waves: Wave[],
  cfg: WaveConfig,
  cssW: number,
  cssH: number,
): void {
  const { speed, sigma, spatialFreq, amplitude, maxRadius, edgeFalloff } = cfg;
  const twoSigmaSq = 2 * sigma * sigma;
  const halfW = cssW * 0.5;
  const halfH = cssH * 0.5;

  for (let w = 0; w < waves.length; w++) {
    const wave = waves[w];
    wave.t += 1;
    const r = wave.t * speed; // current wavefront radius

    const tNorm      = r / maxRadius;
    const globalFade = Math.max(0, 1 - tNorm * tNorm);
    if (globalFade < 0.001) continue;

    for (let i = 0; i < buf.count; i++) {
      const dx = buf.x[i] - wave.x;
      const dy = buf.y[i] - wave.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 0.5) continue;

      const relD     = d - r;
      const envelope = Math.exp(-(relD * relD) / twoSigmaSq);
      if (envelope < 0.002) continue;

      // Edge attenuation: 0 at canvas boundary, 1 at center
      const ex       = Math.min(buf.x[i], cssW - buf.x[i]) / halfW;
      const ey       = Math.min(buf.y[i], cssH - buf.y[i]) / halfH;
      const edgeMul  = edgeFalloff === 0 ? 1 : Math.pow(Math.max(0, Math.min(ex, ey)), edgeFalloff);

      const force = Math.sin(spatialFreq * relD) * envelope * globalFade * edgeMul * amplitude * wave.amplitude;
      const invD  = 1 / d;
      buf.vx[i] += force * dx * invD;
      buf.vy[i] += force * dy * invD;
    }
  }
}
