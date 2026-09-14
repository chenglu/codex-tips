export function navigate(to: string, replace = false): void {
  const current = window.location.pathname + window.location.search + window.location.hash;
  if (current === to) {
    window.dispatchEvent(new PopStateEvent("popstate"));
    return;
  }
  if (replace) window.history.replaceState(null, "", to);
  else window.history.pushState(null, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function isInternalHref(href: string): boolean {
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (href.startsWith("#")) return false;
  if (href.startsWith("http://") || href.startsWith("https://")) {
    try {
      return new URL(href).origin === window.location.origin;
    } catch {
      return false;
    }
  }
  return href.startsWith("/") || href.startsWith(".");
}

export function shouldInterceptLink(anchor: HTMLAnchorElement, event: MouseEvent): boolean {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
  const rel = anchor.getAttribute("rel") ?? "";
  if (rel.split(/\s+/).includes("external")) return false;
  if (!isInternalHref(anchor.getAttribute("href") ?? anchor.href)) return false;
  let url: URL;
  try {
    url = new URL(anchor.href);
  } catch {
    return false;
  }
  if (url.origin !== window.location.origin) return false;
  if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) {
    return false;
  }
  return true;
}
