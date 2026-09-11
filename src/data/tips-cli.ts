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
| \`/clear\` | 丢弃当前上下文并清屏 |
| \`/new\` | 新开聊天，不清终端回滚 |
| \`/fork\` | 持久分出一条新线程 |
| \`/side\` | 临时旁路，不污染主线程 |
| \`/resume\` | 恢复已保存会话 |
| \`/archive\` | 归档当前会话并退出，不删记录 |
| \`/delete\` | 永久删除当前会话及派生会话 |
| \`/permissions\` | 改批准/沙箱 |
| \`/approve\` | 只重试最近一次被 Auto-review 拒绝的动作 |
| \`/diff\` | 看 staged / unstaged / 未跟踪文件 |
| \`/theme\` | 选语法高亮主题，写入 \`tui.theme\` |
| \`/memories\` | 本会话是否使用或生成记忆 |
| \`/vim\` | 切换 composer 的 Vim 模式 |
| \`/model\` | 改模型和推理 |
| \`/fast on\\|off\` | Fast 档 |
| \`/agent\` | 切换子代理线程 |
| \`/agents\` | 打开本机任务面板（不是 \`/agent\`） |
| \`/skills\` | 浏览/调用技能 |
| \`/mcp\` | 看 MCP 服务器 |
| \`/plugins\` | 浏览/安装插件（IDE 没有） |
| \`/apps\` | 插入 \`$app-slug\` 连接器 |
| \`/status\` | 会话、工作区、用量快照 |
| \`/statusline\` | 配置页脚，写入 \`tui.status_line\` |
| \`/title\` | 配置窗口标题，写入 \`tui.terminal_title\` |
| \`/pets\` | 选终端宠物（tmux 里不可用） |
| \`/usage\` | 账户用量 / 重置；可 daily、weekly、cumulative |
| \`/ps\` | 后台终端（需 \`unified_exec\`） |
| \`/experimental\` | 实验开关（含 Prevent sleep） |
| \`/goal\` | 跨会话目标 |
| \`/ide\` | 把 IDE 当前文件/选区带进下一轮 |
| \`/ide-context\` | 开关自动共享 IDE 上下文 |
| \`/app\` | 把当前会话接到桌面应用（不是 \`/apps\`） |
| \`/rename\` | 改聊天名，不改 transcript |
| \`/keymap\` | 交互改快捷键，写入 \`tui.keymap\` |
| \`/recap\` | 总结当前对话 |
| \`/export\` | 导出为 Markdown |
| \`/debug-config\` | 打印配置层与策略来源 |
| \`/raw\` | 原始回滚，方便选中复制 |
| \`/hooks\` | 浏览、信任、开关钩子 |
| \`/import\` | 从 Claude Code / Cursor 迁配置；任务中或远程会话没有 |
| \`/undo\` | 回滚本会话最近一次文件快照（需 \`features.undo\`） |

具体版本以 TUI 里 \`/help\` 为准。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["斜杠命令", "/help", "TUI"],
    featured: true,
    related: [
      "tui-keys",
      "codex-agents-dashboard",
      "ide-once-vs-ide-context",
      "app-from-tui",
    ],
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
| 批准层 \`o\` | 打开提出批准的子代理线程 |

\`Ctrl+G\` 写长提示特别有用：在真正的编辑器里写四件套，再送回 TUI。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli"],
    tags: ["快捷键", "TUI", "效率"],
    related: ["tui-keymap-unbind", "queue-and-inject", "new-vs-clear-view", "subagents-when-asked"],
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

把它当可转向的同事，而不是开火后不管的炮弹。

从**另一个终端**给已有会话塞下一句，用 \`codex queue\`，不是再按一次 Tab。`,
    category: "commands",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["排队", "注入", "转向"],
    related: ["codex-queue-existing", "codex-agents-dashboard", "tui-keys"],
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
    related: ["code-review-rules-section", "review-before-commit", "diff-then-review"],
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

重命名、补测试、改文案用 fast；架构和难 bug 用默认或更高推理。不要把 fast 当全局默认。

GPT-6 Astra 的 Fast 在可用时按 Standard 的 2.5 倍扣 ChatGPT 额度。这是订阅额度特性；API key 登录走 API 价，不走这套倍率。\`Codex-Spark\` 是另一个更快、能力更弱的模型，不是 \`/fast\` 开关，研究预览仅 ChatGPT Pro。Amazon Bedrock 提供商没有 Fast。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["/fast", "service_tier", "成本"],
    related: ["bedrock-mantle-provider", "pick-reasoning-effort"],
    sources: [
      {
        label: "OpenAI · Speed",
        url: "https://learn.chatgpt.com/docs/agent-configuration/speed",
      },
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

- \`/recap\`：按需总结；符合条件的空闲会话也会自动 recap。不想自动摘要时写成 \`tui.auto_recap = false\`
- \`/export\`：把对话导出为 Markdown（剪贴板或文件）
- \`/copy\`：选择器，不只是「复制最后一条」。0.154 起还能复制 \`/status\` 输出或单个会话字段

适合：把 CLI 会话交接给 PR 描述、把方案贴进设计文档、或在切线程前留下可读摘要。\`/copy\` 在第一条完成输出之前、以及刚回滚后不可用。`,
    category: "commands",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["/recap", "/export", "/copy"],
    related: ["tui-auto-recap", "compact-vs-clear", "new-vs-clear-view"],
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

