import { useEffect, useRef } from "react";

type Props = {
  identifier: string;
  url: string;
  title: string;
};

const ENABLE_DISQUS = false;

export function DisqusComments({ identifier, url, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ENABLE_DISQUS) return;
    const w = window as unknown as {
      disqus_config?: () => void;
      DISQUS?: { reset: (opts: { reload: boolean; config: () => void }) => void };
    };

    w.disqus_config = function () {
      const cfg = this as unknown as {
        page: { url: string; identifier: string; title: string };
      };
      cfg.page.url = url;
      cfg.page.identifier = identifier;
      cfg.page.title = title;
    };

    if (w.DISQUS) {
      try {
        w.DISQUS.reset({ reload: true, config: w.disqus_config });
      } catch {}
      return;
    }

    const script = document.createElement("script");
    script.src = "https://alhikmah.disqus.com/embed.js";
    script.setAttribute("data-timestamp", String(Date.now()));
    script.async = true;
    script.onerror = () => {};
    (document.head || document.body).appendChild(script);
  }, [identifier, url, title]);

  return (
    <section className="mt-8 rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-serif text-xl font-bold text-emerald-950">Diskusi</h2>
      <div id="disqus_thread" ref={ref} />
      {!ENABLE_DISQUS && (
        <p className="text-sm text-muted-foreground">
          Komentar dinonaktifkan pada mode pratinjau. Aktifkan Disqus saat produksi.
        </p>
      )}
    </section>
  );
}