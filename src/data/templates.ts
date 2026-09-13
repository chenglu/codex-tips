import type { Template } from "../types";

export const templates: Template[] = [
  {
    id: "agents-md",
    title: "仓库 AGENTS.md",
    filename: "AGENTS.md",
    summary: "短、可验证、带禁止事项。按你们真实的命令改，不要直接提交脚手架。",
    code: `# AGENTS.md

## 仓库地图
- \`src/\` 应用代码
- \`tests/\` 集成测试；单测挨着实现文件
- \`infra/\` 不要在功能任务里改

## 命令
- 安装：\`pnpm install\`
- 类型检查：\`pnpm typecheck\`
- 单测：\`pnpm test\`
- lint：\`pnpm lint\`

## 约定
- 公共 API 变更必须更新 \`docs/\` 和调用方
- 优先最小 diff；不要顺手重构
- 包管理器只用 pnpm

## 禁止
- 不要改生成的迁移，除非任务就是迁移
- 不要提交密钥、\`.env\`、\`auth.json\`
- 实现任务中不要改测试来迁就实现

## 完成定义
- 相关测试通过
- typecheck 与 lint 干净
- 用中文写清为什么这样改
`,
  },
  {
    id: "agents-override",
    title: "本机 AGENTS.override.md",
    filename: "AGENTS.override.md",
    summary: "临时或本机规则。加入 .gitignore，不要提交。",
    code: `# AGENTS.override.md
# 本机实验。完成后删除本文件。

## 本机会话
- 回答用简体中文
- 提交信息用约定式中文
- 不要碰 ~/dotfiles
`,
  },
  {
    id: "user-config",
    title: "个人 config.toml",
    filename: "~/.codex/config.toml",
    summary: "个人默认。模型、推理、沙箱、搜索。项目不要覆盖鉴权键。",
    code: `model = "gpt-5.6-sol"
model_reasoning_effort = "medium"
plan_mode_reasoning_effort = "high"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
# allow_login_shell = false  # 本机加固；远端靠 login shell 找 nvm 时不要关
web_search = "cached"
personality = "pragmatic"
file_opener = "cursor"
project_doc_max_bytes = 65536
project_doc_fallback_filenames = ["TEAM_GUIDE.md", "CLAUDE.md"]

[features]
codex_hooks = true
multi_agent = true

[agents]
enabled = true
max_threads = 4
max_depth = 1
`,
  },
  {
    id: "fast-profile",
    title: "fast profile",
    filename: "~/.codex/fast.config.toml",
    summary: "独立文件，不是 [profiles.fast]。启动：codex --profile fast",
    code: `# ~/.codex/fast.config.toml
model = "gpt-5.6-luna"
model_reasoning_effort = "low"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
web_search = "disabled"
`,
  },
  {
    id: "deep-profile",
    title: "deep-review profile",
    filename: "~/.codex/deep-review.config.toml",
    summary: "规划与审查用更高推理。实现阶段仍可回默认。",
    code: `# ~/.codex/deep-review.config.toml
model = "gpt-5.6-sol"
model_reasoning_effort = "high"
plan_mode_reasoning_effort = "xhigh"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
`,
  },
  {
    id: "reviewer-agent",
    title: "审查子代理",
    filename: ".codex/agents/reviewer.toml",
    summary: "只读审查者。标问题，默认不改代码。",
    code: `name = "reviewer"
description = "在合并前审查正确性、安全、缺失测试和意外 API 变化。"
developer_instructions = """
像 owner 一样审这份 diff。
先报真实风险，再是缺失测试，再是风格。
标出问题但不要修改文件，除非用户明确要求你修。
引用具体文件和行。
"""
sandbox_mode = "read-only"
model_reasoning_effort = "high"
`,
  },
  {
    id: "skill-md",
    title: "最小 SKILL.md",
    filename: ".agents/skills/release-notes/SKILL.md",
    summary: "description 决定它会不会被发现。写何时用、用户会说的话。",
    code: `---
name: release-notes
description: >
  当用户要求写 changelog、release notes 或面向用户的更新说明时使用。
  触发短语：「写更新说明」「changelog」「这周发了什么」。
---

# Release notes

## 何时用
用户要把 git 历史变成面向用户的说明。

## 步骤
1. 读取请求的范围（标签、日期、PR）
2. 把提交按用户可见变化分组
3. 省略内部重构，除非影响行为
4. 用简体中文输出：新功能 / 修复 / 破坏性变更
`,
  },
  {
    id: "gitignore",
    title: ".gitignore 片段",
    filename: ".gitignore",
    summary: "覆盖文件、本机日志、会话导出不要进仓库。",
    code: `AGENTS.override.md
**/AGENTS.override.md
.codex-log/
.codex/*.local.toml
`,
  },
  {
    id: "github-action",
    title: "GitHub Action 审查作业",
    filename: ".github/workflows/codex-review.yml",
    summary: "官方 openai/codex-action。提示进仓库文件，密钥走代理。prompt 和 prompt-file 不要同时写。",
    code: `name: Codex pull request review
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  codex:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v5
        with:
          persist-credentials: false

      - uses: openai/codex-action@v1
        with:
          openai-api-key: \${{ secrets.OPENAI_API_KEY }}
          prompt-file: .github/codex/prompts/review.md
          output-file: codex-output.md
          sandbox: workspace-write
          codex-args: '["--ephemeral"]'
`,
  },
  {
    id: "ssh-host-alias",
    title: "给 Codex 发现的 SSH Host",
    filename: "~/.ssh/config",
    summary: "桌面 Connections 只读具体别名，忽略 Host *。远端 login shell 的 PATH 里要有 codex。",
    code: `Host devbox
  HostName devbox.example.com
  User you
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
`,
  },
  {
    id: "codex-security-ci",
    title: "Codex Security PR 扫描",
    filename: ".github/workflows/codex-security.yml",
    summary: "在 checkout 外安装 CLI。密钥只给扫描进程。fork 和 Dependabot 不要带密钥。",
    code: `name: Codex Security scan
on:
  pull_request:

jobs:
  codex-security:
    if: github.event.pull_request.head.repo.full_name == github.repository && github.actor != 'dependabot[bot]'
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write
    steps:
      - uses: actions/setup-node@v7
        with:
          node-version: "26"
      - uses: actions/setup-python@v7
        with:
          python-version: "3.14"
      - name: Install Codex Security
        run: |
          npm install --prefix "$RUNNER_TEMP/codex-security" --ignore-scripts --no-audit --no-fund @openai/codex-security
      - uses: actions/checkout@v7
        with:
          ref: \${{ github.event.pull_request.head.sha }}
          fetch-depth: 0
          persist-credentials: false
      - name: Scan the pull request
        env:
          OPENAI_API_KEY: \${{ secrets.CODEX_SECURITY_API_KEY }}
          CODEX_SECURITY_BIN: \${{ runner.temp }}/codex-security/node_modules/.bin/codex-security
          CODEX_SECURITY_STATE_DIR: \${{ runner.temp }}/codex-security-state
          SCAN_DIR: \${{ runner.temp }}/codex-security-results
        run: |
          BASE_REVISION="$(git merge-base "\${{ github.event.pull_request.base.sha }}" "\${{ github.event.pull_request.head.sha }}")"
          "$CODEX_SECURITY_BIN" scan . --diff "$BASE_REVISION" --head "\${{ github.event.pull_request.head.sha }}" --auth api-key --output-dir "$SCAN_DIR" --json > "$RUNNER_TEMP/codex-security.json"
`,
  },
  {
    id: "allow-local-binding",
    title: "本机服务的权限档网络",
    filename: "~/.codex/config.toml",
    summary: "先精确放行 localhost。只有主机名会解析到私网时才打开 allow_local_binding。必须同时开 network_proxy。",
    code: `default_permissions = "project-edit"

[features]
network_proxy = true

[permissions.project-edit]
extends = ":workspace"

[permissions.project-edit.network]
enabled = true
# allow_local_binding = true  # 仅当 allow 的主机名会解析到私网 / 回环时再开

[permissions.project-edit.network.domains]
"localhost" = "allow"
"127.0.0.1" = "allow"
`,
  },
  {
    id: "permission-profile-workspace-read",
    title: "自定义权限档必须能读工作区",
    filename: "~/.codex/config.toml",
    summary: "读不到 AGENTS.md 会让会话起不来，还可能误报 sessions corrupt。从 :workspace 扩展，不要只给别处写。",
    code: `default_permissions = "code-write"

[permissions.code-write]
extends = ":workspace"

[permissions.code-write.filesystem.":workspace_roots"]
"." = "write"

# 只要会话、不要项目指令时才用：
# project_doc_max_bytes = 0
`,
  },
  {
    id: "windows-deny-read-exact",
    title: "Windows deny-read 用精确目录",
    filename: "~/.codex/config.toml",
    summary: "不要写 Chrome/**。目录 deny 覆盖子树，避免 glob 展开撑爆沙箱 helper。",
    code: `default_permissions = "managed_net"

[permissions.managed_net]
extends = ":workspace"

[permissions.managed_net.filesystem]
glob_scan_max_depth = 3
":workspace_roots" = { "." = "write" }
"~/AppData/Local/Google/Chrome" = "deny"
"/absolute/path/to/secrets" = "deny"
`,
  },
  {
    id: "mcp-oauth-callback",
    title: "MCP OAuth 回调",
    filename: "~/.codex/config.toml",
    summary:
      "无端口 127.0.0.1 才会插入监听端口。localhost 或已带端口的 URL 不会替换。登记 add 打印的完整 URL（含 callback ID），不要只登基址。",
    code: `mcp_oauth_callback_port = 5555

[mcp_servers.example]
url = "https://mcp.example.com"

[mcp_servers.example.oauth]
client_id = "my-client"
callback_url = "http://127.0.0.1:5555/callback"
callback_port = 5555
`,
  },
  {
    id: "mcp-tool-hook",
    title: "mcp_tool 补丁扫描钩子",
    filename: ".codex/hooks.json",
    summary: "PostToolUse 直接调已连接 MCP。服务器必须先 mcp add。缺服务器不会拦住操作。",
    code: `{
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
`,
  },
  {
    id: "managed-hooks-only",
    title: "企业只要托管钩子",
    filename: "requirements.toml",
    summary: "只能写在 requirements.toml。用户 config.toml 里的同名键会被忽略。脚本要 MDM 自己分发。",
    code: `allow_managed_hooks_only = true

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
command_windows = 'py -3 C:\\enterprise\\hooks\\pre_tool_use_policy.py'
timeout = 30
statusMessage = "Checking managed Bash command"
`,
  },
  {
    id: "session-end-hook",
    title: "SessionEnd 清理钩子",
    filename: "~/.codex/config.toml",
    summary: "默认 1 秒、上限 3 秒。切走对话不会立刻触发。不要用 mcp_tool。",
    code: `[[hooks.SessionEnd]]
matcher = "other"

[[hooks.SessionEnd.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/session_end.py"'
timeout = 3
statusMessage = "Saving session notes"
`,
  },
  {
    id: "plugin-mcp-exec-key",
    title: "插件 MCP 审批键",
    filename: "~/.codex/config.toml",
    summary: "必须带 marketplace 后缀。少了 @ 会导致 exec 报 user cancelled。",
    code: `[plugins."inspect-skills@meridian"]
enabled = true

[plugins."inspect-skills@meridian".mcp_servers."py-repl"]
enabled = true
default_tools_approval_mode = "approve"
`,
  },
  {
    id: "tui-animations-off",
    title: "关掉 TUI 动画",
    filename: "~/.codex/config.toml",
    summary: "关掉欢迎闪烁和转圈。已有 [tui] 就只加键。必须新开会话。",
    code: `[tui]
animations = false
terminal_title = ["project"]
`,
  },
  {
    id: "subagent-start-hook",
    title: "SubagentStart 注入子代理上下文",
    filename: "~/.codex/config.toml",
    summary: "matcher 对 agent_type。continue:false 拦不住启动。内部 Review/Compact 不跑这个事件。",
    code: `[[hooks.SubagentStart]]
matcher = "reviewer"

[[hooks.SubagentStart.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/subagent_start.py"'
timeout = 10
statusMessage = "Loading reviewer context"
`,
  },
  {
    id: "interrupt-hook",
    title: "Interrupt 打断清理钩子",
    filename: "~/.codex/config.toml",
    summary: "Esc 打断顶层轮才跑。默认 1 秒、上限 3 秒。不要抄 600 秒超时。",
    code: `[[hooks.Interrupt]]

[[hooks.Interrupt.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/on_interrupt.py"'
timeout = 2
statusMessage = "Saving interrupted turn"
`,
  },
  {
    id: "tui-alternate-screen",
    title: "关掉 TUI 备用屏",
    filename: "~/.codex/config.toml",
    summary: "tmux / Zellij 要滚动回放时用 never。已有 [tui] 就只加键。",
    code: `[tui]
alternate_screen = "never"
`,
  },
  {
    id: "tui-auto-recap",
    title: "关掉自动 recap",
    filename: "~/.codex/config.toml",
    summary: "只关自动摘要。手动 /recap 仍可用。已有 [tui] 就只加键。",
    code: `[tui]
auto_recap = false
`,
  },
  {
    id: "tui-disable-paste-burst",
    title: "关掉 TUI 突发粘贴检测",
    filename: "~/.codex/config.toml",
    summary: "写进 [tui]。顶层 disable_paste_burst 只是回退。改完新开会话。",
    code: `[tui]
disable_paste_burst = true
`,
  },
  {
    id: "pretooluse-updated-input",
    title: "PreToolUse 改写工具输入",
    filename: "pre_tool_use_rewrite.json",
    summary: "必须 permissionDecision allow。Bash 和 apply_patch 要 command 字符串。",
    code: `{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "updatedInput": {
      "command": "echo rewritten"
    }
  }
}
`,
  },
  {
    id: "model-catalog-json",
    title: "本地模型目录",
    filename: "~/.codex/config.toml",
    summary: "覆盖内置和远程目录，不是合并。改完退出进程。先 debug models --bundled。",
    code: `model_catalog_json = "/home/you/.codex/model-catalog.json"
model = "your-model-slug"

# 先 dump 再改 JSON：
#   codex debug models --bundled
#   codex debug models
`,
  },
  {
    id: "http-headers-helper",
    title: "MCP 动态 HTTP 头",
    filename: "~/.codex/config.toml",
    summary: "本机 HTTP 才支持。命令打印 JSON 头。不要把令牌写进仓库。",
    code: `[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
http_headers_helper = "python3 /home/you/.codex/mcp-headers.py"
`,
  },
  {
    id: "otel-user-config",
    title: "用户级 OpenTelemetry",
    filename: "~/.codex/config.toml",
    summary: "项目文件里的 otel 会被忽略。关掉默认 statsig。endpoint 要带信号路径。",
    code: `[otel]
environment = "dev"
log_user_prompt = false
metrics_exporter = "none"

[otel.exporter.otlp-http]
endpoint = "http://127.0.0.1:4318/v1/logs"
protocol = "binary"

[otel.trace_exporter.otlp-http]
endpoint = "http://127.0.0.1:4318/v1/traces"
protocol = "binary"
`,
  },
  {
    id: "exec-mcp-optional-grace",
    title: "exec 等待可选 MCP",
    filename: "~/.codex/config.toml",
    summary: "exec 只拍一次工具表。必用的服务器标 required，或把宽限改成 0。",
    code: `mcp_optional_startup_grace_ms = 0

[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
required = true
startup_timeout_sec = 20
`,
  },
  {
    id: "project-root-markers",
    title: "项目根标记",
    filename: "~/.codex/config.toml",
    summary: "默认找 .git。空列表把 cwd 当根，不再往上搜。",
    code: `project_root_markers = [".git", ".hg", ".sl"]

# 只要当前目录：
# project_root_markers = []
`,
  },
  {
    id: "hide-agent-reasoning",
    title: "藏推理事件",
    filename: "~/.codex/config.toml",
    summary: "CI 日志太吵时开。不改变模型怎么想。排错时关掉。",
    code: `hide_agent_reasoning = true
`,
  },
  {
    id: "history-persistence",
    title: "提示历史",
    filename: "~/.codex/config.toml",
    summary: "none 不写 history.jsonl。max_bytes 只裁这份文件，不管 sessions/。",
    code: `[history]
persistence = "none"
# persistence = "save-all"
# max_bytes = 104857600
`,
  },
  {
    id: "analytics-enabled",
    title: "关掉本机分析",
    filename: "~/.codex/config.toml",
    summary: "CLI、桌面、IDE 一起关。不是 [otel]。",
    code: `[analytics]
enabled = false
`,
  },
  {
    id: "model-verbosity",
    title: "回复详细度",
    filename: "~/.codex/config.toml",
    summary: "只对 Responses API 生效。Chat Completions 网关会忽略。",
    code: `model_verbosity = "low"
`,
  },
  {
    id: "model-instructions-file",
    title: "替换内置指令",
    filename: "~/.codex/config.toml",
    summary: "换掉模型自带 base instructions。仓库约定仍写 AGENTS.md。",
    code: `model_instructions_file = "/home/you/.codex/base-instructions.txt"
`,
  },
  {
    id: "feedback-enabled",
    title: "关掉反馈入口",
    filename: "~/.codex/config.toml",
    summary: "关 /feedback。不是 [analytics]。",
    code: `[feedback]
enabled = false
`,
  },
  {
    id: "oss-provider",
    title: "默认本地 OSS 供应商",
    filename: "~/.codex/config.toml",
    summary: "只在 --oss 时生效。项目 .codex 改不了供应商。",
    code: `oss_provider = "ollama"
`,
  },
  {
    id: "model-reasoning-summary",
    title: "关掉推理摘要",
    filename: "~/.codex/config.toml",
    summary: "管思维链摘要粗细。个别模型会拒绝 none / concise。",
    code: `model_reasoning_summary = "none"
`,
  },
  {
    id: "sqlite-home",
    title: "把 SQLite 状态库迁走",
    filename: "~/.codex/config.toml",
    summary: "用绝对路径。相对路径按 cwd 解析。",
    code: `sqlite_home = "/home/you/codex-sqlite"
`,
  },
  {
    id: "notify-external-command",
    title: "外部完成通知",
    filename: "~/.codex/config.toml",
    summary: "顶层键，写在所有 [table] 之前。JSON 走第一个参数。",
    code: `notify = ["python3", "/home/you/.codex/notify.py"]
`,
  },
  {
    id: "codex-agents-dashboard",
    title: "打开任务面板的快捷键",
    filename: "~/.codex/config.toml",
    summary: "默认 Alt+A。已有自定义 alt-a 时新默认会让路。",
    code: `[tui.keymap.global]
open_agents = "alt-a"
`,
  },
  {
    id: "compact-prompt-local-only",
    title: "本地压缩提示",
    filename: "~/.codex/config.toml",
    summary: "默认 OpenAI 远程压缩会忽略。OSS 或本地压缩路径才生效。",
    code: `compact_prompt = """
保留当前任务、改过的文件路径、决策理由和阻塞项。
"""
`,
  },
  {
    id: "features-undo",
    title: "打开会话内撤销",
    filename: "~/.codex/config.toml",
    summary: "稳定但默认关。只还原工作区，不还原聊天。",
    code: `[features]
undo = true
`,
  },
  {
    id: "codex-git-commit-attribution",
    title: "给 Codex 提交加共同作者",
    filename: "~/.codex/config.toml",
    summary: "开发中、默认关。键值只写身份，不要带 Co-authored-by 前缀。",
    code: `[features]
codex_git_commit = true

commit_attribution = "Codex <noreply@openai.com>"
`,
  },
  {
    id: "exec-thread-source",
    title: "给 exec 线程标来源",
    filename: "ci.sh",
    summary: "新建或 fork 时标注。resume 不改已保存来源。",
    code: `codex exec --thread-source automated_review \\
  --sandbox workspace-write --ask-for-approval never \\
  "对照 main 做审查，只输出风险。"
`,
  },
  {
    id: "developer-instructions-append",
    title: "追加个人 developer 说明",
    filename: "~/.codex/config.toml",
    summary: "写在所有表之前。不是 AGENTS.md，也不替换内置指令。",
    code: `developer_instructions = """
回答用简体中文。先给结论和风险，再给步骤。
"""
`,
  },
  {
    id: "update-plan-opt-in",
    title: "打开规划工具",
    filename: "~/.codex/config.toml",
    summary: "0.152 起默认关。和 /plan 不是同一件事。",
    code: `[tools.update_plan]
enabled = true
`,
  },
  {
    id: "tool-output-token-limit",
    title: "限制单次工具输出进历史",
    filename: "~/.codex/config.toml",
    summary: "顶层键。调完新开会话。不要和 MCP 单工具上限抄混。",
    code: `tool_output_token_limit = 8000
`,
  },
  {
    id: "background-terminal-max-timeout",
    title: "后台空轮询上限",
    filename: "~/.codex/config.toml",
    summary: "默认 300000。这是上限不是间隔。exec_command 首轮不读。",
    code: `background_terminal_max_timeout = 300000
`,
  },
  {
    id: "check-for-update-on-startup",
    title: "关掉 CLI 启动更新检查",
    filename: "~/.codex/config.toml",
    summary: "顶层键。不是自动安装。桌面更新另走 requirements.toml。",
    code: `check_for_update_on_startup = false
`,
  },
  {
    id: "skill-max-context-tokens",
    title: "技能目录预算",
    filename: "~/.codex/config.toml",
    summary: "先禁用不用的技能。显式值上限 10000。改完重启。",
    code: `[[skills.config]]
path = "/home/you/.agents/skills/noisy/SKILL.md"
enabled = false

[skills]
max_context_tokens = 8000
`,
  },
  {
    id: "suppress-unstable-features-warning",
    title: "关掉开发中特性警告",
    filename: "~/.codex/config.toml",
    summary: "顶层键。写进 [notice] 不会生效。关警告不等于特性可用。",
    code: `suppress_unstable_features_warning = true
`,
  },
  {
    id: "tools-web-search-object",
    title: "限制网页搜索域名",
    filename: "~/.codex/config.toml",
    summary: "顶层键管模式。对象管域名和 context_size。不管 MCP。",
    code: `web_search = "cached"

[tools.web_search]
context_size = "medium"
allowed_domains = ["developers.openai.com", "learn.chatgpt.com"]
`,
  },
  {
    id: "cli-auth-credentials-store",
    title: "CLI 登录缓存存储",
    filename: "~/.codex/config.toml",
    summary: "顶层键。keyring 没有可拷的 auth.json。不是 exec --ephemeral。",
    code: `cli_auth_credentials_store = "keyring"
`,
  },
  {
    id: "mcp-oauth-credentials-store",
    title: "MCP OAuth 凭据存储",
    filename: "~/.codex/config.toml",
    summary: "默认 auto。文件回退是 .credentials.json，不是 auth.json。没有 ephemeral。",
    code: `mcp_oauth_credentials_store = "keyring"
`,
  },
  {
    id: "mcp-http-auth-chatgpt",
    title: "HTTP MCP 的 auth 回退",
    filename: "~/.codex/config.toml",
    summary: "默认 oauth。chatgpt 只给与 chatgpt_base_url 同源的主机。第三方不要开。",
    code: `[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
auth = "oauth"
`,
  },
  {
    id: "mcp-oauth-resource",
    title: "MCP OAuth resource 参数",
    filename: "~/.codex/config.toml",
    summary: "只对 streamable HTTP。stdio 写了不会进授权 URL。改完重新 mcp login。",
    code: `[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
oauth_resource = "https://docs.example.com/"
`,
  },
  {
    id: "forced-login-method",
    title: "强制登录方式和 ChatGPT 工作区",
    filename: "~/.codex/config.toml",
    summary: "顶层键。不符会登出退出。不要写进仓库给别人「建议」。",
    code: `forced_login_method = "chatgpt"
forced_chatgpt_workspace_id = "00000000-0000-0000-0000-000000000000"
`,
  },
  {
    id: "mcp-oauth-scopes",
    title: "MCP OAuth scopes 回退列表",
    filename: "~/.codex/config.toml",
    summary: "只对 streamable HTTP。顺序是 --scopes、本表、广告 scopes_supported。改完重新 mcp login。",
    code: `[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
scopes = ["read:docs"]
`,
  },
  {
    id: "shell-snapshot",
    title: "关掉默认的 shell 环境快照",
    filename: "~/.codex/config.toml",
    summary: "稳定、默认开。刚改 PATH 后命令仍旧时关掉并新开会话。",
    code: `[features]
shell_snapshot = false
`,
  },
  {
    id: "experimental-use-profile",
    title: "不要默认打开 experimental_use_profile",
    filename: "~/.codex/config.toml",
    summary: "实验键。钉 PATH 用 set，不要 source 整份 rc。",
    code: `[shell_environment_policy]
experimental_use_profile = false
set = { PATH = "/usr/bin:/usr/local/bin" }
`,
  },
  {
    id: "marketplace-allowed-sources",
    title: "企业限制 marketplace 源",
    filename: "requirements.toml",
    summary: "只能写在 requirements.toml。官方精选仓也要显式放行。不管网页和 IDE 扩展。",
    code: `[marketplaces]
restrict_to_allowed_sources = true

[marketplaces.allowed_sources.company_plugins]
source = "git"
url = "https://github.com/example/company-plugins.git"
ref = "main"

[marketplaces.allowed_sources.openai_curated]
source = "git"
url = "https://github.com/openai/plugins.git"
`,
  },
  {
    id: "tool-suggest-disabled",
    title: "关掉某条插件安装建议",
    filename: "~/.codex/config.toml",
    summary: "只管建议，不卸载已装插件。id 用 name@marketplace。",
    code: `[tool_suggest]
disabled_tools = [
  { type = "plugin", id = "slack@openai-curated" },
  { type = "connector", id = "connector_googlecalendar" },
]
`,
  },
  {
    id: "remote-plugin-catalog",
    title: "关掉远程插件目录",
    filename: "~/.codex/config.toml",
    summary: "只关远程目录。本地和项目插件还在。企业强制写 requirements.toml。",
    code: `[features]
remote_plugin = false
`,
  },
  {
    id: "plugin-sharing-workspace",
    title: "企业关掉工作区插件分享",
    filename: "requirements.toml",
    summary: "只在云托管 requirements.toml 生效。不是 remote_plugin，也不是 features.plugins。",
    code: `# requirements.toml，不是用户 config.toml
features.plugin_sharing = false
`,
  },
  {
    id: "marketplace-source-path-root",
    title: "个人 marketplace.json（source.path 相对家目录）",
    filename: "~/.agents/plugins/marketplace.json",
    summary: "./plugins/my-plugin 解析到 ~/plugins/my-plugin，不是 ~/.agents/plugins/plugins/my-plugin。",
    code: `{
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
`,
  },
  {
    id: "plugin-repo-enabled",
    title: "仓库里关掉一条本地 marketplace 插件",
    filename: ".codex/config.toml",
    summary: "只关这个仓库，不卸载。键必须是 name@marketplace。远程精选经常拦不住。",
    code: `[plugins."my-plugin@local-repo"]
enabled = false
`,
  },
  {
    id: "plugin-hook-plugin-root",
    title: "插件自带钩子（PLUGIN_ROOT）",
    filename: "hooks/hooks.json",
    summary: "命令走安装后的缓存根。可变数据写 PLUGIN_DATA。清单里写了 hooks 就不再读这个默认文件。",
    code: `{
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
`,
  },
  {
    id: "plugin-portable-json",
    title: "可移植 plugin.json（Agent Plugins）",
    filename: "plugin.json",
    summary: "放在插件根。技能走 skills/，MCP 另写 mcp.json。OpenAI 专用字段进 extensions.com.openai，会整份替换 overlay。",
    code: `{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "my-first-plugin",
  "version": "1.0.0",
  "description": "Reusable greeting workflow",
  "extensions": {
    "com.openai": {
      "hooks": "./hooks/hooks.json",
      "interface": {
        "displayName": "My Plugin",
        "shortDescription": "Reusable skills and MCP servers",
        "developerName": "Your team",
        "category": "Productivity"
      }
    }
  }
}
`,
  },
  {
    id: "plugin-portable-mcp",
    title: "可移植 mcp.json（带 transport type）",
    filename: "mcp.json",
    summary: "包装键是 mcpServers，不要抄 TOML 的 mcp_servers。不要只把 .mcp.json 改名。兼容布局还要把清单里的 mcpServers 指到 ./.mcp.json。",
    code: `{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
  "mcpServers": {
    "docs": {
      "type": "streamable-http",
      "url": "https://example.com/mcp"
    }
  }
}
`,
  },
  {
    id: "plugin-admin-mcp-desktop",
    title: "把已有工作区插件交给 GitHub 管",
    filename: ".agents/plugins/marketplace.json",
    summary: "pluginId 从 Admin URL /admin/plugins/ 后面抄。带 MCP 的导入插件仍是 Desktop only。",
    code: `{
  "name": "team-plugins",
  "interface": {
    "displayName": "Team plugins"
  },
  "plugins": [
    {
      "name": "team-tools",
      "pluginId": "plugin_00000000000000000000000000000000",
      "source": {
        "source": "local",
        "path": "./plugins/team-tools"
      }
    }
  ]
}
`,
  },
  {
    id: "windows-sandbox-private-desktop",
    title: "Windows 沙箱专用桌面",
    filename: "~/.codex/config.toml",
    summary: "默认 true。Computer Use 或必须看见交互桌面的 GUI 才改 false，然后彻底退出 ChatGPT / Codex。",
    code: `[windows]
sandbox = "elevated"
# 默认 true：沙盒子进程进 Winsta0\\CodexSandboxDesktop-...
# 只要兼容交互桌面时才关：
sandbox_private_desktop = false
`,
  },
  {
    id: "apps-default-policy",
    title: "连接器默认策略",
    filename: "~/.codex/config.toml",
    summary: "写 apps._default，不要写成 apps.default。带斜杠的工具名必须加引号。",
    code: `[apps._default]
enabled = true
destructive_enabled = false
open_world_enabled = false
default_tools_approval_mode = "prompt"
approvals_reviewer = "user"

[apps.google_drive]
enabled = true
destructive_enabled = false

[apps.google_drive.tools."files/delete"]
enabled = false
approval_mode = "approve"
`,
  },
  {
    id: "plugin-mcp-oauth-json",
    title: "插件 MCP OAuth（camelCase）",
    filename: "mcp.json",
    summary: "不要抄 config.toml 的 client_id。callbackUrl 里的端口不会改监听口，要同时写 callbackPort。",
    code: `{
  "mcpServers": {
    "sample": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "oauth": {
        "clientId": "my-pre-registered-client",
        "callbackUrl": "http://127.0.0.1:4321/callback/registered",
        "callbackPort": 4321
      }
    }
  }
}
`,
  },
  {
    id: "plugin-mcp-cwd-dot",
    title: "插件 MCP 用 cwd . 找安装根",
    filename: "mcp.json",
    summary: "command/args 不会展开 PLUGIN_ROOT。相对 cwd 相对安装后的插件根，写成 . 再配相对 args。",
    code: `{
  "mcpServers": {
    "docs": {
      "command": "node",
      "args": ["./start.mjs"],
      "cwd": "."
    }
  }
}
`,
  },
  {
    id: "desktop-project-mcp",
    title: "桌面读不到项目 MCP 时的用户层副本",
    filename: "~/.codex/config.toml",
    summary: "先确认项目已信任。stdio 用绝对路径。仓库本地二进制不要拷成全局项。改完彻底退出桌面再开新线程。",
    code: `[mcp_servers.docs]
command = "/usr/bin/node"
args = ["/home/you/src/app/servers/docs.mjs"]
cwd = "/home/you/src/app"
enabled = true
bearer_token_env_var = "DOCS_MCP_TOKEN"
`,
  },
  {
    id: "desktop-wsl-codex-app-transport",
    title: "桌面 WSL 报 invalid transport 时改回原生代理",
    filename: "%USERPROFILE%\\.codex\\config.toml",
    summary: "这会换成 Windows 原生代理，不是修好 WSL。改完彻底退出桌面再开。不要手抄 cmd.exe 进 WSL 侧 MCP。",
    code: `[desktop]
runCodexInWindowsSubsystemForLinux = false
`,
  },
  {
    id: "desktop-wsl-user-mcp",
    title: "桌面 WSL 下用 Windows 侧 Node 起 MCP",
    filename: "%USERPROFILE%\\.codex\\config.toml",
    summary: "给桌面 WSL 代理用。不要 export CODEX_HOME 硬共用这份和 Linux npx。改完彻底退出桌面。",
    code: `[mcp_servers.docs]
command = "/mnt/c/Program Files/nodejs/node.exe"
args = ["C:\\\\Program Files\\\\nodejs\\\\node_modules\\\\npm\\\\bin\\\\npx-cli.js", "-y", "@example/docs-mcp"]
cwd = "/mnt/c/Users/you"
startup_timeout_sec = 40
enabled = true
`,
  },
  {
    id: "macos-mcp-bare-command",
    title: "macOS 用 uvx 起 MCP",
    filename: "~/.codex/config.toml",
    summary: "0.154 起裸命令走原生 spawn。Dock 打开的桌面若找不到 uvx，把 Homebrew 写进这台服务器的 PATH。",
    code: `[mcp_servers.docs]
command = "uvx"
args = ["docs-mcp@latest"]
enabled = true

[mcp_servers.docs.env]
PATH = "/opt/homebrew/bin:/usr/bin:/bin"
`,
  },
  {
    id: "sqlcl-oracle-mcp",
    title: "SQLcl MCP 接 Oracle",
    filename: "~/.codex/config.toml",
    summary: "密码用 SQLcl 的 conn -save -savepwd 存进 ~/.dbtools。command 写 sql 的绝对路径。Java 起得慢就 required = true。",
    code: `[mcp_servers.sqlcl]
command = "/opt/oracle/sqlcl/bin/sql"
args = ["-mcp"]
required = true
startup_timeout_sec = 40
enabled = true
`,
  },
  {
    id: "windows-mcp-stderr-pipe",
    title: "Windows 把 MCP stderr 重定向到文件",
    filename: "~/.codex/config.toml",
    summary:
      "原生 Windows 上 stderr 太吵会堵死 stdio。用 cmd /c 重定向到日志，不要 2>NUL，也不要抄进 WSL。",
    code: `[mcp_servers.docs]
command = "cmd"
args = ["/c", "node C:\\\\Users\\\\you\\\\mcp-server\\\\index.js 2>C:\\\\temp\\\\mcp-stderr.log"]
startup_timeout_sec = 60
enabled = true
`,
  },
  {
    id: "toml-windows-path-quotes",
    title: "Windows MCP 路径用单引号",
    filename: "~/.codex/config.toml",
    summary:
      "TOML 双引号会把反斜杠当转义。Windows 路径用单引号或正斜杠，否则整份配置解析失败，桌面可能卡在启动页。",
    code: `[mcp_servers.docs]
command = 'C:\\Users\\you\\mcp-server\\start.ps1'
args = ["-stdio"]
startup_timeout_sec = 30
enabled = true
`,
  },
  {
    id: "mcp-http-not-sse",
    title: "HTTP MCP 用 Streamable HTTP",
    filename: "~/.codex/config.toml",
    summary:
      "Codex 远程 MCP 只有 Streamable HTTP。不要把 url 写成 /sse。Linear 官方入口是 /mcp。",
    code: `[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
enabled = true
`,
  },
  {
    id: "mcp-startup-timeout-sec",
    title: "给慢启动 MCP 加 startup_timeout_sec",
    filename: "~/.codex/config.toml",
    summary:
      "默认 10 秒经常不够冷启动的 npx / uvx。改完新开会话。不要给主机自带的 codex_apps 写这个表。",
    code: `[mcp_servers.docs]
command = "npx"
args = ["-y", "@example/docs-mcp"]
startup_timeout_sec = 60
enabled = true
`,
  },
  {
    id: "mcp-stdio-env-vars",
    title: "stdio MCP 用 env_vars 转发密钥",
    filename: "~/.codex/config.toml",
    summary:
      "子进程不继承整份 shell。env_vars 转发启动进程里的变量名；env 表只放 PATH 这类字面量。不要写占位符指望展开。",
    code: `[mcp_servers.docs]
command = "npx"
args = ["-y", "@example/docs-mcp"]
env_vars = ["DOCS_API_KEY"]
enabled = true

[mcp_servers.docs.env]
PATH = "/opt/homebrew/bin:/usr/bin:/bin"
`,
  },
  {
    id: "mcp-http-bearer-env",
    title: "HTTP MCP 用 bearer_token_env_var 读进程环境",
    filename: "~/.codex/config.toml",
    summary:
      "变量必须在启动 Codex 的进程里。Dock 打开的桌面没有 zshrc。改完彻底退出再从已 export 的终端启动。不要写 env_vars，也不要对 bearer 跑 mcp login。",
    code: `[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
bearer_token_env_var = "DOCS_MCP_TOKEN"
enabled = true
`,
  },
  {
    id: "mcp-http-env-headers",
    title: "HTTP MCP 用 env_http_headers 读自定义头",
    filename: "~/.codex/config.toml",
    summary:
      "左边是头名，右边是变量名。缺变量会静默不带头。密钥不要写进 http_headers。Bearer 仍用 bearer_token_env_var。",
    code: `[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
enabled = true

[mcp_servers.docs.env_http_headers]
X-Api-Key = "DOCS_API_KEY"
`,
  },
  {
    id: "mcp-oauth-callback-id",
    title: "MCP OAuth 登记完整回调",
    filename: "~/.codex/config.toml",
    summary:
      "mcp_oauth_callback_url 是基址。无 issuer 支持时 redirect_uri 会再拼 callback ID。把 add 打印的完整 URL 登到 IdP。",
    code: `# 这是基址。发给授权服务器的 redirect_uri 常会再拼 callback ID。
# 把 codex mcp add 打印的完整 OAuth callback URL 原样登到 IdP。
mcp_oauth_callback_url = "http://127.0.0.1/callback"
mcp_oauth_callback_port = 5555

[mcp_servers.docs]
url = "https://mcp.example.com/mcp"

[mcp_servers.docs.oauth]
client_id = "my-client"
`,
  },
  {
    id: "mcp-github-hosted",
    title: "托管 GitHub MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 Copilot MCP 地址。add 必须带 --bearer-token-env-var。键是变量名。Codex 不读 .env。不要跑 mcp login。",
    code: `[mcp_servers.github]
url = "https://api.githubcopilot.com/mcp/"
bearer_token_env_var = "GITHUB_PAT_TOKEN"
enabled = true
`,
  },
  {
    id: "mcp-figma-remote",
    title: "Figma 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.figma.com/mcp。add 之后 mcp login figma。不要同时写 bearer。本地 3845 是另一台服务。",
    code: `[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
enabled = true
`,
  },
  {
    id: "desktop-mcp-config-clobber",
    title: "项目层写全 MCP 传输",
    filename: ".codex/config.toml",
    summary:
      "不要只写 enabled = true。用户层表被桌面写丢时，残缺覆盖会 invalid transport。密钥用变量名。",
    code: `[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
bearer_token_env_var = "DOCS_MCP_TOKEN"
enabled = true
`,
  },
  {
    id: "chrome-devtools-mcp",
    title: "Chrome DevTools MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方是 stdio 包，不是 localhost:3000 HTTP。冷 npx 把 startup_timeout_sec 提到 20。沙箱加 --headless。Windows 的 cmd 包装不要抄进 WSL。",
    code: `[mcp_servers.chrome-devtools]
command = "npx"
args = ["-y", "chrome-devtools-mcp@latest"]
startup_timeout_sec = 20
enabled = true
`,
  },
  {
    id: "playwright-mcp",
    title: "Playwright MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方是 stdio 包 @playwright/mcp。冷 npx 把 startup_timeout_sec 提到 20。沙箱加 --headless --isolated。默认关掉 browser_run_code_unsafe。",
    code: `[mcp_servers.playwright]
command = "npx"
args = ["-y", "@playwright/mcp@latest"]
startup_timeout_sec = 20
disabled_tools = ["browser_run_code_unsafe"]
enabled = true
`,
  },
  {
    id: "mcp-context7",
    title: "Context7 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "Learn 免费入门不强制 API key。密钥用 env_vars 转发，不要写进 args。冷 npx 把 startup_timeout_sec 提到 20。远程改 url + bearer_token_env_var。",
    code: `[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
env_vars = ["CONTEXT7_API_KEY"]
startup_timeout_sec = 20
enabled = true
`,
  },
  {
    id: "mcp-stdio-display-env",
    title: "stdio MCP 转发 DISPLAY",
    filename: "~/.codex/config.toml",
    summary:
      "本机有显示器、MCP 却只有 snapshot 时转发图形会话变量。键是 env_vars，不是 env_args。修不了沙箱。",
    code: `[mcp_servers.playwright]
command = "npx"
args = ["-y", "@playwright/mcp@latest"]
env_vars = ["DISPLAY", "WAYLAND_DISPLAY", "XAUTHORITY", "XDG_RUNTIME_DIR"]
startup_timeout_sec = 20
enabled = true
`,
  },
  {
    id: "mcp-notion-remote",
    title: "Notion 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.notion.com/mcp。add 之后 mcp login notion。不要抄 rmcp 旗标、/sse 或 Claude 的 --transport http。",
    code: `[mcp_servers.notion]
url = "https://mcp.notion.com/mcp"
enabled = true
`,
  },
  {
    id: "mcp-slack-remote",
    title: "Slack 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.slack.com/mcp。必须带预注册 oauth.client_id，否则 DCR 失败。不要抄 --transport http。",
    code: `[mcp_servers.slack]
url = "https://mcp.slack.com/mcp"
enabled = true

[mcp_servers.slack.oauth]
client_id = "my-slack-app"
`,
  },
  {
    id: "mcp-sentry-remote",
    title: "Sentry 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.sentry.dev/mcp。能接到 org/project。add 之后 mcp login sentry。不要抄 mcp-remote 或 Claude 的 --transport http。",
    code: `[mcp_servers.sentry]
url = "https://mcp.sentry.dev/mcp/my-org/my-project"
enabled = true
`,
  },
  {
    id: "mcp-atlassian-remote",
    title: "Atlassian 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "现行入门页是 v2/mcp。add 之后 mcp login。不要抄 /sse 或把 authv2 当唯一入口。Atlassian 要 DCR，不要抄 Slack 的预注册 client_id。",
    code: `[mcp_servers.atlassian]
url = "https://mcp.atlassian.com/v2/mcp"
enabled = true
`,
  },
  {
    id: "mcp-stripe-remote",
    title: "Stripe 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.stripe.com，没有 /mcp 后缀。add 之后 mcp login stripe。受限密钥用 bearer_token_env_var。不要和 OAuth 混用。",
    code: `[mcp_servers.stripe]
url = "https://mcp.stripe.com"
enabled = true
`,
  },
  {
    id: "mcp-openai-docs",
    title: "OpenAI Docs MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方服务器名是驼峰 openaiDeveloperDocs。只读文档检索。不要当成桌面 WebMCP，也不要抄 --transport http。",
    code: `[mcp_servers.openaiDeveloperDocs]
url = "https://developers.openai.com/mcp"
enabled = true
`,
  },
  {
    id: "mcp-cloudflare-remote",
    title: "Cloudflare 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.cloudflare.com/mcp。add 之后 mcp login。Cloudflare 的 Code Mode 不是 Codex 的 features.code_mode。文档服务器另加 cloudflare-docs。",
    code: `[mcp_servers.cloudflare]
url = "https://mcp.cloudflare.com/mcp"
enabled = true
`,
  },
  {
    id: "mcp-huggingface-remote",
    title: "Hugging Face 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 huggingface.co/mcp。add 之后 mcp login。token 用 bearer_token_env_var。不要抄 Claude 的 -t http，也不要把 hf_ 写进 http_headers。",
    code: `[mcp_servers.huggingface]
url = "https://huggingface.co/mcp"
enabled = true
`,
  },
  {
    id: "mcp-amplitude-remote",
    title: "Amplitude 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方 Codex 页是 mcp.amplitude.com/mcp。EU 换成 mcp.eu.amplitude.com/mcp 再 add 覆盖。随后 OAuth。不是埋点摄入。",
    code: `[mcp_servers.amplitude]
url = "https://mcp.amplitude.com/mcp"
enabled = true
`,
  },
  {
    id: "mcp-datadog-remote",
    title: "Datadog 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "US1 是 mcp.datadoghq.com/api/unstable/mcp-server/mcp。随后 mcp login。工具集写 X-Datadog-MCP-Toolsets，不要把 ?toolsets= 拼进 URL。",
    code: `[mcp_servers.datadog]
url = "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp"
http_headers = { "X-Datadog-MCP-Toolsets" = "apm,llmobs" }
enabled = true
`,
  },
  {
    id: "hf-inference-providers",
    title: "Hugging Face 模型供应商",
    filename: "~/.codex/config.toml",
    summary:
      "router.huggingface.co/v1，env_key = HF_TOKEN，wire_api = responses。再用 huggingface.config.toml 和 --profile huggingface。不是 Hub MCP。",
    code: `[model_providers.huggingface]
name = "Hugging Face"
base_url = "https://router.huggingface.co/v1"
env_key = "HF_TOKEN"
wire_api = "responses"
`,
  },
  {
    id: "mcp-grafana-stdio",
    title: "Grafana OSS stdio MCP",
    filename: "~/.codex/config.toml",
    summary:
      "uvx mcp-grafana。GRAFANA_URL 写 env 表。token 用 env_vars。不要抄 startup_timeout_ms，也不要把 token 写进 env。",
    code: `[mcp_servers.grafana]
command = "uvx"
args = ["mcp-grafana"]
env_vars = ["GRAFANA_SERVICE_ACCOUNT_TOKEN"]
startup_timeout_sec = 60
enabled = true

[mcp_servers.grafana.env]
GRAFANA_URL = "http://localhost:3000"
`,
  },
  {
    id: "mcp-grafana-cloud",
    title: "Grafana Cloud 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "托管是 mcp.grafana.com/mcp。login 若 302 到文档，补 Accept 和 X-Grafana-URL。名字用 grafana_cloud，不要覆盖本机 grafana 表。",
    code: `[mcp_servers.grafana_cloud]
url = "https://mcp.grafana.com/mcp"
http_headers = { "X-Grafana-URL" = "https://myinstance.grafana.net", "Accept" = "application/json, text/event-stream" }
enabled = true
`,
  },
  {
    id: "mcp-vercel-remote",
    title: "Vercel 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.vercel.com，没有 /mcp 后缀。add 之后 mcp login vercel。不要把 npx add-mcp 或 vercel mcp 当 Codex 主路径。",
    code: `[mcp_servers.vercel]
url = "https://mcp.vercel.com"
enabled = true
`,
  },
  {
    id: "mcp-supabase-remote",
    title: "Supabase 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.supabase.com/mcp。查询 read_only=true 和 project_ref=abc123 写进 url。随后 mcp login。不要 PAT 当主路径。",
    code: `[mcp_servers.supabase]
url = "https://mcp.supabase.com/mcp?project_ref=abc123&read_only=true"
enabled = true
`,
  },
  {
    id: "vercel-ai-gateway",
    title: "Vercel AI Gateway 模型供应商",
    filename: "~/.codex/config.toml",
    summary:
      "Codex 兼容入口是 ai-gateway.vercel.sh/codex/v1，wire_api = responses，env_key = AI_GATEWAY_API_KEY。再用 vercel.config.toml 和 --profile vercel。不是 Vercel MCP。",
    code: `[model_providers.vercel]
name = "Vercel AI Gateway"
base_url = "https://ai-gateway.vercel.sh/codex/v1"
env_key = "AI_GATEWAY_API_KEY"
wire_api = "responses"
`,
  },
  {
    id: "mcp-netlify-remote",
    title: "Netlify 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 netlify-mcp.netlify.app/mcp。add 之后 mcp login netlify。远程被拦才改 stdio npx @netlify/mcp。不要把 npx add-mcp 当 Codex 主路径。",
    code: `[mcp_servers.netlify]
url = "https://netlify-mcp.netlify.app/mcp"
enabled = true
`,
  },
  {
    id: "mcp-posthog-remote",
    title: "PostHog 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.posthog.com/mcp。Codex 默认 CLI 模式。只读用 ?readonly=true。随后 mcp login。不要把 wizard 当 Codex 主路径。",
    code: `[mcp_servers.posthog]
url = "https://mcp.posthog.com/mcp?readonly=true"
enabled = true
`,
  },
  {
    id: "mcp-prisma-remote",
    title: "Prisma 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.prisma.io/mcp。add 之后 mcp login prisma。插件是 marketplace add prisma/codex-plugin。不要抄 mcpServers JSON。",
    code: `[mcp_servers.prisma]
url = "https://mcp.prisma.io/mcp"
enabled = true
`,
  },
  {
    id: "mcp-neon-remote",
    title: "Neon 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.neon.tech/mcp。查询 projectId=prj_abc123 写进 url。随后 mcp login。不要抄 /sse 或本地 stdio 包。",
    code: `[mcp_servers.neon]
url = "https://mcp.neon.tech/mcp?projectId=prj_abc123"
enabled = true
`,
  },
  {
    id: "mcp-planetscale-remote",
    title: "PlanetScale 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.pscale.dev/mcp/planetscale。add 之后应弹出 OAuth。CI 才用 PLANETSCALE_API_TOKEN。不要抄 id:secret。",
    code: `[mcp_servers.planetscale]
url = "https://mcp.pscale.dev/mcp/planetscale"
enabled = true
`,
  },
  {
    id: "mcp-snyk-stdio",
    title: "Snyk 本地 stdio MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方没有远程 MCP。表名是 snyk-security。密钥用 env_vars 转发 SNYK_TOKEN。SNYK_MCP_PROFILE 才写 env 表。先 --ade codex 装 Studio。",
    code: `[mcp_servers.snyk-security]
command = "npx"
args = ["-y", "snyk@latest", "mcp", "-t", "stdio"]
env_vars = ["SNYK_TOKEN"]
enabled = true

[mcp_servers.snyk-security.env]
SNYK_MCP_PROFILE = "lite"
`,
  },
  {
    id: "mcp-circleci-remote",
    title: "CircleCI 托管 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.circleci.com/v1/mcp。Codex 里插件才是主路径。CI 才用 CIRCLE_TOKEN。不要装已弃用的 npx 包。",
    code: `[mcp_servers.circleci]
url = "https://mcp.circleci.com/v1/mcp"
enabled = true
`,
  },
  {
    id: "mcp-firecrawl-remote",
    title: "Firecrawl 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "交互主路径是 mcp.firecrawl.dev/v2/mcp-oauth，随后 mcp login。无账号或 API key 才用 /v2/mcp。不要把密钥拼进 URL。",
    code: `[mcp_servers.firecrawl]
url = "https://mcp.firecrawl.dev/v2/mcp-oauth"
enabled = true
`,
  },
  {
    id: "mcp-exa-remote",
    title: "Exa 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.exa.ai/mcp。ChatGPT / Codex 推荐先装插件。生产密钥用 env_http_headers 的 x-api-key。不要抄 mcp-remote。",
    code: `[mcp_servers.exa]
url = "https://mcp.exa.ai/mcp"
enabled = true

[mcp_servers.exa.env_http_headers]
x-api-key = "EXA_API_KEY"
`,
  },
  {
    id: "mcp-langfuse-docs",
    title: "Langfuse 文档 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 langfuse.com/api/mcp。表名是 langfuse-docs。无鉴权。不要抄 mcp-remote，也不是产品 MCP。",
    code: `[mcp_servers.langfuse-docs]
url = "https://langfuse.com/api/mcp"
enabled = true
`,
  },
  {
    id: "mcp-launchdarkly-remote",
    title: "LaunchDarkly 托管 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.launchdarkly.com/mcp/launchdarkly。随后 mcp login。不要抄本地 npx --api-key。联邦区和欧盟没有托管。",
    code: `[mcp_servers.launchdarkly]
url = "https://mcp.launchdarkly.com/mcp/launchdarkly"
enabled = true
`,
  },
  {
    id: "mcp-langfuse-cloud",
    title: "Langfuse 产品 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 cloud.langfuse.com/api/public/mcp。Basic Auth 走 env_http_headers。不要把 token 写进 http_headers。不是 langfuse-docs。",
    code: `[mcp_servers.langfuse]
url = "https://cloud.langfuse.com/api/public/mcp"
enabled = true

[mcp_servers.langfuse.env_http_headers]
Authorization = "LANGFUSE_MCP_AUTHORIZATION"
`,
  },
  {
    id: "mcp-circle-remote",
    title: "Circle 代码生成 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 api.circle.com/v1/codegen/mcp。表名是 circle。不要和 CircleCI 搞混，也不要抄 npx @circle/mcp-server。",
    code: `[mcp_servers.circle]
url = "https://api.circle.com/v1/codegen/mcp"
enabled = true
`,
  },
  {
    id: "mcp-twilio-docs",
    title: "Twilio 文档 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.twilio.com/docs。表名是 twilio-docs。无鉴权。不要抄 --transport http 或 mcp-remote。",
    code: `[mcp_servers.twilio-docs]
url = "https://mcp.twilio.com/docs"
enabled = true
`,
  },
  {
    id: "shopify-ai-toolkit",
    title: "Shopify Dev MCP",
    filename: "~/.codex/config.toml",
    summary:
      "只要文档/校验才用本地 shopify-dev-mcp。主路径仍是 plugin add shopify@openai-curated。不要抄 mcpServers JSON。",
    code: `[mcp_servers.shopify-dev-mcp]
command = "npx"
args = ["-y", "@shopify/dev-mcp@latest"]
enabled = true
startup_timeout_sec = 60
`,
  },
  {
    id: "mcp-resend-remote",
    title: "Resend 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.resend.com/mcp，带 /mcp 后缀。插件优先。无头才 bearer_token_env_var。不要把密钥写进 --env 或 http_headers。",
    code: `[mcp_servers.resend]
url = "https://mcp.resend.com/mcp"
enabled = true
`,
  },
  {
    id: "railway-skills-plugin",
    title: "Railway 源仓 marketplace",
    filename: "terminal",
    summary:
      "公共目录仍是 /plugins 搜 Railway。源仓才 marketplace add railwayapp/railway-skills，再从 Railway marketplace 装。不要抄 Claude 的 plugin install。",
    code: `codex plugin marketplace add railwayapp/railway-skills
codex plugin list
`,
  },
  {
    id: "mongodb-agent-skills",
    title: "MongoDB 本地 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "自建才用 mongodb-mcp-server。连接串走 env_vars。默认 --readOnly。Atlas 托管主路径仍是 /plugins 搜 mongodb-atlas。",
    code: `[mcp_servers.mongodb]
command = "npx"
args = ["-y", "mongodb-mcp-server@latest", "--readOnly"]
env_vars = ["MDB_MCP_CONNECTION_STRING"]
enabled = true
startup_timeout_sec = 60
`,
  },
  {
    id: "mcp-clickhouse-cloud",
    title: "ClickHouse Cloud 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.clickhouse.cloud/mcp。先在控制台打开 MCP。add 之后 OAuth。不要抄 --transport http，也不要和 clickstack 搞混。",
    code: `[mcp_servers.clickhouse-cloud]
url = "https://mcp.clickhouse.cloud/mcp"
enabled = true
`,
  },
  {
    id: "mcp-render-remote",
    title: "Render 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.render.com/mcp。必须带预注册 oauth.client_id = codex。插件优先。CI 才 bearer_token_env_var。不要把密钥写进 http_headers。",
    code: `[mcp_servers.render]
url = "https://mcp.render.com/mcp"
enabled = true

[mcp_servers.render.oauth]
client_id = "codex"
`,
  },
  {
    id: "convex-codex-plugin",
    title: "Convex 完整插件 marketplace",
    filename: "terminal",
    summary:
      "完整现行构建是 marketplace add get-convex/convex-codex-plugin，再 plugin add convex@convex-codex-plugin。openai-curated 只是轻量连接器。",
    code: `codex plugin marketplace add get-convex/convex-codex-plugin
codex plugin add convex@convex-codex-plugin
codex plugin list
`,
  },
  {
    id: "mcp-mixpanel-remote",
    title: "Mixpanel 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.mixpanel.com/mcp。随后 mcp login。CI 才 env_http_headers。不要抄官方 headers 密钥或 mcp-remote。",
    code: `[mcp_servers.mixpanel]
url = "https://mcp.mixpanel.com/mcp"
enabled = true
`,
  },
  {
    id: "mcp-algolia-productivity",
    title: "Algolia Productivity 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 mcp.algolia.com/mcp。随后 mcp login。先在控制台打开 Productivity。不要和 DocSearch 搞混。",
    code: `[mcp_servers.algolia]
url = "https://mcp.algolia.com/mcp"
enabled = true
`,
  },
  {
    id: "mcp-algolia-docsearch",
    title: "Algolia DocSearch 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方表名是 algolia-docsearch。地址是 mcp.algolia.com/1/docsearch/mcp。无鉴权。不要覆盖 Productivity 那张 algolia 表。",
    code: `[mcp_servers.algolia-docsearch]
url = "https://mcp.algolia.com/1/docsearch/mcp"
enabled = true
`,
  },
  {
    id: "temporal-codex-plugin",
    title: "Temporal 插件仓库回退",
    filename: "terminal",
    summary:
      "主路径仍是 /plugins 搜 temporal。官方没给 plugin add id。仓库回退才拷 plugins/temporal 和 marketplace.json。",
    code: `mkdir -p .agents/plugins plugins
cp -r codex-temporal-plugin/plugins/temporal plugins/
cp codex-temporal-plugin/.agents/plugins/marketplace.json .agents/plugins/
`,
  },
  {
    id: "mcp-newrelic-remote",
    title: "New Relic 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "OAuth 主路径是 mcp add new-relic-mcp-server。API key 才用这张 new-relic 表和 env_http_headers。地址带 /mcp/ 尾斜杠。",
    code: `[mcp_servers.new-relic]
url = "https://mcp.newrelic.com/mcp/"
enabled = true

[mcp_servers.new-relic.env_http_headers]
api-key = "NEW_RELIC_API_KEY"
`,
  },
  {
    id: "mcp-typesense-cloud",
    title: "Typesense Cloud 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 cloud.typesense.org/mcp/v1。随后 mcp login。无头才 bearer_token_env_var。不要抄 --header 密钥。",
    code: `[mcp_servers.typesense-cloud]
url = "https://cloud.typesense.org/mcp/v1"
enabled = true
`,
  },
  {
    id: "turso-codex-plugin",
    title: "Turso Cloud 插件与远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 marketplace add tursodatabase/turso-mcp，再 plugin add turso@turso，再 mcp login。只要 MCP 才手写这张 turso 表。地址带 /mcp 后缀。",
    code: `codex plugin marketplace add tursodatabase/turso-mcp
codex plugin add turso@turso
codex mcp login turso

# 只要 MCP、不要技能时：
# [mcp_servers.turso]
# url = "https://mcp.turso.ai/mcp"
# enabled = true
`,
  },
  {
    id: "cockroachdb-codex-plugin",
    title: "CockroachDB Cloud 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方远程是 cockroachlabs.cloud/mcp。随后 mcp login。技能才 plugin add cockroachdb@cockroachdb-codex-plugin。不要把 Bearer 写进 http_headers。",
    code: `[mcp_servers.cockroachdb-cloud]
url = "https://cockroachlabs.cloud/mcp"
enabled = true
`,
  },
  {
    id: "airtable-codex-plugin",
    title: "Airtable 插件与远程 MCP",
    filename: "terminal",
    summary:
      "官方文档是 plugin add airtable@openai-curated。只要 MCP 才手写这张 airtable 表。地址带 /mcp 后缀。无头才 bearer_token_env_var。",
    code: `codex plugin add airtable@openai-curated

# 只要 MCP、不要插件时：
# [mcp_servers.airtable]
# url = "https://mcp.airtable.com/mcp"
# enabled = true
`,
  },
  {
    id: "motherduck-codex-plugin",
    title: "MotherDuck 技能与远程 MCP",
    filename: "terminal",
    summary:
      "技能是 marketplace add motherduckdb/agent-skills，再 /plugins 装。官方没给 plugin add id。远程对照 api.motherduck.com/mcp。无头才 bearer_token_env_var。",
    code: `codex plugin marketplace add motherduckdb/agent-skills
# 然后 TUI /plugins 装 MotherDuck Skills

codex mcp add motherduck --url https://api.motherduck.com/mcp
codex mcp login motherduck
`,
  },
  {
    id: "hubspot-dev-mcp",
    title: "HubSpot 本地开发 MCP",
    filename: "terminal",
    summary:
      "主路径是 hs mcp setup 勾选 Codex CLI。表名是 HubSpotDev。等价手写带 --ai-agent codex。不是 mcp.hubspot.com 那台 CRM。",
    code: `hs mcp setup

# 等价手写（全局 hs，CLI 8.2.0+）：
codex mcp add HubSpotDev -- hs mcp start --ai-agent codex
`,
  },
  {
    id: "azure-skills-plugin",
    title: "Azure Skills 插件与 Azure MCP",
    filename: "terminal",
    summary:
      "主路径是 marketplace add microsoft/azure-skills，再 /plugins 装 azure。官方没给 plugin add id。只要 MCP 才手写 @azure/mcp。",
    code: `codex plugin marketplace add microsoft/azure-skills
# 然后 TUI /plugins 装 azure

# 只要 MCP、插件装不上时：
codex mcp add azure -- npx -y @azure/mcp@latest server start
`,
  },
  {
    id: "azure-devops-local-mcp",
    title: "Azure DevOps 本地 MCP",
    filename: "terminal",
    summary:
      "主路径是本地 stdio：mcp add azure-devops -- npx -y @azure-devops/mcp，组织名跟在包名后面。不是 mcp.dev.azure.com。PAT 才 --authentication pat，用 env_vars。",
    code: `codex mcp add azure-devops -- npx -y @azure-devops/mcp Contoso

# 已 az login 时：
# codex mcp add azure-devops -- npx -y @azure-devops/mcp Contoso --authentication azcli
`,
  },
  {
    id: "tinybird-devtools-mcp",
    title: "Tinybird DevTools MCP",
    filename: "terminal",
    summary:
      "主路径是本地 stdio：mcp add tinybird -- npx -y @tinybirdco/devtools-mcp@latest。不要抄 -e TINYBIRD_TOKEN=。用 env_vars。远程 mcp.tinybird.co 是另一台。",
    code: `codex mcp add tinybird -- npx -y @tinybirdco/devtools-mcp@latest
`,
  },
  {
    id: "upstash-codex-plugin",
    title: "Upstash 插件与远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 marketplace add upstash/skills，再 plugin add upstash@upstash。插件会登记 mcp.upstash.com/mcp。不要抄本地 --api-key。不是 Context7。",
    code: `codex plugin marketplace add upstash/skills
codex plugin add upstash@upstash

# 只要 MCP、插件装不上时：
# codex mcp add upstash --url https://mcp.upstash.com/mcp
# codex mcp login upstash
`,
  },
  {
    id: "gitlab-mcp-http",
    title: "GitLab 远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add GitLab --url https://gitlab.com/api/v4/mcp，再 mcp login。不要抄 rmcp_client 或 mcp-remote。自建实例只换主机名。",
    code: `codex mcp add GitLab --url https://gitlab.com/api/v4/mcp
codex mcp login GitLab
`,
  },
  {
    id: "sanity-codex-mcp",
    title: "Sanity 远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add Sanity --url https://mcp.sanity.io，再 mcp login Sanity。URL 没有 /mcp 后缀。技能才 marketplace add 后 /plugins 装 Sanity。",
    code: `codex mcp add Sanity --url https://mcp.sanity.io
codex mcp login Sanity

# 技能 / 插件才：
# codex plugin marketplace add sanity-io/agent-toolkit
# 然后 TUI /plugins 选 Sanity Agent Toolkit，装 Sanity
`,
  },
  {
    id: "honeycomb-codex-plugin",
    title: "Honeycomb 插件与远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 marketplace add honeycombio/agent-skill，再 plugin add honeycomb@honeycomb-plugins。插件会登记 mcp.honeycomb.io/mcp。不要抄 mcp-remote。欧盟换 eu1 主机。",
    code: `codex plugin marketplace add honeycombio/agent-skill
codex plugin add honeycomb@honeycomb-plugins

# 只要 MCP、插件装不上，或欧盟团队时：
# codex mcp add honeycomb --url https://mcp.honeycomb.io/mcp
# codex mcp login honeycomb
`,
  },
  {
    id: "semgrep-guardian-mcp",
    title: "Semgrep 本地 MCP",
    filename: "terminal",
    summary:
      "主路径是本地 stdio：mcp add semgrep -- semgrep mcp。先装 CLI 并 semgrep login && semgrep install-semgrep-pro。不要 mcp login，也不要抄 Claude 远程插件。",
    code: `codex mcp add semgrep -- semgrep mcp

# 手写 config.toml：
# [mcp_servers.semgrep]
# command = "semgrep"
# args = ["mcp"]
`,
  },
  {
    id: "kagi-mcp-stdio",
    title: "Kagi 搜索 MCP",
    filename: "terminal",
    summary:
      "主路径是本地 stdio：mcp add kagi -- uvx kagimcp。不要抄 --env KAGI_API_KEY=。用 env_vars。托管才 mcp.kagi.com/mcp。",
    code: `codex mcp add kagi -- uvx kagimcp

# [mcp_servers.kagi]
# command = "uvx"
# args = ["kagimcp"]
# env_vars = ["KAGI_API_KEY"]
`,
  },
  {
    id: "pinecone-agent-skills",
    title: "Pinecone 技能与 MCP",
    filename: "terminal",
    summary:
      "主路径是 npx skills add pinecone-io/skills --agent codex。MCP 才 mcp add pinecone -- npx -y @pinecone-database/mcp。不要抄 Claude plugin。",
    code: `npx skills add pinecone-io/skills --agent codex

# 可选 MCP：
# codex mcp add pinecone -- npx -y @pinecone-database/mcp
`,
  },
  {
    id: "heroku-mcp-http",
    title: "Heroku 远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add heroku --url https://mcp.heroku.com/mcp，再 mcp login。不要抄 mcp-remote。本地才 heroku mcp:start；npx 才 env_vars。",
    code: `codex mcp add heroku --url https://mcp.heroku.com/mcp
codex mcp login heroku

# 本地 stdio（不要和远程同名混用）：
# codex mcp add heroku -- heroku mcp:start
`,
  },
  {
    id: "litestream-mcp-http",
    title: "Litestream 本地 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add litestream --url http://localhost:3001。先在 YAML 开 mcp-addr，再 litestream replicate。不要 mcp login，也不要抄 --transport http。",
    code: `codex mcp add litestream --url http://localhost:3001

# litestream.yml:
# mcp-addr: "127.0.0.1:3001"
# 然后：litestream replicate -config litestream.yml
`,
  },
  {
    id: "pagerduty-mcp-http",
    title: "PagerDuty 托管 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add pagerduty --url https://mcp.pagerduty.com/mcp。不要 mcp login。API key 用 env_http_headers 发 Token token=。不要 bearer_token_env_var。",
    code: `export PAGERDUTY_AUTH="Token token=你的 User API Token"
codex mcp add pagerduty --url https://mcp.pagerduty.com/mcp

# [mcp_servers.pagerduty.env_http_headers]
# Authorization = "PAGERDUTY_AUTH"
`,
  },
  {
    id: "fly-mcp-stdio",
    title: "Fly.io 本地 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add fly -- fly mcp server。没有 --codex。不要对 config.toml 跑 --config，也不要 mcp login。不要抄 --sse 或 flyctl mcp proxy。",
    code: `codex mcp add fly -- fly mcp server

# [mcp_servers.fly]
# command = "fly"
# args = ["mcp", "server"]
# enabled = true
`,
  },
  {
    id: "atlan-codex-mcp",
    title: "Atlan 托管 MCP",
    filename: "terminal",
    summary:
      "主路径是 marketplace add atlanhq/agent-toolkit，再 plugin add atlan@atlan，再 mcp add atlan --url https://mcp.atlan.com/mcp。装了插件仍要 mcp add。不要抄 atlan@atlan-marketplace。",
    code: `codex plugin marketplace add https://github.com/atlanhq/agent-toolkit
codex plugin add atlan@atlan
codex mcp add atlan --url https://mcp.atlan.com/mcp
`,
  },
  {
    id: "splunk-o11y-mcp-http",
    title: "Splunk Observability MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add splunk-o11y --url 网关（us0 用 region-iad10）。头是 env_http_headers 的 X-SF-TOKEN / X-SF-REALM。不要抄 connect --ide codex 的 http_headers，也不要 bearer_token_env_var。",
    code: `export SPLUNK_O11Y_TOKEN=你的 Observability access token
export SPLUNK_O11Y_REALM=us0
codex mcp add splunk-o11y --url https://region-iad10.api.scs.splunk.com/system/mcp-gateway/v1/

# [mcp_servers.splunk-o11y.env_http_headers]
# X-SF-TOKEN = "SPLUNK_O11Y_TOKEN"
# X-SF-REALM = "SPLUNK_O11Y_REALM"
`,
  },
  {
    id: "elastic-agent-builder-mcp",
    title: "Elastic Agent Builder MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add elastic-agent-builder --url 你的 Kibana /api/agent_builder/mcp。头是 env_http_headers 的 Authorization: ApiKey。不要抄 mcp-remote，也不要 bearer_token_env_var。",
    code: `export ELASTIC_AUTH="ApiKey 你的 encoded API key"
codex mcp add elastic-agent-builder --url https://my-project.kb.us-east-1.aws.elastic.cloud/api/agent_builder/mcp

# [mcp_servers.elastic-agent-builder.env_http_headers]
# Authorization = "ELASTIC_AUTH"
`,
  },
  {
    id: "incident-io-codex-mcp",
    title: "incident.io 托管 MCP",
    filename: "terminal",
    summary:
      "主路径是 marketplace add incident-io/skills，再 plugin add incident-io@incident-io-skills。插件会登记 MCP 和 skills。IDE 没有插件才 mcp add incident_io --url https://mcp.incident.io/mcp，再 mcp login。不要抄 type = url。",
    code: `codex plugin marketplace add incident-io/skills
codex plugin add incident-io@incident-io-skills

# IDE 没有插件、只要 MCP 时：
# codex mcp add incident_io --url https://mcp.incident.io/mcp
# codex mcp login incident_io
`,
  },
  {
    id: "1password-mcp-stdio",
    title: "1Password Environments MCP",
    filename: "terminal",
    summary:
      "主路径是本地 stdio：mcp add 1password -- 1password-mcp。先在桌面 Labs 打开 MCP Server。Mac / Linux。不要抄 Claude 插件或 op mcp-server environments。",
    code: `codex mcp add 1password -- 1password-mcp

# [mcp_servers.1password]
# command = "1password-mcp"
# enabled = true
`,
  },
  {
    id: "imgly-cesdk-skills",
    title: "IMG.LY CE.SDK 技能与文档 MCP",
    filename: "terminal",
    summary:
      "主路径是 npx skills add imgly/agent-skills -a codex。实时文档才 mcp add imgly_docs --url https://mcp.img.ly/mcp。不要抄 Claude 的 cesdk@imgly。",
    code: `npx skills add imgly/agent-skills -a codex

# 实时文档 MCP（无鉴权）：
# codex mcp add imgly_docs --url https://mcp.img.ly/mcp
`,
  },
  {
    id: "imgly-codesign-mcp",
    title: "IMG.LY CoDesign 本地 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add codesign -- npx -y @imgly/codesign-mcp@latest stdio。加完新开会话再发 start the CoDesign onboarding。不要抄 --scope user。",
    code: `codex mcp add codesign -- npx -y @imgly/codesign-mcp@latest stdio

# [mcp_servers.codesign]
# command = "npx"
# args = ["-y", "@imgly/codesign-mcp@latest", "stdio"]
# enabled = true
`,
  },
  {
    id: "terraform-mcp-stdio",
    title: "HashiCorp Terraform MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add terraform -- docker run -i --rm hashicorp/terraform-mcp-server。查公共 registry 不用 token。HCP / TFE 才 env_vars 转发 TFE_TOKEN。不要 mcp login。",
    code: `codex mcp add terraform -- docker run -i --rm hashicorp/terraform-mcp-server

# HCP / TFE：env_vars 转发，docker 用 -e TFE_TOKEN -e TFE_ADDRESS
# 二进制：codex mcp add terraform -- terraform-mcp-server stdio
`,
  },
  {
    id: "clerk-mcp-run",
    title: "Clerk MCP",
    filename: "terminal",
    summary:
      "主路径是 clerk mcp install --client codex，等价 mcp add clerk -- clerk mcp run。文档缺 --url 且带 rmcp，不要抄。不要 mcp login。",
    code: `codex mcp add clerk -- clerk mcp run

# 或：clerk mcp install --client codex
# 不用 Clerk CLI 才：codex mcp add clerk --url https://mcp.clerk.com/mcp
`,
  },
  {
    id: "clerk-skills-plugin",
    title: "Clerk Skills marketplace",
    filename: "terminal",
    summary:
      "主路径是 plugin marketplace add clerk/skills，再 /plugins 装 clerk-skills。不要发明 plugin add。不要抄 npx skills add 当 Codex 专节。",
    code: `codex plugin marketplace add clerk/skills

# 然后 TUI /plugins 选 Clerk Skills，安装并启用 clerk-skills
# 不要发明 plugin add 的 @id
`,
  },
  {
    id: "appcircle-mcp-http",
    title: "Appcircle 远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add appcircle --url https://mcp.appcircle.io。bearer_token_env_var 读 APPCIRCLE_ACCESS_TOKEN。不要 mcp login。",
    code: `export APPCIRCLE_ACCESS_TOKEN
codex mcp add appcircle --url https://mcp.appcircle.io --bearer-token-env-var APPCIRCLE_ACCESS_TOKEN

# [mcp_servers.appcircle]
# url = "https://mcp.appcircle.io"
# bearer_token_env_var = "APPCIRCLE_ACCESS_TOKEN"
# enabled = true
`,
  },
  {
    id: "flutter-mcp-toolkit-plugin",
    title: "Flutter MCP toolkit",
    filename: "terminal",
    summary:
      "主路径是 flutter-mcp-toolkit init codex。或 marketplace add Arenukvern/mcp_flutter 再 /plugins 装。不要发明 plugin add。",
    code: `flutter-mcp-toolkit init codex

# 或：codex plugin marketplace add Arenukvern/mcp_flutter
# 然后 TUI /plugins 选 Flutter MCP Toolkit
# 不要发明 plugin add 的 @id
`,
  },
  {
    id: "revenuecat-codex-plugin",
    title: "RevenueCat AI Toolkit",
    filename: "terminal",
    summary:
      "主路径是 marketplace add RevenueCat/ai-toolkit，再 plugin add revenuecat@RevenueCat，再 mcp login RevenueCat。不要抄 mcp-remote。",
    code: `codex plugin marketplace add RevenueCat/ai-toolkit
codex plugin add revenuecat@RevenueCat
codex mcp login RevenueCat

# 可选：codex plugin add revenuecat-play-billing@RevenueCat
# 插件 MCP 消失才：codex mcp add RevenueCat --url https://mcp.revenuecat.ai/mcp
`,
  },
  {
    id: "pathbound-mcp-http",
    title: "Pathbound 远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add pathbound --url https://mcp.pathbound.ai/mcp，再 mcp login pathbound。不要抄 Claude.ai 或 ChatGPT Plugins。",
    code: `codex mcp add pathbound --url https://mcp.pathbound.ai/mcp
codex mcp login pathbound

# [mcp_servers.pathbound]
# url = "https://mcp.pathbound.ai/mcp"
# enabled = true
`,
  },
  {
    id: "stackone-mcp-http",
    title: "StackOne 远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add stackone --url https://mcp.stackone.com/mcp，再 mcp login stackone。不要抄 Claude 的 --transport http。无头才把 token 拼进 api.stackone.com/mcp。",
    code: `codex mcp add stackone --url https://mcp.stackone.com/mcp
codex mcp login stackone

# [mcp_servers.stackone]
# url = "https://mcp.stackone.com/mcp"
# enabled = true
`,
  },
  {
    id: "butter-mcp-http",
    title: "Butter 远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add butter --url https://mcp.hellobutter.io/mcp，再 mcp login butter。不要抄 Claude 的 --transport http。不是 ButterKit.app。",
    code: `codex mcp add butter --url https://mcp.hellobutter.io/mcp
codex mcp login butter

# [mcp_servers.butter]
# url = "https://mcp.hellobutter.io/mcp"
# enabled = true
`,
  },
  {
    id: "design-revision-mcp-http",
    title: "DesignRevision 远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add design-revision --url https://mcp.designrevision.com/mcp --bearer-token-env-var DESIGNREVISION_API_KEY。不要 mcp login。不要把 token 写进 http_headers。",
    code: `codex mcp add design-revision --url https://mcp.designrevision.com/mcp --bearer-token-env-var DESIGNREVISION_API_KEY

# [mcp_servers.design-revision]
# url = "https://mcp.designrevision.com/mcp"
# bearer_token_env_var = "DESIGNREVISION_API_KEY"
# enabled = true
`,
  },
  {
    id: "shadcn-mcp-stdio",
    title: "shadcn 官方 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "官方是手写 [mcp_servers.shadcn]，npx shadcn@latest mcp。shadcn CLI 不能自动改 config.toml。这是本地 stdio，不要 mcp login。",
    code: `codex mcp add shadcn -- npx shadcn@latest mcp

# [mcp_servers.shadcn]
# command = "npx"
# args = ["shadcn@latest", "mcp"]
`,
  },
  {
    id: "inngest-mcp-http",
    title: "Inngest Cloud MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add inngest-cloud --url https://api.inngest.com/mcp --bearer-token-env-var INNGEST_API_KEY。不要 mcp login。本机另开 inngest-dev。",
    code: `codex mcp add inngest-cloud --url https://api.inngest.com/mcp --bearer-token-env-var INNGEST_API_KEY

# [mcp_servers.inngest-cloud]
# url = "https://api.inngest.com/mcp"
# bearer_token_env_var = "INNGEST_API_KEY"
# enabled = true

# 本机 Dev Server（先 inngest dev）
# codex mcp add inngest-dev --url http://127.0.0.1:8288/mcp
`,
  },
  {
    id: "polar-mcp-http",
    title: "Polar MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add polar --url https://mcp.polar.sh/mcp/polar-mcp，随后完成 OAuth。沙箱另开 polar-sandbox。不要抄 Claude 的 --transport http。",
    code: `codex mcp add polar --url https://mcp.polar.sh/mcp/polar-mcp
codex mcp login polar

# [mcp_servers.polar]
# url = "https://mcp.polar.sh/mcp/polar-mcp"
# enabled = true

# 沙箱
# codex mcp add polar-sandbox --url https://mcp.polar.sh/mcp/polar-sandbox
`,
  },
  {
    id: "inngest-codex-plugin",
    title: "Inngest Codex 插件",
    filename: "terminal",
    summary:
      "主路径是 git clone 后 /plugin install …/inngest-codex-plugin/plugins/inngest。不要发明 plugin add inngest@。不要抄 Claude 的 inngest@inngest-claude-code-plugin。",
    code: `git clone https://github.com/inngest/inngest-codex-plugin.git

# Codex 会话里，换成你机器上的绝对路径：
# /plugin install $HOME/src/inngest-codex-plugin/plugins/inngest

# 备选：在克隆根加本地 marketplace
# codex plugin marketplace add .
`,
  },
  {
    id: "appwrite-codex-plugin",
    title: "Appwrite Codex 插件与远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 plugin marketplace add appwrite/codex-plugin，再 /plugins 装 Appwrite。远程 MCP 是 mcp add appwrite --url https://mcp.appwrite.io/，有尾斜杠。不要发明 plugin add appwrite@。",
    code: `codex plugin marketplace add appwrite/codex-plugin

# TUI：/plugins 选 Appwrite
# /mcp 里没有 appwrite 时再加远程表：
codex mcp add appwrite --url https://mcp.appwrite.io/
codex mcp login appwrite

# [mcp_servers.appwrite]
# url = "https://mcp.appwrite.io/"
# enabled = true
`,
  },
  {
    id: "trigger-mcp-stdio",
    title: "Trigger.dev MCP",
    filename: "config.toml",
    summary:
      "主路径是 npx trigger.dev@latest install-mcp --client openai-codex。表名 trigger，本地 stdio。必须 startup_timeout_sec = 30。不要 mcp login。不要 --yolo。",
    code: `npx trigger.dev@latest install-mcp --client openai-codex

# 或：
# codex mcp add trigger -- npx trigger.dev@latest mcp

# [mcp_servers.trigger]
# command = "npx"
# args = ["trigger.dev@latest", "mcp"]
# startup_timeout_sec = 30
# enabled = true
`,
  },
  {
    id: "workos-mcp-http",
    title: "WorkOS MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add workos --url https://mcp.workos.com/mcp，再 mcp get / mcp login / mcp list。URL 带 /mcp。OAuth，不要 API key。不要发明 plugin add workos@。",
    code: `codex mcp add workos --url https://mcp.workos.com/mcp
codex mcp get workos
codex mcp login workos
codex mcp list

# [mcp_servers.workos]
# url = "https://mcp.workos.com/mcp"
# enabled = true
`,
  },
  {
    id: "statsig-mcp-http",
    title: "Statsig MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add statsig --url https://api.statsig.com/v1/mcp。URL 是 /v1/mcp。OAuth，浏览器没弹再 mcp login statsig。不要抄 npx mcp-remote。",
    code: `codex mcp add statsig --url https://api.statsig.com/v1/mcp
codex mcp login statsig

# [mcp_servers.statsig]
# url = "https://api.statsig.com/v1/mcp"
# enabled = true
`,
  },
  {
    id: "contentful-mcp-stdio",
    title: "Contentful MCP",
    filename: "config.toml",
    summary:
      "主路径是 mcp add contentful -- npx -y @contentful/mcp-server。表名 contentful，本地 stdio。PAT 用 env_vars。不要 mcp login。不要发明远程 --url。",
    code: `codex mcp add contentful -- npx -y @contentful/mcp-server

# [mcp_servers.contentful]
# command = "npx"
# args = ["-y", "@contentful/mcp-server"]
# env_vars = ["CONTENTFUL_MANAGEMENT_ACCESS_TOKEN", "SPACE_ID"]
# startup_timeout_sec = 30
# enabled = true
`,
  },
  {
    id: "loops-mcp-http",
    title: "Loops MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add loops --url https://mcp.loops.so。URL 没有 /mcp。OAuth，浏览器没弹再 mcp login loops。不要发明 plugin add loops@。",
    code: `codex mcp add loops --url https://mcp.loops.so
codex mcp login loops

# [mcp_servers.loops]
# url = "https://mcp.loops.so"
# enabled = true
`,
  },
  {
    id: "brightdata-mcp-stdio",
    title: "Bright Data MCP",
    filename: "config.toml",
    summary:
      "主路径是 mcp add brightdata -- npx -y @brightdata/mcp。表名 brightdata，本地 stdio。API_TOKEN 用 env_vars。不要 mcp login。不要把 token 拼进 URL。",
    code: `codex mcp add brightdata -- npx -y @brightdata/mcp

# [mcp_servers.brightdata]
# command = "npx"
# args = ["-y", "@brightdata/mcp"]
# env_vars = ["API_TOKEN"]
# startup_timeout_sec = 30
# enabled = true
`,
  },
  {
    id: "buffer-mcp-http",
    title: "Buffer MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add buffer --url https://mcp.buffer.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login buffer。不要发明 plugin add buffer@。",
    code: `codex mcp add buffer --url https://mcp.buffer.com/mcp
codex mcp login buffer

# [mcp_servers.buffer]
# url = "https://mcp.buffer.com/mcp"
# enabled = true
`,
  },
];
