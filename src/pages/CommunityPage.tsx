import { useMemo, useState } from "react";
import { community, type CommunityKind } from "../data/community";
import { EmptyState } from "../components/EmptyState";
import { FeedItem } from "../components/FeedItem";

const filters: Array<"全部" | CommunityKind> = ["全部", "X", "新闻", "论坛"];

export function CommunityPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");
  const sorted = useMemo(
    () => [...community].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [],
  );

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sorted.filter((item) => {
      const haystack = `${item.title} ${item.source} ${item.summary} ${item.tags.join(" ")} ${item.kind}`.toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      const matchesFilter = filter === "全部" || item.kind === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter, sorted]);

  const reset = () => {
    setQuery("");
    setFilter("全部");
  };

  return (
    <div className="article catalog-page">
      <div className="brand-kicker">Field notes</div>
      <h1 className="page-title">社区</h1>
      <p className="note">
        社交媒体和论坛里刚出现的用法、版本变化和踩坑。操作前仍以官方文档和本机 <code>/help</code>{" "}
        为准。
      </p>
      <div className="filters">
        <label>
          检索
          <span className="field-wrap">
            <input
              value={query}
              placeholder="搜索社区动态…"
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
      <div className="chip-row">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={item === filter ? "chip is-on" : "chip"}
            aria-pressed={item === filter}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="results-meta" aria-live="polite">
        {results.length} 条 · 共 {community.length}
      </div>
      {results.length === 0 ? (
        <EmptyState onReset={reset}>没有匹配的动态。</EmptyState>
      ) : (
        <div className="feed">
          {results.map((item) => (
            <FeedItem
              key={item.url}
              href={item.url}
              kicker={`${item.source} · ${item.kind} · ${item.date}`}
              title={item.title}
              summary={item.summary}
              tags={item.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
}
