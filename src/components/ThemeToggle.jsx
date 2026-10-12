import { useTheme } from "../hooks/useTheme";
import { Icon } from "./ui/Icon";

/**
 * Tombol pengalih Light/Dark Mode.
 * - Ikon matahari saat Dark Mode, ikon bulan saat Light Mode.
 * - Ukuran tetap (2.5rem) agar navbar tidak bergeser saat ditekan.
 */
export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? "Aktifkan light mode" : "Aktifkan dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={`theme-toggle inline-flex items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:bg-surface-hover ${className}`}
    >
      <Icon
        key={isDark ? "sun" : "moon"}
        name={isDark ? "sun" : "moon"}
        className="h-5 w-5"
      />
    </button>
  );
}
