import type { Request, Response } from 'express';
import { fetchMovies, fetchMovieById } from './catalog.service.js';
import { movieListView, movieDetailView } from './catalog.view.js';
import { apiResponse } from '../../utils/apiResponse.js';

export async function getMovies(req: Request, res: Response) {
  const search = String(req.query.search ?? '').trim();
  const category = req.query.category ? String(req.query.category) : undefined;

  const movies = await fetchMovies({
    search: search || undefined,
    category,
  });

  return apiResponse.success(res, { data: movieListView(movies) });
}

export async function getMovieById(req: Request, res: Response) {
  const { movieId } = req.params;
  const movie = await fetchMovieById(movieId);

  return apiResponse.success(res, { data: movieDetailView(movie) });
}
