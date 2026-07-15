import Image from "next/image";
import { Header } from "@/components/header";
import { FigmaCanvas } from "@/components/figma-canvas";
import { MobileHero } from "@/components/mobile-hero";

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

// Coordinates below are lifted 1:1 from the Figma frame (62:139 -> Frame 79,
// 1440x922), each offset relative to the section's own top-left corner.
const HERO_ROW = { left: 144, top: 229, width: 1216, height: 613 };
const PLANT = { left: 403 - HERO_ROW.left, top: 0, width: 427, height: 613 };
const CARD = { left: 176 - HERO_ROW.left, top: 402 - HERO_ROW.top, width: 314, height: 155 };
const WITH_GUIDED = { left: 694 - HERO_ROW.left, top: 402 - HERO_ROW.top };
const YOUR = { left: 266 - HERO_ROW.left, top: 263 - HERO_ROW.top, width: 219, height: 155 };
const MARIJUANA = { left: 695 - HERO_ROW.left, top: 263 - HERO_ROW.top, width: 633, height: 155 };
const DESCRIPTION = { left: 193 - HERO_ROW.left, top: 561 - HERO_ROW.top, width: 297, height: 104 };
const CARE = { left: 695 - HERO_ROW.left, top: 546 - HERO_ROW.top };
const LEAF = { left: 954 - HERO_ROW.left, top: 565 - HERO_ROW.top, width: 91, height: 95 };

export function Hero() {
  return (
    <>
      <div className="lg:hidden">
        <MobileHero />
      </div>

      <section className="relative hidden lg:block" style={{ background: "#DFF8EC" }}>
      <FigmaCanvas
        width={1440}
        height={922}
        style={{ background: "linear-gradient(135deg, #DFF8EC 0%, #E6FFD2 100%)" }}
      >
        <Header />

        <div className="absolute" style={{ left: HERO_ROW.left, top: HERO_ROW.top, width: HERO_ROW.width, height: HERO_ROW.height }}>
          <div className="absolute" style={{ ...PLANT }}>
            <Image src="/hero_section_plant.svg" alt="Marijuana plant" fill className="object-contain" priority />
          </div>

          <h1
            className="absolute text-right italic text-primary"
            style={{ ...YOUR, fontWeight: 800, fontSize: 100, lineHeight: "155px", letterSpacing: "-2px" }}
          >
            Your
          </h1>
          <h1
            className="absolute whitespace-nowrap text-accent opacity-50"
            style={{ ...MARIJUANA, fontWeight: 800, fontSize: 110, lineHeight: "155px", letterSpacing: "-2.2px" }}
          >
            MARIJUANA
          </h1>

          <h1
            className="absolute text-right text-accent opacity-50"
            style={{ ...CARD, fontWeight: 800, fontSize: 110, lineHeight: "155px", letterSpacing: "-2.2px" }}
          >
            CARD
          </h1>
          <h1
            className="absolute whitespace-nowrap italic"
            style={{ ...WITH_GUIDED, fontWeight: 800, fontSize: 100, lineHeight: "155px", letterSpacing: "-2px", ...textGradient }}
          >
            With Guided
          </h1>

          <p
            className="absolute text-right text-base leading-[26px] tracking-[-0.32px] text-muted-foreground"
            style={{ ...DESCRIPTION }}
          >
            MaryDoc connects you with licensed physicians in your state for
            secure online medical marijuana evaluations, all from the
            comfort of your home.
          </p>

          <h1
            className="absolute italic"
            style={{ ...CARE, fontWeight: 800, fontSize: 100, lineHeight: "120px", letterSpacing: "-2px", ...textGradient }}
          >
            Care.
          </h1>
          <Image
            src="/small_leaf.svg"
            alt=""
            width={LEAF.width}
            height={LEAF.height}
            className="absolute"
            style={{ left: LEAF.left, top: LEAF.top }}
          />
        </div>

        <div className="absolute hidden flex-col items-center gap-6 lg:flex" style={{ left: 1390, top: 385, width: 30, height: 256 }}>
          <span className="text-xs italic leading-[18px] tracking-[-0.24px] text-muted-foreground [writing-mode:vertical-lr]">
            Read Our Story
          </span>
          <span className="h-16 w-px bg-border" />
          <InstagramIcon className="h-4 w-4 text-muted-foreground" />
          <FacebookIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </FigmaCanvas>
      </section>
    </>
  );
}
