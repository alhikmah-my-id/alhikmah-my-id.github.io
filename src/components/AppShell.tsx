import { useState, type ReactNode } from "react";
import { PageLoader } from "@/components/PageLoader";
import { ValidatedLink } from "@/components/ValidatedLink";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Al-Qur'an", href: "/alquran" },
  { label: "Adhan", href: "/adhan" },
  { label: "Arabic Pegon", href: "/arabic-pegon" },
  { label: "Kalender", href: "/kalender" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState("/");
  const [loading, setLoading] = useState(false);

  function navigate(href: string) {
    setLoading(true);
    setTimeout(() => {
      setRoute(href);
      setLoading(false);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-emerald-50/40">
      {loading && <PageLoader label="Memuat halaman..." />}

      <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-emerald-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="https://alhikmah.my.id/images.jpg"
              alt="ALHIKMAH"
              className="h-9 w-9 rounded-lg object-cover ring-2 ring-emerald-500/40"
            />
            <span className="font-serif text-lg font-bold text-emerald-50">
              ALHIKMAH
            </span>
          </div>
          <nav className="hidden gap-1 md:flex">
            {NAV.map((item) => (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  route === item.href
                    ? "bg-emerald-600 text-white"
                    : "text-emerald-200 hover:bg-emerald-800/60 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="mt-12 border-t border-emerald-900/10 bg-emerald-950 py-8 text-center">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-emerald-300">
          <ValidatedLink href="/about" className="hover:text-white">About Us</ValidatedLink>
          <ValidatedLink href="/kontak" className="hover:text-white">Kontak Kami</ValidatedLink>
          <ValidatedLink href="/privacy" className="hover:text-white">Privacy Policy</ValidatedLink>
          <ValidatedLink href="/disclaimers" className="hover:text-white">Disclaimers</ValidatedLink>
          <ValidatedLink href="/sitemap" className="hover:text-white">Sitemap</ValidatedLink>
          <ValidatedLink href="/terms" className="hover:text-white">Terms & Conditions</ValidatedLink>
        </div>
        <p className="mt-4 text-xs text-emerald-400/80">
          Design By ADMIN ALHIKMAH | Copyright 2025 All Application International Islamic
        </p>
        <p className="mt-1 text-xs text-emerald-500/70">
          ALHIKMAH.MY.ID - Portal Islam terpercaya untuk pendidikan, sejarah, sosial, dan budaya.
        </p>
      </footer>
    </div>
  );
}