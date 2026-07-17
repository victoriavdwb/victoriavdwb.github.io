---
layout: default
title: Photography
permalink: /photography/
body_class: gallery-page
---

# Photography 🌿

<p class="muted">A short intro to your photography goes here — replace this with whatever you like.</p>

<div class="gallery pre-js">
{% assign exts = ".jpg.jpeg.png.gif.webp.avif" %}
{% assign photos = site.static_files | where_exp: "f", "f.path contains 'images/photography/'" | sort: "name" %}
{% for photo in photos %}
  {% assign ext = photo.extname | downcase %}
  {% if exts contains ext %}
  <a class="shot" href="{{ photo.path | relative_url }}">
    <img src="{{ photo.path | relative_url }}" alt="{{ photo.basename | replace: '-', ' ' | replace: '_', ' ' }}" loading="lazy">
  </a>
  {% endif %}
{% endfor %}
</div>

<nav>
  <a href="{{ '/' | relative_url }}">← Home</a>
</nav>
