import { useState, type FormEvent } from "react";

import { services } from "@/config/pricing";
import { buildWhatsAppUrl } from "@/config/site";

type FormState = {
  nama: string;
  bisnis: string;
  layanan: string;
  kebutuhan: string;
  fitur: string;
  budget: string;
  targetWaktu: string;
  referensi: string;
};

const initialForm: FormState = {
  nama: "",
  bisnis: "",
  layanan: "",
  kebutuhan: "",
  fitur: "",
  budget: "",
  targetWaktu: "",
  referensi: "",
};

const limits = {
  nama: 100,
  bisnis: 120,
  kebutuhan: 1000,
  fitur: 500,
  budget: 60,
  targetWaktu: 60,
  referensi: 300,
} as const;

function composeMessage(form: FormState): string {
  const lines = [
    "Halo TITIK NOL, saya ingin konsultasi proyek.",
    "",
    `Nama: ${form.nama}`,
    `Bisnis: ${form.bisnis || "-"}`,
    `Layanan: ${form.layanan}`,
    `Kebutuhan: ${form.kebutuhan}`,
    `Fitur: ${form.fitur || "-"}`,
    `Budget: ${form.budget || "-"}`,
    `Target waktu: ${form.targetWaktu || "-"}`,
    `Link referensi: ${form.referensi || "-"}`,
  ];
  return lines.join("\n");
}

const inputClass =
  "w-full border border-[#111111]/25 bg-[#F9F9F7] px-3.5 py-3 text-sm text-[#111111] rounded-none outline-none transition-colors placeholder:text-[#999999] focus:border-[#111111] focus:bg-white focus:ring-1 focus:ring-[#111111]";

