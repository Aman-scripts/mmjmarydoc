"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FigmaCanvas } from "@/components/figma-canvas";
import { generatePebbleField, pebbleImage } from "@/components/soil-pebbles";
import ScrollFloat from "@/components/ScrollFloat";
import { mobileHeaderOffsetPx, scrollStartBelowMobileHeader } from "@/lib/utils";
import { SOIL_COLOR } from "@/lib/soil";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOP = 0;
const BOTTOM = 0;
const CONTAINER = { left: 185, width: 1069 };


const SOIL_BG = `linear-gradient(180deg, ${SOIL_COLOR} 0%, #6F4A30 20%, #5E3F28 45%, #4F3521 70%, #432C1B 88%, #382416 100%)`;

/**
 * Small pebbles scattered across the whole soil track (not tiled — this
 * section is 150vh tall, and repeating even an irregular swatch that many
 * times still stamps a visible grid). One non-repeating random field, sized
 * to the full track, so no periodicity shows. Flat, hard-edged dots — same
 * language as the pebbles baked into public/hero-soil.png (see
 * soil-pebbles.tsx) — just lightly transparent since this track's
 * background tone keeps shifting with depth.
 */
const SOIL_GRAIN = pebbleImage(generatePebbleField(110, 1337));

/** Foreground palette for content sitting on the soil. */
const ON_SOIL_TEXT = "#F6EFDF";
const ON_SOIL_ACCENT = "#BFE887";
const ON_SOIL_UNDERLINE =
  "linear-gradient(265.32deg, #BFE887 2.23%, #8FD9A6 40.81%, #6FCDB2 69.11%, #57B9A2 97.77%)";

