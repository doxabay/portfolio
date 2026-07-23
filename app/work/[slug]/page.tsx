import Image from "next/image";
import TocNav from "@/components/toc-nav";
import ImageCarousel from "@/components/image-carousel";
import DashboardExpectations from "@/components/dashboard-expectations";
import MessagingCards from "@/components/messaging-cards";
import ResultStats from "@/components/result-stats";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { StaggerHeader, CaseStudyCanvas } from "@/components/case-study-animations";
import { PencilCircle } from "@/components/pencil-circle";
import WitanAvatarCredits from "@/components/witan-avatar-credits";
import ViewportVideo from "@/components/viewport-video";
import PersonLink from "@/components/person-link";

const toc = [
  {
    id: "overview", label: "Overview",
    children: [{ id: "beta-to-v1", label: "Beta to v1" }],
  },
  { id: "backstory", label: "Backstory" },
  {
    id: "challenge", label: "Challenge",
    children: [{ id: "need-better-than-beta", label: "Need for Much Better than Beta" }],
  },
  {
    id: "goal", label: "Goal",
    children: [
      { id: "simplify-onboarding", label: "Simplify onboarding flow" },
      { id: "redesign-experience", label: "Redesign the creator experience" },
    ],
  },
  { id: "role", label: "My Role" },
  {
    id: "insights", label: "Insights",
    children: [
      { id: "first-stop-mixpanel", label: "First stop: Mixpanel" },
      { id: "second-stop-identity", label: "Second stop: Identity check" },
      { id: "third-stop-file", label: "Third stop: More than the file" },
    ],
  },
  {
    id: "research", label: "Research",
    children: [
      { id: "hotjar-painpoints", label: "Hotjar painpoints" },
      { id: "ux-research", label: "UX-Research: digging deeper" },
      { id: "new-messaging", label: "A new messaging" },
    ],
  },
  {
    id: "design", label: "Design",
    children: [
      { id: "introducing-v1", label: "Introducing V1" },
      { id: "unified-platform", label: "A unified platform experience" },
      { id: "onboarding-easy", label: "Onboarding made easy" },
      { id: "search-experience", label: "Improved search experience" },
      { id: "payments", label: "Offchain and onchain payments" },
      { id: "creator-base", label: "The creator base" },
      { id: "asset-upload", label: "Asset Upload Flow" },
      { id: "maze-testing", label: "Testing with Maze" },
    ],
  },
  { id: "result", label: "Impact" },
  { id: "feedback", label: "Feedback" },
];

