import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ScrollToTopOnLoad } from "@/components/scroll-to-top-on-load";
import { LeadModalProvider } from "@/components/lead-capture-modal";
import { JsonLd } from "@/components/json-ld";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "optional",
  preload: false,
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "MaryDoc | State-Licensed Medical Marijuana Card Telehealth",
  description:
    "MaryDoc connects you with state-licensed physicians for secure, HIPAA-compliant online medical marijuana evaluations and card renewals.",
  verification: {
    google: "deGWDcGfkhgxV6bmW670CPyLyA-Wiqj9u-5UzS5ZsXg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", plusJakartaSans.variable, spaceGrotesk.variable, "font-sans")}
    >
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KL827468');`,
          }}
        />
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KL827468"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if("scrollRestoration"in history)history.scrollRestoration="manual";window.scrollTo(0,0);`,
          }}
        />
        <ScrollToTopOnLoad />
        <LeadModalProvider>
          {children}
        </LeadModalProvider>
      </body>
    </html>
  );
}
