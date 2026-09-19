import { useEffect } from "react";
import { Markdown } from "../components/Markdown";
import { updateMap, updates } from "../data/updates";
import { href } from "../lib/routes";

export function UpdatePage({ id }: { id: string }) {
  const article = updateMap.get(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="article">
        <div className="brand-kicker">Missing leaf</div>
        <h1 className="page-title">没有这篇更新</h1>
        <p className="lede">该文章可能已移动或尚未发布。</p>
        <div className="hero-actions">
          <a className="btn" href={href({ name: "updates" })}>
            回到更新
          </a>
        </div>
      </div>
    );
  }

  const index = updates.findIndex((item) => item.id === article.id);
  const prev = index > 0 ? updates[index - 1] : undefined;
  const next = index >= 0 && index < updates.length - 1 ? updates[index + 1] : undefined;

  return (
    <article className="article">
      <header>
        <nav className="crumbs" aria-label="面包屑">
          <a href={href({ name: "updates" })}>更新</a>
          <span aria-hidden="true">/</span>
          <span>
            {article.from} → {article.to}
          </span>
        </nav>
        <div className="kicker">
          <span>第 {String(article.no).padStart(2, "0")} 篇</span>
          <span>
            {article.versions.length} 个版本 · {article.from} → {article.to}
          </span>
        </div>
        <h1>{article.title}</h1>
        <p className="lede">{article.summary}</p>
      </header>
      <Markdown source={article.body} />
      <section className="sources">
        <h2>来源</h2>
        <ul>
          {article.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
      <nav className={`pager${prev && next ? "" : " pager-single"}`} aria-label="相邻更新">
        {prev ? (
          <a href={href({ name: "update", id: prev.id })}>
            <span className="dir">上一篇</span>
            <strong>{prev.title}</strong>
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a className="next" href={href({ name: "update", id: next.id })}>
            <span className="dir">下一篇</span>
            <strong>{next.title}</strong>
          </a>
        ) : null}
      </nav>
    </article>
  );
}
