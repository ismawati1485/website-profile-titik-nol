import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import { siteConfig } from "@/config/site";
import { formatTierRange, services } from "@/config/pricing";
import { processSteps } from "@/data/content";
import { projects, type Project } from "@/data/projects";
import { Reveal } from "@/components/site/reveal";
import { Estimator } from "@/components/site/estimator";
import { FaqSection } from "@/components/site/faq-section";
import { ContactForm } from "@/components/site/contact-form";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${siteConfig.name} | ${siteConfig.tagline}`,
      },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: `${siteConfig.name} | ${siteConfig.tagline}` },
      { property: "og:description", content: siteConfig.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function SectionHeading({
  overline,
  title,
  description,
}: {
  overline: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="overline text-muted-foreground">{overline}</p>
      <h2 className="mt-3 text-3xl font-semibold uppercase leading-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function scrollToHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  const el = document.getElementById(hash);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/**
 * Ornamen geometris drafting origin/titik nol.
 * Minimalis, editorial, proporsional, dan tidak mendominasi.
 */
function HeroDraftingOrnament() {
  return (
    <div
      className="relative hidden h-full w-full max-w-[520px] select-none items-center justify-end overflow-visible lg:flex"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 540 500"
        className="h-[480px] w-full overflow-visible"
        fill="none"
      >
        <defs>
          <linearGradient id="zero-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#111111" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#111111" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Siluet halus angka nol (0) geometris di sisi kanan */}
        <path
          d="M 400 60
             C 485 60 530 120 530 250
             C 530 380 485 440 400 440
             C 315 440 270 380 270 250
             C 270 120 315 60 400 60 Z
             M 400 120
             C 355 120 330 170 330 250
             C 330 330 355 380 400 380
             C 445 380 470 330 470 250
             C 470 170 445 120 400 120 Z"
          fill="url(#zero-grad)"
        />

        {/* Lingkaran panduan tipis (arc drafting) */}
        <circle
          cx="220"
          cy="250"
          r="190"
          stroke="#111111"
          strokeWidth="0.8"
          className="opacity-20"
        />

        {/* Garis sumbu horizontal */}
        <line
          x1="30"
          y1="250"
          x2="380"
          y2="250"
          stroke="#111111"
          strokeWidth="0.8"
          className="opacity-25"
        />

        {/* Garis sumbu vertikal */}
        <line
          x1="220"
          y1="50"
          x2="220"
          y2="450"
          stroke="#111111"
          strokeWidth="0.8"
          className="opacity-25"
        />

        {/* Titik Nol (origin point 0,0) */}
        <circle cx="220" cy="250" r="5" fill="#111111" />

        {/* Simbol '+' di kiri atas */}
        <line
          x1="90"
          y1="140"
          x2="106"
          y2="140"
          stroke="#111111"
          strokeWidth="1"
          className="opacity-35"
        />
        <line
          x1="98"
          y1="132"
          x2="98"
          y2="148"
          stroke="#111111"
          strokeWidth="1"
          className="opacity-35"
        />

        {/* Grid titik 3x3 di kiri bawah */}
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <circle
              key={`dot-${r}-${c}`}
              cx={86 + c * 10}
              cy={320 + r * 10}
              r="1.2"
              fill="#111111"
              className="opacity-35"
            />
          ))
        )}
      </svg>
    </div>
  );
}

/**
 * Visual Mockup Khusus per Jenis Proyek TITIK NOL.
 * Menggunakan visual yang tersedia atau fallback arsitektural intentional
 * yang merefleksikan karakter tiap domain.
 */
function ProjectMockupVisual({ project }: { project: Project }) {
  if (project.coverImage) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
    );
  }

  // 1. Landing Page
  if (project.slug === "konsep-landing-page-produk") {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
        <img
          src="/Titik Nol Landing Page.png"
          alt={project.title}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/30 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // 2. Company Profile
  if (project.slug === "konsep-company-profile") {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
        <img
          src="/Titik Nol Monochrome Brand Guideline Board-1.png"
          alt={project.title}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/30 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // 3. Product Catalog
  if (project.slug === "konsep-katalog-produk") {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
        <img
          src="/Titik Nol Monochrome Digital Studio Moodboard-2.png"
          alt={project.title}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/30 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // 4. Event Website
  if (project.slug === "konsep-event-website") {
    return (
      <div className="relative aspect-[16/10] w-full bg-[#111111] p-5 sm:p-6 text-white flex flex-col justify-between overflow-hidden select-none">
        <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute right-12 bottom-12 h-24 w-24 rounded-full border border-white/5 pointer-events-none" />

        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-white" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase">
              TIKET & AGENDA SEMINAR
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-white tracking-widest">
            14.11.2026
          </span>
        </div>

        <div className="my-auto py-2">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">
            SESI UTAMA
          </div>
          <p className="text-base sm:text-lg font-black uppercase tracking-tight text-white leading-snug">
            Membangun Fondasi Digital dari Titik Nol
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-2 text-[10px] font-mono text-white/60">
            <div>
              <span className="text-white/30 block text-[8px]">WAKTU</span>
              09:00 – 16:30 WIB
            </div>
            <div>
              <span className="text-white/30 block text-[8px]">AKSES</span>
              REGISTRASI DARING
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-1 h-4 opacity-50">
            <span className="w-1 h-full bg-white" />
            <span className="w-0.5 h-full bg-white" />
            <span className="w-2 h-full bg-white" />
            <span className="w-0.5 h-full bg-white" />
            <span className="w-1.5 h-full bg-white" />
            <span className="w-0.5 h-full bg-white" />
            <span className="w-2 h-full bg-white" />
            <span className="w-1 h-full bg-white" />
          </div>
          <span className="text-[9px] font-mono tracking-widest uppercase bg-white text-[#111111] px-2 py-0.5 font-bold">
            SLOT TERBUKA
          </span>
        </div>
      </div>
    );
  }

  // 5. Dashboard
  if (project.slug === "konsep-dashboard-penjualan") {
    return (
      <div className="relative aspect-[16/10] w-full bg-[#111111] p-5 sm:p-6 text-white flex flex-col justify-between overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-white" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase">
              MONITORING TRANSAKSI
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/80 font-bold uppercase tracking-wider">
            +18.4% BULANAN
          </span>
        </div>

        <div className="my-auto py-2">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                TOTAL OMZET
              </div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                Rp 148.500.000
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                ORDER
              </div>
              <div className="text-sm font-mono font-bold text-white mt-0.5">
                1.420 TRS
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-end gap-2 h-14 border-b border-white/10 pb-1">
            {[40, 65, 50, 85, 70, 95, 82].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div
                  className="w-full bg-white/25 transition-all duration-300 group-hover:bg-white"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[8px] font-mono text-white/40">
                  {["S", "S", "R", "K", "J", "S", "M"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-white/50">
          <span>SINKRONISASI OTOMATIS</span>
          <span className="text-white/80">LATENSI: 24MS</span>
        </div>
      </div>
    );
  }

  // 6. Custom Website / System (konsep-sistem-booking)
  return (
    <div className="relative aspect-[16/10] w-full bg-[#111111] p-5 sm:p-6 text-white flex flex-col justify-between overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-white" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-white/70 uppercase">
            SISTEM BOOKING & JADWAL
          </span>
        </div>
        <span className="font-mono text-xs font-bold text-white tracking-widest">
          NOV 2026
        </span>
      </div>

      <div className="my-auto py-2">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2">
          PILIH SLOT KETERSEDIAAN
        </div>
        <div className="grid grid-cols-4 gap-2 text-center font-mono">
          <div className="border border-white/15 p-2 bg-white/5">
            <div className="text-[8px] text-white/40">SEN 16</div>
            <div className="text-[10px] text-white/40 line-through">PENUH</div>
          </div>
          <div className="border border-white/15 p-2 bg-white/5">
            <div className="text-[8px] text-white/40">SEL 17</div>
            <div className="text-[10px] text-white/40 line-through">PENUH</div>
          </div>
          <div className="border border-white bg-white text-[#111111] p-2 font-bold">
            <div className="text-[8px] text-[#111111]/70">RAB 18</div>
            <div className="text-[10px]">AKTIF</div>
          </div>
          <div className="border border-white/15 p-2 bg-white/5">
            <div className="text-[8px] text-white/40">KAM 19</div>
            <div className="text-[10px] text-white/80">3 SLOT</div>
          </div>
        </div>

        <div className="mt-3 flex gap-2 font-mono text-[9px]">
          <span className="border border-white/20 px-2 py-0.5 text-white/60">
            09:30
          </span>
          <span className="border border-white bg-white text-[#111111] font-bold px-2 py-0.5">
            13:00 (DIPILIH)
          </span>
          <span className="border border-white/20 px-2 py-0.5 text-white/60">
            15:30
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-white/50">
        <span>SISTEM RESERVASI REAL-TIME</span>
        <span className="text-white/80 font-bold">KONFIRMASI INSTAN</span>
      </div>
    </div>
  );
}

/**
 * Card Editorial Portfolio TITIK NOL.
 * Layout brutalist dengan browser frame, metadata proporsional, dan interaksi halus.
 */
function EditorialProjectCard({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: project.slug }}
      className={`group flex flex-col justify-between border border-[#111111]/15 bg-[#F9F9F7] transition-all duration-200 hover:border-[#111111] hover:bg-white hover:shadow-xl ${className}`}
    >
      <div>
        {/* Architectural Browser / Viewport Header */}
        <div className="flex items-center justify-between border-b border-[#111111]/15 bg-[#F4F4F0] px-4 py-2.5 transition-colors group-hover:bg-[#EFEFEA]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full border border-[#111111]/30 bg-transparent" />
            <span className="h-2 w-2 rounded-full border border-[#111111]/30 bg-transparent" />
            <span className="h-2 w-2 rounded-full border border-[#111111]/30 bg-transparent" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#737373]">
            {project.slug}.titiknol.id
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373]">
            PREVIEW
          </span>
        </div>

        {/* Visual Mockup Area */}
        <div className="overflow-hidden border-b border-[#111111]/15">
          <ProjectMockupVisual project={project} />
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-7">
          {/* Subtle Category & Status Badging */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#111111]">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#737373]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#111111]/40" />
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-4 text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111] leading-tight transition-colors group-hover:underline underline-offset-4 decoration-1">
            {project.title}
          </h3>

          {/* Summary */}
          <p className="mt-3 text-sm leading-relaxed text-[#555555] line-clamp-2">
            {project.summary}
          </p>
        </div>
      </div>

      {/* Footer Details: Tech tags & Action link */}
      <div className="border-t border-[#111111]/10 bg-white/50 px-6 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="border border-[#111111]/15 bg-white px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#555555]"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] transition-transform duration-200 group-hover:translate-x-1">
          <span>LIHAT DETAIL</span>
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

/**
 * Aksen ornamen geometris untuk masing-masing tahap Cara Kerja TITIK NOL.
 * Mengikuti narasi: Origin (Titik Awal) -> Vektor (Arah/Estimasi) -> Iterasi (Produksi) -> Terminal (Rilis).
 */
const processStepAccents = [
  {
    code: "ORIGIN",
    sub: "ORIENTASI",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="#111111" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="8" cy="8" r="2.5" fill="#111111" />
      </svg>
    ),
  },
  {
    code: "VEKTOR",
    sub: "PERENCANAAN",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <line x1="2" y1="8" x2="14" y2="8" stroke="#111111" strokeWidth="1.2" />
        <polyline points="9 4 13.5 8 9 12" stroke="#111111" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    code: "ITERASI",
    sub: "PRODUKSI",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2.5" y="2.5" width="4" height="4" fill="#111111" />
        <rect x="9.5" y="2.5" width="4" height="4" fill="#111111" opacity="0.3" />
        <rect x="2.5" y="9.5" width="4" height="4" fill="#111111" opacity="0.3" />
        <rect x="9.5" y="9.5" width="4" height="4" fill="#111111" />
      </svg>
    ),
  },
  {
    code: "RELEASE",
    sub: "FINALISASI",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2.5" y="2.5" width="11" height="11" stroke="#111111" strokeWidth="1.2" />
        <rect x="5.5" y="5.5" width="5" height="5" fill="#111111" />
      </svg>
    ),
  },
];

