"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";

const ROW_H = 36;
const COL_W = 195;
const PAD_X = 24;
const PAD_Y = 32;
const TICK  = 12;  // gap between connector endpoint and adjacent text
const R     = 16;  // corner radius

const TREE = {
  label: "Landing page",
  children: [
    {
      label: "Sign up",
      children: [
        {
          label: "With social",
          children: [
            {
              label: "Priority: Build and Sell",
              children: [
                {
                  label: "Active creator",
                  children: [
                    { label: "Marketplace", children: [] },
                    { label: "Dashboard",   children: [] },
                  ],
                },
              ],
            },
            {
              label: "Priority: Download",
              children: [
                {
                  label: "Passive creator",
                  children: [
                    { label: "Marketplace",            children: [] },
                    { label: "Toggle on Creator Mode", children: [] },
                  ],
                },
              ],
            },
          ],
        },
        { label: "With wallet", children: [] },
      ],
    },
    { label: "Sign in", children: [] },
  ],
};

// ── layout ───────────────────────────────────────────────────────────────────

type Raw  = { label: string; children: Raw[] };
type Node = { label: string; x: number; y: number; depth: number; children: Node[] };

function leafCount(n: Raw): number {
  return n.children.length === 0 ? 1 : n.children.reduce((s, c) => s + leafCount(c), 0);
}

function buildLayout(n: Raw, depth: number, startLeaf: number): Node {
  let cs = startLeaf;
  const children = n.children.map((c) => {
    const r = buildLayout(c, depth + 1, cs);
    cs += leafCount(c);
    return r;
  });
  // Parent aligns with first child → primary branch is always a straight horizontal line
  const y = children.length > 0
    ? children[0].y
    : PAD_Y + (startLeaf + 0.5) * ROW_H;
  return { label: n.label, x: PAD_X + depth * COL_W, y, depth, children };
}

function flatten(n: Node): Node[] {
  return [n, ...n.children.flatMap(flatten)];
}

const ROOT      = buildLayout(TREE, 0, 0);
const ALL       = flatten(ROOT);
const MAX_DEPTH = Math.max(...ALL.map((n) => n.depth));
const LEAF_COUNT = leafCount(TREE);
const SVG_W     = PAD_X + (MAX_DEPTH + 1) * COL_W + 160;
const SVG_H     = PAD_Y * 2 + LEAF_COUNT * ROW_H;

// ── connector ────────────────────────────────────────────────────────────────

type Widths = Record<string, number>;

// Text widths depend only on the static node labels, so measure them once on the
// client and cache. useSyncExternalStore serves an empty map during SSR / first
// render and the measured map afterwards — no setState-in-effect, no hydration gap.
let widthsCache: Widths | null = null;
function measureWidths(): Widths {
  if (widthsCache) return widthsCache;
  const ctx = document.createElement("canvas").getContext("2d");
  const w: Widths = {};
  if (ctx) {
    ctx.font = "13px ui-sans-serif, system-ui, -apple-system, sans-serif";
    for (const n of ALL) w[n.label] = ctx.measureText(n.label).width;
  }
  return (widthsCache = w);
}
const EMPTY_WIDTHS: Widths = {};
const subscribeWidths = () => () => {};

function Connector({ node, widths, visible }: { node: Node; widths: Widths; visible: boolean }) {
  const kids = node.children;
  if (!kids.length) return null;

  // bracketX is TICK px before the first child's text — consistent right-side gap
  const bracketX = kids[0].x - TICK;
  // fromX starts TICK px after the measured text end — consistent left-side gap
  const textW    = widths[node.label] ?? node.label.length * 7.5;
  const fromX    = Math.min(node.x + textW + TICK, bracketX - 4);

  return (
    <>
      {kids.map((kid, i) => {
        const dy   = kid.y - node.y;
        const sign = dy >= 0 ? 1 : -1;
        // maxR must not exceed half the vertical drop or half the horizontal run
        const maxR = Math.min(R, Math.abs(dy) / 2, (bracketX - fromX) / 2);

        // dy≈0 → straight horizontal ending at bracketX (leaves TICK gap before child text)
        // dy≠0 → L-shape: horizontal run + single rounded corner + vertical drop to bracketX
        const d = Math.abs(dy) < 1
          ? `M${fromX},${node.y} L${bracketX},${kid.y}`
          : [
              `M${fromX},${node.y}`,
              `L${bracketX - maxR},${node.y}`,
              `Q${bracketX},${node.y} ${bracketX},${node.y + sign * maxR}`,
              `L${bracketX},${kid.y}`,
            ].join(" ");

        return (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="#F26255"
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: visible ? 1 : 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: visible ? i * 0.05 : 0 }}
          />
        );
      })}
    </>
  );
}

// ── main ─────────────────────────────────────────────────────────────────────

export default function FlowDiagram({ preview = false }: { preview?: boolean }) {
  const [step, setStep]     = useState(-1);
  // Measure real text widths so fromX is accurate for every label length
  const widths = useSyncExternalStore(subscribeWidths, measureWidths, () => EMPTY_WIDTHS);

  useEffect(() => {
    const t = setTimeout(() => setStep(0), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step < 0 || step >= MAX_DEPTH) return;
    const t = setTimeout(() => setStep((s) => s + 1), 950);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step < MAX_DEPTH) return;
    const t = setTimeout(() => setStep(-1), 2800);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== -1) return;
    const t = setTimeout(() => setStep(0), 600);
    return () => clearTimeout(t);
  }, [step]);

  // 200% at step≤0, drops 20pp per bracket step, floors at 100%
  const scale = Math.max(2.0 - Math.max(step, 0) * 0.2, 1.0);

  // How many SVG-unit columns to reveal at this step
  const baseW = step < 0
    ? PAD_X + COL_W * 0.7
    : Math.min(PAD_X + (step + 1) * COL_W + COL_W * 0.55, SVG_W);
  // Multiply by scale so the clip window shows the same diagram content regardless of zoom
  const containerW = baseW * scale;

  const animation = (
    <motion.div
      className="overflow-hidden"
      animate={{ width: containerW, height: SVG_H * scale }}
      initial={{ width: (PAD_X + COL_W * 0.7) * 2, height: SVG_H * 2 }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
    >
      <motion.div
        style={{ transformOrigin: "left top" }}
        animate={{ scale }}
        initial={{ scale: 2 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      >
        <svg
          width={SVG_W}
          height={SVG_H}
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          style={{ fontFamily: "inherit", overflow: "visible" }}
        >
          {ALL.map((n) => (
            <Connector
              key={`conn-${n.label}-${n.depth}`}
              node={n}
              widths={widths}
              visible={step > n.depth}
            />
          ))}
          {ALL.map((n) => {
            const visible = step >= n.depth;
            return (
              <motion.g
                key={`node-${n.label}-${n.depth}-${n.x}`}
                initial={{ opacity: 0, x: -7 }}
                animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -7 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
              >
                <text
                  x={n.x}
                  y={n.y}
                  fontSize={13}
                  fill="#1c1c1c"
                  dominantBaseline="middle"
                >
                  {n.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </motion.div>
    </motion.div>
  );

  if (preview) return animation;

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[#FAFAFA] border border-neutral-100">
      <div className="px-6 pt-5 pb-2 border-b border-neutral-100">
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Experiment 01</p>
        <p className="text-sm font-medium text-neutral-800 mt-0.5">Blocasset Onboarding Flow</p>
      </div>
      <div className="p-8">
        {animation}
      </div>
    </div>
  );
}
