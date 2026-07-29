import Image from "next/image";
import { FigmaCanvas } from "@/components/figma-canvas";
import { RevealOnView } from "@/components/reveal-on-view";
import { TextSequence, SeqChars, SeqLines } from "@/components/text-sequence";



const HEADING = { left: 83, top: 78, width: 445 };
const PARAGRAPH = { left: 83, top: 276, width: 405 };

// The source PNGs already contain the fan rotation baked into a pre-rotated, transparent
// card crop (confirmed by inspecting the files — each is a tilted parallelogram, not a
// plain rectangle). These boxes are each image's rotated bounding box from Figma (node
// 622:977), so no additional CSS rotation is applied — that would double-rotate them.
const FAN_IMAGES = [
  { src: "/judgement-section-right-first.png", left: 565, top: 178, width: 310, height: 321, z: 1 },
  { src: "/judgement-section-right-second.png", left: 631, top: 87, width: 367, height: 406, z: 3 },
  { src: "/judgement-section-center.png", left: 807, top: 65, width: 317, height: 421, z: 5 },
  { src: "/judgement-section-left-second.png", left: 919, top: 87, width: 367, height: 406, z: 4 },
  { src: "/judgement-section-left-third.png", left: 1044, top: 165, width: 310, height: 321, z: 2 },
] as const;

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

        {FAN_IMAGES.map((img, i) => (
          <RevealOnView
            key={img.src}
            delay={i * 120}
            className="absolute drop-shadow-lg"
            style={{
              left: img.left,
              top: img.top,
              width: img.width,
              height: img.height,
              zIndex: img.z,
            }}
          >
            <Image
              src={img.src}
              alt="MaryDoc patient care"
              fill
              className="object-cover"
              sizes={`${img.width}px`}
            />
          </RevealOnView>
        ))}
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
            src="/judgement-section-center.png"
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
