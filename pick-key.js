/**
 * ALHIKMAH - Tappx Ad Rotation Module
 * Rotates Tappx App Keys dynamically across ad slots.
 * Design By ADMIN ALHIKMAH | Copyright 2025 All Application International Islamic
 */
(function (global) {
  "use strict";

  var TAPPX_APP_KEYS = [
    "pub-65263-android-0300",
    "pub-57747-android-0996",
    "pub-60567-android-4416",
    "pub-65262-android-8892",
    "pub-79956-android-6297",
    "pub-79955-android-5582",
  ];

  var TAPPX_ZONE = "36063";
  var TAPPX_HOST = "tappx.com";

  var state = {
    index: 0,
    timer: null,
    slots: [],
  };

  function pickKey() {
    var key = TAPPX_APP_KEYS[state.index % TAPPX_APP_KEYS.length];
    state.index += 1;
    return key;
  }

  function buildSrc(key) {
    return (
      "https://" +
      TAPPX_HOST +
      "/adserver?appkey=" +
      encodeURIComponent(key) +
      "&zone=" +
      encodeURIComponent(TAPPX_ZONE) +
      "&format=auto&ts=" +
      Date.now()
    );
  }

  function collectSlots() {
    state.slots = Array.prototype.slice.call(
      document.querySelectorAll("[data-tappx-slot]")
    );
    return state.slots;
  }

  function renderSlot(slot, key) {
    slot.setAttribute("data-tappx-key", key);
    slot.setAttribute("data-tappx-zone", TAPPX_ZONE);

    var iframe = slot.querySelector("iframe[data-tappx-frame]");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.setAttribute("data-tappx-frame", "1");
      iframe.setAttribute("scrolling", "no");
      iframe.setAttribute("frameborder", "0");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "0";
      iframe.style.display = "block";
      slot.innerHTML = "";
      slot.appendChild(iframe);
    }
    iframe.src = buildSrc(key);
  }

  function rotate() {
    var slots = state.slots.length ? state.slots : collectSlots();
    slots.forEach(function (slot) {
      renderSlot(slot, pickKey());
    });
  }

  function start(intervalMs) {
    stop();
    collectSlots();
    rotate();
    state.timer = global.setInterval(rotate, intervalMs || 8000);
  }

  function stop() {
    if (state.timer) {
      global.clearInterval(state.timer);
      state.timer = null;
    }
  }

  function currentKey() {
    return TAPPX_APP_KEYS[state.index % TAPPX_APP_KEYS.length];
  }

  global.AlHikmahAds = {
    keys: TAPPX_APP_KEYS.slice(),
    zone: TAPPX_ZONE,
    start: start,
    stop: stop,
    rotate: rotate,
    currentKey: currentKey,
  };
})(typeof window !== "undefined" ? window : this);