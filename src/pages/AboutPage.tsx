export function AboutPage() {
  return (
    <article className="article">
      <div className="brand-kicker">Colophon</div>
      <h1 className="page-title">关于这本手册</h1>
      <p>
        Codex Tips 搜集 OpenAI Codex（CLI、桌面端、IDE 扩展、Cloud）上真正能复用的操作法。目标不是再写一份官方文档的镜像，而是把散落在最佳实践、配置参考、社区速查、社交媒体和踩坑记录里的「会让你少浪费一轮」的知识编成可检索的现场手册。
      </p>
      <p>
        Codex 迭代很快。本站内容以 2026 年公开文档与社区资料为底，标出了若干容易过时的点（例如 profile 已改为独立文件、<code>untrusted</code> 批准策略退役、<code>--full-auto</code>{" "}
        删除）。动手前仍以{" "}
        <a href="https://developers.openai.com/codex" target="_blank" rel="noreferrer">
          developers.openai.com/codex
        </a>{" "}
        和本机 <code>/help</code> 为准。
      </p>
      <h2>怎么用</h2>
      <ul>
        <li>
          按 <kbd>/</kbd> 或 <kbd>⌘K</kbd> 检索技巧、模板、文章和社区动态
        </li>
        <li>目录可按章节、难度、入口过滤；点技巧卡片进入正文</li>
        <li>文章页是外链阅读清单，社区页跟踪 X 和论坛里刚出现的用法</li>
        <li>速查表可按关键字过滤，点命令即可复制</li>
        <li>模板页可按类型筛选，复制 AGENTS.md、config、skill、子代理骨架</li>
      </ul>
      <h2>欢迎补一条</h2>
      <p>
        一条好技巧通常满足：有具体命令或文件路径、说明何时用何时不用、最好能指出常见误用。欢迎直接开 PR，在 <code>src/data/</code>{" "}
        里追加条目并附上来源链接。
      </p>
      <h2>主要来源</h2>
      <ul>
        <li>
          <a href="https://developers.openai.com/codex/learn/best-practices" target="_blank" rel="noreferrer">
            OpenAI Codex Best practices
          </a>
        </li>
        <li>
          <a href="https://developers.openai.com/codex/guides/agents-md" target="_blank" rel="noreferrer">
            Custom instructions with AGENTS.md
          </a>
        </li>
        <li>
          <a href="https://developers.openai.com/codex/config-reference" target="_blank" rel="noreferrer">
            Configuration reference
          </a>
        </li>
        <li>
          <a href="https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet" target="_blank" rel="noreferrer">
            Codex CLI Cheat Sheet
          </a>
        </li>
        <li>
          <a href="https://blakecrosley.com/guides/codex" target="_blank" rel="noreferrer">
            Blake Crosley · Codex CLI Guide
          </a>
        </li>
      </ul>
    </article>
  );
}
