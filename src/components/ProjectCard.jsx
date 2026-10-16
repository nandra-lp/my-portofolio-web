import { useState } from "react";
import { Tag, Badge } from "./ui/Tag";
import { Icon, GithubIcon } from "./ui/Icon";
import { Button } from "./ui/Button";

const STATUS_LABELS = {
  completed: "Selesai",
  "in-progress": "Berjalan",
  planned: "Rencana",
};

const STATUS_VARIANTS = {
  completed: "success",
  "in-progress": "primary",
  planned: "muted",
};

export default function ProjectCard({
  title,
  description,
  tags = [],
  link,
  demo,
  image,
  imageFit = "cover",
  imageBg,
  imagePadding = "p-4",
  status,
  featured = false,
  year,
  role,
}) {
  // Fallback bila gambar eksternal (Unsplash) gagal dimuat.
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(image) && !imgError;
  const statusLabel = status ? STATUS_LABELS[status] : null;
  // Logo/aset square (mis. MyKAS) memakai contain + padding agar tampil utuh.
  const isContain = imageFit === "contain";

  // Featured: aspect-[16/10] proporsional di desktop, Regular: aspect-video (16:9)
  const imageAspect = featured ? "aspect-[16/10]" : "aspect-video";

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      {/* Screenshot / logo — imageBg menyatu dengan warna dasar aset
          agar logo tampil penuh dan padat tanpa garis batas */}
      <div
        className={`relative w-full overflow-hidden border-b border-border bg-surface-hover ${imageAspect}`}
        style={imageBg ? { background: imageBg } : undefined}
      >
        {showImage ? (
          <img
            src={image}
            alt={isContain ? `Logo proyek ${title}` : `Tangkapan layar proyek ${title}`}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className={`h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.03] ${isContain ? `object-contain ${imagePadding}` : "object-cover"}`}
          />
        ) : (
          <div
            role="img"
            aria-label={`Pratinjau tidak tersedia untuk proyek ${title}`}
            className="flex h-full w-full items-center justify-center"
          >
            <Icon name="folder" className="h-12 w-12 text-border-strong" />
          </div>
        )}
      </div>

      {/* Konten */}
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-heading transition-colors duration-200 group-hover:text-primary">{title}</h3>
          {statusLabel && (
            <Badge variant={STATUS_VARIANTS[status] ?? "muted"} className="flex-shrink-0">
              {statusLabel}
            </Badge>
          )}
        </div>

        {year && (
          <p className="mb-3 text-xs text-muted">
            {role ? `${role} · ${year}` : year}
          </p>
        )}

        <p className="body-sm mb-4 flex-1 line-clamp-3">{description}</p>

        {tags.length > 0 && (
          <ul
            aria-label={`Teknologi yang digunakan pada proyek ${title}`}
            className="mb-4 flex flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <li key={tag}>
                <Tag variant="muted">{tag}</Tag>
              </li>
            ))}
          </ul>
        )}

        {(link || demo) && (
          <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-4">
            {demo && (
              <Button
                href={demo}
                variant="secondary"
                size="sm"
                className="group/link min-h-11"
              >
                <Icon name="arrowUpRight" className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                Lihat Website
              </Button>
            )}
            {link && (
              <Button
                href={link}
                variant="ghost"
                size="sm"
                className="group/link min-h-11"
              >
                <GithubIcon className="h-4 w-4" />
                Source Code
                <Icon name="arrowUpRight" className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
