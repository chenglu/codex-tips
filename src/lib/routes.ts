import {
  absoluteUrl,
  normalizeSite,
  publicPath,
  type SiteContext,
} from "./site";

export type Route =
  | { name: "home" }
  | { name: "browse"; search: string }
  | { name: "tip"; id: string }
  | { name: "cheatsheet"; search?: string }
  | { name: "templates"; id?: string }
  | { name: "articles" }
  | { name: "community" }
  | { name: "about" }
  | { name: "notfound" };

function queryString(search: string): string {
  if (!search) return "";
  return search.startsWith("?") ? search : `?${search}`;
}

export function runtimeContext(): SiteContext {
  const env = (import.meta as ImportMeta).env ?? ({} as ImportMetaEnv);
  return normalizeSite({
    siteUrl: env.VITE_SITE_URL,
    basePath: env.BASE_URL,
  });
}

export function appPath(route: Route): string {
  switch (route.name) {
    case "home":
      return "/";
    case "browse":
      return `/tips/${route.search ?? ""}`;
    case "tip":
      return `/tips/${route.id}/`;
    case "cheatsheet":
      return `/cheatsheet/${route.search ?? ""}`;
    case "templates":
      return route.id ? `/templates/${route.id}/` : "/templates/";
    case "articles":
      return "/articles/";
    case "community":
      return "/community/";
    case "about":
      return "/about/";
    case "notfound":
      return "/404/";
  }
}

export function canonicalAppPath(route: Route): string {
  return appPath(route).split("?")[0];
}

export function hrefWith(route: Route, ctx: SiteContext): string {
  return publicPath(appPath(route), ctx);
}

export function canonicalUrl(route: Route, ctx: SiteContext): string {
  return absoluteUrl(canonicalAppPath(route), ctx);
}

export function href(route: Route): string {
  return hrefWith(route, runtimeContext());
}

export function parseHash(hash: string): Route {
  const raw = (hash.replace(/^#/, "") || "/").trim();
  const [path, search = ""] = raw.split("?");
  return parseAppPath(path, queryString(search));
}

export function parseAppPath(pathname: string, search = ""): Route {
  const trimmed = pathname.replace(/\/index\.html$/i, "");
  const parts = trimmed.split("/").filter(Boolean);
  const query = queryString(search);

  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "tips" && parts[1]) return { name: "tip", id: parts[1] };
  if (parts[0] === "tips") return { name: "browse", search: query };
  if (parts[0] === "cheatsheet") return { name: "cheatsheet", search: query };
  if (parts[0] === "templates") return { name: "templates", id: parts[1] };
  if (parts[0] === "articles") return { name: "articles" };
  if (parts[0] === "community") return { name: "community" };
  if (parts[0] === "about") return { name: "about" };
  if (parts[0] === "404") return { name: "notfound" };
  return { name: "notfound" };
}

export function stripBasePath(pathname: string, ctx: SiteContext): string {
  const base = ctx.basePath === "/" ? "" : ctx.basePath.replace(/\/$/, "");
  if (!base) return pathname || "/";
  if (pathname === base || pathname === `${base}/`) return "/";
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || "/";
  return pathname || "/";
}

export function parseLocation(pathname: string, search: string, ctx: SiteContext): Route {
  return parseAppPath(stripBasePath(pathname, ctx), search);
}

export function parseCurrentLocation(): Route {
  const ctx = runtimeContext();
  const hash = window.location.hash;
  if (hash.startsWith("#/")) return parseHash(hash);
  return parseLocation(window.location.pathname, window.location.search, ctx);
}

export function routeScrollKey(route: Route): string {
  switch (route.name) {
    case "tip":
      return `tip:${route.id}`;
    case "templates":
      return `templates:${route.id ?? ""}`;
    case "browse":
      return "browse";
    case "cheatsheet":
      return "cheatsheet";
    default:
      return route.name;
  }
}

export function isFilePath(pathname: string): boolean {
  return /\.[a-z0-9]+$/i.test(pathname);
}

export function withTrailingSlash(pathname: string): string {
  if (!pathname || pathname === "/") return pathname || "/";
  if (isFilePath(pathname)) return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}
