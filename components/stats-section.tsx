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

export function StatsSection() {
  return (
    <>
      <div className="px-5 py-12 sm:px-8 lg:hidden">
        <h2
          className="text-center text-primary"
          style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.75rem, 6vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          Find Care in <span className="text-accent">your state</span>
        </h2>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-10 sm:flex-row sm:justify-between">
          {stats.map((stat) => (
            <div key={stat.number} className="text-center sm:text-left">
              <span
                className="opacity-50"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "clamp(2.5rem, 12vw, 4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  ...textGradient,
                }}
              >
                {stat.number}
              </span>
              <p
                className="mt-2 text-primary"
                style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.25rem, 5vw, 1.5rem)", fontWeight: 700 }}
              >
                {stat.label.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="block">
                  {stat.lastLinePrefix}
                  <span className="text-accent">{stat.lastWord}</span>
                </span>
              </p>
              <span
                className="mx-auto mt-2 block h-1 w-16 rounded-full sm:mx-0"
                style={{
                  background:
                    "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
                }}
              />
            </div>
          ))}
        </div>
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
        Find Care in <span className="text-accent">your state</span>
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
