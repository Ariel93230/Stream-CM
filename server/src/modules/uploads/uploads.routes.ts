import { Router } from 'express';
import { createUpload } from './uploads.controller.js';
import { createUploadSchema } from './uploads.validators.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router();

router.post('/uploads', validateRequest(createUploadSchema), asyncHandler(createUpload));

export default router;
