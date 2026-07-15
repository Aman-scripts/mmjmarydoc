"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Slide = {
  src: string;
  alt: string;
};

export function MobileImageCarousel({
  slides,
  dotColorClass = "bg-primary",
}: {
  slides: Slide[];
  dotColorClass?: string;
}) {
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
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide) => (
          <div key={slide.src} className="w-full shrink-0 snap-center px-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px]">
              <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Go to image ${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === active ? `w-6 ${dotColorClass}` : `w-2 ${dotColorClass}/30`
            }`}
          />
        ))}
      </div>
    </div>
  );
}
