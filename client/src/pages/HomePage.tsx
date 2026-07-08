import { Link } from 'react-router-dom';
import { VideoCard } from '@/components/shared/video-card';
import type { VideoPreview } from '@/features/catalog/types';

const featuredVideos: VideoPreview[] = [
  {
    id: '1',
    title: 'Cinematic Stories of Yaoundé',
    creator: 'Maya Films',
    category: 'Stories',
    duration: '14:32',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80',
    viewers: '23K views',
    badge: 'Trending',
  },
  {
    id: '2',
    title: 'Cooking with Local Spices',
    creator: 'Akissi Kitchen',
    category: 'Food',
    duration: '09:18',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    viewers: '18K views',
  },
  {
    id: '3',
    title: 'Music Beats from Douala',
    creator: 'Rhythm House',
    category: 'Music',
    duration: '04:23',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    viewers: '29K views',
  },
];

const categories = [
  { id: 'movies', title: 'Movies & Series', description: 'Premium licensed content' },
  { id: 'creators', title: 'Creator Videos', description: 'Fresh uploads from local creators' },
  { id: 'trending', title: 'Trending Now', description: 'What viewers are watching today' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="space-y-4">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">STREAMCM</p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Discover movies, series, and creator videos made for Cameroon.</h1>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              Browse featured recommendations, catch local creator uploads, and enjoy a responsive streaming experience optimized for mobile data.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {categories.map((category) => (
              <article key={category.id} className="rounded-[1rem] border border-border bg-secondary p-5 shadow-sm transition-shadow duration-150 hover:shadow-lg">
                <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
              </article>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Featured for you</h2>
                <p className="text-sm text-muted-foreground">Curated picks across licensed and creator content.</p>
              </div>
              <Link
                to="/movies"
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-accent"
              >
                Browse movies
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {featuredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
