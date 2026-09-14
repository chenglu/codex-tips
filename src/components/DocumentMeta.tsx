import { useEffect } from "react";
import type { Route } from "../lib/routes";
import { runtimeContext } from "../lib/routes";
import { seoForRoute } from "../lib/seo";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const extraSel = extra
    ? Object.entries(extra)
        .map(([k, v]) => `[${k}="${v}"]`)
        .join("")
    : "";
  let el = document.head.querySelector(`link[rel="${rel}"]${extraSel}`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (extra) {
      for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v);
    }
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(data: unknown[]) {
  let el = document.getElementById("jsonld") as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = "jsonld";
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(
    data.length === 1 ? data[0] : { "@context": "https://schema.org", "@graph": data },
  ).replace(/</g, "\\u003c");
}

export function DocumentMeta({ route }: { route: Route }) {
  useEffect(() => {
    const seo = seoForRoute(route, runtimeContext());
    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "keywords", seo.keywords);
    upsertMeta("name", "robots", seo.robots);
    upsertMeta("name", "author", "Chenglu");
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:type", seo.ogType);
    upsertMeta("property", "og:url", seo.canonical);
    upsertMeta("property", "og:image", seo.image);
    upsertMeta("property", "og:locale", "zh_CN");
    upsertMeta("property", "og:site_name", "Codex Tips");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", seo.image);
    upsertLink("canonical", seo.canonical);
    upsertLink("alternate", seo.canonical, { hreflang: "zh-CN" });
    upsertLink("alternate", seo.canonical, { hreflang: "x-default" });
    const existingMd = document.head.querySelector('link[rel="alternate"][type="text/markdown"]');
    if (seo.markdownUrl) {
      upsertLink("alternate", seo.markdownUrl, { type: "text/markdown" });
    } else if (existingMd) {
      existingMd.remove();
    }
    if (seo.articleSection) upsertMeta("property", "article:section", seo.articleSection);
    const oldTags = document.head.querySelectorAll('meta[property="article:tag"]');
    oldTags.forEach((node) => node.remove());
    for (const tag of seo.articleTags ?? []) {
      const el = document.createElement("meta");
      el.setAttribute("property", "article:tag");
      el.setAttribute("content", tag);
      document.head.appendChild(el);
    }
    upsertJsonLd(seo.jsonLd);
  }, [route]);

  return null;
}
