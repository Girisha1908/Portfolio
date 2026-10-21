#!/usr/bin/env node
/* Build data/notes.json from the Obsidian vault in notes/.
 *
 *   notes/learning-log/*.md  → learning log entries
 *   notes/ink/*.md           → articles (ink & articles page)
 *   notes/media/*            → images (only the ones published notes use are copied to data/media/)
 *
 * Only notes with `published: true` are exported in full. Unpublished articles are
 * exported as title-only "coming soon" teasers unless they set `hidden: true`.
 *
 * Run locally:  npm install && npm run notes
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, copyFileSync, rmSync, statSync } from "node:fs";
import { join, basename, extname, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const VAULT = join(ROOT, "notes");
const OUT_DIR = join(ROOT, "data");
const MEDIA_OUT = join(OUT_DIR, "media");

/* ---------- tiny front-matter parser (the YAML subset Obsidian's Properties write) ---------- */
const scalar = v => {
  v = v.trim();
  if (v === "") return "";
  if (/^(true|false)$/i.test(v)) return v.toLowerCase() === "true";
  if (/^-?\d+(\.\d+)?$/.test(v) && !/^\d{4}-/.test(v)) return Number(v);
  if (/^\[.*\]$/.test(v)) return v.slice(1, -1).split(",").map(s => scalar(s)).filter(s => s !== "");
  if (/^(["']).*\1$/.test(v)) return v.slice(1, -1);
  return v;
};
function parse(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: src };
  const data = {};
  let listKey = null;
  for (const line of m[1].split(/\r?\n/)) {
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && listKey) { data[listKey].push(scalar(item[1])); continue; }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, k, v] = kv;
    if (v.trim() === "") { data[k] = []; listKey = k; } else { data[k] = scalar(v); listKey = null; }
  }
  for (const k of Object.keys(data)) if (Array.isArray(data[k]) && !data[k].length && k !== "tags") data[k] = "";
  return { data, body: src.slice(m[0].length) };
}

const slugify = s => String(s).toLowerCase().normalize("NFKD").replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const mdFiles = dir => existsSync(dir) ? readdirSync(dir).filter(f => f.endsWith(".md")).map(f => join(dir, f)) : [];
const tagsOf = t => (Array.isArray(t) ? t : t ? String(t).split(",") : []).map(x => String(x).trim().replace(/^#/, "")).filter(Boolean);
const dateKey = d => (d ? String(d) : "");

/* ---------- media: find a file anywhere in the vault by name ---------- */
const allFiles = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    if (f.startsWith(".")) continue;
    const p = join(dir, f);
    statSync(p).isDirectory() ? walk(p) : allFiles.push(p);
  }
})(VAULT);
const usedMedia = new Map(); // vault path -> published file name
function mediaUrl(ref, fromFile) {
  ref = decodeURI(ref.split("|")[0].split("#")[0].trim());
  let file = [join(dirname(fromFile), ref), join(VAULT, ref), join(VAULT, "media", basename(ref))].find(p => existsSync(p) && statSync(p).isFile());
  if (!file) file = allFiles.find(p => basename(p).toLowerCase() === basename(ref).toLowerCase());
  if (!file) { console.warn(`  ! missing image "${ref}" in ${relative(ROOT, fromFile)}`); return null; }
  const name = slugify(basename(file, extname(file))) + extname(file).toLowerCase();
  usedMedia.set(file, name);
  return `data/media/${name}`;
}

