# Cessa — Portfolio

Personal portfolio website built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **GSAP**.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

---

## How to replace the CV

1. Drop your PDF into `/public/cv.pdf` (overwrite the placeholder).
2. The "Download CV" and "View" buttons in the Resume section automatically link to `/cv.pdf`.

---

## How to replace project screenshots / covers

Each project has its own folder under `/public/projects/<slug>/`:

```
public/
  projects/
    kios-digital/
      cover.png   ← main card cover (16:9 recommended)
      1.png       ← screenshot shown in detail view
      2.png       ← additional screenshot (optional)
    taskflow/
      cover.png
      1.png
    ...
```

Replace the placeholder PNG files with your actual screenshots. Recommended dimensions:

| File | Recommended size |
|------|-----------------|
| `cover.png` | 1280×720 (16:9) |
| `1.png`, `2.png` | 1280×800 or similar |

---

## How to edit profile data

Open `src/data/profile.ts` and update the fields:

```ts
const profile = {
  name: "Cessa",
  role: "Software Engineering Student",
  location: "Salatiga, Indonesia",
  university: "Universitas Kristen Satya Wacana",
  // ...
  socials: [
    { label: "GitHub", url: "https://github.com/CessaChristian", icon: Github },
    { label: "LinkedIn", url: "https://linkedin.com/in/YOUR_PROFILE", icon: Linkedin },
    { label: "Email", url: "mailto:YOUR_EMAIL", icon: Mail },
  ],
  cvUrl: "/cv.pdf",
};
```

---

## How to add or edit projects

Open `src/data/projects.ts`. Each project follows this shape:

```ts
{
  slug: "my-project",           // must match /public/projects/<slug>/
  title: "My Project",
  description: "Short description shown on card.",
  year: 2024,
  tags: ["Next.js", "PostgreSQL"],
  repoUrl: "https://github.com/...",   // optional
  demoUrl: "https://...",              // optional
  coverImage: "/projects/my-project/cover.png",
  screenshots: ["/projects/my-project/1.png"],
  whatIBuilt: [
    "Feature 1 — what you built and why",
    "Feature 2",
  ],
  challenges: [
    "Challenge you overcame",
  ],
  featured: false,  // set true for ONE project to show as the hero card
}
```

**Only one project should have `featured: true`.**

---

## Project structure

```
src/
  app/
    globals.css       # CSS variables + Tailwind v4 theme
    layout.tsx        # Root layout
    page.tsx          # Page assembly
    providers.tsx     # Theme (light/dark) context
  components/
    ui/
      Button.tsx
      Badge.tsx
      Modal.tsx       # Desktop project detail
      Drawer.tsx      # Mobile project detail
      IconButton.tsx
    sections/
      Navbar.tsx
      Hero.tsx
      Highlights.tsx
      Projects.tsx
      Skills.tsx
      About.tsx
      Resume.tsx
      Contact.tsx
      Footer.tsx
      BackToTop.tsx
  hooks/
    usePrefersReducedMotion.ts
    useScrollSpy.ts
    useLockBodyScroll.ts
  lib/
    utils.ts
  data/
    profile.ts
    projects.ts
public/
  cv.pdf
  projects/<slug>/cover.png
```

---

## Customising the theme

Color tokens live in `src/app/globals.css`. Edit the `:root` (light) and `[data-theme="dark"]` blocks:

```css
:root {
  --accent: #4f46e5;   /* indigo — change to your preferred accent */
  --bg: #f8fafc;
  /* ... */
}
```

---

## Accessibility & Performance

- All interactive elements are keyboard-navigable.
- GSAP animations are disabled when the OS has `prefers-reduced-motion: reduce` enabled.
- Images use `next/image` for automatic optimisation (replace placeholder PNGs for best results).
- Dark mode persists via `localStorage` and respects the system preference on first load.
