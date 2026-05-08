"use client";

import Link from "next/link";

type CaseStudy = {
  product: string;
  title: string;
  description: string;
  niche: string;
  href: string;
  year: string;
  bg: string;
};

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={study.href}
      className="flex flex-row gap-[40px] transition-opacity hover:opacity-80"
    >
      <div className={`w-1/2 h-[520px] ${study.bg}`} />
      <div className="w-1/2 flex flex-col gap-1 justify-end border-t-[0.7px] border-neutral-200 pt-4 pb-10 dark:border-neutral-200">
        <h3 className="text-5xl pb-2" style={{ fontFamily: "RecklessCondensed", fontWeight: 500 }}>{study.product}</h3>
        <h4 className="text-base font-medium">{study.title}</h4>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums mt-0.5">
          {study.year} / {study.niche.toUpperCase()}
        </p>
      </div>
    </Link>
  );
}
