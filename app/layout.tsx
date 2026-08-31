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
  metadataBase: new URL("https://marydoc.com"),
  title: "Online Medical Card Evaluation | Marydoc",
  description:
    "Complete a HIPAA-compliant online medical card evaluation with a state-licensed physician and guided support throughout the process.",
  keywords: [
    "medical marijuana card",
    "MMJ card online",
    "online medical card evaluation",
    "licensed physicians MMJ",
    "HIPAA compliant medical cannabis",
    "Marydoc",
  ],
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Online Medical Card Evaluation | Marydoc",
    description:
      "Complete a HIPAA-compliant online medical card evaluation with a state-licensed physician and guided support throughout the process.",
    url: "https://marydoc.com",
    siteName: "Marydoc",
    images: [
      {
        url: "/features-section-center.png",
        width: 1200,
        height: 630,
        alt: "Marydoc - Online Medical Marijuana Card Evaluation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Medical Card Evaluation | Marydoc",
    description:
      "Complete a HIPAA-compliant online medical card evaluation with a state-licensed physician and guided support throughout the process.",
    images: ["/features-section-center.png"],
    creator: "@marydoc",
  },
  alternates: {
    canonical: "https://marydoc.com/",
  },
  verification: {
    google: "deGWDcGfkhgxV6bmW670CPyLyA-Wiqj9u-5UzS5ZsXg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <link rel="canonical" href="https://marydoc.com/" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
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
