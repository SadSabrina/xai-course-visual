# EMBED — how to put a visual into a Stepik step

Stepik strips `<script>` from a step's HTML editor, so an interactive can't live in the
step directly. Instead we host the page on GitHub Pages and pull it in with an `<iframe>`.
Scripts run inside the iframe because it's a separate external page.

## The template (copy, fill 3 blanks)

```html
<iframe src="https://sadsabrina.github.io/xai-course-visual/TOPIC/NAME.LANG.html"
        width="640" height="560" style="border:0;max-width:100%"></iframe>
```

Fill in:
- `TOPIC` — the topic folder, e.g. `density`
- `NAME` — the file name, e.g. `two-clusters`
- `LANG` — `ru` or `en`

## Steps in Stepik

1. Open the lesson and add (or edit) a **Text** step.
2. In the text editor toolbar, switch to the **HTML / source** mode (the `</>` button,
   or "Source code" / "Код").
3. Paste the `<iframe>` from the template.
4. Turn source mode off and **Save**. The visual renders inside the step.

## Ready examples

```html
<!-- two-clusters (RU) -->
<iframe src="https://sadsabrina.github.io/xai-course-visual/density/two-clusters.ru.html"
        width="640" height="560" style="border:0;max-width:100%"></iframe>

<!-- two-clusters (EN) -->
<iframe src="https://sadsabrina.github.io/xai-course-visual/density/two-clusters.en.html"
        width="640" height="560" style="border:0;max-width:100%"></iframe>

<!-- dense-region (RU) -->
<iframe src="https://sadsabrina.github.io/xai-course-visual/density/dense-region.ru.html"
        width="640" height="560" style="border:0;max-width:100%"></iframe>
```

## Notes

- The URL **must be `https`** — an `http` iframe is blocked as mixed content.
- **One iframe per language** — use the `.ru` URL in the Russian course, `.en` in the English one.
- Adjust `width` / `height` to the visual; `max-width:100%` keeps it from overflowing.
- **Updating content:** edit the file in this repo and push — the URL stays the same, so
  Stepik picks up the new version automatically. No need to touch the step.
- **Renaming / moving a file changes its URL** → update the iframe in any step that used it.
- In the Stepik **mobile app** an iframe isn't always responsive — check the height on a phone.
