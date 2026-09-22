# Anshul & Kristin — wedding site

Three full-screen scenes in one page: **home → RSVP → thank you**. No build step.

## Files

- `index.html` — the words, and the Notion form link (`src` on the `<iframe>`).
- `styles.css` — the **KNOBS** block at the top: fonts, sizes, text placement, images, overlay, timing.
- `script.js` — scene switching and the animations' timing. You shouldn't need to touch it.
- `images/home.jpg`, `images/rsvp.jpg`, `images/thanks.jpg` — drop your photos in with these names (or change the paths in the knobs block).

## Try it locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. To check on your phone, open `http://<your-mac's-ip>:8000` on the same Wi-Fi.

## Deploy

Push to `main` and GitHub Pages redeploys: https://kristinyim.github.io/aaky-wedding/
