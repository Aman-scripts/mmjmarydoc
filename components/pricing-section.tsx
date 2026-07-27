"use client";

import { useState } from "react";
import Image from "next/image";
import { FigmaCanvas } from "@/components/figma-canvas";
import { TextSequence, SeqChars, SeqFade, SeqLines } from "@/components/text-sequence";
import { RefreshCw, Check } from "lucide-react";

function NewEvaluationIcon({ className }: { className?: string }) {
  return <Image src="/newevaluation.svg" alt="" width={16} height={16} className={className} />;
}

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 71, 95:1342),
// each offset relative to this section's own top-left corner (4899, 5375).
// Figma places a 100px gap before and after this block, added as TOP/BOTTOM.
// The pricing card component set also has a "Variant2" (hover/expanded)
// state that reveals a checklist panel — reproduced here as a hover reveal.
const TOP = 100;
const BOTTOM = 100;
// Cards grow ~214px on hover (332px -> 546px). That growth is reserved in
// this section's own fixed height (via EXPAND_ALLOWANCE) and clipped to it
// (overflow: hidden), so the checklist expands entirely within the pricing
// section itself instead of spilling into — or shifting — whatever follows.
const EXPAND_ALLOWANCE = 220;

const plans = [
  {
    Icon: NewEvaluationIcon,
    badge: "New Evaluation",
    title: "New Card Evaluation",
    description: "Get Started with Your Medical Cannabis Evaluation.",
    price: "$149",
    cta: "Start Evaluation",
    left: 297,
    checklist: [
      "Initial online medical evaluation",
      "Consultation with a licensed healthcare provider",
      "Eligibility assessment",
      "Guidance throughout the application process",
      "Secure and confidential consultation",
    ],
  },
  {
    Icon: RefreshCw,
    badge: "Card Renewal",
    title: "Card Renewal",
    description: "Renew Your Medical Cannabis Card.",
    price: "$129",
    cta: "Renew My Card",
    left: 732,
    checklist: [
      "Online renewal consultation",
      "Review by a licensed healthcare provider",
      "Fast and convenient renewal process",
      "Continued eligibility assessment",
      "Secure and confidential service",
    ],
  },
];

