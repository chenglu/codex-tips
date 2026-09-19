import { useEffect, useRef, useState } from "react";
import { DocumentMeta } from "./components/DocumentMeta";
import { SearchModal } from "./components/SearchModal";
import { navItems } from "./lib/nav";
import { navigate, shouldInterceptLink } from "./lib/navigate";
import {
  href,
  isFilePath,
  parseCurrentLocation,
  parseHash,
  routeScrollKey,
  withTrailingSlash,
  type Route,
} from "./lib/routes";
import { AboutPage } from "./pages/AboutPage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { BrowsePage } from "./pages/BrowsePage";
import { UpdatePage } from "./pages/UpdatePage";
import { UpdatesPage } from "./pages/UpdatesPage";
import { CheatsheetPage } from "./pages/CheatsheetPage";
import { CommunityPage } from "./pages/CommunityPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { TipPage } from "./pages/TipPage";

function navHref(name: (typeof navItems)[number]["name"]): string {
  return name === "browse" ? href({ name: "browse", search: "" }) : href({ name });
}

function initialRoute(): Route {
  const hash = window.location.hash;
  if (hash.startsWith("#/")) {
    const route = parseHash(hash);
    window.history.replaceState(null, "", href(route));
    return route;
  }
  return parseCurrentLocation();
}

function usePathRoute(): Route {
  const [route, setRoute] = useState<Route>(initialRoute);

  useEffect(() => {
    const onChange = () => setRoute(parseCurrentLocation());
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!shouldInterceptLink(anchor, event)) return;
      const url = new URL(anchor.href);
      event.preventDefault();
      navigate(`${url.pathname}${url.search}${url.hash}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (route.name === "notfound") return;
    const desired = href(route);
    const current = `${window.location.pathname}${window.location.search}`;
    if (current === desired) return;
    if (isFilePath(window.location.pathname)) return;
    if (withTrailingSlash(window.location.pathname) !== window.location.pathname || current !== desired) {
      window.history.replaceState(null, "", desired);
    }
  }, [route]);

  return route;
}

function navActive(route: Route, name: Route["name"]): boolean {
  if (name === "browse") return route.name === "browse" || route.name === "tip";
  if (name === "updates") return route.name === "updates" || route.name === "update";
  return route.name === name;
}

export function App() {
  const route = usePathRoute();
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
      <DocumentMeta route={route} />
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
                <span className="brand-title">codex.tips</span>
              </a>
              <nav className="nav" aria-label="主导航">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    className={navActive(route, item.name) ? "is-active" : undefined}
                    aria-current={navActive(route, item.name) ? "page" : undefined}
                    href={navHref(item.name)}
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
            {route.name === "updates" && <UpdatesPage />}
            {route.name === "update" && <UpdatePage id={route.id} />}
            {route.name === "community" && <CommunityPage />}
            {route.name === "about" && <AboutPage />}
            {route.name === "notfound" && <NotFoundPage />}
          </main>

          <footer className="footer">
            <span>Codex 实用技巧</span>
            <span>技巧、配置与工作流</span>
          </footer>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
