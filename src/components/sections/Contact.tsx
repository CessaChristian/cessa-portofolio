"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/app/providers";
import { translations } from "@/i18n/translations";
import profile from "@/data/profile";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EMAIL = "cessac728@gmail.com";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { lang } = useLanguage();
  const t = translations[lang];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".contact-eyebrow", {
        x: -20,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 83%", once: true },
      });

      gsap.fromTo(
        ".contact-collaborate",
        { letterSpacing: "0.15em", opacity: 0, y: 20 },
        {
          letterSpacing: "-0.02em",
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 83%", once: true },
        }
      );

      gsap.from(".contact-description", {
        y: 15,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: "top 83%", once: true },
      });

      gsap.from(".contact-email-row", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: "top 83%", once: true },
      });

      gsap.from(".contact-socials", {
        y: 15,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: "top 83%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-b py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <span className="contact-eyebrow font-mono text-xs text-accent uppercase tracking-widest mb-2 block">
          {t.contact.eyebrow}
        </span>

        <h2
          className="contact-collaborate font-bold text-text-primary mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          {t.contact.collaborate}
        </h2>

        <p className="contact-description text-muted leading-relaxed mb-10 max-w-lg">
          {t.contact.description}
        </p>

        <div className="contact-email-row flex flex-wrap items-center gap-4 mb-10">
          <a
            href={`mailto:${EMAIL}`}
            className="text-xl sm:text-2xl font-semibold text-text-primary hover:text-accent transition-colors break-all"
          >
            {EMAIL}
          </a>
          <button
            onClick={copyEmail}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-150",
              copied
                ? "bg-accent-light text-accent"
                : "bg-surface-2 text-muted hover:text-text-primary"
            )}
            aria-label={t.contact.copy}
          >
            {copied ? <><Check size={12} />{t.contact.copied}</> : <><Copy size={12} />{t.contact.copy}</>}
          </button>
        </div>

        <div className="contact-socials flex items-center gap-4">
          {profile.socials.map(({ label, url, icon: Icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group relative w-10 h-10 flex items-center justify-center rounded-full text-muted hover:text-accent hover:bg-accent-light transition-colors"
            >
              <Icon size={18} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs bg-surface-2 text-text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
