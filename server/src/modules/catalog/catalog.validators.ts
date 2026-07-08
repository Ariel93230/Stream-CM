import { z } from 'zod';

export const getMoviesSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const getMovieSchema = z.object({
  params: z.object({
    movieId: z.string().min(1),
  }),
});
