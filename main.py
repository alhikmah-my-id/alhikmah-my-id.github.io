# -*- coding: utf-8 -*-
"""
main.py - ALHIKMAH Backend (Python / FastAPI)
Server utama: CORS, static files, ads.txt, app-ads.txt, manifest.json, sitemap.
"""
import os
import json
from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles

from api_routes import router as api_router

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

app = FastAPI(
    title="ALHIKMAH API",
    description="Portal Islam terpercaya untuk pendidikan, sejarah, sosial, dan budaya.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if os.path.isdir(PUBLIC_DIR):
    app.mount("/static", StaticFiles(directory=PUBLIC_DIR), name="static")


@app.get("/ads.txt", response_class=PlainTextResponse)
def ads_txt():
    path = os.path.join(PUBLIC_DIR, "ads.txt")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    return "tappx.com, 36063, DIRECT, 9f375a07da0318ec\ninventorypartnerdomain=tappx.com\n"


@app.get("/app-ads.txt", response_class=PlainTextResponse)
def app_ads_txt():
    path = os.path.join(PUBLIC_DIR, "app-ads.txt")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    return "tappx.com, 36063, DIRECT, 9f375a07da0318ec\ninventorypartnerdomain=tappx.com\n"


@app.get("/manifest.json")
def manifest():
    path = os.path.join(PUBLIC_DIR, "manifest.json")
    if os.path.exists(path):
        return FileResponse(path, media_type="application/manifest+json")
    return JSONResponse({"name": "ALHIKMAH", "short_name": "ALHIKMAH"})


@app.get("/robots.txt", response_class=PlainTextResponse)
def robots():
    return "User-agent: *\nAllow: /\nSitemap: https://alhikmah.my.id/sitemap.xml\n"


@app.get("/sitemap.xml", response_class=PlainTextResponse)
def sitemap():
    urls = [
        "https://alhikmah.my.id/",
        "https://alhikmah.my.id/artikel",
        "https://alhikmah.my.id/kategori",
        "https://alhikmah.my.id/tools",
    ]
    body = "\n".join(
        f"  <url><loc>{u}</loc><changefreq>daily</changefreq></url>" for u in urls
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{body}\n</urlset>"
    )


@app.get("/health")
def health():
    return {"ok": True, "service": "ALHIKMAH API", "time": datetime.utcnow().isoformat()}


app.include_router(api_router, prefix="/api")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)