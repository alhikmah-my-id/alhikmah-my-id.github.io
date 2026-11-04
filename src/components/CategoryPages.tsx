import { useState } from "react";
import { BookOpen, Play, Pause, SkipBack, SkipForward, Volume2, Search, Download, Palette, FileText, Calendar as CalendarIcon, Timer as TimerIcon, Library, BookMarked, Video, Bell, GraduationCap, Scroll, Sparkles, Layers, PenTool, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { QARI_LIST, SURAH_LIST, SAMPLE_AYAHS } from "@/data/articles";
import { ArabicKeyboard, QuranPlayer, AdBanner } from "@/components/Widgets";

const KITAB_LIST = [
  { title: "Ihya' Ulumuddin", author: "Imam Al-Ghazali", cat: "Tasawuf" },
  { title: "Shahih Bukhari", author: "Imam Bukhari", cat: "Hadits" },
  { title: "Riyadhus Shalihin", author: "Imam An-Nawawi", cat: "Hadits" },
  { title: "Tafsir Ibnu Katsir", author: "Ibnu Katsir", cat: "Tafsir" },
  { title: "Fathul Bari", author: "Ibnu Hajar", cat: "Hadits" },
  { title: "Al-Muwatta'", author: "Imam Malik", cat: "Fiqih" },
];

const KHUTBAH_LIST = [
  { title: "Khutbah Jumat: Taqwa dan Amal Shalih", date: "12 Des 2025" },
  { title: "Khutbah Idul Fitri 1446 H", date: "30 Mar 2025" },
  { title: "Khutbah Jumat: Sabar dalam Ujian", date: "5 Des 2025" },
  { title: "Khutbah Arafah: Haji yang Mabrur", date: "9 Jun 2025" },
];

const VIDEO_LIST = [
  { title: "Kajian Tafsir Al-Fatihah", dur: "45:20", views: "12K" },
  { title: "Sejarah Islam Nusantara", dur: "1:02:15", views: "8.5K" },
  { title: "Panduan Tahsin Al-Qur'an", dur: "32:10", views: "15K" },
  { title: "Fiqih Sholat Praktis", dur: "28:45", views: "6.2K" },
];

const IQRO_LEVELS = [
  { level: 1, title: "Iqro' 1 - Huruf Hijaiyah", desc: "Pengenalan huruf hijaiyah tunggal" },
  { level: 2, title: "Iqro' 2 - Huruf Bersambung", desc: "Huruf hijaiyah bersambung" },
  { level: 3, title: "Iqro' 3 - Kasrah", desc: "Bacaan kasrah dan tanwin" },
  { level: 4, title: "Iqro' 4 - Fathah", desc: "Bacaan fathah dan tanwin" },
  { level: 5, title: "Iqro' 5 - Dhommah", desc: "Bacaan dhommah dan tanwin" },
  { level: 6, title: "Iqro' 6 - Sukun & Tasydid", desc: "Bacaan sukun dan tasydid" },
];

const CALLIGRAPHY_STYLES = [
  { name: "Naskh", desc: "Gaya klasik untuk teks Al-Qur'an" },
  { name: "Tsuluts", desc: "Gaya dekoratif untuk judul" },
  { name: "Diwani", desc: "Gaya resmi kesultanan Ottoman" },
  { name: "Kufi", desc: "Gaya geometris untuk desain modern" },
  { name: "Farisi", desc: "Gaya Persia yang elegan" },
  { name: "Riq'ah", desc: "Gaya tulisan tangan sehari-hari" },
];

const HIJRI_MONTHS = ["Muharram","Safar","Rabiul Awal","Rabiul Akhir","Jumadil Awal","Jumadil Akhir","Rajab","Sya'ban","Ramadhan","Syawal","Dzulqa'dah","Dzulhijjah"];

function ToolHeader({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-sm">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-bold font-serif text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

function KitabPage() {
  const [q, setQ] = useState("");
  const list = KITAB_LIST.filter((k) => k.title.toLowerCase().includes(q.toLowerCase()) || k.author.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <ToolHeader icon={Library} title="Perpustakaan Digital" desc="Koleksi kitab dan buku Islam klasik" />
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari kitab atau penulis..." className="pl-9" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {list.map((k, i) => (
          <Card key={i} className="border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group cursor-pointer">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="h-14 w-11 rounded-md bg-gradient-to-br from-emerald-700 to-teal-800 flex items-center justify-center shrink-0 shadow-sm">
                <BookOpen className="h-5 w-5 text-emerald-100" />
              </div>
              <div className="min-w-0 flex-1">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs mb-1.5">{k.cat}</Badge>
                <p className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700 leading-snug">{k.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{k.author}</p>
              </div>
              <Download className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 shrink-0" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function KhutbahPage() {
  return (
    <div>
      <ToolHeader icon={Scroll} title="Khutbah Jumat & Idul" desc="Kumpulan teks khutbah siap pakai" />
      <div className="space-y-3">
        {KHUTBAH_LIST.map((k, i) => (
          <Card key={i} className="border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 text-sm group-hover:text-emerald-700 leading-snug">{k.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{k.date}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700 shrink-0">
                Baca
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function VideoPage() {
  return (
    <div>
      <ToolHeader icon={Video} title="Vidio Kajian" desc="Video kajian dan ceramah pilihan" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {VIDEO_LIST.map((v, i) => (
          <Card key={i} className="border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-emerald-800 to-teal-900 flex items-center justify-center relative">
              <Play className="h-10 w-10 text-white/90 group-hover:scale-110 transition-transform" />
              <Badge className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/70 text-white text-xs">{v.dur}</Badge>
            </div>
            <CardContent className="p-3">
              <p className="font-medium text-slate-800 text-sm group-hover:text-emerald-700 leading-snug">{v.title}</p>
              <p className="text-xs text-slate-400 mt-1">{v.views} views</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function IqroPage() {
  return (
    <div>
      <ToolHeader icon={GraduationCap} title="Iqro' Digital" desc="Belajar membaca Al-Qur'an dari dasar" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {IQRO_LEVELS.map((l) => (
          <Card key={l.level} className="border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 text-white font-bold shadow-sm">
                {l.level}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700">{l.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{l.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CalligraphyPage() {
  return (
    <div>
      <ToolHeader icon={PenTool} title="Arabic Calligraphy" desc="Gaya kaligrafi Arab untuk desain" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CALLIGRAPHY_STYLES.map((c, i) => (
          <Card key={i} className="border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">{c.name}</Badge>
                <Palette className="h-4 w-4 text-slate-300 group-hover:text-emerald-500" />
              </div>
              <p className="text-sm text-slate-600">{c.desc}</p>
              <p className="text-3xl text-right mt-3 text-emerald-800 font-serif" dir="rtl">بسم الله</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function KalenderPage() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const hijriMonth = HIJRI_MONTHS[(month + 5) % 12];

  return (
    <div>
      <ToolHeader icon={CalendarIcon} title="Kalender Hijriyah & Masehi" desc="Konversi tanggal dan penanggalan Islam" />
      <Card className="border-emerald-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Button size="sm" variant="outline" onClick={() => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); }} className="border-emerald-300 text-emerald-700">‹</Button>
            <div className="text-center">
              <p className="font-bold text-slate-800">{monthNames[month]} {year}</p>
              <p className="text-xs text-emerald-600">{hijriMonth} 1447 H</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); }} className="border-emerald-300 text-emerald-700">›</Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Min","Sen","Sel","Rab","Kam","Jum","Sab"].map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-emerald-700 py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => (
              <div
                key={i}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-lg text-sm transition-colors",
                  d === null ? "" : d === now.getDate() && month === now.getMonth() && year === now.getFullYear()
                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                    : "bg-emerald-50/50 text-slate-700 hover:bg-emerald-100 cursor-pointer"
                )}
              >
                {d}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TimerPage() {
  const [seconds, setSeconds] = useState(300);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"timer" | "stopwatch">("timer");
  const [elapsed, setElapsed] = useState(0);

  useState(() => {
    const t = setInterval(() => {
      if (mode === "timer" && running && seconds > 0) setSeconds((s) => s - 1);
      if (mode === "stopwatch" && running) setElapsed((e) => e + 1);
    }, 1000);
    return () => clearInterval(t);
  });

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div>
      <ToolHeader icon={TimerIcon} title="Timer & Stopwatch" desc="Timer ibadah dan pengingat waktu" />
      <Card className="border-emerald-200 shadow-sm">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setMode("timer")} className={cn("px-4 py-1.5 rounded-lg text-sm font-medium transition-all", mode === "timer" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600")}>Timer</button>
            <button onClick={() => setMode("stopwatch")} className={cn("px-4 py-1.5 rounded-lg text-sm font-medium transition-all", mode === "stopwatch" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600")}>Stopwatch</button>
          </div>
          <p className="text-6xl font-bold tabular-nums text-emerald-900 font-serif">{fmt(mode === "timer" ? seconds : elapsed)}</p>
          <div className="flex gap-2 mt-6">
            <Button onClick={() => setRunning((r) => !r)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              {running ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {running ? "Pause" : "Start"}
            </Button>
            <Button variant="outline" onClick={() => { setRunning(false); setSeconds(300); setElapsed(0); }} className="border-emerald-300 text-emerald-700">Reset</Button>
          </div>
          {mode === "timer" && (
            <div className="flex gap-2 mt-4">
              {[60, 300, 600, 900].map((s) => (
                <button key={s} onClick={() => { setSeconds(s); setRunning(false); }} className="text-xs px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  {s / 60} menit
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AdhanPage() {
  return (
    <div>
      <ToolHeader icon={Bell} title="Adhan & Pengingat Sholat" desc="Notifikasi adzan dan jadwal sholat" />
      <Card className="border-emerald-200 shadow-sm">
        <CardContent className="p-6 text-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Bell className="h-10 w-10 text-white" />
          </div>
          <p className="font-bold text-lg text-slate-800">Adzan Digital</p>
          <p className="text-sm text-slate-500 mt-1 mb-4">Aktifkan notifikasi untuk pengingat waktu sholat otomatis</p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Bell className="h-4 w-4 mr-2" /> Aktifkan Notifikasi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function TafsirPage() {
  return (
    <div>
      <ToolHeader icon={BookMarked} title="Tafsir Web" desc="Tafsir Al-Qur'an lengkap per ayat" />
      <Card className="border-emerald-200 shadow-sm">
        <CardContent className="p-4 space-y-3">
          {SURAH_LIST.slice(0, 5).map((s) => (
            <div key={s.number} className="flex items-center justify-between p-3 rounded-lg bg-emerald-50/50 hover:bg-emerald-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">{s.number}</span>
                <div>
                  <p className="font-medium text-slate-800 text-sm">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.ayahs} ayat</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-emerald-500" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function PegonPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const map: Record<string, string> = {
    a: "ا", b: "ب", c: "چ", d: "د", e: "ي", f: "ف", g: "غ", h: "ه", i: "ي", j: "ج",
    k: "ك", l: "ل", m: "م", n: "ن", o: "و", p: "ف", q: "ق", r: "ر", s: "س", t: "ت",
    u: "و", v: "ف", w: "و", x: "كس", y: "ي", z: "ز",
  };
  const convert = (t: string) => t.split("").map((c) => map[c.toLowerCase()] || c).join("");
  return (
    <div>
      <ToolHeader icon={Sparkles} title="Konverter Arabic Pegon" desc="Konversi tulisan latin ke huruf Pegon" />
      <Card className="border-emerald-200 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Teks Latin</label>
            <textarea value={input} onChange={(e) => { setInput(e.target.value); setOutput(convert(e.target.value)); }} rows={3} placeholder="Ketik teks latin..." className="w-full rounded-lg border border-emerald-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Hasil Pegon</label>
            <div className="w-full rounded-lg border border-emerald-200 bg-emerald-50/40 p-3 text-lg text-right min-h-16" dir="rtl">{output || "..."}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WebOfficePage() {
  return (
    <div>
      <ToolHeader icon={Layers} title="WebOffice" desc="Editor dokumen online untuk kebutuhan administrasi" />
      <Card className="border-emerald-200 shadow-sm">
        <CardContent className="p-6 text-center">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-md">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <p className="font-bold text-slate-800">Editor Dokumen</p>
          <p className="text-sm text-slate-500 mt-1 mb-4">Buat dan edit dokumen langsung di browser</p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Buka Editor</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function CorelDrawPage() {
  return (
    <div>
      <ToolHeader icon={Palette} title="CorelDRAW Arabic" desc="Aset dan template desain Arab untuk CorelDRAW" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {["Bismillah","Alhamdulillah","Subhanallah","Allahu Akbar","La ilaha illallah","Muhammad"].map((t, i) => (
          <Card key={i} className="border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-4 text-center">
              <p className="text-2xl text-emerald-800 font-serif mb-2" dir="rtl">{t}</p>
              <p className="text-xs text-slate-500">{t}</p>
              <Button size="sm" variant="outline" className="mt-2 border-emerald-300 text-emerald-700 w-full">
                <Download className="h-3 w-3 mr-1" /> Unduh
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AplikasiPage() {
  const apps = [
    { name: "ALHIKMAH Mobile", desc: "Aplikasi Android & iOS", icon: "📱" },
    { name: "Qur'an Digital", desc: "Baca Al-Qur'an offline", icon: "📖" },
    { name: "Adzan Pro", desc: "Pengingat waktu sholat", icon: "🕌" },
    { name: "Arabic Keyboard", desc: "Keyboard Arab & Pegon", icon: "⌨️" },
  ];
  return (
    <div>
      <ToolHeader icon={Layers} title="Aplikasi ALHIKMAH" desc="Download aplikasi resmi ALHIKMAH" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {apps.map((a, i) => (
          <Card key={i} className="border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-3">
              <span className="text-3xl">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700">{a.name}</p>
                <p className="text-xs text-slate-500">{a.desc}</p>
              </div>
              <Download className="h-4 w-4 text-emerald-500" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function InformasiPage() {
  return (
    <div>
      <ToolHeader icon={Bell} title="Informasi" desc="Berita dan pengumuman terbaru" />
      <div className="space-y-3">
        {["Jadwal Kajian Rutin Bulan Desember", "Pendaftaran Santri Baru 1447 H", "Program Beasiswa Tahfidz", "Workshop Kaligrafi Arab"].map((t, i) => (
          <Card key={i} className="border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <div>
                <p className="font-medium text-slate-800 text-sm group-hover:text-emerald-700">{t}</p>
                <p className="text-xs text-slate-400 mt-1">Diterbitkan {i + 1} hari lalu</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function CategoryPage({ category }: { category: string }) {
  switch (category) {
    case "Aplikasi": return <AplikasiPage />;
    case "Kitab/Buku":
    case "Perpustakaan": return <KitabPage />;
    case "Khutbah": return <KhutbahPage />;
    case "Vidio": return <VideoPage />;
    case "Iqro'": return <IqroPage />;
    case "Arabic Calligraphy": return <CalligraphyPage />;
    case "Kalender": return <KalenderPage />;
    case "Timer": return <TimerPage />;
    case "Adhan": return <AdhanPage />;
    case "Tafsir Web": return <TafsirPage />;
    case "Arabic Pegon": return <PegonPage />;
    case "WebOffice": return <WebOfficePage />;
    case "CorelDRAW Arabic": return <CorelDrawPage />;
    case "Informasi": return <InformasiPage />;
    case "Murotal 30 Juz":
    case "Alqur'an Digital": return <QuranPlayer />;
    default:
      return (
        <div className="space-y-4">
          <ArabicKeyboard />
          <QuranPlayer />
          <AdBanner slot={`tool-${category}`} />
        </div>
      );
  }
}