import type { MovieDetail, MovieSummary } from '@/features/catalog/types';
import axiosClient from '../axiosClient';

export interface VideoCatalogFilters {
  search?: string;
  category?: string;
}

export async function fetchMovies(filters: VideoCatalogFilters): Promise<MovieSummary[]> {
  const response = await axiosClient.get('/movies', { params: filters });
  return response.data.data as MovieSummary[];
}

export async function fetchMovie(movieId: string): Promise<MovieDetail> {
  const response = await axiosClient.get(`/movies/${movieId}`);
  return response.data.data as MovieDetail;
}
