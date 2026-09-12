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
    related: ["skill-installer", "repeat-becomes-skill", "skill-declare-mcp-in-openai-yaml"],
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

要分发、带 MCP/App 配置时，打成 plugin，不要只拷贝文件夹。技能装太多、目录被截断时，先这里关掉不用的，再考虑 \`skills.max_context_tokens\`。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["路径", ".agents", "plugins"],
    related: ["skill-installer", "skill-max-context-tokens", "unity-codex-plugin"],
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
codex plugin marketplace add owner/repo
codex plugin marketplace add owner/repo --ref main --sparse .agents/plugins --json
codex plugin marketplace upgrade
codex plugin marketplace list --json
\`\`\`

v0.146+ 起有可移植 Agent Plugins，可搜本地、个人、工作区和远程目录。用 \`$plugin-creator\` 打包。

从 Claude Code 或 Cursor 迁过来，可用 \`/import\` 迁设置、MCP、插件、会话和命令。

IDE 扩展没有插件目录。0.154 起当前会话通常会捡起新装的插件工具；\`/plugins\` 里没有再新开。API key 登录时，部分需要 OAuth 的官方插件会不可用。\`/plugins\` 浏览器里 Space 只开关，不卸载。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "marketplace", "/import"],
    related: ["plugin-portable-json", "plugin-session-refresh", "marketplace-source-path-root"],
    sources: [
      {
        label: "OpenAI · Plugins",
        url: "https://developers.openai.com/codex/plugins",
      },
    ],
  },
  {
    id: "skill-installer",
    no: 108,
    title: "官方精选技能用 $skill-installer，不要手拷 ~/.codex/skills",
    summary: "给本机加 openai/skills 或其它仓库里的技能，用内置安装器。个人路径是 ~/.agents/skills。要分发给别人再打成 plugin。",
    body: `\`\`\`text
$skill-installer linear
\`\`\`

也可以让它从其它 Git 仓库拉技能。装完一般下一轮就能看见；没有就重启 Codex。这是给本机试验用的，不是团队分发通道。

过期教程还在写 \`~/.codex/skills\`。当前用户技能目录是 \`~/.agents/skills\`，仓库技能是 \`.agents/skills\`。手拷到旧路径，\`/skills\` 里常常找不到。

自己写技能用 \`$skill-creator\`。要带 MCP、连接器或钩子一起分发，用 \`$plugin-creator\` 或 \`codex plugin marketplace add owner/repo\`，再 \`codex plugin add name@marketplace\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["$skill-installer", "Skills", "路径"],
    related: ["skill-creator", "skill-locations", "playwright-cli-skill"],
    sources: [
      {
        label: "OpenAI · Agent Skills",
        url: "https://developers.openai.com/codex/skills",
      },
      {
        label: "OpenAI · Build skills",
        url: "https://learn.chatgpt.com/docs/build-skills",
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
codex mcp add docs --url https://mcp.example.com/mcp
codex mcp login docs
codex mcp list --json
codex mcp remove docs
\`\`\`

0.154 起 \`codex mcp-server\` 入口已经去掉。把 Codex 接到别的客户端，走 \`codex app-server\` 或官方 SDK，不要再抄旧的 stdio MCP 包装。

HTTP 服务器用 \`bearer_token_env_var\` 读环境变量，不要把 token 写进仓库里的 config。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli"],
    tags: ["codex mcp", "OAuth", "stdio"],
    related: ["mcp-http-auth-chatgpt", "mcp-http-bearer-env", "mcp-http-not-sse", "mcp-stdio-stdout-jsonrpc"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
      {
        label: "OpenAI · Codex changelog 0.154.0",
        url: "https://developers.openai.com/codex/changelog",
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

可选服务器的启动宽限是顶层 \`mcp_optional_startup_grace_ms\`，默认 \`1000\`。设成 \`0\` 则等到各服务器自己的 \`startup_timeout_sec\`。\`required = true\` 的服务器仍走各自超时，不受这段宽限影响。

只读 MCP 工具在声明 \`readOnlyHint\` 时可以并发跑——接很多只读查询时很有用。

官方托管 GitHub MCP 走 Streamable HTTP，不要把 \`@modelcontextprotocol/server-github\` 当成现行官方远程。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["required", "白名单", "超时"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
      {
        label: "OpenAI · MCP",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
    related: ["mcp-add-and-login", "mcp-github-hosted", "mcp-approval-and-output-limit"],
  },
  {
    id: "subagents-when-asked",
    no: 59,
    title: "子代理要你开口，或写进 AGENTS.md / Skill",
    summary: "本地 Codex 默认不偷偷拆任务。你说 spawn，或项目/技能指令要求委派，才会派孩子。网页 Ultra 才可能主动拆。",
    body: `主代理盯住核心问题。把这些丢掉子代理：

- 只读的全仓搜索
- 「一边写测试、一边改另一处不重叠的模块」
- 并行的专项审查（安全 / 正确性 / 文档）

不要：

