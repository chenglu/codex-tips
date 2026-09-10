import { useState } from "react";
import { templates } from "../data/templates";
import { href } from "../lib/routes";

export function TemplatesPage({ id }: { id?: string }) {
  const current = templates.find((item) => item.id === id) ?? templates[0];
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(current.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="layout">
      <aside className="side">
        <div className="brand-kicker">Snippets</div>
        <h2 className="page-title">模板</h2>
        <div className="template-list">
          {templates.map((item) => (
            <a
              key={item.id}
              className={item.id === current.id ? "is-active" : undefined}
              href={href({ name: "templates", id: item.id })}
            >
              <strong>{item.title}</strong>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{item.filename}</div>
            </a>
          ))}
        </div>
      </aside>
      <section className="article">
        <div className="template-head">
          <div>
            <h1 className="page-title">{current.title}</h1>
            <p className="lede">{current.summary}</p>
          </div>
          <button className="copy-btn" type="button" onClick={copy}>
            {copied ? "已复制" : "复制"}
          </button>
        </div>
        <pre>
          <code>{current.code}</code>
        </pre>
      </section>
    </div>
  );
}
