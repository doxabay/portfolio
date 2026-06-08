import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links: { href: string; label: string; external?: boolean }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "about" },
  { href: "https://drive.google.com/file/d/1Bz5S6NFYI1urrwH9hesTWrAz686U_2EC/view", label: "resume", external: true },
];

export default function Nav() {
  return (
    <header>
      <nav className="flex items-center px-6 py-4">
        <Link href="/" aria-label="Home">
          <Image src="/glorylogofav.svg" alt="Glory Faleke" width={28} height={28} priority className="rounded-full" />
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <ul className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
            {links.slice(1).map(({ href, label, external }, i) => (
              <li key={href} className="flex items-center gap-3">
                {i !== 0 && <span className="text-neutral-300 dark:text-neutral-600">/</span>}
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">{label}</a>
                ) : (
                  <Link href={href} className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">{label}</Link>
                )}
              </li>
            ))}
          </ul>
          <span className="text-neutral-300 dark:text-neutral-600">/</span>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
