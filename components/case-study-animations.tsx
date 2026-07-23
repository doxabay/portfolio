"use client";

import { motion } from "motion/react";
import { Children, useEffect, useRef } from "react";
import type { ReactNode } from "react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, duration: 0.5, bounce: 0 } },
};

export function StaggerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className={className}>
      {Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}

export function CaseStudyCanvas({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sections = Array.from(el.querySelectorAll<HTMLElement>("section"));

    sections.forEach((s) => {
      s.style.opacity = "0";
      s.style.transform = "translateY(20px)";
      s.style.transition = "opacity 0.55s cubic-bezier(0.2,0,0,1), transform 0.55s cubic-bezier(0.2,0,0,1)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => {
      sessionStorage.setItem("from-case-study", "1");
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`[&_h2]:tracking-[-0.47px] ${className ?? ""}`}>
      {children}
    </div>
  );
}
