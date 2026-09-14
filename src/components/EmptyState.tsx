export function EmptyState({
  children,
  onReset,
  resetLabel = "清空筛选",
}: {
  children: string;
  onReset?: () => void;
  resetLabel?: string;
}) {
  return (
    <div className="empty">
      <p>{children}</p>
      {onReset ? (
        <button className="btn btn-ghost" type="button" onClick={onReset}>
          {resetLabel}
        </button>
      ) : null}
    </div>
  );
}
