"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Our Story", href: "#our-story" },
  { label: "What we stand for", href: "#what-we-stand-for" },
  { label: "Our Standards", href: "#our-standards" },
];

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-10 px-5 py-4 sm:px-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo_marydoc.svg" alt="Marydoc" width={120} height={38} priority />
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-white/70"
        >
          <span className={`h-0.5 w-5 rounded-full bg-primary transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 rounded-full bg-primary transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 rounded-full bg-primary transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="mt-4 flex flex-col gap-4 rounded-3xl bg-white/80 p-5">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm font-medium text-primary">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <a
              href="#care-in-your-state"
              className="rounded-full px-6 py-3 text-center text-sm font-semibold text-white"
              style={{
                background:
                  "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
              }}
            >
              Care in your State
            </a>
            <a
              href="#our-story"
              className="rounded-full border border-primary px-6 py-3 text-center text-sm font-semibold text-primary"
            >
              Our Story
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
