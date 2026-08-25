"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { FigmaCanvas } from "@/components/figma-canvas";
import { ShieldCheck, Globe, Heart, Award, ArrowLeft, ArrowRight } from "lucide-react";
import { TextSequence, SeqChars } from "@/components/text-sequence";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);
}

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



const TOP = 60;
const BOTTOM = 24;
const DESIGN_W = 1440;
const CARDS_Y_SHIFT = 220;
const DESIGN_H = TOP + 700 + BOTTOM;


function displayCanvasHeight() {
  const w = Math.min(DESIGN_W, window.innerWidth);
  return w * (DESIGN_H / DESIGN_W);
}

const cards = [
  {
    Icon: ShieldCheck,
    title: "Patient Privacy",
    description:
      "Your personal and medical information is protected through a HIPAA-compliant telehealth experience.",
    left: -138,
    top: 517 - CARDS_Y_SHIFT,
    width: 375,
    height: 314,
    number: "1",
    numberLeft: 43,
    numberTop: 416,
    rotate: -19.67,
  },
  {
    Icon: Globe,
    title: "Straightforward Pricing",
    description:
      "Know what you're paying for before you begin, with no unnecessary surprises.",
    left: 304,
    top: 423 - CARDS_Y_SHIFT,
    width: 375,
    height: 314,
    number: "2",
    numberLeft: 564,
    numberTop: 347,
    rotate: -4.81,
  },
  {
    Icon: Heart,
    title: "State-Specific Guidance",
    description:
      "Get information relevant to the medical care requirements in your state.",
    left: 735,
    top: 429 - CARDS_Y_SHIFT,
    width: 375,
    height: 314,
    number: "3",
    numberLeft: 1021,
    numberTop: 375,
    rotate: 5.34,
  },
  {
    Icon: Award,
    title: "Clear Expectations",
    description:
      "Understand the process, what to expect, and what your evaluation can and cannot determine.",
    left: 1164,
    top: 531 - CARDS_Y_SHIFT,
    width: 375,
    height: 314,
    number: "4",
    numberLeft: 1493,
    numberTop: 503,
    rotate: 18.38,
  },
];





const SLOTS = cards.map((card) => ({ left: card.left, top: card.top, rotate: card.rotate }));


const FINAL_TRANSFORM = [
  { x: -160, y: 0, z: 10 },
  { x: -160, y: -20, z: 10 }, 
  { x: -160, y: -40, z: 10 }, 
  { x: -160, y: -60, z: 10 }, 
] as const;

function slotPose(cardIndex: number, slotIndex: number, withFinal = false) {
  const base = SLOTS[cardIndex];
  const slot = SLOTS[slotIndex];
  const f = withFinal ? FINAL_TRANSFORM[slotIndex] : { x: 0, y: 0, z: 0 };
  return {
    x: slot.left - base.left + f.x,
    y: slot.top - base.top + f.y,
    z: f.z,
    rotate: slot.rotate,
  };
}






let curveShapePromise: Promise<{ dx: number; dy: number }[]> | null = null;

function loadCurveShape() {
  if (!curveShapePromise) {
    curveShapePromise = fetch("/value-section-path.svg")
      .then((res) => res.text())
      .then((svgText) => {
        const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
        const pathEl = doc.querySelector("path");
        const d = pathEl?.getAttribute("d") ?? "";

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        const total = path.getTotalLength();

        
        
        
        const samples = 16;
        const raw = Array.from({ length: samples }, (_, i) => {
          const len = total * (0.62 + 0.38 * (i / (samples - 1)));
          const p = path.getPointAtLength(len);
          return { x: p.x, y: p.y };
        });

        const first = raw[0];
        const last = raw[raw.length - 1];
        const trend = { x: last.x - first.x, y: last.y - first.y };
        const trendLen = Math.hypot(trend.x, trend.y) || 1;
        
        
        return raw.map((p, i) => {
          const along = i / (raw.length - 1);
          const lerp = { x: first.x + trend.x * along, y: first.y + trend.y * along };
          return { dx: (p.x - lerp.x) / trendLen, dy: (p.y - lerp.y) / trendLen };
        });
      });
  }
  return curveShapePromise;
}




function shapedHopPoints(shape: { dx: number; dy: number }[], from: { x: number; y: number }, to: { x: number; y: number }) {
  const hop = { x: to.x - from.x, y: to.y - from.y };
  const hopLen = Math.hypot(hop.x, hop.y) || 1;
  const cos = hop.x / hopLen;
  const sin = hop.y / hopLen;
  return shape.map(({ dx, dy }, i) => {
    const along = i / (shape.length - 1);
    const base = { x: from.x + hop.x * along, y: from.y + hop.y * along };
    
    
    const rx = dx * cos - dy * sin;
    const ry = dx * sin + dy * cos;
    return { x: base.x + rx * hopLen, y: base.y + ry * hopLen };
  });
}

