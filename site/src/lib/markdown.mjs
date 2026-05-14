// markdown.mjs — build-time markdown rendering for analysis README / EASY_READ
// files. Used by the [slug] detail pages inside getStaticPaths (build-time, has
// fs access). READ-ONLY: only ever reads files under the repo's analyses/**.

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

// Rewrite an in-repo link target so it works on the deployed dashboard.
//   - links to another analysis's README/EASY_READ -> internal detail page
//   - any other in-repo file (pine, csv, ...)       -> GitHub blob URL
//   - external / anchors / mailto                   -> unchanged
function rewriteHref(href, currentFileRepoRel, { base, githubBlobBase }) {
  if (/^(https?:|#|mailto:|\/)/.test(href)) return href;

  const currentDir = currentFileRepoRel.split('/').slice(0, -1).join('/');
  // POSIX-normalize join(currentDir, href)
  const parts = [];
  for (const seg of `${currentDir}/${href}`.split('/')) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') parts.pop();
    else parts.push(seg);
  }
  const resolved = parts.join('/');

  const internal = resolved.match(/^analyses\/(.+)\/(README|EASY_READ)\.md$/);
  if (internal) {
    const slug = internal[1].replace(/\//g, '-');
    return `${base}/analyses/${slug}`;
  }
  return `${githubBlobBase}/${resolved}`;
}

/**
 * Render a repo-relative markdown file to HTML.
 * @returns { html } or null if the file does not exist.
 */
export async function renderMarkdownFile(repoRoot, repoRelPath, opts) {
  if (!repoRelPath) return null;
  const abs = join(repoRoot, repoRelPath);
  if (!existsSync(abs)) return null;
  const raw = await readFile(abs, 'utf8'); // READ-ONLY
  let html = marked.parse(raw);
  // Rewrite hrefs.
  html = html.replace(/href="([^"]+)"/g, (_m, href) => {
    return `href="${rewriteHref(href, repoRelPath, opts)}"`;
  });
  // Make external links open in a new tab.
  html = html.replace(/<a href="(https?:[^"]+)"/g, '<a target="_blank" rel="noopener" href="$1"');
  return { html };
}

/** Read a raw text file (e.g. a .pine source) — READ-ONLY. Returns null if absent. */
export async function readRepoText(repoRoot, repoRelPath) {
  if (!repoRelPath) return null;
  const abs = join(repoRoot, repoRelPath);
  if (!existsSync(abs)) return null;
  return readFile(abs, 'utf8');
}
