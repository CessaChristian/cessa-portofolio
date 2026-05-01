"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ── Deterministic PRNG (consistent positions across renders) ──────── */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CODE_FRAGMENTS = [
  "const",  "let",    "=>",     "return",   "async",
  "await",  "export", "import", "function", "{;}",
  "< />",   "null",   "true",   "//",       "[]",
  "===",    "new",    "0xff",   "map()",    "&&",
];

export function SpotlightCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  /* ── Render the hidden layer content (code chars + crosshairs) ─── */
  const paint = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const c = cvs.getContext("2d");
    if (!c) return;

    const dpr = window.devicePixelRatio || 1;
    const w = cvs.offsetWidth;
    const h = cvs.offsetHeight;
    cvs.width = Math.round(w * dpr);
    cvs.height = Math.round(h * dpr);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);

    const isDark = document.documentElement.dataset.theme === "dark";
    const base = isDark ? "255,255,255" : "0,0,0";

    /* Grid crosshairs (+) */
    const grid = 52;
    c.strokeStyle = `rgba(${base},0.18)`;
    c.lineWidth = 0.5;
    for (let x = grid; x < w; x += grid) {
      for (let y = grid; y < h; y += grid) {
        c.beginPath();
        c.moveTo(x - 4, y);
        c.lineTo(x + 4, y);
        c.moveTo(x, y - 4);
        c.lineTo(x, y + 4);
        c.stroke();
      }
    }

    /* Scattered code fragments */
    const rand = mulberry32(77);
    const count = Math.floor((w * h) / 16000);
    c.textBaseline = "middle";

    for (let i = 0; i < count; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const text = CODE_FRAGMENTS[Math.floor(rand() * CODE_FRAGMENTS.length)];
      const size = 9 + Math.floor(rand() * 3);
      const opacity = 0.22 + rand() * 0.35;

      c.font = `${size}px var(--font-mono, monospace)`;
      c.fillStyle = `rgba(${base},${opacity.toFixed(2)})`;
      c.fillText(text, x, y);
    }
  }, []);

  /* ── Setup: mouse tracking, resize, theme observe ────────────── */
  useEffect(() => {
    if (prefersReduced) return;
    if (isCoarse) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    paint();

    /* Re-paint on resize */
    const ro = new ResizeObserver(() => paint());
    ro.observe(wrap);

    /* Re-paint on theme toggle */
    const mo = new MutationObserver(() => paint());
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    /* Mouse tracking — update CSS custom properties */
    const section = wrap.closest("section");

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      wrap.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      wrap.style.setProperty("--my", `${e.clientY - rect.top}px`);
      wrap.style.opacity = "1";
    };

    const onLeave = () => {
      wrap.style.opacity = "0";
    };

    section?.addEventListener("mousemove", onMove);
    section?.addEventListener("mouseleave", onLeave);

    return () => {
      ro.disconnect();
      mo.disconnect();
      section?.removeEventListener("mousemove", onMove);
      section?.removeEventListener("mouseleave", onLeave);
    };
  }, [prefersReduced, isCoarse, paint]);

  if (prefersReduced || isCoarse) return null;

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 pointer-events-none opacity-0"
      style={{
        zIndex: 2,
        transition: "opacity 0.35s ease",
        maskImage:
          "radial-gradient(circle 140px at var(--mx, -200px) var(--my, -200px), black 10%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(circle 140px at var(--mx, -200px) var(--my, -200px), black 10%, transparent 100%)",
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
