import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  faqJsonLd?: Record<string, unknown>;
};

const SITE = "https://alhikmah.my.id";
const LOGO = "https://alhikmah.my.id/images.jpg";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function SeoHead({ title, description, url, type = "website", faqJsonLd }: Props) {
  useEffect(() => {
    const fullTitle = `${title} | ALHIKMAH`;
    const fullUrl = `${SITE}${url}`;
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", fullUrl);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:image", LOGO);
    upsertMeta("property", "og:site_name", "ALHIKMAH");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", LOGO);
    upsertLink("canonical", fullUrl);

    let script = document.getElementById("faq-jsonld") as HTMLScriptElement | null;
    if (faqJsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.id = "faq-jsonld";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(faqJsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, url, type, faqJsonLd]);

  return null;
}