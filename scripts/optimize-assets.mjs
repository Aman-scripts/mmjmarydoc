import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");

async function extractSvgPng(svgName, outName, { width, quality = 78 } = {}) {
  const svg = fs.readFileSync(path.join(pub, svgName), "utf8");
  const match = svg.match(/xlink:href="(data:image\/(?:png|jpeg);base64,[^"]+)"/);
  if (!match) {
    console.log("No embedded image in", svgName);
    return;
  }
  const dataUrl = match[1];
  const base64 = dataUrl.split(",")[1];
  const input = Buffer.from(base64, "base64");
  const outPath = path.join(pub, outName);
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(outPath);
  const before = fs.statSync(path.join(pub, svgName)).size;
  const after = fs.statSync(outPath).size;
  console.log(
    `${svgName} -> ${outName}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
  );
}

async function optimizePng(name, { width, quality = 78 } = {}) {
  const src = path.join(pub, name);
  const outName = name.replace(/\.png$/i, ".webp");
  const out = path.join(pub, outName);
  let pipeline = sharp(src);
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  await pipeline.webp({ quality, effort: 6 }).toFile(out);
  const before = fs.statSync(src).size;
  const after = fs.statSync(out).size;
  console.log(`${name} -> ${outName}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
}

async function optimizeSvgAsRaster(svgName, outName, { width, quality = 78 } = {}) {
  const src = path.join(pub, svgName);
  const out = path.join(pub, outName);
  await sharp(src, { density: 144 })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(out);
  const before = fs.statSync(src).size;
  const after = fs.statSync(out).size;
  console.log(
    `${svgName} -> ${outName}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
  );
}

await extractSvgPng("hero_section_plant.svg", "hero_section_plant.webp", {
  width: 854,
  quality: 75,
});

// Vector-heavy leaf — rasterize at display size
await optimizeSvgAsRaster("small_leaf.svg", "small_leaf.webp", { width: 182, quality: 80 });
await optimizeSvgAsRaster("left-bottom.svg", "left-bottom.webp", { width: 468, quality: 75 });
await optimizeSvgAsRaster("right-top.svg", "right-top.webp", { width: 336, quality: 75 });
await optimizeSvgAsRaster("google.svg", "google.webp", { width: 88, quality: 85 });

for (const file of [
  "image1.png",
  "Image2.png",
  "image3.png",
  "judgement-section-image1.png",
  "judgement-section-image2.png",
  "judgement-section-image3.png",
]) {
  const width =
    file.startsWith("judgement") ? 734 : file === "image1.png" ? 1200 : file === "Image2.png" ? 568 : 564;
  await optimizePng(file, { width, quality: 75 });
}

console.log("done");
