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
    related: ["skill-creator", "skill-locations", "unity-codex-plugin"],
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
codex mcp add --url https://mcp.example.com/sse
codex mcp login <server>
codex mcp list --json
codex mcp remove docs
\`\`\`

0.154 起 \`codex mcp-server\` 入口已经去掉。把 Codex 接到别的客户端，走 \`codex app-server\` 或官方 SDK，不要再抄旧的 stdio MCP 包装。

HTTP 服务器用 \`bearer_token_env_var\` 读环境变量，不要把 token 写进仓库里的 config。`,
    category: "mcp",
    level: "starter",
    surfaces: ["cli"],
    tags: ["codex mcp", "OAuth", "stdio"],
    related: ["mcp-http-auth-chatgpt", "mcp-oauth-resource", "mcp-oauth-scopes"],
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
      {
        label: "OpenAI · MCP",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
    ],
    related: ["mcp-add-and-login", "exec-mcp-optional-grace", "mcp-approval-and-output-limit"],
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
    related: ["mcp-add-and-login", "three-layer-config"],
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

\`writes\` 只对没标只读的工具提问；\`approve\` / \`prompt\` 更严；\`auto\` 几乎不问。\`disabled_tools\` 在白名单之后再生效。

维护 MCP 服务器时，初始化返回的 \`instructions\` 前 512 个字符要能独立看懂：跨工具约束、限流、什么时候不该调用。Codex 拿这段决定要不要用这个服务器。

插件自带的 MCP 不要在 \`[mcp_servers]\` 里改启动命令，开关和审批写在 \`[plugins.\"name@version\".mcp_servers.server]\`。\`codex exec\` 里键名少了 \`@marketplace\` 会静默 miss，表现为 \`user cancelled MCP tool call\`。

这和顶层 \`tool_output_token_limit\` 不是同一键：后者裁所有工具输出进会话历史的预算，不只针对某一个 MCP 工具。`,
    category: "mcp",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["MCP", "审批", "output_token_limit"],
    related: ["mcp-required-and-allowlist", "plugin-mcp-exec-key", "tool-output-token-limit"],
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
    related: ["mcp-add-and-login", "slack-at-codex-env", "gitlab-mr-codex-review"],
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
    related: ["mcp-http-auth-chatgpt", "mcp-oauth-resource", "mcp-oauth-scopes"],
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
    related: ["skill-creator", "skill-locations", "mcp-add-and-login"],
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

\`env_vars\` 里字符串和 \`source = "local"\` 读本机环境。\`source = "remote"\` 读远端执行器环境，而且**要求**这条 stdio 已经走 remote。

还没做的：

- Streamable HTTP 的远程放置（配了 \`url\` 再写 \`experimental_environment = "remote"\` 不会把 HTTP 服务器搬到远端）
- 把 \`http_headers_helper\` 用在远端连接上（官方只支持本机 HTTP MCP）

没有远端执行器时不要开。先确认 Remote / executor 会话能跑普通 shell，再让慢启动的 stdio 走 remote。本机调试继续默认 \`local\`。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["MCP", "stdio", "Remote"],
    related: ["mcp-add-and-login", "http-headers-helper", "mcp-oauth-loopback-callback"],
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
    related: ["mcp-oauth-loopback-callback", "mcp-stdio-remote-executor", "mcp-add-and-login"],
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
    related: ["plugin-marketplace-ref-sparse", "unity-codex-plugin", "plugin-session-refresh"],
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
    related: ["hooks-lifecycle", "plugin-portable-json", "plugin-session-refresh"],
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

带 MCP 时在**同一层**放 \`mcp.json\`，并声明 Agent Plugins schema 和每台服务器的 transport \`type\`：

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

\`$plugin-creator\` / \`@plugin-creator\` **仍脚手架兼容布局**：\`.codex-plugin/plugin.json\`、\`.mcp.json\`、\`.app.json\`。这套还支持，没有作废。不要只把 \`.mcp.json\` 改名为 \`mcp.json\`：可移植格式还要给每台服务器写 \`type\`（例如 \`streamable-http\`）。兼容布局里，根目录的 \`.mcp.json\` 只有清单把 \`mcpServers\` 指到 \`./.mcp.json\` 才会被导入，否则会被忽略。

OpenAI 专用展示、已注册 MCP 映射和钩子路径写在根清单的 \`extensions.com.openai\`。这个对象一旦出现，会**整份替换** \`.codex-plugin/plugin.json\` overlay，两套不合并。没有这个对象时，才回退读兼容 overlay。可移植包里，overlay 或 extension 里的 \`skills\` / \`mcpServers\` **改不了、关不掉、也加不了** 根目录已经发现的技能和 MCP。

加 Codex overlay 时，**只有** \`plugin.json\` 放进 \`.codex-plugin/\`。\`skills/\`、\`hooks/\`、\`assets/\`、\`.mcp.json\`、\`.app.json\` 留在插件根。路径一律相对插件根并以 \`./\` 开头。\`app.json\`（没有前导点）不是合法文件名。

公共目录投稿的 ZIP 检查更严：根上还要有 \`.codex-plugin/plugin.json\`、\`.agent-plugin/plugin.json\` 或 \`.claude-plugin/plugin.json\` 之一，只有根目录 \`plugin.json\` 会报 \`plugin_manifest_missing\`。本地 marketplace 测试用可移植根清单即可；要上公共目录，保留一份 overlay。密钥不要写进 \`mcp.json\`。

装进 marketplace 后，CLI 0.154 起先看当前会话的 \`/plugins\`。IDE 扩展没有插件目录。`,
    category: "skills",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "plugin.json", "mcp.json"],
    related: ["plugin-hook-plugin-root", "plugins-vs-skills", "marketplace-source-path-root"],
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
    body: `工作区管理员走 Admin > Plugins > Import marketplace 时，源填仓库 URL（不要带分支或文件夹），Path 填含 \`marketplace.json\` 的目录，不要填文件名。导入成功后，**任何**在 \`mcp.json\`、\`.mcp.json\` 或内联字段里声明了 MCP 的插件都会标成 Desktop only：只在 ChatGPT 桌面里能用，Codex CLI 和 IDE 扩展都跑不了。远程 HTTPS MCP 也一样，不是「只有本地 stdio 才被挡」。

这和本机 \`codex plugin marketplace add\` 不是一条路。本地 / 仓库 marketplace 装上的带 MCP 插件，CLI 仍按 \`[plugins."name@marketplace".mcp_servers.server]\` 管开关和审批。Admin 导入的副本走工作区策略，不读项目 \`.codex/config.toml\` 里的 \`enabled\`，也进不了 CLI 的插件目录。

需要 CLI 用同一份技能+MCP 时：

\`\`\`bash
codex plugin marketplace add owner/repo --ref main --sparse .agents/plugins --json
codex plugin add my-plugin@team-plugins
codex plugin list --json
\`\`\`

不要指望把 Admin 插件再写进项目 \`[plugins."name@marketplace"] enabled = true\` 来「解锁」CLI。那套键只对本地 marketplace 插件有效。

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
    related: ["plugin-repo-enabled", "plugin-portable-json", "plugin-mcp-exec-key"],
    sources: [
      {
        label: "OpenAI · Plugin management",
        url: "https://learn.chatgpt.com/docs/enterprise/plugin-management",
      },
    ],
  },
];
