"use client";

import { useLanguage } from "@/app/providers";
import { translations } from "@/i18n/translations";
import profile from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-sm tracking-wider text-muted">
          cessa
        </span>

        <div className="flex items-center gap-3">
          {profile.socials.map(({ label, url, icon: Icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-accent transition-colors"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        <p className="text-xs text-muted">
          &copy; {year} Cessa. {t.footer.allRightsReserved}
        </p>
      </div>
    </footer>
  );
}
