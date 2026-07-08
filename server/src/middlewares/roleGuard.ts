import { NextFunction, Request, Response } from 'express';
import { apiResponse } from '../utils/apiResponse.js';

export const requireRole = (role: string) => (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.headers['x-user-role'];

  if (userRole !== role) {
    return apiResponse.error(res, {
      code: 'FORBIDDEN',
      message: 'Insufficient role privileges.',
      status: 403,
    });
  }

  next();
};
