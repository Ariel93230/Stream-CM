export interface PlaybackSession {
  movieId: string;
  currentTime: number;
}

export interface VideoPlayerProps {
  movieId: string;
  src: string;
  poster?: string;
  title: string;
}
