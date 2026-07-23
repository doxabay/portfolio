"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { HeroParticleRender } from "@/components/hero-particle-render";
import ScrambleText from "@/components/scramble-text";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const photos = [
  { src: "/dxby1.jpeg", w: 768, h: 1024 },
  { src: "/dxby2.jpeg", w: 768, h: 1024 },
  { src: "/dxby3.jpeg", w: 665, h: 1182 },
];

const experience = [
  { company: "Paycrest", role: "Senior Product Designer", period: "July 2024 – Present" },
  { company: "Crevatal", role: "Product Designer", period: "July 2024 – Present" },
  { company: "Web3D Media", role: "Product & Interaction Designer", period: "2022 – Present" },
  { company: "Verisync", role: "Product Designer (Contract)", period: "Oct 2023 – Nov 2023" },
  { company: "Aitechma", role: "UI/UX Designer", period: "Oct 2019 – Jan 2022" },
  { company: "Bintin", role: "UI/UX Designer (Contract)", period: "Nov 2021 – Feb 2022" },
  { company: "Uptima", role: "UI Designer", period: "Mar 2020 – Aug 2020" },
];

const stack = [
  "Figma", "Rive", "Framer", "Protopie", "Maze", "Notion",
  "Hotjar", "Lottie Editor", "Microsoft Clarity", "Mixpanel", "Miro", "UX Tweak", "Adobe Photoshop",
];

const community = [
  {
    name: "DesignersDAO",
    desc: "A community of over 4000+ designers keen on learning, networking, and building products and resources in design. We do different UI/UX challenges, AMA, design talks, portfolio reviews, and more.",
  },
  {
    name: "BarriHer Breakers Int'l",
    desc: "BarriHer Breakers International's STEM program focuses on equipping young females with tech skills. Over the span of 8 weeks, I trained 5 young ladies in UI/UX Design through their recently concluded pilot cohort program.",
  },
  {
    name: "Blocathon",
    href: "https://blocathon.design",
    desc: "A design hackathon where designers build solutions that solve real-world problems, and compete for rewards and cash prizes.",
  },
];

const sideProjects = [
  { name: "Crypto App UI Kit", platform: "Figma", href: "https://www.figma.com/community/file/1216007645663313293/free-crypto-app-ui-kit" },
  { name: "Reshine Portfolio Template", platform: "Framer", href: "https://reshine.framer.website" },
  { name: "Softshine Portfolio Template", platform: "Framer", href: "https://softshine.framer.website/" },
];

const socials = [
  { label: "Dribbble", handle: "@doxabay", href: "https://dribbble.com/doxabay" },
  { label: "Twitter / X", handle: "@doxabay_", href: "https://twitter.com/doxabay_" },
  { label: "Figma", handle: "@doxabay", href: "https://www.figma.com/@doxabay" },
  { label: "LinkedIn", handle: "/gloryfaleke", href: "https://linkedin.com/in/gloryfaleke" },
];

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };
const hidden = { opacity: 0, y: 16 };
const visible = { opacity: 1, y: 0 };

function stagger(delay: number) {
  return { ...visible, transition: { ...spring, delay } };
}

// Reveal-on-scroll for below-the-fold sections, matching the case-study pages.
const reveal = {
  initial: hidden,
  whileInView: visible,
  viewport: { once: true, amount: 0.2 },
  transition: spring,
} as const;

