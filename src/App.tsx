import { useState, useMemo, useEffect } from "react";
import { Sparkles, Search, Menu, BookOpen, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ARTICLES, CATEGORIES, NAV_MENU, ADS_TXT, type Article } from "@/data/articles";
import { AdBanner, Sidebar, QuranPlayer, ArabicKeyboard, ArticleCard } from "@/components/Widgets";
import { ArticleReader } from "@/components/ArticleReader";
import { CategoryPage } from "@/components/CategoryPages";
import { SeoHead } from "@/components/SeoHead";

const LOGO = "https://blogger.googleusercontent.com/img/a/AVvXsEiW2Sfw5ogSKhZbFiB-VdNXwmZoMGLTGPgx5ZYrTY8859clBvRGxgx-Dwc3i03YiUs1WiiL84uTSAlZ8civ17IWTI5Emt2vXmpuT-yRTzf4620rY_4Ib_vmUEGFfLXjzMiCfmQoWUg1mmj5hQu1IpD1CYguF9GocJ81MhsQTuPgt79-I8uOaPyGT0Qzs00=s200";

const TOOL_CATEGORIES = new Set([
  "Aplikasi","Kitab/Buku","Khutbah","Informasi","Vidio","Adhan","Iqro'",
  "Perpustakaan","Arabic Pegon","Arabic Calligraphy","Kalender","Timer",
  "Murotal 30 Juz","Alqur'an Digital","WebOffice","CorelDRAW Arabic",
]);

