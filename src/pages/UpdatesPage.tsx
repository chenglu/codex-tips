import { useMemo, useState } from "react";
import { updates } from "../data/updates";
import { EmptyState } from "../components/EmptyState";
import { FeedItem } from "../components/FeedItem";
import { href } from "../lib/routes";

export function UpdatesPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return updates.filter((item) => {
      const haystack = `${item.title} ${item.summary} ${item.from} ${item.to} ${item.tags.join(" ")} ${item.versions.join(" ")}`.toLowerCase();
      return !needle || haystack.includes(needle);
    });
  }, [query]);

  return (
    <div className="article catalog-page">
      <div className="brand-kicker">Release notes</div>
      <h1 className="page-title">更新</h1>
      <p className="note">
        对照 npm 上最近 100 个稳定版 <code>@openai/codex</code>。每篇都来自本机实际执行该版本二进制的{" "}
        <code>--help</code> / <code>features list</code>，再对照 GitHub <code>rust-v*</code>{" "}
        发行说明。动手前仍以本机 <code>/help</code> 为准。
      </p>
      <div className="filters">
        <label>
          检索
          <span className="field-wrap">
            <input
              value={query}
              placeholder="搜索版本、命令、特性…"
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
      <div className="results-meta" aria-live="polite">
        {results.length} 篇 · 共 {updates.length}
      </div>
      {results.length === 0 ? (
        <EmptyState onReset={() => setQuery("")}>没有匹配的更新文章。</EmptyState>
      ) : (
        <div className="feed">
          {results.map((item) => (
            <FeedItem
              key={item.id}
              href={href({ name: "update", id: item.id })}
              kicker={`第 ${String(item.no).padStart(2, "0")} 篇 · ${item.from} → ${item.to}`}
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
