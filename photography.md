---
layout: default
title: Photography
permalink: /photography/
body_class: photos-page
---

<div class="roll" tabindex="0" aria-label="Photo roll">
  <div class="roll-stage">
{%- assign exts = ".jpg.jpeg.png.gif.webp.avif" -%}
{%- assign photos = site.static_files | where_exp: "f", "f.path contains 'images/photography/'" | sort: "name" -%}
{%- for photo in photos -%}
{%- assign ext = photo.extname | downcase -%}
{%- if exts contains ext -%}
<figure class="frame"><img src="{{ photo.path | relative_url }}" alt="{{ photo.basename | replace: '-', ' ' | replace: '_', ' ' }}" draggable="false"></figure>
{%- endif -%}
{%- endfor -%}
  </div>
  <button class="roll-nav prev" type="button" aria-label="Previous photo">‹</button>
  <button class="roll-nav next" type="button" aria-label="Next photo">›</button>
</div>

<nav>
  <a href="{{ '/' | relative_url }}">← Home</a>
</nav>
