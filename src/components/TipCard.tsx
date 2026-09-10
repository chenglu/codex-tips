import type { Tip } from "../types";
import { categoryMap } from "../data/categories";
import { href } from "../lib/routes";

const levelLabel = {
  starter: "入门",
  intermediate: "进阶",
  advanced: "高阶",
};

export function TipCard({ tip }: { tip: Tip }) {
  const category = categoryMap[tip.category];
  return (
    <a className="tip-card" href={href({ name: "tip", id: tip.id })}>
      <div className="kicker">
        <span>TIP {String(tip.no).padStart(3, "0")}</span>
        <span className={`chip level-${tip.level}`}>{levelLabel[tip.level]}</span>
        <span>{category.name}</span>
      </div>
      <h3>{tip.title}</h3>
      <p>{tip.summary}</p>
    </a>
  );
}
