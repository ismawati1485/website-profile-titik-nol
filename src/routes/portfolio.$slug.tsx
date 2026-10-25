import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";

import { siteConfig } from "@/config/site";
import { getProject, projects } from "@/data/projects";
import { ProjectCover } from "@/components/site/project-cover";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    if (!getProject(params.slug)) {
      throw notFound();
    }
    return null;
  },
  head: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) {
      return { meta: [{ title: `Proyek tidak ditemukan — ${siteConfig.name}` }] };
    }
    return {
      meta: [
        { title: `${project.title} — ${siteConfig.name}` },
        { name: "description", content: project.summary },
        { property: "og:title", content: `${project.title} — ${siteConfig.name}` },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ProjectDetailPage,
});

function DetailBlock({
  overline,
  title,
  children,
}: {
  overline: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 border-t border-border py-10 md:grid-cols-[220px_1fr]">
      <p className="overline text-muted-foreground">{overline}</p>
      <div>
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  if (!project) throw notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <Link
        to="/portfolio"
        className="text-xs font-medium uppercase tracking-widest text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        ← Semua proyek
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="overline text-muted-foreground">
            {project.category}
          </span>
          <span className="border border-border px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            {project.status}
          </span>
        </div>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold uppercase leading-tight sm:text-4xl lg:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.summary}
        </p>
      </header>

      <Reveal className="mt-10">
        <ProjectCover project={project} className="max-h-[560px]" />
      </Reveal>

      <div className="mt-4">
        <DetailBlock overline="Masalah / Kebutuhan">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.problem}
          </p>
        </DetailBlock>

        <DetailBlock overline="Solusi">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.solution}
          </p>
        </DetailBlock>

        <DetailBlock overline="Fitur">
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm">
                <span aria-hidden className="mt-2 h-1 w-4 shrink-0 bg-foreground" />
                {feature}
              </li>
            ))}
          </ul>
        </DetailBlock>

        <DetailBlock overline="Teknologi">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="border border-border bg-secondary px-3 py-1.5 text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </DetailBlock>

        <DetailBlock overline="Galeri">
          {project.gallery && project.gallery.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${project.title} — gambar ${index + 1}`}
                  className="aspect-[4/3] w-full border border-border object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex aspect-[4/3] flex-col items-center justify-center border border-border bg-secondary p-6 text-center"
                >
                  <span className="overline text-muted-foreground">
                    Gambar {String(n).padStart(2, "0")}
                  </span>
                  <span className="mt-2 text-xs text-muted-foreground">
                    Placeholder — isi `gallery` di data proyek untuk mengganti.
                  </span>
                </div>
              ))}
            </div>
          )}
        </DetailBlock>
      </div>

      <div className="border-t border-border pt-10">
        <p className="overline text-muted-foreground">Proyek lainnya</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.slug}
              to="/portfolio/$slug"
              params={{ slug: other.slug }}
              className="group border border-border p-5 transition-colors hover:border-foreground"
            >
              <span className="overline text-muted-foreground">
                {other.category}
              </span>
              <h3 className="mt-2 text-base font-semibold leading-snug group-hover:underline underline-offset-4">
                {other.title}
              </h3>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/"
            hash="kontak"
            className="inline-block border border-foreground bg-foreground px-6 py-3 text-xs font-medium uppercase tracking-widest text-background transition-colors hover:bg-transparent hover:text-foreground"
          >
            Diskusikan proyek serupa
          </Link>
        </div>
      </div>
    </article>
  );
}