export default function AboutContent() {
  const [scrambling, setScrambling] = useState(false);

  return (
    <section className="flex flex-col min-h-screen bg-background items-center py-20 sm:py-[120px] gap-16 sm:gap-[80px] px-6">

      {/* Hero: particle + bio */}
      <div className="w-full max-w-[560px] flex flex-col gap-10 items-start">
        <motion.div
          initial={hidden}
          animate={stagger(0.08)}
          className="shrink-0"
        >
          <HeroParticleRender width={200} height={236} />
        </motion.div>
        <motion.div
          initial={hidden}
          animate={stagger(0.16)}
          className="w-full flex flex-col gap-5"
        >
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Hi! I&apos;m Bayo. I have a background in Chemistry, but today, I am a Senior Product Designer{" "}
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="underline decoration-dotted decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 cursor-help"
                  onMouseEnter={() => setScrambling(true)}
                  onMouseLeave={() => setScrambling(false)}
                >
                  <ScrambleText text="$k%Snd#03dheisn&#82" trigger={scrambling} />
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                –just gibberish or a Bayo&apos;s way of saying LFG!!!
              </TooltipContent>
            </Tooltip>
            . I moved to Lagos couple years ago to find my path and chase a career in tech – a journey that has led me to where I am today.
          </p>
          <h1
            className="text-neutral-800 dark:text-neutral-50 w-full"
            style={{ fontWeight: 500, fontSize: "24px", lineHeight: "32px", letterSpacing: "-0.47px" }}
          >
            As a designer passionate about designing memorable experiences through empathy-driven user obsession and design craftsmanship.
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            I believe design is a tool for empowering users — for making them feel the world as they see it. And sometimes, the design of a thing or an experience can be the single difference between a person&apos;s good and a bad day.
          </p>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Hence, I believe it&apos;s a noble thing and it takes a blend of focusing on user problems, how people understand technology, and designing from a human-centered approach.
          </p>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            My design discipline is embodied by intentional combination of core craftsmanship and empathy-driven obsession in designing products that meet user needs while achieving business goals.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://drive.google.com/file/d/1Bz5S6NFYI1urrwH9hesTWrAz686U_2EC/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors px-4 py-2 rounded-full"
            >
              Resume
            </a>
            <a
              href="mailto:falekeglory@gmail.com"
              className="text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors px-4 py-2 rounded-full"
            >
              Email
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={hidden}
          animate={stagger(0.24)}
          className="w-full grid grid-cols-3 gap-2"
        >
          {photos.map(({ src, w, h }) => (
            <div key={src} className="relative w-full aspect-[3/4] overflow-hidden">
              <Image
                src={src}
                alt=""
                width={w}
                height={h}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Content sections */}
      <div className="w-full max-w-[560px] flex flex-col gap-16">

        {/* How it all started */}
        <motion.div {...reveal}>
          <div className="flex items-center gap-3 mb-4"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">How it all started</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              I stumbled on product design in 2018 when I was just graduating university and was working on a business idea for a talent marketplace. Through research, I found out product design is how the visuals of web, mobile, and most interfaces we use are done.
            </p>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Ever since, I have self-taught myself design via different mediums and through the help of colleagues and great designers in the space.
            </p>
          </div>
        </motion.div>

        {/* Currently */}
        <motion.div {...reveal}>
          <div className="flex items-center gap-3 mb-4"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Currently</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Senior Product Designer at Paycrest</p>
        </motion.div>

        {/* Experience */}
        <motion.div {...reveal}>
          <div className="flex items-center gap-3 mb-6"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Experience</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
          <div className="flex flex-col">
            {experience.map(({ company, role, period }) => (
              <div key={company} className="flex items-start justify-between py-3.5 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{company}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{role}</p>
                </div>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums shrink-0 ml-6 text-right">{period}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stack */}
        <motion.div {...reveal}>
          <div className="flex items-center gap-3 mb-6"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Stack</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
          <div className="flex flex-wrap gap-2">
            {stack.map((tool) => (
              <span key={tool} className="text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full">
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Not Designing */}
        <motion.div {...reveal}>
          <div className="flex items-center gap-3 mb-4"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Not Designing?</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              When I&apos;m not designing, you&apos;ll probably find me checking out inspirations from Dribbble, Layers, or my hundreds of bookmarked designs from amazing people all over the world.
            </p>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Sometimes, I&apos;m working on side projects or playing FC 2024.
            </p>
          </div>
        </motion.div>

        {/* Community & Impact */}
        <motion.div {...reveal}>
          <div className="flex items-center gap-3 mb-6"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Community &amp; Impact</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-7">
            From leading communities and teaching design to sharing resources on Figma and Framer, I explore my passion for building and driving impacts by helping other designers to grow and become better.
          </p>
          <div className="flex flex-col gap-6">
            {community.map(({ name, desc, href }) => (
              <div key={name}>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-1.5">
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1">
                      {name} <span className="text-neutral-400 text-xs">↗</span>
                    </a>
                  ) : name}
                </p>
                <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Side Projects */}
        <motion.div {...reveal}>
          <div className="flex items-center gap-3 mb-6"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Side Projects</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6">
            Resources such as UI kits and portfolio templates which I have created on Framer and Figma for other designers, developers, and creators.
          </p>
          <div className="flex flex-col">
            {sideProjects.map(({ name, platform, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3.5 border-b border-neutral-100 dark:border-neutral-800 last:border-0 group"
              >
                <p className="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-neutral-100 transition-colors">{name}</p>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0 ml-4">{platform} ↗</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Socials */}
        <motion.div {...reveal}>
          <div className="flex items-center gap-3 mb-6"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Find me on</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
          <div className="flex flex-wrap gap-2">
            {socials.map(({ label, handle, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors px-3 py-2 rounded-full"
              >
                <span className="text-neutral-400 dark:text-neutral-500">{label}</span>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">{handle}</span>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
