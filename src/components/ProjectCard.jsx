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
  image,
  status,
  featured = false,
  year,
  role,
}) {
  // Fallback bila gambar eksternal (Unsplash) gagal dimuat.
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(image) && !imgError;
  const statusLabel = status ? STATUS_LABELS[status] : null;

  // Featured: aspect-[4/3] lebih tinggi, Regular: aspect-video (16:9)
  const imageAspect = featured ? "aspect-[4/3]" : "aspect-video";

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      {/* Screenshot */}
      <div className={`relative w-full overflow-hidden border-b border-border bg-surface-hover ${imageAspect}`}>
        {showImage ? (
          <img
            src={image}
            alt={`Tangkapan layar proyek ${title}`}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
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
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-semibold text-heading">{title}</h3>
          {statusLabel && (
            <Badge variant={STATUS_VARIANTS[status] ?? "muted"} className="flex-shrink-0">
              {statusLabel}
            </Badge>
          )}
        </div>

        {year && (
          <p className="caption mb-4">
            {role ? `${role} • ${year}` : year}
          </p>
        )}

        <p className="body-sm mb-6 flex-1">{description}</p>

        {tags.length > 0 && (
          <ul
            aria-label={`Teknologi yang digunakan pada proyek ${title}`}
            className="flex flex-wrap gap-2 mb-6"
          >
            {tags.map((tag) => (
              <li key={tag}>
                <Tag variant="muted">{tag}</Tag>
              </li>
            ))}
          </ul>
        )}

        {link && (
          <div className="mt-auto pt-5 border-t border-border">
            <Button
              href={link}
              variant="ghost"
              size="sm"
              className="group/link"
            >
              <GithubIcon className="h-4 w-4" />
              Source Code
              <Icon name="arrowUpRight" className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
