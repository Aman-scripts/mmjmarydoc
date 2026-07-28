import type { CSSProperties, ReactNode } from "react";


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
