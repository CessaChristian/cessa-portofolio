"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DotGrid } from "@/components/effects/DotGrid";
import { SpotlightCursor } from "@/components/effects/SpotlightCursor";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/app/providers";
import { translations } from "@/i18n/translations";
import profile from "@/data/profile";
import gsap from "gsap";

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>/\\";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { lang } = useLanguage();
  const t = translations[lang];

  /* ── Name scramble ─────────────────────────────────────────────── */
  useEffect(() => {
    const el = nameRef.current;
    if (!el || prefersReduced) return;

    const final = profile.name;
    const totalDuration = 1200;
    const startDelay = 400;

    let frameId: number;
    const startAt = performance.now() + startDelay;

    const tick = (now: number) => {
      if (now < startAt) { frameId = requestAnimationFrame(tick); return; }
      const elapsed = now - startAt;
      const progress = Math.min(elapsed / totalDuration, 1);
      const revealed = Math.floor(Math.pow(progress, 1.1) * final.length);

      let out = "";
      for (let i = 0; i < final.length; i++) {
        out += i < revealed
          ? final[i]
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = out;

      if (progress < 1) frameId = requestAnimationFrame(tick);
      else el.textContent = final;
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [prefersReduced]);

  /* ── GSAP entrance ──────────────────────────────────────────────── */
  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-status", { y: 10, opacity: 0, duration: 0.45, immediateRender: false })
        .from(
          ".hero-name",
          { y: 70, opacity: 0, duration: 1.1, ease: "expo.out", immediateRender: false },
          "-=0.15"
        )
        .from(
          ".hero-divider",
          { scaleX: 0, transformOrigin: "left center", duration: 0.7, ease: "power4.out", immediateRender: false },
          "-=0.5"
        )
        .from(".hero-sub", { y: 18, opacity: 0, duration: 0.55, immediateRender: false }, "-=0.4")
        .from(".hero-ctas", { y: 14, opacity: 0, duration: 0.5, immediateRender: false }, "-=0.3")
        .from(".hero-scroll", { opacity: 0, duration: 0.5, immediateRender: false }, "-=0.1");
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-svh flex flex-col justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* ── Dot grid (interactive, local canvas) ─────────────────── */}
      <DotGrid />
      {/* ── Spotlight reveal (code fragments visible near cursor) ── */}
      <SpotlightCursor />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto w-full" style={{ zIndex: 1 }}>

        {/* Status */}
        <div className="hero-status mb-10 sm:mb-14">
          <span className="font-mono text-xs text-muted tracking-widest">
            {t.hero.statusLine}
          </span>
        </div>

        {/* Name — oversized headline */}
        <h1
          className="hero-name font-bold text-text-primary leading-none tracking-tight mb-0"
          style={{
            fontSize: "clamp(4.5rem, 12vw, 10.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
          }}
        >
          <span ref={nameRef}>{profile.name}</span>
        </h1>

        {/* Divider */}
        <div
          className="hero-divider w-full h-px bg-border mt-8 mb-8"
        />

        {/* Role + Bio — two column on sm+ */}
        <div className="hero-sub grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          <p
            className="text-text-primary font-medium"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
          >
            {t.hero.rolePrefix}{" "}
            <span className="text-muted">— {t.hero.roleSuffix}</span>
          </p>
          <p className="text-muted text-sm leading-relaxed">
            {t.hero.bio}
          </p>
        </div>

        {/* CTAs + socials */}
        <div className="hero-ctas flex flex-col sm:flex-row sm:items-center gap-4 mt-10">
          <div className="flex flex-wrap items-center gap-3">
            <Button href="#projects" variant="primary" size="lg">
              {t.hero.viewProjects}
              <ArrowRight size={16} />
            </Button>
            <Button
              href={profile.cvUrl}
              variant="outline"
              size="lg"
              external
            >
              <Download size={15} />
              {t.hero.downloadCv}
            </Button>
          </div>

          <div className="flex items-center gap-2 sm:ml-auto">
            {profile.socials.slice(0, 3).map(({ label, url, icon: Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Location */}
        <p className="hero-ctas mt-6 text-xs text-muted font-mono">
          {profile.location}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 right-8 hidden sm:flex flex-col items-center gap-2 text-muted opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-muted to-transparent" />
        <span className="text-xs tracking-[0.2em] uppercase font-mono" style={{ writingMode: "vertical-rl" }}>
          {t.hero.scroll}
        </span>
      </div>
    </section>
  );
}
