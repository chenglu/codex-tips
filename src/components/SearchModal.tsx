import { useEffect, useMemo, useState } from "react";
import { tips } from "../data/tips";
import { href } from "../lib/routes";
import { searchTips } from "../lib/search";

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(
    () =>
      searchTips(tips, {
        query,
        category: "all",
        level: "all",
        surface: "all",
      }).slice(0, 10),
    [query],
  );

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
        window.location.hash = href({ name: "tip", id: results[active].id });
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
        aria-label="搜索技巧"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          autoFocus
          placeholder="搜索技巧、命令、配置键…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="modal-list">
          {results.map((tip, index) => (
            <a
              key={tip.id}
              className={index === active ? "is-active" : undefined}
              href={href({ name: "tip", id: tip.id })}
              onClick={onClose}
            >
              <div className="kicker">
                TIP {String(tip.no).padStart(3, "0")} · {tip.title}
              </div>
              <div style={{ color: "var(--muted)", fontSize: 14 }}>{tip.summary}</div>
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
