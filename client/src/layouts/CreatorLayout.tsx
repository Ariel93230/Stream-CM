import { Outlet } from 'react-router-dom';

export default function CreatorLayout() {
  return (
    <div className="space-y-6 rounded-[1.5rem] border border-border bg-secondary p-6 shadow-sm">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Creator Studio</h1>
        <p className="mt-2 text-sm text-muted-foreground">Upload your videos, manage drafts, and monitor performance.</p>
      </header>
      <Outlet />
    </div>
  );
}
