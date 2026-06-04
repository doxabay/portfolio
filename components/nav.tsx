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
    <header className="border-b border-[#eae7de] dark:border-neutral-800">
      <nav className="flex items-center px-6 py-4">
        <Link href="/" aria-label="Home">
          <Image src="/logo.svg" alt="Bayo Faleke" width={28} height={28} priority />
        </Link>
        <ul className="ml-auto flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
          {links.slice(1).map(({ href, label }, i) => (
            <li key={href} className="flex items-center gap-3">
              {i !== 0 && <span className="text-neutral-300 dark:text-neutral-600">/</span>}
              <Link
                href={href}
                className="uppercase transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
