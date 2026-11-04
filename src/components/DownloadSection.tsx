import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Smartphone,
  ShieldCheck,
  Zap,
  Wifi,
  BookOpen,
  Compass,
  CheckCircle2,
  Apple,
  Play,
  Star,
  Users,
  HardDrive,
} from "lucide-react";

const APK_URL = "https://alhikmah.my.id/download/alhikmah.apk";
const APK_SIZE = "8.2 MB";
const APK_VERSION = "1.0.0";

const features = [
  { icon: BookOpen, label: "Al-Qur'an Digital 30 Juz" },
  { icon: Compass, label: "Kompas Kiblat & Jadwal Adzan" },
  { icon: Wifi, label: "Mode Offline (Murotal)" },
  { icon: Zap, label: "Ringan & Cepat" },
];

const stats = [
  { icon: Users, value: "12.4K+", label: "Pengguna Aktif" },
  { icon: Star, value: "4.9/5", label: "Rating Play Store" },
  { icon: HardDrive, value: APK_SIZE, label: "Ukuran File" },
];

export default function DownloadSection() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const a = document.createElement("a");
    a.href = APK_URL;
    a.download = `ALHIKMAH-v${APK_VERSION}.apk`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setDownloading(false), 2500);
  };

  return (
    <section
      id="download"
      className="relative overflow-hidden rounded-3xl border border-emerald-800/40 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 p-6 sm:p-10 shadow-xl"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-5 lg:items-center">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-500/30">
              <Smartphone className="mr-1 h-3 w-3" /> Android & iOS
            </Badge>
            <Badge className="bg-amber-500/20 text-amber-200 border border-amber-400/30 hover:bg-amber-500/30">
              <ShieldCheck className="mr-1 h-3 w-3" /> 100% Aman
            </Badge>
            <Badge className="bg-teal-500/20 text-teal-200 border border-teal-400/30 hover:bg-teal-500/30">
              Gratis Selamanya
            </Badge>
          </div>

          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Bawa <span className="text-emerald-300">ALHIKMAH</span> di Saku Anda
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-emerald-100/70 leading-relaxed">
              Install aplikasi resmi ALHIKMAH untuk akses cepat Al-Qur'an digital,
              jadwal adzan, kompas kiblat, murotal 30 juz, dan ribuan artikel Islami —
              langsung dari ponsel Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 rounded-xl border border-emerald-700/30 bg-emerald-900/20 px-3 py-2.5 backdrop-blur-sm"
              >
                <f.icon className="h-4 w-4 shrink-0 text-emerald-300" />
                <span className="text-xs sm:text-sm text-emerald-50/90">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              onClick={handleDownload}
              disabled={downloading}
              size="lg"
              className="group h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 text-base font-semibold text-white shadow-lg shadow-emerald-900/50 transition-all hover:from-emerald-400 hover:to-teal-400 hover:shadow-emerald-700/50 active:scale-[0.98] disabled:opacity-70"
            >
              {downloading ? (
                <>
                  <Download className="mr-2 h-5 w-5 animate-bounce" />
                  Mengunduh…
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                  Download APK Android
                </>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-2xl border-emerald-400/30 bg-emerald-900/30 text-emerald-100 backdrop-blur-sm hover:bg-emerald-800/40 hover:text-white"
                onClick={() => window.open("https://play.google.com/store", "_blank")}
              >
                <Play className="mr-2 h-5 w-5" />
                Google Play
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-2xl border-emerald-400/30 bg-emerald-900/30 text-emerald-100 backdrop-blur-sm hover:bg-emerald-800/40 hover:text-white"
                onClick={() => window.open("https://apps.apple.com", "_blank")}
              >
                <Apple className="mr-2 h-5 w-5" />
                App Store
              </Button>
            </div>
          </div>

          <p className="text-xs text-emerald-200/60">
            Versi {APK_VERSION} • {APK_SIZE} • Android 5.0+ • Diperbarui Desember 2025
          </p>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-emerald-700/40 bg-emerald-950/40 backdrop-blur-sm shadow-2xl">
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">ALHIKMAH Mobile</p>
                  <p className="text-xs text-emerald-200/70">id.my.alhikmah.app</p>
                </div>
              </div>

              <div className="space-y-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between rounded-xl border border-emerald-800/40 bg-emerald-900/20 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <s.icon className="h-4 w-4 text-emerald-300" />
                      <span className="text-xs text-emerald-100/80">{s.label}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-emerald-800/40 pt-4">
                {[
                  "Tanpa iklan mengganggu",
                  "Update otomatis",
                  "Data aman & terenkripsi",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-emerald-100/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    {t}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}