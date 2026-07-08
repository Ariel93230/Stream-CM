import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useUpload } from '../hooks/useUpload';
import type { UploadPayload } from '../types';

const initialForm: UploadPayload = {
  title: '',
  description: '',
  category: '',
  duration: '',
  releaseYear: new Date().getFullYear(),
  rating: 0,
  thumbnailUrl: '',
};

export function UploadForm() {
  const [form, setForm] = useState<UploadPayload>(initialForm);
  const uploadMutation = useUpload();

  const handleChange = (key: keyof UploadPayload) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value;
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    uploadMutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[1rem] border border-border bg-background p-6 shadow-sm">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground">
          Video title
        </label>
        <input
          id="title"
          value={form.title}
          onChange={handleChange('title')}
          required
          className="mt-2 w-full rounded-2xl border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground">
          Description
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={handleChange('description')}
          required
          rows={4}
          className="mt-2 w-full rounded-2xl border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Category</span>
          <input
            value={form.category}
            onChange={handleChange('category')}
            required
            className="mt-2 w-full rounded-2xl border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Duration</span>
          <input
            value={form.duration}
            onChange={handleChange('duration')}
            placeholder="e.g. 12:30"
            required
            className="mt-2 w-full rounded-2xl border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Release year</span>
          <input
            type="number"
            value={form.releaseYear}
            onChange={handleChange('releaseYear')}
            min={1900}
            max={new Date().getFullYear()}
            className="mt-2 w-full rounded-2xl border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Rating</span>
          <input
            type="number"
            value={form.rating}
            onChange={handleChange('rating')}
            min={0}
            max={10}
            step={0.1}
            className="mt-2 w-full rounded-2xl border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring"
          />
        </label>
      </div>

      <div>
        <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-foreground">
          Thumbnail URL
        </label>
        <input
          id="thumbnailUrl"
          value={form.thumbnailUrl}
          onChange={handleChange('thumbnailUrl')}
          placeholder="Optional image URL"
          className="mt-2 w-full rounded-2xl border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
        disabled={uploadMutation.isPending}
      >
        {uploadMutation.isPending ? 'Creating upload...' : 'Create upload'}
      </button>

      {uploadMutation.isSuccess ? (
        <p className="text-sm text-primary">Upload initialized. Use the generated upload URL to send the file.</p>
      ) : null}

      {uploadMutation.isError ? (
        <p className="text-sm text-destructive">Unable to create upload. Please check your input.</p>
      ) : null}
    </form>
  );
}
