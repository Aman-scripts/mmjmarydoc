"use client";

import BubbleMenu from "@/components/BubbleMenu";

const navItems = [
  {
    label: "Our Story",
    href: "#our-story",
    ariaLabel: "Our Story",
    rotation: -6,
    hoverStyles: { bgColor: "#0E5A4D", textColor: "#ffffff" },
  },
  {
    label: "What we stand for",
    href: "#",
    ariaLabel: "What we stand for",
    rotation: 6,
    hoverStyles: { bgColor: "#4C8C1A", textColor: "#ffffff" },
  },
  {
    label: "Our Standards",
    href: "#",
    ariaLabel: "Our Standards",
    rotation: -6,
    hoverStyles: { bgColor: "#0E5A4D", textColor: "#ffffff" },
  },
  {
    label: "Care in your State",
    href: "#care-in-your-state",
    ariaLabel: "Care in your State",
    rotation: 6,
    bg: "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
    textColor: "#ffffff",
  },
];

export function MobileHeader() {
  return (
    <BubbleMenu
      logo="/logo_marydoc.svg"
      items={navItems}
      menuAriaLabel="Toggle menu"
      menuBg="#DFF8EC"
      menuContentColor="#0E5A4D"
      useFixedPosition={true}
      animationEase="back.out(1.5)"
      animationDuration={0.5}
      staggerDelay={0.12}
    />
  );
}
