// Three scenes in one page: home → rsvp → thanks.
// The URL hash tracks the scene so refresh and the back button behave.
(function () {
  const scenes = Array.from(document.querySelectorAll(".scene"));
  const byName = Object.fromEntries(scenes.map((s) => [s.dataset.scene, s]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const leaveMs = reduceMotion ? 0 : cssMs("--leave", 550);
  let current = null;
  let busy = false;

  function cssMs(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const n = parseFloat(v);
    return Number.isNaN(n) ? fallback : v.endsWith("ms") ? n : n * 1000;
  }

  function sceneFromHash() {
    const name = location.hash.replace(/^#\/?/, "");
    return byName[name] ? name : "home";
  }

  function show(name, { animate = true } = {}) {
    const next = byName[name];
    if (!next || next === current || busy) return;
    busy = true;

    const prev = current;
    current = next;

    const reveal = () => {
      if (prev) {
        prev.classList.remove("is-leaving");
        prev.hidden = true;
      }
      next.hidden = false;
      next.classList.toggle("is-entering", animate && !reduceMotion);
      next.querySelector(".content")?.scrollTo?.(0, 0);
      const onEnd = (e) => {
        if (!e.target.classList.contains("content")) return; // bg ends first
        next.classList.remove("is-entering");
        next.removeEventListener("animationend", onEnd);
      };
      next.addEventListener("animationend", onEnd);
      busy = false;
      // If the hash moved while we were animating, catch up.
      if (sceneFromHash() !== current.dataset.scene) show(sceneFromHash());
    };

    if (prev && animate && !reduceMotion) {
      prev.classList.add("is-leaving");
      setTimeout(reveal, leaveMs);
    } else {
      reveal();
    }
  }

  // Buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-go]");
    if (!btn) return;
    location.hash = "/" + btn.dataset.go;
  });

  // Hash → scene (covers buttons, back/forward, and typed URLs)
  window.addEventListener("hashchange", () => show(sceneFromHash()));

  // First paint
  show(sceneFromHash(), { animate: false });
})();
