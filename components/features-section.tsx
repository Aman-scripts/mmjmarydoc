"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FigmaCanvas } from "@/components/figma-canvas";
import { TextSequence, SeqChars, SeqLines } from "@/components/text-sequence";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}



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

const COPY_LINES = [
  "Patients may explore their options when symptoms such as chronic pain, nausea, or sleep difficulties affect daily life. For some, it may be an option they want to discuss after exploring other approaches.",
  "Having these symptoms or conditions alone does not mean you qualify for medical care. Eligibility varies by state and must be determined through an evaluation by a licensed physician. With MaryDoc, patients can navigate this process with a clearer understanding of what to expect and what options may be available to them.",
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function FeaturesDesktop() {
  const sectionRef = useRef<HTMLElement>(null);
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
      const leafLeft = leafLeftRef.current;
      const leafRight = leafRightRef.current;
      const ovalReveal = ovalRevealRef.current;
      const ovalParallax = ovalParallaxRef.current;
      const mainReveal = mainRevealRef.current;
      const mainParallax = mainParallaxRef.current;
      const smallReveal = smallRevealRef.current;
      const smallParallax = smallParallaxRef.current;
      if (
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
        gsap.set([leafLeft, leafRight, ovalReveal, mainReveal, smallReveal], {
          opacity: 1,
          clearProps: "transform",
        });
        return;
      }

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

      tl.to(leafLeft, { opacity: 0.5, x: 0, rotate: 0, duration: 1.1 }, 0.18)
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
        <TextSequence className="absolute" style={{ left: HEADING.left, top: HEADING.top, width: 1098 }}>
          <h2
            className="text-primary"
            style={{
              width: HEADING.width,
              fontFamily: "var(--font-sans)",
              fontSize: 48,
              fontWeight: 700,
              lineHeight: "58px",
              letterSpacing: "-0.96px",
            }}
          >
            <SeqChars>Why Do Patients</SeqChars>{" "}
            <SeqChars>Consider Medical Care?</SeqChars>
          </h2>
          <SeqLines
            className="absolute text-muted-foreground"
            style={{
              left: PARAGRAPH.left - HEADING.left,
              top: 0,
              width: PARAGRAPH.width,
              fontSize: 18,
              fontWeight: 400,
              lineHeight: "28px",
              letterSpacing: "-0.36px",
            }}
            lines={COPY_LINES}
          />
        </TextSequence>

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
            <Image src="/features-section-center.png" alt="Cannabis plant" fill className="object-cover" sizes="783px" />
          </div>
        </div>

        <div ref={ovalParallaxRef} className="absolute will-change-transform" style={{ ...IMAGE_OVAL }}>
          <div
            ref={ovalRevealRef}
            className="relative h-full w-full overflow-hidden rounded-full shadow-lg"
          >
            <Image
              src="/features-section-top.png"
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
              src="/features-section-bottom.png"
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
  const collageRef = useRef<HTMLDivElement>(null);
  const ovalRevealRef = useRef<HTMLDivElement>(null);
  const ovalParallaxRef = useRef<HTMLDivElement>(null);
  const mainRevealRef = useRef<HTMLDivElement>(null);
  const mainParallaxRef = useRef<HTMLDivElement>(null);
  const smallRevealRef = useRef<HTMLDivElement>(null);
  const smallParallaxRef = useRef<HTMLDivElement>(null);
  const leafLeftRef = useRef<HTMLDivElement>(null);
  const leafRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const collage = collageRef.current;
      const ovalReveal = ovalRevealRef.current;
      const ovalParallax = ovalParallaxRef.current;
      const mainReveal = mainRevealRef.current;
      const mainParallax = mainParallaxRef.current;
      const smallReveal = smallRevealRef.current;
      const smallParallax = smallParallaxRef.current;
      const leafLeft = leafLeftRef.current;
      const leafRight = leafRightRef.current;
      if (
        !collage ||
        !ovalReveal ||
        !ovalParallax ||
        !mainReveal ||
        !mainParallax ||
        !smallReveal ||
        !smallParallax ||
        !leafLeft ||
        !leafRight
      ) {
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set([ovalReveal, mainReveal, smallReveal, leafLeft, leafRight], {
          opacity: 1,
          clearProps: "transform",
        });
        return;
      }

      gsap.set(leafLeft, { opacity: 0, x: -20, rotate: -6 });
      gsap.set(leafRight, { opacity: 0, x: 20, rotate: 6 });
      gsap.set(ovalReveal, { opacity: 0, x: -28, scale: 0.9 });
      gsap.set(mainReveal, { opacity: 0, y: 36, scale: 0.94 });
      gsap.set(smallReveal, { opacity: 0, x: 24, y: 16, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(leafLeft, { opacity: 0.5, x: 0, rotate: 0, duration: 0.85 }, 0.08)
        .to(leafRight, { opacity: 0.5, x: 0, rotate: 0, duration: 0.85 }, 0.12)
        .to(ovalReveal, { opacity: 1, x: 0, scale: 1, duration: 0.75 }, 0.16)
        .to(mainReveal, { opacity: 1, y: 0, scale: 1, duration: 0.85 }, 0.24)
        .to(smallReveal, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7 }, 0.36);

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
        <TextSequence>
          <h2
            className="text-center text-primary"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            <SeqChars>Why Do Patients</SeqChars>{" "}
            <SeqChars>Consider Medical Care?</SeqChars>
          </h2>
        </TextSequence>

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
                <Image src="/features-section-center.png" alt="Cannabis plant" fill className="object-cover" sizes="248px" />
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
          </FigmaCanvas>
        </div>

        <TextSequence>
          <SeqLines
            className="text-muted-foreground"
            style={{ fontSize: 18, lineHeight: "28px" }}
            lines={COPY_LINES}
          />
        </TextSequence>
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
