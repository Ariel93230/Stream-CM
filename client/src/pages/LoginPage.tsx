import { LoginForm } from '@/features/auth/components/LoginForm';
import { AuthCard } from '@/features/auth/components/AuthCard';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-16 md:px-6">
        <AuthCard
          title="Welcome back"
          description="Sign in to access your creator dashboard, saved content, and personalized recommendations."
        >
          <LoginForm />
        </AuthCard>
      </section>
    </main>
  );
}
