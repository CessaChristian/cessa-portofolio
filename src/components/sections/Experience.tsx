"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/app/providers";
import { translations } from "@/i18n/translations";
import profile from "@/data/profile";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".exp-eyebrow", {
        x: -20,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
      });

      gsap.from(".exp-title", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
      });

      gsap.from(".exp-item", {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".exp-list", start: "top 88%", once: true },
      });

      gsap.from(".edu-item", {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.14,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".edu-list", start: "top 88%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <span className="exp-eyebrow font-mono text-xs text-accent uppercase tracking-widest mb-2 block">
          {t.experience.eyebrow}
        </span>
        <h2
          className="exp-title font-bold text-text-primary mb-12 sm:mb-16"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          {t.experience.heading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* ── Experience ─────────────────────────────────── */}
          <div className="lg:col-span-7 exp-list">
            <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
              {t.experience.expLabel}
            </h3>
            <div className="divide-y divide-border">
              {profile.experiences.map((exp, i) => (
                <div key={i} className="exp-item py-6 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p className="font-semibold text-text-primary leading-snug">
                        {exp.role}
                      </p>
                      <p className="text-sm text-accent mt-0.5 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-muted shrink-0 pt-0.5 bg-surface-2 px-2 py-1 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Education ──────────────────────────────────── */}
          <div className="lg:col-span-5 edu-list">
            <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
              {t.experience.eduLabel}
            </h3>
            <div className="divide-y divide-border">
              {profile.education.map((edu, i) => (
                <div key={i} className="edu-item py-6 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p className="font-semibold text-text-primary leading-snug">
                      {edu.school}
                    </p>
                    <span className="font-mono text-xs text-muted shrink-0 pt-0.5 bg-surface-2 px-2 py-1 rounded">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{edu.major}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
