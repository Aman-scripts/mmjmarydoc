"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";

type MagneticHeroPlantProps = {
  className?: string;
  style?: CSSProperties;
};

/** Brand-colored grab cursors (primary green — not the default white OS hand). */
const CURSOR_GRAB = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'><path d='M11 14V8.5a1.5 1.5 0 0 1 3 0V13M14 13V7a1.5 1.5 0 0 1 3 0v6M17 13V7.5a1.5 1.5 0 0 1 3 0V14M20 14.5V10a1.5 1.5 0 0 1 3 0v8.5c0 3.5-2.2 6.5-6.2 6.5H15c-3.5 0-6-2-7.5-4.5L6 17.5a1.6 1.6 0 0 1 2.6-1.9L10 17v-3' stroke='#0E5A4D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='#DFF8EC'/></svg>`
)}") 10 6, grab`;

const CURSOR_GRABBING = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'><path d='M11 15V11a1.5 1.5 0 0 1 3 0v3M14 14V10.5a1.5 1.5 0 0 1 3 0V14M17 14V11a1.5 1.5 0 0 1 3 0v4M20 15v-2a1.5 1.5 0 0 1 3 0v7c0 3.2-2.2 6-6.2 6H15c-3.2 0-5.6-1.8-7-4.2L6.5 18a1.5 1.5 0 0 1 2.4-1.8L10 18v-3' stroke='#0E5A4D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='#4C8C1A' fill-opacity='0.35'/></svg>`
)}") 10 8, grabbing`;

/**
 * Click-and-drag: whole plant leans magnetically from the soil.
 * Click a leaf/stem path: that piece shakes in place (rotate only, rooted
 * to its own box) so parts stay attached to the illustration.
 */
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
    let paths: SVGPathElement[] = [];
    let dragging = false;
    let activePath: SVGPathElement | null = null;
    let idle: gsap.core.Tween | null = null;

    const setCursor = (value: string) => {
      if (svg) svg.style.cursor = value;
      paths.forEach((path) => {
        path.style.cursor = value;
      });
      wrap.style.cursor = value;
    };

    const clearIdle = () => {
      idle?.kill();
      idle = null;
    };

    const startIdle = () => {
      if (!svg || reduced || dragging) return;
      clearIdle();
      // Gentle breeze: whole tree rocks left ↔ right from the soil.
      gsap.set(svg, { rotate: -4.5, transformOrigin: "50% 100%" });
      idle = gsap.to(svg, {
        rotate: 4.5,
        duration: 1.9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 100%",
      });
    };

    const leanPlant = (clientX: number) => {
      if (!svg) return;
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const dx = gsap.utils.clamp(
        -1,
        1,
        (clientX - cx) / Math.max(rect.width * 0.7, 1)
      );
      gsap.to(svg, {
        rotate: dx * 12,
        x: dx * 12,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto",
        transformOrigin: "50% 100%",
      });
    };

    const shakePath = (path: SVGPathElement) => {
      // Rotate-only around the path’s own box — keeps fills on the drawing.
      gsap.fromTo(
        path,
        { rotate: 0 },
        {
          keyframes: [
            { rotate: -9, duration: 0.08 },
            { rotate: 10, duration: 0.1 },
            { rotate: -7, duration: 0.1 },
            { rotate: 5, duration: 0.1 },
            { rotate: -2, duration: 0.1 },
            { rotate: 0, duration: 0.18 },
          ],
          ease: "power1.inOut",
          overwrite: true,
          transformOrigin: "50% 80%",
        }
      );
    };

    const onPointerDown = (e: PointerEvent) => {
      if (reduced || !svg) return;
      const target = e.target;
      if (!(target instanceof SVGPathElement) || !svg.contains(target)) return;

      e.preventDefault();
      clearIdle();
      dragging = true;
      activePath = target;
      setCursor(CURSOR_GRABBING);
      wrap.setPointerCapture?.(e.pointerId);

      // Shake the clicked stem/leaf immediately.
      shakePath(target);
      leanPlant(e.clientX);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || !svg) return;
      leanPlant(e.clientX);

      // Keep rustling the grabbed piece while dragging.
      if (activePath) {
        const rect = wrap.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const dx = gsap.utils.clamp(
          -1,
          1,
          (e.clientX - cx) / Math.max(rect.width * 0.7, 1)
        );
        gsap.to(activePath, {
          rotate: dx * 14,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
          transformOrigin: "50% 80%",
        });
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      setCursor(CURSOR_GRAB);
      wrap.releasePointerCapture?.(e.pointerId);

      if (activePath) {
        gsap.to(activePath, {
          rotate: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.45)",
          overwrite: "auto",
          transformOrigin: "50% 80%",
        });
        activePath = null;
      }

      if (svg) {
        gsap.to(svg, {
          rotate: 0,
          x: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto",
          transformOrigin: "50% 100%",
          onComplete: startIdle,
        });
      }
    };

    fetch("/hero-plant-desktop.svg")
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
        svg.setAttribute("aria-hidden", "true");

        paths = Array.from(svg.querySelectorAll("path"));
        paths.forEach((path) => {
          path.style.transformBox = "fill-box";
          path.style.transformOrigin = "50% 80%";
          path.style.pointerEvents = "all";
          path.style.touchAction = "none";
        });
        setCursor(CURSOR_GRAB);

        if (reduced) return;

        wrap.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);
        startIdle();
      })
      .catch(() => {
        if (cancelled || host.querySelector("img")) return;
        const img = document.createElement("img");
        img.src = "/hero-plant-desktop.svg";
        img.alt = "Marijuana plant growing in soil";
        img.className = "h-full w-full object-contain object-bottom";
        host.appendChild(img);
      });

    return () => {
      cancelled = true;
      clearIdle();
      wrap.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      if (svg) gsap.killTweensOf(svg);
      if (paths.length) gsap.killTweensOf(paths);
      host.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ touchAction: "none", ...style }}
      aria-label="Marijuana plant growing in soil — click a leaf or stem and drag to shake"
      role="img"
    >
      <div ref={hostRef} className="h-full w-full [&>svg]:h-full [&>svg]:w-full" />
    </div>
  );
}
