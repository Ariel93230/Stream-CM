import type { Request, Response } from 'express';
import { loginUser } from './auth.service.js';
import { authView } from './auth.view.js';
import { apiResponse } from '../../utils/apiResponse.js';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await loginUser({ email, password });

  return apiResponse.success(res, { data: authView(result) });
}