/** Original Figma glyph paths from public/100%.svg and public/30+.svg */
const STAT_GLYPHS = {
  "100%": {
    viewBox: "0 0 290 88",
    width: 290,
    height: 88,
    d: "M29.5201 85.6801V12.9601H27.3601L16.0801 39.6001H5.86063e-05L17.1601 1.68005H44.8801V85.6801H29.5201ZM89.2979 87.3601C79.3779 87.3601 71.4179 84.6401 65.4179 79.2001C59.4179 73.6801 56.4179 65.3601 56.4179 54.2401V33.1201C56.4179 22.3201 59.4179 14.1201 65.4179 8.52005C71.4179 2.84005 79.3779 4.81606e-05 89.2979 4.81606e-05C99.2979 4.81606e-05 107.258 2.84005 113.178 8.52005C119.178 14.1201 122.178 22.3201 122.178 33.1201V54.2401C122.178 65.3601 119.178 73.6801 113.178 79.2001C107.258 84.6401 99.2979 87.3601 89.2979 87.3601ZM89.2979 73.6801C95.2979 73.6801 99.6979 72.0401 102.498 68.7601C105.378 65.4801 106.818 60.8001 106.818 54.7201V32.4C106.818 26.2401 105.218 21.6001 102.018 18.4801C98.8979 15.2801 94.6579 13.6801 89.2979 13.6801C83.7779 13.6801 79.4579 15.3201 76.3379 18.6001C73.2979 21.8801 71.7779 26.4801 71.7779 32.4V54.7201C71.7779 61.0401 73.2179 65.8001 76.0979 69.0001C79.0579 72.1201 83.4579 73.6801 89.2979 73.6801ZM164.71 87.3601C154.79 87.3601 146.83 84.6401 140.83 79.2001C134.83 73.6801 131.83 65.3601 131.83 54.2401V33.1201C131.83 22.3201 134.83 14.1201 140.83 8.52005C146.83 2.84005 154.79 4.81606e-05 164.71 4.81606e-05C174.71 4.81606e-05 182.67 2.84005 188.59 8.52005C194.59 14.1201 197.59 22.3201 197.59 33.1201V54.2401C197.59 65.3601 194.59 73.6801 188.59 79.2001C182.67 84.6401 174.71 87.3601 164.71 87.3601ZM164.71 73.6801C170.71 73.6801 175.11 72.0401 177.91 68.7601C180.79 65.4801 182.23 60.8001 182.23 54.7201V32.4C182.23 26.2401 180.63 21.6001 177.43 18.4801C174.31 15.2801 170.07 13.6801 164.71 13.6801C159.19 13.6801 154.87 15.3201 151.75 18.6001C148.71 21.8801 147.19 26.4801 147.19 32.4V54.7201C147.19 61.0401 148.63 65.8001 151.51 69.0001C154.47 72.1201 158.87 73.6801 164.71 73.6801ZM219.003 87.2401L209.883 79.9201L274.443 0.120047L283.563 7.44005L219.003 87.2401ZM269.643 86.8801C263.563 86.8801 258.803 85.2801 255.363 82.0801C251.923 78.8001 250.203 74.3601 250.203 68.7601V67.9201C250.203 62.2401 251.923 57.8001 255.363 54.6001C258.803 51.3201 263.563 49.6801 269.643 49.6801C275.563 49.6801 280.283 51.3201 283.803 54.6001C287.323 57.8001 289.083 62.2401 289.083 67.9201V68.7601C289.083 74.3601 287.363 78.8001 283.923 82.0801C280.483 85.2801 275.723 86.8801 269.643 86.8801ZM269.643 77.0401C271.963 77.0401 273.763 76.3201 275.043 74.8801C276.403 73.4401 277.083 71.5601 277.083 69.2401V67.3201C277.083 65.0001 276.403 63.1201 275.043 61.6801C273.763 60.2401 271.963 59.5201 269.643 59.5201C267.323 59.5201 265.483 60.2401 264.123 61.6801C262.843 63.1201 262.203 65.0001 262.203 67.3201V69.2401C262.203 71.5601 262.843 73.4401 264.123 74.8801C265.483 76.3201 267.323 77.0401 269.643 77.0401ZM223.803 37.6801C217.723 37.6801 212.963 36.0801 209.523 32.8801C206.083 29.6 204.363 25.1601 204.363 19.5601V18.7201C204.363 13.0401 206.083 8.60005 209.523 5.40005C212.963 2.12005 217.723 0.480049 223.803 0.480049C229.723 0.480049 234.443 2.12005 237.963 5.40005C241.483 8.60005 243.243 13.0401 243.243 18.7201V19.5601C243.243 25.1601 241.523 29.6 238.083 32.8801C234.643 36.0801 229.883 37.6801 223.803 37.6801ZM223.803 27.8401C226.123 27.8401 227.923 27.1201 229.203 25.6801C230.563 24.2401 231.243 22.3601 231.243 20.04V18.1201C231.243 15.8001 230.563 13.9201 229.203 12.4801C227.923 11.0401 226.123 10.3201 223.803 10.3201C221.483 10.3201 219.643 11.0401 218.283 12.4801C217.003 13.9201 216.363 15.8001 216.363 18.1201V20.04C216.363 22.3601 217.003 24.2401 218.283 25.6801C219.643 27.1201 221.483 27.8401 223.803 27.8401Z",
  },
  "30+": {
    viewBox: "0 0 205 88",
    width: 205,
    height: 88,
    d: "M32.3999 87.3601C26.0799 87.3601 20.4799 86.2401 15.5999 84.0001C10.7199 81.7601 6.87992 78.5601 4.07992 74.4001C1.35992 70.1601 -7.79033e-05 65.1601 -7.79033e-05 59.4001V57.2401H15.3599V58.9201C15.3599 63.4001 16.9199 67.0001 20.0399 69.7201C23.1599 72.3601 27.2799 73.6801 32.3999 73.6801C37.5999 73.6801 41.5999 72.4401 44.3999 69.9601C47.2799 67.4801 48.7199 64.3601 48.7199 60.6001V59.4001C48.7199 56.8401 48.0799 54.7601 46.7999 53.1601C45.5199 51.5601 43.7999 50.4001 41.6399 49.6801C39.4799 48.8801 37.0399 48.4801 34.3199 48.4801H17.5199V31.6801L44.6399 17.28V15.3601H2.15992V1.68005H61.6799V22.08L36.3599 35.5201V37.4401H40.7999C44.5599 37.4401 48.1999 38.2001 51.7199 39.7201C55.3199 41.2401 58.2799 43.6001 60.5999 46.8001C62.9199 49.9201 64.0799 54.0001 64.0799 59.0401V60.4801C64.0799 65.9201 62.7599 70.6801 60.1199 74.7601C57.4799 78.7601 53.7599 81.8801 48.9599 84.1201C44.2399 86.2801 38.7199 87.3601 32.3999 87.3601ZM105.408 87.3601C95.4877 87.3601 87.5277 84.6401 81.5277 79.2001C75.5277 73.6801 72.5277 65.3601 72.5277 54.2401V33.1201C72.5277 22.3201 75.5277 14.1201 81.5277 8.52005C87.5277 2.84005 95.4877 4.81606e-05 105.408 4.81606e-05C115.408 4.81606e-05 123.368 2.84005 129.288 8.52005C135.288 14.1201 138.288 22.3201 138.288 33.1201V54.2401C138.288 65.3601 135.288 73.6801 129.288 79.2001C123.368 84.6401 115.408 87.3601 105.408 87.3601ZM105.408 73.6801C111.408 73.6801 115.808 72.0401 118.608 68.7601C121.488 65.4801 122.928 60.8001 122.928 54.7201V32.4C122.928 26.2401 121.328 21.6001 118.128 18.4801C115.008 15.2801 110.768 13.6801 105.408 13.6801C99.8877 13.6801 95.5677 15.3201 92.4477 18.6001C89.4077 21.8801 87.8877 26.4801 87.8877 32.4V54.7201C87.8877 61.0401 89.3277 65.8001 92.2077 69.0001C95.1677 72.1201 99.5677 73.6801 105.408 73.6801ZM172.06 68.7601V50.5201H154.06V36.8401H172.06V18.6001H186.22V36.8401H204.22V50.5201H186.22V68.7601H172.06Z",
  },
} as const;

