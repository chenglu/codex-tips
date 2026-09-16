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
      "US1 是 mcp.datadoghq.com/v1/mcp。随后 mcp login。工具集写 X-Datadog-MCP-Toolsets，不要把 ?toolsets= 拼进 URL。",
    code: `[mcp_servers.datadog]
url = "https://mcp.datadoghq.com/v1/mcp"
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
  {
    id: "growthbook-mcp-stdio",
    title: "GrowthBook MCP",
    filename: "config.toml",
    summary:
      "主路径是 mcp add growthbook -- npx -y @growthbook/mcp@latest。表名 growthbook，本地 stdio。GB_API_KEY 用 env_vars。不要 mcp login。不要发明远程 --url。",
    code: `codex mcp add growthbook -- npx -y @growthbook/mcp@latest

# [mcp_servers.growthbook]
# command = "npx"
# args = ["-y", "@growthbook/mcp@latest"]
# env_vars = ["GB_API_KEY"]
# startup_timeout_sec = 30
# enabled = true
`,
  },
  {
    id: "unleash-mcp-stdio",
    title: "Unleash MCP",
    filename: "config.toml",
    summary:
      "主路径是 mcp add unleash -- npx -y @unleash/mcp@latest --log-level error。表名 unleash，本地 stdio。UNLEASH_BASE_URL 和 UNLEASH_PAT 用 env_vars。不要 mcp login。不要抄 --transport http。",
    code: `codex mcp add unleash -- npx -y @unleash/mcp@latest --log-level error

# [mcp_servers.unleash]
# command = "npx"
# args = ["-y", "@unleash/mcp@latest", "--log-level", "error"]
# env_vars = ["UNLEASH_BASE_URL", "UNLEASH_PAT"]
# startup_timeout_sec = 30
# enabled = true
`,
  },
  {
    id: "flagsmith-mcp-http",
    title: "Flagsmith MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add flagsmith --url https://mcp.flagsmith.com。URL 没有 /mcp。OAuth，浏览器没弹再 mcp login flagsmith。不要发明 plugin add flagsmith@。",
    code: `codex mcp add flagsmith --url https://mcp.flagsmith.com
codex mcp login flagsmith

# [mcp_servers.flagsmith]
# url = "https://mcp.flagsmith.com"
# enabled = true
`,
  },
  {
    id: "devcycle-mcp-http",
    title: "DevCycle MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add devcycle --url https://mcp.devcycle.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login devcycle。不要发明 plugin add devcycle@。",
    code: `codex mcp add devcycle --url https://mcp.devcycle.com/mcp
codex mcp login devcycle

# [mcp_servers.devcycle]
# url = "https://mcp.devcycle.com/mcp"
# enabled = true
`,
  },
  {
    id: "optimizely-mcp-http",
    title: "Optimizely Experimentation MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add optimizely --url https://exp.mcp.opal.optimizely.com/mcp。URL 带 /mcp。OAuth 走 Opal，浏览器没弹再 mcp login optimizely。不要发明 plugin add optimizely@。",
    code: `codex mcp add optimizely --url https://exp.mcp.opal.optimizely.com/mcp
codex mcp login optimizely

# [mcp_servers.optimizely]
# url = "https://exp.mcp.opal.optimizely.com/mcp"
# enabled = true
`,
  },
  {
    id: "digitalocean-inference-provider",
    title: "DigitalOcean Inference 模型供应商",
    filename: "~/.codex/config.toml",
    summary:
      "inference.do-ai.run/v1，env_key = MODEL_ACCESS_KEY，wire_api = responses。再用 digitalocean.config.toml 和 --profile digitalocean。不是 DigitalOcean MCP。",
    code: `[model_providers.openai_custom]
name = "OpenAI Compatible"
base_url = "https://inference.do-ai.run/v1"
env_key = "MODEL_ACCESS_KEY"
wire_api = "responses"
query_params = {}
`,
  },
  {
    id: "customerio-codex-plugin",
    title: "Customer.io Codex 插件",
    filename: "terminal",
    summary:
      "主路径是桌面 Plugins 或 /plugins 搜 Customer.io。不要 mcp add，也不要手贴 mcp.customer.io/mcp。不要发明 plugin add customerio@。",
    code: `# 官方主路径：TUI /plugins 或桌面 Plugins 搜 Customer.io
# 不要 codex mcp add，也不要手贴 URL
# 插件底层入口（安装时不用填）：https://mcp.customer.io/mcp
`,
  },
  {
    id: "klaviyo-mcp-http",
    title: "Klaviyo MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add klaviyo --url https://mcp.klaviyo.com/mcp。URL 带 /mcp。OAuth DCR，浏览器没弹再 mcp login klaviyo。不要发明 plugin add klaviyo@。",
    code: `codex mcp add klaviyo --url https://mcp.klaviyo.com/mcp
codex mcp login klaviyo

# 先只读：
# url = "https://mcp.klaviyo.com/mcp?read-only=true"

# [mcp_servers.klaviyo]
# url = "https://mcp.klaviyo.com/mcp"
# enabled = true
`,
  },
  {
    id: "braze-mcp-http",
    title: "Braze MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add braze --url https://mcp.braze.com/mcp。URL 带 /mcp。OAuth DCR，浏览器没弹再 mcp login braze。欧盟换 mcp.braze.eu/mcp。不要发明 plugin add braze@。",
    code: `codex mcp add braze --url https://mcp.braze.com/mcp
codex mcp login braze

# 欧盟：
# url = "https://mcp.braze.eu/mcp"

# [mcp_servers.braze]
# url = "https://mcp.braze.com/mcp"
# enabled = true
`,
  },
  {
    id: "onesignal-codex-plugin",
    title: "OneSignal Codex 插件",
    filename: "terminal",
    summary:
      "主路径是桌面 Plugins 或 /plugins 搜 OneSignal。不要 mcp add，也不要手贴 api.onesignal.com/mcp/oauth。不要发明 plugin add onesignal@。",
    code: `# 官方主路径：TUI /plugins 或桌面 Plugins 搜 OneSignal
# 不要 codex mcp add，也不要手贴 URL
# 插件底层入口（安装时不用填）：https://api.onesignal.com/mcp/oauth
`,
  },
  {
    id: "beehiiv-mcp-http",
    title: "beehiiv MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add beehiiv --url https://mcp.beehiiv.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login beehiiv。不要发明 plugin add beehiiv@。",
    code: `codex mcp add beehiiv --url https://mcp.beehiiv.com/mcp
codex mcp login beehiiv

# 多 workspace：
# url = "https://mcp.beehiiv.com/mcp?account=1"

# [mcp_servers.beehiiv]
# url = "https://mcp.beehiiv.com/mcp"
# enabled = true
`,
  },
  {
    id: "mailerlite-mcp-http",
    title: "MailerLite MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add mailerlite --url https://mcp.mailerlite.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login mailerlite。不要发明 plugin add mailerlite@。",
    code: `codex mcp add mailerlite --url https://mcp.mailerlite.com/mcp
codex mcp login mailerlite

# [mcp_servers.mailerlite]
# url = "https://mcp.mailerlite.com/mcp"
# enabled = true
`,
  },
  {
    id: "buildkite-mcp-http",
    title: "Buildkite MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add buildkite --url https://mcp.buildkite.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login buildkite。不要发明 plugin add buildkite@。",
    code: `codex mcp add buildkite --url https://mcp.buildkite.com/mcp
codex mcp login buildkite

# 只要读：
# codex mcp add buildkite-readonly --url https://mcp.buildkite.com/mcp/readonly

# 只要 pipelines：
# url = "https://mcp.buildkite.com/mcp/x/pipelines"

# [mcp_servers.buildkite]
# url = "https://mcp.buildkite.com/mcp"
# enabled = true
`,
  },
  {
    id: "pulumi-mcp-http",
    title: "Pulumi MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add pulumi --url https://mcp.ai.pulumi.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login pulumi。不要发明 plugin add pulumi@。不要抄 bearer_token_env_var。",
    code: `codex mcp add pulumi --url https://mcp.ai.pulumi.com/mcp
codex mcp login pulumi

# [mcp_servers.pulumi]
# url = "https://mcp.ai.pulumi.com/mcp"
# enabled = true
`,
  },
  {
    id: "pulumi-agent-skills",
    title: "Pulumi Agent Skills marketplace",
    filename: "terminal",
    summary:
      "主路径是 plugin marketplace add pulumi/agent-skills，再 /plugins 装 pulumi。不要发明 plugin add。不要并装 pulumi-migration。不要抄 npx skills add --agent junie 当 --agent codex。",
    code: `codex plugin marketplace add pulumi/agent-skills

# 然后 TUI /plugins 选 Pulumi Agent Skills，安装 pulumi
# pulumi 已含 migration / delegation，不要并装那两个
# 不要发明 plugin add 的 @id
# 不要抄 npx skills add --agent junie 当 --agent codex
`,
  },
  {
    id: "pulumi-brand-http",
    title: "Pulumi 品牌 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add pulumi-brand --url https://brand.pulumi.com/mcp。URL 带 /mcp。无鉴权，不要 mcp login。不要抄 mcp-remote。不要和 Cloud 远程 MCP 搞成一台。",
    code: `codex mcp add pulumi-brand --url https://brand.pulumi.com/mcp

# [mcp_servers.pulumi-brand]
# url = "https://brand.pulumi.com/mcp"
# enabled = true
`,
  },
  {
    id: "auth0-docs-mcp",
    title: "Auth0 文档 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add auth0-docs-mcp-server --url https://auth0.com/docs/mcp。无鉴权，不要 mcp login。不要抄 --transport http。不要和管理租户 stdio 搞成一台。",
    code: `codex mcp add auth0-docs-mcp-server --url https://auth0.com/docs/mcp
codex mcp list

# [mcp_servers.auth0-docs-mcp-server]
# url = "https://auth0.com/docs/mcp"
# enabled = true
`,
  },
  {
    id: "auth0-mcp-stdio",
    title: "Auth0 管理租户 MCP",
    filename: "terminal",
    summary:
      "主路径是先 init，再 mcp add auth0 -- npx -y @auth0/auth0-mcp-server run。stdio，不要 mcp login。不要抄 Linux 写死的 DBUS 路径。不要和文档 HTTP 那台搞成一台。",
    code: `npx @auth0/auth0-mcp-server init --read-only
codex mcp add auth0 --env DEBUG=auth0-mcp -- npx -y @auth0/auth0-mcp-server run
codex mcp list

# [mcp_servers.auth0]
# command = "npx"
# args = ["-y", "@auth0/auth0-mcp-server", "run"]
# startup_timeout_sec = 60
`,
  },
  {
    id: "netdata-cloud-http",
    title: "Netdata Cloud MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add netdata-cloud --url https://app.netdata.cloud/api/v1/mcp，再 bearer_token_env_var 读 NETDATA_CLOUD_API_TOKEN。不要 mcp login。不要抄 mcp-remote。",
    code: `export NETDATA_CLOUD_API_TOKEN
codex mcp add netdata-cloud --url https://app.netdata.cloud/api/v1/mcp --bearer-token-env-var NETDATA_CLOUD_API_TOKEN
codex mcp list

# [mcp_servers.netdata-cloud]
# url = "https://app.netdata.cloud/api/v1/mcp"
# bearer_token_env_var = "NETDATA_CLOUD_API_TOKEN"
`,
  },
  {
    id: "nvidia-skills-codex",
    title: "NVIDIA Agent Skills",
    filename: "terminal",
    summary:
      "主路径是 npx skills add nvidia/skills --skill cuopt-numerical-optimization-api --agent codex。不要省略 --agent codex。不要发明 plugin add nvidia@。",
    code: `npx skills add nvidia/skills --skill cuopt-numerical-optimization-api --agent codex

# 先看目录：
# npx skills add nvidia/skills --list
`,
  },
  {
    id: "postmark-agent-skills",
    title: "Postmark Agent Skills",
    filename: "terminal",
    summary:
      "主路径是 npx skills add ActiveCampaign/postmark-skills。官方没钉 --agent codex。示例技能是 postmark-send-email。不要发明 plugin add postmark@。",
    code: `npx skills add ActiveCampaign/postmark-skills

# 单项：
# npx skills add ActiveCampaign/postmark-skills --skill postmark-send-email
`,
  },
  {
    id: "datadog-agent-skills",
    title: "Datadog Agent Skills",
    filename: "terminal",
    summary:
      "主路径是 npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y。官方没钉 --agent codex。不要发明 plugin add。MCP 仍走 mcp.datadoghq.com/v1/mcp。",
    code: `npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y

# 只要 pup 手册：
# npx skills add datadog-labs/agent-skills --skill dd-pup --full-depth -y
`,
  },
  {
    id: "tavily-agent-skills",
    title: "Tavily Agent Skills",
    filename: "terminal",
    summary:
      "主路径是 npx skills add tavily-ai/skills --all。官方没钉 --agent codex。示例技能是 tavily-search。不要发明 mcp add 或 plugin add。",
    code: `npx skills add tavily-ai/skills --all

# 单项：
# npx skills add tavily-ai/skills --skill tavily-search
`,
  },
  {
    id: "rudderstack-mcp-http",
    title: "RudderStack MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add rudderstack --url https://mcp.rudderstack.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login rudderstack。不要发明 plugin add rudder@。不要抄 mcp-remote。",
    code: `codex mcp add rudderstack --url https://mcp.rudderstack.com/mcp
codex mcp login rudderstack

# [mcp_servers.rudderstack]
# url = "https://mcp.rudderstack.com/mcp"
# enabled = true
`,
  },
  {
    id: "rudderstack-agent-skills",
    title: "RudderStack Agent Skills",
    filename: "terminal",
    summary:
      "主路径是 npx skills add rudderlabs/rudder-agent-skills。官方没钉 --agent codex。示例技能是 rudder-cli-workflow。不要发明 plugin add。不要抄 /plugin marketplace add。",
    code: `npx skills add rudderlabs/rudder-agent-skills --list
npx skills add rudderlabs/rudder-agent-skills --agent codex --skill rudder-cli-workflow

# 官方示例钉的是 Claude：
# npx skills add rudderlabs/rudder-agent-skills -a claude-code --skill rudder-cli-workflow
`,
  },
  {
    id: "kuroco-mcp-http",
    title: "Kuroco MCP",
    filename: "~/.codex/config.toml",
    summary:
      "主路径是 mcp add kuroco --url https://YOUR_SITE_KEY.g.kuroco.app/rcms-api/API_ID/mcp --oauth-client-id。不支持 CIMD。不要发明 plugin add。头认证才 env_http_headers 的 X-RCMS-API-ACCESS-TOKEN。",
    code: `codex mcp add kuroco --url https://YOUR_SITE_KEY.g.kuroco.app/rcms-api/API_ID/mcp --oauth-client-id YOUR_CLIENT_ID
codex mcp login kuroco

# [mcp_servers.kuroco]
# url = "https://YOUR_SITE_KEY.g.kuroco.app/rcms-api/API_ID/mcp"
# [mcp_servers.kuroco.oauth]
# client_id = "YOUR_CLIENT_ID"
`,
  },
  {
    id: "wherobots-mcp-http",
    title: "Wherobots MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add wherobots-mcp-server --url https://api.cloud.wherobots.com/mcp/。文档仍写只支持 stdio，现行用 --url。再 mcp login。不要把 API key 写进 http_headers，头认证才 env_http_headers 的 X-API-Key。",
    code: `codex mcp add wherobots-mcp-server --url https://api.cloud.wherobots.com/mcp/
codex mcp login wherobots-mcp-server

# [mcp_servers.wherobots-mcp-server]
# url = "https://api.cloud.wherobots.com/mcp/"
# enabled = true
`,
  },
  {
    id: "wherobots-agent-skills",
    title: "Wherobots Agent Skills",
    filename: "terminal",
    summary:
      "主路径是 npx skills add -g wherobots/agent-skills。官方没钉 --agent codex。单项示例是 --skill wherobots-usage。不要发明 plugin add。不要抄 Cursor 插件。",
    code: `npx skills add wherobots/agent-skills --list
npx skills add -g wherobots/agent-skills

