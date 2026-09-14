import { marked } from "marked";
import { articles } from "../data/articles";
import { categories, categoryMap } from "../data/categories";
import { cheatSections } from "../data/cheatsheet";
import { community } from "../data/community";
import { templates } from "../data/templates";
import { featuredTips, relatedTips, tipMap, tips } from "../data/tips";
import { siteFaqs } from "./faq";
import { escapeHtml } from "./html";
import { navItems } from "./nav";
import type { Route } from "./routes";
import { hrefWith } from "./routes";
import type { SiteContext } from "./site";

marked.setOptions({ gfm: true, breaks: true });

function withExternalLinks(html: string): string {
  return html.replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noreferrer"');
}

function md(source: string): string {
  return withExternalLinks(marked.parse(source) as string);
}

function navActive(route: Route, name: (typeof navItems)[number]["name"]): boolean {
  if (name === "browse") return route.name === "browse" || route.name === "tip";
  return route.name === name;
}

function chrome(ctx: SiteContext, route: Route, inner: string): string {
  const nav = navItems
    .map((item) => {
      const dest =
        item.name === "browse"
          ? hrefWith({ name: "browse", search: "" }, ctx)
          : hrefWith({ name: item.name }, ctx);
      const current = navActive(route, item.name);
      return `<a${current ? ' class="is-active" aria-current="page"' : ""} href="${escapeHtml(dest)}">${item.label}</a>`;
    })
    .join("");

  return `<a class="skip-link" href="#content">跳到正文</a>
<div class="marks" aria-hidden="true"><span class="tl"></span><span class="tr"></span><span class="bl"></span><span class="br"></span></div>
<div class="site">
<header class="topbar">
<div class="topbar-inner">
<div class="brand-nav">
<a class="brand" href="${escapeHtml(hrefWith({ name: "home" }, ctx))}">
<span class="brand-kicker">Chenglu · Codex Tips</span>
<span class="brand-title">Codex Tips</span>
</a>
<nav class="nav" aria-label="主导航">${nav}</nav>
</div>
</div>
</header>
<div class="shell">
<main id="content">${inner}</main>
<footer class="footer">
<span>Codex Tips · Field Manual · 2026</span>
<span>一夜一线程 · 规则写进 AGENTS.md</span>
</footer>
</div>
</div>`;
}

function tipArticle(id: string, ctx: SiteContext): string {
  const tip = tipMap.get(id);
  if (!tip) {
    return `<article class="article">
<div class="brand-kicker">Missing leaf</div>
<h1 class="page-title">没有这条技巧</h1>
<p class="lede">它可能换了编号，或还没写进这本手册。</p>
<p><a class="btn" href="${escapeHtml(hrefWith({ name: "browse", search: "" }, ctx))}">回到目录</a></p>
</article>`;
  }
  const category = categoryMap[tip.category];
  const related = relatedTips(tip);
  const sources = tip.sources
    .map(
      (source) =>
        `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)} ↗</a></li>`,
    )
    .join("");
  const relatedHtml =
    related.length > 0
      ? `<section class="related"><h2>接着读</h2><div class="grid">${related
          .map(
            (item) =>
              `<a class="tip-card" href="${escapeHtml(hrefWith({ name: "tip", id: item.id }, ctx))}"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p></a>`,
          )
          .join("")}</div></section>`
      : "";
  return `<article class="article">
<header>
<nav class="crumbs" aria-label="面包屑">
<a href="${escapeHtml(hrefWith({ name: "browse", search: "" }, ctx))}">目录</a>
<span aria-hidden="true">/</span>
<a href="${escapeHtml(hrefWith({ name: "browse", search: `?cat=${tip.category}` }, ctx))}">CH ${escapeHtml(category.chapter)} ${escapeHtml(category.name)}</a>
<span aria-hidden="true">/</span>
<span>TIP ${String(tip.no).padStart(3, "0")}</span>
</nav>
<h1>${escapeHtml(tip.title)}</h1>
<p class="lede">${escapeHtml(tip.summary)}</p>
</header>
${md(tip.body)}
<section class="sources"><h2>来源</h2><ul>${sources}</ul></section>
${relatedHtml}
</article>`;
}

