# xai-course-visual

Интерактивные визуализации для курса по интерпретируемости (XAI).
Странички публикуются через **GitHub Pages** и встраиваются в шаги **Stepik** через `<iframe>`.

Работаем вдвоём + генерирующая модель, поэтому всё в едином стиле.
**Правила — в [STYLE.md](STYLE.md). Прочитай перед добавлением картинки.**

## Структура

```
assets/         общий стиль — токены (цвета, шрифты) и хелперы
  viz.css
  viz.js
density/        тема «плотность»
  two-clusters.ru.html   two-clusters.en.html
  dense-region.ru.html   dense-region.en.html
STYLE.md        как делать картинки в едином стиле
README.md
```

Одна папка = одна тема (`density/`, дальше `attention/`, `shap/` …).
Каждая картинка — в двух языковых версиях: `.ru.html` и `.en.html`.

## Демки (тема density)

- **two-clusters** — что такое плотность точек: слайдер 0→1 сжимает два облака
  (площадь↓ → плотность↑). [ru](density/two-clusters.ru.html) · [en](density/two-clusters.en.html)
- **dense-region** — «плотная область»: перетаскиваемый плотный сгусток на редком
  поле точек. [ru](density/dense-region.ru.html) · [en](density/dense-region.en.html)

## Встраивание в Stepik

Одна ссылка на язык (см. STYLE.md §8):

```html
<iframe src="https://sadsabrina.github.io/xai-course-visual/density/two-clusters.ru.html"
        width="640" height="560" style="border:0;max-width:100%"></iframe>
```

Ссылка обязательно `https`. Перенос/переименование файла меняет URL — поправь iframe в шагах.
