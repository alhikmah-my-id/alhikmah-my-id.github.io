import { TAPPX_KEYS } from "@/lib/alhikmah-data";

let keyIndex = 0;

export function currentTappxKey(): string {
  return TAPPX_KEYS[keyIndex % TAPPX_KEYS.length];
}

export function rotateTappxKey(): string {
  keyIndex = (keyIndex + 1) % TAPPX_KEYS.length;
  return currentTappxKey();
}

export function startTappxRotation(
  onRotate: (key: string) => void,
  intervalMs = 8000
): () => void {
  onRotate(currentTappxKey());
  const id = window.setInterval(() => {
    onRotate(rotateTappxKey());
  }, intervalMs);
  return () => window.clearInterval(id);
}

export function shareArticle(
  platform: "whatsapp" | "facebook" | "twitter" | "telegram",
  url: string,
  title: string
): void {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const map: Record<string, string> = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };
  window.open(map[platform], "_blank", "noopener,noreferrer");
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}