# 单项：
# npx skills add -g wherobots/agent-skills --skill wherobots-usage
# npx skills add wherobots/agent-skills@wherobots-usage
`,
  },
  {
    id: "hex-codex-plugin",
    title: "Hex Codex 插件",
    filename: "terminal",
    summary:
      "主路径是桌面 Plugins 或 /plugins 搜 Hex，点 Connect，再连捆绑的 Hex app。不要发明 plugin add hex@。不要抄 Cursor 的 /add-plugin hex。其它客户端才是 app.hex.tech/mcp。",
    code: `# 官方主路径：TUI /plugins 或桌面 Plugins 搜 Hex
# 点 Connect，再连捆绑的 Hex app 做 OAuth
# 不要 codex plugin add hex@…
# 不要 Cursor /add-plugin hex
# 其它客户端（不是 Codex 专节）才是：
# https://app.hex.tech/mcp
# 自定义域换主机：eu.hex.tech / hc.hex.tech
`,
  },
  {
    id: "webflow-codex-plugin",
    title: "Webflow Codex 插件",
    filename: "terminal",
    summary:
      "主路径是 ChatGPT 桌面切到 Codex，或 /plugins 搜 Webflow，点 Install，再 Continue to Webflow。不要发明 plugin add webflow@。不要抄 Claude 的 --transport http。其它客户端才是 mcp.webflow.com/mcp。",
    code: `# 官方主路径：ChatGPT 桌面切到 Codex，Plugins 搜 Webflow
# 或 TUI /plugins 搜 Webflow
# 点 Install，再 Continue to Webflow 做 OAuth
# 不要 codex plugin add webflow@…
# 不要 claude mcp add --transport http
# 其它客户端（不是 Codex 帮助主路径）才是：
# https://mcp.webflow.com/mcp
# 改画布：Designer 按 E，开 Webflow MCP Bridge App
`,
  },
  {
    id: "omni-mcp-http",
    title: "Omni MCP",
    filename: "config.toml",
    summary:
      "OAuth 官方是 callbacks.omniapp.co/callback/mcp。API key 才是实例的 /mcp/https，加 --url 和 bearer_token_env_var。官方 Option A 漏了 --url。不要抄 http_headers 里的 Bearer。",
    code: `codex mcp add omni --url https://callbacks.omniapp.co/callback/mcp
# 浏览器没弹再：codex mcp login omni

# API key（把 acme.omniapp.co 换成你的实例）：
# codex mcp add omni --url https://acme.omniapp.co/mcp/https --bearer-token-env-var OMNI_API_KEY

[mcp_servers.omni]
url = "https://callbacks.omniapp.co/callback/mcp"
enabled = true

# API key 示例：
# [mcp_servers.omni]
# url = "https://acme.omniapp.co/mcp/https"
# bearer_token_env_var = "OMNI_API_KEY"
# enabled = true
`,
  },
  {
    id: "dagu-mcp-http",
    title: "Dagu MCP",
    filename: "config.toml",
    summary:
      "官方 Codex 专节：本机 http://localhost:8080/mcp。builtin 鉴权加 bearer_token_env_var。不要抄 --transport http 或 mcp-remote。",
    code: `codex mcp add dagu --url http://localhost:8080/mcp --bearer-token-env-var DAGU_MCP_API_KEY

# 无鉴权本机：
# codex mcp add dagu --url http://localhost:8080/mcp

[mcp_servers.dagu]
url = "http://localhost:8080/mcp"
bearer_token_env_var = "DAGU_MCP_API_KEY"
enabled = true
`,
  },
  {
    id: "prefect-codex-plugin",
    title: "Prefect Codex 插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add prefecthq/prefect-mcp-server，再 plugin add prefect@prefect。本机 stdio 才 uvx --from prefect-mcp。官方 TOML 错写成 [mcp.prefect]。不要抄 Claude 的 --transport http。",
    code: `codex plugin marketplace add prefecthq/prefect-mcp-server
codex plugin add prefect@prefect

# 本机 stdio（插件已装时改名 prefect_local）：
# codex mcp add prefect -- uvx --from prefect-mcp prefect-mcp-server

# 官方手写 TOML 错写成 [mcp.prefect]，应是：
[mcp_servers.prefect]
command = "uvx"
args = ["--from", "prefect-mcp", "prefect-mcp-server"]
env_vars = ["PREFECT_API_KEY"]
startup_timeout_sec = 60
enabled = true

[mcp_servers.prefect.env]
PREFECT_API_URL = "https://api.prefect.cloud/api/accounts/ACCOUNT_UUID/workspaces/WORKSPACE_UUID"
`,
  },
  {
    id: "windmill-mcp-http",
    title: "Windmill MCP",
    filename: "config.toml",
    summary:
      "官方 Codex 专节：mcp.gowindmill.com/mcp，再 mcp login windmill。不是 windmill.dev。不要发明 plugin add。不要抄 Claude 的 --transport http。",
    code: `codex mcp add windmill --url https://mcp.gowindmill.com/mcp
codex mcp login windmill

[mcp_servers.windmill]
url = "https://mcp.gowindmill.com/mcp"
enabled = true
`,
  },
  {
    id: "reui-mcp-http",
    title: "ReUI MCP",
    filename: "config.toml",
    summary:
      "官方 Codex：url 是 https://mcp.reui.io，不要加 /mcp。交互走 mcp login。无头才 bearer_token_env_var。OAuth 和 bearer 不要叠。不要把 components.json 的占位符抄进 http_headers。",
    code: `codex mcp add reui --url https://mcp.reui.io
codex mcp login reui

# 无头 / CI：
# codex mcp add reui --url https://mcp.reui.io --bearer-token-env-var REUI_LICENSE_KEY

[mcp_servers.reui]
url = "https://mcp.reui.io"
enabled = true

# 无头示例：
# [mcp_servers.reui]
# url = "https://mcp.reui.io"
# bearer_token_env_var = "REUI_LICENSE_KEY"
# enabled = true
`,
  },
  {
    id: "alloy-mcp-http",
    title: "Alloy MCP",
    filename: "config.toml",
    summary:
      "官方 Codex：url 是 https://mcp.alloy.app/mcp，再 mcp login alloy。这是 alloy.app 原型会话，不是 alloy.cx。无头才 ALLOY_MCP_API_KEY。不要抄 mcp-remote 的 X-MCP-API-Key。",
    code: `codex mcp add alloy --url https://mcp.alloy.app/mcp
codex mcp login alloy

# 已有 bearer 表时先卸：
# codex mcp remove alloy

# 无头 / CI：
# [mcp_servers.alloy]
# url = "https://mcp.alloy.app/mcp"
# bearer_token_env_var = "ALLOY_MCP_API_KEY"
# enabled = true

[mcp_servers.alloy]
url = "https://mcp.alloy.app/mcp"
enabled = true
`,
  },
  {
    id: "firebase-agent-skills",
    title: "Firebase Agent Skills 插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add firebase/agent-skills，再 plugin add firebase@firebase。不要抄 README 的 firebase/skills，也不要抄 Claude 的 firebase/firebase-tools。npx skills add 不是 Codex 插件安装器。",
    code: `codex plugin marketplace add firebase/agent-skills
codex plugin add firebase@firebase

# 升级：
# codex plugin marketplace upgrade firebase
# 刷新捡不到再：
# codex plugin remove firebase@firebase
# codex plugin add firebase@firebase

# 只要 MCP、插件装不上时（MCP 页没有 Codex 专节）：
# codex mcp add firebase -- npx -y firebase-tools@latest mcp
`,
  },
  {
    id: "mintlify-admin-mcp",
    title: "Mintlify Admin MCP",
    filename: "config.toml",
    summary:
      "官方 Codex：url 是 https://mcp.mintlify.com，再 mcp login mintlify。不要加 /mcp。文档检索是 mintlify.com/docs/mcp，另开表，不要覆盖 Admin。",
    code: `codex mcp add mintlify --url https://mcp.mintlify.com
codex mcp login mintlify

# 文档检索另开表，不要覆盖 Admin：
# codex mcp add mintlify-docs --url https://mintlify.com/docs/mcp

[mcp_servers.mintlify]
url = "https://mcp.mintlify.com"
enabled = true
`,
  },
  {
    id: "squirrelscan-mcp-http",
    title: "Squirrelscan 托管 MCP",
    filename: "config.toml",
    summary:
      "官方 Codex：url 是 https://mcp.squirrelscan.com/mcp，再 mcp login squirrelscan。必须带 /mcp。无头才 SQUIRRELSCAN_API_KEY。不要叠 OAuth 和 bearer。不要写 experimental_environment。本机 squirrel mcp 另起表。",
    code: `codex mcp add squirrelscan --url https://mcp.squirrelscan.com/mcp
codex mcp login squirrelscan

# 已有 bearer 表时先卸：
# codex mcp remove squirrelscan

# 无头 / CI：
# [mcp_servers.squirrelscan]
# url = "https://mcp.squirrelscan.com/mcp"
# bearer_token_env_var = "SQUIRRELSCAN_API_KEY"
# enabled = true

[mcp_servers.squirrelscan]
url = "https://mcp.squirrelscan.com/mcp"
enabled = true
`,
  },
  {
    id: "planetscale-codex-plugin",
    title: "PlanetScale Codex 插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add planetscale/codex-plugin，再 plugin add planetscale@planetscale。不要加成 claude-plugin。只要 MCP 才走 mcp add planetscale。插件表名是 PlanetScale。",
    code: `codex plugin marketplace add planetscale/codex-plugin
codex plugin add planetscale@planetscale

# 升级：
# codex plugin marketplace upgrade planetscale

# 插件 MCP 表名是 PlanetScale（首字母大写）：
# codex mcp login PlanetScale

# 只要 MCP、不要技能（文档 Codex 专节）：
# codex mcp add planetscale --url https://mcp.pscale.dev/mcp/planetscale
`,
  },
  {
    id: "geoly-codex-plugin",
    title: "GEOly Codex 插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add geoly-ai/codex-plugins，再 plugin add geoly-mcp@geoly。CLI 动词是 add 不是 install。upgrade geoly 不够，还要再 plugin add。插件表名是 geoly。",
    code: `codex plugin marketplace add geoly-ai/codex-plugins
codex plugin add geoly-mcp@geoly

# 升级三步（upgrade 只刷新目录）：
# codex plugin marketplace upgrade geoly
# codex plugin add geoly-mcp@geoly
# 彻底退出并新开会话

# 没弹 OAuth 再：
# codex mcp login geoly

# 卸：
# codex plugin remove geoly-mcp
# codex plugin marketplace remove geoly
`,
  },
  {
    id: "cortexcode-tool-codex",
    title: "Snowflake Cortex Code CLI",
    filename: "terminal",
    summary:
      "主路径是 clone 后 bash integrations/codex/install.sh。不要跑 npx skills add。先 which cortex。聊天批准后再 --yes --envelope RO。",
    code: `git clone https://github.com/Snowflake-Labs/subagent-cortex-code.git
cd subagent-cortex-code
bash integrations/codex/install.sh

# 先确认 Cortex CLI：
# which cortex
# cortex connections list

# 核对：
# cortexcode-tool --version
# cortexcode-tool --envelope RO "How many databases do I have in Snowflake?"

# 卸：
# bash integrations/codex/uninstall.sh
`,
  },
  {
    id: "gitlab-orbit-local-mcp",
    title: "GitLab Orbit Local MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add orbit-cli -- orbit mcp serve。先 which orbit。不要 mcp login。不要抄远程 api/v4/orbit/mcp 的 mcp-remote。",
    code: `codex mcp add orbit-cli -- orbit mcp serve

# glab 包装：
# codex mcp add orbit-cli -- glab orbit mcp serve

# 可选先索引当前仓库：
# orbit index .

# 不要：
# npx mcp-remote https://gitlab.com/api/v4/orbit/mcp
`,
  },
  {
    id: "n8n-codex-mcp",
    title: "n8n Codex 插件与 MCP",
    filename: "terminal",
    summary:
      "主路径是 marketplace add n8n-io/skills，再 plugin add n8n-skills@n8n-io。MCP 要自己 mcp add n8n-mcp，路径是 mcp-server/http。不要叠文档那张 n8n 表。",
    code: `codex plugin marketplace add n8n-io/skills
codex plugin add n8n-skills@n8n-io

codex mcp add n8n-mcp --url https://acme.app.n8n.cloud/mcp-server/http
codex mcp login n8n-mcp

# 只要 MCP、不要技能（文档 Codex 专节表名是 n8n）：
# codex mcp add n8n --url https://acme.app.n8n.cloud/mcp-server/http
# codex mcp login n8n

# 无头 / CI：
# [mcp_servers.n8n-mcp]
# url = "https://acme.app.n8n.cloud/mcp-server/http"
# bearer_token_env_var = "N8N_MCP_TOKEN"
# enabled = true
`,
  },
  {
    id: "mcp-endor-cli-tools",
    title: "Endor Labs 扫描 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add endor-cli-tools -- npx -y endorctl ai-tools mcp-server。stdio，不要 mcp login。文档 MCP 另起 endor-docs 表，占位 ENDOR_DOCS_KEY。",
    code: `codex mcp add endor-cli-tools -- npx -y endorctl ai-tools mcp-server

# 企业版命名空间（不要 --env 字面量）：
# env_vars = ["ENDOR_NAMESPACE", "ENDOR_MCP_SERVER_AUTH_MODE", "ENDOR_MCP_SERVER_AUTH_TENANT"]

# 系统已装 endorctl：
# codex mcp add endor-cli-tools -- endorctl ai-tools mcp-server

# 文档 MCP（另一张表，占位 bearer）：
# export ENDOR_DOCS_KEY=dummy
# codex mcp add endor-docs --url https://docs.endorlabs.com/mcp --bearer-token-env-var ENDOR_DOCS_KEY

# 不要：
# codex mcp login endor-cli-tools
# npx skills add https://docs.endorlabs.com
`,
  },
  {
    id: "mcp-clickhouse-stdio",
    title: "ClickHouse 自建 mcp-clickhouse",
    filename: "~/.codex/config.toml",
    summary:
      "官方 Codex 是 uv run --with mcp-clickhouse。不要抄 --env 把密码写进 TOML。用 env_vars 转发。不要和 clickhouse-cloud 远程表叠。",
    code: `codex mcp add mcp-clickhouse -- uv run --with mcp-clickhouse --python 3.10 mcp-clickhouse

[mcp_servers.mcp-clickhouse]
command = "uv"
args = ["run", "--with", "mcp-clickhouse", "--python", "3.10", "mcp-clickhouse"]
env_vars = ["CLICKHOUSE_HOST", "CLICKHOUSE_USER", "CLICKHOUSE_PASSWORD"]
startup_timeout_sec = 60
enabled = true

[mcp_servers.mcp-clickhouse.env]
CLICKHOUSE_SECURE = "true"

# 自建明文 HTTP 才改：
# CLICKHOUSE_SECURE = "false"
# 并把 CLICKHOUSE_PORT 加进 env_vars
`,
  },
  {
    id: "jfrog-codex-plugin",
    title: "JFrog Codex 插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add jfrog/codex-plugin，再 plugin add jfrog@codex-plugin。把插件 .mcp.json 主机改成 acme.jfrog.io/mcp，再 mcp login jfrog。",
    code: `codex plugin marketplace add jfrog/codex-plugin
codex plugin add jfrog@codex-plugin

# 把安装路径/.mcp.json 的 url 改成：
# https://acme.jfrog.io/mcp
codex mcp login jfrog

# 只要 MCP、不要插件：
# codex mcp add jfrog --url https://acme.jfrog.io/mcp
# codex mcp login jfrog

# 不要：
# export JFROG_PLATFORM_URL=...
# 抄文档 mcpServers JSON
`,
  },
  {
    id: "nowledge-mem-codex-plugin",
    title: "Nowledge Mem Codex 插件",
    filename: "terminal",
    summary:
      "主路径是两个 --sparse 再 plugin add nowledge-mem@nowledge-community。先装 nmem。捆绑 MCP 是 127.0.0.1:14242/mcp/。不要 mcp login。装完跑 install_hooks.py。",
    code: `pip install nmem-cli
nmem doctor

codex plugin marketplace add nowledge-co/community --sparse .agents --sparse nowledge-mem-codex-plugin
codex plugin add nowledge-mem@nowledge-community

HOOK_SETUP="$(find ~/.codex/plugins/cache -path '*/nowledge-mem/*/scripts/install_hooks.py' -print 2>/dev/null | sort | tail -1)"
python3 "$HOOK_SETUP"

