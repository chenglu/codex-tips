import { useEffect } from "react";
import { Markdown } from "../components/Markdown";
import { TipCard } from "../components/TipCard";
import { categoryMap } from "../data/categories";
import { relatedTips, tipMap } from "../data/tips";
import { href } from "../lib/routes";

const levelLabel = {
  starter: "入门",
  intermediate: "进阶",
  advanced: "高阶",
};

export function TipPage({ id }: { id: string }) {
  const tip = tipMap.get(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!tip) {
    return (
      <div className="article">
        <h1 className="page-title">没有这条技巧</h1>
        <p>
          <a href={href({ name: "browse", search: "" })}>回到目录</a>
        </p>
      </div>
    );
  }

  const category = categoryMap[tip.category];
  const related = relatedTips(tip);

  return (
    <article className="article">
      <header>
        <div className="kicker">
          <span>TIP {String(tip.no).padStart(3, "0")}</span>
          <span className={`chip level-${tip.level}`}>{levelLabel[tip.level]}</span>
          <a href={href({ name: "browse", search: `?cat=${tip.category}` })}>
            {category.name}
          </a>
          {tip.surfaces.map((surface) => (
            <span key={surface} className="chip">
              {surface}
            </span>
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
                {source.label}
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
    </article>
  );
}
