export function Tag({ variant = "muted", children, className = "", ...props }) {
  const variants = {
    primary: "tag-primary",
    accent: "tag-accent",
    muted: "tag-muted",
  };

  return (
    <span className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}

export function Badge({ variant = "muted", children, className = "", ...props }) {
  const variants = {
    primary: "badge-primary",
    accent: "badge-accent",
    success: "badge-success",
    muted: "badge-muted",
  };

  return (
    <span className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}