import type { Project } from "@/data/projects";

/**
 * Cover proyek. Bila `project.coverImage` terisi, gambar tersebut dipakai.
 * Bila kosong, tampil placeholder visual yang rapi mengikuti judul & kategori
 * proyek — tinggal isi `coverImage` di data proyek untuk menggantinya.
 */
export function ProjectCover({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  if (project.coverImage) {
    return (
      <img
        src={project.coverImage}
        alt={project.title}
        className={`aspect-[4/3] w-full object-cover ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`flex aspect-[4/3] w-full flex-col overflow-hidden border border-border bg-secondary ${className}`}
      aria-label={`Placeholder tampilan ${project.title}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-background px-3 py-2">
        <span className="h-2 w-2 rounded-full border border-border bg-background" />
        <span className="h-2 w-2 rounded-full border border-border bg-background" />
        <span className="h-2 w-2 rounded-full border border-border bg-background" />
        <span className="ml-2 truncate text-[10px] text-muted-foreground">
          {project.slug}
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <span className="overline text-muted-foreground">
          {project.category}
        </span>
        <span className="text-base font-semibold uppercase leading-snug sm:text-lg">
          {project.title}
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {project.status}
        </span>
      </div>
    </div>
  );
}
