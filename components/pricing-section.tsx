import { FigmaCanvas } from "@/components/figma-canvas";
import { FilePlus, RefreshCw, Check } from "lucide-react";

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 71, 95:1342),
// each offset relative to this section's own top-left corner (4899, 5375).
// Figma places a 100px gap before and after this block, added as TOP/BOTTOM.
// The pricing card component set also has a "Variant2" (hover/expanded)
// state that reveals a checklist panel — reproduced here as a hover reveal.
const TOP = 100;
const BOTTOM = 100;
// Cards grow ~214px on hover (332px -> 546px). BOTTOM alone only covers 100px
// of that, so the remainder (~114px) is added here to avoid overlapping the
// section that follows, without padding out the layout more than necessary.
const EXPAND_ALLOWANCE = 120;

const plans = [
  {
    Icon: FilePlus,
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
  return (
    <section className="relative z-30 hidden bg-background lg:block">
      <FigmaCanvas
        width={1440}
        height={TOP + 536 + BOTTOM + EXPAND_ALLOWANCE}
        className="mx-auto"
        style={{ overflow: "visible" }}
      >
        <span
          className="absolute flex items-center justify-center rounded-full bg-[#DFF8EC] text-xs font-normal leading-[18px] tracking-[-0.24px] text-primary"
          style={{ left: 685, top: TOP + 0, width: 70, height: 22 }}
        >
          Pricing
        </span>

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
          Get Started in Just a <span className="text-accent">Few Clicks</span>
        </h2>

        <p
          className="absolute text-center text-muted-foreground"
          style={{
            left: 411,
            top: TOP + 112,
            width: 618,
            fontSize: 16,
            fontWeight: 400,
            lineHeight: "26px",
            letterSpacing: "-0.32px",
          }}
        >
          Select your evaluation type and connect with a licensed provider to
          begin your medical cannabis journey online.
        </p>

        {plans.map((plan) => (
          <div
            key={plan.title}
            className="group absolute z-0 rounded-[30px] bg-[#DFF8EC] px-11 py-8 shadow-sm transition-shadow duration-300 hover:z-10 hover:shadow-xl"
            style={{ left: plan.left, top: TOP + 204, width: 411 }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white shadow-sm">
                <plan.Icon className="h-6 w-6 text-primary" />
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
              <p className="text-sm font-medium text-muted-foreground" style={{ letterSpacing: "-0.28px" }}>
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

function PricingMobile() {
  return (
    <section className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 lg:hidden">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <span className="rounded-full bg-[#DFF8EC] px-4 py-0.5 text-xs font-normal text-primary">
          Pricing
        </span>
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
          Get Started in Just a <span className="text-accent">Few Clicks</span>
        </h2>
        <p className="text-base text-muted-foreground">
          Select your evaluation type and connect with a licensed provider to
          begin your medical cannabis journey online.
        </p>

        <div className="mt-6 flex w-full flex-col gap-6">
          {plans.map((plan) => (
            <div key={plan.title} className="flex flex-col items-center gap-6 rounded-[30px] bg-[#DFF8EC] px-8 py-8 text-center">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <plan.Icon className="h-6 w-6 text-primary" />
                </div>
                <span
                  className="rounded-full px-4 py-0.5 text-xs font-normal text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {plan.badge}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-accent">{plan.title}</h3>
                <p className="text-sm font-medium text-muted-foreground">{plan.description}</p>
              </div>

              <p
                className="text-primary"
                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 40, fontWeight: 700 }}
              >
                {plan.price}
              </p>

              <a
                href="#start-evaluation"
                className="rounded-full px-9 py-3 text-base font-semibold text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                {plan.cta}
              </a>
            </div>
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
