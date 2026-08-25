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


const STACK = {
  left: { left: 124, top: -4, width: 420, height: 491 },
  center: { left: 182, top: -1, width: 375, height: 514 },
  right: { left: 187, top: -4, width: 420, height: 491 },
} as const;

const STAGE_STACK = { left: 354, width: 732 };


const ARROW_W = 52;
const ARROW_GAP = 28;
const CARD_W = 340;
const CARD_H = 490;
const CARD_GAP = 24;
const STAGE_ROW_W =
  ARROW_W + ARROW_GAP + 3 * CARD_W + 2 * CARD_GAP + ARROW_GAP + ARROW_W;
const STAGE_ROW = { left: (1440 - STAGE_ROW_W) / 2, width: STAGE_ROW_W };
const ROW_X0 = ARROW_W + ARROW_GAP;

const ROW = {
  left: { left: ROW_X0, top: 10, width: CARD_W, height: CARD_H },
  center: {
    left: ROW_X0 + CARD_W + CARD_GAP,
    top: 10,
    width: CARD_W,
    height: CARD_H,
  },
  right: {
    left: ROW_X0 + (CARD_W + CARD_GAP) * 2,
    top: 10,
    width: CARD_W,
    height: CARD_H,
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
    <div className="absolute inset-0 overflow-hidden rounded-[30px] bg-primary">
      <Image
        src="/quote.svg"
        alt="Quotation mark"
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
      className="absolute inset-0 flex flex-col overflow-hidden rounded-[30px]"
      style={{
        background: featured ? "#DFF8EC" : "#0E5A4D",
        transition:
          "background-color 0.45s cubic-bezier(0.22, 1, 0.36, 1), color 0.45s ease",
      }}
    >
      <Image
        src="/quote.svg"
        alt="Quotation mark"
        width={90}
        height={89}
        className="pointer-events-none absolute opacity-30 select-none"
        style={{ right: 24, top: 20 }}
      />
      <Image
        src="/google.webp"
        alt="Google"
        width={42}
        height={42}
        className="relative z-10"
        style={{ marginLeft: 32, marginTop: 44, marginBottom: 20 }}
      />
      <p
        className="relative z-10 line-clamp-6 text-left"
        style={{
          marginLeft: 32,
          marginRight: 32,
          marginTop: 0,
          fontSize: 16,
          lineHeight: "26px",
          letterSpacing: "-0.32px",
          color: featured ? "var(--muted-foreground)" : "rgba(255,255,255,0.88)",
          transition: "color 0.45s ease",
        }}
      >
        {review.text}
      </p>
      <a
        href="#read-more"
        className="relative z-10 mt-auto inline-flex w-fit items-center justify-center rounded-full border text-sm font-semibold"
        style={{
          marginLeft: 32,
          marginBottom: 14,
          padding: "7px 24px",
          borderColor: featured ? "var(--primary)" : "rgba(255,255,255,0.5)",
          color: featured ? "var(--primary)" : "#fff",
          transition: "color 0.45s ease, border-color 0.45s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        Read More
      </a>
      <div
        className="relative z-10 flex items-center gap-3"
        style={{
          marginLeft: 32,
          marginRight: 32,
          marginBottom: 24,
        }}
      >
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/15">
          <Image src="/review-section-image1.svg" alt={review.name} width={48} height={48} />
        </div>
        <div className="min-w-0 text-left">
          <p
            className="truncate text-base font-medium"
            style={{
              color: featured ? "var(--foreground)" : "#fff",
              transition: "color 0.45s ease",
            }}
          >
            {review.name}
          </p>
          <p
            className="text-xs"
            style={{
              color: featured ? "var(--muted-foreground)" : "rgba(255,255,255,0.7)",
              transition: "color 0.45s ease",
            }}
          >
            {review.time}
          </p>
        </div>
      </div>
    </div>
  );
}

function FrontCard({
  style,
  review,
}: {
  style: CSSProperties;
  review: (typeof reviews)[number];
}) {
  return (
    <div className="absolute overflow-hidden rounded-[30px] bg-[#DFF8EC]" style={style}>
      <Image
        src="/quote.svg"
        alt="Quotation mark"
        width={100}
        height={99}
        className="pointer-events-none absolute opacity-30 select-none"
        style={{ right: 24, top: 20 }}
      />
      <Image
        src="/google.webp"
        alt="Google"
        width={48}
        height={48}
        className="absolute"
        style={{ left: 40, top: 48 }}
      />
      <p
        className="absolute text-muted-foreground text-left"
        style={{
          left: 40,
          top: 120,
          width: 295,
          fontSize: 17,
          fontWeight: 400,
          lineHeight: "27px",
          letterSpacing: "-0.32px",
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
      <div className="absolute flex items-center gap-3" style={{ left: 40, top: 418, width: 295, height: 52 }}>
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
  const [order, setOrder] = useState<number[]>([2, 0, 1]);
  const [expanded, setExpanded] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"stack" | "row">("stack");
  const busyRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const openedOnViewRef = useRef(false);

  const inRow = layoutMode === "row";
  const reduce = prefersReducedMotion();
  const moveTransition = !reduce
    ? "left 0.45s cubic-bezier(0.22, 1, 0.36, 1), top 0.45s cubic-bezier(0.22, 1, 0.36, 1), width 0.45s cubic-bezier(0.22, 1, 0.36, 1), height 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.45s ease, opacity 0.3s ease"
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
    if (layoutMode === "row") return;
    setExpanded(true);
    setLayoutMode("row");
  }

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
        openTimer = window.setTimeout(() => openHorizontal(), delay);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (openTimer !== undefined) window.clearTimeout(openTimer);
    };
  }, []);

  function closeToStack() {
    if (busyRef.current || !expanded) return;
    busyRef.current = true;
    setLayoutMode("stack");
    setExpanded(false);
    window.setTimeout(() => {
      busyRef.current = false;
    }, 450);
  }

  function onArrow(dir: "left" | "right") {
    if (busyRef.current) return;
    busyRef.current = true;

    if (!expanded) {
      openHorizontal();
      busyRef.current = false;
      return;
    }

    setOrder((prev) => {
      if (dir === "right") {
        return [prev[1], prev[2], prev[0]];
      } else {
        return [prev[2], prev[0], prev[1]];
      }
    });

    window.setTimeout(() => {
      busyRef.current = false;
    }, 450);
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
            className="absolute flex items-center justify-center rounded-full bg-[#DFF8EC] text-base font-medium leading-none tracking-[-0.24px] text-primary"
            style={{ left: 650, top: TOP + 0, width: 140, height: 40 }}
          >
            Reviews
          </SeqFade>
          <h2
            className="absolute text-center text-primary"
            style={{
              left: 0,
              top: TOP + 58,
              width: 1439,
              fontFamily: "var(--font-sans)",
              fontSize: 48,
              fontWeight: 700,
              lineHeight: "58px",
              letterSpacing: "-0.96px",
            }}
          >
            <SeqChars>Hear From</SeqChars>{" "}
            <SeqChars>Our Patients</SeqChars>
          </h2>
          <SeqLines
            className="absolute text-center text-muted-foreground"
            style={{
              left: 0,
              top: TOP + 132,
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
          {reviews.map((review, reviewIdx) => {
            const slot = order.indexOf(reviewIdx);
            if (slot < 0) return null;
            const pose = styleFor(slot);
            const isCenter = slot === 1;
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
                  zIndex: pose.zIndex,
                  transform: tilt,
                  transition: moveTransition,
                  willChange: "left, top, width, height, transform, opacity",
                }}
              >
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
                      if (inRow) closeToStack();
                    }}
                    className={`h-full w-full ${inRow ? "cursor-pointer" : isCenter ? "" : "pointer-events-none"}`}
                  >
                    {expanded ? (
                      <ReviewFace review={review} featured={isCenter} />
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



/** Mobile front card — matches Frame 140 (full card + double quotes). */
function MobileReviewCard({
  review,
  isFeatured = true,
}: {
  review: (typeof reviews)[number];
  isFeatured?: boolean;
}) {
  return (
    <div
      className="relative flex h-full min-h-[420px] w-full flex-col justify-between overflow-hidden rounded-[28px] p-6 shadow-none sm:min-h-[450px] sm:p-7"
      style={{
        background: isFeatured ? "#DFF8EC" : "#0E5A4D",
        color: isFeatured ? "var(--foreground)" : "#ffffff",
      }}
    >
      {/* Top quote mark */}
      <Image
        src="/quote.svg"
        alt="Quotation mark"
        width={75}
        height={74}
        className="pointer-events-none absolute right-4 top-4 opacity-25 select-none"
      />

      <div className="relative z-10">
        <Image
          src="/google.webp"
          alt="Google"
          width={36}
          height={36}
          className="mb-4 mt-1"
        />

        <p
          className="text-left text-[15px] leading-[26px] sm:text-base sm:leading-[27px] pr-2"
          style={{
            color: isFeatured ? "var(--muted-foreground)" : "rgba(255,255,255,0.9)",
          }}
        >
          {review.text}
        </p>

        <a
          href="#read-more"
          className="mt-4 inline-flex items-center justify-center rounded-full border px-5 py-1.5 text-sm font-semibold transition-colors"
          style={{
            borderColor: isFeatured ? "var(--primary)" : "rgba(255,255,255,0.4)",
            color: isFeatured ? "var(--primary)" : "#ffffff",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          Read More
        </a>
      </div>

      <div className="relative z-10 mt-6">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white/15">
            <Image
              src="/review-section-image1.svg"
              alt={review.name}
              width={44}
              height={44}
            />
          </div>
          <div className="min-w-0 text-left">
            <p
              className="truncate text-base font-semibold"
              style={{ color: isFeatured ? "var(--foreground)" : "#ffffff" }}
            >
              {review.name}
            </p>
            <p
              className="text-xs"
              style={{
                color: isFeatured ? "var(--muted-foreground)" : "rgba(255,255,255,0.7)",
              }}
            >
              {review.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsMobile() {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const n = reviews.length;

  function prevSlide() {
    setIndex((prev) => (prev - 1 + n) % n);
  }

  function nextSlide() {
    setIndex((prev) => (prev + 1) % n);
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);
    setDragOffset(0);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startXRef.current === null || startYRef.current === null) return;
    const diffX = e.clientX - startXRef.current;
    const diffY = e.clientY - startYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        isHorizontalSwipeRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipeRef.current) {
      setDragOffset(diffX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startXRef.current !== null && isHorizontalSwipeRef.current) {
      const diffX = e.clientX - startXRef.current;
      const minSwipeDistance = 35;
      if (diffX < -minSwipeDistance) {
        nextSlide();
      } else if (diffX > minSwipeDistance) {
        prevSlide();
      }
    }
    setIsDragging(false);
    setDragOffset(0);
    startXRef.current = null;
    startYRef.current = null;
    isHorizontalSwipeRef.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  return (
    <section className="relative overflow-hidden bg-background px-4 py-14 sm:px-6 sm:py-16 lg:hidden">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 text-center">
        <TextSequence className="flex flex-col items-center gap-3">
          <SeqFade className="rounded-full bg-[#DFF8EC] px-5 py-1.5 text-sm font-medium text-primary">
            Reviews
          </SeqFade>
          <h2
            className="text-primary"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.75rem, 6vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            <SeqChars>Hear From</SeqChars>{" "}
            <SeqChars>Our Patients</SeqChars>
          </h2>
          <SeqLines
            className="text-sm text-muted-foreground sm:text-base"
            lines={[
              "Real experiences shared by patients who chose MaryDoc for compassionate, physician-led care",
            ]}
          />
        </TextSequence>

        {/* Carousel Slider with Full Touch / Pointer Swiping */}
        <div
          className="relative mt-4 w-full max-w-sm cursor-grab overflow-hidden select-none active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className={`flex ${isDragging ? "transition-none" : "transition-transform duration-500 ease-out"}`}
            style={{
              transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
            }}
          >
            {reviews.map((r, i) => (
              <div key={r.name} className="w-full shrink-0 px-1">
                <MobileReviewCard review={r} isFeatured={i % 2 === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls: Forward/Backward Buttons & Indicators */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous review"
            onClick={prevSlide}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-transform active:scale-95"
            style={{ background: "var(--gradient-primary)" }}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                type="button"
                aria-label={`Go to review ${i + 1}`}
                onClick={() => setIndex(i)}
                className="h-2 rounded-full transition-all"
                style={{
                  width: i === index ? 20 : 7,
                  background:
                    i === index ? "var(--primary)" : "rgba(14, 90, 77, 0.25)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next review"
            onClick={nextSlide}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-transform active:scale-95"
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
