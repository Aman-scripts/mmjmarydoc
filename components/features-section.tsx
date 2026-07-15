import Image from "next/image";
import { FigmaCanvas } from "@/components/figma-canvas";
import { MobileImageCarousel } from "@/components/mobile-image-carousel";

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 88, 86:724),
// each offset relative to this section's own top-left corner (4899, 2504).
// Figma places a 100px gap before and after this block (matching the gap
// used between the other sections), added here as TOP/BOTTOM.
const TOP = 100;
const BOTTOM = 100;
const HEADING = { left: 169, top: TOP + 0, width: 357 };
const PARAGRAPH = { left: 712, top: TOP + 0, width: 555 };
const IMAGE_OVAL = { left: 171, top: TOP + 245, width: 284, height: 391 };
const IMAGE_MAIN = { left: 355, top: TOP + 421, width: 783, height: 434 };
const IMAGE_SMALL = { left: 999, top: TOP + 774, width: 282, height: 188 };
const BUTTON = { left: 633, top: TOP + 774, width: 174, height: 42 };
const LEAF_BOTTOM_LEFT = { left: 115, top: TOP + 618, width: 468, height: 454 };
const LEAF_TOP_RIGHT = { left: 936, top: TOP + 311, width: 336, height: 351 };

function FeaturesDesktop() {
  return (
    <section className="relative hidden bg-background lg:block">
      <FigmaCanvas width={1440} height={TOP + 1072 + BOTTOM} className="mx-auto">
        <h2
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
          Making{" "}
          <em className="not-italic italic text-accent">Medical Cannabis</em>{" "}
          More Accessible
        </h2>

        <p
          className="absolute whitespace-pre-line italic text-muted-foreground"
          style={{
            ...PARAGRAPH,
            fontSize: 18,
            fontWeight: 400,
            lineHeight: "28px",
            letterSpacing: "-0.36px",
          }}
        >
          {`For years, getting a medical marijuana card meant navigating confusing websites or impersonal clinics. Many patients living with chronic pain, anxiety, PTSD, and other qualifying conditions were left feeling judged while searching for safe, legitimate care.\n\nMaryDoc was created to change that. We connect patients with licensed physicians for secure online evaluations, making access to medical cannabis simple, trusted, and compassionate. Our mission is to provide a seamless, transparent experience that puts patients first—making quality care more accessible across 30+ states.`}
        </p>

        <div className="pointer-events-none absolute opacity-50" style={{ ...LEAF_BOTTOM_LEFT }}>
          <Image src="/left-bottom.svg" alt="" fill className="object-contain" />
        </div>
        <div className="pointer-events-none absolute opacity-50" style={{ ...LEAF_TOP_RIGHT }}>
          <Image src="/right-top.svg" alt="" fill className="object-contain" />
        </div>

        <div className="absolute overflow-hidden rounded-[20px]" style={{ ...IMAGE_MAIN }}>
          <Image src="/image1.png" alt="Cannabis plant" fill className="object-cover" />
        </div>

        <div className="absolute overflow-hidden rounded-full shadow-lg" style={{ ...IMAGE_OVAL }}>
          <Image src="/Image2.png" alt="Holding tincture bottles" fill className="object-cover" />
        </div>

        <a
          href="#get-your-card"
          className="absolute flex items-center justify-center rounded-full bg-[#DFF8EC] text-base font-semibold leading-[26px] tracking-[-0.32px] text-primary"
          style={{ ...BUTTON }}
        >
          Get your Card
        </a>

        <div className="absolute overflow-hidden rounded-[20px]" style={{ ...IMAGE_SMALL }}>
          <Image src="/image3.png" alt="Doctor consultation supplies" fill className="object-cover" />
        </div>
      </FigmaCanvas>
    </section>
  );
}

function FeaturesMobile() {
  return (
    <section className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 lg:hidden">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <h2
          className="text-primary"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Making <em className="not-italic italic text-accent">Medical Cannabis</em> More
          Accessible
        </h2>

        <div className="flex flex-col gap-4 whitespace-pre-line italic text-muted-foreground" style={{ fontSize: 16, lineHeight: "26px" }}>
          {`For years, getting a medical marijuana card meant navigating confusing websites or impersonal clinics. Many patients living with chronic pain, anxiety, PTSD, and other qualifying conditions were left feeling judged while searching for safe, legitimate care.\n\nMaryDoc was created to change that. We connect patients with licensed physicians for secure online evaluations, making access to medical cannabis simple, trusted, and compassionate. Our mission is to provide a seamless, transparent experience that puts patients first—making quality care more accessible across 30+ states.`}
        </div>

        <div className="relative mt-4">
          <div className="pointer-events-none absolute -left-6 -top-10 h-24 w-24 opacity-50">
            <Image src="/right-top.svg" alt="" fill className="object-contain" />
          </div>
          <div className="pointer-events-none absolute -bottom-10 -right-6 h-24 w-24 opacity-50">
            <Image src="/left-bottom.svg" alt="" fill className="object-contain" />
          </div>

          <MobileImageCarousel
            slides={[
              { src: "/image1.png", alt: "Cannabis plant" },
              { src: "/Image2.png", alt: "Holding tincture bottles" },
              { src: "/image3.png", alt: "Doctor consultation supplies" },
            ]}
          />
        </div>

        <a
          href="#get-your-card"
          className="mx-auto mt-10 rounded-full bg-[#DFF8EC] px-9 py-3 text-base font-semibold text-primary"
        >
          Get your Card
        </a>
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
