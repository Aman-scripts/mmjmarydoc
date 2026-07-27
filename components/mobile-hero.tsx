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

// Coordinates lifted 1:1 from the Figma mobile frame (Mobile -> Frame 142),
// offset relative to the crossed text/plant block's own top-left (y=114 in
// the source frame, i.e. just below the header).
const PLANT = { left: 103, top: 20, width: 184, height: 356 };
const SOIL = { left: 0, top: 319, width: 390, height: 80 };
const CANVAS_HEIGHT = 399;

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
        <Image
          src="/hero-soil.png"
          alt=""
          width={SOIL.width}
          height={SOIL.height}
          className="absolute select-none object-cover"
          style={{ left: SOIL.left, top: SOIL.top, width: SOIL.width, height: SOIL.height }}
          data-hero-soil
          aria-hidden
          priority
        />

        <div className="absolute" style={{ ...PLANT }}>
          <Image
            src="/hero-plant-mobile.svg"
            alt="Marijuana plant growing in soil"
            fill
            className="object-contain"
            sizes="167px"
            priority
          />
        </div>
      </FigmaCanvas>
    </section>
  );
}
