"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { stepPhysics } from "./physics";
import { stepWaves, DEFAULT_WAVE_CONFIG } from "./waves";
import type { Wave, WaveConfig } from "./waves";
import { drawFrame } from "./renderer";
import { initBuffers, parseJSON } from "./buffers";
import { generateSample } from "./sample";
import type { ParticleBuffers, PhysicsConfig, RenderConfig } from "./types";

// ── UI atoms ──────────────────────────────────────────────────────────────────

function KnobSlider({
  label, value, min, max, step = 0.01,
  fmt = (v: number) => v.toFixed(2),
  onChange,
}: {
  label: string; value: number; min: number; max: number;
  step?: number; fmt?: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-500">{label}</span>
        <span className="text-[10px] font-mono text-neutral-400 tabular-nums">{fmt(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-px appearance-none cursor-pointer bg-neutral-700 rounded accent-white"
      />
    </div>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-500">{label}</span>
      <button
        type="button" onClick={() => onChange(!value)}
        className={`relative h-4 w-7 rounded-full transition-colors ${value ? "bg-white" : "bg-neutral-700"}`}
      >
        <span className={`absolute top-0.5 h-3 w-3 rounded-full shadow transition-transform ${value ? "translate-x-3.5 bg-black" : "translate-x-0.5 bg-neutral-400"}`} />
      </button>
    </div>
  );
}

// ── Presets ───────────────────────────────────────────────────────────────────

interface Preset {
  id: string;
  name: string;
  physics: PhysicsConfig;
  render: Omit<RenderConfig, "dpr" | "cssW" | "cssH">;
  wave?: WaveConfig;
}

const PRESETS_KEY = "particle-dither-presets";

function readPresets(): Preset[] {
  try { return JSON.parse(localStorage.getItem(PRESETS_KEY) ?? "[]"); } catch { return []; }
}

function writePresets(p: Preset[]): void {
  localStorage.setItem(PRESETS_KEY, JSON.stringify(p));
}

// ── Preview (auto-orbit, no controls) ────────────────────────────────────────

function ParticleDitherPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufRef    = useRef<ParticleBuffers | null>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr    = window.devicePixelRatio || 1;
    let cssW = 0, cssH = 0;

    function resize() {
      const r = canvas.getBoundingClientRect();
      if (r.width === 0) return;
      cssW = r.width; cssH = r.height;
      canvas.width  = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      bufRef.current = initBuffers(generateSample(3000), cssW, cssH);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const t0 = Date.now();
    const physics: PhysicsConfig = {
      interactionRadius: 80, forceStrength: 3.5,
      damping: 0.88, returnSpeed: 0.055,
      velocityCap: 20, restThreshold: 0.1, cursorFalloff: 3,
    };

    function loop() {
      const buf = bufRef.current;
      if (buf && cssW > 0) {
        const t  = (Date.now() - t0) / 1000;
        const mx = cssW  * 0.5 + Math.cos(t * 0.5) * cssW  * 0.28 + Math.cos(t * 0.23) * cssW  * 0.08;
        const my = cssH * 0.5 + Math.sin(t * 0.38) * cssH * 0.28 + Math.sin(t * 0.31) * cssH * 0.08;

        stepPhysics(buf, mx, my, physics);
        drawFrame(canvas.getContext("2d")!, buf, {
          particleScale: 1, glow: false, dpr, cssW, cssH,
        });
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    loop();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ── Full tool ─────────────────────────────────────────────────────────────────

export default function ParticleDither({ preview = false }: { preview?: boolean }) {
  if (preview) return <ParticleDitherPreview />;
  return <ParticleDitherFull />;
}

function ParticleDitherFull() {
  // ── Physics config (live slider values) ──────────────────────────────────
  const [physics, setPhysics] = useState<PhysicsConfig>({
    interactionRadius: 240,
    forceStrength: 5.5,
    damping: 0.72,
    returnSpeed: 0.03,
    velocityCap: 60,
    restThreshold: 0.01,
    cursorFalloff: 5,
  });
  const [renderCfg, setRenderCfg] = useState<Omit<RenderConfig, "dpr" | "cssW" | "cssH">>({
    particleScale: 1,
    glow: false,
    backgroundColor: "#000000",
  });
  const [waveCfg, setWaveCfg] = useState<WaveConfig>(DEFAULT_WAVE_CONFIG);
  const [dotCount, setDotCount] = useState(0);
  const [panelOpen, setPanelOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [presets, setPresets] = useState<Preset[]>(() => readPresets());
  const [presetName, setPresetName] = useState("");
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // ── Refs (used inside RAF — avoids stale closure) ────────────────────────
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const bufRef       = useRef<ParticleBuffers | null>(null);
  const physicsRef   = useRef(physics);
  const renderCfgRef = useRef(renderCfg);
  const waveCfgRef   = useRef(waveCfg);
  const cursorRef    = useRef({ x: -9999, y: -9999 });
  const wavesRef     = useRef<Wave[]>([]);
  const dprRef       = useRef(1);
  const cssRef       = useRef({ w: 800, h: 600 });
  const rafRef       = useRef<number>(0);
  const fileRef      = useRef<HTMLInputElement>(null);

  type Snapshot = { physics: PhysicsConfig; render: typeof renderCfg; wave: WaveConfig };
  const historyRef    = useRef<Snapshot[]>([]);
  const historyIdxRef = useRef(-1);
  const debounceRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const undoFnRef     = useRef<() => void>(() => {});
  const redoFnRef     = useRef<() => void>(() => {});

  useEffect(() => { physicsRef.current   = physics;   }, [physics]);
  useEffect(() => { renderCfgRef.current = renderCfg; }, [renderCfg]);
  useEffect(() => { waveCfgRef.current   = waveCfg;   }, [waveCfg]);

  // Debounced snapshot — deduplicates undo/redo restores vs. real edits
  useEffect(() => {
    const snap: Snapshot = { physics, render: renderCfg, wave: waveCfg };
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const cur = historyRef.current[historyIdxRef.current];
      if (cur && JSON.stringify(cur) === JSON.stringify(snap)) return;
      historyRef.current = historyRef.current.slice(0, historyIdxRef.current + 1);
      historyRef.current.push(snap);
      if (historyRef.current.length > 50) historyRef.current.shift();
      historyIdxRef.current = historyRef.current.length - 1;
      setCanUndo(historyIdxRef.current > 0);
      setCanRedo(false);
    }, 350);
  }, [physics, renderCfg, waveCfg]);

  // Keyboard shortcuts (stable listener via refs)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.ctrlKey || e.metaKey;
      if (!meta) return;
      if (e.key === "z" && !e.shiftKey) { e.preventDefault(); undoFnRef.current(); }
      if ((e.key === "z" && e.shiftKey) || e.key === "y") { e.preventDefault(); redoFnRef.current(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Canvas setup + resize ────────────────────────────────────────────────
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
      // Re-fit existing dots to new canvas size
      if (bufRef.current) {
        // Re-initialize from existing origin positions
        const count = bufRef.current.count;
        const rawDots = Array.from({ length: count }, (_, i) => ({
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

  // ── Load default sample on mount ─────────────────────────────────────────
  useEffect(() => {
    const sample = generateSample(5000);
    const { w, h } = cssRef.current;
    bufRef.current = initBuffers(sample, w, h);
    setDotCount(sample.length);
  }, []);

  // ── Animation loop ───────────────────────────────────────────────────────
  useEffect(() => {
    function loop() {
      const buf = bufRef.current;
      const ctx = canvasRef.current?.getContext("2d");
      if (buf && ctx) {
        const { w: cssW, h: cssH } = cssRef.current;
        stepPhysics(buf, cursorRef.current.x, cursorRef.current.y, physicsRef.current);
        stepWaves(buf, wavesRef.current, waveCfgRef.current, cssW, cssH);

        // Cull expired waves
        const { speed, maxRadius } = waveCfgRef.current;
        wavesRef.current = wavesRef.current.filter((w) => w.t * speed < maxRadius);

        drawFrame(ctx, buf, { ...renderCfgRef.current, dpr: dprRef.current, cssW, cssH });
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Interaction handlers ─────────────────────────────────────────────────
  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handleMouseLeave() {
    cursorRef.current = { x: -9999, y: -9999 };
  }

  function handleClick() {
    const { x, y } = cursorRef.current;
    if (x < 0) return;
    wavesRef.current.push({ x, y, t: 0, amplitude: 1 });
  }

  // ── JSON upload ──────────────────────────────────────────────────────────
  const loadJSON = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw  = JSON.parse(e.target!.result as string);
        const dots = parseJSON(raw);
        const { w, h } = cssRef.current;
        bufRef.current = initBuffers(dots, w, h);
        setDotCount(dots.length);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid JSON");
      }
    };
    reader.readAsText(file);
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) loadJSON(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = [...e.dataTransfer.files].find((f) => f.name.endsWith(".json"));
    if (file) loadJSON(file);
  }

  function resetSample() {
    const sample = generateSample(5000);
    const { w, h } = cssRef.current;
    bufRef.current = initBuffers(sample, w, h);
    setDotCount(sample.length);
    setError(null);
  }

  function up<K extends keyof PhysicsConfig>(k: K, v: PhysicsConfig[K]) {
    setPhysics((p) => ({ ...p, [k]: v }));
  }
  function upR<K extends keyof typeof renderCfg>(k: K, v: (typeof renderCfg)[K]) {
    setRenderCfg((p) => ({ ...p, [k]: v }));
  }
  function upW<K extends keyof WaveConfig>(k: K, v: WaveConfig[K]) {
    setWaveCfg((p) => ({ ...p, [k]: v }));
  }

  function undo() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (historyIdxRef.current <= 0) return;
    historyIdxRef.current--;
    const snap = historyRef.current[historyIdxRef.current];
    setPhysics(snap.physics);
    setRenderCfg(snap.render);
    setWaveCfg(snap.wave);
    setCanUndo(historyIdxRef.current > 0);
    setCanRedo(true);
  }

  function redo() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (historyIdxRef.current >= historyRef.current.length - 1) return;
    historyIdxRef.current++;
    const snap = historyRef.current[historyIdxRef.current];
    setPhysics(snap.physics);
    setRenderCfg(snap.render);
    setWaveCfg(snap.wave);
    setCanUndo(true);
    setCanRedo(historyIdxRef.current < historyRef.current.length - 1);
  }

  undoFnRef.current = undo;
  redoFnRef.current = redo;

  function savePreset() {
    const name = presetName.trim() || `Preset ${presets.length + 1}`;
    const next = [...presets, { id: Date.now().toString(), name, physics: { ...physics }, render: { ...renderCfg }, wave: { ...waveCfg } }];
    setPresets(next);
    writePresets(next);
    setPresetName("");
  }

  function loadPreset(p: Preset) {
    setPhysics(p.physics);
    setRenderCfg(p.render);
    if (p.wave) setWaveCfg(p.wave);
  }

  function deletePreset(id: string) {
    const next = presets.filter((p) => p.id !== id);
    setPresets(next);
    writePresets(next);
  }

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 h-[85vh] sm:h-[75vh] min-h-[520px] sm:min-h-[580px]"
      style={{ background: renderCfg.backgroundColor ?? "#000000" }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Header */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 h-10 border-b border-neutral-800/60 z-10" style={{ background: "rgba(10,10,12,0.85)", backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-2.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-600">Experiment 04</span>
          <span className="text-neutral-800">·</span>
          <span className="text-[11px] font-medium text-neutral-400">Particle Dither</span>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-[10px] text-red-400">{error}</span>}
          <span className="text-[10px] font-mono text-neutral-600 tabular-nums">{dotCount.toLocaleString()} dots</span>
          <button
            onClick={undo} disabled={!canUndo} title="Undo (⌘Z)"
            className="flex items-center justify-center w-6 h-6 rounded text-neutral-600 hover:text-neutral-300 hover:bg-white/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 5H9a4 4 0 0 1 0 8H6" /><path d="M4.5 2.5L2 5l2.5 2.5" />
            </svg>
          </button>
          <button
            onClick={redo} disabled={!canRedo} title="Redo (⌘⇧Z)"
            className="flex items-center justify-center w-6 h-6 rounded text-neutral-600 hover:text-neutral-300 hover:bg-white/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5H5a4 4 0 0 0 0 8h3" /><path d="M9.5 2.5L12 5l-2.5 2.5" />
            </svg>
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-medium uppercase tracking-wider text-neutral-500 hover:text-neutral-200 hover:bg-white/5 transition-colors"
          >
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 8V2M3 5l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 9v2h10V9" strokeLinecap="round" />
            </svg>
            Load JSON
          </button>
          <button
            onClick={resetSample}
            className="text-[10px] font-medium uppercase tracking-wider text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            Reset
          </button>
        </div>
        <input ref={fileRef} type="file" accept=".json,application/json" className="hidden" onChange={handleFileChange} />
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />

      {/* Control panel — floating bottom-right */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-1">
        <button
          onClick={() => setPanelOpen((o) => !o)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-medium uppercase tracking-widest transition-colors border border-neutral-800/80 text-neutral-600 hover:text-neutral-300 hover:border-neutral-700"
          style={{ background: "rgba(10,10,12,0.9)", backdropFilter: "blur(8px)" }}
        >
          <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
            <rect x="0" y="2" width="10" height="1.2" rx="0.6" />
            <rect x="0" y="4.4" width="7" height="1.2" rx="0.6" />
            <rect x="0" y="6.8" width="10" height="1.2" rx="0.6" />
          </svg>
          Controls
        </button>

        {panelOpen && (
          <div
            className="w-52 rounded-xl border border-neutral-800/80 flex flex-col gap-3 p-4 max-h-[calc(85vh-5rem)] sm:max-h-[calc(75vh-5rem)] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-track]:bg-transparent"
            style={{ background: "rgba(15,15,18,0.92)", backdropFilter: "blur(12px)", scrollbarWidth: "thin", scrollbarColor: "#3f3f46 transparent" }}
          >
            <div className="flex flex-col gap-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-600">Interaction</p>
              <KnobSlider label="Radius" value={physics.interactionRadius} min={40}  max={300} step={5}   fmt={(v) => `${v}px`} onChange={(v) => up("interactionRadius", v)} />
              <KnobSlider label="Force"  value={physics.forceStrength}     min={0.5} max={12}  step={0.5}               onChange={(v) => up("forceStrength", v)} />
            </div>

            <div className="border-t border-neutral-800/60 pt-3 flex flex-col gap-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-600">Physics</p>
              <KnobSlider label="Damping"    value={physics.damping}        min={0.7}   max={0.99}  step={0.01}   onChange={(v) => up("damping", v)} />
              <KnobSlider label="Return"     value={physics.returnSpeed}    min={0.005} max={0.2}   step={0.005}  onChange={(v) => up("returnSpeed", v)} />
              <KnobSlider label="Max Speed"  value={physics.velocityCap}    min={2}     max={60}    step={1}      fmt={(v) => `${v}px`} onChange={(v) => up("velocityCap", v)} />
              <KnobSlider label="Rest Snap"  value={physics.restThreshold}  min={0.01}  max={1.0}   step={0.01}   onChange={(v) => up("restThreshold", v)} />
              <KnobSlider label="Falloff"    value={physics.cursorFalloff}  min={1}     max={5}     step={0.25}   fmt={(v) => `${v.toFixed(2)}`} onChange={(v) => up("cursorFalloff", v)} />
            </div>

            <div className="border-t border-neutral-800/60 pt-3 flex flex-col gap-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-600">Render</p>
              <KnobSlider label="Dot Scale" value={renderCfg.particleScale} min={0.3} max={4} step={0.1} fmt={(v) => `${v.toFixed(1)}×`} onChange={(v) => upR("particleScale", v)} />
              <ToggleRow  label="Glow"      value={renderCfg.glow}          onChange={(v) => upR("glow", v)} />
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-500">BG Color</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-neutral-600 tabular-nums">{renderCfg.backgroundColor ?? "#000000"}</span>
                  <label className="relative cursor-pointer">
                    <div className="w-5 h-4 rounded border border-neutral-700" style={{ background: renderCfg.backgroundColor ?? "#000000" }} />
                    <input
                      type="color"
                      value={renderCfg.backgroundColor ?? "#000000"}
                      onChange={(e) => upR("backgroundColor", e.target.value)}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-800/60 pt-3 flex flex-col gap-3.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-600">Wave</p>
              <KnobSlider label="Speed"     value={waveCfg.speed}        min={1}    max={15}   step={0.5}  fmt={(v) => `${v}px/f`}   onChange={(v) => upW("speed", v)} />
              <KnobSlider label="Width"     value={waveCfg.sigma}        min={10}   max={120}  step={5}    fmt={(v) => `${v}px`}     onChange={(v) => upW("sigma", v)} />
              <KnobSlider label="Force"     value={waveCfg.amplitude}    min={1}    max={30}   step={0.5}                            onChange={(v) => upW("amplitude", v)} />
              <KnobSlider label="Detail"    value={waveCfg.spatialFreq}  min={0.02} max={0.35} step={0.01} fmt={(v) => v.toFixed(2)} onChange={(v) => upW("spatialFreq", v)} />
              <KnobSlider label="Edge Fade" value={waveCfg.edgeFalloff}  min={0}    max={4}    step={0.1}  fmt={(v) => v.toFixed(1)} onChange={(v) => upW("edgeFalloff", v)} />
            </div>

            <div className="border-t border-neutral-800/60 pt-3 flex flex-col gap-2.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-600">Presets</p>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && savePreset()}
                  placeholder="Name…"
                  className="flex-1 min-w-0 h-6 px-2 rounded text-[10px] bg-neutral-900 border border-neutral-800 text-neutral-300 placeholder-neutral-700 outline-none focus:border-neutral-600 transition-colors"
                />
                <button
                  onClick={savePreset}
                  className="h-6 px-2.5 rounded text-[9px] font-medium uppercase tracking-wider bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200 transition-colors"
                >
                  Save
                </button>
              </div>
              {presets.length > 0 && (
                <div className="flex flex-col gap-1 max-h-28 overflow-y-auto">
                  {presets.map((p) => (
                    <div key={p.id} className="flex items-center gap-1.5">
                      <button
                        onClick={() => loadPreset(p)}
                        className="flex-1 min-w-0 text-left text-[10px] text-neutral-400 hover:text-neutral-200 truncate transition-colors"
                      >
                        {p.name}
                      </button>
                      <button
                        onClick={() => deletePreset(p.id)}
                        className="text-neutral-700 hover:text-red-400 transition-colors text-[11px] leading-none shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hint */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
        <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-700">Move · Click · Drag JSON</p>
      </div>
    </div>
  );
}
