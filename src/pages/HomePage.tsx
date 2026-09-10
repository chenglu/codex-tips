import { categories } from "../data/categories";
import { featuredTips, tips } from "../data/tips";
import { href } from "../lib/routes";
import { TipCard } from "../components/TipCard";

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <div className="brand-kicker">Field Manual · 2026 Edition</div>
          <h1>
            全网 Codex
            <br />
            实用技巧 <em>手册</em>
          </h1>
          <p className="lede">
            把 OpenAI Codex 从「会聊天的补全」用成可配置的工程队友。这里按场景收了
            CLI、桌面端、IDE 与 Cloud 上真正能省时间的操作法——提示、AGENTS.md、沙箱、斜杠命令、Skills、MCP、子代理与自动化。
          </p>
          <div className="meta-row">
            <span>{tips.length} 条技巧</span>
            <span>{categories.length} 个章节</span>
            <span>按 / 键检索</span>
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

      <div className="section-head">
        <h2>先读这几条</h2>
        <a href={href({ name: "browse", search: "" })}>进入目录 →</a>
      </div>
      <div className="grid">
        {featuredTips.slice(0, 6).map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </div>

      <div className="section-head" style={{ marginTop: 48 }}>
        <h2>章节</h2>
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
          </a>
        ))}
      </div>
    </>
  );
}
