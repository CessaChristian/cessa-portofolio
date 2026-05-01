"use client";

import { useEffect } from "react";

/**
 * Locks body scroll when `lock` is true.
 * Preserves scroll position and restores original overflow on cleanup.
 */
export function useLockBodyScroll(lock: boolean): void {
  useEffect(() => {
    if (!lock) return;

    const originalOverflow = document.body.style.overflow;
    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`;

    // Pause Lenis so it doesn't scroll the page while modal/drawer is open
    document.dispatchEvent(new CustomEvent("lenis:stop"));

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrollY);

      // Resume Lenis after modal/drawer closes
      document.dispatchEvent(new CustomEvent("lenis:start"));
    };
  }, [lock]);
}
