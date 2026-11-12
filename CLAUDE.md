# CLAUDE.md

Personal French-language blog "L{3,4}" by Léo Le Lonquer. Jekyll 4.3 static site built on the "Contrast" theme (public domain), deployed to GitHub Pages at <https://leolelonquer.github.io>.

## Commands

```bash
bundle                      # first run only (if webrick error: bundle add webrick)
./serve.sh                  # = bundle exec jekyll serve --livereload → http://127.0.0.1:4000/
bundle exec jekyll build    # build into _site/ (gitignored)
```

There are no tests. Deploy = push to GitHub: `.github/workflows/jekyll.yml` builds with Ruby 3.1 and publishes on `main`. README suggests `git add . && git commit -m "Blog Update" && git push` (commit messages are typically "Blog Update"). Only commit/push when asked.

## Structure

- `_posts/<category>/YYYY-MM-DD-slug.md` — published posts. Folders: `dev` (Informatique), `notes` (Société), `voyage` (Voyages), `tweets` (Post-it, short notes).
- `_drafts/` — unpublished drafts, plus `idees_article.md` (article ideas checklist). Note `_drafts/README.md` and some `*-examples.md` are theme leftovers, not real drafts. Drafts show locally only with `--drafts`.
- `_templates/` — front-matter skeletons per category (`dev.md`, `note.md`, `tweet.md`, `voyage.md`) and `video.md` (embed snippet). Copy these to start a new post.
- `_layouts/` — `default.html` (shell), `article.html` (post), `paginate.html` (list pages).
- `_includes/` — `admonition.md` (callouts), `embed.html` (16:9 iframe, e.g. YouTube), `article_title.html`, `date.html`, `posts_by_tag.html`.
- `categories/*.md` — list pages using `layout: paginate` with `pagination.category: <name>` (jekyll-paginate-v2). `index.md` lists everything tagged `full_post`.
- `pages/` — about, cv, ressources. `_sass/` + `assets/css` — styles; `assets/katex` — math rendering (`mathjax: true` in config).
- `_config.yml` — site config, navigation menu (Société, Voyages, Informatique, Post-it), permalink `/:categories/:title`, pagination 10/page.
- `.obsidian/` is gitignored/excluded: posts are written in Obsidian, so Obsidian-style Markdown may appear.

## Post conventions

Front matter:

```yaml
---
layout: article
category: notes        # dev | notes | tweets | voyages  (note: folder is `voyage`, category is `voyages`)
tags:
  - full_post          # required for the post to appear on the home page; tweets use `tweets`
title: ...
image: https://...     # optional thumbnail; defaults to /assets/images/thumbnail-default.jpg
---
```

- Write an intro, then `<!--more-->` (the `excerpt_separator`) to mark the excerpt shown in lists.
- Images are mostly hosted externally (ibb.co) and referenced by URL, with an italic caption line right below: `![alt](url)` then `_caption_`.
- Callouts: `{% include admonition.md type="note" title="..." body="..." %}` with types note, abstract, info, tip, success, question, warning, failure, danger, bug, example, quote.
- Video: `{% include embed.html url="https://www.youtube.com/embed/ID" %}`.
- Content is in French; keep the author's informal, personal first-person voice and French typography when editing or writing posts.

## Notes

- Keep the site light (TODO.md: reduce site size, recompress images, no external resources in the theme). The only JavaScript is KaTeX plus the tiny lightbox script: the article ToC and heading anchors are built at build time by `_includes/toc.html` and `_includes/anchor_headings.html` from kramdown GFM ids (GitHub-style, accents kept: `## Cas spécifiques` → `#cas-spécifiques`; write in-post links that way).
- Article images open in a lightbox (`_includes/lightbox.html`, styles in `_sass/lightbox.scss`), built at build time with CSS `:target`: each `<img>` not already inside a link gets wrapped in `#photo-N`, and its caption is the `_italic_` line right below it (otherwise its alt). A small inline script (articles with images only) adds the ← → Échap keys and keeps the Back history clean; everything still works without JS.
- `Gemfile.lock` is gitignored in `.gitignore` yet present locally; don't rely on it.
- Don't edit `UNLICENSE.txt`, `assets/katex`, or `_data/font-awesome` (vendored).
- Ask questions if something is unclear
- Do not add or commit anything