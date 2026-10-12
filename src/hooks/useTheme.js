import { useSyncExternalStore } from "react";

const STORAGE_KEY = "portfolio-theme";
const THEME_COLORS = { light: "#F8FAFC", dark: "#0B1120" };

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function readSystemTheme() {
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

/** Prioritas: atribut dari inline script → simpanan manual → sistem. */
function getInitialTheme() {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.dataset.theme;
    if (attr === "light" || attr === "dark") return attr;
  }
  return readStoredTheme() ?? readSystemTheme();
}

let currentTheme = typeof document !== "undefined" ? getInitialTheme() : "light";
const listeners = new Set();

function applyTheme(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
}

function setTheme(next) {
  if (next !== "light" && next !== "dark") return;
  currentTheme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // abaikan: storage tidak tersedia (mode privat, dsb.)
  }
  applyTheme(next);
  listeners.forEach((listener) => listener());
}

// Sinkron antar tab.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY && (event.newValue === "light" || event.newValue === "dark")) {
      currentTheme = event.newValue;
      applyTheme(event.newValue);
      listeners.forEach((listener) => listener());
    }
  });

  // Ikuti perubahan sistem hanya bila pengguna belum memilih manual.
  if (typeof window.matchMedia === "function") {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (event) => {
      if (readStoredTheme() !== null) return;
      const next = event.matches ? "dark" : "light";
      currentTheme = next;
      applyTheme(next);
      listeners.forEach((listener) => listener());
    };
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", onSystemChange);
    } else if (typeof query.addListener === "function") {
      query.addListener(onSystemChange);
    }
  }

  // Terapkan atribut awal (penting bila inline script diblokir).
  applyTheme(currentTheme);
}

function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return currentTheme;
}

function toggleTheme() {
  setTheme(currentTheme === "dark" ? "light" : "dark");
}

/**
 * Tema global (light/dark) berbasis `data-theme` di <html>.
 * - Kunjungan pertama mengikuti `prefers-color-scheme` (via inline script).
 * - Pilihan manual disimpan di localStorage dan mengalahkan sistem.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "light");
  return { theme, isDark: theme === "dark", toggleTheme };
}
