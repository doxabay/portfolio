import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import AgentationProvider from "@/components/agentation-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "Glory Faleke",
    template: "%s — Glory Faleke",
  },
  description: "Product designer. Designing memorable experiences.",
  icons: { icon: "/glorylogofav.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col text-zinc-900 dark:text-zinc-100">
        <ThemeProvider>
          <Nav />
          <TooltipProvider>
            <main className="flex-1">{children}</main>
          </TooltipProvider>
          <AgentationProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
