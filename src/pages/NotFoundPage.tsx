import { href } from "../lib/routes";

export function NotFoundPage() {
  return (
    <article className="article">
      <div className="brand-kicker">404</div>
      <h1 className="page-title">没有这一页</h1>
      <p className="lede">地址可能写错了，或这条内容已经换了位置。</p>
      <div className="hero-actions">
        <a className="btn" href={href({ name: "home" })}>
          回到封面
        </a>
        <a className="btn btn-ghost" href={href({ name: "browse", search: "" })}>
          打开目录
        </a>
      </div>
    </article>
  );
}
