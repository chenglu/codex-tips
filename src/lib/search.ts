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
  const params = new URLSearchParams(search);
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
