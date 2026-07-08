import { Response } from 'express';

export const apiResponse = {
  success<T>(res: Response, payload: { data: T; meta?: unknown }) {
    return res.status(200).json({ data: payload.data, meta: payload.meta ?? null });
  },
  error(res: Response, payload: { code: string; message: string; status?: number; details?: unknown }) {
    return res.status(payload.status ?? 500).json({ error: { code: payload.code, message: payload.message, details: payload.details ?? null } });
  },
};
