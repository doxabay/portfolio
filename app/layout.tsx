import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import AgentationProvider from "@/components/agentation-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
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
        <Nav />
        <TooltipProvider>
          <main className="flex-1">{children}</main>
        </TooltipProvider>
        <AgentationProvider />
      </body>
    </html>
  );
}
