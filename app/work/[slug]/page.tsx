import Link from "next/link";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "outcome", label: "Outcome" },
];

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Derive a readable title from the slug — replace with real data later
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="flex min-h-screen">
      {/* Left sidebar */}
      <aside className="w-52 shrink-0 sticky top-[61px] self-start h-[calc(100vh-61px)] py-10 pl-11 pr-4 flex flex-col">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-8"
        >
          ← Back
        </Link>
        <nav>
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 font-medium">
            Contents
          </p>
          <ul className="space-y-2.5">
            {toc.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors block"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Content area */}
      <div className="flex-1 flex flex-col items-center py-12 px-6 min-w-0">
        <div className="w-full" style={{ maxWidth: "60%" }}>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">
            {title}
          </h1>
          {/* White canvas */}
          <div className="bg-white shadow-md px-16 py-20 min-h-[80vh] text-zinc-800">
            {/* Case study content goes here */}
            <section id="overview" className="mb-16">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-base leading-relaxed text-zinc-500">
                Add your overview content here.
              </p>
            </section>

            <section id="problem" className="mb-16">
              <h2 className="text-xl font-semibold mb-4">The Problem</h2>
              <p className="text-base leading-relaxed text-zinc-500">
                Describe the problem this project set out to solve.
              </p>
            </section>

            <section id="approach" className="mb-16">
              <h2 className="text-xl font-semibold mb-4">Approach</h2>
              <p className="text-base leading-relaxed text-zinc-500">
                Explain the methodology and thinking behind your approach.
              </p>
            </section>

            <section id="solution" className="mb-16">
              <h2 className="text-xl font-semibold mb-4">Solution</h2>
              <p className="text-base leading-relaxed text-zinc-500">
                Detail the solution you built or designed.
              </p>
            </section>

            <section id="outcome">
              <h2 className="text-xl font-semibold mb-4">Outcome</h2>
              <p className="text-base leading-relaxed text-zinc-500">
                Share the results, metrics, and learnings.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
