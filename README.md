# xai-course-visual

Interactive visualizations for the interpretability (XAI) course.
Pages are published via **GitHub Pages** and embedded into **Stepik** steps through an `<iframe>`.

We work as a team (two people + a generating model), so everything follows one style.
**Rules are in [STYLE.md](STYLE.md). Read it before adding a visual.**

## Structure

```
assets/         shared style — tokens (colors, fonts) and helpers
  viz.css
  viz.js
density/        "density" topic
  two-clusters.ru.html   two-clusters.en.html
  dense-region.ru.html   dense-region.en.html
STYLE.md        how to build visuals in one consistent style
README.md
```

One folder = one topic (`density/`, then `attention/`, `shap/` …).
Each visual comes in two language versions: `.ru.html` and `.en.html`.

## Demos (density topic)

- **two-clusters** — what point density is: a 0→1 slider squeezes two clouds
  (area↓ → density↑). [ru](density/two-clusters.ru.html) · [en](density/two-clusters.en.html)
- **dense-region** — a "dense region": a draggable dense blob over a sparse field of
  points. [ru](density/dense-region.ru.html) · [en](density/dense-region.en.html)

## Embedding in Stepik

One URL per language (see STYLE.md §8):

```html
<iframe src="https://sadsabrina.github.io/xai-course-visual/density/two-clusters.en.html"
        width="640" height="560" style="border:0;max-width:100%"></iframe>
```

The URL must be `https`. Moving/renaming a file changes its URL — fix the iframe in your steps.
