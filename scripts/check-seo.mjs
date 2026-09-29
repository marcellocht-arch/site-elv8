// Vérifie sur le build de production (next start) : title < 60, description < 155, un seul H1, canonical, sitemap.
// Usage : npm run build && npm start (dans un autre terminal) puis node scripts/check-seo.mjs [http://localhost:3000]
const base = process.argv[2] || "http://localhost:3000";
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
let ok = true;
const decode = (s) => s.replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
for (const path of urls) {
  const res = await fetch(base + path);
  const html = await res.text();
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const og = /property="og:image"/.test(html);
  const problems = [];
  if (res.status !== 200) problems.push(`HTTP ${res.status}`);
  if (!title || title.length >= 60) problems.push(`title ${title.length}`);
  if (!desc || desc.length >= 155) problems.push(`description ${desc.length}`);
  if (h1 !== 1) problems.push(`h1=${h1}`);
  if (!canonical) problems.push("canonical manquant");
  if (!og) problems.push("og:image manquante");
  if (problems.length) ok = false;
  console.log(`${problems.length ? "✗" : "✓"} ${path.padEnd(36)} t=${String(title.length).padStart(2)} d=${String(desc.length).padStart(3)} ${problems.join(", ")}`);
}
console.log(`\n${urls.length} URL dans le sitemap.`);
process.exit(ok ? 0 : 1);
