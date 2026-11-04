import { useEffect } from "react";

const ADSENSE_CLIENTS = [
  "ca-pub-6718454554209533",
  "ca-pub-5407249785989200",
  "ca-pub-3961173026050537",
];

const ENABLE_ADS = false;

export function AdsenseHead() {
  useEffect(() => {
    if (!ENABLE_ADS) return;
    const added: HTMLElement[] = [];

    const meta = document.createElement("meta");
    meta.name = "google-site-verification";
    meta.content = "SumuNvHw_nB3fsevMIU9N_0Oi7YWb9ykHovu0gjAbso";
    document.head.appendChild(meta);
    added.push(meta);

    ADSENSE_CLIENTS.forEach((client) => {
      const account = document.createElement("meta");
      account.name = "google-adsense-account";
      account.content = client;
      document.head.appendChild(account);
      added.push(account);

      const script = document.createElement("script");
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.onerror = () => {};
      document.head.appendChild(script);
      added.push(script);
    });

    return () => {
      added.forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, []);

  return null;
}