# 捆绑 MCP：http://127.0.0.1:14242/mcp/
# 不要：codex mcp login nowledge-mem
# 远程才覆盖 [mcp_servers.nowledge-mem]
`,
  },
  {
    id: "mcp-solo-agentregistry",
    title: "Solo agentregistry Codex MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add agentregistry --url http://localhost:31313/mcp，再 bearer_token_env_var ARCTL_TOKEN。没有 arctl configure Codex。生产 OAuth 才 --oauth-resource 和 mcp login --scopes openid,profile。",
    code: `export ARCTL_TOKEN="$(arctl user info --show-tokens | jq -r .access_token)"
codex mcp add agentregistry --url http://localhost:31313/mcp --bearer-token-env-var ARCTL_TOKEN

# 生产 Ingress + OAuth（IdP 必须 HTTPS）：
# codex mcp add agentregistry --url https://registry.acme.example/mcp --oauth-resource https://registry.acme.example/mcp
# codex mcp login agentregistry --scopes openid,profile

# 不要：
# arctl configure codex
# claude mcp add --transport http --header "Authorization: Bearer …"
`,
  },
  {
    id: "ecc-codex-native-plugin",
    title: "ECC 原生 Codex 插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add affaan-m/ECC，再 plugin add ecc@ecc。不要叠 sync-ecc-to-codex.sh。钩子要在 /hooks 另信。默认 MCP 只剩 chrome-devtools。",
    code: `codex plugin marketplace add affaan-m/ECC
codex plugin add ecc@ecc
codex plugin list --json

# 刷新：
# codex plugin marketplace upgrade ecc
# codex plugin add ecc@ecc

# 本地 checkout：
# codex plugin marketplace add /absolute/path/to/ECC
# codex plugin add ecc@ecc

# 不要：
# bash scripts/sync-ecc-to-codex.sh
# /plugin install ecc@ecc
`,
  },
  {
    id: "matlab-mcp-stdio",
    title: "MATLAB MCP stdio",
    filename: "terminal",
    summary:
      "主路径是 mcp add matlab -- 本机二进制绝对路径。stdio，不要 mcp login。Windows 要 env_vars 含 WINDIR。表名是 matlab，不要抄 matlab-core。",
    code: `chmod +x /home/acme/Downloads/matlab-mcp-server
codex mcp add matlab -- /home/acme/Downloads/matlab-mcp-server

# 钉根目录和工作目录（matlab-root 不要带 /bin）：
# codex mcp add matlab -- /home/acme/Downloads/matlab-mcp-server --matlab-root=/home/acme/MATLAB/R2026a --initial-working-folder=/home/acme/myproject

# Windows（手写 env_vars，mcp add 不会写）：
# [mcp_servers.matlab]
# command = 'C:\\Users\\acme\\Downloads\\matlab-mcp-server-windows-x64.exe'
# args = []
# env_vars = ["WINDIR"]
# enabled = true

# 不要：
# claude mcp add --transport stdio matlab -- …
# matlab-mcp-server.mcpb
`,
  },
  {
    id: "surrealdb-codex-mcp",
    title: "SurrealDB Codex MCP",
    filename: "terminal",
    summary:
      "托管主路径是 mcp add surrealdb --url https://mcp.surrealdb.com，不要加 /mcp。再 mcp login。插件才 marketplace add surrealdb/ai-codex-plugin。本机才带 /mcp。",
    code: `codex mcp add surrealdb --url https://mcp.surrealdb.com
codex mcp login surrealdb

# 插件（技能 + MCP）：
# codex plugin marketplace add surrealdb/ai-codex-plugin --ref main
# codex plugin add surrealdb@surrealdb

# 无头 / CI（官方变量名是 SURREALDB_TOKEN）：
# [mcp_servers.surrealdb]
# url = "https://mcp.surrealdb.com"
# bearer_token_env_var = "SURREALDB_TOKEN"
# enabled = true

# 本机实例才带 /mcp：
# codex mcp add surrealdb-local --url http://127.0.0.1:8000/mcp --bearer-token-env-var SURREALDB_MCP_TOKEN

# 不要：
# https://mcp.surrealdb.com/mcp
# claude mcp add --transport http surrealdb https://mcp.surrealdb.com
`,
  },
  {
    id: "infisical-agent-proxy-codex",
    title: "Infisical Agent Proxy 包装 Codex",
    filename: "terminal",
    summary:
      "主路径是 infisical secrets agent-proxy run -e dev --path=/coding-agent -- codex。这不是 MCP。不要给 run 传 --proxy。API 密钥登录才 --pass-env CODEX_API_KEY。",
    code: `infisical secrets agent-proxy run -e dev --path=/coding-agent -- codex

# 靠 CODEX_API_KEY 登录时：
# infisical secrets agent-proxy run -e dev --path=/coding-agent --pass-env CODEX_API_KEY -- codex

# 已有独立代理：
# infisical secrets agent-proxy connect --proxy=proxy.acme.internal:17322 --env=staging --path=/coding-agent -- codex

# 不要：
# infisical secrets agent-proxy run --proxy=127.0.0.1:17322 -- codex
# claude mcp add --transport http Infisical https://infisical.com/docs/mcp
# codex mcp add Infisical --url https://infisical.com/docs/mcp
`,
  },
  {
    id: "postman-codex-mcp",
    title: "Postman Codex MCP",
    filename: "~/.codex/config.toml",
    summary:
      "Postman Codex MCP 远程 Minimal 默认 OAuth。同一张 postman 表换 url，不要叠四张。EU 只有 API key。本机另起 postman-local。",
    code: `codex mcp add postman --url https://mcp.postman.com/minimal
codex mcp login postman

# EU / 无头（不要和 OAuth 写进同一张表）：
# codex mcp add postman --url https://mcp.eu.postman.com/minimal --bearer-token-env-var POSTMAN_API_KEY

# [mcp_servers.postman]
# url = "https://mcp.postman.com/minimal"
# enabled = true

# 本机 stdio 另起表。不要抄文档的 --env 字面量密钥：
# [mcp_servers.postman-local]
# command = "npx"
# args = ["-y", "@postman/postman-mcp-server"]
# env_vars = ["POSTMAN_API_KEY"]
# enabled = true
`,
  },
  {
    id: "apify-codex-plugin",
    title: "Apify Codex 插件",
    filename: "terminal",
    summary:
      "Apify Codex 插件捆绑 mcp.apify.com。marketplace add apify/apify-codex-plugin，再 plugin add apify@apify-plugins。不要手写 mcp add 叠一张。",
    code: `codex plugin marketplace add apify/apify-codex-plugin
codex plugin add apify@apify-plugins

# 只要 MCP、不要技能（不要和插件叠）：
# codex mcp add apify --url https://mcp.apify.com
# codex mcp login apify

# 无头：在启动 Codex 的进程里准备 APIFY_TOKEN，不要写进 http_headers
`,
  },
  {
    id: "nylas-codex-mcp",
    title: "Nylas Codex MCP",
    filename: "~/.codex/config.toml",
    summary:
      "Nylas Codex MCP 远程 US 默认无 /mcp。bearer_token_env_var 读 NYLAS_API_KEY。不要 mcp login，不要抄 mcp-remote。",
    code: `codex mcp add nylas --url https://mcp.us.nylas.com --bearer-token-env-var NYLAS_API_KEY

# EU：
# codex mcp add nylas --url https://mcp.eu.nylas.com --bearer-token-env-var NYLAS_API_KEY

# [mcp_servers.nylas]
# url = "https://mcp.us.nylas.com"
# bearer_token_env_var = "NYLAS_API_KEY"
# enabled = true

# 有 Nylas CLI 也可以（不要和手写表叠）：
# nylas mcp install --assistant codex
`,
  },
  {
    id: "microsoft-learn-codex-mcp",
    title: "Microsoft Learn Codex MCP",
    filename: "terminal",
    summary:
      "Learn MCP 远程走 api/mcp，无鉴权不要 mcp login。不要抄 VS Code JSON，也不要叠 Azure Skills 那台 azure 表。",
    code: `codex mcp add microsoft-learn --url https://learn.microsoft.com/api/mcp

# [mcp_servers.microsoft-learn]
# url = "https://learn.microsoft.com/api/mcp"
# enabled = true

# 可选插件（README 用户表没写；不要和手写表叠）：
# codex plugin marketplace add MicrosoftDocs/mcp
# codex plugin add microsoft-docs@microsoftdocs-local

# 不要：
# codex mcp login microsoft-learn
# https://learn.microsoft.com/api/mcp/openai-compatible
# /plugin install microsoft-docs@microsoft-docs-marketplace
`,
  },
  {
    id: "dotnet-skills-plugin",
    title: ".NET Agent Skills 插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add dotnet/skills，再 /plugins 装。upgrade 用清单名 dotnet-agent-skills 不是仓库路径。官方没给 plugin add id。",
    code: `codex plugin marketplace add dotnet/skills

# TUI /plugins 或桌面 Plugins 打开 .NET Agent Skills 再装
# 例如 dotnet、dotnet-msbuild、dotnet-aspnetcore、dotnet-blazor、dotnet11

codex plugin marketplace upgrade dotnet-agent-skills

# 不要：
# /plugin marketplace add dotnet/skills
# /plugin install dotnet@dotnet-agent-skills
# npx skills add
# skill-installer 当 /plugins
`,
  },
  {
    id: "mcp-helicone-stdio",
    title: "Helicone 本地 stdio MCP",
    filename: "~/.codex/config.toml",
    summary:
      "密钥走 env_vars 转发 HELICONE_API_KEY，不要抄文档 env 表里的 sk-helicone。主路径是 mcp add helicone -- npx @helicone/mcp@latest。stdio，不要 mcp login。",
    code: `codex mcp add helicone -- npx @helicone/mcp@latest

[mcp_servers.helicone]
command = "npx"
args = ["@helicone/mcp@latest"]
env_vars = ["HELICONE_API_KEY"]
enabled = true
startup_timeout_sec = 60

# 不要：
# [mcp_servers.helicone.env]
# HELICONE_API_KEY = "sk-helicone-xxxxxxx"
# codex mcp login helicone
# url = "https://api.helicone.ai"
`,
  },
  {
    id: "mcp-docker-toolkit",
    title: "Docker MCP Toolkit",
    filename: "terminal",
    summary:
      "主路径是 docker mcp client connect --global codex。connect 漏掉 --global 会报 only supports global configuration。表名 MCP_DOCKER。stdio，不要 mcp login。",
    code: `docker mcp client connect --global codex

# 指定 profile：
# docker mcp client connect --global --profile web-dev codex

# 手写等价（已经 connect 过就不要再 add）：
# codex mcp add MCP_DOCKER -- docker mcp gateway run

# [mcp_servers.MCP_DOCKER]
# command = "docker"
# args = ["mcp", "gateway", "run"]
# enabled = true
# startup_timeout_sec = 60

# 断开：
# docker mcp client disconnect --global codex

# 不要：
# docker mcp client connect codex
# docker mcp-client configure codex
# codex mcp login MCP_DOCKER
# docker mcp client connect vscode
`,
  },
  {
    id: "amd-skills-plugin",
    title: "AMD Skills 插件",
    filename: "terminal",
    summary:
      "upgrade 用清单名 amd-skills 不是仓库路径 amd/skills。主路径是 marketplace add amd/skills，再 plugin add amd-skills@amd-skills。",
    code: `codex plugin marketplace add amd/skills
codex plugin add amd-skills@amd-skills

# TUI /plugins 打开 AMD Skills 再装也可以
codex plugin marketplace upgrade amd-skills

# 插件包外的单项才：
# npx skills add amd/skills --skill serving-llms-on-epyc --agent codex

# 不要：
# npx skills add amd/skills
# /plugin marketplace add amd/skills
# plugin add amd@amd-skills
# plugin add amd-skills@openai-curated
# 手拷到 ~/.codex/skills
`,
  },
  {
    id: "mcp-danube-http",
    title: "Danube 远程 HTTP MCP",
    filename: "~/.codex/config.toml",
    summary:
      "不要把 danube-api-key 写进 http_headers，改 bearer_token_env_var。主路径是 mcp add danube --url https://mcp.danubeai.com/mcp --bearer-token-env-var DANUBE_API_KEY。",
    code: `codex mcp add danube --url https://mcp.danubeai.com/mcp --bearer-token-env-var DANUBE_API_KEY

[mcp_servers.danube]
url = "https://mcp.danubeai.com/mcp"
bearer_token_env_var = "DANUBE_API_KEY"
enabled = true
startup_timeout_sec = 30

# 自定义头回退才：
# [mcp_servers.danube.env_http_headers]
# danube-api-key = "DANUBE_API_KEY"

# 不要：
# [mcp_servers.danube.http_headers]
# danube-api-key = "dk_xxxxxxx"
# codex mcp login danube
# url 去掉 /mcp
`,
  },
  {
    id: "mcp-asana-v2-remote",
    title: "Asana V2 mcp-remote 凭证文件",
    filename: "~/.codex/config.toml",
    summary:
      "Asana 官方 Codex 走 stdio 桥。@ 后必须是绝对路径，~ 不会展开。不要 mcp add --url，也不要把 client_secret 写进 args。",
    code: `{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET"
}

# chmod 600 /absolute/path/to/mcp_oauth_client.json

[mcp_servers.asana]
command = "npx"
args = [
  "-y",
  "mcp-remote@latest",
  "https://mcp.asana.com/v2/mcp",
  "3334",
  "--static-oauth-client-info",
  "@/absolute/path/to/mcp_oauth_client.json",
  "--resource",
  "https://mcp.asana.com/v2"
]
startup_timeout_sec = 60

# 不要：
# codex mcp add asana --url https://mcp.asana.com/v2/mcp
# codex mcp login asana
# https://mcp.asana.com/sse
# --client-secret 写进 args
`,
  },
  {
    id: "mcp-sequel-http",
    title: "Sequel 远程 MCP",
    filename: "~/.codex/config.toml",
    summary:
      "远程是 api.sequel.sh/mcp。不要把 sql_ 密钥写进 http_headers，改 bearer_token_env_var。不要抄 config.yaml，也不要 mcp login。",
    code: `codex mcp add sequel --url https://api.sequel.sh/mcp --bearer-token-env-var SEQUEL_API_KEY

[mcp_servers.sequel]
url = "https://api.sequel.sh/mcp"
bearer_token_env_var = "SEQUEL_API_KEY"

# 可选：sequel login && sequel install codex
# 然后用 codex mcp get sequel 核对，不要留下 config.yaml

# 不要：
# ~/.codex/config.yaml
# type: http
# http_headers = { Authorization = "Bearer sql_…" }
# codex mcp login sequel
# npx -y sequel-mcp
`,
  },
  {
    id: "ug-mcp-add-codex",
    title: "Databricks ug mcp add",
    filename: "terminal",
    summary:
      "官方 Codex 是 ug mcp add --agents codex。不要抄 Cursor 的 mcp-remote，Codex 表是 ug mcp-proxy stdio。启动用 ug codex，不要裸跑。",
    code: `uv tool install git+https://github.com/databricks/unity-gateway
databricks auth login
ug mcp add --agents codex --services CATALOG.SCHEMA.SERVICE
ug codex

# 只加不删。configure mcp 会整表替换：
# ug mcp add --services uc-functions:main.tools
# ug mcp add --services system.ai.slack

# 不要：
# ucode 当已经改名后的唯一命令（它只是别名）
# npx mcp-remote https://WORKSPACE/api/2.0/mcp/functions/...
# codex mcp login
# 把 PAT 写进 http_headers
# ug configure mcp 当「再加一台」
`,
  },
  {
    id: "b2c-dx-mcp-codex-plugin",
    title: "Salesforce B2C marketplace",
    filename: "terminal",
    summary:
      "官方 Codex 是 marketplace add 再 plugin add b2c-dx-mcp。不要把 b2c setup skills --ide codex 当插件安装器。插件 cwd 不是仓库根。",
    code: `codex plugin marketplace add SalesforceCommerceCloud/b2c-developer-tooling
codex plugin add b2c@b2c-developer-tooling
codex plugin add b2c-cli@b2c-developer-tooling
codex plugin add b2c-dx-mcp@b2c-developer-tooling

# IDE 没有 /plugins 才手写：
# codex mcp add b2c-dx-mcp -- npx -y @salesforce/b2c-dx-mcp@latest --allow-non-ga-tools

