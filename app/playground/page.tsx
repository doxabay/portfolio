import type { Metadata } from "next";
import Link from "next/link";
import DitherTool from "@/components/dither-tool";
import ParticleDither from "@/components/particle-dither";

export const metadata: Metadata = {
  title: "Playground",
};

type Experiment = {
  slug: string;
  number: string;
  title: string;
  preview: React.ReactNode;
  dark?: boolean;
  previewClass?: string;
};

const experiments: Experiment[] = [
  {
    slug: "dither",
    number: "01",
    title: "Dither Tool",
    preview: <DitherTool preview />,
    dark: true,
    previewClass: "",
  },
  {
    slug: "particle-dither",
    number: "02",
    title: "Particle Dither",
    preview: <ParticleDither preview />,
    dark: true,
    previewClass: "",
  },
];

const TOTAL_CELLS = 4;
const placeholders = Array.from(
  { length: TOTAL_CELLS - experiments.length },
  (_, i) => String(experiments.length + i + 1).padStart(2, "0")
);

export default function Playground() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-background px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-medium mb-3">Lab</p>
          <h1 className="text-3xl font-medium text-neutral-900 dark:text-neutral-100 tracking-tight">Playground</h1>
          <p className="text-sm text-neutral-400 mt-2">Experimental animations and interactions.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {experiments.map((exp) => (
            <Link
              key={exp.slug}
              href={`/playground/${exp.slug}`}
              className={`relative h-[480px] rounded-xl overflow-hidden border transition-colors group block ${
                exp.dark
                  ? "bg-neutral-950 border-neutral-800 hover:border-neutral-600"
                  : "bg-[#FAFAFA] border-neutral-100 hover:border-neutral-300"
              }`}
            >
              <div className={`pointer-events-none absolute inset-0 ${exp.previewClass ?? ""}`}>
                {exp.preview}
              </div>
              <div
                className={`absolute bottom-0 inset-x-0 px-5 py-4 bg-gradient-to-t to-transparent ${
                  exp.dark
                    ? "from-neutral-950 via-neutral-950/80"
                    : "from-white via-white/80"
                }`}
              >
                <p className={`text-[10px] uppercase tracking-widest font-medium ${exp.dark ? "text-neutral-400" : "text-neutral-500"}`}>
                  {exp.number}
                </p>
                <p className={`text-sm font-medium mt-0.5 transition-colors ${exp.dark ? "text-neutral-200 group-hover:text-white" : "text-neutral-800 group-hover:text-neutral-600"}`}>
                  {exp.title}
                </p>
              </div>
            </Link>
          ))}

          {placeholders.map((num) => (
            <div
              key={num}
              className="relative h-[480px] rounded-xl border border-dashed border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center"
            >
              <p className="text-2xl font-light text-neutral-200 dark:text-neutral-700 tabular-nums">{num}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
