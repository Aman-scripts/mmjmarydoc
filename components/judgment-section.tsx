import Image from "next/image";
import { FigmaCanvas } from "@/components/figma-canvas";
import { RevealOnView } from "@/components/reveal-on-view";

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 97, 95:1155),
// each offset relative to this section's own top-left corner (4899, 4705).
const HEADING = { left: 83, top: 78, width: 445 };
const PARAGRAPH = { left: 83, top: 276, width: 405 };
const BUTTON = { left: 83, top: 450, width: 203, height: 42 };
const IMAGE_LEFT = { left: 603, top: 103, width: 367, height: 406 };
const IMAGE_RIGHT = { left: 992, top: 102, width: 367, height: 406 };
const IMAGE_MIDDLE = { left: 830, top: 60, width: 317, height: 421 };

const paragraphText =
  "Behind every medical cannabis evaluation is a person looking for answers, not judgment. At MaryDoc, we believe healthcare begins with listening, respecting each patient’s journey, and providing thoughtful guidance from licensed physicians.";

function JudgmentDesktop() {
  return (
    <section
      className="relative hidden lg:block"
      style={{ background: "linear-gradient(135deg, #DFF8EC 0%, #E6FFD2 100%)" }}
    >
      <FigmaCanvas width={1440} height={570} className="mx-auto">
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
          <span className="italic text-accent">Seeking relief</span> should never come with judgment
        </h2>

        <p
          className="absolute italic text-muted-foreground"
          style={{
            ...PARAGRAPH,
            fontSize: 16,
            fontWeight: 400,
            lineHeight: "30px",
            letterSpacing: "-0.32px",
          }}
        >
          {paragraphText}
        </p>

        <a
          href="#care-in-your-state"
          className="absolute flex items-center justify-center rounded-full text-base font-semibold leading-[26px] tracking-[-0.32px] text-white"
          style={{
            ...BUTTON,
            background:
              "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
          }}
        >
          Care in your State
        </a>

        {/* Side images emerge from behind the main card after it appears */}
        <RevealOnView
          delay={500}
          animationName="emerge-from-behind-left"
          className="absolute overflow-hidden rounded-[30px]"
          style={{ ...IMAGE_LEFT }}
        >
          <Image
            src="/judgement-section-image1.png"
            alt="MaryDoc patient care"
            fill
            className="object-cover"
            sizes="367px"
          />
        </RevealOnView>
        <RevealOnView
          delay={500}
          animationName="emerge-from-behind-right"
          className="absolute overflow-hidden rounded-[30px]"
          style={{ ...IMAGE_RIGHT }}
        >
          <Image
            src="/judgement-section-image3.png"
            alt="MaryDoc patient care"
            fill
            className="object-cover"
            sizes="367px"
          />
        </RevealOnView>

        {/* Main card appears first, on top of the other two */}
        <RevealOnView
          delay={0}
          className="absolute overflow-hidden rounded-[30px] shadow-lg"
          style={{ ...IMAGE_MIDDLE }}
        >
          <Image
            src="/judgement-section-image2.png"
            alt="MaryDoc patient care"
            fill
            className="object-cover"
            sizes="317px"
          />
        </RevealOnView>
      </FigmaCanvas>
    </section>
  );
}

function JudgmentMobile() {
  return (
    <section
      className="relative overflow-hidden px-5 py-16 sm:px-8 lg:hidden"
      style={{ background: "linear-gradient(135deg, #DFF8EC 0%, #E6FFD2 100%)" }}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
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
          <span className="italic text-accent">Seeking relief</span> should never come with judgment
        </h2>

        <RevealOnView className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[30px]">
          <Image
            src="/judgement-section-image2.png"
            alt="MaryDoc patient care"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 384px"
          />
        </RevealOnView>

        <p className="italic text-muted-foreground" style={{ fontSize: 16, lineHeight: "30px" }}>
          {paragraphText}
        </p>

        <a
          href="#care-in-your-state"
          className="rounded-full px-9 py-3 text-base font-semibold text-white"
          style={{
            background:
              "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
          }}
        >
          Care in your State
        </a>
      </div>
    </section>
  );
}

export function JudgmentSection() {
  return (
    <>
      <JudgmentMobile />
      <JudgmentDesktop />
    </>
  );
}
