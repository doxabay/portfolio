import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b-[0.7px] border-neutral-200 backdrop-blur dark:border-neutral-200" style={{ backgroundColor: "color-mix(in srgb, var(--background) 85%, transparent)" }}>
      <nav className="flex items-center justify-between px-11 py-4">
        <Link href="/" aria-label="Home">
          <Image src="/logo.svg" alt="Bayo Faleke" width={28} height={28} priority />
        </Link>
        <ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          {links.slice(1).map(({ href, label }, i) => (
            <li key={href} className="flex items-center gap-3">
              {i !== 0 && <span className="text-neutral-300">/</span>}
              <Link
                href={href}
                className="capitalize transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
