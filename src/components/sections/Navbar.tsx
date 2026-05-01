"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/providers";
import { useLanguage } from "@/app/providers";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { translations } from "@/i18n/translations";
import gsap from "gsap";

const NAV_HREFS = [
  { key: "projects" as const, href: "#projects" },
  { key: "skills" as const, href: "#skills" },
  { key: "about" as const, href: "#about" },
  { key: "contact" as const, href: "#contact" },
];

const SECTION_IDS = NAV_HREFS.map((l) => l.href.slice(1));

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { lang, setLang } = useLanguage();
  const t = translations[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS, 80);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (menuOpen) {
      menu.style.display = "flex";
      gsap.fromTo(menu, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" });
      gsap.fromTo(
        menu.querySelectorAll("a"),
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.2, stagger: 0.04, ease: "power2.out", delay: 0.05 }
      );
    } else {
      gsap.to(menu, {
        opacity: 0, y: -4, duration: 0.18, ease: "power2.in",
        onComplete: () => { if (menu) menu.style.display = "none"; },
      });
    }
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-surface/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo — lowercase mono */}
            <a
              href="#hero"
              className="font-mono text-sm tracking-wider text-text-primary hover:text-accent transition-colors"
              onClick={handleNavClick}
            >
              cessa
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {NAV_HREFS.map(({ key, href }) => {
                const id = href.slice(1);
                const isActive = activeId === id;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      className={cn(
                        "px-3 py-1.5 text-sm font-medium transition-colors",
                        isActive
                          ? "text-accent"
                          : "text-muted hover:text-text-primary"
                      )}
                    >
                      {t.nav[key]}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                aria-label={theme === "light" ? t.nav.ariaThemeLight : t.nav.ariaThemeDark}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
              >
                {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
              </button>

              <button
                onClick={() => setLang(lang === "en" ? "id" : "en")}
                aria-label={lang === "en" ? "Switch to Indonesian" : "Ganti ke Inggris"}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:text-text-primary hover:bg-surface-2 transition-colors font-mono"
              >
                <span className="text-xs font-semibold">
                  {lang === "en" ? "ID" : "EN"}
                </span>
              </button>

              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? t.nav.ariaMenuClose : t.nav.ariaMenuOpen}
                aria-expanded={menuOpen}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:text-text-primary hover:bg-surface-2 transition-colors"
              >
                {menuOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        ref={mobileMenuRef}
        style={{ display: "none" }}
        className="md:hidden fixed inset-0 z-30 flex-col pt-14 bg-surface/95 backdrop-blur-md"
      >
        <nav className="flex flex-col px-6 pt-8 gap-1">
          {NAV_HREFS.map(({ key, href }) => (
            <a
              key={href}
              href={href}
              onClick={handleNavClick}
              className="py-3.5 text-xl font-medium text-text-primary hover:text-accent border-b border-border transition-colors"
            >
              {t.nav[key]}
            </a>
          ))}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavClick}
            className="mt-6 py-3.5 text-xl font-medium text-accent"
          >
            {t.nav.downloadCv}
          </a>
        </nav>
      </div>
    </>
  );
}
