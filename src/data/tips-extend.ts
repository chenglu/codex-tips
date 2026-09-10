import type { Tip } from "../types";

export const extendTips: Tip[] = [
  {
    id: "repeat-becomes-skill",
    no: 52,
    title: "同一套步骤说第二次，就收成 Skill",
    summary: "Skill 把指令、上下文和可选脚本打成可复用能力，跨 CLI / IDE / App 生效。",
    body: `经验法则：你在复用同一段提示，或反复纠正同一流程，它就该变成 skill。

适合收成 skill 的工作：

- 日志分诊
- 写 Release notes
- 按清单做 PR 审查
- 迁移规划
- 事故摘要
- 标准排错流

先做 2–3 个具体用例，写清输入输出。**description 是技能被发现的关键**：写它做什么、何时用、用户会说的触发短语。

不要一上来覆盖所有边角。先把一个代表性任务做稳，再技能化。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["skills", "SKILL.md", "复用"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Customization",
        url: "https://developers.openai.com/codex/concepts/customization",
      },
    ],
    related: ["skill-creator", "skill-locations"],
  },
  {
    id: "skill-creator",
    no: 53,
    title: "用 $skill-creator 脚手架，先留在本地",
    summary: "内置 $skill-creator 能生成第一版。本地打磨好，再打包成 plugin 分发。",
    body: `\`\`\`text
$skill-creator
\`\`\`

或 \`/skills\` 里选。第一版放个人目录。描述写清楚，Codex 才能在你没显式调用时判断该不该用。

显式调用：

\`\`\`text
$release-notes
把 2026-09-01 以来的提交写成面向用户的更新说明。
\`\`\`

脚本、references、assets 只在能提高可靠性时再加。Skill 还可以声明 MCP 依赖，缺了会提示安装。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["$skill-creator", "插件", "描述"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "skill-locations",
    no: 54,
    title: "个人技能和仓库技能分开放",
    summary: "~/.agents/skills 跟你走；.agents/skills 跟仓库走。系统级还可放 /etc/codex/skills。",
    body: `| 位置 | 范围 |
| --- | --- |
| \`.agents/skills/<name>/SKILL.md\` | 仓库/团队，从 cwd 搜到仓库根 |
| \`$HOME/.agents/skills/...\` | 你的个人技能 |
| \`/etc/codex/skills/...\` | 管理员/系统 |
| 内置 | Codex 自带 |

\`SKILL.md\` 必须有 \`name\` 和 \`description\`。可选：\`scripts/\`、\`references/\`、\`assets/\`、\`agents/openai.yaml\`。

禁用某个技能：

\`\`\`toml
[[skills.config]]
path = "/home/you/.agents/skills/noisy/SKILL.md"
enabled = false
\`\`\`

要分发、带 MCP/App 配置时，打成 plugin，不要只拷贝文件夹。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["路径", ".agents", "plugins"],
    sources: [
      {
        label: "OpenAI · Customization",
        url: "https://developers.openai.com/codex/concepts/customization",
      },
    ],
  },
  {
    id: "plugins-vs-skills",
    no: 55,
    title: "Plugin 是可分发捆，Skill 是工作流单元",
    summary: "Skill 是一份 SKILL.md。Plugin 把技能、MCP、App 集成和钩子捆在一起，可从 marketplace 装。",
    body: `\`/plugins\` 浏览、安装、卸载、开关。CLI 还有：

\`\`\`bash
codex plugin marketplace add <source>
codex plugin marketplace upgrade
codex plugin marketplace list --json
\`\`\`

v0.146+ 起有可移植 Agent Plugins，可搜本地、个人、工作区和远程目录。用 \`$plugin-creator\` 打包。

从 Claude Code 或 Cursor 迁过来，可用 \`/import\` 迁设置、MCP、插件、会话和命令。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "marketplace", "/import"],
    sources: [
      {
        label: "OpenAI · Plugins",
        url: "https://developers.openai.com/codex/plugins",
      },
    ],
  },
  {
    id: "mcp-when",
    no: 56,
    title: "仓库外的、还在变的数据才用 MCP",
    summary: "Issue、设计、监控、文档站点——需要实时工具时再接。不要一上来把常用软件全接上。",
    body: `值得接 MCP 的情况：

- 上下文在仓库外
- 数据频繁变化
- 你希望它用工具而不是粘贴说明
- 需要跨人或跨项目复用的集成

Codex 支持 STDIO 和 Streamable HTTP（含 OAuth）。

从一两个能消灭你已经在做的手动循环的工具开始。每个 MCP 工具都会占上下文、增加失败面。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "集成", "上下文"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "mcp-add-and-login",
    no: 57,
    title: "用 codex mcp 管理服务器，而不是手改 TOML",
    summary: "list / add / remove / login / logout。TUI 里 /mcp 看当前可用工具，加 verbose 看细节。",
    body: `\`\`\`bash
codex mcp add docs -- npx -y @example/docs-mcp
codex mcp add --url https://mcp.example.com/sse
codex mcp login <server>
codex mcp list --json
codex mcp remove docs
\`\`\`

\`codex mcp-server\` 还能让 Codex 自己作为 MCP 服务器通过 stdio 暴露。

HTTP 服务器用 \`bearer_token_env_var\` 读环境变量，不要把 token 写进仓库里的 config。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli"],
    tags: ["codex mcp", "OAuth", "stdio"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "mcp-required-and-allowlist",
    no: 58,
    title: "MCP 设 required，并用工具白名单",
    summary: "核心工作流依赖的服务器设 required = true。用 enabled_tools 只暴露必要工具，降低选错工具的概率。",
    body: `\`\`\`toml
[mcp_servers.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]
required = true
startup_timeout_sec = 15
tool_timeout_sec = 60
enabled_tools = ["list_issues", "create_issue", "get_issue"]
\`\`\`

可选服务器可以允许启动宽限（\`mcp_optional_startup_grace_ms\`，默认约 1s），这样慢启动不会拖死会话。

只读 MCP 工具在声明 \`readOnlyHint\` 时可以并发跑——接很多只读查询时很有用。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["required", "白名单", "超时"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "subagents-when-asked",
    no: 59,
    title: "子代理只在你明确要求时出现",
    summary: "Codex 不会自己把工作拆成一堆孩子。探索、测试、分诊这类有界工作，再显式委派。",
    body: `主代理盯住核心问题。把这些丢掉子代理：

- 只读的全仓搜索
- 「一边写测试、一边改另一处不重叠的模块」
- 并行的专项审查（安全 / 正确性 / 文档）

不要：

- 为十行改动 spawn
- 让两个孩子写同一批文件
- 深度嵌套（默认 \`max_depth = 1\` 就是为了防止指数级烧 token）

\`/agent\` 或 \`/subagents\` 在线程间切换。子代理的批准请求会带线程标签回到父终端。`,
    category: "subagents",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["subagents", "/agent", "并行"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Subagents",
        url: "https://developers.openai.com/codex/subagents",
      },
    ],
    related: ["worktree-not-subagent", "custom-agent-toml"],
  },
  {
    id: "explorer-vs-worker",
    no: 60,
    title: "内置 explorer 做探索，worker 做有界实现",
    summary: "内置角色包括 default、worker、explorer。给只读探索用更便宜的模型。",
    body: `自定义 agent 文件可以覆盖 \`model\` 和 \`model_reasoning_effort\`。省略的字段从父会话继承，包括你在 \`/permissions\` 或 \`--yolo\` 里做的现场覆盖。

探索型子代理适合 mini + low reasoning；实现型保持与父级相同的模型。

在 \`config.toml\` 里设上限：

\`\`\`toml
[agents]
enabled = true
max_threads = 4
max_depth = 1
\`\`\`

默认 \`max_threads = 6\`。调低一点能防止「热情过度」的并行。`,
    category: "subagents",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["explorer", "worker", "模型"],
    sources: [
      {
        label: "OpenAI · Subagents",
        url: "https://developers.openai.com/codex/subagents",
      },
    ],
  },
  {
    id: "custom-agent-toml",
    no: 61,
    title: "把重复的委派写成 agents/*.toml",
    summary: "全局放 ~/.codex/agents/，仓库放 .codex/agents/。必填 name、description、developer_instructions。",
    body: `\`\`\`toml
# .codex/agents/reviewer.toml
name = "reviewer"
description = "关注正确性、安全和缺测试的 PR 审查者。"
developer_instructions = """
像 owner 一样审。先报真实风险。
标出问题但不要直接改代码，除非我明确要求。
"""
sandbox_mode = "read-only"
model_reasoning_effort = "high"
\`\`\`

可选：\`nickname_candidates\`、\`model\`、\`mcp_servers\`、\`skills.config\`。

非交互的 \`codex exec\` 里，需要新批准的动作会报错并回到父级。设计无人值守工作流时，让 worker 待在继承的沙箱里，别指望交互批准。`,
    category: "subagents",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["agents.toml", "reviewer", "只读"],
    sources: [
      {
        label: "OpenAI · Subagents",
        url: "https://developers.openai.com/codex/subagents",
      },
    ],
  },
  {
    id: "spawn-agents-on-csv",
    no: 62,
    title: "大批同类任务用 spawn_agents_on_csv",
    summary: "一行一个工作项。Codex 读 CSV、按行 spawn、等全部结束、把结果写回 CSV。实验性功能。",
    body: `适合：批量改 API、对文件清单做审查、对目录清单做迁移。

\`codex exec\` 会在 stderr 打一行进度。导出的 CSV 带原行数据以及 \`job_id\`、\`item_id\`、\`status\`、\`last_error\`、\`result_json\`。

在指令模板里强制 \`report_agent_job_result\`。给 \`agents.job_max_runtime_seconds\` 设超时，避免一个卡住的 worker 拖死整批。

这是高 token 操作。先用 3 行样本验证提示，再开全量。`,
    category: "subagents",
    level: "advanced",
    surfaces: ["cli", "ci"],
    tags: ["CSV", "批量", "exec"],
    sources: [
      {
        label: "OpenAI · Subagents",
        url: "https://developers.openai.com/codex/subagents",
      },
    ],
  },
  {
    id: "hooks-lifecycle",
    no: 63,
    title: "Hooks 把策略插入 agent 循环",
    summary: "SessionStart、PreToolUse、PermissionRequest、PostToolUse、UserPromptSubmit、Stop、Interrupt。",
    body: `先开功能：

\`\`\`toml
[features]
codex_hooks = true
\`\`\`

钩子放 \`~/.codex/hooks.json\` 或项目 \`.codex/hooks.json\`（需信任）。stdin 收 JSON。\`matcher\` 是正则，常见：\`Bash\`、\`apply_patch\`、\`Edit|Write\`、\`mcp__server__tool\`。

用途：

- \`SessionStart\`：注入当前 git 分支、oncall 信息
- \`PreToolUse\`：拦 \`rm -rf\`、拦生产部署
- \`PostToolUse\`：每次补丁后跑 lint
- \`UserPromptSubmit\`：附加机密分类提醒
- \`Stop\`：失败时继续或停下
- \`Interrupt\`：顶层轮被打断时跑清理（不用于子代理）

\`/hooks\` 可在 TUI 里浏览、信任、开关。新的或改过的钩子必须先信任。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["hooks", "PreToolUse", "安全"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://developers.openai.com/codex/hooks",
      },
    ],
  },
  {
    id: "rules-vs-hooks",
    no: 64,
    title: "Rules 管沙箱外命令，Hooks 管生命周期",
    summary: "命令规则在 Codex 请求出沙箱时生效。forbidden > prompt > allow。Hooks 更通用，能看补丁和 MCP。",
    body: `规则文件：

- 用户：\`~/.codex/rules/default.rules\`
- 项目：\`<repo>/.codex/rules/*.rules\`（需信任）

\`\`\`text
prefix_rule(pattern=["git", "push"], decision="prompt")
prefix_rule(pattern=["rm", "-rf"], decision="forbidden")
\`\`\`

测试：

\`\`\`bash
codex execpolicy check --pretty --rules file -- git push origin main
\`\`\`

选规则还是钩子：只要前缀匹配的命令策略，用 rules；要看补丁内容、MCP 调用或补上下文，用 hooks。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["rules", "execpolicy", "hooks"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "ask-codex-to-write-hooks",
    no: 65,
    title: "让 Codex 给自己写钩子",
    summary: "「写一个每次补丁后跑 lint 的 PostToolUse 钩子」。先本地验证，再提交到团队目录。",
    body: `Agent 很适合写这些样板。你要盯的是：

- 钩子是否幂等
- 失败时是否 fail-closed
- 会不会把密钥打进日志
- 项目钩子在 git worktree 里是否可靠（有报告说项目钩子在 worktree 中失效，用户级钩子可作变通）

自动化跑钩子需要 \`--dangerously-bypass-hook-trust\`——只在你已经审查过来源时用。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["hooks", "lint", "worktree"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://developers.openai.com/codex/hooks",
      },
    ],
  },
];
