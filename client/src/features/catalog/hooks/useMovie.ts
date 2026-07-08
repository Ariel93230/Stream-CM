import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import type { MovieDetail } from '../types';

async function fetchMovie(movieId: string): Promise<MovieDetail> {
  const response = await axiosClient.get(`/movies/${movieId}`);
  return response.data.data as MovieDetail;
}

export function useMovie(movieId: string) {
  return useQuery<MovieDetail>({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovie(movieId),
    enabled: Boolean(movieId),
  });
}
