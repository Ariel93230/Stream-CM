export interface MovieSummary {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  duration: string;
  releaseYear: number;
  rating: number;
}

export interface MovieDetail extends MovieSummary {
  videoUrl?: string;
}

export interface VideoPreview {
  id: string;
  title: string;
  creator: string;
  category: string;
  duration: string;
  thumbnailUrl: string;
  viewers: string;
  badge?: string;
}

export interface CategoryTile {
  id: string;
  title: string;
  description: string;
}
