import prisma from '../../config/db.js';
import { AppError } from '../../utils/AppError.js';

interface GetMoviesInput {
  search?: string;
  category?: string;
}

export async function fetchMovies(input: GetMoviesInput) {
  const whereClause: Record<string, unknown> = {};

  if (input.search) {
    whereClause.OR = [
      { title: { contains: input.search, mode: 'insensitive' } },
      { description: { contains: input.search, mode: 'insensitive' } },
    ];
  }

  if (input.category) {
    whereClause.category = input.category;
  }

  const movies = await prisma.movie.findMany({
    where: whereClause,
    orderBy: { releaseYear: 'desc' },
    take: 50,
  });

  return movies;
}

export async function fetchMovieById(movieId: string) {
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    throw new AppError('MOVIE_NOT_FOUND', 'Movie not found', 404);
  }

  return movie;
}