export default async function CaseStudyPage() {
  return (
    <div className="flex flex-col">
      <div className="relative min-h-screen">
        {/* Left sidebar — desktop only */}
        <aside className="hidden lg:flex fixed top-0 left-0 z-10 w-52 pt-[108px] pb-10 pl-11 pr-4 flex-col">
          <div>
            <TocNav items={toc} />
          </div>
        </aside>


        {/* Content area */}
        <div className="flex flex-col pt-6 lg:pt-[100px] pb-12 px-4 sm:px-6 lg:pl-[268px] lg:pr-8 2xl:px-8 min-w-0">
          <div id="case-study-header" className="w-full max-w-[560px] mx-auto mb-8 lg:mb-[60px]">
            <StaggerHeader className="flex flex-col gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/blocasset.svg" alt="Blocasset logo" width={34} height={34} className="rounded-[6px] shrink-0" />
              <h1 className="text-3xl sm:text-4xl text-neutral-800 dark:text-neutral-50 tracking-tight font-medium" style={{ fontFamily: "KaliceTrial" }}>
                <SquigglyText className="text-neutral-800 dark:text-neutral-50" scale={[4, 6]} stepDuration={320}>
                  Blocasset
                </SquigglyText>
              </h1>
              <h1 className="text-neutral-800 dark:text-neutral-50 w-full" style={{ fontWeight: 500, fontSize: "24px", lineHeight: "32px", letterSpacing: "-0.47px" }}>
                From beta to v1: Designing an onchain platform for powering creator&apos;s success
              </h1>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                2022–2024 / PRODUCT / WEB
              </p>
            </StaggerHeader>
          </div>

            {/* Canvas */}
            <CaseStudyCanvas className="w-full max-w-[560px] mx-auto py-8 lg:py-[60px] text-neutral-800 dark:text-neutral-200 [&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-600 dark:[&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-400">

              {/* Overview */}
              <section id="overview" className="mb-16">
                <div className="flex flex-col gap-10 max-w-[560px] mx-auto">
                  {/* Content column */}
                  <div className="w-full">
                    <div className="flex items-center gap-3 mb-3"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Overview</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                    <h2 id="beta-to-v1" className="text-xl mb-4">Beta to v1</h2>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                      Blocasset features a marketplace, shop, portfolio, and dashboard where creators can upload their work and get paid globally.
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                      Blocasset Beta wasn&apos;t cutting it. As the creator economy evolved, Blocasset faced a choice: iterate or pivot. The team chose to pivot which meant rethinking core experiences from the ground up to meet emerging user needs and compete in a rapidly evolving market.
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      As part of the design team, I contributed end-to-end: from research and UX strategy through to high-fidelity UI and developer handoff.
                    </p>
                  </div>

                  {/* Metadata list */}
                  <div className="w-full flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
                    <div className="flex items-center justify-between gap-6 py-3">
                      <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Year</p>
                      <p className="text-sm text-neutral-400 text-right">2024</p>
                    </div>
                    <div className="flex items-center justify-between gap-6 py-3">
                      <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">My role</p>
                      <p className="text-sm text-neutral-400 text-right">Founding Product Designer</p>
                    </div>
                    <div className="flex items-center justify-between gap-6 py-3">
                      <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Industry</p>
                      <p className="text-sm text-neutral-400 text-right">Web3 / Creator Economy</p>
                    </div>
                    <div className="flex items-center justify-between gap-6 py-3">
                      <p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Credits</p>
                      <WitanAvatarCredits />
                    </div>
                  </div>
                </div>
              </section>

              <div className="mb-16">
                <Image src="/Blocasset-1.jpg" alt="Blocasset overview" width={1920} height={1080} className="w-full h-auto" />
              </div>

              {/* Backstory */}
              <section id="backstory" className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <div className="flex items-center gap-3 mb-3"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Backstory</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Blocasset aims to create opportunity through superior creator tools and features that enable creators to build and scale their own economy while doing what they love. Blocasset&apos;s product values such as empowerment, creator-first, community, innovation, is driven towards ensuring design creatives have equal opportunities to earn instantly and also showcase their talents on a global scale, free of middleman, financial hurdles and plagiarism.
                  </p>
                </div>
              </section>

              {/* Challenge */}
              <section id="challenge" className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <div className="flex items-center gap-3 mb-3"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">The challenge</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                  <h2 id="need-better-than-beta" className="text-xl mb-4">Need for Much Better than Beta</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    After launching Blocasset Beta, it showed promises and gave some validations needed in alignment with the product vision, however, series of different challenges developed along the way.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    We were experiencing a high rate (80%) of drop-off across all platforms (mobile, tablet, and web) and only about 20% make it through the onboarding process. The most obvious source of problem we concluded on was how niched the web3 nature of the onboarding flow looked.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    There was a gap in communication between user perception and the actual solution Blocasset intends to provide. The vibe for beta was all about marketplace and solving payments which led to a significant level of confusion from both product perspective and marketing efforts.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    Also, based on a research we conducted, about 75% of the participants being junior designers had no idea how to sell their assets while the senior designer participants just didn&apos;t care so much about it.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    At this point, we had to take a step back to evaluate product objectives and redefine some core aspects of the experience. This made us review our focus on singling solving payments but expanding the scope of our product offering beyond that.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Overall, we chose an open-minded approach that seeks to probe and experiment to get data-driven results in decision making process.
                  </p>
                </div>
              </section>

              <div className="mb-16">
                <Image src="/blocasset-2.jpg" alt="Blocasset goal" width={1920} height={1080} className="w-full h-auto" />
              </div>

              {/* Goal */}
              <section id="goal" className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <div className="flex items-center gap-3 mb-3"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Goal</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6">
                    As we set out to solve the challenges posed by Blocasset beta and preparing for v1, the high-level goals are to:
                  </p>
                  <h2 id="simplify-onboarding" className="text-xl mb-4 italic font-normal text-pretty w-full">
                    Simplify onboarding flow, reducing drop-offs by 60–80% across all platforms
                  </h2>
                  <h2 id="redesign-experience" className="text-xl italic font-normal text-pretty w-full">
                    Redesign the creator experience for an all-round improved perceived value
                  </h2>
                </div>
              </section>

              {/* My Role */}
              <section id="role" className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <div className="flex items-center gap-3 mb-6"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">My role</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-base font-medium mb-2">UI Design</h3>
                      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        I was responsible for visual design of the mobile and desktop responsive design of Blocasset v1, collaborating with <PersonLink href="https://x.com/Ummiux">Ummi</PersonLink>, <PersonLink href="https://x.com/dodoo_darling/media">Stephanie</PersonLink>, and <PersonLink href="https://x.com/codemathics">Clement</PersonLink>. The design process involves blending together the elements of web3 environment with the familiarity and simplicity of web2 principles for ease of use.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-2">Usability Testing and Research</h3>
                      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        Conducted multiple rounds of moderated user testing to get feedback from users and validate some product ideas. Also used tools like Maze. Collaborated to create research structure and conducted user interviews, competitor analysis to provide insights for clarity and evaluation.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-2">Interaction Design</h3>
                      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        I created Figma prototypes and interaction designs for core flows including creator dashboard and purchase experience for conducting usability testing and (a refined version) for smoother handoff.
                      </p>
                    </div>
                    <div>
                      <PencilCircle>
                        <h3 className="text-base font-medium">Key Contribution</h3>
                      </PencilCircle>
                      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        I helped the company organize its first user testing program which was pivotal to helping discover bugs, uncovering UI implementation issues and UX challenges, and altogether speed up all-round implementation to go to market. I also contributed in setting up partnerships with top designers and influencers in Nigeria and getting them onboard Blocasset.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Insights */}
              <section id="insights" className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <div className="flex items-center gap-3 mb-3"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Insights</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                  <h2 id="first-stop-mixpanel" className="text-xl mb-4">First stop: Mixpanel</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    I started by looking at our Mixpanel analysis to identify potential causes for user drop off during sign up.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    I noticed there was a mix of both engineering challenge and 3rd party authentication issue during wallet connection. At the time, the single method a user onboards was to connect their web3 wallet such as <em>Metamask, Rainbow, Trustwallet</em>, etc. These wallets being 3rd party natively installed apps mean users without one would be unable to onboard.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    While we employed different growth strategies and introduced &ldquo;Walletconnect&rdquo; to improve this experience, it only showed little to no significant results. The simple indication of this is that we have built only for designers who are also crypto degens. That really hit us!
                  </p>
                </div>
              </section>



              <div className="mb-16">
                <div
                  className="w-full flex items-end justify-center pt-16 pb-0 overflow-hidden"
                  style={{ backgroundImage: "url('/shot-imageBG.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <ViewportVideo src="/Mixpanel-Animation.mp4" className="w-[85%] h-auto" />
                </div>
              </div>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 id="second-stop-identity" className="text-xl mb-4">Second stop: Identity check</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    We viewed this as sort of an identity crisis which resulted from the core user segmentation approach built into Blocasset Beta. In principle, we designed to distinctly cater for people who are just on the platform to buy (Buyers) and those that are onboarding to sell (Contributors).
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    It wasn&apos;t obvious at first because this approach felt like a no-brainer. However, from post-beta launch feedback, we eventually realized the buying experience (marketplace) and contributor dashboard felt like two different entities with separate experiences. In fact, to users, it was perceived as though they have to be one or the other.
                  </p>
                </div>
              </section>

              <div className="mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://framerusercontent.com/images/grPApWPboJrgaAu0a8go6K1sFNw.png" alt="Identity check analysis" className="w-full h-auto" />
              </div>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 id="third-stop-file" className="text-xl mb-4">Third stop: More than the file</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    One major pivot in the existence of Blocasset beta was realizing that the problem we imagined was bigger than what Beta could handle. It was immediately obvious that the asset upload flow we had earlier imagined was flawed in so many ways. For starters, these are the top 2 scenarios we discovered:
                  </p>
                  <ol className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 space-y-4 list-decimal list-outside pl-5">
                    <li>
                      It was super critical to be able to ascertain the files uploaded are truly what the creator says they are. A contributor could upload a .png file and (intentionally or not) select an incompatible .ai or .eps extension — an easy case and opportunity for exploitation and theft.
                    </li>
                  </ol>
                </div>
              </section>

              <div className="mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/thirdstop001.jpg" alt="Asset upload flow issues" className="w-full h-auto" />
              </div>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <ol start={2} className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 space-y-4 list-decimal list-outside pl-5">
                    <li>
                      There was no way for a contributor to share their process or connect with people making the purchase the way they want. The upload flow on Beta lacked elements that could easily give contributors control of how their assets are displayed and marketed to potential buyers.
                    </li>
                  </ol>
                </div>
              </section>

              <div className="mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/thirdstop002.jpg" alt="Asset upload flow issues" className="w-full h-auto" />
              </div>

              {/* Research */}
              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 className="text-xl mb-4">Handling payments</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    Blocasset aims to solve cross-border payments by taking advantage of the decentralized nature of crypto. With crypto, it was easier for anyone to skip the tedious fiat payment limitations and get paid from anywhere with stablecoins. While the idea sounds great, there are acceptance challenges posed by general sentiments in the ecosystem due to the market crash and instability in crypto prices.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Piled on top of this, everything about Blocasset beta screams crypto. It was difficult to align the users&apos; perceived value of what we have built with the actual value of Blocasset being a creator tool. For most people we interviewed, it was just like another crypto project waiting to topple over.
                  </p>
                </div>
              </section>

              <section id="research" className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <div className="flex items-center gap-3 mb-3"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Research</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                  <h2 id="hotjar-painpoints" className="text-xl mb-4">Learning more about painpoints — Hotjar</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    Integrating Hotjar helped us in a lot of ways as we pored through dozens of recordings and heatmaps as part of our forensics to identify more pain points. We also integrated a Hotjar form on the website with the goal to get feedback on experience or issues encountered.
                  </p>
                  <ul className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 space-y-3 list-disc list-outside pl-5">
                    <li>
                      <strong className="text-neutral-600 dark:text-neutral-400 font-medium">Limited information on asset performance</strong> — lack of access to exquisite information on their asset performance was a recurring feedback which in turn affected retention.
                    </li>
                    <li>
                      <strong className="text-neutral-600 dark:text-neutral-400 font-medium">Broken Search Experience</strong> — most search sessions ended midway. Considering how covering a wider range of asset kinds is proportional to having a superior search system, this finding made sense as Blocasset Beta asset coverage was initially very limited and niched.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 id="ux-research" className="text-xl mb-4">UX-Research: digging deeper</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    Collaborating with our UX Strategist, Stephanie, we conducted user interviews with creators who already sell assets and those who plan to. The key objectives of the research was to understand what tone of voice particularly resonates with them and what their priorities are in terms of monetisation and popularity.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6">
                    Ultimately, it helped us re-evaluate our storytelling approach, user personas, and tone of communication across the platform. Our messaging transformed from just being a marketplace for design assets to:
                  </p>
                  <MessagingCards />
                </div>
              </section>

              <div className="mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://framerusercontent.com/images/xcF4WOIjiSAm0NGxrzbx1FoAJZs.png" alt="UX research findings" className="w-full h-auto" />
              </div>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 id="new-messaging" className="text-xl mb-4">A new messaging</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    With a renewed understanding and perspective, our refined problem statement began to take shape:
                  </p>
                  <blockquote className="text-xl font-normal text-neutral-600 dark:text-neutral-400 border-l-4 border-neutral-200 dark:border-neutral-800 pl-5 mb-6">
                    &ldquo;How might we empower creators with the tools to build their own economy&rdquo;
                  </blockquote>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    In the new design direction, we drove design through three principles: <code className="text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-1.5 py-0.5 rounded-md">Simplicity</code>, <code className="text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-1.5 py-0.5 rounded-md">Value</code>, <code className="text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-1.5 py-0.5 rounded-md">Unification</code>. This helped us stay on the course and consistently aligned in the desire to deliver quality in the entire design definition phase.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    We launched a complete design overhaul of Blocasset Beta. Collaborating with my partner <PersonLink href="https://x.com/Ummiux">Ummi</PersonLink>, and everyone on the product team, we explored the neo-brutalist design direction for the visual style of the entire platform design.
                  </p>
                </div>
              </section>

              <DashboardExpectations />

              {/* Design */}
              <section id="design" className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <div className="flex items-center gap-3 mb-3"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">New design</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                  <h2 id="introducing-v1" className="text-xl mb-4">Introducing V1</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    V1 messaging and design direction wasn&apos;t all about enabling crypto payments. Instead, with a new storytelling strategy focused on providing access that helps creators sell, earn passively, find more clients, get hired, and gain global recognition beyond the shores of Nigeria and Africa.
                  </p>
                </div>
              </section>

              <div className="mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/introblocasset.jpg" alt="Blocasset V1 design" className="w-full h-auto" />
              </div>

              <div className="mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assetsblocasset.jpg" alt="Blocasset V1 design" className="w-full h-auto" />
              </div>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 id="unified-platform" className="text-xl mb-4">A unified platform experience</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    We designed the onboarding flow to help provide a tailored platform experience to users based on their topmost priority for using Blocasset. This also enabled us to fulfil simplicity to the user by providing certain experiences to them when they need it.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    With the new dashboard design, identity is not lost. Everyone is a creator, either passively or actively uploading or selling assets.
                  </p>
                </div>
              </section>

              <div className="mb-16">
                <ViewportVideo src="/Unified-Ex.mp4" plain playbackRate={1.2} className="w-full h-auto" />
              </div>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 id="onboarding-easy" className="text-xl mb-4">Onboarding made easy</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    We tackled the onboarding challenge by building on an infrastructure that enabled us to stay inclusive and bring users onchain without compromising on the promise of simplicity of V1.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    Collaborating with <PersonLink href="https://x.com/Ummiux">Ummi</PersonLink>, we designed the new flow to offer a frictionless onboarding experience with social accounts for creators, therefore avoiding the complexity of using web3 wallets especially for non-crypto savvy users.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    The integration also marked a significant impact on the drive to onboard more users onchain.
                  </p>
                </div>
              </section>

              <div className="mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://framerusercontent.com/images/20KwuiDxD0CoxqMfnqOE7pujYM.png" alt="Easy onboarding flow" className="w-full h-auto" />
              </div>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 id="search-experience" className="text-xl mb-4">Improved search experience</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    The search experience was one of the product aspects that took a lot of brainstorming efforts and back and forth in the team. It is closely tailored to the marketplace and as such plays a pivotal role in providing an elevated experience to an otherwise frustrating flow for users from beta.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    We identified common groups assets exist in and prioritized sub-niches as the marketplace headers and on search result page.
                  </p>
                </div>
              </section>

              <div className="mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/searchblocasset.jpg" alt="Search experience" className="w-full h-auto" />
              </div>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 id="payments" className="text-xl mb-4">Offchain and onchain payments</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Blocasset V1 direction aligns with bringing more users onchain and building the wallet module gives us the opportunity to achieve this. I designed the wallet page to allow users manage earnings in stablecoins such as USDT, USDC, and DAI while equally providing local fiat payment options like Nigeria Naira, Ghana Cedis, Kenya Shillings etc.
                  </p>
                </div>
              </section>

              <div className="mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/walletblocasset.jpg" alt="Payments" className="w-full h-auto" />
              </div>

              <div className="mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/walletblocasset2.jpg" alt="Payments" className="w-full h-auto" />
              </div>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 id="creator-base" className="text-xl mb-4">The creator base</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    I designed the creator dashboard with the goal to provide creators with all they need in one place. Building on the positives from beta and incorporating feedback from users, the creator dashboard is nourished with better analytics and tools that give the creator rich insights of all activities around their assets and profile.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Usability tests we carried out revealed how impactful the dashboard experience would be as it contains the necessary tools for creators to make informed decisions and connect more with their audience.
                  </p>
                </div>
              </section>

              <div className="mb-16">
                <ImageCarousel images={[
                  { src: "/socialblocasset.jpg", alt: "Creator dashboard" },
                  { src: "/socialblocasset2.jpg", alt: "Creator dashboard" },
                  { src: "/socialblocasset3.jpg", alt: "Creator dashboard" },
                  { src: "/socialblocasset4.jpg", alt: "Creator dashboard" },
                  { src: "/socialblocasset5.jpg", alt: "Creator dashboard" },
                ]} />
              </div>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 id="asset-upload" className="text-xl mb-4">Asset Upload Flow</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-4">
                    This was a very critical part of why we are building V1, therefore, the stakes are high. The goal here is to make the flow intuitive and polished for creators to show their process and connect better with their audience.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    From providing walkthroughs and onboarding guides to breaking the entire flow into associated steps, the design helps creators settle in quickly in a space that readily feels familiar.
                  </p>
                </div>
              </section>

              <div className="mb-16">
                <ImageCarousel images={[
                  { src: "/uploadblocasset001.jpg", alt: "Asset upload flow" },
                  { src: "/uploadblocasset002.jpg", alt: "Asset upload flow" },
                  { src: "/uploadblocasset003.jpg", alt: "Asset upload flow" },
                  { src: "/uploadblocasset004.jpg", alt: "Asset upload flow" },
                  { src: "/uploadblocasset005.jpg", alt: "Asset upload flow" },
                  { src: "/uploadblocasset006.jpg", alt: "Asset upload flow" },
                  { src: "/uploadblocasset007.jpg", alt: "Asset upload flow" },
                  { src: "/uploadblocasset008.jpg", alt: "Asset upload flow" },
                  { src: "/uploadblocasset009.jpg", alt: "Asset upload flow" },
                  { src: "/uploadblocasset0010.jpg", alt: "Asset upload flow" },
                ]} />
              </div>

              <section className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <h2 id="maze-testing" className="text-xl mb-4">Testing with Maze</h2>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    We recruited some of our existing contributors from Blocasset Beta for an unmoderated testing of the new asset upload experience of the creator dashboard. I created a clickable Figma prototype of the flow and imported it to Maze. The result from this usability test was very affirmative and the results reflected how smooth and easy the flow is.
                  </p>
                </div>
              </section>

              <div className="mb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/feedblocasset.jpg" alt="Maze testing results" className="w-full h-auto" />
              </div>

              {/* Impact */}
              <section id="result" className="mb-16">
                <div className="w-full max-w-[560px] mx-auto">
                  <div className="flex items-center gap-3 mb-3"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">Impact</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-8">
                    The creator dashboard now serves as a central hub that provides creators with real-time performance data and important updates, enabling better decision-making.
                  </p>
                  <ResultStats />
                </div>
              </section>

              {/* Feedback */}
              <section id="feedback">
                <div className="w-full max-w-[560px] mx-auto">
                  <div className="flex items-center gap-3 mb-6"><p className="text-sm text-[lab(2.75381_0_0)] dark:text-neutral-200 font-medium">User feedback</p><span aria-hidden="true" className="flex-1 h-[0.5px] bg-neutral-200 dark:bg-neutral-800" /></div>
                  <div className="space-y-8">
                    {[
                      {
                        name: "Valentine",
                        gradient: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
                        quote: "“I’m a creator who loves to use Blocasset to sell my 3D assets and connect with other creators. I also use the site to store my 3D design files when I don’t have space on my computer. I’ve had great experiences with the site so far, and I’m excited to see what they have in store for us in the next version.”",
                      },
                      {
                        name: "Designade",
                        gradient: "linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)",
                        quote: "“The outstanding feeling of being a creator is exactly how Blocasset helps me express and showcase my creative outputs.”",
                      },
                      {
                        name: "Vicko",
                        gradient: "linear-gradient(135deg, #bae6fd 0%, #7dd3fc 100%)",
                        quote: "“Blockasset has been a revelation for my creative journey — supercharging my workflow and amplifying my income potential. The platform’s intuitive interface and robust features make sharing and monetizing my work seamless. But it’s not just the tech; the community and dedicated support are unmatched.”",
                      },
                    ].map(({ name, gradient, quote }) => (
                      <div key={name}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full shrink-0" style={{ background: gradient }} />
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{name}</p>
                        </div>
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{quote}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

            </CaseStudyCanvas>
        </div>
      </div>
    </div>
  );
}
