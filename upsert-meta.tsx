import { useEffect } from "react";

const ADSENSE_CLIENTS = [
  "ca-pub-6718454554209533",
  "ca-pub-5407249785989200",
  "ca-pub-3961173026050537",
];

const SITE_VERIFICATION = "SumuNvHw_nB3fsevMIU9N_0Oi7YWb9ykHovu0gjAbso";

function upsertMeta(attr: "name" | "content", value: string, key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${value}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute(key, content);
}

function upsertScript(id: string, attrs: Record<string, string>) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
}

export function AdsenseHead() {
  useEffect(() => {
    upsertMeta("name", "google-site-verification", "content", SITE_VERIFICATION);

    ADSENSE_CLIENTS.forEach((client, i) => {
      upsertMeta("name", "google-adsense-account", "content", client);
      upsertScript(`adsbygoogle-${i}`, {
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`,
        crossorigin: "anonymous",
      });
      upsertScript(`amp-auto-ads-${i}`, {
        "custom-element": "amp-auto-ads",
        src: "https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js",
      });
    });
  }, []);

  return null;
}