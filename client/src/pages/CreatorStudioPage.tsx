import { UploadForm } from '@/features/creator-studio/components/UploadForm';

export default function CreatorStudioPage() {
  return (
    <div className="space-y-6 rounded-[1.5rem] border border-border bg-secondary p-6 shadow-sm">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Creator Studio</h1>
        <p className="text-sm text-muted-foreground">Upload your video metadata and get a secure upload URL for your file.</p>
      </header>
      <UploadForm />
    </div>
  );
}
