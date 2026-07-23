"use client";

import { ParticleDitherEmbed } from "@/components/particle-dither/embed";
import ifedaDots from "@/public/gloryfaleke.json";
import type { DotJSON } from "@/components/particle-dither/types";

export function HeroParticleRender({ width = 280, height = 336 }: { width?: number; height?: number }) {
  return (
    <div className="shrink-0 overflow-hidden" style={{ width, height }}>
      <div className="w-full h-full scale-[1.3] origin-center">
        <ParticleDitherEmbed
          dots={ifedaDots as DotJSON[]}
          render={{ backgroundColor: "#171717", particleScale: 1 }}
          physics={{ interactionRadius: 60 }}
          className="w-full h-full block"
        />
      </div>
    </div>
  );
}
