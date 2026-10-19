export type Lang = "en" | "id";

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
  projects: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    featured: string;
    live: string;
    liveDemoBtn: string;
    sourceBtn: string;
    screenshots: string;
    swipeHint: string;
    whatIBuilt: string;
    challengesTitle: string;
    tryPrototype: string;
    prototypeTitle: string;
    prototypeNote: string;
    prototypeCredentials: string;
    prototypeOfflineTip: string;
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
      rolePrefix: "Software Engineering",
      roleSuffix: "building web & mobile apps",
      bio: "Hi, I’m Cessa. I build web and mobile apps with a focus on the backend, like how data gets stored or what happens when a process fails halfway through. I still build the interface, but I’m usually more curious about what’s going on behind it. The best way I know to understand something is to build it.",
      viewProjects: "View Projects",
      downloadCv: "Download CV",
      scroll: "Scroll",
    },
    projects: {
      eyebrow: "Work",
      heading: "Projects",
      subtitle: "What I’ve built, from coursework and personal experiments to real-world needs.",
      featured: "Featured",
      live: "Live",
      liveDemoBtn: "Live Demo",
      sourceBtn: "Source",
      screenshots: "Screenshots",
      swipeHint: "swipe to see more",
      whatIBuilt: "What I Built",
      challengesTitle: "Challenges & Lessons",
      tryPrototype: "Try Prototype",
      prototypeTitle: "Interactive prototype",
      prototypeNote: "A clickable mockup of the app, running on dummy data. Nothing you do here is saved.",
      prototypeCredentials: "Demo access",
      prototypeOfflineTip: "Tap the Wi-Fi icon in the status bar to switch between offline and online mode.",
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
        "Before I build a system, I’d rather ask first: who’s going to use it, and what’s making things hard for them. Only then do I look for the most sensible way to solve it.",
      para2:
        "Started with PHP and Laravel, then picked up Go when I needed something faster, and now I'm comfortable across the full stack — Next.js, TypeScript, Flutter, and everything in between.",
      para3:
        "Most of what I know came from just building things and breaking them. Side projects are how I explore, and every mistake usually turns into something useful.",
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
        Email: "cessachristian27@gmail.com",
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
      statusLine: "// Mahasiswa Teknik Informatika UKSW.",
      rolePrefix: "Software Engineer",
      roleSuffix: "membangun website & aplikasi",
      bio: "Halo, saya Cessa. Saya membuat aplikasi web dan mobile dengan fokus di sisi backend, misalnya bagaimana data disimpan atau apa yang terjadi kalau sebuah proses gagal di tengah jalan. Saya juga membuat frontend, tapi saya lebih sering penasaran dengan apa yang terjadi di baliknya. Bagi saya, cara terbaik memahami sesuatu adalah dengan membuatnya langsung.",
      viewProjects: "Lihat Proyek",
      downloadCv: "Unduh CV",
      scroll: "Gulir",
    },
    projects: {
      eyebrow: "Karya",
      heading: "Proyek",
      subtitle: "Yang telah saya bangun, mulai dari tugas kuliah, eksplorasi pribadi, hingga kebutuhan nyata.",
      featured: "Unggulan",
      live: "Live",
      liveDemoBtn: "Demo Langsung",
      sourceBtn: "Kode",
      screenshots: "Tangkapan Layar",
      swipeHint: "geser untuk lihat lainnya",
      whatIBuilt: "Yang Saya Bangun",
      challengesTitle: "Tantangan & Pelajaran",
      tryPrototype: "Coba Prototype",
      prototypeTitle: "Prototype interaktif",
      prototypeNote: "Mockup aplikasi yang bisa diklik, berjalan dengan data dummy. Tidak ada yang tersimpan.",
      prototypeCredentials: "Akses demo",
      prototypeOfflineTip: "Ketuk ikon Wi-Fi di status bar untuk beralih antara mode offline dan online.",
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
        "Sebelum membangun sebuah sistem, saya lebih suka bertanya dulu: siapa yang akan memakainya, dan apa yang menyulitkan mereka. Setelah itu, saya mencari cara yang paling masuk akal untuk menyelesaikannya.",
      para2:
        "Dalam proses belajar, saya tidak membatasi diri pada satu teknologi saja. Saya suka mencoba hal baru, tetapi bagian yang paling menarik bagi saya adalah ketika membangun sisi backend: merancang alur aplikasi, membuat API, dan memikirkan bagaimana database bisa bekerja dengan efisien.",
      para3:
        "Saya banyak belajar melalui proses eksplorasi, membangun proyek sampingan, dan memperbaiki kesalahan yang muncul disaat membangun itu. Dari proses tersebut, saya memahami bahwa setiap kegagalan kecil bisa menjadi pengalaman yang berguna untuk berkembang.",
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
        Email: "cessachristian27@gmail.com",
      },
    },
    footer: {
      builtWith: "Dibuat dengan Next.js & Tailwind CSS",
      allRightsReserved: "Hak cipta dilindungi.",
    },
  },
};
