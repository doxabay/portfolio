"use client";

import { useEffect } from "react";

export function HomeScrollRestorer() {
  useEffect(() => {
    // Restore position if returning from a case study
    const fromCaseStudy = sessionStorage.getItem("from-case-study");
    const savedY = sessionStorage.getItem("home-scroll-y");

    if (fromCaseStudy && savedY) {
      sessionStorage.removeItem("from-case-study");
      sessionStorage.removeItem("home-scroll-y");
      const y = parseInt(savedY, 10);
      if (y > 0) {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }

    // Continuously track scroll position while on home page
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          sessionStorage.setItem("home-scroll-y", String(window.scrollY));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
