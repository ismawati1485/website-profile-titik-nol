import { useState } from "react";

import {
  complexityLevels,
  estimateFor,
  formatTierRange,
  services,
  type ComplexityLevel,
} from "@/config/pricing";

const defaultService = services[0]!;
const defaultLevel = complexityLevels[1]!;

export function Estimator() {
  const [serviceName, setServiceName] = useState(defaultService.name);
  const [levelLabel, setLevelLabel] = useState<ComplexityLevel["label"]>(
    defaultLevel.label,
  );

  const service = services.find((s) => s.name === serviceName) ?? defaultService;
  const level =
    complexityLevels.find((l) => l.label === levelLabel) ?? defaultLevel;
  const estimate = estimateFor(service, level);

  const complexityDescriptions: Record<string, string> = {
    sederhana: "Fitur esensial & struktur ringkas",
    standar: "Kebutuhan umum & proporsional",
    kompleks: "Fitur lanjutan & kustom penuh",
  };

  return (
    <div className="relative border border-[#111111]/15 bg-white p-6 sm:p-8 lg:p-10">
      {/* Ornamen sudut crosshair editorial */}
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

      {/* Grid 2 Kolom Desktop: Input di Kiri (col 7), Hasil di Kanan (col 5) */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Kolom Kiri: Pilihan Layanan & Kompleksitas */}
        <div className="space-y-10 lg:col-span-7">
          {/* Bagian 1: Pilih Jenis Layanan */}
          <fieldset>
            <legend className="w-full">
              <div className="flex items-center justify-between border-b border-[#111111]/15 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-[#111111]/35">01</span>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#111111]">
                    PILIH JENIS LAYANAN
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#737373]">
                  {services.length} PILIHAN
                </span>
              </div>
            </legend>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {services.map((s, index) => {
                const active = service.name === s.name;
                return (
                  <button
                    key={s.name}
                    type="button"
                    name={`service-${s.slug}`}
                    aria-pressed={active}
                    onClick={() => setServiceName(s.name)}
                    className={`group relative flex flex-col justify-between border p-4 text-left transition-all duration-150 ${
                      active
                        ? "border-[#111111] bg-[#111111] text-white"
                        : "border-[#111111]/15 bg-white text-[#111111] hover:border-[#111111]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[10px] font-bold tracking-widest ${
                          active ? "text-white/60" : "text-[#737373]"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <span
                        className={`h-1.5 w-1.5 ${
                          active ? "bg-white" : "bg-transparent group-hover:bg-[#111111]"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3">
                      <span className="block text-sm font-bold uppercase tracking-tight leading-snug">
                        {s.name}
                      </span>
                      <span
                        className={`mt-1 block font-mono text-[11px] ${
                          active ? "text-white/70" : "text-[#737373]"
                        }`}
                      >
                        {formatTierRange(s.tiers[0])}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Bagian 2: Pilih Tingkat Kompleksitas */}
          <fieldset>
            <legend className="w-full">
              <div className="flex items-center justify-between border-b border-[#111111]/15 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-[#111111]/35">02</span>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#111111]">
                    TINGKAT KOMPLEKSITAS
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#737373]">
                  SKALA PEKERJAAN
                </span>
              </div>
            </legend>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {complexityLevels.map((lvl, index) => {
                const active = level.label === lvl.label;
                return (
                  <button
                    key={lvl.value}
                    type="button"
                    name={`complexity-${lvl.value}`}
                    aria-pressed={active}
                    onClick={() => setLevelLabel(lvl.label)}
                    className={`group relative flex flex-col justify-between border p-4 text-left transition-all duration-150 ${
                      active
                        ? "border-[#111111] bg-[#111111] text-white"
                        : "border-[#111111]/15 bg-white text-[#111111] hover:border-[#111111]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[10px] font-bold tracking-widest ${
                          active ? "text-white/60" : "text-[#737373]"
                        }`}
                      >
                        LVL // 0{index + 1}
                      </span>
                      <span
                        className={`h-1.5 w-1.5 ${
                          active ? "bg-white" : "bg-transparent group-hover:bg-[#111111]"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3">
                      <span className="block text-sm font-bold uppercase tracking-tight">
                        {lvl.label}
                      </span>
                      <span
                        className={`mt-1 block text-[11px] leading-tight ${
                          active ? "text-white/70" : "text-[#737373]"
                        }`}
                      >
                        {complexityDescriptions[lvl.value] ?? lvl.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Kolom Kanan: Hasil Estimasi (Visual Focus) */}
        <div className="flex flex-col justify-between border-t border-[#111111]/15 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            {/* Header Panel Hasil */}
            <div className="flex items-center justify-between border-b border-[#111111]/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-[#111111]" aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#111111]">
                  HASIL PERHITUNGAN
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#737373]">
                {estimate.type === "floor" ? "NILAI DASAR" : "PERKIRAAN"}
              </span>
            </div>

            {/* Rangkuman Konfigurasi */}
            <div className="mt-6 space-y-3 border-b border-[#111111]/15 pb-6 text-xs">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[#737373] uppercase tracking-wider">Layanan</span>
                <span className="text-right font-bold uppercase tracking-tight text-[#111111]">
                  {service.name}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[#737373] uppercase tracking-wider">Kompleksitas</span>
                <span className="text-right font-bold uppercase tracking-tight text-[#111111]">
                  {level.label}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[#737373] uppercase tracking-wider">Rentang Paket</span>
                <span className="text-right font-mono text-[#111111]">
                  {formatTierRange(service.tiers[0])}
                </span>
              </div>
            </div>

            {/* Angka Harga Besar (Visual Focus) */}
            <div className="mt-8">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#737373] block">
                {estimate.label}
              </span>
              <div className="mt-3">
                <span className="font-mono text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-[#111111] leading-none block">
                  {estimate.value}
                </span>
              </div>

              {/* Ornamen garis pembatas drafting */}
              <div className="mt-6 flex items-center gap-2">
                <div className="h-px w-8 bg-[#111111]" />
                <div className="h-1.5 w-1.5 bg-[#111111]" />
                <div className="h-px flex-1 bg-[#111111]/15" />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#666666]">
                Estimasi bersifat indikatif, bukan penawaran final. Nilai akhir ditetapkan setelah
                lingkup pekerjaan disepakati.
              </p>
            </div>
          </div>

          {/* CTA Hubungi Konsultasi */}
          <div className="mt-8 border-t border-[#111111]/15 pt-6">
            <a
              href="#kontak"
              className="inline-flex w-full items-center justify-center gap-2 border border-[#111111] bg-[#111111] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent hover:text-[#111111]"
            >
              <span>KONSULTASIKAN ESTIMASI INI</span>
              <span aria-hidden="true">→</span>
            </a>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-[#737373]">
              RESPON KONSULTASI DALAM 1×24 JAM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