const labelClass =
  "mb-1.5 flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#111111]";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const set = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.nama.trim()) nextErrors.nama = "Nama wajib diisi.";
    if (form.nama.length > limits.nama) nextErrors.nama = `Nama maksimal ${limits.nama} karakter.`;
    if (!form.layanan) nextErrors.layanan = "Pilih layanan terlebih dahulu.";
    if (!form.kebutuhan.trim()) nextErrors.kebutuhan = "Kebutuhan wajib diisi.";
    if (form.kebutuhan.length > limits.kebutuhan)
      nextErrors.kebutuhan = `Kebutuhan maksimal ${limits.kebutuhan} karakter.`;
    if (form.referensi && !/^https?:\/\/\S+$/.test(form.referensi.trim()))
      nextErrors.referensi = "Tautan referensi harus berupa URL yang valid (http/https).";

    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setMessage(composeMessage(form));
    setCopied(false);
  };

  const whatsappUrl = message ? buildWhatsAppUrl(message) : null;

  const copyMessage = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative border border-[#111111]/15 bg-white p-6 sm:p-8 lg:p-10">
      {/* Ornamen sudut crosshair */}
      <span
        className="pointer-events-none absolute -top-2.5 -left-2.5 font-mono text-xs font-light text-[#111111]/30 select-none"
        aria-hidden="true"
      >
        +
      </span>
      <span
        className="pointer-events-none absolute -top-2.5 -right-2.5 font-mono text-xs font-light text-[#111111]/30 select-none"
        aria-hidden="true"
      >
        +
      </span>
      <span
        className="pointer-events-none absolute -bottom-2.5 -left-2.5 font-mono text-xs font-light text-[#111111]/30 select-none"
        aria-hidden="true"
      >
        +
      </span>
      <span
        className="pointer-events-none absolute -bottom-2.5 -right-2.5 font-mono text-xs font-light text-[#111111]/30 select-none"
        aria-hidden="true"
      >
        +
      </span>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Kolom Formulir */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-[#111111]/15 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#111111]/35">01</span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#111111]">
                DATA PROYEK
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase text-[#737373]">
              * WAJIB DIISI
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="kontak-nama" className={labelClass}>
                <span>Nama Lengkap</span>
                <span className="text-[#dc2626] font-bold">*</span>
              </label>
              <input
                id="kontak-nama"
                value={form.nama}
                maxLength={limits.nama}
                onChange={(e) => set("nama", e.target.value)}
                placeholder="Nama Anda"
                className={inputClass}
              />
              {errors.nama && (
                <p className="mt-1 font-mono text-xs text-[#dc2626]">{errors.nama}</p>
              )}
            </div>

            <div>
              <label htmlFor="kontak-bisnis" className={labelClass}>
                <span>Nama Bisnis / Brand</span>
                <span className="text-[#737373] font-normal lowercase">(opsional)</span>
              </label>
              <input
                id="kontak-bisnis"
                value={form.bisnis}
                maxLength={limits.bisnis}
                onChange={(e) => set("bisnis", e.target.value)}
                placeholder="Nama bisnis atau instansi"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="kontak-layanan" className={labelClass}>
              <span>Kategori Layanan</span>
              <span className="text-[#dc2626] font-bold">*</span>
            </label>
            <select
              id="kontak-layanan"
              value={form.layanan}
              onChange={(e) => set("layanan", e.target.value)}
              className={inputClass}
            >
              <option value="">Pilih salah satu layanan…</option>
              {services.map((service) => (
                <option key={service.slug} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.layanan && (
              <p className="mt-1 font-mono text-xs text-[#dc2626]">{errors.layanan}</p>
            )}
          </div>

          <div>
            <label htmlFor="kontak-kebutuhan" className={labelClass}>
              <span>Ringkasan Kebutuhan</span>
              <span className="text-[#dc2626] font-bold">*</span>
            </label>
            <textarea
              id="kontak-kebutuhan"
              value={form.kebutuhan}
              maxLength={limits.kebutuhan}
              onChange={(e) => set("kebutuhan", e.target.value)}
              placeholder="Jelaskan tujuan dan gambaran proyek website yang ingin Anda bangun"
              rows={4}
              className={inputClass}
            />
            {errors.kebutuhan && (
              <p className="mt-1 font-mono text-xs text-[#dc2626]">{errors.kebutuhan}</p>
            )}
          </div>

          <div>
            <label htmlFor="kontak-fitur" className={labelClass}>
              <span>Fitur Khusus yang Diinginkan</span>
              <span className="text-[#737373] font-normal lowercase">(opsional)</span>
            </label>
            <textarea
              id="kontak-fitur"
              value={form.fitur}
              maxLength={limits.fitur}
              onChange={(e) => set("fitur", e.target.value)}
              placeholder="Contoh: integrasi payment gateway, multi-bahasa, katalog dinamis…"
              rows={2}
              className={inputClass}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="kontak-budget" className={labelClass}>
                <span>Alokasi Budget</span>
                <span className="text-[#737373] font-normal lowercase">(opsional)</span>
              </label>
              <input
                id="kontak-budget"
                value={form.budget}
                maxLength={limits.budget}
                onChange={(e) => set("budget", e.target.value)}
                placeholder="Mis. Rp 1.000.000 – Rp 2.000.000"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="kontak-target" className={labelClass}>
                <span>Ekspektasi Timeline</span>
                <span className="text-[#737373] font-normal lowercase">(opsional)</span>
              </label>
              <input
                id="kontak-target"
                value={form.targetWaktu}
                maxLength={limits.targetWaktu}
                onChange={(e) => set("targetWaktu", e.target.value)}
                placeholder="Mis. 2-3 minggu"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="kontak-referensi" className={labelClass}>
              <span>Tautan Referensi Website</span>
              <span className="text-[#737373] font-normal lowercase">(opsional)</span>
            </label>
            <input
              id="kontak-referensi"
              value={form.referensi}
              maxLength={limits.referensi}
              onChange={(e) => set("referensi", e.target.value)}
              placeholder="https://… (referensi visual yang Anda sukai)"
              type="url"
              className={inputClass}
            />
            {errors.referensi && (
              <p className="mt-1 font-mono text-xs text-[#dc2626]">{errors.referensi}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full border border-[#111111] bg-[#111111] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent hover:text-[#111111] cursor-pointer"
          >
            Susun Pesan WhatsApp →
          </button>
        </form>

        {/* Kolom Pratinjau Pesan */}
        <div className="flex flex-col justify-between border-t border-[#111111]/15 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <div className="flex items-center justify-between border-b border-[#111111]/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-[#111111]" aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#111111]">
                  PRATINJAU DOKUMEN
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#737373]">
                {message ? "SIAP DIKIRIM" : "MENUNGGU FORMULIR"}
              </span>
            </div>

            {!message ? (
              <div className="mt-8 border border-dashed border-[#111111]/20 bg-[#F9F9F7] p-8 text-center">
                <span className="font-mono text-xs text-[#737373] uppercase tracking-wider block">
                  DRAF BELUM DIBUAT
                </span>
                <p className="mt-2 text-xs leading-relaxed text-[#666666]">
                  Lengkapi data pada formulir di sebelah kiri, lalu klik tombol{" "}
                  <strong>"Susun Pesan WhatsApp"</strong> untuk memeriksa hasil sebelum dikirimkan.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="border border-[#111111]/15 bg-[#F9F9F7] p-4">
                  <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-[#111111]">
                    {message}
                  </pre>
                </div>

                <div className="flex flex-col gap-2.5 sm:flex-row">
                  {whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 border border-[#111111] bg-[#111111] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-transparent hover:text-[#111111]"
                    >
                      <span>Kirim via WhatsApp</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={copyMessage}
                    className="inline-flex items-center justify-center gap-2 border border-[#111111]/30 bg-white px-5 py-3 text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#111111] transition-all hover:border-[#111111] hover:bg-[#111111] hover:text-white cursor-pointer"
                  >
                    <span>{copied ? "Tersalin ✓" : "Salin Pesan"}</span>
                  </button>
                </div>

                {!whatsappUrl && (
                  <p className="font-mono text-[11px] leading-relaxed text-[#737373]">
                    Nomor WhatsApp belum dikonfigurasi langsung. Silakan salin pesan di atas untuk
                    dikirimkan secara manual.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Catatan Bawah Pratinjau */}
          <div className="mt-8 border-t border-[#111111]/15 pt-5 text-xs text-[#737373]">
            <p className="font-mono text-[10px] uppercase tracking-wider">
              PRIVASI TERJAGA · TANPA REGISTRASI AKUN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
