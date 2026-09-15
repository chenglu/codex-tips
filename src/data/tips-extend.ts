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
      "US1：codex mcp add datadog --url https://mcp.datadoghq.com/v1/mcp，再 mcp login。Codex 用 http_headers 里的 X-Datadog-MCP-Toolsets，不要把 ?toolsets= 拼进 URL。这颗头是工具集名单，不是密钥。",
    body: `Datadog 托管的是远程 Streamable HTTP。地址按你登录 Datadog 的站点来，US1 现行入口是：

\`\`\`bash
codex mcp add datadog --url https://mcp.datadoghq.com/v1/mcp
codex mcp login datadog
\`\`\`

官方 Codex 页只示范了手写 \`~/.codex/config.toml\`，效果一样。路径停在 \`/v1/mcp\`，不要再抄旧的 \`/api/unstable/mcp-server/mcp\`，也不要改成 \`/sse\`。

\`\`\`toml
[mcp_servers.datadog]
url = "https://mcp.datadoghq.com/v1/mcp"
http_headers = { "X-Datadog-MCP-Toolsets" = "apm,llmobs" }
enabled = true
\`\`\`

\`X-Datadog-MCP-Toolsets\` 是工具集名单，例如 \`apm,llmobs\`、\`core,software-delivery\` 或 \`all\`（一般可用的全套）。这不是密钥，写进 \`http_headers\` 合法。其它客户端把 \`?toolsets=\` 拼进 URL；**Codex 要用这颗头**，不要把查询参数抄进 \`url\`。

其它站点把主机换成对应的 \`mcp.\` 前缀，路径仍是 \`/v1/mcp\`，再 \`mcp login\`：

- US3：\`https://mcp.us3.datadoghq.com/v1/mcp\`
- US5：\`https://mcp.us5.datadoghq.com/v1/mcp\`
- EU1：\`https://mcp.datadoghq.eu/v1/mcp\`
- AP1：\`https://mcp.ap1.datadoghq.com/v1/mcp\`
- AP2：\`https://mcp.ap2.datadoghq.com/v1/mcp\`
- UK1：\`https://mcp.uk1.datadoghq.com/v1/mcp\`

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
    related: ["mcp-add-and-login", "mcp-http-env-headers", "datadog-agent-skills"],
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
  {
    id: "mcp-typesense-cloud",
    no: 311,
    title: "Typesense Cloud MCP 用 cloud.typesense.org/mcp/v1，无头不要抄 --header 密钥",
    summary:
      "CLI：codex mcp add typesense-cloud --url https://cloud.typesense.org/mcp/v1，再 mcp login。授权页先选最小权限。无头才 bearer_token_env_var。不要抄 Claude 的 --transport http 或把密钥写进 --header。",
    body: `Typesense Cloud 托管的是远程 Streamable HTTP + OAuth。官方 Codex CLI 节是：

\`\`\`bash
codex mcp add typesense-cloud --url https://cloud.typesense.org/mcp/v1
codex mcp login typesense-cloud
\`\`\`

\`\`\`toml
[mcp_servers.typesense-cloud]
url = "https://cloud.typesense.org/mcp/v1"
enabled = true
\`\`\`

地址是 \`/mcp/v1\`，**不是** \`/mcp\`。用户层表名官方就是带连字符的 \`typesense-cloud\`（这不是插件 \`mcp.json\`）。浏览器会打开 Typesense Cloud 授权页：登录、选账号、选权限。一条连接绑一个账号；另一个账号用同一条 URL 另起表名再 login。团队账号里你只能勾自己角色已经有的权限。账号所有者会收到新连接邮件，可在 Account → Connected apps 断开。

授权页五个预设：Search only、Search and curate、Manage clusters、Build（默认）、Everything。Build 能管集群和里面的数据，但不能 terminate / clone / 读账单。Everything 才能删集群。\`manage_cluster\`、\`documents\`、\`change_cluster_data\` 标了 destructive，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。改权限要先断开再重新 login，不能在现有连接上加权限。

官方建议在项目 \`AGENTS.md\` 加一句，让它别向你要集群 key（数据面 key 由 Typesense Cloud 自己拿，对话里不会出现 admin key）：

\`\`\`
For anything about my Typesense Cloud account, clusters or collections, use the typesense-cloud MCP tools.
\`\`\`

无头 / CI 才用 Cluster Management API key 当 Bearer。官方无头示例是 Claude 的 \`--header "Authorization: Bearer …"\`，**不要抄**：会把密钥写进命令行。Codex 用 \`bearer_token_env_var\`，右边是启动 Codex 那个进程里的变量**名**：

\`\`\`toml
[mcp_servers.typesense-cloud]
url = "https://cloud.typesense.org/mcp/v1"
bearer_token_env_var = "TYPESENSE_CLOUD_MANAGEMENT_API_KEY"
enabled = true
\`\`\`

从已经 export 的终端启动。这张表不要再跑 \`mcp login\`。这把 key 只开集群工具（\`whoami\`、\`search_typesense_docs\`、\`get_clusters\`、\`manage_cluster\`），数据工具仍要浏览器 OAuth。不要把密钥写进 \`http_headers\` 或 \`args\`。

连上后先让它跑 \`whoami\`。超免费档（0.5 GB / 单节点）或改配置、clone 需要付款方式或预付余额。每条连接大约 300 次数据调用/分钟、30 次集群操作/分钟。大于 1000 条或 10 MB 的导入，以及所有导出，会给你一条本机 curl，不要指望对话里塞完整数据。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http typesense-cloud …\`，也不要把密钥写进 \`--header\`。
- 不要抄 Cursor 的 \`mcpServers\` JSON，也不要抄 \`mcp-remote\`。
- 不要把 ChatGPT 桌面 Settings → Plugins → MCP 那条安装器当成 Codex CLI。桌面 Codex 读同一份 \`config.toml\`。
- 不要发明 \`codex plugin add typesense@…\`。
- 不要和自建 Typesense、Meilisearch stdio、或 Algolia 那几台 MCP 配成一台。
- 不要把官方示例提示里的尖括号占位当成要粘贴的 HTML。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get typesense-cloud\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Typesense", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "mcp-newrelic-remote"],
    sources: [
      {
        label: "Typesense Cloud · MCP Server",
        url: "https://typesense.org/docs/guide/typesense-cloud/mcp-server",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "turso-codex-plugin",
    no: 312,
    title: "Turso Cloud 插件用 turso@turso，OAuth 不要抄 API token",
    summary:
      "官方：codex plugin marketplace add tursodatabase/turso-mcp，再 plugin add turso@turso，再 mcp login turso。不要抄 Claude 的 /plugin install。只要 MCP 才手写 mcp.turso.ai/mcp。",
    body: `Turso Cloud 给 Codex 的主路径是官方插件：捆绑 Turso 技能，并指向托管 MCP \`https://mcp.turso.ai/mcp\`。鉴权是 OAuth 2.1 + PKCE，**没有** API token 可抄，也不要发明环境变量把密钥写进仓库。

\`\`\`bash
codex plugin marketplace add tursodatabase/turso-mcp
codex plugin add turso@turso
codex mcp login turso
\`\`\`

\`codex plugin list\` 里应看到 \`turso@turso\`。随后 \`codex mcp login turso\` 会打开浏览器。登录 Turso（若还没登），到同意页：先选组织；可选单个 group 把令牌收窄到那一组（只读 / 全开 / 自定义权限），或选整个组织。批准后 Codex 存令牌并自动刷新。换组织或改范围：先断开再重新 login，不能在现有连接上加权限。

0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace.json 仍要重启应用。之后用 \`codex plugin marketplace upgrade\`，再跑一次 \`plugin add\`。

插件已经登记 MCP 时，不要再手写同一张用户层表。只要 MCP、不要技能时，才在 \`~/.codex/config.toml\`（或受信任项目的 \`.codex/config.toml\`）写：

\`\`\`toml
[mcp_servers.turso]
url = "https://mcp.turso.ai/mcp"
enabled = true
\`\`\`

然后同样 \`codex mcp login turso\`。地址带 \`/mcp\` 后缀，**不是**光秃的主机名。用户层表名官方就是 \`turso\`（这不是插件 \`mcp.json\` 的连字符坑）。自托管 / BYOC / 试验才改 \`url\` 指向你自己的部署，不要另起一张同职责的表。

连上后可以：列出/查看/创建/删除/分支数据库（含时间点分支）、改删除保护、IP/VPC 允许列表、大小上限；只读 SQL、写入、删除、DDL 各是独立工具，写工具会拒绝 DELETE/DROP；还有按库的 Insight（高频/高延迟查询）。只读和破坏性操作有标注，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。这台能删库、改 schema、跑写入。

令牌在 Turso 平台 API 层强制组织绑定、角色和范围，并进审计。MCP 层自己不做授权决定。未绑定组织或 group 的令牌会被拒。同意页只出现在 Turso 控制台。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add tursodatabase/turso-mcp\` 或 \`/plugin install turso@turso\`。Codex 是 \`codex plugin add turso@turso\`。
- 不要抄 Cursor 的 \`mcpServers\` JSON、Customize → Plugins，或 \`mcp-remote\`。
- 不要发明 \`codex plugin add turso@openai-curated\` 或其他 marketplace id。官方给的就是 \`turso@turso\`。
- 不要找 API token、不要 \`bearer_token_env_var\`，也不要把密钥写进 \`http_headers\`、\`env\` 或 \`args\`。官方写明没有 token 可复制。
- 不要和 libSQL 本机、SQLite 文件、或别家托管 SQL MCP 配成一台。
- 不要把网页 Codex Cloud 或 Cursor 云代理当成会读 \`~/.codex/config.toml\`。

改完用 \`codex mcp get turso\` 看传输是 streamable_http。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "Turso", "MCP", "OAuth", "Skills"],
    related: ["convex-codex-plugin", "mcp-add-and-login", "mcp-typesense-cloud"],
    sources: [
      {
        label: "Turso · MCP (AI agents)",
        url: "https://docs.turso.tech/integrations/mcp",
      },
      {
        label: "tursodatabase/turso-mcp",
        url: "https://github.com/tursodatabase/turso-mcp",
      },
      {
        label: "Codex plugin README",
        url: "https://github.com/tursodatabase/turso-mcp/blob/main/codex/README.md",
      },
    ],
  },
  {
    id: "cockroachdb-codex-plugin",
    no: 313,
    title: "CockroachDB Cloud 用 cockroachdb-cloud，不要抄 Bearer 进 http_headers",
    summary:
      "Cloud 官方：codex mcp add cockroachdb-cloud --url https://cockroachlabs.cloud/mcp，再 mcp login。技能才 marketplace add cockroachdb/codex-plugin。不要抄官方 TOML 里的 Bearer，也不要把 --env 字面量写进配置。",
    body: `CockroachDB 给 Codex 两条官方线，不要混成一份 JSON。

**Cloud 托管 MCP（官方文档的 Codex 节）：** 远程 Streamable HTTP。表名官方就是带连字符的 \`cockroachdb-cloud\`（这是用户层，不是插件 \`mcp.json\`）：

\`\`\`bash
codex mcp add cockroachdb-cloud --url https://cockroachlabs.cloud/mcp
codex mcp login cockroachdb-cloud
\`\`\`

\`\`\`toml
[mcp_servers.cockroachdb-cloud]
url = "https://cockroachlabs.cloud/mcp"
enabled = true
\`\`\`

地址是 \`https://cockroachlabs.cloud/mcp\`，带 \`/mcp\` 后缀。随后 \`mcp login\` 打开浏览器：登录 Cloud Console，多组织先选组织，再在授权页勾只读和/或写入。账号需要 Cluster Admin 或 Cluster Operator。默认这一条连接能碰到你有权限的**全部**集群；工具调用里若再传别的 \`cluster_id\` 会被拒。先拿预发集群试，不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。

只绑一个集群时，头名是 \`mcp-cluster-id\`。不要把集群 id 写进 URL。不要抄官方 TOML 里的花括号占位。从进程环境转发：

\`\`\`toml
[mcp_servers.cockroachdb-cloud]
url = "https://cockroachlabs.cloud/mcp"
enabled = true

[mcp_servers.cockroachdb-cloud.env_http_headers]
mcp-cluster-id = "COCKROACHDB_CLUSTER_ID"
\`\`\`

无头 / 服务账号才改走 API key。官方 Codex 示例把 \`Authorization = "Bearer …"\` 写进 \`http_headers\`，**不要抄**：密钥会进 \`config.toml\`。用 \`bearer_token_env_var\`，右边是启动 Codex 那个进程里的变量**名**：

\`\`\`toml
[mcp_servers.cockroachdb-cloud]
url = "https://cockroachlabs.cloud/mcp"
bearer_token_env_var = "COCKROACH_CLOUD_API_KEY"
enabled = true
\`\`\`

这张表不要再跑 \`mcp login\`。一条连接只用一种鉴权：OAuth 或 API key，不要两套叠在同一张表。

**技能 / 安全钩子：** 才装官方插件。marketplace 注册名是 \`cockroachdb-codex-plugin\`，插件 id 是 \`cockroachdb@cockroachdb-codex-plugin\`：

\`\`\`bash
codex plugin marketplace add cockroachdb/codex-plugin
codex plugin add cockroachdb@cockroachdb-codex-plugin
codex plugin list
\`\`\`

0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace.json 仍要重启应用。技能来自 \`cockroachlabs/cockroachdb-skills\`（查询/schema、可观测、安全、MOLT 迁移、集群生命周期）。不要用 \`npx skills add\` 当 Codex 安装器。钩子要你在信任屏批准；可用 \`codex plugin trust cockroachdb\`。老版本上插件自带 \`hooks.json\` 可能不触发，脚本必须 fail-open。

插件还捆了三台 MCP：\`cockroachdb-cloud\`（HTTP）、\`cockroachdb-toolbox\`（stdio，本机 \`toolbox\`）、\`cockroachdb-toolbox-http\`（本机 SSE）。插件 \`mcp.json\` 里 \`\${COCKROACHDB_*}\` 和相对 \`./tools.yaml\` **不会**按你的 shell 展开，stdio 子进程也不继承你终端里的 \`COCKROACHDB_*\`。HTTP Cloud 那台不受路径展开影响，但用户层上面那条 \`mcp add\` + \`mcp login\` 更稳。插件工具名带连字符调不到时，也改走用户层，不要再抄一份插件 JSON。

只要 Toolbox、连自建或本地节点时，才手写用户层 stdio。先单独安装 [MCP Toolbox](https://mcp-toolbox.dev/documentation/introduction/#install-toolbox)。**不要**抄 README 里的 \`codex mcp add … --env COCKROACHDB_HOST=localhost\`：会把值写进配置。用 \`env_vars\` 转发变量名，\`tools.yaml\` 写成缓存里的**绝对路径**：

\`\`\`toml
[mcp_servers.cockroachdb-toolbox]
command = "toolbox"
args = ["--config", "/abs/path/to/tools.yaml", "--stdio"]
env_vars = ["COCKROACHDB_HOST", "COCKROACHDB_PORT", "COCKROACHDB_USER", "COCKROACHDB_PASSWORD", "COCKROACHDB_DATABASE", "COCKROACHDB_SSLMODE"]
enabled = true
startup_timeout_sec = 60
\`\`\`

yaml 在 \`~/.codex/plugins/cache/cockroachdb-codex-plugin/cockroachdb/\` 下，用 \`find\` 对当前版本，不要写死 \`0.1.0\`。本地不安全节点才 \`COCKROACHDB_SSLMODE=disable\`；安全集群改 \`verify-full\` 并配证书变量。Toolbox 默认只读，写入要改 \`tools.yaml\`，保持工具批准。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add … --transport http\`，也不要把密钥或集群 id 写进 \`--header\`。
- 不要抄 Cursor / Copilot 的 \`mcpServers\` JSON，也不要抄 \`mcp-remote\`。
- 不要发明 \`codex plugin add cockroachdb@openai-curated\`。官方给的就是 \`cockroachdb@cockroachdb-codex-plugin\`。
- 不要抄 Claude 的 \`cockroachdb/claude-plugin\`。
- 不要把官方示例里的 Bearer 写进 \`http_headers\` 或 \`args\`。
- 不要默认打开 \`cockroachdb-toolbox-http\`（它指向本机 SSE）。
- 不要和自建 \`cockroachdb-mcp-server\` 的 JSON \`mcpServers\`、或 Turso / Typesense 那几台配成一台。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get cockroachdb-cloud\` 看传输是 streamable_http。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "CockroachDB", "MCP", "OAuth", "Skills"],
    related: ["turso-codex-plugin", "mcp-add-and-login", "mcp-http-bearer-env"],
    sources: [
      {
        label: "CockroachDB Cloud · MCP Server",
        url: "https://www.cockroachlabs.com/docs/cockroachcloud/connect-to-the-cockroachdb-cloud-mcp-server",
      },
      {
        label: "cockroachdb/codex-plugin",
        url: "https://github.com/cockroachdb/codex-plugin",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "airtable-codex-plugin",
    no: 314,
    title: "Airtable 插件用 airtable@openai-curated，PAT 不要抄 --header",
    summary:
      "官方文档：codex plugin add airtable@openai-curated。只要 MCP：codex mcp add airtable --url https://mcp.airtable.com/mcp，再 mcp login。无头才 bearer_token_env_var。不要抄 Claude 的 --header 密钥，也不要抄源仓 README 的数组表。",
    body: `Airtable 托管 MCP 在 \`https://mcp.airtable.com/mcp\`（带 \`/mcp\` 后缀）。官方文档的 Codex 节把**插件**写成推荐路径，并额外给了手写 MCP。源仓 \`airtable/skills\` 是完整技能包。不要混成一份 JSON。

**公共目录（官方文档写的 plugin add）：**

\`\`\`bash
codex plugin add airtable@openai-curated
codex plugin list
\`\`\`

桌面 Plugins 或 TUI \`/plugins\` 搜 Airtable 再装，效果一样。0.154 起先看**当前会话**；当前会话没有再新开。插件会捆官方 MCP 和技能（\`airtable-overview\`、\`airtable-filters\`）。装完仍要完成 OAuth。\`codex plugin list\` 里应看到 \`airtable@openai-curated\`。

**完整技能包（源仓 marketplace）：** 若目录那份缺技能或 MCP，先 \`codex plugin remove airtable@openai-curated\`，再：

\`\`\`bash
codex plugin marketplace add airtable/skills
codex plugin add airtable@airtable-skills
codex plugin list
\`\`\`

marketplace 注册名是 \`airtable-skills\`，插件 id 是 \`airtable@airtable-skills\`。不要两份同时装。源仓 README 只写了 marketplace add，再手改 \`[plugins."airtable@airtable-skills"] enabled = true\`；CLI 仍应 \`plugin add\`。桌面改 marketplace.json 仍要重启应用。

**只要 MCP、不要插件时**（官方文档的手写节）：

\`\`\`bash
codex mcp add airtable --url https://mcp.airtable.com/mcp
codex mcp login airtable
\`\`\`

\`\`\`toml
[mcp_servers.airtable]
url = "https://mcp.airtable.com/mcp"
enabled = true
\`\`\`

用户层表名官方就是 \`airtable\`。随后 \`mcp login\` 打开浏览器授权。权限跟你在 Airtable 里的角色走：Commenter / Read-only 只能读；Owner / Creator / Editor 才能改记录；只有工作区 Owner 或 Creator 能 \`create_base\`。企业若拦了第三方集成，要管理员把这个 OAuth 客户端放进允许名单。能碰到哪些 base，在账号的 Integrations → Third-party Integrations 里加减。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。这台能建表、改字段、写记录、建 base。

无头 / 不便开浏览器才用 PAT。官方 Codex 节是 \`bearer_token_env_var\`，右边是启动 Codex 那个进程里的变量**名**：

\`\`\`toml
[mcp_servers.airtable]
url = "https://mcp.airtable.com/mcp"
bearer_token_env_var = "AIRTABLE_PAT"
enabled = true
\`\`\`

从已经 export 的终端启动。这张表不要再跑 \`mcp login\`。PAT 范围至少覆盖 records / schema 的读写（以及你需要的 comments、workspacesAndBases）。不要把 PAT 写进 \`http_headers\` 或 \`args\`。一条连接只用一种鉴权。

源仓 README 把 MCP 写成 \`[[mcp_servers]]\` 那种数组表，**不是** Codex 的 \`[mcp_servers.airtable]\`，不要抄。插件已经登记 MCP 时，不要再手写同一张用户层表。

不要做这些：

- 不要抄 Claude 的 \`claude plugin install airtable@claude-plugins-official\` 或 \`/plugin install airtable@airtable-skills\`。
- 不要抄 Claude 的 \`--transport http\`，也不要把 PAT 写进 \`--header "Authorization: Bearer …"\`。Claude PAT 示例里还出现过别的主机名，不要跟 \`mcp.airtable.com/mcp\` 搞混。
- 不要抄 Cursor 的 \`mcpServers\` JSON、\`/add-plugin\` 或 \`mcp-remote\`。
- 不要用 \`npx skills add airtable/skills\` 当 Codex 插件安装器，也不要手拷到 \`~/.codex/skills\`。
- 不要发明 \`codex plugin add airtable@openai-curated\` 以外的 curated id；完整包是 \`airtable@airtable-skills\`。
- 不要对接开发中的 managed app 源 base（会 403）。一次最多建 10 条记录。走标准 API 速率限制。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex mcp get airtable\` 看传输是 streamable_http。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "Airtable", "MCP", "OAuth", "Skills"],
    related: ["shopify-ai-toolkit", "mcp-add-and-login", "mcp-http-bearer-env"],
    sources: [
      {
        label: "Airtable · Using the MCP server",
        url: "https://support.airtable.com/docs/using-the-airtable-mcp-server",
      },
      {
        label: "Airtable/skills",
        url: "https://github.com/Airtable/skills",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "motherduck-codex-plugin",
    no: 315,
    title: "MotherDuck 技能走 marketplace，远程 MCP 不要抄 --transport http",
    summary:
      "技能：codex plugin marketplace add motherduckdb/agent-skills，再 /plugins 装 MotherDuck Skills。远程 MCP 对照 api.motherduck.com/mcp 再 mcp login。不要发明 plugin add id，也不要抄 Claude 的 --transport http 或把 token 写进 http_headers。",
    body: `MotherDuck 给 Codex 三条线，不要混成一份 JSON：技能教写法；远程 MCP 查云上的库；本地 stdio 才碰 DuckDB 文件。技能**不会**替你配 MCP。

**技能（官方 Codex 节）：**

\`\`\`bash
codex plugin marketplace add motherduckdb/agent-skills
\`\`\`

然后 TUI \`/plugins\` 或桌面 Plugins 装 **MotherDuck Skills**。官方**没给** \`codex plugin add motherduck-skills@…\` 这种 id，不要把 Claude 的 \`motherduck-skills@motherduck-skills\` 抄过来。也不要用 \`npx skills add motherduckdb/agent-skills\` 当 Codex 安装器。0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace.json 仍要重启应用。IDE 扩展没有 \`/plugins\`。

源仓现在大约 22 份技能，从 \`motherduck-connect\` / \`motherduck-query\` / \`motherduck-duckdb-sql\` 到 Dive、Flight、DuckLake 和迁移。点名技能或直接说任务即可。

**远程 MCP（云上主路径）：** 托管地址是 \`https://api.motherduck.com/mcp\`，带 \`/mcp\` 后缀。官方 MCP 页给 Codex 的是 ChatGPT / Codex **对话插件商店**（Plugins 搜 MotherDuck，再用 \`@\` 选），**不是** CLI 的 \`/plugins\`。CLI 对照同一条 Streamable HTTP URL 手写：

\`\`\`bash
codex mcp add motherduck --url https://api.motherduck.com/mcp
codex mcp login motherduck
\`\`\`

\`\`\`toml
[mcp_servers.motherduck]
url = "https://api.motherduck.com/mcp"
enabled = true
\`\`\`

用户层表名用 \`motherduck\`（这不是插件 \`mcp.json\` 的连字符坑）。随后 \`mcp login\` 打开浏览器做 OAuth。不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor 的 \`type: http\` JSON。连上后先让它列数据库。远程有只读 \`query\` 和读写 \`query_rw\`：探索时让只读尽快跑，写入保持批准或关掉。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。

无头 / 不便开浏览器才用 access token。不要把 \`Authorization: Bearer …\` 抄进 \`http_headers\`。用 \`bearer_token_env_var\`，右边是启动 Codex 那个进程里的变量**名**：

\`\`\`toml
[mcp_servers.motherduck]
url = "https://api.motherduck.com/mcp"
bearer_token_env_var = "MOTHERDUCK_TOKEN"
enabled = true
\`\`\`

从已经 export 的终端启动。这张表不要再跑 \`mcp login\`。只要只读：换 read-scaling token，并挡住 \`query_rw\`。一条连接只用一种鉴权。

**本地 stdio（官方 README 的 Codex CLI 节）：** 查本机 \`.duckdb\`、内存库，或自托管时才用 \`uvx mcp-server-motherduck\`。默认只读，\`--db-path\` 默认是 \`:memory:\`。连 MotherDuck 云仓必须显式 \`--db-path md:\`。**不要**抄 \`--env motherduck_token=YOUR_TOKEN\`：会把值写进配置。用 \`env_vars\` 转发 \`motherduck_token\` 或 \`MOTHERDUCK_TOKEN\`：

\`\`\`toml
[mcp_servers.duckdb]
command = "uvx"
args = ["mcp-server-motherduck", "--db-path", "/abs/path/to/db.duckdb"]
enabled = true
startup_timeout_sec = 60
\`\`\`

\`\`\`toml
[mcp_servers.motherduck-local]
command = "uvx"
args = ["mcp-server-motherduck", "--db-path", "md:", "--read-write"]
env_vars = ["motherduck_token"]
enabled = true
startup_timeout_sec = 60
\`\`\`

官方示例里内存/文件表名是 \`duckdb\`，连 \`md:\` 的 stdio 表名是 \`motherduck\`。已经有远程 HTTP 那张 \`motherduck\` 时，stdio 必须另起名，不要覆盖。只读连 \`md:\` 必须用 read-scaling token；普通 token 要 \`--read-write\`。不要默认加 \`--allow-switch-databases\`。\`uvx\` 找不到就写成 \`which uvx\` 的绝对路径。本地工具是 \`execute_query\` 这一套，不要和远程的 \`query\` / \`query_rw\` 搞混。

有 shell 时，Dive / Flight 那种落盘工作官方更建议 MotherDuck CLI，MCP 负责探库和问答。两套可以一起用。

不要做这些：

- 不要发明 \`codex plugin add motherduck-skills@motherduck-skills\` 或其他 curated id。
- 不要抄 Claude 的 \`/plugin marketplace add\`、\`/plugin install motherduck-skills@motherduck-skills\`，或 \`claude mcp add --transport http\`。
- 不要抄 Cursor / VS Code 的 JSON，也不要把 Bearer 写进 \`headers\`。
- 不要把 ChatGPT Plugins 商店那份和 CLI \`/plugins\` 技能包当成同一条安装命令。
- 不要把远程 HTTP 和本地 stdio 配成同一张表。
- 不要和 Turso / ClickHouse Cloud 那几台配成一台。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex mcp get motherduck\` 看传输是 streamable_http；技能用 \`codex plugin list\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "MotherDuck", "MCP", "OAuth", "Skills"],
    related: ["turso-codex-plugin", "mcp-add-and-login", "mcp-http-bearer-env"],
    sources: [
      {
        label: "MotherDuck · Connect MCP",
        url: "https://motherduck.com/docs/key-tasks/ai-and-motherduck/mcp-setup/",
      },
      {
        label: "MotherDuck · Agent Skills",
        url: "https://motherduck.com/docs/key-tasks/ai-and-motherduck/agent-skills/",
      },
      {
        label: "motherduckdb/mcp-server-motherduck",
        url: "https://github.com/motherduckdb/mcp-server-motherduck",
      },
    ],
  },
  {
    id: "hubspot-dev-mcp",
    no: 316,
    title: "HubSpot 开发 MCP 用 hs mcp setup，不要和远程 CRM 配成一台",
    summary:
      "官方：hs --version 至少 8.2.0，再 hs mcp setup，勾选 Codex CLI。表名是 HubSpotDev。等价手写是 mcp add HubSpotDev -- hs mcp start --ai-agent codex。这是本地开发 MCP，不是 mcp.hubspot.com 那台 CRM。",
    body: `HubSpot 给 Codex 的**官方主路径**是本地 Developer MCP，不是远程 CRM。CLI **8.2.0** 起才把 Codex CLI 列进支持客户端。先认证 CLI（\`hs init\` / \`hs account auth\`），再：

\`\`\`bash
hs --version
hs mcp setup
\`\`\`

勾选 Codex CLI。装过全局 \`@hubspot/cli\` 时，standalone 选 **N**。公司机不能全局 npm 才选 standalone：安装器会用 \`npx -y -p @hubspot/cli hs mcp start\`，并可钉版本。装完若 Codex 已开着，先重启。\`/mcp\` 里应看到 \`HubSpotDev\`。

\`hs mcp setup\` 在 Codex 上实际跑的是（源码 \`setupCodex\`）：

\`\`\`bash
codex mcp add HubSpotDev -- hs mcp start --ai-agent codex
\`\`\`

\`\`\`toml
[mcp_servers.HubSpotDev]
command = "hs"
args = ["mcp", "start", "--ai-agent", "codex"]
enabled = true
startup_timeout_sec = 60
\`\`\`

用户层表名官方就是驼峰 \`HubSpotDev\`（这不是插件 \`mcp.json\`）。后面的 \`--ai-agent codex\` 是安装器加上的，手写时也要带。不要再 \`mcp login\`：这是 stdio，鉴权走已经连上的 HubSpot CLI 账号，不是 OAuth。\`hs\` 不在 PATH 时写成 \`which hs\` 的绝对路径。

standalone 才换 npx。\`HUBSPOT_MCP_STANDALONE=true\` 是开关，不是密钥，可以留在 \`env\` 表：

\`\`\`toml
[mcp_servers.HubSpotDev]
command = "npx"
args = ["-y", "-p", "@hubspot/cli", "hs", "mcp", "start", "--ai-agent", "codex"]
enabled = true
startup_timeout_sec = 60

[mcp_servers.HubSpotDev.env]
HUBSPOT_MCP_STANDALONE = "true"
\`\`\`

钉版本时再加 \`HUBSPOT_CLI_VERSION\`。不要把个人访问密钥写进 \`env\`、\`args\` 或提示词。\`auth-account\` 可以非交互吃 PAK，但密钥仍不要出现在对话里。

这台是**应用 / CMS 开发**：搜文档、脚手架项目、校验、上传、部署、建测试账号、看构建日志。\`upload-project\` / \`deploy-project\` 标了只有用户明确要求才调用，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。部分功能要 Developer Platform \`2025.2\`。

**远程 CRM MCP 是另一台。** 官方地址是 \`https://mcp.hubspot.com\`（没有 \`/mcp\` 后缀），要先在 Development → MCP Auth Apps 建应用，拿 client id / secret / 回调 URL，还要 PKCE。官方**没有 Codex 专节**，不要发明 \`codex mcp add hubspot --url https://mcp.hubspot.com\`，也不要抄第三方的 \`mcp.hubspot.com/anthropic\` 或 \`bearer_token_env_var\`。不要和本地 \`HubSpotDev\` 写成同一张表。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add-json\`，也不要抄 Cursor / VS Code 的 \`mcpServers\` JSON。
- 不要发明 \`codex plugin add hubspot@…\`。
- 不要把 \`npx mcp-hubspot\` 或 Smithery 那份社区 CRM 包当成官方 Developer MCP。
- 不要编 \`npx @hubspot/cli mcp serve\`。官方子命令是 \`hs mcp start\`。
- 不要把 PAK / client secret 写进 \`http_headers\` 或 \`args\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex mcp get HubSpotDev\` 看 command 是 \`hs\` 或 \`npx\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "HubSpot", "CLI", "stdio"],
    related: ["mcp-add-and-login", "shopify-ai-toolkit", "google-cloud-developer-plugin"],
    sources: [
      {
        label: "HubSpot · Set up the developer MCP server",
        url: "https://developers.hubspot.com/docs/developer-tooling/local-development/developer-mcp/setup",
      },
      {
        label: "HubSpot · Developer MCP tools",
        url: "https://developers.hubspot.com/docs/developer-tooling/local-development/developer-mcp/tools",
      },
      {
        label: "HubSpot/hubspot-cli mcp setup",
        url: "https://github.com/HubSpot/hubspot-cli/blob/main/lib/mcp/setup.ts",
      },
    ],
  },
  {
    id: "azure-skills-plugin",
    no: 317,
    title: "Azure Skills 用 marketplace 加源，不要抄 Copilot 的 plugin install",
    summary:
      "官方 Codex：marketplace add microsoft/azure-skills，再 /plugins 装 azure。官方没给 plugin add id。插件 MCP 是 npx @azure/mcp@latest server start。先 az login。不要抄 Copilot 的 azure@azure-skills。",
    body: `Azure 给 Codex 的**官方主路径**是装 Azure Skills 插件，不是手拷 SKILL.md。仓库 README 和 [Azure Skills 站点](https://microsoft.github.io/azure-skills/) 的 Codex CLI 节都是：

\`\`\`bash
codex plugin marketplace add microsoft/azure-skills
\`\`\`

然后 TUI \`/plugins\` 或桌面 Plugins 装 **azure**。官方**没给** \`codex plugin add azure@…\` 这种 id，不要把 Copilot CLI 的 \`/plugin install azure@azure-skills\` 抄过来。也不要抄 Claude 的 \`/plugin install azure@claude-plugins-official\`。Learn 安装页目前写的是 Copilot / Claude / Cursor / IntelliJ，**没有** Codex 专节；Codex 命令以仓库 README 为准。

0.154 起先看**当前会话**；当前会话 \`/plugins\` 没有 azure 再新开。桌面改 marketplace.json 仍要重启应用。IDE 扩展没有 \`/plugins\`。CLI 装好的插件，Codex 桌面也能用。

marketplace 清单名是 \`azure-skills\`，主插件名是 \`azure\`。同一份源里还有 \`azure-kusto-graph-skills\`（Kusto 图分析），不要和 azure 当成同一份。

前提：\`PATH\` 上有 Node.js 18+（\`npx\`），以及已登录的 Azure CLI：

\`\`\`bash
az login
az account show
\`\`\`

要用 \`azure-prepare\` / \`azure-deploy\` 这类 azd 工作流，再额外 \`azd auth login\`。只列资源、查价格、查日志时不必先装 azd。

插件自带的 \`.mcp.json\` **目前只有一台** \`azure\`：

\`\`\`json
{
  "mcpServers": {
    "azure": {
      "command": "npx",
      "args": ["-y", "@azure/mcp@latest", "server", "start"]
    }
  }
}
\`\`\`

这是 stdio，鉴权走本机 \`az login\`，不要再 \`mcp login\`。npx 冷启动慢，\`startup_timeout_sec\` 不够会超时。关遥测是开关，可以留在 \`env\` 表：

\`\`\`toml
[mcp_servers.azure.env]
AZURE_MCP_COLLECT_TELEMETRY = "false"
\`\`\`

README 文案还提 Foundry MCP，但当前插件 \`.mcp.json\` **没有第二台** Foundry 表。不要另外手写 Foundry 用户层 MCP。Foundry 场景走技能（如 \`microsoft-foundry\`）和这台 Azure MCP。也不要抄 Copilot 博客里那份带 Context7 的 \`.mcp.json\`。

**用户层回退**（插件装不上、只要 MCP）对照同一条命令：

\`\`\`bash
codex mcp add azure -- npx -y @azure/mcp@latest server start
\`\`\`

\`\`\`toml
[mcp_servers.azure]
command = "npx"
args = ["-y", "@azure/mcp@latest", "server", "start"]
enabled = true
startup_timeout_sec = 60
\`\`\`

用户层表名跟官方一样用 \`azure\`（这不是插件 \`mcp.json\` 的连字符坑）。\`npx\` 不在 PATH 时写成 \`which npx\` 的绝对路径。这台会改订阅、部署、RBAC，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。

CI / 服务账号才用服务主体。**不要**把 \`AZURE_CLIENT_SECRET\` 写进 \`env\` 表或 \`args\`。用 \`env_vars\` 转发启动 Codex 那个进程里的名字：

\`\`\`toml
[mcp_servers.azure]
command = "npx"
args = ["-y", "@azure/mcp@latest", "server", "start"]
env_vars = ["AZURE_TENANT_ID", "AZURE_CLIENT_ID", "AZURE_CLIENT_SECRET"]
enabled = true
startup_timeout_sec = 60
\`\`\`

从已经 export 的终端启动。跑在 Azure 里才靠托管标识，不要把托管标识环境变量抄进本机 \`config.toml\`。

**主权云不是默认。** README 的 \`/mcp edit azure\` 加 \`--cloud AzureChinaCloud\` / \`AzureUSGovernment\` 是 Copilot 语法。插件 MCP 不好改 args 时，才手写用户层并加 \`--cloud\`，而且先把本机 CLI 切到同一朵云：

\`\`\`bash
az cloud set --name AzureUSGovernment
az login
\`\`\`

\`\`\`toml
[mcp_servers.azure]
command = "npx"
args = ["-y", "@azure/mcp@latest", "server", "start", "--cloud", "AzureUSGovernment"]
enabled = true
startup_timeout_sec = 60
\`\`\`

中国区把 \`AzureUSGovernment\` 换成 \`AzureChinaCloud\`。也可以 \`env_vars\` 转发 \`AZURE_CLOUD\`，不要把云名写错成密钥。不要默认打开主权云。

不要做这些：

- 不要发明 \`codex plugin add azure@azure-skills\` 或其他 curated id。
- 不要用 \`npx skills add … -a github-copilot\` 当 Codex 安装器。那是 IntelliJ Copilot 路径。
- 不要把 \`apm install microsoft/azure-skills\` 当 Codex 主路径。多 harness 才用 APM。
- 不要手拷技能到 \`~/.codex/skills\`。现行个人目录是 \`~/.agents/skills\`，而且那条不会登记 MCP。Microsoft Learn training 的 Azure Agent Skills 也不是这份插件。
- 不要和 Google Cloud 的 \`google-cloud-developer@google-plugins\` 抄成同一个 marketplace。
- 不要和 Azure DevOps 远程 \`mcp.dev.azure.com\` 配成一台。官方写明 Codex 走不了那条 Entra DCR；看板/仓库是另一条本地 ADO MCP。
- 不要抄 Claude / Cursor / VS Code 的 JSON，也不要把 client secret 写进 \`http_headers\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex plugin list\` 看插件，用 \`codex mcp get azure\` 看 command 是 \`npx\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Azure", "MCP", "Skills"],
    related: ["google-cloud-developer-plugin", "mcp-add-and-login", "hubspot-dev-mcp"],
    sources: [
      {
        label: "microsoft/azure-skills",
        url: "https://github.com/microsoft/azure-skills",
      },
      {
        label: "Azure Skills for AI coding agents",
        url: "https://microsoft.github.io/azure-skills/",
      },
      {
        label: "Azure MCP · Sovereign clouds",
        url: "https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/how-to/connect-sovereign-clouds",
      },
    ],
  },
  {
    id: "azure-devops-local-mcp",
    no: 318,
    title: "Azure DevOps 用本地 @azure-devops/mcp，不要走远程 Entra",
    summary:
      "官方 Codex：mcp add azure-devops -- npx -y @azure-devops/mcp Contoso。这是本地 stdio。远程 mcp.dev.azure.com 走不了 Entra DCR。不要和 Azure Skills 的 @azure/mcp 搞混。PAT 用 env_vars。",
    body: `Azure DevOps 给 Codex 的**官方主路径**是本地 stdio MCP，不是托管远程。源仓 Getting Started 的 Codex 节是：

\`\`\`bash
codex mcp add azure-devops -- npx -y @azure-devops/mcp Contoso
codex mcp list
\`\`\`

把 \`Contoso\` 换成你的组织名（只写名字，不要写 \`dev.azure.com\` URL）。前提是 Node.js **20+**。用户层表名官方就是带连字符的 \`azure-devops\`（这不是插件 \`mcp.json\`）。这是 stdio，不要再 \`mcp login\`。第一次调用工具时会弹浏览器做 Microsoft 账号登录。账号必须进得了这个组织。

已经 \`az login\` 时，把鉴权改成 Azure CLI：

\`\`\`bash
az login
codex mcp add azure-devops -- npx -y @azure-devops/mcp Contoso --authentication azcli
\`\`\`

\`\`\`toml
[mcp_servers.azure-devops]
command = "npx"
args = ["-y", "@azure-devops/mcp", "Contoso"]
enabled = true
startup_timeout_sec = 60
\`\`\`

\`npx\` 不在 PATH 时写成 \`which npx\` 的绝对路径。npx 冷启动慢，超时就加 \`startup_timeout_sec\`。这台能列项目、改工作项、动流水线，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。先用 \`List ADO projects\` 这种只读提示核对。

**远程托管不是 Codex 路径。** 官方推荐别人用 \`https://mcp.dev.azure.com/组织名\`（没有 \`/mcp\` 后缀）。Learn 写明 Codex / Claude Desktop 走不了那条 Entra DCR。不要发明 \`codex mcp add ado --url https://mcp.dev.azure.com/Contoso\`，也不要套 \`mcp-remote\`。不要和本地 \`azure-devops\` 写成同一张表。

也不要和 Azure Skills 那台 \`@azure/mcp\` 搞混：那是订阅/部署/RBAC；这台是看板、仓库、Wiki、流水线。两台可以并存，表名不要都叫 \`azure\`。

工具太多时用域名过滤。务必带上 \`core\`：

\`\`\`toml
[mcp_servers.azure-devops]
command = "npx"
args = ["-y", "@azure-devops/mcp", "Contoso", "-d", "core", "work", "work-items"]
enabled = true
startup_timeout_sec = 60
\`\`\`

可用域：\`core\`、\`work\`、\`work-items\`、\`search\`、\`test-plans\`、\`repositories\`、\`wiki\`、\`pipelines\`、\`advanced-security\`。不写 \`-d\` 就会加载全部。项目/团队默认是开关类字面量，可以留 \`env\` 表：

\`\`\`toml
[mcp_servers.azure-devops.env]
ado_mcp_project = "Contoso"
ado_mcp_team = "Fabrikam Team"
\`\`\`

无头 / 不便开浏览器才用 PAT。官方要求 \`PERSONAL_ACCESS_TOKEN\` 是「邮箱:PAT」的 **base64**，不是裸 PAT；邮箱可以是任意非空字符串。**不要**把编码结果写进 \`env\` 表或 \`args\`。用 \`env_vars\` 转发启动 Codex 那个进程里的名字：

\`\`\`bash
export PERSONAL_ACCESS_TOKEN="$(printf '%s' 'you@example.com:ADO_PAT' | base64)"
\`\`\`

\`\`\`toml
[mcp_servers.azure-devops]
command = "npx"
args = ["-y", "@azure-devops/mcp", "Contoso", "--authentication", "pat"]
env_vars = ["PERSONAL_ACCESS_TOKEN"]
enabled = true
startup_timeout_sec = 60
\`\`\`

从已经 export 的终端启动。Bearer 环境变量那条是 \`ADO_MCP_AUTH_TOKEN\` 加 \`--authentication envvar\`，同样走 \`env_vars\`，不要写进 \`http_headers\`。一条连接只用一种鉴权。

不要做这些：

- 不要发明 \`codex plugin add azure-devops@…\`。
- 不要抄 Claude 的 \`claude mcp add --transport stdio\`，也不要抄 Cursor / VS Code 的 \`.vscode/mcp.json\`。VS Code 的 input 占位 Codex 不会展开。
- 不要把 Windows \`cmd /c npx\` 包装抄进 WSL。
- 不要把 PAT / Bearer 写进 \`env\`、\`--env KEY=\` 或提示词。
- 不要默认钉 \`@azure-devops/mcp@2.8.1\`。那是工具改名时的临时回退。
- 不要和 Azure Skills 插件、远程 \`mcp.dev.azure.com\` 配成一台。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex mcp get azure-devops\` 看 command 是 \`npx\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Azure DevOps", "stdio", "PAT"],
    related: ["azure-skills-plugin", "mcp-add-and-login", "hubspot-dev-mcp"],
    sources: [
      {
        label: "azure-devops-mcp · Getting Started",
        url: "https://github.com/microsoft/azure-devops-mcp/blob/main/docs/GETTINGSTARTED.md",
      },
      {
        label: "Learn · Azure DevOps MCP overview",
        url: "https://learn.microsoft.com/en-us/azure/devops/mcp-server/mcp-server-overview",
      },
      {
        label: "Learn · Remote MCP (Codex unsupported)",
        url: "https://learn.microsoft.com/en-us/azure/devops/mcp-server/remote-mcp-server",
      },
    ],
  },
  {
    id: "tinybird-devtools-mcp",
    no: 319,
    title: "Tinybird DevTools MCP 用 env_vars，不要把 token 写进配置",
    summary:
      "官方 Codex：mcp add tinybird -- npx -y @tinybirdco/devtools-mcp@latest。不要抄 -e TINYBIRD_TOKEN=。用 env_vars 转发。远程 mcp.tinybird.co 是另一台。技能是 npx skills add，不是 /plugins。",
    body: `Tinybird 给 Codex 的**官方主路径**是本地 DevTools MCP，不是远程查询那台。npm 的 Codex 节是：

\`\`\`bash
codex mcp add tinybird -- npx -y @tinybirdco/devtools-mcp@latest
\`\`\`

前提是 Node.js **20+**。包标了 experimental，API 会变。用户层表名官方就是 \`tinybird\`（这不是插件 \`mcp.json\`）。这是 stdio，不要再 \`mcp login\`。包里另有一个叫 \`login\` 的**工具**，走浏览器 OAuth，可以写项目 \`.tinyb\`；那不是 Codex 的 \`mcp login\`。

**不要抄**官方那条 \`-e TINYBIRD_TOKEN=p.your-token-here\`，也不要把 token 写进 \`env\` 表。\`codex mcp add -e\` 会把值写进配置。用 \`env_vars\` 转发启动 Codex 那个进程里的名字：

\`\`\`toml
[mcp_servers.tinybird]
command = "npx"
args = ["-y", "@tinybirdco/devtools-mcp@latest"]
env_vars = ["TINYBIRD_TOKEN"]
enabled = true
startup_timeout_sec = 60
\`\`\`

\`\`\`bash
export TINYBIRD_TOKEN="你的 Tinybird token"
\`\`\`

从已经 export 的终端启动。美国区才加 \`TINYBIRD_URL\`。它是区域 URL，不是密钥，可以留 \`env\` 表（默认 \`https://api.tinybird.co\`）：

\`\`\`toml
[mcp_servers.tinybird.env]
TINYBIRD_URL = "https://api.us-east.tinybird.co"
\`\`\`

\`npx\` 不在 PATH 时写成 \`which npx\` 的绝对路径。npx 冷启动慢，超时就加 \`startup_timeout_sec\`。这台能跑 SQL、列资源、部署，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。先用「列出当前 Workspace 资源」这种只读提示核对。

工具现在有：\`execute_query\`、\`list_resources\`、\`get_resource\`、\`list_branches\`、\`list_kafka_topics\`、\`preview_kafka_topic\`、\`login\`、\`build\`、\`get_info\`。\`build\` 会把 TypeScript 定义推到开发分支，保持批准。\`login\` 成功后可能在项目里写出 \`.tinyb\`，**不要**把 \`.tinyb\` 提交进 git。

没环境变量时，服务器才回退读配置文件：\`npx @tinybirdco/sdk init\` 生成的 \`tinybird.json\`，或 \`tb login\` 生成的 \`.tinyb\`。\`tinybird.json\` 可以写占位 \`token\` 字段，让服务器从环境或 \`.env\` 展开，不要把真实 token 写进仓库。

**远程查询 MCP 是另一台。** 官方地址是 \`https://mcp.tinybird.co\`，文档把 token 拼进查询串。那是查活 Workspace / 已发布 Endpoint，不是 login / build / \`list_resources\`。不要发明 \`codex mcp add tinybird --url https://mcp.tinybird.co\`，也不要把 token 拼进 URL，更不要抄 \`mcp-remote\`。Codex 本身能走 Streamable HTTP，缺的是不把密钥写进配置的接法。不要和本地 \`tinybird\` 写成同一张表。

技能是另一条线：官方是 \`npx skills add tinybirdco/tinybird-agent-skills\`，列出 Codex 为兼容客户端。那会改**所有检测到的客户端**，不是 Codex \`/plugins\`。不要发明 \`codex plugin add tinybird@…\`。不确定就别跑。现行个人技能目录是 \`~/.agents/skills\`。技能教项目/SQL/部署写法，**不会**替你配 MCP。

也不要和 ClickHouse Cloud 那台 \`mcp.clickhouse.cloud/mcp\` 配成一台：那是 ClickHouse 云仓；这台是 Tinybird Workspace 的 datasource / pipe。更不要把 PyPI 的 \`mcp-tinybird\`（\`TB_ADMIN_TOKEN\`）抄进来当 Codex 主路径。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add -e TINYBIRD_TOKEN=\`，也不要抄 Cursor / VS Code 的 \`mcpServers\` JSON。
- 不要发明 \`codex plugin add tinybird@openai-curated\`。
- 不要把 token 写进 \`env\`、\`args\`、\`http_headers\` 或提示词。
- 不要默认钉 \`@tinybirdco/devtools-mcp@0.0.3\`。
- 不要和远程 \`mcp.tinybird.co\`、ClickHouse Cloud、MotherDuck 配成一台。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex mcp get tinybird\` 看 command 是 \`npx\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Tinybird", "stdio"],
    related: ["mcp-add-and-login", "motherduck-codex-plugin", "mcp-clickhouse-cloud"],
    sources: [
      {
        label: "@tinybirdco/devtools-mcp",
        url: "https://www.npmjs.com/package/@tinybirdco/devtools-mcp",
      },
      {
        label: "Tinybird · Query MCP",
        url: "https://www.tinybird.co/docs/forward/query-data/mcp",
      },
      {
        label: "Tinybird · Agent Skills",
        url: "https://www.tinybird.co/docs/forward/development-workflow/agent-skills",
      },
    ],
  },
  {
    id: "upstash-codex-plugin",
    no: 320,
    title: "Upstash 插件用 upstash@upstash，不要和 Context7 搞混",
    summary:
      "官方 Codex：marketplace add upstash/skills，再 plugin add upstash@upstash。插件会登记远程 mcp.upstash.com/mcp。不要抄本地 --email / --api-key。不是 Context7，也不是单库 redis-mcp。",
    body: `Upstash 给 Codex 的**官方主路径**是插件，不是手写 stdio。Install by agent 的 Codex 节是：

\`\`\`bash
codex plugin marketplace add upstash/skills
codex plugin add upstash@upstash
\`\`\`

marketplace 名是 \`upstash\`，插件 id 是 \`upstash@upstash\`。卡片显示名可能是 Upstash Redis，实际覆盖 Redis / QStash / Workflow / Vector / Search 等技能。插件会登记远程 MCP：\`https://mcp.upstash.com/mcp\`（带 \`/mcp\` 后缀），第一次调工具弹浏览器做 OAuth。技能教 SDK / CLI 写法；MCP 才碰你账号里的库和队列。

0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace.json 仍要重启应用。IDE 扩展没有 \`/plugins\`。不要抄 Claude 的 \`/plugin install upstash@upstash\`。也不要用 \`npx skills add upstash/skills\` 当 Codex 安装器：那会改所有检测到的客户端。

插件已经登记 MCP 就**不要**再 \`mcp add\` 同一张表。只要 MCP、插件装不上时，用户层对照同一条 Streamable HTTP URL：

\`\`\`bash
codex mcp add upstash --url https://mcp.upstash.com/mcp
codex mcp login upstash
\`\`\`

\`\`\`toml
[mcp_servers.upstash]
url = "https://mcp.upstash.com/mcp"
enabled = true
\`\`\`

用户层表名官方就是 \`upstash\`（这不是插件 \`mcp.json\` 的连字符坑）。不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor 的 \`type: http\` JSON。连上后先让它列 Redis 数据库。这台能建库、删库、跑任意 Redis 命令，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。

只要 Redis / QStash 时，查询参数可以写进 url（不是密钥）：\`https://mcp.upstash.com/mcp?features=redis,qstash_workflow\`。拼写错且全部被丢掉时，客户端会表现为没有工具，先检查 \`features\`。

无头 / 不便开浏览器才用 Developer API key。官方头是 \`Authorization: Bearer 邮箱:API_KEY\`。**不要**把这串抄进 \`http_headers\`。用 \`bearer_token_env_var\`，右边是启动 Codex 那个进程里的变量**名**：

\`\`\`toml
[mcp_servers.upstash]
url = "https://mcp.upstash.com/mcp"
bearer_token_env_var = "UPSTASH_MCP_TOKEN"
enabled = true
\`\`\`

从已经 export 的终端启动。变量值是 \`you@example.com:你的密钥\`，不是裸 API key。这张表不要再跑 \`mcp login\`。只读密钥会关掉会改状态的工具。一条连接只用一种鉴权。

**不要抄本地 stdio。** 官方对照是 \`codex mcp add upstash -- npx -y @upstash/mcp-server@latest --email YOUR_EMAIL --api-key YOUR_API_KEY\`。那会把邮箱和密钥写进配置和进程列表。Box 才需要这台本地包；远程覆盖账号级 Redis / QStash / Workflow / Vector / Search。已经有远程 \`upstash\` 时，stdio 必须另起名。

也不要和这两台搞混：

- Context7 文档检索是 \`@upstash/context7-mcp\` / \`mcp.context7.com/mcp\`，Learn 示例表名是 \`context7\`。
- 单库 Redis MCP 是 \`@upstash/redis-mcp\`，要 REST URL / token；那是另一张表，不要把 token 写进 \`env\`。

不要做这些：

- 不要发明 \`upstash@openai-curated\`，也不要抄 \`codex plugin install upstash --source upstash\`。
- 不要抄过时的 \`mcp.upstash.io\`。
- 不要把 \`Authorization: Bearer …\` 或 \`--api-key\` 写进 \`args\` / \`env\` / 提示词。
- 不要和 Context7、单库 redis-mcp、MotherDuck 配成一台。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex plugin list\`；用户层对照 \`codex mcp get upstash\` 看传输是 streamable_http。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "Upstash", "MCP", "OAuth", "Skills"],
    related: ["mcp-add-and-login", "mcp-context7", "tinybird-devtools-mcp"],
    sources: [
      {
        label: "Upstash · Install by agent",
        url: "https://upstash.com/docs/agent-resources/clients",
      },
      {
        label: "Upstash · MCP Server",
        url: "https://upstash.com/docs/agent-resources/mcp",
      },
      {
        label: "upstash/skills",
        url: "https://github.com/upstash/skills",
      },
    ],
  },
  {
    id: "gitlab-mcp-http",
    no: 321,
    title: "GitLab MCP 用 api/v4/mcp，不要抄 rmcp_client",
    summary:
      "官方 Codex：mcp add GitLab --url https://gitlab.com/api/v4/mcp，再 mcp login GitLab。不要抄 features.rmcp_client，也不要抄 mcp-remote。不是 Cloud 评论审查，也不是 Orbit。",
    body: `GitLab 给 Codex 的**官方主路径**是远程 HTTP MCP，不是 \`mcp-remote\`，也不是 Cloud 评论审查。官方 Codex 节是：

\`\`\`bash
codex mcp add GitLab --url https://gitlab.com/api/v4/mcp
codex mcp login GitLab
\`\`\`

自建 / Dedicated 把 \`gitlab.com\` 换成实例主机名，路径仍是 \`/api/v4/mcp\`。用户层表名官方就是驼峰 \`GitLab\`（这不是插件 \`mcp.json\`）。随后 \`mcp login\` 打开浏览器做 OAuth DCR。不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor 的 \`type: http\` JSON。

**不要抄**官方紧跟着的 \`[features] "rmcp_client" = true\`。那是早期 HTTP 客户端旗标，Figma / Notion / Linear / Supabase 几条已经说过：现行 Codex 自己连 Streamable HTTP，再开这个旗标不是前置条件。

先在**顶级组**打开 MCP 服务器访问：Settings → General → Permissions and group features → Allow connection to GitLab。19.2 起这是独立开关，GitLab.com 上 Free 也能用（Beta）。返回 \`404\` 且带 \`no_enabled_namespace\`，就是没开这扇门。不要和 Duo 的「Allow external MCP tools」搞混：那是 GitLab Duo **当客户端**去连别人的 MCP；这台是 Codex **连进** GitLab。

连上后先问 \`get_mcp_server_version\`。工具能列/建 issue、改 MR、\`add_commit\`、管流水线，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。官方提醒：只对你信任的 GitLab 对象用这些工具，防提示注入。

\`\`\`toml
[mcp_servers.GitLab]
url = "https://gitlab.com/api/v4/mcp"
enabled = true
\`\`\`

多实例才考虑给工具名加前缀。前缀本身不是密钥，走 \`env_http_headers\` 的 \`X-Gitlab-Mcp-Server-Tool-Name-Prefix\`（最长 32 字符）。不要把 PAT 写进 \`http_headers\`。主路径是 OAuth，不要发明 PAT / \`bearer_token_env_var\` 当 Codex 主路径。

管理员关掉 DCR 时才要预注册 OAuth 应用：范围勾 \`mcp\`，清掉 Confidential。官方只给了 \`mcp.json\` 的 \`clientId\`，不要把那份 JSON 抄进 Codex。同一共享应用不能服务不同回调 URL。

也不要和这几条搞混：

- Cloud 评论审查是另一条线，要项目环境和 webhook，不是这台 MCP。
- 本地 Orbit 图谱是 \`codex mcp add orbit-cli -- orbit mcp serve\`，表名是 \`orbit-cli\`。远程 Orbit 才是 \`https://gitlab.com/api/v4/orbit/mcp\`，官方给 Codex 的示例仍是 \`mcp-remote\`，不要当 Codex 主路径，也不要和 \`GitLab\` / \`orbit-cli\` 写成同一张表。
- \`glab mcp serve\` 是实验性本地 stdio，文档面向 Claude Code，不要当 Codex 主路径。

不要做这些：

- 不要发明 \`codex plugin add gitlab@…\`。
- 不要抄 \`npx mcp-remote https://gitlab.com/api/v4/mcp\`。Codex 自己走 HTTP。
- 不要抄博客里把 \`--url\` 写在名字前面的变体；官方顺序是 \`mcp add GitLab --url\`。
- 不要把私有令牌写进 URL、\`args\` 或提示词。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex mcp get GitLab\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "GitLab", "OAuth"],
    related: ["mcp-add-and-login", "gitlab-mr-codex-review", "gitlab-orbit-local-mcp"],
    sources: [
      {
        label: "GitLab · MCP server",
        url: "https://docs.gitlab.com/user/model_context_protocol/mcp_server/",
      },
      {
        label: "GitLab · MCP server tools",
        url: "https://docs.gitlab.com/user/model_context_protocol/mcp_server_tools/",
      },
    ],
  },
  {
    id: "sanity-codex-mcp",
    no: 322,
    title: "Sanity MCP 用 mcp.sanity.io，不要加 /mcp 后缀",
    summary:
      "官方 Codex：mcp add Sanity --url https://mcp.sanity.io，再 mcp login Sanity。URL 没有 /mcp 后缀。插件才 marketplace add sanity-io/agent-toolkit，再 /plugins 装 Sanity。不要发明 plugin add id。",
    body: `Sanity 给 Codex 的**官方主路径**是远程 HTTP MCP，不是 \`mcp-remote\`，也不是 ChatGPT 插件目录。源仓 Codex 节是：

\`\`\`bash
codex mcp add Sanity --url https://mcp.sanity.io
codex mcp login Sanity
\`\`\`

URL **没有** \`/mcp\` 后缀，不要发明 \`https://mcp.sanity.io/mcp\`。用户层表名官方就是驼峰 \`Sanity\`（这不是插件 \`mcp.json\`）。随后 \`mcp login\` 打开浏览器做 OAuth。不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor 的 \`type: http\` JSON。

个别 ChatGPT 插件说明会写成小写 \`[mcp_servers.sanity]\` 再 \`mcp login sanity\`。跟源仓 / \`sanity mcp configure\` 写入器走驼峰 \`Sanity\`，**不要**同时留大小写两张表。

\`\`\`toml
[mcp_servers.Sanity]
url = "https://mcp.sanity.io"
enabled = true
\`\`\`

连上后先问 \`whoami\`，确认身份和鉴权方式。然后可以 GROQ 查（\`query_documents\`）、改草稿（\`create_documents\` / \`patch_documents\`）、发文档、部署 schema / Studio。\`generate_image\`、\`transform_image\`，以及带 \`instruction\` 的 \`create_version\` 会消耗 Sanity AI 额度。保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。\`dataset_assets_upload\` 只给本地 CLI 指引，并不真正上传文件。

要技能包时再装插件。官方 Codex 节是：

\`\`\`bash
codex plugin marketplace add sanity-io/agent-toolkit
\`\`\`

然后 TUI \`/plugins\` 选 **Sanity Agent Toolkit** 市场，装 **Sanity**。官方**没给** \`codex plugin add\` id，不要发明。不要抄 Claude 的 \`/plugin install sanity@claude-plugins-official\`，也不要抄 Cursor 的 \`/add-plugin sanity\`。0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace.json 仍要重启应用。IDE 扩展没有 \`/plugins\`。

插件会登记同一台远程 MCP（\`https://mcp.sanity.io\`）。插件已经登记就**不要**再 \`mcp add\` 同一张表。只要 MCP、不装技能时，走上面的 \`mcp add Sanity\`。

\`npx sanity@latest mcp configure\` 的命令参考现在把 Codex CLI 列进检测名单，写入器对 Codex 是 OAuth 模式：往 \`$CODEX_HOME/config.toml\`（默认 \`~/.codex/config.toml\`）写 \`[mcp_servers.Sanity]\`，不把 token 嵌进文件。入门页和源仓 README 仍只写 Cursor / VS Code / Claude Code。它会改**你勾选的所有编辑器**，还可能多写一行 Codex 并不需要的 \`type = "http"\`（传输由 \`url\` 推断）。装完仍要 \`codex mcp login Sanity\`。不要把它当成取代 \`mcp add\` 的 Codex 专节。

也不要用 \`npx skills add sanity-io/agent-toolkit\` 当 Codex 安装器：那会改所有检测到的客户端，不是 \`/plugins\`。

无头 / CI 才改 token。官方 JSON 示例把 \`Authorization: Bearer\` 加 token 写进 \`headers\`。**不要**抄进 Codex 的 \`http_headers\`。用 \`bearer_token_env_var\`，右边是启动 Codex 那个进程里的变量**名**：

\`\`\`toml
[mcp_servers.Sanity]
url = "https://mcp.sanity.io"
bearer_token_env_var = "SANITY_API_TOKEN"
enabled = true
\`\`\`

从已经 export 的终端启动。token 从 sanity.io/manage 或 \`sanity tokens\` 建，权限跟角色走。这张表不要再跑 \`mcp login\`。一条连接只用一种鉴权。

不要做这些：

- 不要发明 \`codex plugin add sanity@…\` 或 \`sanity@openai-curated\`。
- 不要抄 \`npx mcp-remote https://mcp.sanity.io\`。Codex 自己走 HTTP。
- 不要把 ChatGPT Apps / Connectors 里的 Sanity 插件和 CLI \`/plugins\` 当成同一条安装命令。
- 不要把 robot token 写进 URL、\`args\` 或提示词。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex mcp get Sanity\` 看传输是 streamable_http；技能用 \`codex plugin list\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Sanity", "OAuth", "plugins", "Skills"],
    related: ["mcp-add-and-login", "gitlab-mcp-http", "upstash-codex-plugin"],
    sources: [
      {
        label: "sanity-io/agent-toolkit",
        url: "https://github.com/sanity-io/agent-toolkit",
      },
      {
        label: "Sanity · MCP server",
        url: "https://www.sanity.io/docs/ai/mcp-server",
      },
      {
        label: "Sanity · MCP CLI",
        url: "https://www.sanity.io/docs/cli-reference/cli-mcp",
      },
    ],
  },
  {
    id: "honeycomb-codex-plugin",
    no: 323,
    title: "Honeycomb 插件用 honeycomb@honeycomb-plugins，远程带 /mcp",
    summary:
      "官方 Codex：marketplace add honeycombio/agent-skill，再 plugin add honeycomb@honeycomb-plugins。插件会登记 mcp.honeycomb.io/mcp。不要抄 mcp-remote，也不要把 Key ID:Secret 写进 http_headers。",
    body: `Honeycomb 给 Codex 的**官方主路径**是插件，不是 \`mcp-remote\`。配置指南的 Codex 节是：

\`\`\`bash
codex plugin marketplace add honeycombio/agent-skill
codex plugin add honeycomb@honeycomb-plugins
\`\`\`

marketplace 名是 \`honeycomb-plugins\`，插件 id 是 \`honeycomb@honeycomb-plugins\`（\`plugin.json\` 的 \`name\` 是 \`honeycomb\`）。源仓 README 的 Codex 节只写了 marketplace add，然后 TUI 选 **Honeycomb Plugins** 装 Honeycomb；配置指南把 \`plugin add\` 也写出来了，跟 marketplace.json 对得上。0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace.json 仍要重启应用。IDE 扩展没有 \`/plugins\`。官方说重启后插件会登记 MCP。

先让团队打开 **Honeycomb Intelligence**。没开时工具列表是空的，或一律 access denied。不要抄 Claude 的 \`claude plugin install honeycomb\`，也不要抄 \`/honeycomb-setup\`：那是 Claude Code / Cursor / Copilot 的交互命令，Codex 节没写。

插件已经登记 MCP 就**不要**再 \`mcp add\` 同一张表。只要 MCP、插件装不上，或欧盟团队时，用户层对照 Streamable HTTP：

\`\`\`bash
codex mcp add honeycomb --url https://mcp.honeycomb.io/mcp
codex mcp login honeycomb
\`\`\`

欧盟换成 \`https://mcp.eu1.honeycomb.io/mcp\`。插件清单写死美国区 URL，欧盟不要用插件那台 MCP。

\`\`\`toml
[mcp_servers.honeycomb]
url = "https://mcp.honeycomb.io/mcp"
enabled = true
\`\`\`

用户层表名官方就是 \`honeycomb\`。URL **带** \`/mcp\` 后缀，不要发明不带后缀的 \`https://mcp.honeycomb.io\`。不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor 的 \`type: http\` JSON，更不要抄 Amazon Q 的 \`npx mcp-remote\`。

连上后先问 \`get_workspace_context\`，再查环境 / dataset。查询走 \`run_query\`，追踪走 \`get_trace\`。建 Board / Trigger / SLO（\`create_board\`、\`create_trigger\`、\`create_slo\`）要 OAuth 同意里的写权限，或 API key 的 MCP Write。保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。会话大约 24 小时过期，工具突然全挂就新开一轮。

无头 / 不能开浏览器才用 Management API Key（只有团队 Owner 能建）。范围勾 Model Context Protocol 和 Environments；读权限必开，写工具再开 Write。官方示例把 \`Authorization: Bearer\` 加 \`KeyID:Secret\` 塞进 \`mcp-remote\` 的 \`--header\` 和 \`env\`。**不要**抄进 Codex。用 \`bearer_token_env_var\`，右边是启动 Codex 那个进程里的变量**名**：

\`\`\`toml
[mcp_servers.honeycomb]
url = "https://mcp.honeycomb.io/mcp"
bearer_token_env_var = "HONEYCOMB_API_KEY"
enabled = true
\`\`\`

从已经 export 的终端启动。变量值是 \`KeyID:Secret\`（中间那个冒号不能少），不要再加 \`Bearer\` 前缀，也不要把密钥写进 \`http_headers\`。这张表不要再跑 \`mcp login\`。一条连接只用一种鉴权。

不要做这些：

- 不要发明 \`honeycomb@openai-curated\`。
- 不要抄 \`npx mcp-remote https://mcp.honeycomb.io/mcp\`。Codex 自己走 HTTP。
- 不要把 ChatGPT 应用目录里的 Honeycomb 插件和 CLI \`/plugins\` 当成同一条安装命令。
- 不要和 Datadog / Grafana Cloud 那几台配成一台。
- 不要把 Management API Key 写进 URL、\`args\` 或提示词。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex plugin list\`；用户层对照 \`codex mcp get honeycomb\` 看传输是 streamable_http。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "Honeycomb", "MCP", "OAuth", "Skills"],
    related: ["mcp-add-and-login", "sanity-codex-mcp", "mcp-datadog-remote"],
    sources: [
      {
        label: "Honeycomb · Connect to MCP",
        url: "https://docs.honeycomb.io/integrations/mcp/configuration-guide",
      },
      {
        label: "Honeycomb · MCP tools",
        url: "https://docs.honeycomb.io/integrations/mcp/tools",
      },
      {
        label: "honeycombio/agent-skill",
        url: "https://github.com/honeycombio/agent-skill",
      },
    ],
  },
  {
    id: "semgrep-guardian-mcp",
    no: 324,
    title: "Semgrep Guardian 是本地 stdio，不是 Claude 远程插件",
    summary:
      "官方 Codex 是本地 stdio：mcp add semgrep -- semgrep mcp。先 pipx 或 uv 装 CLI，再 semgrep login && semgrep install-semgrep-pro。不要 mcp login，也不要抄 Claude 的 plugin install 或 uvx semgrep-mcp。",
    body: `Semgrep Guardian 给 Codex 的官方页签是**本地 stdio MCP**，不是 Claude 那套托管远程插件。先装 CLI（需要 Python 3.10 及以上）。官方首选 \`pipx install semgrep\` 或 \`uv tool install semgrep\`。Homebrew 是 best-effort，常常落后，不要当主路径。装完：

\`\`\`bash
semgrep --version
semgrep login && semgrep install-semgrep-pro
\`\`\`

\`semgrep login\` 会开浏览器（终端也会印激活链接），凭证进 \`~/.semgrep/settings.yml\`。已经登录过，Guardian / MCP 会用这份，不要再把 token 写进 \`env\` 表。

官方 Codex 节是手写 \`~/.codex/config.toml\`。等价命令：

\`\`\`bash
codex mcp add semgrep -- semgrep mcp
\`\`\`

\`\`\`toml
[mcp_servers.semgrep]
command = "semgrep"
args = ["mcp"]
enabled = true
\`\`\`

这是 stdio，**不要** \`codex mcp login\`。用户层表名官方就是 \`semgrep\`。\`semgrep\` 不在 PATH 时，把 \`command\` 改成 \`which semgrep\` 给出的绝对路径；用 fnm / nvm / pyenv 时尤其不要写裸命令名。第一次拉 Pro 引擎可能慢，可加 \`startup_timeout_sec = 60\`。不要 \`required = true\`。不要一上来 \`--yolo\`。

Codex **没有** post-write hook。工具只在模型调用时跑，不会在每次写文件后自动扫。本地 stdio 会露出 \`semgrep_scan\`（本机绝对路径）、\`semgrep_scan_supply_chain\`、\`semgrep_scan_with_custom_rule\`、\`semgrep_findings\`。旧独立包的 \`security_check\` 已经没了。stdio 没有 \`semgrep_whoami\`（那要 JWT）。连上后让它扫刚写的文件即可。规则走你组织 Policies，不是 Claude 远程默认的 Guardian ruleset。

CI / 无头、没法开浏览器时，才把 \`SEMGREP_APP_TOKEN\` 放进**启动 Codex 的那个进程**，用 \`env_vars\` 转发：

\`\`\`toml
[mcp_servers.semgrep]
command = "semgrep"
args = ["mcp"]
env_vars = ["SEMGREP_APP_TOKEN"]
enabled = true
\`\`\`

不要抄 Kiro 那种把 token 或未展开占位符写进 JSON \`env\` 表。Codex 不会展开那种占位，还会把字面量写进配置。

不要做这些：

- 不要抄 Claude 的 \`claude plugin install semgrep@claude-plugins-official\`。那是托管远程，不需要本地 CLI，Codex 页签不是这条。
- 不要抄 Cursor 的 \`/setup-semgrep-plugin\`，也不要发明 \`codex plugin add semgrep@…\`。
- 不要抄已迁移的独立包 \`uvx semgrep-mcp\`。源仓已经并进主 CLI 的 \`semgrep mcp\`。
- 不要发明 \`codex mcp add semgrep --url https://mcp.semgrep.ai/mcp\`。Codex 页签不是远程 HTTP。
- 不要把 \`semgrep mcp -t streamable-http\` 或 \`localhost:8000/mcp\` 当 Codex 主路径。
- 不要抄 Windsurf 的 \`hooks.json\` / \`semgrep mcp -k post-tool-cli-scan\`。Codex 没有这颗钩子。
- 不要把 Claude 远程 OAuth 写进 \`~/.semgrep/guardian.yml\` 当成 Codex 主路径。本地 CLI 走 \`settings.yml\`。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get semgrep\` 看 command 是 \`semgrep\` 还是绝对路径。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Semgrep", "stdio", "Guardian"],
    related: ["mcp-add-and-login", "mcp-snyk-stdio", "mcp-stdio-env-vars"],
    sources: [
      {
        label: "Semgrep · Guardian overview",
        url: "https://docs.semgrep.dev/semgrep-guardian/overview",
      },
      {
        label: "Semgrep · Install the CLI",
        url: "https://semgrep.dev/docs/getting-started/cli",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "kagi-mcp-stdio",
    no: 325,
    title: "Kagi 官方 Codex 是 uvx kagimcp，密钥用 env_vars",
    summary:
      "官方 Codex：mcp add kagi -- uvx kagimcp。不要抄 --env KAGI_API_KEY= 把密钥写进配置。用 env_vars 转发。托管才 mcp.kagi.com/mcp + bearer_token_env_var。不要 mcp login。",
    body: `Kagi 给 Codex 的官方节是**本地 stdio**，包名 \`kagimcp\`。先装 [\`uv\`](https://docs.astral.sh/uv/)，确认 \`uvx\` 在 PATH。密钥从 [Kagi API keys](https://kagi.com/api/keys) 拿，放进**启动 Codex 的那个进程**。

官方示例写成 \`codex mcp add kagi --env KAGI_API_KEY=\` 再跟密钥本身。**不要抄。** \`--env\` 会把值写进 \`~/.codex/config.toml\`。正确做法：

\`\`\`bash
codex mcp add kagi -- uvx kagimcp
\`\`\`

\`\`\`toml
[mcp_servers.kagi]
command = "uvx"
args = ["kagimcp"]
env_vars = ["KAGI_API_KEY"]
enabled = true
\`\`\`

这是 stdio，**不要** \`codex mcp login\`。用户层表名官方就是 \`kagi\`。\`uvx\` 不在 PATH 时，把 \`command\` 改成 \`which uvx\` 给出的绝对路径。第一次 \`uvx\` 会拉包，可加 \`startup_timeout_sec = 60\`。不要 \`required = true\`。不要一上来 \`--yolo\`。

连上后让它搜：工具是 \`kagi_search_fetch\`。抽页面正文是 \`kagi_extract\`。旧的 \`kagi_fastgpt\` / \`kagi_summarizer\` 已经撤掉了，不要当现行工具。

不想装 \`uvx\` 时，官方另有托管 HTTP：\`https://mcp.kagi.com/mcp\`（**带** \`/mcp\` 后缀）。OAuth 还没做，不要 \`mcp login\`。用 \`bearer_token_env_var\`，右边是启动 Codex 那个进程里的变量**名**：

\`\`\`toml
[mcp_servers.kagi]
url = "https://mcp.kagi.com/mcp"
bearer_token_env_var = "KAGI_API_KEY"
enabled = true
\`\`\`

从已经 export 的终端启动。不要把密钥写进 \`http_headers\`，也不要抄 Claude 的 \`--transport http --header "Authorization: Bearer …"\`。stdio 表和 HTTP 表不要同名混用。

不要做这些：

- 不要把 \`KAGI_API_KEY\` 写进 \`env\` 表或 \`args\`。
- 不要抄 Claude Desktop 的 \`mcpServers\` JSON，也不要抄 Smithery。
- 不要把 \`uv run kagimcp --http --host 0.0.0.0\` 当 Codex 主路径。
- 不要发明 \`codex plugin add kagi@…\`。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get kagi\` 看传输是 stdio 还是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Kagi", "stdio", "search"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "mcp-http-bearer-env"],
    sources: [
      {
        label: "kagisearch/kagimcp",
        url: "https://github.com/kagisearch/kagimcp",
      },
      {
        label: "Kagi · API keys",
        url: "https://kagi.com/api/keys",
      },
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
  },
  {
    id: "pinecone-agent-skills",
    no: 326,
    title: "Pinecone 官方 Codex 是 npx skills add，MCP 另配 stdio",
    summary:
      "官方 Codex：npx skills add pinecone-io/skills --agent codex。不要抄 Claude plugin 或 Cursor /add-plugin。MCP 才 mcp add pinecone -- npx -y @pinecone-database/mcp，密钥用 env_vars。",
    body: `Pinecone 给 Codex 的官方表是 **Agent Skills**，不是 Codex \`/plugins\`。Claude / Cursor / Gemini 各自有专用插件，不要抄过来。

先把 \`PINECONE_API_KEY\` 放进**启动 Codex 的那个进程**，再装技能。只要 Codex 时钉死 agent，避免改到 Claude / Cursor：

\`\`\`bash
npx skills add pinecone-io/skills --agent codex
\`\`\`

不要省略 \`--agent codex\`。不带这个旗标会按默认 agent 落盘，还可能改所有检测到的客户端。也不要手拷到 \`~/.codex/skills\`；现行个人技能目录是 \`~/.agents/skills\`。装完新开会话。

技能文件夹名带 \`pinecone-\` 前缀：\`pinecone-quickstart\`、\`pinecone-query\`、\`pinecone-assistant\`、\`pinecone-cli\`、\`pinecone-mcp\`、\`pinecone-full-text-search\`、\`pinecone-docs\`、\`pinecone-n8n\`、\`pinecone-help\`。\`pinecone-query\` 要 MCP 才有用。\`pinecone-cli\` 要本机有 \`pc\`（\`brew install pinecone-io/tap/pinecone\`）。不要发明 \`codex plugin add pinecone@…\`。

可选 MCP 是本地 stdio 包 \`@pinecone-database/mcp\`。官方只给了 Claude / Cursor / Desktop 的 JSON。Codex 对照：

\`\`\`bash
codex mcp add pinecone -- npx -y @pinecone-database/mcp
\`\`\`

\`\`\`toml
[mcp_servers.pinecone]
command = "npx"
args = ["-y", "@pinecone-database/mcp"]
env_vars = ["PINECONE_API_KEY"]
enabled = true
startup_timeout_sec = 60
\`\`\`

这是 stdio，**不要** \`codex mcp login\`。**不要抄** JSON \`env\` 表里的 \`PINECONE_API_KEY\` 字面量或 \`{{YOUR_API_KEY}}\` 占位。\`npx\` 不在 PATH 时写成 \`which npx\` 的绝对路径。npx 冷启动慢就加 \`startup_timeout_sec\`。不要 \`required = true\`。不要一上来 \`--yolo\`。

这台只支持**带集成 embedding 的索引**。外置向量模型建的索引它扫不了。连上后可让它 \`search-docs\`、\`list-indexes\`、\`search-records\`。写工具（\`create-index-for-model\`、\`upsert-records\`）保持批准。

**Assistant MCP 是另一台**：每个 Assistant 有自己的远程端点，不要和 \`@pinecone-database/mcp\` 配成一张表。

不要做这些：

- 不要抄 \`claude plugin install pinecone\`，也不要抄 Cursor 的 \`/add-plugin pinecone\`。
- 不要抄 Gemini 的 \`gemini extensions install\`。
- 不要把密钥写进 \`args\` 或项目 \`mcp.json\`。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get pinecone\` 看 command 是 npx。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Skills", "Pinecone", "MCP", "stdio"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "skill-creator"],
    sources: [
      {
        label: "Pinecone · Agent Skills",
        url: "https://docs.pinecone.io/integrations/agent-skills",
      },
      {
        label: "Pinecone · MCP server",
        url: "https://docs.pinecone.io/guides/operations/mcp-server",
      },
      {
        label: "pinecone-io/skills",
        url: "https://github.com/pinecone-io/skills",
      },
    ],
  },
  {
    id: "heroku-mcp-http",
    no: 327,
    title: "Heroku 远程 MCP 用 mcp.heroku.com/mcp，不要抄 mcp-remote",
    summary:
      "官方远程是 mcp.heroku.com/mcp，Codex 对照 mcp add heroku --url 再 mcp login。不要抄 mcp-remote 或 Cursor JSON。本地才 heroku mcp:start；npx 才 env_vars 转发 HEROKU_API_KEY。",
    body: `Heroku 给 Codex 没有专节。远程页只写「按客户端文档加 URL」，地址是 \`https://mcp.heroku.com/mcp\`（**带** \`/mcp\` 后缀），鉴权是 OAuth 2.0，浏览器走 \`id.heroku.com\`。Codex 原生 Streamable HTTP + \`mcp login\` 就是这条对照，不是发明插件。

主路径：

\`\`\`bash
codex mcp add heroku --url https://mcp.heroku.com/mcp
codex mcp login heroku
\`\`\`

用户层表名跟官方示例一样用小写 \`heroku\`。不要抄 Cursor 的 \`mcpServers\` JSON，也不要抄 VS Code 的 MCP Add Server 步骤原文。不要抄博客里的 \`npx mcp-remote https://mcp.heroku.com/mcp\`：Codex 自己走 HTTP。客户端必须支持 Streamable HTTP，不是 SSE。

\`\`\`toml
[mcp_servers.heroku]
url = "https://mcp.heroku.com/mcp"
enabled = true
\`\`\`

连上后保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。远程页**没列**工具名；应用列表、日志、Postgres 查询只写在 STDIO 文档，不要当成远程已核对清单。

登录卡住时：清掉 \`mcp.heroku.com\` 的浏览器 cookie，删掉这张表再 \`mcp add\`，再 \`mcp login\`。不要去跑 \`rm -rf ~/.mcp-auth\`——那是 \`mcp-remote\` 客户端的复位步骤。

本地 STDIO 是另一条线，官方标 early development，推荐 Heroku CLI 10.8.1+ 的 \`heroku mcp:start\`，用现有 \`heroku login\` 会话，**不要** \`HEROKU_API_KEY\`。官方不少 JSON 把 command 写成一整串 \`heroku mcp:start\`，Codex 要拆开：

\`\`\`bash
codex mcp add heroku -- heroku mcp:start
\`\`\`

\`\`\`toml
[mcp_servers.heroku]
command = "heroku"
args = ["mcp:start"]
enabled = true
\`\`\`

这是 stdio，**不要** \`codex mcp login\`。\`heroku\` 不在 PATH 时写成 \`which heroku\` 的绝对路径。远程表和 stdio 表不要同名混用。

npx 备选才用 \`npx -y @heroku/mcp-server\`，必须 \`env_vars\` 转发 \`HEROKU_API_KEY\`。**不要抄** JSON \`env\` 表里的 token 字面量。token 用 \`heroku authorizations:create\` 或 \`heroku auth:token\`。这张表也不要 \`mcp login\`。npx 冷启动慢就加 \`startup_timeout_sec\`。

也不要和 Railway 搞混：Railway 托管是 \`mcp.railway.com\`，**没有** \`/mcp\` 后缀，主路径是 \`/plugins\` 搜 Railway。

不要做这些：

- 不要发明 \`codex plugin add heroku@…\`。
- 不要抄 \`npx mcp-remote https://mcp.heroku.com/mcp\`。
- 不要把 \`HEROKU_API_KEY\` 写进 \`env\` 表或 \`args\`。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get heroku\` 看传输是 streamable_http 还是 stdio。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Heroku", "OAuth"],
    related: ["mcp-add-and-login", "gitlab-mcp-http", "mcp-stdio-env-vars"],
    sources: [
      {
        label: "Heroku · Remote MCP Server",
        url: "https://devcenter.heroku.com/articles/heroku-remote-mcp-server",
      },
      {
        label: "Heroku · MCP Server STDIO",
        url: "https://devcenter.heroku.com/articles/heroku-mcp-server",
      },
      {
        label: "heroku/heroku-mcp-server",
        url: "https://github.com/heroku/heroku-mcp-server",
      },
    ],
  },
  {
    id: "litestream-mcp-http",
    no: 328,
    title: "Litestream MCP 先开 mcp-addr，再连 localhost:3001",
    summary:
      "官方 Codex：mcp add litestream --url http://localhost:3001。先在 litestream.yml 写 mcp-addr，再 litestream replicate。没有 litestream mcp 子命令。不要 mcp login，也不要抄 Claude 的 --transport http。",
    body: `Litestream 给 Codex 的官方节就是这一条：

\`\`\`bash
codex mcp add litestream --url http://localhost:3001
\`\`\`

URL **没有** \`/mcp\` 后缀，协议是 \`http\` 不是 \`https\`。这是本机 Streamable HTTP，**不要** \`codex mcp login\`：官方写明 MCP **没有内建鉴权**。不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor / Claude Desktop 的 \`mcpServers\` JSON。

MCP 不是单独进程。没有 \`litestream mcp\` 子命令，也没有等价 CLI 旗标。要先在 Litestream 自己的 YAML 里开 \`mcp-addr\`（0.5.0 起），再跑 replicate：

\`\`\`yaml
mcp-addr: "127.0.0.1:3001"
\`\`\`

\`\`\`bash
litestream replicate -config litestream.yml
\`\`\`

日志里应出现 \`Starting MCP Streamable HTTP server\`。只绑回环，不要写成 \`0.0.0.0\`。不要把这台暴露到公网。远程访问官方建议 SSH 隧道或反向代理；Fly.io 的 \`flyctl mcp proxy --stream\` 是给 Claude Desktop 的 stdio 包装，**不要**当 Codex 主路径。

\`\`\`toml
[mcp_servers.litestream]
url = "http://localhost:3001"
enabled = true
\`\`\`

先让 Litestream 起来，再开 Codex。连上后可问状态（\`litestream_info\` / \`litestream_databases\` / \`litestream_status\`），列恢复点（\`litestream_ltx\`）。\`litestream_restore\` 和 \`litestream_reset\` 会动库，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。

GitHub 上的 Agent Skill 还是提案，不要发明 \`npx skills add\` 或 \`codex plugin add litestream@…\`。

不要做这些：

- 不要抄 \`claude mcp add litestream --transport http\`。
- 不要发明 \`https://localhost:3001/mcp\`。
- 不要把 Fly.io 的 \`flyctl mcp proxy\` JSON 抄进 Codex。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 够不到你笔记本上的 3001。改完新开会话。用 \`codex mcp get litestream\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Litestream", "SQLite"],
    related: ["mcp-add-and-login", "heroku-mcp-http", "mcp-http-not-sse"],
    sources: [
      {
        label: "Litestream · MCP Server",
        url: "https://litestream.io/reference/mcp/",
      },
      {
        label: "Litestream · Configuration",
        url: "https://litestream.io/reference/config/",
      },
    ],
  },
  {
    id: "pagerduty-mcp-http",
    no: 329,
    title: "PagerDuty 托管 MCP 用 Token token=，不要 mcp login",
    summary:
      "官方托管是 mcp.pagerduty.com/mcp。Codex 对照 mcp add pagerduty --url。官方不支持 DCR，不要 mcp login。API key 是 Token token=，走 env_http_headers，不要 bearer_token_env_var。本地 uvx 已弃用。",
    body: `PagerDuty 给 Codex 没有专节。官方现在的主路径是托管远程，地址 \`https://mcp.pagerduty.com/mcp\`（**带** \`/mcp\` 后缀）。本地 \`uvx pagerduty-mcp\` 仓库已 archived，不要再当主路径。账号要 Advanced Permissions。欧盟区换 \`https://mcp.eu.pagerduty.com/mcp\`。

官方写明 **不支持 Dynamic Client Registration**。Codex 的 \`mcp login\` 默认走 DCR，对这台会对不上。不要抄第三方的 \`codex mcp add pagerduty --transport http\`：Codex 没有 \`--transport http\`。也不要抄 Claude 的 \`claude mcp add-json\` 加 \`MCP_CLIENT_SECRET\`。

API key 鉴权官方头是 \`Authorization: Token token=\` 后接 User API Token，**不是** Bearer。\`bearer_token_env_var\` 会发 Bearer，对这台不对口。Codex 用 \`env_http_headers\`，变量值必须是完整的 \`Token token=\` 前缀加 token，不要只放裸密钥：

\`\`\`bash
export PAGERDUTY_AUTH="Token token=你的 User API Token"
codex mcp add pagerduty --url https://mcp.pagerduty.com/mcp
\`\`\`

\`\`\`toml
[mcp_servers.pagerduty]
url = "https://mcp.pagerduty.com/mcp"
enabled = true

[mcp_servers.pagerduty.env_http_headers]
Authorization = "PAGERDUTY_AUTH"
\`\`\`

从已经 export 的终端启动。缺变量或空值会静默不带头，请求照样发出去。不要把 token 写进 \`http_headers\`。不要 \`codex mcp login pagerduty\`。OAuth 静态 client id/secret 官方只给了 VS Code / Claude 示例，不要发明 Codex 的 \`oauth.clientId\`。

连上后先问 \`browse_incidents\`。\`manage_incidents\` / \`manage_services\` 等会改值班数据，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。

不要做这些：

- 不要发明 \`codex plugin add pagerduty@…\`。
- 不要抄 \`npx mcp-remote https://mcp.pagerduty.com/mcp\`。
- 不要用 \`bearer_token_env_var\`。
- 不要把 \`PAGERDUTY_USER_API_KEY\` 写进 \`env\` 表当远程主路径。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get pagerduty\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "PagerDuty", "HTTP"],
    related: ["mcp-http-env-headers", "heroku-mcp-http", "mcp-add-and-login"],
    sources: [
      {
        label: "PagerDuty · MCP Server",
        url: "https://support.pagerduty.com/main/docs/pagerduty-mcp-server",
      },
      {
        label: "PagerDuty/pagerduty-mcp-server",
        url: "https://github.com/PagerDuty/pagerduty-mcp-server",
      },
    ],
  },
  {
    id: "fly-mcp-stdio",
    no: 330,
    title: "Fly.io 本地 MCP 用 fly mcp server，不要 --config 改 TOML",
    summary:
      "官方标 experimental。给 LLM 加服务器是 fly mcp server --claude，没有 --codex。Codex 拆 command/args：mcp add fly -- fly mcp server。不要对 config.toml 跑 --config，也不要抄 --sse 或 flyctl mcp proxy。",
    body: `Fly.io 给 Codex 没有专节。官方本地 MCP 是 \`fly mcp server\`，标 experimental。给 LLM 加服务器的官方写法是 \`fly mcp server --claude\`，也可以 \`--cursor\` / \`--neovim\` / \`--vscode\` / \`--windsurf\` / \`--zed\`。**没有** \`--codex\`。

\`--config\` 会往客户端配置文件写 JSON \`mcpServers\`。不要对 \`~/.codex/config.toml\` 跑 \`--config\`，会把 TOML 弄坏。也不要把那份 JSON 整段贴进 Codex。

Codex 主路径对照 Heroku 本地 stdio：拆开 command / args，用现有 \`fly auth login\` 会话：

\`\`\`bash
codex mcp add fly -- fly mcp server
\`\`\`

\`\`\`toml
[mcp_servers.fly]
command = "fly"
args = ["mcp", "server"]
enabled = true
\`\`\`

这是 stdio，**不要** \`codex mcp login\`。文档混用 \`fly\` 和 \`flyctl\`；本机二进制叫 \`flyctl\` 就把 command 改成它。不在 PATH 时写成 \`which fly\` 或 \`which flyctl\` 的绝对路径。不要把 command 写成一整串 \`fly mcp server\`。

不要把 \`FLY_ACCESS_TOKEN\` 写进 \`env\` 表，也不要把 \`--access-token\` 塞进 \`args\`。HTTP 另绑才看请求头、\`--access-token\`、\`FLY_ACCESS_TOKEN\` 这套优先级；那不是 Codex 主路径。

不要抄 \`--sse\` / \`--stream\` 当 Codex 主路径。那是另起 HTTP，默认绑 \`127.0.0.1:8080\`。也不要抄 \`flyctl mcp proxy\`：那是给 Claude Desktop 包远程 MCP 的 stdio 包装，Litestream 那条已经说过不要当 Codex 主路径。

\`fly mcp add\` 是给远程 MCP proxy 客户端写 JSON，同样没有 \`--codex\`，不要当 Codex 主路径。\`fly mcp launch\` 是把别的 MCP 部署到 Fly Machine，也不是连这台 flyctl 服务器。

Inspector 可先 \`fly mcp server -i\` 看工具：\`fly-platform-status\`、\`fly-orgs-list\`、\`fly-apps-list\`、\`fly-machines-list\`。正式会话先问列表类工具。\`secrets\` / \`volumes\` / \`machine\` 会改线上资源，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。

不要和 Heroku / Railway 搞成一台。Heroku 远程是 \`mcp.heroku.com/mcp\` 再 \`mcp login\`；Railway 托管是 \`mcp.railway.com\` 且主路径是 \`/plugins\`。

不要做这些：

- 不要发明 \`codex plugin add fly@…\`。
- 不要发明 \`fly mcp server --codex\`。
- 不要对 \`~/.codex/config.toml\` 跑 \`fly mcp server --config\`。
- 不要把 \`FLY_ACCESS_TOKEN\` 写进 \`env\` 表或 \`args\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get fly\` 看传输是 stdio。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Fly.io", "stdio"],
    related: ["mcp-add-and-login", "heroku-mcp-http", "litestream-mcp-http"],
    sources: [
      {
        label: "Fly.io · flyctl mcp server",
        url: "https://fly.io/docs/mcp/flyctl-server/",
      },
      {
        label: "flyctl · fly mcp server",
        url: "https://fly.io/docs/flyctl/mcp-server/",
      },
    ],
  },
  {
    id: "atlan-codex-mcp",
    no: 331,
    title: "Atlan 官方 Codex：plugin add atlan@atlan，再 mcp add",
    summary:
      "官方 Codex：marketplace add atlanhq/agent-toolkit，再 plugin add atlan@atlan，再 mcp add atlan --url https://mcp.atlan.com/mcp。装了插件仍要 mcp add。不要抄 Claude 的 atlan@atlan-marketplace 或本地 docker。",
    body: `Atlan 给 Codex 有专节。托管地址是 \`https://mcp.atlan.com/mcp\`（**带** \`/mcp\` 后缀），所有租户共用这一台，OAuth，不必先备 API key。仓库里的本地 MCP（\`pip install atlan-mcp-server\`、\`uvx atlan-mcp-server\`、Docker 镜像）已弃用，不要再当主路径。

官方 Codex **插件**节是这三步，缺一步都不算装完：

\`\`\`bash
codex plugin marketplace add https://github.com/atlanhq/agent-toolkit
codex plugin add atlan@atlan
codex mcp add atlan --url https://mcp.atlan.com/mcp
\`\`\`

插件 id 是 \`atlan@atlan\`。不要抄 Claude 的 \`atlan@claude-plugins-official\` 或 \`atlan@atlan-marketplace\`。也不要抄仓库 README 给 Claude 的 \`/plugin install\`。Honeycomb 那类插件会自己登记 MCP；Atlan **不会**——官方把 \`mcp add\` 单独写成第 3 步，装了插件仍要跑。

只要 MCP、不装插件，走 Manual 节，命令就是上面那条 \`mcp add\`。官方说它会写入 \`[mcp_servers.atlan]\` 并拉起浏览器 OAuth。若只写入表、没弹出登录，再：

\`\`\`bash
codex mcp login atlan
\`\`\`

\`\`\`toml
[mcp_servers.atlan]
url = "https://mcp.atlan.com/mcp"
enabled = true
\`\`\`

不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor 的 \`type: http\` JSON。不要抄 \`npx mcp-remote https://mcp.atlan.com/mcp\`。不要和文档站 \`https://docs.atlan.com/mcp\` 配成一台：那是 Atlan 文档 MCP，不是数据目录。也不要抄 Snowflake Cortex 的 \`cortex mcp add\`。

改完退出再开会话（桌面用退出应用，不要只关窗口）。用 \`/mcp\` 看 \`atlan\` 是否已连。连上后先搜资产和血缘。治理写入和 SQL 查询会改元数据或打到数仓，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。

无头 / 不能开浏览器才对照 API key。官方 Codex 节没写这条；Claude 示例把 Bearer 写进 \`headers\`。Codex 用 \`bearer_token_env_var\`，不要把密钥写进 \`http_headers\`。这张表不要再 \`mcp login\`。一条连接只用一种鉴权。

不要做这些：

- 不要发明 \`atlan@openai-curated\`。
- 不要抄本地 Docker / uvx，把 \`ATLAN_API_KEY\` 写进 \`args\` 或 \`env\` 表。
- 不要抄 \`claude mcp add --transport http\`。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex plugin list\`；MCP 用 \`codex mcp get atlan\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Atlan", "plugins", "OAuth"],
    related: ["mcp-add-and-login", "shopify-ai-toolkit", "honeycomb-codex-plugin"],
    sources: [
      {
        label: "Atlan · Set up Atlan MCP",
        url: "https://docs.atlan.com/product/capabilities/atlan-ai/how-tos/remote-mcp-overview",
      },
      {
        label: "atlanhq/agent-toolkit",
        url: "https://github.com/atlanhq/agent-toolkit",
      },
    ],
  },
  {
    id: "splunk-o11y-mcp-http",
    no: 332,
    title: "Splunk Observability 走 MCP Gateway，头是 X-SF-TOKEN",
    summary:
      "官方走 Splunk MCP Gateway，不是直连 O11Y。o11y-only 只要 X-SF-TOKEN 和 X-SF-REALM，不是 Bearer。不要抄 connect --ide codex 写入的 http_headers，也不要抄 mcp-remote。",
    body: `Splunk Observability 给 Codex 有专节。它走 Splunk MCP Gateway，不是直连 O11Y。旧地址形如 \`https://api.us0.signalfx.com/v2/mcp\` 已弃用，不要再配。网关 URL 带尾斜杠，**没有** \`/mcp\` 后缀。本条按官方 Scenario 3：只要 Observability 工具，不要 Splunk 平台工具。

o11y-only 只要两颗头：\`X-SF-TOKEN\` 和 \`X-SF-REALM\`。**不是** Bearer。\`bearer_token_env_var\` 会发 \`Authorization: Bearer\`，对这台不对口。官方 Codex 聊天 / registry 示例让人把 token 当 bearer-token，**不要抄**。

官方 CLI \`npx @splunk/o11y-mcp-connect connect --ide codex\` 会往 \`~/.codex/config.toml\` 写 \`url\` 加 \`http_headers\` 字面量 token。不要当 Codex 主路径。改成 \`mcp add\` 加 \`env_http_headers\`。示例用 us0；网关主机用 SCS 区域名 iad10，头 \`X-SF-REALM\` 仍是 us0，不要把 iad10 写进这颗头。

\`\`\`bash
export SPLUNK_O11Y_TOKEN=你的 Observability access token
export SPLUNK_O11Y_REALM=us0
codex mcp add splunk-o11y --url https://region-iad10.api.scs.splunk.com/system/mcp-gateway/v1/
\`\`\`

\`\`\`toml
[mcp_servers.splunk-o11y]
url = "https://region-iad10.api.scs.splunk.com/system/mcp-gateway/v1/"
enabled = true

[mcp_servers.splunk-o11y.env_http_headers]
X-SF-TOKEN = "SPLUNK_O11Y_TOKEN"
X-SF-REALM = "SPLUNK_O11Y_REALM"
\`\`\`

realm 和网关主机对照（头仍写左边的 realm，不要把右边的 SCS 名写进 \`X-SF-REALM\`）：

- us0 → \`https://region-iad10.api.scs.splunk.com/system/mcp-gateway/v1/\`
- us1 / us2 / us3 → \`https://region-pdx10.api.scs.splunk.com/system/mcp-gateway/v1/\`
- eu0 → \`https://region-dub10.api.scs.splunk.com/system/mcp-gateway/v1/\`
- eu1 → \`https://region-fra10.api.scs.splunk.com/system/mcp-gateway/v1/\`
- eu2 → \`https://region-lon10.api.scs.splunk.com/system/mcp-gateway/v1/\`
- jp0 → \`https://region-tyo10.api.scs.splunk.com/system/mcp-gateway/v1/\`
- au0 → \`https://region-syd10.api.scs.splunk.com/system/mcp-gateway/v1/\`
- sg0 → \`https://region-sin10.api.scs.splunk.com/system/mcp-gateway/v1/\`

从已经 export 的终端启动。缺变量或空值会静默不带头，请求照样发出去。不要把 token 写进 \`http_headers\`。这是 HTTP，不要 \`codex mcp login splunk-o11y\`（无 DCR / OAuth 主路径）。不要抄 \`npx mcp-remote\`。不要抄 \`--transport http\`。

同时要 Splunk 平台工具才走 Scenario 2：再加 \`Authorization\` 和 \`splunk_tenant\`。o11y-only 不要加这两颗头。

桌面 Plugins 搜 Splunk O11y MCP，在启动 Codex 的 shell 里设好 \`SPLUNK_O11Y_REALM\` 和 \`SPLUNK_O11Y_TOKEN\`，再跑 connect skill。不要发明 \`codex plugin add splunk@openai-curated\`。Plugins 里没有时，npm README 还写 \`codex plugin marketplace add signalfx/splunk-o11y-mcp-connect\`，再装 \`splunk-o11y-mcp-codex\`。GitHub 仓库 \`signalfx/splunk-o11y-mcp-connect\` 当前 404，不要当主路径，也不要假装能 clone。

不要和 Datadog 配成一台。不要给它 \`required = true\` 挂全局。不要一上来 \`--yolo\`。网页 Cloud 不读 \`~/.codex/config.toml\`。改完退出再开会话。用 \`codex mcp get splunk-o11y\` 看传输是 streamable_http。连上后先查指标和探测器，写入类工具保持批准。

不要做这些：

- 不要抄 CLI 写入的 \`http_headers\` 字面量 token。
- 不要抄 registry 聊天里的 bearer-token。
- 不要抄旧直连 \`api.us0.signalfx.com/v2/mcp\`。
- 不要抄 \`npx mcp-remote\`。
- 不要发明 \`codex plugin add splunk@openai-curated\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Splunk", "Observability", "HTTP"],
    related: ["mcp-http-env-headers", "mcp-datadog-remote", "atlan-codex-mcp"],
    sources: [
      {
        label: "npm · @splunk/o11y-mcp-connect",
        url: "https://www.npmjs.com/package/@splunk/o11y-mcp-connect",
      },
      {
        label: "Splunk · Configure Observability tools",
        url: "https://help.splunk.com/en/splunk-cloud-platform/mcp-server-for-splunk-platform/1.3/configure-splunk-observability-tools-with-splunk-mcp-server",
      },
    ],
  },
  {
    id: "elastic-agent-builder-mcp",
    no: 333,
    title: "Elastic Agent Builder MCP 用 ApiKey 头，不要 mcp-remote",
    summary:
      "官方终点是 Kibana 的 /api/agent_builder/mcp。Codex 对照 mcp add elastic-agent-builder --url。API key 是 Authorization: ApiKey，走 env_http_headers，不要 bearer_token_env_var。本地 elastic/mcp-server-elasticsearch 已弃用。",
    body: `Elastic 给 Codex 没有专节。现在的主路径是 Kibana 上的 Agent Builder MCP，地址形如 \`https://my-project.kb.us-east-1.aws.elastic.cloud/api/agent_builder/mcp\`（路径以 \`/api/agent_builder/mcp\` 结尾）。这是 Kibana 主机，不要拿 \`*.es.*.elastic.cloud\` 那台 Elasticsearch API 主机去配。Serverless 已 GA；Elastic Stack 9.3 起 GA，9.2 是 Preview。

官方示例用 \`npx mcp-remote\` 再 \`--header Authorization\`。不要抄进 Codex。也不要抄营销页的 \`npx @elastic/mcp-server-elasticsearch --hosted-url\`：那个本地包已弃用，仓库只留安全补丁。

API key 鉴权官方头是 \`Authorization: ApiKey\` 后接 encoded key，**不是** Bearer。\`bearer_token_env_var\` 会发 Bearer，对这台不对口。Codex 用 \`env_http_headers\`，变量值必须是完整的 \`ApiKey \` 前缀加密钥，不要只放裸密钥：

\`\`\`bash
export ELASTIC_AUTH="ApiKey 你的 encoded API key"
codex mcp add elastic-agent-builder --url https://my-project.kb.us-east-1.aws.elastic.cloud/api/agent_builder/mcp
\`\`\`

\`\`\`toml
[mcp_servers.elastic-agent-builder]
url = "https://my-project.kb.us-east-1.aws.elastic.cloud/api/agent_builder/mcp"
enabled = true

[mcp_servers.elastic-agent-builder.env_http_headers]
Authorization = "ELASTIC_AUTH"
\`\`\`

密钥要带 Kibana 应用权限 \`feature_agentBuilder.read\`，否则连上就是 403。从已经 export 的终端启动。缺变量或空值会静默不带头。不要把 key 写进 \`http_headers\`。这张 API key 表不要 \`codex mcp login elastic-agent-builder\`。

自定义 Kibana Space 把路径改成 \`/s/marketing/api/agent_builder/mcp\`，把 marketing 换成你的 space id。默认 space 不必加 \`/s/\`。

Serverless 才有 OAuth 2.1。官方写明 **不支持**只靠 Dynamic Client Registration 的客户端。Codex 的 \`mcp login\` 默认走 DCR，对这台会对不上。先在 Kibana 登记 MCP client，再：

\`\`\`bash
codex mcp add elastic-agent-builder --url https://my-project.kb.us-east-1.aws.elastic.cloud/api/agent_builder/mcp --oauth-client-id 你的 client id
codex mcp login elastic-agent-builder
\`\`\`

不要抄 Claude 的 \`--transport http --client-id\`。不要抄 \`MCP_CLIENT_SECRET\`。机密 client 的 secret 官方只给 Claude / Cursor 示例，不要发明 Codex 的 \`--oauth-client-secret\`。一条连接只用一种鉴权，不要 API key 和 OAuth 叠在同一张表。闲置超过 30 天要重新授权。

不要和 Datadog / Splunk Observability 配成一台。不要给它 \`required = true\` 挂全局。不要一上来 \`--yolo\`。网页 Cloud 不读 \`~/.codex/config.toml\`。改完退出再开会话。用 \`codex mcp get elastic-agent-builder\` 看传输是 streamable_http。连上后先跑只读查询；写入类工具和 Workflows 保持批准。

不要做这些：

- 不要抄 \`npx mcp-remote\`。
- 不要抄已弃用的 \`@elastic/mcp-server-elasticsearch\`。
- 不要用 \`bearer_token_env_var\`。
- 不要发明 \`codex plugin add elastic@openai-curated\`。
- 不要抄 Composio 的 Kibana toolkit。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Elastic", "Kibana", "HTTP"],
    related: ["mcp-http-env-headers", "pagerduty-mcp-http", "splunk-o11y-mcp-http"],
    sources: [
      {
        label: "Elastic · Agent Builder MCP server",
        url: "https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/mcp-server",
      },
      {
        label: "Elastic · Authenticate MCP clients with API keys",
        url: "https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/mcp-server-api-keys",
      },
    ],
  },
  {
    id: "incident-io-codex-mcp",
    no: 334,
    title: "incident.io 插件用 incident-io@incident-io-skills，远程带 /mcp",
    summary:
      "官方 Codex：marketplace add incident-io/skills，再 plugin add incident-io@incident-io-skills。插件会登记 MCP 和 skills。IDE 没有插件才 mcp add incident_io --url https://mcp.incident.io/mcp。",
    body: `incident.io 给 Codex 有专节。CLI / ChatGPT 桌面的**官方主路径**是插件，不是手写 MCP，也不是 macOS 桌面应用自带的本地 MCP：

\`\`\`bash
codex plugin marketplace add incident-io/skills
codex plugin add incident-io@incident-io-skills
\`\`\`

插件 id 是 \`incident-io@incident-io-skills\`。官方写明插件会把 MCP **和** skills 配好。装了插件就**不要**再 \`mcp add\` 同一张表。用 \`codex plugin list\` 确认已装，再新开一轮（0.154 起先看**当前会话**；当前会话没有再新开）。桌面改 marketplace 仍要重启应用。

插件在 Codex CLI 和 ChatGPT 桌面可用。**IDE 扩展不支持插件**。自装 marketplace 更新：\`codex plugin marketplace upgrade\`。Business / Enterprise 才是 Admin → Plugins → Marketplaces 日同步；管理员也可 Sync now。先在 incident.io 的 Settings → MCP 打开远程 MCP，没开时连不上。

不要抄 Claude 的 \`/plugin marketplace add\` / \`/plugin install\`。不要抄 Cursor 的 \`/add-plugin\`。不要抄 \`npx skills add incident-io/skills -a zed\`（那是给 Zed / Cline / Roo / Amp）。不要抄 Claude 的 \`extraKnownMarketplaces\` JSON。不要发明 \`incident-io@openai-curated\`。

只要 MCP、不装插件（IDE 扩展走这条），托管地址是 \`https://mcp.incident.io/mcp\`（**带** \`/mcp\` 后缀）。官方 Codex 节把 \`type = "url"\` 写进 \`config.toml\`，那不是 Codex 键，**不要抄**。对照：

\`\`\`bash
codex mcp add incident_io --url https://mcp.incident.io/mcp
codex mcp login incident_io
\`\`\`

\`\`\`toml
[mcp_servers.incident_io]
url = "https://mcp.incident.io/mcp"
enabled = true
\`\`\`

用户层表名官方就是 \`incident_io\`（下划线）。官方说 Codex 会在首次使用时弹浏览器授权；若只写入表、没弹出，再 \`mcp login\`。这台是 PKCE 公有客户端，**支持**客户端自动登记，和 PagerDuty / Elastic「不支持 DCR」不同。不要把「不要 mcp login」抄过来。也不要抄 Claude 的 \`--transport http\`。不要发明 \`--oauth-client-id incident-mcp\`（那是给 Gemini Enterprise 手填 OAuth 的 Client ID，Codex 会自己发现）。不要把 Authorization URL / Token URL 手填进 Codex。OAuth 连接 28 天要重新授权。

不要抄 \`npx mcp-remote\`。不要和 PagerDuty 配成一台：PagerDuty 是 \`Token token=\` 且不要 mcp login；incident.io 交互路径是 OAuth，无头才 Bearer。

无头 / 不能开浏览器才用 API key。官方要 \`Authorization: Bearer\`。Codex 用 \`bearer_token_env_var\`，不要把密钥写进 \`http_headers\`：

\`\`\`toml
[mcp_servers.incident_io]
url = "https://mcp.incident.io/mcp"
bearer_token_env_var = "INCIDENT_API_KEY"
enabled = true
\`\`\`

从已经 export 的终端启动。变量值是裸密钥，不要再加 \`Bearer\` 前缀。这张表不要再 \`mcp login\`。一条连接只用一种鉴权。

连上后先读组织配置（\`resource_show\` 的 organisation）或跑 \`incident_stats\`，再按 stats → list → show 往下钻。\`incident_create\` / \`incident_update\` / \`escalation_respond\` / \`follow_up_create\` 会改事故数据，保持工具批准。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。网页 Cloud 不读 \`~/.codex/config.toml\`。改完退出再开会话。用户层对照 \`codex mcp get incident_io\` 看传输是 streamable_http。

不要做这些：

- 不要把 incident.io **macOS 桌面应用**的本地 MCP 当 Codex 主路径。
- 不要抄 \`type = "url"\`。
- 不要抄 \`npx mcp-remote https://mcp.incident.io/mcp\`。
- 不要发明 \`incident-io@openai-curated\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "incident.io", "plugins", "OAuth"],
    related: ["mcp-add-and-login", "pagerduty-mcp-http", "honeycomb-codex-plugin"],
    sources: [
      {
        label: "incident.io · Remote MCP server",
        url: "https://docs.incident.io/ai/remote-mcp",
      },
      {
        label: "incident-io/skills",
        url: "https://github.com/incident-io/skills",
      },
    ],
  },
  {
    id: "1password-mcp-stdio",
    no: 335,
    title: "1Password Environments 是本地 1password-mcp，不要抄 Claude 插件",
    summary:
      "官方 Codex 是本地 stdio：先在桌面 Labs 打开 MCP Server，再 mcp add 1password -- 1password-mcp。Mac / Linux。不要抄 Claude 的 /plugin install 1password@1password，也不要发明 plugin add。",
    body: `1Password Environments 给 Codex 有专节。这是**本地 stdio**，跟着 1Password 桌面应用走，不是远程 HTTP，也不会把密钥送进模型上下文。官方写明服务器只能看见 Environment / 变量名，即使模型要明文也拿不到。

先开桌面开关，再配 Codex。没开时命令在 PATH 里也连不上：

1. 装 1Password 桌面应用，先建好一个 Environment。
2. Settings → Labs → MCP Server，打开 **Enable local MCP server**。
3. Settings → Developer，选 Integrate with MCP clients。
4. Enterprise Password Manager 还要管理员在 Policies → Agentic permissions 打开 Local MCP server。

官方 Codex 目前只支持 **Mac 和 Linux**。桌面 UI：MCP servers → + Add server，Command to launch 填 \`1password-mcp\`，打开开关。CLI / IDE 对照：

\`\`\`bash
codex mcp add 1password -- 1password-mcp
\`\`\`

\`\`\`toml
[mcp_servers.1password]
command = "1password-mcp"
enabled = true
\`\`\`

用户层表名官方就是 \`1password\`。这是 stdio，**不要** \`codex mcp login\`。官方 Other 节的 JSON \`mcpServers\` 是给别的客户端，不要抄进 Codex。\`1password-mcp\` 不在 PATH 时，把 \`command\` 改成桌面应用自带的绝对路径；Dock 打开的桌面经常没有 Homebrew PATH。不要发明 \`op mcp-server environments\`，也不要把 \`OP_SERVICE_ACCOUNT_TOKEN\` 写进 \`env\` 表。

不要抄 Claude 的 \`/plugin marketplace add 1Password/1password-claude-plugin\` / \`/plugin install 1password@1password\`。那会登记 Claude 插件、本地 .env 校验钩子和技能，Codex 节不是这条。不要抄 Cursor Plugins 搜 1Password。不要发明 \`codex plugin add 1password@openai-curated\`。不要抄会把密钥经 MCP 送回来的社区包。也不要和 1Password CLI 的 Codex **shell plugin** 搞混：那是给 \`codex\` 命令注入登录凭证，不是这台 Environments MCP。

连上后先跑 \`list_environments\` 或 \`list_variables\`（只有名字）。\`create_environment\` / \`append_variables\` / \`create_local_env_file\` / \`rename_environment\` 会改 Environment 或挂本地 .env，保持工具批准；第一次碰某个 Environment 时，1Password 会弹授权，锁上后要再批。本地 .env 挂载也只支持 Mac / Linux。不要一上来 \`--yolo\`。不要给它 \`required = true\` 挂全局。网页 Cloud 不读 \`~/.codex/config.toml\`，也碰不到你这台桌面应用。

官方还让人在 AGENTS.md 或桌面 Personalization 自定义指令里写：需要开发 Environment 时主动用 1Password MCP。不要把密钥写进这段指令。从明文 .env 迁进去之后要轮换，Git 历史和会话记忆里的旧值不会自己消失。

不要做这些：

- 不要抄 \`claude /plugin install 1password@1password\`。
- 不要发明 \`codex plugin add 1password@openai-curated\`。
- 不要抄 \`op mcp-server environments\` 或社区 npm 包。
- 不要 \`mcp login\`，也不要给它配远程 URL。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "1Password", "stdio", "Environments"],
    related: ["mcp-add-and-login", "semgrep-guardian-mcp", "macos-mcp-bare-command"],
    sources: [
      {
        label: "1Password · MCP Server for Environments",
        url: "https://developer.1password.com/docs/environments/mcp-server/",
      },
      {
        label: "1Password · Trusted access layer for Codex",
        url: "https://1password.com/blog/1password-trusted-access-layer-for-openai-codex",
      },
    ],
  },
  {
    id: "imgly-cesdk-skills",
    no: 336,
    title: "IMG.LY CE.SDK 官方 Codex 用 -a codex，文档 MCP 无鉴权",
    summary:
      "官方 Codex：npx skills add imgly/agent-skills -a codex。实时文档才 mcp add imgly_docs --url https://mcp.img.ly/mcp，无 API key。不要抄 Claude 的 cesdk@imgly，也不要和 @imgly/codesign-mcp 搞混。",
    body: `IMG.LY 给 Codex 有专节。CE.SDK 的**官方主路径**是 Agent Skills，不是 Codex \`/plugins\`。仓库 README 默认是 Claude（\`-a claude-code\` 和 \`claude plugin install cesdk@imgly\`），不要抄过来。只要 Codex 时钉死：

\`\`\`bash
npx skills add imgly/agent-skills -a codex
\`\`\`

\`-a codex\` 就是 \`--agent codex\`，**不要省略**。不带这个旗标会按默认 agent 落盘（常常是 Claude）。它把技能装进项目旁的 \`.agents/skills/\`，离线带 10 个 Web 框架的文档和 starter kit。加 \`-g\` 才装到本机全局。用 \`npx skills add imgly/agent-skills --list\` 核对。技能不出现就再跑一遍安装，然后新开一轮。不要手拷到 \`~/.codex/skills\`。

Codex 里用 \`$build\`、\`$explain\`、\`$docs-react\` 这种 \`$name\` 显式调用。不要抄 Claude 插件的 \`/cesdk:docs-react\`。不要发明 \`codex plugin add cesdk@imgly\` 或 \`imgly@openai-curated\`。

实时文档是另一台远程 MCP，无鉴权、无 API key。官方 Codex 对照：

\`\`\`bash
codex mcp add imgly_docs --url https://mcp.img.ly/mcp
\`\`\`

\`\`\`toml
[mcp_servers.imgly_docs]
url = "https://mcp.img.ly/mcp"
enabled = true
\`\`\`

URL **带** \`/mcp\` 后缀。用户层表名官方就是 \`imgly_docs\`。这台没有 OAuth，**不要** \`codex mcp login\`。不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor / VS Code 的 \`type: http\` JSON。不要抄 \`npx mcp-remote\`。不要给它配 \`bearer_token_env_var\`。

官方建议技能和 MCP 一起用：技能负责离线脚手架，MCP 查最新文档。不要和 \`codex mcp add codesign -- npx -y @imgly/codesign-mcp@latest stdio\` 那台 **CoDesign** 本地 MCP 配成一张表。不要给它 \`required = true\` 挂全局。不要一上来 \`--yolo\`。网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex mcp get imgly_docs\` 看传输是 streamable_http。脚手架项目需要本机 Node.js 20 及以上。

不要做这些：

- 不要抄 \`claude plugin marketplace add imgly/agent-skills\` / \`claude plugin install cesdk@imgly\`。
- 不要抄 \`npx skills add imgly/agent-skills -a claude-code\`。
- 不要发明 \`codex plugin add cesdk@imgly\`。
- 不要把 CoDesign 的 \`@imgly/codesign-mcp\` 当成 CE.SDK 文档 MCP。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Skills", "IMG.LY", "CE.SDK", "MCP"],
    related: ["imgly-codesign-mcp", "pinecone-agent-skills", "mcp-add-and-login", "mcp-langfuse-docs"],
    sources: [
      {
        label: "IMG.LY · Set up CE.SDK with OpenAI Codex",
        url: "https://img.ly/capabilities/agents/openai-codex/",
      },
      {
        label: "imgly/agent-skills",
        url: "https://github.com/imgly/agent-skills",
      },
    ],
  },
  {
    id: "imgly-codesign-mcp",
    no: 337,
    title: "IMG.LY CoDesign 是本地 stdio MCP，不要抄 --scope user",
    summary:
      "官方 Codex：mcp add codesign -- npx -y @imgly/codesign-mcp@latest stdio。必须保留 @latest，stdio 是子命令。加完新开会话再发 start the CoDesign onboarding。不要抄 --scope user，也不要 mcp login。",
    body: `IMG.LY CoDesign 给 Codex 有专节。这是**本地 stdio**，不是远程 HTTP，也不是 CE.SDK 那套 Agent Skills。官方 Codex 主路径：

\`\`\`bash
codex mcp add codesign -- npx -y @imgly/codesign-mcp@latest stdio
\`\`\`

\`\`\`toml
[mcp_servers.codesign]
command = "npx"
args = ["-y", "@imgly/codesign-mcp@latest", "stdio"]
enabled = true
\`\`\`

用户层表名官方就是 \`codesign\`。必须保留 \`@latest\`，让 npx 重新解析，不要用缓存旧包。\`stdio\` 是**子命令**，不是旗标，不要漏掉。本机需要 Node.js 22 及以上（CE.SDK 技能是 20，不要抄错）。Codex **没有** \`--scope user\`，那是 Claude 的 \`claude mcp add --scope user codesign -- ...\`。不要抄过来。官方给其它客户端的 JSON \`mcpServers\` 也不要当 Codex 主路径。

这是 stdio，**不要** \`codex mcp login\`。不要给它配 \`https://mcp.img.ly/mcp\`，那是 CE.SDK **文档** MCP，表名是 \`imgly_docs\`。不要发明 \`codex plugin add codesign@openai-curated\`。不要抄 \`npx mcp-remote\`。不要抄 \`--transport http\`。

加完**当前会话不可用**。退出再开，然后发 \`start the CoDesign onboarding\`。无需账号；免费 IMG.LY 账号只给 AI 生图。\`npx\` 不在 PATH 时把 \`command\` 改成绝对路径；Dock 打开的桌面经常没有 Homebrew PATH。冷启动慢就给这台加 \`startup_timeout_sec\`。不要 \`required = true\` 挂全局。不要一上来 \`--yolo\`。网页 Cloud 不读 \`~/.codex/config.toml\`，也跑不了本机 stdio。用 \`codex mcp list\` / \`codex mcp get codesign\` 看 command 是 npx。

不要做这些：

- 不要抄 \`claude mcp add --scope user codesign -- ...\`。
- 不要抄 JSON \`mcpServers\` 进 Codex。
- 不要发明 \`codex plugin add codesign@openai-curated\`。
- 不要 \`mcp login\`，也不要把 CoDesign 和 \`imgly_docs\` 配成一张表。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "IMG.LY", "CoDesign", "stdio"],
    related: ["imgly-cesdk-skills", "mcp-add-and-login", "macos-mcp-bare-command"],
    sources: [
      {
        label: "IMG.LY · Install CoDesign in your coding agent",
        url: "https://img.ly/codesign/install/",
      },
      {
        label: "IMG.LY · Install CoDesign in any MCP client",
        url: "https://img.ly/codesign/other-clients/",
      },
    ],
  },
  {
    id: "terraform-mcp-stdio",
    no: 338,
    title: "HashiCorp Terraform MCP 官方 Codex 走 docker stdio",
    summary:
      "官方 Codex：mcp add terraform -- docker run -i --rm hashicorp/terraform-mcp-server。查公共 registry 不用 token。HCP / TFE 才 env_vars 转发 TFE_TOKEN / TFE_ADDRESS。不要 mcp login，也不要把密钥写进 env 表。",
    body: `HashiCorp 给 Codex 有专节。这是**本地 stdio**，靠本机 Docker 起 \`hashicorp/terraform-mcp-server\`，不是远程托管 MCP。查公共 Terraform Registry **不用 token**。官方 Codex 主路径：

\`\`\`bash
codex mcp add terraform -- docker run -i --rm hashicorp/terraform-mcp-server
\`\`\`

\`\`\`toml
[mcp_servers.terraform]
command = "docker"
args = ["run", "-i", "--rm", "hashicorp/terraform-mcp-server"]
enabled = true
\`\`\`

用户层表名官方就是 \`terraform\`。这是 stdio，**不要** \`codex mcp login\`。不要抄 Claude / Cursor / VS Code 的 JSON \`mcpServers\`。不要抄 \`npx mcp-remote\`。不要发明 \`codex plugin add terraform@openai-curated\`。不要抄 Gemini 的 \`gemini extensions install\`。

要接 HCP Terraform / Terraform Enterprise 时，先在启动 Codex 的进程里 export \`TFE_TOKEN\` 和 \`TFE_ADDRESS\`（地址带 \`https://\`，HCP 默认是 \`https://app.terraform.io\`）。Docker 用 \`-e TFE_TOKEN\` / \`-e TFE_ADDRESS\` 把名字传进容器，Codex 再用 \`env_vars\` 转发。**不要**把 token 写进 \`env\` 表，也不要 \`codex mcp add --env TFE_TOKEN=...\`。

\`\`\`toml
[mcp_servers.terraform]
command = "docker"
args = ["run", "-i", "--rm", "-e", "TFE_TOKEN", "-e", "TFE_ADDRESS", "hashicorp/terraform-mcp-server"]
env_vars = ["TFE_TOKEN", "TFE_ADDRESS"]
enabled = true
\`\`\`

本机有二进制才改走 \`codex mcp add terraform -- terraform-mcp-server stdio\`。\`stdio\` 是子命令。不在 PATH 时写绝对路径。

另一条是本机 HTTP：先 \`docker run --rm -p 127.0.0.1:8080:8080 -e TRANSPORT_MODE=streamable-http -e TRANSPORT_HOST=0.0.0.0 hashicorp/terraform-mcp-server\`，再 \`codex mcp add terraform --url http://localhost:8080/mcp\`。URL **带** \`/mcp\` 后缀。不要和 stdio 那张表配成一台。不要 \`mcp login\`。不要把 \`--transport http\` 抄进 \`mcp add\`。

\`ENABLE_TF_OPERATIONS\` 默认关着；没打算让模型改 workspace / run 就不要打开。不要 \`required = true\` 挂全局。不要一上来 \`--yolo\`。网页 Cloud 不读 \`~/.codex/config.toml\`，也跑不了你这台 Docker。\`docker\` 不在 PATH 时改绝对路径。冷启动拉镜像慢就加 \`startup_timeout_sec\`。改完用 \`codex mcp get terraform\` 看 command 是 docker。

不要做这些：

- 不要抄 Claude / Cursor / VS Code 的 JSON \`mcpServers\`。
- 不要发明 \`codex plugin add terraform@openai-curated\`。
- 不要 \`mcp login\`，也不要把 \`TFE_TOKEN\` 写进 \`env\` 表。
- 不要把 stdio 和 \`http://localhost:8080/mcp\` 配成一张表。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Terraform", "HashiCorp", "stdio"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "macos-mcp-bare-command"],
    sources: [
      {
        label: "hashicorp/terraform-mcp-server",
        url: "https://github.com/hashicorp/terraform-mcp-server",
      },
      {
        label: "HashiCorp Developer · Terraform MCP server",
        url: "https://developer.hashicorp.com/terraform/mcp-server",
      },
    ],
  },
  {
    id: "clerk-mcp-run",
    no: 339,
    title: "Clerk MCP 现行是 clerk mcp run，不要抄缺 --url 的文档",
    summary:
      "官方现行：clerk mcp install --client codex，等价 mcp add clerk -- clerk mcp run。文档 Codex 节缺 --url 且带 rmcp，不要抄。这是 stdio 桥，不要 mcp login。",
    body: `Clerk 给 Codex 有专节，但手册里的 Codex 命令已经过时。现行安装是 Clerk CLI 把本机 \`clerk mcp run\` 登记成 **stdio 桥**，桥在运行时再连托管 \`https://mcp.clerk.com/mcp\`。官方 CLI 源码就是 \`codex mcp add clerk -- clerk mcp run\`。最快：

\`\`\`bash
clerk mcp install --client codex
\`\`\`

等价手动登记：

\`\`\`bash
codex mcp add clerk -- clerk mcp run
\`\`\`

\`\`\`toml
[mcp_servers.clerk]
command = "clerk"
args = ["mcp", "run"]
enabled = true
\`\`\`

用户层表名官方就是 \`clerk\`。\`--client\` 的 id 是 \`codex\`。\`clerk\` 必须在 PATH 里；没装就先 \`npm install -g clerk\` 或 \`brew install clerk/stable/clerk\`。Dock 打开的桌面经常没有 Homebrew PATH。这是 stdio，**不要** \`codex mcp login\`。这台是 SDK 片段服务器，FAQ 没写 OAuth。不要抄 Claude 的 \`--scope user\`。不要抄 JSON \`mcpServers\`。不要抄 \`npx mcp-remote\`。不要发明 \`codex plugin add clerk@openai-curated\`。不要和 \`clerk/skills\` 技能仓库搞成一台。

文档 Codex 节仍写 \`codex mcp add clerk https://mcp.clerk.com/mcp\`（缺 \`--url\`）、\`[beta] rmcp = true\`、\`type = "url"\`。这些不要抄。不用 Clerk CLI、走 Codex 原生 HTTP 时才是：

\`\`\`bash
codex mcp add clerk --url https://mcp.clerk.com/mcp
\`\`\`

URL **带** \`/mcp\` 后缀。不要和 \`clerk mcp run\` 那张表配成一台。不要 \`mcp login\`。不要把 \`--transport http\` 抄进 \`mcp add\`。不要写 \`type = "url"\`。

\`clerk mcp run\` 不再接受 \`--url\`；目标是环境变量 \`CLERK_MCP_URL\` 或默认托管。不要把 URL 写进 args。不要 \`required = true\` 挂全局。不要一上来 \`--yolo\`。网页 Cloud 不读 \`~/.codex/config.toml\`，也跑不了本机 \`clerk\`。改完用 \`codex mcp get clerk\` 看 command 是 clerk，或跑 \`clerk doctor\`。

不要做这些：

- 不要抄缺 \`--url\` 的 \`codex mcp add clerk https://mcp.clerk.com/mcp\`。
- 不要抄 \`[beta] rmcp = true\` 或 \`type = "url"\`。
- 不要发明 \`codex plugin add clerk@openai-curated\`。
- 不要 \`mcp login\`，也不要把 stdio 桥和 \`--url\` 配成一张表。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Clerk", "stdio"],
    related: ["mcp-add-and-login", "macos-mcp-bare-command", "mcp-http-not-sse", "clerk-skills-plugin"],
    sources: [
      {
        label: "Clerk · Use Clerk's MCP server",
        url: "https://clerk.com/docs/guides/ai/mcp/clerk-mcp-server",
      },
      {
        label: "Clerk Changelog · clerk mcp install",
        url: "https://clerk.com/changelog/2026-07-22-clerk-mcp",
      },
    ],
  },
  {
    id: "clerk-skills-plugin",
    no: 340,
    title: "Clerk Skills 官方 Codex 走 marketplace，不要发明 plugin add",
    summary:
      "官方 Codex：plugin marketplace add clerk/skills，再 /plugins 装 clerk-skills。不要发明 plugin add 的 @id。不要抄 npx skills add 当 Codex 专节，也不要和 clerk mcp run 搞成一台。",
    body: `Clerk Skills 给 Codex 有专节，写在仓库 README，不在技能总览那页。官方 Codex 主路径是加 marketplace，再在 TUI 里装插件：

\`\`\`bash
codex plugin marketplace add clerk/skills
\`\`\`

加完重启 Codex（0.154 起也可先看当前会话），打开 \`/plugins\`，选 **Clerk Skills**，安装并启用 \`clerk-skills\`，然后开新线程。官方**没有**写出 \`codex plugin add …@…\` 这种带 marketplace 的 id，不要自己编。\`codex plugin list\` 应看到 \`clerk-skills\` 为 installed, enabled。当前会话没有技能，再新开。

这是**技能捆**，不带 MCP。不要指望它登记 \`mcp_servers.clerk\`。接 Clerk SDK 片段仍走 \`codex mcp add clerk -- clerk mcp run\`，见 Clerk MCP 那条。不要把两台配成一张表。

技能总览页写的是 \`npx skills add clerk/skills\`，并说兼容 Codex，但**没有**钉 \`-a codex\` / \`--agent codex\`。那是通用 Agent Skills 安装器，不要当成 Codex 专节。也不要抄 Claude 的 \`git clone … ~/.claude/skills/clerk\`。不要抄 \`/plugin install\`。\`clerk init\` 可能顺手装技能，那不是这条 marketplace。

升级用 \`codex plugin marketplace upgrade\`，名字以 \`codex plugin marketplace list\` 为准。卸载在 \`/plugins\` 关掉，或 \`codex plugin remove\`（仍不要猜 @id）。IDE 扩展没有 \`/plugins\`，用 CLI 加 marketplace，再到 CLI TUI 或桌面去装。不要 \`required = true\`。不要一上来 \`--yolo\`。网页 Cloud 不读你这台 \`CODEX_HOME\` 插件缓存。

不要做这些：

- 不要发明 \`codex plugin add clerk-skills@clerk\` 或 \`clerk@openai-curated\`。
- 不要把 \`npx skills add clerk/skills\` 当成 Codex 专节。
- 不要抄 Claude 的 \`~/.claude/skills\` 软链。
- 不要和 \`clerk mcp run\` 那台 MCP 搞成一张表。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Clerk", "Skills", "marketplace"],
    related: ["clerk-mcp-run", "plugin-session-refresh", "plugins-vs-skills"],
    sources: [
      {
        label: "clerk/skills",
        url: "https://github.com/clerk/skills",
      },
      {
        label: "Clerk · Clerk Skills",
        url: "https://clerk.com/docs/guides/ai/skills",
      },
    ],
  },
  {
    id: "appcircle-mcp-http",
    no: 341,
    title: "Appcircle 远程 MCP 用 mcp.appcircle.io，不要 mcp login",
    summary:
      "官方 Codex：mcp add appcircle --url https://mcp.appcircle.io，再 bearer_token_env_var 读 APPCIRCLE_ACCESS_TOKEN。URL 没有 /mcp。这是 JWT Bearer，不要 mcp login。不要抄 Claude 插件或 http_headers 字面量。",
    body: `Appcircle 给 Codex 有专节，写在仓库安装指南。官方 CLI 主路径是远程 HTTP：

\`\`\`bash
export APPCIRCLE_ACCESS_TOKEN
codex mcp add appcircle --url https://mcp.appcircle.io --bearer-token-env-var APPCIRCLE_ACCESS_TOKEN
\`\`\`

URL **没有** \`/mcp\` 后缀。这是 Bearer JWT，**不要** \`codex mcp login\`：官方没给 OAuth / DCR。不要抄 Claude 的 \`/plugin marketplace add appcircleio/appcircle-ai-plugins\`，也不要抄 Copilot 的 \`appcircle@appcircle-ai-plugins\`。不要发明 \`codex plugin add appcircle@openai-curated\`。不要抄 \`--transport http\`。不要抄 JSON \`mcpServers\`。

\`\`\`toml
[mcp_servers.appcircle]
url = "https://mcp.appcircle.io"
bearer_token_env_var = "APPCIRCLE_ACCESS_TOKEN"
enabled = true
\`\`\`

\`APPCIRCLE_ACCESS_TOKEN\` 必须是 Auth API 换回来的 **JWT**，不是控制台里的 Personal Access Key 或 API Key secret。个人密钥走：

\`\`\`bash
curl -X POST https://auth.appcircle.io/auth/v3/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "personalAccessKey=$APPCIRCLE_PERSONAL_ACCESS_KEY"
\`\`\`

响应里的 \`access_token\` 才 export。令牌大约 24 小时过期，服务器不自动刷新。401 先查是不是把 raw key 当 token 用了，再查过期。变量必须在启动 Codex 的那个进程里。不要把 JWT 写进 \`http_headers\`。App / IDE 节那份 \`Authorization = "Bearer …"\` 字面量不要抄。

\`trigger_build\` / \`start_publish\` / \`send_app_version_to_testers\` 会动真流水线，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。先问 \`get_build_profiles\` 或 \`get_build_insights_report\`。

本地 stdio 才 \`pip install .\` 后：

\`\`\`bash
codex mcp add appcircle -- /abs/appcircle-mcp
\`\`\`

然后 \`env_vars\` 转发 \`APPCIRCLE_ACCESS_TOKEN\`。**不要抄** \`--env APPCIRCLE_ACCESS_TOKEN=\` 写进 env 表。本机 HTTP / Docker 才 \`http://localhost:8000\`，同样走 \`bearer_token_env_var\`，不要 \`mcp login\`。

不要做这些：

- 不要发明 \`codex plugin add appcircle@…\`。
- 不要抄 Claude / Copilot 的 \`appcircleio/appcircle-ai-plugins\`。
- 不要 \`mcp login\`，也不要把 raw key 或 JWT 写进 \`http_headers\` / \`env\` 表。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get appcircle\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Appcircle", "HTTP", "Bearer"],
    related: ["mcp-http-bearer-env", "mcp-add-and-login", "heroku-mcp-http"],
    sources: [
      {
        label: "Appcircle · MCP Server",
        url: "https://docs.appcircle.io/appcircle-ai/appcircle-mcp-server",
      },
      {
        label: "appcircle-mcp · Codex install",
        url: "https://github.com/appcircleio/appcircle-mcp/blob/main/docs/installation_guides/codex.md",
      },
      {
        label: "Appcircle · API Authentication",
        url: "https://docs.appcircle.io/appcircle-api-and-cli/api-authentication",
      },
    ],
  },
  {
    id: "flutter-mcp-toolkit-plugin",
    no: 342,
    title: "Flutter MCP toolkit 官方 Codex 走 init codex，不要发明 plugin add",
    summary:
      "官方 Codex：flutter-mcp-toolkit init codex，或 marketplace add Arenukvern/mcp_flutter 再 /plugins 装。不要发明 plugin add 的 @id。不要抄 Claude 的 /plugin install。技能本身不登记 MCP。",
    body: `Flutter MCP toolkit 给 Codex 有专节。推荐一条命令把技能、本地 marketplace 和 MCP 一起写好：

\`\`\`bash
flutter-mcp-toolkit init codex
\`\`\`

先把 \`flutter-mcp-toolkit-server\` 放进 PATH（安装脚本会带 \`fmtk\` 别名），或设 \`FLUTTER_MCP_BIN\`。应用目录再 \`flutter-mcp-toolkit codegen-init\`，用 **debug** 跑 \`flutter run --debug\`。技能**代替不了** MCP 服务器和包里的 \`mcp_toolkit\`。\`init codex\` 会写 \`.codex/plugins/cache/local/flutter-mcp-toolkit/...\`，并在 \`~/.agents/plugins/marketplace.json\` 加一条本地源。加完重启 Codex（0.154 起也可先看当前会话），\`/plugins\` 应看到 **Flutter MCP Toolkit**。

只要 git marketplace、自己去 \`/plugins\` 装时：

\`\`\`bash
codex plugin marketplace add Arenukvern/mcp_flutter
\`\`\`

官方**没有**写出 \`codex plugin add …@…\`。不要发明 \`flutter-mcp-toolkit@mcp_flutter\`。不要抄 Claude 的 \`/plugin marketplace add Arenukvern/mcp_flutter\` 后再 \`/plugin install flutter-mcp-toolkit@Arenukvern-mcp_flutter\`——那是 Claude 的 marketplace id，不是 Codex。IDE 扩展没有 \`/plugins\`，用 CLI 加完再到 TUI 或桌面去装。

\`npx skills add Arenukvern/mcp_flutter\` **不会**登记 MCP。README 示例还钉的是 \`-a cursor\`，不要当成 Codex 专节。技能只教怎么用；要 MCP 仍走 \`init codex\`。不要抄 JSON \`mcpServers\`，也不要抄 Docker \`ghcr.io/arenukvern/flutter-mcp-toolkit\` 那份当 Codex 主路径。不要 \`mcp login\`：这是本机 stdio。

插件 \`mcp.json\` 的 command 会读 \`FLUTTER_MCP_BIN\`，缺省二进制名是 \`flutter-mcp-toolkit-server\`，args 带 \`--dynamics\`。**不要**把带花括号的占位抄进 \`config.toml\` 的 command，Codex 不会按 shell 展开。插件装不上才对照用户层：

\`\`\`bash
codex mcp add flutter-mcp-toolkit -- flutter-mcp-toolkit-server --dart-vm-host=localhost --dart-vm-port=8181 --resources --images --dynamics
\`\`\`

这不是官方文档里的 \`mcp add\` 原文，是把插件 \`mcp.json\` 拆成 Codex stdio。和插件那台不要配成一张表。这台也**不要** \`mcp login\`。

这不是 dart-lang 官方那台 Dart MCP（工具链）。这台是盯 **debug 应用**：语义快照、点按、热重载、读日志，以及应用运行时登记的动态工具（\`fmt_list_client_tools_and_resources\` / \`fmt_client_tool\`）。Dump RPC 默认关，要才 \`--dumps\`。点按和热重载会动真界面，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 跑不了你这台本机 VM Service。

不要做这些：

- 不要发明 \`codex plugin add flutter-mcp-toolkit@mcp_flutter\`。
- 不要抄 Claude 的 \`flutter-mcp-toolkit@Arenukvern-mcp_flutter\`。
- 不要把 \`npx skills add\` 当成 Codex 专节。
- 不要把带花括号的 \`FLUTTER_MCP_BIN\` 占位抄进 command。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["MCP", "Flutter", "plugins", "Skills", "marketplace"],
    related: ["plugin-session-refresh", "plugins-vs-skills", "clerk-skills-plugin"],
    sources: [
      {
        label: "Arenukvern/mcp_flutter",
        url: "https://github.com/Arenukvern/mcp_flutter",
      },
      {
        label: "flutter-mcp-toolkit · AI Agent Setup",
        url: "https://docs.page/arenukvern/mcp_flutter/ai_agents/overview",
      },
      {
        label: "flutter-mcp-toolkit · Marketplace distribution",
        url: "https://github.com/Arenukvern/mcp_flutter/blob/main/docs/ai_agents/marketplace_distribution.mdx",
      },
    ],
  },
  {
    id: "revenuecat-codex-plugin",
    no: 343,
    title: "RevenueCat 官方 Codex 走 plugin add revenuecat@RevenueCat",
    summary:
      "官方 Codex：marketplace add RevenueCat/ai-toolkit，再 plugin add revenuecat@RevenueCat，再 mcp login RevenueCat。远程带 /mcp。不要抄 mcp-remote。v2.0.1 起插件名是小写 revenuecat。",
    body: `RevenueCat 给 Codex 有专节，官方推荐 AI Toolkit 插件（技能 + 远程 MCP）。安装页写的是：

\`\`\`bash
codex plugin marketplace add RevenueCat/ai-toolkit
codex plugin add revenuecat@RevenueCat
codex mcp login RevenueCat
\`\`\`

marketplace 名是 \`RevenueCat\`，插件 id 是 \`revenuecat@RevenueCat\`（\`plugin.json\` 的 \`name\` 是 \`revenuecat\`）。源仓 README 的 Codex 节只写了 marketplace add，然后 TUI \`/plugins\` 搜 \`revenuecat\` 再装；安装页把 \`plugin add\` 也写出来了，跟 \`.agents/plugins/marketplace.json\` 对得上。\`codex plugin list\` 应看到 \`revenuecat@RevenueCat\` 为 installed, enabled。加完新开会话。0.154 起也可以先看当前会话；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用 CLI 加完再到 TUI 或桌面去装。桌面先在终端加 marketplace，再 Plugins 把源切到 RevenueCat 再点加号。不要把默认的 Built by OpenAI 那栏当成 openai-curated。

装插件不会自动登录。MCP 服务器名是 \`.mcp.json\` 里的 \`RevenueCat\`（大写 R），所以 login 是 \`codex mcp login RevenueCat\`，不要写成 \`mcp login revenuecat\`。

Google Play 深度技能可选：

\`\`\`bash
codex plugin add revenuecat-play-billing@RevenueCat
\`\`\`

这是技能捆，不另带一台 MCP。不要和主插件的 \`RevenueCat\` 服务器搞成两张用户层表。

v2.0.1 改名：旧插件叫 \`RevenueCat\`，现行叫 \`revenuecat\`。旧的会停在本地缓存、不再更新。\`/plugins\` 卸掉 \`RevenueCat\`，再装 \`revenuecat\`。OAuth 票会留着，不必再 \`mcp login\`。

插件已经登记 MCP 就不要再 \`mcp add\` 同一张表。技能加载了但工具没有、或重启后 MCP 从 Settings 消失，是已知的插件 MCP 重载问题（openai/codex#25809）。官方 workaround 是用户层再登记同一台，表名跟插件一致：

\`\`\`bash
codex mcp add RevenueCat --url https://mcp.revenuecat.ai/mcp
codex mcp login RevenueCat
\`\`\`

URL 带 \`/mcp\` 后缀。不要发明不带后缀的 \`https://mcp.revenuecat.ai\`。

只要 MCP、不要技能时：

\`\`\`bash
codex mcp add revenuecat --url https://mcp.revenuecat.ai/mcp
\`\`\`

安装页这份用户层表名是小写 \`revenuecat\`。不要和插件那张 \`RevenueCat\` 配成两台。连上时会开浏览器；若 add 完还没票，再 \`codex mcp login revenuecat\`。一条连接只用一种鉴权。

\`\`\`toml
[mcp_servers.revenuecat]
url = "https://mcp.revenuecat.ai/mcp"
enabled = true
\`\`\`

不要抄 Claude 的 \`claude plugins marketplace add RevenueCat/ai-toolkit\` / \`claude plugins install revenuecat\`。不要抄 Cursor 的 \`/add-plugin revenuecat\`。不要抄 JSON \`mcpServers\` 把 Bearer 写进 headers。不要抄官方手册里 \`npx mcp-remote\` 再把 API v2 key 写进 \`env\` 表那份——Codex 自己走 HTTP。\`npx skills add RevenueCat/ai-toolkit\` 只装技能，不登记 MCP。

无头 / 不能开浏览器才用 API v2 secret key，走 \`bearer_token_env_var\`。不要 \`mcp login\` 这张表。不要把密钥写进 \`http_headers\`、\`args\` 或 \`env\` 表。变量必须在启动 Codex 的那个进程里。值不要再加 \`Bearer\` 前缀。

连上后先问项目状态或现有 Offerings，再改 Product / Entitlement / Paywall。写工具会动真订阅配置，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。

不要做这些：

- 不要发明 \`revenuecat@openai-curated\`。
- 不要抄 \`npx mcp-remote https://mcp.revenuecat.ai/mcp\`。
- 不要把 API v2 key 写进 \`env\` 表或 \`http_headers\`。
- 不要把旧插件名 \`RevenueCat\` 和新的 \`revenuecat\` 当成两个要同时装的包。

改完用 \`codex plugin list\`；用户层对照 \`codex mcp get RevenueCat\` 或 \`codex mcp get revenuecat\` 看传输是 streamable_http。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "RevenueCat", "MCP", "OAuth", "Skills", "marketplace"],
    related: ["plugin-session-refresh", "mcp-add-and-login", "plugins-vs-skills"],
    sources: [
      {
        label: "RevenueCat · MCP setup",
        url: "https://www.revenuecat.com/docs/tools/mcp/setup",
      },
      {
        label: "RevenueCat · MCP",
        url: "https://www.revenuecat.com/docs/tools/mcp",
      },
      {
        label: "RevenueCat/ai-toolkit",
        url: "https://github.com/RevenueCat/ai-toolkit",
      },
    ],
  },
  {
    id: "pathbound-mcp-http",
    no: 344,
    title: "Pathbound 远程 MCP 用 mcp.pathbound.ai/mcp，再 mcp login",
    summary:
      "官方 Codex：mcp add pathbound --url https://mcp.pathbound.ai/mcp，再 mcp login pathbound。URL 带 /mcp。不要抄 Claude.ai 或 ChatGPT Plugins。无头才 bearer_token_env_var。",
    body: `Pathbound 给 Codex 有专节。官方 CLI 主路径是远程 Streamable HTTP + OAuth：

\`\`\`bash
codex mcp add pathbound --url https://mcp.pathbound.ai/mcp
codex mcp login pathbound
\`\`\`

URL **带** \`/mcp\` 后缀。用户层表名官方就是 \`pathbound\`。不要发明不带后缀的 \`https://mcp.pathbound.ai\`。桌面 / IDE：Settings → MCP servers → Add server，选 Streamable HTTP，填同一地址，再 Authenticate。CLI、桌面、IDE 同机共享 \`~/.codex/config.toml\`，加一次即可。

\`\`\`toml
[mcp_servers.pathbound]
url = "https://mcp.pathbound.ai/mcp"
enabled = true
\`\`\`

不要抄 Claude.ai 的 Connected Apps / Add custom MCP。不要抄 ChatGPT 网页 Plugins 那条：那是开发者模式应用，不写 \`config.toml\`。不要发明 \`codex plugin add pathbound@…\`。不要抄 \`npx mcp-remote\`。不要抄 \`--transport http\`。不要抄 JSON \`mcpServers\`。

连上后先问 \`get_contact\` / \`get_contact_timeline\` / \`aggregate_data\`。\`get_contact\` 最多带回 20 条事件，要聚合走 \`aggregate_data\`，不要自己翻页。大约 30 次工具调用 / 分钟会限流。

OAuth 票覆盖 \`contacts:read\` / \`contacts:write\`、\`companies:read\` / \`companies:write\`、\`events:read\`。写联系人 / 公司、发邮件或 Apollo 序列会动真客户数据，保持工具批准。官方说版本回滚还没上线。先只读。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。

无头 / CI 才用 REST API key（\`sk_\` 开头），走 \`bearer_token_env_var\`。不要 \`mcp login\` 这张表。不要把密钥写进 \`http_headers\`、\`args\`、\`env\` 表或 URL。不要抄 Anthropic 示例里的 \`authorization_token\` 字面量。值不要再加 \`Bearer\` 前缀。读分析勾 \`contacts:read\` 和 \`events:read\`；写操作还要 \`actions:write\`。一条连接只用一种鉴权。

不要做这些：

- 不要发明 \`codex plugin add pathbound@openai-curated\`。
- 不要抄 Claude.ai / ChatGPT 网页那套当 Codex 主路径。
- 不要把 \`sk_\` 写进 \`http_headers\` 或 URL。
- 不要给它 \`required = true\` 挂全局。

改完新开会话。用 \`codex mcp get pathbound\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth（或 bearer）。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Pathbound", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "mcp-http-not-sse"],
    sources: [
      {
        label: "Pathbound · Codex",
        url: "https://pathbound.ai/use-with/openai/codex",
      },
      {
        label: "Pathbound · MCP overview",
        url: "https://pathbound.ai/docs/mcp/overview",
      },
      {
        label: "Pathbound · MCP authentication",
        url: "https://pathbound.ai/docs/mcp/authentication",
      },
    ],
  },
  {
    id: "stackone-mcp-http",
    no: 345,
    title: "StackOne 远程 MCP 用 mcp.stackone.com/mcp，再 mcp login",
    summary:
      "官方 Codex：mcp add stackone --url https://mcp.stackone.com/mcp，再 mcp login stackone。网关 URL 带 /mcp。无头才把仪表盘 session token 拼进 api.stackone.com/mcp。不要抄 Claude 的 --transport http。",
    body: `StackOne 给 Codex 有专节。官方 CLI 主路径是远程 Streamable HTTP + OAuth，不需要包装包：

\`\`\`bash
codex mcp add stackone --url https://mcp.stackone.com/mcp
codex mcp login stackone
\`\`\`

URL **带** \`/mcp\` 后缀。用户层表名官方就是 \`stackone\`。不要发明不带后缀的 \`https://mcp.stackone.com\`。桌面 / IDE：Settings → MCP servers → Add server，选 Streamable HTTP，填同一地址，再 Authenticate。CLI、桌面、IDE 同机共享 \`~/.codex/config.toml\`，加一次即可。

\`\`\`toml
[mcp_servers.stackone]
url = "https://mcp.stackone.com/mcp"
enabled = true
\`\`\`

\`mcp login stackone\` 会打开浏览器。登录后选项目、勾关联账号和动作，再 Authorize。网关地址本身不含凭证，可以提交进 dotfiles 或内网 wiki；每人自己跑一遍 \`mcp login\`。

同意页默认打开 **Load tools when needed**（Advanced Tool Search）。大工具集保持开；关掉才会把选中动作一次全交给模型。管理员可能在项目设置里锁死这个开关，那时同意页上看不到开关。改账号或动作再跑一遍 \`codex mcp login stackone\`。撤销走 StackOne 仪表盘 Connected Apps。

不要抄 Claude 的 \`claude mcp add --transport http stackone https://mcp.stackone.com/mcp\`。不要发明 \`codex plugin add stackone@…\`。不要抄 \`npx mcp-remote\`。不要抄 JSON \`mcpServers\`。不要抄 Cursor 的 \`.cursor/mcp.json\`。

连上后先开 \`codex\` 问 \`What StackOne tools are available?\`。写操作会动真实 HR / ATS / CRM 数据，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。

无头 / 共享机 / 定时任务才用仪表盘 session token。Connectors → 打开连接器 → **Use in Agent** → 选关联账号、过期（默认一年）→ 选 HTTPS MCP，复制 URL。主机是 \`api.stackone.com\`，不是 \`mcp.stackone.com\`。形态是 \`https://api.stackone.com/mcp?token=...\`。一条 URL 对应一个关联账号，持有者在过期前都有权，当密码。不要提交、不要写进共享 wiki。

无同意页时要 Advanced Tool Search：同一 URL 再加 \`tool-mode=search_execute\`。

\`\`\`toml
# 无头：把仪表盘复制的整条 HTTPS MCP URL 写进 url。不要再 mcp login。
[mcp_servers.stackone_ci]
url = "https://api.stackone.com/mcp?token=..."
enabled = true
\`\`\`

一条连接只用一种鉴权：OAuth 表用 \`mcp.stackone.com/mcp\` + \`mcp login\`；token 表用 \`api.stackone.com/mcp?token=...\`，不要再 \`mcp login\`。不要把 token URL 和网关 URL 配成两张同名表。不要把 token 改成 \`bearer_token_env_var\` 或写进 \`http_headers\`。Claude 页那条 API-key / Basic \`STACKONE_AUTH_TOKEN\` 不是 Codex 主路径，不要抄过来。

不要做这些：

- 不要发明 \`codex plugin add stackone@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 \`npx mcp-remote\`。
- 不要把 session token URL 提交进仓库。
- 不要给它 \`required = true\` 挂全局。

改完新开会话。用 \`codex mcp get stackone\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth（无头那张才是 URL 自带凭证）。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "StackOne", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "pathbound-mcp-http"],
    sources: [
      {
        label: "StackOne · Codex",
        url: "https://docs.stackone.com/connect/ai-platforms/codex",
      },
      {
        label: "StackOne · Codex MCP",
        url: "https://www.stackone.com/platform/mcp/ai-agent/codex/",
      },
    ],
  },
  {
    id: "butter-mcp-http",
    no: 346,
    title: "Butter 远程 MCP 用 mcp.hellobutter.io/mcp，再 mcp login",
    summary:
      "官方 Codex：mcp add butter --url https://mcp.hellobutter.io/mcp，再 mcp login butter。URL 带 /mcp。不要抄 Claude 的 --transport http。不是 ButterKit.app 那台本地 stdio。",
    body: `Butter（hellobutter.io）给 Codex 有专节。官方 CLI 主路径是远程 Streamable HTTP + OAuth，不需要包装包、仓库或 API key：

\`\`\`bash
codex mcp add butter --url https://mcp.hellobutter.io/mcp
codex mcp login butter
\`\`\`

URL **带** \`/mcp\` 后缀。用户层表名官方就是 \`butter\`。不要发明不带后缀的 \`https://mcp.hellobutter.io\`。这不是 ButterKit.app：那台是本机 \`butterkit-mcp\` stdio，表名是 \`butterkit\`，不要配成一台。桌面 / IDE：Settings → MCP servers → Add server，选 Streamable HTTP，填同一地址，再 Authenticate。CLI、桌面、IDE 同机共享 \`~/.codex/config.toml\`，加一次即可。

\`\`\`toml
[mcp_servers.butter]
url = "https://mcp.hellobutter.io/mcp"
enabled = true
\`\`\`

\`mcp login butter\` 会打开浏览器。Codex 用 S256 PKCE 和本机 loopback 回调。网关地址本身不含凭证，可以提交进 dotfiles；每人自己跑一遍 \`mcp login\`。旧票卡住时先 \`codex mcp logout butter\`，再重新 \`mcp login\`。需要有效 Butter 订阅或官方批准的 rollout。

不要抄 Claude 的 \`claude mcp add --transport http butter https://mcp.hellobutter.io/mcp\`。不要抄 ChatGPT 网页 Apps / 开发者模式。不要抄 Cursor 的 \`.cursor/mcp.json\`。不要抄 VS Code 的 \`mcp.json\`。不要发明 \`codex plugin add butter@…\`。不要抄 \`npx mcp-remote\`。不要把 API key 写进 URL、\`http_headers\` 或 \`bearer_token_env_var\`。

连上后先 \`codex mcp list\`，再问 \`List my Butter clients.\` 先只读。\`butter_update_account_settings\` / \`butter_api_post_now\` 会改真实社媒账号并可能发帖，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。

Higgsfield 是另一台 MCP，不要和 \`butter\` 配成一张表。官方另外发的本地 bulk-upload CLI 只给批准过的 workspace，不是 Codex 主路径，不要发明 stdio \`mcp add\`。n8n 那条 Bearer Auth / Header Auth 也不是 Codex 主路径。

不要做这些：

- 不要发明 \`codex plugin add butter@openai-curated\`。
- 不要把 ButterKit.app 的 \`butterkit-mcp\` 抄进这张表。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor JSON。
- 不要给它 \`required = true\` 挂全局。

改完新开会话。用 \`codex mcp get butter\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Butter", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "stackone-mcp-http"],
    sources: [
      {
        label: "Butter · MCP / Codex",
        url: "https://hellobutter.io/mcp",
      },
    ],
  },
  {
    id: "design-revision-mcp-http",
    no: 347,
    title: "DesignRevision 远程 MCP 用 mcp.designrevision.com/mcp 加 bearer",
    summary:
      "官方 Codex：mcp add design-revision --url https://mcp.designrevision.com/mcp --bearer-token-env-var DESIGNREVISION_API_KEY。URL 带 /mcp。不要 mcp login。不要抄 Claude 的 --header Bearer。",
    body: `DesignRevision 给 Codex 有专节（How to Add an MCP Server to Codex CLI）。官方 CLI 主路径是远程 Streamable HTTP + bearer，不是 OAuth：

\`\`\`bash
codex mcp add design-revision --url https://mcp.designrevision.com/mcp --bearer-token-env-var DESIGNREVISION_API_KEY
\`\`\`

URL **带** \`/mcp\` 后缀。用户层表名官方就是 \`design-revision\`。不要发明不带后缀的 \`https://mcp.designrevision.com\`。不要 \`mcp login\` 这张表。\`DESIGNREVISION_API_KEY\` 必须在**启动 Codex 的那个进程**里；Dock / 开始菜单打开的桌面读不到 zshrc。键里填的是变量名，不是 token。

\`\`\`toml
[mcp_servers.design-revision]
url = "https://mcp.designrevision.com/mcp"
bearer_token_env_var = "DESIGNREVISION_API_KEY"
enabled = true
\`\`\`

不要抄 Claude 的 \`claude mcp add --transport http design-revision https://mcp.designrevision.com/mcp --header "Authorization: Bearer …"\`。不要把 token 写进 \`http_headers\`、\`args\`、\`env\` 表或 URL。不要抄 JSON \`mcpServers\`。不要抄 Cursor 的 \`.cursor/mcp.json\`。不要发明 \`codex plugin add design-revision@…\`。不要抄 \`npx mcp-remote\`。

列出工具可以无鉴权；真正调 \`search_items\` / \`get_item_source\` / \`get_install_command\` 才要账号 bearer。先问 \`whoami\` 或搜一个组件。\`get_install_command\` 返回的 \`shadcn add\` 可能把 token 嵌进 URL，不要把那条命令提交进仓库。浏览 registry 便宜或免费；拉完整源码才扣额度。这不是 shadcn 官方那台 MCP。

不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get design-revision\` 看传输是 streamable_http、Auth 是 Bearer。\`mcp list\` 显示 Bearer 不等于请求真带了头，变量缺失时工具数为 0 或 401。

不要做这些：

- 不要发明 \`codex plugin add design-revision@openai-curated\`。
- 不要抄 Claude 的 \`--header\` Bearer 字面量。
- 不要对这张表跑 \`mcp login\`。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "DesignRevision", "bearer", "HTTP"],
    related: ["mcp-http-bearer-env", "mcp-add-and-login", "mcp-http-not-sse"],
    sources: [
      {
        label: "DesignRevision · Add MCP to Codex",
        url: "https://designrevision.com/blog/add-mcp-server-to-codex",
      },
      {
        label: "DesignRevision · MCP",
        url: "https://designrevision.com/mcp",
      },
      {
        label: "DesignRevision · MCP tools",
        url: "https://designrevision.com/mcp/tools",
      },
    ],
  },
  {
    id: "shadcn-mcp-stdio",
    no: 348,
    title: "shadcn 官方 MCP 用手写 mcp_servers.shadcn 本地 stdio",
    summary:
      "官方 Codex：手写 [mcp_servers.shadcn]，command = npx，args = [\"shadcn@latest\", \"mcp\"]。shadcn CLI 不能自动改 config.toml。这是本地 stdio，不要 mcp login。不要抄 Claude 的 mcp init --client claude。",
    body: `shadcn/ui 给 Codex 有专节。官方 Note：\`shadcn\` CLI **不能**自动改 \`~/.codex/config.toml\`，必须手写。这是**本地 stdio**，不是远程 URL，**不要** \`mcp login\`。

\`\`\`toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
\`\`\`

同一张表的 CLI 写法：

\`\`\`bash
codex mcp add shadcn -- npx shadcn@latest mcp
\`\`\`

用户层表名官方就是 \`shadcn\`。官方 args **没有** \`-y\`；非交互环境才自己加。不要给这张表加 \`--url\`。不要 \`mcp login\`。

不要抄 Claude 的 \`pnpm dlx shadcn@latest mcp init --client claude\`。不要抄 JSON \`mcpServers\`。不要抄 Cursor 的 \`.cursor/mcp.json\`。不要抄 VS Code 的 \`.vscode/mcp.json\` 里那个 \`servers\` 包装键。不要发明 \`codex plugin add shadcn@…\`。不要抄 \`npx mcp-remote\`。这不是 DesignRevision 那台远程 HTTP MCP。

默认 shadcn/ui registry 不用额外配。项目要接更多 registry，写在项目 \`components.json\` 的 \`registries\`，不是 MCP 表：

\`\`\`json
{
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json"
  }
}
\`\`\`

私有 registry 的鉴权官方写在 \`components.json\` 和项目 \`.env.local\`，例如环境变量 \`REGISTRY_TOKEN\`。不要把 token 写进 MCP 的 \`env\` 表、\`args\` 或 \`http_headers\`。不要 \`codex mcp add --env SECRET=\`。

冷启动 \`npx\` 可能超过默认 10 秒握手，把 \`startup_timeout_sec\` 提到 30–60。不要 \`required = true\`。不要一上来 \`--yolo\`。网页 Cloud 不读 \`~/.codex/config.toml\`。

改完彻底新开会话。用 \`codex mcp get shadcn\` 看 command 是 npx。会话里先问 \`Show me all available components in the shadcn registry\`。出现 No tools or prompts 时先 \`npx clear-npx-cache\`，再新开会话。

不要做这些：

- 不要发明 \`codex plugin add shadcn@openai-curated\`。
- 不要抄 Claude 的 \`mcp init --client claude\`。
- 不要对这张表跑 \`mcp login\`。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "shadcn", "stdio"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "mcp-startup-timeout-sec"],
    sources: [
      {
        label: "shadcn/ui · MCP Server",
        url: "https://ui.shadcn.com/docs/mcp",
      },
    ],
  },
  {
    id: "inngest-mcp-http",
    no: 349,
    title: "Inngest Cloud MCP 用 api.inngest.com/mcp 加 bearer",
    summary:
      "官方 Codex：mcp add inngest-cloud --url https://api.inngest.com/mcp --bearer-token-env-var INNGEST_API_KEY。URL 带 /mcp。不要 mcp login。不要抄 Claude 的 --header Bearer。本机 Dev Server 另开 inngest-dev。",
    body: `Inngest 给 Codex 有专节。Cloud 官方 CLI 主路径是远程 Streamable HTTP + bearer，**不是** OAuth：

\`\`\`bash
codex mcp add inngest-cloud --url https://api.inngest.com/mcp --bearer-token-env-var INNGEST_API_KEY
\`\`\`

URL **带** \`/mcp\` 后缀。用户层表名官方就是 \`inngest-cloud\`。不要发明不带后缀的 \`https://api.inngest.com\`。不要 \`mcp login\` 这张表。\`INNGEST_API_KEY\` 必须在**启动 Codex 的那个进程**里；Dock / 开始菜单打开的桌面读不到 zshrc。键里填的是变量名，不是 token。Cloud MCP 只要 API key（前缀 \`sk-inn-api-\`），**不要**拿 signing key 顶上。

\`\`\`toml
[mcp_servers.inngest-cloud]
url = "https://api.inngest.com/mcp"
bearer_token_env_var = "INNGEST_API_KEY"
enabled = true
\`\`\`

不要抄 Claude 的 \`claude mcp add --transport http inngest-cloud https://api.inngest.com/mcp --header "Authorization: Bearer …"\`。不要把 token 写进 \`http_headers\`、\`args\`、\`env\` 表或 URL。不要抄 Cursor JSON 里的 \`headers\` / \`Authorization\`。不要抄 JSON \`mcpServers\`。不要发明 \`codex plugin add inngest@…\`。不要抄 \`npx mcp-remote\`。

本机 Dev Server 是**另一张表**，先 \`inngest dev\`，默认终点是 \`http://127.0.0.1:8288/mcp\`，无鉴权：

\`\`\`bash
codex mcp add inngest-dev --url http://127.0.0.1:8288/mcp
\`\`\`

两张表可以同时配，不要合成一台。改过 Dev Server 端口就把 URL 改成对应的 \`127.0.0.1\` 地址。不要给 \`inngest-dev\` 加 \`bearer_token_env_var\`，也不要 \`mcp login\`。

Cloud 工具能改数据：\`send_event\`、\`invoke_function\`、\`rerun\`、\`cancel_run\`、\`sync_app\`、管环境和 webhook。先只读：问 \`List my Inngest environments, then show the apps in production.\` 环境用工具参数 \`env\` 选，不是 MCP 表。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。

改完彻底新开会话。用 \`codex mcp get inngest-cloud\` 看传输是 streamable_http、Auth 是 Bearer。\`mcp list\` 显示 Bearer 不等于请求真带了头，变量缺失时工具数为 0 或 401。

不要做这些：

- 不要发明 \`codex plugin add inngest@openai-curated\`。
- 不要抄 Claude 的 \`--header\` Bearer 字面量。
- 不要对 Cloud 这张表跑 \`mcp login\`。
- 不要把 \`inngest-cloud\` 和 \`inngest-dev\` 配成一张表。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Inngest", "bearer", "HTTP"],
    related: ["mcp-http-bearer-env", "mcp-add-and-login", "mcp-http-not-sse"],
    sources: [
      {
        label: "Inngest · MCP",
        url: "https://www.inngest.com/docs/ai-dev-tools/mcp",
      },
    ],
  },
  {
    id: "polar-mcp-http",
    no: 350,
    title: "Polar MCP 用 mcp.polar.sh/mcp/polar-mcp，再完成 OAuth",
    summary:
      "官方 Codex：mcp add polar --url https://mcp.polar.sh/mcp/polar-mcp，随后完成 OAuth。URL 是 /mcp/polar-mcp，不是光 /mcp。沙箱另开 polar-sandbox。不要抄 Claude 的 --transport http。",
    body: `Polar（polar.sh）给 Codex 有专节。官方 CLI 主路径是远程 Streamable HTTP + OAuth，**不要** API key，也**不要** \`bearer_token_env_var\`：

\`\`\`bash
codex mcp add polar --url https://mcp.polar.sh/mcp/polar-mcp
\`\`\`

官方文档把表名写成带引号的 \`"polar"\`，和 \`polar\` 一样。URL 是 \`https://mcp.polar.sh/mcp/polar-mcp\`，**不是**光 \`https://mcp.polar.sh/mcp\`。加完后按提示在浏览器完成 OAuth。只写进了表、浏览器没弹时再跑：

\`\`\`bash
codex mcp login polar
\`\`\`

\`\`\`toml
[mcp_servers.polar]
url = "https://mcp.polar.sh/mcp/polar-mcp"
enabled = true
\`\`\`

不要抄 Claude 的 \`claude mcp add --transport http polar https://mcp.polar.sh/mcp/polar-mcp\`。不要抄 Cursor 的 \`.cursor/mcp.json\`。不要抄 ChatGPT / Claude Desktop 的 Connectors。不要抄 \`npx mcp-remote\`。不要发明 \`codex plugin add polar@…\`。不要把 Polar API key 写进 URL、\`http_headers\`、\`args\` 或 \`env\` 表。

沙箱是**另一张表**，官方名字就是 \`polar-sandbox\`，终点是 \`https://mcp.polar.sh/mcp/polar-sandbox\`：

\`\`\`bash
codex mcp add polar-sandbox --url https://mcp.polar.sh/mcp/polar-sandbox
\`\`\`

浏览器没弹时再 \`codex mcp login polar-sandbox\`。两张表可以同时配，不要合成一台。不要抄旧镜像文档里的 \`[features] rmcp_client = true\`、\`type = "http"\`，或把表名写成 \`polar_sandbox\`。

Polar 只暴露三把元工具：\`search_tools\`、\`describe_tools\`、\`execute_tool\`。会话里不会一次列出 100 个业务工具。先只读：问 \`Search Polar tools for listing products, then list my products.\` \`execute_tool\` 能建商品、退款、删客户、立刻撤销订阅，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。

改完彻底新开会话。用 \`codex mcp get polar\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth。旧票卡住时先 \`codex mcp logout polar\`，再重新 login。

不要做这些：

- 不要发明 \`codex plugin add polar@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor JSON。
- 不要把生产 \`polar-mcp\` 和沙箱 \`polar-sandbox\` 配成一张表。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Polar", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "butter-mcp-http"],
    sources: [
      {
        label: "Polar · MCP",
        url: "https://polar.sh/docs/integrate/mcp",
      },
    ],
  },
  {
    id: "inngest-codex-plugin",
    no: 351,
    title: "Inngest 官方 Codex 插件 clone 后 plugin install 本地路径",
    summary:
      "官方 Codex：git clone inngest/inngest-codex-plugin，再在会话里 /plugin install 绝对路径/inngest-codex-plugin/plugins/inngest。装这一层，不是仓库根。不要发明 plugin add inngest@。不要抄 Claude 的 inngest@inngest-claude-code-plugin。",
    body: `Inngest 给 Codex 有专节。官方主路径是 clone 官方插件仓，再在 Codex 会话里对**插件包目录**跑 \`/plugin install\`，不是 \`codex plugin add inngest@…\`：

\`\`\`bash
git clone https://github.com/inngest/inngest-codex-plugin.git
\`\`\`

然后在 Codex 里把路径换成你机器上的绝对路径：

\`\`\`text
/plugin install $HOME/src/inngest-codex-plugin/plugins/inngest
\`\`\`

装的是 \`plugins/inngest\` 这一层（里面有 \`.codex-plugin/plugin.json\` 和 \`.mcp.json\`），**不要**对仓库根跑 \`/plugin install\`。清单里的插件名是 \`inngest\`，当前版本是 0.3.4 的 Codex 移植，标 Beta。

备选：克隆根有 \`.agents/plugins/marketplace.json\`，市场名是 \`inngest-codex-plugin\`。在克隆根跑 \`codex plugin marketplace add .\`，再 TUI \`/plugins\` 或桌面 Plugins 装 **Inngest**。官方**没有**写出 \`codex plugin add inngest@inngest-codex-plugin\`，不要发明。IDE 扩展没有 \`/plugins\`，用 CLI 加完再到 TUI 或桌面去装。0.154 起先看**当前会话**；当前会话没有再新开。

不要抄 Claude 的 \`/plugin marketplace add inngest/inngest-claude-code-plugin\` 和 \`/plugin install inngest@inngest-claude-code-plugin\`。那是另一份 Claude 插件。不要用 \`npx skills add inngest/inngest-skills\` 当 Codex 安装器：那会改所有检测到的客户端，也**不会**登记 MCP。不要把仓库 clone 进 \`~/.codex/skills\` 或 \`.agents/skills/\` 根目录。

插件自带的 MCP 只接本机 Dev Server：\`http://127.0.0.1:8288/mcp\`，表名 \`inngest-dev\`，无鉴权，**不要** \`mcp login\`。先 \`npx inngest-cli@latest dev\`（或 \`inngest dev\`），应用侧 \`INNGEST_DEV=1\`。Dev Server 落到 8289 就把插件 \`.mcp.json\` 里的 URL 改掉。装了插件就**不要**再手写 \`mcp add inngest-dev\`，除非 \`/mcp\` 里根本没这台。Cloud 是另一张表，仍走 \`codex mcp add inngest-cloud --url https://api.inngest.com/mcp --bearer-token-env-var INNGEST_API_KEY\`，插件**不会**替你配 Cloud。不要把 API key、signing key、webhook URL 写进插件 JSON、\`http_headers\` 或提示词。

插件 JSON 的包装键是 \`mcpServers\`，\`type\` 是 \`http\`。那是插件 \`.mcp.json\`，不要抄进用户层 \`config.toml\` 当 JSON，也不要再给用户表加 \`type = "http"\`。

改完核对 \`/plugins\` 能看到 Inngest。先只读：问 \`Audit this codebase for places where background work, webhooks, cron jobs, or AI workflows can be lost during deploys or process crashes. Pick the safest first Inngest integration slice and implement it.\` 不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读这份本机插件。

不要做这些：

- 不要发明 \`codex plugin add inngest@openai-curated\` 或 \`inngest@inngest-claude-code-plugin\`。
- 不要抄 Claude 的 marketplace / plugin install。
- 不要把 \`npx skills add inngest/inngest-skills\` 当成 Codex 专节。
- 不要把插件 MCP 和 Cloud \`inngest-cloud\` 配成一张表。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["MCP", "Inngest", "plugins", "Skills"],
    related: ["inngest-mcp-http", "plugin-session-refresh", "plugins-vs-skills"],
    sources: [
      {
        label: "Inngest · Agent plugins and skills",
        url: "https://www.inngest.com/docs/ai-dev-tools/agent-skills",
      },
      {
        label: "inngest/inngest-codex-plugin",
        url: "https://github.com/inngest/inngest-codex-plugin",
      },
    ],
  },
  {
    id: "appwrite-codex-plugin",
    no: 352,
    title: "Appwrite 用 marketplace add appwrite/codex-plugin，远程 MCP 走 mcp.appwrite.io 尾斜杠",
    summary:
      "官方 Codex：plugin marketplace add appwrite/codex-plugin，再 /plugins 装 Appwrite。远程 MCP 是 mcp add appwrite --url https://mcp.appwrite.io/，有尾斜杠、没有 /mcp。OAuth，浏览器没弹再 mcp login appwrite。不要发明 plugin add appwrite@。不要抄 Claude 的 --transport http。",
    body: `Appwrite 给 Codex 有专节。官方主路径是先加官方市场，再在 TUI 装 **Appwrite** 插件；项目 API 走远程 Streamable HTTP + OAuth，**不要** API key，也**不要** \`bearer_token_env_var\`：

\`\`\`bash
codex plugin marketplace add appwrite/codex-plugin
\`\`\`

然后跑 \`codex\`，TUI 里 \`/plugins\` 选 **Appwrite** 装上。市场清单名和插件名都是 \`appwrite\`，当前插件版本是 0.2.0。官方**没有**写出 \`codex plugin add appwrite@appwrite\`，不要发明。IDE 扩展没有 \`/plugins\`，用 CLI 加完再到 TUI 或桌面去装。0.154 起先看**当前会话**；当前会话没有再新开。

不要抄 Claude 的 \`claude plugin install appwrite@claude-plugins-official\`。不要用 \`npx skills add\` 当 Codex 安装器。不要把技能手拷进 \`~/.codex/skills\` 或 \`.agents/skills/\` 当主路径。

插件 \`.mcp.json\` 会登记一台 \`appwrite\`，URL 就是 \`https://mcp.appwrite.io/\`（**有尾斜杠，没有** \`/mcp\` 后缀）。包装键是 \`mcpServers\`，\`type\` 是 \`http\`。那是插件 JSON，不要抄进用户层 \`config.toml\` 当 JSON，也不要再给用户表加 \`type = "http"\`。装完插件后若 \`/mcp\` 已经有 \`appwrite\`，不要再手写第二张同 URL 的表。官方 Codex 页第 3 步仍给出手动加表，\`/mcp\` 里没有这台时再跑：

\`\`\`bash
codex mcp add appwrite --url https://mcp.appwrite.io/
\`\`\`

官方表名就是 \`appwrite\`。加完后按提示在浏览器完成 OAuth。只写进了表、浏览器没弹时再跑：

\`\`\`bash
codex mcp login appwrite
\`\`\`

\`\`\`toml
[mcp_servers.appwrite]
url = "https://mcp.appwrite.io/"
enabled = true
\`\`\`

不要抄 Claude 的 \`claude mcp add --transport http appwrite https://mcp.appwrite.io/\`。不要抄 Cursor 的 \`.cursor/mcp.json\`。不要抄 \`npx mcp-remote\`。不要发明 \`codex plugin add appwrite@openai-curated\`。不要把 Appwrite API key、project ID 写进 URL、\`http_headers\`、\`args\` 或 \`env\` 表。不要用旧的 \`https://mcp-for-docs.appwrite.io\` 当主路径：远程这台已经带文档搜索。

会话里不会一次列出全部 Appwrite 业务工具。官方暴露的是一小撮入口：\`appwrite_get_context\`、\`appwrite_search_tools\`、\`appwrite_call_tool\`、\`appwrite_search_docs\`。先只读：问 \`List all databases in my project\` 或 \`Use Appwrite to show my workspace context and list my projects.\` \`Create a new user in my Appwrite project\` 会改数据，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。

部署技能可以显式调用 \`$appwrite-deploy-site\` 和 \`$appwrite-deploy-function\`。改完核对 \`/plugins\` 能看到 Appwrite，\`codex mcp get appwrite\` 看传输是 streamable_http，会话里 \`/mcp\` 应显示 Auth: OAuth。旧票卡住时先 \`codex mcp logout appwrite\`，再重新 login。

自托管 Appwrite 才走本地 stdio \`uvx mcp-server-appwrite\`。要用时另开一张表，并用 \`env_vars\` 转发已有的 \`APPWRITE_ENDPOINT\`、\`APPWRITE_PROJECT_ID\`、\`APPWRITE_API_KEY\`。不要把 \`--env APPWRITE_API_KEY=...\` 字面量当主路径，也不要把密钥写进 \`env\` 表。Cloud 用户走远程 OAuth，不要这条。不要把自托管 stdio 和远程 \`appwrite\` 配成一张表。

不要做这些：

- 不要发明 \`codex plugin add appwrite@appwrite\` 或 \`appwrite@claude-plugins-official\`。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor JSON。
- 不要给远程这台 \`bearer_token_env_var\`，也不要对它跳过 \`mcp login\`。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Appwrite", "OAuth", "plugins"],
    related: ["mcp-add-and-login", "plugin-session-refresh", "inngest-codex-plugin"],
    sources: [
      {
        label: "Appwrite · Codex",
        url: "https://appwrite.io/docs/tooling/ai/agents/codex",
      },
      {
        label: "Appwrite · Codex (plugin homepage)",
        url: "https://appwrite.io/docs/tooling/ai/ai-dev-tools/codex",
      },
      {
        label: "Appwrite · MCP server",
        url: "https://appwrite.io/docs/tooling/ai/mcp-servers",
      },
      {
        label: "Appwrite · Introducing the Codex plugin",
        url: "https://appwrite.io/blog/post/announcing-appwrite-codex-plugin",
      },
      {
        label: "Appwrite · Remote MCP server",
        url: "https://appwrite.io/blog/post/announcing-remote-appwrite-mcp-server",
      },
      {
        label: "appwrite/codex-plugin",
        url: "https://github.com/appwrite/codex-plugin",
      },
    ],
  },
  {
    id: "trigger-mcp-stdio",
    no: 353,
    title: "Trigger.dev MCP 用 install-mcp --client openai-codex，本地 stdio 要 startup_timeout_sec 30",
    summary:
      "官方 Codex：npx trigger.dev@latest install-mcp --client openai-codex。表名 trigger，本地 stdio，不是远程 URL。必须 startup_timeout_sec = 30。不要 mcp login。不要 --yolo，也不要抄 Claude 的 mcpServers JSON。",
    body: `Trigger.dev 给 Codex CLI 有专节。官方主路径是本机 **stdio**，不是远程 HTTP，也**不要** \`mcp login\`：

\`\`\`bash
npx trigger.dev@latest install-mcp --client openai-codex
\`\`\`

客户端 id 官方就是 \`openai-codex\`。这条只会改 Codex 的 \`~/.codex/config.toml\`。不要跑裸的 \`install-mcp\` 让它去探测所有客户端，更不要 \`--yolo\`：那会装进所有检测到的工具。这和 Codex 自己的 \`--yolo\` 批准开关不是一回事。

原生等价写法：

\`\`\`bash
codex mcp add trigger -- npx trigger.dev@latest mcp
\`\`\`

官方表名就是 \`trigger\`。\`add\` 不会带上超时，装完把握手改成 30 秒。Codex 默认 10 秒，冷 \`npx\` 第一次拉包经常不够：

\`\`\`toml
[mcp_servers.trigger]
command = "npx"
args = ["trigger.dev@latest", "mcp"]
startup_timeout_sec = 30
enabled = true
\`\`\`

不要抄 Claude / Cursor 的 \`mcpServers\` JSON。不要发明 \`codex plugin add trigger@…\`。不要发明 \`codex mcp add trigger --url https://mcp.trigger.dev/mcp\`。不要把 API key 写进 \`env\` 表、\`args\` 或 \`http_headers\`。

\`search_docs\` 不用登录就能搜文档。部署、触发任务、取消 run 要先在本机用 Trigger.dev CLI 登录；第一次调已鉴权工具时，MCP 会提示你跑 CLI login。这**不是** \`codex mcp login trigger\`。先只读：问 \`Search the trigger docs for a ffmpeg example\`。\`Deploy my project to production\` 和 \`Trigger my foobar task with a sample payload\` 会改云端，保持工具批准。不要一上来 Codex \`--yolo\`。不要 \`required = true\`。

只要只读时，把 \`--readonly\` 加进 \`args\`（会藏 \`deploy\`、\`trigger_task\`、\`cancel_run\`）。钉某个项目或只连 dev 时同样写进 \`args\`，例如 \`--dev-only\` 和 \`--project-ref proj_abc123\`。不要把尖括号占位原样写进 TOML。

技能是另一条路，教模型怎么写 task，不会登记 MCP。官方是：

\`\`\`bash
npx trigger.dev@latest skills
\`\`\`

Codex 会进项目 \`.agents/skills/\`。官方非交互示例只写了 \`--target claude-code\` 和 \`--target cursor\`，**不要发明** \`--target openai-codex\`。changelog 里的 \`npx skills add triggerdotdev/skills\` 是另一套安装器，技能名也是旧的，不要当 Codex 专节。不要把手拷进 \`~/.codex/skills\`。

改完新开会话。用 \`codex mcp get trigger\` 看 command 是 npx。\`/mcp\` 里工具 0 先查 \`startup_timeout_sec\`。网页 Cloud 不读这份 \`config.toml\`，也跑不了本机 stdio。

不要做这些：

- 不要发明 \`codex plugin add trigger@openai-curated\`。
- 不要抄 Claude 的 \`mcpServers\` JSON 或 \`--client claude-code\`。
- 不要对这台跑 \`mcp login\`，也不要给它远程 URL。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Trigger.dev", "stdio", "Skills"],
    related: ["mcp-stdio-env-vars", "shadcn-mcp-stdio", "inngest-mcp-http"],
    sources: [
      {
        label: "Trigger.dev · MCP Introduction",
        url: "https://trigger.dev/docs/mcp-introduction",
      },
      {
        label: "Trigger.dev · Skills",
        url: "https://trigger.dev/docs/skills",
      },
      {
        label: "Trigger.dev · Building with AI",
        url: "https://trigger.dev/docs/building-with-ai",
      },
    ],
  },
  {
    id: "workos-mcp-http",
    no: 354,
    title: "WorkOS MCP 用 mcp.workos.com/mcp，再 mcp login workos",
    summary:
      "官方 Codex：mcp add workos --url https://mcp.workos.com/mcp，再 mcp get / mcp login / mcp list。URL 带 /mcp。OAuth，不要 API key。不要发明 plugin add workos@。不要抄 Claude 的 --transport http。",
    body: `WorkOS 给 Codex CLI 有专节。官方主路径是远程 Streamable HTTP + OAuth，不要 API key，也不要 \`bearer_token_env_var\`：

\`\`\`bash
codex mcp add workos --url https://mcp.workos.com/mcp
codex mcp get workos
codex mcp login workos
codex mcp list
\`\`\`

官方表名就是 \`workos\`。URL 是 \`https://mcp.workos.com/mcp\`，带 \`/mcp\` 后缀。\`mcp add\` 写进用户层 \`~/.codex/config.toml\`，每个项目都能用。\`mcp get\` 只证明 Codex 找到了这张表，\`mcp list\` 只显示终点和鉴权类型，都不证明 OAuth 票能用。加完后按提示在浏览器完成 WorkOS 同意页。只写进了表、浏览器没弹时再跑 \`codex mcp login workos\`。同意完以后，已经在跑的 Codex 会话不会自动带上新服务器，彻底新开一局。

\`\`\`toml
[mcp_servers.workos]
url = "https://mcp.workos.com/mcp"
enabled = true
\`\`\`

只在一个可信仓库里用时，把同一张表写进该仓库的 \`.codex/config.toml\`，再在仓库根跑 \`codex mcp get workos\`、\`codex mcp login workos\`、\`codex mcp list\`。Codex 只给已信任项目加载项目层配置，而且只在这个仓库里生效。不要把它提交进仓库，除非团队就是要共享这台服务器定义。OAuth 票按用户层凭证库另存，不要写进 \`config.toml\`，也不要提交。用户层和项目层不要同时定义同名 \`workos\`，除非你就是要项目覆盖用户层。

不要抄 Claude 的 \`claude mcp add --transport http workos https://mcp.workos.com/mcp\`。不要抄 Cursor 的 \`.cursor/mcp.json\`。不要抄 ChatGPT / Claude Desktop 的 Connectors。不要抄 \`npx mcp-remote\`。不要发明 \`codex plugin add workos@…\`。ChatGPT / Codex 插件目录里即使能搜到 WorkOS，CLI 也没有一键安装，主路径仍是上面的 \`mcp add\`。不要把 WorkOS API key、client secret 写进 URL、\`http_headers\`、\`args\` 或 \`env\` 表。

这台只暴露四把入口：\`whoami\`、\`list_operations\`、\`query\`、\`mutate\`。会话里不会一次列出全部业务工具。先只读：问 \`Use the WorkOS MCP server to run whoami and tell me which team and environment you are in.\` 默认对着 **sandbox**。只有你明确指向 production 时才会碰生产。\`mutate\` 会改组织、连接、邀请，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。

登录、凭证库、证书相关命令在你平时的宿主 shell 里跑。隔离代理环境里失败，不证明 WorkOS MCP 不可用。启动时报 \`MCP startup interrupted\` 且点名 \`workos\`，多半是表写上了但没完成 OAuth：先 \`codex mcp get workos\`，再 \`codex mcp login workos\`，再 \`codex mcp list\`，然后新开会话。旧票卡住时先 \`codex mcp logout workos\`，再重新 login。能登录但访问仍被关掉，让团队管理员去看 dashboard 的 team authentication：Enable、Allow production access、Allow write access。代理继承你的 dashboard 角色，读不到现成的 API key / client secret，也不能改 MCP 开关本身。

不要做这些：

- 不要发明 \`codex plugin add workos@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor JSON。
- 不要给这台 \`bearer_token_env_var\`，也不要对它跳过 \`mcp login\`。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "WorkOS", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "polar-mcp-http"],
    sources: [
      {
        label: "WorkOS · MCP Server",
        url: "https://workos.com/docs/mcp",
      },
      {
        label: "WorkOS · Install in Claude, ChatGPT, and Codex",
        url: "https://workos.com/blog/install-workos-plugin-claude-chatgpt-codex",
      },
    ],
  },
  {
    id: "statsig-mcp-http",
    no: 355,
    title: "Statsig MCP 用 api.statsig.com/v1/mcp，再完成 OAuth",
    summary:
      "官方 Codex：mcp add statsig --url https://api.statsig.com/v1/mcp。URL 是 /v1/mcp，不是光 /mcp。OAuth，浏览器没弹再 mcp login statsig。不要抄 npx mcp-remote，也不要把 console API key 写进 http_headers。",
    body: `Statsig 给 Codex 有专节。官方主路径是远程 Streamable HTTP + OAuth，不要把 Console API key 写进 TOML：

\`\`\`bash
codex mcp add statsig --url https://api.statsig.com/v1/mcp
\`\`\`

官方表名就是 \`statsig\`。URL 是 \`https://api.statsig.com/v1/mcp\`，是 \`/v1/mcp\`，不是光 \`https://api.statsig.com/mcp\`。\`mcp add\` 会写进 \`~/.codex/config.toml\`。官方说这条会打开浏览器，让你登录 Statsig 并授权项目。只写进了表、浏览器没弹时再跑：

\`\`\`bash
codex mcp login statsig
\`\`\`

\`\`\`toml
[mcp_servers.statsig]
url = "https://api.statsig.com/v1/mcp"
enabled = true
\`\`\`

桌面走 Settings → MCP servers，传输选 Streamable HTTP，URL 同样是 \`https://api.statsig.com/v1/mcp\`。IDE 扩展和 CLI 共用这份用户层配置。OAuth 只支持 Personal Console API Keys；组织 owner 要先在 Statsig 组织设置里打开这个能力，否则浏览器授权会失败。授权完彻底新开会话，TUI 里 \`/mcp\` 应看到 statsig 且 enabled。

不要抄 Codex 页那份同时写 \`url\` 和 \`command = "npx"\`、\`args\` 里 \`mcp-remote\`、以及 \`trust_level = "trusted"\` 的 TOML。Codex 远程表只要 \`url\`，\`trust_level\` 不是 Codex 键。不要抄 Claude 的 \`--transport http\`。不要抄 Cursor 的 \`.cursor/mcp.json\`。不要抄 ChatGPT Connector。不要发明 \`codex plugin add statsig@…\`。不要把 \`console-\` 开头的 key 写进 URL、\`http_headers\`、\`args\` 或 \`env\` 表。

无头才用 Console API key。官方示例走 \`npx mcp-remote\` 加 \`statsig-api-key\` 头，那不是 Codex 主路径。必须无头时，远程表仍写 \`url\`，头名用 \`env_http_headers\` 指向进程里的变量名（头是 \`statsig-api-key\`，不是 Bearer）。不要和已经 login 的 OAuth 写在同一张表。Codex 不读 \`.env\`。

先只读：问 \`List all my active experiments\` 或 \`What gates are currently stale?\` 创建 / 更新实验、门和 Dynamic Config 会改控制台，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。

不要做这些：

- 不要发明 \`codex plugin add statsig@openai-curated\`。
- 不要抄 \`npx mcp-remote\` 或把 API key 写进 \`http_headers\`。
- 不要给这台同时写 \`command\` 和 \`url\`。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Statsig", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "workos-mcp-http"],
    sources: [
      {
        label: "Statsig · MCP with Codex",
        url: "https://docs.statsig.com/integrations/mcp/codex",
      },
      {
        label: "Statsig · MCP overview",
        url: "https://docs.statsig.com/integrations/mcp/overview",
      },
    ],
  },
  {
    id: "contentful-mcp-stdio",
    no: 356,
    title: "Contentful MCP 用 npx @contentful/mcp-server，密钥走 env_vars",
    summary:
      "官方 Codex：mcp add contentful -- npx -y @contentful/mcp-server。表名 contentful，本地 stdio。PAT 和 SPACE_ID 用 env_vars，不要把 --env 字面量写进 TOML。不要 mcp login。不要发明远程 --url 或 plugin add contentful@。",
    body: `Contentful 官方仓库 README 给 Codex 有专节。官方主路径是本机 stdio 包 \`@contentful/mcp-server\`，用 Management API 个人访问令牌，不是远程 URL，也不要 \`mcp login\`：

\`\`\`bash
codex mcp add contentful -- npx -y @contentful/mcp-server
\`\`\`

官方表名就是 \`contentful\`。README 那条 \`--env CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=…\` 会把密钥字面量写进 \`config.toml\`，不要抄。改成 \`env_vars\`，从启动 Codex 的进程转发名字：

\`\`\`toml
[mcp_servers.contentful]
command = "npx"
args = ["-y", "@contentful/mcp-server"]
env_vars = ["CONTENTFUL_MANAGEMENT_ACCESS_TOKEN", "SPACE_ID"]
startup_timeout_sec = 30
enabled = true
\`\`\`

必填是 \`CONTENTFUL_MANAGEMENT_ACCESS_TOKEN\` 和 \`SPACE_ID\`。\`ENVIRONMENT_ID\` 默认 \`master\`，\`CONTENTFUL_HOST\` 默认 \`api.contentful.com\`；要覆盖时把名字加进 \`env_vars\`，不要把值写进 \`env\` 表。要拦写和删时再转发 \`PROTECTED_ENVIRONMENTS\`，值是逗号分隔的环境 ID，例如 \`master,staging\`。这只挡住这台 MCP 的写/删，挡不住网页应用和直接 CMA 调用。环境 ID 大小写敏感。Codex 默认启动超时 10 秒，冷 \`npx\` 第一次拉包经常不够，所以加上 \`startup_timeout_sec = 30\`。

不要抄 Cursor 的 \`mcpServers\` JSON（那份表名是 \`contentful-mcp\`）或 One-Click 安装。不要抄 Claude Desktop 的 \`.dxt\`。不要发明 \`codex mcp add contentful --url https://mcp.contentful.com/mcp\`：官方 Codex 专节是本地 stdio。托管远程服务器是另一条路，官方文档给的是通用 JSON，没有 Codex \`mcp add --url\` 专节；要用远程必须先给目标 space/environment 装 Contentful Remote MCP App，走 OAuth，不要把 PAT 拼进 URL。不要把 stdio 的 PAT 和远程 OAuth 写进同一张表。不要发明 \`codex plugin add contentful@…\`。Claude 的 \`/plugin marketplace add contentful/skills\` 不是 Codex 命令。技能可以 \`npx skills add contentful/skills\`，官方没钉 \`--agent codex\`，不要发明；技能也不会登记这台 stdio MCP。不要把手拷进 \`~/.codex/skills\`。

PAT 必须在**启动 Codex 的那个进程**里。Codex 不读 \`.env\`。从 Dock 打开的桌面没有你在 zshrc 里 export 的变量。\`codex doctor\` 会标出点了名却缺失的 \`env_vars\`。改完彻底新开会话。用 \`codex mcp get contentful\` 看 command 是 npx。\`/mcp\` 里工具 0 先查超时和环境。网页 Cloud 不读这份 \`config.toml\`，也跑不了本机 stdio。

先只读：问 \`List content types in this Contentful space\` 或 \`Search entries about the fall launch\`。\`create_entry\`、\`publish_entry\`、\`delete_entry\` 会改空间，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add contentful@openai-curated\`。
- 不要把 PAT 写进 \`env\` 表、\`--env\` 字面量、\`args\` 或 \`http_headers\`。
- 不要对这台跑 \`mcp login\`，也不要把远程 URL 当 Codex 主路径。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Contentful", "stdio", "env_vars"],
    related: ["mcp-stdio-env-vars", "trigger-mcp-stdio", "shadcn-mcp-stdio"],
    sources: [
      {
        label: "contentful/contentful-mcp-server",
        url: "https://github.com/contentful/contentful-mcp-server",
      },
      {
        label: "Contentful · MCP server",
        url: "https://www.contentful.com/developers/docs/tools/mcp-server",
      },
    ],
  },
  {
    id: "loops-mcp-http",
    no: 357,
    title: "Loops MCP 用 mcp.loops.so，不要加 /mcp 后缀",
    summary:
      "官方 Codex：mcp add loops --url https://mcp.loops.so。URL 没有 /mcp。OAuth，浏览器没弹再 mcp login loops。不要抄 Claude 的 --transport http。不要发明 plugin add loops@。",
    body: `Loops 给 Codex CLI 有专节。官方主路径是远程 Streamable HTTP + OAuth，不要 API key，也不要 \`bearer_token_env_var\`：

\`\`\`bash
codex mcp add loops --url https://mcp.loops.so
\`\`\`

官方表名就是 \`loops\`。URL 是 \`https://mcp.loops.so\`，没有 \`/mcp\` 后缀，也不要加尾斜杠。这和 Stripe / Vercel 一样，不要按 WorkOS 那种带 \`/mcp\` 的地址去改。\`mcp add\` 写进用户层 \`~/.codex/config.toml\`。官方说加完会让你登录并选择要授权的账号。只写进了表、浏览器没弹时再跑：

\`\`\`bash
codex mcp login loops
\`\`\`

\`\`\`toml
[mcp_servers.loops]
url = "https://mcp.loops.so"
enabled = true
\`\`\`

不要抄 Claude 的 \`claude mcp add loops https://mcp.loops.so --scope user --transport http\`。不要抄 Claude Desktop Connectors。不要发明 \`codex plugin add loops@…\`。ChatGPT / 桌面 Plugins 里即使能搜到 Loops，CLI 主路径仍是上面的 \`mcp add\`。不要把 Loops API key 写进 URL、\`http_headers\`、\`args\` 或 \`env\` 表。营销页 \`loops.so/agents/mcp\` 仍写 MCP On the roadmap，以 \`docs/mcp-server\` 的 Codex 专节为准。

文档写 Codex CLI v1.48.0 or later。现行 CLI 版本是 0.x（例如 0.154），不要去找 \`rust-v1.48.0\`。能跑 \`codex mcp add --url\` 即可。

技能是另一条路，教模型怎么用 Loops API / CLI / LMX，不会登记这台远程 MCP。官方技能页是：

\`\`\`bash
curl -fsSL https://install.loops.so/skills | sh
\`\`\`

营销页还有 \`npx skills add loops-so/skills --global\`，官方没钉 \`--agent codex\`，不要发明。不要把手拷进 \`~/.codex/skills\`。

先只读：问 \`Which Loops teams am I a part of?\` 创建联系人、发事务邮件、改活动会改账号，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。\`codex mcp get loops\` 看 url。TUI \`/mcp\` 里应看到 loops 且 enabled。

不要做这些：

- 不要发明 \`codex plugin add loops@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\`。
- 不要写成 \`https://mcp.loops.so/mcp\`。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Loops", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "mcp-vercel-remote"],
    sources: [
      {
        label: "Loops · MCP server",
        url: "https://loops.so/docs/mcp-server",
      },
      {
        label: "Loops · Agent skills",
        url: "https://loops.so/docs/skills",
      },
    ],
  },
  {
    id: "brightdata-mcp-stdio",
    no: 358,
    title: "Bright Data MCP 用 npx @brightdata/mcp，密钥走 env_vars",
    summary:
      "官方 Codex：mcp add brightdata -- npx -y @brightdata/mcp。表名 brightdata，本地 stdio。API_TOKEN 用 env_vars，不要抄 --env 字面量。不要 mcp login。不要把 token 拼进 mcp.brightdata.com URL。",
    body: `Bright Data 给 Codex CLI 有专节。官方可执行命令是本机 stdio 包 \`@brightdata/mcp\`，用 API token，不是 OAuth，也不要 \`mcp login\`：

\`\`\`bash
codex mcp add brightdata -- npx -y @brightdata/mcp
\`\`\`

官方表名就是 \`brightdata\`。那条 \`--env API_TOKEN=…\` 和 \`[mcp_servers.brightdata.env]\` 字面量会把密钥写进 \`config.toml\`，不要抄。改成 \`env_vars\`，从启动 Codex 的进程转发名字：

\`\`\`toml
[mcp_servers.brightdata]
command = "npx"
args = ["-y", "@brightdata/mcp"]
env_vars = ["API_TOKEN"]
startup_timeout_sec = 30
enabled = true
\`\`\`

必填是 \`API_TOKEN\`。默认是 Rapid / 基础工具（搜索和把页面刮成 Markdown）。要开全部 Pro 工具时，把 \`PRO_MODE\` 也加进 \`env_vars\`，在进程里设成 \`true\`。\`GROUPS\` 或 \`TOOLS\` 一旦转发，会盖过 Pro。自定义 Unlocker / Browser zone 时转发 \`WEB_UNLOCKER_ZONE\`、\`BROWSER_ZONE\`，不要把值写进 \`env\` 表。Codex 默认启动超时 10 秒，冷 \`npx\` 第一次拉包经常不够，所以加上 \`startup_timeout_sec = 30\`。

不要抄官方 Hosted 那段把 \`token=\` 拼进 \`https://mcp.brightdata.com/mcp?token=…\` 的 TOML。密钥进 URL 会进配置文件和日志。也不要发明 \`bearer_token_env_var\` 去接这台 hosted；官方远程鉴权就是 query token。不要抄 FAQ 里的 \`/sse\` 地址，Codex 只接 Streamable HTTP。不要抄 Claude 的 \`--transport http\` 或 \`npx mcp-remote\`。不要发明 \`codex plugin add brightdata@…\`。官方 CLI \`brightdata add mcp --agent codex\` 写的是 \`~/.codex/mcp.json\`，Codex 用户层 MCP 读的是 \`config.toml\`，不要当主路径。博客里的表名 \`brightData\` 和内联 \`env = { … }\` 不要抄。

\`API_TOKEN\` 必须在**启动 Codex 的那个进程**里。Codex 不读 \`.env\`。从 Dock 打开的桌面没有你在 zshrc 里 export 的变量。\`codex doctor\` 会标出点了名却缺失的 \`env_vars\`。改完彻底新开会话。用 \`codex mcp get brightdata\` 看 command 是 npx。\`/mcp\` 里工具 0 先查超时和环境。网页 Cloud 不读这份 \`config.toml\`，也跑不了本机 stdio。

先只读：问 \`Search the live web for Bright Data MCP Codex setup\` 或 \`Fetch this public docs page as markdown\`。浏览器自动化、批量刮站和结构化抓取会走 Pro 配额，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add brightdata@openai-curated\`。
- 不要把 token 写进 URL、\`env\` 表、\`--env\` 字面量、\`args\` 或 \`http_headers\`。
- 不要对这台跑 \`mcp login\`，也不要把 hosted query token 当 Codex 主路径。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Bright Data", "stdio", "env_vars"],
    related: ["mcp-stdio-env-vars", "contentful-mcp-stdio", "trigger-mcp-stdio"],
    sources: [
      {
        label: "Bright Data · Codex MCP",
        url: "https://docs.brightdata.com/ai/mcp-server/integrations/codex",
      },
      {
        label: "Bright Data · Local MCP advanced",
        url: "https://docs.brightdata.com/ai/mcp-server/local/advanced",
      },
    ],
  },
  {
    id: "buffer-mcp-http",
    no: 359,
    title: "Buffer MCP 用 mcp.buffer.com/mcp，再完成 OAuth",
    summary:
      "官方 Codex：mcp add buffer --url https://mcp.buffer.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login buffer。不要 API key。不要发明 plugin add buffer@。不要抄 ChatGPT Developer mode。",
    body: `Buffer 给 Codex CLI 有专节。官方主路径是远程 Streamable HTTP + OAuth，不要 API key，也不要 \`bearer_token_env_var\`：

\`\`\`bash
codex mcp add buffer --url https://mcp.buffer.com/mcp
\`\`\`

官方表名就是 \`buffer\`。URL 是 \`https://mcp.buffer.com/mcp\`，带 \`/mcp\` 后缀。\`mcp add\` 会写进用户层 \`~/.codex/config.toml\`。官方说这条会打开浏览器，让你登录 Buffer 并授权。只写进了表、浏览器没弹时再跑：

\`\`\`bash
codex mcp login buffer
\`\`\`

\`\`\`toml
[mcp_servers.buffer]
url = "https://mcp.buffer.com/mcp"
enabled = true
\`\`\`

不要抄同一页里 ChatGPT 的 Developer mode / Connectors：那是网页 ChatGPT，不是 Codex CLI。不要抄 Claude 的 \`--transport http\`。不要抄 Cursor 的 \`.cursor/mcp.json\`。不要抄 \`npx mcp-remote\`。不要发明 \`codex plugin add buffer@…\`。ChatGPT / Codex 插件目录里即使能搜到 Buffer，CLI 也没有一键安装，主路径仍是上面的 \`mcp add\`。不要把 Buffer API key、access token 写进 URL、\`http_headers\`、\`args\` 或 \`env\` 表。

先只读：问列出这周已排期的 Buffer 帖子，或列出已连接的渠道。创建草稿、改排期会改账号，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。\`codex mcp get buffer\` 看 url。TUI \`/mcp\` 里应看到 buffer 且 enabled。

登录、凭证库相关命令在你平时的宿主 shell 里跑。隔离代理环境里失败，不证明 Buffer MCP 不可用。启动时报 \`MCP startup interrupted\` 且点名 \`buffer\`，多半是表写上了但没完成 OAuth：先 \`codex mcp get buffer\`，再 \`codex mcp login buffer\`，再 \`codex mcp list\`，然后新开会话。旧票卡住时先 \`codex mcp logout buffer\`，再重新 login。

不要做这些：

- 不要发明 \`codex plugin add buffer@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor JSON。
- 不要给这台 \`bearer_token_env_var\`，也不要把 token 写进 URL。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Buffer", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "workos-mcp-http"],
    sources: [
      {
        label: "Buffer · ChatGPT and Codex",
        url: "https://developers.buffer.com/guides/integrations/chatgpt.html",
      },
      {
        label: "Buffer · ChatGPT integration",
        url: "https://buffer.com/integrations/chatgpt",
      },
    ],
  },
  {
    id: "growthbook-mcp-stdio",
    no: 360,
    title: "GrowthBook MCP 用 npx @growthbook/mcp，密钥走 env_vars",
    summary:
      "官方 Codex：mcp add growthbook -- npx -y @growthbook/mcp@latest。表名 growthbook，本地 stdio。GB_API_KEY 用 env_vars，不要抄 --env 字面量。不要 mcp login。不要发明远程 --url 或 plugin add growthbook@。",
    body: `GrowthBook 给 Codex 有专文。官方主路径是本机 stdio 包 \`@growthbook/mcp\`，用 PAT，不是远程 URL，也不要 \`mcp login\`：

\`\`\`bash
codex mcp add growthbook -- npx -y @growthbook/mcp@latest
\`\`\`

官方表名就是 \`growthbook\`。专文那条 \`--env GB_API_KEY=…\` 会把密钥写进 \`config.toml\`，不要抄。改成 \`env_vars\`，从启动 Codex 的进程转发名字：

\`\`\`toml
[mcp_servers.growthbook]
command = "npx"
args = ["-y", "@growthbook/mcp@latest"]
env_vars = ["GB_API_KEY"]
startup_timeout_sec = 30
enabled = true
\`\`\`

必填是 \`GB_API_KEY\`（API key 或 PAT）。GrowthBook Cloud 默认打 \`https://api.growthbook.io\`，Cloud 用户不要加 \`GB_API_URL\`。自托管才把 \`GB_API_URL\` 加进 \`env_vars\`，写成 HTTPS API 根，不要带 \`/api/v1\` 或 \`/api/v2\`。反向代理要额外头时转发 \`GB_HTTP_HEADER_*\` 这些名字，不要把值写进 \`env\` 表。Codex 默认启动超时 10 秒，冷 \`npx\` 第一次拉包经常不够，所以加上 \`startup_timeout_sec = 30\`。

现行 2.x 是四把工具：\`growthbook_list_skills\`、\`growthbook_read_skill\`、\`growthbook_api_read\`、\`growthbook_api_write\`。Codex 专文里还写着 \`growthbook_call_api\`，官方 MCP 文档已经拆成 read/write。若仍看到 \`get_feature_flags\` 一类 1.x 名字，是旧包或过期文档。旧文档的 \`GB_EMAIL\`、\`GB_APP_ORIGIN\` 不是现行 stdio 必填项，不要抄 Cursor JSON 那整段 env。

不要发明 \`codex mcp add growthbook --url https://mcp.growthbook.io/mcp\`。Cloud 远程 OAuth 是给 Cursor / VS Code / Claude 的；Codex 专文是本地 stdio。不要抄 Claude 的 \`--transport stdio\` 或 \`--transport http\`。不要抄 Cursor 的 \`.cursor/mcp.json\`。不要发明 \`codex plugin add growthbook@…\`。技能是另一条路：\`npx skills add growthbook/skills\`，官方没钉 \`--agent codex\`，不会登记这台 MCP。Claude 的 marketplace add 不是 Codex 命令。

\`GB_API_KEY\` 必须在**启动 Codex 的那个进程**里。Codex 不读 \`.env\`。从 Dock 打开的桌面没有你在 zshrc 里 export 的变量。\`codex doctor\` 会标出点了名却缺失的 \`env_vars\`。改完彻底新开会话。用 \`codex mcp get growthbook\` 看 command 是 npx。\`/mcp\` 里工具 0 先查超时和环境。网页 Cloud 不读这份 \`config.toml\`，也跑不了本机 stdio。

先只读：问列出 GrowthBook 项目和环境，或列出可用技能。创建开关、发实验、写 API 会改账号，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add growthbook@openai-curated\`。
- 不要把 PAT 写进 \`--env\` 字面量、\`env\` 表、\`args\` 或 URL。
- 不要对这台跑 \`mcp login\`，也不要发明远程 \`--url\`。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "GrowthBook", "stdio", "env_vars"],
    related: ["mcp-stdio-env-vars", "contentful-mcp-stdio", "brightdata-mcp-stdio"],
    sources: [
      {
        label: "GrowthBook · Codex MCP setup",
        url: "https://www.growthbook.io/insights/how-to-set-up-growthbook-mcp-server-for-codex",
      },
      {
        label: "GrowthBook · Official MCP",
        url: "https://docs.growthbook.io/integrations/mcp",
      },
    ],
  },
  {
    id: "unleash-mcp-stdio",
    no: 361,
    title: "Unleash MCP 用 npx @unleash/mcp，密钥走 env_vars",
    summary:
      "官方 Codex：mcp add unleash -- npx -y @unleash/mcp@latest --log-level error。表名 unleash，本地 stdio。UNLEASH_BASE_URL 和 UNLEASH_PAT 用 env_vars，不要抄 --env 字面量。不要 mcp login。不要抄 --transport http。",
    body: `Unleash 给 Codex 有专节。官方主路径是本机 stdio 包 \`@unleash/mcp\`，用实例 URL 和 PAT，不是远程 URL，也不要 \`mcp login\`：

\`\`\`bash
codex mcp add unleash -- npx -y @unleash/mcp@latest --log-level error
\`\`\`

官方表名就是 \`unleash\`。专节那两条 \`--env UNLEASH_BASE_URL=…\` 和 \`--env UNLEASH_PAT=…\` 会把密钥写进 \`config.toml\`，不要抄。改成 \`env_vars\`，从启动 Codex 的进程转发名字：

\`\`\`toml
[mcp_servers.unleash]
command = "npx"
args = ["-y", "@unleash/mcp@latest", "--log-level", "error"]
env_vars = ["UNLEASH_BASE_URL", "UNLEASH_PAT"]
startup_timeout_sec = 30
enabled = true
\`\`\`

必填是 \`UNLEASH_BASE_URL\` 和 \`UNLEASH_PAT\`。实例地址要带 https，不要尾斜杠；写成带 \`/api\` 或不带都可以，服务器会自己归一。可选再转发 \`UNLEASH_DEFAULT_PROJECT\`。Codex 默认启动超时 10 秒，冷 \`npx\` 第一次拉包经常不够，所以加上 \`startup_timeout_sec = 30\`。

不要抄官方 README 里给 Codex 写的 \`codex mcp add unleash https://…/api/admin/mcp --transport http\`。\`--transport http\` 是 Claude 的开关，Codex 不认。远程 MCP 是实例上要先打开的实验功能，不是 Codex 专节的主路径。不要发明 \`codex plugin add unleash@…\`。不要抄 \`npx unleash-mcp\` 当 Codex 命令，官方 Codex 专节是 \`@unleash/mcp@latest\`。不要抄 Claude 的 \`--env\` 字面量。不要抄 Cursor JSON。Codex 不读 Unleash 的 \`.env\`。

\`UNLEASH_BASE_URL\` 和 \`UNLEASH_PAT\` 必须在**启动 Codex 的那个进程**里。从 Dock 打开的桌面没有你在 zshrc 里 export 的变量。\`codex doctor\` 会标出点了名却缺失的 \`env_vars\`。改完彻底新开会话。用 \`codex mcp get unleash\` 看 command 是 npx。\`/mcp\` 里工具 0 先查超时和环境。网页 Cloud 不读这份 \`config.toml\`，也跑不了本机 stdio。

先只读：问列出当前 token 能看到的项目和开关。创建开关、改 rollout、在环境里开关会改账号，保持工具批准。生产环境先开 change request。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add unleash@openai-curated\`。
- 不要把 PAT 写进 \`--env\` 字面量、\`env\` 表、\`args\` 或 URL。
- 不要抄 \`--transport http\`，也不要对这台跑 \`mcp login\`。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Unleash", "stdio", "env_vars"],
    related: ["mcp-stdio-env-vars", "growthbook-mcp-stdio", "contentful-mcp-stdio"],
    sources: [
      {
        label: "Unleash · MCP Server",
        url: "https://docs.getunleash.io/integrate/mcp",
      },
      {
        label: "Unleash/unleash-mcp",
        url: "https://github.com/Unleash/unleash-mcp",
      },
    ],
  },
  {
    id: "flagsmith-mcp-http",
    no: 362,
    title: "Flagsmith MCP 用 mcp.flagsmith.com，不要加 /mcp 后缀",
    summary:
      "官方 Codex：mcp add flagsmith --url https://mcp.flagsmith.com。URL 没有 /mcp。OAuth，浏览器没弹再 mcp login flagsmith。不要 API key。不要发明 plugin add flagsmith@。不要抄 Claude 的 --transport http。",
    body: `Flagsmith 给 Codex CLI 有专节。官方主路径是远程 Streamable HTTP + OAuth，不要 API key，也不要 \`bearer_token_env_var\`：

\`\`\`bash
codex mcp add flagsmith --url https://mcp.flagsmith.com
codex mcp login flagsmith
\`\`\`

官方表名就是 \`flagsmith\`。URL 是 \`https://mcp.flagsmith.com\`，**没有** \`/mcp\` 后缀。自托管容器虽然也听 \`/mcp\`，SaaS 文档写的就是光根地址，不要发明成 \`https://mcp.flagsmith.com/mcp\`。\`mcp add\` 会写进用户层 \`~/.codex/config.toml\`。只写进了表、浏览器没弹时再跑 \`codex mcp login flagsmith\`。

\`\`\`toml
[mcp_servers.flagsmith]
url = "https://mcp.flagsmith.com"
enabled = true
\`\`\`

不要抄 Claude 的 \`--transport http\`。不要抄 Cursor JSON。不要发明 \`codex plugin add flagsmith@…\`。不要把 Organisation API key 写进 URL、\`http_headers\`、\`args\` 或 \`env\` 表。无头才用 \`env_http_headers\` 的 \`Authorization\`，值必须带 \`Api-Key \` 前缀，不是 Bearer；不要 \`bearer_token_env_var\`。不要抄官方 stdio 那段把 \`FLAGSMITH_API_TOKEN\` 写进 \`env\` 表。旧地址 \`https://app.getgram.ai/mcp/flagsmith-mcp\` 已弃用，2026-06-30 关停，迁到 \`https://mcp.flagsmith.com\`。

先只读：问列出能看到的组织和项目，或列出某个项目的开关。创建开关、改环境、发实验会改账号，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。\`codex mcp get flagsmith\` 看 url。TUI \`/mcp\` 里应看到 flagsmith 且 enabled。

登录、凭证库相关命令在你平时的宿主 shell 里跑。隔离代理环境里失败，不证明 Flagsmith MCP 不可用。启动时报 \`MCP startup interrupted\` 且点名 \`flagsmith\`，多半是表写上了但没完成 OAuth：先 \`codex mcp get flagsmith\`，再 \`codex mcp login flagsmith\`，再 \`codex mcp list\`，然后新开会话。

不要做这些：

- 不要发明 \`codex plugin add flagsmith@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor JSON。
- 不要给这台 \`bearer_token_env_var\`，也不要把 \`Api-Key\` 写进 \`http_headers\`。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Flagsmith", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "loops-mcp-http"],
    sources: [
      {
        label: "Flagsmith · MCP Server",
        url: "https://docs.flagsmith.com/integrating-with-flagsmith/mcp-server",
      },
      {
        label: "Flagsmith · Self-hosting MCP",
        url: "https://docs.flagsmith.com/deployment-self-hosting/mcp-server",
      },
    ],
  },
  {
    id: "devcycle-mcp-http",
    no: 363,
    title: "DevCycle MCP 用 mcp.devcycle.com/mcp，再完成 OAuth",
    summary:
      "官方 Codex：mcp add devcycle --url https://mcp.devcycle.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login devcycle。不要抄 /sse 或 npx mcp-remote。不要发明 plugin add devcycle@。",
    body: `DevCycle 给 Codex CLI 有专节。入门页主路径是远程 Streamable HTTP + OAuth，不要 API key，也不要 \`bearer_token_env_var\`：

\`\`\`bash
codex mcp add devcycle --url https://mcp.devcycle.com/mcp
codex mcp login devcycle
\`\`\`

官方表名就是 \`devcycle\`。URL 是 \`https://mcp.devcycle.com/mcp\`，带 \`/mcp\` 后缀。Cursor JSON 里的服务器名是 \`DevCycle\`，不要抄进 Codex 表名。\`mcp add\` 会写进用户层 \`~/.codex/config.toml\`。第一次用工具时会打开 \`mcp.devcycle.com\` 授权；只写进了表、浏览器没弹时再跑 \`codex mcp login devcycle\`。多组织时在 \`auth.devcycle.com\` 选组织。

\`\`\`toml
[mcp_servers.devcycle]
url = "https://mcp.devcycle.com/mcp"
enabled = true
\`\`\`

不要抄同一页的 SSE 备用地址 \`https://mcp.devcycle.com/sse\`，Codex 只接 Streamable HTTP。不要抄 Claude 的 \`claude mcp add --transport http\`。不要抄 Claude Desktop 的 \`npx mcp-remote@0.1.18\`。不要抄 Cursor JSON。不要发明 \`codex plugin add devcycle@…\`，注册表上的 \`com.devcycle/mcp\` 也不是 Codex marketplace id。不要把 client secret 写进 URL、\`http_headers\`、\`args\` 或 \`env\` 表。

本地是另一条路，不是入门页主路径。先 \`npm install -g @devcycle/cli\`，官方 Codex 本地专节是 \`command = "dvc-mcp"\`。先 \`dvc login sso\` 再 \`dvc projects select\`。CI 才把 \`DEVCYCLE_CLIENT_ID\`、\`DEVCYCLE_CLIENT_SECRET\`、\`DEVCYCLE_PROJECT_KEY\` 放进 \`env_vars\`，不要抄 export 字面量。本地不要 \`mcp login\`。同一张表不能同时写 \`url\` 和 \`command\`。

先只读：问列出当前项目的 feature，或 \`get_current_project\`。创建开关、改 targeting、写 production override 会改账号，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。\`codex mcp get devcycle\` 看 url。TUI \`/mcp\` 里应看到 devcycle 且 enabled。

登录、凭证库相关命令在你平时的宿主 shell 里跑。隔离代理环境里失败，不证明 DevCycle MCP 不可用。启动时报 \`MCP startup interrupted\` 且点名 \`devcycle\`，多半是表写上了但没完成 OAuth：先 \`codex mcp get devcycle\`，再 \`codex mcp login devcycle\`，再 \`codex mcp list\`，然后新开会话。

不要做这些：

- 不要发明 \`codex plugin add devcycle@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\`、\`npx mcp-remote\` 或 \`/sse\`。
- 不要给远程这台 \`bearer_token_env_var\`。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "DevCycle", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "flagsmith-mcp-http"],
    sources: [
      {
        label: "DevCycle · MCP Getting Started",
        url: "https://docs.devcycle.com/cli-mcp/mcp-getting-started",
      },
      {
        label: "DevCycle · MCP Reference",
        url: "https://docs.devcycle.com/cli-mcp/mcp-reference",
      },
    ],
  },
  {
    id: "optimizely-mcp-http",
    no: 364,
    title: "Optimizely Experimentation MCP 用 exp.mcp.opal.optimizely.com/mcp",
    summary:
      "官方 Codex：Settings 加 Streamable HTTP，URL 是 https://exp.mcp.opal.optimizely.com/mcp，Bearer 和头留空。CLI 等价 mcp add optimizely --url 同一条。OAuth 走 Opal。不要抄 --transport http。不要发明 plugin add optimizely@。",
    body: `Optimizely Experimentation 给 Codex 有专节。官方主路径是远程 Streamable HTTP + OAuth，不要 API key，也不要 \`bearer_token_env_var\`。先确认有 Opti ID，并且 Opal 已打开、连着至少一个 Feature Experimentation 或 Web Experimentation 实例。

桌面 / IDE：Settings → MCP servers → Add server，传输选 Streamable HTTP，URL 填 \`https://exp.mcp.opal.optimizely.com/mcp\`。官方写明 Bearer token env var、Headers、Headers from environment variables 都留空。第一次用工具时会打开浏览器，连你的 Opal 实例并用 Optimizely 账号授权。

CLI 等价写成：

\`\`\`bash
codex mcp add optimizely --url https://exp.mcp.opal.optimizely.com/mcp
codex mcp login optimizely
\`\`\`

官方桌面不钉表名。本手册 CLI 用 \`optimizely\`。Cursor / Claude Desktop JSON 也是这个名字。Claude Code 那条是 \`claude mcp add --transport http optimizely-exp …\`，不要把 \`--transport http\` 抄到 Codex；若你已经在 Claude 用了 \`optimizely-exp\`，Codex 也可以用同一个表名，但不能写 transport 开关。\`mcp add\` 会写进用户层 \`~/.codex/config.toml\`。只写进了表、浏览器没弹时再跑 \`codex mcp login optimizely\`。

\`\`\`toml
[mcp_servers.optimizely]
url = "https://exp.mcp.opal.optimizely.com/mcp"
enabled = true
\`\`\`

URL 带 \`/mcp\` 后缀。不要发明不带 \`/mcp\` 的地址。不要抄 Claude JSON 的 \`type = "http"\`。不要抄 Cursor JSON。不要发明 \`codex plugin add optimizely@…\`。不要把 token 写进 URL、\`http_headers\`、\`args\` 或 \`env\` 表。工具名带 \`exp_\` 前缀；没出现多半是 OAuth 没完成，先重新 login，不要填 Bearer。

先只读：问列出我的 Optimizely 项目，或列出某个项目里正在跑的实验。创建开关、改实验、改 audience 会改账号，保持工具批准。Web Experimentation 的 variation 级 HTML / CSS / JavaScript 不能经 MCP 改，走 Visual Editor。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。\`codex mcp get optimizely\` 看 url。TUI \`/mcp\` 里应看到 optimizely 且 enabled。

登录、凭证库相关命令在你平时的宿主 shell 里跑。隔离代理环境里失败，不证明 Optimizely MCP 不可用。启动时报 \`MCP startup interrupted\` 且点名这台，多半是表写上了但没完成 OAuth：先 \`codex mcp get optimizely\`，再 \`codex mcp login optimizely\`，再 \`codex mcp list\`，然后新开会话。公司代理要放行 \`exp.mcp.opal.optimizely.com\`。

不要做这些：

- 不要发明 \`codex plugin add optimizely@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor JSON。
- 不要给这台 \`bearer_token_env_var\`，也不要填 Headers。
- 不要给它 \`required = true\` 挂全局。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Optimizely", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "devcycle-mcp-http"],
    sources: [
      {
        label: "Optimizely · Install Experimentation MCP",
        url: "https://support.optimizely.com/hc/en-us/articles/45321466744205-Install-Optimizely-Experimentation-MCP-server",
      },
      {
        label: "Optimizely · Experimentation MCP overview",
        url: "https://support.optimizely.com/hc/en-us/articles/45320607594893-Optimizely-Experimentation-MCP-server-overview",
      },
    ],
  },
  {
    id: "customerio-codex-plugin",
    no: 366,
    title: "Customer.io 先 Plugins 搜 Customer.io，不要手贴 mcp.customer.io/mcp",
    summary:
      "官方 Codex 是插件目录：桌面 Plugins 或 TUI /plugins 搜 Customer.io，再 OAuth。不要发明 plugin add customerio@，也不要 mcp add 手贴 https://mcp.customer.io/mcp。GitHub README 仍可能写 listing 在审核。",
    body: `Customer.io 官方给 Codex 的**推荐路径**是公共插件目录，不是 \`codex mcp add\`。官方没给出 \`plugin add customerio@\` 那种 marketplace id，不要自己编。

先让账号管理员打开 Settings → AI 里的 Customer.io MCP。然后：

1. Codex 桌面打开 Plugins，或 TUI 输入 \`/plugins\`
2. 搜 Customer.io
3. 打开 Customer.io 发布的 listing，选 Install
4. 点 Connect，用 Customer.io 账号做 OAuth
5. 选工作区和权限范围（读 / 写 / 删分开授权）
6. 回到 Codex 再发 Customer.io 请求

安装不需要 GitHub、终端、JSON 或 Customer.io API token。也不要选数据中心：美欧账号走同一套 Connect，登录后按账号路由。不要去填 \`mcp-eu.customer.io\`。

0.154 起先在**当前会话**看 \`/plugins\`；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用桌面或 CLI。API key 登录时，部分需要 OAuth 的官方插件会装不全。

GitHub 仓库 README 仍可能写 listing 在等 OpenAI 审核。Plugins 里搜不到时：不要手贴 \`https://mcp.customer.io/mcp\`，也不要发明 \`codex mcp add customerio --url …\`。官方排查指向 ChatGPT 的自定义 connector（Developer Mode），那不是 Codex CLI。

插件底层入口是 \`https://mcp.customer.io/mcp\`，文档写明**安装时不用手填**。已经用自定义 MCP 连过 Customer.io 的，先关掉那条再装插件。两边同时开会出现重复工具。

技能打进插件（\`customerio\`、\`customerio-journeys\`、\`customerio-design-studio\`、\`customerio-pipelines\`、\`customerio-sdk\`）。仓库里的 SKILL.md 只是薄路由，真正 playbook 在 MCP 的 \`cio_skills_read\`。不要手拷到 \`~/.codex/skills\`。

支持写 / 删的操作可能先给 dry-run 预览。把它当安全网，不是全局授权。改自动化、改管道、改受众会动账号，保持工具批准。不要一上来 \`--yolo\`。

不要做这些：

- 不要发明 \`plugin add customerio@openai-curated\`。
- 不要抄 Claude / Cursor 的 \`mcpServers\` JSON 或 \`--transport http\`。
- 不要把 ChatGPT 自定义 connector 的 US / EU URL 抄进 Codex。
- 不要把密钥写进 TOML、\`http_headers\` 或 URL。
- 不要给它 \`required = true\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 也走 Plugins 搜 Customer.io。改完用 \`codex plugin list\` 核对已装。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["MCP", "Customer.io", "plugins", "OAuth", "Skills"],
    related: ["plugins-vs-skills", "mcp-resend-remote", "loops-mcp-http"],
    sources: [
      {
        label: "Customer.io · plugin for ChatGPT and Codex",
        url: "https://docs.customer.io/ai/plugins/chatgpt-codex/",
      },
      {
        label: "Customer.io · Get started with MCP",
        url: "https://docs.customer.io/ai/mcp/get-started/",
      },
      {
        label: "customerio/openai-plugin",
        url: "https://github.com/customerio/openai-plugin",
      },
    ],
  },
  {
    id: "klaviyo-mcp-http",
    no: 367,
    title: "Klaviyo MCP 用 mcp.klaviyo.com/mcp，再完成 OAuth",
    summary:
      "官方页没有 Codex 专节。对照 Other Clients：mcp add klaviyo --url https://mcp.klaviyo.com/mcp。URL 带 /mcp。OAuth DCR，浏览器没弹再 mcp login klaviyo。不要发明 plugin add klaviyo@。不要抄 Cursor JSON。",
    body: `Klaviyo 官方安装页列了 Claude、ChatGPT App、ChatGPT Custom MCP、Cursor JSON、VS Code JSON 和 Other Clients，没有 Codex 专节。不要把 Cursor 的 \`mcpServers\` JSON 或 Claude 的 \`--transport http\` 抄进来。对照 Other Clients：远程 URL 是 \`https://mcp.klaviyo.com/mcp\`，鉴权是 OAuth + Dynamic Client Registration，传输是 Streamable HTTP。Codex 主路径自己 \`add\`：

\`\`\`bash
codex mcp add klaviyo --url https://mcp.klaviyo.com/mcp
codex mcp login klaviyo
\`\`\`

官方 Cursor JSON 表名就是 \`klaviyo\`，手册 CLI 也用这个。URL 带 \`/mcp\` 后缀，不要写成光 \`https://mcp.klaviyo.com\`，也不要把文档站 \`https://developers.klaviyo.com/mcp\` 当成 MCP 入口。\`mcp add\` 写进用户层 \`~/.codex/config.toml\`。只写进了表、浏览器没弹时再跑 \`codex mcp login klaviyo\`。

\`\`\`toml
[mcp_servers.klaviyo]
url = "https://mcp.klaviyo.com/mcp"
enabled = true
\`\`\`

账号角色要 Owner、Admin 或 Manager。默认会拉很多工具；窗口小或选工具不准时，把查询参数写进 url，不要另开配置键：

\`\`\`toml
[mcp_servers.klaviyo]
url = "https://mcp.klaviyo.com/mcp?read-only=true&core-tools-only=true"
enabled = true
\`\`\`

常用查询参数：

- \`read-only=true\`：关掉会改账号的工具。默认是 false，建议先只读。
- \`core-tools-only=true\`：大约 40 个核心工具。ChatGPT 默认 true，Codex 默认 false。
- \`disable-tools-with-user-generated-content=true\`：关掉会读用户生成内容的工具。
- \`include-output-schemas=false\`：工具列表里不带 output schema。ChatGPT 默认 false。
- \`beta=true\`：打开可能不稳的新工具。
- \`toolsets=profiles:read,campaigns:read\`：只暴露所需 API scope 都被覆盖的工具，格式是 \`resource:access\`。
- \`company=example-company\`：多账号时钉住公司名。Claude listed connector 和 ChatGPT App 控不了查询参数；Codex 手写 url 可以。

机构文档也用 \`https://mcp.klaviyo.com/mcp?company=example-company\`。空格要编码。每个账号一张表、各跑一次 \`mcp login\`，不要指望一台服务器同时挂所有客户。

不要发明 \`codex plugin add klaviyo@…\`。官方没给出 Codex marketplace id。不要抄 ChatGPT Developer Mode 的自定义 app。不要抄 \`npx mcp-remote\`。不要给这台 \`bearer_token_env_var\`。

本地 \`uvx klaviyo-mcp-server@latest\` 不是主路径。网页客户端本来就该走远程。本地才要 \`PRIVATE_API_KEY\`；官方示例把密钥写进 \`env\` 表，Codex 改成 \`env_vars\`，不要字面量。\`READ_ONLY\` 和 \`ALLOW_USER_GENERATED_CONTENT\` 也只转发名字。Codex 不读 \`.env\`。

先只读：问最近 30 天邮件活动表现，或哪些 flow 转化最好。改营销、改流程、发信会动账号，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add klaviyo@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor JSON。
- 不要把 \`PRIVATE_API_KEY\` 写进 \`env\` 表、\`http_headers\` 或 URL。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get klaviyo\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Klaviyo", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "loops-mcp-http", "customerio-codex-plugin"],
    sources: [
      {
        label: "Klaviyo · MCP server",
        url: "https://developers.klaviyo.com/en/docs/klaviyo_mcp_server",
      },
      {
        label: "Klaviyo · MCP Server Guide For Agencies",
        url: "https://help.klaviyo.com/hc/en-us/articles/52833598880923",
      },
    ],
  },
  {
    id: "braze-mcp-http",
    no: 368,
    title: "Braze MCP 用 mcp.braze.com/mcp，再完成 OAuth",
    summary:
      "官方已验证 OpenAI Codex。mcp add braze --url https://mcp.braze.com/mcp。URL 带 /mcp。OAuth DCR，不要 API key。欧盟用 mcp.braze.eu/mcp。不要发明 plugin add braze@。本地 beta 已弃用。",
    body: `Braze 官方已验证 OpenAI Codex。主路径是远程 Streamable HTTP + OAuth，客户端自己做 Dynamic Client Registration，不要 client ID、client secret 或 API key。安装页把 Codex 指到官方 MCP 文档，CLI 写成：

\`\`\`bash
codex mcp add braze --url https://mcp.braze.com/mcp
codex mcp login braze
\`\`\`

手册表名用 \`braze\`。远程 URL 是 \`https://mcp.braze.com/mcp\`，带 \`/mcp\` 后缀。欧盟账号用 \`https://mcp.braze.eu/mcp\`；非欧盟可以用美区或欧盟，任一入口都能打到各集群。\`mcp add\` 写进用户层 \`~/.codex/config.toml\`。只写进了表、浏览器没弹时再跑 \`codex mcp login braze\`。

桌面 / IDE：Settings → MCP servers → Add server，传输选 Streamable HTTP，URL 填上面那条。Bearer token env var 和 Headers 留空。第一次用工具时会打开浏览器，用平时的 Braze 账号登录，含 SSO / SAML。

\`\`\`toml
[mcp_servers.braze]
url = "https://mcp.braze.com/mcp"
enabled = true
\`\`\`

公司管理员先在 Settings → Admin Settings → OAuth 打开 MCP OAuth。用户还要有 Use MCP Server 权限，默认没有。权限跟着仪表盘账号走：你在仪表盘看不到的，代理也看不到。开了 IP allowlisting 的账号现在用不了远程 MCP。

多 workspace 时在提示里写出仪表盘上的准确名字。不确定就先问可用 workspace，走 \`get_workspaces\`。公司是第一次授权时定的；要换同一集群的另一家公司，先在客户端断开 Braze 再重新 login。

本地 beta（本机装包 + API key）已经弃用，不要当主路径。远程和本地可以短暂并存，迁完关掉本地。不要发明 \`codex plugin add braze@…\`。不要抄 Claude 的 \`--transport http\`、Cursor JSON 或 ChatGPT Developer Mode 自定义 connector。不要给这台 \`bearer_token_env_var\`。工具不返回用户档案 PII。

先只读：问列出这个 workspace 可用的 Braze 工具，或列出 Production workspace 最近的 Canvas。创建邮件模板、改 Canvas、发信会动账号，保持工具批准。官方也不要用客户端的 auto-mode。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add braze@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor JSON。
- 不要把 API key 写进 \`env\` 表、\`http_headers\` 或 URL。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get braze\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Braze", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "klaviyo-mcp-http", "customerio-codex-plugin"],
    sources: [
      {
        label: "Braze · Set up the MCP server",
        url: "https://www.braze.com/docs/user_guide/brazeai/mcp_server/setup",
      },
      {
        label: "Braze · About the MCP server",
        url: "https://www.braze.com/docs/user_guide/brazeai/mcp_server",
      },
    ],
  },
  {
    id: "onesignal-codex-plugin",
    no: 369,
    title: "OneSignal 先 Plugins 搜 OneSignal，不要手贴 api.onesignal.com/mcp/oauth",
    summary:
      "官方 Codex 是插件目录：桌面 Plugins 或 TUI /plugins 搜 OneSignal，再 OAuth。底层是 https://api.onesignal.com/mcp/oauth，安装时不用手填。不要发明 plugin add onesignal@，也不要 mcp add 手贴 URL。不要 REST API key。",
    body: `OneSignal 官方给 Codex 的推荐路径是 OpenAI / ChatGPT 插件目录，不是 \`codex mcp add\`。官方没给出 \`plugin add onesignal@\` 那种 marketplace id，不要自己编。

桌面打开 Plugins，或 TUI 输入 \`/plugins\`，搜 OneSignal，装官方 listing，再完成 OAuth。CLI 和 IDE 扩展走同一份 OpenAI 插件目录；IDE 扩展没有 \`/plugins\` 斜杠命令时，用扩展自己的 Plugins 面板。ChatGPT 里用 \`@OneSignal\` 点名插件，那是 ChatGPT，不要抄进 Codex CLI。

插件底层入口是 \`https://api.onesignal.com/mcp/oauth\`，文档写明 marketplace 安装时不用手填。已经用自定义 MCP 连过 OneSignal 的，先关掉那条再装插件。两边同时开会出现重复工具。

不要做这些：

- 不要发明 \`codex plugin add onesignal@openai-curated\`。
- 不要 \`codex mcp add onesignal --url …\` 当 CLI 主路径。那是没有 listing 的其他客户端。
- 不要抄 Claude Code 的 \`--transport http\`、Cursor JSON 或 ChatGPT Developer Mode。
- 不要抄第三方目录里的 App ID、REST API key 或 Smithery 表。官方连接全走 OAuth，配置里没有密钥可填。
- 不要给它 \`required = true\`。

先只读：问 \`onesignal_health\`，或列出这个账号能管的 app（\`list_apps\`）。开 beta 时部分 app 可能要先开通，健康检查以外的工具才会出来。\`send_message\` 是高影响操作，客户端应再确认一次；保持工具批准。不要一上来 \`--yolo\`。

一次授权能覆盖账号有权限的多个 app，不必每台 app 配一张表。不确定 app ID 就先 \`list_apps\`。撤销走 OneSignal 账号里的 Connected apps，只撤当前客户端，不影响同事。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 也走 Plugins 搜 OneSignal。改完彻底新开会话，再用 \`codex plugin list\` 核对已装。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "OneSignal", "plugins", "OAuth"],
    related: ["customerio-codex-plugin", "plugins-vs-skills", "braze-mcp-http"],
    sources: [
      {
        label: "OneSignal · MCP Server",
        url: "https://documentation.onesignal.com/docs/en/model-context-protocol",
      },
      {
        label: "OneSignal · AI data practices",
        url: "https://documentation.onesignal.com/docs/en/ai-data-practices",
      },
    ],
  },
  {
    id: "beehiiv-mcp-http",
    no: 370,
    title: "beehiiv MCP 用 mcp.beehiiv.com/mcp，再完成 OAuth",
    summary:
      "官方安装页点名 Codex。mcp add beehiiv --url https://mcp.beehiiv.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login beehiiv。不要发明 plugin add beehiiv@。免费档只读，发布仍回仪表盘。",
    body: `beehiiv 官方帮助页把 Codex 和 Claude、Cursor 并列。仪表盘路径是 Settings → MCP，选 Codex，跟屏幕向导授权。帮助页没贴 \`codex mcp add\` 原文，但远程入口就是 \`https://mcp.beehiiv.com/mcp\`，带 \`/mcp\` 后缀，不要尾斜杠。CLI 写成：

\`\`\`bash
codex mcp add beehiiv --url https://mcp.beehiiv.com/mcp
codex mcp login beehiiv
\`\`\`

手册表名用 \`beehiiv\`。\`mcp add\` 写进用户层 \`~/.codex/config.toml\`。只写进了表、浏览器没弹时再跑 \`codex mcp login beehiiv\`。

桌面 / IDE：Settings → MCP servers → Add server，传输选 Streamable HTTP，URL 填上面那条。Bearer token env var 和 Headers 留空。第一次用工具时会打开浏览器，用平时的 beehiiv 账号登录。

\`\`\`toml
[mcp_servers.beehiiv]
url = "https://mcp.beehiiv.com/mcp"
enabled = true
\`\`\`

多 workspace 时官方让每台连接用不同查询参数区分，例如 \`https://mcp.beehiiv.com/mcp?account=1\` 和 \`https://mcp.beehiiv.com/mcp?account=2\`。Codex 也要换表名，例如 \`beehiiv-2\`，各跑一次 \`mcp login\`。参数值可以自定，只要每台不一样。权限跟着当时登录的 workspace 角色走。

不要发明 \`codex plugin add beehiiv@…\`。官方没给出 Codex marketplace id。不要抄 Claude 的 \`--transport http\`、Cursor JSON 或 ChatGPT Developer Mode。不要给这台 \`bearer_token_env_var\`。不要把 API key 写进 URL、\`http_headers\` 或 \`env\` 表。不要把第三方 \`beehiiv-cli\` 的本机插件当官方路径。营销页 \`features/mcp/getting-started\` 经常打不开，以帮助中心为准。

全员都能连；免费档只能读。创建草稿、改分段、改自动化要付费计划。MCP 能起草件，不能发布或排期；自动化能配，不能在 MCP 里点启用。Stripe 账单读不到。新工具不出现时，在客户端断开再连一次。

先只读：问最近几期打开率，或这个 workspace 有哪些 beehiiv 工具。改稿、改分段、改受众会动账号，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add beehiiv@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor JSON。
- 不要把 API key 写进 \`env\` 表、\`http_headers\` 或 URL。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get beehiiv\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "beehiiv", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "loops-mcp-http", "klaviyo-mcp-http"],
    sources: [
      {
        label: "beehiiv · Getting started with the MCP",
        url: "https://www.beehiiv.com/support/article/39255979546263-getting-started-with-the-beehiiv-mcp",
      },
      {
        label: "beehiiv · What you can do with the MCP",
        url: "https://www.beehiiv.com/support/article/41262491804439-what-you-can-do-with-the-beehiiv-mcp",
      },
    ],
  },
  {
    id: "mailerlite-mcp-http",
    no: 371,
    title: "MailerLite MCP 用 mcp.mailerlite.com/mcp，再完成 OAuth",
    summary:
      "官方写任意 MCP 客户端。mcp add mailerlite --url https://mcp.mailerlite.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login mailerlite。不要发明 plugin add mailerlite@。不要抄 Claude --transport http。",
    body: `MailerLite 官方安装页列了 Claude、Claude Code、Cursor、VS Code、Gemini CLI 和 ChatGPT Developer Mode，没有 Codex 专节。页上写任意 MCP 兼容客户端都能连。远程入口是 \`https://mcp.mailerlite.com/mcp\`，带 \`/mcp\` 后缀，不要尾斜杠。鉴权是 OAuth，不要 API key。CLI 写成：

\`\`\`bash
codex mcp add mailerlite --url https://mcp.mailerlite.com/mcp
codex mcp login mailerlite
\`\`\`

官方 Claude Code 表名就是 \`mailerlite\`，手册 CLI 也用这个。\`mcp add\` 写进用户层 \`~/.codex/config.toml\`。只写进了表、浏览器没弹时再跑 \`codex mcp login mailerlite\`。

桌面 / IDE：Settings → MCP servers → Add server，传输选 Streamable HTTP，URL 填上面那条。Bearer token env var 和 Headers 留空。第一次用工具时会打开浏览器，用平时的 MailerLite 账号登录。

\`\`\`toml
[mcp_servers.mailerlite]
url = "https://mcp.mailerlite.com/mcp"
enabled = true
\`\`\`

不要发明 \`codex plugin add mailerlite@…\`。官方没给出 Codex marketplace id。不要抄 Claude 的 \`--transport http\`。不要抄 Gemini 的 \`httpUrl\` JSON。不要抄 Cursor 一键 deeplink 或 VS Code 一键安装。不要抄 ChatGPT Developer Mode 自定义 connector。不要给这台 \`bearer_token_env_var\`。不要把 API key 写进 URL、\`http_headers\` 或 \`env\` 表。MailerLite CLI 是另一条路，不是这台 MCP。营销页会写「你的专属 MCP URL」，开发者文档给的就是上面这条公共地址。

先只读：问 \`get_auth_status\`，或最近几封活动的打开率。示例页标了 \`[ACTION]\` 的提示会改账号，包括起草件、排期、导入订阅者。\`schedule_campaign\` 会真的排发送。保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add mailerlite@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor deeplink。
- 不要把 API key 写进 \`env\` 表、\`http_headers\` 或 URL。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get mailerlite\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "MailerLite", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "loops-mcp-http", "beehiiv-mcp-http"],
    sources: [
      {
        label: "MailerLite · MCP Server",
        url: "https://developers.mailerlite.com/mcp",
      },
      {
        label: "MailerLite · MCP examples",
        url: "https://developers.mailerlite.com/mcp/examples",
      },
    ],
  },
  {
    id: "buildkite-mcp-http",
    no: 372,
    title: "Buildkite MCP 用 mcp.buildkite.com/mcp，再完成 OAuth",
    summary:
      "官方配置页没有 Codex 专节。对照 VS Code 的 url 和 Goose 的 streamable_http：mcp add buildkite --url https://mcp.buildkite.com/mcp，再 mcp login buildkite。URL 带 /mcp。OAuth，不要 API token。不要发明 plugin add buildkite@。",
    body: `Buildkite 官方 MCP 总览把远程 OAuth 入口写在 \`https://mcp.buildkite.com/mcp\`，带 \`/mcp\` 后缀，不要尾斜杠。配置页列了 Amp、Claude Code、Claude Desktop、Cursor、Goose、VS Code、Windsurf，没有 Codex 专节。Codex 对照原生 HTTP 客户端：VS Code 写 \`url\`，Goose 写 \`type: streamable_http\` 和 \`uri\`。CLI 写成：

\`\`\`bash
codex mcp add buildkite --url https://mcp.buildkite.com/mcp
codex mcp login buildkite
\`\`\`

手册表名用 \`buildkite\`，跟 Claude / VS Code / Goose 一致。\`mcp add\` 写进用户层 \`~/.codex/config.toml\`。只写进了表、浏览器没弹时再跑 \`codex mcp login buildkite\`。同意页会让你选组织；组织开了 SSO 时先 Log in with SSO，再 Authorize。OAuth access token 大约 12 小时，refresh 大约 7 天。

桌面 / IDE：Settings → MCP servers → Add server，传输选 Streamable HTTP，URL 填上面那条。Bearer token env var 和 Headers 留空。第一次用工具时会打开浏览器，用平时的 Buildkite 账号登录。

\`\`\`toml
[mcp_servers.buildkite]
url = "https://mcp.buildkite.com/mcp"
enabled = true
\`\`\`

默认 OAuth 带读写 scope。只要读流水线、构建、测试时，换只读入口，并换表名：

\`\`\`bash
codex mcp add buildkite-readonly --url https://mcp.buildkite.com/mcp/readonly
codex mcp login buildkite-readonly
\`\`\`

只要 pipelines 这一组工具时，走 URL 路径，不要把 \`X-Buildkite-Toolsets\` 当 Codex 主路径：

\`\`\`bash
codex mcp add buildkite-pipelines --url https://mcp.buildkite.com/mcp/x/pipelines
codex mcp login buildkite-pipelines
\`\`\`

只读加单组可以写成 \`https://mcp.buildkite.com/mcp/x/pipelines/readonly\`。OAuth 同意页要预选组织时，加查询参数，例如 \`https://mcp.buildkite.com/mcp?organization=acme\`。这是提示，不是访问控制；没权限的组织不会被锁死，你仍可改选。有组织 UUID 时官方也接受 \`organization_uuid\`。参数同样能叠在只读或 toolset URL 上。

不要发明 \`codex plugin add buildkite@…\`。官方没给出 Codex marketplace id。Cursor Marketplace 插件和 Cursor 一键 deeplink 是 Cursor 的路，不要抄进 Codex。不要抄 Amp 的 \`npx mcp-remote\`。不要抄 Claude 的 \`--transport http\`。不要抄 Claude Desktop Connectors、Windsurf JSON 或 ChatGPT Developer Mode。不要给这台 \`bearer_token_env_var\`。不要把 API token 写进 URL、\`http_headers\` 或 \`env\` 表。

不要把 \`https://mcp.buildkite.com/direct\` 当交互主路径。那是无头 agent 用的 token 透传：\`Authorization: Bearer …\`，不能走 OAuth。交互式 Codex 用 \`/mcp\`。本地 Docker / 二进制加 PAT 给流水线里的固定版本 agent 用，不是个人会话的主路径；本地请求还算组织 REST 配额。远程 MCP 有独立配额，跟组织 REST 限流分开。

组织开了 API IP allowlist 时，要把 Buildkite egress IP 加进名单，否则远程 MCP 从 Buildkite 基础设施回打 REST 会被挡。IP 以官方 meta API 为准，不要把过期列表写进 \`config.toml\`。

这台能看流水线、构建、job、Test Engine。Promise job 可能还在 running，但构建已进入 failing：先当失败信号排查，再核对最终日志和测试。写构建、改流水线是高影响操作，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

先只读：问当前用户能看到哪些流水线，或最近一次失败构建。不确定组织 slug 就先让它列组织，不要把 \`acme\` 抄进生产提示。

不要做这些：

- 不要发明 \`codex plugin add buildkite@openai-curated\`。
- 不要抄 Amp 的 \`mcp-remote\`、Claude 的 \`--transport http\` 或 Cursor Marketplace。
- 不要把 API token 写进 \`env\` 表、\`http_headers\` 或 \`/direct\` 当交互主路径。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get buildkite\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Buildkite", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "workos-mcp-http"],
    sources: [
      {
        label: "Buildkite · MCP server overview",
        url: "https://buildkite.com/docs/apis/mcp-server",
      },
      {
        label: "Buildkite · Configuring AI tools with the remote MCP server",
        url: "https://buildkite.com/docs/apis/mcp-server/remote/configuring-ai-tools",
      },
    ],
  },
  {
    id: "pulumi-mcp-http",
    no: 373,
    title: "Pulumi MCP 用 mcp.ai.pulumi.com/mcp，再完成 OAuth",
    summary:
      "官方 MCP 页没有 Codex 专节。对照 Cursor 的 url：mcp add pulumi --url https://mcp.ai.pulumi.com/mcp，再 mcp login pulumi。URL 带 /mcp。OAuth，浏览器里贴 Access Token。不要发明 plugin add pulumi@。不要抄 mcp-remote 或 bearer_token_env_var。",
    body: `Pulumi 官方 MCP 页把远程入口写在 \`https://mcp.ai.pulumi.com/mcp\`，带 \`/mcp\` 后缀，不要尾斜杠。页上列了 Cursor、Claude Code、Windsurf、Claude Desktop，以及任意支持 MCP + OAuth 的助手，没有 Codex 专节。鉴权是 OAuth：第一次连会打开浏览器，在网页里贴 Pulumi Access Token 并选组织。Token 校验在 Pulumi Cloud 侧，不要写进 \`config.toml\`。CLI 写成：

\`\`\`bash
codex mcp add pulumi --url https://mcp.ai.pulumi.com/mcp
codex mcp login pulumi
\`\`\`

手册表名用 \`pulumi\`，跟 Claude / Cursor 一致。\`mcp add\` 写进用户层 \`~/.codex/config.toml\`。只写进了表、浏览器没弹时再跑 \`codex mcp login pulumi\`。

桌面 / IDE：Settings → MCP servers → Add server，传输选 Streamable HTTP，URL 填上面那条。Bearer token env var 和 Headers 留空。第一次用工具时会打开浏览器。

\`\`\`toml
[mcp_servers.pulumi]
url = "https://mcp.ai.pulumi.com/mcp"
enabled = true
\`\`\`

不要发明 \`codex plugin add pulumi@…\`。官方没给出这台 MCP 的 Codex marketplace id。技能是另一条官方 Codex 路，见相关技巧，不要跟这台 MCP 配成一张表。不要抄 Claude 的 \`--transport http\`。不要抄 Cursor JSON、Windsurf \`serverUrl\` 或 ChatGPT Developer Mode。不要抄 Claude Desktop / Kiro 的 \`npx mcp-remote\`。不要给这台 \`bearer_token_env_var = "PULUMI_ACCESS_TOKEN"\`；那是第三方 Codex 文把无头 PAT 抄成主路径。交互主路径是 OAuth，Access Token 只出现在浏览器同意页。

本地 \`@pulumi/mcp-server\`（或 Docker 镜像 \`mcp/pulumi\`）给本机 CLI / CI 用，要本机装 Pulumi CLI，请求算你这边的配额。个人会话走远程 URL。本地才有 \`pulumi-cli-preview\` / \`pulumi-cli-up\` 这类 CLI 工具；远程才有 \`get-policy-violations\`、\`get-users\`。品牌站是另一台无鉴权 MCP，见相关技巧，不要跟这台 Cloud 远程混。

这台能列 stack、按 Lucene 搜资源、查 Registry、看策略违规、把活交给 Pulumi Neo。\`neo-task-launcher\` 会在 Pulumi Cloud 里开自动化任务，可能改代码、开 PR。保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

先只读：问这个组织有哪些 stack，或 \`get-stacks\`。搜资源用 Lucene，例如 \`type:aws:s3/bucket:Bucket\`。不确定组织就先看同意页选中的那个，不要把生产组织名抄进提示。

不要做这些：

- 不要发明 \`codex plugin add pulumi@openai-curated\`。
- 不要抄 \`mcp-remote\`、Claude 的 \`--transport http\` 或 Cursor JSON。
- 不要把 Access Token 写进 \`env\` 表、\`http_headers\`、URL，或给交互会话加 \`bearer_token_env_var\`。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get pulumi\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Pulumi", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "pulumi-agent-skills", "pulumi-brand-http"],
    sources: [
      {
        label: "Pulumi · MCP Server",
        url: "https://www.pulumi.com/docs/ai/mcp-server/",
      },
      {
        label: "Pulumi · Announcing Pulumi Remote MCP Server",
        url: "https://www.pulumi.com/blog/remote-mcp-server/",
      },
    ],
  },
  {
    id: "pulumi-agent-skills",
    no: 374,
    title: "Pulumi Skills 官方 Codex 走 marketplace，不要发明 plugin add",
    summary:
      "官方 Codex：plugin marketplace add pulumi/agent-skills，再 /plugins 装 pulumi。不要把 Claude 的 pulumi@pulumi-agent-skills 抄成 plugin add。不要并装 pulumi-migration。不要抄 npx skills add --agent junie 当 --agent codex。",
    body: `Pulumi Agent Skills 给 Codex 有专节，写在官方技能页和仓库 README。官方 Codex 主路径是加 marketplace，再在 TUI 里装插件。命令是 \`codex plugin marketplace add pulumi/agent-skills\`：

\`\`\`bash
codex plugin marketplace add pulumi/agent-skills
\`\`\`

加完重启 Codex（0.154 起也可先看当前会话），打开 \`/plugins\`，选 **Pulumi Agent Skills**，再装 \`pulumi\`。官方**没有**写出 \`codex plugin add\` 带 @ 的 id。不要把 Claude \`settings.json\` 里的 \`pulumi@pulumi-agent-skills\` 抄进 Codex。\`pulumi\` 已经包含 migration 和 delegation，不要再并装 \`pulumi-migration\` 或 \`pulumi-delegation\`。只要迁移或 Neo 交接时，才单独装那两个。维护 provider 仓才再加 \`pulumi-package-maintenance\`，它可以和前面任意一组一起装。

这是**技能捆**，不登记 \`mcp_servers.pulumi\`。查 stack、搜资源、把活交给 Neo 工具，仍走远程 MCP 那条。不要把两台配成一张表。

不要抄 Claude 的 \`/plugin marketplace add pulumi/agent-skills\` 或 \`/plugin install pulumi\`。不要抄 \`extraKnownMarketplaces\` JSON；那是 Claude 的 \`settings.json\`，marketplace 键必须是 \`pulumi-agent-skills\`，抄错名字插件会解析失败，也不是 Codex 命令。不要把 \`npx skills add pulumi/agent-skills/pulumi --skill '*'\` 当成 Codex 专节：通用安装器兼容 Codex，但**没有**钉 \`--agent codex\`。不要把示例里的 \`--agent junie\` 改成 \`--agent codex\`。不要把手拷进 \`~/.codex/skills\` 或 \`.agents/skills/\` 根目录。

装上后用自然语言即可：迁 Terraform、写 ComponentResource、配 ESC、把进行中的活交给 Neo。Codex 里也可以用技能斜杠命令，例如 \`/pulumi-terraform-to-pulumi\`。\`pulumi up\` / Neo 交接会动真基础设施，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

升级用 \`codex plugin marketplace upgrade\`，名字以 \`codex plugin marketplace list\` 为准。卸载在 \`/plugins\` 关掉。IDE 扩展没有 \`/plugins\`，用 CLI 加 marketplace，再到 TUI 或桌面去装。网页 Cloud 不读你这台 \`CODEX_HOME\` 插件缓存。当前会话没有技能，再新开。

不要做这些：

- 不要把 Claude 的 \`pulumi@pulumi-agent-skills\` 当成 Codex \`plugin add\` id。
- 不要把 \`npx skills add … --agent junie\` 抄成 \`--agent codex\`。
- 不要和远程 MCP 那张 \`mcp_servers.pulumi\` 搞成一台。
- 不要给它 \`required = true\` 挂全局。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Pulumi", "Skills", "marketplace"],
    related: ["pulumi-mcp-http", "plugins-vs-skills", "clerk-skills-plugin"],
    sources: [
      {
        label: "Pulumi · Agent Skills",
        url: "https://www.pulumi.com/docs/ai/skills/",
      },
      {
        label: "pulumi/agent-skills",
        url: "https://github.com/pulumi/agent-skills",
      },
    ],
  },
  {
    id: "pulumi-brand-http",
    no: 375,
    title: "Pulumi 品牌 MCP 用 brand.pulumi.com/mcp，无鉴权不要 login",
    summary:
      "官方 Codex 节：mcp add pulumi-brand --url https://brand.pulumi.com/mcp。远程带 /mcp。无鉴权，不要 mcp login。不要抄 Claude 的 --transport http 或 mcp-remote。不要和 Cloud 远程 MCP 搞成一台。",
    body: `Pulumi 品牌指南 MCP 给 Codex 有专节，写在品牌站的 MCP 页。官方 Codex 是手写 \`config.toml\`，表名 \`pulumi-brand\`，URL 是 \`https://brand.pulumi.com/mcp\`，带 \`/mcp\` 后缀，不要尾斜杠。CLI 等价：

\`\`\`bash
codex mcp add pulumi-brand --url https://brand.pulumi.com/mcp
\`\`\`

\`\`\`toml
[mcp_servers.pulumi-brand]
url = "https://brand.pulumi.com/mcp"
enabled = true
\`\`\`

用户层表名官方就是带连字符的 \`pulumi-brand\`（这不是插件 \`mcp.json\`，#33063 那套连字符问题不套这里）。\`mcp add\` 写进用户层 \`~/.codex/config.toml\`；官方也允许项目级 \`./.codex/config.toml\`（要先信任该仓库）。无鉴权、无 API key，**不要** \`codex mcp login pulumi-brand\`。不要 Bearer，不要 \`http_headers\`。

桌面 / IDE：Settings → MCP servers → Add server，传输选 Streamable HTTP，URL 填上面那条。Bearer token env var 和 Headers 留空。

这台只暴露品牌规范：查色板、字体、文案语气、术语、logo 变体、资源清单。它**不会**列 stack、跑 \`pulumi up\` 或把活交给 Neo。那些走 Cloud 远程 MCP（表名 \`pulumi\`），要 OAuth。技能捆走 marketplace，也不登记这张表。三台不要配成一张。

先只读：问 logo 的最小留白，或让它 \`search_guidelines\`。取色用 \`get_color_palette\` / \`find_nearest_brand_color\`。\`get_logo\` 返回 CDN URL，不是改基础设施。连上前先看品牌站的 Generative AI Guidelines。

不要做这些：

- 不要抄 Claude 的 \`--transport http\`、\`--scope user\` 或 \`mcpServers\` JSON。
- 不要抄 Claude Desktop 的 \`npx mcp-remote\`。Codex 自己会连 Streamable HTTP。
- 不要发明 \`codex plugin add\` 带 @ 的 id。官方没给出这台的 Codex marketplace id。
- 不要给它 \`required = true\` 挂全局。
- 不要一上来 \`--yolo\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get pulumi-brand\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示这台，不要 Auth: OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Pulumi", "HTTP", "品牌"],
    related: ["pulumi-mcp-http", "pulumi-agent-skills", "mcp-http-not-sse"],
    sources: [
      {
        label: "Pulumi · Brand MCP server",
        url: "https://brand.pulumi.com/mcp-server/",
      },
      {
        label: "Pulumi · Brand guidelines",
        url: "https://brand.pulumi.com/",
      },
    ],
  },
  {
    id: "auth0-docs-mcp",
    no: 376,
    title: "Auth0 文档 MCP 用 auth0.com/docs/mcp，无鉴权不要 login",
    summary:
      "官方 Codex：mcp add auth0-docs-mcp-server --url https://auth0.com/docs/mcp。无鉴权，不要 mcp login。不要抄 Claude 的 --transport http。不要和管理租户的 @auth0/auth0-mcp-server 搞成一台。",
    body: `Auth0 文档 MCP 给 Codex 有专节，写在官方 AI Doc Tools 页。官方 Codex 命令是 \`codex mcp add auth0-docs-mcp-server --url https://auth0.com/docs/mcp\`：

\`\`\`bash
codex mcp add auth0-docs-mcp-server --url https://auth0.com/docs/mcp
codex mcp list
\`\`\`

\`\`\`toml
[mcp_servers.auth0-docs-mcp-server]
url = "https://auth0.com/docs/mcp"
enabled = true
\`\`\`

用户层表名官方就是带连字符的 \`auth0-docs-mcp-server\`（这不是插件 \`mcp.json\`，#33063 那套连字符问题不套这里）。URL 是 \`https://auth0.com/docs/mcp\`，没有再加一层 \`/mcp\`，也不要尾斜杠。传输是 Streamable HTTP。无鉴权、无 API key，**不要** \`codex mcp login auth0-docs-mcp-server\`。不要 Bearer，不要 \`http_headers\`。

桌面 / IDE：Settings → MCP servers → Add server，传输选 Streamable HTTP，URL 填上面那条。Bearer token env var 和 Headers 留空。

这台只暴露 \`SearchAuth0Docs\`：按自然语言搜 Auth0 知识库，带回文档链接。它**不会**改租户、建应用或部署 Action。管理租户是另一台本地 stdio：\`@auth0/auth0-mcp-server\`，表名 \`auth0\`，先 \`npx @auth0/auth0-mcp-server init\`。不要和文档 MCP 搞成一张表。不要把仓库 Codex 示例里写死的 \`DBUS_SESSION_BUS_ADDRESS\` 路径抄成通用配置。

先只读：问 refresh token rotation 怎么配，或让它搜 Federated Logout。模型给的链接仍要人核对。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http auth0-docs-mcp-server …\`。Codex 远程用 \`--url\`。
- 不要抄 Cursor JSON 或 Windsurf 的 \`serverUrl\`。
- 不要发明 \`codex plugin add\` 带 @ 的 id。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get auth0-docs-mcp-server\` 看传输是 streamable_http。会话里点名服务器 \`auth0-docs-mcp-server\` 即可，不要把工具名写成双下划线那种内部拼接。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Auth0", "文档", "HTTP"],
    related: ["auth0-mcp-stdio", "mcp-openai-docs", "mcp-http-not-sse"],
    sources: [
      {
        label: "Auth0 · AI Doc Tools",
        url: "https://auth0.com/docs/get-started/build-with-ai-tools",
      },
      {
        label: "Auth0 · Model Context Protocol (MCP) Server",
        url: "https://auth0.com/docs/get-started/mcp",
      },
    ],
  },
  {
    id: "auth0-mcp-stdio",
    no: 377,
    title: "Auth0 管理租户 MCP 用 mcp add auth0，先 init 不要 login",
    summary:
      "官方 Codex：先 npx @auth0/auth0-mcp-server init，再 mcp add auth0 -- npx -y @auth0/auth0-mcp-server run。这是 stdio，不要 mcp login。不要抄 Linux 写死的 DBUS 路径。不要和文档 HTTP 那台搞成一张表。",
    body: `Auth0 管理租户 MCP 给 Codex 有专节，写在官方仓库 README，不在产品 MCP 页。先做设备授权（会开浏览器选租户），再登记本地 stdio。官方命令是 \`codex mcp add auth0 -- npx -y @auth0/auth0-mcp-server run\`：

\`\`\`bash
npx @auth0/auth0-mcp-server init --read-only
codex mcp add auth0 --env DEBUG=auth0-mcp -- npx -y @auth0/auth0-mcp-server run
codex mcp list
\`\`\`

\`\`\`toml
[mcp_servers.auth0]
command = "npx"
args = ["-y", "@auth0/auth0-mcp-server", "run"]
startup_timeout_sec = 60
enabled = true

[mcp_servers.auth0.env]
DEBUG = "auth0-mcp"
\`\`\`

用户层表名官方就是 \`auth0\`。这是 **stdio**，凭证进系统密钥环，**不要** \`codex mcp login auth0\`。不要 URL，不要 Bearer，不要 \`http_headers\`。冷 \`npx -y\` 把 \`startup_timeout_sec\` 提到 60。\`DEBUG=auth0-mcp\` 只是调试日志，不是 API 密钥。

官方 Codex 示例还写了 \`--env DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus\`。那是某台 Linux 的会话总线，**不要**当通用配置抄。macOS / Windows 不要加。Linux 密钥环读不到时，用 \`env_vars = ["DBUS_SESSION_BUS_ADDRESS"]\` 转发**启动 Codex 那个进程**里已有的值。

产品 MCP 页只列 Claude Desktop / Cursor / Windsurf。不要抄 \`init --client cursor\`、Claude JSON 或 Windsurf。不要发明 \`codex plugin add\` 带 @ 的 id。文档检索是另一台 HTTP：表名 \`auth0-docs-mcp-server\`，见相关技巧，不要和这张 \`auth0\` 搞成一台。

这台会改租户：建应用、部署 Action、写 \`.env\`（\`auth0_onboarding\`）。先 \`init --read-only\`，或给 \`run\` 加 \`--tools\` 只放 \`auth0_list_*\` / \`auth0_get_*\`。软件仍标 beta。保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

私有云没有设备授权，\`init\` 另有 \`--auth0-domain\`、\`--auth0-client-id\`、\`--auth0-client-secret\`。不要把 client secret 写进 \`config.toml\` 或 \`args\`。换租户或过期再 \`init\`。用完 \`npx @auth0/auth0-mcp-server logout\`。

不要做这些：

- 不要抄 Claude 的 \`init --client claude-code\` 或 \`mcpServers\` JSON。
- 不要把官方示例里的 \`/run/user/1000/bus\` 抄到每台机器。
- 不要发明 \`codex plugin add\` 带 @ 的 id。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get auth0\` 看 command 是 \`npx\`。会话里点名服务器 \`auth0\` 即可，不要把工具名写成双下划线那种内部拼接。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Auth0", "stdio", "租户"],
    related: ["auth0-docs-mcp", "mcp-stdio-env-vars", "mcp-startup-timeout-sec"],
    sources: [
      {
        label: "auth0/auth0-mcp-server",
        url: "https://github.com/auth0/auth0-mcp-server",
      },
      {
        label: "Auth0 · Model Context Protocol (MCP) Server",
        url: "https://auth0.com/docs/get-started/mcp",
      },
    ],
  },
  {
    id: "netdata-cloud-http",
    no: 378,
    title: "Netdata Cloud MCP 用 app.netdata.cloud/api/v1/mcp，不要 login",
    summary:
      "官方 Codex Cloud 节：mcp add netdata-cloud --url https://app.netdata.cloud/api/v1/mcp，再 bearer_token_env_var 读 NETDATA_CLOUD_API_TOKEN。不要 mcp login。不要抄 experimental_use_rmcp_client 或 mcp-remote。",
    body: `Netdata 给 Codex 有专节。Cloud 主路径是远程 Streamable HTTP，官方 TOML 表名 \`netdata-cloud\`，URL 是 \`https://app.netdata.cloud/api/v1/mcp\`。CLI 等价：

\`\`\`bash
export NETDATA_CLOUD_API_TOKEN
codex mcp add netdata-cloud --url https://app.netdata.cloud/api/v1/mcp --bearer-token-env-var NETDATA_CLOUD_API_TOKEN
codex mcp list
\`\`\`

\`\`\`toml
[mcp_servers.netdata-cloud]
url = "https://app.netdata.cloud/api/v1/mcp"
bearer_token_env_var = "NETDATA_CLOUD_API_TOKEN"
startup_timeout_sec = 20
tool_timeout_sec = 120
enabled = true
\`\`\`

URL 已经停在 \`/api/v1/mcp\`，不要再加一层 \`/mcp\`，也不要尾斜杠。要付费档 Cloud、节点已 claimed，token 勾 \`scope:mcp\`（User Settings → API Tokens）。这是 Bearer，**不要** \`codex mcp login netdata-cloud\`。不要把 token 写进 \`http_headers\`、\`args\` 或 URL。Codex 不读 \`.env\`；变量必须在**启动 Codex 的那个进程**里。Dock 打开的桌面没有 zshrc。

同一页后半还在写 \`experimental_use_rmcp_client = true\`、\`bearer_token\` 占位，以及 \`codex mcp add netdata -- npx mcp-remote@latest … --header "Authorization: Bearer …"\`。那些是过期本地桥，**不要抄**。Codex 原生就会连 Streamable HTTP。SSE / WebSocket / \`nd-mcp\` 不是这台 Cloud 的路径。不要发明 \`codex plugin add\` 带 @ 的 id。

本机 Agent / Parent（常见端口 19999）是另一张表，不要和 \`netdata-cloud\` 合成一台。官方本地 HTTP 示例不要当 Cloud 配置。

先只读：问各节点 CPU，或最近一小时有没有异常。保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要抄 Claude 的 \`--transport http\` 加 \`--header "Authorization: Bearer …"\`。
- 不要抄 Cursor JSON，也不要把 token 写进 \`http_headers\`。
- 不要抄 \`npx mcp-remote\` 或 \`experimental_use_rmcp_client\`。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get netdata-cloud\` 看传输是 streamable_http。会话里点名服务器 \`netdata-cloud\` 即可，不要把工具名写成双下划线那种内部拼接。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Netdata", "HTTP", "Bearer"],
    related: ["mcp-http-bearer-env", "mcp-http-not-sse", "mcp-newrelic-remote"],
    sources: [
      {
        label: "Learn Netdata · OpenAI Codex CLI",
        url: "https://learn.netdata.cloud/docs/netdata-ai/mcp/supported-ai-clients/openai-codex-cli",
      },
      {
        label: "Learn Netdata · Netdata MCP",
        url: "https://learn.netdata.cloud/docs/netdata-ai/mcp",
      },
    ],
  },
  {
    id: "nvidia-skills-codex",
    no: 379,
    title: "NVIDIA 技能钉 --agent codex，不要抄默认 npx skills add",
    summary:
      "官方 Codex：npx skills add nvidia/skills --skill cuopt-numerical-optimization-api --agent codex。不要省略 --agent codex。不要发明 plugin add nvidia@。目录先 --list。",
    body: `NVIDIA 给 Codex 有专节，写在仓库 README 和高级安装页。这是 Agent Skills，不是 Codex \`/plugins\`，也不是远程 MCP。只要 Codex 时钉死 agent，避免改到 Claude / Cursor：

\`\`\`bash
npx skills add nvidia/skills --skill cuopt-numerical-optimization-api --agent codex
\`\`\`

\`--agent codex\` **不要省略**。裸跑 \`npx skills add nvidia/skills\` 会弹出目录并按默认 agent 落盘（常常是 Claude）。仓库名是 \`nvidia/skills\`。技能名用各份 \`SKILL.md\` 的 \`name:\`，官方示例是 \`cuopt-numerical-optimization-api\`（cuOpt 数值优化 API）。先看目录：

\`\`\`bash
npx skills add nvidia/skills --list
\`\`\`

安装器要 \`skills\` CLI **1.5.16 及以上**。旧版对 Claude 的 \`.claude/skills/\` 链接会坏；Codex 读项目旁的 \`.agents/skills/\`，不受那条链接影响，但仍应走 \`npx skills@latest\`。默认装进**当前项目**的 \`.agents/skills/\`。要跟账号走再加 \`--global\`；脚本可再加 \`--yes\`。

\`\`\`bash
npx skills add nvidia/skills --skill cuopt-numerical-optimization-api --agent codex --global --yes
\`\`\`

装完新开会话。不要抄 Claude 的 \`/reload-skills\`。之后可用 \`npx skills update\` 刷新；目录会改名或合并，过期本地副本让安装器删。不要手拷到 \`~/.codex/skills\`。不要发明 \`codex plugin add nvidia@…\`。NVIDIA 文档说 Codex marketplace 还在路上，**现在没有**可抄的 marketplace id。

这套技能教 cuOpt / RAG Blueprint / Jetson / NeMo 这类 NVIDIA 工作流，**不会**替你配 Datadog 或其它远程 MCP。装完先问「用 cuOpt Python API 解一个线性规划」，看它是否调起 \`cuopt-numerical-optimization-api\`。

不要做这些：

- 不要抄 \`--agent claude-code\`、\`--agent cursor\` 或 Snowflake 的 \`--agent cortex\`。
- 不要把 \`npx skills add nvidia/skills\` 当 Codex \`/plugins\`。
- 不要发明 \`codex plugin add nvidia@openai-curated\`。
- 不要把整份产品目录手拷进仓库根。

网页 Cloud 不读本机技能目录。改完新开一轮，\`/skills\` 应能看见 \`cuopt-numerical-optimization-api\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Skills", "NVIDIA", "cuOpt"],
    related: ["pinecone-agent-skills", "imgly-cesdk-skills", "skill-locations"],
    sources: [
      {
        label: "NVIDIA/skills",
        url: "https://github.com/NVIDIA/skills",
      },
      {
        label: "NVIDIA · Advanced Installation",
        url: "https://docs.nvidia.com/skills/advanced-install",
      },
    ],
  },
  {
    id: "postmark-agent-skills",
    no: 380,
    title: "Postmark 技能用 ActiveCampaign/postmark-skills，不要发明 plugin add",
    summary:
      "博客点名 Codex：npx skills add ActiveCampaign/postmark-skills。官方没钉 --agent codex。示例技能是 postmark-send-email。不要发明 plugin add postmark@。这不是 MCP。",
    body: `Postmark 的 Agent Skills 博客点名 OpenAI Codex 为兼容客户端。这是教代理怎么写 Postmark SDK / API 的技能，不是 Codex \`/plugins\`，也不是那台 \`@activecampaign/postmark-mcp\`。官方安装命令：

\`\`\`bash
npx skills add ActiveCampaign/postmark-skills
\`\`\`

只要某一项时再钉技能名。官方示例是 \`postmark-send-email\`：

\`\`\`bash
npx skills add ActiveCampaign/postmark-skills --skill postmark-send-email
\`\`\`

仓库名是 \`ActiveCampaign/postmark-skills\`。官方**没有**钉 \`--agent codex\`。裸跑会按默认 agent 落盘，还可能改所有检测到的客户端。只要 Codex 时，skills CLI 允许自己加 \`--agent codex\`，这不是 Postmark 专节，也不是 \`/plugins\`。不要手拷到 \`~/.codex/skills\`。不要发明 \`codex plugin add postmark@…\`。

技能文件夹：\`postmark-send-email\`、\`postmark-inbound\`、\`postmark-templates\`、\`postmark-webhooks\`、\`postmark-email-best-practices\`。它们教 Message Streams、500 封一批、Handlebars 模板别名、inbound 的 \`StrippedTextReply\`。**不会**替你配 MCP。

\`POSTMARK_SERVER_TOKEN\` 放进**启动 Codex 的那个进程**。不要把 token 写进 \`args\`、\`env\` 表或提示词。Codex 不读 \`.env\`。先验证发件域名或 Sender Signature。

那台 MCP 是另一条线：\`npx -y @activecampaign/postmark-mcp\`，文档只给 Claude / Cursor / Windsurf 的 JSON。**不要发明** \`codex mcp add postmark --url\`，也不要把 \`POSTMARK_SERVER_TOKEN\` 抄进 JSON \`env\`。技能和 MCP 互补：技能写集成代码，MCP 才直接打你的账号。不要和 MailerLite / beehiiv 远程 MCP 搞成一台。

装完新开会话。先问「用 Postmark 发一封欢迎信」，看它是否调起 \`postmark-send-email\`。

不要做这些：

- 不要把默认 \`npx skills add ActiveCampaign/postmark-skills\` 当成 Codex \`/plugins\`。
- 不要发明 \`codex plugin add postmark@openai-curated\`。
- 不要抄 \`@activecampaign/postmark-mcp\` 的 \`mcpServers\` JSON 当 Codex 主路径。
- 不要把 token 写进仓库。

网页 Cloud 不读本机技能目录。改完新开一轮，\`/skills\` 应能看见 \`postmark-send-email\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Skills", "Postmark", "Email"],
    related: ["nvidia-skills-codex", "pinecone-agent-skills", "mailerlite-mcp-http"],
    sources: [
      {
        label: "Postmark · Teach your AI coding agent",
        url: "https://postmarkapp.com/blog/teach-your-ai-coding-agent-how-to-send-email-with-postmark-skills",
      },
      {
        label: "ActiveCampaign/postmark-skills",
        url: "https://github.com/ActiveCampaign/postmark-skills",
      },
    ],
  },
  {
    id: "datadog-agent-skills",
    no: 381,
    title: "Datadog 技能用 agent-observability 路径，不要抄 Restart Claude Code",
    summary:
      "官方点名 Codex CLI：npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y。官方没钉 --agent codex。不要发明 plugin add。MCP 仍走 mcp.datadoghq.com/v1/mcp。",
    body: `Datadog Agent Observability 文档把 Codex CLI 列成兼容客户端，技能仓库 README 也点名 Codex CLI。这是 Agent Skills，不是 Codex \`/plugins\`，也不是再配一台新的远程 MCP。官方观测技能安装命令：

\`\`\`bash
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
\`\`\`

只要 pup 命令手册时，仓库 README 的单项是 \`dd-pup\`：

\`\`\`bash
npx skills add datadog-labs/agent-skills --skill dd-pup --full-depth -y
\`\`\`

仓库名是 \`datadog-labs/agent-skills\`。官方**没有**钉 \`--agent codex\`。裸跑会按默认 agent 落盘，还可能改所有检测到的客户端。只要 Codex 时，skills CLI 允许自己加 \`--agent codex\`，这不是 Datadog 专节，也不是 \`/plugins\`。不要手拷到 \`~/.codex/skills\`。不要发明 \`codex plugin add datadog@…\`。

技能教怎么查 Agent Observability 痕迹、评测实验、写 \`ddtrace.llmobs\` 代码。**不会**替你配 MCP。观测技能要 \`llmobs\` 工具集：Codex 已经有的远程表是 \`datadog\`，US1 现行入口是 \`https://mcp.datadoghq.com/v1/mcp\`，再 \`codex mcp login datadog\`。工具集写进 \`http_headers\` 的 \`X-Datadog-MCP-Toolsets\`，例如 \`llmobs,core\`。不要把 \`?toolsets=\` 拼进 \`url\`，也不要再抄旧的 \`/api/unstable/mcp-server/mcp\`。

官方技能页下一步抄的是 Claude 的 \`claude mcp add --transport http\`，结尾还写 Restart Claude Code。**不要抄进 Codex**。Codex 改完新开会话，用 \`/skills\` 或 \`$agent-observability-session-classify\`。不要把文档里的 Claude 斜杠当成 Codex 斜杠命令。

\`pup\` 是技能的后备后端：\`brew tap datadog-labs/pack\`，再 \`brew install datadog-labs/pack/pup\`，然后 \`pup auth login\`。技能找不到 MCP 才会切 \`pup\`；也可显式 \`--backend pup\`。不要把 \`DD_API_KEY\` / Application Key 写进 \`http_headers\`。GovCloud 没有这台 MCP。

不要做这些：

- 不要把 \`npx skills add datadog-labs/agent-skills/agent-observability\` 当成 Codex \`/plugins\`。
- 不要发明 \`codex plugin add datadog@openai-curated\`。
- 不要抄 \`claude mcp add\` 或把站点占位 URL 当 HTML。
- 不要和 NVIDIA / Postmark 那几套技能装成同一条命令。

网页 Cloud 不读本机技能目录。改完新开一轮，\`/skills\` 应能看见 \`agent-observability-session-classify\` 或 \`dd-pup\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Skills", "Datadog", "MCP"],
    related: ["mcp-datadog-remote", "nvidia-skills-codex", "postmark-agent-skills"],
    sources: [
      {
        label: "Datadog · Agent Observability MCP and Skills",
        url: "https://docs.datadoghq.com/llm_observability/build_with_ai/mcp_server/",
      },
      {
        label: "datadog-labs/agent-skills",
        url: "https://github.com/datadog-labs/agent-skills",
      },
    ],
  },
  {
    id: "tavily-agent-skills",
    no: 382,
    title: "Tavily 技能用 tavily-ai/skills，不要发明 mcp add",
    summary:
      "官方点名 Codex：npx skills add tavily-ai/skills --all。官方没钉 --agent codex。示例技能是 tavily-search。不要发明 plugin add 或 mcp add。",
    body: `Tavily Agent Skills 文档把 Codex 列成兼容客户端。这是教代理怎么调 Tavily CLI 做搜索 / 抽取 / 爬取的技能，不是 Codex \`/plugins\`，也不是远程 MCP。官方安装命令：

\`\`\`bash
npx skills add tavily-ai/skills --all
\`\`\`

只要搜索时再钉技能名。官方示例是 \`tavily-search\`：

\`\`\`bash
npx skills add tavily-ai/skills --skill tavily-search
\`\`\`

仓库名是 \`tavily-ai/skills\`。官方**没有**钉 \`--agent codex\`。\`--all\` 还会把全部技能装进所有检测到的客户端。只要 Codex 时，skills CLI 允许自己加 \`--agent codex\` 并只装一项，这不是 Tavily 专节，也不是 \`/plugins\`。不要手拷到 \`~/.codex/skills\`。不要发明 \`codex plugin add tavily@…\`。

技能要先有 Tavily CLI。文档用安装脚本；仓库 README 也可以 \`uv tool install tavily-cli\`。然后 \`tvly init\` 会登录，并检测 Claude Code、Codex、Cursor。远程会话用 \`tvly init --no-browser\`。\`tvly search\` / \`tvly extract\` 可以无钥、受速率限制；\`map\` / \`crawl\` / \`research\` 要先登录。\`TAVILY_API_KEY\` 放启动 \`tvly\` / Codex 的进程，不要写进 \`args\`、\`env\` 表或 URL 查询参数。

官方技能页的斜杠是 Claude 风格。Codex 用 \`/skills\` 或 \`$tavily-search\`。不要把 \`/tavily-search\` 当成 Codex 斜杠命令。

那台远程 MCP 是另一条线：文档只给 Cursor JSON、Claude Desktop、Claude Code 的 \`claude mcp add --transport http\`，以及 OpenAI Responses API。**不要发明** \`codex mcp add tavily --url\`，也不要把 API key 拼进 \`mcp.tavily.com\` 的查询参数，更不要抄 \`npx mcp-remote\`。技能走 CLI；MCP 才直接把工具挂进会话。不要和 Datadog / Postmark 技能装成一条命令。

装完新开会话。先问「搜本周 AI 监管新闻」，看它是否调起 \`tavily-search\`。

不要做这些：

- 不要把默认 \`npx skills add tavily-ai/skills --all\` 当成 Codex \`/plugins\`。
- 不要发明 \`codex plugin add tavily@openai-curated\`。
- 不要发明 \`codex mcp add tavily --url https://mcp.tavily.com/mcp/\`。
- 不要抄 Claude 的 \`/plugin marketplace add\`。

网页 Cloud 不读本机技能目录。改完新开一轮，\`/skills\` 应能看见 \`tavily-search\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Skills", "Tavily", "搜索"],
    related: ["datadog-agent-skills", "postmark-agent-skills", "nvidia-skills-codex"],
    sources: [
      {
        label: "Tavily · Agent Skills",
        url: "https://docs.tavily.com/documentation/agent-skills",
      },
      {
        label: "tavily-ai/skills",
        url: "https://github.com/tavily-ai/skills",
      },
    ],
  },
  {
    id: "rudderstack-mcp-http",
    no: 383,
    title: "RudderStack MCP 用 mcp.rudderstack.com/mcp，再完成 OAuth",
    summary:
      "官方 Codex 节：url 写成 https://mcp.rudderstack.com/mcp，再 mcp login rudderstack。URL 带 /mcp。OAuth，不要 API key。不要发明 plugin add rudder@。不要抄 --transport http 或 mcp-remote。",
    body: `RudderStack 连接指南给 Codex 有专节，前提是 Claude、Codex、Cursor、VS Code Copilot 这类 MCP 客户端，以及有效 RudderStack 账号。官方远程入口是 \`https://mcp.rudderstack.com/mcp\`，带 \`/mcp\` 后缀，不要尾斜杠。鉴权是 OAuth，不要 API key。官方 Codex 步骤是先写表，再登录：

\`\`\`bash
codex mcp add rudderstack --url https://mcp.rudderstack.com/mcp
codex mcp login rudderstack
\`\`\`

官方表名就是 \`rudderstack\`。\`mcp add\` 写进用户层 \`~/.codex/config.toml\`。只写进了表、浏览器没弹时再跑 \`codex mcp login rudderstack\`。官方贴的 TOML 是同一张表：

\`\`\`toml
[mcp_servers.rudderstack]
url = "https://mcp.rudderstack.com/mcp"
enabled = true
\`\`\`

桌面 / IDE：Settings → MCP servers → Add server，传输选 Streamable HTTP，URL 填上面那条。Bearer token env var 和 Headers 留空。第一次用工具时会打开浏览器，用平时的 RudderStack 账号登录。token 会自动刷新，不要把密钥写进 \`config.toml\`。

不要发明 \`codex plugin add rudder@…\`。官方没给出 Codex marketplace id。不要抄 Claude Code 的 \`claude mcp add --transport http rudderstack https://mcp.rudderstack.com/mcp\`。不要抄 Cursor JSON、VS Code 的 \`.vscode/mcp.json\` 或 Claude.ai 自定义 connector。不要抄 \`mcp.rudderstack.com/docs\` 里给 Claude Desktop / Cursor / Windsurf 的 \`npx mcp-remote\`。不要给这台 \`bearer_token_env_var\`。不要把 API key 写进 URL、\`http_headers\` 或 \`env\` 表。

技能是另一条线：\`npx skills add rudderlabs/rudder-agent-skills\`。官方没钉 \`--agent codex\`。\`/plugin marketplace add rudderlabs/rudder-agent-skills\` 是 Claude 的路，不要抄进 Codex。技能里的 \`rudder-mcp-setup\` 斜杠也是 Claude 风格；Codex 用 \`/skills\` 或 \`$rudder-mcp-setup\`。技能教怎么配 MCP，**不会**替你写 \`mcp_servers.rudderstack\`。

这台能查源、目的地、连接、事件指标、Tracking Plan，以及写/测 transformation。官方写明：写操作只限创建或更新 transformation，并把它接到目的地；不会新建或删除 source / destination。事件属性、traits、请求体会在发给助手前打码。保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

先只读：问「给我这个 RudderStack workspace 的概览」。报 Workspace not found 时，先问有哪些 workspace 再切。工具没出来就彻底新开会话。

不要做这些：

- 不要发明 \`codex plugin add rudder@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 \`npx mcp-remote\`。
- 不要把 API key 写进 \`env\` 表、\`http_headers\` 或 URL。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get rudderstack\` 看传输是 streamable_http。会话里 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "RudderStack", "OAuth", "HTTP"],
    related: ["rudderstack-agent-skills", "mcp-add-and-login", "mcp-http-not-sse"],
    sources: [
      {
        label: "RudderStack · How to Connect to RudderStack MCP",
        url: "https://www.rudderstack.com/docs/ai-features/rudderstack-mcp/connect/",
      },
      {
        label: "RudderStack · RudderStack MCP",
        url: "https://www.rudderstack.com/docs/ai-features/rudderstack-mcp/",
      },
    ],
  },
  {
    id: "rudderstack-agent-skills",
    no: 384,
    title: "RudderStack 技能用 rudderlabs/rudder-agent-skills，不要抄 /plugin",
    summary:
      "仓库表把 Codex 写成 --agent codex。官方没钉。主路径是 npx skills add rudderlabs/rudder-agent-skills。示例技能是 rudder-cli-workflow。不要发明 plugin add。",
    body: `RudderStack Agent Skills 安装页前提写 Claude Code、Cursor、Cline、OpenCode 或其它受支持代理。仓库 \`docs/installation.md\` 的 agent 表把 Codex 写成 \`--agent\` 旗标 \`codex\`，项目目录 \`.agents/skills/\`，全局 \`~/.codex/skills/\`。这是教代理怎么开 Rudder CLI、MCP、Terraform、Profiles 的技能，不是 Codex \`/plugins\`，也不会替你写 \`mcp_servers.rudderstack\`。官方安装命令：

\`\`\`bash
npx skills add rudderlabs/rudder-agent-skills
\`\`\`

先看目录：

\`\`\`bash
npx skills add rudderlabs/rudder-agent-skills --list
\`\`\`

官方单项示例钉的是 Claude：\`-a claude-code --skill rudder-cli-workflow\`。只要 Codex 时，skills CLI 允许自己改成 \`--agent codex\`，这不是 RudderStack 专节，也不是 \`/plugins\`：

\`\`\`bash
npx skills add rudderlabs/rudder-agent-skills --agent codex --skill rudder-cli-workflow
\`\`\`

仓库名是 \`rudderlabs/rudder-agent-skills\`。官方**没有**钉 \`--agent codex\`。\`-g --all\` 会把全部技能装进所有检测到的客户端。不要手拷到 \`~/.codex/skills\`。不要发明 \`codex plugin add rudder@…\`。

不要抄 Claude Code 的 \`/plugin marketplace add rudderlabs/rudder-agent-skills\` 或 \`/plugin install rudder-core@rudder-agent-skills\`。那是 Claude 插件市场，Codex 看不见。Cursor 专节是 \`-a cursor\`，也不要当成 Codex 命令。

官方安装页的斜杠是 Claude 风格：\`/rudder-cli-setup\`、\`/rudder-mcp-setup\`、\`/rudder-environment-check\`。Codex 用 \`/skills\` 或 \`$rudder-cli-setup\`、\`$rudder-mcp-setup\`。\`rudder-mcp-setup\` 教怎么连 \`mcp.rudderstack.com\`，**不会**替你写 \`[mcp_servers.rudderstack]\`。远程 MCP 仍走 \`codex mcp add rudderstack --url https://mcp.rudderstack.com/mcp\`，再 \`codex mcp login rudderstack\`。

CLI 技能要先有 \`rudder-cli\`。官方让你跑 setup 技能装二进制并登录；仓库安装指南也可以 \`brew tap rudderlabs/rudder-iac\` 再 \`brew install rudder-cli\`，然后 \`rudder-cli auth login\`。Access token 放启动 CLI / Codex 的进程，不要写进 \`args\`、\`env\` 表或提示词。

装完新开会话。先问「用 rudder-cli 校验当前 Tracking Plan」，看它是否调起 \`rudder-cli-workflow\`。数据目录技能名是 \`rudder-data-catalog\`。

不要做这些：

- 不要把默认 \`npx skills add rudderlabs/rudder-agent-skills\` 当成 Codex \`/plugins\`。
- 不要发明 \`codex plugin add rudder@openai-curated\`。
- 不要抄 Claude 的 \`/plugin marketplace add\`。
- 不要以为技能会写出 \`mcp_servers.rudderstack\`。

网页 Cloud 不读本机技能目录。改完新开一轮，\`/skills\` 应能看见 \`rudder-cli-workflow\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Skills", "RudderStack", "CLI"],
    related: ["rudderstack-mcp-http", "tavily-agent-skills", "datadog-agent-skills"],
    sources: [
      {
        label: "RudderStack · How to Install Agent Skills",
        url: "https://www.rudderstack.com/docs/ai-features/agent-skills/install/",
      },
      {
        label: "rudderlabs/rudder-agent-skills",
        url: "https://github.com/rudderlabs/rudder-agent-skills",
      },
    ],
  },
  {
    id: "kuroco-mcp-http",
    no: 385,
    title: "Kuroco MCP 用预注册 client_id，不要抄 CIMD 或 Claude 语法",
    summary:
      "官方 Codex 节：表名 kuroco，url 写成站点的 rcms-api/API_ID/mcp，再 oauth.client_id，mcp login kuroco。不支持 CIMD。不要发明 plugin add。不要把 token 写进 http_headers。",
    body: `Kuroco 客户端配置页给 Codex CLI 有专节。内容 API 远程入口形如 \`https://YOUR_SITE_KEY.g.kuroco.app/rcms-api/API_ID/mcp\`，**带** \`/mcp\` 后缀。把 YOUR_SITE_KEY 和 API_ID 换成控制台里的站点键和内容 API 编号。官方表名就是 \`kuroco\`。Codex **不支持** CIMD，也没有 \`client_secret\` 键，必须在 Kuroco 把客户端登记成 PKCE 公有客户端：Token Endpoint Auth Method 选 \`none\`。

官方 Codex 节是手写 TOML，再登录。CLI 等价是 \`--url\` 加 \`--oauth-client-id\`：

\`\`\`bash
codex mcp add kuroco --url https://YOUR_SITE_KEY.g.kuroco.app/rcms-api/API_ID/mcp --oauth-client-id YOUR_CLIENT_ID
codex mcp login kuroco
\`\`\`

\`\`\`toml
[mcp_servers.kuroco]
url = "https://YOUR_SITE_KEY.g.kuroco.app/rcms-api/API_ID/mcp"
enabled = true

[mcp_servers.kuroco.oauth]
client_id = "YOUR_CLIENT_ID"
\`\`\`

第一次 \`mcp login kuroco\` 多半会停在 Kuroco 错误页 \`redirect_uri does not match a registered URI\`。从浏览器地址栏拷 \`redirect_uri\`，登记到该 OAuth 客户端，再 login 一次。Kuroco 按 RFC 8252 忽略循环回端口，路径段对同一 MCP URL 是稳定的，所以只登记一次。\`scopes\` 和 \`oauth_resource\` 通常可省略；若写 \`oauth_resource\`，必须和 \`url\` 完全相同。

不要发明 \`codex plugin add kuroco@…\`。不要抄 Claude Code 的 \`claude mcp add --transport http kuroco …\`。不要抄 Cursor JSON 里的 \`CLIENT_SECRET\`。不要把文档里挤成一行的 \`[mcp_servers.kuroco]url = …\` 粘进 TOML。不要给这台 \`bearer_token_env_var\`：内容 API 的静态令牌走自定义头，不是 \`Authorization: Bearer\`。

头认证是另一条线，只适用于 \`/rcms-api/API_ID/mcp\`，**不能**接到 Admin MCP（\`/direct/rcms_api/admin_mcp/\`）。\`codex mcp add\` 写不了自定义头，加完再改 \`env_http_headers\`。头名是 \`X-RCMS-API-ACCESS-TOKEN\`，右边写变量名 \`KUROCO_MCP_TOKEN\`，令牌放启动 Codex 的进程。不要把 token 字面量写进 \`http_headers\`。头认证这张表不要再 \`mcp login\`。

Admin MCP 是另一条 URL，例如 \`…/direct/rcms_api/admin_mcp/x/all\`，裸 \`/admin_mcp/\` 会 400。不要和内容 API 那台搞成一张表。

不要做这些：

- 不要发明 \`codex plugin add kuroco@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\` 或 Cursor 的 \`CLIENT_SECRET\`。
- 不要把静态令牌写进 \`http_headers\` 或 URL。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get kuroco\` 看传输是 streamable_http。OAuth 路径的 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Kuroco", "OAuth", "HTTP"],
    related: ["mcp-oauth-loopback-callback", "mcp-add-and-login", "mcp-slack-remote"],
    sources: [
      {
        label: "Kuroco · MCP Client Configuration",
        url: "https://kuroco.app/docs/reference/mcp-client-configuration/",
      },
      {
        label: "Kuroco · MCP Authentication Header",
        url: "https://kuroco.app/docs/reference/mcp-client-configuration-authentication-header/",
      },
    ],
  },
  {
    id: "wherobots-mcp-http",
    no: 386,
    title: "Wherobots MCP 用 --url 加 mcp login，不要抄文档里的 stdio 限制",
    summary:
      "官方 Codex 页：表名示例 wherobots-mcp-server，url 写成 api.cloud.wherobots.com/mcp/，再 mcp login。文档仍写 mcp add 只支持 stdio，现行 Codex 用 --url。不要把 API key 写进 http_headers。",
    body: `Wherobots 给 Codex CLI / 桌面有专节。远程入口是 \`https://api.cloud.wherobots.com/mcp/\`，**带** \`/mcp/\` 尾斜杠。官方示例表名是 \`wherobots-mcp-server\`。要 Professional、Innovation 或 Enterprise 组织；Admin 和 User 都能用。OAuth 不能在浏览器里注册新账号，先有 cloud.wherobots.com 账号。主机在 \`us-west-2\`。

官方 Codex 页还写「远程 HTTP 只能手改 TOML，\`codex mcp add\` 只支持本地 stdio」。那句过时了。现行 Codex 远程用 \`--url\`：

\`\`\`bash
codex mcp add wherobots-mcp-server --url https://api.cloud.wherobots.com/mcp/
codex mcp login wherobots-mcp-server
\`\`\`

\`\`\`toml
[mcp_servers.wherobots-mcp-server]
url = "https://api.cloud.wherobots.com/mcp/"
enabled = true
\`\`\`

\`mcp add\` 写进用户层 \`~/.codex/config.toml\`。浏览器没弹再跑 \`codex mcp login wherobots-mcp-server\`。登录后选组织和 Allow access。传输是 Streamable HTTP，不要抄 \`/sse\`。

不要发明 \`codex plugin add wherobots@…\`。官方没给出 Codex marketplace id。不要抄 Claude Code 的 \`claude mcp add --transport http … --scope user\`。不要抄 Cursor marketplace、\`mcp.json\` 或把仓库 clone 到 \`~/.cursor/plugins\`。VS Code 扩展会自动配 MCP，那条不套 Codex。

API key 是另一条线，给不走 OAuth 的编辑器用。官方 Codex 示例把密钥写进 \`http_headers\`，**不要抄**：密钥会进仓库。这台要的是 \`X-API-Key\`，不是 \`Authorization: Bearer\`，所以不要 \`bearer_token_env_var\`。\`codex mcp add\` 写不了自定义头，加完再改 \`env_http_headers\`。左边是头名，右边写变量名 \`WHEROBOTS_API_KEY\`，值放启动 Codex 的进程：

\`\`\`toml
[mcp_servers.wherobots-mcp-server]
url = "https://api.cloud.wherobots.com/mcp/"
enabled = true

[mcp_servers.wherobots-mcp-server.env_http_headers]
X-API-Key = "WHEROBOTS_API_KEY"
\`\`\`

从已经 \`export WHEROBOTS_API_KEY\` 的终端启动。Dock / 开始菜单打开的桌面没有 zshrc。Codex 不读 \`.env\`。变量缺失时这颗头会被静默丢掉。头认证这张表不要再 \`mcp login\`。

技能是另一条线。仓库名是 \`wherobots/agent-skills\`。官方 Codex 页是 \`npx skills add -g wherobots/agent-skills\`。\`-g\` 装到用户目录。官方**没有**钉 \`--agent codex\`。仓库三份技能是 \`wherobots-usage\`、\`wherobots-explore\`、\`wherobots-develop\`。技能不会写出 \`mcp_servers.wherobots-mcp-server\`。不要手拷到 \`~/.codex/skills\`。

这台能浏览目录、生成 Spatial SQL、跑查询。默认 Tiny runtime，查询约 15 分钟超时，SQL Session 空闲约 5 分钟结束。只有真正在 Wherobots 上执行查询才按 Spatial Unit 计费。VS Code 命令面板里的 \`wherobotsjobsubmit.mcpServerQueryTimeout\` **不是** Codex 配置键，不要抄进 \`config.toml\`。保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

先只读：问「List the catalogs in my Wherobots Data Hub」。工具没出来就彻底新开会话。

不要做这些：

- 不要把官方那句「mcp add 只支持 stdio」当成现行限制。
- 不要发明 \`codex plugin add wherobots@openai-curated\`。
- 不要抄 Claude 的 \`--transport http\`、Cursor 插件或 \`/sse\`。
- 不要把 API key 写进 \`http_headers\` 或 URL。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get wherobots-mcp-server\` 看传输是 streamable_http。OAuth 路径的 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Wherobots", "OAuth", "HTTP"],
    related: ["wherobots-agent-skills", "mcp-add-and-login", "mcp-http-env-headers"],
    sources: [
      {
        label: "Wherobots · Set Up Wherobots in Codex",
        url: "https://docs.wherobots.com/develop/agentic-tools/codex",
      },
      {
        label: "wherobots/agent-skills",
        url: "https://github.com/wherobots/agent-skills",
      },
    ],
  },
  {
    id: "wherobots-agent-skills",
    no: 387,
    title: "Wherobots 技能用 -g 装 agent-skills，不要抄 Cursor 插件",
    summary:
      "官方 Codex 页是 npx skills add -g wherobots/agent-skills。官方没钉 --agent codex。单项示例是 --skill wherobots-usage。不要发明 plugin add。技能不会写 MCP 表。",
    body: `Wherobots 给 Codex CLI / 桌面单独装技能。VS Code 扩展会把技能打进编辑器，那条不套 Codex。总览把 Codex 标成 Terminal or desktop，MCP、Agent Skills 和 CLI 都要手工配。仓库名是 \`wherobots/agent-skills\`。这是教代理怎么选 MCP / CLI / SDK 的技能，不是 Codex \`/plugins\`，也不会替你写 \`mcp_servers.wherobots-mcp-server\`。

官方 Codex 页的安装命令带 \`-g\`，装到用户目录：

\`\`\`bash
npx skills add -g wherobots/agent-skills
\`\`\`

先看目录：

\`\`\`bash
npx skills add wherobots/agent-skills --list
\`\`\`

安装页单项示例是 \`--skill wherobots-usage\`，默认不带 \`-g\`，会落到当前项目。只要全局 Codex 时沿用 Codex 页的 \`-g\`，或自己加 \`--agent codex\`。官方**没有**钉 \`--agent codex\`。仓库 README 还写 skills.sh 语法 \`wherobots/agent-skills@wherobots-usage\`：

\`\`\`bash
npx skills add -g wherobots/agent-skills --skill wherobots-usage
npx skills add wherobots/agent-skills@wherobots-usage
\`\`\`

仓库三份技能：\`wherobots-usage\`（选 MCP / CLI / SDK）、\`wherobots-explore\`（目录和 Spatial SQL）、\`wherobots-develop\`（CLI / SDK / 提交作业）。Codex 用 \`/skills\` 或 \`$wherobots-usage\`、\`$wherobots-explore\`、\`$wherobots-develop\`。不要手拷到 \`~/.codex/skills\`。不要发明 \`codex plugin add wherobots@…\`。

不要抄 Cursor marketplace，也不要把仓库 clone 到 \`~/.cursor/plugins/local/wherobots\`。那是 Cursor 插件，会登记 Cursor 的 MCP，不是 Codex。不要抄 Claude 的 \`/plugin marketplace add\`。

远程 MCP 仍走 \`codex mcp add wherobots-mcp-server --url https://api.cloud.wherobots.com/mcp/\`，再 \`codex mcp login wherobots-mcp-server\`。技能里的 explore 工作流假定 MCP 已经连上，**不会**替你写那张表。

装完新开会话。先问「帮我选 MCP 还是 CLI 来列 Data Hub 目录」，看它是否调起 \`wherobots-usage\`。

不要做这些：

- 不要把 \`npx skills add -g wherobots/agent-skills\` 当成 Codex \`/plugins\`。
- 不要发明 \`codex plugin add wherobots@openai-curated\`。
- 不要抄 Cursor 插件目录或 Claude 的 \`/plugin marketplace add\`。
- 不要以为技能会写出 \`mcp_servers.wherobots-mcp-server\`。

网页 Cloud 不读本机技能目录。改完新开一轮，\`/skills\` 应能看见 \`wherobots-usage\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Skills", "Wherobots", "CLI"],
    related: ["wherobots-mcp-http", "rudderstack-agent-skills", "tavily-agent-skills"],
    sources: [
      {
        label: "Wherobots · Set Up Wherobots in Codex",
        url: "https://docs.wherobots.com/develop/agentic-tools/codex",
      },
      {
        label: "Wherobots · Install Agent Skills",
        url: "https://docs.wherobots.com/develop/agent-skills",
      },
      {
        label: "wherobots/agent-skills",
        url: "https://github.com/wherobots/agent-skills",
      },
    ],
  },
  {
    id: "hex-codex-plugin",
    no: 388,
    title: "Hex 先 Plugins 搜 Hex，不要发明 plugin add hex@",
    summary:
      "官方 Codex 专节：桌面 Plugins 搜 Hex，点 Connect，再连捆绑的 Hex app 做 OAuth。官方没给 plugin add id。不要抄 Cursor 的 /add-plugin hex。自定义域不是 Codex 专节。",
    body: `Hex 给 Codex 的官方主路径是公共插件目录，不是 \`codex mcp add\`。Team / Enterprise 才能用；MCP 目前 beta。Explorer 及以上才能搜项目、开 Threads；Editor 及以上才能改 notebook。官方没给出 \`plugin add hex@\` 那种 marketplace id，不要自己编。

ChatGPT Business / Enterprise 工作区里，管理员可能要先在 Workspace settings → Apps 打开 Hex app，用户才能在 Codex 装这个插件。

官方 Codex 专节：

1. Codex 应用打开 Plugins，搜 Hex
2. 在 Hex 插件旁点 Connect
3. 按提示连捆绑的 Hex app，完成 OAuth，多 workspace 时选对工作区

博客和 changelog 还写：Plugins 先装 Data Analytics plugin，再 Connect Hex。以专节的 Plugins 搜 Hex 为准；目录里看到 Data Analytics 再连 Hex 也是同一条产品路径。

0.154 起先在**当前会话**看 \`/plugins\`；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用桌面或 CLI。装完新开一轮，用 \`@\` 点名插件或捆绑技能，或直接问「在 Hex 里查本季 churn」。Explorer 可以搜项目、开 Threads；Editor 才能改 cell，或走插件捆绑的 Hex CLI。官方 Codex 专节没给 CLI 命令清单，不要发明 hex 子命令。

不要做这些：

- 不要发明 \`codex plugin add hex@openai-curated\`。
- 不要抄 Cursor 的 \`/add-plugin hex\`，也不要抄 Claude Settings → Connectors。
- 不要把其它客户端的 \`mcpServers\` JSON 抄进 \`config.toml\` 当主路径。
- 不要给它 \`required = true\`。

Cursor / ChatGPT 官方插件只连 \`app.hex.tech\`。EU、HIPAA、单租户要换主机。Codex 专节**没有** \`--url\`。其它客户端 JSON 的 url 才是 \`https://app.hex.tech/mcp\`，**带** \`/mcp\`。这不是 Codex 专节，不要写成 \`codex mcp add hex --url\` 的官方主路径。自定义域只换主机，例如 \`eu.hex.tech\`、\`hc.hex.tech\` 或单租户域名，不要丢掉 \`/mcp\`。

标成 Sensitive 的数据连接，MCP 不会用。对话里上传的文件也传不进 Hex。Threads 往往要几分钟；MCP 开的 Thread 是独立的，接不上 Hex 应用里已有的 Thread。改 notebook 只动草稿，不会改已发布 app。Admin 角色也不会自动获得每个项目的编辑权。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 也走 Plugins 搜 Hex。改完用 \`codex plugin list\` 核对已装。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["MCP", "Hex", "plugins", "OAuth"],
    related: ["mcp-resend-remote", "customerio-codex-plugin", "onesignal-codex-plugin"],
    sources: [
      {
        label: "Hex · MCP server",
        url: "https://learn.hex.tech/docs/api-integrations/mcp-server",
      },
      {
        label: "Hex · Hex is now in Codex",
        url: "https://hex.tech/blog/hex-in-codex/",
      },
    ],
  },
  {
    id: "webflow-codex-plugin",
    no: 389,
    title: "Webflow 先 Plugins 搜 Webflow，不要发明 plugin add webflow@",
    summary:
      "官方帮助：ChatGPT 桌面切到 Codex，Plugins 搜 Webflow，点 Install，再 Continue to Webflow 做 OAuth。官方没给 plugin add id。不要抄 Claude 的 --transport http 或 Cursor 插件。改画布要开 MCP Bridge App。",
    body: `Webflow 给 Codex 的官方主路径是公共插件目录，不是 \`codex mcp add\`。帮助中心写：在 ChatGPT 桌面应用切到 Codex，Plugins 搜 Webflow，点 Install。官方没给出 \`plugin add webflow@\` 那种 marketplace id，不要自己编。

只有 Workspace owner、Workspace admin 或 Site manager 才能给站点授权。Reviewer 不行。MCP 跟着你现有的 Webflow 权限走，装插件不会抬权限。一次授权只覆盖一个 workspace；要换 workspace，先卸再装、重新授权。

官方帮助步骤：

1. 打开 ChatGPT 桌面应用，切到 Codex
2. 打开 Plugins，搜 Webflow
3. 在 Webflow 插件旁点 Install
4. Connect Webflow 对话框里点 Continue to Webflow
5. 浏览器里勾选要给 Codex 的站点或 Workspace
6. 点 Authorize App，回到 Codex

TUI 输入 \`/plugins\` 搜 Webflow 是同一套公共目录。0.154 起先在**当前会话**看 \`/plugins\`；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用桌面或 CLI。装完新开一轮，直接问「列出这个站点的 CMS Collection 和字段」，或让它搭一个博客 Collection 加起步条目。

不要做这些：

- 不要发明 \`codex plugin add webflow@openai-curated\`。
- 不要抄 Claude 的 \`claude mcp add --transport http webflow …\`，也不要抄 Cursor Marketplace 或 \`/add-plugin webflow\`。
- 不要把 Windsurf 的 \`mcp.webflow.com/sse\` 抄进 Codex。Codex 只接 Streamable HTTP。
- 不要抄 \`npx mcp-remote\`。
- 不要给它 \`required = true\`。

官方 Codex 帮助**没有** \`--url\`。开发者文档给没插件的客户端才写 \`https://mcp.webflow.com/mcp\`，**带** \`/mcp\`。这不是帮助中心的 Codex 主路径，不要写成 \`codex mcp add webflow --url\` 的官方步骤。Beta 入口 \`https://mcp.webflow.com/beta/mcp\` 和文档站 MCP 都是另一台，不要和主站搞混。

改画布、样式、组件要走 Designer API：浏览器打开该站点的 Designer，按 \`E\` 打开 Apps，启动 Webflow MCP Bridge App，连上后再让 Codex 动手。桥接应用会在 OAuth 时自动装，不在公开 Marketplace。只管 CMS、Collection、自定义代码时，Designer 可以不开。

产品更新还写：连上之后 Codex / ChatGPT 会带站点审计、CMS、安全发布、开发脚手架这些内置技能。那是插件包里的，不要去抄 Claude 的 \`claude plugin marketplace add webflow/webflow-skills\`。\`webflow/webflow-skills\` 仓库给 Codex 的路径是手拷 \`~/.codex/skills\`，不是这条插件主路径。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 也走 Plugins 搜 Webflow。改完用 \`codex plugin list\` 核对已装。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["MCP", "Webflow", "plugins", "OAuth"],
    related: ["hex-codex-plugin", "customerio-codex-plugin", "onesignal-codex-plugin"],
    sources: [
      {
        label: "Webflow · Connect Codex to Webflow",
        url: "https://help.webflow.com/hc/en-us/articles/53625430351507-Connect-Codex-to-Webflow",
      },
      {
        label: "Webflow · Webflow is now available in Codex",
        url: "https://webflow.com/updates/webflow-in-codex",
      },
      {
        label: "Webflow · Getting started",
        url: "https://developers.webflow.com/mcp/reference/getting-started",
      },
    ],
  },
  {
    id: "omni-mcp-http",
    no: 390,
    title: "Omni MCP 用 callbacks.omniapp.co/callback/mcp，API key 不要抄 Bearer 头",
    summary:
      "官方 Codex 专节：OAuth 用 callbacks.omniapp.co/callback/mcp。API key 才是实例的 /mcp/https，并加 --url 与 bearer_token_env_var。官方 Option A 漏了 --url。不要抄 http_headers 里的 Bearer。",
    body: `Omni 给 Codex 有专节。OAuth 是推荐路径。组织管理员先打开：Settings → General 的 Enable AI、AI Hub → Features 的 Omni Agent、AI Hub → MCP 的 MCP server，以及 Settings → API Keys → Personal tokens。OAuth 要 PAT 开关。查询工具和文档搜索跟 Omni Agent 同一条管线；关掉 Agent 后，除 pickModel 外都会 403 Feature is not enabled。

官方远程入口是 \`https://callbacks.omniapp.co/callback/mcp\`，带 \`/callback/mcp\`。官方 OAuth 命令：

\`\`\`bash
codex mcp add omni --url https://callbacks.omniapp.co/callback/mcp
codex
\`\`\`

\`\`\`toml
[mcp_servers.omni]
url = "https://callbacks.omniapp.co/callback/mcp"
enabled = true
\`\`\`

这是 MCP 入口，会在 OAuth 时把你路由到上次登录的 Omni 组织，**不是** Codex 自己的 loopback callback。加人多个组织时，先登出再登进要连的那个，马上跑登录。浏览器没弹再 \`codex mcp login omni\`。Omni 会自动建一颗 MCP OAuth PAT，跟普通 PAT 不是一类：任意用户（含 Viewer）都能走完流程，但权限仍跟应用内角色走，Viewer 查不了数。这些 PAT 目前不在 Omni 界面里显示。

API key 是另一条 URL。官方示例主机是 \`acme.omniapp.co\`，路径是 \`/mcp/https\`，**不是** \`/mcp\`：

\`\`\`bash
codex mcp add omni --url https://acme.omniapp.co/mcp/https --bearer-token-env-var OMNI_API_KEY
\`\`\`

\`\`\`toml
[mcp_servers.omni]
url = "https://acme.omniapp.co/mcp/https"
bearer_token_env_var = "OMNI_API_KEY"
enabled = true
\`\`\`

把 \`acme.omniapp.co\` 换成你的实例。官方 Option A 写成 \`codex mcp add omni https://…/mcp/https\`，**漏了** \`--url\`。那样会被当成 stdio 命令，不要抄。官方 TOML 还把 \`Authorization = "Bearer …"\` 写进 \`http_headers\`，**不要抄**：密钥会进仓库。Codex 用 \`bearer_token_env_var\`，读的是启动 Codex 那个进程里的变量名。从已经 export 的终端启动。Dock / 开始菜单打开的桌面没有 zshrc。Codex 不读 \`.env\`。

可选范围头可以留在 \`http_headers\`，它们不是密钥：\`X-MCP-Model-ID\`、\`X-MCP-Topic-Name\`、\`X-MCP-User-Required\`、\`X-MCP-User-ID\`、\`X-MCP-Query-All-Views\`。模型 ID 在模型页 URL 的 \`/models/…/ide/model\` 那段。\`X-MCP-Query-All-Views\` 要模型也打开 \`query_all_views_and_fields\`。同名表再 \`mcp add\` 一次会覆盖；OAuth 入口和 API key 入口不要配成两张都叫 \`omni\` 的表。

单次查询 \`getData\` / \`runQuery\` 默认关，要管理员打开 Single shot query generation。复杂分析才是 \`askOmni\` + \`checkStatus\`。改已有 dashboard 会进草稿，要人审再发布；新建 dashboard 会立刻发布。\`runQuery\` 默认 500 行、上限 10000，带 \`userEditedSQL\` 的请求会被拒。保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

先只读：问「Hey Omni, tell me how many users signed up last month」。工具没出来就彻底新开会话。

不要做这些：

- 不要发明 \`codex plugin add omni@openai-curated\`。官方没给 marketplace id。
- 不要抄 Claude 的 \`claude mcp add --transport http omni …\`，也不要抄 Claude Desktop 的 \`npx @omni-co/mcp\`。
- 不要抄 Cursor / VS Code JSON 的 \`headers.Authorization\`。
- 不要把 API key 写进 URL、\`http_headers\` 或 \`env\` 表。
- 不要把 OAuth 入口 \`callbacks.omniapp.co/callback/mcp\` 和实例 \`/mcp/https\` 搞成一条。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get omni\` 看传输是 streamable_http。OAuth 路径的 \`/mcp\` 应显示 Auth: OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Omni", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "mcp-mixpanel-remote"],
    sources: [
      {
        label: "Omni · Using the MCP Server in Codex",
        url: "https://docs.omni.co/ai/mcp/codex",
      },
      {
        label: "Omni · MCP authentication",
        url: "https://docs.omni.co/ai/mcp/authentication",
      },
      {
        label: "Omni · MCP server tools",
        url: "https://docs.omni.co/ai/mcp/tools",
      },
    ],
  },
  {
    id: "dagu-mcp-http",
    no: 391,
    title: "Dagu MCP 用 localhost:8080/mcp，密钥走 bearer_token_env_var",
    summary:
      "官方 Codex 专节：codex mcp add dagu --url，本机是 http://localhost:8080/mcp。builtin 鉴权加 --bearer-token-env-var DAGU_MCP_API_KEY。不要抄 Claude 的 --transport http 或 mcp-remote。",
    body: `Dagu 给 Codex 有专节。MCP 做在 Dagu HTTP 服务里，不用再装客户端包。先 \`dagu start-all\`。本机入口是 \`http://localhost:8080/mcp\`，**带** \`/mcp\`。官方写：只有客户端和 Dagu 在同一台机器时才用 localhost。远程换成 \`https://dagu.example.com/mcp\`。服务挂在 \`/dagu\` 这种 base path 时，MCP 在 \`https://dagu.example.com/dagu/mcp\`，漏了前缀会 404。

无鉴权（\`none\`）只给隔离本机：

\`\`\`bash
codex mcp add dagu --url http://localhost:8080/mcp
\`\`\`

\`builtin\` 鉴权要 API key。官方 Codex 命令：

\`\`\`bash
codex mcp add dagu --url http://localhost:8080/mcp --bearer-token-env-var DAGU_MCP_API_KEY
\`\`\`

\`\`\`toml
[mcp_servers.dagu]
url = "http://localhost:8080/mcp"
bearer_token_env_var = "DAGU_MCP_API_KEY"
enabled = true
\`\`\`

\`--bearer-token-env-var\` 填的是变量**名**，不是 key。Codex 读启动它那个进程里的 \`DAGU_MCP_API_KEY\`。先 export 再开 \`codex\`。Dock / 开始菜单打开的桌面没有 zshrc。Codex 不读 \`.env\`。客户端对照表写明：Codex 只走 Bearer，而且只从环境变量取。不要把 \`Authorization = "Bearer …"\` 写进 \`http_headers\`。不要 \`mcp login dagu\`：这不是 OAuth 服务器。

角色跟 Web UI / REST 同一套：\`viewer\` 只读，\`operator\` 能跑/停，\`developer\` 才能改 DAG。给 AI 的 key 尽量只开 \`mcp\` surface，别顺便放开 \`rest_api\`。先只读：让它 \`dagu_read\` \`dagu://reference/authoring\`。改工作流先 \`dagu_change\` 的 \`mode=preview\`，确认后再 \`apply\`。跑任务走 \`dagu_execute\`。保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

官方 Team Setup 把 Codex 标成 Not repository-scoped，密钥留在用户层 \`~/.codex/config.toml\`。不要把 Claude 的项目层 \`.mcp.json\` 抄进来。官方还写可以把 Dagu 表放进 \`$CODEX_HOME/.config.toml\` 做 profile；那不是 Codex 的 profile 文件。Profile 是 \`~/.codex/名字.config.toml\`，用 \`--profile\` 加载。

不要做这些：

- 不要发明 \`codex plugin add dagu@openai-curated\`。官方没给 marketplace id。
- 不要抄 Claude 的 \`claude mcp add --transport http dagu …\`，也不要抄 Cursor / VS Code JSON。
- 不要抄 Other Clients 的 \`npx mcp-remote\`。Dagu 只提供 Streamable HTTP，没有 SSE。Codex 自己连 HTTP。
- 不要把 key 拼进 URL 的 \`?token=\`。那是客户端不能带头时的退路。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get dagu\` 看传输是 streamable_http。会话里 \`/mcp\` 应列出 \`dagu_read\`、\`dagu_change\`、\`dagu_execute\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Dagu", "HTTP", "bearer_token_env_var"],
    related: ["mcp-http-bearer-env", "mcp-add-and-login", "litestream-mcp-http"],
    sources: [
      {
        label: "Dagu · Codex",
        url: "https://docs.dagu.sh/mcp/clients/codex",
      },
      {
        label: "Dagu · MCP Quickstart",
        url: "https://docs.dagu.sh/mcp/quickstart",
      },
      {
        label: "Dagu · MCP Clients",
        url: "https://docs.dagu.sh/mcp/clients/",
      },
    ],
  },
  {
    id: "prefect-codex-plugin",
    no: 392,
    title: "Prefect 插件用 prefect@prefect，stdio 不要抄 [mcp.prefect]",
    summary:
      "官方 Codex 插件：marketplace add prefecthq/prefect-mcp-server，再 plugin add prefect@prefect。Cloud OAuth，插件里不要 API key。本机 stdio 才 uvx --from prefect-mcp。官方 TOML 错写成 [mcp.prefect]。",
    body: `Prefect MCP 目前 beta。给 Codex 的**官方主路径**是插件：连 Prefect Cloud 托管只读 MCP，走 Cloud OAuth。插件里不要 API key，也不读 \`~/.prefect/profiles.toml\`。源仓是 \`prefecthq/prefect-mcp-server\`。marketplace.json 名是 \`prefect\`，插件 \`name\` 也是 \`prefect\`，所以 id 是 \`prefect@prefect\`。源仓 README 的 Codex Plugin 节：

\`\`\`bash
codex plugin marketplace add prefecthq/prefect-mcp-server
codex plugin add prefect@prefect
\`\`\`

0.154 起先在**当前会话**看 \`/plugins\`；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用桌面或 CLI。装完新开一轮，用 \`@\` 点名插件，或直接问「Why did my latest Prefect flow run fail?」。先让它 \`get_identity\`，确认当前连的是哪套工作区，再查失败的 flow run。托管模式下，工作区范围的工具还要带已授权的 \`workspace_id\`。

插件会登记托管入口 \`https://prefect.fastmcp.app/mcp\`，**带** \`/mcp\`。不要再手写一张同名 \`prefect\` 表。插件已经登记 MCP 就不要再 \`mcp add\` 同一张表。不要抄 Claude 的 \`claude mcp add --transport http prefect https://prefect.fastmcp.app/mcp\`。

自托管 Prefect、要钉某个 Cloud workspace、或插件装不上时，才走本机 stdio。官方 Codex CLI 节是 \`uvx --from prefect-mcp prefect-mcp-server\`：

\`\`\`bash
codex mcp add prefect -- uvx --from prefect-mcp prefect-mcp-server
\`\`\`

无环境变量时，stdio 继承当前 Prefect profile（\`~/.prefect/profiles.toml\`）。已经装了插件时，把本机表改名 \`prefect_local\`，不要覆盖插件那台。用户层表名用下划线；官方示例 \`prefect-local\` 带连字符，Codex 表名连字符容易踩坑。

显式钉 Cloud workspace 时，\`PREFECT_API_URL\` 可以写进 \`env\` 表（不是密钥）。从浏览器仪表板改写：地址是 \`https://app.prefect.cloud/account/\` 加账号 UUID、\`/workspace/\` 加工作区 UUID；MCP 用 \`https://api.prefect.cloud/api/accounts/\` 加同一账号 UUID、\`/workspaces/\` 再加工区 UUID。密钥 \`PREFECT_API_KEY\` **不要**抄官方的 \`--env PREFECT_API_KEY=...\`，那会把字面量写进 config。用 \`env_vars\` 从启动 Codex 的进程转发：

\`\`\`toml
[mcp_servers.prefect]
command = "uvx"
args = ["--from", "prefect-mcp", "prefect-mcp-server"]
env_vars = ["PREFECT_API_KEY"]
startup_timeout_sec = 60
enabled = true

[mcp_servers.prefect.env]
PREFECT_API_URL = "https://api.prefect.cloud/api/accounts/ACCOUNT_UUID/workspaces/WORKSPACE_UUID"
\`\`\`

把 \`ACCOUNT_UUID\` / \`WORKSPACE_UUID\` 换成仪表板里的 UUID。自托管改成例如 \`http://127.0.0.1:4200/api\`，并把 \`env_vars\` 换成 \`PREFECT_API_AUTH_STRING\`（格式是 \`username:password\`），不要再用 Cloud 的 API key。Team / Pro / Enterprise 可用只读服务账号。\`env\` 表是字面量。Codex 不读 \`.env\`。从已经 export 的终端启动。Dock / 开始菜单打开的桌面没有 zshrc。

官方手写 TOML **错写成** \`[mcp.prefect]\` 和 \`[mcp.prefect.env]\`。Codex 正确键是 \`[mcp_servers.prefect]\` 和 \`[mcp_servers.prefect.env]\`。不要抄。

MCP 工具本身只读：看 dashboard、deployment、flow run、日志、work pool，以及文档代理。创建或改资源走 \`prefect\` CLI，不要指望 MCP 写入。只读 MCP 凭证**拦不住**模型在 shell 里跑 \`prefect deployment delete\`。保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。冷 \`uvx\` 可能慢，才加 \`startup_timeout_sec = 60\`。

不要做这些：

- 不要发明 \`prefect@openai-curated\`。官方 id 就是 \`prefect@prefect\`。
- 不要抄 Claude 的 \`/plugin marketplace add prefecthq/prefect-mcp-server\` 或 \`/plugin install prefect\`。
- 不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor JSON 或 \`npx mcp-remote\`。
- 不要把自建 Horizon 的 \`*.fastmcp.app/mcp\` 当成 Codex 主路径。那台的 Prefect 凭据配在 Horizon 上。
- 不要把 \`PREFECT_API_KEY\` 写进 \`env\` 表、\`args\` 或 \`http_headers\`。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex plugin list\` 核对已装。stdio 对照 \`codex mcp get prefect\` 看 command 是 \`uvx\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Prefect", "plugins", "OAuth", "stdio"],
    related: ["honeycomb-codex-plugin", "mcp-stdio-env-vars", "mcp-add-and-login"],
    sources: [
      {
        label: "Prefect · How to use the Prefect MCP server",
        url: "https://docs.prefect.io/v3/how-to-guides/ai/use-prefect-mcp-server",
      },
      {
        label: "prefecthq/prefect-mcp-server",
        url: "https://github.com/prefecthq/prefect-mcp-server",
      },
      {
        label: "prefect-mcp-server · SECURITY.md",
        url: "https://github.com/PrefectHQ/prefect-mcp-server/blob/main/SECURITY.md",
      },
    ],
  },
  {
    id: "windmill-mcp-http",
    no: 393,
    title: "Windmill MCP 用 mcp.gowindmill.com/mcp 再 login",
    summary:
      "官方 Codex 专节：codex mcp add windmill --url https://mcp.gowindmill.com/mcp，再 mcp login windmill。这是 gowindmill 的 1:1 产品，不是 windmill.dev。不要发明 plugin add，不要抄 Claude 的 --transport http。",
    body: `这是 \`gowindmill.com\` 的 1:1 / People 产品，**不是** \`windmill.dev\` 工作流平台。给 Codex 有专节。远程入口是 \`https://mcp.gowindmill.com/mcp\`，**带** \`/mcp\`。鉴权是个人账号 OAuth，权限跟你在 Windmill Dashboard 里能看见的一样；Dashboard 有的动作，MCP 不一定都暴露。每人在自己的 Codex 里加一次、登一次，不要共用别人的登录。

官方 Codex 命令：

\`\`\`bash
codex mcp add windmill --url https://mcp.gowindmill.com/mcp
codex mcp login windmill
\`\`\`

\`\`\`toml
[mcp_servers.windmill]
url = "https://mcp.gowindmill.com/mcp"
enabled = true
\`\`\`

浏览器没弹再跑 \`codex mcp login windmill\`。第一次调工具时也会跳到浏览器。OAuth 刷新在后台转，没有 Dashboard 那种大约七天过期；卸掉服务器、管理员撤掉 connector、或会话被作废时才要重登。卸掉用 \`codex mcp remove windmill\`。

连上后先只读：问「What 1:1s do I have coming up this week?」或让它读最近一次 Pulse。可以改 1:1 议程、发 Pulse、写反馈和 shoutout；绩效评审只能读，不能起草或提交，也不能发评审催办。公开 MCP 不能移除 workspace 成员。私人笔记只能动你自己的。改组织数据要保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要和 Settings → Integrations 里的 Codex 分析搞混。那条要 ChatGPT Enterprise / Codex 计划，管理员贴 API key 和 Workspace ID，读的是线程 / 额度 / token 用量，**不读**代码和对话，也**不是**这条 MCP。

不要做这些：

- 不要发明 \`codex plugin add windmill@\`。\`windmill-dev/windmill-plugin\` 只给 Claude 付费计划，不是 Codex marketplace id。
- 不要抄 Claude 的 \`claude mcp add --transport http windmill https://mcp.gowindmill.com/mcp\`，也不要抄 Cursor 的 \`~/.cursor/mcp.json\`。
- 不要抄 \`npx mcp-remote\`。官方写的是 Streamable HTTP。
- 不要把 API key 写进 URL 或 \`http_headers\`。这条走 OAuth。
- 不要给它 \`required = true\` 挂全局。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get windmill\` 看传输是 streamable_http。会话里 \`/mcp\` 的 Auth 应显示 OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Windmill", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "mcp-mixpanel-remote", "loops-mcp-http"],
    sources: [
      {
        label: "Windmill · MCP",
        url: "https://help.gowindmill.com/features/mcp",
      },
      {
        label: "Windmill · Codex integration",
        url: "https://help.gowindmill.com/integrations/codex",
      },
      {
        label: "Windmill · Pulse Surveys",
        url: "https://help.gowindmill.com/features/pulse-surveys",
      },
    ],
  },
  {
    id: "reui-mcp-http",
    no: 394,
    title: "ReUI MCP 用 mcp.reui.io，不要加 /mcp，OAuth 和 bearer 不要叠",
    summary:
      "官方 Codex：mcp add reui --url https://mcp.reui.io，再 mcp login reui。不要加 /mcp。无头才 bearer_token_env_var REUI_LICENSE_KEY。安装器可能写成 /api/mcp。不要把 components.json 的占位符抄进 http_headers。",
    body: `ReUI 给 Codex 有专节。远程入口是 \`https://mcp.reui.io\`，**没有** \`/mcp\` 后缀。Streamable HTTP。先 OAuth：

\`\`\`bash
codex mcp add reui --url https://mcp.reui.io
codex mcp login reui
\`\`\`

\`\`\`toml
[mcp_servers.reui]
url = "https://mcp.reui.io"
enabled = true
\`\`\`

浏览器会开 Sign in with ReUI。没有账号会在这一步建免费号。\`codex mcp list\` 应列出 \`reui\`。TUI 里 \`/mcp\` 看是否还要授权。

无头 / CI 才走个人 token。到 Account → MCP 建，样子是 \`reui_pat_\` 开头，只显示一次。官方 Codex 命令：

\`\`\`bash
codex mcp add reui --url https://mcp.reui.io --bearer-token-env-var REUI_LICENSE_KEY
\`\`\`

\`\`\`toml
[mcp_servers.reui]
url = "https://mcp.reui.io"
bearer_token_env_var = "REUI_LICENSE_KEY"
enabled = true
\`\`\`

\`--bearer-token-env-var\` 填变量**名**。Codex 读启动它那个进程里的 \`REUI_LICENSE_KEY\`。Codex 不读 \`.env.local\`。Dock / 开始菜单打开的桌面没有 zshrc。从已经 export 的终端启动。

Bearer 和 \`mcp login\` **是两条路，不要叠**。配置了 \`bearer_token_env_var\` / \`http_headers\` / \`env_http_headers\` 时，每次请求都带这颗头，会盖掉已存的 OAuth。于是登录看起来成功，调用却一直 401。交互路径把这些头删掉。PAT 过期或吊销时 \`mcp login\` 救不了，要去 Account → MCP 换新 token。401 响应体会写明是 OAuth 还是 PAT。

官方还写：安装器可能把 URL 写成 \`https://mcp.reui.io/api/mcp\`。以专节的 \`codex mcp add reui --url https://mcp.reui.io\` 为准。不要自己加 \`/mcp\`。改完用 \`codex mcp get reui\` 看 url。

不要把 \`components.json\` 里的 \`\${REUI_LICENSE_KEY}\` 抄进 \`http_headers\`。那是 shadcn CLI 从 \`.env.local\` 展开的写法，Codex 的 TOML **不会**展开，服务器会收到字面量然后 401。Premium 组件才把许可证写进 \`.env.local\` 和 \`@reui\` registry 头，那是 shadcn 安装器用的，不是这条 MCP OAuth。

技能安装器官方是 \`curl -fsSL https://mcp.reui.io/install | node -\`，会往项目里丢 ReUI skill。不要发明 \`codex plugin add reui@\`。不要抄 Claude 的 \`--transport http\` 或 \`npx mcp-remote\`。

免费档大约每天 100 次工具调用；22 个组件和 \`c-*\` 示例不用许可证。装 premium 才要 Pro / Ultimate。先问「Use ReUI to scaffold an admin app」。工具灰掉就 \`codex mcp login reui\` 再新开会话。不要 \`required = true\`。不要一上来 \`--yolo\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get reui\` 看传输是 streamable_http。OAuth 路径的 Auth 应显示 OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "ReUI", "OAuth", "HTTP", "bearer_token_env_var"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "shadcn-mcp-stdio"],
    sources: [
      {
        label: "ReUI · Codex",
        url: "https://reui.io/docs/codex",
      },
      {
        label: "ReUI · MCP Server",
        url: "https://reui.io/docs/mcp",
      },
      {
        label: "ReUI · License Setup",
        url: "https://reui.io/docs/license-setup",
      },
    ],
  },
  {
    id: "alloy-mcp-http",
    no: 395,
    title: "Alloy MCP 用 mcp.alloy.app/mcp，不要和 alloy.cx 搞混",
    summary:
      "官方 Codex：mcp add alloy --url https://mcp.alloy.app/mcp，再 mcp login alloy。这是 alloy.app 原型会话。无头才 ALLOY_MCP_API_KEY。不要抄 mcp-remote 的 X-MCP-API-Key，不要发明 plugin add。",
    body: `这是 \`alloy.app\` 的原型 / 开发会话工具，**不是** \`alloy.cx\` 知识库，也**不是** \`mcp.index.inc\` 那家 Planning and Feedback。给 Codex 有专节。远程入口是 \`https://mcp.alloy.app/mcp\`，**带** \`/mcp\`。Streamable HTTP。先 OAuth：

\`\`\`bash
codex mcp add alloy --url https://mcp.alloy.app/mcp
codex mcp login alloy
\`\`\`

\`\`\`toml
[mcp_servers.alloy]
url = "https://mcp.alloy.app/mcp"
enabled = true
\`\`\`

桌面走 Settings → Integrations & MCP，名字填 Alloy，URL 填同一条。CLI / 桌面 / IDE 共用这份配置。浏览器没弹再跑 \`codex mcp login alloy\`。\`codex mcp list\` 应列出 \`alloy\`。TUI 里 \`/mcp\` 看是否还要授权。

已经配过 bearer 的 \`alloy\` 表，先卸再走 OAuth：

\`\`\`bash
codex mcp remove alloy
codex mcp add alloy --url https://mcp.alloy.app/mcp
codex mcp login alloy
\`\`\`

无头 / CI 才走工作区 MCP key。到 Alloy 工作区 Settings → MCP 建。官方 Codex 专节：

\`\`\`toml
[mcp_servers.alloy]
url = "https://mcp.alloy.app/mcp"
bearer_token_env_var = "ALLOY_MCP_API_KEY"
enabled = true
\`\`\`

\`bearer_token_env_var\` 填变量**名**。把密钥 export 成 \`ALLOY_MCP_API_KEY\`。Codex 读启动它那个进程里的环境。Codex 不读 \`.env\`。Dock / 开始菜单打开的桌面没有 zshrc。从已经 export 的终端启动。密钥按工作区划界，只能读那个工作区里的会话。

Bearer 和 \`mcp login\` **是两条路，不要叠**。配置了 \`bearer_token_env_var\` / \`http_headers\` / \`env_http_headers\` 时，每次请求都带这颗头，会盖掉已存的 OAuth。于是登录看起来成功，调用却一直 401。交互路径把这些头删掉。

总览页给只懂 stdio 的客户端写了 \`npx mcp-remote\`，密钥头是 \`X-MCP-API-Key\`。那不是 Codex 路径。不要抄 \`--transport http\`，不要把 \`X-MCP-API-Key\` 写进 \`http_headers\`。Codex 无头按专节用 \`ALLOY_MCP_API_KEY\`。

不要发明 \`codex plugin add alloy@\`。\`alloy.cx\` 的 \`work-with-alloy\` 插件读的是 \`ALLOY_TOKEN\` 和 \`api.alloy.cx\`，不是这条。若文档写成 \`https://mcp.index.inc/mcp\`，那是另一家产品，表名也叫 \`alloy\`，先 \`codex mcp get alloy\` 看 url。

粘贴 Alloy 会话链接，让它汇总聊天、列文件、读原型内容或开发会话 diff。会话必须属于你授权的那个工作区。不要 \`required = true\`。不要一上来 \`--yolo\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完彻底新开会话。用 \`codex mcp get alloy\` 看传输是 streamable_http。OAuth 路径的 Auth 应显示 OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Alloy", "OAuth", "HTTP", "bearer_token_env_var"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "windmill-mcp-http"],
    sources: [
      {
        label: "Alloy · Codex MCP",
        url: "https://alloy.app/guide/integrations/codex-mcp",
      },
      {
        label: "Alloy · MCP",
        url: "https://alloy.app/guide/integrations/mcp",
      },
      {
        label: "Alloy · Alloy MCP",
        url: "https://alloy.app/launches/alloy-mcp",
      },
    ],
  },
  {
    id: "firebase-agent-skills",
    no: 396,
    title: "Firebase 技能用 marketplace 加 firebase/agent-skills，不要抄 firebase-tools",
    summary:
      "官方 Codex：marketplace add firebase/agent-skills，再 plugin add firebase@firebase。README 写成 firebase/skills，以文档专节为准。不要抄 Claude 的 firebase/firebase-tools。不要用 npx skills add 当插件安装器。",
    body: `Firebase 给 Codex 有专节，写在 Agent Skills 文档。这是官方插件，不是手拷 SKILL.md。CLI：

\`\`\`bash
codex plugin marketplace add firebase/agent-skills
codex plugin add firebase@firebase
\`\`\`

桌面先在终端跑完 \`marketplace add\`，**彻底重启** Codex 应用，再打开 Plugins，选 Firebase 源，点 Install。新任务里用 \`@Firebase\` 选这份插件，或直接提 Firebase 任务。

升级先刷新仓快照：

\`\`\`bash
codex plugin marketplace upgrade firebase
\`\`\`

刷新捡不到再卸再装：

\`\`\`bash
codex plugin remove firebase@firebase
codex plugin add firebase@firebase
\`\`\`

GitHub README 的 Option 4 写成 \`firebase/skills\`。文档专节是 \`firebase/agent-skills\`。\`github.com/firebase/skills\` 会转到 \`firebase/agent-skills\`。**以文档专节为准。** 不要把 README 那条当 Codex marketplace 源。

0.154 起先看**当前会话**的 \`/plugins\`，应能看到 \`firebase@firebase\`。没有再新开。IDE 扩展没有 \`/plugins\`。不要一上来 \`/new\`。

技能举例：\`firebase-basics\`、\`firebase-auth-basics\`、\`firebase-firestore-standard\`、\`firebase-app-hosting-basics\`、\`firebase-crashlytics\`。文档说技能应和 Firebase MCP **互补**：技能教工作流和护栏，MCP 才去动项目里的资源。

Firebase **MCP 页没有 Codex 专节**。它只列 Antigravity / Claude / Cursor / VS Code / Firebase Studio。stdio 启动命令各家一样是 \`npx -y firebase-tools@latest mcp\`，鉴权走本机 \`firebase login\` 或 ADC，**不要**再 \`mcp login\`。插件主路径装不上、只要这台 MCP 时，才手写用户层回退：

\`\`\`bash
codex mcp add firebase -- npx -y firebase-tools@latest mcp
\`\`\`

\`\`\`toml
[mcp_servers.firebase]
command = "npx"
args = ["-y", "firebase-tools@latest", "mcp"]
enabled = true
startup_timeout_sec = 60
\`\`\`

这不是官方 Codex \`mcp add\` 主路径，也不要发明远程 \`--url\`。npx 冷启动慢，超时就加大 \`startup_timeout_sec\`。MCP / CLI 会改 Firebase 项目，保持工具批准。不要 \`required = true\`。不要一上来 \`--yolo\`。

不要做这些：

- 不要抄 Claude MCP 插件：\`claude plugin marketplace add firebase/firebase-tools\` 再 \`claude plugin install firebase@firebase\`。那是 **firebase-tools** marketplace，和技能仓不是同一个源，虽然插件 id 都叫 \`firebase@firebase\`。
- 不要把 Claude 技能命令 \`claude plugin marketplace add firebase/agent-skills\` / \`claude plugin install firebase@firebase\` 当成 Codex 命令。Codex 是 \`codex plugin marketplace add\` 加 \`codex plugin add\`。
- 不要用 \`npx skills add firebase/agent-skills\`（或 README 的 \`firebase/skills\`）当 Codex 插件安装器。那是 Other agents / Cursor（\`--agent=cursor\`）拷 SKILL.md，不会走 Codex marketplace。
- 不要和 \`google/skills\` 的 \`google-cloud-developer@google-plugins\` 搞混。
- 不要发明别的 \`plugin add firebase@…\` id。官方就是 \`firebase@firebase\`。
- 不要手拷到 \`~/.codex/skills\`。现行个人目录是 \`~/.agents/skills\`，而且那条不会登记插件。

网页 Cloud 不读本机 marketplace。改完用 \`codex plugin list\` 核对 \`firebase@firebase\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Firebase", "Skills", "MCP"],
    related: ["google-cloud-developer-plugin", "plugin-session-refresh", "azure-skills-plugin"],
    sources: [
      {
        label: "Firebase · Agent skills",
        url: "https://firebase.google.com/docs/ai-assistance/agent-skills",
      },
      {
        label: "firebase/agent-skills",
        url: "https://github.com/firebase/agent-skills",
      },
      {
        label: "Firebase · MCP server",
        url: "https://firebase.google.com/docs/ai-assistance/mcp-server",
      },
    ],
  },
  {
    id: "mintlify-admin-mcp",
    no: 397,
    title: "Mintlify Admin MCP 用 mcp.mintlify.com，不要和文档检索叠表",
    summary:
      "官方 Codex：mcp add mintlify --url https://mcp.mintlify.com，再 mcp login。不要加 /mcp。写作指南把同名表写成 mintlify.com/docs/mcp，不要叠成一台。OAuth，不要发明 plugin add。",
    body: `这是 Mintlify **Admin MCP**：改文档内容、导航、\`docs.json\` 和部分仪表盘设置，并能开 PR。给 Codex 有专节。远程入口是 \`https://mcp.mintlify.com\`，**不要加** \`/mcp\`。Streamable HTTP。必须交互 OAuth，官方没给 API key / bearer 路径。

官方 TOML：

\`\`\`toml
[mcp_servers.mintlify]
url = "https://mcp.mintlify.com"
enabled = true
\`\`\`

CLI 等价：

\`\`\`bash
codex mcp add mintlify --url https://mcp.mintlify.com
codex mcp login mintlify
\`\`\`

桌面走 Settings → Integrations & MCP，名字填 mintlify，URL 填同一条。CLI / 桌面 / IDE 共用这份配置。浏览器没弹再跑 \`codex mcp login mintlify\`。\`codex mcp list\` 应列出 \`mintlify\`。TUI 里 \`/mcp\` 看是否还要授权。

**两份官方文档都用了 mintlify 这张表，不要叠成一台：**

| 用途 | URL | 官方写在 |
| --- | --- | --- |
| Admin（写文档、开 PR） | \`https://mcp.mintlify.com\` | Admin MCP 的 Codex 专节 |
| 文档检索（只读） | \`https://mintlify.com/docs/mcp\` | 写作指南 / Search MCP 的 Codex 示例 |

写作指南和 Search MCP 页的 Codex 示例都是 \`[mcp_servers.mintlify]\` 指向 \`https://mintlify.com/docs/mcp\`。那会**盖掉** Admin。文档检索另开表：

\`\`\`bash
codex mcp add mintlify-docs --url https://mintlify.com/docs/mcp
\`\`\`

自己站点的检索 MCP 在站点域名后面加 \`/mcp\`，再另起表名，不要覆盖 \`mintlify\`。全站索引是 \`https://index.mintlify.com\`，又是第三台。

Admin 会改文档。会话先 \`checkout\` 绑到一条分支，再改，再用 \`save\` 开 PR。部署管理（工作流、成员、账单、集成）是 Code mode，**立刻写进线上**，没有 PR。保持工具批准。不要 \`required = true\`。不要一上来 \`--yolo\`。

不要做这些：

- 不要给 \`https://mcp.mintlify.com\` 再拼 \`/mcp\`。
- 不要抄 Claude 的 \`claude mcp add --transport http mintlify https://mcp.mintlify.com\`。
- 不要发明 \`codex plugin add mintlify@\`。
- 不要把 \`npx skills add https://mintlify.com/docs\` 当 Admin MCP。那是技能安装器。
- 不要叠 OAuth 和 \`bearer_token_env_var\` / \`http_headers\`。官方要求交互登录。
- 不要把 Cursor 的 \`mcp.json\` 或 ChatGPT 应用目录连接器当 CLI 主路径。

卸掉：删 \`~/.codex/config.toml\` 里的 \`[mcp_servers.mintlify]\`。仪表盘 Settings → Security & access → Connected apps 撤销授权。已经开出去的 PR 不会跟着关。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex mcp get mintlify\` 看 url 是 \`https://mcp.mintlify.com\`，传输是 streamable_http。OAuth 路径的 Auth 应显示 OAuth。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Mintlify", "OAuth", "HTTP"],
    related: ["mcp-add-and-login", "alloy-mcp-http", "windmill-mcp-http"],
    sources: [
      {
        label: "Mintlify · Admin MCP",
        url: "https://www.mintlify.com/docs/ai/mintlify-mcp",
      },
      {
        label: "Mintlify · Write documentation with Codex",
        url: "https://www.mintlify.com/docs/guides/codex",
      },
      {
        label: "Mintlify · Search MCP",
        url: "https://www.mintlify.com/docs/ai/model-context-protocol",
      },
    ],
  },
  {
    id: "squirrelscan-mcp-http",
    no: 398,
    title: "Squirrelscan 托管 MCP 用 mcp.squirrelscan.com/mcp，不要和本地 squirrel mcp 叠",
    summary:
      "官方 Codex：mcp add squirrelscan --url https://mcp.squirrelscan.com/mcp，再 mcp login。必须带 /mcp。无头才 SQUIRRELSCAN_API_KEY。不要叠 OAuth 和 bearer。不要写 experimental_environment。不要发明 plugin add。",
    body: `这是 squirrelscan **托管** MCP：云端审计、报告、issue tracker 和规则目录。给 Codex 有专节。远程入口是 \`https://mcp.squirrelscan.com/mcp\`，**必须带** \`/mcp\`。Streamable HTTP。交互走 OAuth；无头 / CI 才 Bearer。

官方 TOML（OAuth 路径不要写 bearer）：

\`\`\`toml
[mcp_servers.squirrelscan]
url = "https://mcp.squirrelscan.com/mcp"
enabled = true
\`\`\`

CLI 等价：

\`\`\`bash
codex mcp add squirrelscan --url https://mcp.squirrelscan.com/mcp
codex mcp login squirrelscan
\`\`\`

桌面走 Settings → Integrations & MCP，名字填 squirrelscan，URL 填同一条。CLI / 桌面 / IDE 共用这份配置。浏览器没弹再跑 \`codex mcp login squirrelscan\`。\`codex mcp list\` 应列出 squirrelscan。TUI 里 \`/mcp\` 看是否还要授权。

**三件事不要叠成一台：**

| 用途 | 怎么接 | 说明 |
| --- | --- | --- |
| 托管 MCP（issue tracker、渲染、credits） | \`https://mcp.squirrelscan.com/mcp\` + \`mcp login\` | 官方 Codex 主路径 |
| 无头 / CI | 同一 URL + \`bearer_token_env_var = "SQUIRRELSCAN_API_KEY"\` | 不要再 \`mcp login\` |
| 本机 \`squirrel mcp\` | stdio，免费离线审计 | 另起表名，不要覆盖 squirrelscan |

本地 CLI（\`curl -fsSL https://install.squirrelscan.com | bash\`）是 \`squirrel\` 二进制，用来跑 \`squirrel audit\`。那不是 MCP。CLI 自带的 \`squirrel mcp\` 是 **stdio** 本地引擎：免费、可离线、可扫 localhost。托管才有共享组织状态、issue tracker 和浏览器渲染。两台不要写进同一张 \`[mcp_servers.squirrelscan]\`。本机 stdio 另开表，例如 squirrelscan-local。

不要给这台写 \`experimental_environment\`。那是 stdio 走远端执行器的键，**不支持** Streamable HTTP。

无头：

\`\`\`bash
codex mcp add squirrelscan --url https://mcp.squirrelscan.com/mcp --bearer-token-env-var SQUIRRELSCAN_API_KEY
\`\`\`

\`bearer_token_env_var\` 填变量**名**。把密钥 export 成 \`SQUIRRELSCAN_API_KEY\`。Codex 读启动它那个进程里的环境。Codex 不读 \`.env\`。Dock / 开始菜单打开的桌面没有 zshrc。从已经 export 的终端启动。用 \`squirrel keys create --shell\` 铸钥匙。

Bearer 和 \`mcp login\` **是两条路，不要叠**。配置了 \`bearer_token_env_var\` / \`http_headers\` / \`env_http_headers\` 时，每次请求都带这颗头，会盖掉已存的 OAuth。于是登录看起来成功，调用却一直 401。交互路径把这些头删掉。

\`codex mcp add\` / \`mcp login\` 只写全局 \`~/.codex/config.toml\`。要限定一个项目，把手写的 \`[mcp_servers.squirrelscan]\` 块放进该项目 \`.codex/config.toml\`，项目受信任后才生效。

\`run_audit\` 会花 credits。估算超过阈值时第一次调用只返回估价，确认后再带 confirm 跑。保持工具批准。不要 \`required = true\`。不要一上来 \`--yolo\`。

技能是可选补充，不是 MCP 安装器。官方 Codex 页是 \`npx skills add squirrelscan/squirrelscan\`，没钉 \`--agent codex\`。技能进 \`~/.agents/skills\`。不要发明 \`codex plugin add squirrelscan@\`。

不要做这些：

- 不要把 \`https://mcp.squirrelscan.com/mcp\` 的 \`/mcp\` 砍掉。
- 不要抄 Claude 的 \`claude mcp add --transport http squirrelscan https://mcp.squirrelscan.com/mcp\`。
- 不要发明 \`codex plugin add squirrelscan@\`。
- 不要把 \`npx skills add squirrelscan/squirrelscan\` 当 MCP 安装器。
- 不要叠 OAuth 和 bearer。
- 不要把 API key 写进 \`http_headers\` 或 \`args\`。
- 不要抄 Cursor 的 \`mcp.json\`，也不要抄 \`/sse\`。
- 不要用 \`npx mcp-remote\`。
- 不要把本机 \`squirrel mcp\` stdio 覆盖托管那张表。

卸掉：\`codex mcp logout squirrelscan\`，再删 \`~/.codex/config.toml\` 里的 \`[mcp_servers.squirrelscan]\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex mcp get squirrelscan\` 看 url 是 \`https://mcp.squirrelscan.com/mcp\`，传输是 streamable_http。OAuth 路径的 Auth 应显示 OAuth。Bearer 路径应显示 \`SQUIRRELSCAN_API_KEY\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Squirrelscan", "OAuth", "HTTP", "bearer_token_env_var"],
    related: ["mcp-add-and-login", "alloy-mcp-http", "mintlify-admin-mcp"],
    sources: [
      {
        label: "squirrelscan · Codex",
        url: "https://docs.squirrelscan.com/developers/agents/codex",
      },
      {
        label: "squirrelscan · MCP clients",
        url: "https://docs.squirrelscan.com/developers/mcp-clients",
      },
      {
        label: "squirrelscan · Hosted MCP",
        url: "https://docs.squirrelscan.com/developers/mcp",
      },
    ],
  },
  {
    id: "planetscale-codex-plugin",
    no: 399,
    title: "PlanetScale 插件用 marketplace 加 planetscale/codex-plugin，不要加成 claude-plugin",
    summary:
      "官方 Codex 插件仓：marketplace add planetscale/codex-plugin，再 plugin add planetscale@planetscale。Claude 源是 planetscale/claude-plugin，装完 id 碰巧一样。文档 Codex 专节仍是 mcp add，只要 MCP 走那条。插件 MCP 表名是 PlanetScale。",
    body: `PlanetScale 给 Codex 另有一份**插件仓**，把托管 MCP 和技能打在一起。源是 \`planetscale/codex-plugin\`，不是文档 Claude 节里的 \`planetscale/claude-plugin\`。

\`\`\`bash
codex plugin marketplace add planetscale/codex-plugin
codex plugin add planetscale@planetscale
\`\`\`

清单 \`.agents/plugins/marketplace.json\` 的 name 是 planetscale，插件 name 也是 planetscale，所以是 \`planetscale@planetscale\`。官方 README 只写了 \`marketplace add\`，桌面再在 Plugins 装 PlanetScale。CLI 按清单是上面这条。

桌面先在终端跑完 \`marketplace add\`，**彻底重启** Codex 应用，再打开 Plugins，选 PlanetScale 源，点 Install。新任务里用 \`@PlanetScale\` 或直接提数据库任务。

升级先刷新仓快照：

\`\`\`bash
codex plugin marketplace upgrade planetscale
\`\`\`

0.154 起先看**当前会话**的 \`/plugins\`，应能看到 \`planetscale@planetscale\`。没有再新开。IDE 扩展没有 \`/plugins\`。不要一上来 \`/new\`。

插件捆绑的 MCP 写在 \`.mcp.json\`，表名是 **PlanetScale**（首字母大写），URL 仍是 \`https://mcp.pscale.dev/mcp/planetscale\`。装完若 \`/mcp\` 没有，先重启，再：

\`\`\`bash
codex mcp login PlanetScale
\`\`\`

文档 Codex 专节仍是 \`codex mcp add planetscale --url https://mcp.pscale.dev/mcp/planetscale\`。那是只要 MCP、不要技能的路径，表名是小写 planetscale。已经手写过小写表时，不要再叠一张大写 PlanetScale 指同一 URL。CI / 无头仍走小写表的 \`PLANETSCALE_API_TOKEN\`，不要给插件那张再叠 bearer。

技能来自两份上游：操作技能（例如 \`safe-orchestrator\`）和引擎技能（\`database-mysql\`、\`database-postgres\`、\`database-vitess\`、\`database-neki\`）。索引在 \`skills/planetscale\` 和 \`skills/database\`。不要用 \`npx skills add planetscale/skills\` 当 Codex 插件安装器。

MCP 能跑 SQL。写查询会拦没有 WHERE 的 UPDATE / DELETE，也会拦 TRUNCATE；DDL 仍要人同意。生产库不要一上来给写权限。不要 \`required = true\`。不要一上来 \`--yolo\`。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add planetscale/claude-plugin\` 或 \`/plugin install planetscale@planetscale\`。装完 id 碰巧一样，**源仓不是同一个**。
- 不要发明 \`plugin add planetscale@codex-plugin\`。清单 name 是 planetscale。
- 不要把 \`npx skills add\` 当插件安装器。
- 不要抄 Claude 的 \`claude mcp add --transport http planetscale …\`。
- 不要跑已删除的 \`pscale mcp\` 本地服务器。
- 不要把手写小写 \`planetscale\` 表和插件大写 \`PlanetScale\` 叠成两台。

网页 Cloud 不读本机 marketplace。改完用 \`codex plugin list\` 核对 \`planetscale@planetscale\`；\`codex mcp get PlanetScale\` 看 url 是 \`https://mcp.pscale.dev/mcp/planetscale\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "PlanetScale", "Skills", "MCP"],
    related: ["mcp-planetscale-remote", "firebase-agent-skills", "plugin-session-refresh"],
    sources: [
      {
        label: "planetscale/codex-plugin",
        url: "https://github.com/planetscale/codex-plugin",
      },
      {
        label: "planetscale/skills",
        url: "https://github.com/planetscale/skills",
      },
      {
        label: "PlanetScale · MCP",
        url: "https://planetscale.com/docs/connect/mcp",
      },
    ],
  },
  {
    id: "geoly-codex-plugin",
    no: 400,
    title: "GEOly 插件用 marketplace 加 geoly-ai/codex-plugins，再 plugin add geoly-mcp@geoly",
    summary:
      "官方 Codex：marketplace add geoly-ai/codex-plugins，再 plugin add geoly-mcp@geoly。CLI 动词是 add 不是 install。marketplace upgrade geoly 不够，还要再 plugin add。插件 MCP 表名是 geoly。远程是 app.geoly.ai/api/mcp。",
    body: `GEOly 给 Codex 有专节，写在 MCP 文档。这是官方插件仓，把托管 MCP 和 \`geoly-mcp\` 技能打在一起。源是 \`geoly-ai/codex-plugins\`。

\`\`\`bash
codex plugin marketplace add geoly-ai/codex-plugins
codex plugin add geoly-mcp@geoly
\`\`\`

清单 \`.agents/plugins/marketplace.json\` 的 name 是 geoly，插件 name 是 geoly-mcp，所以是 \`geoly-mcp@geoly\`。不要发明 \`geoly@geoly\`。CLI 动词是 \`plugin add\`，不是 \`install\`。会话斜杠才是 \`/plugin install geoly-mcp@geoly\`。

装上策略是 \`ON_INSTALL\`，应弹出 GEOly OAuth。没弹再：

\`\`\`bash
codex mcp login geoly
\`\`\`

桌面先在终端跑完 \`marketplace add\` 和 \`plugin add\`，**彻底退出** Codex 应用再开。桌面若 OAuth 后工具仍不出现，官方建议改走 CLI。0.154 起先看**当前会话**的 \`/plugins\`，应能看到 \`geoly-mcp@geoly\`。没有再新开。IDE 扩展没有 \`/plugins\`。不要一上来 \`/new\`。

过时工具不要只刷新目录。官方 FAQ 和仓库 README 都说 \`marketplace upgrade\` **不够**：它只拉新清单，不更新已装副本。三步：

\`\`\`bash
codex plugin marketplace upgrade geoly
codex plugin add geoly-mcp@geoly
\`\`\`

然后彻底退出并新开会话。授权过期再接 OAuth。卸插件：

\`\`\`bash
codex plugin remove geoly-mcp
codex plugin marketplace remove geoly
\`\`\`

插件 MCP 表名是小写 \`geoly\`。远程 URL 是 \`https://app.geoly.ai/api/mcp\`。这是 \`/api/mcp\`，不要再拼一层 \`/mcp\`，也不要发明 \`mcp.geoly.ai\`。插件 \`.mcp.json\` 还带 \`oauth_resource\` 指向同一地址，以及静态头 \`X-Client-Name\` / \`X-Client-Version\`。不要把版本头手抄进用户层当主路径。不要把手写 \`[mcp_servers.geoly]\` 和插件那张表叠成两台。

多组织授权默认只读；写操作要钉一个组织。远程 URL 可加查询参数 \`org_id\`，把组织 id 接在等号后面。不要写尖括号占位。

官方推荐 OAuth，不要新配静态 \`geom_\` token 当 Codex 主路径。无头 / CI 走 GEOly CLI 或只读 token，不是这套插件。不要把密钥写进 \`http_headers\`。

技能随插件走。不要用 \`npx skills add\` 当插件安装器。

MCP Credits 不是 AI Credits。付费公域情报才扣 MCP Credits；自有品牌监测、额度查询和免费工具不扣。额度用 \`get_quota\` 查。写工具要人确认；全组织授权没有写工具。不要 \`required = true\`。不要一上来 \`--yolo\`。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http geoly "https://app.geoly.ai/api/mcp"\` 当 Codex 主路径。
- 不要抄 Cursor 的 \`mcp.json\`，也不要抄 Claude Desktop 的 \`npx mcp-remote\`。
- 不要把会话里的 \`/plugin install\` 当成终端命令。
- 不要发明 \`plugin add geoly@geoly\`。
- 不要以为 \`marketplace upgrade geoly\` 已经更新了已装插件。
- 不要给远程再拼一层 \`/mcp\`。

网页 Cloud 不读本机 marketplace。改完用 \`codex plugin list\` 核对 \`geoly-mcp@geoly\`；\`codex mcp get geoly\` 看 url 是 \`https://app.geoly.ai/api/mcp\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "GEOly", "Skills", "MCP"],
    related: ["planetscale-codex-plugin", "firebase-agent-skills", "plugin-session-refresh"],
    sources: [
      {
        label: "GEOly · MCP User Guide",
        url: "https://www.geoly.ai/docs/mcp",
      },
      {
        label: "geoly-ai/codex-plugins",
        url: "https://github.com/geoly-ai/codex-plugins",
      },
      {
        label: "geoly-ai/GEOly-MCP",
        url: "https://github.com/geoly-ai/GEOly-MCP",
      },
    ],
  },
  {
    id: "cortexcode-tool-codex",
    no: 401,
    title: "Snowflake Cortex Code 用 cortexcode-tool，不要跑 npx skills add",
    summary:
      "官方 Codex：clone Snowflake-Labs/subagent-cortex-code，再 bash integrations/codex/install.sh。不要跑 npx skills add。先装 Cortex CLI，which cortex 要有路径。聊天批准后再 --yes，默认 envelope 是 RO。",
    body: `Snowflake Labs 给 Codex 有专节，写在 \`subagent-cortex-code\` 仓库。Codex **不走技能目录**，走独立 CLI \`cortexcode-tool\`，好在会话里先要沙箱/网络批准，再带 \`--yes\` 前台跑。

先装 Cortex Code CLI（命令是 \`cortex\`），并确认有活动连接：

\`\`\`bash
which cortex
cortex connections list
\`\`\`

\`which cortex\` 必须返回路径。官方文档写 CoCo CLI 在中国大陆不可用。连接写在 \`~/.snowflake/connections.toml\`，和 Snowflake CLI 共用。缺 CLI 时去官方 CoCo CLI 页安装，不要把那条 curl 管道当成 Codex 主路径。

然后才装 Codex 桥：

\`\`\`bash
git clone https://github.com/Snowflake-Labs/subagent-cortex-code.git
cd subagent-cortex-code
bash integrations/codex/install.sh
\`\`\`

脚本把 \`cortexcode-tool\` 装到 \`~/.local/bin/\`，配置写到 \`~/.local/lib/cortexcode-tool/config.yaml\`，并自动读当前 Cortex 连接。需要 Python 3.8+。\`~/.local/bin\` 不在 PATH 就先加进去。

核对：

\`\`\`bash
cortexcode-tool --version
cortexcode-tool --envelope RO "How many databases do I have in Snowflake?"
\`\`\`

第一次在 Codex 会话里先跑 \`which cortexcode-tool\` 和 \`cortexcode-tool --help\`。之后问 Snowflake 问题，它应调这个命令。默认 envelope 是 \`RO\`。聊天里先批准计划，再让它带 \`--yes\` 重试同一条**前台**命令。不要后台 \`&\` 或 \`disown\`；跑 30 到 90 秒是正常的。

不要把 \`approval_mode\` 改成 \`auto\`，除非组织策略明确放开。\`NONE\` 会在执行前被拒。\`DEPLOY\` 还要额外确认。不要一上来 \`--yolo\`。

换连接就再跑一遍安装脚本，或改 \`config.yaml\` 里的 \`connection_name\`。卸：

\`\`\`bash
bash integrations/codex/uninstall.sh
\`\`\`

不要做这些：

- 不要跑 \`npx skills add snowflake-labs/subagent-cortex-code\`。那是 Claude / Cursor / Windsurf 的路。
- 不要抄 \`--agent cortex\`。那不是 Codex agent 名。
- 不要发明 \`codex plugin add snowflake@\` 或 \`codex mcp add cortexcode\`。
- 不要和托管 Cortex Agents MCP、已弃用的 \`Snowflake-Labs/mcp\` 搞成一台。
- 不要把手拷进 \`~/.claude/skills\` 或 \`~/.codex/skills\`。

网页 Cloud 读不到这台本机 CLI。改完新开会话，再问有哪些数据库。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["Skills", "Snowflake", "Cortex", "CLI"],
    related: ["nvidia-skills-codex", "firebase-agent-skills", "skill-locations"],
    sources: [
      {
        label: "Snowflake-Labs/subagent-cortex-code",
        url: "https://github.com/Snowflake-Labs/subagent-cortex-code",
      },
      {
        label: "Cortex Code for Codex",
        url: "https://github.com/Snowflake-Labs/subagent-cortex-code/blob/main/integrations/codex/README.md",
      },
      {
        label: "Snowflake · CoCo CLI",
        url: "https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code-cli",
      },
    ],
  },
  {
    id: "gitlab-orbit-local-mcp",
    no: 402,
    title: "GitLab Orbit Local 用 orbit-cli，不要抄远程 mcp-remote",
    summary:
      "官方 Codex：mcp add orbit-cli -- orbit mcp serve。先装 orbit，which orbit 要有路径。这是查本机 DuckDB 图谱，不是 api/v4/mcp。远程 Orbit 官方仍给 Codex 抄 mcp-remote，不要当主路径。",
    body: `GitLab Orbit Local 给 Codex 有专节：把本机代码图谱暴露成 **stdio** MCP。它查的是 \`~/.orbit/graph.duckdb\`，**不是** GitLab 实例，也不是托管 \`api/v4/mcp\`。官方表名是 \`orbit-cli\`。

先装独立 CLI \`orbit\`，并确认有路径：

\`\`\`bash
which orbit
orbit help
\`\`\`

官方安装器是 knowledge-graph 仓里的 \`install.sh\`，也可以 \`npm install -g @gitlab/orbit\`。已经在用 \`glab\` 时，改跑 \`glab orbit --install\`，之后命令是 \`glab orbit …\`。缺二进制时去官方 CLI 页安装，不要把那条 curl 管道当成 Codex 主路径。

然后才登记 Codex：

\`\`\`bash
codex mcp add orbit-cli -- orbit mcp serve
codex mcp list
\`\`\`

走 \`glab\` 包装时：

\`\`\`bash
codex mcp add orbit-cli -- glab orbit mcp serve
\`\`\`

\`\`\`toml
[mcp_servers.orbit-cli]
command = "orbit"
args = ["mcp", "serve"]
enabled = true
\`\`\`

这是 stdio，**不要** \`codex mcp login\`。Codex 会写进 \`~/.codex/config.toml\`，对你所有项目生效。不要抄 Claude 的 \`--scope local\` / \`--scope project\`。不要把 command 写成一整串 \`orbit mcp serve\`。

工具是 \`index\`、\`get_graph_schema\`、\`run_sql\`。\`run_sql\` 只读，单次大约 1 MB 封顶。图谱默认在 \`~/.orbit/graph.duckdb\`。会话里可以让它索引当前仓库；也可以先在终端跑 \`orbit index .\`。切分支不会自动更新图谱，要按**签出路径**再索引。多仓库共用一个 DuckDB 文件。

可选：\`orbit setup codex\` 会在 \`AGENTS.md\` 里写入带 orbit 标记的说明块，默认写用户层。\`--project\` 才会进当前仓库，随后出现在 \`git status\`。这不是 MCP 安装器。不要跑 \`glab skills install --global orbit\` 当 Codex \`/plugins\`。

不要和这几条搞混：

- GitLab 实例 MCP 是 \`codex mcp add GitLab --url https://gitlab.com/api/v4/mcp\`，再 \`mcp login GitLab\`。远程入口单独写是 \`https://gitlab.com/api/v4/mcp\`。那是 issue / MR，不是本地图谱。
- 远程 Orbit 是 \`https://gitlab.com/api/v4/orbit/mcp\`。官方给 Codex 的示例仍是 \`npx mcp-remote\`，不要当 Codex 主路径，也不要和 \`orbit-cli\` 写成同一张表。
- \`glab mcp serve\` 是另一台实验性本地服务器，文档面向 Claude Code。

本地 Orbit 不消耗 GitLab Credits。MCP 页标 Experiment。保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add orbit@\` 或 \`codex mcp add orbit-local --url\`。
- 不要抄 \`claude mcp add orbit-cli -- orbit mcp serve\`。
- 不要把 PAT 写进 \`env\`、\`args\` 或 \`http_headers\`。
- 不要抄 Cursor 的 \`type: stdio\` JSON。

网页 Cloud 读不到这台本机 CLI。改完新开会话。用 \`codex mcp get orbit-cli\` 看传输是 stdio。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "GitLab", "Orbit", "stdio"],
    related: ["gitlab-mcp-http", "mcp-add-and-login", "fly-mcp-stdio"],
    sources: [
      {
        label: "GitLab · Orbit Local MCP",
        url: "https://docs.gitlab.com/orbit/local/access/mcp/",
      },
      {
        label: "GitLab · Orbit CLI",
        url: "https://docs.gitlab.com/orbit/local/access/cli/",
      },
      {
        label: "GitLab · Orbit Remote MCP",
        url: "https://docs.gitlab.com/orbit/remote/access/mcp/",
      },
    ],
  },
  {
    id: "n8n-codex-mcp",
    no: 403,
    title: "n8n MCP 用 mcp-server/http，插件不会替你登记",
    summary:
      "官方 Codex：marketplace add n8n-io/skills，再 plugin add n8n-skills@n8n-io。MCP 要自己 mcp add n8n-mcp --url，路径是 mcp-server/http。文档示例表名是 n8n，不要叠两张。不要抄 experimental_use_rmcp_client。",
    body: `n8n 给 Codex 有专节，而且技能仓也点名 Codex。技能插件**不会**替 Codex 登记 MCP。先在 n8n 打开 Settings → Instance-level MCP。Cloud 示例主机是 \`acme.app.n8n.cloud\`，完整入口是 \`https://acme.app.n8n.cloud/mcp-server/http\`。本机默认是 \`http://localhost:5678/mcp-server/http\`。路径是 \`/mcp-server/http\`，**不是** \`/mcp\`，也不是编辑器地址栏。

技能仓要求 Codex 0.142.0 以上：

\`\`\`bash
codex plugin marketplace add n8n-io/skills
codex plugin add n8n-skills@n8n-io
\`\`\`

清单 \`.agents/plugins/marketplace.json\` 的 name 是 n8n-io，插件 name 是 n8n-skills，所以是 \`n8n-skills@n8n-io\`。装完会弹出 hook 信任提示（SessionStart / PreToolUse / PostToolUse），批准后再新开会话。不要抄 Claude 的 \`/plugin marketplace add n8n-io/skills\` 或 \`/plugin install n8n-skills@n8n-io\`。

然后才接线。技能仓 Codex 节用表名 \`n8n-mcp\`：

\`\`\`bash
codex mcp add n8n-mcp --url https://acme.app.n8n.cloud/mcp-server/http
codex mcp login n8n-mcp
\`\`\`

\`\`\`toml
[mcp_servers.n8n-mcp]
url = "https://acme.app.n8n.cloud/mcp-server/http"
enabled = true
\`\`\`

文档客户端示例把 OAuth 表写成 \`n8n\`，命令是 \`codex mcp add n8n --url …\` 再 \`mcp login n8n\`。两张表指向同一 URL，**不要叠**。走技能仓就用 \`n8n-mcp\`；只要 MCP、不要技能才用文档那张 \`n8n\`。

不要抄文档 TOML 里的 \`[features] experimental_use_rmcp_client = true\`。现行 Codex 自己连 Streamable HTTP。

无头 / CI 才用 API key。文档把密钥写进 \`http_headers\` 的 \`authorization = "Bearer …"\`，不要抄。改用 \`bearer_token_env_var\`，变量必须在启动 Codex 的进程里：

\`\`\`toml
[mcp_servers.n8n-mcp]
url = "https://acme.app.n8n.cloud/mcp-server/http"
bearer_token_env_var = "N8N_MCP_TOKEN"
enabled = true
\`\`\`

OAuth 和 bearer 不要写进同一张表。API key 那张不要再 \`mcp login\`。

还要给**具体工作流**打开 Available in MCP。实例开关不等于每条都能跑。\`execute_workflow\` 默认跑已发布版本。能改工作流，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add n8n@openai-curated\`。
- 不要把 \`npx skills add n8n-io/skills\` 当 Codex 插件安装器。
- 不要抄 Claude 的 \`--transport http\` 或 \`--header "Authorization: Bearer …"\`。
- 不要抄 Claude Desktop 的 \`npx supergateway\`。
- 不要把手写 \`n8n\` 表和 \`n8n-mcp\` 表叠成两台。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get n8n-mcp\` 看传输是 streamable_http，url 是 \`https://acme.app.n8n.cloud/mcp-server/http\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "n8n", "Skills", "MCP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "airtable-codex-plugin"],
    sources: [
      {
        label: "n8n · MCP client examples",
        url: "https://docs.n8n.io/connect/connect-to-n8n-mcp-server/mcp-client-examples/",
      },
      {
        label: "n8n · Connect to MCP server",
        url: "https://docs.n8n.io/connect/connect-to-n8n-mcp-server/",
      },
      {
        label: "n8n-io/skills",
        url: "https://github.com/n8n-io/skills",
      },
    ],
  },
  {
    id: "mcp-endor-cli-tools",
    no: 404,
    title: "Endor Labs 扫描 MCP 走本地 stdio，表名 endor-cli-tools",
    summary:
      "官方 Codex：mcp add endor-cli-tools -- npx -y endorctl ai-tools mcp-server。stdio，不要 mcp login。企业版命名空间走 env_vars。文档 MCP 是另一张 HTTP 表 endor-docs，要占位 bearer。不要把 Agent Kit 或治理钩子当成这台 MCP。",
    body: `Endor Labs 给 Codex 的**扫描** MCP 是本机 stdio，不是远程 HTTP。官方用户层表名是 \`endor-cli-tools\`。它通过 \`npx\` 或系统里的 \`endorctl\` 起进程，再去云端查依赖、漏洞、泄露密钥和 SAST。不要给它写 \`url\`，也不要抄 \`type = "http"\`。

需要 Node.js 18 或以上，官方推荐 24 LTS。\`npx\` 跟 Node 一起装，不必再装一份 npm。低于 24 时，扫描前可能先打一行 CommonJS / ESM 的 \`ExperimentalWarning\`，那是 Node 自己的提示，不是 \`endorctl\` 挂了。

开发版免费，用 Endor 默认策略，不必先开账号。第一次用工具会弹出浏览器，走 GitHub、GitLab 或 Google 登录：

\`\`\`bash
codex mcp add endor-cli-tools -- npx -y endorctl ai-tools mcp-server
codex mcp list
\`\`\`

\`\`\`toml
[mcp_servers.endor-cli-tools]
command = "npx"
args = ["-y", "endorctl", "ai-tools", "mcp-server"]
enabled = true
\`\`\`

这是 stdio，**不要** \`codex mcp login\`。Codex 写进 \`~/.codex/config.toml\`，对你所有项目生效。不要抄 Claude / Cursor 的 \`mcpServers\` JSON。冷 \`npx\` 握手慢，可加 \`startup_timeout_sec = 60\`。不要 \`required = true\`。不要一上来 \`--yolo\`。

企业版才读你们组织的策略。开发者至少要有 Read-Only。命名空间和登录方式从**启动 Codex 的那个进程**转发，不要写成 \`--env KEY=…\` 字面量，TOML 占位符也不会展开：

\`\`\`toml
[mcp_servers.endor-cli-tools]
command = "npx"
args = ["-y", "endorctl", "ai-tools", "mcp-server"]
env_vars = ["ENDOR_NAMESPACE", "ENDOR_MCP_SERVER_AUTH_MODE", "ENDOR_MCP_SERVER_AUTH_TENANT"]
enabled = true
\`\`\`

\`ENDOR_MCP_SERVER_AUTH_MODE\` 可以是 \`github\` / \`gitlab\` / \`google\` / \`sso\`。选 \`sso\` 才需要 \`ENDOR_MCP_SERVER_AUTH_TENANT\`。开发版不写这三项，默认浏览器登录。自定义密钥规则一类非密钥路径，才写进 \`[mcp_servers.endor-cli-tools.env]\`，例如 \`SECRETS_RULES_PATH\`。

连上后让它查 npm 包 \`lodash\` 的 \`4.17.20\` 有没有漏洞。官方会走 \`check_dependency_for_vulnerabilities\`。还可以查依赖风险和恶意包、拉漏洞详情、跑 \`scan\`（依赖 / SAST / Git 历史里的密钥）。\`security_review\` 看未提交 diff 或相对主分支的提交，只要企业版，还要在控制台打开 AI security code review，并配好 \`ENDOR_NAMESPACE\`。MCP 返回全量发现，不做函数级可达性，也不按 action policy 过滤。

只要部分工具时，在同一张表写 \`enabled_tools\`，官方示例是 \`check_dependency_for_vulnerabilities\` 和 \`scan\`。TUI 里用 \`/mcp\` 看已启用的服务器。仓库根的 \`AGENTS.md\` 可以写「改 lockfile 先查依赖」，官方示例还要求走这台 MCP、不要直接调 \`endorctl\`；按你们流程改，不要整段粘贴。

默认 \`npx -y endorctl\` 把最新包丢进 \`~/.npm/_npx/\`，**不会**用你 Homebrew 装的那份。版本旧了就清 npx 缓存，或把 \`args\` 里的包名钉成 \`endorctl@版本\`。公司代理让 npx 超时，改成系统二进制：

\`\`\`bash
codex mcp add endor-cli-tools -- endorctl ai-tools mcp-server
\`\`\`

\`command\` 写成 \`which endorctl\` 给出的绝对路径；fnm / nvm 尤其不要写裸命令名。Windows 还要把 npm 全局 bin 加进 PATH，用 \`npm config get prefix\` 核对。

不要和这几条搞混：

- 文档 MCP 是另一张 HTTP 表 \`endor-docs\`，地址 \`https://docs.endorlabs.com/mcp\`，**没有**鉴权。Codex 会误探 OAuth 然后失败。官方权宜是占位 bearer：先 \`export ENDOR_DOCS_KEY=dummy\`，再 \`codex mcp add endor-docs --url https://docs.endorlabs.com/mcp --bearer-token-env-var ENDOR_DOCS_KEY\`。变量必须在启动 Codex 的进程里。不要和 \`endor-cli-tools\` 写成同一张表。
- Agent Kit 是工作流插件，不是这台扫描 MCP。官方 Codex 页是 \`codex plugin marketplace add endorlabs/ai-plugins --sparse .agents/plugins --sparse plugins/codex/endor-labs-agent-kit\`，装完新开会话。文档没写 \`plugin add\`。清单 name 和插件 name 都是 \`endor-labs-agent-kit\`。不要抄 Claude 的 \`endor-labs-agent-kit@endorlabs\`，也不要把 \`npx skills add https://docs.endorlabs.com\` 当 Codex 插件安装器。
- Coding Agent Governance 钩子是 \`endorctl ai-audit codex\`，写在 \`[hooks]\` 或 \`hooks.json\`，用来拦命令 / 文件 / MCP。不要把 API 密钥写进 command 字面量。不要同时 export \`ENDOR_TOKEN\`。那不是 \`mcp add\`。

不要做这些：

- 不要发明 \`codex mcp add endor --url https://api.endorlabs.com\`。
- 不要抄 \`claude mcp add\` 或 Cursor 的 JSON。
- 不要把 PAT / API secret 写进 \`args\`、\`env\` 表或 \`http_headers\`。
- 不要把 \`endor-cli-tools\` 和 \`endor-docs\` 叠成两张同名表。

网页 Cloud 读不到这台本机 CLI。改完新开会话。用 \`codex mcp get endor-cli-tools\` 看传输是 stdio，command 是 npx 还是绝对路径。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Endor Labs", "stdio", "SCA"],
    related: ["mcp-add-and-login", "mcp-snyk-stdio", "mcp-stdio-env-vars"],
    sources: [
      {
        label: "Endor Labs · MCP in Codex",
        url: "https://docs.endorlabs.com/setup-deployment/mcp/codex",
      },
      {
        label: "Endor Labs · Documentation MCP",
        url: "https://docs.endorlabs.com/introduction/docs-mcp-server",
      },
      {
        label: "Endor Labs · Agent Kit in Codex",
        url: "https://docs.endorlabs.com/secure-ai-coding/agent-kit/codex",
      },
      {
        label: "Endor Labs · Deploy hooks for Codex",
        url: "https://docs.endorlabs.com/agent-governance/codex",
      },
    ],
  },
  {
    id: "mcp-clickhouse-stdio",
    no: 405,
    title: "ClickHouse 自建 MCP 用 mcp-clickhouse，密码走 env_vars",
    summary:
      "官方 Codex：mcp add mcp-clickhouse -- uv run --with mcp-clickhouse --python 3.10 mcp-clickhouse。不要抄 --env 把密码写进 TOML。密钥用 env_vars。不要和 Cloud 那张 clickhouse-cloud 表搞混。不要 mcp login。",
    body: `ClickHouse 给 Codex 有专节：本机 **stdio** 包 \`mcp-clickhouse\`，经 HTTP 接口去查**你的**集群（Cloud 主机或自建都行）。这不是托管 \`mcp.clickhouse.cloud/mcp\`，也不是 ClickStack 的 \`/clickstack\`。官方表名就是 \`mcp-clickhouse\`。

先装 \`uv\`，并确认有路径：

\`\`\`bash
which uv
\`\`\`

\`which uv\` 必须返回路径。缺了去官方 uv 页安装，不要把那条 curl 管道当成 Codex 主路径。

然后才登记。文档那条 \`--env CLICKHOUSE_PASSWORD=your-clickhouse-password\` 会把密钥写进 \`config.toml\`，**不要抄**。先 add 命令，再改 TOML：

\`\`\`bash
codex mcp add mcp-clickhouse -- uv run --with mcp-clickhouse --python 3.10 mcp-clickhouse
\`\`\`

\`\`\`toml
[mcp_servers.mcp-clickhouse]
command = "uv"
args = ["run", "--with", "mcp-clickhouse", "--python", "3.10", "mcp-clickhouse"]
env_vars = ["CLICKHOUSE_HOST", "CLICKHOUSE_USER", "CLICKHOUSE_PASSWORD"]
startup_timeout_sec = 60
enabled = true

[mcp_servers.mcp-clickhouse.env]
CLICKHOUSE_SECURE = "true"
\`\`\`

\`CLICKHOUSE_HOST\` / \`CLICKHOUSE_USER\` / \`CLICKHOUSE_PASSWORD\` 必须在**启动 Codex 的那个进程**里。Codex 不读 \`.env\`。Cloud 服务默认 HTTPS，端口默认 \`8443\`，保持 \`CLICKHOUSE_SECURE = "true"\`。自建明文 HTTP 才改成 \`"false"\`，并把 \`CLICKHOUSE_PORT\` 加进 \`env_vars\`（常见是 \`8123\`）。不要用默认管理员账号；单独开只读用户。

这是 stdio，**不要** \`codex mcp login\`。冷 \`uv run --with\` 第一次拉包经常超过默认 10 秒，所以加上 \`startup_timeout_sec = 60\`。默认查询只读（\`CLICKHOUSE_ALLOW_WRITE_ACCESS\` 为 false）。不要一上来开写，更不要开 \`CLICKHOUSE_ALLOW_DROP\`。

不要和这几张表搞混：

- Cloud 托管 MCP 是 \`codex mcp add clickhouse-cloud --url https://mcp.clickhouse.cloud/mcp\`，再 OAuth。那张表名是 \`clickhouse-cloud\`。
- ClickStack 观测端点是 \`https://mcp.clickhouse.cloud/clickstack\`。官方 ClickStack 页没有 Codex 专节，不要当这条的主路径。
- 公共插件目录 \`/plugins\` 搜 ClickHouse 捆绑的是托管远程 MCP，不是这台本机 \`uv\` 进程。

不要做这些：

- 不要抄 Claude 的 \`--transport stdio\` 或 \`--scope user\`。
- 不要抄 Cursor / VS Code / Claude Desktop 的 JSON。
- 不要把 \`CLICKHOUSE_MCP_SERVER_TRANSPORT\` 改成 \`http\` 或 \`sse\` 当 Codex 主路径。那是给 Inspector 的。
- 不要用 \`npx skills add clickhouse/agent-skills\` 当 Codex 插件安装器。
- 不要把手写 \`mcp-clickhouse\` 表和 \`clickhouse-cloud\` 表叠成两台去打同一个仓。
- 不要 \`required = true\`。不要一上来 \`--yolo\`。

网页 Cloud 读不到这台本机 stdio。改完新开会话。用 \`codex mcp get mcp-clickhouse\` 看 command 是 \`uv\`。\`/mcp\` 里工具 0 先查超时、\`which uv\` 和进程环境。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "ClickHouse", "stdio", "env_vars"],
    related: ["mcp-clickhouse-cloud", "mcp-stdio-env-vars", "mcp-grafana-stdio"],
    sources: [
      {
        label: "ClickHouse · Set up MCP server",
        url: "https://clickhouse.com/docs/guides/use-cases/ai-ml/MCP/claude-desktop",
      },
      {
        label: "ClickHouse/mcp-clickhouse",
        url: "https://github.com/ClickHouse/mcp-clickhouse",
      },
      {
        label: "ClickHouse · ClickStack MCP",
        url: "https://clickhouse.com/docs/clickstack/mcp",
      },
    ],
  },
  {
    id: "jfrog-codex-plugin",
    no: 406,
    title: "JFrog 插件用 marketplace 加 jfrog/codex-plugin，主机写在插件 .mcp.json",
    summary:
      "官方 Codex：marketplace add jfrog/codex-plugin，再 plugin add jfrog@codex-plugin。MCP 表名是 jfrog。把插件 .mcp.json 改成 acme.jfrog.io/mcp，再 mcp login jfrog。export JFROG_PLATFORM_URL 不会登记 MCP。不要抄文档 mcpServers JSON。",
    body: `JFrog 给 Codex 有正式插件仓，把平台技能、包审查和捆绑 MCP 打在一起。清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`codex-plugin\`，插件 name 是 \`jfrog\`，所以是 \`jfrog@codex-plugin\`。在**普通终端**装，不要在 Codex TUI 里跑：

\`\`\`bash
codex plugin marketplace add jfrog/codex-plugin
codex plugin add jfrog@codex-plugin
codex plugin list
\`\`\`

\`codex plugin list\` 应看到 \`jfrog@codex-plugin\` 一行是 installed, enabled，并给出安装路径。0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace 仍要重启应用。不要发明 \`jfrog@openai-curated\`。不要用 \`npx skills add jfrog/jfrog-skills\` 当 Codex 插件安装器。

插件已经带 MCP，表名就是 \`jfrog\`。捆绑文件是安装路径下的 \`.mcp.json\`，占位主机要改成你们的 JPD，路径是 \`/mcp\`。示例：

\`\`\`json
{
  "jfrog": {
    "url": "https://acme.jfrog.io/mcp"
  }
}
\`\`\`

平台管理员必须先在实例上打开 JFrog MCP Server。改完主机再登录，这是 OAuth，**不要**把 access token 写进配置：

\`\`\`bash
codex mcp login jfrog
codex mcp list
\`\`\`

然后新开会话。技能还要本机 \`jf\` CLI：先 \`jf login\`，或从没配过就 \`jf config add\`。Agent Guard（可选）还要 Node.js 18、npx，以及带 AI Catalog 的订阅；JFrog CLI 2.105.0 起才能从 CLI 配置自动解析凭据。

MCP 连不上时，官方要你跑 \`jfrog-init\`，必要时再改 \`.mcp.json\` 主机、\`mcp login jfrog\`、重启。**不要**以为 \`export JFROG_PLATFORM_URL\` 会替 Codex 登记 MCP；Codex 读的是插件 \`.mcp.json\` 里的 url。占位符没改，只重装插件不够。

不要和这几条搞混：

- 集成文档给 Codex 抄的是 \`mcpServers\` JSON。Codex 用户层是 \`[mcp_servers.jfrog]\`。只要 MCP、不要插件时才手写：

\`\`\`bash
codex mcp add jfrog --url https://acme.jfrog.io/mcp
codex mcp login jfrog
\`\`\`

不要和插件那张 \`jfrog\` 表叠成两台。

- \`jf agent plugins install jfrog --harness codex\` 是 Artifactory 的 agentplugins 仓，装到 \`~/.agents/plugins/local/\`。那不是 GitHub marketplace 这条。
- 密钥不要写进 chat。Agent Guard 要密钥时会给你一条在终端跑的命令。

不要做这些：

- 不要抄 Claude / Cursor 的 JSON，也不要把 access token 写进 \`http_headers\` 或 \`--env\`。
- 不要 \`required = true\`。不要一上来 \`--yolo\`。
- 不要发明 \`codex mcp add jfrog --url https://mcp.jfrog.com\`。

网页 Cloud 不读这份本机插件和 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get jfrog\` 看 url 是 \`https://acme.jfrog.io/mcp\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "JFrog", "Skills", "MCP"],
    related: ["mcp-add-and-login", "plugin-session-refresh", "planetscale-codex-plugin"],
    sources: [
      {
        label: "jfrog/codex-plugin",
        url: "https://github.com/jfrog/codex-plugin",
      },
      {
        label: "JFrog · Add MCP server to a client",
        url: "https://docs.jfrog.com/integrations/docs/add-the-jfrog-mcp-server-to-an-mcp-client",
      },
      {
        label: "JFrog · OpenAI Codex",
        url: "https://jfrog.com/integrations/openai-codex/",
      },
    ],
  },
  {
    id: "nowledge-mem-codex-plugin",
    no: 407,
    title: "Nowledge Mem 要两个 --sparse，不要 mcp login",
    summary:
      "官方 Codex：marketplace add nowledge-co/community，两个 --sparse 是 .agents 和 nowledge-mem-codex-plugin，再 plugin add nowledge-mem@nowledge-community。先装 nmem。捆绑 MCP 是 127.0.0.1:14242/mcp/。不要 mcp login。装完跑 install_hooks.py。",
    body: `Nowledge Mem 给 Codex 有专节。桌面和 CLI 共用 \`~/.codex\`。先让本机 Mem 跑起来，并装好 \`nmem\`：\`pip install nmem-cli\`，或 \`uvx --from nmem-cli nmem --version\`。已经在用桌面时，走 Settings → Preferences → Developer Tools → Install CLI。装完跑 \`nmem --version\` 和 \`nmem doctor\`。

清单 \`.agents/plugins/marketplace.json\` 的 name 是 nowledge-community，插件 name 是 nowledge-mem。两个 \`--sparse\` 都要写，只拉元数据和 Codex 包：

\`\`\`bash
codex plugin marketplace add nowledge-co/community --sparse .agents --sparse nowledge-mem-codex-plugin
codex plugin add nowledge-mem@nowledge-community
\`\`\`

全量 clone 社区仓会 \`git clone marketplace source timed out after 30s\` 或 \`early EOF\`。旧文把文件拷进 \`~/.codex/plugins/cache/local/…\`，不要再走。也可以 \`/plugins\` 搜 nowledge-mem@nowledge-community。不要抄 Claude 的 \`claude plugin marketplace add https://github.com/nowledge-co/community\` 或 \`plugin install\`。不要发明 \`nowledge-mem@openai-curated\`。

文档仍让你在 \`~/.codex/config.toml\` 打开插件和钩子：

\`\`\`toml
[features]
plugins = true
hooks = true

[plugins."nowledge-mem@nowledge-community"]
enabled = true
\`\`\`

现行 Codex 会从已启用插件自动加载钩子。**不要**手写 \`plugin_hooks = true\`，让 \`install_hooks.py\` 检测旧主机。取缓存里最新那条脚本：

\`\`\`bash
HOOK_SETUP="$(find ~/.codex/plugins/cache -path '*/nowledge-mem/*/scripts/install_hooks.py' -print 2>/dev/null | sort | tail -1)"
python3 "$HOOK_SETUP"
\`\`\`

Windows 用 \`py -3\`。找不到脚本就先 \`/plugins\` 再装一次。新开会话后，SessionStart / UserPromptSubmit / Stop 要**启用且信任**，两道闸。SessionStart 注入 Context Bundle（没有再退到 Working Memory）。UserPromptSubmit 把续写、回归、先前决定这类问题导向检索。Stop 跑 \`nmem t save --from codex\`。

捆绑 MCP 是 \`http://127.0.0.1:14242/mcp/\`。用户层若写 \`[mcp_servers.nowledge-mem]\` 会覆盖捆绑端点，远程 Mem 或自定义端口才覆盖。**不要** \`codex mcp login nowledge-mem\`。那是 OAuth。本地默认不用手写 MCP 表。\`codex mcp list\` 显示 Not logged in 时，升级 \`nmem-cli\`，用桌面装 CLI，再重跑 hook setup。

远程才改客户端，密钥不要写进 \`http_headers\`，也不要贴进聊天：

\`\`\`bash
nmem config client set url https://mem.acme.example
nmem config client set api-key
\`\`\`

不要用尖括号占位（会被当 HTML）。示例主机用 acme。远程还要覆盖 MCP 端点：跑 \`nmem config mcp show --host codex\`，把生成的 TOML 贴进用户层，或重跑 0.1.11+ 的 hook setup。不要手抄一套和捆绑表叠成两台。

若同时开 Codex 本地 Memory：Settings → Personalization 关掉 Allow memory generation from tool-assisted tasks，或：

\`\`\`toml
[memories]
disable_on_external_context = true
\`\`\`

否则 Codex 会把刚从 Mem 读到的内容再写成一份本地摘要。插件 0.1.26+ 才有更强检索路由。完全关掉 Codex 本地 Memory 也是完整装法。

不要改已安装插件目录里的 \`AGENTS.md\`；合并进仓库根。报 \`unknown field description, expected hooks\` 时升到 0.1.19+。更新先 \`marketplace remove nowledge-community\`，再带两个 \`--sparse\` 加回去并 \`plugin add\`；\`marketplace upgrade\` 可能不刷新已装包缓存。WSL 要在跑 Codex 的那个 distro 里装和更新，不要让 Windows 桌面代跑。

仓库内嵌备选：把包拷到 \`.agents/nowledge-mem\`，marketplace name 写成 \`local\`，path 相对仓库根，再开 \`[plugins."nowledge-mem@local"]\`，hook 脚本改跑 \`python3 ./.agents/nowledge-mem/scripts/install_hooks.py\`。旧 prompts 包 \`nowledge-mem-codex-prompts\` 可删 \`~/.codex/prompts/{read_working_memory,search_memory,save_session,distill}.md\`。

技能仍在：\`$nowledge-mem:working-memory\`、\`search-memory\`、\`save-thread\`、\`distill-memory\`、\`status\`。不要一上来 \`--yolo\`。不要 \`required = true\`。网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "Nowledge", "MCP", "hooks", "Skills"],
    related: ["plugin-session-refresh", "mcp-add-and-login", "memories-use-vs-generate"],
    sources: [
      {
        label: "Nowledge Mem · Codex CLI",
        url: "https://mem.nowledge.co/docs/integrations/codex-cli",
      },
      {
        label: "nowledge-co/community",
        url: "https://github.com/nowledge-co/community",
      },
      {
        label: "Nowledge Mem · SKILL.md",
        url: "https://mem.nowledge.co/SKILL.md",
      },
    ],
  },
  {
    id: "mcp-solo-agentregistry",
    no: 408,
    title: "Solo agentregistry 没有 arctl configure Codex",
    summary:
      "官方 Codex：mcp add agentregistry --url，本机是 localhost:31313/mcp。静态令牌用 bearer_token_env_var ARCTL_TOKEN。生产 OAuth 才 --oauth-resource 再 mcp login --scopes openid,profile。不要抄 arctl configure 或 Claude 的 --header。",
    body: `Solo Enterprise for agentregistry 给 Codex 有专节。这台 MCP **只读目录**：列 agents / servers / skills / prompts / models / plugins / deployments / runtimes，**不会**替你调用目录里登记的那些 MCP。先 \`arctl user login\`，再接线。

Codex **没有** \`arctl configure\` 子命令。那张表只有 claude-code / cursor / vscode / kiro，写的是各宿主的 JSON。默认 URL 还是 agentgateway 的 \`http://localhost:21212/mcp\`，**不是**注册表桥。不要发明 \`arctl configure codex\`，也不要把生成的 \`.mcp.json\` 贴进 \`config.toml\`。

本机先把注册表服务的 \`31313\` 端口转出来。UI / REST 是 \`12121\`，MCP 桥是 \`31313\`。URL 要带 \`/mcp\`：

\`\`\`bash
kubectl -n agentregistry-system port-forward svc/agentregistry-enterprise-server 31313:31313
export ARCTL_TOKEN="$(arctl user info --show-tokens | jq -r .access_token)"
codex mcp add agentregistry --url http://localhost:31313/mcp --bearer-token-env-var ARCTL_TOKEN
\`\`\`

\`ARCTL_TOKEN\` 必须在**启动 Codex 的进程**里。令牌会随 OIDC 会话过期，过期后重新 export，必要时再 \`mcp add\` 一次。不要把 token 写进 \`http_headers\`，也不要贴进聊天。

Ingress 示例主机用 \`registry.acme.example\`：

\`\`\`bash
codex mcp add agentregistry --url https://registry.acme.example/mcp --bearer-token-env-var ARCTL_TOKEN
\`\`\`

生产环境、IdP 走 HTTPS，并且 Helm 打开了 OAuth 发现时，才用交互登录。本机那套 Keycloak 常是明文 HTTP，MCP 客户端拒发 token 请求，本地请走上面的静态头：

\`\`\`bash
codex mcp add agentregistry --url https://registry.acme.example/mcp --oauth-resource https://registry.acme.example/mcp
codex mcp login agentregistry --scopes openid,profile
\`\`\`

\`oauth-resource\` 要和 \`url\` 相同，这样 RFC 9728 元数据才对得上 \`/.well-known/oauth-protected-resource/mcp\`。OAuth 和 bearer **不要**写进同一张表。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http\` 或 \`--header "Authorization: Bearer …"\`（那会把令牌写进配置）。
- 不要抄 Cursor / VS Code 的 \`mcpServers\` JSON。
- 不要把 \`12121\` 或 \`21212\` 当成 MCP 桥。
- 不要发明 \`codex plugin add agentregistry@…\`。
- 不要给只读目录 \`required = true\`，也不要一上来 \`--yolo\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get agentregistry\` 看传输是 streamable_http，url 带 \`31313/mcp\` 或你的 ingress \`/mcp\`。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Solo", "agentregistry", "OAuth"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "mcp-oauth-resource"],
    sources: [
      {
        label: "Solo · Registry MCP server",
        url: "https://docs.solo.io/agentregistry/latest/setup/mcp-server/",
      },
      {
        label: "Solo · arctl configure",
        url: "https://docs.solo.io/agentregistry/latest/reference/cli/arctl-configure/",
      },
      {
        label: "Solo · arctl CLI",
        url: "https://docs.solo.io/agentregistry/latest/reference/cli/",
      },
    ],
  },
  {
    id: "ecc-codex-native-plugin",
    no: 409,
    title: "ECC 原生插件是 ecc@ecc，不要叠遗留 sync",
    summary:
      "官方 Codex：marketplace add affaan-m/ECC，再 plugin add ecc@ecc。Codex 0.146.0 起动词是 add 不是 install。不要叠 sync-ecc-to-codex.sh。钩子要在 /hooks 另信。默认 MCP 只剩 chrome-devtools。不要抄 Claude 的 /plugin install。",
    body: `Everything Claude Code（ECC）给 Codex 有原生插件专节，写在仓库 README 和 \`.codex-plugin/README.md\`。要求 Codex 0.146.0 以上。CLI 动词是 \`plugin add\`，不是 \`plugin install\`。源仓简写是 \`affaan-m/ECC\`，清单 \`.agents/plugins/marketplace.json\` 的 name 是 ecc，插件 name 也是 ecc，所以是 \`ecc@ecc\`。

\`\`\`bash
codex plugin marketplace add affaan-m/ECC
codex plugin add ecc@ecc
codex plugin list --json
\`\`\`

两条 add 都可以再跑：marketplace 已加过会报 \`alreadyAdded: true\`，插件 add 会保持同一条已启用登记。刷新先升级清单，再装一次缓存：

\`\`\`bash
codex plugin marketplace upgrade ecc
codex plugin add ecc@ecc
\`\`\`

本地开发把 checkout 根交给 marketplace，不要发明第二个 marketplace 名：

\`\`\`bash
codex plugin marketplace add /absolute/path/to/ECC
codex plugin add ecc@ecc
\`\`\`

marketplace 入口指向**仓库根**，这样 Codex 拷进缓存时 \`skills/\`、\`.mcp.json\`、\`hooks/\` 和脚本还在一起。不要把薄插件目录 \`.codex-plugin/\` 当成 marketplace 根：父级相对路径会逃出缓存，装完技能和 MCP 都是空的。

启用状态记在当前 \`CODEX_HOME\`（默认 \`~/.codex\`），对用这个 home 的会话生效。**没有** Claude 的 \`user\` / \`project\` / \`local\` 三档。不要抄 \`/plugin marketplace add https://github.com/affaan-m/ECC\` 或 \`/plugin install ecc@ecc\`。不要发明 \`ecc@openai-curated\`。不要把 \`npx skills add\` 当 Codex 插件安装器。

装完打开 \`/plugins\` 看 \`ecc@ecc\`。钩子是另一套控制：原生清单绑的是 \`./hooks/codex-hooks.json\`，目前核实过的是同步 \`SessionStart\`。Codex 默认开钩子支持，但**不会**因为装了插件就静默授权命令。新开会话，打开 \`/hooks\`，审过再信任。哈希变了要再审一次。不要把 Claude 的 \`off\` / \`minimal\` / \`standard\` / \`strict\` 四档套到 Codex，也不要手写 \`plugin_hooks\`。

会话里走引导配置用 \`\$configure-ecc\`。那是技能调用，不是 Claude 的 \`/ecc:configure-ecc\`，也替不了第一次的 \`plugin add\`。

默认捆绑的 MCP 只剩 \`chrome-devtools\`（\`npx -y chrome-devtools-mcp@latest\`）。\`github\`、\`context7\`、\`exa\`、\`memory\`、\`playwright\`、\`sequential-thinking\` 已退役，工作改由技能包 CLI / REST，或 Codex 自己的能力。它们还在 \`mcp-configs/mcp-servers.json\` 里可选。已经手写过 \`[mcp_servers.chrome-devtools]\` 就不要和插件那张再叠一台。插件**不会**改 \`~/.codex/config.toml\` 里的模型、沙箱这些键。

不要和遗留 \`bash scripts/sync-ecc-to-codex.sh\` 叠用。那条路把文件合并进 \`~/.codex\`，**不会**登记 marketplace，现行 Codex 请走原生插件。仓库里直接开 Codex、读根 \`AGENTS.md\` 和可信的 \`.codex/\`，也是项目本地路径，同样不要再叠一条全局 marketplace。

\`codex plugin list\` 只证明登记成功。要从 ECC checkout 核对缓存里的技能、MCP 和资源，跑：

\`\`\`bash
node scripts/codex/check-plugin-cache.js
\`\`\`

0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace 后彻底退出再开。IDE 扩展没有 \`/plugins\`，用 CLI 加完再到 TUI 或桌面去装。网页 Cloud 不读你这台 \`CODEX_HOME\` 插件缓存。

不要 \`required = true\`。不要一上来 \`--yolo\`。钩子会跑命令，保持工具批准。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "ECC", "Skills", "hooks"],
    related: ["n8n-codex-mcp", "plugin-marketplace-ref-sparse", "chrome-devtools-mcp"],
    sources: [
      {
        label: "affaan-m/ECC",
        url: "https://github.com/affaan-m/ECC",
      },
      {
        label: "ECC · Codex native plugin",
        url: "https://github.com/affaan-m/ECC/blob/main/.codex-plugin/README.md",
      },
      {
        label: "ECC · configure-ecc",
        url: "https://github.com/affaan-m/ECC/blob/main/skills/configure-ecc/SKILL.md",
      },
    ],
  },
  {
    id: "matlab-mcp-stdio",
    no: 410,
    title: "MATLAB MCP 用本机二进制，Windows 要转发 WINDIR",
    summary:
      "官方 Codex：mcp add matlab -- 本机 matlab-mcp-server 绝对路径。stdio，不要 mcp login。Windows 必须 env_vars 含 WINDIR，否则 Simulink 会崩。表名是 matlab，不要抄 Answers 的 matlab-core。不要抄 Claude 的 --transport stdio 或 .mcpb。",
    body: `MathWorks 给 MATLAB MCP Server 写了 Codex 专节，源仓是 \`matlab/matlab-mcp-server\`。先装 MATLAB R2021a 或更新，并让它在 PATH 里。再从 [Releases](https://github.com/matlab/matlab-mcp-server/releases/latest) 下对应平台的二进制，给可执行权限。这是**本机 stdio**，不是远程 URL。

Linux / macOS 示例把二进制放在 \`/home/acme/Downloads/matlab-mcp-server\`：

\`\`\`bash
chmod +x /home/acme/Downloads/matlab-mcp-server
codex mcp add matlab -- /home/acme/Downloads/matlab-mcp-server
\`\`\`

钉 MATLAB 根目录和工作目录时，参数写在 \`--\` 后面。\`--matlab-root\` **不要**带 \`/bin\`：

\`\`\`bash
codex mcp add matlab -- /home/acme/Downloads/matlab-mcp-server --matlab-root=/home/acme/MATLAB/R2026a --initial-working-folder=/home/acme/myproject
\`\`\`

用户层表名是 \`matlab\`。这是 stdio，**不要** \`codex mcp login\`。不要发明 \`codex plugin add matlab@openai-curated\`。不要抄 Claude 的 \`claude mcp add --transport stdio\`，也不要双击 \`matlab-mcp-server.mcpb\`——那是 Claude Desktop 扩展。不要抄 VS Code 的 \`.vscode/mcp.json\`。

Windows 有硬坑：Codex 起 stdio 子进程时**不转发** \`WINDIR\`，Simulink 初始化会崩（\`matlab/matlab-mcp-server#32\`）。\`mcp add\` 不会写 \`env_vars\`，要自己改 \`C:\\Users\\acme\\.codex\\config.toml\`。路径用单引号，避免反斜杠被 TOML 吃掉：

\`\`\`toml
[mcp_servers.matlab]
command = 'C:\\Users\\acme\\Downloads\\matlab-mcp-server-windows-x64.exe'
args = []
env_vars = ["WINDIR"]
enabled = true
\`\`\`

MathWorks Answers 把同一张表写成 \`matlab-core\`，**不要抄**。官方 README 是 \`matlab\`。\`env_vars\` 是从 Codex 进程透传变量名，不要写成 \`[mcp_servers.matlab.env]\` 里的字面量，也不要把 \`WINDIR=C:\\\\Windows\` 用 \`--env\` 写进配置。

CLI 旗标也能改成环境变量：给旗标加上 \`MW_MCP_SERVER_\` 前缀、改大写、连字符变下划线。例如 \`--matlab-root\` 对应 \`MW_MCP_SERVER_MATLAB_ROOT\`。同时写时，CLI 旗标优先。

接到已有 MATLAB 会话（R2023a 起）才用 \`--matlab-session-mode=existing\` 或默认的 \`auto\`。第一次先跑二进制的 \`--setup-matlab\` 装 MATLAB MCP Server Toolbox，再在 MATLAB 命令窗口执行 \`shareMATLABSession()\`。\`existing\` 不要和 \`matlab-root\` / \`initial-working-folder\` / \`matlab-display-mode\` 一起用。

默认会向 MathWorks 打匿名用量；不想要就加 \`--disable-telemetry=true\`。要桌面 GUI 时，无显示环境再透传 \`DISPLAY\` / \`WAYLAND_DISPLAY\`，见 stdio 显示器那条。网页 Cloud 读不到这台本机二进制。

能跑任意 MATLAB 代码，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。许可证不允许把这台 MCP 共享给多人。改完新开会话。用 \`codex mcp get matlab\` 看传输是 stdio、命令是绝对路径。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "MATLAB", "stdio", "Windows"],
    related: ["mcp-add-and-login", "mcp-stdio-display-env", "chrome-devtools-mcp"],
    sources: [
      {
        label: "matlab/matlab-mcp-server",
        url: "https://github.com/matlab/matlab-mcp-server",
      },
      {
        label: "matlab-mcp-server#32",
        url: "https://github.com/matlab/matlab-mcp-server/issues/32",
      },
      {
        label: "MATLAB Answers · WINDIR",
        url: "https://www.mathworks.com/matlabcentral/answers/2183464-why-does-matlab-r2025b-crash-when-opening-simulink-through-matlab-mcp-core-server-on-windows-with-co",
      },
    ],
  },
  {
    id: "surrealdb-codex-mcp",
    no: 411,
    title: "SurrealDB 托管 MCP 不要加 /mcp 后缀",
    summary:
      "官方 Codex：mcp add surrealdb --url https://mcp.surrealdb.com，不要再拼 /mcp。浏览器没弹再 mcp login surrealdb。无头才 SURREALDB_TOKEN。插件是 marketplace add surrealdb/ai-codex-plugin，再 plugin add surrealdb@surrealdb。本机才带 /mcp。不要抄 Claude 的 --transport http。",
    body: `SurrealDB 给 Codex 有专节，写在 \`surrealdb.com/docs/agents/codex\`。托管入口是 \`https://mcp.surrealdb.com\`，就在主机根上，**不要**再拼 \`/mcp\` 或 \`/sse\`。拼了会 404。它和 \`https://api.surrealdb.com/api/mcp\` 是同一挂载，**不要**两张表都加。

只要 Cloud MCP：

\`\`\`bash
codex mcp add surrealdb --url https://mcp.surrealdb.com
codex mcp login surrealdb
\`\`\`

\`\`\`toml
[mcp_servers.surrealdb]
url = "https://mcp.surrealdb.com"
enabled = true
\`\`\`

会话里批准 OAuth。托管页 TOML 还写过 \`auth = "oauth"\`，\`mcp add\` 之后用 \`mcp login\` 即可，不要再抄 Claude 的 \`--transport http\`。无头 / CI 才用个人访问令牌。官方 Codex 页的变量名是 \`SURREALDB_TOKEN\`，必须在**启动 Codex 的进程**里：

\`\`\`toml
[mcp_servers.surrealdb]
url = "https://mcp.surrealdb.com"
bearer_token_env_var = "SURREALDB_TOKEN"
enabled = true
\`\`\`

OAuth 和 bearer **不要**写进同一张表。令牌那张不要再 \`mcp login\`。不要把 token 写进 \`http_headers\`。

要技能和 MCP 打在一起，才走官方插件仓。清单 \`.agents/plugins/marketplace.json\` 的 name 是 surrealdb，插件 name 是 surrealdb，所以是 \`surrealdb@surrealdb\`：

\`\`\`bash
codex plugin marketplace add surrealdb/ai-codex-plugin --ref main
codex plugin add surrealdb@surrealdb
\`\`\`

装完策略是 \`ON_INSTALL\`，应弹出 Surreal ID 登录。仓里还有 \`agent-memory@surrealdb\`（同一托管 URL）和 \`surrealdb-local@surrealdb\`（自建）。\`surrealdb\` 和 \`agent-memory\` 会把同一套托管工具登记成两台，不需要就只装一个。Agent Memory / Spectron 旧文还写 \`spectron@surrealdb\` 和本地 clone 再 \`marketplace add "$PWD"\`，现行清单**没有** spectron，不要抄。

插件已经登记 \`surrealdb\` 时，不要再手写一张同 URL 的 \`[mcp_servers.surrealdb]\`。官方 \`npx skills add surrealdb/agent-skills\` 只装技能，**不会**登记 MCP，也没钉 \`--agent codex\`，不要把它当插件安装器，也不要和插件技能叠两份。

自建 / 本机实例才带 \`/mcp\`。默认示例：

\`\`\`bash
export SURREALDB_MCP_URL="http://127.0.0.1:8000/mcp"
export SURREALDB_MCP_TOKEN="your-session-jwt"
codex mcp add surrealdb-local --url http://127.0.0.1:8000/mcp --bearer-token-env-var SURREALDB_MCP_TOKEN
\`\`\`

本机 404 先看实例有没有 \`--deny-http mcp\`。\`surreal-bearer-\` 开头的 grant key **不是** HTTP 访问令牌，要先换成 JWT。不要用 \`surreal mcp\` stdio 去接正在跑的那台库：stdio 会另起嵌入式 datastore。不要把本机 \`/mcp\` 和托管根 URL 写成同一张表。

能改 schema 和数据，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。不要发明 \`codex plugin add surrealdb@openai-curated\`。网页 Cloud 不读你这台 \`CODEX_HOME\`。改完新开会话。用 \`codex mcp get surrealdb\` 看传输是 streamable_http，url 是 \`https://mcp.surrealdb.com\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "SurrealDB", "plugins", "OAuth"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "n8n-codex-mcp"],
    sources: [
      {
        label: "SurrealDB · Codex",
        url: "https://surrealdb.com/docs/agents/codex",
      },
      {
        label: "surrealdb/ai-codex-plugin",
        url: "https://github.com/surrealdb/ai-codex-plugin",
      },
      {
        label: "SurrealDB · MCP endpoint",
        url: "https://mcp.surrealdb.com/",
      },
    ],
  },
  {
    id: "infisical-agent-proxy-codex",
    no: 412,
    title: "Infisical Agent Proxy 用 run -- codex，不要 mcp add",
    summary:
      "官方点名 Codex：infisical secrets agent-proxy run -e dev --path=/coding-agent -- codex。这是凭证代理，不是 MCP。不要抄 docs/mcp 的 Claude JSON，也不要给 run 传 --proxy。",
    body: `Infisical Agent Proxy 把 Codex 当成会走 \`HTTPS_PROXY\` 的客户端。官方本机命令就是在 \`--\` 后面写 \`codex\`。这**不是** MCP：不要 \`codex mcp add Infisical\`，也不要把文档 MCP 页的 Claude / Cursor JSON 抄进 \`config.toml\`。

先 \`infisical login\`，在 Secrets 项目里放一条密钥，并在同一文件夹加 proxied service。Quickstart 示例路径是 \`/coding-agent\`，GitHub 模板会给 Codex 一个 \`GITHUB_TOKEN\` 占位符，出站时再换成真 PAT。从有 \`.infisical.json\` 的目录启动：

\`\`\`bash
infisical secrets agent-proxy run -e dev --path=/coding-agent -- codex
\`\`\`

\`--\` 后面是 Codex 自己的启动命令，原样执行。Linux 先装 bubblewrap。Windows 没有这层 OS 沙箱，\`run\` 会拒绝启动，除非你显式 \`--no-sandbox\`。不要给 \`run\` 传 \`--proxy\`：它总是自己起代理，传了会报错。

已经有一台独立代理时才用 \`connect\`，要和 \`start\` 成对，走机器身份，不是你的登录会话：

\`\`\`bash
infisical secrets agent-proxy connect --proxy=proxy.acme.internal:17322 --env=staging --path=/coding-agent -- codex
\`\`\`

沙箱默认开，而且套在 Codex 自己的沙箱外面，代理侧的限制抬不掉。官方允许读写 \`~/.codex\`，ChatGPT 登录态还在。\`~/.infisical\`、钥匙串、\`~/.ssh\` 会被拒。不要 \`--allow-read ~/.infisical\`。名字里带 \`TOKEN\` / \`API_KEY\` / \`SECRET\` 的环境变量会被清掉；若 Codex 靠 \`CODEX_API_KEY\` 登录，加 \`--pass-env CODEX_API_KEY\`。真密钥不会进 Codex 进程。

Codex 走环境变量信任：\`run\` 会设 \`SSL_CERT_FILE\` 等，指向本机临时 CA。临时目录形如 \`/tmp/infisical-agent-proxy-run-XXXXXX/\`，退出就删。只有 HTTP / HTTPS 会被代理，SSH 不行。沙箱里 \`Could not resolve host\` 往往表示工具没走代理。本机 \`127.0.0.1:5432\` 这类回环也到不了。

不要做这些：

- 不要把 \`https://infisical.com/docs/mcp\` 当成 Agent Proxy。那是文档 MCP，官方示例仍是 Claude / Cursor / VS Code / ChatGPT。
- 不要抄 \`claude mcp add --transport http Infisical https://infisical.com/docs/mcp\`。
- 不要抄 \`@infisical/mcp\` 的 Claude Desktop JSON。
- 不要和 Infisical Agent（密钥落到磁盘）或 Infisical Proxy（缓存 Infisical API）搞混。
- 不要从 Dock 直接开桌面，指望吃到这次 \`run\`。
- 不要把 \`INFISICAL_AGENT_PROXY_SANDBOX=0\` 写进 \`.infisical.json\`：官方不允许提交文件悄悄关掉沙箱。

网页 Cloud 不读这台包装。改完新开被包装的会话。`,
    category: "security",
    level: "starter",
    surfaces: ["cli", "ci"],
    tags: ["Infisical", "Agent Proxy", "sandbox", "secrets"],
    related: ["1password-mcp-stdio", "api-key-inline-env", "cli-auth-credentials-store"],
    sources: [
      {
        label: "Infisical · Local Agent Proxy",
        url: "https://infisical.com/docs/documentation/platform/agent-proxy/local-agent-proxy",
      },
      {
        label: "Infisical · agent-proxy CLI",
        url: "https://infisical.com/docs/cli/commands/agent-proxy",
      },
      {
        label: "Infisical · Agent Proxy quickstart",
        url: "https://infisical.com/docs/documentation/platform/agent-proxy/quickstart",
      },
    ],
  },
  {
    id: "postman-codex-mcp",
    no: 413,
    title: "Postman MCP 默认 /minimal，Full 才是 /mcp",
    summary:
      "官方 Codex：mcp add postman --url 走 mcp.postman.com/minimal。US 默认 OAuth；EU 只有 API key，必须 --bearer-token-env-var。Full 路径是 /mcp。本机 stdio 另起 postman-local。不要抄 experimental_use_rmcp_client。",
    body: `Postman 给 Codex CLI 有专节。远程是 Streamable HTTP，不是 \`npx mcp-remote\` 包装。US 默认 OAuth，不必先造 API key。EU 远程**只有** API key，没有 OAuth。

远程按工具面换路径，**同一张** \`postman\` 表改 url，不要叠四张：

| 配置 | US | EU |
| --- | --- | --- |
| Minimal（默认） | \`https://mcp.postman.com/minimal\` | \`https://mcp.eu.postman.com/minimal\` |
| Code | \`https://mcp.postman.com/code\` | \`https://mcp.eu.postman.com/code\` |
| Full | \`https://mcp.postman.com/mcp\` | \`https://mcp.eu.postman.com/mcp\` |
| Learn | \`https://mcp.postman.com/learn\` | \`https://mcp.eu.postman.com/learn\` |

Full 是 \`/mcp\`，**不是**光主机根，也不是 \`/minimal\`。Learn 查文档；Code 生成客户端代码。先走 Minimal，工具太多再换面。

US 主路径：

\`\`\`bash
codex mcp add postman --url https://mcp.postman.com/minimal
\`\`\`

浏览器没弹再 \`codex mcp login postman\`。文档没强制写 login，现行 Codex 对 OAuth 远程仍常用这一步。

\`\`\`toml
[mcp_servers.postman]
url = "https://mcp.postman.com/minimal"
enabled = true
\`\`\`

US 无头 / CI 才加 API key。EU 远程**必须**走密钥，不要 \`mcp login\`：

\`\`\`bash
codex mcp add postman --url https://mcp.eu.postman.com/minimal --bearer-token-env-var POSTMAN_API_KEY
\`\`\`

\`\`\`toml
[mcp_servers.postman]
url = "https://mcp.eu.postman.com/minimal"
bearer_token_env_var = "POSTMAN_API_KEY"
enabled = true
\`\`\`

变量必须在**启动 Codex 的那个进程**里。OAuth 和 bearer **不要**写进同一张表。API key 那张不要再 \`mcp login\`。不要把 token 写进 \`http_headers\`。

不要抄文档里的 \`experimental_use_rmcp_client = true\`。那是旧版只认 stdio 时的退路。现行 Codex 自带 Streamable HTTP；\`codex mcp add --url\` 不认得就升级 CLI，不要开实验开关。

本机是另一台 stdio，包名 \`@postman/postman-mcp-server\`。**不要**和远程共用 \`postman\` 表，另起 \`postman-local\`。文档写成 \`codex mcp add postman --env POSTMAN_API_KEY=\` 再接密钥，不要抄——那会把字面量写进 \`env\` 表。改用 \`env_vars\`，密钥放在启动 Codex 的进程里：

\`\`\`toml
[mcp_servers.postman-local]
command = "npx"
args = ["-y", "@postman/postman-mcp-server"]
env_vars = ["POSTMAN_API_KEY"]
enabled = true
\`\`\`

本机工具面用旗标，不是 URL：默认 Minimal；Code 加 \`--code\`，Full 加 \`--full\`，Learn 加 \`--learn\`。EU 本机再加 \`--region eu\`，或设 \`POSTMAN_API_BASE_URL\`。启动横幅打到 stdout 会 \`Transport closed\`，可在 args 里加 \`--quiet\`。

不要做这些：

- 不要发明 \`codex plugin add postman@…\`。
- 不要抄 Claude 的 \`--transport http\` 或 \`--header "Authorization: Bearer …"\`。
- 不要抄 Cursor / VS Code 的 JSON \`mcpServers\`。
- 不要把远程 \`postman\` 和本机 \`postman-local\` 配成一张表。
- 不要一上来 \`--yolo\`。不要 \`required = true\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get postman\` 看传输是 streamable_http，url 是 \`https://mcp.postman.com/minimal\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Postman", "OAuth", "stdio"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "mcp-stdio-env-vars"],
    sources: [
      {
        label: "Postman · Remote MCP",
        url: "https://learning.postman.com/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server",
      },
      {
        label: "Postman · Local MCP",
        url: "https://learning.postman.com/docs/reference/postman-api/postman-mcp-server/postman-mcp-local-server",
      },
      {
        label: "postmanlabs/postman-mcp-server",
        url: "https://github.com/postmanlabs/postman-mcp-server",
      },
    ],
  },
  {
    id: "apify-codex-plugin",
    no: 414,
    title: "Apify 插件会登记 mcp.apify.com，不要再叠一张",
    summary:
      "官方 Codex：marketplace add apify/apify-codex-plugin，再 plugin add apify@apify-plugins。插件会登记远程 mcp.apify.com。不要手写 mcp add 叠一张。无头才 APIFY_TOKEN。不要抄 Cursor JSON 的 Bearer。",
    body: `Apify 给 Codex CLI 和桌面都有专节。插件**会**替 Codex 登记 MCP，这点和 n8n 技能仓相反。官方安装页只写了 \`/plugins\` 点选；清单 \`.agents/plugins/marketplace.json\` 的 name 是 apify-plugins，插件 name 是 apify，CLI 等价是：

\`\`\`bash
codex plugin marketplace add apify/apify-codex-plugin
codex plugin add apify@apify-plugins
\`\`\`

\`codex plugin list\` 应看到 \`apify@apify-plugins\` 为 installed, enabled。桌面在 Plugins → Personal 的 Apify Plugin 下装。IDE 扩展没有 \`/plugins\`，用 CLI 装完新开会话。不要抄 Claude 的 \`/plugin marketplace add apify/apify-codex-plugin\`。

插件 \`.mcp.json\` 把远程写成 \`https://mcp.apify.com/?client=codex+plugin\`，表名是 \`apify\`。**不要**再 \`codex mcp add apify --url https://mcp.apify.com\` 叠一张。也不要跑 \`apify mcp install codex\`——那会再写一张用户层 \`apify\` 表。

装插件或第一次连 MCP 时走 OAuth。浏览器没弹，把终端里的 URL 粘进浏览器。官方 CLI 页写搜索 Store 可以不登录；仓库 README 写默认入口所有工具都要账号。跑 Actor、读数据集必须登录。无头 / SSH 才在**启动 Codex 的那个进程**里准备 \`APIFY_TOKEN\`，不要写进 \`http_headers\`，也不要抄 Cursor JSON 的 \`Authorization: Bearer\`。

只要 MCP、不要技能，才手写：

\`\`\`bash
codex mcp add apify --url https://mcp.apify.com
codex mcp login apify
\`\`\`

OAuth 和 bearer 不要写进同一张表。API key 那张用 \`bearer_token_env_var = "APIFY_TOKEN"\`，不要再 \`mcp login\`。默认 URL **没有** \`/mcp\` 后缀。不要把 token 拼进查询串。不要抄即将弃用的 SSE，也不要抄本机 \`npx @apify/actors-mcp-server\` 当插件主路径。

\`apify-actor-development\`、\`apify-actorization\`、\`apify-ultimate-scraper\` 还要本机 Apify CLI：

\`\`\`bash
npm install -g apify-cli
apify login
\`\`\`

\`apify-sdk-integration\` 和无头工作流才读进程里的 \`APIFY_TOKEN\`。长 Actor 可能超过单次工具等待，拆小再跑。Actor 计费是 Apify 套餐，不是 Codex 额度。能改仓库的技能保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add apify@openai-curated\`。
- 不要把 \`npx skills add\` 或 \`apify/agent-skills\` 当这份 Codex 插件安装器。
- 不要抄 Claude 的 \`--transport http\` 或 \`--header "Authorization: Bearer …"\`。
- 不要把手写 \`apify\` 表和插件捆绑的 \`apify\` 表叠成两台。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get apify\` 看传输是 streamable_http，url 带 \`mcp.apify.com\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "Apify", "Skills", "MCP"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "n8n-codex-mcp"],
    sources: [
      {
        label: "Apify · Codex CLI",
        url: "https://docs.apify.com/integrations/codex-cli",
      },
      {
        label: "Apify · Codex desktop",
        url: "https://docs.apify.com/integrations/codex-app",
      },
      {
        label: "apify/apify-codex-plugin",
        url: "https://github.com/apify/apify-codex-plugin",
      },
    ],
  },
  {
    id: "nylas-codex-mcp",
    no: 415,
    title: "Nylas MCP 走 mcp.us.nylas.com，不要 mcp login",
    summary:
      "官方 Codex：mcp add nylas --url 走 mcp.us.nylas.com，没有 /mcp 后缀。Bearer 用 NYLAS_API_KEY，不要 mcp login，不要抄 mcp-remote。EU 换 mcp.eu.nylas.com。",
    body: `Nylas 给 Codex CLI 有专节。远程是 Streamable HTTP + Bearer，**不是** OAuth。官方写明不必走代理包装，也不要 \`mcp login\`。

US 默认入口是 \`https://mcp.us.nylas.com\`，**没有** \`/mcp\` 后缀。EU 应用换 \`https://mcp.eu.nylas.com\`。不要和 Linear 那条 \`mcp.linear.app/mcp\` 抄成一样。

\`\`\`bash
codex mcp add nylas --url https://mcp.us.nylas.com --bearer-token-env-var NYLAS_API_KEY
\`\`\`

\`\`\`toml
[mcp_servers.nylas]
url = "https://mcp.us.nylas.com"
bearer_token_env_var = "NYLAS_API_KEY"
enabled = true
\`\`\`

变量必须在**启动 Codex 的那个进程**里。文档示例把密钥写成 \`export NYLAS_API_KEY=\` 再接字面量，不要把密钥写进 \`config.toml\` 或 \`http_headers\`。桌面从 Dock 打开常常没有 zshrc；从已 export 的终端启动，或彻底退出后再开。

有 Nylas CLI 也可以 \`nylas mcp install --assistant codex\`，再 \`nylas mcp status\`。它会写同一张 \`nylas\` 表，**不要**和手写 \`mcp add\` 叠成两台。不要发明 \`codex plugin add nylas@…\`。

不要抄这些：

- 不要抄 Claude 的 \`--transport http\` 或 \`--header "Authorization: Bearer …"\`。
- 不要抄 Claude Desktop 的 \`npx mcp-remote\` + \`--transport http-first\`。
- 不要抄 Cursor JSON 的 \`headers\` Bearer。
- 不要抄即将弃用的 SSE，也不要开 \`experimental_use_rmcp_client\`。

发信是两步：先 \`confirm_send_message\` / \`confirm_send_draft\` 拿确认哈希，再 \`send_message\` / \`send_draft\`。删草稿和删事件不可逆，保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。大邮箱加上日期或搜索过滤，必要时把 \`tool_timeout_sec\` 提到 \`90\`。

先在 Nylas 控制台建应用、API key，并至少连一个 grant（Gmail / Outlook / IMAP 等）。网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get nylas\` 看传输是 streamable_http，url 是 \`https://mcp.us.nylas.com\`，Auth 是 Bearer。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Nylas", "Bearer", "邮件"],
    related: ["mcp-http-bearer-env", "mcp-add-and-login", "mcp-http-not-sse"],
    sources: [
      {
        label: "Nylas · Codex CLI",
        url: "https://developer.nylas.com/docs/cookbook/ai/mcp/codex-cli/",
      },
      {
        label: "Nylas · MCP server",
        url: "https://developer.nylas.com/docs/dev-guide/mcp/",
      },
    ],
  },
  {
    id: "microsoft-learn-codex-mcp",
    no: 416,
    title: "Learn MCP 走 api/mcp，不要 mcp login",
    summary:
      "官方 Codex：mcp add microsoft-learn --url 走 learn.microsoft.com/api/mcp。公共文档无鉴权，不要 mcp login，不要抄 VS Code JSON。不要和 Azure Skills 那台 azure MCP 搞成一台。",
    body: `Microsoft Learn MCP 是远程 Streamable HTTP，读公开文档，**不要钥匙**。仓库 README 给 Codex 的一行是：

\`\`\`bash
codex mcp add microsoft-learn --url https://learn.microsoft.com/api/mcp
\`\`\`

\`\`\`toml
[mcp_servers.microsoft-learn]
url = "https://learn.microsoft.com/api/mcp"
enabled = true
\`\`\`

入口是 \`/api/mcp\`，**不要**再叠一层 \`/mcp\`。**microsoft-learn 远程无鉴权不要 mcp login**。不要 \`--bearer-token-env-var\`，也不要发明 \`mcp login microsoft-learn\`。浏览器打开这支 URL 常回 405，那是给 MCP 客户端的，不是网页。

不要抄 VS Code / Cursor 的 JSON \`type: http\`，也不要抄 ChatGPT Connectors 点 Create。Deep Research 才用 \`https://learn.microsoft.com/api/mcp/openai-compatible\`，**不是** Codex 这张表。实验参数 \`maxTokenBudget\` 不要默认拼进 URL。

仓库里有 \`.codex-plugin\` 和 \`.agents/plugins/marketplace.json\`。清单 name 是 \`microsoftdocs-local\`，插件 name 是 \`microsoft-docs\`。README 用户表**没写** \`plugin marketplace add\`。想装插件再：

\`\`\`bash
codex plugin marketplace add MicrosoftDocs/mcp
codex plugin add microsoft-docs@microsoftdocs-local
\`\`\`

插件 \`.mcp.json\` 会登记同一张 \`microsoft-learn\` 表。**不要**和手写 \`mcp add microsoft-learn\` 叠成两台。不要抄 Claude 的 \`/plugin marketplace add microsoftdocs/mcp\` 或 \`/plugin install microsoft-docs@microsoft-docs-marketplace\`。Copilot 的 \`/plugin install microsoftdocs/mcp\` 也不是 Codex。

\`mslearn setup --cli --codex\` 只把 CLI 技能写到 \`~/.agents/skills/\`（项目层是 \`.agents/skills/\`），**不会**写 MCP 表。有 MCP 时技能应让模型优先走 MCP，CLI 技能只当回退。不要把 \`npx @microsoft/learn-cli\` 当 \`codex mcp add\`。

不要和 Azure Skills 搞混。那边是 \`marketplace add microsoft/azure-skills\`，插件 MCP 是本机 \`npx @azure/mcp@latest server start\`，要 \`az login\`，会动订阅。Learn MCP 只查文档。也不要和 Azure DevOps 本地 \`@azure-devops/mcp\` 写成一台。

工具会随服务变，不要把名字写进脚本。会话里用 \`/mcp\` 看当前列表。保持工具批准。不要 \`required = true\`。

不要做这些：

- 不要发明 \`codex plugin add microsoft-docs@microsoft-docs-marketplace\`。
- 不要手拷技能到 \`~/.codex/skills\`。
- 不要抄 Claude 的 \`--transport http\`。
- 不要抄 \`mcp-remote\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get microsoft-learn\` 看传输是 streamable_http，url 是 \`https://learn.microsoft.com/api/mcp\`，Auth 是 Unsupported。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Microsoft Learn", "文档"],
    related: ["azure-skills-plugin", "azure-devops-local-mcp", "mcp-add-and-login"],
    sources: [
      {
        label: "MicrosoftDocs/mcp",
        url: "https://github.com/MicrosoftDocs/mcp",
      },
      {
        label: "Microsoft Learn MCP Server",
        url: "https://learn.microsoft.com/en-us/training/support/mcp",
      },
    ],
  },
  {
    id: "dotnet-skills-plugin",
    no: 417,
    title: ".NET 技能用 marketplace 加 dotnet/skills，不要抄 Copilot 的 plugin install",
    summary:
      "官方 Codex：marketplace add dotnet/skills，再 /plugins 装。dotnet/skills 清单名是 dotnet-agent-skills，官方没给 plugin add id。不要抄 Copilot 的 /plugin install。不要和 Azure Skills 搞成同一份。",
    body: `.NET 团队给 Codex 有专节，写在 \`dotnet/skills\` 仓库 README。这是**插件 marketplace**，不是手拷 SKILL.md。要求 Codex CLI **0.121.0** 以上。官方 Codex 主路径：

\`\`\`bash
codex plugin marketplace add dotnet/skills
\`\`\`

然后 TUI \`/plugins\` 或桌面 Plugins 打开 **.NET Agent Skills** 这一栏，再装你要的插件。升级用清单名，不是仓库路径：

\`\`\`bash
codex plugin marketplace upgrade dotnet-agent-skills
\`\`\`

dotnet/skills 清单名是 \`dotnet-agent-skills\`，官方没给 plugin add id。不要把 Copilot / Claude 的 \`/plugin marketplace add dotnet/skills\` 或 \`/plugin install dotnet@dotnet-agent-skills\` 抄进 Codex。Codex 加源是 \`codex plugin marketplace add\`，装插件走 \`/plugins\`，**不要发明** \`codex plugin add dotnet@dotnet-agent-skills\`。

0.154 起先看**当前会话**；当前会话 \`/plugins\` 没有再新开。桌面改 marketplace.json 仍要重启应用。IDE 扩展没有 \`/plugins\`。CLI 装好的插件，Codex 桌面也能用。

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`dotnet-agent-skills\`，展示名是 .NET Agent Skills。插件都是仓内本地路径，例如：

- \`dotnet\`：C# 语言服务（LSP）和日常 .NET 技能
- \`dotnet-msbuild\` / \`dotnet-nuget\` / \`dotnet-upgrade\`：构建、包、升级
- \`dotnet-aspnetcore\` / \`dotnet-blazor\` / \`dotnet-maui\`：Web 和跨平台
- \`dotnet-test\` / \`dotnet-test-migration\`：测试和框架迁移
- \`dotnet11\`：.NET 11 新 API

不要和 \`microsoft/azure-skills\` 搞成同一份源。那份清单名是 \`azure-skills\`，主插件是 \`azure\`，带 Azure MCP。这份是 .NET / C# 技能。

README 另给一条单技能回退：\`skill-installer install https://github.com/dotnet/skills/tree/main/plugins/dotnet/skills/…\`。那是 skill-installer，**不是** Codex \`/plugins\`，也不会登记 marketplace。不要用 \`npx skills add\` 当 Codex 插件安装器。不要手拷到 \`~/.codex/skills\`；现行个人目录是 \`~/.agents/skills\`。

不要抄 Cursor 的 marketplace 面板或 VS Code 的 \`chat.plugins.marketplaces\`。不要抄 \`/plugin update …@dotnet-agent-skills\`；Codex 升级 marketplace 是上面那条 \`upgrade\`。

网页 Cloud 不读本机 marketplace。改完用 \`codex plugin marketplace list\` 核对清单名是 \`dotnet-agent-skills\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", ".NET", "Skills", "C#"],
    related: ["azure-skills-plugin", "plugin-session-refresh", "firebase-agent-skills"],
    sources: [
      {
        label: "dotnet/skills",
        url: "https://github.com/dotnet/skills",
      },
      {
        label: "Codex plugins",
        url: "https://developers.openai.com/codex/plugins",
      },
    ],
  },
  {
    id: "mcp-helicone-stdio",
    no: 418,
    title: "Helicone MCP 走本地 npx stdio，密钥不要写进 env 表",
    summary:
      "官方 Codex：mcp add helicone -- npx @helicone/mcp@latest。stdio，不要 mcp login。密钥用 env_vars 转发 HELICONE_API_KEY。不要发明 plugin add，也不要配成 model_providers。",
    body: `Helicone 给 Codex 的是**本机 stdio**，不是远程 HTTP。官方 MCP 页有 Codex 专节，表名就是 \`helicone\`。包是 \`@helicone/mcp@latest\`，用 \`npx\` 起进程，再去查你账号里的请求和会话。不要给它写 \`url\`，也不要抄 \`type = "http"\`。

Helicone 官方 Codex 把 HELICONE_API_KEY 写成 env 表字面量。那是把密钥嵌进 \`~/.codex/config.toml\`，TOML 占位符也不会展开。Codex 正确写法是从**启动 Codex 的那个进程**转发变量名：

\`\`\`bash
codex mcp add helicone -- npx @helicone/mcp@latest
\`\`\`

\`\`\`toml
[mcp_servers.helicone]
command = "npx"
args = ["@helicone/mcp@latest"]
env_vars = ["HELICONE_API_KEY"]
enabled = true
startup_timeout_sec = 60
\`\`\`

这是 stdio，**不要** \`codex mcp login helicone\`。\`mcp add\` 写进用户层 \`~/.codex/config.toml\`，对你所有项目生效。官方 TOML 没写 \`-y\`；冷启动想跳过 npm 确认，才把 args 改成 \`["-y", "@helicone/mcp@latest"]\`。不要 \`required = true\`。不要一上来 \`--yolo\`：查请求时若打开响应体，密钥和提示词会进上下文。

密钥从 [Settings → API Keys](https://us.helicone.ai/settings/api-keys) 拿，欧盟账号走 [eu.helicone.ai](https://eu.helicone.ai/settings/api-keys)。变量必须在启动 Codex 的 shell 里。不要把 \`sk-helicone-\` 开头的值写进 \`env\` 表、\`args\` 或 \`http_headers\`。

欧盟密钥目前仍打美区 \`https://api.helicone.ai\`。\`@helicone/mcp@latest\` 和仓库里的 \`helicone-client.ts\` 都把基址写死了，设 \`HELICONE_BASE_URL\` **不会**被读到，请求会 401。在上游合进可读环境变量之前，不要把欧盟密钥当这台 MCP 的主路径。

官方文档 Codex 节只写了查请求、查会话。源仓 README 还多了 AI Gateway 调用；那是这台 stdio 服务器自己的工具，**不是** \`[model_providers]\`，也不要另起一张 HTTP 表。不要发明 \`codex plugin add helicone@…\`。

不要做这些：

- 不要抄 \`mcpServers\` JSON。Codex 用 \`[mcp_servers.helicone]\`。
- 不要抄 Claude Desktop / Cursor 的 \`env.HELICONE_API_KEY\` 字面量。
- 不要给它 \`url = "https://api.helicone.ai"\` 再 \`mcp login\`。
- 不要和 Langfuse 文档 MCP、产品 MCP 写成同一张表。
- 不要把 Helicone AI Gateway 配成 Codex 的模型供应商来「代替」这台查询 MCP。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get helicone\` 看传输是 stdio，command 是 npx。会话里 \`/mcp\` 只是核对工具，不是登录入口。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Helicone", "stdio", "观测"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "mcp-langfuse-cloud"],
    sources: [
      {
        label: "Helicone · MCP Server",
        url: "https://docs.helicone.ai/integrations/tools/mcp",
      },
      {
        label: "Helicone/helicone · helicone-mcp",
        url: "https://github.com/Helicone/helicone/tree/main/helicone-mcp",
      },
      {
        label: "@helicone/mcp",
        url: "https://www.npmjs.com/package/@helicone/mcp",
      },
    ],
  },
  {
    id: "mcp-docker-toolkit",
    no: 419,
    title: "Docker MCP Toolkit 必须 --global，表名 MCP_DOCKER",
    summary:
      "Codex 接 Docker Toolkit 必须 --global，表名是 MCP_DOCKER。CLI 是 docker mcp client connect --global codex。stdio，不要 mcp login。核对 Auth 列是 Unsupported。不要抄旧博客 mcp-client configure。",
    body: `Docker Desktop 的 MCP Toolkit 给 Codex 有专节。它不是远程 HTTP，也不是 Docker Hub REST。本机网关走 stdio，官方用户层表名是 \`MCP_DOCKER\`。Codex 只认全局配置，\`docker mcp client connect\` **必须**带 \`--global\`（或 \`-g\`），漏了会报 \`codex only supports global configuration\`。

先装 Docker Desktop **4.62** 或以上。Settings → Beta features → Enable Docker MCP Toolkit，再 Apply。只要 Engine、没有 \`docker mcp\` 插件不够。在 Toolkit 里建 profile、从 Catalog 加服务器；需要 OAuth 的服务器在 Desktop 里授权，**不要**对网关这张表跑 \`codex mcp login\`。

主路径用 Desktop：MCP Toolkit → Clients → 找到 Codex → Connect。CLI 等价：

\`\`\`bash
docker mcp client connect --global codex
codex mcp list
\`\`\`

指定 profile（官方 CLI 示例常用 \`web-dev\`）：

\`\`\`bash
docker mcp client connect --global --profile web-dev codex
\`\`\`

官方核对 \`codex mcp list\` 应看到 \`MCP_DOCKER\`，Command 是 \`docker\`，Args 是 \`mcp gateway run\`，Status 是 enabled，**Auth 列是 Unsupported**。那是预期：网关自己不走 Codex 的 OAuth 探活。

手写等价（已经 \`connect\` 过就不要再 add 一张同名表）：

\`\`\`bash
codex mcp add MCP_DOCKER -- docker mcp gateway run
\`\`\`

\`\`\`toml
[mcp_servers.MCP_DOCKER]
command = "docker"
args = ["mcp", "gateway", "run"]
enabled = true
startup_timeout_sec = 60
\`\`\`

指定 profile 时 \`args\` 写成 \`["mcp", "gateway", "run", "--profile", "web-dev"]\`。网关冷启动大约 15–25 秒，默认握手 10 秒不够，所以加 \`startup_timeout_sec = 60\`。这是 stdio，不要写 \`url\`，也不要抄 Claude / Cursor 的 \`mcpServers\` JSON，也不要抄 \`type = "stdio"\`。

断开：

\`\`\`bash
docker mcp client disconnect --global codex
\`\`\`

Catalog 里常见 Playwright、GitHub 一类服务器。官方测试句是 \`codex "Use the GitHub MCP server to show me my open pull requests"\`，前提是 profile 里已经加了 GitHub 并完成授权。Playwright 走 Toolkit 时由网关拉容器，不要再叠一张 \`playwright\` stdio 表指向 \`npx @playwright/mcp\`。

不要和这几条搞混：

- 2025 年 10 月那篇 Docker 博客写 \`docker mcp-client configure codex\`，命令已经作废，现行是 \`docker mcp client connect\`。
- VS Code 可以 \`docker mcp client connect vscode\` 写项目级 \`.vscode/mcp.json\`。Codex **没有**项目级 connect，不要漏 \`--global\`，也不要把那份 JSON 贴进 \`config.toml\`。
- GitHub issue 里有人把表名写成 \`docker-mcp-gateway\`。官方文档和 \`mcp list\` 示例都是 \`MCP_DOCKER\`。
- 这不是 Composio / 第三方 Docker Hub MCP，也不是给 Codex 发明 \`plugin add docker@\`。

\`which docker\` 找不到时，把 \`command\` 写成 Desktop 的 \`docker\` 绝对路径；Windows + WSL 常要指向 \`docker.exe\`。路径带空格时让 Codex 自己写进 TOML，不要拆成两个 args。不要 \`required = true\`。不要一上来 \`--yolo\`。保持工具批准。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get MCP_DOCKER\` 看传输是 stdio，command 是 \`docker\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Docker", "MCP Toolkit", "stdio"],
    related: ["mcp-add-and-login", "mcp-startup-timeout-sec", "playwright-mcp"],
    sources: [
      {
        label: "Docker Docs · Get started with MCP Toolkit",
        url: "https://docs.docker.com/ai/mcp-catalog-and-toolkit/get-started/",
      },
      {
        label: "Docker Docs · docker mcp client connect",
        url: "https://docs.docker.com/reference/cli/docker/mcp/client/connect/",
      },
      {
        label: "docker/mcp-gateway · ConnectCodex",
        url: "https://github.com/docker/mcp-gateway/blob/0c227325/pkg/client/connect.go",
      },
    ],
  },
  {
    id: "amd-skills-plugin",
    no: 420,
    title: "AMD Skills 用 marketplace 加 amd/skills，不要抄 README 的 npx skills add",
    summary:
      "AMD 技能仓清单名是 amd-skills，再 plugin add amd-skills@amd-skills。README 主路径仍是 npx skills add，那不是 Codex 插件安装器。插件只带精选子集，没有 MCP。",
    body: `AMD 给 Codex 已经有仓库 marketplace，文件在 \`.agents/plugins/marketplace.json\` 和 \`.codex-plugin/plugin.json\`。生成脚本写明：\`codex plugin marketplace add amd/skills\` 会露出这份捆。README 安装节还停在 vercel-labs 的 \`skills\` CLI，并以「Until marketplace integration lands」带手拷路径；**现行 Codex 主路径是插件 marketplace**，不是 \`npx skills add\`。

\`\`\`bash
codex plugin marketplace add amd/skills
codex plugin add amd-skills@amd-skills
codex plugin marketplace list
\`\`\`

清单 \`name\` 和插件 \`name\` 都是 \`amd-skills\`，所以装插件是 \`amd-skills@amd-skills\`。不要发明 \`amd@amd-skills\` 或 \`amd-skills@openai-curated\`。升级用清单名，不是仓库路径：

\`\`\`bash
codex plugin marketplace upgrade amd-skills
\`\`\`

也可以 TUI \`/plugins\` 打开 **AMD Skills** 再装。0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace.json 仍要重启应用。IDE 扩展没有 \`/plugins\`。CLI 装好的插件，Codex 桌面也能用。

这是**技能插件**，\`plugin.json\` 没有 MCP，不要 \`codex mcp add\`。清单 \`policy.authentication\` 是 \`ON_INSTALL\`：安装时可能弹出钩子/信任提示，批准后再用。网页 Cloud 不读本机 marketplace。

插件只带精选子集，不是整个 catalog。现行 \`plugin.json\` 的 skills 是：

- \`local-ai-use\` / \`local-ai-app-integration\`：本机 Ryzen AI 图像、语音和把云端应用改走本地推理
- \`serving-llms-on-instinct\`：在 Instinct GPU 上用 vLLM 起推理
- \`hyperloom-workload-optimizer\`：Instinct 推理吞吐
- \`tracelens-analysis-orchestrator\`：PyTorch trace / TraceLens

目录里还有 \`serving-llms-on-epyc\`、\`lemonade-router-builder\`、\`magpie-kernel-evaluator\`，以及 planned 的 \`rocm-doctor\` / \`hrr-replay-analysis\`。这些**不在**这份插件包里，不要写成已经装上。单项才：

\`\`\`bash
npx skills add amd/skills --skill serving-llms-on-epyc --agent codex
\`\`\`

那是把 SKILL.md 拷进技能目录，**不会**登记 marketplace。不要省略 \`--agent codex\`。不要手拷到 \`~/.codex/skills\`；README 手动路径是 \`$HOME/.agents/skills\` 或仓库 \`.agents/skills\`。

不要抄 Claude 的 \`/plugin marketplace add\` 或 \`/plugin install\`。不要和 \`google/skills\` 的 \`google-cloud-developer@google-plugins\` 搞混：那份清单名是 \`google-plugins\`，这份是 \`amd-skills\`。

改完用 \`codex plugin marketplace list\` 核对清单名是 \`amd-skills\`，\`codex plugin list\` 里应有 \`amd-skills@amd-skills\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "AMD", "Skills", "ROCm"],
    related: ["dotnet-skills-plugin", "plugin-session-refresh", "google-cloud-developer-plugin"],
    sources: [
      {
        label: "amd/skills",
        url: "https://github.com/amd/skills",
      },
      {
        label: "amd/skills marketplace.json",
        url: "https://github.com/amd/skills/blob/main/.agents/plugins/marketplace.json",
      },
      {
        label: "Codex plugins",
        url: "https://developers.openai.com/codex/plugins",
      },
    ],
  },
  {
    id: "mcp-danube-http",
    no: 421,
    title: "Danube MCP 走 mcp.danubeai.com/mcp 加 bearer，不要抄文档 http_headers",
    summary:
      "文档 TOML 把 API 密钥写进 http_headers，CLI 改走 DANUBE_API_KEY。官方 Codex：mcp add danube --url https://mcp.danubeai.com/mcp --bearer-token-env-var DANUBE_API_KEY。URL 带 /mcp。不要 mcp login。",
    body: `Danube 给 Codex CLI 有专节。远程是 Streamable HTTP，表名就是 \`danube\`。文档先承认 \`codex mcp add\` **设不了自定义头**，于是把密钥写进 \`http_headers\`。那会把 \`dk_\` 嵌进 \`~/.codex/config.toml\`。同一页的官方替代路径才是 CLI 主路径：

\`\`\`bash
codex mcp add danube --url https://mcp.danubeai.com/mcp --bearer-token-env-var DANUBE_API_KEY
\`\`\`

URL **带** \`/mcp\` 后缀。\`DANUBE_API_KEY\` 必须在**启动 Codex 的那个进程**里；Dock / 开始菜单打开的桌面读不到 zshrc。键里填的是变量名，不是 token。这是 bearer，**不要** \`codex mcp login danube\`。

\`\`\`toml
[mcp_servers.danube]
url = "https://mcp.danubeai.com/mcp"
bearer_token_env_var = "DANUBE_API_KEY"
enabled = true
startup_timeout_sec = 30
\`\`\`

密钥从 [Danube Dashboard → API Keys](https://danubeai.com/dashboard/api-keys) 拿。不要把 \`dk_\` 写进 \`http_headers\`、\`args\`、\`env\` 表或 URL。文档 TOML 示例：

\`\`\`toml
[mcp_servers.danube.http_headers]
danube-api-key = "YOUR_API_KEY"
\`\`\`

**不要抄。** 自定义头回退才用 \`env_http_headers\`，左边是头名 \`danube-api-key\`（必须小写），右边仍是变量名：

\`\`\`toml
[mcp_servers.danube]
url = "https://mcp.danubeai.com/mcp"
enabled = true

[mcp_servers.danube.env_http_headers]
danube-api-key = "DANUBE_API_KEY"
\`\`\`

Bearer 若 401，再改走这套自定义头，不要两套叠。Skill 页写过有的客户端不认 \`Authorization: Bearer\`；Codex CLI 专节明确说 CLI 认 bearer。先走官方 CLI 那条。

桌面 Settings → MCP Servers 的 Authenticate 是贴 API key 的 OAuth 页，**不要**和 CLI 的 bearer 叠成两套。CLI、桌面、IDE 扩展共用 \`~/.codex/config.toml\`。项目层才写可信仓库的 \`.codex/config.toml\`。

不要抄 Claude / Cursor 的 \`mcpServers\` JSON。不要抄 \`npx mcp-remote\`。不要发明 \`codex plugin add danube@…\`。官方 Agent Skill 页面向 Claude，不是 Codex \`/plugins\`。这台能搜工具并真正执行（发信、改钱包限额），保持工具批准，不要一上来 \`--yolo\`。不要 \`required = true\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get danube\` 看传输是 streamable_http、Auth 是 Bearer。\`/mcp\` 只是核对工具，不是登录入口。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Danube", "HTTP", "bearer"],
    related: ["mcp-http-bearer-env", "mcp-http-env-headers", "mcp-add-and-login"],
    sources: [
      {
        label: "Danube · Codex CLI",
        url: "https://docs.danubeai.com/mcp-clients/codex-cli",
      },
      {
        label: "Danube · Codex desktop",
        url: "https://docs.danubeai.com/mcp-clients/codex",
      },
      {
        label: "danubeai/danube-mcp",
        url: "https://github.com/danubeai/danube-mcp",
      },
    ],
  },
  {
    id: "mcp-asana-v2-remote",
    no: 422,
    title: "Asana V2 官方 Codex 走 mcp-remote 加凭证文件，不要 mcp add --url",
    summary:
      "Asana 不支持 DCR。官方 Codex 节是 stdio 桥接 mcp-remote@latest，client 凭证写进 chmod 600 的 json，用 @ 绝对路径读取。不要 mcp add --url，也不要 mcp login asana。",
    body: `Asana V2 官方 Codex 走 mcp-remote 加凭证文件，不要 mcp add --url。远程入口是 \`https://mcp.asana.com/v2/mcp\`，本身是 Streamable HTTP，但 V2 **不支持** Dynamic Client Registration。必须先在 [Asana 开发者控制台](https://app.asana.com/0/my-apps) 建 **MCP app**，拿到 client ID / secret。Codex 没有 Claude Code 那种 \`--client-id\` / \`--client-secret\` 旗标，所以官方 Codex 节才用 \`npx mcp-remote@latest\` 当本机 stdio 桥。这是站点里「远程 MCP 不要先套 mcp-remote」的**例外**，不是默认修法。

先登记 MCP app，OAuth Redirect URL 必须写成：

\`http://localhost:3334/oauth/callback\`

不要抄 Claude Code 的 \`8080/callback\`、Cursor 的 \`cursor://\` 协议，或 VS Code 的 \`127.0.0.1:33418/\`。控制台和客户端必须**逐字**一致。工作区在 Manage distribution 里至少勾一个，否则授权会报 This app is not available to your Asana workspace。

凭证不要写进 \`args\`、不要 export 进进程命令行。官方让你建一份只有自己能读的 json：

\`\`\`bash
mkdir -p ~/.asana
chmod 700 ~/.asana
\`\`\`

\`\`\`json
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET"
}
\`\`\`

\`\`\`bash
chmod 600 ~/.asana/mcp_oauth_client.json
\`\`\`

然后手写用户层 \`~/.codex/config.toml\`。文档里的 \`codex mcp\` 初始化命令含糊，不要当主路径。\`~\` **不会**展开，\`@\` 后面必须是绝对路径：

\`\`\`toml
[mcp_servers.asana]
command = "npx"
args = [
  "-y",
  "mcp-remote@latest",
  "https://mcp.asana.com/v2/mcp",
  "3334",
  "--static-oauth-client-info",
  "@/Users/YOUR_USERNAME/.asana/mcp_oauth_client.json",
  "--resource",
  "https://mcp.asana.com/v2"
]
startup_timeout_sec = 60
\`\`\`

Linux 把路径换成 \`/home/YOU/.asana/mcp_oauth_client.json\`。\`@\` 前缀让 mcp-remote **运行时**读文件，避免 \`client_secret\` 出现在进程列表。\`3334\` 是回调端口，对应上面那条 Redirect URL。\`--resource\` 是 \`https://mcp.asana.com/v2\`，**不要**再加 \`/mcp\`。冷启动 npx 把 \`startup_timeout_sec\` 提到 60。不要 \`required = true\`。现行文档直接 \`command = "npx"\`，不要再包一层 \`sh -c\`。

这是 stdio 桥，**不要** \`codex mcp add asana --url https://mcp.asana.com/v2/mcp\`，也**不要** \`codex mcp login asana\`。博客里那套把 Asana 当成支持 DCR 的远程 HTTP，会在客户端注册处失败。配好后打开 Codex 设置的 MCP servers，点 Asana 触发浏览器授权；票进 \`~/.mcp-auth/\`。CLI 会话里 \`/mcp\` 只是核对工具，不是登录入口。

\`mcp-remote\` 是社区实验包，Asana **不提供**支持。官方更推荐 Claude Code 的原生预注册 OAuth；Codex 没有等价旗标，才走桥。用之前自己看清风险。本机要有 Node.js / npm。

V1 \`https://mcp.asana.com/sse\` 已弃用，关闭日期后来延到 2026-08-05。不要抄 \`/sse\`，也不要给 Codex 选旧 SSE 传输。MCP app 签出来的 token **只能**打 MCP 服务器，不能拿去调普通 Asana REST。

不要做这些：

- 不要抄 Claude Code 的 \`--transport http\`、\`--client-id\`、交互粘贴 \`--client-secret\`。
- 不要抄 Cursor JSON 的 \`auth.CLIENT_ID\` / \`auth.CLIENT_SECRET\`。
- 不要抄 Windsurf / Kiro 把 client 凭证塞进 args 里的 JSON 字符串；那会进进程命令行。
- 不要把 \`ASANA_CLIENT_SECRET\` 写进 \`env\` 表或 \`args\`。那是给别的客户端的环境变量提示，不是 Codex 主路径。
- 不要发明 \`codex plugin add asana@…\`。
- 不要一上来 \`--yolo\`：任务和评论会进上下文。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get asana\` 看传输是 stdio，command 是 npx。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Asana", "OAuth", "mcp-remote"],
    related: ["mcp-http-not-sse", "mcp-add-and-login", "kuroco-mcp-http"],
    sources: [
      {
        label: "Asana · Connecting Coding Clients to the V2 server",
        url: "https://developers.asana.com/docs/connecting-mcp-clients-to-asanas-v2-server",
      },
      {
        label: "Asana · Integrating with Asana's MCP Server",
        url: "https://developers.asana.com/docs/integrating-with-asanas-mcp-server",
      },
    ],
  },
  {
    id: "mcp-sequel-http",
    no: 423,
    title: "Sequel 官方 Codex 读 config.toml 加 bearer，不要抄 config.yaml",
    summary:
      "远程是 api.sequel.sh/mcp。手写：mcp add sequel --url … --bearer-token-env-var SEQUEL_API_KEY。不要 mcp login。营销页的 config.yaml 和 headers 里的 sql_ 密钥不要抄。",
    body: `Sequel 官方 Codex 读 config.toml 加 bearer，不要抄 config.yaml。托管入口是 \`https://api.sequel.sh/mcp\`，**有** \`/mcp\` 后缀。安装页把 Codex slug 写成 \`codex\`，只支持 **global**，**不**装 \`SKILL.md\`（技能只走 MCP playbook）。鉴权是 API key（\`sql_\` 开头），不是 OAuth。OAuth 是给 ChatGPT / Claude.ai 那种连接器的。

博客里的 Codex 对照写法：

\`\`\`bash
codex mcp add sequel --url https://api.sequel.sh/mcp --bearer-token-env-var SEQUEL_API_KEY
\`\`\`

\`\`\`toml
[mcp_servers.sequel]
url = "https://api.sequel.sh/mcp"
bearer_token_env_var = "SEQUEL_API_KEY"
\`\`\`

\`SEQUEL_API_KEY\` 必须在**启动 Codex 的那个进程**里。Codex 不读 \`.env\`。不要把 \`sql_\` 开头的值写进 \`http_headers\`、\`args\` 或 \`env\` 表。这是 HTTP，**不要** \`codex mcp login sequel\`。

官方安装页更快的是 Sequel CLI：\`curl -fsSL https://sequel.sh/install | sh\`，再 \`sequel login\`，再 \`sequel install codex\`。它会建一把给这个 agent 的 key 并写配置。写完立刻 \`codex mcp get sequel\`：传输应是 streamable_http，鉴权应是 bearer 环境变量名，不是字面量密钥。若 CLI 写出 \`~/.codex/config.yaml\` 或把 \`sql_\` 写进 headers，删掉那份，改回上面的 TOML。

\`/agents/codex\` 和 \`/sources/mcp/codex\` 营销页把路径写成 \`~/.codex/config.yaml\`，还写 \`type: http\` 和 \`Authorization: Bearer sql_your_api_key\`。Codex **只读** \`config.toml\`，也没有 \`type = "http"\` 这个键。密钥进配置文件会进备份和日志。

不要做这些：

- 不要 \`codex mcp login sequel\`。文档把 OAuth 留给 ChatGPT / Claude.ai。
- 不要发明 \`codex plugin add sequel@…\`。Codex slug 只登记 MCP。
- 不要和 ClickHouse Cloud \`mcp.clickhouse.cloud/mcp\`、自建 \`mcp-clickhouse\` 搞成一台。Sequel 是 Sequel 账号里连上的那些源，不是 ClickHouse 官方 MCP。
- 不要抄 \`npx -y sequel-mcp\` / \`codex mcp add sequel-mcp\`。那是社区本地 stdio 包，不是 \`api.sequel.sh\`。
- 不要把 Sequel 当成 PostHog / Mixpanel / Amplitude 官方远程 MCP 的替代表。那些产品自己有 Codex 专节。
- 不要一上来 \`--yolo\`：查询结果会进上下文。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get sequel\` 看 url 是 \`https://api.sequel.sh/mcp\`。会话里问「list my Sequel connections」做核对。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Sequel", "HTTP", "bearer"],
    related: ["mcp-http-bearer-env", "mcp-clickhouse-cloud", "mcp-add-and-login"],
    sources: [
      {
        label: "Sequel · Install Sequel MCP",
        url: "https://sequel.sh/docs/install",
      },
      {
        label: "Sequel · Connect PostgreSQL to Codex",
        url: "https://sequel.sh/blog/connect-postgresql-codex",
      },
      {
        label: "Sequel · Getting Started",
        url: "https://sequel.sh/docs/getting-started",
      },
    ],
  },
  {
    id: "ug-mcp-add-codex",
    no: 424,
    title: "Databricks MCP 用 ug mcp add --agents codex，stdio 桥是 ug mcp-proxy",
    summary:
      "官方 Codex：uv tool install git+https://github.com/databricks/unity-gateway，再 ug mcp add --agents codex。stdio 桥是 ug mcp-proxy，不要 mcp login，不要抄 mcp-remote。启动用 ug codex。",
    body: `Databricks MCP 用 ug mcp add --agents codex，stdio 桥是 ug mcp-proxy。Connect clients 页给 Codex 的主路径不再是手写 \`url\` 再 \`mcp login\`，也不要自己建 OAuth app。先装 Unity Gateway CLI（主命令是 \`ug\`，\`ucode\` 只是别名）：

\`\`\`bash
uv tool install git+https://github.com/databricks/unity-gateway
databricks auth login
ug mcp add --agents codex --services CATALOG.SCHEMA.SERVICE
ug codex
\`\`\`

\`CATALOG.SCHEMA.SERVICE\` 换成 Unity Catalog 里 MCP Service 的全名，例如 \`system.ai.slack\`。文档页把三行命令粘成一行，自己拆开跑。需要 Python 3.12+ 和 \`uv\`。先有 Databricks CLI 登录；不要在 Codex 里再 \`codex mcp login\`。

每台 Databricks MCP 在 Codex 里都是 **stdio** 子进程，command 是 \`ug\`，干的是 \`mcp-proxy\`：本机桥去打 workspace 的 Streamable HTTP，每次请求用 Databricks CLI profile 现签 OAuth。不要给它写 \`url\`，也不要抄 Cursor 示例的 \`npx mcp-remote\` 加 \`client_secret\`。

\`ug configure mcp\` **会整表替换**，没选中的服务器会被拿掉。只加、不删用 \`ug mcp add\`。无参数 \`ug mcp add\` 会开选择器，已登记的标 already configured，关不掉。V2（Vector Search、UC Functions、外连、Genie、Apps）不在选择器里，要带类型前缀：

\`\`\`bash
ug mcp add --services uc-functions:main.tools
ug mcp add --services vector-search:main.docs
ug mcp add --services genie-space:SPACE_ID
ug mcp add --services app:my-app
ug mcp add --services external:my-connection
\`\`\`

\`ug\` 给 Codex 写的可能是 \`~/.codex/ucode.config.toml\`，不一定是 \`config.toml\`。日常启动用 \`ug codex\`，不要以为裸 \`codex\` 一定能看见这些 MCP。改完新开会话。核对：\`ug status\`，再在 \`ug codex\` 会话里 \`/mcp\`。默认 \`codex mcp get\` 不一定读 \`ucode.config.toml\`。

文档或旧仓名若仍写 \`ucode\` / \`databricks/ucode\`，那是别名和旧地址：现行主命令是 \`ug\`，安装 URL 是 \`unity-gateway\`。卸服务器用 \`ug mcp remove --agents codex\`，不要手改再 \`codex mcp remove\`。

这和「把 Codex 模型流量打进 Databricks AI Gateway」不是同一件事。模型路由是 \`ug configure --agents codex\` / \`ug codex\`；本条只登记 MCP。不要把 AI Gateway 的 \`model_providers.Databricks\` 块当成 MCP 表。

不要做这些：

- 不要抄 Cursor / Windsurf 的 \`mcp-remote\` JSON，也不要把 client secret 写进 args。
- 不要把 PAT 写进 \`http_headers\` 当 Codex 主路径。无头才 \`ug configure --profiles DEFAULT --use-pat\`，而且必须显式 \`--use-pat\`。
- 不要发明 \`codex plugin add databricks@…\`。
- 不要和 Azure MCP、Microsoft Learn \`microsoft-learn\` 配成一台。
- 不要一上来 \`ug codex --full-auto\`。

网页 Cloud 不读本机 \`ug\` 配置。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["MCP", "Databricks", "ug", "stdio"],
    related: ["mcp-add-and-login", "mcp-docker-toolkit", "mcp-http-not-sse"],
    sources: [
      {
        label: "Databricks · Connect MCPs to coding agents",
        url: "https://docs.databricks.com/aws/en/agents/mcp-tools/connect-clients",
      },
      {
        label: "databricks/unity-gateway",
        url: "https://github.com/databricks/unity-gateway",
      },
    ],
  },
  {
    id: "b2c-dx-mcp-codex-plugin",
    no: 425,
    title: "Salesforce B2C 用 marketplace 装 b2c-dx-mcp，插件 cwd 不是仓库根",
    summary:
      "官方 Codex：marketplace add SalesforceCommerceCloud/b2c-developer-tooling，再 plugin add b2c-dx-mcp@b2c-developer-tooling。stdio，不要 mcp login。插件 cwd 是插件根。IDE 才手写 npx @salesforce/b2c-dx-mcp。",
    body: `Salesforce B2C 用 marketplace 装 b2c-dx-mcp，插件 cwd 不是仓库根。官方 Codex 技能和 MCP 都走同一份 marketplace，清单 name 是 \`b2c-developer-tooling\`。先加源，再装技能，MCP 另装 \`b2c-dx-mcp\`：

\`\`\`bash
codex plugin marketplace add SalesforceCommerceCloud/b2c-developer-tooling
codex plugin add b2c@b2c-developer-tooling
codex plugin add b2c-cli@b2c-developer-tooling
codex plugin add b2c-dx-mcp@b2c-developer-tooling
\`\`\`

需要 Node.js **22.16.0** 或以上，而且 \`npx\` 必须在启动 Codex 的那个进程 PATH 里。装完新开会话。0.154 起先看当前 \`/plugins\` 和 \`/mcp\`；当前会话没有再新开。可选再装 \`b2c-ops@b2c-developer-tooling\` 或 \`storefront-next@b2c-developer-tooling\`。Figma 那两份还要另接 Figma MCP，不要以为 B2C 插件会带上。

IDE 扩展没有 \`/plugins\`。官方手写是本地 **stdio**，不要 \`url\`，也不要 \`codex mcp login\`：

\`\`\`bash
codex mcp add b2c-dx-mcp -- npx -y @salesforce/b2c-dx-mcp@latest --allow-non-ga-tools
\`\`\`

\`--allow-non-ga-tools\` 打开预览工具。插件自带的 \`.mcp.json\` **没有**这面旗标，不要把两套 args 混成一张表。插件已经登记 MCP 时，不要再 \`mcp add\` 同一张 \`b2c-dx-mcp\`。

Agent Plugins 没写 \`cwd\` 时，MCP 的工作目录是**插件根**，不是你打开的仓库。凭证放项目根 \`dw.json\` 或 \`.env\`，让模型带 \`projectDirectory\`，或在仓库里启动 Codex 再手写 \`mcp add\`。不要把 \`hostname\` / \`client-secret\` 写进 \`~/.codex/config.toml\` 的 \`env\` 表。连上后让它跑 \`config_inspect\` 看解析到哪份配置。

不要做这些：

- 不要抄 Claude 的 \`plugin install b2c-dx-mcp\`（没 \`@b2c-developer-tooling\`），也不要抄 \`claude mcp add --transport stdio\`。
- 不要把 \`npx @salesforce/b2c-cli setup skills --ide codex\` 当插件安装器。它拷到 \`.codex/skills/\`，不会登记 MCP，也不是 Codex 现行的 \`~/.agents/skills\`。
- 不要发明 \`codex plugin add salesforce@…\`。
- 不要和 Salesforce 平台 Hosted MCP / Agentforce 搞成一台。
- 不要一上来 \`--full-auto\`。

网页 Cloud 不读本机 marketplace。ChatGPT 网页要用 Secure MCP Tunnel，不是 \`config.toml\`。核对：\`codex plugin list\` 看到 \`b2c-dx-mcp@b2c-developer-tooling\`；手写路径用 \`codex mcp get b2c-dx-mcp\` 看 command 是 \`npx\`。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Salesforce", "B2C", "plugins"],
    related: ["plugin-session-refresh", "unity-codex-plugin", "mcp-add-and-login"],
    sources: [
      {
        label: "B2C Developer Toolkit · Agent Skills",
        url: "https://salesforcecommercecloud.github.io/b2c-developer-tooling/guide/agent-skills",
      },
      {
        label: "B2C Developer Toolkit · MCP Installation",
        url: "https://salesforcecommercecloud.github.io/b2c-developer-tooling/mcp/installation.html",
      },
      {
        label: "SalesforceCommerceCloud/b2c-developer-tooling",
        url: "https://github.com/SalesforceCommerceCloud/b2c-developer-tooling",
      },
    ],
  },
  {
    id: "expo-codex-plugin",
    no: 426,
    title: "Expo 插件用 plugin add expo@openai-curated，再 mcp login expo",
    summary:
      "官方 Codex：codex plugin add expo@openai-curated，再 mcp login expo。插件会登记 mcp.expo.dev/mcp。不要抄 Claude 的 expo@claude-plugins-official，也不要把 npx skills add 当 Codex 安装器。",
    body: `Expo 插件用 plugin add expo@openai-curated，再 mcp login expo。官方 Codex 页这一条会装 Expo Skills，并登记远程 MCP。

\`\`\`bash
codex plugin add expo@openai-curated
codex mcp login expo
\`\`\`

插件 id 是 \`expo@openai-curated\`。TUI \`/plugins\` 或桌面 Plugins 选 OpenAI Curated 搜 expo，效果一样。0.154 起先看**当前会话**；当前会话没有再新开。\`codex plugin list\` 应看到 \`expo@openai-curated\`。随后 \`mcp login expo\` 打开浏览器登 Expo 账号。已经装了插件就**不要**再 \`mcp add\` 同一张表。

只要远程 MCP、不装技能时，官方 MCP 页的 Codex 节是：

\`\`\`bash
codex mcp add expo --url https://mcp.expo.dev/mcp
codex mcp login expo
\`\`\`

\`\`\`toml
[mcp_servers.expo]
url = "https://mcp.expo.dev/mcp"
enabled = true
\`\`\`

用户层表名官方就是 \`expo\`。URL **带** \`/mcp\` 后缀。不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor / VS Code 的 JSON。插件已经登记过就不要再手写这张表。连上后可让它读 \`package.json\` 里的 Expo SDK 版本做一次只读核对。\`search_documentation\` 要 EAS 付费档。触发 EAS Build / 工作流、回 App Store 评论这类写入保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

本地模拟器截图、点按、开 React Native DevTools 是另一层，要 SDK 54+。在项目里 \`npx expo install expo-mcp --dev\`，用**同一 Expo 账号** \`npx expo whoami\`，再 \`EXPO_UNSTABLE_MCP_SERVER=1 npx expo start\`。起停 Metro 之后要重连 MCP。本机 iOS 能力只在 macOS 模拟器；网页 Cloud 够不到你笔记本上的 Metro。

不要做这些：

- 不要抄 Claude 的 \`claude plugin install expo@claude-plugins-official\`。Codex 插件 id 是 \`expo@openai-curated\`。
- 不要把 \`npx skills add expo/skills\` 当 Codex 主路径。那是给 Cursor 一类客户端拷 SKILL.md，不会登记 MCP。
- 不要发明 \`codex plugin add expo@expo\` 或 \`expo@claude-plugins-official\`。
- 不要抄 \`npx mcp-remote https://mcp.expo.dev/mcp\`。Codex 自己走 HTTP。
- 不要把本机 \`expo-mcp\` 包当成远程 MCP 的替代安装器。

源仓 marketplace 回退才 \`codex plugin marketplace add expo/skills --ref main\`，再在 \`/plugins\` 装 expo；官方 Codex 页仍是 curated 那条。网页 Cloud 不读 \`~/.codex/config.toml\`。改完用 \`codex plugin list\`；用户层对照 \`codex mcp get expo\` 看传输是 streamable_http。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Expo", "EAS", "插件", "OAuth"],
    related: ["shopify-ai-toolkit", "mcp-add-and-login", "unity-codex-plugin"],
    sources: [
      {
        label: "Expo · Codex",
        url: "https://docs.expo.dev/agents/codex/",
      },
      {
        label: "Expo · MCP Server",
        url: "https://docs.expo.dev/mcp/",
      },
      {
        label: "expo/skills",
        url: "https://github.com/expo/skills",
      },
    ],
  },
  {
    id: "glean-codex-plugin",
    no: 427,
    title: "Glean 插件用 marketplace 加 gleanwork/codex-plugins，再 mcp login glean",
    summary:
      "官方 Codex：marketplace add gleanwork/codex-plugins，再 plugin add glean@glean-codex-plugins。组织远程还要 mcp add glean，再 mcp login glean。不要抄 Claude 的 glean@glean-plugins，也不要把 /glean_run 当 Codex 斜杠。",
    body: `Glean 插件用 marketplace 加 gleanwork/codex-plugins，再 mcp login glean。官方 Codex 页把企业知识插件和组织远程 MCP 拆开：插件会装 Skills，并带一台本机 stdio 网关；组织搜索入口还要自己登记。

先让管理员打开 Glean 的 OAuth、Dynamic Client Registration（只放行已批准应用时把 Glean CLI 加进名单）和 MCP 服务器。你自己打开 MCP Configurator（头像 → Your settings → Third party apps and MCP），抄**组织后端地址**和**服务器名**。文档示例是 \`https://acme-be.glean.com/mcp/engineering\`，路径带 \`/mcp/\`，不要猜。

在**普通终端**装，不要在 Codex TUI 里跑：

\`\`\`bash
codex plugin marketplace add gleanwork/codex-plugins
codex plugin add glean@glean-codex-plugins
codex mcp add glean --url https://acme-be.glean.com/mcp/engineering
codex mcp login glean
\`\`\`

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`glean-codex-plugins\`，插件 name 是 \`glean\`，所以是 \`glean@glean-codex-plugins\`。\`codex plugin list\` 应看到 installed, enabled。0.154 起先看**当前会话**；当前会话没有再新开。随后 \`mcp login glean\` 打开浏览器走公司 SSO。已经登记过就**不要**再 \`mcp add\` 同一张 \`glean\` 表。

\`\`\`toml
[mcp_servers.glean]
url = "https://acme-be.glean.com/mcp/engineering"
enabled = true
\`\`\`

用户层表名官方就是 \`glean\`。这是 Streamable HTTP + OAuth，不要写 \`command\`，不要抄 Claude 的 \`--transport http\`，也不要抄 Cursor / VS Code 的 JSON。插件 \`.mcp.json\` 另有一台本机 \`glean_plugin\`（\`node ./mcp/start.mjs\`，开 HITL），那是插件网关，**不要**再手写一张 \`glean_plugin\`。

只要远程 MCP、不装技能时，只跑上面的 \`mcp add\` / \`mcp login\`。仓 README 还可以 \`codex plugin add glean-dev-docs@glean-codex-plugins\`，再 \`codex mcp add glean-dev-docs --url https://developers.glean.com/mcp\`；那是**公开开发者文档**，不是你们公司的索引，不要和 \`glean\` 叠成一台。公开这张默认不必 \`mcp login\`。

Cursor / Claude 用 \`/glean_run\`，第一次还会要工作邮箱。Codex **没有**这条斜杠：用自然语言让它搜 Glean，认证走 \`mcp login glean\`。验证句官方是 \`Search for my company onboarding docs in Glean.\` 网关先 \`find_skills\` 再 \`run_tool\`，不要猜下游工具名。写 Google Doc / Jira 保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add gleanwork/claude-plugins\` 或 \`/plugin install glean@glean-plugins\`。Codex 清单名是 \`glean-codex-plugins\`。
- 不要抄 Cursor 的 \`/add-plugin glean\`。
- 不要把 \`/glean_run\` 当 Codex 斜杠。
- 不要发明 \`codex plugin add glean@openai-curated\` 或 \`glean@glean-plugins\`。
- 不要抄 \`npx mcp-remote https://acme-be.glean.com/mcp/engineering\`。Codex 自己走 HTTP。
- 不要把 \`npx skills add\` 当这份插件安装器。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get glean\` 看传输是 streamable_http，url 带你们公司的 \`/mcp/\` 路径。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Glean", "插件", "OAuth"],
    related: ["mcp-add-and-login", "n8n-codex-mcp", "jfrog-codex-plugin"],
    sources: [
      {
        label: "Glean · Plugin for Codex",
        url: "https://developers.glean.com/guides/mcp/codex",
      },
      {
        label: "Glean · Set up the plug-in in Codex",
        url: "https://docs.glean.com/user-guide/mcp/glean-plugin-codex",
      },
      {
        label: "gleanwork/codex-plugins",
        url: "https://github.com/gleanwork/codex-plugins",
      },
    ],
  },
  {
    id: "calendarbridge-codex-mcp",
    no: 428,
    title: "CalendarBridge MCP 走 manageapi.calendarbridge.com/mcp，再 mcp login",
    summary:
      "官方 Codex CLI：mcp add calendarbridge --url 走 manageapi.calendarbridge.com/mcp，带 /mcp。随后 mcp login calendarbridge。OAuth 2.1，不要 API key。不要抄 Claude 的 --transport http，也不要发明 plugin add。",
    body: `CalendarBridge MCP 走 manageapi.calendarbridge.com/mcp，再 mcp login。官方帮助给 Codex CLI 单独一行，远程是 Streamable HTTP + OAuth 2.1（PKCE）。这不是 Cal.com 的 \`mcp.cal.com\`，也不是 CalendarBridge 那个靠邮件干活的 AI Scheduling Assistant。

先登录 https://app.calendarbridge.com/login/，侧栏 AI Assistant → Bring Your Own Agent (MCP)，把 Server URL **整段**抄下来，必须带 \`https://\`。帮助页示例是：

\`\`\`bash
codex mcp add calendarbridge --url https://manageapi.calendarbridge.com/mcp
codex mcp login calendarbridge
\`\`\`

\`\`\`toml
[mcp_servers.calendarbridge]
url = "https://manageapi.calendarbridge.com/mcp"
enabled = true
\`\`\`

用户层表名官方就是 \`calendarbridge\`。URL **带** \`/mcp\` 后缀。没有 API key、没有 client secret，不要 \`--bearer-token-env-var\`，也不要把 token 拼进查询串。文档写完 \`mcp add\` 后在 TUI 敲 \`/mcp\` 再选 calendarbridge，那就是走 OAuth；CLI 等价是 \`mcp login calendarbridge\`。浏览器里签 CalendarBridge，只勾你要的权限，再 Allow。

连上客户端在每个套餐都能做，含 Basic。真正读改日历、建 scheduler、改 sync **要有效订阅**。订阅过期后连接还在，工具会让你去 app.calendarbridge.com 重新激活。

写事件、删 sync、发助手邮件保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add calendarbridge --transport http\`。Codex 用 \`--url\`，自己走 HTTP。
- 不要抄 Cursor JSON、ChatGPT Developer Mode 插件，也不要抄 Gemini / OpenClaw 的 \`--transport\`。
- 不要发明 \`codex plugin add calendarbridge@\`。
- 不要抄 \`npx mcp-remote https://manageapi.calendarbridge.com/mcp\`。
- 不要和 Cal.com 的 \`mcp.cal.com\` 写成一台。
- 不要把邮箱里的 AI Scheduling Assistant 当成这条 MCP 的安装器。助手仍走邮件；MCP 可以代你给助手发消息，但要另勾 Send through your assistants。

从控制台 Connected agents 可以 Revoke。网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get calendarbridge\` 看传输是 streamable_http，url 是 \`https://manageapi.calendarbridge.com/mcp\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "CalendarBridge", "OAuth", "日历"],
    related: ["mcp-add-and-login", "mcp-oauth-loopback-callback", "nylas-codex-mcp"],
    sources: [
      {
        label: "CalendarBridge · Bring Your Own Agent (MCP)",
        url: "https://help.calendarbridge.com/user-docs/bring-your-own-agent-mcp/",
      },
      {
        label: "CalendarBridge · Bring Your Own Agent announcement",
        url: "https://help.calendarbridge.com/announcements/bring-your-own-agent/",
      },
      {
        label: "CalendarBridge · MCP Ready",
        url: "https://calendarbridge.com/blog/bring-your-own-ai-agent-to-calendarbridge-mcp-ready/",
      },
    ],
  },
  {
    id: "vpai-codex-plugin",
    no: 429,
    title: "Vibe Prospecting 插件用 marketplace 加 explorium-ai/vibeprospecting-plugin，再 vpai login",
    summary:
      "官方 Codex：marketplace add explorium-ai/vibeprospecting-plugin，再 plugin add vpai@vibeprospecting。认证是 vpai login 再 --poll，不是 mcp login。不要抄博客缺表名的 mcp add，也不要把 npx skills add 当 Codex 安装器。",
    body: `Vibe Prospecting 插件用 marketplace 加 explorium-ai/vibeprospecting-plugin，再 vpai login。Explorium 给 Codex 单独写了安装页：先加 GitHub marketplace，再装插件。插件带 \`vibe-prospecting\` 技能；真正拉数走本机 \`vpai\` CLI，凭证在 \`~/.config/vpai\`，**不是** \`codex mcp login\`。

在**普通终端**装，不要在 Codex TUI 里跑：

\`\`\`bash
codex plugin marketplace add explorium-ai/vibeprospecting-plugin
codex plugin add vpai@vibeprospecting
\`\`\`

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`vibeprospecting\`，插件 name 是 \`vpai\`，所以是 \`vpai@vibeprospecting\`。\`codex plugin list\` 应看到 installed, enabled。0.154 起先看**当前会话**；当前会话没有再新开。技能或工具没出现就重启 Codex。marketplace 过期时：

\`\`\`bash
codex plugin marketplace upgrade vibeprospecting
codex plugin add vpai@vibeprospecting
\`\`\`

upgrade 用清单名 \`vibeprospecting\`，不是仓库路径。装上却是灰的，在 \`~/.codex/config.toml\` 打开：

\`\`\`toml
[plugins."vpai@vibeprospecting"]
enabled = true
\`\`\`

认证按平台指南：每次工作流开头先装 CLI，再登录、轮询：

\`\`\`bash
npm install -g @vibeprospecting/vpai@latest
vpai login
vpai login --poll
vpai whoami
\`\`\`

\`whoami\` 退出码 0 才继续。不要直接读 \`~/.config/vpai/config.json\`。全局装不上（沙箱、权限）再退回 \`npx @vibeprospecting/vpai@latest login\`。已经能跑 \`vpai\` 时，**不要**每个工具调用再套一层 \`npx\`。无头环境才 \`vpai config --api-key YOUR_TENANT_API_KEY\`，不要把密钥写进提示或导出的 CSV。登出是 \`vpai logout\`。

会话里调用 \`/vpai:vibe-prospecting\`，这是他们的斜杠，不是 Claude 的 \`/plugin\`。默认先对 **5 条**实体跑完整链路再放大；本轮要跳过样本写 \`/vpai:skip_sample\` 或明确说不要样本。链式调用用上一步 JSON 里的 \`session_id\` 和 \`csv_path\`，不要自己编。同一 \`session_id\` 不要并行两个 agent。大批量导出保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

只要远程 MCP、不装这套技能时，才去独立仓 vibeprospecting-mcp：

\`\`\`bash
codex mcp add vibe-prospecting --url https://vibeprospecting.explorium.ai/mcp
codex mcp login vibe-prospecting
\`\`\`

\`\`\`toml
[mcp_servers.vibe-prospecting]
url = "https://vibeprospecting.explorium.ai/mcp"
enabled = true
\`\`\`

用户层表名官方就是 \`vibe-prospecting\`。URL **带** \`/mcp\` 后缀。这是 Streamable HTTP + OAuth，不要写 \`command\`。已经装了 \`vpai@vibeprospecting\` 就**不要**再叠同一家远程，除非你清楚要两套入口。

不要做这些：

- 不要抄 Claude 的 \`/plugin install vibe-prospecting@claude-plugins-official\`。Codex 插件 id 是 \`vpai@vibeprospecting\`。
- 不要把 \`npx skills add explorium-ai/vibeprospecting-plugin\` 当 Codex 主路径。那是双主机安装器。
- 不要抄营销文只跑 \`marketplace add\`、漏掉 \`plugin add vpai@vibeprospecting\`。
- 不要抄 \`codex mcp add https://vp-plugin.explorium.ai/mcp\`。缺表名，主机也不是 MCP 仓那条。
- 不要发明 \`codex plugin add vpai@openai-curated\`，也不要对插件跑 \`mcp login vpai\`。
- 不要抄 Claude 的 \`--transport http\` 或 \`npx mcp-remote https://vibeprospecting.explorium.ai/mcp\`。现行 Codex 用 \`--url\`，自己走 HTTP。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["插件", "Vibe Prospecting", "Explorium", "MCP"],
    related: ["glean-codex-plugin", "expo-codex-plugin", "mcp-add-and-login"],
    sources: [
      {
        label: "Vibe Prospecting · Install in Codex",
        url: "https://github.com/explorium-ai/vibeprospecting-plugin/blob/main/docs/install-codex.md",
      },
      {
        label: "Vibe Prospecting · Codex platform guide",
        url: "https://github.com/explorium-ai/vibeprospecting-plugin/blob/main/skills/vibe-prospecting/platforms/codex.md",
      },
      {
        label: "explorium-ai/vibeprospecting-plugin",
        url: "https://github.com/explorium-ai/vibeprospecting-plugin",
      },
    ],
  },
  {
    id: "vaadin-codex-plugin",
    no: 430,
    title: "Vaadin 插件用 marketplace 加 vaadin/agent-marketplace，再 plugin add vaadin-skills",
    summary:
      "官方 Codex：marketplace add vaadin/agent-marketplace --ref main，再 plugin add vaadin-skills@vaadin-marketplace。插件会登记 mcp.vaadin.com/docs，不要加 /mcp，也不要 mcp login。不要抄 Claude 的 /plugin install。",
    body: `Vaadin 插件用 marketplace 加 vaadin/agent-marketplace，再 plugin add vaadin-skills。官方 Codex 页把技能和文档 MCP 打成一条插件：先加 GitHub marketplace（钉 \`--ref main\`），再装 \`vaadin-skills\`。插件 \`.mcp.json\` 会登记远程文档入口，不必再手写。

在**普通终端**装，不要在 Codex TUI 里跑：

\`\`\`bash
codex plugin marketplace add vaadin/agent-marketplace --ref main
codex plugin add vaadin-skills@vaadin-marketplace
\`\`\`

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`vaadin-marketplace\`，插件 name 是 \`vaadin-skills\`，所以是 \`vaadin-skills@vaadin-marketplace\`。装前可预览：

\`\`\`bash
codex plugin list --marketplace vaadin-marketplace --available --json
\`\`\`

\`codex plugin list\` 应看到 installed, enabled。0.154 起先看**当前会话**；当前会话没有再新开。HTTP MCP 至少要 CLI 0.43；报 missing field command 就 \`npm install -g @openai/codex@latest\`。marketplace 过期时官方是：

\`\`\`bash
codex plugin marketplace upgrade
\`\`\`

upgrade 可以不带名字；对照清单名才是 \`vaadin-marketplace\`，不是仓库路径。同一份清单还有实验插件 \`vaadin-agent-tools@vaadin-marketplace\`（脚手架、主题检查），官方 Codex 页主路径只写 \`vaadin-skills\`，不要把它当必装。

只要远程 MCP、不装技能时，官方 TOML 是：

\`\`\`toml
[mcp_servers.vaadin]
url = "https://mcp.vaadin.com/docs"
\`\`\`

CLI 等价：

\`\`\`bash
codex mcp add vaadin --url https://mcp.vaadin.com/docs
\`\`\`

用户层表名官方就是 \`vaadin\`。URL 是 \`/docs\`，**不要**再拼 \`/mcp\`。这是公开文档 Streamable HTTP，不要写 \`command\`，不要 \`mcp login vaadin\`，不要 API key。已经装了 \`vaadin-skills@vaadin-marketplace\` 就**不要**再叠同一张 \`vaadin\` 表。技能仓 README 还可以 \`codex mcp add javadoc --url https://www.javadocs.dev/mcp\`；那是 javadocs.dev，**不是**插件自带，不要和 \`vaadin\` 搞成一台。

验证可让它生成一个 Vaadin 登录表单，或 \`codex mcp list\` 看 \`vaadin\`。改 UI、改主题保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add vaadin/agent-marketplace\` 或 \`/plugin install vaadin-skills@vaadin-marketplace\`。Codex 用 \`plugin add\`，marketplace 官方钉 \`--ref main\`。
- 不要抄 Claude 的 \`--transport http\` 或 \`/plugin marketplace update vaadin-marketplace\`。
- 不要把 \`npx skills add vaadin/agent-skills\` 当 Codex 主路径。那只拷技能，不登记 MCP。
- 不要发明 \`codex plugin add vaadin@openai-curated\`，也不要对文档 MCP 跑 \`mcp login\`。
- 不要抄 Junie 的 \`mcp-stdio-to-streamable-http-adapter\`。现行 Codex 用 \`--url\`，自己走 HTTP。
- 不要把 URL 写成 \`https://mcp.vaadin.com/mcp\` 或 \`https://mcp.vaadin.com/docs/mcp\`。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get vaadin\` 看传输是 streamable_http，url 是 \`https://mcp.vaadin.com/docs\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["插件", "Vaadin", "MCP", "Java"],
    related: ["glean-codex-plugin", "expo-codex-plugin", "mcp-add-and-login"],
    sources: [
      {
        label: "Vaadin · Configure OpenAI Codex",
        url: "https://vaadin.com/docs/latest/building-apps/mcp/supported-tools/codex",
      },
      {
        label: "Vaadin · MCP Server",
        url: "https://vaadin.com/docs/latest/building-apps/mcp",
      },
      {
        label: "vaadin/agent-marketplace",
        url: "https://github.com/vaadin/agent-marketplace",
      },
    ],
  },
  {
    id: "checkly-codex-mcp",
    no: 431,
    title: "Checkly MCP 走 api.checklyhq.com/mcp 加 bearer，不要 mcp login",
    summary:
      "官方 Codex：mcp add checkly --url 走 api.checklyhq.com/mcp，带 /mcp。Bearer 读 CHECKLY_API_KEY。没有批准的 OAuth 客户端，不要 mcp login。用户密钥 cu_，不要抄 Claude 的 --header。",
    body: `Checkly MCP 走 api.checklyhq.com/mcp 加 bearer，不要 mcp login。官方 setup 页给 Codex 单独一节：Checkly **没有**批准的 Codex OAuth 客户端，DCR 也会被拒。主路径是用户或服务 API key，当成 HTTP bearer，不是 \`mcp login\`。

先在 [User Settings → API keys](https://www.checklyhq.com/docs/admin/creating-api-key) 建一把**现行**用户密钥（\`cu_\` 开头）。企业号才用 Account Settings 里的服务密钥（\`sv_\` 开头）。旧账号 key 和 \`sk_\` 会被拒。不要抄文档里的 \`export CHECKLY_API_KEY=" "\`，那是空占位。

\`CHECKLY_API_KEY\` 必须在**启动 Codex 的那个进程**里。Dock / 开始菜单打开的桌面读不到 zshrc。然后：

\`\`\`bash
export CHECKLY_API_KEY=YOUR_CHECKLY_API_KEY
codex mcp add checkly --url https://api.checklyhq.com/mcp --bearer-token-env-var CHECKLY_API_KEY
\`\`\`

\`\`\`toml
[mcp_servers.checkly]
url = "https://api.checklyhq.com/mcp"
bearer_token_env_var = "CHECKLY_API_KEY"
enabled = true
\`\`\`

用户层表名官方就是 \`checkly\`。URL **带** \`/mcp\` 后缀。键里填的是变量名，不是 token。不要把 \`cu_\` / \`sv_\` 写进 \`http_headers\`、\`args\`、\`env\` 表或 URL。这是 bearer，**不要** \`codex mcp login checkly\`。

多账号时会话会问你选哪一个。固定账户用 \`X-Checkly-Account\`，Codex 走 \`env_http_headers\`，不要抄 Claude 的 \`--header\`：

\`\`\`toml
[mcp_servers.checkly.env_http_headers]
X-Checkly-Account = "CHECKLY_ACCOUNT_ID"
\`\`\`

\`CHECKLY_ACCOUNT_ID\` 同样是进程环境变量名。服务密钥已经绑死一个账户，一般不必再加这颗头。API key 会话没有邀请成员那条工具。

验证句：\`Use Checkly to show which accounts I can access.\` 触发检查、开 incident 保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

远程 MCP **碰不到本机文件系统**，不能写、打包或部署检查代码。本地脚手架走：

\`\`\`bash
npx checkly skills install --target=codex
\`\`\`

那会装 SKILL.md，不是 MCP 安装器。\`npx skills add checkly/checkly-cli\` 也只拷技能。

插件仓是技能 + MCP 的捆。官方 Codex README 是：

\`\`\`bash
codex plugin marketplace add checkly/checkly-plugin
\`\`\`

再打开 TUI \`/plugins\` 启用 Checkly。官方**没有**写出 \`codex plugin add checkly@checkly\`，不要发明。Claude 才是 \`/plugin install checkly@checkly\`。插件 \`.mcp.json\` 只写了 OAuth scopes，**没有** bearer；Codex 没有批准的 OAuth 客户端，装完插件仍要给 \`checkly\` 表补 \`bearer_token_env_var\`。已经 \`mcp add checkly\` 就不要再叠一张同 URL 的表。\`npx plugins add checkly/checkly-plugin\` 不是 Codex 主路径。

不要做这些：

- 不要抄 Claude 的 \`claude mcp add --transport http checkly https://api.checklyhq.com/mcp\`。
- 不要抄 \`--header "Authorization: Bearer …"\`。Codex 用 \`--bearer-token-env-var\`。
- 不要 \`codex mcp login checkly\`，也不要对它跑 DCR。
- 不要把密钥写进 \`http_headers\` 或 URL。
- 不要发明 \`codex plugin add checkly@checkly\` 或 \`checkly@openai-curated\`。
- 不要把 \`npx checkly skills install\` 当成 MCP 安装器。
- 不要和 Datadog、New Relic 那些观测 MCP 搞成一台。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。用 \`codex mcp get checkly\` 看传输是 streamable_http，url 是 \`https://api.checklyhq.com/mcp\`，Auth 是 Bearer。\`/mcp\` 只是核对工具，不是登录入口。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Checkly", "HTTP", "bearer"],
    related: ["mcp-http-bearer-env", "mcp-http-env-headers", "mcp-add-and-login"],
    sources: [
      {
        label: "Checkly · Set up the MCP Server",
        url: "https://www.checklyhq.com/docs/ai/mcp-server/setup/",
      },
      {
        label: "Checkly · Plugin for AI Coding Agents",
        url: "https://www.checklyhq.com/docs/ai/plugin/",
      },
      {
        label: "checkly/checkly-plugin",
        url: "https://github.com/checkly/checkly-plugin",
      },
      {
        label: "Checkly · Creating an API key",
        url: "https://www.checklyhq.com/docs/admin/creating-api-key",
      },
    ],
  },
  {
    id: "mem0-codex-plugin",
    no: 432,
    title: "Mem0 插件用 marketplace 加 mem0ai/mem0，再 plugin add mem0@mem0-plugins",
    summary:
      "官方 Codex：marketplace add mem0ai/mem0，再 plugin add mem0@mem0-plugins。插件 MCP 是本机 python3 stdio，要 Python 3.10+ 和 MEM0_API_KEY。不要叠 mcp add。不要和 Nowledge Mem 搞成一台。",
    body: `Mem0 插件用 marketplace 加 mem0ai/mem0，再 plugin add mem0@mem0-plugins。官方 Codex 页推荐先加 GitHub marketplace，再装 \`mem0@mem0-plugins\`。Mem0 **还不在** OpenAI 精选目录里，桌面 Plugin Directory 搜不到就先跑 marketplace add。这不是 Nowledge Mem 的 \`nowledge-mem@nowledge-community\`，也不是本机 \`nmem\`。

密钥从 [app.mem0.ai/dashboard/api-keys](https://app.mem0.ai/dashboard/api-keys) 拿，现行前缀是 \`m0-\`，不要用旧 token。\`MEM0_API_KEY\` 必须在**启动 Codex 的那个进程**里。Dock / 开始菜单打开的桌面读不到刚改的 zshrc。插件要 \`python3\`（3.10+）。

在**普通终端**装，不要在 Codex TUI 里跑：

\`\`\`bash
export MEM0_API_KEY=YOUR_MEM0_API_KEY
codex plugin marketplace add mem0ai/mem0
codex plugin add mem0@mem0-plugins
\`\`\`

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`mem0-plugins\`，插件 name 是 \`mem0\`，source.path 是 \`./integrations/codex-plugin\`。当前版本 0.3.1。\`codex plugin list\` 应看到 installed, enabled。0.154 起先看**当前会话**；当前会话没有再新开。HTTP 冷启动不是这条：插件 \`.mcp.json\` 是 **stdio**，command 是 \`python3\`，args 是 \`./core/mcp_server.py\`，\`cwd\` 是 \`.\`（相对插件根）。它把 \`MEM0_API_KEY\` 等名字列进 \`env_vars\` 转发，不要把 \`m0-\` 写进 TOML。钩子写在插件 \`hooks/hooks.json\`，**不要**再跑通用仓里的 \`install_codex_hooks.py\`。

升级：

\`\`\`bash
codex plugin marketplace upgrade
\`\`\`

卸插件：\`codex plugin remove mem0@mem0-plugins\`。连市场一起删：\`codex plugin marketplace remove mem0-plugins\`。

只要远程 MCP、不要钩子和六条技能时，官方 Option B 才是：

\`\`\`bash
codex mcp add mem0 --url https://mcp.mem0.ai/mcp/ --bearer-token-env-var MEM0_API_KEY
\`\`\`

\`\`\`toml
[mcp_servers.mem0]
url = "https://mcp.mem0.ai/mcp/"
bearer_token_env_var = "MEM0_API_KEY"
\`\`\`

用户层表名官方就是 \`mem0\`，不是其它客户端的 \`mem0-mcp\`。URL **带**尾斜杠 \`/mcp/\`。这是 bearer，**不要** \`codex mcp login mem0\`。平台总览页还写「\`codex mcp add\` 只支持 stdio」——**不要抄**；Codex 专节已经给出 \`--url\`。已经装了 \`mem0@mem0-plugins\` 就**不要**再叠这张 \`mem0\` 表，否则会 tool collision。

Codex Cloud 的 Secret 只给 setup 脚本，agent 阶段会被清掉。MCP 每次工具调用都要密钥，把 \`MEM0_API_KEY\` 写成 Environment Variable。Cloud 临时容器也跑不了插件钩子，Cloud 走 Option B。

验证：Option A 问它搜最近一次项目决定；Option B 问它列出 Mem0 entities。写记忆、删记忆保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add mem0ai/mem0\` 或 \`/plugin install mem0@mem0-plugins\`。Codex 用 \`plugin add\`。
- 不要抄 \`npx mcp-add --name mem0-mcp\`，也不要抄 Cursor JSON 的 \`Authorization: Token …\`。Codex 远程走 bearer。
- 不要发明 \`codex plugin add mem0@openai-curated\`。
- 不要把 \`git clone mem0ai/mem0\` 再 \`marketplace add ~/…\` 当主路径。那是平台 MCP 页的旁路。
- 不要和 Nowledge Mem、Codex 自带 Memory 当成同一套。
- 不要把 Sidekick 当 Codex 功能；文档写明只在 Claude Code 插件里。

网页 Cloud 不读 \`~/.codex/config.toml\`，要用环境里的 Option B。改完新开会话。用 \`codex mcp get mem0\`：插件路径看 command 是 python3；Option B 看 url 是 \`https://mcp.mem0.ai/mcp/\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["插件", "Mem0", "MCP", "记忆"],
    related: ["nowledge-mem-codex-plugin", "mcp-http-bearer-env", "plugin-mcp-cwd-dot"],
    sources: [
      {
        label: "Mem0 · Codex",
        url: "https://docs.mem0.ai/integrations/codex",
      },
      {
        label: "Mem0 · MCP Server",
        url: "https://docs.mem0.ai/platform/mem0-mcp",
      },
      {
        label: "mem0ai/mem0 Codex plugin",
        url: "https://github.com/mem0ai/mem0/tree/main/integrations/codex-plugin",
      },
    ],
  },
  {
    id: "cockpit-codex-plugin",
    no: 433,
    title: "Cockpit 插件先 dart pub global activate cockpit any，再 plugin add cockpit@cockpit",
    summary:
      "官方 Codex：先 dart pub global activate cockpit any，再 marketplace add cockpit-dev/cockpit，再 plugin add cockpit@cockpit。清单名和插件名都是 cockpit。捆绑 MCP 是 cockpit_mcp 无参 stdio，不要 mcp login，也不要再 mcp add 叠一张。不要 flutter pub global activate cockpit。",
    body: `Cockpit 插件先 dart pub global activate cockpit any，再 plugin add cockpit@cockpit。官方 INSTALL.md 和 agent-integrations.md 都给 Codex 单独一节。Cockpit 是宿主机上的 Dart 可执行文件，不是 Flutter 应用依赖；插件只捆技能和 MCP 适配器，**不会**把 \`cockpit_mcp\` 二进制拷进缓存。

先装运行时，并让 Dart 全局 bin 在 PATH 里（常见是 \`~/.pub-cache/bin\`）。不要 \`flutter pub global activate cockpit\`，也不要从某个 app 的依赖图里装宿主：

\`\`\`bash
dart pub global activate cockpit any
cockpit help
which cockpit_mcp
codex plugin marketplace add cockpit-dev/cockpit
codex plugin add cockpit@cockpit
\`\`\`

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`cockpit\`，插件 name 也是 \`cockpit\`，source.path 是 \`./plugins/codex/cockpit\`，所以是 \`cockpit@cockpit\`。现行插件版本是 4.9.0。\`codex plugin list\` 应看到 installed, enabled。0.154 起先看**当前会话**；当前会话没有再新开。清单 \`authentication\` 是 \`ON_INSTALL\`：装插件时 Codex 会要你确认，**不是** \`mcp login\`，也没有 API key。

已装过就先刷新快照再装一次缓存：

\`\`\`bash
codex plugin marketplace upgrade cockpit
codex plugin add cockpit@cockpit
\`\`\`

\`upgrade\` 用清单名 \`cockpit\`，不是仓库路径 \`cockpit-dev/cockpit\`。装完或升级后新开会话。插件 \`.mcp.json\` 是：

\`\`\`json
{
  "mcpServers": {
    "cockpit": {
      "type": "stdio",
      "command": "cockpit_mcp",
      "args": []
    }
  }
}
\`\`\`

command 走 PATH 上的 \`cockpit_mcp\`，无参。**不要**在 MCP handshake 之外裸跑 \`cockpit_mcp\`。只要 MCP、不装插件时：

\`\`\`bash
codex mcp add cockpit -- cockpit_mcp
\`\`\`

\`\`\`toml
[mcp_servers.cockpit]
command = "cockpit_mcp"
args = []
enabled = true
\`\`\`

用户层表名官方就是 \`cockpit\`。这是本机 stdio，**不要** \`codex mcp login cockpit\`。已经用插件登记过就**不要**再 \`mcp add\` 同一张 \`cockpit\` 表。CLI + Skill 是默认控制面；MCP 是可选 typed 传输。两者打到同一套 Supervisor，同一任务不要两套一起跑，会重复 mutation。文档：装插件不等于授权去 inspect / control / start / stop 应用；用户明确说用 Cockpit 才激活。

升级运行时先 \`cockpit update --check\`，有 \`next\` 再 \`cockpit update\`，然后 \`cockpit skill\` 刷新技能提示。报错提到无关 Flutter 插件（例如 \`ffmpeg_kit_extended_flutter\`）或 Dart \`native-assets\` 时，不要加编译实验旗标；核对 \`dart --version\`、\`which dart\`、\`which cockpit\`、\`cockpit --version\`，换到中性目录重跑 \`dart pub global activate cockpit any\`。

宿主自检：\`cockpit help\`、\`cockpit --version\`、\`cockpit daemon status\`、\`cockpit session list\`。对 Flutter 项目才 \`cockpit target discover\`，读清 id / name / platform / emulator / sdk，再 \`cockpit dev start --device YOUR_DEVICE_ID\`。多行兼容时问用户选哪一个，不要隐式选主机、Flutter 默认设备或在模拟器与真机之间切换。\`deviceAmbiguous\` 就指定一个已列出的 id；\`deviceNotFound\` 修那个设备再 discover。装宿主运行时或技能本身不必 discover。这不是 Arenukvern 的 Flutter MCP toolkit，也不是 dart-lang 官方 Dart MCP。

点按、热重载、起停应用保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要 \`flutter pub global activate cockpit\`。
- 不要抄 Claude 的 \`claude plugin install cockpit@cockpit --scope user\` 或 \`claude mcp add --transport stdio\`。
- 不要抄 Cursor 的 \`.cursor/mcp.json\`。
- 不要发明 \`cockpit@openai-curated\`。
- 不要把 \`npx skills add\` 当这份插件安装器。
- 不要插件 + \`mcp add cockpit\` 叠两张表。
- 不要在 handshake 外裸跑 \`cockpit_mcp\`。

网页 Cloud 不读 \`~/.codex/config.toml\`，也碰不到你这台本机 \`cockpit_mcp\`。改完新开会话。用 \`codex mcp get cockpit\` 看传输是 stdio、命令是 \`cockpit_mcp\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Cockpit", "插件", "Flutter", "stdio"],
    related: ["plugin-mcp-cwd-dot", "mcp-add-and-login", "flutter-mcp-toolkit-plugin"],
    sources: [
      {
        label: "Cockpit · INSTALL.md",
        url: "https://github.com/cockpit-dev/cockpit/blob/main/skills/cockpit/INSTALL.md",
      },
      {
        label: "Cockpit · Agent Integrations",
        url: "https://github.com/cockpit-dev/cockpit/blob/main/docs/agent-integrations.md",
      },
      {
        label: "cockpit-dev/cockpit",
        url: "https://github.com/cockpit-dev/cockpit",
      },
    ],
  },
  {
    id: "bitbucket-agentic-codex",
    no: 434,
    title: "Bitbucket Agentic Pipelines 必须写 provider: codex，默认镜像用 atlassian/default-image:5",
    summary:
      "YAML 里不写 provider 就默认 Rovo Dev。自定义配置走 config.path，Pipelines 会生成 .codex/config.toml 并 git exclude，不要提交。流水线接 Jira 用 v1/native/mcp 加 Basic 头，不要 mcp login。",
    body: `Bitbucket Agentic Pipelines 必须写 provider: codex，默认镜像用 atlassian/default-image:5。这是 Bitbucket Cloud 的开放 beta：Workspace settings → AI → AI features，打开 Agentic Pipelines。Codex 是 bring-your-own account，走 Third-Party Product：源码、提示和日志会去 OpenAI。密钥只放仓库安全变量，不要写进 YAML 或 prompt。不要把本机 \`codex login\` 抄进流水线。

最小骨架：

\`\`\`yaml
image: atlassian/default-image:5

definitions:
  agents:
    my-agent:
      prompt: "Explain this repository"
      provider: codex
      permissions:
        on-ask: allow
pipelines:
  default:
    - step:
        name: Codex agent
        auth:
          system:
            scopes:
              - read:pullrequest:bitbucket
        script:
          - agent: my-agent
\`\`\`

不写 \`provider: codex\` 就默认 Rovo Dev。适配器要 OpenSSL 3，官方默认镜像是 \`atlassian/default-image:5\`。容器里可跑 \`codex doctor\`。不要抄 Claude 那套 YAML，也不要 \`--yolo\`。

自定义配置用 \`config.path\` 指向仓库里的 TOML，例如 \`.codex/atlassian-mcp.toml\` 或 \`codex-config-overrides.toml\`。也可以在 YAML 写 \`config.overrides\`。合并顺序：系统底稿 → \`config.path\` → \`config.overrides\` → 系统强制项，后者赢。Pipelines 合并后写到**生成的** \`.codex/config.toml\` 并加入 git exclude——**不要提交这份生成文件**。

Agentic Pipelines 默认 \`sandbox_mode = danger-full-access\`，\`approval_policy = on-request\`。非交互流水线用 \`permissions.on-ask: allow\` 或 \`deny\` 代答批准。要收紧就在 overrides 里改 \`workspace-write\` / \`read-only\`。

额外 MCP 写 TOML \`[mcp_servers.NAME]\`，**不要** \`.mcp.json\`。Bitbucket Cloud MCP **自动注入**，不要自己 \`mcp add\`。写 PR / 评论先在 step 的 \`auth.system.scopes\` 开最小权限。Apps / connectors 默认关；真要才 \`[features] apps = true\`。

流水线里接 Jira / Confluence，官方示例是 \`https://mcp.atlassian.com/v1/native/mcp\`，再用 \`env_http_headers\` 把 \`Authorization\` 映射到仓库密钥 \`ATLASSIAN_MCP_AUTH\`（值为 \`Basic\` + \`email:token\` 的 base64）。**不要**在流水线 \`mcp login\`。这和本机 TIP 的 \`v2/mcp\` + OAuth DCR **不是一条路**，不要叠成一台，也不要把 \`v2/mcp\` 抄进 pipelines。

\`\`\`toml
[mcp_servers.atlassian-mcp]
url = "https://mcp.atlassian.com/v1/native/mcp"

[mcp_servers.atlassian-mcp.env_http_headers]
Authorization = "ATLASSIAN_MCP_AUTH"
\`\`\`

这里 \`Authorization\` 走整段 Basic，所以用 \`env_http_headers\`，不要改成 \`bearer_token_env_var\`。不要 \`required = true\`。不要当发布门禁：官方写明结果非确定性，要人审。`,
    category: "automation",
    level: "intermediate",
    surfaces: ["ci"],
    tags: ["Bitbucket", "Pipelines", "CI", "MCP", "Atlassian"],
    related: ["mcp-atlassian-remote", "mcp-http-env-headers", "ephemeral-ci"],
    sources: [
      {
        label: "Bitbucket · Codex: Advanced agentic configuration",
        url: "https://support.atlassian.com/bitbucket-cloud/docs/codex-advanced-agentic-configuration/",
      },
      {
        label: "Atlassian · Agentic Pipelines now supports OpenAI Codex",
        url: "https://www.atlassian.com/blog/bitbucket/agentic-pipelines-now-supports-openai-codex",
      },
      {
        label: "Bitbucket · Agentic Pipelines",
        url: "https://support.atlassian.com/bitbucket-cloud/docs/agentic-pipelines/",
      },
      {
        label: "Bitbucket · Interacting with Bitbucket via MCP",
        url: "https://support.atlassian.com/bitbucket-cloud/docs/interacting-with-bitbucket-via-mcp/",
      },
      {
        label: "Bitbucket · Authentication and security for Agentic Pipelines",
        url: "https://support.atlassian.com/bitbucket-cloud/docs/authentication-and-security-for-agentic-pipelines/",
      },
    ],
  },
  {
    id: "paddle-codex-plugin",
    no: 435,
    title: "Paddle 官方插件先 marketplace add PaddleHQ/paddle-agent-skills，再装 paddle",
    summary:
      "官方 Codex：marketplace add PaddleHQ/paddle-agent-skills，再 plugin add paddle@paddle-agent-skills。插件会登记 paddle-docs、paddle-sandbox、paddle-live。沙箱密钥 PADDLE_SANDBOX_API_KEY，live 再 mcp login paddle-live。不要抄 Claude 的 --transport http。",
    body: `Paddle 官方插件先 marketplace add PaddleHQ/paddle-agent-skills，再装 paddle。这是 Paddle Billing 的官方 Codex 专节，不是 Paddle Classic。插件把技能、文档 MCP 和账户 MCP 打成一包。清单名是 \`paddle-agent-skills\`，插件名是 \`paddle\`：

\`\`\`bash
codex plugin marketplace add PaddleHQ/paddle-agent-skills
codex plugin add paddle@paddle-agent-skills
\`\`\`

文档写「打开 Codex，从插件目录装 paddle」。CLI 对照就是上面第二行。以后刷新：\`codex plugin marketplace upgrade paddle-agent-skills\`。装完新开会话。

插件 \`.mcp.json\` 会登记三台 HTTP MCP，**不要**再 \`mcp add\` 叠一张：

- \`paddle-docs\` → \`https://paddlehq.mcp.kapa.ai\`。Google / GitHub 登录，只要限流，**不要** Paddle 账号或 API key。
- \`paddle-sandbox\` → \`https://sandbox-mcp.paddle.com/mcp\`。Bearer，环境变量名 \`PADDLE_SANDBOX_API_KEY\`。沙箱密钥前缀 \`pdl_sdbx_\`。沙箱**不支持** OAuth。
- \`paddle-live\` → \`https://mcp.paddle.com/mcp\`。交互走 OAuth：

\`\`\`bash
export PADDLE_SANDBOX_API_KEY=pdl_sdbx_YOUR_KEY
codex mcp login paddle-live
\`\`\`

变量必须在**启动 Codex 的那个进程**里。Dock / 开始菜单打开的桌面读不到刚写的 zshrc。改完彻底退出再开。无头 / CI 才给 live 配 \`bearer_token_env_var = "PADDLE_LIVE_API_KEY"\`，不要和已经 login 的 OAuth 写在同一张表。沙箱钥打 live URL、live 钥打沙箱 URL 都会鉴权失败。

OAuth 默认按你的 Paddle 角色只读。要改权限去 Paddle → Connectors → MCP。破坏性操作没有硬闸，保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。默认走 sandbox；提示里没写 live / production，就不要调 \`paddle-live\`。

没有插件、只要 MCP 时才手写：

\`\`\`bash
codex mcp add paddle-sandbox --url https://sandbox-mcp.paddle.com/mcp --bearer-token-env-var PADDLE_SANDBOX_API_KEY
codex mcp add paddle-live --url https://mcp.paddle.com/mcp
codex mcp login paddle-live
\`\`\`

\`\`\`toml
[mcp_servers.paddle-sandbox]
url = "https://sandbox-mcp.paddle.com/mcp"
bearer_token_env_var = "PADDLE_SANDBOX_API_KEY"
enabled = true

[mcp_servers.paddle-live]
url = "https://mcp.paddle.com/mcp"
enabled = true
\`\`\`

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add PaddleHQ/paddle-agent-skills\` / \`/plugin install paddle@paddle-agent-skills\`。Codex 动词是 \`plugin marketplace add\` 和 \`plugin add\`。
- 不要抄文档 MCP / 产品 MCP 的 Codex 页里的 \`codex mcp add --transport http\`。那是 Claude 语法。Codex 用 \`--url\`。
- 不要把 \`npx skills add https://developer.paddle.com/\` 当 Codex 安装器。那是 Cursor / Windsurf。
- 不要抄 \`npx mcp-remote\`、Cursor JSON 或把密钥写进 \`http_headers\`。
- 不要把手写表和插件捆绑 MCP 叠两套。
- 不要把这份技能抄成 Paddle Classic。

仓库根的 \`AGENTS.md\` 可以写「查文档走 paddle-docs、开发默认 sandbox、webhook 要验签、密钥只放环境变量」；按你们栈改，不要整段粘贴官方示例。网页 Cloud 不读 \`~/.codex/config.toml\`。用 \`codex mcp get paddle-sandbox\` 看传输是 streamable_http。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Paddle", "插件", "MCP", "Billing"],
    related: ["mcp-add-and-login", "mcp-http-bearer-env", "polar-mcp-http"],
    sources: [
      {
        label: "Paddle · Build with Codex",
        url: "https://developer.paddle.com/get-started/ai/codex/",
      },
      {
        label: "Paddle · Agent skills and plugins",
        url: "https://developer.paddle.com/sdks/ai/agent-skills",
      },
      {
        label: "Paddle · MCP server",
        url: "https://developer.paddle.com/sdks/ai/paddle-mcp",
      },
      {
        label: "Paddle · Docs MCP server",
        url: "https://developer.paddle.com/sdks/ai/docs-mcp",
      },
      {
        label: "PaddleHQ/paddle-agent-skills",
        url: "https://github.com/PaddleHQ/paddle-agent-skills",
      },
    ],
  },
  {
    id: "dodo-payments-codex-plugin",
    no: 436,
    title: "Dodo Payments 官方插件先 marketplace add dodopayments/dodo-agent-plugin，再装 dodopayments",
    summary:
      "官方 Codex：marketplace add dodopayments/dodo-agent-plugin，再 plugin add dodopayments@dodopayments。插件登记 dodopayments-api 和 dodo-knowledge。API 再 mcp login，文档 MCP 不要鉴权。不要抄 mcp-remote 或 /sse。",
    body: `Dodo Payments 官方插件先 marketplace add dodopayments/dodo-agent-plugin，再装 dodopayments。这是 Dodo Payments 的官方 Codex 专节，不是 Polar、Stripe、RevenueCat。插件把十七个技能和两台 HTTP MCP 打成一包。清单名和插件名都是 \`dodopayments\`：

\`\`\`bash
codex plugin marketplace add dodopayments/dodo-agent-plugin
codex plugin add dodopayments@dodopayments
\`\`\`

\`codex plugin list\` 应看到 \`dodopayments@dodopayments\` 为 installed, enabled。以后刷新：\`codex plugin marketplace upgrade dodopayments\`。旧文档曾写「Codex 没有 plugin add，只能进 TUI \`/plugins\`」。现行 CLI 有 \`plugin add\`；从来没有 \`codex plugin install\`。桌面先在终端加 marketplace，再 Plugins 把源切到 Dodo Payments 点加号。0.154 起先看**当前会话**；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用 CLI 加完再到 TUI 或桌面去装。

规范 \`mcp.json\` 是 Streamable HTTP，两台表名不要改：

- \`dodo-knowledge\` → \`https://knowledge.dodopayments.com/mcp\`。文档语义检索，**不要** API key，也**不要** \`mcp login\`。
- \`dodopayments-api\` → \`https://mcp.dodopayments.com/mcp\`。交互走 OAuth：

\`\`\`bash
codex mcp login dodopayments-api
\`\`\`

装完插件就**不要**再 \`mcp add\` 叠一张。生成的 \`.mcp.json\` 和 \`.codex-plugin/plugin.json\` 指向 \`npx mcp-remote\`，那是 Claude / VS Code 兼容层。Codex 自己走 HTTP。若 \`codex mcp get dodopayments-api\` 看到 command 是 \`npx\`，不要把那份 stdio 抄进用户 \`config.toml\`；改用手写 \`--url\`，并先去掉插件那套。

没有插件、只要 MCP 时才手写：

\`\`\`bash
codex mcp add dodo-knowledge --url https://knowledge.dodopayments.com/mcp
codex mcp add dodopayments-api --url https://mcp.dodopayments.com/mcp
codex mcp login dodopayments-api
\`\`\`

\`\`\`toml
[mcp_servers.dodo-knowledge]
url = "https://knowledge.dodopayments.com/mcp"
enabled = true

[mcp_servers.dodopayments-api]
url = "https://mcp.dodopayments.com/mcp"
enabled = true
\`\`\`

API 那台是 Code Mode：文档检索 + 沙箱里跑 TypeScript，不是上百个 REST 工具一次摊开。能建支付、改订阅、退款，保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。无头 / CI 才考虑本机 \`npx dodopayments-mcp\` 加 \`DODO_PAYMENTS_API_KEY\`，不要和已经 login 的 OAuth 写在同一张表。密钥前缀是 \`dodo_test_\` / \`dodo_live_\`，不要写进 \`http_headers\`、\`args\` 或提示词。

不要做这些：

- 不要抄 Claude 的 \`claude plugins marketplace add dodopayments/dodo-agent-plugin\` / \`claude plugins install dodopayments@dodopayments\`。
- 不要发明 \`codex plugin install dodopayments@dodopayments\`。
- 不要抄 MCP 手册里其它客户端的 \`npx mcp-remote https://mcp.dodopayments.com/sse\`。那是 SSE。Codex 用 \`--url\` 打 \`/mcp\`。
- 不要把仓库 clone 进 \`~/.cursor/plugins\` 或 OpenCode 的 \`@dodopayments/opencode-plugin\` 当 Codex 安装器。
- 不要用 \`npx skills add\` 当插件安装器：那不会按 Codex 登记这两台 MCP。
- 不要把手写表和插件捆绑 MCP 叠两套。
- 不要把这份技能抄成 Polar \`mcp.polar.sh\` 或 Stripe \`mcp.stripe.com\`。

仓库根的 \`AGENTS.md\` 可以写「查文档走 dodo-knowledge、改账走 dodopayments-api、webhook 要验签、密钥只放环境变量」；按你们栈改，不要整段粘贴官方示例。网页 Cloud 不读 \`~/.codex/config.toml\`。用 \`codex mcp get dodopayments-api\` 看传输是 streamable_http。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Dodo", "插件", "MCP", "Billing"],
    related: ["mcp-add-and-login", "mcp-http-not-sse", "polar-mcp-http"],
    sources: [
      {
        label: "Dodo Payments · Build with AI coding agents",
        url: "https://docs.dodopayments.com/developer-resources/build-with-ai-coding-agents",
      },
      {
        label: "Dodo Payments · MCP server",
        url: "https://docs.dodopayments.com/developer-resources/mcp-server",
      },
      {
        label: "Dodo Payments · Agent skills",
        url: "https://docs.dodopayments.com/developer-resources/agent-skills",
      },
      {
        label: "dodopayments/dodo-agent-plugin",
        url: "https://github.com/dodopayments/dodo-agent-plugin",
      },
      {
        label: "dodopayments/skills",
        url: "https://github.com/dodopayments/skills",
      },
    ],
  },
  {
    id: "weppy-roblox-codex-plugin",
    no: 437,
    title: "WEPPY Roblox 插件先 marketplace add hope1026/weppy-roblox-mcp，再装 weppy-roblox-ai-toolkit",
    summary:
      "官方 Codex：marketplace add hope1026/weppy-roblox-mcp，再 plugin add weppy-roblox-ai-toolkit@hope1026-roblox-mcp。插件会登记 npx -y @weppy/roblox-mcp@latest。只要 MCP 才 mcp add weppy-roblox-mcp。不要叠，也不要抄 Claude 的 plugin install。",
    body: `WEPPY Roblox 插件先 marketplace add hope1026/weppy-roblox-mcp，再装 weppy-roblox-ai-toolkit。官方 Codex CLI 专节把这条插件和 MCP 拆开：插件会带 Roblox Studio 工作流技能，并登记本机 stdio MCP；只要连 Studio、不要技能时才手写 \`mcp add\`。

这不是 Roblox 官方 Studio MCP，也不是 VS Code 里的 WEPPY Roblox Explorer。先在 Roblox Studio 装 **WEPPY Roblox Studio Plugin**，Plugins 页点 WEPPY → Connect。本机看板默认 \`http://localhost:3002\`。Node.js 要 18+。MCP 包和 Studio 插件必须同一发行版，对不上就一起更新，再重启 Studio 后重连。

在**普通终端**加 marketplace，不要在 Codex TUI 里跑：

\`\`\`bash
codex plugin marketplace add hope1026/weppy-roblox-mcp
codex plugin add weppy-roblox-ai-toolkit@hope1026-roblox-mcp
codex plugin list
\`\`\`

\`.agents/plugins/marketplace.json\` 的 name 是 \`hope1026-roblox-mcp\`，插件 name 是 \`weppy-roblox-ai-toolkit\`，显示名是 WEPPY AI Agent Plugin。所以 CLI 是 \`weppy-roblox-ai-toolkit@hope1026-roblox-mcp\`。官方文档只写完 marketplace 后开 TUI \`/plugins\` 再 Install plugin；现行 CLI 动词是 \`add\` 不是 \`install\`。\`plugin add\` 失败就按文档走 \`/plugins\`。桌面 Plugins 搜 WEPPY 效果一样。0.154 起先看**当前会话**；当前会话没有再新开。

插件会把 MCP 登记成：

\`\`\`toml
[mcp_servers.weppy-roblox-mcp]
command = "npx"
args = ["-y", "@weppy/roblox-mcp@latest"]
\`\`\`

这是 **stdio**，不要 \`url\`，不要 \`codex mcp login\`。bundled \`.mcp.json\` 表名就是 \`weppy-roblox-mcp\`。已经装了插件就**不要**再 \`mcp add\` 同一张表。

只要 MCP、不装技能时，官方 Method 2：

\`\`\`bash
codex mcp add weppy-roblox-mcp -- npx -y @weppy/roblox-mcp@latest
\`\`\`

\`codex mcp get weppy-roblox-mcp\` 应看到 command 是 \`npx\`。装完在 Studio 里 Connect，再让它说当前选中了什么。连不上先看 Studio 是否 Connected，以及 3002 有没有被防火墙拦。MCP 起不来可在终端直接跑 \`npx -y @weppy/roblox-mcp@latest\` 看报错。插件没出现在目录里：

\`\`\`bash
codex plugin marketplace upgrade hope1026-roblox-mcp
\`\`\`

官方一键 \`install.sh\` 会给 Codex 加 marketplace，并提示你去 Plugin Directory 装插件；检测不到插件时回退 \`mcp add weppy-roblox-mcp\`。那是安装器路径，不是 \`plugin add\` 的替代写法。改画布、写脚本、开 Playtest 保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要抄 Claude 的 \`claude plugin install weppy-roblox-ai-toolkit@hope1026-roblox-mcp --scope user\`。Codex 动词是 \`plugin add\`，也不要带 \`--scope user\`。
- 不要发明 \`codex plugin install\`。
- 不要把插件 MCP 和用户层 \`mcp add weppy-roblox-mcp\` 叠成两台。
- 不要抄 Claude / Cursor 的 \`--transport stdio\` 或 \`mcp-remote\`。
- 不要把 VS Code 的 WEPPY Roblox Explorer 当成这条 Codex 插件。Explorer 读同步树，不是 MCP 安装器。
- 不要把 Roblox 官方 Studio MCP 写成这一台。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。核对：\`codex plugin list\` 看到 \`weppy-roblox-ai-toolkit@hope1026-roblox-mcp\` 为 installed, enabled；\`codex mcp get weppy-roblox-mcp\` 的 command 是 \`npx\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "WEPPY", "Roblox", "plugins"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "unity-codex-plugin"],
    sources: [
      {
        label: "WEPPY · Codex CLI Setup",
        url: "https://weppyai.com/en/docs/agents/codex-cli/",
      },
      {
        label: "WEPPY · Getting Started",
        url: "https://weppyai.com/en/docs/getting-started/",
      },
      {
        label: "hope1026/weppy-roblox-mcp",
        url: "https://github.com/hope1026/weppy-roblox-mcp",
      },
    ],
  },
  {
    id: "elixir-phoenix-codex-plugin",
    no: 438,
    title: "Elixir Phoenix 插件先 marketplace add oliver-kriska/claude-elixir-phoenix，再装 elixir-phoenix@oliver-kriska",
    summary:
      "官方 Codex：marketplace add oliver-kriska/claude-elixir-phoenix --ref main，再 plugin add elixir-phoenix@oliver-kriska。技能要用 $elixir-phoenix:phx-review，不是 /phx:review。Tidewave 另 mcp add，插件不会登记。",
    body: `Elixir Phoenix 插件先 marketplace add oliver-kriska/claude-elixir-phoenix，再装 elixir-phoenix@oliver-kriska。phxagents 给 Codex 单独生成了 \`targets/codex\`：51 条 Elixir / Phoenix 技能，外加一条要你在 \`/hooks\` 里另信的同步安全钩子。这不是 Claude 那套 \`/phx:review\`，也不是 Amp / Pi 的安装路径。

在**普通终端**加 marketplace，不要在 Codex TUI 里跑。官方钉 \`--ref main\`：

\`\`\`bash
codex plugin marketplace add oliver-kriska/claude-elixir-phoenix --ref main
codex plugin add elixir-phoenix@oliver-kriska
codex plugin list
\`\`\`

\`.agents/plugins/marketplace.json\` 的 name 是 \`oliver-kriska\`，插件 name 是 \`elixir-phoenix\`，显示名是 Elixir/Phoenix Skills。所以 CLI 是 \`elixir-phoenix@oliver-kriska\`。\`marketplace add\` **只登记源**，还要再 \`plugin add\`。\`codex plugin list\` 应看到 installed, enabled。0.154 起先看**当前会话**；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用 CLI 装。

技能必须带插件前缀。合成器里用 \`/skills\` 搜 \`phx-review\`，或显式写：

\`\`\`text
$elixir-phoenix:phx-investigate FunctionClauseError after saving the profile form
$elixir-phoenix:phx-review
$elixir-phoenix:ecto-n1-check Accounts
\`\`\`

光写 \`$phx-investigate\` **不会**点名这份插件。不要抄 Claude 的 \`/phx:plan\`、\`/plugin install elixir-phoenix\`。生成物把 \`phx:review\` 改成了 \`phx-review\`。不要手改 \`targets/codex\`；源技能在 \`plugins/elixir-phoenix/skills\`。

插件**不会**登记 Tidewave。Phoenix 已经跑着 Tidewave 时，官方 Codex 专节是：

\`\`\`bash
codex mcp add tidewave --url http://localhost:4000/tidewave/mcp
\`\`\`

把 \`4000\` 换成你的 \`mix phx.server\` 端口。路径带 \`/tidewave/mcp\`。不要 \`mcp login\`。\`localhost\` 走到 IPv6 连不上时改 \`127.0.0.1\`。\`codex mcp list\` 只证明写进了配置，连没连上要在会话里 \`/mcp\`。没 Tidewave 时技能会退回本地文件、日志和 \`mix\`。

钩子拦 \`mix ecto.reset\` / \`mix ecto.drop\`、没 \`--force-with-lease\` 的 force push，以及 Elixir 项目里的 \`MIX_ENV=prod mix\`。要 Unix + Bash + \`jq\`，没有 Windows 命令。Codex **不会**默信插件钩子：新开会话打开 \`/hooks\` 再批。不批技能仍能用。不要为日常会话开 \`--dangerously-bypass-hook-trust\`。钩子 fail-open：Bash 跑不起来或缺 \`jq\` 会放行。

刷新：

\`\`\`bash
codex plugin marketplace upgrade oliver-kriska
codex plugin add elixir-phoenix@oliver-kriska
\`\`\`

写库、丢库、强推保持批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add oliver-kriska/claude-elixir-phoenix\` 或 \`/plugin install elixir-phoenix\`。Codex 动词是 \`plugin add elixir-phoenix@oliver-kriska\`。
- 不要发明 \`codex plugin install\`。
- 不要把 Claude 的 \`.claude-plugin/marketplace.json\` 当 Codex 清单。Codex 读 \`.agents/plugins/marketplace.json\`。
- 不要指望插件自动 \`mcp add tidewave\`。
- 不要抄 \`npx skills add\` 当这份插件安装器。
- 不要把这份当成 Unity / WEPPY 那种带编辑器 MCP 的游戏插件。

网页 Cloud 不读 \`~/.codex/config.toml\`。改完新开会话。核对：\`codex plugin list\` 看到 \`elixir-phoenix@oliver-kriska\`；有 Tidewave 时 \`codex mcp get tidewave\` 的 url 带 \`/tidewave/mcp\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Elixir", "Phoenix", "Skills", "Tidewave"],
    related: ["plugins-vs-skills", "plugin-marketplace-ref-sparse", "unity-codex-plugin"],
    sources: [
      {
        label: "phxagents · Install for Codex",
        url: "https://phxagents.dev/install/codex/",
      },
      {
        label: "oliver-kriska/claude-elixir-phoenix",
        url: "https://github.com/oliver-kriska/claude-elixir-phoenix",
      },
      {
        label: "Tidewave · OpenAI Codex",
        url: "https://tidewave.hexdocs.pm/mcp_codex.html",
      },
    ],
  },
  {
    id: "box-codex-plugin",
    no: 439,
    title: "Box 先 Plugins 搜 Box，远程 MCP 走 mcp.box.com，不要加 /mcp",
    summary:
      "官方 Codex：管理员先启用 ChatGPT - MCP。桌面 Plugins 或 TUI /plugins 搜 Box，再 OAuth。官方没给 plugin add id。只要 MCP：mcp add box --url 走 mcp.box.com，不要加 /mcp。不要抄 box-for-ai 的 auth 表，也不要抄 Claude 的 --transport http。",
    body: `Box 先 Plugins 搜 Box，远程 MCP 走 mcp.box.com，不要加 /mcp。官方给 Codex 的主路径是公共插件目录，不是 \`codex plugin add box@…\`。桌面 Plugins 或 TUI \`/plugins\` 搜 Box，点安装，用隔离的开发者账号做 OAuth。官方没给出带 marketplace 的插件 id，不要自己编 \`box@openai-curated\`。

企业管理员先在 Box Admin Console → Integrations 找到 ChatGPT - MCP（可用 MCP 分类过滤），Availability 设成 Available to all users。免费开发者账号自己就是 admin，这一步自己做。教程还要求在 Box AI → Settings 打开 AI API 和 Official Box Integrations。生产环境不要把日常企业账号交给 agent；用只放样例文件的开发者账号。

0.154 起先在**当前会话**看 \`/plugins\`；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用桌面或下面的 MCP。装完在同一会话敲 \`/mcp\`，确认 Box 已连。插件已经带了托管 MCP 时，不要再 \`mcp add\` 同一张表。

只要 MCP、不要整包插件时，托管地址是 \`https://mcp.box.com\`，**不要**加 \`/mcp\` 后缀（不要按 Resend 那种带后缀去改）：

\`\`\`bash
codex mcp add box --url https://mcp.box.com
codex mcp login box
codex mcp get box
\`\`\`

\`\`\`toml
[mcp_servers.box]
url = "https://mcp.box.com"
enabled = true
\`\`\`

用户层表名用 \`box\`。没弹浏览器再 \`mcp login box\`。这是 Streamable HTTP + OAuth，不要 API key，不要 \`--bearer-token-env-var\`。

不要做这些：

- 不要发明 \`codex plugin add box@openai-curated\`，也不要把 awesome 名单里的 id 当成官方 id。
- 不要抄 \`box/box-for-ai\` 里 \`.codex-plugin/README.md\` 的 \`[mcp_servers.box.auth]\` 把 \`CLIENT_ID\` / \`CLIENT_SECRET\` 写进 Codex 配置。那不是 Codex 语法。
- 不要用 \`npx skills add box/skills\` 当插件安装器。那会改**所有检测到的客户端**，不是 \`/plugins\`。不确定就别跑。也不要手拷到 \`~/.codex/skills\`。
- 不要把 Box CLI（\`npm install --global @box/cli\`、\`box login\`、\`box users:get me\`）当成这条 MCP 的安装器。CLI 是另一条 OAuth 路径。
- 不要抄已弃用的自托管仓 \`box-community/mcp-server-box\`，也不要抄它的 Cursor JSON 或 Claude \`mcpServers\`。新接法走 \`https://mcp.box.com\`。
- 不要抄 Claude 的 \`--transport http\`、Connectors，也不要抄 Cursor JSON 或 \`npx mcp-remote https://mcp.box.com\`。
- 不要给它 \`required = true\`。不要一上来 \`--yolo\`。这台会搜、上传、改文件夹、走 Box AI。
- 不要把 Admin Console 里给**未列出客户端**生成的 Client ID / Client Secret 贴进 \`config.toml\`。那是自定义集成，不是 ChatGPT - MCP 这条插件路径。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 也走 Plugins 搜 Box。改完新开会话。用 \`codex plugin list\` 看插件是否已装；手写 MCP 用 \`codex mcp get box\` 看传输是 streamable_http，url 是 \`https://mcp.box.com\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Box", "plugins", "OAuth"],
    related: ["mcp-add-and-login", "mcp-oauth-loopback-callback", "mcp-resend-remote"],
    sources: [
      {
        label: "Box Developers · Codex",
        url: "https://developer.box.com/guides/box-mcp/integrations/codex",
      },
      {
        label: "Box Developers · Connect an AI agent to Box",
        url: "https://developer.box.com/tutorials/connect-an-agent-to-box",
      },
      {
        label: "Box Developers · Self-hosted Box MCP server (legacy)",
        url: "https://developer.box.com/guides/box-mcp/self-hosted",
      },
      {
        label: "Box Developers · Agent Skills",
        url: "https://developer.box.com/ai/agent-skills",
      },
      {
        label: "box/box-for-ai",
        url: "https://github.com/box/box-for-ai",
      },
    ],
  },
  {
    id: "miro-codex-plugin",
    no: 440,
    title: "Miro 先 Plugins 搜 Miro，远程 MCP 走 mcp.miro.com，带尾斜杠",
    summary:
      "官方 Codex：桌面 Plugins 或 TUI /plugins 搜 Miro，点 Add，再选团队做 OAuth。官方没给 plugin add id。只要 MCP：mcp add miro --url 走 mcp.miro.com，带尾斜杠。不要叠插件和手写表，也不要抄 Claude 的 miro@claude-plugins-official。",
    body: `Miro 先 Plugins 搜 Miro，远程 MCP 走 mcp.miro.com，带尾斜杠。官方给 Codex 的主路径是公共插件目录：桌面左侧 Plugins 搜 Miro，点 Add，浏览器里走 Miro OAuth，并选中画板所在的团队。开发者总览写成「从 ChatGPT 插件目录加 Miro，再 Connect」。官方没给出 \`codex plugin add miro@…\` 那种 marketplace id，不要自己编 \`miro@openai-curated\`。

MCP 按团队授权，一次只连一个团队。画板必须属于你刚勾的那个团队；换团队要重新 OAuth。FAQ 写明 Last One Wins：同一个 Miro 用户即使在多个 MCP 客户端登录，也只有最近一次授权有效，其它客户端会掉线。企业计划要管理员先在 Admin settings → Apps & Integrations → MCP 打开，并可按组织或指定团队、按客户端放行。免费团队也能用 MCP；看板摘要还要开 Miro AI，会扣 AI credits。

0.154 起先在**当前会话**看 \`/plugins\`；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用桌面或下面的 MCP。装完新开会话，问它能看到哪些 Miro 画板，或贴一个 \`https://miro.com/app/board/…\` 链接。插件已经带了托管 MCP 时，不要再 \`mcp add\` 同一张表。

只要 MCP、不要整包插件时，托管地址是 \`https://mcp.miro.com/\`，**带**尾斜杠（官方 JSON 也这么写，不要丢掉尾斜杠，也不要再加 \`/mcp\`）：

\`\`\`bash
codex mcp add miro --url https://mcp.miro.com/
codex mcp login miro
codex mcp get miro
\`\`\`

\`\`\`toml
[mcp_servers.miro]
url = "https://mcp.miro.com/"
enabled = true
\`\`\`

用户层表名用 \`miro\`。没弹浏览器再 \`mcp login miro\`。这是 Streamable HTTP + OAuth 2.1，不要 API key，不要 \`--bearer-token-env-var\`。

不要做这些：

- 不要发明 \`codex plugin add miro@openai-curated\`。
- 不要抄 Claude 的 \`claude plugin install miro@claude-plugins-official\`，也不要抄 \`/plugin marketplace add miroapp/miro-ai\` 或 \`/plugin install miro@miro-ai\`。
- 不要抄 Gemini 的 \`gemini extensions install https://github.com/miroapp/miro-ai\`，也不要抄 Cursor JSON 的 \`mcpServers\`。
- 不要用 \`npx skills add miroapp/miro-ai\` 当插件安装器。那会改**所有检测到的客户端**，不是 \`/plugins\`。
- 不要把 \`miroapp/miro-ai\` 里生成本地 \`codex-plugins/\` 当成终端用户安装路径。那是仓库贡献说明。
- 不要插件已经装上还再 \`mcp add miro\`。FAQ：插件和手写 \`https://mcp.miro.com/\` 会各开一套 OAuth，工具重复、授权打架。
- 不要抄 \`npx mcp-remote https://mcp.miro.com/\`，也不要抄 Claude 的 \`--transport http\`。
- 不要给它 \`required = true\`。不要一上来 \`--yolo\`。这台会读画板、写图、改表格。

网页 Cloud 不读 \`~/.codex/config.toml\`。Cloud 也走 Plugins 搜 Miro。改完新开会话。用 \`codex plugin list\` 看插件是否已装；手写 MCP 用 \`codex mcp get miro\` 看传输是 streamable_http，url 是 \`https://mcp.miro.com/\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Miro", "plugins", "OAuth"],
    related: ["hex-codex-plugin", "webflow-codex-plugin", "mcp-add-and-login"],
    sources: [
      {
        label: "Miro Marketplace · Miro MCP for OpenAI Codex",
        url: "https://miro.com/marketplace/miro-mcp-for-openai-codex/",
      },
      {
        label: "Miro Developers · MCP Server",
        url: "https://developers.miro.com/docs/miro-mcp",
      },
      {
        label: "Miro Developers · Connecting to Miro MCP",
        url: "https://developers.miro.com/docs/connecting-to-miro-mcp",
      },
      {
        label: "Miro Help · How to enable Miro's MCP Server",
        url: "https://help.miro.com/hc/en-us/articles/31625301583890-How-to-enable-Miro-s-MCP-Server-user-guide",
      },
      {
        label: "miroapp/miro-ai",
        url: "https://github.com/miroapp/miro-ai",
      },
    ],
  },
  {
    id: "smart-vs-mcp-codex-plugin",
    no: 441,
    title: "smart-vs-mcp 用 marketplace add Al3xisDani3l/smart-vs-mcp，@ 是 marketplace 名不是 npm 标签",
    summary:
      "源仓 Codex：marketplace add Al3xisDani3l/smart-vs-mcp，再 plugin add smart-vs-mcp。清单名是 smart-vs-mcp-dev。钉分支用 --ref。插件会登记 vs-mcp-smart stdio。不要 mcp login，也不要把 @ 当成 npm 标签。",
    body: `smart-vs-mcp 用 marketplace add Al3xisDani3l/smart-vs-mcp，@ 是 marketplace 名不是 npm 标签。源仓给 Codex CLI 单独写了安装页：先登记 marketplace，再装插件。这是把 Visual Studio 的 VS-MCP HTTP 端点收成一台全局 stdio 包装，按当前解去读 \`.mcp/mcpserver.settings.json\`，不要在 \`config.toml\` 里写死端口。

\`\`\`bash
codex plugin marketplace add Al3xisDani3l/smart-vs-mcp
codex plugin add smart-vs-mcp
codex plugin list
\`\`\`

\`.agents/plugins/marketplace.json\` 和 \`.claude-plugin/marketplace.json\` 的 name 都是 \`smart-vs-mcp-dev\`，插件 name 是 \`smart-vs-mcp\`。Codex 的 \`@\` 左边是插件、右边是已经登记过的 marketplace 名，所以 \`smart-vs-mcp@smart-vs-mcp-dev\` 表示从这份清单装插件，不是 npm dist-tag，也不是 Git 分支。清单快照没刷新时：

\`\`\`bash
codex plugin marketplace upgrade smart-vs-mcp-dev
codex plugin add smart-vs-mcp --marketplace smart-vs-mcp-dev
\`\`\`

以 \`codex plugin marketplace list\` 为准；安装排查页还写过 \`Al3xisDani3l-smart-vs-mcp\` 这个升级名。

要钉 \`smart-vs-mcp-dev\` 分支，把 ref 写在 marketplace add 上：

\`\`\`bash
codex plugin marketplace add Al3xisDani3l/smart-vs-mcp --ref smart-vs-mcp-dev
codex plugin add smart-vs-mcp
\`\`\`

插件 \`.mcp.json\` 表名是 \`vs-mcp-smart\`，命令是 \`npx -y @al3xisdani3l/smart-vs-mcp\`。已经装了插件就不要再 \`mcp add\` 同一张表。只要 stdio、不装插件才：

\`\`\`bash
codex mcp add vs-mcp-smart -- npx -y @al3xisdani3l/smart-vs-mcp
\`\`\`

\`\`\`toml
[mcp_servers.vs-mcp-smart]
command = "npx"
args = ["-y", "@al3xisdani3l/smart-vs-mcp"]
\`\`\`

stdio，不要 \`mcp login\`。解根放 \`.mcp/mcpserver.settings.json\`（或 \`.mcpserver.settings.json\`），示例字段是 \`port\` / \`host\` / \`scheme\`。Visual Studio 和它的 MCP 扩展要先在这个解上跑起来。诊断：

\`\`\`bash
npx -y @al3xisdani3l/smart-vs-mcp doctor --workspace C:\\Repos\\YourSolution
\`\`\`

包装模式诊断打 stderr，stdout 只走 MCP JSON-RPC。连上之后优先用 VS-MCP 的符号和调用图工具，缺工具先 \`doctor\` 再退回 Grep。

0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace 后彻底退出再开。IDE 扩展没有 \`/plugins\`，用 CLI 加完再到 TUI 或桌面去装。网页 Cloud 不读你这台 \`CODEX_HOME\`。

不要做这些：

- 不要把 \`@\` 当成 npm 标签或 Git 分支。钉 ref 用 \`marketplace add --ref\`。
- 不要抄 Claude 的 \`/plugin marketplace add\` / \`/plugin install\`。
- 不要抄 \`npx skillfish add\` 当 Codex 安装器。
- 不要发明 \`smart-vs-mcp@openai-curated\`。
- 不要和手写 \`vs-mcp-smart\` 表叠一台。
- 不要 \`mcp login vs-mcp-smart\`。
- WSL 里 Visual Studio 在 Windows 上跑时，\`--workspace\` 用 \`/mnt/c/...\` 或改到 Windows shell。
- 钩子只做 SessionStart 诊断，不改用户配置；Windows 本地模拟优先 Git Bash，不要用 WSL 的 \`C:\\Windows\\system32\\bash.exe\`。

不要 \`required = true\`。不要一上来 \`--yolo\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Visual Studio", "插件", "stdio"],
    related: ["plugin-marketplace-ref-sparse", "mcp-add-and-login", "chrome-devtools-mcp"],
    sources: [
      {
        label: "Installing smart-vs-mcp for Codex CLI",
        url: "https://github.com/Al3xisDani3l/smart-vs-mcp/blob/main/docs/install-codex.md",
      },
      {
        label: "Al3xisDani3l/smart-vs-mcp",
        url: "https://github.com/Al3xisDani3l/smart-vs-mcp",
      },
      {
        label: "smart-vs-mcp skill",
        url: "https://github.com/Al3xisDani3l/smart-vs-mcp/blob/main/skills/smart-vs-mcp/SKILL.md",
      },
    ],
  },
  {
    id: "compound-engineering-codex-plugin",
    no: 442,
    title:
      "Compound Engineering 插件用 marketplace 加 EveryInc/compound-engineering-plugin，再 plugin add compound-engineering@compound-engineering-plugin",
    summary:
      "官方 Codex CLI：marketplace add EveryInc/compound-engineering-plugin，再 plugin add compound-engineering@compound-engineering-plugin。清单名是 compound-engineering-plugin。技能用 $ce-plan。升级先 marketplace upgrade 再 plugin add。不要抄 Claude 的 /plugin install。",
    body: `Compound Engineering 插件用 marketplace 加 EveryInc/compound-engineering-plugin，再 plugin add compound-engineering@compound-engineering-plugin。仓库 README 给 Codex CLI 单独一节：先登记自定义 marketplace，再装插件。内置精选目录里还没有这份。

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`compound-engineering-plugin\`，插件 name 是 \`compound-engineering\`，所以是 \`compound-engineering@compound-engineering-plugin\`。不要发明 \`compound-engineering@openai-curated\`。

\`\`\`bash
codex plugin marketplace add EveryInc/compound-engineering-plugin
codex plugin add compound-engineering@compound-engineering-plugin
codex plugin list --json
\`\`\`

也可以先 \`codex\`，进 \`/plugins\`，找 Compound Engineering marketplace，选 compound-engineering，点 Install。装完重启 Codex。CLI 动词是 \`plugin add\`，不是 \`plugin install\`；Claude 才是 \`/plugin install compound-engineering\`。

原生插件安装对 Compound Engineering 是自包含的：评审、研究那类专长写在技能里的本地 prompt 资产，**不要**再跑 \`bunx @every-env/compound-plugin install compound-engineering --to codex\`。npm 包和旧 issue 还写三步（marketplace + bunx 写 agents + TUI），那是 Codex 还不能 \`plugin add\`、自定义 agent 还要转换器时的路径。现行 README 已改成两条 \`add\`。

非默认 profile 时，每一步都要对同一个 \`CODEX_HOME\`：

\`\`\`bash
CODEX_HOME="$HOME/.codex/profiles/work" codex plugin marketplace add EveryInc/compound-engineering-plugin
CODEX_HOME="$HOME/.codex/profiles/work" codex plugin add compound-engineering@compound-engineering-plugin
\`\`\`

marketplace 只让插件出现在目录里；真正启用技能的是 \`plugin add\`。启用状态记在当前 \`CODEX_HOME\`（默认 \`~/.codex\`）。

会话里调用技能用 \`$ce-plan\`、\`$ce-brainstorm\`、\`$lfg\`，**不是** README 给斜杠宿主写的 \`/ce-plan\`。\`/goal\` 仍是 Codex 内置命令，不要和 CE 技能搞混。装完可在项目里跑 \`$ce-setup\`，缺省会写仓库 \`.compound-engineering/config.yaml\`。

升级必须先刷新缓存的 marketplace，再重新 \`plugin add\`。布局改成仓根原生、只带 skills 之后，旧 snapshot 还指着 \`plugins/compound-engineering\`，只刷新插件会停在旧版。Codex **没有** \`plugin update\`：

\`\`\`bash
codex plugin marketplace upgrade compound-engineering-plugin
codex plugin add compound-engineering@compound-engineering-plugin
\`\`\`

名字以 \`codex plugin marketplace list\` 为准。不要抄 Claude 的 \`/plugin marketplace update\` / \`/plugin update\`。

ChatGPT 桌面 / Codex App：内置 marketplace 还没有 CE。Plugins → Create 旁箭头 → Add marketplace，Source 填 \`EveryInc/compound-engineering-plugin\`，Git ref \`main\`，Sparse paths 留空。搜 Compound Engineering 再装。桌面改完彻底退出再开。

以前用 Bun convert / \`install --to codex\` 的，可能在 \`$CODEX_HOME/AGENTS.md\`（默认 \`~/.codex/AGENTS.md\`）留下 \`BEGIN COMPOUND CODEX TOOL MAP\` 到 \`END COMPOUND CODEX TOOL MAP\` 那一块。现行技能直接点 Codex 工具名，这块是过期的 Claude 兼容映射，还可能误导子代理调度。原生安装**不会**写入它。只删这一对注释之间的托管块，不要改仓库 \`AGENTS.md\`，也不要补一张新 map。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add EveryInc/compound-engineering-plugin\` 或 \`/plugin install compound-engineering\`。
- 不要抄 Cursor 的 \`/add-plugin compound-engineering\`。
- 不要抄 Copilot / Factory Droid 的 \`plugin install\`。
- 不要发明 \`compound-engineering@openai-curated\`。
- 不要把 \`npx skills add\` 或 \`bunx @every-env/compound-plugin\` 当现行 Codex 安装器。
- 不要以为 \`marketplace upgrade\` 已经更新了已装副本。
- 不要给 Sparse paths 填 \`plugins/compound-engineering\`；现行 marketplace 根就是仓根。

0.154 起先看**当前会话**；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用 CLI 加完再到 TUI 或桌面去装。网页 Cloud 不读你这台 \`CODEX_HOME\` 插件缓存。不要 \`required = true\`。不要一上来 \`--yolo\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "Compound Engineering", "Skills", "marketplace"],
    related: ["plugin-marketplace-ref-sparse", "ecc-codex-native-plugin", "plugin-session-refresh"],
    sources: [
      {
        label: "EveryInc/compound-engineering-plugin",
        url: "https://github.com/EveryInc/compound-engineering-plugin",
      },
      {
        label: "Compound Engineering · Upgrading",
        url: "https://github.com/EveryInc/compound-engineering-plugin/blob/main/docs/install/upgrading.md",
      },
      {
        label: "Every · Compound engineering",
        url: "https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents",
      },
    ],
  },
  {
    id: "sentry-codex-plugin",
    no: 443,
    title:
      "Sentry 插件用 marketplace 加 getsentry/plugin-codex，再 plugin add sentry@sentry-plugin-marketplace",
    summary:
      "官方 Codex：marketplace add getsentry/plugin-codex，再 plugin add sentry@sentry-plugin-marketplace。插件会登记 mcp.sentry.dev/mcp。不要抄 Claude 的 sentry@claude-plugins-official，也不要和手写 sentry MCP 表叠一台。",
    body: `Sentry 插件用 marketplace 加 getsentry/plugin-codex，再 plugin add sentry@sentry-plugin-marketplace。Cookbook 的 Native install 给 Codex 单独两行；仓库 README 相同。这是技能库加托管 MCP，不是只跑 \`mcp add sentry --url\` 那条。

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`sentry-plugin-marketplace\`，插件 name 是 \`sentry\`，所以是 \`sentry@sentry-plugin-marketplace\`。插件本体在 \`./plugins/sentry\`，不要把仓根或 \`getsentry/sentry-for-ai\` 源仓当成 marketplace 根。

\`\`\`bash
codex plugin marketplace add getsentry/plugin-codex
codex plugin add sentry@sentry-plugin-marketplace
codex plugin list --json
\`\`\`

策略是 \`ON_INSTALL\`：装上应弹出 Sentry OAuth。插件 \`.mcp.json\` 登记的是 \`https://mcp.sentry.dev/mcp?utm_source=plugin\`，主机仍是 \`mcp.sentry.dev\`，带 \`/mcp\`。已经手写过 \`[mcp_servers.sentry]\` 就不要和插件那张再叠一台。只要远程 MCP、不装技能时，继续走 \`mcp add sentry --url https://mcp.sentry.dev/mcp\` 再 \`mcp login sentry\`。

不要默认把文档花括号占位抄进 URL。接到某个 org 或项目时，写成真实 slug，例如 \`https://mcp.sentry.dev/mcp/my-org/my-project\`。不要默认加 \`?experimental=1\`。

升级先刷新清单，再重新 \`plugin add\`。Codex **没有** \`plugin update\`：

\`\`\`bash
codex plugin marketplace upgrade sentry-plugin-marketplace
codex plugin add sentry@sentry-plugin-marketplace
\`\`\`

名字以 \`codex plugin marketplace list\` 为准。\`plugin-codex\` 是生成仓，改技能去 \`getsentry/sentry-for-ai\`，不要直接改这份发行仓。

Cookbook 还有 \`npx @sentry/ai install\`，文档页是 \`npx @sentry/agent-plugin install\`。两条都会侦测本机所有支持的助手并改它们，**不是** Codex 专节。只要 Codex 时跑上面的两条 \`plugin\` 命令。不要抄 Claude 的 \`claude plugin install sentry@claude-plugins-official\`，也不要抄 Cursor 的 Settings → Plugins，或 \`grok plugin install getsentry/plugin-grok --trust\`。不要发明 \`sentry@openai-curated\`。不要把 \`npx skills add\` 当这份插件安装器。

少数入口技能默认可见，其余用 Codex 的 \`agents/openai.yaml\` 关掉隐式调用，用到再露。回 PR 评论还要本机 \`gh\`。错误正文是攻击者可写的输入，从 Sentry 拉来的内容修 bug 时保持工具批准。

不要 \`required = true\`。不要一上来 \`--yolo\`。0.154 起先看**当前会话**；当前会话没有再新开。IDE 扩展没有 \`/plugins\`，用 CLI 加完再到 TUI 或桌面去装。网页 Cloud 不读你这台 \`CODEX_HOME\` 插件缓存。改完用 \`codex plugin list\` 核对 \`sentry@sentry-plugin-marketplace\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "Sentry", "Skills", "MCP"],
    related: ["mcp-sentry-remote", "plugin-marketplace-ref-sparse", "plugin-session-refresh"],
    sources: [
      {
        label: "getsentry/plugin-codex",
        url: "https://github.com/getsentry/plugin-codex",
      },
      {
        label: "Sentry · Install the plugin in your coding agent",
        url: "https://sentry.io/cookbook/install-sentry-plugin-coding-agent/",
      },
      {
        label: "Sentry · Agent Plugin",
        url: "https://docs.sentry.io/ai/agent-plugin/",
      },
    ],
  },
  {
    id: "gitguardian-codex-plugin",
    no: 444,
    title: "GitGuardian 插件用 marketplace 加 GitGuardian/agent-skills，再在 /plugins 装 gitguardian",
    summary:
      "官方 Codex：marketplace add GitGuardian/agent-skills，再 /plugins 装 gitguardian。清单名是 gitguardian-agent-skills。官方没给 plugin add id。扫描走 ggshield；MCP 表名 GitGuardian，再 mcp login。",
    body: `GitGuardian 插件用 marketplace 加 GitGuardian/agent-skills，再在 /plugins 装 gitguardian。官方 README 给 Codex 单独一节，要求 CLI **0.117.0** 以上。这是**插件 marketplace**，不是手拷 SKILL.md，也不是 Claude 的 \`/plugin install\`。官方 Codex 主路径：

\`\`\`bash
codex plugin marketplace add GitGuardian/agent-skills
codex
/plugins
\`\`\`

在插件浏览器里选 **GitGuardian Agent Skills** 这一栏，打开 \`gitguardian\`，再选 **Install plugin**。清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`gitguardian-agent-skills\`，展示名是 GitGuardian Agent Skills，插件名是 \`gitguardian\`，分类 security。官方**没有**写出 \`codex plugin add gitguardian@…\` 这种 id，**不要发明** \`gitguardian@gitguardian-agent-skills\`。

插件条目的 source 是 Git URL \`https://github.com/GitGuardian/agent-skills.git\`，不是 \`local\` 的 \`./\`。Codex 目前会拒绝解析到 marketplace 根的本地路径。本地改技能时用：

\`\`\`bash
codex plugin marketplace add file:///path/to/agent-skills
codex
/plugins
\`\`\`

0.154 起先看**当前会话**；当前会话 \`/plugins\` 没有再新开。桌面改 marketplace.json 仍要重启应用。IDE 扩展没有 \`/plugins\`。CLI 装好的插件，Codex 桌面也能用。网页 Cloud 不读本机 marketplace。改完用 \`codex plugin marketplace list\` 核对清单名是 \`gitguardian-agent-skills\`。升级用清单名，不是仓库路径：

\`\`\`bash
codex plugin marketplace upgrade gitguardian-agent-skills
\`\`\`

这份发行还是 Beta：技能名、斜杠和目录布局可能改。扫描是 **CLI 优先**，走本机 [\`ggshield\`](https://github.com/GitGuardian/ggshield)；插件只是教代理何时扫、怎么读结果。MCP 只覆盖事故分诊和 honeytoken，**不能**代替路径 / 暂存区 / 历史 / Docker / 包扫描。需要 GitGuardian 账号，免费档够仓库扫描。\`ggshield\` 钩子要 1.49.0+；Codex AI 钩子要 **1.51.0+**。

插件会登记托管 MCP。表名官方就是 \`GitGuardian\`（大小写按这份），URL 是 \`https://mcp.gitguardian.com/mcp\`。Claude / Cursor 会自己弹 OAuth；Codex 要做一次：

\`\`\`bash
codex mcp login GitGuardian
\`\`\`

\`\`\`toml
[mcp_servers.GitGuardian]
url = "https://mcp.gitguardian.com/mcp"
enabled = true
\`\`\`

欧盟 SaaS 换成 \`https://mcp.eu1.gitguardian.com/mcp\`。插件清单写死美区 URL，欧盟团队不要用插件那台 MCP 硬打美国。自建 / CI 才走 ggmcp stdio + PAT，那不是这条主路径。插件已经登记 \`GitGuardian\` 时，不要再手写一张同 URL 的表。会话里 \`/mcp\` 应显示已连接。保持工具批准。不要一上来 \`--yolo\`。不要 \`required = true\`。

不要把 Claude 的 \`/gitguardian:scan-secrets\` 抄进 Codex TUI。装好后用 \`/skills\` 或 \`$\` 技能名。\`check-hmsl\` 必须你自己在终端跑 \`ggshield hmsl\`，代理不能去读那份凭证文件。

实时拦 prompt / 工具调用是另一条线，**不是**插件安装器。官方现行推荐（ggshield 1.53.0+）是：

\`\`\`bash
ggshield auth login
ggshield machine setup --agent codex --no-git-hooks --no-honeytokens
\`\`\`

它写 \`~/.codex/hooks.json\`。装完在 TUI 开 \`/hooks\`，审查并信任当前定义，否则 Codex 会跳过。更早版本才 \`ggshield install -t codex\`；1.53 起全局 AI 钩子这条已弃用。全局模式会改用户层配置，先明确同意。钩子拦的是以后的交互；已经在仓库里的密钥仍要 \`scan-secrets\`。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add GitGuardian/agent-skills\` 或 \`/plugin install gitguardian\`。
- 不要用 \`npx skills add gitguardian/agent-skills\` 当 Codex 插件安装器。那是 Cursor 和其它客户端拷 SKILL.md。
- 不要把 \`curl -fsSL agents.gitguardian.com | sh\` 当成只装 Codex 的命令。它会探测本机所有 agent。
- 不要抄 \`npx mcp-remote https://mcp.gitguardian.com/mcp\`。
- 不要发明 \`gitguardian@openai-curated\`。

改完用 \`codex plugin list\`；用户层对照 \`codex mcp get GitGuardian\` 看传输是 streamable_http。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "GitGuardian", "MCP", "Skills", "ggshield"],
    related: ["marketplace-source-path-root", "plugin-session-refresh", "mcp-add-and-login"],
    sources: [
      {
        label: "GitGuardian/agent-skills",
        url: "https://github.com/GitGuardian/agent-skills",
      },
      {
        label: "GitGuardian · Plugin distribution",
        url: "https://github.com/GitGuardian/agent-skills/blob/main/docs/maintainers/distribution.md",
      },
      {
        label: "GitGuardian · Introducing Agent Skills",
        url: "https://blog.gitguardian.com/introducing-gitguardian-agent-skills/",
      },
      {
        label: "GitGuardian · Secret scanning for AI coding tools",
        url: "https://docs.gitguardian.com/ggshield-docs/integrations/ai-coding-tools/secret-scanning-for-ai-coding-tools",
      },
    ],
  },
  {
    id: "modeltrace-guard-codex-plugin",
    no: 445,
    title: "ModelTrace Guard 用 marketplace 加 xqy2006/ModelTrace，再 plugin add modeltrace-guard@modeltrace",
    summary:
      "仓库 README：marketplace add xqy2006/ModelTrace，再 plugin add modeltrace-guard@modeltrace。清单名是 modeltrace。装完新开会话，在 /hooks 只审这份插件。探针走本机 Codex 账户，会花额度。",
    body: `ModelTrace Guard 用 marketplace 加 xqy2006/ModelTrace，再 plugin add modeltrace-guard@modeltrace。这是仓库里的 **Codex 任务内监测插件**，不是根目录那个 \`python start.py\` 开的 7860 页面。清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`modeltrace\`，展示名 Modeltrace，插件 name 是 \`modeltrace-guard\`，本地路径 \`./codex-plugin/modeltrace-guard\`。官方写出的 id 就是 \`modeltrace-guard@modeltrace\`。

\`\`\`bash
codex plugin marketplace add xqy2006/ModelTrace
codex plugin add modeltrace-guard@modeltrace
\`\`\`

本地改插件时在仓库根：

\`\`\`bash
codex plugin marketplace add .
codex plugin add modeltrace-guard@modeltrace
\`\`\`

升级用清单名，不是仓库路径：

\`\`\`bash
codex plugin marketplace upgrade modeltrace
\`\`\`

需要 Node.js 18+，以及能做原生快照 fork、临时任务、任务删除和异步 hooks 的 Codex App Server。多运行时把 \`MODELTRACE_CODEX_PATH\` 指到桌面配套 \`codex\` 的绝对路径。兼容性先跑 \`node scripts/guard.mjs doctor --fork true\`（在插件目录；\`--fork true\` 不发起推理）。

0.154 起先看**当前会话**；当前会话 \`/plugins\` 没有再新开。IDE 扩展没有 \`/plugins\`。装完打开一个**新** Codex 任务加载插件，再在 TUI 输入框敲 \`/hooks\`——这不是 shell 命令。只审 **ModelTrace Guard**：同步 \`PreToolUse\`，以及异步 \`SessionStart\`、\`UserPromptSubmit\`、\`PostToolUse\`。哈希变了要再审。网页 Cloud 不读本机 marketplace。

不要按社交帖字面「信任所有钩子」。Codex 不会因为 \`plugin add\` 就静默授权命令。企业开了 \`allow_managed_hooks_only\` 时，插件钩子整层不跑。

开启监测对目标任务说：使用 \`\$modeltrace-guard\` 为本任务开启监测。默认大约每隔 16–32 次工作工具调用采一次，异常后复测 3 次。也可以在插件目录跑 \`node scripts/guard.mjs start\`，把 \`CODEX_THREAD_ID\` 指到目标任务。仪表盘是 \`node scripts/guard.mjs dashboard\`。数据默认 \`~/.codex/modeltrace-guard\`，可用 \`MODELTRACE_GUARD_DATA\` 覆盖。

探针由 Codex **自己**生成，用已配置的账户、模型和厂商，**会花推理额度**。没有每轮或任务累计上限。正常结果静默保存，主任务不等探针。首次指纹不一致会要求智能体告知并暂停工作；额外复测全不一致时锁定任务，\`PreToolUse\` 拦截后续受支持的工作工具。恢复要用户明确要求后才能 \`resume --halt\`。结果只是参考库内的相似性，不是后端身份认证。仓库声明：未收录模型什么结果都可能出现。

不要做这些：

- 不要把 \`python start.py\` 或 \`http://127.0.0.1:7860/\` 当 Codex 插件安装器。
- 不要抄 \`codex plugin install modeltrace-guard@modeltrace\`。动词是 \`add\`。
- 不要发明 \`modeltrace-guard@openai-curated\`。
- 不要和 Braintrust 的 \`trace-codex@braintrust-codex-plugins\` 搞成同一份。
- 不要把 README 的 PowerShell 围栏当成唯一 shell。
- 不要在 Claude Code 里拿这套指纹当主路径；仓库写明那边偏差大。
- 不要一上来 \`--yolo\` 或 \`--dangerously-bypass-hook-trust\`。

改完用 \`codex plugin list --marketplace modeltrace\` 核对 \`modeltrace-guard\` 已安装。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "hooks", "ModelTrace", "Skills"],
    related: ["plugin-session-refresh", "plugin-hook-plugin-root", "ecc-codex-native-plugin"],
    sources: [
      {
        label: "xqy2006/ModelTrace",
        url: "https://github.com/xqy2006/ModelTrace",
      },
      {
        label: "ModelTrace Guard README",
        url: "https://github.com/xqy2006/ModelTrace/blob/main/codex-plugin/modeltrace-guard/README.md",
      },
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
    ],
  },
  {
    id: "codeguard-codex-plugin",
    no: 446,
    title:
      "CodeGuard 用 marketplace 加 cosai-oasis/project-codeguard，再 plugin add codeguard-security@project-codeguard",
    summary:
      "官方 Codex：marketplace add cosai-oasis/project-codeguard，再 plugin add codeguard-security@project-codeguard。要 CLI 0.142.0+。插件只有 skills，会话里用 $codeguard。不要抄 Claude 的 /plugin install，也不要把旧路径 ~/.codex/skills 当发现目录。",
    body: `CodeGuard 用 marketplace 加 cosai-oasis/project-codeguard，再 plugin add codeguard-security@project-codeguard。官方 Codex 插件页把托管安装写死成这两条 CLI：先加源仓 marketplace，再装 \`codeguard-security@project-codeguard\`。要 Codex CLI **0.142.0 或更新**，因为 0.142.0 才支持 marketplace 插件源是仓库根 \`./\`，而这仓就是这种布局。

在**普通终端**装，不要在 Codex TUI 里跑：

\`\`\`bash
codex plugin marketplace add cosai-oasis/project-codeguard
codex plugin add codeguard-security@project-codeguard
codex plugin list --marketplace project-codeguard
\`\`\`

清单名是 \`project-codeguard\`，插件 name 是 \`codeguard-security\`，所以是 \`codeguard-security@project-codeguard\`。\`plugin list\` 应看到 installed, enabled。刷新：

\`\`\`bash
codex plugin marketplace upgrade project-codeguard
codex plugin list --marketplace project-codeguard
\`\`\`

装完**新开会话**，技能目录才会进模型。会话里用 \`\$codeguard\`，或让它在写代码、审代码时自己带上。这是技能调用，不是 Claude 的 \`/plugin\` 斜杠，也替不了第一次的 \`plugin add\`。

插件**故意只打** \`./skills/\`（生成技能 \`skills/codeguard\`）。官方写明：**没有** \`sources/skills/\`（\`security-review\`、\`memory-safe-migration\` 那两份工作流）、**没有** \`codeguard-reviewer\` 自定义 agent、**没有** hooks、**没有** MCP。审代码 agent 走发行 ZIP 里的 \`.codex/agents/\`；MCP 是另起的自建服务 \`src/codeguard-mcp\`，README 只给了通用 \`mcpServers\` JSON，**不要**发明 \`codex mcp add codeguard\`，也不要把插件当成会登记 MCP。

入门页给 Codex 的另一条路是下 \`codeguard-codex.zip\`，再 \`cp -r .agents/\` 和 \`.codex/\` 进项目，或会话里跑 \`\$skill-installer\` 指向 \`skills/codeguard\`。那是把技能文件落到仓库里，**不是** marketplace 插件安装器。更早的发行还曾把技能放到 \`.codex/skills/\`，官方说那不是 Codex 文档里的发现路径，会被**静默忽略**；现行文件技能在 \`.agents/skills/codeguard/\`。不要手拷到 \`~/.codex/skills\`。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add cosai-oasis/project-codeguard\`、\`/plugin install codeguard-security@project-codeguard\` 或 \`/reload-plugins\`。Codex 动词是 \`plugin add\`，不是 \`plugin install\`。
- 不要把 Claude 的 \`extraKnownMarketplaces\` JSON 写进 \`.claude/settings.json\` 当 Codex 安装器。
- 不要发明 \`codex plugin add codeguard-security@openai-curated\` 或 \`codeguard@project-codeguard\`。
- 不要把 \`npx skills add\` 当这份插件安装器。
- 不要和 GitGuardian 的 ggshield 插件、ModelTrace Guard 钩子插件写成同一条路。CodeGuard 这条**没有** \`/hooks\` 要信。

只从你信任的源加 marketplace。0.154 起先看**当前会话**；当前会话没有再新开。桌面改 marketplace 后彻底退出再开。IDE 扩展没有 \`/plugins\`，用 CLI 加完再到 TUI 或桌面去装。网页 Cloud 不读你这台 \`CODEX_HOME\` 插件缓存。不要 \`required = true\`。不要一上来 \`--yolo\`。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["plugins", "CodeGuard", "Skills", "安全"],
    related: ["plugin-marketplace-ref-sparse", "amd-skills-plugin", "google-cloud-developer-plugin"],
    sources: [
      {
        label: "Project CodeGuard · Codex Plugin",
        url: "https://project-codeguard.org/codex-skill-plugin/",
      },
      {
        label: "cosai-oasis/project-codeguard",
        url: "https://github.com/cosai-oasis/project-codeguard",
      },
      {
        label: "Project CodeGuard · Getting Started",
        url: "https://project-codeguard.org/getting-started/",
      },
    ],
  },
  {
    id: "braintrust-trace-codex-plugin",
    no: 447,
    title:
      "Braintrust 用 bt trace enable codex 装 trace-codex@braintrust-codex-plugins",
    summary:
      "官方 Codex：先装并登录 bt，再 bt trace enable codex --project 你们的项目。插件 id 是 trace-codex@braintrust-codex-plugins。新开会话后只在 /hooks 信 Braintrust 那条。MCP 另走 mcp add braintrust，不要装已退役的 braintrust 插件。",
    body: `Braintrust 用 bt trace enable codex 装 trace-codex@braintrust-codex-plugins。官方 Codex 页把会话追踪和 MCP 拆开：追踪靠 \`bt\` 写 \`~/.codex/braintrust.json\` 并装插件；查实验、日志走远程 MCP。不要把旧文档里的 \`TRACE_TO_BRAINTRUST=true\` 当现行安装器，也不要和 ModelTrace Guard 那条 \`/hooks\` 插件搞成一台。

先在普通终端装 Codex CLI，并装好 \`bt\`（追踪要 **v0.16.0+**）。登录用 \`bt login\`，再设组织/项目上下文。Windows 上追踪钩子仍要 Bash。然后：

\`\`\`bash
bt trace enable codex --project my-project
codex plugin list --json
bt trace doctor codex
\`\`\`

\`bt trace setup\` 只是 \`enable\` 的旧别名。这条命令会刷新 marketplace \`braintrustdata/braintrust-codex-plugin\`，装上并启用 \`trace-codex@braintrust-codex-plugins\`，再写下追踪文件。文件里是路由和是否开启，**不是**密钥；鉴权归 \`bt\`。清单名是 \`braintrust-codex-plugins\`。只想手装插件、不配追踪时才：

\`\`\`bash
codex plugin marketplace add braintrustdata/braintrust-codex-plugin
codex plugin add trace-codex@braintrust-codex-plugins
\`\`\`

手装**不会**写 \`braintrust.json\`，普通会话仍不会出日志。改项目、profile、组织请再跑 \`bt trace enable\`，\`bt switch\` **不会**改这份追踪文件。只升级插件、不动路由用 \`bt trace update codex\`。关掉追踪用 \`bt trace disable codex\`，凭据还在。

装完**新开会话**。打开 \`/hooks\`，只信 Braintrust 那条稳定钩子定义；不要一键信全部钩子。插件钩子把事件交给 \`bt trace hook --source codex\`，失败是 fail-open，不会打断这一轮。单次覆盖用 \`bt trace run --project my-project -- codex …\`；这条**拒绝** \`--dangerously-bypass-hook-trust\`。无头自动化真要绕过钩子信任时，直接跑已装插件的 \`codex\`，而且你必须信当前启用的**每一条**钩子。

MCP 是另一条路，marketplace **不会**登记它。官方现行是：

\`\`\`bash
codex mcp add braintrust --url https://api.braintrust.dev/mcp
codex mcp login braintrust
\`\`\`

\`\`\`toml
[mcp_servers.braintrust]
url = "https://api.braintrust.dev/mcp"
enabled = true
\`\`\`

用户层表名官方就是 \`braintrust\`。这是 Streamable HTTP。先走 OAuth（\`mcp login\` 和 \`bt login\` 不是同一套）。以前写过 \`bearer_token_env_var = "BRAINTRUST_API_KEY"\` 就先删掉再切 OAuth，不要叠。EU 换 \`https://api-eu.braintrust.dev/mcp\`，不要加尾斜杠。若 \`codex plugin list --json\` 里还有退役的 \`braintrust@braintrust-codex-plugins\`，先 \`codex plugin remove braintrust@braintrust-codex-plugins\`；留下 marketplace，追踪插件还要用。

不要做这些：

- 不要把 \`TRACE_TO_BRAINTRUST\`、\`BRAINTRUST_PROJECT\` 当成现行普通会话的开关。v1.0.1 起读 \`~/.codex/braintrust.json\`。
- 不要发明 \`codex plugin add braintrust@openai-curated\`，也不要再装退役 MCP 插件。
- 不要抄 \`npx mcp-remote https://api.braintrust.dev/mcp\`，也不要抄 Claude 的 \`--transport http\`。
- 不要把 \`bt setup --global --agent codex\` 或 SDK 的 \`wrapOpenAICodexSDK\` 当这条 CLI 追踪安装器。
- 即使改了 \`CODEX_HOME\`，追踪文件仍在 \`~/.codex/braintrust.json\`。

0.154 起先看**当前会话**；当前会话没有再新开。网页 Cloud 不读你这台插件缓存。不要 \`required = true\`。不要一上来 \`--yolo\`。写实验、改数据集保持批准。`,
    category: "hooks",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["Braintrust", "hooks", "plugins", "MCP"],
    related: ["plugin-marketplace-ref-sparse", "mcp-add-and-login", "ecc-codex-native-plugin"],
    sources: [
      {
        label: "Braintrust · Codex",
        url: "https://www.braintrust.dev/docs/integrations/developer-tools/codex",
      },
      {
        label: "braintrustdata/braintrust-codex-plugin",
        url: "https://github.com/braintrustdata/braintrust-codex-plugin",
      },
      {
        label: "Braintrust · bt trace",
        url: "https://www.braintrust.dev/docs/reference/cli/trace",
      },
    ],
  },
  {
    id: "context-mode-codex-plugin",
    no: 448,
    title: "context-mode 用 marketplace 加 mksglu/context-mode，再在 /plugins 安装",
    summary:
      "仓库 Codex 专节：marketplace add mksglu/context-mode，再在 /plugins 装。打开 [features].hooks 和 plugin_hooks，只信任 context-mode 钩子。不要抄 Claude 的 /plugin install，也不要手写 MCP 表当主路径。",
    body: `context-mode 用 marketplace 加 mksglu/context-mode，再在 /plugins 安装。这是仓库 README 的 Codex CLI 专节，不是 Claude 的 \`/plugin marketplace add\`，也不是旧文里的 \`codex plugin install context-mode/context-mode\`。

先确认本机有 Node.js 22.5 或更高（或 Bun），并且 **启动 Codex 的那个进程** 能在 PATH 里找到 \`node\`。插件不会自带 Node，也不会自动继承 login shell 的 PATH。

\`\`\`bash
codex plugin marketplace add mksglu/context-mode
codex plugin list --json
\`\`\`

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`context-mode\`，插件 name 也是 \`context-mode\`。README 现行主路径是加完 marketplace 后在 TUI \`/plugins\` 或桌面 Plugins 里安装。CLI 等价（动词是 \`add\` 不是 \`install\`）是：

\`\`\`bash
codex plugin add context-mode@context-mode
\`\`\`

不要发明 \`context-mode@openai-curated\`。不要抄 Claude 的 \`/plugin install context-mode@context-mode\`。IDE 扩展没有 \`/plugins\`，装插件用 CLI 或桌面应用。

捆绑插件钩子在现行 Codex 里仍可能被门控。README 要你在 \`~/.codex/config.toml\` 写：

\`\`\`toml
[features]
plugin_hooks = true
hooks = true
\`\`\`

优先 \`[features].hooks\`（或 \`codex --enable hooks\`）。\`[features].codex_hooks\` 只是现行构建里的遗留别名。\`plugin_hooks\` 是给**插件自带钩子**用的，直到 Codex 默认放行插件钩子；不要把 ECC / Nowledge Mem 那句「不要手写 plugin_hooks」套到这份插件上。

默认存储写失败时，给启动 Codex 的环境设绝对可写根：

\`\`\`bash
CONTEXT_MODE_DIR="$HOME/.codex-context-mode" codex
\`\`\`

会话和统计在 \`CONTEXT_MODE_DIR/sessions\`，索引内容在 \`CONTEXT_MODE_DIR/content\`。不要用相对路径。

重启 Codex。用会话里的 \`ctx stats\` 验证 MCP 通了；这句话**不能**证明钩子已信任。打开 \`/hooks\`，只审并信任 context-mode 那组命令，不要「信任全部钩子」。哈希变了要再审一次。

插件清单用 \`.codex-plugin/mcp.json\` 起 stdio MCP（\`CONTEXT_MODE_PLATFORM=codex\`），技能在 \`./skills/\`，钩子在 \`.codex-plugin/hooks.json\`。\`plugin_hooks\` 打开且钩子已信任时，**不要**再手写 \`[mcp_servers.context-mode]\`，也不要再写 \`$CODEX_HOME/hooks.json\`。不要 \`codex mcp login context-mode\`，这台不是 OAuth 远程。

只有构建还没有 \`plugin_hooks\` 时才走后备：\`npm install -g context-mode\`，再手写 \`[mcp_servers.context-mode]\`（\`command = "context-mode"\`，环境 \`CONTEXT_MODE_PLATFORM = "codex"\`）和 \`$CODEX_HOME/hooks.json\`。那是后备，不是现行主路径。可选把 \`configs/codex/AGENTS.md\` 拷到项目 \`AGENTS.md\` 或 \`~/.codex/AGENTS.md\` 给模型看路由说明。

Codex PreToolUse 目前只支持 deny / 拦截，还不能靠 \`updatedInput\` 改写工具入参（跟 openai/codex#18491）。\`additionalContext\` 也不走 PreToolUse，插件改走 PostToolUse / SessionStart。\`PreCompact\` 在 CLI 0.130.0 起有运行时门控；更旧的构建不会在压缩前做快照。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add mksglu/context-mode\` 或 \`/plugin install context-mode@context-mode\`。
- 不要抄 Cursor 的 extraKnownMarketplaces JSON，也不要把 ZIP 解压进 \`.agents\` 或 \`$skill-installer\` 当这份插件的安装器。
- 不要和 Braintrust 的 \`trace-codex@braintrust-codex-plugins\`、ModelTrace Guard 搞成同一条路。
- 不要一上来信任全部钩子，也不要 \`--yolo\`。
- 不要 \`required = true\` 挂全局。

网页 Cloud 不读本机插件缓存，也不读 \`~/.codex/config.toml\`。0.154 起先看当前会话的 \`/plugins\` 和 \`/mcp\`；当前会话没有再新开。用 \`codex plugin list\` 确认 \`context-mode@context-mode\` 已装。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "hooks", "MCP", "context-mode"],
    related: ["plugin-marketplace-ref-sparse", "ecc-codex-native-plugin", "plugin-session-refresh"],
    sources: [
      {
        label: "mksglu/context-mode",
        url: "https://github.com/mksglu/context-mode",
      },
      {
        label: "npm · context-mode",
        url: "https://www.npmjs.com/package/context-mode",
      },
      {
        label: "context-mode · marketplace.json",
        url: "https://github.com/mksglu/context-mode/blob/main/.agents/plugins/marketplace.json",
      },
    ],
  },
  {
    id: "1password-codex-plugin",
    no: 449,
    title: "1Password Codex 插件用 marketplace 加 1Password/1password-codex-plugin，再装 1password@1password-plugins",
    summary:
      "官方 Codex 插件仓：marketplace add 1Password/1password-codex-plugin，再 plugin add 1password@1password-plugins。桌面 Labs 仍要打开本地 MCP。不要抄 Claude 的 1password-claude-plugin，也不要和手写 1password-mcp 表叠一台。",
    body: `1Password Codex 插件用 marketplace 加 1Password/1password-codex-plugin，再装 1password@1password-plugins。这是 1Password 官方 Codex 插件仓，不是帮助页里只填 \`1password-mcp\` 的桌面 MCP 表，也不是 Claude 的 \`1Password/1password-claude-plugin\`。

先装 1Password 桌面应用，建好 Developer Environment。Settings → Labs → MCP Server 打开 Enable local MCP server，再到 Settings → Developer 选 Integrate with MCP clients。插件只是登记 \`1password-mcp\` 这个桌面别名，不会替你打开 Labs。

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`1password-plugins\`，插件 name 是 \`1password\`：

\`\`\`bash
codex plugin marketplace add 1Password/1password-codex-plugin
codex plugin add 1password@1password-plugins
codex plugin list --json
\`\`\`

也可以加完 marketplace 后在 TUI \`/plugins\` 或桌面 Plugins 里装。动词是 \`add\` 不是 \`install\`。不要发明 \`1password@openai-curated\`。不要抄 \`/plugin marketplace add 1Password/1password-claude-plugin\` 或 \`/plugin install 1password@1password\`。IDE 扩展没有 \`/plugins\`。

插件 \`.mcp.json\` 起的是本地 stdio，command 就是 \`1password-mcp\`，没有 args。**不要** \`codex mcp login 1password\`。插件已经带 MCP 时，不要再 \`codex mcp add 1password -- 1password-mcp\` 叠一张用户层表。\`1password-mcp\` 不在 PATH 时，Dock 打开的桌面经常没有 Homebrew PATH；先在终端 \`which 1password-mcp\`，或把桌面应用装上的别名所在目录加进启动 Codex 的 PATH。

仓库 README 写这份插件支持 macOS、Windows 和 Linux。帮助页 Codex 专节仍写「目前 Mac 和 Linux」——那是桌面 MCP 表那条 UI 路径。本地 \`.env\` 挂载工具目前仍只支持 Mac / Linux。

目录里的 **Skills Only** ZIP 会剥掉 \`mcpServers\` / \`.mcp.json\`，只剩技能；那不是这份插件的 MCP 安装器。本地开发仍靠仓库里的 \`.mcp.json\`。

连上后先 \`list_environments\` / \`list_variables\`（只有名字）。改 Environment 或挂本地 .env 保持工具批准。第一次碰某个 Environment，1Password 会弹授权。不要一上来 \`--yolo\`，不要 \`required = true\`。

不要做这些：

- 不要抄 Claude 的 \`1Password/1password-claude-plugin\`。
- 不要抄 Cursor Plugins 搜 1Password。
- 不要抄 \`op mcp-server environments\` 或社区包 \`@takescake/1password-mcp\`。
- 不要和 1Password CLI 的 Codex **shell plugin** 搞混：那是给 \`codex\` 命令注入登录凭证。

网页 Cloud 不读本机插件缓存，也碰不到这台桌面 MCP。0.154 起先看当前会话的 \`/plugins\` 和 \`/mcp\`；当前会话没有再新开。用 \`codex plugin list\` 确认 \`1password@1password-plugins\` 已装。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "MCP", "1Password", "Environments"],
    related: ["1password-mcp-stdio", "plugin-marketplace-ref-sparse", "plugin-session-refresh"],
    sources: [
      {
        label: "1Password/1password-codex-plugin",
        url: "https://github.com/1Password/1password-codex-plugin",
      },
      {
        label: "1Password · Codex Environments MCP",
        url: "https://www.1password.dev/environments/mcp-codex-server",
      },
      {
        label: "1password-codex-plugin · marketplace.json",
        url: "https://github.com/1Password/1password-codex-plugin/blob/main/.agents/plugins/marketplace.json",
      },
    ],
  },
  {
    id: "doppler-codex-run-mcp",
    no: 450,
    title:
      "Doppler 官方 Codex：doppler run --config dev_agent_codex -- codex，MCP 再挂 @dopplerhq/mcp-server --read-only",
    summary:
      "隔离 config 名是 dev_agent_codex。令牌用 configs tokens create，再 configure set token --scope .。MCP 是本机 npx stdio，密钥用 env_vars 转发 DOPPLER_TOKEN，不要把 dp.st 写进 env 表。不要发明 plugin add。",
    body: `Doppler 官方 Codex：doppler run --config dev_agent_codex -- codex，MCP 再挂 @dopplerhq/mcp-server --read-only。这是 [Run Codex with Doppler](https://www.doppler.com/agents-codex) 的专节，不是 Claude 那页，也不是 Infisical Agent Proxy。密钥靠进程环境注入，不要写仓库 \`.env\`。MCP 让代理看项目和 config 布局；注入走 \`doppler run\`，两件事分开。

先装 CLI。macOS：

\`\`\`bash
brew install dopplerhq/cli/doppler
\`\`\`

Linux / WSL / CI 用官方 \`install.sh\`。在 Doppler 里从 \`dev\` 分出隔离 config，官方示例名是 \`dev_agent_codex\`（带环境 slug 前缀，继承 \`dev\` 除非你覆盖）。项目 slug 按你的改，不要照抄 \`my-app\`：

\`\`\`bash
doppler configs create dev_agent_codex --project my-app
doppler secrets set OPENAI_API_KEY --project my-app --config dev_agent_codex
\`\`\`

只放代理真正要用的密钥。人来决定写什么；下一步的 service token 默认只读，代理不能改回 Doppler。需要 ChatGPT 登录而不是 API key 时，这条 \`OPENAI_API_KEY\` 可以不加，改成任务要用的其它工作凭证。

铸一把绑在这个 config、带过期的令牌，先放进变量，不要在命令行里反复粘贴明文：

\`\`\`bash
export DOPPLER_CODEX_TOKEN=$(doppler configs tokens create codex-agent-token \\
  --project my-app \\
  --config dev_agent_codex \\
  --max-age 24h \\
  --plain)
\`\`\`

在 Codex 即将工作的目录里，把 CLI 令牌锁到当前目录，避免误用你的个人 CLI token：

\`\`\`bash
doppler configure set token $DOPPLER_CODEX_TOKEN --scope .
doppler run --config dev_agent_codex -- codex
\`\`\`

\`--scope .\` 只覆盖这个文件夹。\`doppler run\` 把该 config 的密钥注入子进程；进程退出后环境里的密钥就没了。沙箱也要限在这个目录。生产 config 不要随手丢给非确定性代理。非交互同样包一层：

\`\`\`bash
doppler run --config dev_agent_codex -- codex exec "prompt"
\`\`\`

MCP 是另一半：本机 stdio，包名 \`@dopplerhq/mcp-server\`，Node **20+**。服务端**不能**从 token 推断只读，官方要求加 \`--read-only\`，否则会露出写工具。官方 TOML 把 \`DOPPLER_TOKEN\` 写成 \`env\` 表字面量，还注释说 Codex 会展开 \`\${VAR}\`。\`env\` 表是字面量，占位符不会展开，密钥还会嵌进 \`~/.codex/config.toml\`。正确写法是从**启动 Codex 的那个进程**转发名字：

\`\`\`bash
export DOPPLER_TOKEN=$DOPPLER_CODEX_TOKEN
codex mcp add doppler -- npx -y @dopplerhq/mcp-server --read-only
\`\`\`

\`\`\`toml
[mcp_servers.doppler]
command = "npx"
args = ["-y", "@dopplerhq/mcp-server", "--read-only"]
env_vars = ["DOPPLER_TOKEN"]
enabled = true
\`\`\`

不要 \`codex mcp add --env DOPPLER_TOKEN=\` 把值写进 TOML。这是 stdio，**不要** \`codex mcp login doppler\`。本机已经 \`npx @dopplerhq/mcp-server login\`、凭证在钥匙串里时，可以去掉 \`env_vars\`，仍要保留 \`--read-only\`。改完重启 Codex。会话里 \`/mcp\` 只是核对工具。不要 \`required = true\`。不要一上来 \`--yolo\`。

不要做这些：

- 不要发明 \`codex plugin add doppler@…\`。官方没有 Codex 插件。
- 不要抄 \`mcpServers\` JSON，或把 \`command = "doppler"\` 的 Claude / Cursor 包装器当 Codex 表。
- 不要抄 [Run Claude with Doppler](https://www.doppler.com/agents-claude-code) 的 \`DOPPLER_CLAUDE_TOKEN\` JSON。
- 不要和 Infisical Agent Proxy、1Password 本地 MCP 写成一条。
- 不要把生产根 config 或个人 CLI token 交给代理。

网页 Cloud 不读 \`~/.codex/config.toml\`，也不吃你这台 \`doppler run\`。从 Dock 打开的桌面常常没有刚才 export 的变量。改完新开会话。用 \`codex mcp get doppler\` 看传输是 stdio，command 是 npx，args 带 \`--read-only\`。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "Doppler", "stdio", "secrets", "doppler run"],
    related: ["mcp-add-and-login", "mcp-stdio-env-vars", "infisical-agent-proxy-codex"],
    sources: [
      {
        label: "Doppler · Run Codex with Doppler",
        url: "https://www.doppler.com/agents-codex",
      },
      {
        label: "Doppler · MCP Server",
        url: "https://docs.doppler.com/docs/mcp",
      },
      {
        label: "DopplerHQ/mcp-server",
        url: "https://github.com/DopplerHQ/mcp-server",
      },
    ],
  },
  {
    id: "aws-agent-toolkit-codex-plugin",
    no: 451,
    title:
      "AWS Agent Toolkit 官方 Codex：marketplace add aws/agent-toolkit-for-aws，再 /plugins 装 aws-core",
    summary:
      "清单名是 agent-toolkit-for-aws。插件会登记 aws-mcp，走 uvx mcp-proxy-for-aws-cli 接到托管 AWS MCP。官方没给 plugin add id。不要抄 Claude 的 aws-core@claude-plugins-official。",
    body: `AWS Agent Toolkit 官方 Codex：marketplace add aws/agent-toolkit-for-aws，再 /plugins 装 aws-core。仓库 README 和 Lambda [Agent setup guide](https://docs.aws.amazon.com/lambda/latest/dg/agent-setup-guide.html) 的 Codex 专节都是这一条，不是 Claude 的 \`/plugin install\`，也不是 \`npx skills add\`。先装 [uv](https://docs.astral.sh/uv/)，插件捆绑的 MCP 靠它起 \`mcp-proxy-for-aws-cli\`。查文档可以没有 AWS 账号；调 API、跑脚本才要本机凭证。

\`\`\`bash
codex plugin marketplace add aws/agent-toolkit-for-aws
codex
/plugins
\`\`\`

在插件浏览器里打开 **aws-core**，再 Install plugin。清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`agent-toolkit-for-aws\`，展示名 Agent Toolkit for AWS。插件源是 \`local\` 的 \`./plugins/aws-core\`。官方 Codex **没有**写出 \`codex plugin add aws-core@…\`，**不要发明** \`aws-core@agent-toolkit-for-aws\`。Claude 才是 \`/plugin install aws-core@claude-plugins-official\`，不要抄进 Codex TUI。

仓库很大时可以稀疏检出，两条都要，漏了 \`plugins/aws-core\` 会装不上本地源：

\`\`\`bash
codex plugin marketplace add aws/agent-toolkit-for-aws --sparse .agents/plugins --sparse plugins/aws-core
\`\`\`

插件会登记 stdio MCP，表名是 \`aws-mcp\`。现行 \`mcp.json\` 是：

\`\`\`toml
[mcp_servers.aws-mcp]
command = "uvx"
args = [
  "mcp-proxy-for-aws-cli@latest",
  "https://aws-mcp.us-east-1.api.aws/mcp",
  "--skip-auth",
  "--metadata",
  "INSTALL_SOURCE=agent-toolkit-core",
]
\`\`\`

这是托管 [AWS MCP Server](https://docs.aws.amazon.com/agent-toolkit/latest/userguide/understanding-mcp-server-tools.html) 的本机代理，不是 Labs 那台 \`awslabs.aws-serverless-mcp-server\`。\`--skip-auth\` 只放开文档检索；真正打 AWS API 仍读本机凭证。stdio，**不要** \`codex mcp login aws-mcp\`。插件已经登记时，不要再手写一张同 URL 的表。从 Dock 打开的桌面常常没有你在 zshrc 里的 \`AWS_PROFILE\`；需要时用 \`env_vars\` 转发 \`AWS_PROFILE\` / \`AWS_REGION\`，不要把密钥写进 \`env\` 表。

0.154 起先看**当前会话**；当前会话 \`/plugins\` 没有再新开。IDE 扩展没有 \`/plugins\`。网页 Cloud 不读本机 marketplace。改完用 \`codex plugin marketplace list\` 核对清单名是 \`agent-toolkit-for-aws\`。升级用清单名：

\`\`\`bash
codex plugin marketplace upgrade agent-toolkit-for-aws
\`\`\`

同一份 marketplace 还有 \`aws-agents\`、\`aws-data-analytics\`、\`aws-agents-for-devsecops\`。先装 \`aws-core\`。\`aws-agents\` 会另起 \`awsknowledge\`，和 \`aws-mcp\` 的文档工具重叠，不要两台一起当主路径。\`aws-agents-for-devsecops\` 的 URL 占位符 Codex 展不开，先别装。

Lambda 文档另外给了一条可选 Serverless MCP（Labs，不是 Agent Toolkit 主路径）：

\`\`\`bash
codex mcp add awslabs-aws-serverless-mcp -- uvx awslabs.aws-serverless-mcp-server@latest
\`\`\`

官方示例用 \`--env AWS_PROFILE=\` 写进 TOML。配置名用 \`env_vars\` 转发；不要把 \`AWS_SECRET_ACCESS_KEY\` 写进 \`env\`。不要默认加 \`--allow-write\` / \`--allow-sensitive-data-access\`，那是 Labs README 给 Cursor 的写权限。已经装了 \`aws-core\` 时，不要把 Labs 这台和 \`aws-mcp\` 搞成同一张表。

不要做这些：

- 不要抄 Claude 的 \`/plugin marketplace add aws/agent-toolkit-for-aws\` 或 \`/plugin install aws-core@claude-plugins-official\`。
- 不要用 \`npx skills add aws/agent-toolkit-for-aws\` 当 Codex 插件安装器。
- 不要把 \`aws configure agent-toolkit\` 当成 Codex 插件命令。那是 AWS CLI。
- 不要抄 Kiro / Cursor 的 \`mcpServers\` JSON。
- 不要 \`required = true\`。不要一上来 \`--yolo\`。

网页 Cloud 不读这份插件。改完用 \`codex plugin list\`；\`codex mcp get aws-mcp\` 看传输是 stdio，command 是 uvx。`,
    category: "skills",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "AWS", "MCP", "Skills", "Lambda"],
    related: ["google-cloud-developer-plugin", "plugin-session-refresh", "mcp-stdio-env-vars"],
    sources: [
      {
        label: "aws/agent-toolkit-for-aws",
        url: "https://github.com/aws/agent-toolkit-for-aws",
      },
      {
        label: "AWS Lambda · Agent setup guide",
        url: "https://docs.aws.amazon.com/lambda/latest/dg/agent-setup-guide.html",
      },
      {
        label: "AWS · MCP Server tools",
        url: "https://docs.aws.amazon.com/agent-toolkit/latest/userguide/understanding-mcp-server-tools.html",
      },
    ],
  },
  {
    id: "langfuse-codex-observability-plugin",
    no: 452,
    title:
      "Langfuse 官方 Codex 追踪：marketplace add langfuse/codex-observability-plugin，再 plugin add tracing@codex-observability-plugin",
    summary:
      "清单名是 codex-observability-plugin。插件从 npm 包 @langfuse/codex-observability-plugin 装。Stop 钩子读 transcript。TRACE_TO_LANGFUSE 必须是字符串 true。密钥走进程环境，不要写进 env 表。不要和文档 MCP 搞成一台。",
    body: `Langfuse 官方 Codex 追踪：marketplace add langfuse/codex-observability-plugin，再 plugin add tracing@codex-observability-plugin。这是把 Codex **自己的回合**打进 Langfuse，不是去查文档、也不是去改 Langfuse 项目数据。官方集成页和仓库 README 都写了 marketplace；集成页把 \`plugin add\` 也写出来了，跟 \`.agents/plugins/marketplace.json\` 对得上。清单 name 是 \`codex-observability-plugin\`，展示名 Langfuse，插件 name 是 \`tracing\`，所以是 \`tracing@codex-observability-plugin\`。源是 npm 包 \`@langfuse/codex-observability-plugin\`，本机要 Node.js 22+ 且 \`npm\` 在 PATH 里。仓库 README 要求 Codex **0.143** 以上。

\`\`\`bash
codex plugin marketplace add langfuse/codex-observability-plugin
codex plugin add tracing@codex-observability-plugin
codex plugin list
\`\`\`

\`codex plugin list\` 应看到 \`tracing@codex-observability-plugin\` 为 installed, enabled。加完先看**当前会话**；当前会话 \`/plugins\` 没有再新开。IDE 扩展没有 \`/plugins\`，用 CLI 加。网页 Cloud 不读本机 marketplace。

钩子要单独打开并信任。现行键是 \`hooks\`，**不要**抄集成页仍写着的 \`plugin_hooks\`：

\`\`\`toml
[features]
hooks = true

[plugins."tracing@codex-observability-plugin"]
enabled = true
\`\`\`

新开会话后若出现 Hooks need review，打开 \`/hooks\`，审过 Langfuse 的 **Stop** 钩子再信任。Codex 按钩子哈希记信任；插件升级改了命令要再审一次。\`plugin list\` 显示已装不等于钩子已跑。成功时应能看到 \`hook: Stop\` 随后 \`hook: Stop Completed\`。

追踪默认关。必须让启动 Codex 的那个进程看见 \`TRACE_TO_LANGFUSE=true\`（就是这四个字母，不是 \`1\` / \`yes\`），以及 \`LANGFUSE_PUBLIC_KEY\` / \`LANGFUSE_SECRET_KEY\`。可选 \`LANGFUSE_BASE_URL\`：欧盟默认 \`https://cloud.langfuse.com\`，美区 \`https://us.cloud.langfuse.com\`，日本 \`jp\`，HIPAA \`hipaa\`。同一组名也可加 \`LANGFUSE_CODEX_\` 前缀，只给 Codex 用。变量必须在启动 Codex 的 shell 里；Codex **不**读 \`.env\`。**不要**把 \`sk-lf-…\` 写进 \`[mcp_servers]\` 的 \`env\` 表，这台插件也不是 MCP，**不要** \`codex mcp login\`。

也可以写 \`~/.codex/langfuse.json\`（项目层是仓库 \`.codex/langfuse.json\`）。解析顺序是默认值 → 全局 json → 项目 json → 环境变量，环境变量赢。json 里有 secret_key，**不要提交**。

改完彻底重启 Codex，再新开一局。测的时候连发两条短消息：Stop 钩子上传已完成的回合，最新那一回合要等下一次钩子才收口。Langfuse 里搜 \`Codex Turn\`。不要给含密钥、客户数据的会话打开追踪。可用 \`LANGFUSE_CODEX_MAX_CHARS\` 截断超长输入输出。默认失败敞开，上传出错不会卡住 Codex；排错才设 \`LANGFUSE_CODEX_DEBUG=true\`。

无头 \`codex exec\` 若要事先知道 trace id，才设 \`LANGFUSE_CODEX_TRACE_SEED\`（每趟唯一）。不要复用种子。升级：

\`\`\`bash
codex plugin marketplace upgrade codex-observability-plugin
\`\`\`

这**不是** \`https://langfuse.com/api/mcp\` 那台无鉴权文档 MCP，也不是 \`cloud.langfuse.com/api/public/mcp\` 那台产品 MCP。不要和那两张表写成一台。

不要做这些：

- 不要抄集成页的 \`plugin_hooks = true\`。现行是 \`hooks = true\`。
- 不要发明 \`tracing@langfuse\` 或 \`langfuse@openai-curated\`。
- 不要用 \`npx skills add langfuse/skills\` 当这台追踪插件的安装器。
- 不要 \`codex mcp add langfuse-tracing\`，也不要 \`mcp login\`。
- 不要把 \`sk-lf-…\` 写进 \`config.toml\` 的 \`env\` 表。
- 不要一上来 \`--yolo\`。

网页 Cloud 不读这份插件。改完用 \`codex plugin list\` 和 \`codex features list\` 核对 \`hooks\`。`,
    category: "hooks",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Langfuse", "hooks", "observability"],
    related: ["mcp-langfuse-docs", "mcp-langfuse-cloud", "plugin-session-refresh"],
    sources: [
      {
        label: "Langfuse · OpenAI Codex tracing",
        url: "https://langfuse.com/integrations/developer-tools/codex",
      },
      {
        label: "langfuse/codex-observability-plugin",
        url: "https://github.com/langfuse/codex-observability-plugin",
      },
      {
        label: "marketplace.json",
        url: "https://github.com/langfuse/codex-observability-plugin/blob/main/.agents/plugins/marketplace.json",
      },
    ],
  },
  {
    id: "weave-codex-wandb-plugin",
    no: 453,
    title:
      "W&B Weave 官方 Codex 追踪：npm i -g weave-codex，再 weave-codex install 写 Stop 钩子",
    summary:
      "这不是 marketplace 插件。weave-codex install 合并进 ~/.codex/hooks.json。WEAVE_PROJECT 必填 entity/project。默认会把 prompt 和命令输出送进 Weave。无头用 weave-codex run 包一层 exec。不要 mcp login。",
    body: `W&B Weave 官方 Codex 追踪：npm i -g weave-codex，再 weave-codex install 写 Stop 钩子。这是把 Codex **自己的回合**打进 W&B Weave，不是去给 Python 脚本做 \`weave.init()\`，也不是 \`codex plugin marketplace add\`。官方集成页和 npm 包 \`weave-codex\` 都写了这条。本机要 Node.js 20+，并且 Codex 会写默认的 rollout（\`~/.codex/sessions/**/rollout-*.jsonl\`）。\`--ephemeral\` 关掉会话落盘，追踪也会没了。

\`\`\`bash
npm install -g weave-codex
wandb login
export WEAVE_PROJECT="YOUR-TEAM/YOUR-PROJECT"
weave-codex install
weave-codex status
\`\`\`

也可以 \`export WANDB_API_KEY\`，不必 \`wandb login\`。解析顺序是环境变量 → \`~/.weave-codex/settings.json\` → \`~/.netrc\`。\`WEAVE_PROJECT\` 必须是 \`entity/project\`，没有默认值。密钥必须在**启动 Codex 的那个进程**里；Codex **不**读 \`.env\`。**不要**把 \`WANDB_API_KEY\` 写进 \`config.toml\` 的 \`env\` 表。这台也不是 MCP，**不要** \`codex mcp login\`。

\`weave-codex install\` 把 Stop 钩子合并进 \`~/.codex/hooks.json\`。回合结束时钩子在后台读新增的 rollout 行，再导出到 Weave，不挡 Codex 主路径。新开会话后若出现 Hooks need review，打开 \`/hooks\`，审过 **weave-codex** 再信任。Codex 按钩子哈希记信任；升级改了命令要再审一次。\`weave-codex status\` 显示已装不等于钩子已跑。

默认会采集 span 正文：prompt、模型回复和推理、工具参数、以及含 shell 命令、输出、文件内容的工具结果，并送到你的 Weave 实例。官方写明**没有** PII 清洗。只想要结构、token、模型和耗时时，设 \`WEAVE_CODEX_CAPTURE_CONTENT=0\`。含密钥或客户数据的会话不要开正文采集。

改完彻底重启 Codex，再新开一局。测的时候连发两条短消息：Stop 钩子上传已完成的回合，最新那一回合要等下一次钩子才收口。Weave 里打开项目的 Agents 视图（按 Codex session id 合成一轮对话），或看 Traces 里的 span 树。根 span 是 \`invoke_agent codex\`。

交互 TUI 和 \`codex exec\` 官方都支持，但部分无头 / CI 环境 Stop 钩子根本不跑。这时不要干等钩子，扫 rollout：

\`\`\`bash
weave-codex collect --all
weave-codex run -- codex exec "fix the failing test"
\`\`\`

\`collect\` 按会话游标幂等，已经导出的回合会跳过。\`weave-codex run\` 会继承 stdio、用子进程退出码，报告打到 stderr，好让 \`codex exec --json\` 的 stdout 干净。\`codex mcp\` 和 \`app-server\` 官方写明不覆盖。子代理目前只看得到 \`spawn_agent\` 那次工具调用。打断或失败的回合 Stop 不跑，也就没有追踪。排错看 \`~/.weave-codex/logs/collector.log\`，或 \`weave-codex status --json\`（不含密钥，只报 \`apiKeyResolved\`）。

企业开了 \`allow_managed_hooks_only\`、本机 \`hooks.json\` 加不进去时，官方回退是 \`notify\` 调 \`~/.weave-codex/stop-hook.sh\`，不是再抄一份用户钩子。自建 / Dedicated Cloud 才设 \`WANDB_BASE_URL\`。卸装只删自己的钩子条目：

\`\`\`bash
weave-codex uninstall
\`\`\`

不要做这些：

- 不要发明 \`codex plugin marketplace add wandb/weave-codex\` 或 \`plugin add weave@openai-curated\`。
- 不要 \`codex mcp add weave\`，也不要 \`mcp login\`。
- 不要把 Python 的 \`weave.init()\` / \`weave.patch_openai()\` 当成 Codex CLI 安装器。
- 不要一上来 \`bypass_hook_trust = true\`。先走 \`/hooks\` 审查。
- 不要把 \`WANDB_API_KEY\` 写进仓库或 \`config.toml\`。
- 不要一上来 \`--yolo\`。
- 不要用 \`--ephemeral\` 还指望出追踪。

网页 Cloud 不读这份本机 \`hooks.json\`。改完用 \`weave-codex status\` 核对项目名和钩子状态。`,
    category: "hooks",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["hooks", "Weave", "W&B", "observability"],
    related: ["stop-hook-active", "managed-hooks-only", "hooks-one-representation"],
    sources: [
      {
        label: "W&B Weave · Codex plugin",
        url: "https://docs.wandb.ai/weave/guides/integrations/agents/codex-harness",
      },
      {
        label: "npm · weave-codex",
        url: "https://www.npmjs.com/package/weave-codex",
      },
      {
        label: "W&B Weave · Choose an agent integration",
        url: "https://docs.wandb.ai/weave/agent-integration-quickstart",
      },
    ],
  },
  {
    id: "arize-phoenix-codex-notify",
    no: 454,
    title:
      "Arize Phoenix 官方 Codex 追踪：clone 后 ./install.sh codex，走顶层 notify 不是 /hooks",
    summary:
      "向导选 Phoenix。凭证在 ~/.arize/harness/config.json。现行安装器只往 notify 数组追加二进制，不再写生命周期钩子。仓库 README 仍提 /hooks，以安装器为准。已有 notify 脚本时先备份 config.toml。",
    body: `Arize Phoenix 官方 Codex 追踪：clone 后 ./install.sh codex，走顶层 notify 不是 /hooks。这是把 Codex **自己的回合**打进 Phoenix（或 Arize AX），不是 marketplace 插件，也不是 MCP。官方 Phoenix 集成页写明走 Codex 的 \`notify\` 事件（\`agent-turn-complete\`），从 rollout 重建 OpenInference span。仓库 \`tracing/codex/README.md\` 仍写 \`/hooks\` 审 \`arize-hook-codex-*\`，那是旧布局；现行 \`install.py\` 的 \`_codex_toml_apply\` 只保证 notify 二进制出现一次，**不会**改你现有的 \`[[hooks.]]\`。以前留下的 \`arize-hook-codex-*\` 要卸装才会清。

更稳是 clone 再跑安装器（官方也给了 curl 管道，不是唯一路径）：

\`\`\`bash
git clone https://github.com/Arize-ai/coding-harness-tracing.git
cd coding-harness-tracing
./install.sh codex
\`\`\`

Windows 才 \`install.bat codex\`。向导里选 **Phoenix**，填 endpoint（自建默认 \`http://localhost:6006\`）和可选 API key，再填项目名。装完开**新 shell**。凭证在 \`~/.arize/harness/config.json\`。按类覆盖写 \`~/.codex/arize-env.sh\`（notify 进程会 source），环境变量赢过 json：

\`\`\`bash
export PHOENIX_ENDPOINT="http://localhost:6006"
export PHOENIX_API_KEY="..."
export PHOENIX_PROJECT="codex"
export ARIZE_TRACE_ENABLED="true"
\`\`\`

Phoenix 项目名用 \`PHOENIX_PROJECT\` 或 \`PHOENIX_PROJECT_NAME\`。\`ARIZE_PROJECT_NAME\` 只给 Arize AX，在 Phoenix 上会被忽略。\`ARIZE_TRACE_ENABLED\` 不论后端都保留 \`ARIZE_\` 前缀。密钥不要写进 \`config.toml\` 的 \`env\` 表。这台不是 MCP，**不要** \`codex mcp login\`。

\`notify\` 是用户层**一组命令 argv**，必须写在任何 \`[table]\` 之前，项目 \`.codex/config.toml\` 里的 \`notify\` 会被忽略。安装器若发现数组里还没有自己的二进制，就 **append**。你已经有 \`notify = ["python3", "/home/you/.codex/notify.py"]\` 时，再塞进 Arize 路径会变成三个参数，桌面提醒和追踪都会坏。先备份 \`~/.codex/config.toml\`。冲突时先卸装或自己做 fanout，不要当多条钩子叠。

默认会记 prompt、工具名/参数和工具输出。要脱敏才把对应旗标设成字符串 \`false\`：

\`\`\`bash
export ARIZE_LOG_PROMPTS="false"
export ARIZE_LOG_TOOL_DETAILS="false"
export ARIZE_LOG_TOOL_CONTENT="false"
\`\`\`

含密钥或客户数据的会话不要开正文采集。临时关掉：\`ARIZE_TRACE_ENABLED=false\` 后重启 Codex。测的时候跑一条短 \`codex exec\`，再看 Phoenix 里按 \`session.id\` 分组的回合，以及 \`~/.arize/harness/logs/codex.log\`。网页 Cloud 不跑这份本机 notify。

不要做这些：

- 不要把仓库 README 的 \`/hooks\` 审 \`arize-hook-codex-*\` 当成现行主路径。
- 不要发明 \`codex plugin marketplace add Arize-ai/coding-harness-tracing\`。
- 不要 \`codex mcp add phoenix\`，也不要 \`mcp login\`。
- 不要把 Python \`phoenix\` SDK 或 \`weave.init()\` 当成这台安装器。
- 不要一上来把 curl 管道当唯一路径，也不要 \`--yolo\`。
- 不要覆盖别人已经在用的 \`notify\` argv。

卸装：

\`\`\`bash
./install.sh uninstall codex
\`\`\`

改完用新 shell 跑一轮短任务，核对 Phoenix 出现 span，\`config.toml\` 顶层 \`notify\` 里有 Arize 二进制。`,
    category: "config",
    level: "starter",
    surfaces: ["cli"],
    tags: ["notify", "Phoenix", "Arize", "observability"],
    related: ["notify-external-command", "hooks-one-representation", "managed-hooks-only"],
    sources: [
      {
        label: "Arize Phoenix · Codex",
        url: "https://arize.com/docs/phoenix/integrations/coding-agents/codex",
      },
      {
        label: "Arize-ai/coding-harness-tracing",
        url: "https://github.com/Arize-ai/coding-harness-tracing",
      },
      {
        label: "tracing/codex/README.md",
        url: "https://github.com/Arize-ai/coding-harness-tracing/blob/main/tracing/codex/README.md",
      },
    ],
  },
  {
    id: "langsmith-codex-tracing-plugin",
    no: 455,
    title:
      "LangSmith 官方 Codex 追踪：marketplace add langchain-ai/langsmith-codex-plugins，再 plugin add tracing@langsmith-codex-plugins",
    summary:
      "清单名是 langsmith-codex-plugins。要 Codex 0.153.4+ 和同步 UserPromptSubmit。TRACE_TO_LANGSMITH 开追踪。密钥走 LANGSMITH_CODEX_API_KEY。文档里的 plugin_hooks 已删。钩子要在 /hooks 另信。不要走 Remote MCP。",
    body: `LangSmith 官方 Codex 追踪：marketplace add langchain-ai/langsmith-codex-plugins，再 plugin add tracing@langsmith-codex-plugins。这是把 Codex **自己的回合**打进 LangSmith，不是去查 LangChain 文档，也不是去改 LangSmith 项目数据。官方集成页和仓库 README 都写了 marketplace；集成页只写 \`enabled = true\`，清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`langsmith-codex-plugins\`，插件 name 是 \`tracing\`，所以现行 CLI 还要 \`plugin add\`。源是 \`./plugins/tracing\`。本机要 Node.js 22+。仓库要求 Codex **0.153.4** 以上，并且同步 \`UserPromptSubmit\` 钩子已启用且信任。

\`\`\`bash
codex plugin marketplace add langchain-ai/langsmith-codex-plugins
codex plugin add tracing@langsmith-codex-plugins
codex plugin list
\`\`\`

\`codex plugin list\` 应看到 \`tracing@langsmith-codex-plugins\` 为 installed, enabled。加完先看**当前会话**；当前会话 \`/plugins\` 没有再新开。IDE 扩展没有 \`/plugins\`，用 CLI 加。网页 Cloud 不读本机 marketplace。

钩子要单独打开并信任。现行键是 \`hooks\`，**不要**抄集成页仍写着的 \`plugin_hooks\`（这面旗已经从 Codex 删掉）：

\`\`\`toml
[features]
hooks = true

[plugins."tracing@langsmith-codex-plugins"]
enabled = true
\`\`\`

新开会话后若出现 Hooks need review，打开 \`/hooks\`，审过 LangSmith 的 **UserPromptSubmit**（以及配套 Stop）再信任。只开插件不够。Codex 按钩子哈希记信任；插件升级改了命令要再审一次。旧版只会 Stop 追踪，不够用。

追踪默认关。启动 Codex 的那个进程要看见 \`TRACE_TO_LANGSMITH=true\`（仓库解析还接受 \`1\` / \`yes\` / \`on\`，官方页示例用字符串 \`true\`），以及 \`LANGSMITH_CODEX_API_KEY\`（没有再退到 \`LANGSMITH_API_KEY\`）。可选 \`LANGSMITH_CODEX_PROJECT\`，默认项目名 \`codex\`；自建才设 \`LANGSMITH_CODEX_ENDPOINT\`。变量必须在启动 Codex 的 shell 里；Codex **不**读 \`.env\`。这台插件不是 MCP，**不要** \`codex mcp login\`，也不要把 \`lsv2_pt_…\` 写进 \`config.toml\` 的 \`env\` 表。

也可以写 json。查找顺序（仓库 README，比文档页完整）：环境变量 → 项目 \`.codex/langsmith.json\` → 项目根 \`langsmith-plugins.json\` → 用户 \`~/.codex/langsmith.json\` → 家目录 \`~/.langsmith-plugins.json\`。仓库根一份裸 \`langsmith.json\` **不会**被读。json 里有 api_key，**不要提交**。

会话里静音上传，提交**普通消息**，不要加斜杠：

\`\`\`text
langsmith-tracing:mute
\`\`\`

恢复用 \`langsmith-tracing:unmute\`。TUI 会把未知斜杠当命令拦掉，所以 \`/langsmith-tracing:mute\` 无效。默认全量上传；长期只要结构、不要正文，设 \`LANGSMITH_CODEX_DEFAULT_MUTED=true\`。默认会在上传前脱敏；关掉才 \`LANGSMITH_CODEX_REDACT=false\`。含密钥或客户数据的会话不要开全量追踪。

改完彻底重启 Codex，再新开一局。测一条短 \`codex exec\`，到 LangSmith 的 \`codex\` 项目看回合。升级用清单名：

\`\`\`bash
codex plugin marketplace upgrade langsmith-codex-plugins
codex plugin add tracing@langsmith-codex-plugins
\`\`\`

这**不是** \`langchain-ai/langchain-plugins\` 里的 \`langsmith-mcp\`。那台 Remote MCP 的 OAuth 和现行 Codex 不兼容，官方写明不要用。也不要手写 \`https://api.smith.langchain.com/mcp\`。

不要做这些：

- 不要抄集成页的 \`plugin_hooks = true\`。现行是 \`hooks = true\`。
- 不要发明 \`tracing@langsmith\` 或 \`langsmith@openai-curated\`。
- 不要用 \`npx skills add langchain-ai/langsmith-codex-plugins\` 当这台追踪插件的安装器。
- 不要 \`codex mcp add langsmith\`，也不要 \`mcp login\`。
- 不要把 API key 写进 \`config.toml\` 的 \`env\` 表。
- 不要一上来 \`--yolo\`。

网页 Cloud 不读这份插件。改完用 \`codex plugin list\` 和 \`codex features list\` 核对 \`hooks\`。`,
    category: "hooks",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "LangSmith", "hooks", "observability"],
    related: ["plugin-session-refresh", "managed-hooks-only", "hooks-one-representation"],
    sources: [
      {
        label: "LangSmith · Trace OpenAI Codex sessions",
        url: "https://docs.langchain.com/langsmith/trace-with-codex",
      },
      {
        label: "langchain-ai/langsmith-codex-plugins",
        url: "https://github.com/langchain-ai/langsmith-codex-plugins",
      },
      {
        label: "marketplace.json",
        url: "https://github.com/langchain-ai/langsmith-codex-plugins/blob/main/.agents/plugins/marketplace.json",
      },
    ],
  },
  {
    id: "logfire-exporter-codex-plugin",
    no: 456,
    title:
      "Logfire 官方 Codex 追踪：marketplace add pydantic/skills，再 plugin add logfire-exporter@pydantic-skills",
    summary:
      "清单名是 pydantic-skills。导出器走 Stop 钩子，不是 MCP。LOGFIRE_TOKEN 写 config.env。默认 CODEX_LOGFIRE_CONTENT_CAPTURE_MODE=full。查遥测才另装 logfire@pydantic-skills。不要抄 Claude 的 plugin install。",
    body: `Logfire 官方 Codex 追踪：marketplace add pydantic/skills，再 plugin add logfire-exporter@pydantic-skills。这是把 Codex **自己的回合**打进 Logfire，不是去查应用遥测，也不是 Codex 内置那套 OTEL 日志。官方导出器页和技能页都写了 marketplace；清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`pydantic-skills\`，展示名 Pydantic，插件 name 是 \`logfire-exporter\`，所以是 \`logfire-exporter@pydantic-skills\`。源是 \`./plugins/logfire-exporter\`。导出器只在 Codex 上有，Claude 那份 marketplace 没有这台。

官方 Codex 主路径（技能页带 \`--ref main\`）：

\`\`\`bash
codex plugin marketplace add pydantic/skills --ref main
codex plugin add logfire-exporter@pydantic-skills
codex plugin list
\`\`\`

\`codex plugin list\` 应看到 \`logfire-exporter@pydantic-skills\` 为 installed, enabled。加完先看**当前会话**；当前会话 \`/plugins\` 没有再新开。也可以在插件浏览器的 **Pydantic** 栏开 Logfire Exporter。IDE 扩展没有 \`/plugins\`，用 CLI 加。网页 Cloud 不读本机 marketplace。

钩子要单独打开并信任。现行键是 \`hooks\`，**不要**手写 \`plugin_hooks\`：

\`\`\`toml
[features]
hooks = true

[plugins."logfire-exporter@pydantic-skills"]
enabled = true
\`\`\`

新开会话后若出现 Hooks need review，打开 \`/hooks\`，审过 **SessionStart / UserPromptSubmit / PostToolUse / Stop** 再信任。只开插件不够。Codex 按钩子哈希记信任；插件升级改了命令要再审一次。导出发生在 **Stop**：回合没跑完、被打断没到 Stop，就不会出 span。没有长生命周期的 session 根 span。

写令牌不要进 \`config.toml\` 的 \`env\` 表。放到启动 Codex 的进程环境，或：

\`\`\`text
\${XDG_CONFIG_HOME:-~/.config}/logfire-exporter/config.env
\`\`\`

\`\`\`dotenv
LOGFIRE_TOKEN=pylf_...
LOGFIRE_BASE_URL=https://logfire-us.pydantic.dev
\`\`\`

仓库 README 默认 API 主机是 \`https://logfire-api.pydantic.dev\`；官方导出器示例写 \`logfire-us.pydantic.dev\`。欧盟换成 \`https://logfire-eu.pydantic.dev\`。旧名 \`LOGFIRE_URL\` 还能用，但 \`LOGFIRE_BASE_URL\` 优先。本机实例才 \`http://localhost:3000\`。默认请求头是 \`Authorization\` 加令牌本身，要 \`Bearer\` 才设 \`CODEX_LOGFIRE_AUTH_SCHEME=Bearer\`。这台不是 MCP，**不要** \`codex mcp login\`。

默认 \`CODEX_LOGFIRE_CONTENT_CAPTURE_MODE=full\`，会带脱敏后的 prompt、助手回复、工具入参/出参和工具错误。团队策略收紧时改 \`no_tool_content\` 或 \`metadata_only\`。含密钥或客户数据的会话不要开 \`full\`。POSIX 钩子要能找到 \`python3\`；pyenv 卡住才钉 \`CODEX_LOGFIRE_PYTHON\`。排错看 \`~/.local/state/logfire-exporter/logs/\`，TUI 日志搜 \`logfire-exporter\`。

查应用遥测、打开 Logfire UI 是另一台插件：

\`\`\`bash
codex plugin add logfire@pydantic-skills
\`\`\`

它会登记托管 MCP，默认美区。欧盟要先卸再换主机：

\`\`\`bash
codex mcp remove logfire
codex mcp add logfire --url https://logfire-eu.pydantic.dev/mcp
codex mcp login logfire
\`\`\`

不要把导出器和查询插件搞成一台。也不要把 \`npx skills add pydantic/skills\` 当这台导出器的安装器——那只拷 SKILL.md，不装 Stop 钩子。

不要做这些：

- 不要抄 Claude 的 \`claude plugin install logfire@claude-plugins-official\` 或 \`logfire@pydantic-skills\`。
- 不要发明 \`logfire-exporter@openai-curated\`。
- 不要 \`codex mcp add logfire-exporter\`，也不要对导出器 \`mcp login\`。
- 不要把写令牌写进 \`config.toml\` 的 \`env\` 表，也不要拼进 URL。
- 不要一上来 \`--yolo\`。

升级用清单名，再重新 \`plugin add\`：

\`\`\`bash
codex plugin marketplace upgrade pydantic-skills
codex plugin add logfire-exporter@pydantic-skills
\`\`\`

网页 Cloud 不读这份插件。改完彻底重启，跑完一轮短任务，到 Logfire 看 Stop 之后的 turn span。`,
    category: "hooks",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Logfire", "hooks", "observability"],
    related: ["plugin-session-refresh", "stop-hook-active", "managed-hooks-only"],
    sources: [
      {
        label: "Logfire · Export Codex Activity to Logfire",
        url: "https://pydantic.dev/docs/logfire/guides/codex-logfire-exporter/",
      },
      {
        label: "pydantic/skills",
        url: "https://github.com/pydantic/skills",
      },
      {
        label: "Logfire · Coding Agent Skills",
        url: "https://pydantic.dev/docs/logfire/guides/skills/",
      },
    ],
  },
  {
    id: "laminar-codex-plugin",
    no: 457,
    title:
      "Laminar 官方 Codex 追踪：marketplace add lmnr-ai/lmnr-codex-plugin，再 plugin add lmnr@lmnr",
    summary:
      "清单名是 lmnr。Stop 钩子读 rollout JSONL，不是 MCP。密钥写 ~/.config/lmnr/codex-plugin.json。LMNR_PROJECT_API_KEY 覆盖文件。CODEX_LMNR_MAX_CHARS 默认 20000。查轨迹才另配 laminar MCP。不要抄 Claude 的 plugin install。",
    body: `Laminar 官方 Codex 追踪：marketplace add lmnr-ai/lmnr-codex-plugin，再 plugin add lmnr@lmnr。这是把 Codex **自己的回合**打进 Laminar，不是去查应用轨迹，也不是 Claude Code 那份插件。官方 Codex 页和源仓 README 都写了 marketplace；清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`lmnr\`，展示名 Laminar，插件 name 是 \`lmnr\`，所以是 \`lmnr@lmnr\`。源是仓根 \`./\`，不是子目录。钩子在 \`.codex-plugin/plugin.json\` 里指向 \`./hooks.json\`：Stop 时跑 \`node "$PLUGIN_ROOT/dist/hook.cjs"\`。

官方安装器会登录、选项目、签发项目 API 密钥、写配置，再替你跑上面两条 \`plugin\` 命令：

\`\`\`bash
npx lmnr-cli@latest plugin add codex
\`\`\`

只要 CLI、自己配密钥时走原生路径：

\`\`\`bash
codex plugin marketplace add lmnr-ai/lmnr-codex-plugin
codex plugin add lmnr@lmnr
codex plugin list
\`\`\`

\`codex plugin list\` 应看到 \`lmnr@lmnr\` 为 installed, enabled。加完先看**当前会话**；当前会话 \`/plugins\` 没有再新开。也可以在插件浏览器的 **Laminar** 栏开 lmnr。IDE 扩展没有 \`/plugins\`，用 CLI 加。网页 Cloud 不读本机 marketplace。\`lmnr-cli setup\` 是给应用 SDK 写 \`.lmnr/project.json\` 和 \`.env\` 的，**不要**当成这份 Codex 插件安装器。

钩子要单独打开并信任。现行键是 \`hooks\`，**不要**手写 \`plugin_hooks\`：

\`\`\`toml
[features]
hooks = true

[plugins."lmnr@lmnr"]
enabled = true
\`\`\`

新开会话后若出现 Hooks need review，打开 \`/hooks\`，审过 **Stop** 再信任。只开插件不够。Codex 按钩子哈希记信任；插件升级改了命令要再审一次。导出发生在 **Stop**：回合没跑完、被打断没到 Stop，就不会出 span。钩子失败时 fail-open，不会卡住 Codex。

密钥不要写进 \`config.toml\` 的 \`env\` 表。放到：

\`\`\`text
~/.config/lmnr/codex-plugin.json
\`\`\`

\`\`\`json
{ "projectApiKey": "your-project-api-key", "baseUrl": "https://api.lmnr.ai" }
\`\`\`

自建实例把 \`baseUrl\` 换成 API 主机，例如 \`http://localhost:8000\`。环境变量 \`LMNR_PROJECT_API_KEY\` / \`LMNR_BASE_URL\`（或 \`CODEX_LMNR_*\` 那组同义名）覆盖文件，适合 CI。缺密钥时钩子静默退出。默认 \`CODEX_LMNR_MAX_CHARS=20000\`，过长字段会被截断。排错设 \`CODEX_LMNR_DEBUG=1\`，日志在 \`lmnr_hook.log\`。这台不是 MCP，**不要** \`codex mcp login\`。

查已有轨迹、用 SQL 问失败原因是另一台托管 MCP。官方 Codex 节只给 TOML，等价 CLI 是：

\`\`\`bash
codex mcp add laminar --url https://api.lmnr.ai/v1/mcp --bearer-token-env-var LMNR_PROJECT_API_KEY
\`\`\`

不要把追踪插件和这台查询 MCP 搞成一台。也不要把 \`npx skills add\` 当这份插件安装器——那只拷 SKILL.md，不装 Stop 钩子。

不要做这些：

- 不要抄 Claude 的 \`claude plugin install\`，也不要抄 Claude Code 页的 \`claude mcp add --transport http laminar\`。
- 不要发明 \`lmnr@openai-curated\`。
- 不要 \`codex mcp add lmnr\` 当追踪安装器，也不要对 Stop 钩子 \`mcp login\`。
- 不要把项目 API 密钥写进 \`http_headers\` 或 \`config.toml\` 的 \`env\` 表。
- 不要一上来 \`--yolo\`。

升级用清单名，再重新 \`plugin add\`：

\`\`\`bash
codex plugin marketplace upgrade lmnr
codex plugin add lmnr@lmnr
\`\`\`

网页 Cloud 不读这份插件。改完彻底重启，跑完一轮短任务，到 Laminar 看 Stop 之后的 turn span。`,
    category: "hooks",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Laminar", "hooks", "observability"],
    related: ["plugin-session-refresh", "stop-hook-active", "managed-hooks-only"],
    sources: [
      {
        label: "Laminar · Codex Plugin",
        url: "https://laminar.sh/docs/tracing/integrations/codex",
      },
      {
        label: "lmnr-ai/lmnr-codex-plugin",
        url: "https://github.com/lmnr-ai/lmnr-codex-plugin",
      },
      {
        label: "Laminar · MCP Server",
        url: "https://laminar.sh/docs/platform/mcp",
      },
    ],
  },
  {
    id: "knowledge-catalog-codex-plugin",
    no: 479,
    title:
      "Google Cloud Knowledge Catalog 官方 Codex 插件：marketplace 加 GoogleCloudPlatform/data-agent-kit，再 plugin add knowledge-catalog@data-agent-kit，不要写成 plugin install dataplex@",
    summary:
      "官方 Codex：marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add knowledge-catalog@data-agent-kit。清单名是 data-agent-kit。GCP Dataplex 文档写成 plugin install dataplex@，动词和插件名都错。MCP 表名 dataplex，stdio，不要 mcp login。",
    body: `Google Cloud Knowledge Catalog 官方 Codex 插件：marketplace 加 GoogleCloudPlatform/data-agent-kit，再 plugin add knowledge-catalog@data-agent-kit，不要写成 plugin install dataplex@。插件仓 README 给 Codex 单独一节，要求 CLI **0.117.0** 以上。这是 **Data Agent Kit** marketplace，不是 \`google/skills\` 里那份 Developer Knowledge MCP，也不是 Claude 的 \`/plugin install\`。官方 Codex 主路径：

\`\`\`bash
codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add knowledge-catalog@data-agent-kit
export DATAPLEX_PROJECT=YOUR_PROJECT_ID
gcloud auth application-default login
codex plugin list
codex mcp list
\`\`\`

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`data-agent-kit\`，展示名 Data Agent Kit。Knowledge Catalog 插件名是 \`knowledge-catalog\`，分类 Data Governance & Management，源仓是 \`gemini-cli-extensions/knowledge-catalog\`。同一份清单里还有 BigQuery、Spanner、AlloyDB 等，**不要**一次全装；这条只装目录插件。

[GCP Dataplex 文档](https://docs.cloud.google.com/dataplex/docs/pre-built-tools-with-mcp-toolbox) Codex 节写成 \`codex plugin install dataplex@data-agent-kit\`：CLI 动词是 \`add\` 不是 \`install\`，插件 id 是 \`knowledge-catalog\` 不是 \`dataplex\`。\`dataplex\` 是插件登记的 **MCP 表名**，不是 marketplace 插件名。以插件仓 README 为准。

先开目标项目的 **Dataplex API**。\`DATAPLEX_PROJECT\` 填 GCP **项目 ID**，不要填项目号。本机要有 Application Default Credentials：

\`\`\`bash
gcloud auth application-default login
\`\`\`

文档 IAM 写 Dataplex Catalog Viewer；插件 README 写 Dataplex Data Reader 加 Service Usage Consumer。按你实际要查的资产向管理员要角色，不要把 Owner 写进 AGENTS.md。

插件会登记 stdio MCP。表名官方就是 \`dataplex\`（小写按这份），命令是 \`npx -y @toolbox-sdk/server@1.9.0 --prebuilt dataplex --stdio\`，并转发 \`DATAPLEX_PROJECT\`。本机要有 **Node.js / npx**。这是本地 MCP Toolbox 预置服务，**不要** \`mcp login\`，也不要再 \`mcp add dataplex\` 叠一张。会话里 \`/mcp\` 或 \`codex mcp list\` 应看到 \`dataplex\`。插件已经登记时，不要手写 Cursor 那种 \`./PATH/TO/toolbox --prebuilt dataplex\` JSON，也不要把托管端 \`https://dataplex.googleapis.com/mcp\` 抄成这条主路径。

0.154 起先看**当前会话**；当前会话 \`/plugins\` 或 \`/mcp\` 没有再新开。桌面改 marketplace.json 仍要重启应用。IDE 扩展没有 \`/plugins\`。CLI 装好的插件，Codex 桌面也能用。网页 Cloud 不读本机 marketplace。改完用 \`codex plugin marketplace list\` 核对清单名是 \`data-agent-kit\`。升级用清单名，不是仓库路径：

\`\`\`bash
codex plugin marketplace upgrade data-agent-kit
\`\`\`

这份发行还是 Beta（pre-v1.0）：技能名、工具集和目录布局可能改。marketplace 条目可能钉旧 ref，升级后再 \`plugin add\`。不要 \`required = true\`。不要一上来 \`--yolo\`。保持工具批准。

不要做这些：

- 不要抄 GCP 文档的 \`codex plugin install dataplex@data-agent-kit\`。
- 不要发明 \`dataplex@data-agent-kit\` 或 \`knowledge-catalog@google-plugins\`。
- 不要抄 Claude 的 \`/plugin install knowledge-catalog@claude-plugins-official\`。
- 不要用 \`gemini extensions install https://github.com/gemini-cli-extensions/knowledge-catalog\` 当 Codex 安装器。
- 不要把 \`google/skills\` 的 \`google-cloud-developer@google-plugins\` 当成这份 Data Cloud 插件。
- 不要抄 Cursor / VS Code 的 \`mcpServers\` JSON 去跑本机 toolbox 二进制，当作 Codex 插件安装。
- 不要用 \`npx skills add\` 当这份插件安装器。

改完用 \`codex plugin list\` 核对 \`knowledge-catalog@data-agent-kit\`；用户层对照 \`codex mcp get dataplex\` 看传输是 stdio。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Google Cloud", "MCP", "Knowledge Catalog", "Dataplex"],
    related: ["google-cloud-developer-plugin", "plugin-session-refresh", "plugin-marketplace-ref-sparse"],
    sources: [
      {
        label: "gemini-cli-extensions/knowledge-catalog",
        url: "https://github.com/gemini-cli-extensions/knowledge-catalog",
      },
      {
        label: "GoogleCloudPlatform/data-agent-kit",
        url: "https://github.com/GoogleCloudPlatform/data-agent-kit",
      },
      {
        label: "Google Cloud · Use Knowledge Catalog with MCP",
        url: "https://docs.cloud.google.com/dataplex/docs/pre-built-tools-with-mcp-toolbox",
      },
    ],
  },
  {
    id: "dak-starter-codex-plugin",
    no: 480,
    title:
      "Google Cloud Data Agent Kit Starter Pack 官方 Codex 插件：marketplace 加 gemini-cli-extensions/data-agent-kit-starter-pack，再 plugin add dak@data-agent-kit-starter-pack-marketplace，不要加成 GoogleCloudPlatform/data-agent-kit",
    summary:
      "官方 Codex：marketplace add starter-pack 仓，再 plugin add dak@data-agent-kit-starter-pack-marketplace。清单名是 data-agent-kit-starter-pack-marketplace。这不是 GoogleCloudPlatform/data-agent-kit 那份产品索引。技能即装即用；MCP 还要改缓存里的 .mcp.json 再重启。",
    body: `Google Cloud Data Agent Kit Starter Pack 官方 Codex 插件：marketplace 加 gemini-cli-extensions/data-agent-kit-starter-pack，再 plugin add dak@data-agent-kit-starter-pack-marketplace，不要加成 GoogleCloudPlatform/data-agent-kit。插件仓 README 给 Codex 单独一节，推荐 marketplace，不是手拷 SKILL.md，也不是 Claude 的 \`/plugin install\`。官方 Codex 主路径：

\`\`\`bash
codex plugin marketplace add https://github.com/gemini-cli-extensions/data-agent-kit-starter-pack
codex plugin add dak@data-agent-kit-starter-pack-marketplace
gcloud auth login
gcloud auth application-default login
codex plugin list
codex mcp list
\`\`\`

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`data-agent-kit-starter-pack-marketplace\`，展示名 Data Agent Kit Starter Pack Marketplace。插件名是 \`dak\`，展示名 Data Agent Kit Starter Pack，分类 Productivity。GitHub 简写 \`gemini-cli-extensions/data-agent-kit-starter-pack\` 和上面那条 HTTPS URL 等价。

[GCP「Install the coding agent plugin」](https://docs.cloud.google.com/data-agent-kit/install-plugin) 只说「去 Starter Pack README」，不把命令贴进文档。产品索引仓 \`GoogleCloudPlatform/data-agent-kit\` 是另一份 marketplace，用来按产品装 Knowledge Catalog / BigQuery / Spanner；**不要**写成 \`dak@data-agent-kit\`，也不要和 \`google/skills\` 的 Developer 插件抄成同一个源。

技能装完就能用。MCP 不会凭空连上你的项目。官方要你改缓存里的 Codex 清单（版本目录会变，先 \`ls\` 再改，不要死抄 \`0.11.0\`）：

\`\`\`bash
ls ~/.codex/plugins/cache/data-agent-kit-starter-pack-marketplace/dak
\`\`\`

改 \`~/.codex/plugins/cache/data-agent-kit-starter-pack-marketplace/dak/VERSION/.mcp.json\` 里各台 MCP 需要的项目、区域等，然后**重启 Codex**。插件登记的是本机 \`node\` stdio 代理，表名包括 \`notebook\`、\`visualization\`、\`bigquery\`、\`spanner\`、\`alloydb-postgres\`、\`cloud-sql-postgresql\`、\`knowledge_catalog\`、\`dataproc\`、\`bigtable\`、\`cloud-storage\`。本机要有 **Node.js**。这些代理打的是 \`*.googleapis.com/mcp\`，**不要** \`mcp login\`，也不要再 \`mcp add bigquery\` 叠一套。\`dataproc\` 的 URL 带 \`GCP_REGION\`，没配就会连错区。会话里 \`/mcp\` 或 \`codex mcp list\` 核对表名。

0.154 起装插件后先看**当前会话**；当前会话 \`/plugins\` 没有再新开。改完 \`.mcp.json\` 仍按官方要求重启。桌面改 marketplace.json 也要重启应用。IDE 扩展没有 \`/plugins\`。网页 Cloud 不读本机 marketplace。升级用清单名：

\`\`\`bash
codex plugin marketplace upgrade data-agent-kit-starter-pack-marketplace
\`\`\`

插件带 PreToolUse 遥测钩子。装完在 TUI 开 \`/hooks\`，审查并信任当前定义，否则 Codex 会跳过。不想上报就：

\`\`\`bash
export DO_NOT_TRACK=1
\`\`\`

或写 \`~/.data_agent_kit/config.json\` 的 \`enableTelemetry: false\`。这份发行还是 Beta（pre-v1.0）。不要 \`required = true\`。不要一上来 \`--yolo\`。保持工具批准。

README 还有 Option 2：\`curl\` 管道脚本写进 \`~/.agents/plugins/\`，再 \`/plugins\` 按展示名 **Data Agent Kit Starter Pack** 安装。那条脚本登记的插件名是 \`data-agent-kit-starter-pack\`，**不是** \`dak\`，**不要发明** \`dak@personal\`。只要 Codex 时走上面两条 \`plugin\` 命令，不要把管道脚本当主路径。

不要做这些：

- 不要加成 \`GoogleCloudPlatform/data-agent-kit\` 再发明 \`dak@data-agent-kit\`。
- 不要抄 Claude 的 \`/plugin install data-agent-kit-starter-pack@claude-plugins-official\`。
- 不要用 \`gemini extensions install https://github.com/gemini-cli-extensions/data-agent-kit-starter-pack\` 当 Codex 安装器。
- 不要把 \`google-cloud-developer@google-plugins\` 当成这份 Data Cloud 技能包。
- 不要抄 Cursor / VS Code 的 \`mcpServers\` JSON 去跑本机 toolbox 二进制，当作这份插件安装。
- 不要用 \`npx skills add\` 当这份插件安装器。

改完用 \`codex plugin list\` 核对 \`dak@data-agent-kit-starter-pack-marketplace\`；用户层对照 \`codex mcp get bigquery\` 看传输是 stdio。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Google Cloud", "MCP", "Data Agent Kit", "Skills"],
    related: ["google-cloud-developer-plugin", "plugin-session-refresh", "plugin-marketplace-ref-sparse"],
    sources: [
      {
        label: "gemini-cli-extensions/data-agent-kit-starter-pack",
        url: "https://github.com/gemini-cli-extensions/data-agent-kit-starter-pack",
      },
      {
        label: "Google Cloud · Install the coding agent plugin",
        url: "https://docs.cloud.google.com/data-agent-kit/install-plugin",
      },
      {
        label: "Google Cloud · Data Agent Kit",
        url: "https://docs.cloud.google.com/data-agent-kit",
      },
    ],
  },
  {
    id: "looker-codex-plugin",
    no: 481,
    title:
      "Google Cloud Looker 官方 Codex 插件：marketplace 加 GoogleCloudPlatform/data-agent-kit，再 plugin add looker@data-agent-kit，密钥用 LOOKER_CLIENT_ID 不要抄 looker@claude-plugins-official",
    summary:
      "官方 Codex 专节：先 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add looker@data-agent-kit。stdio 表名 looker 和 looker-dev，走 npx @toolbox-sdk/server。密钥用 LOOKER_CLIENT_ID / LOOKER_CLIENT_SECRET。不要 mcp login，也不要抄 Claude 的 looker@claude-plugins-official。",
    body: `Google Cloud Looker 官方 Codex 插件：marketplace 加 GoogleCloudPlatform/data-agent-kit，再 plugin add looker@data-agent-kit，密钥用 LOOKER_CLIENT_ID 不要抄 looker@claude-plugins-official。

这是 [gemini-cli-extensions/looker](https://github.com/gemini-cli-extensions/looker) 的 Codex 专节，不是 Claude 的 \`/plugin install looker@claude-plugins-official\`，也不是 GCP 文档里给 Cursor 抄的 \`looker-toolbox\` JSON。插件把 MCP Toolbox 的预置 \`looker\` / \`looker-dev\` 打成 Agent Plugin，用 Looker API 客户端密钥连你的实例，去探数据、管仪表板、改 LookML。

要 Codex **v0.117.0+**，本机有 Node / npx。先准备 Looker 实例和 API 客户端：

\`\`\`bash
export LOOKER_BASE_URL=YOUR_LOOKER_BASE_URL
export LOOKER_CLIENT_ID=YOUR_LOOKER_CLIENT_ID
export LOOKER_CLIENT_SECRET=YOUR_LOOKER_CLIENT_SECRET
# 可选：LOOKER_VERIFY_SSL、LOOKER_SHOW_HIDDEN_MODELS、LOOKER_SHOW_HIDDEN_EXPLORES、LOOKER_SHOW_HIDDEN_FIELDS
\`\`\`

\`LOOKER_BASE_URL\` 是实例主机，不是 \`LOOKER_INSTANCE_URL/mcp\` 那条托管 MCP。密钥写进启动 Codex 的进程环境；插件 \`.mcp.json\` 用 \`env_vars\` 转发，不要把 Client Secret 写进 \`http_headers\`。

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`data-agent-kit\`，插件 name 是 \`looker\`：

\`\`\`bash
codex --version
codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add looker@data-agent-kit
codex plugin list
codex mcp list
\`\`\`

动词是 \`add\` 不是 \`install\`。不要写成 \`plugin install looker@\` 或 \`plugin add looker@claude-plugins-official\`。不要 \`gemini extensions install https://github.com/gemini-cli-extensions/looker\`。IDE 扩展没有 \`/plugins\`。

插件会登记两台 **stdio** MCP：\`looker\`（查数、看板）和 \`looker-dev\`（LookML 开发）。command 是 \`npx\`，args 钉 \`@toolbox-sdk/server@1.9.0 --prebuilt looker|looker-dev --stdio\`。**不要** \`codex mcp login looker\`。插件已经带 MCP 时，不要再 \`codex mcp add looker -- npx @toolbox-sdk/server\` 叠一张用户层表。

不要抄这些：

- Cursor / VS Code 的 \`mcpServers.looker-toolbox\`，\`command\` 写成 \`./PATH/TO/toolbox --prebuilt looker\`。
- Looker 托管 MCP：实例路径 \`YOUR_LOOKER_BASE_URL/mcp\` + OAuth。那是另一条预览通道，不是这份插件。
- Data Agent Kit Starter Pack 的 \`dak@data-agent-kit-starter-pack-marketplace\`，或 Knowledge Catalog 的 \`knowledge-catalog@data-agent-kit\`。同仓 marketplace 里插件 id 不同。

可选：\`codex plugin marketplace upgrade data-agent-kit\` 后再 \`plugin add\` 一次。0.154 起先看当前会话的 \`/plugins\` 和 \`/mcp\`；没有再新开。\`codex mcp list\` 里应有 \`looker\` 和 \`looker-dev\`。连接失败先看这三个环境变量是不是进了同一进程，以及 npx 能不能拉到 Toolbox。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "Looker", "MCP", "Google Cloud", "data-agent-kit"],
    related: ["google-cloud-developer-plugin", "plugin-session-refresh", "plugin-marketplace-ref-sparse"],
    sources: [
      {
        label: "gemini-cli-extensions/looker",
        url: "https://github.com/gemini-cli-extensions/looker",
      },
      {
        label: "GoogleCloudPlatform/data-agent-kit",
        url: "https://github.com/GoogleCloudPlatform/data-agent-kit",
      },
      {
        label: "Google Cloud · Use Looker with MCP",
        url: "https://docs.cloud.google.com/looker/docs/connect-ide-to-looker-using-mcp-toolbox",
      },
    ],
  },
  {
    id: "alloydb-codex-plugin",
    no: 482,
    title:
      "Google Cloud AlloyDB 官方 Codex 插件：marketplace 加 GoogleCloudPlatform/data-agent-kit，再 plugin add alloydb@data-agent-kit，项目用 ALLOYDB_POSTGRES_PROJECT 不要抄 alloydb@claude-plugins-official",
    summary:
      "官方 Codex 专节：先 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add alloydb@data-agent-kit。stdio 表名 alloydb-postgres，走 npx @toolbox-sdk/server。项目用 ALLOYDB_POSTGRES_PROJECT。ADC 用 gcloud，不要 mcp login，也不要抄 Claude 的 alloydb@claude-plugins-official。",
    body: `Google Cloud AlloyDB 官方 Codex 插件：marketplace 加 GoogleCloudPlatform/data-agent-kit，再 plugin add alloydb@data-agent-kit，项目用 ALLOYDB_POSTGRES_PROJECT 不要抄 alloydb@claude-plugins-official。

这是 [gemini-cli-extensions/alloydb](https://github.com/gemini-cli-extensions/alloydb) 的 Codex 专节，不是 Claude 的 \`/plugin install alloydb@claude-plugins-official\`，也不是 GCP 文档里给 Cursor 抄的 \`./PATH/TO/toolbox --prebuilt alloydb-postgres\`。插件把 MCP Toolbox 的预置 \`alloydb-postgres\` 打成 Agent Plugin，用 ADC 加实例坐标连 AlloyDB for PostgreSQL，去建集群、探 schema、跑 SQL。

要 Codex **v0.117.0+**，本机有 Node / npx。先开 AlloyDB API，IAM 至少 \`roles/alloydb.client\`（管资源再加 \`roles/alloydb.admin\`），再准备 ADC：

\`\`\`bash
gcloud auth application-default login
export ALLOYDB_POSTGRES_PROJECT=YOUR_ALLOYDB_POSTGRES_PROJECT
export ALLOYDB_POSTGRES_REGION=YOUR_ALLOYDB_POSTGRES_REGION
export ALLOYDB_POSTGRES_CLUSTER=YOUR_ALLOYDB_POSTGRES_CLUSTER
export ALLOYDB_POSTGRES_INSTANCE=YOUR_ALLOYDB_POSTGRES_INSTANCE
export ALLOYDB_POSTGRES_DATABASE=YOUR_ALLOYDB_POSTGRES_DATABASE
# 可选：ALLOYDB_POSTGRES_USER、ALLOYDB_POSTGRES_PASSWORD、ALLOYDB_POSTGRES_IP_TYPE（PUBLIC / PRIVATE / PSC，默认 PUBLIC）
\`\`\`

用户和密码可留空，默认走 IAM 数据库用户。私钥网必须把 Codex 跑在同一 VPC。不要把密码写进 \`http_headers\`。

清单 \`.agents/plugins/marketplace.json\` 的 name 是 \`data-agent-kit\`，插件 name 是 \`alloydb\`：

\`\`\`bash
codex --version
codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add alloydb@data-agent-kit
codex plugin list
codex mcp list
\`\`\`

动词是 \`add\` 不是 \`install\`。不要写成 \`plugin install alloydb@\` 或 \`plugin add alloydb@claude-plugins-official\`。不要 \`gemini extensions install https://github.com/gemini-cli-extensions/alloydb\`。IDE 扩展没有 \`/plugins\`。

插件会登记一台 **stdio** MCP，表名是 \`alloydb-postgres\`（不是 \`alloydb\`）。command 是 \`npx\`，args 钉 \`@toolbox-sdk/server@1.9.0 --prebuilt alloydb-postgres --stdio\`。**不要** \`codex mcp login alloydb-postgres\`。插件已经带 MCP 时，不要再 \`codex mcp add alloydb-postgres -- npx @toolbox-sdk/server\` 叠一张用户层表。

不要抄这些：

- Cursor / VS Code 的 \`mcpServers.alloydb\`，\`command\` 写成 \`./PATH/TO/toolbox --prebuilt alloydb-postgres\`。
- AlloyDB 远程 MCP：\`https://alloydb.YOUR_REGION.rep.googleapis.com/mcp\`。那是另一条托管入口，不是这份插件。
- \`alloydb-omni@data-agent-kit\`（AlloyDB Omni）、Starter Pack 的 \`dak@data-agent-kit-starter-pack-marketplace\`、Looker 的 \`looker@data-agent-kit\`、Knowledge Catalog 的 \`knowledge-catalog@data-agent-kit\`。同仓 marketplace 里插件 id 不同。

可选：\`codex plugin marketplace upgrade data-agent-kit\` 后再 \`plugin add\` 一次。0.154 起先看当前会话的 \`/plugins\` 和 \`/mcp\`；没有再新开。\`codex mcp list\` 里应有 \`alloydb-postgres\`。连接失败先看 ADC 和五个必填 \`ALLOYDB_POSTGRES_*\` 是不是进了同一进程，以及 npx 能不能拉到 Toolbox。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "AlloyDB", "MCP", "Google Cloud", "data-agent-kit"],
    related: ["google-cloud-developer-plugin", "plugin-session-refresh", "plugin-marketplace-ref-sparse"],
    sources: [
      {
        label: "gemini-cli-extensions/alloydb",
        url: "https://github.com/gemini-cli-extensions/alloydb",
      },
      {
        label: "GoogleCloudPlatform/data-agent-kit",
        url: "https://github.com/GoogleCloudPlatform/data-agent-kit",
      },
      {
        label: "Google Cloud · Use AlloyDB with MCP",
        url: "https://docs.cloud.google.com/alloydb/docs/connect-ide-using-mcp-toolbox",
      },
    ],
  }
];
