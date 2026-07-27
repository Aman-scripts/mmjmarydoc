import Image from "next/image";
import { FigmaCanvas } from "@/components/figma-canvas";
import { RevealOnView } from "@/components/reveal-on-view";
import { TextSequence, SeqChars, SeqLines } from "@/components/text-sequence";

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 97, 95:1155),
// each offset relative to this section's own top-left corner (4899, 4705).
const HEADING = { left: 83, top: 78, width: 445 };
const PARAGRAPH = { left: 83, top: 276, width: 405 };
const IMAGE_LEFT = { left: 603, top: 103, width: 367, height: 406 };
const IMAGE_RIGHT = { left: 992, top: 102, width: 367, height: 406 };
const IMAGE_MIDDLE = { left: 830, top: 60, width: 317, height: 421 };
// Images bottom out near ~509 — give the section breathing room below.
const CANVAS_H = 520 + 48;

const paragraphLines = [
  "Behind every medical cannabis evaluation is a person looking for answers, not judgment.",
  "At MaryDoc, we believe healthcare begins with listening, respecting each patient’s journey, and providing thoughtful guidance from licensed physicians.",
];

function JudgmentDesktop() {
  return (
    <section
      className="relative hidden lg:block"
      style={{ background: "linear-gradient(135deg, #DFF8EC 0%, #E6FFD2 100%)" }}
    >
      <FigmaCanvas width={1440} height={CANVAS_H} className="mx-auto">
        <TextSequence className="absolute" style={{ left: HEADING.left, top: HEADING.top, width: HEADING.width }}>
          <h2
            className="text-primary"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 48,
              fontWeight: 700,
              lineHeight: "58px",
              letterSpacing: "-0.96px",
            }}
          >
            <SeqChars>Seeking relief</SeqChars>
            <br />
            <SeqChars>should never come</SeqChars>
            <br />
            <SeqChars>with judgment</SeqChars>
          </h2>
          <SeqLines
            className="text-muted-foreground"
            style={{
              marginTop: PARAGRAPH.top - HEADING.top - 174,
              width: PARAGRAPH.width,
              fontSize: 18,
              fontWeight: 400,
              lineHeight: "30px",
              letterSpacing: "-0.32px",
            }}
            lines={paragraphLines}
          />
        </TextSequence>

        <RevealOnView
          delay={500}
          animationName="emerge-from-behind-left"
          className="absolute overflow-hidden rounded-[30px]"
          style={{ ...IMAGE_LEFT }}
        >
          <Image
            src="/judgement-section-image1.webp"
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
            src="/judgement-section-image3.webp"
            alt="MaryDoc patient care"
            fill
            className="object-cover"
            sizes="367px"
          />
        </RevealOnView>

        <RevealOnView
          delay={0}
          className="absolute overflow-hidden rounded-[30px] shadow-lg"
          style={{ ...IMAGE_MIDDLE }}
        >
          <Image
            src="/judgement-section-image2.webp"
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
      className="relative overflow-hidden px-5 py-16 pb-20 sm:px-8 lg:hidden"
      style={{ background: "linear-gradient(135deg, #DFF8EC 0%, #E6FFD2 100%)" }}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <TextSequence>
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
            <SeqChars>Seeking relief</SeqChars>
            <br />
            <SeqChars>should never come</SeqChars>
            <br />
            <SeqChars>with judgment</SeqChars>
          </h2>
        </TextSequence>

        <RevealOnView className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[30px]">
          <Image
            src="/judgement-section-image2.webp"
            alt="MaryDoc patient care"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 384px"
          />
        </RevealOnView>

        <TextSequence>
          <SeqLines
            className="text-muted-foreground"
            style={{ fontSize: 18, lineHeight: "30px" }}
            lines={paragraphLines}
          />
        </TextSequence>
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
