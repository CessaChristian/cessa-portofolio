"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/app/providers";
import { translations } from "@/i18n/translations";
import profile from "@/data/profile";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Icons that are dark/black and need inversion in dark mode ──────── */
const DARK_ICONS = new Set(["Next.js", "Flask"]);

/* ── Local icon mapping (public/icons/tech/) ─────────────────────────── */
const ICON_MAP: Record<string, string> = {
  TypeScript: "/icons/tech/typescript.svg",
  Golang: "/icons/tech/golang.svg",
  PHP: "/icons/tech/php.svg",
  Python: "/icons/tech/python.svg",
  Dart: "/icons/tech/dart.svg",
  React: "/icons/tech/react.svg",
  "Next.js": "/icons/tech/nextjs.svg",
  "Tailwind CSS": "/icons/tech/tailwindcss.svg",
  Flutter: "/icons/tech/flutter.svg",
  "Node.js": "/icons/tech/nodejs.svg",
  "Go Echo": "/icons/tech/gofiber.svg",
  Laravel: "/icons/tech/laravel.svg",
  Flask: "/icons/tech/flask.svg",
  PostgreSQL: "/icons/tech/postgresql.svg",
  MySQL: "/icons/tech/mysql.svg",
  MongoDB: "/icons/tech/mongodb.svg",
  Oracle: "/icons/tech/oracle.svg",
  Git: "/icons/tech/git.svg",
  Docker: "/icons/tech/docker.svg",
  Postman: "/icons/tech/postman.svg",
  Figma: "/icons/tech/figma.svg",
  "VS Code": "/icons/tech/vscode.svg",
};

/* ── Flatten all tech items from profile ──────────────────────────────── */
function getAllTechItems() {
  const seen = new Set<string>();
  const items: string[] = [];
  for (const group of profile.techStacks) {
    for (const item of group.items) {
      if (!seen.has(item)) {
        seen.add(item);
        items.push(item);
      }
    }
  }
  return items;
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { lang } = useLanguage();
  const t = translations[lang];
  const allTech = getAllTechItems();
  const [iconsVisible, setIconsVisible] = useState(false);

  /* ── GSAP: teks section (eyebrow, title, subtitle) ────────────────── */
  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".skills-eyebrow", {
        x: -20,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 83%", once: true },
      });

      gsap.from(".skills-title", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 83%", once: true },
      });

      gsap.from(".skills-subtitle", {
        y: 15,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        delay: 0.25,
        scrollTrigger: { trigger: sectionRef.current, start: "top 83%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  /* ── Icon entrance: CSS animation via IntersectionObserver ────────── */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIconsVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(grid);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-a py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto text-center">
        <span className="skills-eyebrow font-mono text-xs text-accent uppercase tracking-widest mb-2 block">
          {t.skills.eyebrow}
        </span>
        <h2
          className="skills-title font-bold text-text-primary"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          {t.skills.heading}
        </h2>
        <p className="skills-subtitle mt-3 text-muted max-w-md mx-auto">{t.skills.subtitle}</p>

        {/* Icon grid */}
        <div ref={gridRef} className="skills-icon-grid flex flex-wrap justify-center gap-3 sm:gap-4 mt-12">
          {allTech.map((name, index) => {
            const iconUrl = ICON_MAP[name];
            const itemStyle: React.CSSProperties =
              !iconsVisible
                ? { opacity: 0 }
                : !prefersReduced
                ? {
                    animation: `skill-fade-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both`,
                    animationDelay: `${index * 0.07}s`,
                  }
                : {};
            return (
              <div
                key={name}
                style={itemStyle}
                className="skill-icon-item group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-surface border border-border hover:border-accent/40 hover:shadow-md hover:scale-110 hover:z-20 transition-[transform,box-shadow,border-color] duration-200 cursor-default"
              >
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt={name}
                    width={32}
                    height={32}
                    className={`w-7 h-7 sm:w-8 sm:h-8 object-contain${DARK_ICONS.has(name) ? " dark:invert" : ""}`}
                  />
                ) : (
                  <span className="text-xs font-mono text-muted">{name.slice(0, 2)}</span>
                )}
                {/* Tooltip — above icon */}
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-xs font-mono bg-surface-2 text-text-primary border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
                  {name}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-xs text-muted font-mono">
          {t.skills.note}
        </p>
      </div>
    </section>
  );
}