# 不要：
# claude plugin install b2c-dx-mcp
# npx @salesforce/b2c-cli setup skills --ide codex
# codex mcp login b2c-dx-mcp
# 把 client-secret 写进 config.toml env
`,
  },
  {
    id: "expo-codex-plugin",
    title: "Expo 官方插件",
    filename: "terminal",
    summary:
      "主路径是 plugin add expo@openai-curated，再 mcp login expo。插件会登记 mcp.expo.dev/mcp。不要抄 Claude 的 expo@claude-plugins-official。不要把 npx skills add 当 Codex 安装器。",
    code: `codex plugin add expo@openai-curated
codex mcp login expo

# 只要 MCP、不装插件：
# codex mcp add expo --url https://mcp.expo.dev/mcp
# codex mcp login expo

# [mcp_servers.expo]
# url = "https://mcp.expo.dev/mcp"
# enabled = true

# 不要：
# claude plugin install expo@claude-plugins-official
# npx skills add expo/skills
# codex plugin add expo@expo
# npx mcp-remote https://mcp.expo.dev/mcp
`,
  },
  {
    id: "glean-codex-plugin",
    title: "Glean 官方插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add gleanwork/codex-plugins，再 plugin add glean@glean-codex-plugins。组织远程还要 mcp add glean，再 mcp login glean。不要把 Cursor 的 /add-plugin glean 当 Codex 安装器。",
    code: `codex plugin marketplace add gleanwork/codex-plugins
codex plugin add glean@glean-codex-plugins
codex mcp add glean --url https://acme-be.glean.com/mcp/engineering
codex mcp login glean

# [mcp_servers.glean]
# url = "https://acme-be.glean.com/mcp/engineering"
# enabled = true

# 可选公开文档：
# codex plugin add glean-dev-docs@glean-codex-plugins
# codex mcp add glean-dev-docs --url https://developers.glean.com/mcp

# 不要：
# /plugin marketplace add gleanwork/claude-plugins
# /plugin install glean@glean-plugins
# /add-plugin glean
# /glean_run
# codex plugin add glean@openai-curated
# npx mcp-remote https://acme-be.glean.com/mcp/engineering
`,
  },
  {
    id: "calendarbridge-codex-mcp",
    title: "CalendarBridge 远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add calendarbridge --url https://manageapi.calendarbridge.com/mcp，再 mcp login calendarbridge。不要把邮箱 AI Scheduling Assistant 当 MCP 安装器。",
    code: `codex mcp add calendarbridge --url https://manageapi.calendarbridge.com/mcp
codex mcp login calendarbridge

# [mcp_servers.calendarbridge]
# url = "https://manageapi.calendarbridge.com/mcp"
# enabled = true

# 不要：
# claude mcp add calendarbridge --transport http
# npx mcp-remote https://manageapi.calendarbridge.com/mcp
# codex plugin add calendarbridge@
# https://mcp.cal.com
# bearer_token_env_var
`,
  },
  {
    id: "vpai-codex-plugin",
    title: "Vibe Prospecting 官方插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add explorium-ai/vibeprospecting-plugin，再 plugin add vpai@vibeprospecting。认证走 vpai login，不是 mcp login。不要把 npx skills add 当 Codex 安装器。",
    code: `codex plugin marketplace add explorium-ai/vibeprospecting-plugin
codex plugin add vpai@vibeprospecting
npm install -g @vibeprospecting/vpai@latest
vpai login
vpai login --poll
vpai whoami

# 清单过期：
# codex plugin marketplace upgrade vibeprospecting

# 只要远程 MCP、不装技能：
# codex mcp add vibe-prospecting --url https://vibeprospecting.explorium.ai/mcp
# codex mcp login vibe-prospecting

# [plugins."vpai@vibeprospecting"]
# enabled = true

# [mcp_servers.vibe-prospecting]
# url = "https://vibeprospecting.explorium.ai/mcp"
# enabled = true

# 不要：
# /plugin install vibe-prospecting@claude-plugins-official
# npx skills add explorium-ai/vibeprospecting-plugin
# codex mcp add https://vp-plugin.explorium.ai/mcp
# codex mcp login vpai
# npx mcp-remote https://vibeprospecting.explorium.ai/mcp
`,
  },
  {
    id: "vaadin-codex-plugin",
    title: "Vaadin 官方插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add vaadin/agent-marketplace --ref main，再 plugin add vaadin-skills@vaadin-marketplace。文档 MCP 是 mcp.vaadin.com/docs。不要把 npx skills add 当 Codex 安装器。",
    code: `codex plugin marketplace add vaadin/agent-marketplace --ref main
codex plugin add vaadin-skills@vaadin-marketplace

# 预览：
# codex plugin list --marketplace vaadin-marketplace --available --json

# 只要 MCP、不装技能：
# codex mcp add vaadin --url https://mcp.vaadin.com/docs

# [mcp_servers.vaadin]
# url = "https://mcp.vaadin.com/docs"

# 实验第二插件：
# codex plugin add vaadin-agent-tools@vaadin-marketplace

# 不要：
# /plugin marketplace add vaadin/agent-marketplace
# /plugin install vaadin-skills@vaadin-marketplace
# npx skills add vaadin/agent-skills
# claude mcp add --transport http vaadin https://mcp.vaadin.com/docs
# https://mcp.vaadin.com/mcp
# codex mcp login vaadin
`,
  },
  {
    id: "checkly-codex-mcp",
    title: "Checkly 远程 MCP",
    filename: "terminal",
    summary:
      "主路径是 mcp add checkly --url https://api.checklyhq.com/mcp --bearer-token-env-var CHECKLY_API_KEY。不要 mcp login。不要把 npx plugins add 当 Codex 安装器。",
    code: `export CHECKLY_API_KEY=YOUR_CHECKLY_API_KEY
codex mcp add checkly --url https://api.checklyhq.com/mcp --bearer-token-env-var CHECKLY_API_KEY

# [mcp_servers.checkly]
# url = "https://api.checklyhq.com/mcp"
# bearer_token_env_var = "CHECKLY_API_KEY"
# enabled = true

# 多账号才：
# [mcp_servers.checkly.env_http_headers]
# X-Checkly-Account = "CHECKLY_ACCOUNT_ID"

# 写检查代码才：
# npx checkly skills install --target=codex

# 技能捆（仍要补 bearer，不要发明 plugin add）：
# codex plugin marketplace add checkly/checkly-plugin
# 然后 TUI /plugins

# 不要：
# claude mcp add --transport http checkly https://api.checklyhq.com/mcp
# --header "Authorization: Bearer …"
# codex mcp login checkly
# export CHECKLY_API_KEY=" "
# /plugin install checkly@checkly
# npx plugins add checkly/checkly-plugin
# codex plugin add checkly@checkly
`,
  },
  {
    id: "mem0-codex-plugin",
    title: "Mem0 官方插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add mem0ai/mem0，再 plugin add mem0@mem0-plugins。不要把 Nowledge Mem 的两个 --sparse 抄过来。只要远程 MCP 才 mcp add mem0。",
    code: `export MEM0_API_KEY=YOUR_MEM0_API_KEY
codex plugin marketplace add mem0ai/mem0
codex plugin add mem0@mem0-plugins

# 只要远程 MCP、不要钩子：
# codex mcp add mem0 --url https://mcp.mem0.ai/mcp/ --bearer-token-env-var MEM0_API_KEY

# [mcp_servers.mem0]
# url = "https://mcp.mem0.ai/mcp/"
# bearer_token_env_var = "MEM0_API_KEY"

# 升级 / 卸载：
# codex plugin marketplace upgrade
# codex plugin remove mem0@mem0-plugins

# 不要：
# /plugin install mem0@mem0-plugins
# npx mcp-add --name mem0-mcp
# Authorization: Token …
# git clone mem0ai/mem0 && marketplace add ~/codex-plugins/mem0-source
# 叠 [mcp_servers.mem0] 和插件
# nowledge-mem@nowledge-community
# install_codex_hooks.py
`,
  },
  {
    id: "cockpit-codex-plugin",
    title: "Cockpit 原生插件",
    filename: "terminal",
    summary:
      "Cockpit 终端骨架：先 dart pub global activate cockpit any，再 marketplace add cockpit-dev/cockpit。只要 MCP 才 mcp add cockpit -- cockpit_mcp。",
    code: `dart pub global activate cockpit any
codex plugin marketplace add cockpit-dev/cockpit
codex plugin add cockpit@cockpit

# 已装过：
# codex plugin marketplace upgrade cockpit
# codex plugin add cockpit@cockpit

# 只要 MCP、不装插件：
# codex mcp add cockpit -- cockpit_mcp

# [mcp_servers.cockpit]
# command = "cockpit_mcp"
# args = []
# enabled = true

# 不要：
# flutter pub global activate cockpit
# claude plugin install cockpit@cockpit --scope user
# claude mcp add --transport stdio cockpit -- cockpit_mcp
# cockpit@openai-curated
# 插件 + mcp add 叠两张 cockpit 表
`,
  },
  {
    id: "bitbucket-agentic-codex",
    title: "Bitbucket Agentic Pipelines Codex",
    filename: "bitbucket-pipelines.yml",
    summary:
      "Bitbucket 流水线骨架：provider 必须是 codex 关键字，不要把生成的 config.toml 提交进仓。",
    code: `image: atlassian/default-image:5

definitions:
  agents:
    my-agent:
      prompt: "Explain this repository"
      provider: codex
      permissions:
        on-ask: allow
      config:
        path: .codex/atlassian-mcp.toml
        overrides:
          sandbox_mode: workspace-write
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

# .codex/atlassian-mcp.toml（提交这份，不要提交生成的 .codex/config.toml）
# [mcp_servers.atlassian-mcp]
# url = "https://mcp.atlassian.com/v1/native/mcp"
# [mcp_servers.atlassian-mcp.env_http_headers]
# Authorization = "ATLASSIAN_MCP_AUTH"

# 不要：
# 省略 provider（会默认 Rovo Dev）
# 提交生成的 .codex/config.toml
# mcp login / mcp add Bitbucket Cloud MCP
# https://mcp.atlassian.com/v2/mcp
# .mcp.json
# --yolo
# required = true
`,
  },
  {
    id: "paddle-codex-plugin",
    title: "Paddle 官方插件",
    filename: "terminal",
    summary:
      "Paddle Codex 插件清单名是 paddle-agent-skills。主路径是 marketplace add 后再 plugin add paddle@paddle-agent-skills。",
    code: `codex plugin marketplace add PaddleHQ/paddle-agent-skills
codex plugin add paddle@paddle-agent-skills
export PADDLE_SANDBOX_API_KEY=pdl_sdbx_YOUR_KEY
codex mcp login paddle-live

# 只要 MCP、不装插件：
# codex mcp add paddle-sandbox --url https://sandbox-mcp.paddle.com/mcp --bearer-token-env-var PADDLE_SANDBOX_API_KEY
# codex mcp add paddle-live --url https://mcp.paddle.com/mcp
# codex mcp login paddle-live

# [mcp_servers.paddle-sandbox]
# url = "https://sandbox-mcp.paddle.com/mcp"
# bearer_token_env_var = "PADDLE_SANDBOX_API_KEY"
# enabled = true

# 刷新：
# codex plugin marketplace upgrade paddle-agent-skills

# 不要：
# /plugin install paddle@paddle-agent-skills
# codex mcp add --transport http paddle-live https://mcp.paddle.com/mcp
# npx skills add https://developer.paddle.com/
# npx mcp-remote https://mcp.paddle.com/mcp
# 插件 + mcp add 叠两套
`,
  },
  {
    id: "dodo-payments-codex-plugin",
    title: "Dodo Payments 官方插件",
    filename: "terminal",
    summary:
      "Dodo Codex 插件清单名是 dodopayments。主路径是 marketplace add 再 plugin add。API 再 mcp login。文档 MCP 不要鉴权。不要抄 mcp-remote 或 /sse。",
    code: `codex plugin marketplace add dodopayments/dodo-agent-plugin
codex plugin add dodopayments@dodopayments
codex mcp login dodopayments-api

# 只要 MCP、不装插件：
# codex mcp add dodo-knowledge --url https://knowledge.dodopayments.com/mcp
# codex mcp add dodopayments-api --url https://mcp.dodopayments.com/mcp
# codex mcp login dodopayments-api

# [mcp_servers.dodo-knowledge]
# url = "https://knowledge.dodopayments.com/mcp"
# enabled = true

# 刷新：
# codex plugin marketplace upgrade dodopayments

# 不要：
# claude plugins install dodopayments@dodopayments
# codex plugin install dodopayments@dodopayments
# npx mcp-remote https://mcp.dodopayments.com/sse
# npx mcp-remote https://mcp.dodopayments.com/mcp
# npx skills add
# 插件 + mcp add 叠两套
`,
  },
  {
    id: "weppy-roblox-codex-plugin",
    title: "WEPPY Roblox Codex 插件",
    filename: "terminal",
    summary:
      "清单名是 hope1026-roblox-mcp。插件 id 是 weppy-roblox-ai-toolkit。Studio 里 WEPPY → Connect，端口 3002。",
    code: `codex plugin marketplace add hope1026/weppy-roblox-mcp
codex plugin add weppy-roblox-ai-toolkit@hope1026-roblox-mcp
codex plugin list

# 只要 MCP、不装技能：
# codex mcp add weppy-roblox-mcp -- npx -y @weppy/roblox-mcp@latest

# [mcp_servers.weppy-roblox-mcp]
# command = "npx"
# args = ["-y", "@weppy/roblox-mcp@latest"]

# 刷新目录：
# codex plugin marketplace upgrade hope1026-roblox-mcp

# 不要：
# claude plugin install weppy-roblox-ai-toolkit@hope1026-roblox-mcp --scope user
# codex plugin install
# 插件 MCP 再 mcp add 同一张 weppy-roblox-mcp
`,
  },
  {
    id: "elixir-phoenix-codex-plugin",
    title: "Elixir Phoenix Codex 插件",
    filename: "terminal",
    summary:
      "清单名是 oliver-kriska。插件 id 是 elixir-phoenix。技能要用 $elixir-phoenix:phx-review，不是 /phx:review。",
    code: `codex plugin marketplace add oliver-kriska/claude-elixir-phoenix --ref main
codex plugin add elixir-phoenix@oliver-kriska
codex plugin list

# 可选 Tidewave（插件不会登记）：
# codex mcp add tidewave --url http://localhost:4000/tidewave/mcp

# 刷新：
# codex plugin marketplace upgrade oliver-kriska
# codex plugin add elixir-phoenix@oliver-kriska

# 不要：
# /plugin marketplace add oliver-kriska/claude-elixir-phoenix
# /plugin install elixir-phoenix
# /phx:review
# $phx-investigate
# codex plugin install
`,
  },
  {
    id: "box-codex-plugin",
    title: "Box Codex 插件",
    filename: "terminal",
    summary:
      "主路径是桌面 Plugins 或 /plugins 搜 Box。只要 MCP 才 mcp add box --url https://mcp.box.com，不要加 /mcp。不要发明 plugin add box@。不要抄 box-for-ai 的 auth 表。",
    code: `# 官方主路径：TUI /plugins 或桌面 Plugins 搜 Box
# 管理员先启用 ChatGPT - MCP
# 不要 codex plugin add box@…

codex mcp add box --url https://mcp.box.com
codex mcp login box

# [mcp_servers.box]
# url = "https://mcp.box.com"
# enabled = true

# 不要：
# [mcp_servers.box.auth]
# CLIENT_ID = "YOUR_BOX_CLIENT_ID"
# claude mcp add --transport http
# npx mcp-remote https://mcp.box.com
# npx skills add box/skills
# box login
# https://mcp.box.com/mcp
`,
  },
  {
    id: "miro-codex-plugin",
    title: "Miro Codex 插件",
    filename: "terminal",
    summary:
      "主路径是桌面 Plugins 或 /plugins 搜 Miro。只要 MCP 才 mcp add miro --url https://mcp.miro.com/，带尾斜杠。不要发明 plugin add miro@。不要抄 Claude 的 miro@claude-plugins-official。",
    code: `# 官方主路径：TUI /plugins 或桌面 Plugins 搜 Miro
# 点 Add，再选团队做 OAuth
# 不要 codex plugin add miro@…

