"use client";

import { useEffect, useState } from "react";

type TocChild = { id: string; label: string };
type TocItem = { id: string; label: string; children?: TocChild[] };

export default function TocNav({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const allIds = items.flatMap(({ id, children }) => [
      id,
      ...(children?.map((c) => c.id) ?? []),
    ]);
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      if (window.scrollY >= 100) setVisible(true);

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
    const totalLinks =
      1 + items.reduce((acc, item) => acc + 1 + (item.children?.length ?? 0), 0);
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
    <nav className="flex-1 flex flex-col">
      <p
        className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 font-medium"
        style={linkStyle(0)}
      >
        Contents
      </p>
      <ul className="space-y-2.5">
        {items.map(({ id, label, children }) => {
          const childActive = children?.some((c) => c.id === activeId) ?? false;
          const parentActive = activeId === id || childActive;
          const idx = linkIndex++;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`text-sm block pl-3 border-l active:scale-[0.96] ${
                  parentActive
                    ? "text-orange-500 border-orange-500"
                    : "text-zinc-400 dark:text-zinc-600 border-transparent hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
                style={linkStyle(idx)}
              >
                {label}
              </a>
              {children && children.length > 0 && (
                <ul className="mt-1.5 space-y-1.5 ml-3 border-l border-neutral-100 dark:border-neutral-800">
                  {children.map((child) => {
                    const childIdx = linkIndex++;
                    return (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          className={`text-xs block pl-3 active:scale-[0.96] ${
                            activeId === child.id
                              ? "text-zinc-700 dark:text-zinc-300"
                              : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400"
                          }`}
                          style={linkStyle(childIdx)}
                        >
                          {child.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
