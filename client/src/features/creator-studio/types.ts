export interface UploadPayload {
  title: string;
  description: string;
  category: string;
  duration: string;
  releaseYear: number;
  rating: number;
  thumbnailUrl?: string;
}

export interface UploadResponse {
  video: {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    releaseYear: number;
    rating: number;
    thumbnailUrl: string;
    videoUrl?: string;
    isLicensed: boolean;
  };
  uploadUrl: string;
  objectKey: string;
}
