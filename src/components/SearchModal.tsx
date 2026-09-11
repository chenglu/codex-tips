import { useEffect, useMemo, useState } from "react";
import { tips } from "../data/tips";
import { searchCatalog } from "../lib/search";

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => searchCatalog(query, tips, 10), [query]);

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

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-label="搜索手册"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          autoFocus
          placeholder="搜索技巧、文章、社区动态…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="modal-list">
          {results.map((hit, index) => (
            <a
              key={`${hit.kind}-${hit.href}`}
              className={index === active ? "is-active" : undefined}
              href={hit.href}
              target={hit.href.startsWith("#") ? undefined : "_blank"}
              rel={hit.href.startsWith("#") ? undefined : "noreferrer"}
              onClick={onClose}
            >
              <div className="kicker">
                {hit.kicker} · {hit.title}
              </div>
              <div style={{ color: "var(--muted)", fontSize: 14 }}>{hit.summary}</div>
            </a>
          ))}
          {results.length === 0 && (
            <div className="empty" style={{ padding: 16 }}>
              没有匹配。试试 AGENTS.md、/plan、sandbox、exec。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
