import { useEffect, useMemo, useRef, useState } from "react";
import { categories } from "../data/categories";
import { tips } from "../data/tips";
import { EmptyState } from "../components/EmptyState";
import { TipCard } from "../components/TipCard";
import { href } from "../lib/routes";
import { useMedia } from "../lib/hooks";
import { levelLabel, surfaceLabel } from "../lib/labels";
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
  { id: "starter", label: levelLabel.starter },
  { id: "intermediate", label: levelLabel.intermediate },
  { id: "advanced", label: levelLabel.advanced },
];

const surfaces: { id: Surface | "all"; label: string }[] = [
  { id: "all", label: "全部入口" },
  { id: "cli", label: surfaceLabel.cli },
  { id: "app", label: surfaceLabel.app },
  { id: "ide", label: surfaceLabel.ide },
  { id: "cloud", label: surfaceLabel.cloud },
  { id: "ci", label: surfaceLabel.ci },
];

const categoryCounts: Record<string, number> = {};
for (const tip of tips) {
  categoryCounts[tip.category] = (categoryCounts[tip.category] ?? 0) + 1;
}

function writeFilters(next: Filters) {
  const nextHash = href({ name: "browse", search: filtersToSearch(next) });
  window.history.replaceState(null, "", nextHash);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function BrowsePage({ search }: { search: string }) {
  const urlFilters: Filters = {
    ...emptyFilters(),
    ...parseHashQuery(search),
  };
  const [query, setQuery] = useState(urlFilters.query);
  const skipQuerySync = useRef(false);
  const wide = useMedia("(min-width: 961px)");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const showExtraFilters = wide || filtersOpen;

  useEffect(() => {
    if (skipQuerySync.current) {
      skipQuerySync.current = false;
      return;
    }
    setQuery(urlFilters.query);
  }, [urlFilters.query]);

  const urlFiltersRef = useRef(urlFilters);
  urlFiltersRef.current = urlFilters;

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const current = urlFiltersRef.current;
      if (query.trim() === current.query.trim()) return;
      skipQuerySync.current = true;
      writeFilters({ ...current, query });
    }, 220);
    return () => window.clearTimeout(handle);
  }, [query]);

  const filters: Filters = { ...urlFilters, query };
  const results = useMemo(() => {
    return searchTips(tips, { ...urlFilters, query });
  }, [query, urlFilters.category, urlFilters.level, urlFilters.surface, urlFilters.query]);
  const hasFilters =
    filters.category !== "all" ||
    filters.level !== "all" ||
    filters.surface !== "all" ||
    filters.query.trim() !== "";

  const apply = (patch: Partial<Filters>) => {
    writeFilters({ ...filters, ...patch });
  };

  const reset = () => {
    setQuery("");
    skipQuerySync.current = true;
    writeFilters(emptyFilters());
  };

  return (
    <div className="layout">
      <aside className="side">
        <div className="brand-kicker">Index</div>
        <h2 className="side-title">目录</h2>
        <div className="filters">
          <label>
            检索
            <span className="field-wrap">
              <input
                value={query}
                placeholder="AGENTS.md、/plan、exec…"
                onChange={(event) => setQuery(event.target.value)}
              />
              {query ? (
                <button
                  className="field-clear"
                  type="button"
                  aria-label="清空检索"
                  onClick={() => setQuery("")}
                >
                  ×
                </button>
              ) : null}
            </span>
          </label>
        </div>
        {!wide && (
          <button
            className="filter-toggle"
            type="button"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((value) => !value)}
          >
            {filtersOpen ? "收起筛选与章节" : "筛选与章节"}
          </button>
        )}
        {showExtraFilters && (
          <>
            <div className="filters">
              <div>
                <span className="filter-label">难度</span>
                <div className="chip-row compact">
                  {levels.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={item.id === filters.level ? "chip is-on" : "chip"}
                      aria-pressed={item.id === filters.level}
                      onClick={() => apply({ level: item.id })}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="filter-label">入口</span>
                <div className="chip-row compact">
                  {surfaces.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={item.id === filters.surface ? "chip is-on" : "chip"}
                      aria-pressed={item.id === filters.surface}
                      onClick={() => apply({ surface: item.id })}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <nav className="cat-list" aria-label="章节">
              <a
                className={filters.category === "all" ? "is-active" : undefined}
                href={href({
                  name: "browse",
                  search: filtersToSearch({ ...filters, category: "all" }),
                })}
              >
                全部章节
                <span className="count">{tips.length}</span>
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
                  <span className="count">{categoryCounts[category.id] ?? 0}</span>
                </a>
              ))}
            </nav>
          </>
        )}
      </aside>
      <section>
        <div className="results-meta" aria-live="polite">
          {results.length} 条 · 共 {tips.length}
        </div>
        {hasFilters && (
          <div className="active-filters">
            {filters.query.trim() ? <span className="chip is-on">检索：{filters.query.trim()}</span> : null}
            {filters.category !== "all" ? (
              <span className="chip is-on">
                {categories.find((item) => item.id === filters.category)?.name}
              </span>
            ) : null}
            {filters.level !== "all" ? (
              <span className={`chip is-on level-${filters.level}`}>{levelLabel[filters.level]}</span>
            ) : null}
            {filters.surface !== "all" ? (
              <span className="chip is-on">{surfaceLabel[filters.surface]}</span>
            ) : null}
            <button className="chip" type="button" onClick={reset}>
              清空
            </button>
          </div>
        )}
        {results.length === 0 ? (
          <EmptyState onReset={reset}>没有匹配。清空筛选，或换一个更短的词。</EmptyState>
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
