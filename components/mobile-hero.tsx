import Image from "next/image";
import { MobileHeader } from "@/components/mobile-header";
import { FigmaCanvas } from "@/components/figma-canvas";

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

// Coordinates lifted 1:1 from the Figma mobile frame (286:6205 -> Mobile ->
// Frame 38), offset relative to the crossed text/plant block's own top-left
// (y=114 in the source frame, i.e. just below the header).
const PLANT = { left: 93, top: 9, width: 119, height: 179 };
const YOUR = { left: 55, top: 16, width: 57, height: 44 };
const MARIJUANA = { left: 182, top: 16, width: 184, height: 44 };
const CARD = { left: 25, top: 55, width: 92, height: 44 };
const WITH_GUIDED = { left: 182, top: 55, height: 44 };
const CARE = { left: 182, top: 95, width: 70, height: 34 };

export function MobileHero() {
  return (
    <section
      className="relative overflow-hidden pb-12"
      style={{ background: "linear-gradient(135deg, #DFF8EC 0%, #E6FFD2 100%)" }}
    >
      <MobileHeader />

      <FigmaCanvas width={390} height={190} className="mx-auto">
        <div className="absolute flex flex-col items-center gap-4" style={{ left: 373, top: 0, width: 12, height: 190 }}>
          <span className="text-[8px] italic leading-[14px] tracking-[-0.16px] text-muted-foreground [writing-mode:vertical-lr]">
            Read Our Story
          </span>
          <span className="h-8 w-px bg-[#716f6d]" />
          <InstagramIcon className="h-3 w-3 text-muted-foreground" />
          <FacebookIcon className="h-3 w-3 text-muted-foreground" />
        </div>

        <div className="absolute" style={{ ...PLANT }}>
          <Image src="/hero_section_plant.svg" alt="Marijuana plant" fill className="object-contain" priority />
        </div>

        <h1
          className="absolute italic text-primary"
          style={{ ...YOUR, fontWeight: 800, fontSize: 26, lineHeight: "44px", letterSpacing: "-0.5px" }}
        >
          Your
        </h1>
        <h1
          className="absolute whitespace-nowrap text-accent opacity-50"
          style={{ ...MARIJUANA, fontWeight: 800, fontSize: 32, lineHeight: "44px", letterSpacing: "-0.6px" }}
        >
          MARIJUANA
        </h1>
        <h1
          className="absolute text-accent opacity-50"
          style={{ ...CARD, fontWeight: 800, fontSize: 32, lineHeight: "44px", letterSpacing: "-0.6px" }}
        >
          CARD
        </h1>
        <h1
          className="absolute whitespace-nowrap italic"
          style={{ ...WITH_GUIDED, fontWeight: 800, fontSize: 26, lineHeight: "44px", letterSpacing: "-0.5px", ...textGradient }}
        >
          With Guided
        </h1>
        <h1
          className="absolute italic"
          style={{ ...CARE, fontWeight: 800, fontSize: 26, lineHeight: "34px", letterSpacing: "-0.5px", ...textGradient }}
        >
          Care.
        </h1>
      </FigmaCanvas>
    </section>
  );
}
