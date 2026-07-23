"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { DEFAULT_SETTINGS, ALGO_LABELS, type DitherSettings, type AlgorithmId, type BayerSize } from "./types";
import { runPipeline } from "./pipeline";
import { errorDiffuse } from "./algorithms";

// ── localStorage helpers ──────────────────────────────────────────────────────
const STORAGE_KEY = "dither-v1";

function loadSettings(): DitherSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return DEFAULT_SETTINGS;
}

function saveSettings(s: DitherSettings) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

// ── Reusable UI atoms ─────────────────────────────────────────────────────────

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">{label}</span>
      <span className="text-[11px] font-mono text-neutral-300 tabular-nums">{value}</span>
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step = 1, format, onChange }: SliderProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">{label}</span>
        <span className="text-[11px] font-mono text-neutral-300 tabular-nums">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-[2px] appearance-none cursor-pointer rounded-full bg-neutral-700 accent-neutral-100"
      />
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors duration-200 ${value ? "bg-neutral-100" : "bg-neutral-700"}`}
      >
        <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 mt-0.5 ${value ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-800/80">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-2.5 hover:bg-white/[0.03] transition-colors"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-500">{title}</span>
        <svg
          className={`h-3 w-3 text-neutral-600 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="flex flex-col gap-3.5 px-4 pb-4">{children}</div>}
    </div>
  );
}