const stats = [
  {
    left: 0,
    number: "100%" as const,
    label: ["Licensed"],
    lastLinePrefix: "",
    lastWord: "Physicians",
    labelLeft: 208,
    underlineLeft: 278,
  },
  {
    left: 654,
    number: "30+" as const,
    label: ["U.S. States"],
    lastLinePrefix: "",
    lastWord: "Served",
    labelLeft: 798 - 654,
    underlineLeft: 1002 - 654,
  },
];

const MOBILE_STATS = [
  {
    number: "100%" as const,
    numberBox: { left: 35, top: 78, width: 196, height: 90 },
    label: ["Licensed"],
    lastLinePrefix: "",
    lastWord: "Physicians",
    labelBox: { left: 190, top: 157, width: 110 },
    underline: { left: 209, top: 217 },
  },
  {
    number: "30+" as const,
    numberBox: { left: 52, top: 264, width: 147, height: 90 },
    label: ["U.S. States"],
    lastLinePrefix: "",
    lastWord: "Served",
    labelBox: { left: 168, top: 334, width: 162 },
    underline: { left: 263, top: 397 },
  },
];

const clamp = (n: number) => Math.max(0, Math.min(1, n));

/**
 * Stroke-draws the original Figma glyph path, then settles into the solid
 * filled look (no outline). Tinted for the soil backdrop rather than the
 * original #4C8C1A, which all but disappears against brown.
 */
function GlyphDraw({
  number,
  box,
  progress,
}: {
  number: keyof typeof STAT_GLYPHS;
  box: { left: number; top: number; width: number; height: number };
  progress: number;
}) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [len, setLen] = useState(0);
  const glyph = STAT_GLYPHS[number];
  const done = progress >= 0.98;

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const measured = path.getTotalLength();
    if (measured > 0) setLen(measured);
  }, [number]);

  const dashoffset = len * (1 - progress);

  return (
    <svg
      className="absolute overflow-visible"
      style={{ left: box.left, top: box.top, width: box.width, height: box.height }}
      viewBox={glyph.viewBox}
      aria-label={number}
    >
      <path
        ref={pathRef}
        d={glyph.d}
        fill={done ? ON_SOIL_ACCENT : "none"}
        fillOpacity={done ? 0.72 : 0}
        stroke={ON_SOIL_ACCENT}
        strokeOpacity={done ? 0 : 0.9}
        strokeWidth={done ? 0 : 2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: len || 1,
          strokeDashoffset: len ? dashoffset : 1,
          transition: "fill-opacity 0.35s ease, stroke-opacity 0.35s ease, stroke-width 0.35s ease",
        }}
      />
    </svg>
  );
}

