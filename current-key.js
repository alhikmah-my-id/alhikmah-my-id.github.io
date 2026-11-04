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

  var keyIndex = 0;

  function currentKey() {
    return TAPPX_KEYS[keyIndex % TAPPX_KEYS.length];
  }

  function rotateKey() {
    keyIndex = (keyIndex + 1) % TAPPX_KEYS.length;
    return currentKey();
  }

  function applyToSlots() {
    var slots = document.querySelectorAll("[data-tappx-slot]");
    var key = currentKey();
    slots.forEach(function (el) {
      el.setAttribute("data-tappx-key", key);
    });
  }

  function start(intervalMs) {
    applyToSlots();
    return setInterval(function () {
      rotateKey();
      applyToSlots();
    }, intervalMs || 8000);
  }

  function stop(timerId) {
    if (timerId) clearInterval(timerId);
  }

  global.AlHikmahAds = {
    TAPPX_KEYS: TAPPX_KEYS,
    currentKey: currentKey,
    rotateKey: rotateKey,
    applyToSlots: applyToSlots,
    start: start,
    stop: stop,
  };
})(window);