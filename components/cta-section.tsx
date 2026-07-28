"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RevealOnView } from "@/components/reveal-on-view";
import { TextSequence, SeqChars, SeqLines } from "@/components/text-sequence";

export function CtaSection() {
  return (
    <section className="relative w-full overflow-x-hidden bg-background px-4 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-16 md:px-8 md:pt-20 lg:px-16 lg:pb-14">
      <RevealOnView className="relative mx-auto w-full max-w-6xl">
        <div
          className="relative isolate overflow-hidden rounded-[24px] px-5 py-9 sm:rounded-[32px] sm:px-8 sm:py-11 md:rounded-[36px] md:px-10 md:py-12 lg:rounded-[40px] lg:px-14 lg:py-14"
          style={{
            background:
              "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
          }}
        >
          {}
          <Image
            src="/cta-section-top-left.svg"
            alt=""
            width={320}
            height={78}
            className="pointer-events-none absolute -left-4 -top-2 h-auto w-[120px] select-none opacity-80 sm:-left-2 sm:-top-1 sm:w-[180px] md:w-[220px] lg:w-[280px] lg:opacity-90"
            aria-hidden
          />
          <Image
            src="/cta-section-bottom-right.svg"
            alt=""
            width={267}
            height={291}
            className="pointer-events-none absolute -bottom-10 -right-8 h-auto w-[140px] select-none opacity-70 sm:-bottom-14 sm:-right-10 sm:w-[180px] sm:opacity-80 md:-bottom-16 md:w-[220px] lg:-bottom-20 lg:-right-6 lg:w-[280px] lg:opacity-90"
            aria-hidden
          />

          <div className="relative z-10 flex w-full max-w-xl flex-col items-start gap-4 sm:gap-5 md:gap-6">
            <TextSequence className="flex w-full flex-col items-start gap-3 sm:gap-4 md:gap-5">
              <h2
                className="text-white"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 5vw, 2.75rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                <SeqChars>Ready when you are</SeqChars>
              </h2>

              <SeqLines
                className="w-full max-w-md text-white/90"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.9375rem, 2.5vw, 1.125rem)",
                  lineHeight: 1.6,
                  letterSpacing: "-0.01em",
                }}
                lines={[
                  "Your first conversation with a provider is free, with no pressure and no obligation to start treatment.",
                ]}
              />
            </TextSequence>

            <a
              href="#pricing"
              className="group mt-1 inline-flex max-w-full flex-wrap items-center gap-2 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] sm:gap-2.5"
            >
              <span className="rounded-full bg-[#DFF8EC] px-5 py-2.5 text-sm font-semibold tracking-[-0.02em] text-primary sm:px-7 sm:py-3 sm:text-base">
                Start your Consultation
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DFF8EC] text-primary sm:h-12 sm:w-12">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>
        </div>
      </RevealOnView>
    </section>
  );
}
