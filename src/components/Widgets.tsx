import { useState, useEffect, useRef } from "react";
import { Compass, Clock, MapPin, Bell, TrendingUp, Archive, Navigation, Keyboard, Link2, Check, BookOpen, Play, Pause, SkipForward, SkipBack, Volume2, BookMarked, Calendar, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TAPPX_KEYS, QARI_LIST, SURAH_LIST, SAMPLE_AYAHS, POPULAR, ARCHIVE, NEWS, type Article } from "@/data/articles";

export function useAdRotation() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TAPPX_KEYS.length), 8000);
    return () => clearInterval(t);
  }, []);
  return TAPPX_KEYS[index];
}

export function AdBanner({ slot }: { slot: string }) {
  const key = useAdRotation();
  return (
    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <Badge className="bg-amber-500 hover:bg-amber-500 text-white text-xs shrink-0">AD</Badge>
        <span className="text-xs text-amber-900 truncate">Tappx · {slot} · {key}</span>
      </div>
      <Button size="sm" variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100 shrink-0 h-7 text-xs">
        Buka
      </Button>
    </div>
  );
}

export function PrayerWidget() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const times = [
    { name: "Subuh", time: "04:15" },
    { name: "Dzuhur", time: "11:50", active: true },
    { name: "Ashar", time: "15:10" },
    { name: "Maghrib", time: "18:02" },
    { name: "Isya", time: "19:15" },
  ];
  return (
    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-emerald-900 flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-600" /> Jadwal Sholat
          </CardTitle>
          <Badge variant="outline" className="border-emerald-300 text-emerald-700 text-xs">
            <MapPin className="h-3 w-3 mr-1" /> Semarang
          </Badge>
        </div>
        <p className="text-2xl font-bold text-emerald-900 tabular-nums">
          {now.toLocaleTimeString("id-ID", { hour12: false })}
        </p>
      </CardHeader>
      <CardContent className="space-y-1.5 pt-0">
        {times.map((t) => (
          <div
            key={t.name}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
              t.active ? "bg-emerald-600 text-white shadow-sm" : "bg-white/60 text-emerald-900 hover:bg-white"
            )}
          >
            <span className="font-medium">{t.name}</span>
            <span className="tabular-nums font-semibold">{t.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function QiblaWidget() {
  const [heading, setHeading] = useState(0);
  const qibla = 295;
  useEffect(() => {
    const h = (e: DeviceOrientationEvent) => {
      if (e.alpha != null) setHeading(e.alpha);
    };
    window.addEventListener("deviceorientation", h);
    return () => window.removeEventListener("deviceorientation", h);
  }, []);
  const rotation = qibla - heading;
  return (
    <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-teal-900 flex items-center gap-2">
          <Compass className="h-4 w-4 text-teal-600" /> Kompas Kiblat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-4">
        <div className="relative h-32 w-32 rounded-full border-4 border-teal-200 bg-white shadow-inner flex items-center justify-center">
          <div
            className="absolute inset-0 flex items-start justify-center transition-transform duration-300"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="mt-1 flex flex-col items-center">
              <Navigation className="h-6 w-6 text-emerald-600 fill-emerald-600" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-900">{qibla}°</p>
            <p className="text-xs text-teal-600 uppercase tracking-wider">Arah Kiblat</p>
          </div>
        </div>
        <p className="text-xs text-teal-700 mt-3 text-center">
          Arahkan perangkat ke Ka'bah untuk akurasi maksimal
        </p>
      </CardContent>
    </Card>
  );
}

const ARABIC_KEYS = [
  { ar: "غ", en: "g" }, { ar: "ع", en: "a'" }, { ar: "ظ", en: "Z" }, { ar: "ط", en: "T" },
  { ar: "ض", en: "D" }, { ar: "ص", en: "S" }, { ar: "ش", en: "s'" }, { ar: "س", en: "s" },
  { ar: "ز", en: "z" }, { ar: "ر", en: "r" }, { ar: "ذ", en: "d'" }, { ar: "د", en: "d" },
  { ar: "خ", en: "h'" }, { ar: "ح", en: "h" }, { ar: "ج", en: "j" }, { ar: "ث", en: "t'" },
  { ar: "ت", en: "t" }, { ar: "ب", en: "b" }, { ar: "ا", en: "a" }, { ar: "ل", en: "l" },
  { ar: "م", en: "m" }, { ar: "ن", en: "n" }, { ar: "و", en: "w" }, { ar: "ي", en: "y" },
  { ar: "ه", en: "h" }, { ar: "ك", en: "k" }, { ar: "ف", en: "f" }, { ar: "ق", en: "q" },
];

export function ArabicKeyboard() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const insert = (ch: string) => {
    setText((t) => t + ch);
    ref.current?.focus();
  };
  const backspace = () => setText((t) => t.slice(0, -1));
  const clear = () => setText("");
  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-emerald-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
        <CardTitle className="text-base flex items-center gap-2">
          <Keyboard className="h-4 w-4" /> Arabic Keyboard - لوحة المفاتيح العربية
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <textarea
          ref={ref}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          dir="rtl"
          placeholder="اكتب هنا..."
          className="w-full rounded-lg border border-emerald-200 bg-emerald-50/40 p-3 text-lg text-right focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={copy} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            {copied ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Link2 className="h-3.5 w-3.5 mr-1.5" />}
            {copied ? "Tersalin!" : "Copy"}
          </Button>
          <Button size="sm" variant="outline" onClick={backspace} className="border-emerald-300 text-emerald-700">
            Backspace
          </Button>
          <Button size="sm" variant="outline" onClick={clear} className="border-slate-300 text-slate-600">
            Clear
          </Button>
        </div>
        <div className="grid grid-cols-7 sm:grid-cols-10 gap-1.5">
          {ARABIC_KEYS.map((k) => (
            <button
              key={k.en}
              onClick={() => insert(k.ar)}
              title={k.en}
              className="aspect-square rounded-lg border border-emerald-200 bg-white hover:bg-emerald-100 hover:border-emerald-400 active:scale-95 transition-all text-xl font-medium text-emerald-900 shadow-sm"
            >
              {k.ar}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function QuranPlayer() {
  const [surah, setSurah] = useState(1);
  const [qari, setQari] = useState(QARI_LIST[0].id);
  const [playing, setPlaying] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(0);
  const [autoNext, setAutoNext] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ayahs = SAMPLE_AYAHS[surah] || SAMPLE_AYAHS[1];
  const surahInfo = SURAH_LIST.find((s) => s.number === surah) || SURAH_LIST[0];

  useEffect(() => {
    setCurrentAyah(0);
    setPlaying(false);
  }, [surah]);

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    const handleEnded = () => {
      if (currentAyah < ayahs.length - 1) {
        setCurrentAyah((i) => i + 1);
      } else if (autoNext) {
        const idx = SURAH_LIST.findIndex((s) => s.number === surah);
        if (idx < SURAH_LIST.length - 1) setSurah(SURAH_LIST[idx + 1].number);
        else setPlaying(false);
      } else {
        setPlaying(false);
      }
    };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentAyah, ayahs.length, autoNext, surah]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      const url = `https://cdn.islamic.network/quran/audio/128/${qari}/${surah}${String(currentAyah + 1).padStart(3, "0")}.mp3`;
      audio.src = url;
      const p = audio.play();
      if (p && typeof p.catch === "function") p.catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, currentAyah, qari, surah]);

  const toggle = () => setPlaying((p) => !p);
  const next = () => setCurrentAyah((i) => Math.min(i + 1, ayahs.length - 1));
  const prev = () => setCurrentAyah((i) => Math.max(i - 1, 0));

  return (
    <Card className="border-emerald-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <CardTitle className="text-base flex items-center gap-2">
            <BookMarked className="h-4 w-4" /> Murotal Al-Qur'an Digital
          </CardTitle>
          <Badge className="bg-emerald-500/30 hover:bg-emerald-500/30 text-emerald-50 border border-emerald-400/40">
            {surahInfo.name} · {ayahs.length} ayat
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600">Pilih Surah</label>
            <Select value={String(surah)} onValueChange={(v) => setSurah(Number(v))}>
              <SelectTrigger className="border-emerald-200"><SelectValue /></SelectTrigger>
              <SelectContent>
                {SURAH_LIST.map((s) => (
                  <SelectItem key={s.number} value={String(s.number)}>
                    {s.number}. {s.name} ({s.ayahs} ayat)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600">Pilih Qari</label>
            <Select value={qari} onValueChange={setQari}>
              <SelectTrigger className="border-emerald-200"><SelectValue /></SelectTrigger>
              <SelectContent>
                {QARI_LIST.map((q) => (
                  <SelectItem key={q.id} value={q.id}>{q.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" onClick={prev} disabled={currentAyah === 0} className="border-emerald-300 text-emerald-700 h-9 w-9">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="icon" onClick={toggle} className="bg-emerald-600 hover:bg-emerald-700 text-white h-11 w-11 rounded-full shadow-md">
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </Button>
              <Button size="icon" variant="outline" onClick={next} disabled={currentAyah === ayahs.length - 1} className="border-emerald-300 text-emerald-700 h-9 w-9">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-emerald-600" />
              <button
                onClick={() => setAutoNext((a) => !a)}
                className={cn(
                  "text-xs px-2.5 py-1 rounded-full border transition-colors",
                  autoNext ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-emerald-700 border-emerald-300"
                )}
              >
                Auto Next {autoNext ? "ON" : "OFF"}
              </button>
            </div>
          </div>
          <p className="text-xs text-emerald-700 mb-2">
            Memutar ayat <strong>{currentAyah + 1}</strong> dari <strong>{ayahs.length}</strong> · Qari: <strong>{QARI_LIST.find((q) => q.id === qari)?.name}</strong>
          </p>
          <div className="h-1.5 rounded-full bg-emerald-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${((currentAyah + 1) / ayahs.length) * 100}%` }}
            />
          </div>
        </div>

        <ScrollArea className="h-72 rounded-xl border border-emerald-100 bg-white">
          <div className="p-3 space-y-2">
            {ayahs.map((a, i) => (
              <div
                key={i}
                onClick={() => { setCurrentAyah(i); setPlaying(true); }}
                className={cn(
                  "rounded-lg border p-3 cursor-pointer transition-all",
                  currentAyah === i ? "border-emerald-400 bg-emerald-50 shadow-sm" : "border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs shrink-0">
                    {surahInfo.number}:{i + 1}
                  </Badge>
                  {currentAyah === i && playing && (
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <Volume2 className="h-3 w-3" /> Memutar
                    </span>
                  )}
                </div>
                <p className="text-right text-2xl leading-loose text-slate-900 mt-2 font-serif" dir="rtl">{a.arabic}</p>
                <p className="text-xs italic text-emerald-700 mt-1">{a.latin}</p>
                <p className="text-sm text-slate-600 mt-1">{a.translation}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function Sidebar({ onSelect }: { onSelect: (a: Article) => void }) {
  const [activeArchive, setActiveArchive] = useState<string | null>(null);
  const [activePopular, setActivePopular] = useState<number | null>(null);

  return (
    <aside className="space-y-5">
      <PrayerWidget />
      <QiblaWidget />

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <Bell className="h-4 w-4 text-rose-500" /> News Update
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {NEWS.map((n, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-600 hover:text-emerald-700 cursor-pointer">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
              <span className="leading-snug">{n}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <TrendingUp className="h-4 w-4 text-amber-500" /> Popular Post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {POPULAR.map((p, i) => (
            <button
              key={i}
              onClick={() => { setActivePopular(i); onSelect({ id: p.id } as Article); }}
              className={cn(
                "w-full text-left flex items-start gap-3 group cursor-pointer rounded-lg p-1.5 transition-colors",
                activePopular === i ? "bg-amber-50" : "hover:bg-slate-50"
              )}
            >
              <span className="text-lg font-bold text-emerald-200 group-hover:text-emerald-400 transition-colors w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-700 group-hover:text-emerald-700 leading-snug">{p.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{p.views.toLocaleString("id-ID")} views · {p.category}</p>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <Archive className="h-4 w-4 text-teal-500" /> Archive
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5 pt-0">
          {ARCHIVE.map((a, i) => (
            <button
              key={i}
              onClick={() => setActiveArchive(a.month)}
              className={cn(
                "w-full flex items-center justify-between text-sm py-1.5 px-2 rounded-lg transition-colors",
                activeArchive === a.month ? "bg-teal-50 text-teal-800" : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
              )}
            >
              <span>{a.month}</span>
              <Badge variant="secondary" className="text-xs bg-slate-100">{a.count}</Badge>
            </button>
          ))}
        </CardContent>
      </Card>

      <AdBanner slot="sidebar" />
    </aside>
  );
}

export function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 items-center justify-center shrink-0 group-hover:from-emerald-200 group-hover:to-teal-200 transition-colors">
            <BookOpen className="h-7 w-7 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs mb-2">{article.category}</Badge>
            <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">{article.title}</h4>
            <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
              <span className="flex items-center gap-1"><Timer className="h-3 w-3" /> {article.readTime}</span>
              <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {article.views.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}