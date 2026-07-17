import Image from "next/image";

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

const navLinks = ["Our Story", "What we stand for", "Our Standards"];

export function FooterSection() {
  return (
    <footer
      className="relative w-full rounded-t-[60px] px-5 py-10 sm:px-8 lg:px-16"
      style={{
        background:
          "linear-gradient(265.32deg, #4C8C1A 2.23%, #166047 40.81%, #0E5A4D 69.11%, #0B3832 97.77%)",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <Image src="/footer-logo.svg" alt="Marydoc" width={150} height={48} />
          <div className="flex items-center gap-3">
            <FacebookIcon className="h-5 w-5 text-white/90" />
            <InstagramIcon className="h-5 w-5 text-white/90" />
            <YoutubeIcon className="h-6 w-6 text-white/90" />
          </div>
        </div>

        <nav className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:flex-wrap lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium leading-[22px] tracking-[-0.28px] text-[#FAFAF8]/90 hover:text-[#FAFAF8]"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
