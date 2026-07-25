"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/theme-toggle";

const MotionLink = motion.create(Link);

const links: { href: string; label: string; external?: boolean }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "about" },
  { href: "https://drive.google.com/file/d/11Wzl8ySYpt0qrpVbFcc4Kv6G148Xn8yh/view?usp=sharing", label: "resume", external: true },
];

export default function Nav() {
  const pathname = usePathname();
  const isCaseStudy = pathname?.startsWith("/work/") ?? false;

  return (
    <header className="sticky top-0 z-50 bg-background">
      <nav className="flex items-center px-4 sm:px-0 py-4 max-w-[560px] mx-auto">
        {isCaseStudy ? (
          <MotionLink
            href="/"
            aria-label="Back"
            initial="rest"
            animate="rest"
            whileHover="hover"
            className="inline-flex items-center text-xs text-neutral-500 dark:text-neutral-400 transition-colors hover:text-neutral-950 dark:hover:text-neutral-100"
          >
            <motion.span
              className="inline-flex"
              variants={{ rest: { x: 0 }, hover: { x: -2 } }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M13.5858 16L10.2929 12.7071C9.90237 12.3166 9.90237 11.6834 10.2929 11.2929L13.5858 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
            back
          </MotionLink>
        ) : (
          <Link href="/" aria-label="Home" className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Bayo Faleke
          </Link>
        )}
        <div className="ml-auto flex items-center gap-3">
          <ul className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            {links.slice(1).map(({ href, label, external }, i) => (
              <li key={href} className="flex items-center gap-3">
                {i !== 0 && <span className="text-neutral-300 dark:text-neutral-600">/</span>}
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-950 dark:hover:text-neutral-100">{label}</a>
                ) : (
                  <Link href={href} className="transition-colors hover:text-neutral-950 dark:hover:text-neutral-100">{label}</Link>
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
