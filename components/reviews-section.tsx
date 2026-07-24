"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FigmaCanvas } from "@/components/figma-canvas";
import { RevealOnView } from "@/components/reveal-on-view";
import { TextSequence, SeqChars, SeqFade, SeqLines } from "@/components/text-sequence";

const OPEN_EASE = "power4.out";
const OPEN_DUR = 1;

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

function reviewAt(index: number, offset: number) {
  const n = reviews.length;
  return reviews[(index + offset + n * 10) % n];
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
      className="absolute inset-0 flex flex-col overflow-hidden rounded-[30px] shadow-xl"
      style={{ background: featured ? "#DFF8EC" : "#0E5A4D" }}
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

function ReviewsDesktop() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"stack" | "row">("stack");
  const busyRef = useRef(false);

  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const poses = layoutMode === "row" ? ROW : STACK;
  const stageBox = layoutMode === "row" ? STAGE_ROW : STAGE_STACK;

  const leftReview = reviewAt(index, -1);
  const centerReview = reviewAt(index, 0);
  const rightReview = reviewAt(index, 1);

  function openHorizontal() {
    if (busyRef.current || expanded) return;
    busyRef.current = true;

    const left = leftRef.current;
    const center = centerRef.current;
    const right = rightRef.current;
    const stage = stageRef.current;
    if (!left || !center || !right || !stage) {
      busyRef.current = false;
      return;
    }

    if (prefersReducedMotion()) {
      setExpanded(true);
      setLayoutMode("row");
      gsap.set(stage, { left: STAGE_ROW.left, width: STAGE_ROW.width });
      gsap.set(left, { ...ROW.left, clearProps: "transform" });
      gsap.set(center, { ...ROW.center, clearProps: "transform" });
      gsap.set(right, { ...ROW.right, clearProps: "transform" });
      busyRef.current = false;
      return;
    }

    setExpanded(true);

    requestAnimationFrame(() => {
      const tl = gsap.timeline({
        defaults: { ease: OPEN_EASE, duration: OPEN_DUR },
        onComplete: () => {
          setLayoutMode("row");
          gsap.set([left, center, right], { clearProps: "transform" });
          busyRef.current = false;
        },
      });

      // Soft stagger so the fan-open feels organic, not mechanical.
      tl.to(stage, { left: STAGE_ROW.left, width: STAGE_ROW.width }, 0)
        .to(
          left,
          {
            left: ROW.left.left,
            top: ROW.left.top,
            width: ROW.left.width,
            height: ROW.left.height,
            rotate: 0,
          },
          0
        )
        .to(
          center,
          {
            left: ROW.center.left,
            top: ROW.center.top,
            width: ROW.center.width,
            height: ROW.center.height,
            rotate: 0,
          },
          0.06
        )
        .to(
          right,
          {
            left: ROW.right.left,
            top: ROW.right.top,
            width: ROW.right.width,
            height: ROW.right.height,
            rotate: 0,
          },
          0.12
        );
    });
  }

  function closeToStack(nextIndex = index) {
    if (busyRef.current || !expanded) return;
    busyRef.current = true;

    const left = leftRef.current;
    const center = centerRef.current;
    const right = rightRef.current;
    const stage = stageRef.current;
    if (!left || !center || !right || !stage) {
      busyRef.current = false;
      return;
    }

    if (prefersReducedMotion()) {
      setIndex(nextIndex);
      setExpanded(false);
      setLayoutMode("stack");
      busyRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 0.75 },
      onComplete: () => {
        setIndex(nextIndex);
        setExpanded(false);
        setLayoutMode("stack");
        gsap.set([left, center, right], { clearProps: "transform" });
        busyRef.current = false;
      },
    });

    tl.to(stage, { left: STAGE_STACK.left, width: STAGE_STACK.width }, 0)
      .to(left, { ...STACK.left, rotate: 0 }, 0)
      .to(center, { ...STACK.center, rotate: 0 }, 0.04)
      .to(right, { ...STACK.right, rotate: 0 }, 0.08);
  }

  function onArrow(dir: "left" | "right") {
    if (busyRef.current) return;

    if (!expanded) {
      openHorizontal();
      return;
    }

    const cards = [leftRef.current, centerRef.current, rightRef.current].filter(
      Boolean
    ) as HTMLDivElement[];

    if (!cards.length || prefersReducedMotion()) {
      setIndex((i) =>
        dir === "right" ? (i + 1) % reviews.length : (i - 1 + reviews.length) % reviews.length
      );
      return;
    }

    busyRef.current = true;
    const dx = dir === "right" ? -40 : 40;

    gsap
      .timeline({
        onComplete: () => {
          busyRef.current = false;
        },
      })
      .to(cards, {
        x: dx,
        opacity: 0,
        scale: 0.97,
        duration: 0.38,
        ease: "power2.inOut",
        stagger: { each: 0.05, from: dir === "right" ? "start" : "end" },
      })
      .add(() => {
        setIndex((i) =>
          dir === "right" ? (i + 1) % reviews.length : (i - 1 + reviews.length) % reviews.length
        );
      })
      .set(cards, { x: -dx, opacity: 0, scale: 0.97 })
      .to(cards, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: OPEN_EASE,
        stagger: { each: 0.055, from: dir === "right" ? "start" : "end" },
      });
  }

  return (
    <section className="relative hidden bg-background lg:block">
      <FigmaCanvas
        width={1440}
        height={TOP + 755 + BOTTOM}
        className="mx-auto"
        style={{ overflow: "visible" }}
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
            <SeqChars containerClassName="italic text-accent">Our Patients</SeqChars>
          </h2>
          <SeqLines
            className="absolute text-center italic text-muted-foreground"
            style={{
              left: 0,
              top: TOP + 112,
              width: 1439,
              fontSize: 16,
              lineHeight: "26px",
              letterSpacing: "-0.32px",
            }}
            lines={[
              "Real experiences shared by patients who chose MaryDoc for compassionate, physician-led care",
            ]}
          />
        </TextSequence>

        <div
          ref={stageRef}
          className="absolute"
          style={{ left: stageBox.left, top: TOP + 212, width: stageBox.width, height: 517 }}
        >
          {/* Left peek / card */}
          <RevealOnView delay={500} animationName="emerge-peek-left">
            <div
              ref={leftRef}
              role="button"
              tabIndex={expanded ? 0 : -1}
              aria-label={expanded ? `Select review by ${leftReview.name}` : undefined}
              onClick={() => {
                if (expanded) closeToStack((index - 1 + reviews.length) % reviews.length);
              }}
              className={`absolute will-change-transform ${expanded ? "cursor-pointer" : "pointer-events-none"}`}
              style={{ ...poses.left }}
            >
              {expanded ? <ReviewFace review={leftReview} /> : <PeekFace />}
            </div>
          </RevealOnView>

          {/* Right peek / card */}
          <RevealOnView delay={500} animationName="emerge-peek-right">
            <div
              ref={rightRef}
              role="button"
              tabIndex={expanded ? 0 : -1}
              aria-label={expanded ? `Select review by ${rightReview.name}` : undefined}
              onClick={() => {
                if (expanded) closeToStack((index + 1) % reviews.length);
              }}
              className={`absolute will-change-transform ${expanded ? "cursor-pointer" : "pointer-events-none"}`}
              style={{ ...poses.right }}
            >
              {expanded ? <ReviewFace review={rightReview} /> : <PeekFace />}
            </div>
          </RevealOnView>

          {/* Center front card */}
          <RevealOnView delay={0}>
            <div
              ref={centerRef}
              role="button"
              tabIndex={expanded ? 0 : -1}
              aria-label={expanded ? `Select review by ${centerReview.name}` : undefined}
              onClick={() => {
                if (expanded) closeToStack(index);
              }}
              className={`absolute z-[1] will-change-transform ${expanded ? "cursor-pointer" : ""}`}
              style={{ ...poses.center }}
            >
              {expanded ? (
                <ReviewFace review={centerReview} featured />
              ) : (
                <FrontCard
                  style={{ left: 0, top: 0, width: "100%", height: "100%" }}
                  review={centerReview}
                />
              )}
            </div>
          </RevealOnView>

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

function ReviewsMobile() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const review = reviews[index];

  function onArrow(dir: "left" | "right") {
    if (!expanded) {
      setExpanded(true);
      return;
    }
    setIndex((i) =>
      dir === "right" ? (i + 1) % reviews.length : (i - 1 + reviews.length) % reviews.length
    );
  }

  return (
    <section className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 lg:hidden">
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
            <SeqChars containerClassName="italic text-accent">Our Patients</SeqChars>
          </h2>
          <SeqLines
            className="text-base italic text-muted-foreground"
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
            style={{ background: "var(--gradient-primary)" }}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="min-w-0 flex-1">
            {!expanded ? (
              <FigmaCanvas width={351} height={534} style={{ overflow: "visible" }}>
                <div
                  className="absolute z-0 overflow-hidden rounded-[30px] bg-primary shadow-lg"
                  style={{ left: 37, top: 17, width: 283, height: 500, transform: "rotate(7.86deg)" }}
                >
                  <Image
                    src="/quote.svg"
                    alt=""
                    width={115}
                    height={114}
                    className="absolute opacity-80"
                    style={{ left: 145, top: 0 }}
                  />
                </div>
                <div className="absolute z-10" style={{ left: 13, top: 13, width: 283, height: 500 }}>
                  <FrontCard
                    style={{ left: 0, top: 0, width: 283, height: 500, position: "relative" }}
                    review={review}
                  />
                </div>
              </FigmaCanvas>
            ) : (
              <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {([-1, 0, 1] as const).map((offset) => {
                  const r = reviewAt(index, offset);
                  const featured = offset === 0;
                  return (
                    <button
                      type="button"
                      key={`${r.name}-${offset}`}
                      className="relative h-[420px] w-[78%] shrink-0 overflow-hidden rounded-[28px] text-left shadow-lg"
                      style={{
                        background: featured ? "#DFF8EC" : "#0E5A4D",
                        minWidth: 240,
                      }}
                      onClick={() => {
                        setIndex((index + offset + reviews.length) % reviews.length);
                        setExpanded(false);
                      }}
                    >
                      <ReviewFace review={r} featured={featured} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Next review"
            onClick={() => onArrow("right")}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
            style={{ background: "var(--gradient-primary)" }}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
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
