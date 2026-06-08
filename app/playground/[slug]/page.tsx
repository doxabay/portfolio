import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import FlowDiagram from "@/components/flow-diagram";
import AsciiSpotlight from "@/components/ascii-spotlight";
import DitherTool from "@/components/dither-tool";
import ParticleDither from "@/components/particle-dither";

type ExperimentMeta = {
  number: string;
  title: string;
  description: string;
  component: React.ReactNode;
};

const experiments: Record<string, ExperimentMeta> = {
  "bracket-flow": {
    number: "01",
    title: "Blocasset Onboarding Flow",
    description: "Depth-sequenced tree animation with L-shaped connectors and scale reveal.",
    component: <FlowDiagram />,
  },
  "ascii": {
    number: "02",
    title: "ASCII Spotlight",
    description: "Canvas-rendered character grid that illuminates under the cursor using an ASCII density ramp.",
    component: <AsciiSpotlight />,
  },
  "dither": {
    number: "03",
    title: "Dither Tool",
    description: "Upload an image and apply classic dithering algorithms — Floyd–Steinberg, Bayer, Atkinson, and more — with live preview.",
    component: <DitherTool />,
  },
  "particle-dither": {
    number: "04",
    title: "Particle Dither",
    description: "Load a JSON dot cloud and interact with it — cubic-falloff cursor repulsion, spring return, and click-burst energy.",
    component: <ParticleDither />,
  },
};

export function generateStaticParams() {
  return Object.keys(experiments).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = experiments[slug];
  return exp ? { title: exp.title } : {};
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = experiments[slug];
  if (!exp) notFound();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/playground"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 transition-colors mb-12"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Playground
        </Link>

        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-orange-500 font-medium mb-1">
            Experiment {exp.number}
          </p>
          <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">{exp.title}</h1>
          <p className="text-sm text-neutral-400 mt-1">{exp.description}</p>
        </div>

        <div className="overflow-x-auto">
          {exp.component}
        </div>

      </div>
    </div>
  );
}
