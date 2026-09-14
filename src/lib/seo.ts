import { articles } from "../data/articles";
import { categories, categoryMap } from "../data/categories";
import { cheatSections } from "../data/cheatsheet";
import { community } from "../data/community";
import { templates } from "../data/templates";
import { tipMap, tips } from "../data/tips";
import { siteFaqs } from "./faq";
import { levelLabel, surfaceLabel } from "./labels";
import type { Route } from "./routes";
import { canonicalUrl } from "./routes";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  SITE_AUTHOR,
  SITE_LANG,
  SITE_NAME,
  absoluteUrl,
  assetUrl,
  type SiteContext,
} from "./site";

export type SeoDoc = {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: "website" | "article";
  image: string;
  keywords: string;
  markdownUrl?: string;
  jsonLd: unknown[];
  articleSection?: string;
  articleTags?: string[];
};

const ROBOTS_INDEX = "index, follow, max-image-preview:large";
const ROBOTS_NOINDEX = "noindex, nofollow";

function websiteNode(ctx: SiteContext) {
  return {
    "@type": "WebSite",
    "@id": `${ctx.siteUrl}/#website`,
    name: SITE_NAME,
    alternateName: ["Codex Tips 现场手册", "Codex 技巧手册"],
    url: `${ctx.siteUrl}/`,
    inLanguage: SITE_LANG,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${ctx.siteUrl}/#publisher` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${ctx.siteUrl}/tips/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

function publisherNode(ctx: SiteContext) {
  return {
    "@type": "Organization",
    "@id": `${ctx.siteUrl}/#publisher`,
    name: SITE_NAME,
    url: `${ctx.siteUrl}/`,
    logo: {
      "@type": "ImageObject",
      url: assetUrl("favicon.svg", ctx),
    },
  };
}

function personNode(ctx: SiteContext) {
  return {
    "@type": "Organization",
    "@id": `${ctx.siteUrl}/#author`,
    name: SITE_AUTHOR,
  };
}

function breadcrumbs(items: { name: string; path: string }[], ctx: SiteContext) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, ctx),
    })),
  };
}

function webpage(route: Route, seo: { title: string; description: string }, ctx: SiteContext, extra?: Record<string, unknown>) {
  return {
    "@type": "WebPage",
    "@id": `${canonicalUrl(route, ctx)}#webpage`,
    url: canonicalUrl(route, ctx),
    name: seo.title,
    description: seo.description,
    inLanguage: SITE_LANG,
    isPartOf: { "@id": `${ctx.siteUrl}/#website` },
    ...extra,
  };
}

export function markdownAppPath(route: Route): string | undefined {
  switch (route.name) {
    case "home":
      return "/index.md";
    case "browse":
      return "/tips.md";
    case "tip":
      return `/tips/${route.id}.md`;
    case "cheatsheet":
      return "/cheatsheet.md";
    case "templates":
      return route.id ? `/templates/${route.id}.md` : "/templates.md";
    case "articles":
      return "/articles.md";
    case "community":
      return "/community.md";
    case "about":
      return "/about.md";
    default:
      return undefined;
  }
}

