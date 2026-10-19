import type { Lang } from "@/i18n/translations";

type L<T> = Record<Lang, T>;

export interface PrototypeDemo {
  /** Path file HTML prototype di /public */
  src: string;
  /** Kredensial demo yang ditampilkan di samping prototype */
  credentials: { label: L<string>; value: string }[];
}

export interface Project {
  slug: string;
  type?: "web" | "mobile" | "api";
  title: string;
  /** Label konteks proyek (mis. Proyek Kuliah, Prototipe) — tampil di dekat tahun */
  contextBadges?: L<string[]>;
  description: L<string>;
  year: number;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  coverImage: string;
  screenshots: string[];
  endpoints?: string[];
  prototype?: PrototypeDemo;
  whatIBuilt: L<string[]>;
  challenges: L<string[]>;
  featured: boolean;
}

const projects: Project[] = [
  {
    slug: "taman-cerdas",
    type: "web",
    title: "Taman Cerdas Salatiga",
    contextBadges: {
      en: ["Course Project", "Prototype"],
      id: ["Proyek Kuliah", "Prototipe"],
    },
    description: {
      en: "A facility booking system for Taman Cerdas Salatiga. Before building it, I visited Salatiga's Environmental Agency and found that bookings still ran through WhatsApp: visitors had to wait for the admin to reply just to see which dates were free, and after office hours there was no one to ask. The site puts all of that in one place, from checking open dates without logging in to booking and paying.",
      id: "Sistem reservasi fasilitas untuk Taman Cerdas Salatiga. Sebelum membuatnya, saya datang ke Dinas Lingkungan Hidup Kota Salatiga dan menemukan reservasi masih dilakukan lewat WhatsApp: pengunjung harus menunggu balasan admin untuk tahu jadwal kosong, dan di luar jam operasional tidak ada yang bisa ditanya. Website ini memindahkan proses itu ke satu tempat, dari cek jadwal tanpa login sampai pemesanan dan pembayaran.",
    },
    year: 2024,
    tags: ["PHP", "MySQL", "Bootstrap", "CSS", "JavaScript"],
    repoUrl: "https://github.com/CessaChristian/taman_cerdas_salatiga.git",
    coverImage: "/projects/taman-cerdas/1.png",
    screenshots: ["/projects/taman-cerdas/2.png"],
    whatIBuilt: {
      en: [
        "Facility pages that explain each area and what visitors get",
        "Date availability you can check without logging in, so people see open slots before signing up",
        "A full booking flow with a 24-hour payment window",
        "An admin dashboard for checking transfer receipts and approving or rejecting bookings",
        "A community forum with threaded replies, where admins can remove posts that cross the line",
        "Login with two roles: user and admin",
      ],
      id: [
        "Halaman fasilitas yang menjelaskan isi tiap area dan apa yang didapat pengunjung",
        "Cek ketersediaan tanggal tanpa perlu login, jadi pengunjung bisa melihat jadwal kosong dulu sebelum membuat akun",
        "Alur reservasi lengkap dengan batas waktu pembayaran 24 jam",
        "Dashboard admin untuk memeriksa bukti transfer dan menerima atau menolak reservasi",
        "Forum komunitas dengan balasan bersarang; admin bisa menghapus konten yang tidak pantas",
        "Login dua peran (user dan admin)",
      ],
    },
    challenges: {
      en: [
        "Stopping double bookings. A new booking is rejected if its dates overlap with another active one. I wrote this in plain PHP and MySQL, no framework.",
        "Auto-cancel without a cron job. Whenever a related page loads, the system cancels bookings older than 24 hours that still have no receipt. It's enough for a city park, though it means nothing gets cancelled until someone opens the page.",
        "Threaded replies with one column. Each reply stores a parent_id, so one query pulls every reply and the page builds the threads from there.",
      ],
      id: [
        "Mencegah jadwal tabrakan. Reservasi baru ditolak kalau rentang tanggalnya beririsan dengan reservasi lain yang masih aktif. Logikanya ditulis langsung dengan PHP dan query MySQL, tanpa framework.",
        "Auto-cancel tanpa cron. Setiap kali halaman terkait dibuka, sistem membatalkan reservasi yang sudah lewat 24 jam tanpa bukti transfer. Untuk skala taman kota ini sudah cukup, meskipun pembatalannya baru terjadi saat ada yang membuka halaman.",
        "Balasan bersarang dengan satu kolom. Setiap balasan menyimpan parent_id, jadi semua balasan cukup diambil dengan satu query lalu disusun menjadi utas di tampilan.",
      ],
    },
    featured: true,
  },
  {
    slug: "landing-page",
    type: "web",
    title: "Landing Page Coffee Shop",
    contextBadges: {
      en: ["Personal Project", "Concept"],
      id: ["Proyek Pribadi", "Konsep"],
    },
    description: {
      en: "A landing page concept for a coffee shop, using Anak Panah Kopi Salatiga as the example. It's a personal project and isn't affiliated with the café. I shaped the content from online research into what people usually check before heading to a coffee shop: opening hours, the menu, the vibe, location, and reviews.",
      id: "Konsep landing page untuk coffee shop, memakai Anak Panah Kopi Salatiga sebagai contoh. Proyek pribadi dan tidak berafiliasi dengan pihak kafe. Isi halamannya saya susun dari riset online tentang apa yang biasanya dicek orang sebelum datang ke coffee shop: jam buka, menu, suasana, lokasi, dan ulasan.",
    },
    year: 2025,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "shadcn/ui", "Framer Motion"],
    repoUrl: "https://github.com/CessaChristian/landing_page.git",
    demoUrl: "https://landing-page-cessa.vercel.app",
    coverImage: "/projects/landing-page/cover.png",
    screenshots: [
      "/projects/landing-page/1.png",
      "/projects/landing-page/2.png",
    ],
    whatIBuilt: {
      en: [
        "One page split by what visitors need: hours, why come, menu, gallery, locations, and reviews",
        "A navbar that highlights the section you're on, smooth scrolling, and a drawer menu on mobile",
        "Favorite drinks grouped by category (coffee, non-coffee, food), with a link to the full PDF menu",
        "A gallery grid with a modal image preview",
        "A GSAP hero animation that turns itself off on small screens and for people who prefer reduced motion",
        "All content (menu, hours, reviews) kept in one data file, separate from the components",
      ],
      id: [
        "Satu halaman yang dibagi sesuai kebutuhan pengunjung: jam buka, alasan datang, menu, galeri, lokasi dan cabang, serta ulasan",
        "Navbar yang menandai section aktif saat di-scroll, smooth scroll, dan menu drawer di mobile",
        "Menu favorit per kategori (kopi, non-kopi, makanan) dengan tautan ke PDF menu lengkap",
        "Galeri grid dengan pratinjau gambar di modal",
        "Animasi hero GSAP yang otomatis mati di layar kecil dan saat pengguna memilih reduced motion",
        "Semua konten (menu, jam buka, ulasan) disimpan di satu file data, terpisah dari komponen",
      ],
    },
    challenges: {
      en: [
        "Animation that doesn't punish phones. The hero animation only runs on larger screens and switches off for anyone who's asked their system for less motion.",
        "Navbar covering section titles. Clicking a menu link used to tuck the section title under the sticky navbar. scroll-margin-top fixed it.",
        "Content kept out of the code. Everything lives in one data file, so the page could serve a different café just by swapping the content. That's what lets it work like a template.",
      ],
      id: [
        "Animasi tanpa membebani HP. Animasi hero hanya berjalan di layar besar, dan otomatis mati untuk pengguna yang memilih mengurangi gerakan.",
        "Judul section tertutup navbar. Saat menu diklik, judul section sempat tertutup navbar yang menempel di atas. Masalahnya selesai dengan scroll-margin-top.",
        "Konten terpisah dari kode. Karena semua isi ada di satu file data, halaman ini bisa dipakai untuk kafe lain cukup dengan mengganti isinya. Inilah yang membuatnya bisa berfungsi seperti template.",
      ],
    },
    featured: false,
  },
  {
    slug: "kasir-app",
    type: "mobile",
    title: "Kasir App — POS Restoran",
    contextBadges: {
      en: ["Client Project", "In Development"],
      id: ["Proyek Klien", "Dalam Pengembangan"],
    },
    description: {
      en: "An Android point-of-sale app for a restaurant in Salatiga, built for a client and still in development. It started as offline-only. Partway through, I decided to make it work both offline and online, partly to learn how sync really works and partly so the owner wouldn't have to pay for a server. It now runs on Supabase's free tier with no backend server of my own to host. I put the feature list together by studying other POS apps, then checked it with the owner.",
      id: "Aplikasi kasir Android untuk rumah makan di Salatiga, dibuat untuk klien dan masih dalam pengembangan. Awalnya hanya offline, lalu saya memutuskan membuatnya bisa offline dan online sekaligus: untuk belajar arsitektur sinkronisasi, dan supaya owner tidak perlu membayar server. Hasilnya berjalan di Supabase free tier tanpa server backend yang saya hosting sendiri. Fitur-fiturnya saya susun dari riset aplikasi POS lain, lalu saya konfirmasi ke owner.",
    },
    year: 2025,
    tags: ["Flutter", "Dart", "Drift (SQLite)", "Supabase", "PostgreSQL", "fl_chart"],
    prototype: {
      src: "/prototypes/kasir-app.html",
      credentials: [
        { label: { en: "Device key", id: "Kunci perangkat" }, value: "TERAS-2026" },
        { label: { en: "Owner login", id: "Login owner" }, value: "owner · 1234" },
        { label: { en: "Cashier login", id: "Login kasir" }, value: "shift1 · 1234" },
      ],
    },
    coverImage: "/projects/kasir_mobile_app/1.png",
    screenshots: [
      "/projects/kasir_mobile_app/2.png",
      "/projects/kasir_mobile_app/3.png",
      "/projects/kasir_mobile_app/4.png",
      "/projects/kasir_mobile_app/5.png",
    ],
    whatIBuilt: {
      en: [
        "Two-role login (owner and cashier) with PINs, a recovery code for the owner, and adjustable cashier permissions",
        "A checkout screen with a cart, barcode scanning, cash and QRIS payments, order types, receipts, and open bills",
        "Cashier shifts with a starting cash float, expense logging, and a daily transaction history",
        "Daily and monthly reports with charts, best sellers, and per-cashier performance, exportable to Excel",
        "Device registration by the owner, so only approved phones can sync data",
      ],
      id: [
        "Login dua peran (owner dan kasir) dengan PIN, recovery code untuk owner, dan izin akses kasir yang bisa diatur",
        "Halaman kasir dengan keranjang, barcode, pembayaran tunai dan QRIS, tipe pesanan, struk, serta open bill",
        "Shift kasir dengan kas awal, pencatatan pengeluaran, dan riwayat transaksi per hari",
        "Laporan harian dan bulanan dengan grafik, produk terlaris, dan performa kasir, bisa diekspor ke Excel",
        "Pendaftaran perangkat oleh owner, supaya hanya HP yang diizinkan yang bisa menyinkron data",
      ],
    },
    challenges: {
      en: [
        "Keeping sales going when the internet drops. Everything is saved on the phone first and sent to Supabase once there's a connection. If the same record changes on two phones, the newest version wins. Product photos sync separately, so a failed upload never takes a transaction down with it.",
        "No secrets inside the APK. I proved to myself that --dart-define values can still be pulled out of a release APK. So each phone now gets its own credentials when it's registered, and the data is protected by Row Level Security rather than a hidden key. A test fails automatically if the service_role key ever shows up in the code.",
        "Storing PINs safely. PINs are hashed with PBKDF2 at 120,000 iterations. Older PINs still on SHA-256 get moved to the new format the next time that person logs in.",
        "Free tier, with eyes open. No monthly server bill, but there's a 500 MB cap, the project pauses after a week of no activity, and there are no automatic backups. Since the data lives on the phone too, cashiers can keep selling even when the server isn't there.",
      ],
      id: [
        "Tetap jalan saat internet putus. Semua data disimpan dulu di HP, lalu dikirim ke Supabase saat online. Kalau satu data diubah di dua HP, versi yang paling baru yang dipakai. Foto produk disinkron terpisah, jadi upload foto yang gagal tidak ikut menggagalkan transaksi.",
        "Tidak ada rahasia di dalam APK. Saya membuktikan sendiri bahwa nilai --dart-define tetap bisa dibaca dari APK release. Karena itu, kredensial perangkat sekarang dibuat per HP saat didaftarkan, dan keamanan data bergantung pada Row Level Security, bukan pada kunci yang disembunyikan. Ada juga test yang otomatis gagal kalau kunci service_role muncul di kode.",
        "PIN yang aman disimpan. PIN di-hash dengan PBKDF2 (120.000 iterasi). PIN lama yang masih memakai SHA-256 otomatis dipindahkan ke format baru saat pengguna login.",
        "Free tier dengan batasan yang diketahui. Tanpa biaya server bulanan, tapi ada batas 500 MB, project dijeda kalau seminggu tidak aktif, dan tidak ada backup otomatis. Karena data tetap tersimpan di HP, kasir tetap bisa berjualan walaupun server sedang tidak tersedia.",
      ],
    },
    featured: false,
  },
  {
    slug: "online-shop-php",
    type: "web",
    title: "LiLBRO — Online Shop",
    contextBadges: {
      en: ["Course Assignment"],
      id: ["Tugas Kuliah"],
    },
    description: {
      en: "A simple online shop for drinks, built as a class assignment that called for CRUD and two user roles. Customers can browse products, fill a cart, and check out; admins manage products, confirm payments, and see every transaction. Beyond what the assignment asked for, I added a database transaction at checkout and hashed passwords.",
      id: "Toko online sederhana untuk produk minuman, dibuat sebagai tugas kuliah dengan syarat CRUD dan dua peran pengguna. Pelanggan bisa melihat produk, mengisi keranjang, dan checkout; admin mengelola produk, mengonfirmasi pembayaran, dan melihat semua transaksi. Di luar syarat tugas, saya menambahkan transaksi database saat checkout dan password yang di-hash.",
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
        "Sign-up and login with hashed passwords, and separate sessions for customers and admins",
        "A product catalog grouped by category, a shopping cart, and a checkout flow",
        "Order history for customers, with item details and status (Pending or Confirmed)",
        "An admin dashboard showing product count, pending payments, and confirmed payments",
        "Product management (add, edit, delete) with image uploads; old images are removed when a product is changed or deleted",
        "Payment confirmation and a full transaction history in the admin panel",
      ],
      id: [
        "Registrasi dan login dengan password yang di-hash, serta sesi terpisah untuk pelanggan dan admin",
        "Katalog produk per kategori, keranjang belanja, dan alur checkout",
        "Riwayat pesanan pelanggan dengan detail item dan status (Pending atau Confirmed)",
        "Dashboard admin berisi jumlah produk, pembayaran tertunda, dan pembayaran terkonfirmasi",
        "Kelola produk (tambah, edit, hapus) dengan upload gambar; gambar lama ikut dihapus saat produk diganti atau dihapus",
        "Konfirmasi pembayaran dan riwayat seluruh transaksi di panel admin",
      ],
    },
    challenges: {
      en: [
        "No half-finished checkouts. Creating the order, saving its items, and clearing the cart all run in one database transaction. If any step fails, the whole thing rolls back, so there's never an order without items or a cart that vanishes for nothing.",
        "Queries that don't trust input. Every query that takes user input goes through a PDO prepared statement.",
        "Role checks without a framework. Each admin page checks the role stored in the session before showing anything.",
        "What I'd change. The sign-up form still lets people pick their role, and image uploads don't check file types yet. If I rebuilt it, admin accounts would only be created on the server side and every file would be checked before it's saved.",
      ],
      id: [
        "Checkout yang tidak setengah jadi. Membuat pesanan, menyimpan item, dan mengosongkan keranjang dijalankan dalam satu transaksi database. Kalau satu langkah gagal, semuanya dibatalkan, jadi tidak ada pesanan tanpa item atau keranjang yang hilang.",
        "Query yang aman dari SQL injection. Semua query yang menerima input pengguna memakai prepared statement PDO.",
        "Membatasi halaman per peran tanpa framework. Setiap halaman admin memeriksa peran di sesi sebelum menampilkan isinya.",
        "Yang akan saya ubah. Role masih bisa dipilih di form registrasi, dan upload gambar belum memeriksa tipe file. Kalau dibangun ulang, akun admin hanya dibuat dari sisi server dan setiap file dicek tipenya sebelum disimpan.",
      ],
    },
    featured: false,
  },
  {
    slug: "dealer-api",
    type: "api",
    title: "Dealer Otomotif API",
    contextBadges: {
      en: ["Internship Assignment", "Sandbox"],
      id: ["Tugas Magang", "Sandbox"],
    },
    description: {
      en: "A REST API for a car dealership, built in Go (Echo) with PostgreSQL as a practice assignment from a staff member during my internship. It focused on two things: pulling data from a public API, and wiring up payments through Midtrans in sandbox mode. Customers can browse cars, save favorites, and buy; admins manage stock and pull reports.",
      id: "REST API untuk sistem dealer kendaraan, dibuat dengan Go (Echo) dan PostgreSQL sebagai tugas latihan dari karyawan selama saya magang. Fokusnya dua hal: mengambil data dari API publik, dan mengintegrasikan pembayaran lewat Midtrans dalam mode sandbox. Customer bisa melihat kendaraan, menyimpan favorit, dan membeli; admin mengelola stok dan menarik laporan.",
    },
    year: 2026,
    tags: ["Go", "Echo", "PostgreSQL", "JWT", "Midtrans (Sandbox)", "Swagger"],
    repoUrl: "https://github.com/CessaChristian/dealer-golang-api.git",
    coverImage: "",
    screenshots: [],
    endpoints: [
      "GET    /dealer/customer/vehicles",
      "POST   /dealer/customer/transactions",
      "POST   /dealer/login",
      "GET    /dealer/admin/reports/low-stock/csv",
      "PATCH  /dealer/admin/vehicles/:id",
    ],
    whatIBuilt: {
      en: [
        "JWT authentication with two roles (customer and admin), with endpoints split into public, customer, and admin",
        "Midtrans payment creation (sandbox) and a callback endpoint that updates payment status",
        "Vehicle import: an admin enters a make and model, and the specs are pulled from a public API through RapidAPI",
        "A favorites list for customers",
        "Low-stock and most-favorited reports, as JSON or CSV",
        "API docs with Swagger UI",
      ],
      id: [
        "Autentikasi JWT dengan dua peran (customer dan admin); endpoint dibagi menjadi publik, customer, dan admin",
        "Pembuatan transaksi pembayaran Midtrans (sandbox) dan endpoint callback untuk memperbarui status pembayaran",
        "Import kendaraan: admin cukup memasukkan merek dan model, lalu spesifikasinya diambil dari API publik lewat RapidAPI",
        "Daftar favorit kendaraan untuk customer",
        "Laporan stok menipis dan kendaraan terfavorit, dalam format JSON atau CSV",
        "Dokumentasi API dengan Swagger UI",
      ],
    },
    challenges: {
      en: [
        "Payment callbacks that show up more than once. Midtrans can send the same notification several times. Each callback has its signature checked, every change runs in one database transaction, callbacks for orders that are already final get ignored, and stock only drops once, when payment settles. What I haven't handled yet is two callbacks arriving at the exact same moment, since the row isn't locked (SELECT ... FOR UPDATE). That's the next thing I'd add.",
        "Locking endpoints down by role. I wrote the role middleware myself in Echo, so each group of endpoints just names the role that's allowed in.",
        "Outside data without duplicates. On import, makes and types are reused if they already exist, so the database doesn't fill up with copies.",
      ],
      id: [
        "Callback pembayaran yang bisa datang berkali-kali. Midtrans bisa mengirim notifikasi yang sama lebih dari sekali. Setiap callback diverifikasi signature-nya, semua perubahan dijalankan dalam satu transaksi database, callback untuk transaksi yang sudah final diabaikan, dan stok hanya berkurang sekali saat pembayaran lunas. Yang belum saya tangani: dua callback yang datang di saat bersamaan, karena barisnya belum dikunci (SELECT ... FOR UPDATE). Itu yang akan saya tambahkan berikutnya.",
        "Membatasi akses per peran. Middleware role saya tulis sendiri di Echo, jadi setiap grup endpoint cukup menyebut peran yang boleh mengaksesnya.",
        "Data dari API luar tanpa duplikat. Saat import, merek dan tipe kendaraan dipakai ulang kalau sudah ada di database, jadi tidak muncul data ganda.",
      ],
    },
    featured: false,
  },
];

export default projects;
