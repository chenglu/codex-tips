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
2. 从仓库根走向 cwd 的项目 \`.codex/config.toml\`（靠近的赢）
3. 选中的 profile 文件
4. 用户配置
5. 系统 \`/etc/codex/config.toml\`
6. 内置默认

CLI、IDE 扩展和桌面 App 共用这些层。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["优先级", "config.toml", "profile"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["profile-files-not-tables", "project-config-trust"],
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
    related: ["project-config-trust"],
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
web_search = "cached"   # 默认，省、快
# web_search = "live"
# web_search = "disabled"
\`\`\`

一次性：

\`\`\`bash
codex --search "核对官方文档里 sandbox 的当前默认值"
\`\`\`

不要为了省事全程 live——更慢、更贵，还容易把过时博客和官方文档混在一起。需要事实时，在提示里要求引用官方 URL。`,
    category: "config",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["web_search", "--search", "文档"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
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

\`file_opener\` 决定 TUI 里打开路径时跳到哪。设错会启动你不用的编辑器。`,
    category: "config",
    level: "starter",
    surfaces: ["cli"],
    tags: ["file_opener", "personality", "TUI"],
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
    related: ["protected-dirs", "yolo-isolated-only"],
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
];
