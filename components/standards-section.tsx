"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FigmaCanvas } from "@/components/figma-canvas";
import { TextSequence, SeqChars } from "@/components/text-sequence";

const textGradient = {
  display: "inline-block",
  backgroundImage:
    "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
  backgroundSize: "200% 200%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  padding: "0.3em 0.2em",
  margin: "-0.3em -0.2em",
} as const;

const TOP = 100;
const BOTTOM = 100;

const EXPAND_ALLOWANCE = 160;

const standards = [
  {
    number: "01",
    title: "Set The Bar High",
    answer:
      "We hold every part of the experience — from the evaluation to customer support — to a higher standard than typical telehealth platforms.",
  },
  {
    number: "02",
    title: "State-Licensed Doctors",
    answer:
      "Every evaluation is conducted by a physician licensed in your state, so your recommendation is fully compliant and recognized.",
  },
  {
    number: "03",
    title: "HIPAA Compliant",
    answer:
      "Your medical information is handled under strict HIPAA-compliant security practices, kept private and confidential at every step.",
  },
  {
    number: "04",
    title: "Same-Day Evaluation",
    answer:
      "Most patients complete their evaluation and receive a decision the same day they apply, with no unnecessary waiting.",
  },
  {
    number: "05",
    title: "Affordable Pricing",
    answer:
      "Transparent, flat-rate pricing with no hidden fees — you know exactly what you're paying before you start.",
  },
  {
    number: "06",
    title: "Money-Back Guarantee",
    answer:
      "If you're not approved, you don't pay full price — we stand behind every evaluation with a money-back guarantee.",
  },
  {
    number: "07",
    title: "24/7 Customer Support",
    answer:
      "Our support team is available around the clock to help with scheduling, account questions, or anything else you need.",
  },
  {
    number: "08",
    title: "Ongoing Support",
    answer:
      "We stay with you beyond the first visit — renewals, follow-ups, and guidance are always just a message away.",
  },
];

function StandardRow({
  standard,
  open,
  onToggle,
  showDivider,
}: {
  standard: (typeof standards)[number];
  open: boolean;
  onToggle: () => void;
  showDivider: boolean;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-6 py-6 text-left"
      >
        <span
          className="shrink-0 opacity-50"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: 80,
            fontWeight: 700,
            lineHeight: "100px",
            letterSpacing: "-1.6px",
            ...textGradient,
          }}
        >
          {standard.number}
        </span>
        <span
          className="flex-1 text-primary"
          style={{ fontFamily: "var(--font-sans)", fontSize: 24, fontWeight: 600, letterSpacing: "-0.48px" }}
        >
          {standard.title}
        </span>
        <span
          className="ml-auto flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300"
          style={{ background: "var(--gradient-primary)", transform: open ? "rotate(135deg)" : "rotate(0deg)" }}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pl-[104px] pr-16 text-lg leading-relaxed text-muted-foreground">
            {standard.answer}
          </p>
        </div>
      </div>

      {showDivider && <div className="h-0.5 rounded-full bg-[#DFF8EC]" />}
    </div>
  );
}

function StandardsDesktop() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const restPct = ((TOP + 803 + BOTTOM) / 1440) * 100;
  const expandedPct = ((TOP + 803 + BOTTOM + EXPAND_ALLOWANCE) / 1440) * 100;

  return (
    <section
      className="relative hidden bg-white transition-[padding-bottom] duration-300 ease-out lg:block"
      style={{ height: 0, paddingBottom: `${openItem ? expandedPct : restPct}%` }}
    >
      <FigmaCanvas
        width={1440}
        height={TOP + 803 + BOTTOM + EXPAND_ALLOWANCE}
        className="absolute inset-0 mx-auto"
      >
        <div
          className="pointer-events-none absolute"
          style={{ left: 113, top: TOP + 82, width: 150, height: 106 }}
        >
          <Image src="/faq-section-top.webp" alt="" fill className="object-contain" sizes="150px" />
        </div>
        <div
          className="pointer-events-none absolute -scale-x-100"
          style={{ left: 1177, top: TOP + 82, width: 150, height: 106 }}
        >
          <Image src="/faq-section-top.webp" alt="" fill className="object-contain" sizes="150px" />
        </div>

        <TextSequence
          className="absolute"
          style={{ left: 289, top: TOP + 57, width: 862 }}
        >
          <h2
            className="whitespace-nowrap text-center text-primary"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: 88,
              lineHeight: "110px",
              letterSpacing: "-1.76px",
            }}
          >
            <SeqChars>Our</SeqChars>{" "}
            <SeqChars style={{ fontSize: 96, letterSpacing: "-1.92px" }}>STANDARDS</SeqChars>
          </h2>
        </TextSequence>

        <div className="absolute" style={{ left: 80, top: TOP + 255, width: 1280 }}>
          {[0, 1].map((col) => (
            <div key={col} className="absolute top-0" style={{ left: col * 660, width: 560 }}>
              {standards.slice(col * 4, col * 4 + 4).map((standard, i) => (
                <StandardRow
                  key={standard.number}
                  standard={standard}
                  open={openItem === standard.number}
                  onToggle={() => setOpenItem((cur) => (cur === standard.number ? null : standard.number))}
                  showDivider={i < 3}
                />
              ))}
            </div>
          ))}
        </div>
      </FigmaCanvas>
    </section>
  );
}

function StandardsMobile() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 lg:hidden">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-10">
        <div className="flex items-center gap-3">
          <Image src="/faq-section-top.webp" alt="" width={38} height={27} className="shrink-0" />
          <TextSequence>
            <h2
              className="text-center text-primary"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 7vw, 2.75rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              <SeqChars>Our</SeqChars>{" "}
              <SeqChars>STANDARDS</SeqChars>
            </h2>
          </TextSequence>
          <Image src="/faq-section-top.webp" alt="" width={38} height={27} className="shrink-0 -scale-x-100" />
        </div>

        <div className="flex w-full flex-col">
          {standards.map((standard, i) => {
            const open = openItem === standard.number;
            return (
              <div key={standard.number}>
                <button
                  type="button"
                  onClick={() => setOpenItem((cur) => (cur === standard.number ? null : standard.number))}
                  aria-expanded={open}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span
                    className="shrink-0 opacity-50"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontSize: "clamp(2.5rem, 10vw, 3.5rem)",
                      fontWeight: 700,
                      ...textGradient,
                    }}
                  >
                    {standard.number}
                  </span>
                  <span className="flex-1 text-lg font-semibold text-primary">{standard.title}</span>
                  <span
                    className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300"
                    style={{ background: "var(--gradient-primary)", transform: open ? "rotate(135deg)" : "rotate(0deg)" }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-14 text-lg leading-relaxed text-muted-foreground">{standard.answer}</p>
                  </div>
                </div>

                {i < standards.length - 1 && <div className="h-0.5 rounded-full bg-[#DFF8EC]" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function StandardsSection() {
  return (
    <>
      <StandardsMobile />
      <StandardsDesktop />
    </>
  );
}
