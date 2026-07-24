"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { FigmaCanvas } from "@/components/figma-canvas";
import { ShieldCheck, Globe, Heart, Award } from "lucide-react";
import ScrollFloat from "@/components/ScrollFloat";

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

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 100, 95:1340).
const TOP = 60;
const BOTTOM = 24;
const DESIGN_W = 1440;
const DESIGN_H = TOP + 900 + BOTTOM;

/** Scaled poster height for the current viewport width. */
function displayCanvasHeight() {
  const w = Math.min(DESIGN_W, window.innerWidth);
  return w * (DESIGN_H / DESIGN_W);
}

const cards = [
  {
    Icon: ShieldCheck,
    title: "Trust",
    description:
      "Every evaluation is conducted by a state-licensed physician. No shortcuts and no exceptions, just real medical care you can rely on.",
    left: -138,
    top: 517,
    width: 375,
    height: 314,
    number: "1",
    numberLeft: 43,
    numberTop: 416,
    rotate: -19.67,
  },
  {
    Icon: Globe,
    title: "Access",
    description:
      "Care should not depend on where you live. Our services are designed to be accessible online, so you can connect with a physician from anywhere.",
    left: 304,
    top: 423,
    width: 375,
    height: 314,
    number: "2",
    numberLeft: 564,
    numberTop: 347,
    rotate: -4.81,
  },
  {
    Icon: Heart,
    title: "Compassion",
    description:
      "No one should feel judged for managing their health. All patients are treated with respect, privacy, and care from the very first step.",
    left: 735,
    top: 429,
    width: 375,
    height: 314,
    number: "3",
    numberLeft: 1021,
    numberTop: 375,
    rotate: 5.34,
  },
  {
    Icon: Award,
    title: "Experience",
    description:
      "Behind every consultation is a team with years of experience across multiple states, focused on making the entire process clear and stress-free.",
    left: 1164,
    top: 531,
    width: 375,
    height: 314,
    number: "4",
    numberLeft: 1493,
    numberTop: 503,
    rotate: 18.38,
  },
];

// Fixed final slots (0 = leftmost/most counter-rotated, 3 = rightmost/most clockwise),
// lifted from Figma's reveal prototype (Frame 96 -> 97 -> 99 -> 98 -> 100): each new
// card always lands in slot 3, and previously placed cards shift one slot left.
const SLOTS = cards.map((card) => ({ left: card.left, top: card.top, rotate: card.rotate }));

// Final resting translate3d — applied only on the last reveal (all 4 cards shown).
// X nudge that used to center the fan on the CTA is removed with the button.
const FINAL_TRANSFORM = [
  { x: 0, y: 0, z: 10 }, // Trust
  { x: 0, y: -20, z: 10 }, // Access
  { x: 0, y: -40, z: 10 }, // Compassion
  { x: 0, y: -60, z: 10 }, // Experience
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

// Real entrance-motion curve: sampled at runtime directly from the actual
// public/value-section-path.svg file (fetched once, rendered into an
// off-DOM SVGPathElement so the browser's native getPointAtLength() can read
// its true geometry) — never a hand-copied/hardcoded set of control points,
// so any future edit to the file is picked up automatically.
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

        // The right portion of the curve (arc-length 62% -> 100%) sweeps down
        // from up near the peak into the low right endpoint — the same shape
        // as a card swooping in from up-and-away down into its slot.
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
        // Deviation from the straight line between first/last, normalized by
        // trend length, so it can be rescaled to any hop while keeping shape.
        return raw.map((p, i) => {
          const along = i / (raw.length - 1);
          const lerp = { x: first.x + trend.x * along, y: first.y + trend.y * along };
          return { dx: (p.x - lerp.x) / trendLen, dy: (p.y - lerp.y) / trendLen };
        });
      });
  }
  return curveShapePromise;
}

