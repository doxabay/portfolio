"use client";

import { motion } from "motion/react";
import CaseStudyCard from "@/components/case-study-card";
import TypewriterHello from "@/components/typewriter-hello";
import { HeroParticleRender } from "@/components/hero-particle-render";

const caseStudies = [
  {
    product: "Blocasset",
    title: "From beta to v1: Designing an onchain platform for powering creator's success",
    description: "Cut drop-off by 40% with a three-screen progressive disclosure pattern.",
    niche: "Product / Web",
    href: "/work/blocasset",
    year: "2022–2024",
    bg: "bg-zinc-100 dark:bg-zinc-800",
    image: "/Blocasset-1.jpg",
    logo: "/logos/blocasset.svg",
    badge: true,
  },
  {
    product: "Paycrest",
    title: "Building a real-time collaboration layer",
    description: "WebSocket presence system powering live cursors for 50k+ users.",
    niche: "Architecture",
    href: "/work/paycrest",
    year: "2024-2025",
    bg: "bg-zinc-200 dark:bg-zinc-700",
    image: "/Paycrest-01.jpg",
    logo: "/logos/paycrest.svg",
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
    product: "Follow Flash",
    title: "Designing an AI powered system for social media management and automation for creators",
    description: "Incremental migration of a legacy Rails app — zero downtime, 2× faster loads.",
    niche: "AI / SAAS",
    href: "/work/follow-flash",
    year: "2025-2026",
    bg: "bg-zinc-900 dark:bg-zinc-100",
    image: "/follow-flash/coverfollowflash.jpg",
    logo: "/logos/followflash.svg",
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
    product: "Noblocks",
    title: "Simplifying cross-border payments through a seamless stablecoin offramp",
    description: "Designing a fiat-stablecoin experience for everyday use from $0 to $1M+ TPV",
    niche: "Product / UX",
    href: "/work/noblocks",
    year: "2024",
    bg: "bg-zinc-100 dark:bg-zinc-800",
    image: "/Noblocks-01.jpg",
    logo: "/logos/noblocks.svg",
    badge: true,
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
    product: "Bintin",
    title: "From friction to flow: Redesigning Bintin's mobile app to inspire trust and improve trade completion rate.",
    description: "",
    niche: "Mobile / UI",
    href: "/work/bintin",
    year: "2023",
    bg: "bg-lime-50 dark:bg-lime-950",
    image: "/bintin/coverbintin.jpg",
    logo: "/logos/bintin.svg",
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
];

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };
const hidden = { opacity: 0, y: 16 };
const visible = { opacity: 1, y: 0 };

function stagger(delay: number) {
  return { ...visible, transition: { ...spring, delay } };
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 flex items-center justify-center gap-[60px] h-[45vh] bg-white">
        <motion.div initial={hidden} animate={stagger(0)}>
          <HeroParticleRender height={186} width={156} />
        </motion.div>
        <div className="flex flex-col">
          <motion.div initial={hidden} animate={stagger(0.08)}>
            <TypewriterHello className="text-xs font-medium text-zinc-900 dark:text-zinc-100 w-[520px] block mb-2 text-left" />
          </motion.div>
          <motion.p
            initial={hidden}
            animate={stagger(0.16)}
            className="text-2xl text-neutral-950 w-[520px] leading-[34px] tracking-[0.36px] text-left"
            style={{ fontFamily: "KaliceTrial", fontWeight: 500 }}
          >
            <span className="text-neutral-600">I&apos;m Glory.</span><br />A product designer passionate about designing memorable experiences through empathy-driven user obsession and core design craftsmanship
          </motion.p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="px-6 pb-20 pt-[100px] bg-white">
        <motion.h2
          initial={hidden}
          animate={stagger(0.26)}
          className="text-xs font-semibold uppercase text-neutral-500 mb-[60px] text-center flex items-center justify-center gap-2"
          style={{ fontFamily: "SuisseIntlTrial" }}
        >
          Selected work
        </motion.h2>
        <div className="flex flex-col gap-5">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={hidden}
              animate={stagger(0.34 + i * 0.08)}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
