import { useMemo, useState } from "react";
import { articles, type ArticleKind } from "../data/articles";

const filters: Array<"全部" | ArticleKind | "中文" | "英文"> = [
  "全部",
  "官方",
  "教程",
  "清单",
  "仓库",
  "中文",
  "英文",
];

export function ArticlesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.filter((article) => {
      const haystack = `${article.title} ${article.source} ${article.summary} ${article.tags.join(" ")} ${article.kind} ${article.lang}`.toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      const matchesFilter =
        filter === "全部" ||
        article.kind === filter ||
        article.lang === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <div className="article" style={{ maxWidth: 880 }}>
      <div className="brand-kicker">Reading list</div>
      <h1 className="page-title">文章</h1>
      <p className="note">
        收录标准：能教会你怎么用 Codex，或能让它明显更好用。本站只写摘要，完整内容请读原文。
      </p>
      <div className="filters" style={{ marginBottom: 22 }}>
        <label>
          检索
          <input
            value={query}
            placeholder="搜索文章、来源、标签…"
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
        {results.length} 篇 · 共 {articles.length}
      </div>
      {results.length === 0 ? (
        <div className="empty">没有匹配的文章。</div>
      ) : (
        <div className="feed">
          {results.map((article) => (
            <a
              key={article.url}
              className="feed-item"
              href={article.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="kicker">
                {article.source} · {article.kind} · {article.lang}
              </div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
