import { cn } from "@/lib/utils";

export type Pebble = { x: number; y: number; r: number; color?: string };


const DEFAULT_PEBBLES: Pebble[] = [
  { x: 2, y: 70, r: 3.5 },
  { x: 5.5, y: 85, r: 7.4 },
  { x: 11, y: 62, r: 1.9 },
  { x: 17, y: 91, r: 4.5 },
  { x: 23, y: 68, r: 2.4 },
  { x: 25, y: 80, r: 5.8 },
  { x: 33, y: 60, r: 2.1 },
  { x: 40, y: 88, r: 8.3 },
  { x: 42, y: 71, r: 2.7 },
  { x: 53, y: 63, r: 3.8 },
  { x: 58, y: 84, r: 2.1 },
  { x: 64, y: 92, r: 5.1 },
  { x: 65, y: 66, r: 2.6 },
  { x: 74, y: 78, r: 6.4 },
  { x: 83, y: 61, r: 2.2 },
  { x: 85, y: 74, r: 4.2 },
  { x: 90, y: 89, r: 2.9 },
  { x: 96, y: 68, r: 5.4 },
];


const LIGHT_TONE = "#846240";

export function pebbleImage(pebbles: Pebble[], color: string = LIGHT_TONE) {
  return pebbles
    .map((p) => {
      const c = p.color ?? color;
      return `radial-gradient(circle at ${p.x}% ${p.y}%, ${c} 0, ${c} ${p.r}px, transparent ${p.r + 1}px)`;
    })
    .join(", ");
}

/** Deterministic PRNG (mulberry32) — same output on server and client, so no hydration mismatch. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Scatters `count` pebbles across a 0-100% field with no repeating unit —
 * for large areas, tiling a small hand-placed swatch (however irregular)
 * still stamps the same shape over and over and reads as a grid once you
 * step back. A single non-tiled random field avoids that entirely. Sizes
 * skew small (squared random roll) so big stones stay rare, like real
 * grit — mirroring the mostly-tiny, occasionally-bigger dots already in
 * public/hero-soil.png.
 */
export function generatePebbleField(count: number, seed: number, minY: number = 2): Pebble[] {
  const rand = mulberry32(seed);
  const pebbles: Pebble[] = [];
  for (let i = 0; i < count; i++) {
    const x = Number((2 + rand() * 96).toFixed(1));
    const y = Number((minY + rand() * (98 - minY)).toFixed(1));
    const r = Number((1.6 + Math.pow(rand(), 2.2) * 7.5).toFixed(1));
    const light = rand() > 0.5;
    const alpha = 0.16 + rand() * 0.2;
    const color = light
      ? `rgba(255,241,214,${alpha.toFixed(2)})`
      : `rgba(28,16,4,${(alpha * 1.3).toFixed(2)})`;
    pebbles.push({ x, y, r, color });
  }
  return pebbles;
}

/** Small flat pebbles scattered across a soil band, styled like the dots already baked into hero-soil.png. */
export function SoilPebbles({
  className,
  style,
  pebbles = DEFAULT_PEBBLES,
  color,
}: {
  className?: string;
  style?: React.CSSProperties;
  pebbles?: Pebble[];
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={{ backgroundImage: pebbleImage(pebbles, color), ...style }}
    />
  );
}
