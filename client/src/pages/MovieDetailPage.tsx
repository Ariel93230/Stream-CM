import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovie } from '@/features/catalog/hooks/useMovie';
import { VideoPlayer } from '@/features/player/components/VideoPlayer';

const DEFAULT_VIDEO_URL = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const { data: movie, isLoading, isError } = useMovie(movieId ?? '');

  const videoSrc = useMemo(() => {
    return movie?.videoUrl ?? DEFAULT_VIDEO_URL;
  }, [movie]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link to="/movies" className="text-sm font-semibold text-primary underline transition hover:text-accent">
            ← Back to catalog
          </Link>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Movie player
          </span>
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading movie details...</p>
        ) : isError ? (
          <p className="text-sm text-red-500">Movie details not available. Please try again.</p>
        ) : !movie ? (
          <p className="text-sm text-muted-foreground">Movie not found.</p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-6">
              <VideoPlayer
                movieId={movie.id}
                src={videoSrc}
                poster={movie.thumbnailUrl}
                title={movie.title}
              />

              <div className="rounded-[1.5rem] border border-border bg-secondary p-6 shadow-sm">
                <h1 className="text-3xl font-semibold tracking-tight">{movie.title}</h1>
                <p className="mt-3 text-sm text-muted-foreground">{movie.description}</p>
              </div>
            </div>

            <aside className="space-y-6 rounded-[1.5rem] border border-border bg-secondary p-6 shadow-sm">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-primary">Details</p>
                <div className="grid gap-3 text-sm text-foreground">
                  <div className="flex items-center justify-between gap-4 rounded-3xl bg-background/60 px-4 py-3">
                    <span>Category</span>
                    <strong>{movie.category}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-3xl bg-background/60 px-4 py-3">
                    <span>Release year</span>
                    <strong>{movie.releaseYear}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-3xl bg-background/60 px-4 py-3">
                    <span>Duration</span>
                    <strong>{movie.duration}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-3xl bg-background/60 px-4 py-3">
                    <span>Rating</span>
                    <strong>{movie.rating.toFixed(1)}</strong>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-primary p-5 text-primary-foreground shadow-sm">
                <p className="text-sm font-semibold">Basic playback controls</p>
                <p className="mt-2 text-sm text-primary-foreground/90">
                  Use the built-in HTML5 controls to play, pause, seek, and adjust volume. Resume position is saved while browsing.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
