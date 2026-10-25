/**
 * Data proyek TITIK NOL.
 *
 * Aturan: jangan mengarang proyek, klien, hasil, atau teknologi yang belum
 * tersedia. Saat ini semua entri adalah konsep/internal. Tambahkan proyek
 * klien di sini begitu ada, lengkap dengan `coverImage`/`gallery`.
 *
 * `coverImage` dan `gallery` opsional: bila kosong, tampilan memakai
 * placeholder visual yang rapi dan otomatis mengikuti data proyek.
 */

export const projectCategories = [
  "Landing Page",
  "Event Website",
  "Company Profile",
  "Product Catalog",
  "Custom Website/System",
  "Dashboard",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectStatus = "Client Project" | "Concept Project" | "Internal Project";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  coverImage?: string;
  gallery?: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "konsep-landing-page-produk",
    title: "Konsep Landing Page Peluncuran Produk",
    category: "Landing Page",
    status: "Concept Project",
    featured: true,
    summary:
      "Konsep halaman peluncuran produk dengan satu pesan utama, alur bacaan yang terarah, dan ajakan bertindak yang konsisten.",
    problem:
      "Peluncuran produk butuh satu halaman yang menjelaskan nilai produk dengan cepat dan mengarahkan pengunjung ke satu tindakan, tanpa mengalihkan perhatian ke banyak halaman.",
    solution:
      "Menyusun struktur satu halaman: hero dengan pesan utama, poin manfaat, bukti singkat, dan tombol ajakan bertindak yang muncul konsisten di sepanjang halaman.",
    features: [
      "Hero dengan pesan utama",
      "Bagian manfaat produk",
      "Ajakan bertindak (CTA)",
      "FAQ singkat",
      "Formulir kontak",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "konsep-event-website",
    title: "Konsep Website Seminar & Pendaftaran",
    category: "Event Website",
    status: "Concept Project",
    featured: true,
    summary:
      "Konsep website acara yang memuat informasi seminar, agenda, dan alur pendaftaran peserta dalam satu tempat.",
    problem:
      "Panitia acara butuh satu tautan yang bisa dibagikan berisi seluruh informasi acara dan cara mendaftar, sehingga peserta tidak tercecer di beberapa kanal.",
    solution:
      "Satu website acara dengan agenda yang jelas, profil pemateri, dan formulir pendaftaran langsung di halaman yang sama.",
    features: [
      "Agenda & rundown acara",
      "Formulir pendaftaran",
      "Profil pemateri",
      "Informasi lokasi",
      "Pertanyaan umum",
    ],
    tech: ["HTML", "Tailwind CSS", "JavaScript"],
  },
  {
    slug: "konsep-company-profile",
    title: "Konsep Company Profile Perusahaan Jasa",
    category: "Company Profile",
    status: "Concept Project",
    featured: true,
    summary:
      "Konsep website profil perusahaan dengan navigasi sederhana: layanan, tim, dan kontak.",
    problem:
      "Perusahaan jasa butuh kehadiran online yang rapi untuk dipresentasikan ke calon klien, namun belum butuh fitur yang kompleks.",
    solution:
      "Website company profile dengan hierarchy jelas per layanan, profil tim, dan formulir kontak yang mudah ditemukan.",
    features: [
      "Halaman layanan",
      "Profil tim",
      "Studi kasus ringkas",
      "Formulir kontak",
      "Navigasi sederhana",
    ],
    tech: ["React", "Tailwind CSS"],
  },
  {
    slug: "konsep-dashboard-penjualan",
    title: "Konsep Dashboard Monitoring Penjualan",
    category: "Dashboard",
    status: "Concept Project",
    featured: true,
    summary:
      "Konsep dashboard untuk memantau angka penjualan, tren, dan transaksi dalam satu tampilan visual.",
    problem:
      "Tim penjualan butuh melihat performa harian tanpa mengolah data manual dari beberapa sumber berbeda.",
    solution:
      "Dashboard dengan ringkasan angka utama, grafik tren, dan tabel transaksi yang bisa difilter per periode.",
    features: [
      "Ringkasan angka utama (KPI)",
      "Grafik tren penjualan",
      "Tabel transaksi",
      "Filter periode",
    ],
    tech: ["React", "Recharts"],
  },
  {
    slug: "konsep-katalog-produk",
    title: "Konsep Katalog Produk UMKM",
    category: "Product Catalog",
    status: "Concept Project",
    summary:
      "Konsep katalog produk online yang rapi dan mudah dijelajahi calon pembeli.",
    problem:
      "UMKM butuh menampilkan daftar produk secara teratur agar pembeli bisa melihat pilihan lalu memesan langsung, tanpa membangun toko online penuh.",
    solution:
      "Katalog dengan daftar produk bergambar, filter kategori, dan tombol pemesanan langsung ke WhatsApp pemilik usaha.",
    features: [
      "Daftar produk dengan gambar",
      "Filter kategori",
      "Halaman detail produk",
      "Tombol pesan via WhatsApp",
    ],
    tech: ["React", "Tailwind CSS"],
  },
  {
    slug: "konsep-sistem-booking",
    title: "Konsep Sistem Booking Internal",
    category: "Custom Website/System",
    status: "Internal Project",
    summary:
      "Proyek internal untuk menguji pola sistem booking: formulir, kalender ketersediaan, dan konfirmasi.",
    problem:
      "Layanan berbasis jadwal butuh cara mengelola slot ketersediaan agar tidak terjadi bentrok pemesanan.",
    solution:
      "Sistem booking sederhana dengan formulir pemesanan, kalender ketersediaan, dan panel ringkasan untuk pengelola.",
    features: [
      "Formulir booking",
      "Kalender ketersediaan",
      "Konfirmasi pesanan",
      "Panel ringkasan pengelola",
    ],
    tech: ["React", "Tailwind CSS"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  "Client Project": "Client Project",
  "Concept Project": "Concept Project",
  "Internal Project": "Internal Project",
};
