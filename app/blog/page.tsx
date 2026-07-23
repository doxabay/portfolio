import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  return (
    <section className="px-6 py-24">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-6 text-neutral-600 dark:text-neutral-400">No posts yet.</p>
    </section>
  );
}
