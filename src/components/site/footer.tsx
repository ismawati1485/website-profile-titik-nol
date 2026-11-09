import { Link } from "@tanstack/react-router";

import { navItems, siteConfig } from "@/config/site";
import { isWhatsAppConfigured } from "@/config/site";

export function Footer() {
  const whatsappReady = isWhatsAppConfigured();

  return (
    <footer className="border-t border-white/10 bg-[#111111] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        {/* Baris Atas: Logo Tagline & Positioning */}
        <div className="flex flex-col gap-8 pb-12 border-b border-white/10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Link
              to="/"
              className="inline-block transition-opacity hover:opacity-90"
              aria-label={`${siteConfig.name} — ${siteConfig.tagline}`}
            >
              <img
                src="/logo tagline.jpeg"
                alt={`${siteConfig.name} — ${siteConfig.tagline}`}
                className="h-11 sm:h-12 md:h-14 w-auto object-contain invert mix-blend-screen"
              />
            </Link>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-white/60">
              {siteConfig.positioning}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            <span className="h-1.5 w-1.5 bg-white" aria-hidden="true" />
            <span>FONDASI DIGITAL // TITIK NOL</span>
          </div>
        </div>

        {/* Baris Tengah: Navigasi, Kontak, Catatan */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 border-b border-white/10">
          {/* Kolom 1: Navigasi Ringkas (lg:col-span-5) */}
          <nav aria-label="Navigasi footer" className="lg:col-span-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              NAVIGASI
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    hash={"hash" in item ? item.hash : undefined}
                    className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80 transition-colors hover:text-white underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/portfolio"
                  className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80 transition-colors hover:text-white underline-offset-4 hover:underline"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <a
                  href="/#estimasi"
                  className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80 transition-colors hover:text-white underline-offset-4 hover:underline"
                >
                  Estimator
                </a>
              </li>
            </ul>
          </nav>

          {/* Kolom 2: Kontak Langsung (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              KONTAK & KONSULTASI
            </p>
            <div className="mt-4 space-y-2">
              {whatsappReady ? (
                <p className="text-xs sm:text-sm text-white/80">
                  <span className="text-white/40 font-mono text-[10px] block uppercase tracking-wider">
                    WHATSAPP RESMI
                  </span>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono font-bold text-white hover:underline underline-offset-4"
                  >
                    +{siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "")}
                  </a>
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-white/60">
                  Konsultasi via formulir kontak atau WhatsApp
                </p>
              )}

              {siteConfig.contact.socials.length > 0 && (
                <ul className="mt-3 flex gap-4">
                  {siteConfig.contact.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-white/70 underline-offset-4 hover:text-white hover:underline"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Kolom 3: Disclaimer Transparansi (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
              CATATAN TRANSPARANSI
            </p>
            <p className="mt-4 text-xs leading-relaxed text-white/50">
              Seluruh kisaran harga di situs ini bersifat indikatif dan transparan, bukan penawaran
              final. Nilai akhir disepakati sesuai lingkup spesifikasi pekerjaan.
            </p>
          </div>
        </div>

        {/* Baris Bawah: Copyright & Tagline */}
        <div className="flex flex-col gap-4 pt-8 text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between font-mono">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-3">
            <span className="h-1 w-1 bg-white/40" />
            <p className="uppercase tracking-[0.2em] text-white/70">
              {siteConfig.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
