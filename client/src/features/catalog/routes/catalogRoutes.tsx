import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const CatalogPage = lazy(() => import('@/pages/CatalogPage'));
const MovieDetailPage = lazy(() => import('@/pages/MovieDetailPage'));

export const catalogRoutes: RouteObject[] = [
  {
    path: '/movies',
    element: <CatalogPage />,
  },
  {
    path: '/movies/:movieId',
    element: <MovieDetailPage />,
  },
];
