import type { Template } from "../types";

export const templateGroupMeta = [
  { id: "agents", label: "AGENTS.md" },
  { id: "config", label: "配置" },
  { id: "terminal", label: "终端" },
  { id: "hooks", label: "Hooks" },
  { id: "plugins", label: "插件 / MCP" },
  { id: "skills", label: "Skills" },
  { id: "ci", label: "CI" },
  { id: "other", label: "其他" },
] as const;

export type TemplateGroupId = (typeof templateGroupMeta)[number]["id"];

export function templateGroupId(item: Template): TemplateGroupId {
  const file = item.filename.toLowerCase();
  if (file.includes("agents.md") || file.includes("agents.override")) return "agents";
  if (file === "terminal") return "terminal";
  if (file.includes("hook")) return "hooks";
  if (file.includes(".github") || file.endsWith(".yml") || file.endsWith("ci.sh")) return "ci";
  if (file.includes("plugin") || file.includes("mcp.json") || file.includes("marketplace")) {
    return "plugins";
  }
  if (file.includes("skill")) return "skills";
  if (file.includes("config.toml") || file.includes("requirements.toml") || file.endsWith(".toml")) {
    return "config";
  }
  return "other";
}
