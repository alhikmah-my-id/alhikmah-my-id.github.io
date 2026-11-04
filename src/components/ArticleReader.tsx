import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, Clock, TrendingUp, Calendar, Share2,
  MessageCircle, Send, Link2, Check, ListTree,
  HelpCircle, Flag, BookOpen, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AdBanner } from "@/components/Widgets";
import { SeoHead } from "@/components/SeoHead";
import type { Article } from "@/data/articles";

const SITE = "https://alhikmah.my.id";

const headingClass: Record<number, string> = {
  1: "text-2xl md:text-3xl font-bold font-serif text-slate-900 mt-8 mb-3",
  2: "text-xl md:text-2xl font-bold font-serif text-emerald-900 mt-7 mb-3",
  3: "text-lg md:text-xl font-semibold text-emerald-800 mt-6 mb-2",
  4: "text-base md:text-lg font-semibold text-slate-800 mt-5 mb-2",
  5: "text-base font-semibold text-slate-700 mt-4 mb-2",
  6: "text-sm font-semibold uppercase tracking-wide text-slate-600 mt-4 mb-2",
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

export function ArticleReader({
  article,
  related,
  onBack,
  onNav,
  onSelect,
}: {
  article: Article;
  related: Article[];
  onBack: () => void;
  onNav: (dir: "prev" | "next") => void;
  onSelect: (a: Article) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  const url = `${SITE}/artikel/${article.slug}`;
  const shareText = encodeURIComponent(article.title);

  const toc = useMemo(
    () => article.content.map((s) => ({ id: slugify(s.text), text: s.text, level: s.level })),
    [article]
  );

  useEffect(() => {
    const handler = () => {
      let current = "";
      for (const item of toc) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActiveId(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [toc]);

  const copyLink = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="space-y-6">
      <SeoHead
        title={article.title}
        description={article.excerpt}
        url={`/artikel/${article.slug}`}
        type="article"
        faqJsonLd={faqJsonLd}
      />

      <Button
        variant="ghost"
        onClick={onBack}
        className="text-emerald-700 hover:bg-emerald-50 -ml-2"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Beranda
      </Button>

      <Card className="border-0 shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 px-6 py-7 text-white">
          <Badge className="bg-emerald-500/30 hover:bg-emerald-500/30 text-emerald-50 border border-emerald-400/40 mb-3">
            {article.category}
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold font-serif leading-tight">{article.title}</h1>
          <p className="text-emerald-100 mt-3 text-sm leading-relaxed">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-emerald-200">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {article.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {article.readTime}</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> {article.views.toLocaleString("id-ID")} views</span>
            <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> {article.author}</span>
          </div>
        </div>

        <CardContent className="p-6 md:p-8">
          <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 mb-6">
            <h2 className="text-base font-bold text-emerald-900 flex items-center gap-2 mb-3">
              <ListTree className="h-4 w-4" /> Daftar Isi (Table of Contents)
            </h2>
            <ol className="space-y-1.5">
              {toc.map((t, i) => (
                <li key={t.id} style={{ paddingLeft: `${(t.level - 1) * 14}px` }}>
                  <a
                    href={`#${t.id}`}
                    className={cn(
                      "text-sm flex items-start gap-2 transition-colors group",
                      activeId === t.id ? "text-emerald-700 font-semibold" : "text-slate-600 hover:text-emerald-700"
                    )}
                  >
                    <ChevronRight className={cn("h-4 w-4 mt-0.5 shrink-0 transition-transform", activeId === t.id ? "text-emerald-600 translate-x-0.5" : "text-slate-300 group-hover:text-emerald-400")} />
                    <span>
                      <span className="text-emerald-500 font-mono text-xs mr-1">{i + 1}.</span>
                      {t.text}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <AdBanner slot="article-top" />

          <div className="mt-6">
            {article.content.map((section, idx) => {
              const id = slugify(section.text);
              const Tag = `h${section.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
              return (
                <section key={id} id={id} className="scroll-mt-24">
                  <Tag className={headingClass[section.level]}>{section.text}</Tag>
                  {section.body.map((p, i) => (
                    <p key={i} className="text-slate-700 leading-relaxed mb-3 text-justify">{p}</p>
                  ))}
                  {idx === 1 && <AdBanner slot="article-mid" />}
                </section>
              );
            })}
          </div>

          <Separator className="my-8" />

          <section id="faq" className="scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold font-serif text-emerald-900 flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5" /> Pertanyaan Umum (FAQ)
            </h2>
            <div className="space-y-3">
              {article.faq.map((f, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-300 transition-colors">
                  <p className="font-semibold text-slate-800 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">Q{i + 1}.</span> {f.q}
                  </p>
                  <p className="text-sm text-slate-600 mt-2 pl-7 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-8" />

          <section id="kesimpulan" className="scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold font-serif text-emerald-900 flex items-center gap-2 mb-3">
              <Flag className="h-5 w-5" /> Kesimpulan
            </h2>
            <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50/60 p-5">
              <p className="text-slate-700 leading-relaxed">{article.conclusion}</p>
            </div>
          </section>

          <Separator className="my-8" />

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Share2 className="h-4 w-4 text-emerald-600" /> Bagikan Artikel Ini
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => window.open(`https://wa.me/?text=${shareText}%20${encodeURIComponent(url)}`, "_blank")}>
                <MessageCircle className="h-3.5 w-3.5 mr-1.5" /> WhatsApp
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")}>
                <Share2 className="h-3.5 w-3.5 mr-1.5" /> Facebook
              </Button>
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(url)}`, "_blank")}>
                <Send className="h-3.5 w-3.5 mr-1.5" /> Twitter / X
              </Button>
              <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white" onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${shareText}`, "_blank")}>
                <Send className="h-3.5 w-3.5 mr-1.5" /> Telegram
              </Button>
              <Button size="sm" variant="outline" onClick={copyLink} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                {copied ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Link2 className="h-3.5 w-3.5 mr-1.5" />}
                {copied ? "Tersalin!" : "Salin Link"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => onNav("prev")} className="h-auto py-3 justify-start border-slate-200 hover:border-emerald-300 hover:bg-emerald-50">
          <ArrowLeft className="h-4 w-4 mr-2 text-emerald-600 shrink-0" />
          <span className="text-left">
            <span className="block text-xs text-slate-400">Artikel Sebelumnya</span>
            <span className="block text-sm font-medium text-slate-700">Prev Article</span>
          </span>
        </Button>
        <Button variant="outline" onClick={() => onNav("next")} className="h-auto py-3 justify-end border-slate-200 hover:border-emerald-300 hover:bg-emerald-50">
          <span className="text-right">
            <span className="block text-xs text-slate-400">Artikel Selanjutnya</span>
            <span className="block text-sm font-medium text-slate-700">Next Article</span>
          </span>
          <ArrowRight className="h-4 w-4 ml-2 text-emerald-600 shrink-0" />
        </Button>
      </div>

      {related.length > 0 && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-serif text-slate-900">Artikel Terkait</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {related.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelect(r)}
                className="w-full text-left flex items-center gap-3 rounded-lg p-2.5 hover:bg-emerald-50 transition-colors group"
              >
                <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 group-hover:text-emerald-700 leading-snug">{r.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{r.category} · {r.readTime}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      )}
    </article>
  );
}