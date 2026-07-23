"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Get Your Card", href: "#get-your-card" },
  { label: "About", href: "#our-story" },
  { label: "Contact", href: "#contact" },
];

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.25c0-.87.24-1.46 1.49-1.46H16.5V4.14C16.24 4.1 15.36 4 14.33 4c-2.14 0-3.6 1.31-3.6 3.71V10.5H8.25v3h2.48V21h2.77Z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12s0-3.15-.4-4.67a2.5 2.5 0 0 0-1.77-1.77C18.32 5.17 12 5.17 12 5.17s-6.32 0-7.83.39A2.5 2.5 0 0 0 2.4 7.33C2 8.85 2 12 2 12s0 3.15.4 4.67a2.5 2.5 0 0 0 1.77 1.77c1.51.39 7.83.39 7.83.39s6.32 0 7.83-.39a2.5 2.5 0 0 0 1.77-1.77C22 15.15 22 12 22 12ZM10 15.02V8.98L15.27 12 10 15.02Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com", Icon: InstagramIcon },
  { label: "YouTube", href: "https://www.youtube.com", Icon: YoutubeIcon },
] as const;

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative z-10 px-5 py-4 sm:px-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_marydoc.svg"
            alt="Marydoc"
            width={120}
            height={38}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-white/70"
        >
          <span className="h-0.5 w-5 rounded-full bg-primary" />
          <span className="h-0.5 w-5 rounded-full bg-primary" />
          <span className="h-0.5 w-5 rounded-full bg-primary" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-[100] flex flex-col transition-[opacity,visibility] duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
        style={{
          background:
            "linear-gradient(299.74deg, #4C8C1A 0.5%, #1D6540 32.39%, #0E5A4D 71.89%, #071D1A 99.5%)",
        }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-5 sm:px-8">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <Image
              src="/logo_marydoc.svg"
              alt="Marydoc"
              width={120}
              height={38}
              className="brightness-0 invert"
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[clamp(1.75rem,7vw,2.25rem)] font-semibold tracking-[-0.02em] text-white transition-opacity hover:opacity-80"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#get-your-card"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-[#DFF8EC] px-9 py-3.5 text-base font-semibold text-primary shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Book a Consultation
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 pb-10 pt-4">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white transition-colors hover:bg-white/10"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
