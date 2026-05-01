"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";

export function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleScroll = () => {
      const shouldShow = window.scrollY > 400;
      if (shouldShow !== visible) {
        setVisible(shouldShow);
        gsap.to(btn, {
          opacity: shouldShow ? 1 : 0,
          y: shouldShow ? 0 : 8,
          duration: 0.25,
          ease: "power2.out",
          pointerEvents: shouldShow ? "all" : "none",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{ opacity: 0, pointerEvents: "none" }}
      className="fixed bottom-6 right-4 sm:right-6 z-30 w-11 h-11 flex items-center justify-center rounded-xl bg-surface border border-border shadow-md text-muted hover:text-accent hover:border-accent/40 hover:bg-accent-light transition-colors duration-150 active:scale-95"
    >
      <ArrowUp size={18} />
    </button>
  );
}
