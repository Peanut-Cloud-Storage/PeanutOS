# Peanut_Cloud

A fast, fully customizable start page. Static HTML/CSS/JS: no build step, no dependencies.

## Features
- Search bar with selectable engine (Google, DuckDuckGo, Bing, Brave, Startpage, or your own URL with `%s`)
- Quick apps: add, edit, delete, drag to reorder; emoji, image URL or auto favicon
- Command palette: `Ctrl+Y` or `Ctrl+K` (`/` focuses search)
- Settings: name, fonts, colors, columns, tile size, corner radius, background image, dim/blur, clock, custom CSS
- Export / import / reset settings as JSON
- Everything is saved in the browser's `localStorage`

## Run locally
```
python3 -m http.server 8080
```

## Deploy (anywhere except GitHub Pages)
- **Netlify / Cloudflare Pages / Vercel:** connect this repo, no build command, output directory `.`
- **S3 + CloudFront, any web host:** upload `index.html`, `style.css`, `app.js`
- **Docker / VPS:** `docker build -t peanut-cloud . && docker run -p 80:80 peanut-cloud`

## Defaults
Edit the `D` object near the top of `app.js` to change the default name, colors and apps.
