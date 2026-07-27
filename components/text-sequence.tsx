"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Orchestrates intro animations in document order with a simple fade-in.
 * Each [data-seq] child finishes before the next starts.
 */
export function TextSequence({
  children,
  className,
  style,
  start = "top 82%",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  start?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-seq]"));
    if (!items.length) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start,
          once: true,
        },
      });

      items.forEach((item, i) => {
        // Preserve CSS opacity (e.g. opacity-50) as the fade target instead of forcing 1.
        const targetOpacity = parseFloat(window.getComputedStyle(item).opacity);
        const endOpacity = Number.isFinite(targetOpacity) ? targetOpacity : 1;
        gsap.set(item, { opacity: 0 });
        tl.to(
          item,
          {
            opacity: endOpacity,
            duration: 0.22,
            ease: "power2.out",
            clearProps: "opacity",
          },
          i === 0 ? 0 : "-=0.08"
        );
      });
    }, root);

    return () => ctx.revert();
  }, [start]);

  return (
    <div ref={rootRef} className={className} style={style}>
      {children}
    </div>
  );
}

export function SeqFade({
  children,
  className,
  style,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}) {
  return (
    <Tag data-seq="fade" className={className} style={style}>
      {children}
    </Tag>
  );
}

export function SeqChars({
  children,
  className,
  style,
  containerClassName = "",
  textClassName = "",
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  style?: CSSProperties;
  containerClassName?: string;
  textClassName?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      data-seq="chars"
      className={`${containerClassName} ${className ?? ""}`.trim()}
      style={style}
    >
      <span className={textClassName}>{children}</span>
    </Tag>
  );
}

export function SeqWords({
  children,
  className,
  style,
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}) {
  return (
    <Tag data-seq="words" className={className} style={style}>
      {children}
    </Tag>
  );
}

export function SeqLines({
  lines,
  className,
  style,
  lineClassName,
  as: Tag = "p",
}: {
  lines: string[];
  className?: string;
  style?: CSSProperties;
  lineClassName?: string;
  as?: ElementType;
}) {
  return (
    <Tag data-seq="lines" className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} className={`block ${lineClassName ?? ""}`.trim()}>
          {line}
        </span>
      ))}
    </Tag>
  );
}