function homeInner(ctx: SiteContext): string {
  const highlights = featuredTips.length > 0 ? featuredTips.slice(0, 6) : tips.slice(0, 6);
  const categoryCounts: Record<string, number> = {};
  for (const tip of tips) categoryCounts[tip.category] = (categoryCounts[tip.category] ?? 0) + 1;
  const chapters = categories
    .map(
      (category) => `<a class="chapter" href="${escapeHtml(hrefWith({ name: "browse", search: `?cat=${category.id}` }, ctx))}">
<div class="no">CH ${escapeHtml(category.chapter)}</div>
<h3>${escapeHtml(category.name)}</h3>
<p>${escapeHtml(category.blurb)}</p>
<div class="count">${categoryCounts[category.id] ?? 0} 条</div>
</a>`,
    )
    .join("");
  const cards = highlights
    .map(
      (tip) =>
        `<a class="tip-card" href="${escapeHtml(hrefWith({ name: "tip", id: tip.id }, ctx))}"><h3>${escapeHtml(tip.title)}</h3><p>${escapeHtml(tip.summary)}</p></a>`,
    )
    .join("");
  return `<section class="hero">
<div>
<div class="brand-kicker">Field Manual · 2026 Edition</div>
<h1>全网 Codex<br/>实用技巧 <em>手册</em></h1>
<p class="lede">把 OpenAI Codex 从「会聊天的补全」用成可配置的工程队友。这里按场景收了 CLI、桌面端、IDE 与 Cloud 上真正能省时间的操作法——提示、AGENTS.md、沙箱、斜杠命令、Skills、MCP、子代理与自动化。</p>
<p class="meta-row"><span>${tips.length} 条技巧</span><span>${articles.length} 篇文章</span><span>${community.length} 条社区动态</span></p>
</div>
</section>
<div class="section-block">
<div class="section-head"><h2>章节</h2></div>
<div class="chapters">${chapters}</div>
</div>
<div class="section-block">
<div class="section-head"><h2>先读这几条</h2></div>
<div class="grid">${cards}</div>
</div>
<div class="section-block">
<div class="section-head"><h2>常见问题</h2></div>
<dl class="faq">${siteFaqs
    .map(
      (item) =>
        `<div class="faq-item"><dt>${escapeHtml(item.q)}</dt><dd>${escapeHtml(item.a)}</dd></div>`,
    )
    .join("")}</dl>
</div>`;
}

function browseInner(ctx: SiteContext): string {
  const cards = tips
    .map(
      (tip) =>
        `<a class="tip-card" href="${escapeHtml(hrefWith({ name: "tip", id: tip.id }, ctx))}"><div class="kicker"><span>TIP ${String(tip.no).padStart(3, "0")}</span><span>${escapeHtml(categoryMap[tip.category].name)}</span></div><h3>${escapeHtml(tip.title)}</h3><p>${escapeHtml(tip.summary)}</p></a>`,
    )
    .join("");
  return `<div class="layout">
<aside class="side">
<div class="brand-kicker">Index</div>
<h1 class="side-title">目录</h1>
<p class="lede">按章节、难度和入口过滤 ${tips.length} 条 Codex 技巧。</p>
</aside>
<section>
<div class="grid">${cards}</div>
</section>
</div>`;
}

function cheatsheetInner(): string {
  const sections = cheatSections
    .map((section) => {
      const rows = section.rows
        .map(
          (row) =>
            `<tr><td><code>${escapeHtml(row.cmd)}</code></td><td>${escapeHtml(row.meaning)}</td></tr>`,
        )
        .join("");
      return `<section id="cheat-${escapeHtml(section.id)}" class="cheat-section"><h2>${escapeHtml(section.title)}</h2><table class="cheat-table"><tbody>${rows}</tbody></table></section>`;
    })
    .join("");
  return `<div class="cheat-page">
<div class="brand-kicker">Quick Reference</div>
<h1 class="page-title">速查表</h1>
<p class="note">命令随 CLI 版本变化。以你机器上 <code>/help</code> 和 <code>codex --help</code> 为准。</p>
<div class="cheat">${sections}</div>
</div>`;
}

