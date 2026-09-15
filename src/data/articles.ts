export type ArticleKind = '官方' | '教程' | '清单' | '仓库';

export type Article = {
  title: string;
  url: string;
  source: string;
  lang: '中文' | '英文';
  kind: ArticleKind;
  tags: string[];
  summary: string;
};

export const articles: Article[] = [
  {
    title: 'Best practices',
    url: 'https://developers.openai.com/codex/learn/best-practices',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['入门', '工作流', 'AGENTS.md'],
    summary:
      '官方把 Codex 当成可配置的同事，而不是一次性聊天窗口。核心顺序是：给足任务上下文，用 AGENTS.md 沉淀长期规则，用 config.toml 固定默认行为，用 MCP 接外部系统，把重复流程做成 Skill，稳定后再自动化。',
  },
  {
    title: 'Custom instructions with AGENTS.md',
    url: 'https://developers.openai.com/codex/guides/agents-md',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['AGENTS.md', '配置'],
    summary:
      '说明 AGENTS.md 的发现链：全局目录、仓库根到当前目录逐层拼接，越靠近工作目录优先级越高。每个目录最多取一份文件，组合内容默认 32 KiB 截断。也覆盖 AGENTS.override.md 和备用文件名。',
  },
  {
    title: '使用 AGENTS.md 进行自定义指令',
    url: 'https://developers.openai.ac.cn/codex/guides/agents-md',
    source: 'OpenAI 中文文档',
    lang: '中文',
    kind: '官方',
    tags: ['AGENTS.md', '配置'],
    summary:
      '官方 AGENTS.md 指南的中文版，适合对照英文文档阅读加载顺序、override 机制和 project_doc_max_bytes。内容与英文页对应，适合作为中文入门第一篇。',
  },
  {
    title: 'Customization',
    url: 'https://developers.openai.com/codex/concepts/customization',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['工作流', 'Skills', 'MCP', '子代理'],
    summary:
      '把 Codex 的定制层拆开：AGENTS.md 管长期规则，Memories 带上下文，Skills 封装可重复流程，MCP 连接仓库外的系统，Subagents 分担可并行任务。官方建议按这个顺序叠加，而不是一上来全开。',
  },
  {
    title: 'Agent Skills',
    url: 'https://developers.openai.com/codex/skills',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', '插件'],
    summary:
      'Skill 是带 YAML frontmatter 的 SKILL.md 目录。Codex 先只看 name 和 description，真正用到时才加载全文。可显式用 $skill 调用，也可靠 description 隐式匹配。仓库技能放 .agents/skills，个人技能放 ~/.agents/skills。',
  },
  {
    title: 'Subagents',
    url: 'https://developers.openai.com/codex/subagents',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['子代理', '团队'],
    summary:
      '适合探索代码、并行调查这类能拆开的工作。官方强调：只有你明确要求时才会派生子代理，而且更耗 token。用 /agent 切换线程，并用 max_threads、max_depth 限制失控扇出。',
  },
  {
    title: 'Codex CLI',
    url: 'https://developers.openai.com/codex/cli',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['入门', 'CLI'],
    summary:
      'CLI 总览：本地读改跑代码、权限控制、技能与插件、/review，以及 resume、--image、--search、cloud、mcp 这些终端工作流。适合安装完先扫一遍“能做什么”。',
  },
  {
    title: 'Sample configuration',
    url: 'https://developers.openai.com/codex/config-sample',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['配置', 'config.toml'],
    summary:
      '一份几乎覆盖主要键的 config.toml 样例，含模型、沙箱、审批、MCP、agents、features、profiles。不要整份复制，按需摘键。个人默认放 ~/.codex/config.toml。',
  },
  {
    title: 'Configuration reference',
    url: 'https://developers.openai.com/codex/config-reference',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '清单',
    tags: ['配置', 'config.toml'],
    summary:
      '配置项字典。查 sandbox、approval、project_doc_max_bytes、features.hooks、features.multi_agent 等键时用这一页，比博客转述更准。',
  },
  {
    title: 'Advanced configuration',
    url: 'https://developers.openai.com/codex/config-advanced',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['配置', 'Hooks', '团队'],
    summary:
      '项目级 .codex/config.toml 如何覆盖用户配置、哪些键不能放进仓库、hooks.json 与 [hooks]、project_root_markers，以及信任项目后才会加载本地层。团队落地前必读。',
  },
  {
    title: 'openai/codex',
    url: 'https://github.com/openai/codex',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['入门', 'CLI'],
    summary:
      '官方开源仓库。安装脚本、npm / Homebrew、二进制发布都在 README。CLI、IDE 扩展和桌面应用的入口也从这里分发。遇到版本差异时先看 Releases。',
  },
  {
    title: 'openai/skills',
    url: 'https://github.com/openai/skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', '插件'],
    summary:
      '官方技能示例与 Agent Skills 规范相关材料。写 SKILL.md 前先看这里的目录结构和 description 写法，比凭空发明格式更稳。',
  },
  {
    title: 'Codex CLI Cheatsheet',
    url: 'https://shipyard.build/blog/codex-cli-cheat-sheet/',
    source: 'Shipyard',
    lang: '英文',
    kind: '清单',
    tags: ['CLI', '配置', 'AGENTS.md'],
    summary:
      '把安装、config.toml、常用 flag、斜杠命令、审批/沙箱、exec 脚本化收成一张速查表。适合已经会用、需要随时查命令的人钉在浏览器里。',
  },
  {
    title: 'Codex CLI Guide 2026',
    url: 'https://blakecrosley.com/guides/codex',
    source: 'Blake Crosley',
    lang: '英文',
    kind: '教程',
    tags: ['入门', 'CLI', 'MCP', 'Skills'],
    summary:
      '社区里较完整的 CLI 长文，从安装认证讲到模型、沙箱、AGENTS.md、MCP、Skills、Hooks。内容随版本更新，当手册翻比当唯一真相来源更合适，关键项仍应回官方文档核对。',
  },
  {
    title: 'How to Use Codex CLI (2026 Guide)',
    url: 'https://www.ayautomate.com/blog/how-to-use-codex',
    source: 'AY Automate',
    lang: '英文',
    kind: '教程',
    tags: ['入门', '沙箱', 'AGENTS.md'],
    summary:
      '面向“装上了但不好用”的指南：sandbox 与 approval 怎么配对、/init 之后为什么还要改 AGENTS.md、任务怎么写才写得完、卡住时先查 /permissions。',
  },
  {
    title: 'Codex CLI Commands',
    url: 'https://devgent.org/en/codex-cli-commands-en/',
    source: 'DevGent',
    lang: '英文',
    kind: '清单',
    tags: ['CLI', '自动化'],
    summary:
      '按 essential / useful / situational 给命令分级，并区分交互式 TUI 和 codex exec。对 sandbox 与 approval 的安全默认值写得很清楚，适合做团队内速查。',
  },
  {
    title: 'The Codex CLI Customisation Stack',
    url: 'https://codex.danielvaughan.com/2026/04/12/codex-cli-customisation-stack-unified-system/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['工作流', 'Skills', 'MCP', '插件'],
    summary:
      '把 AGENTS.md、Skills、MCP、Subagents、Plugins 当成一层层叠起来的系统，而不是五个互不相干的功能。对应官方“先约定、再技能、再外部工具、最后再拆代理”的搭建顺序。',
  },
  {
    title: 'Codex CLI Configuration Anti-Patterns',
    url: 'https://codex.danielvaughan.com/2026/06/12/codex-cli-configuration-anti-patterns-twelve-settings-mistakes-tokens-sandbox-agent-performance/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['配置', 'AGENTS.md', '沙箱'],
    summary:
      '十二个常见配置坑：AGENTS.md 过大导致静默截断、沙箱过宽、忽略 compact 与 tool output 限制等。读完能少浪费一批 token，也少踩“规则写了却没生效”的隐性失败。',
  },
  {
    title: 'Codex CLI Subagents: TOML, Parallelism, spawn_agents_on_csv',
    url: 'https://codex.danielvaughan.com/2026/03/26/codex-cli-subagents-toml-parallelism/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['子代理', '自动化'],
    summary:
      '补充官方 Subagents 页：如何用 TOML 定义角色、如何提示模型去 spawn，以及把表格任务打成 CSV 再 fan-out。适合已经有稳定主流程、准备做批量调查的人。',
  },
  {
    title: 'Codex MCP Setup',
    url: 'https://agentscamp.com/guides/mcp/codex-mcp-setup',
    source: 'AgentsCamp',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', '配置'],
    summary:
      '讲清 MCP 是集成层不是指令层：仓库规则仍写 AGENTS.md，流程写 Skill，只有上下文在仓库外时才接 MCP。覆盖 STDIO / HTTP、OAuth，以及只加真正能去掉手工循环的服务器。',
  },
  {
    title: 'AGENTS.md 怎么写？新手指南',
    url: 'https://xiangyugongzuoliu.com/openai-codex-agents-md-guide/',
    source: '翔宇工作流',
    lang: '中文',
    kind: '教程',
    tags: ['AGENTS.md', '入门'],
    summary:
      '用“一份文件从最小可用长到完整”的方式讲 AGENTS.md。强调先写能验证的命令和边界，避免“最好/尽量”，并说明和 CLAUDE.md 共存时用引用或软链，而不是维护两份互相打架的规范。',
  },
  {
    title: 'AGENTS.md 配置 Codex CLI（2026）',
    url: 'https://www.codegateway.dev/blog/agents-md-playbook-2026',
    source: 'CodeGateway',
    lang: '中文',
    kind: '教程',
    tags: ['AGENTS.md', '团队', '配置'],
    summary:
      '把加载顺序、32 KiB 上限、AGENTS.override.md、monorepo 分层写得很具体。核心提醒：全局文件如果已经很胖，仓库级规则可能被静默挤掉。也提供按栈裁剪的短模板思路。',
  },
  {
    title: 'Codex CLI 完全使用手册',
    url: 'https://www.cnblogs.com/knqiufan/p/20094616',
    source: '博客园 · knqiufan',
    lang: '中文',
    kind: '教程',
    tags: ['入门', 'CLI', 'AGENTS.md'],
    summary:
      '中文社区较完整的工具书式长文：安装认证、config、斜杠命令、AGENTS.md、高级功能和与 Claude Code 的对比。适合当中文索引，命令和默认值有变动时仍回官方页确认。',
  },
  {
    title: 'Codex AGENTS.md',
    url: 'https://www.runoob.com/codex/codex-agents-md.html',
    source: '菜鸟教程',
    lang: '中文',
    kind: '教程',
    tags: ['AGENTS.md', '入门'],
    summary:
      '把官方加载规则缩成表格和最短操作步骤，适合完全没接触过指令文件的人。深度不如专题长文，但作为五分钟对照很方便。',
  },
  {
    title: 'The-MDC/codex-cli-best-practice',
    url: 'https://github.com/The-MDC/codex-cli-best-practice',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['工作流', 'Skills', 'MCP'],
    summary:
      '把最佳实践写成可克隆的仓库结构：AGENTS.md、.agents/skills、.codex/config.toml 都有对照说明。适合直接看别人怎么落盘，而不是只读概念。',
  },
  {
    title: 'agent-anatomy/codex',
    url: 'https://github.com/agent-anatomy/codex',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['AGENTS.md', '入门'],
    summary:
      '一份可复制的 AGENTS.md 样板。强调写已经能跑通的真实命令，而不是“运行测试”这种空话；并提醒 combined instruction 有字节上限，monorepo 要用嵌套文件而不是一篇巨无霸。',
  },
  {
    title: '10 practical techniques for mastering Agent Skills',
    url: 'https://shibuiyusuke.medium.com/10-practical-techniques-for-mastering-agent-skills-in-ai-coding-agents-6070e4038cf1',
    source: 'Yusuke Shibui',
    lang: '英文',
    kind: '教程',
    tags: ['Skills', '工作流'],
    summary:
      '把 Agent Skills 当成跨 Codex / Claude Code / Gemini CLI 的开放格式来讲。对 description、分层加载、用 $skill-creator 起步这些点很实用。Codex 路径以 .agents/skills 为准。',
  },
  {
    title: 'Part 3: AGENTS.md — Codex Starter Best Practices',
    url: 'https://codex-best-practices-d67bea.pages.oit.duke.edu/best-practices/agents.html',
    source: 'Duke Codex Starter',
    lang: '英文',
    kind: '教程',
    tags: ['AGENTS.md', '入门'],
    summary:
      '教学向的 AGENTS.md 笔记：该写什么、不该写什么，以及规则文件无法替代 sandbox / approval。强调自然语言指导没有强制力，真正要禁止的动作应落到配置和沙箱。',
  },
  {
    title: 'Worktrees',
    url: 'https://developers.openai.com/codex/app/worktrees',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['工作流', 'Cloud', '团队'],
    summary:
      '桌面应用如何用 Git worktree 并行开聊天：Local 与 Worktree、Handoff、detached HEAD、.worktreeinclude、自动清理和快照。并行改同一仓库前先读这一页。',
  },
  {
    title: 'Hooks',
    url: 'https://developers.openai.com/codex/hooks',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Hooks', '团队', '配置'],
    summary:
      '生命周期脚本官方说明：hooks.json 与 [hooks]、多层全部执行、信任哈希、/hooks 审查，以及 PreToolUse / Stop / SessionStart 等事件。要把“必须跑测试”变成门禁，从这里开始。',
  },
  {
    title: 'Plugins',
    url: 'https://developers.openai.com/codex/plugins',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['插件', 'Skills', 'MCP'],
    summary:
      '插件是 Skill + MCP + Hooks 的分发单位。CLI 用 /plugins，桌面应用有目录，IDE 扩展不支持。装完要新会话。也说明网页 ChatGPT 与本地 Codex 主机不是同一套工具列表。',
  },
  {
    title: 'Slash commands / CLI reference',
    url: 'https://developers.openai.com/codex/cli/reference',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '清单',
    tags: ['CLI', '入门'],
    summary:
      '斜杠命令与开发者命令参考，含 /import、/init、/skills、/clear 等。plugin marketplace add 可用 --ref 钉 Git ref、重复 --sparse 做稀疏检出，并给 add/list/upgrade/remove 加 --json。',
  },
  {
    title: 'Codex changelog',
    url: 'https://developers.openai.com/codex/changelog',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['CLI', '配置'],
    summary:
      '按版本记录行为变化。/import 扩到 Cursor、桌面应用多文件夹项目、各类默认值调整都先看这里，再决定要不要改本机 config.toml。',
  },
  {
    title: 'Codex CLI Power-User Playbook',
    url: 'https://codex.danielvaughan.com/2026/06/04/codex-cli-power-user-playbook-non-obvious-features-configuration-tricks-v0137/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['CLI', '配置', '自动化'],
    summary:
      '15 条不那么显而易见的能力：--ephemeral、Ctrl+R 历史、.codexignore、profile 叠加、--output-schema、codex sandbox、project_root_markers、shell_environment_policy。适合已经会用、开始抠配置的人。',
  },
  {
    title: 'Codex CLI Team Configuration',
    url: 'https://codex.danielvaughan.com/2026/05/09/codex-cli-team-configuration-dotcodex-directory-shared-profiles-repository-scoped-settings/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['配置', '团队', 'Hooks'],
    summary:
      '团队如何用仓库 .codex、共享 profile、hooks 和 requirements.toml 天花板。强调硬规则用 hook / requirements，软偏好留在 AGENTS.md，CI 用独立 profile。',
  },
  {
    title: 'Test-Driven Development with Codex CLI',
    url: 'https://codex.danielvaughan.com/2026/04/10/codex-cli-test-driven-development-workflow/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['工作流', 'Hooks', '自动化'],
    summary:
      '红绿重构怎么嵌进 AGENTS.md、Stop/PreToolUse hook 和 codex exec。特别提醒：要写明禁止改测试，因为代理可能靠削弱断言“变绿”。',
  },
  {
    title: 'How to Use Git Worktrees with Codex CLI',
    url: 'https://inventivehq.com/knowledge-base/openai/how-to-use-git-worktrees',
    source: 'Inventive HQ',
    lang: '英文',
    kind: '教程',
    tags: ['工作流', 'CLI'],
    summary:
      'CLI 没有桌面应用那种一键 worktree 时，怎么自己 git worktree add、理解项目根检测，以及用 CODEX_HOME 给每个工作区隔离配置。',
  },
  {
    title: 'Codex Skills: The Practical Guide',
    url: 'https://www.agentskills.site/codex-skills/',
    source: 'AgentSkills.site',
    lang: '英文',
    kind: '教程',
    tags: ['Skills', '插件'],
    summary:
      '对照源码讲清技能目录：当前用户路径是 ~/.agents/skills，~/.codex/skills 仍扫描但源码标了 deprecated。也覆盖 description 预算、agents/openai.yaml 和隐式调用开关。',
  },
  {
    title: 'Codex Skills: Build Reusable Workflows',
    url: 'https://agentscamp.com/guides/skills/codex-skills-guide',
    source: 'AgentsCamp',
    lang: '英文',
    kind: '教程',
    tags: ['Skills', '工作流'],
    summary:
      '把 Skill 当条件触发的流程，AGENTS.md 当始终加载的约定。覆盖仓库 .agents/skills 向上扫描、/skills 与 $ 显式调用，以及成熟后打成插件分发。',
  },
  {
    title: 'Codex CLI 完全指南（2026）',
    url: 'https://www.heyuan110.com/zh/posts/ai/2026-02-12-codex-cli-mastery-guide/',
    source: 'heyuan110',
    lang: '中文',
    kind: '教程',
    tags: ['入门', 'CLI', 'AGENTS.md'],
    summary:
      '中文长文：斜杠命令、AGENTS.md 发现链、五层配置优先级、project_doc_fallback_filenames。适合当中文索引，默认值和键名变动时仍回官方 changelog。',
  },
  {
    title: 'Iterating development workflows with Codex',
    url: 'https://github.com/openai/openai-cookbook/blob/main/examples/codex/iterating-development-workflows-with-codex.md',
    source: 'OpenAI Cookbook',
    lang: '英文',
    kind: '教程',
    tags: ['工作流', 'Skills', 'AGENTS.md'],
    summary:
      '官方 cookbook 配方：用 AGENTS.md / PLANS.md / GOALS.md 把迭代工作流文件化，再用 skill-creator 做成可复用 harness。适合已经有重复开发循环的仓库。',
  },
  {
    title: 'shanraisshan/codex-cli-best-practice',
    url: 'https://github.com/shanraisshan/codex-cli-best-practice',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['AGENTS.md', '工作流'],
    summary:
      '另一份可克隆的最佳实践仓库，强调 AGENTS.md 超过约 150 行就把流程抽到 Skill，并给出把整份 API 文档塞进去等反模式。',
  },
  {
    title: 'Tips and Tricks for using Codex',
    url: 'https://community.openai.com/t/tips-and-tricks-for-using-codex/1373143',
    source: 'OpenAI Developer Community',
    lang: '英文',
    kind: '教程',
    tags: ['工作流', '子代理', '会话'],
    summary:
      '官方论坛长帖。较新的补充是命令输出卫生：安静 flag、临时日志、把吵闹测试派给子代理，避免主线程被 pytest 全文淹没。',
  },
  {
    title: 'Memories',
    url: 'https://developers.openai.com/codex/memories',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Memories', '配置', '隐私'],
    summary:
      '本地 Memories 是辅助回忆层，不是规则文件。团队必守的约定仍写 AGENTS.md。默认关闭，features.memories 打开后按用户存在 $CODEX_HOME/memories/，可用 /memories 控制本会话是否注入或生成。',
  },
  {
    title: 'Automations',
    url: 'https://developers.openai.com/codex/app/automations',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['自动化', '工作流', '桌面'],
    summary:
      '桌面应用的定时任务：本地或独立 worktree 后台跑，遵守默认沙箱。read-only 会让要写盘的步骤失败；full access 则无人值守风险更高。CLI / IDE 没有这套界面。',
  },
  {
    title: 'Slash commands in Codex CLI',
    url: 'https://developers.openai.com/codex/cli/slash-commands',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '清单',
    tags: ['CLI', '入门'],
    summary:
      '斜杠命令操作说明，不只是旗标表。覆盖 /memories、/experimental、Windows 上的 /sandbox-add-read-dir 等逐步用法，和 cli/reference 的命令字典互补。',
  },
  {
    title: 'Non-interactive mode',
    url: 'https://learn.chatgpt.com/docs/non-interactive-mode',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['CLI', '自动化', 'CI'],
    summary:
      'codex exec 官方页：stderr 进度、stdout 终稿、--ephemeral、--json、--output-schema、resume --last，以及 CI 里不要把 API key 暴露给仓库脚本。GitHub Actions 优先 openai/codex-action。',
  },
  {
    title: 'Build skills',
    url: 'https://learn.chatgpt.com/docs/build-skills',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', '插件'],
    summary:
      '技能编写页：渐进加载、Record & Replay、$skill-creator、$skill-installer，以及 REPO/USER/ADMIN/SYSTEM 路径。description 写不好会匹配不上；要禁隐式触发就在 agents/openai.yaml 关掉 allow_implicit_invocation。',
  },
  {
    title: 'Codex CLI MCP Server Management',
    url: 'https://codex.danielvaughan.com/2026/05/19/codex-cli-mcp-server-management-cli-commands-oauth-streamable-http-production-patterns/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'CLI', '配置'],
    summary:
      'codex mcp add/list/get/remove/login/logout 怎么管 STDIO 与 Streamable HTTP。也覆盖 OAuth、requirements.toml 回退，以及 doctor 会检查 MCP 健康。细粒度超时和工具过滤仍要改 config.toml。',
  },
  {
    title: 'Codex Doctor',
    url: 'https://codex.danielvaughan.com/2026/05/22/codex-doctor-diagnostic-command-troubleshooting-runtime-auth-network-mcp/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['CLI', '排错'],
    summary:
      'codex doctor 查什么、--summary / --json / --all 怎么用。/feedback 会附上打码后的 JSON。JSON schema 仍标 beta，做自动化时要按版本钉住并容忍未知键。',
  },
  {
    title: 'Codex 进阶教程：Skills、Memories、AGENTS.md、MCP、Automations 与 SDK（2026）',
    url: 'https://news.qiniu.com/archives/1783994696399',
    source: '七牛云',
    lang: '中文',
    kind: '教程',
    tags: ['Skills', 'Memories', 'MCP', '自动化'],
    summary:
      '对照 2026 年 7 月 learn.chatgpt.com 的中文进阶索引：技能作用域、记忆边界、MCP 工具级审批、Automations 的 RRULE，以及 TypeScript/Python SDK。排障表提醒 0.134 起 profile 已改独立文件。默认值仍回官方 changelog。',
  },
  {
    title: 'A repo-native context pattern for Codex',
    url: 'https://community.openai.com/t/a-repo-native-context-pattern-for-codex-agents-md-index-md-searchable-tags/1386068',
    source: 'OpenAI Developer Community',
    lang: '英文',
    kind: '教程',
    tags: ['AGENTS.md', '工作流'],
    summary:
      '论坛提案：AGENTS.md 只负责导航，docs/ 用 index.md 指路，跨目录概念用 @tag 加一份 tags.md。配套仓库 mpashka/llm-wiki-tags。适合已经把主文件写爆的仓库。',
  },
  {
    title: 'Codex SDK',
    url: 'https://developers.openai.com/codex/sdk',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['SDK', '自动化', 'CI'],
    summary:
      '用代码驱动本地 Codex：TypeScript 装 @openai/codex-sdk，Python 装 openai-codex。纯编码自动化走 SDK；若 Codex 只是更大编排里的一环，官方建议把 CLI 当 MCP server 交给 Agents SDK。codex mcp-server 入口已弃用。',
  },
  {
    title: 'Cloud environments',
    url: 'https://learn.chatgpt.com/docs/environments/cloud-environment',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Cloud', '配置', '安全'],
    summary:
      '云端容器怎么跑：先 setup 再 agent。Secrets 只给 setup，agent 阶段删除。setup 里的 export 带不进 agent。默认镜像 universal，缓存最多 12 小时，改脚本或密钥会失效。',
  },
  {
    title: 'Agent internet access',
    url: 'https://learn.chatgpt.com/docs/cloud/internet-access',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Cloud', '网络', '安全'],
    summary:
      'agent 阶段默认断网，setup 仍可上网装依赖。按环境打开网络时可配域名白名单，并把方法限制在 GET / HEAD / OPTIONS。出站流量走 HTTP 代理。',
  },
  {
    title: 'Sandbox',
    url: 'https://learn.chatgpt.com/docs/sandboxing',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['沙箱', '权限'],
    summary:
      '本地沙箱与批准旋钮的官方页。workspace-write 是日常低摩擦档；danger-full-access 要配 approval never 才算满权限。auto_review 只审已经需要批准的动作，不扩大沙箱边界。',
  },
  {
    title: 'Agent approvals and security',
    url: 'https://learn.chatgpt.com/docs/agent-approvals-security',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['安全', '沙箱', 'Cloud'],
    summary:
      '对照 CLI / IDE 的 OS 沙箱和 Cloud 两阶段模型。Cloud 密钥只在 setup 出现；本地默认无网络、写入限工作区。适合和 config.toml 的 sandbox_mode、approval_policy 一起读。',
  },
  {
    title: 'Worktrees (ChatGPT Learn)',
    url: 'https://learn.chatgpt.com/docs/environments/git-worktrees',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['worktree', '桌面', '工作流'],
    summary:
      '比应用页更细的 worktree 说明：.worktreeinclude 拷贝指定 ignore 文件、Handoff 不带走未列入的 ignore、托管树默认 detached HEAD、保留最近 15 棵并可快照恢复。远程树和手建 git worktree 不走这套拷贝。',
  },
  {
    title: 'Codex CLI Non-Interactive Pipelines',
    url: 'https://codex.danielvaughan.com/2026/05/03/codex-cli-non-interactive-pipelines-exec-resume-structured-output/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['CLI', '自动化', 'exec'],
    summary:
      '把 codex exec 当成管道原语：--output-schema、resume --last、JSONL 事件和隔离旗标。适合已经会跑一条 exec、要串多阶段 CI 的人。默认值和旗标仍回官方 non-interactive 页。',
  },
  {
    title: 'Codex Automations as Lightweight CI',
    url: 'https://codex.danielvaughan.com/2026/07/19/codex-automations-lightweight-ci-scheduled-agents-codex-exec-github-actions/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['自动化', 'CI', '安全'],
    summary:
      '对照桌面 Automations、codex exec 和 GitHub Actions：只读起步、结构化输出、用 workflow_run 触发而不是替换构建。也提醒 issue 文本注入和密钥外泄，适合已经把流程跑稳再调度的团队。',
  },
  {
    title: 'The git you did not run',
    url: 'https://www.manifold.security/blog/ai-coding-agents-git-hijack',
    source: 'Manifold Security',
    lang: '英文',
    kind: '教程',
    tags: ['安全', 'Git', 'CLI'],
    summary:
      '披露编码代理在沙箱外跑 git status 时，会执行仓库 .git/config 里的 core.fsmonitor 等键。Codex 与 Cursor 已报告并打过补丁。外来代码应 clone，不要直接打开带着 .git 的压缩包。',
  },
  {
    title: 'Windows sandbox',
    url: 'https://learn.chatgpt.com/docs/windows/windows-sandbox',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Windows', '沙箱', '排错'],
    summary:
      '原生 Windows 沙箱两种模式：elevated 用独立低权限用户和防火墙，unelevated 是管理员批准被拦时的退路。两种模式默认都进专用桌面（sandbox_private_desktop = true）；GUI 或 Computer Use 要看见交互桌面才改 false。还覆盖 /sandbox-add-read-dir、错误 1385、Everyone 可写目录警告，以及把 sandbox.log 而不是 .sandbox-secrets 交给支持。',
  },
  {
    title: 'Permissions',
    url: 'https://learn.chatgpt.com/docs/permissions',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['权限', '沙箱', '配置'],
    summary:
      '权限档仍是 beta，且不和旧 sandbox_mode 叠加。任意一层出现 sandbox_mode 或 --sandbox，就会走旧沙箱。内置 :read-only / :workspace / :danger-full-access；自定义档用 extends，网络域名表要另开 features.network_proxy 才生效。',
  },
  {
    title: 'Managed configuration',
    url: 'https://learn.chatgpt.com/docs/enterprise/managed-configuration',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['团队', '配置', '安全'],
    summary:
      '企业怎么发默认值和强制 requirements.toml。0.138 起优先 allowed_permission_profiles。marketplaces.restrict_to_allowed_sources 拦 add/install/refresh，并在运行时过滤；官方精选仓也要显式放行。登录方法、工作区白名单这类鉴权键只能写在本机系统层，云托管 requirements 会忽略。',
  },
  {
    title: 'Config basics',
    url: 'https://learn.chatgpt.com/docs/config-file/config-basic',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['配置', 'config.toml'],
    summary:
      '比参考字典更适合当入门：完整优先级（含云托管默认值和系统层）、Windows 的 [windows].sandbox、顶层 web_search、以及 [features] 里 hooks / memories / unified_exec 的成熟度。未信任项目会跳过项目 .codex 层。',
  },
  {
    title: 'Code review',
    url: 'https://learn.chatgpt.com/docs/code-review',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['CLI', '工作流'],
    summary:
      '/review 官方页：对照基线分支、未提交改动、指定 commit，或自带审查标准。审查不改工作树。桌面应用的 review pane 看的是整个 Git 仓库状态，不只是 Codex 改过的文件；多仓库项目可切换仓库。',
  },
  {
    title: 'Codex 上下文爆满实战：三个字段 + /compact 管住 258K',
    url: 'https://news.qiniu.com/archives/1788489040529',
    source: '七牛云',
    lang: '中文',
    kind: '教程',
    tags: ['上下文', '配置', 'CLI'],
    summary:
      '对照 2026 年 9 月的 Issue 和 changelog：ChatGPT 订阅侧 GPT-5.6 Sol 常被目录夹在 272K（有效约 258K），本地写成 1M 也会被夹回。先 /status 或 codex debug models，再用 model_auto_compact_token_limit、tool_output_token_limit 和关掉 tui.auto_recap 止血。',
  },
  {
    title: 'Model Context Protocol',
    url: 'https://learn.chatgpt.com/docs/extend/mcp',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', '配置', '插件'],
    summary:
      '本地 CLI / IDE / 桌面应用共用一份 MCP 配置；ChatGPT 网页 Work 只走插件，不读 ~/.codex。覆盖 STDIO 与 Streamable HTTP、OAuth CIMD/DCR、auth=oauth|chatgpt（chatgpt 仅同源）。插件自带 HTTP MCP 的 OAuth 在 mcp.json 里用 camelCase（clientId / callbackUrl / callbackPort），不要抄 config.toml 的蛇形键。instructions 前 512 个字符要自成一段。插件自带服务器只能改开关不能改启动命令。',
  },
  {
    title: 'Advanced configuration (ChatGPT Learn)',
    url: 'https://learn.chatgpt.com/docs/config-file/config-advanced',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['配置', 'Hooks', '团队'],
    summary:
      'Learn 站的进阶配置：未信任仓库会跳过项目 .codex（含 hooks 和 rules），项目文件里的鉴权/代理键会被忽略。也覆盖桌面专用 desktop.custom_file_handlers：只认用户级 config，改完要重启桌面应用。',
  },
  {
    title: 'Plugins',
    url: 'https://learn.chatgpt.com/docs/plugins',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['插件', 'Skills', 'MCP'],
    summary:
      '插件目录怎么用：桌面应用和 CLI 有 /plugins，IDE 扩展没有。装完要新会话。API key 登录装不全需要 OAuth 的官方插件。钩子脚本不会随网页安装下发。也说明 Sign in with ChatGPT 只共享姓名邮箱头像，不自动批准动作。',
  },
  {
    title: 'OpenAI Codex Plugins 导读',
    url: 'https://xairouter.com/blog/codex-plugins-guide/',
    source: 'XAI Router',
    lang: '中文',
    kind: '教程',
    tags: ['插件', 'marketplace', 'Skills'],
    summary:
      '中文把插件拆成技能、MCP 和 marketplace 三层。仓库清单放 .agents/plugins/marketplace.json，个人清单放 ~/.agents/plugins/marketplace.json，缓存目录在 ~/.codex/plugins/cache。适合对照官方 Plugins 页看路径，默认值仍回 changelog。',
  },
  {
    title: 'Codex CLI Plugin Marketplace',
    url: 'https://codex.danielvaughan.com/2026/05/08/codex-cli-plugin-marketplace-remote-install-workspace-sharing-bundled-hooks/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['插件', 'CLI', 'Hooks'],
    summary:
      '对照 0.129 之后的 /plugins 浏览器：marketplace 分页、Space 开关、owner/repo 远程安装、捆绑钩子。企业可用托管 marketplace 禁用条目。键名以当前 plugin CLI 和官方 Plugins 页为准。',
  },
  {
    title: 'Long-running work',
    url: 'https://learn.chatgpt.com/docs/long-running-work',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['/goal', '长任务', 'worktree'],
    summary:
      'Goal 模式怎么开、怎么转向：桌面有暂停/继续进度条，CLI 和 IDE 在同一会话里跟进。并行聊天不要写同一批文件，用 worktree 隔离。笔记本建议打开 Prevent sleep。网页 Work 没有这套斜杠，把验收标准写进提示。',
  },
  {
    title: 'Developer commands',
    url: 'https://learn.chatgpt.com/docs/developer-commands',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['斜杠命令', 'TUI', 'CLI'],
    summary:
      'Learn 站的斜杠命令手册，补上 /statusline、/title、/usage、/ps、/stop、/experimental、/goal pause。和 developers.openai.com 的 CLI 参考对照看，本机仍以 /help 为准。',
  },
  {
    title: 'Record & Replay',
    url: 'https://learn.chatgpt.com/docs/extend/record-and-replay',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', '桌面', 'Computer Use'],
    summary:
      'macOS 桌面把一次演示收成 SKILL.md。入口在插件页的 Record a skill，需要 Computer Use。企业 requirements.toml 关掉 computer_use 会连录制一起禁用。生成的技能可以拷到个人技能目录给 CLI 用。',
  },
  {
    title: 'How to Check Codex Usage: CLI Status Line',
    url: 'https://www.jdhodges.com/blog/codex-usage-cli-status-line/',
    source: 'J.D. Hodges',
    lang: '英文',
    kind: '教程',
    tags: ['/statusline', '用量', 'TUI'],
    summary:
      '把 five-hour-limit 和 weekly-limit 加到 TUI 页脚的操作说明。选择器必须按 Enter 才保存。页脚只给百分比，重置时间和积分余额仍看网页 analytics。项名以本机 /statusline 为准。',
  },
  {
    title: 'Hooks (ChatGPT Learn)',
    url: 'https://learn.chatgpt.com/docs/hooks',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Hooks', '配置', '安全'],
    summary:
      'Learn 站的钩子页：SessionStart 的 source 含 compact，自动压缩发生在一轮中间时也会立刻注入 additionalContext。覆盖 async、SessionEnd 强制同步、MCP 工具钩子，以及用 git 根锚定脚本路径。和 developers.openai.com/codex/hooks 对照看。',
  },
  {
    title: 'Developer settings',
    url: 'https://learn.chatgpt.com/docs/developer-settings',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['配置', 'IDE', 'CLI'],
    summary:
      '跨表面的设置入口：/debug-config 看层，--strict-config 把未知键当错误。IDE 扩展的 chatgpt.*（队列/转向、审查交付、WSL）写在编辑器里，不要塞进 config.toml。也说明网页 Work 不读本地配置。',
  },
  {
    title: 'Codex CLI 中的斜杠命令',
    url: 'https://developers.openai.ac.cn/codex/cli/slash-commands',
    source: 'OpenAI 中文文档',
    lang: '中文',
    kind: '官方',
    tags: ['斜杠命令', 'CLI'],
    summary:
      '官方斜杠命令指南的中文版，覆盖 /debug-config、/raw、/hooks、/usage。适合对照 Learn 英文 Developer commands 查命令，本机仍以 /help 为准。',
  },
  {
    title: 'CLI customization',
    url: 'https://learn.chatgpt.com/docs/cli-customization',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['TUI', '/theme', 'completion'],
    summary:
      'TUI 语法高亮用 /theme，写入 tui.theme；自定义 TextMate 主题放 $CODEX_HOME/themes。长提示走 Ctrl+G。shell 补全用 codex completion，zsh 若缺 compdef 先 compinit。',
  },
  {
    title: 'Environment variables',
    url: 'https://learn.chatgpt.com/docs/config-file/environment-variables',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['环境变量', 'CI', '密钥'],
    summary:
      '列出稳定公开环境变量。CODEX_HOME 必须先建好目录。CODEX_API_KEY 给 exec/review/SDK，仓库可控代码时按次注入。安装脚本用 CODEX_NON_INTERACTIVE=1。RUST_LOG 管 Rust 日志过滤。',
  },
  {
    title: 'Memories (ChatGPT Learn)',
    url: 'https://learn.chatgpt.com/docs/customization/memories',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Memories', '配置', '隐私'],
    summary:
      '本地记忆默认关。开 features.memories 后，use_memories 与 generate_memories 分开控制注入和沉淀。disable_on_external_context 把 MCP/网页搜索线程排除出生成。网页 Work 不走 ~/.codex/memories/。',
  },
  {
    title: 'Auto-review',
    url: 'https://learn.chatgpt.com/docs/sandboxing/auto-review',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['沙箱', '/approve', '安全'],
    summary:
      'Auto-review 只换谁来审已经需要批准的越界动作，不扩大沙箱。TUI 用 /approve 对最近拒绝做一次精确重试，重试仍走审查。approval never、full access 或 --yolo 会绕开这条路径。',
  },
  {
    title: 'Access tokens',
    url: 'https://learn.chatgpt.com/docs/enterprise/access-tokens',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['企业', 'CI', '密钥'],
    summary:
      'ChatGPT Business / Enterprise 的 Codex 访问令牌。创建令牌和 Codex Local 是两道开关。临时跑用 CODEX_ACCESS_TOKEN，要落盘再 login --with-access-token。不要拿它当 app-server 传输口令，也不要在公开 CI 或 fork PR 上用。',
  },
  {
    title: 'Rules',
    url: 'https://learn.chatgpt.com/docs/agent-configuration/rules',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['execpolicy', '沙箱', '安全'],
    summary:
      '出沙箱命令用 prefix_rule。forbidden 压过 prompt 再压过 allow。match / not_match 是加载时的内联测试。bash -lc 只有线性管道才会拆开分别套规则。改完用 codex execpolicy check 验证。',
  },
  {
    title: 'Pets',
    url: 'https://learn.chatgpt.com/docs/pets',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['TUI', '桌面', '/pets'],
    summary:
      '宠物只改外观，不改模型怎么干活。CLI 用 /pets，需要 iTerm2 3.6+ 或 Kitty/Sixel，tmux 和 Zellij 里没有。IDE 扩展没有入口。桌面自定义走 hatch-pet 技能，做完 Refresh 再选。',
  },
  {
    title: 'Slash commands',
    url: 'https://learn.chatgpt.com/docs/reference/slash-commands',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['斜杠命令', '桌面', '/ide-context'],
    summary:
      '桌面合成器斜杠表：/cloud-environment、/ide-context、/local、/worktree、/pet。/goal 先 /plan 再落成目标。技能也会出现在斜杠列表，自定义提示是 /prompts: 前缀。CLI 仍以 /help 为准。',
  },
  {
    title: 'Codex App Server',
    url: 'https://learn.chatgpt.com/docs/app-server',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['app-server', '远程', '协议'],
    summary:
      '给 IDE/自研客户端用的 JSON-RPC 接口，不是 CI 入口（CI 用 SDK）。本机 TUI 用 app-server --listen 再 --remote 连。WebSocket 默认未鉴权，远程必须 token 文件或 TLS。实验方法 tool/requestUserInput 一次问 1–3 个短问题。',
  },
  {
    title: 'Asynchronous TUI Questions in Codex CLI v0.154',
    url: 'https://codex.danielvaughan.com/2026/09/05/async-tui-questions-codex-cli-v0154-human-agent-collaboration/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['TUI', '0.154', '提问'],
    summary:
      '0.154 行内提问的交互细节：折叠计数、数字键选项、Other 自由文本、跳过、草稿不丢。CI 应拿掉这条交互通道。文中 disable_tools 键名作者自己标了要对照本机版本，不要当稳定 API 抄。',
  },
  {
    title: 'Computer Use',
    url: 'https://learn.chatgpt.com/docs/computer-use',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['桌面', 'Computer Use', 'Windows'],
    summary:
      '桌面 Work/Codex 装 Computer Use 插件后才能操 GUI。提示用 @Computer 或 @AppName。Windows 前台独占，白名单写 [computer_use.windows]。macOS 另需录屏/辅助功能，Locked use 只在锁屏后的受信回合短暂解锁。有 MCP 就别用它扒数据。',
  },
  {
    title: 'Feature Maturity',
    url: 'https://learn.chatgpt.com/docs/feature-maturity',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['实验', '配置', 'CLI'],
    summary:
      'Under development 不要用。Experimental 可能随时改或删。Beta 可试点。Stable 才当生产默认。Deprecated 只为兼容，新脚本别用。CLI 表里的成熟度列按这套读，实验开关仍用 /experimental 或 codex features。',
  },
  {
    title: 'Open Source',
    url: 'https://learn.chatgpt.com/docs/open-source',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['开源', 'CLI', 'SDK'],
    summary:
      'CLI、SDK、app-server、skills、plugins、codex-universal、Codex Security 在 GitHub。IDE 扩展和 Codex cloud 不开源。报 bug 用 openai/codex/issues，并写明组件和版本。',
  },
  {
    title: 'Codex GitHub Action',
    url: 'https://learn.chatgpt.com/docs/github-action',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['CI', 'GitHub Actions', 'exec'],
    summary:
      'openai/codex-action@v1 替你装 CLI、起 Responses 代理、按你给的权限跑 exec。prompt 和 prompt-file 只能选一个。默认 drop-sudo；Windows 必须 unsafe。final-message 给后续步骤。fork PR 正文不要当提示。',
  },
  {
    title: 'Use ChatGPT Work and Codex with Amazon Bedrock',
    url: 'https://learn.chatgpt.com/docs/amazon-bedrock',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Bedrock', '配置', '鉴权'],
    summary:
      '本地客户端把 model_provider 设成 amazon-bedrock，请求走 AWS Mantle，不经 OpenAI Responses。鉴权先 AWS_BEARER_TOKEN_BEDROCK，再 AWS SDK 链。桌面/IDE 写 ~/.codex/.env。Fast、Cloud、网页 Work 都不可用。',
  },
  {
    title: 'WSL',
    url: 'https://learn.chatgpt.com/docs/windows/wsl',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['WSL', 'Windows', 'CLI'],
    summary:
      '0.115 起只要 WSL2。在发行版里装 CLI，仓库放 ~/code，不要在 /mnt/c 上跑。Windows 资源管理器用 \\\\wsl$ 打开同一份文件。IDE 另开 chatgpt.runCodexInWindowsSubsystemForLinux。',
  },
  {
    title: 'Import from another agent',
    url: 'https://learn.chatgpt.com/docs/import',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['/import', '迁移', 'Skills'],
    summary:
      '桌面可从 Claude Code、Claude Cowork、Cursor 导入；CLI 只有前两者。CLI 最多迁最近 30 天 50 条聊天。任务中、远程会话、连着 app-server daemon 时没有 /import。迁完核对 MCP、钩子和权限。',
  },
  {
    title: 'Workload identity federation',
    url: 'https://learn.chatgpt.com/docs/enterprise/workload-identity',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['WIF', 'OIDC', '企业'],
    summary:
      '0.148+ beta。OPENAI_FEDERATION_RULE_ID 和 OPENAI_IDENTITY_TOKEN_FILE 必须成对。令牌文件用 deny_read 挡住模型。WIF 优先于 API key 和 auth.json。mcp-server 不支持。login/logout 会被拒。',
  },
  {
    title: 'Local environments',
    url: 'https://learn.chatgpt.com/docs/environments/local-environment',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['桌面', 'worktree', 'setup'],
    summary:
      '只给 ChatGPT 桌面应用的 Codex。setup 脚本在新建 worktree 时装依赖；Actions 出现在顶栏。配置写进项目根 .codex，可进 Git。平台相关命令按 macOS / Windows / Linux 分开写。',
  },
  {
    title: 'Image inputs',
    url: 'https://learn.chatgpt.com/docs/image-inputs',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['图片', 'CLI', '--image'],
    summary:
      'CLI 用 -i / --image 在第一条提示附上 PNG/JPEG。多图用逗号或重复旗标。IDE 按住 Shift 再拖进合成器。提示里要写清看哪、对比什么、完成标准，不要只丢图。',
  },
  {
    title: 'Codex IDE extension',
    url: 'https://learn.chatgpt.com/docs/codex/ide',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['IDE', '侧栏', 'Cloud'],
    summary:
      'VS Code / Cursor / Windsurf 用扩展；找不到图标就跑 Codex: Open Codex Sidebar。Xcode 和 JetBrains 在各自的助手里选 Codex。合成器带上打开的文件和选区，长任务可从同一聊天丢到 Cloud。',
  },
  {
    title: 'Codex cloud',
    url: 'https://learn.chatgpt.com/docs/cloud',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Cloud', 'GitLab', 'Slack'],
    summary:
      '隔离云环境并行跑任务。接 GitHub 或 GitLab（Beta），再配环境。可以从网页、GitHub、GitLab、Linear、Slack 开工，CLI 也能提交和 apply。',
  },
  {
    title: 'Codex SDK',
    url: 'https://learn.chatgpt.com/docs/codex-sdk',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['SDK', 'Python', 'CI'],
    summary:
      'TypeScript 装 @openai/codex-sdk；Python 装 openai-codex，用 Sandbox 预设按 turn 收紧权限。自研客户端走 app-server。codex mcp-server 已弃用。安全扫描另用 Codex Security SDK。',
  },
  {
    title: 'Subagents',
    url: 'https://learn.chatgpt.com/docs/agent-configuration/subagents',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['子代理', '/agent', 'AGENTS.md'],
    summary:
      '本地 Codex 在你开口，或 AGENTS.md / Skill 要求时才会委派。IDE 合成器上方能停掉子代理。探索用 gpt-5.6-terra，批准层按 o 打开来源线程。网页 Ultra 才可能主动拆。',
  },
  {
    title: 'Review GitLab merge requests with Codex',
    url: 'https://learn.chatgpt.com/docs/third-party/gitlab',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['GitLab', '@codex', 'Cloud'],
    summary:
      'Beta。评论 @codex review 发审查。GitLab.com 要项目环境和 webhook。自建实例用服务账号 PAT。组级活动只能审，改代码还要项目环境。桌面 Create PR 不在 beta 里。',
  },
  {
    title: 'Use Codex in Slack',
    url: 'https://learn.chatgpt.com/docs/third-party/slack',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Slack', '@Codex', 'Cloud'],
    summary:
      '频道或线程里 @Codex 开工。含糊时落到最近用过的环境，repo map 第一个仓库的默认分支。企业可禁止把答案贴回 Slack，只留聊天链接。',
  },
  {
    title: 'Use Codex in Linear',
    url: 'https://learn.chatgpt.com/docs/third-party/linear',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Linear', 'MCP', '@Codex'],
    summary:
      'Cloud 可指派 issue 或评论 @Codex。Triage 规则会用 issue 创建者的账号。本机 CLI 用 codex mcp add linear --url https://mcp.linear.app/mcp 再 login。',
  },
  {
    title: 'Codex Remote',
    url: 'https://learn.chatgpt.com/docs/remote',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Remote', '桌面', '手机'],
    summary:
      '用手机上的 ChatGPT 在已连接电脑上开、盯、批准 Codex 任务。配对从桌面 Settings > Connections 开始，不能从 CLI 配。电脑要醒着在线。',
  },
  {
    title: 'Remote connections',
    url: 'https://learn.chatgpt.com/docs/remote-connections',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Remote', 'SSH', '桌面'],
    summary:
      '手机或另一台桌面遥控本机 Codex。SSH 只发现 ~/.ssh/config 里的具体 Host 别名；远端 login shell 的 PATH 必须有 codex。Handoff 不能丢到 Cloud，也不要把 app-server 暴露到公网。',
  },
  {
    title: 'ChatGPT desktop app for Linux',
    url: 'https://learn.chatgpt.com/docs/linux/linux-app',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Linux', '桌面', '安装'],
    summary:
      '预览覆盖 Ubuntu 24.04/26.04、Debian 13、Fedora 43/44 的 x64 与 ARM64。用发行版包安装和升级。Computer Use 尚未提供。原生 Wayland 仍实验。',
  },
  {
    title: 'ChatGPT desktop app for Windows',
    url: 'https://learn.chatgpt.com/docs/windows/windows-app',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Windows', 'WSL', '桌面'],
    summary:
      'winget 可装商店包。代理默认走 PowerShell；改成 WSL 要重启。桌面用 %USERPROFILE%\\.codex，WSL CLI 默认不共用。Windows 原生代理不要从 \\\\wsl$ 开仓。',
  },
  {
    title: 'Scheduled tasks',
    url: 'https://learn.chatgpt.com/docs/automations',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['定时任务', 'Skills', '桌面'],
    summary:
      '节奏在网页或桌面的 Scheduled 里配，CLI / IDE 没有这套界面。事件触发（Gmail/Slack/GitHub）不能和时间表叠用。本机任务要电脑醒着。提示里可用 $skill-name。',
  },
  {
    title: 'Codex Security CLI quickstart',
    url: 'https://learn.chatgpt.com/docs/security/cli',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Codex Security', '扫描', 'CLI'],
    summary:
      'npx @openai/codex-security 扫你有权评估的仓库。结果目录放在仓外，先 --dry-run。可扫 diff / 工作区，或装 pre-commit hook。和编码用的 Codex CLI 不是同一个二进制。',
  },
  {
    title: 'Review GitHub pull requests with Codex',
    url: 'https://learn.chatgpt.com/docs/third-party/github',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['GitHub', '@codex', 'code review'],
    summary:
      '仓库接通 Cloud 并打开 Code review 后，评论写 @codex review 才会发审查。@codex security review 是更深的安全审查。@codex fix 会开 Cloud 聊天，可以往分支推修复。',
  },
  {
    title: 'Service accounts',
    url: 'https://learn.chatgpt.com/docs/enterprise/service-accounts',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['服务账号', '企业', 'CI'],
    summary:
      '按量计费工作区给 CI 建非人身份。令牌代表服务账号，不继承创建者插件。CLI 0.142+ 用 CODEX_ACCESS_TOKEN。临时 runner 不要 login 落盘。',
  },
  {
    title: 'Authentication',
    url: 'https://learn.chatgpt.com/docs/auth',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['login', 'device-auth', '企业'],
    summary:
      'ChatGPT 登录和 API key 决定额度与治理落在哪边。无头优先 --device-auth，回调被挡可转发 localhost:1455。企业 CA 用 CODEX_CA_CERTIFICATE。keyring 模式下没有可拷的 auth.json。直接跑 codex login 会在日志目录写 codex-login.log，不是 opt-in 的明文 TUI 日志。',
  },
  {
    title: 'awesome-codex-cli',
    url: 'https://github.com/RoggeOhta/awesome-codex-cli',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['清单', 'Skills', 'MCP'],
    summary:
      '社区整理的 Codex CLI 资源索引：官方文档、AGENTS.md 模板、技能、钩子、MCP、CI 示例。条目版本参差，动手前对照本机 changelog 和 /help。',
  },
  {
    title: 'Integrated terminal',
    url: 'https://learn.chatgpt.com/docs/integrated-terminal',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['桌面', '终端'],
    summary:
      '桌面聊天自带绑在当前项目或 worktree 的终端。Control+反引号打开，Ctrl+L 清屏，Cmd+K 是命令面板。模型能读终端输出。改默认 shell 只影响之后新开的会话。',
  },
  {
    title: 'Computer History',
    url: 'https://learn.chatgpt.com/docs/customization/computer-history',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Memories', '桌面', 'macOS'],
    summary:
      'macOS 桌面默认关闭。要 Memories，且不支持 API key / Bedrock。企业要管理员先开权限，个人再选择加入。时间线摘要在 ~/.codex/memories/extensions/skysight/。',
  },
  {
    title: 'Codex environments',
    url: 'https://learn.chatgpt.com/docs/environments/modes',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['worktree', 'Cloud', '桌面'],
    summary:
      '新聊天选 Local（改当前目录）、Worktree（隔离 Git 树）或 Cloud。Local 和 Worktree 都在你的电脑上跑。',
  },
  {
    title: 'Permission modes',
    url: 'https://learn.chatgpt.com/docs/permission-modes',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['permissions', '桌面', 'IDE'],
    summary:
      'Ask for approval 一直可用。Approve for me 和 Full access 要在 Settings > General 打开后才会进菜单。换谁来审越界请求，不会放大沙箱。',
  },
  {
    title: 'Prisma AIRS',
    url: 'https://learn.chatgpt.com/docs/enterprise/prisma-airs',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['企业', '安全', '护栏'],
    summary:
      '把 Codex 提示送到 Palo Alto Prisma AIRS。保存连接和 Enable 是两步。平台 API key 会话不扫。失败默认放行。',
  },
  {
    title: 'Site tools',
    url: 'https://learn.chatgpt.com/docs/webmcp',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['WebMCP', '浏览器', '桌面'],
    summary:
      '桌面内置浏览器里，网站用 WebMCP 提供页面级工具。Sol / Terra 可用，Luna 和 Enterprise / Edu 没有。跟 config.toml 的 MCP 不是同一套。',
  },
  {
    title: 'Run Codex Security in CI',
    url: 'https://learn.chatgpt.com/docs/security/cli/ci',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Codex Security', 'CI', 'SARIF'],
    summary:
      '在 checkout 外安装 @openai/codex-security，用绝对路径跑 diff 扫描。密钥映射成扫描进程的 OPENAI_API_KEY。--json 是一份完整文档，不是 exec 的 JSONL。',
  },
  {
    title: 'Codex 进阶用法：从对话助手到项目级智能协作者',
    url: 'https://goatyang.com/ai-practice/agents/chatgpt-codex/codex-advanced-usage.html',
    source: 'Goat_Yang',
    lang: '中文',
    kind: '教程',
    tags: ['AGENTS.md', 'Skills', 'Hooks'],
    summary:
      '中文把 Prompt、AGENTS.md、状态文档、Skill、MCP、子代理、Worktree、Hooks、Automations 拆开：长期规则进 AGENTS.md，重复流程进 Skill，必须发生的检查用 Hooks。',
  },
  {
    title: 'codex-howto',
    url: 'https://github.com/Phelan164/codex-howto',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', '工作流', '测量'],
    summary:
      '用 9 个工程技能走 scope → reproduce → implement → test → review → report。带 playground 和配对试验，用来比较「裸跑 Codex」和带技能的差异，而不是默认上更多子代理。',
  },
  {
    title: 'Recommended configuration',
    url: 'https://learn.chatgpt.com/docs/cyber-safety/recommended-configuration',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['permissions', 'network_proxy', '安全'],
    summary:
      '授权安全工作的推荐隔离：权限档不要和 sandbox_mode 混用；域名表要 network_proxy 才生效；解析到私网的主机还要 allow_local_binding 或精确 IP。Daybreak 在桌面可能自动切到 Approve for me。',
  },
  {
    title: 'Codex Git Worktree：并行开发、分支隔离与安全交接',
    url: 'https://news.qiniu.com/archives/1789006811477',
    source: '七牛云',
    lang: '中文',
    kind: '教程',
    tags: ['worktree', 'Handoff', '.worktreeinclude'],
    summary:
      '中文对照官方 Worktree：默认 detached HEAD、一项任务一个分支、Handoff 回 Local。.worktreeinclude 只拷 ignore 文件；setup 脚本才装依赖。永久 worktree 不会随聊天归档删掉。',
  },
  {
    title: 'ChatGPT & Codex changelog',
    url: 'https://learn.chatgpt.com/docs/changelog',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['changelog', 'CLI', '版本'],
    summary:
      'Learn 上的产品更新流，和 developers.openai.com/codex/changelog 互补。查 MCP 包名字符、output_token_limit、update_plan 默认关闭时先看这里，再对照本机 /help。',
  },
  {
    title: 'Configuration reference',
    url: 'https://learn.chatgpt.com/docs/config-file/config-reference',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '清单',
    tags: ['config.toml', 'MCP', 'Skills'],
    summary:
      'Learn 配置字典：approval_policy.granular、skills.config、features.skill_mcp_dependency_install、MCP OAuth 回调键。查键名用这一页，比博客转述更准。',
  },
  {
    title: 'Customization overview',
    url: 'https://learn.chatgpt.com/docs/customization/overview',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'MCP', 'AGENTS.md'],
    summary:
      '把 AGENTS.md、Memories、Skills、MCP 叠在一起。技能依赖 MCP 时写进 agents/openai.yaml，让 Codex 提示安装，而不是只在 SKILL.md 里口头点名。',
  },
  {
    title: 'Codex CLI Security Testing Tools',
    url: 'https://codex.danielvaughan.com/2026/05/21/codex-cli-security-testing-tools-sandbox-execpolicy-offline-policy-validation/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['sandbox', 'execpolicy', '安全'],
    summary:
      '离线验证权限：codex sandbox 用同一套 OS 沙箱跑命令，codex execpolicy check 给出 allow / prompt / forbidden。不启 agent、不花 token。旗标名以本机 --help 为准；它测的是边界，不是批准弹窗。',
  },
  {
    title: 'codex-rs/execpolicy README',
    url: 'https://github.com/openai/codex/blob/main/codex-rs/execpolicy/README.md',
    source: 'openai/codex',
    lang: '英文',
    kind: '仓库',
    tags: ['execpolicy', 'rules', 'CLI'],
    summary:
      '官方规则引擎说明：prefix_rule、host_executable、--resolve-host-executables。绝对路径默认不匹配 basename 规则。Learn 旗标表若还没写这个开关，以仓库 README 和本机 help 为准。',
  },
  {
    title: 'Async Hooks and MCP Tool Hooks in Codex CLI v0.148.0',
    url: 'https://codex.danielvaughan.com/2026/08/25/codex-cli-v0148-async-hooks-mcp-tool-hooks-background-execution-mcp-integration/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['Hooks', 'MCP', 'mcp_tool'],
    summary:
      '0.148 起钩子可 async 后台跑，并新增 mcp_tool handler：对已连接服务器直接调工具，input 支持事件占位。对照官方 Hooks 页：缺服务器不拦操作，SessionEnd 不支持 mcp_tool。',
  },
  {
    title: 'openai/codex docs/config.md',
    url: 'https://github.com/openai/codex/blob/main/docs/config.md',
    source: 'openai/codex',
    lang: '英文',
    kind: '仓库',
    tags: ['hooks', 'requirements.toml', '配置'],
    summary:
      '仓库配置说明强调：allow_managed_hooks_only 只在 requirements.toml 生效，写进普通 config.toml 开不了「只要托管钩子」。基础/进阶键仍以 Learn 配置页为准。',
  },
  {
    title: 'Hooks（中文文档）',
    url: 'https://developers.openai.ac.cn/codex/hooks',
    source: 'OpenAI 中文文档',
    lang: '中文',
    kind: '官方',
    tags: ['Hooks', 'PermissionRequest', 'MCP'],
    summary:
      '官方钩子页中文版：PermissionRequest 的 allow/deny、SubagentStart 的 continue:false 拦不住子代理、additionalContext 溢出到磁盘。对照 Learn 英文页和本机 /hooks。',
  },
  {
    title: 'Codex CLI Model Catalogue Architecture',
    url: 'https://codex.danielvaughan.com/2026/05/04/codex-cli-model-catalogue-architecture-providers-discovery-debug/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['模型', 'config.toml', 'debug'],
    summary:
      '模型列表三层：二进制内置、启动时远程刷新、model_catalog_json 本地覆盖。本地文件优先且会盖住前两层。排查用 codex debug models 与 --bundled，改完必须重启进程。',
  },
  {
    title: 'Codex CLI Using 30% CPU While Waiting? Disable TUI Animations',
    url: 'https://aident.ai/blog/fix-codex-cli-high-cpu-background-terminal',
    source: 'aident.ai',
    lang: '英文',
    kind: '教程',
    tags: ['TUI', 'animations', 'CLI'],
    summary:
      '空闲等待时 CPU 仍高，先把 tui.animations 设成 false 并新开会话对比。不要复制第二份 [tui] 表。标题仍跳就去掉 terminal_title 里的 spinner。',
  },
  {
    title: 'OpenTelemetry for Codex CLI',
    url: 'https://ivanfranjic.net/2026/05/10/opentelemetry-for-codex-cli/',
    source: 'Ivan Franjic',
    lang: '英文',
    kind: '教程',
    tags: ['otel', 'CLI', '配置'],
    summary:
      '本机 collector 示例：日志、追踪、指标三套 exporter 要分别写。默认不要开 log_user_prompt。对照官方配置参考：这些键只能放用户级 config.toml。',
  },
  {
    title: 'Codex CLI Observability: OpenTelemetry Traces, Metrics, and Production Monitoring',
    url: 'https://codex.danielvaughan.com/2026/04/20/codex-cli-observability-opentelemetry-traces-metrics-production-monitoring/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['otel', 'metrics', 'CLI'],
    summary:
      '拆开 logs / traces / metrics。OTLP/HTTP 的 endpoint 要带 /v1/logs 这类路径。metrics_exporter 默认 statsig，生产环境应显式改成 none 或自己的 collector。',
  },
  {
    title: 'Codex CLI v0.150.0 & v0.151.0: Interrupt Hooks',
    url: 'https://codex.danielvaughan.com/2026/09/02/codex-cli-v0150-v0151-interrupt-hooks-mcp-tool-result-extension-architecture/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['Hooks', 'Interrupt', 'CLI'],
    summary:
      '0.150 起 Esc / kill 打断顶层轮会跑 Interrupt。transcript 先 flush。默认 1 秒、上限 3 秒。对照 Learn：Stop 在打断路径上不会跑；on_mcp_tool_result 是 extension，不是 hooks.json。',
  },
  {
    title: '命令行选项（中文）',
    url: 'https://developers.openai.ac.cn/codex/cli/reference',
    source: 'OpenAI 中文文档',
    lang: '中文',
    kind: '官方',
    tags: ['CLI', 'TUI', 'alternate_screen'],
    summary:
      '中文 CLI 旗标表写明 --no-alt-screen 只覆盖本轮 tui.alternate_screen。对照配置参考：取值 auto / always / never。Zellij 旧 workaround 已撤，要滚动回放就显式 never。',
  },
  {
    title: 'Codex CLI v0.153.0: Context Management and Guardian History Fencing',
    url: 'https://codex.danielvaughan.com/2026/09/06/codex-cli-v0153-context-management-token-budget-guardian-history-fencing/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['auto_recap', '上下文', 'CLI'],
    summary:
      '0.153 把自动 recap 和手动 /recap 拆开：tui.auto_recap = false 只关自动摘要。experimental_mode 仍默认关，且只给符合条件的 ChatGPT 后端会话。对照 Learn changelog，不要把实验开关写进团队默认。',
  },
  {
    title: 'Codex CLI config.toml: Custom Model, API & Proxy Setup',
    url: 'https://ofox.ai/blog/codex-cli-config-toml-deep-dive/',
    source: 'ofox.ai',
    lang: '英文',
    kind: '教程',
    tags: ['config.toml', 'hide_agent_reasoning', 'history'],
    summary:
      '把 hide_agent_reasoning、history.persistence、analytics.enabled、project_root_markers 放进一份可抄样本。对照官方进阶配置：hide 只藏推理事件，不改变模型计算；空的 project_root_markers 会把 cwd 当成根。',
  },
  {
    title: 'OpenAI Codex CLI 速查表',
    url: 'https://oa0.com/g/codex-cli-cheatsheet',
    source: 'oa0.com',
    lang: '中文',
    kind: '清单',
    tags: ['速查', 'history.jsonl', 'CLI'],
    summary:
      '中文速查把 ↑↓ 历史标成跨会话仅文本，并写明 history.persistence 只管 ~/.codex/history.jsonl。对照官方进阶配置：max_bytes 裁这份文件；sessions/ 的 rollout 要另清。键名变动时仍回 Learn changelog。',
  },
  {
    title: '配置参考资料（中文）',
    url: 'https://learn.chatgpt.com/zh-Hans/docs/config-file/config-reference',
    source: 'ChatGPT Learn',
    lang: '中文',
    kind: '官方',
    tags: ['config.toml', 'model_verbosity', 'feedback'],
    summary:
      '官方配置字典的中文页。查 model_verbosity、model_instructions_file、feedback.enabled 时比博客转述准。对照英文进阶配置：verbosity 只对 Responses API 生效；instructions_file 替换内置指令而不是 AGENTS.md。',
  },
  {
    title: 'How to route Codex to a local model',
    url: 'https://www.simplified.guide/codex/local-model-routing',
    source: 'Simplified Guide',
    lang: '英文',
    kind: '教程',
    tags: ['--oss', 'oss_provider', 'Ollama'],
    summary:
      '用 --oss 加 --local-provider 做一次性本地路由，再用用户级 oss_provider 当默认。对照官方进阶配置：该键不选模型；项目 .codex/config.toml 不能改供应商。exec 两边都没设会直接退出。',
  },
  {
    title: 'Local large model API for Codex: Ollama, LM Studio and vLLM',
    url: 'https://knightli.com/en/2026/07/11/use-local-llm-api-with-codex-ollama-lm-studio-vllm/',
    source: 'knightli.com',
    lang: '英文',
    kind: '教程',
    tags: ['--oss', 'LM Studio', 'vLLM'],
    summary:
      '先走内置 --oss（Ollama / LM Studio），自建网关再用用户级 openai_base_url。强调只读任务验证、工具调用要实测，以及项目层写供应商会被忽略。不要把 vLLM 兼容接口误当成 OSS 模式。',
  },
  {
    title: '环境变量（中文）',
    url: 'https://learn.chatgpt.com/zh-Hans/docs/config-file/environment-variables',
    source: 'ChatGPT Learn',
    lang: '中文',
    kind: '官方',
    tags: ['环境变量', 'sqlite_home', 'CI'],
    summary:
      '官方环境变量中文页。CODEX_SQLITE_HOME 默认跟 CODEX_HOME，但 sqlite_home 配置优先；相对路径按当前工作目录解析，不是按家目录。对照英文页查 CODEX_API_KEY、CODEX_NON_INTERACTIVE 和 RUST_LOG。',
  },
  {
    title: 'Codex 正在悄悄写穿你的 SSD：完整排查与修复指南',
    url: 'https://segmentfault.com/a/1190000047943136',
    source: 'SegmentFault',
    lang: '中文',
    kind: '教程',
    tags: ['sqlite_home', '磁盘', '排错'],
    summary:
      '把 SQLite 状态库从默认 CODEX_HOME 迁走的排查笔记。对照官方：写 sqlite_home 绝对路径，或一次性 export CODEX_SQLITE_HOME；相对路径按 cwd。不要把它和 log_dir、history.jsonl 当成同一份文件。内存盘会丢可恢复状态。',
  },
  {
    title: 'Setup Codex CLI notifications on macOS (iTerm2 + terminal-notifier)',
    url: 'https://samwize.com/2026/02/05/setup-codex-cli-notifications-on-macos-iterm2-terminal-notifier/',
    source: 'samwize.com',
    lang: '英文',
    kind: '教程',
    tags: ['notify', 'TUI', 'macOS'],
    summary:
      '把 OSC 9 的 TUI 通知和顶层 notify 脚本拆开。对照官方进阶配置：notify 是根键，必须写在所有 [table] 之前；JSON 走 argv 而不是 stdin；项目 .codex 写了会被忽略。',
  },
  {
    title: 'Codex CLI Agent Notifications: Desktop Alerts, Audio Chimes, and Multi-Agent Monitoring',
    url: 'https://codex.danielvaughan.com/2026/04/10/codex-cli-agent-notifications-desktop-alerts-monitoring/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['notify', 'tui.notifications', 'CLI'],
    summary:
      '把 tui.notifications 的失焦提醒和顶层 notify 外部命令分开讲。对照 Learn：notify 目前只保证 agent-turn-complete；子代理结束和 cloud exec 不会打这条本地命令。',
  },
  {
    title: 'openai/codex rust-v0.154.0',
    url: 'https://github.com/openai/codex/releases/tag/rust-v0.154.0',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['0.154', 'resume', 'worktree'],
    summary:
      '0.154 稳定版说明：会话已被另一端打开时 resume 变只读并保留草稿；实验性 --worktree；codex mcp-server 入口已删。键名和旗标以本机 /help 为准。',
  },
  {
    title: 'openai/codex rust-v0.149.0',
    url: 'https://github.com/openai/codex/releases/tag/rust-v0.149.0',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['0.149', 'queue', 'agents'],
    summary:
      '0.149 稳定版说明：codex agents 任务面板、codex queue 给已有会话排队、/cd /pwd /cwd。queue 只适合交互会话；exec 线程可能丢掉已接受的消息。',
  },
  {
    title: 'OpenAI Codex Agents Dashboard and Codex Queue Tutorial',
    url: 'https://proflead.dev/posts/openai-codex-agents-dashboard-codex-queue/',
    source: 'proflead',
    lang: '英文',
    kind: '教程',
    tags: ['queue', 'agents', 'CLI'],
    summary:
      '对照 0.149：codex agents 看总览，/agents 从会话回去；queue 必须同时给 --thread 和 --message。人手用精确短名，脚本用 /status 里的 UUID。不要和 /agent 搞混。',
  },
  {
    title: 'codex queue and Inter-Session Messaging',
    url: 'https://codex.danielvaughan.com/2026/08/21/codex-queue-inter-session-messaging-codex-cli-v0149-orchestration-automation-agent-to-agent/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['queue', '会话', '自动化'],
    summary:
      '把 queue 当成跨终端投递，不是 Tab 排队。文中 --session 已过时，现行旗标是 --thread。空闲会唤醒，跑着就排到下一轮；没有回执通道，要结果就让会话写文件或提交。',
  },
  {
    title: 'Codex CLI Context Compaction: Architecture, Configuration, and Managing Long Sessions',
    url: 'https://codex.danielvaughan.com/2026/03/31/codex-cli-context-compaction-architecture/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['compact_prompt', '/compact', '上下文'],
    summary:
      '讲本地压缩路径可配 compact_prompt。对照 Issue：默认 OpenAI/Azure 走远程压缩，这两个键会被忽略。不要把它和 model_auto_compact_token_limit 当成同一件事。',
  },
  {
    title: 'Codex CLI Feature Flags and TUI Tuning',
    url: 'https://codex.danielvaughan.com/2026/03/28/codex-cli-feature-flags-tui-tuning/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['features', 'undo', 'TUI'],
    summary:
      '说明 undo 稳定但默认关。打开后 /undo 按整轮快照还原工作区，不回聊天，关会话就丢。要连上下文一起撤用 /fork。对照本机 features list。',
  },
  {
    title: 'openai/codex python-v0.154.0',
    url: 'https://github.com/openai/codex/releases/tag/python-v0.154.0',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['SDK', 'Python', '0.154'],
    summary:
      'Python SDK 0.154：run/turn 可带 ExternalMessage；resume/fork 可 include_turns。HookMetadata 改到 .root；自定义二进制需 CLI 0.151+。不是 CLI 0.155 稳定版。',
  },
  {
    title: 'Codex CLI Commit Attribution: Tagging Agent Work with commit_attribution',
    url: 'https://codex.danielvaughan.com/2026/03/28/codex-cli-commit-attribution/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['commit_attribution', 'git', 'features'],
    summary:
      '讲为什么要给 Codex 提交加共同作者。对照官方参考和源码：必须先开 features.codex_git_commit；commit_attribution 只写身份，运行时再拼 Co-authored-by。文中把完整 trailer 当键值的示例不要照抄。',
  },
  {
    title: 'exec: expose thread source in CLI and TypeScript SDK',
    url: 'https://github.com/openai/codex/pull/40155',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['exec', 'thread-source', 'SDK'],
    summary:
      '给 codex exec 和 TypeScript SDK 补上调用方来源。新建或 fork 可写 --thread-source；默认仍是 user。resume 保持磁盘上已保存的值。和 originator 覆盖是两套字段。',
  },
  {
    title: 'The Codex CLI Instruction Stack',
    url: 'https://codex.danielvaughan.com/2026/05/07/codex-cli-instruction-stack-six-surfaces-agents-md-rules-hooks-skills/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['developer_instructions', 'AGENTS.md', '指令'],
    summary:
      '拆六层指令面。对照官方参考：developer_instructions 是追加，model_instructions_file 才替换内置指令。仓库约定仍写 AGENTS.md。桌面自己开的线程可能不读 developer_instructions。',
  },
  {
    title: 'openai/codex rust-v0.152.0',
    url: 'https://github.com/openai/codex/releases/tag/rust-v0.152.0',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['update_plan', 'MCP', '0.152'],
    summary:
      '0.152 把规划工具改成默认关，打开用 tools.update_plan.enabled。同时给单个 MCP 工具加了 output_token_limit。不要把这次默认变化当成模型坏了。',
  },
  {
    title: 'What Context Does a Coding Agent Actually Need to Act?',
    url: 'https://codex.danielvaughan.com/2026/08/08/what-context-does-a-coding-agent-need-to-act-minimal-context-codex-cli-tool-output-token-limit-compaction/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['tool_output_token_limit', '上下文', 'config.toml'],
    summary:
      '把 tool_output_token_limit 当成最重要的上下文杠杆，建议定向修补用更紧的预算、探索再用更宽的 profile。文中 16000 默认不要当现行官方值；对照配置参考，这是进历史的预算，不是 MCP 单工具上限。',
  },
  {
    title: 'Manage app updates',
    url: 'https://learn.chatgpt.com/docs/enterprise/manage-app-updates',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['in_app_updates', '桌面', '企业'],
    summary:
      '企业关掉 ChatGPT 桌面应用内置更新：在托管 requirements.toml 写 features.in_app_updates = false，不要写进 config.toml。不管 CLI、IDE 扩展和手机。用户需完全退出再打开，设置里应显示 Managed。',
  },
  {
    title: 'The 2% Ceiling: How Codex CLI’s Skill Context Budget Works',
    url: 'https://codex.danielvaughan.com/2026/07/30/codex-cli-skill-context-budget-pressure-v0146-retention-truncation-profile-strategies/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['skills.max_context_tokens', 'Skills', '上下文'],
    summary:
      '讲技能目录为什么会被截断，以及用 [[skills.config]] 关掉不用的技能。文中「2% 写死」已过时：8 月 PR 加了 skills.max_context_tokens，显式值仍封顶 10000。选中技能后仍会读完整 SKILL.md。',
  },
  {
    title: 'Beyond the Prompt: Codex CLI Mastery',
    url: 'https://codex.danielvaughan.com/2026/05/29/codex-cli-mastery-beyond-the-prompt/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['AGENTS.md', 'Skills', 'exec'],
    summary:
      '强调目录布局、AGENTS.md、技能、子代理和 exec 比把提示写得更长更重要。对照当前官方路径：个人技能是 ~/.agents/skills，不是文中部分示例的 .codex/skills。以 2026 年 5 月的 v0.135 为底，动手前再核对本机 changelog。',
  },
  {
    title: 'Authentication',
    url: 'https://developers.openai.com/codex/auth',
    source: 'OpenAI Codex Docs',
    lang: '英文',
    kind: '官方',
    tags: ['cli_auth_credentials_store', 'login', 'keyring'],
    summary:
      '登录缓存可走 auth.json、系统钥匙串、auto 回退，或 ephemeral 只留当前进程内存。管理员可用本机 requirements 钉死存储和 chatgpt_base_url。无头机拷 auth.json 只适用于文件模式。不要和 codex exec --ephemeral 抄混。直接跑 codex login 会写 ~/.codex/log/codex-login.log；设了 log_dir 就跟过去。',
  },
  {
    title: 'The Codex CLI JavaScript REPL: Stateful Scripting Inside Your Agent Session',
    url: 'https://codex.danielvaughan.com/2026/04/08/codex-cli-javascript-repl-stateful-scripting/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['js_repl', 'features', '实验'],
    summary:
      '2026-04 教程讲如何打开 [features] js_repl。仓库 PR #19410 已移除该运行时；codex features list 会标 removed。桌面应用仍可能把 features.js_repl = false 写回 config.toml。不要再当现行功能去开。',
  },
  {
    title: 'Allow ChatGPT-hosted MCP servers to use session auth',
    url: 'https://github.com/openai/codex/pull/29733',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'auth', 'chatgpt'],
    summary:
      '给 ChatGPT 托管的 HTTP MCP 显式使用当前会话。不同源的服务器拿不到 ChatGPT access token。后来配置键从 use_chatgpt_auth 收成 auth = chatgpt | oauth。动手前对照本机配置参考。',
  },
  {
    title: 'Add oauth_resource handling for MCP login flows',
    url: 'https://github.com/openai/codex/pull/12866',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['oauth_resource', 'MCP', 'OAuth'],
    summary:
      '给 streamable HTTP 的 MCP 登录补上 RFC 8707 resource。可写在服务器表的 oauth_resource，或 codex mcp add --oauth-resource。stdio 运输不会附加这个参数。',
  },
  {
    title: 'chore(config) rm tools.view_image',
    url: 'https://github.com/openai/codex/pull/22501',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['view_image', '配置', '图片'],
    summary:
      '2026-05-13 起 tools.view_image 从配置里删掉，因为自 #8850 起它已经是 noop。配置参考和 sample 仍可能列出该键。给第一条提示附图用 -i / --image，不要再抄 tools.view_image = true。',
  },
  {
    title: "Unity's plugin for Codex",
    url: 'https://docs.unity.com/en-us/ai/unity-plugin/codex',
    source: 'Unity Docs',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Unity', 'Skills'],
    summary:
      'Unity 6 起给 Codex 的官方安装：先 marketplace add Unity-Technologies/unity-agent-plugin，再 plugin add unity@unity-agent-plugin。装完必须新开会话，合成器里输入 /unity: 才会出现技能。升级用 marketplace upgrade，卸载用 plugin remove。这不是 Package Manager 资源。',
  },
  {
    title: 'Unity-Technologies/unity-agent-plugin',
    url: 'https://github.com/Unity-Technologies/unity-agent-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Unity', 'Skills'],
    summary:
      '官方仓库写明 Codex 用 plugin marketplace add / plugin add，list 里应看到 unity@unity-agent-plugin 为 installed, enabled。这份插件只有技能，不带钩子和 MCP，不要指望它起 Unity 编辑器 RPC。社区旧帖把文件夹链到 ~/.codex/skills 或 ~/.claude/skills，现行 Codex 个人技能目录是 ~/.agents/skills，而且官方路径是 marketplace。',
  },
  {
    title: 'use scopes_supported for OAuth when present on MCP servers',
    url: 'https://github.com/openai/codex/pull/14419',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'OAuth', 'scopes'],
    summary:
      '合并后的源码顺序是：这次命令的 --scopes，然后 config 的 mcp_servers.NAME.scopes，再才是服务器广告的 scopes_supported，都没有就发空列表。广告值不会写回 config。Learn 的 MCP 页写成广告优先，和这条实现相反。改范围后要重新 mcp login。',
  },
  {
    title: 'Plugin management',
    url: 'https://learn.chatgpt.com/docs/enterprise/plugin-management',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', '企业', 'marketplace'],
    summary:
      '工作区管理员从 GitHub 导入 marketplace.json，默认每日同步。路径填含清单的目录，不要填文件名。GitHub 导入不套用仓库里的 INSTALLED_BY_DEFAULT 等策略，要在 Admin 里给每个插件设安装策略。带 mcp.json 的导入插件会标成 Desktop only，CLI / IDE 用不了。把已有工作区插件交给 GitHub 管，在条目里加 pluginId。',
  },
  {
    title: 'Codex CLI × MCP 开始 Raspberry Pi 温湿度监控（MiniViz MCP）',
    url: 'https://qiita.com/taiyyytai/items/c104ff37916a8177afe7',
    source: 'Qiita',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'CLI', 'OAuth'],
    summary:
      '日文可执行例子：codex mcp add miniviz --url … 再 mcp login。MiniViz MCP 只读已授权项目，不能替你往设备写数据。Pi 侧仍走 SSH。第三方服务，动手前对照本机 /mcp 和官方 MCP 页。',
  },
  {
    title: 'Codex CLI Shell Environment Policy',
    url: 'https://codex.danielvaughan.com/2026/04/28/codex-cli-shell-environment-policy-subprocess-secrets-defence/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['shell_environment_policy', '安全', 'PATH'],
    summary:
      '对照 inherit / set / filters 和 allow_login_shell。experimental_use_profile 会 source 用户 profile，可能把密钥和 PATH 改回去。现行官方默认 ignore_default_excludes = true；要自动过滤 KEY/SECRET/TOKEN 必须显式关掉。同一层不要混用 filters 和旧的 exclude。',
  },
  {
    title: 'Codex CLI Plugin Management from the Terminal',
    url: 'https://codex.danielvaughan.com/2026/06/04/codex-cli-plugin-management-terminal-commands-marketplace-json-output-v0137/',
    source: 'Codex Knowledge Base',
    lang: '英文',
    kind: '教程',
    tags: ['plugins', 'marketplace', 'CLI'],
    summary:
      '对照 marketplace add 的四种源：owner/repo、--ref 钉版本、HTTPS Git、本地目录。monorepo 用 --sparse 只检出插件路径。v0.137 起 add/list/upgrade 可加 --json。加完仍要 plugin add name@marketplace，并新开会话。',
  },
  {
    title: 'google/skills',
    url: 'https://github.com/google/skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Google Cloud', 'Skills'],
    summary:
      'Google 官方 Agent Skills 与插件仓。Codex 用 plugin marketplace add google/skills，marketplace 名是 google-plugins。google-cloud-developer 是本地路径插件，带 Developer Knowledge MCP。不要用 npx skills add 当 Codex 插件安装器。',
  },
  {
    title: 'Package your plugin',
    url: 'https://learn.chatgpt.com/plugins/build/plugins',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'marketplace', '企业'],
    summary:
      '官方打包页：新包用根目录 plugin.json（Agent Plugins schema）和带 type 的 mcp.json。$plugin-creator 仍脚手架 .codex-plugin 兼容布局，不要只把 .mcp.json 改名。兼容节仍可能把包装对象写成 mcp_servers，加载器认的是 mcpServers。extensions.com.openai 会整份替换 overlay。工作区 Publish 不上公共目录；CLI 分发仍走 marketplace。',
  },
  {
    title: 'plugin-creator marketplace JSON spec',
    url: 'https://github.com/openai/codex/blob/main/codex-rs/skills/src/assets/samples/plugin-creator/references/plugin-json-spec.md',
    source: 'openai/codex',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'marketplace', 'plugin.json'],
    summary:
      '内置 $plugin-creator 的清单样例。个人 marketplace 在 ~/.agents/plugins/marketplace.json，仓库清单在 .agents/plugins/marketplace.json。同一条 ./plugins/my-plugin 在个人清单解析到 ~/plugins/my-plugin，不是 ~/.agents/plugins 下面。每条都要有 policy.installation、policy.authentication 和 category。',
  },
  {
    title: 'Plugin submission errors',
    url: 'https://learn.chatgpt.com/plugins/deploy/submission-errors',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'plugin.json', '投稿'],
    summary:
      '公共目录投稿的错误码对照。ZIP 必须带 .codex-plugin/plugin.json、.agent-plugin/plugin.json 或 .claude-plugin/plugin.json 之一，只有根目录 plugin.json 会报 plugin_manifest_missing。根上的 .mcp.json 只有清单把 mcpServers 指到 ./.mcp.json 才会导入。技能-only 包不能夹带 MCP。',
  },
  {
    title: 'Agent Plugins 1.0 开发教程：Skills＋MCP 跨 Codex、Copilot、VS Code',
    url: 'https://aistacknav.com/agent-plugins-1-0-skills-mcp-codex-copilot-vscode/',
    source: 'AI Stack Nav',
    lang: '中文',
    kind: '教程',
    tags: ['plugins', 'plugin.json', 'MCP'],
    summary:
      '中文对照：可移植核心是根目录 plugin.json、skills/、mcp.json；钩子和分发仍是各客户端自己的层。Codex / ChatGPT 公共目录还要保留 .codex-plugin overlay。IDE 扩展没有插件目录。不要把密钥写进 mcp.json，也不要把 mcpServers 塞进顶层 plugin.json。',
  },
  {
    title: 'Plugin controls (apps and connectors)',
    url: 'https://learn.chatgpt.com/docs/enterprise/apps-and-connectors',
    source: 'ChatGPT Learn',
    lang: '英文',
    kind: '官方',
    tags: ['连接器', 'plugins', '企业'],
    summary:
      '工作区里插件能不能装、连接器能不能用、连接器能做哪些动作，是三层控制。CLI 用户 config 的 [apps._default] 只管本机工具审批和 destructive / open_world 提示，盖不了工作区关掉的连接器。插件捆里若带了连接器，仍要在 Workspace apps 里授权。',
  },
  {
    title: 'Codex 插件开发实战：从 plugin.json 到公共市场',
    url: 'https://news.qiniu.com/archives/1786326734143',
    source: '七牛云',
    lang: '中文',
    kind: '教程',
    tags: ['plugins', 'plugin.json', 'marketplace'],
    summary:
      '中文对照 $plugin-creator、三种 marketplace 和 PLUGIN_ROOT 钩子。例子仍是 .codex-plugin 兼容布局；现行可移植包要把身份放在根目录 plugin.json。文中 .mcp.json 示例用的是 mcpServers，不要改回官方兼容节里的 mcp_servers。基于 0.117 前后的文档，字段以 Learn 现行页为准。',
  },
  {
    title: 'Codex 插件全解：官方目录 75 个插件按 11 大类',
    url: 'https://news.qiniu.com/archives/1789094413719',
    source: '七牛云',
    lang: '中文',
    kind: '教程',
    tags: ['plugins', '目录', '桌面'],
    summary:
      '按官方目录分类介绍到 2026-09 的 75 个插件。安装后要新开会话；CLI 用 /plugins，桌面有插件页，IDE 扩展没有插件目录。带 MCP 的 Admin 导入插件仍是 Desktop only。具体字段和 mcp.json 包装键以 Learn 现行页为准，不要只按文中的兼容布局抄。',
  },
  {
    title: 'How to Build a Controlled MCP Workflow for Codex and Oracle AI Database',
    url: 'https://blogs.oracle.com/developers/how-to-build-a-controlled-mcp-workflow-for-codex-and-oracle-ai-database',
    source: 'Oracle Developers',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'Oracle', 'SQLcl'],
    summary:
      'Oracle 官方把 Codex CLI 接到 SQLcl MCP：先用 conn -save -savepwd 把连接存进 ~/.dbtools，再让 Codex 用绝对路径启动 sql -mcp。密码不要写进 config.toml。后半讲的 Agent Memory 和 LangChain 是应用层，不是 Codex 配置。DEV.to 同文转载。',
  },
  {
    title: 'Codex MCP Not Working? Every Windows Fix (2026)',
    url: 'https://mcp.directory/blog/codex-mcp-windows-fix-guide-2026',
    source: 'MCP Directory',
    lang: '英文',
    kind: '清单',
    tags: ['MCP', 'Windows', '排错'],
    summary:
      '按报错拆 Windows 上 Codex MCP：program not found、TOML 路径转义、超时、项目层配置被桌面忽略、SSE 与 streamable HTTP。0.154 起裸 npx 通常能解析 .cmd，路径仍要用单引号或正斜杠。对照本机 /help，不要把 cmd /c 包装抄进 WSL。',
  },
  {
    title: 'The 10 Best MCP Servers for OpenAI Codex in 2026',
    url: 'https://brightdata.com/blog/ai/best-mcp-servers-for-codex',
    source: 'Bright Data',
    lang: '英文',
    kind: '清单',
    tags: ['MCP', 'startup_timeout_sec', '清单'],
    summary:
      '真正有用的是开头那两行默认值：启动 10 秒、工具调用 60 秒。冷 npx / uvx 超时后会话会 aggregating 0 tools，看起来像没装。先把 startup_timeout_sec 提到 30–60，用 /mcp 一台一台确认。后半的服务器推荐按本机需求筛选，不要整表抄进 config.toml。',
  },
  {
    title: 'Codex CLI MCP: Setup + Best Servers (2026)',
    url: 'https://www.tembo.io/blog/codex-cli-mcp',
    source: 'Tembo',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'config.toml', '超时'],
    summary:
      '从 codex mcp add 讲到 TOML：stdio 用 command，远程用 url。把 startup_timeout_sec 和 tool_timeout_sec 拆开，并提醒项目层配置会盖用户层。远程登录仍要 mcp login；npx -y 每次拉最新包，团队配置应钉版本。',
  },
  {
    title: 'Codex MCP Servers: Config, Transports, and What Works',
    url: 'https://www.usecarly.com/blog/codex-mcp-servers/',
    source: 'Use Carly',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'env_vars', 'stdio'],
    summary:
      '强调 Codex 用 command 或 url 隐式选传输，两套键不能同时写。stdio 的 env 是字面量，env_vars 才从启动进程转发密钥。远程走 Streamable HTTP，不要先套 mcp-remote。具体超时和 OAuth 步骤以 Learn 现行页为准。',
  },
  {
    title: 'Codex CLI MCP: How OpenAI Codex Connects to Tools',
    url: 'https://www.verdent.ai/guides/codex-cli-mcp-setup-guide',
    source: 'Verdent Guides',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'bearer_token_env_var', 'config.toml'],
    summary:
      '把 Streamable HTTP 和 stdio 拆开写：远程用 url，密钥写环境变量名而不是 token 本身。强调 Codex 启动时变量必须已经在进程里，事后在另一个终端 export 没用。stdio 的 env 表是额外字面量，不会自动继承整份 shell。排错先查启动环境，再查 PATH 和 startup_timeout_sec。',
  },
  {
    title: 'Install GitHub MCP Server in OpenAI Codex',
    url: 'https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-codex.md',
    source: 'github/github-mcp-server',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'GitHub', 'bearer_token_env_var'],
    summary:
      'GitHub 官方把托管 MCP 接到 Codex：url 用 https://api.githubcopilot.com/mcp/，再写 bearer_token_env_var。CLI add 必须带 --bearer-token-env-var，否则配置没有鉴权。Codex 不自动读 .env，变量要进启动进程。这不是 Cloud 上的 @codex review。',
  },
  {
    title: 'Set up the remote Figma MCP server (Codex)',
    url: 'https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/',
    source: 'Figma Developers',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Figma', 'OAuth'],
    summary:
      'Figma 给 Codex 的官方远程安装：桌面应用走插件 Install Figma；CLI 用 codex mcp add figma --url https://mcp.figma.com/mcp，随后 OAuth。不要抄 Claude 的 claude mcp add。本地桌面 MCP 是另一条企业路径。',
  },
  {
    title: 'Codex and Figma: Set up the MCP server',
    url: 'https://help.figma.com/hc/en-us/articles/39888629089175-Codex-and-Figma-Set-up-the-MCP-server',
    source: 'Figma Help',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Figma', '桌面'],
    summary:
      '帮助中心把远程 MCP 写成首选。本地桌面服务要先在 Figma 桌面 Dev Mode 打开，再在 Codex 里加 Streamable HTTP，地址 http://127.0.0.1:3845/mcp。管理员关掉第三方插件时，工具会看不见。',
  },
  {
    title: 'Get started with Chrome DevTools for agents',
    url: 'https://developer.chrome.com/docs/devtools/agents/get-started',
    source: 'Chrome for Developers',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Chrome', 'stdio'],
    summary:
      '官方给 Codex 的安装是 codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest。要 Node LTS 和 Chrome 稳定版。这是 stdio，不是 Learn 示例里的 localhost HTTP。测通提示是检查 developers.chrome.com 的性能。不要抄 Claude 的 mcpServers JSON。',
  },
  {
    title: 'ChromeDevTools/chrome-devtools-mcp',
    url: 'https://github.com/ChromeDevTools/chrome-devtools-mcp',
    source: 'ChromeDevTools',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Chrome', 'stdio'],
    summary:
      'stdio 包 chrome-devtools-mcp。只连上 MCP 不会自动开浏览器。沙箱用 --headless / --isolated。Windows 11 文档才写 cmd /c npx 包装，不要抄进 WSL。现行 Codex 超时键是 startup_timeout_sec。默认会打 Google 用量统计，可 --no-usage-statistics。',
  },
  {
    title: 'How to add Chrome DevTools MCP server to Codex',
    url: 'https://www.simplified.guide/codex/chrome-devtools-mcp-server-add',
    source: 'Simplified Guide',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'Chrome', 'codex mcp add'],
    summary:
      '按 Codex 的 add / get --json / list 核对：传输必须是 stdio，命令是 npx。建议带 -y，避免首次 npx 交互卡住启动。包参数写在包名后面。已经打开的会话要重启才加载。',
  },
  {
    title: 'Other Clients',
    url: 'https://playwright.dev/mcp/clients/other-clients',
    source: 'Playwright',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Playwright', 'stdio'],
    summary:
      '官方给 Codex 的安装是 codex mcp add playwright，命令用 npx，包名 @playwright/mcp@latest。文档示例省略了 --；Codex 习惯把 npx 写在 -- 后面。配置进 ~/.codex/config.toml 的 [mcp_servers.playwright]，不要贴 Claude 的 mcpServers JSON。',
  },
  {
    title: 'microsoft/playwright-mcp',
    url: 'https://github.com/microsoft/playwright-mcp',
    source: 'microsoft/playwright-mcp',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Playwright', 'stdio'],
    summary:
      'stdio 包 @playwright/mcp。默认可视窗口；沙箱加 --headless / --isolated。--extension 要先装浏览器扩展。工具表里的 browser_run_code_unsafe 标注为 RCE-equivalent。远程另开 --port 时走 /mcp，不要抄 /sse。',
  },
  {
    title: 'Playwright MCP：让 Claude、Codex、Cursor 控制浏览器',
    url: 'https://eastondev.com/blog/zh/posts/ai/20260904-playwright-mcp-browser-automation-claude-codex-cursor/',
    source: 'Easton',
    lang: '中文',
    kind: '教程',
    tags: ['MCP', 'Playwright', 'disabled_tools'],
    summary:
      '中文把三种客户端的官方包名写清楚，并标出 browser_run_code_unsafe 的风险。Codex 示例里的服务器级 approval_mode 不是现行键，应写成 default_tools_approval_mode，或用 disabled_tools 直接关掉。安装仍以 Playwright 给 Codex 的 stdio 示例为准。',
  },
  {
    title: 'Installation',
    url: 'https://playwright.dev/agent-cli/installation',
    source: 'Playwright',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Playwright', 'playwright-cli'],
    summary:
      '官方 playwright-cli 安装。无参数的 install --skills 默认等于 --skills=claude，会写进 .claude/skills。Codex 要仓库技能必须加 --skills=agents；-g 才进 ~/.agents/skills。没有 --skills=codex。浏览器可另外 install-browser。',
  },
  {
    title: 'Skills',
    url: 'https://playwright.dev/agent-cli/skills',
    source: 'Playwright',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Playwright', 'playwright-cli'],
    summary:
      'Playwright 自己的技能教代理怎么用 playwright-cli：snapshot、mock、trace、storage state。也可以不装技能，只让代理读 playwright-cli --help。这和 Codex 精选技能 $skill-installer playwright 是两条安装通道。',
  },
  {
    title: 'Using Context7 with OpenAI Codex',
    url: 'https://context7.com/docs/clients/codex',
    source: 'Context7',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'Context7', 'stdio'],
    summary:
      '厂商 Codex 页。Learn 免费入门不强制 API key。页上的 --api-key、startup_timeout_ms、字面量 http_headers 不要抄进 Codex：密钥用 env_vars 或 bearer_token_env_var，超时用 startup_timeout_sec。npx ctx7 setup --codex 还会改 AGENTS.md。网页 Cloud 不读 ~/.codex/config.toml。',
  },
  {
    title: 'upstash/context7',
    url: 'https://github.com/upstash/context7',
    source: 'upstash/context7',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Context7', 'stdio'],
    summary:
      'Context7 文档检索 MCP 的仓库。Codex 用 stdio 包 @upstash/context7-mcp，远程入口是 https://mcp.context7.com/mcp。不要把 Claude 的 mcpServers JSON 或密钥写进 args。',
  },
  {
    title: 'Connect to Notion MCP',
    url: 'https://developers.notion.com/guides/mcp/get-started-with-mcp',
    source: 'Notion Developers',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Notion', 'OAuth'],
    summary:
      '官方 Codex 节：写 ~/.codex/config.toml 的 [mcp_servers.notion]，url 用 https://mcp.notion.com/mcp，再 codex mcp login notion。目前必须交互 OAuth，没有 PAT 静默登录。项目层同名表只共享 url，每人仍要自己 login。不要抄 /sse 或停更的开源包。',
  },
  {
    title: 'How to Set Up the Notion MCP Server with OpenAI Codex',
    url: 'https://www.flowdevs.io/blog/post/how-to-set-up-the-notion-mcp-server-with-openai-codex',
    source: 'FlowDevs',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'Notion', 'codex mcp add'],
    summary:
      '把 Claude 的 --transport http 换成 Codex 的 mcp add notion --url。认证用 codex mcp login notion；TUI 里 /mcp 是查看工具，不是唯一登录入口。不要再加 experimental_use_rmcp_client。',
  },
  {
    title: 'Connecting the Slack MCP server to agent harnesses',
    url: 'https://docs.slack.dev/ai/slack-mcp-server/connect-to-harnesses',
    source: 'Slack',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Slack', 'OAuth'],
    summary:
      '官方有 Codex 节，但那行 --transport http 是 Claude 语法。Codex 应写成 mcp add slack --url https://mcp.slack.com/mcp，并带 --oauth-client-id。Slack 不支持 DCR。这和 Cloud 频道 @Codex 不是同一条路。',
  },
  {
    title: 'Sentry MCP Server',
    url: 'https://docs.sentry.io/product/sentry-mcp/',
    source: 'Sentry',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Sentry', 'OAuth'],
    summary:
      '官方托管地址是 https://mcp.sentry.dev/mcp，可接到 org 或项目。所有连接走 OAuth。页面只示范 Claude --transport http 和 Cursor JSON。Codex 用 mcp add sentry --url 再 mcp login。不要把花括号占位原样写进 TOML。',
  },
  {
    title: 'How to Connect Codex to Sentry (and What It Can\'t Do)',
    url: 'https://www.usecarly.com/blog/codex-sentry-integration/',
    source: 'Use Carly',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'Sentry', 'codex mcp add'],
    summary:
      '给出 Codex 命令 mcp add sentry --url。现行构建直接连 HTTP，不要再套 mcp-remote。它只在会话里拉取，不是值班告警。错误正文可能带提示注入，批准别关。后半是产品推销，安装步骤以官方 MCP 页为准。',
  },
  {
    title: 'Getting started with the Atlassian Rovo MCP Server',
    url: 'https://developer.atlassian.com/cloud/rovo-mcp/guides/getting-started/',
    source: 'Atlassian',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Atlassian', 'OAuth'],
    summary:
      '2026-09-02 入门页把客户端指到 https://mcp.atlassian.com/v2/mcp。桌面走插件 Atlassian Rovo。CLI 用 mcp add --url 再 login。网关要完整工具表才加 tools=all。不要抄已停的 /sse，也不要把 5 月的 authv2 过渡地址当现行唯一入口。',
  },
  {
    title: 'Model Context Protocol (MCP)',
    url: 'https://docs.stripe.com/mcp',
    source: 'Stripe',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Stripe', 'OAuth'],
    summary:
      '官方 Codex CLI 节：url 用 https://mcp.stripe.com（没有 /mcp 后缀），再 mcp login stripe。受限密钥走 bearer_token_env_var，键里是变量名 STRIPE_API_KEY。Connect 平台不能用 OAuth 代 connected account，改走平台密钥加 Stripe-Account。不要抄 Claude 的 --transport http，也不要把 sk_live 写进 TOML。',
  },
  {
    title: 'Docs MCP',
    url: 'https://developers.openai.com/learn/docs-mcp',
    source: 'OpenAI Developers',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', '文档', 'openaiDeveloperDocs'],
    summary:
      '官方 Codex 命令是 mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp。覆盖 developers.openai.com、platform.openai.com、learn.chatgpt.com。只读文档，不会代调 API。AGENTS.md 那句是可选提醒。这不是桌面浏览器里的 WebMCP。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'Codex + Cloudflare',
    url: 'https://developers.cloudflare.com/agent-setup/codex/',
    source: 'Cloudflare',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Cloudflare', 'plugins'],
    summary:
      '官方 Codex 页：/plugins 装 Cloudflare，或排错用 mcp add cloudflare --url https://mcp.cloudflare.com/mcp。厂商 Code Mode 是这台 API MCP 的搜-执行，不要写成 Codex 的 features.code_mode。文档过时另加 docs.mcp.cloudflare.com/mcp。',
  },
  {
    title: 'cloudflare/skills',
    url: 'https://github.com/cloudflare/skills',
    source: 'cloudflare/skills',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Cloudflare', 'Skills'],
    summary:
      'Codex 命令是 plugin marketplace add cloudflare/skills，再 plugin add cloudflare@cloudflare。插件会装 Skills 并登记主 MCP。不要用 npx skills add 当安装器，也不要只把 SKILL.md 拷进 ~/.codex/skills。Claude 的 /plugin install 不要抄。',
  },
  {
    title: 'Hugging Face MCP Server',
    url: 'https://huggingface.co/docs/hub/en/agents-mcp',
    source: 'Hugging Face',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Hugging Face', 'hf_fs'],
    summary:
      '官方入口是 https://huggingface.co/mcp。设置页 huggingface.co/settings/mcp 勾工具和 Spaces。Codex 用 mcp add huggingface --url 再 mcp login；token 走 bearer_token_env_var = HF_TOKEN。不要把 Bearer 抄进 http_headers。这不是 Inference Providers 的 model_providers。内置工具 hf_fs 用来逛 Hub。',
  },
  {
    title: 'How to connect Amplitude MCP to Codex CLI',
    url: 'https://amplitude.com/docs/amplitude-ai/amplitude-mcp/codex-cli',
    source: 'Amplitude',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Amplitude', 'OAuth'],
    summary:
      '官方 Codex 命令是 mcp add amplitude --url https://mcp.amplitude.com/mcp，然后 OAuth。EU 用 mcp.eu.amplitude.com/mcp 再 add 一次覆盖同名表。权限跟登录账号走。不是埋点摄入，也不是只读文档 MCP。',
  },
  {
    title: 'Set Up the Datadog MCP Server',
    url: 'https://docs.datadoghq.com/mcp_server/setup/',
    source: 'Datadog',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Datadog', 'OAuth'],
    summary:
      'Codex 页写 ~/.codex/config.toml 的 [mcp_servers.datadog]，US1 现行是 https://mcp.datadoghq.com/v1/mcp，然后 mcp login datadog。工具集用 http_headers 里的 X-Datadog-MCP-Toolsets，不要把 ?toolsets= 拼进 URL。GovCloud 没有这台服务。',
  },
  {
    title: 'Codex · Hugging Face Inference Providers',
    url: 'https://huggingface.co/docs/inference-providers/en/integrations/codex',
    source: 'Hugging Face',
    lang: '英文',
    kind: '官方',
    tags: ['model_providers', 'Hugging Face', 'wire_api'],
    summary:
      '用户 config 写 [model_providers.huggingface]，base_url 是 https://router.huggingface.co/v1，env_key = HF_TOKEN，wire_api = responses。Profile 是 ~/.codex/huggingface.config.toml，用 --profile huggingface。这不是 Hub MCP，项目层也改不了供应商。',
  },
  {
    title: 'Codex CLI · Grafana MCP',
    url: 'https://grafana.com/docs/grafana/latest/developer-resources/mcp/clients/codex/',
    source: 'Grafana',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Grafana', 'stdio'],
    summary:
      '官方 Codex 页是本机 mcp-grafana。Codex 把 GRAFANA_URL 写进 env 表可以；GRAFANA_SERVICE_ACCOUNT_TOKEN 要用 env_vars 转发，不要把 token 抄进 env。startup_timeout_ms 改成 startup_timeout_sec。只读加 --disable-write。',
  },
  {
    title: 'Grafana Cloud MCP server',
    url: 'https://grafana.com/docs/grafana-cloud/ai-tools/mcp-servers/cloud-mcp/',
    source: 'Grafana Cloud',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Grafana', 'OAuth'],
    summary:
      '托管入口是 https://mcp.grafana.com/mcp，OAuth，只要 Grafana Cloud。页面没有 Codex 专页。Codex 用 mcp add grafana_cloud --url。login 若 302 到文档，http_headers 写 Accept 和 X-Grafana-URL。这不是本机 uvx mcp-grafana。',
  },
  {
    title: 'Use Vercel',
    url: 'https://vercel.com/docs/agent-resources/vercel-mcp',
    source: 'Vercel',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Vercel', 'OAuth'],
    summary:
      '官方 Codex 节是 mcp add vercel --url https://mcp.vercel.com（没有 /mcp 后缀），add 时会探测 OAuth。npx add-mcp 会改所有检测到的 agent，不要当 Codex 主路径。vercel mcp CLI 的客户端名单没有 Codex。不要抄 Gemini 的 npx mcp-remote 或 Claude 的 --transport http。',
  },
  {
    title: 'Supabase MCP Server',
    url: 'https://supabase.com/docs/guides/ai-tools/mcp',
    source: 'Supabase',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Supabase', 'OAuth'],
    summary:
      '官方 Codex 节是 mcp add supabase --url https://mcp.supabase.com/mcp，再 mcp login supabase。查询参数 ?read_only=true、?project_ref=abc123、?features=database,docs 写进 url。托管走 OAuth DCR，不要 PAT 当主路径。CI 才用 bearer_token_env_var。不要抄 experimental_use_rmcp_client。',
  },
  {
    title: 'OpenAI Codex with AI Gateway',
    url: 'https://vercel.com/docs/ai-gateway/coding-agents/openai-codex',
    source: 'Vercel AI Gateway',
    lang: '英文',
    kind: '官方',
    tags: ['model_providers', 'Vercel', 'wire_api'],
    summary:
      'Codex 兼容入口是 https://ai-gateway.vercel.sh/codex/v1，env_key = AI_GATEWAY_API_KEY，wire_api = responses。一键是 vercel ai-gateway coding-agents setup --agent codex。0.134 起不要写 [profiles.vercel]，改用 ~/.codex/vercel.config.toml。这不是 Vercel MCP，也不是 --oss。',
  },
  {
    title: 'Set up Codex for Netlify',
    url: 'https://docs.netlify.com/build/build-with-ai/agent-setup-guides/set-up-codex-for-netlify/',
    source: 'Netlify',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Netlify', 'OAuth'],
    summary:
      '官方推荐 codex mcp add netlify --url https://netlify-mcp.netlify.app/mcp。远程被拦再改 npx @netlify/mcp。npx add-mcp 会改所有检测到的 agent，不要当 Codex 主路径。技能安装必须带 --agent codex。',
  },
  {
    title: 'PostHog MCP for Codex',
    url: 'https://posthog.com/docs/model-context-protocol/codex',
    source: 'PostHog',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'PostHog', 'OAuth'],
    summary:
      '官方 Codex 节是 mcp add posthog --url https://mcp.posthog.com/mcp。账号自动走美区或欧盟。Codex 默认 CLI 模式，可用 ?mode=tools。只读用 ?readonly=true。不要把 npx @posthog/wizard mcp add 当 Codex 主路径。插件是 marketplace add PostHog/ai-plugin。',
  },
  {
    title: 'Using Prisma with Codex',
    url: 'https://www.prisma.io/docs/ai/tools/codex',
    source: 'Prisma',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Prisma', 'plugins'],
    summary:
      '官方远程是 https://mcp.prisma.io/mcp。Codex 用 mcp add prisma --url 再 mcp login。插件是 marketplace add prisma/codex-plugin，不要抄页上的 mcpServers JSON。这不是 Prisma AIRS。破坏性 migrate reset 仍要人同意。',
  },
  {
    title: 'Neon MCP Server overview',
    url: 'https://neon.com/docs/ai/neon-mcp-server',
    source: 'Neon',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Neon', 'OAuth'],
    summary:
      '官方远程是 https://mcp.neon.tech/mcp。Codex 用 mcp add neon --url 再 mcp login。钉项目用 ?projectId=prj_abc123。不要抄已弃用的 /sse（2026-10-01 起 410 Gone），也不要装 @neondatabase/mcp-server-neon。npx add-mcp 会改所有 agent，不要当 Codex 主路径。CI 才用 bearer_token_env_var = NEON_API_KEY。',
  },
  {
    title: 'PlanetScale Model Context Protocol',
    url: 'https://planetscale.com/docs/connect/mcp',
    source: 'PlanetScale',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'PlanetScale', 'OAuth'],
    summary:
      '官方 Codex 节是 mcp add planetscale --url https://mcp.pscale.dev/mcp/planetscale。add 后应弹出 OAuth。只要 Insights 换 planetscale-insights-only。CI 用 PLANETSCALE_API_TOKEN，值是 pscale_tkn_ 密钥本身，不要 REST API 的 id:secret。本地 pscale mcp 已删除。',
  },
  {
    title: 'Codex CLI guide (Snyk Studio)',
    url: 'https://docs.snyk.io/agent-security/agentic-security-with-snyk-studio/quickstart-guides/codex-cli-guide',
    source: 'Snyk',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Snyk', 'stdio'],
    summary:
      'Codex 默认走 Snyk Studio 安装器，必须带 --ade codex。只要 MCP 时表名是 snyk-security，命令是 npx snyk@latest mcp -t stdio。没有托管远程。SNYK_TOKEN 用 env_vars，SNYK_MCP_PROFILE 才写 env 表。不要抄 mcpServers JSON。',
  },
  {
    title: 'Getting started with Codex and CircleCI',
    url: 'https://circleci.com/blog/getting-started-with-codex-and-circleci/',
    source: 'CircleCI',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'CircleCI', 'plugins'],
    summary:
      'Codex 主路径是 /plugins 装 CircleCI，并先 circleci auth login。托管 MCP 才是 mcp.circleci.com/v1/mcp。不要装已弃用的 @circleci/mcp-server-circleci。circleci mcp enable 列表没有 Codex。不要和 Circle 支付 MCP 搞混。',
  },
  {
    title: 'MCP Web Search & Scrape in Codex CLI',
    url: 'https://docs.firecrawl.dev/quickstarts/codex-cli',
    source: 'Firecrawl',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Firecrawl', 'OAuth'],
    summary:
      '官方 Codex 节是 mcp add firecrawl --url https://mcp.firecrawl.dev/v2/mcp-oauth，再 mcp login。URL 是客户端配置，不要当网页打开。无账号走 /v2/mcp；CI 才 bearer_token_env_var = FIRECRAWL_API_KEY。本地 stdio 要 Node 22+，密钥用 env_vars，不要把 fc- 写进 env 表。',
  },
  {
    title: 'Exa in Codex and ChatGPT',
    url: 'https://exa.ai/docs/integrations/chatgpt-codex',
    source: 'Exa',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Exa', 'plugins'],
    summary:
      '官方推荐 chatgpt.com/plugins/exa，插件自带 MCP 和技能。手工才是 mcp add exa --url https://mcp.exa.ai/mcp。不要套 mcp-remote。生产密钥用 env_http_headers 的 x-api-key，不要把 key 写进 URL 或 http_headers 字面量。',
  },
  {
    title: 'Langfuse Docs MCP Server',
    url: 'https://langfuse.com/docs/docs-mcp',
    source: 'Langfuse',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Langfuse', '文档'],
    summary:
      '官方 Codex 节是 mcp add langfuse-docs --url https://langfuse.com/api/mcp。无鉴权、只读文档。不要抄 mcp-remote。这不是 cloud.langfuse.com 那台带 Basic Auth 的产品 MCP。技能安装必须带 --agent codex。',
  },
  {
    title: 'LaunchDarkly hosted MCP server',
    url: 'https://launchdarkly.com/docs/home/getting-started/mcp-hosted',
    source: 'LaunchDarkly',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'LaunchDarkly', 'OAuth'],
    summary:
      '托管地址是 https://mcp.launchdarkly.com/mcp/launchdarkly，走 OAuth。官方安装页没有 Codex，本机用 mcp add 再 mcp login。不要抄本地 npx --api-key。联邦区和欧盟实例没有这台托管服务。OAuth 后 403 多半是 Writer 权限。',
  },
  {
    title: 'Langfuse MCP Server',
    url: 'https://langfuse.com/docs/api-and-data-platform/features/mcp-server',
    source: 'Langfuse',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Langfuse', '密钥'],
    summary:
      '产品 MCP 是 cloud.langfuse.com/api/public/mcp，Basic Auth，项目级 pk/sk。官方 Codex 示例把 token 写进 http_headers，不要抄。Codex 用 env_http_headers。bearer_token_env_var 会发 Bearer，对这台不对口。能跑 shell 时官方更推荐技能加 CLI。验证问 listPrompts。',
  },
  {
    title: "Use Circle's MCP server in your IDE",
    url: 'https://developers.circle.com/ai/mcp',
    source: 'Circle',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Circle'],
    summary:
      '官方 Codex 节是 mcp add circle --url https://api.circle.com/v1/codegen/mcp。这是 Wallets / Contracts / CCTP / Gateway 的代码生成 MCP，无账号。不要和 CircleCI 的 mcp.circleci.com 搞混。不要抄 Kiro 的 npx @circle/mcp-server。',
  },
  {
    title: 'Twilio MCP server',
    url: 'https://www.twilio.com/docs/ai/mcp',
    source: 'Twilio',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Twilio', '文档'],
    summary:
      '官方 Codex 节是 mcp add twilio-docs --url https://mcp.twilio.com/docs。无鉴权、只读文档和 OpenAPI，Public Beta。不要抄 Claude 的 --transport http 或 Cursor 的 /add-plugin。不会替你执行 Twilio API。',
  },
  {
    title: 'Twilio Skills for AI coding agents',
    url: 'https://www.twilio.com/docs/ai/skills',
    source: 'Twilio',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Twilio', 'plugins'],
    summary:
      'Codex 主路径是 /plugins 或桌面 Plugins 搜 Twilio developer kit。插件 id 是 twilio-developer-kit。纯技能回退才是把 twilio/ai 的 skills/ 拷进 ~/.agents/skills。不要抄 Claude 的 plugin install，也不要把整个仓库 clone 进技能根目录。',
  },
  {
    title: 'Shopify AI Toolkit',
    url: 'https://shopify.dev/docs/apps/build/ai-toolkit',
    source: 'Shopify',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Shopify', 'MCP', 'Skills'],
    summary:
      '官方 Codex 推荐是 plugin add shopify@openai-curated，插件会自动更新。只要文档/校验才配本地 shopify-dev-mcp。不要抄 Claude 的 shopify-ai-toolkit@claude-plugins-official。npx skills add 不会自动更新。',
  },
  {
    title: 'Resend MCP Server',
    url: 'https://resend.com/docs/knowledge-base/mcp-server',
    source: 'Resend',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Resend', 'plugins', 'OAuth', 'Skills'],
    summary:
      'Codex 插件优先：/plugins 或桌面 Plugins 搜 Resend。只要 MCP 才 codex mcp add resend --url https://mcp.resend.com/mcp。无头才 bearer_token_env_var。不要把密钥写进 --env 或 http_headers，也不要抄 Claude 的 plugin install 或 Cursor 的 /add-plugin。',
  },
  {
    title: 'Railway plugin for Codex',
    url: 'https://docs.railway.com/ai/codex-plugin',
    source: 'Railway',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Railway', 'MCP', 'Skills'],
    summary:
      'Codex 公共目录是 /plugins 搜 Railway。源仓才 codex plugin marketplace add railwayapp/railway-skills，再从 Railway marketplace 装。捆绑 use-railway 和托管 MCP（mcp.railway.com，没有 /mcp 后缀）。不要抄 Claude 的 railway@claude-plugins-official 或 Cursor 的 /add-plugin railway。',
  },
  {
    title: 'MongoDB with Codex',
    url: 'https://www.mongodb.com/docs/codex/',
    source: 'MongoDB',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'MongoDB', 'MCP', 'Skills'],
    summary:
      'Atlas 托管走 /plugins 搜 mongodb-atlas。自建才 codex plugin marketplace add mongodb/agent-skills，再装 mongodb 插件，并用 env_vars 配 MDB_MCP_CONNECTION_STRING。不要把连接串写进 args，也不要抄 Claude 或 Cursor 的插件命令。',
  },
  {
    title: 'Enable and connect ClickHouse Cloud remote MCP server',
    url: 'https://clickhouse.com/docs/products/cloud/features/ai-ml/mcp/remote-mcp',
    source: 'ClickHouse',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'ClickHouse', 'OAuth', 'plugins'],
    summary:
      '先在 Cloud 控制台打开 MCP。Codex 是 codex mcp add clickhouse-cloud --url https://mcp.clickhouse.cloud/mcp，再 OAuth。公共目录也可 /plugins 搜 ClickHouse。不要抄 Claude 的 --transport http，也不要和 clickstack 端点搞混。',
  },
  {
    title: 'Codex CLI + Render',
    url: 'https://render.com/agents/codex',
    source: 'Render',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Render', 'OAuth', 'plugins'],
    summary:
      '插件优先：/plugins 搜 Render。只要 MCP 才 codex mcp add render --url https://mcp.render.com/mcp --oauth-client-id codex。CI 才 bearer_token_env_var。不要把密钥写进 http_headers，也不要抄 Claude 或 Cursor 的插件命令。',
  },
  {
    title: 'Using Codex with Convex',
    url: 'https://docs.convex.dev/ai/using-codex',
    source: 'Convex',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Convex', 'MCP', 'Skills'],
    summary:
      '完整版是 marketplace add get-convex/convex-codex-plugin，再 plugin add convex@convex-codex-plugin。openai-curated 只是轻量连接器。插件已带 MCP 时不要再 mcp add。不要抄 Claude 或 Cursor 的插件命令。',
  },
  {
    title: 'Mixpanel MCP Server',
    url: 'https://docs.mixpanel.com/docs/mcp',
    source: 'Mixpanel',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Mixpanel', 'OAuth'],
    summary:
      '官方 Codex CLI 是 ~/.codex/config.toml 写 [mcp_servers.mixpanel]，url 为 https://mcp.mixpanel.com/mcp，再 mcp login mixpanel。EU/IN 换区域主机。服务账号不要抄 headers 密钥，改走 env_http_headers。不要抄 Claude 的 --transport http 或 Cursor 的 mcp-remote。',
  },
  {
    title: 'Get started with Algolia Productivity MCP',
    url: 'https://www.algolia.com/doc/guides/model-context-protocol/productivity-mcp',
    source: 'Algolia',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Algolia', 'OAuth'],
    summary:
      '官方 Codex 节是 mcp add algolia --url https://mcp.algolia.com/mcp，再 mcp login algolia。先在控制台打开 Productivity MCP。只读。不要抄 Claude 的 --transport http。不要和 DocSearch 或 Public MCP 配成一台。',
  },
  {
    title: 'Use DocSearch MCP',
    url: 'https://docsearch.algolia.com/docs/mcp/usage',
    source: 'Algolia DocSearch',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Algolia', 'DocSearch'],
    summary:
      'Codex 表名是 algolia-docsearch，url 为 https://mcp.algolia.com/1/docsearch/mcp。无鉴权。安装器只用 --codex，不要 --all。不要 login，也不要和 Productivity 那张 algolia 表写成一台。',
  },
  {
    title: 'Develop with AI',
    url: 'https://docs.temporal.io/with-ai',
    source: 'Temporal',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Temporal', 'Skills', 'MCP'],
    summary:
      '官方 Codex 是桌面 Plugins 或 TUI /plugins 搜 temporal。官方没给 plugin add id。源仓是 temporalio/codex-temporal-plugin。Cloud 技能不在插件包。知识库 MCP 是 temporal.mcp.kapa.ai，没有 Codex 专节。不要抄 Claude 的 temporal@temporal-marketplace 或 Cursor 的 /add-plugin temporal。',
  },
  {
    title: 'Set up New Relic MCP',
    url: 'https://docs.newrelic.com/docs/agentic-ai/mcp/setup/',
    source: 'New Relic',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'New Relic', 'OAuth'],
    summary:
      '官方推荐是 mcp add new-relic-mcp-server --url https://mcp.newrelic.com/mcp/，再 mcp login。OAuth 失败才改走 new-relic 表的 env_http_headers api-key。不要抄 --transport http 或 mcp-remote，也不要把 NRAK 密钥写进 http_headers。',
  },
  {
    title: 'Typesense Cloud MCP Server',
    url: 'https://typesense.org/docs/guide/typesense-cloud/mcp-server',
    source: 'Typesense',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Typesense', 'OAuth'],
    summary:
      '官方 Codex 是 mcp add typesense-cloud --url https://cloud.typesense.org/mcp/v1，再 mcp login。授权页先选最小权限。无头才 bearer_token_env_var。不要抄 Claude 的 --transport http 或把密钥写进 --header。',
  },
  {
    title: 'MCP (AI agents)',
    url: 'https://docs.turso.tech/integrations/mcp',
    source: 'Turso',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Turso', 'MCP', 'OAuth', 'Skills'],
    summary:
      '官方 Codex 是 marketplace add tursodatabase/turso-mcp，再 plugin add turso@turso，再 mcp login turso。只要 MCP 才手写 mcp.turso.ai/mcp。OAuth，没有 API token 可抄。不要抄 Claude 的 /plugin install 或 Cursor 的 mcp-remote。',
  },
  {
    title: 'Connect to the CockroachDB Cloud MCP Server',
    url: 'https://www.cockroachlabs.com/docs/cockroachcloud/connect-to-the-cockroachdb-cloud-mcp-server',
    source: 'Cockroach Labs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'CockroachDB', 'OAuth', 'plugins'],
    summary:
      '官方 Codex 是 mcp add cockroachdb-cloud --url https://cockroachlabs.cloud/mcp，再 mcp login。技能才 marketplace add cockroachdb/codex-plugin。不要抄官方 TOML 里的 Bearer，也不要把 --env 字面量写进配置。',
  },
  {
    title: 'Using the Airtable MCP server',
    url: 'https://support.airtable.com/docs/using-the-airtable-mcp-server',
    source: 'Airtable',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Airtable', 'MCP', 'OAuth', 'Skills'],
    summary:
      '官方 Codex 推荐 plugin add airtable@openai-curated。只要 MCP 才 mcp add airtable --url https://mcp.airtable.com/mcp，再 mcp login。无头才 bearer_token_env_var。不要抄 Claude 的 --header 密钥或源仓 README 的数组表。',
  },
  {
    title: 'Connect to the MotherDuck MCP Server',
    url: 'https://motherduck.com/docs/key-tasks/ai-and-motherduck/mcp-setup/',
    source: 'MotherDuck',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'MotherDuck', 'MCP', 'OAuth', 'Skills'],
    summary:
      '技能走 marketplace add motherduckdb/agent-skills，再 /plugins 装 MotherDuck Skills。远程 MCP 是 api.motherduck.com/mcp，再 mcp login。不要发明 plugin add id，也不要抄 Claude 的 --transport http 或把 token 写进 http_headers。',
  },
  {
    title: 'Set up the developer MCP server',
    url: 'https://developers.hubspot.com/docs/developer-tooling/local-development/developer-mcp/setup',
    source: 'HubSpot',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'HubSpot', 'CLI'],
    summary:
      '官方 Codex 是 hs mcp setup 勾选 Codex CLI。表名是 HubSpotDev。等价手写 mcp add HubSpotDev -- hs mcp start --ai-agent codex。这是本地开发 MCP，不是 mcp.hubspot.com 那台远程 CRM。',
  },
  {
    title: 'Azure Skills Plugin',
    url: 'https://github.com/microsoft/azure-skills',
    source: 'Microsoft',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Azure', 'MCP', 'Skills'],
    summary:
      '官方 Codex 是 marketplace add microsoft/azure-skills，再 /plugins 装 azure。插件 MCP 是 npx @azure/mcp@latest server start，先 az login。不要发明 plugin add id，也不要抄 Copilot 的 /plugin install。',
  },
  {
    title: 'Azure DevOps MCP Server',
    url: 'https://github.com/microsoft/azure-devops-mcp',
    source: 'Microsoft',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Azure DevOps', 'stdio'],
    summary:
      '官方 Codex 是 mcp add azure-devops -- npx -y @azure-devops/mcp，组织名跟在包名后面。这是本地 stdio。远程 mcp.dev.azure.com 走不了 Entra DCR。PAT 用 env_vars 转发 PERSONAL_ACCESS_TOKEN，不要写进 env 表。',
  },
  {
    title: 'Tinybird DevTools MCP',
    url: 'https://www.npmjs.com/package/@tinybirdco/devtools-mcp',
    source: 'Tinybird',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Tinybird', 'stdio'],
    summary:
      '官方 Codex 是 mcp add tinybird -- npx -y @tinybirdco/devtools-mcp@latest。不要抄 -e TINYBIRD_TOKEN=。用 env_vars 转发。远程 mcp.tinybird.co 是查活 Workspace 的另一台。技能是 npx skills add tinybirdco/tinybird-agent-skills，不是 /plugins。',
  },
  {
    title: 'Upstash Agent Skills and MCP',
    url: 'https://upstash.com/docs/agent-resources/clients',
    source: 'Upstash',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Upstash', 'MCP', 'Skills'],
    summary:
      '官方 Codex 是 marketplace add upstash/skills，再 plugin add upstash@upstash。插件会登记远程 mcp.upstash.com/mcp。不要抄本地 --email / --api-key。不是 Context7，也不是单库 redis-mcp。',
  },
  {
    title: 'GitLab MCP server',
    url: 'https://docs.gitlab.com/user/model_context_protocol/mcp_server/',
    source: 'GitLab',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'GitLab', 'OAuth'],
    summary:
      '官方 Codex 是 mcp add GitLab --url https://gitlab.com/api/v4/mcp，再 mcp login GitLab。不要抄 features.rmcp_client，也不要抄 mcp-remote。不是 Cloud 评论审查，也不是 Orbit 的 api/v4/orbit/mcp。',
  },
  {
    title: 'Sanity Agent Toolkit',
    url: 'https://github.com/sanity-io/agent-toolkit',
    source: 'Sanity',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Sanity', 'OAuth', 'Skills'],
    summary:
      '官方 Codex 是 mcp add Sanity --url https://mcp.sanity.io，再 mcp login Sanity。URL 没有 /mcp 后缀。技能才 marketplace add sanity-io/agent-toolkit，再 /plugins 装 Sanity。不要发明 plugin add id，也不要抄 mcp-remote。',
  },
  {
    title: 'Connect to Honeycomb MCP',
    url: 'https://docs.honeycomb.io/integrations/mcp/configuration-guide',
    source: 'Honeycomb',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Honeycomb', 'MCP', 'OAuth'],
    summary:
      '官方 Codex 是 marketplace add honeycombio/agent-skill，再 plugin add honeycomb@honeycomb-plugins。插件会登记 mcp.honeycomb.io/mcp。不要抄 mcp-remote。欧盟用 mcp.eu1.honeycomb.io/mcp。无头才 bearer_token_env_var。',
  },
  {
    title: 'Semgrep Guardian',
    url: 'https://docs.semgrep.dev/semgrep-guardian/overview',
    source: 'Semgrep',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Semgrep', 'stdio'],
    summary:
      '官方 Codex 是本地 stdio：config.toml 写 [mcp_servers.semgrep]，command = "semgrep"，args = ["mcp"]。等价 mcp add semgrep -- semgrep mcp。先 pipx 或 uv 装 CLI，再 semgrep login && semgrep install-semgrep-pro。不要抄 Claude 远程插件，也不要 uvx semgrep-mcp。',
  },
  {
    title: 'kagisearch/kagimcp',
    url: 'https://github.com/kagisearch/kagimcp',
    source: 'Kagi',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Kagi', 'stdio'],
    summary:
      '官方 Codex 是 mcp add kagi -- uvx kagimcp。不要抄 --env KAGI_API_KEY=。用 env_vars。工具是 kagi_search_fetch。托管才 mcp.kagi.com/mcp + bearer_token_env_var。不要 mcp login。',
  },
  {
    title: 'Pinecone Agent Skills',
    url: 'https://docs.pinecone.io/integrations/agent-skills',
    source: 'Pinecone',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Pinecone', 'MCP'],
    summary:
      '官方 Codex 是 npx skills add pinecone-io/skills --agent codex。不要抄 Claude plugin 或 Cursor /add-plugin。MCP 才 mcp add pinecone -- npx -y @pinecone-database/mcp，密钥用 env_vars。',
  },
  {
    title: 'Heroku Remote MCP Server',
    url: 'https://devcenter.heroku.com/articles/heroku-remote-mcp-server',
    source: 'Heroku',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Heroku', 'OAuth'],
    summary:
      '官方远程是 mcp.heroku.com/mcp，Codex 对照 mcp add heroku --url 再 mcp login。不要抄 mcp-remote。本地才 heroku mcp:start。npx 才 @heroku/mcp-server + env_vars。',
  },
  {
    title: 'Litestream MCP Server',
    url: 'https://litestream.io/reference/mcp/',
    source: 'Litestream',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Litestream', 'SQLite'],
    summary:
      '官方 Codex 是 mcp add litestream --url http://localhost:3001。先在 YAML 写 mcp-addr，再 litestream replicate。没有 litestream mcp 子命令。不要 mcp login。恢复用 litestream_restore，保持批准。',
  },
  {
    title: 'PagerDuty MCP Server',
    url: 'https://support.pagerduty.com/main/docs/pagerduty-mcp-server',
    source: 'PagerDuty',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'PagerDuty', 'HTTP'],
    summary:
      '官方托管是 mcp.pagerduty.com/mcp。Codex 对照 mcp add pagerduty --url。不支持 DCR，不要 mcp login。API key 是 Token token=，走 env_http_headers。欧盟换 mcp.eu.pagerduty.com/mcp。本地 uvx 已弃用。',
  },
  {
    title: 'flyctl mcp server',
    url: 'https://fly.io/docs/mcp/flyctl-server/',
    source: 'Fly.io',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Fly.io', 'stdio'],
    summary:
      '官方给 LLM 加服务器是 fly mcp server --claude，没有 --codex。Codex 对照 mcp add fly -- fly mcp server。不要对 config.toml 跑 --config。Inspector 工具如 fly-apps-list。不要抄 --sse 或 flyctl mcp proxy。',
  },
  {
    title: 'Set up Atlan MCP',
    url: 'https://docs.atlan.com/product/capabilities/atlan-ai/how-tos/remote-mcp-overview',
    source: 'Atlan',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Atlan', 'plugins', 'OAuth'],
    summary:
      '官方 Codex：marketplace add atlanhq/agent-toolkit，再 plugin add atlan@atlan，再 mcp add atlan --url https://mcp.atlan.com/mcp。装了插件仍要 mcp add。本地 docker / uvx 已弃用。不要抄 Claude 的 atlan@atlan-marketplace。',
  },
  {
    title: '@splunk/o11y-mcp-connect',
    url: 'https://www.npmjs.com/package/@splunk/o11y-mcp-connect',
    source: 'Splunk',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Splunk', 'Observability', 'HTTP'],
    summary:
      '官方走 Splunk MCP Gateway，us0 示例是 region-iad10.api.scs.splunk.com。o11y-only 头是 X-SF-TOKEN 和 X-SF-REALM，不是 Bearer。不要抄 connect --ide codex 写入的 http_headers，也不要抄 mcp-remote。包名 splunk-o11y-mcp-connect。',
  },
  {
    title: 'Elastic Agent Builder MCP server',
    url: 'https://www.elastic.co/docs/explore-analyze/ai-features/agent-builder/mcp-server',
    source: 'Elastic',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Elastic', 'Kibana', 'HTTP'],
    summary:
      '官方终点是 Kibana 的 /api/agent_builder/mcp。Codex 对照 mcp add elastic-agent-builder --url。API key 是 Authorization: ApiKey，走 env_http_headers。缺 feature_agentBuilder.read 会 403。不要抄 mcp-remote 或已弃用的本地 elasticsearch MCP。',
  },
  {
    title: 'Remote MCP server',
    url: 'https://docs.incident.io/ai/remote-mcp',
    source: 'incident.io',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'incident.io', 'plugins', 'OAuth'],
    summary:
      '官方 Codex：marketplace add incident-io/skills，再 plugin add incident-io@incident-io-skills。插件会登记 MCP 和 skills。只要 MCP 才 mcp add incident_io --url https://mcp.incident.io/mcp。不要抄 type = url、Claude /plugin install 或 Cursor /add-plugin。',
  },
  {
    title: 'Use the 1Password MCP Server to manage your 1Password Environments',
    url: 'https://developer.1password.com/docs/environments/mcp-server/',
    source: '1Password',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', '1Password', 'stdio', 'Environments'],
    summary:
      '官方 Codex 是本地 stdio：先 Labs 打开 Enable local MCP server，再 mcp add 1password -- 1password-mcp。表名 mcp_servers.1password。Mac / Linux。不要抄 Claude 的 1password@1password 或 op mcp-server environments。',
  },
  {
    title: 'OpenAI Codex: Set up CE.SDK with OpenAI Codex',
    url: 'https://img.ly/capabilities/agents/openai-codex/',
    source: 'IMG.LY',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'IMG.LY', 'CE.SDK', 'MCP'],
    summary:
      '官方 Codex：npx skills add imgly/agent-skills -a codex。实时文档才 mcp add imgly_docs --url https://mcp.img.ly/mcp，无鉴权。不要抄 Claude 的 cesdk@imgly 或 CoDesign 的 @imgly/codesign-mcp。',
  },
  {
    title: 'Install IMG.LY CoDesign in your coding agent',
    url: 'https://img.ly/codesign/install/',
    source: 'IMG.LY',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'IMG.LY', 'CoDesign', 'stdio'],
    summary:
      '官方 Codex：mcp add codesign -- npx -y @imgly/codesign-mcp@latest stdio。stdio 是子命令。加完当前会话不可用，新开后再发 start the CoDesign onboarding。不要抄 --scope user 或 JSON mcpServers。不要 mcp login。',
  },
  {
    title: 'Terraform MCP Server',
    url: 'https://github.com/hashicorp/terraform-mcp-server',
    source: 'HashiCorp',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Terraform', 'stdio', 'Docker'],
    summary:
      '官方 Codex：mcp add terraform -- docker run -i --rm hashicorp/terraform-mcp-server。查公共 registry 不用 token。HCP / TFE 才 env_vars 转发 TFE_TOKEN / TFE_ADDRESS。不要 mcp login，也不要把密钥写进 env 表。',
  },
  {
    title: "Use Clerk's MCP server (Beta)",
    url: 'https://clerk.com/docs/guides/ai/mcp/clerk-mcp-server',
    source: 'Clerk',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Clerk', 'stdio'],
    summary:
      '官方现行是 clerk mcp install --client codex，等价 mcp add clerk -- clerk mcp run。文档 Codex 节缺 --url 且带 rmcp，不要抄。托管地址是 mcp.clerk.com/mcp。不要 mcp login。',
  },
  {
    title: 'clerk/skills',
    url: 'https://github.com/clerk/skills',
    source: 'Clerk',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Clerk', 'Skills', 'marketplace'],
    summary:
      '官方 Codex：plugin marketplace add clerk/skills，再 /plugins 装 clerk-skills。不要发明 plugin add 的 @id。不要抄 npx skills add 当 Codex 专节。不要和 Clerk MCP stdio 桥搞成一台。',
  },
  {
    title: 'Appcircle MCP Server',
    url: 'https://docs.appcircle.io/appcircle-ai/appcircle-mcp-server',
    source: 'Appcircle',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Appcircle', 'HTTP'],
    summary:
      '官方远程是 mcp.appcircle.io，没有 /mcp。Codex 对照 mcp add appcircle --url。APPCIRCLE_ACCESS_TOKEN 必须是兑换后的 JWT。不要 mcp login。不要抄 Claude 插件或 http_headers 字面量。',
  },
  {
    title: 'Arenukvern/mcp_flutter',
    url: 'https://github.com/Arenukvern/mcp_flutter',
    source: 'flutter-mcp-toolkit',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Flutter', 'plugins', 'Skills'],
    summary:
      '官方 Codex：flutter-mcp-toolkit init codex，或 marketplace add Arenukvern/mcp_flutter。不要发明 plugin add。不要抄 Claude /plugin install。技能本身不登记 flutter-mcp-toolkit-server。',
  },
  {
    title: 'RevenueCat MCP Server Setup',
    url: 'https://www.revenuecat.com/docs/tools/mcp/setup',
    source: 'RevenueCat',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'RevenueCat', 'plugins', 'OAuth'],
    summary:
      '官方 Codex：marketplace add RevenueCat/ai-toolkit，再 plugin add revenuecat@RevenueCat，再 mcp login RevenueCat。远程是 mcp.revenuecat.ai/mcp。不要抄 mcp-remote 或把 API v2 key 写进 env。v2.0.1 起插件名是小写 revenuecat。',
  },
  {
    title: 'Pathbound + Codex—MCP setup for CLI & IDE',
    url: 'https://pathbound.ai/use-with/openai/codex',
    source: 'Pathbound',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Pathbound', 'OAuth'],
    summary:
      '官方 Codex：mcp add pathbound --url https://mcp.pathbound.ai/mcp，再 mcp login pathbound。URL 带 /mcp。不要抄 Claude.ai 或 ChatGPT Plugins。无头才 REST API key 走 bearer_token_env_var。',
  },
  {
    title: 'Codex (OpenAI)',
    url: 'https://docs.stackone.com/connect/ai-platforms/codex',
    source: 'StackOne',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'StackOne', 'OAuth', 'HTTP'],
    summary:
      '官方 Codex：mcp add stackone --url https://mcp.stackone.com/mcp，再 mcp login stackone。网关 URL 带 /mcp。无头才把仪表盘 session token 拼进 api.stackone.com/mcp。不要抄 Claude 的 --transport http 或 npx mcp-remote。',
  },
  {
    title: 'Connect Butter to Codex',
    url: 'https://hellobutter.io/mcp',
    source: 'Butter',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Butter', 'OAuth', 'HTTP'],
    summary:
      '官方 Codex：mcp add butter --url https://mcp.hellobutter.io/mcp，再 mcp login butter。URL 带 /mcp。不要抄 Claude 的 --transport http。不是 ButterKit.app 那台本地 stdio。',
  },
  {
    title: 'How to Add an MCP Server to Codex CLI (2026 Guide)',
    url: 'https://designrevision.com/blog/add-mcp-server-to-codex',
    source: 'DesignRevision',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'DesignRevision', 'bearer', 'HTTP'],
    summary:
      '官方 Codex：mcp add design-revision --url https://mcp.designrevision.com/mcp --bearer-token-env-var DESIGNREVISION_API_KEY。URL 带 /mcp。不要 mcp login。不要抄 Claude 的 --header Bearer 字面量。',
  },
  {
    title: 'MCP Server',
    url: 'https://ui.shadcn.com/docs/mcp',
    source: 'shadcn/ui',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'shadcn', 'stdio'],
    summary:
      '官方 Codex 节：shadcn CLI cannot automatically update ~/.codex/config.toml，必须手写 [mcp_servers.shadcn]，command = npx，args = ["shadcn@latest", "mcp"]。这是本地 stdio，不要 mcp login。不要抄 Claude 的 mcp init --client claude。',
  },
  {
    title: 'Inngest Model Context Protocol (MCP)',
    url: 'https://www.inngest.com/docs/ai-dev-tools/mcp',
    source: 'Inngest',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Inngest', 'bearer', 'HTTP'],
    summary:
      '官方 Codex：mcp add inngest-cloud --url https://api.inngest.com/mcp --bearer-token-env-var INNGEST_API_KEY。URL 带 /mcp。不要 mcp login。不要抄 Claude 的 --header Bearer。本机另开 mcp add inngest-dev --url http://127.0.0.1:8288/mcp。',
  },
  {
    title: 'Model Context Protocol (MCP)',
    url: 'https://polar.sh/docs/integrate/mcp',
    source: 'Polar',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Polar', 'OAuth', 'HTTP'],
    summary:
      '官方 Codex：mcp add polar --url https://mcp.polar.sh/mcp/polar-mcp，随后完成 OAuth。URL 是 /mcp/polar-mcp，不是光 /mcp。沙箱另开 mcp add polar-sandbox --url https://mcp.polar.sh/mcp/polar-sandbox。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'AI Coding Agent Plugins and Skills',
    url: 'https://www.inngest.com/docs/ai-dev-tools/agent-skills',
    source: 'Inngest',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Inngest', 'plugins', 'Skills'],
    summary:
      '官方 Codex：git clone inngest/inngest-codex-plugin，再 /plugin install 绝对路径/inngest-codex-plugin/plugins/inngest。装 plugins/inngest 这一层。不要发明 plugin add inngest@。不要抄 Claude 的 inngest@inngest-claude-code-plugin。',
  },
  {
    title: 'inngest/inngest-codex-plugin',
    url: 'https://github.com/inngest/inngest-codex-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Inngest', 'plugins', 'Skills'],
    summary:
      '官方 Codex 插件仓。clone 后 /plugin install …/inngest-codex-plugin/plugins/inngest。本地 marketplace.json 市场名是 inngest-codex-plugin。插件 MCP 只接 http://127.0.0.1:8288/mcp。不要发明 plugin add 的 @id。',
  },
  {
    title: 'Codex',
    url: 'https://appwrite.io/docs/tooling/ai/agents/codex',
    source: 'Appwrite',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Appwrite', 'OAuth', 'plugins'],
    summary:
      '官方 Codex：plugin marketplace add appwrite/codex-plugin，再 /plugins 装 Appwrite。远程 MCP 是 mcp add appwrite --url https://mcp.appwrite.io/，有尾斜杠、没有 /mcp。OAuth，浏览器没弹再 mcp login appwrite。不要发明 plugin add appwrite@。',
  },
  {
    title: 'Introducing the Appwrite plugin for Codex: Skills and MCP in one install',
    url: 'https://appwrite.io/blog/post/announcing-appwrite-codex-plugin',
    source: 'Appwrite',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'Appwrite', 'plugins', 'Skills'],
    summary:
      '官方 Codex 插件博客。marketplace add appwrite/codex-plugin 后 /plugins 装 Appwrite。技能和 MCP 一次装。不要发明 plugin add 的 @id。Cloud 不要把 --env APPWRITE_API_KEY 字面量当主路径，远程走 mcp.appwrite.io。',
  },
  {
    title: 'The Appwrite MCP server is now remote: one URL, no API keys',
    url: 'https://appwrite.io/blog/post/announcing-remote-appwrite-mcp-server',
    source: 'Appwrite',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Appwrite', 'OAuth', 'HTTP'],
    summary:
      '官方远程 MCP 公告。Codex 用 mcp add appwrite --url https://mcp.appwrite.io/，有尾斜杠、没有 /mcp。OAuth，不要 API key。不要抄 Claude 的 --transport http。自托管才走本地 uvx mcp-server-appwrite。',
  },
  {
    title: 'appwrite/codex-plugin',
    url: 'https://github.com/appwrite/codex-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Appwrite', 'plugins', 'Skills'],
    summary:
      '官方 Codex 插件仓。marketplace add appwrite/codex-plugin。插件名 appwrite，.mcp.json 登记 https://mcp.appwrite.io/。装完再 mcp login appwrite。不要发明 plugin add appwrite@。不要手拷 ~/.codex/skills 当主路径。',
  },
  {
    title: 'Appwrite MCP server',
    url: 'https://appwrite.io/docs/tooling/ai/mcp-servers',
    source: 'Appwrite',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Appwrite', 'OAuth', 'HTTP'],
    summary:
      '官方 MCP 总览。远程 URL 是 https://mcp.appwrite.io/，有尾斜杠。OAuth，不要 API key。Codex 专节仍是 mcp add appwrite。自托管才走本地 stdio。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'MCP Introduction',
    url: 'https://trigger.dev/docs/mcp-introduction',
    source: 'Trigger.dev',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Trigger.dev', 'stdio'],
    summary:
      '官方 Codex：npx trigger.dev@latest install-mcp --client openai-codex。表名 trigger，本地 stdio，startup_timeout_sec = 30。不要 mcp login。不要 --yolo。不要抄 Claude 的 mcpServers JSON。search_docs 不用登录。',
  },
  {
    title: 'Skills',
    url: 'https://trigger.dev/docs/skills',
    source: 'Trigger.dev',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Trigger.dev', 'AGENTS.md'],
    summary:
      'Codex 走 npx trigger.dev@latest skills，装进项目 .agents/skills/。官方非交互示例只有 --target claude-code 和 cursor，不要发明 --target openai-codex。这不会登记 MCP。不要手拷 ~/.codex/skills。',
  },
  {
    title: 'Building with AI: overview',
    url: 'https://trigger.dev/docs/building-with-ai',
    source: 'Trigger.dev',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Trigger.dev', 'Skills'],
    summary:
      '技能教怎么写 task，MCP 才部署和触发。Codex 专节仍是 install-mcp --client openai-codex。不要把 AGENTS.md 短规则整段当 MCP 配置。不要发明远程 mcp.trigger.dev。',
  },
  {
    title: 'WorkOS MCP Server',
    url: 'https://workos.com/docs/mcp',
    source: 'WorkOS',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'WorkOS', 'OAuth', 'HTTP'],
    summary:
      '官方 Codex：mcp add workos --url https://mcp.workos.com/mcp，再 mcp get / mcp login / mcp list。URL 带 /mcp。OAuth，不要 API key。项目级写进可信仓库 .codex/config.toml。不要发明 plugin add workos@。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'How to install and use the WorkOS plugin in Claude, ChatGPT, and Codex',
    url: 'https://workos.com/blog/install-workos-plugin-claude-chatgpt-codex',
    source: 'WorkOS',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'WorkOS', 'OAuth', 'HTTP'],
    summary:
      'Codex 是 CLI 优先：mcp add workos --url https://mcp.workos.com/mcp，再 mcp login workos。即使插件目录能搜到 WorkOS，CLI 也没有一键安装。不要发明 plugin add workos@。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'Statsig MCP with Codex',
    url: 'https://docs.statsig.com/integrations/mcp/codex',
    source: 'Statsig',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Statsig', 'OAuth', 'HTTP'],
    summary:
      '官方 Codex：mcp add statsig --url https://api.statsig.com/v1/mcp。URL 是 /v1/mcp，不是光 /mcp。OAuth，浏览器没弹再 mcp login statsig。不要抄 npx mcp-remote，也不要把 console API key 写进 http_headers。不要发明 plugin add statsig@。',
  },
  {
    title: 'Statsig MCP overview',
    url: 'https://docs.statsig.com/integrations/mcp/overview',
    source: 'Statsig',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Statsig', 'OAuth', 'HTTP'],
    summary:
      'Statsig MCP 总览把 Codex Desktop / CLI / IDE 列为第一套配置。远程仍是 api.statsig.com/v1/mcp。只读工具给只读用户；写实验和门要写权限。不要把 ChatGPT Connector 或 Cursor JSON 当 Codex CLI 主路径。',
  },
  {
    title: 'contentful/contentful-mcp-server',
    url: 'https://github.com/contentful/contentful-mcp-server',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Contentful', 'stdio'],
    summary:
      '官方 Codex：mcp add contentful -- npx -y @contentful/mcp-server。表名 contentful，本地 stdio。不要把 --env 里的 CMA token 字面量写进 TOML，改成 env_vars 转发 CONTENTFUL_MANAGEMENT_ACCESS_TOKEN 和 SPACE_ID。不要 mcp login。不要抄 Cursor JSON。',
  },
  {
    title: 'Model Context Protocol (MCP) server',
    url: 'https://www.contentful.com/developers/docs/tools/mcp-server',
    source: 'Contentful',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Contentful', 'OAuth'],
    summary:
      '官方区分远程 mcp.contentful.com/mcp（OAuth，先装 Remote MCP App）和本地 @contentful/mcp-server（PAT）。Codex GitHub 专节是本地 stdio，不要发明 mcp add --url。不要把 PAT 拼进 URL，也不要抄 Cursor 的 contentful-mcp JSON。',
  },
  {
    title: 'MCP',
    url: 'https://loops.so/docs/mcp-server',
    source: 'Loops',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Loops', 'OAuth', 'HTTP'],
    summary:
      '官方 Codex：mcp add loops --url https://mcp.loops.so。URL 没有 /mcp。OAuth，浏览器没弹再 mcp login loops。不要抄 Claude 的 --transport http。不要发明 plugin add loops@。营销页 agents/mcp 仍写 roadmap，以这篇专节为准。',
  },
  {
    title: 'Agent skills for Loops',
    url: 'https://loops.so/docs/skills',
    source: 'Loops',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Loops', 'AGENTS.md'],
    summary:
      '技能页点名 Codex。官方安装是 curl install.loops.so/skills。不会登记 mcp.loops.so 那台远程 MCP。营销页 npx skills add loops-so/skills --global 没钉 --agent codex，不要发明。不要手拷 ~/.codex/skills。',
  },
  {
    title: 'Codex MCP server integration',
    url: 'https://docs.brightdata.com/ai/mcp-server/integrations/codex',
    source: 'Bright Data',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Bright Data', 'stdio'],
    summary:
      '官方 Codex：mcp add brightdata -- npx -y @brightdata/mcp。表名 brightdata，本地 stdio。不要把 --env 里的 API_TOKEN 字面量写进 TOML，改成 env_vars。不要 mcp login。不要抄 hosted 的 mcp.brightdata.com/mcp?token=。',
  },
  {
    title: 'Local MCP server advanced configuration',
    url: 'https://docs.brightdata.com/ai/mcp-server/local/advanced',
    source: 'Bright Data',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Bright Data', 'stdio'],
    summary:
      '本地 @brightdata/mcp 用环境变量。必填 API_TOKEN。PRO_MODE=true 才开全部工具；GROUPS 或 TOOLS 会盖过 Pro。Codex 里用 env_vars 转发这些名字，不要把值写进 env 表。',
  },
  {
    title: 'ChatGPT',
    url: 'https://developers.buffer.com/guides/integrations/chatgpt.html',
    source: 'Buffer',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Buffer', 'OAuth', 'HTTP'],
    summary:
      '官方 Codex：mcp add buffer --url https://mcp.buffer.com/mcp。URL 带 /mcp。OAuth，浏览器没弹再 mcp login buffer。不要 API key。不要发明 plugin add buffer@。不要把 ChatGPT Developer mode 当 CLI 主路径。',
  },
  {
    title: 'ChatGPT and Buffer Integration',
    url: 'https://buffer.com/integrations/chatgpt',
    source: 'Buffer',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Buffer', 'OAuth', 'HTTP'],
    summary:
      '营销页同样写 Codex CLI：mcp add buffer --url https://mcp.buffer.com/mcp。OAuth，浏览器会弹。网页 ChatGPT 走 Developer mode Connectors，不要抄进 config.toml。不要发明 plugin add buffer@。',
  },
  {
    title: 'How to set up the GrowthBook MCP server for Codex',
    url: 'https://www.growthbook.io/insights/how-to-set-up-growthbook-mcp-server-for-codex',
    source: 'GrowthBook',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'GrowthBook', 'stdio'],
    summary:
      '官方 Codex：mcp add growthbook -- npx -y @growthbook/mcp@latest。表名 growthbook，本地 stdio。不要把 --env 里的 GB_API_KEY 字面量写进 TOML，改成 env_vars。不要 mcp login。不要发明远程 --url。',
  },
  {
    title: 'Official GrowthBook MCP Server',
    url: 'https://docs.growthbook.io/integrations/mcp',
    source: 'GrowthBook',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'GrowthBook', 'stdio'],
    summary:
      '现行 2.x 工具是 growthbook_list_skills / growthbook_read_skill / growthbook_api_read / growthbook_api_write。Cloud 远程 mcp.growthbook.io/mcp 是 Cursor / Claude OAuth。Codex 专文仍是本地 @growthbook/mcp，不要发明 mcp add --url。旧文档的 GB_EMAIL 不是 stdio 必填。',
  },
  {
    title: 'Unleash MCP Server',
    url: 'https://docs.getunleash.io/integrate/mcp',
    source: 'Unleash',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Unleash', 'stdio'],
    summary:
      '官方 Codex：mcp add unleash -- npx -y @unleash/mcp@latest --log-level error。表名 unleash，本地 stdio。不要把 --env 里的 UNLEASH_PAT 字面量写进 TOML，改成 env_vars。不要 mcp login。不要抄 --transport http。',
  },
  {
    title: 'Unleash/unleash-mcp',
    url: 'https://github.com/Unleash/unleash-mcp',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Unleash', 'stdio'],
    summary:
      '仓库 Codex 专节同样是 @unleash/mcp@latest。必填 UNLEASH_BASE_URL 和 UNLEASH_PAT。README 远程示例把 --transport http 抄到 Codex 上，不要照抄。远程 /api/admin/mcp 是实验功能，要先在实例打开。',
  },
  {
    title: 'MCP Server',
    url: 'https://docs.flagsmith.com/integrating-with-flagsmith/mcp-server',
    source: 'Flagsmith',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Flagsmith', 'OAuth', 'HTTP'],
    summary:
      '官方 Codex 写进 ~/.codex/config.toml：url = https://mcp.flagsmith.com。没有 /mcp。OAuth，浏览器没弹再 mcp login flagsmith。不要抄 Claude 的 --transport http。不要发明 plugin add flagsmith@。旧 Gram 地址 2026-06-30 关停。',
  },
  {
    title: 'Self-hosting the MCP Server',
    url: 'https://docs.flagsmith.com/deployment-self-hosting/mcp-server',
    source: 'Flagsmith',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Flagsmith', 'OAuth', 'HTTP'],
    summary:
      '自托管另开 flagsmith/flagsmith-mcp 容器。SaaS 仍是 mcp.flagsmith.com。容器也听 /mcp，但 Codex 专节 SaaS URL 不要自己加 /mcp。stdio 才要 FLAGSMITH_API_TOKEN，走 env_vars，不要抄 env 表字面量。',
  },
  {
    title: 'MCP Getting Started',
    url: 'https://docs.devcycle.com/cli-mcp/mcp-getting-started',
    source: 'DevCycle',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'DevCycle', 'OAuth', 'HTTP'],
    summary:
      '官方 Codex 写进 ~/.codex/config.toml：url = https://mcp.devcycle.com/mcp。带 /mcp。OAuth，浏览器没弹再 mcp login devcycle。不要抄 /sse 或 npx mcp-remote。不要发明 plugin add devcycle@。',
  },
  {
    title: 'MCP Reference',
    url: 'https://docs.devcycle.com/cli-mcp/mcp-reference',
    source: 'DevCycle',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'DevCycle', 'stdio'],
    summary:
      '托管仍是 mcp.devcycle.com/mcp。本地 Codex 专节才是 command = dvc-mcp，先装 @devcycle/cli。不要 mcp login。CI 才转发 DEVCYCLE_CLIENT_ID 这类名字，走 env_vars。',
  },
  {
    title: 'Install Optimizely Experimentation MCP server',
    url: 'https://support.optimizely.com/hc/en-us/articles/45321466744205-Install-Optimizely-Experimentation-MCP-server',
    source: 'Optimizely',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Optimizely', 'OAuth', 'HTTP'],
    summary:
      '官方 Codex 是 Settings 加 Streamable HTTP，URL 为 https://exp.mcp.opal.optimizely.com/mcp。Bearer 和头留空。OAuth 走 Opal。不要抄 Claude 的 --transport http。不要发明 plugin add optimizely@。',
  },
  {
    title: 'Optimizely Experimentation MCP server overview',
    url: 'https://support.optimizely.com/hc/en-us/articles/45320607594893-Optimizely-Experimentation-MCP-server-overview',
    source: 'Optimizely',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Optimizely', 'OAuth', 'HTTP'],
    summary:
      '托管地址是 exp.mcp.opal.optimizely.com/mcp。要 Opti ID 和已打开的 Opal。工具名带 exp_ 前缀。改开关和实验会改账号。Web Experimentation 的 variation 级代码不能经 MCP 改。',
  },
  {
    title: 'How to Use Coding Agents With DigitalOcean',
    url: 'https://docs.digitalocean.com/products/inference/how-to/use-with-coding-agents/',
    source: 'DigitalOcean',
    lang: '英文',
    kind: '官方',
    tags: ['model_providers', 'DigitalOcean', 'wire_api'],
    summary:
      '官方 Codex TOML 是 [model_providers.openai_custom]，base_url 是 https://inference.do-ai.run/v1，env_key = MODEL_ACCESS_KEY，wire_api = responses。密钥走进程环境，不要整文件覆盖 ~/.codex/config.toml。这不是 MCP，也不是 App Platform skills。',
  },
  {
    title: 'How to Retrieve Available Models',
    url: 'https://docs.digitalocean.com/products/inference/how-to/retrieve-available-models/',
    source: 'DigitalOcean',
    lang: '英文',
    kind: '官方',
    tags: ['model_providers', 'DigitalOcean'],
    summary:
      'GET https://inference.do-ai.run/v1/models 列出 Inference 模型 ID。Codex 的 env_key 是 MODEL_ACCESS_KEY；这篇 cURL 示例有时写 DIGITALOCEAN_TOKEN，配 Codex 仍用 MODEL_ACCESS_KEY。',
  },
  {
    title: 'Customer.io plugin for ChatGPT and Codex',
    url: 'https://docs.customer.io/ai/plugins/chatgpt-codex/',
    source: 'Customer.io',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Customer.io', 'plugins', 'OAuth'],
    summary:
      '官方 Codex 是 Plugins 搜 Customer.io 再 OAuth。安装时不用手填 https://mcp.customer.io/mcp。不要发明 plugin add customerio@，也不要把 ChatGPT 自定义 connector 抄进 Codex CLI。',
  },
  {
    title: 'Get started with the Customer.io MCP server',
    url: 'https://docs.customer.io/ai/mcp/get-started/',
    source: 'Customer.io',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Customer.io', 'OAuth'],
    summary:
      '账号管理员先打开 Settings → AI 里的 Customer.io MCP。ChatGPT 或 Codex 装官方插件；Cursor / Claude 另有插件。底层入口是 mcp.customer.io。不要把 API token 当主路径。',
  },
  {
    title: 'Klaviyo MCP server',
    url: 'https://developers.klaviyo.com/en/docs/klaviyo_mcp_server',
    source: 'Klaviyo',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Klaviyo', 'OAuth', 'HTTP'],
    summary:
      '官方推荐远程 https://mcp.klaviyo.com/mcp，OAuth DCR + Streamable HTTP。页上没有 Codex 专节，对照 Other Clients 写 mcp add klaviyo。不要抄 Cursor JSON 或本地 uvx 的 PRIVATE_API_KEY。',
  },
  {
    title: 'Klaviyo MCP Server Guide For Agencies',
    url: 'https://help.klaviyo.com/hc/en-us/articles/52833598880923',
    source: 'Klaviyo',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Klaviyo', 'OAuth'],
    summary:
      '机构多账号把 company 写进 mcp.klaviyo.com URL，例如 https://mcp.klaviyo.com/mcp?company=example-company。要 Owner / Admin / Manager。Codex 手写 url 就能带查询参数，不要抄 Claude listed connector。',
  },
  {
    title: 'Set up the Braze MCP server',
    url: 'https://www.braze.com/docs/user_guide/brazeai/mcp_server/setup',
    source: 'Braze',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Braze', 'OAuth', 'HTTP'],
    summary:
      '官方已验证 OpenAI Codex。远程是 https://mcp.braze.com/mcp 或欧盟 mcp.braze.eu/mcp。OAuth DCR，不要 API key。管理员先开 MCP OAuth，用户要有 Use MCP Server。本地 beta 已弃用。',
  },
  {
    title: 'The Braze MCP server',
    url: 'https://www.braze.com/docs/user_guide/brazeai/mcp_server',
    source: 'Braze',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Braze', 'OAuth'],
    summary:
      '远程入口是 mcp.braze.com/mcp。权限镜像仪表盘账号，不返回用户档案 PII。写工具也有，但官方不要 auto-mode。不要把已弃用的本机 PyPI 包当 Codex 主路径。',
  },
  {
    title: 'OneSignal MCP Server',
    url: 'https://documentation.onesignal.com/docs/en/model-context-protocol',
    source: 'OneSignal',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'OneSignal', 'plugins', 'OAuth'],
    summary:
      '官方 Codex 是 OpenAI / ChatGPT 插件目录搜 OneSignal，再 OAuth。底层入口是 https://api.onesignal.com/mcp/oauth，安装时不用手填。不要 REST API key，也不要发明 plugin add onesignal@。',
  },
  {
    title: 'OneSignal AI data practices',
    url: 'https://documentation.onesignal.com/docs/en/ai-data-practices',
    source: 'OneSignal',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'OneSignal', 'OAuth'],
    summary:
      '仪表盘 OneSignal AI 不是 MCP。Customer AI Agent 才是外部客户端连 api.onesignal.com/mcp/oauth。Codex 走 Plugins，不要和仪表盘助手混为一谈。撤销在 Connected apps。',
  },
  {
    title: 'Getting started with the beehiiv MCP',
    url: 'https://www.beehiiv.com/support/article/39255979546263-getting-started-with-the-beehiiv-mcp',
    source: 'beehiiv',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'beehiiv', 'OAuth', 'HTTP'],
    summary:
      '官方点名 Codex。远程是 https://mcp.beehiiv.com/mcp，OAuth。仪表盘 Settings → MCP 选 Codex。多 workspace 用 mcp.beehiiv.com/mcp?account=1 区分。免费只读。不要发明 plugin add beehiiv@。',
  },
  {
    title: 'What you can do with the beehiiv MCP',
    url: 'https://www.beehiiv.com/support/article/41262491804439-what-you-can-do-with-the-beehiiv-mcp',
    source: 'beehiiv',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'beehiiv', 'OAuth'],
    summary:
      '连上 mcp.beehiiv.com/mcp 之后可以起草件、配自动化、管分段。发布和启用自动化仍回仪表盘。免费档只读。不要把这篇当 API 合同，也不要发明 plugin add beehiiv@。',
  },
  {
    title: 'MailerLite MCP Server',
    url: 'https://developers.mailerlite.com/mcp',
    source: 'MailerLite',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'MailerLite', 'OAuth', 'HTTP'],
    summary:
      '官方写任意 MCP 客户端。远程是 https://mcp.mailerlite.com/mcp，OAuth。没有 Codex 专节，对照 Claude Code 写 mcp add mailerlite。不要抄 --transport http，也不要发明 plugin add mailerlite@。',
  },
  {
    title: 'MailerLite MCP examples',
    url: 'https://developers.mailerlite.com/mcp/examples',
    source: 'MailerLite',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'MailerLite', 'OAuth'],
    summary:
      '连上 mcp.mailerlite.com/mcp 之后，未标 ACTION 的提示只读。标了 ACTION 的会起草件、排期、导入订阅者。不要把示例邮箱抄进生产发送。',
  },
  {
    title: 'Buildkite MCP server overview',
    url: 'https://buildkite.com/docs/apis/mcp-server',
    source: 'Buildkite',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Buildkite', 'OAuth', 'HTTP'],
    summary:
      '官方远程交互入口是 mcp.buildkite.com/mcp，OAuth，不要 API token。只读换 mcp.buildkite.com/mcp/readonly。无头才是 mcp.buildkite.com/direct。配置页没有 Codex 专节。不要发明 plugin add buildkite@。',
  },
  {
    title: 'Configuring AI tools with the remote MCP server',
    url: 'https://buildkite.com/docs/apis/mcp-server/remote/configuring-ai-tools',
    source: 'Buildkite',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Buildkite', 'OAuth', 'HTTP'],
    summary:
      '对照 VS Code 的 url 和 Goose 的 streamable_http，Codex 写 mcp add buildkite --url https://mcp.buildkite.com/mcp，再 mcp login。单组工具走 mcp.buildkite.com/mcp/x/pipelines。不要抄 Amp 的 mcp-remote 或 Claude 的 --transport http。',
  },
  {
    title: 'Pulumi MCP Server',
    url: 'https://www.pulumi.com/docs/ai/mcp-server/',
    source: 'Pulumi',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Pulumi', 'OAuth', 'HTTP'],
    summary:
      '官方远程是 mcp.ai.pulumi.com/mcp，OAuth。浏览器里贴 Access Token 并选组织。没有 Codex 专节，对照 Cursor 的 url 写 mcp add pulumi。不要抄 mcp-remote，也不要把 bearer_token_env_var 当交互主路径。不要发明 plugin add pulumi@。',
  },
  {
    title: 'Announcing Pulumi Remote MCP Server',
    url: 'https://www.pulumi.com/blog/remote-mcp-server/',
    source: 'Pulumi',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Pulumi', 'OAuth', 'HTTP'],
    summary:
      '托管入口就是 mcp.ai.pulumi.com/mcp。OAuth 把 Access Token 留在 Pulumi Cloud，不要散落在本机 env。本地 npm 包继续给离线或 CI。Neo 任务会改基础设施，保持批准。',
  },
  {
    title: 'Pulumi Agent Skills',
    url: 'https://www.pulumi.com/docs/ai/skills/',
    source: 'Pulumi',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Pulumi', '插件'],
    summary:
      '官方 Codex 走 plugin marketplace add pulumi/agent-skills，再在 /plugins 装 pulumi。不要把 Claude 的 pulumi@pulumi-agent-skills 抄成 plugin add。不要并装 pulumi-migration。不要抄 npx skills add --agent junie 当 --agent codex。',
  },
  {
    title: 'pulumi/agent-skills',
    url: 'https://github.com/pulumi/agent-skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'Pulumi', '插件'],
    summary:
      'marketplace.json 名是 pulumi-agent-skills。Codex 专节同样是 marketplace add pulumi/agent-skills，再 /plugins 装 pulumi。pulumi 已含 migration 和 delegation。不要发明 plugin add 的 @id。',
  },
  {
    title: 'Brand MCP server',
    url: 'https://brand.pulumi.com/mcp-server/',
    source: 'Pulumi',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Pulumi', 'HTTP'],
    summary:
      '官方 Codex 节是 [mcp_servers.pulumi-brand] url = https://brand.pulumi.com/mcp。远程带 /mcp 后缀。无鉴权，不要 mcp login。不要抄 Claude 的 --transport http 或 mcp-remote。不要和 Cloud 远程 MCP 搞成一台。',
  },
  {
    title: 'Pulumi brand guidelines',
    url: 'https://brand.pulumi.com/',
    source: 'Pulumi',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Pulumi', 'HTTP'],
    summary:
      '品牌站把入口写在 brand.pulumi.com/mcp，Streamable HTTP，无鉴权。优先走 MCP，不要爬页面。这台只给色板、文案和 logo，不会动基础设施。',
  },
  {
    title: 'AI Doc Tools',
    url: 'https://auth0.com/docs/get-started/build-with-ai-tools',
    source: 'Auth0',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Auth0', '文档', 'HTTP'],
    summary:
      '官方 Codex：mcp add auth0-docs-mcp-server --url https://auth0.com/docs/mcp。无鉴权，不要 mcp login。工具是 SearchAuth0Docs。不要抄 Claude 的 --transport http。不要和管理租户的 stdio MCP 搞成一台。',
  },
  {
    title: 'Auth0 Model Context Protocol (MCP) Server',
    url: 'https://auth0.com/docs/get-started/mcp',
    source: 'Auth0',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Auth0'],
    summary:
      '这是管理租户的本地 MCP，不是文档站 auth0.com/docs/mcp。产品页只列 Claude Desktop / Cursor / Windsurf。Codex 节在 GitHub README：mcp add auth0 跑 @auth0/auth0-mcp-server run。不要把两台配成一张表。',
  },
  {
    title: 'auth0/auth0-mcp-server',
    url: 'https://github.com/auth0/auth0-mcp-server',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Auth0', 'stdio'],
    summary:
      '官方 Codex：先 npx @auth0/auth0-mcp-server init，再 mcp add auth0 -- npx -y @auth0/auth0-mcp-server run。stdio，不要 mcp login。不要抄 Linux 写死的 DBUS 路径。不要和文档 HTTP 那台搞成一台。',
  },
  {
    title: 'OpenAI Codex CLI',
    url: 'https://learn.netdata.cloud/docs/netdata-ai/mcp/supported-ai-clients/openai-codex-cli',
    source: 'Learn Netdata',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Netdata', 'HTTP', 'Bearer'],
    summary:
      '官方 Codex Cloud 节：mcp add netdata-cloud --url https://app.netdata.cloud/api/v1/mcp，再 bearer_token_env_var 读 NETDATA_CLOUD_API_TOKEN。不要 mcp login。不要抄 experimental_use_rmcp_client 或 mcp-remote。',
  },
  {
    title: 'Netdata MCP',
    url: 'https://learn.netdata.cloud/docs/netdata-ai/mcp',
    source: 'Learn Netdata',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Netdata', 'HTTP'],
    summary:
      'Cloud 终点是 app.netdata.cloud/api/v1/mcp，Bearer 要 scope:mcp。Codex 走 url + bearer_token_env_var。不要把 Claude 的 --header 或 mcp-remote 抄进 Codex。本机 19999 是另一台。',
  },
  {
    title: 'NVIDIA/skills',
    url: 'https://github.com/NVIDIA/skills',
    source: 'NVIDIA',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'NVIDIA', 'cuOpt'],
    summary:
      '官方 Codex 节是 npx skills add nvidia/skills --skill cuopt-numerical-optimization-api --agent codex。不要省略 --agent codex。不要发明 plugin add nvidia@。先 --list 再装。',
  },
  {
    title: 'Advanced Installation',
    url: 'https://docs.nvidia.com/skills/advanced-install',
    source: 'NVIDIA',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'NVIDIA'],
    summary:
      'Codex 专装：npx skills add nvidia/skills --skill cuopt-numerical-optimization-api --agent codex。项目默认进 .agents/skills/。加 --global --yes 才跟账号走。安装器要 1.5.16+。不要手拷 ~/.codex/skills。',
  },
  {
    title: 'Teach your AI coding agent how to send email with Postmark Skills',
    url: 'https://postmarkapp.com/blog/teach-your-ai-coding-agent-how-to-send-email-with-postmark-skills',
    source: 'Postmark',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Postmark'],
    summary:
      '博客点名 Codex：npx skills add ActiveCampaign/postmark-skills。官方没钉 --agent codex。示例技能是 postmark-send-email。技能教 SDK，不是 MCP。不要发明 plugin add postmark@。',
  },
  {
    title: 'ActiveCampaign/postmark-skills',
    url: 'https://github.com/ActiveCampaign/postmark-skills',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Postmark'],
    summary:
      '安装是 npx skills add ActiveCampaign/postmark-skills，单项加 --skill postmark-send-email。官方没钉 --agent codex。不要发明 plugin add。POSTMARK_SERVER_TOKEN 放进程环境。',
  },
  {
    title: 'Agent Observability MCP and Skills',
    url: 'https://docs.datadoghq.com/llm_observability/build_with_ai/mcp_server/',
    source: 'Datadog',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Datadog', 'MCP'],
    summary:
      '官方点名 Codex CLI。技能是 npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y。官方没钉 --agent codex。不要抄 Restart Claude Code 或 claude mcp add。MCP 仍走 mcp.datadoghq.com/v1/mcp。',
  },
  {
    title: 'datadog-labs/agent-skills',
    url: 'https://github.com/datadog-labs/agent-skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'Datadog'],
    summary:
      'README 点名 Codex CLI。观测技能路径是 datadog-labs/agent-skills/agent-observability。单项示例是 --skill dd-pup --full-depth -y。官方没钉 --agent codex。不要发明 plugin add。',
  },
  {
    title: 'Tavily Agent Skills',
    url: 'https://docs.tavily.com/documentation/agent-skills',
    source: 'Tavily',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Tavily'],
    summary:
      '官方点名 Codex：npx skills add tavily-ai/skills --all。官方没钉 --agent codex。示例技能是 tavily-search。不要发明 mcp add 或 plugin add。技能走 tvly CLI，不是远程 MCP。',
  },
  {
    title: 'tavily-ai/skills',
    url: 'https://github.com/tavily-ai/skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'Tavily'],
    summary:
      '仓库名是 tavily-ai/skills。tvly init 会检测 Codex。单项示例是 --skill tavily-search。官方没钉 --agent codex。不要发明 plugin add。TAVILY_API_KEY 放进程环境。',
  },
  {
    title: 'How to Connect to RudderStack MCP',
    url: 'https://www.rudderstack.com/docs/ai-features/rudderstack-mcp/connect/',
    source: 'RudderStack',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'RudderStack', 'OAuth'],
    summary:
      '官方 Codex 节：把 url 写成 https://mcp.rudderstack.com/mcp，再 mcp login rudderstack。表名是 rudderstack。OAuth，不要 API key。不要抄 Claude 的 --transport http 或 mcp-remote。',
  },
  {
    title: 'RudderStack MCP',
    url: 'https://www.rudderstack.com/docs/ai-features/rudderstack-mcp/',
    source: 'RudderStack',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'RudderStack'],
    summary:
      '官方点名 Codex。远程入口是 https://mcp.rudderstack.com/mcp。能查管道、源、目的地、Tracking Plan，写操作只限 transformation。OAuth，事件值会打码。不要发明 plugin add rudder@。',
  },
  {
    title: 'How to Install RudderStack Agent Skills',
    url: 'https://www.rudderstack.com/docs/ai-features/agent-skills/install/',
    source: 'RudderStack',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'RudderStack'],
    summary:
      '官方安装是 npx skills add rudderlabs/rudder-agent-skills。官方没钉 --agent codex。单项示例是 -a claude-code --skill rudder-cli-workflow。不要抄 /plugin marketplace add。',
  },
  {
    title: 'rudderlabs/rudder-agent-skills',
    url: 'https://github.com/rudderlabs/rudder-agent-skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'RudderStack'],
    summary:
      'installation.md 把 Codex 写成 --agent 旗标 codex，项目进 .agents/skills/，全局 ~/.codex/skills/。示例技能是 rudder-data-catalog。不要抄 Claude 的 /plugin install rudder-core。',
  },
  {
    title: 'MCP Client Configuration',
    url: 'https://kuroco.app/docs/reference/mcp-client-configuration/',
    source: 'Kuroco',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Kuroco', 'OAuth'],
    summary:
      '官方 Codex 节：不支持 CIMD。表名 kuroco，url 写成 g.kuroco.app 的 rcms-api/API_ID/mcp，再 [mcp_servers.kuroco.oauth] 写预注册 client_id，mcp login kuroco。Token Endpoint Auth Method 用 none。',
  },
  {
    title: 'MCP Client Configuration with Authentication Header',
    url: 'https://kuroco.app/docs/reference/mcp-client-configuration-authentication-header/',
    source: 'Kuroco',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Kuroco'],
    summary:
      '官方 Codex 头认证：env_http_headers 把 X-RCMS-API-ACCESS-TOKEN 指到 KUROCO_MCP_TOKEN。不要把 token 写进 http_headers。Admin MCP 不吃这颗头。mcp add 写不了自定义头。',
  },
  {
    title: 'Set Up Wherobots in Codex',
    url: 'https://docs.wherobots.com/develop/agentic-tools/codex',
    source: 'Wherobots',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Wherobots', 'OAuth'],
    summary:
      '官方 Codex 页：表名示例 wherobots-mcp-server，url 写成 api.cloud.wherobots.com/mcp/，再 mcp login。文档仍写 mcp add 只支持 stdio，现行 Codex 用 --url。OAuth 不能注册新账号。不要抄 --transport http，也不要把 API key 写进 http_headers。',
  },
  {
    title: 'wherobots/agent-skills',
    url: 'https://github.com/wherobots/agent-skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'Wherobots'],
    summary:
      '仓库三份技能：wherobots-usage、wherobots-explore、wherobots-develop。官方 Codex 安装是 npx skills add -g wherobots/agent-skills。官方没钉 --agent codex。不要抄 Cursor marketplace。技能不会写 mcp_servers。',
  },
  {
    title: 'Install Agent Skills',
    url: 'https://docs.wherobots.com/develop/agent-skills',
    source: 'Wherobots',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Wherobots'],
    summary:
      '安装页：npx skills add -g wherobots/agent-skills。单项示例是 --skill wherobots-usage，默认不带 -g。VS Code 扩展会自动带技能，Codex 要手工装。官方没钉 --agent codex。',
  },
  {
    title: 'Get Started with Agentic Development',
    url: 'https://docs.wherobots.com/develop/agentic-tools',
    source: 'Wherobots',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'MCP', 'Wherobots'],
    summary:
      '总览把 Codex 标成 Terminal or desktop，MCP、Agent Skills 和 CLI 都要手工配。VS Code 行才是 Included。不要把扩展自动安装抄进 Codex，也不要发明 plugin add wherobots@。',
  },
  {
    title: 'MCP server',
    url: 'https://learn.hex.tech/docs/api-integrations/mcp-server',
    source: 'Hex',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Hex', 'plugins', 'OAuth'],
    summary:
      '官方 Codex 专节：Plugins 搜 Hex，点 Connect，再连捆绑的 Hex app。ChatGPT Business / Enterprise 管理员可能要先在 Workspace settings → Apps 打开 Hex app。Explorer 才能搜项目和 Threads，Editor 才能改 notebook。不要抄 Cursor 的 /add-plugin hex。',
  },
  {
    title: 'Hex is now in Codex',
    url: 'https://hex.tech/blog/hex-in-codex/',
    source: 'Hex',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Hex', 'plugins'],
    summary:
      '2026-06-02 博客：Plugins 先装 Data Analytics plugin，再 Connect Hex。可以从 Codex 拉 Hex Threads，也可以用 CLI 建项目和加 cell。不要发明 plugin add hex@。',
  },
  {
    title: 'Connect Codex to Webflow',
    url: 'https://help.webflow.com/hc/en-us/articles/53625430351507-Connect-Codex-to-Webflow',
    source: 'Webflow',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Webflow', 'plugins', 'OAuth'],
    summary:
      '官方帮助：ChatGPT 桌面切到 Codex，Plugins 搜 Webflow，点 Install，再 Continue to Webflow。只有 Workspace owner、admin 或 Site manager 能授权。不要发明 plugin add webflow@。',
  },
  {
    title: 'Webflow is now available in Codex',
    url: 'https://webflow.com/updates/webflow-in-codex',
    source: 'Webflow',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Webflow', 'plugins', 'Skills'],
    summary:
      '2026-08-24 产品更新：Webflow MCP 2.0 进 Codex。连上后带站点审计、CMS、安全发布等内置技能。当前不消耗 AI credits。不要把 Claude 的 webflow-skills marketplace 抄进 Codex。',
  },
  {
    title: 'Using the MCP Server in Codex',
    url: 'https://docs.omni.co/ai/mcp/codex',
    source: 'Omni',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Omni', 'OAuth'],
    summary:
      '官方 Codex 专节：OAuth 用 callbacks.omniapp.co/callback/mcp。API key 才是实例的 /mcp/https。官方 Option A 漏了 --url。不要抄 http_headers 里的 Bearer，改走 bearer_token_env_var。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'MCP authentication',
    url: 'https://docs.omni.co/ai/mcp/authentication',
    source: 'Omni',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Omni', 'OAuth'],
    summary:
      'OAuth 入口是 callbacks.omniapp.co/callback/mcp；API key 才是实例主机加 /mcp/https。多组织要先登进目标实例。MCP OAuth PAT 跟普通 PAT 不同，Viewer 也能走完流程但查不了数。',
  },
  {
    title: 'MCP server tools',
    url: 'https://docs.omni.co/ai/mcp/tools',
    source: 'Omni',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Omni'],
    summary:
      'getData 和 runQuery 要管理员打开 Single shot query generation，默认关。关掉 Omni Agent 后除 pickModel 外会 403。askOmni 改已有 dashboard 进草稿，新建会立刻发布。',
  },
  {
    title: 'Codex',
    url: 'https://docs.dagu.sh/mcp/clients/codex',
    source: 'Dagu',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Dagu', 'HTTP'],
    summary:
      '官方 Codex 专节：mcp add dagu --url。builtin 鉴权加 --bearer-token-env-var DAGU_MCP_API_KEY。不要把密钥写进 http_headers。不要抄 Claude 的 --transport http。Profile 不要抄成 $CODEX_HOME/.config.toml。',
  },
  {
    title: 'MCP Quickstart',
    url: 'https://docs.dagu.sh/mcp/quickstart',
    source: 'Dagu',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Dagu'],
    summary:
      '本机先 dagu start-all，入口是 http://localhost:8080/mcp。远程换主机仍带 /mcp。base path 漏了会 404。改工作流先 dagu_change 的 preview 再 apply。',
  },
  {
    title: 'MCP Clients',
    url: 'https://docs.dagu.sh/mcp/clients/',
    source: 'Dagu',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Dagu'],
    summary:
      '对照表：Codex 只走 Bearer，而且只从环境变量取。Dagu 只有 Streamable HTTP，没有 SSE。stdio / SSE 客户端才要 mcp-remote，不要抄进 Codex。',
  },
  {
    title: 'How to use the Prefect MCP server',
    url: 'https://docs.prefect.io/v3/how-to-guides/ai/use-prefect-mcp-server',
    source: 'Prefect',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Prefect', 'plugins'],
    summary:
      '官方 Codex CLI 节给本机 stdio：mcp add prefect -- uvx --from prefect-mcp prefect-mcp-server。手写 TOML 错写成 [mcp.prefect]。Cloud 凭据用 PREFECT_API_URL 和 PREFECT_API_KEY。MCP 工具只读，写入走 prefect CLI。目前 beta。',
  },
  {
    title: 'prefect-mcp-server',
    url: 'https://github.com/prefecthq/prefect-mcp-server',
    source: 'PrefectHQ',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Prefect', 'plugins'],
    summary:
      'Codex 插件主路径是 marketplace add prefecthq/prefect-mcp-server，再 plugin add prefect@prefect。Cloud OAuth，插件里不要 API key。已装插件时本机 stdio 要换表名。插件登记的托管入口是 prefect.fastmcp.app/mcp。',
  },
  {
    title: 'SECURITY.md',
    url: 'https://github.com/PrefectHQ/prefect-mcp-server/blob/main/SECURITY.md',
    source: 'PrefectHQ',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Prefect', '安全'],
    summary:
      'MCP 只读凭证拦不住客户端用 prefect CLI 删资源。Cloud OAuth 只覆盖授权时勾选的工作区。自托管 basic auth 用 PREFECT_API_AUTH_STRING，不要和 Cloud API key 混用。',
  },
  {
    title: 'MCP',
    url: 'https://help.gowindmill.com/features/mcp',
    source: 'Windmill',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Windmill', 'OAuth'],
    summary:
      '官方 Codex 专节：mcp add windmill --url https://mcp.gowindmill.com/mcp，再 mcp login。OAuth 后台刷新，不像 Dashboard 大约七天过期。Claude 插件 windmill-dev/windmill-plugin 不是 Codex 路径。',
  },
  {
    title: 'Codex',
    url: 'https://help.gowindmill.com/integrations/codex',
    source: 'Windmill',
    lang: '英文',
    kind: '官方',
    tags: ['Windmill', '分析'],
    summary:
      '这是 Settings → Integrations 的 Codex 用量同步，不是 MCP。要 ChatGPT Enterprise 或 Codex 计划。管理员贴 API key 和 Workspace ID，只读线程 / 额度 / token，不读代码和对话。',
  },
  {
    title: 'Pulse Surveys',
    url: 'https://help.gowindmill.com/features/pulse-surveys',
    source: 'Windmill',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Windmill'],
    summary:
      'Pulse 结果也可以经 MCP 让助手汇总。MCP 只返回你在 Dashboard 里已经能看见的 Pulse。数据会进你连接的那个模型；Windmill 自己的 MCP 服务不把数据送给别的模型。',
  },
  {
    title: 'Codex',
    url: 'https://reui.io/docs/codex',
    source: 'ReUI',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'ReUI', 'OAuth'],
    summary:
      '官方 Codex：mcp add reui --url https://mcp.reui.io，不要加 /mcp。再 mcp login。无头才 bearer_token_env_var REUI_LICENSE_KEY。安装器可能写成 /api/mcp。OAuth 和 bearer 不要叠，否则登录成功仍 401。',
  },
  {
    title: 'MCP Server',
    url: 'https://reui.io/docs/mcp',
    source: 'ReUI',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'ReUI'],
    summary:
      '入口是 mcp.reui.io，Streamable HTTP。工具含 search、get_component、get_install_command、get_agent_skill。PAT 形如 reui_pat_，默认约 90 天过期，mcp login 换不了 PAT。OAuth 刷新大约 60 天。',
  },
  {
    title: 'License Setup',
    url: 'https://reui.io/docs/license-setup',
    source: 'ReUI',
    lang: '英文',
    kind: '官方',
    tags: ['ReUI', 'shadcn'],
    summary:
      'Premium 才把许可证写进 .env.local 和 components.json 的 Bearer ${REUI_LICENSE_KEY}。那是 shadcn CLI 展开的。Codex MCP 用 bearer_token_env_var 读进程环境，不要把占位符抄进 http_headers。',
  },
  {
    title: 'Codex MCP integration',
    url: 'https://alloy.app/guide/integrations/codex-mcp',
    source: 'Alloy',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Alloy', 'OAuth'],
    summary:
      '官方 Codex：mcp add alloy --url，再 mcp login。这是 alloy.app 原型会话，不要和 alloy.cx 或 mcp.index.inc 搞混。无头才 ALLOY_MCP_API_KEY。已有 bearer 表先 mcp remove。',
  },
  {
    title: 'MCP',
    url: 'https://alloy.app/guide/integrations/mcp',
    source: 'Alloy',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Alloy'],
    summary:
      '入口带 /mcp 后缀，Streamable HTTP。Codex 走 mcp add 再 login。X-MCP-API-Key 是 mcp-remote 桥，不是 Codex 头。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'Alloy MCP',
    url: 'https://alloy.app/launches/alloy-mcp',
    source: 'Alloy',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Alloy'],
    summary:
      'Alloy MCP 把原型会话的设计、聊天、文件交给 Codex。连上后贴会话链接，不要手工拷聊天记录。面向 Claude 和 Codex，不是 alloy.cx 那套插件。',
  },
  {
    title: 'Firebase agent skills',
    url: 'https://firebase.google.com/docs/ai-assistance/agent-skills',
    source: 'Firebase',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', '插件', 'Firebase', 'Codex'],
    summary:
      '官方 Codex：marketplace add 再 plugin add firebase@firebase。升级用 marketplace upgrade firebase。README 写成 firebase/skills，以这份专节的 firebase/agent-skills 为准。不要抄 Claude 的 plugin install。',
  },
  {
    title: 'firebase/agent-skills',
    url: 'https://github.com/firebase/agent-skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', '插件', 'Firebase'],
    summary:
      'README Option 4 写成 firebase/skills，文档专节是 firebase/agent-skills。github.com/firebase/skills 会转到这个仓。Codex 以文档专节为准，不要把 npx skills add 当插件安装器。',
  },
  {
    title: 'Firebase MCP server',
    url: 'https://firebase.google.com/docs/ai-assistance/mcp-server',
    source: 'Firebase',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Firebase'],
    summary:
      '这一页没有 Codex 专节。Claude MCP 插件走 firebase/firebase-tools，不要抄 firebase/firebase-tools 当 Codex marketplace。stdio 是 npx firebase-tools mcp，鉴权走 firebase login / ADC，不要 mcp login。',
  },
  {
    title: 'Admin Model Context Protocol (MCP) server',
    url: 'https://www.mintlify.com/docs/ai/mintlify-mcp',
    source: 'Mintlify',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Mintlify', 'OAuth', 'Codex'],
    summary:
      '官方 Codex TOML 指向 mcp.mintlify.com，不要加 /mcp。OAuth。两份官方文档都用了 mintlify 这张表，Admin 和文档检索不要叠成一台。改内容先 checkout 再 save。',
  },
  {
    title: 'Write documentation with Codex',
    url: 'https://www.mintlify.com/docs/guides/codex',
    source: 'Mintlify',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Mintlify', 'AGENTS.md', 'Skills'],
    summary:
      '仓库根放 AGENTS.md。技能是 npx skills add https://mintlify.com/docs，不是插件。这份把 mintlify 表写成 mintlify.com/docs/mcp，会盖掉 Admin 的 mcp.mintlify.com。',
  },
  {
    title: 'Search Model Context Protocol (MCP) server',
    url: 'https://www.mintlify.com/docs/ai/model-context-protocol',
    source: 'Mintlify',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Mintlify'],
    summary:
      '站点检索 MCP 在站点域名 /mcp，Mintlify 自己的是 mintlify.com/docs/mcp。Codex 示例也叫 mintlify 表。只读。不要把 Search MCP 和 Admin MCP 叠成一台。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'squirrelscan for OpenAI Codex',
    url: 'https://docs.squirrelscan.com/developers/agents/codex',
    source: 'squirrelscan',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Squirrelscan', 'Skills', 'Codex'],
    summary:
      '官方 Codex：mcp add squirrelscan 再 mcp login。托管入口必须带斜杠 mcp。不要给 squirrelscan 写 experimental_environment。技能是 npx skills add squirrelscan/squirrelscan，不是插件。',
  },
  {
    title: 'MCP client setup',
    url: 'https://docs.squirrelscan.com/developers/mcp-clients',
    source: 'squirrelscan',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Squirrelscan', 'OAuth', 'Codex'],
    summary:
      'Codex 专节：url 指向托管 MCP，再 mcp login。codex mcp add 只写全局配置。SQUIRRELSCAN_API_KEY 才是无头路径。OAuth 和 bearer 不要叠进同一张表。',
  },
  {
    title: 'Hosted MCP server',
    url: 'https://docs.squirrelscan.com/developers/mcp',
    source: 'squirrelscan',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Squirrelscan'],
    summary:
      'Streamable HTTP。run_audit 超阈值要二次 confirm。本地 squirrel mcp 是免费 stdio 引擎，没有 issue tracker。不要和托管 HTTP 写成同一张表。',
  },
  {
    title: 'PlanetScale Codex Plugin',
    url: 'https://github.com/planetscale/codex-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['插件', 'PlanetScale', 'MCP', 'Skills', 'Codex'],
    summary:
      '官方 Codex 插件仓。marketplace add planetscale/codex-plugin，再 plugin add planetscale@planetscale。不要把 Claude 的 planetscale/claude-plugin 加成 Codex 源。插件 MCP 表名是 PlanetScale。',
  },
  {
    title: 'planetscale/skills',
    url: 'https://github.com/planetscale/skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'PlanetScale'],
    summary:
      'PlanetScale 操作技能上游。Codex 插件会 vendor 进来，索引在 skills/planetscale。示例是 safe-orchestrator。不要用 npx skills add 当 Codex 插件安装器。',
  },
  {
    title: 'planetscale/database-skills',
    url: 'https://github.com/planetscale/database-skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'PlanetScale', '数据库'],
    summary:
      '引擎技能上游：MySQL、Postgres、Vitess、Neki。Codex 插件 vendor 后带 database- 前缀，例如 database-mysql。不要和操作技能仓抄成同一个 marketplace 源。',
  },
  {
    title: 'GEOly MCP User Guide',
    url: 'https://www.geoly.ai/docs/mcp',
    source: 'GEOly Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'GEOly', '插件', 'Codex'],
    summary:
      '官方 Codex 专节：marketplace add geoly-ai/codex-plugins，再 plugin add geoly-mcp@geoly。过时工具先 upgrade geoly 再重装插件。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'GEOly Codex plugin marketplace',
    url: 'https://github.com/geoly-ai/codex-plugins',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['插件', 'GEOly', 'MCP', 'Skills', 'Codex'],
    summary:
      '自托管 marketplace。CLI 动词是 plugin add 不是 install。marketplace upgrade geoly 不够还要再 plugin add。清单 name 是 geoly，插件名是 geoly-mcp。',
  },
  {
    title: 'GEOly MCP Server',
    url: 'https://github.com/geoly-ai/GEOly-MCP',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'GEOly', 'OAuth'],
    summary:
      '托管 Streamable HTTP。远程入口写 app.geoly.ai/api/mcp，不要再拼一层斜杠 mcp。Codex 走插件仓，不要抄 mcp-remote 当 Codex 主路径。',
  },
  {
    title: 'Cortex Code Skill',
    url: 'https://github.com/Snowflake-Labs/subagent-cortex-code',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'Snowflake', 'Cortex', 'Codex'],
    summary:
      'Codex 不要跑 npx skills add，改走 integrations/codex/install.sh 装 cortexcode-tool。先确认 which cortex 有路径。不要发明 plugin add。',
  },
  {
    title: 'Cortex Code for Codex — CLI Install',
    url: 'https://github.com/Snowflake-Labs/subagent-cortex-code/blob/main/integrations/codex/README.md',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['CLI', 'Snowflake', 'Cortex', 'Codex'],
    summary:
      '默认 envelope 是 RO，聊天批准后再带 --yes。不要后台 disown。配置在 ~/.local/lib/cortexcode-tool/config.yaml。',
  },
  {
    title: 'CoCo CLI',
    url: 'https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code-cli',
    source: 'Snowflake Docs',
    lang: '英文',
    kind: '官方',
    tags: ['CLI', 'Snowflake', 'Cortex'],
    summary:
      '命令是 cortex，连接写在 ~/.snowflake/connections.toml。which cortex 要有路径。官方写中国大陆不可用。这不是 Codex 的 mcp add。',
  },
  {
    title: 'GitLab Orbit Local MCP server',
    url: 'https://docs.gitlab.com/orbit/local/access/mcp/',
    source: 'GitLab Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'GitLab', 'Orbit', 'stdio', 'Codex'],
    summary:
      '官方 Codex 节是 mcp add orbit-cli -- orbit mcp serve。glab 包装是 glab orbit mcp serve。查本机 DuckDB 图谱，不是 GitLab 实例。不要 mcp login，也不要抄 Claude 的 --scope。',
  },
  {
    title: 'GitLab Orbit CLI',
    url: 'https://docs.gitlab.com/orbit/local/access/cli/',
    source: 'GitLab Docs',
    lang: '英文',
    kind: '官方',
    tags: ['CLI', 'GitLab', 'Orbit', 'Codex'],
    summary:
      '独立二进制 orbit，图谱默认 ~/.orbit/graph.duckdb。orbit mcp serve 提供 index、get_graph_schema、run_sql。orbit setup codex 会写 AGENTS.md，不是 MCP 安装器。',
  },
  {
    title: 'GitLab Orbit Remote MCP',
    url: 'https://docs.gitlab.com/orbit/remote/access/mcp/',
    source: 'GitLab Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'GitLab', 'Orbit', 'mcp-remote'],
    summary:
      '远程入口是 gitlab.com/api/v4/orbit/mcp。官方给 Codex 的示例仍是 npx mcp-remote，不要当 Codex 主路径。不要和本地 orbit-cli 或实例 api/v4/mcp 写成同一张表。',
  },
  {
    title: 'Connecting Codex CLI to n8n MCP server',
    url: 'https://docs.n8n.io/connect/connect-to-n8n-mcp-server/mcp-client-examples/',
    source: 'n8n Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'n8n', 'OAuth', 'Codex'],
    summary:
      '官方 Codex 节是 mcp add n8n --url，路径是 mcp-server/http，再 mcp login n8n。不要抄 experimental_use_rmcp_client。API key 示例把 Bearer 写进 http_headers，不要抄。',
  },
  {
    title: 'Connect to n8n MCP server',
    url: 'https://docs.n8n.io/connect/connect-to-n8n-mcp-server/',
    source: 'n8n Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'n8n', 'OAuth'],
    summary:
      '先打开 Instance-level MCP。Server URL 以 mcp-server/http 结尾，不要贴编辑器地址。工作流还要单独打开 Available in MCP。技能仓是 n8n-io/skills。',
  },
  {
    title: 'n8n-io/skills',
    url: 'https://github.com/n8n-io/skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'n8n', '插件', 'Codex'],
    summary:
      'Codex 是 marketplace add n8n-io/skills，再 plugin add n8n-skills@n8n-io。插件不会登记 MCP，还要 mcp add n8n-mcp。不要和文档表名 n8n 叠成两台。不要用 npx skills add 当插件安装器。',
  },
  {
    title: 'Endor Labs MCP server in OpenAI Codex',
    url: 'https://docs.endorlabs.com/setup-deployment/mcp/codex',
    source: 'Endor Labs Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Endor Labs', 'stdio', 'Codex'],
    summary:
      '官方 Codex 节是 mcp add endor-cli-tools -- npx -y endorctl ai-tools mcp-server。stdio，不要 mcp login。企业版用 ENDOR_MCP_SERVER_AUTH_TENANT 这类 env_vars，不要写成 --env 字面量。',
  },
  {
    title: 'Documentation MCP server',
    url: 'https://docs.endorlabs.com/introduction/docs-mcp-server',
    source: 'Endor Labs Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Endor Labs', '文档', 'Codex'],
    summary:
      '远程是 docs.endorlabs.com/mcp，无鉴权。Codex 会误探 OAuth。官方权宜是占位 ENDOR_DOCS_KEY=dummy，再 bearer_token_env_var。不要和扫描表 endor-cli-tools 写成同一张。',
  },
  {
    title: 'Endor Labs Agent Kit in OpenAI Codex',
    url: 'https://docs.endorlabs.com/secure-ai-coding/agent-kit/codex',
    source: 'Endor Labs Docs',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Endor Labs', 'Skills', 'Codex'],
    summary:
      '官方 Codex 页是 marketplace add endorlabs/ai-plugins，带两个 --sparse。文档没写 plugin add。清单 name 是 endor-labs-agent-kit。不要抄 Claude 的 @endorlabs。这不是扫描 MCP。',
  },
  {
    title: 'Deploy hooks for Codex',
    url: 'https://docs.endorlabs.com/agent-governance/codex',
    source: 'Endor Labs Docs',
    lang: '英文',
    kind: '官方',
    tags: ['hooks', 'Endor Labs', 'Codex'],
    summary:
      'Coding Agent Governance 用 endorctl ai-audit codex 写进 hooks 表。不要把 API 密钥写进 command 字面量，也不要同时 export ENDOR_TOKEN。这不是 mcp add endor-cli-tools。',
  },
  {
    title: 'Set up the ClickHouse MCP server',
    url: 'https://clickhouse.com/docs/guides/use-cases/ai-ml/MCP/claude-desktop',
    source: 'ClickHouse Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'ClickHouse', 'stdio', 'Codex'],
    summary:
      '官方 Codex 节是 mcp add mcp-clickhouse，命令是 uv run --with mcp-clickhouse --python 3.10。不要抄 --env 把密码写进 TOML。不要和 Cloud 那张 clickhouse-cloud 表搞混。',
  },
  {
    title: 'ClickHouse/mcp-clickhouse',
    url: 'https://github.com/ClickHouse/mcp-clickhouse',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'ClickHouse', 'stdio'],
    summary:
      '默认 CLICKHOUSE_ALLOW_WRITE_ACCESS 是 false。stdio 不要 mcp login。不要把 CLICKHOUSE_MCP_SERVER_TRANSPORT 改成 http 当 Codex 主路径。',
  },
  {
    title: 'ClickStack MCP server',
    url: 'https://clickhouse.com/docs/clickstack/mcp',
    source: 'ClickHouse Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'ClickHouse', 'ClickStack'],
    summary:
      'Cloud 观测入口是 mcp.clickhouse.cloud/clickstack。官方页没有 Codex 专节，只有 Claude / Cursor JSON。不要和 mcp-clickhouse stdio 或 clickhouse-cloud 那张表写成一台。',
  },
  {
    title: 'jfrog/codex-plugin',
    url: 'https://github.com/jfrog/codex-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'JFrog', 'MCP', 'Codex'],
    summary:
      '官方 Codex：marketplace add jfrog/codex-plugin，再 plugin add jfrog@codex-plugin。MCP 主机写在插件 .mcp.json。export JFROG_PLATFORM_URL 不会登记 MCP；连不上先跑 jfrog-init，不要只重装插件。',
  },
  {
    title: 'Add the JFrog MCP Server to an MCP Client',
    url: 'https://docs.jfrog.com/integrations/docs/add-the-jfrog-mcp-server-to-an-mcp-client',
    source: 'JFrog Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'JFrog', 'OAuth'],
    summary:
      'Codex 节仍抄 mcpServers JSON，用户层应写成 mcp add jfrog --url https://acme.jfrog.io/mcp，再 mcp login。管理员要先打开实例 MCP。路径是 /mcp。不要把 JSON 贴进 config.toml。',
  },
  {
    title: 'OpenAI Codex | JFrog',
    url: 'https://jfrog.com/integrations/openai-codex/',
    source: 'JFrog',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'JFrog', 'Codex'],
    summary:
      '产品页说明 Codex 插件接 Artifactory、包审查和 Agent Guard。可执行安装命令在 jfrog/codex-plugin 仓库，不要只停在这篇营销文。',
  },
  {
    title: 'Nowledge Mem · Codex CLI',
    url: 'https://mem.nowledge.co/docs/integrations/codex-cli',
    source: 'Nowledge Mem Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Codex', '插件', 'MCP', 'hooks', 'Nowledge'],
    summary:
      '官方 Codex：两个 --sparse 再 plugin add nowledge-mem@nowledge-community。捆绑 MCP 是本机 14242。不要 mcp login。远程才覆盖用户层 MCP。装完跑 hook 脚本。同时开 Codex 本地 Memory 时关掉 tool-assisted 生成。',
  },
  {
    title: 'nowledge-co/community',
    url: 'https://github.com/nowledge-co/community',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['插件', 'Nowledge', 'marketplace', 'Codex'],
    summary:
      'marketplace name 是 nowledge-community，插件 name 是 nowledge-mem，source.path 是 ./nowledge-mem-codex-plugin。Codex 只要 .agents 和这个包，不要全量 clone。不要抄 Claude 的 marketplace add 完整 GitHub URL。',
  },
  {
    title: 'Nowledge Mem Connect Skill',
    url: 'https://mem.nowledge.co/SKILL.md',
    source: 'Nowledge Mem Docs',
    lang: '英文',
    kind: '官方',
    tags: ['nmem', 'MCP', 'Codex', 'Nowledge'],
    summary:
      '通用安装 SOP。先 nmem doctor。Codex 行仍是 sparse marketplace 加 plugin add，再跑 install_hooks.py。本机 MCP 默认 127.0.0.1:14242/mcp/。远程用 nmem config mcp show --host codex 生成覆盖块，不要手写密钥进聊天。',
  },
  {
    title: 'Registry MCP server',
    url: 'https://docs.solo.io/agentregistry/latest/setup/mcp-server/',
    source: 'Solo Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Solo', 'agentregistry', 'Codex', 'OAuth'],
    summary:
      '官方 Codex：mcp add agentregistry --url，本机 31313/mcp。静态令牌 bearer_token_env_var ARCTL_TOKEN。生产 OAuth 才 --oauth-resource 再 mcp login --scopes openid,profile。只读目录，不会调用登记的 MCP。Helm 键是 mcpBridgeUrl。',
  },
  {
    title: 'arctl configure',
    url: 'https://docs.solo.io/agentregistry/latest/reference/cli/arctl-configure/',
    source: 'Solo Docs',
    lang: '英文',
    kind: '官方',
    tags: ['CLI', 'Solo', 'agentregistry'],
    summary:
      '子命令只有 claude-code、cursor、vscode、kiro。arctl configure 没有 Codex。默认 URL 是 localhost:21212/mcp，那是 agentgateway，不是注册表桥 31313。不要把写出的 JSON 贴进 Codex TOML。',
  },
  {
    title: 'arctl CLI',
    url: 'https://docs.solo.io/agentregistry/latest/reference/cli/',
    source: 'Solo Docs',
    lang: '英文',
    kind: '官方',
    tags: ['CLI', 'Solo', 'arctl'],
    summary:
      '先 arctl user login，再用 arctl user info --show-tokens 取 access_token 放进 ARCTL_TOKEN。REST 默认 localhost:12121，不要和 MCP 桥搞混。',
  },
  {
    title: 'affaan-m/ECC',
    url: 'https://github.com/affaan-m/ECC',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', '插件', 'ECC', 'Codex'],
    summary:
      'Codex 原生插件是 marketplace add affaan-m/ECC，再 plugin add ecc@ecc。不要叠 sync-ecc-to-codex.sh。卸遗留层用 node scripts/ecc.js uninstall --legacy-codex-sync，不会动会话记录。',
  },
  {
    title: 'ECC Codex native plugin',
    url: 'https://github.com/affaan-m/ECC/blob/main/.codex-plugin/README.md',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'ECC', 'hooks', 'Codex'],
    summary:
      '0.146.0 起用 plugin add。marketplace 入口必须是仓库根。281 个技能的源在仓库根 skills/，不要复制进 .codex-plugin/。默认 MCP 只剩 chrome-devtools。',
  },
  {
    title: 'ECC configure-ecc skill',
    url: 'https://github.com/affaan-m/ECC/blob/main/skills/configure-ecc/SKILL.md',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'ECC', 'hooks', 'Codex'],
    summary:
      '检测为 Codex 时不要问 Claude 的四档钩子。没有 user / project / local。先 marketplace add 或 upgrade ecc，再 plugin add ecc@ecc --json，用返回的 installedPath 跑 welcome.js。',
  },
  {
    title: 'matlab/matlab-mcp-server',
    url: 'https://github.com/matlab/matlab-mcp-server',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'MATLAB', 'stdio', 'Codex'],
    summary:
      '官方 Codex 节是 mcp add matlab -- 本机二进制绝对路径。stdio，不要 mcp login。可从源码 go install github.com/matlab/matlab-mcp-server/cmd/matlab-mcp-server@latest。不要抄 Claude 的 --transport stdio 或 .mcpb。',
  },
  {
    title: 'Codex does not forward WINDIR to MATLAB MCP',
    url: 'https://github.com/matlab/matlab-mcp-server/issues/32',
    source: 'matlab/matlab-mcp-server#32',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'MATLAB', 'Windows', 'WINDIR'],
    summary:
      'Codex 起 stdio 子进程时不转发 WINDIR，Windows 上 MATLAB / Simulink 会崩。补 env_vars = ["WINDIR"]。mcp add 不会写这行。',
  },
  {
    title: 'MATLAB R2025b Simulink crash via Codex MCP on Windows',
    url: 'https://www.mathworks.com/matlabcentral/answers/2183464-why-does-matlab-r2025b-crash-when-opening-simulink-through-matlab-mcp-core-server-on-windows-with-co',
    source: 'MATLAB Answers',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'MATLAB', 'Simulink', 'Windows'],
    summary:
      '官方复现是 PowerShell Remove-Item Env:\\WINDIR 后再开 Simulink。Answers 把 Codex 表写成 matlab-core，官方 README 是 matlab。改完要重启 Codex 和 MATLAB。',
  },
  {
    title: 'SurrealDB Codex',
    url: 'https://surrealdb.com/docs/agents/codex',
    source: 'SurrealDB Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'SurrealDB', 'OAuth', 'Codex'],
    summary:
      '官方 Codex 节是 mcp add surrealdb --url https://mcp.surrealdb.com，不要加 /mcp。无头变量名是 SURREALDB_TOKEN。技能是 npx skills add surrealdb/agent-skills，官方没钉 --agent codex。',
  },
  {
    title: 'surrealdb/ai-codex-plugin',
    url: 'https://github.com/surrealdb/ai-codex-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'SurrealDB', 'MCP', 'Codex'],
    summary:
      'marketplace add surrealdb/ai-codex-plugin，再 plugin add surrealdb@surrealdb。现行清单没有 spectron@surrealdb。agent-memory 和 surrealdb 共用托管入口会重复工具面。本机插件才读 SURREALDB_MCP_URL。',
  },
  {
    title: 'SurrealDB hosted MCP',
    url: 'https://mcp.surrealdb.com/',
    source: 'SurrealDB',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'SurrealDB', 'OAuth'],
    summary:
      '托管 MCP 在主机根，和 api.surrealdb.com/api/mcp 是同一挂载。Codex 是 mcp add 再 mcp login。TOML 示例写过 auth = oauth。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'Local Agent Proxy',
    url: 'https://infisical.com/docs/documentation/platform/agent-proxy/local-agent-proxy',
    source: 'Infisical Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Infisical', 'Agent Proxy', 'Codex', 'sandbox'],
    summary:
      '官方点名 Codex：infisical secrets agent-proxy run -e dev --path=/coding-agent -- codex。真实密钥只在代理内存里换真，Codex 只看见 ghp_ 占位符。沙箱允许写 ~/.codex。不要给 run 传 --proxy。',
  },
  {
    title: 'infisical secrets agent-proxy',
    url: 'https://infisical.com/docs/cli/commands/agent-proxy',
    source: 'Infisical Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Infisical', 'CLI', 'Codex'],
    summary:
      'run 管本机会话；connect 才接已有代理，示例是 connect --proxy=… --env=staging -- codex。Windows 无沙箱时 run 会拒绝，除非 --no-sandbox。',
  },
  {
    title: 'Set up credentials',
    url: 'https://infisical.com/docs/documentation/platform/agent-proxy/quickstart',
    source: 'Infisical Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Infisical', 'Agent Proxy', 'GitHub'],
    summary:
      '先在 /coding-agent 放密钥和 proxied service，GitHub 模板会注入 GITHUB_TOKEN 占位符。本地会话选 Local Proxy，点名 Claude Code、Codex 或脚本。',
  },
  {
    title: 'Set up a remote Postman MCP server',
    url: 'https://learning.postman.com/docs/reference/postman-api/postman-mcp-server/postman-mcp-remote-server',
    source: 'Postman Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Postman', 'OAuth', 'Codex'],
    summary:
      '官方 Codex 节是 mcp add postman --url。Postman MCP 远程分四条 Streamable HTTP 面：Minimal、Code、Full、Learn。US 默认 OAuth；EU 只有 API key。不要抄 experimental_use_rmcp_client 或 Claude 的 --header。',
  },
  {
    title: 'Set up a local Postman MCP server',
    url: 'https://learning.postman.com/docs/reference/postman-api/postman-mcp-server/postman-mcp-local-server',
    source: 'Postman Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Postman', 'stdio', 'Codex'],
    summary:
      '官方 Codex 节是 npx @postman/postman-mcp-server。文档用 --env 写密钥，不要抄；改用 env_vars。EU 加 --region eu。不要和远程 postman 表叠。不要发明 plugin add。',
  },
  {
    title: 'postmanlabs/postman-mcp-server',
    url: 'https://github.com/postmanlabs/postman-mcp-server',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Postman', 'Codex'],
    summary:
      '源码仓。Codex 远程和本机安装说明在 Postman Learning 的 Codex CLI 专节。不要把仓库 README 里的 Cursor JSON 或 Claude --transport http 抄进 config.toml。',
  },
  {
    title: 'Codex CLI integration',
    url: 'https://docs.apify.com/integrations/codex-cli',
    source: 'Apify Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Apify', '插件', 'Codex'],
    summary:
      '官方 Codex CLI：/plugins 加 marketplace apify/apify-codex-plugin。Apify Codex 插件仓 name 是 apify-plugins，再 plugin add apify@apify-plugins。插件会登记 MCP，不要再 mcp add 叠一张。',
  },
  {
    title: 'Codex in the ChatGPT desktop app',
    url: 'https://docs.apify.com/integrations/codex-app',
    source: 'Apify Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Apify', '插件', '桌面'],
    summary:
      '桌面切到 Codex，Plugins → Add marketplace → apify/apify-codex-plugin，再在 Personal 装 Apify。装完走 OAuth。无头才进程里的 APIFY_TOKEN。不要抄 Cursor JSON 的 Bearer。',
  },
  {
    title: 'apify/apify-codex-plugin',
    url: 'https://github.com/apify/apify-codex-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Apify', '插件', 'Codex'],
    summary:
      '官方插件仓。捆绑远程 MCP 和五条技能。部分技能要本机 apify-cli。不要把手写 mcp add 和插件表叠成两台。不要用 apify/agent-skills 当这份安装器。',
  },
  {
    title: 'How to use Nylas MCP with Codex CLI',
    url: 'https://developer.nylas.com/docs/cookbook/ai/mcp/codex-cli/',
    source: 'Nylas Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Nylas', 'Bearer', 'Codex'],
    summary:
      '官方 Codex 专节把 Bearer 写进 bearer_token_env_var。US 入口没有 /mcp 后缀。不要 mcp login，不要抄 mcp-remote。发信要先 confirm_send_message。',
  },
  {
    title: 'Nylas MCP server',
    url: 'https://developer.nylas.com/docs/dev-guide/mcp/',
    source: 'Nylas Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Nylas', 'Bearer'],
    summary:
      'Codex CLI 可用 nylas mcp install --assistant codex。手写 TOML 表名是 nylas。不要抄 Claude Desktop 的 mcp-remote 或 Cursor JSON 的 Bearer。EU 换 mcp.eu.nylas.com。',
  },
  {
    title: 'Microsoft Learn MCP Server',
    url: 'https://github.com/MicrosoftDocs/mcp',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Microsoft Learn', 'Codex'],
    summary:
      '仓库 README 给 Codex 一行 mcp add microsoft-learn --url。远程是 learn.microsoft.com/api/mcp，无鉴权。插件清单名是 microsoftdocs-local，不要抄 Claude 的 microsoft-docs-marketplace。',
  },
  {
    title: 'Microsoft Learn MCP Server overview',
    url: 'https://learn.microsoft.com/en-us/training/support/mcp',
    source: 'Microsoft Learn',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Microsoft Learn', '文档'],
    summary:
      'Learn 产品页没有 Codex 安装表，命令以仓库 README 的 Codex 行为准。公开文档无鉴权。浏览器打开常 405。不要和 Azure MCP 搞成一台。',
  },
  {
    title: 'dotnet/skills',
    url: 'https://github.com/dotnet/skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', '.NET', '插件', 'Codex'],
    summary:
      '官方 Codex：marketplace add dotnet/skills，再 /plugins 装。清单名是 dotnet-agent-skills。README 的 Copilot 节是斜杠 plugin install，不要抄进 Codex。不要和 microsoft/azure-skills 搞成同一份。',
  },
  {
    title: 'Helicone MCP Server',
    url: 'https://docs.helicone.ai/integrations/tools/mcp',
    source: 'Helicone Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Helicone', 'stdio', 'Codex'],
    summary:
      '文档 Codex 块把 sk-helicone 占位写进 env 表，要用 env_vars。官方是 npx @helicone/mcp@latest 本地 stdio，表名 helicone。不要 mcp login，不要发明 plugin add。',
  },
  {
    title: 'helicone-mcp',
    url: 'https://github.com/Helicone/helicone/tree/main/helicone-mcp',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Helicone', 'stdio'],
    summary:
      '源仓 README 给的仍是 mcpServers JSON 加 HELICONE_API_KEY 字面量。Codex 对照改成 [mcp_servers.helicone] 和 env_vars。基址写死 api.helicone.ai，欧盟密钥会 401。',
  },
  {
    title: 'Get started with Docker MCP Toolkit',
    url: 'https://docs.docker.com/ai/mcp-catalog-and-toolkit/get-started/',
    source: 'Docker Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Docker', 'Codex', 'stdio'],
    summary:
      '官方核对是 codex mcp list 里 MCP_DOCKER 的 Auth 列 Unsupported。Desktop 4.62+ 开 Beta Toolkit。测试句要 profile 里已有 GitHub。不要抄同页 Claude JSON。',
  },
  {
    title: 'docker mcp client connect',
    url: 'https://docs.docker.com/reference/cli/docker/mcp/client/connect/',
    source: 'Docker Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Docker', 'CLI', 'Codex'],
    summary:
      '支持的客户端名单含 codex。必须 --global / -g，可选 --profile。漏掉全局旗标会报 only supports global configuration。不要抄 vscode 那种项目级 mcp.json。',
  },
  {
    title: 'amd/skills',
    url: 'https://github.com/amd/skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'AMD', '插件', 'Codex'],
    summary:
      'README 仍写 Until marketplace integration lands，现行 Codex 走 marketplace add amd/skills。再 plugin add amd-skills@amd-skills。npx skills add 不是插件安装器。插件没有 MCP。',
  },
  {
    title: 'amd/skills marketplace.json',
    url: 'https://github.com/amd/skills/blob/main/.agents/plugins/marketplace.json',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'AMD', '插件', 'marketplace'],
    summary:
      '清单 name 和插件 name 都是 amd-skills，source.path 是仓库根。ON_INSTALL 会在安装时弹信任提示。upgrade 用清单名 amd-skills，不要写成仓库路径 amd/skills。',
  },
  {
    title: 'Danube · Codex CLI',
    url: 'https://docs.danubeai.com/mcp-clients/codex-cli',
    source: 'Danube Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Danube', 'bearer', 'Codex'],
    summary:
      '文档承认 mcp add 设不了自定义头，改走 bearer_token_env_var DANUBE_API_KEY。远程是 mcp.danubeai.com/mcp。不要把 dk_ 写进 http_headers。不要 mcp login。',
  },
  {
    title: 'danube-mcp',
    url: 'https://github.com/danubeai/danube-mcp',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Danube', 'HTTP'],
    summary:
      '源仓 README 只给 Claude mcpServers JSON 和 danube-api-key 字面量。Codex 对照改成 [mcp_servers.danube] 加 bearer_token_env_var。不要抄 type = streamable-http。',
  },
  {
    title: "Connecting Coding Clients to Asana's V2 server",
    url: 'https://developers.asana.com/docs/connecting-mcp-clients-to-asanas-v2-server',
    source: 'Asana Developers',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Asana', 'Codex', 'OAuth'],
    summary:
      'Asana 不支持 DCR，Codex 节把 client_secret 放进 @ 前缀的 json 文件。stdio 桥是 mcp-remote@latest，Redirect 是 localhost:3334/oauth/callback。不要 mcp add --url，也不要抄 Claude / Cursor。',
  },
  {
    title: "Integrating with Asana's MCP Server",
    url: 'https://developers.asana.com/docs/integrating-with-asanas-mcp-server',
    source: 'Asana Developers',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Asana', 'OAuth'],
    summary:
      '先建 MCP app，再预注册 client id / secret。resource 是 https://mcp.asana.com/v2，服务器 URL 才带 /mcp。V1 /sse 已弃用。MCP token 不能打普通 REST。',
  },
  {
    title: 'Install Sequel MCP',
    url: 'https://sequel.sh/docs/install',
    source: 'Sequel Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Sequel', 'Codex'],
    summary:
      'Codex slug 是 codex，只 global，不装 SKILL.md。远程是 api.sequel.sh/mcp。CLI 是 sequel install codex。手写对照 mcp add 加 bearer_token_env_var，不要 mcp login。',
  },
  {
    title: 'How to Connect PostgreSQL to OpenAI Codex Using Sequel',
    url: 'https://sequel.sh/blog/connect-postgresql-codex',
    source: 'Sequel Blog',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'Sequel', 'Codex', 'PostgreSQL'],
    summary:
      '营销页写成 ~/.codex/config.yaml 和 headers 里的 sql_ 密钥，Codex 对照改 toml。博客给的是 [mcp_servers.sequel] 加 bearer_token_env_var = SEQUEL_API_KEY。不要 mcp login。',
  },
  {
    title: 'Connect MCPs to AI assistants and coding agents',
    url: 'https://docs.databricks.com/aws/en/agents/mcp-tools/connect-clients',
    source: 'Databricks Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Databricks', 'Codex', 'ug'],
    summary:
      'ug 是主命令，ucode 只是别名；configure mcp 会整表替换，加服务器用 mcp add。Codex 节是 ug mcp add --agents codex。stdio 桥是 ug mcp-proxy，不要抄 Cursor 的 mcp-remote。',
  },
  {
    title: 'databricks/unity-gateway',
    url: 'https://github.com/databricks/unity-gateway',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Databricks', 'ug', 'Codex'],
    summary:
      '安装是 uv tool install git+https://github.com/databricks/unity-gateway。Codex 配置可能写在 ~/.codex/ucode.config.toml。启动用 ug codex。MCP 全是 ug mcp-proxy stdio。',
  },
  {
    title: 'Agent Skills & Plugins',
    url: 'https://salesforcecommercecloud.github.io/b2c-developer-tooling/guide/agent-skills',
    source: 'B2C Developer Toolkit',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Salesforce', 'B2C', 'Codex'],
    summary:
      'Codex 清单名是 b2c-developer-tooling，MCP 插件 id 是 b2c-dx-mcp@b2c-developer-tooling。技能先装 b2c 和 b2c-cli。不要抄 Claude 的 plugin install。',
  },
  {
    title: 'SalesforceCommerceCloud/b2c-developer-tooling',
    url: 'https://github.com/SalesforceCommerceCloud/b2c-developer-tooling',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Salesforce', 'B2C', 'plugins'],
    summary:
      'marketplace.json 含 b2c-dx-mcp。插件 .mcp.json 是 npx @salesforce/b2c-dx-mcp，没有 --allow-non-ga-tools。README 仍写 Claude Code only，以 Codex 专节和清单为准。',
  },
  {
    title: 'Codex and Expo',
    url: 'https://docs.expo.dev/agents/codex/',
    source: 'Expo Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Expo', '插件', 'Codex'],
    summary:
      '官方 Codex：codex plugin add expo@openai-curated，再 mcp login expo。一条命令装 Skills 并登记 MCP。不要抄 Claude 的 expo@claude-plugins-official。npx skills add 不是 Codex 安装器。',
  },
  {
    title: 'Using Model Context Protocol (MCP) with Expo',
    url: 'https://docs.expo.dev/mcp/',
    source: 'Expo Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Expo', 'OAuth', 'EAS'],
    summary:
      '官方远程是 mcp.expo.dev/mcp，带 /mcp。插件已装就只跑 mcp login expo。手写才 mcp add expo --url。本地截图要 expo-mcp 和 EXPO_UNSTABLE_MCP_SERVER=1。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'Glean Plugin for Codex',
    url: 'https://developers.glean.com/guides/mcp/codex',
    source: 'Glean Developer',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Glean', '插件', 'Codex'],
    summary:
      '官方 Codex：marketplace add gleanwork/codex-plugins，再 plugin add glean@glean-codex-plugins。组织 MCP URL 还要自己 mcp add glean，再 mcp login glean。不要抄 Claude 的 glean@glean-plugins。',
  },
  {
    title: 'Set up the Glean plug-in in Codex',
    url: 'https://docs.glean.com/user-guide/mcp/glean-plugin-codex',
    source: 'Glean Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Glean', 'OAuth', 'Codex'],
    summary:
      '用户指南：先从 MCP Configurator 抄组织地址和服务器名。验证句是 Search for my company onboarding docs in Glean。装完要新开 Codex 任务。不要把 /glean_run 当 Codex 斜杠。',
  },
  {
    title: 'gleanwork/codex-plugins',
    url: 'https://github.com/gleanwork/codex-plugins',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Glean', 'Skills', 'Codex'],
    summary:
      '清单名是 glean-codex-plugins。可选第二插件 glean-dev-docs@glean-codex-plugins，公共文档 MCP 是 developers.glean.com/mcp。README 还写 Set up Glean for me。不要手改这份 generated 仓。',
  },
  {
    title: 'Bring Your Own AI Agent (MCP)',
    url: 'https://help.calendarbridge.com/user-docs/bring-your-own-agent-mcp/',
    source: 'CalendarBridge Help',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'CalendarBridge', 'OAuth', 'Codex'],
    summary:
      '官方 Codex CLI：mcp add calendarbridge --url 走 manageapi.calendarbridge.com/mcp。连上免费，改日历要有效订阅。OAuth 2.1，不要 API key。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'Bring Your Own AI Agent to CalendarBridge',
    url: 'https://help.calendarbridge.com/announcements/bring-your-own-agent/',
    source: 'CalendarBridge Help',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'CalendarBridge', 'Codex'],
    summary:
      '公告写明 Codex 在客户端名单里。连接走 OAuth，没有长效 key。动作要订阅。不要和邮件 Scheduling Assistant 搞成同一条安装路径。',
  },
  {
    title: 'Install Vibe Prospecting in Codex',
    url: 'https://github.com/explorium-ai/vibeprospecting-plugin/blob/main/docs/install-codex.md',
    source: 'GitHub',
    lang: '英文',
    kind: '教程',
    tags: ['插件', 'Vibe Prospecting', 'Codex'],
    summary:
      '官方 Codex：marketplace add explorium-ai/vibeprospecting-plugin，再 plugin add vpai@vibeprospecting。认证走 vpai login 再 --poll，不是 codex mcp login。upgrade 用清单名 vibeprospecting。',
  },
  {
    title: 'explorium-ai/vibeprospecting-plugin',
    url: 'https://github.com/explorium-ai/vibeprospecting-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Vibe Prospecting', 'Skills', 'Codex'],
    summary:
      '清单 name 是 vibeprospecting，插件 id 是 vpai@vibeprospecting。README 给 Codex 专链 docs/install-codex.md。npx skills add 是双主机安装器，不是 Codex 主路径。',
  },
  {
    title: 'Vibe Prospecting Codex platform guide',
    url: 'https://github.com/explorium-ai/vibeprospecting-plugin/blob/main/skills/vibe-prospecting/platforms/codex.md',
    source: 'GitHub',
    lang: '英文',
    kind: '教程',
    tags: ['vpai', 'CLI', 'OAuth', 'Codex'],
    summary:
      '平台指南要求每次工作流开头 npm install -g @vibeprospecting/vpai@latest。随后 vpai login、--poll、whoami。默认 5 条样本门；跳过写 /vpai:skip_sample。',
  },
  {
    title: 'explorium-ai/vibeprospecting-mcp',
    url: 'https://github.com/explorium-ai/vibeprospecting-mcp',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Vibe Prospecting', 'OAuth', 'Codex'],
    summary:
      '裸 MCP 表名是 vibe-prospecting，远程是 vibeprospecting.explorium.ai/mcp。再 mcp login vibe-prospecting。不要抄缺表名的 vp-plugin.explorium.ai，也不要叠在 vpai 插件上。',
  },
  {
    title: 'Configure OpenAI Codex to Use Vaadin MCP Server',
    url: 'https://vaadin.com/docs/latest/building-apps/mcp/supported-tools/codex',
    source: 'Vaadin Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Vaadin', '插件', 'Codex'],
    summary:
      '官方 Codex：marketplace add vaadin/agent-marketplace --ref main，再 plugin add vaadin-skills@vaadin-marketplace。远程文档 MCP 是 mcp.vaadin.com/docs，不要加 /mcp。不要 mcp login。',
  },
  {
    title: 'MCP Server for Vaadin',
    url: 'https://vaadin.com/docs/latest/building-apps/mcp',
    source: 'Vaadin Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Vaadin', '文档'],
    summary:
      '总览把 Codex 列进原生 HTTP 客户端。Claude Code 和 Codex 优先走 Agent Marketplace，不必手写 MCP。stdio 适配器是给 Junie 的，不要抄到 Codex。',
  },
  {
    title: 'vaadin/agent-marketplace',
    url: 'https://github.com/vaadin/agent-marketplace',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Vaadin', 'marketplace', 'Codex'],
    summary:
      '清单 name 是 vaadin-marketplace。主插件 id 是 vaadin-skills@vaadin-marketplace。还有实验插件 vaadin-agent-tools。Codex 升级是 marketplace upgrade，不要抄 Claude 的 marketplace update。',
  },
  {
    title: 'vaadin/agent-skills',
    url: 'https://github.com/vaadin/agent-skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'Vaadin', 'MCP', 'Codex'],
    summary:
      '插件 .mcp.json 只登记 vaadin。npx skills add 不装 MCP。README 另给 javadocs.dev/mcp，不是插件自带。不要抄 Claude 的 /plugin install。',
  },
  {
    title: 'Set up the Checkly MCP Server',
    url: 'https://www.checklyhq.com/docs/ai/mcp-server/setup/',
    source: 'Checkly Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Checkly', 'bearer', 'Codex'],
    summary:
      '官方 Codex 专节用 bearer_token_env_var CHECKLY_API_KEY。Checkly 目前没有批准的 Codex OAuth 客户端，不要 mcp login。用户密钥 cu_，旧 sk_ 会被拒。',
  },
  {
    title: 'Checkly MCP Server',
    url: 'https://www.checklyhq.com/docs/ai/mcp-server/',
    source: 'Checkly Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Checkly', 'Skills'],
    summary:
      '生产入口是 api.checklyhq.com/mcp。远程 MCP 碰不到本机文件系统，写检查代码要走 Checkly CLI 和 Skills。OAuth 只给批准过的客户端。',
  },
  {
    title: 'Checkly Plugin for AI Coding Agents',
    url: 'https://www.checklyhq.com/docs/ai/plugin/',
    source: 'Checkly Docs',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Checkly', 'Skills', 'Codex'],
    summary:
      '插件已提交 OpenAI，仍在等审核。Codex 页是加 GitHub marketplace 再装，不是 Claude 的 checkly@checkly。捆的是技能和 MCP。',
  },
  {
    title: 'checkly/checkly-plugin',
    url: 'https://github.com/checkly/checkly-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Checkly', 'marketplace', 'Codex'],
    summary:
      'README 的 Codex 节是 marketplace add checkly/checkly-plugin，再 TUI /plugins。不要发明 plugin add checkly@checkly。.mcp.json 只有 OAuth scopes。',
  },
  {
    title: 'Mem0 Codex',
    url: 'https://docs.mem0.ai/integrations/codex',
    source: 'Mem0 Docs',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Mem0', 'MCP', 'Codex'],
    summary:
      '官方推荐 marketplace add mem0ai/mem0，再 plugin add mem0@mem0-plugins。Mem0 还不在 OpenAI 精选目录里。插件要 Python 3.10+。不要和 Option B 的 mcp add 叠表。',
  },
  {
    title: 'Mem0 MCP',
    url: 'https://docs.mem0.ai/platform/mem0-mcp',
    source: 'Mem0 Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Mem0', 'HTTP'],
    summary:
      'Codex 表名是 mem0 不是 mem0-mcp。总览仍写 mcp add 只支持 stdio，以 Codex 专节的 --url 为准。不要抄 npx mcp-add。',
  },
  {
    title: 'mem0ai/mem0',
    url: 'https://github.com/mem0ai/mem0',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Mem0', 'marketplace'],
    summary:
      '清单 name 是 mem0-plugins。source.path 是 ./integrations/codex-plugin。不要把 integrations/mem0-plugin 那份通用包当 Codex 主路径。',
  },
  {
    title: 'mem0ai/mem0 Codex plugin',
    url: 'https://github.com/mem0ai/mem0/tree/main/integrations/codex-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Mem0', 'stdio', 'Codex'],
    summary:
      '.mcp.json 是 python3 跑 ./core/mcp_server.py，不是远程 mcp.mem0.ai。六条技能是 remember / search / forget / pause / resume / status。',
  },
  {
    title: 'Install Cockpit For An AI Host',
    url: 'https://github.com/cockpit-dev/cockpit/blob/main/skills/cockpit/INSTALL.md',
    source: 'cockpit-dev/cockpit',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Cockpit', '插件', 'Codex'],
    summary:
      '官方核对：Cockpit Codex 插件资产在 plugins/codex/cockpit，捆绑 cockpit_mcp 无参 stdio。先 dart pub global activate cockpit any，再 marketplace add cockpit-dev/cockpit，再 plugin add cockpit@cockpit。不要 flutter pub global activate。',
  },
  {
    title: 'Cockpit Agent Integrations',
    url: 'https://github.com/cockpit-dev/cockpit/blob/main/docs/agent-integrations.md',
    source: 'cockpit-dev/cockpit',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Cockpit', 'Codex', 'Skills'],
    summary:
      'Codex 原生资产是 .agents/plugins/marketplace.json 和 plugins/codex/cockpit。插件捆完整 Skill 加 cockpit_mcp。只要 MCP 才 mcp add cockpit -- cockpit_mcp。不要和 Claude / Cursor 适配器抄成一条。',
  },
  {
    title: 'cockpit-dev/cockpit',
    url: 'https://github.com/cockpit-dev/cockpit',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Cockpit', 'Flutter', 'MCP', 'plugins'],
    summary:
      '宿主 CLI 一次安装：dart pub global activate cockpit any。最低 Dart 3.8.0、Flutter 3.32.0。默认 CLI + Skill；插件算一套集成，不要再叠第二张 MCP。不是 dart-lang 官方 Dart MCP。',
  },
  {
    title: 'cockpit | Dart package',
    url: 'https://pub.dev/packages/cockpit',
    source: 'pub.dev',
    lang: '英文',
    kind: '官方',
    tags: ['Cockpit', 'Dart', 'MCP', 'stdio'],
    summary:
      'Pub 包发布 cockpit、cockpit_mcp、cockpitd、cockpit_worker。全局激活用 dart pub global activate cockpit any。MCP 和 CLI 是同一 Supervisor 的两种传输，不要同一 mutation 跑两遍。',
  },
  {
    title: 'Codex: Advanced agentic configuration',
    url: 'https://support.atlassian.com/bitbucket-cloud/docs/codex-advanced-agentic-configuration/',
    source: 'Bitbucket Cloud Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Bitbucket', 'Pipelines', 'Codex', 'MCP'],
    summary:
      'Bitbucket 官方 Codex 专节。必须写 provider: codex，默认镜像 atlassian/default-image:5。生成的 .codex/config.toml 会被 Pipelines 写入 git exclude 不要提交。流水线 Jira 走 v1/native/mcp 加 Basic ATLASSIAN_MCP_AUTH，不要 mcp login。',
  },
  {
    title: 'Agentic Pipelines now supports OpenAI Codex',
    url: 'https://www.atlassian.com/blog/bitbucket/agentic-pipelines-now-supports-openai-codex',
    source: 'Inside Atlassian',
    lang: '英文',
    kind: '官方',
    tags: ['Bitbucket', 'Pipelines', 'Codex'],
    summary:
      '2026-06-25 公告：YAML 里 provider: codex 才会走 Codex，不写就默认 Rovo Dev。源码、提示和日志按 Third-Party Product 发给 OpenAI。开放 beta，不要当发布门禁。',
  },
  {
    title: 'Agentic Pipelines',
    url: 'https://support.atlassian.com/bitbucket-cloud/docs/agentic-pipelines/',
    source: 'Bitbucket Cloud Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Bitbucket', 'Pipelines', 'MCP'],
    summary:
      '工作区 AI features 打开 Agentic Pipelines。Codex 是 bring-your-own account。容器里自动注入 Bitbucket Cloud MCP 和短时 OAuth，不要自己 mcp add。不要把结果当发布闸。',
  },
  {
    title: 'Interacting with Bitbucket via MCP',
    url: 'https://support.atlassian.com/bitbucket-cloud/docs/interacting-with-bitbucket-via-mcp/',
    source: 'Bitbucket Cloud Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Bitbucket', 'MCP', 'Pipelines'],
    summary:
      '内置 Bitbucket Cloud MCP 不用手配。step 开最小 scopes，prompt 里写清要不要开 PR。工具表按 scope 裁剪，不是本机 v2/mcp。',
  },
  {
    title: 'Authentication and security for Agentic Pipelines',
    url: 'https://support.atlassian.com/bitbucket-cloud/docs/authentication-and-security-for-agentic-pipelines/',
    source: 'Bitbucket Cloud Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Bitbucket', 'Pipelines', '安全', 'OAuth'],
    summary:
      '每步短时 OAuth，隐式只读仓。写 PR 再加 write:repository 和 pullrequest scopes。密钥只放安全变量。可用 toolPermissions 拒绝默认放行的写工具。',
  },
  {
    title: 'Build with Codex',
    url: 'https://developer.paddle.com/get-started/ai/codex/',
    source: 'Paddle Developer',
    lang: '英文',
    kind: '官方',
    tags: ['Paddle', '插件', 'MCP', 'Codex'],
    summary:
      '官方 Codex：marketplace add PaddleHQ/paddle-agent-skills，再从插件目录装 paddle。插件会登记文档 MCP 和 sandbox/live。live 用 mcp login paddle-live。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'Agent skills and plugins',
    url: 'https://developer.paddle.com/sdks/ai/agent-skills',
    source: 'Paddle Developer',
    lang: '英文',
    kind: '官方',
    tags: ['Paddle', 'Skills', '插件'],
    summary:
      'Codex 走官方插件。npx skills add https://developer.paddle.com/ 是 Cursor / Windsurf，不是 Codex 安装器。技能覆盖 checkout、webhook、订阅同步，只针对 Paddle Billing。',
  },
  {
    title: 'Paddle MCP server',
    url: 'https://developer.paddle.com/sdks/ai/paddle-mcp',
    source: 'Paddle Developer',
    lang: '英文',
    kind: '官方',
    tags: ['Paddle', 'MCP', 'OAuth'],
    summary:
      'sandbox-mcp.paddle.com/mcp 只吃 pdl_sdbx_ 沙箱密钥。live 是 mcp.paddle.com/mcp，交互走 OAuth。沙箱不支持 OAuth。手写 Codex 用 --url，不要抄同页的 --transport http。',
  },
  {
    title: 'Docs MCP server',
    url: 'https://developer.paddle.com/sdks/ai/docs-mcp',
    source: 'Paddle Developer',
    lang: '英文',
    kind: '官方',
    tags: ['Paddle', 'MCP', '文档'],
    summary:
      '文档 MCP 是 paddlehq.mcp.kapa.ai，Google / GitHub 登录限流，不要 Paddle API key。插件已登记就不要再 mcp add。Codex 专节里的 --transport http 不要抄。',
  },
  {
    title: 'PaddleHQ/paddle-agent-skills',
    url: 'https://github.com/PaddleHQ/paddle-agent-skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Paddle', 'plugins', 'Skills', 'Codex'],
    summary:
      'marketplace.json 插件名 paddle，清单名 paddle-agent-skills。Codex 插件在 providers/codex/plugin。.mcp.json 三台都是 type http。不要对仓库根跑 Claude 的 /plugin install。',
  },
  {
    title: 'Build with AI Coding Agents',
    url: 'https://docs.dodopayments.com/developer-resources/build-with-ai-coding-agents',
    source: 'Dodo Payments Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Dodo', '插件', 'Codex'],
    summary:
      '官方 Codex：marketplace add dodopayments/dodo-agent-plugin，再 plugin add dodopayments@dodopayments。清单名是 dodopayments。旧文曾写只能进 TUI /plugins；现行 CLI 有 plugin add。不要发明 plugin install。',
  },
  {
    title: 'MCP Server',
    url: 'https://docs.dodopayments.com/developer-resources/mcp-server',
    source: 'Dodo Payments Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Dodo', 'OAuth', 'HTTP'],
    summary:
      'knowledge.dodopayments.com/mcp 不要鉴权。live API 是 mcp.dodopayments.com/mcp，交互走 OAuth。手册给其它客户端抄的是 /sse 和 mcp-remote，Codex 用 --url 打 /mcp。',
  },
  {
    title: 'Agent Skills',
    url: 'https://docs.dodopayments.com/developer-resources/agent-skills',
    source: 'Dodo Payments Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Dodo', 'Codex'],
    summary:
      '十七个技能跟插件走，不要单独 npx skills add 当 Codex 安装器。查文档走 dodo-knowledge，改账走 dodopayments-api。webhook 要验签。',
  },
  {
    title: 'dodopayments/dodo-agent-plugin',
    url: 'https://github.com/dodopayments/dodo-agent-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Dodo', 'MCP', 'Codex'],
    summary:
      'marketplace.json 名是 dodopayments。规范 mcp.json 是 Streamable HTTP；生成的 .mcp.json 才是 npx mcp-remote。Codex overlay 也指向兼容层，不要抄进用户 config.toml。',
  },
  {
    title: 'dodopayments/skills',
    url: 'https://github.com/dodopayments/skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'Dodo'],
    summary:
      '技能源仓，插件仓会 vendor 进 skills/。不要把这份仓单独 clone 进 ~/.codex/skills 当插件安装器。',
  },
  {
    title: 'Codex CLI Setup',
    url: 'https://weppyai.com/en/docs/agents/codex-cli/',
    source: 'WEPPY Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'WEPPY', 'Roblox', 'Codex', 'plugins'],
    summary:
      '官方 Codex：marketplace add hope1026/weppy-roblox-mcp，再 plugin add weppy-roblox-ai-toolkit@hope1026-roblox-mcp。清单名是 hope1026-roblox-mcp。只要 MCP 才 mcp add weppy-roblox-mcp。',
  },
  {
    title: 'Getting Started',
    url: 'https://weppyai.com/en/docs/getting-started/',
    source: 'WEPPY Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'WEPPY', 'Roblox'],
    summary:
      'Roblox Studio 插件和 MCP 是两截。Studio 里 WEPPY → Connect。一键 install.sh 会给 Codex 加 marketplace，并提示去 Plugin Directory 装插件。',
  },
  {
    title: 'Install WEPPY',
    url: 'https://weppyai.com/en/install',
    source: 'WEPPY Docs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'WEPPY', 'Roblox'],
    summary:
      'MCP 第一次跑会把 Studio 插件放进 Plugins 目录。连不上先看 3002。Roblox Explorer 是可选 VS Code 扩展，不是 Codex 插件。',
  },
  {
    title: 'hope1026/weppy-roblox-mcp',
    url: 'https://github.com/hope1026/weppy-roblox-mcp',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'WEPPY', 'Roblox', 'plugins', 'Codex'],
    summary:
      'Codex 段只写 marketplace add，随后 Plugin Directory 装 WEPPY AI Agent Plugin。Claude 才是 plugin install weppy-roblox-ai-toolkit@hope1026-roblox-mcp --scope user。',
  },
  {
    title: '@weppy/roblox-mcp',
    url: 'https://www.npmjs.com/package/@weppy/roblox-mcp',
    source: 'npm',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'WEPPY', 'Roblox'],
    summary:
      'stdio 命令是 npx -y @weppy/roblox-mcp@latest。表名 weppy-roblox-mcp。不要当 HTTP MCP，也不要 mcp login。',
  },
  {
    title: 'Install phxagents for Codex',
    url: 'https://phxagents.dev/install/codex/',
    source: 'phxagents',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Elixir', 'Phoenix', 'Skills', 'Codex'],
    summary:
      '官方 Codex：marketplace add oliver-kriska/claude-elixir-phoenix --ref main，再 plugin add elixir-phoenix@oliver-kriska。清单名是 oliver-kriska。技能要用 $elixir-phoenix:phx-review。',
  },
  {
    title: 'Codex Skills Plugin',
    url: 'https://github.com/oliver-kriska/claude-elixir-phoenix/blob/main/docs/codex.md',
    source: 'GitHub',
    lang: '英文',
    kind: '教程',
    tags: ['plugins', 'Elixir', 'Phoenix', 'Codex'],
    summary:
      'marketplace add 只登记源。技能没有无前缀别名。钩子要 /hooks 另信，fail-open。不要手改 targets/codex。不要抄 /phx:review。',
  },
  {
    title: 'oliver-kriska/claude-elixir-phoenix',
    url: 'https://github.com/oliver-kriska/claude-elixir-phoenix',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Elixir', 'Phoenix', 'Skills', 'Codex'],
    summary:
      'README 的 Use with Codex 段就是 marketplace add 再 plugin add。自定义代理故意不生成。Tidewave 登记在插件外面。',
  },
  {
    title: 'OpenAI Codex',
    url: 'https://tidewave.hexdocs.pm/mcp_codex.html',
    source: 'Tidewave Hexdocs',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Tidewave', 'Phoenix', 'Codex'],
    summary:
      '官方 Codex：mcp add tidewave --url 走 localhost 端口加 /tidewave/mcp。不要 mcp login。list 只证明写进配置，连上要 /mcp。',
  },
  {
    title: 'Tidewave MCP',
    url: 'https://phxagents.dev/tidewave-mcp/',
    source: 'phxagents',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Tidewave', 'Phoenix'],
    summary:
      '任何 runtime 都不会静默登记固定端口。Phoenix 先跑 Tidewave，再按客户端各自登记。Codex 示例仍是 mcp add tidewave。',
  },
  {
    title: 'Codex',
    url: 'https://developer.box.com/guides/box-mcp/integrations/codex',
    source: 'Box Developers',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Box', 'plugins', 'Codex'],
    summary:
      'Box 先 Plugins 搜 Box，远程 MCP 走 mcp.box.com，不要加 /mcp。管理员先启用 ChatGPT - MCP。官方没给 plugin add id。不要抄 Claude 的 --transport http。',
  },
  {
    title: 'Connect an AI agent to Box',
    url: 'https://developer.box.com/tutorials/connect-an-agent-to-box',
    source: 'Box Developers',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'Box', 'OAuth', 'Codex'],
    summary:
      '教程用 Codex 举例。MCP 路径装 Box 插件再 /mcp 核对。托管地址是 mcp.box.com。生产不要用日常企业账号。Box CLI 的 box login 是另一条路径，不要当成插件安装器。',
  },
  {
    title: 'Self-hosted Box MCP server (legacy)',
    url: 'https://developer.box.com/guides/box-mcp/self-hosted',
    source: 'Box Developers',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Box'],
    summary:
      '自托管仓 box-community/mcp-server-box 已弃用。新接法走托管 mcp.box.com。不要把 uv run src/mcp_server_box.py 或 Cursor JSON 抄进 Codex。',
  },
  {
    title: 'box/box-for-ai',
    url: 'https://github.com/box/box-for-ai',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Skills', 'Box', 'plugins', 'Codex'],
    summary:
      '技能安装是 npx skills add box/skills，会改所有检测到的客户端，不是 /plugins。仓库 .codex-plugin README 把 CLIENT_ID 写进 mcp_servers.box.auth，不是 Codex 语法，不要抄。',
  },
  {
    title: 'Box Agent Skills',
    url: 'https://developer.box.com/ai/agent-skills',
    source: 'Box Developers',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'Box', 'Codex'],
    summary:
      '官方技能页指向 npx skills add box/skills。Codex 插件仍以 Plugins 搜 Box 为准，不要把技能安装器当成 /plugins。验证 CLI 身份才是 box users:get me --json。',
  },
  {
    title: 'Miro MCP for OpenAI Codex',
    url: 'https://miro.com/marketplace/miro-mcp-for-openai-codex/',
    source: 'Miro Marketplace',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Miro', 'plugins', 'Codex'],
    summary:
      'Miro 先 Plugins 搜 Miro，远程 MCP 走 mcp.miro.com，带尾斜杠。点 Add，再选团队做 OAuth。企业要管理员打开 MCP。官方没给 plugin add id。',
  },
  {
    title: "Miro's MCP Server",
    url: 'https://developers.miro.com/docs/miro-mcp',
    source: 'Miro Developers',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Miro', 'Codex'],
    summary:
      'Codex / ChatGPT 一行：从 ChatGPT 插件目录加 Miro，再 Connect。不要抄旁边 Claude 的 plugin install miro@claude-plugins-official。免费团队也能用。',
  },
  {
    title: "Getting started with Miro's MCP Server",
    url: 'https://developers.miro.com/docs/connecting-to-miro-mcp',
    source: 'Miro Developers',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Miro', 'OAuth'],
    summary:
      '推荐走 Codex Plugin。手写 JSON 才是 mcp.miro.com，带尾斜杠。授权按团队，画板必须属于勾中的团队。不要把 mcpServers JSON 当 Codex 主路径。',
  },
  {
    title: "How to enable Miro's MCP Server (user guide)",
    url: 'https://help.miro.com/hc/en-us/articles/31625301583890-How-to-enable-Miro-s-MCP-Server-user-guide',
    source: 'Miro Help Center',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', 'Miro', 'OAuth'],
    summary:
      '企业账号要管理员先开 MCP。用户指南手写地址是 mcp.miro.com。OAuth 时选对团队。企业若只放行特定客户端，管理员还要把 Codex 加进名单。',
  },
  {
    title: 'miroapp/miro-ai',
    url: 'https://github.com/miroapp/miro-ai',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Miro', 'Skills', 'Codex'],
    summary:
      'README 给 Claude 的是 marketplace add miroapp/miro-ai。Codex 终端用户仍走 Plugins 搜 Miro。npx skills add 不是插件安装器。本地 codex-plugins 只给贡献者。',
  },
  {
    title: 'Installing smart-vs-mcp for Codex CLI',
    url: 'https://github.com/Al3xisDani3l/smart-vs-mcp/blob/main/docs/install-codex.md',
    source: 'GitHub',
    lang: '英文',
    kind: '教程',
    tags: ['MCP', 'Visual Studio', '插件', 'Codex'],
    summary:
      'smart-vs-mcp 用 marketplace add Al3xisDani3l/smart-vs-mcp，@ 是 marketplace 名不是 npm 标签。钉分支用 --ref。plugin not found 时 upgrade 清单名 smart-vs-mcp-dev。',
  },
  {
    title: 'Al3xisDani3l/smart-vs-mcp',
    url: 'https://github.com/Al3xisDani3l/smart-vs-mcp',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['MCP', 'Visual Studio', 'stdio', 'Codex'],
    summary:
      '工作区感知的 VS-MCP stdio 包装。插件会登记 vs-mcp-smart。解根放 .mcp/mcpserver.settings.json。只要 stdio 才 npx @al3xisdani3l/smart-vs-mcp。不要 mcp login。',
  },
  {
    title: 'smart-vs-mcp skill',
    url: 'https://github.com/Al3xisDani3l/smart-vs-mcp/blob/main/skills/smart-vs-mcp/SKILL.md',
    source: 'GitHub',
    lang: '英文',
    kind: '清单',
    tags: ['MCP', 'Visual Studio', 'Skills', 'Codex'],
    summary:
      '插件从 .mcp.json 自动登记 MCP。doctor 看 Resolved Port。不要把 skillfish 当 Codex 安装器。WSL 里 VS 在 Windows 上跑时改 --workspace 或换 Windows shell。',
  },
  {
    title: 'EveryInc/compound-engineering-plugin',
    url: 'https://github.com/EveryInc/compound-engineering-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Compound Engineering', 'Skills', 'Codex'],
    summary:
      'Compound Engineering 插件用 marketplace 加 EveryInc/compound-engineering-plugin，再 plugin add compound-engineering@compound-engineering-plugin。清单 name 是 compound-engineering-plugin。原生安装自包含，不要再 bunx。',
  },
  {
    title: 'Upgrading an existing Compound Engineering install',
    url: 'https://github.com/EveryInc/compound-engineering-plugin/blob/main/docs/install/upgrading.md',
    source: 'GitHub',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Compound Engineering', 'upgrade', 'Codex'],
    summary:
      'Codex CLI：先 marketplace upgrade compound-engineering-plugin，再 plugin add。没有 plugin update。旧 Bun 安装可能在 ~/.codex/AGENTS.md 留下 COMPOUND CODEX TOOL MAP，原生路径不会写这块。',
  },
  {
    title: 'Compound engineering: how Every codes with agents',
    url: 'https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents',
    source: 'Every',
    lang: '英文',
    kind: '教程',
    tags: ['Compound Engineering', 'Skills', 'Codex'],
    summary:
      'Every 讲 compound 循环：计划、执行、复盘、把教训写回仓库。现行 Codex 安装走官方插件，不是这篇文章里的通用宿主斜杠。技能在 Codex 里用 $ce-plan。',
  },
  {
    title: 'getsentry/plugin-codex',
    url: 'https://github.com/getsentry/plugin-codex',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Sentry', 'Skills', 'Codex'],
    summary:
      'Sentry 插件用 marketplace 加 getsentry/plugin-codex，再 plugin add sentry@sentry-plugin-marketplace。清单 name 是 sentry-plugin-marketplace。生成仓，改技能去 sentry-for-ai。',
  },
  {
    title: 'Install the Sentry plugin in your coding agent',
    url: 'https://sentry.io/cookbook/install-sentry-plugin-coding-agent/',
    source: 'Sentry Cookbook',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Sentry', 'Codex', 'MCP'],
    summary:
      'Native install：Codex 是 marketplace add getsentry/plugin-codex，再 plugin add sentry@sentry-plugin-marketplace。不要抄 Claude 的 sentry@claude-plugins-official。共享安装器会改所有侦测到的助手。',
  },
  {
    title: 'Sentry Agent Plugin',
    url: 'https://docs.sentry.io/ai/agent-plugin/',
    source: 'Sentry Docs',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'Sentry', 'Skills'],
    summary:
      '文档主路径是 npx @sentry/agent-plugin install，会侦测 Claude / Cursor / Codex / Grok。只要 Codex 时走 plugin-codex 那两条 add。插件会自己配托管 MCP。卸装用 remove。',
  },
  {
    title: 'GitGuardian/agent-skills',
    url: 'https://github.com/GitGuardian/agent-skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'GitGuardian', 'Skills', 'Codex', 'MCP'],
    summary:
      'GitGuardian 插件用 marketplace 加 GitGuardian/agent-skills，再在 /plugins 装 gitguardian。要求 Codex CLI 0.117.0+。清单名 gitguardian-agent-skills。源是 Git URL，不是 local ./。',
  },
  {
    title: 'Plugin distribution & validation',
    url: 'https://github.com/GitGuardian/agent-skills/blob/main/docs/maintainers/distribution.md',
    source: 'GitHub',
    lang: '英文',
    kind: '清单',
    tags: ['plugins', 'GitGuardian', 'marketplace', 'Codex'],
    summary:
      'Codex marketplace 放在 .agents/plugins/marketplace.json。插件条目 source 用 url 指向 GitHub git，因为 Codex 会拒绝解析到 marketplace 根的 local 路径。MCP 登录表名是 GitGuardian。',
  },
  {
    title: 'GitGuardian Agent Skills: Secret Detection and Remediation For AI-Assisted Development',
    url: 'https://blog.gitguardian.com/introducing-gitguardian-agent-skills/',
    source: 'GitGuardian Blog',
    lang: '英文',
    kind: '官方',
    tags: ['GitGuardian', 'Skills', 'ggshield', 'Codex'],
    summary:
      '官方介绍技能走 ggshield CLI 做扫描，MCP 负责事故分诊和 honeytoken。不要把 curl agents.gitguardian.com 当成只装 Codex 的命令。',
  },
  {
    title: 'xqy2006/ModelTrace',
    url: 'https://github.com/xqy2006/ModelTrace',
    source: 'GitHub',
    lang: '中文',
    kind: '仓库',
    tags: ['plugins', 'hooks', 'ModelTrace', 'Codex'],
    summary:
      'ModelTrace Guard 用 marketplace 加 xqy2006/ModelTrace，再 plugin add modeltrace-guard@modeltrace。根目录 python start.py 是 7860 页面，不是插件安装器。装完要在 /hooks 审这份插件。',
  },
  {
    title: 'ModelTrace Guard',
    url: 'https://github.com/xqy2006/ModelTrace/blob/main/codex-plugin/modeltrace-guard/README.md',
    source: 'GitHub',
    lang: '中文',
    kind: '清单',
    tags: ['plugins', 'hooks', 'ModelTrace', 'Codex'],
    summary:
      '清单名 modeltrace，插件 id 是 modeltrace-guard@modeltrace。新开会话后 TUI 敲 /hooks。探针走已配置账户并花额度。doctor --fork true 不发起推理。',
  },
  {
    title: 'Codex Plugin - Project CodeGuard',
    url: 'https://project-codeguard.org/codex-skill-plugin/',
    source: 'Project CodeGuard',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'CodeGuard', 'Skills', 'Codex'],
    summary:
      'CodeGuard 用 marketplace 加 cosai-oasis/project-codeguard，再 plugin add codeguard-security@project-codeguard。要 Codex CLI 0.142.0+，因为源是仓库根 ./。插件只打 skills，没有 hooks、MCP 和 codeguard-reviewer。',
  },
  {
    title: 'cosai-oasis/project-codeguard',
    url: 'https://github.com/cosai-oasis/project-codeguard',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'CodeGuard', 'Skills', 'MCP'],
    summary:
      'OASIS/CoSAI 的安全规则仓。Codex 清单名是 project-codeguard，插件 name 是 codeguard-security。MCP 在 src/codeguard-mcp，自建 HTTP，README 只有通用 mcpServers JSON，不是 Codex plugin add。',
  },
  {
    title: 'Getting Started - Project CodeGuard',
    url: 'https://project-codeguard.org/getting-started/',
    source: 'Project CodeGuard',
    lang: '英文',
    kind: '官方',
    tags: ['Skills', 'CodeGuard', 'Codex'],
    summary:
      'project-codeguard 入门仍写 codeguard-codex.zip 拷 .agents/ 和 $skill-installer。旧路径 .codex/skills 会被静默忽略，现行文件技能在 .agents/skills/codeguard。托管更新请走官方 Codex 插件页，不要抄同页 Claude 的 /plugin install。',
  },
  {
    title: 'Codex',
    url: 'https://www.braintrust.dev/docs/integrations/developer-tools/codex',
    source: 'Braintrust',
    lang: '英文',
    kind: '官方',
    tags: ['Braintrust', 'hooks', 'plugins', 'MCP', 'Codex'],
    summary:
      'Braintrust 用 bt trace enable codex 装 trace-codex@braintrust-codex-plugins。追踪文件是 ~/.codex/braintrust.json。MCP 另走 mcp add braintrust --url api.braintrust.dev/mcp，再 mcp login。退役插件 braintrust@braintrust-codex-plugins 要先 remove。',
  },
  {
    title: 'braintrustdata/braintrust-codex-plugin',
    url: 'https://github.com/braintrustdata/braintrust-codex-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'Braintrust', 'hooks', 'Codex'],
    summary:
      '生成仓，清单名 braintrust-codex-plugins。手装是 marketplace add braintrustdata/braintrust-codex-plugin，再 plugin add trace-codex@braintrust-codex-plugins。仓 README 写明 marketplace 不装 MCP。改源请去 braintrust-coding-agent-plugins。',
  },
  {
    title: 'bt trace',
    url: 'https://www.braintrust.dev/docs/reference/cli/trace',
    source: 'Braintrust',
    lang: '英文',
    kind: '官方',
    tags: ['Braintrust', 'hooks', 'CLI', 'Codex'],
    summary:
      'bt trace setup 是 enable 的别名。Codex 追踪文件固定 ~/.codex/braintrust.json。bt trace run 会拒 --dangerously-bypass-hook-trust。诊断用 bt trace doctor codex。关掉用 disable，不删 bt 凭据。升级插件走 bt trace update，不动 braintrust-codex-plugin 的路由。',
  },
  {
    title: 'mksglu/context-mode',
    url: 'https://github.com/mksglu/context-mode',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'hooks', 'MCP', 'mksglu/context-mode', 'Codex'],
    summary:
      'context-mode 用 marketplace 加 mksglu/context-mode，再在 /plugins 安装。打开 hooks 和 plugin_hooks，用 ctx stats 验 MCP。不要抄 Claude 的 /plugin install。',
  },
  {
    title: 'context-mode npm package',
    url: 'https://www.npmjs.com/package/context-mode',
    source: 'npm',
    lang: '英文',
    kind: '官方',
    tags: ['plugins', 'MCP', 'mksglu/context-mode', 'Codex'],
    summary:
      'npm 镜像仓库 Codex 专节：mksglu/context-mode 加进 marketplace 后走插件 UI。Node 要 22.5+。无 plugin_hooks 的旧构建才 npm install -g 手写 MCP。',
  },
  {
    title: 'context-mode Codex marketplace.json',
    url: 'https://github.com/mksglu/context-mode/blob/main/.agents/plugins/marketplace.json',
    source: 'GitHub',
    lang: '英文',
    kind: '清单',
    tags: ['plugins', 'marketplace', 'mksglu/context-mode', 'Codex'],
    summary:
      'Codex 读 .agents/plugins/marketplace.json，不读 .codex-plugin/marketplace.json。清单名和插件名都是 context-mode，对应 mksglu/context-mode 这份源。',
  },
  {
    title: '1Password/1password-codex-plugin',
    url: 'https://github.com/1Password/1password-codex-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'MCP', '1Password', 'Codex'],
    summary:
      '1Password Codex 插件用 marketplace 加 1Password/1password-codex-plugin，再装 1password@1password-plugins。捆绑 1password-mcp。Skills Only ZIP 会剥掉 MCP。不要抄 1password-claude-plugin。',
  },
  {
    title: '1Password Environments MCP for Codex',
    url: 'https://www.1password.dev/environments/mcp-codex-server',
    source: '1Password',
    lang: '英文',
    kind: '官方',
    tags: ['MCP', '1Password', '1Password/1password-codex-plugin', 'Codex'],
    summary:
      '插件主页指向这份 Codex 文档。桌面 Labs 仍要打开本地 MCP。UI 路径仍是 1password-mcp。和 1Password/1password-codex-plugin 是同一条 Environments 服务器，不要叠两张表。',
  },
  {
    title: '1password-codex-plugin marketplace.json',
    url: 'https://github.com/1Password/1password-codex-plugin/blob/main/.agents/plugins/marketplace.json',
    source: 'GitHub',
    lang: '英文',
    kind: '清单',
    tags: ['plugins', 'marketplace', '1Password/1password-codex-plugin', 'Codex'],
    summary:
      '清单名 1password-plugins，插件名 1password，源路径 ./plugins/1password。对应 1Password/1password-codex-plugin，不是 Claude 那份 1password-claude-plugin。',
  },
  {
    title: 'Run Codex with Doppler',
    url: 'https://www.doppler.com/agents-codex',
    source: 'Doppler',
    lang: '英文',
    kind: '官方',
    tags: ['Doppler', 'MCP', 'Codex', 'secrets'],
    summary:
      'Doppler 官方 Codex：doppler run --config dev_agent_codex -- codex，MCP 再挂 @dopplerhq/mcp-server --read-only。隔离 config、过期只读 token、--scope .，密钥不进 .env。',
  },
  {
    title: 'Doppler MCP Server',
    url: 'https://docs.doppler.com/docs/mcp',
    source: 'Doppler Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Doppler', 'MCP', 'stdio'],
    summary:
      '实验性 MCP，Node 20+，包是 @dopplerhq/mcp-server。可 npx login 进钥匙串，或运行时给 DOPPLER_TOKEN。--read-only 才会藏写工具；token 本身推不出只读。官方示例是 mcpServers JSON，Codex 要改成 TOML。',
  },
  {
    title: 'DopplerHQ/mcp-server',
    url: 'https://github.com/DopplerHQ/mcp-server',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Doppler', 'MCP', 'stdio'],
    summary:
      '从 OpenAPI 生成 Doppler API 工具。作用域用 service token 收紧，不要只靠 --project / --config 旗标。README 的 env.DOPPLER_TOKEN 字面量不要抄进 Codex env 表。',
  },
  {
    title: 'aws/agent-toolkit-for-aws',
    url: 'https://github.com/aws/agent-toolkit-for-aws',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['plugins', 'AWS', 'Skills', 'Codex', 'MCP'],
    summary:
      'AWS Agent Toolkit 官方 Codex：marketplace add aws/agent-toolkit-for-aws，再 /plugins 装 aws-core。清单名 agent-toolkit-for-aws。插件会登记 aws-mcp。不要抄 Claude 的 claude-plugins-official。',
  },
  {
    title: 'Agent setup guide',
    url: 'https://docs.aws.amazon.com/lambda/latest/dg/agent-setup-guide.html',
    source: 'AWS Lambda Docs',
    lang: '英文',
    kind: '官方',
    tags: ['AWS', 'Lambda', 'plugins', 'MCP', 'Codex'],
    summary:
      'Lambda 给 Codex 单独一节：先 marketplace add 再 /plugins 装 aws-core。可选 Serverless MCP 才是 uvx awslabs.aws-serverless-mcp-server。不要把 Claude 的 /plugin install 抄进 Codex。',
  },
  {
    title: 'Understanding the MCP Server tools',
    url: 'https://docs.aws.amazon.com/agent-toolkit/latest/userguide/understanding-mcp-server-tools.html',
    source: 'AWS Agent Toolkit Docs',
    lang: '英文',
    kind: '官方',
    tags: ['AWS', 'MCP'],
    summary:
      '托管 AWS MCP Server 覆盖 API、沙箱脚本和文档检索。aws-core 用本机 uvx 代理打 aws-mcp.us-east-1.api.aws/mcp。查文档可以 --skip-auth；写资源仍要 IAM。',
  },
  {
    title: 'OpenAI Codex tracing with Langfuse',
    url: 'https://langfuse.com/integrations/developer-tools/codex',
    source: 'Langfuse Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Langfuse', 'hooks', 'plugins', 'Codex'],
    summary:
      '官方 Codex 追踪插件。marketplace add 之后 plugin add tracing@codex-observability-plugin。Stop 钩子读 transcript。TRACE_TO_LANGFUSE 必须是字符串 true。密钥走进程环境。文档仍写 plugin_hooks，现行是 hooks。',
  },
  {
    title: 'langfuse/codex-observability-plugin',
    url: 'https://github.com/langfuse/codex-observability-plugin',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Langfuse', 'hooks', 'plugins', 'Codex'],
    summary:
      'Langfuse 官方 Codex 追踪：marketplace add langfuse/codex-observability-plugin，再 plugin add tracing@codex-observability-plugin。清单名 codex-observability-plugin。npm 源。TRACE_TO_LANGFUSE 默认关。Codex 0.143+，Node 22+。',
  },
  {
    title: 'codex-observability-plugin marketplace.json',
    url: 'https://github.com/langfuse/codex-observability-plugin/blob/main/.agents/plugins/marketplace.json',
    source: 'GitHub',
    lang: '英文',
    kind: '清单',
    tags: ['Langfuse', 'marketplace', 'plugins', 'Codex'],
    summary:
      '清单 name 是 codex-observability-plugin，插件 name 是 tracing，所以是 tracing@codex-observability-plugin。源是 npm 包 @langfuse/codex-observability-plugin。TRACE_TO_LANGFUSE 仍要另开。不要发明 tracing@langfuse。',
  },
  {
    title: 'Codex plugin',
    url: 'https://docs.wandb.ai/weave/guides/integrations/agents/codex-harness',
    source: 'W&B Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Weave', 'hooks', 'W&B', 'Codex'],
    summary:
      '官方 Codex 追踪。npm 装 weave-codex 之后 weave-codex install 写 Stop 钩子。WEAVE_PROJECT 必填。默认采集正文。无头用 weave-codex run 或 collect --all。不要 marketplace add。',
  },
  {
    title: 'weave-codex',
    url: 'https://www.npmjs.com/package/weave-codex',
    source: 'npm',
    lang: '英文',
    kind: '仓库',
    tags: ['Weave', 'hooks', 'npm', 'Codex'],
    summary:
      'W&B Weave 官方 Codex 追踪：npm i -g weave-codex，再 weave-codex install 写 Stop 钩子。WEAVE_PROJECT 必填 entity/project。Node 20+。--ephemeral 没有追踪。',
  },
  {
    title: 'Choose an agent integration',
    url: 'https://docs.wandb.ai/weave/agent-integration-quickstart',
    source: 'W&B Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Weave', 'agents', 'W&B', 'Codex'],
    summary:
      'Weave 把 Codex 列进 agent harness。CLI 主路径仍是 weave-codex，不是 Python weave.init()。装完 WEAVE_PROJECT 指向团队项目，再到 Agents 视图看回合。',
  },
  {
    title: 'Codex',
    url: 'https://arize.com/docs/phoenix/integrations/coding-agents/codex',
    source: 'Arize Phoenix Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Phoenix', 'notify', 'Arize', 'Codex'],
    summary:
      '官方走 Codex notify，不是 marketplace。clone 后 ./install.sh codex，向导选 Phoenix。PHOENIX_PROJECT 填项目名。凭证在 ~/.arize/harness/config.json。不要抄 README 的 /hooks。',
  },
  {
    title: 'Arize-ai/coding-harness-tracing',
    url: 'https://github.com/Arize-ai/coding-harness-tracing',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Phoenix', 'notify', 'Arize', 'Codex'],
    summary:
      'Arize Phoenix 官方 Codex 追踪：clone 后 ./install.sh codex，走顶层 notify 不是 /hooks。现行 install.py 只追加 notify 二进制。PHOENIX_PROJECT 给 Phoenix 用。',
  },
  {
    title: 'tracing/codex/README.md',
    url: 'https://github.com/Arize-ai/coding-harness-tracing/blob/main/tracing/codex/README.md',
    source: 'GitHub',
    lang: '英文',
    kind: '清单',
    tags: ['Phoenix', 'notify', 'README', 'Codex'],
    summary:
      'README 仍写 /hooks 审 arize-hook-codex-*，那是旧布局。现行安装器是 notify-only。PHOENIX_PROJECT 与 ARIZE_TRACE_ENABLED 写在 arize-env.sh。测一条短 exec。',
  },
  {
    title: 'Trace OpenAI Codex sessions',
    url: 'https://docs.langchain.com/langsmith/trace-with-codex',
    source: 'LangSmith Docs',
    lang: '英文',
    kind: '官方',
    tags: ['LangSmith', 'plugins', 'hooks', 'Codex', 'TRACE_TO_LANGSMITH'],
    summary:
      '官方把 Codex 回合打进 LangSmith。marketplace add langchain-ai/langsmith-codex-plugins。TRACE_TO_LANGSMITH 开追踪。凭证 LANGSMITH_CODEX_API_KEY。文档仍写 plugin_hooks，现行不要手写。',
  },
  {
    title: 'langchain-ai/langsmith-codex-plugins',
    url: 'https://github.com/langchain-ai/langsmith-codex-plugins',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['LangSmith', 'plugins', 'hooks', 'Codex', 'TRACE_TO_LANGSMITH'],
    summary:
      'LangSmith 官方 Codex 追踪：marketplace add langchain-ai/langsmith-codex-plugins，再 plugin add tracing@langsmith-codex-plugins。TRACE_TO_LANGSMITH 开追踪。要 0.153.4+ 和同步 UserPromptSubmit。',
  },
  {
    title: 'marketplace.json',
    url: 'https://github.com/langchain-ai/langsmith-codex-plugins/blob/main/.agents/plugins/marketplace.json',
    source: 'GitHub',
    lang: '英文',
    kind: '清单',
    tags: ['LangSmith', 'marketplace', 'plugins', 'Codex', 'TRACE_TO_LANGSMITH'],
    summary:
      '清单 name 是 langsmith-codex-plugins，插件 name 是 tracing。源是 ./plugins/tracing。TRACE_TO_LANGSMITH 仍要进程环境打开。不要发明 tracing@openai-curated。',
  },
  {
    title: 'Export Codex Activity to Logfire',
    url: 'https://pydantic.dev/docs/logfire/guides/codex-logfire-exporter/',
    source: 'Pydantic Logfire Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Logfire', 'plugins', 'hooks', 'Codex', 'CODEX_LOGFIRE_CONTENT_CAPTURE_MODE'],
    summary:
      '官方 Codex：marketplace add pydantic/skills --ref main，再 plugin add logfire-exporter@pydantic-skills。Stop 才导出。CODEX_LOGFIRE_CONTENT_CAPTURE_MODE 默认 full。LOGFIRE_TOKEN 写 config.env。',
  },
  {
    title: 'pydantic/skills',
    url: 'https://github.com/pydantic/skills',
    source: 'GitHub',
    lang: '英文',
    kind: '仓库',
    tags: ['Logfire', 'plugins', 'hooks', 'Codex', 'CODEX_LOGFIRE_CONTENT_CAPTURE_MODE'],
    summary:
      'Logfire 官方 Codex 追踪：marketplace add pydantic/skills，再 plugin add logfire-exporter@pydantic-skills。清单 name 是 pydantic-skills。CODEX_LOGFIRE_CONTENT_CAPTURE_MODE 控制正文。导出器只在 Codex。',
  },
  {
    title: 'Coding Agent Skills',
    url: 'https://pydantic.dev/docs/logfire/guides/skills/',
    source: 'Pydantic Logfire Docs',
    lang: '英文',
    kind: '官方',
    tags: ['Logfire', 'Skills', 'plugins', 'Codex', 'CODEX_LOGFIRE_CONTENT_CAPTURE_MODE'],
    summary:
      'Codex 技能页同时给 logfire@pydantic-skills 和 logfire-exporter@pydantic-skills。导出器要写令牌。CODEX_LOGFIRE_CONTENT_CAPTURE_MODE 在导出器指南。不要抄 Claude 的 logfire@claude-plugins-official。',
  }
];
