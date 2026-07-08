import { randomUUID } from 'crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import prisma from '../../config/db.js';
import { s3Client } from '../../config/storage.js';
import { env } from '../../config/env.js';
import { AppError } from '../../utils/AppError.js';

const UPLOAD_BUCKET = env.S3_BUCKET;

export async function createVideoUpload(payload: {
  title: string;
  description: string;
  category: string;
  duration: string;
  releaseYear: number;
  rating: number;
  thumbnailUrl?: string;
}) {
  const uploadId = randomUUID();

  const video = await prisma.movie.create({
    data: {
      title: payload.title,
      description: payload.description,
      category: payload.category,
      duration: payload.duration,
      releaseYear: payload.releaseYear,
      rating: payload.rating,
      thumbnailUrl: payload.thumbnailUrl ?? '',
      isLicensed: false,
    },
  });

  const objectKey = `uploads/${uploadId}/${video.id}.mp4`;
  const uploadUrl = await generatePresignedUploadUrl(objectKey);

  return {
    video,
    uploadUrl,
    objectKey,
  };
}

async function generatePresignedUploadUrl(key: string) {
  const command = new PutObjectCommand({
    Bucket: UPLOAD_BUCKET,
    Key: key,
    ContentType: 'video/mp4',
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  if (!url) {
    throw new AppError('UPLOAD_URL_ERROR', 'Unable to create upload URL', 500);
  }

  return url;
}
