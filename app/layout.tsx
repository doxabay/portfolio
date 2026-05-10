import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import AgentationProvider from "@/components/agentation-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "Bayo Faleke",
    template: "%s — Bayo Faleke",
  },
  description: "Software engineer. Building things on the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased scroll-smooth", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col text-zinc-900 dark:text-zinc-100">
        <div className="pointer-events-none fixed inset-0 z-50" aria-hidden>
          <div className="absolute left-6 inset-y-0 w-px bg-neutral-200 dark:bg-neutral-800" />
          <div className="absolute right-6 inset-y-0 w-px bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <Nav />
        <main className="flex-1">{children}</main>
        <AgentationProvider />
      </body>
    </html>
  );
}
