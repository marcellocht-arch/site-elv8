// Liste tous les emplacements [À COMPLÉTER …] du site et régénère A-COMPLETER.md (section automatique).
// Usage : npm run todos
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dirs = ["src"];
const found = [];

function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f)) {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        for (const m of line.matchAll(/\[À COMPLÉTER[^\]]*\]/g)) found.push({ file: relative(root, p), line: i + 1, text: m[0] });
      });
    }
  }
}
dirs.forEach((d) => walk(join(root, d)));

const byFile = {};
for (const f of found) (byFile[f.file] ||= []).push(f);

let md = `<!-- DÉBUT LISTE AUTOMATIQUE (npm run todos) -->\n\n**${found.length} emplacements** trouvés dans le code.\n\n`;
for (const [file, items] of Object.entries(byFile)) {
  md += `### \`${file}\`\n\n`;
  for (const it of items) md += `- [ ] ligne ${it.line} — ${it.text.replace(/\|/g, "\\|")}\n`;
  md += "\n";
}
md += "<!-- FIN LISTE AUTOMATIQUE -->";

const target = join(root, "A-COMPLETER.md");
if (existsSync(target)) {
  const cur = readFileSync(target, "utf8");
  const out = cur.replace(/<!-- DÉBUT LISTE AUTOMATIQUE[\s\S]*<!-- FIN LISTE AUTOMATIQUE -->/, md);
  writeFileSync(target, out);
} else writeFileSync(target, md);
console.log(`${found.length} emplacements [À COMPLÉTER] dans ${Object.keys(byFile).length} fichiers.`);
