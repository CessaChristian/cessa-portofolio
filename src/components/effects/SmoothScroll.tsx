"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Inisialisasi Lenis smooth scroll, disinkronkan dengan GSAP ScrollTrigger.
 * Merespons event "lenis:stop" / "lenis:start" (dipakai useLockBodyScroll
 * saat Modal/Drawer terbuka). Nonaktif saat prefers-reduced-motion —
 * fallback ke scroll native.
 */
export function SmoothScroll() {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ anchors: true });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const stop = () => lenis.stop();
    const start = () => lenis.start();
    document.addEventListener("lenis:stop", stop);
    document.addEventListener("lenis:start", start);

    return () => {
      document.removeEventListener("lenis:stop", stop);
      document.removeEventListener("lenis:start", start);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [prefersReduced]);

  return null;
}
