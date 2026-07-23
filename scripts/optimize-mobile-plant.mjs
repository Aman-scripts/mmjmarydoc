import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const pub = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public");
const svg = fs.readFileSync(path.join(pub, "hero_section_plant.svg"), "utf8");
const match = svg.match(/xlink:href="(data:image\/png;base64,[^"]+)"/);
if (!match) throw new Error("no embedded png");
const buf = Buffer.from(match[1].split(",")[1], "base64");
const out = path.join(pub, "hero_section_plant-mobile.webp");
await sharp(buf)
  .resize({ width: 360, withoutEnlargement: true })
  .webp({ quality: 68, effort: 6 })
  .toFile(out);
console.log("wrote", out, Math.round(fs.statSync(out).size / 1024) + "KB");