function PricingDesktop() {
  const [expanded, setExpanded] = useState(false);
  const restPct = ((TOP + 536 + BOTTOM) / 1440) * 100;
  const expandedPct = ((TOP + 536 + BOTTOM + EXPAND_ALLOWANCE) / 1440) * 100;

  return (
    <section
      className="relative hidden bg-background transition-[padding-bottom] duration-300 ease-out lg:block"
      style={{ height: 0, paddingBottom: `${expanded ? expandedPct : restPct}%` }}
    >
      <FigmaCanvas
        width={1440}
        height={TOP + 536 + BOTTOM + EXPAND_ALLOWANCE}
        className="absolute inset-0 mx-auto"
      >
        <TextSequence className="absolute left-0 top-0 w-full" style={{ height: TOP + 180 }}>
          <SeqFade
            className="absolute flex items-center justify-center rounded-full bg-[#DFF8EC] text-xs font-normal leading-[18px] tracking-[-0.24px] text-primary"
            style={{ left: 685, top: TOP + 0, width: 70, height: 22 }}
          >
            Pricing
          </SeqFade>

          <h2
            className="absolute text-center text-primary"
            style={{
              left: 0,
              top: TOP + 38,
              width: 1439,
              fontFamily: "var(--font-sans)",
              fontSize: 48,
              fontWeight: 700,
              lineHeight: "58px",
              letterSpacing: "-0.96px",
            }}
          >
            <SeqChars>Get Started in Just a</SeqChars>{" "}
            <SeqChars containerClassName="text-accent">Few Clicks</SeqChars>
          </h2>

          <SeqLines
            className="absolute text-center text-muted-foreground"
            style={{
              left: 411,
              top: TOP + 112,
              width: 618,
              fontSize: 18,
              fontWeight: 400,
              lineHeight: "28px",
              letterSpacing: "-0.32px",
            }}
            lines={[
              "Select your evaluation type and connect with a licensed provider to begin your medical cannabis journey online.",
            ]}
          />
        </TextSequence>

        {plans.map((plan) => (
          <div
            key={plan.title}
            className="group absolute z-0 rounded-[30px] bg-[#DFF8EC] px-11 py-8 shadow-sm transition-shadow duration-300 hover:z-10 hover:shadow-xl"
            style={{ left: plan.left, top: TOP + 204, width: 411 }}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-14 items-center justify-center rounded-full border border-primary/30 bg-transparent">
                <plan.Icon className="h-4 w-4 text-primary" />
              </div>
              <span
                className="flex items-center justify-center rounded-full px-4 py-0.5 text-xs font-normal leading-[18px] tracking-[-0.24px] text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                {plan.badge}
              </span>
            </div>

            <div className="mt-7 flex flex-col gap-1">
              <h3
                className="text-accent"
                style={{ fontFamily: "var(--font-sans)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.4px" }}
              >
                {plan.title}
              </h3>
              <p className="text-lg font-medium text-muted-foreground" style={{ letterSpacing: "-0.28px" }}>
                {plan.description}
              </p>
            </div>

            <p
              className="mt-[26px] text-primary"
              style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 48, fontWeight: 700, letterSpacing: "-0.96px" }}
            >
              {plan.price}
            </p>

            <a
              href="#start-evaluation"
              className="mt-6 flex w-fit items-center justify-center rounded-full px-9 py-2 text-base font-semibold leading-[26px] tracking-[-0.32px] text-white transition-opacity duration-200 group-hover:pointer-events-none group-hover:absolute group-hover:opacity-0"
              style={{ background: "var(--gradient-primary)" }}
            >
              {plan.cta}
            </a>

            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="mt-6 flex flex-col gap-3 rounded-[24px] bg-white p-6">
                  {plan.checklist.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DFF8EC]">
                        <Check className="h-3 w-3 text-primary" />
                      </span>
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                  <a
                    href="#start-evaluation"
                    className="mt-2 flex w-fit items-center justify-center rounded-full px-9 py-2 text-base font-semibold leading-[26px] tracking-[-0.32px] text-white"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </FigmaCanvas>
    </section>
  );
}

function PricingCard({ plan }: { plan: (typeof plans)[number] }) {
  return (
    <div className="flex h-full flex-col rounded-[24px] bg-[#DFF8EC] p-5 text-left shadow-sm sm:rounded-[30px] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-9 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-transparent sm:w-14">
          <plan.Icon className="h-4 w-4 text-primary" />
        </div>
        <span
          className="rounded-full px-3 py-0.5 text-[11px] font-normal text-white sm:px-4 sm:text-xs"
          style={{ background: "var(--gradient-primary)" }}
        >
          {plan.badge}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-accent sm:text-xl">{plan.title}</h3>
        <p className="text-sm font-medium text-muted-foreground sm:text-base">{plan.description}</p>
      </div>

      <p
        className="mt-4 text-primary"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "clamp(2rem, 8vw, 2.5rem)",
          fontWeight: 700,
        }}
      >
        {plan.price}
      </p>

      <div className="mt-4 flex flex-1 flex-col gap-2.5 rounded-[20px] bg-white p-4 sm:mt-5 sm:gap-3 sm:rounded-[24px] sm:p-5">
        {plan.checklist.map((item) => (
          <div key={item} className="flex items-start gap-2.5 sm:items-center sm:gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DFF8EC] sm:mt-0 sm:h-6 sm:w-6">
              <Check className="h-3 w-3 text-primary" />
            </span>
            <span className="text-left text-[11px] leading-snug text-muted-foreground sm:text-xs">
              {item}
            </span>
          </div>
        ))}
        <a
          href="#start-evaluation"
          className="mt-2 flex w-full items-center justify-center rounded-full py-2.5 text-sm font-semibold text-white sm:py-3 sm:text-base"
          style={{ background: "var(--gradient-primary)" }}
        >
          {plan.cta}
        </a>
      </div>
    </div>
  );
}

function PricingMobile() {
  return (
    <section className="relative bg-background px-5 py-14 sm:px-8 sm:py-16 lg:hidden">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 text-center">
        <TextSequence className="flex flex-col items-center gap-4">
          <SeqFade className="rounded-full bg-[#DFF8EC] px-4 py-0.5 text-xs font-normal text-primary">
            Pricing
          </SeqFade>
          <h2
            className="text-primary"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            <SeqChars>Get Started in Just a</SeqChars>{" "}
            <SeqChars containerClassName="text-accent">Few Clicks</SeqChars>
          </h2>
          <SeqLines
            className="text-base text-muted-foreground sm:text-lg"
            lines={[
              "Select your evaluation type and connect with a licensed provider to begin your medical cannabis journey online.",
            ]}
          />
        </TextSequence>

        <div className="mt-6 flex w-full flex-col gap-6">
          {plans.map((plan) => (
            <PricingCard key={plan.title} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <>
      <PricingMobile />
      <PricingDesktop />
    </>
  );
}
