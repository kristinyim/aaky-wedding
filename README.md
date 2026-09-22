# Aaky's wedding website

A single-page static site. No build step, no dependencies.

## Files

- `index.html` — all the content. Search for `TODO` and the placeholder text (names, date, venues, links).
- `styles.css` — colors and fonts live in the `:root` block at the top.
- `script.js` — the countdown. It reads the date from the `<time datetime>` in the hero, so change it there only.
- `.github/workflows/deploy.yml` — deploys `main` to GitHub Pages on every push.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Deploy

Push to `main`. In the repo settings, set **Pages → Source** to **GitHub Actions** once, and the workflow does the rest.
