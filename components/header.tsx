import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Our Story", href: "#our-story", left: 395 - 79, width: 63 },
  { label: "What we stand for", href: "#what-we-stand-for", left: 531 - 79, width: 118 },
  { label: "Our Standards", href: "#our-standards", left: 723 - 79, width: 94 },
];

export function Header() {
  return (
    <div className="absolute" style={{ left: 79, top: 32, width: 1281, height: 65 }}>
      <Link href="/" className="absolute flex items-center" style={{ left: 0, top: 10, width: 141, height: 46 }}>
        <Image src="/logo_marydoc.svg" alt="Marydoc" width={141} height={46} priority />
      </Link>

      <nav className="absolute hidden md:block" style={{ left: 395 - 79, top: 22, width: 422, height: 22 }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="absolute whitespace-nowrap text-sm font-medium leading-[22px] tracking-[-0.28px] text-muted-foreground hover:text-primary transition-colors"
            style={{ left: link.left - (395 - 79), top: 0 }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="absolute flex items-center gap-6" style={{ left: 991 - 79, top: 12, width: 369, height: 42 }}>
        <a
          href="#care-in-your-state"
          className="flex h-[42px] items-center whitespace-nowrap rounded-full px-9 text-base font-semibold leading-[26px] tracking-[-0.32px] text-white shadow-sm"
          style={{
            background:
              "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
          }}
        >
          Care in your State
        </a>
        <a
          href="#our-story"
          className="hidden h-[42px] items-center whitespace-nowrap rounded-full border border-primary px-9 text-base font-semibold leading-[26px] tracking-[-0.32px] text-primary sm:flex"
        >
          Our Story
        </a>
      </div>
    </div>
  );
}
