import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from '@/context/AuthContext';
import type { LoginPayload, LoggedInUser } from '../types';

export function LoginForm() {
  const [form, setForm] = useState<LoginPayload>({ email: '', password: '' });
  const auth = useAuthContext();
  const loginMutation = useLogin({
    onSuccess: (user: LoggedInUser) => {
      auth.signIn(user);
    },
  });

  const handleChange = (key: keyof LoginPayload) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginMutation.mutateAsync(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[1rem] border border-border bg-secondary p-8 shadow-sm">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          required
          className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-shadow focus:border-ring focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          required
          className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-shadow focus:border-ring focus:ring-2 focus:ring-ring"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-accent"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
      </button>
      {loginMutation.isError ? (
        <p className="text-sm text-destructive">Login failed. Check your credentials and try again.</p>
      ) : null}
    </form>
  );
}
