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
    title: "近 100 个稳定版 Codex CLI：我们怎么对照的",
    summary:
      "把 npm 上最近 100 个稳定版 @openai/codex 的 linux-x64 二进制跑一遍 --help 和 features list。命令从 13 个涨到 25 个，特性开关从 16 个涨到 142 个。下面 10 篇按区间写差别。",
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
    title: "0.69–0.79：技能注入、项目层配置和 exec 子命令旗标",
    summary:
      "顶层仍是 13 个命令。这一段把 Skills、项目层 .codex/config.toml、/experimental 和 exec resume/review 的全局旗标铺进日常路径。",
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
    title: "0.80–0.91：fork 进 CLI，默认模型换成 gpt-5.2-codex",
    summary:
      "0.81 增加 codex fork 和 --no-alt-screen。协作、连接器和网络沙箱代理在 TUI / app-server 里铺开，子代理数量被收紧。",
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
    title: "0.92–0.101：debug 独立、--ephemeral，以及 Plan / Steer 默认开",
    summary:
      "0.95 把 debug 从 sandbox 的别名里拆出来。0.99 给 exec 加上 --ephemeral。Skills 目录迁到 .agents/skills，personality 和 unified_exec 陆续标成 stable。",
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
    title: "0.102–0.113：插件、memories、Guardian 和 request_permissions",
    summary:
      "命令表没动，特性开关从 32 涨到 46。插件系统、/fast、语音转写和运行时要权限的工具都在这一段进 features list。",
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
    title: "0.114–0.123：Hooks、远程 TUI，以及 marketplace 改名为 plugin",
    summary:
      "0.119 增加 exec-server，0.121 的 marketplace 在 0.122 改成 plugin。根命令出现 --remote。plugins 和 multi_agent 标成 stable。",
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
    title: "0.124–0.135：update / doctor / remote-control，--full-auto 退役",
    summary:
      "自更新、诊断和远程控制进顶层命令。0.128 去掉 --full-auto。0.131 短暂出现 --profile-v2，0.134 又收回，只留 --profile。",
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
    title: "0.136–0.142：archive / delete、/import，以及会话卫生",
    summary:
      "会话从只能 resume/fork，变成可以归档、恢复和永久删除。0.140 的 /import 开始从 Claude Code 迁配置。plugin 子命令补上 --json。",
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
    title: "0.142.4–0.144.6：remote-control pair，以及一串补丁版",
    summary:
      "命令表没再加字。真正的 CLI 变化在 0.143：remote-control pair，sandbox 旗标改名。后面六个 0.144.x 多半是安装、Guardian 和模型元数据补丁。",
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
    title: "0.145–0.151：agents / queue / --approve-for-me，untrusted 离开 --help",
    summary:
      "0.147 增加自动审批旗标，0.148 增加 exec fork 和 migrate-rollouts，0.149 增加 agents 与 queue。审批策略里的 untrusted 从此不再出现在 --help。",
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
    title: "0.152–0.155：--worktree、MCP 包名，以及 mcp-server 退场",
    summary:
      "0.154 给根命令加上 --worktree，同时去掉顶层 mcp-server。0.152 起 MCP 名称允许 : @ / .。0.155 把实验性 /voice 放进 /experimental。",
    from: "0.152.0",
    to: "0.155.1",
    versions: ["0.152.0", "0.152.1", "0.153.0", "0.153.1", "0.153.2", "0.153.3", "0.153.4", "0.154.0", "0.155.0", "0.155.1"],
    tags: ["worktree", "MCP", "TUI"],
    body: era152,
    sources: [npm("0.155.1"), rust("0.152.0"), rust("0.154.0"), rust("0.155.1"), learnChangelog],
  },
];

export const updateMap = new Map(updates.map((item) => [item.id, item]));
