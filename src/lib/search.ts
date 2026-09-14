import { articles } from "../data/articles";
import { community } from "../data/community";
import { templates } from "../data/templates";
import type { CategoryId, Level, Surface, Tip } from "../types";

export interface Filters {
  query: string;
  category: CategoryId | "all";
  level: Level | "all";
  surface: Surface | "all";
}

const surfaceAliases: Record<string, Surface> = {
  cli: "cli",
  tui: "cli",
  app: "app",
  桌面: "app",
  ide: "ide",
  cloud: "cloud",
  ci: "ci",
};

export function emptyFilters(): Filters {
  return { query: "", category: "all", level: "all", surface: "all" };
}

export function parseHashQuery(search: string): Partial<Filters> {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const next: Partial<Filters> = {};
  const q = params.get("q");
  if (q) next.query = q;
  const cat = params.get("cat");
  if (cat) next.category = cat as Filters["category"];
  const level = params.get("level");
  if (level) next.level = level as Filters["level"];
  const surface = params.get("surface");
  if (surface) next.surface = surface as Filters["surface"];
  return next;
}

export function filtersToSearch(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set("q", filters.query.trim());
  if (filters.category !== "all") params.set("cat", filters.category);
  if (filters.level !== "all") params.set("level", filters.level);
  if (filters.surface !== "all") params.set("surface", filters.surface);
  const encoded = params.toString();
  return encoded ? `?${encoded}` : "";
}

function haystack(tip: Tip): string {
  return [
    tip.title,
    tip.summary,
    tip.body,
    tip.id,
    String(tip.no),
    tip.tags.join(" "),
    tip.category,
  ]
    .join("\n")
    .toLowerCase();
}

export function searchTips(tips: Tip[], filters: Filters): Tip[] {
  const query = filters.query.trim().toLowerCase();
  return tips.filter((tip) => {
    if (filters.category !== "all" && tip.category !== filters.category) return false;
    if (filters.level !== "all" && tip.level !== filters.level) return false;
    if (filters.surface !== "all" && !tip.surfaces.includes(filters.surface)) return false;
    if (!query) return true;
    const aliased = surfaceAliases[query];
    if (aliased && tip.surfaces.includes(aliased)) return true;
    return haystack(tip).includes(query);
  });
}

export type SearchHit = {
  kind: "tip" | "article" | "community" | "page";
  title: string;
  summary: string;
  href: string;
  kicker: string;
};

const pageHits: SearchHit[] = [
  {
    kind: "page",
    title: "目录",
    summary: "按章节、难度、入口过滤全部技巧",
    href: "#/tips",
    kicker: "页面",
  },
  {
    kind: "page",
    title: "速查表",
    summary: "启动、TUI、斜杠命令、旗标与 exec",
    href: "#/cheatsheet",
    kicker: "页面",
  },
  {
    kind: "page",
    title: "模板",
    summary: "AGENTS.md、config、hooks、终端与 CI 骨架",
    href: "#/templates",
    kicker: "页面",
  },
  {
    kind: "page",
    title: "文章",
    summary: "官方文档、教程、清单与示例仓库",
    href: "#/articles",
    kicker: "页面",
  },
  {
    kind: "page",
    title: "社区",
    summary: "X、论坛和刚出现的用法",
    href: "#/community",
    kicker: "页面",
  },
  {
    kind: "page",
    title: "关于",
    summary: "这本手册怎么用、如何补一条",
    href: "#/about",
    kicker: "页面",
  },
];

export function searchCatalog(query: string, tips: Tip[], limit = 12): SearchHit[] {
  const needle = query.trim().toLowerCase();
  const hits: SearchHit[] = [];

  if (!needle) {
    hits.push(...pageHits);
    const featured = tips.filter((tip) => tip.featured);
    const starter = featured.length > 0 ? featured : tips.slice(0, 6);
    for (const tip of starter) {
      hits.push({
        kind: "tip",
        title: tip.title,
        summary: tip.summary,
        href: `#/tips/${tip.id}`,
        kicker: `TIP ${String(tip.no).padStart(3, "0")}`,
      });
    }
    return hits.slice(0, limit);
  }

  for (const page of pageHits) {
    const text = `${page.title} ${page.summary} ${page.kicker}`.toLowerCase();
    if (text.includes(needle)) hits.push(page);
  }

  for (const tip of searchTips(tips, {
    query,
    category: "all",
    level: "all",
    surface: "all",
  })) {
    hits.push({
      kind: "tip",
      title: tip.title,
      summary: tip.summary,
      href: `#/tips/${tip.id}`,
      kicker: `TIP ${String(tip.no).padStart(3, "0")}`,
    });
  }

  for (const item of templates) {
    const text = `${item.title} ${item.filename} ${item.summary}`.toLowerCase();
    if (!text.includes(needle)) continue;
    hits.push({
      kind: "page",
      title: item.title,
      summary: item.summary,
      href: `#/templates/${item.id}`,
      kicker: `模板 · ${item.filename}`,
    });
  }

  for (const article of articles) {
    const text = `${article.title} ${article.source} ${article.summary} ${article.tags.join(" ")}`.toLowerCase();
    if (!text.includes(needle)) continue;
    hits.push({
      kind: "article",
      title: article.title,
      summary: article.summary,
      href: article.url,
      kicker: `文章 · ${article.source}`,
    });
  }

  for (const item of community) {
    const text = `${item.title} ${item.source} ${item.summary} ${item.tags.join(" ")}`.toLowerCase();
    if (!text.includes(needle)) continue;
    hits.push({
      kind: "community",
      title: item.title,
      summary: item.summary,
      href: item.url,
      kicker: `社区 · ${item.kind}`,
    });
  }

  return hits.slice(0, limit);
}
