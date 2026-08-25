"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FigmaCanvas } from "@/components/figma-canvas";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TextSequence, SeqChars, SeqFade, SeqLines } from "@/components/text-sequence";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}



const TOP = 0;


const BOTTOM = 0;

const mobileGradient = {
  background:
    "linear-gradient(315deg, #4C8C1A 0%, #1D6540 32.2%, #0E5A4D 72.1%, #071D1A 100%)",
} as const;

const steps = [
  {
    number: 1,
    title: "Book Your Evaluation",
    description:
      "Select your state, provide your basic details, and choose a convenient date and time for your secure online medical evaluation.",
  },
  {
    number: 2,
    title: "Meet Your State-Licensed Doctor",
    description:
      "Connect with your doctor online via audio/video call and discuss your medical history, symptoms, and find out whether you may qualify for medical care.",
  },
  {
    number: 3,
    title: "Complete Your Registration",
    description:
      "If approved by the doctor, follow your state's requirements to complete the registration process and receive your medical card.",
  },
];

const STEP_COUNT = steps.length;




const RING_CENTER = { x: 720, y: TOP + 963 };
const RING_RADIUS = 491.5;


const BUBBLE_RADIUS = 585;


const NEIGHBOR_ANGLE = 79;

function pointOnRing(angleDeg: number, radius: number, center = RING_CENTER) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: center.x + radius * Math.sin(rad), y: center.y - radius * Math.cos(rad) };
}





function angleFor(i: number, active: number): number | null {
  if (i === active) return 0;
  if (i === (active + 1) % STEP_COUNT) return NEIGHBOR_ANGLE;
  if (i === (active - 1 + STEP_COUNT) % STEP_COUNT) return -NEIGHBOR_ANGLE;
  return null;
}

