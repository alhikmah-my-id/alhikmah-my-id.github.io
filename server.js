import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import apiRouter from "./routes/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

const DIST = path.join(__dirname, "dist");
app.use(express.static(DIST, { maxAge: "1h" }));
app.use(express.static(path.join(__dirname, "public"), { maxAge: "1h" }));

app.get("/ads.txt", (_req, res) => {
  const file = path.join(__dirname, "public", "ads.txt");
  if (fs.existsSync(file)) {
    res.type("text/plain").sendFile(file);
  } else {
    res.type("text/plain").send("# ads.txt not found");
  }
});

app.get("/app-ads.txt", (_req, res) => {
  const file = path.join(__dirname, "public", "app-ads.txt");
  if (fs.existsSync(file)) {
    res.type("text/plain").sendFile(file);
  } else {
    res.type("text/plain").send("# app-ads.txt not found");
  }
});

app.get("/manifest.json", (_req, res) => {
  const file = path.join(__dirname, "public", "manifest.json");
  if (fs.existsSync(file)) {
    res.type("application/json").sendFile(file);
  } else {
    res.status(404).json({ error: "manifest.json not found" });
  }
});

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(
    `User-agent: *\nAllow: /\nSitemap: https://alhikmah.my.id/sitemap.xml\n`
  );
});

app.get("/sitemap.xml", (_req, res) => {
  const base = "https://alhikmah.my.id";
  const urls = [
    "/",
    "/kategori/aplikasi",
    "/kategori/kisah-hikmah",
    "/kategori/kitab-buku",
    "/kategori/pendidikan",
    "/kategori/sholawat",
    "/kategori/khutbah",
    "/kategori/kisah-dan-tokoh",
    "/kategori/informasi",
    "/kategori/vidio",
    "/kategori/adhan",
    "/kategori/iqro",
    "/kategori/tafsir-web",
    "/kategori/perpustakaan",
    "/kategori/arabic-pegon",
    "/kategori/arabic-calligraphy",
    "/kategori/kalender",
    "/kategori/timer",
    "/kategori/murotal-30-juz",
    "/kategori/alquran-digital",
    "/kategori/weboffice",
    "/kategori/coreldraw-arabic",
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${base}${u}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join("\n")}
</urlset>`;
  res.type("application/xml").send(xml);
});

app.get("*", (_req, res) => {
  const indexFile = path.join(DIST, "index.html");
  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    res.status(200).send("ALHIKMAH API running. Build frontend with `npm run build`.");
  }
});

app.listen(PORT, () => {
  console.log(`ALHIKMAH server running on port ${PORT}`);
});