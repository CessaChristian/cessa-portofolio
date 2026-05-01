export type Lang = "en" | "id";

interface HighlightItem {
  title: string;
  description: string;
}

interface ValueBullet {
  title: string;
  body: string;
}

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface EducationItem {
  school: string;
  major: string;
  period: string;
}

interface ExperienceTranslations {
  eyebrow: string;
  heading: string;
  expLabel: string;
  eduLabel: string;
  items: ExperienceItem[];
  educationItems: EducationItem[];
}

interface Translations {
  nav: {
    projects: string;
    skills: string;
    about: string;
    contact: string;
    downloadCv: string;
    ariaThemeLight: string;
    ariaThemeDark: string;
    ariaMenuOpen: string;
    ariaMenuClose: string;
  };
  hero: {
    greeting: string;
    statusLine: string;
    rolePrefix: string;
    roleSuffix: string;
    bio: string;
    viewProjects: string;
    downloadCv: string;
    scroll: string;
  };
  highlights: {
    items: [HighlightItem, HighlightItem, HighlightItem];
  };
  projects: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    featured: string;
    live: string;
    liveDemoBtn: string;
    sourceBtn: string;
    screenshots: string;
    whatIBuilt: string;
    challengesTitle: string;
  };
  skills: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    note: string;
    groups: Record<string, string>;
  };
  about: {
    eyebrow: string;
    heading: string;
    para1: string;
    para2: string;
    para3: string;
    tagOpen: string;
    valueBulletsHeading: string;
    bullets: [ValueBullet, ValueBullet, ValueBullet];
  };
  experience: ExperienceTranslations;
  contact: {
    eyebrow: string;
    heading: string;
    collaborate: string;
    description: string;
    preferredContact: string;
    sendEmail: string;
    copy: string;
    copied: string;
    socialDescriptions: Record<string, string>;
  };
  footer: {
    builtWith: string;
    allRightsReserved: string;
  };
}

