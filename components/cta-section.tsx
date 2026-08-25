"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RevealOnView } from "@/components/reveal-on-view";
import { TextSequence, SeqChars, SeqLines } from "@/components/text-sequence";

const GRADIENT =
  "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)";
const BUTTON_GRADIENT = "linear-gradient(135deg, #3E8D69 0%, #24553F 100%)";

function CtaButton() {
  return (
    <a
      href="#pricing"
      className="group mt-1 inline-flex max-w-full flex-wrap items-center gap-2 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] sm:gap-2.5"
    >
      <span
        className="rounded-full px-5 py-2.5 text-sm font-semibold tracking-[-0.02em] text-white sm:px-7 sm:py-3 sm:text-base"
        style={{ background: BUTTON_GRADIENT }}
      >
        Start Your Evaluation
      </span>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white sm:h-12 sm:w-12"
        style={{ background: BUTTON_GRADIENT }}
      >
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}

// Desktop layout: exact percentage positions derived from the Figma card (node 622:2382,
// 1280x415) so the text/image proportions and the image's above-card bleed match 1:1 at
// any width — text/heading/paragraph/button box and image box are all % of the card.
function CtaDesktop() {
  return (
    <div
      className="relative isolate hidden overflow-visible rounded-[40px] xl:block"
      style={{ background: GRADIENT, aspectRatio: "1280 / 415" }}
    >
      <div
        className="absolute z-10 flex flex-col items-start gap-4"
        style={{ left: "6.33%", top: "15.42%", width: "32.73%" }}
      >
        <TextSequence className="flex w-full flex-col items-start gap-4">
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 2.55vw, 2.5rem)",
              lineHeight: 1.24,
              letterSpacing: "-0.02em",
              color: "#FFFBF5",
            }}
          >
            <SeqChars>Access Your Medical</SeqChars>
            <br />
            <SeqChars>Card Today</SeqChars>
          </h2>

          <SeqLines
            className="w-full"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.875rem, 0.9vw, 1rem)",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              color: "#FFFBF5",
              opacity: 0.9,
            }}
            lines={[
              "Get personalized online care from a licensed provider and take the next step toward your medical card, all from the comfort of home.",
            ]}
          />
        </TextSequence>

        <CtaButton />
      </div>

      <RevealOnView
        delay={200}
        className="absolute z-10"
        style={{ left: "37.62%", top: "-40.24%", width: "60.62%", height: "140.24%" }}
      >
        <Image
          src="/cta-new-section.png"
          alt="Doctor holding a phone with the MaryDoc medical marijuana card"
          fill
          className="select-none object-contain object-bottom"
          sizes="60vw"
        />
      </RevealOnView>
    </div>
  );
}

function CtaMobile() {
  return (
    <div
      className="relative isolate flex flex-col items-center overflow-hidden rounded-[24px] px-5 py-9 sm:rounded-[32px] sm:px-8 sm:py-11 md:rounded-[36px] md:px-10 md:py-12 lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:rounded-[40px] lg:px-12 lg:py-12 xl:hidden"
      style={{ background: GRADIENT }}
    >
      <div className="relative z-10 flex w-full max-w-xl shrink-0 flex-col items-start gap-4 sm:gap-5 md:gap-6 lg:w-[42%] lg:max-w-none">
        <TextSequence className="flex w-full flex-col items-start gap-3 sm:gap-4 md:gap-5">
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3.4vw, 2.25rem)",
              lineHeight: 1.24,
              letterSpacing: "-0.02em",
              color: "#FFFBF5",
            }}
          >
            <SeqChars>Access Your Medical</SeqChars>
            <br />
            <SeqChars>Card Today</SeqChars>
          </p>

          <SeqLines
            className="w-full max-w-md"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.9375rem, 1.4vw, 1.0625rem)",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              color: "#FFFBF5",
              opacity: 0.9,
            }}
            lines={[
              "Get personalized online care from a licensed provider and take the next step toward your medical card, all from the comfort of home.",
            ]}
          />
        </TextSequence>

        <CtaButton />
      </div>

      <RevealOnView
        delay={200}
        className="relative z-10 -mb-9 mt-6 w-full max-w-[320px] shrink-0 sm:max-w-[420px] md:-mb-12 lg:mt-0 lg:w-[52%] lg:max-w-none lg:self-end"
      >
        <Image
          src="/cta-new-section.png"
          alt="Doctor holding a phone with the MaryDoc medical marijuana card"
          width={780}
          height={585}
          className="h-auto w-full select-none object-contain"
        />
      </RevealOnView>
    </div>
  );
}

export function CtaSection() {
  return (
    <section className="relative w-full overflow-x-hidden bg-background px-4 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-16 md:px-8 md:pt-20 lg:px-16 lg:pb-20 lg:pt-32">
      <RevealOnView className="relative mx-auto w-full max-w-6xl">
        <CtaMobile />
        <CtaDesktop />
      </RevealOnView>
    </section>
  );
}
