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

export function parseHash(hash: string): Route {
  const raw = (hash.replace(/^#/, "") || "/").trim();
  const [path, search = ""] = raw.split("?");
  const parts = path.split("/").filter(Boolean);
  const query = queryString(search);

  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "tips" && parts[1]) return { name: "tip", id: parts[1] };
  if (parts[0] === "tips") return { name: "browse", search: query };
  if (parts[0] === "cheatsheet") return { name: "cheatsheet", search: query };
  if (parts[0] === "templates") return { name: "templates", id: parts[1] };
  if (parts[0] === "articles") return { name: "articles" };
  if (parts[0] === "community") return { name: "community" };
  if (parts[0] === "about") return { name: "about" };
  return { name: "notfound" };
}

export function href(route: Route): string {
  switch (route.name) {
    case "home":
      return "#/";
    case "browse":
      return `#/tips${route.search ?? ""}`;
    case "tip":
      return `#/tips/${route.id}`;
    case "cheatsheet":
      return `#/cheatsheet${route.search ?? ""}`;
    case "templates":
      return route.id ? `#/templates/${route.id}` : "#/templates";
    case "articles":
      return "#/articles";
    case "community":
      return "#/community";
    case "about":
      return "#/about";
    case "notfound":
      return "#/404";
  }
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
