# Codex Tips

一份给 OpenAI Codex 的现场手册：把散落在官方文档和社区里的实用技巧编成可检索的网站。

覆盖 CLI、桌面 App、IDE 扩展与 Cloud：提示与规划、`AGENTS.md`、`config.toml`、沙箱、斜杠命令、会话、Skills、MCP、子代理、Hooks、CI 与安全。

## 本地预览

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

站点是静态的，`base` 为相对路径，可放到任意静态托管。按 `/` 或 `⌘K` 检索。

## 内容结构

- `src/data/tips-*.ts` — 技巧正文
- `src/data/cheatsheet.ts` — 速查表
- `src/data/templates.ts` — 可复制模板
- `src/data/categories.ts` — 章节

新增一条技巧：在对应数据文件里追加 `Tip` 对象（唯一 `id` 与递增 `no`），并尽量附上来源链接。

## 说明

Codex 迭代很快。本仓库内容以 2026 年公开资料整理，动手前仍以 [官方文档](https://developers.openai.com/codex) 和本机 `/help` 为准。
