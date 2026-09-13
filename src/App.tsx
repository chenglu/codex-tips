import { useEffect, useRef, useState } from "react";
import { SearchModal } from "./components/SearchModal";
import { tipMap } from "./data/tips";
import { href, parseHash, routeScrollKey, type Route } from "./lib/routes";
import { AboutPage } from "./pages/AboutPage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { BrowsePage } from "./pages/BrowsePage";
import { CheatsheetPage } from "./pages/CheatsheetPage";
import { CommunityPage } from "./pages/CommunityPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { TipPage } from "./pages/TipPage";

const navItems: { name: Route["name"]; href: string; label: string }[] = [
  { name: "browse", href: href({ name: "browse", search: "" }), label: "目录" },
  { name: "cheatsheet", href: href({ name: "cheatsheet" }), label: "速查" },
  { name: "templates", href: href({ name: "templates" }), label: "模板" },
  { name: "articles", href: href({ name: "articles" }), label: "文章" },
  { name: "community", href: href({ name: "community" }), label: "社区" },
  { name: "about", href: href({ name: "about" }), label: "关于" },
];

function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

function navActive(route: Route, name: Route["name"]): boolean {
  if (name === "browse") return route.name === "browse" || route.name === "tip";
  return route.name === name;
}

function documentTitle(route: Route): string {
  switch (route.name) {
    case "home":
      return "Codex Tips · 现场手册";
    case "browse":
      return "目录 · Codex Tips";
    case "tip": {
      const tip = tipMap.get(route.id);
      return tip ? `${tip.title} · Codex Tips` : "未找到 · Codex Tips";
    }
    case "cheatsheet":
      return "速查表 · Codex Tips";
    case "templates":
      return "模板 · Codex Tips";
    case "articles":
      return "文章 · Codex Tips";
    case "community":
      return "社区 · Codex Tips";
    case "about":
      return "关于 · Codex Tips";
    case "notfound":
      return "未找到 · Codex Tips";
  }
}

export function App() {
  const route = useHashRoute();
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<"night" | "paper">(() => {
    return (localStorage.getItem("codex-tips-theme") as "night" | "paper") || "night";
  });
  const lastScrollKey = useRef(routeScrollKey(route));

  useEffect(() => {
    if (theme === "paper") {
      document.documentElement.dataset.theme = "paper";
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("codex-tips-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "paper" ? "#f3eee3" : "#0b0c0a");
  }, [theme]);

  useEffect(() => {
    document.title = documentTitle(route);
  }, [route]);

  useEffect(() => {
    const nextKey = routeScrollKey(route);
    if (nextKey !== lastScrollKey.current) {
      window.scrollTo(0, 0);
      lastScrollKey.current = nextKey;
    }
  }, [route]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const typing =
        event.target instanceof HTMLElement &&
        (event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA" ||
          event.target.isContentEditable);
      if ((event.key === "/" || (event.key === "k" && (event.metaKey || event.ctrlKey))) && !typing) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a className="skip-link" href="#content">
        跳到正文
      </a>
      <div className="marks" aria-hidden="true">
        <span className="tl" />
        <span className="tr" />
        <span className="bl" />
        <span className="br" />
      </div>
      <div className="site">
        <header className="topbar">
          <div className="topbar-inner">
            <div className="brand-nav">
              <a className="brand" href={href({ name: "home" })}>
                <span className="brand-kicker">Chenglu · Codex Tips</span>
                <span className="brand-title">Codex Tips</span>
              </a>
              <nav className="nav" aria-label="主导航">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    className={navActive(route, item.name) ? "is-active" : undefined}
                    aria-current={navActive(route, item.name) ? "page" : undefined}
                    href={item.href}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="nav-tools">
              <button
                className="search-launch"
                type="button"
                aria-haspopup="dialog"
                aria-keyshortcuts="/ Meta+K Control+K"
                onClick={() => setSearchOpen(true)}
              >
                <span className="search-launch-label">检索</span>
                <kbd>/</kbd>
              </button>
              <button
                className="icon-btn"
                type="button"
                aria-pressed={theme === "paper"}
                title={theme === "paper" ? "切换到夜览" : "切换到纸页"}
                aria-label={theme === "paper" ? "当前纸页，切换到夜览" : "当前夜览，切换到纸页"}
                onClick={() => setTheme((value) => (value === "night" ? "paper" : "night"))}
              >
                {theme === "paper" ? "夜览" : "纸页"}
              </button>
            </div>
          </div>
        </header>

        <div className="shell">
          <main id="content">
            {route.name === "home" && <HomePage />}
            {route.name === "browse" && <BrowsePage search={route.search} />}
            {route.name === "tip" && <TipPage id={route.id} />}
            {route.name === "cheatsheet" && <CheatsheetPage search={route.search} />}
            {route.name === "templates" && <TemplatesPage id={route.id} />}
            {route.name === "articles" && <ArticlesPage />}
            {route.name === "community" && <CommunityPage />}
            {route.name === "about" && <AboutPage />}
            {route.name === "notfound" && <NotFoundPage />}
          </main>

          <footer className="footer">
            <span>Codex Tips · Field Manual · 2026</span>
            <span>一夜一线程 · 规则写进 AGENTS.md</span>
          </footer>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
