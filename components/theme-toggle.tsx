"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";

// false during SSR and the first client render, true thereafter — lets us gate the
// theme-dependent icon without a hydration mismatch or a setState-in-effect.
const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) return <div className="w-7 h-7" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}
