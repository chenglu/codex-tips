import { useEffect } from "react";
import { Markdown } from "../components/Markdown";
import { TipCard } from "../components/TipCard";
import { categoryMap } from "../data/categories";
import { relatedTips, tipMap, tips } from "../data/tips";
import { href } from "../lib/routes";
import { levelLabel, surfaceLabel } from "../lib/labels";

export function TipPage({ id }: { id: string }) {
  const tip = tipMap.get(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!tip) {
    return (
      <div className="article">
        <div className="brand-kicker">Missing leaf</div>
        <h1 className="page-title">没有这条技巧</h1>
        <p className="lede">它可能换了编号，或还没写进这本手册。</p>
        <div className="hero-actions">
          <a className="btn" href={href({ name: "browse", search: "" })}>
            回到目录
          </a>
        </div>
      </div>
    );
  }

  const category = categoryMap[tip.category];
  const related = relatedTips(tip);
  const index = tips.findIndex((item) => item.id === tip.id);
  const prev = index > 0 ? tips[index - 1] : undefined;
  const next = index >= 0 && index < tips.length - 1 ? tips[index + 1] : undefined;

  return (
    <article className="article">
      <header>
        <nav className="crumbs" aria-label="面包屑">
          <a href={href({ name: "browse", search: "" })}>目录</a>
          <span aria-hidden="true">/</span>
          <a href={href({ name: "browse", search: `?cat=${tip.category}` })}>
            CH {category.chapter} {category.name}
          </a>
          <span aria-hidden="true">/</span>
          <span>TIP {String(tip.no).padStart(3, "0")}</span>
        </nav>
        <div className="kicker">
          <span>TIP {String(tip.no).padStart(3, "0")}</span>
          <span className={`chip level-${tip.level}`}>{levelLabel[tip.level]}</span>
          <a href={href({ name: "browse", search: `?cat=${tip.category}` })}>{category.name}</a>
          {tip.surfaces.map((surface) => (
            <a
              key={surface}
              className="chip"
              href={href({ name: "browse", search: `?surface=${surface}` })}
            >
              {surfaceLabel[surface]}
            </a>
          ))}
        </div>
        <h1>{tip.title}</h1>
        <p className="lede">{tip.summary}</p>
      </header>
      <Markdown source={tip.body} />
      <section className="sources">
        <h2>来源</h2>
        <ul>
          {tip.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
      {related.length > 0 && (
        <section className="related">
          <h2>接着读</h2>
          <div className="grid">
            {related.map((item) => (
              <TipCard key={item.id} tip={item} />
            ))}
          </div>
        </section>
      )}
      <nav className={`pager${prev && next ? "" : " pager-single"}`} aria-label="相邻技巧">
        {prev ? (
          <a href={href({ name: "tip", id: prev.id })}>
            <span className="dir">上一条</span>
            <strong>{prev.title}</strong>
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a className="next" href={href({ name: "tip", id: next.id })}>
            <span className="dir">下一条</span>
            <strong>{next.title}</strong>
          </a>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
