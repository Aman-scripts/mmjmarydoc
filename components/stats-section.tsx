"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FigmaCanvas } from "@/components/figma-canvas";
import ScrollFloat from "@/components/ScrollFloat";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 83), each
// offset relative to this section's own top-left corner. Figma's 100px gap
// before/after this block is dropped on the pinned desktop layout so the
// canvas isn't fighting the fixed h-screen viewport for vertical room.
const TOP = 0;
const BOTTOM = 0;
const CONTAINER = { left: 185, width: 1069 };

const stats = [
  {
    left: 0,
    number: "100%",
    label: ["Licensed"],
    lastLinePrefix: "",
    lastWord: "Doctors",
    labelLeft: 208,
    underlineLeft: 278,
  },
  {
    left: 654,
    number: "30+",
    label: ["Trusted by"],
    lastLinePrefix: "Patients in ",
    lastWord: "States",
    labelLeft: 798 - 654,
    underlineLeft: 1002 - 654,
  },
];

// Coordinates lifted 1:1 from the Figma mobile frame (286:6205 -> Mobile ->
// Frame 83), each offset relative to this block's own top-left corner.
const MOBILE_STATS = [
  {
    number: "100%",
    numberBox: { left: 35, top: 78, width: 196, height: 90 },
    label: ["Licensed"],
    lastLinePrefix: "",
    lastWord: "Doctors",
    labelBox: { left: 190, top: 157, width: 88 },
    underline: { left: 209, top: 217 },
  },
  {
    number: "30+",
    numberBox: { left: 52, top: 264, width: 147, height: 90 },
    label: ["Trusted by"],
    lastLinePrefix: "Patients in ",
    lastWord: "States",
    labelBox: { left: 168, top: 334, width: 162 },
    underline: { left: 263, top: 397 },
  },
];

const clamp = (n: number) => Math.max(0, Math.min(1, n));

// Draws an SVG number by animating stroke-dashoffset: dasharray = measured
// length, offset goes len -> 0 as the section scrolls through its pin.
function NumberDraw({
  value,
  box,
  fontSize,
  textY,
  offset,
  len,
  textRef,
}: {
  value: string;
  box: { left: number; top: number; width: number; height: number };
  fontSize: number;
  textY: number;
  offset: number;
  len: number;
  textRef: (el: SVGTextElement | null) => void;
}) {
  const done = offset <= 0.5;
  return (
    <svg
      className="absolute overflow-visible"
      style={{ left: box.left, top: box.top, width: box.width, height: box.height }}
      viewBox={`0 0 ${box.width} ${box.height}`}
    >
      <text
        ref={textRef}
        x={0}
        y={textY}
        fontFamily="var(--font-space-grotesk)"
        fontWeight={700}
        fontSize={fontSize}
        stroke="#4C8C1A"
        strokeWidth={2}
        strokeOpacity={0.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: len || 9999,
          strokeDashoffset: offset,
          fill: done ? "#4C8C1A" : "transparent",
          fillOpacity: 0.5,
          transition: "fill 0.4s ease",
        }}
      >
        {value}
      </text>
    </svg>
  );
}

