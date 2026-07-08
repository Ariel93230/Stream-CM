import { useMemo, useState } from 'react';
import { MovieCard } from '@/features/catalog/components/MovieCard';
import { useCatalog } from '@/features/catalog/hooks/useCatalog';

const categories = ['All', 'Drama', 'Comedy', 'Action', 'Documentary', 'Family'];

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const query = useMemo(
    () => ({
      search: search.trim() || undefined,
      category: category === 'All' ? undefined : category,
    }),
    [search, category],
  );

  const { data: movies, isLoading, isError } = useCatalog(query);

  const movieList = movies ?? [];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8 flex flex-col gap-4 rounded-[1.5rem] border border-border bg-secondary p-6 shadow-sm">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Movie Catalog</p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Browse licensed movies and local hits.</h1>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              Search by title, filter by category, and click through to see movie details.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <label className="w-full">
              <span className="sr-only">Search movies</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search movies by title or description"
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    category === item
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground ring-1 ring-border hover:bg-border'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading movies...</p>
        ) : isError ? (
          <p className="text-sm text-red-500">Unable to load movies. Please try again later.</p>
        ) : movieList.length === 0 ? (
          <p className="text-sm text-muted-foreground">No movies match your search. Try a different title or category.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
