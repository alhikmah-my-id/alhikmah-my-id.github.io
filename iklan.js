/**
 * iklan.js - ALHIKMAH Tappx Ad Rotation Module
 * Merotasi App Keys Tappx secara dinamis untuk menghindari no-fill.
 */
(function (global) {
  "use strict";

  var TAPPX_KEYS = [
    "pub-65263-android-0300",
    "pub-57747-android-0996",
    "pub-60567-android-4416",
    "pub-65262-android-8892",
    "pub-79956-android-6297",
    "pub-79955-android-5582",
  ];

  var state = { index: 0, lastKey: null, served: 0 };

  function nextKey() {
    var key = TAPPX_KEYS[state.index % TAPPX_KEYS.length];
    state.index += 1;
    state.lastKey = key;
    state.served += 1;
    return key;
  }

  function loadTappx(appKey, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return null;

    container.setAttribute("data-tappx-key", appKey);
    container.innerHTML = "";

    var iframe = document.createElement("iframe");
    iframe.title = "ALHIKMAH Advertisement";
    iframe.style.width = "100%";
    iframe.style.height = "250px";
    iframe.style.border = "0";
    iframe.style.overflow = "hidden";
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("loading", "lazy");
    iframe.src =
      "https://www.tappx.com/adserver/?appkey=" +
      encodeURIComponent(appKey) +
      "&format=banner&size=320x50";

    container.appendChild(iframe);
    return iframe;
  }

  function rotate(containerId) {
    var key = nextKey();
    loadTappx(key, containerId);
    return key;
  }

  function rotateAll() {
    var slots = document.querySelectorAll("[data-tappx-slot]");
    var keys = [];
    for (var i = 0; i < slots.length; i++) {
      keys.push(rotate(slots[i].id));
    }
    return keys;
  }

  function getPool() {
    return TAPPX_KEYS.slice();
  }

  function getState() {
    return { index: state.index, lastKey: state.lastKey, served: state.served };
  }

  function init(intervalMs) {
    rotateAll();
    if (intervalMs && intervalMs > 0) {
      setInterval(rotateAll, intervalMs);
    }
  }

  global.ALHIKMAH_ADS = {
    keys: getPool,
    next: nextKey,
    rotate: rotate,
    rotateAll: rotateAll,
    load: loadTappx,
    state: getState,
    init: init,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      init(60000);
    });
  } else {
    init(60000);
  }
})(typeof window !== "undefined" ? window : this);