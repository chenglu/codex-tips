import { marked } from "marked";
import { useEffect, useMemo, useRef } from "react";
import { copyText } from "../lib/copy";

marked.setOptions({ gfm: true, breaks: true });

function withExternalLinks(html: string): string {
  return html.replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noreferrer"');
}

export function Markdown({ source }: { source: string }) {
  const html = useMemo(() => withExternalLinks(marked.parse(source) as string), [source]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const buttons: HTMLButtonElement[] = [];

    root.querySelectorAll("pre").forEach((pre) => {
      if (pre.parentElement?.classList.contains("md-pre")) return;
      const wrap = document.createElement("div");
      wrap.className = "md-pre";
      pre.parentElement?.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-btn md-copy";
      button.textContent = "复制";
      button.addEventListener("click", () => {
        void copyText(pre.innerText).then(() => {
          button.textContent = "已复制";
          window.setTimeout(() => {
            button.textContent = "复制";
          }, 1200);
        });
      });
      wrap.appendChild(button);
      buttons.push(button);
    });

    return () => {
      for (const button of buttons) button.remove();
    };
  }, [html]);

  return <div ref={ref} className="md" dangerouslySetInnerHTML={{ __html: html }} />;
}
