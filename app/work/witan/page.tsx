import type { Metadata } from "next";
import TocNav from "@/components/toc-nav";
import StickyBackLink from "@/components/sticky-back-link";
import { SquigglyText } from "@/components/ui/squiggly-text";
import WitanAvatarCredits from "@/components/witan-avatar-credits";

export const metadata: Metadata = { title: "Witan" };

const toc = [
  {
    id: "overview", label: "Overview",
    children: [],
  },
  { id: "background", label: "Background" },
  {
    id: "problem", label: "Problem Space",
    children: [
      { id: "opportunity", label: "Opportunity indicators" },
    ],
  },
  { id: "constraints", label: "Constraints" },
  { id: "survey", label: "Survey Insights" },
  { id: "summary", label: "Research Summary" },
  {
    id: "layout", label: "Layout",
    children: [
      { id: "auth-options", label: "Authentication options" },
      { id: "event-creation", label: "Event creation flow" },
      { id: "lost-tickets", label: "Lost tickets" },
      { id: "coincidental-booking", label: "Coincidental booking" },
    ],
  },
  {
    id: "visuals", label: "Visual Design",
    children: [
      { id: "onboarding", label: "Onboarding" },
      { id: "event-page", label: "Event page" },
      { id: "publishing", label: "Publishing" },
      { id: "accepting-payments", label: "Payments" },
      { id: "discount-codes", label: "Discount codes" },
      { id: "admitting-attendees", label: "Admitting attendees" },
      { id: "one-more-thing", label: "One more thing…" },
    ],
  },
  { id: "testing", label: "Testing" },
  { id: "learnings", label: "Learnings" },
];

