import type { Tip } from "../types";

export const cliTips: Tip[] = [
  {
    id: "slash-command-map",
    no: 38,
    title: "先把斜杠命令地图印在脑子里",
    summary: "日常最高频：/plan、/review、/compact、/fork、/side、/permissions、/status、/skills。版本以 /help 为准。",
    body: `高频命令：

| 命令 | 用途 |
| --- | --- |
| \`/plan\` | 先规划再实现 |
| \`/review\` | 对分支、未提交改动或某次提交做审查 |
| \`/compact\` | 压缩长上下文 |
| \`/clear\` | 丢弃当前上下文 |
| \`/fork\` | 持久分出一条新线程 |
| \`/side\` | 临时旁路，不污染主线程 |
| \`/resume\` | 恢复已保存会话 |
| \`/permissions\` | 改批准/沙箱 |
| \`/model\` | 改模型和推理 |
| \`/fast on\\|off\` | Fast 档 |
| \`/agent\` | 切换子代理线程 |
| \`/skills\` | 浏览/调用技能 |
| \`/mcp\` | 看 MCP 服务器 |
| \`/status\` | 会话、工作区、用量 |
| \`/goal\` | 跨会话目标 |
| \`/recap\` | 总结当前对话 |
| \`/export\` | 导出为 Markdown |

具体版本以 TUI 里 \`/help\` 为准。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["斜杠命令", "/help", "TUI"],
    featured: true,
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "tui-keys",
    no: 39,
    title: "TUI 快捷键比你想的多",
    summary: "@ 搜文件，! 跑命令，Tab 排队，Enter 注入当前轮，Esc Esc 回改上一条。",
    body: `| 输入 | 作用 |
| --- | --- |
| \`@\` | 模糊搜文件并插入路径 |
| \`/command\` | 斜杠命令 |
| \`!cmd\` | 在当前批准/沙箱下跑本地命令 |
| \`Ctrl+C\` / \`/exit\` | 退出 |
| \`Ctrl+L\` | 清屏但不新开会话 |
| \`Ctrl+O\` / \`/copy\` | 复制最近完成输出（新版本是选择器） |
| \`Ctrl+R\` | 搜提示历史 |
| \`Ctrl+G\` | 用 \`$VISUAL\` / \`$EDITOR\` 编辑提示 |
| 运行中 \`Tab\` | 排队下一条提示、斜杠或 \`!\` |
| 运行中 \`Enter\` | 把说明注入当前轮 |
| 空编辑器 \`Esc Esc\` | 编辑上一条用户消息 |

\`Ctrl+G\` 写长提示特别有用：在真正的编辑器里写四件套，再送回 TUI。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli"],
    tags: ["快捷键", "TUI", "效率"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "queue-and-inject",
    no: 40,
    title: "跑的时候 Tab 排队，Enter 转向",
    summary: "不必等它停。发现跑偏就 Enter 注入纠正；已确定的下一步用 Tab 排队。",
    body: `两种完全不同的干预：

- **Enter**：插进当前轮。适合「别改那个文件」「先看测试输出再继续」
- **Tab**：排在当前轮之后。适合「测完接着写文档」

把它当可转向的同事，而不是开火后不管的炮弹。`,
    category: "commands",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["排队", "注入", "转向"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "review-command",
    no: 41,
    title: "提交前用 /review",
    summary: "可对 base 分支、未提交改动或某次 commit 审查。还可写自定义焦点，或指向 code_review.md。",
    body: `\`\`\`text
/review
/review 关注安全、鉴权和边界条件
\`\`\`

预设包括：

- 相对 base 分支的 PR 式审查
- 未提交改动
- 某一次 commit
- 自定义审查说明

把 \`docs/code_review.md\` 写进 \`AGENTS.md\`，审查标准就能跨仓库稳定。

还可设 \`review_model\`，让审查用更强（或更便宜）的模型，与实现模型分开。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["/review", "审查", "PR"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["code-review-rules-section", "review-before-commit"],
  },
  {
    id: "fast-mode",
    no: 42,
    title: "例行活开 /fast，思考活关掉",
    summary: "/fast 走更快服务档。可写入 config：service_tier 与 features.fast_mode。",
    body: `\`\`\`text
/fast on
/fast off
/fast status
\`\`\`

持久化：

\`\`\`toml
service_tier = "fast"

[features]
fast_mode = true
\`\`\`

重命名、补测试、改文案用 fast；架构和难 bug 用默认或更高推理。不要把 fast 当全局默认。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["/fast", "service_tier", "成本"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "recap-export-copy",
    no: 43,
    title: "/recap、/export 和 /copy 选择器",
    summary: "长会话先 recap 再交接；export 出 Markdown；/copy 可选整段回复、代码块或引用。",
    body: `v0.148+ / v0.151 附近新增的会话卫生工具：

- \`/recap\`：按需总结；符合条件的空闲会话也会自动 recap
- \`/export\`：把对话导出为 Markdown（剪贴板或文件）
- \`/copy\`：选择器，不只是「复制最后一条」

适合：把 CLI 会话交接给 PR 描述、把方案贴进设计文档、或在切线程前留下可读摘要。`,
    category: "commands",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["/recap", "/export", "/copy"],
    sources: [
      {
        label: "Blake Crosley · Codex CLI Guide",
        url: "https://blakecrosley.com/guides/codex",
      },
    ],
  },
  {
    id: "cd-in-session",
    no: 44,
    title: "会话里用 /cd，不必退出重开",
    summary: "/cd、/pwd、/cwd 在 TUI 内切工作目录。注意 /cd 不应削弱沙箱——新版本会保留权限档。",
    body: `从仓库根开始探索，再 \`/cd services/payments\` 收窄范围，比开一堆会话更顺。

\`/pwd\` 确认它以为自己在哪。很多「改错地方」其实是工作目录错了。

如果切目录后权限变怪，查是不是旧版本的 bug；升级后应保留 restored permission profile。`,
    category: "commands",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["/cd", "/pwd", "工作区"],
    sources: [
      {
        label: "Blake Crosley · Codex CLI Guide",
        url: "https://blakecrosley.com/guides/codex",
      },
    ],
  },
  {
    id: "one-thread-one-outcome",
    no: 45,
    title: "一事一线程",
    summary: "一个会话只服务一个连贯结果。整仓共用一条长聊天，上下文会胀、质量会掉。",
    body: `官方原话大意：同一问题留在同一聊天里，是因为推理轨迹还在；真正分叉再 fork。

反模式：早上修登录 bug，中午讨论迁移，下午写文案——全在同一线程。

信号：

- 你开始说「忽略上面所有内容」
- 回复变慢、变泛
- 它反复翻已经否决的方案

相关工作留在同一线程。任务变了就新开。`,
    category: "session",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["会话", "上下文", "质量"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["compact-vs-clear", "fork-vs-side"],
  },
  {
    id: "compact-vs-clear",
    no: 46,
    title: "/compact 保轨迹，/clear 丢垃圾",
    summary: "上下文发胀但任务还是那个：compact。线程已经跑题：clear 或新开。不要等窗口爆掉。",
    body: `\`/compact\` 把对话收成摘要，换掉原始逐字记录。推理轨迹还在，细节会丢。

\`/clear\` 是核重置。连摘要都会污染下一个任务时再用。

实践：

- \`/status\` 看用量
- 窗口到约 60% 就主动 compact
- 自动 compact 也会发生，但主动压一次更可预期

已经在说「忽略以上」就不要再 compact——开新线程。`,
    category: "session",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["/compact", "/clear", "上下文"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "fork-vs-side",
    no: 47,
    title: "分叉用 /fork，旁路用 /side",
    summary: "/side 是短暂草稿缓冲；/fork 是持久会话克隆。问一句就 fork，会留下一堆孤儿会话。",
    body: `| | \`/side\` | \`/fork\` |
| --- | --- | --- |
| 寿命 | 短暂 | 持久新线程 |
| 适合 | 几分钟的跑题 | 要保留的备选方案 |
| 回来之后 | 旁路记录通常没了 | 两边都能 resume |

\`/side\` 适合：破坏性操作前的「这安全吗？」、查一个 API、要第二意见。

\`/fork\` 适合：同一需求试两条实现路径，都可能要留着。

先 \`/side\` 的输出如果还要用，先复制——回去之后可能找不回来。`,
    category: "session",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["/fork", "/side", "会话"],
    featured: true,
    sources: [
      {
        label: "Codex Knowledge Base · Session patterns",
        url: "https://codex.danielvaughan.com/2026/05/22/codex-cli-session-patterns-threads-worktrees-side-goals-subagents-decision-framework/",
      },
    ],
    related: ["one-thread-one-outcome"],
  },
  {
    id: "resume-last",
    no: 48,
    title: "用 resume --last，不要从头解释",
    summary: "同一目录的工作，接着上次会话比新开再贴背景更便宜、更准。",
    body: `\`\`\`bash
codex resume
codex resume --last
codex resume <SESSION_ID>
codex fork --last
\`\`\`

非交互：

\`\`\`bash
codex exec resume --last "接着把集成测试补完"
\`\`\`

TUI 的 resume 选择器也能搜历史（v0.134+ 起支持内容匹配）。

新开会话适合新目标。同一目标被午饭打断，resume。`,
    category: "session",
    level: "starter",
    surfaces: ["cli"],
    tags: ["/resume", "会话", "连续性"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "use-goals",
    no: 49,
    title: "跨会话的工作先 /goal",
    summary: "Goal 是跨线程的任务对象：能熬过退出、重启甚至升级。线程是对话，goal 是意图。",
    body: `\`\`\`text
/goal set "把 payments 从 REST 迁到 gRPC。步骤：1. proto 2. 生成 stubs 3. 实现服务端 4. 改客户端 5. 集成测试"
/goal
\`\`\`

v0.133 起 goal 默认开启。适合跨天的功能、大重构、以及你希望它别重复已完成步骤的工作。

一个 goal 可以覆盖多条线程（周一/周二/周三）。Goal 提供连续性，线程提供干净的上下文窗口。

把 goal 写具体。写「改进代码库」等于没有。卡住就停，而不是把配额烧进死循环。`,
    category: "session",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["/goal", "跨会话", "长任务"],
    sources: [
      {
        label: "Codex Knowledge Base · Session patterns",
        url: "https://codex.danielvaughan.com/2026/05/22/codex-cli-session-patterns-threads-worktrees-side-goals-subagents-decision-framework/",
      },
    ],
  },
  {
    id: "status-watch-tokens",
    no: 50,
    title: "用 /status 看会话健康度",
    summary: "工作区根、会话 id、权限档、用量/积分都在这。猜不如看。",
    body: `定期看：

- 是不是在你以为的仓库根
- 权限档是不是还对
- 上下文和积分是否开始涨

新版本还会在状态栏和终端标题里显示估算积分/成本（符合条件的工作区）。

远程 TUI 时，\`/status\` 也会显示连接信息和服务器版本。`,
    category: "session",
    level: "starter",
    surfaces: ["cli"],
    tags: ["/status", "用量", "工作区"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "session-hygiene",
    no: 51,
    title: "会话卫生清单",
    summary: "开干前看 goal、可恢复会话、worktree 列表和模型。结束时提交、推送、删掉用完的 worktree。",
    body: `开始前：

\`\`\`text
/goal
codex resume          # 有没有能接着的
git worktree list
/model                # 强度是否匹配任务
\`\`\`

进行中：

- \`/status\`
- 窗口到 60% 就 \`/compact\`
- 跑题用 \`/side\`，不要写进主线程
- 例行活 low reasoning，架构用 high

结束后：

- goal 没完成就确认进度已写入
- worktree 里的改动先提交推送
- \`git worktree remove ../name\` 清理

孤立 worktree 会吃掉 \`node_modules\` 和磁盘。`,
    category: "session",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["卫生", "worktree", "清单"],
    sources: [
      {
        label: "Codex Knowledge Base · Session patterns",
        url: "https://codex.danielvaughan.com/2026/05/22/codex-cli-session-patterns-threads-worktrees-side-goals-subagents-decision-framework/",
      },
    ],
  },
];
