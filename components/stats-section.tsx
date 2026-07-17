import { FigmaCanvas } from "@/components/figma-canvas";

const textGradient = {
  display: "inline-block",
  backgroundImage:
    "linear-gradient(135deg, #4C8C1A 0%, #155F46 40.4%, #0E5A4D 70%, #0A3832 100%)",
  backgroundSize: "200% 200%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
} as const;

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 83), each
// offset relative to this section's own top-left corner. Figma places a
// 100px gap before and after this block, which we add as TOP/BOTTOM here
// since the source coordinates have no built-in whitespace.
const TOP = 100;
const BOTTOM = 100;
const CONTAINER = { left: 185, width: 1069 };

const stats = [
  {
    left: 0,
    number: "100%",
    label: ["Licensed"],
    lastLinePrefix: "",
    lastWord: "Doctors",
    labelLeft: 208,
    underlineLeft: 278,
  },
  {
    left: 654,
    number: "30+",
    label: ["Trusted by"],
    lastLinePrefix: "Patients in ",
    lastWord: "States",
    labelLeft: 798 - 654,
    underlineLeft: 1002 - 654,
  },
];

// Coordinates lifted 1:1 from the Figma mobile frame (286:6205 -> Mobile ->
// Frame 83), each offset relative to this block's own top-left corner.
const MOBILE_STATS = [
  {
    number: "100%",
    numberBox: { left: 35, top: 78, width: 196, height: 90 },
    label: ["Licensed"],
    lastLinePrefix: "",
    lastWord: "Doctors",
    labelBox: { left: 190, top: 157, width: 88 },
    underline: { left: 209, top: 217 },
  },
  {
    number: "30+",
    numberBox: { left: 52, top: 264, width: 147, height: 90 },
    label: ["Trusted by"],
    lastLinePrefix: "Patients in ",
    lastWord: "States",
    labelBox: { left: 168, top: 334, width: 162 },
    underline: { left: 263, top: 397 },
  },
];

export function StatsSection() {
  return (
    <>
      <div className="px-5 py-12 sm:px-8 lg:hidden">
        <FigmaCanvas width={358} height={417} className="mx-auto">
          <h2
            className="absolute text-left text-primary"
            style={{
              left: 0,
              top: 0,
              width: 358,
              fontFamily: "var(--font-sans)",
              fontSize: 32,
              fontWeight: 700,
              lineHeight: "40px",
              letterSpacing: "-0.64px",
            }}
          >
            Find Care in <span className="italic text-accent">your state</span>
          </h2>

          {MOBILE_STATS.map((stat) => (
            <div key={stat.number}>
              <span
                className="absolute opacity-50"
                style={{
                  ...stat.numberBox,
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: 80,
                  fontWeight: 700,
                  lineHeight: "90px",
                  letterSpacing: "-1.6px",
                  ...textGradient,
                }}
              >
                {stat.number}
              </span>
              <p
                className="absolute text-primary"
                style={{
                  ...stat.labelBox,
                  fontFamily: "var(--font-sans)",
                  fontSize: 20,
                  fontWeight: 700,
                  lineHeight: "28px",
                  letterSpacing: "-0.4px",
                }}
              >
                {stat.label.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
                <span className="block whitespace-nowrap">
                  {stat.lastLinePrefix}
                  <span className="text-accent">{stat.lastWord}</span>
                </span>
              </p>
              <span
                className="absolute rounded-full"
                style={{
                  left: stat.underline.left,
                  top: stat.underline.top,
                  width: 77,
                  height: 4,
                  background:
                    "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
                }}
              />
            </div>
          ))}
        </FigmaCanvas>
      </div>

      <div className="hidden lg:block">
        <FigmaCanvas width={1440} height={TOP + 345 + BOTTOM} className="mx-auto">
      <h2
        className="absolute text-center text-primary"
        style={{
          left: CONTAINER.left,
          top: TOP,
          width: CONTAINER.width,
          fontFamily: "var(--font-sans)",
          fontSize: 48,
          fontWeight: 700,
          lineHeight: "58px",
          letterSpacing: "-0.96px",
        }}
      >
        Find Care in <span className="italic text-accent">your state</span>
      </h2>

      <div className="absolute" style={{ left: CONTAINER.left, top: TOP + 114, width: CONTAINER.width, height: 231 }}>
        {stats.map((stat) => (
          <div key={stat.number} className="absolute" style={{ left: stat.left, top: 0, width: 415, height: 231 }}>
            <span
              className="absolute opacity-50"
              style={{
                left: 0,
                top: 0,
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 120,
                fontWeight: 700,
                lineHeight: "155px",
                letterSpacing: "-2.4px",
                ...textGradient,
              }}
            >
              {stat.number}
            </span>
            <p
              className="absolute text-primary"
              style={{
                left: stat.labelLeft,
                top: 141,
                fontFamily: "var(--font-sans)",
                fontSize: 32,
                fontWeight: 700,
                lineHeight: "40px",
                letterSpacing: "-0.64px",
              }}
            >
              {stat.label.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
              <span className="block whitespace-nowrap">
                {stat.lastLinePrefix}
                <span className="text-accent">{stat.lastWord}</span>
              </span>
            </p>
            <span
              className="absolute rounded-full"
              style={{
                left: stat.underlineLeft,
                top: 227,
                width: 77,
                height: 4,
                background:
                  "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
              }}
            />
          </div>
        ))}
      </div>
        </FigmaCanvas>
      </div>
    </>
  );
}
