"use client";

import { forwardRef } from "react";
import Image from "next/image";

type Step = {
  number: number;
  title: string;
  description: string;
};

type Props = {
  steps: Step[];
  active: number;
  onDotClick: (index: number) => void;
};

export const MobileProcessCarousel = forwardRef<HTMLDivElement, Props>(function MobileProcessCarousel(
  { steps, active, onDotClick },
  trackRef,
) {
  const stepCount = steps.length;

  return (
    <div className="relative">
      <div className="relative overflow-hidden">
        <div ref={trackRef} className="flex" style={{ width: `${stepCount * 100}%` }}>
          {steps.map((step) => (
            <div key={step.number} className="shrink-0 px-1" style={{ width: `${100 / stepCount}%` }}>
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
                  <Image src="/point.svg" alt="Step indicator marker" width={12} height={12} className="mt-[15px]" />
                  <Image
                    src="/line.svg"
                    alt="Step connector marker"
                    width={1}
                    height={40}
                    className="mt-[10px]"
                    style={{ width: 1, height: 40 }}
                  />
                </div>
                <h3
                  className="text-[#FAFAF8]"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.5rem, 6vw, 2rem)", fontWeight: 700 }}
                >
                  {step.title}
                </h3>
                <p className="text-[#DFF8EC]" style={{ fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: "28px" }}>
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
      </div>

      <div className="relative mt-6 flex items-center justify-center gap-3">
        {steps.map((step, index) => (
          <button
            key={step.number}
            type="button"
            aria-label={`Go to step ${step.number}`}
            onClick={() => onDotClick(index)}
            className={`h-2 rounded-full transition-all ${
              index === active ? "w-6 bg-[#DFF8EC]" : "w-2 bg-[#DFF8EC]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
});
