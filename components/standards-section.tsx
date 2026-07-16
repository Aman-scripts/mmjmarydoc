import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FigmaCanvas } from "@/components/figma-canvas";

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

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 113, 101:230),
// each offset relative to this section's own top-left corner (4899, 6011).
// Figma places a 100px gap before and after this block, added as TOP/BOTTOM.
const TOP = 100;
const BOTTOM = 100;

const standards = [
  { number: "01", title: "Set The Bar High" },
  { number: "02", title: "State-Licensed Doctors" },
  { number: "03", title: "HIPAA Compliant" },
  { number: "04", title: "Same-Day Evaluation" },
  { number: "05", title: "Affordable Pricing" },
  { number: "06", title: "Money-Back Guarantee" },
  { number: "07", title: "24/7 Customer Support" },
  { number: "08", title: "Ongoing Support" },
];

const ROW_HEIGHT = 122;

function StandardsDesktop() {
  return (
    <section className="relative hidden bg-white lg:block">
      <FigmaCanvas width={1440} height={TOP + 803 + BOTTOM} className="mx-auto">
        <div
          className="pointer-events-none absolute"
          style={{ left: 113, top: TOP + 82, width: 150, height: 106 }}
        >
          <Image src="/faq-section-top.svg" alt="" fill className="object-contain" />
        </div>
        <div
          className="pointer-events-none absolute -scale-x-100"
          style={{ left: 1177, top: TOP + 82, width: 150, height: 106 }}
        >
          <Image src="/faq-section-top.svg" alt="" fill className="object-contain" />
        </div>

        <h2
          className="absolute whitespace-nowrap text-center"
          style={{ left: 289, top: TOP + 57, width: 862, fontWeight: 800, fontSize: 100, lineHeight: "155px", letterSpacing: "-2px" }}
        >
          <span className="italic text-primary">Our</span>{" "}
          <span className="text-accent opacity-50" style={{ fontSize: 110, letterSpacing: "-2.2px" }}>
            STANDARDS
          </span>
        </h2>

        <div className="absolute" style={{ left: 80, top: TOP + 255, width: 1280, height: 466 }}>
          {[0, 1].map((col) => (
            <div key={col} className="absolute top-0" style={{ left: col * 652, width: 628 }}>
              {standards.slice(col * 4, col * 4 + 4).map((standard, i) => (
                <div key={standard.number}>
                  <div className="flex items-center gap-6 py-6" style={{ height: ROW_HEIGHT }}>
                    <span
                      className="shrink-0 opacity-50"
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        fontSize: 80,
                        fontWeight: 700,
                        lineHeight: "100px",
                        letterSpacing: "-1.6px",
                        ...textGradient,
                      }}
                    >
                      {standard.number}
                    </span>
                    <span
                      className="flex-1 text-primary"
                      style={{ fontFamily: "var(--font-sans)", fontSize: 24, fontWeight: 600, letterSpacing: "-0.48px" }}
                    >
                      {standard.title}
                    </span>
                    <span
                      className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  {i < 3 && <div className="h-0.5 rounded-full bg-[#DFF8EC]" />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </FigmaCanvas>
    </section>
  );
}

function StandardsMobile() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 lg:hidden">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-10">
        <h2
          className="text-center"
          style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 8vw, 2.75rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
        >
          <span className="italic text-primary">Our</span>{" "}
          <span className="text-accent opacity-50">STANDARDS</span>
        </h2>

        <div className="flex w-full flex-col">
          {standards.map((standard, i) => (
            <div key={standard.number}>
              <div className="flex items-center gap-4 py-5">
                <span
                  className="shrink-0 opacity-50"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "clamp(2.5rem, 10vw, 3.5rem)",
                    fontWeight: 700,
                    ...textGradient,
                  }}
                >
                  {standard.number}
                </span>
                <span className="flex-1 text-lg font-semibold text-primary">{standard.title}</span>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              {i < standards.length - 1 && <div className="h-0.5 rounded-full bg-[#DFF8EC]" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StandardsSection() {
  return (
    <>
      <StandardsMobile />
      <StandardsDesktop />
    </>
  );
}
