import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-16 md:px-6">
        <Outlet />
      </section>
    </main>
  );
}
