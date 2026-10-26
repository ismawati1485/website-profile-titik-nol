/**
 * Konfigurasi harga TITIK NOL.
 * Semua angka harga terpusat di file ini agar mudah diubah.
 *
 * Catatan: harga bersifat sementara/indikatif, bukan penawaran final.
 */

export type PriceTier = {
  label: string;
  min: number;
  /** Kosong (undefined) berarti harga "mulai dari" min. */
  max?: number;
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  tiers: PriceTier[];
};

export const services: Service[] = [
  {
    slug: "event-website",
    name: "Event Website",
    summary:
      "Website untuk acara: informasi acara, agenda, dan pendaftaran peserta.",
    tiers: [{ label: "Estimasi", min: 300_000, max: 700_000 }],
  },
  {
    slug: "landing-page",
    name: "Landing Page",
    summary:
      "Satu halaman fokus untuk kampanye, produk, atau jasa dengan ajakan bertindak yang jelas.",
    tiers: [{ label: "Estimasi", min: 500_000, max: 1_200_000 }],
  },
  {
    slug: "company-profile",
    name: "Company Profile",
    summary:
      "Website profil perusahaan: layanan, tim, dan kontak dalam satu navigasi sederhana.",
    tiers: [{ label: "Estimasi", min: 800_000, max: 2_000_000 }],
  },
  {
    slug: "product-catalog",
    name: "Product Catalog",
    summary:
      "Katalog produk online yang rapi, mudah dijelajahi, dan mudah diperbarui.",
    tiers: [{ label: "Estimasi", min: 800_000, max: 2_000_000 }],
  },
  {
    slug: "custom-system",
    name: "Custom Website / System",
    summary:
      "Website atau sistem yang dibangun sesuai kebutuhan khusus bisnis Anda.",
    tiers: [{ label: "Mulai dari", min: 2_000_000 }],
  },
  {
    slug: "dashboard",
    name: "Dashboard",
    summary:
      "Dashboard visual untuk memantau data dan performa bisnis secara langsung.",
    tiers: [{ label: "Mulai dari", min: 2_000_000 }],
  },
];

export const complexityLevels = [
  { value: "sederhana", label: "Sederhana", factor: 0 },
  { value: "standar", label: "Standar", factor: 0.5 },
  { value: "kompleks", label: "Kompleks", factor: 1 },
] as const;

export type ComplexityLevel = (typeof complexityLevels)[number];

export function formatIDR(value: number): string {
  // Locale id-ID menghasilkan "Rp 1.200.000" (dengan spasi); rapatkan menjadi "Rp1.200.000".
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/^Rp\s+/u, "Rp");
}

/** Contoh: "Rp300.000 – Rp700.000" atau "mulai Rp2.000.000". */
export function formatTierRange(tier: PriceTier): string {
  if (tier.max === undefined) return `mulai ${formatIDR(tier.min)}`;
  return `${formatIDR(tier.min)} – ${formatIDR(tier.max)}`;
}

export type Estimate =
  | { type: "range"; label: string; value: string }
  | { type: "floor"; label: string; value: string };

/**
 * Estimasi indikatif dari rentang paket:
 * - Sederhana  -> batas bawah rentang
 * - Standar    -> titik tengah rentang
 * - Kompleks   -> batas atas rentang
 * Untuk paket "mulai dari", hasilnya selalu nilai dasar.
 */
export function estimateFor(
  service: Service,
  level: ComplexityLevel,
): Estimate {
  const tier = service.tiers[0];
  if (tier.max === undefined) {
    return { type: "floor", label: "Estimasi indikatif", value: formatIDR(tier.min) };
  }
  const raw = tier.min + (tier.max - tier.min) * level.factor;
  const rounded = Math.round(raw / 10_000) * 10_000;
  return {
    type: "range",
    label: `Estimasi indikatif · ${level.label}`,
    value: `± ${formatIDR(rounded)}`,
  };
}
