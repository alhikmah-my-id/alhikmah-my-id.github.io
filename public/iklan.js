(function () {
  "use strict";

  var TAPPX_KEYS = [
    "pub-65263-android-0300",
    "pub-57747-android-0996",
    "pub-60567-android-4416",
    "pub-65262-android-8892",
    "pub-79956-android-6297",
    "pub-79955-android-5582"
  ];

  var ROTATE_MS = 8000;
  var index = 0;

  function nextKey() {
    var key = TAPPX_KEYS[index % TAPPX_KEYS.length];
    index++;
    return key;
  }

  function renderSlot(slot) {
    var key = nextKey();
    slot.setAttribute("data-tappx-key", key);
    slot.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;' +
      'padding:10px 14px;border:1px solid #fcd34d;border-radius:12px;' +
      'background:linear-gradient(90deg,#fffbeb,#fff7ed);font-family:system-ui,sans-serif;">' +
      '<span style="font-size:11px;font-weight:700;color:#fff;background:#f59e0b;' +
      'padding:2px 8px;border-radius:999px;">AD</span>' +
      '<span style="font-size:12px;color:#78350f;flex:1;overflow:hidden;text-overflow:ellipsis;' +
      'white-space:nowrap;">Tappx · ' + slot.getAttribute("data-slot") + " · " + key + "</span>" +
      '<button style="font-size:12px;padding:4px 10px;border:1px solid #fcd34d;' +
      'border-radius:8px;background:#fff;color:#92400e;cursor:pointer;">Buka</button>' +
      "</div>";
  }

  function init() {
    var slots = document.querySelectorAll("[data-tappx-slot]");
    if (!slots.length) return;
    slots.forEach(renderSlot);
    setInterval(function () {
      slots.forEach(renderSlot);
    }, ROTATE_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.AlHikmahAds = {
    nextKey: nextKey,
    pool: TAPPX_KEYS.slice()
  };
})();