export function StatsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const mobileTextRefs = useRef<Array<SVGTextElement | null>>([null, null]);
  const desktopTextRefs = useRef<Array<SVGTextElement | null>>([null, null]);

  // Rough estimates used until the real glyph lengths are measured below —
  // must be non-zero, otherwise strokeDashoffset (len * (1 - progress))
  // collapses to 0 and the number renders fully drawn from the very start.
  const [mobileLen, setMobileLen] = useState([560, 420]);
  const [desktopLen, setDesktopLen] = useState([840, 630]);
  const [p, setP] = useState(0);

  // Measure the real glyph path lengths once fonts are ready, then let
  // ScrollTrigger know the layout is settled.
  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      const mLens = mobileTextRefs.current.map((el, i) =>
        el && el.getComputedTextLength() > 0 ? el.getComputedTextLength() * 3 : mobileLen[i]
      );
      const dLens = desktopTextRefs.current.map((el, i) =>
        el && el.getComputedTextLength() > 0 ? el.getComputedTextLength() * 3 : desktopLen[i]
      );
      setMobileLen(mLens);
      setDesktopLen(dLens);
      ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drive a single progress value (0-1) off ScrollTrigger, matching the same
  // trigger/scrub convention used by the other pinned sections in this app
  // (see values-section.tsx / process-section.tsx) instead of a hand-rolled
  // scroll listener, so this section's pin geometry stays correctly in sync
  // with the rest of the page (a desynced pin here was throwing off every
  // ScrollTrigger-based section that follows it).
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => setP(self.progress),
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const headingOpacity = clamp(p / 0.06);

  const num0P = clamp((p - 0.06) / 0.32);
  const num1P = clamp((p - 0.5) / 0.32);
  const mobileOffset = [mobileLen[0] * (1 - num0P), mobileLen[1] * (1 - num1P)];
  const desktopOffset = [desktopLen[0] * (1 - num0P), desktopLen[1] * (1 - num1P)];

  const labelOpacity = [clamp((p - 0.38) / 0.12), clamp((p - 0.82) / 0.12)];
  const underlineP = [clamp((p - 0.4) / 0.1), clamp((p - 0.84) / 0.1)];

  return (
    <div ref={wrapperRef} style={{ height: "240vh" }}>
      <section className="sticky top-0 flex items-start justify-center overflow-hidden py-10 lg:py-16">
        <div className="w-full">
          <div className="px-5 sm:px-8 lg:hidden">
            <FigmaCanvas width={358} height={417} className="mx-auto">
              <h2
                className="absolute text-left text-primary"
                style={{
                  left: 0,
                  top: 0,
                  width: 358,
                  fontFamily: "var(--font-sans)",
                  fontSize: 32,
                  fontWeight: 700,
                  lineHeight: "40px",
                  letterSpacing: "-0.64px",
                  opacity: headingOpacity,
                }}
              >
                <ScrollFloat as="span">Find Care in</ScrollFloat>{" "}
                <ScrollFloat as="span" containerClassName="italic text-accent">
                  your state
                </ScrollFloat>
              </h2>

              {MOBILE_STATS.map((stat, i) => (
                <div key={stat.number}>
                  <NumberDraw
                    value={stat.number}
                    box={stat.numberBox}
                    fontSize={80}
                    textY={72}
                    offset={mobileOffset[i]}
                    len={mobileLen[i]}
                    textRef={(el) => {
                      mobileTextRefs.current[i] = el;
                    }}
                  />
                  <p
                    className="absolute text-primary"
                    style={{
                      ...stat.labelBox,
                      fontFamily: "var(--font-sans)",
                      fontSize: 20,
                      fontWeight: 700,
                      lineHeight: "28px",
                      letterSpacing: "-0.4px",
                      opacity: labelOpacity[i],
                    }}
                  >
                    {stat.label.map((line) => (
                      <span key={line} className="block whitespace-nowrap">
                        {line}
                      </span>
                    ))}
                    <span className="block whitespace-nowrap">
                      {stat.lastLinePrefix}
                      <span className="text-accent">{stat.lastWord}</span>
                    </span>
                  </p>
                  <span
                    className="absolute rounded-full"
                    style={{
                      left: stat.underline.left,
                      top: stat.underline.top,
                      width: 77,
                      height: 4,
                      background:
                        "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
                      opacity: underlineP[i] > 0 ? 1 : 0,
                      transform: `scaleX(${underlineP[i]})`,
                      transformOrigin: "left center",
                    }}
                  />
                </div>
              ))}
            </FigmaCanvas>
          </div>

          <div className="hidden lg:block">
            <FigmaCanvas width={1440} height={TOP + 345 + BOTTOM} className="mx-auto">
              <h2
                className="absolute text-center text-primary"
                style={{
                  left: CONTAINER.left,
                  top: TOP,
                  width: CONTAINER.width,
                  fontFamily: "var(--font-sans)",
                  fontSize: 48,
                  fontWeight: 700,
                  lineHeight: "58px",
                  letterSpacing: "-0.96px",
                  opacity: headingOpacity,
                }}
              >
                <ScrollFloat as="span">Find Care in</ScrollFloat>{" "}
                <ScrollFloat as="span" containerClassName="italic text-accent">
                  your state
                </ScrollFloat>
              </h2>

              <div
                className="absolute"
                style={{ left: CONTAINER.left, top: TOP + 114, width: CONTAINER.width, height: 231 }}
              >
                {stats.map((stat, i) => (
                  <div key={stat.number} className="absolute" style={{ left: stat.left, top: 0, width: 415, height: 231 }}>
                    <NumberDraw
                      value={stat.number}
                      box={{ left: 0, top: 0, width: 415, height: 155 }}
                      fontSize={120}
                      textY={124}
                      offset={desktopOffset[i]}
                      len={desktopLen[i]}
                      textRef={(el) => {
                        desktopTextRefs.current[i] = el;
                      }}
                    />
                    <p
                      className="absolute text-primary"
                      style={{
                        left: stat.labelLeft,
                        top: 141,
                        fontFamily: "var(--font-sans)",
                        fontSize: 32,
                        fontWeight: 700,
                        lineHeight: "40px",
                        letterSpacing: "-0.64px",
                        opacity: labelOpacity[i],
                      }}
                    >
                      {stat.label.map((line) => (
                        <span key={line} className="block whitespace-nowrap">
                          {line}
                        </span>
                      ))}
                      <span className="block whitespace-nowrap">
                        {stat.lastLinePrefix}
                        <span className="text-accent">{stat.lastWord}</span>
                      </span>
                    </p>
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: stat.underlineLeft,
                        top: 227,
                        width: 77,
                        height: 4,
                        background:
                          "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
                        opacity: underlineP[i] > 0 ? 1 : 0,
                        transform: `scaleX(${underlineP[i]})`,
                        transformOrigin: "left center",
                      }}
                    />
                  </div>
                ))}
              </div>
            </FigmaCanvas>
          </div>
        </div>
      </section>
    </div>
  );
}
