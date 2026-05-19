import type { DitherSettings } from "./types";
import { applyDithering } from "./algorithms";

// ── Tone curve LUT (built once per settings change) ──────────────────────────
function buildLUT(contrast: number, gamma: number, highlights: number): Uint8Array {
  // Photoshop-style contrast factor, contrast in [-100, 100]
  const c255 = (contrast / 100) * 255;
  const cf = contrast !== 0
    ? (259 * (c255 + 255)) / (255 * (259 - c255))
    : 1;

  const lut = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    let v = i / 255;

    if (contrast !== 0) {
      v = cf * (v - 0.5) + 0.5;
      v = Math.max(0, Math.min(1, v));
    }

    if (gamma !== 1) {
      v = Math.pow(v, 1 / gamma);
    }

    if (highlights > 0) {
      const h = highlights / 100;
      const knee = 1 - h * 0.5;
      if (v > knee) {
        const room = 1 - knee;
        v = knee + room * (1 - Math.exp(-(v - knee) / room));
      }
    }

    lut[i] = Math.round(Math.max(0, Math.min(1, v)) * 255);
  }
  return lut;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function clipShape(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  cornerRadius: number,
  circularMask: boolean,
) {
  ctx.beginPath();
  if (circularMask) {
    ctx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
  } else {
    const r = Math.min((cornerRadius / 100) * Math.min(w, h) / 2, Math.min(w, h) / 2);
    ctx.moveTo(r, 0);
    ctx.arcTo(w, 0, w, h, r);
    ctx.arcTo(w, h, 0, h, r);
    ctx.arcTo(0, h, 0, 0, r);
    ctx.arcTo(0, 0, w, 0, r);
  }
  ctx.closePath();
  ctx.clip();
}

export interface PipelineResult {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

export function runPipeline(
  source: HTMLImageElement,
  settings: DitherSettings,
): PipelineResult {
  const MAX = 1024;
  const s = settings;

  // 1. Compute output dimensions
  const srcW = source.naturalWidth || 1;
  const srcH = source.naturalHeight || 1;
  const aspect = srcW / srcH;
  let procW = srcW * s.scale;
  let procH = srcH * s.scale;
  if (procW > MAX) { procW = MAX; procH = procW / aspect; }
  if (procH > MAX) { procH = MAX; procW = procH * aspect; }
  procW = Math.max(1, Math.round(procW));
  procH = Math.max(1, Math.round(procH));

  // 2. Draw source to working canvas (CSS filter for blur — GPU-accelerated)
  const work = document.createElement("canvas");
  work.width = procW;
  work.height = procH;
  const wctx = work.getContext("2d")!;
  if (s.blurRadius > 0) wctx.filter = `blur(${s.blurRadius}px)`;
  wctx.drawImage(source, 0, 0, procW, procH);

  // 3. Pixel data → grayscale with tone LUT
  const raw = wctx.getImageData(0, 0, procW, procH).data;
  const lut = buildLUT(s.contrast, s.gamma, s.highlights);
  const gray = new Float32Array(procW * procH);
  for (let i = 0; i < procW * procH; i++) {
    const r = lut[raw[i * 4]];
    const g = lut[raw[i * 4 + 1]];
    const b = lut[raw[i * 4 + 2]];
    // ITU-R BT.601 luminance
    gray[i] = 0.299 * r + 0.587 * g + 0.114 * b;
  }

  // 4. Dither
  const dithered = applyDithering(gray, procW, procH, s);

  // 5. Build RGBA output (monochrome, respecting invert)
  const lo = s.invert ? 255 : 0;
  const hi = s.invert ? 0 : 255;
  const outPixels = new Uint8ClampedArray(procW * procH * 4);
  for (let i = 0; i < procW * procH; i++) {
    const v = dithered[i] === 255 ? hi : lo;
    outPixels[i * 4] = v;
    outPixels[i * 4 + 1] = v;
    outPixels[i * 4 + 2] = v;
    outPixels[i * 4 + 3] = 255;
  }

  // 6. Composite: bgColor fill → shape clip → dithered image
  const out = document.createElement("canvas");
  out.width = procW;
  out.height = procH;
  const octx = out.getContext("2d")!;

  const [br, bg, bb] = hexToRgb(s.bgColor);
  octx.fillStyle = `rgb(${br},${bg},${bb})`;
  octx.fillRect(0, 0, procW, procH);

  octx.save();
  if (s.circularMask || s.cornerRadius > 0) {
    clipShape(octx, procW, procH, s.cornerRadius, s.circularMask);
  }
  // putImageData bypasses clip, so we draw via a temp canvas
  const tmp = document.createElement("canvas");
  tmp.width = procW;
  tmp.height = procH;
  tmp.getContext("2d")!.putImageData(new ImageData(outPixels, procW, procH), 0, 0);
  octx.drawImage(tmp, 0, 0);
  octx.restore();

  return { canvas: out, width: procW, height: procH };
}