function MobileProcessSection() {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const n = steps.length;

  function prevSlide() {
    setActive((prev) => (prev - 1 + n) % n);
  }

  function nextSlide() {
    setActive((prev) => (prev + 1) % n);
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
    <section className="relative w-full overflow-hidden lg:hidden">
      <div className="w-full px-5 py-16 sm:px-8" style={mobileGradient}>
        <TextSequence className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <SeqFade className="rounded-full bg-[#DFF8EC] px-6 py-2 text-base font-medium text-primary">
            Process
          </SeqFade>
          <h2
            className="text-[#FAFAF8]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <SeqChars>How to Apply for Your</SeqChars>{" "}
            <SeqChars>Medical Card?</SeqChars>
          </h2>
          <SeqLines
            className="text-[#DFF8EC]"
            style={{ fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: "28px" }}
            lines={[
              "You can apply for a medical card in three simple steps:",
            ]}
          />
        </TextSequence>

        {/* Carousel Slider with Real-time Finger / Thumb Swipe */}
        <div
          className="relative mt-8 w-full cursor-grab overflow-hidden select-none active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Full-width divider behind badge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-px bg-white/30"
            style={{ top: 91 }}
          />

          <div
            className={`flex ${isDragging ? "transition-none" : "transition-transform duration-500 ease-out"}`}
            style={{
              transform: `translateX(calc(-${active * 100}% + ${dragOffset}px))`,
            }}
          >
            {steps.map((step) => (
              <div key={step.number} className="w-full shrink-0 px-1">
                <div className="mx-auto flex max-w-xl flex-col items-center gap-4 p-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DFF8EC] shadow-md">
                      <span
                        className="text-primary"
                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 32, fontWeight: 700 }}
                      >
                        {step.number}
                      </span>
                    </div>
                    <Image src="/point.svg" alt="Step indicator marker" width={12} height={12} className="mt-[15px]" />
                    <Image
                      src="/line.svg"
                      alt="Step connector marker"
                      width={1}
                      height={40}
                      className="mt-[10px]"
                      style={{ width: 1, height: 40 }}
                    />
                  </div>
                  <h3
                    className="text-[#FAFAF8]"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.5rem, 6vw, 2rem)", fontWeight: 700 }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#DFF8EC]" style={{ fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: "28px" }}>
                    {step.description}
                  </p>
                  <a
                    href="#book-consultation"
                    className="mt-2 rounded-full bg-[#DFF8EC] px-9 py-2.5 text-base font-semibold text-primary shadow-md transition-transform active:scale-95"
                  >
                    Book My Consultation
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls: Arrows & Indicators */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous step"
            onClick={prevSlide}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DFF8EC] text-primary shadow-md transition-transform active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                aria-label={`Go to step ${step.number}`}
                onClick={() => setActive(index)}
                className="h-2 rounded-full transition-all"
                style={{
                  width: index === active ? 20 : 7,
                  background:
                    index === active ? "#DFF8EC" : "rgba(223, 248, 236, 0.35)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next step"
            onClick={nextSlide}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DFF8EC] text-primary shadow-md transition-transform active:scale-95"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function DesktopProcessSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const badgeEls = badgeRefs.current;
      const contentEls = contentRefs.current;
      if (badgeEls.some((el) => !el) || contentEls.some((el) => !el)) return;

      // Each badge is laid out in the DOM at the ring's top point; a proxy
      // {angle} object is tweened and onUpdate converts it to an x/y point on
      // the circle every frame, so badges genuinely travel along the arc
      // instead of jumping between fixed pixel slots.
      const angleState = badgeEls.map((_, i) => ({ angle: angleFor(i, 0) ?? 0 }));

      function applyAngle(el: HTMLDivElement, angle: number) {
        const p = pointOnRing(angle, BUBBLE_RADIUS);
        const top = pointOnRing(0, BUBBLE_RADIUS);
        gsap.set(el, { x: p.x - top.x, y: p.y - top.y });
      }

      badgeEls.forEach((el, i) => {
        const role = angleFor(i, 0);
        applyAngle(el!, angleState[i].angle);
        gsap.set(el, { opacity: role !== null ? 1 : 0 });
      });
      contentEls.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0 }));
      if (lineRef.current) gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top+=210 top",
          end: `+=${(STEP_COUNT - 1) * window.innerHeight}`,
          scrub: 1.5,
          pin: pinRef.current,
          onToggle: (self) => {
            document.body.classList.toggle("process-pinned", self.isActive);
          },
        },
        defaults: { ease: "none", duration: 1 },
      });

      // Connector line grows in at the very start, then re-grows from 0 each
      // time a new step settles into center.
      if (lineRef.current) {
        tl.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.3 }, 0);
      }

      for (let active = 1; active < STEP_COUNT; active++) {
        const segStart = active - 1;
        if (lineRef.current) {
          tl.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1 }, segStart);
        }
        for (let i = 0; i < STEP_COUNT; i++) {
          const fromAngle = angleFor(i, active - 1);
          const toAngle = angleFor(i, active);
          const el = badgeEls[i]!;
          const state = angleState[i];

          // A badge going straight from LEFT to RIGHT (skipping center) would
          // otherwise tween its angle numerically through 0 — sliding back
          // across the front of the arc, which reads as rotating the wrong
          // way. Treat that specific jump as an exit-and-reenter instead:
          // fade out at left, then snap and fade back in at right, so every
          // badge always visually flows the same direction (right -> center
          // -> left) no matter how many total steps there are.
          const isWrapJump = fromAngle === -NEIGHBOR_ANGLE && toAngle === NEIGHBOR_ANGLE;

          if (isWrapJump) {
            tl.to(el, { opacity: 0, duration: 0.4 }, segStart);
            tl.set(state, { angle: toAngle, onUpdate: () => applyAngle(el, state.angle) }, segStart + 0.5);
            tl.to(el, { opacity: 1, duration: 0.4 }, segStart + 0.5);
          } else if (toAngle !== null) {
            if (fromAngle === null) {
              // Reappearing after being hidden: snap onto the arc at its
              // entry angle first (no sweep from a stale position), then
              // just fade in in place.
              tl.set(state, { angle: toAngle, onUpdate: () => applyAngle(el, state.angle) }, segStart);
            } else {
              tl.to(state, { angle: toAngle, onUpdate: () => applyAngle(el, state.angle) }, segStart);
            }
            tl.to(el, { opacity: 1 }, segStart);
          } else if (fromAngle !== null) {
            // Was visible, now rotates out of the visible triad: fade out
            // in place rather than sweeping off to nowhere.
            tl.to(el, { opacity: 0 }, segStart);
          }

        }

        // Content swap: sharp fade+slide out for the outgoing step, a brief
        // gap where neither is visible, then fade+slide in for the incoming
        // one — instead of a slow linear crossfade that left both readable
        // and overlapping for most of the segment.
        const outgoing = contentEls[active - 1];
        const incoming = contentEls[active];
        tl.to(outgoing, { opacity: 0, y: -16, duration: 0.35 }, segStart);
        tl.fromTo(incoming, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35 }, segStart + 0.55);
      }
    }, wrapperRef);

    return () => {
      ctx.revert();
      document.body.classList.remove("process-pinned");
    };
  }, []);

  return (
    <section className="relative hidden w-full overflow-hidden lg:block">
      <div ref={wrapperRef} className="relative">
        {/* Background lives on the pinned element itself (not the outer,
            normally-scrolling section) so it stays visually static for the
            whole pin instead of panning underneath the fixed foreground. */}
        <div ref={pinRef} className="overflow-hidden" style={mobileGradient}>
          <FigmaCanvas
            width={1440}
            height={TOP + 937 + BOTTOM}
            className="mx-auto"
            // Native 1440px like other sections — this section is pinned to
            // the viewport, so upscaling past 1440 on a wide monitor would
            // grow it taller than the screen and clip/distort the ring.
            style={{ width: "100%", maxWidth: 1440 }}
          >
            {/* Decorative ring behind the active step card — the dome shape
                is the top slice of a full circle, baked into this SVG's own
                984x466 viewBox rather than relying on canvas-edge cropping. */}
            <Image
              src="/ellipse.svg"
              alt="Medical card application process arc"
              width={984}
              height={466}
              className="pointer-events-none absolute"
              style={{ left: 228, top: TOP + 471 }}
            />

            {/* Header: process tag + heading + subcopy */}
            <TextSequence className="absolute" style={{ left: 228, top: TOP + 70, width: 984 }}>
              <SeqFade
                className="mx-auto block w-fit rounded-full bg-[#DFF8EC] px-6 py-2 text-base font-medium leading-none tracking-[-0.24px] text-primary"
                style={{ marginBottom: 16 }}
              >
                Process
              </SeqFade>
              <SeqChars
                as="h2"
                containerClassName="text-center text-[#FAFAF8]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 48,
                  fontWeight: 700,
                  lineHeight: "58px",
                  letterSpacing: "-0.96px",
                  marginTop: 16,
                }}
              >
                How to Apply for Your Medical Card?
              </SeqChars>
              <SeqLines
                className="mx-auto text-center text-[#DFF8EC]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: "28px",
                  letterSpacing: "-0.32px",
                  marginTop: 16,
                  maxWidth: 984,
                }}
                lines={[
                  "You can apply for a medical card in three simple steps:",
                ]}
              />
            </TextSequence>

            {/* Connector dot + line beneath whichever badge is centered — the
                dot sits exactly on the ring (angle 0, RING_RADIUS). */}
            <Image
              src="/point.svg"
              alt="Step indicator point"
              width={12}
              height={12}
              className="pointer-events-none absolute"
              style={{ left: RING_CENTER.x - 6, top: pointOnRing(0, RING_RADIUS).y - 6 }}
            />
            <Image
              ref={lineRef}
              src="/line.svg"
              alt="Step connector line"
              width={1}
              height={126}
              className="pointer-events-none absolute"
              style={{ left: RING_CENTER.x, top: pointOnRing(0, RING_RADIUS).y + 6 + 42 }}
            />

            {/* Step badges: laid out at the ring's top point; gsap sweeps each
                one along the arc to its current angle as you scroll, fading
                out any step that isn't the active one or a neighbor. */}
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => {
                  badgeRefs.current[i] = el;
                }}
                className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-[#DFF8EC] bg-[#DFF8EC]"
                style={{ left: pointOnRing(0, BUBBLE_RADIUS).x - 24, top: pointOnRing(0, BUBBLE_RADIUS).y - 24 }}
              >
                <span
                  className="text-primary"
                  style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 32, fontWeight: 700, letterSpacing: "-0.64px" }}
                >
                  {step.number}
                </span>
              </div>
            ))}

            {/* Step content: all stacked at the same spot, cross-fading so only
                the centered step's copy shows. */}
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => {
                  contentRefs.current[i] = el;
                }}
                className="absolute flex flex-col items-center gap-6 text-center"
                style={{ left: 409, top: TOP + 650, width: 621 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <h3
                    className="text-[#FAFAF8]"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 40,
                      fontWeight: 700,
                      lineHeight: "48px",
                      letterSpacing: "-0.8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[#DFF8EC]"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 18,
                      fontWeight: 400,
                      lineHeight: "28px",
                      letterSpacing: "-0.32px",
                      maxWidth: 528,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
                <a
                  href="#book-consultation"
                  className="rounded-full bg-[#DFF8EC] px-9 py-2 text-base font-semibold leading-[26px] tracking-[-0.32px] text-primary"
                >
                  Book My Consultation
                </a>
              </div>
            ))}
          </FigmaCanvas>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <>
      <MobileProcessSection />
      <DesktopProcessSection />
    </>
  );
}
