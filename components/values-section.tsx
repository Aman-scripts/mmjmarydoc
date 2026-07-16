import { FigmaCanvas } from "@/components/figma-canvas";
import { ShieldCheck, Globe, Heart, Award } from "lucide-react";

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

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 100, 95:1340),
// each offset relative to this section's own top-left corner (4899, 3676).
// Figma places a 100px gap before and after this block, added as TOP/BOTTOM.
const TOP = 100;
const BOTTOM = 100;

const cards = [
  {
    Icon: ShieldCheck,
    title: "Trust",
    description:
      "Every evaluation is conducted by a state-licensed physician. No shortcuts and no exceptions, just real medical care you can rely on.",
    left: -180,
    top: 463,
    width: 459,
    height: 422,
    number: "1",
    numberLeft: 43,
    numberTop: 416,
    rotate: -19.67,
  },
  {
    Icon: Globe,
    title: "Access",
    description:
      "Care should not depend on where you live. Our services are designed to be accessible online, so you can connect with a physician from anywhere.",
    left: 311,
    top: 408,
    width: 400,
    height: 344,
    number: "2",
    numberLeft: 564,
    numberTop: 347,
    rotate: -4.81,
  },
  {
    Icon: Heart,
    title: "Compassion",
    description:
      "No one should feel judged for managing their health. All patients are treated with respect, privacy, and care from the very first step.",
    left: 743,
    top: 412,
    width: 403,
    height: 348,
    number: "3",
    numberLeft: 1021,
    numberTop: 375,
    rotate: 5.34,
  },
  {
    Icon: Award,
    title: "Experience",
    description:
      "Behind every consultation is a team with years of experience across multiple states, focused on making the entire process clear and stress-free.",
    left: 1178,
    top: 480,
    width: 455,
    height: 416,
    number: "4",
    numberLeft: 1493,
    numberTop: 503,
    rotate: 18.38,
  },
];

function ValuesDesktop() {
  return (
    <section className="relative hidden bg-background lg:block">
      <FigmaCanvas width={1440} height={TOP + 929 + BOTTOM} className="mx-auto">
        <h2
          className="absolute whitespace-nowrap"
          style={{
            left: 173,
            top: TOP + 0,
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: 100,
            lineHeight: "155px",
            letterSpacing: "-2px",
          }}
        >
          <span className="italic text-primary">Four things</span>{" "}
          <span className="text-accent opacity-50" style={{ fontSize: 110, letterSpacing: "-2.2px" }}>
            WE NEVER
          </span>
        </h2>
        <h2
          className="absolute whitespace-nowrap"
          style={{
            left: 247,
            top: TOP + 155,
            fontWeight: 800,
            fontFamily: "var(--font-sans)",
            fontSize: 110,
            lineHeight: "155px",
            letterSpacing: "-2.2px",
          }}
        >
          <span className="text-accent opacity-50">COMPROMISE</span>{" "}
          <span className="italic" style={{ fontSize: 100, ...textGradient }}>
            On
          </span>
        </h2>

        {cards.map((card) => (
          <div
            key={card.title}
            className="absolute"
            style={{
              left: card.left,
              top: TOP + card.top,
              width: card.width,
              height: card.height,
              transform: `rotate(${card.rotate}deg)`,
            }}
          >
            <div
              className="relative z-10 flex h-full w-full flex-col gap-4 overflow-hidden rounded-[30px] bg-[#DFF8EC] p-10 pt-[62px] shadow-md"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-full text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <card.Icon className="h-8 w-8" />
                </div>
                <span
                  className="text-primary"
                  style={{ fontFamily: "var(--font-sans)", fontSize: 32, fontWeight: 600, letterSpacing: "-0.64px" }}
                >
                  {card.title}
                </span>
              </div>
              <p
                className="text-muted-foreground"
                style={{ fontSize: 18, lineHeight: "28px", letterSpacing: "-0.36px" }}
              >
                {card.description}
              </p>
            </div>

            <span
              className="pointer-events-none absolute z-20 select-none"
              style={{
                right: -30,
                top: -90,
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 160,
                fontWeight: 700,
                letterSpacing: "-3.2px",
                ...textGradient,
                opacity: 0.55,
                transform: `rotate(${-card.rotate}deg)`,
                transformOrigin: "top right",
                WebkitMaskImage: "linear-gradient(to bottom, black 45%, transparent 85%)",
                maskImage: "linear-gradient(to bottom, black 45%, transparent 85%)",
              }}
            >
              {card.number}
            </span>
          </div>
        ))}

        <a
          href="#get-your-card"
          className="absolute flex items-center justify-center rounded-full text-base font-semibold leading-[26px] tracking-[-0.32px] text-white"
          style={{
            left: 634,
            top: TOP + 794,
            width: 174,
            height: 42,
            background:
              "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
          }}
        >
          Get your Card
        </a>
      </FigmaCanvas>
    </section>
  );
}

function ValuesMobile() {
  return (
    <section className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 lg:hidden">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-10 text-center">
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 8vw, 2.75rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="italic text-primary">Four things</span>{" "}
          <span className="text-accent opacity-50">WE NEVER COMPROMISE</span>{" "}
          <span className="italic" style={textGradient}>
            On
          </span>
        </h2>

        <div className="flex w-full flex-col gap-6">
          {cards.map((card) => (
            <div key={card.title} className="relative overflow-hidden rounded-[30px] bg-[#DFF8EC] p-8 text-left">
              <span
                className="pointer-events-none absolute right-4 top-2 select-none"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "clamp(4rem, 20vw, 6rem)",
                  fontWeight: 700,
                  ...textGradient,
                  opacity: 0.15,
                }}
              >
                {card.number}
              </span>
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <card.Icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-semibold text-primary">{card.title}</span>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="#get-your-card"
          className="rounded-full px-9 py-3 text-base font-semibold text-white"
          style={{
            background:
              "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
          }}
        >
          Get your Card
        </a>
      </div>
    </section>
  );
}

export function ValuesSection() {
  return (
    <>
      <ValuesMobile />
      <ValuesDesktop />
    </>
  );
}
