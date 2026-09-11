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
    summary: "无端口 127.0.0.1 才会插入监听端口。localhost 或已带端口的 URL 不会替换。",
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
];
