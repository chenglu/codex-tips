import { useEffect, useMemo, useRef, useState } from "react";
import { tips } from "../data/tips";
import { searchCatalog } from "../lib/search";
import { EmptyState } from "./EmptyState";

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => searchCatalog(query, tips, 12), [query]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const onTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const nodes = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      ];
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onTab);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onTab);
      previous?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((value) => Math.min(value + 1, Math.max(results.length - 1, 0)));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((value) => Math.max(value - 1, 0));
      }
      if (event.key === "Enter" && results[active]) {
        event.preventDefault();
        const hit = results[active];
        if (hit.href.startsWith("#")) {
          window.location.hash = hit.href.replace(/^#/, "");
        } else {
          window.open(hit.href, "_blank", "noreferrer");
        }
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, results, active]);

  useEffect(() => {
    document.getElementById(`search-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <button className="modal-scrim" type="button" tabIndex={-1} aria-label="关闭检索" onClick={onClose} />
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
      >
        <div className="modal-head">
          <h2 id="search-title" className="sr-only">
            检索手册
          </h2>
          <input
            ref={inputRef}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `search-opt-${active}` : undefined}
            placeholder="搜索技巧、模板、文章、社区动态…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className="icon-btn modal-close" type="button" onClick={onClose}>
            Esc
          </button>
        </div>
        <div id="search-results" className="modal-list" role="listbox">
          {results.map((hit, index) => (
            <a
              id={`search-opt-${index}`}
              key={`${hit.kind}-${hit.href}-${hit.title}`}
              role="option"
              aria-selected={index === active}
              className={index === active ? "is-active" : undefined}
              href={hit.href}
              target={hit.href.startsWith("#") ? undefined : "_blank"}
              rel={hit.href.startsWith("#") ? undefined : "noreferrer"}
              onMouseEnter={() => setActive(index)}
              onClick={onClose}
            >
              <div className="kicker">{hit.kicker}</div>
              <div className="modal-hit-title">{hit.title}</div>
              <div className="modal-hit-summary">{hit.summary}</div>
            </a>
          ))}
          {results.length === 0 && (
            <EmptyState>没有匹配。试试 AGENTS.md、/plan、sandbox、exec。</EmptyState>
          )}
        </div>
        <div className="modal-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> 移动
          </span>
          <span>
            <kbd>Enter</kbd> 打开
          </span>
          <span>
            <kbd>Esc</kbd> 关闭
          </span>
        </div>
      </div>
    </div>
  );
}
