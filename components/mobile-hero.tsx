import Image from "next/image";
import { MobileHeader } from "@/components/mobile-header";

const textGradient = {
  display: "inline-block",
  backgroundImage:
    "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  padding: "0.15em 0.1em",
  margin: "-0.15em -0.1em",
} as const;

export function MobileHero() {
  return (
    <section
      className="relative overflow-hidden pb-12"
      style={{ background: "linear-gradient(135deg, #DFF8EC 0%, #E6FFD2 100%)" }}
    >
      <MobileHeader />

      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-6 px-5 pt-4 text-center sm:px-8">
        <h1 className="italic text-primary" style={{ fontSize: "clamp(2rem, 9vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Your <span className="not-italic text-accent opacity-50">CARD</span>
        </h1>

        <div className="relative h-56 w-36 shrink-0 sm:h-64 sm:w-40">
          <Image src="/hero_section_plant.svg" alt="Marijuana plant" fill className="object-contain" priority />
        </div>

        <h2
          className="text-accent opacity-50"
          style={{ fontSize: "clamp(1.75rem, 8vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          MARIJUANA
        </h2>
        <h2 className="italic" style={{ fontSize: "clamp(2rem, 9vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", ...textGradient }}>
          With Guided
        </h2>
        <h2 className="italic" style={{ fontSize: "clamp(2rem, 9vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", ...textGradient }}>
          Care.
          <Image src="/small_leaf.svg" alt="" width={32} height={32} className="ml-2 inline-block align-middle" />
        </h2>

        <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
          MaryDoc connects you with licensed physicians in your state for
          secure online medical marijuana evaluations, all from the comfort
          of your home.
        </p>
      </div>
    </section>
  );
}
