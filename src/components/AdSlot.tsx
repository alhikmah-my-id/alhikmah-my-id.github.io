import { useEffect, useState } from "react";
import { startTappxRotation } from "@/lib/iklan";

export default function AdSlot({ label = "Sponsored" }: { label?: string }) {
  const [key, setKey] = useState("");

  useEffect(() => {
    const stop = startTappxRotation(setKey, 8000);
    return stop;
  }, []);

  return (
    <div
      data-tappx-slot
      data-tappx-key={key}
      className="flex min-h-24 items-center justify-center rounded-2xl border border-dashed border-emerald-500/40 bg-emerald-50/60 px-4 py-6 text-center"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700/70">
          {label}
        </p>
        <p className="mt-1 text-xs text-emerald-800/60">
          Tappx Ad Slot • {key || "memuat…"}
        </p>
      </div>
    </div>
  );
}