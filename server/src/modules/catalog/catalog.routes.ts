import { Router } from 'express';
import { getMovies, getMovieById } from './catalog.controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { getMoviesSchema, getMovieSchema } from './catalog.validators.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router();

router.get('/movies', validateRequest(getMoviesSchema), asyncHandler(getMovies));
router.get('/movies/:movieId', validateRequest(getMovieSchema), asyncHandler(getMovieById));

export default router;
