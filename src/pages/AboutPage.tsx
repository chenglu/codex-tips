export function AboutPage() {
  return (
    <article className="article">
      <div className="brand-kicker">Colophon</div>
      <h1 className="page-title">关于这本手册</h1>
      <p>
        这里整理 OpenAI Codex 在 CLI、桌面端、IDE 扩展和 Cloud 中的使用技巧。内容来自官方文档与社区资料，可按场景检索，并附有来源链接。
      </p>
      <p>
        不同版本的命令和配置可能有所变化，使用时请参考
        <a href="https://developers.openai.com/codex" target="_blank" rel="noreferrer">
          developers.openai.com/codex
        </a>{" "}
        和本机 <code>/help</code> 为准。
      </p>
      <h2>怎么用</h2>
      <ul>
        <li>
          按 <kbd>/</kbd> 或 <kbd>⌘K</kbd> 检索技巧、模板、文章、更新和社区动态
        </li>
        <li>目录可按章节、难度、入口过滤；点技巧卡片进入正文</li>
        <li>更新页是CLI 100 个稳定版的命令与功能对照文章；文章页是外链阅读清单</li>
        <li>社区页跟踪 X 和论坛里刚出现的用法</li>
        <li>速查表可按关键字过滤，点命令即可复制</li>
        <li>模板页可按类型筛选，复制 AGENTS.md、config、skill、子代理骨架</li>
      </ul>
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
