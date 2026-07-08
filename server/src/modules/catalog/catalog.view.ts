export const movieListView = (movies: Array<Record<string, unknown>>) => {
  return movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    category: movie.category,
    thumbnailUrl: movie.thumbnailUrl,
    duration: movie.duration,
    releaseYear: movie.releaseYear,
    rating: movie.rating,
  }));
};

export const movieDetailView = (movie: Record<string, unknown>) => ({
  id: movie.id,
  title: movie.title,
  description: movie.description,
  category: movie.category,
  thumbnailUrl: movie.thumbnailUrl,
  videoUrl: movie.videoUrl,
  duration: movie.duration,
  releaseYear: movie.releaseYear,
  rating: movie.rating,
});
