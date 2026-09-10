import type { Category } from "../types";

export const categories: Category[] = [
  {
    id: "mindset",
    chapter: "01",
    name: "心智模型",
    blurb: "把 Codex 当可配置的队友，而不是一次性聊天框。",
  },
  {
    id: "prompt",
    chapter: "02",
    name: "提示与规划",
    blurb: "Goal / Context / Constraints / Done when，以及何时先计划。",
  },
  {
    id: "agents-md",
    chapter: "03",
    name: "AGENTS.md",
    blurb: "持久规则放这里：发现顺序、覆盖、体积上限与审查规则。",
  },
  {
    id: "config",
    chapter: "04",
    name: "配置与 Profiles",
    blurb: "config.toml 管运行时。个人默认、项目覆盖、独立 profile 文件。",
  },
  {
    id: "sandbox",
    chapter: "05",
    name: "沙箱与权限",
    blurb: "approval 决定何时询问，sandbox 决定能碰哪些文件。",
  },
  {
    id: "commands",
    chapter: "06",
    name: "斜杠命令",
    blurb: "TUI 里真正省时间的快捷键、斜杠命令与排队输入。",
  },
  {
    id: "session",
    chapter: "07",
    name: "会话与上下文",
    blurb: "一事一线程，/compact、/fork、/side、/goal 各管一种形状的工作。",
  },
  {
    id: "skills",
    chapter: "08",
    name: "Skills 与 Plugins",
    blurb: "同一套步骤说第二次，就该收成 SKILL.md 或插件。",
  },
  {
    id: "mcp",
    chapter: "09",
    name: "MCP",
    blurb: "仓库外的实时数据用 MCP，不要一上来接满所有工具。",
  },
  {
    id: "subagents",
    chapter: "10",
    name: "子代理",
    blurb: "只在你明确要求时并行；重叠写文件请改用 worktree。",
  },
  {
    id: "hooks",
    chapter: "11",
    name: "Hooks 与 Rules",
    blurb: "生命周期脚本与命令规则：拦危险操作、补上下文、强制校验。",
  },
  {
    id: "automation",
    chapter: "12",
    name: "自动化与 CI",
    blurb: "codex exec、JSONL、output-schema，以及 GitHub Action 的安全用法。",
  },
  {
    id: "cloud",
    chapter: "13",
    name: "Cloud 与并行",
    blurb: "Worktree、Cloud 任务、Best-of-N 与定时任务。",
  },
  {
    id: "security",
    chapter: "14",
    name: "安全",
    blurb: "密钥、供应链、沙箱失败关闭，以及不要把 API Key 交给仓库代码。",
  },
  {
    id: "debug",
    chapter: "15",
    name: "排错",
    blurb: "doctor、指令链审计、截断、PATH 影子二进制。",
  },
  {
    id: "recipes",
    chapter: "16",
    name: "工作流配方",
    blurb: "修 CI、测试先行、本地审查、迁移与大型重构的现成配方。",
  },
];

export const categoryMap = Object.fromEntries(
  categories.map((item) => [item.id, item]),
) as Record<Category["id"], Category>;
