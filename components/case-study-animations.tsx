"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

// Case-study pages render statically — no entrance animation on the header or
// on the body sections. StaggerHeader stays as a passthrough so existing call
// sites keep working; CaseStudyCanvas keeps its typographic class and the
// scroll-restoration flag it sets on unmount.

export function StaggerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function CaseStudyCanvas({ children, className }: { children: ReactNode; className?: string }) {
  useEffect(() => {
    return () => {
      sessionStorage.setItem("from-case-study", "1");
    };
  }, []);

  return <div className={`[&_h2]:tracking-[-0.47px] ${className ?? ""}`}>{children}</div>;
}
