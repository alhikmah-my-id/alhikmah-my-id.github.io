import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, X, Sparkles } from "lucide-react";

const APK_URL = "https://alhikmah.my.id/download/alhikmah.apk";

export default function AppPromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-teal-500/15 p-4 shadow-sm">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-400/20 blur-2xl" />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-emerald-500 shadow-md">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-950">
              Aplikasi ALHIKMAH kini tersedia di Android & iOS!
            </p>
            <p className="text-xs text-emerald-800/70">
              Akses Al-Qur'an, adzan, kiblat & murotal langsung dari ponsel Anda.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="rounded-xl bg-emerald-700 text-white hover:bg-emerald-800"
            onClick={() => {
              const a = document.createElement("a");
              a.href = APK_URL;
              a.download = "ALHIKMAH-v1.0.0.apk";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
          >
            <Download className="mr-1.5 h-4 w-4" />
            Download APK
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-xl text-emerald-900 hover:bg-emerald-900/10"
            onClick={() => setVisible(false)}
            aria-label="Tutup"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}