export function seoForRoute(route: Route, ctx: SiteContext): SeoDoc {
  const image = assetUrl("og.png", ctx);
  const markdownPath = markdownAppPath(route);
  const markdownUrl = markdownPath ? absoluteUrl(markdownPath, ctx) : undefined;
  const graphBase = [publisherNode(ctx), personNode(ctx), websiteNode(ctx)];

  switch (route.name) {
    case "home": {
      const title = DEFAULT_TITLE;
      const description = DEFAULT_DESCRIPTION;
      const canonical = canonicalUrl(route, ctx);
      const faq = {
        "@type": "FAQPage",
        mainEntity: siteFaqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
      };
      return {
        title,
        description,
        canonical,
        robots: ROBOTS_INDEX,
        ogType: "website",
        image,
        keywords: DEFAULT_KEYWORDS,
        markdownUrl,
        jsonLd: [
          ...graphBase,
          webpage(route, { title, description }, ctx, {
            "@type": ["WebPage", "CollectionPage"],
            primaryImageOfPage: image,
            breadcrumb: { "@id": `${canonical}#breadcrumb` },
          }),
          { ...breadcrumbs([{ name: SITE_NAME, path: "/" }], ctx), "@id": `${canonical}#breadcrumb` },
          faq,
        ],
      };
    }
    case "browse": {
      const title = `目录 · ${SITE_NAME}`;
      const description = `浏览 ${tips.length} 条 Codex 技巧，按 ${categories.length} 个章节、难度和 CLI / 桌面 / IDE / Cloud / CI 入口过滤。`;
      const canonical = canonicalUrl({ name: "browse", search: "" }, ctx);
      return {
        title,
        description,
        canonical,
        robots: ROBOTS_INDEX,
        ogType: "website",
        image,
        keywords: DEFAULT_KEYWORDS,
        markdownUrl: absoluteUrl("/tips.md", ctx),
        jsonLd: [
          ...graphBase,
          webpage({ name: "browse", search: "" }, { title, description }, ctx, {
            "@type": ["WebPage", "CollectionPage"],
            breadcrumb: { "@id": `${canonical}#breadcrumb` },
          }),
          {
            ...breadcrumbs(
              [
                { name: SITE_NAME, path: "/" },
                { name: "目录", path: "/tips/" },
              ],
              ctx,
            ),
            "@id": `${canonical}#breadcrumb`,
          },
          {
            "@type": "ItemList",
            name: "Codex 技巧目录",
            numberOfItems: tips.length,
            itemListElement: tips.slice(0, 50).map((tip, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/tips/${tip.id}/`, ctx),
              name: tip.title,
            })),
          },
        ],
      };
    }
    case "tip": {
      const tip = tipMap.get(route.id);
      if (!tip) {
        return seoForRoute({ name: "notfound" }, ctx);
      }
      const category = categoryMap[tip.category];
      const title = `${tip.title} · ${SITE_NAME}`;
      const description = tip.summary;
      const canonical = canonicalUrl(route, ctx);
      const keywords = [...new Set([...tip.tags, category.name, ...tip.surfaces.map((s) => surfaceLabel[s]), "Codex"])].join(
        ", ",
      );
      return {
        title,
        description,
        canonical,
        robots: ROBOTS_INDEX,
        ogType: "article",
        image,
        keywords,
        markdownUrl: absoluteUrl(`/tips/${tip.id}.md`, ctx),
        articleSection: category.name,
        articleTags: tip.tags,
        jsonLd: [
          ...graphBase,
          {
            "@type": "TechArticle",
            "@id": `${canonical}#article`,
            headline: tip.title,
            description: tip.summary,
            inLanguage: SITE_LANG,
            url: canonical,
            mainEntityOfPage: canonical,
            author: { "@id": `${ctx.siteUrl}/#author` },
            publisher: { "@id": `${ctx.siteUrl}/#publisher` },
            image,
            keywords: tip.tags,
            articleSection: category.name,
            proficiencyLevel: levelLabel[tip.level],
            about: {
              "@type": "Thing",
              name: "OpenAI Codex",
            },
            citation: tip.sources.map((source) => ({
              "@type": "CreativeWork",
              name: source.label,
              url: source.url,
            })),
            isPartOf: { "@id": `${ctx.siteUrl}/#website` },
          },
          webpage(route, { title, description }, ctx, {
            breadcrumb: { "@id": `${canonical}#breadcrumb` },
            mainEntity: { "@id": `${canonical}#article` },
          }),
          {
            ...breadcrumbs(
              [
                { name: SITE_NAME, path: "/" },
                { name: "目录", path: "/tips/" },
                { name: category.name, path: `/tips/?cat=${tip.category}` },
                { name: tip.title, path: `/tips/${tip.id}/` },
              ],
              ctx,
            ),
            "@id": `${canonical}#breadcrumb`,
          },
        ],
      };
    }
    case "cheatsheet": {
      const title = `速查表 · ${SITE_NAME}`;
      const description = `Codex CLI 速查：启动、TUI、斜杠命令、旗标与 exec。共 ${cheatSections.length} 组，点命令即可复制。以本机 /help 为准。`;
      const canonical = canonicalUrl({ name: "cheatsheet" }, ctx);
      return {
        title,
        description,
        canonical,
        robots: ROBOTS_INDEX,
        ogType: "website",
        image,
        keywords: `${DEFAULT_KEYWORDS}, 速查, 斜杠命令, exec`,
        markdownUrl: absoluteUrl("/cheatsheet.md", ctx),
        jsonLd: [
          ...graphBase,
          webpage({ name: "cheatsheet" }, { title, description }, ctx, {
            "@type": ["WebPage", "CollectionPage"],
            breadcrumb: { "@id": `${canonical}#breadcrumb` },
          }),
          {
            ...breadcrumbs(
              [
                { name: SITE_NAME, path: "/" },
                { name: "速查表", path: "/cheatsheet/" },
              ],
              ctx,
            ),
            "@id": `${canonical}#breadcrumb`,
          },
        ],
      };
    }
    case "templates": {
      const current = route.id ? templates.find((item) => item.id === route.id) : undefined;
      const title = current ? `${current.title} · 模板 · ${SITE_NAME}` : `模板 · ${SITE_NAME}`;
      const description = current
        ? current.summary
        : `可复制的 Codex 模板：AGENTS.md、config.toml、Skills、Hooks、MCP 与 CI 骨架，共 ${templates.length} 份。`;
      const canonical = canonicalUrl(route, ctx);
      const jsonLd: unknown[] = [
        ...graphBase,
        webpage(route, { title, description }, ctx, {
          "@type": current ? "WebPage" : ["WebPage", "CollectionPage"],
          breadcrumb: { "@id": `${canonical}#breadcrumb` },
        }),
        {
          ...breadcrumbs(
            [
              { name: SITE_NAME, path: "/" },
              { name: "模板", path: "/templates/" },
              ...(current ? [{ name: current.title, path: `/templates/${current.id}/` }] : []),
            ],
            ctx,
          ),
          "@id": `${canonical}#breadcrumb`,
        },
      ];
      if (current) {
        jsonLd.push({
          "@type": "SoftwareSourceCode",
          name: current.title,
          description: current.summary,
          url: canonical,
          programmingLanguage: current.filename.endsWith(".toml")
            ? "TOML"
            : current.filename.endsWith(".md")
              ? "Markdown"
              : current.filename.endsWith(".yml") || current.filename.endsWith(".yaml")
                ? "YAML"
                : "Text",
          codeSampleType: "code snippet",
        });
      }
      return {
        title,
        description,
        canonical,
        robots: ROBOTS_INDEX,
        ogType: current ? "article" : "website",
        image,
        keywords: `${DEFAULT_KEYWORDS}, 模板, AGENTS.md, config.toml`,
        markdownUrl: absoluteUrl(current ? `/templates/${current.id}.md` : "/templates.md", ctx),
        jsonLd,
      };
    }
    case "articles": {
      const title = `文章 · ${SITE_NAME}`;
      const description = `Codex 阅读清单：官方文档、教程、清单与示例仓库，共 ${articles.length} 篇。本站只写摘要，完整内容请读原文。`;
      const canonical = canonicalUrl(route, ctx);
      return {
        title,
        description,
        canonical,
        robots: ROBOTS_INDEX,
        ogType: "website",
        image,
        keywords: `${DEFAULT_KEYWORDS}, 文档, 教程`,
        markdownUrl,
        jsonLd: [
          ...graphBase,
          webpage(route, { title, description }, ctx, {
            "@type": ["WebPage", "CollectionPage"],
            breadcrumb: { "@id": `${canonical}#breadcrumb` },
          }),
          {
            ...breadcrumbs(
              [
                { name: SITE_NAME, path: "/" },
                { name: "文章", path: "/articles/" },
              ],
              ctx,
            ),
            "@id": `${canonical}#breadcrumb`,
          },
        ],
      };
    }
    case "community": {
      const title = `社区 · ${SITE_NAME}`;
      const description = `Codex 社区动态：X、论坛和刚出现的用法、版本变化与踩坑，共 ${community.length} 条。操作前仍以官方文档为准。`;
      const canonical = canonicalUrl(route, ctx);
      return {
        title,
        description,
        canonical,
        robots: ROBOTS_INDEX,
        ogType: "website",
        image,
        keywords: `${DEFAULT_KEYWORDS}, 社区, 论坛`,
        markdownUrl,
        jsonLd: [
          ...graphBase,
          webpage(route, { title, description }, ctx, {
            "@type": ["WebPage", "CollectionPage"],
            breadcrumb: { "@id": `${canonical}#breadcrumb` },
          }),
          {
            ...breadcrumbs(
              [
                { name: SITE_NAME, path: "/" },
                { name: "社区", path: "/community/" },
              ],
              ctx,
            ),
            "@id": `${canonical}#breadcrumb`,
          },
        ],
      };
    }
    case "about": {
      const title = `关于 · ${SITE_NAME}`;
      const description = `关于 Codex Tips 现场手册：使用说明与资料来源，以及主要来源。内容以 2026 年公开资料整理。`;
      const canonical = canonicalUrl(route, ctx);
      return {
        title,
        description,
        canonical,
        robots: ROBOTS_INDEX,
        ogType: "article",
        image,
        keywords: DEFAULT_KEYWORDS,
        markdownUrl,
        jsonLd: [
          ...graphBase,
          webpage(route, { title, description }, ctx, {
            "@type": "AboutPage",
            breadcrumb: { "@id": `${canonical}#breadcrumb` },
          }),
          {
            ...breadcrumbs(
              [
                { name: SITE_NAME, path: "/" },
                { name: "关于", path: "/about/" },
              ],
              ctx,
            ),
            "@id": `${canonical}#breadcrumb`,
          },
        ],
      };
    }
    case "notfound": {
      const title = `未找到 · ${SITE_NAME}`;
      const description = "没有这一页。地址可能写错了，或这条内容已经换了位置。";
      const canonical = canonicalUrl(route, ctx);
      return {
        title,
        description,
        canonical,
        robots: ROBOTS_NOINDEX,
        ogType: "website",
        image,
        keywords: DEFAULT_KEYWORDS,
        jsonLd: [...graphBase, webpage(route, { title, description }, ctx)],
      };
    }
  }
}

export function documentTitle(route: Route): string {
  switch (route.name) {
    case "home":
      return DEFAULT_TITLE;
    case "browse":
      return `目录 · ${SITE_NAME}`;
    case "tip": {
      const tip = tipMap.get(route.id);
      return tip ? `${tip.title} · ${SITE_NAME}` : `未找到 · ${SITE_NAME}`;
    }
    case "cheatsheet":
      return `速查表 · ${SITE_NAME}`;
    case "templates": {
      const current = route.id ? templates.find((item) => item.id === route.id) : undefined;
      return current ? `${current.title} · 模板 · ${SITE_NAME}` : `模板 · ${SITE_NAME}`;
    }
    case "articles":
      return `文章 · ${SITE_NAME}`;
    case "community":
      return `社区 · ${SITE_NAME}`;
    case "about":
      return `关于 · ${SITE_NAME}`;
    case "notfound":
      return `未找到 · ${SITE_NAME}`;
  }
}

export function listPrerenderRoutes(): Route[] {
  const routes: Route[] = [
    { name: "home" },
    { name: "browse", search: "" },
    { name: "cheatsheet" },
    { name: "templates" },
    { name: "articles" },
    { name: "community" },
    { name: "about" },
  ];
  for (const tip of tips) routes.push({ name: "tip", id: tip.id });
  for (const template of templates) routes.push({ name: "templates", id: template.id });
  return routes;
}

export function sitemapEntries(ctx: SiteContext): { loc: string; changefreq: string; priority: string }[] {
  const entries: { loc: string; changefreq: string; priority: string }[] = [
    { loc: absoluteUrl("/", ctx), changefreq: "weekly", priority: "1.0" },
    { loc: absoluteUrl("/tips/", ctx), changefreq: "weekly", priority: "0.9" },
    { loc: absoluteUrl("/cheatsheet/", ctx), changefreq: "weekly", priority: "0.8" },
    { loc: absoluteUrl("/templates/", ctx), changefreq: "weekly", priority: "0.8" },
    { loc: absoluteUrl("/articles/", ctx), changefreq: "weekly", priority: "0.7" },
    { loc: absoluteUrl("/community/", ctx), changefreq: "weekly", priority: "0.7" },
    { loc: absoluteUrl("/about/", ctx), changefreq: "monthly", priority: "0.5" },
  ];
  for (const tip of tips) {
    entries.push({
      loc: absoluteUrl(`/tips/${tip.id}/`, ctx),
      changefreq: "monthly",
      priority: tip.featured ? "0.8" : "0.6",
    });
  }
  for (const template of templates) {
    entries.push({
      loc: absoluteUrl(`/templates/${template.id}/`, ctx),
      changefreq: "monthly",
      priority: "0.5",
    });
  }
  return entries;
}