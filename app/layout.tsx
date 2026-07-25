import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import AgentationProvider from "@/components/agentation-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const ibmPlexMono = IBM_Plex_Mono({subsets:['latin'],weight:['400','500'],variable:'--font-ibm-plex-mono'});

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
    <html lang="en" suppressHydrationWarning className={cn("h-full antialiased", "font-sans", inter.variable, ibmPlexMono.variable)}>
      <body className="min-h-full flex flex-col text-neutral-900 dark:text-neutral-100">
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