// Builds a multi-point path from `from` to `to` following the real curve's
// shape (scaled and rotated to fit however long/short/angled this specific
// hop is), instead of a straight line or a single guessed midpoint.
function shapedHopPoints(shape: { dx: number; dy: number }[], from: { x: number; y: number }, to: { x: number; y: number }) {
  const hop = { x: to.x - from.x, y: to.y - from.y };
  const hopLen = Math.hypot(hop.x, hop.y) || 1;
  const cos = hop.x / hopLen;
  const sin = hop.y / hopLen;
  return shape.map(({ dx, dy }, i) => {
    const along = i / (shape.length - 1);
    const base = { x: from.x + hop.x * along, y: from.y + hop.y * along };
    // Rotate the normalized (dx,dy) deviation to align with this hop's own
    // direction, then scale it by the hop's actual length.
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

        // 1024+ fix: never force a full-screen sticky when the poster is shorter
        // than the viewport — that left a huge empty band under the cards. Only pan
        // when the scaled canvas is actually taller than the screen.
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
        <h2
          className="absolute whitespace-nowrap"
          style={{
            left: 173,
            top: TOP + 0,
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: 100,
            lineHeight: "155px",
            letterSpacing: "-2px",
          }}
        >
          <ScrollFloat as="span" containerClassName="italic text-primary">
            Four things
          </ScrollFloat>{" "}
          <ScrollFloat
            as="span"
            containerClassName="text-accent opacity-50"
            style={{ fontSize: 110, letterSpacing: "-2.2px" }}
          >
            WE NEVER
          </ScrollFloat>
        </h2>
        <h2
          className="absolute whitespace-nowrap"
          style={{
            left: 247,
            top: TOP + 155,
            fontWeight: 800,
            fontFamily: "var(--font-sans)",
            fontSize: 110,
            lineHeight: "155px",
            letterSpacing: "-2.2px",
          }}
        >
          <ScrollFloat as="span" containerClassName="text-accent opacity-50">
            COMPROMISE
          </ScrollFloat>{" "}
          <ScrollFloat as="span" containerClassName="italic" style={{ fontSize: 100, ...textGradient }}>
            On
          </ScrollFloat>
        </h2>

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
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-full text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <card.Icon className="h-8 w-8" />
                </div>
                <span
                  className="text-primary"
                  style={{ fontFamily: "var(--font-sans)", fontSize: 32, fontWeight: 600, letterSpacing: "-0.64px" }}
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

const CARD_COUNT = cards.length;

function ValuesMobile() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: -(100 * (CARD_COUNT - 1)) / CARD_COUNT,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${(CARD_COUNT - 1) * window.innerHeight}`,
          scrub: true,
          pin: pinRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            setActive(Math.round(self.progress * (CARD_COUNT - 1)));
          },
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger ?? null;
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  function scrollToIndex(index: number) {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const target = st.start + (st.end - st.start) * (index / (CARD_COUNT - 1));
    gsap.to(window, { scrollTo: target, duration: 0.6, ease: "power2.out" });
  }

  return (
    <section className="relative overflow-hidden bg-background lg:hidden">
      <div className="px-5 pt-16 sm:px-8">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 8vw, 2.75rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            <ScrollFloat as="span" containerClassName="italic text-primary">
              Four things
            </ScrollFloat>{" "}
            <ScrollFloat as="span" containerClassName="text-accent opacity-50">
              WE NEVER COMPROMISE
            </ScrollFloat>{" "}
            <ScrollFloat as="span" containerClassName="italic" style={textGradient}>
              On
            </ScrollFloat>
          </h2>
        </div>
      </div>

      {/* Only the card track + dots are pinned — the heading above stays in
          normal flow so the pinned viewport has room to show a full card. */}
      <div ref={wrapperRef} className="relative w-full">
        <div ref={pinRef} className="w-full bg-background px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-10">
            <div className="relative w-full overflow-hidden">
              <div ref={trackRef} className="flex" style={{ width: `${CARD_COUNT * 100}%` }}>
                {cards.map((card) => (
                  <div key={card.title} className="shrink-0 px-1" style={{ width: `${100 / CARD_COUNT}%` }}>
                    <div className="relative overflow-hidden rounded-[30px] bg-[#DFF8EC] p-8 text-left">
                      <span
                        className="pointer-events-none absolute right-4 top-2 select-none"
                        style={{
                          fontFamily: "var(--font-space-grotesk)",
                          fontSize: "clamp(4rem, 20vw, 6rem)",
                          fontWeight: 700,
                          ...textGradient,
                          opacity: 0.15,
                        }}
                      >
                        {card.number}
                      </span>
                      <div className="relative flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <div
                            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white"
                            style={{ background: "var(--gradient-primary)" }}
                          >
                            <card.Icon className="h-6 w-6" />
                          </div>
                          <span className="text-2xl font-semibold text-primary">{card.title}</span>
                        </div>
                        <p className="text-base leading-relaxed text-muted-foreground">{card.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              {cards.map((card, index) => (
                <button
                  key={card.title}
                  type="button"
                  aria-label={`Go to ${card.title}`}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === active ? "w-6 bg-primary" : "w-2 bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ValuesSection() {
  return (
    <>
      <ValuesMobile />
      <ValuesDesktop />
    </>
  );
}
