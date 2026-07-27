"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FigmaCanvas } from "@/components/figma-canvas";
import { RevealOnView } from "@/components/reveal-on-view";
import { TextSequence, SeqChars, SeqFade, SeqLines } from "@/components/text-sequence";

const TOP = 100;
const BOTTOM = 40;

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

/** Original stacked Figma layout (default). */
const STACK = {
  left: { left: 124, top: -4, width: 420, height: 491 },
  center: { left: 182, top: -1, width: 375, height: 514 },
  right: { left: 187, top: -4, width: 420, height: 491 },
} as const;

const STAGE_STACK = { left: 354, width: 732 };

/** Opened horizontal row — centered between arrows. */
const ARROW_W = 52;
const ARROW_GAP = 28;
const SIDE_W = 300;
const CENTER_W = 340;
const CARD_GAP = 20;
const STAGE_ROW_W =
  ARROW_W + ARROW_GAP + SIDE_W + CARD_GAP + CENTER_W + CARD_GAP + SIDE_W + ARROW_GAP + ARROW_W;
const STAGE_ROW = { left: (1440 - STAGE_ROW_W) / 2, width: STAGE_ROW_W };
const ROW_X0 = ARROW_W + ARROW_GAP;

const ROW = {
  left: { left: ROW_X0, top: 28, width: SIDE_W, height: 460 },
  center: {
    left: ROW_X0 + SIDE_W + CARD_GAP,
    top: 0,
    width: CENTER_W,
    height: 514,
  },
  right: {
    left: ROW_X0 + SIDE_W + CARD_GAP + CENTER_W + CARD_GAP,
    top: 28,
    width: SIDE_W,
    height: 460,
  },
} as const;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function PeekFace() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[30px] bg-primary shadow-lg">
      <Image
        src="/quote.svg"
        alt=""
        width={120}
        height={119}
        className="absolute opacity-80"
        style={{ right: 24, top: 0 }}
      />
    </div>
  );
}

