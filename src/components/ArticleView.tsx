import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Clock,
  Users,
  Share2,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  List,
  HelpCircle,
  BookOpen,
  MessageCircle,
  Send,
  Link2,
} from "lucide-react";
import {
  Article,
  getNextArticle,
  getPrevArticle,
  getRelatedArticles,
  POPULAR_POSTS,
  ARCHIVES,
} from "@/lib/alhikmah-data";
import { shareArticle, copyToClipboard } from "@/lib/iklan";

type Props = {
  article: Article;
  onBack: () => void;
  onNavigate: (slug: string) => void;
};

const TOC = [
  { id: "pendahuluan", label: "Pendahuluan", level: 2 },
  { id: "dalil", label: "Dalil Al-Qur'an & Hadits", level: 2 },
  { id: "keutamaan", label: "Keutamaan & Manfaat", level: 3 },
  { id: "adab", label: "Adab & Tata Cara", level: 3 },
  { id: "praktik", label: "Praktik Harian", level: 2 },
  { id: "faq", label: "FAQ", level: 2 },
  { id: "kesimpulan", label: "Kesimpulan", level: 2 },
];

const FAQ = [
  {
    q: "Apakah membaca Al-Qur'an wajib setiap hari?",
    a: "Membaca Al-Qur'an hukumnya sunnah muakkadah, namun sebagian ulama menganjurkan untuk menjadikannya rutinitas harian sebagai bentuk kedekatan dengan Allah.",
  },
  {
    q: "Berapa minimal bacaan harian yang dianjurkan?",
    a: "Tidak ada batas minimal yang baku, namun satu juz per hari adalah target yang dianjurkan bagi yang mampu.",
  },
  {
    q: "Apakah boleh membaca dari aplikasi digital?",
    a: "Boleh, dan tetap mendapatkan pahala. Namun membaca dari mushaf fisik memiliki keutamaan tersendiri karena menyentuh dan melihat langsung kalamullah.",
  },
];

