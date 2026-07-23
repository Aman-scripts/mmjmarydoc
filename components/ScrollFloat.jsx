"use client";

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  as: Tag = 'h2',
  style,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 0.8,
  ease = 'back.out(1.7)',
  scrollStart = 'top 88%',
  scrollEnd,
  scrub = false,
  stagger = 0.025
}) => {
  const containerRef = useRef(null);

  // Split by word first (each word its own nowrap unit so chars inside it
  // can't line-break apart), joined by ordinary breakable spaces \u2014 so a long
  // heading still wraps normally between words on narrow screens instead of
  // being forced onto one line or breaking mid-word.
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    const words = text.split(' ');
    return words.map((word, wordIndex) => (
      <span className="word-wrap" key={wordIndex}>
        <span className="word">
          {word.split('').map((char, charIndex) => (
            <span className="char" key={charIndex}>
              {char}
            </span>
          ))}
        </span>
        {wordIndex < words.length - 1 ? ' ' : ''}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');

    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
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
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, scrub, stagger]);

  return (
    <Tag ref={containerRef} className={`scroll-float ${containerClassName}`} style={style}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </Tag>
  );
};

export default ScrollFloat;
