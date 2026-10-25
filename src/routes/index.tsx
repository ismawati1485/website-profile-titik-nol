import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import { siteConfig } from "@/config/site";
import { formatTierRange, services } from "@/config/pricing";
import { processSteps } from "@/data/content";
import { featuredProjects } from "@/data/projects";
import { Reveal } from "@/components/site/reveal";
import { ProjectCard } from "@/components/site/project-card";
import { Estimator } from "@/components/site/estimator";
import { FaqSection } from "@/components/site/faq-section";
import { ContactForm } from "@/components/site/contact-form";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${siteConfig.name} — Studio Digital | ${siteConfig.tagline}`,
      },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: `${siteConfig.name} — Studio Digital` },
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
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32 lg:py-40">
          <p
            className="overline animate-fade-up text-muted-foreground"
            style={{ animationDelay: "0ms" }}
          >
            {siteConfig.name} · Studio Digital
          </p>
          <h1
            className="animate-fade-up mt-6 max-w-4xl text-4xl font-semibold uppercase leading-[1.05] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            Semua hal berawal dari nol.
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
            style={{ animationDelay: "240ms" }}
          >
            {siteConfig.positioning}
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-wrap gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              to="/portfolio"
              className="border border-foreground bg-foreground px-6 py-3 text-xs font-medium uppercase tracking-widest text-background transition-colors hover:bg-transparent hover:text-foreground"
            >
              Lihat Portfolio
            </Link>
            <Link
              to="/"
              hash="kontak"
              className="border border-border bg-background px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors hover:border-foreground"
            >
              Konsultasi Proyek
            </Link>
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section id="layanan" className="border-b border-border bg-secondary">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              overline="Layanan"
              title="Apa yang kami buat"
              description="Enam jenis layanan digital, dari satu halaman fokus hingga sistem sesuai kebutuhan bisnis Anda."
            />
          </Reveal>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 60}>
                <div className="h-full bg-background p-6">
                  <p className="overline text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>
                  <p className="mt-4 text-xs font-medium">
                    {formatTierRange(service.tiers[0])}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proyek unggulan */}
      <section id="proyek" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                overline="Portfolio"
                title="Proyek unggulan"
                description="Sekilas konsep dan proyek yang sedang kami kembangkan."
              />
              <Link
                to="/portfolio"
                className="text-xs font-medium uppercase tracking-widest underline underline-offset-4"
              >
                Semua proyek →
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 60}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cara kerja */}
      <section id="cara-kerja" className="border-b border-border bg-secondary">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              overline="Cara Kerja"
              title="Proses yang transparan"
            />
          </Reveal>
          <ol className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 60}>
                <li className="h-full bg-background p-6">
                  <p className="text-3xl font-semibold text-muted-foreground/40">
                    {step.step}
                  </p>
                  <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Paket harga */}
      <section id="harga" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              overline="Paket Harga"
              title="Kisaran biaya per layanan"
              description="Angka di bawah bersifat sementara dan indikatif — bukan penawaran final. Nilai akhir ditetapkan setelah lingkup pekerjaan disepakati."
            />
          </Reveal>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 60}>
                <div className="flex h-full flex-col bg-background p-6">
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>
                  <p className="mt-6 text-xl font-semibold tracking-tight">
                    {formatTierRange(service.tiers[0])}
                  </p>
                  <a
                    href="#estimasi"
                    className="mt-4 inline-block text-xs font-medium uppercase tracking-widest underline underline-offset-4"
                  >
                    Hitung estimasi
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kalkulator estimasi */}
      <section id="estimasi" className="border-b border-border bg-secondary">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              overline="Kalkulator Estimasi"
              title="Perkiraan biaya dalam beberapa klik"
              description="Pilih jenis layanan dan tingkat kompleksitas untuk melihat estimasi indikatifnya."
            />
          </Reveal>
          <Reveal className="mt-12">
            <Estimator />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <Reveal>
              <SectionHeading
                overline="FAQ"
                title="Pertanyaan yang sering diajukan"
              />
            </Reveal>
            <Reveal delay={100}>
              <FaqSection />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="bg-secondary">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              overline="Kontak"
              title="Mulai dari nol, bersama kami"
              description="Ceritakan kebutuhan Anda. Jawaban akan tersusun menjadi pesan WhatsApp yang bisa Anda periksa sebelum dikirim."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
