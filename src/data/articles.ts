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
      'Codex 页写 ~/.codex/config.toml 的 [mcp_servers.datadog]，US1 是 https://mcp.datadoghq.com/api/unstable/mcp-server/mcp，然后 mcp login datadog。工具集用 http_headers 里的 X-Datadog-MCP-Toolsets，不要把 ?toolsets= 拼进 URL。GovCloud 没有这台服务。',
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
];