function ReviewFace({
  review,
  featured,
}: {
  review: (typeof reviews)[number];
  featured?: boolean;
}) {
  return (
    <div
      data-review-face
      className="absolute inset-0 flex flex-col overflow-hidden rounded-[30px] shadow-xl"
      style={{
        background: featured ? "#DFF8EC" : "#0E5A4D",
        transition:
          "background-color 0.7s cubic-bezier(0.22, 1, 0.36, 1), color 0.7s ease",
      }}
    >
      <Image
        src="/quote.svg"
        alt=""
        width={featured ? 140 : 110}
        height={featured ? 139 : 109}
        className="absolute opacity-90"
        style={{ right: featured ? 20 : 12, top: 0 }}
      />
      <Image
        src="/google.webp"
        alt="Google"
        width={featured ? 52 : 40}
        height={featured ? 52 : 40}
        className="relative z-10"
        style={{ marginLeft: featured ? 40 : 28, marginTop: featured ? 72 : 56 }}
      />
      <p
        className="relative z-10 line-clamp-6"
        style={{
          marginLeft: featured ? 40 : 28,
          marginRight: featured ? 40 : 28,
          marginTop: featured ? 24 : 18,
          fontSize: featured ? 18 : 14,
          lineHeight: featured ? "28px" : "22px",
          letterSpacing: "-0.32px",
          color: featured ? "var(--muted-foreground)" : "rgba(255,255,255,0.88)",
        }}
      >
        {review.text}
      </p>
      <a
        href="#read-more"
        className="relative z-10 mt-auto inline-flex w-fit items-center justify-center rounded-full border text-sm font-semibold"
        style={{
          marginLeft: featured ? 40 : 28,
          marginBottom: 8,
          padding: featured ? "8px 28px" : "6px 20px",
          borderColor: featured ? "var(--primary)" : "rgba(255,255,255,0.5)",
          color: featured ? "var(--primary)" : "#fff",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        Read More
      </a>
      <div
        className="relative z-10"
        style={{
          marginLeft: featured ? 40 : 28,
          marginRight: featured ? 40 : 28,
          height: 1,
          background: featured ? "var(--border)" : "rgba(255,255,255,0.2)",
        }}
      />
      <div
        className="relative z-10 flex items-center gap-3"
        style={{
          marginLeft: featured ? 40 : 28,
          marginRight: featured ? 40 : 28,
          marginTop: 16,
          marginBottom: featured ? 28 : 20,
        }}
      >
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/15">
          <Image src="/review-section-image1.svg" alt={review.name} width={48} height={48} />
        </div>
        <div className="min-w-0 text-left">
          <p
            className="truncate text-base font-medium"
            style={{ color: featured ? "var(--foreground)" : "#fff" }}
          >
            {review.name}
          </p>
          <p
            className="text-xs"
            style={{ color: featured ? "var(--muted-foreground)" : "rgba(255,255,255,0.7)" }}
          >
            {review.time}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Original front card markup for the stacked default. */
function FrontCard({
  style,
  review,
}: {
  style: CSSProperties;
  review: (typeof reviews)[number];
}) {
  return (
    <div className="absolute overflow-hidden rounded-[30px] bg-[#DFF8EC] shadow-xl" style={style}>
      <Image
        src="/quote.svg"
        alt=""
        width={140}
        height={139}
        className="absolute"
        style={{ left: 188, top: 0 }}
      />
      <Image
        src="/google.webp"
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

const SLOT_POSE = [ROW.left, ROW.center, ROW.right] as const;

function ReviewsDesktop() {
  const n = reviews.length;
  // order = [reviewIndex in 1st, reviewIndex in 2nd/center, reviewIndex in 3rd]
  const [order, setOrder] = useState([n - 1, 0, 1]);
  // Light/dark is owned by a card identity, not the center slot —
  // when cards rotate, the mint face moves with that card.
  const [featuredIdx, setFeaturedIdx] = useState(0);
  // expanded = full review faces; layoutMode = stack vs row positions
  const [expanded, setExpanded] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"stack" | "row">("stack");
  // Enable CSS transitions only after mount interactions (avoids load-time jump)
  const [motionOn, setMotionOn] = useState(false);
  // Card that wraps around the row (1st↔3rd) — must not slide across the center
  const [wrapIdx, setWrapIdx] = useState<number | null>(null);
  const [wrapHidden, setWrapHidden] = useState(false);
  const busyRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const openedOnViewRef = useRef(false);
  // Keep latest open fn for the intersection observer without re-subscribing
  const openHorizontalRef = useRef<() => void>(() => {});

  const centerIndex = order[1];
  const inRow = layoutMode === "row";
  const reduce = prefersReducedMotion();
  const moveMs = reduce ? 0 : 700;
  const moveTransition =
    motionOn && !reduce
      ? "left 0.7s cubic-bezier(0.22, 1, 0.36, 1), top 0.7s cubic-bezier(0.22, 1, 0.36, 1), width 0.7s cubic-bezier(0.22, 1, 0.36, 1), height 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease, z-index 0s"
      : undefined;

  function styleFor(slot: number) {
    if (inRow) {
      return { ...SLOT_POSE[slot], zIndex: slot === 1 ? 5 : 1 };
    }
    if (slot === 0) return { ...STACK.left, zIndex: 1 };
    if (slot === 2) return { ...STACK.right, zIndex: 1 };
    return { ...STACK.center, zIndex: 5 };
  }

  function openHorizontal() {
    if (busyRef.current || layoutMode === "row") return;
    busyRef.current = true;

    // 1) Show faces while still stacked — mint stays on the front card
    setExpanded(true);
    setFeaturedIdx(order[1]);
    // 2) Turn transitions on at the stack pose
    setMotionOn(true);

    // 3) Next frames: move to row — CSS transitions handle the fan-open (no GSAP jump)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLayoutMode("row");
        window.setTimeout(() => {
          busyRef.current = false;
        }, moveMs);
      });
    });
  }

  openHorizontalRef.current = openHorizontal;

  // Fan cards open once when the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let openTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || openedOnViewRef.current) return;
        openedOnViewRef.current = true;
        observer.disconnect();
        // Brief beat so stacked cards + text reveal land first, then fan open
        const delay = prefersReducedMotion() ? 0 : 480;
        openTimer = window.setTimeout(() => openHorizontalRef.current(), delay);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (openTimer !== undefined) window.clearTimeout(openTimer);
    };
  }, []);

  function closeToStack(nextCenter = centerIndex) {
    if (busyRef.current || !expanded) return;
    busyRef.current = true;

    setOrder([
      (nextCenter - 1 + n) % n,
      nextCenter,
      (nextCenter + 1) % n,
    ]);
    // Stack front is always the light card
    setFeaturedIdx(nextCenter);
    setLayoutMode("stack");
    setExpanded(false);
    window.setTimeout(() => {
      busyRef.current = false;
    }, moveMs);
  }

  function onArrow(dir: "left" | "right") {
    if (busyRef.current) return;

    if (!inRow) {
      openHorizontal();
      return;
    }

    busyRef.current = true;
    // Forward: left wraps to right. Back: right wraps to left.
    // That card must teleport (not slide across the center / "come from the front").
    const wrapping = dir === "right" ? order[0] : order[2];
    const next =
      dir === "right"
        ? ([order[1], order[2], order[0]] as [number, number, number])
        : ([order[2], order[0], order[1]] as [number, number, number]);

    if (reduce) {
      setOrder(next);
      busyRef.current = false;
      return;
    }

    setWrapIdx(wrapping);
    setWrapHidden(true);

    requestAnimationFrame(() => {
      setOrder(next);
      requestAnimationFrame(() => {
        setWrapHidden(false);
        window.setTimeout(() => {
          setWrapIdx(null);
          busyRef.current = false;
        }, moveMs);
      });
    });
  }

  const stageBox = inRow ? STAGE_ROW : STAGE_STACK;

  return (
    <section
      ref={sectionRef}
      className="relative hidden overflow-hidden bg-background lg:block"
    >
      <FigmaCanvas
        width={1440}
        height={TOP + 755 + BOTTOM}
        className="mx-auto"
      >
        <TextSequence className="absolute left-0 top-0 w-full" style={{ height: TOP + 160 }}>
          <SeqFade
            className="absolute flex items-center justify-center rounded-full bg-[#DFF8EC] text-xs font-normal leading-[18px] tracking-[-0.24px] text-primary"
            style={{ left: 681, top: TOP + 0, width: 78, height: 22 }}
          >
            Reviews
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
            <SeqChars>Hear From</SeqChars>{" "}
            <SeqChars containerClassName="text-accent">Our Patients</SeqChars>
          </h2>
          <SeqLines
            className="absolute text-center text-muted-foreground"
            style={{
              left: 0,
              top: TOP + 112,
              width: 1439,
              fontSize: 18,
              lineHeight: "28px",
              letterSpacing: "-0.32px",
            }}
            lines={[
              "Real experiences shared by patients who chose MaryDoc for compassionate, physician-led care",
            ]}
          />
        </TextSequence>

        <div
          className="absolute"
          style={{
            left: stageBox.left,
            top: TOP + 212,
            width: stageBox.width,
            height: 517,
            transition: moveTransition,
          }}
        >
          {/* Stable DOM order by review index — cards physically slide between slots */}
          {reviews.map((review, reviewIdx) => {
            const slot = order.indexOf(reviewIdx);
            if (slot < 0) return null;
            const pose = styleFor(slot);
            const isCenter = slot === 1;
            const isFeatured = reviewIdx === featuredIdx;
            const isWrapping = wrapIdx === reviewIdx;
            const tilt = inRow
              ? "rotate(0deg)"
              : slot === 0
                ? "rotate(-6deg)"
                : slot === 2
                  ? "rotate(6deg)"
                  : "rotate(0deg)";

            return (
              <div
                key={reviewIdx}
                className="absolute overflow-hidden rounded-[30px]"
                style={{
                  left: pose.left,
                  top: pose.top,
                  width: pose.width,
                  height: pose.height,
                  // Wrapping card stays behind; otherwise slot stack order
                  zIndex: isWrapping ? 0 : pose.zIndex,
                  transform: tilt,
                  opacity: isWrapping && wrapHidden ? 0 : 1,
                  // Shell color travels with the featured card (not the center slot)
                  background: expanded
                    ? isFeatured
                      ? "#DFF8EC"
                      : "#0E5A4D"
                    : undefined,
                  // Wrap: jump position with no slide (avoids crossing the center)
                  transition: isWrapping
                    ? wrapHidden
                      ? "opacity 0.12s ease, z-index 0s"
                      : "opacity 0.35s ease, background-color 0.7s cubic-bezier(0.22, 1, 0.36, 1), z-index 0s"
                    : moveTransition,
                  willChange: motionOn ? "left, top, width, height, transform, opacity" : undefined,
                }}
              >
                {/* Stable delay by review index — never tie to slot, or reveal restarts and hides the slide */}
                <RevealOnView
                  delay={reviewIdx * 120}
                  animationName="fade-up-in"
                  className="h-full w-full"
                >
                  <div
                    role="button"
                    tabIndex={inRow ? 0 : -1}
                    aria-label={inRow ? `Select review by ${review.name}` : undefined}
                    onClick={() => {
                      if (inRow) closeToStack(reviewIdx);
                    }}
                    className={`h-full w-full ${inRow ? "cursor-pointer" : isCenter ? "" : "pointer-events-none"}`}
                  >
                    {expanded ? (
                      <ReviewFace review={review} featured={isFeatured} />
                    ) : isCenter ? (
                      <FrontCard
                        style={{ left: 0, top: 0, width: "100%", height: "100%" }}
                        review={review}
                      />
                    ) : (
                      <PeekFace />
                    )}
                  </div>
                </RevealOnView>
              </div>
            );
          })}

          <button
            type="button"
            aria-label="Previous review"
            onClick={() => onArrow("left")}
            className="absolute z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
            style={{ left: 0, top: 232, background: "var(--gradient-primary)" }}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => onArrow("right")}
            className="absolute z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
            style={{ right: 0, top: 232, background: "var(--gradient-primary)" }}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </FigmaCanvas>
    </section>
  );
}

