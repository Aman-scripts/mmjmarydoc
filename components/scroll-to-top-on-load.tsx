"use client";

import { useEffect } from "react";

/** Always land on the hero after refresh / back-forward cache restore. */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const toTop = () => window.scrollTo(0, 0);
    toTop();

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) toTop();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
