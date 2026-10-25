import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from "@/data/projects";
import { Reveal } from "@/components/site/reveal";
import { ProjectCard } from "@/components/site/project-card";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: `Portfolio — ${siteConfig.name}` },
      {
        name: "description",
        content:
          "Portfolio TITIK NOL: konsep dan proyek website — landing page, event website, company profile, product catalog, custom system, dan dashboard.",
      },
      { property: "og:title", content: `Portfolio — ${siteConfig.name}` },
      {
        property: "og:description",
        content:
          "Konsep dan proyek website dari studio digital TITIK NOL, dapat difilter per kategori.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PortfolioPage,
});

type Filter = "Semua" | ProjectCategory;
const filters: Filter[] = ["Semua", ...projectCategories];

function PortfolioPage() {
  const [filter, setFilter] = useState<Filter>("Semua");
  const visible =
    filter === "Semua" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <p className="overline text-muted-foreground">Portfolio</p>
      <h1 className="mt-3 text-3xl font-semibold uppercase leading-tight sm:text-4xl">
        Semua proyek
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Kumpulan konsep dan proyek studio. Filter per kategori untuk melihat
        jenis layanan tertentu.
      </p>

      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
        {filters.map((item) => {
          const active = filter === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item)}
              className={`border px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background hover:border-foreground"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-sm text-muted-foreground">
          Belum ada proyek pada kategori ini.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
