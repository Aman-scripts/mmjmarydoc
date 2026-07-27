import Image from "next/image";
import { Header } from "@/components/header";
import { FigmaCanvas } from "@/components/figma-canvas";
import { MobileHero } from "@/components/mobile-hero";
import { MagneticHeroPlant } from "@/components/magnetic-hero-plant";

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
const PLANT = { left: 435 - HERO_ROW.left, top: 279 - HERO_ORIG_TOP, width: 307, height: 596 };
const SOIL = { left: 0, top: HERO_ROW.top + PLANT.top + PLANT.height - 90, width: 1440, height: 125 };
const CARD = { left: 148 - HERO_ROW.left, top: 402 - HERO_ORIG_TOP, width: 314, height: 155 };
const WITH_GUIDED = { left: 744 - HERO_ROW.left, top: 402 - HERO_ORIG_TOP };
const YOUR = { left: 266 - HERO_ROW.left, top: 263 - HERO_ORIG_TOP, width: 219, height: 155 };
const MARIJUANA = { left: 695 - HERO_ROW.left, top: 263 - HERO_ORIG_TOP, width: 633, height: 155 };
const DESCRIPTION = { left: 133 - HERO_ROW.left, top: 561 - HERO_ORIG_TOP, width: 297 };
const CARE = { left: 746 - HERO_ROW.left, top: 546 - HERO_ORIG_TOP };
// Keep leaf just after "Care." (same offset as original Figma: leaf − care = 259).
const LEAF = { left: 1005 - HERO_ROW.left, top: 565 - HERO_ORIG_TOP, width: 91, height: 96 };

function DesktopHero() {
  return (
    <section className="relative" style={{ background: "#DFF8EC" }}>
      <FigmaCanvas
        width={1440}
        height={SOIL.top + SOIL.height}
        style={{ background: "linear-gradient(135deg, #DFF8EC 0%, #E6FFD2 100%)" }}
      >
        <Header />

        <Image
          src="/hero-soil.png"
          alt=""
          width={SOIL.width}
          height={SOIL.height}
          className="absolute select-none object-cover"
          style={{ left: SOIL.left, top: SOIL.top, width: SOIL.width, height: SOIL.height }}
          data-hero-soil
          aria-hidden
        />

        <div
          className="absolute"
          style={{ left: HERO_ROW.left, top: HERO_ROW.top, width: HERO_ROW.width, height: HERO_ROW.height }}
        >
          <div className="absolute z-20" style={{ ...PLANT }}>
            <MagneticHeroPlant className="h-full w-full" />
          </div>

          <h1
            className="pointer-events-none absolute text-right text-primary"
            style={{ ...YOUR, fontWeight: 800, fontSize: 100, lineHeight: "155px", letterSpacing: "-2px" }}
          >
            Your
          </h1>
          <h1
            className="pointer-events-none absolute whitespace-nowrap text-accent opacity-50"
            style={{ ...MARIJUANA, fontWeight: 800, fontSize: 110, lineHeight: "155px", letterSpacing: "-2.2px" }}
          >
            MARIJUANA
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
            With Guided
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
            MaryDoc connects you with licensed physicians in your state for
            secure online medical marijuana evaluations, all from the comfort
            of your home.
          </p>

          <h1
            className="pointer-events-none absolute"
            style={{
              ...CARE,
              fontWeight: 800,
              fontSize: 100,
              lineHeight: "120px",
              letterSpacing: "-2px",
              ...textGradient,
            }}
          >
            Care.
          </h1>
          <Image
            src="/small_leaf.webp"
            alt=""
            width={LEAF.width}
            height={LEAF.height}
            className="pointer-events-none absolute"
            style={{ left: LEAF.left, top: LEAF.top }}
            aria-hidden
          />
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
