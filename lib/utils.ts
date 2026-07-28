import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function mobileHeaderOffsetPx() {
  if (typeof window === "undefined") return 0
  if (window.matchMedia("(min-width: 1024px)").matches) return 0
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--mobile-header-offset")
    .trim()
  if (!raw) return 60
  const probe = document.createElement("div")
  probe.style.cssText = `position:absolute;visibility:hidden;height:${raw}`
  document.body.appendChild(probe)
  const px = probe.offsetHeight
  probe.remove()
  return px || 60
}

/** GSAP ScrollTrigger `start` that sticks/pins below the mobile header. */
export function scrollStartBelowMobileHeader() {
  const offset = mobileHeaderOffsetPx()
  return offset ? (`top ${offset}px` as const) : ("top top" as const)
}