codex mcp add miro --url https://mcp.miro.com/
codex mcp login miro

# [mcp_servers.miro]
# url = "https://mcp.miro.com/"
# enabled = true

# 不要：
# claude plugin install miro@claude-plugins-official
# /plugin marketplace add miroapp/miro-ai
# /plugin install miro@miro-ai
# npx skills add miroapp/miro-ai
# npx mcp-remote https://mcp.miro.com/
# 插件已经装上还再 mcp add miro
`,
  },
  {
    id: "smart-vs-mcp-codex-plugin",
    title: "工作区 VS-MCP 包装",
    filename: "terminal",
    summary:
      "工作区 VS-MCP 包装：marketplace add Al3xisDani3l/smart-vs-mcp 后再 plugin add smart-vs-mcp。钉分支用 --ref，不要把 @ 当成 npm 标签。",
    code: `codex plugin marketplace add Al3xisDani3l/smart-vs-mcp
codex plugin add smart-vs-mcp
codex plugin list

# 清单快照没刷新：
# codex plugin marketplace upgrade smart-vs-mcp-dev
# codex plugin add smart-vs-mcp --marketplace smart-vs-mcp-dev

# 钉分支：
# codex plugin marketplace add Al3xisDani3l/smart-vs-mcp --ref smart-vs-mcp-dev
# codex plugin add smart-vs-mcp

# 只要 stdio、不装插件：
# codex mcp add vs-mcp-smart -- npx -y @al3xisdani3l/smart-vs-mcp

# [mcp_servers.vs-mcp-smart]
# command = "npx"
# args = ["-y", "@al3xisdani3l/smart-vs-mcp"]

# 不要：
# codex plugin add smart-vs-mcp@smart-vs-mcp-dev   # 把 @ 当成 npm 标签时
# /plugin marketplace add Al3xisDani3l/smart-vs-mcp
# npx skillfish add Al3xisDani3l/smart-vs-mcp --all
# codex mcp login vs-mcp-smart
# smart-vs-mcp@openai-curated
`,
  },
  {
    id: "compound-engineering-codex-plugin",
    title: "Compound Engineering 官方插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add EveryInc/compound-engineering-plugin，再 plugin add compound-engineering@compound-engineering-plugin。不要把 Cursor 的 /add-plugin compound-engineering 当 Codex 安装器。",
    code: `codex plugin marketplace add EveryInc/compound-engineering-plugin
codex plugin add compound-engineering@compound-engineering-plugin
codex plugin list --json

# 同一 profile：
# CODEX_HOME="$HOME/.codex/profiles/work" codex plugin marketplace add EveryInc/compound-engineering-plugin
# CODEX_HOME="$HOME/.codex/profiles/work" codex plugin add compound-engineering@compound-engineering-plugin

# 升级（没有 plugin update）：
# codex plugin marketplace upgrade compound-engineering-plugin
# codex plugin add compound-engineering@compound-engineering-plugin

# 会话里：$ce-plan  $ce-setup  $lfg
# /goal 是 Codex 内置，不是 CE 技能

# 不要：
# /plugin marketplace add EveryInc/compound-engineering-plugin
# /plugin install compound-engineering
# /add-plugin compound-engineering
# bunx @every-env/compound-plugin install compound-engineering --to codex
# codex plugin add compound-engineering@openai-curated
# npx skills add
`,
  },
  {
    id: "sentry-codex-plugin",
    title: "Sentry 官方插件",
    filename: "terminal",
    summary:
      "主路径是 marketplace add getsentry/plugin-codex，再 plugin add sentry@sentry-plugin-marketplace。不要把 npx @sentry/agent-plugin install 当 Codex 专节安装器。",
    code: `codex plugin marketplace add getsentry/plugin-codex
codex plugin add sentry@sentry-plugin-marketplace
codex plugin list --json

# 升级（没有 plugin update）：
# codex plugin marketplace upgrade sentry-plugin-marketplace
# codex plugin add sentry@sentry-plugin-marketplace

# 只要 MCP、不装插件：
# codex mcp add sentry --url https://mcp.sentry.dev/mcp
# codex mcp login sentry

# 不要：
# claude plugin install sentry@claude-plugins-official
# npx @sentry/ai install
# npx @sentry/agent-plugin install
# grok plugin install getsentry/plugin-grok --trust
# codex plugin add sentry@openai-curated
# npx skills add
`,
  },
  {
    id: "gitguardian-codex-plugin",
    title: "GitGuardian 官方插件",
    filename: "terminal",
    summary:
      "agents.gitguardian.com 一键装机不是 Codex 专用安装器。主路径是 marketplace add GitGuardian/agent-skills，再 /plugins 装 gitguardian。官方没给 plugin add id。",
    code: `codex plugin marketplace add GitGuardian/agent-skills
codex
/plugins

# TUI 选 GitGuardian Agent Skills，打开 gitguardian，Install plugin
# 再：
codex mcp login GitGuardian

# [mcp_servers.GitGuardian]
# url = "https://mcp.gitguardian.com/mcp"
# enabled = true

# 欧盟：
# url = "https://mcp.eu1.gitguardian.com/mcp"

# 本地改技能：
# codex plugin marketplace add file:///path/to/agent-skills

# 可选升级：
# codex plugin marketplace upgrade gitguardian-agent-skills

# 可选实时钩子（不是插件安装器）：
# ggshield auth login
# ggshield machine setup --agent codex --no-git-hooks --no-honeytokens

# 不要：
# /plugin marketplace add GitGuardian/agent-skills
# /plugin install gitguardian
# npx skills add gitguardian/agent-skills
# curl -fsSL agents.gitguardian.com | sh
# codex plugin add gitguardian@gitguardian-agent-skills
# npx mcp-remote https://mcp.gitguardian.com/mcp
`,
  },
  {
    id: "modeltrace-guard-codex-plugin",
    title: "ModelTrace Guard 插件",
    filename: "terminal",
    summary:
      "X 上说的信任所有钩子不是 Codex 安装步骤。主路径是 marketplace add xqy2006/ModelTrace，再 plugin add modeltrace-guard@modeltrace。",
    code: `codex plugin marketplace add xqy2006/ModelTrace
codex plugin add modeltrace-guard@modeltrace

# 新开会话，TUI 敲 /hooks，只审 ModelTrace Guard
# 目标任务里用 $modeltrace-guard 开启监测

# 可选：
# node scripts/guard.mjs doctor --fork true
# node scripts/guard.mjs dashboard
# codex plugin marketplace upgrade modeltrace

# 本地：
# codex plugin marketplace add .
# codex plugin add modeltrace-guard@modeltrace

# 不要：
# python start.py
# http://127.0.0.1:7860/
# /hooks 信任全部钩子
# codex plugin install modeltrace-guard@modeltrace
# --dangerously-bypass-hook-trust
`,
  },
  {
    id: "codeguard-codex-plugin",
    title: "ZIP 解压进 .agents 或 $skill-installer 不是 Codex 插件安装器",
    filename: "terminal",
    summary:
      "ZIP 解压进 .agents 或 $skill-installer 不是 Codex 插件安装器。主路径是 marketplace add cosai-oasis/project-codeguard，再 plugin add codeguard-security@project-codeguard。",
    code: `codex plugin marketplace add cosai-oasis/project-codeguard
codex plugin add codeguard-security@project-codeguard
codex plugin list --marketplace project-codeguard

# 刷新：
# codex plugin marketplace upgrade project-codeguard

# 会话里用 $codeguard
# 要 CLI 0.142.0+（源是仓库根 ./）

# 不要：
# /plugin marketplace add cosai-oasis/project-codeguard
# /plugin install codeguard-security@project-codeguard
# /reload-plugins
# extraKnownMarketplaces
# cp -r .agents/ 当插件安装器
# $skill-installer 当 marketplace
# ~/.codex/skills
# codex mcp add codeguard
# plugin add codeguard-security@openai-curated
`,
  },
  {
    id: "braintrust-trace-codex-plugin",
    title: "TRACE_TO_BRAINTRUST 环境变量不是现行 Codex 安装器",
    filename: "terminal",
    summary:
      "TRACE_TO_BRAINTRUST 环境变量不是现行 Codex 安装器。主路径是 bt trace enable codex --project my-project，插件是 trace-codex@braintrust-codex-plugins。",
    code: `bt trace enable codex --project my-project
codex plugin list --json
bt trace doctor codex

# 只要手装插件、不写追踪文件：
# codex plugin marketplace add braintrustdata/braintrust-codex-plugin
# codex plugin add trace-codex@braintrust-codex-plugins

# MCP 另走：
# codex mcp add braintrust --url https://api.braintrust.dev/mcp
# codex mcp login braintrust

# 不要：
# TRACE_TO_BRAINTRUST=true
# plugin add braintrust@braintrust-codex-plugins
# bt trace run -- --dangerously-bypass-hook-trust
# npx mcp-remote https://api.braintrust.dev/mcp
# wrapOpenAICodexSDK
`,
  },
  {
    id: "context-mode-codex-plugin",
    title: "Claude 的 /plugin install context-mode@context-mode 不是 Codex 安装器",
    filename: "terminal",
    summary:
      "Claude 的 /plugin install context-mode@context-mode 不是 Codex 安装器。主路径是 marketplace add mksglu/context-mode，再 /plugins 或 plugin add context-mode@context-mode。",
    code: `codex plugin marketplace add mksglu/context-mode
codex plugin add context-mode@context-mode

# ~/.codex/config.toml
# [features]
# plugin_hooks = true
# hooks = true

# 可选存储根：
# CONTEXT_MODE_DIR="$HOME/.codex-context-mode" codex

# 不要：
# /plugin marketplace add mksglu/context-mode
# /plugin install context-mode@context-mode
# codex plugin install context-mode/context-mode
# [mcp_servers.context-mode]
# ~/.codex/hooks.json
`,
  },
  {
    id: "1password-codex-plugin",
    title: "Skills Only ZIP 不是这份 Codex 插件的 MCP 安装器",
    filename: "terminal",
    summary:
      "Skills Only ZIP 不是这份 Codex 插件的 MCP 安装器。主路径是 marketplace add 1Password/1password-codex-plugin，再 plugin add 1password@1password-plugins。",
    code: `codex plugin marketplace add 1Password/1password-codex-plugin
codex plugin add 1password@1password-plugins

# 桌面 Labs：Enable local MCP server
# which 1password-mcp

# 不要：
# /plugin marketplace add 1Password/1password-claude-plugin
# /plugin install 1password@1password
# codex mcp add 1password -- 1password-mcp
# op mcp-server environments
# npx -y @takescake/1password-mcp
`,
  },
  {
    id: "doppler-codex-run-mcp",
    title: "Doppler 分支 config 喂给 Codex TUI",
    filename: "config.toml",
    summary:
      "Doppler 分支 config 喂给 Codex TUI。先 configure set token --scope .，再用 doppler run 启动。MCP 表名 doppler，args 带 --read-only，密钥走 env_vars。",
    code: `doppler configs create dev_agent_codex --project my-app
doppler secrets set OPENAI_API_KEY --project my-app --config dev_agent_codex

export DOPPLER_CODEX_TOKEN=$(doppler configs tokens create codex-agent-token \\
  --project my-app \\
  --config dev_agent_codex \\
  --max-age 24h \\
  --plain)

doppler configure set token $DOPPLER_CODEX_TOKEN --scope .
export DOPPLER_TOKEN=$DOPPLER_CODEX_TOKEN
doppler run --config dev_agent_codex -- codex

# 另开终端登记 MCP（或写进 ~/.codex/config.toml）：
# codex mcp add doppler -- npx -y @dopplerhq/mcp-server --read-only
#
# [mcp_servers.doppler]
# command = "npx"
# args = ["-y", "@dopplerhq/mcp-server", "--read-only"]
# env_vars = ["DOPPLER_TOKEN"]
# enabled = true
#
# 不要：
# env = { DOPPLER_TOKEN = "dp.st.…" }
# command = "doppler"
# mcpServers JSON
# plugin add doppler@
# mcp login doppler
`,
  },
  {
    id: "aws-agent-toolkit-codex-plugin",
    title: "AWS aws-core 插件喂给 Codex TUI",
    filename: "terminal",
    summary:
      "AWS aws-core 插件喂给 Codex TUI。主路径是 marketplace add aws/agent-toolkit-for-aws，再 /plugins 装 aws-core。捆绑 MCP 表名 aws-mcp。",
    code: `codex plugin marketplace add aws/agent-toolkit-for-aws
codex
/plugins

# TUI 选 Agent Toolkit for AWS，打开 aws-core，Install plugin
# 仓库大时：
# codex plugin marketplace add aws/agent-toolkit-for-aws --sparse .agents/plugins --sparse plugins/aws-core

# 捆绑 MCP（插件会登记，不要再手写一张）：
# [mcp_servers.aws-mcp]
# command = "uvx"
# args = [
#   "mcp-proxy-for-aws-cli@latest",
#   "https://aws-mcp.us-east-1.api.aws/mcp",
#   "--skip-auth",
#   "--metadata",
#   "INSTALL_SOURCE=agent-toolkit-core",
# ]

# 可选升级：
# codex plugin marketplace upgrade agent-toolkit-for-aws

# 可选 Labs Serverless MCP（不是插件主路径）：
# codex mcp add awslabs-aws-serverless-mcp -- uvx awslabs.aws-serverless-mcp-server@latest

# 不要：
# /plugin install aws-core@claude-plugins-official
# npx skills add aws/agent-toolkit-for-aws
# aws configure agent-toolkit
# plugin add aws-core@agent-toolkit-for-aws
# mcp login aws-mcp
`,
  },
  {
    id: "langfuse-codex-observability-plugin",
    title: "Langfuse Stop 钩子把 Codex 回合喂给云端追踪",
    filename: "terminal",
    summary:
      "Langfuse Stop 钩子把 Codex 回合喂给云端追踪。主路径是 marketplace add langfuse/codex-observability-plugin，再 plugin add tracing@codex-observability-plugin。hooks = true，不要抄 plugin_hooks。",
    code: `codex plugin marketplace add langfuse/codex-observability-plugin
codex plugin add tracing@codex-observability-plugin
codex plugin list

# ~/.codex/config.toml
# [features]
# hooks = true
# [plugins."tracing@codex-observability-plugin"]
# enabled = true

# 启动 Codex 的 shell：
# export TRACE_TO_LANGFUSE="true"
# export LANGFUSE_PUBLIC_KEY="pk-lf-..."
# export LANGFUSE_SECRET_KEY="sk-lf-..."
# export LANGFUSE_BASE_URL="https://cloud.langfuse.com"

# 会话里：/hooks 审过 Stop 钩子再信任

# 升级：
# codex plugin marketplace upgrade codex-observability-plugin

# 不要：
# plugin_hooks = true
# npx skills add langfuse/skills
# tracing@langfuse
# mcp login
# [mcp_servers.langfuse.env] LANGFUSE_SECRET_KEY = "sk-lf-..."
`,
  },
  {
    id: "weave-codex-wandb-plugin",
    title: "Weave Stop 钩子把 Codex 回合喂给 W&B",
    filename: "terminal",
    summary:
      "Weave Stop 钩子把 Codex 回合喂给 W&B。主路径是 npm i -g weave-codex，再 weave-codex install。WEAVE_PROJECT 必填。不要 marketplace add，也不要 mcp login。",
    code: `npm install -g weave-codex
wandb login
export WEAVE_PROJECT="YOUR-TEAM/YOUR-PROJECT"
weave-codex install
weave-codex status

# 会话里：/hooks 审过 weave-codex 再信任

# 无头：
# weave-codex run -- codex exec "fix the failing test"
# weave-codex collect --all

# 只要结构、不要正文：
# export WEAVE_CODEX_CAPTURE_CONTENT=0

# 卸装：
# weave-codex uninstall

# 不要：
# codex plugin marketplace add wandb/weave-codex
# bypass_hook_trust = true
# mcp login
# weave.init()
# --ephemeral
`,
  },
  {
    id: "arize-phoenix-codex-notify",
    title: "Phoenix notify 把 Codex 回合喂给 OpenInference",
    filename: "terminal",
    summary:
      "Phoenix notify 把 Codex 回合喂给 OpenInference。主路径是 clone 后 ./install.sh codex。向导选 Phoenix。不要抄 README 的 /hooks，也不要 marketplace add。",
    code: `git clone https://github.com/Arize-ai/coding-harness-tracing.git
