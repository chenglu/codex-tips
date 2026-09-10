import { useEffect, useState } from "react";
import { SearchModal } from "./components/SearchModal";
import { href, parseHash, type Route } from "./lib/routes";
import { AboutPage } from "./pages/AboutPage";
import { BrowsePage } from "./pages/BrowsePage";
import { CheatsheetPage } from "./pages/CheatsheetPage";
import { HomePage } from "./pages/HomePage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { TipPage } from "./pages/TipPage";

function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHashSafe);
    function onHashSafe() {
      onChange();
      if (parseHash(window.location.hash).name !== "browse") {
        window.scrollTo(0, 0);
      }
    }
    return () => window.removeEventListener("hashchange", onHashSafe);
  }, []);
  return route;
}

function navActive(route: Route, name: Route["name"]): boolean {
  if (name === "browse") return route.name === "browse" || route.name === "tip";
  return route.name === name;
}

export function App() {
  const route = useHashRoute();
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<"night" | "paper">(() => {
    return (localStorage.getItem("codex-tips-theme") as "night" | "paper") || "night";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme === "paper" ? "paper" : "";
    localStorage.setItem("codex-tips-theme", theme);
  }, [theme]);

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
      <div className="marks" aria-hidden="true">
        <span className="tl" />
        <span className="tr" />
        <span className="bl" />
        <span className="br" />
      </div>
      <div className="shell">
        <header className="topbar">
          <div className="brand-nav">
            <a className="brand" href={href({ name: "home" })}>
              <span className="brand-kicker">Chenglu · Codex Tips</span>
              <span className="brand-title">Codex Tips</span>
            </a>
            <nav className="nav">
            <a
              className={navActive(route, "browse") ? "is-active" : undefined}
              href={href({ name: "browse", search: "" })}
            >
              目录
            </a>
            <a
              className={navActive(route, "cheatsheet") ? "is-active" : undefined}
              href={href({ name: "cheatsheet" })}
            >
              速查
            </a>
            <a
              className={navActive(route, "templates") ? "is-active" : undefined}
              href={href({ name: "templates" })}
            >
              模板
            </a>
            <a
              className={navActive(route, "about") ? "is-active" : undefined}
              href={href({ name: "about" })}
            >
              关于
            </a>
          </nav>
          </div>
          <div className="nav-tools">
            <button className="search-launch" type="button" onClick={() => setSearchOpen(true)}>
              <span>检索手册</span>
              <kbd>/</kbd>
            </button>
            <button
              className="icon-btn"
              type="button"
              onClick={() => setTheme((value) => (value === "night" ? "paper" : "night"))}
            >
              {theme === "paper" ? "夜览" : "纸页"}
            </button>
          </div>
        </header>

        {route.name === "home" && <HomePage />}
        {route.name === "browse" && <BrowsePage search={route.search} />}
        {route.name === "tip" && <TipPage id={route.id} />}
        {route.name === "cheatsheet" && <CheatsheetPage />}
        {route.name === "templates" && <TemplatesPage id={route.id} />}
        {route.name === "about" && <AboutPage />}

        <footer className="footer">
          <span>Codex Tips · Field Manual · 2026</span>
          <span>一夜一线程 · 规则写进 AGENTS.md</span>
        </footer>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
