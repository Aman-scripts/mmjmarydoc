"use client";

import { useState, useRef, useEffect } from "react";
import "./BubbleMenu.css";

const DEFAULT_ITEMS = [
  {
    label: "home",
    href: "#",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
  },
  {
    label: "about",
    href: "#",
    ariaLabel: "About",
    rotation: 8,
    hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
  },
  {
    label: "projects",
    href: "#",
    ariaLabel: "Documentation",
    rotation: 8,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
  },
  {
    label: "blog",
    href: "#",
    ariaLabel: "Blog",
    rotation: 8,
    hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
  },
  {
    label: "contact",
    href: "#",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
  },
];

export default function BubbleMenu({
  logo,
  onMenuClick = undefined,
  className = "",
  style = undefined,
  menuAriaLabel = "Toggle menu",
  menuBg = "#fff",
  menuContentColor = "#111",
  useFixedPosition = false,
  items,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);
  const gsapRef = useRef(null);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;
  const containerClassName = [
    "bubble-menu",
    useFixedPosition ? "fixed" : "absolute",
    scrolled ? "scrolled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    if (!useFixedPosition) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [useFixedPosition]);

  const loadGsap = async () => {
    if (gsapRef.current) return gsapRef.current;
    const mod = await import("gsap");
    gsapRef.current = mod.gsap || mod.default;
    return gsapRef.current;
  };

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    onMenuClick?.(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("mobile-menu-open");
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;
    if (!isMenuOpen && !showOverlay) return;

    let cancelled = false;

    (async () => {
      const gsap = await loadGsap();
      if (cancelled) return;

      if (isMenuOpen) {
        gsap.set(overlay, { display: "flex" });
        gsap.killTweensOf([...bubbles, ...labels]);
        gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
        gsap.set(labels, { y: 24, autoAlpha: 0 });

        bubbles.forEach((bubble, i) => {
          const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
          const tl = gsap.timeline({ delay });

          tl.to(bubble, {
            scale: 1,
            duration: animationDuration,
            ease: animationEase,
          });
          if (labels[i]) {
            tl.to(
              labels[i],
              {
                y: 0,
                autoAlpha: 1,
                duration: animationDuration,
                ease: "power3.out",
              },
              `-=${animationDuration * 0.9}`
            );
          }
        });
      } else if (showOverlay) {
        gsap.killTweensOf([...bubbles, ...labels]);
        gsap.to(labels, {
          y: 24,
          autoAlpha: 0,
          duration: 0.2,
          ease: "power3.in",
        });
        gsap.to(bubbles, {
          scale: 0,
          duration: 0.2,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
            setShowOverlay(false);
          },
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = async () => {
      if (!isMenuOpen) return;
      const gsap = await loadGsap();
      const bubbles = bubblesRef.current.filter(Boolean);
      const isDesktop = window.innerWidth >= 900;

      bubbles.forEach((bubble, i) => {
        const item = menuItems[i];
        if (bubble && item) {
          const rotation = isDesktop ? (item.rotation ?? 0) : 0;
          gsap.set(bubble, { rotation });
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <>
      <nav className={containerClassName} style={style} aria-label="Main navigation">
        <div className="logo-bubble" aria-label="Logo">
          <span className="logo-content">
            {typeof logo === "string" ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}
          </span>
        </div>

        <button
          type="button"
          className={`bubble toggle-bubble menu-btn ${isMenuOpen ? "open" : ""}`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={scrolled ? undefined : { background: menuBg }}
        >
          <span className="menu-line" style={{ background: menuContentColor }} />
          <span className="menu-line" style={{ background: menuContentColor }} />
          <span className="menu-line short" style={{ background: menuContentColor }} />
        </button>
      </nav>
      {showOverlay && (
        <div
          ref={overlayRef}
          className={`bubble-menu-items ${useFixedPosition ? "fixed" : "absolute"}`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="pill-list" role="menu" aria-label="Menu links">
            {menuItems.map((item, idx) => (
              <li key={idx} role="none" className="pill-col">
                <a
                  role="menuitem"
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className="pill-link"
                  onClick={closeMenu}
                  style={{
                    "--item-rot": `${item.rotation ?? 0}deg`,
                    "--pill-bg": item.bg || menuBg,
                    "--pill-color": item.textColor || menuContentColor,
                    "--hover-bg": item.hoverStyles?.bgColor || item.bg || "#f3f4f6",
                    "--hover-color":
                      item.hoverStyles?.textColor || item.textColor || menuContentColor,
                  }}
                  ref={(el) => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                >
                  <span
                    className="pill-label"
                    ref={(el) => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
