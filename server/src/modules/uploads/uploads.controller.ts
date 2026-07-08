import type { Request, Response } from 'express';
import { createVideoUpload } from './uploads.service.js';
import { apiResponse } from '../../utils/apiResponse.js';

export async function createUpload(req: Request, res: Response) {
  const payload = req.body;
  const result = await createVideoUpload(payload);

  return apiResponse.success(res, { data: result });
}
