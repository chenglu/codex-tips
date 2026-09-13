import { useEffect, useMemo, useState } from "react";
import { cheatSections } from "../data/cheatsheet";
import { EmptyState } from "../components/EmptyState";
import { copyText } from "../lib/copy";
import { href } from "../lib/routes";

export function CheatsheetPage({ search = "" }: { search?: string }) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const sectionParam = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search,
  ).get("sec");

  const sections = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return cheatSections
      .map((section) => ({
        ...section,
        rows: needle
          ? section.rows.filter(
              (row) =>
                row.cmd.toLowerCase().includes(needle) ||
                row.meaning.toLowerCase().includes(needle),
            )
          : section.rows,
      }))
      .filter((section) => section.rows.length > 0);
  }, [query]);

  const totalRows = sections.reduce((sum, section) => sum + section.rows.length, 0);

  useEffect(() => {
    if (!sectionParam) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`cheat-${sectionParam}`)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [sectionParam]);

  const copyCmd = async (cmd: string) => {
    await copyText(cmd);
    setCopied(cmd);
    window.setTimeout(() => {
      setCopied((value) => (value === cmd ? null : value));
    }, 1400);
  };

  return (
    <div className="cheat-page">
      <div className="brand-kicker">Quick Reference</div>
      <h1 className="page-title">速查表</h1>
      <p className="note">
        命令随 CLI 版本变化。以你机器上 <code>/help</code> 和 <code>codex --help</code>{" "}
        为准。本表对齐 2026 年中后期的稳定面。点命令即可复制。
      </p>
      <div className="filters" style={{ maxWidth: 420 }}>
        <label>
          过滤本表
          <span className="field-wrap">
            <input
              value={query}
              placeholder="搜索命令或说明…"
              onChange={(event) => setQuery(event.target.value)}
            />
            {query ? (
              <button
                className="field-clear"
                type="button"
                aria-label="清空过滤"
                onClick={() => setQuery("")}
              >
                ×
              </button>
            ) : null}
          </span>
        </label>
      </div>
      <div className="results-meta" aria-live="polite">
        {totalRows} 条
        {query.trim() ? ` · 匹配「${query.trim()}」` : ""}
      </div>
      {sections.length === 0 ? (
        <EmptyState onReset={() => setQuery("")}>没有匹配的命令。</EmptyState>
      ) : (
        <div className="cheat-layout">
          <nav className="cheat-toc" aria-label="速查章节">
            {sections.map((section) => (
              <a
                key={section.id}
                className={sectionParam === section.id ? "is-active" : undefined}
                href={href({ name: "cheatsheet", search: `?sec=${section.id}` })}
              >
                {section.title}
              </a>
            ))}
          </nav>
          <div className="cheat">
            {sections.map((section) => (
              <section key={section.id} id={`cheat-${section.id}`} className="cheat-section">
                <h2>{section.title}</h2>
                <table className="cheat-table">
                  <tbody>
                    {section.rows.map((row) => (
                      <tr key={row.cmd}>
                        <td>
                          <button
                            type="button"
                            className="cheat-cmd"
                            title="复制命令"
                            onClick={() => void copyCmd(row.cmd)}
                          >
                            <code>{row.cmd}</code>
                            <span className="cheat-copy-hint">
                              {copied === row.cmd ? "已复制" : "复制"}
                            </span>
                          </button>
                        </td>
                        <td>{row.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
