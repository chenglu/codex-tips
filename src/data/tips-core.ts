import type { Tip } from "../types";

export const coreTips: Tip[] = [
  {
    id: "teammate-not-chatbot",
    no: 1,
    title: "把 Codex 当可配置的队友",
    summary: "一次性提示只能救急。真正变强的路径是：上下文 → AGENTS.md → config → MCP → Skills → 自动化。",
    body: `Codex 已经强到「随手丢一个难题」也能交差，但稳定产出靠的是系统，不是灵感。

官方最佳实践把这条升级路径写得很直：

1. 给任务正确的上下文
2. 用 \`AGENTS.md\` 固化仓库约定
3. 用 \`config.toml\` 对齐运行时行为
4. 用 MCP 接仓库外的实时系统
5. 把重复流程收成 Skill
6. 把稳定流程交给 \`codex exec\`、Cloud 或定时任务

把它当聊天框，你会反复解释同一套规范。把它当队友，你只需要配置一次。`,
    category: "mindset",
    level: "starter",
    surfaces: ["cli", "app", "ide", "cloud"],
    tags: ["心智模型", "最佳实践", "配置"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["four-part-prompt", "agents-md-readme", "repeat-becomes-skill", "agents-md-as-index"],
  },
  {
    id: "five-surfaces",
    no: 2,
    title: "五面一体，按工作形状选入口",
    summary: "CLI、桌面端、IDE 扩展、Cloud 任务和浏览器扩展共用同一套智能与配置，差别在交互形态。",
    body: `同一套 GPT-5.x-Codex、同一套 \`config.toml\` 和 \`AGENTS.md\`，五个入口解决不同形状的工作：

- **CLI**：离 Git、测试、日志最近，适合脚本和确定性仓库操作
- **桌面 App**：多线程、worktree、定时任务、审 diff；Linux 预览有独立安装包，Computer Use 还没有
- **IDE 扩展**：改-编-测闭环，适合贴着编辑器改代码
- **Cloud**：异步、隔离环境、Best-of-N
- **浏览器扩展**：已登录站点上的浏览器工作流

大多数人只用其中一个面。高手按任务切换：长任务丢 Cloud，仓库手术用 CLI，贴着文件改用 IDE，规划和协调回 App。`,
    category: "mindset",
    level: "starter",
    surfaces: ["cli", "app", "ide", "cloud"],
    tags: ["CLI", "App", "IDE", "Cloud"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "pick-reasoning-effort",
    no: 3,
    title: "按任务难度选推理强度",
    summary: "Low 处理边界清晰的小改动；Medium/High 给复杂变更和排错；Extra High / xhigh 留给长程推理。",
    body: `推理强度不是「永远拉满」。拉满会更慢、更贵，还不一定更准。

经验值：

- **minimal / low**：格式、重命名、小补丁、已知复现的修 bug
- **medium**：日常功能、常规重构（很多工作区的默认）
- **high**：架构决策、难复现缺陷、跨模块设计
- **xhigh**：长程、强 agentic、需要多步权衡的任务

Plan 模式可以单独提高：\`plan_mode_reasoning_effort = "high"\`，实现阶段仍用中等强度，省预算又不牺牲规划质量。

在会话里用 \`/model\` 随时改模型和 reasoning，不必为一次任务重写配置。`,
    category: "mindset",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["reasoning", "model", "成本"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
      {
        label: "OpenAI · Config reference",
        url: "https://developers.openai.com/codex/config-reference",
      },
    ],
    related: ["plan-first", "status-watch-tokens", "model-reasoning-summary"],
  },
  {
    id: "dont-watch-every-step",
    no: 4,
    title: "不要盯着每一步，和它并行工作",
    summary: "把 Codex 当异步同事：给清目标，去干别的，回来审 diff。盯着逐步批准只会把自己变成瓶颈。",
    body: `官方点名的常见错误之一：把 Codex 当成必须盯着看的东西。

更有效的姿势：

1. 把验证方式写进提示或 \`AGENTS.md\`
2. 沙箱保持合理收紧，而不是全程人工点批准
3. 用 worktree 让长任务不挡你的主工作区
4. 回来用 \`/review\` 和测试结果验收

你要当的是编辑和架构师，不是它的逐步调试器。`,
    category: "mindset",
    level: "starter",
    surfaces: ["cli", "app", "cloud"],
    tags: ["工作流", "并行", "审查"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "four-part-prompt",
    no: 5,
    title: "提示默认写四件套",
    summary: "Goal、Context、Constraints、Done when。四件事写全，Codex 少猜、更好审。",
    body: `一个可复用的提示骨架：

\`\`\`text
Goal: 把结算失败时的重试改成指数退避
Context: @src/billing/retry.ts，昨天的 CI 日志，相关 issue
Constraints: 不要改公共 API；不要动迁移；沿用现有日志字段
Done when: pnpm test -- retry 通过，并且失败三次后不再立即重试
\`\`\`

- **Goal** 写结果，少写手段
- **Context** 用 \`@\` 点名文件、目录、报错，而不是「你自己看吧」
- **Constraints** 写架构、安全、禁止事项
- **Done when** 必须可验证：测试、行为变化、bug 不再复现

没有「完成条件」时，质量门只剩你自己。`,
    category: "prompt",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["提示", "Done when", "@文件"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["mention-files", "give-test-command", "agents-md-readme"],
  },
  {
    id: "mention-files",
    no: 6,
    title: "用 @ 点名文件，而不是描述路径",
    summary: "TUI 里输入 @ 会模糊搜索文件。把关键路径钉进提示，比让模型自己逛仓库更稳。",
    body: `在 CLI 里输入 \`@\` 会打开统一提及菜单（文件、插件、技能）。也可用 \`/mention\`。

适合钉死的东西：

- 出 bug 的文件和它的调用方
- 现有实现范例（「照这个写」）
- 失败的测试或 CI 日志
- 设计文档、schema、错误截图（\`-i\` 附加图片）

大仓库里「你自己找相关代码」会浪费一轮探索。先帮它收窄搜索空间。`,
    category: "prompt",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["@", "上下文", "TUI"],
    sources: [
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "give-test-command",
    no: 7,
    title: "把测试和构建命令交给它",
    summary: "不告诉 Codex 怎么跑检查，它就看不见自己的工作。这是官方点名的高频失误。",
    body: `「改完记得测试」太空。写成具体命令：

\`\`\`text
修复 src/billing 下的类型错误。
每次改完一批就跑：pnpm typecheck
不要为了过检查而 disable lint。
最多改 5 个文件后停下来总结。
\`\`\`

更好的做法是把这些命令写进根目录 \`AGENTS.md\`，让每个会话自动带上：

\`\`\`md
## Commands
- test: pnpm test
- typecheck: pnpm typecheck
- lint: pnpm lint
\`\`\`

Agent 必须能看见构建、测试、类型检查的真实输出，才能闭环。`,
    category: "prompt",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["测试", "AGENTS.md", "验证"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["agents-md-readme", "review-before-commit"],
  },
  {
    id: "interview-first",
    no: 8,
    title: "想法模糊时，先让它采访你",
    summary: "需求说不清时，别急着写代码。让 Codex 追问、挑战假设，再动手。",
    body: `适合丢给它的开场：

\`\`\`text
我有一个模糊想法，先不要写代码。
先采访我：挑战我的假设，把目标、非目标、约束和验收标准问清楚。
问完后给一份一页纸方案，等我确认再实现。
\`\`\`

这和 \`/plan\` 互补：Plan 模式负责搜集仓库上下文并出方案；采访负责把你脑子里没说出口的约束挖出来。`,
    category: "prompt",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["采访", "规划", "需求"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["plan-first"],
  },
  {
    id: "image-prototype",
    no: 9,
    title: "用截图当 UI 规格",
    summary: "CLI 的 -i 可以在第一条提示里附上图片。设计稿、报错弹窗、产品草图都能直接当规格。",
    body: `\`\`\`bash
codex -i screenshot.png "按这张图做页面。约束：只用现有设计 token，不要引入新的 UI 库。"
codex --image before.png,after.png "对比这两张，只列回归，不要改行为。"
\`\`\`

多图用逗号，或重复 \`--image\`。IDE 里按住 Shift 再把图片拖进合成器，否则编辑器会抢走 drop。

适合：

- 还原设计稿
- 复现视觉 bug（附上错误截图）
- 把白板照片变成任务拆解

仍然要写 Constraints 和 Done when。图片解决「长什么样」，写不出「怎样算完成」。`,
    category: "prompt",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["图片", "UI", "-i"],
    sources: [
      {
        label: "OpenAI · Image inputs",
        url: "https://learn.chatgpt.com/docs/image-inputs",
      },
      {
        label: "Codex CLI Cheat Sheet",
        url: "https://www.agenticcodingweekly.com/p/codex-cli-cheat-sheet",
      },
    ],
  },
  {
    id: "dont-overload-prompt",
    no: 10,
    title: "持久规则不要堆在提示里",
    summary: "团队规范、禁止事项、测试命令属于 AGENTS.md 或 Skill。提示只放这一次任务特有的东西。",
    body: `判断标准：

- 「这个仓库永远用 pnpm」→ \`AGENTS.md\`
- 「发版走这七步」→ Skill
- 「这次不要改 API」→ 当前提示
- 「用 live web search」→ 这一次的 flag 或 profile

把持久规则塞进提示，下场是：你每次都要复制一段长文，漏一次就风格漂移。`,
    category: "prompt",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["AGENTS.md", "skills", "提示"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["agents-md-readme", "repeat-becomes-skill"],
  },
  {
    id: "plan-first",
    no: 11,
    title: "复杂任务先 /plan",
    summary: "模糊、多步、难描述的工作，先让 Codex 搜集上下文、提问、出方案。/plan 或 Shift+Tab。",
    body: `Plan 模式会在动手前：

- 读仓库、问澄清问题
- 给出可执行方案
- 等你确认再改代码

切换：TUI 里 \`/plan\`，或 \`Shift+Tab\`。

进阶：给长任务准备 \`PLANS.md\` 或执行计划模板，让规划格式稳定。规划阶段可单独提高 \`plan_mode_reasoning_effort\`。

跳过规划直接开写，是多步任务最常见的翻车方式。`,
    category: "prompt",
    level: "starter",
    surfaces: ["cli", "app"],
    tags: ["/plan", "规划", "Shift+Tab"],
    featured: true,
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["interview-first", "pick-reasoning-effort", "update-plan-opt-in"],
  },
  {
    id: "ask-tradeoffs",
    no: 12,
    title: "重构前先问代价",
    summary: "大重构先让它列出方案、风险、迁移成本和回滚路径，再允许动代码。",
    body: `\`\`\`text
不要改代码。先解释把 X 抽成独立服务的三种做法。
对每种做法给出：影响面、风险、迁移步骤、回滚方式、建议。
等我选一个再实现。
\`\`\`

Agent 很擅长「看起来更干净」的重写。你要的是可上线的权衡，不是更漂亮的目录树。`,
    category: "prompt",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["重构", "权衡", "规划"],
    sources: [
      {
        label: "SoftVerdict · Codex tips",
        url: "https://softverdict.com/openai-codex-tips-tricks-2026/",
      },
    ],
  },
  {
    id: "agents-md-readme",
    no: 13,
    title: "AGENTS.md 是给 Agent 的 README",
    summary: "它会在开工前自动注入。写清目录、命令、约定、禁止事项和如何验收。",
    body: `一份够用的仓库级 \`AGENTS.md\` 通常包括：

- 仓库结构和重要目录
- 如何跑起来
- 构建、测试、lint、typecheck 命令
- 工程约定和 PR 期望
- 禁止事项（例如不要改迁移、不要在实现任务里改测试）
- 怎样才算完成

\`/init\` 能生成骨架，但必须改成你们团队真实的构建、测试、审查和发布方式。

短而准，胜过长而空。从最小集开始，只有重复踩坑才加规则。`,
    category: "agents-md",
    level: "starter",
    surfaces: ["cli", "app", "ide", "cloud"],
    tags: ["AGENTS.md", "/init", "约定"],
    featured: true,
    sources: [
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
    related: ["init-is-scaffold", "keep-agents-md-short"],
  },
  {
    id: "init-is-scaffold",
    no: 14,
    title: "/init 只是脚手架",
    summary: "生成后立刻改。通用模板里的测试命令、包管理器和禁止事项几乎肯定是错的。",
    body: `跑完 \`/init\` 立刻核对：

- 包管理器是不是 pnpm / bun / cargo / uv
- 真正的测试入口（可能是 \`make test\` 而不是 \`npm test\`）
- 哪些目录绝对不能碰
- 服务之间的边界

然后提交。\`AGENTS.md\` 应该和代码一起演进：Codex 第二次犯同一类错，就开一次 retrospective，把规则写回去。`,
    category: "agents-md",
    level: "starter",
    surfaces: ["cli"],
    tags: ["/init", "AGENTS.md"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["retrospective-into-agents"],
  },
  {
    id: "agents-discovery-order",
    no: 15,
    title: "记清 AGENTS.md 的发现顺序",
    summary: "全局一份，再从 Git 根走到 cwd。每一层优先 override，后出现的更具体规则覆盖前面的。",
    body: `每次启动（TUI 通常是每个会话一次）重建指令链：

1. **全局**：\`$CODEX_HOME/AGENTS.override.md\`，否则 \`AGENTS.md\`。这一层只取第一份非空文件。
2. **项目**：从项目根（通常是 Git 根）走到当前目录。每一层按 \`AGENTS.override.md\` → \`AGENTS.md\` → fallback 文件名查找，**每层最多一份**。
3. **合并**：从根拼到 cwd，靠近当前目录的文件更靠后，因此覆盖更通用的规则。

空文件会被跳过。合并大小达到 \`project_doc_max_bytes\`（默认 32 KiB）就停止追加。

验证：

\`\`\`bash
codex --ask-for-approval never "列出你加载的指令来源，并按优先级复述规则。"
\`\`\`

改完文件要新开会话。运行中的会话不会持续重扫。`,
    category: "agents-md",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["发现顺序", "override", "优先级"],
    featured: true,
    sources: [
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
    related: ["override-not-committed", "project-doc-max-bytes"],
  },
  {
    id: "override-not-committed",
    no: 16,
    title: "AGENTS.override.md 不要提交",
    summary: "同层存在 override 时，普通 AGENTS.md 会被忽略。把它留给本机或临时实验，并加入 gitignore。",
    body: `典型分工：

- **提交**：仓库根 \`AGENTS.md\`，以及各包/服务目录里真正共享的规则
- **不提交**：\`AGENTS.override.md\` 和 \`**/AGENTS.override.md\`

Override 适合：

- 你正在试一条还没达成共识的规则
- 某台机器的路径、密钥管理方式和别人不同
- 临时禁用某条全局习惯

指导「看起来错了」时，先查上层或 \`~/.codex\` 里是不是留着一份 override。`,
    category: "agents-md",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["override", "gitignore", "排错"],
    sources: [
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
    related: ["agents-discovery-order", "wrong-guidance"],
  },
  {
    id: "nested-monorepo-agents",
    no: 17,
    title: "Monorepo 把规则沉到包目录",
    summary: "根目录写通用约定，前端/后端/基础设施在各自目录放更具体的 AGENTS.md，避免套用错误命令。",
    body: `例如：

\`\`\`text
AGENTS.md                      # 通用：提交信息、安全、禁止提交密钥
apps/web/AGENTS.md              # pnpm、Playwright、不要改 public API
services/payments/AGENTS.md    # make test-payments，禁止擅自轮转密钥
\`\`\`

从 \`services/payments\` 启动时，会先吃到根规则，再吃到支付服务规则。后出现的覆盖前者。

不要把所有语言的测试命令堆在根文件里——那会让错误的命令被用到错误的包上。`,
    category: "agents-md",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["monorepo", "分层", "AGENTS.md"],
    sources: [
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
  },
  {
    id: "project-doc-max-bytes",
    no: 18,
    title: "指令链默认只有 32 KiB",
    summary: "超限会静默截断。调大 project_doc_max_bytes，或把大段说明拆到更靠近 cwd 的文件。",
    body: `\`\`\`toml
# ~/.codex/config.toml
project_doc_max_bytes = 65536
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
\`\`\`

症状：后半段规则「没生效」，尤其是子目录里的文件根本没被拼进去。

处理：

- 提高上限
- 把规划、审查、架构文档外链到独立 markdown，主文件保持短
- 用 nested \`AGENTS.md\` 代替一份巨型根文件

主文件应是索引和硬约束，不是小说。`,
    category: "agents-md",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["32KiB", "截断", "config"],
    sources: [
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
    related: ["keep-agents-md-short", "instructions-truncated"],
  },
  {
    id: "fallback-filenames",
    no: 19,
    title: "已有 TEAM_GUIDE.md 也能当指令",
    summary: "用 project_doc_fallback_filenames 把现有规范文件纳入发现链，不必立刻复制成 AGENTS.md。",
    body: `每一层的查找顺序是：

\`AGENTS.override.md\` → \`AGENTS.md\` → 你列出的 fallback

团队已经维护 \`CONTRIBUTING.md\` 或 \`CLAUDE.md\` 时，先让 Codex 读它，再逐步迁到专用 \`AGENTS.md\`。

改配置后必须重启 / 新开命令，发现列表不会热更新。`,
    category: "agents-md",
    level: "intermediate",
    surfaces: ["cli"],
    tags: ["fallback", "CLAUDE.md", "迁移"],
    sources: [
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
  },
  {
    id: "keep-agents-md-short",
    no: 20,
    title: "短而准的 AGENTS.md 胜过长篇政策",
    summary: "只写 agent 会重复踩的坑。把规划模板、审查清单、架构说明拆成被引用的独立文件。",
    body: `主文件保持「命令 + 边界 + 完成定义」。容易膨胀的内容外置：

- \`docs/code_review.md\`：审查清单
- \`docs/PLAN_TEMPLATE.md\`：长任务规划格式
- \`docs/architecture.md\`：系统设计

然后在 \`AGENTS.md\` 里写：「审查时遵循 \`docs/code_review.md\`」。

官方建议：发现同样的错误出现第二次，再加规则。预防性长文很少被遵守。`,
    category: "agents-md",
    level: "starter",
    surfaces: ["cli", "app", "ide"],
    tags: ["简洁", "引用", "维护"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
    related: ["agents-md-as-index", "model-instructions-file"],
  },
  {
    id: "agents-md-as-index",
    no: 95,
    title: "AGENTS.md 只当目录，细节放 docs/index.md",
    summary: "主文件只教怎么找上下文。架构、领域和跨目录概念放到带 index.md 和 @tag 的文档树。",
    body: `\`AGENTS.md\` 适合当入口，不适合当百科。社区里一套可执行的拆法：

1. \`AGENTS.md\` 只写导航：先搜哪、必读哪份、完成后要不要回写文档
2. 结构化说明进 \`docs/\`，每个有意义的目录放 \`index.md\`，用一两句话指向子页
3. 跨目录概念用 \`@tag:auth-bootstrap\` 这类记号同时标在文档和代码注释里
4. 用一份短的 \`docs/tags.md\` 给每个 tag 一个含义，避免同名乱飘

这仍然是 Markdown + 文本搜索，不依赖某家 IDE 的向量索引。Codex、人类和 \`rg\` 走同一层。

不要把临时环境状态写进这棵树。瞬时事实让它开工时自己探测。`,
    category: "agents-md",
    level: "intermediate",
    surfaces: ["cli", "app", "ide"],
    tags: ["AGENTS.md", "文档", "检索"],
    related: ["keep-agents-md-short", "project-doc-max-bytes"],
    sources: [
      {
        label: "OpenAI Community · repo-native context pattern",
        url: "https://community.openai.com/t/a-repo-native-context-pattern-for-codex-agents-md-index-md-searchable-tags/1386068",
      },
      {
        label: "mpashka/llm-wiki-tags",
        url: "https://github.com/mpashka/llm-wiki-tags",
      },
    ],
  },
  {
    id: "retrospective-into-agents",
    no: 21,
    title: "第二次犯错就开 retrospective",
    summary: "同一类失误出现两次，让 Codex 复盘并更新 AGENTS.md。指导应来自真实摩擦。",
    body: `\`\`\`text
你刚才又引入了未使用的依赖。做一次简短 retrospective：
1. 为什么会发生
2. 哪条规则能在下次开工前拦住它
3. 直接补进 AGENTS.md，保持简短
\`\`\`

这比预先写 80 条「最佳实践」更有效。规则库会变成你们仓库的真实操作手册。`,
    category: "agents-md",
    level: "intermediate",
    surfaces: ["cli", "app"],
    tags: ["retrospective", "演进", "团队"],
    sources: [
      {
        label: "OpenAI · Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "code-review-rules-section",
    no: 22,
    title: "用 Code Review Rules 定制审查",
    summary: "在最靠近目标代码的 AGENTS.md 里加 ## Code Review Rules。GitHub 上的 Codex Review 会读这些规则。",
    body: `\`\`\`md
## Code Review Rules

### 实验分组
- 不要用转化、留存等曝光后行为过滤实验组。
  安全做法：按分配或曝光建组，把转化当结果指标。
\`\`\`

写规则时：说明要抓住的行为、安全路径或例外。格式和 lint 交给 CI，不要占审查配额。

GitHub 评论必须写精确触发词 \`@codex review\`，不要只写 \`@codex\`。仓库级规则放根 \`AGENTS.md\`，服务特有规则放靠近代码的嵌套文件。`,
    category: "agents-md",
    level: "intermediate",
    surfaces: ["cloud", "app"],
    tags: ["code review", "GitHub", "规则"],
    sources: [
      {
        label: "OpenAI · Review GitHub pull requests",
        url: "https://learn.chatgpt.com/docs/third-party/github",
      },
      {
        label: "OpenAI · AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
    related: ["review-before-commit", "github-pr-codex-review"],
  },
  {
    id: "untrusted-skips-project-agents",
    no: 23,
    title: "不信任的项目不会加载项目级 AGENTS.md",
    summary: "0.150 起未信任项目按设计不提供项目 AGENTS.md。0.150.1 有人复现仍会注入；用 debug prompt-input 核对。",
    body: `项目级 \`AGENTS.md\` 和 \`.codex/config.toml\` 都依赖目录信任。

刚克隆一个陌生仓库时：

1. 先自己读 \`AGENTS.md\` 和 hooks
2. 再把目录标为信任
3. 不要在未审查前开 \`--yolo\`

0.150.0 说明未信任项目不再提供项目级 \`AGENTS.md\`。有人在 0.150.1 用隔离 \`CODEX_HOME\` 复现：标成 \`untrusted\` 后，项目指令仍出现在模型可见输入里。不要只信发布说明，用本机二进制核对：

\`\`\`bash
codex -C /path/to/repo debug prompt-input \\
  -c 'projects."/path/to/repo".trust_level="untrusted"' \\
  "probe input"
\`\`\`

在 JSON 里搜仓库里的哨兵字符串。还在就当供应链防护失效，先自己读文件，或把仓库放到不加载项目文档的环境。

指导「没加载」时，先看信任状态，再查文件是否为空，再查权限档是否根本读不到 \`AGENTS.md\`。`,
    category: "agents-md",
    level: "advanced",
    surfaces: ["cli"],
    tags: ["信任", "安全", "AGENTS.md"],
    sources: [
      {
        label: "Blake Crosley · Codex CLI Guide",
        url: "https://blakecrosley.com/guides/codex",
      },
      {
        label: "openai/codex#41499",
        url: "https://github.com/openai/codex/issues/41499",
      },
    ],
    related: ["agents-supply-chain", "project-config-trust", "permission-profile-agents-read"],
  },
  {
    id: "github-pr-codex-review",
    no: 145,
    title: "GitHub 评论用 @codex review，不要只写 @codex",
    summary: "精确触发词才会发审查。@codex 单独出现会开 Cloud 聊天。安全审查和修 P1 也有固定写法。",
    body: `仓库先接通 Codex cloud，并在 Codex settings 打开 Code review。评论里写：

\`\`\`text
@codex review
@codex review for issues in the database migration
@codex security review
@codex fix the P1 issue
\`\`\`

\`@codex review\` 会在 PR 上发标准 GitHub review，只标 P0/P1。\`@codex security review\` 是另一条更深的安全审查（研究预览）。只写 \`@codex\` 或 \`@codex fix the CI failures\` 会开 Cloud 聊天，不是审查。

自动审在 Codex settings 打开 Automatic reviews。规则写在靠近改动的 \`AGENTS.md\` 的 \`## Code Review Rules\`。Codex 点了 👀 却不发评论时，核对 cloud 是否覆盖该仓、触发词是否完全一致。`,
    category: "cloud",
    level: "starter",
    surfaces: ["cloud"],
    tags: ["GitHub", "@codex", "code review"],
    related: ["code-review-rules-section", "codex-security-cli-scan", "gitlab-mr-codex-review"],
    sources: [
      {
        label: "OpenAI · Review GitHub pull requests",
        url: "https://learn.chatgpt.com/docs/third-party/github",
      },
    ],
  },
];
