import type { Route } from "./routes";

export const navItems: {
  name: Extract<Route["name"], "browse" | "cheatsheet" | "templates" | "articles" | "updates" | "community" | "about">;
  label: string;
}[] = [
  { name: "browse", label: "目录" },
  { name: "cheatsheet", label: "速查" },
  { name: "templates", label: "模板" },
  { name: "articles", label: "文章" },
  { name: "updates", label: "更新" },
  { name: "community", label: "社区" },
  { name: "about", label: "关于" },
];
