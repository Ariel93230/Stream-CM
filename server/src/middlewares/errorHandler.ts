import { NextFunction, Request, Response } from 'express';
import { apiResponse } from '../utils/apiResponse.js';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  return apiResponse.error(res, {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred.',
    status: 500,
  });
}
