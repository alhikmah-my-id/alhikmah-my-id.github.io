const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(PUBLIC_DIR, { extensions: ["html"] }));

function serveTextFile(res, filename, contentType) {
  const filePath = path.join(PUBLIC_DIR, filename);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(404).type("text/plain").send("Not found");
      return;
    }
    res.type(contentType).send(data);
  });
}

app.get("/ads.txt", (_req, res) => serveTextFile(res, "ads.txt", "text/plain"));
app.get("/app-ads.txt", (_req, res) =>
  serveTextFile(res, "app-ads.txt", "text/plain")
);
app.get("/manifest.json", (_req, res) =>
  serveTextFile(res, "manifest.json", "application/json")
);

app.use("/api", apiRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", app: "ALHIKMAH", domain: "alhikmah.my.id" });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`ALHIKMAH server running on port ${PORT}`);
});

module.exports = app;