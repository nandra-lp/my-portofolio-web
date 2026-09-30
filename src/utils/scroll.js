export const NAV_HEIGHT = 72;

/** Scroll ke section dengan offset tinggi navbar; fallback ke atas halaman. */
export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const top =
    element.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
  window.scrollTo({ top, behavior: "smooth" });
}

/**
 * Tunggu elemen tersedia (pasca-navigate) via requestAnimationFrame,
 * lalu jalankan callback. Lebih andal daripada setTimeout fixed-delay.
 */
export function waitForElement(id, callback, maxFrames = 30) {
  let frames = 0;
  const tick = () => {
    if (document.getElementById(id) || frames >= maxFrames) {
      callback();
    } else {
      frames += 1;
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);
}
