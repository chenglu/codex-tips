export function FeedItem({
  href,
  kicker,
  title,
  summary,
  tags,
}: {
  href: string;
  kicker: string;
  title: string;
  summary: string;
  tags?: string[];
}) {
  const external = href.startsWith("http");
  return (
    <a
      className="feed-item"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <div className="kicker">{kicker}</div>
      <h3>{title}</h3>
      <p>{summary}</p>
      {tags && tags.length > 0 ? (
        <div className="tag-row">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      ) : null}
      {external ? <span className="ext-hint">原文 ↗</span> : null}
    </a>
  );
}
