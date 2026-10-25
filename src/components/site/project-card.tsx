import { Link } from "@tanstack/react-router";

import { ProjectCover } from "@/components/site/project-cover";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: project.slug }}
      className="group block border border-border bg-background transition-shadow hover:shadow-[0_8px_30px_-12px_oklch(0.178_0_0_/_0.25)]"
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-500 group-hover:scale-[1.02]">
          <ProjectCover project={project} />
        </div>
      </div>
      <div className="border-t border-border p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="overline text-muted-foreground">
            {project.category}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {project.status}
          </span>
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-snug">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {project.summary}
        </p>
        <span className="mt-4 inline-block text-xs font-medium uppercase tracking-widest underline underline-offset-4">
          Lihat detail
        </span>
      </div>
    </Link>
  );
}
