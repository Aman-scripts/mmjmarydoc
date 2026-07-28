"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export function RevealOnView({
  children,
  delay = 0,
  duration = 600,
  animationName = "fade-up-in",
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  animationName?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        
        
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        animation: visible ? `${animationName} ${duration}ms ease-out ${delay}ms both` : "none",
      }}
    >
      {children}
    </div>
  );
}
