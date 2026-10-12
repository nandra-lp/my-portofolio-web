import { forwardRef } from "react";
import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  accent: "btn-accent",
};

const SIZES = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

/**
 * Tombol reusable mengikuti design token (lihat `src/index.css`).
 * - `to`: navigasi internal via react-router.
 * - `href`: tautan eksternal/anchor biasa.
 * - default: elemen `<button>`.
 */
const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      to,
      href,
      className = "",
      children,
      disabled = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const classes = `${VARIANTS[variant] ?? VARIANTS.primary} ${SIZES[size] ?? SIZES.md} ${className}`;

    if (to) {
      return (
        <Link ref={ref} to={to} className={classes} {...props}>
          {children}
        </Link>
      );
    }

    if (href) {
      const isExternal = /^(https?:|mailto:)/.test(href);
      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
