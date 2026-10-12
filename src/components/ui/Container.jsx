export function Container({ className = "", children, narrow = false, ...props }) {
  return (
    <div className={`${narrow ? "container-narrow" : "container-page"} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Section({ className = "", children, id, sm = false, ...props }) {
  return (
    <section id={id} className={`${sm ? "section-sm" : "section"} ${className}`} {...props}>
      {children}
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  className = "",
  centered = true,
}) {
  return (
    <header className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      {label && (
        <div className="mb-4 inline-flex items-center gap-3">
          <span className="h-px w-10 bg-border" />
          <span className="label">{label}</span>
          <span className="h-px w-10 bg-border" />
        </div>
      )}
      {title && <h2 className="heading-2 mb-4">{title}</h2>}
      {description && <p className="body-lg max-w-2xl mx-auto">{description}</p>}
    </header>
  );
}