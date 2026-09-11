import type { Tip } from "../types";

export const configTips: Tip[] = [
  {
    id: "split-config-and-instructions",
    no: 24,
    title: "约定写进 AGENTS.md，运行时放进 config.toml",
    summary: "测试命令、架构、禁止事项是指令；模型、沙箱、MCP、子代理是配置。混在一起会两边都难维护。",
    body: `快速判断：

- 「做完前必须跑这个命令」→ \`AGENTS.md\`
- 「工作区范围的文件系统权限」→ \`config.toml\`
- 「发版走这七步」→ Skill
- 「这次不要改 API」→ 当前提示

\`config.toml\` 是操作控制面：模型、推理、沙箱、批准、MCP、子代理、feature flags。它不替代 \`AGENTS.md\`。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["config.toml", "AGENTS.md", "职责"],
    featured: true,
    related: ["model-instructions-file", "developer-instructions-append", "keep-agents-md-short"],
    sources: [
      {
        label: "AgentsCamp · config.toml",
        url: "https://agentscamp.com/guides/configuration/codex-config-toml",
      },
    ],
  },
  {
    id: "three-layer-config",
    no: 25,
    title: "个人默认、项目覆盖、一次性 CLI",
    summary: "~/.codex/config.toml 放个人习惯，.codex/config.toml 放仓库行为，CLI 只覆盖这一次。",
    body: `推荐分工：

- **个人**：\`~/.codex/config.toml\`（模型、主题、个人 MCP、默认推理强度）
- **项目**：\`.codex/config.toml\`（仅受信任项目加载）
- **一次性**：\`codex -c key=value\` 或 \`--sandbox\` / \`--model\`

优先级从高到低：

1. CLI 与 \`--config\`
2. 从仓库根走向 cwd 的项目 \`.codex/config.toml\`（靠近的赢；只在受信任项目加载）
3. 选中的 profile 文件（\`~/.codex/<name>.config.toml\`）
4. 用户配置 \`~/.codex/config.toml\`
5. 登录后下发的云托管 \`config.toml\` 默认值
6. 系统 \`/etc/codex/config.toml\`（Windows 对应 \`%ProgramData%\\OpenAI\\Codex\\\`）
7. 内置默认

把目录标成未信任时，项目层的 \`.codex/\`（含 config、hooks、rules）整层跳过，用户和系统配置仍在。企业天花板另走 \`requirements.toml\`，不是这一条覆盖链。

CLI、IDE 扩展和桌面 App 共用这些层。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["优先级", "config.toml", "profile"],
    sources: [
      {
        label: "OpenAI · Config basics",
        url: "https://learn.chatgpt.com/docs/config-file/config-basic",
      },
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["profile-files-not-tables", "project-config-trust", "project-root-markers"],
  },
  {
    id: "profile-files-not-tables",
    no: 26,
    title: "Profile 是独立文件，不是 [profiles] 表",
    summary: "旧博客里的 [profiles.fast] 已经过时。现在是 ~/.codex/fast.config.toml，用 --profile fast 加载。",
    body: `正确写法：

\`\`\`toml
# ~/.codex/fast.config.toml
model = "gpt-5.6-luna"
model_reasoning_effort = "low"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
\`\`\`

\`\`\`toml
# ~/.codex/deep.config.toml
model = "gpt-5.6-sol"
model_reasoning_effort = "high"
plan_mode_reasoning_effort = "xhigh"
approval_policy = "on-request"
\`\`\`

启动：

\`\`\`bash
codex --profile fast
codex --profile deep-review
\`\`\`

Profile 文件只写与个人默认的差异。不要再把配置嵌进 \`[profiles.NAME]\`——新版本会拒绝并提示迁移。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["profile", "--profile", "过时博客"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://developers.openai.com/codex/config-advanced",
      },
    ],
  },
  {
    id: "project-config-cannot-override-auth",
    no: 27,
    title: "项目配置不能改供应商和鉴权",
    summary: "openai_base_url、model_provider、notify、profile、otel 等机器本地键在项目文件里会被忽略。",
    body: `项目 \`.codex/config.toml\` 被忽略的键包括：

- \`openai_base_url\` / \`chatgpt_base_url\`
- \`model_provider\` / \`model_providers\`
- \`notify\` / \`profile\` / \`profiles\`
- \`otel\` 与若干主机侧元数据

代理、鉴权、遥测放用户级配置。仓库里只放沙箱、MCP（非密钥）、子代理和功能开关。

这能防止恶意仓库把你的流量劫持到它的代理。`,
    category: "config",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["安全", "项目配置", "鉴权"],
    sources: [
      {
        label: "OpenAI · Config reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
    ],
    related: ["project-config-trust", "otel-user-config", "notify-external-command"],
  },
  {
    id: "project-config-trust",
    no: 28,
    title: "项目配置只在目录受信任时生效",
    summary: "没标信任，仓库里的 .codex/config.toml、hooks、rules 都不会进会话。这是特性。",
    body: `刚 clone 的仓库先人工看：

- \`.codex/config.toml\`
- \`.codex/hooks.json\`
- \`AGENTS.md\`

再信任。信任后项目层才会覆盖个人默认。

企业环境还可能有 \`requirements.toml\`，从上面限制你能选的模型、沙箱和功能。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["trust", "hooks", "安全"],
    sources: [
      {
        label: "OpenAI · Config reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
    ],
  },
  {
    id: "codex-home-profiles",
    no: 29,
    title: "用 CODEX_HOME 隔离整套环境",
    summary: "配置、指令、会话、鉴权都相对于 CODEX_HOME。CI、自动化用户、平行实验用它最干净。",
    body: `\`\`\`bash
CODEX_HOME=$(pwd)/.codex-ci codex exec "列出当前指令来源"
\`\`\`

适合：

- CI 跑完不留会话和密钥到默认 \`~/.codex\`
- 个人配置与「自动化机器人」配置隔离
- 对比两套 \`AGENTS.md\` 而不互相污染

改之前先 \`echo $CODEX_HOME\`。指错家目录是「我明明改了配置怎么没生效」的头号原因。`,
    category: "config",
    level: "advanced",
    surfaces: ["cli", "ci"],
    tags: ["CODEX_HOME", "CI", "隔离"],
    related: ["api-key-inline-env", "ephemeral-ci", "sqlite-home"],
    sources: [
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
  },
  {
    id: "web-search-modes",
    no: 30,
    title: "搜索默认 cached，需要实时再 live",
    summary: "日常用缓存搜索；文档刚变、CVE、版本发布用 --search 或 web_search = \"live\"。",
    body: `\`\`\`toml
web_search = "cached"   # 默认，走 OpenAI 维护的搜索缓存
# web_search = "indexed" # 只有索引放行时才出站
# web_search = "live"     # 等同 --search，拉最新网页
# web_search = "disabled"
\`\`\`

一次性：

\`\`\`bash
codex --search "核对官方文档里 sandbox 的当前默认值"
\`\`\`

\`--yolo\` 或满权限沙箱下，搜索会默认改成 live。不要为了省事全程 live——更慢、更贵，还更容易把过时博客和官方文档混在一起。需要事实时，在提示里要求引用官方 URL。

\`[features]\` 里的 \`web_search\` / \`web_search_cached\` / \`web_search_request\` 已弃用，改用这个顶层键。要限制搜哪些域名或搜索上下文大小，用 \`[tools.web_search]\` 对象，不要和这个模式键抄成一个。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["web_search", "--search", "文档"],
    related: ["tools-web-search-object", "network-proxy-not-apps", "permissions-not-sandbox-mode"],
    sources: [
      {
        label: "OpenAI · Config basics",
        url: "https://learn.chatgpt.com/docs/config-file/config-basic",
      },
    ],
  },
  {
    id: "file-opener-and-personality",
    no: 31,
    title: "file_opener 和 personality 是被低估的键",
    summary: "把打开文件的编辑器设成你真正在用的那个；用 personality 收敛沟通风格。",
    body: `\`\`\`toml
file_opener = "cursor"   # vscode | cursor | windsurf | vscode-insiders | none
personality = "pragmatic" # none | friendly | pragmatic
\`\`\`

会话中可用 \`/personality\`。偏工程日志时用 \`pragmatic\`，少客套、多结论。

\`file_opener\` 决定 TUI 里打开路径时跳到哪。设错会启动你不用的编辑器。桌面应用的「Open in」另走 \`desktop.custom_file_handlers\`，不要把两个键混成一个。`,
    category: "config",
    level: "starter",
    surfaces: ["cli"],
    tags: ["file_opener", "personality", "TUI"],
    related: ["desktop-custom-file-handlers", "tui-keymap-unbind"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "two-knobs",
    no: 32,
    title: "权限是两个旋钮，不是一个开关",
    summary: "approval 管「问不问你」，sandbox 管「文件系统能走多远」。新手先用默认，可信仓库再放松。",
    body: `推荐起步：

\`\`\`bash
codex --sandbox workspace-write --ask-for-approval on-request
\`\`\`

| 沙箱 | 含义 |
| --- | --- |
| \`read-only\` | 只读，改文件或跑命令通常要批准 |
| \`workspace-write\` | 可改工作区和 \`--add-dir\` 根 |
| \`danger-full-access\` | 无文件系统沙箱，只在隔离环境用 |

| 批准 | 含义 |
| --- | --- |
| \`on-request\` | Codex 请求提权时询问 |
| \`never\` | 不问；适合沙箱已收紧的非交互跑法 |

v0.149 起 \`untrusted\` 批准策略已退役，配置里若还在用，迁到 \`on-request\`。

从 CLI、\`/permissions\`、named permission profiles 都能改，但不要一上来 \`--yolo\`。`,
    category: "sandbox",
    level: "starter",
    surfaces: ["cli"],
    tags: ["sandbox", "approval", "安全"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["protected-dirs", "yolo-isolated-only", "approve-one-retry"],
  },
  {
    id: "protected-dirs",
    no: 33,
    title: "workspace-write 仍保护 .git / .codex / .agents",
    summary: "这三处在工作区可写模式下仍只读。需要写它们时用 --add-dir 或 named permission profile，而不是直接满权限。",
    body: `这是防自我破坏：agent 不应重写自己的规则、钩子或 Git 元数据，除非你明确允许。

需要让它改 skill 或 hooks 时：

\`\`\`bash
codex --add-dir .agents --add-dir .codex
\`\`\`

或定义更窄的 permission profile，而不是 \`danger-full-access\`。`,
    category: "sandbox",
    level: "intermediate",
    surfaces: ["cli"],
    tags: [".git", "sandbox", "--add-dir"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "add-dir-extra-roots",
    no: 34,
    title: "用 --add-dir 挂额外可写根",
    summary: "文档、共享设计系统、邻接仓库，用可重复的 --add-dir 挂进去，比放开整台机器安全。",
    body: `\`\`\`bash
codex --add-dir ../design-system --add-dir ../docs-site \\
  "按设计系统更新这个页面，文档仓库的改动一并提交说明。"
\`\`\`

额外根仍然受 sandbox 约束。不要把家目录当 extra root。`,
    category: "sandbox",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["--add-dir", "多仓库", "沙箱"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "yolo-isolated-only",
    no: 35,
    title: "--yolo 只属于隔离环境",
    summary: "--yolo 等于绕过批准和沙箱。本机日常开发不要用；留给容器、Cloud 任务或你已经硬化过的 runner。",
    body: `\`--yolo\` 是 \`--dangerously-bypass-approvals-and-sandbox\` 的别名。

可以考虑的场景：

- 一次性的隔离 Cloud 任务
- 没有密钥、没有生产凭据的容器
- 你自己做的、文件系统已只读挂载密钥的 runner

不要：

- 在装着 SSH 钥和浏览器 cookie 的笔记本上用
- 对刚 clone、还没读 \`AGENTS.md\` 的仓库用
- 为了「少点几次确认」当成默认 profile

把「少打断」交给收紧的 sandbox + \`approval_policy = "never"\`，而不是关掉整个安全层。`,
    category: "sandbox",
    level: "advanced",
    surfaces: ["cli", "ci", "cloud"],
    tags: ["--yolo", "安全", "隔离"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://developers.openai.com/codex/cli",
      },
    ],
    related: ["two-knobs", "github-action-no-job-key"],
  },
  {
    id: "granular-approval",
    no: 36,
    title: "用 granular approval 放行类别而不是一切",
    summary: "可以对沙箱、规则、MCP elicitation、权限请求、skill 脚本分别允许或拒绝，其余保持交互。",
    body: `\`\`\`toml
approval_policy = { granular = {
  sandbox_approval = true,
  rules = true,
  mcp_elicitations = true,
  request_permissions = true,
  skill_approval = true
} }
\`\`\`

需要全自动、但仍想对 MCP 鉴权弹窗说「必须问我」时，用 granular，而不是 \`never\` 或 \`yolo\`。`,
    category: "sandbox",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["approval", "granular", "MCP"],
    sources: [
      {
        label: "OpenAI · Config reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
    ],
  },
  {
    id: "resume-restores-permissions",
    no: 37,
    title: "恢复和 fork 会带回权限档",
    summary: "v0.149 起，resume/fork 的线程会恢复当时的 permission profile，而不是悄悄掉回默认。",
    body: `这是好事：你为一次敏感任务收紧的权限，第二天 \`codex resume --last\` 还在。

但也意味着：

- 不要假设 fork 出来的会话是「干净默认权限」
- 开新方向时用 \`/permissions\` 看一眼当前档
- \`/status\` 能确认工作区和会话状态

权限收紧过的会话被 fork 去干另一件事，可能会莫名其妙跑不动——先查权限档。`,
    category: "sandbox",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["/resume", "/fork", "permissions"],
    sources: [
      {
        label: "Blake Crosley · Codex CLI Guide",
        url: "https://blakecrosley.com/guides/codex",
      },
    ],
  },
  {
    id: "codexignore-generated",
    no: 91,
    title: "用 .codexignore 把生成物踢出上下文",
    summary: "node_modules、dist、生成代码会占掉推理额度。给仓库加一份 gitignore 风格的排除表。",
    body: `在仓库根放 \`.codexignore\`，写法与 gitignore 相同。先排除 \`vendor/\`、\`dist/\`、\`node_modules/\`、\`*.min.js\`、\`*.generated.ts\` 这类大而无关的树。

这和沙箱不是一回事：ignore 管「看见什么」，sandbox / approval 管「能改什么」。两边都要设。

非 Git 项目或嵌套根目录时，同时检查 \`project_root_markers\`。根认错了，\`AGENTS.md\`、\`.codex/config.toml\` 和 workspace 边界都会一起错。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli", "ide", "app"],
    tags: [".codexignore", "上下文", "配置"],
    related: ["project-root-markers", "project-doc-max-bytes", "keep-agents-md-short"],
    sources: [
      {
        label: "Codex CLI Power-User Playbook",
        url: "https://codex.danielvaughan.com/2026/06/04/codex-cli-power-user-playbook-non-obvious-features-configuration-tricks-v0137/",
      },
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "permissions-not-sandbox-mode",
    no: 99,
    title: "权限档和旧 sandbox_mode 不要混用",
    summary: "default_permissions 与 sandbox_mode 不叠加。任意一层写了 sandbox_mode 或传了 --sandbox，就会走旧沙箱，权限档等于没配。",
    body: `权限档还是 beta。官方内置三档：\`:read-only\`、\`:workspace\`、\`:danger-full-access\`。自定义档写在 \`[permissions.<name>]\`，再用顶层 \`default_permissions\` 选中。

两边只能留一套：

- 继续用旧旋钮：\`sandbox_mode\` / \`sandbox_workspace_write\`
- 改用权限档：\`default_permissions\` + \`[permissions.*]\`

任意已加载的 config、选中的 profile，或 CLI 的 \`--sandbox\` 出现 \`sandbox_mode\`，Codex 就走旧路径。企业若下发了 \`allowed_permission_profiles\`，先删掉旧键，否则用户会以为新档生效。

网络规则还要另开代理，否则域名表是摆设：

\`\`\`toml
default_permissions = "project-edit"

[features]
network_proxy = true

[permissions.project-edit]
extends = ":workspace"

[permissions.project-edit.filesystem.":workspace_roots"]
"." = "write"
"**/*.env" = "deny"

[permissions.project-edit.network]
enabled = true

[permissions.project-edit.network.domains]
"api.openai.com" = "allow"
\`\`\`

\`network.enabled = true\` 只允许命令出网，并不启动代理。更窄的 \`deny\` 会压过同样路径上的 \`write\` / \`read\`。不要从 \`:danger-full-access\` 做 \`extends\`。

一旦写了 \`default_permissions\`，旧的 \`[sandbox_workspace_write] network_access = true\` 会被静默丢掉，会话仍可能断网。把网络写进当前权限档的 \`[permissions.<name>.network] enabled = true\`，不要指望两套键一起生效。

Windows 上对 env 文件那种无界 glob 会在启动前展开成具体路径。Chrome 配置目录那种递归匹配能让会话直接起不来。目录级拒绝写精确路径，不要再加递归 glob。`,
    category: "sandbox",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["permissions", "sandbox_mode", "config.toml"],
    related: ["two-knobs", "permission-profile-agents-read", "windows-deny-read-glob"],
    sources: [
      {
        label: "OpenAI · Permissions",
        url: "https://learn.chatgpt.com/docs/permissions",
      },
      {
        label: "OpenAI · Config basics",
        url: "https://learn.chatgpt.com/docs/config-file/config-basic",
      },
    ],
  },
  {
    id: "windows-elevated-sandbox",
    no: 100,
    title: "Windows 原生沙箱先 elevated，读目录用斜杠命令补",
    summary: "原生 Windows 不必先上 WSL。elevated 是正选；没管理员权限再退 unelevated。沙箱读不到的目录用 /sandbox-add-read-dir。",
    body: `桌面应用、CLI、IDE 扩展都能在 Windows 上跑原生沙箱，不必先开虚拟机。

\`\`\`toml
[windows]
sandbox = "elevated"    # 推荐：独立低权限用户 + 防火墙
# sandbox = "unelevated"  # 管理员批准被拦时的退路
\`\`\`

\`elevated\` 会建沙箱用户、文件系统边界和防火墙规则。\`unelevated\` 只用当前用户的受限 token，网络隔离更弱。企业可用 \`requirements.toml\` 的 \`allowed_sandbox_implementations\` 禁止退回 unelevated。

沙箱里读不到某个目录时，路径必须是已存在的绝对路径：

\`\`\`text
/sandbox-add-read-dir C:\\absolute\\directory\\path
\`\`\`

只对当前会话有效。报错 1385 通常是沙箱用户没有所需登录权限，把 \`CODEX_HOME/.sandbox/sandbox.log\` 交给 IT，不要把 \`.sandbox-secrets/\` 发出去。

\`setup refresh\` / \`SetNamedSecurityInfoW failed: 5\` 时，先看 \`.git\`、\`.codex\`、\`.agents\` 的所有者是不是变成了 \`CodexSandboxOffline\`。关掉所有 \`ChatGPT.exe\` 后，用管理员 PowerShell 把所有权改回自己的账户，再重开。这是 ACL 残留，不是 Git 坏了。

Windows 11 是推荐基线；Windows 10 要 1809 以上且有 ConPTY。需要 Linux 工具链再回 WSL。沙箱弹出的窗口看不见，先查 \`windows.sandbox_private_desktop\`，不要改成 unelevated。`,
    category: "sandbox",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["Windows", "sandbox", "elevated"],
    related: ["windows-sandbox-private-desktop", "two-knobs", "permissions-not-sandbox-mode"],
    sources: [
      {
        label: "OpenAI · Windows sandbox",
        url: "https://learn.chatgpt.com/docs/windows/windows-sandbox",
      },
      {
        label: "OpenAI Community · helper_unknown_error",
        url: "https://community.openai.com/t/codex-desktop-windows-fix-for-helper-unknown-error-setup-refresh-had-errors/1392808",
      },
    ],
  },
  {
    id: "context-window-verify-status",
    no: 101,
    title: "1M 窗口先 /status 核对，不要当日常默认",
    summary: "model_context_window 必须写在所有 [section] 之前。订阅账号常被服务端目录夹回约 272K。先看 /status，再决定要不要开大。",
    body: `想试更大窗口时，把键写在 \`~/.codex/config.toml\` 最顶部，任何 \`[section]\` 之前：

\`\`\`toml
model = "gpt-5.6-sol"
model_context_window = 1000000
model_auto_compact_token_limit = 900000
\`\`\`

写进 \`[tui]\` 或 profile 表里会静默变成节内字段。单次试用不要改全局默认：

\`\`\`bash
codex -m gpt-5.6-sol \\
  -c model_context_window=1000000 \\
  -c model_auto_compact_token_limit=900000
\`\`\`

日常任务用独立 profile，例如 \`~/.codex/large-context.config.toml\` 再 \`codex --profile large-context\`。开大窗口会抬高每轮输入 token，检索精度也可能下降，不适合当个人默认。

改完必须新开会话，然后用 \`/status\` 看生效的 \`model_context_window\`。若仍是约 \`272000\`（有效约 258K），说明服务端模型目录把本地覆盖夹回去了，再改本地键没有意义。更稳的止血是：

\`\`\`toml
model_auto_compact_token_limit = 200000
model_auto_compact_token_limit_scope = "body_after_prefix"
tool_output_token_limit = 8000

[tui]
auto_recap = false
\`\`\`

顶层 \`tool_output_token_limit\` 管每次工具输出进历史的预算，和 MCP 单工具的 \`output_token_limit\` 不是同一键。

长任务在自然断点 \`/compact\`，结束就 \`/new\`。\`features.context_management.experimental_mode\` 仍是实验开关，不要写进团队默认。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["上下文", "model_context_window", "/status"],
    related: ["tui-auto-recap", "compact-prompt-local-only", "tool-output-token-limit"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "七牛云 · 258K 窗口实战",
        url: "https://news.qiniu.com/archives/1788489040529",
      },
    ],
  },
  {
    id: "log-dir-enables-tui-log",
    no: 104,
    title: "显式设置 log_dir 才会写出明文 TUI 日志",
    summary: "默认日志在 $CODEX_HOME/log。只有你指定 log_dir 时，才会额外打开 opt-in 的明文 codex-tui.log。",
    body: `排指令链、MCP 启动失败、钩子没跑时，先把日志目录定下来：

\`\`\`toml
log_dir = "/absolute/path/to/codex-logs"
\`\`\`

一次性：

\`\`\`bash
codex -c log_dir=./.codex-log
\`\`\`

设了这个键之后，目录里会出现明文 \`codex-tui.log\`。默认位置不会自动打开这份明文文件，所以只开 \`codex doctor\` 往往看不到完整 TUI 记录。

日志会含提示和工具输出，不要把 \`log_dir\` 指到会进 Git 的目录，也不要贴进工单。看完就把一次性目录删掉。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["log_dir", "排错", "TUI"],
    related: ["audit-instruction-chain", "codex-doctor", "login-diagnostics-log"],
    sources: [
      {
        label: "OpenAI · Config basics",
        url: "https://learn.chatgpt.com/docs/config-file/config-basic",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
    ],
  },
  {
    id: "network-proxy-not-apps",
    no: 109,
    title: "network_proxy 管沙箱命令，不管 Apps 和 MCP",
    summary: "权限档的域名表只在代理跑起来后约束本地命令。网页搜索、连接器和 MCP 走自己的通道，不会被这份白名单拦住。",
    body: `权限档里写 \`network.enabled = true\` 只表示命令可以出网，并不启动代理。要强制域名规则：

\`\`\`toml
[features]
network_proxy = true
\`\`\`

或在 TUI 里 \`/experimental\` 打开 Network proxy，按提示重启。

代理生效后，才看 \`[permissions.<name>.network.domains]\`。没有 \`allow\` 条目时，代理会拦域名请求；\`deny\` 压过 \`allow\`。

它不管这些：

- 顶层 \`web_search\`（cached / indexed / live）
- \`/apps\` 连接器
- MCP 服务器自己的 HTTP / OAuth

不要把 \`network_proxy\` 当成「Codex 所有出站」的总闸。连接器权限在各自的服务登录里审，本机默认档写 \`[apps._default]\`；MCP 用 \`default_tools_approval_mode\` 和工具白名单。`,
    category: "sandbox",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["network_proxy", "MCP", "安全"],
    related: ["apps-default-policy", "apps-not-plugins", "mcp-approval-and-output-limit"],
    sources: [
      {
        label: "OpenAI · Permissions",
        url: "https://learn.chatgpt.com/docs/permissions",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "desktop-custom-file-handlers",
    no: 115,
    title: "桌面 Open in 用 desktop.custom_file_handlers，不要写进项目配置",
    summary: "只认用户级 ~/.codex/config.toml。给 VSCodium、TextEdit 或内部编辑器加目标后，必须重启 ChatGPT 桌面应用。CLI 的 file_opener 管的是另一套。",
    body: `项目 \`.codex/config.toml\` 里写这个键会被忽略。handler ID 是表头最后一段：1–64 字符，以字母或数字开头；含句点时要加引号，否则 TOML 会当成嵌套表。界面里会变成 \`custom:id\`。

\`\`\`toml
[desktop.custom_file_handlers.vscodium]
label = "VSCodium"
icon = "/Users/you/.codex/icons/vscodium.png"
command = "codium"

[desktop.custom_file_handlers.textedit]
label = "TextEdit"
icon = "/Users/you/.codex/icons/textedit.png"
command = "/usr/bin/open"
args = ["-a", "TextEdit"]
\`\`\`

\`label\` / \`icon\` / \`command\` 必填。\`command\` 必须是绝对路径，或能在桌面应用的 PATH 里找到。\`input\` 默认 \`path\`；需要行号用 \`json_argument\`；SSH 工作区用 \`supports_ssh = true\` 且 \`input = "json_stdin"\`。改完重启桌面应用。设成首选编辑器后，会按项目记住，和内置编辑器一样。`,
    category: "config",
    level: "intermediate",
    surfaces: ["app"],
    tags: ["desktop", "config.toml", "编辑器"],
    related: ["file-opener-and-personality", "project-config-cannot-override-auth"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
    ],
  },
  {
    id: "tui-notifications-filter",
    no: 118,
    title: "通知有三路：TUI 事件、notify 命令、钩子，关掉要关干净",
    summary: "tui.notifications 可以是布尔或事件数组。顶层 notify 会另起一条外部命令。WSL 上关了 TUI 仍可能弹出 PowerShell Toast。",
    body: `\`\`\`toml
[tui]
notifications = ["agent-turn-complete", "approval-requested"]
notification_condition = "unfocused"   # 或 always
notification_method = "auto"           # auto | osc9 | bel
\`\`\`

\`true\` 全开，\`false\` 关掉 TUI 通知。数组按事件过滤，官方样例还有 \`plan-mode-prompt\`。默认只在终端失焦时响。tmux 里 \`osc9\` 或 \`bel\` 比桌面弹窗稳。

另一条通道是顶层 \`notify\`：Codex 把 JSON 交给外部命令，和 \`tui.notifications\` 不是同一个开关。Stop 钩子里的 \`notify-send\` 也独立。企业环境要把三条都关掉：\`tui.notifications = false\`、不要设 \`notify\`、不要留会弹系统通知的 Stop 钩子。

WSL 里 TUI 通知可能走 \`powershell.exe -EncodedCommand\` 做 Windows Toast，会触发 EDR。只关 \`tui.notifications\` 不够时，再查用户/项目 config 和钩子。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["notifications", "TUI", "notify"],
    related: ["notify-external-command", "tui-animations-off", "prevent-idle-sleep"],
    sources: [
      {
        label: "OpenAI · Config reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "OpenAI Community · WSL EDR toasts",
        url: "https://community.openai.com/t/codex-cli-on-windows-wsl-triggers-edr-alert-due-to-powershell-encodedcommand-toast-notifications/1375803",
      },
    ],
  },
  {
    id: "ide-chatgpt-settings",
    no: 120,
    title: "IDE 的 chatgpt.* 不要写进 config.toml",
    summary: "队列还是转向、审查内联还是另开聊天、要不要走 WSL，都在编辑器设置里。agent 模型/沙箱/MCP 才进 ~/.codex。",
    body: `在 VS Code 里搜 \`@ext:openai.chatgpt\`。这些键属于扩展，不属于 \`config.toml\`：

| 键 | 作用 |
| --- | --- |
| \`chatgpt.followUpQueueMode\` | \`queue\` 等下一轮；\`steer\` 注入当前轮。旧值 \`interrupt\` 当 \`steer\`。一次反过来：Cmd/Ctrl+Shift+Enter |
| \`chatgpt.reviewDelivery\` | \`inline\` 尽量在当前聊天跑 \`/review\`；\`detached\` 另开审查聊天 |
| \`chatgpt.composerEnterBehavior\` | Enter 发送，或必须 Cmd/Ctrl+Enter |
| \`chatgpt.runCodexInWindowsSubsystemForLinux\` | 仓库在 WSL2 时打开；改完会重载窗口 |
| \`chatgpt.commentCodeLensEnabled\` | TODO 上方的 CodeLens |

桌面应用和 IDE 对着同一项目时会共享活动聊天和编辑器上下文。合成器里的 IDE context 可关，避免把当前打开的文件塞进桌面提示。

\`chatgpt.cliExecutable\` 只给开发 CLI 用，乱改会让扩展的一部分失灵。字体用 VS Code 自带的 \`chat.fontSize\` / \`chat.editor.fontSize\`。`,
    category: "config",
    level: "intermediate",
    surfaces: ["ide", "app"],
    tags: ["IDE", "chatgpt.*", "WSL"],
    related: ["review-command", "queue-and-inject", "ide-once-vs-ide-context", "wsl-linux-home-not-mntc", "ide-open-codex-sidebar"],
    sources: [
      {
        label: "OpenAI · Developer settings",
        url: "https://learn.chatgpt.com/docs/developer-settings",
      },
    ],
  },
  {
    id: "computer-use-windows-allowlist",
    no: 139,
    title: "Computer Use 先装插件，Windows 白名单写 config.toml",
    summary: "桌面 Work/Codex 里装 Computer Use 插件。提示用 @Computer 或 @AppName。Windows 前台独占；macOS 才能后台和 Locked use。",
    body: `桌面应用切到 Work 或 Codex → Plugins > Computer Use → 打开 server 和 skill。macOS 还要给 Screen Recording 和 Accessibility。

提示里点名界面：

\`\`\`text
Open @Chrome and verify the checkout page still works after the latest changes.
\`\`\`

有专用 MCP / 插件就别用 Computer Use 去扒数据。Windows 会占当前桌面的鼠标键盘；要边走开边跑，用手机 remote-control，或把桌面应用丢进虚拟机。

Windows 免询问名单写在 \`config.toml\`，不是旧的 \`computer-use/config.toml\`：

\`\`\`toml
[computer_use.windows]
always_allowed_app_ids = ["mspaint.exe"]
\`\`\`

用 Computer Use 报给你的可执行文件名或 AppUserModelID。Always allow 只给信任的应用。企业可用 \`[features].computer_use = false\` 关掉。它不能操作终端或 ChatGPT 自己，也不能点系统的管理员/隐私授权框。

Windows 上 \`list_windows\` 返回空、EnumWindows 报 \`0x80070003\` 时，先查 \`windows.sandbox_private_desktop\`。默认专用桌面里没有你正在用的窗口。改 \`false\` 后要退出全部 Codex / ChatGPT 进程再开，不要把 \`sandbox\` 改成 unelevated 来修窗口。`,
    category: "config",
    level: "intermediate",
    surfaces: ["app"],
    tags: ["Computer Use", "桌面", "Windows"],
    related: ["windows-sandbox-private-desktop", "remote-control-pair", "windows-elevated-sandbox"],
    sources: [
      {
        label: "OpenAI · Computer Use",
        url: "https://learn.chatgpt.com/docs/computer-use",
      },
    ],
  },
  {
    id: "wsl-linux-home-not-mntc",
    no: 142,
    title: "WSL 把仓库放进 Linux 家目录，不要在 /mnt/c 上跑",
    summary: "0.115 起只要 WSL2。CLI 在发行版里装。路径走 ~/code，不要走 Windows 盘挂载。IDE 另开 chatgpt.runCodexInWindowsSubsystemForLinux。",
    body: `WSL1 只支持到 Codex \`0.114\`。之后 Linux 沙箱改成 bubblewrap，必须 WSL2。

在提升权限的 PowerShell 里装发行版，再进 Linux shell 装 CLI：

\`\`\`powershell
wsl --install
wsl
\`\`\`

\`\`\`bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
mkdir -p ~/code && cd ~/code
git clone git@github.com:you/repo.git
cd repo
codex
\`\`\`

\`/mnt/c/...\` 又慢又容易踩符号链接和权限。Windows 资源管理器用 \`\\\\wsl$\\Ubuntu\\home\\<user>\` 看同一份文件。VS Code 在 WSL 终端里 \`code .\`，状态栏应显示 \`WSL: ...\`，确认：

\`\`\`bash
echo $WSL_DISTRO_NAME
which codex || echo "codex not found"
\`\`\`

IDE 扩展要在编辑器设置里打开 \`chatgpt.runCodexInWindowsSubsystemForLinux\`（改完会重载窗口）。仓库仍在 \`C:\\\` 时不要开这项。大仓卡顿先 \`wsl --update\` 再 \`wsl --shutdown\`，不要先去调沙箱。`,
    category: "sandbox",
    level: "intermediate",
    surfaces: ["cli", "ide"],
    tags: ["WSL", "Windows", "路径"],
    related: ["windows-app-wsl-home-split", "desktop-wsl-codex-app-transport", "windows-elevated-sandbox"],
    sources: [
      {
        label: "OpenAI · WSL",
        url: "https://learn.chatgpt.com/docs/windows/wsl",
      },
    ],
  },
  {
    id: "bedrock-mantle-provider",
    no: 143,
    title: "Bedrock 走 amazon-bedrock 提供商，不要塞 OPENAI_API_KEY",
    summary: "本地 CLI / IDE / 桌面把 model_provider 设成 amazon-bedrock。鉴权用 Bedrock API key 或 AWS SDK 链。Fast 模式不可用。",
    body: `\`\`\`toml
model_provider = "amazon-bedrock"
\`\`\`

先试 Bearer：

\`\`\`bash
export AWS_BEARER_TOKEN_BEDROCK="<bedrock-api-key>"
export AWS_REGION=us-east-2
\`\`\`

没有 API key 就走 AWS SDK 凭证链（\`aws configure\`、\`AWS_ACCESS_KEY_ID\`、\`aws sso login --profile codex-bedrock\` 再 \`export AWS_PROFILE=codex-bedrock\`）。桌面应用和 IDE 读不到你的 shell 环境，把同样的变量写进 \`~/.codex/.env\` 后重启客户端。

模型 ID 必须完全一致，例如 \`openai.gpt-5.6-sol\`、\`openai.gpt-5.6-terra\`、\`openai.gpt-5.6-luna\`。CLI 里 \`/status\` 应显示 \`amazon-bedrock\`。

这条路径不经过 OpenAI 托管的 Responses API。Cloud、网页 Work、Fast 模式、以及依赖 ChatGPT 登录的插件都不可用。GovCloud 的 Mantle 端点也不支持。凭证和 IAM 问题找 AWS，不要开 Codex 工单。`,
    category: "config",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["Bedrock", "model_provider", "AWS"],
    related: ["fast-mode", "login-device-auth", "debug-config-strict"],
    sources: [
      {
        label: "OpenAI · Amazon Bedrock",
        url: "https://learn.chatgpt.com/docs/amazon-bedrock",
      },
    ],
  },
  {
    id: "ide-open-codex-sidebar",
    no: 146,
    title: "IDE 找不到图标就跑 Codex: Open Codex Sidebar",
    summary: "VS Code / Cursor / Windsurf 走扩展。Xcode 在编码助手里选 Codex。JetBrains 在 AI Chat 里选 Codex。长任务从 IDE 丢到 Cloud。",
    body: `VS Code 兼容编辑器：点 Codex 图标。没有图标时，命令面板运行：

\`\`\`text
Codex: Open Codex Sidebar
\`\`\`

Xcode：打开 coding assistant，新聊天，把 agent 选成 Codex。JetBrains：打开 AI Chat，选 Codex。

合成器能带上当前打开的文件、选区和最近聊天。\`/ide\` 只把这一次的文件/选区送进 CLI；\`/ide-context\` 才是自动共享。Windows 仓库在 WSL2 时打开 \`chatgpt.runCodexInWindowsSubsystemForLinux\`。

短改动留在本地；要过夜的任务从同一侧栏丢到 Cloud，回来还在这条聊天里看结果。改完用 Git checkpoint，方便回滚。`,
    category: "config",
    level: "starter",
    surfaces: ["ide"],
    tags: ["IDE", "侧栏", "Cloud"],
    related: ["ide-chatgpt-settings", "ide-once-vs-ide-context", "wsl-linux-home-not-mntc"],
    sources: [
      {
        label: "OpenAI · Codex IDE extension",
        url: "https://learn.chatgpt.com/docs/codex/ide",
      },
    ],
  },
  {
    id: "linux-chatgpt-deb-rpm",
    no: 152,
    title: "Linux 桌面应用用发行版包，不要指望 Computer Use",
    summary: "预览。Ubuntu 24.04/26.04、Debian 13、Fedora 43/44，x64 或 ARM64。Computer Use 还没有。Wayland 先走 XWayland。",
    body: `先看架构：

\`\`\`bash
uname -m    # x86_64 → amd64 / x86_64 包；aarch64 → arm64 / aarch64 包
\`\`\`

Ubuntu / Debian：

\`\`\`bash
cd ~/Downloads
sudo apt install ./chatgpt_amd64.deb    # ARM64 换成 chatgpt_arm64.deb
chatgpt
sudo apt update && sudo apt install --only-upgrade chatgpt
\`\`\`

Fedora：

\`\`\`bash
cd ~/Downloads
sudo dnf install ./chatgpt.x86_64.rpm    # ARM64 换成 chatgpt.aarch64.rpm
sudo dnf upgrade --refresh chatgpt
\`\`\`

安装脚本会加上 OpenAI 签名源。从应用菜单或 \`chatgpt\` 启动后用 ChatGPT 账号登录。

Computer Use 目前只在 macOS / Windows。Linux 预览没有。原生 Wayland 仍实验：先彻底退出，再 \`chatgpt --ozone-platform=wayland\`。浮动窗、焦点和快捷键可能不完整。CLI 的 \`/app\` 把 TUI 接到桌面，文档仍写 macOS / Windows。`,
    category: "config",
    level: "starter",
    surfaces: ["app"],
    tags: ["Linux", "桌面", "安装"],
    related: ["app-from-tui", "wsl-linux-home-not-mntc", "computer-use-windows-allowlist"],
    sources: [
      {
        label: "OpenAI · ChatGPT desktop app for Linux",
        url: "https://learn.chatgpt.com/docs/linux/linux-app",
      },
    ],
  },
  {
    id: "windows-app-wsl-home-split",
    no: 153,
    title: "Windows 桌面和 WSL CLI 默认不共用 ~/.codex",
    summary: "桌面读 %USERPROFILE%\\.codex。WSL 里的 CLI 读 Linux 家目录。要共用就 export CODEX_HOME。代理在哪跑，仓库就放哪边。",
    body: `\`winget install --id 9PLM9XGG6VKS -s msstore\` 装 Windows 桌面应用。默认代理是 Windows 原生（PowerShell + Windows 沙箱）。Settings 里改成 WSL 后必须重启才生效。集成终端（PowerShell / cmd / Git Bash / WSL）和代理是两套选择，只影响之后新开的终端。

两条路径不要混：

- **代理在 WSL / 你在 WSL 里跑 CLI**：仓库放 Linux 家目录，见「不要在 /mnt/c 上跑」
- **桌面用 Windows 原生代理**：仓库放 Windows 盘。WSL 用 \`/mnt/<盘符>/...\` 访问同一份。从 \`\\\\wsl$\` 打开的项目，原生 Git 功能经常检测不到

桌面永远用 \`%USERPROFILE%\\.codex\`。WSL CLI 默认用 \`~/.codex\`，登录态和会话不会自动对齐。要共用：

\`\`\`bash
export CODEX_HOME=/mnt/c/Users/<windows-user>/.codex
\`\`\`

这只共享配置和 \`auth.json\`，不是让你把 Git 仓放到 \`/mnt/c\`。

\`npm.ps1 cannot be loaded\` 时，在了解策略后果后再 \`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned\`。要提升权限，用管理员启动整个 ChatGPT 应用，代理才会继承。常用工具：

\`\`\`powershell
winget install --id Git.Git
winget install --id OpenJS.NodeJS.LTS
winget install --id GitHub.cli
gh auth login
\`\`\`
`,
    category: "config",
    level: "intermediate",
    surfaces: ["app", "cli"],
    tags: ["Windows", "WSL", "CODEX_HOME"],
    related: ["wsl-linux-home-not-mntc", "desktop-wsl-codex-app-transport", "windows-elevated-sandbox"],
    sources: [
      {
        label: "OpenAI · ChatGPT desktop app for Windows",
        url: "https://learn.chatgpt.com/docs/windows/windows-app",
      },
    ],
  },
  {
    id: "integrated-terminal-ctrl-backtick",
    no: 156,
    title: "桌面集成终端用 Ctrl+\`，Cmd+K 是命令面板",
    summary: "终端跟着当前项目或 worktree。ChatGPT 能读输出。清屏是 Ctrl+L。常用命令做成 local environment action。",
    body: `桌面应用每条聊天都有一个绑在当前项目 / worktree 的终端。点右上角终端图标，或按 Control 加反引号。

\`Cmd+K\`（Windows 上常见是 \`Ctrl+K\`）打开应用命令面板，不会清终端。清屏用 \`Ctrl+L\`。

已经在跑的终端不会跟着「默认终端」设置变；改 PowerShell / cmd / Git Bash / WSL 之后，重启应用或新开聊天。

反复跑的检查做成 local environment action，会出现在快捷入口并在这个终端里执行。验证改动时让它跑 \`git status\`、测试和 lint，模型能读当前输出，不必把日志粘进提示。`,
    category: "commands",
    level: "starter",
    surfaces: ["app"],
    tags: ["桌面", "终端", "worktree"],
    related: ["linux-chatgpt-deb-rpm", "windows-app-wsl-home-split", "desktop-worktree-setup-scripts"],
    sources: [
      {
        label: "OpenAI · Integrated terminal",
        url: "https://learn.chatgpt.com/docs/integrated-terminal",
      },
    ],
  },
  {
    id: "desktop-enable-permission-modes",
    no: 157,
    title: "桌面要先在 Settings 打开权限档，菜单里才会出现",
    summary: "Ask for approval 一直在。Approve for me / Full access 要在 Settings > General > Permissions 打开后才会进菜单。打开不等于选中。换审查员不会放大沙箱。",
    body: `桌面应用或 IDE 合成器下方的权限菜单，和 CLI 的 \`/permissions\` 是同一套边界，入口不同。

第一次用桌面应用时：

1. Settings > General > Permissions
2. 打开 Automatic review（菜单里叫 Approve for me）和 Full access
3. 回到聊天，再从合成器下方选择模式

打开只是让选项出现，不会改当前聊天。组织策略禁止的档会显示为禁用。

Ask for approval：在当前工作区里干活，越界就停下来问你。Approve for me 的沙箱边界一样，只是把越界请求交给 Auto-review，而不是人点。Full access 才拿掉工作区边界。不要把「少弹窗」理解成「沙箱变大了」。

桌面里选中已批准的 Daybreak 模型（或用 \`/model\`）时，若账户允许，权限菜单会自动切到 Approve for me。换模型不会绕过组织策略；模式不可用时保持当前档。`,
    category: "sandbox",
    level: "starter",
    surfaces: ["app", "ide"],
    tags: ["permissions", "桌面", "Auto-review"],
    related: ["permissions-not-sandbox-mode", "approve-one-retry", "two-knobs"],
    sources: [
      {
        label: "OpenAI · Permission modes",
        url: "https://learn.chatgpt.com/docs/permission-modes",
      },
    ],
  },
  {
    id: "webmcp-site-tools-not-mcp",
    no: 159,
    title: "网页 Site tools 是 WebMCP，不要当成 config.toml 里的 MCP",
    summary: "桌面内置浏览器里，站点自己登记工具。GPT-5.6 Sol / Terra 才有；Luna、Enterprise / Edu 没有。关站或跳走，工具就没了。",
    body: `打开桌面内置浏览器，地址栏选 Site tools。提示示例：

\`\`\`text
Use @Edge to read the current page and turn it into a concise checklist.
Find the documentation for building reusable skills, open the relevant page, and explain when I should turn a skill into a plugin.
\`\`\`

Learn / Developers 文档页会提供 \`search_openai_docs\`、\`lookup_page\` 这类工具。这不是 \`codex mcp add\`：不用另装服务器，但工具跟当前页面走，iframe 里登记的发现不了。

关掉：Settings > Browser > Permissions > Enable site tools。站点给的工具定义和结果都是不信任内容。有专用 MCP / 插件时，不要靠网页工具去扒数据。

给自己的站点加只读工具：

\`\`\`javascript
if (typeof document.modelContext?.registerTool === "function") {
  await document.modelContext.registerTool({
    name: "get_page_title",
    description: "Read the title of the current page.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true },
    execute: async () => ({ title: document.title }),
  });
}
\`\`\``,
    category: "mcp",
    level: "intermediate",
    surfaces: ["app"],
    tags: ["WebMCP", "浏览器", "桌面"],
    related: ["mcp-add-and-login", "computer-use-windows-allowlist", "apps-not-plugins"],
    sources: [
      {
        label: "OpenAI · Site tools",
        url: "https://learn.chatgpt.com/docs/webmcp",
      },
    ],
  },
  {
    id: "desktop-worktree-setup-scripts",
    no: 160,
    title: "Worktree 缺依赖：用桌面 Local environment 的 setup 脚本",
    summary: "只给 ChatGPT 桌面 Codex。.worktreeinclude 只拷 ignore 文件，不会 npm install。setup 在新建 worktree 时跑；Actions 走集成终端。",
    body: `先在桌面应用切到 Codex，再打开 Settings 配 Local environment。配置写进当前项目根的 \`.codex\`，可进 Git。monorepo 要打开那个真正放共享 \`.codex\` 的目录。

新建 Worktree 聊天时会自动跑 setup。TypeScript 项目常见：

\`\`\`bash
npm install
npm run build
\`\`\`

按平台覆盖：给 macOS / Windows / Linux 各写一份，覆盖默认脚本。这解决的是「本地能跑、新树没有 node_modules」。它不会拷 \`.env\`；被 ignore 的本地文件仍走仓库根的 \`.worktreeinclude\`。

反复点的命令做成 Action（例如 \`npm start\`、测试套件），出现在顶栏，在集成终端里执行。一次性排错直接开终端，不必先做成 Action。

CLI 自己 \`git worktree add\` 出来的树、远程 worktree，都不会跑这套桌面 setup。`,
    category: "cloud",
    level: "starter",
    surfaces: ["app"],
    tags: ["worktree", "桌面", "setup"],
    related: ["worktreeinclude-ignored-files", "integrated-terminal-ctrl-backtick", "cli-managed-worktree"],
    sources: [
      {
        label: "OpenAI · Local environments",
        url: "https://learn.chatgpt.com/docs/environments/local-environment",
      },
      {
        label: "OpenAI · Worktrees",
        url: "https://learn.chatgpt.com/docs/environments/git-worktrees",
      },
    ],
  },
  {
    id: "allow-local-binding-private-host",
    no: 161,
    title: "权限档里 localhost 仍被拦：先精确放行，再考虑 allow_local_binding",
    summary: "开了 network_proxy 后，解析到私网 / 回环的主机即使在域名表里也被拦。通配符不算本地例外。Docker socket 另走 unix_sockets。",
    body: `权限档的域名表只管沙箱里的命令，而且只有 \`features.network_proxy = true\` 时才强制。\`network.enabled = true\` 但不启代理，等于直连、白名单失效。

默认 \`allow_local_binding = false\`：回环、链路本地、私网地址会被拦，防 DNS 重绑定。要连本机服务，先精确放行字面量：

\`\`\`toml
default_permissions = "project-edit"

[features]
network_proxy = true

[permissions.project-edit]
extends = ":workspace"

[permissions.project-edit.network]
enabled = true

[permissions.project-edit.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
\`\`\`

\`lab.example.com\` 这种名字若解析到 \`10.\` / \`192.168.\`，即使写了 \`allow\` 仍会被拦。只有这时才加：

\`\`\`toml
[permissions.project-edit.network]
enabled = true
allow_local_binding = true
\`\`\`

\`*.internal\` 这类通配符不算本地例外。Docker 用 Unix socket，不要靠把 \`allow_local_binding\` 打开了事：

\`\`\`toml
[permissions.project-edit.network.unix_sockets]
"/var/run/docker.sock" = "allow"
\`\`\`

网页搜索、Apps、MCP、浏览器、Cloud 各有自己的出站通道，不走这张域名表。`,
    category: "sandbox",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["permissions", "network_proxy", "localhost"],
    related: ["permissions-not-sandbox-mode", "network-proxy-not-apps", "two-knobs"],
    sources: [
      {
        label: "OpenAI · Permissions",
        url: "https://learn.chatgpt.com/docs/permissions",
      },
      {
        label: "OpenAI · Recommended configuration",
        url: "https://learn.chatgpt.com/docs/cyber-safety/recommended-configuration",
      },
    ],
  },
  {
    id: "sandbox-offline-test",
    no: 166,
    title: "改权限档先用 codex sandbox 离线试命令",
    summary: "不启 agent、不花 token。按平台选 macos / linux / windows。macOS 用 --log-denials；企业档加 --include-managed-config。",
    body: `\`codex sandbox\` 用和 agent 相同的 OS 沙箱跑一条命令。别名 \`codex debug\`；平台还有 \`seatbelt\` / \`landlock\`。它只测文件系统和网络边界，不测会不会弹出批准框。

\`\`\`bash
# Linux / WSL2（需要 bubblewrap）
codex sandbox linux -- echo "sandbox permits echo"
codex sandbox linux -P project-edit -- npm test

# macOS：结束后打印 Seatbelt 拒绝
codex sandbox macos --log-denials -- curl https://example.com
codex sandbox macos --allow-unix-socket /var/run/docker.sock -- docker ps

# Windows 原生沙箱
codex sandbox windows -P project-edit -- dir
\`\`\`

\`--\` 后面整段转发给沙箱。测命名权限档用 \`-P\` / \`--permission-profile\`（安全页有时写成 \`--permissions-profile\`）。\`-C\` 和工作区解析都要求同时给权限档。企业 \`requirements.toml\` 要叠进去时：

\`\`\`bash
codex sandbox linux -P project-edit --include-managed-config -- npm test
\`\`\`

网页搜索、Apps、MCP、浏览器不走这层。命令被拦了先看这一条，再去开 \`danger-full-access\`。`,
    category: "sandbox",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["sandbox", "permissions", "排错"],
    related: ["permissions-not-sandbox-mode", "two-knobs", "windows-elevated-sandbox"],
    sources: [
      {
        label: "OpenAI · Agent approvals and security",
        url: "https://learn.chatgpt.com/docs/agent-approvals-security",
      },
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "permission-profile-agents-read",
    no: 167,
    title: "自定义权限档读不到 AGENTS.md 时，不要清 sessions",
    summary: "报 sessions corrupt 多半是沙箱挡住了项目指令。给工作区读权限，或暂时 project_doc_max_bytes = 0。清 ~/.codex/sessions 救不了。",
    body: `v0.149 起，加载 \`AGENTS.md\` 会走当前权限档的文件系统沙箱。自定义档如果读不到工作区，会话会在第一轮之前失败。macOS 常见包装成：

\`\`\`text
Session data under ~/.codex/sessions looks corrupt or unreadable.
Clearing the sessions directory may help
(underlying error: failed to load AGENTS.md instructions … Operation not permitted)
\`\`\`

会话目录往往是好的。真正失败的是指令文件读。**不要删 \`~/.codex/sessions\`。**

先给工作区读/写（推荐）：

\`\`\`toml
default_permissions = "code-write"

[permissions.code-write]
extends = ":workspace"

[permissions.code-write.filesystem.":workspace_roots"]
"." = "write"
\`\`\`

只想先开得了会话、可以暂时不要项目指令：

\`\`\`toml
project_doc_max_bytes = 0
\`\`\`

内置 \`:workspace\` / \`:read-only\` 一般没这个问题。Windows 上另一类 os error 206 是 deny-read 的 \`**\` glob 把沙箱 helper 命令行撑爆，不是文件名真的太长，见 Windows deny-read glob 那条。macOS 上若 helper 不能 exec Homebrew 的 \`codex\`，把安装前缀列入可读路径，或同样用 \`project_doc_max_bytes = 0\`。

核对模型到底看见了什么：

\`\`\`bash
codex debug prompt-input "probe input"
\`\`\``,
    category: "sandbox",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["permissions", "AGENTS.md", "排错"],
    related: ["permissions-not-sandbox-mode", "windows-deny-read-glob", "untrusted-skips-project-agents"],
    sources: [
      {
        label: "openai/codex#40937",
        url: "https://github.com/openai/codex/issues/40937",
      },
      {
        label: "openai/codex#40245",
        url: "https://github.com/openai/codex/issues/40245",
      },
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "allow-login-shell-false",
    no: 168,
    title: "加固本机：allow_login_shell = false",
    summary: "默认允许 login shell。设成 false 会拒绝 login=true，未指定时改走非 login。靠 ~/.profile 注入 PATH 的远端机不要盲目关。",
    body: `shell 工具可以请求 login shell（会读 \`~/.profile\` / \`~/.zprofile\`）。默认 \`allow_login_shell = true\`。要收紧本机 CLI：

\`\`\`toml
# ~/.codex/config.toml
approval_policy = "on-request"
sandbox_mode = "read-only"
allow_login_shell = false
\`\`\`

\`false\` 时：显式 \`login = true\` 会被拒；没写 \`login\` 的请求按非 login 启动。这能避免工具经 login rc 拉进意外 PATH、别名或环境。

桌面 Remote / SSH 常常**需要**远端 login shell 才能找到 nvm / Homebrew 的 \`codex\`。那种机器保持默认 \`true\`，改把 PATH 写进 \`~/.profile\` 或 \`shell_environment_policy.set\`。本机加固和远端 PATH 修复是两件相反的事，不要复制同一行到所有主机。`,
    category: "sandbox",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["config.toml", "shell", "安全"],
    related: ["shell-environment-policy", "experimental-use-profile", "desktop-remote-phone-ssh"],
    sources: [
      {
        label: "OpenAI · Agent approvals and security",
        url: "https://learn.chatgpt.com/docs/agent-approvals-security",
      },
      {
        label: "OpenAI · Config advanced",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
    ],
  },
  {
    id: "windows-deny-read-glob",
    no: 169,
    title: "Windows deny-read 不要写无界 glob，写精确目录",
    summary: "Windows 会把 glob 展开进沙箱 helper 命令行。Chrome 配置目录那种树能报 os error 206，会话起不来。目录拒绝写精确路径。",
    body: `Windows ACL 表达不了 glob。权限档里的 deny-read 会在启动前扫盘、展开成具体路径，再塞进一条 \`CreateProcessW\` 命令行（上限 32,767 个 UTF-16 字符）。下面这种树可以扫出上万条路径，会话卡几十秒后报：

\`\`\`text
~/AppData/Local/Google/Chrome/**
failed to load AGENTS.md instructions … The filename or extension is too long. (os error 206)
\`\`\`

这不是路径超过 260 字符，也不是 sessions 坏了。空项目、企业托管档同样会中招。

目录级拒绝写精确路径，不要在目录后面再加递归 glob。目录 deny 会覆盖子树，不必先展开：

\`\`\`toml
default_permissions = "managed_net"

[permissions.managed_net]
extends = ":workspace"

[permissions.managed_net.filesystem]
glob_scan_max_depth = 3
":workspace_roots" = { "." = "write" }
"~/AppData/Local/Google/Chrome" = "deny"
"/absolute/path/to/secrets" = "deny"
\`\`\`

官方样本里无界 glob（例如匹配任意深度的 env 文件）要配 \`glob_scan_max_depth\`（至少 \`1\`）。这只能限制扫描深度，救不了已经膨胀的 argv。工作区里匹配数很少时再用。

临时绕过：\`project_doc_max_bytes = 0\` 能跳过 AGENTS.md 加载，但沙箱命令仍可能撞上同一条命令行上限。真正该改的是 deny 列表。`,
    category: "sandbox",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["Windows", "permissions", "deny-read"],
    related: ["permission-profile-agents-read", "windows-elevated-sandbox", "permissions-not-sandbox-mode"],
    sources: [
      {
        label: "openai/codex#41809",
        url: "https://github.com/openai/codex/issues/41809",
      },
      {
        label: "OpenAI · Sample configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-sample",
      },
    ],
  },
  {
    id: "request-compression-zstd",
    no: 173,
    title: "请求压缩默认开；代理把 body 搞坏再关",
    summary: "features.enable_request_compression 稳定且默认 true，用 zstd 压流式请求体。中间盒拒绝压缩编码时设 false。",
    body: `官方配置参考把这项标成 stable，默认已开：

\`\`\`toml
[features]
enable_request_compression = true
\`\`\`

只在服务端支持时压缩流式请求体。ChatGPT 登录、走 OpenAI Responses 时才会压；别的 provider 或 API key 路径可能静默不压，\`true\` 不等于「每次上传都是 zstd」。

企业代理、TLS 中间盒如果改写或拒绝 \`Content-Encoding\`，会话会表现为连不上或流式中断。先关压缩验证：

\`\`\`toml
[features]
enable_request_compression = false
\`\`\`

一次性覆盖：

\`\`\`bash
codex -c features.enable_request_compression=false
\`\`\`

不要为了「省流量」去开实验性的 \`features.rollout_budget\`：那是另一套未完成的 token 预算，默认关，开了还要设 \`limit_tokens\`。压缩开关只管请求体体积。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["config.toml", "features", "网络"],
    related: ["three-layer-config", "network-proxy-not-apps", "debug-config-strict"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "openai/codex#18677",
        url: "https://github.com/openai/codex/issues/18677",
      },
    ],
  },
  {
    id: "tui-animations-off",
    no: 180,
    title: "闪烁星星和转圈：tui.animations 写成 false 并新开会话",
    summary: "默认 true。关掉欢迎动画、微光和 spinner。已有 [tui] 表就只加键，不要再写一份同名表。改完必须退出重开。",
    body: `终端里欢迎屏闪星星、状态行一直转圈，或空闲时 \`codex-main\` 还占着可观 CPU，先关动画，不要先换终端模拟器：

\`\`\`toml
[tui]
animations = false
\`\`\`

官方配置参考把这项标成 welcome / shimmer / spinner 总开关，默认 \`true\`。读屏用户也靠它做减少动态。文件里如果已经有 \`[tui]\`，只在同一张表里加 \`animations\`，不要再贴第二份 \`[tui]\`，重复表会让 Codex 拒掉配置。

改完必须完全退出当前 CLI 再开新会话，已经跑着的 TUI 不会热更新。关动画后标签标题还在跳，再把标题里的 spinner 拿掉：

\`\`\`toml
[tui]
animations = false
terminal_title = ["project"]
\`\`\`

\`tui.notifications\` 是另一条通道，关动画不会关 Toast。`,
    category: "config",
    level: "starter",
    surfaces: ["cli"],
    tags: ["TUI", "animations", "无障碍"],
    related: ["tui-alternate-screen", "title-window-items", "statusline-footer"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "@cooperx86 · 关掉闪烁星星",
        url: "https://x.com/cooperx86/status/2098051356921586076",
      },
    ],
  },
  {
    id: "model-catalog-json",
    no: 183,
    title: "本地模型目录用 model_catalog_json，改完必须重启",
    summary: "启动时加载的 JSON 覆盖内置和远程目录，不是合并。先 dump bundled，再改 slug。桌面选择器可能仍显示 Custom。",
    body: `\`/model\` 没有你要的 slug、或第三方 provider 只显示 Custom 时，不要只改 \`model =\`。官方扩展点是用户级 \`~/.codex/config.toml\`：

\`\`\`toml
model_catalog_json = "/home/you/.codex/model-catalog.json"
model = "your-model-slug"
\`\`\`

路径必须在启动时就能读到。本地文件会**覆盖**二进制内置目录和远程刷新，不是往上面追加。只写一条模型，其它内置项会从这一进程的目录里消失。稳妥做法：

\`\`\`bash
codex debug models --bundled
codex debug models
\`\`\`

\`--bundled\` 跳过网络刷新，只看编译进二进制的那份。无旗标打印三层合并后的结果。对照 slug、\`context_window\`、显示名之后，再把需要的条目写进本地 JSON。JSON 顶层是 \`models\` 数组；具体字段以 dump 出来的形状为准，不要抄过期博客里的网关专用文件。

\`profiles.<name>.model_catalog_json\` 可按 profile 覆盖，同样只在启动时生效。改文件、改路径、改 \`reloadUserConfig\` **都不会**让已经在跑的 app-server 重读目录，必须退出 Desktop / CLI。项目 \`.codex/config.toml\` 不能定义 \`model_provider\`；目录键按设计可读项目文件，但桌面新线程有时读不到，遇到就写进用户 config。

核对：

\`\`\`bash
codex debug models | head
\`\`\`

桌面选择器如果仍过滤掉本地模型，\`model =\` 仍然会发给 provider，只是 UI 写成 Custom。不要为此去改实验性 rollout 开关。`,
    category: "config",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["model_catalog_json", "debug models", "模型"],
    related: ["context-window-verify-status", "fast-mode", "oss-provider"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "Codex Knowledge Base · Model catalogue",
        url: "https://codex.danielvaughan.com/2026/05/04/codex-cli-model-catalogue-architecture-providers-discovery-debug/",
      },
    ],
  },
  {
    id: "otel-user-config",
    no: 185,
    title: "otel 只写用户 config；header 里的环境变量不会展开",
    summary: "项目 .codex 里的 otel 会被忽略。metrics_exporter 默认 statsig。OTLP/HTTP 要写带 /v1/logs 的完整路径。",
    body: `遥测路由是机器本地键，必须放 \`~/.codex/config.toml\`。写进仓库 \`.codex/config.toml\` 会被忽略。

\`\`\`toml
[otel]
environment = "dev"
log_user_prompt = false
metrics_exporter = "none"

[otel.exporter.otlp-http]
endpoint = "http://127.0.0.1:4318/v1/logs"
protocol = "binary"

[otel.trace_exporter.otlp-http]
endpoint = "http://127.0.0.1:4318/v1/traces"
protocol = "binary"
\`\`\`

\`exporter\` 管日志，\`trace_exporter\` 管追踪，\`metrics_exporter\` 管指标，三套独立。不写 metrics 时官方默认是 \`statsig\`，不想外发就把这项设成 \`none\` 或改成你的 collector。

OTLP/HTTP 的 \`endpoint\` 要带信号路径（\`/v1/logs\`、\`/v1/traces\`、\`/v1/metrics\`），CLI 不会自动拼接。\`log_user_prompt = true\` 会把原文提示送进日志，默认关着。

\`headers\` 是静态字符串。写成 \`Bearer \${OTLP_TOKEN}\` 会把美元括号原样发出去，不是环境变量插值。令牌用 collector 侧的本地配置，或本机固定头，不要指望 TOML 替你展开。

一次性覆盖：

\`\`\`bash
codex -c otel.metrics_exporter=none
\`\`\`
`,
    category: "config",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["otel", "遥测", "config.toml"],
    related: ["project-config-cannot-override-auth", "debug-config-strict", "analytics-enabled"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "openai/codex#14465",
        url: "https://github.com/openai/codex/issues/14465",
      },
    ],
  },
  {
    id: "tui-alternate-screen",
    no: 188,
    title: "tmux 和 Zellij 要滚动回放：alternate_screen 写成 never",
    summary: "默认 auto。现在 auto 在 Zellij 也会进备用屏。参考文档若还写跳过 Zellij，以运行时为准。",
    body: `TUI 默认走备用屏（CSI 1049）。很多多路复用器在备用屏里不保留会话中的滚动回放，看起来像「输出一闪就没了」。要沿用终端自己的滚动历史，关掉备用屏：

\`\`\`toml
[tui]
alternate_screen = "never"
\`\`\`

一次性：

\`\`\`bash
codex --no-alt-screen
codex -c tui.alternate_screen=never
\`\`\`

取值是 \`auto\` | \`always\` | \`never\`，默认 \`auto\`。文件里如果已经有 \`[tui]\`，只在同一张表里加键，不要再贴第二份 \`[tui]\`。

过时博客陷阱：旧文和部分配置参考仍写「\`auto\` 会在 Zellij 里关掉备用屏」。\`#22214\` 已去掉这条 workaround，**现在 \`auto\` 对 Zellij 也走备用屏**。Zellij 0.44.1 起才按标准备用屏工作。还要在会话中用多路复用器回放，显式 \`never\` 或 \`--no-alt-screen\`。

这和 \`/raw\` 不是一回事：\`/raw\` 管 TUI 里划选复制；备用屏管的是终端/ Zellij / tmux 自己的滚动缓冲。改完必须新开会话。`,
    category: "config",
    level: "starter",
    surfaces: ["cli"],
    tags: ["TUI", "alternate_screen", "Zellij"],
    related: ["tui-disable-paste-burst", "tui-animations-off", "raw-scrollback-copy"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "OpenAI · CLI 参考（中文）",
        url: "https://developers.openai.ac.cn/codex/cli/reference",
      },
      {
        label: "openai/codex#22214",
        url: "https://github.com/openai/codex/pull/22214",
      },
    ],
  },
  {
    id: "tui-auto-recap",
    no: 189,
    title: "关掉自动 recap：tui.auto_recap 写成 false",
    summary: "0.153 起可关自动摘要，手动 /recap 仍可用。无人值守长会话不要关。配置参考表若还没写这个键，以 changelog 为准。",
    body: `空闲会话自动摘要会多烧一轮 token，也可能把你还要对照的完整历史收成摘要。0.153 起可以只关自动路径：

\`\`\`toml
[tui]
auto_recap = false
\`\`\`

\`/recap\` 仍然能用。适合短任务、状态机要完整历史、或你已经在自然断点自己 \`/compact\` 的工作流。

不要关的情况：几小时没人看的会话。关了之后上下文爆掉要自己负责，用 \`/status\` 盯用量。

文件里如果已经有 \`[tui]\`，只在同一张表加键，不要再贴第二份。改完新开会话。Learn 配置参考表若还没列出 \`tui.auto_recap\`，以 Learn changelog 和本机 \`/help\` 为准，不要从过期博客抄成顶层键。`,
    category: "config",
    level: "starter",
    surfaces: ["cli"],
    tags: ["TUI", "auto_recap", "/recap"],
    related: ["recap-export-copy", "compact-vs-clear", "context-window-verify-status"],
    sources: [
      {
        label: "OpenAI · Changelog 0.153.0",
        url: "https://learn.chatgpt.com/docs/changelog",
      },
    ],
  },
  {
    id: "tui-disable-paste-burst",
    no: 190,
    title: "粘贴被吃掉或变成占位符：disable_paste_burst 写进 [tui]",
    summary: "0.153 起正式键在 [tui] 下。顶层同名键只是回退。打开后按收到的字符原样插入，不再做突发粘贴缓冲。",
    body: `往 composer 贴一大段时出现占位符、换行被吞、或 tmux / iTerm 把剪贴板打成一串快速按键，先关突发粘贴检测，不要先换终端：

\`\`\`toml
[tui]
disable_paste_burst = true
\`\`\`

官方 changelog：\`tui.disable_paste_burst\` **替换**旧的顶层 \`disable_paste_burst\`，顶层键仍当回退。新配置写进 \`[tui]\`。不要两处各写一遍还设成相反值。

打开之后，字符按收到的顺序插入，不再缓冲或用占位符替换快速按键突发。适合：多路复用器、远程 SSH、或终端把 bracketed paste 拆成普通按键的环境。

这和 \`/raw\`、\`tui.alternate_screen\` 不是一回事。关检测不会让备用屏突然能划选。已有 \`[tui]\` 就只加键。改完新开会话。`,
    category: "config",
    level: "starter",
    surfaces: ["cli"],
    tags: ["TUI", "disable_paste_burst", "粘贴"],
    related: ["tui-alternate-screen", "tui-keymap-unbind", "raw-scrollback-copy"],
    sources: [
      {
        label: "OpenAI · Changelog 0.153.0",
        url: "https://learn.chatgpt.com/docs/changelog",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "project-root-markers",
    no: 191,
    title: "根目录认错时改 project_root_markers，空列表等于就地当根",
    summary: "默认向上找到含 .git 的目录。非 Git、嵌套仓、只想盯当前子目录时改这个顶层键。空数组不再往上搜。",
    body: `Codex 从 cwd 往上走，碰到项目根才加载 \`.codex/\` 和 \`AGENTS.md\`。默认标记是 \`.git\`。在 monorepo 子包、Hg/Sapling 仓、或没有 Git 的一次性目录里，根会认错，表现为项目配置根本没加载。

\`\`\`toml
project_root_markers = [".git", ".hg", ".sl"]
\`\`\`

只要当前目录、不要继承父仓：

\`\`\`toml
project_root_markers = []
\`\`\`

空列表会**跳过**父目录搜索，把 cwd 当成根。这是顶层键，不要写进 \`[tui]\`。

核对：新开会话后看 \`/status\` 的工作区路径，以及项目 \`.codex/config.toml\` 是否真的进了 \`/debug-config\`。父目录有 \`.git\`、子目录才是你的任务时，空列表比再写一份 AGENTS.md 更直接。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["project_root_markers", "AGENTS.md", "config.toml"],
    related: ["three-layer-config", "codexignore-generated", "project-config-trust"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
    ],
  },
  {
    id: "hide-agent-reasoning",
    no: 192,
    title: "CI 日志太吵：hide_agent_reasoning 写成 true",
    summary: "只藏推理事件，不改变模型怎么想。TUI 和 exec 都生效。排错时不要开。show_raw_agent_reasoning 是另一回事。",
    body: `推理摘要刷屏、exec JSONL 被 thought 撑爆时，先藏事件，不要先换模型：

\`\`\`toml
hide_agent_reasoning = true
\`\`\`

这是顶层键。它**不**减少模型实际推理，只是不把 reasoning 事件打到 TUI 和 \`codex exec\` 输出。适合 CI、录屏、结对时少噪音。

反过来要看原始思维链（且供应商真的会发）才开：

\`\`\`toml
show_raw_agent_reasoning = true
\`\`\`

有的模型根本不发 raw reasoning，开了也没变化。排「它怎么什么都没干」这类问题时先关掉 hide，否则你会以为模型没思考。这和 \`[otel]\`、明文 \`log_dir\` 不是同一条通道。想少写思维链摘要本身，用 \`model_reasoning_summary\`，不要把 hide 当成「模型少想一点」。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "ci"],
    tags: ["hide_agent_reasoning", "exec", "CI"],
    related: ["quiet-command-output", "model-verbosity", "model-reasoning-summary"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "history-persistence",
    no: 193,
    title: "history.jsonl 不是 sessions：persistence 只管提示回忆",
    summary: "save-all 或 none 只写 ~/.codex/history.jsonl。max_bytes 裁最旧提示。sessions 下的 rollout 和磁盘膨胀不受这两个键约束。",
    body: `TUI 的 ↑↓ / Ctrl+R 跨会话只回忆纯文本提示。这份日志默认在 \`~/.codex/history.jsonl\`（或 \`CODEX_HOME\` 下同名文件）。共享机器、CI 镜像、不想把提示留在磁盘时：

\`\`\`toml
[history]
persistence = "none"
\`\`\`

还要留回忆、只是怕文件胀：

\`\`\`toml
[history]
persistence = "save-all"
max_bytes = 104857600
\`\`\`

超过上限会丢掉最旧条目并压实文件。取值只有 \`save-all\` 和 \`none\`。博客里的 \`maxSize\` / \`saveHistory\`、Issue 里提案的 \`session\` 模式都不是现行键。

这和 \`sessions/\` 下的 rollout **不是同一份文件**。\`codex archive\` 只是把会话挪到同盘的 \`archived_sessions/\`，磁盘不会变小。子代理把父会话全文拷进子 rollout 时，\`history.max_bytes\` 帮不上忙。一次性不落盘用 \`codex exec --ephemeral\`，那是 rollout 开关，不是 \`[history]\`。

核对：改完新开会话，看 \`history.jsonl\` 是否还在增长；磁盘报警先 \`du -sh ~/.codex/sessions\`，不要只盯 history。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli", "ci"],
    tags: ["history", "history.jsonl", "磁盘"],
    related: ["archive-not-delete", "session-hygiene", "sqlite-home"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "openai/codex#34061",
        url: "https://github.com/openai/codex/issues/34061",
      },
    ],
  },
  {
    id: "analytics-enabled",
    no: 194,
    title: "关本机用量上报：analytics.enabled 写成 false",
    summary: "这一键同时作用于 CLI、桌面应用和 IDE 扩展。不是 [otel]，也不是 chatgpt.com 的用量页。写进用户 config，不要放进仓库。",
    body: `不想让这台机器往 OpenAI 送客户端分析时，写用户级配置：

\`\`\`toml
[analytics]
enabled = false
\`\`\`

官方进阶配置写明：这一项覆盖 ChatGPT 桌面应用、Codex CLI 和 IDE 扩展。未设置时走客户端默认。这是 \`[analytics]\` 表，不要写成顶层 \`analytics = false\`。

它**不是** \`[otel]\`。OTel 是你自己的 collector；\`analytics.enabled\` 是产品用量/分析开关。项目 \`.codex/config.toml\` 本来就不能覆盖遥测路由，这一项也放 \`~/.codex/config.toml\` 或 profile 文件。

看五小时配额、银行积分仍用 \`/usage\` 或 chatgpt.com 的 Codex analytics 页面，关本机上报不会关掉账户用量查询。改完开一次新会话，再 \`/debug-config\` 确认加载的是用户层。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["analytics", "遥测", "隐私"],
    related: ["otel-user-config", "feedback-enabled", "hide-agent-reasoning"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "model-verbosity",
    no: 195,
    title: "回复太长：model_verbosity 写成 low，别去关推理",
    summary: "low / medium / high 只作用于 Responses API 的最终回复长度。Chat Completions 供应商会忽略。它不是 hide_agent_reasoning，也不是推理摘要。",
    body: `模型目录里有的 GPT-5 系列默认就偏短或偏长。要压最终回复、又不想动推理强度：

\`\`\`toml
model_verbosity = "low"
\`\`\`

取值 \`low\` | \`medium\` | \`high\`。未设置时用当前模型/预设的默认。官方进阶配置写明：只对走 Responses API 的供应商生效；Chat Completions（不少第三方网关的 \`wire_api = "chat"\`）会直接忽略，看起来像「配了没反应」。

三件容易混的事：

- \`model_reasoning_effort\`：模型想多久
- \`model_reasoning_summary\`：思维链摘要写多细（\`none\` 可关掉摘要）
- \`hide_agent_reasoning\`：藏 reasoning **事件**，不改变计算

\`model_verbosity\` 管的是最终助手消息有多啰嗦。CI 日志太吵先 hide 事件；回复本身注水再调 verbosity。改完新开会话，用 \`/debug-config\` 看实际加载值。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "ide", "app"],
    tags: ["model_verbosity", "Responses", "config.toml"],
    related: ["pick-reasoning-effort", "hide-agent-reasoning", "model-reasoning-summary"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "model-instructions-file",
    no: 196,
    title: "model_instructions_file 替换的是内置指令，不是 AGENTS.md",
    summary: "路径指向一份文件，整份替换模型自带的 base instructions。仓库约定仍写 AGENTS.md。相对路径相对的是那份 config 所在的 .codex/ 目录。",
    body: `官方配置参考把 \`model_instructions_file\` 写成「Replacement for built-in instructions instead of AGENTS.md」。它换掉的是 Codex 自带的系统指令，不是项目 \`AGENTS.md\`。仓库约定、测试命令、禁止事项仍放 \`AGENTS.md\`。

用户级用绝对路径，避免 cwd 一变就丢文件：

\`\`\`toml
model_instructions_file = "/home/you/.codex/base-instructions.txt"
\`\`\`

项目 \`.codex/config.toml\` 里的相对路径，相对的是**包含这份 config 的 \`.codex/\` 目录**，不是仓库根：

\`\`\`toml
model_instructions_file = "base-instructions.txt"
\`\`\`

这时文件应放在 \`.codex/base-instructions.txt\`，不是仓库根。旧键 \`experimental_instructions_file\` 已弃用。顶层字符串键 \`instructions\` 是预留位，写了也不会当指令用。

不要把长篇 AGENTS.md 拷进这个文件指望「覆盖项目说明」；项目文档发现链仍走 \`AGENTS.md\` / \`project_doc_fallback_filenames\`。改完用 \`codex debug prompt-input\` 看模型真正吃到的指令，再 \`/debug-config\` 核对路径。`,
    category: "config",
    level: "advanced",
    surfaces: ["cli", "ide", "app"],
    tags: ["model_instructions_file", "AGENTS.md", "config.toml"],
    related: ["split-config-and-instructions", "developer-instructions-append", "keep-agents-md-short"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "feedback-enabled",
    no: 197,
    title: "关掉 /feedback：feedback.enabled 写成 false",
    summary: "CLI、桌面应用和 IDE 扩展一起关。关了之后 /feedback 会显示已禁用并拒绝提交。不是 analytics.enabled。",
    body: `默认本地客户端可以从 \`/feedback\` 提交诊断。共享机器、锁屏演示、不想误发会话片段时：

\`\`\`toml
[feedback]
enabled = false
\`\`\`

官方进阶配置写明：这一项覆盖 ChatGPT 桌面应用、Codex CLI 和 IDE 扩展。关掉后 \`/feedback\` 显示禁用文案，提交会被拒绝。这是 \`[feedback]\` 表，不要写成顶层 \`feedback = false\`。

它**不是** \`[analytics]\`。analytics 管本机用量/健康上报；feedback 管用户主动点的反馈入口。企业 \`requirements.toml\` 也可以强制 \`feedback.enabled\`。这一项放用户 \`~/.codex/config.toml\`，不要指望仓库 \`.codex/\` 替整台机器关掉。

改完新开会话再试 \`/feedback\`，应看到禁用提示而不是提交表。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["feedback", "隐私", "TUI"],
    related: ["analytics-enabled", "otel-user-config", "tui-notifications-filter"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "oss-provider",
    no: 198,
    title: "exec --oss 直接退出：先写 oss_provider 或 --local-provider",
    summary: "oss_provider 只在 --oss 时选本地供应商，不选模型。TUI 会提示；exec 两边都没有就报错退出。项目 .codex 改不了供应商。",
    body: `\`--oss\` 把这一次 Codex 指到本机开源供应商（Ollama / LM Studio）。它不改你平时的默认 \`model_provider\`。用户配置里只写默认本地后端：

\`\`\`toml
oss_provider = "ollama"   # 或 "lmstudio"
\`\`\`

一次性覆盖，不必改配置：

\`\`\`bash
codex --oss --local-provider ollama -m gpt-oss:20b
\`\`\`

两边都没设时行为不同：交互 TUI 会提示你选；\`codex exec --oss\` 会直接报错退出（源码文案是没有默认 OSS provider）。CI / 管道里必须带 \`--local-provider\`，或先在用户 config / \`~/.codex/local-ollama.config.toml\` 写好 \`oss_provider\`。

常见误区：

- \`oss_provider\` **不选模型**。模型仍用 \`-m\` / \`model =\`，并要在 Ollama / LM Studio 里已经拉下来或加载。
- 项目 \`.codex/config.toml\` **不能**改 \`model_provider\` / \`model_providers\`。本地路由放用户 config 或 profile 文件。
- 不要写 \`[model_providers.openai]\`、\`[model_providers.ollama]\`、\`[model_providers.lmstudio]\` 去覆盖内置 ID；自定义网关用新 ID，例如 \`local_ollama\`。
- 中文 CLI 参考有时仍写「\`--oss\` 会验证 Ollama」。以 Learn 进阶配置为准：LM Studio 同样受支持。

第一次先只读验证，确认本地服务已起来：

\`\`\`bash
codex --oss --local-provider ollama --sandbox read-only
\`\`\`

不要把 \`--oss\` 理解成「从此永远走本地」：不加这个旗标时仍走原来的供应商。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["oss_provider", "--oss", "Ollama"],
    related: ["project-config-cannot-override-auth", "model-catalog-json", "ephemeral-ci"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
      {
        label: "Simplified Guide · Local model routing",
        url: "https://www.simplified.guide/codex/local-model-routing",
      },
    ],
  },
  {
    id: "model-reasoning-summary",
    no: 199,
    title: "推理摘要太长：model_reasoning_summary 写成 none",
    summary: "auto / concise / detailed / none 管思维链摘要写多细。不是 hide_agent_reasoning，也不是 model_verbosity。个别模型会拒绝 concise 或 none。",
    body: `思维链摘要刷屏、又不想关掉推理本身时：

\`\`\`toml
model_reasoning_summary = "none"
\`\`\`

官方取值 \`auto\` | \`concise\` | \`detailed\` | \`none\`。未设置时默认 \`auto\`。\`none\` 关掉摘要；\`detailed\` 写最细。这是顶层键，改完新开会话，用 \`/debug-config\` 核对。

四件不要混：

- \`model_reasoning_effort\`：模型想多久
- \`model_reasoning_summary\`：摘要写多细（本键）
- \`hide_agent_reasoning\`：藏 reasoning **事件**，计算照旧
- \`model_verbosity\`：最终助手回复长短，且只对 Responses API 生效

\`model_supports_reasoning_summaries\` 是另一回事：强制发或不发 reasoning 元数据，不是改摘要风格。有的供应商（例如 \`gpt-oss\`）根本不吐 raw reasoning，这时 hide / show_raw 看起来都没效果。

个别模型会对 \`concise\` 或 \`none\` 回 400（只接受 \`auto\` / \`detailed\`）。先改回 \`auto\`，不要当成配置键写错。想少噪音但摘要必须留着，优先 hide 事件，而不是把摘要设成模型不支持的值。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "ide", "app"],
    tags: ["model_reasoning_summary", "推理", "config.toml"],
    related: ["model-verbosity", "hide-agent-reasoning", "pick-reasoning-effort"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "sqlite-home",
    no: 200,
    title: "sqlite_home 要用绝对路径，相对路径跟着 cwd 跑",
    summary: "配置键优先于 CODEX_SQLITE_HOME。它搬的是 SQLite 状态库，不是 log_dir，也不是 history.jsonl。相对路径按启动时的工作目录解析。",
    body: `SQLite 状态默认跟 \`CODEX_HOME\`。磁盘吵、想把状态库和配置拆开时，写用户配置，路径用绝对路径：

\`\`\`toml
sqlite_home = "/home/you/codex-sqlite"
\`\`\`

只改这一次：

\`\`\`bash
CODEX_SQLITE_HOME=/mnt/data/codex-sqlite codex
\`\`\`

官方环境变量页写明：\`sqlite_home\` **优先于** \`CODEX_SQLITE_HOME\`；两条都可以是相对路径，但都相对**当前工作目录**，不是 \`CODEX_HOME\`。写进 \`config.toml\` 的 \`./sqlite\` 会随着你从哪个仓库启动而换地方，看起来像「状态丢了」。

三件不要混：

- \`sqlite_home\`：agent jobs 和可恢复运行时状态的 SQLite
- \`log_dir\`：opt-in 明文 \`codex-tui.log\`
- \`[history] persistence\`：只约束 \`history.jsonl\`，不管 \`sessions/\` 的 rollout

\`CODEX_HOME\` 仍放配置、鉴权和会话文件。目标目录要先建好、可写。有人看到 \`logs_*.sqlite-wal\` 狂写盘（例如 openai/codex#17320），\`RUST_LOG\` 不一定压得住 SQLite TRACE；先把库迁到独立磁盘，不要指望只改日志级别。不要把相对 \`sqlite_home\` 写进会进 Git 的项目 config。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["sqlite_home", "CODEX_SQLITE_HOME", "磁盘"],
    related: ["codex-home-profiles", "log-dir-enables-tui-log", "history-persistence"],
    sources: [
      {
        label: "OpenAI · Environment variables",
        url: "https://learn.chatgpt.com/docs/config-file/environment-variables",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "notify-external-command",
    no: 202,
    title: "桌面提醒用顶层 notify，JSON 在 argv，别塞进 [tui]",
    summary: "目前只在 agent-turn-complete 时跑外部命令。项目 .codex 写了会被忽略。写在所有 [table] 之前，否则 TOML 会当成表里的键。",
    body: `TUI 内置通知管失焦终端；要响铃、Webhook、\`notify-send\`，用用户级顶层键：

\`\`\`toml
notify = ["python3", "/home/you/.codex/notify.py"]

[tui]
notifications = ["agent-turn-complete", "approval-requested"]
\`\`\`

\`notify\` 必须出现在任何 \`[tui]\` / \`[mcp_servers]\` 之前。写在表后面，TOML 会把它收进上一张表，看起来像「配了没反应」。项目 \`.codex/config.toml\` 里的 \`notify\` 会被忽略，启动时有警告。

Codex 把**一整段 JSON 字符串**当作第一个参数传给命令，不是 stdin。目前官方只保证 \`type = "agent-turn-complete"\`。脚本先解析再过滤：

\`\`\`python
import json, subprocess, sys
event = json.loads(sys.argv[1])
if event.get("type") != "agent-turn-complete":
    raise SystemExit(0)
msg = event.get("last-assistant-message") or "turn complete"
subprocess.run(["notify-send", "Codex", msg], check=False)
\`\`\`

这不是 \`tui.notifications\`，也不是 Stop 钩子里自己调的 \`notify-send\`。\`codex cloud exec\` 不会打这条本地命令。改完新开会话，跑一轮短任务确认弹窗，不要只看 \`/debug-config\` 里有没有这个数组。`,
    category: "config",
    level: "starter",
    surfaces: ["cli"],
    tags: ["notify", "通知", "config.toml"],
    related: ["tui-notifications-filter", "project-config-cannot-override-auth", "prevent-idle-sleep"],
    sources: [
      {
        label: "OpenAI · Advanced configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
      {
        label: "samwize · macOS notify",
        url: "https://samwize.com/2026/02/05/setup-codex-cli-notifications-on-macos-iterm2-terminal-notifier/",
      },
    ],
  },
  {
    id: "compact-prompt-local-only",
    no: 206,
    title: "compact_prompt 只走本地压缩，OpenAI 远程会静默忽略",
    summary: "内置 OpenAI / Azure 走远程压缩，配置参考里的 compact_prompt 不会进摘要。OSS 或未声明远程压缩的供应商才吃这个键。",
    body: `官方配置参考有两个键，最终进同一个字段：

\`\`\`toml
compact_prompt = """
保留当前任务、改过的文件路径、决策理由和阻塞项。用列表，不要复述探索死胡同。
"""

# 更长的提示用文件；实验键，行为可能变
experimental_compact_prompt_file = "/home/you/.codex/compact_prompt.md"
\`\`\`

这不是 \`model_auto_compact_token_limit\`，也不是 TUI 里 \`/compact\` 后面跟的那句一次性说明。

默认 ChatGPT / 内置 OpenAI（以及 Azure）会走远程压缩：\`/compact\` 和自动压缩都**不读**这两个键，看起来像配了没反应。Issue 里用标记句验证：摘要里找不到你写的标识。本地压缩路径（\`--oss\`、未声明远程压缩的供应商）才会用。

先 \`codex --version\`，再 \`/compact\` 后问它摘要里有没有你埋的标记。没有就别指望改这段 TOML 能修好远程摘要；长会话用自然断点手动 \`/compact\`，或 \`/new\` 开干净线程。`,
    category: "config",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["compact_prompt", "/compact", "OSS"],
    related: ["compact-vs-clear", "context-window-verify-status", "oss-provider"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "openai/codex#34428",
        url: "https://github.com/openai/codex/issues/34428",
      },
    ],
  },
  {
    id: "codex-git-commit-attribution",
    no: 208,
    title: "commit_attribution 只写身份；先开 features.codex_git_commit",
    summary: "开关默认关，源码里仍是开发中。打开后才给 Codex 生成的提交加 trailer。键值不要带 Co-authored-by 前缀，空字符串才是关掉。",
    body: `\`commit_attribution\` 单独写了也不会生效。先打开功能，再写身份：

\`\`\`bash
codex features enable codex_git_commit
codex features list
\`\`\`

\`\`\`toml
[features]
codex_git_commit = true

commit_attribution = "Codex <noreply@openai.com>"
\`\`\`

源码会在前面拼 \`Co-authored-by: \`。所以键值只写姓名和邮箱，不要再抄一整行 trailer，否则提交信息会变成双重前缀。空字符串 \`""\` 关掉注入。没写键时，打开开关会用默认身份 Codex 和官方 noreply 邮箱。

这是提示注入，不是 git hook。模型多数时候会听话，但你自己 \`git commit -m\`、或会话里没走这条提交路径，都不会自动补。不要用会撞上别人 GitHub 账号的公开邮箱。需要硬保证再用仓库自己的 \`prepare-commit-msg\`。

\`codex_git_commit\` 在功能表里是 UnderDevelopment，会出现在 \`/experimental\`。对照本机 \`features list\`，不要写进全员默认。改完新开会话，让它做一次真正的 git commit，用 \`git log -1 --format=%B\` 看 trailer。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["commit_attribution", "git", "features"],
    related: ["features-list", "review-before-commit", "features-undo"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "openai/codex#19799",
        url: "https://github.com/openai/codex/issues/19799",
      },
    ],
  },
  {
    id: "developer-instructions-append",
    no: 210,
    title: "developer_instructions 是追加，不是 AGENTS.md，也不是换内置指令",
    summary: "顶层键，给会话多塞一段 developer 消息。仓库约定仍写 AGENTS.md。桌面应用自己开的线程可能根本不读这个键。",
    body: `个人口吻、回复语言、默认要不要先列风险，可以写在用户 config 顶层，任何 \`[table]\` 之前：

\`\`\`toml
developer_instructions = """
回答用简体中文。先给结论和风险，再给步骤。
不要把仓库约定写进这里。
"""
\`\`\`

这是**追加**一段 developer 消息，不是替换 Codex 自带系统指令，也不是项目 \`AGENTS.md\`。团队测试命令、禁止事项、目录地图仍放仓库 \`AGENTS.md\`。要换掉内置系统指令，才用 \`model_instructions_file\`。顶层字符串键 \`instructions\` 是预留位，写了也不会当指令用。

写进 \`[tui]\` 或某个 profile 表后面，TOML 会把它收进上一张表，看起来像配了没反应。改完用 \`codex debug prompt-input\` 看模型真正吃到的指令。

桌面应用自己开的线程可能完全不注入这个键（Issue 仍开着）。那边要个人风格，用设置里的 Personalization，或 \`~/.codex/AGENTS.md\`。CLI 线程才把 \`developer_instructions\` 当稳定入口。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["developer_instructions", "AGENTS.md", "config.toml"],
    related: ["split-config-and-instructions", "model-instructions-file", "keep-agents-md-short"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "openai/codex#11004",
        url: "https://github.com/openai/codex/issues/11004",
      },
    ],
  },
  {
    id: "update-plan-opt-in",
    no: 211,
    title: "0.152 起 update_plan 默认关；规划工具要自己打开",
    summary: "升级后如果模型不再主动写计划，不一定是坏了。打开 tools.update_plan.enabled，并新开会话。这和 /plan 模式不是同一件事。",
    body: `0.152 把规划工具改成默认关。升级后对话变「直接动手、不先列步骤」，先查这个键，不要先换模型：

\`\`\`toml
[tools.update_plan]
enabled = true
\`\`\`

顶层也可以写成 \`tools.update_plan.enabled = true\`。改完必须新开会话。\`codex --version\` 低于 0.152 没有这个默认变化。

这不是 TUI 的 \`/plan\`，也不是 \`plan_mode_reasoning_effort\`。\`/plan\` 是先规划再实现的会话模式；\`update_plan\` 是模型能不能调用规划工具去改任务清单。只想偶尔先规划，用 \`/plan\` 即可，不必开这个工具。

依赖模型中途更新计划的工作流，才写进用户或项目 config。对照本机 \`/help\` 和 changelog，不要从旧博客抄回「规划工具默认开」。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["update_plan", "/plan", "0.152"],
    related: ["plan-first", "pick-reasoning-effort", "slash-command-map"],
    sources: [
      {
        label: "openai/codex rust-v0.152.0",
        url: "https://github.com/openai/codex/releases/tag/rust-v0.152.0",
      },
      {
        label: "X · @coinweight",
        url: "https://x.com/coinweight/status/2094863172343894172",
      },
    ],
  },
  {
    id: "tool-output-token-limit",
    no: 212,
    title: "tool_output_token_limit 裁每次工具输出进历史，不是 MCP 单工具上限",
    summary: "顶层键，限制单次工具或函数输出写进会话历史的 token。MCP 表里的 output_token_limit 是另一套。调太小会截断，调太大容易把日志整段落进上下文。",
    body: `测试日志、网页抓取、递归搜索把会话撑爆时，先裁进历史的预算，不要先把窗口开到 1M：

\`\`\`toml
tool_output_token_limit = 8000
\`\`\`

这是顶层数字键，写在任何 \`[table]\` 之前。一次性试用：

\`\`\`bash
codex -c tool_output_token_limit=8000
\`\`\`

官方参考写的是：单次工具或函数输出写进历史的 token 预算。当前表里没有钉死默认值。Issue 里维护者提过大约一万 token；博客里的 16000 不要当现行默认。改完必须新开会话，再用 \`/status\` 或实际工具输出核对，不要只看配置已加载。

这不是 \`[mcp_servers.NAME.tools.TOOL]\` 下的 \`output_token_limit\`。那个只限制某一个 MCP 工具；顶层键对 shell、函数调用和工具输出进历史统一生效。两边可以同时设，不要抄混。

调太小，模型会拿到截断输出，表现为漏看测试失败、重复跑同一条命令。调太大，又会把整份构建日志塞进后续每一轮。定向修补用更紧的值；探索代码再临时放大。源头少噪音仍然更有效：测试加 \`-q\`，完整套件交给子代理。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["tool_output_token_limit", "上下文", "config.toml"],
    related: ["context-window-verify-status", "mcp-approval-and-output-limit", "quiet-command-output"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "openai/codex#16664",
        url: "https://github.com/openai/codex/issues/16664",
      },
    ],
  },
  {
    id: "background-terminal-max-timeout",
    no: 213,
    title: "background_terminal_max_timeout 是空轮询上限，不是轮询间隔",
    summary: "默认 300000 毫秒，只约束后台终端空的 write_stdin 轮询窗口。它不是模型少发请求的间隔，exec_command 首轮也不读这个键。",
    body: `官方默认是 5 分钟，用来替换旧键 \`background_terminal_timeout\`：

\`\`\`toml
background_terminal_max_timeout = 300000
\`\`\`

写在任何 \`[table]\` 之前。这是空 \`write_stdin\` 轮询的最大等待窗口，不是「每隔多久问一次模型」。空轮询仍有大约 5 秒的下限：模型就算请求 1 秒，运行时也会等到大约 5 秒。有新输出或进程退出会立刻返回。

不要指望把这个值调大就能少烧 token。后台任务仍可能每轮把完整历史送回模型，问「还在跑吗」。把编译、测试丢给子代理，或让长命令在前台跑完，比改这个上限更有效。

\`exec_command\` 启动后台命令的第一轮 yield 另有大约 30 秒上限，源码里不读 \`background_terminal_max_timeout\`。所以「我已经写成 5 分钟，为什么第一次还是大约 30 秒就回来」不是配置没生效。这套后台终端还要 \`features.unified_exec\` 生效，\`/ps\` 才列得出来；Windows 默认常是关的。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["background_terminal_max_timeout", "unified_exec", "后台"],
    related: ["unified-exec-and-ps", "prevent-idle-sleep", "quiet-command-output"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "openai/codex#13733",
        url: "https://github.com/openai/codex/issues/13733",
      },
    ],
  },
  {
    id: "check-for-update-on-startup",
    no: 214,
    title: "check_for_update_on_startup 只管 CLI 启动提示，不是自动安装",
    summary: "默认 true。写成 false 只关掉 CLI 启动时的更新检查。桌面应用和 IDE 不读这个键；企业关桌面更新要写 requirements.toml。",
    body: `更新检查刷屏、或更新由 IT 统一发版时，把键写在用户 config 顶层，任何 \`[table]\` 之前：

\`\`\`toml
check_for_update_on_startup = false
\`\`\`

官方默认是 \`true\`：启动时检查，并可能弹出 Update available。它**不是** \`codex update\` 的自动安装，也不是还没落地的 \`auto_update\` 提案。关掉之后，要更新仍自己跑 \`codex update\` 或重装包。

写进 \`[tui]\`、\`[features]\` 或 \`[notice]\` 会静默变成节内字段，配置能加载、提示还在。有人把它放到文件中部，看起来没生效；挪到文件最顶部就好了。

维护者写明：这个键只对 CLI / TUI 生效。ChatGPT 桌面应用标题栏的 Update、IDE 扩展的更新，都不受它约束。企业要关桌面内置更新，写托管 \`requirements.toml\`，不要写进 \`config.toml\`：

\`\`\`toml
[features]
in_app_updates = false
\`\`\`

改完让用户完全退出再打开桌面应用。策略生效后设置里应显示 Managed。这一项不管 Codex CLI、IDE 扩展、手机应用，也不拦 Microsoft Store / MDM 从外面装包。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["check_for_update_on_startup", "in_app_updates", "更新"],
    related: ["debug-config-strict", "three-layer-config", "feedback-enabled"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "OpenAI · Manage app updates",
        url: "https://learn.chatgpt.com/docs/enterprise/manage-app-updates",
      },
    ],
  },
  {
    id: "suppress-unstable-features-warning",
    no: 216,
    title: "suppress_unstable_features_warning 必须写在顶层，不是 [notice]",
    summary: "只关掉「开发中特性已打开」那条警告。写进 [notice] 或 [features] 等于没配。它不会让不稳定开关变安全。",
    body: `打开 \`collab\`、\`codex_git_commit\` 这类 UnderDevelopment 开关后，启动会警告特性不完整。只想消提示、仍然接受风险时：

\`\`\`toml
suppress_unstable_features_warning = true
\`\`\`

这是顶层布尔键，写在任何 \`[table]\` 之前。官方参考写明：它只抑制「已启用开发中特性」的警告。

常见抄错：把它放进 \`[notice]\`（旁边往往是 \`hide_full_access_warning\`）或 \`[features]\`。TOML 会把它收进上一张表，警告原文还是叫你写这个键名，所以看起来「已经写了还不消失」。挪到文件最顶部再新开会话。

关警告不等于这些开关可用。排错时先对照 \`codex features list\` 和 \`/experimental\`，确认你真的要开开发中特性，而不是先把警告藏起来。`,
    category: "config",
    level: "starter",
    surfaces: ["cli"],
    tags: ["suppress_unstable_features_warning", "features", "config.toml"],
    related: ["features-list", "debug-config-strict", "check-for-update-on-startup"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
      {
        label: "openai/codex#10013",
        url: "https://github.com/openai/codex/issues/10013",
      },
    ],
  },
  {
    id: "tools-web-search-object",
    no: 217,
    title: "tools.web_search 对象管域名和上下文，不是搜索模式",
    summary: "顶层 web_search 选 cached / live / disabled。要限制可搜域名或 context_size，用 [tools.web_search] 对象。这不管沙箱出站，也不拦 MCP。",
    body: `顶层 \`web_search = \"cached\"\` 只决定走缓存还是现场抓取。要收紧「搜哪些站、搜索上下文多大」，用工具表里的对象，不要再写 \`[features] web_search_request\`：

\`\`\`toml
web_search = "cached"

[tools.web_search]
context_size = "medium"
allowed_domains = ["developers.openai.com", "learn.chatgpt.com"]
\`\`\`

官方参考：布尔形式的 \`[tools] web_search = true\` 仍能解析，但对象才能设 \`context_size\`（\`low\` / \`medium\` / \`high\`）、\`allowed_domains\`，以及可选的大概地理位置。搜索域名过滤**不是**沙箱命令的网络域名规则，也不限制连接器或 MCP。

\`--yolo\` 或满权限沙箱仍会把**模式**默认改成 live；域名白名单挡不住模式被抬成 live。不要靠这个对象给模型「断网」。改完新开会话。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["tools.web_search", "allowed_domains", "web_search"],
    related: ["web-search-modes", "network-proxy-not-apps", "permissions-not-sandbox-mode"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
    ],
  },
  {
    id: "shell-snapshot",
    no: 226,
    title: "命令环境像卡住：先关 shell_snapshot 再新开会话",
    summary: "稳定、默认开。它给反复执行做环境快照。刚 nvm use、刚装进 PATH 的工具找不到时，先关掉这个，不要去开 experimental_use_profile。",
    body: `默认 \`features.shell_snapshot = true\`。Codex 会拍一份当前 shell 环境，后面的命令复用，少做一次启动。这是稳定开关，不是实验特性。

刚在这个终端里 \`nvm use\`、改过 PATH、或刚装了 CLI，会话里却仍是旧 Node / 找不到新命令时，先关快照：

\`\`\`bash
codex features disable shell_snapshot
\`\`\`

或写进用户 config 后**新开**会话：

\`\`\`toml
[features]
shell_snapshot = false
\`\`\`

一次性：\`codex --disable shell_snapshot\` 或 \`codex -c features.shell_snapshot=false\`。只覆盖这一程。

这**不是** \`shell_environment_policy.experimental_use_profile\`。后者会在生成子进程时去跑用户 shell profile，默认关，实验性质。也不是 \`allow_login_shell\`：那个管 shell 工具能不能要 login shell。

要长期钉死 PATH，用 \`[shell_environment_policy] set\`，不要为了「让 nvm 生效」去 source 整份 rc。改完对照 \`codex features list\`。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["shell_snapshot", "features", "PATH"],
    related: ["features-list", "experimental-use-profile", "allow-login-shell-false"],
    sources: [
      {
        label: "OpenAI · Config basics",
        url: "https://learn.chatgpt.com/docs/config-file/config-basic",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "tool-suggest-disabled",
    no: 231,
    title: "关掉某条插件建议：写 tool_suggest.disabled_tools，不是卸载",
    summary: "[tool_suggest] 只管「要不要建议安装」。id 用 name@marketplace 或 connector_ 前缀。已经装上的插件不会被这条关掉。",
    body: `会话里老弹出「要不要装 Slack / Calendar」时，先关建议，不要先 \`plugin remove\`。官方键是 \`[tool_suggest]\`，条目必须带 \`type\` 和 \`id\`：

\`\`\`toml
[tool_suggest]
disabled_tools = [
  { type = "plugin", id = "slack@openai-curated" },
  { type = "plugin", id = "github@openai-curated-remote" },
  { type = "connector", id = "connector_googlecalendar" },
]
discoverables = [
  { type = "plugin", id = "linear@openai-curated" },
]
\`\`\`

\`type\` 只能是 \`plugin\` 或 \`connector\`。插件 id 用 \`name@marketplace\`；连接器 id 常见带 \`connector_\` 前缀。这**不会**停掉已经安装、已经启用的工具，只拦发现/建议安装。

整面关掉模型侧的安装建议：

\`\`\`bash
codex features list
codex features disable tool_suggest
\`\`\`

本机 \`features list\` 里没有 \`tool_suggest\` 就不要抄。它也不是 composer 里 \`$skill\` 自动完成的总开关。改完新开会话。不要把 \`features.plugins = false\` 当「少几点建议」——那是企业关整个插件面。远程目录仍在刷候选时，用 \`features.remote_plugin = false\`，不要和这条抄混。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["tool_suggest", "plugins", "/apps"],
    related: ["apps-not-plugins", "plugins-vs-skills", "remote-plugin-catalog"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "openai/codex#24011",
        url: "https://github.com/openai/codex/discussions/24011",
      },
    ],
  },
  {
    id: "remote-plugin-catalog",
    no: 232,
    title: "关掉远程插件目录：写 remote_plugin = false，不是 plugins = false",
    summary: "官方键是 remote_plugin（单数），稳定且默认开。只关远程目录，不卸本地和项目插件。不要写成已经作废的 remote_plugins。",
    body: `远程精选插件老往会话里塞、composer 一直冒远程候选时，先关远程目录，不要先 \`features.plugins = false\`。

\`\`\`toml
[features]
remote_plugin = false
\`\`\`

或持久化：

\`\`\`bash
codex features list
codex features disable remote_plugin
\`\`\`

键名是 \`remote_plugin\`，不是 \`remote_plugins\`。官方参考标稳定、默认开。关了之后远程目录不再发现 / 安装 / 更新；本机和项目 marketplace 里已经装上的插件还在。改完必须新开会话。

这比 \`[tool_suggest].disabled_tools\` 粗：后者只拦「要不要建议安装」某条；\`remote_plugin = false\` 关的是整份远程目录。只想安静某条 Slack / Calendar 建议，用 disabled_tools。

企业机要强制关掉，把同一键写进 \`requirements.toml\`，不要只写用户 config。\`features.plugin_sharing\` 是另一条：只在云托管 requirements 里关「把本机打的插件分享到工作区」，不是关远程目录。

给 \`openai-curated-remote\` 写 \`[plugins."name@openai-curated-remote"] enabled = false\` 目前经常拦不住注入（openai/codex#28443）。要停远程精选注入，用 \`remote_plugin = false\`，或企业层 \`features.plugins = false\`。

本机 \`features list\` 里没有 \`remote_plugin\` 就不要抄。官方没有「只关远程建议、本地发现完全不受影响」的细开关。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["plugins", "remote_plugin", "features"],
    related: ["tool-suggest-disabled", "plugin-sharing-workspace", "marketplace-allowed-sources"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "openai/codex#24011",
        url: "https://github.com/openai/codex/discussions/24011",
      },
      {
        label: "openai/codex#28443",
        url: "https://github.com/openai/codex/issues/28443",
      },
    ],
  },
  {
    id: "plugin-sharing-workspace",
    no: 234,
    title: "工作区分享插件：ChatGPT 里 Publish，企业关分享写 plugin_sharing",
    summary: "工作区管理员才可以把本机插件 Publish 给指定角色。这不会上架公共目录。CLI 分发仍走 marketplace。企业关掉写 requirements.toml。",
    body: `要把刚打好的本机插件给同事用，先分清三条路：

| 路径 | 做什么 | 给谁 |
| --- | --- | --- |
| ChatGPT Plugins → Personal → 三点菜单 → Publish | 发到当前 ChatGPT 工作区 | 你选的工作区角色 |
| \`codex plugin marketplace add\` | 仓库 / Git / 本地 marketplace | CLI 和桌面 |
| 公共 Plugins Directory | 提交门户审核 | 所有人 |

工作区 Publish **不会**进 ChatGPT / Codex 共用的公共插件目录。没登录这个工作区的账号看不到。给 CLI 同事用，走 marketplace，不要以为 Publish 了 \`codex plugin list\` 就会出现。

企业禁止把本机插件发进工作区，写云托管 \`requirements.toml\`，不要只写用户 \`config.toml\`：

\`\`\`toml
# requirements.toml，不是 ~/.codex/config.toml
features.plugin_sharing = false
\`\`\`

这不是 \`features.remote_plugin = false\`（关远程目录），也不是 \`features.plugins = false\`（关整个插件面）。用户层同名键管不了组织策略。

必须是工作区管理员才能 Publish。改完同事仍要在自己的客户端安装或刷新；CLI 侧 0.154 起当前会话通常会捡起新装工具。`,
    category: "config",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["plugins", "plugin_sharing", "企业"],
    related: ["remote-plugin-catalog", "marketplace-source-path-root", "marketplace-allowed-sources"],
    sources: [
      {
        label: "OpenAI · Package your plugin",
        url: "https://learn.chatgpt.com/plugins/build/plugins",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "windows-sandbox-private-desktop",
    no: 242,
    title: "Windows 沙箱默认进专用桌面，看不见窗口再关",
    summary: "elevated 和 unelevated 都默认 sandbox_private_desktop = true。沙箱 GUI 和 Computer Use 枚举不到交互桌面时才改 false，然后彻底退出 ChatGPT / Codex。",
    body: `原生 Windows 沙箱把最终的子进程放到专用桌面，不跟你的交互桌面 \`Winsta0\\Default\` 共用。\`elevated\` 和 \`unelevated\` 都这样。源码缺省是 \`true\`，\`config.toml\` 样例经常不写这个键，看起来像「没配」。

\`\`\`toml
[windows]
sandbox = "elevated"
# 默认就是 true，不必写。只有要兼容旧行为才关：
# sandbox_private_desktop = false
\`\`\`

专用桌面名字类似 \`Winsta0\\CodexSandboxDesktop-...\`。沙箱里启动的记事本、安装向导你看不到、截不到，这是 UI 隔离，不是沙箱坏了。不要为了让窗口弹到你面前就把键关掉。

该关的情况：Computer Use 的 \`list_windows\` / EnumWindows 找到 0 个窗口，或必须跑在交互桌面的旧工具。这时才写：

\`\`\`toml
[windows]
sandbox = "elevated"
sandbox_private_desktop = false
\`\`\`

写进 \`%USERPROFILE%\\.codex\\config.toml\`。改完退出所有 \`ChatGPT.exe\` 和 Codex 进程再开；只新开会话不够，专用桌面和管道是桌面应用进程建的。关了以后文件系统和防火墙边界还在，只是放弃同一桌面的窗口隔离。

这修不了 OpenSSH Session 0 里 elevated 引导失败。引导进程还没起来时，改这个键没用。企业要钉死，写云托管 \`requirements.toml\` 的 \`[windows] sandbox_private_desktop\`，不是只写用户 config。\`allowed_sandbox_implementations\` 只管 elevated / unelevated，不管桌面。`,
    category: "sandbox",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["Windows", "sandbox", "Computer Use"],
    related: ["windows-elevated-sandbox", "computer-use-windows-allowlist", "permissions-not-sandbox-mode"],
    sources: [
      {
        label: "OpenAI · Windows sandbox",
        url: "https://learn.chatgpt.com/docs/windows/windows-sandbox",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "openai/codex#37043",
        url: "https://github.com/openai/codex/issues/37043",
      },
    ],
  },
  {
    id: "apps-default-policy",
    no: 243,
    title: "连接器策略写 [apps._default]，不要抄 [plugins]",
    summary: "已装连接器的开关、破坏性工具和开放世界工具走 apps._default 和 apps.id。这不是插件键，也不走 network_proxy。带斜杠的工具名必须加引号。",
    body: `\`/apps\` 插进提示的是连接器。本机策略写在 \`[apps]\`，不是 \`[plugins]\`，也不是 \`[mcp_servers]\`。

全站默认用带下划线的 \`_default\`：

\`\`\`toml
[apps._default]
enabled = true
destructive_enabled = false
open_world_enabled = false
default_tools_approval_mode = "prompt"
approvals_reviewer = "user"
\`\`\`

写成 \`[apps.default]\` 不会当默认档。省略 \`approvals_reviewer\` 时继承顶层 \`approvals_reviewer\`。

单台覆盖、以及带 \`/\` 的工具名：

\`\`\`toml
[apps.google_drive]
enabled = true
destructive_enabled = false
default_tools_approval_mode = "prompt"

[apps.google_drive.tools."files/delete"]
enabled = false
approval_mode = "approve"
\`\`\`

工具 id 含斜杠时，表头必须加引号，否则 TOML 会拆成嵌套表。\`destructive_enabled\` 管声明了 \`destructive_hint\` 的工具；\`open_world_enabled\` 管 \`open_world_hint\`。审批取值和 MCP 一样：\`auto\`、\`prompt\`、\`writes\`、\`approve\`。

本机 \`enabled = true\` 救不回工作区管理员在 Workspace apps 里关掉的连接器。插件捆里若带了连接器，仍要在工作区给这个连接器授权，装插件不等于连上了服务。

整面关掉连接器：

\`\`\`toml
[features]
apps = false
\`\`\`

官方标稳定、默认开。\`network_proxy\` 不管 Apps 出站。只想少看见「要不要装 Calendar」建议，用 \`[tool_suggest] disabled_tools\`，那条不关已经连上的工具。`,
    category: "config",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["apps", "连接器", "config.toml"],
    related: ["apps-not-plugins", "network-proxy-not-apps", "tool-suggest-disabled"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "OpenAI · Sample configuration",
        url: "https://learn.chatgpt.com/docs/config-file/config-sample",
      },
      {
        label: "OpenAI · Apps and connectors",
        url: "https://learn.chatgpt.com/docs/enterprise/apps-and-connectors",
      },
    ],
  },
  {
    id: "desktop-wsl-codex-app-transport",
    no: 247,
    title: "桌面开 WSL 报 invalid transport in mcp_servers.codex_app 时，先别改用户 MCP",
    summary: "桌面 26.820.x 在 WSL 代理路径会注入残缺的内部服务器 codex_app，常常只有 enabled 或 enabled_tools，没有 command 或 url。报错让你修 config.toml，用户文件里通常没有这张表。关捆绑插件无效。可靠权宜是改成 Windows 原生代理并彻底重启。",
    body: `Windows 桌面把 Agent environment 切到 WSL，或用户 config 写了：

\`\`\`toml
[desktop]
runCodexInWindowsSubsystemForLinux = true
\`\`\`

之后新开、恢复线程都失败，文案类似：ChatGPT can't load config.toml，invalid transport in \`mcp_servers.codex_app\`。先看 About Codex 的版本。这是桌面 26.820.x 在 WSL app-server 路径上的注入问题，不是你手写 MCP 写错。有人报告后续桌面构建已经能开线程；先走商店或应用内更新，彻底退出所有 ChatGPT / Codex 进程再开，试一条**新**线程。

用户、项目、WSL 家目录的 \`config.toml\` 里经常根本没有 \`[mcp_servers.codex_app]\`。桌面在 \`thread/start\` 和 \`thread/resume\` 里注入内部服务器 \`codex_app\`（来自捆绑插件 \`codex-app-tools\`）。Windows 原生路径会带上 \`cmd.exe\` 启动块；WSL 路径常常只剩下 \`enabled\` 或 \`enabled_tools\`。加载器按「没有 \`command\` 也没有 \`url\`」判 invalid transport，整条线程起不来。

不要做这些：

- 不要在 WSL 侧 config 手抄 \`command = "cmd.exe"\` 和 \`.cmd\` 启动脚本。Linux app-server 解析不了这条 Windows 传输。
- 不要写 \`[plugins."codex-app-tools@openai-bundled"] enabled = false\` 当修复。请求级注入不会停，有人还看到桌面把插件写回启用。
- 不要为了消报错去改无关的 \`mcp_servers\`，或清空 \`~/.codex\`。
- 不要包一层 WSL app-server、改安装目录里的脚本。

需要立刻能开线程时，改成 Windows 原生代理：

\`\`\`toml
[desktop]
runCodexInWindowsSubsystemForLinux = false
\`\`\`

也可以在 Settings 里把 Agent environment 切回 Windows native。改完必须彻底退出再开，只新开会话不够。这会换执行环境，不是把 WSL 修好了。仓库在 Linux 家目录、依赖 Linux 工具链时，原生代理可能打不开同一份路径；这时用 WSL 里的 CLI，或 IDE 扩展的 \`chatgpt.runCodexInWindowsSubsystemForLinux\`（和桌面 \`[desktop]\` 键不是同一个开关）。

macOS 上同一句 invalid transport 常常是另一件事（例如临时目录权限），不要把这条 WSL 权宜抄过去。对照本机 About Codex：桌面已经能在 WSL 下开新线程，就不要再关 WSL 代理。`,
    category: "config",
    level: "intermediate",
    surfaces: ["app", "cli", "ide"],
    tags: ["Windows", "WSL", "MCP", "桌面"],
    related: ["windows-app-wsl-home-split", "desktop-wsl-user-mcp", "desktop-project-mcp"],
    sources: [
      {
        label: "openai/codex#40819",
        url: "https://github.com/openai/codex/issues/40819",
      },
      {
        label: "openai/codex#40910",
        url: "https://github.com/openai/codex/issues/40910",
      },
      {
        label: "OpenAI · ChatGPT desktop app for Windows",
        url: "https://learn.chatgpt.com/docs/windows/windows-app",
      },
    ],
  },
  {
    id: "toml-windows-path-quotes",
    no: 253,
    title: "Windows 路径写进 TOML 要用单引号或正斜杠",
    summary:
      "双引号里的反斜杠是转义。未转义的盘符路径会让整份 config.toml 解析失败，商店版桌面卡在启动页、没有明确报错。改用单引号、正斜杠，或把每个反斜杠写成两个。",
    body: `商店版桌面能开窗口，却一直停在加载页，重装、修复都没用：先看 \`%USERPROFILE%\\.codex\\config.toml\` 里有没有双引号包着的 Windows 路径，不要先清整个 Codex 目录。

TOML 双引号把 \`\\\` 当转义。\`\\n\` 变成换行，\`\\t\` 变成制表符，\`\\d\`、\`\\P\`、\`\\U\` 这类非法序列直接让整份配置加载失败。日志类似：

\`\`\`text
failed to reload config: C:\\Users\\you\\.codex\\config.toml:150:77:
missing escaped value, expected b, e, f, n, r, \\, ", x, u, U
\`\`\`

桌面这边往往没有把这行展示出来，\`config/read\`、插件列表、Windows 沙箱初始化一起卡住，看起来像应用坏了。CLI 用 \`codex --strict-config\` 或 \`codex mcp list\` 会更快暴露同一处语法错误。

三种写法都可以：

\`\`\`toml
# 推荐：单引号，反斜杠按字面保存
command = 'C:\\Users\\you\\mcp-server\\start.ps1'

# 正斜杠，Node / PowerShell -File 都认
command = "C:/Users/you/mcp-server/start.ps1"

# 双引号就必须把每个反斜杠写成两个
command = "C:\\\\Users\\\\you\\\\mcp-server\\\\start.ps1"
\`\`\`

不要写 \`command = "C:\\Users\\you\\start.ps1"\` 这种未转义双引号。能交给 \`codex mcp add\` 的服务器，让 CLI 写 TOML，不要手抄资源管理器路径。这和 invalid transport、stderr 管道堵死不是同一件事：配置文件根本没解析成功，MCP 进程还没启动。改完必须彻底退出 ChatGPT / Codex 再开。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["TOML", "Windows", "MCP", "config.toml"],
    related: [
      "debug-config-strict",
      "desktop-wsl-codex-app-transport",
      "windows-mcp-stderr-pipe",
    ],
    sources: [
      {
        label: "openai/codex#37616",
        url: "https://github.com/openai/codex/issues/37616",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "MCP Directory · Codex Windows MCP fixes",
        url: "https://mcp.directory/blog/codex-mcp-windows-fix-guide-2026",
      },
    ],
  },
];
