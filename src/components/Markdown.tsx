import { marked } from "marked";
import { useMemo } from "react";

marked.setOptions({ gfm: true, breaks: true });

export function Markdown({ source }: { source: string }) {
  const html = useMemo(() => marked.parse(source) as string, [source]);
  return <div className="md" dangerouslySetInnerHTML={{ __html: html }} />;
}