function templatesInner(id: string | undefined, ctx: SiteContext): string {
  if (!id) {
    const links = templates
      .map(
        (item) =>
          `<a href="${escapeHtml(hrefWith({ name: "templates", id: item.id }, ctx))}"><strong>${escapeHtml(item.title)}</strong> · ${escapeHtml(item.filename)} — ${escapeHtml(item.summary)}</a>`,
      )
      .join("");
    return `<div class="article">
<div class="brand-kicker">Snippets</div>
<h1 class="page-title">模板</h1>
<p class="lede">可复制的 AGENTS.md、config.toml、Skills、Hooks、MCP 与 CI 骨架，共 ${templates.length} 份。</p>
<div class="template-list">${links}</div>
</div>`;
  }
  const current = templates.find((item) => item.id === id) ?? templates[0];
  return `<div class="article">
<nav class="crumbs" aria-label="面包屑">
<a href="${escapeHtml(hrefWith({ name: "templates" }, ctx))}">模板</a>
<span aria-hidden="true">/</span>
<span>${escapeHtml(current.filename)}</span>
</nav>
<h1 class="page-title">${escapeHtml(current.title)}</h1>
<p class="lede">${escapeHtml(current.summary)}</p>
<pre><code>${escapeHtml(current.code)}</code></pre>
</div>`;
}

function articlesInner(): string {
  const items = articles
    .map(
      (article) =>
        `<a class="feed-item" href="${escapeHtml(article.url)}" target="_blank" rel="noreferrer"><div class="kicker">${escapeHtml(article.source)} · ${escapeHtml(article.kind)}</div><h2>${escapeHtml(article.title)}</h2><p>${escapeHtml(article.summary)}</p></a>`,
    )
    .join("");
  return `<div class="article catalog-page">
<div class="brand-kicker">Reading list</div>
<h1 class="page-title">文章</h1>
<p class="note">收录标准：能教会你怎么用 Codex，或能让它明显更好用。本站只写摘要，完整内容请读原文。</p>
<div class="feed">${items}</div>
</div>`;
}

function communityInner(): string {
  const items = [...community]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(
      (item) =>
        `<a class="feed-item" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer"><div class="kicker">${escapeHtml(item.source)} · ${escapeHtml(item.kind)} · ${escapeHtml(item.date)}</div><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.summary)}</p></a>`,
    )
    .join("");
  return `<div class="article catalog-page">
<div class="brand-kicker">Field notes</div>
<h1 class="page-title">社区</h1>
<p class="note">社交媒体和论坛里刚出现的用法、版本变化和踩坑。操作前仍以官方文档为准。</p>
<div class="feed">${items}</div>
</div>`;
}

function aboutInner(): string {
  return `<article class="article">
<div class="brand-kicker">Colophon</div>
<h1 class="page-title">关于这本手册</h1>
<p>Codex Tips 搜集 OpenAI Codex（CLI、桌面端、IDE 扩展、Cloud）上真正能复用的操作法。目标不是再写一份官方文档的镜像，而是把散落在最佳实践、配置参考、社区速查、社交媒体和踩坑记录里的「会让你少浪费一轮」的知识编成可检索的现场手册。</p>
<p>Codex 迭代很快。本站内容以 2026 年公开文档与社区资料为底。动手前仍以 <a href="https://developers.openai.com/codex" target="_blank" rel="noreferrer">developers.openai.com/codex</a> 和本机 <code>/help</code> 为准。</p>
<h2>怎么用</h2>
<ul>
<li>按 <kbd>/</kbd> 或 <kbd>⌘K</kbd> 检索技巧、模板、文章和社区动态</li>
<li>目录可按章节、难度、入口过滤；点技巧卡片进入正文</li>
<li>文章页是外链阅读清单，社区页跟踪 X 和论坛里刚出现的用法</li>
<li>速查表可按关键字过滤，点命令即可复制</li>
<li>模板页可按类型筛选，复制 AGENTS.md、config、skill、子代理骨架</li>
</ul>
<h2>欢迎补一条</h2>
<p>一条好技巧通常满足：有具体命令或文件路径、说明何时用何时不用、最好能指出常见误用。欢迎直接开 PR，在 <code>src/data/</code> 里追加条目并附上来源链接。</p>
</article>`;
}

