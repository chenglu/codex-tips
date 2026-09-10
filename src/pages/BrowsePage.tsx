import { useMemo } from "react";
import { categories } from "../data/categories";
import { tips } from "../data/tips";
import { TipCard } from "../components/TipCard";
import { href } from "../lib/routes";
import {
  emptyFilters,
  filtersToSearch,
  parseHashQuery,
  searchTips,
  type Filters,
} from "../lib/search";
import type { CategoryId, Level, Surface } from "../types";

const levels: { id: Level | "all"; label: string }[] = [
  { id: "all", label: "全部难度" },
  { id: "starter", label: "入门" },
  { id: "intermediate", label: "进阶" },
  { id: "advanced", label: "高阶" },
];

const surfaces: { id: Surface | "all"; label: string }[] = [
  { id: "all", label: "全部入口" },
  { id: "cli", label: "CLI" },
  { id: "app", label: "桌面 App" },
  { id: "ide", label: "IDE" },
  { id: "cloud", label: "Cloud" },
  { id: "ci", label: "CI" },
];

export function BrowsePage({ search }: { search: string }) {
  const filters: Filters = {
    ...emptyFilters(),
    ...parseHashQuery(search),
  };

  const results = useMemo(() => searchTips(tips, filters), [filters]);

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    const nextHash = href({ name: "browse", search: filtersToSearch(next) });
    window.history.replaceState(null, "", nextHash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  return (
    <div className="layout">
      <aside className="side">
        <div className="brand-kicker">Index</div>
        <h2 className="side-title">目录</h2>
        <div className="filters">
          <label>
            检索
            <input
              value={filters.query}
              placeholder="AGENTS.md、/plan、exec…"
              onChange={(event) => update({ query: event.target.value })}
            />
          </label>
          <label>
            难度
            <select
              value={filters.level}
              onChange={(event) => update({ level: event.target.value as Filters["level"] })}
            >
              {levels.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            入口
            <select
              value={filters.surface}
              onChange={(event) =>
                update({ surface: event.target.value as Filters["surface"] })
              }
            >
              {surfaces.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <nav className="cat-list">
          <a
            className={filters.category === "all" ? "is-active" : undefined}
            href={href({
              name: "browse",
              search: filtersToSearch({ ...filters, category: "all" }),
            })}
          >
            全部章节
          </a>
          {categories.map((category) => (
            <a
              key={category.id}
              className={filters.category === category.id ? "is-active" : undefined}
              href={href({
                name: "browse",
                search: filtersToSearch({
                  ...filters,
                  category: category.id as CategoryId,
                }),
              })}
            >
              {category.chapter} {category.name}
            </a>
          ))}
        </nav>
      </aside>
      <section>
        <div className="results-meta">
          {results.length} 条 · 共 {tips.length}
        </div>
        {results.length === 0 ? (
          <div className="empty">没有匹配。清空筛选，或换一个更短的词。</div>
        ) : (
          <div className="grid">
            {results.map((tip) => (
              <TipCard key={tip.id} tip={tip} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
