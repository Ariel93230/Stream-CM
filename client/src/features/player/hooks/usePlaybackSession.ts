import { useCallback } from 'react';

const STORAGE_KEY_PREFIX = 'streamcm_playback';

function getStorageKey(movieId: string) {
  return `${STORAGE_KEY_PREFIX}:${movieId}`;
}

export function usePlaybackSession(movieId: string) {
  const loadPosition = useCallback(() => {
    if (!movieId) {
      return 0;
    }

    const stored = window.localStorage.getItem(getStorageKey(movieId));
    const position = stored ? Number(stored) : 0;

    return Number.isFinite(position) && position > 0 ? position : 0;
  }, [movieId]);

  const savePosition = useCallback(
    (currentTime: number) => {
      if (!movieId || currentTime <= 0) {
        return;
      }
      window.localStorage.setItem(getStorageKey(movieId), String(currentTime));
    },
    [movieId],
  );

  return { loadPosition, savePosition };
}
