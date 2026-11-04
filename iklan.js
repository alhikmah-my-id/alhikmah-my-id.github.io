/**
 * ALHIKMAH - Tappx Ad Rotation Module
 * Rotates Tappx App Keys dynamically and exposes a simple API.
 */

const TAPPX_KEYS = [
  "pub-65263-android-0300",
  "pub-57747-android-0996",
  "pub-60567-android-4416",
  "pub-65262-android-8892",
  "pub-79956-android-6297",
  "pub-79955-android-5582",
];

const ROTATE_INTERVAL = 30000;

let cursor = 0;
let timer = null;
const listeners = new Set();

function currentKey() {
  return TAPPX_KEYS[cursor % TAPPX_KEYS.length];
}

function notify() {
  const key = currentKey();
  listeners.forEach((fn) => fn(key, cursor));
}

function rotate() {
  cursor = (cursor + 1) % TAPPX_KEYS.length;
  notify();
}

function start() {
  if (timer) return;
  notify();
  timer = setInterval(rotate, ROTATE_INTERVAL);
}

function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function subscribe(fn) {
  listeners.add(fn);
  fn(currentKey(), cursor);
  return () => listeners.delete(fn);
}

function renderSlot(container, key) {
  if (!container) return;
  container.setAttribute("data-tappx-key", key);
  container.setAttribute("data-tappx-network", "tappx");
  container.setAttribute("data-tappx-domain", "tappx.com");
  container.setAttribute("data-tappx-direct", "9f375a07da0318ec");
  container.innerHTML =
    '<div class="tappx-slot" style="min-height:90px;display:flex;align-items:center;justify-content:center;' +
    'background:linear-gradient(135deg,#065f46,#0f766e);color:#d1fae5;border-radius:16px;font-family:sans-serif;' +
    'font-size:12px;letter-spacing:.08em;text-transform:uppercase;">Tappx Ad &middot; ' + key + "</div>";
}

if (typeof window !== "undefined") {
  window.AlHikmahAds = { start, stop, rotate, currentKey, subscribe, renderSlot, TAPPX_KEYS };
}

export { start, stop, rotate, currentKey, subscribe, renderSlot, TAPPX_KEYS };