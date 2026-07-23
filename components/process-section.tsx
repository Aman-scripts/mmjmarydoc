"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FigmaCanvas } from "@/components/figma-canvas";
import { MobileProcessCarousel } from "@/components/mobile-process-carousel";
import { RevealOnView } from "@/components/reveal-on-view";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Coordinates lifted 1:1 from the Figma frame (62:139 -> instance "Steps",
// 83:332), each offset relative to this section's own top-left corner.
const TOP = 0;
// No trailing padding — the section should end right at the ring's own
// bottom edge (937), not leave empty space below it.
const BOTTOM = 0;

const mobileGradient = {
  background:
    "linear-gradient(315deg, #4C8C1A 0%, #1D6540 32.2%, #0E5A4D 72.1%, #071D1A 100%)",
} as const;

const steps = [
  {
    number: 1,
    title: "Book Your Appointment",
    description:
      "Provide your basic details and medical history through our HIPAA-compliant form. Schedule your consultation at your chosen time from the comfort of your home.",
  },
  {
    number: 2,
    title: "Consult with MMJ Doctor",
    description:
      "Connect with our licensed MMJ Doctor via a video or audio call. The doctor will review your medical condition and determine eligibility under your state's medical cannabis program.",
  },
  {
    number: 3,
    title: "Receive Your Recommendation",
    description:
      "If approved, your MMJ recommendation is emailed within 24-48 hours, allowing you to buy medical cannabis from licensed dispensaries.",
  },
];

const STEP_COUNT = steps.length;

// ellipse.svg is a circle of radius 491.5 cropped to its top half, drawn at
// canvas (228, TOP+471) with a 984x466 viewBox — so its true center sits at
// (228+492, TOP+471+492) and badges travel along that same circle's arc.
const RING_CENTER = { x: 720, y: TOP + 963 };
const RING_RADIUS = 491.5;
// Badges float this far past the ring itself (dot-on-ring, bubble-beyond-it,
// same relationship as the reference wheel's dot vs. bubble radii).
const BUBBLE_RADIUS = 585;
// How far round the arc a neighbor sits from the centered (top, 0deg) step —
// matches the original hand-placed corner positions almost exactly.
const NEIGHBOR_ANGLE = 79;

function pointOnRing(angleDeg: number, radius: number, center = RING_CENTER) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: center.x + radius * Math.sin(rad), y: center.y - radius * Math.cos(rad) };
}

// For step i, which arc angle it sits at while step `active` is centered —
// only the active step and its two immediate ring-neighbors (wrapping) are
// ever shown; with more than 3 steps, everything else fades out until it
// becomes a neighbor again. Returns null for "not currently visible."
function angleFor(i: number, active: number): number | null {
  if (i === active) return 0;
  if (i === (active + 1) % STEP_COUNT) return NEIGHBOR_ANGLE;
  if (i === (active - 1 + STEP_COUNT) % STEP_COUNT) return -NEIGHBOR_ANGLE;
  return null;
}

function MobileProcessSection() {
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
        xPercent: -(100 * (STEP_COUNT - 1)) / STEP_COUNT,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top+=250px",
          end: `+=${(STEP_COUNT - 1) * window.innerHeight}`,
          scrub: true,
          pin: pinRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            setActive(Math.round(self.progress * (STEP_COUNT - 1)));
          },
          onToggle: (self) => {
            document.body.classList.toggle("process-pinned", self.isActive);
          },
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger ?? null;
    }, wrapperRef);

    return () => {
      ctx.revert();
      document.body.classList.remove("process-pinned");
    };
  }, []);

  function scrollToIndex(index: number) {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const target = st.start + (st.end - st.start) * (index / (STEP_COUNT - 1));
    gsap.to(window, { scrollTo: target, duration: 0.6, ease: "power2.out" });
  }

  return (
    <section className="relative w-full overflow-hidden lg:hidden" ref={wrapperRef}>
      <div ref={pinRef} className="w-full px-5 py-16 sm:px-8" style={mobileGradient}>
        <RevealOnView className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-[#DFF8EC] px-4 py-0.5 text-xs font-normal text-primary">
            Process
          </span>
          <h2
            className="text-[#FAFAF8]"
            style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.75rem, 7vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Three Simple Steps to Apply for Your Medical Marijuana Card
          </h2>
          <p className="italic text-[#DFF8EC]" style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: "26px" }}>
            You need to follow a three-step process designed to prioritize your
            convenience and care. Every evaluation is conducted by a
            state-licensed MMJ doctor, giving you a reliable way to obtain your
            medical marijuana recommendation
          </p>
        </RevealOnView>

        <div className="relative mt-8">
          {/* Full-width divider (Figma "Line 5") sitting behind the badge's
              connector dot — a plain straight line, not an arc/ring. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-px bg-white"
            style={{ top: 91 }}
          />
          <MobileProcessCarousel ref={trackRef} steps={steps} active={active} onDotClick={scrollToIndex} />
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
              alt=""
              width={984}
              height={466}
              className="pointer-events-none absolute"
              style={{ left: 228, top: TOP + 471 }}
            />

            {/* Header: process tag + heading + subcopy */}
            <div className="absolute" style={{ left: 228, top: TOP + 70, width: 984 }}>
              <span
                className="mx-auto block w-fit rounded-full bg-[#DFF8EC] px-4 py-0.5 text-xs font-normal leading-[18px] tracking-[-0.24px] text-primary"
                style={{ marginBottom: 16 }}
              >
                Process
              </span>
              <h2
                className="text-center text-[#FAFAF8]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 48,
                  fontWeight: 700,
                  lineHeight: "58px",
                  letterSpacing: "-0.96px",
                  marginTop: 16,
                }}
              >
                Three Simple Steps to Apply for Your Medical Marijuana Card
              </h2>
              <p
                className="mx-auto text-center italic text-[#DFF8EC]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: "26px",
                  letterSpacing: "-0.32px",
                  marginTop: 16,
                  maxWidth: 984,
                }}
              >
                You need to follow a three-step process designed to prioritize your
                convenience and care. Every evaluation is conducted by a
                state-licensed MMJ doctor, giving you a reliable way to obtain your
                medical marijuana recommendation
              </p>
            </div>

            {/* Connector dot + line beneath whichever badge is centered — the
                dot sits exactly on the ring (angle 0, RING_RADIUS). */}
            <Image
              src="/point.svg"
              alt=""
              width={12}
              height={12}
              className="pointer-events-none absolute"
              style={{ left: RING_CENTER.x - 6, top: pointOnRing(0, RING_RADIUS).y - 6 }}
            />
            <Image
              ref={lineRef}
              src="/line.svg"
              alt=""
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
                    className="italic text-[#DFF8EC]"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: "26px",
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
