"use client";

import { useEffect, useState, type ReactNode } from "react";


export function LazyMount({
  children,
  rootMargin = "120px 0px",
  minHeight,
}: {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
}) {
  const [armed, setArmed] = useState(false);
  const [show, setShow] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    let armedOnce = false;
    const arm = () => {
      if (armedOnce) return;
      armedOnce = true;
      setArmed(true);
    };

    const onInteract = () => arm();
    window.addEventListener("scroll", onInteract, { passive: true, once: true });
    window.addEventListener("touchstart", onInteract, { passive: true, once: true });
    window.addEventListener("pointerdown", onInteract, { passive: true, once: true });

    
    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(() => arm(), { timeout: 6000 })
        : null;
    const timeoutId = window.setTimeout(arm, 8000);

    return () => {
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      if (idleId != null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!armed || !node || show) return;
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
      { rootMargin, threshold: 0.01 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [armed, node, show, rootMargin]);

  return (
    <div ref={setNode} style={minHeight && !show ? { minHeight } : undefined}>
      {show ? children : null}
    </div>
  );
}
