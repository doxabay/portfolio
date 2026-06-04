"use client";

import { useEffect, useRef } from "react";
import { stepPhysics } from "./physics";
import { stepWaves, DEFAULT_WAVE_CONFIG } from "./waves";
import type { Wave, WaveConfig } from "./waves";
import { drawFrame } from "./renderer";
import { initBuffers } from "./buffers";
import type { DotJSON, ParticleBuffers, PhysicsConfig, RenderConfig } from "./types";
import { DEFAULT_PHYSICS } from "./types";

interface ParticleDitherEmbedProps {
  dots: DotJSON[];
  physics?: Partial<PhysicsConfig>;
  render?: Partial<Omit<RenderConfig, "dpr" | "cssW" | "cssH">>;
  wave?: Partial<WaveConfig>;
  className?: string;
}

export function ParticleDitherEmbed({
  dots,
  physics,
  render,
  wave,
  className = "w-full h-full block",
}: ParticleDitherEmbedProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const bufRef       = useRef<ParticleBuffers | null>(null);
  const rafRef       = useRef<number>(0);
  const cursorRef    = useRef({ x: -9999, y: -9999 });
  const wavesRef     = useRef<Wave[]>([]);
  const dprRef       = useRef(1);
  const cssRef       = useRef({ w: 0, h: 0 });

  // Merged configs — kept in refs so the RAF loop never has stale values
  const physicsRef   = useRef({ ...DEFAULT_PHYSICS, ...physics });
  const renderCfgRef = useRef<Omit<RenderConfig, "dpr" | "cssW" | "cssH">>({
    particleScale: 1, glow: false, backgroundColor: "#000000", ...render,
  });
  const waveCfgRef   = useRef({ ...DEFAULT_WAVE_CONFIG, ...wave });

  // Keep refs in sync when props change between renders
  useEffect(() => { physicsRef.current   = { ...DEFAULT_PHYSICS, ...physics };   });
  useEffect(() => { renderCfgRef.current = { particleScale: 1, glow: false, backgroundColor: "#000000", ...render }; });
  useEffect(() => { waveCfgRef.current   = { ...DEFAULT_WAVE_CONFIG, ...wave };  });

  // Canvas setup + resize — re-fits existing dots on every size change
  useEffect(() => {
    const canvas = canvasRef.current!;
    dprRef.current = window.devicePixelRatio || 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      const { width: w, height: h } = rect;
      cssRef.current = { w, h };
      canvas.width  = Math.round(w * dprRef.current);
      canvas.height = Math.round(h * dprRef.current);
      if (bufRef.current) {
        const count = bufRef.current.count;
        const rawDots: DotJSON[] = Array.from({ length: count }, (_, i) => ({
          x: bufRef.current!.ox[i],
          y: bufRef.current!.oy[i],
          r: bufRef.current!.r[i],
          opacity: bufRef.current!.opacity[i],
        }));
        bufRef.current = initBuffers(rawDots, w, h);
      }
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    return () => ro.disconnect();
  }, []);

  // Load dots whenever the prop changes
  useEffect(() => {
    if (dots.length === 0) return;
    const { w, h } = cssRef.current;
    bufRef.current = initBuffers(dots, w > 0 ? w : 800, h > 0 ? h : 600);
  }, [dots]);

  // Animation loop
  useEffect(() => {
    function loop() {
      const buf = bufRef.current;
      const ctx = canvasRef.current?.getContext("2d");
      if (buf && ctx) {
        const { w: cssW, h: cssH } = cssRef.current;
        stepPhysics(buf, cursorRef.current.x, cursorRef.current.y, physicsRef.current);
        stepWaves(buf, wavesRef.current, waveCfgRef.current, cssW, cssH);
        wavesRef.current = wavesRef.current.filter(
          (w) => w.t * waveCfgRef.current.speed < waveCfgRef.current.maxRadius,
        );
        drawFrame(ctx, buf, { ...renderCfgRef.current, dpr: dprRef.current, cssW, cssH });
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handleMouseLeave() { cursorRef.current = { x: -9999, y: -9999 }; }

  function handleClick() {
    const { x, y } = cursorRef.current;
    if (x < 0) return;
    wavesRef.current.push({ x, y, t: 0, amplitude: 1 });
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
}
