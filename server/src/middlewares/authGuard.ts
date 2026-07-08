import { NextFunction, Request, Response } from 'express';
import { apiResponse } from '../utils/apiResponse.js';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return apiResponse.error(res, {
      code: 'UNAUTHORIZED',
      message: 'Authentication required.',
      status: 401,
    });
  }

  next();
};
