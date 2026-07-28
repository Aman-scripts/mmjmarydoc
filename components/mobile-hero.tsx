import Image from "next/image";
import { MobileHeader } from "@/components/mobile-header";
import { FigmaCanvas } from "@/components/figma-canvas";
import { SoilPebbles, generatePebbleField } from "@/components/soil-pebbles";
import { SOIL_COLOR } from "@/lib/soil";

/** Dense, non-repeating pebble field for the mobile hero soil strip. */
const HERO_PEBBLES = generatePebbleField(45, 2024, 22);

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.25c0-.87.24-1.46 1.49-1.46H16.5V4.14C16.24 4.1 15.36 4 14.33 4c-2.14 0-3.6 1.31-3.6 3.71V10.5H8.25v3h2.48V21h2.77Z" />
    </svg>
  );
}

const textGradient = {
  display: "inline-block",
  backgroundImage:
    "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  padding: "0.15em 0.1em",
  margin: "-0.15em -0.1em",
} as const;

// Coordinates lifted 1:1 from the Figma mobile frame (Mobile -> Frame 142),
// offset relative to the crossed text/plant block's own top-left (y=114 in
// the source frame, i.e. just below the header).
const PLANT = { left: 103, top: 20, width: 184, height: 356 };
// Match soil_one.png aspect (752×138) so the wavy top stays visible.
const SOIL = { left: 0, top: 300, width: 390, height: Math.round((390 * 138) / 752) };
const CANVAS_HEIGHT = SOIL.top + SOIL.height;

export function MobileHero() {
  return (
    <section
      className="relative overflow-hidden pt-32 sm:pt-36"
      style={{ background: "linear-gradient(135deg, #DFF8EC 0%, #E6FFD2 100%)" }}
    >
      <MobileHeader />

      <div className="relative">
        <div className="absolute right-2 top-0 flex flex-col items-center gap-4">
          <span className="text-[8px] leading-[14px] tracking-[-0.16px] text-muted-foreground [writing-mode:vertical-lr]">
            Read Our Story
          </span>
          <span className="h-8 w-px bg-[#716f6d]" />
          <InstagramIcon className="h-3 w-3 text-muted-foreground" />
          <FacebookIcon className="h-3 w-3 text-muted-foreground" />
        </div>

        <h1 className="flex flex-col items-center gap-1 px-6 text-center text-[30px] font-extrabold leading-[44px] tracking-[-0.5px]">
          <span className="flex items-baseline gap-x-2">
            <span className="text-primary">Your</span>
            <span className="whitespace-nowrap text-[36px] leading-[44px] tracking-[-0.6px] text-accent opacity-50">
              MARIJUANA
            </span>
          </span>
          <span className="flex items-baseline gap-x-2">
            <span className="whitespace-nowrap text-[36px] leading-[44px] tracking-[-0.6px] text-accent opacity-50">
              CARD
            </span>
            <span className="whitespace-nowrap" style={textGradient}>
              With
            </span>
          </span>
          <span className="whitespace-nowrap" style={textGradient}>
            Guided Care.
          </span>
        </h1>
      </div>

      <FigmaCanvas width={390} height={CANVAS_HEIGHT} className="mx-auto mt-4">
        {/* Backs the soil PNG's transparent bottom rows — see hero.tsx. */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: SOIL.left,
            top: SOIL.top + SOIL.height - 10,
            width: SOIL.width,
            height: 10,
            background: SOIL_COLOR,
          }}
          aria-hidden
        />

        <Image
          src="/soil_one.png"
          alt=""
          width={SOIL.width}
          height={SOIL.height}
          unoptimized
          className="absolute select-none object-fill"
          style={{ left: SOIL.left, top: SOIL.top, width: SOIL.width, height: SOIL.height }}
          data-hero-soil
          aria-hidden
          priority
        />

        <SoilPebbles
          pebbles={HERO_PEBBLES}
          style={{ left: SOIL.left, top: SOIL.top, width: SOIL.width, height: SOIL.height }}
        />

        <div className="absolute z-20" style={{ ...PLANT }}>
          <Image
            src="/plant-mobile-one.svg"
            alt="Marijuana plant growing in soil"
            fill
            unoptimized
            className="object-contain object-bottom"
            sizes="167px"
            priority
          />
        </div>
      </FigmaCanvas>

      {/*
        The canvas is scaled by a fractional factor, so its last row can round
        short. Cap the section in the soil's own tone so no mint line shows
        above the stats section's soil background.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1"
        style={{ background: SOIL_COLOR }}
      />
    </section>
  );
}