/** Single opening quote mark for the back peek card. */
function SingleQuoteMark({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 62 113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden
    >
      <path
        d="M30.545 34.75C36.559 34.75 42.438 36.533 47.438 39.874C52.438 43.215 56.336 47.964 58.637 53.52C60.938 59.076 61.54 65.19 60.367 71.088C59.194 76.986 56.298 82.404 52.046 86.656C47.793 90.909 42.376 93.805 36.477 94.978C30.579 96.151 24.465 95.549 18.909 93.247C13.353 90.946 8.604 87.049 5.263 82.049C1.922 77.048 0.139 71.17 0.139 65.156L0 60.812C0 44.684 6.407 29.216 17.812 17.811C29.216 6.407 44.684 0 60.812 0V17.375C55.106 17.36 49.452 18.476 44.18 20.659C38.907 22.842 34.119 26.048 30.094 30.093C28.529 31.655 27.085 33.333 25.776 35.115C27.334 34.865 28.921 34.741 30.537 34.741L30.545 34.75Z"
        fill="white"
      />
    </svg>
  );
}

/** Mobile front card — matches Frame 140 (full card + double quotes). */
function MobileFrontCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[30px] bg-[#DFF8EC] shadow-xl">
      {/* Two quotes on top-right */}
      <Image
        src="/quote.svg"
        alt=""
        width={120}
        height={119}
        className="pointer-events-none absolute"
        style={{ right: -2, top: 0 }}
      />

      <Image
        src="/google.webp"
        alt="Google"
        width={40}
        height={40}
        className="relative z-10"
        style={{ marginLeft: 28, marginTop: 52 }}
      />

      <p
        className="relative z-10 text-left text-muted-foreground"
        style={{
          marginLeft: 28,
          marginRight: 28,
          marginTop: 18,
          fontSize: 15,
          fontWeight: 400,
          lineHeight: "24px",
          letterSpacing: "-0.3px",
        }}
      >
        {review.text}
      </p>

      <a
        href="#read-more"
        className="relative z-10 mt-5 inline-flex w-fit items-center justify-center rounded-full border border-primary text-sm font-semibold text-primary"
        style={{ marginLeft: 28, padding: "7px 22px" }}
        onClick={(e) => e.stopPropagation()}
      >
        Read More
      </a>

      <div
        className="relative z-10 mt-auto"
        style={{ marginLeft: 28, marginRight: 28, height: 1, background: "var(--border)" }}
      />

      <div
        className="relative z-10 flex items-center gap-3"
        style={{ marginLeft: 28, marginRight: 28, marginTop: 14, marginBottom: 22 }}
      >
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
          <Image src="/review-section-image1.svg" alt={review.name} width={44} height={44} />
        </div>
        <div className="min-w-0 text-left">
          <p className="truncate text-base text-foreground">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.time}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewsMobile() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const openedOnViewRef = useRef(false);
  const review = reviews[index];

  // Open the carousel once when the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let openTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || openedOnViewRef.current) return;
        openedOnViewRef.current = true;
        observer.disconnect();
        const delay = prefersReducedMotion() ? 0 : 480;
        openTimer = window.setTimeout(() => setExpanded(true), delay);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (openTimer !== undefined) window.clearTimeout(openTimer);
    };
  }, []);

  function scrollToIndex(next: number) {
    const track = trackRef.current;
    if (!track) return;
    const n = reviews.length;
    const wrapped = ((next % n) + n) % n;
    setIndex(wrapped);
    const card = track.children[wrapped] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  function onArrow(dir: "left" | "right") {
    // First click opens carousel from the tiled stack; later clicks navigate.
    if (!expanded) {
      setExpanded(true);
      return;
    }
    scrollToIndex(dir === "right" ? index + 1 : index - 1);
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 lg:hidden"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <TextSequence className="flex flex-col items-center gap-4">
          <SeqFade className="rounded-full bg-[#DFF8EC] px-4 py-0.5 text-xs font-normal text-primary">
            Reviews
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
            <SeqChars>Hear From</SeqChars>{" "}
            <SeqChars containerClassName="text-accent">Our Patients</SeqChars>
          </h2>
          <SeqLines
            className="text-lg text-muted-foreground"
            lines={[
              "Real experiences shared by patients who chose MaryDoc for compassionate, physician-led care",
            ]}
          />
        </TextSequence>

        <div className="mt-6 flex w-full items-center gap-2">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() => onArrow("left")}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white sm:h-9 sm:w-9"
            style={{ background: "var(--gradient-primary)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>

          <div className="min-w-0 flex-1">
            {!expanded ? (
              /* Exactly two cards: mint front (double quotes) + dark back (single quote) */
              <FigmaCanvas width={351} height={534} style={{ overflow: "visible" }}>
                <div
                  className="absolute z-0 overflow-hidden rounded-[30px] bg-primary shadow-lg"
                  style={{
                    left: 37,
                    top: 17,
                    width: 283,
                    height: 500,
                    transform: "rotate(7.86deg)",
                  }}
                >
                  <SingleQuoteMark
                    className="absolute opacity-90"
                    style={{ right: 18, top: 8, width: 72, height: 96 }}
                  />
                </div>
                <div
                  className="absolute z-10"
                  style={{ left: 13, top: 13, width: 283, height: 500 }}
                >
                  <MobileFrontCard review={review} />
                </div>
              </FigmaCanvas>
            ) : (
              <div
                ref={trackRef}
                className="flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const card = el.children[0] as HTMLElement | undefined;
                  if (!card) return;
                  const step = card.offsetWidth + 12;
                  const next = Math.round(el.scrollLeft / step);
                  if (next !== index && next >= 0 && next < reviews.length) setIndex(next);
                }}
              >
                {reviews.map((r) => (
                  <div
                    key={r.name}
                    className="h-[420px] w-full shrink-0 snap-center sm:h-[460px]"
                  >
                    <MobileFrontCard review={r} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Next review"
            onClick={() => onArrow("right")}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white sm:h-9 sm:w-9"
            style={{ background: "var(--gradient-primary)" }}
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {expanded && (
          <div className="mt-3 flex items-center gap-1.5">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                type="button"
                aria-label={`Go to review ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === index ? 16 : 6,
                  background: i === index ? "var(--primary)" : "rgba(14, 90, 77, 0.25)",
                }}
              />
            ))}
          </div>
        )}
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
