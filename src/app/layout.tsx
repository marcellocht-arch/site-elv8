import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { colors } from "@/theme/tokens";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { IntroOverlay, introScript } from "@/components/motion/IntroOverlay";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransition } from "@/components/motion/PageTransition";
import { Cursor } from "@/components/motion/Cursor";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessLd, organizationLd } from "@/lib/seo";

// Polices auto-hébergées (aucun appel à Google Fonts, affichage non bloquant)
const instrument = localFont({
  src: [
    { path: "../assets/fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  preload: true,
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const inter = localFont({
  src: "../assets/fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "ELV8co — Agence de visibilité locale à Liège", template: "%s | ELV8co" },
  description: site.defaultDescription,
  applicationName: site.name,
  authors: [{ name: site.name }],
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  // Search Console : collez ici le code de vérification (voir README) ou utilisez la vérification DNS.
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined },
};

export const viewport: Viewport = {
  themeColor: colors.night,
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-BE" className={`${instrument.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <IntroOverlay />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <PageTransition />
        <SmoothScroll />
        <Cursor />
        <ConsentBanner />
        <div className="grain" aria-hidden />
        <JsonLd data={[organizationLd(), localBusinessLd()]} />
      </body>
    </html>
  );
}
