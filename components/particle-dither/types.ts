export interface DotJSON {
  x: number;
  y: number;
  r?: number;
  radius?: number;
  opacity?: number;
  color?: string;
}

// All particle state as flat typed arrays — no per-frame object allocation
export interface ParticleBuffers {
  x: Float32Array;        // current position
  y: Float32Array;
  ox: Float32Array;       // original (resting) position
  oy: Float32Array;
  vx: Float32Array;       // velocity
  vy: Float32Array;
  r: Float32Array;        // radius (fitted pixel space)
  opacity: Float32Array;
  colors: (string | null)[]; // null = default white
  count: number;
}

export interface PhysicsConfig {
  interactionRadius: number;  // px — cursor field radius
  forceStrength: number;      // repulsion multiplier
  damping: number;            // velocity retention per frame [0–1]
  returnSpeed: number;        // spring stiffness [0–1]
  velocityCap: number;        // max px/frame — clamps overshoot and oscillation
  restThreshold: number;      // L1 speed below which velocity is zeroed
  cursorFalloff: number;      // force falloff exponent (1=linear … 5=very sharp)
}

export interface RenderConfig {
  particleScale: number;
  glow: boolean;
  backgroundColor?: string;  // defaults to "#000000" in renderer
  dpr: number;
  cssW: number;
  cssH: number;
}

export const DEFAULT_PHYSICS: PhysicsConfig = {
  interactionRadius: 240,
  forceStrength: 5.5,
  damping: 0.72,
  returnSpeed: 0.03,
  velocityCap: 60,
  restThreshold: 0.01,
  cursorFalloff: 5,
};

export const DEFAULT_RENDER: RenderConfig = {
  particleScale: 1,
  glow: false,
  dpr: 1,
  cssW: 800,
  cssH: 600,
};