cd coding-harness-tracing
./install.sh codex

# ~/.codex/arize-env.sh
# export PHOENIX_ENDPOINT="http://localhost:6006"
# export PHOENIX_PROJECT="codex"
# export ARIZE_TRACE_ENABLED="true"

# 已有 notify = ["python3", "notify.py"] 时先备份 ~/.codex/config.toml

# 测：
# codex exec "explain what this file does" README.md

# 卸装：
# ./install.sh uninstall codex

# 不要：
# /hooks 审 arize-hook-codex-*
# marketplace add Arize-ai/coding-harness-tracing
# mcp login
`,
  },
  {
    id: "langsmith-codex-tracing-plugin",
    title: "LangSmith UserPromptSubmit 把 Codex 回合喂给云端追踪",
    filename: "terminal",
    summary:
      "LangSmith UserPromptSubmit 把 Codex 回合喂给云端追踪。主路径是 marketplace add langchain-ai/langsmith-codex-plugins，再 plugin add tracing@langsmith-codex-plugins。不要抄 plugin_hooks，也不要 Remote MCP。",
    code: `codex plugin marketplace add langchain-ai/langsmith-codex-plugins
codex plugin add tracing@langsmith-codex-plugins
codex plugin list

# ~/.codex/config.toml
# [features]
# hooks = true
# [plugins."tracing@langsmith-codex-plugins"]
# enabled = true

# export TRACE_TO_LANGSMITH="true"
# export LANGSMITH_CODEX_API_KEY="lsv2_pt_..."
# export LANGSMITH_CODEX_PROJECT="codex"

# 会话里静音（不要加斜杠）：
# langsmith-tracing:mute

# 升级：
# codex plugin marketplace upgrade langsmith-codex-plugins
# codex plugin add tracing@langsmith-codex-plugins

# 不要：
# plugin_hooks = true
# /langsmith-tracing:mute
# marketplace add langchain-ai/langchain-plugins
# mcp login
# tracing@openai-curated
`,
  },
  {
    id: "logfire-exporter-codex-plugin",
    title: "Logfire Stop 钩子把 Codex 回合喂给 OTLP",
    filename: "terminal",
    summary:
      "Logfire Stop 钩子把 Codex 回合喂给 OTLP。主路径是 marketplace add pydantic/skills --ref main，再 plugin add logfire-exporter@pydantic-skills。不要抄 Claude 的 plugin install，也不要对导出器 mcp login。",
    code: `codex plugin marketplace add pydantic/skills --ref main
codex plugin add logfire-exporter@pydantic-skills
codex plugin list

# ~/.config/logfire-exporter/config.env
# LOGFIRE_TOKEN=pylf_...
# LOGFIRE_BASE_URL=https://logfire-us.pydantic.dev
# CODEX_LOGFIRE_CONTENT_CAPTURE_MODE=metadata_only

# ~/.codex/config.toml
# [features]
# hooks = true
# [plugins."logfire-exporter@pydantic-skills"]
# enabled = true

# 查遥测才另装：
# codex plugin add logfire@pydantic-skills

# 欧盟 MCP：
# codex mcp remove logfire
# codex mcp add logfire --url https://logfire-eu.pydantic.dev/mcp
# codex mcp login logfire

# 升级：
# codex plugin marketplace upgrade pydantic-skills
# codex plugin add logfire-exporter@pydantic-skills

# 不要：
# claude plugin install logfire@claude-plugins-official
# npx skills add pydantic/skills
# mcp login   # 对导出器
# logfire-exporter@openai-curated
`,
  },
  {
    id: "laminar-codex-plugin",
    title: "Laminar Stop 钩子把 Codex 回合喂给 /v1/traces",
    filename: "terminal",
    summary:
      "Laminar Stop 钩子把 Codex 回合喂给 /v1/traces。主路径是 marketplace add lmnr-ai/lmnr-codex-plugin，再 plugin add lmnr@lmnr。不要抄 Claude 的 plugin install，也不要对追踪钩子 mcp login。",
    code: `codex plugin marketplace add lmnr-ai/lmnr-codex-plugin
codex plugin add lmnr@lmnr
codex plugin list

# 安装器等价：
# npx lmnr-cli@latest plugin add codex

# ~/.config/lmnr/codex-plugin.json
# { "projectApiKey": "...", "baseUrl": "https://api.lmnr.ai" }
# CODEX_LMNR_MAX_CHARS=20000
# LMNR_PROJECT_API_KEY 覆盖文件

# ~/.codex/config.toml
# [features]
# hooks = true
# [plugins."lmnr@lmnr"]
# enabled = true

# 查轨迹才另配：
# codex mcp add laminar --url https://api.lmnr.ai/v1/mcp --bearer-token-env-var LMNR_PROJECT_API_KEY

# 升级：
# codex plugin marketplace upgrade lmnr
# codex plugin add lmnr@lmnr

# 不要：
# claude plugin install
# claude mcp add --transport http laminar
# npx skills add
# mcp login   # 对追踪钩子
# lmnr@openai-curated
# lmnr-cli setup   # 那是应用 SDK
`,
  },
  {
    id: "portkey-codex-gateway",
    title: "Portkey profile 把 Codex 模型流量喂给 api.portkey.ai/v1",
    filename: "~/.codex/config.toml",
    summary:
      "Portkey profile 把 Codex 模型流量喂给 api.portkey.ai/v1。用户层 [model_providers.portkey]，env_key 读 PORTKEY_API_KEY，wire_api = responses。再用 --profile portkey。不是 MCP。",
    code: `# ~/.codex/config.toml
[model_providers.portkey]
name = "Portkey"
base_url = "https://api.portkey.ai/v1"
env_key = "PORTKEY_API_KEY"
wire_api = "responses"

# ~/.codex/portkey.config.toml
# model_provider = "portkey"
# model = "@openai-prod/gpt-4o"

# export PORTKEY_API_KEY=pk-...
# codex --profile portkey

# 只要网关、不要向导改 MCP / 技能：
# npx portkey setup --yes --portkey-key "$PORTKEY_API_KEY" --skip-mcp --skip-skills --codex-wire-api responses

# 不要：
# [profiles.portkey]
# 项目 .codex/config.toml 里写 model_providers
# ANTHROPIC_BASE_URL
# codex plugin add portkey@
# --oss
`,
  },
  {
    id: "fireworks-fireconnect-codex",
    title: "FireConnect 把 Codex 模型流量喂给 api.fireworks.ai/inference/v1",
    filename: "~/.codex/config.toml",
    summary:
      "FireConnect 把 Codex 模型流量喂给 api.fireworks.ai/inference/v1。用户层 [model_providers.fireworks-ai]，env_key 读 FIREWORKS_API_KEY，wire_api = responses。官方 CLI 是 fireconnect codex on。不是 MCP。",
    code: `# 官方 CLI（会改整机默认）：
# fireconnect login
# fireconnect codex on
# fireconnect codex status
# fireconnect codex off

# ~/.codex/config.toml 手写（推荐 env_key，不要 experimental_bearer_token）
[model_providers.fireworks-ai]
name = "Fireworks"
base_url = "https://api.fireworks.ai/inference/v1"
env_key = "FIREWORKS_API_KEY"
wire_api = "responses"
requires_openai_auth = false

# ~/.codex/fireworks.config.toml
# model_provider = "fireworks-ai"
# model = "kimi-fast-latest"
# export FIREWORKS_API_KEY=fw-...
# codex --profile fireworks

# 续写旧会话：
# codex resume -c model_provider="fireworks-ai"

# 不要：
# [profiles.fireconnect]
# 项目 .codex/config.toml 里写 model_providers
# ANTHROPIC_BASE_URL
# fireconnect claude
# fpk_ Fire Pass
# MiniMax
# codex plugin add fireworks@
# --oss
`,
  },
  {
    id: "litellm-codex-gateway",
    title: "LiteLLM 模型供应商",
    filename: "~/.codex/config.toml",
    summary:
      "LiteLLM profile 把 Codex 模型流量喂给 localhost:4000/v1。用户层 [model_providers.litellm]，env_key = LITELLM_API_KEY，wire_api = responses。先起 proxy，yaml 要 drop_params。",
    code: `[model_providers.litellm]
name = "litellm"
base_url = "http://localhost:4000/v1"
env_key = "LITELLM_API_KEY"
wire_api = "responses"
stream_idle_timeout_ms = 7200000
`,
  },
  {
    id: "openrouter-codex-gateway",
    title: "OpenRouter 模型供应商",
    filename: "~/.codex/config.toml",
    summary:
      "OpenRouter profile 把 Codex 模型流量喂给 openrouter.ai/api/v1。用户层 [model_providers.openrouter]，auth 回显 OPENROUTER_API_KEY。不要叠 env_key。Windows 改 powershell。",
    code: `[model_providers.openrouter]
name = "openrouter"
base_url = "https://openrouter.ai/api/v1"
wire_api = "responses"

[model_providers.openrouter.auth]
command = "sh"
args = ["-c", "echo $OPENROUTER_API_KEY"]
`,
  },
  {
    id: "cloudflare-aig-codex-gateway",
    title: "Cloudflare AI Gateway 模型供应商",
    filename: "~/.codex/cloudflare-aig.config.toml",
    summary:
      "Cloudflare-aig profile 把 Codex 模型流量喂给 gateway.ai.cloudflare.com。env_key = CLOUDFLARE_API_KEY，wire_api = responses。账号 ID 写死，不要在 base_url 里塞环境变量。",
    code: `model_provider = "cloudflare-ai-gateway"
model = "gpt-5.5"
model_reasoning_effort = "medium"

[model_providers.cloudflare-ai-gateway]
name = "Cloudflare AI Gateway"
base_url = "https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/default/openai"
env_key = "CLOUDFLARE_API_KEY"
wire_api = "responses"
`,
  },
  {
    id: "nim-codex-gateway",
    title: "NIM profile 把 Codex 模型流量喂给 localhost:8000/v1",
    filename: "~/.codex/nim.config.toml",
    summary:
      "NIM profile 把 Codex 模型流量喂给 localhost:8000/v1。用户层 [model_providers.nim]，wire_api = responses，env_key = NIM_API_KEY。不是 NVIDIA skills，也不是 --oss。",
    code: `# web_search = "disabled"  # gpt-oss Harmony 才需要；必须写在所有 [section] 之前
model = "nvidia/nemotron-3-super-120b-a12b"
model_provider = "nim"

[model_providers.nim]
name = "NVIDIA NIM"
base_url = "http://localhost:8000/v1"
env_key = "NIM_API_KEY"
wire_api = "responses"
`,
  },
  {
    id: "agentgateway-codex-gateway",
    title: "agentgateway profile 把 Codex 模型流量喂给 localhost:4000/v1",
    filename: "~/.codex/agentgateway.config.toml",
    summary:
      "agentgateway profile 把 Codex 模型流量喂给 localhost:4000/v1。用户层 [model_providers.agentgateway]，wire_api = responses，name 必填。虚拟钥才 env_key = AGENTGATEWAY_API_KEY。不是 agentregistry MCP。",
    code: `model_provider = "agentgateway"

[model_providers.agentgateway]
name = "OpenAI via agentgateway"
base_url = "http://localhost:4000/v1"
wire_api = "responses"
env_key = "AGENTGATEWAY_API_KEY"
`,
  },
  {
    id: "azure-openai-codex-gateway",
    title: "Azure profile 把 Codex 模型流量喂给 openai.azure.com/openai/v1",
    filename: "~/.codex/azure.config.toml",
    summary:
      "Azure profile 把 Codex 模型流量喂给 openai.azure.com/openai/v1。用户层 [model_providers.azure]，wire_api = responses，env_key = AZURE_OPENAI_API_KEY。不要再叠 api-version。不是 Azure Skills。",
    code: `model = "YOUR_DEPLOYMENT_NAME"
model_provider = "azure"
model_reasoning_effort = "medium"

[model_providers.azure]
name = "Azure OpenAI"
base_url = "https://YOUR_RESOURCE_NAME.openai.azure.com/openai/v1"
env_key = "AZURE_OPENAI_API_KEY"
wire_api = "responses"
`,
  },
  {
    id: "openaidr-codex-gateway",
    title: "openaidr profile 把 Codex 模型流量喂给 us.api.openai.com/v1",
    filename: "~/.codex/openaidr.config.toml",
    summary:
      "openaidr profile 把 Codex 模型流量喂给 us.api.openai.com/v1。用户层 [model_providers.openaidr]，wire_api = responses。ChatGPT 工作区驻留不必另开表。不要写 [model_providers.openai]。",
    code: `model_provider = "openaidr"

[model_providers.openaidr]
name = "OpenAI Data Residency"
base_url = "https://us.api.openai.com/v1"
wire_api = "responses"
`,
  },
  {
    id: "sambanova-codex-gateway",
    title: "sambanova profile 把 Codex 模型流量喂给 api.sambanova.ai/v1",
    filename: "~/.codex/sambanova.config.toml",
    summary:
      "sambanova profile 把 Codex 模型流量喂给 api.sambanova.ai/v1。用户层 [model_providers.sambanova]，wire_api = responses，env_key = SAMBANOVA_API_KEY。不要抄 [profiles.execute-sn]。",
    code: `model = "MiniMax-M2.7"
model_provider = "sambanova"
approval_policy = "on-request"
sandbox_mode = "workspace-write"

[model_providers.sambanova]
name = "SambaNova"
base_url = "https://api.sambanova.ai/v1"
env_key = "SAMBANOVA_API_KEY"
wire_api = "responses"
`,
  },
  {
    id: "bifrost-codex-gateway",
    title: "bifrost profile 把 Codex 模型流量喂给 localhost:8080/openai/v1",
    filename: "~/.codex/bifrost.config.toml",
    summary:
      "bifrost profile 把 Codex 模型流量喂给 localhost:8080/openai/v1。用户层 [model_providers.bifrost]，wire_api = responses，env_key = OPENAI_API_KEY。不要写 openai_base_url。",
    code: `model = "openai/gpt-5.4"
model_provider = "bifrost"

[model_providers.bifrost]
name = "Bifrost"
base_url = "http://localhost:8080/openai/v1"
env_key = "OPENAI_API_KEY"
wire_api = "responses"
supports_websockets = false
`,
  },
  {
    id: "coder-ai-gateway",
    title: "ai_gateway profile 把 Codex 模型流量喂给 /api/v2/ai-gateway/openai/v1",
    filename: "~/.codex/ai_gateway.config.toml",
    summary:
      "ai_gateway profile 把 Codex 模型流量喂给 /api/v2/ai-gateway/openai/v1。用户层 [model_providers.ai_gateway]，wire_api = responses，env_key = OPENAI_API_KEY。必须 supports_websockets = false。",
    code: `model_provider = "ai_gateway"

[model_providers.ai_gateway]
name = "AI Gateway"
base_url = "https://YOUR_DEPLOYMENT/api/v2/ai-gateway/openai/v1"
env_key = "OPENAI_API_KEY"
wire_api = "responses"
supports_websockets = false
`,
  },
  {
    id: "databricks-codex-gateway",
    title: "Databricks profile 把 Codex 模型流量喂给 /ai-gateway/codex/v1",
    filename: "~/.codex/databricks.config.toml",
    summary:
      "Databricks profile 把 Codex 模型流量喂给 /ai-gateway/codex/v1。用户层 [model_providers.Databricks]，wire_api = responses，令牌走 [model_providers.Databricks.auth]。不要抄 [profiles.default]。",
    code: `model_provider = "Databricks"

[model_providers.Databricks]
name = "Databricks AI Gateway"
base_url = "https://YOUR_WORKSPACE/ai-gateway/codex/v1"
wire_api = "responses"

[model_providers.Databricks.auth]
command = "sh"
args = ["-c", "databricks auth token --host YOUR_WORKSPACE --output json | jq -r '.access_token'"]
timeout_ms = 5000
refresh_interval_ms = 1800000
`,
  },
  {
    id: "deepseek-codex-gateway",
    title: "deepseek profile 把 Codex 模型流量喂给 api.deepseek.com/",
    filename: "~/.codex/deepseek.config.toml",
    summary:
      "deepseek profile 把 Codex 模型流量喂给 api.deepseek.com/。供应商表用 env_key，模型目录走绝对路径 models.json。不要 experimental_bearer_token。",
    code: `export DEEPSEEK_API_KEY=YOUR_DEEPSEEK_API_KEY

