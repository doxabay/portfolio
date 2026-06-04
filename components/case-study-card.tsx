"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CaseStudy = {
  product: string;
  title: string;
  description: string;
  niche: string;
  href: string;
  year: string;
  bg: string;
  image?: string;
  logo?: string;
  badge?: boolean;
};

const cardClass = "flex flex-row gap-[40px] rounded-[24px] p-3 bg-neutral-50 w-full max-w-[1580px] mx-auto active:scale-[0.99]";
const hoverShadow = "0 2px 3px -1.5px rgba(0,0,0,0.03), 0 0 0 1px rgba(204,204,204,0.28), 0 1px 2px 0 rgba(35,35,35,0.02), 0 2px 4px 0 rgba(35,35,35,0.015), 0 0 2px 1px rgba(18,18,23,0.01), inset 0 -4px 8px 0 rgba(235,235,239,0.13)";
const cardTransition = "box-shadow 200ms cubic-bezier(0.2, 0, 0, 1), transform 150ms cubic-bezier(0.2, 0, 0, 1)";

function CardInner({ study }: { study: CaseStudy }) {
  return (
    <>
      <div className={`relative w-[55%] ${study.bg} overflow-hidden rounded-[12px]`} style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }}>
        {study.image && (
          <Image
            src={study.image}
            alt={study.product}
            width={0}
            height={0}
            sizes="100%"
            className="w-full h-auto block"
          />
        )}
      </div>
      <div className="flex-1 flex flex-col gap-1 justify-end border-t-[0.7px] border-neutral-100 pt-4 pb-10 dark:border-neutral-100">
        <div className="flex items-center gap-2 pb-2">
          {study.logo && (
            <Image
              src={study.logo}
              alt={`${study.product} logo`}
              width={18}
              height={18}
              className="shrink-0 rounded-[4px]"
            />
          )}
          <p className="text-xs text-neutral-500 uppercase tracking-[0.2px] font-medium">
            {study.badge ? <>{study.product} ・ CASE STUDY</> : study.product}
          </p>
        </div>
        <h3 className="text-[24px] font-medium leading-[34px]" style={{ textWrap: "balance" } as React.CSSProperties}>{study.title}</h3>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums mt-[10px]">
          {study.year} / {study.niche.toUpperCase()}
        </p>
      </div>
    </>
  );
}

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [hovered, setHovered] = useState(false);
  const style: React.CSSProperties = { boxShadow: hovered ? hoverShadow : "none", transition: cardTransition };
  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (study.href !== "#") {
    return (
      <Link href={study.href} className={cardClass} style={style} {...handlers}>
        <CardInner study={study} />
      </Link>
    );
  }
  return (
    <div className={cardClass} style={style} {...handlers}>
      <CardInner study={study} />
    </div>
  );
}
