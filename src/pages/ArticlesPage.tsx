import { useMemo, useState } from "react";
import { articles, type ArticleKind } from "../data/articles";
import { EmptyState } from "../components/EmptyState";
import { FeedItem } from "../components/FeedItem";

const kinds: Array<"全部" | ArticleKind> = ["全部", "官方", "教程", "清单", "仓库"];
const langs: Array<"全部" | "中文" | "英文"> = ["全部", "中文", "英文"];

export function ArticlesPage() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<(typeof kinds)[number]>("全部");
  const [lang, setLang] = useState<(typeof langs)[number]>("全部");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.filter((article) => {
      const haystack = `${article.title} ${article.source} ${article.summary} ${article.tags.join(" ")}`.toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      const matchesKind = kind === "全部" || article.kind === kind;
      const matchesLang = lang === "全部" || article.lang === lang;
      return matchesQuery && matchesKind && matchesLang;
    });
  }, [query, kind, lang]);

  const reset = () => {
    setQuery("");
    setKind("全部");
    setLang("全部");
  };

  return (
    <div className="article catalog-page">
      <div className="brand-kicker">Reading list</div>
      <h1 className="page-title">文章</h1>
      <p className="note">
        收录标准：能教会你怎么用 Codex，或能让它明显更好用。本站只写摘要，完整内容请读原文。
      </p>
      <div className="filters">
        <label>
          检索
          <span className="field-wrap">
            <input
              value={query}
              placeholder="搜索文章、来源、标签…"
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
      <div className="filter-label">类型</div>
      <div className="chip-row">
        {kinds.map((item) => (
          <button
            key={item}
            type="button"
            className={item === kind ? "chip is-on" : "chip"}
            aria-pressed={item === kind}
            onClick={() => setKind(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="filter-label">语言</div>
      <div className="chip-row">
        {langs.map((item) => (
          <button
            key={item}
            type="button"
            className={item === lang ? "chip is-on" : "chip"}
            aria-pressed={item === lang}
            onClick={() => setLang(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="results-meta" aria-live="polite">
        {results.length} 篇 · 共 {articles.length}
      </div>
      {results.length === 0 ? (
        <EmptyState onReset={reset}>没有匹配的文章。</EmptyState>
      ) : (
        <div className="feed">
          {results.map((article) => (
            <FeedItem
              key={article.url}
              href={article.url}
              kicker={`${article.source} · ${article.kind} · ${article.lang}`}
              title={article.title}
              summary={article.summary}
              tags={article.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
}
