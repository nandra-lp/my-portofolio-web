export function StatPill({ label, value, accent = false, live = false, children, className = "", ...rest }) {
  return (
    <div className={`inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 shadow-xs ${className}`} {...rest}>
      <span className="mr-2 text-sm text-muted">{label}:</span>
      <span
        className={`text-sm font-semibold tabular-nums ${accent ? "text-primary" : "text-heading"}`}
        {...(live ? { "aria-live": "polite" } : {})}
      >
        {value}
      </span>
      {children}
    </div>
  );
}