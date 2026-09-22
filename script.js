// Three scenes in one page: home → rsvp → thanks.
// The URL hash tracks the scene so refresh and the back button behave.
(function () {
  const scenes = Array.from(document.querySelectorAll(".scene"));
  const byName = Object.fromEntries(scenes.map((s) => [s.dataset.scene, s]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = null;
  let busy = false;

  function sceneFromHash() {
    const name = location.hash.replace(/^#\/?/, "");
    return byName[name] ? name : "home";
  }

  // Resolves when every CSS animation currently running inside `el` has finished
  // (pieces are staggered, so we wait for the last one). Falls back to a timer.
  function whenSettled(el, fallbackMs) {
    const anims = el.getAnimations({ subtree: true });
    const all = Promise.all(anims.map((a) => a.finished.catch(() => {})));
    const timeout = new Promise((r) => setTimeout(r, fallbackMs));
    return Promise.race([all, timeout]);
  }

  function show(name, { animate = true } = {}) {
    const next = byName[name];
    if (!next || next === current || busy) return;
    busy = true;

    const prev = current;
    const animated = animate && !reduceMotion;
    current = next;

    const reveal = () => {
      if (prev) {
        prev.classList.remove("is-leaving");
        prev.hidden = true;
      }
      next.hidden = false;
      next.querySelector(".content")?.scrollTo?.(0, 0);
      if (animated) {
        next.classList.add("is-entering");
        whenSettled(next, 3000).then(() => next.classList.remove("is-entering"));
      }
      busy = false;
      // If the hash moved while we were animating, catch up.
      if (sceneFromHash() !== current.dataset.scene) show(sceneFromHash());
    };

    if (prev && animated) {
      prev.classList.add("is-leaving");
      whenSettled(prev, 3000).then(reveal);
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
