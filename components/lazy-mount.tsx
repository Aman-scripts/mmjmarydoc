"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Mounts children only when near the viewport so below-fold GSAP/sections
 * don't pay JS cost on initial load. SSR still renders a lightweight shell.
 */
export function LazyMount({
  children,
  rootMargin = "200px 0px",
  minHeight,
}: {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
}) {
  const [show, setShow] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node || show) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node, show, rootMargin]);

  return (
    <div ref={setNode} style={minHeight && !show ? { minHeight } : undefined}>
      {show ? children : null}
    </div>
  );
}
