import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RevealOnView } from "@/components/reveal-on-view";
import ScrollFloat from "@/components/ScrollFloat";

export function CtaSection() {
  return (
    <section className="relative bg-background px-5 pb-10 pt-16 sm:px-8 sm:pb-12 sm:pt-20 lg:px-16 lg:pb-14">
      <RevealOnView className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[40px]">
        <div
          className="relative overflow-hidden rounded-[28px] px-6 py-10 sm:rounded-[36px] sm:px-10 sm:py-12 lg:rounded-[40px] lg:px-14 lg:py-14"
          style={{
            background:
              "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
          }}
        >
          <Image
            src="/cta-section-top-left.svg"
            alt=""
            width={320}
            height={78}
            className="pointer-events-none absolute -left-2 -top-1 h-auto w-[180px] opacity-90 sm:w-[240px] lg:w-[280px]"
            aria-hidden
          />
          <Image
            src="/cta-section-bottom-right.svg"
            alt=""
            width={267}
            height={291}
            className="pointer-events-none absolute -bottom-16 -right-10 h-auto w-[200px] opacity-90 sm:-bottom-20 sm:-right-8 sm:w-[240px] lg:-bottom-24 lg:-right-6 lg:w-[280px]"
            aria-hidden
          />

          <div className="relative z-10 flex max-w-xl flex-col items-start gap-5 sm:gap-6">
            <h2
              className="text-white"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              <ScrollFloat as="span">Ready when you are</ScrollFloat>
            </h2>

            <p
              className="max-w-md italic text-white/90"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                lineHeight: 1.6,
                letterSpacing: "-0.01em",
              }}
            >
              Your first conversation with a provider is free, with no pressure and no
              obligation to start treatment.
            </p>

            <a
              href="#pricing"
              className="group mt-1 inline-flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="rounded-full bg-[#DFF8EC] px-6 py-3 text-sm font-semibold tracking-[-0.02em] text-primary sm:px-7 sm:text-base">
                Start your Consultation
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DFF8EC] text-primary sm:h-12 sm:w-12">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>
        </div>
      </RevealOnView>
    </section>
  );
}
