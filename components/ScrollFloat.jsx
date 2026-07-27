"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  as: Tag = 'h2',
  style,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 0.45,
  ease = 'power2.out',
  scrollStart = 'top 88%',
  scrollEnd,
  scrub = false,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub,
          once: !scrub
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, scrub]);

  return (
    <Tag ref={containerRef} className={containerClassName} style={style}>
      <span className={textClassName}>{children}</span>
    </Tag>
  );
};

export default ScrollFloat;
