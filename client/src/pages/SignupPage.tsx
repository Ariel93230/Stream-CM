import { Link } from 'react-router-dom';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-16 md:px-6">
        <div className="rounded-[1rem] border border-border bg-secondary p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Get started</h1>
          <p className="mt-2 text-sm text-muted-foreground">Create an account to upload videos, subscribe, and follow creators.</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary underline">Sign in</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