已经在说「忽略以上」就不要再 compact——开新线程。要保留屏幕回滚用 \`/new\`，不要 \`/clear\`。

\`compact_prompt\` 只影响本地压缩；默认 OpenAI 远程压缩会忽略它，详见 compact_prompt 专条。`,
    category: "session",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["/compact", "/clear", "上下文"],
    related: ["tui-auto-recap", "compact-prompt-local-only", "status-watch-tokens"],
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

新开会话适合新目标。同一目标被午饭打断，resume。\`--last\` 默认只看当前工作目录；换过目录后会话像「丢了」，先试 \`codex resume --all\`。`,
    category: "session",
    level: "starter",
    surfaces: ["cli"],
    tags: ["/resume", "会话", "连续性"],
    related: ["resume-all-cwd", "fork-vs-side", "resume-readonly-when-open"],
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
    related: ["goal-steer-pause", "session-decision-tree", "prevent-idle-sleep"],
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
    related: ["statusline-footer", "context-window-verify-status"],
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

孤立 worktree 会吃掉 \`node_modules\` 和磁盘。选择器太挤时用 \`/archive\` 藏起会话，不要 \`/delete\`。`,
    category: "session",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["卫生", "worktree", "清单"],
    related: ["archive-not-delete", "history-persistence", "cli-managed-worktree"],
    sources: [
      {
        label: "Codex Knowledge Base · Session patterns",
        url: "https://codex.danielvaughan.com/2026/05/22/codex-cli-session-patterns-threads-worktrees-side-goals-subagents-decision-framework/",
      },
    ],
  },
  {
    id: "quiet-command-output",
    no: 93,
    title: "命令输出保持安静，主线程才装得下决策",
    summary: "测试日志和全量搜索会撑爆上下文。能静则静，吵的活派给子代理。",
    body: `把这些写进 \`AGENTS.md\` 或当次提示：

- \`pytest -q\`、\`cargo test -q\`、\`git status --short\`、\`git log --oneline -20\`
- 没有安静选项时，把完整输出存临时日志，只读相关片段
- 保留退出码和可操作的错误，而不是把一切 \`>/dev/null\`
- 完整测试套件、递归搜索、大日志分析交给子代理；主线程只要摘要

Codex 会对超大输出做边界和 compact，但最好从源头少产生噪音。主对话应留下需求、决策和结果，而不是中间过程的全文。`,
    category: "session",
    level: "starter",
    surfaces: ["cli", "ide", "app"],
    tags: ["上下文", "子代理", "AGENTS.md"],
    related: ["hide-agent-reasoning", "tool-output-token-limit", "subagents-when-asked"],
    sources: [
      {
        label: "OpenAI Community · Tips and Tricks",
        url: "https://community.openai.com/t/tips-and-tricks-for-using-codex/1373143",
      },
      {
        label: "OpenAI · Subagents",
        url: "https://developers.openai.com/codex/subagents",
      },
    ],
  },
  {
    id: "cli-managed-worktree",
    no: 94,
    title: "CLI 0.154 可用 --worktree 开隔离会话",
    summary: "实验性能力：新开会话或 fork 时用 --worktree / /worktree 建隔离 checkout，之后还能浏览和 resume。",
    body: `以前 CLI 要自己 \`git worktree add\`。官方 changelog 0.154.0 起，实验性托管 worktree 可以直接开：

\`\`\`bash
codex --worktree feature/isolated
\`\`\`

TUI 里用 \`/worktree\` 创建、切换、定位和清理。也可以浏览已有树并 resume。\`codex exec\` 同样能挂上托管 worktree。

注意：

- 这是实验功能。本机没有这些命令时，先 \`/experimental\` 或 \`codex features list\`，再对照 \`/help\`
- 脏工作区会问你是把未提交改动带走，还是留在原 checkout
- 合完仍要清理，孤立树会复制 \`node_modules\` 和磁盘

桌面 App 的 worktree 还是那套 Handoff / 自动清理。CLI 这条是给终端并行任务用的。动手前以当前 changelog 为准。`,
    category: "session",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["worktree", "并行", "0.154"],
    related: ["worktree-not-subagent", "session-hygiene", "worktreeinclude-ignored-files"],
    sources: [
      {
        label: "OpenAI · Codex changelog 0.154.0",
        url: "https://developers.openai.com/codex/changelog",
      },
      {
        label: "X · Codex Changelog",
        url: "https://x.com/Codex_Changelog/status/2097825113588498834",
      },
    ],
  },
  {
    id: "tui-keymap-unbind",
    no: 103,
    title: "TUI 快捷键用 tui.keymap 改，空列表等于解绑",
    summary: "composer 动作会回退到 tui.keymap.global；同名上下文绑定优先。空数组能关掉误触的快捷键。",
    body: `\`\`\`toml
[tui.keymap.global]
open_transcript = "ctrl-t"

[tui.keymap.composer]
submit = ["enter", "ctrl-m"]

[tui.keymap.chat]
interrupt_turn = "f12"
\`\`\`

支持的上下文包括 \`global\`、\`chat\`、\`composer\`、\`editor\`、\`vim_normal\`、\`pager\`、\`list\`、\`approval\`、\`agents\`。composer 里没写的动作会去 \`global\` 找同名绑定。打开任务面板默认是 \`tui.keymap.global.open_agents\`（\`alt-a\`）。

某个动作老是误触，给它空列表：

\`\`\`toml
[tui.keymap.composer]
submit = []
\`\`\`

改完新开会话。本机实际键名以 \`/help\` 和当前 changelog 为准。`,
    category: "commands",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["TUI", "keymap", "config.toml"],
    related: ["tui-keys", "codex-agents-dashboard", "file-opener-and-personality"],
    sources: [
      {
        label: "OpenAI · Config basics",
        url: "https://learn.chatgpt.com/docs/config-file/config-basic",
      },
    ],
  },
  {
    id: "apps-not-plugins",
    no: 107,
    title: "/apps 插连接器，/plugins 装捆；IDE 没有插件",
    summary: "连接器用 /apps 写成 $app-slug。插件走桌面应用或 CLI 的 /plugins。IDE 扩展只支持技能和 MCP，没有插件目录。",
    body: `三套入口不要混：

| 入口 | 装什么 | 哪里有 |
| --- | --- | --- |
| \`/apps\` | 连接器（GitHub、Slack 这类） | CLI / 桌面 / IDE |
| \`/plugins\` | 技能 + MCP + 钩子的可安装捆 | 桌面应用、CLI |
| \`/skills\` 或 \`$name\` | 本地或已装技能 | CLI / IDE / 桌面 |

\`/apps\` 会把 \`$app-slug\` 插进当前提示，马上就能点名要用的连接器。IDE 里没有 \`/plugins\`：要装插件，去 ChatGPT 桌面应用或 CLI。网页 Work 的插件目录也不读 \`~/.codex\`。

0.154 起当前会话通常会捡起新装的插件工具。\`/plugins\` 或 \`/mcp\` 仍没有再新开。API key 登录只能装一部分官方目录；需要 OAuth 的连接器会缺。浏览器里 Space 只开关已装插件，不会卸载。

\`features.network_proxy\` 管的是沙箱里跑的命令，不管 Apps、MCP、网页搜索这些托管通道。`,
    category: "commands",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["/apps", "/plugins", "IDE"],
    related: ["plugins-vs-skills", "tool-suggest-disabled", "plugin-session-refresh"],
    sources: [
      {
        label: "OpenAI · Plugins",
        url: "https://learn.chatgpt.com/docs/plugins",
      },
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "statusline-footer",
    no: 110,
    title: "/statusline 管页脚，不是一次性 /status",
    summary: "选择器把字段写进 tui.status_line。要盯 5 小时/周配额就打开对应项；null 或 [] 关掉页脚。重置时间和积分余额仍看 /usage 或网页。",
    body: `\`/status\` 是快照。\`/statusline\` 改的是 TUI 底部那一行，确认后立刻生效，并持久化到 \`~/.codex/config.toml\`。Esc 退出选择器不会保存。

\`\`\`toml
[tui]
status_line = ["model-with-reasoning", "context-remaining", "five-hour-limit", "weekly-limit", "git-branch"]
\`\`\`

未设置时官方样例默认是 \`model-with-reasoning\`、\`context-remaining\`、\`current-dir\`。\`status_line = []\` 或 \`null\` 关掉页脚。也可用 \`/title\` 配窗口标题，写入 \`tui.terminal_title\`。

页脚适合看剩余百分比；重置时刻、银行积分、按客户端拆分仍用 \`/usage daily|weekly|cumulative\`，或打开 chatgpt.com 的 Codex analytics。项名以本机选择器为准，不要抄过期博客。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli"],
    tags: ["/statusline", "TUI", "用量"],
    related: ["status-watch-tokens", "tui-animations-off", "usage-daily-weekly-reset"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
      {
        label: "J.D. Hodges · CLI status line",
        url: "https://www.jdhodges.com/blog/codex-usage-cli-status-line/",
      },
    ],
  },
  {
    id: "goal-steer-pause",
    no: 113,
    title: "长任务用 /goal 转向：先暂停再断网，并行先 worktree",
    summary: "Goal 模式不扩大沙箱。桌面有进度条可 pause/resume；CLI 用 /goal pause|resume|edit|clear。并行聊天不要写同一棵树。",
    body: `\`/goal\` 的正文既是第一轮提示，也是完成标准。写清结果、约束和验证方式。超过 4000 字符就改成「按某文件执行」，不要硬塞进斜杠。

转向：

\`\`\`text
/goal pause
/goal edit
/goal resume
/goal clear
\`\`\`

桌面应用在输入框上方有进度行，可暂停、继续、改目标或清除。预计会断网或合上盖子，先暂停再离开。要听进度但不打断主线程，用 \`/side\`。

开 Goal 不会放宽沙箱或批准策略；该问还是会问。另一条独立任务另开聊天，并且给它单独 worktree，避免两路同时改同一批文件。网页 Work 没有这一套斜杠，把结果/约束/验收写进提示。`,
    category: "session",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["/goal", "长任务", "worktree"],
    related: ["use-goals", "prevent-idle-sleep", "worktree-not-subagent", "cli-managed-worktree"],
    sources: [
      {
        label: "OpenAI · Long-running work",
        url: "https://learn.chatgpt.com/docs/long-running-work",
      },
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "resume-all-cwd",
    no: 116,
    title: "会话没丢，多半是 resume 被当前目录滤掉了",
    summary: "codex resume --last 默认只看本工作目录。换过文件夹就先 --all。目录不一致时用 tui.resume_cwd，--cd 仍然优先。",
    body: `\`\`\`bash
codex resume --all
codex resume --last --all
codex resume --include-non-interactive --all
\`\`\`

\`--last\` 在当前工作目录里挑最近一次。重启或 \`cd\` 到别的仓库后，选择器会变空，并不等于记录被删。\`--all\` 跨目录找；\`--include-non-interactive\` 把 \`codex exec\` 会话也放进列表。

当前目录和会话保存的目录不一致时，Codex 会问用哪一个。不想每次问：

\`\`\`toml
[tui]
resume_cwd = "current"   # 或 "session"
\`\`\`

\`codex fork\` 用同一套规则。命令行 \`-C\` / \`--cd\` 压过 \`tui.resume_cwd\`。先 \`/pwd\` 确认再 resume，避免在错的树上改文件。`,
    category: "session",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["/resume", "resume_cwd", "会话"],
    related: ["resume-last", "cd-in-session", "cli-managed-worktree"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "approve-one-retry",
    no: 121,
    title: "/approve 只放行一次被 Auto-review 拒绝的动作",
    summary: "不是 /permissions。打开拒绝列表，选一条精确重试；重试仍走审查。never / yolo 不会出现这条路径。",
    body: `\`/permissions\` 改的是「问不问你」。\`/approve\` 只在 Auto-review 已经拒绝某次越界动作之后，让你从最近拒绝列表里挑一条再试一次。

先确认审查在工作：

\`\`\`toml
approval_policy = "on-request"
approvals_reviewer = "auto_review"
\`\`\`

或一次性：

\`\`\`bash
codex --sandbox workspace-write --ask-for-approval on-request \\
  -c approvals_reviewer=auto_review
\`\`\`

TUI 里输入 \`/approve\`，从最近最多 10 条拒绝里选一条。这只覆盖**那一次、那条动作**：相似请求下次还会审；审查员仍可按策略再拒绝。

不要为了少弹窗改成 \`approval_policy = "never"\`、\`:danger-full-access\` 或 \`--yolo\`：那样根本不会产生要审查的越界请求。日常动作太吵，先收紧 \`writable_roots\` 和命令前缀规则。

同一轮大约连续 3 次拒绝，或最近 50 次审查里 10 次拒绝，会触发断路并中断这一轮。`,
    category: "sandbox",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["/approve", "auto_review", "沙箱"],
    related: ["two-knobs", "slash-command-map", "desktop-enable-permission-modes"],
    sources: [
      {
        label: "OpenAI · Auto-review",
        url: "https://learn.chatgpt.com/docs/sandboxing/auto-review",
      },
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "diff-then-review",
    no: 122,
    title: "提交前先 /diff，再 /review",
    summary: "/diff 含已暂存、未暂存和 Git 还没跟踪的文件。看完工作树再跑审查，避免漏掉新建文件。",
    body: `\`\`\`text
/diff
/review
/review 关注安全、鉴权和边界条件
\`\`\`

\`/diff\` 在 TUI 里滚动查看 Git 差异，覆盖：

- 已经 \`git add\` 的改动
- 工作区里还没暂存的改动
- Git 尚未跟踪的新文件

只看 \`git diff\` 会漏掉未跟踪文件。确认要留下的内容之后，再用 \`/review\` 对 base 分支、未提交改动或某次 commit 做审查。本机命令以 \`/help\` 为准。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli"],
    tags: ["/diff", "/review", "Git"],
    related: ["review-command", "slash-command-map", "review-before-commit"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "theme-and-completion",
    no: 124,
    title: "TUI 主题、Vim 模式和 shell 补全一起配",
    summary: "/theme 写入 tui.theme；自定义 .tmTheme 放 $CODEX_HOME/themes。zsh 先 compinit 再加载 codex completion。",
    body: `语法高亮（围栏代码块和 diff）：

\`\`\`text
/theme
\`\`\`

选中后写入 \`tui.theme\`。自定义主题把 TextMate \`*.tmTheme\` 放到 \`$CODEX_HOME/themes\`，再从选择器里挑。

Composer 想用 Vim 键：

\`\`\`text
/vim
\`\`\`

新会话默认开 Vim 模式：

\`\`\`toml
[tui]
vim_mode_default = true
\`\`\`

长提示仍用 Ctrl+G 交给 \`$VISUAL\` / \`$EDITOR\`。

Shell 补全：

\`\`\`bash
codex completion zsh
\`\`\`

zsh 若报 \`command not found: compdef\`，先初始化补全再加载：

\`\`\`bash
autoload -Uz compinit && compinit
eval "$(codex completion zsh)"
\`\`\`

也支持 \`bash\`、\`fish\`、\`powershell\`。改完重启 shell，输入 \`codex\` 再按 Tab 验证。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli"],
    tags: ["/theme", "/vim", "completion"],
    related: ["tui-keys", "slash-command-map", "codex-home-profiles"],
    sources: [
      {
        label: "OpenAI · CLI customization",
        url: "https://learn.chatgpt.com/docs/cli-customization",
      },
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "archive-not-delete",
    no: 126,
    title: "选择器太挤先 archive，不要 delete",
    summary: "/archive 只是从活跃列表藏起来，记录还在。/delete 会永久删掉当前会话和派生会话。任务跑着时这两条都不可用。",
    body: `当前会话：

\`\`\`text
/archive
/delete
\`\`\`

按 ID 或名字处理已保存会话（ID 优先于名字）：

\`\`\`bash
codex archive <SESSION>
codex unarchive <SESSION>
codex delete <SESSION>
\`\`\`

\`/archive\` 会退出 TUI，但本地 transcript 还在；归档后 \`resume\` / \`fork\` 找不到它，直到 \`codex unarchive\`。\`/delete\` 才是真删，而且会带上派生会话。

任务还在跑时 \`/archive\` 不可用；聊天进行中或旁路 \`/side\` 里也不能 \`/delete\`。清理选择器用归档，确认不要了再用删除。`,
    category: "session",
    level: "starter",
    surfaces: ["cli"],
    tags: ["/archive", "/delete", "会话"],
    related: ["session-hygiene", "history-persistence", "slash-command-map"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "new-vs-clear-view",
    no: 129,
    title: "新开聊天用 /new，Ctrl+L 只清屏",
    summary: "/clear 会清终端再开新聊天；/new 保留回滚。Ctrl+L 只清视图。任务跑着时这三条都不可用。",
    body: `\`\`\`text
/new
/new bug bash
/clear
\`\`\`

| 动作 | 聊天 | 终端画面 |
| --- | --- | --- |
| \`/new\` | 新开一条，可顺带命名 | 保留当前回滚 |
| \`/clear\` | 新开一条，可顺带命名 | 先清屏 |
| \`Ctrl+L\` | 还是这一条 | 只清屏 |

还在同一仓库、只是换任务时用 \`/new\`，方便对照刚才的输出。确认上一轮已经没用再用 \`/clear\`。任务进行中 Codex 会禁用这三条，等它停。`,
    category: "session",
    level: "starter",
    surfaces: ["cli"],
    tags: ["/new", "/clear", "TUI"],
    related: ["compact-vs-clear", "tui-keys", "slash-command-map"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "title-window-items",
    no: 130,
    title: "/title 管窗口标题，不是页脚",
    summary: "选择器写入 tui.terminal_title。默认 spinner + project；null 关掉标题更新。页脚仍用 /statusline。",
    body: `\`\`\`text
/title
\`\`\`

选完立刻改终端窗口或标签标题，并写入 \`config.toml\`：

\`\`\`toml
[tui]
terminal_title = ["spinner", "project", "git-branch", "model"]
\`\`\`

可选项包括：app name、project、spinner、status、thread、git branch、model、task progress。默认 \`["spinner", "project"]\`。设成 \`null\` 停止改标题。

\`/statusline\` 改的是 TUI 页脚，\`/title\` 改的是终端自己的标题栏。两个选择器互不影响。项名以本机选择器为准。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli"],
    tags: ["/title", "TUI", "terminal_title"],
    related: ["statusline-footer", "slash-command-map", "tui-animations-off"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "terminal-pets-constraints",
    no: 131,
    title: "终端宠物要图形协议，tmux 里没有",
    summary: "/pets 只报告当前 CLI 会话状态。需要 iTerm2 3.6+ 或 Kitty / Sixel。IDE 没有宠物。",
    body: `\`\`\`text
/pets
/pets off
\`\`\`

选内置或本机已有的自定义宠物。状态只有 Running、Needs input、Ready、Blocked，没有桌面应用那种多聊天托盘。

硬限制：

- 需要 iTerm2 3.6 或支持 Kitty 图形 / Sixel 的终端
- 在 \`tmux\` 和 Zellij 里不可用
- IDE 扩展没有选择器和浮层

桌面应用用 Settings > Pets；自定义走捆绑的 \`hatch-pet\` 技能，做完 Refresh 再选。宠物只改外观，不改模型怎么干活。网页 Work 的宠物没有 \`/pet\` 浮层。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["/pets", "TUI", "桌面"],
    related: ["slash-command-map", "tui-keys", "apps-not-plugins"],
    sources: [
      {
        label: "OpenAI · Pets",
        url: "https://learn.chatgpt.com/docs/pets",
      },
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "async-questions-keep-draft",
    no: 132,
    title: "行内提问不必停任务，主草稿还在",
    summary: "0.154 起 Codex 可边跑边问。数字键选建议项，也可写自定义答案。主合成器里正在打的字不会被冲掉。",
    body: `任务中途需要你拍板时，TUI 会出现折叠的提问指示（待答数量）。展开后：

- 有建议项就按数字键提交
- 要补充就走 Other / 自由文本
- 可以先跳过，任务继续跑
- 随时回到主合成器，刚才没发完的草稿还在

这不是批准弹窗。批准管的是「能不能跑这条工具」；行内提问管的是「接下来按哪条设计走」。CI 和无头 \`codex exec\` 里模型拿不到这条交互通道，会退回同步澄清或把不确定写进输出。自动化跑可在 \`AGENTS.md\` 写明：不要用 \`request_user_input\`，按最保守解释并留 TODO。

本机没有提问浮层时，对照 \`/help\` 和当前 changelog，不要抄未进稳定版的 \`disable_tools\` 键名。`,
    category: "session",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["TUI", "0.154", "提问"],
    related: ["queue-and-inject", "goal-steer-pause", "cli-managed-worktree"],
    sources: [
      {
        label: "OpenAI · Codex changelog 0.154.0",
        url: "https://developers.openai.com/codex/changelog",
      },
      {
        label: "Codex Knowledge Base · Async TUI questions",
        url: "https://codex.danielvaughan.com/2026/09/05/async-tui-questions-codex-cli-v0154-human-agent-collaboration/",
      },
    ],
  },
  {
    id: "usage-daily-weekly-reset",
    no: 133,
    title: "/usage 看日周累计，页脚只看剩余百分比",
    summary: "直接 /usage daily、weekly 或 cumulative。菜单里还能兑换 earned reset。没有 ChatGPT 登录会要求先签入。",
    body: `\`\`\`text
/usage
/usage daily
/usage weekly
/usage cumulative
\`\`\`

\`/status\` 和 \`/statusline\` 适合盯这一轮还剩多少上下文、五小时/周配额百分比。重置时刻、银行积分、按客户端拆分仍进 \`/usage\`，或打开 chatgpt.com 的 Codex analytics。

菜单第二步可以兑换 earned reset（有的话）。会话没用 Codex 服务账号登录时，命令会停在签入提示，不是坏了。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["/usage", "配额", "TUI"],
    related: ["statusline-footer", "status-watch-tokens", "slash-command-map"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "ide-once-vs-ide-context",
    no: 134,
    title: "/ide 只带这一轮，/ide-context 才是自动共享",
    summary: "/ide 把当前打开的文件和选区塞进下一轮提示。/ide-context 开关之后是否自动带上。两套不要混。",
    body: `\`\`\`text
/ide 根据当前选区解释这个失败测试
/ide-context
\`\`\`

| 命令 | 作用 |
| --- | --- |
| \`/ide\` | 一次性附上 IDE 打开的文件、当前选区；可跟一句说明 |
| \`/ide-context\` | 开关自动共享。桌面应用和 IDE 对着同一项目时，合成器会带上编辑器上下文 |

要它看光标所在的函数，用 \`/ide\`。不想把桌面提示污染成「所有打开的标签」，把 \`/ide-context\` 关掉。扩展里的 \`chatgpt.*\` 键（队列/转向、审查内联）仍写在编辑器设置，不进 \`config.toml\`。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli", "ide", "app"],
    tags: ["/ide", "/ide-context", "IDE"],
    related: ["ide-chatgpt-settings", "mention-files", "slash-command-map"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
      {
        label: "OpenAI · Developer settings",
        url: "https://learn.chatgpt.com/docs/developer-settings",
      },
    ],
  },
  {
    id: "app-from-tui",
    no: 135,
    title: "/app 把会话接到桌面，别和 /apps 搞混",
    summary: "macOS/Windows 上 /app 打开当前已保存聊天。/apps 才是插入 $app-slug 连接器。没装桌面应用会报错。",
    body: `\`\`\`text
/app
\`\`\`

\`/app\` 把**这一条** TUI 会话接到 ChatGPT 桌面应用。应用没装或没在跑，会提示先安装或启动。

从终端直接开桌面应用（可带工作区路径）：

\`\`\`bash
codex app
codex app /path/to/repo
\`\`\`

macOS 会打开该路径；Windows 打印出要打开的路径。\`/apps\` 完全是另一回事：它往提示里插入 \`$app-slug\` 连接器。

Linux 预览已有桌面应用，但 \`/app\` 这条 TUI 交接文档仍写 macOS / Windows。网页 Work 也不读你这条本地 TUI 会话。`,
    category: "session",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["/app", "桌面", "TUI"],
    related: ["apps-not-plugins", "resume-readonly-when-open", "five-surfaces"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "raw-scrollback-copy",
    no: 136,
    title: "要在终端里划选复制，先 /raw",
    summary: "/raw 打开原始回滚。默认同 Alt+R。想每次启动就这样，设 tui.raw_output_mode = true。",
    body: `\`\`\`text
/raw
/raw on
/raw off
\`\`\`

富文本主题和折叠输出会让终端选择器抓到一堆控制序列。\`/raw\`（或默认 \`Alt+R\`）改成更适合划选复制的回滚。

新会话默认就开：

\`\`\`toml
[tui]
raw_output_mode = true
\`\`\`

这和 \`/copy\` 不冲突：\`/copy\` 走剪贴板选择器，\`/raw\` 管你在终端里自己划的那段。`,
    category: "commands",
    level: "starter",
    surfaces: ["cli"],
    tags: ["/raw", "TUI", "复制"],
    related: ["tui-alternate-screen", "recap-export-copy", "tui-keys"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
      {
        label: "OpenAI · Config reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "rename-current-chat",
    no: 140,
    title: "改名用 /rename，不要新开一条聊天",
    summary: "只改保存名，transcript 不动。可 /rename 后输入，或直接 /rename bug bash。",
    body: `\`\`\`text
/rename
/rename bug bash
\`\`\`

名字是给 \`resume\` 选择器用的。内容、权限、worktree 都不变。长会话先 \`/recap\` 再改成能搜到的短名。任务跑着时以本机 \`/help\` 是否禁用为准。`,
    category: "session",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["/rename", "会话", "TUI"],
    related: ["new-vs-clear-view", "codex-agents-dashboard", "slash-command-map"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "resume-readonly-when-open",
    no: 203,
    title: "会话已在另一端打开：resume 会变成只读，草稿还在",
    summary: "0.154 起，桌面或 IDE 正占用同一聊天时，CLI resume 只给只读回放和重试，不会再开一个可写副本。不要为此去 fork。",
    body: `同一条会话不能同时被两个可写前端占用。CLI 0.154 起：你在桌面应用或 IDE 里开着聊天，再到终端 \`codex resume --last\`，会看到**只读 transcript**，并带重试；输入框里的草稿会留着，不会悄悄另存一份可写会话。

这不是 resume 坏了。先关掉另一端，或在只读界面点重试，等占用释放。不要一看到不能输入就 \`codex fork --last\`——fork 是新线程，旧权限和目标都会分叉。

\`/app\` 是把 TUI 接到桌面，不是「再开一条」。\`codex exec resume\` 走的是非交互续跑，不会给你这个只读 TUI；别用 exec 去抢已经被桌面占用的聊天。核对本机版本：

\`\`\`bash
codex --version
codex resume --last
\`\`\`

若版本低于 0.154，行为可能仍是抢连接或直接失败。以 \`/help\` 和 changelog 为准。`,
    category: "session",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["resume", "桌面", "0.154"],
    related: ["resume-last", "app-from-tui", "fork-vs-side"],
    sources: [
      {
        label: "openai/codex rust-v0.154.0",
        url: "https://github.com/openai/codex/releases/tag/rust-v0.154.0",
      },
    ],
  },
  {
    id: "codex-queue-existing",
    no: 204,
    title: "给已有会话塞消息用 codex queue，不要再开一个 TUI",
    summary: "0.149 起从另一个终端把文本排进已有会话。必须同时给 --thread 和 --message。不要对着 exec 线程用。",
    body: `这不是 TUI 里的 Tab。Tab 只作用于你正在看的那条；\`codex queue\` 是从**任意终端**把下一句交给已经在跑的会话。

\`\`\`bash
codex --version
codex queue --thread "backend-rate-limits" --message "补上并发回归测试。"
codex queue --thread "01a01234-abcd-7890-1234-123456789abc" --message "先跑完整测试。"
\`\`\`

\`--thread\` 和 \`--message\` 都要有。值必须是**精确会话名**或 UUID；名字带空格就加引号。人手用短名方便，脚本从 \`/status\` 抄 UUID。重名时 0.149 起偏向最近一条，仍可能歧义。

空闲会话会被唤醒开新一轮；正在跑就排到当前轮之后。远程 app-server 才加 \`--remote\`。空消息和图片附件会被拒绝。网上有人写成 \`--session\`，现行 CLI 要的是 \`--thread\`。

不要对着 \`codex exec\` 开的线程 queue：命令可能 exit 0，消息却进不了当前轮，甚至被丢掉。交互 TUI / 桌面会话才是这个命令的对象。核对本机 \`codex queue --help\`。`,
    category: "session",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["queue", "会话", "0.149"],
    related: ["queue-and-inject", "codex-agents-dashboard", "resume-last"],
    sources: [
      {
        label: "openai/codex rust-v0.149.0",
        url: "https://github.com/openai/codex/releases/tag/rust-v0.149.0",
      },
      {
        label: "proflead · agents 与 queue",
        url: "https://proflead.dev/posts/openai-codex-agents-dashboard-codex-queue/",
      },
    ],
  },
  {
    id: "codex-agents-dashboard",
    no: 205,
    title: "多开会话先用 codex agents，不要开一堆终端标签",
    summary: "0.149 起本机 daemon 上的任务面板。会话里用 /agents 回去。改名用 Ctrl+R；脚本仍用 UUID。不是 /agent。",
    body: `并行几条任务时，不要为每个会话再开一个终端标签。0.149 起：

\`\`\`bash
codex agents
\`\`\`

这是本机 app-server daemon 上的总览：搜、开、改名、停、新建。已经在某条 TUI 里时，用 \`/agents\` 回到同一块面板，不是再起一个 shell。\`/agent\` 切的是**子代理线程**，不要和 \`/agents\` 搞混。

页脚才是当前快捷键。常见默认：方向键选择，Enter 打开，\`Ctrl+F\` 搜索，\`Ctrl+S\` 改分组，\`Ctrl+R\` 改名，\`Ctrl+X\` 停止。从任意 TUI 打开面板默认 \`Alt+A\`，可改：

\`\`\`toml
[tui.keymap.global]
open_agents = "alt-a"
\`\`\`

已有自定义 \`alt-a\` 时，新默认会让路，不会硬抢。面板还有 \`agents\` 快捷键上下文。面板空：确认和会话是同一 OS 用户、同一本地 daemon，再跑 \`codex doctor\`。先把长自动标题 \`/rename\` 成短且不重复的名字，再给 \`codex queue --thread\` 用。`,
    category: "session",
    level: "starter",
    surfaces: ["cli"],
    tags: ["agents", "会话", "0.149"],
    related: ["codex-queue-existing", "rename-current-chat", "tui-keymap-unbind"],
    sources: [
      {
        label: "openai/codex rust-v0.149.0",
        url: "https://github.com/openai/codex/releases/tag/rust-v0.149.0",
      },
      {
        label: "proflead · agents 与 queue",
        url: "https://proflead.dev/posts/openai-codex-agents-dashboard-codex-queue/",
      },
    ],
  },
  {
    id: "features-undo",
    no: 207,
    title: "features.undo 默认关；/undo 只回文件，不回聊天",
    summary: "稳定但默认关。打开后 /undo 按整轮快照还原工作区。会话一关快照就没了。要连上下文一起撤用 /fork。",
    body: `\`undo\` 是少数**稳定却默认关**的开关。打开：

\`\`\`bash
codex features enable undo
codex features list
\`\`\`

或写入用户 config 后新开会话：

\`\`\`toml
[features]
undo = true
\`\`\`

一次性也可用 \`codex --enable undo\`。\`/experimental\` 里不一定列这个稳定开关。

打开后 TUI 有 \`/undo\`：按**这一轮工具调用**的幽灵快照还原工作区，十个文件的重构会整组回去，不是按文件挑。聊天记录不会退；模型仍记得做过那次改动。快照在内存里，重启会话就没了。不要拿它当 git。

需要连对话一起回到分叉点，用 \`/fork\`。CI 和无头 exec 保持 \`undo = false\`。本机 \`/help\` 没有 \`/undo\` 就先确认 \`codex features list\` 里是 on。`,
    category: "commands",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["undo", "features", "/undo"],
    related: ["features-list", "fork-vs-side", "compact-vs-clear"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "danielvaughan · Feature flags",
        url: "https://codex.danielvaughan.com/2026/03/28/codex-cli-feature-flags-tui-tuning/",
      },
    ],
  },
];