export default async function WitanCaseStudy() {
  return (
    <div className="flex flex-col">

      <div className="flex min-h-screen">

        {/* Sidebar — desktop only */}
        <aside className="hidden lg:flex w-52 shrink-0 pt-[108px] pb-10 pl-11 pr-4 flex-col">
          <div className="sticky top-6">
            <StickyBackLink />
            <TocNav items={toc} />
          </div>
        </aside>


        {/* Content area */}
        <div className="flex-1 flex flex-col pt-6 lg:pt-[100px] pb-12 px-4 sm:px-6 lg:pl-[80px] lg:pr-6 min-w-0">

          {/* Back link — mobile only */}
          <div className="lg:hidden mb-6">
            <StickyBackLink />
          </div>

          {/* Page header */}
          <div id="case-study-header" className="w-full mb-8 lg:mb-[60px]" style={{ maxWidth: "min(75vw, 100%)" }}>
            <div className="flex flex-col gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/witan.svg" alt="Witan logo" width={34} height={34} className="rounded-[6px] shrink-0" />
              <h1 className="text-3xl sm:text-4xl text-neutral-950 tracking-tight font-medium">
                <SquigglyText className="text-neutral-950" scale={[4, 6]} stepDuration={320}>
                  Witan
                </SquigglyText>
              </h1>
              <h1 className="text-neutral-950 dark:text-neutral-50 w-full lg:w-[75%]" style={{ fontFamily: "KaliceTrial", fontWeight: 500, fontSize: "28px" }}>
                A ticketing platform where people can create and book events — built for flexible ticketing, audience insights, and payments beyond fiat.
              </h1>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                2022–2023 / EVENTS / WEB3
              </p>
            </div>
          </div>

          {/* Canvas */}
          <div className="w-full py-8 lg:py-[60px] text-zinc-800 [&_p:not(.uppercase):not(.font-semibold):not(.font-medium)]:text-neutral-600">

            {/* Overview */}
            <section id="overview" className="mb-16">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">

                {/* Metadata grid */}
                <div className="w-full lg:w-1/2 lg:shrink-0 grid grid-cols-2 gap-x-6 gap-y-8 lg:pr-[100px] content-start">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Year</p>
                    <p className="text-sm tracking-wide text-neutral-400">2022–2023</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Industry</p>
                    <p className="text-sm tracking-wide text-neutral-400">Events / Web3</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">My Role</p>
                    <p className="text-sm tracking-wide text-neutral-400">Product Design, Interaction Design, Usability Testing.</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-medium">Credits</p>
                    <WitanAvatarCredits />
                  </div>
                </div>

                {/* Overview text */}
                <div className="w-full lg:w-1/2 lg:pr-10">
                  <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Overview</p>
                  <h2 id="overview-heading" className="text-xl mb-4">Ticketing, reimagined for Africa</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Witan is a platform where people can create and book events. It provides the necessary tools for event organizers who are keen on a flexible ticketing approach, understanding their audience, and exploring more payment options beyond fiats.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Built for the Nigerian and broader African market, Witan tackles the real payment and discoverability gaps that platforms like Eventbrite leave wide open.
                  </p>
                </div>

              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Witan-cover.jpg" alt="Witan product overview" className="w-full h-auto" />
            </div>

            {/* Background */}
            <section id="background" className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Background</p>
                <h2 className="text-xl mb-4">Bring ticketing close to home</h2>
                <p className="text-sm leading-relaxed mb-6">
                  Many see the ticketing space as just another low-hanging fruit — the stakes are somewhat lower and the technologies involved are readily available today. But for Nigerians, buying things online has only been a thing in the last 2 years. We have gradually evolved from the crude pay-at-the-venue process to buying tickets online. However, the current solutions fail in many ways to adequately cater for the ticketing needs of the Nigerian population.
                </p>
                <blockquote className="text-base italic font-normal text-zinc-800 border-l-2 border-zinc-200 pl-5 mb-6">
                  &ldquo;For most Africans, Eventbrite is overcooked — it&apos;s like using a sledgehammer to crack a nut. Lots of features, but the problem of payment will always be a major painpoint. Nobody cares if it leaves money on the table.&rdquo;
                </blockquote>
                <p className="text-sm leading-relaxed">
                  We were not quick to assume it&apos;s all about local payments. Findings through our initial research suggest organizers are keen on factoring in the demands of the international audience when accessing payment options for events.
                </p>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/wwcJ3l4EQboNmWWi9OPYq1jYI8.png" alt="Witan product overview" className="w-full h-auto" />
            </div>

            {/* Problem Space */}
            <section id="problem" className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Problem Space</p>

                <div className="space-y-8 mb-10">
                  <div>
                    <h3 className="text-base font-medium mb-2">Tedious event setup and management</h3>
                    <p className="text-sm leading-relaxed">
                      From too many flows to exhausting information requirements, most existing platforms fall short in simplifying event setup for organizers. Organizers are big on options that help them streamline this with less effort so they can concentrate on the actual planning of the event.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-2">Getting paid is a major hassle</h3>
                    <p className="text-sm leading-relaxed">
                      It&apos;s tough already setting up an event but that pain is nothing compared to the difficulty of converting US dollars to local currency for many event organizers in the African space. It&apos;s equally hard for attendees to purchase tickets in foreign currencies.
                    </p>
                  </div>
                </div>

                <h2 id="opportunity" className="text-xl mb-6">Opportunity indicators</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-base font-medium mb-2">Embracing the culture of pre-sale</h3>
                    <p className="text-sm leading-relaxed">
                      There is an increasing adoption of e-ticketing solutions and Nigerians are latching on opportunities to get pre-sale tickets at discounted prices, especially for live events.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-2">Cryptocurrency leverage</h3>
                    <p className="text-sm leading-relaxed">
                      Africans are one of the leading adopters of cryptocurrencies. What if we can leverage crypto&apos;s decentralized tech to facilitate easier cross-border payments?
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Constraints */}
            <section id="constraints" className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Constraints</p>
                <h2 className="text-xl mb-4">Embracing challenges</h2>
                <ul className="text-sm leading-relaxed space-y-3 list-disc list-outside pl-5">
                  <li>Tough UX decisions on combining fiat with blockchain authentication and payments.</li>
                  <li>A two month deadline to build the MVP to coincide with ticket sales for one of our beta tester&apos;s event, UDC.</li>
                  <li>A small team working on this project meant getting organized and finding the right cohesion from the get-go was key.</li>
                </ul>
              </div>
            </section>

            {/* Survey Insights */}
            <section id="survey" className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Survey Insights</p>
                <h2 className="text-xl mb-4">What the numbers say</h2>
                <p className="text-sm leading-relaxed">
                  Insights from an online survey revealed that people are trying out online ticket purchase to a certain degree and are already familiar with platforms like Eventbrite, Ticket Hub, Ticketmaster etc. However, issues with payments and discount codes is a recurring challenge.
                </p>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/Nrwllq40BbFxHxClWOrAboUhM.png" alt="Survey stats" className="w-full h-auto" />
            </div>

            {/* Research Summary */}
            <section id="summary" className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Research Summary</p>
                <ul className="text-sm leading-relaxed space-y-4 list-disc list-outside pl-5">
                  <li>
                    <strong className="text-zinc-700 font-medium">Onboarding difficulties</strong> — users find it hard to sign up on existing platforms like Eventbrite due to unavailability of mobile verification options for Nigerians.
                  </li>
                  <li>
                    <strong className="text-zinc-700 font-medium">Ticket fraud and duplicates</strong> — organizers have experienced major challenges with cases where tickets are resold or reused during events.
                  </li>
                  <li>
                    <strong className="text-zinc-700 font-medium">Audience reach</strong> — due to low penetration of ticketing platforms in Nigeria, there&apos;s low discoverability of events and organizers are unable to optimize for reach and profit.
                  </li>
                </ul>
              </div>
            </section>

            {/* Layout */}
            <section id="layout" className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Layout</p>
                <h2 id="auth-options" className="text-xl mb-4">Authentication options</h2>
                <div className="space-y-6 mb-6">
                  <div>
                    <h3 className="text-base font-medium mb-2">1. Social account</h3>
                    <p className="text-sm leading-relaxed">
                      Users can sign up directly with email address or social account e.g Facebook, Google, Reddit, X, etc.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-2">2. Wallet</h3>
                    <p className="text-sm leading-relaxed">
                      For crypto-savvy users who would like to sign up with Metamask, Argent, Rainbow Phantom, etc.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/KAkwpA1ox6SeBJyTCou6rTiZJY.png" alt="Authentication flow" className="w-full h-auto" />
            </div>

            <section className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <p className="text-sm leading-relaxed">
                  To make sense of what authentication could look like, we created a flow which prioritizes a simple experience first and provides an easy understanding for developers to implement.
                </p>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/EmPgmBBRGsykXCeSaRCE9yVNBCI.png" alt="Social onboarding flow" className="w-full h-auto" />
            </div>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/7lliOgLyovS7EOa9ileKFDEUE.png" alt="Wallet onboarding flow" className="w-full h-auto" />
            </div>

            <section className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <p className="text-sm leading-relaxed">
                  As shown above, a major denominator for users onboarding is the email. Email address is the unique identifier for each user on the platform. Given the limitations of using social account authentication, we had to conduct a background check to ensure no two social accounts or connected wallets are registered with the same email.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <h2 id="event-creation" className="text-xl mb-4">Simplifying event creation flow</h2>
                <p className="text-sm leading-relaxed">
                  In an effort to mitigate the cognitive load of filling out all the forms at once, we broke the flow for event creation into 4 stages, with the first stage solid enough to immediately start getting RSVPs.
                </p>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/g7tEcYYGuCtxXXdNMQtJ9DlumaU.png" alt="Event creation stages" className="w-full h-auto" />
            </div>

            <section className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <h2 id="lost-tickets" className="text-xl mb-4">Lost tickets</h2>
                <p className="text-sm leading-relaxed mb-4">
                  It is important to get user&apos;s emails to ensure ticket(s) bought is not lost after purchase, even if they are not signed in.
                </p>
                <p className="text-sm leading-relaxed mb-4">
                  By requesting e-delivery details (name and email) we are able to iterate a system that ensures tickets are safely delivered on every purchase.
                </p>
                <p className="text-sm leading-relaxed">
                  Now, since details of tickets purchased are tied to emails instead of actual user accounts, we make it possible for users to see all ticket purchase history whenever they sign up with the same email on Witan.
                </p>
              </div>
            </section>

            <section className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <h2 id="coincidental-booking" className="text-xl mb-4">The problem of coincidental booking</h2>
                <p className="text-sm leading-relaxed mb-4">
                  Coincidental booking is what we called a situation where two or more users are trying to purchase a limited ticket at the same time. It was one of those crucial points our early research helped uncover which may otherwise have been overlooked by the team.
                </p>
                <p className="text-sm leading-relaxed mb-4">This gave rise to many questions:</p>
                <ol className="text-sm leading-relaxed space-y-2 list-decimal list-outside pl-5 mb-6">
                  <li>How often is this likely to occur?</li>
                  <li>At what point of the purchase is a ticket considered taken (or purchased)?</li>
                  <li>What solutions can we introduce that align with development time without breaking the flow?</li>
                </ol>
                <blockquote className="text-sm italic font-normal text-zinc-700 border-l-2 border-zinc-200 pl-5">
                  Working closely with the developers, we came up with a reservation idea right at the point where e-delivery details are collected and before making the final payment.
                </blockquote>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/Xkd9aycEcRJOb5tZm5E90wmhXw.png" alt="Coincidental booking solution" className="w-full h-auto" />
            </div>

            {/* Visual Design */}
            <section id="visuals" className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Visual Design</p>
                <h2 id="onboarding" className="text-xl mb-4">Onboarding</h2>
                <p className="text-sm leading-relaxed">
                  With Witan, signing up involved communicating concepts and actions with clear copies especially for users who aren&apos;t crypto savvy. During onboarding, I ensured a key focus on providing cues like connected wallet logo and less input fields so users don&apos;t drop off from filling a lengthy form.
                </p>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/n9x5nzTV4m3LBZRpuGCDXrk4Ec.png" alt="Onboarding auth screens" className="w-full h-auto" />
            </div>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/xB5S439cdibiF4pjwHAEl97T7E.png" alt="Mobile onboarding screens" className="w-full h-auto" />
            </div>

            <section className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <h2 id="event-page" className="text-xl mb-4">Event page</h2>
                <p className="text-sm leading-relaxed">
                  The event page features a double column layout. The left side captures features of the event including location, dates, organizer details, and provides enough real estate for details about the event. Positioning the tickets on the right column ensures it&apos;s seen at first glance and is not lost in other details of the event. The ticket container features a 3-level row which captures a max of 2 tickets (ordered by purchase rate and randomization) and a CTA which triggers a side drawer containing all the tickets.
                </p>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/qxPRl7iT9Y9jix0p6pop3TarhlA.png" alt="Event page design" className="w-full h-auto" />
            </div>

            <section className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <h2 id="publishing" className="text-xl mb-4">Publishing made easy</h2>
                <p className="text-sm leading-relaxed mb-4">
                  The design direction for publishing event focuses on helping organizers get the event out as quickly as possible even before creating tickets. By introducing RSVP, they can collect email interests and send reminders when the ticket sales go live.
                </p>
                <p className="text-sm leading-relaxed">
                  In addition, organizers can also schedule a time and date when they would like their event to be automatically published.
                </p>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/z2FfmvWofQQt8KO1bBM76nki30.png" alt="Event publishing flow" className="w-full h-auto" />
            </div>

            <section className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <h2 id="accepting-payments" className="text-xl mb-4">Accepting payments</h2>
                <p className="text-sm leading-relaxed mb-4">
                  Incorporating blockchain provides a good opportunity to offer crypto payment options on ticket purchase, which was also a common request from organizers.
                </p>
                <p className="text-sm leading-relaxed mb-4">
                  The challenge with accepting multiple payment options is that all the paid tickets for that event must be set with the same currencies. With the right implementation, users can easily add multiple tickets for purchase since they all have the same payment (currency) denominator.
                </p>
                <p className="text-sm leading-relaxed">
                  With this insight, we designed the experience to &ldquo;Set acceptance&rdquo; and automatically apply the selected options so that organizers can sufficiently define the price when creating tickets.
                </p>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/beJonStG49VAjwXjXcGVgcvRs.png" alt="Payment settings design" className="w-full h-auto" />
            </div>

            <section className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <h2 id="discount-codes" className="text-xl mb-4">Creating discount codes</h2>
                <p className="text-sm leading-relaxed mb-4">
                  A major painpoint discovered through our research is around discount codes leading to thefts and code reuse, which automatically translates to lost money for organizers.
                </p>
                <p className="text-sm leading-relaxed mb-4">
                  Building the discount code section required incorporating different measures for organizers to control how each code is used.
                </p>
                <p className="text-sm leading-relaxed">
                  Working with the engineers, I advised a rule to ensure discount codes are case sensitive to avoid same code reuse.
                </p>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/ivMAq0LDzRZkst5cwNqfz1MmfI.png" alt="Discount codes design" className="w-full h-auto" />
            </div>

            <section className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <h2 id="admitting-attendees" className="text-xl mb-4">D-Day — Admitting Attendees</h2>
                <p className="text-sm leading-relaxed mb-4">
                  Each ticket purchased comes with a QR code appended to the email receipt of each attendee.
                </p>
                <p className="text-sm leading-relaxed mb-4">
                  I designed the admit page to focus on one single task which is to allow organizers to quickly scan this QR code and admit attendees on the event day. I collaborated with the engineers to design a mobile responsive scan interface that can take advantage of the mobile camera for the scanning operation. The data of registration and purchases are available on the event dashboard and for each ticket scanned, the information of the attendee is displayed.
                </p>
                <p className="text-sm leading-relaxed">
                  I also provided an easy search option by ticket code or attendee name as an alternative to QR scan.
                </p>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/OdjeoYA5j5maXwN4H2ucjcY5W8M.png" alt="Admit attendees interface" className="w-full h-auto" />
            </div>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/7kqXBpBKVc9aXAyguMGcizt4GI.png" alt="Attendee management dashboard" className="w-full h-auto" />
            </div>

            <section className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <h2 id="one-more-thing" className="text-xl mb-4">One more thing&hellip;</h2>
                <p className="text-sm leading-relaxed mb-4">
                  For the product test launch, I created a landing page that primarily communicates what Witan is about and also integrates some fun little bits of interactions.
                </p>
                <p className="text-sm leading-relaxed">
                  I took the step of animating the icons in Rive. Chose Rive because I could use the state machine to define how the icons animate when users interact with them.
                </p>
              </div>
            </section>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/YwtwOHm0AzKgOAOJTFEwnHj0PiE.png" alt="Rive icon animations" className="w-full h-auto" />
            </div>

            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://framerusercontent.com/images/89ogksPri5xp6V4GwF7OfV7V3ZI.png" alt="Witan landing page" className="w-full h-auto" />
            </div>

            {/* Testing */}
            <section id="testing" className="mb-16">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Testing</p>
                <h2 className="text-xl mb-4">Witan currently?</h2>
                <p className="text-sm leading-relaxed mb-4">
                  Witan&apos;s major front-facing and purchase ticket flow has been fully developed and is being tested.
                </p>
                <p className="text-sm leading-relaxed mb-4">
                  There has been generally positive feedback on key aspects of the app from testing with prototypes and beta testing the purchase and account creation flow. Users loved that they can easily make crypto payments on tickets and being able to transfer purchased tickets to someone else left a good impression and was warmly approved.
                </p>
                <p className="text-sm leading-relaxed">
                  Next steps is to review feedback from testing for implementation and collaborate with the engineers for the full development of the organizers dashboard.
                </p>
              </div>
            </section>

            {/* Learnings */}
            <section id="learnings">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-10">
                <p className="text-sm uppercase tracking-widest text-orange-500 mb-3 font-medium">Learnings</p>
                <h2 className="text-xl mb-4">The journey continues</h2>
                <p className="text-sm leading-relaxed mb-4">
                  Working on Witan unlocked many things in me as a designer and helped me to be more aware of things I did differently and the ones to improve on if I were to work on this project again.
                </p>
                <p className="text-sm leading-relaxed mb-4">
                  A big learning curve is understanding the emphasis of the iterative nature of intentional design aimed at truly solving a problem. As a team, although we had previous experience blending web3 and web2 from building Blocasset, working on Witan presented a new set of problems which we both prepared for and also discovered along the way.
                </p>
                <p className="text-sm leading-relaxed mb-4">
                  Working on this project with the same team also presented an opportunity to fix past mistakes around design-dev collaboration and explored new ways which ensured everyone is constantly in sync regarding changes and new additions.
                </p>
                <p className="text-sm leading-relaxed">
                  Reflecting on this, I would have suggested we had more time to test out some concepts which, though unconventional, could positively impact how users experience the product and quietly differentiate us in a market where many competitors exist.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