function ValuesDesktop() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    loadCurveShape().then((curveShape) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const cardEls = cardRefs.current;
        const numberEls = numberRefs.current;
        if (cardEls.some((el) => !el) || numberEls.some((el) => !el)) return;

        const parkedRotate = SLOTS[3].rotate;

        cardEls.forEach((el, j) => {
          const parked = {
            x: SLOTS[3].left - SLOTS[j].left + 260,
            y: SLOTS[3].top - SLOTS[j].top + 50,
            z: 0,
          };
          gsap.set(el, {
            x: parked.x,
            y: parked.y,
            z: parked.z,
            rotate: parkedRotate,
            opacity: 0,
            willChange: "transform, opacity",
          });
          gsap.set(numberEls[j], { rotate: -parkedRotate });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none", duration: 1 },
        });

        for (let q = 1; q <= 4; q++) {
          const segStart = q - 1;
          const isLast = q === 4;
          for (let j = 0; j < q; j++) {
            const el = cardEls[j];
            const numberEl = numberEls[j];
            const isFirstAppearance = q === j + 1;
            const toSlot = 4 - q + j;
            const to = slotPose(j, toSlot, isLast);

            const from = isFirstAppearance
              ? {
                  x: SLOTS[3].left - SLOTS[j].left + 260,
                  y: SLOTS[3].top - SLOTS[j].top + 50,
                  z: 0,
                }
              : slotPose(j, 4 - (q - 1) + j, false);

            if (isFirstAppearance) {
              tl.to(
                el,
                {
                  motionPath: {
                    path: shapedHopPoints(
                      curveShape,
                      { x: from.x, y: from.y },
                      { x: to.x, y: to.y }
                    ),
                    curviness: 1,
                  },
                  z: to.z,
                  rotate: to.rotate,
                  opacity: 1,
                },
                segStart
              );
            } else {
              tl.to(
                el,
                { x: to.x, y: to.y, z: to.z, rotate: to.rotate, opacity: 1 },
                segStart
              );
            }
            tl.to(numberEl, { rotate: -to.rotate }, segStart);
          }
        }

        
        
        
        const pan = panRef.current;
        const sticky = stickyRef.current;
        if (pan && sticky) {
          const canvasH = displayCanvasHeight();
          const overflow = window.innerHeight - canvasH;

          if (overflow < 0) {
            sticky.style.height = "100vh";
            sticky.style.top = "0px";
            tl.fromTo(
              pan,
              { y: 0 },
              { y: overflow, ease: "none", duration: 4 },
              0
            );
          } else {
            sticky.style.height = `${canvasH}px`;
            sticky.style.top = `${overflow / 2}px`;
            gsap.set(pan, { y: 0 });
          }
        }
      }, wrapperRef);

      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="relative hidden bg-background lg:block">
      <div ref={wrapperRef} className="relative" style={{ height: "300vh" }}>
        <div
          ref={stickyRef}
          className="sticky flex items-start justify-center overflow-hidden"
          style={{ top: 0 }}
        >
          <div ref={panRef} className="w-full" style={{ maxWidth: DESIGN_W }}>
            <FigmaCanvas
              width={DESIGN_W}
              height={DESIGN_H}
              className="mx-auto"
              style={{ width: "100%", maxWidth: DESIGN_W, overflow: "visible" }}
            >
        <TextSequence
          className="pointer-events-none absolute left-0 top-0 w-full"
          style={{ height: TOP + 120 }}
        >
          <h2
            className="absolute whitespace-nowrap text-center text-primary"
            style={{
              left: 0,
              top: TOP + 0,
              width: DESIGN_W,
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: 72,
              lineHeight: "88px",
              letterSpacing: "-1.44px",
            }}
          >
            <SeqChars>Four things</SeqChars>{" "}
            <SeqChars>We Never Compromise</SeqChars>{" "}
            <SeqChars>On</SeqChars>
          </h2>
        </TextSequence>

        {cards.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute"
            style={{
              left: SLOTS[i].left,
              top: TOP + SLOTS[i].top,
              width: card.width,
              height: card.height,
            }}
          >
            <div
              className="relative z-10 flex h-full w-full flex-col gap-4 overflow-hidden rounded-[30px] bg-[#DFF8EC] p-10 pt-[62px] shadow-md"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-[72px] w-[72px] min-h-[72px] min-w-[72px] shrink-0 aspect-square items-center justify-center rounded-full text-white"
                  style={{ background: "var(--gradient-primary)", flexShrink: 0, width: 72, height: 72, minWidth: 72, minHeight: 72, aspectRatio: "1 / 1" }}
                >
                  <card.Icon className="h-8 w-8 shrink-0" />
                </div>
                <span
                  className="min-w-0 flex-1 text-primary leading-[1.2]"
                  style={{ fontFamily: "var(--font-sans)", fontSize: 26, fontWeight: 600, letterSpacing: "-0.52px" }}
                >
                  {card.title}
                </span>
              </div>
              <p
                className="text-muted-foreground"
                style={{ fontSize: 18, lineHeight: "28px", letterSpacing: "-0.36px" }}
              >
                {card.description}
              </p>
            </div>

            <span
              ref={(el) => {
                numberRefs.current[i] = el;
              }}
              className="pointer-events-none absolute z-20 select-none"
              style={{
                right: card.number === "4" ? 50 : -30,
                top: card.number === "4" ? -115 : -90,
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 160,
                fontWeight: 700,
                letterSpacing: "-3.2px",
                ...textGradient,
                opacity: 0.55,
                transformOrigin: "top right",
                WebkitMaskImage: "linear-gradient(to bottom, black 45%, transparent 85%)",
                maskImage: "linear-gradient(to bottom, black 45%, transparent 85%)",
              }}
            >
              {card.number}
            </span>
          </div>
        ))}
      </FigmaCanvas>
      </div>
        </div>
      </div>
    </section>
  );
}

