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

### Intro Loader

Plays once per browser session ("hi" in each language, then "hi, i'm girisha."). Add `?intro` to the URL to replay it. Skip with the button, Esc, Enter or Space. Reduced-motion users get a short static version.

## Project Structure

```
index.html          markup (hero graph nodes, sections, dialogs)
css/styles.css      all styles, one source of truth per component
js/content.js       PROFILE — all copy and links
js/main.js          graph scaling + replay, marquee, dialogs, archive box
assets/             my-works-box.png, resume, bundled fonts
```

## Fonts

Inter, JetBrains Mono and Instrument Serif are bundled in `assets/fonts`. Satoshi loads from Fontshare; if it's unavailable, a bundled Plus Jakarta Sans fallback is used.

Design inspired by ui.debbie's portfolio prompts.
