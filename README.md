# Codex Tips

一份给 OpenAI Codex 的现场手册：把散落在官方文档、社区长文和社交媒体里的实用技巧编成可检索的网站。

覆盖 CLI、桌面 App、IDE 扩展与 Cloud：提示与规划、`AGENTS.md`、`config.toml`、沙箱、斜杠命令、会话、Skills、MCP、子代理、Hooks、CI 与安全。

## 本地预览

```bash
npm install
npm run dev
```

开发服务器在 `http://127.0.0.1:5173/codex-tips/`。生产构建：

```bash
npm run build
npm run preview
```

站点按 GitHub Pages 项目页部署，默认 `base` 为 `/codex-tips/`。若挂到自定义域名根路径：

```bash
SITE_BASE=/ SITE_URL=https://example.com npm run build
```

## URL

页面使用路径地址，例如 `/tips/teammate-not-chatbot/`。旧的 hash 地址（`#/tips/...`）会在浏览器里改写到对应路径。

构建时会生成：

- 每个页面的预渲染 HTML（含标题、描述、Open Graph、JSON-LD 与正文）
- `sitemap.xml`、`robots.txt`、`feed.xml`
- `llms.txt` / `llms-full.txt`（给生成式引擎的索引与全文）
- 技巧与模板的 Markdown 副本（`/tips/{id}.md`）

按 `/` 或 `⌘K` 检索。

## 内容结构

- `src/data/tips-*.ts` — 技巧正文
- `src/data/cheatsheet.ts` — 速查表
- `src/data/templates.ts` — 可复制模板
- `src/data/categories.ts` — 章节
- `src/data/articles.ts` — 官方文档、教程、清单、示例仓库目录
- `src/data/community.ts` — X、论坛和话题摘要
- `src/data/loop.ts` — 收录循环用的已见链接

新增一条技巧：在对应数据文件里追加 `Tip` 对象（唯一 `id` 与递增 `no`），并尽量附上来源链接。

## 说明

Codex 迭代很快。本仓库内容以 2026 年公开资料整理，动手前仍以 [官方文档](https://developers.openai.com/codex) 和本机 `/help` 为准。
