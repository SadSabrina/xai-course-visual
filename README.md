# xai-course-visual

Interactive visualizations for the interpretability (XAI) course.
Pages are published via **GitHub Pages** and embedded through an `<iframe>` into course steps
on **Stepik** and on the course site [ai-interpretability.school](https://ai-interpretability.school).

We work as a team (two people + a generating model), so everything follows one style.
**Rules are in [STYLE.md](STYLE.md). Read it before adding a visual.**

## Structure

```
assets/                          shared style — tokens (colors, fonts) and helpers
  viz.css
  viz.js
nonlinear_interpretable_models/  block "Nonlinear interpretable models"
  DBSCAN/    cluster, dense-region, point-types
  HDBSCAN/   hdbscan-steps, mst
model_agnostic_posthoc/          block "Classic methods" (model-agnostic, post-hoc)
  anchors/   counterfactuals/   lime/   permutation/   shap/
interpretability_cnn/            block "CNN-based models"
  bilinear/  channels/  receptive-field/
EMBED.md        copy-paste iframe template
STYLE.md        how to build visuals in one consistent style
README.md
```

One folder = one course block, one subfolder = one method or topic.
Each visual comes in two language versions: `<name>.ru.html` and `<name>.en.html`.

## Example (DBSCAN)

- **dense-region** — a "dense region": a draggable dense blob over a sparse field of
  points. [ru](nonlinear_interpretable_models/DBSCAN/dense-region.ru.html) ·
  [en](nonlinear_interpretable_models/DBSCAN/dense-region.en.html)
- **point-types** — DBSCAN point types.
  [ru](nonlinear_interpretable_models/DBSCAN/point-types.ru.html) ·
  [en](nonlinear_interpretable_models/DBSCAN/point-types.en.html)

## Embedding in a step

Step-by-step template with a copy-paste snippet: **[EMBED.md](EMBED.md)**.
One URL per language:

```html
<iframe src="https://sadsabrina.github.io/xai-course-visual/nonlinear_interpretable_models/DBSCAN/dense-region.en.html"
        width="640" height="560" style="border:0;max-width:100%"></iframe>
```

The URL must be `https`. Moving/renaming a file changes its URL — fix the iframe in your steps.
