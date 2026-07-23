import type { CSSProperties, ElementType, RefObject } from "react";

export interface ScrollFloatProps {
  children: string;
  as?: ElementType;
  style?: CSSProperties;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  scrub?: boolean;
  stagger?: number;
}

declare const ScrollFloat: (props: ScrollFloatProps) => JSX.Element;
export default ScrollFloat;
