"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; label: string; children?: { id: string; label: string }[] };

export default function TocNav({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [visible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const allIds = items.map(({ id }) => id);
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      let current = elements[0]?.id ?? "";
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= 120) current = el.id;
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  // After the stagger animation finishes, clear the delay so active-state
  // color transitions respond instantly on scroll.
  useEffect(() => {
    if (!visible || hasAnimated) return;
    const totalLinks = 1 + items.length;
    const timer = setTimeout(() => setHasAnimated(true), totalLinks * 20 + 280);
    return () => clearTimeout(timer);
  }, [visible, hasAnimated, items]);

  const colorTransition = "color 180ms cubic-bezier(0.2, 0, 0, 1), border-color 180ms cubic-bezier(0.2, 0, 0, 1)";
  const enterTransition = "opacity 240ms ease-out, transform 240ms ease-out";

  const linkStyle = (idx: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(10px)",
    transition: hasAnimated ? colorTransition : `${enterTransition}, ${colorTransition}`,
    transitionDelay: hasAnimated ? "0ms" : `${idx * 20}ms`,
  });

  let linkIndex = 1;

  return (
    <nav>
      <p
        className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 font-medium"
        style={linkStyle(0)}
      >
        Contents
      </p>
      <ul className="space-y-2.5">
        {items.map(({ id, label }) => {
          const isActive = activeId === id;
          const idx = linkIndex++;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`text-sm block pl-3 border-l active:scale-[0.96] ${
                  isActive
                    ? "text-orange-500 border-orange-500"
                    : "text-zinc-400 dark:text-zinc-600 border-transparent hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
                style={linkStyle(idx)}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
