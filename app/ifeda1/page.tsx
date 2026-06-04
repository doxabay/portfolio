"use client";

import ifedaDots from "@/data/ifeda.json";
import { ParticleDitherEmbed } from "@/components/particle-dither/embed";
import type { DotJSON } from "@/components/particle-dither/types";

const LOREM = `The morning light crept slowly through the curtains casting long amber shadows across the wooden floor. She had been awake for hours already sitting with her thoughts the way one sits with an old friend who no longer needs words to communicate. Outside the city was beginning its ritual of noise and motion the distant hum of traffic threading between buildings like a river finding its course. She poured coffee and watched the steam rise and dissolve into the cool air of the kitchen thinking about all the conversations she had never finished and all the ones she probably should not have started. There is a particular kind of silence that settles after a long journey not the silence of emptiness but the silence of arrival when the body finally understands it can stop moving. He had read somewhere that memory is not a recording but a reconstruction each recollection slightly different from the last shaped by everything that has happened since the original moment. The archive of human experience is vast and imprecise full of gaps where certainty once lived and certainty where uncertainty should reign. We build narratives from fragments choosing which details to keep and which to let fade not out of dishonesty but out of an instinctive need for coherence. The photographs had been sorted into boxes by year though the years themselves had grown slippery over time collapsing together and expanding apart in ways that had little to do with the calendar. A single afternoon from decades ago could occupy more space in the mind than an entire year of ordinary days. She remembered the smell of rain on hot pavement the exact angle of the afternoon sun the sound of a particular song drifting from an open window somewhere above. These small precise things anchored the larger shapes that could no longer hold their form. The city outside continued its indifferent motion oblivious to the archaeology happening at the kitchen table while the coffee grew cold.`;

export default function Ifeda1Page() {
  return (
    <main className="bg-neutral-950 min-h-screen">
      {/* Hero */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <ParticleDitherEmbed
          dots={ifedaDots as DotJSON[]}
          render={{ backgroundColor: "#0a0a0a", particleScale: 1 }}
          className="absolute inset-0 w-full h-full block"
        />
      </section>

      {/* Text section */}
      <section className="flex justify-center px-6 py-24">
        <div className="max-w-[500px] w-full">
          <p className="text-white/70 text-base leading-relaxed font-light tracking-wide">
            {LOREM}
          </p>
        </div>
      </section>
    </main>
  );
}
