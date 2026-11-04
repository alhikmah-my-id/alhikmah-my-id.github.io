import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, Clock, MapPin, Volume2, Sparkles } from "lucide-react";
import { PRAYER_TIMES } from "@/lib/alhikmah-data";

export default function PrayerQibla() {
  const [now, setNow] = useState(new Date());
  const [heading, setHeading] = useState(0);
  const [tab, setTab] = useState<"adzan" | "kiblat">("adzan");

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      if (typeof e.alpha === "number") setHeading(e.alpha);
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  const qibla = 295;
  const needle = (qibla - heading + 360) % 360;

  const clock = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-800/40 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 p-6 shadow-xl sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" /> AL-HIKMAH DIGITAL
          </span>
          <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
            Jadwal Adzan & Kompas Kiblat
          </h2>
        </div>
        <Badge className="border border-emerald-400/30 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">
          <MapPin className="mr-1 h-3 w-3" /> Semarang, ID
        </Badge>
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-black/30 p-1.5">
        <button
          onClick={() => setTab("adzan")}
          className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all ${
            tab === "adzan"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
              : "text-emerald-200/60 hover:text-white"
          }`}
        >
          <Clock className="h-4 w-4" /> Jadwal Adzan
        </button>
        <button
          onClick={() => setTab("kiblat")}
          className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all ${
            tab === "kiblat"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
              : "text-emerald-200/60 hover:text-white"
          }`}
        >
          <Compass className="h-4 w-4" /> Kompas Kiblat
        </button>
      </div>

      {tab === "adzan" ? (
        <div className="relative mt-6 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-600/30 to-teal-700/30 p-5 text-center">
              <Volume2 className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 text-emerald-500/10" />
              <p className="text-xs font-medium text-emerald-300">
                WAKTU SEKARANG
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-wider text-white">
                {clock}
              </p>
              <p className="mt-2 text-xs text-emerald-100/70">
                Adzan berikutnya menyesuaikan jadwal harian
              </p>
            </div>

            <div className="space-y-2">
              {PRAYER_TIMES.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between rounded-2xl border border-emerald-700/30 bg-emerald-900/20 px-4 py-3 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-lg text-emerald-300">
                      {p.arabic}
                    </span>
                    <span className="text-sm font-semibold text-white">{p.name}</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-200">{p.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-emerald-700/40 bg-emerald-950/40 backdrop-blur-sm">
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                  Info Adzan
                </p>
                <p className="mt-2 text-sm text-emerald-100/80">
                  Jadwal adzan dihitung berdasarkan koordinat lokasi Anda. Aktifkan
                  notifikasi untuk pengingat otomatis di aplikasi ALHIKMAH Mobile.
                </p>
                <div className="mt-4 space-y-2 text-xs text-emerald-200/70">
                  <p>• Metode: Kemenag RI</p>
                  <p>• Zona waktu: WIB (UTC+7)</p>
                  <p>• Ihtiyati: +2 menit</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="relative mt-6 grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="flex items-center justify-center">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-4 border-emerald-500/30 bg-emerald-950/40">
              <div className="absolute inset-4 rounded-full border border-emerald-500/20" />
              <div
                className="absolute inset-0 flex items-start justify-center transition-transform duration-500"
                style={{ transform: `rotate(${needle}deg)` }}
              >
                <div className="mt-2 flex flex-col items-center">
                  <div className="h-24 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-white">{qibla}°</p>
                <p className="text-xs text-emerald-300">Arah Kiblat</p>
              </div>
            </div>
          </div>

          <Card className="border-emerald-700/40 bg-emerald-950/40 backdrop-blur-sm">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                Panduan Kompas
              </p>
              <p className="mt-2 text-sm text-emerald-100/80">
                Letakkan perangkat pada permukaan datar, jauhkan dari benda logam, lalu
                putar hingga jarum mengarah ke {qibla}° dari utara.
              </p>
              <div className="mt-4 space-y-2 text-xs text-emerald-200/70">
                <p>• Heading perangkat: {Math.round(heading)}°</p>
                <p>• Sudut kiblat: {qibla}°</p>
                <p>• Selisih: {Math.round(needle)}°</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}