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
- \`--skip-git-repo-check\`：允许在非 git 目录跑

\`--full-auto\` 已在 v0.147 删除。改用明确的 sandbox + approval，或一个 profile。`,
    category: "automation",
    level: "intermediate",
    surfaces: ["cli", "ci"],
    tags: ["exec", "CI", "JSONL"],
    featured: true,
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
    related: ["github-action-no-job-key"],
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

桌面 App 原生支持 worktree：侧栏里能看见，线程建在各自树里。

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
    related: ["subagents-when-asked", "session-hygiene"],
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
    body: `在桌面 App 的 Scheduled 页创建。选项目、提示、周期、在独立 worktree 还是本地跑。提示可以调用 skills。

好候选：

- 总结近期提交
- 扫描可能的 bug
- 起草 release notes
- 看 CI 失败
- 写站会摘要
- 复盘最近会话里反复出现的摩擦并改进 \`AGENTS.md\`

先手动跑到可预期，再调度。否则你只是在自动化一个还不稳定的流程。`,
    category: "cloud",
    level: "intermediate",
    surfaces: ["app"],
    tags: ["定时任务", "skills", "维护"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
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
    sources: [
      {
        label: "Codex Knowledge Base · Environment variables",
        url: "https://codex.danielvaughan.com/2026/06/03/codex-cli-environment-variables-runtime-configuration-headless-ci-container-deployment/",
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
    related: ["untrusted-skips-project-agents"],
  },
  {
    id: "shell-environment-policy",
    no: 77,
    title: "用 shell_environment_policy 收窄子进程环境",
    summary: "默认环境可能含有你不想让 agent 命令看见的密钥。显式控制传入子进程的变量。",
    body: `在用户 config 里配置 \`[shell_environment_policy]\`，白名单需要的变量，丢掉云厂商密钥、\`AWS_*\`、\`GITHUB_TOKEN\` 等，除非这个任务必须用。

配合沙箱：即使命令跑出去了，也读不到无关密钥。

这是防御纵深，不是第一道防线。第一道仍是 sandbox + 不 yolo。`,
    category: "security",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["环境变量", "密钥", "沙箱"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
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

常见开关：\`unified_exec\`、\`shell_snapshot\`、\`multi_agent\`、\`memories\`、\`codex_hooks\`、\`remote_connections\`、\`fast_mode\`。

\`/experimental\` 也可从 TUI 把实验功能写进 config。

开 memories 前先读隐私影响：记忆是按用户而不是按项目的，默认不要注入不信任会话。`,
    category: "debug",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["features", "memories", "flags"],
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

GitHub 上可自动审或 \`@Codex\`。本地审查仍然值得做：反馈循环更快，配额也更便宜。`,
    category: "recipes",
    level: "starter",
    surfaces: ["cli", "app", "cloud"],
    tags: ["/review", "PR", "配方"],
    sources: [
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
    summary: "/import 可迁设置、MCP、插件、会话、命令和项目记忆。先选择性导入，再清理。",
    body: `不要指望一份 \`CLAUDE.md\` 自动变成完美的 \`AGENTS.md\`。流程：

1. \`project_doc_fallback_filenames\` 先纳入现有文件，立即能用
2. \`/import\` 迁 MCP 和会话
3. 手工把规则改写成 Codex 风格的短 \`AGENTS.md\`
4. 把重复工作流收成 skills
5. 用 profile 文件重建「careful / fast」等模式

\`CLAUDE.md\` 和 \`.cursor/rules\` 解决的是相近问题，发现顺序和覆盖语义并不相同。迁完用「复述指令链」验证。`,
    category: "recipes",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["/import", "迁移", "Cursor"],
    sources: [
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

不要把记忆注入处理不受信任代码或机密材料的会话。每线程开关会记在状态库里。`,
    category: "session",
    level: "advanced",
    surfaces: ["cli", "app"],
    tags: ["memories", "隐私", "范围"],
    sources: [
      {
        label: "OpenAI · Memories",
        url: "https://developers.openai.com/codex/memories",
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

企业可 \`forced_login_method = "chatgpt"\` 或 \`"api"\`，以及 \`forced_chatgpt_workspace_id\`。

自定义 CA：\`CODEX_CA_CERTIFICATE\`（回退 \`SSL_CERT_FILE\`）。

不要把 login 放进会把 \`auth.json\` 打进日志的共享镜像构建。`,
    category: "automation",
    level: "intermediate",
    surfaces: ["cli", "ci"],
    tags: ["login", "device-auth", "无头"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
];
