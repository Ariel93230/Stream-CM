import { Link, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export default function MainLayout() {
  const auth = useAuthContext();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-secondary/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
              StreamCM
            </Link>
            <nav className="hidden items-center gap-3 md:flex">
              <Link to="/movies" className="text-sm font-medium text-foreground transition hover:text-primary">
                Catalog
              </Link>
              <Link to="/creator-studio" className="text-sm font-medium text-foreground transition hover:text-primary">
                Creator Studio
              </Link>
              <Link to="/billing" className="text-sm font-medium text-foreground transition hover:text-primary">
                Billing
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {auth.isAuthenticated ? (
              <button
                type="button"
                onClick={auth.signOut}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <Outlet />
      </main>
    </div>
  );
}
