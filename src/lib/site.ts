export const SITE_NAME = "codex.tips";
export const SITE_TAGLINE = "现场手册";
export const SITE_AUTHOR = "codex.tips";
export const SITE_LANG = "zh-CN";
export const DEFAULT_SITE_URL = "https://codex.tips";
export const DEFAULT_BASE_PATH = "/";

export const DEFAULT_TITLE = "Codex 实用技巧 · codex.tips";
export const DEFAULT_DESCRIPTION =
  "Codex Tips 现场手册：按场景检索 OpenAI Codex 在 CLI、桌面端、IDE 与 Cloud 上的实用技巧。覆盖 AGENTS.md、config.toml、Skills、MCP、沙箱、斜杠命令与自动化。";
export const DEFAULT_KEYWORDS = [
  "OpenAI Codex",
  "Codex CLI",
  "AGENTS.md",
  "config.toml",
  "Codex Skills",
  "MCP",
  "Codex Cloud",
  "斜杠命令",
].join(", ");

export type SiteContext = {
  /** Origin + optional repo base, no trailing slash. */
  siteUrl: string;
  /** Public pathname prefix with trailing slash, e.g. `/codex-tips/` or `/`. */
  basePath: string;
};

export function normalizeBase(base: string | undefined): string {
  if (!base || base === "./") return "/";
  return base.endsWith("/") ? base : `${base}/`;
}

export function normalizeSite(partial?: Partial<SiteContext>): SiteContext {
  return {
    siteUrl: (partial?.siteUrl ?? DEFAULT_SITE_URL).replace(/\/$/, ""),
    basePath: normalizeBase(partial?.basePath ?? DEFAULT_BASE_PATH),
  };
}

/** Browser-facing pathname, including the Vite base. */
export function publicPath(appPath: string, ctx: SiteContext): string {
  const base = ctx.basePath === "/" ? "" : ctx.basePath.replace(/\/$/, "");
  if (!appPath || appPath === "/") return `${base}/` || "/";
  const path = appPath.startsWith("/") ? appPath : `/${appPath}`;
  return `${base}${path}`;
}

export function absoluteUrl(appPath: string, ctx: SiteContext): string {
  const path = appPath.startsWith("/") ? appPath : `/${appPath}`;
  if (path === "/") return `${ctx.siteUrl}/`;
  return `${ctx.siteUrl}${path}`;
}

export function assetUrl(file: string, ctx: SiteContext): string {
  const name = file.replace(/^\//, "");
  return `${ctx.siteUrl}/${name}`;
}
