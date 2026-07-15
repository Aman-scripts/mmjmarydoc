import type { CSSProperties, ReactNode } from "react";

/**
 * Wraps a fixed-size, pixel-perfect Figma layout (absolute-positioned
 * children at design-time coordinates) and scales the whole thing down
 * uniformly to fit any viewport width, using CSS container query units.
 * The design itself never reflows — it just shrinks/grows like a poster.
 */
export function FigmaCanvas({
  width,
  height,
  className,
  style,
  children,
}: {
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        overflow: "hidden",
        containerType: "inline-size",
        ...style,
      }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(calc(100cqw / ${width}px))`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
