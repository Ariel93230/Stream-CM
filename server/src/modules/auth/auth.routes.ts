import { Router } from 'express';
import { login } from './auth.controller.js';
import { loginSchema } from './auth.validators.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router();

router.post('/login', validateRequest(loginSchema), asyncHandler(login));

export default router;
