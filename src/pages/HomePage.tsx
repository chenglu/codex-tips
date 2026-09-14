import { categories } from "../data/categories";
import { articles } from "../data/articles";
import { community } from "../data/community";
import { featuredTips, tips } from "../data/tips";
import { siteFaqs } from "../lib/faq";
import { href } from "../lib/routes";
import { TipCard } from "../components/TipCard";
import { FeedItem } from "../components/FeedItem";

const categoryCounts: Record<string, number> = {};
for (const tip of tips) {
  categoryCounts[tip.category] = (categoryCounts[tip.category] ?? 0) + 1;
}

const highlights = featuredTips.length > 0 ? featuredTips.slice(0, 6) : tips.slice(0, 6);

export function HomePage() {
  const latestCommunity = [...community].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div>
          <div className="brand-kicker">Field Manual · 2026 Edition</div>
          <h1>
            OpenAI Codex
            <br />
            实用技巧 <em>手册</em>
          </h1>
          <p className="lede">
            按使用场景整理 CLI、桌面端、IDE 与 Cloud 的常用技巧，涵盖提示、配置、
            Skills、MCP 与自动化。查找操作方法、复制模板，或阅读相关资料。
          </p>
          <div className="hero-actions">
            <a className="btn" href={href({ name: "browse", search: "" })}>
              打开目录
            </a>
            <a className="btn btn-ghost" href={href({ name: "cheatsheet" })}>
              打开速查
            </a>
          </div>
          <div className="meta-row">
            <span>{tips.length} 条技巧</span>
            <span>{articles.length} 篇文章</span>
            <span>{community.length} 条社区动态</span>
            <span>按 / 或 ⌘K 检索</span>
          </div>
        </div>
        <div className="stack">
          <div className="stack-item">
            <b>持久规则</b>
            <span>写进 AGENTS.md，而不是每次提示里复制。</span>
          </div>
          <div className="stack-item">
            <b>运行时</b>
            <span>config.toml 管模型、沙箱、MCP 与 profile。</span>
          </div>
          <div className="stack-item">
            <b>重复流程</b>
            <span>收成 Skill；要分发就打成 Plugin。</span>
          </div>
          <div className="stack-item">
            <b>仓库之外</b>
            <span>Issue、监控、设计稿走 MCP，不要粘贴过期上下文。</span>
          </div>
          <div className="stack-item">
            <b>稳定流程</b>
            <span>交给 exec、Cloud 或定时任务。</span>
          </div>
        </div>
      </section>

      <div className="section-block">
        <div className="section-head">
          <h2>章节</h2>
          <a href={href({ name: "browse", search: "" })}>全部目录 →</a>
        </div>
        <div className="chapters">
          {categories.map((category) => (
            <a
              key={category.id}
              className="chapter"
              href={href({ name: "browse", search: `?cat=${category.id}` })}
            >
              <div className="no">CH {category.chapter}</div>
              <h3>{category.name}</h3>
              <p>{category.blurb}</p>
              <div className="count">{categoryCounts[category.id] ?? 0} 条</div>
            </a>
          ))}
        </div>
      </div>

      <div className="section-block">
        <div className="section-head">
          <h2>先读这几条</h2>
          <a href={href({ name: "browse", search: "" })}>进入目录 →</a>
        </div>
        <div className="grid">
          {highlights.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </div>

      <div className="section-block">
        <div className="section-head">
          <h2>社区刚在说什么</h2>
          <a href={href({ name: "community" })}>全部动态 →</a>
        </div>
        <div className="feed">
          {latestCommunity.map((item) => (
            <FeedItem
              key={item.url}
              href={item.url}
              kicker={`${item.source} · ${item.kind} · ${item.date}`}
              title={item.title}
              summary={item.summary}
              tags={item.tags}
            />
          ))}
        </div>
      </div>

      <div className="section-block">
        <div className="section-head">
          <h2>常见问题</h2>
          <a href={href({ name: "about" })}>关于手册 →</a>
        </div>
        <dl className="faq">
          {siteFaqs.map((item) => (
            <div key={item.q} className="faq-item">
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
