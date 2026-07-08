import { useEffect, useMemo, useRef, useState } from 'react';
import type { VideoPlayerProps } from '../types';
import { usePlaybackSession } from '../hooks/usePlaybackSession';

function formatTime(seconds: number) {
  const rounded = Math.floor(seconds);
  const minutes = Math.floor(rounded / 60);
  const remainingSeconds = rounded % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function VideoPlayer({ movieId, src, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const { loadPosition, savePosition } = usePlaybackSession(movieId);

  const hasSource = Boolean(src);

  useEffect(() => {
    if (!videoRef.current || !hasSource) {
      return;
    }

    const resumeTime = loadPosition();
    if (resumeTime > 1) {
      videoRef.current.currentTime = resumeTime;
    }
  }, [hasSource, loadPosition]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      savePosition(video.currentTime);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [savePosition]);

  return (
    <div className="rounded-[1.5rem] border border-border bg-[#000] shadow-sm">
      {hasSource ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          preload="metadata"
          playsInline
          className="w-full bg-black object-cover"
        >
          Your browser does not support HTML5 video.
        </video>
      ) : (
        <div className="flex min-h-[240px] items-center justify-center bg-secondary p-10 text-center text-sm text-muted-foreground">
          Video playback is not available for this movie yet.
        </div>
      )}

      <div className="flex flex-col gap-2 bg-secondary px-4 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          <p className="text-xs">Basic controls available: play, pause, seek, volume.</p>
        </div>
        <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
          {formatTime(currentTime)}
        </span>
      </div>
    </div>
  );
}
