# Girisha Anamala — Portfolio

🌐 **Live Site**: [https://girishanamala.tech](https://girishanamala.tech)

## Run it Locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000     # then open http://localhost:8000
```

## Update Content

Everything lives in **`js/content.js`** (`window.PROFILE`):

| What | Field |
|---|---|
| Email | `PROFILE.email` |
| Resume PDF | `PROFILE.resumeUrl` (set `""` to hide every Resume link) — replace `assets/Girisha-Anamala-Resume.pdf` with your latest |
| GitHub / LinkedIn | `PROFILE.links` |
| Projects (pills, folders, case studies, "Selected work") | `PROFILE.projects` |
| Loader greetings | `PROFILE.greetings` (text, lang, script) |
| Commit pages (every node opens one) | `PROFILE.pages.<node>.blocks` — block types are listed at the top of `content.js` |

### GitHub Auto-Feed

New public repos appear automatically in "Fresh from GitHub" (Work section and the selected work page). Settings live in `PROFILE.github`:

- `mode: "auto"` shows every public, non-fork repo that has a description. `mode: "topic"` shows only repos tagged `portfolio`.
- Hide a repo by adding the topic `hide-from-portfolio` on GitHub, or by adding its name to `exclude`.
- The hand-written projects are skipped automatically, so nothing appears twice.
- Results are cached in the visitor's browser for an hour. If GitHub can't be reached, the section stays hidden.

### Learning Log & Articles (Obsidian)

The learning log and ink & articles pages are written in Obsidian. `notes/` is an Obsidian vault:

```
notes/
  learning-log/   one note per entry (type: now | done | til)
  ink/            one note per article (the note body is the article)
  media/          images (pasted images land here automatically)
  templates/      "learning-log" and "article" templates
```

- Only notes with `published: true` go on the site. Unpublished articles show as "draft · coming soon" (add `hidden: true` to hide one completely, and `order: 1`, `2`… to sort them).
- Obsidian extras that work: `[[links]]` between articles, `![[pasted images]]`, `==highlights==`, `> [!tip]` callouts, tables, code blocks, `%% comments %%` (stripped).
- On every push, the GitHub Action (`.github/workflows/deploy.yml`) runs `scripts/build-notes.mjs`, which turns the vault into `data/notes.json` + `data/media/`, and deploys the site. The vault itself is not published to the site.
- Preview locally: `npm install` once, then `npm run notes` and serve the folder.
- Articles have shareable links: `https://girishanamala.tech/#ink/<file-name>`.

> The repo is public, so unpublished drafts in `notes/` can still be read on GitHub. Keep private drafts in another vault until they're ready.

### Intro Loader

Plays once per browser session ("hi" in each language, then "hi, i'm girisha."). Add `?intro` to the URL to replay it. Skip with the button, Esc, Enter or Space. Reduced-motion users get a short static version.

## Project Structure

```
index.html          markup (hero graph nodes, sections, dialogs)
css/styles.css      all styles, one source of truth per component
js/content.js       PROFILE — all copy and links
js/main.js          graph scaling + replay, marquee, dialogs, archive box
assets/             my-works-box.png, resume, certificates, photos, bundled fonts
notes/              Obsidian vault: learning log + articles (not published as-is)
scripts/            build-notes.mjs: vault → data/notes.json
data/               generated notes.json + media (rebuilt on every deploy)
.github/workflows/  deploy.yml: build notes + deploy to GitHub Pages
```

## Fonts

Inter, JetBrains Mono, Noto Sans Devanagari/Telugu and a Plus Jakarta Sans fallback are bundled in `assets/fonts`. Satoshi loads from Fontshare; if it's unavailable, Plus Jakarta Sans is used.

Design inspired by ui.debbie's portfolio prompts.
