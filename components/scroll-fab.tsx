"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function ScrollFab({
  ctaHref = "#pricing",
  label = "Start Your Journey",
}: {
  ctaHref?: string;
  label?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [hiddenByFooter, setHiddenByFooter] = useState(false);
  const [ready, setReady] = useState(false);
  const hasExpandedOnce = useRef(false);

  useEffect(() => {
    const enable = () => setReady(true);
    window.addEventListener("scroll", enable, { passive: true, once: true });
    window.addEventListener("touchstart", enable, { passive: true, once: true });
    const timeoutId = window.setTimeout(enable, 3500);
    return () => {
      window.removeEventListener("scroll", enable);
      window.removeEventListener("touchstart", enable);
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const onScroll = () => {
      const shouldExpand = window.scrollY > 72;
      setExpanded((prev) => {
        if (shouldExpand !== prev) {
          if (shouldExpand && !hasExpandedOnce.current) {
            hasExpandedOnce.current = true;
            setBounce(true);
          }
          return shouldExpand;
        }
        return prev;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHiddenByFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [ready]);

  if (!ready) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!expanded) {
      e.preventDefault();
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  return (
    <a
      href={expanded ? ctaHref : "#content"}
      onClick={handleClick}
      onAnimationEnd={() => setBounce(false)}
      className={cn("scrollFab", expanded && "expanded", bounce && "bounce", hiddenByFooter && "fabHidden")}
      aria-label={label}
    >
      <span className="shell">
        <span className="core">
          <span className="label">{label}</span>
          {!expanded && (
            <Image src="/arrow.svg" alt="" width={22} height={19} className="scrollFabIcon" />
          )}
        </span>
      </span>
    </a>
  );
}
