import Image from "next/image";
import Link from "next/link";
import FuzzyText from "@/components/FuzzyText";

export default function NotFound() {
  return (
    <section
      className="relative flex min-h-dvh flex-1 flex-col items-center justify-center gap-7 overflow-hidden px-5 py-16 text-center"
      style={{ background: "linear-gradient(135deg, #DFF8EC 0%, #E6FFD2 100%)" }}
    >
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-[#F4A261]/30 blur-3xl" />
      <Image
        src="/small_leaf.svg"
        alt=""
        width={91}
        height={96}
        className="pointer-events-none absolute left-[6%] top-[6%] hidden opacity-60 sm:left-[14%] sm:block"
      />
      <Image
        src="/small_leaf.svg"
        alt=""
        width={70}
        height={74}
        className="pointer-events-none absolute bottom-[6%] right-[6%] hidden rotate-45 opacity-50 sm:right-[16%] sm:block"
      />

      <Link href="/" className="relative flex items-center">
        <Image src="/logo_marydoc.svg" alt="Marydoc" width={141} height={46} />
      </Link>

      <span className="relative rounded-full bg-[#DFF8EC] px-4 py-0.5 text-xs font-normal text-primary shadow-sm">
        Error 404
      </span>

      <div className="relative flex scale-50 items-center justify-center sm:scale-75 md:scale-100">
        <FuzzyText fontSize={160} fontWeight={800} color="#0E5A4D">
          404
        </FuzzyText>
      </div>

      <div className="relative flex max-w-md flex-col items-center gap-3">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">
          Looks like this page <span className="italic text-accent">wandered off</span>
        </h1>
        <p className="text-base text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ background: "var(--gradient-primary)" }}
        >
          Back to Home
        </Link>
        <a
          href="mailto:support@marydoc.com"
          className="rounded-full border border-primary px-8 py-3 text-base font-semibold text-primary transition-transform hover:scale-105 active:scale-95"
        >
          Contact Support
        </a>
      </div>
    </section>
  );
}