export const translations: Record<Lang, Translations> = {
  en: {
    nav: {
      projects: "Projects",
      skills: "Skills",
      about: "About",
      contact: "Contact",
      downloadCv: "Download CV ↗",
      ariaThemeLight: "Switch to dark mode",
      ariaThemeDark: "Switch to light mode",
      ariaMenuOpen: "Open menu",
      ariaMenuClose: "Close menu",
    },
    hero: {
      greeting: "Hi, I'm",
      statusLine: "// Informatics Engineering student · interning at Alfamidi",
      rolePrefix: "Software Engineering Student",
      roleSuffix: "building web & mobile apps",
      bio: "I build web and mobile applications — from backend APIs to polished UIs. Currently studying Informatics Engineering (Software Engineering) at UKSW and interning as IT Business Solution at Alfamidi.",
      viewProjects: "View Projects",
      downloadCv: "Download CV",
      scroll: "Scroll",
    },
    highlights: {
      items: [
        {
          title: "Projects Built",
          description: "Full-stack web and mobile apps shipped",
        },
        {
          title: "Languages",
          description: "PHP, Golang, Python, Dart, TypeScript",
        },
        {
          title: "Focus",
          description: "Software engineering & system design",
        },
      ],
    },
    projects: {
      eyebrow: "Work",
      heading: "Projects",
      subtitle: "Things I've built — each one a real problem, real code.",
      featured: "Featured",
      live: "Live",
      liveDemoBtn: "Live Demo",
      sourceBtn: "Source",
      screenshots: "Screenshots",
      whatIBuilt: "What I Built",
      challengesTitle: "Challenges & Lessons",
    },
    skills: {
      eyebrow: "Stack",
      heading: "Skills",
      subtitle: "Technologies I work with regularly.",
      note: "Comfortable with the full stack — from writing SQL migrations to shipping mobile UI. Always learning.",
      groups: {
        Languages: "Languages",
        Frontend: "Frontend",
        Backend: "Backend",
        Database: "Database",
        Tools: "Tools",
      },
    },
    about: {
      eyebrow: "About",
      heading: "A bit about me",
      para1:
        "I'm Cessa — an Informatics Engineering (Software Engineering) student at UKSW, Salatiga, currently interning as IT Business Solution at Alfamidi. I enjoy building things from scratch and figuring out how all the pieces fit together.",
      para2:
        "Started with PHP and Laravel, then picked up Go when I needed something faster, and now I'm comfortable across the full stack — Next.js, TypeScript, Flutter, and everything in between.",
      para3:
        "Most of what I know came from just building things and breaking them. Side projects are how I explore, and every mistake usually turns into something useful.",
      tagOpen: "Currently interning at Alfamidi",
      valueBulletsHeading: "How I work",
      bullets: [
        {
          title: "Learn by building",
          body: "I understand things better when I actually build them. Tutorials only get me so far — the real learning happens when something breaks.",
        },
        {
          title: "Curious about the whole stack",
          body: "I don't stick to just one layer. I like understanding how the database, backend, and UI all connect — even if I'm not an expert in all of them.",
        },
        {
          title: "Everything goes on GitHub",
          body: "Every project I work on ends up on GitHub. It keeps me accountable and lets me look back at how far I've come.",
        },
      ],
    },
    experience: {
      eyebrow: "Journey",
      heading: "Experience & Education",
      expLabel: "Experience",
      eduLabel: "Education",
      items: [
        {
          role: "IT Business Solution Intern",
          company: "PT. Midi Utama Indonesia Tbk. (Alfamidi)",
          period: "2025 – present",
          description:
            "Built a Project Management System for the IT division — a web app that lets every department track the status of their system requests to IT in real time. Built with Python Flask.",
        },
        {
          role: "Committee — LDKM 2025",
          company: "Universitas Kristen Satya Wacana",
          period: "2025",
          description:
            "Part of a 250-member committee spread across 7 divisions. Responsible for cross-division coordination and preparing all equipment needed to run the event smoothly.",
        },
        {
          role: "Committee — Student Sports Week",
          company: "Universitas Kristen Satya Wacana",
          period: "2024 – 2025",
          description:
            "Involved in organizing a university-scale sports event for two consecutive years. Handled all operational needs to keep the event running from start to finish.",
        },
      ],
      educationItems: [
        {
          school: "Universitas Kristen Satya Wacana",
          major: "Informatics Engineering — Software Engineering",
          period: "2022 – present",
        },
        {
          school: "SMK Negeri 10 Makassar",
          major: "Computer and Network Engineering",
          period: "2019 – 2021",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      heading: "Get in touch",
      collaborate: "Let's work together.",
      description:
        "Open to internships, collaborations, and interesting projects. Drop a message — I reply within a day.",
      preferredContact: "Preferred contact",
      sendEmail: "Send email",
      copy: "Copy",
      copied: "Copied!",
      socialDescriptions: {
        GitHub: "github.com/CessaChristian",
        LinkedIn: "linkedin.com/in/cessachristian",
        Email: "cessa@example.com",
        Twitter: "@cessa",
      },
    },
    footer: {
      builtWith: "Built with Next.js & Tailwind CSS",
      allRightsReserved: "All rights reserved.",
    },
  },

  id: {
    nav: {
      projects: "Project",
      skills: "Skills",
      about: "Tentang Saya",
      contact: "Kontak",
      downloadCv: "Unduh CV ↗",
      ariaThemeLight: "Ganti ke mode gelap",
      ariaThemeDark: "Ganti ke mode terang",
      ariaMenuOpen: "Buka menu",
      ariaMenuClose: "Tutup menu",
    },
    hero: {
      greeting: "Halo, saya",
      statusLine: "// Mahasiswa Teknik Informatika UKSW · magang di Alfamidi",
      rolePrefix: "Mahasiswa Teknik Informatika",
      roleSuffix: "membangun aplikasi web & mobile",
      bio: "Aku membangun aplikasi web dan mobile — dari backend API hingga UI yang rapi. Saat ini kuliah Teknik Informatika konsentrasi Software Engineering di UKSW dan sedang magang sebagai IT Business Solution di Alfamidi.",
      viewProjects: "Lihat Proyek",
      downloadCv: "Unduh CV",
      scroll: "Gulir",
    },
    highlights: {
      items: [
        {
          title: "Proyek Dibangun",
          description: "Aplikasi web dan mobile full-stack",
        },
        {
          title: "Bahasa Pemrograman",
          description: "PHP, Golang, Python, Dart, TypeScript",
        },
        {
          title: "Fokus",
          description: "Rekayasa perangkat lunak & desain sistem",
        },
      ],
    },
    projects: {
      eyebrow: "Karya",
      heading: "Proyek",
      subtitle: "Yang telah saya bangun — masalah nyata, kode nyata.",
      featured: "Unggulan",
      live: "Live",
      liveDemoBtn: "Demo Langsung",
      sourceBtn: "Kode",
      screenshots: "Tangkapan Layar",
      whatIBuilt: "Yang Saya Bangun",
      challengesTitle: "Tantangan & Pelajaran",
    },
    skills: {
      eyebrow: "Stack",
      heading: "Keahlian",
      subtitle: "Teknologi yang saya gunakan secara rutin.",
      note: "Gampang menyesuaikan seluruh stack — dari migrasi SQL hingga UI mobile. Selalu belajar.",
      groups: {
        Languages: "Bahasa Pemrograman",
        Frontend: "Frontend",
        Backend: "Backend",
        Database: "Database",
        Tools: "Alat",
      },
    },
    about: {
      eyebrow: "Tentang Saya",
      heading: "Sedikit tentang saya",
      para1:
        "Saya Cessa — mahasiswa Teknik Informatika konsentrasi Software Engineering di UKSW, Salatiga, yang saat ini sedang magang sebagai IT Business Solution di Alfamidi. Senang membangun sesuatu dari nol dan mencari tahu bagaimana semua bagiannya bisa nyambung.",
      para2:
        "Mulai dari PHP dan Laravel, lanjut ke Go waktu butuh yang lebih cepat, dan sekarang sudah cukup nyaman di seluruh stack — Next.js, TypeScript, Flutter, dan yang lainnya.",
      para3:
        "Sebagian besar yang aku tahu datang dari coba-coba dan salah. Proyek sampingan adalah cara aku belajar, dan tiap kesalahan biasanya jadi sesuatu yang berguna.",
      tagOpen: "Sedang magang di Alfamidi",
      valueBulletsHeading: "Cara saya belajar",
      bullets: [
        {
          title: "Belajar dengan membangun",
          body: "Aku lebih paham sesuatu kalau langsung bikin sendiri. Tutorial cuma sampai di sini — belajar yang sesungguhnya baru mulai waktu ada yang error.",
        },
        {
          title: "Penasaran sama semua layer",
          body: "Aku tidak hanya fokus di satu bagian. Aku suka memahami bagaimana database, backend, dan UI saling terhubung — meski belum ahli di semuanya.",
        },
        {
          title: "Semua masuk GitHub",
          body: "Setiap proyek yang aku kerjakan ada di GitHub. Biar ada rekam jejaknya, dan bisa lihat sendiri sudah seberapa jauh perjalanannya.",
        },
      ],
    },
    experience: {
      eyebrow: "Perjalanan",
      heading: "Pengalaman & Pendidikan",
      expLabel: "Pengalaman",
      eduLabel: "Pendidikan",
      items: [
        {
          role: "IT Business Solution Intern",
          company: "PT. Midi Utama Indonesia Tbk. (Alfamidi)",
          period: "2025 – sekarang",
          description:
            "Membangun Project Management System untuk divisi IT — website yang memungkinkan semua divisi perusahaan memantau status system request yang mereka ajukan ke divisi IT secara real-time. Dibangun menggunakan Python Flask.",
        },
        {
          role: "Panitia — LDKM 2025",
          company: "Universitas Kristen Satya Wacana",
          period: "2025",
          description:
            "Bagian dari kepanitiaan yang melibatkan 250 orang tersebar di 7 divisi. Bertanggung jawab atas koordinasi lintas divisi dan persiapan seluruh peralatan yang dibutuhkan untuk kelancaran kegiatan.",
        },
        {
          role: "Panitia — Pekan Olahraga Mahasiswa",
          company: "Universitas Kristen Satya Wacana",
          period: "2024 – 2025",
          description:
            "Terlibat dalam penyelenggaraan event olahraga skala universitas selama dua tahun berturut-turut. Menyiapkan seluruh kebutuhan operasional agar event berjalan lancar dari awal hingga selesai.",
        },
      ],
      educationItems: [
        {
          school: "Universitas Kristen Satya Wacana",
          major: "Teknik Informatika — Software Engineering",
          period: "2022 – sekarang",
        },
        {
          school: "SMK Negeri 10 Makassar",
          major: "Teknik Komputer dan Jaringan",
          period: "2019 – 2021",
        },
      ],
    },
    contact: {
      eyebrow: "Kontak",
      heading: "Hubungi saya",
      collaborate: "Mari berkolaborasi.",
      description:
        "Terbuka untuk magang, kolaborasi, dan proyek menarik. Kirim pesan — saya membalas dalam sehari.",
      preferredContact: "Kontak utama",
      sendEmail: "Kirim email",
      copy: "Salin",
      copied: "Tersalin!",
      socialDescriptions: {
        GitHub: "github.com/CessaChristian",
        LinkedIn: "linkedin.com/in/cessachristian",
        Email: "cessa@example.com",
        Twitter: "@cessa",
      },
    },
    footer: {
      builtWith: "Dibuat dengan Next.js & Tailwind CSS",
      allRightsReserved: "Hak cipta dilindungi.",
    },
  },
};
