import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { allRoutes } from "@/lib/routes";
import { colors } from "@/theme/tokens";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allRoutes().map((r) => ({ slug: r.ogSlug }));
}

const fontDir = path.join(process.cwd(), "src/assets/fonts");

/** Image Open Graph (1200×630) générée automatiquement pour chaque page. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = allRoutes().find((r) => r.ogSlug === slug) ?? allRoutes()[0];
  const [serif, sans] = await Promise.all([
    readFile(path.join(fontDir, "instrument-serif-latin-400-normal.woff")),
    readFile(path.join(fontDir, "inter-latin-500-normal.woff")),
  ]);

  const size = route.ogTitle.length > 34 ? 84 : route.ogTitle.length > 22 ? 100 : 120;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: `radial-gradient(circle at 85% 20%, rgba(200,121,65,0.55), rgba(200,121,65,0) 45%), radial-gradient(circle at 10% 110%, rgba(30,58,85,0.9), rgba(30,58,85,0) 55%), ${colors.night}`,
          color: colors.ivory,
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 64, letterSpacing: -2 }}>
            ELV8<span style={{ color: colors.copper, marginLeft: -4 }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: colors.grey, letterSpacing: 4, textTransform: "uppercase" }}>elv8co.be</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, color: colors.copperLight, letterSpacing: 5, textTransform: "uppercase", marginBottom: 24 }}>{route.ogKicker}</div>
          <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: size, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>{route.ogTitle}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24, color: colors.grey }}>
          <div style={{ display: "flex", width: 64, height: 2, background: colors.copper }} />
          Confiance · Régularité · Portée
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
        { name: "Inter", data: sans, weight: 500, style: "normal" },
      ],
    }
  );
}
