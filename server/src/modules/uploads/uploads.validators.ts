import { z } from 'zod';

export const createUploadSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(2, 'Category is required'),
  duration: z.string().min(1, 'Duration is required'),
  releaseYear: z.preprocess((value) => Number(value), z.number().int().gte(1900).lte(new Date().getFullYear())),
  rating: z.preprocess((value) => Number(value), z.number().min(0).max(10)),
  thumbnailUrl: z.string().url().optional(),
});
