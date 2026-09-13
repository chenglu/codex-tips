import type { Tip } from "../types";

export const opsTips: Tip[] = [
  {
    id: "codex-exec-basics",
    no: 66,
    title: "无人值守用 codex exec",
    summary: "进度在 stderr，最终答案在 stdout。别名 codex e。脚本、CI、管道都靠它。",
    body: `\`\`\`bash
codex exec "找出为什么 typecheck 失败，只修类型，不要重构。"
codex exec - < prompt.md
git log --oneline -20 | codex exec "把这些提交写成面向用户的更新说明"
\`\`\`

常用旗标：

- \`--json\`：JSONL 事件流
- \`-o result.md\`：保存最后一条助手消息
- \`--output-schema schema.json\`：强制最终输出符合 JSON Schema
- \`--ephemeral\`：不把会话 rollout 写盘
- \`--ignore-user-config\`：跳过用户 config
- \`--ignore-rules\`：跳过用户和项目 execpolicy \`.rules\`
- \`--skip-git-repo-check\`：允许在非 git 目录跑
- \`--thread-source NAME\`：新建或 fork 时标注来源；resume 不改已保存来源

\`--full-auto\` 已在 v0.147 删除。改用明确的 sandbox + approval，或一个 profile。`,
    category: "automation",
    level: "intermediate",
    surfaces: ["cli", "ci"],
    tags: ["exec", "CI", "JSONL"],
    featured: true,
    related: ["ignore-rules-vs-config", "exec-mcp-optional-grace", "skip-git-repo-check", "exec-thread-source"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "exec-schema",
    no: 67,
    title: "用 --output-schema 拿到机器可读结果",
    summary: "CI 不要去解析散文。给 JSON Schema，让最终消息按合同输出。",
    body: `\`\`\`bash
codex exec --json --output-schema ./ci-schema.json \\
  -o /tmp/codex-out.json \\
  "总结失败的测试和最可能的修复。只输出 schema 里的字段。"
\`\`\`

把这条和 \`resume --last\` 串起来：第一轮诊断，第二轮按同一 schema 执行。

\`codex exec resume --output-schema\` 在后续轮次也支持。结构化输出是 agent 进入管道的方式，不是事后用正则抠。`,
    category: "automation",
    level: "advanced",
    surfaces: ["ci"],
    tags: ["schema", "JSON", "管道"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "ephemeral-ci",
    no: 68,
    title: "CI 里用 --ephemeral 和临时 CODEX_HOME",
    summary: "会话记录可能含密钥。临时家目录 + 不落盘，避免 runner 之间残留凭据。",
    body: `\`\`\`bash
export CODEX_HOME="$RUNNER_TEMP/codex-home"
codex exec --ephemeral --sandbox workspace-write \\
  --ask-for-approval never \\
  "只跑失败的测试并总结。"
\`\`\`

再叠加：

- 不要把 \`CODEX_API_KEY\` 设成整个 job 的 env（见安全章）
- 用官方 \`openai/codex-action\` 隔离凭据
- 需要审计再关 ephemeral，并把日志当机密处理`,
    category: "automation",
    level: "advanced",
    surfaces: ["ci"],
    tags: ["ephemeral", "CI", "密钥"],
    sources: [
      {
        label: "Codex Knowledge Base · Environment variables",
        url: "https://codex.danielvaughan.com/2026/06/03/codex-cli-environment-variables-runtime-configuration-headless-ci-container-deployment/",
      },
    ],
    related: ["github-action-no-job-key", "cli-auth-credentials-store", "oss-provider"],
  },
  {
    id: "pipe-logs-into-exec",
    no: 69,
    title: "把 CI 日志管道进 exec",
    summary: "不要把 4000 行日志粘进聊天。管道进去，让它总结失败和可疑修复。",
    body: `\`\`\`bash
gh run view --log-failed | codex exec "按包分组失败原因，给出最小修复建议。"
\`\`\`

本地：

\`\`\`bash
pnpm test | codex exec "只关注第一次失败。指出文件、假设、该跑的最小复现。"
\`\`\`

提示里写清：不要开始一次漫无目的的重写；先诊断。需要它动手时，再开第二轮 exec 或交互会话。`,
    category: "automation",
    level: "starter",
    surfaces: ["cli", "ci"],
    tags: ["日志", "管道", "CI"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "worktree-not-subagent",
    no: 70,
    title: "文件会冲突时用 worktree，不要用子代理",
    summary: "子代理共享工作区和沙箱。独立提交历史、可丢弃实验、长任务不挡主工作区，用 git worktree。",
    body: `\`\`\`bash
git worktree add ../repo-auth feature/auth
codex --cd ../repo-auth
\`\`\`

桌面 App 原生支持 worktree：侧栏里能看见，线程建在各自树里。CLI 0.154 起也可以用实验性 \`--worktree\` / \`/worktree\`，见托管 worktree 那条。

注意：

- 每个 worktree 复制 \`node_modules\` / 构建缓存，磁盘会涨
- 合完就删：\`git worktree remove ../repo-auth\`
- 不要让两个会话在同一 checkout 上改同一批文件

决策：要 git 隔离 → worktree。只读并行探索 → 子代理。几分钟的跑题 → \`/side\`。`,
    category: "cloud",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["worktree", "并行", "隔离"],
    featured: true,
    sources: [
      {
        label: "Codex Knowledge Base · Session patterns",
        url: "https://codex.danielvaughan.com/2026/05/22/codex-cli-session-patterns-threads-worktrees-side-goals-subagents-decision-framework/",
      },
    ],
    related: ["subagents-when-asked", "session-hygiene", "cli-managed-worktree", "worktreeinclude-ignored-files"],
  },
  {
    id: "cloud-exec",
    no: 71,
    title: "长任务丢给 Cloud，用 apply 回收 diff",
    summary: "codex cloud exec 在隔离环境跑。--attempts 做 Best-of-N。满意了再 codex apply。",
    body: `\`\`\`bash
codex cloud
codex cloud exec --env ENV_ID "把 flaky 的结算测试修到稳定"
codex cloud exec --env ENV_ID --attempts 3 "提出两种缓存方案并实现更好的那个"
codex cloud list --env ENV_ID --limit 20 --json
codex apply <TASK_ID>
\`\`\`

Cloud 适合：你想保持主工作区干净、任务要跑很久、或想比较多种实现。

Best-of-N 会烧配额。先把提示和验收写清楚再开 \`--attempts\`。`,
    category: "cloud",
    level: "intermediate",
    surfaces: ["cloud", "cli"],
    tags: ["cloud", "apply", "best-of-n"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "scheduled-tasks",
    no: 72,
    title: "稳定流程再做成定时任务",
    summary: "Skill 定义方法，定时任务定义节奏。还要大量方向盘的流程，先不要调度。",
    body: `在桌面 App 或网页的 Scheduled 页创建。CLI 和 IDE 扩展没有这套管理界面，只能帮你起草提示、技能或脚本。

桌面任务可选项目、周期、独立 worktree 还是本地目录。电脑要醒着、应用要开着。提示里用 \`$skill-name\` 显式调用技能。网页任务用不了本机文件夹。

好候选：总结近期提交、扫自己引入的 bug、起草 release notes、看 CI 失败、写站会摘要、复盘会话摩擦并改进 \`AGENTS.md\`。

事件触发（Gmail / Slack / GitHub）只在网页和手机。一条任务可以挂多个事件，但不能再叠时间表。Slack 要把 \`@ChatGPT\` 拉进被监视的频道。

先手动跑到可预期再调度。\`gpt-5.4\` / \`gpt-5.4-mini\` 定时任务要在 2026-08-31 前改成 \`gpt-5.6-terra\` / \`gpt-5.6-luna\`。`,
    category: "cloud",
    level: "intermediate",
    surfaces: ["app", "cloud"],
    tags: ["定时任务", "skills", "维护"],
    sources: [
      {
        label: "OpenAI · Scheduled tasks",
        url: "https://learn.chatgpt.com/docs/automations",
      },
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["repeat-becomes-skill", "worktree-not-subagent", "prevent-idle-sleep"],
  },
  {
    id: "remote-tui",
    no: 73,
    title: "远程 TUI 必须带鉴权",
    summary: "codex app-server 加上 --remote。不要在共享网络上暴露未鉴权的 WebSocket。",
    body: `\`\`\`bash
codex app-server --listen ws://127.0.0.1:4500
codex --remote ws://127.0.0.1:4500
\`\`\`

非本机：

- SSH 端口转发，或
- TLS + \`--ws-auth capability-token --ws-token-file /abs/token\`
- 客户端 \`--remote-auth-token-env CODEX_REMOTE_AUTH_TOKEN\`

这能把强力 TUI 接到远程 GPU 盒或开发容器，同时不把控制面暴露给局域网。`,
    category: "cloud",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["remote", "app-server", "安全"],
    related: ["remote-control-pair", "app-server-generate-schema"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "auth-json-is-a-password",
    no: 74,
    title: "把 auth.json 当密码",
    summary: "~/.codex/auth.json 是文件凭据缓存。备份、同步盘、dotfiles 仓库都不要带上它。",
    body: `同类敏感物：

- \`CODEX_API_KEY\` / \`OPENAI_API_KEY\`
- \`CODEX_ACCESS_TOKEN\`
- MCP OAuth 令牌
- 会话记录（可能含密钥）

实践：

- \`cli_auth_credentials_store = "keyring"\`（支持的平台）
- 不要在 shell profile 里全局 export API key
- 定期轮换 access token
- 卸载 CLI **不会** 删除 \`~/.codex/\`。真要干净卸载，得自己删——那也会丢掉配置和历史`,
    category: "security",
    level: "starter",
    surfaces: ["cli"],
    tags: ["auth.json", "密钥", "dotfiles"],
    featured: true,
    related: ["cli-auth-credentials-store", "login-device-auth", "api-key-inline-env"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "github-action-no-job-key",
    no: 75,
    title: "不要把 API Key 交给会跑仓库代码的 job",
    summary: "恶意 AGENTS.md 或钩子可以外带密钥。GitHub Actions 用官方 openai/codex-action，不要裸 CODEX_API_KEY。",
    body: `2026 年 5 月的供应链案例（\`codexui-android\`）展示了这条路径：通过伪装端点偷 \`auth.json\` 刷新令牌。

规则：

1. 不要在会 checkout 或执行仓库控制代码的 job 级 env 里放 \`CODEX_API_KEY\`
2. 用官方 action 隔离凭据
3. 不要在 shell profile 全局 export key，命令级或密钥管理器按次注入
4. CI 里 \`CODEX_HOME\` 指向临时盘
5. \`--ephemeral\` 避免会话落盘

仓库里的 agent 指令与你的云凭据之间，默认视为敌对边界。`,
    category: "security",
    level: "advanced",
    surfaces: ["ci"],
    tags: ["GitHub Actions", "供应链", "密钥"],
    related: ["api-key-inline-env", "ephemeral-ci", "github-action-prompt-file"],
    sources: [
      {
        label: "Codex Knowledge Base · Environment variables",
        url: "https://codex.danielvaughan.com/2026/06/03/codex-cli-environment-variables-runtime-configuration-headless-ci-container-deployment/",
      },
      {
        label: "OpenAI · Codex GitHub Action",
        url: "https://learn.chatgpt.com/docs/github-action",
      },
    ],
  },
  {
    id: "agents-supply-chain",
    no: 76,
    title: "把陌生仓库的 AGENTS.md 当代码审查",
    summary: "指令链能引导代理跑命令、读文件、走网络。信任目录前先读完。",
    body: `Checklist：

- 有没有让它 curl 到未知主机
- 有没有禁用沙箱或要求 yolo
- hooks 是否可执行任意脚本
- MCP 服务器是否指向非官方包

不信任项目会跳过项目级 \`AGENTS.md\`（v0.150+）。保持这样，直到你完成审查。

\`codex doctor\` 能标出环境异常；它替代不了读这些文件。`,
    category: "security",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["供应链", "AGENTS.md", "信任"],
    sources: [
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
    related: ["untrusted-skips-project-agents", "untrusted-git-config"],
  },
  {
    id: "shell-environment-policy",
    no: 77,
    title: "用 shell_environment_policy 收窄子进程环境",
    summary: "默认环境可能含有你不想让 agent 命令看见的密钥。显式控制传入子进程的变量。",
    body: `在用户 config 里配置 \`[shell_environment_policy]\`。官方默认 \`ignore_default_excludes = true\`，会跳过对名字含 \`KEY\` / \`SECRET\` / \`TOKEN\` 的自动过滤。要启用那层过滤，必须显式关掉：

\`\`\`toml
[shell_environment_policy]
ignore_default_excludes = false

[shell_environment_policy.filters]
"PATH" = "include"
"HOME" = "include"
\`\`\`

新配置用 \`filters\`。同一层不要再写旧的 \`exclude\` / \`include_only\`，官方参考说两种形式不能混。要给子进程钉死 PATH，用 \`set\`，不要靠 \`experimental_use_profile\` 去 source 整份 rc。

这是防御纵深，不是第一道防线。第一道仍是 sandbox + 不 yolo。`,
    category: "security",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["环境变量", "密钥", "沙箱"],
    related: ["experimental-use-profile", "allow-login-shell-false", "shell-snapshot"],
    sources: [
      {
        label: "OpenAI · Config basics",
        url: "https://learn.chatgpt.com/docs/config-file/config-basic",
      },
    ],
  },
  {
    id: "codex-doctor",
    no: 78,
    title: "一出问题先跑 codex doctor",
    summary: "环境、Git、终端、app-server、端点防护、代理、桌面端状态、更新连通性、PATH 上的影子二进制。",
    body: `\`\`\`bash
codex doctor
codex --version
npm view @openai/codex version
\`\`\`

PATH 上有两份 CLI 时，升级「没生效」几乎总是这个原因。Doctor 会标出来。

它还会报告编辑器/pager 环境，并在 JSON 输出里打码敏感值。升级或迁机器之后当成体检。`,
    category: "debug",
    level: "starter",
    surfaces: ["cli"],
    tags: ["doctor", "PATH", "排错"],
    featured: true,
    sources: [
      {
        label: "Blake Crosley · Codex CLI Guide",
        url: "https://blakecrosley.com/guides/codex",
      },
    ],
  },
  {
    id: "audit-instruction-chain",
    no: 79,
    title: "让 Codex 复述当前指令链",
    summary: "不要猜它读了哪份 AGENTS.md。直接问，或打开 TUI 日志。",
    body: `\`\`\`bash
codex --ask-for-approval never "列出加载的指令来源，并按优先级总结规则。"
codex --cd services/payments --ask-for-approval never "当前生效的指令文件有哪些？"
\`\`\`

审计日志：

\`\`\`bash
codex -c log_dir=./.codex-log
# 然后看 ./.codex-log/codex-tui.log
\`\`\`

若开了会话日志，也可检查最近的 \`session-*.jsonl\`。

指令显得陈旧：在目标目录重开。指令链每次 run 重建，没有需要手动清的缓存。`,
    category: "debug",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["AGENTS.md", "日志", "审计"],
    related: ["log-dir-enables-tui-log", "wrong-guidance"],
    sources: [
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
  },
  {
    id: "wrong-guidance",
    no: 80,
    title: "指导错了，先查 override",
    summary: "同层的 AGENTS.override.md 会让普通文件被忽略。全局家目录里也常藏着一份。",
    body: `排查顺序：

1. \`echo $CODEX_HOME\`
2. 找 \`AGENTS.override.md\`（家目录和仓库树）
3. 确认 \`codex status\` 里的工作区根
4. 文件是不是空的（空文件会被跳过）
5. 项目是否受信任
6. fallback 文件名是否出现在 \`project_doc_fallback_filenames\`
7. 是否撞上 32 KiB 上限

改完配置要新开进程。`,
    category: "debug",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["override", "排错", "发现"],
    sources: [
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
    related: ["override-not-committed", "project-doc-max-bytes"],
  },
  {
    id: "instructions-truncated",
    no: 81,
    title: "后半段规则没生效，多半是截断",
    summary: "合并指令链达到 project_doc_max_bytes 就停止追加。子目录文件可能根本没进去。",
    body: `处理：提高上限，或把文件拆到更靠近 cwd 的位置，让真正重要的规则出现在被读取的那一段。

验证方法：让 Codex 列出源文件。你最关心的那份不在列表里，就是发现在到达它之前已经停了。`,
    category: "debug",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["截断", "32KiB", "排错"],
    sources: [
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
  },
  {
    id: "features-list",
    no: 82,
    title: "用 codex features 查看实际生效的开关",
    summary: "别靠记忆。list / enable / disable 会持久化进 config.toml。",
    body: `\`\`\`bash
codex features list
codex features enable memories
codex features disable remote_connections
\`\`\`

常见开关：\`hooks\`（旧名 \`codex_hooks\`）、\`unified_exec\`（Windows 默认关）、\`shell_snapshot\`、\`multi_agent\`、\`memories\`、\`fast_mode\`、\`undo\`（稳定但默认关）、\`codex_git_commit\`（开发中、默认关，管提交 trailer）、\`remote_plugin\`（稳定、默认开，关远程插件目录）。一次性也可用 \`codex --enable memories\`。

\`/experimental\` 也可从 TUI 把实验功能写进 config。

开 memories 前先读隐私影响：记忆是按用户而不是按项目的，默认不要注入不信任会话。`,
    category: "debug",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["features", "memories", "flags"],
    related: ["unified-exec-and-ps", "features-undo", "remote-plugin-catalog"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "fix-ci-recipe",
    no: 83,
    title: "配方：先诊断 CI，再最小修复",
    summary: "两轮。第一轮只读总结；第二轮在约束下修。不要让一次提示既分析又重写。",
    body: `\`\`\`text
第一轮（只读）：
找出 pnpm typecheck 失败的原因。看错误输出，定位根因，提出最小修复。先不要改文件。

第二轮：
应用修复，再跑 pnpm typecheck，总结改了什么。
不要做格式化-only 的改动。停在类型真正修复的时候。
\`\`\`

范围收紧到目录。大仓里「修所有类型错误」会变成无限任务。`,
    category: "recipes",
    level: "starter",
    surfaces: ["cli"],
    tags: ["CI", "配方", "最小修复"],
    sources: [
      {
        label: "SoftVerdict · Codex tips",
        url: "https://softverdict.com/openai-codex-tips-tricks-2026/",
      },
    ],
  },
  {
    id: "test-first-recipe",
    no: 84,
    title: "配方：先写失败测试，再实现",
    summary: "先让 Codex 写会失败的测试并提交为检查点，再让它写到测试变绿。",
    body: `\`\`\`text
1. 为这个 bug 补回归测试。先不要修实现。跑测试，确认失败原因是这个 bug。
2. 停下来等我把失败测试提交。
3. 再实现修复。Done when：新测试和既有套件都通过。
\`\`\`

失败测试当检查点，能防止「连测试一起改」把 bug 定义改掉。把「实现任务中不要改测试」写进 \`AGENTS.md\`。`,
    category: "recipes",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["TDD", "测试", "配方"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "review-before-commit",
    no: 85,
    title: "配方：本地 /review，再开 PR",
    summary: "实现线程里跑完测试后，fork 或新开一条审查线程。别让作者给自己的 diff 当唯一评审。",
    body: `\`\`\`text
/review 对照 main。关注：回归、缺失测试、密钥、权限、意外的 API 变化。
\`\`\`

桌面 App 可开 diff 面板，点某一行把反馈送进下一轮。

GitHub 上可自动审，或评论 \`@codex review\`。只写 \`@codex\` 会开 Cloud 聊天。本地审查仍然值得做：反馈循环更快，配额也更便宜。`,
    category: "recipes",
    level: "starter",
    surfaces: ["cli", "app", "cloud"],
    tags: ["/review", "PR", "配方"],
    related: ["github-pr-codex-review", "code-review-rules-section", "review-command"],
    sources: [
      {
        label: "OpenAI · Review GitHub pull requests",
        url: "https://learn.chatgpt.com/docs/third-party/github",
      },
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "split-parallel-recipe",
    no: 86,
    title: "配方：大任务按所有权边界切开",
    summary: "独立、不重叠的工作再并行。共享文件的改动串行，或拆到不同 worktree。",
    body: `好的切法：

- 后端校验 vs 前端表格（API 合同先定死）
- 文档 vs 实现
- 测试脚手架 vs 功能代码（先合并测试）

坏的切法：

- 两个代理同时改同一个 router
- 「一边重构一边加功能」

提示模板：

\`\`\`text
开两个子代理：
A：只给 API handler 加输入校验
B：只给现有 handler 写单测
不要改共享类型。做完后由主代理合并结果并跑 pnpm test。
\`\`\`

有重叠就改用两个 worktree，然后由你来合。`,
    category: "recipes",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["并行", "子代理", "worktree"],
    sources: [
      {
        label: "SoftVerdict · Codex tips",
        url: "https://softverdict.com/openai-codex-tips-tricks-2026/",
      },
    ],
  },
  {
    id: "session-decision-tree",
    no: 87,
    title: "配方：开工前的五步决策树",
    summary: "跨会话？→ /goal。要 git 隔离？→ worktree。可并行且不重叠写？→ 子代理。否则单线程，跑题用 /side。",
    body: `按顺序问：

1. **会跨多次会话吗？** 会 → 先 \`/goal set\`
2. **需要独立分支和干净文件状态吗？** 需要 → \`git worktree add\`
3. **子任务能并行吗？** 能，且不写同一批文件 → 子代理
4. **会写同一批文件？** → worktree，不要子代理
5. **其余** → 单线程。中途跑题用 \`/side\`；要保留的备选方案用 \`/fork\`

反模式：超级线程、过早委派、只建不删的 worktree、含糊的 goal、本该 \`/side\` 却 \`/fork\`。`,
    category: "recipes",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["决策树", "会话", "配方"],
    featured: true,
    sources: [
      {
        label: "Codex Knowledge Base · Session patterns",
        url: "https://codex.danielvaughan.com/2026/05/22/codex-cli-session-patterns-threads-worktrees-side-goals-subagents-decision-framework/",
      },
    ],
  },
  {
    id: "import-from-other-tools",
    no: 88,
    title: "配方：从 Claude Code 或 Cursor 迁过来",
    summary: "/import 可迁设置、MCP、插件、会话、命令和项目记忆。先选择性导入，再清理。CLI 最多 50 条近 30 天聊天。",
    body: `不要指望一份 \`CLAUDE.md\` 自动变成完美的 \`AGENTS.md\`。流程：

1. \`project_doc_fallback_filenames\` 先纳入现有文件，立即能用
2. \`/import\` 迁 MCP 和会话
3. 手工把规则改写成 Codex 风格的短 \`AGENTS.md\`
4. 把重复工作流收成 skills
5. 用 profile 文件重建「careful / fast」等模式

CLI 只从 Claude Code 或 Cursor 导入，最多最近 30 天里的 50 条聊天。任务进行中、远程会话、或连着本机 app-server daemon 时没有 \`/import\`。桌面应用还可导入 Claude Cowork，并在 Settings > Import 打开自动同步。

\`CLAUDE.md\` 和 \`.cursor/rules\` 解决的是相近问题，发现顺序和覆盖语义并不相同。迁完核对 MCP 鉴权、钩子和权限，再用「复述指令链」验证。`,
    category: "recipes",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["/import", "迁移", "Cursor"],
    sources: [
      {
        label: "OpenAI · Import from another agent",
        url: "https://learn.chatgpt.com/docs/import",
      },
      {
        label: "Blake Crosley · Codex CLI Guide",
        url: "https://blakecrosley.com/guides/codex",
      },
    ],
  },
  {
    id: "memories-opt-in",
    no: 89,
    title: "记忆按用户生效，谨慎注入不信任会话",
    summary: "memories 功能把跨会话事实存在 $CODEX_HOME/memories/。/memories 可控制使用、生成、重置。",
    body: `\`\`\`toml
[features]
memories = true
\`\`\`

作用域是**用户级**，不是项目级。适合：你的语言偏好、常用工具链、个人习惯。

不要指望它记住某仓库的架构——那是 \`AGENTS.md\` 的工作。

不要把记忆注入处理不受信任代码或机密材料的会话。每线程开关会记在状态库里。开了功能之后，「用」和「生成」还是两把开关，见 \`memories-use-vs-generate\`。`,
    category: "session",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["memories", "隐私", "范围"],
    related: ["memories-use-vs-generate"],
    sources: [
      {
        label: "OpenAI · Memories",
        url: "https://developers.openai.com/codex/memories",
      },
      {
        label: "OpenAI · Memories (Learn)",
        url: "https://learn.chatgpt.com/docs/customization/memories",
      },
    ],
  },
  {
    id: "login-device-auth",
    no: 90,
    title: "无头环境用 device-auth 或按次 API key",
    summary: "codex login 走 ChatGPT OAuth；远程盒用 --device-auth；脚本用 --with-api-key 从 stdin 读。",
    body: `\`\`\`bash
codex login
codex login --device-auth
printenv OPENAI_API_KEY | codex login --with-api-key
codex login status   # 已登录则退出码 0
codex logout
\`\`\`

企业钉登录方式和工作区，用顶层 \`forced_login_method\` / \`forced_chatgpt_workspace_id\`。凭据不符会登出并退出。

自定义 CA：\`CODEX_CA_CERTIFICATE\`（回退 \`SSL_CERT_FILE\`）。

浏览器回调被挡时，优先 \`codex login --device-auth\`。还不行就从本机转发 CLI 默认回调口：

\`\`\`bash
ssh -L 1455:localhost:1455 user@remote
# 在这条 SSH 会话里跑 codex login，用本机浏览器打开打印出的地址
\`\`\`

有浏览器的机器登录成功后，可把 \`~/.codex/auth.json\` 拷到无头机（当密码）。\`cli_auth_credentials_store = "keyring"\` 时没有这份文件。

浏览器回调失败先看 \`~/.codex/log/codex-login.log\`。设了 \`log_dir\` 就跟过去。这不是明文 \`codex-tui.log\`。

不要把 login 放进会把 \`auth.json\` 打进日志的共享镜像构建。`,
    category: "automation",
    level: "intermediate",
    surfaces: ["cli", "ci"],
    tags: ["login", "device-auth", "无头"],
    related: [
      "cli-auth-credentials-store",
      "forced-login-method",
      "login-diagnostics-log",
      "api-key-inline-env",
      "workspace-access-token",
    ],
    sources: [
      {
        label: "OpenAI · Authentication",
        url: "https://learn.chatgpt.com/docs/auth",
      },
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "cloud-secrets-setup-only",
    no: 96,
    title: "Cloud 密钥只在 setup 阶段可见",
    summary: "环境变量全程都在；Secrets 只给 setup 脚本，agent 阶段会被拿走。setup 里的 export 也不会带进 agent。",
    body: `Cloud 聊天分两段：先跑 setup（可上网装依赖），再进 agent 循环。默认 agent 阶段断网。

密钥和变量不要混用：

- 普通环境变量：setup 和 agent 都能看见
- Secrets：多一层加密，只在 setup 解密；agent 开始前删除
- setup 脚本是另一段 Bash，\`export\` 进不了 agent。要持久化就写进环境设置或 \`~/.bashrc\`

不要指望把生产密钥塞进 Secrets，再让 agent 用同样的值去调外部 API。需要 agent 访问时，用环境变量并收紧 internet allowlist，或把密钥只留给 setup 去写好本地工具链。`,
    category: "cloud",
    level: "intermediate",
    surfaces: ["cloud"],
    tags: ["Cloud", "密钥", "setup"],
    related: ["cloud-exec", "scheduled-tasks"],
    sources: [
      {
        label: "OpenAI · Cloud environments",
        url: "https://learn.chatgpt.com/docs/environments/cloud-environment",
      },
      {
        label: "OpenAI · Agent internet access",
        url: "https://learn.chatgpt.com/docs/cloud/internet-access",
      },
    ],
  },
  {
    id: "worktreeinclude-ignored-files",
    no: 97,
    title: "worktree 不会自动带上 .env，用 .worktreeinclude",
    summary: "托管 worktree 从 Git checkout 起步。被 ignore 的本地文件要在仓库根列进 .worktreeinclude，生产密钥不要这么拷。",
    body: `桌面应用创建的托管 worktree 只有已跟踪文件。\`.gitignore\` 里的 \`.env.local\`、\`node_modules\` 默认不在。

需要的 ignore 文件，在仓库根放 \`.worktreeinclude\`：

\`\`\`gitignore
.env
.env.local
\`\`\`

官方会自动拷一份被 ignore 的 \`AGENTS.override.md\`。这只作用于本机 ChatGPT 桌面应用托管的 worktree，不适用于远程树，也不适用于你自己 \`git worktree add\` 出来的树。

生产密钥不要靠拷贝。更稳的做法：

- 跟踪一份无密钥的 \`.env.test\`
- 测试用假变量或依赖注入，避免构造客户端时直接读生产环境
- 第一轮先检查 worktree 里有没有 \`node_modules\` 和环境文件；工具创建的树可能没跑本地 environment setup

\`Handoff\` 同样不会带走 ignore 文件，除非它们在 \`.worktreeinclude\` 里。`,
    category: "cloud",
    level: "intermediate",
    surfaces: ["app", "cli"],
    tags: ["worktree", ".env", "桌面"],
    related: ["worktree-not-subagent", "cli-managed-worktree", "desktop-worktree-setup-scripts"],
    sources: [
      {
        label: "OpenAI · Worktrees",
        url: "https://learn.chatgpt.com/docs/environments/git-worktrees",
      },
      {
        label: "OpenAI Community · worktree .env preflight",
        url: "https://community.openai.com/t/codex-worktrees-need-a-runtime-preflight-for-missing-env-files/1393774",
      },
    ],
  },
  {
    id: "untrusted-git-config",
    no: 98,
    title: "陌生仓库先 git clone，不要直接打开带 .git 的压缩包",
    summary: "代理常在沙箱外跑 git status。仓库自己的 .git/config 里若写了 core.fsmonitor 一类键，可能在批准前提权执行。",
    body: `2026 年 9 月披露的一类问题：编码代理为了采集仓库上下文会调 Git，Git 会执行仓库配置里点名的命令。这发生在 agent 工具层之外，批准旋钮看不见。

Codex 已被报告并打过补丁。你仍应：

- 外来代码用 \`git clone\`，不要解压别人给的、带着 \`.git/\` 的 zip / U 盘目录
- 打开前看 \`git config --get core.fsmonitor\`，以及 hooksPath、credential.helper、pager、diff 驱动
- 保持 CLI 为当前版本；补丁是进程边界上的，不是再写一条 AGENTS.md 能挡住的

普通 \`git clone\` 不会把源仓的 local config 带过来。没有 \`.git\` 的源码包也不走这条路径。`,
    category: "security",
    level: "advanced",
    surfaces: ["cli", "ide", "app"],
    tags: ["Git", "供应链", "沙箱"],
    related: ["agents-supply-chain", "untrusted-skips-project-agents"],
    sources: [
      {
        label: "Manifold · The git you didn't run",
        url: "https://www.manifold.security/blog/ai-coding-agents-git-hijack",
      },
    ],
  },
  {
    id: "cleanup-playwright-chrome",
    no: 106,
    title: "Computer Use 结束后检查残留的无头 Chrome",
    summary: "桌面应用的浏览器 / Playwright 会话关掉后，无头 Chrome 和工作进程有时不会退出，macOS 上还会把 replayd 打满。",
    body: `用过内置 Browser、Computer Use，或把 \`@playwright/mcp\` 配成 STDIO MCP 之后，如果风扇狂转、普通 Chrome 打不开、内存莫名涨到十几 GB，先看是不是残留进程：

- Activity Monitor 里搜 \`Chrome\`、\`playwright\`、\`codex app-server\`
- 命令行带 \`--headless\`、\`--remote-debugging-pipe\`、\`playwright_chromiumdev_profile-\` 的，多半是 Codex 拉起来的
- macOS 上 \`replayd\` 长期 100%+ CPU，通常是这些无头窗口还在占屏幕采集

先完全退出 ChatGPT / Codex 桌面应用（含后台 \`ChatGPT.exe\` / \`app-server\`），再看残留是否消失。不要一上来 \`pkill -9 -f codex\`：它会把还在跑的 app-server 和 MCP 一起杀掉，下次启动更脏。

子代理会给每个孩子再拉一套 MCP 进程。浏览器类 MCP 尽量不要 \`required = true\` 地挂在全局，用完关掉对应服务器，或把 Playwright 留在隔离 worktree / 一次性会话。升级到当前桌面应用后再复查 changelog。`,
    category: "debug",
    level: "intermediate",
    surfaces: ["app", "cli"],
    tags: ["Playwright", "Chrome", "MCP", "排错"],
    related: ["playwright-mcp", "chrome-devtools-mcp", "mcp-required-and-allowlist"],
    sources: [
      {
        label: "openai/codex #28352",
        url: "https://github.com/openai/codex/issues/28352",
      },
      {
        label: "openai/codex #39031",
        url: "https://github.com/openai/codex/issues/39031",
      },
    ],
  },
  {
    id: "unified-exec-and-ps",
    no: 111,
    title: "Windows 上 /ps 空列表，多半是 unified_exec 没开",
    summary: "macOS/Linux 默认走 PTY 后台终端。Windows 默认关。旧键 experimental_use_unified_exec_tool 已弃用。",
    body: `\`/ps\` 列出后台终端和最近几行输出；\`/stop\`（别名 \`/clean\`）停掉当前会话的后台进程。官方说明：只有 \`features.unified_exec\` 生效时才会出现这些终端，否则列表经常是空的。

\`\`\`bash
codex features list
codex features enable unified_exec
\`\`\`

或写入用户配置后新开会话：

\`\`\`toml
[features]
unified_exec = true
\`\`\`

一次性 \`codex --enable unified_exec\` 只覆盖这一程。有人在 Windows 上发现 \`--enable\` 之后 \`features list\` 仍显示 \`false\`，因为平台默认关；要持久开必须写进 \`config.toml\` 或用 \`codex features enable\`。

旧键 \`experimental_use_unified_exec_tool\` 已经弃用。CI 或拿不到 PTY 的环境可以保持关闭。Windows 若命令跑不起来，先对照沙箱日志，不要只怪这个开关。`,
    category: "debug",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["unified_exec", "/ps", "Windows"],
    related: ["features-list", "windows-elevated-sandbox", "background-terminal-max-timeout"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
      {
        label: "OpenAI · Config reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
    ],
  },
  {
    id: "prevent-idle-sleep",
    no: 112,
    title: "笔记本跑长 Goal 先开 prevent_idle_sleep",
    summary: "实验开关，默认关。TUI 用 /experimental 里的 Prevent sleep；桌面应用在设置里打开 Prevent sleep while running。",
    body: `合盖或系统休眠会掐掉正在跑的 Goal。官方长任务页建议本地工作打开 Prevent sleep。CLI：

\`\`\`bash
codex --enable prevent_idle_sleep
codex features enable prevent_idle_sleep
\`\`\`

或：

\`\`\`toml
[features]
prevent_idle_sleep = true
\`\`\`

也可在 TUI 输入 \`/experimental\`，打开 Prevent sleep while running，按提示重启。这是实验特性，默认 \`false\`。只在「这一轮还在跑」时阻止休眠，不是改系统电源方案。

只想看进度、不想让机器一直醒着，用 \`/goal pause\`，回来再 \`/goal resume\`。通知可用 \`tui.notifications\` 和 \`tui.notification_method\`（\`auto\` / \`osc9\` / \`bel\`）；桌面也可以靠 Pets。`,
    category: "session",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["prevent_idle_sleep", "长任务", "实验"],
    related: ["goal-steer-pause", "features-list", "use-goals", "tui-notifications-filter"],
    sources: [
      {
        label: "OpenAI · Long-running work",
        url: "https://learn.chatgpt.com/docs/long-running-work",
      },
      {
        label: "OpenAI · Config reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
    ],
  },
  {
    id: "debug-config-strict",
    no: 117,
    title: "配置没生效，先 /debug-config，不要猜哪一层赢了",
    summary: "按优先级打印实际加载的文件、开关和托管策略来源。抄博客键名时用 --strict-config，未知键会直接报错。",
    body: `\`\`\`text
/debug-config
\`\`\`

输出从低优先级到高：系统 → 用户 → profile → 项目 → CLI。同时列出 \`allowed_approval_policies\`、\`allowed_sandbox_modes\`、\`mcp_servers\`、\`rules\`、\`enforce_residency\`、\`experimental_network\` 这类托管约束。网页 Work 不读 \`~/.codex\`，在本地 TUI 里查到的层解释不了网页行为。

一次运行把未知键当错误，而不是默默忽略：

\`\`\`bash
codex --strict-config
codex --config model_reasoning_effort='"high"'
\`\`\`

有专用旗标就用旗标（\`--model\`、\`--sandbox\`、\`--profile\`）。\`-c\` / \`--config\` 覆盖任意支持键，且优先于所有配置文件。企业 \`requirements.toml\` 天花板不会被项目文件顶掉，诊断里会写来源。`,
    category: "debug",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["/debug-config", "config.toml", "排错"],
    related: ["three-layer-config", "codex-doctor", "check-for-update-on-startup"],
    sources: [
      {
        label: "OpenAI · Developer settings",
        url: "https://learn.chatgpt.com/docs/developer-settings",
      },
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "memories-use-vs-generate",
    no: 123,
    title: "记忆开了之后，用和生成还是两把开关",
    summary: "features.memories 只是总闸。use_memories 管注入，generate_memories 管沉淀。MCP / 网页搜索线程用 disable_on_external_context。",
    body: `先打开功能，再分开控制「读旧记忆」和「写新记忆」：

\`\`\`toml
[features]
memories = true

[memories]
use_memories = true
generate_memories = true
disable_on_external_context = true
\`\`\`

默认在功能开启后：\`use_memories\` 和 \`generate_memories\` 都是 \`true\`。只想用已有记忆、不让当前工作污染长期记忆，把 \`generate_memories\` 设成 \`false\`。处理 MCP、网页搜索或 tool search 的会话，打开 \`disable_on_external_context\`（旧键名 \`no_memories_if_mcp_or_web_search\` 仍可用）。

TUI 或桌面应用里用 \`/memories\` 只改**当前聊天**，不会改全局配置。网页 ChatGPT Work 用账号记忆，不走 \`~/.codex/memories/\`。

记忆文件在 \`$CODEX_HOME/memories/\`，当生成状态看，不要当 AGENTS.md 手改。额度快用尽时，生成会按 \`min_rate_limit_remaining_percent\` 跳过。`,
    category: "session",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["memories", "/memories", "隐私"],
    related: ["memories-opt-in", "mcp-required-and-allowlist", "web-search-modes"],
    sources: [
      {
        label: "OpenAI · Memories (Learn)",
        url: "https://learn.chatgpt.com/docs/customization/memories",
      },
      {
        label: "OpenAI · Config reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
    ],
  },
  {
    id: "api-key-inline-env",
    no: 125,
    title: "CODEX_API_KEY 按次注入，CODEX_HOME 必须先建好",
    summary: "exec / review / SDK 用行内密钥，不要写成整个 job 的 env。设了 CODEX_HOME 却没 mkdir，CLI 会直接起不来。",
    body: `状态根目录必须已经存在：

\`\`\`bash
mkdir -p "$RUNNER_TEMP/codex-home"
export CODEX_HOME="$RUNNER_TEMP/codex-home"
\`\`\`

\`CODEX_API_KEY\` 给 \`codex exec\`、\`codex review\` 和 TypeScript SDK。仓库会跑不受信任代码时，写在这一条命令前面，不要 export 进整个 job 或 shell profile：

\`\`\`bash
CODEX_API_KEY="$SECRET" codex exec --ephemeral "只跑失败的测试并总结。"
\`\`\`

可信自动化若用 ChatGPT / Codex access token：

\`\`\`bash
printenv CODEX_ACCESS_TOKEN | codex login --with-access-token
\`\`\`

装脚本跳过提示：

\`\`\`bash
curl -fsSL https://chatgpt.com/codex/install.sh | CODEX_NON_INTERACTIVE=1 sh
\`\`\`

SQLite 状态默认跟 \`CODEX_HOME\`；要拆开用 \`CODEX_SQLITE_HOME\`（配置里的 \`sqlite_home\` 优先）。排错可设 \`RUST_LOG=codex_core=debug,codex_tui=debug\`，明文 TUI 日志仍要显式 \`log_dir\`。`,
    category: "security",
    level: "intermediate",
    surfaces: ["cli", "ci"],
    tags: ["CODEX_API_KEY", "CODEX_HOME", "CI"],
    related: ["codex-home-profiles", "sqlite-home", "github-action-no-job-key"],
    sources: [
      {
        label: "OpenAI · Environment variables",
        url: "https://learn.chatgpt.com/docs/config-file/environment-variables",
      },
    ],
  },
  {
    id: "ignore-rules-vs-config",
    no: 127,
    title: "--ignore-rules 和 --ignore-user-config 不是同一把开关",
    summary: "前者跳过用户和项目 execpolicy .rules；后者跳过 $CODEX_HOME/config.toml，鉴权仍走 CODEX_HOME。CI 隔离两把都要时才一起开。",
    body: `\`\`\`bash
codex exec --ignore-user-config --ignore-rules --ephemeral \\
  --sandbox workspace-write --ask-for-approval never \\
  "只跑失败的测试并总结。"
\`\`\`

两把旗标各管各的：

- \`--ignore-user-config\`：不加载 \`$CODEX_HOME/config.toml\`。登录态仍看 \`CODEX_HOME\`
- \`--ignore-rules\`：不加载用户和项目的 execpolicy \`.rules\`。团队 \`forbidden\` 前缀在这次运行里不会生效

日常本机不要为了少弹窗开 \`--ignore-rules\`。改规则先用 \`codex execpolicy check --pretty --rules ~/.codex/rules/default.rules -- <command>\`。受控 runner 才把两把一起打开，做成干净环境。`,
    category: "automation",
    level: "advanced",
    surfaces: ["cli", "ci"],
    tags: ["exec", "execpolicy", "CI"],
    related: ["codex-exec-basics", "rules-vs-hooks", "ephemeral-ci"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
      {
        label: "OpenAI · Non-interactive mode",
        url: "https://learn.chatgpt.com/docs/non-interactive-mode",
      },
    ],
  },
  {
    id: "workspace-access-token",
    no: 128,
    title: "企业自动化用 Codex 访问令牌，不要拿它当传输口令",
    summary: "Business / Enterprise 工作区凭证。创建令牌和 Codex Local 是两道开关。临时跑用 CODEX_ACCESS_TOKEN；要落盘再 login --with-access-token。",
    body: `平台 API key 够用就继续用 key。访问令牌是给需要 ChatGPT 工作区身份、席位权益或企业治理的可信本地自动化。

工作区主人要同时打开：

- 允许成员创建 Codex 访问令牌
- 允许该成员使用 Codex Local（CLI / IDE / 桌面）

关掉 Local 会暂停（不是撤销）该成员的令牌。页面 404 多半是缺创建权限。

临时跑：

\`\`\`bash
export CODEX_ACCESS_TOKEN="$SECRET"
codex exec --json "review this repository and summarize the top risks"
\`\`\`

要持久登录：

\`\`\`bash
printf '%s' "$CODEX_ACCESS_TOKEN" | codex login --with-access-token
\`\`\`

不要把这条令牌拿去当 \`codex app-server --remote\` 的传输口令。公开 CI、fork PR、共享机器不要用。优先短有效期，轮换时先写新再撤旧。`,
    category: "security",
    level: "advanced",
    surfaces: ["cli", "ci"],
    tags: ["CODEX_ACCESS_TOKEN", "企业", "login"],
    related: ["api-key-inline-env", "login-device-auth", "service-account-not-personal-token"],
    sources: [
      {
        label: "OpenAI · Access tokens",
        url: "https://learn.chatgpt.com/docs/enterprise/access-tokens",
      },
    ],
  },
  {
    id: "remote-control-pair",
    no: 137,
    title: "手机遥控用 remote-control，别拿它当协议客户端",
    summary: "实验特性。start 开本机 daemon，pair 打出短时配对码。自研客户端仍用 app-server --listen。",
    body: `\`\`\`bash
codex remote-control start
codex remote-control pair --json
codex remote-control stop
\`\`\`

前台跑用 \`codex remote-control\`（不加子命令）。\`pair\` 的 JSON 里有 \`pairingCode\`、\`manualPairingCode\`、\`environmentId\`、\`expiresAt\`。给托管遥控客户端和 SSH 远程工作流用。

不要把它当成 \`codex app-server --listen\` 的替代：协议客户端、自写 IDE、本机 JSON-RPC 仍走 app-server。标了 Experimental，行为可能改。本机报 \`daemon lifecycle is only supported on Unix platforms\` 时，先对照当前 \`/help\`，不要抄第三方 \`remoteControl/enable\` 绕过。`,
    category: "cloud",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["remote-control", "app-server", "实验"],
    related: ["remote-tui", "app-from-tui", "desktop-remote-phone-ssh"],
    sources: [
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
      {
        label: "OpenAI · Feature maturity",
        url: "https://learn.chatgpt.com/docs/feature-maturity",
      },
    ],
  },
  {
    id: "app-server-generate-schema",
    no: 138,
    title: "对接 app-server 先生成本机版本的 schema",
    summary: "generate-ts / generate-json-schema 跟当前 CLI 版本绑定。升级 Codex 要重新生成，不要混用旧类型。",
    body: `\`\`\`bash
codex app-server generate-ts --out ./schemas
codex app-server generate-json-schema --out ./schemas
\`\`\`

产物只对你跑这条命令时的 Codex 版本有效。客户端升级后重新生成，再对照 \`thread/start\`、\`turn/start\`。CI 自动化用 SDK，不要拿 app-server 当作业入口。

实验字段加 \`--experimental\`。WebSocket \`--listen ws://\` 默认未鉴权，只给 localhost 或 SSH 转发。`,
    category: "automation",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["app-server", "schema", "SDK"],
    related: ["remote-tui", "exec-schema", "mcp-add-and-login"],
    sources: [
      {
        label: "OpenAI · Codex App Server",
        url: "https://learn.chatgpt.com/docs/app-server",
      },
    ],
  },
  {
    id: "github-action-prompt-file",
    no: 141,
    title: "官方 action：prompt-file 二选一，最后一步再跑 Codex",
    summary: "openai/codex-action@v1 用密钥代理跑 exec。prompt 和 prompt-file 只能给一个。checkout 关掉 persist-credentials，Windows 必须 safety-strategy: unsafe。",
    body: `提示放仓库里，不要把 PR 正文直接喂给模型：

\`\`\`yaml
- uses: actions/checkout@v5
  with:
    persist-credentials: false

- id: run_codex
  uses: openai/codex-action@v1
  with:
    openai-api-key: \${{ secrets.OPENAI_API_KEY }}
    prompt-file: .github/codex/prompts/review.md
    output-file: codex-output.md
    sandbox: workspace-write
    codex-args: '["--ephemeral"]'
\`\`\`

\`prompt\` 和 \`prompt-file\` 同时写会直接失败。后续步骤用 \`final-message\` 输出，或把 \`output-file\` 当产物上传。结构化结果把 \`--output-schema\` 放进 \`codex-args\`。

权限：

- 默认 \`safety-strategy: drop-sudo\`，Linux/macOS 上不可逆地拿掉 sudo
- Windows runner 必须 \`safety-strategy: unsafe\`
- 不要只靠 \`read-only\` 保护密钥：只读仍可能带着高权限跑
- 多租户 runner 不要 \`unsafe\`
- \`allow-users\` / \`allow-bots\` 限制谁能触发；默认只有有 write 权限的人
- 把 Codex 放在 job 最后一步，避免后面的步骤继承被改过的工作区

fork PR 和 issue 正文当提示前先消毒。密钥仍走官方 action 的代理，不要写进 job 级 \`CODEX_API_KEY\`。`,
    category: "automation",
    level: "advanced",
    surfaces: ["ci"],
    tags: ["GitHub Actions", "exec", "CI"],
    featured: true,
    related: ["github-action-no-job-key", "ephemeral-ci", "exec-schema"],
    sources: [
      {
        label: "OpenAI · Codex GitHub Action",
        url: "https://learn.chatgpt.com/docs/github-action",
      },
    ],
  },
  {
    id: "workload-identity-env",
    no: 144,
    title: "CI 有 OIDC 就用 WIF，不要落盘长期令牌",
    summary: "0.148+ 实验/企业能力。OPENAI_FEDERATION_RULE_ID 和 OPENAI_IDENTITY_TOKEN_FILE 必须成对出现。login/logout 会被拒。",
    body: `工作区要开通 workload identity。管理员在 Admin Portal 连好规则后，进程里只放这两项：

\`\`\`bash
export OPENAI_FEDERATION_RULE_ID="idpm_..."
export OPENAI_IDENTITY_TOKEN_FILE="/var/run/secrets/openai.com/identity-token"
codex login status   # 应打印 Logged in using workload identity
codex exec "Reply with only: workload identity is working"
\`\`\`

规则 ID 不是密钥。令牌文件才是。用绝对路径、目录 \`0700\`，放在仓库和可写根之外。托管 Linux 再挡模型读令牌：

\`\`\`toml
[permissions.filesystem]
deny_read = ["/var/run/secrets/openai.com"]
\`\`\`

刷新令牌由宿主机进程原子改名写入，不要让 Codex 自己去打 metadata 服务。WIF 变量出现任一把，就不会回退到 API key 或 \`auth.json\`；只设一把会报错。交换得到的 OpenAI 令牌只留在内存，不写 \`auth.json\`。

\`codex mcp-server\` 不支持 WIF。原生 Windows 用 elevated 沙箱，否则模型可能读到令牌文件。\`codex login\` / \`logout\` 在这套环境下会被拒绝。`,
    category: "security",
    level: "advanced",
    surfaces: ["ci", "cli"],
    tags: ["WIF", "OIDC", "企业"],
    related: ["workspace-access-token", "github-action-no-job-key", "login-device-auth"],
    sources: [
      {
        label: "OpenAI · Workload identity federation",
        url: "https://learn.chatgpt.com/docs/enterprise/workload-identity",
      },
    ],
  },
  {
    id: "python-sdk-sandbox-turns",
    no: 147,
    title: "Python SDK 按 turn 换沙箱，不要一直 full_access",
    summary: "pip install openai-codex。thread_start 定默认沙箱，后一轮 run 可以改成只读审查。自研客户端仍用 app-server，不要用已删除的 mcp-server。",
    body: `\`\`\`python
from openai_codex import Codex, Sandbox

with Codex() as codex:
    thread = codex.thread_start(
        model="gpt-5.6-terra",
        sandbox=Sandbox.workspace_write,
    )
    thread.run("Make the requested change.")
    review = thread.run("Review the diff only.", sandbox=Sandbox.read_only)
    print(review.final_response)
\`\`\`

已有 asyncio 循环用 \`AsyncCodex\`。发布包自带钉死的 CLI 运行时；只有要对照本机二进制时才 \`CodexConfig(codex_bin=...)\`。

\`Sandbox.read_only\` / \`workspace_write\` / \`full_access\`。省略时用 app-server 默认。传给 \`run\` / \`turn\` 的沙箱会作用到这一轮和之后。TypeScript 仍是 \`@openai/codex-sdk\`，服务端、Node 18+。CI 用 SDK；自研 IDE 走 app-server。`,
    category: "automation",
    level: "advanced",
    surfaces: ["cli", "ci"],
    tags: ["SDK", "Python", "sandbox"],
    related: ["codex-exec-basics", "app-server-generate-schema", "exec-thread-source"],
    sources: [
      {
        label: "OpenAI · Codex SDK",
        url: "https://learn.chatgpt.com/docs/codex-sdk",
      },
    ],
  },
  {
    id: "gitlab-mr-codex-review",
    no: 148,
    title: "GitLab MR 同样写 @codex review，但要先接通环境和 webhook",
    summary: "Beta。GitLab.com 要项目环境才能审。自建实例还要服务账号 PAT。组级 webhook 只能审，不能改代码。",
    body: `评论：

\`\`\`text
@codex review
@codex review for issues in the database migration
@codex fix the P1 issue
\`\`\`

和 GitHub 一样：\`@codex review\` 才是审查。只写 \`@codex\` 会开 Cloud 聊天。手动审可以到 P2；自动审默认只报 P0/P1。

GitLab.com：给项目建 Cloud 环境，并打开 Enable Codex activity from GitLab（要 Maintainer/Owner 才能装 webhook）。自建 / Dedicated：管理员在 Connectors 里让 Codex 建服务账号，或粘贴带 \`api\` 范围、至少 30 天有效期的 PAT。组级 webhook 能覆盖子项目的审查，但改文件、提交、推分支必须另建项目环境。

桌面应用里的「Create pull request」不在这个 beta 里。签名 webhook 要 GitLab 19.0+。`,
    category: "cloud",
    level: "intermediate",
    surfaces: ["cloud"],
    tags: ["GitLab", "@codex", "code review"],
    related: ["github-pr-codex-review", "code-review-rules-section", "cloud-exec"],
    sources: [
      {
        label: "OpenAI · Review GitLab merge requests",
        url: "https://learn.chatgpt.com/docs/third-party/gitlab",
      },
    ],
  },
  {
    id: "slack-at-codex-env",
    no: 149,
    title: "Slack 里 @Codex 要写清仓库，否则会落到最近用过的环境",
    summary: "Cloud 聊天。线程上文会被读进去。选错环境就在同一条线程写清 owner/repo 再 @ 一次。",
    body: `先接通 Cloud 环境和 Slack 应用，再把 \`@Codex\` 拉进频道：

\`\`\`text
@Codex fix the above in openai/codex
\`\`\`

它会匹配你能用的环境；含糊时用最近一次。聊天打在该环境 repo map 的第一个仓库的默认分支。选错了，回：\`Please run this in owner/repo\`，再 \`@Codex\`。

长线程把关键约束写在最后一条，不要指望它翻完整个频道。企业工作区可关掉「任务完成后把答案贴回 Slack」，那时线程里只留聊天链接。\`@Codex\` 会带上消息和线程历史，按机密频道处理。`,
    category: "cloud",
    level: "starter",
    surfaces: ["cloud"],
    tags: ["Slack", "@Codex", "Cloud"],
    related: ["linear-mcp-add", "gitlab-mr-codex-review", "cloud-exec"],
    sources: [
      {
        label: "OpenAI · Use Codex in Slack",
        url: "https://learn.chatgpt.com/docs/third-party/slack",
      },
    ],
  },
  {
    id: "desktop-remote-phone-ssh",
    no: 151,
    title: "手机遥控走桌面 Connections，SSH 要用具体 Host 别名",
    summary: "不能从 CLI / IDE 配 Remote。手机扫桌面二维码。SSH 只认 ~/.ssh/config 里的具体别名，远端 login shell 里要有 codex。",
    body: `手机 Remote 和 CLI 的 \`codex remote-control\` 不是同一条路。配对从桌面应用开始：

1. 主机上打开 ChatGPT 桌面应用 → Settings > Connections > Control this Mac or PC → Set up / Add
2. 用同一账号的手机扫二维码。CLI 和 IDE 扩展没有这个入口
3. 电脑要醒着、应用开着。Mac 合盖时还要接电源和外接显示器。Windows 上 Computer Use 需要会话未锁定

2026-06-08 之后没用过的旧配对，两边都升级后再扫一次。登出会关掉 Remote Control，但不会拆掉已配对设备；登回来再打开即可。

接 SSH 开发机：

\`\`\`sshconfig
Host devbox
  HostName devbox.example.com
  User you
  IdentityFile ~/.ssh/id_ed25519
\`\`\`

\`Host *\` 这类 pattern 会被忽略。本机先 \`ssh devbox\` 能进，再在远端 login shell 确认 \`command -v codex\`：

\`\`\`bash
ssh devbox
command -v codex
env -i HOME="$HOME" USER="$USER" LOGNAME="$LOGNAME" SHELL=/bin/bash /bin/bash -lc 'command -v codex'
\`\`\`

交互 SSH 看得到、干净 login shell 找不到，通常是 \`nvm\` 只写在 \`~/.bashrc\`。把 \`codex\` 放到 \`~/.local/bin\`（login PATH 里）或给它写个 wrapper，不要只靠交互壳。

Handoff 只在「同一 Git 仓、同一子目录」的已保存项目之间搬会话和 Git 状态，不能丢到 Cloud。不要把 app-server 直接暴露到公网；出网用 VPN 或 mesh。

旧桌面构建若 Connections 里没有 SSH，可试 \`[features] remote_connections = true\` 后重启，并以当前 Learn 文档为准。`,
    category: "cloud",
    level: "advanced",
    surfaces: ["app"],
    tags: ["Remote", "SSH", "手机"],
    featured: true,
    related: ["remote-control-pair", "remote-tui", "prevent-idle-sleep"],
    sources: [
      {
        label: "OpenAI · Codex Remote",
        url: "https://learn.chatgpt.com/docs/remote",
      },
      {
        label: "OpenAI · Remote connections",
        url: "https://learn.chatgpt.com/docs/remote-connections",
      },
    ],
  },
  {
    id: "codex-security-cli-scan",
    no: 154,
    title: "Security CLI 把结果写到仓库外，先 --dry-run",
    summary: "npx @openai/codex-security 是另一套扫描产品，不是编码 CLI。只扫你有权评估的仓。CI 把二进制装在 checkout 外面。",
    body: `需要 Codex Security 权限。Node 22.13+ / 24 / 26，扫描还要 Python 3.10+。

\`\`\`bash
npx @openai/codex-security --version
npx @openai/codex-security login          # 无头用 --device-auth
REPOSITORY=/path/to/repository
SCAN_DIR=/path/outside/repository/codex-security-results
npx @openai/codex-security scan "$REPOSITORY" --output-dir "$SCAN_DIR" --dry-run
npx @openai/codex-security scan "$REPOSITORY" --output-dir "$SCAN_DIR"
npx @openai/codex-security scan "$REPOSITORY" --diff origin/main --head HEAD
npx @openai/codex-security install-hook
\`\`\`

\`--dry-run\` 只校验输入，不加载凭据。省略 \`--output-dir\` 会写进产品自己的状态目录。报告含源码摘录，目录不要放进仓里。同时有 API key 又想用 ChatGPT 登录时加 \`--auth chatgpt\`。

CI 把包装到 \`$RUNNER_TEMP\`（或 \`/tmp\`），用绝对路径跑，密钥映射成扫描进程的 \`OPENAI_API_KEY\`，并 \`--auth api-key\`。\`--json\` 打出一份完整 JSON（不是 \`codex exec\` 那种 JSONL）。\`--fail-on-severity high\` 才会让检查失败。fork / Dependabot 不要带密钥。`,
    category: "security",
    level: "advanced",
    surfaces: ["cli", "ci"],
    tags: ["Codex Security", "扫描", "CI"],
    related: ["review-before-commit", "github-pr-codex-review", "ephemeral-ci"],
    sources: [
      {
        label: "OpenAI · Codex Security CLI",
        url: "https://learn.chatgpt.com/docs/security/cli",
      },
      {
        label: "OpenAI · Codex Security in CI",
        url: "https://learn.chatgpt.com/docs/security/cli/ci",
      },
    ],
  },
  {
    id: "service-account-not-personal-token",
    no: 155,
    title: "CI 用服务账号令牌，不要借用某个人的访问令牌",
    summary: "按量计费工作区。主人建非人身份。令牌代表服务账号，不继承创建者的插件。CLI 要 0.142+。",
    body: `个人访问令牌代表创建它的成员。服务账号是工作区里的非人身份，有自己的组、角色、插件和审计。只有 owner / admin 能创建。插件要在账号自己的 Plugins 里配，不会抄创建者的。

CI 或共享集成：

\`\`\`bash
export CODEX_ACCESS_TOKEN="<service-account-access-token>"
codex exec --json "Inspect this repository and summarize its current state."
\`\`\`

可信长期机器才落盘：

\`\`\`bash
printf '%s' "$CODEX_ACCESS_TOKEN" | codex login --with-access-token
\`\`\`

临时 runner 只 export、不要 \`login\`。令牌只显示一次。SCIM 把 \`userType\` 设成 \`ServiceAccount\`。Admin API 的写操作要 \`chatgpt.enterprise.service_account.write\`；服务账号令牌不能调 Admin API。

这和平台 API 项目服务账号不是同一套账本。公开 CI、fork PR 不要用。`,
    category: "security",
    level: "advanced",
    surfaces: ["cli", "ci"],
    tags: ["服务账号", "CODEX_ACCESS_TOKEN", "企业"],
    related: ["workspace-access-token", "login-device-auth", "github-action-no-job-key"],
    sources: [
      {
        label: "OpenAI · Service accounts",
        url: "https://learn.chatgpt.com/docs/enterprise/service-accounts",
      },
    ],
  },
  {
    id: "prisma-airs-save-then-enable",
    no: 158,
    title: "Prisma AIRS 先保存连接，再单独打开扫描",
    summary: "企业外部护栏。Save connection 不等于 Enable。平台 API key 会话扫不到。失败默认放行，要拦截得改 On AIRS failure。",
    body: `工作区管理员在 Codex Data controls → External guardrails → Prisma AIRS：

1. 填 API key、Security profile、Endpoint URL
2. 选 Enforcement mode（默认 Block）和 On AIRS failure（默认 Allow prompts）
3. Save connection（会校验并加密密钥）
4. Test connection
5. 再打开 Enable Prisma AIRS

第 3 步不会开始扫描。API key 登录的会话不在覆盖范围；要扫就必须用工作区 ChatGPT 登录。只扫新提交的提示文本，不扫回复、工具调用、文件和图片。

端点按部署选：美国 \`https://service.api.aisecurity.paloaltonetworks.com\`，德国 \`service-de\`，印度 \`service-in\`，新加坡 \`service-sg\`。默认美国。数据驻留可能限制可用端点。轮换密钥用 Rotate API key，不要 Disconnect 再重建。`,
    category: "security",
    level: "advanced",
    surfaces: ["cli", "app", "ide", "cloud"],
    tags: ["Prisma AIRS", "企业", "护栏"],
    related: ["login-device-auth", "service-account-not-personal-token", "workspace-access-token"],
    sources: [
      {
        label: "OpenAI · Prisma AIRS",
        url: "https://learn.chatgpt.com/docs/enterprise/prisma-airs",
      },
    ],
  },
  {
    id: "worktree-hooks-use-root-codex",
    no: 164,
    title: "Git worktree 里的项目钩子，看主仓 .codex 而不是这棵树",
    summary: "链接 worktree 的 .git 是文件。项目 hooks.json 以主 checkout 为准。发现失败就改用 ~/.codex/hooks.json。",
    body: `链接 worktree 里 \`.git\` 是指向 \`gitdir:\` 的文件，不是目录。Codex 对项目钩子的权威路径是**主仓**的 \`.codex/\`（\`hooks.json\` 和 TOML 钩子），好让同一仓库共用一份信任哈希。

所以：团队门禁用的 \`PreToolUse\` / \`Stop\` 写进主仓 \`.codex/hooks.json\` 并提交。不要只在 \`$CODEX_HOME/worktrees/...\` 里放一份，以为这棵树会单独执行。

如果 \`codex doctor\` 认得出项目，但只有用户级钩子在跑：

\`\`\`bash
# 确认当前是不是链接 worktree
git rev-parse --is-inside-work-tree
git rev-parse --show-toplevel
git rev-parse --git-common-dir
\`\`\`

\`--dangerously-bypass-hook-trust\` 解决不了「根本没扫到文件」。临时绕过：把同一份钩子放到 \`~/.codex/hooks.json\`。桌面托管 worktree 另走 Local environment setup，和 CLI 这套发现不是同一条路。`,
    category: "hooks",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["hooks", "worktree", "hooks.json"],
    related: ["hooks-lifecycle", "cli-managed-worktree", "untrusted-skips-project-agents"],
    sources: [
      {
        label: "openai/codex#27133",
        url: "https://github.com/openai/codex/issues/27133",
      },
      {
        label: "OpenAI · Hooks",
        url: "https://learn.chatgpt.com/docs/hooks",
      },
    ],
  },
  {
    id: "skip-git-repo-check",
    no: 165,
    title: "非 Git 目录跑 exec，要显式 --skip-git-repo-check",
    summary: "默认拒绝无仓库工作区，防止破坏性改动落在临时目录。一次性目录才开这个旗标，并配上明确的 sandbox。",
    body: `\`codex exec\` 要求当前目录在 Git 仓库里。这是防护，不是故障：没有版本控制时，一次误改很难回滚。

一次性目录、解压出来的源码、CI 临时工作区才覆盖：

\`\`\`bash
codex exec --skip-git-repo-check --sandbox workspace-write \\
  --ask-for-approval never \\
  "只修类型错误，不要改测试。"
\`\`\`

真正要长期改的项目先 \`git init\`（或 clone），不要把跳过检查当成默认启动方式。这个旗标写在 \`exec\` 上；日常交互 TUI 仍应在仓库根启动。

和 \`--yolo\` 无关：跳过 Git 检查不会放大沙箱。临时目录里仍用 \`workspace-write\` 或更窄的权限档，不要顺手 \`danger-full-access\`。`,
    category: "automation",
    level: "intermediate",
    surfaces: ["cli", "ci"],
    tags: ["exec", "git", "CI"],
    related: ["codex-exec-basics", "ephemeral-ci", "yolo-isolated-only"],
    sources: [
      {
        label: "OpenAI · Non-interactive mode",
        url: "https://learn.chatgpt.com/docs/non-interactive-mode",
      },
      {
        label: "OpenAI · Developer commands",
        url: "https://learn.chatgpt.com/docs/developer-commands",
      },
    ],
  },
  {
    id: "exec-mcp-optional-grace",
    no: 186,
    title: "exec 里可选 MCP 默认只等 1 秒，握手成功也可能没进工具表",
    summary: "可选服务器超时后静默从第一轮目录丢掉。桌面能用是因为后面还会刷新。exec 要 required，或把宽限改成 0。",
    body: `\`codex exec\` 在会话一开始就拍下工具表，后面不再等。可选 MCP（没写 \`required = true\`）只享有顶层宽限，默认 **1000** 毫秒。网络 HTTP 服务器经常在握手完成后才返回 \`tools/list\`，那时第一轮目录已经定了，模型看不到工具。桌面长会话会在后续轮刷新，所以同一份 config 在 TUI 里「能用」、exec 里像没装。

exec 必须用到的服务器直接标必达：

\`\`\`toml
[mcp_servers.docs]
url = "https://mcp.example.com/mcp"
required = true
startup_timeout_sec = 20
\`\`\`

或者取消共享宽限，改等各服务器自己的 \`startup_timeout_sec\`：

\`\`\`toml
mcp_optional_startup_grace_ms = 0
\`\`\`

高延迟链路也可以把宽限抬到 \`3000\`–\`5000\`。\`required = true\` 的服务器本来就不走这段宽限，失败会让启动失败，这是有意的。

核对：\`codex mcp list\` 连得上不等于 exec 第一轮带了工具。用一条只读探测：

\`\`\`bash
codex exec --sandbox read-only "列出已连接 MCP 工具名，不要调用写操作。"
\`\`\`

省略日志里出现 omitting pending optional MCP server 时，先改宽限或 required，不要先开 \`--yolo\`。`,
    category: "mcp",
    level: "advanced",
    surfaces: ["cli", "ci"],
    tags: ["MCP", "exec", "mcp_optional_startup_grace_ms"],
    related: ["mcp-required-and-allowlist", "mcp-startup-timeout-sec", "sqlcl-oracle-mcp"],
    sources: [
      {
        label: "OpenAI · Model Context Protocol",
        url: "https://learn.chatgpt.com/docs/extend/mcp",
      },
      {
        label: "openai/codex#38689",
        url: "https://github.com/openai/codex/issues/38689",
      },
    ],
  },
  {
    id: "exec-thread-source",
    no: 209,
    title: "exec 新建或 fork 时用 --thread-source 标注来源",
    summary: "默认 user。CI、夜间任务、自动审查应写成自己的来源名。resume 不会改已经写进会话的来源。不是 originator。",
    body: `交互 TUI 开的线程默认来源是 \`user\`。无头任务也这样标，分析面板就分不清人还是流水线。新建或 fork 时显式写：

\`\`\`bash
codex exec --thread-source automated_review \\
  --sandbox workspace-write --ask-for-approval never \\
  "对照 main 做审查，只输出风险。"

codex exec fork --last --thread-source nightly_ci \\
  "继续修刚才失败的测试。"
\`\`\`

TypeScript SDK 对应 \`threadSource\`。Python SDK 开线程时也可以带调用方来源。值会写进 rollout，并出现在 \`x-codex-turn-metadata\`。这和 originator 覆盖是两套字段，改其中一个不会改另一个。

\`codex exec resume\` 沿用磁盘上已保存的来源，再加 \`--thread-source\` 也改不了旧线程。要换标签就 fork 或新开。本机 \`codex exec --help\` 没有这个旗标就先升级 CLI，不要抄过时包装脚本。`,
    category: "automation",
    level: "intermediate",
    surfaces: ["cli", "ci"],
    tags: ["exec", "thread-source", "CI"],
    related: ["codex-exec-basics", "ephemeral-ci", "python-sdk-sandbox-turns"],
    sources: [
      {
        label: "openai/codex#40155",
        url: "https://github.com/openai/codex/pull/40155",
      },
    ],
  },
  {
    id: "cli-auth-credentials-store",
    no: 218,
    title: "登录缓存用 cli_auth_credentials_store，不要和 exec --ephemeral 抄混",
    summary: "file 写 auth.json；keyring 走系统钥匙串；auto 失败才回文件；ephemeral 只在当前进程内存。这不是会话 rollout 开关。",
    body: `把登录缓存放哪，写在用户 config 顶层，任何 \`[table]\` 之前：

\`\`\`toml
cli_auth_credentials_store = "keyring"
\`\`\`

官方四种值：

- \`file\`：写 \`CODEX_HOME/auth.json\`（默认家目录是 \`~/.codex\`）。这是常见默认。
- \`keyring\`：只走操作系统凭据库，不可用就失败。
- \`auto\`：钥匙串可用就用，否则回退到 \`auth.json\`。
- \`ephemeral\`：只留在当前进程内存，不落盘。

这**不是** \`codex exec --ephemeral\`。后者管会话 rollout 写不写盘；登录态仍按上面的存储走。不要把两条都叫 ephemeral 就当成一件事。

CLI 和 IDE 扩展共用同一份登录缓存。一边 \`codex logout\`，另一边下次也要重新登录。ChatGPT 会话在使用中会自动刷新，所以活跃会话通常不必每天再走浏览器。

无头机拷 \`auth.json\` 只适用于 \`file\`，或 \`auto\` 已经回退到文件。\`keyring\` / \`ephemeral\` 没有这份可拷文件。要拷贝就先在有浏览器的机器上改成 \`file\` 再 \`codex login\`，或改用 \`--device-auth\` / 按次 \`CODEX_API_KEY\`。

管理员可用本机 \`requirements.toml\` 或 macOS MDM 强制这个键；一旦钉死，用户 \`config.toml\` 和 \`-c\` 都改不了。云端托管的 requirements 会忽略这项。\`chatgpt_base_url\` 同理。

部分 Learn 页还只写三种值，没写 \`ephemeral\`。以本机 \`codex --help\` 和 developers 配置参考为准。改完重新 \`codex login\`。`,
    category: "security",
    level: "intermediate",
    surfaces: ["cli", "ide"],
    tags: ["cli_auth_credentials_store", "auth.json", "keyring"],
    related: ["auth-json-is-a-password", "login-device-auth", "forced-login-method"],
    sources: [
      {
        label: "OpenAI · Authentication",
        url: "https://developers.openai.com/codex/auth",
      },
      {
        label: "OpenAI · Configuration reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
    ],
  },
  {
    id: "forced-login-method",
    no: 222,
    title: "企业钉登录方式和 ChatGPT 工作区，用 forced_login_method",
    summary: "chatgpt 或 api。还可钉 forced_chatgpt_workspace_id。凭据不符会登出并退出。这是本机策略，不是日常个人开关。",
    body: `管理员要禁止员工用错登录方式时，写在用户 config 顶层，任何 \`[table]\` 之前：

\`\`\`toml
forced_login_method = "chatgpt"
forced_chatgpt_workspace_id = "00000000-0000-0000-0000-000000000000"
\`\`\`

两个键分开：

- \`forced_login_method\`：只允许 \`"chatgpt"\` 或 \`"api"\`。钉成 chatgpt 就不能再走 API key 登录；钉成 api 就不能再走 ChatGPT 订阅登录。
- \`forced_chatgpt_workspace_id\`：UUID。只在 ChatGPT 登录时限制工作区。API key 登录不看这个键。

当前缓存和限制对不上时，Codex 会登出并退出。这不是温和提示。CI 镜像、共享笔记本、拷来的 \`auth.json\` 一旦和方法或工作区冲突，表现就是立刻退掉，不要先怀疑网络。

这**不是** \`cli_auth_credentials_store\`。后者只管登录缓存放文件还是钥匙串；这两个键管「允许用哪种身份」。也不是 \`chatgpt_base_url\`。

企业更常写进本机 \`requirements.toml\` 或 macOS MDM，而不是每个人的 \`config.toml\`。不要把工作区 UUID 和登录限制写进仓库 \`.codex/config.toml\` 给别人「建议」。改完重新 \`codex login\`，再用 \`codex login status\` 核对。`,
    category: "security",
    level: "advanced",
    surfaces: ["cli", "app", "ide"],
    tags: ["forced_login_method", "forced_chatgpt_workspace_id", "企业"],
    related: ["login-device-auth", "cli-auth-credentials-store", "login-diagnostics-log"],
    sources: [
      {
        label: "OpenAI · Authentication",
        url: "https://developers.openai.com/codex/auth",
      },
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
    id: "login-diagnostics-log",
    no: 224,
    title: "浏览器登录失败先看 codex-login.log，不是 TUI 明文日志",
    summary: "直接跑 codex login 会在日志目录写一份专用文件。默认 ~/.codex/log/codex-login.log。这不是 opt-in 的 codex-tui.log。",
    body: `浏览器回调失败、device-code 转圈、远程盒 \`codex login --device-auth\` 对不上时，先打开登录专用日志：

\`\`\`bash
ls ~/.codex/log/codex-login.log
\`\`\`

默认日志目录是 \`$CODEX_HOME/log\`（家目录通常是 \`~/.codex\`）。你显式设了 \`log_dir\` 时，这份文件跟过去，不在默认家目录里。

这**不是** \`codex-tui.log\`。明文 TUI 日志要你主动写 \`log_dir\` 才会额外打开；\`codex-login.log\` 是 \`codex login\` 这条命令自己写的，不必为了登录排错去打开整段会话明文日志。

不要把登录日志贴进工单或聊天。里面可能有回调 URL、设备码和令牌片段。给支持时按官方要求打码，或只摘报错那几行。\`codex login status\` 只告诉你现在有没有登录，解释不了刚才为什么失败。`,
    category: "debug",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["codex-login.log", "login", "排错"],
    related: ["login-device-auth", "log-dir-enables-tui-log", "cli-auth-credentials-store"],
    sources: [
      {
        label: "OpenAI · Authentication",
        url: "https://developers.openai.com/codex/auth",
      },
    ],
  },
  {
    id: "experimental-use-profile",
    no: 227,
    title: "不要用 experimental_use_profile 当 nvm 开关",
    summary: "默认 false。打开后生成子进程会跑用户 shell profile。这不是 shell_snapshot，也不是 allow_login_shell。实验键，优先用 set 钉 PATH。",
    body: `远端或本机命令找不到 nvm / Homebrew 时，有人会抄这一行：

\`\`\`toml
[shell_environment_policy]
experimental_use_profile = true
\`\`\`

它的含义是：生成子进程时使用用户 shell profile。官方默认 \`false\`。这会把 rc 里的 \`export\`、别名和密钥一并拉进 agent 命令，\`filters\` 先收窄的变量也可能被 profile 再写回来。

对照另外两个键，不要抄混：

- \`features.shell_snapshot\`：默认开，复用启动时拍下的环境。环境陈旧就关快照。
- \`allow_login_shell\`：管 shell 工具能不能要 login shell（读 \`~/.profile\` / \`~/.zprofile\`）。默认 true。
- \`experimental_use_profile\`：实验键，source 用户 profile。不是稳定的 PATH 修复。

要给子进程固定工具路径：

\`\`\`toml
[shell_environment_policy]
set = { PATH = "/usr/bin:/usr/local/bin:/home/you/.nvm/versions/node/current/bin" }
\`\`\`

桌面 Remote / SSH 仍优先把 PATH 写进远端 \`~/.profile\`，并保持 \`allow_login_shell = true\`。不要在仓库 \`.codex/config.toml\` 里给全组打开 \`experimental_use_profile\`。改完新开会话，再用 \`codex features list\` 和一条 \`echo $PATH\` 核对。`,
    category: "config",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["experimental_use_profile", "shell_environment_policy", "PATH"],
    related: ["shell-environment-policy", "allow-login-shell-false", "shell-snapshot"],
    sources: [
      {
        label: "OpenAI · Configuration reference",
        url: "https://learn.chatgpt.com/docs/config-file/config-reference",
      },
      {
        label: "OpenAI · Config advanced",
        url: "https://learn.chatgpt.com/docs/config-file/config-advanced",
      },
    ],
  },
];
