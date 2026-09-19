import type { Source } from "../types";
import { body as overview } from "./update-bodies/00-overview";
import { body as era069 } from "./update-bodies/01-069-079";
import { body as era080 } from "./update-bodies/02-080-091";
import { body as era092 } from "./update-bodies/03-092-101";
import { body as era102 } from "./update-bodies/04-102-113";
import { body as era114 } from "./update-bodies/05-114-123";
import { body as era124 } from "./update-bodies/06-124-135";
import { body as era136 } from "./update-bodies/07-136-142";
import { body as era142 } from "./update-bodies/08-142-144";
import { body as era145 } from "./update-bodies/09-145-151";
import { body as era152 } from "./update-bodies/10-152-155";

export type UpdateArticle = {
  id: string;
  no: number;
  title: string;
  summary: string;
  from: string;
  to: string;
  versions: string[];
  tags: string[];
  body: string;
  sources: Source[];
};

function rust(version: string): Source {
  return {
    label: `openai/codex rust-v${version}`,
    url: `https://github.com/openai/codex/releases/tag/rust-v${version}`,
  };
}

function npm(version: string): Source {
  return {
    label: `npm @openai/codex@${version}`,
    url: `https://www.npmjs.com/package/@openai/codex/v/${version}`,
  };
}

const officialChangelog: Source = {
  label: "OpenAI · Codex changelog",
  url: "https://developers.openai.com/codex/changelog",
};

const learnChangelog: Source = {
  label: "ChatGPT Learn · Codex changelog",
  url: "https://learn.chatgpt.com/docs/changelog",
};

