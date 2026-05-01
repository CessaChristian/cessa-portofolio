"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ── Tuning ────────────────────────────────────────────────────────── */
const SPACING = 42;          // jarak antar titik (px)
const DOT_RADIUS = 1.4;      // ukuran titik
const REPULSION_RADIUS = 120; // radius pengaruh cursor
const REPULSION_STRENGTH = 7; // seberapa kuat titik didorong
const SPRING = 0.085;        // kecepatan kembali ke posisi semula
const DAMPING = 0.80;        // kelembutan gerakan (0=kaku, 1=tidak berhenti)

interface Dot {
  x: number;  // posisi istirahat X
  y: number;  // posisi istirahat Y
  cx: number; // posisi sekarang X
  cy: number; // posisi sekarang Y
  vx: number; // kecepatan X
  vy: number; // kecepatan Y
}

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Capture non-nullable references for nested functions */
    const cvs = canvas;
    const c = ctx;

    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999 };
    let rafId: number;
    let dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;

    /* Bangun array titik sesuai ukuran canvas */
    function buildDots() {
      dots = [];
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;
          dots.push({ x, y, cx: x, cy: y, vx: 0, vy: 0 });
        }
      }
    }

    /* Resize canvas mengikuti ukuran container */
    function resize() {
      dpr = window.devicePixelRatio || 1;
      w = cvs.offsetWidth;
      h = cvs.offsetHeight;
      cvs.width = Math.round(w * dpr);
      cvs.height = Math.round(h * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    }

    /* Warna titik mengikuti tema aktif */
    function dotColor(): string {
      const isDark = document.documentElement.dataset.theme === "dark";
      return isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.40)";
    }

    /* Loop animasi */
    function draw() {
      c.clearRect(0, 0, w, h);
      c.fillStyle = dotColor();

      for (const dot of dots) {
        /* Spring: tarik kembali ke posisi istirahat */
        dot.vx += (dot.x - dot.cx) * SPRING;
        dot.vy += (dot.y - dot.cy) * SPRING;

        /* Repulsion: dorong titik yang dekat cursor */
        const mx = dot.cx - mouse.x;
        const my = dot.cy - mouse.y;
        const dist = Math.sqrt(mx * mx + my * my);
        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH;
          dot.vx += (mx / dist) * force;
          dot.vy += (my / dist) * force;
        }

        dot.vx *= DAMPING;
        dot.vy *= DAMPING;
        dot.cx += dot.vx;
        dot.cy += dot.vy;

        c.beginPath();
        c.arc(dot.cx, dot.cy, DOT_RADIUS, 0, Math.PI * 2);
        c.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    /* Mouse tracking — relative ke canvas */
    const onMouseMove = (e: MouseEvent) => {
      const rect = cvs.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("mousemove", onMouseMove);
    cvs.parentElement?.addEventListener("mouseleave", onMouseLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(cvs);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      cvs.parentElement?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
