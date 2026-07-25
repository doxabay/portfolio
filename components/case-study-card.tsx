import React from "react";
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

const cardClass = "flex flex-col gap-0 rounded-none border-t border-neutral-100 dark:border-neutral-800 py-3 w-full mx-auto active:scale-[0.99]";
const cardClassNoBorder = "flex flex-col gap-0 rounded-none py-3 w-full mx-auto active:scale-[0.99]";
const cardTransition = "transform 150ms cubic-bezier(0.2, 0, 0, 1)";

function CardInner({ study }: { study: CaseStudy }) {
  return (
    <>
      <div className={`relative w-full ${study.bg} overflow-hidden rounded-none`} style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }}>
        {study.image && (
          <Image
            src={study.image}
            alt={study.product}
            width={0}
            height={0}
            sizes="(max-width: 591px) calc(100vw - 32px), 560px"
            className="w-full h-auto block"
          />
        )}
      </div>
      <div className="flex-1 flex flex-col gap-1 justify-start px-1 pt-3 pb-5 sm:px-0 sm:pt-4 sm:pb-5">
        <div className="flex items-center gap-2 pb-2">
          {study.logo && (
            <Image
              src={study.logo}
              alt={`${study.product} logo`}
              width={18}
              height={18}
              className="shrink-0 rounded-full"
            />
          )}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.2px] font-medium">
            {study.badge ? <>{study.product} ・ CASE STUDY</> : study.product}
          </p>
        </div>
        <h3 className="text-[18px] font-medium leading-[27px] tracking-[-0.257px] [text-wrap:wrap]">{study.title}</h3>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums mt-[10px]">
          {study.year} / {study.niche.toUpperCase()}
        </p>
      </div>
    </>
  );
}

export default function CaseStudyCard({ study, noBorderTop = false }: { study: CaseStudy; noBorderTop?: boolean }) {
  const style: React.CSSProperties = { transition: cardTransition };
  const className = noBorderTop ? cardClassNoBorder : cardClass;

  if (study.href !== "#") {
    return (
      <Link href={study.href} className={className} style={style}>
        <CardInner study={study} />
      </Link>
    );
  }
  return (
    <div className={className} style={style}>
      <CardInner study={study} />
    </div>
  );
}