/* ---------- Obsidian markdown → HTML ---------- */
marked.setOptions({ gfm: true, breaks: false });
function render(body, file, postSlugs) {
  let md = body
    .replace(/%%[\s\S]*?%%/g, "")                                   // Obsidian comments
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/!\[\[([^\]]+)\]\]/g, (_, ref) => {                     // ![[image.png|300]]
      const [target, size] = ref.split("|");
      const url = mediaUrl(target, file);
      if (!url) return "";
      const w = /^\d+$/.test((size || "").trim()) ? ` width="${size.trim()}"` : "";
      return `<img src="${url}" alt="${basename(target, extname(target)).replace(/[-_]/g, " ")}"${w} loading="lazy">`;
    })
    .replace(/\[\[([^\]|#]+)(#[^\]|]*)?(\|([^\]]+))?\]\]/g, (_, target, _h, _p, label) => {  // [[note|label]]
      const slug = slugify(basename(target.trim(), ".md"));
      const text = (label || postSlugs.get(slug) || target).trim();
      return postSlugs.has(slug) ? `[${text}](#ink/${slug})` : text;
    })
    .replace(/==([^=\n]+)==/g, "<mark>$1</mark>");                  // ==highlight==

  // standard markdown images with vault-relative paths
  md = md.replace(/!\[([^\]]*)\]\((?!https?:|data:)([^)\s]+)\)/g, (_, alt, src) => {
    const url = mediaUrl(src, file);
    return url ? `![${alt}](${url})` : "";
  });

  let html = marked.parse(md);
  // callouts: > [!note] Title
  html = html.replace(/<blockquote>\s*<p>\[!(\w+)\][+-]?\s*([^\n<]*)(?:\n|<br>)?([\s\S]*?)<\/blockquote>/g, (_, type, title, rest) =>
    `<div class="callout callout-${type.toLowerCase()}"><p class="callout-title">${title || type}</p><p>${rest}</div>`.replace(/<p>\s*<\/p>/g, ""));
  // external links open in a new tab
  html = html.replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"');
  return html.trim();
}

/* ---------- read the vault ---------- */
const read = f => ({ file: f, ...parse(readFileSync(f, "utf8")) });
const inkNotes = mdFiles(join(VAULT, "ink")).map(read);
const logNotes = mdFiles(join(VAULT, "learning-log")).map(read);

const published = n => n.data.published === true;
const postSlugs = new Map(inkNotes.filter(published).map(n => [slugify(n.data.slug || basename(n.file, ".md")), n.data.title || basename(n.file, ".md")]));

const ink = inkNotes
  .filter(n => n.data.hidden !== true)
  .map(n => {
    const slug = slugify(n.data.slug || basename(n.file, ".md"));
    const title = n.data.title || basename(n.file, ".md");
    if (!published(n)) return { slug, title, draft: true, order: Number(n.data.order) || 99 };
    const words = n.body.split(/\s+/).filter(Boolean).length;
    return {
      slug, title,
      date: dateKey(n.data.date),
      summary: n.data.summary || "",
      tags: tagsOf(n.data.tags),
      minutes: Math.max(1, Math.round(words / 200)),
      cover: n.data.cover ? mediaUrl(String(n.data.cover).replace(/^\[\[|\]\]$/g, ""), n.file) : null,
      html: render(n.body, n.file, postSlugs)
    };
  })
  .sort((a, b) => a.draft !== b.draft ? (a.draft ? 1 : -1)
    : a.draft ? a.order - b.order || a.title.localeCompare(b.title)   // drafts: by `order`, then title
    : dateKey(b.date).localeCompare(dateKey(a.date)));                 // published: newest first

const GROUP = { now: "now", learning: "now", "in-progress": "now", til: "til", done: "done", course: "done", certificate: "done", cert: "done", completed: "done" };
const learning = logNotes
  .filter(published)
  .map(n => ({
    title: n.data.title || basename(n.file, ".md"),
    group: GROUP[String(n.data.type || "done").toLowerCase()] || "done",
    type: String(n.data.type || ""),
    date: dateKey(n.data.date),
    status: n.data.status ? String(n.data.status) : "",
    link: n.data.link ? String(n.data.link) : "",
    tags: tagsOf(n.data.tags),
    html: n.body.trim() ? render(n.body, n.file, postSlugs) : ""
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

/* ---------- write ---------- */
mkdirSync(OUT_DIR, { recursive: true });
rmSync(MEDIA_OUT, { recursive: true, force: true });
if (usedMedia.size) mkdirSync(MEDIA_OUT, { recursive: true });
for (const [src, name] of usedMedia) copyFileSync(src, join(MEDIA_OUT, name));

writeFileSync(join(OUT_DIR, "notes.json"), JSON.stringify({ generated: new Date().toISOString(), learning, ink }, null, 2) + "\n");
console.log(`notes.json: ${learning.length} learning-log entries, ${ink.filter(p => !p.draft).length} published articles, ${ink.filter(p => p.draft).length} drafts, ${usedMedia.size} images`);
