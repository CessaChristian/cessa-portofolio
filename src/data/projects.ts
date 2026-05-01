import type { Lang } from "@/i18n/translations";

type L<T> = Record<Lang, T>;

export interface Project {
  slug: string;
  type?: "web" | "mobile" | "api";
  title: string;
  description: L<string>;
  year: number;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  coverImage: string;
  screenshots: string[];
  endpoints?: string[];
  whatIBuilt: L<string[]>;
  challenges: L<string[]>;
  featured: boolean;
}

const projects: Project[] = [
  {
    slug: "taman-cerdas",
    type: "web",
    title: "Taman Cerdas Salatiga",
    description: {
      en: "Facility reservation platform for Taman Cerdas Salatiga — a city park managed by the Salatiga City Government. Citizens can check availability, book facilities, and interact through a community forum, all in one platform.",
      id: "Platform reservasi fasilitas Taman Cerdas Salatiga — taman kota yang dikelola Pemerintah Kota Salatiga. Warga bisa mengecek ketersediaan, memesan fasilitas, hingga berinteraksi lewat forum komunitas, semua dalam satu platform.",
    },
    year: 2024,
    tags: ["PHP", "MySQL", "CSS", "JavaScript"],
    repoUrl: "https://github.com/CessaChristian/taman_cerdas_salatiga.git",
    coverImage: "/projects/taman-cerdas/1.png",
    screenshots: ["/projects/taman-cerdas/2.png"],
    whatIBuilt: {
      en: [
        "Facility information pages explaining each area's details and what visitors receive when making a reservation",
        "Date availability check before login — prospective visitors can see open schedules without creating an account",
        "End-to-end reservation flow with a 1×24-hour payment deadline; the system automatically cancels reservations if proof of transfer is not uploaded on time",
        "Admin dashboard for verifying proof of transfer, with accept or reject controls for incoming reservations",
        "Community forum with nested replies — users can create posts, reply to each other's comments, and admins can remove inappropriate content",
        "Two-role authentication (user & admin) with a sliding panel login/register interface",
      ],
      id: [
        "Halaman informasi fasilitas yang menjelaskan detail tiap area dan apa saja yang didapat pengunjung saat melakukan reservasi",
        "Fitur cek ketersediaan tanggal sebelum login — calon pengunjung bisa melihat jadwal kosong tanpa perlu membuat akun terlebih dahulu",
        "Alur reservasi end-to-end dengan batas waktu pembayaran 1×24 jam; sistem otomatis membatalkan reservasi jika bukti transfer tidak diunggah tepat waktu",
        "Dashboard admin untuk verifikasi bukti transfer, serta fitur terima atau tolak reservasi yang masuk",
        "Forum komunitas dengan nested reply — pengguna bisa membuat post, membalas komentar satu sama lain, dan admin dapat menghapus konten yang tidak sesuai",
        "Autentikasi dua peran (user & admin) dengan tampilan login/register sliding panel",
      ],
    },
    challenges: {
      en: [
        "Building date availability check logic without a framework — pure PHP and MySQL queries with accurate slot conflict handling",
        "Designing a 24-hour deadline auto-cancel system that runs reliably without an external job scheduler",
        "Implementing nested forum replies using recursive SQL queries without additional libraries",
      ],
      id: [
        "Membangun logika cek ketersediaan tanggal tanpa framework — murni PHP dan query MySQL dengan penanganan konflik slot yang akurat",
        "Merancang sistem auto-cancel berbasis deadline 24 jam yang berjalan andal tanpa job scheduler eksternal",
        "Mengimplementasikan nested reply forum menggunakan recursive query SQL tanpa library tambahan",
      ],
    },
    featured: true,
  },
  {
    slug: "landing-page",
    type: "web",
    title: "Landing Page Coffee Shop",
    description: {
      en: "Informative landing page for a coffee shop. Focused on visitor experience highlighting signature menus, atmosphere gallery, location/outlets, and customer reviews.",
      id: "Landing page informatif untuk sebuah coffee shop. Fokus pengalaman pengunjung highlight, signature menu, galeri suasana, lokasi/outlet, dan review.",
    },
    year: 2025,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    repoUrl: "https://github.com/CessaChristian/landing_page.git",
    demoUrl: "https://landing-page-cessa.vercel.app",
    coverImage: "/projects/landing-page/cover.png",
    screenshots: [
      "/projects/landing-page/1.png",
      "/projects/landing-page/2.png",
    ],
    whatIBuilt: {
      en: [
        "Built a single-page section-based layout (Hero, Signature Menu, Gallery, Location, Reviews, etc.) for easy maintenance and scalability",
        "Created a navbar with active section indicator (scroll-spy), smooth scroll, and a drawer-style mobile menu",
        "Assembled a Signature Menu section with category tabs and a button linking to the full PDF menu",
        "Built a Gallery in a grid layout with modal-based image preview",
        "Applied smooth hero animations using GSAP with performance considerations",
        "Designed a global styling system using color tokens with a subtle noise texture background",
        "Centralized all static content in a single data file so content edits don't pollute components",
      ],
      id: [
        "Membangun landing page satu halaman berbasis section (Hero, Menu Andalan, Galeri, Lokasi, Ulasan, dan lain-lain) agar mudah dirawat dan dikembangkan",
        "Membuat navbar dengan penanda section aktif (scroll-spy), smooth scroll, dan menu mobile berbentuk drawer",
        "Menyusun bagian Menu Andalan dengan kategori (tab) serta tombol menuju PDF menu lengkap",
        "Membuat Galeri dalam bentuk grid dengan tampilan pratinjau menggunakan modal",
        "Menerapkan animasi hero yang halus menggunakan GSAP, dengan pertimbangan performa",
        "Merancang sistem styling global memakai token warna dengan sentuhan latar noise yang halus",
        "Memusatkan konten statis dalam satu file data agar edit konten tidak mengotori komponen",
      ],
    },
    challenges: {
      en: [
        "Keeping animations feeling professional without degrading performance, especially on mobile devices",
        "Managing navigation section offsets so anchors aren't hidden behind the navbar",
        "Creating a clean content data structure that's easy to update and extend",
      ],
      id: [
        "Menjaga animasi tetap terasa profesional tanpa menurunkan performa, terutama di perangkat mobile",
        "Mengatur offset navigasi section agar anchor tidak tertutup navbar",
        "Membuat struktur data konten yang rapi supaya gampang diganti/ditambah",
      ],
    },
    featured: false,
  },
  {
    slug: "kasir-app",
    type: "mobile",
    title: "Kasir App — POS Restoran",
    description: {
      en: "Offline Point of Sale application for small restaurants. Runs fully without internet using local SQLite — from product management and cashier transactions to daily sales reports and Excel export.",
      id: "Aplikasi Point of Sale offline untuk restoran kecil. Beroperasi penuh tanpa koneksi internet menggunakan SQLite lokal — dari manajemen produk, transaksi kasir, hingga laporan penjualan harian dan ekspor Excel.",
    },
    year: 2025,
    tags: ["Flutter", "Dart", "Drift", "SQLite", "fl_chart"],
    repoUrl: "https://github.com/CessaChristian/kasir_app.git",
    coverImage: "/projects/kasir_mobile_app/1.png",
    screenshots: [
      "/projects/kasir_mobile_app/2.png",
      "/projects/kasir_mobile_app/3.png",
      "/projects/kasir_mobile_app/4.png",
      "/projects/kasir_mobile_app/5.png",
    ],
    whatIBuilt: {
      en: [
        "Two-role authentication system (Owner & Cashier) with SHA-256 encrypted PIN and recovery code",
        "POS interface with shopping cart, barcode support, and cash and QRIS payment methods",
        "Product and inventory management — add, edit, delete products with stock tracking",
        "Transaction history with monthly filter and detailed view per transaction",
        "Analytics dashboard with daily/monthly revenue trend charts and best-selling products using fl_chart",
        "Excel report export with 4 sheets: summary, products, transactions, and employee performance",
        "Staff management with access permission control and PIN reset feature",
      ],
      id: [
        "Sistem autentikasi dua peran (Owner & Kasir) dengan PIN terenkripsi SHA-256 dan recovery code",
        "Antarmuka POS dengan keranjang belanja, dukungan barcode, dan metode pembayaran tunai serta QRIS",
        "Manajemen produk dan inventaris — tambah, edit, hapus produk beserta stok",
        "Riwayat transaksi dengan filter bulanan dan tampilan detail per transaksi",
        "Dashboard analitik dengan grafik tren pendapatan harian/bulanan dan produk terlaris menggunakan fl_chart",
        "Ekspor laporan ke Excel dengan 4 sheet: ringkasan, produk, transaksi, dan performa karyawan",
        "Manajemen staf dengan kontrol izin akses dan fitur reset PIN",
      ],
    },
    challenges: {
      en: [
        "Designing an offline-first architecture with Drift (SQLite ORM) so all features work without an internet connection",
        "Implementing PIN encryption with SHA-256 and a secure recovery code system without a server",
        "Building a multi-sheet Excel export feature that aggregates transaction and performance data locally",
      ],
      id: [
        "Merancang arsitektur offline-first dengan Drift (SQLite ORM) agar semua fitur tetap berjalan tanpa koneksi internet",
        "Mengimplementasikan enkripsi PIN dengan SHA-256 dan sistem recovery code yang aman tanpa server",
        "Membangun fitur ekspor Excel multi-sheet yang mengagregasi data transaksi dan performa secara lokal",
      ],
    },
    featured: false,
  },
  {
    slug: "online-shop-php",
    type: "web",
    title: "LiLBRO — Online Shop",
    description: {
      en: "Web-based e-commerce application with a dual-role architecture (customer & admin). Customers can browse products, manage their cart, and checkout — admins can manage products, confirm payments, and monitor transaction history.",
      id: "Aplikasi e-commerce berbasis web dengan arsitektur dual-role (customer & admin). Customer bisa browse produk, kelola keranjang, dan checkout — admin bisa manage produk, konfirmasi pembayaran, dan pantau riwayat transaksi.",
    },
    year: 2024,
    tags: ["PHP", "MySQL", "CSS", "JavaScript"],
    repoUrl: "https://github.com/CessaChristian/online-shop-sql.git",
    coverImage: "/projects/online-shop-php/1.png",
    screenshots: [
      "/projects/online-shop-php/2.png",
      "/projects/online-shop-php/3.png",
      "/projects/online-shop-php/4.png",
      "/projects/online-shop-php/5.png",
      "/projects/online-shop-php/6.png",
    ],
    whatIBuilt: {
      en: [
        "Two-role authentication system (customer & admin) with password hashing and session management — customers and admins have completely separate views and access",
        "Shop page with category-based product browsing, cart management (add, change quantity, remove), and end-to-end checkout flow",
        "Order history page for customers — view item details, price, and status (pending/confirmed) per transaction",
        "Admin dashboard with real-time statistics: total products, pending payments, and confirmed payments",
        "Full CRUD product management on the admin side — add, edit, delete products with image upload and unique file naming",
        "Payment confirmation feature and full transaction history on the admin panel, complete with item details and customer names",
      ],
      id: [
        "Sistem autentikasi dua peran (customer & admin) dengan password hashing dan session management — customer dan admin memiliki tampilan serta akses yang sepenuhnya terpisah",
        "Halaman toko dengan browsing produk per kategori, manajemen keranjang belanja (tambah, ubah kuantitas, hapus), dan alur checkout end-to-end",
        "Halaman riwayat pesanan untuk customer — bisa lihat detail item, harga, dan status (pending/confirmed) per transaksi",
        "Dashboard admin dengan statistik real-time: total produk, pembayaran pending, dan pembayaran confirmed",
        "Manajemen produk CRUD lengkap di sisi admin — tambah, edit, hapus produk beserta upload gambar dengan penamaan file unik",
        "Fitur konfirmasi pembayaran dan riwayat seluruh transaksi di panel admin, lengkap dengan detail item dan nama customer",
      ],
    },
    challenges: {
      en: [
        "Implementing database transactions during checkout — INSERT to orders, INSERT to order_items, and DELETE cart performed atomically using beginTransaction/rollBack to keep data consistent if an error occurs",
        "Building session-based RBAC without a framework — every page manually validates the role to prevent admins and customers from accessing each other's areas",
        "Safely managing product image uploads: file type validation, generating unique names with uniqid(), and deleting old files when products are updated or deleted",
      ],
      id: [
        "Mengimplementasikan database transaction saat checkout — INSERT ke orders, INSERT ke order_items, dan DELETE cart dilakukan atomik menggunakan beginTransaction/rollBack agar data tetap konsisten bila terjadi error",
        "Membangun RBAC berbasis session tanpa framework — setiap halaman memvalidasi role secara manual agar admin dan customer tidak bisa mengakses area satu sama lain",
        "Mengelola upload gambar produk secara aman: validasi tipe file, generate nama unik dengan uniqid(), dan hapus file lama saat produk diupdate atau dihapus",
      ],
    },
    featured: false,
  },
  {
    slug: "dealer-api",
    type: "api",
    title: "Dealer Otomotif API",
    description: {
      en: "REST API for an automotive dealer system — vehicle inventory management, purchase transactions, Midtrans payment gateway, and CSV reports. Includes Swagger documentation and JWT authentication with 3-tier roles.",
      id: "REST API untuk sistem dealer otomotif — manajemen inventaris kendaraan, transaksi pembelian, payment gateway Midtrans, dan laporan CSV. Dilengkapi dokumentasi Swagger dan autentikasi JWT dengan 3-tier role.",
    },
    year: 2024,
    tags: ["Go", "Go Echo", "PostgreSQL", "JWT", "Midtrans", "Swagger"],
    repoUrl: "https://github.com/CessaChristian/dealer-golang-api.git",
    coverImage: "",
    screenshots: [],
    endpoints: [
      "GET    /vehicles",
      "POST   /transactions",
      "POST   /auth/login",
      "GET    /reports/csv",
      "PUT    /admin/vehicles/:id",
    ],
    whatIBuilt: {
      en: [
        "REST API with 3-tier roles (public, customer, admin) using JWT for authentication and RBAC for per-endpoint authorization",
        "Midtrans payment gateway integration for online vehicle purchase transactions",
        "Automatic vehicle data import via RapidAPI based on brand and type specifications",
        "Low stock and vehicle popularity reports exportable in JSON and CSV formats",
        "Complete API documentation using Swagger UI accessible directly from the browser",
      ],
      id: [
        "REST API dengan 3-tier role (public, customer, admin) menggunakan JWT untuk autentikasi dan RBAC untuk otorisasi per endpoint",
        "Integrasi payment gateway Midtrans untuk proses transaksi pembelian kendaraan secara online",
        "Fitur import data kendaraan otomatis via RapidAPI berdasarkan spesifikasi merek dan tipe",
        "Laporan stok rendah dan popularitas kendaraan yang bisa diekspor dalam format JSON dan CSV",
        "Dokumentasi API lengkap menggunakan Swagger UI yang bisa diakses langsung dari browser",
      ],
    },
    challenges: {
      en: [
        "Designing clean RBAC in Go Echo without additional libraries — custom middleware for per-endpoint role validation",
        "Handling Midtrans webhook callbacks idempotently to prevent duplicate transaction records",
        "Synchronizing vehicle data from RapidAPI with the internal database schema without losing existing data",
      ],
      id: [
        "Merancang RBAC yang bersih di Go Echo tanpa library tambahan — middleware custom untuk validasi role per endpoint",
        "Menangani webhook callback Midtrans secara idempoten agar tidak ada transaksi yang tercatat ganda",
        "Menyinkronkan data kendaraan dari RapidAPI dengan skema database internal tanpa kehilangan data eksisting",
      ],
    },
    featured: false,
  },
];

export default projects;
