import type { CSSProperties } from "react";
import Image from "next/image";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { FigmaCanvas } from "@/components/figma-canvas";

// Coordinates lifted 1:1 from the Figma frame (62:139 -> Frame 68, 101:249),
// each offset relative to this section's own top-left corner (4899, 6914).
// Figma places a 100px gap before and after this block; the preceding
// section (Standards) already accounts for the gap on its own BOTTOM, so
// only the trailing gap is added here to avoid double-counting it.
const TOP = 0;
const BOTTOM = 100;

const reviewText =
  "I went to site chose document format, scheduled appt., and received consultation call within 2-3 minutes. Spent 5 min. on the interview, and had recommendation within minutes!";

const reviewer = { name: "Juan R Delgado II", time: "12 months ago" };

// The two side cards are almost entirely covered by the front card in the
// real design — only a sliver of their rounded edge peeks out — so they're
// rendered as plain solid panels rather than duplicating the full content.
function PeekCard({ style, rotate }: { style: CSSProperties; rotate: number }) {
  return (
    <div
      className="absolute rounded-[30px] bg-primary shadow-lg"
      style={{ ...style, transform: `rotate(${rotate}deg)` }}
    />
  );
}

function FrontCard({ style }: { style: CSSProperties }) {
  return (
    <div className="absolute overflow-hidden rounded-[30px] bg-[#DFF8EC] shadow-xl" style={style}>
      <Quote
        className="absolute text-white"
        style={{ left: 188, top: 0, width: 139, height: 139 }}
        fill="currentColor"
        strokeWidth={0}
      />

      <Image
        src="/google.svg"
        alt="Google"
        width={52}
        height={52}
        className="absolute"
        style={{ left: 40, top: 72 }}
      />

      <p
        className="absolute text-muted-foreground"
        style={{
          left: 40,
          top: 148,
          width: 295,
          fontSize: 18,
          fontWeight: 400,
          lineHeight: "28px",
          letterSpacing: "-0.36px",
        }}
      >
        {reviewText}
      </p>

      <a
        href="#read-more"
        className="absolute flex items-center justify-center rounded-full border border-primary text-base font-semibold leading-[26px] tracking-[-0.32px] text-primary"
        style={{ left: 40, top: 332, width: 151, height: 42 }}
      >
        Read More
      </a>

      <div className="absolute bg-border" style={{ left: 40, top: 398, width: 295, height: 1 }} />

      <div className="absolute flex items-center gap-3" style={{ left: 40, top: 422, width: 295, height: 52 }}>
        <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full">
          <Image src="/review-section-image1.svg" alt={reviewer.name} width={52} height={52} />
        </div>
        <div>
          <p className="text-lg text-foreground">{reviewer.name}</p>
          <p className="text-xs text-muted-foreground">{reviewer.time}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewsDesktop() {
  return (
    <section className="relative hidden bg-background lg:block">
      <FigmaCanvas width={1440} height={TOP + 755 + BOTTOM} className="mx-auto" style={{ overflow: "visible" }}>
        <span
          className="absolute flex items-center justify-center rounded-full bg-[#DFF8EC] text-xs font-normal leading-[18px] tracking-[-0.24px] text-primary"
          style={{ left: 681, top: TOP + 0, width: 78, height: 22 }}
        >
          Reviews
        </span>

        <h2
          className="absolute text-center text-primary"
          style={{
            left: 0,
            top: TOP + 38,
            width: 1439,
            fontFamily: "var(--font-sans)",
            fontSize: 48,
            fontWeight: 700,
            lineHeight: "58px",
            letterSpacing: "-0.96px",
          }}
        >
          Hear From <span className="text-accent">Our Patients</span>
        </h2>

        <p
          className="absolute text-center text-muted-foreground"
          style={{ left: 0, top: TOP + 112, width: 1439, fontSize: 16, lineHeight: "26px", letterSpacing: "-0.32px" }}
        >
          Real experiences shared by patients who chose MaryDoc for compassionate, physician-led care
        </p>

        <div className="absolute" style={{ left: 354, top: TOP + 212, width: 732, height: 517 }}>
          <PeekCard rotate={-6} style={{ left: 124, top: -4, width: 420, height: 491 }} />
          <PeekCard rotate={6} style={{ left: 187, top: -4, width: 420, height: 491 }} />
          <FrontCard style={{ left: 182, top: -1, width: 375, height: 514 }} />

          <button
            aria-label="Previous review"
            className="absolute flex h-[52px] w-[52px] items-center justify-center rounded-full text-white"
            style={{ left: 0, top: 232, background: "var(--gradient-primary)" }}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next review"
            className="absolute flex h-[52px] w-[52px] items-center justify-center rounded-full text-white"
            style={{ left: 680, top: 232, background: "var(--gradient-primary)" }}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </FigmaCanvas>
    </section>
  );
}

function ReviewsMobile() {
  return (
    <section className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 lg:hidden">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <span className="rounded-full bg-[#DFF8EC] px-4 py-0.5 text-xs font-normal text-primary">
          Reviews
        </span>
        <h2
          className="text-primary"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Hear From <span className="text-accent">Our Patients</span>
        </h2>
        <p className="text-base text-muted-foreground">
          Real experiences shared by patients who chose MaryDoc for compassionate, physician-led care
        </p>

        <div className="mt-6 flex w-full flex-col gap-6">
          <div className="relative flex flex-col overflow-hidden rounded-[30px] bg-[#DFF8EC] p-6 text-left shadow-md">
            <Quote className="absolute right-4 top-0 h-16 w-16 text-white" fill="currentColor" strokeWidth={0} />
            <Image src="/google.svg" alt="Google" width={44} height={44} />
            <p className="mt-6 text-base text-muted-foreground">{reviewText}</p>
            <a
              href="#read-more"
              className="mt-6 w-fit rounded-full border border-primary px-9 py-2 text-base font-semibold text-primary"
            >
              Read More
            </a>
            <div className="mt-6 h-px w-full bg-border" />
            <div className="mt-6 flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src="/review-section-image1.svg" alt={reviewer.name} width={48} height={48} />
              </div>
              <div>
                <p className="text-base text-foreground">{reviewer.name}</p>
                <p className="text-xs text-muted-foreground">{reviewer.time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <>
      <ReviewsMobile />
      <ReviewsDesktop />
    </>
  );
}
