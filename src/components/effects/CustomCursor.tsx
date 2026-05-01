"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ── Detect context word based on hovered element ──────────────────── */
function getCursorWord(el: HTMLElement | null): string {
  if (!el) return "explore";

  /* data-cursor="..." takes priority */
  const custom = el.closest("[data-cursor]") as HTMLElement | null;
  if (custom?.dataset.cursor) return custom.dataset.cursor;

  if (el.closest("a, button, [role='button']")) return "click";
  if (el.closest("img, picture, video"))        return "see";
  if (el.closest("input, textarea, select"))    return "type";

  return "explore";
}

export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    if (isCoarse) return;

    const wrap = wrapRef.current;
    const dot = dotRef.current;
    const wordEl = wordRef.current;
    if (!wrap || !dot || !wordEl) return;

    /* Hide native cursor globally */
    const style = document.createElement("style");
    style.id = "cursor-hide";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    let currentWord = "explore";

    /* ── Mouse move: instant position + detect word ──────────────── */
    const onMove = (e: MouseEvent) => {
      wrap.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      wrap.style.opacity = "1";

      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const newWord = getCursorWord(target);

      if (newWord !== currentWord) {
        currentWord = newWord;
        wordEl.style.opacity = "0";
        wordEl.style.transform = "translateY(3px)";
        setTimeout(() => {
          wordEl.textContent = newWord;
          wordEl.style.opacity = "1";
          wordEl.style.transform = "translateY(0)";
        }, 130);
      }
    };

    /* ── Click: pulse the dot ─────────────────────────────────────── */
    const onClick = () => {
      dot.style.transform = "translate(-50%, -50%) scale(2.5)";
      dot.style.opacity = "0.3";
      setTimeout(() => {
        dot.style.transform = "translate(-50%, -50%) scale(1)";
        dot.style.opacity = "1";
      }, 200);
    };

    /* ── Visibility ──────────────────────────────────────────────── */
    const onLeave = () => { wrap.style.opacity = "0"; };
    const onEnter = () => { wrap.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.getElementById("cursor-hide")?.remove();
    };
  }, [prefersReduced]);

  if (prefersReduced || isCoarse) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ opacity: 0, transition: "opacity 0.25s ease", willChange: "transform" }}
    >
      {/* Dot — the click point */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-[5px] h-[5px] rounded-full bg-text-primary"
        style={{
          transform: "translate(-50%, -50%)",
          transition: "transform 0.2s ease, opacity 0.2s ease",
        }}
      />
      {/* Word label — offset from dot */}
      <span
        ref={wordRef}
        className="absolute top-0 left-0 font-mono text-text-primary select-none"
        style={{
          fontSize: "11px",
          marginLeft: "12px",
          marginTop: "12px",
          opacity: 1,
          letterSpacing: "0.05em",
          transition: "opacity 0.13s ease, transform 0.13s ease",
        }}
      >
        explore
      </span>
    </div>
  );
}
