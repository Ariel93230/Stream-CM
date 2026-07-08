import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import CatalogPage from '@/pages/CatalogPage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import CreatorStudioPage from '@/pages/CreatorStudioPage';
import BillingPage from '@/pages/BillingPage';
import AdminModerationPage from '@/pages/AdminModerationPage';
import WatchPage from '@/pages/WatchPage';
import CategoryPage from '@/pages/CategoryPage';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import CreatorLayout from '@/layouts/CreatorLayout';
import ProtectedRoute from '@/routes/ProtectedRoute';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<CatalogPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailPage />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/creator-studio" element={<CreatorLayout />}>
              <Route index element={<CreatorStudioPage />} />
            </Route>
            <Route path="/admin/moderation" element={<AdminModerationPage />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
