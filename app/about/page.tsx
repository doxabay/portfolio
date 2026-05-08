import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <section className="px-6 py-24">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-6 text-zinc-600 dark:text-zinc-400">Coming soon.</p>
    </section>
  );
}
