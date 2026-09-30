import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  // CSS injecté dans le HTML : supprime une requête bloquante au premier affichage
  experimental: { inlineCss: true },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/services/personal-branding", destination: "/personal-branding", permanent: true },
      { source: "/services/contenu-video", destination: "/contenu-video", permanent: true },
      { source: "/services/publicite", destination: "/publicite-meta-linkedin", permanent: true },
      { source: "/index", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
