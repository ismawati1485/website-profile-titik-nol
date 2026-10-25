/**
 * Konfigurasi situs TITIK NOL.
 * Semua identitas brand dan kontak terpusat di sini agar mudah diubah.
 */
export const siteConfig = {
  name: "TITIK NOL",
  tagline: "SEMUA HAL BERAWAL DARI NOL",
  positioning: "Ide yang jelas. Solusi yang tepat. Proses yang transparan.",
  description:
    "TITIK NOL — studio digital untuk layanan pembuatan website dan solusi digital. Ide yang jelas. Solusi yang tepat. Proses yang transparan.",
  contact: {
    /**
     * Nomor WhatsApp dalam format internasional tanpa tanda '+',
     * contoh: "6281234567890". Kosongkan untuk menonaktifkan fitur WhatsApp.
     */
    whatsappNumber: "",
    /** Isi untuk mengaktifkan tautan sosial; kosong = disembunyikan. */
    socials: [] as { label: string; url: string }[],
  },
} as const;

export const navItems = [
  { label: "Beranda", to: "/" as const },
  { label: "Portfolio", to: "/portfolio" as const },
  { label: "Kontak", to: "/" as const, hash: "kontak" },
] as const;

export function isWhatsAppConfigured(): boolean {
  return siteConfig.contact.whatsappNumber.trim().length > 0;
}

/** URL wa.me untuk sebuah pesan, atau null bila nomor belum dikonfigurasi. */
export function buildWhatsAppUrl(message: string): string | null {
  const number = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
