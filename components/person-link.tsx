import React from "react";

export default function PersonLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-dotted decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 transition-colors hover:decoration-neutral-600 dark:hover:decoration-neutral-400"
    >
      {children}
    </a>
  );
}
