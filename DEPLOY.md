# Deploy to girishanamala.tech (GitHub Pages)

## 0. Domain panel (do these first)
- [ ] Verify the registrant email ("Resend Email" on the Overview tab). Unverified .tech domains get suspended.
- [ ] Turn on Auto-Renew, or set a reminder before **Sep 25, 2027**.

## 1. Create the repo
- [ ] On GitHub: **New repository** → name it `portfolio` → **Public** → Create.
- [ ] Click **uploading an existing file** and drag in everything *inside* this folder, so `index.html` sits at the top level of the repo.
  - Upload: `index.html`, `CNAME`, `.nojekyll`, `README.md`, `css/`, `js/`, `assets/`
  - Skip: `server.ps1`, `DEPLOY.md` (optional)
  - `.nojekyll` is hidden in File Explorer. Turn on **View → Show → Hidden items** to see and drag it.
- [ ] **Commit changes.**

> The repo name doesn't matter. If you name it something other than `portfolio`, add that name to `exclude` in `js/content.js` (or add the topic `hide-from-portfolio` to the repo) so it doesn't show in "Fresh from GitHub".

## 2. Turn on Pages
- [ ] Repo → **Settings → Pages**
- [ ] Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)` → **Save**

## 3. Point the domain at GitHub (DNS tab of your domain panel)
Delete any existing parking/default **A** or **CNAME** records for `@` and `www`, then add:

| Type  | Host / Name | Value                    |
|-------|-------------|--------------------------|
| A     | @           | 185.199.108.153          |
| A     | @           | 185.199.109.153          |
| A     | @           | 185.199.110.153          |
| A     | @           | 185.199.111.153          |
| CNAME | www         | girisha1908.github.io    |

TTL: leave the default (or 3600).

## 4. Connect the custom domain
- [ ] Repo → **Settings → Pages → Custom domain**: `girishanamala.tech` → **Save**
  (the `CNAME` file in the repo already sets this; this step just confirms it)
- [ ] Wait for the green **DNS check successful** (minutes to a few hours).
- [ ] Tick **Enforce HTTPS** (it can take up to an hour to become clickable).

## 5. Check it
- [ ] https://girishanamala.tech loads, and https://www.girishanamala.tech redirects to it.
- [ ] The intro plays (add `?intro` to replay it), the bubbles open, and the PDFs and certificates open.
- [ ] "Fresh from GitHub" lists your repos.

## Updating later
Edit files → upload/commit them to the same repo (or `git push`). The live site updates in about a minute.

## If something's off
- **404 on the domain:** Pages source isn't set to `main` / root, or `index.html` isn't at the top level.
- **DNS check fails:** old parking records are still there, or DNS hasn't propagated yet (wait, then Save the domain again).
- **"Not secure":** HTTPS isn't enforced yet. Wait for the certificate, then tick Enforce HTTPS.

---

# Option B: Netlify

A domain can only point to **one** host. Pick which one owns `girishanamala.tech`:
- **Netlify owns the domain:** follow B1–B3, and **skip step 3 (DNS) of the GitHub Pages guide above**. GitHub still stores the code.
- **GitHub Pages owns the domain:** do only B1–B2. Netlify then serves a backup copy at `your-name.netlify.app`.

## B1. Connect the repo (auto-deploys on every push)
- [ ] Push the site to GitHub first (steps 1 above).
- [ ] Go to app.netlify.com → **Add new site → Import an existing project → GitHub** → allow access → pick the `portfolio` repo.
- [ ] Build settings: leave **Build command empty**, **Publish directory = `.`**. (`netlify.toml` already sets this.)
- [ ] **Deploy.** You get a URL like `random-name-123.netlify.app`.
- [ ] Site configuration → **Change site name** → e.g. `girishanamala` → `girishanamala.netlify.app`.

**No-GitHub shortcut:** app.netlify.com/drop, drag the `portfolio-site` folder onto the page. This is live instantly, but it won't auto-update when you push.

## B2. Check it
- [ ] `https://girishanamala.netlify.app` loads, the intro plays, and the PDFs open.

## B3. Custom domain on Netlify (only if Netlify owns the domain)
- [ ] Netlify → **Domain management → Add a domain** → `girishanamala.tech` → Verify → Add.
- [ ] In your domain panel's **DNS** tab, delete the GitHub A/CNAME records (if you added them) and any parking records, then add:

| Type  | Host / Name | Value                         |
|-------|-------------|-------------------------------|
| A     | @           | 75.2.60.5                     |
| CNAME | www         | girishanamala.netlify.app     |

- [ ] Back in Netlify, wait for **DNS verified**. HTTPS (Let's Encrypt) is issued automatically, usually within an hour.
- [ ] If you're not using GitHub Pages any more: repo → Settings → Pages → **Unpublish**, and delete the `CNAME` file from the repo.

## Updating
Commit/push to the repo, and Netlify redeploys in about 30 seconds. Every deploy is listed under **Deploys**, and you can roll back with one click.
