# STYLE — how to build visuals in one consistent style

This file is the rulebook for everyone who adds interactive visuals to the repo:
humans (Sabrina, collaborator) and the generating model (Claude etc.). The goal —
any two visuals should read as one system: same font, same colors, same layout,
light and dark themes out of the box.

Rule #1: **no hex colors or px sizes inside a visual.** Everything comes from the
tokens in `assets/viz.css`. Then the style changes in one place, not across 40 files.

---

## 1. Structure and naming

```
xai-course-visual/
├── assets/
│   ├── viz.css        ← tokens (colors, fonts) + demo skeleton
│   └── viz.js         ← helpers (canvas, gauss, points)
├── density/           ← folder = TOPIC (density, attention, shap, saliency …)
│   ├── two-clusters.ru.html
│   ├── two-clusters.en.html
│   ├── dense-region.ru.html
│   └── dense-region.en.html
├── STYLE.md
└── README.md
```

- One folder = one topic. Don't put files in the root.
- Folders **may nest** (topic/method, e.g. `nonlinear_interpretable_models/DBSCAN/`).
- Names in Latin, no spaces, `kebab-case`.
- **Language as a suffix:** `<name>.ru.html` and `<name>.en.html`.
- **Link assets by the absolute Pages path** `/xai-course-visual/assets/viz.css`
  (and `…/viz.js`), **not** `../assets/…`. Absolute works at any nesting depth; a
  relative `../` breaks the moment a file sits one level deeper than expected.

## 2. Two language versions

One visual = **two files**, `.ru.html` and `.en.html`. They differ in **text only**
(title, caption, legend, `<title>`, `lang="ru|en"`). All logic, numbers, colors, and
layout are identical. When you change logic — change **both** files (the price of the
"two files" choice; keep them from drifting apart).

## 3. Anatomy of a visual (skeleton)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>…</title>
  <link rel="stylesheet" href="/xai-course-visual/assets/viz.css">
</head>
<body class="viz" data-palette="density">
  <div class="viz-head">
    <h3>Title (optional)</h3>
    <p>Short caption — what to do and what is shown (optional).</p>
  </div>

  <div class="viz-stage"><canvas id="c"></canvas></div>

  <div class="viz-controls">
    <!-- sliders / legend -->
  </div>

  <script src="/xai-course-visual/assets/viz.js"></script>
  <script> /* visual logic via VIZ.* */ </script>
</body>
</html>
```

Ready-made classes (don't invent your own): `viz-head`, `viz-stage` (add `grab` for
dragging), `viz-controls`, `viz-row`, `viz-label`, `viz-val`, `viz-legend`.

`VIZ` helpers (see `assets/viz.js`):
- `VIZ.mount(canvas, draw)` — sets up the retina canvas, resize and **redraw on theme change**; returns `{ redraw() }`. `draw(ctx, W, H)` gets sizes in CSS pixels.
- `VIZ.css('--s1')` — read a color token (always take colors from here).
- `VIZ.gaussian()` — a standard normal number (Gaussian point clouds).
- `VIZ.cloud(ctx, cx, cy, offs, spread, color, dot)` — a Gaussian blob.
- `VIZ.scatter(ctx, pts, W, H, color, dot)` — points across the field (`pts` in [0..1]).
- `VIZ.region(ctx, x, y, r, hue)` — region: soft fill + crisp dashed boundary circle.

The `data-palette` attribute on `<body>` selects the method's palette (see §4).

After changing state (slider, dragging) call `view.redraw()`.

## 4. Color — by role, not "by eye"

Aesthetic: **white, minimalist** — a white card with a light shadow, plenty of air.
The data region is a soft fill + a **crisp dashed boundary circle** (`VIZ.region`);
data colors are saturated (contrast); background points are neutral.

**The palette is chosen per method** — via the `data-palette` attribute on `<body>`.
`--s1`/`--s2` are substituted automatically (in both light and dark themes):

**Blue `#2a78d6` is the anchor color of the system:** it is `--s1` in EVERY palette
(pairs with the white background, keeps a unified look). Only the second color `--s2`
changes per method.

| `data-palette` | `--s1` (anchor) | `--s2` | meaning |
|---|---|---|---|
| `density` (default) | blue `#2a78d6` | orange `#eb6834` | two categories / clusters |
| `shap` | blue `#2a78d6` | red `#d9564e` | diverging − ↔ + (feature contribution) |
| `lime` | blue `#2a78d6` | green `#2f9e5f` | its own, to not clash with SHAP |

