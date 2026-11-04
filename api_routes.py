# -*- coding: utf-8 -*-
"""
api_routes.py - ALHIKMAH API Router (FastAPI)
Endpoints: artikel, kategori, tools, rotasi iklan Tappx.
"""
import os
import json
from datetime import datetime

from fastapi import APIRouter, HTTPException, Query

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARTICLES_FILE = os.path.join(BASE_DIR, "data", "articles.json")

TAPPX_KEYS = [
    "pub-65263-android-0300",
    "pub-57747-android-0996",
    "pub-60567-android-4416",
    "pub-65262-android-8892",
    "pub-79956-android-6297",
    "pub-79955-android-5582",
]

CATEGORIES = [
    "Home", "Aplikasi", "Kisah Hikmah", "Kitab/Buku", "Pendidikan",
    "Sholawat", "Khutbah", "Kisah dan Tokoh", "Informasi", "Vidio",
    "Adhan", "Iqro'", "Tafsir Web", "Perpustakaan", "Arabic Pegon",
    "Arabic Calligraphy", "Kalender", "Timer", "Murotal 30 Juz",
    "Alqur'an Digital", "WebOffice", "CorelDRAW Arabic",
]

QUICK_MENU = ["ADZKAR", "AL-QUR'AN", "TAKLIM", "HADIST", "SHOLAWAT", "ARABIC"]

TOOLS = [
    {"id": "arabic-pegon", "name": "Konverter Arabic Pegon", "category": "Arabic Pegon"},
    {"id": "hijri-calendar", "name": "Kalender Hijriah", "category": "Kalender"},
    {"id": "prayer-times", "name": "Jadwal Adzan", "category": "Adhan"},
    {"id": "qibla", "name": "Kompas Kiblat", "category": "Adhan"},
    {"id": "zakat", "name": "Kalkulator Zakat", "category": "Informasi"},
    {"id": "murotal", "name": "Murotal 30 Juz", "category": "Murotal 30 Juz"},
    {"id": "quran-digital", "name": "Al-Qur'an Digital", "category": "Alqur'an Digital"},
    {"id": "calligraphy", "name": "Arabic Calligraphy", "category": "Arabic Calligraphy"},
    {"id": "coreldraw-arabic", "name": "CorelDRAW Arabic Assets", "category": "CorelDRAW Arabic"},
    {"id": "weboffice", "name": "WebOffice", "category": "WebOffice"},
]

_state = {"index": 0}


def _load_articles():
    if not os.path.exists(ARTICLES_FILE):
        return []
    with open(ARTICLES_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data if isinstance(data, list) else data.get("articles", [])


@router.get("/health")
def health():
    return {"ok": True, "service": "ALHIKMAH API", "time": datetime.utcnow().isoformat()}


@router.get("/categories")
def categories():
    return {
        "ok": True,
        "total": len(CATEGORIES),
        "categories": CATEGORIES,
        "quickMenu": QUICK_MENU,
    }


@router.get("/tools")
def tools():
    return {"ok": True, "total": len(TOOLS), "tools": TOOLS}


@router.get("/articles")
def articles(
    category: str | None = Query(default=None),
    q: str | None = Query(default=None),
    limit: int | None = Query(default=None),
):
    items = _load_articles()
    if category:
        items = [a for a in items if a.get("category") == category]
    if q:
        needle = q.lower()
        items = [
            a for a in items
            if needle in a.get("title", "").lower() or needle in a.get("excerpt", "").lower()
        ]
    if limit:
        items = items[:limit]
    return {"ok": True, "total": len(items), "articles": items}


@router.get("/articles/{slug}")
def article_detail(slug: str):
    items = _load_articles()
    for a in items:
        if a.get("slug") == slug:
            return {"ok": True, "article": a}
    raise HTTPException(status_code=404, detail="Artikel tidak ditemukan")


@router.get("/ads/rotate")
def ads_rotate():
    key = TAPPX_KEYS[_state["index"] % len(TAPPX_KEYS)]
    _state["index"] += 1
    return {
        "ok": True,
        "provider": "tappx",
        "appKey": key,
        "pool": len(TAPPX_KEYS),
        "servedAt": datetime.utcnow().isoformat(),
    }


@router.get("/ads/pool")
def ads_pool():
    return {"ok": True, "provider": "tappx", "keys": TAPPX_KEYS}