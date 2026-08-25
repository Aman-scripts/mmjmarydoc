"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLeadModal } from "@/components/lead-capture-modal";

export function ScrollFab({
  ctaHref = "#pricing",
  label = "Start Your Journey",
}: {
  ctaHref?: string;
  label?: string;
}) {
  const { isOpen: isModalOpen } = useLeadModal();
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

    let retryId = 0;

    const updateFooterVisibility = () => {
      const footer = document.getElementById("site-footer");
      if (!footer) {
        setHiddenByFooter(false);
        return;
      }
      if (retryId) {
        window.clearInterval(retryId);
        retryId = 0;
      }

      const rect = footer.getBoundingClientRect();
      
      const fabTop = window.innerHeight - 120;
      const overlapsFab = rect.top < window.innerHeight && rect.bottom > fabTop;
      setHiddenByFooter(overlapsFab);
    };

    updateFooterVisibility();
    window.addEventListener("scroll", updateFooterVisibility, { passive: true });
    window.addEventListener("resize", updateFooterVisibility);
    
    retryId = window.setInterval(updateFooterVisibility, 400);

    return () => {
      window.removeEventListener("scroll", updateFooterVisibility);
      window.removeEventListener("resize", updateFooterVisibility);
      if (retryId) window.clearInterval(retryId);
    };
  }, [ready]);

  if (!ready) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!expanded) {
      e.preventDefault();
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  const isHidden = hiddenByFooter || isModalOpen;

  return (
    <a
      href={expanded ? ctaHref : "#content"}
      onClick={handleClick}
      onAnimationEnd={() => setBounce(false)}
      className={cn("scrollFab", expanded && "expanded", bounce && "bounce", isHidden && "fabHidden")}
      aria-label={label}
      aria-hidden={isHidden}
      tabIndex={isHidden ? -1 : undefined}
    >
      <span className="shell">
        <span className="core">
          <span className="label">{label}</span>
          {!expanded && (
            <Image src="/arrow.svg" alt="Scroll up icon" width={22} height={19} className="scrollFabIcon" />
          )}
        </span>
      </span>
    </a>
  );
}