export const updates: UpdateArticle[] = [
  {
    id: "cli-100-overview",
    no: 1,
    title: "Codex CLI 版本更新日志：0.69–0.155.1",
    summary:
      "按版本倒序整理新增功能、修复和兼容性变化，涵盖工作树、插件、Hooks、MCP、会话管理与命令调整。",
    from: "0.69.0",
    to: "0.155.1",
    versions: [
      "0.69.0", "0.71.0", "0.72.0", "0.73.0", "0.74.0", "0.75.0", "0.76.0", "0.77.0", "0.78.0", "0.79.0",
      "0.80.0", "0.81.0", "0.84.0", "0.85.0", "0.86.0", "0.87.0", "0.88.0", "0.89.0", "0.90.0", "0.91.0",
      "0.92.0", "0.93.0", "0.94.0", "0.95.0", "0.96.0", "0.97.0", "0.98.0", "0.99.0", "0.100.0", "0.101.0",
      "0.102.0", "0.103.0", "0.104.0", "0.105.0", "0.106.0", "0.107.0", "0.110.0", "0.111.0", "0.112.0", "0.113.0",
      "0.114.0", "0.115.0", "0.116.0", "0.117.0", "0.118.0", "0.119.0", "0.120.0", "0.121.0", "0.122.0", "0.123.0",
      "0.124.0", "0.125.0", "0.128.0", "0.129.0", "0.130.0", "0.131.0", "0.132.0", "0.133.0", "0.134.0", "0.135.0",
      "0.136.0", "0.137.0", "0.138.0", "0.139.0", "0.140.0", "0.141.0", "0.142.0", "0.142.1", "0.142.2", "0.142.3",
      "0.142.4", "0.142.5", "0.143.0", "0.144.0", "0.144.1", "0.144.2", "0.144.3", "0.144.4", "0.144.5", "0.144.6",
      "0.145.0", "0.146.0", "0.146.1", "0.147.0", "0.148.0", "0.149.0", "0.149.1", "0.150.0", "0.150.1", "0.151.0",
      "0.152.0", "0.152.1", "0.153.0", "0.153.1", "0.153.2", "0.153.3", "0.153.4", "0.154.0", "0.155.0", "0.155.1",
    ],
    tags: ["CLI", "changelog", "对照"],
    body: overview,
    sources: [
      npm("0.155.1"),
      rust("0.69.0"),
      rust("0.155.1"),
      officialChangelog,
      learnChangelog,
    ],
  },
  {
    id: "cli-069-079",
    no: 2,
    title: "0.69–0.79：Skills、项目配置与 exec 参数",
    summary: "新增 Skills 会话加载、项目层配置、外部编辑器入口，以及 exec resume/review 全局参数支持。",
    from: "0.69.0",
    to: "0.79.0",
    versions: ["0.69.0", "0.71.0", "0.72.0", "0.73.0", "0.74.0", "0.75.0", "0.76.0", "0.77.0", "0.78.0", "0.79.0"],
    tags: ["Skills", "config.toml", "exec"],
    body: era069,
    sources: [npm("0.69.0"), rust("0.69.0"), rust("0.79.0"), officialChangelog],
  },
  {
    id: "cli-080-091",
    no: 3,
    title: "0.80–0.91：会话分支、登录与协作模式",
    summary: "新增 codex fork、设备码登录和连接器支持，调整技能元数据、权限入口及子代理数量上限。",
    from: "0.80.0",
    to: "0.91.0",
    versions: ["0.80.0", "0.81.0", "0.84.0", "0.85.0", "0.86.0", "0.87.0", "0.88.0", "0.89.0", "0.90.0", "0.91.0"],
    tags: ["fork", "沙箱", "子代理"],
    body: era080,
    sources: [npm("0.81.0"), rust("0.80.0"), rust("0.91.0"), officialChangelog],
  },
  {
    id: "cli-092-101",
    no: 4,
    title: "0.92–0.101：Plan、debug 与临时会话",
    summary: "新增独立 debug 命令、临时会话和 TUI 配置入口；调整技能目录与 Plan、Steer 的默认行为。",
    from: "0.92.0",
    to: "0.101.0",
    versions: ["0.92.0", "0.93.0", "0.94.0", "0.95.0", "0.96.0", "0.97.0", "0.98.0", "0.99.0", "0.100.0", "0.101.0"],
    tags: ["debug", "exec", "Skills", "Plan"],
    body: era092,
    sources: [npm("0.99.0"), rust("0.92.0"), rust("0.101.0"), officialChangelog],
  },
  {
    id: "cli-102-113",
    no: 5,
    title: "0.102–0.113：插件、记忆与权限请求",
    summary: "新增插件系统、记忆、语音输入和运行时权限请求，改进 TUI 编辑及多代理工作流。",
    from: "0.102.0",
    to: "0.113.0",
    versions: ["0.102.0", "0.103.0", "0.104.0", "0.105.0", "0.106.0", "0.107.0", "0.110.0", "0.111.0", "0.112.0", "0.113.0"],
    tags: ["plugins", "memories", "Guardian"],
    body: era102,
    sources: [npm("0.110.0"), rust("0.102.0"), rust("0.113.0"), officialChangelog],
  },
  {
    id: "cli-114-123",
    no: 6,
    title: "0.114–0.123：Hooks、远程连接与插件命令",
    summary: "新增 Hooks、远程 TUI 和 exec-server；marketplace 更名为 plugin，支持忽略用户配置和规则。",
    from: "0.114.0",
    to: "0.123.0",
    versions: ["0.114.0", "0.115.0", "0.116.0", "0.117.0", "0.118.0", "0.119.0", "0.120.0", "0.121.0", "0.122.0", "0.123.0"],
    tags: ["Hooks", "plugin", "remote", "exec-server"],
    body: era114,
    sources: [npm("0.122.0"), rust("0.114.0"), rust("0.123.0"), officialChangelog],
  },
  {
    id: "cli-124-135",
    no: 7,
    title: "0.124–0.135：自更新、诊断与配置迁移",
    summary: "新增 update、doctor 和 remote-control；Hooks 稳定，移除 --full-auto，并调整 profile 与登录参数。",
    from: "0.124.0",
    to: "0.135.0",
    versions: ["0.124.0", "0.125.0", "0.128.0", "0.129.0", "0.130.0", "0.131.0", "0.132.0", "0.133.0", "0.134.0", "0.135.0"],
    tags: ["update", "doctor", "profile", "Hooks"],
    body: era124,
    sources: [npm("0.128.0"), rust("0.124.0"), rust("0.135.0"), officialChangelog],
  },
  {
    id: "cli-136-142",
    no: 8,
    title: "0.136–0.142.3：会话管理与配置导入",
    summary: "新增会话归档、恢复、删除和配置导入；插件命令支持 JSON 输出，改进远程控制与任务切换。",
    from: "0.136.0",
    to: "0.142.3",
    versions: ["0.136.0", "0.137.0", "0.138.0", "0.139.0", "0.140.0", "0.141.0", "0.142.0", "0.142.1", "0.142.2", "0.142.3"],
    tags: ["session", "archive", "plugin", "import"],
    body: era136,
    sources: [npm("0.140.0"), rust("0.136.0"), rust("0.142.3"), officialChangelog],
  },
  {
    id: "cli-142-144",
    no: 9,
    title: "0.142.4–0.144.6：远程配对与修复更新",
    summary: "新增远程控制配对和系统代理支持；修复安装器、Guardian 审批及模型元数据问题。",
    from: "0.142.4",
    to: "0.144.6",
    versions: ["0.142.4", "0.142.5", "0.143.0", "0.144.0", "0.144.1", "0.144.2", "0.144.3", "0.144.4", "0.144.5", "0.144.6"],
    tags: ["remote-control", "sandbox", "补丁"],
    body: era142,
    sources: [npm("0.143.0"), rust("0.142.4"), rust("0.144.6"), officialChangelog],
  },
  {
    id: "cli-145-151",
    no: 10,
    title: "0.145–0.151：自动审批、任务管理与队列",
    summary: "新增自动审批、agents 仪表盘、消息队列及会话导出，扩展 Hooks、插件和 MCP 支持。",
    from: "0.145.0",
    to: "0.151.0",
    versions: ["0.145.0", "0.146.0", "0.146.1", "0.147.0", "0.148.0", "0.149.0", "0.149.1", "0.150.0", "0.150.1", "0.151.0"],
    tags: ["agents", "queue", "审批", "exec"],
    body: era145,
    sources: [npm("0.149.0"), rust("0.145.0"), rust("0.151.0"), learnChangelog],
  },
  {
    id: "cli-152-155",
    no: 11,
    title: "0.152–0.155.1：工作树、语音与 MCP 变更",
    summary: "新增托管工作树、语音和 Touch ID 支持；调整 MCP 命名、工具输出限制及 reasoning summaries 默认值。",
    from: "0.152.0",
    to: "0.155.1",
    versions: ["0.152.0", "0.152.1", "0.153.0", "0.153.1", "0.153.2", "0.153.3", "0.153.4", "0.154.0", "0.155.0", "0.155.1"],
    tags: ["worktree", "MCP", "TUI"],
    body: era152,
    sources: [npm("0.155.1"), rust("0.152.0"), rust("0.154.0"), rust("0.155.1"), learnChangelog],
  },
];

export const updateMap = new Map(updates.map((item) => [item.id, item]));

export const updateVersionCount = new Set(updates.flatMap((item) => item.versions)).size;
