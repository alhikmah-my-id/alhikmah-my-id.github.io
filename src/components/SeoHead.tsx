import { useEffect } from "react";

const SITE = "https://alhikmah.my.id";
const LOGO = "https://alhikmah.my.id/images.jpg";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function SeoHead({
  title,
  description,
  url,
  type = "website",
  faqJsonLd,
}: {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  faqJsonLd?: Record<string, unknown>;
}) {
  useEffect(() => {
    const fullTitle = `${title} | ALHIKMAH`;
    const fullUrl = `${SITE}${url}`;
    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("name", "keywords", "Islam, Pendidikan, Sejarah, Sosial, Budaya, Al-Qur'an, Sholawat, ALHIKMAH");
    setMeta("name", "author", "ADMIN ALHIKMAH");
    setMeta("name", "copyright", "ALHIKMAH.MY.ID");
    setMeta("name", "google-site-verification", "SumuNvHw_nB3fsevMIU9N_0Oi7YWb9ykHovu0gjAbso");
    setMeta("name", "google-adsense-account", "ca-pub-6718454554209533");
    setMeta("name", "viewport", "width=device-width, initial-scale=1.0");

    setMeta("property", "og:type", type);
    setMeta("property", "og:url", fullUrl);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", LOGO);
    setMeta("property", "og:image:secure_url", LOGO);
    setMeta("property", "og:image:type", "image/jpeg");
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:site_name", "ALHIKMAH");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:url", fullUrl);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", LOGO);

    setLink("canonical", fullUrl);
    setLink("icon", LOGO);
    setLink("apple-touch-icon", LOGO);

    const id = "alhikmah-faq-jsonld";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    if (faqJsonLd) {
      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(faqJsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, url, type, faqJsonLd]);

  return null;
}