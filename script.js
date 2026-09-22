// Countdown to the wedding day. The date comes from the <time datetime> in the hero,
// so there's exactly one place to change it.
(function () {
  const timeEl = document.getElementById("wedding-date-display");
  const out = document.getElementById("countdown");
  if (!timeEl || !out) return;

  // Treat the date as local noon so the count doesn't flip a day early or late
  // depending on the visitor's timezone.
  const target = new Date(timeEl.getAttribute("datetime") + "T12:00:00");
  if (Number.isNaN(target.getTime())) return;

  function render() {
    const now = new Date();
    const days = Math.ceil((target - now) / 86_400_000);
    if (days > 1) out.textContent = `${days} days to go`;
    else if (days === 1) out.textContent = "Tomorrow!";
    else if (days === 0) out.textContent = "It's today!";
    else out.textContent = "We did it — thank you for celebrating with us.";
  }

  render();
  setInterval(render, 60 * 60 * 1000);
})();