# ~/.codex/config.toml
[model_providers.deepseek]
name = "deepseek"
base_url = "https://api.deepseek.com/"
env_key = "DEEPSEEK_API_KEY"
wire_api = "responses"

# ~/.codex/deepseek.config.toml
model_provider = "deepseek"
model = "deepseek-flash"
preferred_auth_method = "apikey"
forced_login_method = "api"
model_reasoning_effort = "high"
web_search = "disabled"
model_catalog_json = "/home/YOU/.codex/models.json"

# 模型目录 JSON 从官方 Codex 页或一键脚本拿，不要抄人设长文
# bash <(curl -fsSL https://cdn.deepseek.com/api-docs/codex-deepseek-setup-en.sh)

codex --profile deepseek

# 不要：
# experimental_bearer_token = "sk-..."
# [profiles.deepseek]
# openai_base_url = "https://api.deepseek.com/"
# wire_api = "chat"
# plugin add deepseek@
`,
  },
  {
    id: "truefoundry-codex-gateway",
    title: "truefoundry profile 把 Codex 模型流量喂给 gateway.truefoundry.ai",
    filename: "~/.codex/truefoundry.config.toml",
    summary:
      "truefoundry profile 把 Codex 模型流量喂给 gateway.truefoundry.ai。供应商表用 env_key 读 TFY_API_KEY。模型写 Virtual Model slug。不要 http_headers，也不要 wire_api = chat。",
    code: `export TFY_API_KEY=YOUR_TFY_API_KEY

# ~/.codex/config.toml
[model_providers.truefoundry]
name = "TrueFoundry AI Gateway"
base_url = "https://gateway.truefoundry.ai"
env_key = "TFY_API_KEY"
wire_api = "responses"

# ~/.codex/truefoundry.config.toml
model_provider = "truefoundry"
model = "gpt-5.2-codex"

codex --profile truefoundry

# 自建：base_url 写成 Playground 里的字面量，不要在 URL 里写 $GATEWAY_BASE_URL
# ChatGPT 订阅：不要 env_key；requires_openai_auth = true
# env_http_headers = { "x-tfy-api-key" = "TFY_API_KEY" }

# 不要：
# [model_providers.truefoundry.http_headers]
# Authorization = "Bearer YOUR_TFY_API_KEY"
# wire_api = "chat"
# [profiles.truefoundry]
# openai_base_url = "https://gateway.truefoundry.ai"
# model = "openai-main/gpt-5.2-codex"
# plugin add truefoundry@
`,
  },
  {
    id: "helicone-codex-gateway",
    title: "helicone profile 把 Codex 模型流量喂给 ai-gateway.helicone.ai",
    filename: "~/.codex/helicone.config.toml",
    summary:
      "helicone profile 把 Codex 模型流量喂给 ai-gateway.helicone.ai。供应商表用 env_key 读 HELICONE_API_KEY。模型写 gpt-5 这类 Responses 短名。不要 wire_api = chat。",
    code: `export HELICONE_API_KEY=YOUR_HELICONE_API_KEY

# ~/.codex/config.toml
[model_providers.helicone]
name = "Helicone"
base_url = "https://ai-gateway.helicone.ai/v1"
env_key = "HELICONE_API_KEY"
wire_api = "responses"

# ~/.codex/helicone.config.toml
model_provider = "helicone"
model = "gpt-5"

codex --profile helicone

# 不要：
# wire_api = "chat"
# [profiles.helicone]
# openai_base_url = "https://ai-gateway.helicone.ai/v1"
# base_url = "https://gateway.helicone.ai/YOUR_HELICONE_API_KEY/v1/"
# plugin add helicone@
# $CODEX_HOME/.codex/config.toml
`,
  },
  {
    id: "minimax-codex-gateway",
    title: "minimax profile 把 Codex 模型流量喂给 api.minimax.io",
    filename: "~/.codex/minimax.config.toml",
    summary:
      "minimax profile 把 Codex 模型流量喂给 api.minimax.io。供应商表用 env_key 读 MINIMAX_API_KEY。模型写 MiniMax-M3。不要 experimental_bearer_token。",
    code: `export MINIMAX_API_KEY=YOUR_MINIMAX_API_KEY

# ~/.codex/config.toml
[model_providers.minimax]
name = "MiniMax"
base_url = "https://api.minimax.io/v1"
env_key = "MINIMAX_API_KEY"
wire_api = "responses"

# ~/.codex/minimax.config.toml
model_provider = "minimax"
model = "MiniMax-M3"
model_context_window = 1000000

codex --profile minimax

# 大陆站：
# base_url = "https://api.minimaxi.com/v1"

# 可选一键（先看会改哪些文件）：
# npx -y mmx-cli@latest agent setup --agent codex --region global --dry-run

# 不要：
# experimental_bearer_token = "YOUR_MINIMAX_API_KEY"
# [profiles.minimax]
# openai_base_url = "https://api.minimax.io/v1"
# plugin add minimax@
# npx skills add MiniMax-AI/cli
# --all
`,
  },
  {
    id: "zai-codex-gateway",
    title: "zai profile 把 Codex 模型流量喂给 api.z.ai/api/v1",
    filename: "~/.codex/zai.config.toml",
    summary:
      "zai profile 把 Codex 模型流量喂给 api.z.ai/api/v1。供应商表用 env_key 读 ZAI_API_KEY。模型写 glm-5.3。不要 experimental_bearer_token。",
    code: `export ZAI_API_KEY=YOUR_ZAI_API_KEY

# ~/.codex/config.toml
[model_providers.ZAI]
name = "ZAI"
base_url = "https://api.z.ai/api/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"

# ~/.codex/zai.config.toml
model_provider = "ZAI"
model = "glm-5.3"
model_reasoning_effort = "max"
model_context_window = 1048576

codex --profile zai

# 可选一键（只要 Codex，跑完改回 env_key）：
# npx @z_ai/coding-helper

# 不要：
# experimental_bearer_token = "YOUR_ZAI_API_KEY"
# [profiles.zai]
# openai_base_url = "https://api.z.ai/api/v1"
# base_url = "https://api.z.ai/api/coding/paas/v4"
# plugin add zai@
# coding-helper auth reload claude
`,
  },
  {
    id: "modelstudio-codex-gateway",
    title: "modelstudio profile 把 Codex 模型流量喂给 token-plan.ap-southeast-1.maas.aliyuncs.com",
    filename: "~/.codex/modelstudio.config.toml",
    summary:
      "modelstudio profile 把 Codex 模型流量喂给 token-plan.ap-southeast-1.maas.aliyuncs.com。供应商表用 env_key 读 DASHSCOPE_API_KEY。模型写 qwen3.8-max。不要 wire_api = chat。",
    code: `export DASHSCOPE_API_KEY=YOUR_DASHSCOPE_API_KEY

# ~/.codex/config.toml
[model_providers.Model_Studio_Token_Plan]
name = "Model_Studio_Token_Plan"
base_url = "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1"
env_key = "DASHSCOPE_API_KEY"
wire_api = "responses"

# ~/.codex/modelstudio.config.toml
model_provider = "Model_Studio_Token_Plan"
model = "qwen3.8-max"
model_reasoning_effort = "xhigh"
model_context_window = 983616

codex --profile modelstudio

# 中国站 Token Plan：
# base_url = "https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1"

# 按量才把 WorkspaceId 写进主机：
# base_url = "https://YOUR_WORKSPACE_ID.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1"

# 不要：
# wire_api = "chat"
# [profiles.modelstudio]
# openai_base_url = "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1"
# base_url = "https://coding-intl.dashscope.aliyuncs.com/v1"
# plugin add modelstudio@
# npm install -g @openai/codex@0.80.0
`,
  },
  {
    id: "byteplus-codex-gateway",
    title: "byteplus profile 把 Codex 模型流量喂给 ark.ap-southeast.bytepluses.com",
    filename: "~/.codex/byteplus.config.toml",
    summary:
      "byteplus profile 把 Codex 模型流量喂给 ark.ap-southeast.bytepluses.com。供应商表用 env_key 读 ARK_API_KEY。模型写 ark-code-latest。不要打 api/v3。",
    code: `export ARK_API_KEY=YOUR_ARK_API_KEY

# ~/.codex/config.toml
[model_providers.byteplus-coding-plan]
name = "byteplus-coding-plan"
base_url = "https://ark.ap-southeast.bytepluses.com/api/coding/v3"
env_key = "ARK_API_KEY"
wire_api = "responses"

# ~/.codex/byteplus.config.toml
model_provider = "byteplus-coding-plan"
model = "ark-code-latest"
model_supports_reasoning_summaries = true
model_reasoning_effort = "medium"

codex --profile byteplus

# 可选一键（只要 Codex，跑完改回独立 profile）：
# npm install -g @byteplus/ark-cli
# arkcli helper

# 不要：
# base_url = "https://ark.ap-southeast.bytepluses.com/api/v3"
# base_url = "https://ark.ap-southeast.bytepluses.com/api/coding"
# [profiles.byteplus]
# openai_base_url = "https://ark.ap-southeast.bytepluses.com/api/coding/v3"
# plugin add byteplus@
# arkcli +connect
`,
  },
  {
    id: "tokenhub-codex-gateway",
    title: "tokenhub profile 把 Codex 模型流量喂给 tokenhub.tencentmaas.com",
    filename: "~/.codex/tokenhub.config.toml",
    summary:
      "tokenhub profile 把 Codex 模型流量喂给 tokenhub.tencentmaas.com。供应商表用 env_key 读 HY3_API_KEY。模型写 hy3。不要打 plan/v3。",
    code: `[model_providers.hy3-tokenhub]
name = "Hy3 via tokenhub"
base_url = "https://tokenhub.tencentmaas.com/v1"
env_key = "HY3_API_KEY"
wire_api = "responses"

# ~/.codex/tokenhub.config.toml
model_provider = "hy3-tokenhub"
model = "hy3"
disable_response_storage = true

codex --profile tokenhub

# 国际站补 /v1：
# base_url = "https://tokenhub-intl.tencentcloudmaas.com/v1"

# 不要：
# base_url = "https://api.lkeap.cloud.tencent.com/plan/v3"
# base_url = "https://tokenhub.tencentmaas.com/plan/v3"
# wire_api = "chat"
# [profiles.tokenhub]
# openai_base_url = "https://tokenhub.tencentmaas.com/v1"
# plugin add tokenhub@
`,
  },
  {
    id: "knowledge-catalog-codex-plugin",
    title: "dak marketplace 把 Knowledge Catalog 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "dak marketplace 把 Knowledge Catalog 插件喂给 data-agent-kit。先 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add knowledge-catalog@data-agent-kit。不要写成 plugin install dataplex@。",
    code: `codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add knowledge-catalog@data-agent-kit
export DATAPLEX_PROJECT=YOUR_PROJECT_ID
gcloud auth application-default login
codex plugin list
codex mcp list

# 可选升级：
# codex plugin marketplace upgrade data-agent-kit

# 插件登记的 MCP 表名是 dataplex（stdio / npx Toolbox）
# 不要 mcp login
# 不要再 mcp add dataplex

# 不要：
# codex plugin install dataplex@data-agent-kit
# /plugin install knowledge-catalog@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/knowledge-catalog
# npx skills add
# google-cloud-developer@google-plugins
`,
  },
  {
    id: "dak-starter-codex-plugin",
    title: "starter marketplace 把 dak 插件喂给 data-agent-kit-starter-pack",
    filename: "terminal",
    summary:
      "starter marketplace 把 dak 插件喂给 data-agent-kit-starter-pack。先 marketplace add 仓 URL，再 plugin add dak@data-agent-kit-starter-pack-marketplace。不要加成 GoogleCloudPlatform/data-agent-kit。",
    code: `codex plugin marketplace add https://github.com/gemini-cli-extensions/data-agent-kit-starter-pack
codex plugin add dak@data-agent-kit-starter-pack-marketplace
gcloud auth login
gcloud auth application-default login
codex plugin list
codex mcp list

# MCP 改缓存清单后再重启：
# ls ~/.codex/plugins/cache/data-agent-kit-starter-pack-marketplace/dak
# ~/.codex/plugins/cache/data-agent-kit-starter-pack-marketplace/dak/VERSION/.mcp.json

# 可选升级：
# codex plugin marketplace upgrade data-agent-kit-starter-pack-marketplace

# 遥测：
# export DO_NOT_TRACK=1
# /hooks 里审查并信任

# 不要：
# codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
# plugin add dak@data-agent-kit
# /plugin install data-agent-kit-starter-pack@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/data-agent-kit-starter-pack
# npx skills add
# dak@personal
`,
  },
  {
    id: "looker-codex-plugin",
    title: "looker marketplace 把 Looker 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "looker marketplace 把 Looker 插件喂给 data-agent-kit。主路径是 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add looker@data-agent-kit。",
    code: `export LOOKER_BASE_URL=YOUR_LOOKER_BASE_URL
export LOOKER_CLIENT_ID=YOUR_LOOKER_CLIENT_ID
export LOOKER_CLIENT_SECRET=YOUR_LOOKER_CLIENT_SECRET

codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add looker@data-agent-kit
codex mcp list

# 可选：
# export LOOKER_VERIFY_SSL=true
# codex plugin marketplace upgrade data-agent-kit

# 不要：
# /plugin install looker@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/looker
# plugin add looker@claude-plugins-official
# plugin add dak@data-agent-kit-starter-pack-marketplace
# plugin add knowledge-catalog@data-agent-kit
# codex mcp login looker
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "alloydb-codex-plugin",
    title: "alloydb marketplace 把 AlloyDB 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "alloydb marketplace 把 AlloyDB 插件喂给 data-agent-kit。主路径是 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add alloydb@data-agent-kit。",
    code: `gcloud auth application-default login
export ALLOYDB_POSTGRES_PROJECT=YOUR_ALLOYDB_POSTGRES_PROJECT
export ALLOYDB_POSTGRES_REGION=YOUR_ALLOYDB_POSTGRES_REGION
export ALLOYDB_POSTGRES_CLUSTER=YOUR_ALLOYDB_POSTGRES_CLUSTER
export ALLOYDB_POSTGRES_INSTANCE=YOUR_ALLOYDB_POSTGRES_INSTANCE
export ALLOYDB_POSTGRES_DATABASE=YOUR_ALLOYDB_POSTGRES_DATABASE

codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add alloydb@data-agent-kit
codex mcp list

# 可选：
# export ALLOYDB_POSTGRES_IP_TYPE=PRIVATE
# codex plugin marketplace upgrade data-agent-kit

# 不要：
# /plugin install alloydb@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/alloydb
# plugin add alloydb@claude-plugins-official
# plugin add alloydb-omni@data-agent-kit
# plugin add dak@data-agent-kit-starter-pack-marketplace
# plugin add looker@data-agent-kit
# codex mcp login alloydb-postgres
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "spanner-codex-plugin",
    title: "spanner marketplace 把 Spanner 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "spanner marketplace 把 Spanner 插件喂给 data-agent-kit。主路径是 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add spanner@data-agent-kit。",
    code: `gcloud auth application-default login
export SPANNER_PROJECT=YOUR_SPANNER_PROJECT
export SPANNER_INSTANCE=YOUR_SPANNER_INSTANCE
export SPANNER_DATABASE=YOUR_SPANNER_DATABASE

codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add spanner@data-agent-kit
codex mcp list

# 可选：
# export SPANNER_DIALECT=postgresql
# codex plugin marketplace upgrade data-agent-kit

