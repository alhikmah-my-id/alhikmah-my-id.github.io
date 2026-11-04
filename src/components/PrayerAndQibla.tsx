import { useState, useEffect } from "react";
import { Compass, Clock, MapPin, Volume2, Sparkles } from "lucide-react";

type Prayer = { name: string; time: string; active: boolean };

const PRAYER_TIMES: Prayer[] = [
  { name: "Subuh", time: "04:15", active: false },
  { name: "Dzuhur", time: "11:50", active: true },
  { name: "Ashar", time: "15:10", active: false },
  { name: "Maghrib", time: "18:02", active: false },
  { name: "Isya", time: "19:15", active: false },
];

export function PrayerAndQibla() {
  const [now, setNow] = useState(new Date());
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [tab, setTab] = useState<"adzan" | "kiblat">("adzan");
  const qiblaAngle = 295;

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      if (typeof e.alpha === "number") setDeviceHeading(e.alpha);
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  const clock = now.toLocaleTimeString("id-ID", { hour12: false });
  const needle = (qiblaAngle - deviceHeading + 360) % 360;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 p-4 text-white sm:p-6">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-emerald-300">
              <Sparkles size={14} /> AL-HIKMAH DIGITAL
            </span>
            <h1 className="bg-gradient-to-r from-emerald-200 to-teal-400 bg-clip-text text-2xl font-bold text-transparent">
              Jadwal &amp; Kiblat
            </h1>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-800/50 px-3 py-1.5 text-xs">
            <MapPin size={14} className="text-emerald-300" />
            <span>Semarang, ID</span>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-black/30 p-1.5">
          <button
            onClick={() => setTab("adzan")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all ${
              tab === "adzan"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Clock size={16} /> Jadwal Adzan
          </button>
          <button
            onClick={() => setTab("kiblat")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all ${
              tab === "kiblat"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Compass size={16} /> Kompas Kiblat
          </button>
        </div>

        {tab === "adzan" && (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-600/30 to-teal-700/30 p-5 text-center">
              <div className="pointer-events-none absolute -bottom-6 -right-6 text-emerald-500/10">
                <Volume2 size={120} />
              </div>
              <p className="mb-1 text-xs font-medium text-emerald-300">
                WAKTU SEKARANG
              </p>
              <h2 className="text-3xl font-extrabold tracking-wider text-white">
                {clock}
              </h2>
              <p className="mt-2 text-xs text-slate-300">
                Adzan Dzuhur berkumandang pukul 11:50 WIB
              </p>
            </div>

            <div className="space-y-2">
              {PRAYER_TIMES.map((p) => (
                <div
                  key={p.name}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
                    p.active
                      ? "border-emerald-400/60 bg-emerald-500/20"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="font-mono text-sm text-emerald-200">{p.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "kiblat" && (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full border-4 border-emerald-500/30 bg-black/30">
              <span className="absolute top-2 text-xs text-emerald-300">U</span>
              <span className="absolute bottom-2 text-xs text-emerald-300">S</span>
              <span className="absolute left-2 text-xs text-emerald-300">B</span>
              <span className="absolute right-2 text-xs text-emerald-300">T</span>
              <div
                className="h-40 w-1 origin-bottom rounded-full bg-gradient-to-t from-emerald-500 to-teal-300"
                style={{ transform: `rotate(${needle}deg)` }}
              />
              <div className="absolute h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <p className="text-center text-sm text-slate-300">
              Arah kiblat: <span className="font-semibold text-emerald-200">{qiblaAngle}°</span> dari Utara
            </p>
            <p className="text-center text-xs text-slate-400">
              Kompas perangkat: {Math.round(deviceHeading)}°
            </p>
          </div>
        )}
      </div>
    </div>
  );
}