export default function App() {
  const [selected, setSelected] = useState<Article | null>(null);
  const [activeCat, setActiveCat] = useState("Home");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdsTxt, setShowAdsTxt] = useState(false);

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      const matchCat = activeCat === "Home" || a.category === activeCat;
      const matchSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCat, search]);

  const related = useMemo(() => {
    if (!selected) return [];
    return selected.related
      .map((id) => ARTICLES.find((a) => a.id === id))
      .filter((a): a is Article => Boolean(a));
  }, [selected]);

  const openArticle = (a: Article) => {
    const full = ARTICLES.find((x) => x.id === a.id);
    if (full) {
      setSelected(full);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNav = (dir: "prev" | "next") => {
    if (!selected) return;
    const idx = ARTICLES.findIndex((a) => a.id === selected.id);
    const nextIdx = dir === "next" ? (idx + 1) % ARTICLES.length : (idx - 1 + ARTICLES.length) % ARTICLES.length;
    setSelected(ARTICLES[nextIdx]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isToolCategory = TOOL_CATEGORIES.has(activeCat);

  useEffect(() => {
    if (selected) return;
    const title = activeCat === "Home" ? "Portal Islam Terpercaya" : activeCat;
    document.title = `${title} | ALHIKMAH`;
  }, [activeCat, selected]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {!selected && (
        <SeoHead
          title={activeCat === "Home" ? "Portal Islam Terpercaya untuk Pendidikan, Sejarah, Sosial & Budaya" : activeCat}
          description="ALHIKMAH - Portal Islam terpercaya untuk pendidikan, sejarah, sosial, dan budaya. Artikel Islami, Al-Qur'an digital, murotal 30 juz, tools Arabic Pegon, kalender hijriyah, dan banyak lagi."
          url={activeCat === "Home" ? "/" : `/kategori/${activeCat.toLowerCase().replace(/\s+/g, "-")}`}
        />
      )}

      <div className="bg-emerald-950 text-emerald-100 text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <span className="hidden sm:flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-emerald-400" /> Portal Islam Terpercaya
          </span>
          <div className="flex items-center gap-3">
            {NAV_MENU.map((m) => (
              <a key={m} href="#" className="hover:text-white transition-colors font-medium tracking-wide">{m}</a>
            ))}
          </div>
        </div>
      </div>

      <header className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <button onClick={() => { setSelected(null); setActiveCat("Home"); }} className="flex items-center gap-3">
            <img src={LOGO} alt="ALHIKMAH" className="h-12 w-12 rounded-xl bg-white p-0.5 shadow-md" />
            <div className="text-left">
              <h1 className="text-2xl font-bold font-serif tracking-tight">ALHIKMAH</h1>
              <p className="text-xs text-emerald-200">alhikmah.my.id</p>
            </div>
          </button>
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-300" />
              <Input
                placeholder="Cari artikel, kitab, sholawat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-emerald-900/50 border-emerald-700 text-white placeholder:text-emerald-300/70 focus-visible:ring-emerald-400"
              />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-emerald-700" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-300" />
              <Input
                placeholder="Cari artikel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-emerald-900/50 border-emerald-700 text-white placeholder:text-emerald-300/70"
              />
            </div>
          </div>
        )}
      </header>

      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollArea className="w-full">
            <div className="flex gap-1 py-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => { setActiveCat(c); setSelected(null); }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                    activeCat === c ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {selected ? (
            <ArticleReader
              article={selected}
              related={related}
              onBack={() => setSelected(null)}
              onNav={handleNav}
              onSelect={openArticle}
            />
          ) : isToolCategory ? (
            <>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-sm">
                  <Compass className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-serif text-slate-900">{activeCat}</h2>
                  <p className="text-xs text-slate-500">Fitur interaktif ALHIKMAH</p>
                </div>
              </div>
              <CategoryPage category={activeCat} />
            </>
          ) : (
            <>
              <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-800 text-white">
                <CardContent className="p-6 md:p-8 relative">
                  <div className="absolute -right-8 -top-8 opacity-10">
                    <BookOpen className="h-48 w-48" />
                  </div>
                  <Badge className="bg-emerald-500/30 hover:bg-emerald-500/30 text-emerald-50 border border-emerald-400/40 mb-3">
                    <Sparkles className="h-3 w-3 mr-1" /> Portal Islam Terpercaya
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif leading-tight max-w-lg">
                    Pendidikan, Sejarah, Sosial & Budaya Islam dalam Satu Platform
                  </h2>
                  <p className="text-emerald-100 mt-3 max-w-xl text-sm leading-relaxed">
                    Jelajahi ribuan artikel, kitab digital, tools interaktif, dan konten Islami berkualitas dari ALHIKMAH.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    <Button className="bg-white text-emerald-800 hover:bg-emerald-50" onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}>
                      <BookOpen className="h-4 w-4 mr-2" /> Mulai Membaca
                    </Button>
                    <Button variant="outline" className="border-emerald-300 text-white hover:bg-emerald-600/50" onClick={() => { setActiveCat("Arabic Pegon"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                      <Compass className="h-4 w-4 mr-2" /> Tools Islami
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <AdBanner slot="home-top" />

              <QuranPlayer />

              <ArabicKeyboard />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-serif text-slate-900">
                    {activeCat === "Home" ? "Artikel Terbaru" : `Kategori: ${activeCat}`}
                  </h3>
                  <span className="text-xs text-slate-500">{filtered.length} artikel</span>
                </div>

                {filtered.length === 0 ? (
                  <Card className="border-dashed border-slate-300 bg-white">
                    <CardContent className="py-12 text-center">
                      <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">Tidak ada artikel ditemukan</p>
                      <p className="text-sm text-slate-400 mt-1">Coba kata kunci atau kategori lain</p>
                    </CardContent>
                  </Card>
                ) : (
                  filtered.map((a) => (
                    <ArticleCard key={a.id} article={a} onClick={() => openArticle(a)} />
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <Sidebar onSelect={openArticle} />
      </main>

      <footer className="bg-emerald-950 text-emerald-100 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO} alt="ALHIKMAH" className="h-10 w-10 rounded-lg bg-white p-0.5" />
              <div>
                <h4 className="text-lg font-bold font-serif">ALHIKMAH</h4>
                <p className="text-xs text-emerald-300">alhikmah.my.id</p>
              </div>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed max-w-md">
              Portal Islam terpercaya untuk pendidikan, sejarah, sosial, dan budaya. Menyajikan konten Islami berkualitas untuk umat.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAdsTxt((s) => !s)}
              className="mt-4 border-emerald-700 text-emerald-200 hover:bg-emerald-900 hover:text-white"
            >
              {showAdsTxt ? "Sembunyikan ads.txt" : "Lihat ads.txt / app-ads.txt"}
            </Button>
            {showAdsTxt && (
              <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-emerald-900/60 border border-emerald-800 p-3 text-xs text-emerald-100 whitespace-pre-wrap">
                {ADS_TXT}
              </pre>
            )}
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-sm">Navigasi</h5>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              {NAV_MENU.map((m) => (
                <li key={m}><a href="#" className="hover:text-white transition-colors">{m}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-sm">Legal</h5>
            <ul className="space-y-2 text-sm text-emerald-200/80">
              {["About Us","Kontak Kami","Privacy Policy","Disclaimers","Sitemap","Terms & Conditions"].map((l) => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-emerald-900">
          <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-emerald-300/70">
            Design By ADMIN ALHIKMAH | Copyright 2025 All Application International Islamic (ALHIKMAH.MY.ID - Portal Islam terpercaya untuk pendidikan, sejarah, sosial, dan budaya).
          </div>
        </div>
      </footer>
    </div>
  );
}