# 不要：
# /plugin install spanner@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/spanner
# plugin add spanner@claude-plugins-official
# plugin add alloydb@data-agent-kit
# plugin add dak@data-agent-kit-starter-pack-marketplace
# plugin add looker@data-agent-kit
# codex mcp login spanner
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "bigquery-codex-plugin",
    title: "bigquery marketplace 把 BigQuery 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "bigquery marketplace 把 BigQuery 插件喂给 data-agent-kit。主路径是 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add bigquery-data-analytics@data-agent-kit。",
    code: `gcloud auth application-default login
export BIGQUERY_PROJECT=YOUR_BIGQUERY_PROJECT
# 可选：export BIGQUERY_LOCATION=YOUR_BIGQUERY_LOCATION

codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add bigquery-data-analytics@data-agent-kit
codex mcp list

# 可选：
# codex plugin marketplace upgrade data-agent-kit

# 不要：
# plugin add bigquery@data-agent-kit
# /plugin install bigquery-data-analytics@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/bigquery-data-analytics
# plugin add dak@data-agent-kit-starter-pack-marketplace
# plugin add looker@data-agent-kit
# plugin add alloydb@data-agent-kit
# plugin add knowledge-catalog@data-agent-kit
# codex mcp login bigquery
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "cloudsql-postgres-codex-plugin",
    title: "cloudsql marketplace 把 Cloud SQL PostgreSQL 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "cloudsql marketplace 把 Cloud SQL PostgreSQL 插件喂给 data-agent-kit。主路径是 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add cloud-sql-postgresql@data-agent-kit。",
    code: `gcloud auth application-default login
export CLOUD_SQL_POSTGRES_PROJECT=YOUR_CLOUD_SQL_POSTGRES_PROJECT
export CLOUD_SQL_POSTGRES_REGION=YOUR_CLOUD_SQL_POSTGRES_REGION
export CLOUD_SQL_POSTGRES_INSTANCE=YOUR_CLOUD_SQL_POSTGRES_INSTANCE
export CLOUD_SQL_POSTGRES_DATABASE=YOUR_CLOUD_SQL_POSTGRES_DATABASE

codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add cloud-sql-postgresql@data-agent-kit
codex mcp list

# 可选：
# export CLOUD_SQL_POSTGRES_IP_TYPE=PRIVATE
# codex plugin marketplace upgrade data-agent-kit

# 不要：
# plugin install cloud-sql-postgresql@data-agent-kit
# /plugin install cloud-sql-postgresql@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/cloud-sql-postgresql
# plugin add cloud-sql-mysql@data-agent-kit
# plugin add alloydb@data-agent-kit
# plugin add dak@data-agent-kit-starter-pack-marketplace
# plugin add bigquery-data-analytics@data-agent-kit
# codex mcp login cloud-sql-postgres
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "cloudsql-mysql-codex-plugin",
    title: "cloudsql marketplace 把 Cloud SQL MySQL 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "cloudsql marketplace 把 Cloud SQL MySQL 插件喂给 data-agent-kit。主路径是 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add cloud-sql-mysql@data-agent-kit。",
    code: `gcloud auth application-default login
export CLOUD_SQL_MYSQL_PROJECT=YOUR_CLOUD_SQL_MYSQL_PROJECT
export CLOUD_SQL_MYSQL_REGION=YOUR_CLOUD_SQL_MYSQL_REGION
export CLOUD_SQL_MYSQL_INSTANCE=YOUR_CLOUD_SQL_MYSQL_INSTANCE
export CLOUD_SQL_MYSQL_DATABASE=YOUR_CLOUD_SQL_MYSQL_DATABASE

codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add cloud-sql-mysql@data-agent-kit
codex mcp list

# 可选：
# export CLOUD_SQL_MYSQL_IP_TYPE=PRIVATE
# codex plugin marketplace upgrade data-agent-kit

# 不要：
# plugin install cloud-sql-mysql@data-agent-kit
# /plugin install cloud-sql-mysql@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/cloud-sql-mysql
# plugin add cloud-sql-postgresql@data-agent-kit
# plugin add alloydb@data-agent-kit
# plugin add dak@data-agent-kit-starter-pack-marketplace
# plugin add bigquery-data-analytics@data-agent-kit
# codex mcp login cloud-sql-mysql
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "cloudsql-sqlserver-codex-plugin",
    title: "cloudsql marketplace 把 Cloud SQL SQL Server 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "cloudsql marketplace 把 Cloud SQL SQL Server 插件喂给 data-agent-kit。主路径是 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add cloud-sql-sqlserver@data-agent-kit。",
    code: `gcloud auth application-default login
export CLOUD_SQL_MSSQL_PROJECT=YOUR_CLOUD_SQL_MSSQL_PROJECT
export CLOUD_SQL_MSSQL_REGION=YOUR_CLOUD_SQL_MSSQL_REGION
export CLOUD_SQL_MSSQL_INSTANCE=YOUR_CLOUD_SQL_MSSQL_INSTANCE
export CLOUD_SQL_MSSQL_DATABASE=YOUR_CLOUD_SQL_MSSQL_DATABASE
export CLOUD_SQL_MSSQL_USER=YOUR_CLOUD_SQL_MSSQL_USER
export CLOUD_SQL_MSSQL_PASSWORD=YOUR_CLOUD_SQL_MSSQL_PASSWORD

codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add cloud-sql-sqlserver@data-agent-kit
codex mcp list

# 可选：
# export CLOUD_SQL_MSSQL_IP_TYPE=PRIVATE
# codex plugin marketplace upgrade data-agent-kit

# 不要：
# plugin install cloud-sql-sqlserver@data-agent-kit
# /plugin install cloud-sql-sqlserver@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/cloud-sql-sqlserver
# plugin add cloud-sql-postgresql@data-agent-kit
# plugin add cloud-sql-mysql@data-agent-kit
# plugin add alloydb@data-agent-kit
# export CLOUD_SQL_SQLSERVER_PROJECT
# export CLOUD_SQL_MSSQL_IP_ADDRESS
# codex mcp login cloud-sql-mssql
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "firestore-native-codex-plugin",
    title: "dak marketplace 把 Firestore Native 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "dak marketplace 把 Firestore Native 插件喂给 data-agent-kit。主路径是 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add firestore-native@data-agent-kit。",
    code: `gcloud auth application-default login
export FIRESTORE_PROJECT=YOUR_FIRESTORE_PROJECT

codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add firestore-native@data-agent-kit
codex mcp list

# 可选：
# export FIRESTORE_DATABASE='(default)'
# codex plugin marketplace upgrade data-agent-kit

# 不要：
# plugin install firestore-native@data-agent-kit
# plugin add firestore@data-agent-kit
# /plugin install firestore-native@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/firestore-native
# plugin add dak@data-agent-kit-starter-pack-marketplace
# plugin add cloud-sql-mysql@data-agent-kit
# export FIRESTORE_PROJECT_ID
# codex mcp login firestore
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "alloydb-omni-codex-plugin",
    title: "dak marketplace 把 AlloyDB Omni 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "dak marketplace 把 AlloyDB Omni 插件喂给 data-agent-kit。主路径是 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add alloydb-omni@data-agent-kit。",
    code: `export ALLOYDB_OMNI_DATABASE=YOUR_ALLOYDB_OMNI_DATABASE
export ALLOYDB_OMNI_USER=YOUR_ALLOYDB_OMNI_USER
export ALLOYDB_OMNI_PASSWORD=YOUR_ALLOYDB_OMNI_PASSWORD

codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add alloydb-omni@data-agent-kit
codex mcp list

# 可选：
# export ALLOYDB_OMNI_HOST=127.0.0.1
# export ALLOYDB_OMNI_PORT=5432
# codex plugin marketplace upgrade data-agent-kit

# 不要：
# plugin install alloydb-omni@data-agent-kit
# plugin add alloydb@data-agent-kit
# /plugin install alloydb-omni@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/postgres
# export ALLOYDB_OMNI_PROJECT
# export POSTGRES_HOST
# export ALLOYDB_POSTGRES_PROJECT
# --prebuilt postgres
# mcpServers.alloydbomni
# codex mcp login alloydb-omni
# command = "PATH_TO_TOOLBOX"
`,
  },
  {
    id: "dataproc-codex-plugin",
    title: "dak marketplace 把 Dataproc 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "dak marketplace 把 Dataproc 插件喂给 data-agent-kit。主路径是 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add dataproc@data-agent-kit。",
    code: `gcloud auth application-default login
export DATAPROC_PROJECT=YOUR_DATAPROC_PROJECT
export DATAPROC_REGION=YOUR_DATAPROC_REGION

codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add dataproc@data-agent-kit
codex mcp list

# 可选：
# codex plugin marketplace upgrade data-agent-kit

# 不要：
# plugin install dataproc@data-agent-kit
# /plugin install dataproc@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/dataproc
# plugin add dak@data-agent-kit-starter-pack-marketplace
# plugin add firestore-native@data-agent-kit
# export DATAPROC_PROJECT_ID
# codex mcp login dataproc
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "oracledb-codex-plugin",
    title: "dak marketplace 把 Oracle Database 插件喂给 data-agent-kit",
    filename: "terminal",
    summary:
      "dak marketplace 把 Oracle Database 插件喂给 data-agent-kit。主路径是 marketplace add GoogleCloudPlatform/data-agent-kit，再 plugin add oracledb@data-agent-kit。",
    code: `export ORACLE_CONNECTION_STRING=YOUR_ORACLE_CONNECTION_STRING
export ORACLE_USERNAME=YOUR_ORACLE_USERNAME
export ORACLE_PASSWORD=YOUR_ORACLE_PASSWORD

codex plugin marketplace add GoogleCloudPlatform/data-agent-kit
codex plugin add oracledb@data-agent-kit
codex mcp list

# 可选：
# export ORACLE_WALLET=YOUR_ORACLE_WALLET
# export ORACLE_USE_OCI=true
# codex plugin marketplace upgrade data-agent-kit

# 不要：
# plugin install oracledb@data-agent-kit
# /plugin install oracledb@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/oracledb
# plugin add alloydb@data-agent-kit
# export ORACLE_DSN
# codex mcp add sqlcl -- /opt/oracle/sqlcl/bin/sql -mcp
# codex mcp login oracledb
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "gcs-codex-plugin",
    title: "gcs marketplace 把 Cloud Storage 插件喂给 google-cloud-storage",
    filename: "terminal",
    summary:
      "gcs marketplace 把 Cloud Storage 插件喂给 google-cloud-storage。主路径是 marketplace add gemini-cli-extensions/google-cloud-storage，再 plugin add google-cloud-storage@google-cloud-storage。",
    code: `gcloud auth application-default login
export CLOUD_STORAGE_PROJECT=YOUR_CLOUD_STORAGE_PROJECT

codex plugin marketplace add gemini-cli-extensions/google-cloud-storage
codex plugin add google-cloud-storage@google-cloud-storage
codex mcp list

# 可选：
# gcloud auth login
# codex plugin marketplace upgrade google-cloud-storage

# 不要：
# plugin install google-cloud-storage@google-cloud-storage
# plugin add google-cloud-storage@data-agent-kit
# /plugin install google-cloud-storage@claude-plugins-official
# gemini extensions install https://github.com/gemini-cli-extensions/google-cloud-storage
# npx skills add gemini-cli-extensions/google-cloud-storage
# plugin add dak@data-agent-kit-starter-pack-marketplace
# export CLOUD_STORAGE_PROJECT_ID
# codex mcp login cloud-storage
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "postgres-codex-plugin",
    title: "postgres marketplace 把通用 PostgreSQL 插件喂给 postgres",
    filename: "terminal",
    summary:
      "postgres marketplace 把通用 PostgreSQL 插件喂给 postgres。主路径是 marketplace add gemini-cli-extensions/postgres，再 plugin add postgres@postgres。",
    code: `export POSTGRES_DATABASE=YOUR_POSTGRES_DATABASE
export POSTGRES_USER=YOUR_POSTGRES_USER
export POSTGRES_PASSWORD=YOUR_POSTGRES_PASSWORD

codex plugin marketplace add gemini-cli-extensions/postgres
codex plugin add postgres@postgres
codex mcp list

# 可选：
# export POSTGRES_HOST=YOUR_POSTGRES_HOST
# export POSTGRES_PORT=YOUR_POSTGRES_PORT
# export POSTGRES_QUERY_PARAMS=YOUR_POSTGRES_QUERY_PARAMS
# codex plugin marketplace upgrade postgres

# 不要：
# plugin install postgres@postgres
# plugin add postgres@data-agent-kit
# /plugin install postgres@postgres
# gemini extensions install https://github.com/gemini-cli-extensions/postgres
# plugin add cloud-sql-postgresql@data-agent-kit
# plugin add alloydb@data-agent-kit
# export POSTGRES_PROJECT
# export CLOUD_SQL_POSTGRES_PROJECT
# codex mcp login postgresql
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "mysql-codex-plugin",
    title: "mysql marketplace 把通用 MySQL 插件喂给 mysql",
    filename: "terminal",
    summary:
      "mysql marketplace 把通用 MySQL 插件喂给 mysql。主路径是 marketplace add gemini-cli-extensions/mysql，再 plugin add mysql@mysql。",
    code: `export MYSQL_DATABASE=YOUR_MYSQL_DATABASE
export MYSQL_USER=YOUR_MYSQL_USER
export MYSQL_PASSWORD=YOUR_MYSQL_PASSWORD

codex plugin marketplace add gemini-cli-extensions/mysql
codex plugin add mysql@mysql
codex mcp list

# 可选：
# export MYSQL_HOST=YOUR_MYSQL_HOST
# export MYSQL_PORT=YOUR_MYSQL_PORT
# codex plugin marketplace upgrade mysql

# 不要：
# plugin install mysql@mysql
# plugin add mysql@data-agent-kit
# /plugin install mysql@mysql
# gemini extensions install https://github.com/gemini-cli-extensions/mysql
# plugin add cloud-sql-mysql@data-agent-kit
# export MYSQL_PROJECT
# export CLOUD_SQL_MYSQL_PROJECT
# codex mcp login mysql
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "sqlserver-codex-plugin",
    title: "sql-server marketplace 把通用 SQL Server 插件喂给 sql-server",
    filename: "terminal",
    summary:
      "sql-server marketplace 把通用 SQL Server 插件喂给 sql-server。主路径是 marketplace add gemini-cli-extensions/sql-server，再 plugin add sql-server@sql-server。",
    code: `export MSSQL_DATABASE=YOUR_MSSQL_DATABASE
export MSSQL_USER=YOUR_MSSQL_USER
export MSSQL_PASSWORD=YOUR_MSSQL_PASSWORD

codex plugin marketplace add gemini-cli-extensions/sql-server
codex plugin add sql-server@sql-server
codex mcp list

# 可选：
# export MSSQL_HOST=YOUR_MSSQL_HOST
# export MSSQL_PORT=YOUR_MSSQL_PORT
# codex plugin marketplace upgrade sql-server

# 不要：
# plugin install sql-server@sql-server
# plugin add sql-server@data-agent-kit
# /plugin install sql-server@sql-server
# gemini extensions install https://github.com/gemini-cli-extensions/sql-server
# plugin add cloud-sql-sqlserver@data-agent-kit
# export MSSQL_PROJECT
# export CLOUD_SQL_MSSQL_PROJECT
# codex mcp login sql_server
# command = "./PATH/TO/toolbox"
`,
  },
  {
    id: "looker-ca-codex-plugin",
    title: "looker-conversational-analytics marketplace 把对话分析插件喂给 looker",
    filename: "terminal",
    summary:
      "looker-conversational-analytics marketplace 把对话分析插件喂给 looker。主路径是 marketplace add gemini-cli-extensions/looker-conversational-analytics，再 plugin add looker-conversational-analytics@looker-conversational-analytics。",
    code: `gcloud auth application-default login
export LOOKER_BASE_URL=YOUR_LOOKER_BASE_URL
export LOOKER_CLIENT_ID=YOUR_LOOKER_CLIENT_ID
export LOOKER_CLIENT_SECRET=YOUR_LOOKER_CLIENT_SECRET
export LOOKER_PROJECT=YOUR_LOOKER_PROJECT
export LOOKER_LOCATION=YOUR_LOOKER_LOCATION

codex plugin marketplace add gemini-cli-extensions/looker-conversational-analytics
codex plugin add looker-conversational-analytics@looker-conversational-analytics
codex mcp list

# 可选：
# export LOOKER_VERIFY_SSL=true
# codex plugin marketplace upgrade looker-conversational-analytics

# 不要：
# plugin install looker-conversational-analytics@looker-conversational-analytics
# plugin add looker@data-agent-kit
# /plugin install looker-conversational-analytics@looker-conversational-analytics
# gemini extensions install https://github.com/gemini-cli-extensions/looker-conversational-analytics
# export LOOKER_PROJECT_ID
# codex mcp login looker
# command = "./PATH/TO/toolbox"
`,
  }
];
