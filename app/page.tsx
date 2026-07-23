"use client";

import { motion } from "motion/react";
import CaseStudyCard from "@/components/case-study-card";
import TypewriterHello from "@/components/typewriter-hello";
import { HomeScrollRestorer } from "@/components/home-scroll-restorer";

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

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };
const hidden = { opacity: 0, y: 16 };
const visible = { opacity: 1, y: 0 };

function stagger(delay: number) {
  return { ...visible, transition: { ...spring, delay } };
}

export default function Home() {
  return (
    <>
      <HomeScrollRestorer />
      {/* Hero */}
      <section className="px-4 sm:px-6 py-12 sm:pt-[120px] sm:pb-[60px] bg-background">
        <div className="max-w-[560px] mx-auto w-full">
          <motion.div initial={hidden} animate={stagger(0.08)}>
            <TypewriterHello className="text-xs font-medium text-neutral-900 dark:text-neutral-100 block mb-2 text-left" />
          </motion.div>
          <motion.p
            initial={hidden}
            animate={stagger(0.16)}
            className="text-sm text-neutral-600 dark:text-neutral-400 text-left"
          >
            a product designer passionate about designing memorable experiences through empathy-driven user obsession and design craftsmanship.
          </motion.p>
          <motion.div
            initial={hidden}
            animate={stagger(0.24)}
            className="mt-6 space-y-4 text-left [&>p]:text-neutral-600 dark:[&>p]:text-neutral-400"
          >
            <p>For me, I believe in these things: There is power in asking why. There is greatness in grit and grind. Design should have balance in functionality and aesthetics.</p>
            <p>My design discipline is embodied by intentional combination of core craftsmanship and empathy-driven obsession in designing products that meet user needs while achieving business goals.</p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="px-4 sm:px-0 pb-20 pt-[60px] sm:pt-[100px] bg-background">
        <motion.h2
          initial={hidden}
          animate={stagger(0.26)}
          className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400 mb-9 text-left flex items-center justify-start gap-2 max-w-[560px] mx-auto w-full"
        >
          Work
        </motion.h2>
        <div className="flex flex-col gap-5 max-w-[560px] mx-auto">
          {caseStudies.map((study) => (
            <motion.div
              key={study.title}
              initial={{ scale: 0.92, opacity: 0, y: 8 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: "spring", duration: 0.55, bounce: 0 }}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
