import { useMemo, useState } from "react";
import { community, type CommunityKind } from "../data/community";

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

  return (
    <div className="article" style={{ maxWidth: 880 }}>
      <div className="brand-kicker">Field notes</div>
      <h1 className="page-title">社区</h1>
      <p className="note">
        社交媒体和论坛里刚出现的用法、版本变化和踩坑。操作前仍以官方文档和本机{" "}
        <code>/help</code> 为准。
      </p>
      <div className="filters" style={{ marginBottom: 22 }}>
        <label>
          检索
          <input
            value={query}
            placeholder="搜索社区动态…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div className="chip-row">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={item === filter ? "chip is-on" : "chip"}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="results-meta">
        {results.length} 条 · 共 {community.length}
      </div>
      {results.length === 0 ? (
        <div className="empty">没有匹配的动态。</div>
      ) : (
        <div className="feed">
          {results.map((item) => (
            <a
              key={item.url}
              className="feed-item"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="kicker">
                {item.source} · {item.kind} · {item.date}
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
