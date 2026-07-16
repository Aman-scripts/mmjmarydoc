"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { FigmaCanvas } from "@/components/figma-canvas";
import { RevealOnView } from "@/components/reveal-on-view";

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 68, 101:249),
// each offset relative to this section's own top-left corner (4899, 6914).
// Figma places a 100px gap before and after this block; the preceding
// section (Standards) already accounts for the gap on its own BOTTOM, so
// only the trailing gap is added here to avoid double-counting it.
const TOP = 0;
const BOTTOM = 100;

// Only the first review's copy is confirmed from Figma (it was repeated
// across all three fanned cards in the source file); the rest here are
// placeholder testimonials added so the forward/back carousel has real
// content to cycle through — swap in real reviews when available.
const reviews = [
  {
    text: "I went to site chose document format, scheduled appt., and received consultation call within 2-3 minutes. Spent 5 min. on the interview, and had recommendation within minutes!",
    name: "Juan R Delgado II",
    time: "12 months ago",
  },
  {
    text: "The whole process was so much easier than I expected. Booked my appointment, talked to a doctor the same day, and had my recommendation in my inbox that afternoon.",
    name: "Maria Chen",
    time: "8 months ago",
  },
  {
    text: "Friendly, professional, and fast. No judgment, no awkward waiting rooms — just a real conversation with a licensed doctor who took my condition seriously.",
    name: "David Okafor",
    time: "3 months ago",
  },
];

// The two side cards are almost entirely covered by the front card in the
// real design — only a sliver of their rounded edge peeks out — so they're
// rendered as plain solid panels rather than duplicating the full content.
// Their resting rotation (-6deg / 6deg) is baked into the emerge-peek-left/
// right keyframes' end state, applied via the wrapping RevealOnView.
function PeekCard({ style }: { style: CSSProperties }) {
  return <div className="absolute rounded-[30px] bg-primary shadow-lg" style={style} />;
}

function FrontCard({
  style,
  review,
  animationKey,
  direction,
}: {
  style: CSSProperties;
  review: (typeof reviews)[number];
  animationKey: number;
  direction: "left" | "right";
}) {
  return (
    <div
      key={animationKey}
      className="absolute overflow-hidden rounded-[30px] bg-[#DFF8EC] shadow-xl"
      style={{
        ...style,
        animation: `review-in-from-${direction} 0.35s ease-out`,
      }}
    >
      <Quote
        className="absolute text-white"
        style={{ left: 188, top: 0, width: 139, height: 139 }}
        fill="currentColor"
        strokeWidth={0}
      />

      <Image
        src="/google.svg"
        alt="Google"
        width={52}
        height={52}
        className="absolute"
        style={{ left: 40, top: 72 }}
      />

      <p
        className="absolute text-muted-foreground"
        style={{
          left: 40,
          top: 148,
          width: 295,
          fontSize: 18,
          fontWeight: 400,
          lineHeight: "28px",
          letterSpacing: "-0.36px",
        }}
      >
        {review.text}
      </p>

      <a
        href="#read-more"
        className="absolute flex items-center justify-center rounded-full border border-primary text-base font-semibold leading-[26px] tracking-[-0.32px] text-primary"
        style={{ left: 40, top: 332, width: 151, height: 42 }}
      >
        Read More
      </a>

      <div className="absolute bg-border" style={{ left: 40, top: 398, width: 295, height: 1 }} />

      <div className="absolute flex items-center gap-3" style={{ left: 40, top: 422, width: 295, height: 52 }}>
        <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">
          <Image src="/review-section-image1.svg" alt={review.name} width={52} height={52} />
        </div>
        <div>
          <p className="text-lg text-foreground">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.time}</p>
        </div>
      </div>
    </div>
  );
}

function useReviewCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [tick, setTick] = useState(0);

  function next() {
    setDirection("right");
    setIndex((i) => (i + 1) % reviews.length);
    setTick((t) => t + 1);
  }

  function prev() {
    setDirection("left");
    setIndex((i) => (i - 1 + reviews.length) % reviews.length);
    setTick((t) => t + 1);
  }

  return { review: reviews[index], direction, tick, next, prev };
}

function ReviewsDesktop() {
  const { review, direction, tick, next, prev } = useReviewCarousel();

  return (
    <section className="relative hidden bg-background lg:block">
      <FigmaCanvas width={1440} height={TOP + 755 + BOTTOM} className="mx-auto" style={{ overflow: "visible" }}>
        <span
          className="absolute flex items-center justify-center rounded-full bg-[#DFF8EC] text-xs font-normal leading-[18px] tracking-[-0.24px] text-primary"
          style={{ left: 681, top: TOP + 0, width: 78, height: 22 }}
        >
          Reviews
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
          Hear From <span className="text-accent">Our Patients</span>
        </h2>

        <p
          className="absolute text-center text-muted-foreground"
          style={{ left: 0, top: TOP + 112, width: 1439, fontSize: 16, lineHeight: "26px", letterSpacing: "-0.32px" }}
        >
          Real experiences shared by patients who chose MaryDoc for compassionate, physician-led care
        </p>

        <div className="absolute" style={{ left: 354, top: TOP + 212, width: 732, height: 517 }}>
          <RevealOnView delay={500} animationName="emerge-peek-left">
            <PeekCard style={{ left: 124, top: -4, width: 420, height: 491 }} />
          </RevealOnView>
          <RevealOnView delay={500} animationName="emerge-peek-right">
            <PeekCard style={{ left: 187, top: -4, width: 420, height: 491 }} />
          </RevealOnView>
          <RevealOnView delay={0}>
            <FrontCard
              style={{ left: 182, top: -1, width: 375, height: 514 }}
              review={review}
              animationKey={tick}
              direction={direction}
            />
          </RevealOnView>

          <button
            aria-label="Previous review"
            onClick={prev}
            className="absolute flex h-[52px] w-[52px] items-center justify-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
            style={{ left: 0, top: 232, background: "var(--gradient-primary)" }}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next review"
            onClick={next}
            className="absolute flex h-[52px] w-[52px] items-center justify-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
            style={{ left: 680, top: 232, background: "var(--gradient-primary)" }}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </FigmaCanvas>
    </section>
  );
}

function ReviewsMobile() {
  const { review, direction, tick, next, prev } = useReviewCarousel();

  return (
    <section className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 lg:hidden">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <span className="rounded-full bg-[#DFF8EC] px-4 py-0.5 text-xs font-normal text-primary">
          Reviews
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
          Hear From <span className="text-accent">Our Patients</span>
        </h2>
        <p className="text-base text-muted-foreground">
          Real experiences shared by patients who chose MaryDoc for compassionate, physician-led care
        </p>

        <div className="mt-6 flex w-full flex-col gap-6">
          <div
            key={tick}
            className="relative flex flex-col overflow-hidden rounded-[30px] bg-[#DFF8EC] p-6 text-left shadow-md"
            style={{ animation: `review-in-from-${direction} 0.35s ease-out` }}
          >
            <Quote className="absolute right-4 top-0 h-16 w-16 text-white" fill="currentColor" strokeWidth={0} />
            <Image src="/google.svg" alt="Google" width={44} height={44} />
            <p className="mt-6 text-base text-muted-foreground">{review.text}</p>
            <a
              href="#read-more"
              className="mt-6 w-fit rounded-full border border-primary px-9 py-2 text-base font-semibold text-primary"
            >
              Read More
            </a>
            <div className="mt-6 h-px w-full bg-border" />
            <div className="mt-6 flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src="/review-section-image1.svg" alt={review.name} width={48} height={48} />
              </div>
              <div>
                <p className="text-base text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.time}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              aria-label="Previous review"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next review"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <>
      <ReviewsMobile />
      <ReviewsDesktop />
    </>
  );
}