export function snapshotHtml(route: Route, ctx: SiteContext): string {
  let inner = "";
  switch (route.name) {
    case "home":
      inner = homeInner(ctx);
      break;
    case "browse":
      inner = browseInner(ctx);
      break;
    case "tip":
      inner = tipArticle(route.id, ctx);
      break;
    case "cheatsheet":
      inner = cheatsheetInner();
      break;
    case "templates":
      inner = templatesInner(route.id, ctx);
      break;
    case "articles":
      inner = articlesInner();
      break;
    case "community":
      inner = communityInner();
      break;
    case "about":
      inner = aboutInner();
      break;
    case "notfound":
      inner = `<article class="article"><div class="brand-kicker">404</div><h1 class="page-title">没有这一页</h1><p class="lede">地址可能写错了，或这条内容已经换了位置。</p></article>`;
      break;
  }
  return chrome(ctx, route, inner);
}

function yamlQuote(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
}

export function markdownForRoute(route: Route): string | undefined {
  switch (route.name) {
    case "home":
      return `---
title: Codex Tips · 现场手册
---

# Codex Tips

把 OpenAI Codex 从「会聊天的补全」用成可配置的工程队友。按场景收录 CLI、桌面端、IDE 与 Cloud 上的实用技巧。

- [目录](tips.md)
- [速查表](cheatsheet.md)
- [模板](templates.md)
- [文章](articles.md)
- [社区](community.md)
- [关于](about.md)
`;
    case "browse":
      return `# 目录

${tips
  .map((tip) => `- [TIP ${String(tip.no).padStart(3, "0")} ${tip.title}](tips/${tip.id}.md)：${tip.summary}`)
  .join("\n")}
`;
    case "tip": {
      const tip = tipMap.get(route.id);
      if (!tip) return undefined;
      const category = categoryMap[tip.category];
      return `---
title: ${yamlQuote(tip.title)}
summary: ${yamlQuote(tip.summary)}
category: ${category.id}
level: ${tip.level}
surfaces: [${tip.surfaces.join(", ")}]
tags: [${tip.tags.map((tag) => yamlQuote(tag)).join(", ")}]
canonical: /tips/${tip.id}/
---

# ${tip.title}

${tip.summary}

${tip.body}

## 来源

${tip.sources.map((source) => `- [${source.label}](${source.url})`).join("\n")}
`;
    }
    case "cheatsheet":
      return `# Codex 速查表

${cheatSections
  .map(
    (section) =>
      `## ${section.title}\n\n${section.rows.map((row) => `- \`${row.cmd}\` — ${row.meaning}`).join("\n")}`,
  )
  .join("\n\n")}
`;
    case "templates": {
      if (!route.id) {
        return `# 模板

${templates.map((item) => `- [${item.title}](templates/${item.id}.md)（${item.filename}）：${item.summary}`).join("\n")}
`;
      }
      const current = templates.find((item) => item.id === route.id);
      if (!current) return undefined;
      return `---
title: ${yamlQuote(current.title)}
filename: ${yamlQuote(current.filename)}
canonical: /templates/${current.id}/
---

# ${current.title}

${current.summary}

\`\`\`
${current.code}
\`\`\`
`;
    }
    case "articles":
      return `# 文章

本站只写摘要，完整内容请读原文。

${articles.map((article) => `- [${article.title}](${article.url})（${article.source} · ${article.kind} · ${article.lang}）：${article.summary}`).join("\n")}
`;
    case "community":
      return `# 社区

${[...community]
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .map((item) => `- [${item.title}](${item.url})（${item.source} · ${item.date}）：${item.summary}`)
  .join("\n")}
`;
    case "about":
      return `# 关于这本手册

Codex Tips 搜集 OpenAI Codex（CLI、桌面端、IDE 扩展、Cloud）上真正能复用的操作法。目标不是再写一份官方文档的镜像，而是把散落在最佳实践、配置参考、社区速查、社交媒体和踩坑记录里的知识编成可检索的现场手册。

动手前仍以 <https://developers.openai.com/codex> 和本机 \`/help\` 为准。
`;
    default:
      return undefined;
  }
}
