"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";

type MagneticHeroPlantProps = {
  className?: string;
  style?: CSSProperties;
};

export function MagneticHeroPlant({ className, style }: MagneticHeroPlantProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const host = hostRef.current;
    if (!wrap || !host) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;
    let svg: SVGSVGElement | null = null;
    let idle: gsap.core.Tween | null = null;

    fetch("/plant-desktop-one.svg")
      .then((res) => res.text())
      .then((markup) => {
        if (cancelled) return;
        host.innerHTML = markup;
        svg = host.querySelector("svg");
        if (!svg) return;

        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("preserveAspectRatio", "xMidYMax meet");
        svg.style.overflow = "visible";
        svg.style.display = "block";
        svg.setAttribute("shape-rendering", "geometricPrecision");
        svg.setAttribute("aria-hidden", "true");

        if (reduced) return;

        gsap.set(svg, {
          rotate: -4.5,
          transformOrigin: "50% 100%",
          force3D: true,
          backfaceVisibility: "hidden",
          willChange: "transform",
        });
        idle = gsap.to(svg, {
          rotate: 4.5,
          duration: 1.9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "50% 100%",
          force3D: true,
        });
      })
      .catch(() => {
        if (cancelled || host.querySelector("img")) return;
        const img = document.createElement("img");
        img.src = "/plant-desktop-one.svg";
        img.alt = "Marijuana plant growing in soil";
        img.className = "h-full w-full object-contain object-bottom";
        host.appendChild(img);
      });

    return () => {
      cancelled = true;
      idle?.kill();
      if (svg) gsap.killTweensOf(svg);
      host.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={style}
      aria-label="Marijuana plant growing in soil"
      role="img"
    >
      <div ref={hostRef} className="h-full w-full [&>svg]:h-full [&>svg]:w-full" />
    </div>
  );
}