(dark theme uses its own steps of the same colors, within the valid lightness band; see `viz.css`.)

**How to add a new method color:** keep the blue anchor, pick `--s2` so it **pairs with
white and blue** and stays minimalist/soft; then **run the validator** (§7) in light and
dark and add a `data-palette` slot in `viz.css`.

| Token | Role | Where it's allowed |
|---|---|---|
| `--s1`, `--s2` | **data** colors | only data points / marks / halos |
| `--accent` | soft indigo accent | slider, region "marker" — **not data** |
| `--dot` | neutral "background/other" points | background that carries no series meaning |
| `--ink` / `--ink-2` / `--muted` | **text** | title / caption / faint |
| `--line` | thin borders | stage frame, hairline |
| `--surface` / `--plane` | surfaces | stage / page background |

Rules:
- **Never color text with a series color** — only `--ink/--ink-2/--muted`.
- Need a new method/palette → **add a slot in `viz.css`** (a `data-palette` block),
  don't hardcode hex in the visual. More than two categories — next slot per the dataviz guide.
- Series identity is **not color alone**: a legend (`viz-legend`) with a text label
  is always next to it. So it reads in grayscale and under color blindness.
- All palettes are checked with the validator for color blindness and contrast (light + dark).
  Change/add a color — re-run it (see §7).

## 5. Font — fixed

Typeface — **Manrope** (light, elegant; Cyrillic + Latin), loaded via `@import` in
`viz.css`, weights 300/400/500/600/700. Token `--font`, fallback — the system sans.
Title is **bold** (`font-weight:700`); caption/text is regular (`400`) and **black**
(`--ink`), not bold. Sizes **only** from tokens, no px in visuals:

- `--fs-title` 23px — `h1` title (bold)
- `--fs-body` 18px — body text and the caption under the title
- `--fs-label` 16px — legend, control labels
- `--fs-value` 20px — numeric values (with `tabular-nums`)

Change the typeface/size — **only** in `viz.css`, and it changes everywhere at once.

## 6. Theme (light/dark)

The theme switches automatically by the OS setting (`prefers-color-scheme`) — thanks to
tokens you don't need to do anything in the visual, just use `var(--…)` and `VIZ.css()`
(the canvas repaints itself). **Check both themes** before committing.

## 7. Palette validation (when you touch colors)

Run the validator from the dataviz guide on the new set of data colors, light and dark:
```
node scripts/validate_palette.js "#hex,#hex" --mode light
node scripts/validate_palette.js "#hex,#hex" --mode dark
```
It must say `ALL CHECKS PASS`. Color-blind safety is not judged by eye.

## 8. Embedding in Stepik

Stepik strips `<script>` from a step's HTML editor → embed the interactive **via an iframe**
(an external page on GitHub Pages; scripts run inside it). One URL per language:

```html
<iframe src="https://sadsabrina.github.io/xai-course-visual/density/two-clusters.en.html"
        width="640" height="560" style="border:0;max-width:100%"></iframe>
```

- The URL must be `https` (otherwise mixed content is blocked).
- Moving/renaming a file changes its URL → fix the iframe in steps you already embedded.
- In the Stepik mobile app an iframe isn't always responsive — check the height.

Step-by-step template with a copy-paste snippet: **[EMBED.md](EMBED.md)**.

## 9. Pre-commit checklist

- [ ] File in a topic folder, `kebab-case` name, language suffix `.ru/.en`.
- [ ] Both language versions exist and differ in text only.
- [ ] No hex/px in the visual — everything via `var(--…)` / `VIZ.css()` and font tokens.
- [ ] Assets linked by the **absolute** path `/xai-course-visual/assets/…`, not `../`.
- [ ] Colors by role: data — `--s1/--s2`, text — `--ink*`, accent — `--accent`.
- [ ] A legend with text labels exists (identity not by color alone).
- [ ] Checked in light and dark theme; doesn't break on a narrow screen.
- [ ] If you changed colors — validator says `ALL CHECKS PASS` (light + dark).

## 10. Note for the generating model

When asked to "make a visual for the course": put it in a topic folder, produce both
`.ru` and `.en` at once, link assets by the **absolute** path
`/xai-course-visual/assets/viz.css` and `…/viz.js` (never `../assets/…`), use the
`viz-*` classes and the `VIZ.*` helpers, colors only from tokens by role from §4, font
sizes from tokens in §5, hardcode nothing. Before delivering — render it and look at it
in both themes.
