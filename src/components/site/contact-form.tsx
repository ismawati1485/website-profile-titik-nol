import { useState, type FormEvent } from "react";

import { services } from "@/config/pricing";
import { buildWhatsAppUrl, isWhatsAppConfigured } from "@/config/site";

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
  "w-full border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground focus:ring-1 focus:ring-foreground";

const labelClass = "mb-1.5 block text-sm font-medium";

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
    <div className="grid gap-10 lg:grid-cols-2">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="kontak-nama" className={labelClass}>
              Nama <span className="text-muted-foreground">*</span>
            </label>
            <input
              id="kontak-nama"
              value={form.nama}
              maxLength={limits.nama}
              onChange={(e) => set("nama", e.target.value)}
              placeholder="Nama Anda"
              className={inputClass}
            />
            {errors.nama && <p className="mt-1 text-xs text-destructive">{errors.nama}</p>}
          </div>
          <div>
            <label htmlFor="kontak-bisnis" className={labelClass}>
              Bisnis
            </label>
            <input
              id="kontak-bisnis"
              value={form.bisnis}
              maxLength={limits.bisnis}
              onChange={(e) => set("bisnis", e.target.value)}
              placeholder="Nama bisnis / instansi"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="kontak-layanan" className={labelClass}>
            Layanan <span className="text-muted-foreground">*</span>
          </label>
          <select
            id="kontak-layanan"
            value={form.layanan}
            onChange={(e) => set("layanan", e.target.value)}
            className={inputClass}
          >
            <option value="">Pilih layanan…</option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.layanan && (
            <p className="mt-1 text-xs text-destructive">{errors.layanan}</p>
          )}
        </div>

        <div>
          <label htmlFor="kontak-kebutuhan" className={labelClass}>
            Kebutuhan <span className="text-muted-foreground">*</span>
          </label>
          <textarea
            id="kontak-kebutuhan"
            value={form.kebutuhan}
            maxLength={limits.kebutuhan}
            onChange={(e) => set("kebutuhan", e.target.value)}
            placeholder="Ceritakan singkat kebutuhan proyek Anda"
            rows={4}
            className={inputClass}
          />
          {errors.kebutuhan && (
            <p className="mt-1 text-xs text-destructive">{errors.kebutuhan}</p>
          )}
        </div>

        <div>
          <label htmlFor="kontak-fitur" className={labelClass}>
            Fitur yang diinginkan
          </label>
          <textarea
            id="kontak-fitur"
            value={form.fitur}
            maxLength={limits.fitur}
            onChange={(e) => set("fitur", e.target.value)}
            placeholder="Contoh: formulir kontak, galeri, pendaftaran…"
            rows={2}
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="kontak-budget" className={labelClass}>
              Budget
            </label>
            <input
              id="kontak-budget"
              value={form.budget}
              maxLength={limits.budget}
              onChange={(e) => set("budget", e.target.value)}
              placeholder="Bebas, mis. Rp1–2 juta"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="kontak-target" className={labelClass}>
              Target waktu
            </label>
            <input
              id="kontak-target"
              value={form.targetWaktu}
              maxLength={limits.targetWaktu}
              onChange={(e) => set("targetWaktu", e.target.value)}
              placeholder="Mis. 2 minggu"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="kontak-referensi" className={labelClass}>
            Link referensi
          </label>
          <input
            id="kontak-referensi"
            value={form.referensi}
            maxLength={limits.referensi}
            onChange={(e) => set("referensi", e.target.value)}
            placeholder="https://… (website yang Anda suka)"
            type="url"
            className={inputClass}
          />
          {errors.referensi && (
            <p className="mt-1 text-xs text-destructive">{errors.referensi}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full border border-foreground bg-foreground px-5 py-3 text-sm font-medium uppercase tracking-widest text-background transition-colors hover:bg-transparent hover:text-foreground sm:w-auto"
        >
          Susun Pesan WhatsApp
        </button>
      </form>

      <div className="border border-border bg-secondary p-6">
        <p className="overline text-muted-foreground">Pratinjau pesan</p>
        {!message ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Isi formulir lalu tekan "Susun Pesan WhatsApp". Pesan akan muncul
            di sini untuk Anda periksa sebelum dikirim.
          </p>
        ) : (
          <>
            <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-words text-sm leading-relaxed">
              {message}
            </pre>
            <div className="mt-5 flex flex-wrap gap-3">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
                >
                  Kirim via WhatsApp
                </a>
              ) : null}
              <button
                type="button"
                onClick={copyMessage}
                className="border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
              >
                {copied ? "Tersalin ✓" : "Salin pesan"}
              </button>
            </div>
            {!whatsappUrl && (
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Pengiriman langsung via WhatsApp belum aktif. Silakan salin
                pesan ini dan kirimkan secara manual.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
