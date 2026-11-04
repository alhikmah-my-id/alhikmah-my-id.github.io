import { useEffect, useRef } from "react";
import { MessageSquare, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DISQUS_SHORTNAME = "alhikmah";

type DisqusWindow = Window & {
  disqus_config?: () => void;
  DISQUS?: {
    reset: (opts: { reload: boolean; config: () => void }) => void;
  };
};

export function DisqusWidget({
  identifier,
  title,
  url,
}: {
  identifier: string;
  title: string;
  url: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = window as DisqusWindow;

    w.disqus_config = function () {
      const self = this as unknown as {
        page: { url: string; identifier: string; title: string };
      };
      self.page.url = url;
      self.page.identifier = identifier;
      self.page.title = title;
    };

    const existing = document.getElementById("dsq-embed-script");
    if (existing) existing.remove();

    const thread = document.getElementById("disqus_thread");
    if (thread) thread.innerHTML = "";

    if (w.DISQUS) {
      w.DISQUS.reset({
        reload: true,
        config: w.disqus_config,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = "dsq-embed-script";
    script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
    script.async = true;
    script.setAttribute("data-timestamp", String(+new Date()));
    (document.head || document.body).appendChild(script);
  }, [identifier, title, url]);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg font-serif flex items-center gap-2 text-slate-900">
            <MessageSquare className="h-5 w-5 text-emerald-600" /> Komentar & Diskusi
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            onClick={() => window.open(`https://${DISQUS_SHORTNAME}.disqus.com/home/discussion/${identifier}/`, "_blank")}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Buka di Disqus
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div id="disqus_thread" ref={containerRef} className="min-h-24" />
        <noscript className="text-sm text-slate-500">
          Aktifkan JavaScript untuk melihat komentar yang didukung oleh Disqus.
        </noscript>
      </CardContent>
    </Card>
  );
}