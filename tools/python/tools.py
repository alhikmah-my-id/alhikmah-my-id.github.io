# -*- coding: utf-8 -*-
"""
tools.py - ALHIKMAH Islamic Tools Module
Konverter Arabic Pegon, kalender hijriyah/masehi, pengelola aset CorelDRAW Arabic.
"""
import os
import json
import re
from datetime import datetime

ASSETS_DIR = os.path.join(os.path.dirname(__file__), "assets")
DOCS_DIR = os.path.join(ASSETS_DIR, "documents")
COREL_DIR = os.path.join(ASSETS_DIR, "coreldraw-arabic")

PEGON_MAP = {
    "a": "ا", "b": "ب", "c": "چ", "d": "د", "e": "ي", "f": "ف",
    "g": "ݢ", "h": "ح", "i": "ي", "j": "ج", "k": "ك", "l": "ل",
    "m": "م", "n": "ن", "o": "و", "p": "ڤ", "q": "ق", "r": "ر",
    "s": "س", "t": "ت", "u": "و", "v": "ۏ", "w": "و", "x": "کس",
    "y": "ي", "z": "ز",
}

HIJRI_MONTHS = [
    "Muharram", "Safar", "Rabi'ul Awwal", "Rabi'ul Akhir",
    "Jumadil Awwal", "Jumadil Akhir", "Rajab", "Sya'ban",
    "Ramadhan", "Syawwal", "Dzulqa'dah", "Dzulhijjah",
]


def to_pegon(latin_text):
    result = []
    for ch in latin_text.lower():
        if ch in PEGON_MAP:
            result.append(PEGON_MAP[ch])
        elif ch == " ":
            result.append(" ")
        else:
            result.append(ch)
    return "".join(result)


def hijri_today(offset_days=0):
    now = datetime.now()
    year = now.year - 579
    month_index = (now.month + 3) % 12
    return {
        "hijri": f"{now.day} {HIJRI_MONTHS[month_index]} {year} H",
        "gregorian": now.strftime("%d %B %Y"),
        "offsetDays": offset_days,
    }


def list_coreldraw_assets():
    if not os.path.isdir(COREL_DIR):
        return []
    return sorted(
        f for f in os.listdir(COREL_DIR)
        if f.lower().endswith((".cdr", ".svg", ".ai", ".eps", ".png"))
    )


def list_documents():
    if not os.path.isdir(DOCS_DIR):
        return []
    return sorted(
        f for f in os.listdir(DOCS_DIR)
        if f.lower().endswith((".pdf", ".docx", ".epub", ".txt"))
    )


def register_asset(name, kind="coreldraw"):
    target = COREL_DIR if kind == "coreldraw" else DOCS_DIR
    os.makedirs(target, exist_ok=True)
    path = os.path.join(target, sanitize_filename(name))
    with open(path, "w", encoding="utf-8") as f:
        f.write(f"# ALHIKMAH Asset: {name}\n# Created: {datetime.now().isoformat()}\n")
    return path


def sanitize_filename(name):
    return re.sub(r"[^A-Za-z0-9._-]", "_", name)


def export_manifest():
    manifest = {
        "site": "https://alhikmah.my.id",
        "generatedAt": datetime.now().isoformat(),
        "tools": [
            {"id": "arabic-pegon", "name": "Konverter Arabic Pegon"},
            {"id": "hijri-calendar", "name": "Kalender Hijriah"},
            {"id": "coreldraw-arabic", "name": "CorelDRAW Arabic Assets"},
            {"id": "library", "name": "Perpustakaan Digital"},
        ],
        "coreldrawAssets": list_coreldraw_assets(),
        "documents": list_documents(),
    }
    out = os.path.join(os.path.dirname(__file__), "data", "tools-manifest.json")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    return out


if __name__ == "__main__":
    print("Pegon:", to_pegon("alhikmah portal islam"))
    print("Hijri:", hijri_today())
    print("Manifest:", export_manifest())