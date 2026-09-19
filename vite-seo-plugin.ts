import { deflateSync } from "node:zlib";
import { mkdirSync, readFileSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { articles } from "./src/data/articles";
import { community } from "./src/data/community";
import { templates } from "./src/data/templates";
import { tips } from "./src/data/tips";
import { updates } from "./src/data/updates";
import { escapeAttr, escapeHtml } from "./src/lib/html";
import type { Route } from "./src/lib/routes";
import { appPath, hrefWith } from "./src/lib/routes";
import { listPrerenderRoutes, markdownAppPath, seoForRoute, sitemapEntries } from "./src/lib/seo";
import { markdownForRoute, snapshotHtml } from "./src/lib/snapshot";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_SITE_URL,
  SITE_NAME,
  absoluteUrl,
  normalizeSite,
  type SiteContext,
} from "./src/lib/site";

function crc32(buf: Buffer): number {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]!;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return ~c >>> 0;
}

function pngChunk(type: string, data: Buffer): Buffer {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const payload = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(payload));
  return Buffer.concat([length, payload, crc]);
}

function encodePng(width: number, height: number, paint: (x: number, y: number) => [number, number, number]): Buffer {
  const raw = Buffer.alloc((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) {
    const row = y * (width * 3 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b] = paint(x, y);
      const i = row + 1 + x * 3;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(raw, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function buildOgPng(): Buffer {
  const w = 1200;
  const h = 630;
  const bg: [number, number, number] = [11, 12, 10];
  const copper: [number, number, number] = [212, 165, 116];
  const ink: [number, number, number] = [232, 228, 217];
  const inset = 48;
  const stroke = 4;
  return encodePng(w, h, (x, y) => {
    const onBorder =
      (x >= inset && x < inset + stroke && y >= inset && y < h - inset) ||
      (x >= w - inset - stroke && x < w - inset && y >= inset && y < h - inset) ||
      (y >= inset && y < inset + stroke && x >= inset && x < w - inset) ||
      (y >= h - inset - stroke && y < h - inset && x >= inset && x < w - inset);
    if (onBorder) return copper;
    const lineY = [220, 310, 400];
    for (const ly of lineY) {
      if (y >= ly && y < ly + 8 && x >= 140 && x < (ly === 310 ? 620 : 860)) return ink;
    }
    const cx = 980;
    const cy = 314;
    if ((x - cx) * (x - cx) + (y - cy) * (y - cy) <= 18 * 18) return copper;
    return bg;
  });
}

function jsonLdScript(data: unknown[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": data,
  }).replace(/</g, "\\u003c");
}

function upsertMeta(html: string, attr: "name" | "property", key: string, content: string): string {
  const re = new RegExp(`<meta[^>]*${attr}="${key}"[^>]*>`, "i");
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertLink(html: string, rel: string, href: string, extra = ""): string {
  const attr = extra ? ` ${extra}` : "";
  const re = extra
    ? new RegExp(`<link[^>]*rel="${rel}"[^>]*${extra}[^>]*>|<link[^>]*${extra}[^>]*rel="${rel}"[^>]*>`, "i")
    : new RegExp(`<link[^>]*rel="${rel}"(?![^>]*hreflang)(?![^>]*type=)[^>]*>`, "i");
  const tag = `<link rel="${rel}" href="${escapeAttr(href)}"${attr} />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function applySeoHead(html: string, route: Route, ctx: SiteContext): string {
  const seo = seoForRoute(route, ctx);
  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  out = upsertMeta(out, "name", "description", seo.description);
  out = upsertMeta(out, "name", "keywords", seo.keywords);
  out = upsertMeta(out, "name", "robots", seo.robots);
  out = upsertMeta(out, "name", "author", SITE_NAME);
  out = upsertMeta(out, "property", "og:title", seo.title);
  out = upsertMeta(out, "property", "og:description", seo.description);
  out = upsertMeta(out, "property", "og:type", seo.ogType);
  out = upsertMeta(out, "property", "og:url", seo.canonical);
  out = upsertMeta(out, "property", "og:image", seo.image);
  out = upsertMeta(out, "property", "og:locale", "zh_CN");
  out = upsertMeta(out, "property", "og:site_name", SITE_NAME);
  out = upsertMeta(out, "name", "twitter:card", "summary_large_image");
  out = upsertMeta(out, "name", "twitter:title", seo.title);
  out = upsertMeta(out, "name", "twitter:description", seo.description);
  out = upsertMeta(out, "name", "twitter:image", seo.image);
  out = out.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`);
  if (!/<link rel="canonical"/i.test(out)) {
    out = out.replace("</head>", `    <link rel="canonical" href="${escapeAttr(seo.canonical)}" />\n  </head>`);
  }
  if (seo.markdownUrl) {
    out = upsertLink(out, "alternate", seo.markdownUrl, `type="text/markdown"`);
  }
  const payload = jsonLdScript(seo.jsonLd);
  if (/id="jsonld"/.test(out)) {
    out = out.replace(
      /<script type="application\/ld\+json" id="jsonld">[\s\S]*?<\/script>/,
      `<script type="application/ld+json" id="jsonld">${payload}</script>`,
    );
  } else {
    out = out.replace(
      "</head>",
      `    <script type="application/ld+json" id="jsonld">${payload}</script>\n  </head>`,
    );
  }
  const inner = snapshotHtml(route, ctx);
  if (/<div id="root">\s*<\/div>/.test(out)) {
    out = out.replace(/<div id="root">\s*<\/div>/, `<div id="root">${inner}</div>`);
  } else {
    out = out.replace(/<div id="root">[\s\S]*?<\/div>\s*<script/, `<div id="root">${inner}</div>\n    <script`);
  }
  return out;
}

function writeDeep(file: string, contents: string | Buffer) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, contents);
}

function writeUtf8(file: string, contents: string) {
  writeDeep(file, `\uFEFF${contents}`);
}

function xmlEscape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildSitemap(ctx: SiteContext, lastmod: string): string {
  const urls = sitemapEntries(ctx)
    .map(
      (entry) => `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots(ctx: SiteContext): string {
  const sitemap = absoluteUrl("/sitemap.xml", ctx);
  const agents = [
    "*",
    "GPTBot",
    "ChatGPT-User",
    "Google-Extended",
    "PerplexityBot",
    "ClaudeBot",
    "Anthropic-AI",
    "Applebot-Extended",
    "CCBot",
    "Bytespider",
    "meta-externalagent",
  ];
  return `${agents.map((agent) => `User-agent: ${agent}\nAllow: /`).join("\n\n")}

Sitemap: ${sitemap}
`;
}

function buildLlmsTxt(ctx: SiteContext): string {
  const link = (label: string, app: string, summary?: string) =>
    summary
      ? `- [${label}](${absoluteUrl(app, ctx)}): ${summary}`
      : `- [${label}](${absoluteUrl(app, ctx)})`;
  return `# ${SITE_NAME}

> ${DEFAULT_DESCRIPTION}

站点使用干净的路径 URL（例如 /tips/teammate-not-chatbot/）。旧的 hash 地址（#/tips/...）会在浏览器里改写到对应路径。

每条技巧也有 Markdown 副本，便于生成式引擎引用：/tips/{id}.md。

## 页面

${link("封面", "/", "手册入口")}
${link("目录", "/tips/", `${tips.length} 条技巧`)}
${link("速查表", "/cheatsheet/", "CLI、斜杠命令与 exec")}
${link("模板", "/templates/", `${templates.length} 份可复制骨架`)}
${link("更新", "/updates/", `${updates.length} 篇 CLI 版本对照`)}
${link("文章", "/articles/", `${articles.length} 篇外链阅读清单`)}
${link("社区", "/community/", `${community.length} 条社区动态`)}
${link("关于", "/about/", "用法与来源")}

## 技巧

${tips.map((tip) => link(tip.title, `/tips/${tip.id}/`, tip.summary)).join("\n")}

## 模板

${templates.map((item) => link(item.title, `/templates/${item.id}/`, item.summary)).join("\n")}

## 更新

${updates.map((item) => link(item.title, `/updates/${item.id}/`, item.summary)).join("\n")}

## Optional

${link("完整正文", "/llms-full.txt", "全部技巧 Markdown")}
${link("机器目录", "/catalog.json", "技巧与模板的 JSON 索引")}
${link("RSS", "/feed.xml", "技巧订阅")}
${link("Sitemap", "/sitemap.xml")}
${link("技巧 Markdown 目录", "/tips.md")}
`;
}

function buildLlmsFull(): string {
  return `# ${SITE_NAME} · 完整正文

${tips
    .map((tip) => {
      const md = markdownForRoute({ name: "tip", id: tip.id });
      return md ?? "";
    })
    .filter(Boolean)
    .join("\n\n---\n\n")}

${updates
    .map((item) => {
      const md = markdownForRoute({ name: "update", id: item.id });
      return md ?? "";
    })
    .filter(Boolean)
    .join("\n\n---\n\n")}
`;
}

function buildFeed(ctx: SiteContext): string {
  const tipItems = tips.map((tip) => {
    const url = absoluteUrl(`/tips/${tip.id}/`, ctx);
    return `    <item>
      <title>${xmlEscape(tip.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid>${xmlEscape(url)}</guid>
      <description>${xmlEscape(tip.summary)}</description>
      <category>${xmlEscape(tip.category)}</category>
    </item>`;
  });
  const updateItems = updates.map((item) => {
    const url = absoluteUrl(`/updates/${item.id}/`, ctx);
    return `    <item>
      <title>${xmlEscape(item.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid>${xmlEscape(url)}</guid>
      <description>${xmlEscape(item.summary)}</description>
      <category>updates</category>
    </item>`;
  });
  const items = [...updateItems, ...tipItems].join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(SITE_NAME)}</title>
    <link>${xmlEscape(`${ctx.siteUrl}/`)}</link>
    <description>${xmlEscape(DEFAULT_DESCRIPTION)}</description>
    <language>zh-CN</language>
${items}
  </channel>
</rss>
`;
}

function buildCatalog(ctx: SiteContext) {
  return {
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: `${ctx.siteUrl}/`,
    inLanguage: "zh-CN",
    pages: [
      { name: "home", url: absoluteUrl("/", ctx), markdown: absoluteUrl("/index.md", ctx) },
      { name: "tips", url: absoluteUrl("/tips/", ctx), markdown: absoluteUrl("/tips.md", ctx) },
      { name: "cheatsheet", url: absoluteUrl("/cheatsheet/", ctx), markdown: absoluteUrl("/cheatsheet.md", ctx) },
      { name: "templates", url: absoluteUrl("/templates/", ctx), markdown: absoluteUrl("/templates.md", ctx) },
      { name: "updates", url: absoluteUrl("/updates/", ctx), markdown: absoluteUrl("/updates.md", ctx) },
      { name: "articles", url: absoluteUrl("/articles/", ctx), markdown: absoluteUrl("/articles.md", ctx) },
      { name: "community", url: absoluteUrl("/community/", ctx), markdown: absoluteUrl("/community.md", ctx) },
      { name: "about", url: absoluteUrl("/about/", ctx), markdown: absoluteUrl("/about.md", ctx) },
    ],
    tips: tips.map((tip) => ({
      id: tip.id,
      no: tip.no,
      title: tip.title,
      summary: tip.summary,
      category: tip.category,
      level: tip.level,
      surfaces: tip.surfaces,
      tags: tip.tags,
      url: absoluteUrl(`/tips/${tip.id}/`, ctx),
      markdown: absoluteUrl(`/tips/${tip.id}.md`, ctx),
      sources: tip.sources,
    })),
    templates: templates.map((item) => ({
      id: item.id,
      title: item.title,
      filename: item.filename,
      summary: item.summary,
      url: absoluteUrl(`/templates/${item.id}/`, ctx),
      markdown: absoluteUrl(`/templates/${item.id}.md`, ctx),
    })),
    updates: updates.map((item) => ({
      id: item.id,
      no: item.no,
      title: item.title,
      summary: item.summary,
      from: item.from,
      to: item.to,
      versions: item.versions,
      url: absoluteUrl(`/updates/${item.id}/`, ctx),
      markdown: absoluteUrl(`/updates/${item.id}.md`, ctx),
    })),
  };
}

function distFileForAppPath(outDir: string, app: string): string {
  const clean = app.replace(/^\//, "");
  if (!clean || clean === "/") return path.join(outDir, "index.html");
  if (app.endsWith("/")) return path.join(outDir, clean, "index.html");
  return path.join(outDir, clean);
}

export function seoPlugin(): Plugin {
  let outDir = "dist";
  let ctx = normalizeSite();

  return {
    name: "codex-tips-seo",
    apply: "build",
    configResolved(config: ResolvedConfig) {
      outDir = path.resolve(config.root, config.build.outDir);
      ctx = normalizeSite({
        siteUrl: config.env.VITE_SITE_URL || process.env.VITE_SITE_URL || DEFAULT_SITE_URL,
        basePath: config.base,
      });
    },
    async closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      if (!existsSync(indexPath)) {
        throw new Error("seo plugin: dist/index.html missing");
      }
      const template = readFileSync(indexPath, "utf8");
      const lastmod = new Date().toISOString().slice(0, 10);
      const routes = listPrerenderRoutes();

      writeDeep(path.join(outDir, "og.png"), buildOgPng());
      writeDeep(path.join(outDir, ".nojekyll"), "");
      writeDeep(path.join(outDir, "robots.txt"), buildRobots(ctx));
      writeDeep(path.join(outDir, "sitemap.xml"), buildSitemap(ctx, lastmod));
      writeUtf8(path.join(outDir, "llms.txt"), buildLlmsTxt(ctx));
      writeUtf8(path.join(outDir, "llms-full.txt"), buildLlmsFull());
      writeDeep(path.join(outDir, "feed.xml"), buildFeed(ctx));
      writeDeep(path.join(outDir, "catalog.json"), `${JSON.stringify(buildCatalog(ctx), null, 2)}\n`);

      const markdownRoutes: Route[] = [
        { name: "home" },
        { name: "browse", search: "" },
        { name: "cheatsheet" },
        { name: "templates" },
        { name: "articles" },
        { name: "updates" },
        { name: "community" },
        { name: "about" },
        ...tips.map((tip): Route => ({ name: "tip", id: tip.id })),
        ...templates.map((item): Route => ({ name: "templates", id: item.id })),
        ...updates.map((item): Route => ({ name: "update", id: item.id })),
      ];
      for (const route of markdownRoutes) {
        const md = markdownForRoute(route);
        const mdPath = markdownAppPath(route);
        if (!md || !mdPath) continue;
        writeUtf8(path.join(outDir, mdPath.replace(/^\//, "")), md);
      }

      for (const route of routes) {
        const html = applySeoHead(template, route, ctx);
        writeDeep(distFileForAppPath(outDir, appPath(route)), html);
      }

      const spaShell = applySeoHead(template, { name: "home" }, ctx).replace(
        /<meta name="robots"[^>]*>/i,
        `<meta name="robots" content="noindex, nofollow" />`,
      );
      writeFileSync(path.join(outDir, "404.html"), spaShell);

      const firstTip = tips[0];
      const tipHtml = readFileSync(path.join(outDir, "tips", firstTip.id, "index.html"), "utf8");
      const checks = [
        existsSync(path.join(outDir, "sitemap.xml")),
        existsSync(path.join(outDir, "robots.txt")),
        existsSync(path.join(outDir, "llms.txt")),
        existsSync(path.join(outDir, "llms-full.txt")),
        existsSync(path.join(outDir, "tips.md")),
        existsSync(path.join(outDir, "og.png")),
        tipHtml.includes(firstTip.title),
        tipHtml.includes(firstTip.summary),
        tipHtml.includes("application/ld+json"),
        readFileSync(path.join(outDir, "sitemap.xml"), "utf8").includes(`/tips/${firstTip.id}/`),
        readFileSync(path.join(outDir, "llms.txt"), "utf8").includes(firstTip.title),
        hrefWith({ name: "tip", id: firstTip.id }, ctx).includes(firstTip.id),
      ];
      if (checks.some((ok) => !ok)) {
        throw new Error("seo plugin: prerender verification failed");
      }
    },
  };
}
