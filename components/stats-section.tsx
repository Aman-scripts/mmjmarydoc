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
    <section className="relative mx-auto" style={{ width: 1440, height: TOP + 345 + BOTTOM }}>
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
    </section>
  );
}
