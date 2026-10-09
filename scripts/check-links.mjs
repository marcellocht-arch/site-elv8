// Compte les liens internes placés DANS LE TEXTE (syntaxe [texte](/chemin)) vers chaque page.
// Les liens du menu et du pied de page ne comptent pas : un lien dans une phrase dit à Google
// de quoi parle la page suivante, un lien de menu ne lui dit rien.
// Usage : npm run check:links   (objectif : au moins 5 liens entrants par page importante)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const CONTENT = join(ROOT, "src/content");
const MIN = 5;

const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".ts")) files.push(p);
  }
})(CONTENT);

// Page source de chaque fichier (approximation : un fichier = une page, sauf conseils.ts).
const sourceOf = (file, text, index) => {
  const rel = relative(CONTENT, file).replace(/\.ts$/, "");
  if (rel === "conseils") {
    const before = text.slice(0, index);
    const slugs = [...before.matchAll(/slug: "([^"]+)"/g)];
    return slugs.length ? `/conseils/${slugs.at(-1)[1]}` : "/conseils";
  }
  if (rel.startsWith("services/")) return "/" + rel.split("/")[1];
  if (rel.startsWith("zones/")) return "/zones/" + rel.split("/")[1];
  if (rel.startsWith("realisations/")) return "/realisations/" + rel.split("/")[1];
  if (rel === "home") return "/";
  return "/" + rel;
};

const incoming = new Map();
const broken = [];
const targets = new Set(["/", "/offres", "/contact", "/a-propos", "/realisations", "/zones", "/conseils"]);
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const rel = relative(CONTENT, file).replace(/\.ts$/, "");
  if (/^(services|zones|realisations)\/(?!index)/.test(rel)) targets.add(sourceOf(file, text, 0));
  for (const m of text.matchAll(/slug: "([^"]+)"/g)) if (rel === "conseils") targets.add(`/conseils/${m[1]}`);
  for (const m of text.matchAll(/\[([^\]]+)\]\((\/[^)\s]*)\)/g)) {
    const to = m[2].split("#")[0] || "/";
    const from = sourceOf(file, text, m.index);
    if (from === to) continue;
    if (!incoming.has(to)) incoming.set(to, new Set());
    incoming.get(to).add(from);
  }
}
for (const to of incoming.keys()) if (!targets.has(to)) broken.push(to);

const rows = [...targets].sort().map((t) => [t, incoming.get(t)?.size ?? 0]);
for (const [t, n] of rows) console.log(`${n >= MIN ? "✓" : n > 0 ? "~" : "✗"} ${String(n).padStart(2)}  ${t}`);
console.log(`\n✓ ≥ ${MIN} pages qui pointent vers elle · ~ entre 1 et ${MIN - 1} · ✗ aucune (hors menu et pied de page).`);
if (broken.length) {
  console.log(`\nLiens vers des pages inconnues : ${broken.join(", ")}`);
  process.exit(1);
}
