import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { apiResponse } from '../utils/apiResponse.js';

export const validateRequest = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    return apiResponse.error(res, {
      code: 'VALIDATION_ERROR',
      message: 'Invalid request payload.',
      details: result.error.format(),
      status: 400,
    });
  }

  next();
};
