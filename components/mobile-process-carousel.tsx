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
    <div className="mt-8">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step) => (
          <div key={step.number} className="w-full shrink-0 snap-center px-1">
            <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-3xl bg-white/5 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DFF8EC]">
                <span
                  className="text-primary"
                  style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 32, fontWeight: 700 }}
                >
                  {step.number}
                </span>
              </div>
              <h3
                className="text-[#FAFAF8]"
                style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.5rem, 6vw, 2rem)", fontWeight: 700 }}
              >
                {step.title}
              </h3>
              <p className="text-[#DFF8EC]" style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: "26px" }}>
                {step.description}
              </p>
              {step.number === 2 && (
                <a
                  href="#book-consultation"
                  className="rounded-full bg-[#DFF8EC] px-9 py-2 text-base font-semibold text-primary"
                >
                  Book My Consultation
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
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
