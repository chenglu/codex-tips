export const siteFaqs = [
  {
    q: "Codex Tips 是什么？",
    a: "一份给 OpenAI Codex 的现场手册，把散落在官方文档、社区长文和社交媒体里的实用技巧编成可检索的网站，覆盖 CLI、桌面端、IDE 与 Cloud。",
  },
  {
    q: "怎么检索技巧？",
    a: "按 / 或 ⌘K 打开检索。目录页可按章节、难度和入口过滤；更新页按版本区间对照 CLI；每条技巧都有来源链接。",
  },
  {
    q: "更新页和官方 changelog 有什么不同？",
    a: "更新页是把 npm 上最近 100 个稳定版 Codex CLI 装出来跑 --help 和 features list，再对照 GitHub rust-v* 发行说明写成的系列文章。官方 changelog 仍是行为变化的第一来源。",
  },
  {
    q: "和官方文档是什么关系？",
    a: "本站不是官方文档镜像。动手前仍以 developers.openai.com/codex 和本机 /help 为准。",
  },
] as const;
