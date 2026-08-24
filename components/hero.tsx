import Image from "next/image";

import { Header } from "@/components/header";
import { FigmaCanvas } from "@/components/figma-canvas";
import { MobileHero } from "@/components/mobile-hero";
import { MagneticHeroPlant } from "@/components/magnetic-hero-plant";
import { SoilPebbles, generatePebbleField } from "@/components/soil-pebbles";
import { SOIL_COLOR } from "@/lib/soil";


const HERO_PEBBLES = generatePebbleField(70, 2024, 22);

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

const HERO_LIFT = 120;
const HERO_ORIG_TOP = 201;
const HERO_ROW = { left: 144, top: HERO_ORIG_TOP - HERO_LIFT, width: 1216, height: 613 };
const PLANT = { left: 435 - HERO_ROW.left + 19, top: 279 - HERO_ORIG_TOP - 50, width: 269, height: 646 };

const SOIL_HEIGHT = Math.round((1440 * 138) / 752);

const SOIL = {
  left: 0,
  top: HERO_ROW.top + PLANT.top + PLANT.height - 150,
  width: 1440,
  height: SOIL_HEIGHT,
};
const CARD = { left: 148 - HERO_ROW.left, top: 402 - HERO_ORIG_TOP, width: 314, height: 155 };
const WITH_GUIDED = { left: 744 - HERO_ROW.left, top: 402 - HERO_ORIG_TOP };
const YOUR = { left: 266 - HERO_ROW.left - 160, top: 263 - HERO_ORIG_TOP, width: 380, height: 155 };
const MARIJUANA = { left: 695 - HERO_ROW.left, top: 263 - HERO_ORIG_TOP, width: 633, height: 155 };
const DESCRIPTION = { left: 133 - HERO_ROW.left, top: 561 - HERO_ORIG_TOP, width: 297 };
const CARE = { left: 746 - HERO_ROW.left, top: 520 - HERO_ORIG_TOP };

function DesktopHero() {
  return (
    
    
    
    
    <section className="relative" style={{ background: SOIL_COLOR }}>
      <FigmaCanvas
        width={1440}
        height={SOIL.top + SOIL.height}
        style={{ background: "linear-gradient(135deg, #DFF8EC 0%, #E6FFD2 100%)" }}
      >
        <Header />

        {}
        <div
          className="pointer-events-none absolute"
          style={{
            left: SOIL.left,
            top: SOIL.top + SOIL.height - 14,
            width: SOIL.width,
            height: 14,
            background: SOIL_COLOR,
          }}
          aria-hidden
        />

        <Image
          src="/soil_one.svg"
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

        <div
          className="absolute"
          style={{ left: HERO_ROW.left, top: HERO_ROW.top, width: HERO_ROW.width, height: HERO_ROW.height }}
        >
          <div className="absolute z-20" style={{ ...PLANT }}>
            <MagneticHeroPlant className="h-full w-full" />
          </div>

          <h1
            className="pointer-events-none absolute text-right text-primary whitespace-nowrap"
            style={{ ...YOUR, fontWeight: 800, fontSize: 100, lineHeight: "155px", letterSpacing: "-2px" }}
          >
            Get Your
          </h1>
          <h1
            className="pointer-events-none absolute whitespace-nowrap text-accent opacity-50"
            style={{ ...MARIJUANA, fontWeight: 800, fontSize: 110, lineHeight: "155px", letterSpacing: "-2.2px" }}
          >
            MEDICAL
          </h1>

          <h1
            className="pointer-events-none absolute text-right text-accent opacity-50"
            style={{ ...CARD, fontWeight: 800, fontSize: 110, lineHeight: "155px", letterSpacing: "-2.2px" }}
          >
            CARD
          </h1>
          <h1
            className="pointer-events-none absolute whitespace-nowrap"
            style={{
              ...WITH_GUIDED,
              fontWeight: 800,
              fontSize: 100,
              lineHeight: "155px",
              letterSpacing: "-2px",
              ...textGradient,
            }}
          >
            Online With
          </h1>

          <p
            className="pointer-events-none absolute text-right text-muted-foreground"
            style={{
              ...DESCRIPTION,
              fontSize: 18,
              fontWeight: 400,
              lineHeight: "26px",
              letterSpacing: "-0.18px",
            }}
          >
            We connect you with a state-licensed physician in your state for a
            HIPAA-compliant online evaluation.
          </p>

          <h1
            className="pointer-events-none absolute whitespace-nowrap"
            style={{
              ...CARE,
              fontWeight: 800,
              fontSize: 100,
              lineHeight: "120px",
              letterSpacing: "-2px",
              ...textGradient,
            }}
          >
            Guided Care.
          </h1>
        </div>

        <div
          className="absolute hidden flex-col items-center gap-6 lg:flex"
          style={{ left: 1390, top: 385 - HERO_LIFT, width: 30, height: 256 }}
        >
          <span className="text-xs leading-[18px] tracking-[-0.24px] text-muted-foreground [writing-mode:vertical-lr]">
            Read Our Story
          </span>
          <span className="h-16 w-px bg-[#716f6d]" />
          <InstagramIcon className="h-4 w-4 text-muted-foreground" />
          <FacebookIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </FigmaCanvas>
    </section>
  );
}

export function Hero() {
  return (
    <>
      <div className="lg:hidden">
        <MobileHero />
      </div>
      <div className="hidden lg:block">
        <DesktopHero />
      </div>
    </>
  );
}