// ── Preview mode: animated gradient dithering ────────────────────────────────
function DitherPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;

    function resize() {
      const r = canvas.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      W = Math.round(r.width);
      H = Math.round(r.height);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const t0 = Date.now();
    let lastThresh = -1;

    function draw() {
      if (W === 0 || H === 0) { rafRef.current = requestAnimationFrame(draw); return; }
      const t = (Date.now() - t0) / 1000;
      const threshold = Math.round(128 + Math.sin(t * 0.6) * 90);

      if (threshold !== lastThresh) {
        lastThresh = threshold;

        // Linear gradient: left=black, right=white
        const gray = new Float32Array(W * H);
        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            gray[y * W + x] = (x / W) * 255;
          }
        }

        const dithered = errorDiffuse(gray, W, H, threshold, 1, true, "floyd-steinberg");

        const ctx = canvas.getContext("2d")!;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = "#09090b";
        ctx.fillRect(0, 0, W, H);

        const imgData = ctx.createImageData(W, H);
        const d = imgData.data;
        for (let i = 0; i < W * H; i++) {
          const v = dithered[i];
          d[i * 4] = v;
          d[i * 4 + 1] = v;
          d[i * 4 + 2] = v;
          d[i * 4 + 3] = 255;
        }
        const tmp = document.createElement("canvas");
        tmp.width = W; tmp.height = H;
        tmp.getContext("2d")!.putImageData(imgData, 0, 0);
        ctx.drawImage(tmp, 0, 0);
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ── Main tool ─────────────────────────────────────────────────────────────────
export default function DitherTool({ preview = false }: { preview?: boolean }) {
  if (preview) return <DitherPreview />;

  return <DitherToolFull />;
}

function DitherToolFull() {
  const [settings, setSettings] = useState<DitherSettings>(loadSettings);
  const [imageInfo, setImageInfo] = useState<{ name: string; w: number; h: number } | null>(null);
  const [renderScale, setRenderScale] = useState(1);
  const [processedSize, setProcessedSize] = useState<{ w: number; h: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const displayRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dirtyRef = useRef(false);
  const settingsRef = useRef(settings);
  const rafRef = useRef<number>(0);

  // keep settingsRef in sync and mark dirty on change
  useEffect(() => {
    settingsRef.current = settings;
    dirtyRef.current = true;
    saveSettings(settings);
  }, [settings]);

  function update<K extends keyof DitherSettings>(key: K, value: DitherSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  // ── RAF render loop ──────────────────────────────────────────────────────
  useEffect(() => {
    function loop() {
      if (dirtyRef.current && imgRef.current && displayRef.current) {
        dirtyRef.current = false;
        try {
          const result = runPipeline(imgRef.current, settingsRef.current);
          const canvas = displayRef.current;
          canvas.width = result.width;
          canvas.height = result.height;
          canvas.getContext("2d")!.drawImage(result.canvas, 0, 0);
          setProcessedSize({ w: result.width, h: result.height });
        } catch (e) {
          console.error("Pipeline error:", e);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Image loading ──────────────────────────────────────────────────────
  const loadFile = useCallback((file: File) => {
    if (!file.type.match(/^image\/(png|jpeg|webp)$/)) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImageInfo({ name: file.name, w: img.naturalWidth, h: img.naturalHeight });
      dirtyRef.current = true;
    };
    img.src = url;
  }, []);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  }

  function handleExport() {
    if (!displayRef.current) return;
    const a = document.createElement("a");
    a.download = "dither-output.png";
    a.href = displayRef.current.toDataURL("image/png");
    a.click();
  }

  function handleCopyJSON() {
    navigator.clipboard.writeText(JSON.stringify(settings, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function handleExportJSON() {
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.download = "dither-settings.json";
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function handleExportDots() {
    const canvas = displayRef.current;
    if (!canvas || !processedSize) return;

    const ctx = canvas.getContext("2d")!;
    const { width: w, height: h } = canvas;
    const { data } = ctx.getImageData(0, 0, w, h);

    // Subsample only if the image is extremely large (safety cap at 500k dots).
    // For normal dither outputs the step will be 1 — every lit pixel is exported.
    const MAX = 60_000;
    let litCount = 0;
    for (let i = 0; i < w * h; i++) {
      if (data[i * 4] > 128) litCount++;
    }

    const step = litCount > MAX ? Math.ceil(litCount / MAX) : 1;
    let seen = 0;
    const dots: { x: number; y: number; r: number; opacity: number }[] = [];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const base = (y * w + x) * 4;
        if (data[base] > 128) {
          seen++;
          if (seen % step === 0) {
            dots.push({ x, y, r: 1, opacity: +(data[base + 3] / 255).toFixed(3) });
          }
        }
      }
    }

    const blob = new Blob([JSON.stringify(dots)], { type: "application/json" });
    const a = document.createElement("a");
    a.download = "dither-dots.json";
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const isBayer = settings.algorithm === "bayer";

  return (
    <div className="flex flex-col w-full rounded-2xl overflow-hidden border border-neutral-800" style={{ height: "75vh", minHeight: 580, background: "#111113" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 h-10 border-b border-neutral-800/80 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-500">Experiment 03</span>
          <span className="text-neutral-800">·</span>
          <span className="text-[11px] font-medium text-neutral-300">Dither Tool</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopyJSON}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-medium uppercase tracking-wider transition-colors text-neutral-400 hover:text-neutral-100 hover:bg-white/5"
          >
            {copied ? (
              <>
                <svg className="w-3 h-3 text-neutral-300" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-neutral-300">Copied</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="4" width="7" height="7" rx="1" />
                  <path d="M8 4V2a1 1 0 00-1-1H2a1 1 0 00-1 1v5a1 1 0 001 1h2" strokeLinecap="round" />
                </svg>
                Copy JSON
              </>
            )}
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-medium uppercase tracking-wider transition-colors text-neutral-400 hover:text-neutral-100 hover:bg-white/5"
          >
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 3h2.5M2 6h4M2 9h2" strokeLinecap="round" />
              <path d="M8 7l2 2-2 2M10 9H7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export JSON
          </button>

          <div className="w-px h-4 bg-neutral-800 mx-1" />

          <button
            onClick={handleExportDots}
            disabled={!processedSize}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-medium uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-neutral-400 hover:text-neutral-100 hover:bg-white/5"
          >
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="2.5" cy="6" r="1" fill="currentColor" stroke="none" />
              <circle cx="6" cy="3" r="1" fill="currentColor" stroke="none" />
              <circle cx="9.5" cy="6" r="1" fill="currentColor" stroke="none" />
              <circle cx="6" cy="9" r="1" fill="currentColor" stroke="none" />
              <path d="M6 1v2M6 9v2M1 6h2M9 6h2" strokeLinecap="round" />
            </svg>
            Export Dots
          </button>

          <button
            onClick={handleExport}
            disabled={!processedSize}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-medium uppercase tracking-wider transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-neutral-400 hover:text-neutral-100 hover:bg-white/5"
          >
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 1v6M3 7l3 3 3-3M1 10h10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export PNG
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">

        {/* Sidebar */}
        <aside className="w-[240px] shrink-0 overflow-y-auto border-r border-neutral-800/80 flex flex-col" style={{ background: "#1a1a1d" }}>

          {/* Upload */}
          <Section title="Source Image">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed py-5 cursor-pointer transition-colors ${
                isDragging ? "border-neutral-500 bg-neutral-500/10" : "border-neutral-700 hover:border-neutral-500"
              }`}
            >
              <svg className="w-5 h-5 text-neutral-600" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3v9M7 6l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 13v3a1 1 0 001 1h12a1 1 0 001-1v-3" strokeLinecap="round" />
              </svg>
              <span className="text-[10px] text-neutral-500">Drop image or click</span>
              <span className="text-[9px] text-neutral-700">PNG · JPEG · WebP</span>
            </div>
            <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFileChange} />

            {imageInfo && (
              <div className="flex flex-col gap-1 mt-1">
                <Row label="File" value={imageInfo.name.length > 18 ? imageInfo.name.slice(0, 15) + "…" : imageInfo.name} />
                <Row label="Source" value={`${imageInfo.w}×${imageInfo.h}`} />
                {processedSize && <Row label="Output" value={`${processedSize.w}×${processedSize.h}`} />}
              </div>
            )}
          </Section>

          {/* Algorithm */}
          <Section title="Algorithm">
            <select
              value={settings.algorithm}
              onChange={(e) => update("algorithm", e.target.value as AlgorithmId)}
              className="w-full rounded-md px-2.5 py-1.5 text-xs text-neutral-200 border border-neutral-700 focus:outline-none focus:border-neutral-500 cursor-pointer"
              style={{ background: "#111113" }}
            >
              {Object.entries(ALGO_LABELS).map(([id, label]) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>

            {isBayer && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">Matrix Size</span>
                <div className="grid grid-cols-3 rounded-md overflow-hidden border border-neutral-700">
                  {([2, 4, 8] as const).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => update("bayerSize", sz as BayerSize)}
                      className={`py-1.5 text-[10px] font-mono transition-colors ${
                        settings.bayerSize === sz
                          ? "bg-neutral-100 text-neutral-900"
                          : "text-neutral-400 hover:bg-white/5"
                      }`}
                    >
                      {sz}×{sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* Dither controls */}
          <Section title="Dither Controls">
            <Slider label="Threshold" value={settings.threshold} min={0} max={255} onChange={(v) => update("threshold", v)} />
            <Slider
              label="Error Strength"
              value={settings.errorStrength}
              min={0} max={1} step={0.01}
              format={(v) => v.toFixed(2)}
              onChange={(v) => update("errorStrength", v)}
            />
            <Toggle label="Invert" value={settings.invert} onChange={(v) => update("invert", v)} />
            {!isBayer && (
              <Toggle label="Serpentine Scan" value={settings.serpentine} onChange={(v) => update("serpentine", v)} />
            )}
          </Section>

          {/* Image adjustments */}
          <Section title="Image" defaultOpen={false}>
            <Slider
              label="Scale"
              value={settings.scale}
              min={0.25} max={2} step={0.05}
              format={(v) => `${v.toFixed(2)}×`}
              onChange={(v) => update("scale", v)}
            />
            <Slider label="Contrast" value={settings.contrast} min={-100} max={100} onChange={(v) => update("contrast", v)} />
            <Slider
              label="Gamma"
              value={settings.gamma}
              min={0.1} max={3} step={0.05}
              format={(v) => v.toFixed(2)}
              onChange={(v) => update("gamma", v)}
            />
            <Slider label="Highlights" value={settings.highlights} min={0} max={100} onChange={(v) => update("highlights", v)} />
            <Slider
              label="Blur Radius"
              value={settings.blurRadius}
              min={0} max={10} step={0.5}
              format={(v) => `${v.toFixed(1)}px`}
              onChange={(v) => update("blurRadius", v)}
            />
          </Section>

          {/* Shape */}
          <Section title="Shape" defaultOpen={false}>
            <Slider
              label="Corner Radius"
              value={settings.cornerRadius}
              min={0} max={50}
              format={(v) => `${v}%`}
              onChange={(v) => update("cornerRadius", v)}
            />
            <Toggle label="Circular Mask" value={settings.circularMask} onChange={(v) => update("circularMask", v)} />
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">Background</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.bgColor}
                  onChange={(e) => update("bgColor", e.target.value)}
                  className="h-7 w-7 cursor-pointer rounded border border-neutral-700 p-0.5"
                  style={{ background: "transparent" }}
                />
                <span className="text-[11px] font-mono text-neutral-400">{settings.bgColor.toUpperCase()}</span>
              </div>
            </div>
          </Section>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Reset */}
          <div className="p-4 border-t border-neutral-800/80">
            <button
              type="button"
              onClick={() => setSettings(DEFAULT_SETTINGS)}
              className="w-full rounded-md py-1.5 text-[10px] font-medium uppercase tracking-wider text-neutral-600 hover:text-neutral-300 hover:bg-white/5 transition-colors"
            >
              Reset Defaults
            </button>
          </div>
        </aside>

        {/* Preview area */}
        <main className="flex-1 overflow-auto flex items-center justify-center relative" style={{ background: "#0c0c0e" }}>
          {!imageInfo ? (
            <div
              className="flex flex-col items-center gap-3 select-none"
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              <div className={`rounded-2xl border-2 border-dashed p-12 flex flex-col items-center gap-3 cursor-pointer transition-colors ${isDragging ? "border-neutral-500/60 bg-neutral-500/10" : "border-neutral-800 hover:border-neutral-700"}`}>
                <svg className="w-10 h-10 text-neutral-700" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="4" y="4" width="32" height="32" rx="4" />
                  <path d="M4 28l10-10 6 6 6-8 10 10" strokeLinejoin="round" />
                  <circle cx="27" cy="14" r="3" />
                </svg>
                <p className="text-xs text-neutral-600">Drop an image to begin</p>
                <p className="text-[10px] text-neutral-700">PNG · JPEG · WebP</p>
              </div>
            </div>
          ) : (
            <div className="p-8 flex items-center justify-center min-w-full min-h-full">
              <canvas
                ref={displayRef}
                style={{
                  imageRendering: "pixelated",
                  width: processedSize ? processedSize.w * renderScale : undefined,
                  height: processedSize ? processedSize.h * renderScale : undefined,
                  maxWidth: "none",
                }}
              />
            </div>
          )}

          {/* Zoom control */}
          {processedSize && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg px-3 py-1.5 border border-neutral-800" style={{ background: "#1a1a1d" }}>
              <button onClick={() => setRenderScale((s) => Math.max(0.25, +(s - 0.25).toFixed(2)))} className="text-neutral-500 hover:text-neutral-200 text-xs w-4 leading-none">−</button>
              <span className="text-[10px] font-mono text-neutral-400 w-10 text-center tabular-nums">{renderScale.toFixed(2)}×</span>
              <button onClick={() => setRenderScale((s) => Math.min(4, +(s + 0.25).toFixed(2)))} className="text-neutral-500 hover:text-neutral-200 text-xs w-4 leading-none">+</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
