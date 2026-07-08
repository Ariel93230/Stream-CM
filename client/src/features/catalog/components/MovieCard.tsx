import type { MovieSummary } from '../types';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: MovieSummary;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="overflow-hidden rounded-[1rem] border border-border bg-secondary shadow-sm transition-shadow duration-150 hover:shadow-lg">
      <Link to={`/movies/${movie.id}`} className="block">
        <img src={movie.thumbnailUrl} alt={movie.title} className="h-48 w-full object-cover" />
      </Link>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold leading-6 text-foreground">{movie.title}</h3>
          <span className="rounded-full bg-accent px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-accent-foreground">
            {movie.category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{movie.releaseYear} • {movie.duration}</p>
        <p className="text-xs text-muted-foreground">Rating: {movie.rating.toFixed(1)}</p>
      </div>
    </article>
  );
}
