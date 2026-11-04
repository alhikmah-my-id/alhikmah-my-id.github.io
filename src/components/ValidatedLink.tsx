import { useState, type ReactNode, type MouseEvent } from "react";
import { PageLoader } from "@/components/PageLoader";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  onNavigate?: (href: string) => void;
};

const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

export function ValidatedLink({ href, children, className, onNavigate }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(url: string): boolean {
    if (!url || url.trim() === "" || url === "#") {
      setError("Tautan tidak valid.");
      return false;
    }
    if (url.startsWith("/") || url.startsWith("#")) return true;
    try {
      const parsed = new URL(url);
      if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
        setError("Protokol tautan tidak diizinkan.");
        return false;
      }
      return true;
    } catch {
      setError("Format tautan salah.");
      return false;
    }
  }

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    setError(null);
    if (!validate(href)) {
      e.preventDefault();
      return;
    }
    if (href.startsWith("http") && !href.includes("alhikmah.my.id")) return;
    e.preventDefault();
    setLoading(true);
    onNavigate?.(href);
    setTimeout(() => setLoading(false), 900);
  }

  return (
    <>
      {loading && <PageLoader label="Membuka halaman..." />}
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
      {error && <span className="ml-2 text-xs font-medium text-rose-500">{error}</span>}
    </>
  );
}