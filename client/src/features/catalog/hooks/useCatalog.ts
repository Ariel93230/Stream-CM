import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import type { MovieSummary } from '../types';

interface CatalogQuery {
  search?: string;
  category?: string;
}

async function fetchCatalog(params: CatalogQuery): Promise<MovieSummary[]> {
  const response = await axiosClient.get('/movies', { params });
  return response.data.data as MovieSummary[];
}

export function useCatalog(query: CatalogQuery) {
  return useQuery<MovieSummary[]>({
    queryKey: ['catalog', query.search ?? '', query.category ?? ''],
    queryFn: () => fetchCatalog(query),
  });
}
