"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FigmaCanvas } from "@/components/figma-canvas";
import ScrollFloat from "@/components/ScrollFloat";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 88, 86:724),
// each offset relative to this section's own top-left corner (4899, 2504).
const TOP = 100;
const BOTTOM = 40;
const HEADING = { left: 169, top: TOP + 0, width: 357 };
const PARAGRAPH = { left: 712, top: TOP + 0, width: 555 };
const IMAGE_OVAL = { left: 171, top: TOP + 245, width: 284, height: 391 };
const IMAGE_MAIN = { left: 355, top: TOP + 421, width: 783, height: 434 };
const IMAGE_SMALL = { left: 999, top: TOP + 774, width: 282, height: 188 };
const LEAF_BOTTOM_LEFT = { left: 115, top: TOP + 618, width: 468, height: 454 };
const LEAF_TOP_RIGHT = { left: 936, top: TOP + 311, width: 336, height: 351 };
const CANVAS_H = TOP + 1072 + BOTTOM;

const COPY = `For years, getting a medical marijuana card meant navigating confusing websites or impersonal clinics. Many patients living with chronic pain, anxiety, PTSD, and other qualifying conditions were left feeling judged while searching for safe, legitimate care.\n\nMaryDoc was created to change that. We connect patients with licensed physicians for secure online evaluations, making access to medical cannabis simple, trusted, and compassionate. Our mission is to provide a seamless, transparent experience that puts patients first—making quality care more accessible across 30+ states.`;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function FeaturesDesktop() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const leafLeftRef = useRef<HTMLDivElement>(null);
  const leafRightRef = useRef<HTMLDivElement>(null);
  const ovalRevealRef = useRef<HTMLDivElement>(null);
  const ovalParallaxRef = useRef<HTMLDivElement>(null);
  const mainRevealRef = useRef<HTMLDivElement>(null);
  const mainParallaxRef = useRef<HTMLDivElement>(null);
  const smallRevealRef = useRef<HTMLDivElement>(null);
  const smallParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      const paragraph = paragraphRef.current;
      const leafLeft = leafLeftRef.current;
      const leafRight = leafRightRef.current;
      const ovalReveal = ovalRevealRef.current;
      const ovalParallax = ovalParallaxRef.current;
      const mainReveal = mainRevealRef.current;
      const mainParallax = mainParallaxRef.current;
      const smallReveal = smallRevealRef.current;
      const smallParallax = smallParallaxRef.current;
      if (
        !heading ||
        !paragraph ||
        !leafLeft ||
        !leafRight ||
        !ovalReveal ||
        !ovalParallax ||
        !mainReveal ||
        !mainParallax ||
        !smallReveal ||
        !smallParallax
      ) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set(
          [heading, paragraph, leafLeft, leafRight, ovalReveal, mainReveal, smallReveal],
          { opacity: 1, clearProps: "transform" }
        );
        return;
      }

      gsap.set(heading, { opacity: 0, y: 36 });
      gsap.set(paragraph, { opacity: 0, y: 28 });
      gsap.set(leafLeft, { opacity: 0, x: -40, rotate: -8, transformOrigin: "center" });
      gsap.set(leafRight, { opacity: 0, x: 40, rotate: 8, transformOrigin: "center" });
      gsap.set(ovalReveal, { opacity: 0, x: -56, scale: 0.92, transformOrigin: "center" });
      gsap.set(mainReveal, { opacity: 0, y: 64, scale: 0.94, transformOrigin: "center top" });
      gsap.set(smallReveal, { opacity: 0, x: 48, y: 24, scale: 0.92, transformOrigin: "center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(heading, { opacity: 1, y: 0, duration: 0.85 }, 0)
        .to(paragraph, { opacity: 1, y: 0, duration: 0.85 }, 0.12)
        .to(leafLeft, { opacity: 0.5, x: 0, rotate: 0, duration: 1.1 }, 0.18)
        .to(leafRight, { opacity: 0.5, x: 0, rotate: 0, duration: 1.1 }, 0.22)
        .to(ovalReveal, { opacity: 1, x: 0, scale: 1, duration: 0.95 }, 0.28)
        .to(mainReveal, { opacity: 1, y: 0, scale: 1, duration: 1.05 }, 0.38)
        .to(smallReveal, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.9 }, 0.55);

      const scrubBase = { trigger: section, start: "top bottom", end: "bottom top" } as const;
      gsap.to(ovalParallax, {
        y: -28,
        ease: "none",
        scrollTrigger: { ...scrubBase, scrub: 1.2 },
      });
      gsap.to(mainParallax, {
        y: -18,
        ease: "none",
        scrollTrigger: { ...scrubBase, scrub: 1.2 },
      });
      gsap.to(smallParallax, {
        y: -36,
        ease: "none",
        scrollTrigger: { ...scrubBase, scrub: 1.2 },
      });
      gsap.to(leafLeft, {
        y: 24,
        rotate: -4,
        ease: "none",
        scrollTrigger: { ...scrubBase, scrub: 1.4 },
      });
      gsap.to(leafRight, {
        y: -20,
        rotate: 4,
        ease: "none",
        scrollTrigger: { ...scrubBase, scrub: 1.4 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative hidden bg-background lg:block">
      <FigmaCanvas width={1440} height={CANVAS_H} className="mx-auto">
        <h2
          ref={headingRef}
          className="absolute text-primary"
          style={{
            ...HEADING,
            fontFamily: "var(--font-sans)",
            fontSize: 48,
            fontWeight: 700,
            lineHeight: "58px",
            letterSpacing: "-0.96px",
          }}
        >
          <ScrollFloat as="span">Making</ScrollFloat>{" "}
          <ScrollFloat as="span" containerClassName="italic text-accent">
            Medical Cannabis
          </ScrollFloat>{" "}
          <ScrollFloat as="span">More Accessible</ScrollFloat>
        </h2>

        <p
          ref={paragraphRef}
          className="absolute whitespace-pre-line italic text-muted-foreground"
          style={{
            ...PARAGRAPH,
            fontSize: 18,
            fontWeight: 400,
            lineHeight: "28px",
            letterSpacing: "-0.36px",
          }}
        >
          {COPY}
        </p>

        <div
          ref={leafLeftRef}
          className="pointer-events-none absolute opacity-50 will-change-transform"
          style={{ ...LEAF_BOTTOM_LEFT }}
        >
          <Image src="/left-bottom.webp" alt="" fill className="object-contain" sizes="468px" />
        </div>
        <div
          ref={leafRightRef}
          className="pointer-events-none absolute opacity-50 will-change-transform"
          style={{ ...LEAF_TOP_RIGHT }}
        >
          <Image src="/right-top.webp" alt="" fill className="object-contain" sizes="336px" />
        </div>

        <div ref={mainParallaxRef} className="absolute will-change-transform" style={{ ...IMAGE_MAIN }}>
          <div
            ref={mainRevealRef}
            className="relative h-full w-full overflow-hidden rounded-[20px]"
          >
            <Image src="/image1.webp" alt="Cannabis plant" fill className="object-cover" sizes="783px" />
          </div>
        </div>

        <div ref={ovalParallaxRef} className="absolute will-change-transform" style={{ ...IMAGE_OVAL }}>
          <div
            ref={ovalRevealRef}
            className="relative h-full w-full overflow-hidden rounded-full shadow-lg"
          >
            <Image
              src="/Image2.webp"
              alt="Holding tincture bottles"
              fill
              className="object-cover"
              sizes="284px"
            />
          </div>
        </div>

        <div ref={smallParallaxRef} className="absolute will-change-transform" style={{ ...IMAGE_SMALL }}>
          <div
            ref={smallRevealRef}
            className="relative h-full w-full overflow-hidden rounded-[20px]"
          >
            <Image
              src="/image3.webp"
              alt="Doctor consultation supplies"
              fill
              className="object-cover"
              sizes="282px"
            />
          </div>
        </div>
      </FigmaCanvas>
    </section>
  );
}

function FeaturesMobile() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const ovalRevealRef = useRef<HTMLDivElement>(null);
  const ovalParallaxRef = useRef<HTMLDivElement>(null);
  const mainRevealRef = useRef<HTMLDivElement>(null);
  const mainParallaxRef = useRef<HTMLDivElement>(null);
  const smallRevealRef = useRef<HTMLDivElement>(null);
  const smallParallaxRef = useRef<HTMLDivElement>(null);
  const leafLeftRef = useRef<HTMLDivElement>(null);
  const leafRightRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      const collage = collageRef.current;
      const copy = copyRef.current;
      const ovalReveal = ovalRevealRef.current;
      const ovalParallax = ovalParallaxRef.current;
      const mainReveal = mainRevealRef.current;
      const mainParallax = mainParallaxRef.current;
      const smallReveal = smallRevealRef.current;
      const smallParallax = smallParallaxRef.current;
      const leafLeft = leafLeftRef.current;
      const leafRight = leafRightRef.current;
      const chip = chipRef.current;
      if (
        !heading ||
        !collage ||
        !copy ||
        !ovalReveal ||
        !ovalParallax ||
        !mainReveal ||
        !mainParallax ||
        !smallReveal ||
        !smallParallax ||
        !leafLeft ||
        !leafRight ||
        !chip
      ) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set(
          [heading, copy, ovalReveal, mainReveal, smallReveal, leafLeft, leafRight, chip],
          { opacity: 1, clearProps: "transform" }
        );
        return;
      }

      gsap.set(heading, { opacity: 0, y: 28 });
      gsap.set(copy, { opacity: 0, y: 24 });
      gsap.set(leafLeft, { opacity: 0, x: -20, rotate: -6 });
      gsap.set(leafRight, { opacity: 0, x: 20, rotate: 6 });
      gsap.set(ovalReveal, { opacity: 0, x: -28, scale: 0.9 });
      gsap.set(mainReveal, { opacity: 0, y: 36, scale: 0.94 });
      gsap.set(smallReveal, { opacity: 0, x: 24, y: 16, scale: 0.9 });
      gsap.set(chip, { opacity: 0, scale: 0.85 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(heading, { opacity: 1, y: 0, duration: 0.7 }, 0)
        .to(leafLeft, { opacity: 0.5, x: 0, rotate: 0, duration: 0.85 }, 0.08)
        .to(leafRight, { opacity: 0.5, x: 0, rotate: 0, duration: 0.85 }, 0.12)
        .to(ovalReveal, { opacity: 1, x: 0, scale: 1, duration: 0.75 }, 0.16)
        .to(mainReveal, { opacity: 1, y: 0, scale: 1, duration: 0.85 }, 0.24)
        .to(smallReveal, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7 }, 0.36)
        .to(chip, { opacity: 1, scale: 1, duration: 0.55 }, 0.42)
        .to(copy, { opacity: 1, y: 0, duration: 0.75 }, 0.4);

      const scrubBase = { trigger: collage, start: "top bottom", end: "bottom top" } as const;
      gsap.to(ovalParallax, {
        y: -16,
        ease: "none",
        scrollTrigger: { ...scrubBase, scrub: 1.1 },
      });
      gsap.to(mainParallax, {
        y: -10,
        ease: "none",
        scrollTrigger: { ...scrubBase, scrub: 1.1 },
      });
      gsap.to(smallParallax, {
        y: -20,
        ease: "none",
        scrollTrigger: { ...scrubBase, scrub: 1.1 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 lg:hidden"
    >
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <h2
          ref={headingRef}
          className="text-primary"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          <ScrollFloat as="span">Making</ScrollFloat>{" "}
          <ScrollFloat as="span" containerClassName="italic text-accent">
            Medical
          </ScrollFloat>
          <br />
          <ScrollFloat as="span" containerClassName="italic text-accent">
            Cannabis
          </ScrollFloat>{" "}
          <ScrollFloat as="span">More</ScrollFloat>
          <br />
          <ScrollFloat as="span">Accessible</ScrollFloat>
        </h2>

        <div ref={collageRef} className="relative mt-4">
          <FigmaCanvas width={350} height={262} style={{ overflow: "visible" }}>
            <div
              ref={leafLeftRef}
              className="pointer-events-none absolute opacity-50"
              style={{ left: -17, top: 136, width: 147, height: 139 }}
            >
              <Image src="/left-bottom.webp" alt="" fill className="object-contain" sizes="147px" />
            </div>
            <div
              ref={leafRightRef}
              className="pointer-events-none absolute opacity-50"
              style={{ left: 241, top: 24, width: 106, height: 128 }}
            >
              <Image src="/right-top.webp" alt="" fill className="object-contain" sizes="106px" />
            </div>

            <div
              ref={mainParallaxRef}
              className="absolute will-change-transform"
              style={{ left: 60, top: 56, width: 248, height: 137 }}
            >
              <div
                ref={mainRevealRef}
                className="relative h-full w-full overflow-hidden rounded-2xl"
              >
                <Image src="/image1.webp" alt="Cannabis plant" fill className="object-cover" sizes="248px" />
              </div>
            </div>
            <div
              ref={ovalParallaxRef}
              className="absolute will-change-transform"
              style={{ left: 1, top: 0, width: 90, height: 124 }}
            >
              <div
                ref={ovalRevealRef}
                className="relative h-full w-full overflow-hidden rounded-full shadow-lg"
              >
                <Image
                  src="/Image2.webp"
                  alt="Holding tincture bottles"
                  fill
                  className="object-cover"
                  sizes="90px"
                />
              </div>
            </div>
            <div
              ref={smallParallaxRef}
              className="absolute will-change-transform"
              style={{ left: 261, top: 168, width: 89, height: 60 }}
            >
              <div
                ref={smallRevealRef}
                className="relative h-full w-full overflow-hidden rounded-2xl"
              >
                <Image
                  src="/image3.webp"
                  alt="Doctor consultation supplies"
                  fill
                  className="object-cover"
                  sizes="89px"
                />
              </div>
            </div>
            <span
              ref={chipRef}
              className="absolute flex items-center justify-center rounded-full bg-[#DFF8EC] text-xs font-semibold text-primary shadow-sm"
              style={{ left: 133, top: 156, width: 101, height: 27 }}
            >
              Select State
            </span>
          </FigmaCanvas>
        </div>

        <div
          ref={copyRef}
          className="flex flex-col gap-4 whitespace-pre-line italic text-muted-foreground"
          style={{ fontSize: 16, lineHeight: "26px" }}
        >
          {COPY}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <>
      <FeaturesMobile />
      <FeaturesDesktop />
    </>
  );
}
