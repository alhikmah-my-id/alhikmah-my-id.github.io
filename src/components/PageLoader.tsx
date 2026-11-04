import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function PageLoader({ label = "Memuat halaman..." }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-emerald-950/90 backdrop-blur-sm">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/30" />
        <span className="absolute inset-2 rounded-full border-2 border-emerald-400/40" />
        <Loader2 className="h-9 w-9 animate-spin text-emerald-300" />
      </div>
      <p className="mt-5 font-serif text-sm font-semibold tracking-wide text-emerald-100">
        {label}
      </p>
      <p className="mt-1 text-xs text-emerald-400/80">ALHIKMAH.MY.ID</p>
    </div>
  );
}

export function usePageLoader(duration = 900) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(t);
  }, [duration]);
  return { loading, setLoading };
}