function Index() {
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (!hash) return;
    // Tunggu layout siap sebelum scroll ke target hash (mis. #kontak).
    const timer = window.setTimeout(scrollToHash, 60);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#111111]/10 bg-[#F9F9F7] text-[#111111]">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col justify-between px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            {/* Kolom Kiri: Tipografi Editorial */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#111111]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111]">
                  {siteConfig.name}
                </span>
                <span className="h-px w-20 bg-[#111111]/30 sm:w-28" aria-hidden="true" />
              </div>

              <h1 className="mt-8 text-4xl font-black uppercase tracking-tight text-[#111111] sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem] leading-[0.92]">
                <span className="block">SEMUA HAL</span>
                <span className="block text-[#737373]">BERAWAL</span>
                <span className="block">DARI NOL.</span>
              </h1>

              <div className="mt-8 max-w-xl border-l-2 border-[#111111] pl-5 sm:mt-10 sm:pl-6 py-1">
                <p className="text-base font-medium leading-snug text-[#111111] sm:text-lg lg:text-xl">
                  {siteConfig.positioning}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[#666666] sm:text-sm">
                  Kami membantu bisnis dan individu menentukan kebutuhan digital, membangun solusi yang sesuai, dan memahami proses pengerjaannya.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent hover:text-[#111111]"
                >
                  <span>LIHAT PORTFOLIO</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to="/"
                  hash="kontak"
                  className="inline-flex items-center justify-center border border-[#111111] bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] transition-all hover:bg-[#111111] hover:text-white"
                >
                  KONSULTASI PROYEK
                </Link>
              </div>
            </div>

            {/* Kolom Kanan: Ornamen Geometris Drafting Titik Nol */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <HeroDraftingOrnament />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-12 flex items-center gap-3 pt-4 sm:mt-16">
            <div className="flex h-7 w-4 shrink-0 items-center justify-center rounded-full border border-[#111111]/40 p-0.5">
              <div className="h-2 w-0.5 animate-bounce bg-[#111111]" />
            </div>
            <div className="h-px w-6 bg-[#111111]/30 sm:w-16" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#737373]">
              SCROLL UNTUK MELANJUTKAN
            </span>
          </div>
        </div>
      </section>

      {/* Pilar Fondasi */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="grid divide-y border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="pt-6 sm:pr-8">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                01 IDENTITAS
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Membangun karakter dari fondasi terdasar. Setiap elemen memiliki tujuan dan hierarki yang tegas.
              </p>
            </div>
            <div className="pt-6 sm:px-8">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                02 STRUKTUR
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Tata letak modular, navigasi intuitif, dan performa tinggi tanpa redundansi visual.
              </p>
            </div>
            <div className="pt-6 sm:pl-8">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                03 TRANSPARANSI
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Lingkup kerja, estimasi indikatif, dan timeline disepakati secara terbuka sejak awal pengerjaan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section
        id="layanan"
        className="relative border-b border-[#111111]/10 bg-[#F9F9F7] text-[#111111] py-20 sm:py-28 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Bagian Pembuka */}
          <Reveal>
            <div className="flex flex-col gap-6 pb-10 sm:pb-14 border-b border-[#111111]/15 md:flex-row md:items-end md:justify-between px-2 sm:px-4 lg:px-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#111111]" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111]">
                    [01] LAYANAN
                  </span>
                  <span className="h-px w-12 bg-[#111111]/30 sm:w-20" aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-2xl font-black uppercase tracking-tight text-[#111111] sm:text-3xl lg:text-4xl leading-tight">
                  Layanan yang kami siapkan untuk membangun kebutuhan digital dari titik awal.
                </h2>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#737373]">
                <span className="h-1.5 w-1.5 bg-[#111111]" aria-hidden="true" />
                <span>06 PILIHAN SOLUSI</span>
              </div>
            </div>
          </Reveal>

          {/* Daftar Layanan Vertikal Editorial */}
          <div>
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 50}>
                <div className="group relative block w-full border-b border-[#111111]/15 px-2 sm:px-4 lg:px-6 py-7 sm:py-9 lg:py-10 transition-colors duration-150 ease-out hover:bg-[#111111] cursor-default">
                  {/* Mobile & Tablet Layout (< lg) */}
                  <div className="flex flex-col gap-2.5 sm:gap-3 lg:hidden">
                    <div className="flex items-baseline gap-3.5 sm:gap-4">
                      <span className="font-mono text-xl sm:text-2xl font-black tracking-tight text-[#111111]/35 transition-colors duration-150 group-hover:text-white/60 shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111] transition-colors duration-150 group-hover:text-white">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-[#555555] transition-colors duration-150 group-hover:text-[#E0E0E0] pl-8 sm:pl-10">
                      {service.summary}
                    </p>
                  </div>

                  {/* Desktop Layout (>= lg) */}
                  <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
                    <div className="lg:col-span-1">
                      <span className="font-mono text-2xl xl:text-3xl font-black tracking-tight text-[#111111]/35 transition-colors duration-150 group-hover:text-white/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="lg:col-span-5">
                      <h3 className="text-2xl xl:text-3xl font-black uppercase tracking-tight text-[#111111] transition-colors duration-150 group-hover:text-white">
                        {service.name}
                      </h3>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-sm xl:text-base leading-relaxed text-[#555555] transition-colors duration-150 group-hover:text-[#E0E0E0]">
                        {service.summary}
                      </p>
                    </div>
                    <div className="lg:col-span-1 flex justify-end">
                      <span
                        className="text-2xl font-light text-[#111111]/25 transition-all duration-150 group-hover:translate-x-1.5 group-hover:text-white"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proyek unggulan */}
      <section
        id="proyek"
        className="relative border-b border-[#111111]/10 bg-white text-[#111111] py-20 sm:py-28 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header Portfolio */}
          <Reveal>
            <div className="flex flex-col gap-6 pb-10 sm:pb-14 border-b border-[#111111]/15 md:flex-row md:items-end md:justify-between px-2 sm:px-4 lg:px-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#111111]" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111]">
                    [02] PORTFOLIO
                  </span>
                  <span className="h-px w-12 bg-[#111111]/30 sm:w-20" aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-2xl font-black uppercase tracking-tight text-[#111111] sm:text-3xl lg:text-4xl leading-tight">
                  Eksplorasi konsep dan sistem digital yang kami bangun.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-base">
                  Setiap karya dirancang dengan fondasi terarah, identitas tegas, dan arsitektur visual yang fungsional.
                </p>
              </div>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 border border-[#111111] bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] transition-all hover:bg-[#111111] hover:text-white shrink-0"
              >
                <span>SEMUA PROYEK</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          {/* Asymmetric Editorial Portfolio Grid */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Row 1: 7 cols (Landing Page) + 5 cols (Event Website) */}
            {projects[0] && (
              <Reveal key={projects[0].slug} delay={0} className="lg:col-span-7">
                <EditorialProjectCard project={projects[0]} className="h-full" />
              </Reveal>
            )}
            {projects[1] && (
              <Reveal key={projects[1].slug} delay={80} className="lg:col-span-5">
                <EditorialProjectCard project={projects[1]} className="h-full" />
              </Reveal>
            )}

            {/* Row 2: 5 cols (Company Profile) + 7 cols (Dashboard) */}
            {projects[2] && (
              <Reveal key={projects[2].slug} delay={160} className="lg:col-span-5">
                <EditorialProjectCard project={projects[2]} className="h-full" />
              </Reveal>
            )}
            {projects[3] && (
              <Reveal key={projects[3].slug} delay={240} className="lg:col-span-7">
                <EditorialProjectCard project={projects[3]} className="h-full" />
              </Reveal>
            )}

            {/* Row 3: 7 cols (Product Catalog) + 5 cols (Booking System) */}
            {projects[4] && (
              <Reveal key={projects[4].slug} delay={320} className="lg:col-span-7">
                <EditorialProjectCard project={projects[4]} className="h-full" />
              </Reveal>
            )}
            {projects[5] && (
              <Reveal key={projects[5].slug} delay={400} className="lg:col-span-5">
                <EditorialProjectCard project={projects[5]} className="h-full" />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Cara kerja */}
      <section
        id="cara-kerja"
        className="relative border-b border-[#111111]/10 bg-[#F9F9F7] text-[#111111] py-20 sm:py-28 lg:py-32 overflow-hidden"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header Cara Kerja */}
          <Reveal>
            <div className="flex flex-col gap-6 pb-10 sm:pb-14 border-b border-[#111111]/15 md:flex-row md:items-end md:justify-between px-2 sm:px-4 lg:px-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#111111]" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111]">
                    [03] CARA KERJA
                  </span>
                  <span className="h-px w-12 bg-[#111111]/30 sm:w-20" aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-2xl font-black uppercase tracking-tight text-[#111111] sm:text-3xl lg:text-4xl leading-tight">
                  Proses yang transparan
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-base">
                  Alur kerja terstruktur dari perumusan ide awal hingga serah terima proyek, dijalankan bertahap tanpa langkah tersembunyi.
                </p>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#737373]">
                <span className="h-1.5 w-1.5 bg-[#111111]" aria-hidden="true" />
                <span>SEKUENS 01–04</span>
              </div>
            </div>
          </Reveal>

          {/* Desktop Layout: Editorial Process Sequence (>= lg) */}
          <div className="hidden lg:block mt-12 sm:mt-16">
            {/* Horizontal Continuous Rail / Axis */}
            <div className="relative border-y border-[#111111]/15 bg-[#F9F9F7]">
              <div className="grid grid-cols-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step.step}
                    className={`relative flex items-center justify-between px-6 py-3.5 ${
                      index < processSteps.length - 1 ? "border-r border-[#111111]/15" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {processStepAccents[index]?.icon}
                      <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#111111] uppercase">
                        TAHAP {step.step}
                      </span>
                    </div>
                    {index < processSteps.length - 1 ? (
                      <div className="flex items-center gap-1.5 text-[#111111]/40">
                        <span className="h-px w-4 bg-[#111111]/30" />
                        <span className="font-mono text-xs" aria-hidden="true">→</span>
                      </div>
                    ) : (
                      <span className="h-1.5 w-1.5 bg-[#111111]" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Kolom Editorial Bersebelahan dengan Garis Vertikal */}
            <div className="grid grid-cols-4 border-b border-[#111111]/15">
              {processSteps.map((step, index) => (
                <Reveal key={step.step} delay={index * 80}>
                  <div
                    className={`group relative flex h-full flex-col justify-between px-6 py-10 xl:px-8 xl:py-12 transition-colors duration-200 hover:bg-white/60 ${
                      index < processSteps.length - 1 ? "border-r border-[#111111]/15" : ""
                    }`}
                  >
                    {/* Aksen sudut geometris crosshair */}
                    <span
                      className="pointer-events-none absolute -top-2.5 -right-2.5 font-mono text-xs font-light text-[#111111]/30 select-none"
                      aria-hidden="true"
                    >
                      +
                    </span>

                    <div>
                      {/* Meta atas & indikator sequence */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#737373]">
                          SEKUENS // {processStepAccents[index]?.code}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#111111]/40">
                          [{step.step}/04]
                        </span>
                      </div>

                      {/* Garis vertikal penghubung ke display number */}
                      <div className="mt-5 h-7 w-px bg-[#111111]/25" />

                      {/* Nomor dibuat cukup besar sebagai elemen visual */}
                      <div className="mt-2 flex items-baseline justify-between">
                        <span className="font-mono text-7xl xl:text-8xl font-black tracking-tighter text-[#111111] leading-none select-none transition-transform duration-300 group-hover:-translate-y-1">
                          {step.step}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#111111]/35 font-bold border border-[#111111]/15 px-2 py-0.5">
                          {processStepAccents[index]?.sub}
                        </span>
                      </div>

                      {/* Garis penghubung horizontal dengan ornamen aksen */}
                      <div className="mt-6 flex items-center gap-2">
                        <div className="h-px w-8 bg-[#111111]" />
                        <div className="h-1.5 w-1.5 bg-[#111111]" />
                        <div className="h-px flex-1 bg-[#111111]/15" />
                      </div>

                      {/* Nama Tahap */}
                      <h3 className="mt-6 text-xl xl:text-2xl font-black uppercase tracking-tight text-[#111111] leading-snug">
                        {step.title}
                      </h3>

                      {/* Deskripsi Singkat */}
                      <p className="mt-3 text-sm leading-relaxed text-[#555555]">
                        {step.description}
                      </p>
                    </div>

                    {/* Footer editorial per tahap */}
                    <div className="mt-12 flex items-center justify-between border-t border-[#111111]/10 pt-4 text-xs font-mono">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#737373]">
                        {index === 0 && "ORIENTASI AWAL"}
                        {index === 1 && "SPESIFIKASI & BIAYA"}
                        {index === 2 && "PRODUKSI BERTAHAP"}
                        {index === 3 && "VERIFIKASI & GO-LIVE"}
                      </span>
                      <span className="text-[10px] font-bold text-[#111111]/50">
                        {index < processSteps.length - 1 ? `LANJUT → 0${index + 2}` : "SELESAI ■"}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mobile & Tablet Layout: Rapi 1 Kolom Vertikal (< lg) */}
          <div className="relative mt-12 block lg:hidden">
            {/* Garis vertikal penghubung sepanjang urutan tahap */}
            <div
              className="absolute left-[19px] sm:left-[23px] top-6 bottom-10 w-px bg-[#111111]/25"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-10 sm:gap-12">
              {processSteps.map((step, index) => (
                <Reveal key={step.step} delay={index * 70}>
                  <div className="relative flex gap-5 sm:gap-6 pl-1 sm:pl-2">
                    {/* Node geometris pada sumbu garis vertikal */}
                    <div className="relative z-10 flex flex-col items-center shrink-0">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-[#111111] bg-[#F9F9F7] text-[#111111]">
                        {processStepAccents[index]?.icon}
                      </div>
                      {/* Garis horizontal spur ke arah konten */}
                      <div className="mt-2 h-px w-3.5 bg-[#111111]/30" />
                    </div>

                    {/* Konten Tahap */}
                    <div className="flex-1 pb-8 border-b border-[#111111]/15 last:border-b-0 last:pb-0">
                      {/* Header bar tahap */}
                      <div className="flex items-center justify-between border-b border-[#111111]/10 pb-2">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#737373]">
                          TAHAP {step.step}
                        </span>
                        <span className="font-mono text-xs font-semibold text-[#111111]/40">
                          [{step.step}/04]
                        </span>
                      </div>

                      {/* Nomor dibuat cukup besar sebagai elemen visual */}
                      <div className="mt-3 flex items-baseline justify-between">
                        <span className="font-mono text-6xl sm:text-7xl font-black tracking-tighter text-[#111111] leading-none select-none">
                          {step.step}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#111111]/40 font-bold border border-[#111111]/15 px-2 py-0.5">
                          {processStepAccents[index]?.sub}
                        </span>
                      </div>

                      {/* Garis pembatas horizontal aksen */}
                      <div className="mt-4 flex items-center gap-2">
                        <div className="h-px w-6 bg-[#111111]" />
                        <div className="h-1 w-1 bg-[#111111]" />
                        <div className="h-px flex-1 bg-[#111111]/15" />
                      </div>

                      {/* Nama Tahap */}
                      <h3 className="mt-4 text-lg sm:text-xl font-black uppercase tracking-tight text-[#111111] leading-snug">
                        {step.title}
                      </h3>

                      {/* Deskripsi Singkat */}
                      <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                        {step.description}
                      </p>

                      {/* Status / arah alur */}
                      <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-[#737373] uppercase tracking-[0.15em]">
                        <span>SEKUENS // {processStepAccents[index]?.code}</span>
                        {index < processSteps.length - 1 ? (
                          <span className="text-[#111111]/50">→ MENUJU 0{index + 2}</span>
                        ) : (
                          <span className="font-bold text-[#111111]">■ RILIS FINAL</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Paket harga */}
      <section
        id="harga"
        className="relative border-b border-[#111111]/10 bg-white text-[#111111] py-20 sm:py-28 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header Section Harga */}
          <Reveal>
            <div className="flex flex-col gap-6 pb-10 sm:pb-14 border-b border-[#111111]/15 md:flex-row md:items-end md:justify-between px-2 sm:px-4 lg:px-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#111111]" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111]">
                    [04] PAKET HARGA
                  </span>
                  <span className="h-px w-12 bg-[#111111]/30 sm:w-20" aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-2xl font-black uppercase tracking-tight text-[#111111] sm:text-3xl lg:text-4xl leading-tight">
                  Kisaran biaya per layanan
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-base">
                  Angka di bawah bersifat sementara dan indikatif — bukan penawaran final. Nilai akhir ditetapkan setelah lingkup pekerjaan disepakati.
                </p>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#737373]">
                <span className="h-1.5 w-1.5 bg-[#111111]" aria-hidden="true" />
                <span>06 PILIHAN INVESTASI</span>
              </div>
            </div>
          </Reveal>

          {/* Editorial Pricing Table (Desktop >= lg) */}
          <div className="mt-12 sm:mt-16 hidden lg:block">
            {/* Table Header Row */}
            <div className="grid grid-cols-12 items-center gap-6 border-y border-[#111111]/15 bg-[#F9F9F7] px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#737373]">
              <div className="col-span-1">NO.</div>
              <div className="col-span-6">LAYANAN & LINGKUP PEKERJAAN</div>
              <div className="col-span-3">KISARAN HARGA (INDIKATIF)</div>
              <div className="col-span-2 text-right">AKSI</div>
            </div>

            {/* Table Body Rows */}
            <div className="divide-y divide-[#111111]/15 border-b border-[#111111]/15">
              {services.map((service, index) => {
                const isRecommended = Boolean(
                  (service as Record<string, unknown>).featured ||
                  (service as Record<string, unknown>).recommended ||
                  (service as Record<string, unknown>).isPopular
                );

                return (
                  <Reveal key={service.slug} delay={index * 45}>
                    <div className="group relative grid grid-cols-12 items-center gap-6 px-6 py-8 xl:py-10 transition-colors duration-150 hover:bg-[#F9F9F7]/80">
                      {/* Col 1: Nomor Layanan */}
                      <div className="col-span-1">
                        <span className="font-mono text-base xl:text-lg font-black tracking-tight text-[#111111]/30 transition-colors duration-150 group-hover:text-[#111111]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Col 2: Nama Layanan (Fokus Utama) + Deskripsi */}
                      <div className="col-span-6 pr-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl xl:text-3xl font-black uppercase tracking-tight text-[#111111] transition-colors duration-150">
                            {service.name}
                          </h3>
                          {isRecommended && (
                            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] bg-[#111111] text-white px-2 py-0.5">
                              REKOMENDASI
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#555555] max-w-xl">
                          {service.summary}
                        </p>
                      </div>

                      {/* Col 3: Range Harga (Mudah Dipindai) */}
                      <div className="col-span-3">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] block">
                          {service.tiers[0].max ? "RENTANG ESTIMASI" : "BASIS AWAL"}
                        </span>
                        <span className="mt-1 font-mono text-xl xl:text-2xl font-black tracking-tight text-[#111111] block whitespace-nowrap">
                          {formatTierRange(service.tiers[0])}
                        </span>
                      </div>

                      {/* Col 4: CTA (Tersedia tapi tidak terlalu dominan) */}
                      <div className="col-span-2 flex justify-end">
                        <a
                          href="#estimasi"
                          className="inline-flex items-center gap-1.5 border border-[#111111]/25 bg-transparent px-4 py-2.5 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#111111] transition-all duration-150 hover:border-[#111111] hover:bg-[#111111] hover:text-white"
                        >
                          <span>SIMULASI</span>
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Editorial Pricing List (Mobile & Tablet < lg) */}
          <div className="mt-10 block lg:hidden">
            <div className="divide-y divide-[#111111]/15 border-y border-[#111111]/15">
              {services.map((service, index) => {
                const isRecommended = Boolean(
                  (service as Record<string, unknown>).featured ||
                  (service as Record<string, unknown>).recommended ||
                  (service as Record<string, unknown>).isPopular
                );

                return (
                  <Reveal key={service.slug} delay={index * 45}>
                    <div className="py-7 sm:py-8 px-2 sm:px-4">
                      {/* Top metadata */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#111111]/35">
                          LAYANAN // {String(index + 1).padStart(2, "0")}
                        </span>
                        {isRecommended && (
                          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] bg-[#111111] text-white px-2 py-0.5">
                            REKOMENDASI
                          </span>
                        )}
                      </div>

                      {/* Nama Layanan (Fokus Utama) */}
                      <h3 className="mt-2 text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111]">
                        {service.name}
                      </h3>

                      {/* Ringkasan */}
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#555555]">
                        {service.summary}
                      </p>

                      {/* Divider tipis */}
                      <div className="my-4 h-px w-8 bg-[#111111]/25" />

                      {/* Harga & CTA Row */}
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] block">
                            {service.tiers[0].max ? "RENTANG ESTIMASI" : "BASIS AWAL"}
                          </span>
                          <span className="mt-0.5 font-mono text-lg sm:text-xl font-black tracking-tight text-[#111111] block">
                            {formatTierRange(service.tiers[0])}
                          </span>
                        </div>

                        <a
                          href="#estimasi"
                          className="inline-flex items-center gap-1.5 border border-[#111111]/25 bg-transparent px-3.5 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#111111] transition-all hover:border-[#111111] hover:bg-[#111111] hover:text-white"
                        >
                          <span>SIMULASI</span>
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Catatan Kaki Editorial */}
          <div className="mt-10 sm:mt-12 flex flex-col gap-4 border-t border-[#111111]/15 pt-6 text-xs text-[#737373] sm:flex-row sm:items-center sm:justify-between px-2 sm:px-4 lg:px-6">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="h-1.5 w-1.5 bg-[#111111]" aria-hidden="true" />
              <span>Seluruh angka bersifat indikatif · Biaya final ditetapkan sesuai spesifikasi detail.</span>
            </div>
            <a
              href="#estimasi"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111] hover:underline underline-offset-4"
            >
              <span>Gunakan Kalkulator Estimasi Lengkap</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* Kalkulator estimasi */}
      <section
        id="estimasi"
        className="relative border-b border-[#111111]/10 bg-[#F9F9F7] text-[#111111] py-20 sm:py-28 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header Kalkulator Estimasi */}
          <Reveal>
            <div className="flex flex-col gap-6 pb-10 sm:pb-14 border-b border-[#111111]/15 md:flex-row md:items-end md:justify-between px-2 sm:px-4 lg:px-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#111111]" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111]">
                    [05] ESTIMATOR
                  </span>
                  <span className="h-px w-12 bg-[#111111]/30 sm:w-20" aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-2xl font-black uppercase tracking-tight text-[#111111] sm:text-3xl lg:text-4xl leading-tight">
                  Perkiraan biaya dalam beberapa klik
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-base">
                  Pilih jenis layanan dan tingkat kompleksitas untuk melihat estimasi indikatifnya secara transparan.
                </p>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#737373]">
                <span className="h-1.5 w-1.5 bg-[#111111]" aria-hidden="true" />
                <span>SIMULASI INTERAKTIF</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-12 sm:mt-16">
            <Estimator />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="relative border-b border-[#111111]/10 bg-white text-[#111111] py-20 sm:py-28 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header FAQ */}
          <Reveal>
            <div className="flex flex-col gap-6 pb-10 sm:pb-14 border-b border-[#111111]/15 md:flex-row md:items-end md:justify-between px-2 sm:px-4 lg:px-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#111111]" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111]">
                    [06] FAQ
                  </span>
                  <span className="h-px w-12 bg-[#111111]/30 sm:w-20" aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-2xl font-black uppercase tracking-tight text-[#111111] sm:text-3xl lg:text-4xl leading-tight">
                  Pertanyaan yang sering diajukan
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-base">
                  Jawaban transparan seputar estimasi biaya, alur kerja, durasi pengerjaan, dan dukungan teknis.
                </p>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#737373]">
                <span className="h-1.5 w-1.5 bg-[#111111]" aria-hidden="true" />
                <span>05 JAWABAN PENTING</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-12 sm:mt-16">
            <FaqSection />
          </Reveal>
        </div>
      </section>

      {/* Kontak */}
      <section
        id="kontak"
        className="relative border-b border-[#111111]/10 bg-[#F9F9F7] text-[#111111] py-20 sm:py-28 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header Kontak */}
          <Reveal>
            <div className="flex flex-col gap-6 pb-10 sm:pb-14 border-b border-[#111111]/15 md:flex-row md:items-end md:justify-between px-2 sm:px-4 lg:px-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#111111]" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#111111]">
                    [07] KONTAK
                  </span>
                  <span className="h-px w-12 bg-[#111111]/30 sm:w-20" aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-2xl font-black uppercase tracking-tight text-[#111111] sm:text-3xl lg:text-4xl leading-tight">
                  Mulai dari nol, bersama kami
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-base">
                  Ceritakan kebutuhan digital Anda. Pesan akan tersusun rapi untuk Anda tinjau sebelum dikirimkan via WhatsApp.
                </p>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#737373]">
                <span className="h-1.5 w-1.5 bg-[#111111]" aria-hidden="true" />
                <span>KONSULTASI AWAL</span>
              </div>
            </div>
          </Reveal>

          {/* Layout Editorial 2 Kolom Kontak */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Kolom Kiri: Headline Besar + Copy Singkat */}
            <div className="lg:col-span-4">
              <Reveal>
                <div className="space-y-8">
                  <h3 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase tracking-tight text-[#111111] leading-[0.95]">
                    <span className="block">BANGUN</span>
                    <span className="block text-[#737373]">FONDASI</span>
                    <span className="block">DIGITAL ANDA.</span>
                  </h3>

                  <div className="border-l-2 border-[#111111] pl-5 py-1">
                    <p className="text-sm sm:text-base font-semibold leading-snug text-[#111111]">
                      Diskusi langsung tanpa hambatan birokrasi.
                    </p>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#666666]">
                      Setiap proyek dimulai dari pemahaman mendalam atas tujuan bisnis Anda. Lengkapi formulir di samping untuk memulai.
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-[#111111]/15 pt-6 text-xs font-mono">
                    <div className="flex items-center gap-3 text-[#737373]">
                      <span className="h-1.5 w-1.5 bg-[#111111]" />
                      <span>RESPON CEPAT: &lt; 24 JAM</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#737373]">
                      <span className="h-1.5 w-1.5 bg-[#111111]" />
                      <span>KONSULTASI: TANPA BIAYA AWAL</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#737373]">
                      <span className="h-1.5 w-1.5 bg-[#111111]" />
                      <span>DATA & PRIVASI: TERJAGA AMAN</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Kolom Kanan: ContactForm */}
            <div className="lg:col-span-8">
              <Reveal delay={100}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
