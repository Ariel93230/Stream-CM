import type { VideoPreview } from '@/features/catalog/types';

interface VideoCardProps {
  video: VideoPreview;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="overflow-hidden rounded-[1rem] border border-border bg-secondary shadow-sm transition-shadow duration-150 hover:shadow-lg">
      <div className="relative">
        <img src={video.thumbnailUrl} alt={video.title} className="h-40 w-full object-cover" />
        {video.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            {video.badge}
          </span>
        ) : null}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold leading-6 text-foreground">{video.title}</h3>
          <span className="rounded-full bg-accent px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-accent-foreground">
            {video.category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{video.creator}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{video.duration}</span>
          <span>{video.viewers}</span>
        </div>
      </div>
    </article>
  );
}
