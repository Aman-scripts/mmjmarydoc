import { FigmaCanvas } from "@/components/figma-canvas";
import { MobileProcessCarousel } from "@/components/mobile-process-carousel";

// Coordinates lifted 1:1 from the Figma frame (62:139 -> instance "Steps",
// 83:332), each offset relative to this section's own top-left corner.
const TOP = 0;
const BOTTOM = 100;

const mobileGradient = {
  background:
    "linear-gradient(315deg, #4C8C1A 0%, #1D6540 32.2%, #0E5A4D 72.1%, #071D1A 100%)",
} as const;

// TODO: steps 1 and 3 copy is placeholder — the Figma API was rate-limited
// when pulling this, so only step 2's text ("Consult with MMJ Doctor") is
// confirmed from the source file. Swap these once the real copy is available.
const steps = [
  {
    number: 1,
    title: "Select Your State",
    description:
      "Tell us where you're located so we can confirm eligibility and connect you with a doctor licensed in your state's medical cannabis program.",
  },
  {
    number: 2,
    title: "Consult with MMJ Doctor",
    description:
      "Connect with our licensed MMJ Doctor via a video or audio call. The doctor will review your medical condition and determine eligibility under your state's medical cannabis program.",
  },
  {
    number: 3,
    title: "Get Your Medical Card",
    description:
      "Once approved, receive your medical marijuana recommendation and card, ready to use at licensed dispensaries in your state.",
  },
];

function MobileProcessSection() {
  return (
    <section className="relative w-full overflow-hidden px-5 py-16 sm:px-8 lg:hidden" style={mobileGradient}>
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <span className="rounded-full bg-[#DFF8EC] px-4 py-0.5 text-xs font-normal text-primary">
          Process
        </span>
        <h2
          className="text-[#FAFAF8]"
          style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.75rem, 7vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          Three Simple Steps to Apply for Your Medical Marijuana Card
        </h2>
        <p className="text-[#DFF8EC]" style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: "26px" }}>
          You need to follow a three-step process designed to prioritize your
          convenience and care. Every evaluation is conducted by a
          state-licensed MMJ doctor, giving you a reliable way to obtain your
          medical marijuana recommendation
        </p>
      </div>

      <MobileProcessCarousel steps={steps} />
    </section>
  );
}

export function ProcessSection() {
  return (
    <>
      <MobileProcessSection />

      <section
      className="relative hidden w-full overflow-hidden lg:block"
      style={mobileGradient}
    >
    <FigmaCanvas width={1440} height={TOP + 937 + BOTTOM} className="mx-auto">
      {/* Decorative ring behind the active step card */}
      <div
        className="pointer-events-none absolute rounded-full border"
        style={{ left: 228, top: TOP + 471, width: 984, height: 984, borderColor: "#DFF8EC" }}
      />

      {/* Inactive step numbers peeking at the edges */}
      <div
        className="absolute flex items-center justify-center rounded-full"
        style={{ left: 136, top: TOP + 845, width: 48, height: 48 }}
      >
        <span
          className="text-[#DFF8EC]"
          style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 32, fontWeight: 700, letterSpacing: "-0.64px" }}
        >
          1
        </span>
      </div>
      <div
        className="absolute flex items-center justify-center rounded-full"
        style={{ left: 1257, top: TOP + 845, width: 48, height: 48 }}
      >
        <span
          className="text-[#DFF8EC]"
          style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 32, fontWeight: 700, letterSpacing: "-0.64px" }}
        >
          3
        </span>
      </div>

      {/* Header: process tag + heading + subcopy */}
      <div className="absolute" style={{ left: 228, top: TOP + 70, width: 984 }}>
        <span
          className="mx-auto block w-fit rounded-full bg-[#DFF8EC] px-4 py-0.5 text-xs font-normal leading-[18px] tracking-[-0.24px] text-primary"
          style={{ marginBottom: 16 }}
        >
          Process
        </span>
        <h2
          className="text-center text-[#FAFAF8]"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 48,
            fontWeight: 700,
            lineHeight: "58px",
            letterSpacing: "-0.96px",
            marginTop: 16,
          }}
        >
          Three Simple Steps to Apply for Your Medical Marijuana Card
        </h2>
        <p
          className="mx-auto text-center text-[#DFF8EC]"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: "26px",
            letterSpacing: "-0.32px",
            marginTop: 16,
            maxWidth: 984,
          }}
        >
          You need to follow a three-step process designed to prioritize your
          convenience and care. Every evaluation is conducted by a
          state-licensed MMJ doctor, giving you a reliable way to obtain your
          medical marijuana recommendation
        </p>
      </div>

      {/* Active step badge + connector line */}
      <div className="absolute flex flex-col items-center" style={{ left: 692, top: TOP + 388, width: 57 }}>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DFF8EC]"
        >
          <span
            className="text-primary"
            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 32, fontWeight: 700, letterSpacing: "-0.64px" }}
          >
            2
          </span>
        </div>
        <span className="mt-[30px] h-3 w-3 rounded-full bg-background" />
        <span className="mt-[42px] w-px bg-[#DFF8EC]" style={{ height: 126 }} />
      </div>

      {/* Active step card */}
      <div className="absolute flex flex-col items-center gap-6 text-center" style={{ left: 409, top: TOP + 650, width: 621 }}>
        <div className="flex flex-col items-center gap-4">
          <h3
            className="text-[#FAFAF8]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 40,
              fontWeight: 700,
              lineHeight: "48px",
              letterSpacing: "-0.8px",
            }}
          >
            Consult with MMJ Doctor
          </h3>
          <p
            className="text-[#DFF8EC]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "26px",
              letterSpacing: "-0.32px",
              maxWidth: 528,
            }}
          >
            Connect with our licensed MMJ Doctor via a video or audio call.
            The doctor will review your medical condition and determine
            eligibility under your state&rsquo;s medical cannabis program.
          </p>
        </div>
        <a
          href="#book-consultation"
          className="rounded-full bg-[#DFF8EC] px-9 py-2 text-base font-semibold leading-[26px] tracking-[-0.32px] text-primary"
        >
          Book My Consultation
        </a>
      </div>
    </FigmaCanvas>
      </section>
    </>
  );
}