function ValuesMobile() {
  const n = cards.length;
  // Infinite looped slides: [last, ...cards, first]
  const slides = [cards[n - 1], ...cards, cards[0]];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [withTransition, setWithTransition] = useState(true);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  const active = ((currentIndex - 1) % n + n) % n;

  function prevSlide() {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }

  function nextSlide() {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }

  function goToSlide(targetIdx: number) {
    setWithTransition(true);
    setCurrentIndex(targetIdx + 1);
  }

  function handleTransitionEnd() {
    if (currentIndex === 0) {
      // Reached prepended clone -> jump to real last slide without animation
      setWithTransition(false);
      setCurrentIndex(n);
    } else if (currentIndex === n + 1) {
      // Reached appended clone -> jump to real first slide without animation
      setWithTransition(false);
      setCurrentIndex(1);
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);
    setWithTransition(false);
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
      } else {
        setWithTransition(true);
      }
    } else {
      setWithTransition(true);
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
      <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
        <TextSequence className="w-full text-center">
          <p
            className="text-primary"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 6vw, 2.35rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            <SeqChars>Four things</SeqChars>{" "}
            <SeqChars>We Never Compromise</SeqChars>{" "}
            <SeqChars>On</SeqChars>
          </p>
        </TextSequence>

        {/* Carousel Slider with Infinite Forward/Backward Loop */}
        <div
          className="relative mt-2 w-full max-w-[420px] cursor-grab overflow-hidden select-none active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className={`flex ${
              withTransition && !isDragging
                ? "transition-transform duration-500 ease-out"
                : "transition-none"
            }`}
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((card, i) => (
              <div key={`${card.title}-${i}`} className="w-full shrink-0 px-1">
                <div className="relative flex min-h-[250px] w-full flex-col justify-between overflow-hidden rounded-[30px] bg-[#DFF8EC] p-7 text-left shadow-none sm:min-h-[270px] sm:p-8">
                  {/* Clearly visible watermark number in bottom-right corner */}
                  <span
                    className="pointer-events-none absolute bottom-2 right-4 select-none leading-none"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontSize: "clamp(3.5rem, 16vw, 5.5rem)",
                      fontWeight: 700,
                      ...textGradient,
                      opacity: 0.22,
                    }}
                  >
                    {card.number}
                  </span>
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-[60px] w-[60px] min-h-[60px] min-w-[60px] shrink-0 aspect-square items-center justify-center rounded-full text-white"
                        style={{
                          background: "var(--gradient-primary)",
                          flexShrink: 0,
                          width: 60,
                          height: 60,
                          minWidth: 60,
                          minHeight: 60,
                          aspectRatio: "1 / 1",
                        }}
                      >
                        <card.Icon className="h-7 w-7 shrink-0" />
                      </div>
                      <span className="min-w-0 flex-1 text-[22px] font-bold leading-tight text-primary sm:text-2xl">
                        {card.title}
                      </span>
                    </div>
                    <p className="pr-10 text-base leading-[26px] text-muted-foreground sm:text-lg sm:leading-[28px]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls: Arrows & Indicators */}
        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous value"
            onClick={prevSlide}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-transform active:scale-95"
            style={{ background: "var(--gradient-primary)" }}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {cards.map((card, index) => (
              <button
                key={card.title}
                type="button"
                aria-label={`Go to ${card.title}`}
                onClick={() => goToSlide(index)}
                className="h-2 rounded-full transition-all"
                style={{
                  width: index === active ? 20 : 7,
                  background:
                    index === active ? "var(--primary)" : "rgba(14, 90, 77, 0.25)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next value"
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

export function ValuesSection() {
  return (
    <div id="what-we-stand-for" className="scroll-mt-10">
      <ValuesMobile />
      <ValuesDesktop />
    </div>
  );
}
