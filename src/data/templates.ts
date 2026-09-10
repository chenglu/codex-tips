import type { Template } from "../types";

export const templates: Template[] = [
  {
    id: "agents-md",
    title: "仓库 AGENTS.md",
    filename: "AGENTS.md",
    summary: "短、可验证、带禁止事项。按你们真实的命令改，不要直接提交脚手架。",
    code: `# AGENTS.md

## 仓库地图
- \`src/\` 应用代码
- \`tests/\` 集成测试；单测挨着实现文件
- \`infra/\` 不要在功能任务里改

## 命令
- 安装：\`pnpm install\`
- 类型检查：\`pnpm typecheck\`
- 单测：\`pnpm test\`
- lint：\`pnpm lint\`

## 约定
- 公共 API 变更必须更新 \`docs/\` 和调用方
- 优先最小 diff；不要顺手重构
- 包管理器只用 pnpm

## 禁止
- 不要改生成的迁移，除非任务就是迁移
- 不要提交密钥、\`.env\`、\`auth.json\`
- 实现任务中不要改测试来迁就实现

## 完成定义
- 相关测试通过
- typecheck 与 lint 干净
- 用中文写清为什么这样改
`,
  },
  {
    id: "agents-override",
    title: "本机 AGENTS.override.md",
    filename: "AGENTS.override.md",
    summary: "临时或本机规则。加入 .gitignore，不要提交。",
    code: `# AGENTS.override.md
# 本机实验。完成后删除本文件。

## 本机会话
- 回答用简体中文
- 提交信息用约定式中文
- 不要碰 ~/dotfiles
`,
  },
  {
    id: "user-config",
    title: "个人 config.toml",
    filename: "~/.codex/config.toml",
    summary: "个人默认。模型、推理、沙箱、搜索。项目不要覆盖鉴权键。",
    code: `model = "gpt-5.6-sol"
model_reasoning_effort = "medium"
plan_mode_reasoning_effort = "high"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
web_search = "cached"
personality = "pragmatic"
file_opener = "cursor"
project_doc_max_bytes = 65536
project_doc_fallback_filenames = ["TEAM_GUIDE.md", "CLAUDE.md"]

[features]
codex_hooks = true
multi_agent = true

[agents]
enabled = true
max_threads = 4
max_depth = 1
`,
  },
  {
    id: "fast-profile",
    title: "fast profile",
    filename: "~/.codex/fast.config.toml",
    summary: "独立文件，不是 [profiles.fast]。启动：codex --profile fast",
    code: `# ~/.codex/fast.config.toml
model = "gpt-5.6-luna"
model_reasoning_effort = "low"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
web_search = "disabled"
`,
  },
  {
    id: "deep-profile",
    title: "deep-review profile",
    filename: "~/.codex/deep-review.config.toml",
    summary: "规划与审查用更高推理。实现阶段仍可回默认。",
    code: `# ~/.codex/deep-review.config.toml
model = "gpt-5.6-sol"
model_reasoning_effort = "high"
plan_mode_reasoning_effort = "xhigh"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
`,
  },
  {
    id: "reviewer-agent",
    title: "审查子代理",
    filename: ".codex/agents/reviewer.toml",
    summary: "只读审查者。标问题，默认不改代码。",
    code: `name = "reviewer"
description = "在合并前审查正确性、安全、缺失测试和意外 API 变化。"
developer_instructions = """
像 owner 一样审这份 diff。
先报真实风险，再是缺失测试，再是风格。
标出问题但不要修改文件，除非用户明确要求你修。
引用具体文件和行。
"""
sandbox_mode = "read-only"
model_reasoning_effort = "high"
`,
  },
  {
    id: "skill-md",
    title: "最小 SKILL.md",
    filename: ".agents/skills/release-notes/SKILL.md",
    summary: "description 决定它会不会被发现。写何时用、用户会说的话。",
    code: `---
name: release-notes
description: >
  当用户要求写 changelog、release notes 或面向用户的更新说明时使用。
  触发短语：「写更新说明」「changelog」「这周发了什么」。
---

# Release notes

## 何时用
用户要把 git 历史变成面向用户的说明。

## 步骤
1. 读取请求的范围（标签、日期、PR）
2. 把提交按用户可见变化分组
3. 省略内部重构，除非影响行为
4. 用简体中文输出：新功能 / 修复 / 破坏性变更
`,
  },
  {
    id: "gitignore",
    title: ".gitignore 片段",
    filename: ".gitignore",
    summary: "覆盖文件、本机日志、会话导出不要进仓库。",
    code: `AGENTS.override.md
**/AGENTS.override.md
.codex-log/
.codex/*.local.toml
`,
  },
];
