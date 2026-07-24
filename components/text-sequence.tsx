"use client";

import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollFloat.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Orchestrates intro animations in document order:
 * badge fade → heading chars (one block at a time) → description lines.
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
      items.forEach((item) => {
        gsap.set(item, { opacity: 1, clearProps: "transform" });
        item.querySelectorAll(".char, .seq-word, .seq-line").forEach((node) => {
          gsap.set(node, { opacity: 1, clearProps: "transform" });
        });
      });
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

      items.forEach((item) => {
        const mode = item.dataset.seq;

        if (mode === "fade") {
          gsap.set(item, { opacity: 0, y: 14 });
          tl.to(item, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, ">");
          return;
        }

        if (mode === "chars") {
          const chars = item.querySelectorAll(".char");
          if (!chars.length) return;
          gsap.set(chars, {
            opacity: 0,
            yPercent: 120,
            scaleY: 2.3,
            scaleX: 0.7,
            transformOrigin: "50% 0%",
          });
          tl.to(
            chars,
            {
              opacity: 1,
              yPercent: 0,
              scaleY: 1,
              scaleX: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
              stagger: 0.022,
            },
            ">"
          );
          return;
        }

        if (mode === "words") {
          const words = item.querySelectorAll(".seq-word");
          if (!words.length) return;
          gsap.set(words, { opacity: 0, y: 16 });
          tl.to(
            words,
            { opacity: 1, y: 0, duration: 0.38, ease: "power2.out", stagger: 0.055 },
            ">"
          );
          return;
        }

        if (mode === "lines") {
          const lines = item.querySelectorAll(".seq-line");
          if (!lines.length) return;
          gsap.set(lines, { opacity: 0, y: 14 });
          lines.forEach((line) => {
            tl.to(line, { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" }, ">");
          });
        }
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
  const splitText = useMemo(() => {
    const words = children.split(" ");
    return words.map((word, wordIndex) => (
      <span className="word-wrap" key={wordIndex}>
        <span className="word">
          {word.split("").map((char, charIndex) => (
            <span className="char" key={charIndex}>
              {char}
            </span>
          ))}
        </span>
        {wordIndex < words.length - 1 ? " " : ""}
      </span>
    ));
  }, [children]);

  return (
    <Tag
      data-seq="chars"
      className={`scroll-float ${containerClassName} ${className ?? ""}`.trim()}
      style={style}
    >
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
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
  const words = useMemo(() => children.split(" ").filter(Boolean), [children]);

  return (
    <Tag data-seq="words" className={className} style={style}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="seq-word" style={{ display: "inline-block" }}>
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
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
        <span key={i} className={`seq-line block ${lineClassName ?? ""}`.trim()}>
          {line}
        </span>
      ))}
    </Tag>
  );
}
