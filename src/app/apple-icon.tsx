import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { colors } from "@/theme/tokens";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icône Apple / logo carré : « ELV8. » sur fond bleu nuit. */
export default async function AppleIcon() {
  const serif = await readFile(path.join(process.cwd(), "src/assets/fonts/instrument-serif-latin-400-normal.woff"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: colors.night, fontFamily: "Serif", fontSize: 64, color: colors.ivory, letterSpacing: -2 }}>
        ELV8<span style={{ color: colors.copper }}>.</span>
      </div>
    ),
    { ...size, fonts: [{ name: "Serif", data: serif, weight: 400, style: "normal" }] }
  );
}
