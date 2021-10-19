---
title: Build a Pinterest Layout using HTML & CSS
arthur: An Object Is A
excerpt: Using a few simple lines of CSS, create Pinterest’s Pin layout
cover_image: https://miro.medium.com/max/1400/0*uJm3JIELUXuvlGv_.png
source: https://javascript.plainenglish.io/build-a-pinterest-layout-using-html-css-a30ab59ce137
---

# Let’s start by declaring some CSS variables.

## In our CSS

```css
:root {
  --card_width: 250px;
  --row_increment: 10px;
  --card_border_radius: 16px;
  --card_small: 26;
  --card_med: 33;
  --card_large: 45;
}
```

**Note:**

- card_width: 250px — the width of our card/pin
- row_increment: 10px — we are using a CSS **GRID** to build our layout; technically, each card is made up of multiple **10px** increments **for the rows; not columns**
- card_border_radius: 16px — used to round the card’s edges
- card_small: 26 — a small card is made up of **10px** * **26 increments (**with the margins included: 230 x 230)
- card_medium: 33 — a medium card is made up of **10px** * **33 increments** (with the margins included: 230 x 300)
- card_large: 45 — a large card is made up of **10px** * **45 increments** (with the margins included: 230 x 420)

# With our variables set

## Let’s write the HTML tree, then back to our CSS.

```html
<div class=”pin_container”>
 <div class=”card card_small”></div>
 <div class=”card card_medium”></div>
 <div class=”card card_large”></div>
</div>
```

**Note:**
Every card has the class **card** and a size.

## The container is what powers our entire layout.

```css
.pin_container {
 margin: 0;
 padding: 0;
 width: 80vw;
 position: absolute;
 left: 50%;
 transform: translateX(-50%);display: grid;
 grid-template-columns: repeat(auto-fill, var(--card_width));
 grid-auto-rows: var(--row_increment);
 justify-content: center;background-color: black;
}
```

**Note:**

- **margin** — simply used to normalize our container
- **padding** — simply used to normalize our container
- **width** — this boundary will determine how many cards are displayed horizontally, before they wrap around to the next row; higher width = wider layout
- **display** — using a **CSS grid**
- **grid-template-columns** — each card’s column has a **width** AND this **repeats** to **auto fill** till the end of our container’s width; if the next card would overlap the width of our container, then that card starts on the next row
- **grid-auto-rows** — each new row has a height of **10px**
- **position** — simply used to center our entire layout; you can position anywhere you want
- **left** — simply used to center our entire layout; you can position anywhere you want
- **transform** — simply used to center our entire layout; you can position anywhere you want
- **justify-content** — used to center ALL of the cards in the center of the container
- **background-color** — simply used for a color contrast

## Each card simply has a margin and border radius.

```css
.card {
 padding: 0;
 margin: 15px 10px;
 border-radius: var(--card_border_radius);
 background-color: red;
}
```

## You have the basic layout ready-to-go. Just insert whatever you want in those cards.

You can get the source file [here](https://github.com/an-object-is-a/html-css-js-pinterest-layout).

If you would like a more in-depth guide, check out my full video tutorial on YouTube, [**An Object Is A**](https://www.youtube.com/c/anobjectisa).

Be sure to follow us on [**Instagram**](https://www.instagram.com/an_object_is_a/) and [**Twitter**](https://twitter.com/anobjectisa1) to keep up with our latest **Web Development tutorials**.

## Build a Pinterest Layout using HTML & CSS