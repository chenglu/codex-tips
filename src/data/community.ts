export type CommunityKind = 'X' | '新闻' | '论坛';

export type CommunityItem = {
  title: string;
  url: string;
  source: string;
  kind: CommunityKind;
  date: string;
  tags: string[];
  summary: string;
};

export const community: CommunityItem[] = [
  {
    title: '插件 MCP 的 command 不会展开 PLUGIN_ROOT',
    url: 'https://github.com/openai/codex/issues/35762',
    source: 'openai/codex#35762',
    kind: '论坛',
    date: '2026-07-28',
    tags: ['plugins', 'MCP', 'PLUGIN_ROOT'],
    summary:
      '钩子会替换 ${PLUGIN_ROOT}，插件 mcp.json 的 command/args 不会，字面会进启动命令。相对 cwd 相对安装后的插件根；写成 "." 再配相对 args。讨论 28145 也是这条路，不要抄 Claude 的 CLAUDE_PLUGIN_ROOT。',
  },
  {
    title: '可移植 mcp.json 的 env 不会展开任意 ${VAR}',
    url: 'https://github.com/openai/codex/issues/38438',
    source: 'openai/codex#38438',
    kind: '论坛',
    date: '2026-08-13',
    tags: ['plugins', 'MCP', 'env_vars'],
    summary:
      'Agent Plugin 的 env 目前只展开 PLUGIN_ROOT 和 PLUGIN_DATA。其它 ${VAR} 会原样传给子进程。0.150 起可在 .codex-plugin/.mcp.json 给同名服务器写 env_vars 做本机转发，可移植 mcp.json 仍是源。不要把密钥写进清单。',
  },
  {
    title: '插件 .mcp.json 包装键必须是 mcpServers',
    url: 'https://github.com/openai/codex/issues/22105',
    source: 'openai/codex#22105',
    kind: '论坛',
    date: '2026-05-11',
    tags: ['plugins', 'MCP', 'mcp.json'],
    summary:
      '官方兼容布局示例把包装对象写成 mcp_servers。加载器按 camelCase 读，蛇形键会回退成一台名叫 mcp_servers 的假服务器，没有警告。改成 mcpServers，或直接把服务器表放在根上。TOML 策略仍写 plugins."name".mcp_servers。serde alias 补丁没有进主干。',
  },
  {
    title: '插件 MCP 服务器名带连字符时 list 看得到、模型调不到',
    url: 'https://github.com/openai/codex/issues/33063',
    source: 'openai/codex#33063',
    kind: '论坛',
    date: '2026-07-14',
    tags: ['plugins', 'MCP', '工具名'],
    summary:
      'key 写成 context-library 时，mcp get 显示已启用，exec 却发现不了 mcp__context-library__... 工具。改成 context_library 立刻可调。连接器路径会把连字符收成下划线，插件 MCP 目前按原名进工具命名空间。',
  },
  {
    title: 'Computer Use 空窗口：先关 sandbox_private_desktop',
    url: 'https://github.com/openai/codex/issues/37043',
    source: 'openai/codex#37043',
    kind: '论坛',
    date: '2026-08-05',
    tags: ['Windows', 'sandbox', 'Computer Use'],
    summary:
      '助手跑在 Winsta0\\CodexSandboxDesktop-... 上时，EnumWindows 找不到你正在用的窗口。config.toml 写 sandbox_private_desktop = false 回到 Winsta0\\Default，然后彻底退出 ChatGPT / Codex 再开。不要改成 unelevated 来修窗口。',
  },
  {
    title: '远程精选插件会无视 per-plugin enabled = false',
    url: 'https://github.com/openai/codex/issues/28443',
    source: 'openai/codex#28443',
    kind: '论坛',
    date: '2026-08-20',
    tags: ['plugins', 'config', '远程目录'],
    summary:
      '给 openai-curated-remote 写 enabled = false，新会话里仍可能被注入。要停远程精选目录，用 features.remote_plugin = false；整面关掉插件才是 features.plugins = false。按条关建议仍走 tool_suggest.disabled_tools。',
  },
  {
    title: 'Google 把 Cloud 技能打成 Agent Plugins 捆',
    url: 'https://x.com/Marwan_3atef/status/2098225087124029529',
    source: '@Marwan_3atef',
    kind: 'X',
    date: '2026-09-11',
    tags: ['plugins', 'Google Cloud', 'MCP'],
    summary:
      'google-cloud-developer 不是一堆散落的 SKILL.md。Codex 路径是 marketplace add google/skills，再 plugin add google-cloud-developer@google-plugins。捆里有只读 Developer Knowledge MCP，用来查官方文档，不是给你的项目写 GCP 资源。装完仍要新开会话。',
  },
  {
    title: '托管 worktree 会占磁盘，合完要清理',
    url: 'https://x.com/i/trending/2097623159155417178',
    source: 'X News',
    kind: '新闻',
    date: '2026-09-09',
    tags: ['worktree', '磁盘', 'CLI'],
    summary:
      'X 话题在抱怨 Codex 托管 worktree 留下的目录和 node_modules。CLI 树默认在 $CODEX_HOME/worktrees。合完用 /worktree 清理，不要只关会话。实验性 --worktree 不是默认；桌面仍走 Handoff 和自动清理。.worktreeinclude 只拷 ignore 文件，不会缩小磁盘。',
  },
  {
    title: 'Unity 发布官方 Codex 游戏开发插件',
    url: 'https://x.com/i/trending/2097932631295836204',
    source: 'X News',
    kind: '新闻',
    date: '2026-09-10',
    tags: ['plugins', 'Unity', 'Skills'],
    summary:
      'X 话题同步：Unity 官方插件给 Codex 一批第一方技能。安装仍是 marketplace add Unity-Technologies/unity-agent-plugin，再 plugin add unity@unity-agent-plugin，并新开会话。仓库写明只有技能，没有 MCP 和钩子，不要指望它起编辑器 RPC。',
  },
  {
    title: 'MCP OAuth scopes：CLI 和 config 盖过广告 scopes_supported',
    url: 'https://github.com/openai/codex/pull/14419',
    source: 'openai/codex#14419',
    kind: '论坛',
    date: '2026-03-12',
    tags: ['MCP', 'OAuth', '配置'],
    summary:
      '源码 resolve_oauth_scopes 的顺序是 --scopes、config、广告 scopes_supported、空列表。广告值是临时的，不会写回 TOML。Learn 页若仍写广告优先，以这条实现为准。改范围必须重新 mcp login。',
  },
  {
    title: '/import 可迁入 Claude Code 与 Cursor 配置',
    url: 'https://x.com/theaicatchup/status/2087596578051588477',
    source: '@theaicatchup',
    kind: 'X',
    date: '2026-08-12',
    tags: ['CLI', '配置', '迁移'],
    summary:
      '社区同步：Codex CLI 增加 /import，可把 Claude Code / Cursor 的 settings、子代理、斜杠命令、hooks 和 MCP 映射过来，原目录不动。迁完仍应核对 AGENTS.md。官方 CLI 参考与 changelog 已收录该命令。',
  },
  {
    title: '0.152 默认关掉 update_plan',
    url: 'https://x.com/coinweight/status/2094863172343894172',
    source: '@coinweight',
    kind: 'X',
    date: '2026-09-01',
    tags: ['配置', 'CLI'],
    summary:
      '升级到 0.152 后如果规划变安静，不一定是坏了。可在 ~/.codex/config.toml 打开 tools.update_plan.enabled，并新开会话。动手前对照本机 /help 和当前版本说明。',
  },
  {
    title: '本地 MCP 列表进不了 ChatGPT 网页 Work',
    url: 'https://x.com/gzzonkugood/status/2095675282623545833',
    source: '@gzzonkugood',
    kind: 'X',
    date: '2026-09-04',
    tags: ['MCP', '配置'],
    summary:
      '有人在 CLI 里 codex mcp add 之后，网页 Work 仍没有工具。原因是桌面应用 / CLI / IDE 扩展才读 ~/.codex/config.toml，托管网页是另一套主机。配错入口会误判成 MCP 失效。',
  },
  {
    title: '子仓单独 clone 时读不到父仓 .codex',
    url: 'https://x.com/kanagen_jp/status/2089264968189235498',
    source: '@kanagen_jp',
    kind: 'X',
    date: '2026-08-17',
    tags: ['配置', '团队'],
    summary:
      '项目层 config.toml 只从当前 Git 根查找。monorepo 子目录被单独 clone 时，父仓的 .codex 不会出现，会话会退回 ~/.codex 的个人默认。子仓要自带一份项目配置，或把根标记设对。',
  },
  {
    title: '编码在 CLI 里开，桌面应用只负责盯和转向',
    url: 'https://x.com/DanJustiniac/status/2088362402677174446',
    source: '@DanJustiniac',
    kind: 'X',
    date: '2026-08-14',
    tags: ['工作流', 'CLI'],
    summary:
      '一种实际分工：任务从 Codex CLI 启动，ChatGPT 应用只用来监控和纠偏，从而保住 config.toml 里的系统/开发者指令，并沿用自己的 worktree 管理，而不是把非编码闲聊混进同一条工作线程。',
  },
  {
    title: '开发者在配额重置日对比 Codex 与 Claude Code',
    url: 'https://x.com/i/trending/2097161914380165298',
    source: 'X News',
    kind: '新闻',
    date: '2026-09-08',
    tags: ['工作流'],
    summary:
      'X 上的话题摘要：有人把 Codex 的 ChatGPT 云沙箱和更快的任务执行，与 Claude Code 的长上下文终端流对照，不少人当成互补而不是二选一。具体配额以账户页为准。',
  },
  {
    title: '官方编码代理与自建栈的取舍',
    url: 'https://x.com/i/trending/2096707628743454960',
    source: 'X News',
    kind: '新闻',
    date: '2026-09-06',
    tags: ['工作流', 'CLI'],
    summary:
      '讨论把 Codex CLI / Claude Code 这类官方 harness，和更可换模型的开源自建栈对比。支持官方方案的人看重对齐与内置读改测；反对者看重控制度和选模型。对本站的启发是：先把 AGENTS.md 和权限配稳，再谈换壳。',
  },
  {
    title: 'DevDay 前围绕 Codex 新能力的讨论',
    url: 'https://x.com/i/trending/2097238056495353992',
    source: 'X News',
    kind: '新闻',
    date: '2026-09-08',
    tags: ['CLI'],
    summary:
      '社区在 9 月 29 日 OpenAI DevDay 前讨论 Codex 产品线更新。细节以官方 changelog 和现场发布为准，本条只作时间线入口，不把传闻当配置事实。',
  },
  {
    title: '把吵闹的命令输出交给子代理',
    url: 'https://community.openai.com/t/tips-and-tricks-for-using-codex/1373143',
    source: 'OpenAI Developer Community',
    kind: '论坛',
    date: '2026-09-09',
    tags: ['工作流', '子代理'],
    summary:
      '官方论坛帖补充：测试日志和递归搜索会挤占主对话。优先安静命令、把全文落到临时文件、把套件跑在子代理里。可写成 AGENTS.md 的固定卫生规则。',
  },
  {
    title: 'CLI 0.154 实验性 --worktree / /worktree',
    url: 'https://x.com/Codex_Changelog/status/2097825113588498834',
    source: '@Codex_Changelog',
    kind: 'X',
    date: '2026-09-09',
    tags: ['CLI', 'worktree'],
    summary:
      '官方 changelog 同步：0.154.0 可用 --worktree 或 /worktree 给新会话/fork 建隔离 checkout，并能浏览 resume。社区提醒这是实验功能，本机没有入口时先 /experimental 或对照 /help，不要把博客里的未文档化旗标当稳定 API。',
  },
  {
    title: '0.154 worktree 可能要先开实验开关',
    url: 'https://x.com/ihuamo/status/2097856138507325558',
    source: '@ihuamo',
    kind: 'X',
    date: '2026-09-10',
    tags: ['CLI', 'worktree', '配置'],
    summary:
      '升级到 0.154 后如果找不到 /worktree，先在实验特性里打开再新开会话。具体开关名以本机 /experimental 和 changelog 为准，不要抄过期博客。',
  },
  {
    title: 'AGENTS.md 配 docs/index.md 和 @tag',
    url: 'https://community.openai.com/t/a-repo-native-context-pattern-for-codex-agents-md-index-md-searchable-tags/1386068',
    source: 'OpenAI Developer Community',
    kind: '论坛',
    date: '2026-07-08',
    tags: ['AGENTS.md', '工作流'],
    summary:
      '把越写越长的 AGENTS.md 收成导航文件：docs 树用 index.md 指路，跨目录概念用 @tag 加 tags.md 注册表。目标是人类和 agent 共用同一套可 grep 的上下文，而不是再堆一份向量库。',
  },
  {
    title: '托管 worktree 可能没有 .env 和 node_modules',
    url: 'https://community.openai.com/t/codex-worktrees-need-a-runtime-preflight-for-missing-env-files/1393774',
    source: 'OpenAI Developer Community',
    kind: '论坛',
    date: '2026-08-31',
    tags: ['worktree', '配置'],
    summary:
      '工具创建的 worktree 不一定会跑本地 environment setup。官方回应：用 .worktreeinclude 拷贝指定 ignore 文件，生产密钥不要这么带。测试用无密钥默认值和假变量更稳。',
  },
  {
    title: '0.153.4 实验性 context_management',
    url: 'https://community.openai.com/t/experimental-context-management-compaction-in-codex/1395578',
    source: 'OpenAI Developer Community',
    kind: '论坛',
    date: '2026-09-07',
    tags: ['会话', '配置'],
    summary:
      '论坛记录：比单纯 compact 摘要更细的上下文管理，默认关闭，config 里 features.context_management.experimental_mode。键名和默认值以本机 changelog / /help 为准，不要当稳定功能写进团队配置。',
  },
  {
    title: 'Windows setup refresh：.git 被 CodexSandboxOffline 占走',
    url: 'https://community.openai.com/t/codex-desktop-windows-fix-for-helper-unknown-error-setup-refresh-had-errors/1392808',
    source: 'OpenAI Developer Community',
    kind: '论坛',
    date: '2026-09-01',
    tags: ['Windows', '沙箱'],
    summary:
      '桌面应用报 helper_unknown_error: setup refresh had errors 时，先看 sandbox.log 里的 SetNamedSecurityInfoW failed: 5。常见原因是 .git / .codex 所有者变成 CodexSandboxOffline。结束全部 ChatGPT.exe 后，用管理员 icacls 把所有权改回自己的账户，不必重装。',
  },
  {
    title: '桌面 Record & Replay：演示一遍生成技能',
    url: 'https://community.openai.com/t/introducing-record-replay/1384088',
    source: 'OpenAI Developer Community',
    kind: '论坛',
    date: '2026-06-18',
    tags: ['Skills', '桌面'],
    summary:
      '官方在论坛宣布 macOS Record & Replay：在桌面应用里录一次流程，产出可检查、可编辑的技能。初期不含 EEA、英国和瑞士，且 Computer Use 必须可用。这不是 CLI 功能，生成的 SKILL.md 之后可以在 CLI 里调用。',
  },
  {
    title: '换目录后会话像丢了：先 resume --all',
    url: 'https://x.com/dilemmaaa1337/status/2097872917224714591',
    source: '@dilemmaaa1337',
    kind: 'X',
    date: '2026-09-10',
    tags: ['CLI', '会话'],
    summary:
      '有人重启 Codex 后觉得对话只剩最初几条。社区提醒：resume --last 默认按当前工作目录过滤。换过文件夹先试 codex resume --all，记录往往还在。',
  },
  {
    title: 'WSL 通知会拉起 PowerShell EncodedCommand Toast',
    url: 'https://community.openai.com/t/codex-cli-on-windows-wsl-triggers-edr-alert-due-to-powershell-encodedcommand-toast-notifications/1375803',
    source: 'OpenAI Developer Community',
    kind: '论坛',
    date: '2026-03-05',
    tags: ['Windows', '通知', '安全'],
    summary:
      'WSL 里跑 CLI 时，TUI 通知可能经 powershell.exe -EncodedCommand 发 Windows Toast，触发 EDR。只设 tui.notifications = false 不够，还要清掉顶层 notify 和会弹系统通知的 Stop 钩子。',
  },
  {
    title: '技能写进 AGENTS.md 更容易被选中',
    url: 'https://community.openai.com/t/does-codex-in-vs-code-or-in-general-needs-skills-to-be-mentioned-in-agents-md/1374491',
    source: 'OpenAI Developer Community',
    kind: '论坛',
    date: '2026-02-18',
    tags: ['Skills', 'AGENTS.md', 'IDE'],
    summary:
      '官方仍靠 SKILL.md 的 description 做发现。社区反馈：在当前会话加载的 AGENTS.md 里列出技能名和 SKILL.md 全路径，隐式调用更稳。不必手写，可以让 Codex 先生成再改。仓库技能要从该仓根启动会话。',
  },
  {
    title: '远端 SSH 找不到 codex：login shell 没有 nvm PATH',
    url: 'https://github.com/openai/codex/issues/19744',
    source: 'openai/codex#19744',
    kind: '论坛',
    date: '2026-09-10',
    tags: ['SSH', 'Remote', 'PATH'],
    summary:
      '桌面 Remote / SSH 用远端 login shell 起 app-server。交互 SSH 里 nvm 能找到 codex，干净 bash -lc 却没有。把 wrapper 放到 ~/.local/bin，或把 PATH 写进 ~/.profile，不要只写 ~/.bashrc。',
  },
  {
    title: 'Windows 桌面走 WSL 时 nvm/fnm 不在 PATH',
    url: 'https://github.com/openai/codex/issues/13566',
    source: 'openai/codex#13566',
    kind: '论坛',
    date: '2026-09-10',
    tags: ['Windows', 'WSL', 'PATH'],
    summary:
      'Windows 桌面的 WSL 命令会话常是非 login / 非交互，不读 .zshrc，nvm 和 fnm 初始化进不去。对比 zsh -lc 能找到、zsh -c 找不到。把 PATH 写进 ~/.profile，或用 shell_environment_policy.set 写死 node bin，不要只改交互 rc。',
  },
  {
    title: '链接 worktree 里项目 hooks.json 可能根本没加载',
    url: 'https://github.com/openai/codex/issues/27133',
    source: 'openai/codex#27133',
    kind: '论坛',
    date: '2026-08-25',
    tags: ['hooks', 'worktree', '配置'],
    summary:
      '链接 worktree 的 .git 是文件。有人发现项目 .codex/hooks.json 静默不跑，只有 ~/.codex 用户钩子生效。绕过信任旗标也没用。官方意图是钩子跟主仓走；发现失败就先把钩子放到用户目录。',
  },
  {
    title: '权限档读不到 AGENTS.md 会误报 sessions corrupt',
    url: 'https://github.com/openai/codex/issues/40937',
    source: 'openai/codex#40937',
    kind: '论坛',
    date: '2026-08-26',
    tags: ['permissions', 'AGENTS.md', '沙箱'],
    summary:
      '自定义权限档读不到工作区时，会话起不来，错误却让人清 ~/.codex/sessions。真正失败的是沙箱读 AGENTS.md。给工作区读权限，或暂时 project_doc_max_bytes = 0。Windows 上同一问题会报 os error 206。',
  },
  {
    title: '0.150.1 未信任项目仍可能注入 AGENTS.md',
    url: 'https://github.com/openai/codex/issues/41499',
    source: 'openai/codex#41499',
    kind: '论坛',
    date: '2026-08-29',
    tags: ['AGENTS.md', '信任', '安全'],
    summary:
      '0.150.0 写明未信任项目不再提供项目级指令。有人在 0.150.1 用隔离 CODEX_HOME 复现：trust_level=untrusted 后，哨兵字符串仍出现在 debug prompt-input 和 exec 可见输入里。克隆陌生仓先自己读文件。',
  },
  {
    title: 'Windows deny-read 的无界 glob 会把会话撑爆成 os error 206',
    url: 'https://github.com/openai/codex/issues/41809',
    source: 'openai/codex#41809',
    kind: '论坛',
    date: '2026-08-31',
    tags: ['Windows', 'permissions', '沙箱'],
    summary:
      '企业档里 ~/AppData/Local/Google/Chrome/** 会在启动前展开上万条路径，塞进沙箱 helper 命令行后超过 32,767 字符上限。错误写成文件名太长。绕过：deny 写精确目录，不要拖尾 /**。',
  },
  {
    title: 'execpolicy allow 遇上 deny-read 会静默留在沙箱',
    url: 'https://github.com/openai/codex/issues/38318',
    source: 'openai/codex#38318',
    kind: '论坛',
    date: '2026-08-13',
    tags: ['execpolicy', 'permissions', '沙箱'],
    summary:
      '权限档只要有任意 deny-read，allow 规则就不会出沙箱。check 仍报 allow，git fetch 还会弹窗。要挡密钥就接受沙箱内执行；要出沙箱就不要在同一档写 deny-read。',
  },
  {
    title: 'mcp_tool Stop 钩子在 MCP 缺失时 fail-open',
    url: 'https://github.com/openai/codex/issues/39858',
    source: 'openai/codex#39858',
    kind: '论坛',
    date: '2026-08-21',
    tags: ['hooks', 'MCP', 'exec'],
    summary:
      'mcp_tool Stop 在服务器未注册或起不来时，钩子记 Failed，turn 仍 completed。exec JSONL 还不带 hook 事件。不要把 MCP Stop 当完成门；failureMode 还只是提案。',
  },
  {
    title: '反复 block 的 Stop 钩子会把 CLI 卡进无限续写',
    url: 'https://github.com/openai/codex/issues/37937',
    source: 'openai/codex#37937',
    kind: '论坛',
    date: '2026-08-11',
    tags: ['hooks', 'Stop', 'CLI'],
    summary:
      'Stop 每次 block 都会再开一轮模型。没有次数上限。依赖坏了却反复返回同一段 block 时，只能杀进程。钩子必须认 stop_hook_active。',
  },
  {
    title: 'exec 里插件 MCP 键少了 @marketplace 会报用户取消',
    url: 'https://github.com/openai/codex/issues/29857',
    source: 'openai/codex#29857',
    kind: '论坛',
    date: '2026-06-24',
    tags: ['MCP', 'exec', '插件'],
    summary:
      '插件审批写在 inspect-skills 而不是 inspect-skills@meridian 时，lookup miss 落到 auto。exec 没有批准 UI，错误写成 user cancelled。正确键名后 default_tools_approval_mode = approve 即可，不必 --yolo。',
  },
  {
    title: '关掉 Codex CLI 欢迎屏闪烁星星',
    url: 'https://x.com/cooperx86/status/2098051356921586076',
    source: '@cooperx86',
    kind: 'X',
    date: '2026-09-10',
    tags: ['TUI', 'config.toml', 'CLI'],
    summary:
      '欢迎动画闪得心烦时，在已有 [tui] 表写入 animations = false，然后完全退出再开新会话。官方键还覆盖微光和 spinner。标签标题还在跳就再把 terminal_title 改成只有 project。',
  },
  {
    title: 'codex exec 会在可选 MCP 1 秒宽限后丢掉已握手的工具',
    url: 'https://github.com/openai/codex/issues/38689',
    source: 'openai/codex#38689',
    kind: '论坛',
    date: '2026-08-15',
    tags: ['MCP', 'exec', 'CI'],
    summary:
      'exec 一开始就冻结工具表。可选服务器默认只等 1000ms，tools/list 晚到也不会进第一轮。桌面后续轮会刷新所以看起来正常。exec 把服务器设 required，或 mcp_optional_startup_grace_ms = 0。',
  },
  {
    title: 'Esc 打断时 Stop 钩子不会跑',
    url: 'https://github.com/openai/codex/issues/22858',
    source: 'openai/codex#22858',
    kind: '论坛',
    date: '2026-05-15',
    tags: ['hooks', 'Interrupt', 'Stop'],
    summary:
      'run_turn 只在正常完成路径调 Stop。Esc 的 TurnAborted 直接 break，扫描器状态会卡在 running。0.150 起用 Interrupt 做打断清理；不要等 Stop 补上这条路径。',
  },
  {
    title: '子代理会把父会话全文拷进 rollout，history.max_bytes 管不了',
    url: 'https://github.com/openai/codex/issues/34061',
    source: 'openai/codex#34061',
    kind: '论坛',
    date: '2026-07-18',
    tags: ['history', 'sessions', '磁盘'],
    summary:
      '配置参考里的 [history] 只约束 history.jsonl。sessions/ 下的子代理 rollout 会复制父会话，archive 只是挪到同盘 archived_sessions。磁盘报警先 du ~/.codex/sessions，不要只改 persistence。',
  },
  {
    title: '流式时 SQLite WAL 狂写盘，RUST_LOG 压不住 TRACE',
    url: 'https://github.com/openai/codex/issues/17320',
    source: 'openai/codex#17320',
    kind: '论坛',
    date: '2026-04-10',
    tags: ['sqlite_home', '磁盘', '日志'],
    summary:
      '流式回复时 app-server 可持续往 logs_*.sqlite-wal 写数 MiB/s。报告称这与 RUST_LOG 过滤无关。先把 sqlite_home 指到独立磁盘，并和明文 log_dir、history.jsonl 分开看。',
  },
  {
    title: 'codex queue 打 exec 线程可能成功退出却丢掉消息',
    url: 'https://github.com/openai/codex/issues/41060',
    source: 'openai/codex#41060',
    kind: '论坛',
    date: '2026-08-27',
    tags: ['queue', 'exec', '会话'],
    summary:
      '对 codex exec 开的线程 queue，命令常 exit 0，消息却进不了当前轮，竞态下甚至从磁盘消失。没有 list/flush。只对交互 TUI 或桌面会话用 queue。',
  },
  {
    title: 'compact_prompt 在 OpenAI 远程压缩里会被静默忽略',
    url: 'https://github.com/openai/codex/issues/34428',
    source: 'openai/codex#34428',
    kind: '论坛',
    date: '2026-07-20',
    tags: ['compact_prompt', '/compact', '配置'],
    summary:
      '内置 OpenAI / Azure 走远程压缩，config.toml 里的 compact_prompt 和 experimental_compact_prompt_file 不会进摘要。0.150.1 仍如此。本地 OSS 路径才会读。用标记句验证，不要只看配置已加载。',
  },
  {
    title: 'commit_attribution 只在打开 codex_git_commit 时生效',
    url: 'https://github.com/openai/codex/issues/19799',
    source: 'openai/codex#19799',
    kind: '论坛',
    date: '2026-05-06',
    tags: ['commit_attribution', 'git', 'features'],
    summary:
      '有人问默认会不会给提交加共同作者。文档随后写明：先开 features.codex_git_commit，commit_attribution 才有用。键值是身份字符串；空字符串关掉。对照本机 features list，这个开关仍是开发中。',
  },
  {
    title: '桌面应用自己开的线程可能不读 developer_instructions',
    url: 'https://github.com/openai/codex/issues/11004',
    source: 'openai/codex#11004',
    kind: '论坛',
    date: '2026-02-07',
    tags: ['developer_instructions', '桌面', '配置'],
    summary:
      'CLI 会把顶层 developer_instructions 追加进会话；桌面应用自己开的线程可能完全不注入。2026-08 仍有人复现。桌面要个人风格用 Personalization 或 ~/.codex/AGENTS.md，并用 debug prompt-input 核对。',
  },
  {
    title: '超大工具输出会整段落进上下文并加速打满额度',
    url: 'https://github.com/openai/codex/issues/16664',
    source: 'openai/codex#16664',
    kind: '论坛',
    date: '2026-04-03',
    tags: ['tool_output_token_limit', '上下文', '配额'],
    summary:
      '有人发现超大工具输出会进会话历史，5 小时额度掉得特别快。维护者说明可用顶层 tool_output_token_limit 覆盖；调太小会让模型拿到截断结果后行为怪异。这和 MCP 单工具 output_token_limit 不是同一键。',
  },
  {
    title: '后台空轮询每次都把完整历史再打一遍 API',
    url: 'https://github.com/openai/codex/issues/13733',
    source: 'openai/codex#13733',
    kind: '论坛',
    date: '2026-03-06',
    tags: ['background_terminal_max_timeout', 'unified_exec', '配额'],
    summary:
      '后台编译或测试时空 write_stdin 轮询会反复带着完整历史打 API。background_terminal_max_timeout 是空轮询上限，不是间隔；空轮询仍有大约 5 秒下限。exec_command 首轮大约 30 秒封顶，不读这个键。调大它不能当成省 token 开关。',
  },
  {
    title: '关掉 CLI 启动更新提示：键必须写在顶层',
    url: 'https://github.com/openai/codex/issues/14336',
    source: 'openai/codex#14336',
    kind: '论坛',
    date: '2026-03-11',
    tags: ['check_for_update_on_startup', 'CLI', '更新'],
    summary:
      '有人想关掉每日 Update available 提示。维护者给出 check_for_update_on_startup = false，并强调必须是顶层键。写进子表会看起来配了仍弹窗。这只关检查，不是自动安装。',
  },
  {
    title: 'check_for_update_on_startup 不影响桌面应用标题栏 Update',
    url: 'https://github.com/openai/codex/issues/18543',
    source: 'openai/codex#18543',
    kind: '论坛',
    date: '2026-04-17',
    tags: ['check_for_update_on_startup', '桌面', '更新'],
    summary:
      'config.toml 里关掉启动检查后，桌面应用标题栏仍可能出现 Update。维护者说明该键只对 CLI/TUI 生效，不管 IDE 扩展和 Codex 应用。桌面内置更新走托管 requirements.toml 的 in_app_updates。',
  },
  {
    title: '开发中特性警告写进 [notice] 不会消失',
    url: 'https://github.com/openai/codex/issues/10013',
    source: 'openai/codex#10013',
    kind: '论坛',
    date: '2026-01-27',
    tags: ['suppress_unstable_features_warning', 'features', '配置'],
    summary:
      '有人把 suppress_unstable_features_warning 写进 [notice]，警告还在。维护者确认必须是顶层键。关警告不会让 collab 一类开发中开关变稳定。',
  },
  {
    title: '桌面应用每次启动把已移除的 js_repl 写回 config.toml',
    url: 'https://github.com/openai/codex/issues/24387',
    source: 'openai/codex#24387',
    kind: '论坛',
    date: '2026-05-25',
    tags: ['js_repl', '桌面', 'config.toml'],
    summary:
      'CLI 把 js_repl 标成 removed 后，桌面应用启动仍可能用 config/batchWrite 写回 features.js_repl = false，有时还带回 mcp_servers.node_repl。删掉这行再开桌面，它还会回来。不要把它当成还能打开的实验开关。',
  },
  {
    title: '第三方 MCP 写 auth=chatgpt 拿不到 ChatGPT 会话',
    url: 'https://github.com/openai/codex/pull/29733',
    source: 'openai/codex#29733',
    kind: '论坛',
    date: '2026-06-23',
    tags: ['MCP', 'auth', 'chatgpt'],
    summary:
      '维护者把 ChatGPT 会话鉴权从写死的 Apps 服务器名改成可选项，但只允许 URL 与 chatgpt_base_url 同源。任意第三方 MCP 不能把会话令牌拐走。现行键是 auth = chatgpt，不是早期补丁里的 use_chatgpt_auth。',
  },
  {
    title: 'tools.view_image 已当 noop 删除，文档可能仍列出',
    url: 'https://github.com/openai/codex/pull/22501',
    source: 'openai/codex#22501',
    kind: '论坛',
    date: '2026-05-13',
    tags: ['view_image', '配置', '图片'],
    summary:
      '维护者确认 tools.view_image 早就失效，PR 把它从配置里拿掉。官方配置参考和 sample 有时还写着这个布尔键。要给模型看图，用 CLI 的 -i / --image 或 IDE 拖图，不要再往 config.toml 写这行。',
  },
];
