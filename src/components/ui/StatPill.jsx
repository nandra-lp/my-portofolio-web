import { Container } from "./Container";

export function StatPill({ label, value, accent = false, live = false, children, className = "", ...rest }) {
  return (
    <Container className={`rounded-xl border border-border bg-surface px-4 py-2 shadow-xs sm:px-5 sm:py-2.5 ${className}`} {...rest}>
      <span className="mr-2 text-sm text-muted">{label}:</span>
      <span
        className={`text-lg font-medium ${accent ? "text-primary" : "text-heading"}`}
        {...(live ? { "aria-live": "polite" } : {})}
      >
        {value}
      </span>
      {children}
    </Container>
  );
}