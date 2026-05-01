"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Lang } from "@/i18n/translations";
import { CustomCursor } from "@/components/effects/CustomCursor";

/* ─── Theme Context ──────────────────────────────────────────────────── */
type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial: Theme = stored ?? (systemDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.dataset.theme = next;
      return next;
    });
  }, []);

  // Avoid flash of wrong theme — keep children hidden until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "light", toggle }}>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ─── Language Context ───────────────────────────────────────────────── */
interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "en" || stored === "id") {
      setLangState(stored);
    } else {
      // Detect browser locale — default to 'id' for Indonesian browsers
      const browserLang = navigator.language.toLowerCase();
      const initial: Lang = browserLang.startsWith("id") ? "id" : "en";
      setLangState(initial);
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    localStorage.setItem("lang", next);
    setLangState(next);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

/* ─── Root Providers ─────────────────────────────────────────────────── */
export function Providers({ children }: { children: React.ReactNode }) {
  /* ── Register GSAP ScrollTrigger ───────────────────────────────── */
  useEffect(() => {
    const init = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
    };
    init();
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <CustomCursor />
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}