export function StatsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        // Start once the hero above is ~50% scrolled through, instead of
        // waiting for it to fully clear the viewport first.
        start: () => {
          const el = wrapperRef.current;
          if (!el) return scrollStartBelowMobileHeader();
          const heroHeight = el.getBoundingClientRect().top + window.scrollY;
          const earlyBy = heroHeight * 0.5 - mobileHeaderOffsetPx();
          return `top top+=${earlyBy}`;
        },
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => setP(self.progress),
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const headingOpacity = clamp(p / 0.06);
  const numProgress = [clamp((p - 0.06) / 0.32), clamp((p - 0.5) / 0.32)];
  const labelOpacity = [clamp((p - 0.38) / 0.12), clamp((p - 0.82) / 0.12)];
  const underlineP = [clamp((p - 0.4) / 0.1), clamp((p - 0.84) / 0.1)];

  return (
    // -1px pulls the track over the hero's fractional (scaled-canvas) bottom
    // row, so no page background can show through at the seam.
    <div id="care-in-your-state" ref={wrapperRef} className="relative scroll-mt-10" style={{ height: "150vh", marginTop: -1 }}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: SOIL_BG }} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ backgroundImage: SOIL_GRAIN, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}
      />
      <section className="sticky top-[var(--mobile-header-offset)] flex items-start justify-center overflow-hidden py-6 lg:top-0 lg:py-16">
        <div className="w-full">
          <div className="px-5 sm:px-8 lg:hidden">
            <FigmaCanvas width={358} height={417} className="mx-auto">
              <h2
                className="absolute text-left"
                style={{
                  left: 0,
                  top: 0,
                  width: 358,
                  color: ON_SOIL_TEXT,
                  fontFamily: "var(--font-sans)",
                  fontSize: 32,
                  fontWeight: 700,
                  lineHeight: "40px",
                  letterSpacing: "-0.64px",
                  opacity: headingOpacity,
                }}
              >
                <ScrollFloat as="span">Care You Can</ScrollFloat>{" "}
                <ScrollFloat as="span">Trust</ScrollFloat>
              </h2>

              {MOBILE_STATS.map((stat, i) => (
                <div key={stat.number}>
                  <GlyphDraw number={stat.number} box={stat.numberBox} progress={numProgress[i]} />
                  <p
                    className="absolute"
                    style={{
                      ...stat.labelBox,
                      color: ON_SOIL_TEXT,
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
                      <span style={{ color: ON_SOIL_ACCENT }}>{stat.lastWord}</span>
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
                        ON_SOIL_UNDERLINE,
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
                className="absolute text-center"
                style={{
                  color: ON_SOIL_TEXT,
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
                <ScrollFloat as="span">Care You Can</ScrollFloat>{" "}
                <ScrollFloat as="span">Trust</ScrollFloat>
              </h2>

              <div
                className="absolute"
                style={{ left: CONTAINER.left, top: TOP + 114, width: CONTAINER.width, height: 231 }}
              >
                {stats.map((stat, i) => {
                  const glyph = STAT_GLYPHS[stat.number];
                  return (
                    <div
                      key={stat.number}
                      className="absolute"
                      style={{ left: stat.left, top: 0, width: 415, height: 231 }}
                    >
                      <GlyphDraw
                        number={stat.number}
                        box={{ left: 0, top: 20, width: glyph.width, height: glyph.height }}
                        progress={numProgress[i]}
                      />
                      <p
                        className="absolute"
                        style={{
                          color: ON_SOIL_TEXT,
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
                          <span style={{ color: ON_SOIL_ACCENT }}>{stat.lastWord}</span>
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
                            ON_SOIL_UNDERLINE,
                          opacity: underlineP[i] > 0 ? 1 : 0,
                          transform: `scaleX(${underlineP[i]})`,
                          transformOrigin: "left center",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </FigmaCanvas>
          </div>
        </div>
      </section>
    </div>
  );
}
