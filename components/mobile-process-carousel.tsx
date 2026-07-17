"use client";

import { useRef, useState } from "react";

type Step = {
  number: number;
  title: string;
  description: string;
};

export function MobileProcessCarousel({ steps }: { steps: Step[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActive(index);
  }

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="relative mt-8">
      {/* Decorative ring behind the active step, matching the desktop treatment */}
      <div
        className="pointer-events-none absolute rounded-full border"
        style={{ left: "50%", top: 40, width: 620, height: 620, transform: "translateX(-50%)", borderColor: "rgba(223,248,236,0.3)" }}
      />

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="relative flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step) => (
          <div key={step.number} className="w-full shrink-0 snap-center px-1">
            <div className="mx-auto flex max-w-xl flex-col items-center gap-4 p-6 text-center">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DFF8EC]">
                  <span
                    className="text-primary"
                    style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 32, fontWeight: 700 }}
                  >
                    {step.number}
                  </span>
                </div>
                <span className="mt-[15px] h-2 w-2 rounded-full bg-background" />
                <span className="mt-[10px] w-px bg-[#DFF8EC]" style={{ height: 40 }} />
              </div>
              <h3
                className="text-[#FAFAF8]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.5rem, 6vw, 2rem)", fontWeight: 700 }}
              >
                {step.title}
              </h3>
              <p className="italic text-[#DFF8EC]" style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: "26px" }}>
                {step.description}
              </p>
              <a
                href="#book-consultation"
                className="rounded-full bg-[#DFF8EC] px-9 py-2 text-base font-semibold text-primary"
              >
                Book My Consultation
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-center gap-3">
        {steps.map((step, index) => (
          <button
            key={step.number}
            type="button"
            aria-label={`Go to step ${step.number}`}
            onClick={() => scrollToIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === active ? "w-6 bg-[#DFF8EC]" : "w-2 bg-[#DFF8EC]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
