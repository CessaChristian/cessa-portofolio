"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  ChevronRight,
  ChevronLeft,
  X,
  Calendar,
  Wrench,
  Lightbulb,
  Images,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Drawer } from "@/components/ui/Drawer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/app/providers";
import { translations } from "@/i18n/translations";
import { cn } from "@/lib/utils";
import projects, { Project } from "@/data/projects";
import type { Lang } from "@/i18n/translations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─── Method color map ───────────────────────────────────────────────── */
const METHOD_COLORS: Record<string, string> = {
  GET: "text-emerald-400",
  POST: "text-sky-400",
  PUT: "text-amber-400",
  PATCH: "text-orange-400",
  DELETE: "text-rose-400",
};

/* ─── API card cover ─────────────────────────────────────────────────── */
function ApiCover({ project, className }: { project: Project; className?: string }) {
  const endpoints = project.endpoints ?? [];
  return (
    <div className={cn("w-full h-full bg-zinc-950 flex flex-col justify-between p-5 font-mono", className)}>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">REST API</span>
      </div>

      <div className="space-y-1.5 text-xs">
        {endpoints.map((line) => {
          const [method, ...rest] = line.trim().split(/\s+/);
          const color = METHOD_COLORS[method] ?? "text-zinc-400";
          return (
            <div key={line} className="flex gap-3">
              <span className={cn("shrink-0 w-10 text-right font-bold", color)}>{method}</span>
              <span className="text-zinc-400">{rest.join(" ")}</span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[10px] text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Cover image with gradient fallback ────────────────────────────── */
function ProjectCover({ project, className }: { project: Project; className?: string }) {
  const [imgError, setImgError] = useState(false);

  if (project.type === "api") {
    return <ApiCover project={project} className={className} />;
  }

  if (!project.coverImage || imgError) {
    return (
      <div className={cn("w-full h-full bg-surface-2 flex items-center justify-center", className)}>
        <span className="font-mono text-xs text-muted uppercase tracking-widest opacity-60">
          {project.slug}
        </span>
      </div>
    );
  }

  if (project.type === "mobile") {
    return (
      <div className={cn("w-full h-full bg-zinc-900 flex items-center justify-center", className)}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-contain p-3"
          onError={() => setImgError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <Image
      src={project.coverImage}
      alt={project.title}
      fill
      className={cn("object-cover", className)}
      onError={() => setImgError(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

/* ─── Lightbox ──────────────────────────────────────────────────────── */
function Lightbox({
  images,
  index,
  alt,
  onClose,
}: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);
  const hasPrev = current > 0;
  const hasNext = current < images.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopImmediatePropagation(); onClose(); }
      if (e.key === "ArrowLeft" && hasPrev) setCurrent((c) => c - 1);
      if (e.key === "ArrowRight" && hasNext) setCurrent((c) => c + 1);
    };
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [hasPrev, hasNext, onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/92 backdrop-blur-md" />
      <div
        className="relative z-10 w-full max-w-5xl max-h-[85vh] mx-4 aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={images[current]} alt={`${alt} ${current + 1}`} fill className="object-contain rounded-xl" sizes="100vw" />
      </div>
      <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Close">
        <X size={20} />
      </button>
      {hasPrev && (
        <button onClick={(e) => { e.stopPropagation(); setCurrent((c) => c - 1); }} className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
      )}
      {hasNext && (
        <button onClick={(e) => { e.stopPropagation(); setCurrent((c) => c + 1); }} className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Next">
          <ChevronRight size={20} />
        </button>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-xs">
          {current + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  );
}

/* ─── Screenshot horizontal strip ──────────────────────────────────── */
function ScreenshotStrip({
  screenshots,
  title,
  onOpen,
}: {
  screenshots: string[];
  title: string;
  onOpen: (i: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const check = () => {
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    const timer = setTimeout(check, 60);
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [screenshots]);

  return (
    <div className="relative">
      {/* Strip */}
      <div
        ref={scrollRef}
        className="scrollbar-none flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1"
      >
        {screenshots.map((src, i) => (
          <button
            key={i}
            onClick={() => onOpen(i)}
            /* mobile: 82% lebar = 1 item + peek; sm+: 50%-6px = tepat 2 item */
            className="snap-start shrink-0 w-[82%] sm:w-[calc(50%-6px)] relative aspect-video rounded-xl overflow-hidden bg-surface-2 group cursor-zoom-in"
            aria-label={`Lihat screenshot ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 82vw, 300px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <Images size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" />
            </div>
            {/* Nomor screenshot */}
            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/50 text-white/80 leading-none">
              {i + 1}/{screenshots.length}
            </span>
          </button>
        ))}
      </div>

      {/* Gradient fade kanan — isyarat ada konten di balik tepi */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-1 w-16 rounded-r-xl bg-gradient-to-l from-surface to-transparent transition-opacity duration-500 ease-in-out"
        style={{ opacity: canScrollRight ? 1 : 0 }}
      />

      {/* Hint teks */}
      <div
        className="mt-2 flex items-center justify-end gap-1 font-mono text-[11px] text-muted transition-opacity duration-500 ease-in-out"
        style={{ opacity: canScrollRight ? 1 : 0 }}
      >
        <ChevronRight size={11} className="animate-[pulse_1.5s_ease-in-out_infinite]" />
        <span>geser untuk lihat lainnya</span>
      </div>
    </div>
  );
}

/* ─── Detail modal content ──────────────────────────────────────────── */
function ProjectDetailContent({ project, t, lang }: { project: Project; t: typeof translations["en"]; lang: Lang }) {
  const validScreenshots = project.screenshots.filter(Boolean);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="px-5 sm:px-6 py-5 sm:py-6 space-y-6">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-2">
        <ProjectCover project={project} />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 text-sm text-muted font-mono"><Calendar size={14} />{project.year}</span>
        {project.demoUrl && (
          <Button href={project.demoUrl} external variant="outline" size="sm">
            <ExternalLink size={13} />{t.projects.liveDemoBtn}
          </Button>
        )}
        {project.repoUrl && (
          <Button href={project.repoUrl} external variant="ghost" size="sm">
            <Github size={13} />{t.projects.sourceBtn}
          </Button>
        )}
      </div>
      <p className="text-muted leading-relaxed text-sm sm:text-base">{project.description[lang]}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => <Badge key={tag} variant="accent">{tag}</Badge>)}
      </div>

      {validScreenshots.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
            <Images size={15} className="text-accent" />{t.projects.screenshots}
          </h3>
          <ScreenshotStrip
            screenshots={validScreenshots}
            title={project.title}
            onOpen={setLightboxIndex}
          />
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox images={validScreenshots} index={lightboxIndex} alt={project.title} onClose={() => setLightboxIndex(null)} />
      )}

      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
          <Wrench size={15} className="text-accent" />{t.projects.whatIBuilt}
        </h3>
        <ul className="space-y-2">
          {project.whatIBuilt[lang].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
              <ChevronRight size={14} className="text-accent mt-0.5 shrink-0" />{item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
          <Lightbulb size={15} className="text-accent" />{t.projects.challengesTitle}
        </h3>
        <ul className="space-y-2">
          {project.challenges[lang].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
              <ChevronRight size={14} className="text-muted mt-0.5 shrink-0" />{item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── 3D Tilt Card ──────────────────────────────────────────────────── */
function ProjectCard({
  project,
  lang,
  onClick,
}: {
  project: Project;
  lang: Lang;
  onClick: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power2.out" });
    const yTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(x * 8);
      yTo(y * -8);
    };

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      onClick={() => onClick(project)}
      data-cursor="view"
      style={{ transformStyle: "preserve-3d" }}
      className="group cursor-pointer rounded-xl bg-surface overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-[1.03]">
          <ProjectCover project={project} />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
            View Project <ChevronRight size={14} />
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-muted shrink-0">{project.year}</span>
        </div>
        <p className="text-muted text-xs leading-relaxed mb-3 line-clamp-2">
          {project.description[lang]}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="muted" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────── */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { lang } = useLanguage();
  const t = translations[lang];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".projects-eyebrow", {
        x: -20,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });
      gsap.from(".projects-heading", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });
      gsap.from(".projects-subtitle", {
        y: 15,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        delay: 0.25,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".project-card-anim");
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(card, {
          x: fromLeft ? -30 : 30,
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: ".projects-grid", start: "top 85%", once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const handleOpen = useCallback((p: Project) => setSelectedProject(p), []);
  const handleClose = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section id="projects" ref={sectionRef} className="section-b relative py-16 sm:py-24">
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <span className="projects-eyebrow font-mono text-xs text-accent uppercase tracking-widest mb-2 block">
              {t.projects.eyebrow}
            </span>
            <h2
              className="projects-heading font-bold text-text-primary"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {t.projects.heading}
            </h2>
            <p className="projects-subtitle mt-3 text-muted max-w-md">
              {t.projects.subtitle}
            </p>
          </div>

          <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ perspective: "800px" }}>
            {projects.map((p) => (
              <div key={p.slug} className="project-card-anim">
                <ProjectCard project={p} lang={lang} onClick={handleOpen} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {isMobile ? (
        <Drawer open={!!selectedProject} onClose={handleClose} title={selectedProject?.title}>
          {selectedProject && <ProjectDetailContent project={selectedProject} t={t} lang={lang} />}
        </Drawer>
      ) : (
        <Modal open={!!selectedProject} onClose={handleClose} title={selectedProject?.title}>
          {selectedProject && <ProjectDetailContent project={selectedProject} t={t} lang={lang} />}
        </Modal>
      )}
    </>
  );
}
