"use client";

import { motion, useReducedMotion } from "motion/react";
import CaseStudyCard from "@/components/case-study-card";
import HeroIntro from "@/components/hero-intro";
import { HomeScrollRestorer } from "@/components/home-scroll-restorer";
import { REVEAL_EASE, DUR, at, heroCount } from "@/components/intro-timing";

const caseStudies = [
  {
    product: "Blocasset",
    title: "From beta to v1: designing an onchain platform for powering creator's success",
    description: "Cut drop-off by 40% with a three-screen progressive disclosure pattern.",
    niche: "Product / Web",
    href: "/work/blocasset",
    year: "2022–2024",
    bg: "bg-neutral-100 dark:bg-neutral-800",
    image: "/Blocasset-1.jpg",
    logo: "/logos/blocasset.svg",
    badge: true,
  },
  {
    product: "Noblocks",
    title: "Simplifying cross-border payments through a seamless stablecoin offramp",
    description: "Designing a fiat-stablecoin experience for everyday use from $0 to $1M+ TPV",
    niche: "Product / UX",
    href: "/work/noblocks",
    year: "2024",
    bg: "bg-neutral-100 dark:bg-neutral-800",
    image: "/Noblocks-01.jpg",
    logo: "/logos/noblocks.svg",
    badge: true,
  },
  {
    product: "Witan",
    title: "A ticketing platform where people can create and book events — built for flexible ticketing, audience insights, and payments beyond fiat.",
    description: "60+ components and token docs that unified three product teams.",
    niche: "Events / Web3",
    href: "/work/witan",
    year: "2022–2023",
    bg: "bg-red-50 dark:bg-red-950",
    image: "/Witan-cover.jpg",
    logo: "/logos/witan.svg",
    badge: true,
  },
  {
    product: "Safewalletapp",
    title: "Designing a secure self-custody wallet experience for crypto degens",
    description: "",
    niche: "UI / Mobile",
    href: "/work/safewalletapp",
    year: "2024",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    image: "/safewallet/coversafewallet.jpg",
    logo: "/logos/safewallet.svg",
  },
  {
    product: "Follow Flash",
    title: "Designing an AI powered system for social media management and automation for creators",
    description: "Incremental migration of a legacy Rails app — zero downtime, 2× faster loads.",
    niche: "AI / SAAS",
    href: "/work/follow-flash",
    year: "2025-2026",
    bg: "bg-neutral-900 dark:bg-neutral-100",
    image: "/follow-flash/coverfollowflash.jpg",
    logo: "/logos/followflash.svg",
  },
  {
    product: "Paycrest",
    title: "Building a real-time collaboration layer",
    description: "WebSocket presence system powering live cursors for 50k+ users.",
    niche: "Architecture",
    href: "/work/paycrest",
    year: "2024-2025",
    bg: "bg-neutral-200 dark:bg-neutral-700",
    image: "/Paycrest-01.jpg",
    logo: "/logos/paycrest.svg",
  },
  {
    product: "Synthetix",
    title: "Designing the trading interface for a decentralised derivatives protocol",
    description: "",
    niche: "Product / UX",
    href: "/work/synthetix",
    year: "2024",
    bg: "bg-indigo-50 dark:bg-indigo-950",
    image: "/synthetix/coversynthetix.jpg",
    logo: "/logos/synthetix.svg",
  },
  {
    product: "Plutofi",
    title: "Designing a DeFi wealth management dashboard for non-technical users",
    description: "",
    niche: "Mobile / UI",
    href: "/work/plutofi",
    year: "2024",
    bg: "bg-violet-50 dark:bg-violet-950",
    image: "/plutofi/coverplutofi.jpg",
    logo: "/logos/plutofi.svg",
  },
  {
    product: "Bintin",
    title: "From friction to flow: redesigning Bintin's mobile app to inspire trust and improve trade completion rate.",
    description: "",
    niche: "Mobile / UI",
    href: "/work/bintin",
    year: "2023",
    bg: "bg-lime-50 dark:bg-lime-950",
    image: "/bintin/coverbintin.jpg",
    logo: "/logos/bintin.svg",
  },
];

// Emphasized company name (ready to become a link once URLs are provided)
function C({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-neutral-900 dark:text-neutral-100">{children}</span>;
}

const heroRoles = [
  {
    label: "2024",
    text: (
      <>
        Founding designer at{" "}
        <span className="whitespace-nowrap font-semibold text-neutral-900 dark:text-neutral-100">
          <img
            src="/logos/paycrest.svg"
            alt=""
            aria-hidden="true"
            width={18}
            height={18}
            className="ml-[3px] mr-[5px] inline-block h-[18px] w-[18px] rounded-full align-text-bottom"
          />
          <a href="https://www.paycrest.io/" target="_blank" rel="noopener noreferrer">
            Paycrest
          </a>
        </span>{" "}
        — built stablecoin products for businesses and launched &amp; scaled Noblocks across 5 countries.
      </>
    ),
  },
];

// The page reveals as one top-down cascade on the same linear step as the hero:
// the Work heading picks up right after the hero's elements, then each card follows.
const WORK_INDEX = heroCount(heroRoles.length);

export default function Home() {
  const reduce = useReducedMotion();
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: DUR, ease: REVEAL_EASE, delay },
        };

  return (
    <>
      <HomeScrollRestorer />
      {/* Hero */}
      <section className="px-4 sm:px-6 py-12 sm:pt-[120px] sm:pb-[60px] bg-background">
        <div className="max-w-[560px] mx-auto w-full">
          <HeroIntro
            lede="My design discipline blends core craftsmanship with empathy-driven obsession — building products that meet user needs and achieve business goals."
            roles={heroRoles}
          />
        </div>
      </section>

      {/* Case Studies */}
      <section className="px-4 sm:px-0 pb-20 pt-[60px] sm:pt-[100px] bg-background">
        <motion.h2
          className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400 mb-9 text-left flex items-center justify-start gap-3 max-w-[560px] mx-auto w-full"
          {...reveal(at(WORK_INDEX))}
        >
          Work
          <span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" />
        </motion.h2>
        <div className="flex flex-col gap-5 max-w-[560px] mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div key={study.title} {...reveal(at(WORK_INDEX + 1 + index))}>
              <CaseStudyCard study={study} noBorderTop={index === 0} />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
