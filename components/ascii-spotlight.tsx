"use client";

import { useEffect, useRef } from "react";

const RAMP = " .,:;i1tfLCG08@";
const FONT_SIZE = 11;
const LINE_H = 17;
const BG = "#09090b";
const DIM = "#3f3f46";
const HOT = { r: 242, g: 98, b: 85 };
const DIM_C = { r: 63, g: 63, b: 70 };

export default function AsciiSpotlight({ preview = false }: { preview?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr = window.devicePixelRatio || 1;
    let charW = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const t0 = Date.now();
    const RADIUS = preview ? 70 : 160;

    function draw() {
      const ctx = canvas.getContext("2d")!;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;

      if (W === 0 || H === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px "Courier New", Courier, monospace`;
      ctx.textBaseline = "top";

      if (!charW) charW = ctx.measureText("M").width;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      const COLS = Math.ceil(W / charW) + 1;
      const ROWS = Math.ceil(H / LINE_H) + 1;

      const t = (Date.now() - t0) / 1000;
      const mx = preview
        ? W / 2 + Math.cos(t * 0.7) * W * 0.3 + Math.cos(t * 0.31) * W * 0.08
        : mouseRef.current.x;
      const my = preview
        ? H / 2 + Math.sin(t * 0.55) * H * 0.3 + Math.sin(t * 0.43) * H * 0.08
        : mouseRef.current.y;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const cx = col * charW + charW * 0.5;
          const cy = row * LINE_H + LINE_H * 0.5;
          const dist = Math.hypot(cx - mx, cy - my);
          const b = Math.max(0, 1 - dist / RADIUS);

          if (b < 0.02) {
            ctx.fillStyle = DIM;
            ctx.fillText(".", col * charW, row * LINE_H);
          } else {
            const curved = Math.pow(b, 0.55);
            const idx = Math.min(Math.floor(curved * RAMP.length), RAMP.length - 1);
            const r = Math.round(HOT.r * curved + DIM_C.r * (1 - curved));
            const g = Math.round(HOT.g * curved + DIM_C.g * (1 - curved));
            const bl = Math.round(HOT.b * curved + DIM_C.b * (1 - curved));
            ctx.fillStyle = `rgb(${r},${g},${bl})`;
            ctx.fillText(RAMP[idx], col * charW, row * LINE_H);
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [preview]);

  if (preview) {
    return <canvas ref={canvasRef} className="w-full h-full block" />;
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden" style={{ background: BG }}>
      <div className="px-6 pt-5 pb-2 border-b border-neutral-800">
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Experiment 02</p>
        <p className="text-sm font-medium text-neutral-300 mt-0.5">ASCII Spotlight</p>
      </div>
      <div className="p-8">
        <canvas
          ref={canvasRef}
          className="w-full block rounded-xl cursor-crosshair"
          style={{ height: 460 }}
          onMouseMove={(e) => {
            const rect = canvasRef.current!.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
          }}
          onMouseLeave={() => {
            mouseRef.current = { x: -9999, y: -9999 };
          }}
        />
        <p className="text-xs text-neutral-600 mt-4 text-center tracking-wide">
          move cursor to illuminate
        </p>
      </div>
    </div>
  );
}
