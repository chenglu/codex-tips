import { cheatSections } from "../data/cheatsheet";

export function CheatsheetPage() {
  return (
    <div className="article" style={{ maxWidth: 880 }}>
      <div className="brand-kicker">Quick Reference</div>
      <h1 className="page-title">速查表</h1>
      <p className="note">
        命令随 CLI 版本变化。以你机器上 <code>/help</code> 和{" "}
        <code>codex --help</code> 为准。本表对齐 2026 年中后期的稳定面。
      </p>
      <div className="cheat">
        {cheatSections.map((section) => (
          <section key={section.id} className="cheat-section">
            <h2>{section.title}</h2>
            <table className="cheat-table">
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.cmd}>
                    <td>
                      <code>{row.cmd}</code>
                    </td>
                    <td>{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </div>
    </div>
  );
}
