"""ALHIKMAH Islamic Tools Backend Module."""

import json
from datetime import datetime

HIJRI_MONTHS = [
    "Muharram", "Safar", "Rabiul Awal", "Rabiul Akhir", "Jumadil Awal",
    "Jumadil Akhir", "Rajab", "Sya'ban", "Ramadhan", "Syawal",
    "Dzulqa'dah", "Dzulhijjah",
]

PEGON_MAP = {
    "a": "ا", "b": "ب", "c": "چ", "d": "د", "e": "ي", "f": "ف", "g": "غ",
    "h": "ه", "i": "ي", "j": "ج", "k": "ك", "l": "ل", "m": "م", "n": "ن",
    "o": "و", "p": "ف", "q": "ق", "r": "ر", "s": "س", "t": "ت", "u": "و",
    "v": "ف", "w": "و", "x": "كس", "y": "ي", "z": "ز",
}


def convert_pegon(text: str) -> str:
    return "".join(PEGON_MAP.get(c.lower(), c) for c in text)


def gregorian_to_hijri(date: datetime | None = None) -> dict:
    date = date or datetime.now()
    month = HIJRI_MONTHS[(date.month + 5) % 12]
    return {
        "gregorian": date.strftime("%Y-%m-%d"),
        "hijri": f"{month} 1447 H",
        "hijriMonth": month,
    }


def calligraphy_assets() -> list[dict]:
    return [
        {"name": "Bismillah", "arabic": "بسم الله", "style": "Naskh"},
        {"name": "Alhamdulillah", "arabic": "الحمد لله", "style": "Tsuluts"},
        {"name": "Subhanallah", "arabic": "سبحان الله", "style": "Diwani"},
        {"name": "Allahu Akbar", "arabic": "الله أكبر", "style": "Kufi"},
        {"name": "La ilaha illallah", "arabic": "لا إله إلا الله", "style": "Farisi"},
        {"name": "Muhammad", "arabic": "محمد", "style": "Riq'ah"},
    ]


def coreldraw_assets() -> list[dict]:
    return [
        {"name": "Bismillah Vector", "format": "CDR", "size": "2.4 MB"},
        {"name": "Alhamdulillah Vector", "format": "CDR", "size": "1.8 MB"},
        {"name": "Ramadhan Banner", "format": "CDR", "size": "5.2 MB"},
        {"name": "Eid Mubarak Template", "format": "CDR", "size": "3.6 MB"},
    ]


def timer_state(seconds: int = 300) -> dict:
    return {
        "duration": seconds,
        "formatted": f"{seconds // 60:02d}:{seconds % 60:02d}",
        "presets": [60, 300, 600, 900],
    }


if __name__ == "__main__":
    print(json.dumps({
        "pegon": convert_pegon("assalamualaikum"),
        "kalender": gregorian_to_hijri(),
        "calligraphy": calligraphy_assets(),
        "coreldraw": coreldraw_assets(),
        "timer": timer_state(),
    }, ensure_ascii=False, indent=2))