import { useEffect, useMemo, useState } from "react";
import { templates } from "../data/templates";
import { EmptyState } from "../components/EmptyState";
import { copyText } from "../lib/copy";
import { href } from "../lib/routes";
import { templateGroupId, templateGroupMeta, type TemplateGroupId } from "../lib/template-groups";

export function TemplatesPage({ id }: { id?: string }) {
  const current = templates.find((item) => item.id === id) ?? templates[0];
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<TemplateGroupId | "all">("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return templates.filter((item) => {
      const matchesGroup = group === "all" || templateGroupId(item) === group;
      if (!matchesGroup) return false;
      if (!needle) return true;
      const haystack = `${item.title} ${item.filename} ${item.summary}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, group]);

  const grouped = useMemo(() => {
    return templateGroupMeta
      .map((meta) => ({
        ...meta,
        items: filtered.filter((item) => templateGroupId(item) === meta.id),
      }))
      .filter((item) => item.items.length > 0);
  }, [filtered]);

  useEffect(() => {
    document
      .querySelector<HTMLElement>(".template-list a.is-active")
      ?.scrollIntoView({ block: "nearest" });
  }, [current.id]);

  const copy = async () => {
    await copyText(current.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="layout">
      <aside className="side">
        <div className="brand-kicker">Snippets</div>
        <h2 className="side-title">模板</h2>
        <div className="filters">
          <label>
            检索
            <span className="field-wrap">
              <input
                value={query}
                placeholder="文件名、标题…"
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
        <div className="chip-row compact">
          <button
            type="button"
            className={group === "all" ? "chip is-on" : "chip"}
            aria-pressed={group === "all"}
            onClick={() => setGroup("all")}
          >
            全部 {templates.length}
          </button>
          {templateGroupMeta.map((item) => (
            <button
              key={item.id}
              type="button"
              className={group === item.id ? "chip is-on" : "chip"}
              aria-pressed={group === item.id}
              onClick={() => setGroup(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="results-meta">
          {filtered.length} 条
          {query.trim() ? ` · 匹配「${query.trim()}」` : ""}
        </div>
        <div className="template-list">
          {grouped.length === 0 ? (
            <EmptyState
              onReset={() => {
                setQuery("");
                setGroup("all");
              }}
            >
              没有匹配的模板。
            </EmptyState>
          ) : (
            grouped.map((section) => (
              <div key={section.id} className="template-group">
                <div className="template-group-label">
                  {section.label} · {section.items.length}
                </div>
                {section.items.map((item) => (
                  <a
                    key={item.id}
                    className={item.id === current.id ? "is-active" : undefined}
                    href={href({ name: "templates", id: item.id })}
                  >
                    <strong>{item.title}</strong>
                    <div className="template-file">{item.filename}</div>
                  </a>
                ))}
              </div>
            ))
          )}
        </div>
      </aside>
      <section className="article">
        <div className="template-head">
          <div>
            <h1 className="page-title">{current.title}</h1>
            <p className="lede">{current.summary}</p>
          </div>
        </div>
        <div className="code-frame">
          <div className="code-frame-bar">
            <span>{current.filename}</span>
            <button className="copy-btn" type="button" onClick={() => void copy()} aria-live="polite">
              {copied ? "已复制" : "复制"}
            </button>
          </div>
          <pre>
            <code>{current.code}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
