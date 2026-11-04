import { useEffect, useRef } from "react";

declare global {
  interface Window {
    disqus_config?: () => void;
    DISQUS?: { reset: (opts: { reload: boolean; identifier: string }) => void };
  }
}

export function DisqusComments({
  identifier,
  url,
  title,
}: {
  identifier: string;
  url: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.disqus_config = function () {
      this.page.url = url;
      this.page.identifier = identifier;
      this.page.title = title;
    };

    if (window.DISQUS) {
      window.DISQUS.reset({ reload: true, identifier });
      return;
    }

    const d = document;
    if (!d.getElementById("disqus-embed-script")) {
      const s = d.createElement("script");
      s.id = "disqus-embed-script";
      s.src = "https://alhikmah-1.disqus.com/embed.js";
      s.setAttribute("data-timestamp", String(+new Date()));
      (d.head || d.body).appendChild(s);
    }

    if (!d.getElementById("dsq-count-scr")) {
      const c = d.createElement("script");
      c.id = "dsq-count-scr";
      c.src = "//alhikmah-1.disqus.com/count.js";
      c.async = true;
      (d.head || d.body).appendChild(c);
    }
  }, [identifier, url, title]);

  return (
    <section className="mt-8">
      <h2 className="mb-4 font-serif text-xl font-bold text-emerald-950">
        Komentar
      </h2>
      <div id="disqus_thread" ref={containerRef} />
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </section>
  );
}