export default function ArticleView({ article, onBack, onNavigate }: Props) {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("pendahuluan");

  const next = useMemo(() => getNextArticle(article), [article]);
  const prev = useMemo(() => getPrevArticle(article), [article]);
  const related = useMemo(() => getRelatedArticles(article), [article]);
  const url = `https://alhikmah.my.id/artikel/${article.slug}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [article.slug]);

  useEffect(() => {
    const handler = () => {
      for (const item of TOC) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) setActiveSection(item.id);
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleCopy = async () => {
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 text-emerald-700 hover:bg-emerald-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="lg:col-span-2 space-y-6">
          <header className="rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 p-6 shadow-xl sm:p-8">
            <Badge className="mb-3 border border-emerald-400/30 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">
              {article.category}
            </Badge>
            <h1 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-3 text-sm text-emerald-100/80 sm:text-base">
              {article.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-emerald-200/70">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> {article.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {article.readTime}
              </span>
              <span>{article.views} views</span>
              <span>{article.date}</span>
            </div>
          </header>

          <Card className="border-emerald-900/10 bg-white shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <List className="h-4 w-4 text-emerald-600" />
                <h2 className="font-serif text-base font-bold text-emerald-950">
                  Table of Contents
                </h2>
              </div>
              <ol className="space-y-1.5">
                {TOC.map((t) => (
                  <li key={t.id} style={{ paddingLeft: t.level === 3 ? "1rem" : 0 }}>
                    <a
                      href={`#${t.id}`}
                      className={`text-sm transition-colors ${
                        activeSection === t.id
                          ? "font-semibold text-emerald-600"
                          : "text-emerald-900/70 hover:text-emerald-600"
                      }`}
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-emerald-900/10 bg-white shadow-sm">
            <CardContent className="max-w-none p-5 sm:p-8">
              <h2 id="pendahuluan" className="font-serif text-2xl font-bold text-emerald-950">
                Pendahuluan
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-emerald-900/80 sm:text-base">
                {article.content}
              </p>

              <h2 id="dalil" className="mt-8 font-serif text-2xl font-bold text-emerald-950">
                Dalil Al-Qur'an & Hadits
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-emerald-900/80 sm:text-base">
                Allah berfirman dalam surah Al-Isra ayat 82: "Dan Kami turunkan dari
                Al-Qur'an sesuatu yang menjadi penawar dan rahmat bagi orang-orang yang
                beriman." Rasulullah ﷺ juga bersabda: "Sebaik-baik kalian adalah yang
                mempelajari Al-Qur'an dan mengajarkannya." (HR. Bukhari)
              </p>

              <h3 id="keutamaan" className="mt-6 font-serif text-xl font-bold text-emerald-950">
                Keutamaan & Manfaat
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-emerald-900/80 sm:text-base">
                <li>Mendapat syafaat di hari kiamat</li>
                <li>Menjadi cahaya di dunia dan akhirat</li>
                <li>Menenangkan hati dan pikiran</li>
                <li>Meningkatkan derajat di sisi Allah</li>
              </ul>

              <h3 id="adab" className="mt-6 font-serif text-xl font-bold text-emerald-950">
                Adab & Tata Cara
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-emerald-900/80 sm:text-base">
                Berwudhu sebelum membaca, menghadap kiblat, membaca ta'awudz dan
                basmalah, serta membaca dengan tartil dan penuh penghayatan.
              </p>

              <h2 id="praktik" className="mt-8 font-serif text-2xl font-bold text-emerald-950">
                Praktik Harian
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-emerald-900/80 sm:text-base">
                Tetapkan target harian, misalnya satu halaman setelah sholat fardhu.
                Konsistensi lebih penting daripada jumlah. Gunakan aplikasi ALHIKMAH
                untuk memudahkan tilawah kapan saja.
              </p>

              <h2 id="faq" className="mt-8 font-serif text-2xl font-bold text-emerald-950">
                FAQ
              </h2>
              <div className="mt-4 space-y-3">
                {FAQ.map((f) => (
                  <div
                    key={f.q}
                    className="rounded-2xl border border-emerald-900/10 bg-emerald-50/50 p-4"
                  >
                    <div className="flex items-start gap-2">
                      <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <p className="text-sm font-semibold text-emerald-950">{f.q}</p>
                    </div>
                    <p className="mt-2 pl-6 text-sm text-emerald-900/75">{f.a}</p>
                  </div>
                ))}
              </div>

              <h2 id="kesimpulan" className="mt-8 font-serif text-2xl font-bold text-emerald-950">
                Kesimpulan
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-emerald-900/80 sm:text-base">
                Membaca Al-Qur'an adalah investasi akhirat yang tidak akan pernah rugi.
                Mari jadikan tilawah sebagai bagian dari rutinitas harian kita, dimulai
                dari langkah kecil yang konsisten.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-900/10 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <Share2 className="h-4 w-4 text-emerald-600" />
                <h3 className="font-serif text-base font-bold text-emerald-950">
                  Bagikan Artikel
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                  onClick={() => shareArticle("whatsapp", url, article.title)}
                >
                  <MessageCircle className="mr-1.5 h-4 w-4" /> WhatsApp
                </Button>
                <Button
                  size="sm"
                  className="rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => shareArticle("facebook", url, article.title)}
                >
                  <Link2 className="mr-1.5 h-4 w-4" /> Facebook
                </Button>
                <Button
                  size="sm"
                  className="rounded-xl bg-slate-800 text-white hover:bg-slate-900"
                  onClick={() => shareArticle("twitter", url, article.title)}
                >
                  <Send className="mr-1.5 h-4 w-4" /> Twitter/X
                </Button>
                <Button
                  size="sm"
                  className="rounded-xl bg-sky-500 text-white hover:bg-sky-600"
                  onClick={() => shareArticle("telegram", url, article.title)}
                >
                  <Send className="mr-1.5 h-4 w-4" /> Telegram
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="mr-1.5 h-4 w-4" /> Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1.5 h-4 w-4" /> Salin Link
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => onNavigate(prev.slug)}
              className="group flex items-center gap-3 rounded-2xl border border-emerald-900/10 bg-white p-4 text-left shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md"
            >
              <ChevronLeft className="h-5 w-5 text-emerald-600" />
              <div className="min-w-0">
                <p className="text-xs text-emerald-800/50">Sebelumnya</p>
                <p className="truncate text-sm font-semibold text-emerald-950 group-hover:text-emerald-700">
                  {prev.title}
                </p>
              </div>
            </button>
            <button
              onClick={() => onNavigate(next.slug)}
              className="group flex items-center justify-end gap-3 rounded-2xl border border-emerald-900/10 bg-white p-4 text-right shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md"
            >
              <div className="min-w-0">
                <p className="text-xs text-emerald-800/50">Selanjutnya</p>
                <p className="truncate text-sm font-semibold text-emerald-950 group-hover:text-emerald-700">
                  {next.title}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-emerald-600" />
            </button>
          </div>
        </article>

        <aside className="space-y-4">
          <Card className="border-emerald-900/10 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                <h3 className="font-serif text-base font-bold text-emerald-950">
                  Artikel Terkait
                </h3>
              </div>
              <div className="space-y-3">
                {related.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => onNavigate(r.slug)}
                    className="group block w-full text-left"
                  >
                    <p className="text-sm font-semibold text-emerald-950 group-hover:text-emerald-600">
                      {r.title}
                    </p>
                    <p className="text-xs text-emerald-800/50">
                      {r.category} • {r.readTime}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-900/10 bg-white shadow-sm">
            <CardContent className="p-5">
              <h3 className="mb-3 font-serif text-base font-bold text-emerald-950">
                Popular Post
              </h3>
              <ol className="space-y-3">
                {POPULAR_POSTS.map((p, i) => (
                  <li key={p} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-700">
                      {i + 1}
                    </span>
                    <span className="text-sm text-emerald-900/80">{p}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-emerald-900/10 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm">
            <CardContent className="p-5">
              <h3 className="mb-3 font-serif text-base font-bold text-emerald-950">
                Arsip
              </h3>
              <div className="space-y-2">
                {ARCHIVES.map((a) => (
                  <div
                    key={a.label}
                    className="flex items-center justify-between rounded-xl border border-emerald-900/10 bg-white/70 px-3 py-2 text-sm text-emerald-900/80"
                  >
                    {a.label}
                    <span className="text-xs text-emerald-700">{a.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}