- 为十行改动 spawn
- 让两个孩子写同一批文件
- 深度嵌套（默认 \`max_depth = 1\` 就是为了防止指数级烧 token）

本地 CLI / 桌面 / IDE：直接说「spawn two agents」，**或**在 \`AGENTS.md\` / Skill 里写清何时委派。网页 ChatGPT Work 在 Ultra 才可能主动拆；其余档位仍要开口。

\`/agent\` 切换线程。批准层会标出是哪个孩子在要权限，按 \`o\` 打开那个线程再批。IDE 合成器上方能停掉全部子代理。`,
    category: "subagents",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["subagents", "/agent", "并行"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Subagents (Learn)",
        url: "https://learn.chatgpt.com/docs/agent-configuration/subagents",
      },
      {
        label: "OpenAI · Subagents",
        url: "https://developers.openai.com/codex/subagents",
      },
    ],
    related: ["worktree-not-subagent", "custom-agent-toml", "subagent-start-hook"],
  },
  {
    id: "explorer-vs-worker",
    no: 60,
    title: "内置 explorer 做探索，worker 做有界实现",
    summary: "内置角色包括 default、worker、explorer。给只读探索用更便宜的模型。",
    body: `自定义 agent 文件可以覆盖 \`model\` 和 \`model_reasoning_effort\`。省略的字段从父会话继承，包括你在 \`/permissions\` 或 \`--yolo\` 里做的现场覆盖。

探索型子代理适合 \`gpt-5.6-terra\` + low reasoning；实现型保持与父级相同的模型。\`gpt-5.6-luna\` 给窄、重复、量大的工人。

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
        label: "OpenAI · Subagents (Learn)",
        url: "https://learn.chatgpt.com/docs/agent-configuration/subagents",
      },
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
    related: ["subagents-when-asked", "explorer-vs-worker", "subagent-start-hook"],
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
    body: `当前稳定开关是 \`features.hooks\`（默认已开）。旧键 \`codex_hooks\` 仍当别名，新配置写这个：

\`\`\`toml
[features]
hooks = true
\`\`\`

钩子放 \`~/.codex/hooks.json\`、项目 \`.codex/hooks.json\`（需信任），或直接写进 \`[hooks]\`。stdin 收 JSON。\`matcher\` 是正则，常见：\`Bash\`、\`apply_patch\`、\`Edit|Write\`、\`mcp__server__tool\`。

用途：

- \`SessionStart\`：注入当前 git 分支、oncall 信息
- \`PreToolUse\`：拦 \`rm -rf\`、拦生产部署
- \`PostToolUse\`：每次补丁后跑 lint
- \`UserPromptSubmit\`：附加机密分类提醒
- \`Stop\`：失败时继续或停下；反复 block 要认 stdin 里的 stop_hook_active
- \`Interrupt\`：顶层轮被打断时跑清理（不用于子代理）。Esc 时 \`Stop\` 不会跑，不要把清理只挂在 Stop 上

当前会跑的 handler 只有 \`command\` 和 \`mcp_tool\`。配置里的 \`prompt\` / \`agent\` 会解析但跳过。

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
    related: ["interrupt-hook", "plugin-hook-plugin-root", "permission-request-hook"],
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
codex execpolicy check --pretty --rules ~/.codex/rules/default.rules -- git push origin main
\`\`\`

agent 实际跑的常常是绝对路径。只写了 \`["git", "push"]\` 时，\`/usr/bin/git push\` 默认对不上。仓库文档里的 \`--resolve-host-executables\` 会按 basename 回退；若定义了 \`host_executable(name="git", paths=[...])\`，只有列表里的路径才允许回退：

\`\`\`bash
codex execpolicy check --pretty --rules ~/.codex/rules/default.rules \\
  --resolve-host-executables -- /usr/bin/git push origin main
\`\`\`

Learn 页的旗标表目前只列了 \`--pretty\` 和 \`--rules\`；本机 \`codex execpolicy check --help\` 仍以当前二进制为准。

加载时用 \`match\` / \`not_match\` 当内联测试。\`pattern\` 必须是精确前缀：\`gh pr --repo x view\` 匹配不到 \`["gh", "pr", "view"]\`。\`bash -lc\` 里只有线性 \`&&\` \`||\` \`;\` \`|\` 才会拆开分别套规则；有重定向、替换或变量时整段当一条。

选规则还是钩子：只要前缀匹配的命令策略，用 rules；要看补丁内容、MCP 调用或补上下文，用 hooks。\`codex exec --ignore-rules\` 会跳过用户和项目 \`.rules\`，只给已经审查过策略的自动化用。

权限档里只要有任意 deny-read，\`allow\` 规则仍可能留在沙箱里跑。\`execpolicy check\` 报 allow 不等于出沙箱，见 execpolicy allow 遇上 deny-read 那条。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["rules", "execpolicy", "hooks"],
    related: ["ignore-rules-vs-config", "execpolicy-allow-denied-read", "sandbox-offline-test"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
      {
        label: "OpenAI · Rules",
        url: "https://learn.chatgpt.com/docs/agent-configuration/rules",
      },
      {
        label: "openai/codex execpolicy README",
        url: "https://github.com/openai/codex/blob/main/codex-rs/execpolicy/README.md",
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
  {
    id: "mcp-host-split",
    no: 92,
    title: "MCP 配在 ~/.codex，ChatGPT 网页读不到",
    summary: "桌面应用、CLI、IDE 扩展共用一份 config.toml。托管的 ChatGPT Work 不读这文件。",
    body: `\`codex mcp add …\` 写进 \`~/.codex/config.toml\` 之后，本地 CLI、IDE 扩展和 ChatGPT 桌面应用能看见。ChatGPT 网页上的 Work 不读这份文件。在网页里缺工具，先确认你是不是走了另一套主机，而不是怀疑 MCP 没装上。

插件也按表面拆：CLI 用 \`/plugins\`，桌面应用有插件目录，IDE 扩展不支持插件。0.154 起当前会话通常会刷新捆绑技能和 MCP；没有再新开。

仓库里的 \`.codex/config.toml\` 只覆盖这个项目被信任后的行为，而且不能写凭证类主机键。把 Key 写进仓库配置，迟早会被提交。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "config.toml", "ChatGPT"],
    related: ["desktop-project-mcp", "mcp-add-and-login", "three-layer-config"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://developers.openai.com/codex/config-advanced",
      },
      {
        label: "OpenAI · Plugins",
        url: "https://developers.openai.com/codex/plugins",
      },
    ],
  },
  {
    id: "hooks-command-windows",
    no: 102,
    title: "Windows 钩子用 commandWindows，别指望 PATH 上的 bash",
    summary: "跨平台钩子保留 command，Windows 另写 command_windows。系统 PATH 上的 bash 经常是 WSL 垫片，跑 Windows 路径会直接 Failed。",
    body: `钩子的 \`command\` 保持 Unix 可移植写法。Windows 运行时只看可选覆盖：

\`\`\`toml
[[hooks.PreToolUse]]
matcher = "^Bash$"

[[hooks.PreToolUse.hooks]]
type = "command"
command = "python3 /enterprise/hooks/pre_tool_use_policy.py"
command_windows = "py -3 C:\\\\enterprise\\\\hooks\\\\pre_tool_use_policy.py"
timeout = 30
statusMessage = "Checking Bash command"
\`\`\`

TOML 里 \`command_windows\` 和 \`commandWindows\` 都能写；\`hooks.json\` 用 camelCase。信任哈希按当前系统选中的那条命令计算。

企业托管钩子还要分目录：Unix 用 \`managed_dir\`，Windows 用 \`windows_managed_dir\`，脚本本身不会随 Codex 分发。命令写成托管目录下的绝对路径。

原生 Windows 上 \`bash\` 常解析到 \`%LOCALAPPDATA%\\Microsoft\\WindowsApps\\bash.exe\`（WSL 垫片），它执行不了 \`C:\\...\` 这种脚本路径，市场插件钩子会全部显示 Failed。不要依赖 PATH 里的 \`bash\`：改用 Git Bash 的绝对路径，或直接 \`commandWindows\` 调 \`py\` / \`pwsh\`。命令钩子可设 \`async = true\` 放到后台；\`SessionEnd\` 仍强制同步，后台钩子不能拦操作。

仓库钩子不要写相对路径 \`.codex/hooks/...\`。从子目录启动时 cwd 会变，用 \`git rev-parse --show-toplevel\` 锚定到仓库根。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["hooks", "Windows", "commandWindows"],
    related: ["hooks-lifecycle", "windows-elevated-sandbox", "managed-hooks-only"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://developers.openai.com/codex/hooks",
      },
      {
        label: "openai/codex #38295",
        url: "https://github.com/openai/codex/issues/38295",
      },
    ],
  },
  {
    id: "mcp-approval-and-output-limit",
    no: 105,
    title: "MCP 用 writes 审批，再给吵闹工具单独限输出",
    summary: "default_tools_approval_mode = \"writes\" 只拦非只读工具。单工具还能设 output_token_limit，避免日志类 MCP 撑爆会话。",
    body: `\`\`\`toml
[mcp_servers.chrome_devtools]
url = "http://localhost:3000/mcp"
enabled_tools = ["open", "screenshot"]
disabled_tools = ["screenshot"]
default_tools_approval_mode = "writes"
startup_timeout_sec = 20
tool_timeout_sec = 45

[mcp_servers.chrome_devtools.tools.open]
approval_mode = "approve"
output_token_limit = 8000
\`\`\`

这张表示例里的 \`url = "http://localhost:3000/mcp"\` 是**已经在跑**的 Streamable HTTP 服务。官方 Chrome DevTools MCP 包是 stdio：\`codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest\`，不要把两套抄成一台。

\`writes\` 只对没标只读的工具提问；\`approve\` / \`prompt\` 更严；\`auto\` 几乎不问。\`disabled_tools\` 在白名单之后再生效。

维护 MCP 服务器时，初始化返回的 \`instructions\` 前 512 个字符要能独立看懂：跨工具约束、限流、什么时候不该调用。Codex 拿这段决定要不要用这个服务器。

插件自带的 MCP 不要在 \`[mcp_servers]\` 里改启动命令，开关和审批写在 \`[plugins.\"name@version\".mcp_servers.server]\`。\`codex exec\` 里键名少了 \`@marketplace\` 会静默 miss，表现为 \`user cancelled MCP tool call\`。

这和顶层 \`tool_output_token_limit\` 不是同一键：后者裁所有工具输出进会话历史的预算，不只针对某一个 MCP 工具。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "审批", "output_token_limit"],
    related: ["mcp-required-and-allowlist", "chrome-devtools-mcp", "tool-output-token-limit"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "record-replay-skill",
    no: 114,
    title: "macOS 桌面 Record & Replay 能录出 SKILL.md，CLI 没有这个入口",
    summary: "在插件页选 Record a skill，演示一遍后生成可编辑技能。必须打开 Computer Use。企业 requirements.toml 关掉 computer_use 会连录制一起禁掉。",
    body: `这不是 CLI 命令。打开 ChatGPT 桌面应用 → Work 或 Codex → Plugins → \`+\` → Record a skill。批准确认录屏后演示完整流程，从菜单栏或覆盖层停止。生成的技能说明何时用、要哪些输入、怎么验收；先改草稿再保存。

回放：新开聊天，点名技能并给出这次不同的参数（文件、日期、工单）。执行时用当前环境里已有的 Computer Use、浏览器动作和已装插件。生成的 \`SKILL.md\` 可以拷到 \`~/.agents/skills\`，之后 CLI 也能 \`$name\` 调用。

适用：步骤稳定、用嘴说不清的偏好操作。不要在录像里出现密钥。团队分发、捆绑 MCP / 连接器时，录完再打成 plugin，不要把一次演示当发布物。

看不到入口：先确认在 macOS 且 Computer Use 可用。\`requirements.toml\` 里 \`[features] computer_use = false\` 会同时关掉 Computer Use 和录制。地区限制以当前官方页为准。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["app"],
    tags: ["Record & Replay", "Skills", "桌面"],
    related: ["skill-creator", "skill-locations", "repeat-becomes-skill"],
    sources: [
      {
        label: "OpenAI · Record & Replay",
        url: "https://learn.chatgpt.com/docs/extend/record-and-replay",
      },
    ],
  },
  {
    id: "hooks-after-compact",
    no: 119,
    title: "压缩后要补上下文，用 SessionStart 的 compact 匹配",
    summary: "matcher 写成 ^compact$。自动压缩发生在一轮中间时，钩子给出的 additionalContext 会立刻送进续写，不必等下一句用户输入。",
    body: `\`SessionStart\` 的 \`source\` 是 \`startup\`、\`resume\`、\`clear\` 或 \`compact\`。仓库根下的示例：

\`\`\`toml
[[hooks.SessionStart]]
matcher = "^compact$"

[[hooks.SessionStart.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/session_start.py"'
additionalContextLimit = 5000
\`\`\`

压缩后、下一次模型请求前会跑。自动 compact 插在一轮中间时也一样。钩子返回 \`continue: false\` 会结束这一轮、不再发请求。

压缩前后还有 \`PreCompact\` / \`PostCompact\`，\`matcher\` 对 \`manual\` 或 \`auto\`。\`PreCompact\` 返回 \`continue: false\` 会取消压缩。

命令钩子默认会堵住触发它的操作。\`async = true\` 可放到后台；\`SessionEnd\` 永远同步，输出也不能转向 agent。相对路径 \`.codex/hooks/...\` 在子目录启动会漂，用 git 根锚定。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["hooks", "/compact", "SessionStart"],
    related: ["hooks-lifecycle", "mcp-tool-hook", "stop-hook-active"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
    ],
  },
  {
    id: "linear-mcp-add",
    no: 150,
    title: "本地接 Linear 用官方 MCP URL，不要手抄 TOML",
    summary: "Cloud 里可以指派 issue 或评论 @Codex。本机 CLI/IDE/桌面走同一条 MCP：add 再 login。",
    body: `Cloud：先接通 GitHub 环境和 Linear 集成。可以把 issue 指派给 Codex，或在评论里 \`@Codex fix this in owner/repo\`。Triage 规则也能自动指派；那种情况用的是 issue 创建者的账号。

本机不要只靠 Cloud。CLI：

\`\`\`bash
codex mcp add linear --url https://mcp.linear.app/mcp
codex mcp login linear
\`\`\`

或写用户配置后再登录：

\`\`\`toml
[mcp_servers.linear]
url = "https://mcp.linear.app/mcp"
\`\`\`

\`codex mcp login linear\`

桌面应用、CLI、IDE 共用 \`~/.codex\`。网页 Work 读不到这条本机 MCP。环境选错时，在同一条评论里写清 \`owner/repo\` 再 \`@Codex\` 一次。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide", "cloud"],
    tags: ["Linear", "MCP", "@Codex"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "mcp-figma-remote"],
    sources: [
      {
        label: "OpenAI · Use Codex in Linear",
        url: "https://learn.chatgpt.com/docs/third-party/linear",
      },
    ],
  },
  {
    id: "mcp-oauth-loopback-callback",
    no: 162,
    title: "MCP OAuth 用无端口的 127.0.0.1，不要写 localhost",
    summary: "把 add 打印出的回调原样登记。localhost、IPv6、HTTPS 不会自动补监听端口。远程 Devbox 改 mcp_oauth_callback_url。",
    body: `预注册客户端：

\`\`\`bash
codex mcp add example --url https://mcp.example.com --oauth-client-id my-client
\`\`\`

把终端里打印的 \`OAuth callback URL\` **原样**登到授权服务器。不要自己加端口，也不要改成 \`localhost\`。

无端口的 \`http://127.0.0.1/callback\` 才允许 Codex 在授权时插入实际监听端口（RFC 8252）。下面这些**不会**做端口替换：

- \`http://localhost/callback\`
- 已经带端口的 URL
- IPv6 或 HTTPS

固定端口要两边一致：

\`\`\`toml
mcp_oauth_callback_port = 5555

[mcp_servers.example]
url = "https://mcp.example.com"

[mcp_servers.example.oauth]
client_id = "my-client"
callback_url = "http://127.0.0.1:5555/callback"
callback_port = 5555
\`\`\`

远程 Devbox 把 \`mcp_oauth_callback_url\` 设成入口 URL。\`codex mcp login server --oauth-client-registration cimd|dcr\` 只影响这一次登录，不写进 config。

HTTP 头不要写进仓库：用 \`http_headers_helper\` 打出 JSON 头，或 \`bearer_token_env_var\`。显式 bearer / OAuth 优先于 helper 的 \`Authorization\`。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "OAuth", "回调"],
    related: ["mcp-oauth-callback-id", "plugin-mcp-oauth-json", "mcp-oauth-resource"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "skill-declare-mcp-in-openai-yaml",
    no: 163,
    title: "技能缺 MCP 时，在 agents/openai.yaml 声明依赖",
    summary: "features.skill_mcp_dependency_install 默认开。声明只负责装上工具，工作流仍要写进 SKILL.md。",
    body: `技能目录里放 \`agents/openai.yaml\`：

\`\`\`yaml
interface:
  display_name: "Docs lookup"
  short_description: "Search OpenAI developer docs"

policy:
  allow_implicit_invocation: true

dependencies:
  tools:
    - type: "mcp"
      value: "openaiDeveloperDocs"
      description: "OpenAI Docs MCP server"
      transport: "streamable_http"
      url: "https://developers.openai.com/mcp"
\`\`\`

\`value\` 是服务器名。默认会提示安装缺失依赖；不想弹窗：

\`\`\`toml
[features]
skill_mcp_dependency_install = false
\`\`\`

依赖不会替代技能正文。SKILL.md 仍要写清用哪个工具、顺序、结果缺失怎么办。禁隐式调用把 \`allow_implicit_invocation\` 设成 \`false\`，\`$\` 显式调用仍然可用。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["Skills", "MCP", "openai.yaml"],
    related: ["skill-creator", "mcp-add-and-login", "mcp-openai-docs"],
    sources: [
      {
        label: "OpenAI · Build skills",
        url: "https://learn.chatgpt.com/docs/build-skills",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "execpolicy-allow-denied-read",
    no: 170,
    title: "权限档有 deny-read 时，execpolicy allow 仍可能不出沙箱",
    summary: "check 报 allow 只说明规则匹配。任意 deny-read 会禁止出沙箱，命令仍走默认沙箱，git fetch 还会弹窗。",
    body: `Rules 文档把 \`decision = "allow"\` 写成可以出沙箱跑受信任命令。权限档里只要有一条 deny-read（哪怕是探测路径），运行时会关掉这次 bypass，命令留在默认沙箱。\`codex execpolicy check\` 仍然打印 \`allow\`，没有警告。

核对：

\`\`\`bash
codex execpolicy check --pretty --rules ~/.codex/rules/default.rules -- git fetch
\`\`\`

报 allow 之后，在开了 deny-read 的会话里跑同一条，仍可能要批准，或在 Seatbelt / Landlock 里失败。这是为了保住凭证边界，不是规则没加载。

能选的路：

- 要出沙箱的受信任 CLI：不要在同一套权限档写 deny-read
- 要挡 \`~/.ssh\` / \`.env\`：接受 \`allow\` 仍在沙箱里跑，或把这类命令交给钩子 / 人工批准
- 不要为了让 \`git fetch\` 安静而改成 \`:danger-full-access\`

\`check\` 只评规则文件，不模拟当前权限档。改完 deny-read 用真实会话或 \`codex sandbox\` 再试一次。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["execpolicy", "permissions", "沙箱"],
    related: ["rules-vs-hooks", "permissions-not-sandbox-mode", "sandbox-offline-test"],
    sources: [
      {
        label: "openai/codex#38318",
        url: "https://github.com/openai/codex/issues/38318",
      },
      {
        label: "OpenAI · Rules",
        url: "https://learn.chatgpt.com/docs/agent-configuration/rules",
      },
    ],
  },
  {
    id: "mcp-tool-hook",
    no: 171,
    title: "钩子要调 MCP，用 type mcp_tool，不要再包一层 shell",
    summary: "server / tool / input 直接打到已连接的 MCP。服务器没起来不会拦操作。prompt 和 agent 类型会解析但跳过。",
    body: `生命周期钩子可以直接调 MCP，不必再写 \`npx …\` 包装。JSON 示例：

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "mcp_tool",
            "server": "scanner",
            "tool": "scan_patch",
            "input": { "patch": "\${tool_input.command}" },
            "timeout": 30,
            "statusMessage": "Scanning edited files"
          }
        ]
      }
    ]
  }
}
\`\`\`

\`server\` 必须是已经连上的 MCP 名。钩子不会替你启动或重连。\`input\` 里用 \`\${field.nested}\` 从事件取值：整段占位保留 JSON 类型，嵌在字符串里就变成文本。

官方约束：

- 只跑 \`command\` 和 \`mcp_tool\`。\`prompt\` / \`agent\` 写了也不会执行
- \`mcp_tool\` 始终同步，不走工具批准，也不会再触发别的钩子
- 超时取钩子 \`timeout\` 和服务器 \`tool_timeout_sec\` 里较短的那个
- \`SessionEnd\` 不支持 \`mcp_tool\`；\`SessionStart\` 可能在 MCP 就绪前就跑，那时不会拦会话
- 工具返回 block 才会拦住操作。缺服务器、连不上、工具不存在、执行报错都不拦

不要把 \`mcp_tool\` 的 Stop 当成合规完成门。服务器没配或起不来时，\`codex exec --json\` 仍可能直接 \`turn.completed\`。讨论中的 failureMode 还没落地，不要抄进配置。真正的门继续用能 exit 2 / 返回 deny 的 \`command\` 钩子，并自己确认 MCP 已在 \`/mcp\` 里。

先 \`codex mcp add\` 再信任钩子。新开会话后 \`/hooks\` 应能看到 server 和 tool 字段。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["hooks", "mcp_tool", "MCP"],
    related: ["hooks-lifecycle", "mcp-required-and-allowlist", "stop-hook-active"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
      {
        label: "openai/codex#39858",
        url: "https://github.com/openai/codex/issues/39858",
      },
    ],
  },
  {
    id: "stop-hook-active",
    no: 172,
    title: "Stop 钩子看到 stop_hook_active 就要放行",
    summary: "反复返回 block 没有上限。相同反馈会把 CLI 卡进无限续写，只能杀进程。第二次必须允许完成。",
    body: `\`Stop\`（以及 \`SubagentStop\`）的 stdin JSON 带 \`stop_hook_active\`。第一次 block 之后，Codex 会把反馈送回模型再跑一轮，然后再次调 Stop。运行时目前没有次数上限，也不会去重。钩子自己忽略这个旗标，或因为外部依赖坏了每次都返回同一段 block，会话就会空转烧额度。

最小可执行形状：

\`\`\`python
#!/usr/bin/env python3
import json, sys

payload = json.load(sys.stdin)
if payload.get("stop_hook_active"):
    print(json.dumps({"systemMessage": "Stop already continued; allowing complete."}))
    sys.exit(0)
# 第一次：校验失败才 block。依赖缺失时不要伪装成 policy block。
print(json.dumps({"systemMessage": "ok"}))
\`\`\`

外部扫描器、网关、配置根路径找不到时，返回失败或放行，不要反复 \`decision: "block"\`。官方约定是：钩子看见「已经拦过一次」就允许完成。

逃出路目前只有杀 CLI 进程或重开会话。\`--dangerously-bypass-hook-trust\` 解决不了已经信任、但每次都 block 的钩子。改完钩子后新开会话，不要指望卡死的那一轮自己醒过来。

Esc / kill 打断正在跑的顶层轮时，\`Stop\` **不会**跑。临时文件、扫描器状态不要只挂在 Stop 上，另外写 \`Interrupt\`。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["hooks", "Stop", "stop_hook_active"],
    related: ["interrupt-hook", "hooks-lifecycle", "mcp-tool-hook"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
      {
        label: "openai/codex#37937",
        url: "https://github.com/openai/codex/issues/37937",
      },
    ],
  },
  {
    id: "managed-hooks-only",
    no: 174,
    title: "只要托管钩子：allow_managed_hooks_only 只能写进 requirements.toml",
    summary: "写进普通 config.toml 不会生效。用户、项目、会话和插件钩子会被跳过，MDM 脚本还要自己分发。",
    body: `企业想禁止本机 \`~/.codex/hooks.json\` 和仓库 \`.codex/hooks.json\`，只留管理员那一套，把开关写进 \`requirements.toml\`（或 MDM 的 \`requirements_toml_base64\`），**不要**写进 \`~/.codex/config.toml\`。官方 config.md 写明：普通配置层里的同名键会被忽略。

\`\`\`toml
# requirements.toml（系统层 / MDM / 云托管），不是用户 config.toml
allow_managed_hooks_only = true

[features]
hooks = true

[hooks]
managed_dir = "/enterprise/hooks"
windows_managed_dir = 'C:\\enterprise\\hooks'

[[hooks.PreToolUse]]
matcher = "^Bash$"

[[hooks.PreToolUse.hooks]]
type = "command"
command = "python3 /enterprise/hooks/pre_tool_use_policy.py"
command_windows = "py -3 C:\\\\enterprise\\\\hooks\\\\pre_tool_use_policy.py"
timeout = 30
statusMessage = "Checking managed Bash command"
\`\`\`

要点：

- 只跳过用户、项目、会话、插件来源；\`requirements.toml\` 和其他托管层仍会加载
- 用户把 \`[features] hooks = false\` 时，还要在 requirements 里钉 \`hooks = true\`，否则托管钩子也被关掉
- Codex **不会**把 \`managed_dir\` 里的脚本随安装分发，MDM 必须自己放绝对路径
- 启动时被跳过的本机钩子会打简短警告；用 \`/debug-config\` 看实际生效层

个人机器不要抄这一段。没有 MDM 时，继续用用户级 \`hooks.json\` 并走信任流程。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["hooks", "requirements.toml", "企业"],
    related: ["hooks-command-windows", "marketplace-allowed-sources", "debug-config-strict"],
    sources: [
      {
        label: "OpenAI · Managed configuration",
        url: "https://learn.chatgpt.com/docs/enterprise/managed-configuration",
      },
      {
        label: "openai/codex docs/config.md",
        url: "https://github.com/openai/codex/blob/main/docs/config.md",
      },
    ],
  },
  {
    id: "session-end-hook",
    no: 175,
    title: "SessionEnd 做清理：默认 1 秒，切走对话不会立刻触发",
    summary: "归档、删除、正常退出、空闲约 30 分钟才跑。输出不能续写会话。不要用 mcp_tool，也不要设 600 秒超时。",
    body: `\`SessionEnd\` 只给主线程。子代理结束走 \`SubagentStop\`，不要混用。触发包括：仍打开时归档或删除对话、进程正常退出、没有任何客户端连着且空闲约 30 分钟。切到别的对话，或 app-server 的 \`thread/unsubscribe\`，**不会**马上跑。

\`\`\`toml
[[hooks.SessionEnd]]
matcher = "other"

[[hooks.SessionEnd.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/session_end.py"'
timeout = 3
statusMessage = "Saving session notes"
\`\`\`

官方约束：

- 现在 \`reason\` 只有 \`other\`。matcher 可省略，或写成 \`other\`
- 默认超时 **1 秒**，上限 **3 秒**。别的钩子默认 600 秒，抄过来会在拆会话时被砍掉
- 输出是建议性的：不能 \`continue: false\`，也不能把 additionalContext 送回模型
- 不支持 \`mcp_tool\`；\`async = true\` 仍同步跑
- 钩子执行时 transcript 已经 flush，stdin 里有 \`session_id\`、\`transcript_path\`、\`cwd\`

适合写收尾笔记、删临时目录。不要在这里做完成门或再调一次 MCP 扫描。Esc 打断正在跑的顶层轮走 \`Interrupt\`，不是 \`SessionEnd\`。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["hooks", "SessionEnd", "清理"],
    related: ["interrupt-hook", "hooks-lifecycle", "hooks-one-representation"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
    ],
  },
  {
    id: "mcp-stdio-remote-executor",
    no: 176,
    title: "远端执行器上跑 stdio MCP：experimental_environment = remote",
    summary: "实验项。HTTP MCP 远程放置还没做。source = remote 的环境变量也只有这条路径才读远端。",
    body: `本地 stdio MCP 默认在 Codex 所在机器起进程。桌面 Remote / 远端执行器要把服务器起在**那边**时，官方样本是：

\`\`\`toml
[mcp_servers.docs]
command = "docs-server"
args = ["--port", "4000"]
experimental_environment = "remote"
env_vars = ["LOCAL_TOKEN", { name = "REMOTE_TOKEN", source = "remote" }]
\`\`\`

\`env_vars\` 里字符串和 \`source = "local"\` 读本机环境。\`source = "remote"\` 读远端执行器环境，而且**要求**这条 stdio 已经走 remote。本机密钥转发见 stdio \`env_vars\` 那条，不要和这条混用。

还没做的：

- Streamable HTTP 的远程放置（配了 \`url\` 再写 \`experimental_environment = "remote"\` 不会把 HTTP 服务器搬到远端）
- 把 \`http_headers_helper\` 用在远端连接上（官方只支持本机 HTTP MCP）

没有远端执行器时不要开。先确认 Remote / executor 会话能跑普通 shell，再让慢启动的 stdio 走 remote。本机调试继续默认 \`local\`。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["MCP", "stdio", "Remote"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "http-headers-helper"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "OpenAI · Sample configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-sample",
      },
    ],
  },
  {
    id: "additional-context-limit",
    no: 177,
    title: "钩子 additionalContext 默认约 2500 token，超了会 spilled 到磁盘",
    summary: "超限只给模型头尾预览和文件路径。0 会整段塞进上下文。密钥不要写进钩子输出。",
    body: `命令钩子返回的 \`additionalContext\` 默认大约 2500 token。超出时 Codex 把全文写到临时目录 \`hook_outputs/<session_id>/\`，模型只看到头尾预览和路径。写盘失败时仍截断预览。

按 handler 改阈值：

\`\`\`toml
[[hooks.SessionStart]]
matcher = "^compact$"

[[hooks.SessionStart.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/session_start.py"'
additionalContextLimit = 5000
\`\`\`

- 省略：默认 2500
- 正整数：这个 handler 自己的阈值
- \`0\`：整段直接给模型。只有钩子自己严格限长时才用，否则一次就能吃掉窗口
- 不能产出 additionalContext 的事件会忽略这个键并警告
- 工具 feedback、Stop 续写提示仍走默认上限，改这个键管不到

多个钩子和插件的上下文会叠。不要把密钥写进 stdout：spilled 文件落在临时目录。后台钩子同样走这套大输出处理。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["hooks", "additionalContextLimit", "上下文"],
    related: ["hooks-after-compact", "hooks-lifecycle", "session-end-hook"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
    ],
  },
  {
    id: "permission-request-hook",
    no: 178,
    title: "自动批批准用 PermissionRequest，不要拿 PreToolUse 的 ask",
    summary: "只在即将弹批准时跑。deny 优先。updatedInput 会 fail closed。不需要批准的命令根本不进这个事件。",
    body: `\`PermissionRequest\` 在 shell 提权、受管网络批准这类「马上要问你」之前跑。不需要批准的调用不会进这个钩子。matcher 对 \`tool_name\`：\`Bash\`、\`apply_patch\`（也匹配 Edit/Write）、MCP 名如 \`mcp__server__tool\`。

放行：

\`\`\`json
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": { "behavior": "allow" }
  }
}
\`\`\`

拒绝：

\`\`\`json
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": { "behavior": "deny", "message": "Blocked by repository policy." }
  }
}
\`\`\`

多个钩子里任意 \`deny\` 赢。都没决定就走正常批准弹窗。stdout 纯文本会被忽略。

不要在这里返回 \`updatedInput\`、\`updatedPermissions\`、\`interrupt\`：目前保留字段，会 fail closed。改命令内容用 \`PreToolUse\` 的 \`permissionDecision: "allow"\` 加 \`updatedInput\`。\`PreToolUse\` 的 \`permissionDecision: "ask"\`、旧 \`decision: "approve"\`、\`continue: false\` 会解析但还不支持，钩子记失败，工具调用照样继续。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["hooks", "PermissionRequest", "批准"],
    related: ["hooks-lifecycle", "pretooluse-updated-input", "two-knobs"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
    ],
  },
  {
    id: "plugin-mcp-exec-key",
    no: 179,
    title: "exec 里插件 MCP 要用 name@version，少了后缀就像用户取消",
    summary: "plugins.\"inspect-skills\" 对不上 inspect-skills@meridian。lookup miss 后 exec 报 user cancelled，其实没人点过取消。",
    body: `交互 TUI 里 MCP 能跑，\`codex exec\` 却报 \`user cancelled MCP tool call\`，先查插件配置键，不要先开 \`--dangerously-bypass-approvals-and-sandbox\`。

装完插件后，审批写在带 marketplace 的键下：

\`\`\`toml
[plugins."inspect-skills@meridian"]
enabled = true

[plugins."inspect-skills@meridian".mcp_servers."py-repl"]
enabled = true
default_tools_approval_mode = "approve"
\`\`\`

只写 \`[plugins."inspect-skills".mcp_servers."py-repl"]\` 时，运行时按 \`inspect-skills@meridian\` 查找会 miss，静默落到 \`auto\`。exec 没有批准 UI，\`None\` 被收成 Cancel，于是看起来像用户点了取消。

核对：

\`\`\`bash
codex mcp list
codex exec --sandbox read-only "只用已配置的 MCP 跑一条只读探测。"
\`\`\`

\`codex mcp list\` 里的服务器名（上例是 \`py-repl\`）必须和 \`mcp_servers.\` 那段一致；插件键必须是 \`name@marketplace\`。不要用 \`--yolo\` 当修配置。用户级 \`[mcp_servers]\` 改不了插件自带服务器的启动命令。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "ci"],
    tags: ["MCP", "exec", "插件"],
    related: ["mcp-approval-and-output-limit", "plugins-vs-skills", "yolo-isolated-only"],
    sources: [
      {
        label: "openai/codex#29857",
        url: "https://github.com/openai/codex/issues/29857",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "subagent-start-hook",
    no: 181,
    title: "SubagentStart 只能给孩子注入上下文，continue:false 拦不住启动",
    summary: "matcher 对 agent_type。Review / Compact 等内部子代理不跑。真要停，用 SubagentStop。",
    body: `线程 spawn 出来的子代理**不会**再跑父级 \`SessionStart\`。启动前那一次是 \`SubagentStart\`，发生在孩子发出第一轮模型请求之前。

\`matcher\` 对 \`agent_type\`，也就是 \`spawn_agent\` 用的类型；没写类型时落到默认 agent。给审查者注入约定：

\`\`\`toml
[[hooks.SubagentStart]]
matcher = "reviewer"

[[hooks.SubagentStart.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/subagent_start.py"'
timeout = 10
statusMessage = "Loading reviewer context"
\`\`\`

stdout 纯文本会变成孩子的额外 developer 上下文。JSON 形状：

\`\`\`json
{
  "hookSpecificOutput": {
    "hookEventName": "SubagentStart",
    "additionalContext": "Review the repository test conventions first."
  }
}
\`\`\`

\`continue: false\` 只为兼容而解析，**不会**阻止子代理启动。想在结束时拦住后续续写，用 \`SubagentStop\`；任意匹配钩子返回 \`continue: false\` 会压过其它 Stop 钩子的继续决定。

不会跑 \`SubagentStart\` 的路径：Review、Compact、MemoryConsolidation 这类内部/系统子代理。不要给它们写 matcher。

新钩子先 \`/hooks\` 信任。自定义 agent 若改了 \`model\` / \`sandbox_mode\`，孩子会重建配置；未写入配置层的信任可能被丢掉，钩子静默不跑，子代理本身仍会完成。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["hooks", "SubagentStart", "子代理"],
    related: ["session-end-hook", "custom-agent-toml", "stop-hook-active"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://developers.openai.com/codex/hooks",
      },
    ],
  },
  {
    id: "pretooluse-updated-input",
    no: 182,
    title: "改命令内容：PreToolUse 返回 allow 加 updatedInput",
    summary: "Bash 和 apply_patch 必须带 command 字符串。MCP 则替换整个参数对象。PermissionRequest 里写 updatedInput 会 fail closed。",
    body: `\`PermissionRequest\` 不能改写输入。要在工具真正执行前换掉 payload，用 \`PreToolUse\`：

\`\`\`json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "updatedInput": {
      "command": "echo rewritten"
    }
  }
}
\`\`\`

规则：

- \`Bash\` 和 \`apply_patch\`：\`updatedInput\` 必须有字符串 \`command\`
- MCP 和其它本地 function 工具：\`updatedInput\` 是替换后的参数对象
- 只允许搭配 \`permissionDecision: "allow"\`；其它形状会报错
- 多个匹配钩子都看到**原始** \`tool_input\`，写完之后才选出一份 \`updatedInput\` 去执行

拦调用用 \`permissionDecision: "deny"\`，或退出码 \`2\` 并把原因写到 stderr。只想给模型加说明、不改命令，返回 \`additionalContext\`。

现在还不支持、但会解析的字段：\`permissionDecision: "ask"\`、旧 \`decision: "approve"\`、\`continue: false\`。钩子记失败，工具调用照样继续。

护栏不是铁壁：简单 shell 才会进钩子；\`unified_exec\` 的拦截还不完整；\`WebSearch\` 等非 shell、非 MCP 调用根本不进 \`PreToolUse\`。审计/遥测可能记下改写前的那条命令，和实际执行的 payload 不一致。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["hooks", "PreToolUse", "updatedInput"],
    related: ["permission-request-hook", "hooks-lifecycle", "mcp-tool-hook"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://developers.openai.com/codex/hooks",
      },
    ],
  },
  {
    id: "http-headers-helper",
    no: 184,
    title: "动态 MCP 头用 http_headers_helper，不要把令牌写进仓库",
    summary: "本机 HTTP MCP 才支持。命令每条连接跑一次，stdout 必须是 JSON 头。显式 bearer / OAuth 压过 helper 的 Authorization。",
    body: `短期令牌、公司网关票据不要写进 \`http_headers\`。给本机 Streamable HTTP 配一条命令：

\`\`\`toml
[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
http_headers_helper = "python3 /home/you/.codex/mcp-headers.py"
\`\`\`

脚本往 stdout 打一行 JSON 对象，例如 \`{"X-Auth": "temporary-token"}\`。Codex 在这条连接上缓存结果。同源 POST 返回 \`401\` / \`403\` 时会再跑一次；只有头真的变了才重试。OAuth 报权限不够的 \`403\` **不会**刷新 helper。

约束：

- 只给本机环境的 HTTP MCP。stdio 不行，远端执行器上的连接也不行
- 显式 \`bearer_token_env_var\` 和已登录 OAuth 优先于 helper 给出的 \`Authorization\`
- 保留头、重复头会被拒；输出和执行有上限
- \`codex mcp list\` / \`codex mcp get\` 会把命令打码，不要靠这两条命令排错脚本路径

没有凭据来源时仍可能匿名连上。要走 OAuth 另跑 \`codex mcp login docs\`。改完用真实工具调用验证，不要只看 list。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "http_headers_helper", "鉴权"],
    related: ["mcp-http-env-headers", "mcp-http-bearer-env", "mcp-add-and-login"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "interrupt-hook",
    no: 187,
    title: "Esc 打断只跑 Interrupt，清理不要只挂在 Stop 上",
    summary: "只给顶层轮。matcher 无效。默认 1 秒、上限 3 秒。输出拦不住打断。Stop 在 Esc 时不会跑。",
    body: `按 Esc 或杀进程打断**正在跑的顶层轮**时，跑的是 \`Interrupt\`，不是 \`Stop\`。子代理、空闲线程都不会触发。官方 Learn 钩子表把这件事单独写成一行；developers.openai.com/codex/hooks 若还没列出 \`Interrupt\`，以 Learn 和本机 \`/hooks\` 为准。

\`\`\`toml
[[hooks.Interrupt]]

[[hooks.Interrupt.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/on_interrupt.py"'
timeout = 2
statusMessage = "Saving interrupted turn"
\`\`\`

不要写 matcher：这个事件会忽略它。钩子跑之前 transcript 已经 flush，stdin 里有 \`session_id\`、\`turn_id\`、\`transcript_path\`、\`cwd\`、\`permission_mode\`。

约束：

- 默认超时 **1 秒**，上限 **3 秒**。别的钩子默认 600 秒，抄过来会在你等 Esc 时被砍掉
- 输出拦不住打断，也不能把这一轮拉回来。退出码 \`0\` 且不要打纯文本；需要提示时 stdout 只给 JSON，例如 \`{"systemMessage": "已记下被打断的轮次。"}\`
- \`async = true\` 时超时仍是 1–3 秒
- Learn 只明确写了 \`SessionEnd\` 不支持 \`mcp_tool\`。\`Interrupt\` 事件页给的是 command 输出约定，清理脚本用 command 最稳妥
- 进程内的 \`on_mcp_tool_result\` 是 extension，不是 \`hooks.json\` 里的事件，不要抄进钩子配置

适合：删本轮临时目录、把扫描器从 running 改成 aborted、给 CI 发一条中止通知。不要指望它当完成门。新钩子先 \`/hooks\` 信任。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["hooks", "Interrupt", "Esc"],
    related: ["session-end-hook", "stop-hook-active", "hooks-lifecycle"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
      {
        label: "openai/codex#22858",
        url: "https://github.com/openai/codex/issues/22858",
      },
    ],
  },
  {
    id: "hooks-one-representation",
    no: 201,
    title: "同一层不要同时写 hooks.json 和 [hooks]",
    summary: "同一配置层里两份会合并并在启动时警告。高层配置不会替换低层钩子，重复的 SessionStart 会跑两遍。",
    body: `官方 Hooks 页写明：匹配到的钩子源**全部加载**，高层不会覆盖低层。用户 \`~/.codex/hooks.json\`、项目 \`.codex/hooks.json\`、以及各层 \`config.toml\` 里的 \`[hooks]\` 会叠在一起。

同一层（例如都在 \`~/.codex/\`）如果既有 \`hooks.json\` 又有内联 \`[hooks]\`，Codex 会合并两边，并在启动时警告。不要复制同一份 \`SessionStart\` 到两个文件里指望「后面那份赢」——两边都会跑。

选一种表示法：

\`\`\`toml
[[hooks.PostToolUse]]
matcher = "Bash"

[[hooks.PostToolUse.hooks]]
type = "command"
command = "python3 /home/you/.codex/hooks/post_tool_use.py"
timeout = 30
\`\`\`

或只保留 \`~/.codex/hooks.json\`，把 \`config.toml\` 里的 \`[hooks]\` 删掉。项目层还要目录受信任才会加载。改完新开会话，用 \`/hooks\` 看实际来源，而不是数文件。

\`prompt\` / \`agent\` handler 会解析但跳过；真正会跑的是 \`command\` 和 \`mcp_tool\`。后台跑用 \`async = true\`，但 \`SessionEnd\` 仍强制同步。`,
    category: "hooks",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["hooks", "hooks.json", "config.toml"],
    related: ["hooks-lifecycle", "session-end-hook", "project-config-trust"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
    ],
  },
  {
    id: "skill-max-context-tokens",
    no: 215,
    title: "技能目录被截断：先禁用，再调 skills.max_context_tokens",
    summary: "启动时只塞技能名和描述，默认大约是模型窗口的 2%。显式值上限 10000。装太多时先 [[skills.config]] 关掉不用的，不要先把预算拉满。",
    body: `\`/skills\` 里缺技能、或启动警告说目录被截断时，先关掉不用的，不要先加大窗口：

\`\`\`toml
[[skills.config]]
path = "/home/you/.agents/skills/noisy/SKILL.md"
enabled = false

[skills]
max_context_tokens = 8000
\`\`\`

\`skills.max_context_tokens\` 管的是**可用技能目录**（name / description）进提示的预算，不是选中之后整份 \`SKILL.md\`。默认大约是当前模型上下文窗口的 2%；你写了正整数才会覆盖，且官方把显式值封顶在 \`10000\`。窗口未知时，技能页还提过大约 8000 字符的回退，不要把两种单位抄成一件事。

\`max_context_tokens\` 属于 \`[skills]\` 表。写进 \`[[skills.config]]\` 某一条里不会当目录预算。改完必须重启 Codex。

2026 年 7 月有文章还写「2% 写死、调不了」。8 月的 PR 已经加了这个键，不要再照抄那段。目录再大，模型选中技能后仍会读完整说明；真正省上下文的办法是少装、短 description、关掉不用的技能。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["skills.max_context_tokens", "Skills", "上下文"],
    related: ["skill-locations", "skill-installer", "context-window-verify-status"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "openai/codex#38978",
        url: "https://github.com/openai/codex/pull/38978",
      },
    ],
  },
  {
    id: "mcp-oauth-credentials-store",
    no: 219,
    title: "MCP OAuth 令牌另有一份仓库，不是 auth.json",
    summary: "mcp_oauth_credentials_store 管 MCP 登录。默认 auto 走钥匙串，回退 ~/.codex/.credentials.json。没有 ephemeral。不要和 CLI 登录缓存抄成一把钥匙。",
    body: `MCP 登录令牌不走 \`auth.json\`。单独设顶层键：

\`\`\`toml
mcp_oauth_credentials_store = "keyring"
\`\`\`

三种值，默认 \`auto\`：

- \`auto\`：优先操作系统凭据库，失败才写 \`CODEX_HOME/.credentials.json\`
- \`file\`：强制写 \`.credentials.json\`
- \`keyring\`：只要钥匙串，读不到就登录失败

这里**没有** \`ephemeral\`。把 \`cli_auth_credentials_store = "ephemeral"\` 当成 MCP 令牌也只在内存，是抄错键。

\`.credentials.json\` 和 \`auth.json\` 是两份文件。拷登录缓存不会带上 MCP OAuth；反过来，清掉 MCP 令牌也不会登出 ChatGPT。dotfiles、同步盘、CI 日志两边都不要带。

回调地址和监听端口仍由 \`mcp_oauth_callback_url\` / \`mcp_oauth_callback_port\` 管，和这份存储无关。改存储后端之后，对每个要 OAuth 的服务器重新 \`codex mcp login\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["mcp_oauth_credentials_store", "OAuth", "keyring"],
    related: ["mcp-http-auth-chatgpt", "mcp-oauth-resource", "cli-auth-credentials-store"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "OpenAI · Sample configuration",
        url: "https://developers.openai.com/codex/config-sample",
      },
    ],
  },
  {
    id: "mcp-http-auth-chatgpt",
    no: 220,
    title: "MCP 的 auth=chatgpt 只给 ChatGPT 同源，不是任意 HTTP 服务器",
    summary: "bearer 和显式头优先。oauth 用存好的 MCP 令牌；chatgpt 只把当前 ChatGPT 会话交给与 chatgpt_base_url 同源的主机。第三方仍要 mcp login。",
    body: `Streamable HTTP 服务器在配完 bearer / 请求头之后，才看 \`auth\`：

\`\`\`toml
[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
auth = "oauth"
# 仅当 url 与 chatgpt_base_url 同源时才写 auth = "chatgpt"
\`\`\`

- \`oauth\`（默认）：用 \`codex mcp login\` 存下的 MCP OAuth 令牌
- \`chatgpt\`：用当前 ChatGPT 登录态，失败再回退到存好的 MCP OAuth

\`chatgpt\` **不是**「所有 MCP 都能免登录」。官方会核对服务器 URL 的 HTTP(S) 源是否和 \`chatgpt_base_url\` 相同；不同源的配置在启动前会被拿掉这项能力，第三方 GitHub / Linear 不会拿到你的 ChatGPT access token。旧讨论里的 \`use_chatgpt_auth = true\` 已经改成这个枚举，不要再抄布尔键。

显式 \`bearer_token_env_var\`、\`http_headers\`、\`env_http_headers\` 或 \`http_headers_helper\` 打出的 \`Authorization\` 优先于会话。stdio 服务器没有 \`auth\`。两边都解析不到凭据时，仍可能无鉴权连上——不要靠这个当安全边界。第三方继续 \`codex mcp login docs\`。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["mcp_servers.auth", "chatgpt", "OAuth"],
    related: ["mcp-oauth-credentials-store", "mcp-oauth-resource", "http-headers-helper"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "openai/codex#29733",
        url: "https://github.com/openai/codex/pull/29733",
      },
    ],
  },
  {
    id: "mcp-oauth-resource",
    no: 221,
    title: "授权服务器要 RFC 8707 时，给 MCP 设 oauth_resource",
    summary: "只对 streamable HTTP 生效。会在 mcp login 的授权 URL 上附加 resource。stdio 写了没用。和 mcp_oauth_callback_url 不是同一件事。",
    body: `有的 IdP 登录 MCP 时要求授权请求带 \`resource\`。在 HTTP 服务器上写：

\`\`\`toml
[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
oauth_resource = "https://docs.example.com/"
\`\`\`

\`codex mcp add\` 也可以带一次：

\`\`\`bash
codex mcp add docs --url https://mcp.example.com/mcp --oauth-resource https://docs.example.com/
codex mcp login docs
\`\`\`

这只影响 **OAuth 授权 URL** 上的 RFC 8707 参数，不改回调监听口，也不改 \`mcp_oauth_callback_url\`。官方校验只接受 streamable HTTP；stdio 表里抄这个键不会往授权请求里塞 \`resource\`。

\`scopes\` 仍是另一份列表，不是 \`oauth_resource\`。加载顺序是 \`--scopes\`、config、广告的 \`scopes_supported\`。改 \`oauth_resource\` 或 \`scopes\` 之后都要重新 \`codex mcp login\`。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["oauth_resource", "RFC 8707", "MCP"],
    related: ["mcp-oauth-scopes", "mcp-http-auth-chatgpt", "mcp-add-and-login"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "OpenAI · CLI reference",
        url: "https://developers.openai.com/codex/cli/reference",
      },
      {
        label: "openai/codex#12866",
        url: "https://github.com/openai/codex/pull/12866",
      },
    ],
  },
  {
    id: "mcp-oauth-scopes",
    no: 223,
    title: "MCP 登录 scopes：先 CLI，再 config，最后才是广告值",
    summary: "顺序是 --scopes、mcp_servers.NAME.scopes、scopes_supported、空列表。Learn 页写成广告优先，和源码相反。只对 streamable HTTP。",
    body: `streamable HTTP 的 MCP 若要 OAuth 范围，写在该服务器表里：

\`\`\`toml
[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
scopes = ["read:docs"]
\`\`\`

这一次登录也可以带旗标：

\`\`\`bash
codex mcp login docs --scopes read:docs,search
\`\`\`

CLI 参考里 \`--scopes\` 是逗号分隔；TOML 里是字符串数组。不要把逗号列表写进 TOML。

源码 \`resolve_oauth_scopes\` 的顺序是：

1. 这次命令的 \`--scopes\`（显式列表）
2. config 里的 \`mcp_servers.NAME.scopes\`
3. 服务器广告的 \`scopes_supported\`
4. 都没有就发空列表

Learn 的 MCP 页目前写成「广告值优先于 config」。那是过时摘要。广告值**不会**盖住你已经写进 TOML 的 \`scopes\`，也不会回写进 config。想用服务器广告的范围，就不要在 TOML 里写 \`scopes\`，也别带 \`--scopes\`。

这**不是** \`oauth_resource\`。后者往授权 URL 附加 RFC 8707 \`resource\`，不管权限范围。stdio 服务器没有 OAuth login，写 \`scopes\` 不会发起授权。

改范围之后必须重新 \`codex mcp login\`。旧令牌不会按新列表自动缩权。第三方继续 \`auth = "oauth"\`，不要靠 \`auth = "chatgpt"\` 去要范围。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["scopes", "OAuth", "MCP"],
    related: ["mcp-oauth-resource", "mcp-add-and-login", "mcp-http-auth-chatgpt"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "OpenAI · CLI reference",
        url: "https://developers.openai.com/codex/cli/reference",
      },
      {
        label: "openai/codex#14419",
        url: "https://github.com/openai/codex/pull/14419",
      },
    ],
  },
  {
    id: "unity-codex-plugin",
    no: 225,
    title: "Unity 官方技能用 marketplace 装，不要拷到 ~/.codex/skills",
    summary: "marketplace add 仓库，再 plugin add unity@unity-agent-plugin。只要技能，没有 MCP 和钩子。0.154 起先看当前会话，没有再新开。",
    body: `Unity 6 起可以用官方 Agent 插件给 Codex 一批第一方技能（2D、UI Toolkit、本地化、多人、内购等）。走插件目录，不要手拷文件夹：

\`\`\`bash
codex plugin marketplace add Unity-Technologies/unity-agent-plugin
codex plugin add unity@unity-agent-plugin
codex plugin list
\`\`\`

\`codex plugin list\` 应看到 \`unity@unity-agent-plugin\` 为 installed, enabled。0.154 起当前会话通常会刷新技能；合成器里输入 \`/unity:\` 仍没有，再新开会话。

更新和卸载：

\`\`\`bash
codex plugin marketplace upgrade unity-agent-plugin
codex plugin remove unity@unity-agent-plugin
\`\`\`

仓库说明：这份插件**只有技能**，不带 MCP，也不带钩子。不要指望它替你起 Unity 编辑器 RPC。社区旧帖还在把技能拷进 \`~/.codex/skills\`；现行个人技能目录是 \`~/.agents/skills\`，而且官方安装路径是 marketplace，不是软链。

IDE 扩展没有 \`/plugins\` 目录。装插件用 CLI 或桌面应用。API key 登录时，部分需要 OAuth 的官方插件会装不全；Unity 这份是技能捆，一般不受那条限制，但仍应新会话核对 \`codex plugin list\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Unity", "marketplace"],
    related: ["plugins-vs-skills", "plugin-marketplace-ref-sparse", "plugin-session-refresh"],
    sources: [
      {
        label: "Unity · plugin for Codex",
        url: "https://docs.unity.com/en-us/ai/unity-plugin/codex",
      },
      {
        label: "Unity-Technologies/unity-agent-plugin",
        url: "https://github.com/Unity-Technologies/unity-agent-plugin",
      },
    ],
  },
  {
    id: "plugin-marketplace-ref-sparse",
    no: 228,
    title: "marketplace add 用 --ref 钉版本，用 --sparse 只拉插件目录",
    summary: "Git 源用 --ref 或 owner/repo@ref 钉提交。大仓加 --sparse 只 checkout 插件路径。加完还要 plugin add；0.154 起先看当前会话。",
    body: `\`codex plugin marketplace add\` 接受 GitHub 简写、HTTPS / SSH Git URL，以及本地 marketplace 根目录。Git 源把整仓 clone 进来很慢，也容易超时。官方 CLI 参考给了钉 ref 和稀疏检出：

\`\`\`bash
codex plugin marketplace add owner/repo --ref main
codex plugin marketplace add owner/repo@main
codex plugin marketplace add owner/repo --sparse .agents/plugins --json
codex plugin marketplace add https://github.com/owner/repo --sparse plugins/foo --sparse skills/bar
codex plugin marketplace list --json
\`\`\`

\`owner/repo@ref\` 和 \`--ref\` 等价，用来钉分支、标签或提交。\`--sparse PATH\` 只对 Git 源有效，可重复；本地目录 marketplace 不要加 \`--sparse\`。\`--json\` 成功时给出 \`marketplaceName\`、\`installedRoot\`、\`alreadyAdded\`，方便脚本判断是新加还是已经有了。

加 marketplace **不等于**装插件。还要：

\`\`\`bash
codex plugin add name@marketplace
codex plugin list --json
\`\`\`

0.154 起当前会话通常会捡起新装的插件工具；\`/plugins\` 和斜杠技能仍没有再新开。不要写成 \`codex marketplace add\`（少了 \`plugin\`）。也不要把 \`features.plugins = true\` 抄进用户 \`config.toml\` 当现行必写键；个人机默认就能用插件，企业关插件是另一套 \`requirements.toml\`。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "marketplace", "--sparse"],
    related: ["marketplace-source-path-root", "google-cloud-developer-plugin", "plugin-session-refresh"],
    sources: [
      {
        label: "OpenAI · CLI reference",
        url: "https://developers.openai.com/codex/cli/reference",
      },
      {
        label: "Codex Knowledge Base · plugin management",
        url: "https://codex.danielvaughan.com/2026/06/04/codex-cli-plugin-management-terminal-commands-marketplace-json-output-v0137/",
      },
    ],
  },
  {
    id: "marketplace-allowed-sources",
    no: 229,
    title: "企业限制 marketplace 源：写 requirements.toml，不是 config.toml",
    summary: "restrict_to_allowed_sources 只在 requirements.toml 生效。拦 add / install / refresh，并在运行时过滤。官方精选仓也要显式放行。",
    body: `想限制同事能加哪些插件源，把规则写进企业 \`requirements.toml\`（或 MDM 的 \`requirements_toml_base64\`），**不要**写进 \`~/.codex/config.toml\`。用户层同名表只是默认值，不是强制策略。

\`\`\`toml
# requirements.toml，不是用户 config.toml
[marketplaces]
restrict_to_allowed_sources = true

[marketplaces.allowed_sources.company_plugins]
source = "git"
url = "https://github.com/example/company-plugins.git"
ref = "main"

[marketplaces.allowed_sources.internal_git]
source = "host_pattern"
host_pattern = '^git\\.example\\.com$'

[marketplaces.allowed_sources.local_plugins]
source = "local"
path = "/opt/company/codex-plugins"
\`\`\`

\`git\` 规则先规范化 URL，再要求仓库一致；写了 \`ref\` 就必须精确匹配。\`host_pattern\` 是正则，对着小写 Git 主机名匹配，用 \`^\` 和 \`$\` 锁整机。\`local\` 必须是规范化后的绝对路径。不同规则名会跨层累加；同名规则按层覆盖字段。

\`restrict_to_allowed_sources = true\` 时：对不上的 \`marketplace add\`、插件安装、已配置 Git marketplace 刷新会被拒绝，**已经配上的 marketplace 和插件也会在运行时被过滤**。不要以为「早就装上了就不会被关」。

官方精选 Git marketplace（含 API key 目录）**不会**自动放行。要留给同事用，加一条不带 \`ref\` 的规则：

\`\`\`toml
[marketplaces.allowed_sources.openai_curated]
source = "git"
url = "https://github.com/openai/plugins.git"
\`\`\`

省略它、又没有更宽的 host 规则时，精选目录会被挡掉。捆绑插件和远端下发的工作区插件不走这条 Git 源策略。

这套限制只作用于支持 marketplace 操作的本机客户端：ChatGPT / Codex 桌面应用和 Codex CLI。不管网页或手机里的插件，也不会给 IDE 扩展加插件。整台机器关掉插件是另一条：在 \`requirements.toml\` 写 \`features.plugins = false\`。只关远程目录、留下本地插件，用 \`features.remote_plugin = false\`。`,
    category: "security",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["plugins", "requirements.toml", "企业"],
    related: ["plugin-marketplace-ref-sparse", "remote-plugin-catalog", "plugins-vs-skills"],
    sources: [
      {
        label: "OpenAI · Managed configuration",
        url: "https://learn.chatgpt.com/docs/enterprise/managed-configuration",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "google-cloud-developer-plugin",
    no: 230,
    title: "Google Cloud 官方插件用 marketplace 装，不要 npx skills add",
    summary: "marketplace add google/skills，再 plugin add google-cloud-developer@google-plugins。这是技能加 Developer Knowledge MCP，不是把 SKILL.md 拷进 ~/.codex/skills。",
    body: `Google 把认证、项目上手和 gcloud 护栏打成 Agent Plugins 捆，并带上只读的 Developer Knowledge MCP（\`https://developerknowledge.googleapis.com/mcp\`），用来查官方文档，不是给你的 GCP 项目写资源。

\`google/skills\` 仓库很大。只装这一份插件时，用稀疏检出，避免整仓 clone：

\`\`\`bash
codex plugin marketplace add google/skills --sparse .agents/plugins --sparse plugins/cloud/google-cloud-developer --json
codex plugin add google-cloud-developer@google-plugins
codex plugin list
codex mcp list
\`\`\`

marketplace 清单在 \`.agents/plugins/marketplace.json\`，名字是 \`google-plugins\`。本地插件源是 \`./plugins/cloud/google-cloud-developer\`，所以两条 \`--sparse\` 都要。清单里其它数据库插件多半是外链 Git，不会跟着这次稀疏检出进来。

0.154 起当前会话通常会刷新。\`/plugins\` 里应看到 \`google-cloud-developer@google-plugins\`；\`/mcp\` 里应有 \`developer-knowledge\`。没有就新开会话。exec 里审批插件 MCP 必须写带 marketplace 后缀的键，不要只写 \`google-cloud-developer\`。

不要用 \`npx skills add google/skills\` 当 Codex 插件安装器：那是给技能目录拷 SKILL.md 的另一条路，不会装这份 MCP。也不要手拷到 \`~/.codex/skills\`。IDE 扩展没有 \`/plugins\`。

BigQuery / Spanner 这类 Data Cloud 插件是另一个 marketplace：\`GoogleCloudPlatform/data-agent-kit\`，不要和 \`google/skills\` 抄成同一个源。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Google Cloud", "MCP"],
    related: ["plugin-marketplace-ref-sparse", "unity-codex-plugin", "cloudflare-skills-plugin"],
    sources: [
      {
        label: "google/skills",
        url: "https://github.com/google/skills",
      },
      {
        label: "google-cloud-developer plugin",
        url: "https://github.com/google/skills/tree/main/plugins/cloud/google-cloud-developer",
      },
    ],
  },
  {
    id: "plugin-session-refresh",
    no: 233,
    title: "0.154 起装插件后先看当前会话，不要立刻 /new",
    summary: "现有会话会捡起新装的插件工具，外部升级或回滚后也会刷新技能和钩子。桌面改 marketplace 文件仍要重启应用。低于 0.154 才必须新开。",
    body: `\`codex plugin add\` 或 \`plugin marketplace upgrade\` 之后，先在**当前** TUI 里核对，不要习惯性 \`/new\`：

\`\`\`bash
codex --version
codex plugin list
codex mcp list
\`\`\`

0.154 起：已经打开的会话会捡起新装的插件工具；插件在会话外被升级或回滚时，技能和钩子也会刷新。\`/plugins\`、斜杠技能和 \`/mcp\` 对上了，就继续当前线程。

仍要新开会话的情况：

- \`codex --version\` 低于 0.154
- 当前会话的 \`/plugins\` 或 \`/mcp\` 还是空的
- 改的是 ChatGPT 桌面应用的本地 \`marketplace.json\`（官方打包页仍要求重启桌面应用）
- 改的是 \`AGENTS.md\`（运行中的会话不会持续重扫）

不要把这条理解成「永远不用新开」。exec 一次性进程没有「当前会话可刷新」这一说，脚本里装完插件再 \`codex exec\` 即可。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "0.154", "会话"],
    related: ["plugins-vs-skills", "unity-codex-plugin", "google-cloud-developer-plugin"],
    sources: [
      {
        label: "openai/codex rust-v0.154.0",
        url: "https://github.com/openai/codex/releases/tag/rust-v0.154.0",
      },
      {
        label: "OpenAI · Package your plugin",
        url: "https://learn.chatgpt.com/plugins/build/plugins",
      },
    ],
  },
  {
    id: "marketplace-source-path-root",
    no: 235,
    title: "marketplace 的 source.path 相对仓根或家目录，不是 json 所在文件夹",
    summary: "个人清单里 ./plugins/foo 解析到 ~/plugins/foo，不是 ~/.agents/plugins/plugins/foo。必须以 ./ 开头，并写在 marketplace 根内。",
    body: `手写 \`marketplace.json\` 时，\`source.path\` 不是相对这份 json 所在的 \`.agents/plugins/\`，而是相对 **marketplace 根**：

| 清单位置 | marketplace 根 | \`./plugins/my-plugin\` 实际落到 |
| --- | --- | --- |
| \`~/.agents/plugins/marketplace.json\` | 家目录 \`~\` | \`~/plugins/my-plugin\` |
| 仓库 \`.agents/plugins/marketplace.json\` | 仓库根 | 仓库根下的 \`plugins/my-plugin\` |

这是最常见的踩坑：把插件拷进 \`~/.agents/plugins/plugins/my-plugin\`，清单里写 \`./plugins/my-plugin\`，桌面和 CLI 都找不到。官方 plugin-creator 规范写明：个人清单里的 \`./plugins/foo\` 解析到 \`~/plugins/foo\`。

个人机两种都能用，选一种并让路径对上：

\`\`\`bash
mkdir -p ~/plugins/my-plugin ~/.agents/plugins
# 把插件目录拷到 ~/plugins/my-plugin（里面要有 plugin.json 或 .codex-plugin/plugin.json）
\`\`\`

\`~/.agents/plugins/marketplace.json\`：

\`\`\`json
{
  "name": "personal",
  "interface": {
    "displayName": "My plugins"
  },
  "plugins": [
    {
      "name": "my-plugin",
      "source": {
        "source": "local",
        "path": "./plugins/my-plugin"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    }
  ]
}
\`\`\`

官方打包页另一种个人布局是插件放 \`~/.codex/plugins/my-plugin\`，对应 \`source.path\` 写成 \`"./.codex/plugins/my-plugin"\`。两种都合法，因为都相对家目录；不要混用。

本地条目也可以把 \`source\` 写成字符串 \`"./plugins/my-plugin"\`。必须以 \`./\` 开头，留在 marketplace 根内，不能写 \`../\`。插件就在仓根（仓本身就是一份插件）时，现行代码允许 \`"."\` 或 \`"./"\`。空路径、不带 \`./\`、带 \`..\` 的路径会被拒。

每条还必须有 \`policy.installation\`（\`AVAILABLE\` / \`INSTALLED_BY_DEFAULT\` / \`NOT_AVAILABLE\`）、\`policy.authentication\`（\`ON_INSTALL\` / \`ON_USE\`）和 \`category\`。

Git 源不要抄成本地 path。插件在仓根用 \`"source": "url"\`；在子目录用 \`"source": "git-subdir"\` 再给 \`path\` 和 \`ref\` / \`sha\`。某一条解析失败时 **跳过该插件**，整份 marketplace 还在。npm 源是 \`"source": "npm"\` 加 \`package\`，本机要有 \`npm\`，安装时不跑 lifecycle 脚本。

\`codex plugin marketplace add\` 的 \`--sparse\` 是 Git clone 的稀疏检出路径，相对被 clone 的仓库根，**不是** 这份 json 里的 \`source.path\`。本地 marketplace 把含 \`.agents/plugins/marketplace.json\` 的根目录交给 \`marketplace add .\`，不要把 json 文件路径当根。

个人清单默认就会被扫到。改完先核对解析根，再装：

\`\`\`bash
codex plugin marketplace list --json
codex plugin add my-plugin@personal
codex plugin list --json
\`\`\`

ChatGPT 桌面改本地 \`marketplace.json\` 后仍要重启应用。CLI 0.154 起 \`plugin add\` 后先看当前会话的 \`/plugins\`。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "marketplace", "source.path"],
    related: ["plugin-marketplace-ref-sparse", "plugin-sharing-workspace", "plugin-repo-enabled"],
    sources: [
      {
        label: "OpenAI · Package your plugin",
        url: "https://learn.chatgpt.com/plugins/build/plugins",
      },
      {
        label: "openai/codex · plugin-json-spec",
        url: "https://github.com/openai/codex/blob/main/codex-rs/skills/src/assets/samples/plugin-creator/references/plugin-json-spec.md",
      },
    ],
  },
  {
    id: "plugin-repo-enabled",
    no: 236,
    title: "仓库里关插件：写 plugins.\"name@marketplace\"，不要卸 marketplace",
    summary: "项目 .codex/config.toml 里 enabled = false 只关这个仓库，不卸载。刷新仍会更新缓存。Admin 导入的工作区插件不吃这套键。",
    body: `仓库 marketplace 只负责让插件被发现。某个项目不想用其中一条时，写项目 \`.codex/config.toml\`，不要 \`plugin remove\` 或把整份 marketplace 删掉：

\`\`\`toml
[plugins."my-plugin@local-repo"]
enabled = false
\`\`\`

引号里的键是 \`name@marketplace\`：左边对清单里那条 \`name\`，右边对 marketplace 文件顶层的 \`name\`（上例是 \`local-repo\`）。写成 \`[plugins.my-plugin]\` 或漏掉 \`@marketplace\`，运行时对不上。

\`enabled = false\` **不是卸载**。marketplace 刷新时，Codex 仍可能给已配置的插件更新缓存文件；连上的服务还要再认证。只是这个仓库的会话不再启用它。

项目 \`.codex/config.toml\` 只在目录受信任时加载。未信任仓库会跳过这份开关，看起来像「写了也不生效」。先 \`codex plugin list --json\` 核对 \`name@marketplace\` 是否对上；TUI 里用 \`/status\` 看工作区是否受信任。

不要用这套键去关远程精选目录：给 \`openai-curated-remote\` 写 \`enabled = false\` 经常拦不住注入。那种情况用 \`features.remote_plugin = false\`，或只关某条安装建议的 \`[tool_suggest].disabled_tools\`。

工作区管理员从 Admin > Plugins 导入的插件走工作区策略，不读仓库里的 \`[plugins."name@marketplace"]\`。即使源是 GitHub 仓，也要在 Admin 里改安装策略。

这套设置作用于 Codex CLI 和 ChatGPT 桌面里的本地 marketplace 插件。IDE 扩展没有插件目录。0.154 起改完先看当前会话的 \`/plugins\`；桌面改项目配置后若没捡到，再新开。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "config.toml", "enabled"],
    related: ["marketplace-source-path-root", "plugin-admin-mcp-desktop", "plugin-mcp-exec-key"],
    sources: [
      {
        label: "OpenAI · Package your plugin",
        url: "https://learn.chatgpt.com/plugins/build/plugins",
      },
      {
        label: "openai/codex#28443",
        url: "https://github.com/openai/codex/issues/28443",
      },
    ],
  },
  {
    id: "plugin-hook-plugin-root",
    no: 237,
    title: "插件钩子脚本用 PLUGIN_ROOT，不要写相对路径",
    summary: "PLUGIN_ROOT 指向安装后的缓存根，不是你正在改的源码目录。可变数据写 PLUGIN_DATA。装完仍要 /hooks 信任。",
    body: `插件自带的钩子和用户 \`~/.codex/hooks.json\` 会叠在一起跑，但脚本路径规则不同。默认找插件根下的 \`hooks/hooks.json\`。命令里用 \`PLUGIN_ROOT\`，不要写 \`./hooks/...\`（cwd 会漂，也找不到缓存里的安装副本）：

\`\`\`json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 \${PLUGIN_ROOT}/hooks/session_start.py",
            "statusMessage": "Loading plugin context"
          }
        ]
      }
    ]
  }
}
\`\`\`

Codex 会注入环境变量，并做行内替换（PowerShell 吃不到普通环境变量展开）：

- \`PLUGIN_ROOT\`：这份插件**已经安装**的根，通常在 \`~/.codex/plugins/cache/...\`
- \`PLUGIN_DATA\`：可写数据目录，状态文件放这里，不要写进缓存根
- \`CLAUDE_PLUGIN_ROOT\` / \`CLAUDE_PLUGIN_DATA\`：同一套路径的兼容名

改源码目录里的 \`hooks/session_start.py\` 不会立刻进正在跑的会话。要先让 marketplace 重新安装，再看 \`/hooks\`。0.154 起当前会话通常会在外部升级后刷新钩子；没有就新开。

清单里如果写了 \`hooks\`（路径、路径数组或内联对象），**只走清单，不再读默认** \`hooks/hooks.json\`。路径必须以 \`./\` 开头，并留在插件根内。

装上或打开插件 **不会**自动信任这些钩子。插件钩子算非托管来源，\`/hooks\` 里审查并信任当前定义之前会被跳过。网页上安装插件也不会把脚本部署到本机。企业开了 \`allow_managed_hooks_only\` 时，插件钩子整层不跑。`,
    category: "hooks",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["hooks", "PLUGIN_ROOT", "plugins"],
    related: ["plugin-mcp-cwd-dot", "hooks-lifecycle", "plugin-portable-json"],
    sources: [
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
      {
        label: "OpenAI · Package your plugin",
        url: "https://learn.chatgpt.com/plugins/build/plugins",
      },
    ],
  },
  {
    id: "plugin-portable-json",
    no: 238,
    title: "新插件用根目录 plugin.json，不要只把 .mcp.json 改名",
    summary: "$plugin-creator 仍脚手架 .codex-plugin。可移植包是根目录 plugin.json 加带 type 的 mcp.json。extensions.com.openai 会整份替换 overlay，两套不合并。",
    body: `现行可移植包把身份放在插件根的 \`plugin.json\`，不要把 MCP、钩子、技能路径塞进这份清单的顶层。最小可用：

\`\`\`json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "my-first-plugin",
  "version": "1.0.0",
  "description": "Reusable greeting workflow"
}
\`\`\`

\`name\` 用 kebab-case，宿主拿它当插件标识和组件命名空间。技能固定从根目录 \`skills/\` 发现，清单里不必写 \`skills\` 字段。

带 MCP 时，和 \`plugin.json\` 放在同一层，再写 \`mcp.json\`，并声明 Agent Plugins schema 和每台服务器的 transport \`type\`：

\`\`\`json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
  "mcpServers": {
    "docs": {
      "type": "streamable-http",
      "url": "https://example.com/mcp"
    }
  }
}
\`\`\`

\`$plugin-creator\` / \`@plugin-creator\` 仍脚手架兼容布局：\`.codex-plugin/plugin.json\`、\`.mcp.json\`、\`.app.json\`。这套还支持，没有作废。不要只把 \`.mcp.json\` 改名为 \`mcp.json\`：可移植格式还要给每台服务器写 \`type\`（例如 \`streamable-http\`）。兼容布局里，根目录的 \`.mcp.json\` 只有清单把 \`mcpServers\` 指到 \`./.mcp.json\` 才会被导入，否则会被忽略。

OpenAI 专用展示、已注册 MCP 映射和钩子路径写在根清单的 \`extensions.com.openai\`。这个对象一旦出现，会整份替换 \`.codex-plugin/plugin.json\` overlay，两套不合并。没有这个对象时，才回退读兼容 overlay。可移植包里，overlay 或 extension 里的 \`skills\` / \`mcpServers\` 改不了、关不掉、也加不了根目录已经发现的技能和 MCP。

加 Codex overlay 时，只有 \`plugin.json\` 放进 \`.codex-plugin/\`。\`skills/\`、\`hooks/\`、\`assets/\`、\`.mcp.json\`、\`.app.json\` 留在插件根。路径一律相对插件根并以 \`./\` 开头。\`app.json\`（没有前导点）不是合法文件名。

公共目录投稿的 ZIP 检查更严：根上还要有 \`.codex-plugin/plugin.json\`、\`.agent-plugin/plugin.json\` 或 \`.claude-plugin/plugin.json\` 之一，只有根目录 \`plugin.json\` 会报 \`plugin_manifest_missing\`。本地 marketplace 测试用可移植根清单即可；要上公共目录，保留一份 overlay。密钥不要写进 \`mcp.json\`。

装进 marketplace 后，CLI 0.154 起先看当前会话的 \`/plugins\`。IDE 扩展没有插件目录。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "plugin.json", "mcp.json"],
    related: ["plugin-mcp-json-wrapper", "plugin-mcp-oauth-json", "plugin-hook-plugin-root"],
    sources: [
      {
        label: "OpenAI · Package your plugin",
        url: "https://learn.chatgpt.com/plugins/build/plugins",
      },
      {
        label: "OpenAI · Plugin submission errors",
        url: "https://learn.chatgpt.com/plugins/deploy/submission-errors",
      },
    ],
  },
  {
    id: "plugin-admin-mcp-desktop",
    no: 239,
    title: "Admin 导入带 MCP 的插件只在桌面能用",
    summary: "工作区从 GitHub 导入的插件，只要声明了 mcp.json、.mcp.json 或内联 MCP，就会标成 Desktop only。CLI 和 IDE 装不上，远程 HTTPS 也不例外。",
    body: `工作区管理员走 Admin > Plugins > Import marketplace 时，源填仓库 URL（不要带分支或文件夹），Path 填含 \`marketplace.json\` 的目录，不要填文件名。导入成功后，只要在 \`mcp.json\`、\`.mcp.json\` 或内联字段里声明了 MCP，该插件就会标成 Desktop only：只在 ChatGPT 桌面里能用，Codex CLI 和 IDE 扩展都跑不了。远程 HTTPS MCP 也一样，不是「只有本地 stdio 才被挡」。

这和本机 \`codex plugin marketplace add\` 不是一条路。本地 / 仓库 marketplace 装上的带 MCP 插件，CLI 仍按 \`[plugins."name@marketplace".mcp_servers.server]\` 管开关和审批。Admin 导入的副本走工作区策略，不读项目 \`.codex/config.toml\` 里的 \`enabled\`，也进不了 CLI 的插件目录。

需要 CLI 用同一份技能+MCP 时：

\`\`\`bash
codex plugin marketplace add owner/repo --ref main --sparse .agents/plugins --json
codex plugin add my-plugin@team-plugins
codex plugin list --json
\`\`\`

不要指望把 Admin 插件再写进项目 \`[plugins."name@marketplace"] enabled = true\` 来解锁 CLI。那套键只对本地 marketplace 插件有效。

把已有工作区插件交给这份 GitHub 源管，在 marketplace 条目里加 \`pluginId\`（从该插件 Admin URL 里 \`/admin/plugins/\` 后面那段抄）。它必须和 \`name\`、\`source\` 并列，且插件已在同一工作区：

\`\`\`json
{
  "name": "team-tools",
  "pluginId": "plugin_00000000000000000000000000000000",
  "source": {
    "source": "local",
    "path": "./plugins/team-tools"
  }
}
\`\`\`

接管后更新来自 GitHub，不能再用上传包覆盖；已被别的 GitHub 源管的插件不能再抢。

删掉 marketplace 条目不会删除已导入的工作区副本，只会标成 No longer in source。删整个 marketplace 才会清掉它导入的插件。重连 GitHub 不要先删 marketplace。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["app", "cli"],
    tags: ["plugins", "企业", "MCP"],
    related: ["plugin-repo-enabled", "plugin-portable-json", "plugin-mcp-oauth-json"],
    sources: [
      {
        label: "OpenAI · Plugin management",
        url: "https://learn.chatgpt.com/docs/enterprise/plugin-management",
      },
    ],
  },
  {
    id: "plugin-mcp-oauth-json",
    no: 240,
    title: "插件 MCP 的 OAuth 写 camelCase，不要抄 config.toml 的蛇形键",
    summary: "mcp.json 里是 clientId、callbackUrl、callbackPort。callbackUrl 里的端口不会改监听口；没写 callbackPort 就走全局或临时端口。带 clientId 但回调缺 ID 时，这份 URL 会被忽略。",
    body: `用户 \`~/.codex/config.toml\` 用蛇形：\`client_id\`、\`callback_url\`、\`callback_port\`。插件自带的 HTTP MCP 写在根目录 \`mcp.json\` 或 \`.mcp.json\`，字段是 camelCase。抄成 \`client_id\` 不会被当成插件 OAuth。

\`\`\`json
{
  "mcpServers": {
    "sample": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "oauth": {
        "clientId": "my-pre-registered-client",
        "callbackUrl": "http://127.0.0.1/callback/registered",
        "callbackPort": 4321
      }
    }
  }
}
\`\`\`

可移植 Agent Plugins 包还可以给文件加 \`$schema\`，并把 \`type\` 写成 \`streamable-http\`。OAuth 对象规则一样。密钥不要写进这份 json。

\`callbackUrl\` 里的端口不会选择监听口。要固定本机回环端口，\`callbackUrl\` 和 \`callbackPort\` 写成同一个数，例如 \`http://127.0.0.1:4321/callback/registered\` 配 \`"callbackPort": 4321\`。插件的 \`callbackPort\` 盖过全局 \`mcp_oauth_callback_port\`；两边都空就用操作系统临时端口。代理入口的 URL 端口和本机监听口可以故意不同。

插件给了 \`clientId\`、授权服务器又不广告 issuer-bound 回调、而且 \`callbackUrl\` 缺少这台服务器的 callback ID 时，Codex 会忽略这份 URL，改用 \`mcp_oauth_callback_url\`（未设则 \`http://127.0.0.1/callback\`）再拼上 callback ID。磁盘里的 \`callbackUrl\` 不会被改写，所以看起来「清单写对了却登不上」。登录时登记终端打印出的完整回调，不要只抄清单。

用户侧仍只能改开关和审批，改不了插件 MCP 的启动命令：

\`\`\`toml
[plugins."sample@test".mcp_servers.sample]
enabled = true
default_tools_approval_mode = "prompt"
\`\`\`

兼容布局里，根上的 \`.mcp.json\` 还要在 overlay 把 \`mcpServers\` 指到 \`./.mcp.json\`，否则这份 OAuth 根本不会被导入。Admin 导入带 MCP 的插件仍是 Desktop only。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["plugins", "MCP", "OAuth"],
    related: ["plugin-mcp-json-wrapper", "mcp-oauth-loopback-callback", "mcp-oauth-callback-id"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-instructions-512",
    no: 241,
    title: "MCP instructions 把硬约束放进前 512 个字符",
    summary: "Codex 读初始化返回的 instructions 当整台服务器的跨工具说明。决定怎么用这台服务器时，只保证前 512 个字符在场。限流、禁止事项不要埋在后半段。",
    body: `给 Codex 用的 MCP 服务器，初始化握手可以返回 \`instructions\`。Codex 把它当成这台服务器的全局说明，和工具列表一起看：跨工具工作流、约束、限流写这里，不要只写在某一个 tool description 里。

决定「这台服务器怎么用」时，官方要求前 512 个字符自成一段。超长说明的后半段在选型阶段可能还没进上下文，于是限流、只读边界、禁止写操作会看起来像没声明。

把这些放在开头：这台服务器能做什么、绝对不能做什么、速率限制、要先登录还是永远只读。细节、示例、字段对照可以放在 512 之后。

这不是 \`SKILL.md\`，也不是 \`AGENTS.md\`。技能和仓库规则管的是 Codex 自己的工作流；\`instructions\` 管的是这台 MCP 对所有工具生效的边界。改完重启 MCP 或新开会话再 \`/mcp\` 核对。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "instructions", "上下文"],
    related: ["mcp-add-and-login", "plugin-mcp-oauth-json", "skill-declare-mcp-in-openai-yaml"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "plugin-mcp-json-wrapper",
    no: 244,
    title: "插件 mcp.json 包装键是 mcpServers，不要抄 TOML 的 mcp_servers",
    summary: "serde 按 camelCase 读包装对象。写成 mcp_servers 会变成一台名叫 mcp_servers 的假服务器，没有警告。用户策略仍写 plugins.\"name@market\".mcp_servers。",
    body: `兼容布局的官方打包页仍写：清单里的 \`mcpServers\` 可以指向一份 \`.mcp.json\`，文件里是「直接服务器表」或「包一层 \`mcp_servers\`」。后半句不要照抄。加载器 \`PluginMcpServersFile\` 用 \`rename_all = "camelCase"\`，Rust 字段 \`mcp_servers\` 对应的 JSON 键是 \`mcpServers\`。

两处 \`mcpServers\` 不是同一种值：

- 清单 \`.codex-plugin/plugin.json\` 或可移植 \`plugin.json\` overlay 里，它是路径字符串，例如 \`"./.mcp.json"\`。
- \`mcp.json\` / \`.mcp.json\` 里，它是包装对象，下面才是各台服务器。

包装对象必须写成 camelCase：

\`\`\`json
{
  "mcpServers": {
    "docs": {
      "command": "docs-mcp",
      "args": ["--stdio"]
    }
  }
}
\`\`\`

可移植包再加 \`$schema\` 和每台服务器的 \`type\`（例如 \`streamable-http\`）。不要只把 \`.mcp.json\` 改名。

也可以不包一层，直接把服务器名放在根上：

\`\`\`json
{
  "docs": {
    "command": "docs-mcp",
    "args": ["--stdio"]
  }
}
\`\`\`

写成 \`"mcp_servers": { "docs": { ... } }\` 时，包装解析失败，整份 JSON 会落到「根上就是服务器表」这条回退：你会得到一台名叫 \`mcp_servers\` 的服务器，真正的 \`docs\` 进不去。\`codex mcp list\` 里出现 \`mcp_servers\` 这个名字，就是踩中了。没有告警。有人给 serde 提过 \`alias = "mcp_servers"\`，没有进主干；跨宿主的 \`.mcp.json\` 仍以 \`mcpServers\` 为准。

用户侧开关和审批仍是 TOML 蛇形，不要把 JSON 的驼峰抄过来：

\`\`\`toml
[plugins."my-plugin@local-dev".mcp_servers.docs]
enabled = true
default_tools_approval_mode = "prompt"
\`\`\`

本机 \`[mcp_servers.docs]\` 改的是用户自己装的 MCP，改不了插件自带服务器的启动命令。

服务器名用下划线。写成 \`context-library\` 时，\`codex mcp get\` 还能看见，模型却调不到 \`mcp__context-library__...\` 这类工具；改成 \`context_library\` 立刻可调。连接器路径会把连字符收成下划线，插件 MCP 目前不会。改完重新安装插件并新开会话，不要只靠当前会话的 \`/mcp\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "MCP", "mcp.json"],
    related: ["plugin-mcp-cwd-dot", "plugin-portable-json", "plugin-mcp-oauth-json"],
    sources: [
      {
        label: "OpenAI · Package your plugin",
        url: "https://learn.chatgpt.com/plugins/build/plugins",
      },
      {
        label: "openai/codex#22105",
        url: "https://github.com/openai/codex/issues/22105",
      },
      {
        label: "openai/codex#33063",
        url: "https://github.com/openai/codex/issues/33063",
      },
    ],
  },
  {
    id: "plugin-mcp-cwd-dot",
    no: 245,
    title: "插件 MCP 不要在 command 里写 PLUGIN_ROOT，用 cwd \".\"",
    summary: "钩子会展开 PLUGIN_ROOT，mcp.json 的 command/args 不会，字面会进启动命令。相对 cwd 相对安装后的插件根，写成 \".\" 再配相对 args。",
    body: `钩子脚本里写 \`\${PLUGIN_ROOT}/hooks/session_start.py\` 能跑，是因为钩子加载器会做占位符替换。同一段抄进插件 \`mcp.json\` / \`.mcp.json\` 的 \`command\` 或 \`args\`，Codex 会原样拿去 spawn：启动的是字面量 \`\${PLUGIN_ROOT}/bin/demo-mcp\`，不是缓存里的安装目录。\`\${CLAUDE_PLUGIN_ROOT}\` 同样不会在 MCP 配置里展开。

stdio 服务器用相对 \`cwd\`。它相对**已经安装**的插件根解析，出不了这个根：

\`\`\`json
{
  "mcpServers": {
    "docs": {
      "command": "node",
      "args": ["./start.mjs"],
      "cwd": "."
    }
  }
}
\`\`\`

\`"."\` 就是插件根；\`"server"\` 会落到插件根下的 \`server/\`。\`args\` 里的相对路径跟着这个 cwd，不要再假设是你开 Codex 时的仓库目录。可移植包照样要给服务器写 \`type\`（stdio 用 \`stdio\`）。HTTP MCP 不靠 cwd。

这不是用户 \`[mcp_servers.docs] cwd\`。那条改的是你自己装的服务器；插件自带服务器的启动命令用户改不了。

\`env\` 里目前只保证 \`\${PLUGIN_ROOT}\` 和 \`\${PLUGIN_DATA}\` 会展开。写成 \`\${DB_PASSWORD}\` 会把字面量传给子进程。0.150 起若要转发本机环境变量：可移植 \`mcp.json\` 仍是源，另外在 \`.codex-plugin/.mcp.json\` 给**同名**服务器写 \`env_vars\` 列表，不要把密钥写进清单。

改完重新安装插件并新开会话。用 \`codex mcp get docs\` 看 cwd 是不是缓存根，命令里有没有残留的 \`\${PLUGIN_ROOT}\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "MCP", "PLUGIN_ROOT"],
    related: ["plugin-hook-plugin-root", "plugin-portable-json", "plugin-mcp-json-wrapper"],
    sources: [
      {
        label: "openai/codex#35762",
        url: "https://github.com/openai/codex/issues/35762",
      },
      {
        label: "openai/codex#28145",
        url: "https://github.com/openai/codex/discussions/28145",
      },
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
    ],
  },
  {
    id: "desktop-project-mcp",
    no: 246,
    title: "桌面读不到项目层 MCP 时，先确认信任再拷到用户 config",
    summary: "受信任项目的 .codex/config.toml 可以写 mcp_servers，CLI 通常能加载。桌面和 IDE 扩展经常只读 ~/.codex。stdio 还要把 command 和 cwd 写成绝对路径，并彻底退出后新开线程。",
    body: `官方允许在**已信任**项目的 \`.codex/config.toml\` 里写 \`[mcp_servers.docs]\`。未信任时项目层整份跳过（config、hooks、rules 一起），看起来像 MCP 没配。先在本机 CLI 里确认信任，再用 \`codex mcp list\` / \`codex mcp get docs\` 看 CLI 能不能看见。

桌面应用和不少 IDE 扩展会话仍可能只加载 \`~/.codex/config.toml\`。2026-08 仍有人在桌面 26.707 上复现：项目层 stdio 服务器进不了新任务的工具表。\`/mcp\` 在桌面线程里也常只列用户层；设置页或 \`codex mcp list\` 看得到，不等于当前线程已经注入这台服务器的工具。

桌面要用同一台服务器时：

1. 把这段拷到 \`~/.codex/config.toml\`（密钥仍用 \`bearer_token_env_var\`，不要写进仓库）。
2. 彻底退出 ChatGPT / Codex，不要只新开会话。旧线程可能挂着过期的 MCP 进程。
3. 在这个项目里开**新**线程。工具看起来像默认集、缺项目参数时，先杀掉那台残留进程再开。

stdio 还有一层：桌面任务的 cwd 有时是 \`/\`，相对 \`command\` / \`./vendor/bin/...\` 会起不来。用户层写成绝对路径：

\`\`\`toml
[mcp_servers.docs]
command = "/usr/bin/node"
args = ["/home/you/src/app/servers/docs.mjs"]
cwd = "/home/you/src/app"
enabled = true
\`\`\`

仓库里跑本地二进制、\`cwd = "."\` 的服务器不要拷成全局项：它会在别人的机器上用错目录，也绕开项目信任边界。这种只给 CLI 用，或等桌面真正加载项目层。HTTP MCP 拷用户层相对安全。网页 Work 仍然不读 \`~/.codex\`。

反过来：桌面改设置、插件或项目信任时，有时会把用户层 \`mcp_servers\` 整表写丢。项目里如果只写了 \`enabled = true\`、没有 \`command\` 或 \`url\`，线程会直接 invalid transport。那条权宜见「桌面写丢用户 MCP」。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["app", "cli", "ide"],
    tags: ["MCP", "桌面", "config.toml"],
    related: ["mcp-host-split", "desktop-mcp-config-clobber", "desktop-wsl-codex-app-transport"],
    sources: [
      {
        label: "openai/codex#13025",
        url: "https://github.com/openai/codex/issues/13025",
      },
      {
        label: "openai/codex#14449",
        url: "https://github.com/openai/codex/issues/14449",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "desktop-wsl-user-mcp",
    no: 248,
    title: "桌面 WSL 代理下列得出 MCP、线程里没有工具时，换 Windows 启动器",
    summary: "Agent environment 走 WSL 时，WSL 里的 node / npx stdio 服务器在 mcp list 显示 enabled，桌面线程却常常不注入工具。CLI 在发行版里通常正常。权宜是改成 Windows 侧启动器，或切回原生代理。不要和内部 codex_app 的 invalid transport 混成一件事。",
    body: `先分流。线程完全起不来、文案是 invalid transport in \`mcp_servers.codex_app\`，看「桌面开 WSL 报 invalid transport」那条，不要先改用户 MCP。

线程能开，但 \`codex mcp list\` / 设置页显示 enabled，当前对话工具表却没有这台服务器：这是桌面 WSL 代理路径上的用户 MCP 注入问题。2026-06 仍有人在桌面 26.609 上复现：WSL 里的 \`npx\` 命令自己 \`initialize\` / \`tools/list\` 都成功，桌面新线程就是不露工具。

对照：

1. 在 **WSL CLI** 里 \`codex mcp list\`、\`codex mcp get docs\`。这里看得见，说明用户 config 和 Linux 二进制没坏。
2. 桌面 Settings 把 Agent environment 设成 WSL，彻底退出后再开**新**线程。不要只看旧会话。
3. 确认这段写在 Windows 桌面读的 \`%USERPROFILE%\\.codex\\config.toml\`，不是只写在 WSL 家目录。两条家目录默认不共用。

权宜之一：把 stdio 启动器改成 Windows 侧的 Node，让桌面去 spawn 它。路径按本机改，带空格必须加引号：

\`\`\`toml
[mcp_servers.docs]
command = "/mnt/c/Program Files/nodejs/node.exe"
args = ["C:\\\\Program Files\\\\nodejs\\\\node_modules\\\\npm\\\\bin\\\\npx-cli.js", "-y", "@example/docs-mcp"]
cwd = "/mnt/c/Users/you"
startup_timeout_sec = 40
enabled = true
\`\`\`

改完彻底退出 ChatGPT / Codex，再开新线程。服务器名不要用连字符，避免 list 看得到、模型调不到。

另一条路：Settings 把代理切回 Windows native，或 \`[desktop] runCodexInWindowsSubsystemForLinux = false\`。这会换执行环境。仓库在 Linux 家目录时，原生代理可能打不开同一份路径，这时用 WSL 里的 CLI 调这些 MCP，不要为了对齐配置去 \`export CODEX_HOME\`：一份 TOML 很难同时伺候 Linux \`npx\` 和 \`node.exe\`。

不要把 WSL 的 \`/home/you/.nvm/...\` 启动块写进桌面还指望工具出现。HTTP MCP 不受这条 stdio 启动器限制。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["app", "cli"],
    tags: ["MCP", "WSL", "桌面", "Windows"],
    related: ["desktop-wsl-codex-app-transport", "desktop-project-mcp", "windows-app-wsl-home-split"],
    sources: [
      {
        label: "openai/codex#13690",
        url: "https://github.com/openai/codex/issues/13690",
      },
      {
        label: "openai/codex#14449",
        url: "https://github.com/openai/codex/issues/14449",
      },
      {
        label: "OpenAI · ChatGPT desktop app for Windows",
        url: "https://learn.chatgpt.com/docs/windows/windows-app",
      },
    ],
  },
  {
    id: "macos-mcp-bare-command",
    no: 249,
    title: "macOS 0.154 起 MCP 可用 uvx、npx 和相对路径，不必再写绝对路径",
    summary: "以前原生 spawn 只认绝对路径，裸命令会掉进 shell。0.154 起按子进程 PATH 解析 uvx / npx，相对可执行文件也走原生启动。没有 shebang 仍回退 shell。Dock 打开的桌面经常没有 Homebrew PATH。",
    body: `\`codex --version\` 到 0.154 之后，macOS 上用户 config 可以这样写：

\`\`\`toml
[mcp_servers.docs]
command = "uvx"
args = ["docs-mcp@latest"]
enabled = true
\`\`\`

仓库里的启动脚本用相对路径，配绝对 \`cwd\`：

\`\`\`toml
[mcp_servers.local_docs]
command = "./scripts/mcp-server"
args = ["--stdio"]
cwd = "/Users/you/src/app"
enabled = true
\`\`\`

以前只有绝对 \`command\` 才走原生 spawn；\`uvx\`、\`npx\`、\`./scripts/...\` 会落到 shell，隔离和报错都不一样。0.154 按**子进程**配置的 \`PATH\` 解析裸命令（空条目、未设置时的默认 PATH 都算），并保留原来的 \`argv[0]\`。找不到可执行文件、或目标没有 shebang，才回退原来的 shell 启动器。

桌面应用从 Dock 打开时，子进程 PATH 常常没有 Homebrew。\`codex mcp list\` 报 command not found，先查这个，不要先换服务器。把 PATH 写进这台服务器的 \`env\`，或把 \`command\` 改成 \`/opt/homebrew/bin/uvx\`。

这不是插件 \`mcp.json\`：那里的 \`command\` 仍然不展开 \`PLUGIN_ROOT\`，相对路径跟安装后的插件根，见插件 MCP 用 cwd \".\" 那条。HTTP MCP 走 \`url\`，不受这条 spawn 规则影响。改完新开会话，用 \`codex mcp get docs\` 核对实际启动命令。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "macOS", "0.154"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "plugin-mcp-cwd-dot"],
    sources: [
      {
        label: "openai/codex#42192",
        url: "https://github.com/openai/codex/pull/42192",
      },
      {
        label: "openai/codex rust-v0.154.0",
        url: "https://github.com/openai/codex/releases/tag/rust-v0.154.0",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "sqlcl-oracle-mcp",
    no: 250,
    title: "接 Oracle 用 SQLcl MCP，密码放 ~/.dbtools 不要写进 config.toml",
    summary: "SQLcl 25.2+ 用 sql -mcp。先 conn -save -savepwd 存别名。command 写绝对路径，Java 起得慢就 required = true。不要抄 Claude 的 mcpServers JSON。",
    body: `先装 Oracle SQLcl 25.2 或更高，以及 Java 17 或 21。在 SQLcl 里自己存好连接，密码进 \`~/.dbtools\`，不要让 Codex 拼连接串：

\`\`\`text
sql
SQL> conn -save devdb -savepwd
\`\`\`

别名要先能手工连上。然后用绝对路径把 SQLcl 注册成 MCP，不要只写 \`sql\`：

\`\`\`bash
codex mcp add sqlcl -- /opt/oracle/sqlcl/bin/sql -mcp
\`\`\`

或写用户配置：

\`\`\`toml
[mcp_servers.sqlcl]
command = "/opt/oracle/sqlcl/bin/sql"
args = ["-mcp"]
required = true
startup_timeout_sec = 40
enabled = true
\`\`\`

Windows 把 \`command\` 换成 \`sql.exe\` 的绝对路径。从 Dock 打开的桌面经常没有 SQLcl 的 PATH，裸命令会 command not found，见 macOS 裸命令那条。

Java 起 MCP 经常超过可选服务器默认 1 秒宽限。\`codex exec\` 要用到它时必须 \`required = true\`，或把 \`mcp_optional_startup_grace_ms\` 改成 \`0\`。不要抄 Cline / Claude 的 \`mcpServers\` JSON 进 Codex。

改完新开会话，用 \`codex mcp list\` 和 \`/mcp\` 核对工具。先让它连已保存的 \`devdb\`，只跑只读查询。工具名以本机 \`/mcp\` 为准，常见是 \`list-connections\`、\`connect\`、\`run-sql\`。写操作另开审批，不要把连接串或密码写进 \`AGENTS.md\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Oracle", "SQLcl"],
    related: ["mcp-add-and-login", "mcp-startup-timeout-sec", "exec-mcp-optional-grace"],
    sources: [
      {
        label: "Oracle Developers · Codex + SQLcl MCP",
        url: "https://blogs.oracle.com/developers/how-to-build-a-controlled-mcp-workflow-for-codex-and-oracle-ai-database",
      },
      {
        label: "Oracle SQLcl · Preparing Your Environment",
        url: "https://docs.oracle.com/en/database/oracle/sql-developer-command-line/25.4/sqcug/preparing-your-environment.html",
      },
      {
        label: "Oracle · DEV.to 转载",
        url: "https://dev.to/oracledevs/how-to-build-a-controlled-mcp-workflow-for-codex-and-oracle-ai-database-5e90",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-stdio-stdout-jsonrpc",
    no: 251,
    title: "stdio MCP 的 stdout 只能是 JSON-RPC，日志打 stderr",
    summary: "Codex 把 stdout 当严格协议。启动横幅、console.log、Content-Length 头都会 Transport closed 或列不出工具。探测用换行分隔的 initialize。",
    body: `stdio MCP 的 \`stdout\` 是协议通道，不是日志。Codex 按**一行一条** JSON-RPC 读，比不少其它客户端更严。\`mcp list\` 显示 enabled、你在终端里手工探测也通，但会话里一调工具就 \`Transport closed\`，先查有没有非 JSON 打到了 stdout。

自己探测时用换行，不要用 LSP 那种 \`Content-Length\` 头：

\`\`\`bash
printf '%s\\n' '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"probe","version":"0"}}}' | node ./server.js
\`\`\`

第一行必须是 \`{\` 开头的 JSON。出现 \`[MCP Bridge]\`、\`loaded\`、\`console.log\` 横幅，就是协议被污染。把诊断改到 \`stderr\` 或文件，Windows 上 \`console.debug\` 有时仍会进 stdout，改成明确写 stderr。

只讲 \`Content-Length\` 的自写服务器，Codex 可能列得出 enabled、会话里却没有工具。改成默认输出换行 JSON，并**新开会话**再测。

这和另外两条 Windows 坑不是同一件事：Python stdio 握手字节根本到不了客户端，Node 往往正常；stderr 太吵可能堵满管道。日志已经离开 stdout 仍失败，再查那两条，不要先换服务器实现。HTTP MCP 走 \`url\`，不受这条 stdout 规则影响。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "stdio", "Transport closed"],
    related: ["mcp-add-and-login", "macos-mcp-bare-command", "windows-mcp-stderr-pipe"],
    sources: [
      {
        label: "openai/codex#18486",
        url: "https://github.com/openai/codex/issues/18486",
      },
      {
        label: "openai/codex#21406",
        url: "https://github.com/openai/codex/issues/21406",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "windows-mcp-stderr-pipe",
    no: 252,
    title: "Windows 上 stderr 太吵会堵死 stdio MCP",
    summary:
      "stdout 已经是干净 JSON-RPC，Windows 上 Codex 仍 Transport closed。约 4KB 的 stderr 管道没人读就会堵死子进程。把 stderr 重定向到日志文件，不要默认丢进 NUL。",
    body: `stdout 探测第一行已经是 \`{\` 开头的 JSON，手工 \`printf\` 管道也能握手，Claude / Copilot / Cursor 都正常，只有 **原生 Windows** 上的 Codex 报 \`Transport closed\`：先查 stderr，不要先换服务器实现。

Windows 给子进程的 stderr 管道大约 4KB。MCP 服务器启动时把依赖树、SQL 警告、框架横幅打到 stderr，没人读就会把写端堵住，进程看起来像立刻断连。这和 stdout 混了非 JSON 不是同一条坑；也不是 Python 握手字节到不了客户端——Node 服务器往往还能被别的客户端正常调用。

权宜是让 \`cmd\` 把 stderr 重定向到文件，并给够启动超时：

\`\`\`toml
[mcp_servers.docs]
command = "cmd"
args = ["/c", "node C:\\\\Users\\\\you\\\\mcp-server\\\\index.js 2>C:\\\\temp\\\\mcp-stderr.log"]
startup_timeout_sec = 60
enabled = true
\`\`\`

优先写日志文件，不要一上来 \`2>NUL\`：管道不堵了，启动失败也看不见。改完必须**新开会话**，旧线程不会重拉 MCP。

这条只针对原生 Windows。桌面开了 WSL 代理时，不要把 \`command = "cmd"\` 抄进 Linux 侧 config——那会变成另一条 invalid transport。WSL 里用 bash 重定向：\`args = ["-lc", "node ./server.js 2>/tmp/mcp-stderr.log"]\`。HTTP MCP 走 \`url\`，不受这条管道限制。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Windows", "stdio", "Transport closed"],
    related: [
      "mcp-stdio-stdout-jsonrpc",
      "desktop-wsl-codex-app-transport",
      "toml-windows-path-quotes",
    ],
    sources: [
      {
        label: "openai/codex#7155",
        url: "https://github.com/openai/codex/issues/7155",
      },
      {
        label: "openai/codex#18486",
        url: "https://github.com/openai/codex/issues/18486",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-http-not-sse",
    no: 254,
    title: "HTTP MCP 只接 Streamable HTTP，不要抄 /sse",
    summary:
      "Codex 的远程 MCP 只有 Streamable HTTP。url 写成 /sse 时 OAuth 往往能过，initialize 却 404 或 connection closed。改成供应商的 /mcp，不要先套 mcp-remote。",
    body: `官方文档写明 Codex 主机支持 **stdio** 和 **Streamable HTTP**，没有旧版 SSE 传输。从 Claude / Cursor 教程抄来的地址常常以 \`/sse\` 结尾：

\`\`\`toml
[mcp_servers.docs]
url = "https://mcp.example.com/v1/sse"
\`\`\`

\`codex mcp login docs\` 可能弹出浏览器并显示成功，随后握手失败：\`HTTP 404 ... when send initialize\`，或 \`connection closed: initialize response\`。这不是 token 坏了，是这条 URL 根本不是 Streamable HTTP。

改成供应商现在的 HTTP 入口，通常是同主机的 \`/mcp\` 或 \`/v1/mcp\`：

\`\`\`bash
codex mcp remove docs
codex mcp add docs --url https://mcp.example.com/mcp
codex mcp login docs
\`\`\`

\`\`\`toml
[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
\`\`\`

Linear 官方就是 \`https://mcp.linear.app/mcp\`。桌面和 IDE 添加服务器时选 Streamable HTTP，不要选已经过时的 SSE。改完新开会话，用 \`codex mcp get docs\` 看 transport 是否为 streamable_http。

不要一上来用 \`npx -y mcp-remote https://.../sse\` 当修法：那会把远程服务变回本地 stdio，Windows 上又会撞上路径、stderr 管道那些坑。只有供应商确实只提供 SSE、没有 \`/mcp\` 时才考虑桥接。HTTP MCP 走 \`url\`，不受 stdout JSON-RPC 那条规则影响。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "HTTP", "SSE", "OAuth"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "linear-mcp-add"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "openai/codex#5634",
        url: "https://github.com/openai/codex/issues/5634",
      },
      {
        label: "OpenAI · Use Codex in Linear",
        url: "https://learn.chatgpt.com/docs/third-party/linear",
      },
    ],
  },
  {
    id: "mcp-startup-timeout-sec",
    no: 255,
    title: "冷 npx / uvx 先把 startup_timeout_sec 提到 30–60",
    summary:
      "每台 MCP 启动握手默认 10 秒。冷缓存经常超时，失败很安静：像没装，或 request timed out。这不是 Transport closed，也不是 exec 那条 1 秒宽限。",
    body: `官方给每台服务器 \`startup_timeout_sec\` 默认 **10** 秒，覆盖 initialize 和第一轮 \`tools/list\`。冷的 \`npx -y\`、\`uvx\`、Java（SQLcl）经常超过这个预算：要拉包、过 Defender，有时还要编译。失败常常不响：\`/mcp\` 或 \`codex mcp list\` 里名字在、工具 0；日志写 aggregating 0 tools；或 \`MCP client for docs timed out after 10 seconds\`。先加超时，再换服务器。

\`\`\`toml
[mcp_servers.docs]
command = "npx"
args = ["-y", "@example/docs-mcp"]
startup_timeout_sec = 60
enabled = true
\`\`\`

Windows 冷启动建议 60；本机已经装过的包 30 往往够。改完必须**新开会话**。终端先跑同一条 \`npx\` / \`uvx\` 命令预热缓存，再开 Codex。

\`tool_timeout_sec\` 是**调用工具**的超时，默认 60，不是启动握手。旧文里的 \`startup_timeout_ms\` 只是毫秒别名，现行键写秒。不要把 \`required = true\` 当成「再多等一会儿」：必达服务器失败会让 Codex 起不来。exec 里可选服务器还有顶层 \`mcp_optional_startup_grace_ms\`（默认 1 秒），那是另一条宽限，见 exec 可选 MCP 那条。

握手已经成功、随后 \`Transport closed\`，查 stdout 混了非 JSON 或 Windows stderr 堵管道，不是这条。TUI 若建议给主机自带的 \`codex_apps\` 写 \`[mcp_servers.codex_apps]\` 来抬超时，不要照做：那台没有用户可配的 transport，只会 invalid transport。桌面 WSL 注入的残缺 \`codex_app\` 是另一条坑。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "startup_timeout_sec", "npx", "超时"],
    related: ["mcp-required-and-allowlist", "exec-mcp-optional-grace", "sqlcl-oracle-mcp"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "openai/codex#2905",
        url: "https://github.com/openai/codex/issues/2905",
      },
      {
        label: "openai/codex#29396",
        url: "https://github.com/openai/codex/issues/29396",
      },
    ],
  },
  {
    id: "mcp-stdio-env-vars",
    no: 256,
    title: "stdio MCP 不继承整份 shell，密钥用 env_vars 转发",
    summary:
      "子进程只拿到一小份默认环境。env_vars 从启动 Codex 的进程转发名字；env 表是字面量。TOML 里的占位符不会展开。这不是 shell_environment_policy。",
    body: `stdio MCP **不会**继承你整个 shell。Codex 清掉环境后，只放行一小份默认名单（\`PATH\`、\`HOME\`、\`USER\`、\`TERM\`、\`LANG\` 一类），再加上 \`env_vars\` 和 \`[mcp_servers.docs.env]\` 里的字面量。\`codex mcp list\` 显示 enabled、终端里同一条命令也通，会话里却 Unauthorized、密钥管理器显示 locked、或 \`npx\` 报 \`EACCES\`：先查环境，不要先换服务器。

\`\`\`toml
[mcp_servers.docs]
command = "npx"
args = ["-y", "@example/docs-mcp"]
env_vars = ["DOCS_API_KEY"]
enabled = true

[mcp_servers.docs.env]
PATH = "/opt/homebrew/bin:/usr/bin:/bin"
\`\`\`

\`env_vars\` 从**启动 Codex 的那个进程**按名字转发。\`env\` 表写入的是字面量，下面这样子进程拿到的是字符串本身，不是密钥：

\`\`\`toml
[mcp_servers.docs.env]
DOCS_API_KEY = "\${DOCS_API_KEY}"
\`\`\`

\`args\` 里的 \`\${DOCS_API_KEY}\` 同样不会被 Codex 展开；要靠服务器自己读环境，名字必须先出现在 \`env_vars\` 或 \`env\`。

公司代理注入的 \`HTTPS_PROXY\`、\`NODE_EXTRA_CA_CERTS\` 也不在默认名单里。冷 \`npx\` 拉包证书失败时把它们加进 \`env_vars\`。

这和 \`shell_environment_policy\` 不是同一条闸：后者管模型跑的 shell 命令，改 \`inherit = "all"\` 填不满 MCP 子进程。插件 \`mcp.json\` 的 \`env_vars\` 是另一份清单。\`source = "remote"\` 只有远端执行器那条才有效。HTTP MCP 用 \`bearer_token_env_var\` / \`env_http_headers\`，写 \`env_vars\` 无效；HTTP 进程环境见 bearer 那条。

从 Dock 打开的桌面常常没有你在 zshrc 里 export 的变量。\`env_vars\` 转发的是桌面自己的环境；终端里有、桌面没有时，彻底退出后再从已 export 的终端启动，或把非密钥的 PATH 写进 \`env\`。改完新开会话。\`codex doctor\` 会标出点了名却缺失的 \`env_vars\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "env_vars", "stdio", "密钥"],
    related: ["mcp-http-bearer-env", "mcp-stdio-display-env", "mcp-grafana-stdio"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "openai/codex#19023",
        url: "https://github.com/openai/codex/issues/19023",
      },
      {
        label: "openai/codex#29124",
        url: "https://github.com/openai/codex/issues/29124",
      },
    ],
  },
  {
    id: "mcp-http-bearer-env",
    no: 257,
    title: "HTTP MCP 的 bearer_token_env_var 读 Codex 进程，不是刚 export 的 shell",
    summary:
      "变量必须在启动 Codex 的那个进程里。mcp list 显示 Bearer 不等于请求带了头。不要对 bearer 跑 mcp login，也不要把 HTTP 写成 env_vars。",
    body: `HTTP MCP 的 \`bearer_token_env_var\` 读的是**启动 Codex 的那个进程**里的环境变量，不是你刚在另一个终端 \`export\` 的值，也不是 stdio 那套 \`env_vars\`。

\`\`\`toml
[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
bearer_token_env_var = "DOCS_MCP_TOKEN"
enabled = true
\`\`\`

先 \`codex mcp add docs --url https://mcp.example.com/mcp\`，再在 TOML 里写这个键。本机 \`codex mcp add --help\` 若列出 \`--bearer-token-env-var\` 也可以一次加完。键里填的是变量**名**，不是 token 本身。

\`codex mcp list\` / \`codex mcp get docs\` 只要配置了这个键，就可能显示 Auth: Bearer token，即使当前进程里变量缺失、发出去的 \`initialize\` 根本没有 \`Authorization\`。工具数为 0、HTTP 401、或提示去 \`codex mcp login docs\`：先查进程环境。Bearer 服务器没有 OAuth 流程，不要跑 login。\`codex doctor\` 有时会标缺失的 MCP 环境变量，list 却仍看起来正常。

从已经 \`export DOCS_MCP_TOKEN\` 的终端启动 \`codex\`。Dock / 开始菜单打开的桌面没有 zshrc / bashrc。改完环境必须彻底退出再开新进程，旧线程不会热加载。不要把 token 字面量写进 \`config.toml\` 或 \`http_headers\`。自定义头用 \`env_http_headers\`，同样读进程环境。stdio 的 \`env_vars\` 对 HTTP 无效。OAuth 服务器继续 \`codex mcp login docs\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "bearer_token_env_var", "HTTP", "密钥"],
    related: ["mcp-github-hosted", "mcp-http-env-headers", "mcp-stdio-env-vars"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "openai/codex#30125",
        url: "https://github.com/openai/codex/issues/30125",
      },
      {
        label: "openai/codex#26760",
        url: "https://github.com/openai/codex/issues/26760",
      },
    ],
  },
  {
    id: "mcp-http-env-headers",
    no: 258,
    title: "HTTP MCP 自定义头用 env_http_headers，缺变量会静默不带头",
    summary:
      "左边是头名，右边是环境变量名。http_headers 是字面量，不要把密钥写进仓库。变量缺失或为空时这颗头直接丢掉，请求照样发出去。",
    body: `服务器要的是 \`X-Api-Key\` 这类自定义头，而不是 \`Authorization: Bearer\` 时，用 \`env_http_headers\`。左边是头名，右边是启动 Codex 的进程里的变量**名**。

\`\`\`toml
[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
enabled = true

[mcp_servers.docs.env_http_headers]
X-Api-Key = "DOCS_API_KEY"
\`\`\`

\`http_headers\` 写入的是字面量。下面这样会把密钥提交进 config，项目层文件还可能进 Git：

\`\`\`toml
[mcp_servers.docs.http_headers]
X-Api-Key = "sk-live-do-not-commit"
\`\`\`

Bearer 继续用 \`bearer_token_env_var\`，不要拿这张表去填 \`Authorization\`。维护者说明可以省略 Bearer 键，只配自定义头。不要为了自定义头去跑 \`codex mcp login docs\`。

变量缺失或值为空时，这颗头会被静默丢掉，请求照样发出去。\`codex mcp get docs\` 仍可能列出 \`env_http_headers\`，工具却 401 或直接消失。从已经 \`export DOCS_API_KEY\` 的终端启动；Dock / 开始菜单打开的桌面没有 zshrc。改完彻底退出再开新进程。

TOML 占位符不会展开，下面右边是字符串本身，不是密钥：

\`\`\`toml
[mcp_servers.docs.env_http_headers]
X-Api-Key = "\${DOCS_API_KEY}"
\`\`\`

stdio 的 \`env_vars\` 对 HTTP 无效。会过期、要每条连接刷新的票用 \`http_headers_helper\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "env_http_headers", "HTTP", "密钥"],
    related: ["mcp-http-bearer-env", "mcp-datadog-remote", "mcp-grafana-cloud"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "openai/codex#5180",
        url: "https://github.com/openai/codex/issues/5180",
      },
      {
        label: "openai/codex#5241",
        url: "https://github.com/openai/codex/issues/5241",
      },
    ],
  },
  {
    id: "mcp-oauth-callback-id",
    no: 259,
    title: "MCP OAuth 登记完整回调，不要只登 mcp_oauth_callback_url 基址",
    summary:
      "配置里的基址不是最终 redirect_uri。无 issuer 支持时会再拼 callback ID。把 add 打印的完整 URL 登到 IdP。",
    body: `\`mcp_oauth_callback_url\` 和 \`[mcp_servers.docs.oauth] callback_url\` 写的是**基址**。发给授权服务器的 \`redirect_uri\` 常常还要再拼这台 MCP 的 callback ID。这个 ID 从服务器 URL（含路径和查询串）算出来，跨 \`mcp remove\` / \`mcp add\` 可复现，不是每次随机。

Keycloak、Auth0、企业 OIDC 若精确匹配，只把基址登上去会报 \`invalid_request\`，或说 \`redirect_uri\` 不在客户端配置里。GitHub #30460 把这当成 bug；Learn 配置参考已经写成现行规则：授权服务器不广告 issuer 绑定时就会拼后缀。不要等「exact URI」补丁，也不要去跑还没合入的 \`codex mcp callback-url\`。

先加服务器，再抄终端打印的完整地址：

\`\`\`bash
codex mcp add docs --url https://mcp.example.com/mcp --oauth-client-id my-client
codex mcp login docs
\`\`\`

把打印出的 \`OAuth callback URL\` 原样登到授权服务器，包含 \`/callback/XXXX\` 那段 ID。不要只登记下面这份基址：

\`\`\`toml
mcp_oauth_callback_url = "http://127.0.0.1/callback"
mcp_oauth_callback_port = 5555

[mcp_servers.docs]
url = "https://mcp.example.com/mcp"

[mcp_servers.docs.oauth]
client_id = "my-client"
callback_url = "http://127.0.0.1/callback"
\`\`\`

预注册客户端且 \`callback_url\` 缺正确 callback ID、授权服务器又不广告 issuer 绑定时，这份配置会被忽略。Codex 改用全局 \`mcp_oauth_callback_url\`（未设则 \`http://127.0.0.1/callback\`）再拼 ID。磁盘里的 TOML 不会被改写，所以看起来「配置写对了却登不上」。

新加的预注册客户端只有在授权服务器广告 \`authorization_response_iss_parameter_supported\` 且 metadata 里有 \`issuer\` 时，才可能用不带 ID 的稳定回调。否则仍拼 ID。改了 MCP 的 \`url\` 路径或查询串，callback ID 会变，要重新登记。

无端口的 \`http://127.0.0.1\` 才会在授权时插入监听端口；\`localhost\`、已带端口、IPv6、HTTPS 都不会。端口规则见「用无端口的 127.0.0.1」那条。插件 \`mcp.json\` 的 \`callbackUrl\` 缺 ID 时同样会被忽略。

不要把讨论里的 \`mcp_oauth_callback_path_mode\` 抄进配置，那条提案还没落地。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "OAuth", "mcp_oauth_callback_url", "callback"],
    related: ["mcp-oauth-loopback-callback", "plugin-mcp-oauth-json", "mcp-add-and-login"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "openai/codex#30460",
        url: "https://github.com/openai/codex/issues/30460",
      },
    ],
  },
  {
    id: "mcp-github-hosted",
    no: 260,
    title: "托管 GitHub MCP 用 Copilot HTTP 地址，add 必须带 bearer 变量名",
    summary:
      "官方远程是 api.githubcopilot.com/mcp/。只 add URL 会留下能 list、请求 401 的配置。Codex 不读 .env；变量必须在启动进程里。不要对它跑 mcp login。",
    body: `GitHub 官方托管 MCP 是 Streamable HTTP，地址是 \`https://api.githubcopilot.com/mcp/\`。这不是 Cloud 评论里的 \`@codex review\`，也不是旧的 stdio 包 \`@modelcontextprotocol/server-github\`。

\`\`\`bash
export GITHUB_PAT_TOKEN
codex mcp add github --url https://api.githubcopilot.com/mcp/ --bearer-token-env-var GITHUB_PAT_TOKEN
\`\`\`

\`--bearer-token-env-var\` 必须带上。只写 \`--url\` 会留下一份看起来正常、发出去却 401 的配置。键里填的是变量名 \`GITHUB_PAT_TOKEN\`，不是 PAT 本身。GitHub 安装页注释写过 Replace with your real PAT，那是过时措辞，不要把 token 写进 TOML。

Codex **不会**自动读项目 \`.env\`。GitHub 文档让你把 PAT 放进 \`.env\`，那只在你的 shell 已经 source 之后才进进程。从已经 \`export GITHUB_PAT_TOKEN\` 的终端启动 \`codex\`；Dock / 开始菜单打开的桌面没有 zshrc。改完彻底退出再开新进程。

不要：

- 对这台服务器跑 \`codex mcp login github\`（Bearer，没有 OAuth 流程）
- 写 \`[mcp_servers.github.env]\`（HTTP 会报 env is not supported for streamable_http，整份 config 起不来）
- 把 PAT 写进 \`http_headers\` 的 \`Authorization\`
- 抄 Claude 的 \`mcpServers\` JSON

\`codex mcp list\` 显示 Auth: Bearer 不等于请求带了头。工具 0 或 401：先查启动 Codex 的那个进程里有没有 \`GITHUB_PAT_TOKEN\`，再查 PAT 是否带了 \`repo\` 一类范围。本地 Docker 镜像是另一条 stdio 传输，不要把 \`GITHUB_PERSONAL_ACCESS_TOKEN\` 字面量抄进用户 config。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "GitHub", "bearer_token_env_var", "HTTP"],
    related: ["mcp-http-bearer-env", "mcp-add-and-login", "github-pr-codex-review"],
    sources: [
      {
        label: "GitHub · Install MCP in Codex",
        url: "https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-codex.md",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "github/github-mcp-server#2421",
        url: "https://github.com/github/github-mcp-server/issues/2421",
      },
    ],
  },
  {
    id: "mcp-figma-remote",
    no: 261,
    title: "Figma MCP 用官方远程 URL 再 login，不要抄过时的 rmcp 开关",
    summary:
      "CLI 先 add https://mcp.figma.com/mcp，再 mcp login figma。桌面应用走插件安装。这是 OAuth，不是 GitHub 那种 PAT。本地 3845 是另一台企业桌面服务。",
    body: `Figma 官方推荐**远程** MCP。CLI：

\`\`\`bash
codex mcp add figma --url https://mcp.figma.com/mcp
codex mcp login figma
\`\`\`

桌面应用优先走插件：左上角 Plugins → Figma 旁边的 + → Install Figma → Allow access。网页 Work 读不到这份本机配置。

这是 OAuth。不要对它套 GitHub 那套 \`--bearer-token-env-var\`。换账号不要只重装插件：先 \`codex mcp logout figma\`，再 \`codex mcp login figma\`。

配置参考里有一份带 \`bearer_token_env_var = "FIGMA_OAUTH_TOKEN"\` 和 \`X-Figma-Region\` 的示例。那是「进程里已经有令牌」的写法。显式 bearer 优先于已登录的 OAuth；变量缺失时请求可能不带头，看起来像 login 失效。走官方 add / login 就不要同时写 bearer。旧文里的 \`experimental_use_rmcp_client\` / \`rmcp_client = true\` 已经不是现行前置条件，不要再抄。

企业才需要 Figma **桌面应用**里的本地 MCP。先在 Figma 桌面开 Dev Mode 启用服务器，再加：

\`\`\`toml
[mcp_servers.figma_desktop]
url = "http://127.0.0.1:3845/mcp"
\`\`\`

Figma 帮助中心用名 \`figma-desktop\`。本机 HTTP 表用下划线更稳。Figma 桌面必须开着。不要抄 \`/sse\`，也不要抄 Claude 的 \`claude mcp add --transport http\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Figma", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-notion-remote", "mcp-http-not-sse"],
    sources: [
      {
        label: "Figma · Remote MCP for Codex",
        url: "https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/",
      },
      {
        label: "Figma Help · Codex and Figma",
        url: "https://help.figma.com/hc/en-us/articles/39888629089175-Codex-and-Figma-Set-up-the-MCP-server",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "desktop-mcp-config-clobber",
    no: 262,
    title: "桌面写丢用户 MCP 时，项目层要写完整传输，不要只写 enabled",
    summary:
      "开放 bug：桌面改设置、插件或信任，可能把 ~/.codex 里的 mcp_servers 整表写没。项目只剩 enabled = true 会 invalid transport。权宜是项目里写全 command 或 url，并自己留备份。",
    body: `这是开放缺陷，不是功能。Windows 桌面、以及 macOS 桌面连远程 Linux 主机，都有人复现：用户 \`~/.codex/config.toml\` 被桌面原子写回之后，原来的 \`[mcp_servers.docs]\` 整张表消失。上游 MCP 还活着，环境变量也还在，但：

- \`codex mcp get docs\` 变成 No MCP server named docs found
- 当前任务看不到这台服务器的工具
- 项目 \`.codex/config.toml\` 如果只写了 \`enabled = true\` 去覆盖用户层定义，加载器会报 invalid transport in \`mcp_servers.docs\`，桌面甚至开不了新任务

先和内部 \`codex_app\` 那条分流。报错名字是 \`codex_app\`、而且开了 WSL 代理，走「桌面开 WSL 报 invalid transport」那条。这里说的是**你自己登记的服务器**被写丢。

权宜（社区在隔离家目录里对 CLI 0.153.4 / 0.154.0 验证过）：

1. 从备份恢复用户 \`config.toml\`，不要清空 \`~/.codex\` 来「重装」。
2. 受信任项目里不要只写开关。把完整传输写进项目层，这样用户层表没了也不会变成无 \`command\` / 无 \`url\` 的残表：

\`\`\`toml
[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
bearer_token_env_var = "DOCS_MCP_TOKEN"
enabled = true
\`\`\`

stdio 同样要写全 \`command\`、\`args\`、绝对 \`cwd\`。密钥继续用变量名，不要写进仓库。

桌面线程经常仍只读用户层。项目里写全传输能挡住 invalid transport，但桌面要用工具，还是得把用户 \`config.toml\` 找回来，然后彻底退出再开新线程。网页 Work 不读这份文件。

不要把「桌面开着时 CLI add、过一会儿设置页写回」当成已定位的唯一触发器；维护者还没钉死是哪一次写入。先备份，再避免项目层只有 \`enabled\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["app", "cli"],
    tags: ["MCP", "桌面", "config.toml"],
    related: ["desktop-project-mcp", "desktop-wsl-codex-app-transport", "three-layer-config"],
    sources: [
      {
        label: "openai/codex#36465",
        url: "https://github.com/openai/codex/issues/36465",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "chrome-devtools-mcp",
    no: 263,
    title: "Chrome DevTools MCP 用官方 npx stdio，不要抄 localhost HTTP 示例",
    summary:
      "CLI：codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest。要本机 Chrome 稳定版。Learn 里 localhost:3000/mcp 是另一台已在跑的 HTTP 服务。沙箱再加 --headless。不要抄 Claude 的 mcpServers JSON。",
    body: `官方给 Codex 的安装是 **stdio** 包：

\`\`\`bash
codex mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
\`\`\`

需要 Node.js LTS、npm，以及 **Chrome 稳定版**（官方也支持 Chrome for Testing）。别的 Chromium / Edge 不保证能用。\`codex mcp get chrome-devtools --json\` 应看到 \`transport.type\` 是 stdio、命令是 \`npx\`。只 add 成功不会自动开浏览器；第一次调用需要浏览器的工具时才会拉起。

不要做这些：

- 不要把 Learn 配置参考里的 \`[mcp_servers.chrome_devtools] url = "http://localhost:3000/mcp"\` 当成这个包。那是另一台已经在监听的 HTTP 服务。
- 不要把 Claude / Cursor 的 \`mcpServers\` JSON 贴进 Codex。Codex 写 \`~/.codex/config.toml\`。
- 不要和 \`@playwright/mcp\`、内置 Computer Use / Browser 混成一套。Playwright 管跨浏览器 E2E；这台管 DevTools 调试和性能追踪。
- 不要给它 \`required = true\` 挂在全局。用完会留下无头 Chrome，见残留进程那条。

冷启动 \`npx\` 常超过默认 10 秒，把 \`startup_timeout_sec\` 提到 20–30。旧文里的 \`startup_timeout_ms\` 只是毫秒别名。沙箱或无显示环境再给包传 \`--headless\`、\`--isolated\`；默认可视窗口在 Codex 沙箱里打不开。

Windows 11 上 \`npx\` 直接 spawn 失败时，Chrome 官方文档才写 \`command = "cmd"\` 加 \`args = ["/c", "npx", ...]\`，并带 \`SystemRoot\`。这是**原生 Windows**。不要把这块抄进 WSL，也不要和内部 \`codex_app\` 的 invalid transport 混在一起。现行超时键仍写 \`startup_timeout_sec = 20\`。

默认会向 Google 打用量统计；不想要就加 \`--no-usage-statistics\`。连着已登录的日常 Chrome 配置文件等于把页面内容交给模型，敏感会话用 \`--isolated\` 或单独的用户数据目录。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Chrome", "stdio"],
    related: ["mcp-add-and-login", "playwright-mcp", "mcp-stdio-display-env"],
    sources: [
      {
        label: "Chrome · DevTools for agents",
        url: "https://developer.chrome.com/docs/devtools/agents/get-started",
      },
      {
        label: "ChromeDevTools/chrome-devtools-mcp",
        url: "https://github.com/ChromeDevTools/chrome-devtools-mcp",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "playwright-mcp",
    no: 264,
    title: "Playwright MCP 用官方 @playwright/mcp stdio，不要抄 Claude JSON",
    summary:
      "CLI：codex mcp add playwright -- npx -y @playwright/mcp@latest。包名是 @playwright/mcp，不是 executeautomation 那套。沙箱加 --headless --isolated。关掉 browser_run_code_unsafe。缺浏览器先 npx playwright install chromium。",
    body: `官方给 Codex 的安装是 **stdio** 包。CLI 要把命令写在 \`--\` 后面，否则 \`npx\` 会被当成 add 的参数：

\`\`\`bash
codex mcp add playwright -- npx -y @playwright/mcp@latest
\`\`\`

Playwright 文档里那行省略了 \`--\`。\`codex mcp get playwright --json\` 应看到 \`transport.type\` 是 stdio、命令是 \`npx\`、参数里是 \`@playwright/mcp@latest\`。需要 Node.js 20+。只 add 成功不会自动开浏览器；第一次调用需要浏览器的工具时才会拉起。

不要做这些：

- 不要把 Claude / Cursor 的 \`mcpServers\` JSON 贴进 Codex。Codex 写 \`~/.codex/config.toml\`。
- 不要抄 \`@executeautomation/playwright-mcp-server\` 或其它第三方 Playwright MCP 包名。官方包是 \`@playwright/mcp\`。
- 不要和 Chrome DevTools MCP、内置 Computer Use / Browser 混成一套。这台管跨浏览器 E2E 和 accessibility snapshot。
- 不要给它 \`required = true\` 挂在全局。用完会留下无头浏览器，见残留进程那条。
- 不要给这台 stdio 再写 \`--port\` 当远程。Codex 远程只要 Streamable HTTP；已经在跑的服务才用 \`url = "http://127.0.0.1:8931/mcp"\`，不要抄 \`/sse\`。
- 不要把 \`--extension\` 当成默认路径。那要先装 Playwright 浏览器扩展，而且只连已打开的 Edge / Chrome。

冷启动 \`npx\` 常超过默认 10 秒，把 \`startup_timeout_sec\` 提到 20。旧文里的 \`startup_timeout_ms\` 只是毫秒别名。沙箱或无显示环境把 \`--headless\`、\`--isolated\` 写进 \`args\`；默认可视窗口在 Codex 沙箱里打不开。并发客户端不要共用同一份持久 profile。

报 \`"chrome" executable not found\` 时，先在同一环境跑 \`npx playwright install chromium\`，不要默认假设系统已经装了 Chrome。这不是「桌面忽略已配置 MCP」的已确认修法。有人用 \`PLAYWRIGHT_BROWSERS_PATH\` 把浏览器缓存钉死；stdio 的 \`env\` 是字面量，要从 Codex 进程转发才写 \`env_vars\`。

官方工具表里有高风险的 \`browser_run_code_unsafe\`：在 Playwright 服务进程里跑任意脚本，等价于远程代码执行。默认关掉：

\`\`\`toml
[mcp_servers.playwright]
command = "npx"
args = ["-y", "@playwright/mcp@latest"]
startup_timeout_sec = 20
disabled_tools = ["browser_run_code_unsafe"]
enabled = true
\`\`\`

中文教程里的服务器级 \`approval_mode = "prompt"\` 不是 Codex 现行键。服务器用 \`default_tools_approval_mode\`；真要开这个工具，再给它单独写 \`[mcp_servers.playwright.tools.browser_run_code_unsafe]\` 的 \`approval_mode = "approve"\`。

Playwright 另有 \`playwright-cli\` + skills 路径，那是 shell 命令，不是这台 MCP。安装见 Playwright 浏览器技能那条。不要两套都 \`required = true\`。本机 Linux 明明有显示器，MCP 却只回 snapshot、窗口管理器里看不到 Chromium：stdio 默认不转发 \`DISPLAY\`，见那条。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Playwright", "stdio"],
    related: ["chrome-devtools-mcp", "playwright-cli-skill", "mcp-stdio-display-env"],
    sources: [
      {
        label: "Playwright · Other clients (Codex)",
        url: "https://playwright.dev/mcp/clients/other-clients",
      },
      {
        label: "microsoft/playwright-mcp",
        url: "https://github.com/microsoft/playwright-mcp",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "playwright-cli-skill",
    no: 265,
    title: "Playwright 浏览器技能用 $skill-installer，不要装进 .claude/skills",
    summary:
      "本机：$skill-installer playwright，或 /skills 里选 skill-installer。Playwright 自己的安装器必须 --skills=agents，默认会写进 .claude。不要手拷 ~/.codex/skills。桌面默认沙箱可能 listen EPERM。",
    body: `要让 Codex **用终端里的浏览器**，官方精选技能叫 \`playwright\`，不是 MCP 包。CLI / TUI：

\`\`\`text
$skill-installer playwright
\`\`\`

或 \`/skills\` → skill-installer → 列表里的 playwright。装完新开一轮，\`/skills\` 应能看见。需要 Node.js 20+ 和 \`npx\`。全局 \`npm install -g @playwright/cli@latest\` 可选；精选技能自带 wrapper，用 \`npx --package @playwright/cli playwright-cli\`。

不要做这些：

- 不要跑无参数的 \`playwright-cli install --skills\`。Playwright 文档写明默认等于 \`--skills=claude\`，技能会进 \`.claude/skills/playwright-cli\`，Codex 看不到。
- 仓库要用 Playwright 自己的安装器时，必须写成 \`playwright-cli install --skills=agents\`，才会进 \`.agents/skills/playwright-cli\`。要跟你走再加 \`-g\`，进 \`~/.agents/skills\`。没有 \`--skills=codex\` 这种旗标。
- 不要手拷到 \`~/.codex/skills\`。精选技能正文里有时还写 \`CODEX_HOME/skills\`，那是过期路径。现行个人目录是 \`~/.agents/skills\`，见技能安装器那条。
- 不要去开 \`js_repl\` 或 \`playwright-interactive\`。\`js_repl\` 已 removed，桌面还可能把 \`features.js_repl = false\` 写回 config.toml。
- 不要和 Playwright MCP 两套都 \`required = true\`。技能走 shell 命令和 snapshot；MCP 走工具表。挑一条主路径。

桌面默认沙箱里，这套技能拉浏览器常报 \`listen EPERM: operation not permitted\`：Playwright 要在本机 listen CDP 端口，沙箱不让。把缓存目录改到工作区只修文件权限，修不了 listen。这是开放问题，不要把关掉沙箱写成官方第一步。CLI 里按提示批准网络/沙箱升级，或改走无头 MCP。

显式点名技能，避免它空转几分钟试各种启动脚本：

\`\`\`text
$playwright
打开 https://example.com，snapshot，返回标题。
\`\`\`

浏览器二进制仍可能要 \`playwright-cli install-browser\` 或 \`npx playwright install chromium\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Skills", "Playwright", "$skill-installer"],
    related: ["skill-installer", "playwright-mcp", "skill-locations"],
    sources: [
      {
        label: "OpenAI · Agent Skills",
        url: "https://developers.openai.com/codex/skills",
      },
      {
        label: "openai/skills · playwright",
        url: "https://github.com/openai/skills/blob/main/skills/.curated/playwright/SKILL.md",
      },
      {
        label: "Playwright · Installation",
        url: "https://playwright.dev/agent-cli/installation",
      },
    ],
  },
  {
    id: "mcp-context7",
    no: 266,
    title: "Context7 MCP 跟 Learn 示例走 stdio，密钥不要写进 args",
    summary:
      "Learn 免费入门：codex mcp add context7 -- npx -y @upstash/context7-mcp。厂商页的 --api-key、startup_timeout_ms、字面量 http_headers 不要抄。Cloud 不读这份 config.toml。",
    body: `Learn 的 MCP 页用 Context7 当 **stdio** 示例。CLI 要把命令写在 \`--\` 后面：

\`\`\`bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
\`\`\`

免费额度不强制 API key。\`codex mcp get context7 --json\` 应看到传输是 stdio、命令是 \`npx\`、参数里是 \`@upstash/context7-mcp\`。冷 \`npx\` 把 \`startup_timeout_sec\` 提到 20。

要提高限额时，密钥从**启动 Codex 的进程**转发，不要写进 \`args\`（会进进程列表和 config）：

\`\`\`toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
env_vars = ["CONTEXT7_API_KEY"]
startup_timeout_sec = 20
enabled = true
\`\`\`

远程托管也可以，地址是 \`https://mcp.context7.com/mcp\`。用 \`bearer_token_env_var\`，不要把 token 写进 TOML：

\`\`\`toml
[mcp_servers.context7]
url = "https://mcp.context7.com/mcp"
bearer_token_env_var = "CONTEXT7_API_KEY"
enabled = true
\`\`\`

不要做这些：

- 不要抄厂商 Codex 页里的 \`args\` 带 \`--api-key\`，也不要把 \`startup_timeout_ms = 20_000\` 当主键。现行键是 \`startup_timeout_sec\`。
- 不要把 \`Authorization: Bearer …\` 或 \`CONTEXT7_API_KEY\` 字面量写进 \`http_headers\`。HTTP 走 \`bearer_token_env_var\`，自定义头走 \`env_http_headers\`。
- 不要贴 Claude / Cursor 的 \`mcpServers\` JSON。Codex 写 \`~/.codex/config.toml\`。
- 不要给这台 \`required = true\` 挂全局。文档检索不是每条会话都要的依赖。
- 不要给这台 stdio 再写 \`--port\` 当 HTTP。已经在跑的托管服务才用上面的 \`url\`。
- 不要把 Windows 的 \`npx.cmd\` + \`SystemRoot\` 抄进 WSL。原生 Windows 超时见启动超时那条。
- 不要写 \`args\` 里的 \`\${CONTEXT7_API_KEY}\`。TOML 占位符不会展开；stdio 靠服务器读环境，名字必须先出现在 \`env_vars\`。

\`npx ctx7 setup --codex\` 会改 \`config.toml\` **和** \`AGENTS.md\`。提交前自己审 diff，不要当成静默的官方唯一路径。插件备选是 \`codex plugin marketplace add upstash/context7\`，再 \`codex plugin add context7@context7-marketplace\`，然后**新开线程**。这不比 Learn 的 \`mcp add\` 更「官方」。

厂商文宣称 CLI / 桌面 / IDE / Cloud 共用 \`~/.codex/config.toml\`。本站已核对：网页 Work / Cloud **不读**这份文件。Cloud 要在网页环境的工具里单独加。改完新开会话。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Context7", "stdio", "env_vars"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "mcp-http-bearer-env"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "Context7 · Codex",
        url: "https://context7.com/docs/clients/codex",
      },
      {
        label: "upstash/context7",
        url: "https://github.com/upstash/context7",
      },
    ],
  },
  {
    id: "mcp-stdio-display-env",
    no: 267,
    title: "本机 GUI 的 stdio MCP 要转发 DISPLAY，键名是 env_vars",
    summary:
      "Codex 默认不把 DISPLAY 交给 stdio 子进程。Playwright 有本机显示器却只有 snapshot 时，把 DISPLAY、WAYLAND_DISPLAY、XAUTHORITY、XDG_RUNTIME_DIR 写进 env_vars。这修不了沙箱。评论里的 env_args 不是现行键。",
    body: `stdio MCP **不会**继承你整个图形会话。Linux 上 Playwright / Chrome DevTools 默认可视窗口时，子进程看不到 \`DISPLAY\`，就会只回 accessibility snapshot，窗口管理器里没有 Chromium。本机终端跑 \`npx playwright test --headed\` 能弹出窗口，不能证明 Codex 的 MCP 子进程也能看到显示器。

把图形会话变量按名字转发出去。键是 \`env_vars\`，不是评论里写的 \`env_args\`：

\`\`\`toml
[mcp_servers.playwright]
command = "npx"
args = ["-y", "@playwright/mcp@latest"]
env_vars = ["DISPLAY", "WAYLAND_DISPLAY", "XAUTHORITY", "XDG_RUNTIME_DIR"]
startup_timeout_sec = 20
enabled = true
\`\`\`

这只修「本机有显示器、stdio 子进程却看不到」这一条。**修不了沙箱**：默认沙箱里仍然打不开窗口，继续加 \`--headless --isolated\`，见 Playwright MCP 那条。也不要把它写成「桌面忽略已配置 MCP」的修法。

从**已经在图形会话里**的终端启动 Codex。Dock / 开始菜单打开的桌面常常没有 \`DISPLAY\`；\`env_vars\` 转发的是桌面自己的环境。Wayland 为主的机器 \`WAYLAND_DISPLAY\` 和 \`XDG_RUNTIME_DIR\` 更关键。改完彻底退出再开新进程。

\`codex doctor\` 会标出点了名却缺失的 \`env_vars\`。变量在你的终端里有、桌面里没有时，不要把显示套接字路径当字面量抄进 \`env\` 表——那会绑死到错误的会话。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "env_vars", "DISPLAY", "Playwright"],
    related: ["mcp-stdio-env-vars", "playwright-mcp", "chrome-devtools-mcp"],
    sources: [
      {
        label: "openai/codex#4643",
        url: "https://github.com/openai/codex/issues/4643",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-notion-remote",
    no: 268,
    title: "Notion MCP 用官方远程 URL 再 login，不要抄 rmcp 或 SSE",
    summary:
      "CLI：codex mcp add notion --url https://mcp.notion.com/mcp，再 mcp login notion。这是 OAuth，目前不能非交互授权。中文教程说 mcp add 不能加 URL、还要 experimental_use_rmcp_client，那是过时路径。",
    body: `Notion 官方给 Codex 的是**远程** Streamable HTTP，不是本地包。CLI 可以一次加完，不必先手改 TOML：

\`\`\`bash
codex mcp add notion --url https://mcp.notion.com/mcp
codex mcp login notion
\`\`\`

官方文档只示范了写 \`~/.codex/config.toml\` 再 login，效果一样：

\`\`\`toml
[mcp_servers.notion]
url = "https://mcp.notion.com/mcp"
enabled = true
\`\`\`

\`codex mcp login notion\` 会走浏览器 OAuth。Notion 写明目前**没有**非交互授权，不能靠 PAT / bearer 在 CI 里静默登录。网页 Work / Cloud **不读**这份本机配置。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http\`。Codex 远程用 \`--url\`，名字写在 \`add\` 后面。
- 不要抄 \`/sse\`。Codex 只要 Streamable HTTP；Notion 的 SSE 是给旧客户端的退路。
- 不要一上来套 \`npx mcp-remote\`。Codex 自己会连 HTTP。
- 不要开 \`experimental_use_rmcp_client\` / \`features.rmcp_client\` 当现行前置。那是早期 HTTP 客户端旗标，Figma 那条已经说过不要再抄。
- 不要信「\`codex mcp add\` 只能加本地 stdio」。Learn 和本机 \`codex mcp add --help\` 都有 \`--url\`。
- 不要贴 Claude / Cursor 的 \`mcpServers\` JSON，也不要装已经停更的 \`notion-mcp-server\` 开源包当默认。
- 不要给它 \`required = true\` 挂全局。文档库不是每条会话都要的依赖。
- 不要和 bearer 混用。显式 \`bearer_token_env_var\` 会盖掉已登录的 OAuth。

项目层 \`.codex/config.toml\` 可以给同事同一条 \`url\`，每人仍要自己 \`mcp login\`。桌面和 IDE 经常只读 \`~/.codex\`，见项目层 MCP 那条。改完新开会话，用 \`codex mcp get notion\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Notion", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-figma-remote", "mcp-http-not-sse"],
    sources: [
      {
        label: "Notion · Connect to Notion MCP",
        url: "https://developers.notion.com/guides/mcp/get-started-with-mcp",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-slack-remote",
    no: 269,
    title: "Slack MCP 用 --url 加预注册 client_id，不要抄 --transport http",
    summary:
      "官方远程是 https://mcp.slack.com/mcp。Codex 写法是 mcp add slack --url … --oauth-client-id。Slack 文档那行 --transport http 是 Claude 语法。不带 client_id 会 DCR 失败。这不是 Cloud 里的 @Codex。",
    body: `这是把 Slack **工作区**接到本机 Codex 的远程 MCP，不是 Cloud 频道里的 \`@Codex\`。官方地址是 Streamable HTTP：\`https://mcp.slack.com/mcp\`。Slack 不支持动态客户端登记（DCR），必须带你自己 Slack 应用的 client ID：

\`\`\`bash
codex mcp add slack --url https://mcp.slack.com/mcp --oauth-client-id my-slack-app
codex mcp login slack
\`\`\`

\`\`\`toml
[mcp_servers.slack]
url = "https://mcp.slack.com/mcp"
enabled = true

[mcp_servers.slack.oauth]
client_id = "my-slack-app"
\`\`\`

把 \`codex mcp add\` 打印的完整 OAuth callback URL 登到 Slack 应用。无端口的 \`127.0.0.1\` 规则见回调那几条。工作区管理员还要批准 MCP 集成；未上架的 Slack 应用不能用这套 MCP。

不要做这些：

- 不要抄 Slack 文档 Codex 节里的 \`codex mcp add --transport http slack https://mcp.slack.com/mcp\`。那是 Claude Code 的语序。Codex 是 \`add\` 名字 \`--url\` 地址。
- 不要把 \`[mcp_servers.slack]url = …auth = "oauth"\` 粘成一行。键要分行。\`auth = "oauth"\` 是 HTTP 默认，真正缺的是 \`oauth.client_id\`。
- 不要空表跑 \`codex mcp login slack\`。开放问题会立刻报 Dynamic client registration not supported。
- 不要去抄 Claude 插件清单里那串现成 \`clientId\`。那是 Claude Skills 插件的客户端，不是你的 Slack 应用。
- 不要和 Cloud \`@Codex\`、精选插件 \`slack@openai-curated\` 混成一套。
- 不要抄 \`/sse\`，也不要给它 \`required = true\` 挂全局。
- 不要把用户 token 当第一手段写进 \`bearer_token_env_var\`。官方路径是预注册 OAuth + \`mcp login\`。

改完新开会话。\`codex mcp list\` 应看到 slack；网页 Cloud 仍不读这份 \`config.toml\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Slack", "OAuth", "HTTP"],
    related: ["mcp-oauth-loopback-callback", "mcp-add-and-login", "slack-at-codex-env"],
    sources: [
      {
        label: "Slack · Connect to Codex",
        url: "https://docs.slack.dev/ai/slack-mcp-server/connect-to-harnesses",
      },
      {
        label: "openai/codex#13200",
        url: "https://github.com/openai/codex/issues/13200",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-sentry-remote",
    no: 270,
    title: "Sentry MCP 用官方远程 URL 再 login，不要抄 mcp-remote",
    summary:
      "CLI：codex mcp add sentry --url https://mcp.sentry.dev/mcp，再 mcp login sentry。能接到 org/project。托管端是 OAuth，不是 PAT。旧文的 npx mcp-remote 和 Claude 的 --transport http 不要抄。",
    body: `Learn 把 Sentry 列进推荐 MCP。官方托管地址是 Streamable HTTP，不是本地包：

\`\`\`bash
codex mcp add sentry --url https://mcp.sentry.dev/mcp
codex mcp login sentry
\`\`\`

能接到某个 org 或项目，工具表会变短，发现类工具会被藏掉。官方建议尽量接到项目：

\`\`\`toml
[mcp_servers.sentry]
url = "https://mcp.sentry.dev/mcp/my-org/my-project"
enabled = true
\`\`\`

\`codex mcp login sentry\` 走浏览器 OAuth。Sentry 写明**所有连接都用 OAuth**。这是会话里拉取 issue / 堆栈，不是值班告警，也不会在你没开会话时盯着错误飙升。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http\`。Codex 远程用 \`--url\`，名字写在 \`add\` 后面。
- 不要一上来套 \`npx -y mcp-remote@latest https://mcp.sentry.dev/mcp\`。现行 Codex 自己会连 HTTP。
- 不要给托管端写 \`bearer_token_env_var\`。日文对照文有时把它当成 Sentry 主路径，那是错的。
- 不要把官方文档里的 \`{organizationSlug}\` 花括号占位原样抄进 TOML。写成真实 slug，例如 \`my-org/my-project\`。
- 不要默认加 \`?experimental=1\`。那是前瞻工具，会多占上下文。
- 不要抄 \`/sse\`。也不要给它 \`required = true\` 挂全局。
- 不要把自托管 stdio 包 \`@sentry/mcp-server\` 和托管 URL 混成一台。自托管才走 \`command\` / \`args\`，密钥用 \`env_vars\` 转发，不要把 access token 写进 \`args\`。TOML 里的美元括号不会展开。

错误正文是攻击者可写的输入。从 Sentry 拉来的内容修 bug 时，保持工具批准，不要一上来 \`--yolo\`。网页 Cloud 不读这份 \`config.toml\`。改完新开会话，用 \`codex mcp get sentry\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Sentry", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "mcp-notion-remote"],
    sources: [
      {
        label: "Sentry · MCP Server",
        url: "https://docs.sentry.io/product/sentry-mcp/",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "Use Carly · Codex to Sentry",
        url: "https://www.usecarly.com/blog/codex-sentry-integration/",
      },
    ],
  },
  {
    id: "mcp-atlassian-remote",
    no: 271,
    title: "Atlassian MCP 用现行 v2/mcp，不要抄 SSE 或 Slack 那种预注册 client_id",
    summary:
      "2026-09 入门页地址是 https://mcp.atlassian.com/v2/mcp。CLI：mcp add atlassian --url 再 mcp login。桌面走插件 Atlassian Rovo。不要抄已停的 /sse，也不要把 authv2 当唯一入口。Atlassian 要 DCR，和 Slack 相反。",
    body: `Atlassian Rovo MCP 接 Jira / Confluence 等云产品。2026-09-02 的入门页把客户端指到：

\`\`\`bash
codex mcp add atlassian --url https://mcp.atlassian.com/v2/mcp
codex mcp login atlassian
\`\`\`

网关如果要一次性完整工具表，而不是动态发现，官方另给 \`https://mcp.atlassian.com/v2/mcp?tools=all\`。桌面应用走 Plugins / Connectors 里的 **Atlassian Rovo**，不必和 CLI 抢同一条手写 TOML。

\`codex mcp login atlassian\` 走 OAuth 2.1。Codex 默认会做动态客户端登记（DCR），这正是 Atlassian 远程 MCP 要的。不要抄 Slack 那套预注册 \`oauth.client_id\`：社区里用开发者控制台静态 3LO 应用能握手、列工具，一调真实工具却失败。

不要做这些：

- 不要抄 \`https://mcp.atlassian.com/v1/sse\`。那是旧 SSE，教程写明 2026-06 起不要新建。
- 不要把 \`https://mcp.atlassian.com/v1/mcp/authv2\` 写成「现在唯一的官方地址」。那是 2026-05 切 DCR 授权服务器时的过渡 URL。现行入门页是 \`v2/mcp\`。
- 不要信「\`codex mcp add\` 还没有 \`--url\`」。Learn 和本机 \`--help\` 都有；mcp.directory 那篇还停在 issue 未合入。
- 不要把 OAuth access token 字面量写进 \`http_headers\`。交互登录用 \`mcp login\`。
- 不要把管理员才开的 API token 当成默认。那是无头 / CI 备选，HTTP 才用 \`bearer_token_env_var\`，而且不是 Basic 邮箱拼接那种抄法的第一选择。
- 不要给它 \`required = true\` 挂全局，也不要抄 Claude 的 \`mcpServers\` JSON。
- 不要把 Claude Code 的 \`network.allowedDomains\` 抄进 Codex config。附件 / 白板要额外域名时，按本机沙箱和网络策略放行，不是那条键。

改完新开会话。网页 Cloud 不读 \`~/.codex/config.toml\`。用 \`codex mcp get atlassian\` 核对传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Atlassian", "Jira", "OAuth"],
    related: ["mcp-add-and-login", "mcp-slack-remote", "mcp-http-not-sse"],
    sources: [
      {
        label: "Atlassian · Getting started",
        url: "https://developer.atlassian.com/cloud/rovo-mcp/guides/getting-started/",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-stripe-remote",
    no: 272,
    title: "Stripe MCP 用 mcp.stripe.com 再 login，不要抄本地 --api-key",
    summary:
      "CLI：codex mcp add stripe --url https://mcp.stripe.com，再 mcp login stripe。官方页只示范 TOML。受限密钥走 bearer_token_env_var。不要和 OAuth 混用，也不要把 sk_live 写进 TOML。",
    body: `Stripe 官方给 Codex CLI 的是**远程** Streamable HTTP，地址是 \`https://mcp.stripe.com\`，**没有** \`/mcp\` 后缀。官方页只示范了写 \`~/.codex/config.toml\`，CLI 也可以一次加完：

\`\`\`bash
codex mcp add stripe --url https://mcp.stripe.com
codex mcp login stripe
\`\`\`

\`\`\`toml
[mcp_servers.stripe]
url = "https://mcp.stripe.com"
enabled = true
\`\`\`

首选 OAuth。\`codex mcp login stripe\` 会开 Stripe 授权页；之后可在 Dashboard 的 OAuth sessions 里撤销。公司网络拦了外部 MCP 时，让 IT 放行 \`mcp.stripe.com\`。

受限 API key 是备选，不要和已经 login 的 OAuth 写在同一张表：

\`\`\`toml
[mcp_servers.stripe]
url = "https://mcp.stripe.com"
bearer_token_env_var = "STRIPE_API_KEY"
enabled = true
\`\`\`

键里填的是变量**名**。变量必须在**启动 Codex 的那个进程**里，桌面从 Dock 开不会读你刚 \`export\` 的终端。不要把 \`sk_live\` / \`rk_live\` 字面量写进 TOML 或 \`http_headers\`。

Connect 平台要代 connected account 做事时，官方写明 MCP **不能**用 OAuth 代表那个账号。改用平台受限密钥，再用 \`Stripe-Account\` 头。Codex 自定义头走 \`env_http_headers\`，右边仍是变量名：

\`\`\`toml
[mcp_servers.stripe]
url = "https://mcp.stripe.com"
bearer_token_env_var = "STRIPE_API_KEY"
enabled = true

[mcp_servers.stripe.env_http_headers]
Stripe-Account = "STRIPE_ACCOUNT"
\`\`\`

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http\`，也不要抄它的 \`--header Authorization: Bearer\`。
- 不要把本地 \`npx -y @stripe/mcp --api-key\` 当成 Codex 默认。那是另一台 stdio 服务器；密钥不要写进 \`args\`。
- 不要把 \`stripe agent setup\` / ChatGPT 里的 Stripe 插件写成「必须先装才能用这条 MCP」。那是厂商插件路径，会顺带装 skills；本条主路径就是远程 URL。
- 不要给它 \`required = true\` 挂全局。支付写入不是每条会话都要的依赖。
- 不要抄 \`/sse\`，也不要给 stdio 写 \`--port\`。
- 写类工具（退款、出金）Stripe 会要求人点确认链接；批准后还要让模型重试那一次。错误正文和确认页都可能带提示注入，保持工具批准，不要一上来 \`--yolo\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话，用 \`codex mcp get stripe\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Stripe", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "mcp-vercel-remote"],
    sources: [
      {
        label: "Stripe · MCP",
        url: "https://docs.stripe.com/mcp",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-openai-docs",
    no: 273,
    title: "OpenAI Docs MCP 用 openaiDeveloperDocs，不要当成桌面 WebMCP",
    summary:
      "CLI：codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp。覆盖 developers、platform、learn。这是只读文档检索，不会代你调 API。桌面浏览器里的 search_openai_docs 是另一套 WebMCP。",
    body: `OpenAI 给开发者文档单独托管了一台公共 MCP，覆盖 \`developers.openai.com\`、\`platform.openai.com\`、\`learn.chatgpt.com\`。官方服务器名就是驼峰 \`openaiDeveloperDocs\`，不要改成带连字符的名字：

\`\`\`bash
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
codex mcp list
\`\`\`

\`\`\`toml
[mcp_servers.openaiDeveloperDocs]
url = "https://developers.openai.com/mcp"
enabled = true
\`\`\`

这是只读文档检索，**不会**用你的账号去调 OpenAI API。官方没要求 \`mcp login\`；也不要给它套 \`auth = "chatgpt"\`——那条只给受信任的 ChatGPT 同源服务器。

想让它在没被点名时也去查文档，可在 \`AGENTS.md\` 加一句官方建议的话，例如「涉及 OpenAI API、插件、ChatGPT、Codex 时，先用 OpenAI developer documentation MCP」。这是可选提醒，不是静默唯一路径。没写这句时，提示里要点名这台服务器。

这**不是**桌面内置浏览器里文档页的 Site tools。那边的 \`search_openai_docs\` / \`lookup_page\` 跟当前页面走，关标签就没了，也不写进 \`config.toml\`。两套都不要 \`required = true\`。

技能 \`agents/openai.yaml\` 里声明 MCP 依赖时，\`value\` 也用这个官方名，见技能依赖那条。也可以再配 OpenAI Docs Skill，让模型先走这台 MCP，再回落官方域名。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http openaiDeveloperDocs …\`。Codex 远程用 \`--url\`，名字写在 \`add\` 后面。
- 不要把它和桌面 WebMCP 配成一台，也不要指望 iframe 里的站点工具出现在 \`codex mcp list\`。
- 不要给它 \`required = true\` 挂全局。查文档不是每条会话的硬依赖。
- 不要把工具名写成双下划线那种内部拼接。在会话里点名服务器名 \`openaiDeveloperDocs\` 即可。
- 不要抄 Cursor / VS Code 的 \`mcpServers\` JSON 进 Codex TOML。

网页 Cloud 不读这份 \`config.toml\`。改完新开会话。用 \`codex mcp get openaiDeveloperDocs\` 核对传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "文档", "HTTP", "AGENTS.md"],
    related: ["mcp-add-and-login", "webmcp-site-tools-not-mcp", "mcp-http-not-sse"],
    sources: [
      {
        label: "OpenAI · Docs MCP",
        url: "https://developers.openai.com/learn/docs-mcp",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "cloudflare-skills-plugin",
    no: 274,
    title: "Cloudflare 官方插件用 marketplace 装，不要 npx skills add",
    summary:
      "marketplace add cloudflare/skills，再 plugin add cloudflare@cloudflare。这会装 Skills 并登记主 MCP。不要用 npx skills add，也不要手拷到 ~/.codex/skills。",
    body: `Cloudflare 官方 Codex 页的主路径是装插件：Skills 教 Workers / Wrangler，插件同时登记主 MCP。仓库 README 给的 Codex 命令是：

\`\`\`bash
codex plugin marketplace add cloudflare/skills
codex plugin add cloudflare@cloudflare
codex plugin list
codex mcp list
\`\`\`

marketplace 名是 \`cloudflare\`，插件 id 是 \`cloudflare@cloudflare\`。TUI 里 \`/plugins\` 搜 Cloudflare，桌面走 Plugins 装 Cloudflare，效果一样。清单写明安装时会要授权（\`authentication: ON_INSTALL\`）。

0.154 起先在当前会话核对 \`/plugins\` 和 \`/mcp\`。README 仍写「装完新开会话」：当前会话看不到 \`cloudflare@cloudflare\` 或 \`cloudflare\` MCP 时再新开。IDE 扩展没有 \`/plugins\`。

插件自带的斜杠命令是 \`/cloudflare:build-agent\`（Agents SDK 脚手架）和 \`/cloudflare:build-mcp\`（远程 MCP 脚手架）。这是插件技能，不是 Codex 内置。

不要做这些：

- 不要用 \`npx skills add https://github.com/cloudflare/skills\` 当 Codex 插件安装器。那只会拷 SKILL.md，不会登记 MCP。
- 不要手拷技能目录到 \`~/.codex/skills\`。那条 Clone/Copy 表给的是纯技能回退，插件路径才会带 MCP。
- 不要抄 Claude 的 \`/plugin marketplace add\` / \`/plugin install\`。Codex 是 \`codex plugin marketplace add\` 和 \`plugin add\`。
- 不要把 Google 那套 \`--sparse\` 抄过来。Cloudflare README 没有这条；Google 仓才需要稀疏检出。
- 不要把厂商的 Code Mode 说成 Codex 配置键 \`features.code_mode\`。那是 Cloudflare 这台 API MCP 自己的搜-执行模式，见 MCP 那条。

网页 Cloud 不读本机 marketplace。改完用 \`codex plugin list\` 看到 \`cloudflare@cloudflare\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Cloudflare", "MCP", "Skills"],
    related: ["google-cloud-developer-plugin", "plugin-session-refresh", "mcp-cloudflare-remote"],
    sources: [
      {
        label: "Cloudflare · Codex agent setup",
        url: "https://developers.cloudflare.com/agent-setup/codex/",
      },
      {
        label: "cloudflare/skills",
        url: "https://github.com/cloudflare/skills",
      },
    ],
  },
  {
    id: "mcp-cloudflare-remote",
    no: 275,
    title: "Cloudflare MCP 用 mcp.cloudflare.com/mcp，不要把 Code Mode 写成 Codex 配置",
    summary:
      "CLI：codex mcp add cloudflare --url https://mcp.cloudflare.com/mcp，再 mcp login cloudflare。这是 Cloudflare 自己的 Code Mode MCP，不是 features.code_mode。文档服务器是另一台。",
    body: `官方 Codex 排错页把连不上的 Cloudflare MCP 指到这条远程 Streamable HTTP：

\`\`\`bash
codex mcp add cloudflare --url https://mcp.cloudflare.com/mcp
codex mcp login cloudflare
codex mcp list
\`\`\`

\`\`\`toml
[mcp_servers.cloudflare]
url = "https://mcp.cloudflare.com/mcp"
enabled = true
\`\`\`

已经用 \`cloudflare@cloudflare\` 插件装过时，\`codex mcp list\` 里可能已经有 \`cloudflare\`，不必再手加一台同名服务器。插件没登记成功时，才走上面的 \`mcp add\`。

这台服务器覆盖整份 Cloudflare API（两千多个端点），但暴露给模型的是 \`search\` / \`execute\` 两个工具：模型写一小段 JavaScript，在隔离 Worker 里执行。Cloudflare 把这套叫 **Code Mode**。它**不是** Codex 的 \`features.code_mode\`，不要把这个词写进 \`config.toml\`。

文档过时就另加文档服务器，不要把所有产品 MCP 一次 \`required = true\`：

\`\`\`bash
codex mcp add cloudflare-docs --url https://docs.mcp.cloudflare.com/mcp
\`\`\`

无头 / CI 才用 Cloudflare API token。Codex 走 \`bearer_token_env_var\`，键是变量名，不要把 token 写进 \`http_headers\`，也不要和已经 login 的 OAuth 混用。

不要做这些：

- 不要抄 Cursor / Claude 的 \`mcpServers\` JSON，也不要抄 \`--transport http\`。
- 不要把历史 \`/sse\` 配成 SSE 传输。Cloudflare 写明 \`/sse\` 只是同一套 Streamable HTTP 的别名；Codex 用 \`/mcp\`。
- 不要把 Bindings / Builds / Observability / Radar 十几台一次性挂全局。插件默认只带主 \`cloudflare\`。
- 不要给它 \`required = true\` 挂全局。账号写入不是每条会话的硬依赖。
- 认证失败就 \`codex mcp logout cloudflare\` 再 \`mcp login\`，或按官方排错先 remove 再 add。不要用 \`mcp-remote\` 包一层。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get cloudflare\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Cloudflare", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "cloudflare-skills-plugin", "mcp-http-bearer-env"],
    sources: [
      {
        label: "Cloudflare · Codex agent setup",
        url: "https://developers.cloudflare.com/agent-setup/codex/",
      },
      {
        label: "Cloudflare · MCP servers",
        url: "https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-huggingface-remote",
    no: 276,
    title: "Hugging Face MCP 用 huggingface.co/mcp，不要把 token 写进 http_headers",
    summary:
      "CLI：codex mcp add huggingface --url https://huggingface.co/mcp，再 mcp login。受限路径走 bearer_token_env_var = HF_TOKEN。不要抄 Claude 的 -t http，也不要把 hf_ 写进 TOML。这不是 Inference Providers 那条 model_providers。",
    body: `Hugging Face 托管的是远程 Streamable HTTP。公开 Server Card 给的规范地址是 \`https://huggingface.co/mcp\`，不带登录查询参数：

\`\`\`bash
codex mcp add huggingface --url https://huggingface.co/mcp
codex mcp login huggingface
\`\`\`

\`\`\`toml
[mcp_servers.huggingface]
url = "https://huggingface.co/mcp"
enabled = true
\`\`\`

OAuth 走 \`mcp login huggingface\`。Claude / Gemini 文档用 \`https://huggingface.co/mcp?login\` 打开登录页；Codex 先加规范 URL 再 login。login 起不来时，才把 \`?login\` 写进 url，不要把 token 塞进查询串。

无头备选是进程环境里的 \`HF_TOKEN\`：

\`\`\`toml
[mcp_servers.huggingface]
url = "https://huggingface.co/mcp"
bearer_token_env_var = "HF_TOKEN"
enabled = true
\`\`\`

键是变量**名**。不要和已经 login 的 OAuth 写在同一张表。Cursor / VS Code 那份 JSON 把 Bearer 写进 \`headers\`，抄进 Codex 的 \`http_headers\` 会把密钥提交进 config。

连上之后去 \`https://huggingface.co/settings/mcp\` 勾工具和 Gradio Spaces。改完要新开会话，\`tools/list\` 才会变。Hub 浏览多用内置 \`hf_fs\`。这**不是** \`[model_providers.huggingface]\` 那条 Inference Providers 路由；MCP 查 Hub，模型供应商改的是你用哪颗模型。

不要做这些：

- 不要抄 \`claude mcp add hf-mcp-server -t http\`。Codex 远程用 \`--url\`，名字写在 \`add\` 后面。
- 不要把 \`hf_\` 字面量写进 TOML、URL 或 \`http_headers\`。
- 不要把本地 \`npx @llmindset/hf-mcp-server\` / Docker stdio 当成 Codex 默认。那是自托管。
- 不要给它 \`required = true\` 挂全局。
- 不要抄 \`mcpServers\` JSON，也不要套 \`mcp-remote\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex mcp get huggingface\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Hugging Face", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "hf-inference-providers"],
    sources: [
      {
        label: "Hugging Face · MCP Server",
        url: "https://huggingface.co/docs/hub/en/agents-mcp",
      },
      {
        label: "huggingface/hf-mcp-server",
        url: "https://github.com/huggingface/hf-mcp-server",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-amplitude-remote",
    no: 277,
    title: "Amplitude MCP 用官方 --url 再 OAuth，EU 换 mcp.eu 覆盖同名表",
    summary:
      "官方 Codex 页：codex mcp add amplitude --url https://mcp.amplitude.com/mcp，然后走 OAuth。EU 用 mcp.eu.amplitude.com/mcp 再 add 一次覆盖。这不是埋点摄入，也不是只读文档 MCP。",
    body: `Amplitude 给 Codex CLI 单独写了一页。美国区：

\`\`\`bash
codex mcp add amplitude --url https://mcp.amplitude.com/mcp
\`\`\`

EU 数据驻留用 \`https://mcp.eu.amplitude.com/mcp\`。\`add\` 之后按提示做 Amplitude OAuth；也可以再跑 \`codex mcp login amplitude\`。

\`\`\`toml
[mcp_servers.amplitude]
url = "https://mcp.amplitude.com/mcp"
enabled = true
\`\`\`

从美国切到 EU：用 EU 地址再 \`mcp add\` 一次会覆盖同名表，然后重新授权。权限跟你登录的 Amplitude 账号走，MCP 不会多给你权限。

这台服务器能读也能改图表、实验、队列和跟踪计划，**不是**生产埋点入口。\`manage_amp_events\` 改的是跟踪计划定义，不会把事件流打进 Amplitude。公开文档另有只读 Docs MCP，不要和这台分析 MCP 配成一台。写跟踪计划需要账号上的 Use MCP (write) 权限。

不要做这些：

- 不要抄 Claude / Cursor 的 \`mcpServers\` JSON 和 \`transport: streamable-http\`。Codex 远程用 \`--url\`。
- 不要抄 Amplitude 插件仓那行 \`/plugin marketplace add amplitude/mcp-marketplace\`。那是 Claude 语法；Codex CLI 官方页只有 \`mcp add\`。
- 不要把 \`?discovery=progressive\` 当成必加。那是缩工具表的可选项；主路径仍是 \`/mcp\`。
- 不要给它 \`required = true\` 挂全局。也不要和 bearer 混用——官方路径是 OAuth。
- 不要抄 Linear 旧文的 \`rmcp_client\`。现行 Codex 自己连 HTTP。

网页 Cloud 不读这份 \`config.toml\`。改完新开会话。用 \`codex mcp get amplitude\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Amplitude", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-huggingface-remote", "mcp-http-not-sse"],
    sources: [
      {
        label: "Amplitude · Codex CLI",
        url: "https://amplitude.com/docs/amplitude-ai/amplitude-mcp/codex-cli",
      },
      {
        label: "Amplitude · MCP Server",
        url: "https://amplitude.com/docs/amplitude-ai/amplitude-mcp",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-datadog-remote",
    no: 278,
    title: "Datadog MCP 用区域 mcp. 地址再 login，工具集写 X-Datadog-MCP-Toolsets",
    summary:
      "US1：codex mcp add datadog --url https://mcp.datadoghq.com/api/unstable/mcp-server/mcp，再 mcp login。Codex 用 http_headers 里的 X-Datadog-MCP-Toolsets，不要把 ?toolsets= 拼进 URL。这颗头是工具集名单，不是密钥。",
    body: `Datadog 托管的是远程 Streamable HTTP。地址按你登录 Datadog 的站点来，US1 是：

\`\`\`bash
codex mcp add datadog --url https://mcp.datadoghq.com/api/unstable/mcp-server/mcp
codex mcp login datadog
\`\`\`

官方 Codex 页只示范了手写 \`~/.codex/config.toml\`，效果一样。路径里的 \`/api/unstable/\` 是现行入口，不要擅自改成 \`/mcp\` 或 \`/sse\`。

\`\`\`toml
[mcp_servers.datadog]
url = "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp"
http_headers = { "X-Datadog-MCP-Toolsets" = "apm,llmobs" }
enabled = true
\`\`\`

\`X-Datadog-MCP-Toolsets\` 是工具集名单，例如 \`apm,llmobs\` 或 \`all\`（一般可用的全套）。这不是密钥，写进 \`http_headers\` 合法。其它客户端把 \`?toolsets=\` 拼进 URL；**Codex 要用这颗头**，不要把查询参数抄进 \`url\`。

其它站点把主机换成对应的 \`mcp.\` 前缀，再 \`mcp login\`：

- US3：\`https://mcp.us3.datadoghq.com/api/unstable/mcp-server/mcp\`
- US5：\`https://mcp.us5.datadoghq.com/api/unstable/mcp-server/mcp\`
- EU1：\`https://mcp.datadoghq.eu/api/unstable/mcp-server/mcp\`
- AP1：\`https://mcp.ap1.datadoghq.com/api/unstable/mcp-server/mcp\`
- AP2：\`https://mcp.ap2.datadoghq.com/api/unstable/mcp-server/mcp\`
- UK1：\`https://mcp.uk1.datadoghq.com/api/unstable/mcp-server/mcp\`

GovCloud（\`app.ddog-gov.com\` / \`us2.ddog-gov.com\`）没有这台 MCP。站点选错，OAuth 会空转。以 Datadog 文档右侧的 Site 选择器为准。

连上之后，账号还要有 Datadog 的 MCP 读权限。传输正常但工具没数据，先查角色，不要重装。

不要做这些：

- 不要抄 Claude 的 \`--transport http\`，也不要抄 \`/plugin install datadog@claude-plugins-official\`。Codex 远程用 \`--url\`。
- 不要把 \`DD_API_KEY\` / Application Key 写进 \`http_headers\`。Codex 这条主路径是 OAuth。密钥类自定义头走 \`env_http_headers\`。
- 不要给它 \`required = true\` 挂全局。
- 不要把桌面 ChatGPT 应用里的 Datadog Codex Plugin（Preview，目前只写 US1）当成 CLI 配置。那是另一条安装器。
- 不要抄 \`mcpServers\` JSON，也不要套 \`mcp-remote\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get datadog\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Datadog", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-env-headers", "mcp-amplitude-remote"],
    sources: [
      {
        label: "Datadog · Set Up the MCP Server",
        url: "https://docs.datadoghq.com/mcp_server/setup/",
      },
      {
        label: "Datadog · Agent Observability MCP",
        url: "https://docs.datadoghq.com/llm_observability/build_with_ai/mcp_server/",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-grafana-stdio",
    no: 280,
    title: "Grafana OSS MCP 用 uvx mcp-grafana，token 走 env_vars 不要写进 env",
    summary:
      "CLI：codex mcp add grafana -- uvx mcp-grafana。GRAFANA_URL 可以写进 env 表；GRAFANA_SERVICE_ACCOUNT_TOKEN 用 env_vars 转发。厂商 Codex 页的 startup_timeout_ms 和把 token 写进 env 不要抄。",
    body: `开源 \`mcp-grafana\` 是 **stdio**，本机跑、连你的 Grafana（自托管或 Grafana Cloud 实例 URL 都行）。官方 Codex 页假设二进制已在 PATH；没有的话用 \`uvx\`：

\`\`\`bash
codex mcp add grafana -- uvx mcp-grafana
\`\`\`

\`\`\`toml
[mcp_servers.grafana]
command = "uvx"
args = ["mcp-grafana"]
env_vars = ["GRAFANA_SERVICE_ACCOUNT_TOKEN"]
startup_timeout_sec = 60
enabled = true

[mcp_servers.grafana.env]
GRAFANA_URL = "http://localhost:3000"
\`\`\`

连 Grafana Cloud 实例时，把 \`GRAFANA_URL\` 换成 \`https://myinstance.grafana.net\`。这仍是本机 stdio + 服务账号，**不是**托管的 \`mcp.grafana.com\`。

\`env\` 表是字面量。厂商 Codex 页把 \`GRAFANA_SERVICE_ACCOUNT_TOKEN\` 写进 \`env\`，等于把密钥提交进 config。\`codex mcp add --env GRAFANA_SERVICE_ACCOUNT_TOKEN=...\` 同样会落成字面量。密钥用 \`env_vars\` 从启动 Codex 的进程转发。过期的 \`GRAFANA_API_KEY\` 不要再用。

只读会话加 \`--disable-write\`（会拿掉写入工具，也默认拿掉会改数据的原始 SQL 查询工具）：

\`\`\`toml
[mcp_servers.grafana]
command = "uvx"
args = ["mcp-grafana", "--disable-write"]
env_vars = ["GRAFANA_SERVICE_ACCOUNT_TOKEN"]
enabled = true

[mcp_servers.grafana.env]
GRAFANA_URL = "http://localhost:3000"
\`\`\`

不要做这些：

- 不要抄 \`startup_timeout_ms\` / \`tool_timeout_ms\`。现行键是 \`startup_timeout_sec\` 和 \`tool_timeout_sec\`。
- 不要把 token 写进 \`args\`，也不要抄 \`mcpServers\` JSON。
- 不要给它 \`required = true\` 挂全局。冷 \`uvx\` 超时会让 Codex 起不来。
- 不要把用户名密码当成推荐路径。服务账号 token 才是现行鉴权。
- 不要和托管 Cloud MCP 写成同一张表：有 \`command\` 就不能再写 \`url\`。

网页 Cloud 不读这份 \`config.toml\`。改完新开会话。用 \`codex mcp get grafana\` 核对 command 是 \`uvx\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Grafana", "stdio", "env_vars"],
    related: ["mcp-stdio-env-vars", "mcp-startup-timeout-sec", "mcp-grafana-cloud"],
    sources: [
      {
        label: "Grafana · Codex CLI",
        url: "https://grafana.com/docs/grafana/latest/developer-resources/mcp/clients/codex/",
      },
      {
        label: "grafana/mcp-grafana",
        url: "https://github.com/grafana/mcp-grafana",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-grafana-cloud",
    no: 281,
    title: "Grafana Cloud MCP 用 mcp.grafana.com/mcp，login 失败先补 Accept 头",
    summary:
      "托管地址是 https://mcp.grafana.com/mcp，OAuth。Codex 官方页没有这一条。login 若被 302 到文档，在 http_headers 写 Accept 和 X-Grafana-URL。这不是本机 mcp-grafana。",
    body: `Grafana Cloud **托管**的是远程 Streamable HTTP，只要 Grafana Cloud，不要自托管。权限跟你登录的 Grafana 用户走，还要有 Assistant Cloud MCP User（或 \`grafana-assistant-app.cloud-mcp:access\`）。官方客户端列表没有 Codex 专页，按「其它 MCP 客户端」写 TOML：

\`\`\`bash
codex mcp add grafana_cloud --url https://mcp.grafana.com/mcp
codex mcp login grafana_cloud
\`\`\`

名字用下划线。已经占用了 \`grafana\` 给本机 stdio 时，不要覆盖那张表。

\`X-Grafana-URL\` 是栈地址，不是密钥，能跳过授权页上的 URL 输入。\`codex mcp login\` 的探测请求默认不带 MCP 的 \`Accept\` 头时，Grafana 会 302 到文档站，Codex 会拒绝跨源跳转（开放问题 openai/codex#37830）。login 报 OAuth discovery redirect 时，把这两颗头写进 \`http_headers\`：

\`\`\`toml
[mcp_servers.grafana_cloud]
url = "https://mcp.grafana.com/mcp"
http_headers = { "X-Grafana-URL" = "https://myinstance.grafana.net", "Accept" = "application/json, text/event-stream" }
enabled = true
\`\`\`

然后再 \`codex mcp login grafana_cloud\`。不要把服务账号 token 写进这张 HTTP 表。

授权页可以只勾 Read。Query 仍会跑原始 SQL；Write 会改 dashboard / incident。这台会计入 Grafana Assistant 用量。

不要做这些：

- 不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor JSON。
- 不要抄 \`/sse\`，也不要套 \`mcp-remote\`。
- 不要给自托管 Grafana 配这个 URL。自托管走 \`uvx mcp-grafana\`。
- 不要给它 \`required = true\` 挂全局。
- 不要把 \`X-Grafana-URL\` 写成带尖括号的占位符。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get grafana_cloud\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Grafana", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-env-headers", "mcp-grafana-stdio"],
    sources: [
      {
        label: "Grafana Cloud · MCP server",
        url: "https://grafana.com/docs/grafana-cloud/ai-tools/mcp-servers/cloud-mcp/",
      },
      {
        label: "openai/codex#37830",
        url: "https://github.com/openai/codex/issues/37830",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-vercel-remote",
    no: 282,
    title: "Vercel MCP 用 mcp.vercel.com，不要加 /mcp 后缀",
    summary:
      "CLI：codex mcp add vercel --url https://mcp.vercel.com，再 mcp login vercel。官方远程没有 /mcp 后缀。不要把 npx add-mcp 或 vercel mcp 当 Codex 主路径。",
    body: `Vercel 官方给 Codex CLI 的是**远程** Streamable HTTP，地址是 \`https://mcp.vercel.com\`，**没有** \`/mcp\` 后缀（和 Stripe 一样）。官方 Codex 节：

\`\`\`bash
codex mcp add vercel --url https://mcp.vercel.com
codex mcp login vercel
\`\`\`

\`add\` 时会探测 OAuth 并开浏览器；没弹出再跑 \`codex mcp login vercel\`。手写 TOML 效果一样：

\`\`\`toml
[mcp_servers.vercel]
url = "https://mcp.vercel.com"
enabled = true
\`\`\`

连上之后权限跟你的 Vercel 账号走。公开工具（搜文档）可以不登录；管项目、部署、日志、Web Analytics 要 OAuth。保持工具批准，不要一上来 \`--yolo\`。

要限定到某个项目时，把 URL 写成 \`https://mcp.vercel.com/acme/my-app\`（团队 slug / 项目名），再 \`mcp add\` / \`mcp login\`。这是自己写进 \`url\`，不是跑 \`vercel mcp --project\`。

若浏览器停在 **The app redirect URL is invalid**，\`redirect_uri\` 会带 callback ID，形如 \`http://127.0.0.1:49683/callback/J69OfRTZqnV5\`。这是 Vercel 侧 allowlist 拒这种 loopback，不是你能在 TOML 里修好的。不要自己建 Sign in with Vercel 应用去打 \`mcp.vercel.com\`——那些 token 只对 REST，不是 MCP。官方页仍列 Codex CLI，不要当成「现行一定失败」。完整回调规则见「MCP OAuth 登记完整回调」那条。

不要做这些：

- 不要把 \`npx add-mcp https://mcp.vercel.com\` 当 Codex 主路径。它会改所有检测到的 agent。
- 不要跑 \`vercel mcp\`。那条 CLI 的客户端名单只有 Claude Code、Claude.ai、Cursor、VS Code，没有 Codex。
- 不要抄 Gemini 的 \`npx mcp-remote\`，也不要抄 Claude 的 \`--transport http\`。
- 不要把 \`npx plugins add vercel/vercel-plugin\` 当成这条 MCP。那是插件 / 技能路径。
- 不要和 AI Gateway 的 \`[model_providers.vercel]\` 搞混。那是模型供应商，不是这台 MCP。
- 不要给它 \`required = true\` 挂全局。
- 不要抄 \`/sse\`，也不要给 HTTP 写 \`env\` 表。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get vercel\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Vercel", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-oauth-callback-id", "vercel-ai-gateway"],
    sources: [
      {
        label: "Vercel · MCP",
        url: "https://vercel.com/docs/agent-resources/vercel-mcp",
      },
      {
        label: "Vercel Community · redirect URL is invalid",
        url: "https://community.vercel.com/t/codex-cli-vercel-mcp-login-fails-with-the-app-redirect-url-is-invalid/42756",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-supabase-remote",
    no: 283,
    title: "Supabase MCP 用 mcp.supabase.com/mcp，查询参数写进 url",
    summary:
      "CLI：codex mcp add supabase --url https://mcp.supabase.com/mcp，再 mcp login。官方查询 read_only=true、project_ref=abc123 写进 url。不要 PAT 当主路径，也不要抄 experimental_use_rmcp_client。",
    body: `Supabase **托管**的是远程 Streamable HTTP + OAuth（动态客户端登记）。官方 Codex 节：

\`\`\`bash
codex mcp add supabase --url "https://mcp.supabase.com/mcp"
codex mcp login supabase
\`\`\`

\`\`\`toml
[mcp_servers.supabase]
url = "https://mcp.supabase.com/mcp"
enabled = true
\`\`\`

这和 Datadog 不同：Datadog 在 Codex 里要用 \`http_headers\` 选工具集；Supabase 官方就是把查询参数写进 \`url\`。常用三个：

- \`?read_only=true\`：SQL 以只读 Postgres 用户跑
- \`?project_ref=abc123\`：限定到一个项目（官方表示例就是 \`abc123\`）。加上之后 **account** 类工具会关掉
- \`?features=database,docs\`：只开指定工具组。Storage 组**默认关**，要用再写进 \`features\`

可以组合：

\`\`\`toml
[mcp_servers.supabase]
url = "https://mcp.supabase.com/mcp?project_ref=abc123&read_only=true"
enabled = true
\`\`\`

本机 Supabase CLI 是另一台：\`http://localhost:54321/mcp\`，工具子集，**没有** OAuth。不要把托管 URL 抄到本地，也不要把本地地址拿去 \`mcp login\`。

日常不要 PAT。CI 不能开浏览器时才用个人访问令牌，走 \`bearer_token_env_var\`，变量必须在**启动 Codex 的那个进程**里。不要把 \`Authorization: Bearer\` 写进 \`http_headers\`：

\`\`\`toml
[mcp_servers.supabase]
url = "https://mcp.supabase.com/mcp?project_ref=abc123&read_only=true"
bearer_token_env_var = "SUPABASE_ACCESS_TOKEN"
enabled = true
\`\`\`

键里是变量**名**。不要和已经 \`mcp login\` 的 OAuth 写在同一张表。

不要做这些：

- 不要抄旧文的 \`experimental_use_rmcp_client\`，也不要抄 \`[mcp] remote_mcp_client_enabled = true\`。那是 Studio / 旧客户端旗标，不是 Codex 配置面；Supabase 自己已经从流程里删掉。
- 不要抄 Claude 的 \`--transport http\`，也不要抄 \`mcpServers\` JSON。
- 不要套 \`mcp-remote\`。
- 不要给它 \`required = true\` 挂全局。生产库带着写工具不是每条会话都要的依赖。
- 不要一上来 \`--yolo\`。SQL 结果和工单正文都可能带提示注入，保持工具批准。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get supabase\` 看传输是 streamable_http。会话里 \`/mcp\` 只是核对工具，不是唯一登录入口。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Supabase", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "mcp-vercel-remote"],
    sources: [
      {
        label: "Supabase · MCP Server",
        url: "https://supabase.com/docs/guides/ai-tools/mcp",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-netlify-remote",
    no: 285,
    title: "Netlify MCP 用 netlify-mcp.netlify.app/mcp，远程被拦再改 stdio",
    summary:
      "CLI：codex mcp add netlify --url https://netlify-mcp.netlify.app/mcp，再 mcp login netlify。远程被拦才改 npx @netlify/mcp。不要把 npx add-mcp 当 Codex 主路径。",
    body: `Netlify 官方给 Codex 的主路径是**远程** Streamable HTTP：

\`\`\`bash
codex mcp add netlify --url https://netlify-mcp.netlify.app/mcp
codex mcp login netlify
\`\`\`

\`\`\`toml
[mcp_servers.netlify]
url = "https://netlify-mcp.netlify.app/mcp"
enabled = true
\`\`\`

公司网络拦了远程 MCP 时，才改本机 stdio（会占用同一个服务器名 \`netlify\`，不要两台一起加）：

\`\`\`bash
codex mcp add netlify -- npx -y @netlify/mcp
\`\`\`

本地包要 Node 24+。stdio 起得慢就加 \`startup_timeout_sec\`，不要抄别家的 \`startup_timeout_ms\`。

授权按提示走。HTTP 没弹出浏览器就再跑 \`codex mcp login netlify\`。连上之后可以让它调 \`get-user\` 做一次只读探测。保持工具批准，不要一上来 \`--yolo\`。密钥和 Netlify CLI 配置不要提交进仓库。

技能是另一条路，不是这台 MCP。Codex 专用安装要带 \`--agent codex\`：

\`\`\`bash
npx -y skills add netlify/context-and-tools --skill '*' --yes --agent codex
\`\`\`

不要省略 \`--agent codex\`。不带这个旗标会按默认 agent 落盘，Codex 看不见。\`fetch https://netlify.ai\` 是给会话的提示，不会写 \`mcp_servers\`。网页上的 Agent Runners 也不读这份本机配置。

不要做这些：

- 不要把 \`npx add-mcp https://netlify-mcp.netlify.app/mcp\` 当 Codex 主路径。它会改所有检测到的 agent。
- 不要抄 Claude 的 \`--transport http\`，也不要抄 \`mcpServers\` JSON。
- 不要套 \`mcp-remote\`。
- 不要给它 \`required = true\` 挂全局。
- 不要把 \`netlify login\` / 个人访问令牌写进 TOML 或 \`http_headers\`。
- 不要和 Vercel MCP（\`mcp.vercel.com\`）或 AI Gateway 的 \`[model_providers.vercel]\` 搞混。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get netlify\` 看传输是 streamable_http（远程）或 stdio（本机包）。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Netlify", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-vercel-remote", "mcp-http-not-sse"],
    sources: [
      {
        label: "Netlify · Set up Codex",
        url: "https://docs.netlify.com/build/build-with-ai/agent-setup-guides/set-up-codex-for-netlify/",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-posthog-remote",
    no: 286,
    title: "PostHog MCP 用 mcp.posthog.com/mcp，Codex 默认是 CLI 模式",
    summary:
      "CLI：codex mcp add posthog --url https://mcp.posthog.com/mcp，再 mcp login。账号自动走美区或欧盟。Codex 默认 CLI 模式。查询 readonly=true 写进 url。不要把 wizard 当 Codex 主路径。",
    body: `PostHog **托管**的是远程 Streamable HTTP。官方 Codex 节：

\`\`\`bash
codex mcp add posthog --url https://mcp.posthog.com/mcp
codex mcp login posthog
\`\`\`

\`\`\`toml
[mcp_servers.posthog]
url = "https://mcp.posthog.com/mcp"
enabled = true
\`\`\`

登录账号会把流量指到对应的美区或欧盟，不必自己换主机。连上之后权限跟这个账号的当前组织 / 项目走。

Codex **默认是 CLI 模式**：不会把几百个工具 schema 全塞进上下文，而是一台叫 \`exec\` 的工具按需列出、搜索、调用。看起来工具很少，并不等于没装上。要标准「每个工具一张表」时，把查询写进 \`url\`：

\`\`\`toml
[mcp_servers.posthog]
url = "https://mcp.posthog.com/mcp?mode=tools"
enabled = true
\`\`\`

常用查询（和 Datadog 不同，PostHog 官方就是拼进 URL）：

- \`?readonly=true\`：只留读工具
- \`?features=flags,insights\`：按产品组过滤
- \`?project_id=12345\`：钉死项目，并关掉 switch-project / switch-organization

可以组合：\`https://mcp.posthog.com/mcp?readonly=true&features=flags,insights\`。

日常用 OAuth，不要 PAT。CI 不能开浏览器时，用「MCP Server」预设的个人 API key，走 \`bearer_token_env_var\`，不要把 \`Authorization: Bearer\` 写进 \`http_headers\`。钉组织 / 项目这类**不是密钥**的头可以写 \`http_headers\`（\`x-posthog-project-id\`），或继续用查询参数。

插件是另一条路，会顺带装技能，不是这条 MCP 的前提：

\`\`\`bash
codex plugin marketplace add PostHog/ai-plugin
\`\`\`

然后在会话里 \`/plugins\` 选 PostHog 安装。不要抄 Claude 的 \`/plugin marketplace add\`。

不要做这些：

- 不要把 \`npx @posthog/wizard mcp add\` 当 Codex 主路径。Wizard 会改所有检测到的客户端。
- 不要抄 Cursor JSON，也不要把 \`phx_\` 写进 TOML。
- 不要抄 Claude 的 \`--transport http\`，也不要套 \`mcp-remote\`。
- 不要给它 \`required = true\` 挂全局。写开关、改工单不是每条会话都要的依赖。
- 不要一上来 \`--yolo\`。官方自己强调提示注入，保持工具批准。
- 不要把 Amplitude 那台分析 MCP 和这条搞混。

部分工具会在 PostHog 里走 AI 用量，组织还要打开 AI data processing。网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get posthog\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "PostHog", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "mcp-supabase-remote"],
    sources: [
      {
        label: "PostHog · MCP for Codex",
        url: "https://posthog.com/docs/model-context-protocol/codex",
      },
      {
        label: "PostHog · MCP FAQ",
        url: "https://posthog.com/docs/model-context-protocol/faq",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-prisma-remote",
    no: 287,
    title: "Prisma MCP 用 mcp.prisma.io/mcp，插件只是顺带装技能",
    summary:
      "CLI：codex mcp add prisma --url https://mcp.prisma.io/mcp，再 mcp login prisma。插件路径是 marketplace add prisma/codex-plugin。不要抄 mcpServers JSON。这不是 Prisma AIRS。",
    body: `Prisma 给 Codex 的远程 MCP 是 Streamable HTTP，地址是 \`https://mcp.prisma.io/mcp\`。官方页先讲插件，JSON 示例是 Cursor 形状。Codex 本机主路径仍是：

\`\`\`bash
codex mcp add prisma --url https://mcp.prisma.io/mcp
codex mcp login prisma
\`\`\`

\`\`\`toml
[mcp_servers.prisma]
url = "https://mcp.prisma.io/mcp"
enabled = true
\`\`\`

第一次用会打开 Prisma Console，选这个 Codex 能进的 workspace。连上之后可以列 Prisma Postgres、建库、备份、连接串、跑 SQL、看 schema。保持工具批准。Prisma ORM 会拦 \`prisma migrate reset --force\` 这类破坏性命令，除非你明确同意。

只要技能、顺带登记这台 MCP 时，走插件：

\`\`\`bash
codex plugin marketplace add prisma/codex-plugin
\`\`\`

然后新开会话（或 0.154 起看当前会话），在插件目录里选 Prisma marketplace，再装 \`Prisma\` 插件。\`plugin marketplace add\` 还不认识时，先升级 Codex。不要抄 Claude 的 \`/plugin marketplace add\`。

不要做这些：

- 不要把官方页那份 \`mcpServers\` JSON 抄进 \`config.toml\`。Codex 远程用 \`--url\`。
- 不要抄 Claude 的 \`--transport http\`，也不要套 \`mcp-remote\`。
- 不要给它 \`required = true\` 挂全局。
- 不要和桌面「Enable Prisma AIRS」搞混。那是安全扫描连接器，不是这台 Postgres MCP。
- 不要把密钥写进 \`http_headers\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get prisma\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Prisma", "OAuth", "plugins"],
    related: ["mcp-add-and-login", "cloudflare-skills-plugin", "mcp-posthog-remote"],
    sources: [
      {
        label: "Prisma · Codex",
        url: "https://www.prisma.io/docs/ai/tools/codex",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-neon-remote",
    no: 288,
    title: "Neon MCP 用 mcp.neon.tech/mcp，不要抄 /sse 或本地 stdio 包",
    summary:
      "CLI：codex mcp add neon --url https://mcp.neon.tech/mcp，再 mcp login。查询 projectId= 和 readonly=true 写进 url。不要把 npx add-mcp 或已弃用的 /sse、@neondatabase/mcp-server-neon 当 Codex 主路径。",
    body: `Neon **托管**的是远程 Streamable HTTP。Codex 本机主路径是：

\`\`\`bash
codex mcp add neon --url https://mcp.neon.tech/mcp
codex mcp login neon
\`\`\`

\`\`\`toml
[mcp_servers.neon]
url = "https://mcp.neon.tech/mcp"
enabled = true
\`\`\`

第一次会打开 Neon 授权。连上之后可以建分支、跑 SQL、看 schema。官方自己把这台 MCP 定位成开发 / 测试，不要挂生产库，保持工具批准。

常用查询写进 \`url\`（和 PostHog 一样拼进 URL，不是 Datadog 那种工具集头）：

- \`?readonly=true\`：只留读工具。\`SELECT\` 和看 schema 还在，建分支 / 跑迁移会关掉
- \`?projectId=prj_abc123\`：钉死一个项目（键是驼峰 \`projectId\`，不是 Supabase 的 \`project_ref\`）
- \`?category=querying\`：按工具组过滤，可重复。常见还有 \`schema\`、\`branches\`、\`docs\`

可以组合：

\`\`\`toml
[mcp_servers.neon]
url = "https://mcp.neon.tech/mcp?readonly=true&projectId=prj_abc123"
enabled = true
\`\`\`

CI 不能开浏览器时，走 API key，**不要**把 \`Authorization: Bearer\` 写进 \`http_headers\`：

\`\`\`toml
[mcp_servers.neon]
url = "https://mcp.neon.tech/mcp?projectId=prj_abc123"
bearer_token_env_var = "NEON_API_KEY"
enabled = true
\`\`\`

键里是变量**名**。变量必须在启动 Codex 的那个进程里，Codex 不读 \`.env\`。不要和已经 \`mcp login\` 的 OAuth 写在同一张表。官方 Codex 分支工作流还会在项目里跑 \`neon set-context\`，生成 \`.neon\` 给模型看项目 ID，那不是 MCP 登录本身。

只要技能、顺带登记这台 MCP 时，用 Neon CLI，**必须**钉死 Codex：

\`\`\`bash
npx neon@latest plugins --agent codex -y
\`\`\`

只接线、不装插件时：\`npx neon@latest mcp --oauth --agent codex\`。不要跑不带 \`--agent\` 的 \`neon mcp -y\`，它会改所有检测到的客户端，默认还会把新铸的 API key 写进配置。git 跟踪的项目配置里不要落密钥。

不要做这些：

- 不要把 \`npx add-mcp https://mcp.neon.tech/mcp\` 当 Codex 主路径。它会改所有检测到的 agent。
- 不要抄 \`https://mcp.neon.tech/sse\`。这条 HTTP+SSE 已弃用，2026-10-01 起会 \`410 Gone\`。SSE 也不支持 API key。
- 不要装本地 \`@neondatabase/mcp-server-neon\`。那包已弃用。
- 不要套 \`mcp-remote\`，也不要抄 Claude Desktop 那份 \`mcpServers\` JSON。
- 不要抄 Claude 的 \`--transport http\`。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。分支和 SQL 都可能带提示注入。

项目开了 IP Allow 时，要把托管出口 \`34.192.103.46\` 和 \`23.22.233.166\` 加进白名单，否则 MCP 连不上库。网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get neon\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Neon", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "mcp-posthog-remote"],
    sources: [
      {
        label: "Neon · MCP Server",
        url: "https://neon.com/docs/ai/neon-mcp-server",
      },
      {
        label: "Neon · Connect MCP clients",
        url: "https://neon.com/docs/ai/connect-mcp-clients-to-neon",
      },
      {
        label: "Neon · Codex branching guide",
        url: "https://neon.com/guides/openai-codex-neon-mcp",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-planetscale-remote",
    no: 289,
    title: "PlanetScale MCP 用 mcp.pscale.dev/mcp/planetscale，OAuth 是主路径",
    summary:
      "CLI：codex mcp add planetscale --url https://mcp.pscale.dev/mcp/planetscale，随后浏览器授权。CI 才用 bearer_token_env_var = PLANETSCALE_API_TOKEN。不要抄 REST API 的 id:secret，也不要把已删除的 pscale mcp 当现行路径。",
    body: `PlanetScale **托管**的是远程 Streamable HTTP。官方 Codex 节：

\`\`\`bash
codex mcp add planetscale --url https://mcp.pscale.dev/mcp/planetscale
\`\`\`

官方说这条 \`add\` 会马上弹出浏览器。若没有，再跑 \`codex mcp login planetscale\`。

\`\`\`toml
[mcp_servers.planetscale]
url = "https://mcp.pscale.dev/mcp/planetscale"
enabled = true
\`\`\`

连上之后可以列组织 / 库 / 分支、看 schema、跑 Insights、读查询。写查询会拦没有 \`WHERE\` 的 \`UPDATE\` / \`DELETE\`，也会拦 \`TRUNCATE\`；DDL 仍要人同意。生产库不要一上来给写权限。

只要 Insights 和 Schema Recommendations、不要执行 SQL 时，换 insights-only 地址。服务器名用下划线，不要把 URL 路径里的连字符抄成表名：

\`\`\`toml
[mcp_servers.planetscale_insights]
url = "https://mcp.pscale.dev/mcp/planetscale-insights-only"
enabled = true
\`\`\`

项目只对着一个库时，把组织 / 库 / 分支写进仓库 \`AGENTS.md\`，少让模型先扫一遍所有组织。

CI 不能开浏览器时，用组织设置里的 service token，走 \`bearer_token_env_var\`。官方变量名是 \`PLANETSCALE_API_TOKEN\`，值是 \`pscale_tkn_\` 开头的**密钥本身**，不要 \`Bearer ...\`，也不要 PlanetScale REST API 那种 \`id:secret\`：

\`\`\`bash
codex mcp add planetscale --url https://mcp.pscale.dev/mcp/planetscale --bearer-token-env-var PLANETSCALE_API_TOKEN
\`\`\`

\`\`\`toml
[mcp_servers.planetscale]
url = "https://mcp.pscale.dev/mcp/planetscale"
bearer_token_env_var = "PLANETSCALE_API_TOKEN"
enabled = true
\`\`\`

变量必须在启动 Codex 的那个进程里。不要和已经 \`mcp login\` 的 OAuth 写在同一张表。不要把 \`Authorization: Bearer\` 写进 \`http_headers\`。工具回 \`invalid_token\` 多半是把 token ID 或 \`id:secret\` 塞进去了。

不要做这些：

- 不要抄页上的 \`mcpServers\` JSON，也不要抄 Claude 的 \`--transport http\`。
- 不要抄 Claude 的 \`/plugin marketplace add planetscale/claude-plugin\`。那是 Claude 插件，不是 Codex 命令。
- 不要跑已删除的 \`pscale mcp\` 本地服务器。
- 不要抄 Claude Code 那条 \`--header "Authorization: Bearer …"\`：shell 会把密钥展开写进配置。Codex 要的是变量**名**。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`，也不要把支付方式的写权限随手授给 token。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get planetscale\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth（或 bearer）。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "PlanetScale", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "mcp-neon-remote"],
    sources: [
      {
        label: "PlanetScale · MCP",
        url: "https://planetscale.com/docs/connect/mcp",
      },
      {
        label: "PlanetScale · MCP service token",
        url: "https://planetscale.com/docs/connect/mcp-service-token",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-snyk-stdio",
    no: 290,
    title: "Snyk Studio 先 --ade codex，MCP 是本地 stdio 不是远程",
    summary:
      "Codex 默认走 Snyk Studio 安装器，必须带 --ade codex。只要 MCP：codex mcp add snyk-security -- npx -y snyk@latest mcp -t stdio。没有托管远程。密钥用 env_vars 转发 SNYK_TOKEN，不要写进 env 表。",
    body: `Snyk 给 Codex 的**现行默认**是 Studio 安装器（钩子 + 技能 + MCP），不是远程 HTTP。官方把 Codex CLI 列进「有钩子」的 ADE。先预览，再钉死 Codex，不要让它改所有检测到的客户端：

\`\`\`bash
curl -fsSL "https://raw.githubusercontent.com/snyk/studio-recipes/main/installer/dist/snyk-studio-install.sh" -o snyk-studio-install.sh
bash ./snyk-studio-install.sh --dry-run --ade codex
bash ./snyk-studio-install.sh --ade codex
\`\`\`

装完跑 \`snyk auth\`，或把 \`SNYK_TOKEN\` 放进**启动 Codex 的那个进程**。不要 \`bash ./snyk-studio-install.sh -y\` 不带 \`--ade\`。Windows 用官方 \`.ps1\`，不要把这份 bash 抄进 PowerShell。

只要 MCP、不要安装器时，官方 Codex 节是本地 stdio。Snyk **没有**托管远程 MCP。用户层表名官方就是带连字符的 \`snyk-security\`（这不是插件 \`mcp.json\`，#33063 那套连字符问题不套这里）：

\`\`\`bash
codex mcp add snyk-security -- npx -y snyk@latest mcp -t stdio
\`\`\`

\`\`\`toml
[mcp_servers.snyk-security]
command = "npx"
args = ["-y", "snyk@latest", "mcp", "-t", "stdio"]
env_vars = ["SNYK_TOKEN"]
enabled = true

[mcp_servers.snyk-security.env]
SNYK_MCP_PROFILE = "lite"
\`\`\`

\`SNYK_MCP_PROFILE\` 可以是 \`lite\` / \`full\`（默认）/ \`experimental\`，写进 \`env\` 表没问题，那不是密钥。\`SNYK_TOKEN\` 必须走 \`env_vars\`，不要写成 \`env\` 表里的字面量，TOML 占位符也不会展开。本机已经装了 \`snyk\` 时，\`command\` 改成可执行文件的**绝对路径**；用 fnm / nvm 管 Node 时尤其不要写裸 \`snyk\`。

第一次用会走浏览器登录（工具名 \`snyk_auth\`），也可以先在终端 \`snyk auth\`。随后可让它扫代码 / 依赖。\`snyk_sca_scan\` 可能在本机拉 Gradle / Maven / pip，沙箱要给网络，或放到你已经配好工具链的环境。

不要做这些：

- 不要抄 \`mcpServers\` JSON。Codex 用 \`[mcp_servers.snyk-security]\`。
- 不要抄 Claude 的 \`-t http\`。这里的 \`-t stdio\` 是 Snyk CLI 自己的传输参数。
- 不要给它 \`url = "https://…"\`。官方明确没有远程 MCP。
- 不要把 API token 写进 \`args\` 或 \`http_headers\`。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。扫描结果会进上下文。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get snyk-security\` 看 command 是 npx 还是绝对路径。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Snyk", "stdio", "hooks"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "mcp-grafana-stdio"],
    sources: [
      {
        label: "Snyk · Codex CLI guide",
        url: "https://docs.snyk.io/agent-security/agentic-security-with-snyk-studio/quickstart-guides/codex-cli-guide",
      },
      {
        label: "Snyk · Getting started with Snyk Studio",
        url: "https://docs.snyk.io/agent-security/agentic-security-with-snyk-studio/getting-started-with-snyk-studio",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-circleci-remote",
    no: 291,
    title: "CircleCI 在 Codex 里先装插件，托管 MCP 才是 mcp.circleci.com/v1/mcp",
    summary:
      "Codex 主路径是 /plugins 装 CircleCI，并先 circleci auth login。跨工具才用 codex mcp add circleci --url https://mcp.circleci.com/v1/mcp 再 mcp login。不要装已弃用的 npx @circleci/mcp-server-circleci，也不要和 Circle 支付 MCP 搞混。",
    body: `CircleCI 官方给 Codex 的**主路径是插件**，不是本地 npx 包。先装 CLI 并登录（浏览器授权，凭证进系统钥匙串，不必手拷 PAT）：

\`\`\`bash
brew install circleci
circleci auth login
circleci auth me
\`\`\`

然后在 Codex 会话里打开 \`/plugins\`，目录里找 CircleCI，安装后**新开会话**。技能要新会话才加载。用自然语言即可，不必每句都 \`@circleci\`：

- 检查最近一次 pipeline
- 审查本仓库的 CircleCI 配置（底层是 \`circleci config validate\`）
- 诊断最近一次失败构建

多数命令从当前 git remote / 分支推断项目。组织 slug 是 \`circleci/\` 而不是 \`gh/\` 时，在仓库里再跑 \`circleci project link\`。网页「Copy Fix Prompt」会复制一段带 run UUID 和 \`--failure-report\` 的提示，直接贴进 Codex；不要把那段 UUID 写进 \`config.toml\`。

跨编辑器、或只要远程 MCP 时，托管地址是 Streamable HTTP：

\`\`\`bash
codex mcp add circleci --url https://mcp.circleci.com/v1/mcp
codex mcp login circleci
\`\`\`

\`\`\`toml
[mcp_servers.circleci]
url = "https://mcp.circleci.com/v1/mcp"
enabled = true
\`\`\`

服务器名用 \`circleci\`，不要抄 Claude 文档里的 \`circleci-mcp-server\`。CI 不能开浏览器时，用个人 API token 走 \`bearer_token_env_var\`（CLI 环境变量名是 \`CIRCLE_TOKEN\`），不要把 \`Authorization: Bearer\` 写进 \`http_headers\`：

\`\`\`toml
[mcp_servers.circleci]
url = "https://mcp.circleci.com/v1/mcp"
bearer_token_env_var = "CIRCLE_TOKEN"
enabled = true
\`\`\`

不要和已经 \`mcp login\` 的 OAuth 写在同一张表。变量必须在启动 Codex 的那个进程里。

本机 CLI MCP（\`circleci mcp start\`）官方 enable 列表只有 Claude / Cursor / VS Code，**没有** \`circleci mcp codex enable\`。硬要 stdio 时自己 \`codex mcp add circleci -- circleci mcp start\`，仍先 \`circleci auth login\`。

不要做这些：

- 不要装 \`npx -y @circleci/mcp-server-circleci\`。官方已弃用；旧文里的 \`CIRCLECI_TOKEN\` + \`env\` 表不要抄。
- 不要抄 Claude 的 \`--transport http\` 或 \`mcpServers\` JSON。
- 不要和 Circle（circle.com 支付 / 链上）那台 \`api.circle.com\` MCP 搞混。那是另一家。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。触发 pipeline、重跑工作流都是写操作。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get circleci\` 看传输是 streamable_http。插件不生效时先确认 \`circleci version\` 和 \`circleci auth me\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "CircleCI", "plugins", "OAuth"],
    related: ["mcp-add-and-login", "cloudflare-skills-plugin", "mcp-http-bearer-env"],
    sources: [
      {
        label: "CircleCI · Getting started with Codex",
        url: "https://circleci.com/blog/getting-started-with-codex-and-circleci/",
      },
      {
        label: "CircleCI · Codex plugin",
        url: "https://circleci.com/blog/circleci-codex-plugin/",
      },
      {
        label: "CircleCI · Hosted MCP",
        url: "https://circleci.com/docs/guides/toolkit/connecting-to-the-circleci-mcp-server/",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-firecrawl-remote",
    no: 292,
    title: "Firecrawl MCP 用 mcp-oauth 登录，密钥走 bearer 不要拼进 URL",
    summary:
      "交互主路径：codex mcp add firecrawl --url https://mcp.firecrawl.dev/v2/mcp-oauth，再 mcp login。无账号用 /v2/mcp；CI 才 bearer_token_env_var = FIRECRAWL_API_KEY。不要把密钥拼进 URL，也不要同时加两台 firecrawl。",
    body: `Firecrawl 官方给 Codex 的**交互主路径**是托管 Streamable HTTP + 浏览器登录，不是本地 npx：

\`\`\`bash
codex mcp add firecrawl --url https://mcp.firecrawl.dev/v2/mcp-oauth
codex mcp login firecrawl
\`\`\`

\`\`\`toml
[mcp_servers.firecrawl]
url = "https://mcp.firecrawl.dev/v2/mcp-oauth"
enabled = true
\`\`\`

这条 URL 是客户端配置值，**不要**在浏览器里直接打开。Codex 会自己拉起登录，让你选团队并批准。进会话后用 \`/mcp\` 确认 \`firecrawl\` 已连接。改过已有连接时，先新开会话再试。

三种托管入口不要混：

- \`https://mcp.firecrawl.dev/v2/mcp-oauth\`：有人在场时登录。新发的 OAuth token 只认这个 audience。
- \`https://mcp.firecrawl.dev/v2/mcp\`：无账号 keyless，只有 Search / Scrape / Parse，按 IP 限流。
- 同一条 \`/v2/mcp\` 再加 \`bearer_token_env_var\`：无人值守、要完整工具面时用 API key。

不要同时加两台名叫 \`firecrawl\` 的服务器。\`codex mcp add\` 同名会覆盖。也不要再开一台 \`firecrawl_oauth\` 之类的第二张表。\`/v2/mcp\` 和 \`/v2/mcp-oauth\` 的 token **不能混用**；audience 对不上或缺失会 fail closed。旧 token 若是发给 \`/v2/mcp\` 的，只继续在那条上用。

无账号先试：

\`\`\`bash
codex mcp add firecrawl --url https://mcp.firecrawl.dev/v2/mcp
\`\`\`

keyless 连上后应看到 \`firecrawl_search\`、\`firecrawl_scrape\`、\`firecrawl_parse\`。要完整工具或更高限额，换成登录或 API key，不要叠第二台。

CI / 脚本不能开浏览器时，密钥走 \`bearer_token_env_var\`。**永远不要**把 key 拼进 URL，也不要写进 \`http_headers\` 或 \`env\` 字面量：

\`\`\`toml
[mcp_servers.firecrawl]
url = "https://mcp.firecrawl.dev/v2/mcp"
bearer_token_env_var = "FIRECRAWL_API_KEY"
enabled = true
\`\`\`

键里是变量**名**。变量必须在启动 Codex 的那个进程里，Codex 不读 \`.env\`。不要和已经 \`mcp login\` 的 OAuth 写在同一张表。OAuth 返回 \`401\` 先重新 \`codex mcp login firecrawl\`；对 OAuth 地址发一条未登录请求，\`401\` 是预期。API key 路径 \`401\` 时，先换启动 Codex 那个进程里的密钥，再新开会话。

只要本机进程或自建 Firecrawl API 才跑本地 stdio。官方要求 **Node.js 22+**。密钥用 \`env_vars\` 转发，不要抄旧页把 \`fc-\` 写进 \`env\` 表：

\`\`\`toml
[mcp_servers.firecrawl]
command = "npx"
args = ["-y", "firecrawl-mcp"]
env_vars = ["FIRECRAWL_API_KEY"]
enabled = true
\`\`\`

自建 API 再加 \`FIRECRAWL_API_URL\`。本地 HTTP 是 \`http://localhost:3000/mcp\`，那是给已经起好的进程用的，**不是**托管 \`/v2/mcp\`。Windows 上 \`spawn npx ENOENT\` 时，把 \`command\` 改成 \`where npx\` 看到的 \`npx.cmd\` 绝对路径。

文献检索技能是可选的：官方写 \`npx skills add firecrawl/skills@firecrawl-research-index\`。那是 Agent Skills 安装器，可能改所有检测到的客户端，**不是** Codex \`/plugins\` 主路径。不确定就别装。

不要做这些：

- 不要把 \`https://mcp.firecrawl.dev/v2/mcp-oauth\` 当网页打开。
- 不要把 API key 拼进 URL 或 \`Authorization: Bearer\` 写进 \`http_headers\`。
- 不要抄 \`mcpServers\` JSON，也不要抄 Claude 的 \`--transport http\`。
- 不要套 \`mcp-remote\`。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。抓站结果会进上下文。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get firecrawl\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示已连接。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Firecrawl", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "mcp-exa-remote"],
    sources: [
      {
        label: "Firecrawl · Codex CLI",
        url: "https://docs.firecrawl.dev/quickstarts/codex-cli",
      },
      {
        label: "Firecrawl · OAuth MCP",
        url: "https://docs.firecrawl.dev/mcp-server/oauth",
      },
      {
        label: "Firecrawl · Keyless MCP",
        url: "https://docs.firecrawl.dev/mcp-server/keyless",
      },
      {
        label: "Firecrawl · Run locally",
        url: "https://docs.firecrawl.dev/mcp-server/local",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-exa-remote",
    no: 293,
    title: "Exa 在 Codex 里先装插件，手工 MCP 才是 mcp.exa.ai/mcp",
    summary:
      "ChatGPT / Codex 推荐路径是 chatgpt.com/plugins/exa，插件自带 MCP 和技能。本机手工：codex mcp add exa --url https://mcp.exa.ai/mcp。密钥用 env_http_headers 的 x-api-key，不要抄 mcp-remote，也不要把 key 写进 URL。",
    body: `Exa 官方给 ChatGPT 和 Codex 的**推荐路径是插件**，不是先手写 MCP。打开 chatgpt.com/plugins/exa，点安装，按提示登录 Exa。技能只进安装之后新开的会话，旧线程不会自动加载。插件已经带上托管 MCP 以及 search / exa-agent 技能，不必再单独加一次。

本机 CLI、或你就是要自己管 \`config.toml\` 时，才手工接托管 Streamable HTTP：

\`\`\`bash
codex mcp add exa --url https://mcp.exa.ai/mcp
\`\`\`

\`\`\`toml
[mcp_servers.exa]
url = "https://mcp.exa.ai/mcp"
enabled = true
\`\`\`

默认工具是 \`web_search_exa\` 和 \`web_fetch_exa\`：自然语言搜索会带回页面内容，也可以按 URL 读文档 / changelog / issue。只要部分工具时，把名单写进 \`url\` 的 \`tools\` 查询，不要另开第二台：

\`\`\`toml
[mcp_servers.exa]
url = "https://mcp.exa.ai/mcp?tools=web_search_exa,web_fetch_exa"
enabled = true
\`\`\`

多步调研、名单、结构化输出才开 \`agent_run\`。那条按用量计费，必须登录或带自己的 API key。长任务大约 750 秒窗口内没跑完时，工具会回 \`status: running\` 和 \`id\`，再用同一个 \`runId\` 接着等，不要当成失败重开一条。

免费档够随便搜。生产或要抬限额时，官方 JSON 示例把 \`x-api-key\` 写成字面量，**不要**抄进 Codex。Codex 用 \`env_http_headers\`，左边是头名，右边是启动 Codex 那个进程里的变量**名**：

\`\`\`toml
[mcp_servers.exa]
url = "https://mcp.exa.ai/mcp"
enabled = true

[mcp_servers.exa.env_http_headers]
x-api-key = "EXA_API_KEY"
\`\`\`

不要把密钥拼进 URL，不要写进 \`http_headers\`。Bearer 表 \`bearer_token_env_var\` 对这台不对口，Exa 要的是 \`x-api-key\`。变量缺失时这颗头会被静默丢掉，请求仍会发出去，随后限流或 401。Codex 不读 \`.env\`。

不要做这些：

- 不要套 \`mcp-remote\`。Codex 自己会连 Streamable HTTP。
- 不要抄 Claude 的 \`claude plugin install exa@claude-plugins-official\` 或 \`--transport http\`。
- 不要抄 \`mcpServers\` JSON 当 Codex 主路径。
- 不要把 \`EXA_API_KEY\` 写进 \`env\` 表或 \`args\`。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。网页正文会进上下文。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get exa\` 看传输是 streamable_http。插件不生效时先确认装完后开了**新**会话。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Exa", "plugins", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-env-headers", "mcp-firecrawl-remote"],
    sources: [
      {
        label: "Exa · Codex and ChatGPT",
        url: "https://exa.ai/docs/integrations/chatgpt-codex",
      },
      {
        label: "Exa · Web Search MCP",
        url: "https://exa.ai/docs/reference/exa-mcp",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-langfuse-docs",
    no: 294,
    title: "Langfuse 文档 MCP 用 langfuse-docs，无鉴权，不是观测产品",
    summary:
      "官方 Codex 节：codex mcp add langfuse-docs --url https://langfuse.com/api/mcp。无鉴权、只读文档。不要抄 mcp-remote 或 Claude 的 --transport http。这不是 cloud.langfuse.com 那台带 Basic Auth 的产品 MCP。",
    body: `Langfuse **文档** MCP 有官方 Codex 节。无鉴权，Streamable HTTP：

\`\`\`bash
codex mcp add langfuse-docs --url https://langfuse.com/api/mcp
\`\`\`

\`\`\`toml
[mcp_servers.langfuse-docs]
url = "https://langfuse.com/api/mcp"
enabled = true
\`\`\`

用户层表名官方就是带连字符的 \`langfuse-docs\`（这不是插件 \`mcp.json\`，#33063 那套连字符问题不套这里）。新开会话后跑 \`codex mcp list\` 确认已登记。官方没要求 \`mcp login\`。

这台只暴露文档工具：\`searchLangfuseDocs\`（语义检索）、\`getLangfuseDocsPage\`（按路径或 langfuse.com URL 取 Markdown）、以及总览。核心用途是让模型按文档把 Tracing 接到你的仓库，不是去改生产观测数据。

同一家还有**另一台**已鉴权的产品 MCP：\`https://cloud.langfuse.com/api/public/mcp\`（美区 \`us.cloud.langfuse.com\`，日本 \`jp\`，HIPAA \`hipaa\`）。那台要 Basic Auth，官方 Codex 示例把 token 写进 \`http_headers\`，**不要**抄进仓库。文档 MCP 和产品 MCP 不要写成同一张表。

可选技能：官方写 \`npx skills add langfuse/skills --skill langfuse\`。那是 Agent Skills 安装器，可能改所有检测到的客户端。只要 Codex 时钉死：

\`\`\`bash
npx skills add langfuse/skills --skill langfuse --agent codex
\`\`\`

这不是 Codex \`/plugins\` 主路径。不确定就别装。技能底层会用 \`npx langfuse-cli\`，那是 CLI，不是这台文档 MCP。

不要做这些：

- 不要套 \`mcp-remote\`。那是 Windsurf 回退。Codex 自己会连 Streamable HTTP。
- 不要抄 Claude 的 \`--transport http\` 或 \`mcpServers\` JSON。
- 不要把 \`https://langfuse.com/api/search-docs\` 当 MCP。那是同一套检索的 REST。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get langfuse-docs\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Langfuse", "文档", "HTTP"],
    related: ["mcp-add-and-login", "mcp-openai-docs", "mcp-langfuse-cloud"],
    sources: [
      {
        label: "Langfuse · Docs MCP",
        url: "https://langfuse.com/docs/docs-mcp",
      },
      {
        label: "Langfuse · Agent Skill",
        url: "https://langfuse.com/docs/api-and-data-platform/features/agent-skill",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-launchdarkly-remote",
    no: 295,
    title: "LaunchDarkly 托管 MCP 用 mcp.launchdarkly.com，OAuth 不要抄 --api-key",
    summary:
      "商业区：codex mcp add launchdarkly --url https://mcp.launchdarkly.com/mcp/launchdarkly，再 mcp login。官方页没有 Codex 节，不要抄 Cursor JSON 或本地 npx --api-key。联邦区和欧盟实例没有这台托管服务。",
    body: `LaunchDarkly **商业区**的现行默认是托管 Streamable HTTP + OAuth。官方安装页只列 Cursor / Claude / Windsurf / Copilot，没有 Codex 按钮。本机主路径自己 \`add\`：

\`\`\`bash
codex mcp add launchdarkly --url https://mcp.launchdarkly.com/mcp/launchdarkly
codex mcp login launchdarkly
\`\`\`

\`\`\`toml
[mcp_servers.launchdarkly]
url = "https://mcp.launchdarkly.com/mcp/launchdarkly"
enabled = true
\`\`\`

连上之后可以管 feature flag、AgentControl 配置、查可观测性。例如：「在默认项目建一个叫 example feature 的 flag」「把这个 flag 在所有环境打开」。OAuth 过了仍 \`403\` 多半是账号权限，不是登录失败：至少要 Writer 基线、Developer 预设，或能在目标项目里创建 / 读 / 改 / 删 flag 和 AgentControl。改完权限后重新 \`mcp login\`。

**联邦区和欧盟实例没有托管 MCP。** 那些环境才考虑本地 \`@launchdarkly/mcp-server\`。不要把 \`--api-key\` 和 token 写进 \`args\`；Codex **不会**展开 \`args\` 里的 \`$LD_ACCESS_TOKEN\`。EU 要额外的 \`--server-url https://app.eu.launchdarkly.com\`，联邦区是 \`https://app.launchdarkly.us\`。商业区不要再开本地包，官方说托管更完整、更新更快。

从旧本地配置迁过来时：删掉 \`npx @launchdarkly/mcp-server\`、\`--api-key\` 和 \`LD_ACCESS_TOKEN\`，换成上面那张 \`url\` 表，然后新开会话再 \`mcp login\`。

可选技能官方写 \`npx skills add launchdarkly/agent-skills\`，并点名 Codex 兼容。那是 Agent Skills 安装器，可能改所有检测到的客户端，**不是** \`/plugins\`。不确定就别装。技能负责工作流顺序（例如 flag cleanup 的就绪评估），MCP 才真正调 API。

不要做这些：

- 不要抄 \`mcpServers\` JSON，也不要抄 Claude 的 \`--transport http\`。
- 不要把安装页或 Cursor 一键装当 Codex 主路径。
- 不要给商业区再叠一台本地 \`LaunchDarkly\` stdio。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。改 targeting、开关生产环境都是写操作。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get launchdarkly\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "LaunchDarkly", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "mcp-langfuse-docs"],
    sources: [
      {
        label: "LaunchDarkly · Hosted MCP",
        url: "https://launchdarkly.com/docs/home/getting-started/mcp-hosted",
      },
      {
        label: "LaunchDarkly · MCP server",
        url: "https://launchdarkly.com/docs/home/getting-started/mcp",
      },
      {
        label: "LaunchDarkly · Local MCP",
        url: "https://launchdarkly.com/docs/home/getting-started/mcp-local",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-langfuse-cloud",
    no: 296,
    title: "Langfuse 产品 MCP 用 Basic 头，不要抄 http_headers 里的 token",
    summary:
      "产品地址是 cloud.langfuse.com/api/public/mcp，要项目级 pk/sk 的 Basic Auth。Codex 用 env_http_headers，不要把 token 写进 http_headers。bearer_token_env_var 会发 Bearer，对这台不对口。不是 langfuse-docs。",
    body: `Langfuse **产品** MCP 管项目里的 traces / prompts / datasets，不是文档检索。官方给 Codex 的示例把 \`Authorization: Basic …\` 写进 \`http_headers\`，**不要**抄进仓库。

能跑 shell 时，官方更推荐 Agent Skill + \`npx langfuse-cli\`。仍要协议工具、或不想把完整 CLI 交给模型时，再接这台 Streamable HTTP。

EU 默认：

\`\`\`toml
[mcp_servers.langfuse]
url = "https://cloud.langfuse.com/api/public/mcp"
enabled = true

[mcp_servers.langfuse.env_http_headers]
Authorization = "LANGFUSE_MCP_AUTHORIZATION"
\`\`\`

美区换成 \`https://us.cloud.langfuse.com/api/public/mcp\`，日本 \`jp.cloud.langfuse.com\`，HIPAA \`hipaa.cloud.langfuse.com\`。自建用你自己的 HTTPS 域名加 \`/api/public/mcp\`。表名用 \`langfuse\`，不要和文档那张 \`langfuse-docs\` 写成一台。

鉴权是 **Basic Auth**，不是 Bearer，也不是 OAuth。不要 \`codex mcp login langfuse\`，也不要 \`bearer_token_env_var\`：那条会发出 \`Authorization: Bearer …\`，这里会 401。

密钥必须是**项目级**的 Public Key + Secret Key（\`pk-lf-\` / \`sk-lf-\`），组织级或纯 Bearer 不行。先在启动 Codex 的那个进程里准备整段头值（含 \`Basic \` 前缀）：

\`\`\`bash
export LANGFUSE_MCP_AUTHORIZATION="Basic $(printf '%s:%s' "$LANGFUSE_PUBLIC_KEY" "$LANGFUSE_SECRET_KEY" | base64 | tr -d '\\n')"
\`\`\`

键里是变量**名**。Codex 不读 \`.env\`。变量缺失时这颗头会被静默丢掉，请求仍会发出去，随后 401。不要把 \`pk-lf-\` / \`sk-lf-\` 写进 \`http_headers\`、\`env\` 或 URL。

连上后让它 \`list all prompts in the project\`，应走 \`listPrompts\`。默认带读写工具。只要读时用 \`enabled_tools\` 做允许名单，不要把写工具留给 \`--yolo\`。

自建若 403，多半是反代丢掉了公开 \`Host\`；那是服务端 \`LANGFUSE_MCP_ALLOWED_HOSTS\`，不是 Codex 配置键。

不要做这些：

- 不要抄官方 TOML 把 Basic token 写进 \`http_headers\`。
- 不要抄 Claude 的 \`--header "Authorization: Basic …"\`：shell 会把密钥展开写进配置。
- 不要抄 \`mcpServers\` JSON 或 \`--transport http\`。
- 不要和 \`https://langfuse.com/api/mcp\` 那台无鉴权文档 MCP 搞混。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。写 prompt / 改 dataset 都是项目数据。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get langfuse\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Langfuse", "HTTP", "密钥"],
    related: ["mcp-http-env-headers", "mcp-langfuse-docs", "mcp-add-and-login"],
    sources: [
      {
        label: "Langfuse · MCP Server",
        url: "https://langfuse.com/docs/api-and-data-platform/features/mcp-server",
      },
      {
        label: "Langfuse · MCP Reference",
        url: "https://mcp.reference.langfuse.com/",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-circle-remote",
    no: 297,
    title: "Circle 支付 MCP 用 api.circle.com/v1/codegen/mcp，不是 CircleCI",
    summary:
      "官方 Codex 节：codex mcp add circle --url https://api.circle.com/v1/codegen/mcp。这是 Wallets / Contracts / CCTP / Gateway 的代码生成 MCP，无账号。不要和 mcp.circleci.com 的 CircleCI 搞混，也不要抄 Kiro 的 npx @circle/mcp-server。",
    body: `Circle（circle.com，稳定币 / 钱包）官方给 Codex 的是托管 Streamable HTTP，用来**生成和修代码**，不是去扣你的生产余额：

\`\`\`bash
codex mcp add circle --url https://api.circle.com/v1/codegen/mcp
\`\`\`

\`\`\`toml
[mcp_servers.circle]
url = "https://api.circle.com/v1/codegen/mcp"
enabled = true
\`\`\`

服务器名用 \`circle\`。官方没要求 \`mcp login\`，也没要求 API key。连上后按 Wallets、Contracts、CCTP、Gateway 问它要示例和修法。

这**不是** CircleCI。CI 那台是 \`mcp.circleci.com/v1/mcp\`，表名 \`circleci\`，还要 \`circleci auth login\` 或 \`CIRCLE_TOKEN\`。两家不要写成同一张表，也不要共用 \`CIRCLE_TOKEN\`。

不要抄 Kiro 文档里的本地 \`npx -y @circle/mcp-server\` 加 \`CIRCLE_BASE_URL\`。那是另一套 stdio 包装。Codex 主路径就是上面的 \`--url\`。社区包 \`@codespar/mcp-circle\` / \`circle-agent-stack-mcp\` 会动钱包和打款，**不是**这条官方 codegen MCP。

不要做这些：

- 不要抄 \`mcpServers\` JSON，也不要抄 Claude 的 \`--transport http\`。
- 不要把 \`https://api.circle.com/v1/codegen/mcp\` 当成 CircleCI 托管地址。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。生成出来的钱包 / 合约代码仍要人审。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get circle\` 看传输是 streamable_http。\`codex mcp list\` 里应同时能分清 \`circle\` 和 \`circleci\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Circle", "HTTP"],
    related: ["mcp-add-and-login", "mcp-circleci-remote", "mcp-http-not-sse"],
    sources: [
      {
        label: "Circle · MCP server",
        url: "https://developers.circle.com/ai/mcp",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-twilio-docs",
    no: 298,
    title: "Twilio 文档 MCP 用 mcp.twilio.com/docs，无鉴权，不执行 API",
    summary:
      "官方 Codex 节：codex mcp add twilio-docs --url https://mcp.twilio.com/docs。无鉴权、只读文档和 OpenAPI。不要抄 Claude 的 --transport http、mcp-remote 或 Cursor 的 /add-plugin。Public Beta，不会替你调 Twilio API。",
    body: `Twilio **文档** MCP 有官方 Codex 节。Public Beta，无鉴权，Streamable HTTP：

\`\`\`bash
codex mcp add twilio-docs --url https://mcp.twilio.com/docs
\`\`\`

\`\`\`toml
[mcp_servers.twilio-docs]
url = "https://mcp.twilio.com/docs"
enabled = true
\`\`\`

用户层表名官方就是带连字符的 \`twilio-docs\`（这不是插件 \`mcp.json\`，#33063 那套连字符问题不套这里）。官方没要求 \`mcp login\`，也不要 API key。连上后问「How do I send an SMS with Twilio?」，模型应先走搜索工具，再按需要用取回工具拉完整参数 / 响应 schema。不要把工具名写成双下划线那种内部拼接，会话里点名服务器 \`twilio-docs\` 即可。

这台只读：索引公开 OpenAPI、Twilio / SendGrid / Segment 文档。**不会**用你的账号发短信、扣费或改资源。官方路线图里的「可执行、要 OAuth 的 API 工具」还没来，不要当成已经能代你打 Twilio API。多版本接口（例如 Messaging 的 \`v2010\` 和 \`v1\`）默认给最新版；要旧版再让模型按版本过滤。

技能是另一条路，和 MCP 互补：技能管选品 / 架构 / 坑，MCP 管精确参数。Codex 主路径是 TUI \`/plugins\` 或桌面 Plugins 搜 Twilio developer kit 再安装。GitHub 官方仓库给的纯技能回退是：

\`\`\`bash
git clone https://github.com/twilio/ai.git
cp -r ai/skills/ ~/.agents/skills/
\`\`\`

不要把整个仓库 clone 进 \`.agents/skills/\` 根目录，也不要手拷到 \`~/.codex/skills\`。不要抄 Claude 的 \`claude plugin install twilio-developer-kit\`、\`/plugin marketplace add twilio/ai\`，也不要抄 Cursor 的 \`/add-plugin twilio-developer-kit\`。那些会改别的客户端，不是 Codex \`/plugins\`。

不要做这些：

- 不要抄 Claude 的 \`--transport http\` 或 \`claude mcp add -- npx -y @anthropic-ai/mcp-remote\`。Codex 自己会连 Streamable HTTP。
- 不要抄 \`mcpServers\` JSON。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。文档检索会进上下文，生成出来的短信 / 语音代码仍要人审。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get twilio-docs\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Twilio", "文档", "HTTP"],
    related: ["mcp-add-and-login", "mcp-openai-docs", "skill-installer"],
    sources: [
      {
        label: "Twilio · MCP server",
        url: "https://www.twilio.com/docs/ai/mcp",
      },
      {
        label: "Twilio · Skills",
        url: "https://www.twilio.com/docs/ai/skills",
      },
      {
        label: "twilio/ai",
        url: "https://github.com/twilio/ai",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "shopify-ai-toolkit",
    no: 299,
    title: "Shopify AI Toolkit 用 plugin add shopify@openai-curated，不要抄 Claude 插件名",
    summary:
      "官方推荐：codex plugin add shopify@openai-curated。只要文档/校验才走本地 shopify-dev-mcp。不要抄 Claude 的 shopify-ai-toolkit@claude-plugins-official，也不要把 npx skills add 当会自动更新的安装器。",
    body: `Shopify AI Toolkit 官方给 Codex 的**推荐路径**是装插件（文档检索、API schema、GraphQL / Liquid / 扩展校验，以及经 Shopify CLI 的店铺任务）。插件会随发布自动更新：

\`\`\`bash
codex plugin add shopify@openai-curated
codex plugin list
\`\`\`

插件 id 是 \`shopify@openai-curated\`。TUI \`/plugins\` 或桌面 Plugins 搜 Shopify 再装，效果一样。0.154 起先在**当前会话**看 \`/plugins\`；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用下面的 MCP 回退。需要 Node.js 18+。

只要开发者文档和 schema、不要整包插件时，官方 Codex 节是本地 stdio，无鉴权：

\`\`\`bash
codex mcp add shopify-dev-mcp -- npx -y @shopify/dev-mcp@latest
\`\`\`

\`\`\`toml
[mcp_servers.shopify-dev-mcp]
command = "npx"
args = ["-y", "@shopify/dev-mcp@latest"]
enabled = true
startup_timeout_sec = 60
\`\`\`

用户层表名官方就是带连字符的 \`shopify-dev-mcp\`（这不是插件 \`mcp.json\`，#33063 那套连字符问题不套这里）。冷 \`npx\` 握手默认 10 秒不够，先把 \`startup_timeout_sec\` 提到 30–60。这台**不会**登录你的店铺；改生产店铺仍走 Shopify CLI 的已认证上下文，不要把 Dev MCP 当成 Admin API 钥匙。

技能回退 \`npx skills add Shopify/shopify-ai-toolkit\` **不会**随仓库自动更新，官方明确说要自己拉。那是给所有检测到的客户端拷 SKILL.md，不是 Codex \`/plugins\`。不确定就别跑。也不要手拷到 \`~/.codex/skills\`。

遥测默认开。技能脚本和 MCP 子进程可能把检索词、校验代码片段送去 \`shopify.dev/mcp/usage\`。\`OPT_OUT_INSTRUMENTATION=true\` 只在子进程真继承到环境时有效；Codex \`exec\` 和从 Dock 拉起的桌面常常没有。官方推荐放一个空文件：

\`\`\`bash
mkdir -p ~/.config/shopify-ai-toolkit && touch ~/.config/shopify-ai-toolkit/opt-out
\`\`\`

不要做这些：

- 不要抄 Claude 的 \`claude plugin install shopify-ai-toolkit@claude-plugins-official\`。Codex 插件 id 是 \`shopify@openai-curated\`。
- 不要抄 Cursor 的 \`/add-plugin shopify\`。
- 不要抄 Claude 的 \`--transport stdio\` 或 \`mcpServers\` JSON。
- 不要把 Windows 的 \`cmd /k npx\` 包装抄进 WSL。
- 不要给 Dev MCP \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。扩展迁移和店铺命令仍要人审。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex plugin list\` 看 \`shopify@openai-curated\`，或 \`codex mcp get shopify-dev-mcp\` 看 command 是 npx。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "Shopify", "MCP", "Skills"],
    related: ["cloudflare-skills-plugin", "mcp-add-and-login", "plugin-session-refresh"],
    sources: [
      {
        label: "Shopify · AI Toolkit",
        url: "https://shopify.dev/docs/apps/build/ai-toolkit",
      },
      {
        label: "Shopify/shopify-ai-toolkit",
        url: "https://github.com/Shopify/shopify-ai-toolkit",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-resend-remote",
    no: 300,
    title: "Resend 先 Plugins 搜 Resend，远程 MCP 用 mcp.resend.com/mcp",
    summary:
      "插件优先：TUI /plugins 或桌面 Plugins 搜 Resend。只要 MCP：codex mcp add resend --url https://mcp.resend.com/mcp。无头才 bearer_token_env_var。不要把密钥写进 --env 或 http_headers，也不要抄 Claude / Cursor 插件命令。",
    body: `Resend 官方给 Codex 的**推荐路径**是装插件（远程 MCP + 全部技能：SDK、React Email、投递最佳实践、入站邮件、CLI）。官方没给出 \`codex plugin add …\` 那种带 marketplace 的 id，不要自己编。TUI \`/plugins\` 或桌面 Plugins 搜 Resend，点 Connect，用 Resend 账号做 OAuth。0.154 起先在**当前会话**看 \`/plugins\`；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用下面的 MCP。授权可在 Resend 账号的 Team settings 撤销。

只要 MCP、不要整包插件时，官方 Codex 节是托管 Streamable HTTP。地址是 \`https://mcp.resend.com/mcp\`，**有** \`/mcp\` 后缀（不要按 Stripe 那种无后缀去改）：

\`\`\`bash
codex mcp add resend --url https://mcp.resend.com/mcp
codex mcp get resend
\`\`\`

\`\`\`toml
[mcp_servers.resend]
url = "https://mcp.resend.com/mcp"
enabled = true
\`\`\`

连上时客户端会开浏览器登录 Resend。若 add 完还没票，再 \`codex mcp login resend\`。用户层表名官方就是 \`resend\`（这不是插件 \`mcp.json\`）。插件已经带了 MCP 时，不要再 \`mcp add\` 同一张表。

无头、CI、没有浏览器的环境才改 Bearer。键里填变量**名**，变量必须在**启动 Codex 的那个进程**里。不要和已经 login 的 OAuth 写在同一张表：

\`\`\`toml
[mcp_servers.resend]
url = "https://mcp.resend.com/mcp"
bearer_token_env_var = "RESEND_API_KEY"
enabled = true
\`\`\`

不要把 \`re_\` 开头的密钥写进 \`--env\`、\`http_headers\`、URL 或命令行。官方 Codex 本地示例用 \`--env RESEND_API_KEY=\` 把密钥贴进命令，**不要抄**。Bearer 服务器没有 OAuth 流程，不要对这张表跑 \`mcp login\`。

本地 stdio 回退（自己跑 NPM 包 \`resend-mcp\`）才用 npx。密钥用 \`env_vars\` 转发名字，不要写进 \`env\` 表或 \`args\`：

\`\`\`bash
codex mcp add resend -- npx -y resend-mcp
\`\`\`

\`\`\`toml
[mcp_servers.resend]
command = "npx"
args = ["-y", "resend-mcp"]
env_vars = ["RESEND_API_KEY"]
enabled = true
startup_timeout_sec = 60
\`\`\`

不要在 \`args\` 里加 \`--key\`。冷 \`npx\` 握手默认 10 秒不够，先把 \`startup_timeout_sec\` 提到 30–60。可选的发件人、回复地址用进程环境 \`SENDER_EMAIL_ADDRESS\` / \`REPLY_TO_EMAIL_ADDRESSES\`，同样进 \`env_vars\`，不要写成字面量。不要把本机 \`npx -y resend-mcp --http --port 3000\` 当成托管地址。

技能已经打进插件。只配了 MCP 才需要 \`npx skills add resend/resend-skills\`。那条会改**所有检测到的客户端**，不是 Codex \`/plugins\`。不确定就别跑。也不要手拷到 \`~/.codex/skills\`。

不要做这些：

- 不要抄 Claude 的 \`claude plugin install resend@claude-plugins-official\`，也不要抄它的 \`--transport http\` 或 \`--header Authorization: Bearer\`。
- 不要抄 Cursor 的 \`/add-plugin resend\`，也不要抄 \`mcpServers\` JSON。
- 不要抄 Copilot / Zed / OpenCode 的 JSON。
- 不要给它 \`required = true\` 挂全局。发信、改域名、转 API key 不是每条会话都要的依赖。
- 不要一上来 \`--yolo\`。这台会真发信、改 DNS、轮转密钥。
- 不要和已经 login 的 OAuth 再写 \`bearer_token_env_var\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 用 Plugins 搜 Resend。改完新开会话，用 \`codex mcp get resend\` 看传输是 streamable_http，或 \`codex plugin list\` 看插件是否已装。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Resend", "plugins", "OAuth", "Skills"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "shopify-ai-toolkit"],
    sources: [
      {
        label: "Resend · MCP Server",
        url: "https://resend.com/docs/knowledge-base/mcp-server",
      },
      {
        label: "Resend · Codex",
        url: "https://resend.com/codex",
      },
      {
        label: "Resend · Codex plugin",
        url: "https://resend.com/changelog/codex-plugin",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "railway-skills-plugin",
    no: 301,
    title: "Railway 先 Plugins 搜 Railway，源仓才 railwayapp/railway-skills",
    summary:
      "公共目录：TUI /plugins 或桌面 Plugins 搜 Railway，OAuth 后新开会话。源仓才 codex plugin marketplace add railwayapp/railway-skills。不要抄 Claude 的 railway@claude-plugins-official，也不要把 curl agents.railway.com 当 Codex 唯一路径。",
    body: `Railway 官方给 Codex 的**推荐路径**是公共插件目录（捆绑 \`use-railway\` 技能 + 托管 MCP）。官方没给出 \`codex plugin add railway@…\` 那种带 marketplace 的 id，不要自己编。TUI \`/plugins\` 或桌面 Plugins 搜 Railway，点安装，用 Railway 账号做 OAuth。装完**新开会话**。0.154 起也可以先在当前会话看 \`/plugins\`；当前会话没有再新开。IDE 扩展没有 \`/plugins\`。

要从源仓库装（跟公共目录那份不完全同一条发布线）时，先加 marketplace，再进 \`/plugins\` 选 Railway marketplace 里的 Railway 插件：

\`\`\`bash
codex plugin marketplace add railwayapp/railway-skills
codex plugin list
\`\`\`

不要把 Claude 的 \`/plugin marketplace add\` / \`/plugin install railway@railway-skills\` 抄进 Codex。Codex 是 \`codex plugin marketplace add\`，装插件仍走 \`/plugins\`。清单写明安装时要授权。

插件会登记托管 MCP，地址是 \`https://mcp.railway.com\`，**没有** \`/mcp\` 后缀（不要按 Resend 那种带后缀去改）。这是插件 \`mcp.json\` 里的 HTTP 服务器，不是你手写的用户层表。插件已经带了 MCP 时，不要再 \`codex mcp add railway\`。网页 Cloud 用 Plugins 搜 Railway，不读 \`~/.codex/config.toml\`。

\`use-railway\` 覆盖建项目、部署、日志、环境变量、域名、数据库和存储桶。技能会在你说「部署到 Railway」时自己被选中，不必先手敲技能名。

不要做这些：

- 不要抄 Claude 的 \`/plugin install railway@claude-plugins-official\`，也不要抄 \`/plugin install railway@railway-skills\`。
- 不要抄 Cursor 的 \`/add-plugin railway\`。
- 不要把 \`curl -fsSL agents.railway.com | sh\` 或 \`railway setup agent\` 当成 Codex 唯一主路径。那条会改**所有检测到的客户端**，还会装 CLI。
- 不要用 \`npx skills add railwayapp/railway-skills\` 当插件安装器。那只会拷 SKILL.md，不会按 Codex 插件去登记托管 MCP。不确定就别跑。也不要手拷到 \`~/.codex/skills\`。
- 不要给它 \`required = true\` 挂全局。部署、改域名、改环境变量不是每条会话都要的依赖。
- 不要一上来 \`--yolo\`。这台会真部署、改 DNS、改密钥。

改完用 \`codex plugin list\` 看 Railway 是否已装；当前会话没有就新开。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Railway", "MCP", "Skills"],
    related: ["cloudflare-skills-plugin", "plugin-session-refresh", "mcp-resend-remote"],
    sources: [
      {
        label: "Railway · Codex plugin",
        url: "https://docs.railway.com/ai/codex-plugin",
      },
      {
        label: "railwayapp/railway-skills",
        url: "https://github.com/railwayapp/railway-skills",
      },
      {
        label: "Railway · Agent skills",
        url: "https://docs.railway.com/ai/agent-skills",
      },
    ],
  },
  {
    id: "mongodb-agent-skills",
    no: 302,
    title: "MongoDB 自建用 marketplace add mongodb/agent-skills，Atlas 托管搜 mongodb-atlas",
    summary:
      "Atlas 托管：/plugins 搜 mongodb-atlas，走 OAuth。自建才 codex plugin marketplace add mongodb/agent-skills，再装 mongodb 插件，然后用 env_vars 配 MCP。不要把连接串写进 args，也不要抄 Claude / Cursor 插件命令。",
    body: `MongoDB 给 Codex 两条线，不要混成一台服务器。

**Atlas 托管 MCP（推荐连 Atlas 集群）：** TUI \`/plugins\` 或桌面 Settings → Plugins 搜 \`mongodb-atlas\` / MongoDB Atlas，点安装，走 Atlas OAuth。官方没给出 \`codex plugin add mongodb-atlas@…\` 那种 id，不要自己编。组织管理员要先打开 AI Clients，否则成员连不上。装完新开会话。0.154 起也可以先看当前会话。这台**不要**再手写 \`mongodb-atlas-mcp-remote\`。

**自建 / 连接串（Community、Enterprise Advanced、或任何能连上的部署）：** 官方 Codex 页是加 marketplace，再在 \`/plugins\` 的 MongoDB Agent Skills 里装 \`mongodb\` 插件：

\`\`\`bash
codex plugin marketplace add mongodb/agent-skills
codex plugin list
\`\`\`

装完**还要**配 MCP，技能才能连库。可用插件自带的 \`mongodb-mcp-setup\` 技能走一遍，或手写用户层表。Node.js 要 22.12.0 以上。密钥用 \`env_vars\` 转发名字，不要写进 \`env\` 表或 \`args\`。\`--connectionString\` 已弃用。默认先加 \`--readOnly\`：

\`\`\`bash
codex mcp add mongodb -- npx -y mongodb-mcp-server@latest --readOnly
\`\`\`

\`\`\`toml
[mcp_servers.mongodb]
command = "npx"
args = ["-y", "mongodb-mcp-server@latest", "--readOnly"]
env_vars = ["MDB_MCP_CONNECTION_STRING"]
enabled = true
startup_timeout_sec = 60
\`\`\`

从已经 \`export MDB_MCP_CONNECTION_STRING\` 的终端启动 Codex。Dock 打开的桌面没有你刚 export 的变量。冷 \`npx\` 握手把 \`startup_timeout_sec\` 提到 30–60。

Atlas **服务账号**（不是普通 Atlas API key）走 \`MDB_MCP_API_CLIENT_ID\` / \`MDB_MCP_API_CLIENT_SECRET\`，同样进 \`env_vars\`。不要抄官方 get-started 里那份 heredoc：它会在生成 TOML 时把密钥写进 \`config.toml\`。也不要在 \`env\` 表里写字面量 \`$CLIENT_ID\`。

不要做这些：

- 不要抄 Claude 的 \`/plugin install mongodb-atlas@claude-plugins-official\` 或 \`/plugin install mongodb\`。
- 不要抄 Cursor 的 \`/add-plugin mongodb-atlas\` 或 \`/add-plugin mongodb\`。
- 不要用 \`npx skills add mongodb/agent-skills\` 当 Codex 插件安装器。那只会拷 SKILL.md。也不要手拷 \`.codex-plugin/\` 到仓库根。
- 不要把 \`npx mongodb-mcp-server@latest setup\` 当成 Codex 唯一主路径。那条向导常写出 JSON，不是 \`config.toml\`。
- 不要给它 \`required = true\` 挂全局。不要一上来 \`--yolo\`。没加 \`--readOnly\` 时这台会写库。
- 不要把 \`mongodb-atlas\` 插件和本地 \`[mcp_servers.mongodb]\` 当成同一张表。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 用 Plugins 搜 MongoDB Atlas。改完用 \`codex plugin list\` 和 \`codex mcp get mongodb\` 核对。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "MongoDB", "MCP", "Skills"],
    related: ["railway-skills-plugin", "mcp-stdio-env-vars", "plugin-session-refresh"],
    sources: [
      {
        label: "MongoDB · Codex",
        url: "https://www.mongodb.com/docs/codex/",
      },
      {
        label: "MongoDB · MCP Server Get Started",
        url: "https://www.mongodb.com/docs/mcp-server/get-started/",
      },
      {
        label: "mongodb/agent-skills",
        url: "https://github.com/mongodb/agent-skills",
      },
    ],
  },
  {
    id: "mcp-clickhouse-cloud",
    no: 303,
    title: "ClickHouse Cloud MCP 用 mcp.clickhouse.cloud/mcp，不要抄 Claude 的 --transport http",
    summary:
      "先在 Cloud 控制台给服务打开 MCP。CLI：codex mcp add clickhouse-cloud --url https://mcp.clickhouse.cloud/mcp，再 OAuth。公共目录也可 /plugins 搜 ClickHouse。不要抄 Claude 的 --transport http，也不要和 clickstack 端点搞混。",
    body: `ClickHouse Cloud 远程 MCP 要先在控制台打开：服务 → Connect → Connect with MCP，打开开关。地址是 \`https://mcp.clickhouse.cloud/mcp\`，**有** \`/mcp\` 后缀。鉴权是 OAuth，不要造 API key。

官方 Codex 节就是：

\`\`\`bash
codex mcp add clickhouse-cloud --url https://mcp.clickhouse.cloud/mcp
codex mcp get clickhouse-cloud
\`\`\`

\`\`\`toml
[mcp_servers.clickhouse-cloud]
url = "https://mcp.clickhouse.cloud/mcp"
enabled = true
\`\`\`

连上时会开浏览器登录 ClickHouse Cloud。若 add 完还没票，再 \`codex mcp login clickhouse-cloud\`。用户层表名官方就是带连字符的 \`clickhouse-cloud\`（这不是插件 \`mcp.json\`）。访问范围跟你这个 Cloud 账号能看到的组织和服一致。

ChatGPT Work / Codex 公共插件目录里也有 ClickHouse 插件，捆绑这台远程 MCP 和 Agent Skills。TUI \`/plugins\` 或桌面 Plugins 搜 ClickHouse 再装，效果是连 MCP 并带上技能。官方没给 \`codex plugin add clickhouse@…\` 那种 id，不要自己编。插件已经带了 MCP 时，不要再 \`mcp add\` 同一张表。

\`run_select_query\` 只接受 \`SELECT\`。官方写明插件里的工具都是只读，改不了数据和服配置。自建集群不要用这台 Cloud 端点。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http clickhouse-cloud https://mcp.clickhouse.cloud/mcp\`。Codex 是 \`add\` 名字 \`--url\` 地址。
- 不要抄 Windsurf 的 \`npx -y mcp-remote\`，也不要抄 Cursor / VS Code 的 JSON。
- 不要和 ClickStack 端点 \`https://mcp.clickhouse.cloud/clickstack\` 搞混。那是另一台。
- 不要把 Sequel 的 \`api.sequel.sh/mcp\` 当成 ClickHouse 官方路径。
- 不要抄本地 \`uv run\` 示例里的 \`--env CLICKHOUSE_PASSWORD=\`。自建 stdio 才用 \`mcp-clickhouse\`，密钥走 \`env_vars\`。
- 不要用 \`npx skills add clickhouse/agent-skills\` 当 Codex 插件安装器。那会改所有检测到的客户端，还可能写进 \`~/.codex/skills\`（Codex 主路径是 \`~/.agents/skills\`）。
- 不要给它 \`required = true\` 挂全局。不要一上来 \`--yolo\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 用 Plugins 搜 ClickHouse。改完新开会话，用 \`codex mcp get clickhouse-cloud\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "ClickHouse", "OAuth", "plugins"],
    related: ["mcp-add-and-login", "mcp-resend-remote", "mongodb-agent-skills"],
    sources: [
      {
        label: "ClickHouse · Remote MCP",
        url: "https://clickhouse.com/docs/products/cloud/features/ai-ml/mcp/remote-mcp",
      },
      {
        label: "ClickHouse · ChatGPT Data plugin",
        url: "https://clickhouse.com/blog/chatgpt-data-plugin",
      },
      {
        label: "ClickHouse/agent-skills",
        url: "https://github.com/ClickHouse/agent-skills",
      },
    ],
  },
  {
    id: "mcp-render-remote",
    no: 304,
    title: "Render MCP 用 mcp.render.com/mcp，插件优先，手写必须带 --oauth-client-id codex",
    summary:
      "插件优先：TUI /plugins 或桌面 Plugins 搜 Render。只要 MCP：codex mcp add render --url https://mcp.render.com/mcp --oauth-client-id codex。CI 才 bearer_token_env_var。不要把密钥写进 http_headers，也不要抄 Claude / Cursor 插件命令。",
    body: `Render 官方给 Codex 的**推荐路径**是公共插件目录（捆绑技能 + 托管 MCP）。官方没给出 \`codex plugin add render@…\` 那种带 marketplace 的 id，不要自己编。TUI \`/plugins\` 或桌面 Plugins 搜 Render，点安装。新开会话后第一次用 Render 工具时会开浏览器做 OAuth，不需要 Render API key。0.154 起也可以先看当前会话；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用下面的手写 MCP。

只要 MCP、不要整包插件时，官方 Codex 节是托管 Streamable HTTP。地址是 \`https://mcp.render.com/mcp\`，**有** \`/mcp\` 后缀。OAuth 客户端 id 官方预注册成字面量 \`codex\`，必须带上，不要改成自己的应用 id：

\`\`\`bash
codex mcp add render --url https://mcp.render.com/mcp --oauth-client-id codex
codex mcp get render
\`\`\`

\`\`\`toml
[mcp_servers.render]
url = "https://mcp.render.com/mcp"
enabled = true

[mcp_servers.render.oauth]
client_id = "codex"
\`\`\`

若 add 完还没票，再 \`codex mcp login render\`。用户层表名官方就是 \`render\`（这不是插件 \`mcp.json\`）。插件已经带了 MCP 时，不要再 \`mcp add\` 同一张表。

先让它选定工作区，再让它列服务或部署。可以跟它说「把 Render 工作区设成某某」。没选工作区时，多数工具会停下来问你。

无头、CI、没有浏览器的环境才改 Bearer。键里填变量**名**，变量必须在**启动 Codex 的那个进程**里。不要和已经 login 的 OAuth 写在同一张表：

\`\`\`bash
codex mcp add render --url https://mcp.render.com/mcp --bearer-token-env-var RENDER_API_KEY
\`\`\`

\`\`\`toml
[mcp_servers.render]
url = "https://mcp.render.com/mcp"
bearer_token_env_var = "RENDER_API_KEY"
enabled = true
\`\`\`

从已经 \`export RENDER_API_KEY\` 的终端启动 Codex。Dock 打开的桌面没有你刚 export 的变量。Bearer 这张表不要再跑 \`mcp login\`。

不要做这些：

- 不要抄 Claude 的 \`/plugin install render@claude-plugins-official\`。
- 不要抄 Cursor 的 \`/add-plugin render\`。
- 不要抄 Claude Desktop 的 \`npx mcp-remote\`，也不要抄 Cursor / VS Code 的 JSON。
- 不要抄官方 API key 页那份把 \`Authorization\` 写进 \`http_headers\` 的 TOML。那会把密钥落进 \`config.toml\`。Codex 无头路径是 \`bearer_token_env_var\`。
- 不要用 \`npx skills add render-oss/skills\` 当 Codex 插件安装器。那会改所有检测到的客户端，还可能写进 \`~/.codex/skills\`（Codex 主路径是 \`~/.agents/skills\`）。
- 不要把维护者那套 \`rsync\` 到 \`~/.codex/plugins/render\` 当普通安装路径。
- 不要把 \`brew install render\` 当成 MCP。那是 Render CLI，部署工作流才需要。
- 不要和 Railway 的 \`mcp.railway.com\`（没有 \`/mcp\` 后缀）搞混。
- 不要默认跑本地 Docker / 可执行文件。官方强烈建议用托管端点，本地只在你真有这个需求时才用。
- 不要给它 \`required = true\` 挂全局。不要一上来 \`--yolo\`。这台会改环境变量、触发部署。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 用 Plugins 搜 Render。改完用 \`codex mcp get render\` 看传输是 streamable_http；插件路径用 \`codex plugin list\`。连上后先让它跑 \`list_workspaces\`。OAuth 若报缺 issuer，把 Codex 升到 0.147 或更新。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Render", "OAuth", "plugins"],
    related: ["mcp-add-and-login", "mcp-resend-remote", "railway-skills-plugin"],
    sources: [
      {
        label: "Render · Codex CLI",
        url: "https://render.com/agents/codex",
      },
      {
        label: "Render · MCP Server",
        url: "https://render.com/docs/mcp-server",
      },
      {
        label: "renderinc/render-codex-plugin",
        url: "https://github.com/renderinc/render-codex-plugin",
      },
    ],
  },
  {
    id: "convex-codex-plugin",
    no: 305,
    title: "Convex 完整插件用 get-convex/convex-codex-plugin，不要把 openai-curated 当完整版",
    summary:
      "完整版：codex plugin marketplace add get-convex/convex-codex-plugin，再 plugin add convex@convex-codex-plugin。openai-curated 只是轻量连接器。插件已带 MCP 时不要再 mcp add。不要抄 Claude 或 Cursor 的插件命令。",
    body: `Convex 给 Codex 两条插件线，不要混成一份。

**完整现行构建（官方 GitHub 写「用这个」）：** 先加 marketplace，再装插件。id 是 \`convex@convex-codex-plugin\`。这会带上全部技能、\`convex-expert\` / \`convex-reviewer\` 子代理、官方 Convex MCP，以及运行时错误监视：

\`\`\`bash
codex plugin marketplace add get-convex/convex-codex-plugin
codex plugin add convex@convex-codex-plugin
codex plugin list
\`\`\`

\`codex plugin list\` 里应看到 \`convex@convex-codex-plugin\`。之后用 \`codex plugin marketplace upgrade\`，再跑一次 \`plugin add\`。0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace.json 仍要重启应用。

**公共目录 \`convex@openai-curated\`：** \`codex plugin add convex@openai-curated\` 能装，但官方文档写明这是较轻的 ChatGPT 应用连接器，审核快照会落后仓库 HEAD。若装完没有技能或 MCP，先 \`codex plugin remove convex@openai-curated\`，再改走上面的 marketplace。不要以为 \`/plugins\` 搜 Convex 一定是完整版。

插件已经登记 MCP 时，不要再手写同一张用户层表。技能名包括 \`quickstart\`、\`add\`、\`convex-expert\`、\`convex-reviewer\`。项目根可跑 \`npx convex ai-files install\`，它会维护 \`AGENTS.md\` 里的 Convex 段，并把技能写进 \`.agents/skills/\`。

只有插件装不上时，才手写 stdio MCP（这是本地 \`npx convex mcp start\`，**不是**远程 URL）：

\`\`\`bash
codex mcp add convex -- npx -y convex@latest mcp start
\`\`\`

\`\`\`toml
[mcp_servers.convex]
command = "npx"
args = ["-y", "convex@latest", "mcp", "start"]
enabled = true
startup_timeout_sec = 60
\`\`\`

默认连开发部署。不要把 \`--dangerously-enable-production-deployments\` 写进默认 args。要收窄生产权限才加 \`--disable-tools\`。把访问限制在某一台部署时，用 \`env_vars\` 转发 \`CONVEX_DEPLOY_KEY\`，不要把 deploy key 写进 \`args\` 或 \`env\` 表。关掉插件匿名遥测：启动 Codex 的进程里设 \`CONVEX_PLUGIN_TELEMETRY=0\` 或 \`DO_NOT_TRACK=1\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 用 Plugins；setup 脚本常用 \`npm i\` 再 \`npx convex dev --once\`（非交互会起本地 backend，需要完整联网）。

不要做这些：

- 不要抄 Claude 或 Cursor 的 plugin install / \`/add-plugin convex\`。
- 不要用 \`npx skills add\` 当 Codex 插件安装器，也不要手拷到 \`~/.codex/skills\`。
- 不要发明 \`https://mcp.convex.dev\` 这种托管 MCP 再 \`mcp add --url\`。官方 MCP 是本地 stdio。
- 不要抄 \`mcp-remote\`。
- 不要给它 \`required = true\` 挂全局。不要一上来 \`--yolo\`。这台能跑函数、改环境变量。
- 不要把 \`openai-curated\` 和 marketplace 两份同时装成两套 Convex。

改完用 \`codex plugin list\` 核对来源是 \`convex-codex-plugin\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "Convex", "MCP", "Skills"],
    related: ["shopify-ai-toolkit", "railway-skills-plugin", "plugin-session-refresh"],
    sources: [
      {
        label: "Convex · Using Codex",
        url: "https://docs.convex.dev/ai/using-codex",
      },
      {
        label: "get-convex/convex-codex-plugin",
        url: "https://github.com/get-convex/convex-codex-plugin",
      },
      {
        label: "Convex · MCP Server",
        url: "https://docs.convex.dev/ai/convex-mcp-server",
      },
    ],
  },
  {
    id: "mcp-mixpanel-remote",
    no: 306,
    title: "Mixpanel MCP 用 mcp.mixpanel.com/mcp 再 login，服务账号不要抄 headers 密钥",
    summary:
      "CLI：codex mcp add mixpanel --url https://mcp.mixpanel.com/mcp，再 mcp login。EU/IN 换区域主机。CI 用 env_http_headers。不要抄官方 headers 密钥、Claude 的 --transport http 或 Cursor 的 mcp-remote。",
    body: `Mixpanel 托管的是远程 Streamable HTTP。官方 Codex CLI 节只写了手写 TOML；本机等价命令是：

\`\`\`bash
codex mcp add mixpanel --url https://mcp.mixpanel.com/mcp
codex mcp login mixpanel
\`\`\`

\`\`\`toml
[mcp_servers.mixpanel]
url = "https://mcp.mixpanel.com/mcp"
enabled = true
\`\`\`

地址**有** \`/mcp\` 后缀。EU 换成 \`https://mcp-eu.mixpanel.com/mcp\`，印度换成 \`https://mcp-in.mixpanel.com/mcp\`。同名表再 \`mcp add\` 一次会覆盖，然后重新授权。桌面走 Settings → MCP Servers → Add Server，传输选 Streamable HTTP，填同一条 URL。

多数账号要组织管理员先在 Settings → Org → Overview 打开 MCP。2026 年 8 月 1 日之后新建的 Free / Growth 默认已开，管理员仍可关掉。改完最多等 15 分钟。报 MCP access is not enabled 时先查这一项，不要重装客户端。权限跟你登录的 Mixpanel 账号走，MCP 不会多给你项目。

这台能读也能改：看板、Lexicon、cohort、实验和功能开关都在工具表里。不是生产埋点入口，也不是只读文档。保持工具批准。不要一上来 \`--yolo\`。Mixpanel 写明 MCP 目前不覆盖 HIPAA BAA。每用户大约 600 次请求/小时。

无头 / CI 才用服务账号（Beta）。官方 Codex CLI 示例把 \`headers = { Authorization = "Bearer Basic …" }\` 写进 \`config.toml\`，**不要抄**：\`headers\` 不是 Codex 键，密钥还会进仓库。Codex 用 \`env_http_headers\`，左边是头名，右边是启动 Codex 那个进程里的变量**名**。头值必须是完整的 \`Bearer Basic \` 加上 \`用户名:secret\` 的 base64，缺 \`Basic \` 会 401：

\`\`\`toml
[mcp_servers.mixpanel]
url = "https://mcp.mixpanel.com/mcp"
enabled = true

[mcp_servers.mixpanel.env_http_headers]
Authorization = "MIXPANEL_MCP_AUTHORIZATION"
\`\`\`

\`\`\`bash
export MIXPANEL_MCP_AUTHORIZATION="Bearer Basic $(printf '%s:%s' "$MIXPANEL_SA_USER" "$MIXPANEL_SA_SECRET" | base64 | tr -d '\\n')"
\`\`\`

从已经 export 的终端启动 \`codex\`。Dock / 开始菜单打开的桌面没有 zshrc。Codex 不读 \`.env\`。变量缺失时这颗头会被静默丢掉。不要用 \`bearer_token_env_var\` 只塞那段 base64：它会发出 \`Authorization: Bearer …\`，这里要的是 \`Bearer Basic …\`。服务账号路径不要再跑 \`mcp login\`。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http mixpanel …\`，也不要抄 \`claude plugin marketplace add mixpanel/ai-plugins\`。那是 Claude 插件，不是 Codex 命令。
- 不要抄 Cursor / Gemini 的 \`npx mcp-remote\`。Codex 自己连 HTTP。
- 不要发明 \`https://mcp.mixpanel.com\` 这种不带 \`/mcp\` 的地址，也不要发明 \`codex plugin add mixpanel@…\`。
- 不要把 Mixpanel Headless Python SDK 当这台 MCP。Headless 是另一条编码入口。
- 不要给它 \`required = true\` 挂全局。也不要和 Amplitude / PostHog 那台分析 MCP 配成一台。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get mixpanel\` 看传输是 streamable_http。会话里 \`/mcp\` 只是核对工具，不是唯一登录入口。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Mixpanel", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-amplitude-remote", "mcp-http-env-headers"],
    sources: [
      {
        label: "Mixpanel · MCP Server",
        url: "https://docs.mixpanel.com/docs/mcp",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-algolia-productivity",
    no: 307,
    title: "Algolia Productivity MCP 用 mcp.algolia.com/mcp 再 login，不要和 DocSearch 搞混",
    summary:
      "CLI：codex mcp add algolia --url https://mcp.algolia.com/mcp，再 mcp login。先在控制台打开 Productivity MCP。只读。不要抄 Claude 的 --transport http，也不要和 DocSearch 或 Public MCP 配成一台。",
    body: `Algolia **Productivity** MCP 是远程 Streamable HTTP，给组织内部按你本人权限查索引和 analytics。官方 Codex 节是：

\`\`\`bash
codex mcp add algolia --url https://mcp.algolia.com/mcp
codex mcp login algolia
\`\`\`

\`\`\`toml
[mcp_servers.algolia]
url = "https://mcp.algolia.com/mcp"
enabled = true
\`\`\`

地址**有** \`/mcp\` 后缀。不要填 OAuth client id / secret；客户端问这两项就留空。先在 Algolia 控制台 Generative AI → MCP Servers → Productivity 打开开关。关掉会立刻停掉已连接的客户端。权限跟你登录的 Algolia 账号走。

这台是**只读**：能搜、看 facet、看推荐、跑 analytics（零结果、无点击、热门搜索等）。不能建索引、改记录或改设置。连上后仍把提示和输出当内部数据。不要给它 \`required = true\` 挂全局。

不要和另外两条 Algolia MCP 配成一台：

- **DocSearch MCP** 搜公开开发者文档，地址是 \`https://mcp.algolia.com/1/docsearch/mcp\`，无鉴权、进不了你的应用数据。另起表名，不要 \`mcp login\`。不要用 \`npx @docsearch/cli setup --codex\` 去覆盖上面这张 Productivity 表。
- **Public MCP** 对外暴露精选索引，URL 在控制台复制，形如应用主机 \`algolia.net\` 下面的 \`/mcp/1/…/mcp\`，无鉴权。官方没有 Codex 节，不要发明一条固定 \`mcp add\`。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http algolia …\`，也不要抄 \`claude plugin marketplace add algolia/skills\`。那是 Claude 插件。
- 不要用 \`npx skills add algolia/skills\` 当 Codex 插件安装器，也不要手拷到 \`~/.codex/skills\`。
- 不要抄 Cursor / VS Code 的 \`mcpServers\` JSON。
- 不要发明 \`codex plugin add algolia@…\`。
- 不要把 Algolia CLI（\`algolia auth login\`）当成这台 MCP。CLI 能改索引；这台 MCP 不能。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get algolia\` 看传输是 streamable_http。会话里 \`/mcp\` 只是核对工具，不是唯一登录入口。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Algolia", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-algolia-docsearch", "mcp-exa-remote"],
    sources: [
      {
        label: "Algolia · Productivity MCP",
        url: "https://www.algolia.com/doc/guides/model-context-protocol/productivity-mcp",
      },
      {
        label: "Algolia · MCP overview",
        url: "https://www.algolia.com/doc/guides/model-context-protocol",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "mcp-algolia-docsearch",
    no: 308,
    title: "DocSearch MCP 用 algolia-docsearch 表，不要覆盖 Productivity 那张 algolia",
    summary:
      "CLI：codex mcp add algolia-docsearch --url https://mcp.algolia.com/1/docsearch/mcp。无鉴权、只搜公开文档。安装器只用 --codex，不要 --all。不要 login，也不要和 Productivity 那张 algolia 表写成一台。",
    body: `Algolia **DocSearch** MCP 搜公开开发者文档（带出处），进不了你的 Algolia 应用数据。官方 Codex 配置段名是 \`algolia-docsearch\`。本机等价命令：

\`\`\`bash
codex mcp add algolia-docsearch --url https://mcp.algolia.com/1/docsearch/mcp
\`\`\`

\`\`\`toml
[mcp_servers.algolia-docsearch]
url = "https://mcp.algolia.com/1/docsearch/mcp"
enabled = true
\`\`\`

地址是 \`/1/docsearch/mcp\`，**不是** Productivity 那条。无鉴权，不要 \`codex mcp login\`，也不要 API key。用户层表名官方就是带连字符的 \`algolia-docsearch\`（这不是插件 \`mcp.json\`，#33063 那套连字符问题不套这里）。不要把这张表起名叫 \`algolia\`，否则会盖掉 Productivity。

安装器也能写这份配置，但只点 Codex，不要扫全部客户端：

\`\`\`bash
npx -y @docsearch/cli setup --global --codex --yes
\`\`\`

项目层改 \`--project\`。官方安装器碰到重复的 \`[mcp_servers.algolia-docsearch]\` 会停，不会偷偷覆盖。不要跑 \`--all\`，也不要加 \`--claude\` / \`--cursor\`。不要用它去改 Productivity 那张表。

连上后点名 DocSearch，例如问它找某份公开文档的现行段落。默认工具是一次性检索。Public Beta，免费、无 SLA，Algolia 可随时改或停。

不要做这些：

- 不要抄 Cursor / Claude 的 \`mcpServers\` JSON 或 \`--transport http\`。
- 不要抄 \`mcp-remote\`。
- 不要发明 \`codex plugin add algolia-docsearch@…\`。
- 不要给它 \`required = true\` 挂全局。公开文档检索不是每条会话的硬依赖。
- 不要和 Public MCP（控制台复制的应用主机）搞混。那是暴露你自己的索引。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get algolia-docsearch\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Algolia", "DocSearch", "HTTP"],
    related: ["mcp-algolia-productivity", "mcp-add-and-login", "mcp-exa-remote"],
    sources: [
      {
        label: "DocSearch · Install MCP",
        url: "https://docsearch.algolia.com/mcp/install",
      },
      {
        label: "DocSearch · Use MCP",
        url: "https://docsearch.algolia.com/docs/mcp/usage",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "temporal-codex-plugin",
    no: 309,
    title: "Temporal 插件走 /plugins 搜 temporal，不要发明 plugin add id",
    summary:
      "桌面 Plugins 或 TUI /plugins 搜 temporal。官方没给 plugin add id。Cloud 技能不在插件包。知识库 MCP 是 temporal.mcp.kapa.ai，没有 Codex 专节。不要抄 Claude 的 temporal@temporal-marketplace。",
    body: `Temporal 给 Codex 的主路径是公共插件目录（Public Preview）。官方没给出 \`codex plugin add temporal@…\` 那种带 marketplace 的 id，不要自己编成 \`temporal@openai-curated\`。

桌面：Plugins 搜 temporal，点 + 或 Add to Codex。CLI：\`/plugins\`，选 OpenAI Curated marketplace，搜 temporal，再安装。装完重启 Codex。0.154 起也可以先看**当前会话**；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用桌面、CLI，或下面的仓库回退。

插件里是技能，不是 Temporal Cloud 控制面，也没有捆绑 MCP。仓库现在带这四份：

- \`temporal-developer\`：工作流、Activity、Worker、确定性、版本和测试（Python / TypeScript / Go / Java）。
- \`temporal-ops\`（Public Preview）：用 \`temporal\` / \`tcld\` 查 Namespace、容量、卡住的 Workflow。斜杠命令 \`/temporal:temporal-ops\`。
- \`temporal-serverless\`（Public Preview）：Serverless Worker。斜杠命令 \`/temporal:temporal-serverless\`。
- \`temporal-cloud-setup\`：装 CLI、建 Namespace、跑第一个 Cloud Workflow。斜杠命令 \`/temporal:temporal-cloud-setup\`。

**Temporal Cloud 技能不在插件包里。** 官方单独写 \`npx skills add https://github.com/temporalio/skill-temporal-cloud\`，并点名 Codex；这条安装器可能改所有检测到的客户端，不是 \`/plugins\`。不确定就 clone 进仓库 \`.agents/skills/temporal-cloud\` 或 \`$CODEX_HOME/skills/temporal-cloud\`。官方手工示例写的是 \`~/.claude/skills\`，那是 Claude 路径，不要照抄。

仓库回退（官方 GitHub）：把 [temporalio/codex-temporal-plugin](https://github.com/temporalio/codex-temporal-plugin) clone 到项目根，再拷插件和 marketplace：

\`\`\`bash
mkdir -p .agents/plugins plugins
cp -r codex-temporal-plugin/plugins/temporal plugins/
cp codex-temporal-plugin/.agents/plugins/marketplace.json .agents/plugins/
\`\`\`

已经有 \`.agents/plugins/marketplace.json\` 时，只把这份里的 \`temporal\` 条目合并进现有 \`plugins\` 数组。重启后 marketplace 下拉从 OpenAI 切到 Temporal，再点 +。不要发明 \`codex plugin marketplace add temporalio/codex-temporal-plugin\`。

知识库 MCP 是另一条线：\`https://temporal.mcp.kapa.ai\`（**没有** \`/mcp\` 后缀）。官方只写了 Claude 的 \`--transport http\` 和「Other MCP-compatible tools」，**没有 Codex 专节**。它要 Google / GitHub 的 MCP OAuth，只读文档和社区知识，不能起 Workflow、改 Namespace。Codex 能原生 HTTP + login，可另起表名：

\`\`\`bash
codex mcp add temporal-docs --url https://temporal.mcp.kapa.ai
codex mcp login temporal-docs
\`\`\`

\`\`\`toml
[mcp_servers.temporal-docs]
url = "https://temporal.mcp.kapa.ai"
enabled = true
\`\`\`

表名跟 Claude 示例一致，避免和以后可能出现的 Temporal Cloud MCP 撞名。不要抄 \`mcp-remote\`。不要给它 \`required = true\` 挂全局。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add temporalio/claude-temporal-plugin\`，也不要抄 \`/plugin install temporal@temporal-marketplace\`。那是 Claude 插件 id。
- 不要抄 Cursor 的 \`/add-plugin temporal\`。
- 不要用 \`npx skills add\` 当 Codex 插件安装器，也不要手拷到 \`~/.codex/skills\`。
- 不要发明 \`codex plugin add temporal@openai-curated\` 或 \`temporal@temporal-marketplace\`。
- 不要把知识库 MCP 当成 Temporal Cloud 控制面，也不要一上来 \`--yolo\` 去跑 \`temporal\` / \`tcld\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 用 Plugins 搜 temporal。改完用 \`codex plugin list\` 核对已装；MCP 路径用 \`codex mcp get temporal-docs\` 看传输是 streamable_http。文档也可以直接拉 \`https://docs.temporal.io/llms.txt\` 或任意页面的 \`.md\`，不走 MCP。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "Temporal", "Skills", "MCP"],
    related: ["shopify-ai-toolkit", "plugin-session-refresh", "convex-codex-plugin"],
    sources: [
      {
        label: "Temporal · Develop with AI",
        url: "https://docs.temporal.io/with-ai",
      },
      {
        label: "temporalio/codex-temporal-plugin",
        url: "https://github.com/temporalio/codex-temporal-plugin",
      },
      {
        label: "OpenAI · Plugins",
        url: "https://learn.chatgpt.com/docs/plugins",
      },
    ],
  },
  {
    id: "mcp-newrelic-remote",
    no: 310,
    title: "New Relic MCP 用 mcp.newrelic.com/mcp/，OAuth 和 API key 不要写成两张表",
    summary:
      "官方推荐：codex mcp add new-relic-mcp-server --url https://mcp.newrelic.com/mcp/，再 mcp login。OAuth 失败才改走 new-relic 表的 env_http_headers api-key。不要抄 Claude 的 --transport http 或 mcp-remote，也不要把 NRAK 密钥写进 http_headers。",
    body: `New Relic 托管的是远程 Streamable HTTP，目前是 **Public Preview**。先在 New Relic UI 打开用户名 → Administration → Previews & Trials，打开 New Relic AI MCP Server。FedRAMP 账号禁止用这台。权限跟你登录的用户或 API key 走，先用最小 RBAC。

地址**有** \`/mcp/\` 尾斜杠。默认美区是 \`https://mcp.newrelic.com/mcp/\`。EU 换成 \`https://mcp.eu.newrelic.com/mcp/\`，日本换成 \`https://mcp.jp.newrelic.com/mcp/\`。

官方 Codex 节给了两条线，**表名不一样，不要两张一起开**：

**OAuth（官方写 recommended）：** 表名是带连字符的 \`new-relic-mcp-server\`（这是用户层表，不是插件 \`mcp.json\`）：

\`\`\`bash
codex mcp add new-relic-mcp-server --url https://mcp.newrelic.com/mcp/
codex mcp login new-relic-mcp-server
\`\`\`

\`\`\`toml
[mcp_servers.new-relic-mcp-server]
url = "https://mcp.newrelic.com/mcp/"
enabled = true
\`\`\`

若 \`mcp login\` 报 OAuth authorization endpoint origin does not match the authorization server origin without issuer-bound callbacks，那是 Codex 对 New Relic OAuth 元数据的校验（0.151 起有人踩过），不是你填错 URL。不要改抄 \`mcp-remote\`，也不要手填 overview 里的 OAuth client id。改走下面的 API key。

**API key：** 官方 Codex 示例表名是 \`new-relic\`，头名是 \`api-key\`（不是 \`Authorization\`）。密钥是用户 API key，形如 \`NRAK-\` 开头。Codex 用 \`env_http_headers\`，右边是启动 Codex 那个进程里的变量**名**：

\`\`\`toml
[mcp_servers.new-relic]
url = "https://mcp.newrelic.com/mcp/"
enabled = true

[mcp_servers.new-relic.env_http_headers]
api-key = "NEW_RELIC_API_KEY"
\`\`\`

从已经 \`export NEW_RELIC_API_KEY\` 的终端启动。Dock / 开始菜单打开的桌面没有 zshrc。Codex 不读 \`.env\`。变量缺失时这颗头会被静默丢掉。不要用 \`bearer_token_env_var\`：它会发出 \`Authorization: Bearer …\`，这里要的是 \`api-key\`。API key 这张表不要再跑 \`mcp login\`。

可选：用 \`http_headers\` 收窄工具（这不是密钥），例如 \`include-tags = "discovery,alerting"\`。标签还有 \`data-access\`、\`incident-response\`、\`performance-analytics\`、\`advanced-analysis\`。这台能查实体、告警、NRQL，不是只读文档。保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http newrelic …\`，也不要把 \`NRAK-\` 密钥写进 \`--header\`。
- 不要抄 Claude Desktop 的 \`npx mcp-remote\`。Codex 自己连 HTTP，也不需要为这条装 Node。
- 不要抄 Cursor / VS Code 的 \`mcpServers\` JSON，或把密钥写进 \`http_headers\`。
- 不要发明 \`codex plugin add newrelic@…\`。
- 不要把 OAuth 那张 \`new-relic-mcp-server\` 和 API key 那张 \`new-relic\` 配成两台。同名表再 \`mcp add\` 一次会覆盖。
- 不要和 Datadog 的 \`mcp.datadoghq.com\` 搞混。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get new-relic-mcp-server\` 或 \`codex mcp get new-relic\` 看传输是 streamable_http。会话里 \`/mcp\` 只是核对工具，不是唯一登录入口。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "New Relic", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-env-headers", "mcp-datadog-remote"],
    sources: [
      {
        label: "New Relic · Set up MCP",
        url: "https://docs.newrelic.com/docs/agentic-ai/mcp/setup/",
      },
      {
        label: "New Relic · MCP overview",
        url: "https://docs.newrelic.com/docs/agentic-ai/mcp/overview/",
      },
      {
        label: "openai/codex#41677",
        url: "https://github.com/openai/codex/issues/41677",
      },
    ],
  },
];
