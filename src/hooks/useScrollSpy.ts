"use client";

import { useState, useEffect } from "react";

/**
 * Tracks which section ID is currently in the viewport.
 * @param sectionIds - list of element IDs to spy on (in DOM order)
 * @param topOffset  - pixels from viewport top to use as the trigger boundary
 */
export function useScrollSpy(
  sectionIds: string[],
  topOffset = 80
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${topOffset}px 0px -50% 0px`,
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, topOffset]);

  return activeId;
}
